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

export const SaaSFooter = () => (
  <>
    {/* <!-- Footer --> */}
    <FooterMega
      className="border-t border-zinc-200 bg-zinc-50 pt-16 dark:border-white/5 dark:bg-[#070912]"
      logo={
        <div className="flex items-center gap-2 pl-2">
          <div className="flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Box className="h-5 w-5" fill="currentColor" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
            Taskk
          </span>
        </div>
      }
      brandName=""
      description="The modern project management platform designed for scale. Plan, track, and collaborate without limits."
      linkGroups={MEGA_LINK_GROUPS}
      socials={SOCIALS}
      copyright="&copy; 2026 Taskk Inc. All rights reserved."
    />
  </>
);
