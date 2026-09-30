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

export const EcommercePricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  return (
    <>
      {/* <!-- Pricing Section: Risk Reversal + Strong Offer --> */}
      <PricingSection className="relative overflow-hidden border-t border-zinc-200/50 bg-zinc-50/50 py-24 dark:border-white/5 dark:bg-[#070912]">
        {/* Background Glow */}
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
          <div className="absolute top-[-20%] left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-500/5 blur-[120px] dark:bg-indigo-600/10" />
        </div>

        <PricingHeader className="relative z-10 flex flex-col items-center text-center">
          <PricingBadge className="mb-6 inline-flex w-fit items-center gap-1.5 rounded-full border border-indigo-200/50 bg-indigo-50/50 px-3 py-1 text-sm font-medium tracking-wide text-indigo-700 backdrop-blur-sm dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400">
            ROI-Driven Pricing
          </PricingBadge>
          <PricingTitle className="mb-4 text-4xl leading-tight font-bold tracking-tight text-balance text-zinc-900 md:text-5xl dark:text-white">
            Pay for the value we uncover
          </PricingTitle>
          <PricingDescription className="mx-auto max-w-2xl text-lg text-balance text-zinc-600 dark:text-zinc-400">
            Get started in minutes. StoreMetrics Starter is always free. Upgrade for premium
            business tools.
          </PricingDescription>
          <PricingToggle
            isAnnual={isAnnual}
            onChange={setIsAnnual}
            className="mt-8"
            toggleActiveClassName="bg-indigo-600"
            discountClassName="bg-indigo-50 text-indigo-700 ring-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400"
          />
        </PricingHeader>

        <PricingGrid className="relative z-10 mt-16 px-4 sm:px-6 lg:px-8">
          <PricingTier
            index={0}
            className="border-zinc-200/50 bg-white/60 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-[#161822]/60"
          >
            <PricingTierHeader>
              <PricingTierName className="text-zinc-900 dark:text-white">Starter</PricingTierName>
              <PricingTierDescription className="text-zinc-600 dark:text-zinc-400">
                Perfect for everyday spending and global transfers.
              </PricingTierDescription>
              <PricingTierPrice
                price={isAnnual ? "$19" : "$19"}
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
                checkClassName="text-indigo-600 dark:text-indigo-400"
                className="text-zinc-600 dark:text-zinc-400"
              >
                Free SKU & EUR accounts
              </PricingTierFeature>
              <PricingTierFeature
                checkClassName="text-indigo-600 dark:text-indigo-400"
                className="text-zinc-600 dark:text-zinc-400"
              >
                Basic sales dashboard
              </PricingTierFeature>
              <PricingTierFeature
                checkClassName="text-indigo-600 dark:text-indigo-400"
                className="text-zinc-600 dark:text-zinc-400"
              >
                Daily data sync
              </PricingTierFeature>
              <PricingTierFeature
                checkClassName="text-indigo-600 dark:text-indigo-400"
                className="text-zinc-600 dark:text-zinc-400"
              >
                Community support
              </PricingTierFeature>
            </PricingTierFeatures>
          </PricingTier>

          <PricingTier
            index={1}
            popular
            popularBadgeClassName="bg-indigo-600 text-white ring-indigo-500/20"
            className="relative transform border-indigo-200 bg-white shadow-xl ring-2 shadow-indigo-500/10 ring-indigo-500 md:-translate-y-4 dark:border-indigo-500/30 dark:bg-[#161822] dark:shadow-indigo-500/20"
          >
            {/* Glowing background effect for Popular Tier */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100/50 via-transparent to-transparent opacity-50 dark:from-indigo-900/20" />

            <PricingTierHeader className="relative z-10">
              <PricingTierName popular className="text-indigo-600 dark:text-indigo-400">
                Growth
              </PricingTierName>
              <PricingTierDescription popular className="text-zinc-600 dark:text-zinc-400">
                For digital nomads and frequent travelers.
              </PricingTierDescription>
              <PricingTierPrice
                popular
                price={isAnnual ? "$9" : "$99"}
                period={isAnnual ? "/mo, billed annually" : "/mo"}
                priceClassName="text-zinc-900 dark:text-white"
                periodClassName="text-zinc-500 dark:text-zinc-500"
              />
            </PricingTierHeader>
            <Button className="relative z-10 mt-8 h-12 w-full bg-indigo-600 font-medium text-white shadow-md shadow-indigo-500/20 transition-all hover:bg-indigo-700">
              Get Growth
            </Button>
            <p className="relative z-10 mt-3 text-center text-xs text-zinc-500 dark:text-zinc-400">
              No credit card required. Cancel anytime.
            </p>
            <PricingTierFeatures popular className="relative z-10 mt-8">
              <PricingTierFeature
                popular
                checkClassName="text-indigo-400"
                className="text-zinc-700 dark:text-zinc-300"
              >
                Up to 5,000 orders/month
              </PricingTierFeature>
              <PricingTierFeature
                popular
                checkClassName="text-indigo-400"
                className="text-zinc-700 dark:text-zinc-300"
              >
                Full cohort analysis & LTV
              </PricingTierFeature>
              <PricingTierFeature
                popular
                checkClassName="text-indigo-400"
                className="text-zinc-700 dark:text-zinc-300"
              >
                Real-time data sync
              </PricingTierFeature>
              <PricingTierFeature
                popular
                checkClassName="text-indigo-400"
                className="text-zinc-700 dark:text-zinc-300"
              >
                Custom report builder
              </PricingTierFeature>
              <PricingTierFeature
                popular
                checkClassName="text-indigo-400"
                className="text-zinc-700 dark:text-zinc-300"
              >
                Priority email support
              </PricingTierFeature>
            </PricingTierFeatures>
          </PricingTier>

          <PricingTier
            index={2}
            className="border-zinc-200/50 bg-white/60 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-[#161822]/60"
          >
            <PricingTierHeader>
              <PricingTierName className="text-zinc-900 dark:text-white">Pro</PricingTierName>
              <PricingTierDescription className="text-zinc-600 dark:text-zinc-400">
                For freelancers, startups, and growing companies.
              </PricingTierDescription>
              <PricingTierPrice
                price="$99"
                period="/mo"
                className="text-zinc-900 dark:text-white"
              />
            </PricingTierHeader>
            <Button
              variant="outline"
              className="mt-8 h-12 w-full border-zinc-300 font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Open Pro Account
            </Button>
            <PricingTierFeatures className="mt-10">
              <PricingTierFeature
                checkClassName="text-indigo-600 dark:text-indigo-400"
                className="text-zinc-600 dark:text-zinc-400"
              >
                Unlimited orders/month
              </PricingTierFeature>
              <PricingTierFeature
                checkClassName="text-indigo-600 dark:text-indigo-400"
                className="text-zinc-600 dark:text-zinc-400"
              >
                Predictive AI forecasting
              </PricingTierFeature>
              <PricingTierFeature
                checkClassName="text-indigo-600 dark:text-indigo-400"
                className="text-zinc-600 dark:text-zinc-400"
              >
                Multi-store roll-up
              </PricingTierFeature>
              <PricingTierFeature
                checkClassName="text-indigo-600 dark:text-indigo-400"
                className="text-zinc-600 dark:text-zinc-400"
              >
                Headless commerce API
              </PricingTierFeature>
              <PricingTierFeature
                checkClassName="text-indigo-600 dark:text-indigo-400"
                className="text-zinc-600 dark:text-zinc-400"
              >
                Dedicated success manager
              </PricingTierFeature>
            </PricingTierFeatures>
          </PricingTier>
        </PricingGrid>
      </PricingSection>
    </>
  );
};
