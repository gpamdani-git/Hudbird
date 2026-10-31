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
} from "./components/shared";
import React, { useState, useEffect, lazy, Suspense } from "react";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
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
  Moon,
  Sun,
  Monitor,
  Code2,
  Layers,
  Cpu,
  Network,
  Zap,
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
  Mic,
  ListChecks,
  PenTool,
} from "lucide-react";
import {
  ThemeToggleButton,
  useTemplateTheme,
} from "../../components/templates/TemplateThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { StatsSection } from "./components/StatsSection";
import { HeroComponentShowcase } from "./components/HeroComponentShowcase";
import { TechStackCloud } from "./components/TechStackCloud";

const MorphingUIHero = lazy(() =>
  import("./components/MorphingUIHero").then((m) => ({ default: m.MorphingUIHero }))
);
const TerminalAnimation = lazy(() =>
  import("./components/TerminalAnimation").then((m) => ({ default: m.TerminalAnimation }))
);
const VscodeAutocompleteIllustration = lazy(() =>
  import("./components/VscodeAutocompleteIllustration").then((m) => ({
    default: m.VscodeAutocompleteIllustration,
  }))
);
const AtomicIllustration = lazy(() =>
  import("./components/AtomicIllustration").then((m) => ({ default: m.AtomicIllustration }))
);
const TemplateMarquee = lazy(() =>
  import("./components/TemplateMarquee").then((m) => ({ default: m.TemplateMarquee }))
);
const CtaTerminalDemo = lazy(() =>
  import("./components/CtaTerminalDemo").then((m) => ({ default: m.CtaTerminalDemo }))
);
const ComponentShowcase = lazy(() =>
  import("./components/ComponentShowcase").then((m) => ({ default: m.ComponentShowcase }))
);

const SEO = () => (
  <>
    <title>Hudbird | AI Startup Template</title>
    <meta
      name="description"
      content="Hudbird AI startup template – a modern, responsive landing page with dark/light mode, smooth animations, and production‑ready performance."
    />
    <link rel="canonical" href="https://hudbird.ai" />
    <meta property="og:title" content="Hudbird | AI Startup Template" />
    <meta
      property="og:description"
      content="A modern, responsive landing page with dark/light mode, smooth animations, and production‑ready performance."
    />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://hudbird.ai" />
    <meta property="og:image" content="/og-image.png" />
    <meta property="og:site_name" content="Hudbird" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Hudbird | AI Startup Template" />
    <meta
      name="twitter:description"
      content="A modern, responsive landing page with dark/light mode, smooth animations, and production‑ready performance."
    />
    <meta name="twitter:image" content="/twitter-image.png" />
  </>
);

