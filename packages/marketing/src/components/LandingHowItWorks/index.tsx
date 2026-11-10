"use client";
import * as React from "react";
import { Button, Card, Grid, Heading, Text } from "@hudbird/ui";
import type { LandingSectionProps } from "@hudbird/schemas";
import { HeroImageView } from "../HeroSection";
import { LandingFrame, useLandingNavigation } from "../LandingShared";
import { cn } from "../../utils/cn";

// ============================================================================
// STEP DEFINITIONS (Matching Reference Layout & Content)
// ============================================================================

interface SubStepItem {
  id: string;
  title: string;
  description: string;
}

const step1SubSteps: SubStepItem[] = [
  {
    id: "open",
    title: "Open page builder",
    description:
      "Launch the visual studio to compose layouts on a real-time preview canvas with zero friction.",
  },
  {
    id: "customize",
    title: "Customize & reorder sections",
    description:
      "Toggle sections on or off (Navbar, Hero, Logos, Benefits, Pricing) and reorder narrative flow with intuitive controls.",
  },
  {
    id: "theme",
    title: "Change theme & brand system",
    description:
      "Tune OKLCH color palettes, typography pairings, and border radius to match your company's design identity.",
  },
];

const step2ExportModes: SubStepItem[] = [
  {
    id: "react",
    title: "Export React & Next.js Project",
    description:
      "Download fully typed TSX with Tailwind CSS v4, Framer Motion, and original source components.",
  },
  {
    id: "html",
    title: "Export Clean Static HTML & CSS",
    description:
      "Zero-runtime static bundle with semantic markup and inlined CSS variables for immediate hosting.",
  },
  {
    id: "prompt",
    title: "Copy AI System Prompt",
    description:
      "Calibrated design token instructions for Claude, Stitch, or Cursor to extend pages seamlessly.",
  },
];

const step3DeployTargets: SubStepItem[] = [
  {
    id: "vercel",
    title: "Vercel & Next.js Deployment",
    description:
      "Instant edge deployment with automated preview URLs, Fluid Compute, and CDN caching.",
  },
  {
    id: "cloudflare",
    title: "Cloudflare & Netlify Edge",
    description:
      "Global CDN distribution with sub-millisecond static delivery and zero cold starts.",
  },
  {
    id: "docker",
    title: "Docker & Standalone Containers",
    description: "Self-host anywhere with standalone micro-frontend or monorepo packages.",
  },
];

// ============================================================================
// NATIVE STICKY CARD STACK HOOK (Zero External Libraries, 60fps rAF)
// ============================================================================

