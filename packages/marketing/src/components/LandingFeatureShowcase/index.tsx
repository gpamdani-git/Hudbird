"use client";
import * as React from "react";
import {
  Accordion,
  AccordionItem,
  Badge,
  Button,
  Card,
  CardBody,
  Grid,
  Heading,
  IconBox,
  Text,
} from "@hudbird/ui";
import { motion, AnimatePresence, useMotionValue, useAnimationFrame } from "framer-motion";
import {
  Scan,
  Code2,
  Layers,
  SlidersHorizontal,
  Smartphone,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Eye,
  Calendar,
  LayoutDashboard,
  ListChecks,
  FileText,
  Star,
  MapPin,
  Clock,
  CreditCard,
  Heart,
  ArrowRight,
  Maximize2,
} from "lucide-react";
import type { LandingSectionProps, LandingFeature } from "@hudbird/schemas";
import { HeroImageView } from "../HeroSection";
import { LandingFrame, LandingCheckItem, LandingDemoNote } from "../LandingShared";
import { cn } from "../../utils/cn";

interface FeatureCardData {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  tint: {
    bgLight: string;
    borderLight: string;
    bgDark: string;
    borderDark: string;
  };
}

const defaultFeatureCards: FeatureCardData[] = [
  {
    id: "token-intelligence",
    icon: Scan,
    title: "Component Intelligence",
    description: "Auto-detects and clusters visual tokens and design primitives across all layers.",
    tint: {
      bgLight: "bg-purple-50/40",
      borderLight: "border-purple-200/60",
      bgDark: "dark:bg-purple-950/[0.18]",
      borderDark: "dark:border-purple-500/20",
    },
  },
  {
    id: "code-generation",
    icon: Code2,
    title: "Code Generation",
    description: "Instant zero-runtime TypeScript code export for React, Next.js, and Tailwind v4.",
    tint: {
      bgLight: "bg-blue-50/40",
      borderLight: "border-blue-200/60",
      bgDark: "dark:bg-blue-950/[0.18]",
      borderDark: "dark:border-blue-500/20",
    },
  },
  {
    id: "fluid-previews",
    icon: Layers,
    title: "Fluid Previews",
    description:
      "Instant live multi-framework previews with dynamic theme sync and viewport reflow.",
    tint: {
      bgLight: "bg-zinc-50/90",
      borderLight: "border-zinc-200/80",
      bgDark: "dark:bg-zinc-900/80",
      borderDark: "dark:border-white/10",
    },
  },
  {
    id: "precision-tokens",
    icon: SlidersHorizontal,
    title: "Precision Tokens",
    description:
      "Tailor UI systems with calibrated OKLCH color spaces, cubic bezier curves, and ARIA.",
    tint: {
      bgLight: "bg-emerald-50/40",
      borderLight: "border-emerald-200/60",
      bgDark: "dark:bg-emerald-950/[0.18]",
      borderDark: "dark:border-emerald-500/20",
    },
  },
  {
    id: "mobile-orchestration",
    icon: Smartphone,
    title: "Mobile Orchestration",
    description:
      "Native-like tactile feel with spring motion drawers, gestures, and touch ergonomics.",
    tint: {
      bgLight: "bg-amber-50/40",
      borderLight: "border-amber-200/60",
      bgDark: "dark:bg-amber-950/[0.15]",
      borderDark: "dark:border-amber-500/20",
    },
  },
  {
    id: "verified-engine",
    icon: ShieldCheck,
    title: "Production Verified",
    description: "Strict TypeScript types, 100% test coverage, and enterprise grade performance.",
    tint: {
      bgLight: "bg-rose-50/40",
      borderLight: "border-rose-200/60",
      bgDark: "dark:bg-rose-950/[0.15]",
      borderDark: "dark:border-rose-500/20",
    },
  },
];

const featureIcons = [LayoutDashboard, ListChecks, FileText];
const featureBullets: Record<number, string[]> = {
  0: [
    "Keep brief, priority, and active status in one shared view",
    "Spot blockers early without switching across tools",
  ],
  1: [
    "Turn high-level goals into clear next steps for the team",
    "Track review milestones with lightweight context",
  ],
  2: [
    "Attach meeting decisions directly to the work item",
    "Preserve readable history as the project evolves",
  ],
};

