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

export const EcommerceFooter = () => (
  <>
    {/* <!-- Footer --> */}
    <FooterMega
      className="border-t border-zinc-200 bg-zinc-50 pt-16 dark:border-white/5 dark:bg-[#070912]"
      logo={
        <div className="flex items-center gap-2 pl-2">
          <div className="flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Box className="h-5 w-5" fill="currentColor" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
            StoreMetrics
          </span>
        </div>
      }
      brandName=""
      description="The modern analytics platform for Shopify. Track, analyze, and scale without limits."
      linkGroups={MEGA_LINK_GROUPS}
      socials={SOCIALS}
      copyright="&copy; 2026 StoreMetrics Inc. All rights reserved."
    />
  </>
);
