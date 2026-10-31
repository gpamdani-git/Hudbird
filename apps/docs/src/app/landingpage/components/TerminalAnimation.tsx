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

export const TerminalAnimation = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const sequence = [
      1500, // 0: type npx
      1000, // 1: output npx
      1000, // 2: type cd
      1500, // 3: type npm run dev
      1500, // 4: output dev
      2000, // 5: type init
      1000, // 6: output init
      2000, // 7: type add hero
      3000, // 8: output add hero
    ];
    const timeout = setTimeout(() => {
      setStep((s) => (s >= 8 ? 0 : s + 1));
    }, sequence[step]);
    return () => clearTimeout(timeout);
  }, [step]);

  return (
    <div className="relative w-full max-w-3xl overflow-hidden rounded-[24px] border border-zinc-200/80 bg-white font-mono text-sm shadow-md backdrop-blur-sm dark:border-white/10 dark:bg-[#0a0f1c]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.06),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:14px_14px] opacity-[0.04] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.06)_1px,transparent_1px)] dark:opacity-[0.06]" />

      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-zinc-300/60 to-transparent will-change-transform dark:via-white/15"
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: [0, 360], opacity: [0, 0.6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
      />

      <div className="pointer-events-none absolute top-12 left-3 z-10 h-5 w-5 border-b border-l border-zinc-200 dark:border-white/10" />
      <div className="pointer-events-none absolute top-12 right-3 z-10 h-5 w-5 border-r border-b border-zinc-200 dark:border-white/10" />
      <div className="pointer-events-none absolute bottom-3 left-3 z-10 h-5 w-5 border-b border-l border-zinc-200 dark:border-white/10" />
      <div className="pointer-events-none absolute right-3 bottom-3 z-10 h-5 w-5 border-r border-b border-zinc-200 dark:border-white/10" />

      {/* Header — glass */}
      <div className="relative z-10 flex items-center gap-2 border-b border-zinc-200/60 bg-white/70 px-4 py-3 backdrop-blur-md dark:border-white/10 dark:bg-white/5">
        {/* Traffic lights with neon glow */}
        <motion.div
          className="h-3 w-3 rounded-full bg-red-500"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ boxShadow: "0 0 6px rgba(239,68,68,0.6)" }}
        />
        <motion.div
          className="h-3 w-3 rounded-full bg-yellow-400"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.3, repeat: Infinity }}
          style={{ boxShadow: "0 0 6px rgba(250,204,21,0.6)" }}
        />
        <motion.div
          className="h-3 w-3 rounded-full bg-emerald-400"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          style={{ boxShadow: "0 0 6px rgba(52,211,153,0.6)" }}
        />
        {/* Center HUD label */}
        <div className="ml-2 flex-1 text-center">
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="rounded-full border border-zinc-200/60 bg-white/60 px-2 py-0.5 font-mono text-[10px] tracking-widest text-zinc-500 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-zinc-400"
          >
            TERMINAL // HUDBIRD.CLI
          </motion.span>
        </div>
        {/* Live indicator dot */}
        <motion.div
          className="h-2 w-2 rounded-full bg-cyan-400"
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          style={{ boxShadow: "0 0 8px rgba(34,211,238,0.8)" }}
        />
      </div>

      {/* Terminal body */}
      <div className="h-fill relative z-10 flex flex-col gap-2.5 overflow-hidden bg-white p-5 text-xs sm:text-sm dark:bg-transparent">
        {step >= 0 && <TerminalTyping text="npx create-next-app@latest my-app" />}
        {step >= 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-0.5 pl-4 text-zinc-500 dark:text-zinc-500"
          >
            <span>
              <span className="text-cyan-600 dark:text-cyan-500">✔</span> Creating a new Next.js app
              in <span className="text-blue-600 dark:text-blue-400">/my-app</span>.
            </span>
            <span>
              <span className="text-cyan-600 dark:text-cyan-500">✔</span> Installing dependencies...
            </span>
          </motion.div>
        )}
        {step >= 2 && <TerminalTyping text="cd my-app" />}
        {step >= 3 && <TerminalTyping text="npm run dev" />}
        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pl-4 text-zinc-500 dark:text-zinc-500"
          >
            <span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">ready</span>
              {" — started server on "}
              <span className="text-blue-600 dark:text-blue-400">0.0.0.0:3000</span>
            </span>
          </motion.div>
        )}
        {step >= 5 && (
          <div className="mt-2 border-t border-zinc-200 pt-3 dark:border-blue-500/10">
            <TerminalTyping
              text="pnpm dlx hudbird-ui@latest init"
              color="text-blue-700 dark:text-blue-300"
            />
          </div>
        )}
        {step >= 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-0.5 pl-4 text-zinc-500 dark:text-zinc-500"
          >
            <span>
              <span className="text-cyan-600 dark:text-cyan-500">✔</span> Initializing project...
            </span>
            <span>
              <span className="text-cyan-600 dark:text-cyan-500">✔</span> Writing{" "}
              <span className="text-blue-600 dark:text-blue-400">components.json</span>.
            </span>
          </motion.div>
        )}
        {step >= 7 && (
          <TerminalTyping
            text="pnpm dlx hudbird-ui@latest add Hero"
            color="text-blue-700 dark:text-blue-300"
          />
        )}
        {step >= 8 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-0.5 pl-4 text-zinc-500 dark:text-zinc-500"
          >
            <span>
              <span className="text-cyan-600 dark:text-cyan-500">✔</span> Installing dependencies.
            </span>
            <span>
              <span className="text-cyan-600 dark:text-cyan-500">✔</span> Created{" "}
              <span className="font-medium text-zinc-900 dark:text-white">
                components/ui/Hero.tsx
              </span>
            </span>
          </motion.div>
        )}

        {/* Bottom glow line */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-blue-600/[0.04] to-transparent dark:from-blue-500/5"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   VSCode Autocomplete Demo (Accelerate card)
   Phase 0 → type pnpm command (clipPath, like TerminalTyping)
   Phase 1 → suggestion popup, Hero highlighted
   Phase 2 → fetching from registry
   Phase 3 → editor opens, types imports + component shell
   Phase 4 → inline suggestion completes <BentoGrid>
   Phase 5 → full code + success footer
   Frame language matches Atomic + Terminal illustrations:
   dot matrix, flat-light vignette, transform-only scanline,
   corner brackets, HUD header, layered clean light shadow.
───────────────────────────────────────────── */
