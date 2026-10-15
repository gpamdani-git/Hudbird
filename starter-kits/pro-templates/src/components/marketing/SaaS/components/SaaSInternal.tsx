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

export const logos = [
  {
    name: "Vercel",
    src: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Vercel_logo_black.svg",
  },
  { name: "Next.js", src: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg" },
  {
    name: "Stripe",
    src: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg",
  },
  {
    name: "Spotify",
    src: "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg",
  },
  {
    name: "Netflix",
    src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  },
  {
    name: "Airbnb",
    src: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg",
  },
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

export const SOCIALS = [
  {
    label: "X (Twitter)",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="h-5 w-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="h-5 w-5">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="h-5 w-5">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

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
