"use client";
import * as React from "react";
import { Badge, Button, Card, CardBody, Grid, Heading, IconBox, Text } from "@hudbird/ui";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Sparkles,
  Layers,
  SlidersHorizontal,
  Palette,
  Download,
  Code2,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Monitor,
  Smartphone,
  Play,
  Check,
  Copy,
  FileCode,
  Terminal,
  ExternalLink,
  ShieldCheck,
  Zap,
  Globe,
  Server,
  Cloud,
} from "lucide-react";
import type { LandingSectionProps } from "@hudbird/schemas";
import { HeroImageView } from "../HeroSection";
import { LandingFrame, LandingHeading } from "../LandingShared";
import { cn } from "../../utils/cn";

// Sub-step definitions for Step 1: Page Builder Assembly
const step1SubSteps = [
  {
    id: "open",
    title: "Open Page Builder",
    description: "Launch the visual studio to compose layouts on a real-time preview canvas.",
  },
  {
    id: "customize",
    title: "Customize & Reorder Sections",
    description: "Toggle sections on or off, and reorder narrative flow with intuitive controls.",
  },
  {
    id: "theme",
    title: "Change Theme & Brand",
    description: "Tune OKLCH color palettes, typography, and border radius to match your system.",
  },
];

// Export modes for Step 2: Export Template
const step2ExportModes = [
  {
    id: "react",
    title: "React & Next.js Project",
    description:
      "Download fully typed TSX with Tailwind CSS v4, Framer Motion, and original source.",
    badge: "TSX / App.tsx",
  },
  {
    id: "html",
    title: "Clean HTML & CSS",
    description: "Zero-runtime static bundle with semantic markup and inlined CSS variables.",
    badge: "Zero Runtime",
  },
  {
    id: "ai",
    title: "Copy AI System Prompt",
    description:
      "Calibrated design token instructions for Claude, Stitch, or Cursor to extend pages.",
    badge: "Stitch & AI",
  },
];

// Deployment targets for Step 3: Production Deploy
const step3DeployTargets = [
  {
    id: "vercel",
    title: "Vercel & Next.js",
    description:
      "Instant edge deployment with automated preview URLs, Fluid Compute, and CDN caching.",
    icon: Globe,
  },
  {
    id: "cloudflare",
    title: "Cloudflare & Netlify",
    description:
      "Global CDN distribution with sub-millisecond static delivery and zero cold starts.",
    icon: Cloud,
  },
  {
    id: "docker",
    title: "Docker & Standalone",
    description: "Self-host anywhere with standalone micro-frontend or monorepo packages.",
    icon: Server,
  },
];

