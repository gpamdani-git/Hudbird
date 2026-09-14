import {
  ParticleOrb,
  TypewriterText,
  IdeCaret,
  FolderIcon,
  MockToggle,
  logos,
  MEGA_LINK_GROUPS,
  SOCIALS,
  useHtmlTheme,
  TerminalTyping,
  IdeSuggestPopup,
} from "./shared";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Text, Badge, Input, Textarea } from "@hudbird/ui";
import {
  Hero,
  HeroHeader,
  HeroBody,
  HeroBadge,
  HeroTitle,
  HeroDescription,
  HeroActions,
  HeroBackground,
  LogoCloud,
  LogoCloudTitle,
  LogoCloudTicker,
  LogoCloudItem,
  FeatureSection,
  FeatureHeader,
  FeatureBadge,
  FeatureTitle,
  FeatureDescription,
  FeatureAlternating,
  FeatureRow,
  FeatureRowContent,
  FeatureRowMedia,
  BentoGrid,
  BentoCard,
  BentoCardContent,
  PricingSection,
  PricingHeader,
  PricingBadge,
  PricingTitle,
  PricingDescription,
  PricingGrid,
  PricingTier,
  PricingTierHeader,
  PricingTierName,
  PricingTierDescription,
  PricingTierPrice,
  PricingTierFeatures,
  PricingTierFeature,
  PricingToggle,
  CtaSplit,
  FooterMega,
  Faq,
} from "@hudbird/marketing";

import {
  Zap,
  Code2,
  Layers,
  Cpu,
  Network,
  PlayIcon,
  ArrowRight,
  ArrowUpCircle,
  CheckCircle2,
  Shield,
  Globe,
  BarChart3,
  Database,
  LayoutDashboard,
  Bot,
  Command,
  Layout,
  LineChart,
  Search,
  Plus,
  X,
  Check,
  ChevronDown,
  ChevronRight,
  FileText,
  Wallet,
  Target,
  Calendar,
  LifeBuoy,
  BookOpen,
  Mail,
  Activity,
  User,
  CreditCard,
  Bell,
  Palette,
  ArrowLeftRight,
  TrendingUp,
  Landmark,
  Clock,
  QrCode,
  RefreshCw,
  Send,
  Lock,
  TriangleAlert,
  Settings,
  Sparkles,
  BrainCircuit,
  MessageSquare,
} from "lucide-react";
import { ThemeToggleButton } from "../../../components/templates/TemplateThemeToggle";

