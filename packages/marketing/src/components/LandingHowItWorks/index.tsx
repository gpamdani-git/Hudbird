"use client";
import * as React from "react";
import { Badge, Button, Card, CardBody, Grid, Heading, Text } from "@hudbird/ui";
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
import { LandingFrame } from "../LandingShared";
import { cn } from "../../utils/cn";

// Sub-step definitions for Step 1: Page Builder Assembly (Image Reference 1)
const step1SubSteps = [
  {
    id: "open",
    title: "1. Open page builder",
    description:
      "Launch the visual studio to compose layouts on a real-time preview canvas with zero friction.",
  },
  {
    id: "customize",
    title: "2. Customize & reorder sections",
    description:
      "Toggle sections on or off (Navbar, Hero, Logos, Benefits, Pricing) and reorder narrative flow with intuitive controls.",
  },
  {
    id: "theme",
    title: "3. Change theme & brand system",
    description:
      "Tune OKLCH color palettes, typography pairings, and border radius to match your company's design identity.",
  },
];

// Export modes for Step 2: Export Template (Image Reference 1 layout)
const step2ExportModes = [
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

// Deploy targets for Step 3: Production Verified & Deploy
const step3DeployTargets = [
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
// ART-DIRECTED 3D ISOMETRIC VECTOR ILLUSTRATIONS (LlamaParse Style - Image 1)
// ============================================================================

/**
 * 3D Isometric Hexagon Base with internal coordinate axes, wireframe grid,
 * and drop shadow matching LlamaParse Image Reference 1.
 */
function IsometricHexagonBase({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 380 390"
      className={cn("w-full max-w-[340px] drop-shadow-xl select-none sm:max-w-[380px]", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Soft Radial Glow matching Image 1 */}
        <radialGradient id="llamaAura" cx="50%" cy="55%" r="50%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
          <stop offset="45%" stopColor="#818cf8" stopOpacity="0.25" />
          <stop offset="70%" stopColor="#c084fc" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#f472b6" stopOpacity="0" />
        </radialGradient>

        <linearGradient
          id="hexFill"
          x1="190"
          y1="145"
          x2="190"
          y2="345"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
          <stop offset="100%" stopColor="rgba(244,244,245,0.85)" />
        </linearGradient>

        <linearGradient
          id="hexFillDark"
          x1="190"
          y1="145"
          x2="190"
          y2="345"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="rgba(24,24,27,0.95)" />
          <stop offset="100%" stopColor="rgba(9,9,11,0.9)" />
        </linearGradient>

        {/* Shadow filter */}
        <filter id="hexShadow" x="90" y="140" width="200" height="220" filterUnits="userSpaceOnUse">
          <feDropShadow dx="3" dy="6" stdDeviation="5" floodOpacity="0.2" floodColor="#000" />
        </filter>
      </defs>

      {/* Background Aura Glow from Image 1 */}
      <circle cx="190" cy="225" r="150" fill="url(#llamaAura)" />

      {/* ==============================================================
          DOWNWARD ARROWS (Image Reference 1: ↓ ↓ ↓)
         ============================================================== */}
      <g className="text-zinc-800 dark:text-white" stroke="currentColor" strokeWidth="1.75">
        {/* Left arrow */}
        <line x1="158" y1="92" x2="158" y2="128" />
        <polygon points="158,135 154,127 162,127" fill="currentColor" stroke="none" />

        {/* Center arrow */}
        <line x1="190" y1="92" x2="190" y2="128" />
        <polygon points="190,135 186,127 194,127" fill="currentColor" stroke="none" />

        {/* Right arrow */}
        <line x1="222" y1="92" x2="222" y2="128" />
        <polygon points="222,135 218,127 226,127" fill="currentColor" stroke="none" />
      </g>

      {/* ==============================================================
          3D ISOMETRIC HEXAGON WITH DROP SHADOW (Image Reference 1)
         ============================================================== */}
      {/* Drop shadow facet underneath */}
      <polygon
        points="106,298 194,348 281,298 281,304 194,354 106,304"
        className="fill-zinc-900/25 dark:fill-black/60"
      />

      {/* Hexagon Body (Points: Top: 190,145 | TR: 277,195 | BR: 277,295 | B: 190,345 | BL: 103,295 | TL: 103,195) */}
      <polygon
        points="190,145 277,195 277,295 190,345 103,295 103,195"
        className="fill-white stroke-zinc-900 dark:fill-zinc-900/90 dark:stroke-white/40"
        strokeWidth="2"
      />

      {/* Internal 3D Isometric Coordinate Axes meeting at center (190, 245) */}
      <g className="stroke-zinc-800 dark:stroke-white/50" strokeWidth="1.5">
        {/* Axis going Up: (190,245) to (190,145) */}
        <line x1="190" y1="245" x2="190" y2="145" />
        {/* Axis going Down-Left: (190,245) to (103,295) */}
        <line x1="190" y1="245" x2="103" y2="295" />
        {/* Axis going Down-Right: (190,245) to (277,295) */}
        <line x1="190" y1="245" x2="277" y2="295" />
      </g>

      {/* Subtle 3D Perspective Grid Lines inside faces */}
      <g className="stroke-zinc-300 dark:stroke-white/10" strokeWidth="1" strokeDasharray="3 3">
        {/* Top Plane grid lines */}
        <line x1="146.5" y1="170" x2="233.5" y2="220" />
        <line x1="233.5" y1="170" x2="146.5" y2="220" />

        {/* Left Plane grid lines */}
        <line x1="146.5" y1="220" x2="146.5" y2="320" />
        <line x1="103" y1="245" x2="190" y2="295" />

        {/* Right Plane grid lines */}
        <line x1="233.5" y1="220" x2="233.5" y2="320" />
        <line x1="190" y1="295" x2="277" y2="245" />
      </g>

      {/* Dynamic Content Placed on the 3D Stage */}
      {children}
    </svg>
  );
}

/**
 * Step 1 Illustration: Dynamic Morphing Flow for Page Builder Steps (Image 1)
 */
function Step1Illustration({ activeStep }: { activeStep: number }) {
  return (
    <IsometricHexagonBase>
      {/* ==============================================================
          TOP STACKED DOCUMENTS (Image Reference 1)
         ============================================================== */}
      <g>
        {/* Sheet 1 (Back left, tilted -10°) */}
        <rect
          x="126"
          y="18"
          width="74"
          height="64"
          rx="5"
          className="fill-zinc-50 stroke-zinc-700 dark:fill-zinc-800 dark:stroke-zinc-500"
          strokeWidth="1.25"
          transform="rotate(-9 126 18)"
        />
        {/* Sheet 2 (Back right, tilted +9°) */}
        <rect
          x="180"
          y="18"
          width="74"
          height="64"
          rx="5"
          className="fill-zinc-50 stroke-zinc-700 dark:fill-zinc-800 dark:stroke-zinc-500"
          strokeWidth="1.25"
          transform="rotate(8 180 18)"
        />
        {/* Sheet 3 (Center front document with lines) */}
        <g className="drop-shadow-md filter">
          <rect
            x="148"
            y="22"
            width="84"
            height="68"
            rx="5"
            className="fill-white stroke-zinc-900 dark:fill-zinc-900 dark:stroke-white"
            strokeWidth="1.5"
          />
          {/* Header strip on front document */}
          <rect
            x="154"
            y="27"
            width="40"
            height="5"
            rx="2"
            className="fill-blue-500 dark:fill-blue-400"
          />
          {/* Text lines simulating Page Builder content */}
          <line
            x1="154"
            y1="38"
            x2="218"
            y2="38"
            className="stroke-zinc-400 dark:stroke-zinc-500"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="154"
            y1="45"
            x2="224"
            y2="45"
            className="stroke-zinc-300 dark:stroke-zinc-600"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="154"
            y1="52"
            x2="204"
            y2="52"
            className="stroke-zinc-300 dark:stroke-zinc-600"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="154"
            y1="59"
            x2="214"
            y2="59"
            className="stroke-zinc-400 dark:stroke-zinc-500"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="154"
            y1="66"
            x2="190"
            y2="66"
            className="stroke-zinc-300 dark:stroke-zinc-600"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="154"
            y1="73"
            x2="222"
            y2="73"
            className="stroke-zinc-400 dark:stroke-zinc-500"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>
      </g>

      {/* ==============================================================
          DYNAMIC DATA POINTS / NODES IN 3D HEXAGON (Image Reference 1)
         ============================================================== */}
      <AnimatePresence mode="wait">
        {activeStep === 0 && (
          /* Step 1: Open Page Builder - Real-Time Canvas Data Nodes */
          <motion.g
            key="sub-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {/* Cyan & Blue Nodes (Left face) */}
            <circle cx="135" cy="225" r="3.5" fill="#0284c7" />
            <circle cx="150" cy="210" r="2.5" fill="#38bdf8" />
            <circle cx="165" cy="235" r="3" fill="#0369a1" />
            <circle cx="145" cy="255" r="2.5" fill="#0284c7" />
            <circle cx="130" cy="270" r="3.5" fill="#38bdf8" />
            <circle cx="160" cy="285" r="3" fill="#0284c7" />
            <circle cx="175" cy="265" r="2.5" fill="#38bdf8" />
            <circle cx="120" cy="240" r="3" fill="#0284c7" />

            {/* Purple & Violet Nodes (Top face) */}
            <circle cx="180" cy="180" r="3.5" fill="#6366f1" />
            <circle cx="195" cy="165" r="3" fill="#818cf8" />
            <circle cx="210" cy="190" r="2.5" fill="#6366f1" />
            <circle cx="165" cy="195" r="3.5" fill="#a855f7" />
            <circle cx="190" cy="205" r="4" fill="#6366f1" />
            <circle cx="220" cy="175" r="2.5" fill="#c084fc" />

            {/* Magenta & Coral Pink Nodes (Right face) */}
            <circle cx="215" cy="225" r="3" fill="#ec4899" />
            <circle cx="230" cy="210" r="3.5" fill="#f43f5e" />
            <circle cx="245" cy="235" r="2.5" fill="#fb7185" />
            <circle cx="225" cy="255" r="3.5" fill="#ec4899" />
            <circle cx="250" cy="270" r="3" fill="#f43f5e" />
            <circle cx="220" cy="285" r="2.5" fill="#fb7185" />
            <circle cx="235" cy="265" r="3.5" fill="#ec4899" />
            <circle cx="260" cy="245" r="2.5" fill="#f43f5e" />

            {/* Glowing Center Connection Ring */}
            <circle
              cx="190"
              cy="245"
              r="7"
              className="fill-blue-500/20 stroke-blue-500 dark:stroke-blue-400"
              strokeWidth="2"
            />
            <circle cx="190" cy="245" r="3" className="fill-blue-600 dark:fill-blue-400" />
          </motion.g>
        )}

        {activeStep === 1 && (
          /* Step 2: Customize & Reorder Sections - Isometric Slabs */
          <motion.g
            key="sub-1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {/* Slab 1: Navbar (ON) */}
            <g transform="translate(0, 10)">
              <polygon
                points="190,175 250,210 190,245 130,210"
                className="fill-white stroke-blue-500 dark:fill-zinc-800 dark:stroke-blue-400"
                strokeWidth="1.5"
              />
              <circle cx="190" cy="210" r="3" fill="#3b82f6" />
              <text
                x="190"
                y="200"
                textAnchor="middle"
                className="fill-zinc-800 font-mono text-[9px] font-bold dark:fill-zinc-200"
              >
                01. NAVBAR [ON]
              </text>
            </g>

            {/* Slab 2: Hero Split (Active) */}
            <g transform="translate(0, 48)">
              <polygon
                points="190,175 250,210 190,245 130,210"
                className="fill-blue-50 stroke-blue-600 dark:fill-blue-950/60 dark:stroke-blue-400"
                strokeWidth="2"
              />
              <circle cx="190" cy="210" r="3.5" fill="#2563eb" />
              <text
                x="190"
                y="200"
                textAnchor="middle"
                className="fill-blue-950 font-mono text-[9px] font-bold dark:fill-blue-200"
              >
                02. SPLIT HERO [↕]
              </text>
            </g>

            {/* Slab 3: Benefits Columns (ON) */}
            <g transform="translate(0, 86)">
              <polygon
                points="190,175 250,210 190,245 130,210"
                className="fill-white stroke-emerald-500 dark:fill-zinc-800 dark:stroke-emerald-400"
                strokeWidth="1.5"
              />
              <circle cx="190" cy="210" r="3" fill="#10b981" />
              <text
                x="190"
                y="200"
                textAnchor="middle"
                className="fill-zinc-800 font-mono text-[9px] font-bold dark:fill-zinc-200"
              >
                03. BENEFITS [ON]
              </text>
            </g>
          </motion.g>
        )}

        {activeStep === 2 && (
          /* Step 3: Change Theme & Brand - OKLCH Theme Lighting */
          <motion.g
            key="sub-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {/* Color Spheres floating above 3D isometric plane */}
            <g transform="translate(145, 200)">
              <circle cx="0" cy="0" r="14" fill="#4f46e5" className="drop-shadow-md filter" />
              <circle cx="0" cy="0" r="12" fill="#6366f1" />
              <circle cx="-3" cy="-3" r="3" fill="rgba(255,255,255,0.6)" />
              <text
                x="0"
                y="24"
                textAnchor="middle"
                className="fill-zinc-700 font-mono text-[9px] font-semibold dark:fill-zinc-300"
              >
                Indigo
              </text>
            </g>

            <g transform="translate(190, 185)">
              <circle cx="0" cy="0" r="14" fill="#059669" className="drop-shadow-md filter" />
              <circle cx="0" cy="0" r="12" fill="#10b981" />
              <circle cx="-3" cy="-3" r="3" fill="rgba(255,255,255,0.6)" />
              <text
                x="0"
                y="24"
                textAnchor="middle"
                className="fill-zinc-700 font-mono text-[9px] font-semibold dark:fill-zinc-300"
              >
                Forest
              </text>
            </g>

            <g transform="translate(235, 200)">
              <circle cx="0" cy="0" r="14" fill="#e11d48" className="drop-shadow-md filter" />
              <circle cx="0" cy="0" r="12" fill="#f43f5e" />
              <circle cx="-3" cy="-3" r="3" fill="rgba(255,255,255,0.6)" />
              <text
                x="0"
                y="24"
                textAnchor="middle"
                className="fill-zinc-700 font-mono text-[9px] font-semibold dark:fill-zinc-300"
              >
                Sunset
              </text>
            </g>

            {/* OKLCH Color Spectrum Ring on Floor */}
            <ellipse
              cx="190"
              cy="285"
              rx="45"
              ry="22"
              className="fill-transparent stroke-purple-500 dark:stroke-purple-400"
              strokeWidth="2"
              strokeDasharray="6 4"
            />
            <text
              x="190"
              y="325"
              textAnchor="middle"
              className="fill-zinc-800 font-mono text-[10px] font-bold dark:fill-zinc-200"
            >
              OKLCH Brand Engine
            </text>
          </motion.g>
        )}
      </AnimatePresence>
    </IsometricHexagonBase>
  );
}

/**
 * Step 2 Illustration: Instant Code & Asset Export (LlamaParse Style)
 */
function Step2Illustration({ activeMode }: { activeMode: number }) {
  return (
    <IsometricHexagonBase>
      {/* Top Stacked Code & Component Sheets */}
      <g>
        <rect
          x="126"
          y="18"
          width="74"
          height="64"
          rx="5"
          className="fill-zinc-50 stroke-zinc-700 dark:fill-zinc-800 dark:stroke-zinc-500"
          strokeWidth="1.25"
          transform="rotate(-9 126 18)"
        />
        <rect
          x="180"
          y="18"
          width="74"
          height="64"
          rx="5"
          className="fill-zinc-50 stroke-zinc-700 dark:fill-zinc-800 dark:stroke-zinc-500"
          strokeWidth="1.25"
          transform="rotate(8 180 18)"
        />
        {/* Front Code Terminal Document */}
        <g className="drop-shadow-md filter">
          <rect
            x="148"
            y="22"
            width="84"
            height="68"
            rx="5"
            className="fill-zinc-900 stroke-zinc-950 dark:fill-black dark:stroke-white/40"
            strokeWidth="1.5"
          />
          {/* Terminal Dots */}
          <circle cx="156" cy="30" r="2" fill="#f87171" />
          <circle cx="162" cy="30" r="2" fill="#fbbf24" />
          <circle cx="168" cy="30" r="2" fill="#34d399" />
          <text x="210" y="32" textAnchor="end" className="fill-zinc-500 font-mono text-[7px]">
            App.tsx
          </text>
          {/* Code lines */}
          <line
            x1="154"
            y1="40"
            x2="198"
            y2="40"
            stroke="#a78bfa"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="154"
            y1="47"
            x2="220"
            y2="47"
            stroke="#60a5fa"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="160"
            y1="54"
            x2="210"
            y2="54"
            stroke="#34d399"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="160"
            y1="61"
            x2="190"
            y2="61"
            stroke="#f472b6"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="154"
            y1="68"
            x2="180"
            y2="68"
            stroke="#a78bfa"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="154"
            y1="75"
            x2="224"
            y2="75"
            stroke="#38bdf8"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>
      </g>

      {/* Compiler Core in 3D Isometric Space */}
      <g>
        {/* Isometric Code Cube / Stage */}
        <polygon
          points="190,210 235,235 190,260 145,235"
          className="fill-emerald-500/20 stroke-emerald-500 dark:stroke-emerald-400"
          strokeWidth="2"
        />
        <text
          x="190"
          y="240"
          textAnchor="middle"
          className="fill-emerald-600 font-mono text-[10px] font-bold dark:fill-emerald-300"
        >
          {activeMode === 0 ? "TSX / App.tsx" : activeMode === 1 ? "index.html" : "PROMPT.md"}
        </text>

        {/* Scattered syntax particle nodes */}
        <circle cx="135" cy="225" r="3" fill="#34d399" />
        <circle cx="160" cy="285" r="3" fill="#38bdf8" />
        <circle cx="225" cy="255" r="3" fill="#a78bfa" />
        <circle cx="245" cy="235" r="3" fill="#f472b6" />
        <circle cx="190" cy="185" r="3.5" fill="#34d399" />
        <circle cx="145" cy="265" r="2.5" fill="#60a5fa" />
        <circle cx="235" cy="275" r="2.5" fill="#34d399" />

        <text
          x="190"
          y="315"
          textAnchor="middle"
          className="fill-zinc-800 font-mono text-[10px] font-bold dark:fill-zinc-200"
        >
          ✓ Zero Runtime • 100% Typed
        </text>
      </g>
    </IsometricHexagonBase>
  );
}

/**
 * Step 3 Illustration: Production Verified & Deploy (LlamaParse Style)
 */
function Step3Illustration({ activeTarget }: { activeTarget: number }) {
  return (
    <IsometricHexagonBase>
      {/* Top Stacked Audit Documents */}
      <g>
        <rect
          x="126"
          y="18"
          width="74"
          height="64"
          rx="5"
          className="fill-zinc-50 stroke-zinc-700 dark:fill-zinc-800 dark:stroke-zinc-500"
          strokeWidth="1.25"
          transform="rotate(-9 126 18)"
        />
        <rect
          x="180"
          y="18"
          width="74"
          height="64"
          rx="5"
          className="fill-zinc-50 stroke-zinc-700 dark:fill-zinc-800 dark:stroke-zinc-500"
          strokeWidth="1.25"
          transform="rotate(8 180 18)"
        />
        {/* Front Lighthouse 100 Score Document */}
        <g className="drop-shadow-md filter">
          <rect
            x="148"
            y="22"
            width="84"
            height="68"
            rx="5"
            className="fill-white stroke-zinc-900 dark:fill-zinc-900 dark:stroke-white"
            strokeWidth="1.5"
          />
          {/* Circular 100 Gauge Badge */}
          <circle
            cx="190"
            cy="48"
            r="16"
            className="fill-emerald-50 stroke-emerald-500 dark:fill-emerald-950/40"
            strokeWidth="2"
          />
          <text
            x="190"
            y="52"
            textAnchor="middle"
            className="fill-emerald-600 font-mono text-[11px] font-bold dark:fill-emerald-400"
          >
            100
          </text>
          <text
            x="190"
            y="74"
            textAnchor="middle"
            className="fill-zinc-700 font-mono text-[8px] font-bold dark:fill-zinc-300"
          >
            LIGHTHOUSE PASS
          </text>
        </g>
      </g>

      {/* 3D Global Deployment Hub Nodes */}
      <g>
        {/* Center Deploy Nexus */}
        <polygon
          points="190,210 235,235 190,260 145,235"
          className="fill-blue-500/20 stroke-blue-500 dark:stroke-blue-400"
          strokeWidth="2"
        />
        <text
          x="190"
          y="240"
          textAnchor="middle"
          className="fill-blue-600 font-mono text-[10px] font-bold dark:fill-blue-300"
        >
          {activeTarget === 0
            ? "Vercel & Next.js"
            : activeTarget === 1
              ? "Cloudflare Edge"
              : "Docker Engine"}
        </text>

        {/* Global Edge Node Points */}
        <circle cx="130" cy="240" r="4" fill="#10b981" />
        <circle cx="160" cy="275" r="3.5" fill="#3b82f6" />
        <circle cx="220" cy="275" r="3.5" fill="#8b5cf6" />
        <circle cx="250" cy="240" r="4" fill="#10b981" />
        <circle cx="190" cy="180" r="4" fill="#06b6d4" />

        <text
          x="190"
          y="315"
          textAnchor="middle"
          className="fill-zinc-800 font-mono text-[10px] font-bold dark:fill-zinc-200"
        >
          0ms CLS • 0.8s LCP • WCAG AA
        </text>
      </g>
    </IsometricHexagonBase>
  );
}

// ============================================================================
// MAIN COMPONENT: LandingHowItWorks
// ============================================================================

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
    }, 4500);
    return () => clearInterval(timer);
  }, [isCard1InView, isStep1Hovered]);

  // Step 2 Active Export Mode state
  const [activeStep2Mode, setActiveStep2Mode] = React.useState(0);

  // Step 3 Active Deploy Target state
  const [activeStep3Target, setActiveStep3Target] = React.useState(0);

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
        /* ====================================================================
           VISUAL STEPS - STACKED CARD SCROLL / CARD STACKING EFFECT
           Exact 1:1 Layout & Typography from Image Reference 1 (LlamaParse)
           ==================================================================== */
        <div className="relative space-y-12 pt-4 pb-24 sm:space-y-20">
          {/* ========================================================
              CARD STEP 1: PAGE BUILDER ASSEMBLY (Image Reference 1)
             ======================================================== */}
          <div
            ref={card1Ref}
            className={cn(
              "hb-paper-fold-card sticky top-[90px] z-10 rounded-[32px] border border-zinc-200/90 bg-white/95 p-8 sm:rounded-[40px] sm:p-12 lg:p-14",
              "shadow-[0_-12px_40px_rgba(0,0,0,0.06)] backdrop-blur-2xl transition-all duration-300",
              "dark:border-white/10 dark:bg-zinc-950/95 dark:shadow-[0_-16px_50px_rgba(0,0,0,0.45)]",
              "before:absolute before:inset-x-8 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-zinc-400/40 before:to-transparent dark:before:via-white/20"
            )}
            onMouseEnter={() => setIsStep1Hovered(true)}
            onMouseLeave={() => setIsStep1Hovered(false)}
          >
            {/* Paper Fold Depth Header */}
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

            {/* 3-Column LlamaParse Style Layout (Image Reference 1) */}
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between lg:gap-10">
              {/* Column 1: Left Context & CTAs */}
              <div className="flex w-full flex-col justify-between space-y-6 md:w-[28%] md:shrink-0">
                <div>
                  <div className="mb-4 font-mono text-xs font-semibold text-zinc-400 dark:text-zinc-500">
                    ▪ 01
                  </div>
                  <Heading
                    as="h3"
                    className="text-3xl leading-[1.12] font-bold tracking-tight text-zinc-950 sm:text-4xl lg:text-[42px] dark:text-white"
                  >
                    {content.items[0]?.title || "Hudbird Page Builder"}
                  </Heading>
                  <Text className="mt-4 max-w-sm text-xs leading-relaxed text-zinc-600 sm:text-sm dark:text-zinc-300">
                    {content.items[0]?.description ||
                      "Hudbird powers enterprise-grade landing page automation with industry-best component composition, section reordering, and theme customization."}
                  </Text>
                </div>

                {/* Bottom Rectangular Buttons matching Image Reference 1 */}
                <div className="flex flex-wrap items-center gap-3 pt-6 sm:pt-8">
                  <Button
                    variant="bordered"
                    className="rounded-none border border-zinc-900 px-5 py-2 font-mono text-[11px] font-semibold tracking-wider text-zinc-900 uppercase hover:bg-zinc-100 dark:border-white dark:text-white dark:hover:bg-white/10"
                  >
                    LEARN MORE
                  </Button>
                  <Button
                    variant="solid"
                    className="rounded-none bg-zinc-950 px-5 py-2 font-mono text-[11px] font-semibold tracking-wider text-white uppercase shadow-sm hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                  >
                    GET STARTED
                  </Button>
                </div>
              </div>

              {/* Column 2: Center Vector Isometric 3D Illustration */}
              <div className="relative flex min-h-[340px] w-full items-center justify-center overflow-hidden rounded-3xl border border-zinc-100 bg-zinc-50/50 p-4 md:w-[42%] md:shrink-0 dark:border-white/[0.04] dark:bg-white/[0.01]">
                <Step1Illustration activeStep={activeStep1Sub} />
              </div>

              {/* Column 3: Right Vertical List with Thin Dividers (Image Reference 1) */}
              <div className="w-full space-y-1 md:w-[28%] md:shrink-0">
                {step1SubSteps.map((sub, i) => {
                  const isActive = activeStep1Sub === i;
                  return (
                    <div key={sub.id} className="w-full">
                      <div
                        onClick={() => setActiveStep1Sub(i)}
                        className="cursor-pointer py-3.5 transition-colors select-none"
                      >
                        {isActive ? (
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="h-1.5 w-1.5 rounded-xs bg-zinc-950 dark:bg-white" />
                              <Heading
                                as="h4"
                                className="text-base font-bold tracking-tight text-zinc-950 sm:text-lg dark:text-white"
                              >
                                {sub.title}
                              </Heading>
                            </div>
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25 }}
                              className="mt-2 pl-3.5 text-xs leading-relaxed text-zinc-600 sm:text-sm dark:text-zinc-400"
                            >
                              {sub.description}
                            </motion.p>
                          </div>
                        ) : (
                          <div className="text-base font-medium text-zinc-400 transition-colors hover:text-zinc-800 sm:text-lg dark:text-zinc-500 dark:hover:text-zinc-200">
                            {sub.title}
                          </div>
                        )}
                      </div>
                      <div className="h-px w-full bg-zinc-200/70 dark:bg-white/10" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ========================================================
              CARD STEP 2: INSTANT CODE & ASSET EXPORT (Step 02)
             ======================================================== */}
          <div
            className={cn(
              "hb-paper-fold-card sticky top-[114px] z-20 rounded-[32px] border border-zinc-200/90 bg-white/95 p-8 sm:rounded-[40px] sm:p-12 lg:p-14",
              "shadow-[0_-16px_45px_rgba(0,0,0,0.08)] backdrop-blur-2xl transition-all duration-300",
              "dark:border-white/10 dark:bg-zinc-950/95 dark:shadow-[0_-20px_60px_rgba(0,0,0,0.55)]",
              "before:absolute before:inset-x-8 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-zinc-400/40 before:to-transparent dark:before:via-white/20"
            )}
          >
            {/* Paper Fold Depth Header */}
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
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between lg:gap-10">
              {/* Column 1: Left Context & CTAs */}
              <div className="flex w-full flex-col justify-between space-y-6 md:w-[28%] md:shrink-0">
                <div>
                  <div className="mb-4 font-mono text-xs font-semibold text-zinc-400 dark:text-zinc-500">
                    ▪ 02
                  </div>
                  <Heading
                    as="h3"
                    className="text-3xl leading-[1.12] font-bold tracking-tight text-zinc-950 sm:text-4xl lg:text-[42px] dark:text-white"
                  >
                    {content.items[1]?.title || "Instant Code & Asset Export"}
                  </Heading>
                  <Text className="mt-4 max-w-sm text-xs leading-relaxed text-zinc-600 sm:text-sm dark:text-zinc-300">
                    {content.items[1]?.description ||
                      "Turn your visual assembly into clean, enterprise-ready source code. Zero dependencies, pure Tailwind v4 styling, and strictly typed TypeScript components."}
                  </Text>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-6 sm:pt-8">
                  <Button
                    variant="bordered"
                    className="rounded-none border border-zinc-900 px-5 py-2 font-mono text-[11px] font-semibold tracking-wider text-zinc-900 uppercase hover:bg-zinc-100 dark:border-white dark:text-white dark:hover:bg-white/10"
                  >
                    LEARN MORE
                  </Button>
                  <Button
                    variant="solid"
                    className="rounded-none bg-zinc-950 px-5 py-2 font-mono text-[11px] font-semibold tracking-wider text-white uppercase shadow-sm hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                  >
                    EXPORT NOW
                  </Button>
                </div>
              </div>

              {/* Column 2: Center Vector Isometric 3D Illustration */}
              <div className="relative flex min-h-[340px] w-full items-center justify-center overflow-hidden rounded-3xl border border-zinc-100 bg-zinc-50/50 p-4 md:w-[42%] md:shrink-0 dark:border-white/[0.04] dark:bg-white/[0.01]">
                <Step2Illustration activeMode={activeStep2Mode} />
              </div>

              {/* Column 3: Right Export Mode List with Thin Dividers */}
              <div className="w-full space-y-1 md:w-[28%] md:shrink-0">
                {step2ExportModes.map((mode, i) => {
                  const isActive = activeStep2Mode === i;
                  return (
                    <div key={mode.id} className="w-full">
                      <div
                        onClick={() => setActiveStep2Mode(i)}
                        className="cursor-pointer py-3.5 transition-colors select-none"
                      >
                        {isActive ? (
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="h-1.5 w-1.5 rounded-xs bg-zinc-950 dark:bg-white" />
                              <Heading
                                as="h4"
                                className="text-base font-bold tracking-tight text-zinc-950 sm:text-lg dark:text-white"
                              >
                                {mode.title}
                              </Heading>
                            </div>
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25 }}
                              className="mt-2 pl-3.5 text-xs leading-relaxed text-zinc-600 sm:text-sm dark:text-zinc-400"
                            >
                              {mode.description}
                            </motion.p>
                          </div>
                        ) : (
                          <div className="text-base font-medium text-zinc-400 transition-colors hover:text-zinc-800 sm:text-lg dark:text-zinc-500 dark:hover:text-zinc-200">
                            {mode.title}
                          </div>
                        )}
                      </div>
                      <div className="h-px w-full bg-zinc-200/70 dark:bg-white/10" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ========================================================
              CARD STEP 3: PRODUCTION VERIFIED & DEPLOY (Step 03)
             ======================================================== */}
          <div
            className={cn(
              "hb-paper-fold-card sticky top-[138px] z-30 rounded-[32px] border border-zinc-200/90 bg-white/95 p-8 sm:rounded-[40px] sm:p-12 lg:p-14",
              "shadow-[0_-20px_50px_rgba(0,0,0,0.1)] backdrop-blur-2xl transition-all duration-300",
              "dark:border-white/10 dark:bg-zinc-950/95 dark:shadow-[0_-24px_70px_rgba(0,0,0,0.65)]",
              "before:absolute before:inset-x-8 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-zinc-400/40 before:to-transparent dark:before:via-white/20"
            )}
          >
            {/* Paper Fold Depth Header */}
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
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between lg:gap-10">
              {/* Column 1: Left Context & CTAs */}
              <div className="flex w-full flex-col justify-between space-y-6 md:w-[28%] md:shrink-0">
                <div>
                  <div className="mb-4 font-mono text-xs font-semibold text-zinc-400 dark:text-zinc-500">
                    ▪ 03
                  </div>
                  <Heading
                    as="h3"
                    className="text-3xl leading-[1.12] font-bold tracking-tight text-zinc-950 sm:text-4xl lg:text-[42px] dark:text-white"
                  >
                    {content.items[2]?.title || "Production Verified & Deploy"}
                  </Heading>
                  <Text className="mt-4 max-w-sm text-xs leading-relaxed text-zinc-600 sm:text-sm dark:text-zinc-300">
                    {content.items[2]?.description ||
                      "Ship with complete peace of mind. Every section is battle-tested for accessibility (ARIA), responsive across all viewports, and passes 100% automated test coverage."}
                  </Text>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-6 sm:pt-8">
                  <Button
                    variant="bordered"
                    className="rounded-none border border-zinc-900 px-5 py-2 font-mono text-[11px] font-semibold tracking-wider text-zinc-900 uppercase hover:bg-zinc-100 dark:border-white dark:text-white dark:hover:bg-white/10"
                  >
                    AUDIT REPORT
                  </Button>
                  <Button
                    variant="solid"
                    className="rounded-none bg-zinc-950 px-5 py-2 font-mono text-[11px] font-semibold tracking-wider text-white uppercase shadow-sm hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                  >
                    DEPLOY NOW
                  </Button>
                </div>
              </div>

              {/* Column 2: Center Vector Isometric 3D Illustration */}
              <div className="relative flex min-h-[340px] w-full items-center justify-center overflow-hidden rounded-3xl border border-zinc-100 bg-zinc-50/50 p-4 md:w-[42%] md:shrink-0 dark:border-white/[0.04] dark:bg-white/[0.01]">
                <Step3Illustration activeTarget={activeStep3Target} />
              </div>

              {/* Column 3: Right Deploy Target List with Thin Dividers */}
              <div className="w-full space-y-1 md:w-[28%] md:shrink-0">
                {step3DeployTargets.map((target, i) => {
                  const isActive = activeStep3Target === i;
                  return (
                    <div key={target.id} className="w-full">
                      <div
                        onClick={() => setActiveStep3Target(i)}
                        className="cursor-pointer py-3.5 transition-colors select-none"
                      >
                        {isActive ? (
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="h-1.5 w-1.5 rounded-xs bg-zinc-950 dark:bg-white" />
                              <Heading
                                as="h4"
                                className="text-base font-bold tracking-tight text-zinc-950 sm:text-lg dark:text-white"
                              >
                                {target.title}
                              </Heading>
                            </div>
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25 }}
                              className="mt-2 pl-3.5 text-xs leading-relaxed text-zinc-600 sm:text-sm dark:text-zinc-400"
                            >
                              {target.description}
                            </motion.p>
                          </div>
                        ) : (
                          <div className="text-base font-medium text-zinc-400 transition-colors hover:text-zinc-800 sm:text-lg dark:text-zinc-500 dark:hover:text-zinc-200">
                            {target.title}
                          </div>
                        )}
                      </div>
                      <div className="h-px w-full bg-zinc-200/70 dark:bg-white/10" />
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
