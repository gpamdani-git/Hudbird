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

export const SaaSPricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  return (
    <>
      {/* <!-- Pricing Section: Risk Reversal + Strong Offer --> */}
      <PricingSection className="relative overflow-hidden border-t border-zinc-200/50 bg-zinc-50/50 py-24 dark:border-white/5 dark:bg-[#070912]">
        {/* Background Glow */}
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
          <div className="absolute top-[-20%] left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-zinc-100/50 blur-[120px] dark:bg-blue-600/10" />
        </div>

        <PricingHeader className="relative z-10 flex flex-col items-center text-center">
          <PricingBadge className="mb-6 inline-flex w-fit items-center gap-1.5 rounded-full border border-zinc-200/50 bg-zinc-100/50 px-3 py-1 text-sm font-medium tracking-wide text-blue-700 backdrop-blur-sm dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400">
            Simple Pricing
          </PricingBadge>
          <PricingTitle className="mb-4 text-4xl leading-tight font-bold tracking-tight text-balance text-zinc-900 md:text-5xl dark:text-white">
            Predictable costs,{" "}
            <span className="font-light text-zinc-500 italic dark:text-zinc-400">
              unlimited scale
            </span>
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
            className="relative transform border-zinc-200 bg-white shadow-xl ring-2 shadow-zinc-500/10 ring-zinc-500 md:-translate-y-4 dark:border-blue-500/30 dark:bg-[#161822] dark:shadow-blue-500/20"
          >
            {/* Glowing background effect for Popular Tier */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-100/50 via-transparent to-transparent opacity-50 dark:from-blue-900/20" />

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
            <Button className="relative z-10 mt-8 h-12 w-full bg-blue-600 font-medium text-white shadow-md shadow-zinc-500/20 transition-all hover:bg-blue-700">
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
    </>
  );
};
