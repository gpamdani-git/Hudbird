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
  BentoCardFooter,
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
} from "@hudbird/marketing";
import { Button, Text } from "@hudbird/ui";
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
  Sparkles,
} from "lucide-react";
import { TemplateThemeToggle } from "./TemplateThemeToggle";
import { motion } from "framer-motion";

// <!-- SaaS B2B Analytics Theme - Data & Assets -->
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
    title: "Product",
    links: [
      { label: "Data Warehouse", href: "#" },
      { label: "Real-time Analytics", href: "#" },
      { label: "Predictive Models", href: "#" },
      { label: "Custom Dashboards", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "Case Studies", href: "#" },
      { label: "Webinars", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact Sales", href: "#" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
];

const SOCIALS = [{ label: "Twitter", href: "#", icon: <TrendingUp className="h-5 w-5" /> }];

export const SaaSLaunchpad = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="flex min-h-screen w-full flex-col bg-white dark:bg-zinc-950">
      <TemplateThemeToggle />

      {/* <!-- Hero Section V1 - Full Centered - SaaS Analytics Theme --> */}
      <Hero size="full" className="relative overflow-hidden bg-white dark:bg-zinc-950">
        {/* Subtle background glow to enhance dark mode */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent dark:from-blue-900/20" />

        <HeroHeader
          className="relative z-50"
          logo={
            <div className="flex items-center gap-2">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-zinc-900 dark:text-white">InsightFlow</span>
            </div>
          }
          links={[
            { label: "Features", href: "#" },
            { label: "Customers", href: "#" },
            { label: "Pricing", href: "#" },
          ]}
          action={
            <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
              Request Demo
            </Button>
          }
        />
        <HeroBody align="center" className="relative z-10 mx-auto max-w-4xl pt-32 pb-24 lg:pt-40">
          <HeroBadge className="mx-auto inline-flex w-fit rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm text-blue-700 dark:border-blue-800/50 dark:bg-blue-900/30 dark:text-blue-300">
            New: AI-Powered Forecasting
          </HeroBadge>
          <HeroTitle className="text-5xl text-zinc-900 sm:text-7xl dark:text-white">
            Unlock the true power of your business data.
          </HeroTitle>
          <HeroDescription className="max-w-2xl text-lg text-zinc-600 sm:text-xl dark:text-zinc-400">
            Transform scattered datasets into actionable intelligence. InsightFlow helps B2B teams
            unify data, run complex queries in milliseconds, and build interactive dashboards
            instantly.
          </HeroDescription>
          <HeroActions className="mt-8 justify-center">
            <Button className="h-12 bg-blue-600 px-8 text-white hover:bg-blue-700">
              Start Free Trial
            </Button>
            <Button
              variant="outline"
              className="h-12 border-zinc-200 px-8 text-zinc-700 dark:border-zinc-800 dark:text-zinc-300"
            >
              View Product Tour
            </Button>
          </HeroActions>
        </HeroBody>
      </Hero>

      {/* <!-- Logo Cloud V1 - Marquee Grid --> */}
      <LogoCloud className="relative overflow-hidden border-y border-zinc-100 bg-zinc-50/50 py-20 dark:border-zinc-900/50 dark:bg-zinc-900/20">
        <LogoCloudTitle className="text-zinc-500 dark:text-zinc-400">
          Powering data-driven decisions at Fortune 500 companies
        </LogoCloudTitle>
        <LogoCloudTicker speed="normal" direction="left" className="mt-12">
          {logos.map((logo, index) => (
            <LogoCloudItem key={index} className="mx-8 w-32 shrink-0 lg:mx-12">
              <img
                src={logo.src}
                alt={logo.name}
                className="h-8 w-auto object-contain opacity-60 grayscale transition-opacity hover:opacity-100 dark:invert"
              />
            </LogoCloudItem>
          ))}
        </LogoCloudTicker>
      </LogoCloud>

      {/* <!-- Feature Section V1 - Feature Grid --> */}
      <FeatureSection className="bg-white py-24 dark:bg-zinc-950">
        <FeatureHeader>
          <FeatureBadge className="mx-auto inline-flex w-fit rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm text-blue-600 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400">
            Analytics Engine
          </FeatureBadge>
          <FeatureTitle className="text-4xl text-zinc-900 dark:text-white">
            Everything you need to scale your data operations
          </FeatureTitle>
          <FeatureDescription className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Eliminate data silos and empower every department with self-serve analytics,
            enterprise-grade security, and real-time synchronization.
          </FeatureDescription>
        </FeatureHeader>
        <FeatureGrid className="mt-16">
          <FeatureCard
            index={0}
            className="rounded-2xl border-transparent p-6 transition-colors hover:border-zinc-200 hover:bg-zinc-50 dark:hover:border-zinc-800 dark:hover:bg-zinc-900/30"
          >
            <FeatureIcon className="mb-6 bg-blue-100 text-blue-600 shadow-sm dark:bg-blue-900/30 dark:text-blue-400">
              <Database size={20} />
            </FeatureIcon>
            <FeatureCardTitle className="text-xl text-zinc-900 dark:text-white">
              Unified Data Warehouse
            </FeatureCardTitle>
            <FeatureCardDescription className="mt-2 leading-relaxed text-zinc-600 dark:text-zinc-400">
              Connect to 150+ data sources natively. Centralize your PostgreSQL, MongoDB, and Stripe
              data with zero configuration.
            </FeatureCardDescription>
          </FeatureCard>
          <FeatureCard
            index={1}
            className="rounded-2xl border-transparent p-6 transition-colors hover:border-zinc-200 hover:bg-zinc-50 dark:hover:border-zinc-800 dark:hover:bg-zinc-900/30"
          >
            <FeatureIcon className="mb-6 bg-blue-100 text-blue-600 shadow-sm dark:bg-blue-900/30 dark:text-blue-400">
              <Activity size={20} />
            </FeatureIcon>
            <FeatureCardTitle className="text-xl text-zinc-900 dark:text-white">
              Real-Time Processing
            </FeatureCardTitle>
            <FeatureCardDescription className="mt-2 leading-relaxed text-zinc-600 dark:text-zinc-400">
              Our streaming architecture ensures your dashboards reflect changes in milliseconds,
              not hours. Stay ahead of the curve.
            </FeatureCardDescription>
          </FeatureCard>
          <FeatureCard
            index={2}
            className="rounded-2xl border-transparent p-6 transition-colors hover:border-zinc-200 hover:bg-zinc-50 dark:hover:border-zinc-800 dark:hover:bg-zinc-900/30"
          >
            <FeatureIcon className="mb-6 bg-blue-100 text-blue-600 shadow-sm dark:bg-blue-900/30 dark:text-blue-400">
              <PieChart size={20} />
            </FeatureIcon>
            <FeatureCardTitle className="text-xl text-zinc-900 dark:text-white">
              Advanced Visualization
            </FeatureCardTitle>
            <FeatureCardDescription className="mt-2 leading-relaxed text-zinc-600 dark:text-zinc-400">
              Build stunning charts, heatmaps, and cohorts using our drag-and-drop report builder.
              No SQL required.
            </FeatureCardDescription>
          </FeatureCard>
          <FeatureCard
            index={3}
            className="rounded-2xl border-transparent p-6 transition-colors hover:border-zinc-200 hover:bg-zinc-50 dark:hover:border-zinc-800 dark:hover:bg-zinc-900/30"
          >
            <FeatureIcon className="mb-6 bg-blue-100 text-blue-600 shadow-sm dark:bg-blue-900/30 dark:text-blue-400">
              <Shield size={20} />
            </FeatureIcon>
            <FeatureCardTitle className="text-xl text-zinc-900 dark:text-white">
              Enterprise Governance
            </FeatureCardTitle>
            <FeatureCardDescription className="mt-2 leading-relaxed text-zinc-600 dark:text-zinc-400">
              SOC2 Type II certified. Control access with row-level security, granular RBAC
              policies, and comprehensive audit logs.
            </FeatureCardDescription>
          </FeatureCard>
          <FeatureCard
            index={4}
            className="rounded-2xl border-transparent p-6 transition-colors hover:border-zinc-200 hover:bg-zinc-50 dark:hover:border-zinc-800 dark:hover:bg-zinc-900/30"
          >
            <FeatureIcon className="mb-6 bg-blue-100 text-blue-600 shadow-sm dark:bg-blue-900/30 dark:text-blue-400">
              <Users size={20} />
            </FeatureIcon>
            <FeatureCardTitle className="text-xl text-zinc-900 dark:text-white">
              Collaborative Workspaces
            </FeatureCardTitle>
            <FeatureCardDescription className="mt-2 leading-relaxed text-zinc-600 dark:text-zinc-400">
              Share insights securely across teams. Annotate charts and trigger automated Slack
              alerts for KPI anomalies instantly.
            </FeatureCardDescription>
          </FeatureCard>
          <FeatureCard
            index={5}
            className="rounded-2xl border-transparent p-6 transition-colors hover:border-zinc-200 hover:bg-zinc-50 dark:hover:border-zinc-800 dark:hover:bg-zinc-900/30"
          >
            <FeatureIcon className="mb-6 bg-blue-100 text-blue-600 shadow-sm dark:bg-blue-900/30 dark:text-blue-400">
              <Target size={20} />
            </FeatureIcon>
            <FeatureCardTitle className="text-xl text-zinc-900 dark:text-white">
              Predictive Forecasting
            </FeatureCardTitle>
            <FeatureCardDescription className="mt-2 leading-relaxed text-zinc-600 dark:text-zinc-400">
              Leverage built-in machine learning models to accurately forecast revenue, customer
              churn, and user acquisition trends.
            </FeatureCardDescription>
          </FeatureCard>
        </FeatureGrid>
      </FeatureSection>

      {/* <!-- Bento Grid with Framer Motion UI Mockups --> */}
      <div className="relative w-full overflow-hidden border-t border-zinc-200/50 bg-zinc-50 px-4 py-24 sm:px-8 dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="mb-4 block text-sm font-semibold tracking-wide text-blue-600 uppercase dark:text-blue-400">
              AI Native Platform
            </span>
            <h2 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
              Uncover hidden revenue opportunities
            </h2>
            <p className="mt-6 text-xl leading-relaxed text-zinc-600 dark:text-zinc-400">
              Identify bottlenecks in your funnel and optimize your conversion rates with deep dive
              analytics powered by intelligent algorithms.
            </p>
          </div>

          <BentoGrid className="gap-6 md:auto-rows-[22rem] md:grid-cols-3">
            {/* Card 1: Predictive Modeling */}
            <BentoCard className="flex flex-col justify-between border border-zinc-200 bg-white p-2 shadow-sm md:col-span-2 md:row-span-2 xl:col-span-2 xl:row-span-2 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="relative flex min-h-[250px] w-full flex-1 flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border border-indigo-100/50 bg-indigo-50/50 dark:border-indigo-900/30 dark:bg-indigo-950/20">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-200/50 via-transparent to-transparent blur-2xl dark:from-indigo-700/20" />
                {[
                  { name: "Lead Scoring", score: "96%", delay: 0, width: "w-[85%]" },
                  { name: "Predictive", score: "82%", delay: 0.2, width: "w-[95%]" },
                  { name: "Conversion", score: "75%", delay: 0.4, width: "w-[75%]" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: [0, -4, 0], opacity: 1 }}
                    transition={{
                      y: { repeat: Infinity, duration: 4, delay: item.delay, ease: "easeInOut" },
                    }}
                    className={`relative z-10 flex h-10 items-center justify-between rounded-full border border-zinc-100 bg-white px-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 ${item.width} max-w-[240px]`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/50">
                        <div className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
                      </div>
                      <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                      {item.score}
                    </span>
                  </motion.div>
                ))}
              </div>
              <BentoCardContent className="h-auto shrink-0 px-4 pt-6 pb-4">
                <Text variant="strong" className="text-xl text-zinc-900 dark:text-white">
                  Predictive Modeling
                </Text>
                <Text
                  variant="muted"
                  className="mt-2 text-base leading-relaxed text-zinc-600 dark:text-zinc-400"
                >
                  Our proprietary models analyze thousands of behavioral signals for sales and
                  predict conversion likelihood.
                </Text>
              </BentoCardContent>
            </BentoCard>

            {/* Card 2: AI Marketing */}
            <BentoCard className="flex flex-col justify-between border border-zinc-200 bg-white p-2 shadow-sm md:col-span-1 md:row-span-1 xl:col-span-1 xl:row-span-1 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="relative flex min-h-[250px] w-full flex-1 items-center justify-center overflow-hidden rounded-xl border border-blue-100/50 bg-blue-50/50 dark:border-blue-900/30 dark:bg-blue-950/20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-200/50 via-transparent to-transparent blur-2xl dark:from-blue-700/20" />
                <div className="absolute h-40 w-40 rounded-full border border-blue-200 dark:border-blue-800/50" />
                <div className="absolute h-28 w-28 rounded-full border border-blue-300 dark:border-blue-700/50" />
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(59,130,246,0)",
                      "0 0 20px 4px rgba(59,130,246,0.3)",
                      "0 0 0 0 rgba(59,130,246,0)",
                    ],
                  }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-lg"
                >
                  <span className="text-sm font-bold tracking-wider text-white">AI</span>
                </motion.div>
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 4, delay: 0.5 }}
                  className="absolute top-6 left-12 flex h-8 w-8 items-center justify-center rounded-full border border-zinc-100 bg-white shadow-md dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <Globe className="h-4 w-4 text-blue-500" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 5, delay: 1 }}
                  className="absolute right-12 bottom-10 flex h-8 w-8 items-center justify-center rounded-full border border-zinc-100 bg-white shadow-md dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <BarChart3 className="h-4 w-4 text-indigo-500" />
                </motion.div>
              </div>
              <BentoCardContent className="h-auto shrink-0 px-4 pt-6 pb-4">
                <Text variant="strong" className="text-xl text-zinc-900 dark:text-white">
                  Automatic AI Insights
                </Text>
                <Text
                  variant="muted"
                  className="mt-2 text-base leading-relaxed text-zinc-600 dark:text-zinc-400"
                >
                  Sends predictive signals directly to your ad platforms instantly, optimizing your
                  ROAS autonomously.
                </Text>
              </BentoCardContent>
            </BentoCard>

            {/* Card 3: Analyzes All Data */}
            <BentoCard className="flex flex-col justify-between border border-zinc-200 bg-white p-2 shadow-sm md:col-span-1 md:row-span-1 xl:col-span-1 xl:row-span-1 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="relative flex min-h-[250px] w-full flex-1 items-center justify-center overflow-hidden rounded-xl border border-cyan-100/50 bg-cyan-50/50 dark:border-cyan-900/30 dark:bg-cyan-950/20">
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
                  className="absolute z-10 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 shadow-lg dark:bg-white"
                >
                  <span className="text-sm font-bold text-white dark:text-zinc-900">SYNC</span>
                </motion.div>
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 3, delay: 0.1 }}
                  className="absolute top-[20%] left-[25%] flex h-8 w-8 items-center justify-center rounded-full border border-zinc-100 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <Globe className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 4, delay: 0.5 }}
                  className="absolute top-[20%] right-[25%] flex h-8 w-8 items-center justify-center rounded-full border border-zinc-100 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <Database className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, delay: 0.8 }}
                  className="absolute bottom-[20%] left-[30%] flex h-8 w-8 items-center justify-center rounded-full border border-zinc-100 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <LayoutDashboard className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                </motion.div>
              </div>
              <BentoCardContent className="h-auto shrink-0 px-4 pt-6 pb-4">
                <Text variant="strong" className="text-xl text-zinc-900 dark:text-white">
                  Unified Telemetry
                </Text>
                <Text
                  variant="muted"
                  className="mt-2 text-base leading-relaxed text-zinc-600 dark:text-zinc-400"
                >
                  Combine product usage data with sales engagement metrics to score every lead
                  perfectly.
                </Text>
              </BentoCardContent>
            </BentoCard>
          </BentoGrid>
        </div>
      </div>

      {/* <!-- Pricing Section V1 - 3 Tiers with Toggle --> */}
      <PricingSection className="border-t border-zinc-200/50 bg-white py-24 dark:border-zinc-900 dark:bg-zinc-950">
        <PricingHeader>
          <PricingBadge className="border border-blue-100 bg-blue-50 text-blue-600 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400">
            Flexible Pricing
          </PricingBadge>
          <PricingTitle className="text-4xl text-zinc-900 dark:text-white">
            Predictable costs, unlimited scale
          </PricingTitle>
          <PricingDescription className="text-lg text-zinc-600 dark:text-zinc-400">
            Start for free, then scale up as your data volume grows. No hidden compute fees.
          </PricingDescription>
          <PricingToggle isAnnual={isAnnual} onChange={setIsAnnual} />
        </PricingHeader>
        <PricingGrid className="mt-16">
          <PricingTier
            index={0}
            className="border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
          >
            <PricingTierHeader>
              <PricingTierName className="text-zinc-900 dark:text-white">Starter</PricingTierName>
              <PricingTierDescription className="text-zinc-600 dark:text-zinc-400">
                Perfect for early-stage startups.
              </PricingTierDescription>
              <PricingTierPrice
                price={isAnnual ? "$0" : "$0"}
                period="/month"
                className="text-zinc-900 dark:text-white"
              />
            </PricingTierHeader>
            <Button
              variant="outline"
              className="mt-6 h-12 w-full border-zinc-300 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
            >
              Get Started
            </Button>
            <PricingTierFeatures className="mt-8">
              <PricingTierFeature className="text-zinc-600 dark:text-zinc-400">
                Up to 1M events/month
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
            className="relative transform border-blue-200 bg-blue-50/50 shadow-xl md:-translate-y-4 dark:border-blue-900 dark:bg-blue-900/20"
          >
            <PricingTierHeader>
              <PricingTierName popular className="text-blue-700 dark:text-blue-400">
                Growth
              </PricingTierName>
              <PricingTierDescription popular className="text-blue-600/80 dark:text-blue-400/80">
                For scaling businesses with complex data.
              </PricingTierDescription>
              <PricingTierPrice
                popular
                price={isAnnual ? "$390" : "$49"}
                period={isAnnual ? "/year" : "/month"}
                priceClassName="text-blue-900 dark:text-white"
                periodClassName="text-blue-600/70 dark:text-blue-400/70"
              />
            </PricingTierHeader>
            <Button className="mt-6 h-12 w-full bg-blue-600 text-white shadow-md shadow-blue-500/20 hover:bg-blue-700">
              Start 14-Day Trial
            </Button>
            <PricingTierFeatures popular className="mt-8">
              <PricingTierFeature popular className="text-zinc-700 dark:text-zinc-300">
                Up to 50M events/month
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
                Data export API
              </PricingTierFeature>
            </PricingTierFeatures>
          </PricingTier>
          <PricingTier
            index={2}
            className="border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
          >
            <PricingTierHeader>
              <PricingTierName className="text-zinc-900 dark:text-white">
                Enterprise
              </PricingTierName>
              <PricingTierDescription className="text-zinc-600 dark:text-zinc-400">
                Dedicated infrastructure and security.
              </PricingTierDescription>
              <PricingTierPrice
                price="Custom"
                period=""
                className="text-zinc-900 dark:text-white"
              />
            </PricingTierHeader>
            <Button
              variant="outline"
              className="mt-6 h-12 w-full border-zinc-300 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
            >
              Contact Sales
            </Button>
            <PricingTierFeatures className="mt-8">
              <PricingTierFeature className="text-zinc-600 dark:text-zinc-400">
                Unlimited events
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
                On-premise deployment option
              </PricingTierFeature>
            </PricingTierFeatures>
          </PricingTier>
        </PricingGrid>
      </PricingSection>

      {/* <!-- CTA V1 - Centered --> */}
      <div className="border-t border-zinc-100 bg-white px-4 py-24 sm:px-6 dark:border-zinc-900/50 dark:bg-zinc-950">
        <CtaCentered
          className="rounded-3xl bg-zinc-100 dark:border dark:border-zinc-800/50 dark:bg-zinc-900"
          badge={
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 backdrop-blur-sm dark:border-blue-800/50 dark:bg-blue-900/50 dark:text-blue-300">
              Stop guessing, start measuring
            </span>
          }
          title={
            <span className="text-4xl font-bold text-zinc-900 sm:text-5xl dark:text-white">
              Ready to transform your data strategy?
            </span>
          }
          description={
            <span className="text-zinc-600 dark:text-zinc-400">
              Join over 4,000 data-driven organizations that use InsightFlow to accelerate their
              growth and optimize their operations.
            </span>
          }
          primaryAction={{
            label: "Start Free Trial",
            onClick: () => {},
            className: "bg-blue-600 text-white hover:bg-blue-700 h-14 px-8 text-lg font-medium",
          }}
          secondaryAction={{
            label: "Talk to Sales",
            href: "#",
            className:
              "text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-800 h-14 px-8 text-lg font-medium ml-0 sm:ml-4 mt-4 sm:mt-0",
          }}
        />
      </div>

      {/* <!-- Footer V1 - Mega Footer --> */}
      <FooterMega
        className="border-t border-zinc-200 bg-zinc-50 pt-16 dark:border-zinc-900 dark:bg-zinc-950"
        logo={
          <div className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-bold text-zinc-900 dark:text-white">InsightFlow</span>
          </div>
        }
        brandName=""
        description="The modern analytics warehouse designed for B2B scale. Build, query, and visualize without limits."
        linkGroups={MEGA_LINK_GROUPS}
        socials={SOCIALS}
        copyright="&copy; 2026 InsightFlow Analytics. All rights reserved."
      />
    </div>
  );
};
