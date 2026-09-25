import React, { useState } from "react";
import {
  Hero,
  HeroHeader,
  HeroBody,
  HeroBadge,
  HeroTitle,
  HeroDescription,
  HeroActions,
  LogoCloud,
  LogoCloudTitle,
  LogoCloudTicker,
  LogoCloudItem,
  FeatureSection,
  FeatureHeader,
  FeatureBadge,
  FeatureTitle,
  FeatureDescription,
  FeatureGrid,
  FeatureCard,
  FeatureIcon,
  FeatureCardTitle,
  FeatureCardDescription,
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
  CtaCentered,
  FooterMega,
  Faq,
  TestimonialsGlobe,
} from "@hudbird/marketing";
import {
  Button,
  Text,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@hudbird/ui";
import {
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
  Activity,
  Target,
  Shield,
  Database,
  Globe,
  LayoutDashboard,
  ArrowRight,
  Star,
  Sparkles,
  Box,
  ChevronDown,
} from "lucide-react";
import { TemplateThemeToggle } from "./TemplateThemeToggle";
import { motion } from "framer-motion";

const logos = [
  { name: "Acme Corp", src: "/assets/marketing-section/logo/react-dev-logo.png" },
  { name: "GlobalTech", src: "/assets/marketing-section/logo/openai-com-brandmark.svg" },
  { name: "DataFlow", src: "/assets/marketing-section/logo/npmjs-com-logo.png" },
  { name: "Nexus", src: "/assets/marketing-section/logo/ai-claude-net-logo.png" },
  { name: "Horizon", src: "/assets/marketing-section/logo/nike-com-brandmark.svg" },
  { name: "Vertex", src: "/assets/marketing-section/logo/react-dev-logo.png" },
  { name: "Stratos", src: "/assets/marketing-section/logo/openai-com-brandmark.svg" },
];

const MEGA_LINK_GROUPS = [
  {
    title: "Platform",
    links: [
      { label: "Kanban Boards", href: "#" },
      { label: "Timeline & Gantt", href: "#" },
      { label: "Automations", href: "#" },
      { label: "Team Chat", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "Templates", href: "#" },
      { label: "Help Center", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Taskk", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact Sales", href: "#" },
      { label: "Security & Privacy", href: "#" },
    ],
  },
];

const SOCIALS = [{ label: "Twitter", href: "#", icon: <TrendingUp className="h-5 w-5" /> }];

const FAQS = [
  {
    id: "1",
    question: "Do you integrate with our existing tools?",
    answer:
      "Yes. Taskk connects natively to Slack, GitHub, Figma, and Google Drive. We sync your data bidirectionally so your team can work where they're most comfortable.",
  },
  {
    id: "2",
    question: "How long does it take to get started?",
    answer:
      "Most teams are up and running within minutes. Import your existing projects from Jira, Asana, or Trello with one click, and let our AI map your workflows automatically.",
  },
  {
    id: "3",
    question: "Is there a limit on how many users we can invite?",
    answer:
      "No. Our Growth and Enterprise plans include unlimited guest and viewer seats. You only pay for active members who create or edit projects.",
  },
  {
    id: "4",
    question: "What happens if we exceed our storage limits?",
    answer:
      "We never throttle your access during a critical sprint. If you consistently exceed your tier's limits, our team will reach out to help you optimize or upgrade to a more suitable plan.",
  },
  {
    id: "5",
    question: "Do I need to be a certified project manager to use Taskk?",
    answer:
      "Not at all. Taskk's intuitive interface lets anyone build complex workflows. For advanced needs, our AI can generate templates and automations from a simple text prompt.",
  },
  {
    id: "6",
    question: "Is my data secure?",
    answer:
      "Absolutely. We are SOC 2 Type II certified, GDPR compliant, and offer SSO/SAML on our enterprise plans. We also provide strict Role-Based Access Controls.",
  },
];

export const SaaSLaunchpad = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="flex min-h-screen w-full flex-col bg-zinc-50 selection:bg-blue-500/30 dark:bg-zinc-950">
      <TemplateThemeToggle />

      {/* Floating Navbar */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.35, delay: 0.1 }}
        className="fixed inset-x-0 top-4 z-[100] mx-auto w-full max-w-4xl px-4 sm:top-6"
      >
        <Navbar
          styleVariant="floating-full"
          position="static"
          className="!mt-0 !max-w-3xl !border-zinc-200/80 !bg-white/80 !px-2 !shadow-2xl !backdrop-blur-2xl transition-colors duration-500 dark:!border-white/10 dark:!bg-[#12141d]/85 [&>div:first-child]:!h-[56px] [&>div:first-child]:!px-2"
        >
          <NavbarBrand>
            <div className="flex items-center gap-2 pl-2">
              <div className="flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Box className="h-5 w-5" fill="currentColor" />
              </div>
              <span className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
                Taskk
              </span>
            </div>
          </NavbarBrand>

          <NavbarContent justify="center" className="gap-6">
            <NavbarItem>Home</NavbarItem>
            <NavbarItem className="flex items-center gap-1">
              Products <ChevronDown className="h-3.5 w-3.5 opacity-70" />
            </NavbarItem>
            <NavbarItem className="flex items-center gap-1">
              Resources <ChevronDown className="h-3.5 w-3.5 opacity-70" />
            </NavbarItem>
            <NavbarItem>Pricing</NavbarItem>
          </NavbarContent>

          <NavbarContent justify="end">
            <button className="hidden rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 md:inline-flex dark:bg-[#1875ff] dark:hover:bg-blue-500">
              Sign up
            </button>
          </NavbarContent>

          <NavbarMenuToggle />

          <NavbarMenu
            variant="top"
            isContained={false}
            className="!bg-white/95 !backdrop-blur-3xl !backdrop-saturate-200 dark:!border-white/10 dark:!bg-[#070912]/95"
          >
            <NavbarMenuItem>Home</NavbarMenuItem>
            <NavbarMenuItem>Products</NavbarMenuItem>
            <NavbarMenuItem>Resources</NavbarMenuItem>
            <NavbarMenuItem>Pricing</NavbarMenuItem>
            <div className="mt-4 flex flex-col gap-2">
              <button className="rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-[#1875ff] dark:hover:bg-blue-500">
                Sign up
              </button>
            </div>
          </NavbarMenu>
        </Navbar>
      </motion.div>

      {/* <!-- Hero Section: Taskk Inspired Redesign --> */}
      <Hero
        size="full"
        className="relative overflow-hidden bg-white text-zinc-900 transition-colors duration-500 dark:bg-[#070912] dark:text-white"
      >
        {/* Deep background glow and rings */}
        <div className="pointer-events-none absolute inset-0 z-0 flex flex-col items-center justify-end overflow-hidden">
          {/* Base Glow */}
          <div className="absolute bottom-[-20%] left-1/2 h-[800px] w-[1000px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px] dark:bg-blue-600/20" />

          {/* Concentric Rings */}
          <div className="absolute bottom-[-15%] left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full border border-blue-500/10 dark:border-blue-500/20" />
          <div className="absolute bottom-[-30%] left-1/2 h-[1200px] w-[1200px] -translate-x-1/2 rounded-full border border-blue-500/5 dark:border-blue-400/10" />
          <div className="absolute bottom-[-45%] left-1/2 h-[1700px] w-[1700px] -translate-x-1/2 rounded-full border border-blue-500/5 dark:border-blue-400/5" />

          {/* Bottom horizon line blur */}
          <div className="absolute right-0 bottom-0 left-0 h-40 bg-gradient-to-t from-white to-transparent dark:from-[#070912]" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 pt-32 sm:pt-40 lg:pt-48">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HeroBadge className="mx-auto flex w-fit items-center gap-3 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-1.5 text-sm font-medium tracking-wide text-zinc-700 backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 dark:bg-blue-400"></span>
                We're hiring
              </span>
              <a
                href="#"
                className="flex items-center text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              >
                Join our remote team <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </a>
            </HeroBadge>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <HeroTitle className="mt-4 text-center text-5xl leading-tight font-semibold tracking-tight text-balance text-zinc-900 sm:text-6xl md:text-[4rem] dark:text-white">
              Manage All of Your Work In
              <br className="hidden md:block" /> One Place Efficiently
            </HeroTitle>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <HeroDescription className="mx-auto mt-6 max-w-xl text-center text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
              Manage your work, timelines and team mates all at once. Set and follow timelines,
              assign tasks and keep your projects in check.
            </HeroDescription>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex w-full justify-center"
          >
            <form className="flex w-full max-w-md items-center gap-2 rounded-full border border-zinc-200 bg-white p-1.5 pl-5 shadow-2xl backdrop-blur-md transition-all focus-within:border-zinc-300 dark:border-white/10 dark:bg-white/5 dark:focus-within:border-white/20 dark:focus-within:bg-white/10">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full flex-1 bg-transparent text-sm text-zinc-900 placeholder-zinc-400 outline-none dark:text-white dark:placeholder-zinc-500"
                required
              />
              <button
                type="button"
                className="shrink-0 rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                Get started
              </button>
            </form>
          </motion.div>
        </div>

        {/* Dashboard UI Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative z-20 mx-auto mt-20 w-full max-w-5xl px-4 pb-0"
        >
          <div className="overflow-hidden rounded-t-[2rem] border border-zinc-200 bg-white shadow-2xl transition-colors duration-500 dark:border-white/20 dark:bg-[#161822] dark:shadow-[0_-20px_60px_-15px_rgba(24,117,255,0.2)]">
            {/* Mockup Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-100 px-6 py-4 dark:border-white/5">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-zinc-900 dark:text-white">
                  <Box className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-semibold tracking-tight">Taskk</span>
                </div>
                <div className="hidden h-4 w-px bg-zinc-200 sm:block dark:bg-white/10" />
                <div className="hidden items-center gap-2 text-sm text-zinc-500 sm:flex dark:text-zinc-400">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Board</span>
                  <ChevronDown className="h-3 w-3" />
                  <span className="rounded bg-zinc-100 px-2 py-0.5 text-zinc-900 dark:bg-white/5 dark:text-white">
                    Overview
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  <div className="h-7 w-7 rounded-full border-2 border-white bg-orange-400 dark:border-[#161822]"></div>
                  <div className="h-7 w-7 rounded-full border-2 border-white bg-blue-400 dark:border-[#161822]"></div>
                  <div className="h-7 w-7 rounded-full border-2 border-white bg-pink-400 dark:border-[#161822]"></div>
                </div>
                <span className="hidden text-xs text-zinc-500 sm:inline-block dark:text-zinc-400">
                  7/12 Members
                </span>
              </div>
            </div>

            {/* Mockup Body Layout */}
            <div className="flex h-[400px]">
              {/* Sidebar */}
              <div className="hidden w-56 border-r border-zinc-100 p-4 md:block dark:border-white/5">
                <div className="mb-6 flex items-center gap-2 rounded-md bg-zinc-50 px-3 py-2 text-xs text-zinc-500 dark:bg-white/5">
                  <Star className="h-3 w-3" /> Search
                </div>
                <nav className="space-y-1">
                  {["Home", "Tasks", "Docs", "Schedule", "Chat", "Payments", "Customers"].map(
                    (item, i) => (
                      <div
                        key={item}
                        className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm ${i === 1 ? "bg-zinc-100 font-medium text-zinc-900 dark:bg-white/10 dark:text-white" : "text-zinc-500 dark:text-zinc-400"}`}
                      >
                        <div
                          className={`h-4 w-4 rounded-sm ${i === 1 ? "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400" : "bg-zinc-100 text-zinc-400 dark:bg-white/5 dark:text-zinc-500"}`}
                        ></div>
                        {item}
                      </div>
                    )
                  )}
                </nav>
              </div>

              {/* Main Kanban Content */}
              <div className="flex-1 p-4 sm:p-6">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                      Project UI/UX
                    </h3>
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                      <span className="text-zinc-900 dark:text-white">Board</span>
                      <span>List</span>
                      <span>Timeline</span>
                      <span className="hidden sm:inline">Due Tasks</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="hidden rounded-md border border-zinc-200 px-3 py-1.5 text-sm text-zinc-600 sm:block dark:border-white/10 dark:text-zinc-300">
                      Import
                    </button>
                    <button className="flex items-center gap-1.5 rounded-md bg-zinc-900 px-3 py-1.5 text-sm text-white dark:bg-white/10">
                      <Star className="h-3 w-3" /> New Board
                    </button>
                  </div>
                </div>

                {/* Columns */}
                <div className="flex gap-4 overflow-hidden">
                  {/* Column 1 */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-white">
                      <div className="h-2 w-2 rounded-full bg-blue-400"></div> To Do{" "}
                      <span className="ml-auto text-zinc-400 dark:text-zinc-500">3</span>
                    </div>
                    {/* Card */}
                    <div className="rounded-lg border border-zinc-200 bg-white p-3 shadow-sm sm:p-4 dark:border-white/5 dark:bg-[#1d202d]">
                      <div className="text-xs text-zinc-500">Client: Stelar</div>
                      <div className="mt-1 text-sm font-medium text-zinc-900 dark:text-white">
                        Change top CTA button text
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="rounded bg-blue-100 px-2 py-0.5 text-[10px] text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                          Priority
                        </span>
                        <div className="ml-auto h-4 w-4 rounded-full bg-orange-400 sm:h-5 sm:w-5"></div>
                      </div>
                    </div>
                    <div className="rounded-lg border border-zinc-200 bg-white p-3 shadow-sm sm:p-4 dark:border-white/5 dark:bg-[#1d202d]">
                      <div className="text-xs text-zinc-500">Client: Stelar</div>
                      <div className="mt-1 text-sm font-medium text-zinc-900 dark:text-white">
                        Redesign analytics dashboard
                      </div>
                    </div>
                  </div>

                  {/* Column 2 */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-white">
                      <div className="h-2 w-2 rounded-full bg-orange-400"></div> In Progress{" "}
                      <span className="ml-auto text-zinc-400 dark:text-zinc-500">2</span>
                    </div>
                    <div className="rounded-lg border border-zinc-200 bg-white p-3 shadow-sm sm:p-4 dark:border-white/5 dark:bg-[#1d202d]">
                      <div className="text-xs text-zinc-500">Client: Stelar</div>
                      <div className="mt-1 text-sm leading-tight font-medium text-zinc-900 dark:text-white">
                        Redesign news page
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="rounded bg-orange-100 px-2 py-0.5 text-[10px] text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
                          In Review
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Column 3 */}
                  <div className="hidden flex-1 space-y-3 lg:block">
                    <div className="flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-white">
                      <div className="h-2 w-2 rounded-full bg-purple-400"></div> In Review{" "}
                      <span className="ml-auto text-zinc-400 dark:text-zinc-500">1</span>
                    </div>
                    <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-white/5 dark:bg-[#1d202d]">
                      <div className="text-xs text-zinc-500">Client: Stelar</div>
                      <div className="mt-1 text-sm font-medium text-zinc-900 dark:text-white">
                        UI Animation for the onboarding...
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Hero>

      {/* <!-- Logo Cloud --> */}
      <LogoCloud className="relative overflow-hidden border-y border-zinc-200/50 bg-white py-16 dark:border-white/5 dark:bg-[#070912]">
        <LogoCloudTitle className="text-sm font-medium tracking-wide text-zinc-500 dark:text-zinc-400">
          POWERING REVENUE OPERATIONS AT
        </LogoCloudTitle>
        <LogoCloudTicker speed="normal" direction="left" className="mt-8">
          {logos.map((logo, index) => (
            <LogoCloudItem key={index} className="mx-8 w-32 shrink-0 lg:mx-12">
              <img
                src={logo.src}
                alt={logo.name}
                className="h-8 w-auto object-contain opacity-50 grayscale transition-all hover:opacity-100 hover:grayscale-0 dark:invert dark:hover:invert-0"
              />
            </LogoCloudItem>
          ))}
        </LogoCloudTicker>
      </LogoCloud>

      {/* <!-- Benefits Section: Outcome-driven (Replaces generic Feature Grid) --> */}
      <FeatureSection className="relative overflow-hidden border-b border-zinc-200/50 bg-zinc-50/50 py-24 dark:border-white/5 dark:bg-[#070912]">
        {/* Background Glow */}
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
          <div className="h-[600px] w-[800px] rounded-full bg-blue-500/5 blur-[120px] dark:bg-blue-600/10" />
        </div>

        <FeatureHeader className="relative z-10">
          <FeatureBadge className="mx-auto mb-6 inline-flex w-fit items-center gap-1.5 rounded-full border border-blue-200/50 bg-blue-50/50 px-3 py-1 text-sm font-medium tracking-wide text-blue-700 backdrop-blur-md dark:border-blue-800/30 dark:bg-blue-900/20 dark:text-blue-400">
            Why Taskk?
          </FeatureBadge>
          <FeatureTitle className="mb-4 text-4xl leading-tight font-bold tracking-tight text-balance text-zinc-900 md:text-5xl dark:text-white">
            Stop juggling apps. <br className="hidden sm:block" />
            Start getting work done.
          </FeatureTitle>
          <FeatureDescription className="mx-auto max-w-2xl text-lg text-balance text-zinc-600 dark:text-zinc-400">
            Your team shouldn't have to switch between chat, spreadsheets, and docs to understand
            project status.
          </FeatureDescription>
        </FeatureHeader>

        <FeatureGrid className="relative z-10 mt-20 px-4 sm:px-6 lg:px-8">
          {[
            {
              icon: Database,
              title: "Connect Your Tools",
              description:
                "Integrate Slack, Figma, and Google Drive in clicks. Eliminate silos and ensure every department stays aligned.",
            },
            {
              icon: Activity,
              title: "Real-Time Tracking",
              description:
                "Don't wait for weekly syncs. See project updates, time logged, and roadblocks the second they happen.",
            },
            {
              icon: PieChart,
              title: "Zero-Code Automations",
              description:
                "Build custom workflows in minutes using an intuitive drag-and-drop interface. No coding required.",
            },
            {
              icon: Target,
              title: "Resource Forecasting",
              description:
                "Leverage AI to predict bottlenecks, flag tasks at risk of delay, and optimize your team's workload automatically.",
            },
            {
              icon: Shield,
              title: "Enterprise Security",
              description:
                "Sleep well knowing your projects are secured with SOC 2 compliance, SSO, and granular Role-Based Access Controls.",
            },
            {
              icon: Users,
              title: "Collaborative Intelligence",
              description:
                "Annotate tasks, tag teammates, and trigger automated Slack alerts when priorities shift or deadlines approach.",
            },
          ].map((feature, idx) => (
            <FeatureCard
              key={idx}
              index={idx}
              className="group rounded-2xl border border-zinc-200/50 bg-white/60 p-8 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5 dark:border-white/10 dark:bg-[#161822]/60"
            >
              <FeatureIcon className="relative mb-6 flex h-14 w-14 overflow-hidden rounded-xl bg-zinc-200/50 p-[1px] text-blue-600 ring-0 dark:bg-white/10 dark:text-blue-400">
                {/* Spinning Light Beam Loop */}
                <div className="pointer-events-none absolute inset-[-100%] z-0 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#818cf8_100%)] opacity-40 transition-opacity duration-500 group-hover:opacity-100 dark:bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#6366f1_100%)]" />

                {/* Radial Glow */}
                <div className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute top-1/2 left-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/40 blur-md dark:bg-blue-500/60" />
                </div>

                {/* Inner Icon Container */}
                <div className="relative z-10 flex h-full w-full items-center justify-center rounded-[11px] bg-white transition-all duration-300 group-hover:scale-110 group-hover:text-blue-700 dark:bg-[#161822] dark:group-hover:text-blue-300">
                  <feature.icon size={26} strokeWidth={1.5} />
                </div>
              </FeatureIcon>
              <FeatureCardTitle className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                {feature.title}
              </FeatureCardTitle>
              <FeatureCardDescription className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-400">
                {feature.description}
              </FeatureCardDescription>
            </FeatureCard>
          ))}
        </FeatureGrid>
      </FeatureSection>

      {/* <!-- Bento Grid: Problem -> Solution Visualization --> */}
      <div className="relative w-full overflow-hidden bg-white px-4 py-32 sm:px-8 dark:bg-[#070912]">
        {/* Background Glow */}
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
          <div className="absolute top-[20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-[120px] dark:bg-blue-600/10" />
          <div className="absolute right-[-10%] bottom-[20%] h-[500px] w-[500px] rounded-full bg-violet-500/5 blur-[120px] dark:bg-violet-600/10" />
        </div>
        <div className="relative z-10 mx-auto max-w-6xl space-y-12">
          <div className="mx-auto mb-20 max-w-3xl text-center">
            <span className="mb-6 block text-sm font-semibold tracking-wide text-blue-600 uppercase dark:text-blue-400">
              Smart Automations
            </span>
            <h2 className="mb-4 text-4xl leading-tight font-bold tracking-tight text-balance text-zinc-900 md:text-5xl dark:text-white">
              Let AI handle the busywork
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-balance text-zinc-600 dark:text-zinc-400">
              Taskk automatically organizes your priorities, assigns routine tasks, and alerts you
              when a project is at risk of delay.
            </p>
          </div>

          <BentoGrid className="gap-6 md:auto-rows-[26rem] md:grid-cols-2 xl:grid-cols-4">
            {/* Card 1: Predictive Modeling */}
            <BentoCard className="group flex flex-col justify-between overflow-hidden border border-zinc-200/50 bg-white/50 p-2 shadow-sm backdrop-blur-sm md:col-span-1 md:row-span-1 xl:col-span-1 xl:row-span-1 dark:border-zinc-800/50 dark:bg-zinc-900/50">
              <div className="relative flex min-h-[180px] w-full flex-1 flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border border-blue-100/50 bg-blue-50/50 dark:border-blue-900/30 dark:bg-blue-950/20">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-200/50 via-transparent to-transparent blur-3xl transition-opacity group-hover:opacity-70 dark:from-blue-700/20" />
                {[
                  { name: "Project Health Score", score: "98%", delay: 0, width: "w-[95%]" },
                  { name: "Bottleneck Detected", score: "High", delay: 0.2, width: "w-[85%]" },
                  { name: "Automation Ready", score: "Yes", delay: 0.4, width: "w-[90%]" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: [0, -4, 0], opacity: 1 }}
                    transition={{
                      y: { repeat: Infinity, duration: 4, delay: item.delay, ease: "easeInOut" },
                    }}
                    className={`relative z-10 flex h-10 items-center justify-between rounded-full border border-zinc-200/50 bg-white/80 px-3 shadow-sm backdrop-blur-md dark:border-zinc-800/50 dark:bg-zinc-900/80 ${item.width} max-w-[300px]`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                        <div className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                      </div>
                      <span className="truncate text-xs font-medium text-zinc-700 dark:text-zinc-200">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                      {item.score}
                    </span>
                  </motion.div>
                ))}
              </div>
              <BentoCardContent className="h-auto shrink-0 px-6 pt-8 pb-6">
                <Text
                  variant="strong"
                  className="text-2xl tracking-tight text-zinc-900 dark:text-white"
                >
                  Predictive Delivery
                </Text>
                <Text
                  variant="muted"
                  className="mt-3 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400"
                >
                  Our proprietary models analyze your team's velocity to identify which projects
                  will be delivered on time, and which are at risk.
                </Text>
              </BentoCardContent>
            </BentoCard>

            {/* Card 2: AI Automation */}
            <BentoCard className="group flex flex-col justify-between overflow-hidden border border-zinc-200/50 bg-white/50 p-2 shadow-sm backdrop-blur-sm md:col-span-1 md:row-span-1 xl:col-span-2 xl:row-span-1 dark:border-zinc-800/50 dark:bg-zinc-900/50">
              <div className="relative flex min-h-[180px] w-full flex-1 items-center justify-center overflow-hidden rounded-xl border border-violet-100/50 bg-violet-50/50 dark:border-violet-900/30 dark:bg-violet-950/20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-200/50 via-transparent to-transparent blur-2xl dark:from-violet-700/20" />
                <div className="absolute h-40 w-40 rounded-full border border-violet-200 dark:border-violet-800/50" />
                <div className="absolute h-28 w-28 rounded-full border border-violet-300 dark:border-violet-700/50" />
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(139,92,246,0)",
                      "0 0 20px 4px rgba(139,92,246,0.3)",
                      "0 0 0 0 rgba(139,92,246,0)",
                    ],
                  }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-violet-600 to-blue-500 shadow-lg"
                >
                  <Sparkles className="h-6 w-6 text-white" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 4, delay: 0.5 }}
                  className="absolute top-6 left-10 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200/50 bg-white/80 shadow-md backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80"
                >
                  <Globe className="h-5 w-5 text-violet-500" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 5, delay: 1 }}
                  className="absolute right-10 bottom-8 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200/50 bg-white/80 shadow-md backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80"
                >
                  <BarChart3 className="h-5 w-5 text-blue-500" />
                </motion.div>
              </div>
              <BentoCardContent className="h-auto shrink-0 px-5 pt-6 pb-5">
                <Text
                  variant="strong"
                  className="text-xl tracking-tight text-zinc-900 dark:text-white"
                >
                  Automated Workflows
                </Text>
                <Text
                  variant="muted"
                  className="mt-2 text-base leading-relaxed text-zinc-600 dark:text-zinc-400"
                >
                  Send status updates directly to your Slack channels instantly, keeping
                  stakeholders in the loop autonomously.
                </Text>
              </BentoCardContent>
            </BentoCard>

            {/* Card 3: Unified Data */}
            <BentoCard className="group flex flex-col justify-between overflow-hidden border border-zinc-200/50 bg-white/50 p-2 shadow-sm backdrop-blur-sm md:col-span-1 md:row-span-1 xl:col-span-1 xl:row-span-1 dark:border-zinc-800/50 dark:bg-zinc-900/50">
              <div className="relative flex min-h-[180px] w-full flex-1 items-center justify-center overflow-hidden rounded-xl border border-cyan-100/50 bg-cyan-50/50 dark:border-cyan-900/30 dark:bg-cyan-950/20">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-cyan-200/50 via-transparent to-transparent blur-2xl dark:from-cyan-700/20" />
                <svg
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  viewBox="0 0 200 150"
                >
                  <path
                    d="M 100 75 L 60 40 M 100 75 L 140 40 M 100 75 L 70 110 M 100 75 L 130 110"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    className="text-cyan-300 dark:text-cyan-800"
                  />
                </svg>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="absolute z-10 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-600 shadow-lg"
                >
                  <span className="text-xs font-bold tracking-wider text-white">SYNC</span>
                </motion.div>
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 3, delay: 0.1 }}
                  className="absolute top-[20%] left-[20%] flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200/50 bg-white/80 shadow-sm backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80"
                >
                  <Database className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, delay: 0.8 }}
                  className="absolute right-[20%] bottom-[20%] flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200/50 bg-white/80 shadow-sm backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80"
                >
                  <LayoutDashboard className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                </motion.div>
              </div>
              <BentoCardContent className="h-auto shrink-0 px-5 pt-6 pb-5">
                <Text
                  variant="strong"
                  className="text-xl tracking-tight text-zinc-900 dark:text-white"
                >
                  Unified Telemetry
                </Text>
                <Text
                  variant="muted"
                  className="mt-2 text-base leading-relaxed text-zinc-600 dark:text-zinc-400"
                >
                  Combine product usage data with CRM sales engagement metrics to score every lead
                  perfectly.
                </Text>
              </BentoCardContent>
            </BentoCard>
            {/* Card 4: Collaboration */}
            <BentoCard className="group flex flex-col justify-between overflow-hidden border border-zinc-200/50 bg-white/50 p-2 shadow-sm backdrop-blur-sm md:col-span-1 md:row-span-1 xl:col-span-2 xl:row-span-1 dark:border-zinc-800/50 dark:bg-zinc-900/50">
              <div className="relative flex min-h-[180px] w-full flex-1 items-center justify-center overflow-hidden rounded-xl border border-emerald-100/50 bg-emerald-50/50 dark:border-emerald-900/30 dark:bg-emerald-950/20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-200/50 via-transparent to-transparent blur-2xl dark:from-emerald-700/20" />

                {/* Avatars and Comment Bubbles */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-emerald-100 shadow-md dark:border-zinc-900 dark:bg-emerald-900/50"
                  style={{ top: "30%", left: "30%" }}
                >
                  <Users className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </motion.div>

                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: [0.8, 1, 1], opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 4, delay: 0.5 }}
                  className="absolute z-20 rounded-t-xl rounded-br-xl border border-zinc-200/50 bg-white px-3 py-1.5 shadow-sm dark:border-zinc-700 dark:bg-zinc-800"
                  style={{ top: "15%", left: "45%" }}
                >
                  <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    Why the drop?
                  </span>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                  className="absolute z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-blue-100 shadow-md dark:border-zinc-900 dark:bg-blue-900/50"
                  style={{ bottom: "25%", right: "30%" }}
                >
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">JD</span>
                </motion.div>
              </div>
              <BentoCardContent className="h-auto shrink-0 px-5 pt-6 pb-5">
                <Text
                  variant="strong"
                  className="text-xl tracking-tight text-zinc-900 dark:text-white"
                >
                  In-Context Chat
                </Text>
                <Text
                  variant="muted"
                  className="mt-2 text-base leading-relaxed text-zinc-600 dark:text-zinc-400"
                >
                  Tag your team directly on charts and dashboards to resolve anomalies faster than
                  ever.
                </Text>
              </BentoCardContent>
            </BentoCard>

            {/* Card 5: Natural Language AI */}
            <BentoCard className="group flex flex-col justify-between overflow-hidden border border-zinc-200/50 bg-white/50 p-2 shadow-sm backdrop-blur-sm md:col-span-2 md:row-span-1 xl:col-span-2 xl:row-span-1 dark:border-white/10 dark:bg-[#161822]/60">
              <div className="relative flex min-h-[180px] w-full flex-1 flex-col items-center justify-center gap-4 overflow-hidden rounded-xl border border-blue-100/50 bg-blue-50/50 px-6 dark:border-blue-900/30 dark:bg-blue-950/20">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-200/50 via-transparent to-transparent blur-3xl transition-opacity group-hover:opacity-70 dark:from-blue-700/20" />

                {/* Search Bar Mockup */}
                <motion.div
                  initial={{ width: "60%" }}
                  animate={{ width: "90%" }}
                  transition={{
                    repeat: Infinity,
                    duration: 6,
                    ease: "easeInOut",
                    repeatType: "reverse",
                  }}
                  className="relative z-10 flex h-12 items-center gap-3 overflow-hidden rounded-full border border-zinc-200/50 bg-white/90 px-4 shadow-sm backdrop-blur-md dark:border-zinc-700/50 dark:bg-zinc-900/90"
                >
                  <Sparkles className="h-5 w-5 shrink-0 text-blue-500" />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 6, times: [0, 0.1, 0.8, 1] }}
                    className="flex-1 truncate text-sm font-medium text-zinc-700 dark:text-zinc-300"
                  >
                    Show me Q3 revenue by marketing channel...
                  </motion.div>
                </motion.div>

                {/* Graph Mockup */}
                <div className="relative z-10 mt-2 flex h-24 w-[90%] items-end justify-between gap-2 border-b border-zinc-200/50 px-4 pb-2 dark:border-zinc-800/50">
                  {[40, 70, 45, 90, 65, 80].map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{
                        repeat: Infinity,
                        duration: 6,
                        delay: i * 0.1,
                        repeatType: "reverse",
                      }}
                      className="w-full rounded-t-sm bg-blue-500/80 dark:bg-blue-400/80"
                    />
                  ))}
                </div>
              </div>
              <BentoCardContent className="h-auto shrink-0 px-6 pt-6 pb-5">
                <Text
                  variant="strong"
                  className="text-xl tracking-tight text-zinc-900 dark:text-white"
                >
                  Natural Language Task Creation
                </Text>
                <Text
                  variant="muted"
                  className="mt-2 text-base leading-relaxed text-zinc-600 dark:text-zinc-400"
                >
                  Don't want to fill out forms? Just type in plain English and let our AI generate
                  the exact task, assignees, and subtasks instantly.
                </Text>
              </BentoCardContent>
            </BentoCard>
          </BentoGrid>
        </div>
      </div>

      {/* <!-- Pricing Section: Risk Reversal + Strong Offer --> */}
      <PricingSection className="relative overflow-hidden border-t border-zinc-200/50 bg-zinc-50/50 py-24 dark:border-white/5 dark:bg-[#070912]">
        {/* Background Glow */}
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
          <div className="absolute top-[-20%] left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-blue-500/5 blur-[120px] dark:bg-blue-600/10" />
        </div>

        <PricingHeader className="relative z-10 flex flex-col items-center text-center">
          <PricingBadge className="mb-6 inline-flex w-fit items-center gap-1.5 rounded-full border border-blue-200/50 bg-blue-50/50 px-3 py-1 text-sm font-medium tracking-wide text-blue-700 backdrop-blur-sm dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400">
            Simple Pricing
          </PricingBadge>
          <PricingTitle className="mb-4 text-4xl leading-tight font-bold tracking-tight text-balance text-zinc-900 md:text-5xl dark:text-white">
            Predictable costs, unlimited scale
          </PricingTitle>
          <PricingDescription className="mx-auto max-w-2xl text-lg text-balance text-zinc-600 dark:text-zinc-400">
            Start free for 14 days. Cancel anytime. No hidden compute fees or per-query penalties.
          </PricingDescription>
          <PricingToggle isAnnual={isAnnual} onChange={setIsAnnual} className="mt-8" />
        </PricingHeader>

        <PricingGrid className="relative z-10 mt-16 px-4 sm:px-6 lg:px-8">
          <PricingTier
            index={0}
            className="border-zinc-200/50 bg-white/60 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-[#161822]/60"
          >
            <PricingTierHeader>
              <PricingTierName className="text-zinc-900 dark:text-white">Starter</PricingTierName>
              <PricingTierDescription className="text-zinc-600 dark:text-zinc-400">
                Perfect for early-stage startups testing the waters.
              </PricingTierDescription>
              <PricingTierPrice
                price={isAnnual ? "$0" : "$0"}
                period="/month"
                className="text-zinc-900 dark:text-white"
              />
            </PricingTierHeader>
            <Button
              variant="outline"
              className="mt-8 h-12 w-full border-zinc-300 font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Start for free
            </Button>
            <PricingTierFeatures className="mt-10">
              <PricingTierFeature className="text-zinc-600 dark:text-zinc-400">
                Up to 10 Active Projects
              </PricingTierFeature>
              <PricingTierFeature className="text-zinc-600 dark:text-zinc-400">
                3 team members
              </PricingTierFeature>
              <PricingTierFeature className="text-zinc-600 dark:text-zinc-400">
                Standard integrations
              </PricingTierFeature>
              <PricingTierFeature className="text-zinc-600 dark:text-zinc-400">
                Community support
              </PricingTierFeature>
            </PricingTierFeatures>
          </PricingTier>

          <PricingTier
            index={1}
            popular
            className="relative transform border-blue-200 bg-white shadow-xl ring-2 shadow-blue-500/10 ring-blue-500 md:-translate-y-4 dark:border-blue-500/30 dark:bg-[#161822] dark:shadow-blue-500/20"
          >
            {/* Glowing background effect for Popular Tier */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/50 via-transparent to-transparent opacity-50 dark:from-blue-900/20" />

            <PricingTierHeader className="relative z-10">
              <PricingTierName popular className="text-blue-600 dark:text-blue-400">
                Growth
              </PricingTierName>
              <PricingTierDescription popular className="text-zinc-600 dark:text-zinc-400">
                For scaling businesses with complex data needs.
              </PricingTierDescription>
              <PricingTierPrice
                popular
                price={isAnnual ? "$39" : "$49"}
                period={isAnnual ? "/mo, billed annually" : "/mo"}
                priceClassName="text-zinc-900 dark:text-white"
                periodClassName="text-zinc-500 dark:text-zinc-500"
              />
            </PricingTierHeader>
            <Button className="relative z-10 mt-8 h-12 w-full bg-blue-600 font-medium text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-700">
              Start 14-Day Free Trial
            </Button>
            <p className="relative z-10 mt-3 text-center text-xs text-zinc-500 dark:text-zinc-400">
              No credit card required. Cancel anytime.
            </p>
            <PricingTierFeatures popular className="relative z-10 mt-8">
              <PricingTierFeature popular className="text-zinc-700 dark:text-zinc-300">
                Unlimited Active Projects
              </PricingTierFeature>
              <PricingTierFeature popular className="text-zinc-700 dark:text-zinc-300">
                Unlimited team members
              </PricingTierFeature>
              <PricingTierFeature popular className="text-zinc-700 dark:text-zinc-300">
                Advanced predictive models
              </PricingTierFeature>
              <PricingTierFeature popular className="text-zinc-700 dark:text-zinc-300">
                Priority email support
              </PricingTierFeature>
              <PricingTierFeature popular className="text-zinc-700 dark:text-zinc-300">
                Workflow Automations API
              </PricingTierFeature>
            </PricingTierFeatures>
          </PricingTier>

          <PricingTier
            index={2}
            className="border-zinc-200/50 bg-white/60 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-[#161822]/60"
          >
            <PricingTierHeader>
              <PricingTierName className="text-zinc-900 dark:text-white">
                Enterprise
              </PricingTierName>
              <PricingTierDescription className="text-zinc-600 dark:text-zinc-400">
                Dedicated infrastructure and premium security.
              </PricingTierDescription>
              <PricingTierPrice
                price="Custom"
                period=""
                className="text-zinc-900 dark:text-white"
              />
            </PricingTierHeader>
            <Button
              variant="outline"
              className="mt-8 h-12 w-full border-zinc-300 font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Contact Sales
            </Button>
            <PricingTierFeatures className="mt-10">
              <PricingTierFeature className="text-zinc-600 dark:text-zinc-400">
                Dedicated Cloud Architecture
              </PricingTierFeature>
              <PricingTierFeature className="text-zinc-600 dark:text-zinc-400">
                Single Sign-On (SAML/SSO)
              </PricingTierFeature>
              <PricingTierFeature className="text-zinc-600 dark:text-zinc-400">
                Dedicated Customer Success
              </PricingTierFeature>
              <PricingTierFeature className="text-zinc-600 dark:text-zinc-400">
                Custom data retention
              </PricingTierFeature>
              <PricingTierFeature className="text-zinc-600 dark:text-zinc-400">
                On-premise deployment
              </PricingTierFeature>
            </PricingTierFeatures>
          </PricingTier>
        </PricingGrid>
      </PricingSection>

      {/* <!-- Objection Handling: FAQ Section --> */}
      <section className="relative overflow-hidden border-t border-zinc-200/50 bg-white px-4 py-24 sm:px-8 dark:border-white/5 dark:bg-[#070912]">
        {/* Background Glow */}
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
          <div className="h-[400px] w-[600px] rounded-full bg-blue-500/5 blur-[120px] dark:bg-blue-600/5" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl">
          <Faq faqs={FAQS} variant="centered" />
        </div>
      </section>

      {/* <!-- Social Proof: Testimonials with Globe --> */}
      <TestimonialsGlobe />

      {/* <!-- Final CTA: Custom Design --> */}
      <section className="relative overflow-hidden bg-white px-4 py-32 sm:px-6 dark:bg-[#070912]">
        <div className="relative mx-auto max-w-5xl">
          {/* Graphic: Horizon Line & Centered Icon */}
          <div className="relative mt-12 mb-8 flex w-full items-center justify-center">
            {/* Subtle curved string/horizon line */}
            <div className="pointer-events-none absolute top-1/2 right-0 left-0 flex -translate-y-1/2 justify-center">
              <svg
                width="100%"
                height="60"
                viewBox="0 0 1000 60"
                preserveAspectRatio="none"
                className="w-[120%] max-w-5xl -translate-x-[10%] opacity-20 dark:opacity-30"
              >
                <path
                  d="M0,0 Q500,60 1000,0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-zinc-400 dark:text-zinc-600"
                />
              </svg>
              {/* Decorative Dots */}
              <div className="absolute top-[30px] left-[20%] h-1.5 w-1.5 rounded-full bg-zinc-400 blur-[1px] dark:bg-zinc-500" />
              <div className="absolute top-[30px] right-[20%] h-1.5 w-1.5 rounded-full bg-zinc-400 blur-[1px] dark:bg-zinc-500" />
            </div>

            {/* Glowing App Icon Center */}
            <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-blue-400 to-blue-600 p-[1px] shadow-[0_0_60px_rgba(59,130,246,0.4)] dark:shadow-[0_0_80px_rgba(59,130,246,0.3)]">
              <div className="flex h-full w-full items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-blue-500 to-blue-600">
                <Box className="h-10 w-10 text-white" />
              </div>
              {/* Inner glow highlight */}
              <div className="absolute inset-0 rounded-[1.5rem] border border-white/30 mix-blend-overlay" />
            </div>
          </div>

          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            {/* Pill Badge directly under icon */}
            <div className="mb-8 inline-flex items-center rounded-full border border-zinc-200 bg-zinc-100/50 px-4 py-1.5 text-xs font-semibold tracking-wide text-zinc-800 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
              Stop procrastinating, start executing
            </div>

            {/* Title */}
            <h2 className="mb-6 text-5xl leading-tight font-bold tracking-tight text-balance text-zinc-900 sm:text-6xl dark:text-white">
              Ready to transform how your team works?
            </h2>

            {/* Subtitle */}
            <p className="mb-10 text-lg text-balance text-zinc-600 dark:text-zinc-400">
              Join over 4,000 productive teams that use Taskk to accelerate their workflows and
              optimize their operations.
            </p>

            {/* Primary Button */}
            <button className="h-14 rounded-full bg-blue-600 px-8 text-lg font-medium text-white shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-blue-500/40">
              Start 14-Day Free Trial
            </button>
          </div>
        </div>
      </section>

      {/* <!-- Footer --> */}
      <FooterMega
        className="border-t border-zinc-200 bg-zinc-50 pt-16 dark:border-white/5 dark:bg-[#070912]"
        logo={
          <div className="flex items-center gap-2 pl-2">
            <div className="flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Box className="h-5 w-5" fill="currentColor" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
              Taskk
            </span>
          </div>
        }
        brandName=""
        description="The modern project management platform designed for scale. Plan, track, and collaborate without limits."
        linkGroups={MEGA_LINK_GROUPS}
        socials={SOCIALS}
        copyright="&copy; 2026 Taskk Inc. All rights reserved."
      />
    </div>
  );
};
