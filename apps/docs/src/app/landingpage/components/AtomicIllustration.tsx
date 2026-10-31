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

export const AtomicIllustration = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const sequence = [2800, 2800, 2800, 3500];
    const timeout = setTimeout(() => {
      setPhase((s) => (s >= 3 ? 0 : s + 1));
    }, sequence[phase]);
    return () => clearTimeout(timeout);
  }, [phase]);

  const atomNodes = [
    { cx: "18%", cy: "22%", color: "#3b82f6", label: "Button", delay: 0 },
    { cx: "50%", cy: "14%", color: "#22d3ee", label: "Text", delay: 0.1 },
    { cx: "80%", cy: "24%", color: "#818cf8", label: "Icon", delay: 0.2 },
    { cx: "12%", cy: "54%", color: "#60a5fa", label: "Input", delay: 0.15 },
    { cx: "50%", cy: "52%", color: "#a78bfa", label: "Card", delay: 0.25 },
    { cx: "86%", cy: "52%", color: "#38bdf8", label: "Badge", delay: 0.3 },
    { cx: "28%", cy: "78%", color: "#2563eb", label: "Avatar", delay: 0.35 },
    { cx: "70%", cy: "78%", color: "#06b6d4", label: "Select", delay: 0.4 },
  ];

  const connections: [number, number][] = [
    [0, 1],
    [1, 2],
    [0, 3],
    [3, 4],
    [4, 5],
    [2, 5],
    [3, 6],
    [5, 7],
  ];

  return (
    <div className="relative flex h-[340px] w-full max-w-3xl items-center justify-center overflow-hidden rounded-[24px] border border-zinc-200/80 bg-white shadow-md backdrop-blur-sm sm:h-[380px] dark:border-white/10 dark:bg-[#0a0f1c]">
      {/* Glass radial — same as Designed for how products… */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.06),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:14px_14px] opacity-[0.04] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.06)_1px,transparent_1px)] dark:opacity-[0.06]" />

      {/* Central glow — transform + opacity only */}
      <motion.div
        className="absolute h-40 w-40 rounded-full bg-blue-500/5 blur-[60px] will-change-transform dark:bg-blue-500/8 dark:blur-[70px]"
        animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Scan line — zinc glass, transform-only */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-zinc-300/60 to-transparent will-change-transform dark:via-white/15"
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: [0, 340], opacity: [0, 0.7, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "linear", repeatDelay: 0.8 }}
      />

      {/* Corner brackets — glass zinc */}
      <div className="pointer-events-none absolute top-3 left-3 z-10 h-6 w-6 border-t border-l border-zinc-200 dark:border-white/10" />
      <div className="pointer-events-none absolute top-3 right-3 z-10 h-6 w-6 border-t border-r border-zinc-200 dark:border-white/10" />
      <div className="pointer-events-none absolute bottom-12 left-3 z-10 h-6 w-6 border-b border-l border-zinc-200 dark:border-white/10" />
      <div className="pointer-events-none absolute right-3 bottom-12 z-10 h-6 w-6 border-r border-b border-zinc-200 dark:border-white/10" />

      {/* System label — glass muted */}
      <div className="absolute top-3 left-1/2 z-10 -translate-x-1/2">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="rounded-full border border-zinc-200/60 bg-white/70 px-2 py-0.5 font-mono text-[9px] tracking-widest text-zinc-500 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-zinc-400"
        >
          SYS:RENDER // HUDBIRD.UI
        </motion.div>
      </div>

      {/* Phase Content — wait mode avoids layout overlap jank */}
      <AnimatePresence mode="wait">
        {/* Phase 0: Atoms — glowing node constellation */}
        {phase === 0 && (
          <motion.div
            key="atoms"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <svg className="absolute inset-0 h-full w-full" style={{ zIndex: 0 }}>
              {connections.map(([a, b], i) => {
                const nodeA = atomNodes[a];
                const nodeB = atomNodes[b];
                return (
                  <motion.line
                    key={i}
                    x1={nodeA.cx}
                    y1={nodeA.cy}
                    x2={nodeB.cx}
                    y2={nodeB.cy}
                    strokeWidth="1"
                    className="stroke-blue-600/20 dark:stroke-blue-400/15"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  />
                );
              })}
            </svg>
            {atomNodes.map((node, i) => (
              <motion.div
                key={i}
                className="absolute flex flex-col items-center gap-1"
                style={{
                  left: node.cx,
                  top: node.cy,
                  transform: "translate(-50%,-50%)",
                  zIndex: 10,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: node.delay, type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Outer pulse ring */}
                <motion.div
                  className="absolute rounded-full"
                  style={{ background: node.color, opacity: 0.15 }}
                  animate={{ width: [20, 36, 20], height: [20, 36, 20], opacity: [0.2, 0, 0.2] }}
                  transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: "easeOut" }}
                />
                {/* Core dot */}
                <motion.div
                  className="relative z-10 h-3 w-3 rounded-full"
                  style={{
                    background: node.color,
                    boxShadow: `0 0 10px ${node.color}, 0 0 22px ${node.color}55`,
                  }}
                  animate={{
                    scale: [1, 1.25, 1],
                    boxShadow: [
                      `0 0 8px ${node.color}`,
                      `0 0 20px ${node.color}, 0 0 40px ${node.color}44`,
                      `0 0 8px ${node.color}`,
                    ],
                  }}
                  transition={{ duration: 1.8 + i * 0.25, repeat: Infinity, ease: "easeInOut" }}
                />
                <span className="relative z-10 mt-1 font-mono text-[8px] tracking-wider text-blue-700/60 dark:text-blue-400/50">
                  {node.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Phase 1: Molecules — live connection lines with data packets */}
        {phase === 1 && (
          <motion.div
            key="molecules"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <svg className="absolute inset-0 h-full w-full">
              <defs>
                <filter id="glow-line">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {connections.map(([a, b], i) => {
                const nodeA = atomNodes[a];
                const nodeB = atomNodes[b];
                return (
                  <motion.line
                    key={i}
                    x1={nodeA.cx}
                    y1={nodeA.cy}
                    x2={nodeB.cx}
                    y2={nodeB.cy}
                    stroke={`rgba(59,130,246,${0.6 - i * 0.04})`}
                    strokeWidth="1.5"
                    filter="url(#glow-line)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.12 }}
                  />
                );
              })}
              {/* Animated data packet dots */}
              {(connections.slice(0, 4) as [number, number][]).map(([a, b], i) => {
                const nodeA = atomNodes[a];
                const nodeB = atomNodes[b];
                return (
                  <motion.circle
                    key={`pkt-${i}`}
                    r="3"
                    fill="#60a5fa"
                    filter="url(#glow-line)"
                    animate={{
                      cx: [nodeA.cx, nodeB.cx],
                      cy: [nodeA.cy, nodeB.cy],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      delay: 0.8 + i * 0.4,
                      duration: 1.2,
                      repeat: Infinity,
                      repeatDelay: 2 + i * 0.5,
                      ease: "easeInOut",
                    }}
                  />
                );
              })}
            </svg>
            {atomNodes.map((node, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: node.cx,
                  top: node.cy,
                  transform: "translate(-50%,-50%)",
                  zIndex: 10,
                }}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.06, type: "spring" }}
              >
                <motion.div
                  className="h-3.5 w-3.5 rounded-full"
                  style={{
                    background: node.color,
                    boxShadow: `0 0 12px ${node.color}, 0 0 28px ${node.color}66`,
                  }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Phase 2: Sections — light card / dark glassmorphic UI card */}
        {phase === 2 && (
          <motion.div
            key="sections"
            initial={{ opacity: 0, scale: 0.88, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
            className="relative z-10 w-[260px] overflow-hidden rounded-xl border border-zinc-200/80 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.06),0_8px_24px_-12px_rgba(16,24,40,0.12)] sm:w-[300px] dark:border-blue-500/25 dark:bg-[#0d0d1f] dark:shadow-[0_0_50px_rgba(59,130,246,0.2)]"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent dark:via-blue-400/60" />
            {/* Navbar */}
            <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-50 px-4 py-2.5 dark:border-blue-500/10 dark:bg-[#080815]">
              <div className="flex items-center gap-2">
                <motion.div
                  className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-500"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ boxShadow: "0 0 8px rgba(59,130,246,0.8)" }}
                />
                <div className="h-1.5 w-16 rounded-full bg-blue-600/30 dark:bg-blue-400/30" />
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-8 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                <div className="h-1.5 w-8 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                <motion.div
                  className="h-5 w-14 rounded-md bg-blue-600 dark:bg-blue-500"
                  animate={{
                    boxShadow: [
                      "0 0 8px rgba(59,130,246,0.4)",
                      "0 0 18px rgba(59,130,246,0.8)",
                      "0 0 8px rgba(59,130,246,0.4)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </div>
            {/* Hero */}
            <div className="flex flex-col items-center gap-3 px-4 py-7">
              <motion.div
                className="rounded-full border border-blue-600/20 bg-blue-600/5 px-3 py-0.5 dark:border-blue-500/30 dark:bg-blue-500/10"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="h-1.5 w-20 rounded-full bg-blue-600/50 dark:bg-blue-400/50" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="space-y-1.5 text-center"
              >
                <div className="mx-auto h-3 w-44 rounded bg-zinc-900/10 dark:bg-zinc-200/15" />
                <div className="mx-auto h-3 w-36 rounded bg-zinc-900/[0.07] dark:bg-zinc-200/10" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-1"
              >
                <div className="mx-auto h-1.5 w-48 rounded-full bg-zinc-400/60 dark:bg-zinc-600/40" />
                <div className="mx-auto h-1.5 w-40 rounded-full bg-zinc-400/50 dark:bg-zinc-600/30" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                className="mt-1 flex gap-3"
              >
                <motion.div
                  className="h-7 w-24 rounded-lg bg-blue-600 dark:bg-blue-500"
                  animate={{
                    boxShadow: [
                      "0 0 12px rgba(59,130,246,0.4)",
                      "0 0 24px rgba(59,130,246,0.8)",
                      "0 0 12px rgba(59,130,246,0.4)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                />
                <div className="h-7 w-20 rounded-lg border border-blue-600/25 bg-white dark:border-blue-500/20 dark:bg-transparent" />
              </motion.div>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/25 to-transparent dark:via-blue-400/30" />
          </motion.div>
        )}

        {/* Phase 3: Templates — light dashboard / dark dashboard layout */}
        {phase === 3 && (
          <motion.div
            key="template"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.15 }}
            className="relative z-10 flex h-[220px] w-[260px] overflow-hidden rounded-xl border border-zinc-200/80 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.06),0_8px_24px_-12px_rgba(16,24,40,0.12)] sm:h-[240px] sm:w-[310px] dark:border-blue-500/20 dark:bg-[#0a0a18] dark:shadow-[0_0_60px_rgba(59,130,246,0.25)]"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent dark:via-blue-400/50" />
            {/* Sidebar */}
            <div className="w-14 shrink-0 border-r border-zinc-100 bg-zinc-50 p-2 sm:w-16 dark:border-blue-500/10 dark:bg-[#07070f]">
              <div className="mb-3 flex items-center gap-1">
                <motion.div
                  className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-500"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ boxShadow: "0 0 6px rgba(59,130,246,0.8)" }}
                />
              </div>
              {[65, 45, 58, 38, 52, 42].map((w, i) => (
                <motion.div
                  key={i}
                  className="mb-1.5 rounded-full bg-zinc-300/70 dark:bg-zinc-700/60"
                  style={{ height: 4, width: `${w}%` }}
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.18 }}
                />
              ))}
            </div>
            {/* Main */}
            <div className="flex flex-1 flex-col gap-2 bg-white p-2 dark:bg-transparent">
              <motion.div
                className="h-7 w-full rounded-lg border border-zinc-200 bg-blue-50/60 dark:border-blue-500/10 dark:bg-blue-500/5"
                animate={{
                  borderColor: [
                    "rgba(59,130,246,0.15)",
                    "rgba(59,130,246,0.35)",
                    "rgba(59,130,246,0.15)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div className="flex flex-1 gap-2">
                <div className="flex-1 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 p-2 dark:border-blue-500/10 dark:bg-blue-500/5">
                  <motion.div
                    className="h-1.5 rounded-full bg-blue-600/25 dark:bg-blue-400/20"
                    animate={{ width: ["40%", "70%", "40%"] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <div className="mt-1.5 h-1 w-1/2 rounded-full bg-zinc-300/80 dark:bg-zinc-600/30" />
                  <div className="mt-1 h-1 w-2/3 rounded-full bg-zinc-300/60 dark:bg-zinc-600/20" />
                </div>
                <div className="flex w-1/3 flex-col gap-2">
                  {[0, 1].map((i) => (
                    <motion.div
                      key={i}
                      className="flex-1 rounded-lg border border-zinc-200 bg-blue-50/50 dark:border-blue-500/10 dark:bg-blue-500/5"
                      animate={{
                        borderColor: [
                          "rgba(59,130,246,0.12)",
                          "rgba(59,130,246,0.3)",
                          "rgba(59,130,246,0.12)",
                        ],
                      }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 1 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom hairline divider — matches reference, sits above tabs */}
      <div className="pointer-events-none absolute inset-x-8 bottom-11 z-10 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent dark:via-blue-400/40" />

      {/* Phase Indicator — HUD terminal tabs */}
      <div className="absolute right-0 bottom-3 left-0 z-20 flex justify-center gap-1 px-2 sm:gap-1.5">
        {["Atoms", "Molecules", "Sections", "Templates"].map((label, i) => (
          <motion.div
            key={label}
            animate={
              phase === i
                ? {
                    boxShadow: [
                      "0 0 0px rgba(59,130,246,0)",
                      "0 0 14px rgba(59,130,246,0.55)",
                      "0 0 0px rgba(59,130,246,0)",
                    ],
                  }
                : {}
            }
            transition={{ duration: 1.8, repeat: Infinity }}
            className={`rounded px-1.5 py-1 font-mono text-[8px] font-bold tracking-wider uppercase transition-all duration-500 sm:px-2.5 sm:text-[9px] ${
              phase === i
                ? "border border-blue-600/40 bg-blue-600/10 text-blue-700 dark:border-blue-500/50 dark:bg-blue-500/15 dark:text-blue-300"
                : "border border-zinc-300/80 bg-white/70 text-zinc-500 dark:border-white/10 dark:bg-black/40 dark:text-zinc-500"
            }`}
          >
            {label}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