export const AiStartupTemplate = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [activeAgentCard, setActiveAgentCard] = useState(0);

  // Smooth scroll helper
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <SEO />
      <main className="flex min-h-screen w-full flex-col bg-white dark:bg-[#161618]">
        <SiteHeader />

        {/* <!-- Hero Section --> */}
        <Hero id="hero" size="auto" className="relative overflow-hidden bg-white dark:bg-[#161618]">
          {/* Subtle Ambient Vignette */}
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/15 via-transparent to-transparent opacity-30 dark:opacity-20" />

          <HeroBody
            align="center"
            className="relative z-10 mx-auto max-w-5xl pt-8 pb-16 sm:pt-12 sm:pb-24"
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mb-8 flex justify-center"
            >
              <a
                href="https://danihudbird.gumroad.com/l/hudbirdui-pro-allaccess"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-zinc-50/80 px-4 py-1.5 text-xs font-medium text-zinc-700 transition-all hover:border-indigo-500/40 hover:bg-zinc-100 active:scale-[0.98] dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:border-indigo-500/40 dark:hover:bg-white/10"
              >
                <span className="font-mono text-[10px] font-bold text-indigo-600 dark:text-indigo-400">
                  PRO ALL-ACCESS
                </span>
                <span className="h-3 w-px bg-zinc-300 dark:bg-white/20" />
                <span>Explore Full Starter Kits & Marketing Blocks</span>
                <ArrowRight className="h-3.5 w-3.5 text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:text-indigo-500" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h1 className="font-outfit text-4xl leading-[1.12] font-medium tracking-tight text-zinc-900 sm:text-6xl md:text-7xl dark:text-white">
                Build Beautiful Interfaces
                <br />
                with hudbird-ui.
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <HeroDescription className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-[#E5E5E5]/80">
                A precision React component library built on Tailwind CSS v4 and tactile physics.
                From atomic core primitives to full-page templates — ship pixel-perfect UIs with
                zero design debt.
              </HeroDescription>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <HeroActions className="mt-8 flex-col justify-center gap-3.5 sm:flex-row">
                <a href="/#/docs" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="h-12 w-full rounded-xl bg-[#4F46E5] px-8 text-sm font-medium text-white shadow-xs transition-all hover:bg-[#4338CA] active:scale-[0.98] sm:w-auto"
                  >
                    <span>Get started</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>

                <a href="/#/blocks" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 w-full rounded-xl border-zinc-200/80 bg-white/80 px-8 text-sm font-medium text-zinc-800 backdrop-blur-sm hover:bg-zinc-100 active:scale-[0.98] sm:w-auto dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                  >
                    <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-100 dark:bg-white/10">
                      <PlayIcon className="h-2.5 w-2.5 translate-x-[1px] fill-current text-zinc-900 dark:text-white" />
                    </div>
                    Browse blocks
                  </Button>
                </a>
              </HeroActions>
            </motion.div>

            {/* Interactive Component Showcase Centerpiece */}
            <motion.div
              className="mt-16 w-full sm:mt-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              <HeroComponentShowcase />
            </motion.div>
          </HeroBody>
        </Hero>

        {/* <!-- Stats Section --> */}
        <StatsSection />

        {/* <!-- Tech Stack Cloud (Real Ecosystem Proof) --> */}
        <TechStackCloud />
        {/* <!-- Component Gallery (bento mosaic) — same container width as #components --> */}
        <div id="components">
          <Suspense
            fallback={
              <div className="h-64 w-full animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-900" />
            }
          >
            <ComponentShowcase />
          </Suspense>
        </div>
        {/* <!-- Agent Showcase Section --> */}
        <section
          id="features"
          className="relative w-full bg-white px-4 py-24 sm:px-8 sm:py-32 dark:bg-[#161618]"
        >
          <div className="relative z-10 mx-auto max-w-7xl space-y-14">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mb-12 max-w-2xl"
            >
              <span className="font-mono text-xs font-bold tracking-[1.6px] text-indigo-600 uppercase dark:text-indigo-400">
                ARCHITECTURE & ATOMS
              </span>
              <h2
                id="gallery-title"
                className="font-outfit mt-3 text-3xl font-medium tracking-tight text-zinc-900 sm:text-4xl dark:text-white"
              >
                Fly through your development with your AI agent partner
              </h2>
              <p className="mt-4 mb-16 text-sm leading-relaxed text-zinc-500 dark:text-[#E5E5E5]/70">
                Atomic core components, molecule-level sections, and data-driven templates — the
                building blocks behind every Hudbird interface.
              </p>
            </motion.div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
              {/* Left Main Feature Cards Stack */}
              <div className="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto pb-4 lg:flex-col lg:gap-12 lg:overflow-visible lg:pb-0">
                {/* Card 0: CMS */}
                <motion.div
                  onViewportEnter={() => setActiveAgentCard(0)}
                  viewport={{ amount: 0.5 }}
                  className="group relative flex min-h-[450px] w-[85vw] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-[24px] border border-zinc-200/80 bg-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:w-[600px] lg:h-[700px] lg:min-h-[600px] lg:w-auto dark:border-white/10 dark:bg-[#1C1C1F]"
                >
                  {/* Illustration Area */}
                  <div className="relative flex min-h-[250px] flex-1 items-center justify-center overflow-hidden p-6 sm:p-8 lg:min-h-[500px]">
                    <Suspense
                      fallback={
                        <div className="h-64 w-full animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-900" />
                      }
                    >
                      <AtomicIllustration />
                    </Suspense>
                  </div>

                  {/* Bottom Text */}
                  <div className="relative z-10 flex flex-col justify-between gap-6 border-t border-zinc-200/60 bg-white/70 p-8 backdrop-blur-md sm:flex-row sm:items-end lg:p-10 dark:border-white/10 dark:bg-white/5">
                    <div className="max-w-xl">
                      <h3 className="font-outfit text-xl font-medium tracking-tight text-zinc-900 dark:text-white">
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
                      className="group flex shrink-0 items-center gap-1.5 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                      Explore components{" "}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </motion.div>

                {/* Card 1: Terminal */}
                <motion.div
                  onViewportEnter={() => setActiveAgentCard(1)}
                  viewport={{ amount: 0.5 }}
                  className="group relative flex min-h-[450px] w-[85vw] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-[24px] border border-zinc-200/80 bg-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:w-[600px] lg:h-[700px] lg:min-h-[600px] lg:w-auto dark:border-white/10 dark:bg-[#1C1C1F]"
                >
                  {/* Terminal Illustration Area */}
                  <div className="relative flex min-h-[250px] flex-1 items-center justify-center overflow-hidden p-6 sm:p-8 lg:min-h-[500px]">
                    <Suspense
                      fallback={
                        <div className="h-64 w-full animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-900" />
                      }
                    >
                      <TerminalAnimation />
                    </Suspense>
                  </div>

                  {/* Bottom Text */}
                  <div className="relative z-10 flex flex-col justify-between gap-6 border-t border-zinc-200/60 bg-white/70 p-8 backdrop-blur-md sm:flex-row sm:items-end lg:p-10 dark:border-white/10 dark:bg-white/5">
                    <div className="max-w-xl">
                      <h3 className="font-outfit text-xl font-medium tracking-tight text-zinc-900 dark:text-white">
                        Smart CLI Initialization
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                        Install components, configure tailwind, and initialize your workspace with a
                        single command. The CLI handles all dependencies instantly.
                      </p>
                    </div>
                    <a
                      href="/#/installation"
                      className="group flex shrink-0 items-center gap-1.5 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                      View Docs{" "}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </motion.div>

                {/* Card 2: Accelerate */}
                <motion.div
                  onViewportEnter={() => setActiveAgentCard(2)}
                  viewport={{ amount: 0.5 }}
                  className="group relative flex min-h-[450px] w-[85vw] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-[24px] border border-zinc-200/80 bg-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:w-[600px] lg:h-[700px] lg:min-h-[600px] lg:w-auto dark:border-white/10 dark:bg-[#1C1C1F]"
                >
                  {/* Code Illustration Area */}
                  <div className="relative flex min-h-[250px] flex-1 items-center justify-center overflow-hidden p-6 sm:p-8 lg:min-h-[500px]">
                    <Suspense
                      fallback={
                        <div className="h-64 w-full animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-900" />
                      }
                    >
                      <VscodeAutocompleteIllustration />
                    </Suspense>
                  </div>

                  {/* Bottom Text */}
                  <div className="relative z-10 flex flex-col justify-between gap-6 border-t border-zinc-200/60 bg-white/70 p-8 backdrop-blur-md sm:flex-row sm:items-end lg:p-10 dark:border-white/10 dark:bg-white/5">
                    <div className="max-w-xl">
                      <h3 className="font-outfit text-xl font-medium tracking-tight text-zinc-900 dark:text-white">
                        Accelerate your development
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                        Everything you need to ship your product faster with ready-to-use layouts
                        and blocks.
                      </p>
                    </div>
                    <a
                      href="/#/marketing/hero"
                      className="group flex shrink-0 items-center gap-1.5 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                      Browse Blocks{" "}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </motion.div>
              </div>

              {/* Right Agent Chat Card — sticky on desktop, full-width on mobile */}
              <div className="sticky top-24 flex h-[450px] flex-col justify-between overflow-hidden rounded-[28px] border border-zinc-200/80 bg-white shadow-lg sm:h-[550px] lg:h-[700px] dark:border-white/10 dark:bg-[#1C1C1F]">
                {/* Chat Area */}
                <div className="pointer-events-none relative flex flex-1 flex-col overflow-hidden p-6">
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
                    <span className="text-sm text-zinc-400 dark:text-zinc-500">
                      Add follow up...
                    </span>
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

        {/* <!-- Built for Modern Web — Feature Bento --> */}
        <section
          id="bento"
          className="relative w-full overflow-hidden bg-zinc-50 px-4 py-24 sm:px-8 sm:py-32 dark:bg-[#161618]"
        >
          <div className="relative z-10 mx-auto max-w-7xl space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, ease: "easeOut" }}
            >
              <FeatureHeader>
                <span className="mx-auto mb-4 inline-flex font-mono text-xs font-bold tracking-[1.6px] text-indigo-600 uppercase dark:text-indigo-400">
                  ATOMS TO TEMPLATES
                </span>
                <FeatureTitle className="font-outfit text-3xl font-medium tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
                  Designed for how modern products ship
                </FeatureTitle>
                <FeatureDescription className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-500 sm:text-base dark:text-[#E5E5E5]/70">
                  Stop rebuilding the same blocks. Start from type-safe atoms, compose
                  conversion-ready marketing sections, and ship full templates with one{" "}
                  <span className="font-mono text-sm font-medium text-zinc-900 dark:text-white">
                    pnpm dlx hudbird-ui init
                  </span>{" "}
                  — Tailwind v4 and spring physics included.
                </FeatureDescription>
              </FeatureHeader>
            </motion.div>

            <BentoGrid className="relative mx-auto w-full gap-4 md:auto-rows-[26rem] md:grid-cols-3 xl:grid-cols-3">
              {/* Card 1: Atomic primitives */}
              <BentoCard className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-zinc-200/80 bg-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl md:col-span-1 dark:border-white/10 dark:bg-[#1C1C1F]">
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
                      <Button
                        size="sm"
                        variant="outline"
                        radius="full"
                        className="h-7 px-3 text-xs"
                      >
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
                    Type-safe Button, Input, Card, Badge and more — Radix-based, CVA-driven, and
                    ready to override with{" "}
                    <span className="font-mono text-xs text-zinc-700 dark:text-zinc-300">cn()</span>
                    .
                  </Text>
                </div>
              </BentoCard>

              {/* Card 2: Workflow Automation */}
              <BentoCard className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-zinc-200/80 bg-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl md:col-span-2 dark:border-white/10 dark:bg-[#1C1C1F]">
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
                    Marketing blocks as compound components — Hero, Features, Pricing, FAQ and Bento
                    — responsive and dark-ready by default.
                  </Text>
                </div>
              </BentoCard>

              {/* Card 3: Directory you already know */}
              <BentoCard className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-zinc-200/80 bg-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl md:col-span-2 dark:border-white/10 dark:bg-[#1C1C1F]">
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
                    <span className="font-mono text-xs text-zinc-700 dark:text-zinc-300">core</span>{" "}
                    for atoms,{" "}
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
              <BentoCard className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-zinc-200/80 bg-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl md:col-span-1 dark:border-white/10 dark:bg-[#1C1C1F]">
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
                    <span className="font-mono text-xs text-zinc-700 dark:text-zinc-300">
                      @theme
                    </span>{" "}
                    + CSS variables on every token. Light and dark pair on the same API, plus full
                    a11y.
                  </Text>
                </div>
              </BentoCard>
            </BentoGrid>
          </div>
        </section>

        {/* Kinetic Physics & Morphing Feature Section */}
        <section className="relative flex flex-col items-center overflow-hidden bg-zinc-50 pt-24 pb-32 font-sans transition-colors duration-500 sm:pt-32 sm:pb-40 dark:bg-[#161618]">
          {/* Top Header */}
          <div className="relative z-10 flex flex-col items-center px-4 text-center">
            <span className="font-mono text-xs font-bold tracking-[1.6px] text-indigo-600 uppercase dark:text-indigo-400">
              KINETIC PHYSICS & AFFORDANCES
            </span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="font-outfit mt-3 text-3xl font-medium tracking-tight text-zinc-900 sm:text-5xl dark:text-white"
            >
              State-Driven Morphing Interactions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-zinc-500 sm:text-lg dark:text-[#E5E5E5]/70"
            >
              Hudbird pairs hardware-accelerated spring dynamics with tactile zero-latency feedback
              for a frictionless experience.
            </motion.p>
          </div>

          {/* Morphing UI Container in DoubleBezelCard */}
          <div className="relative mt-12 flex w-full max-w-4xl flex-col items-center justify-center px-4 sm:mt-16 sm:px-6">
            <div className="w-full rounded-2xl border border-zinc-200/80 bg-white/70 p-2 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-[#1C1C1F]">
              <div className="relative flex min-h-[360px] w-full items-center justify-center overflow-hidden rounded-[14px] border border-zinc-200/60 bg-zinc-50/50 p-6 sm:p-12 dark:border-white/5 dark:bg-[#161618]">
                <Suspense
                  fallback={
                    <div className="h-64 w-full animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-900" />
                  }
                >
                  <MorphingUIHero />
                </Suspense>
              </div>
            </div>
          </div>

          {/* Bottom Feature Grid */}
          <div className="relative z-10 mt-32 flex flex-col items-center">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-16 text-2xl font-medium tracking-tight text-zinc-900 md:text-3xl dark:text-white"
            >
              A library of interactive primitives.
            </motion.h3>

            <div
              className="flex flex-col items-center"
              style={{
                maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
                WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
              }}
            >
              {/* Top Row (3 columns) */}
              <div className="flex flex-col border-b border-zinc-200 md:flex-row dark:border-white/10">
                <div className="flex w-[280px] flex-col items-center border-zinc-200 p-8 text-center md:border-r dark:border-white/10">
                  <Activity className="mb-4 h-6 w-6 text-zinc-400 dark:text-white/50" />
                  <h4 className="mb-2 text-sm font-medium text-zinc-800 dark:text-white/90">
                    Continuous motion
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-white/50">
                    one shape morphs seamlessly
                  </p>
                </div>
                <div className="flex w-[280px] flex-col items-center border-zinc-200 p-8 text-center md:border-r dark:border-white/10">
                  <Code2 className="mb-4 h-6 w-6 text-zinc-400 dark:text-white/50" />
                  <h4 className="mb-2 text-sm font-medium text-zinc-800 dark:text-white/90">
                    Framer Motion
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-white/50">
                    powered by fluid springs
                  </p>
                </div>
                <div className="flex w-[280px] flex-col items-center p-8 text-center">
                  <PlayIcon className="mb-4 h-6 w-6 text-zinc-400 dark:text-white/50" />
                  <h4 className="mb-2 text-sm font-medium text-zinc-800 dark:text-white/90">
                    Interactive states
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-white/50">cursor-driven feedback</p>
                </div>
              </div>
              {/* Bottom Row (2 columns) */}
              <div className="flex flex-col md:flex-row">
                <div className="flex w-[280px] flex-col items-center border-zinc-200 p-8 text-center md:border-r dark:border-white/10">
                  <Command className="mb-4 h-6 w-6 text-zinc-400 dark:text-white/50" />
                  <h4 className="mb-2 text-sm font-medium text-zinc-800 dark:text-white/90">
                    Command palette,
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-white/50">
                    search and filter smoothly
                  </p>
                </div>
                <div className="flex w-[280px] flex-col items-center p-8 text-center">
                  <Palette className="mb-4 h-6 w-6 text-zinc-400 dark:text-white/50" />
                  <h4 className="mb-2 text-sm font-medium text-zinc-800 dark:text-white/90">
                    Theme support
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-white/50">
                    perfect light and dark mode
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <!-- Template Marquee Section --> */}
        <Suspense
          fallback={
            <div className="h-64 w-full animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-900" />
          }
        >
          <TemplateMarquee />
        </Suspense>

        {/* <!-- FAQ Section --> */}
        <section id="faq" className="w-full bg-white px-4 py-24 sm:px-8 sm:py-32 dark:bg-[#161618]">
          <Faq
            variant="centered"
            faqs={[
              {
                id: "faq-free",
                question: "Is Hudbird UI free to use?",
                answer:
                  "Yes, the core UI components are completely free and open-source under the MIT license. You can use them in personal and commercial projects without any restrictions.",
              },
              {
                id: "faq-pro",
                question: "What is included in the Pro version?",
                answer:
                  "The Pro All-Access pass gives you premium Templates, complex Marketing Blocks (like complete Dashboards, Pricing Tables, and Analytics layouts), and priority support. It is designed to save you hundreds of hours.",
              },
              {
                id: "faq-updates",
                question: "Do I need to pay for updates?",
                answer:
                  "No! Once you purchase the Pro pass, you get lifetime access and updates. Whenever we release new templates or blocks, you will receive them for free.",
              },
              {
                id: "faq-frameworks",
                question: "What frameworks are supported?",
                answer:
                  "Hudbird UI is built specifically for React, Tailwind CSS v4, and Framer Motion. It works seamlessly with Next.js, Vite, Remix, and other modern React-based frameworks.",
              },
              {
                id: "faq-client-work",
                question: "Can I use the Pro templates for client work?",
                answer:
                  "Absolutely. You can use our templates and blocks to build unlimited projects for your clients. However, you cannot redistribute or resell the templates themselves as standalone products.",
              },
            ]}
          />
        </section>

        {/* <!-- CTA Section --> */}
        <section
          id="cta"
          className="grid grid-cols-1 border-t border-zinc-200/80 bg-white lg:grid-cols-2 dark:border-white/5 dark:bg-[#161618]"
        >
          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="font-mono text-xs font-bold tracking-[1.6px] text-indigo-600 uppercase dark:text-indigo-400">
                GET STARTED
              </span>
              <h2 className="font-outfit mt-4 text-3xl font-medium tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
                Start building with
                <br />
                <span className="text-indigo-600 dark:text-indigo-400">hudbird-ui</span> today.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-500 dark:text-[#E5E5E5]/70">
                The fastest way to ship production-ready React interfaces. Beautiful components,
                tactile physics, zero design debt.
              </p>
              <div className="mt-8">
                <a href="/#/installation">
                  <Button className="rounded-xl bg-[#4F46E5] px-6 py-2.5 text-sm font-medium text-white shadow-xs transition-all hover:bg-[#4338CA] active:scale-[0.98]">
                    <span className="relative z-10">Get started</span>
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
          {/* Right: Terminal Demo */}
          <div className="flex min-h-[500px] items-center justify-center bg-zinc-50/50 p-8 lg:p-12 dark:bg-[#1C1C1F]/60">
            <Suspense
              fallback={
                <div className="h-64 w-full animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-900" />
              }
            >
              <CtaTerminalDemo />
            </Suspense>
          </div>
        </section>
        <SiteFooter />
      </main>
    </>
  );
};
export default AiStartupTemplate;
