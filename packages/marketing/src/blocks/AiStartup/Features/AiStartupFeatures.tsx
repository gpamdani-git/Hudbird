import React, { useState, useEffect } from "react";
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
import { Button, Text, Badge, Input, Textarea } from "@hudbird/ui";
import {
  Sparkles,
  BrainCircuit,
  MessageSquare,
  Code2,
  Layers,
  Cpu,
  Network,
  Zap,
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
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import {
  ParticleOrb,
  PlayIcon,
  AiOrbIllustration,
  TypewriterText,
  TerminalTyping,
  TerminalAnimation,
  IdeCaret,
  IdeSuggestPopup,
  VscodeAutocompleteIllustration,
  AtomicIllustration,
  FolderIcon,
  TemplateMarquee,
  CtaTerminalDemo,
  GTitle,
  GDesc,
  GLabel,
  MockCheck,
  MockToggle,
  MockBar,
  NavItem,
  ComponentShowcase,
  logos,
  MEGA_LINK_GROUPS,
  SOCIALS,
  features,
  agentCards,
} from "../components/AiStartupInternal";

import { AiStartupHero } from "../Hero/AiStartupHero";

export const AiStartupFeatures = () => (
  <>
    {/* <!-- Built for Modern Web — Feature Bento --> */}
    <section
      id="features"
      className="relative w-full overflow-hidden bg-zinc-50 px-4 py-24 sm:px-8 sm:py-32 dark:bg-[#080d1a]"
    >
      {/* Hero-matching aurora gradient */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] h-[70%] w-[50%] rounded-full bg-blue-500/10 blur-[140px] dark:bg-blue-600/12" />
        <div className="absolute -right-[10%] -bottom-[10%] h-[60%] w-[45%] rounded-full bg-blue-400/8 blur-[120px] dark:bg-blue-500/10" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <FeatureHeader>
            <FeatureBadge className="mx-auto mb-8 inline-flex w-fit rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-600 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-400">
              Hudbird UI — Atoms to Templates
            </FeatureBadge>
            <FeatureTitle className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
              Designed for how products actually ship
            </FeatureTitle>
            <FeatureDescription className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Stop rebuilding the same blocks. Start from type-safe atoms, compose conversion-ready
              marketing sections, and ship full templates with one{" "}
              <span className="font-mono text-sm font-medium text-zinc-900 dark:text-white">
                pnpm dlx hudbird-ui init
              </span>{" "}
              — Tailwind v4 and Motion included.
            </FeatureDescription>
          </FeatureHeader>
        </motion.div>

        <BentoGrid className="relative mx-auto w-full gap-4 md:auto-rows-[26rem] md:grid-cols-3 xl:grid-cols-3">
          {/* Card 1: Atomic primitives */}
          <BentoCard className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-zinc-200/80 bg-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl md:col-span-1 dark:border-white/10 dark:bg-[#0a0f1c]">
            <div className="relative flex flex-1 items-center justify-center overflow-hidden p-4 sm:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.05),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08),transparent_70%)]" />
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="relative w-full max-w-[200px] space-y-2.5 sm:max-w-[220px] sm:space-y-3"
              >
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <Button size="sm" color="dark" radius="full" className="h-7 px-3 text-xs">
                    Button
                  </Button>
                  <Button size="sm" variant="outline" radius="full" className="h-7 px-3 text-xs">
                    Outline
                  </Button>
                  <Badge size="sm" color="primary">
                    Badge
                  </Badge>
                </div>
                <Input
                  size="sm"
                  radius="full"
                  placeholder="Email address"
                  aria-label="Email"
                  className="h-8 text-xs"
                />
                <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 dark:border-white/10 dark:bg-white/5">
                  <div className="h-8 w-8 shrink-0 rounded-lg bg-white shadow-sm dark:bg-zinc-900" />
                  <div className="min-w-0 flex-1">
                    <div className="h-2 w-16 rounded-full bg-zinc-900 dark:bg-white" />
                    <div className="mt-1 h-1.5 w-24 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                  </div>
                  <Badge size="sm" variant="soft" color="success">
                    Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between rounded-full border border-zinc-200 bg-white px-3 py-1.5 dark:border-white/10 dark:bg-white/5">
                  <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-300">
                    Dark mode
                  </span>
                  <span
                    aria-hidden
                    className="flex h-5 w-9 items-center justify-end rounded-full bg-zinc-900 px-0.5 dark:bg-white"
                  >
                    <span className="h-4 w-4 rounded-full bg-white dark:bg-zinc-900" />
                  </span>
                </div>
              </motion.div>
            </div>
            <div className="relative z-10 shrink-0 px-8 pt-4 pb-8">
              <Text
                variant="strong"
                className="font-outfit text-xl font-semibold tracking-tight text-zinc-900 dark:text-white"
              >
                Atomic primitives
              </Text>
              <Text
                variant="muted"
                className="mt-1.5 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400"
              >
                Type-safe Button, Input, Card, Badge and more — Radix-based, CVA-driven, and ready
                to override with{" "}
                <span className="font-mono text-xs text-zinc-700 dark:text-zinc-300">cn()</span>.
              </Text>
            </div>
          </BentoCard>

          {/* Card 2: Workflow Automation */}
          <BentoCard className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-zinc-200/80 bg-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl md:col-span-2 dark:border-white/10 dark:bg-[#0a0f1c]">
            <div className="relative flex flex-1 items-center justify-center overflow-hidden p-3 sm:p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(59,130,246,0.05),transparent_70%)] dark:bg-[radial-gradient(circle_at_right,rgba(59,130,246,0.08),transparent_70%)]" />

              <div className="relative flex w-full max-w-[300px] items-center sm:max-w-lg">
                {/* Left Hub */}
                <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white/50 shadow-2xl backdrop-blur-md sm:h-20 sm:w-20 dark:border-white/10 dark:bg-white/5">
                  <div className="relative h-9 w-9 rounded-full bg-zinc-100 sm:h-12 sm:w-12 dark:bg-zinc-800">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                      className="absolute inset-0 rounded-full border-[5px] border-zinc-200 border-t-blue-500 border-r-blue-300 sm:border-[6px] dark:border-zinc-700 dark:border-t-blue-400 dark:border-r-blue-400/50"
                    />
                  </div>
                </div>

                {/* Connecting Lines */}
                <div className="absolute right-0 left-8 h-full sm:left-10">
                  {/* Horizontal main line */}
                  <div className="absolute top-1/2 left-0 h-[1px] w-1/4 -translate-y-1/2 bg-gradient-to-r from-transparent to-blue-500/20" />
                  {/* Top angled line */}
                  <div className="absolute top-[25%] left-1/4 h-[1px] w-[20%] origin-left rotate-[-20deg] bg-blue-500/20" />
                  {/* Middle horizontal line */}
                  <div className="absolute top-1/2 left-1/4 h-[1px] w-[30%] -translate-y-1/2 bg-blue-500/20" />
                  {/* Bottom angled line */}
                  <div className="absolute bottom-[25%] left-1/4 h-[1px] w-[20%] origin-left rotate-[20deg] bg-blue-500/20" />
                </div>

                {/* Pills — now hudbird section names */}
                <div className="absolute right-0 flex h-full flex-col justify-center gap-3 sm:gap-5">
                  <motion.div
                    animate={{ y: [-3, 3, -3] }}
                    transition={{ repeat: Infinity, duration: 4, delay: 0 }}
                    className="flex -translate-y-3 items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-3 py-1.5 pr-4 backdrop-blur-sm sm:-translate-y-4 sm:gap-3 sm:px-4 sm:py-2 sm:pr-6 dark:border-white/10 dark:bg-white/5"
                  >
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-100 sm:h-6 sm:w-6 dark:bg-white/10">
                      <Layers size={10} className="text-blue-500 sm:hidden" />
                      <Layers size={12} className="hidden text-blue-500 sm:block" />
                    </div>
                    <span className="text-[9px] font-bold tracking-widest text-zinc-600 sm:text-[10px] dark:text-zinc-300">
                      HERO SECTIONS
                    </span>
                  </motion.div>

                  <motion.div
                    animate={{ y: [-3, 3, -3] }}
                    transition={{ repeat: Infinity, duration: 4, delay: 1 }}
                    className="ml-3 flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-3 py-1.5 pr-4 backdrop-blur-sm sm:ml-6 sm:gap-3 sm:px-4 sm:py-2 sm:pr-6 lg:ml-10 dark:border-white/10 dark:bg-white/5"
                  >
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-100 sm:h-6 sm:w-6 dark:bg-white/10">
                      <LayoutDashboard size={10} className="text-blue-500 sm:hidden" />
                      <LayoutDashboard size={12} className="hidden text-blue-500 sm:block" />
                    </div>
                    <span className="text-[9px] font-bold tracking-widest text-zinc-600 sm:text-[10px] dark:text-zinc-300">
                      BENTO GRIDS
                    </span>
                  </motion.div>

                  <motion.div
                    animate={{ y: [-3, 3, -3] }}
                    transition={{ repeat: Infinity, duration: 4, delay: 2 }}
                    className="flex translate-y-3 items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-3 py-1.5 pr-4 backdrop-blur-sm sm:translate-y-4 sm:gap-3 sm:px-4 sm:py-2 sm:pr-6 dark:border-white/10 dark:bg-white/5"
                  >
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-100 sm:h-6 sm:w-6 dark:bg-white/10">
                      <BarChart3 size={10} className="text-blue-500 sm:hidden" />
                      <BarChart3 size={12} className="hidden text-blue-500 sm:block" />
                    </div>
                    <span className="text-[9px] font-bold tracking-widest text-zinc-600 sm:text-[10px] dark:text-zinc-300">
                      PRICING TABLES
                    </span>
                  </motion.div>
                </div>
              </div>
            </div>
            <div className="relative z-10 shrink-0 px-8 pt-4 pb-8">
              <Text
                variant="strong"
                className="font-outfit text-xl font-semibold tracking-tight text-zinc-900 dark:text-white"
              >
                Composable sections
              </Text>
              <Text
                variant="muted"
                className="mt-1.5 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400"
              >
                Marketing blocks as compound components — Hero, Features, Pricing, FAQ and Bento —
                responsive and dark-ready by default.
              </Text>
            </div>
          </BentoCard>

          {/* Card 3: Directory you already know */}
          <BentoCard className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-zinc-200/80 bg-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl md:col-span-2 dark:border-white/10 dark:bg-[#0a0f1c]">
            <div className="relative flex flex-1 items-center justify-center overflow-hidden p-4 sm:p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(59,130,246,0.05),transparent_70%)] dark:bg-[radial-gradient(circle_at_left,rgba(59,130,246,0.08),transparent_70%)]" />

              {/* Directory flowchart — atoms → sections → templates */}
              <div className="relative mt-2 flex w-full max-w-[420px] flex-col items-center gap-6 sm:gap-8">
                {/* Top Row */}
                <div className="relative flex w-full justify-center gap-3 sm:gap-6">
                  <div className="absolute top-1/2 right-[12%] left-[12%] h-[1px] -translate-y-1/2 bg-blue-500/20" />

                  {[
                    { title: "Atoms", count: "32", sub: "core/ui", Icon: Layers },
                    {
                      title: "Sections",
                      count: "18",
                      sub: "marketing",
                      Icon: LayoutDashboard,
                      isCenter: true,
                    },
                    { title: "Templates", count: "6", sub: "templates", Icon: Layout },
                  ].map((node, i) => (
                    <div
                      key={i}
                      className="relative z-10 flex w-[110px] flex-col gap-2 rounded-2xl border border-zinc-200 bg-white/80 p-3 shadow-lg backdrop-blur-md sm:w-[128px] sm:p-4 dark:border-white/10 dark:bg-white/5"
                    >
                      {i > 0 && (
                        <div className="absolute top-1/2 -left-3 h-1.5 w-1.5 -translate-y-1/2 rounded-full border border-blue-400 bg-white sm:-left-4 dark:border-blue-500 dark:bg-zinc-800" />
                      )}
                      {i < 2 && (
                        <div className="absolute top-1/2 -right-3 h-1.5 w-1.5 -translate-y-1/2 rounded-full border border-blue-400 bg-white sm:-right-4 dark:border-blue-500 dark:bg-zinc-800" />
                      )}
                      {node.isCenter && (
                        <div className="absolute -bottom-3 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full border border-blue-400 bg-white dark:border-blue-500 dark:bg-zinc-800" />
                      )}

                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 dark:border-white/20 dark:bg-white/5">
                          <node.Icon size={12} className="text-blue-500" />
                        </div>
                        <span className="text-xs font-medium text-zinc-900 sm:text-sm dark:text-white">
                          {node.title}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs font-bold text-zinc-900 dark:text-white">
                          {node.count}
                        </span>
                        <span className="text-[9px] text-zinc-400 sm:text-[10px] dark:text-zinc-500">
                          {node.sub}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="absolute top-[62px] left-1/2 h-6 w-[1px] -translate-x-1/2 bg-blue-500/20 sm:top-[68px]" />
                <div className="absolute top-[86px] right-[32%] left-[32%] h-[1px] bg-blue-500/20 sm:top-[92px]" />
                <div className="absolute top-[86px] left-[32%] h-4 w-[1px] bg-blue-500/20 sm:top-[92px]" />
                <div className="absolute top-[86px] right-[32%] h-4 w-[1px] bg-blue-500/20 sm:top-[92px]" />

                {/* Bottom Row */}
                <div className="relative flex w-full justify-center gap-8 sm:gap-12">
                  {[
                    { title: "Tokens", count: "@theme", sub: "CSS vars", Icon: Palette },
                    { title: "CLI", count: "init", sub: "pnpm dlx", Icon: Command },
                  ].map((node) => (
                    <div
                      key={node.title}
                      className="relative z-10 flex w-[110px] flex-col gap-2 rounded-2xl border border-zinc-200 bg-white/80 p-3 shadow-lg backdrop-blur-md sm:w-[128px] sm:p-4 dark:border-white/10 dark:bg-white/5"
                    >
                      <div className="absolute -top-3 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full border border-blue-400 bg-white dark:border-blue-500 dark:bg-zinc-800" />
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 dark:border-white/20 dark:bg-white/5">
                          <node.Icon size={12} className="text-blue-500" />
                        </div>
                        <span className="text-xs font-medium text-zinc-900 sm:text-sm dark:text-white">
                          {node.title}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="font-mono text-[11px] font-bold text-zinc-900 dark:text-white">
                          {node.count}
                        </span>
                        <span className="text-[9px] text-zinc-400 sm:text-[10px] dark:text-zinc-500">
                          {node.sub}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Realistic flow — dots follow the actual stroke via CSS motion path */}
                <motion.div
                  className="absolute top-[34px] left-1/2 -mt-1 -ml-1 h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.9),0_0_20px_rgba(59,130,246,0.35)] will-change-transform dark:bg-blue-400"
                  style={
                    {
                      offsetPath: "path('M 0 0 V 34 H -60 V 58')",
                      offsetRotate: "0deg",
                    } as React.CSSProperties
                  }
                  animate={{
                    offsetDistance: ["0%", "100%"],
                    opacity: [0, 1, 1, 0],
                    scale: [0.7, 1, 1, 0.9],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: [0.4, 0, 0.2, 1],
                    repeatDelay: 1.8,
                  }}
                />
                <motion.div
                  className="absolute top-[34px] left-1/2 -mt-1 -ml-1 h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.9),0_0_20px_rgba(59,130,246,0.35)] will-change-transform dark:bg-blue-400"
                  style={
                    {
                      offsetPath: "path('M 0 0 V 34 H 60 V 58')",
                      offsetRotate: "0deg",
                    } as React.CSSProperties
                  }
                  animate={{
                    offsetDistance: ["0%", "100%"],
                    opacity: [0, 1, 1, 0],
                    scale: [0.7, 1, 1, 0.9],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: [0.4, 0, 0.2, 1],
                    delay: 1.1,
                    repeatDelay: 1.8,
                  }}
                />
                <motion.div
                  className="absolute top-[68px] left-1/2 -mt-[3px] -ml-[3px] h-1.5 w-1.5 rounded-full bg-blue-500/50 sm:top-[72px] dark:bg-blue-400/50"
                  animate={{ scale: [0.9, 1.7, 0.9], opacity: [0.25, 0.6, 0.25] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </div>
            <div className="relative z-10 shrink-0 px-8 pt-4 pb-8">
              <Text
                variant="strong"
                className="font-outfit text-xl font-semibold tracking-tight text-zinc-900 dark:text-white"
              >
                One directory, zero guesswork
              </Text>
              <Text
                variant="muted"
                className="mt-1.5 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400"
              >
                <span className="font-mono text-xs text-zinc-700 dark:text-zinc-300">core</span> for
                atoms,{" "}
                <span className="font-mono text-xs text-zinc-700 dark:text-zinc-300">
                  marketing
                </span>{" "}
                for sections,{" "}
                <span className="font-mono text-xs text-zinc-700 dark:text-zinc-300">
                  templates
                </span>{" "}
                for starters — one structure from init to deploy.
              </Text>
            </div>
          </BentoCard>

          {/* Card 4: Token-driven theming */}
          <BentoCard className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-zinc-200/80 bg-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl md:col-span-1 dark:border-white/10 dark:bg-[#0a0f1c]">
            <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden pt-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(56,189,248,0.05),transparent_70%)] dark:bg-[radial-gradient(circle_at_bottom,rgba(56,189,248,0.08),transparent_70%)]" />

              <div className="relative flex flex-col items-center gap-4">
                <div className="relative flex h-32 w-32 items-center justify-center">
                  <div className="absolute inset-[-40px] bg-[radial-gradient(#00000022_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)] bg-[size:4px_4px] dark:bg-[radial-gradient(#ffffff22_1px,transparent_1px)]" />

                  <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border border-zinc-300 bg-zinc-50 shadow-[inset_0_-10px_20px_rgba(0,0,0,0.05)] dark:border-white/20 dark:bg-zinc-900 dark:shadow-[inset_0_-10px_20px_rgba(255,255,255,0.05)]">
                    <span className="font-mono text-[10px] font-bold tracking-widest text-zinc-500 dark:text-zinc-400">
                      @theme
                    </span>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                      className="absolute inset-[-1px] rounded-full"
                    >
                      <div className="absolute top-2 right-2 h-0 w-0 rotate-[45deg] border-r-[4px] border-b-[6px] border-l-[4px] border-r-transparent border-b-blue-500 border-l-transparent drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                    </motion.div>
                  </div>

                  <div className="absolute inset-[-10px] rounded-full border border-zinc-200 dark:border-white/5" />
                  <div className="absolute inset-[-20px] rounded-full border border-zinc-100 dark:border-white/5" />
                  <motion.div
                    animate={{ scale: [1, 1.08, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="absolute inset-[-28px] rounded-full border border-blue-500/10 dark:border-blue-400/10"
                  />
                </div>

                <span className="relative z-10 text-center font-mono text-[8px] font-bold tracking-widest text-zinc-500 dark:text-zinc-600">
                  HUDBIRD — TOKEN SYSTEM
                </span>
              </div>
            </div>
            <div className="relative z-10 shrink-0 px-8 pt-4 pb-8">
              <Text
                variant="strong"
                className="font-outfit text-xl font-semibold tracking-tight text-zinc-900 dark:text-white"
              >
                Token-driven, dark-ready
              </Text>
              <Text
                variant="muted"
                className="mt-1.5 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400"
              >
                Tailwind v4{" "}
                <span className="font-mono text-xs text-zinc-700 dark:text-zinc-300">@theme</span> +
                CSS variables on every token. Light and dark pair on the same API, plus full a11y.
              </Text>
            </div>
          </BentoCard>
        </BentoGrid>
      </div>
    </section>
  </>
);
