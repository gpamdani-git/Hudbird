import {
  ParticleOrb,
  TypewriterText,
  IdeCaret,
  FolderIcon,
  MockToggle,
  logos,
  MEGA_LINK_GROUPS,
  SOCIALS,
  useHtmlTheme,
  TerminalTyping,
  IdeSuggestPopup,
} from "./shared";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Text, Badge, Input, Textarea } from "@hudbird/ui";
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

import {
  Zap,
  Code2,
  Layers,
  Cpu,
  Network,
  PlayIcon,
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
  Sparkles,
  BrainCircuit,
  MessageSquare,
} from "lucide-react";
import { ThemeToggleButton } from "../../../components/templates/TemplateThemeToggle";

const templatesData = [
  {
    name: "SaaS Launchpad",
    src: "/assets/templates/saas-launchpad.webp",
    srcLight: "/assets/templates/saas-launchpad-light.webp",
    width: "w-[400px] lg:w-[600px]",
  },
  {
    name: "Fintech App",
    src: "/assets/templates/fintech.webp",
    srcLight: "/assets/templates/fintech-light.webp",
    width: "w-[300px] lg:w-[400px]",
  },
  {
    name: "AI Startup",
    src: "/assets/templates/ai-startup.webp",
    srcLight: "/assets/templates/ai-startup-light.webp",
    width: "w-[350px] lg:w-[500px]",
  },
  {
    name: "E-Commerce",
    src: "/assets/templates/ecommerce.webp",
    srcLight: "/assets/templates/ecommerce-light.webp",
    width: "w-[450px] lg:w-[700px]",
  },
  {
    name: "Modern App",
    src: "/assets/templates/modern-app.webp",
    srcLight: "/assets/templates/modern-app-light.webp",
    width: "w-[300px] lg:w-[450px]",
  },
  {
    name: "Digital Agency",
    src: "/assets/templates/digital-agency.webp",
    srcLight: "/assets/templates/digital-agency-light.webp",
    width: "w-[350px] lg:w-[500px]",
  },
];

export const TemplateMarquee = () => {
  const theme = useHtmlTheme();
  const row1 = templatesData.slice(0, 3);
  const row2 = templatesData.slice(3, 6);

  // Preload the inactive theme's thumbnails so the swap is instant, no flash.
  useEffect(() => {
    templatesData.forEach((item) => {
      const preloader = new Image();
      preloader.src = theme === "dark" ? item.srcLight : item.src;
    });
  }, [theme]);

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-white py-24 sm:py-32 dark:bg-zinc-950">
      {/* Header */}
      <div className="relative z-10 mx-auto mb-10 flex w-full max-w-7xl flex-col justify-between gap-4 px-4 sm:mb-12 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center"
        >
          <h2 className="font-outfit text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
            Hudbird Themplates
          </h2>
          <Button
            variant="outline"
            className="w-fit rounded-xl border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
          >
            Browse all templates
          </Button>
        </motion.div>
      </div>

      {/* Rounded marquee container — mirrors reference (large uniform cards) */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[28px] bg-zinc-50 p-2 shadow-sm sm:rounded-[32px] sm:p-3 lg:rounded-[36px] lg:p-4 dark:border-zinc-950 dark:bg-zinc-950">
          <div className="flex w-full flex-col gap-3 sm:gap-4">
            {/* Row 1 - scrolling left — uniform, full bleed, no crop */}
            <div className="group flex w-full overflow-hidden rounded-[20px] sm:rounded-[24px]">
              <motion.div
                className="flex shrink-0 items-center gap-3 sm:gap-4"
                animate={{ x: ["0%", "-25%"] }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              >
                {[...row1, ...row1, ...row1, ...row1].map((item, idx) => (
                  <div
                    key={`row1-${idx}`}
                    className="relative h-[362px] w-[580px] shrink-0 overflow-hidden rounded-2xl sm:h-[400px] sm:w-[640px] lg:h-[450px] lg:w-[720px]"
                  >
                    <img
                      src={theme === "dark" ? item.src : item.srcLight}
                      alt={item.name}
                      className="h-full w-full object-cover object-top"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Row 2 - scrolling right — uniform, full bleed, no crop */}
            <div className="group flex w-full overflow-hidden rounded-[20px] sm:rounded-[24px]">
              <motion.div
                className="flex shrink-0 items-center gap-3 sm:gap-4"
                animate={{ x: ["-20%", "0%"] }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
              >
                {[...row2, ...row2, ...row2, ...row2].map((item, idx) => (
                  <div
                    key={`row2-${idx}`}
                    className="relative h-[362px] w-[580px] shrink-0 overflow-hidden rounded-2xl sm:h-[400px] sm:w-[640px] lg:h-[450px] lg:w-[720px]"
                  >
                    <img
                      src={theme === "dark" ? item.src : item.srcLight}
                      alt={item.name}
                      className="h-full w-full object-cover object-top"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Inner edge fades — inside rounded container */}
          <div className="pointer-events-none absolute inset-y-2 left-2 w-16 bg-gradient-to-r from-zinc-50 to-transparent sm:inset-y-3 sm:w-24 dark:from-zinc-950" />
          <div className="pointer-events-none absolute inset-y-2 right-2 w-16 bg-gradient-to-l from-zinc-50 to-transparent sm:inset-y-3 sm:w-24 dark:from-zinc-950" />
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   CTA Terminal Demo
   Phase 0  → terminal: pnpm dlx hudbird-ui@latest init
   Phase 1  → installing packages (loading bars)
   Phase 2  → ✔ success
   Phase 3+ → VS Code UI simulation: add Hero
───────────────────────────────────────────── */
