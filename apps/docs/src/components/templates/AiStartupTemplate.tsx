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
import { TemplateThemeToggle, ThemeToggleButton, useTemplateTheme } from "./TemplateThemeToggle";
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
  AiStartupHero,
  AiStartupCta,
  AiStartupFeatures,
  AiStartupLogoCloud,
  AiStartupFooter,
  AiStartupMarquee,
  AiStartupAgentShowcase,
} from "@hudbird/marketing";
export const AiStartupTemplate = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [activeAgentCard, setActiveAgentCard] = useState(0);
  const { theme, toggleTheme } = useTemplateTheme();

  // Smooth scroll helper
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-white dark:bg-[#030712]">
      <AiStartupHero theme={theme} toggleTheme={toggleTheme} />
      <AiStartupLogoCloud />
      {/* <!-- Component Gallery (bento mosaic) — same container width as #components --> */}
      <ComponentShowcase />
      <AiStartupAgentShowcase
        activeAgentCard={activeAgentCard}
        setActiveAgentCard={setActiveAgentCard}
      />
      <AiStartupFeatures />
      <AiStartupMarquee />
      <AiStartupCta />
      <AiStartupFooter />
    </div>
  );
};