function FeatureCardVisual({ cardIndex }: { cardIndex: number }) {
  const [isHovered, setIsHovered] = React.useState(false);

  if (cardIndex === 0) {
    // 1. Component Intelligence: Monochrome photo with interactive floating token tags (like Image 1 facial tags)
    return (
      <div
        className="relative h-[250px] w-full overflow-hidden rounded-2xl border border-zinc-200/70 bg-zinc-950/[0.04] sm:h-[270px] dark:border-white/10 dark:bg-white/[0.03]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src="https://images.pexels.com/photos/5882678/pexels-photo-5882678.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="Intelligence preview"
          className="h-full w-full object-cover contrast-125 grayscale transition-transform duration-700 ease-out hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Floating Token Badges with smooth hover morphing/pulsing */}
        <motion.div
          animate={isHovered ? { y: [-2, 2, -2], x: [-1, 1, -1] } : { y: 0, x: 0 }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-10 z-10"
        >
          <div className="rounded-lg border border-white/30 bg-black/50 px-2.5 py-1 text-[11px] font-medium text-white shadow-lg backdrop-blur-md">
            NavbarCapsule
          </div>
        </motion.div>

        <motion.div
          animate={isHovered ? { y: [2, -2, 2], x: [1, -1, 1] } : { y: 0, x: 0 }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          className="absolute right-6 bottom-14 z-10"
        >
          <div className="rounded-lg border border-white/30 bg-black/50 px-2.5 py-1 text-[11px] font-medium text-white shadow-lg backdrop-blur-md">
            SplitIntroduction
          </div>
        </motion.div>

        <motion.div
          animate={isHovered ? { y: [-1, 2, -1] } : { y: 0 }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          className="absolute bottom-5 left-4 z-10"
        >
          <div className="rounded-lg border border-white/30 bg-black/50 px-2.5 py-1 text-[11px] font-medium text-white shadow-lg backdrop-blur-md">
            OKLCH Token
          </div>
        </motion.div>
      </div>
    );
  }

  if (cardIndex === 1) {
    // 2. Code Generation: Conversation / live export feed matching Image 1
    return (
      <div
        className="relative flex h-[250px] w-full flex-col justify-center space-y-2.5 rounded-2xl border border-zinc-200/70 bg-zinc-50/70 p-3.5 sm:h-[270px] dark:border-white/10 dark:bg-white/[0.03]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          animate={isHovered ? { x: [0, 2, 0] } : { x: 0 }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="rounded-xl border border-zinc-200/80 bg-white/90 p-3 shadow-sm dark:border-white/10 dark:bg-zinc-900/90"
        >
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-200 text-[10px] font-bold text-zinc-700 dark:bg-white/15 dark:text-zinc-300">
              D
            </div>
            <span className="text-[11px] font-semibold text-zinc-900 dark:text-white">
              Douglas Blake
            </span>
          </div>
          <p className="mt-1.5 text-[10px] leading-relaxed text-zinc-600 dark:text-zinc-300">
            &ldquo;Convert Figma tokens into zero-runtime accessible components.&rdquo;
          </p>
        </motion.div>

        <motion.div
          animate={isHovered ? { scale: [1, 1.01, 1] } : { scale: 1 }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
          className="rounded-xl border border-blue-500/20 bg-blue-50/60 p-3 shadow-sm dark:border-blue-400/20 dark:bg-blue-950/30"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white">
                E
              </div>
              <span className="text-[11px] font-semibold text-zinc-900 dark:text-white">
                Eleanor Blake
              </span>
            </div>
            <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400">Exported</span>
          </div>
          <p className="mt-1.5 font-mono text-[10px] text-zinc-700 dark:text-zinc-200">
            &lt;LandingNavbar variant=&quot;nav-13&quot; /&gt;
          </p>
        </motion.div>
      </div>
    );
  }

  if (cardIndex === 2) {
    // 3. Fluid Previews: 2x2 framework preview cards matching Image 1
    return (
      <div
        className="relative flex h-[250px] w-full flex-wrap gap-2.5 rounded-2xl border border-zinc-200/70 bg-zinc-50/70 p-3 sm:h-[270px] dark:border-white/10 dark:bg-white/[0.03]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {[
          {
            label: "REACT",
            badge: "v19",
            img: "https://images.pexels.com/photos/5951735/pexels-photo-5951735.jpeg?auto=compress&cs=tinysrgb&w=300",
          },
          {
            label: "NEXT.JS",
            badge: "v15",
            img: "https://images.pexels.com/photos/7582781/pexels-photo-7582781.jpeg?auto=compress&cs=tinysrgb&w=300",
          },
          {
            label: "TAILWIND",
            badge: "v4",
            img: "https://images.pexels.com/photos/5882678/pexels-photo-5882678.jpeg?auto=compress&cs=tinysrgb&w=300",
          },
          {
            label: "VITE",
            badge: "v6",
            img: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300",
          },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            animate={isHovered ? { scale: [1, 1.02, 1] } : { scale: 1 }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.15 }}
            className="group/thumb relative h-[106px] w-[calc(50%-5px)] overflow-hidden rounded-xl border border-zinc-200/80 bg-white shadow-2xs dark:border-white/10 dark:bg-zinc-900"
          >
            <img
              src={item.img}
              alt={item.label}
              className="h-full w-full object-cover contrast-125 grayscale"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute top-2 left-2 rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-bold text-white backdrop-blur-xs">
              {item.label}
            </div>
            <div className="absolute right-2 bottom-2 rounded bg-white/20 px-1 py-0.5 text-[8px] font-medium text-white backdrop-blur-xs">
              {item.badge}
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (cardIndex === 3) {
    // 4. Precision Tokens & Filters: Filter list matching Image 1
    return (
      <div
        className="relative flex h-[250px] w-full flex-col justify-center space-y-2 rounded-2xl border border-zinc-200/70 bg-zinc-50/70 p-3 sm:h-[270px] dark:border-white/10 dark:bg-white/[0.03]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {[
          { icon: SlidersHorizontal, label: "Design Tokens", val: "OKLCH" },
          { icon: Calendar, label: "Synchronized", val: "Instant" },
          { icon: Sparkles, label: "Motion Physics", val: "Spring 300" },
          { icon: CheckCircle2, label: "Accessibility", val: "WCAG AAA" },
          { icon: Layers, label: "Bundle Size", val: "0 KB Overhead" },
        ].map((row, i) => {
          const Icon = row.icon;
          return (
            <motion.div
              key={row.label}
              animate={isHovered ? { x: [0, 2, 0] } : { x: 0 }}
              transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.1 }}
              className="flex items-center justify-between rounded-lg border border-zinc-200/70 bg-white/80 px-2.5 py-1.5 text-xs shadow-2xs dark:border-white/[0.08] dark:bg-zinc-900/80"
            >
              <div className="flex items-center gap-2">
                <Icon className="h-3 w-3 text-zinc-500" />
                <span className="text-[11px] font-medium text-zinc-800 dark:text-zinc-200">
                  {row.label}
                </span>
              </div>
              <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-[9px] font-semibold text-zinc-600 dark:bg-white/10 dark:text-zinc-300">
                {row.val}
              </span>
            </motion.div>
          );
        })}
      </div>
    );
  }

  if (cardIndex === 4) {
    // 5. Mobile Orchestration: Smartphone frame with floating location & calendar card
    return (
      <div
        className="relative flex h-[250px] w-full items-end justify-center overflow-hidden rounded-2xl border border-zinc-200/70 bg-zinc-50/70 pt-3 sm:h-[270px] dark:border-white/10 dark:bg-white/[0.03]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-[180px] rounded-t-2xl border-2 border-b-0 border-zinc-900 bg-white p-2 pb-6 shadow-xl dark:border-zinc-700 dark:bg-zinc-900">
          <div className="flex items-center justify-between pb-1 text-[8px] font-semibold text-zinc-900 dark:text-white">
            <span>9:41</span>
            <div className="h-2 w-10 rounded-full bg-zinc-900 dark:bg-white/20" />
            <span>5G</span>
          </div>
          <div className="mt-1 overflow-hidden rounded-lg">
            <img
              src="https://images.pexels.com/photos/5882678/pexels-photo-5882678.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Mobile layout"
              className="h-16 w-full object-cover contrast-125 grayscale"
            />
          </div>
        </div>

        {/* Floating Metadata Pill */}
        <motion.div
          animate={isHovered ? { y: [-2, 2, -2] } : { y: 0 }}
          transition={{ duration: 2.8, repeat: Infinity }}
          className="absolute bottom-3 left-4 z-10 w-[170px] rounded-xl border border-zinc-200/90 bg-white/95 p-2 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/95"
        >
          <div className="text-[10px] font-semibold text-zinc-900 dark:text-white">Austin, TX</div>
          <div className="mt-0.5 text-[9px] text-zinc-500">Expires in 3 days</div>
        </motion.div>
      </div>
    );
  }

  // 6. Production Verified: Photographer / talent card with verified badge & offer
  return (
    <div
      className="relative flex h-[250px] w-full items-center justify-center rounded-2xl border border-zinc-200/70 bg-zinc-50/70 p-3 sm:h-[270px] dark:border-white/10 dark:bg-white/[0.03]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={isHovered ? { scale: [1, 1.015, 1] } : { scale: 1 }}
        transition={{ duration: 2.6, repeat: Infinity }}
        className="w-full max-w-[260px] rounded-xl border border-zinc-200/90 bg-white/95 p-3 shadow-md backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/95"
      >
        <div className="flex items-center gap-2">
          <img
            src="https://images.pexels.com/photos/7582781/pexels-photo-7582781.jpeg?auto=compress&cs=tinysrgb&w=200"
            alt="Reviewer"
            className="h-7 w-7 rounded-full object-cover grayscale"
          />
          <div>
            <div className="text-[11px] font-semibold text-zinc-900 dark:text-white">
              James Smith
            </div>
            <div className="flex items-center gap-0.5 text-[9px] text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-2 w-2 fill-current" />
              ))}
              <span className="ml-0.5 text-zinc-500">5.0</span>
            </div>
          </div>
        </div>

        <div className="mt-2.5 flex gap-1.5 overflow-hidden rounded-lg">
          <img
            src="https://images.pexels.com/photos/5951735/pexels-photo-5951735.jpeg?auto=compress&cs=tinysrgb&w=200"
            alt="Thumb 1"
            className="h-12 w-1/3 rounded object-cover grayscale"
          />
          <img
            src="https://images.pexels.com/photos/7582781/pexels-photo-7582781.jpeg?auto=compress&cs=tinysrgb&w=200"
            alt="Thumb 2"
            className="h-12 w-1/3 rounded object-cover grayscale"
          />
          <img
            src="https://images.pexels.com/photos/5882678/pexels-photo-5882678.jpeg?auto=compress&cs=tinysrgb&w=200"
            alt="Thumb 3"
            className="h-12 w-1/3 rounded object-cover grayscale"
          />
        </div>

        <div className="mt-2 flex items-center justify-between rounded bg-zinc-100/90 px-2 py-1 text-[10px] dark:bg-white/10">
          <span className="text-zinc-600 dark:text-zinc-300">15 verified tests</span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400">100% Passed</span>
        </div>
      </motion.div>
    </div>
  );
}

