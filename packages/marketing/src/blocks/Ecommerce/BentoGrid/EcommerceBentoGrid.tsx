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
  BarChart,
  LayoutDashboard,
  ArrowRight,
  Star,
  Sparkles,
  Box,
  ChevronDown,
  Landmark,
  Package,
  DollarSign,
} from "lucide-react";

import { motion } from "framer-motion";
import { logos, MEGA_LINK_GROUPS, SOCIALS, FAQS } from "../components/EcommerceInternal";

export const EcommerceBentoGrid = () => (
  <>
    {/* <!-- Bento Grid: Problem -> Solution Visualization --> */}
    <div className="relative w-full overflow-hidden bg-white px-4 py-32 sm:px-8 dark:bg-[#070912]">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
        <div className="absolute top-[20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-[120px] dark:bg-indigo-600/10" />
        <div className="absolute right-[-10%] bottom-[20%] h-[500px] w-[500px] rounded-full bg-violet-500/5 blur-[120px] dark:bg-violet-600/10" />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl space-y-12">
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <span className="mb-6 block text-sm font-semibold tracking-wide text-indigo-600 uppercase dark:text-indigo-400">
            Smart Finance
          </span>
          <h2 className="mb-4 text-4xl leading-tight font-bold tracking-tight text-balance text-zinc-900 md:text-5xl dark:text-white">
            Put your money on autopilot
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-balance text-zinc-600 dark:text-zinc-400">
            StoreMetrics automatically organizes your spending, categorizes your expenses, and
            alerts you when a recurring bill is higher than usual.
          </p>
        </div>

        <BentoGrid className="gap-6 md:auto-rows-[26rem] md:grid-cols-2 xl:grid-cols-4">
          {/* Card 1: Predictive Modeling */}
          <BentoCard className="group flex flex-col justify-between overflow-hidden border border-zinc-200/50 bg-white/50 p-2 shadow-sm backdrop-blur-sm md:col-span-1 md:row-span-1 xl:col-span-1 xl:row-span-1 dark:border-zinc-800/50 dark:bg-zinc-900/50">
            <div className="relative flex min-h-[180px] w-full flex-1 flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border border-indigo-100/50 bg-indigo-50/50 dark:border-indigo-900/30 dark:bg-indigo-950/20">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-200/50 via-transparent to-transparent blur-3xl transition-opacity group-hover:opacity-70 dark:from-indigo-700/20" />
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
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/50">
                      <div className="h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                    </div>
                    <span className="truncate text-xs font-medium text-zinc-700 dark:text-zinc-200">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
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
                className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-violet-600 to-indigo-500 shadow-lg"
              >
                <Sparkles className="h-6 w-6 text-white" />
              </motion.div>
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4, delay: 0.5 }}
                className="absolute top-6 left-10 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200/50 bg-white/80 shadow-md backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80"
              >
                <BarChart className="h-5 w-5 text-violet-500" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 5, delay: 1 }}
                className="absolute right-10 bottom-8 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200/50 bg-white/80 shadow-md backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80"
              >
                <BarChart3 className="h-5 w-5 text-indigo-500" />
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
                <span className="text-xs font-bold tracking-wider text-white">SKU</span>
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
                <Activity className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
              </motion.div>
            </div>
            <BentoCardContent className="h-auto shrink-0 px-5 pt-6 pb-5">
              <Text
                variant="strong"
                className="text-xl tracking-tight text-zinc-900 dark:text-white"
              >
                Inventory Velocity
              </Text>
              <Text
                variant="muted"
                className="mt-2 text-base leading-relaxed text-zinc-600 dark:text-zinc-400"
              >
                Predict stockouts before they happen. Track real-time inventory velocity across all
                SKUs.
              </Text>
            </BentoCardContent>
          </BentoCard>
          {/* Card 4: Collaboration */}
          <BentoCard className="group flex flex-col justify-between overflow-hidden border border-zinc-200/50 bg-white/50 p-2 shadow-sm backdrop-blur-sm md:col-span-1 md:row-span-1 xl:col-span-2 xl:row-span-1 dark:border-zinc-800/50 dark:bg-zinc-900/50">
            <div className="relative flex min-h-[180px] w-full flex-1 items-center justify-center overflow-hidden rounded-xl border border-indigo-100/50 bg-indigo-50/50 dark:border-indigo-900/30 dark:bg-indigo-950/20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-200/50 via-transparent to-transparent blur-2xl dark:from-indigo-700/20" />

              {/* Avatars and Comment Bubbles */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-indigo-100 shadow-md dark:border-zinc-900 dark:bg-indigo-900/50"
                style={{ top: "30%", left: "30%" }}
              >
                <Users className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </motion.div>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [0.8, 1, 1], opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 4, delay: 0.5 }}
                className="absolute z-20 rounded-t-xl rounded-br-xl border border-zinc-200/50 bg-white px-3 py-1.5 shadow-sm dark:border-zinc-700 dark:bg-zinc-800"
                style={{ top: "15%", left: "45%" }}
              >
                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  Net Margin
                </span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                className="absolute z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-indigo-100 shadow-md dark:border-zinc-900 dark:bg-indigo-900/50"
                style={{ bottom: "25%", right: "30%" }}
              >
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">24%</span>
              </motion.div>
            </div>
            <BentoCardContent className="h-auto shrink-0 px-5 pt-6 pb-5">
              <Text
                variant="strong"
                className="text-xl tracking-tight text-zinc-900 dark:text-white"
              >
                Profit Margins
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
            <div className="relative flex min-h-[180px] w-full flex-1 flex-col items-center justify-center gap-4 overflow-hidden rounded-xl border border-indigo-100/50 bg-indigo-50/50 px-6 dark:border-indigo-900/30 dark:bg-indigo-950/20">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-indigo-200/50 via-transparent to-transparent blur-3xl transition-opacity group-hover:opacity-70 dark:from-indigo-700/20" />

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
                <Sparkles className="h-5 w-5 shrink-0 text-indigo-500" />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 6, times: [0, 0.1, 0.8, 1] }}
                  className="flex-1 truncate text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Start saving 24%0 monthly for Bali trip...
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
                    className="w-full rounded-t-sm bg-indigo-500/80 dark:bg-indigo-400/80"
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
  </>
);