function useStickyCardStack(cardCount: number) {
  const stackContainerRef = React.useRef<HTMLDivElement | null>(null);
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const [depths, setDepths] = React.useState<number[]>(() => Array(cardCount).fill(0));

  React.useEffect(() => {
    let rafId: number | null = null;

    const updateStack = () => {
      const container = stackContainerRef.current;
      const cards = cardRefs.current;
      if (!container || !cards[0]) return;

      const doc = container.ownerDocument;
      const iframeWin = doc.defaultView ?? window;
      const frameEl = iframeWin.frameElement as HTMLElement | null;
      const parentWin = frameEl?.ownerDocument?.defaultView ?? iframeWin;

      // Detect if rendered inside an auto-sized full-height iframe (like IframePreview)
      const isAutoHeightIframe =
        Boolean(frameEl) && iframeWin.innerHeight > parentWin.innerHeight * 1.3;
      const iframeTopInViewport = frameEl ? frameEl.getBoundingClientRect().top : 0;

      const containerRect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;

      // Compute effective viewport top for each card
      const visualTops: number[] = [];
      const pinOffsets: number[] = [];
      const cardHeights: number[] = [];

      for (let i = 0; i < cardCount; i++) {
        const card = cards[i];
        if (!card) {
          visualTops.push(0);
          pinOffsets.push(0);
          cardHeights.push(420);
          continue;
        }

        const stickyTopPx = 88 + i * 24;
        const cardHeight = Math.max(card.offsetHeight, 320);
        cardHeights.push(cardHeight);

        if (isAutoHeightIframe) {
          const naturalViewportTop = iframeTopInViewport + containerRect.top + card.offsetTop;
          const maxPin = Math.max(0, containerHeight - card.offsetTop - cardHeight - 24);
          const pinY = Math.min(maxPin, Math.max(0, stickyTopPx - naturalViewportTop));
          pinOffsets.push(pinY);
          visualTops.push(naturalViewportTop + pinY);
        } else {
          pinOffsets.push(0);
          visualTops.push(card.getBoundingClientRect().top);
        }
      }

      const nextDepths: number[] = [];

      for (let i = 0; i < cardCount; i++) {
        const current = cards[i];
        if (!current) {
          nextDepths.push(0);
          continue;
        }

        const currentTop = visualTops[i];
        const currentHeight = cardHeights[i];
        let totalOverlap = 0;

        for (let j = i + 1; j < cardCount; j++) {
          const nextTop = visualTops[j];
          const distance = nextTop - currentTop;
          const triggerRange = currentHeight * 0.92;

          if (distance < triggerRange) {
            const progress = Math.min(
              1,
              Math.max(0, (triggerRange - distance) / Math.max(1, triggerRange - 24))
            );
            totalOverlap += progress;
          }
        }

        nextDepths.push(Number(totalOverlap.toFixed(3)));
        const pinY = pinOffsets[i];

        if (totalOverlap > 0.005 || pinY > 0.5) {
          const scale = Math.max(0.88, 1 - totalOverlap * 0.05);
          const rotateX = -Math.min(14, totalOverlap * 5.5);
          const depthShiftY = -Math.min(24, totalOverlap * 10);
          const translateY = pinY + depthShiftY;
          const translateZ = -Math.min(64, totalOverlap * 30);
          const opacity = Math.max(0.42, 1 - totalOverlap * 0.26);
          const blur = Math.min(3.2, totalOverlap * 1.4);

          current.style.transform = `perspective(1200px) translate3d(0px, ${translateY.toFixed(1)}px, ${translateZ.toFixed(1)}px) rotateX(${rotateX.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
          current.style.opacity = opacity.toFixed(3);
          current.style.filter = totalOverlap > 0.02 ? `blur(${blur.toFixed(2)}px)` : "none";
        } else {
          current.style.transform =
            "perspective(1200px) translate3d(0px, 0px, 0px) rotateX(0deg) scale(1)";
          current.style.opacity = "1";
          current.style.filter = "none";
        }
      }

      setDepths((prev) => {
        const changed = prev.some((val, idx) => Math.abs(val - nextDepths[idx]) > 0.04);
        return changed ? nextDepths : prev;
      });
    };

    const onScroll = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateStack);
    };

    updateStack();

    const container = stackContainerRef.current;
    const doc = container?.ownerDocument ?? document;
    const iframeWin = doc.defaultView ?? window;
    const frameEl = iframeWin.frameElement as HTMLElement | null;
    const parentWin = frameEl?.ownerDocument?.defaultView ?? window;

    parentWin.addEventListener("scroll", onScroll, { passive: true });
    parentWin.addEventListener("resize", onScroll, { passive: true });
    if (iframeWin !== parentWin) {
      iframeWin.addEventListener("scroll", onScroll, { passive: true });
      iframeWin.addEventListener("resize", onScroll, { passive: true });
    }

    const scrollParents: Element[] = [];
    let el: HTMLElement | null = container?.parentElement ?? null;
    while (el) {
      const style = iframeWin.getComputedStyle(el);
      if (/(auto|scroll)/.test(style.overflowY)) {
        scrollParents.push(el);
        el.addEventListener("scroll", onScroll, { passive: true });
      }
      el = el.parentElement;
    }

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      parentWin.removeEventListener("scroll", onScroll);
      parentWin.removeEventListener("resize", onScroll);
      if (iframeWin !== parentWin) {
        iframeWin.removeEventListener("scroll", onScroll);
        iframeWin.removeEventListener("resize", onScroll);
      }
      scrollParents.forEach((p) => p.removeEventListener("scroll", onScroll));
    };
  }, [cardCount]);

  return { stackContainerRef, cardRefs, depths };
}

// ============================================================================
// REUSABLE 3D WIREFRAME CUBE PRIMITIVE (CSS 3D Transform, Stroke Only)
// ============================================================================

function WireframeCube3D({
  size = 56,
  dashed = false,
  label,
  style,
}: {
  size?: number;
  dashed?: boolean;
  label?: string;
  style?: React.CSSProperties;
}) {
  const half = size / 2;
  const borderClass = cn(
    "absolute inset-0 border-[1.35px] border-zinc-900 dark:border-zinc-100 bg-white/35 dark:bg-zinc-950/35",
    dashed && "border-dashed border-zinc-500 dark:border-zinc-400"
  );

  return (
    <div
      className="relative flex items-center justify-center transition-transform duration-500 ease-out"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transformStyle: "preserve-3d",
        ...style,
      }}
    >
      <div className={borderClass} style={{ transform: `translateZ(${half}px)` }}>
        {label && (
          <span className="flex h-full w-full items-center justify-center font-mono text-[8px] font-bold tracking-tighter text-zinc-950 dark:text-white">
            {label}
          </span>
        )}
      </div>
      <div className={borderClass} style={{ transform: `rotateY(180deg) translateZ(${half}px)` }} />
      <div className={borderClass} style={{ transform: `rotateY(90deg) translateZ(${half}px)` }} />
      <div className={borderClass} style={{ transform: `rotateY(-90deg) translateZ(${half}px)` }} />
      <div className={borderClass} style={{ transform: `rotateX(90deg) translateZ(${half}px)` }} />
      <div className={borderClass} style={{ transform: `rotateX(-90deg) translateZ(${half}px)` }} />
    </div>
  );
}

// ============================================================================
// SHARED 3D TRANSFORM STAGE & TOP WIREFRAME DOCUMENTS (Stroke Only, No Gradients)
// ============================================================================

interface Stage3DProps {
  stepIndex: 0 | 1 | 2;
  activeSubStep: number;
  stackDepth?: number;
  onCycleSubStep?: () => void;
}

/**
 * Top 3D Stacked Wireframe Documents (LlamaParse style, pure stroke lines + 3D transform)
 */
function TopStackedDocuments3D({
  stepIndex,
  activeSubStep,
  isHovered,
  isExpanded,
}: {
  stepIndex: 0 | 1 | 2;
  activeSubStep: number;
  isHovered: boolean;
  isExpanded: boolean;
}) {
  const spread = isExpanded ? 1.4 : isHovered ? 1.18 : 1;

  return (
    <div
      className="relative flex h-[96px] w-[190px] items-center justify-center select-none sm:h-[104px] sm:w-[210px]"
      style={{
        perspective: "800px",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Back-Left Sheet (3D Tilted) */}
      <div
        className="absolute h-[74px] w-[86px] rounded-[5px] border-[1.25px] border-zinc-900/75 bg-white p-2 transition-transform duration-500 ease-out dark:border-zinc-200/75 dark:bg-zinc-950"
        style={{
          transform: `translate3d(${-26 * spread}px, ${3 * spread}px, ${-24 * spread}px) rotateZ(${-11 * spread}deg) rotateX(10deg)`,
        }}
      >
        <div className="space-y-1.5 pt-1">
          <div className="h-px w-3/5 bg-zinc-400 dark:bg-zinc-600" />
          <div className="h-px w-4/5 bg-zinc-300 dark:bg-zinc-700" />
          <div className="h-px w-2/3 bg-zinc-300 dark:bg-zinc-700" />
          <div className="h-px w-3/4 bg-zinc-300 dark:bg-zinc-700" />
        </div>
      </div>

      {/* Back-Right Sheet (3D Tilted) */}
      <div
        className="absolute h-[74px] w-[86px] rounded-[5px] border-[1.25px] border-zinc-900/75 bg-white p-2 transition-transform duration-500 ease-out dark:border-zinc-200/75 dark:bg-zinc-950"
        style={{
          transform: `translate3d(${26 * spread}px, ${3 * spread}px, ${-14 * spread}px) rotateZ(${10 * spread}deg) rotateX(10deg)`,
        }}
      >
        <div className="space-y-1.5 pt-1">
          <div className="ml-auto h-px w-3/5 bg-zinc-400 dark:bg-zinc-600" />
          <div className="ml-auto h-px w-4/5 bg-zinc-300 dark:bg-zinc-700" />
          <div className="ml-auto h-px w-2/3 bg-zinc-300 dark:bg-zinc-700" />
          <div className="ml-auto h-px w-3/4 bg-zinc-300 dark:bg-zinc-700" />
        </div>
      </div>

      {/* Front Active Sheet (3D Elevated) */}
      <div
        className="relative z-10 flex h-[84px] w-[104px] flex-col justify-between rounded-[6px] border-[1.5px] border-zinc-950 bg-white p-2.5 transition-transform duration-500 ease-out dark:border-white dark:bg-zinc-950"
        style={{
          transform: `translate3d(0px, ${isHovered ? -3 : 0}px, ${16 * spread}px) rotateX(${isHovered ? 4 : 0}deg)`,
        }}
      >
        {stepIndex === 0 && (
          /* Step 1 Document: Squiggly / Wireframe Layout Lines matching LlamaParse */
          <div className="flex h-full flex-col justify-between">
            <svg viewBox="0 0 84 62" className="h-full w-full overflow-visible" fill="none">
              {activeSubStep === 0 && (
                <g
                  className="stroke-zinc-900 dark:stroke-zinc-100"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                >
                  <path d="M2 6 C5 4, 8 8, 11 6 C14 4, 17 8, 20 6 C23 4, 26 8, 29 6" />
                  <path d="M2 14 C5 12, 8 16, 11 14 C14 12, 17 16, 20 14" />
                  <line x1="2" y1="25" x2="80" y2="25" strokeDasharray="4 2.5" />
                  <line x1="2" y1="33" x2="78" y2="33" strokeDasharray="6 2" />
                  <line x1="2" y1="41" x2="80" y2="41" strokeDasharray="3 2" />
                  <line x1="2" y1="49" x2="74" y2="49" strokeDasharray="5 2.5" />
                  <line x1="2" y1="57" x2="62" y2="57" strokeDasharray="4 2" />
                </g>
              )}
              {activeSubStep === 1 && (
                <g className="stroke-zinc-900 dark:stroke-zinc-100" strokeWidth="1.3">
                  <rect x="2" y="3" width="80" height="12" rx="2" />
                  <rect x="2" y="20" width="80" height="18" rx="2" strokeDasharray="3 2" />
                  <rect x="2" y="43" width="80" height="14" rx="2" />
                </g>
              )}
              {activeSubStep === 2 && (
                <g className="stroke-zinc-900 dark:stroke-zinc-100" strokeWidth="1.3">
                  <circle cx="15" cy="16" r="9" />
                  <circle cx="42" cy="16" r="9" strokeDasharray="2.5 2" />
                  <circle cx="69" cy="16" r="9" />
                  <line x1="4" y1="38" x2="80" y2="38" />
                  <circle cx="30" cy="38" r="3.5" className="fill-white dark:fill-zinc-950" />
                  <line x1="4" y1="50" x2="64" y2="50" strokeDasharray="4 2" />
                </g>
              )}
            </svg>
          </div>
        )}

        {stepIndex === 1 && (
          /* Step 2 Document: Code Syntax Wireframe Sheet */
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-1.5 dark:border-zinc-800">
              <div className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full border border-zinc-900 dark:border-white" />
                <span className="h-1.5 w-1.5 rounded-full border border-zinc-900 dark:border-white" />
              </div>
              <span className="font-mono text-[7px] text-zinc-600 dark:text-zinc-400">
                {activeSubStep === 0 ? "App.tsx" : activeSubStep === 1 ? "index.html" : "prompt.md"}
              </span>
            </div>
            <div className="space-y-1.5 py-1">
              <div className="h-[1.5px] w-1/2 bg-zinc-900 dark:bg-zinc-100" />
              <div className="ml-2 h-[1.5px] w-3/4 bg-zinc-500 dark:bg-zinc-400" />
              <div className="ml-4 h-[1.5px] w-2/3 bg-zinc-400 dark:bg-zinc-500" />
              <div className="ml-2 h-[1.5px] w-1/2 bg-zinc-500 dark:bg-zinc-400" />
              <div className="h-[1.5px] w-2/5 bg-zinc-900 dark:bg-zinc-100" />
            </div>
          </div>
        )}

        {stepIndex === 2 && (
          /* Step 3 Document: Audit Gauge & Verification Sheet */
          <div className="flex h-full flex-col items-center justify-between py-0.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border-[1.5px] border-zinc-900 dark:border-white">
              <span className="font-mono text-[9px] font-bold text-zinc-950 dark:text-white">
                100
              </span>
            </div>
            <div className="w-full space-y-1.5">
              <div className="mx-auto h-[1.5px] w-4/5 bg-zinc-900 dark:bg-zinc-100" />
              <div className="mx-auto h-px w-3/5 bg-zinc-400 dark:bg-zinc-500" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Downward Stroke Arrows (↓ ↓ ↓) matching LlamaParse Reference
 */
function DownwardStrokeArrows({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="my-2 flex items-center justify-center gap-7 select-none">
      {[0, 1, 2].map((idx) => (
        <svg
          key={idx}
          width="12"
          height="36"
          viewBox="0 0 12 36"
          fill="none"
          className={cn(
            "text-zinc-900 transition-transform duration-300 dark:text-zinc-100",
            isHovered && (idx === 1 ? "translate-y-1" : "translate-y-0.5")
          )}
        >
          <line
            x1="6"
            y1={idx === 1 ? "12" : "2"}
            x2="6"
            y2="30"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <polyline
            points="3,26.5 6,31 9,26.5"
            stroke="currentColor"
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  );
}

/**
 * Interactive 3D Transform Isometric Cube & Inner 3D Wireframe Shapes
 * - Pure Stroke Only / Line Only (Zero Gradients)
 * - Uses CSS 3D Transforms (perspective, preserve-3d, rotateX, rotateY, rotateZ, translateZ)
 * - Interactive Hover tilt + Click 3D rotation & layer expansion
 */
function Interactive3DShapeStage({
  stepIndex,
  activeSubStep,
  stackDepth = 0,
  onCycleSubStep,
}: Stage3DProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [spinCount, setSpinCount] = React.useState(0);
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setTilt({ x: -ny * 14, y: nx * 18 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleClick = () => {
    setSpinCount((c) => c + 1);
    setIsExpanded((prev) => !prev);
    onCycleSubStep?.();
  };

  // Base isometric angles + interactive hover tilt + click rotation + scroll paper-fold morphing
  const rotX = -26 + tilt.x - stackDepth * 14;
  const rotY = 45 + tilt.y + spinCount * 90 + activeSubStep * 20;
  const cubeScale = Math.max(0.82, (isHovered ? 1.05 : 1) - stackDepth * 0.08);
  const zSpread = isExpanded ? 1.32 : isHovered ? 1.15 : 1;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Interactive 3D wireframe illustration. Hover to tilt, click to rotate and morph 3D shapes."
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      className="group relative flex w-full cursor-pointer flex-col items-center justify-center py-1 outline-none select-none"
    >
      {/* 1. Top 3D Stacked Wireframe Documents */}
      <TopStackedDocuments3D
        stepIndex={stepIndex}
        activeSubStep={activeSubStep}
        isHovered={isHovered}
        isExpanded={isExpanded}
      />

      {/* 2. Downward Stroke Arrows (↓ ↓ ↓) */}
      <DownwardStrokeArrows isHovered={isHovered} />

      {/* 3. Outer Isometric Hexagon Silhouette + True CSS 3D Transform Wireframe Stage */}
      <div
        className="relative flex h-[230px] w-[230px] items-center justify-center sm:h-[248px] sm:w-[248px]"
        style={{ perspective: "1000px" }}
      >
        {/* Crisp LlamaParse Isometric Hexagon Frame & Internal Coordinate Grid (Pure Stroke Only) */}
        <svg
          viewBox="0 0 240 240"
          className="pointer-events-none absolute inset-0 h-full w-full transition-transform duration-500 ease-out"
          style={{
            transform: `rotateX(${(tilt.x * 0.35 - stackDepth * 8).toFixed(1)}deg) rotateY(${(tilt.y * 0.35).toFixed(1)}deg) scale(${cubeScale.toFixed(3)})`,
          }}
          fill="none"
        >
          {/* Solid Architectural Offset Shadow Facet (Line/Stroke + Crisp Offset, No Blur Gradient) */}
          <polygon
            points="120,16 212,69 212,175 120,228 28,175 28,69"
            transform="translate(4, 5)"
            className="fill-zinc-900/10 stroke-zinc-900/30 dark:fill-white/5 dark:stroke-white/25"
            strokeWidth="1"
          />

          {/* Main Isometric Hexagon Outer Boundary */}
          <polygon
            points="120,16 212,69 212,175 120,228 28,175 28,69"
            className="fill-white stroke-zinc-950 dark:fill-zinc-950 dark:stroke-zinc-100"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />

          {/* Isometric Perspective Grid Lines on All 3 Inner Planes */}
          <g className="stroke-zinc-200 dark:stroke-zinc-800" strokeWidth="1">
            {/* Left Plane Grid */}
            <line x1="59" y1="51" x2="59" y2="157" />
            <line x1="90" y1="33" x2="90" y2="139" />
            <line x1="28" y1="104" x2="120" y2="51" />
            <line x1="28" y1="140" x2="120" y2="87" />

            {/* Right Plane Grid */}
            <line x1="151" y1="33" x2="151" y2="139" />
            <line x1="182" y1="51" x2="182" y2="157" />
            <line x1="120" y1="51" x2="212" y2="104" />
            <line x1="120" y1="87" x2="212" y2="140" />

            {/* Bottom Plane Grid */}
            <line x1="59" y1="157" x2="151" y2="210" />
            <line x1="90" y1="139" x2="182" y2="192" />
            <line x1="151" y1="139" x2="59" y2="192" />
            <line x1="182" y1="157" x2="90" y2="210" />
          </g>

          {/* 3 Primary Internal Coordinate Axes meeting at (120, 122) */}
          <g className="stroke-zinc-900 dark:stroke-zinc-200" strokeWidth="1.35">
            <line x1="120" y1="122" x2="120" y2="26" />
            <line x1="120" y1="122" x2="36" y2="170" />
            <line x1="120" y1="122" x2="204" y2="170" />
          </g>
        </svg>

        {/* ================================================================
            TRUE CSS 3D TRANSFORM INNER GEOMETRY (preserve-3d)
            Morphs in 3D according to stepIndex & activeSubStep
           ================================================================ */}
        <div
          className="relative flex h-[120px] w-[120px] items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            transformStyle: "preserve-3d",
            transform: `scale(${cubeScale.toFixed(3)}) rotateX(${rotX.toFixed(1)}deg) rotateY(${rotY.toFixed(1)}deg)`,
          }}
        >
          {/* ---------------- STEP 1: PAGE BUILDER 3D SHAPES ---------------- */}
          {stepIndex === 0 && activeSubStep === 0 && (
            /* 1.1: 3D Spatial Wireframe Cube + Vector Node Cloud (LlamaParse Dot/Node Cloud in 3D) */
            <div
              className="relative flex h-24 w-24 items-center justify-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              <WireframeCube3D size={Math.round(68 * zSpread)} dashed />
              {/* 3D Floating Stroke Nodes distributed across X/Y/Z coordinates */}
              {[
                { x: -28, y: -18, z: 26, hollow: true },
                { x: -16, y: -26, z: 12, hollow: false },
                { x: -32, y: 8, z: 18, hollow: true },
                { x: -14, y: 18, z: 28, hollow: false },
                { x: 22, y: -20, z: 20, hollow: true },
                { x: 30, y: -8, z: -14, hollow: false },
                { x: 18, y: 22, z: 24, hollow: true },
                { x: 28, y: 14, z: -20, hollow: true },
                { x: -20, y: 28, z: -18, hollow: false },
                { x: 8, y: -28, z: -24, hollow: true },
                { x: 0, y: 0, z: 0, hollow: true },
              ].map((pt, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "absolute h-2.5 w-2.5 rounded-full border-[1.5px] border-zinc-950 transition-transform duration-500 dark:border-white",
                    pt.hollow ? "bg-white dark:bg-zinc-950" : "bg-zinc-950 dark:bg-white"
                  )}
                  style={{
                    transform: `translate3d(${pt.x * zSpread}px, ${pt.y * zSpread}px, ${pt.z * zSpread}px)`,
                  }}
                />
              ))}
            </div>
          )}

          {stepIndex === 0 && activeSubStep === 1 && (
            /* 1.2: 3D Stacked Section Slabs (Navbar, Hero, Benefits, Pricing reordering in 3D) */
            <div
              className="relative flex h-24 w-24 items-center justify-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              {[
                { z: 28, label: "01 NAVBAR", active: false },
                { z: 4, label: "02 HERO ↕", active: true },
                { z: -20, label: "03 BENEFITS", active: false },
              ].map((layer, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "absolute flex h-16 w-20 flex-col justify-between border-[1.5px] bg-white/90 p-2 transition-transform duration-500 dark:bg-zinc-950/90",
                    layer.active
                      ? "border-zinc-950 dark:border-white"
                      : "border-dashed border-zinc-500 dark:border-zinc-400"
                  )}
                  style={{
                    transform: `rotateX(52deg) translateZ(${layer.z * zSpread}px)`,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[7px] font-bold text-zinc-950 dark:text-white">
                      {layer.label}
                    </span>
                    <span className="h-2 w-2 rounded-full border border-zinc-950 dark:border-white" />
                  </div>
                  <div className="space-y-1">
                    <div className="h-px w-full bg-zinc-900 dark:bg-zinc-200" />
                    <div className="h-px w-2/3 bg-zinc-400 dark:bg-zinc-600" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {stepIndex === 0 && activeSubStep === 2 && (
            /* 1.3: 3D Gyroscopic Theme Prism & Concentric Wireframe Rings */
            <div
              className="relative flex h-24 w-24 items-center justify-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className="absolute inset-0 rounded-full border-[1.5px] border-zinc-950 transition-transform duration-500 dark:border-white"
                style={{ transform: `rotateX(68deg) scale(${zSpread})` }}
              />
              <div
                className="absolute inset-1 rounded-full border-[1.5px] border-dashed border-zinc-900 transition-transform duration-500 dark:border-zinc-200"
                style={{ transform: `rotateY(68deg) scale(${zSpread})` }}
              />
              <div
                className="absolute inset-2 rounded-full border-[1.5px] border-zinc-950 transition-transform duration-500 dark:border-white"
                style={{ transform: "rotateZ(45deg) rotateX(45deg)" }}
              />
              <WireframeCube3D size={36} label="Aa" />
            </div>
          )}

          {/* ---------------- STEP 2: EXPORT CODE 3D SHAPES ---------------- */}
          {stepIndex === 1 && activeSubStep === 0 && (
            /* 2.1: 3D Modular Component Tree Cubes (React & Next.js) */
            <div
              className="relative flex h-24 w-24 items-center justify-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              <WireframeCube3D size={34} dashed />
              {[
                { x: -24, y: -20, z: 22, label: "TSX" },
                { x: 24, y: -18, z: -20, label: "</>" },
                { x: 0, y: 24, z: 20, label: "UI" },
              ].map((node, idx) => (
                <div
                  key={idx}
                  className="absolute flex items-center justify-center transition-transform duration-500"
                  style={{
                    transform: `translate3d(${node.x * zSpread}px, ${node.y * zSpread}px, ${node.z * zSpread}px)`,
                  }}
                >
                  <WireframeCube3D size={28} label={node.label} />
                </div>
              ))}
            </div>
          )}

          {stepIndex === 1 && activeSubStep === 1 && (
            /* 2.2: 3D Folded Architectural DOM Planes (Static HTML & CSS) */
            <div
              className="relative flex h-24 w-24 items-center justify-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              {[-24, 0, 24].map((zPos, idx) => (
                <div
                  key={idx}
                  className="absolute inset-2 flex flex-col justify-between border-[1.5px] border-zinc-950 bg-white/90 p-2 transition-transform duration-500 dark:border-white dark:bg-zinc-950/90"
                  style={{
                    transform: `translateZ(${zPos * zSpread}px)`,
                  }}
                >
                  <div className="h-2 w-full border border-zinc-900 dark:border-zinc-200" />
                  <div className="flex flex-1 gap-1.5 pt-1.5">
                    <div className="h-full w-1/3 border border-dashed border-zinc-600 dark:border-zinc-400" />
                    <div className="h-full flex-1 border border-zinc-900 dark:border-zinc-200" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {stepIndex === 1 && activeSubStep === 2 && (
            /* 2.3: 3D Intersecting Prompt Hypercube / Tesseract (AI System Prompt) */
            <div
              className="relative flex h-24 w-24 items-center justify-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              <WireframeCube3D size={Math.round(70 * zSpread)} dashed />
              <WireframeCube3D
                size={38}
                label="AI"
                style={{ transform: "rotateX(45deg) rotateY(45deg)" }}
              />
            </div>
          )}

          {/* ---------------- STEP 3: AUDIT & DEPLOY 3D SHAPES ---------------- */}
          {stepIndex === 2 && activeSubStep === 0 && (
            /* 3.1: 3D Wireframe Edge Pyramid & Orbital Ring (Vercel & Next.js) */
            <div
              className="relative flex h-24 w-24 items-center justify-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className="absolute -inset-2 rounded-full border-[1.5px] border-dashed border-zinc-900 dark:border-zinc-200"
                style={{ transform: `rotateX(75deg) scale(${zSpread})` }}
              />
              {[0, 90, 180, 270].map((deg, idx) => (
                <div
                  key={idx}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    transform: `rotateY(${deg}deg) translateZ(${14 * zSpread}px) rotateX(28deg)`,
                  }}
                >
                  <svg viewBox="0 0 80 80" className="h-20 w-20 overflow-visible" fill="none">
                    <polygon
                      points="40,6 74,70 6,70"
                      className="fill-white/80 stroke-zinc-950 dark:fill-zinc-950/80 dark:stroke-white"
                      strokeWidth="1.75"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              ))}
            </div>
          )}

          {stepIndex === 2 && activeSubStep === 1 && (
            /* 3.2: 3D Geodesic Wireframe Edge Sphere (Cloudflare & Netlify Edge) */
            <div
              className="relative flex h-24 w-24 items-center justify-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              {[0, 45, 90, 135].map((deg, idx) => (
                <div
                  key={idx}
                  className="absolute inset-0 rounded-full border-[1.4px] border-zinc-950 transition-transform duration-500 dark:border-white"
                  style={{
                    transform: `rotateY(${deg}deg) scale(${zSpread})`,
                  }}
                />
              ))}
              <div
                className="absolute inset-0 rounded-full border-[1.4px] border-dashed border-zinc-900 dark:border-zinc-200"
                style={{ transform: `rotateX(90deg) scale(${zSpread})` }}
              />
            </div>
          )}

          {stepIndex === 2 && activeSubStep === 2 && (
            /* 3.3: 3D Interlocking Container Prisms (Docker & Standalone Containers) */
            <div
              className="relative flex h-24 w-24 items-center justify-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              <WireframeCube3D size={Math.round(68 * zSpread)} dashed />
              {[-16, 16].map((yPos, idx) => (
                <div
                  key={idx}
                  className="absolute inset-x-1 top-1/2 -mt-4 flex h-8 items-center justify-around border-[1.5px] border-zinc-950 bg-white/95 px-2 transition-transform duration-500 dark:border-white dark:bg-zinc-950/95"
                  style={{
                    transform: `translate3d(0px, ${yPos * zSpread}px, ${(idx === 0 ? 14 : -14) * zSpread}px)`,
                  }}
                >
                  <span className="h-4 w-px bg-zinc-900 dark:bg-zinc-200" />
                  <span className="h-4 w-px bg-zinc-900 dark:bg-zinc-200" />
                  <span className="h-4 w-px bg-zinc-900 dark:bg-zinc-200" />
                  <span className="h-4 w-px bg-zinc-900 dark:bg-zinc-200" />
                  <span className="h-4 w-px bg-zinc-900 dark:bg-zinc-200" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// REUSABLE 3-COLUMN STEP CARD (Exact LlamaParse Reference Layout)
// ============================================================================

interface StepCardProps {
  index: 0 | 1 | 2;
  numberLabel: string;
  title: string;
  description: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  primaryHref: string;
  secondaryHref: string;
  subSteps: SubStepItem[];
  activeSubStep: number;
  onSelectSubStep: (subIndex: number) => void;
  stackDepth: number;
  cardRef: (el: HTMLDivElement | null) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

function StepStackCard({
  index,
  numberLabel,
  title,
  description,
  primaryCtaLabel,
  secondaryCtaLabel,
  primaryHref,
  secondaryHref,
  subSteps,
  activeSubStep,
  onSelectSubStep,
  stackDepth,
  cardRef,
  onMouseEnter,
  onMouseLeave,
}: StepCardProps) {
  const { hrefFor } = useLandingNavigation();
  const stickyTopPx = 88 + index * 24;

  return (
    <div
      ref={cardRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: "sticky",
        top: `${stickyTopPx}px`,
        zIndex: (index + 1) * 10,
        transformOrigin: "top center",
        willChange: "transform, opacity, filter",
      }}
      className={cn(
        "hb-paper-fold-card w-full rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs transition-shadow duration-300 sm:rounded-3xl sm:p-10 lg:p-14",
        "dark:border-zinc-800 dark:bg-zinc-950"
      )}
    >
      {/* Mobile-First 3-Column Layout (3 Columns on md+ & lg+ matching LlamaParse Reference) */}
      <div className="flex flex-col gap-8 md:min-h-[410px] md:flex-row md:items-stretch md:justify-between md:gap-8 lg:gap-12">
        {/* COLUMN 1: Left Eyebrow, Title, Description & Bottom Hudbird Buttons */}
        <div className="flex w-full flex-col justify-between md:w-[30%] md:shrink-0">
          <div>
            <div className="mb-4 flex items-center gap-2 font-mono text-xs font-medium text-zinc-500 dark:text-zinc-400">
              <span className="inline-block h-1.5 w-1.5 bg-zinc-500 dark:bg-zinc-400" />
              <span>{numberLabel}</span>
            </div>

            <Heading
              as="h3"
              className="text-2xl leading-[1.12] font-bold tracking-tight text-zinc-950 sm:text-3xl lg:text-[40px] dark:text-white"
            >
              {title}
            </Heading>

            <Text className="mt-4 max-w-sm text-xs leading-relaxed text-zinc-600 sm:text-sm dark:text-zinc-400">
              {description}
            </Text>
          </div>

          {/* Bottom Action Buttons (Hudbird UI Component Style) */}
          <div className="mt-8 flex flex-wrap items-center gap-3 pt-4 md:mt-12">
            <Button
              href={hrefFor(secondaryHref)}
              variant="outline"
              size="sm"
              className="hb-secondary hb-radius font-mono text-xs tracking-wider uppercase"
            >
              {secondaryCtaLabel}
            </Button>
            <Button
              href={hrefFor(primaryHref)}
              variant="solid"
              color="primary"
              size="sm"
              className="hb-primary hb-radius font-mono text-xs tracking-wider uppercase"
            >
              {primaryCtaLabel}
            </Button>
          </div>
        </div>

        {/* COLUMN 2: Center Interactive 3D Transform Wireframe Illustration (Stroke Only) */}
        <div className="flex w-full items-center justify-center md:w-[38%] md:shrink-0">
          <Interactive3DShapeStage
            stepIndex={index}
            activeSubStep={activeSubStep}
            stackDepth={stackDepth}
            onCycleSubStep={() => onSelectSubStep((activeSubStep + 1) % subSteps.length)}
          />
        </div>

        {/* COLUMN 3: Right Minimal List with Hairline Dividers (Exact LlamaParse Reference) */}
        <div className="flex w-full flex-col justify-center md:w-[28%] md:shrink-0">
          {subSteps.map((sub, i) => {
            const isActive = activeSubStep === i;
            return (
              <div
                key={sub.id}
                role="button"
                tabIndex={0}
                onClick={() => onSelectSubStep(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelectSubStep(i);
                  }
                }}
                className={cn(
                  "cursor-pointer border-b border-zinc-200 py-4 transition-colors outline-none select-none sm:py-5 dark:border-zinc-800",
                  i === 0 && "border-t md:border-t-0"
                )}
              >
                {isActive ? (
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="inline-block h-1.5 w-1.5 shrink-0 bg-zinc-950 dark:bg-white" />
                      <Heading
                        as="h4"
                        className="text-sm font-semibold tracking-tight text-zinc-950 sm:text-base lg:text-lg dark:text-white"
                      >
                        {sub.title}
                      </Heading>
                    </div>
                    <Text className="mt-2 pl-4 text-xs leading-relaxed text-zinc-600 sm:text-sm dark:text-zinc-400">
                      {sub.description}
                    </Text>
                  </div>
                ) : (
                  <div className="text-sm font-normal text-zinc-400 transition-colors hover:text-zinc-800 sm:text-base lg:text-lg dark:text-zinc-500 dark:hover:text-zinc-200">
                    {sub.title}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT: LandingHowItWorks
// ============================================================================

export function LandingHowItWorks({ variant, content }: LandingSectionProps<"how-it-works">) {
  const [activeStep1Sub, setActiveStep1Sub] = React.useState(0);
  const [activeStep2Mode, setActiveStep2Mode] = React.useState(0);
  const [activeStep3Target, setActiveStep3Target] = React.useState(0);
  const [isStep1Hovered, setIsStep1Hovered] = React.useState(false);

  const { stackContainerRef, cardRefs, depths } = useStickyCardStack(3);

  // Auto-cycle Step 1 sub-steps smoothly when not hovered
  React.useEffect(() => {
    if (isStep1Hovered) return;
    const timer = setInterval(() => {
      setActiveStep1Sub((prev) => (prev + 1) % step1SubSteps.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isStep1Hovered]);

  return (
    <LandingFrame id="how-it-works">
      {variant === "horizontal" ? (
        /* Horizontal concise overview variant */
        <div className="space-y-12">
          <Grid cols={3} gap="lg">
            {content.items.map((item, index) => (
              <Card
                key={item.id}
                variant="bordered"
                radius="lg"
                className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-950"
              >
                <div className="min-w-0">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                      ▪ 0{index + 1}
                    </span>
                  </div>
                  <Heading as="h3" className="text-lg font-bold text-zinc-950 dark:text-white">
                    {item.title}
                  </Heading>
                  <Text className="mt-2 text-xs leading-relaxed text-zinc-600 sm:text-sm dark:text-zinc-400">
                    {item.description}
                  </Text>
                </div>
              </Card>
            ))}
          </Grid>
          {content.items[0] && (
            <div className="overflow-hidden rounded-2xl border border-zinc-200 shadow-xs dark:border-zinc-800">
              <HeroImageView image={content.items[0].image} priority={false} />
            </div>
          )}
        </div>
      ) : (
        /* ====================================================================
           VISUAL STEPS - STICKY CARD STACK ON SCROLL WITH 3D TRANSFORM SHAPES
           ==================================================================== */
        <div ref={stackContainerRef} className="relative space-y-12 pt-2 pb-20 sm:space-y-16">
          {/* CARD STEP 01: PAGE BUILDER */}
          <StepStackCard
            index={0}
            numberLabel="01"
            title={content.items[0]?.title || "Hudbird Page Builder"}
            description={
              content.items[0]?.description ||
              "Compose production-ready SaaS landing pages with real-time visual section stacking, live theme token syncing, and instant responsive previews."
            }
            secondaryCtaLabel="Learn more"
            primaryCtaLabel="Get started"
            secondaryHref="#features"
            primaryHref="#pricing"
            subSteps={step1SubSteps}
            activeSubStep={activeStep1Sub}
            onSelectSubStep={setActiveStep1Sub}
            stackDepth={depths[0] ?? 0}
            cardRef={(el) => {
              cardRefs.current[0] = el;
            }}
            onMouseEnter={() => setIsStep1Hovered(true)}
            onMouseLeave={() => setIsStep1Hovered(false)}
          />

          {/* CARD STEP 02: CODE EXPORT */}
          <StepStackCard
            index={1}
            numberLabel="02"
            title={content.items[1]?.title || "Export Clean Code"}
            description={
              content.items[1]?.description ||
              "Generate full-stack React & Next.js projects with Tailwind CSS v4, pristine static HTML/CSS, or copy-paste AI prompt recipes."
            }
            secondaryCtaLabel="Learn more"
            primaryCtaLabel="Export now"
            secondaryHref="#features"
            primaryHref="#pricing"
            subSteps={step2ExportModes}
            activeSubStep={activeStep2Mode}
            onSelectSubStep={setActiveStep2Mode}
            stackDepth={depths[1] ?? 0}
            cardRef={(el) => {
              cardRefs.current[1] = el;
            }}
          />

          {/* CARD STEP 03: AUDIT & DEPLOY */}
          <StepStackCard
            index={2}
            numberLabel="03"
            title={content.items[2]?.title || "Audit & Deploy"}
            description={
              content.items[2]?.description ||
              "Automate edge delivery to Vercel, Cloudflare, or Docker with 100/100 Lighthouse performance and zero layout shift."
            }
            secondaryCtaLabel="Audit report"
            primaryCtaLabel="Deploy now"
            secondaryHref="#faq"
            primaryHref="#cta"
            subSteps={step3DeployTargets}
            activeSubStep={activeStep3Target}
            onSelectSubStep={setActiveStep3Target}
            stackDepth={depths[2] ?? 0}
            cardRef={(el) => {
              cardRefs.current[2] = el;
            }}
          />
        </div>
      )}
    </LandingFrame>
  );
}
