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
  ShieldCheck,
  Database,
  Globe,
  LayoutDashboard,
  ArrowRight,
  Star,
  Sparkles,
  Box,
  ChevronDown,
  Landmark,
  CreditCard,
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
    title: "Accounts",
    links: [
      { label: "Checking", href: "#" },
      { label: "Savings", href: "#" },
      { label: "Multi-Currency", href: "#" },
      { label: "Joint Accounts", href: "#" },
    ],
  },
  {
    title: "Features",
    links: [
      { label: "Global Transfers", href: "#" },
      { label: "Virtual Cards", href: "#" },
      { label: "Crypto Trading", href: "#" },
      { label: "Analytics", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Security", href: "#" },
      { label: "Legal", href: "#" },
    ],
  },
];

const SOCIALS = [{ label: "Twitter", href: "#", icon: <TrendingUp className="h-5 w-5" /> }];

const FAQS = [
  {
    id: "1",
    question: "Is my money safe with VaultX?",
    answer:
      "Absolutely. We are fully regulated and your deposits are insured up to $250,000 by our partner banks. We also use 256-bit encryption and advanced fraud monitoring.",
  },
  {
    id: "2",
    question: "Are there any hidden fees?",
    answer:
      "No. We believe in complete transparency. We don't charge account maintenance fees, minimum balance fees, or foreign transaction fees.",
  },
  {
    id: "3",
    question: "How long do international transfers take?",
    answer:
      "Most international transfers are completed instantly or within a few minutes. Rarely, depending on the recipient bank, it may take up to 24 hours.",
  },
  {
    id: "4",
    question: "Can I use VaultX for my business?",
    answer:
      "Yes! We offer VaultX Business, designed specifically for freelancers, startups, and growing enterprises with advanced expense tracking and invoice generation.",
  },
  {
    id: "5",
    question: "How do I add money to my account?",
    answer:
      "You can link your external bank account, set up direct deposit, or instantly top up using Apple Pay, Google Pay, or a debit card.",
  },
  {
    id: "6",
    question: "What currencies do you support?",
    answer:
      "We currently support over 30 global currencies including USD, EUR, GBP, JPY, and AUD. You can hold and convert them directly in the app at the real exchange rate.",
  },
];