const splitPhaseLabels = ["SPECIFICATION", "TALENT & CURATION", "EXECUTION & ESCROW"];

function EditorialFoldVisual({ index, item }: { index: number; item: LandingFeature }) {
  if (index === 0) {
    // 1. Specification & Project Architecture (Phone Mockup + Austin Floating Card from user Image 6)
    return (
      <div className="relative mx-auto max-w-[340px] overflow-hidden rounded-[32px] border-[5px] border-zinc-800/80 bg-zinc-950 p-3 text-white shadow-2xl transition-transform duration-300 group-hover/card:scale-[1.01] sm:max-w-[380px]">
        {/* Dynamic Island / Notch */}
        <div className="mx-auto mb-3 flex h-4 w-28 items-center justify-between rounded-full bg-zinc-900 px-2.5 text-[9px] text-zinc-400">
          <span>9:41</span>
          <span className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
          <span>5G</span>
        </div>

        {/* Screen Header */}
        <div className="mb-2 flex items-center justify-between px-2 text-xs">
          <span className="font-semibold text-zinc-200">Create Project</span>
          <span className="text-zinc-500">✕</span>
        </div>

        {/* Photo Gallery preview */}
        <div className="relative h-44 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900">
          <img
            src="https://images.pexels.com/photos/5951735/pexels-photo-5951735.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Project reference photography"
            className="h-full w-full object-cover contrast-125 grayscale transition-transform duration-500 group-hover/card:scale-105"
          />
          <div className="absolute top-2.5 left-2.5 rounded-full bg-black/60 px-2.5 py-0.5 text-[10px] font-medium backdrop-blur-md">
            References (4)
          </div>
          <div className="sr-only">
            <HeroImageView image={item.image} priority={false} />
          </div>
        </div>

        {/* Floating Austin Requirement Card (from user Image 6) */}
        <div className="mt-3 rounded-2xl border border-white/10 bg-zinc-900/90 p-3.5 backdrop-blur-xl transition-transform duration-300 group-hover/card:-translate-y-1">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 text-[11px]">
            <div className="flex items-center gap-2 text-zinc-300">
              <MapPin className="h-3.5 w-3.5 text-zinc-400" />
              <span>Austin, TX, USA</span>
            </div>
            <ChevronRight className="h-3 w-3 text-zinc-500" />
          </div>
          <div className="flex items-center justify-between border-b border-white/[0.06] py-2 text-[11px]">
            <div className="flex items-center gap-2 text-zinc-300">
              <Calendar className="h-3.5 w-3.5 text-zinc-400" />
              <span>Sunday, 28 Mar</span>
            </div>
            <ChevronRight className="h-3 w-3 text-zinc-500" />
          </div>
          <div className="pt-2 text-[11px]">
            <div className="flex items-center gap-2 font-medium text-amber-400">
              <Clock className="h-3.5 w-3.5" />
              <span>Expires in 3 days</span>
            </div>
            <p className="mt-0.5 pl-5.5 text-[10px] text-zinc-400">
              Close applications 3 days before start
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (index === 1) {
    // 2. Talent Curation & Sophia Chen 5.0 Review (from user Image 6 & Image 1)
    return (
      <div className="relative mx-auto max-w-[360px] space-y-3.5 sm:max-w-[400px]">
        {/* James Smith Talent Card (from user Image 6) */}
        <div className="rounded-2xl border border-zinc-200/90 bg-white/90 p-4 shadow-lg backdrop-blur-xl transition-all duration-300 group-hover/card:scale-[1.01] dark:border-white/10 dark:bg-zinc-900/90">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="https://images.pexels.com/photos/5882678/pexels-photo-5882678.jpeg?auto=compress&cs=tinysrgb&w=150"
                alt="James Smith"
                className="h-10 w-10 rounded-full object-cover contrast-125 grayscale"
              />
              <div>
                <h4 className="text-xs font-semibold text-zinc-900 dark:text-white">James Smith</h4>
                <div className="flex items-center gap-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                  <span className="font-semibold text-amber-500">5.0★</span>
                  <span>•</span>
                  <span>Photographer</span>
                </div>
              </div>
            </div>
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
              ● Verified
            </span>
          </div>

          {/* 3-thumbnail portfolio row */}
          <div className="mt-3 flex gap-2">
            {[
              "https://images.pexels.com/photos/7582781/pexels-photo-7582781.jpeg?auto=compress&cs=tinysrgb&w=300",
              "https://images.pexels.com/photos/5951735/pexels-photo-5951735.jpeg?auto=compress&cs=tinysrgb&w=300",
              "https://images.pexels.com/photos/5882678/pexels-photo-5882678.jpeg?auto=compress&cs=tinysrgb&w=300",
            ].map((imgUrl, i) => (
              <div
                key={i}
                className="h-16 w-1/3 overflow-hidden rounded-xl border border-zinc-200/70 dark:border-white/10"
              >
                <img
                  src={imgUrl}
                  alt={`Portfolio shot ${i + 1}`}
                  className="h-full w-full object-cover contrast-125 grayscale transition-transform duration-300 hover:scale-110"
                />
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between rounded-xl bg-zinc-50 px-3 py-2 text-[11px] text-zinc-700 dark:bg-white/[0.05] dark:text-zinc-300">
            <span>Hi, I can give you 15 edited images</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">$220</span>
          </div>
        </div>

        {/* Sophia Chen Verified Review Card (exact copy from user Image 1!) */}
        <div className="rounded-2xl border border-zinc-200/90 bg-white/95 p-4 shadow-xl backdrop-blur-xl transition-all duration-300 group-hover/card:-translate-y-1 dark:border-white/10 dark:bg-zinc-950/95">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="h-3.5 w-3.5 fill-amber-400" />
              <Star className="h-3.5 w-3.5 fill-amber-400" />
              <Star className="h-3.5 w-3.5 fill-amber-400" />
              <Star className="h-3.5 w-3.5 fill-amber-400" />
              <Star className="h-3.5 w-3.5 fill-amber-400" />
              <span className="ml-1 text-xs font-bold text-zinc-900 dark:text-white">5.0</span>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Verified
            </span>
          </div>
          <p className="mt-2.5 text-xs leading-relaxed text-zinc-700 italic dark:text-zinc-200">
            &ldquo;The smoothest hiring experience we&apos;ve ever had. Verified talents with
            impeccable taste.&rdquo;
          </p>
          <div className="mt-3 flex items-center gap-2.5">
            <img
              src="https://images.pexels.com/photos/5951735/pexels-photo-5951735.jpeg?auto=compress&cs=tinysrgb&w=150"
              alt="Sophia Chen"
              className="h-7 w-7 rounded-full object-cover contrast-125 grayscale"
            />
            <div>
              <div className="flex items-center gap-1 text-xs font-semibold text-zinc-900 dark:text-white">
                <span>Sophia Chen</span>
                <CheckCircle2 className="h-3 w-3 text-blue-500" />
              </div>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                Creative Director @ Forma
              </p>
            </div>
          </div>
        </div>

        <div className="sr-only">
          <HeroImageView image={item.image} priority={false} />
        </div>
      </div>
    );
  }

  // 3. Account Balance ($100.60) & Communication Inbox (from user Image 5 & Image 7)
  return (
    <div className="relative mx-auto max-w-[360px] space-y-3.5 sm:max-w-[400px]">
      {/* Account Balance Card (from user Image 5!) */}
      <div className="rounded-2xl border border-zinc-200/90 bg-white/95 p-5 shadow-lg backdrop-blur-xl transition-all duration-300 group-hover/card:scale-[1.01] dark:border-white/10 dark:bg-zinc-900/95">
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          Account Balance
        </span>
        <div className="mt-1 font-serif text-3xl tracking-tight text-zinc-950 italic sm:text-4xl dark:text-white">
          $100.60
        </div>
        <div className="mt-4 flex items-center justify-between rounded-xl bg-zinc-100/80 px-3.5 py-2.5 text-xs font-medium text-zinc-800 transition-colors hover:bg-zinc-200/80 dark:bg-white/[0.06] dark:text-zinc-200 dark:hover:bg-white/[0.1]">
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-zinc-500" />
            <span>Withdraw Funds</span>
          </div>
          <ArrowRight className="h-3.5 w-3.5 text-zinc-400" />
        </div>
      </div>

      {/* Communication DM Card (from user Image 7!) */}
      <div className="rounded-2xl border border-zinc-200/90 bg-white/95 p-4 shadow-xl backdrop-blur-xl transition-all duration-300 group-hover/card:-translate-y-1 dark:border-white/10 dark:bg-zinc-950/95">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src="https://images.pexels.com/photos/5882678/pexels-photo-5882678.jpeg?auto=compress&cs=tinysrgb&w=150"
              alt="James Smith"
              className="h-8 w-8 rounded-full object-cover contrast-125 grayscale"
            />
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-900 dark:text-white">
                <span>James Smith</span>
                <span className="text-[10px] font-normal text-zinc-400">09:00 AM</span>
              </div>
              <p className="max-w-[170px] truncate text-[10px] text-zinc-500 dark:text-zinc-400">
                I can arrive at 8 am with the gear
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-[10px] font-bold text-white">
              1
            </span>
            <div className="flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-semibold text-rose-600 dark:bg-rose-950/30 dark:text-rose-300">
              <Heart className="h-3 w-3 fill-rose-500 text-rose-500" />
              <span>123</span>
            </div>
          </div>
        </div>
      </div>

      <div className="sr-only">
        <HeroImageView image={item.image} priority={false} />
      </div>
    </div>
  );
}

export function LandingFeatureShowcase({ variant, content }: LandingSectionProps<"features">) {
  const [selected, setSelected] = React.useState(content.items[0]?.id ?? "");
  const active = content.items.find((item) => item.id === selected) ?? content.items[0];

  // Prepare cards array: map content items into the 6 cards with fallback data
  const cards = defaultFeatureCards.map((def, idx) => {
    const item = content?.items?.[idx];
    return {
      id: item?.id || def.id,
      icon: def.icon,
      title: item?.title || def.title,
      description: item?.description || def.description,
      tint: def.tint,
    };
  });

  // Duplicate cards for seamless infinite rightward gliding
  const tickerCards = [...cards, ...cards];

  const trackRef = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(-1800);
  const [halfWidth, setHalfWidth] = React.useState(1800);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);

  React.useEffect(() => {
    if (trackRef.current) {
      const half = trackRef.current.scrollWidth / 2;
      if (half > 0) {
        setHalfWidth(half);
        x.set(-half);
      }
    }
  }, []);

  useAnimationFrame((_, delta) => {
    if (isHovered || isDragging) return;
    const current = x.get();
    const next = current + delta * 0.038;
    if (next >= 0) {
      x.set(-halfWidth);
    } else {
      x.set(next);
    }
  });

  if (!active) return null;

  return (
    <LandingFrame id="features">
      {/* 1. Eyebrow badge + Compact Title with monochrome icon on left (no description) */}
      <div className="mb-10 sm:mb-14">
        {/* Eyebrow badge matching Image 1: YEAH... WE DIDN'T STOP THERE... */}
        <div className="mb-4 inline-flex items-center gap-2 font-mono text-xs tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
          <Sparkles className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500" />
          <span>YEAH... WE DIDN&apos;T STOP THERE...</span>
        </div>

        {/* Small punchy Title with monochrome icon on the left */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-zinc-200/90 bg-zinc-100/80 text-zinc-900 shadow-2xs dark:border-white/10 dark:bg-white/[0.06] dark:text-white">
            <Layers className="h-4 w-4" />
          </div>
          <Heading
            as="h2"
            className="text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl lg:text-[2.25rem] lg:leading-[1.15] dark:text-white"
          >
            {content.title || "Features that make your workflow sing."}
          </Heading>
        </div>
      </div>

      {/* 2. Main variant presentation */}
      {variant === "tabs" ? (
        /* Features Horizontal Cards Carousel (Shopify rightward slide + draggable + interactive tabs) */
        <div className="relative">
          {/* Accessible Tabs Panel for Screen Readers & Tests */}
          <div role="tablist" aria-label="Product features" className="sr-only">
            {content.items.map((item) => (
              <Button
                key={item.id}
                role="tab"
                aria-selected={active.id === item.id}
                onClick={() => setSelected(item.id)}
              >
                {item.title}
              </Button>
            ))}
          </div>

          <div role="tabpanel" aria-labelledby={active.id} className="sr-only">
            <img src={active.image?.src} alt={active.image?.alt || active.title} />
          </div>

          {/* Fade Masks at edges for luxury look */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 bg-gradient-to-r from-[var(--hb-bg,#ffffff)] to-transparent sm:w-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-12 bg-gradient-to-l from-[var(--hb-bg,#ffffff)] to-transparent sm:w-20" />

          {/* Draggable & Shopify Ticker Container */}
          <div
            className="group/features no-scrollbar cursor-grab overflow-hidden py-4 select-none active:cursor-grabbing"
            aria-label="Features horizontal card carousel"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div
              ref={trackRef}
              style={{ x }}
              drag="x"
              dragConstraints={{ left: -halfWidth * 1.5, right: 100 }}
              dragElastic={0.08}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={() => setIsDragging(false)}
              className="flex w-max gap-5 will-change-transform sm:gap-6"
            >
              {tickerCards.map((card, idx) => {
                const Icon = card.icon;
                const originalIndex = idx % 6;
                return (
                  <div
                    key={`${card.id}-${idx}`}
                    className={cn(
                      "group/card relative flex h-[430px] w-[310px] shrink-0 flex-col justify-between overflow-hidden rounded-[24px] border p-5 shadow-sm transition-all duration-300 hover:shadow-xl sm:h-[450px] sm:w-[340px] sm:p-6",
                      card.tint.bgLight,
                      card.tint.borderLight,
                      card.tint.bgDark,
                      card.tint.borderDark
                    )}
                  >
                    {/* Card Top: Icon + Title + Description */}
                    <div>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
                        <Heading
                          as="h3"
                          className="text-sm font-semibold tracking-tight text-zinc-950 sm:text-base dark:text-white"
                        >
                          {card.title}
                        </Heading>
                      </div>
                      <Text className="mt-2 line-clamp-2 text-xs leading-relaxed font-normal text-zinc-500 dark:text-zinc-400">
                        {card.description}
                      </Text>
                    </div>

                    {/* Card Visual / Illustration with smooth hover looping */}
                    <div className="mt-4">
                      <FeatureCardVisual cardIndex={originalIndex} />
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          <div className="mt-6 flex justify-center">
            <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500">
              Drag horizontally or hover to inspect features
            </span>
          </div>
        </div>
      ) : variant === "accordion" ? (
        /* Expandable Preview Variant - Sticky Scrollytelling Stage with Live Interactive Progress */
        <div>
          <Grid cols={2} gap="xl" align="start">
            {/* Left: Scrollytelling Accordion List */}
            <div className="rounded-[28px] border border-zinc-200/80 bg-zinc-50/60 p-4 sm:p-6 dark:border-white/10 dark:bg-white/[0.02]">
              <div className="mb-4 flex items-center justify-between border-b border-zinc-200/60 pb-3 text-xs text-zinc-500 dark:border-white/10 dark:text-zinc-400">
                <span className="font-semibold tracking-wider uppercase">
                  Features Scrollytelling
                </span>
                <span className="font-mono text-[11px]">{content.items.length} Modules</span>
              </div>
              <Accordion
                selectedKeys={[active.id]}
                onSelectionChange={(keys) => {
                  if (keys[0]) setSelected(keys[0]);
                }}
                variant="splitted"
                className="space-y-3"
              >
                {content.items.map((item, index) => {
                  const isItemActive = item.id === active.id;
                  const bullets = featureBullets[index % 3] ?? featureBullets[0];
                  return (
                    <AccordionItem
                      key={item.id}
                      itemKey={item.id}
                      title={item.title}
                      classNames={{
                        base: cn(
                          "rounded-2xl border transition-all duration-300",
                          isItemActive
                            ? "border-zinc-300 bg-white/95 shadow-md dark:border-white/20 dark:bg-zinc-900/95"
                            : "border-zinc-200/60 bg-white/40 dark:border-white/5 dark:bg-white/[0.02]"
                        ),
                        title: "text-sm sm:text-base font-semibold",
                        trigger: "py-3.5 px-4 sm:px-5",
                        content: "px-4 sm:px-5 pb-5 pt-1",
                      }}
                    >
                      <div className="space-y-3.5">
                        <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
                          <span className="rounded bg-zinc-100 px-1.5 py-0.5 font-bold text-zinc-700 dark:bg-white/10 dark:text-zinc-300">
                            MODULE 0{index + 1}
                          </span>
                          <span>•</span>
                          <span className="font-medium text-emerald-600 dark:text-emerald-400">
                            Synced View
                          </span>
                        </div>

                        <Text className="text-xs leading-relaxed text-zinc-600 sm:text-sm dark:text-zinc-300">
                          {item.description}
                        </Text>

                        {/* Scrolly progress track indicator */}
                        <div className="overflow-hidden rounded-full bg-zinc-100 dark:bg-white/10">
                          <div className="h-1 w-full animate-pulse bg-gradient-to-r from-blue-500 to-indigo-500" />
                        </div>

                        <ul className="hb-landing-list space-y-2 pt-1">
                          {bullets.map((bullet) => (
                            <LandingCheckItem key={bullet}>{bullet}</LandingCheckItem>
                          ))}
                        </ul>
                      </div>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>

            {/* Right: Sticky 3D Interactive Stage */}
            <div className="sticky top-28 self-start">
              <div className="overflow-hidden rounded-[28px] border border-zinc-200/90 bg-zinc-50/90 p-4 shadow-xl backdrop-blur-xl transition-transform duration-500 hover:scale-[1.01] sm:p-6 dark:border-white/10 dark:bg-zinc-950/90">
                {/* macOS Window Title Bar */}
                <div className="mb-4 flex items-center justify-between border-b border-zinc-200/80 pb-3 dark:border-white/10">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                    <span className="ml-2 font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
                      hudbird://preview/{active.id}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                    Synced View
                  </div>
                </div>

                {/* Hero image view (strictly accessible role="img" with alt={active.image?.alt ?? active.title}) */}
                <div
                  aria-live="polite"
                  className="relative overflow-hidden rounded-2xl border border-zinc-200/80 shadow-sm dark:border-white/10"
                >
                  <HeroImageView image={active.image} priority={false} />

                  {/* Dynamic Glass HUD Overlay */}
                  <div className="absolute top-3 right-3 flex items-center gap-2 rounded-xl border border-white/20 bg-black/60 px-3 py-1.5 text-white shadow-lg backdrop-blur-md">
                    <span className="text-xs font-semibold">{active.title}</span>
                    <span className="rounded bg-white/20 px-1.5 py-0.5 font-mono text-[9px] tracking-wider uppercase">
                      v1.5.0
                    </span>
                    <Eye className="h-3.5 w-3.5 text-zinc-300" />
                  </div>
                </div>
              </div>
            </div>
          </Grid>

          {/* Interactive Step Timeline Scrubber at Bottom */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {content.items.map((item, index) => {
              const isStepActive = item.id === active.id;
              return (
                <Button
                  key={item.id}
                  variant={isStepActive ? "solid" : "bordered"}
                  size="sm"
                  onClick={() => setSelected(item.id)}
                  className={cn(
                    "h-8 gap-2 rounded-full px-3.5 text-xs font-medium transition-all duration-200",
                    isStepActive
                      ? "shadow-sm"
                      : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  )}
                >
                  <span className="font-mono text-[10px] opacity-70">0{index + 1}</span>
                  <span>{item.title}</span>
                </Button>
              );
            })}
          </div>
        </div>
      ) : (
        /* Split Editorial Rows - Sticky 3D Paper Fold Stacking */
        <div className="relative space-y-8 pt-4 pb-16 sm:space-y-12">
          {content.items.map((item, index) => {
            const Icon = featureIcons[index % featureIcons.length];
            const bullets = featureBullets[index % 3] ?? featureBullets[0];
            return (
              <div
                key={item.id}
                className={cn(
                  "hb-paper-fold-card sticky rounded-[32px] border border-zinc-200/90 bg-white/95 p-6 backdrop-blur-2xl transition-all duration-300 sm:p-10 dark:border-white/10 dark:bg-zinc-950/95",
                  "shadow-[0_-12px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_-16px_50px_rgba(0,0,0,0.45)]",
                  "before:absolute before:inset-x-8 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-zinc-400/40 before:to-transparent dark:before:via-white/20",
                  "group/card"
                )}
                style={{
                  top: `calc(90px + ${index * 32}px)`,
                  zIndex: 10 + index,
                }}
              >
                {/* 3D Paper Fold Dossier Header */}
                <div className="mb-6 flex items-center justify-between border-b border-zinc-100 pb-4 dark:border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-zinc-900/5 px-2.5 py-1 font-mono text-[11px] font-semibold tracking-wider text-zinc-700 uppercase dark:bg-white/10 dark:text-zinc-300">
                      PHASE 0{index + 1} // {splitPhaseLabels[index] ?? "EXECUTION"}
                    </span>
                    <span className="hidden text-xs text-zinc-400 sm:inline dark:text-zinc-500">
                      •
                    </span>
                    <span className="hidden text-xs font-medium text-zinc-500 sm:inline dark:text-zinc-400">
                      Paper Fold Depth #{index + 1}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-xs text-zinc-400 dark:text-zinc-500">
                    <span>0{index + 1}</span>
                    <span>/</span>
                    <span>0{content.items.length}</span>
                  </div>
                </div>

                <Grid cols={2} gap="xl" align="center">
                  <div className={index % 2 ? "md:order-2" : undefined}>
                    <IconBox
                      size="md"
                      variant="double-ring"
                      icon={Icon}
                      showGlow={false}
                      className="mb-5"
                      aria-hidden="true"
                    />
                    <Heading
                      as="h3"
                      className="text-xl font-bold tracking-tight text-zinc-950 sm:text-2xl lg:text-3xl dark:text-white"
                    >
                      {item.title}
                    </Heading>
                    <Text className="mt-4 text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-300">
                      {item.description}
                    </Text>
                    <ul className="hb-landing-list mt-6 space-y-2.5">
                      {bullets.map((bullet) => (
                        <LandingCheckItem key={bullet}>{bullet}</LandingCheckItem>
                      ))}
                    </ul>
                    <div className="mt-7 flex items-center gap-3">
                      <Button size="sm" variant="bordered" className="gap-2 text-xs">
                        <span>Explore Phase 0{index + 1}</span>
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className={index % 2 ? "md:order-1" : undefined}>
                    <EditorialFoldVisual index={index} item={item} />
                  </div>
                </Grid>
              </div>
            );
          })}
        </div>
      )}
      <LandingDemoNote>
        Sample product views. The feature controls change local preview content.
      </LandingDemoNote>
    </LandingFrame>
  );
}
