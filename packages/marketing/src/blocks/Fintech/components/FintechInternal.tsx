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
      { label: "Multi-Currency", href: "#" },
      { label: "Joint Accounts", href: "#" },
    ],
  },
  {
    title: "Features",
    links: [
      { label: "Global Transfers", href: "#" },
      { label: "Virtual Cards", href: "#" },
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
    question: "Is my money safe with VaultX?",
    answer:
      "Absolutely. We are fully regulated and your deposits are insured up to $250,000 by our partner banks. We also use 256-bit encryption and advanced fraud monitoring.",
  },
  {
    id: "2",
    question: "Are there any hidden fees?",
    answer:
      "No. We believe in complete transparency. We don't charge account maintenance fees, minimum balance fees, or foreign transaction fees.",
  },
  {
    id: "3",
    question: "How long do international transfers take?",
    answer:
      "Most international transfers are completed instantly or within a few minutes. Rarely, depending on the recipient bank, it may take up to 24 hours.",
  },
  {
    id: "4",
    question: "Can I use VaultX for my business?",
    answer:
      "Yes! We offer VaultX Business, designed specifically for freelancers, startups, and growing enterprises with advanced expense tracking and invoice generation.",
  },
  {
    id: "5",
    question: "How do I add money to my account?",
    answer:
      "You can link your external bank account, set up direct deposit, or instantly top up using Apple Pay, Google Pay, or a debit card.",
  },
  {
    id: "6",
    question: "What currencies do you support?",
    answer:
      "We currently support over 30 global currencies including USD, EUR, GBP, JPY, and AUD. You can hold and convert them directly in the app at the real exchange rate.",
  },
];
