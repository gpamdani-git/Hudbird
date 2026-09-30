import React, { useState, useEffect } from "react";
import {
  Hero,
  HeroHeader,
  HeroBody,
  HeroBadge,
  HeroTitle,
  HeroDescription,
  HeroActions,
  HeroBackground,
  LogoCloud,
  LogoCloudTitle,
  LogoCloudTicker,
  LogoCloudItem,
  FeatureSection,
  FeatureHeader,
  FeatureBadge,
  FeatureTitle,
  FeatureDescription,
  FeatureAlternating,
  FeatureRow,
  FeatureRowContent,
  FeatureRowMedia,
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
  CtaSplit,
  FooterMega,
  Faq,
} from "@hudbird/marketing";
import { Button, Text, Badge, Input, Textarea } from "@hudbird/ui";
import {
  Sparkles,
  BrainCircuit,
  MessageSquare,
  Code2,
  Layers,
  Cpu,
  Network,
  Zap,
  ArrowRight,
  ArrowUpCircle,
  CheckCircle2,
  Shield,
  Globe,
  BarChart3,
  Database,
  LayoutDashboard,
  Bot,
  Command,
  Layout,
  LineChart,
  Search,
  Plus,
  X,
  Check,
  ChevronDown,
  ChevronRight,
  FileText,
  Wallet,
  Target,
  Calendar,
  LifeBuoy,
  BookOpen,
  Mail,
  Activity,
  User,
  CreditCard,
  Bell,
  Palette,
  ArrowLeftRight,
  TrendingUp,
  Landmark,
  Clock,
  QrCode,
  RefreshCw,
  Send,
  Lock,
  TriangleAlert,
  Settings,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import {
  ParticleOrb,
  PlayIcon,
  AiOrbIllustration,
  TypewriterText,
  TerminalTyping,
  TerminalAnimation,
  IdeCaret,
  IdeSuggestPopup,
  VscodeAutocompleteIllustration,
  AtomicIllustration,
  FolderIcon,
  TemplateMarquee,
  CtaTerminalDemo,
  GTitle,
  GDesc,
  GLabel,
  MockCheck,
  MockToggle,
  MockBar,
  NavItem,
  ComponentShowcase,
  logos,
  MEGA_LINK_GROUPS,
  SOCIALS,
  features,
  agentCards,
} from "../components/AiStartupInternal";

import { AiStartupHero } from "../Hero/AiStartupHero";

export const AiStartupFooter = () => (
  <>
    {/* <!-- Footer V4 - Mega --> */}
    <FooterMega
      className="border-t border-zinc-100 bg-white pt-16 dark:border-zinc-800 dark:bg-zinc-950"
      logo={
        <div className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-blue-400" fill="currentColor" />
          <span className="text-lg font-bold text-zinc-900 dark:text-white">hudbird UI</span>
        </div>
      }
      brandName=""
      description="Beautiful, accessible React components built with TailwindCSS v4 & Framer Motion."
      linkGroups={MEGA_LINK_GROUPS}
      socials={SOCIALS}
      copyright="&copy; 2026 hudbird UI. All rights reserved."
      hideNewsletter={true}
    />
  </>
);
