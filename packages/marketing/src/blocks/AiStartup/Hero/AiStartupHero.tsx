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

export const AiStartupHero = ({ theme, toggleTheme }: { theme: any; toggleTheme: any }) => (
  <>
    {/* <!-- Hero Section --> */}
    <Hero id="hero" size="full" className="relative overflow-hidden bg-white dark:bg-[#030712]">
      {/* Animated Aurora Background */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute -top-[20%] -left-[10%] h-[50%] w-[50%] rounded-full bg-blue-500/20 mix-blend-normal blur-[140px] dark:bg-blue-600/25"
          animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[10%] -right-[20%] h-[60%] w-[40%] rounded-full bg-blue-400/15 mix-blend-normal blur-[140px] dark:bg-blue-500/20"
          animate={{ x: [0, -40, 0], y: [0, -40, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-[20%] left-[20%] h-[40%] w-[60%] rounded-full bg-blue-300/10 mix-blend-normal blur-[140px] dark:bg-blue-700/15"
          animate={{ x: [0, 30, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-50 w-full"
      >
        {/* HeroHeader removed to avoid duplicate navbars */}
      </motion.div>

      <HeroBody align="center" className="relative z-10 mx-auto mt-2 max-w-4xl sm:mt-20 lg:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <HeroTitle className="font-outfit text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl md:text-7xl dark:text-white">
            Build Beautiful Interfaces
            <br />
            with hudbird-UI@latest.
          </HeroTitle>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <HeroDescription className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-zinc-500 sm:mt-5 sm:text-lg dark:text-zinc-400">
            A premium React component library. From atomic core components to full marketing
            sections — ship pixel-perfect UIs in days, not months.
          </HeroDescription>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <HeroActions className="mt-6 flex-col justify-center gap-3 sm:mt-8 sm:flex-row">
            <a href="/#/installation" className="w-full sm:w-auto">
              <Button className="group relative h-12 w-full overflow-hidden rounded-xl bg-blue-500 px-8 font-semibold text-white shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all hover:bg-blue-600 hover:shadow-[0_0_40px_rgba(59,130,246,0.7)] sm:w-auto">
                <span className="relative z-10">Get started free</span>
                <div className="absolute inset-0 rounded-xl border-t border-white/30" />
                <motion.div
                  className="absolute inset-0 rounded-xl border-2 border-white/0"
                  whileHover={{
                    borderColor: [
                      "rgba(255,255,255,0)",
                      "rgba(255,255,255,0.6)",
                      "rgba(255,255,255,0)",
                    ],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </Button>
            </a>

            <a href="/#/marketing/hero" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="group h-12 w-full rounded-xl border-zinc-200 bg-white/60 px-8 font-medium text-zinc-900 backdrop-blur-sm hover:bg-white sm:w-auto dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100 dark:bg-white/10">
                  <PlayIcon className="h-3 w-3 text-zinc-900 dark:text-white" />
                </div>
                Browse components
              </Button>
            </a>
          </HeroActions>
        </motion.div>

        {/* Interactive 3D Orb Component */}
        <motion.div
          className="w-full sm:mt-24"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <AiOrbIllustration />
        </motion.div>
      </HeroBody>
    </Hero>
  </>
);
