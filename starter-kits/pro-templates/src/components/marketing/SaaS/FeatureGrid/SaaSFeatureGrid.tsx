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

export const SaaSFeatureGrid = () => (
  <>
    {/* <!-- Benefits Section: Outcome-driven (Replaces generic Feature Grid) --> */}
    <FeatureSection className="relative overflow-hidden border-b border-zinc-200/50 bg-zinc-50/50 py-24 dark:border-white/5 dark:bg-[#070912]">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
        <div className="h-[600px] w-[800px] rounded-full bg-zinc-100/50 blur-[120px] dark:bg-blue-600/10" />
      </div>

      <FeatureHeader className="relative z-10">
        <FeatureBadge className="mx-auto mb-6 inline-flex w-fit items-center gap-1.5 rounded-full border border-zinc-200/50 bg-zinc-100/50 px-3 py-1 text-sm font-medium tracking-wide text-blue-700 backdrop-blur-md dark:border-blue-800/30 dark:bg-blue-900/20 dark:text-blue-400">
          Why Taskk?
        </FeatureBadge>
        <FeatureTitle className="mb-4 text-4xl leading-tight font-bold tracking-tight text-balance text-zinc-900 md:text-5xl dark:text-white">
          Stop juggling apps. <br className="hidden sm:block" />
          Start{" "}
          <span className="font-light text-zinc-500 italic dark:text-zinc-400">
            getting work done.
          </span>
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
            className="group rounded-2xl border border-zinc-200/50 bg-white/60 p-8 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-500/5 dark:border-white/10 dark:bg-[#161822]/60"
          >
            <FeatureIcon className="relative mb-6 flex h-14 w-14 overflow-hidden rounded-xl bg-zinc-100/50 p-[1px] text-blue-600 ring-0 dark:bg-white/10 dark:text-blue-400">
              {/* Spinning Light Beam Loop */}
              <div className="pointer-events-none absolute inset-[-100%] z-0 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#818cf8_100%)] opacity-40 transition-opacity duration-500 group-hover:opacity-100 dark:bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#6366f1_100%)]" />

              {/* Radial Glow */}
              <div className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute top-1/2 left-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-100/50 blur-md dark:bg-blue-500/60" />
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
  </>
);
