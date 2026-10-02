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

export const SaaSLogoCloud = () => (
  <>
    {/* <!-- Logo Cloud --> */}
    <LogoCloud className="relative overflow-hidden border-y border-zinc-200/50 bg-white py-16 dark:border-white/5 dark:bg-[#070912]">
      <LogoCloudTitle className="text-sm font-medium tracking-wide text-zinc-500 dark:text-zinc-400">
        POWERING REVENUE OPERATIONS AT
      </LogoCloudTitle>
      <LogoCloudTicker speed="normal" direction="left" className="mt-8">
        {logos.map((logo, index) => (
          <LogoCloudItem key={index} className="mx-8 w-32 shrink-0 lg:mx-12">
            <img
              src={logo.src}
              alt={logo.name}
              className="h-8 w-auto object-contain opacity-50 grayscale transition-all hover:opacity-100 hover:grayscale-0 dark:invert dark:hover:invert-0"
            />
          </LogoCloudItem>
        ))}
      </LogoCloudTicker>
    </LogoCloud>
  </>
);