export function LandingHowItWorks({ variant, content }: LandingSectionProps<"how-it-works">) {
  // Step 1 Active Sub-step state & Auto-rotation
  const [activeStep1Sub, setActiveStep1Sub] = React.useState(0);
  const [isStep1Hovered, setIsStep1Hovered] = React.useState(false);
  const card1Ref = React.useRef<HTMLDivElement>(null);
  const isCard1InView = useInView(card1Ref, { margin: "-5% 0px -5% 0px" });

  React.useEffect(() => {
    if (!isCard1InView || isStep1Hovered) return;
    const timer = setInterval(() => {
      setActiveStep1Sub((prev) => (prev + 1) % step1SubSteps.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [isCard1InView, isStep1Hovered]);

  // Step 2 Active Export Mode state
  const [activeStep2Mode, setActiveStep2Mode] = React.useState(0);
  const [copiedCode, setCopiedCode] = React.useState(false);

  const handleCopyCode = () => {
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Step 3 Active Deploy Target state
  const [activeStep3Target, setActiveStep3Target] = React.useState(0);

  return (
    <LandingFrame id="how-it-works">
      {/* Section Header */}
      <div className="mb-12 sm:mb-16">
        <div className="mb-4 inline-flex items-center gap-2 font-mono text-xs tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
          <Sparkles className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500" />
          <span>WORKFLOW ARCHITECTURE</span>
        </div>
        <Heading
          as="h2"
          className="text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl lg:text-[2.25rem] lg:leading-[1.15] dark:text-white"
        >
          {content.title || "How Hudbird Powers Your Vision."}
        </Heading>
        {content.description && (
          <Text className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400">
            {content.description}
          </Text>
        )}
      </div>

      {variant === "horizontal" ? (
        /* Horizontal concise overview variant */
        <div className="space-y-12">
          <Grid cols={3} gap="lg">
            {content.items.map((item, index) => (
              <Card
                key={item.id}
                variant="bordered"
                radius="lg"
                className="rounded-2xl border border-zinc-200/90 bg-white/90 p-6 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/90"
              >
                <div className="min-w-0">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                      STEP 0{index + 1}
                    </span>
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                  </div>
                  <Heading as="h3" className="text-lg font-bold text-zinc-950 dark:text-white">
                    {item.title}
                  </Heading>
                  <Text className="mt-2 text-xs leading-relaxed text-zinc-600 sm:text-sm dark:text-zinc-300">
                    {item.description}
                  </Text>
                </div>
              </Card>
            ))}
          </Grid>
          {content.items[0] && (
            <div className="overflow-hidden rounded-2xl border border-zinc-200/80 shadow-md dark:border-white/10">
              <HeroImageView image={content.items[0].image} priority={false} />
            </div>
          )}
        </div>
      ) : (
        /* Visual Steps - Sticky 3D Paper Fold Stacking with LlamaParse 3-Column Layout */
        <div className="relative space-y-10 pt-4 pb-20 sm:space-y-16">
          {/* ========================================================
              CARD 1: PAGE BUILDER ASSEMBLY (Step 01)
             ======================================================== */}
          <div
            ref={card1Ref}
            className={cn(
              "hb-paper-fold-card sticky rounded-[32px] border border-zinc-200/90 bg-white/95 p-6 backdrop-blur-2xl transition-all duration-300 sm:p-8 lg:p-10 dark:border-white/10 dark:bg-zinc-950/95",
              "shadow-[0_-12px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_-16px_50px_rgba(0,0,0,0.45)]",
              "before:absolute before:inset-x-8 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-zinc-400/40 before:to-transparent dark:before:via-white/20"
            )}
            style={{
              top: "calc(90px + 0px)",
              zIndex: 10,
            }}
            onMouseEnter={() => setIsStep1Hovered(true)}
            onMouseLeave={() => setIsStep1Hovered(false)}
          >
            {/* 3D Paper Fold Header */}
            <div className="mb-6 flex items-center justify-between border-b border-zinc-100 pb-4 dark:border-white/[0.06]">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-zinc-900/5 px-2.5 py-1 font-mono text-[11px] font-semibold tracking-wider text-zinc-700 uppercase dark:bg-white/10 dark:text-zinc-300">
                  STEP 01 // ASSEMBLY
                </span>
                <span className="hidden text-xs text-zinc-400 sm:inline dark:text-zinc-500">•</span>
                <span className="hidden text-xs font-medium text-zinc-500 sm:inline dark:text-zinc-400">
                  Paper Fold Depth #1
                </span>
              </div>
              <div className="flex items-center gap-1 font-mono text-xs text-zinc-400 dark:text-zinc-500">
                <span>01</span>
                <span>/</span>
                <span>03</span>
              </div>
            </div>

            {/* 3-Column LlamaParse Style Layout */}
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between lg:gap-8">
              {/* Column 1: Left Context & CTAs */}
              <div className="flex w-full flex-col justify-between space-y-6 md:w-[28%] md:shrink-0">
                <div>
                  <div className="mb-3 font-mono text-xs font-semibold text-zinc-400 dark:text-zinc-500">
                    • 01
                  </div>
                  <Heading
                    as="h3"
                    className="text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl dark:text-white"
                  >
                    {content.items[0]?.title || "Hudbird Page Builder"}
                  </Heading>
                  <Text className="mt-3 text-xs leading-relaxed text-zinc-600 sm:text-sm dark:text-zinc-300">
                    {content.items[0]?.description ||
                      "Assemble production-grade landing pages in seconds. Choose from 12 section types, toggle modules on or off, and arrange your narrative flow effortlessly."}
                  </Text>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Button variant="bordered" size="sm" className="rounded-xl text-xs font-medium">
                    Learn More
                  </Button>
                  <Button
                    variant="solid"
                    size="sm"
                    className="rounded-xl text-xs font-medium shadow-sm"
                  >
                    Get Started
                  </Button>
                </div>
              </div>

              {/* Column 2: Center Morphing Flow Illustration */}
              <div className="relative flex min-h-[320px] w-full items-center justify-center overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-50/70 p-4 shadow-inner md:w-[40%] md:shrink-0 dark:border-white/10 dark:bg-white/[0.02]">
                {/* Radial Glow Bloom */}
                <div className="pointer-events-none absolute -inset-10 bg-radial from-blue-500/10 via-transparent to-transparent blur-2xl" />

                <AnimatePresence mode="wait">
                  {activeStep1Sub === 0 && (
                    /* 1. Open Page Builder Illustration */
                    <motion.div
                      key="sub-0"
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="relative w-full max-w-[280px] rounded-2xl border border-zinc-200/90 bg-white/95 p-4 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/95"
                    >
                      <div className="mb-3 flex items-center justify-between border-b border-zinc-100 pb-2 dark:border-white/[0.06]">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-red-400" />
                          <span className="h-2 w-2 rounded-full bg-amber-400" />
                          <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        </div>
                        <span className="font-mono text-[10px] text-zinc-400">
                          builder.hudbird.dev
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex h-7 items-center justify-between rounded-lg bg-zinc-100 px-2.5 text-[10px] font-medium text-zinc-700 dark:bg-white/10 dark:text-zinc-200">
                          <span>Navbar Capsule</span>
                          <span className="rounded bg-emerald-500/20 px-1 text-emerald-600 dark:text-emerald-400">
                            Active
                          </span>
                        </div>
                        <div className="flex h-14 items-center justify-center rounded-lg border border-dashed border-blue-400/40 bg-blue-50/50 p-2 text-center text-[10px] font-medium text-blue-600 dark:bg-blue-950/20 dark:text-blue-300">
                          Hero Split + Live Preview Canvas
                        </div>
                        <div className="flex h-7 items-center justify-between rounded-lg bg-zinc-100 px-2.5 text-[10px] font-medium text-zinc-700 dark:bg-white/10 dark:text-zinc-200">
                          <span>Logo Cloud Row</span>
                          <span className="font-mono text-[9px] text-zinc-400">8 Logos</span>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between rounded-xl bg-zinc-900 px-2.5 py-1.5 text-[10px] font-semibold text-white dark:bg-white dark:text-zinc-950">
                        <span>Ready to Assemble</span>
                        <ArrowRight className="h-3 w-3" />
                      </div>
                    </motion.div>
                  )}

                  {activeStep1Sub === 1 && (
                    /* 2. Customize & Reorder Sections Illustration */
                    <motion.div
                      key="sub-1"
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="relative w-full max-w-[280px] space-y-2 rounded-2xl border border-zinc-200/90 bg-white/95 p-4 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/95"
                    >
                      <div className="mb-2 flex items-center justify-between text-[11px] font-semibold text-zinc-800 dark:text-zinc-200">
                        <span>Section Order</span>
                        <span className="font-mono text-[10px] text-zinc-400">Reorderable</span>
                      </div>
                      {[
                        { name: "Navbar Capsule", on: true },
                        { name: "Split Hero", on: true, active: true },
                        { name: "Benefits Columns", on: true },
                        { name: "Pricing Cards", on: false },
                      ].map((sec, i) => (
                        <div
                          key={i}
                          className={cn(
                            "flex items-center justify-between rounded-xl border px-3 py-1.5 text-xs transition-colors",
                            sec.active
                              ? "border-blue-500/50 bg-blue-50/70 font-semibold text-blue-950 dark:bg-blue-950/30 dark:text-blue-200"
                              : "border-zinc-200/70 bg-zinc-50/80 text-zinc-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] text-zinc-400">0{i + 1}</span>
                            <span>{sec.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={cn(
                                "h-2 w-2 rounded-full",
                                sec.on ? "bg-emerald-500" : "bg-zinc-300 dark:bg-zinc-600"
                              )}
                            />
                            <span className="font-mono text-[9px] text-zinc-400">▲▼</span>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeStep1Sub === 2 && (
                    /* 3. Change Theme & Brand Illustration */
                    <motion.div
                      key="sub-2"
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="relative w-full max-w-[280px] rounded-2xl border border-zinc-200/90 bg-white/95 p-4 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/95"
                    >
                      <div className="mb-3 flex items-center justify-between text-[11px] font-semibold text-zinc-800 dark:text-zinc-200">
                        <span>Theme & Tokens</span>
                        <span className="rounded bg-purple-500/10 px-1.5 py-0.5 font-mono text-[10px] text-purple-600 dark:text-purple-400">
                          OKLCH
                        </span>
                      </div>
                      <div className="mb-3 flex justify-between gap-2">
                        {[
                          { color: "bg-indigo-600", label: "Indigo" },
                          { color: "bg-emerald-600", label: "Forest" },
                          { color: "bg-rose-500", label: "Sunset" },
                          { color: "bg-zinc-900 dark:bg-zinc-100", label: "Obsidian" },
                        ].map((c, i) => (
                          <div key={i} className="flex flex-col items-center gap-1">
                            <span
                              className={cn(
                                "h-7 w-7 rounded-full shadow-sm ring-2 ring-white/80 dark:ring-black/40",
                                c.color
                              )}
                            />
                            <span className="text-[9px] text-zinc-500 dark:text-zinc-400">
                              {c.label}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="rounded-xl border border-zinc-200/80 bg-zinc-50 p-2 text-center text-[10px] dark:border-white/10 dark:bg-white/[0.04]">
                        <span className="text-zinc-500 dark:text-zinc-400">Radius Token: </span>
                        <span className="font-semibold text-zinc-900 dark:text-white">
                          rounded-2xl (16px)
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="sr-only">
                  <HeroImageView image={content.items[0]?.image} priority={false} />
                </div>
              </div>

              {/* Column 3: Right Interactive Menu / Sub-steps */}
              <div className="w-full space-y-4 md:w-[28%] md:shrink-0">
                {step1SubSteps.map((sub, i) => {
                  const isActive = activeStep1Sub === i;
                  return (
                    <div
                      key={sub.id}
                      onClick={() => setActiveStep1Sub(i)}
                      className={cn(
                        "cursor-pointer rounded-2xl border p-4 transition-all duration-300 select-none",
                        isActive
                          ? "border-zinc-300 bg-white/95 shadow-md dark:border-white/20 dark:bg-zinc-900/95"
                          : "border-transparent bg-transparent hover:bg-zinc-50 dark:hover:bg-white/[0.02]"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "h-1.5 w-1.5 rounded-full",
                              isActive ? "animate-pulse bg-blue-500" : "bg-transparent"
                            )}
                          />
                          <Heading
                            as="h4"
                            className={cn(
                              "text-sm font-semibold tracking-tight transition-colors",
                              isActive
                                ? "text-zinc-950 dark:text-white"
                                : "text-zinc-500 dark:text-zinc-400"
                            )}
                          >
                            {sub.title}
                          </Heading>
                        </div>
                        {isActive && <ChevronRight className="h-3.5 w-3.5 text-blue-500" />}
                      </div>

                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="pt-2"
                        >
                          <Text className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
                            {sub.description}
                          </Text>
                          {/* Auto-cycle scrub timer indicator */}
                          <div className="mt-3 h-0.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-white/10">
                            <div className="h-full w-full animate-pulse bg-blue-500" />
                          </div>
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ========================================================
              CARD 2: EXPORT PRODUCTION TEMPLATE (Step 02)
             ======================================================== */}
          <div
            className={cn(
              "hb-paper-fold-card sticky rounded-[32px] border border-zinc-200/90 bg-white/95 p-6 backdrop-blur-2xl transition-all duration-300 sm:p-8 lg:p-10 dark:border-white/10 dark:bg-zinc-950/95",
              "shadow-[0_-12px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_-16px_50px_rgba(0,0,0,0.45)]",
              "before:absolute before:inset-x-8 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-zinc-400/40 before:to-transparent dark:before:via-white/20"
            )}
            style={{
              top: "calc(90px + 36px)",
              zIndex: 11,
            }}
          >
            {/* 3D Paper Fold Header */}
            <div className="mb-6 flex items-center justify-between border-b border-zinc-100 pb-4 dark:border-white/[0.06]">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-zinc-900/5 px-2.5 py-1 font-mono text-[11px] font-semibold tracking-wider text-zinc-700 uppercase dark:bg-white/10 dark:text-zinc-300">
                  STEP 02 // CODE GENERATION
                </span>
                <span className="hidden text-xs text-zinc-400 sm:inline dark:text-zinc-500">•</span>
                <span className="hidden text-xs font-medium text-zinc-500 sm:inline dark:text-zinc-400">
                  Paper Fold Depth #2
                </span>
              </div>
              <div className="flex items-center gap-1 font-mono text-xs text-zinc-400 dark:text-zinc-500">
                <span>02</span>
                <span>/</span>
                <span>03</span>
              </div>
            </div>

            {/* 3-Column Layout */}
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between lg:gap-8">
              {/* Column 1: Left Context & CTAs */}
              <div className="flex w-full flex-col justify-between space-y-6 md:w-[28%] md:shrink-0">
                <div>
                  <div className="mb-3 font-mono text-xs font-semibold text-zinc-400 dark:text-zinc-500">
                    • 02
                  </div>
                  <Heading
                    as="h3"
                    className="text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl dark:text-white"
                  >
                    {content.items[1]?.title || "Instant Code & Asset Export"}
                  </Heading>
                  <Text className="mt-3 text-xs leading-relaxed text-zinc-600 sm:text-sm dark:text-zinc-300">
                    {content.items[1]?.description ||
                      "Turn your visual composition into clean, enterprise-ready source code. Zero dependencies, pure Tailwind v4 styling, and strictly typed TypeScript components."}
                  </Text>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Button variant="bordered" size="sm" className="rounded-xl text-xs font-medium">
                    View Recipe
                  </Button>
                  <Button
                    variant="solid"
                    size="sm"
                    className="rounded-xl text-xs font-medium shadow-sm"
                  >
                    Export Now
                  </Button>
                </div>
              </div>

              {/* Column 2: Center Code Inspection Window */}
              <div className="relative flex min-h-[320px] w-full items-center justify-center overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-950 p-4 shadow-2xl md:w-[40%] md:shrink-0 dark:border-white/10 dark:bg-black/80">
                {/* Code Editor Mockup */}
                <div className="w-full max-w-[300px] font-mono text-xs text-zinc-300">
                  <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-red-400" />
                      <span className="h-2 w-2 rounded-full bg-amber-400" />
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      <span className="ml-2 text-[10px] text-zinc-400">
                        {activeStep2Mode === 0
                          ? "App.tsx"
                          : activeStep2Mode === 1
                            ? "index.html"
                            : "PROMPT.md"}
                      </span>
                    </div>
                    <Button
                      variant="bordered"
                      size="sm"
                      onClick={handleCopyCode}
                      className="h-6 gap-1 border-white/10 px-2 text-[10px] text-zinc-300 hover:bg-white/10"
                    >
                      {copiedCode ? (
                        <Check className="h-2.5 w-2.5 text-emerald-400" />
                      ) : (
                        <Copy className="h-2.5 w-2.5" />
                      )}
                      <span>{copiedCode ? "Copied" : "Copy"}</span>
                    </Button>
                  </div>

                  <AnimatePresence mode="wait">
                    {activeStep2Mode === 0 && (
                      <motion.div
                        key="react-code"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-1 text-[11px] leading-relaxed text-zinc-400"
                      >
                        <p>
                          <span className="text-purple-400">import</span> &#123; SaasLandingPage
                          &#125; <span className="text-purple-400">from</span>{" "}
                          <span className="text-emerald-300">&quot;@hudbird/marketing&quot;</span>;
                        </p>
                        <p className="pt-1">
                          <span className="text-blue-400">export default function</span>{" "}
                          <span className="text-amber-300">App</span>() &#123;
                        </p>
                        <p className="pl-3">
                          <span className="text-purple-400">return</span> &lt;
                          <span className="text-amber-300">SaasLandingPage</span>
                        </p>
                        <p className="pl-6 text-zinc-500">config=&#123;config&#125;</p>
                        <p className="pl-6 text-zinc-500">content=&#123;content&#125;</p>
                        <p className="pl-3">/&gt;;</p>
                        <p>&#125;</p>
                      </motion.div>
                    )}

                    {activeStep2Mode === 1 && (
                      <motion.div
                        key="html-code"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-1 text-[11px] leading-relaxed text-zinc-400"
                      >
                        <p>
                          <span className="text-zinc-500">
                            &lt;!-- Zero Runtime Static HTML --&gt;
                          </span>
                        </p>
                        <p>
                          &lt;<span className="text-blue-400">section</span>{" "}
                          <span className="text-purple-400">class</span>=
                          <span className="text-emerald-300">&quot;hb-hero&quot;</span>&gt;
                        </p>
                        <p className="pl-3">
                          &lt;<span className="text-blue-400">h1</span>{" "}
                          <span className="text-purple-400">class</span>=
                          <span className="text-emerald-300">&quot;hb-heading&quot;</span>&gt;Make
                          room...&lt;/<span className="text-blue-400">h1</span>&gt;
                        </p>
                        <p className="pl-3">
                          &lt;<span className="text-blue-400">p</span>&gt;Bring projects to
                          life...&lt;/<span className="text-blue-400">p</span>&gt;
                        </p>
                        <p>
                          &lt;/<span className="text-blue-400">section</span>&gt;
                        </p>
                      </motion.div>
                    )}

                    {activeStep2Mode === 2 && (
                      <motion.div
                        key="ai-prompt"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-1 text-[11px] leading-relaxed text-zinc-400"
                      >
                        <p>
                          <span className="text-zinc-500"># Stitch &amp; Claude Design Brief</span>
                        </p>
                        <p>
                          <span className="text-purple-400">- Palette:</span> OKLCH Ocean Indigo
                        </p>
                        <p>
                          <span className="text-purple-400">- Layout:</span> Asymmetric 3D Bento
                        </p>
                        <p>
                          <span className="text-purple-400">- Components:</span> Hudbird UI v1.5.0
                        </p>
                        <p>
                          <span className="text-purple-400">- Micro-Motion:</span> Spring Physics
                          60fps
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-2 text-[10px] text-zinc-400">
                    <span className="text-emerald-400">✓ 0 Errors • 100% Typed</span>
                    <span>12.4 kB gzip</span>
                  </div>
                </div>

                <div className="sr-only">
                  <HeroImageView image={content.items[1]?.image} priority={false} />
                </div>
              </div>

              {/* Column 3: Right Export Mode Selector (as user prompt specified) */}
              <div className="w-full space-y-3.5 md:w-[28%] md:shrink-0">
                {step2ExportModes.map((mode, i) => {
                  const isActive = activeStep2Mode === i;
                  return (
                    <div
                      key={mode.id}
                      onClick={() => setActiveStep2Mode(i)}
                      className={cn(
                        "cursor-pointer rounded-2xl border p-4 transition-all duration-300 select-none",
                        isActive
                          ? "border-zinc-300 bg-white/95 shadow-md dark:border-white/20 dark:bg-zinc-900/95"
                          : "border-transparent bg-transparent hover:bg-zinc-50 dark:hover:bg-white/[0.02]"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <Heading
                          as="h4"
                          className={cn(
                            "text-sm font-semibold tracking-tight transition-colors",
                            isActive
                              ? "text-zinc-950 dark:text-white"
                              : "text-zinc-700 dark:text-zinc-300"
                          )}
                        >
                          {mode.title}
                        </Heading>
                        <span className="rounded bg-zinc-100 px-2 py-0.5 font-mono text-[10px] font-medium text-zinc-600 dark:bg-white/10 dark:text-zinc-300">
                          {mode.badge}
                        </span>
                      </div>
                      <Text className="mt-1.5 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                        {mode.description}
                      </Text>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ========================================================
              CARD 3: PRODUCTION VERIFIED & DEPLOY (Step 03)
             ======================================================== */}
          <div
            className={cn(
              "hb-paper-fold-card sticky rounded-[32px] border border-zinc-200/90 bg-white/95 p-6 backdrop-blur-2xl transition-all duration-300 sm:p-8 lg:p-10 dark:border-white/10 dark:bg-zinc-950/95",
              "shadow-[0_-12px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_-16px_50px_rgba(0,0,0,0.45)]",
              "before:absolute before:inset-x-8 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-zinc-400/40 before:to-transparent dark:before:via-white/20"
            )}
            style={{
              top: "calc(90px + 72px)",
              zIndex: 12,
            }}
          >
            {/* 3D Paper Fold Header */}
            <div className="mb-6 flex items-center justify-between border-b border-zinc-100 pb-4 dark:border-white/[0.06]">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-zinc-900/5 px-2.5 py-1 font-mono text-[11px] font-semibold tracking-wider text-zinc-700 uppercase dark:bg-white/10 dark:text-zinc-300">
                  STEP 03 // VERIFICATION & DEPLOY
                </span>
                <span className="hidden text-xs text-zinc-400 sm:inline dark:text-zinc-500">•</span>
                <span className="hidden text-xs font-medium text-zinc-500 sm:inline dark:text-zinc-400">
                  Paper Fold Depth #3
                </span>
              </div>
              <div className="flex items-center gap-1 font-mono text-xs text-zinc-400 dark:text-zinc-500">
                <span>03</span>
                <span>/</span>
                <span>03</span>
              </div>
            </div>

            {/* 3-Column Layout */}
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between lg:gap-8">
              {/* Column 1: Left Context & CTAs */}
              <div className="flex w-full flex-col justify-between space-y-6 md:w-[28%] md:shrink-0">
                <div>
                  <div className="mb-3 font-mono text-xs font-semibold text-zinc-400 dark:text-zinc-500">
                    • 03
                  </div>
                  <Heading
                    as="h3"
                    className="text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl dark:text-white"
                  >
                    {content.items[2]?.title || "Production Verified & Deploy"}
                  </Heading>
                  <Text className="mt-3 text-xs leading-relaxed text-zinc-600 sm:text-sm dark:text-zinc-300">
                    {content.items[2]?.description ||
                      "Ship with complete peace of mind. Every section is battle-tested for accessibility (ARIA), responsive across all viewports, and passes 100% automated test coverage."}
                  </Text>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Button variant="bordered" size="sm" className="rounded-xl text-xs font-medium">
                    Audit Report
                  </Button>
                  <Button
                    variant="solid"
                    size="sm"
                    className="rounded-xl text-xs font-medium shadow-sm"
                  >
                    Deploy Now
                  </Button>
                </div>
              </div>

              {/* Column 2: Center Verification Dashboard Illustration */}
              <div className="relative flex min-h-[320px] w-full items-center justify-center overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-50/70 p-4 shadow-inner md:w-[40%] md:shrink-0 dark:border-white/10 dark:bg-white/[0.02]">
                <div className="w-full max-w-[280px] space-y-3">
                  {/* Lighthouse 100 Circular Gauge */}
                  <div className="rounded-2xl border border-zinc-200/90 bg-white/95 p-4 text-center shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/95">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-emerald-500 bg-emerald-50 text-xl font-bold text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400">
                      100
                    </div>
                    <h5 className="mt-2 text-xs font-semibold text-zinc-900 dark:text-white">
                      Lighthouse Performance Score
                    </h5>
                    <p className="mt-0.5 text-[10px] text-zinc-500 dark:text-zinc-400">
                      0ms CLS • 0.8s LCP • WCAG AA Pass
                    </p>
                  </div>

                  {/* Quality Checklist */}
                  <div className="space-y-1.5">
                    {[
                      "100% Automated Test Suite Passing",
                      "Zero Runtime CSS Variables",
                      "Touch & Pointer Ergonomics Calibrated",
                    ].map((checkItem, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 rounded-xl bg-white/80 px-3 py-1.5 text-[11px] text-zinc-700 shadow-2xs dark:bg-white/[0.05] dark:text-zinc-300"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                        <span className="truncate">{checkItem}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="sr-only">
                  <HeroImageView image={content.items[2]?.image} priority={false} />
                </div>
              </div>

              {/* Column 3: Right Deploy Targets */}
              <div className="w-full space-y-3.5 md:w-[28%] md:shrink-0">
                {step3DeployTargets.map((target, i) => {
                  const isActive = activeStep3Target === i;
                  const Icon = target.icon;
                  return (
                    <div
                      key={target.id}
                      onClick={() => setActiveStep3Target(i)}
                      className={cn(
                        "cursor-pointer rounded-2xl border p-4 transition-all duration-300 select-none",
                        isActive
                          ? "border-zinc-300 bg-white/95 shadow-md dark:border-white/20 dark:bg-zinc-900/95"
                          : "border-transparent bg-transparent hover:bg-zinc-50 dark:hover:bg-white/[0.02]"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                          <Heading
                            as="h4"
                            className={cn(
                              "text-sm font-semibold tracking-tight transition-colors",
                              isActive
                                ? "text-zinc-950 dark:text-white"
                                : "text-zinc-700 dark:text-zinc-300"
                            )}
                          >
                            {target.title}
                          </Heading>
                        </div>
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      </div>
                      <Text className="mt-1.5 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                        {target.description}
                      </Text>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </LandingFrame>
  );
}
