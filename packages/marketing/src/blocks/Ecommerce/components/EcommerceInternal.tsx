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

export const logos = [
  { name: "Acme Corp", src: "/assets/marketing-section/logo/react-dev-logo.png" },
  { name: "GlobalTech", src: "/assets/marketing-section/logo/openai-com-brandmark.svg" },
  { name: "DataFlow", src: "/assets/marketing-section/logo/npmjs-com-logo.png" },
  { name: "Nexus", src: "/assets/marketing-section/logo/ai-claude-net-logo.png" },
  { name: "Horizon", src: "/assets/marketing-section/logo/nike-com-brandmark.svg" },
  { name: "Vertex", src: "/assets/marketing-section/logo/react-dev-logo.png" },
  { name: "Stratos", src: "/assets/marketing-section/logo/openai-com-brandmark.svg" },
];

export const MEGA_LINK_GROUPS = [
  {
    title: "Accounts",
    links: [
      { label: "Checking", href: "#" },
      { label: "Savings", href: "#" },
      { label: "Inventory Velocity", href: "#" },
      { label: "Joint Accounts", href: "#" },
    ],
  },
  {
    title: "Features",
    links: [
      { label: "Cohort Analysis", href: "#" },
      { label: "Live Alerts", href: "#" },
      { label: "Crypto Trading", href: "#" },
      { label: "Analytics", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Security", href: "#" },
      { label: "Legal", href: "#" },
    ],
  },
];

export const SOCIALS = [{ label: "Twitter", href: "#", icon: <TrendingUp className="h-5 w-5" /> }];

export const FAQS = [
  {
    id: "1",
    question: "Will this slow down my Shopify store?",
    answer:
      "Not at all. StoreMetrics uses Shopify's backend APIs to sync data. We do not inject any heavy tracking scripts into your customer-facing storefront.",
  },
  {
    id: "2",
    question: "Do I need to be a data analyst to use this?",
    answer:
      "No! We designed StoreMetrics for founders and marketers. Every chart comes with plain-English insights so you know exactly what action to take.",
  },
  {
    id: "3",
    question: "How far back does the data sync go?",
    answer:
      "On our Growth and Pro plans, we sync your entire historical Shopify data from day one, allowing you to instantly generate cohorts for the past 5 years.",
  },
  {
    id: "4",
    question: "Does it work with multiple Shopify stores?",
    answer:
      "Yes! We offer StoreMetrics Pro, designed specifically for freelancers, startups, and growing enterprises with advanced expense tracking and invoice generation.",
  },
  {
    id: "5",
    question: "What about ad spend and COGS?",
    answer:
      "StoreMetrics integrates directly with Facebook Ads, Google Ads, TikTok, and your COGS sheet to automatically calculate your true Net Profit and blended ROAS.",
  },
  {
    id: "6",
    question: "Can I cancel anytime?",
    answer:
      "We currently support over 30 global currencies including SKU, EUR, GBP, JPY, and AUD. You can hold and convert them directly in the app at the real exchange rate.",
  },
];
