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

export const VscodeAutocompleteIllustration = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const sequence = [1600, 1500, 1400, 2000, 2200, 3000];
    const timeout = setTimeout(() => {
      setStep((s) => (s >= 5 ? 0 : s + 1));
    }, sequence[step]);
    return () => clearTimeout(timeout);
  }, [step]);

  const suggestions = [
    { name: "Hero", kind: "Component", active: true },
    { name: "BentoGrid", kind: "Section", active: false },
    { name: "Faq", kind: "Section", active: false },
    { name: "Button", kind: "Core", active: false },
  ];

  const tagSuggestions = [
    { name: "BentoGrid", kind: "Section", active: true },
    { name: "BentoCard", kind: "Section", active: false },
    { name: "Box", kind: "Core", active: false },
  ];

  const K = "text-blue-600 italic dark:text-[#66d9ef]";
  const S = "text-red-600 dark:text-[#e6db74]";
  const T = "text-teal-600 dark:text-[#a6e22e]";
  const P = "text-orange-600 dark:text-[#fd971f]";

  const editorLines: React.ReactNode[] = [
    <>
      <span className={K}>import</span>
      {" { Button, Text, Badge, Input } "}
      <span className={K}>from</span> <span className={S}>"@hudbird/ui"</span>
      {";"}
    </>,
    <>
      <span className={K}>import</span>
      {" { BentoGrid, Faq } "}
      <span className={K}>from</span> <span className={S}>"@hudbird-ui/marketing"</span>
      {";"}
    </>,
    <>
      <span className={K}>export</span> <span className={K}>function</span>
      {" HeroSection() {"}
    </>,
    <>
      {"  "}
      <span className={K}>return</span>
      {" ("}
    </>,
    <>
      {"    "}
      <span className={T}>{"<Bento"}</span>
      {step >= 5 && <span className={T}>{"Grid>"}</span>}
    </>,
    <>
      {"      "}
      <span className={T}>{"<Text"}</span> <span className={P}>variant</span>
      {"="}
      <span className={S}>"strong"</span>
      {">Ship Faster"}
      <span className={T}>{"</Text>"}</span>
    </>,
    <>
      {"      "}
      <span className={T}>{"<Button"}</span> <span className={P}>variant</span>
      {"="}
      <span className={S}>"solid"</span> <span className={P}>color</span>
      {"="}
      <span className={S}>"indigo"</span>
      {">"}
    </>,
    <>
      {"        "}
      {"Deploy Now"}
    </>,
    <>
      {"      "}
      <span className={T}>{"</Button>"}</span>
    </>,
    <>
      {"    "}
      <span className={T}>{"</BentoGrid>"}</span>
    </>,
    <>{"  );"}</>,
    <>{"}"}</>,
  ];

  const editorPhase = step >= 3;
  const visibleCount = step < 4 ? 4 : step === 4 ? 6 : editorLines.length;

  return (
    <div className="relative w-full max-w-3xl overflow-hidden rounded-[24px] border border-zinc-200/80 bg-white font-sans text-sm shadow-md backdrop-blur-sm dark:border-white/10 dark:bg-[#0a0f1c]">
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
        <div className="ml-2 flex-1 text-center">
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="rounded-full border border-zinc-200/60 bg-white/60 px-2 py-0.5 font-mono text-[10px] tracking-widest text-zinc-500 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-zinc-400"
          >
            EDITOR // HUDBIRD.IDE
          </motion.span>
        </div>
        <motion.div
          className="h-2 w-2 rounded-full bg-cyan-500 dark:bg-cyan-400"
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          style={{ boxShadow: "0 0 8px rgba(34,211,238,0.8)" }}
        />
      </div>

      {/* Body — command phase then editor phase */}
      <div className="relative z-10 h-[300px]">
        <AnimatePresence mode="wait">
          {!editorPhase && (
            <motion.div
              key="ide-command"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative flex h-[300px] flex-col gap-3 p-5"
            >
              <TerminalTyping
                text="pnpm dlx hudbird-ui@latest add Hero"
                color="text-blue-700 dark:text-blue-300"
              />
              <AnimatePresence>
                {step >= 1 && <IdeSuggestPopup items={suggestions} className="top-12 left-9" />}
              </AnimatePresence>
              {step >= 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 pl-4 font-mono text-xs text-zinc-500 sm:text-sm dark:text-zinc-500"
                >
                  <span className="text-cyan-600 dark:text-cyan-500">✔</span>
                  <span>
                    Fetching <span className="text-blue-600 dark:text-blue-400">Hero</span> from
                    registry
                    <motion.span
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    >
                      …
                    </motion.span>
                  </span>
                </motion.div>
              )}
            </motion.div>
          )}

          {editorPhase && (
            <motion.div
              key="ide-editor"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex h-[300px] flex-col"
            >
              {/* File tabs */}
              <div className="flex items-center gap-1 border-b border-zinc-100 bg-zinc-50/80 px-3 pt-2 text-xs dark:border-white/5 dark:bg-white/[0.02]">
                <div className="flex items-center gap-1.5 rounded-t-lg border border-b-0 border-zinc-200 bg-white px-3 py-1.5 font-medium text-zinc-700 dark:border-white/10 dark:bg-[#1e1e2e] dark:text-zinc-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  HeroSection.tsx
                </div>
                <div className="px-3 py-1.5 text-zinc-400 dark:text-zinc-600">page.tsx</div>
              </div>
              {/* Code */}
              <div className="relative flex-1 overflow-hidden bg-white px-4 py-2 font-mono text-[11px] text-zinc-800 dark:bg-transparent dark:text-[#f8f8f2]">
                {editorLines.slice(0, visibleCount).map((content, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.09, duration: 0.3 }}
                    className="flex leading-[1.7]"
                  >
                    <span className="mr-4 inline-block w-6 shrink-0 text-right text-zinc-300 select-none dark:text-zinc-600">
                      {i + 1}
                    </span>
                    <span className="break-all whitespace-pre-wrap">
                      {content}
                      {i === visibleCount - 1 && <IdeCaret />}
                    </span>
                  </motion.div>
                ))}
                {step === 4 && (
                  <IdeSuggestPopup items={tagSuggestions} className="top-[104px] left-[118px]" />
                )}
              </div>
              {/* Success footer */}
              <AnimatePresence>
                {step >= 5 && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 border-t border-zinc-100 bg-white px-4 py-2 font-mono text-xs dark:border-white/5 dark:bg-transparent"
                  >
                    <span className="text-cyan-600 dark:text-cyan-500">✔</span>
                    <span className="text-zinc-500">Created</span>
                    <span className="font-medium text-zinc-900 dark:text-white">
                      components/ui/Hero.tsx
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

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