export const FintechTemplate = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="flex min-h-screen w-full flex-col bg-zinc-50 selection:bg-emerald-500/30 dark:bg-zinc-950">
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
              <div className="flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Box className="h-5 w-5" fill="currentColor" />
              </div>
              <span className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
                VaultX
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
            <button className="hidden rounded-full bg-emerald-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700 md:inline-flex dark:bg-emerald-600 dark:hover:bg-emerald-500">
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
              <button className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500">
                Sign up
              </button>
            </div>
          </NavbarMenu>
        </Navbar>
      </motion.div>

      {/* <!-- Hero Section: VaultX Inspired Redesign --> */}
      <Hero
        size="full"
        className="relative overflow-hidden bg-white text-zinc-900 transition-colors duration-500 dark:bg-[#070912] dark:text-white"
      >
        {/* Deep background glow and rings */}
        <div className="pointer-events-none absolute inset-0 z-0 flex flex-col items-center justify-end overflow-hidden">
          {/* Base Glow */}
          <div className="absolute bottom-[-20%] left-1/2 h-[800px] w-[1000px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px] dark:bg-emerald-600/20" />

          {/* Concentric Rings */}
          <div className="absolute bottom-[-15%] left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full border border-emerald-500/10 dark:border-emerald-500/20" />
          <div className="absolute bottom-[-30%] left-1/2 h-[1200px] w-[1200px] -translate-x-1/2 rounded-full border border-emerald-500/5 dark:border-emerald-400/10" />
          <div className="absolute bottom-[-45%] left-1/2 h-[1700px] w-[1700px] -translate-x-1/2 rounded-full border border-emerald-500/5 dark:border-emerald-400/5" />

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
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400"></span>
                Rated #1 Finance App
              </span>
              <a
                href="#"
                className="flex items-center text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              >
                Join 2M+ users worldwide <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </a>
            </HeroBadge>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <HeroTitle className="mt-4 text-center text-5xl leading-tight font-semibold tracking-tight text-balance text-zinc-900 sm:text-6xl md:text-[4rem] dark:text-white">
              Global Transfers Without
              <br className="hidden md:block" /> The Hidden Fees
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
                  <Box className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <span className="font-semibold tracking-tight">VaultX</span>
                </div>
                <div className="hidden h-4 w-px bg-zinc-200 sm:block dark:bg-white/10" />
                <div className="hidden items-center gap-2 text-sm text-zinc-500 sm:flex dark:text-zinc-400">
                  <Activity className="h-4 w-4" />
                  <span>Wallet</span>
                  <ChevronDown className="h-3 w-3" />
                  <span className="rounded bg-zinc-100 px-2 py-0.5 text-zinc-900 dark:bg-white/5 dark:text-white">
                    Personal
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="hidden text-xs text-zinc-500 sm:inline-block dark:text-zinc-400">
                  Total Balance
                </span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  $12,450.00
                </span>
                <div className="h-8 w-8 rounded-full border-2 border-white bg-emerald-400 dark:border-[#161822]"></div>
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
                  {["Overview", "Cards", "Transfers", "Analytics", "Crypto", "Settings"].map(
                    (item, i) => (
                      <div
                        key={item}
                        className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm ${i === 0 ? "bg-zinc-100 font-medium text-zinc-900 dark:bg-white/10 dark:text-white" : "text-zinc-500 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-white/5"}`}
                      >
                        <div
                          className={`h-4 w-4 rounded-sm ${i === 0 ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400" : "bg-zinc-100 text-zinc-400 dark:bg-white/5 dark:text-zinc-500"}`}
                        ></div>
                        {item}
                      </div>
                    )
                  )}
                </nav>
              </div>

              {/* Main Banking Content */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                      Good morning, Alex
                    </h3>
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                      <span className="text-zinc-900 dark:text-white">USD Wallet</span>
                      <span>EUR Wallet</span>
                      <span>Crypto</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-1.5 rounded-md bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800 dark:bg-white/10 dark:hover:bg-white/20">
                      <ArrowRight className="h-3 w-3" /> Send Money
                    </button>
                  </div>
                </div>

                {/* Dashboard Cards */}
                <div className="flex flex-col gap-4 lg:flex-row">
                  {/* Balance Card */}
                  <div className="flex-1 rounded-xl border border-zinc-200 bg-gradient-to-br from-emerald-500 to-teal-700 p-5 text-white shadow-sm dark:border-white/5 dark:from-emerald-900/50 dark:to-teal-900/50">
                    <div className="text-sm font-medium text-emerald-50 dark:text-emerald-200">
                      Total Balance
                    </div>
                    <div className="mt-2 text-3xl font-bold tracking-tight">$12,450.00</div>
                    <div className="mt-4 flex items-center gap-2 text-xs text-emerald-100">
                      <TrendingUp className="h-3 w-3" /> +$450.00 (3.2%) this week
                    </div>
                  </div>

                  {/* Recent Transactions */}
                  <div className="flex-[2] rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-white/5 dark:bg-[#1d202d]">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="font-medium text-zinc-900 dark:text-white">
                        Recent Transactions
                      </div>
                      <div className="text-xs text-emerald-600 dark:text-emerald-400">View All</div>
                    </div>
                    <div className="space-y-4">
                      {[
                        {
                          name: "Apple Store",
                          category: "Electronics",
                          amount: "-$199.00",
                          icon: LayoutDashboard,
                        },
                        {
                          name: "Upwork Transfer",
                          category: "Income",
                          amount: "+$1,250.00",
                          icon: Target,
                          isPositive: true,
                        },
                        {
                          name: "Starbucks",
                          category: "Food & Drink",
                          amount: "-$5.40",
                          icon: PieChart,
                        },
                      ].map((tx, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 dark:bg-white/5 dark:text-zinc-400">
                              <tx.icon className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-zinc-900 dark:text-white">
                                {tx.name}
                              </div>
                              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                {tx.category}
                              </div>
                            </div>
                          </div>
                          <div
                            className={`text-sm font-semibold ${tx.isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-900 dark:text-white"}`}
                          >
                            {tx.amount}
                          </div>
                        </div>
                      ))}
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
          <div className="h-[600px] w-[800px] rounded-full bg-emerald-500/5 blur-[120px] dark:bg-emerald-600/10" />
        </div>

        <FeatureHeader className="relative z-10">
          <FeatureBadge className="mx-auto mb-6 inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-200/50 bg-emerald-50/50 px-3 py-1 text-sm font-medium tracking-wide text-emerald-700 backdrop-blur-md dark:border-emerald-800/30 dark:bg-emerald-900/20 dark:text-emerald-400">
            Why VaultX?
          </FeatureBadge>
          <FeatureTitle className="mb-4 text-4xl leading-tight font-bold tracking-tight text-balance text-zinc-900 md:text-5xl dark:text-white">
            Stop paying hidden bank fees. <br className="hidden sm:block" />
            Start growing your wealth.
          </FeatureTitle>
          <FeatureDescription className="mx-auto max-w-2xl text-lg text-balance text-zinc-600 dark:text-zinc-400">
            VaultX gives you full control over your money. Send globally, save automatically, and
            track every cent without the traditional banking BS.
          </FeatureDescription>
        </FeatureHeader>

        <FeatureGrid className="relative z-10 mt-20 px-4 sm:px-6 lg:px-8">
          {[
            {
              icon: Landmark,
              title: "Multi-Currency Accounts",
              description:
                "Hold, exchange, and send up to 30+ currencies in real-time with zero hidden fees and bank-beating exchange rates.",
            },
            {
              icon: Activity,
              title: "Real-Time Tracking",
              description:
                "Don't wait for days to see your balance update. Get instant notifications for every transaction you make.",
            },
            {
              icon: CreditCard,
              title: "Virtual Cards Instantly",
              description:
                "Generate virtual cards for secure online shopping and subscriptions. Freeze or delete them with one tap.",
            },
            {
              icon: Target,
              title: "Smart Budgeting",
              description:
                "Set monthly budgets for groceries, entertainment, and more. VaultX warns you before you overspend.",
            },
            {
              icon: ShieldCheck,
              title: "Bank-Grade Security",
              description:
                "Your money is protected by 256-bit encryption, biometric authentication, and strict regulatory compliance.",
            },
            {
              icon: Users,
              title: "Split Bills Easily",
              description:
                "Instantly split dinner or rent with friends. Send requests and get paid back without any awkward conversations.",
            },
          ].map((feature, idx) => (
            <FeatureCard
              key={idx}
              index={idx}
              className="group rounded-2xl border border-zinc-200/50 bg-white/60 p-8 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/5 dark:border-white/10 dark:bg-[#161822]/60"
            >
              <FeatureIcon className="relative mb-6 flex h-14 w-14 overflow-hidden rounded-xl bg-zinc-200/50 p-[1px] text-emerald-600 ring-0 dark:bg-white/10 dark:text-emerald-400">
                {/* Spinning Light Beam Loop */}
                <div className="pointer-events-none absolute inset-[-100%] z-0 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#34d399_100%)] opacity-40 transition-opacity duration-500 group-hover:opacity-100 dark:bg-[conic-gradient(from_90deg_at_50%_50%,#10b981_100%)]" />

                {/* Radial Glow */}
                <div className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute top-1/2 left-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/40 blur-md dark:bg-emerald-500/60" />
                </div>

                {/* Inner Icon Container */}
                <div className="relative z-10 flex h-full w-full items-center justify-center rounded-[11px] bg-white transition-all duration-300 group-hover:scale-110 group-hover:text-emerald-700 dark:bg-[#161822] dark:group-hover:text-emerald-300">
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
          <div className="absolute top-[20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-[120px] dark:bg-emerald-600/10" />
          <div className="absolute right-[-10%] bottom-[20%] h-[500px] w-[500px] rounded-full bg-violet-500/5 blur-[120px] dark:bg-violet-600/10" />
        </div>
        <div className="relative z-10 mx-auto max-w-6xl space-y-12">
          <div className="mx-auto mb-20 max-w-3xl text-center">
            <span className="mb-6 block text-sm font-semibold tracking-wide text-emerald-600 uppercase dark:text-emerald-400">
              Smart Finance
            </span>
            <h2 className="mb-4 text-4xl leading-tight font-bold tracking-tight text-balance text-zinc-900 md:text-5xl dark:text-white">
              Put your money on autopilot
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-balance text-zinc-600 dark:text-zinc-400">
              VaultX automatically organizes your spending, categorizes your expenses, and alerts
              you when a recurring bill is higher than usual.
            </p>
          </div>

          <BentoGrid className="gap-6 md:auto-rows-[26rem] md:grid-cols-2 xl:grid-cols-4">
            {/* Card 1: Predictive Modeling */}
            <BentoCard className="group flex flex-col justify-between overflow-hidden border border-zinc-200/50 bg-white/50 p-2 shadow-sm backdrop-blur-sm md:col-span-1 md:row-span-1 xl:col-span-1 xl:row-span-1 dark:border-zinc-800/50 dark:bg-zinc-900/50">
              <div className="relative flex min-h-[180px] w-full flex-1 flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border border-emerald-100/50 bg-emerald-50/50 dark:border-emerald-900/30 dark:bg-emerald-950/20">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-200/50 via-transparent to-transparent blur-3xl transition-opacity group-hover:opacity-70 dark:from-emerald-700/20" />
                {[
                  { name: "Monthly Savings", score: "$450", delay: 0, width: "w-[95%]" },
                  { name: "Subscription Alert", score: "Netflix", delay: 0.2, width: "w-[85%]" },
                  { name: "Budget Status", score: "On Track", delay: 0.4, width: "w-[90%]" },
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
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50">
                        <div className="h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                      </div>
                      <span className="truncate text-xs font-medium text-zinc-700 dark:text-zinc-200">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
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
                  AI Spending Insights
                </Text>
                <Text
                  variant="muted"
                  className="mt-3 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400"
                >
                  Our smart algorithms analyze your habits to identify where you can save more and
                  automatically cancel unused subscriptions.
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
                  className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-violet-600 to-emerald-500 shadow-lg"
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
                  <BarChart3 className="h-5 w-5 text-emerald-500" />
                </motion.div>
              </div>
              <BentoCardContent className="h-auto shrink-0 px-5 pt-6 pb-5">
                <Text
                  variant="strong"
                  className="text-xl tracking-tight text-zinc-900 dark:text-white"
                >
                  Instant Transfers
                </Text>
                <Text
                  variant="muted"
                  className="mt-2 text-base leading-relaxed text-zinc-600 dark:text-zinc-400"
                >
                  Send money globally within seconds without hidden banking fees or outrageous
                  exchange markups.
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
                  <span className="text-xs font-bold tracking-wider text-white">USD</span>
                </motion.div>
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 3, delay: 0.1 }}
                  className="absolute top-[20%] left-[20%] flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200/50 bg-white/80 shadow-sm backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80"
                >
                  <Landmark className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, delay: 0.8 }}
                  className="absolute right-[20%] bottom-[20%] flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200/50 bg-white/80 shadow-sm backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80"
                >
                  <CreditCard className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                </motion.div>
              </div>
              <BentoCardContent className="h-auto shrink-0 px-5 pt-6 pb-5">
                <Text
                  variant="strong"
                  className="text-xl tracking-tight text-zinc-900 dark:text-white"
                >
                  Multi-Currency
                </Text>
                <Text
                  variant="muted"
                  className="mt-2 text-base leading-relaxed text-zinc-600 dark:text-zinc-400"
                >
                  Hold and manage up to 30 currencies at once. Perfect for digital nomads and global
                  businesses.
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
                    Split dinner?
                  </span>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                  className="absolute z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-emerald-100 shadow-md dark:border-zinc-900 dark:bg-emerald-900/50"
                  style={{ bottom: "25%", right: "30%" }}
                >
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    $50
                  </span>
                </motion.div>
              </div>
              <BentoCardContent className="h-auto shrink-0 px-5 pt-6 pb-5">
                <Text
                  variant="strong"
                  className="text-xl tracking-tight text-zinc-900 dark:text-white"
                >
                  Split Bills Instantly
                </Text>
                <Text
                  variant="muted"
                  className="mt-2 text-base leading-relaxed text-zinc-600 dark:text-zinc-400"
                >
                  Request money or split the dinner tab with a single tap. No more awkward
                  conversations.
                </Text>
              </BentoCardContent>
            </BentoCard>

            {/* Card 5: Natural Language AI */}
            <BentoCard className="group flex flex-col justify-between overflow-hidden border border-zinc-200/50 bg-white/50 p-2 shadow-sm backdrop-blur-sm md:col-span-2 md:row-span-1 xl:col-span-2 xl:row-span-1 dark:border-white/10 dark:bg-[#161822]/60">
              <div className="relative flex min-h-[180px] w-full flex-1 flex-col items-center justify-center gap-4 overflow-hidden rounded-xl border border-emerald-100/50 bg-emerald-50/50 px-6 dark:border-emerald-900/30 dark:bg-emerald-950/20">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-emerald-200/50 via-transparent to-transparent blur-3xl transition-opacity group-hover:opacity-70 dark:from-emerald-700/20" />

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
                  <Sparkles className="h-5 w-5 shrink-0 text-emerald-500" />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 6, times: [0, 0.1, 0.8, 1] }}
                    className="flex-1 truncate text-sm font-medium text-zinc-700 dark:text-zinc-300"
                  >
                    Start saving $500 monthly for Bali trip...
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
                      className="w-full rounded-t-sm bg-emerald-500/80 dark:bg-emerald-400/80"
                    />
                  ))}
                </div>
              </div>
              <BentoCardContent className="h-auto shrink-0 px-6 pt-6 pb-5">
                <Text
                  variant="strong"
                  className="text-xl tracking-tight text-zinc-900 dark:text-white"
                >
                  Smart Goal Saving
                </Text>
                <Text
                  variant="muted"
                  className="mt-2 text-base leading-relaxed text-zinc-600 dark:text-zinc-400"
                >
                  Tell our AI what you are saving for, and it will automatically round up your
                  purchases and transfer the spare change to your goals.
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
          <div className="absolute top-[-20%] left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-emerald-500/5 blur-[120px] dark:bg-emerald-600/10" />
        </div>

        <PricingHeader className="relative z-10 flex flex-col items-center text-center">
          <PricingBadge className="mb-6 inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-200/50 bg-emerald-50/50 px-3 py-1 text-sm font-medium tracking-wide text-emerald-700 backdrop-blur-sm dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
            Simple Pricing
          </PricingBadge>
          <PricingTitle className="mb-4 text-4xl leading-tight font-bold tracking-tight text-balance text-zinc-900 md:text-5xl dark:text-white">
            Simple pricing, no hidden fees
          </PricingTitle>
          <PricingDescription className="mx-auto max-w-2xl text-lg text-balance text-zinc-600 dark:text-zinc-400">
            Get started in minutes. VaultX Personal is always free. Upgrade for premium business
            tools.
          </PricingDescription>
          <PricingToggle
            isAnnual={isAnnual}
            onChange={setIsAnnual}
            className="mt-8"
            toggleActiveClassName="bg-emerald-600"
            discountClassName="bg-emerald-50 text-emerald-700 ring-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400"
          />
        </PricingHeader>

        <PricingGrid className="relative z-10 mt-16 px-4 sm:px-6 lg:px-8">
          <PricingTier
            index={0}
            className="border-zinc-200/50 bg-white/60 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-[#161822]/60"
          >
            <PricingTierHeader>
              <PricingTierName className="text-zinc-900 dark:text-white">Personal</PricingTierName>
              <PricingTierDescription className="text-zinc-600 dark:text-zinc-400">
                Perfect for everyday spending and global transfers.
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
              <PricingTierFeature
                checkClassName="text-emerald-600 dark:text-emerald-400"
                className="text-zinc-600 dark:text-zinc-400"
              >
                Free USD & EUR accounts
              </PricingTierFeature>
              <PricingTierFeature
                checkClassName="text-emerald-600 dark:text-emerald-400"
                className="text-zinc-600 dark:text-zinc-400"
              >
                Instant global transfers
              </PricingTierFeature>
              <PricingTierFeature
                checkClassName="text-emerald-600 dark:text-emerald-400"
                className="text-zinc-600 dark:text-zinc-400"
              >
                1 physical debit card
              </PricingTierFeature>
              <PricingTierFeature
                checkClassName="text-emerald-600 dark:text-emerald-400"
                className="text-zinc-600 dark:text-zinc-400"
              >
                24/7 Chat support
              </PricingTierFeature>
            </PricingTierFeatures>
          </PricingTier>

          <PricingTier
            index={1}
            popular
            popularBadgeClassName="bg-emerald-600 text-white ring-emerald-500/20"
            className="relative transform border-emerald-200 bg-white shadow-xl ring-2 shadow-emerald-500/10 ring-emerald-500 md:-translate-y-4 dark:border-emerald-500/30 dark:bg-[#161822] dark:shadow-emerald-500/20"
          >
            {/* Glowing background effect for Popular Tier */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-100/50 via-transparent to-transparent opacity-50 dark:from-emerald-900/20" />

            <PricingTierHeader className="relative z-10">
              <PricingTierName popular className="text-emerald-600 dark:text-emerald-400">
                Plus
              </PricingTierName>
              <PricingTierDescription popular className="text-zinc-600 dark:text-zinc-400">
                For digital nomads and frequent travelers.
              </PricingTierDescription>
              <PricingTierPrice
                popular
                price={isAnnual ? "$9" : "$12"}
                period={isAnnual ? "/mo, billed annually" : "/mo"}
                priceClassName="text-zinc-900 dark:text-white"
                periodClassName="text-zinc-500 dark:text-zinc-500"
              />
            </PricingTierHeader>
            <Button className="relative z-10 mt-8 h-12 w-full bg-emerald-600 font-medium text-white shadow-md shadow-emerald-500/20 transition-all hover:bg-emerald-700">
              Get Plus
            </Button>
            <p className="relative z-10 mt-3 text-center text-xs text-zinc-500 dark:text-zinc-400">
              No credit card required. Cancel anytime.
            </p>
            <PricingTierFeatures popular className="relative z-10 mt-8">
              <PricingTierFeature
                popular
                checkClassName="text-emerald-400"
                className="text-zinc-700 dark:text-zinc-300"
              >
                Up to 30 currencies
              </PricingTierFeature>
              <PricingTierFeature
                popular
                checkClassName="text-emerald-400"
                className="text-zinc-700 dark:text-zinc-300"
              >
                0% foreign transaction fee
              </PricingTierFeature>
              <PricingTierFeature
                popular
                checkClassName="text-emerald-400"
                className="text-zinc-700 dark:text-zinc-300"
              >
                3 virtual cards
              </PricingTierFeature>
              <PricingTierFeature
                popular
                checkClassName="text-emerald-400"
                className="text-zinc-700 dark:text-zinc-300"
              >
                Priority support
              </PricingTierFeature>
              <PricingTierFeature
                popular
                checkClassName="text-emerald-400"
                className="text-zinc-700 dark:text-zinc-300"
              >
                Travel insurance included
              </PricingTierFeature>
            </PricingTierFeatures>
          </PricingTier>

          <PricingTier
            index={2}
            className="border-zinc-200/50 bg-white/60 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-[#161822]/60"
          >
            <PricingTierHeader>
              <PricingTierName className="text-zinc-900 dark:text-white">Business</PricingTierName>
              <PricingTierDescription className="text-zinc-600 dark:text-zinc-400">
                For freelancers, startups, and growing companies.
              </PricingTierDescription>
              <PricingTierPrice
                price="$49"
                period="/mo"
                className="text-zinc-900 dark:text-white"
              />
            </PricingTierHeader>
            <Button
              variant="outline"
              className="mt-8 h-12 w-full border-zinc-300 font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Open Business Account
            </Button>
            <PricingTierFeatures className="mt-10">
              <PricingTierFeature
                checkClassName="text-emerald-600 dark:text-emerald-400"
                className="text-zinc-600 dark:text-zinc-400"
              >
                Free team cards
              </PricingTierFeature>
              <PricingTierFeature
                checkClassName="text-emerald-600 dark:text-emerald-400"
                className="text-zinc-600 dark:text-zinc-400"
              >
                Bulk payroll transfers
              </PricingTierFeature>
              <PricingTierFeature
                checkClassName="text-emerald-600 dark:text-emerald-400"
                className="text-zinc-600 dark:text-zinc-400"
              >
                API access
              </PricingTierFeature>
              <PricingTierFeature
                checkClassName="text-emerald-600 dark:text-emerald-400"
                className="text-zinc-600 dark:text-zinc-400"
              >
                Accounting integrations
              </PricingTierFeature>
              <PricingTierFeature
                checkClassName="text-emerald-600 dark:text-emerald-400"
                className="text-zinc-600 dark:text-zinc-400"
              >
                Dedicated account manager
              </PricingTierFeature>
            </PricingTierFeatures>
          </PricingTier>
        </PricingGrid>
      </PricingSection>

      {/* <!-- Objection Handling: FAQ Section --> */}
      <section className="relative overflow-hidden border-t border-zinc-200/50 bg-white px-4 py-24 sm:px-8 dark:border-white/5 dark:bg-[#070912]">
        {/* Background Glow */}
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
          <div className="h-[400px] w-[600px] rounded-full bg-emerald-500/5 blur-[120px] dark:bg-emerald-600/5" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl">
          <Faq
            faqs={FAQS}
            variant="centered"
            badgeClassName="border-emerald-200/50 bg-emerald-50/50 text-emerald-700 dark:border-emerald-800/30 dark:bg-emerald-900/20 dark:text-emerald-400"
            accentClassName="text-emerald-600 dark:text-emerald-400"
          />
        </div>
      </section>

      {/* <!-- Social Proof: Testimonials with Globe --> */}
      <TestimonialsGlobe
        glowClassName="bg-emerald-500/10 dark:bg-emerald-500/20"
        iconClassName="bg-emerald-600/10 text-emerald-600 ring-emerald-600/20 dark:bg-emerald-500/20 dark:text-emerald-300 dark:ring-emerald-500/30"
      />

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
            <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-emerald-400 to-emerald-600 p-[1px] shadow-[0_0_60px_rgba(16,185,129,0.4)] dark:shadow-[0_0_80px_rgba(16,185,129,0.3)]">
              <div className="flex h-full w-full items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-emerald-500 to-emerald-600">
                <Box className="h-10 w-10 text-white" />
              </div>
              {/* Inner glow highlight */}
              <div className="absolute inset-0 rounded-[1.5rem] border border-white/30 mix-blend-overlay" />
            </div>
          </div>

          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            {/* Pill Badge directly under icon */}
            <div className="mb-8 inline-flex items-center rounded-full border border-zinc-200 bg-zinc-100/50 px-4 py-1.5 text-xs font-semibold tracking-wide text-zinc-800 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
              Stop paying hidden fees, start saving
            </div>

            {/* Title */}
            <h2 className="mb-6 text-5xl leading-tight font-bold tracking-tight text-balance text-zinc-900 sm:text-6xl dark:text-white">
              Ready to take control of your finances?
            </h2>

            {/* Subtitle */}
            <p className="mb-10 text-lg text-balance text-zinc-600 dark:text-zinc-400">
              Join over 100,000 global citizens who use VaultX to spend, send, and save smarter.
            </p>

            {/* Primary Button */}
            <button className="h-14 rounded-full bg-emerald-600 px-8 text-lg font-medium text-white shadow-lg shadow-emerald-500/25 transition-all hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-emerald-500/40">
              Open a Free Account
            </button>
          </div>
        </div>
      </section>

      {/* <!-- Footer --> */}
      <FooterMega
        className="border-t border-zinc-200 bg-zinc-50 pt-16 dark:border-white/5 dark:bg-[#070912]"
        logo={
          <div className="flex items-center gap-2 pl-2">
            <div className="flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Box className="h-5 w-5" fill="currentColor" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
              VaultX
            </span>
          </div>
        }
        brandName=""
        description="The modern global financial platform designed for scale. Send, spend, and save money without limits."
        linkGroups={MEGA_LINK_GROUPS}
        socials={SOCIALS}
        copyright="&copy; 2026 VaultX Inc. All rights reserved."
      />
    </div>
  );
};
