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

import { motion } from "framer-motion";
import { logos, MEGA_LINK_GROUPS, SOCIALS, FAQS } from "../components/FintechInternal";

export const FintechHero = () => (
  <>
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
            Manage your work, timelines and team mates all at once. Set and follow timelines, assign
            tasks and keep your projects in check.
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
  </>
);
