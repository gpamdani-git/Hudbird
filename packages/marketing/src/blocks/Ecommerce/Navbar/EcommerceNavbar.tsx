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

export const EcommerceNavbar = () => (
  <>
    {/* Floating Navbar */}
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.35, delay: 0.1 }}
      className="fixed inset-x-0 top-4 z-[100] mx-auto w-full max-w-4xl px-4 sm:top-6"
    >
      <Navbar
        styleVariant="floating-full"
        position="static"
        className="!mt-0 !max-w-3xl !border-zinc-200/80 !bg-white/80 !px-4 !shadow-2xl !backdrop-blur-2xl transition-colors duration-500 dark:!border-white/10 dark:!bg-[#161618]/90 [&>div:first-child]:!h-[56px] [&>div:first-child]:!px-4"
      >
        <NavbarBrand>
          <div className="flex items-center gap-2 pl-2">
            <div className="flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Box className="h-5 w-5" fill="currentColor" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
              StoreMetrics
            </span>
          </div>
        </NavbarBrand>

        <NavbarContent justify="center" className="gap-6">
          <NavbarItem>Home</NavbarItem>
          <NavbarItem className="flex items-center gap-1">
            Products <ChevronDown className="h-3.5 w-3.5 opacity-70" />
          </NavbarItem>
          <NavbarItem className="flex items-center gap-1">
            Resources <ChevronDown className="h-3.5 w-3.5 opacity-70" />
          </NavbarItem>
          <NavbarItem>Pricing</NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          <Button size="sm" color="primary" radius="full" className="hidden md:inline-flex">
            Sign up
          </Button>
        </NavbarContent>

        <NavbarMenuToggle />

        <NavbarMenu
          variant="top"
          isContained={false}
          className="!bg-white/95 !backdrop-blur-3xl !backdrop-saturate-200 dark:!border-white/10 dark:!bg-[#070912]/95"
        >
          <NavbarMenuItem>Home</NavbarMenuItem>
          <NavbarMenuItem>Products</NavbarMenuItem>
          <NavbarMenuItem>Resources</NavbarMenuItem>
          <NavbarMenuItem>Pricing</NavbarMenuItem>
          <div className="mt-4 flex flex-col gap-2">
            <Button color="primary" radius="full" size="sm">
              Sign up
            </Button>
          </div>
        </NavbarMenu>
      </Navbar>
    </motion.div>
  </>
);
