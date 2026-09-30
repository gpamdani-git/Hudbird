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

export const AiStartupAgentShowcase = ({
  activeAgentCard: externalActive,
  setActiveAgentCard: externalSetActive,
}: {
  activeAgentCard?: number;
  setActiveAgentCard?: any;
}) => {
  const [internalActive, setInternalActive] = useState(0);
  const activeAgentCard = externalActive !== undefined ? externalActive : internalActive;
  const setActiveAgentCard =
    externalSetActive !== undefined ? externalSetActive : setInternalActive;

  return (
    <>
      {/* <!-- Agent Showcase Section --> */}
      <section
        id="components"
        className="relative w-full bg-white px-4 py-24 sm:px-8 sm:py-32 dark:bg-[#030712]"
      >
        {/* Subtle blue gradient glow — matches hero */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -top-[30%] -right-[10%] h-[60%] w-[50%] rounded-full bg-blue-500/5 blur-[120px] dark:bg-blue-600/10" />
          <div className="absolute -bottom-[20%] -left-[10%] h-[50%] w-[40%] rounded-full bg-blue-400/5 blur-[100px] dark:bg-blue-500/8" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl space-y-14">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="mb-12 max-w-2xl"
          >
            <span className="mb-1 inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-2 text-xs font-semibold tracking-wide text-blue-600 uppercase dark:text-blue-400">
              Hudbird UI — Component Gallery
            </span>
            <h1
              id="gallery-title"
              className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-white"
            >
              Fly through your development with your AI agent partner
            </h1>
            <p className="mt-4 mb-24 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Atomic core components, molecule-level sections, and data-driven templates — the
              building blocks behind every hudbird interface.
            </p>
          </motion.div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
            {/* Left Main Feature Cards Stack */}
            <div className="flex flex-col gap-12">
              {/* Card 0: CMS */}
              <motion.div
                onViewportEnter={() => setActiveAgentCard(0)}
                viewport={{ margin: "-40% 0px -40% 0px" }}
                className="group relative flex min-h-[600px] flex-col justify-between overflow-hidden rounded-[24px] border border-zinc-200/80 bg-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl lg:h-[700px] dark:border-white/10 dark:bg-[#0a0f1c]"
              >
                {/* Illustration Area — glass like Designed */}
                <div className="relative flex min-h-[500px] flex-1 items-center justify-center overflow-hidden p-6 sm:p-8">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.06),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08),transparent_70%)]" />

                  <AtomicIllustration />
                </div>

                {/* Bottom Text — glass like Designed */}
                <div className="relative z-10 flex flex-col justify-between gap-6 border-t border-zinc-200/60 bg-white/70 p-8 backdrop-blur-md sm:flex-row sm:items-end lg:p-10 dark:border-white/10 dark:bg-white/5">
                  <div className="max-w-xl">
                    <h3 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                      From Atoms to Full Templates
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                      Accelerate UI development with Hudbird UI. Build scalable applications
                      starting from atomic core components, to molecule-level marketing sections,
                      and assemble data-driven layout templates with a clean directory structure.
                    </p>
                  </div>
                  <a
                    href="/#/button"
                    className="group flex shrink-0 items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Explore components{" "}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </motion.div>

              {/* Card 1: Terminal */}
              <motion.div
                onViewportEnter={() => setActiveAgentCard(1)}
                viewport={{ margin: "-40% 0px -40% 0px" }}
                className="group relative flex min-h-[600px] flex-col justify-between overflow-hidden rounded-[24px] border border-zinc-200/80 bg-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl lg:h-[700px] dark:border-white/10 dark:bg-[#0a0f1c]"
              >
                {/* Terminal Illustration Area — glass like Designed */}
                <div className="relative flex min-h-[500px] flex-1 items-center justify-center overflow-hidden p-6 sm:p-8">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.06),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08),transparent_70%)]" />

                  <TerminalAnimation />
                </div>

                {/* Bottom Text — glass like Designed */}
                <div className="relative z-10 flex flex-col justify-between gap-6 border-t border-zinc-200/60 bg-white/70 p-8 backdrop-blur-md sm:flex-row sm:items-end lg:p-10 dark:border-white/10 dark:bg-white/5">
                  <div className="max-w-xl">
                    <h3 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                      Smart CLI Initialization
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                      Install components, configure tailwind, and initialize your workspace with a
                      single command. The CLI handles all dependencies instantly.
                    </p>
                  </div>
                  <a
                    href="/#/installation"
                    className="group flex shrink-0 items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    View Docs{" "}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </motion.div>

              {/* Card 2: Accelerate */}
              <motion.div
                onViewportEnter={() => setActiveAgentCard(2)}
                viewport={{ margin: "-40% 0px -40% 0px" }}
                className="group relative flex min-h-[600px] flex-col justify-between overflow-hidden rounded-[24px] border border-zinc-200/80 bg-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl lg:h-[700px] dark:border-white/10 dark:bg-[#0a0f1c]"
              >
                {/* Code Illustration Area — glass like Designed */}
                <div className="relative flex min-h-[500px] flex-1 items-center justify-center overflow-hidden p-6 sm:p-8">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.06),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08),transparent_70%)]" />

                  {/* VSCode autocomplete typing illustration */}
                  <VscodeAutocompleteIllustration />
                </div>

                {/* Bottom Text — glass like Designed */}
                <div className="relative z-10 flex flex-col justify-between gap-6 border-t border-zinc-200/60 bg-white/70 p-8 backdrop-blur-md sm:flex-row sm:items-end lg:p-10 dark:border-white/10 dark:bg-white/5">
                  <div className="max-w-xl">
                    <h3 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                      Accelerate your development
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                      Everything you need to ship your product faster with ready-to-use layouts and
                      blocks.
                    </p>
                  </div>
                  <a
                    href="/#/marketing/hero"
                    className="group flex shrink-0 items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Browse Blocks{" "}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Right Agent Chat Card — sticky on desktop, full-width on mobile */}
            <div className="sticky top-24 flex h-[500px] flex-col justify-between overflow-hidden rounded-[28px] border border-zinc-200/80 bg-white shadow-lg sm:h-[600px] lg:h-[700px] dark:border-white/10 dark:bg-[#0f0f1a]">
              {/* Chat Area — scrollable on mobile */}
              <div className="relative flex flex-1 flex-col overflow-y-auto overscroll-contain scroll-smooth p-6">
                <AnimatePresence mode="wait">
                  {activeAgentCard === 0 && (
                    <motion.div
                      key="chat-0"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{
                        opacity: 0,
                        y: -30,
                        position: "absolute",
                        left: "1.5rem",
                        right: "1.5rem",
                      }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                      className="flex flex-col gap-6"
                    >
                      {/* Agent Bubble */}
                      <div className="rounded-2xl rounded-tr-sm border border-zinc-100 bg-zinc-50 p-4 shadow-sm dark:border-zinc-800/50 dark:bg-[#20202b]">
                        <div className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                          <span className="font-semibold text-blue-600 dark:text-blue-400">
                            /ui{" "}
                          </span>
                          <TypewriterText
                            text="scaffold a data-driven landing page template using "
                            delay={0.2}
                          />
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="rounded bg-white px-1.5 py-0.5 font-mono text-xs font-medium shadow-sm dark:bg-black/50"
                          >
                            core components
                          </motion.span>
                        </div>
                      </div>

                      {/* Thoughts Area */}
                      <div className="flex flex-col gap-4 px-2">
                        <div className="flex items-center justify-between text-xs font-medium text-zinc-400 dark:text-zinc-500">
                          <div className="flex items-center gap-2">
                            <span>Thought 8s</span>
                            <motion.div
                              animate={{ opacity: [0.4, 1, 0.4] }}
                              transition={{ repeat: Infinity, duration: 2 }}
                              className="h-1.5 w-1.5 rounded-full bg-blue-500"
                            />
                          </div>
                        </div>

                        <div className="w-full">
                          <TypewriterText
                            className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400"
                            text="I'll compose the atomic components into marketing sections and assemble them into a full scalable page template following the directory structure."
                            delay={0.2}
                          />

                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.5 }}
                            className="mt-4 flex flex-col gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-3 shadow-sm dark:border-white/5 dark:bg-black/20"
                          >
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-medium text-zinc-900 dark:text-white">
                                Changes
                              </span>
                              <span className="cursor-pointer text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
                                Undo
                              </span>
                            </div>
                            <div className="mt-2 flex items-center justify-between text-sm text-zinc-700 dark:text-zinc-300">
                              <div className="flex items-center gap-2 font-medium">
                                <Layers className="h-3.5 w-3.5 text-blue-500" /> Page Template
                              </div>
                              <span className="text-xs text-zinc-500">Assembled</span>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeAgentCard === 1 && (
                    <motion.div
                      key="chat-1"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{
                        opacity: 0,
                        y: -30,
                        position: "absolute",
                        left: "1.5rem",
                        right: "1.5rem",
                      }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                      className="flex flex-col gap-6"
                    >
                      {/* Agent Bubble */}
                      <div className="rounded-2xl rounded-tr-sm border border-zinc-100 bg-zinc-50 p-4 shadow-sm dark:border-zinc-800/50 dark:bg-[#20202b]">
                        <div className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                          <span className="font-semibold text-purple-600 dark:text-purple-400">
                            /cli{" "}
                          </span>
                          <TypewriterText
                            text="Initialize a new project and add the "
                            delay={0.2}
                          />
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="rounded bg-white px-1.5 py-0.5 font-mono text-xs font-medium shadow-sm dark:bg-black/50"
                          >
                            Hero
                          </motion.span>
                          <TypewriterText text=" component." delay={0.7} />
                        </div>
                      </div>

                      {/* Thoughts Area */}
                      <div className="flex flex-col gap-4 px-2">
                        <div className="flex items-center justify-between text-xs font-medium text-zinc-400 dark:text-zinc-500">
                          <div className="flex items-center gap-2">
                            <span>Thought 8s</span>
                            <motion.div
                              animate={{ opacity: [0.4, 1, 0.4] }}
                              transition={{ repeat: Infinity, duration: 2 }}
                              className="h-1.5 w-1.5 rounded-full bg-blue-500"
                            />
                          </div>
                        </div>

                        <div className="w-full">
                          <TypewriterText
                            className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400"
                            text="I'll set up a new Next.js project, initialize the hudbird-ui environment, and automatically add the Hero block."
                            delay={0.2}
                          />

                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.5 }}
                            className="mt-4 flex flex-col gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-3 shadow-sm dark:border-white/5 dark:bg-black/20"
                          >
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-medium text-zinc-900 dark:text-white">
                                Changes
                              </span>
                              <span className="cursor-pointer text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
                                Undo
                              </span>
                            </div>
                            <div className="mt-2 flex items-center justify-between text-sm text-zinc-700 dark:text-zinc-300">
                              <div className="flex items-center gap-2 font-medium">
                                <Code2 className="h-3.5 w-3.5 text-purple-500" /> Terminal
                              </div>
                              <span className="text-xs text-zinc-500">Setup Complete</span>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeAgentCard === 2 && (
                    <motion.div
                      key="chat-2"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{
                        opacity: 0,
                        y: -30,
                        position: "absolute",
                        left: "1.5rem",
                        right: "1.5rem",
                      }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                      className="flex flex-col gap-6"
                    >
                      {/* Agent Bubble */}
                      <div className="rounded-2xl rounded-tr-sm border border-zinc-100 bg-zinc-50 p-4 shadow-sm dark:border-zinc-800/50 dark:bg-[#20202b]">
                        <div className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                            /ui{" "}
                          </span>
                          <TypewriterText text="Generate a hero section using " delay={0.2} />
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="rounded bg-white px-1.5 py-0.5 font-mono text-xs font-medium shadow-sm dark:bg-black/50"
                          >
                            @hudbird/ui
                          </motion.span>
                          <TypewriterText text=" components." delay={0.7} />
                        </div>
                      </div>

                      {/* Thoughts Area */}
                      <div className="flex flex-col gap-4 px-2">
                        <div className="flex items-center justify-between text-xs font-medium text-zinc-400 dark:text-zinc-500">
                          <div className="flex items-center gap-2">
                            <span>Thought 8s</span>
                            <motion.div
                              animate={{ opacity: [0.4, 1, 0.4] }}
                              transition={{ repeat: Infinity, duration: 2 }}
                              className="h-1.5 w-1.5 rounded-full bg-blue-500"
                            />
                          </div>
                        </div>

                        <div className="w-full">
                          <TypewriterText
                            className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400"
                            text="I'll pull in the BentoGrid and Button components, and assemble a responsive hero section for you."
                            delay={0.2}
                          />

                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.5 }}
                            className="mt-4 flex flex-col gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-3 shadow-sm dark:border-white/5 dark:bg-black/20"
                          >
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-medium text-zinc-900 dark:text-white">
                                Changes
                              </span>
                              <span className="cursor-pointer text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
                                Undo
                              </span>
                            </div>
                            <div className="mt-2 flex items-center justify-between text-sm text-zinc-700 dark:text-zinc-300">
                              <div className="flex items-center gap-2 font-medium">
                                <Layout className="h-3.5 w-3.5 text-indigo-500" /> Hero Section
                              </div>
                              <span className="text-xs text-zinc-500">Added</span>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Input Area */}
              <div className="border-t border-zinc-100 bg-zinc-50/50 p-4 dark:border-white/5 dark:bg-black/10">
                <div className="flex w-full items-center justify-between rounded-xl border border-zinc-200 bg-white px-3 py-2.5 shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20 dark:border-zinc-700/50 dark:bg-[#1a1a24]">
                  <span className="text-sm text-zinc-400 dark:text-zinc-500">Add follow up...</span>
                  <div className="flex gap-2 text-zinc-400">
                    <Command className="h-4 w-4" />
                    <ArrowUpCircle className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between px-1 text-xs font-medium text-zinc-400 dark:text-zinc-500">
                  <span>GPT 5.6 Terra</span>
                  <div className="flex gap-2">
                    <div className="h-3.5 w-3.5 rounded-full border border-zinc-300 dark:border-zinc-600" />
                    <div className="h-3.5 w-3.5 rounded-full border border-zinc-300 dark:border-zinc-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
