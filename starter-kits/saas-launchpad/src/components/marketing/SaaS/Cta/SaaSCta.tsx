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

export const SaaSCta = () => (
  <>
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
          <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-blue-400 to-blue-600 p-[1px] shadow-[0_0_60px_rgba(161,161,170,0.4)] dark:shadow-[0_0_80px_rgba(255,255,255,0.05)]">
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
            Ready to transform how your team <span className="italic font-light text-zinc-500 dark:text-zinc-400">works?</span>
          </h2>

          {/* Subtitle */}
          <p className="mb-10 text-lg text-balance text-zinc-600 dark:text-zinc-400">
            Join over 4,000 productive teams that use Taskk to accelerate their workflows and
            optimize their operations.
          </p>

          {/* Primary Button */}
          <button className="h-14 rounded-full bg-blue-600 px-8 text-lg font-medium text-white shadow-lg shadow-zinc-500/25 transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-zinc-500/40">
            Start 14-Day Free Trial
          </button>
        </div>
      </div>
    </section>
  </>
);
