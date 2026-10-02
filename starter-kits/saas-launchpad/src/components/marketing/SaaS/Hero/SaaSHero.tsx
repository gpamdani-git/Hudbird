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
} from "@/components/marketing";
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
} from "@/components/ui";
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

import { motion } from "framer-motion";
import { logos, MEGA_LINK_GROUPS, SOCIALS, FAQS } from "../components/SaaSInternal";

export const SaaSHero = () => (
  <>
    {/* <!-- Hero Section: Taskk Inspired Redesign --> */}
    <Hero
      size="full"
      className="relative overflow-hidden bg-white text-zinc-900 transition-colors duration-500 dark:bg-[#070912] dark:text-white"
    >
      {/* Deep background glow and rings */}
      <div className="pointer-events-none absolute inset-0 z-0 flex flex-col items-center justify-end overflow-hidden">
        {/* Base Glow */}
        <div className="absolute bottom-[-20%] left-1/2 h-[800px] w-[1000px] -translate-x-1/2 rounded-full bg-zinc-100/50 blur-[120px] dark:bg-blue-600/20" />

        {/* Concentric Rings */}
        <div className="absolute bottom-[-15%] left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full border border-zinc-200/50 dark:border-blue-500/20" />
        <div className="absolute bottom-[-30%] left-1/2 h-[1200px] w-[1200px] -translate-x-1/2 rounded-full border border-zinc-200/30 dark:border-blue-400/10" />
        <div className="absolute bottom-[-45%] left-1/2 h-[1700px] w-[1700px] -translate-x-1/2 rounded-full border border-zinc-200/20 dark:border-blue-400/5" />

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
            <br className="hidden md:block" /> One Place <span className="italic font-light text-zinc-500 dark:text-zinc-400">Efficiently</span>
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
              className="w-full flex-1 bg-transparent text-sm text-zinc-900 placeholder:text-zinc-500 dark:placeholder:text-zinc-400 outline-none dark:text-white"
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
                        className={`h-4 w-4 rounded-sm ${i === 1 ? "bg-zinc-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400" : "bg-zinc-100 text-zinc-400 dark:bg-white/5 dark:text-zinc-500"}`}
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
                      <span className="rounded bg-zinc-100 px-2 py-0.5 text-[10px] text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
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
                      <span className="rounded bg-zinc-100 px-2 py-0.5 text-[10px] text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
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
  </>
);
