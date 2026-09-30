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
    title: "Platform",
    links: [
      { label: "Kanban Boards", href: "#" },
      { label: "Timeline & Gantt", href: "#" },
      { label: "Automations", href: "#" },
      { label: "Team Chat", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "Templates", href: "#" },
      { label: "Help Center", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Taskk", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact Sales", href: "#" },
      { label: "Security & Privacy", href: "#" },
    ],
  },
];

export const SOCIALS = [{ label: "Twitter", href: "#", icon: <TrendingUp className="h-5 w-5" /> }];

export const FAQS = [
  {
    id: "1",
    question: "Do you integrate with our existing tools?",
    answer:
      "Yes. Taskk connects natively to Slack, GitHub, Figma, and Google Drive. We sync your data bidirectionally so your team can work where they're most comfortable.",
  },
  {
    id: "2",
    question: "How long does it take to get started?",
    answer:
      "Most teams are up and running within minutes. Import your existing projects from Jira, Asana, or Trello with one click, and let our AI map your workflows automatically.",
  },
  {
    id: "3",
    question: "Is there a limit on how many users we can invite?",
    answer:
      "No. Our Growth and Enterprise plans include unlimited guest and viewer seats. You only pay for active members who create or edit projects.",
  },
  {
    id: "4",
    question: "What happens if we exceed our storage limits?",
    answer:
      "We never throttle your access during a critical sprint. If you consistently exceed your tier's limits, our team will reach out to help you optimize or upgrade to a more suitable plan.",
  },
  {
    id: "5",
    question: "Do I need to be a certified project manager to use Taskk?",
    answer:
      "Not at all. Taskk's intuitive interface lets anyone build complex workflows. For advanced needs, our AI can generate templates and automations from a simple text prompt.",
  },
  {
    id: "6",
    question: "Is my data secure?",
    answer:
      "Absolutely. We are SOC 2 Type II certified, GDPR compliant, and offer SSO/SAML on our enterprise plans. We also provide strict Role-Based Access Controls.",
  },
];
