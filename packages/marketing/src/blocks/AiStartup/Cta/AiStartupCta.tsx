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

export const AiStartupCta = () => (
  <>
    {/* <!-- CTA Section --> */}
    <section
      id="cta"
      className="grid grid-cols-1 border border-zinc-100 bg-white lg:grid-cols-2 dark:border-white/5 dark:bg-[#030712]"
    >
      <div className="flex flex-col justify-center p-12 lg:p-42">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-flex w-fit items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold tracking-wide text-blue-600 uppercase dark:text-blue-400">
            Get Started
          </span>
          <h2 className="font-outfit mt-6 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
            Start building with
            <br />
            <span className="text-blue-500">hudbird UI</span> today.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
            The fastest way to ship production-ready React interfaces. Beautiful components,
            powerful templates, zero design debt.
          </p>
          <div className="mt-8">
            <a href="/#/installation">
              <Button className="relative overflow-hidden rounded-xl bg-blue-500 px-5 py-2 text-sm font-semibold text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all hover:bg-blue-600 hover:shadow-[0_0_28px_rgba(59,130,246,0.6)]">
                <span className="relative z-10">Get started</span>
                <div className="absolute inset-0 rounded-xl border-t border-white/20" />
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
      {/* Right: Terminal Demo */}
      <div className="flex min-h-[580px] items-center justify-center bg-white p-8 lg:p-12 dark:bg-[#030712]">
        <CtaTerminalDemo />
      </div>
    </section>
  </>
);
