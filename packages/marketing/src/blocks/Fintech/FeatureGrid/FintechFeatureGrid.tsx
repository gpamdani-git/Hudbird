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

export const FintechFeatureGrid = () => (
  <>
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
  </>
);