export const AiOrbIllustration = () => {
  return (
    <div className="relative mx-auto flex h-[280px] w-full max-w-[900px] items-center justify-center sm:h-[400px] md:h-[500px]">
      {/* Background Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_70%_70%_at_center,black_40%,transparent_100%)] bg-[length:24px_24px] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_1px,transparent_1px)]" />

      {/* Central Glow */}
      <div className="absolute h-[300px] w-[300px] rounded-full bg-blue-500/20 blur-[100px] dark:bg-blue-600/30" />

      {/* Connecting SVG Lines (Hidden on small screens for simplicity) */}
      <svg
        className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
        style={{ zIndex: 0 }}
      >
        <defs>
          <linearGradient id="line-gradient-left" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="line-gradient-right" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="1" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Left lines */}
        <motion.path
          d="M 380 250 L 340 250 Q 320 250 320 230 L 320 195 Q 320 175 300 175 L 240 175"
          stroke="url(#line-gradient-left)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <motion.circle
          cx="240"
          cy="175"
          r="4"
          fill="#38bdf8"
          filter="url(#glow)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        />

        <motion.path
          d="M 380 250 L 340 250 Q 320 250 320 270 L 320 340 Q 320 360 300 360 L 240 360"
          stroke="url(#line-gradient-left)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
        />
        <motion.circle
          cx="240"
          cy="360"
          r="4"
          fill="#38bdf8"
          filter="url(#glow)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.7 }}
        />

        {/* Right lines */}
        <motion.path
          d="M 520 250 L 560 250 Q 580 250 580 230 L 580 195 Q 580 175 600 175 L 660 175"
          stroke="url(#line-gradient-right)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }}
        />
        <motion.circle
          cx="660"
          cy="175"
          r="4"
          fill="#38bdf8"
          filter="url(#glow)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.9 }}
        />

        <motion.path
          d="M 520 250 L 560 250 Q 580 250 580 270 L 580 340 Q 580 360 600 360 L 660 360"
          stroke="url(#line-gradient-right)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.6 }}
        />
        <motion.circle
          cx="660"
          cy="360"
          r="4"
          fill="#38bdf8"
          filter="url(#glow)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.1 }}
        />
      </svg>

      {/* Mobile Floating Cards — simplified 2-card layout shown on small screens */}
      <div className="absolute inset-0 flex items-center justify-between px-3 sm:px-6 md:hidden">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="w-[120px] rounded-xl border border-black/10 bg-white/80 p-3 shadow-lg shadow-black/5 backdrop-blur-md dark:border-white/10 dark:bg-[#0a0f1c]/90"
        >
          <div className="mb-2 text-[11px] font-semibold text-zinc-800 dark:text-white">
            Components
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 rounded-lg bg-blue-500/10 px-1.5 py-1 text-[10px] text-blue-700 dark:text-blue-200">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              Buttons
            </div>
            <div className="flex items-center gap-1.5 rounded-lg bg-black/5 px-1.5 py-1 text-[10px] text-zinc-500 dark:bg-white/5 dark:text-zinc-400">
              <div className="h-2 w-2 rounded-full border border-zinc-300 dark:border-zinc-600" />
              Cards
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0 }}
          className="w-[120px] rounded-xl border border-black/10 bg-white/80 p-3 shadow-lg shadow-black/5 backdrop-blur-md dark:border-white/10 dark:bg-[#0a0f1c]/90"
        >
          <div className="mb-2 text-[11px] font-semibold text-zinc-800 dark:text-white">
            Performance
          </div>
          <div className="flex items-end gap-1 pt-1">
            {[40, 60, 40, 90, 100].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: h * 0.3 }}
                transition={{ delay: 1.2 + i * 0.1 }}
                className="w-4 rounded-t-sm bg-gradient-to-t from-blue-600 to-cyan-400"
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Desktop Floating UI Cards — absolute positioned, only visible on md+ */}
      <div className="absolute inset-0 hidden h-full w-full md:block">
        {/* Top Left: Task Lists */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="absolute top-[100px] left-[20px] w-[220px] rounded-2xl border border-black/10 bg-white/70 p-4 shadow-xl shadow-black/5 backdrop-blur-md dark:border-white/10 dark:bg-[#0a0f1c]/80 dark:shadow-none"
        >
          <div className="mb-3 text-sm font-semibold text-zinc-800 dark:text-white">
            UI Components
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 rounded-lg bg-blue-500/10 px-2 py-1.5 text-xs text-blue-700 dark:text-blue-200">
              <div className="flex h-3 w-3 items-center justify-center rounded-full bg-blue-500">
                <div className="h-1.5 w-1.5 rounded-full bg-white" />
              </div>
              Beautiful buttons
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-black/5 px-2 py-1.5 text-xs text-zinc-500 dark:bg-white/5 dark:text-zinc-400">
              <div className="h-3 w-3 rounded-full border border-zinc-300 dark:border-zinc-600" />
              Interactive cards
            </div>
          </div>
        </motion.div>

        {/* Bottom Left: Workflows */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0 }}
          className="absolute bottom-[80px] left-[20px] w-[220px] rounded-2xl border border-black/10 bg-white/70 p-4 shadow-xl shadow-black/5 backdrop-blur-md dark:border-white/10 dark:bg-[#0a0f1c]/80 dark:shadow-none"
        >
          <div className="mb-3 text-sm font-semibold text-zinc-800 dark:text-white">
            Framer Motion
          </div>
          <div className="flex flex-col gap-1 text-xs text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-2 rounded-md bg-black/5 p-2 text-zinc-700 dark:bg-white/5 dark:text-zinc-300">
              <Zap size={14} className="text-yellow-500 dark:text-yellow-400" /> Fluid animations
            </div>
            <div className="mx-4 h-3 w-px bg-black/10 dark:bg-white/20" />
            <div className="flex items-center gap-2 rounded-md bg-black/5 p-2 dark:bg-white/5">
              <MessageSquare size={14} /> Spring physics
            </div>
          </div>
        </motion.div>

        {/* Top Right: Analytics */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 }}
          className="absolute top-[100px] right-[20px] w-[220px] rounded-2xl border border-black/10 bg-white/70 p-4 shadow-xl shadow-black/5 backdrop-blur-md dark:border-white/10 dark:bg-[#0a0f1c]/80 dark:shadow-none"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-zinc-800 dark:text-white">Performance</span>
            <span className="flex items-center text-[10px] text-emerald-600 dark:text-emerald-400">
              99 <span className="ml-1 text-zinc-400 dark:text-zinc-500">Lighthouse</span>
            </span>
          </div>
          <div className="flex items-end gap-1.5 pt-4">
            {[40, 20, 60, 40, 90, 100].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: h }}
                transition={{ delay: 1.5 + i * 0.1 }}
                className="w-6 rounded-t-sm bg-gradient-to-t from-blue-600 to-cyan-400"
              />
            ))}
          </div>
        </motion.div>

        {/* Bottom Right: Insights */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4 }}
          className="absolute right-[20px] bottom-[80px] w-[220px] rounded-2xl border border-black/10 bg-white/70 p-4 shadow-xl shadow-black/5 backdrop-blur-md dark:border-white/10 dark:bg-[#0a0f1c]/80 dark:shadow-none"
        >
          <div className="mb-3 text-sm font-semibold text-zinc-800 dark:text-white">
            Accessibility
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 rounded-lg bg-purple-500/10 px-2 py-1.5 text-purple-700 dark:text-purple-200">
              <Sparkles size={12} className="text-purple-500 dark:text-purple-400" /> Screen reader
              ready
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 px-2 py-1.5 text-emerald-700 dark:text-emerald-200">
              <Sparkles size={12} className="text-emerald-600 dark:text-emerald-400" /> Keyboard
              navigation
            </div>
          </div>
        </motion.div>
      </div>

      {/* Orb Core */}
      <div className="relative flex h-36 w-36 items-center justify-center sm:h-48 sm:w-48 md:h-64 md:w-64">
        {/* Particle Orb Extension */}
        <ParticleOrb />

        {/* Core Glowing Sphere */}
        <motion.div
          className="absolute inset-4 rounded-full bg-gradient-to-br from-cyan-300 via-blue-500 to-indigo-600 shadow-[0_0_80px_rgba(59,130,246,0.6)]"
          animate={{
            scale: [1, 1.02, 1],
            filter: ["hue-rotate(0deg)", "hue-rotate(15deg)", "hue-rotate(0deg)"],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Inner Highlight */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-transparent via-white/40 to-white/80 opacity-50 mix-blend-overlay" />

        {/* Orbiting Rings (Restored from V1) */}
        <motion.div
          className="absolute h-[110%] w-[110%] rounded-full border border-cyan-400/50 border-t-cyan-300 border-b-transparent shadow-[0_0_20px_rgba(34,211,238,0.4)_inset]"
          animate={{ rotateZ: 360, rotateX: 50, rotateY: 20 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        />
        <motion.div
          className="absolute h-[125%] w-[125%] rounded-full border border-blue-500/40 border-r-blue-400 border-l-transparent shadow-[0_0_15px_rgba(59,130,246,0.3)_inset]"
          animate={{ rotateZ: -360, rotateX: 30, rotateY: 60 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        />
        <motion.div
          className="absolute h-[140%] w-[140%] rounded-full border border-indigo-500/30 border-t-transparent border-b-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.2)_inset]"
          animate={{ rotateZ: 360, rotateX: 70, rotateY: 10 }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        />
      </div>
    </div>
  );
};
