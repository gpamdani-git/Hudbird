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

export const ParticleOrb = () => {
  const numParticles = 120;
  const css = `
    .particle-wrap {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      transform-style: preserve-3d;
      perspective: 1000px;
      animation: particle-rotate 20s infinite linear;
      z-index: 20;
    }
    @keyframes particle-rotate {
      100% { transform: rotateY(360deg) rotateX(360deg); }
    }
    .particle {
      position: absolute;
      width: 3px;
      height: 3px;
      border-radius: 50%;
      opacity: 0;
    }
    ${Array.from({ length: numParticles })
      .map((_, i) => {
        const delay = (i * 0.05).toFixed(2);
        // Deterministic pseudo-random generation based on index to avoid hydration mismatches
        const rotZ = (i * 137) % 360;
        const rotY = (i * 97) % 360;
        return `
        .particle:nth-child(${i + 1}) {
          animation: orbit${i} 10s infinite;
          animation-delay: ${delay}s;
           background-color: #3b82f6;
          box-shadow: 0 0 8px #3b82f6, 0 0 16px rgba(59,130,246,0.4);
        }
        @keyframes orbit${i} {
          20% { opacity: 1; }
          30% { transform: rotateZ(-${rotZ}deg) rotateY(${rotY}deg) translateX(90px) rotateZ(${rotZ}deg); }
          80% { transform: rotateZ(-${rotZ}deg) rotateY(${rotY}deg) translateX(90px) rotateZ(${rotZ}deg); opacity: 1; }
          100% { transform: rotateZ(-${rotZ}deg) rotateY(${rotY}deg) translateX(180px) rotateZ(${rotZ}deg); opacity: 0; }
        }
        @media (min-width: 768px) {
          @keyframes orbit${i} {
            20% { opacity: 1; }
            30% { transform: rotateZ(-${rotZ}deg) rotateY(${rotY}deg) translateX(120px) rotateZ(${rotZ}deg); }
            80% { transform: rotateZ(-${rotZ}deg) rotateY(${rotY}deg) translateX(120px) rotateZ(${rotZ}deg); opacity: 1; }
            100% { transform: rotateZ(-${rotZ}deg) rotateY(${rotY}deg) translateX(250px) rotateZ(${rotZ}deg); opacity: 0; }
          }
        }
      `;
      })
      .join("")}
  `;

  return (
    <>
      <style>{css}</style>
      <div className="particle-wrap">
        {Array.from({ length: numParticles }).map((_, i) => (
          <div key={i} className="particle" />
        ))}
      </div>
    </>
  );
};

// <!-- Generative AI Platform Theme - Data & Assets -->
export const logos = [
  { name: "Vercel", src: "https://cdn.worldvectorlogo.com/logos/vercel.svg" },
  { name: "Next.js", src: "https://cdn.worldvectorlogo.com/logos/next-js.svg" },
  { name: "React", src: "https://cdn.worldvectorlogo.com/logos/react-2.svg" },
  { name: "Tailwind CSS", src: "https://cdn.worldvectorlogo.com/logos/tailwindcss.svg" },
  { name: "Framer", src: "https://cdn.worldvectorlogo.com/logos/framer.svg" },
  { name: "OpenAI", src: "https://cdn.worldvectorlogo.com/logos/openai-2.svg" },
];

export const MEGA_LINK_GROUPS = [
  {
    title: "Core UI",
    links: [
      { label: "Button", href: "/#/button" },
      { label: "Input", href: "/#/input" },
      { label: "Card", href: "/#/card" },
      { label: "Dialog", href: "/#/dialog" },
      { label: "Dropdown", href: "/#/dropdown" },
      { label: "Select", href: "/#/select" },
      { label: "Tabs", href: "/#/tabs" },
      { label: "Badge", href: "/#/badge" },
      { label: "Accordion", href: "/#/accordion" },
      { label: "Tooltip", href: "/#/tooltip" },
    ],
  },
  {
    title: "More UI",
    links: [
      { label: "Alert", href: "/#/alert" },
      { label: "Avatar", href: "/#/avatar" },
      { label: "Checkbox", href: "/#/checkbox" },
      { label: "Combobox", href: "/#/combobox" },
      { label: "Pagination", href: "/#/pagination" },
      { label: "Radio Group", href: "/#/radio-group" },
      { label: "Switch", href: "/#/switch" },
      { label: "Skeleton", href: "/#/skeleton" },
      { label: "Table", href: "/#/table" },
      { label: "Textarea", href: "/#/textarea" },
    ],
  },
  {
    title: "Marketing",
    links: [
      { label: "Hero Section", href: "/#/marketing/hero" },
      { label: "Feature Sections", href: "/#/marketing/feature-sections" },
      { label: "Bento Grid", href: "/#/marketing/bento-grid" },
      { label: "Testimonials", href: "/#/marketing/testimonials" },
      { label: "Pricing", href: "/#/marketing/pricing" },
      { label: "FAQ", href: "/#/marketing/faq" },
      { label: "Call to Action", href: "/#/marketing/cta" },
      { label: "Logo Clouds", href: "/#/marketing/logo-clouds" },
      { label: "Footer", href: "/#/marketing/footer" },
    ],
  },
  {
    title: "Layouts",
    links: [
      { label: "Sidebar Layout", href: "/#/layouts/sidebar" },
      { label: "Stacked Layout", href: "/#/layouts/stacked" },
      { label: "Auth Layout", href: "/#/layouts/auth" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Getting Started", href: "/#/" },
      { label: "Installation", href: "/#/installation" },
      { label: "Create Theme", href: "/#/themes" },
      { label: "Changelog", href: "/#/changelog" },
      { label: "Support & FAQ", href: "/#/support" },
      { label: "GitHub", href: "https://github.com/gpamdani-git/Hudbird-UI-Discus" },
      {
        label: "Figma Kit",
        badge: (
          <Badge variant="soft" className="scale-90 opacity-70">
            Soon
          </Badge>
        ),
      },
    ],
  },
];

export const features = [];
export const agentCards = [];

export const SOCIALS = [
  { label: "Twitter", href: "#", icon: <MessageSquare className="h-5 w-5" /> },
];

export const PlayIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M8 5v14l11-7z" />
  </svg>
);

export const AiOrbIllustration = () => {
  return (
    <div className="relative mx-auto flex h-[280px] w-full max-w-[900px] items-center justify-center sm:h-[400px] md:h-[500px]">
      {/* Background Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_70%_70%_at_center,black_40%,transparent_100%)] bg-[length:24px_24px] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_1px,transparent_1px)]" />

      {/* Central Glow */}
      <div className="absolute h-[300px] w-[300px] rounded-full bg-blue-500/20 blur-[100px] dark:bg-blue-600/30" />

      {/* Connecting SVG Lines (Hidden on small screens for simplicity) */}
      <svg
        className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
        style={{ zIndex: 0 }}
      >
        <defs>
          <linearGradient id="line-gradient-left" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="line-gradient-right" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="1" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Left lines */}
        <motion.path
          d="M 380 250 L 340 250 Q 320 250 320 230 L 320 195 Q 320 175 300 175 L 240 175"
          stroke="url(#line-gradient-left)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <motion.circle
          cx="240"
          cy="175"
          r="4"
          fill="#38bdf8"
          filter="url(#glow)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        />

        <motion.path
          d="M 380 250 L 340 250 Q 320 250 320 270 L 320 340 Q 320 360 300 360 L 240 360"
          stroke="url(#line-gradient-left)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
        />
        <motion.circle
          cx="240"
          cy="360"
          r="4"
          fill="#38bdf8"
          filter="url(#glow)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.7 }}
        />

        {/* Right lines */}
        <motion.path
          d="M 520 250 L 560 250 Q 580 250 580 230 L 580 195 Q 580 175 600 175 L 660 175"
          stroke="url(#line-gradient-right)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }}
        />
        <motion.circle
          cx="660"
          cy="175"
          r="4"
          fill="#38bdf8"
          filter="url(#glow)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.9 }}
        />

        <motion.path
          d="M 520 250 L 560 250 Q 580 250 580 270 L 580 340 Q 580 360 600 360 L 660 360"
          stroke="url(#line-gradient-right)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.6 }}
        />
        <motion.circle
          cx="660"
          cy="360"
          r="4"
          fill="#38bdf8"
          filter="url(#glow)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.1 }}
        />
      </svg>

      {/* Mobile Floating Cards — simplified 2-card layout shown on small screens */}
      <div className="absolute inset-0 flex items-center justify-between px-3 sm:px-6 md:hidden">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="w-[120px] rounded-xl border border-black/10 bg-white/80 p-3 shadow-lg shadow-black/5 backdrop-blur-md dark:border-white/10 dark:bg-[#0a0f1c]/90"
        >
          <div className="mb-2 text-[11px] font-semibold text-zinc-800 dark:text-white">
            Components
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 rounded-lg bg-blue-500/10 px-1.5 py-1 text-[10px] text-blue-700 dark:text-blue-200">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              Buttons
            </div>
            <div className="flex items-center gap-1.5 rounded-lg bg-black/5 px-1.5 py-1 text-[10px] text-zinc-500 dark:bg-white/5 dark:text-zinc-400">
              <div className="h-2 w-2 rounded-full border border-zinc-300 dark:border-zinc-600" />
              Cards
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0 }}
          className="w-[120px] rounded-xl border border-black/10 bg-white/80 p-3 shadow-lg shadow-black/5 backdrop-blur-md dark:border-white/10 dark:bg-[#0a0f1c]/90"
        >
          <div className="mb-2 text-[11px] font-semibold text-zinc-800 dark:text-white">
            Performance
          </div>
          <div className="flex items-end gap-1 pt-1">
            {[40, 60, 40, 90, 100].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: h * 0.3 }}
                transition={{ delay: 1.2 + i * 0.1 }}
                className="w-4 rounded-t-sm bg-gradient-to-t from-blue-600 to-cyan-400"
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Desktop Floating UI Cards — absolute positioned, only visible on md+ */}
      <div className="absolute inset-0 hidden h-full w-full md:block">
        {/* Top Left: Task Lists */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="absolute top-[100px] left-[20px] w-[220px] rounded-2xl border border-black/10 bg-white/70 p-4 shadow-xl shadow-black/5 backdrop-blur-md dark:border-white/10 dark:bg-[#0a0f1c]/80 dark:shadow-none"
        >
          <div className="mb-3 text-sm font-semibold text-zinc-800 dark:text-white">
            UI Components
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 rounded-lg bg-blue-500/10 px-2 py-1.5 text-xs text-blue-700 dark:text-blue-200">
              <div className="flex h-3 w-3 items-center justify-center rounded-full bg-blue-500">
                <div className="h-1.5 w-1.5 rounded-full bg-white" />
              </div>
              Beautiful buttons
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-black/5 px-2 py-1.5 text-xs text-zinc-500 dark:bg-white/5 dark:text-zinc-400">
              <div className="h-3 w-3 rounded-full border border-zinc-300 dark:border-zinc-600" />
              Interactive cards
            </div>
          </div>
        </motion.div>

        {/* Bottom Left: Workflows */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0 }}
          className="absolute bottom-[80px] left-[20px] w-[220px] rounded-2xl border border-black/10 bg-white/70 p-4 shadow-xl shadow-black/5 backdrop-blur-md dark:border-white/10 dark:bg-[#0a0f1c]/80 dark:shadow-none"
        >
          <div className="mb-3 text-sm font-semibold text-zinc-800 dark:text-white">
            Framer Motion
          </div>
          <div className="flex flex-col gap-1 text-xs text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-2 rounded-md bg-black/5 p-2 text-zinc-700 dark:bg-white/5 dark:text-zinc-300">
              <Zap size={14} className="text-yellow-500 dark:text-yellow-400" /> Fluid animations
            </div>
            <div className="mx-4 h-3 w-px bg-black/10 dark:bg-white/20" />
            <div className="flex items-center gap-2 rounded-md bg-black/5 p-2 dark:bg-white/5">
              <MessageSquare size={14} /> Spring physics
            </div>
          </div>
        </motion.div>

        {/* Top Right: Analytics */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 }}
          className="absolute top-[100px] right-[20px] w-[220px] rounded-2xl border border-black/10 bg-white/70 p-4 shadow-xl shadow-black/5 backdrop-blur-md dark:border-white/10 dark:bg-[#0a0f1c]/80 dark:shadow-none"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-zinc-800 dark:text-white">Performance</span>
            <span className="flex items-center text-[10px] text-emerald-600 dark:text-emerald-400">
              99 <span className="ml-1 text-zinc-400 dark:text-zinc-500">Lighthouse</span>
            </span>
          </div>
          <div className="flex items-end gap-1.5 pt-4">
            {[40, 20, 60, 40, 90, 100].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: h }}
                transition={{ delay: 1.5 + i * 0.1 }}
                className="w-6 rounded-t-sm bg-gradient-to-t from-blue-600 to-cyan-400"
              />
            ))}
          </div>
        </motion.div>

        {/* Bottom Right: Insights */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4 }}
          className="absolute right-[20px] bottom-[80px] w-[220px] rounded-2xl border border-black/10 bg-white/70 p-4 shadow-xl shadow-black/5 backdrop-blur-md dark:border-white/10 dark:bg-[#0a0f1c]/80 dark:shadow-none"
        >
          <div className="mb-3 text-sm font-semibold text-zinc-800 dark:text-white">
            Accessibility
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 rounded-lg bg-purple-500/10 px-2 py-1.5 text-purple-700 dark:text-purple-200">
              <Sparkles size={12} className="text-purple-500 dark:text-purple-400" /> Screen reader
              ready
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 px-2 py-1.5 text-emerald-700 dark:text-emerald-200">
              <Sparkles size={12} className="text-emerald-600 dark:text-emerald-400" /> Keyboard
              navigation
            </div>
          </div>
        </motion.div>
      </div>

      {/* Orb Core */}
      <div className="relative flex h-36 w-36 items-center justify-center sm:h-48 sm:w-48 md:h-64 md:w-64">
        {/* Particle Orb Extension */}
        <ParticleOrb />

        {/* Core Glowing Sphere */}
        <motion.div
          className="absolute inset-4 rounded-full bg-gradient-to-br from-cyan-300 via-blue-500 to-indigo-600 shadow-[0_0_80px_rgba(59,130,246,0.6)]"
          animate={{
            scale: [1, 1.02, 1],
            filter: ["hue-rotate(0deg)", "hue-rotate(15deg)", "hue-rotate(0deg)"],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Inner Highlight */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-transparent via-white/40 to-white/80 opacity-50 mix-blend-overlay" />

        {/* Orbiting Rings (Restored from V1) */}
        <motion.div
          className="absolute h-[110%] w-[110%] rounded-full border border-cyan-400/50 border-t-cyan-300 border-b-transparent shadow-[0_0_20px_rgba(34,211,238,0.4)_inset]"
          animate={{ rotateZ: 360, rotateX: 50, rotateY: 20 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        />
        <motion.div
          className="absolute h-[125%] w-[125%] rounded-full border border-blue-500/40 border-r-blue-400 border-l-transparent shadow-[0_0_15px_rgba(59,130,246,0.3)_inset]"
          animate={{ rotateZ: -360, rotateX: 30, rotateY: 60 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        />
        <motion.div
          className="absolute h-[140%] w-[140%] rounded-full border border-indigo-500/30 border-t-transparent border-b-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.2)_inset]"
          animate={{ rotateZ: 360, rotateX: 70, rotateY: 10 }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        />
      </div>
    </div>
  );
};

export const TypewriterText = ({
  text,
  delay = 0,
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) => {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1, delay: delay + i * 0.05 }}
        >
          {word}{" "}
        </motion.span>
      ))}
    </span>
  );
};

export const TerminalTyping = ({
  text,
  color = "text-zinc-800 dark:text-zinc-200",
}: {
  text: string;
  color?: string;
}) => {
  return (
    <div className="flex items-center gap-2 font-mono">
      <span
        className="text-cyan-600 select-none dark:text-cyan-400"
        style={{ textShadow: "0 0 8px rgba(34,211,238,0.8)" }}
      >
        ~
      </span>
      <div className="relative">
        <motion.span
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 0.9, ease: "linear" }}
          className={`inline-block ${color}`}
        >
          {text}
        </motion.span>
        <motion.span
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 -right-2 h-full w-1.5 bg-cyan-500 dark:bg-cyan-400"
          style={{ boxShadow: "0 0 6px rgba(34,211,238,0.8)" }}
        />
      </div>
    </div>
  );
};

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
export const IdeCaret = () => (
  <motion.span
    animate={{ opacity: [1, 0, 1] }}
    transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
    className="ml-0.5 inline-block h-[13px] w-[5px] translate-y-[2px] bg-blue-500"
  />
);

export const IdeSuggestPopup = ({
  items,
  className = "",
}: {
  items: { name: string; kind: string; active: boolean }[];
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95, y: 4 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ type: "spring", stiffness: 400, damping: 28 }}
    className={`absolute z-20 w-48 overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-[0_8px_24px_-8px_rgba(16,24,40,0.25)] dark:border-zinc-700/60 dark:bg-[#1e1e2e] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] ${className}`}
  >
    {items.map((item) => (
      <div
        key={item.name}
        className={`flex items-center gap-2 px-2.5 py-1.5 text-xs ${
          item.active
            ? "bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-200"
            : "text-zinc-600 dark:text-zinc-400"
        }`}
      >
        <span
          className={`flex h-4 w-4 items-center justify-center rounded text-[9px] font-bold ${
            item.active
              ? "bg-blue-600/10 text-blue-600 dark:text-blue-300"
              : "bg-zinc-500/10 text-zinc-400 dark:text-zinc-500"
          }`}
        >
          {item.name.charAt(0)}
        </span>
        <span className="font-medium">{item.name}</span>
        <span className="ml-auto text-[10px] opacity-60">{item.kind}</span>
      </div>
    ))}
    <div className="border-t border-zinc-100 px-2.5 py-1 font-sans text-[10px] text-zinc-400 dark:border-white/5 dark:text-zinc-600">
      ↵ insert · esc dismiss
    </div>
  </motion.div>
);

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

export const AtomicIllustration = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const sequence = [2800, 2800, 2800, 3500];
    const timeout = setTimeout(() => {
      setPhase((s) => (s >= 3 ? 0 : s + 1));
    }, sequence[phase]);
    return () => clearTimeout(timeout);
  }, [phase]);

  const atomNodes = [
    { cx: "18%", cy: "22%", color: "#3b82f6", label: "Button", delay: 0 },
    { cx: "50%", cy: "14%", color: "#22d3ee", label: "Text", delay: 0.1 },
    { cx: "80%", cy: "24%", color: "#818cf8", label: "Icon", delay: 0.2 },
    { cx: "12%", cy: "54%", color: "#60a5fa", label: "Input", delay: 0.15 },
    { cx: "50%", cy: "52%", color: "#a78bfa", label: "Card", delay: 0.25 },
    { cx: "86%", cy: "52%", color: "#38bdf8", label: "Badge", delay: 0.3 },
    { cx: "28%", cy: "78%", color: "#2563eb", label: "Avatar", delay: 0.35 },
    { cx: "70%", cy: "78%", color: "#06b6d4", label: "Select", delay: 0.4 },
  ];

  const connections: [number, number][] = [
    [0, 1],
    [1, 2],
    [0, 3],
    [3, 4],
    [4, 5],
    [2, 5],
    [3, 6],
    [5, 7],
  ];

  return (
    <div className="relative flex h-[340px] w-full max-w-3xl items-center justify-center overflow-hidden rounded-[24px] border border-zinc-200/80 bg-white shadow-md backdrop-blur-sm sm:h-[380px] dark:border-white/10 dark:bg-[#0a0f1c]">
      {/* Glass radial — same as Designed for how products… */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.06),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:14px_14px] opacity-[0.04] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.06)_1px,transparent_1px)] dark:opacity-[0.06]" />

      {/* Central glow — transform + opacity only */}
      <motion.div
        className="absolute h-40 w-40 rounded-full bg-blue-500/5 blur-[60px] will-change-transform dark:bg-blue-500/8 dark:blur-[70px]"
        animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Scan line — zinc glass, transform-only */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-zinc-300/60 to-transparent will-change-transform dark:via-white/15"
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: [0, 340], opacity: [0, 0.7, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "linear", repeatDelay: 0.8 }}
      />

      {/* Corner brackets — glass zinc */}
      <div className="pointer-events-none absolute top-3 left-3 z-10 h-6 w-6 border-t border-l border-zinc-200 dark:border-white/10" />
      <div className="pointer-events-none absolute top-3 right-3 z-10 h-6 w-6 border-t border-r border-zinc-200 dark:border-white/10" />
      <div className="pointer-events-none absolute bottom-12 left-3 z-10 h-6 w-6 border-b border-l border-zinc-200 dark:border-white/10" />
      <div className="pointer-events-none absolute right-3 bottom-12 z-10 h-6 w-6 border-r border-b border-zinc-200 dark:border-white/10" />

      {/* System label — glass muted */}
      <div className="absolute top-3 left-1/2 z-10 -translate-x-1/2">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="rounded-full border border-zinc-200/60 bg-white/70 px-2 py-0.5 font-mono text-[9px] tracking-widest text-zinc-500 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-zinc-400"
        >
          SYS:RENDER // HUDBIRD.UI
        </motion.div>
      </div>

      {/* Phase Content — wait mode avoids layout overlap jank */}
      <AnimatePresence mode="wait">
        {/* Phase 0: Atoms — glowing node constellation */}
        {phase === 0 && (
          <motion.div
            key="atoms"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <svg className="absolute inset-0 h-full w-full" style={{ zIndex: 0 }}>
              {connections.map(([a, b], i) => {
                const nodeA = atomNodes[a];
                const nodeB = atomNodes[b];
                return (
                  <motion.line
                    key={i}
                    x1={nodeA.cx}
                    y1={nodeA.cy}
                    x2={nodeB.cx}
                    y2={nodeB.cy}
                    strokeWidth="1"
                    className="stroke-blue-600/20 dark:stroke-blue-400/15"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  />
                );
              })}
            </svg>
            {atomNodes.map((node, i) => (
              <motion.div
                key={i}
                className="absolute flex flex-col items-center gap-1"
                style={{
                  left: node.cx,
                  top: node.cy,
                  transform: "translate(-50%,-50%)",
                  zIndex: 10,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: node.delay, type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Outer pulse ring */}
                <motion.div
                  className="absolute rounded-full"
                  style={{ background: node.color, opacity: 0.15 }}
                  animate={{ width: [20, 36, 20], height: [20, 36, 20], opacity: [0.2, 0, 0.2] }}
                  transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: "easeOut" }}
                />
                {/* Core dot */}
                <motion.div
                  className="relative z-10 h-3 w-3 rounded-full"
                  style={{
                    background: node.color,
                    boxShadow: `0 0 10px ${node.color}, 0 0 22px ${node.color}55`,
                  }}
                  animate={{
                    scale: [1, 1.25, 1],
                    boxShadow: [
                      `0 0 8px ${node.color}`,
                      `0 0 20px ${node.color}, 0 0 40px ${node.color}44`,
                      `0 0 8px ${node.color}`,
                    ],
                  }}
                  transition={{ duration: 1.8 + i * 0.25, repeat: Infinity, ease: "easeInOut" }}
                />
                <span className="relative z-10 mt-1 font-mono text-[8px] tracking-wider text-blue-700/60 dark:text-blue-400/50">
                  {node.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Phase 1: Molecules — live connection lines with data packets */}
        {phase === 1 && (
          <motion.div
            key="molecules"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <svg className="absolute inset-0 h-full w-full">
              <defs>
                <filter id="glow-line">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {connections.map(([a, b], i) => {
                const nodeA = atomNodes[a];
                const nodeB = atomNodes[b];
                return (
                  <motion.line
                    key={i}
                    x1={nodeA.cx}
                    y1={nodeA.cy}
                    x2={nodeB.cx}
                    y2={nodeB.cy}
                    stroke={`rgba(59,130,246,${0.6 - i * 0.04})`}
                    strokeWidth="1.5"
                    filter="url(#glow-line)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.12 }}
                  />
                );
              })}
              {/* Animated data packet dots */}
              {(connections.slice(0, 4) as [number, number][]).map(([a, b], i) => {
                const nodeA = atomNodes[a];
                const nodeB = atomNodes[b];
                return (
                  <motion.circle
                    key={`pkt-${i}`}
                    r="3"
                    fill="#60a5fa"
                    filter="url(#glow-line)"
                    animate={{
                      cx: [nodeA.cx, nodeB.cx],
                      cy: [nodeA.cy, nodeB.cy],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      delay: 0.8 + i * 0.4,
                      duration: 1.2,
                      repeat: Infinity,
                      repeatDelay: 2 + i * 0.5,
                      ease: "easeInOut",
                    }}
                  />
                );
              })}
            </svg>
            {atomNodes.map((node, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: node.cx,
                  top: node.cy,
                  transform: "translate(-50%,-50%)",
                  zIndex: 10,
                }}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.06, type: "spring" }}
              >
                <motion.div
                  className="h-3.5 w-3.5 rounded-full"
                  style={{
                    background: node.color,
                    boxShadow: `0 0 12px ${node.color}, 0 0 28px ${node.color}66`,
                  }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Phase 2: Sections — light card / dark glassmorphic UI card */}
        {phase === 2 && (
          <motion.div
            key="sections"
            initial={{ opacity: 0, scale: 0.88, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
            className="relative z-10 w-[260px] overflow-hidden rounded-xl border border-zinc-200/80 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.06),0_8px_24px_-12px_rgba(16,24,40,0.12)] sm:w-[300px] dark:border-blue-500/25 dark:bg-[#0d0d1f] dark:shadow-[0_0_50px_rgba(59,130,246,0.2)]"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent dark:via-blue-400/60" />
            {/* Navbar */}
            <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-50 px-4 py-2.5 dark:border-blue-500/10 dark:bg-[#080815]">
              <div className="flex items-center gap-2">
                <motion.div
                  className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-500"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ boxShadow: "0 0 8px rgba(59,130,246,0.8)" }}
                />
                <div className="h-1.5 w-16 rounded-full bg-blue-600/30 dark:bg-blue-400/30" />
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-8 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                <div className="h-1.5 w-8 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                <motion.div
                  className="h-5 w-14 rounded-md bg-blue-600 dark:bg-blue-500"
                  animate={{
                    boxShadow: [
                      "0 0 8px rgba(59,130,246,0.4)",
                      "0 0 18px rgba(59,130,246,0.8)",
                      "0 0 8px rgba(59,130,246,0.4)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </div>
            {/* Hero */}
            <div className="flex flex-col items-center gap-3 px-4 py-7">
              <motion.div
                className="rounded-full border border-blue-600/20 bg-blue-600/5 px-3 py-0.5 dark:border-blue-500/30 dark:bg-blue-500/10"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="h-1.5 w-20 rounded-full bg-blue-600/50 dark:bg-blue-400/50" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="space-y-1.5 text-center"
              >
                <div className="mx-auto h-3 w-44 rounded bg-zinc-900/10 dark:bg-zinc-200/15" />
                <div className="mx-auto h-3 w-36 rounded bg-zinc-900/[0.07] dark:bg-zinc-200/10" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-1"
              >
                <div className="mx-auto h-1.5 w-48 rounded-full bg-zinc-400/60 dark:bg-zinc-600/40" />
                <div className="mx-auto h-1.5 w-40 rounded-full bg-zinc-400/50 dark:bg-zinc-600/30" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                className="mt-1 flex gap-3"
              >
                <motion.div
                  className="h-7 w-24 rounded-lg bg-blue-600 dark:bg-blue-500"
                  animate={{
                    boxShadow: [
                      "0 0 12px rgba(59,130,246,0.4)",
                      "0 0 24px rgba(59,130,246,0.8)",
                      "0 0 12px rgba(59,130,246,0.4)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                />
                <div className="h-7 w-20 rounded-lg border border-blue-600/25 bg-white dark:border-blue-500/20 dark:bg-transparent" />
              </motion.div>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/25 to-transparent dark:via-blue-400/30" />
          </motion.div>
        )}

        {/* Phase 3: Templates — light dashboard / dark dashboard layout */}
        {phase === 3 && (
          <motion.div
            key="template"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.15 }}
            className="relative z-10 flex h-[220px] w-[260px] overflow-hidden rounded-xl border border-zinc-200/80 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.06),0_8px_24px_-12px_rgba(16,24,40,0.12)] sm:h-[240px] sm:w-[310px] dark:border-blue-500/20 dark:bg-[#0a0a18] dark:shadow-[0_0_60px_rgba(59,130,246,0.25)]"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent dark:via-blue-400/50" />
            {/* Sidebar */}
            <div className="w-14 shrink-0 border-r border-zinc-100 bg-zinc-50 p-2 sm:w-16 dark:border-blue-500/10 dark:bg-[#07070f]">
              <div className="mb-3 flex items-center gap-1">
                <motion.div
                  className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-500"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ boxShadow: "0 0 6px rgba(59,130,246,0.8)" }}
                />
              </div>
              {[65, 45, 58, 38, 52, 42].map((w, i) => (
                <motion.div
                  key={i}
                  className="mb-1.5 rounded-full bg-zinc-300/70 dark:bg-zinc-700/60"
                  style={{ height: 4, width: `${w}%` }}
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.18 }}
                />
              ))}
            </div>
            {/* Main */}
            <div className="flex flex-1 flex-col gap-2 bg-white p-2 dark:bg-transparent">
              <motion.div
                className="h-7 w-full rounded-lg border border-zinc-200 bg-blue-50/60 dark:border-blue-500/10 dark:bg-blue-500/5"
                animate={{
                  borderColor: [
                    "rgba(59,130,246,0.15)",
                    "rgba(59,130,246,0.35)",
                    "rgba(59,130,246,0.15)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div className="flex flex-1 gap-2">
                <div className="flex-1 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 p-2 dark:border-blue-500/10 dark:bg-blue-500/5">
                  <motion.div
                    className="h-1.5 rounded-full bg-blue-600/25 dark:bg-blue-400/20"
                    animate={{ width: ["40%", "70%", "40%"] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <div className="mt-1.5 h-1 w-1/2 rounded-full bg-zinc-300/80 dark:bg-zinc-600/30" />
                  <div className="mt-1 h-1 w-2/3 rounded-full bg-zinc-300/60 dark:bg-zinc-600/20" />
                </div>
                <div className="flex w-1/3 flex-col gap-2">
                  {[0, 1].map((i) => (
                    <motion.div
                      key={i}
                      className="flex-1 rounded-lg border border-zinc-200 bg-blue-50/50 dark:border-blue-500/10 dark:bg-blue-500/5"
                      animate={{
                        borderColor: [
                          "rgba(59,130,246,0.12)",
                          "rgba(59,130,246,0.3)",
                          "rgba(59,130,246,0.12)",
                        ],
                      }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 1 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom hairline divider — matches reference, sits above tabs */}
      <div className="pointer-events-none absolute inset-x-8 bottom-11 z-10 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent dark:via-blue-400/40" />

      {/* Phase Indicator — HUD terminal tabs */}
      <div className="absolute right-0 bottom-3 left-0 z-20 flex justify-center gap-1 px-2 sm:gap-1.5">
        {["Atoms", "Molecules", "Sections", "Templates"].map((label, i) => (
          <motion.div
            key={label}
            animate={
              phase === i
                ? {
                    boxShadow: [
                      "0 0 0px rgba(59,130,246,0)",
                      "0 0 14px rgba(59,130,246,0.55)",
                      "0 0 0px rgba(59,130,246,0)",
                    ],
                  }
                : {}
            }
            transition={{ duration: 1.8, repeat: Infinity }}
            className={`rounded px-1.5 py-1 font-mono text-[8px] font-bold tracking-wider uppercase transition-all duration-500 sm:px-2.5 sm:text-[9px] ${
              phase === i
                ? "border border-blue-600/40 bg-blue-600/10 text-blue-700 dark:border-blue-500/50 dark:bg-blue-500/15 dark:text-blue-300"
                : "border border-zinc-300/80 bg-white/70 text-zinc-500 dark:border-white/10 dark:bg-black/40 dark:text-zinc-500"
            }`}
          >
            {label}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export const FolderIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 opacity-70">
    <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
  </svg>
);

const templatesData = [
  {
    name: "SaaS Launchpad",
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&h=500",
    srcLight:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&h=500",
    width: "w-[400px] lg:w-[600px]",
  },
  {
    name: "Fintech App",
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=500",
    srcLight:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=500",
    width: "w-[300px] lg:w-[400px]",
  },
  {
    name: "AI Startup",
    src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800&h=500",
    srcLight:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800&h=500",
    width: "w-[350px] lg:w-[500px]",
  },
  {
    name: "E-Commerce",
    src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800&h=500",
    srcLight:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800&h=500",
    width: "w-[450px] lg:w-[700px]",
  },
  {
    name: "Modern App",
    src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800&h=500",
    srcLight:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800&h=500",
    width: "w-[300px] lg:w-[450px]",
  },
  {
    name: "Digital Agency",
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800&h=500",
    srcLight:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800&h=500",
    width: "w-[350px] lg:w-[500px]",
  },
];

/* Observes the class-based Tailwind v4 dark variant (`<html class="dark">`)
   so thumbnails follow the template theme toggle without prop drilling. */
export const useHtmlTheme = () => {
  const getTheme = () =>
    typeof document !== "undefined" && document.documentElement.classList.contains("dark")
      ? ("dark" as const)
      : ("light" as const);
  const [theme, setTheme] = useState<"dark" | "light">(getTheme);

  useEffect(() => {
    const root = document.documentElement;
    setTheme(getTheme());
    const observer = new MutationObserver(() => setTheme(getTheme()));
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return theme;
};

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
            Hudbird Templates
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
export const CtaTerminalDemo = () => {
  const [phase, setPhase] = useState(0);
  const [pkgStep, setPkgStep] = useState(0);
  const [addStep, setAddStep] = useState(0);

  const packages = [
    { name: "react", version: "18.3.1" },
    { name: "framer-motion", version: "11.3.0" },
    { name: "tailwindcss", version: "4.0.0" },
    { name: "@hudbird/ui", version: "1.2.4" },
    { name: "@hudbird/marketing", version: "1.2.4" },
  ];

  // Auto-advance phases
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    // Start installing packages after 1.4s
    timers.push(setTimeout(() => setPhase(1), 1400));
    // Tick pkg loading bars
    for (let i = 0; i < packages.length; i++) {
      timers.push(setTimeout(() => setPkgStep(i + 1), 1800 + i * 500));
    }
    // Success state
    timers.push(setTimeout(() => setPhase(2), 1800 + packages.length * 500 + 300));
    // Transition to VS Code
    timers.push(setTimeout(() => setPhase(3), 1800 + packages.length * 500 + 1800));
    // add Hero command
    timers.push(setTimeout(() => setPhase(4), 1800 + packages.length * 500 + 2800));
    // add Hero success
    timers.push(setTimeout(() => setAddStep(1), 1800 + packages.length * 500 + 3800));
    timers.push(setTimeout(() => setAddStep(2), 1800 + packages.length * 500 + 4600));
    // Loop back
    timers.push(
      setTimeout(
        () => {
          setPhase(0);
          setPkgStep(0);
          setAddStep(0);
        },
        1800 + packages.length * 500 + 6200
      )
    );
    return () => timers.forEach(clearTimeout);
  }, [phase === 0]);

  const VSCodeFile = ({ active, name, icon }: { active?: boolean; name: string; icon: string }) => (
    <div
      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs ${active ? "border-b border-b-blue-500 bg-zinc-900 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
    >
      <span>{icon}</span>
      <span>{name}</span>
    </div>
  );

  return (
    <div className="w-full max-w-lg">
      <AnimatePresence mode="wait">
        {/* ── Phase 0-2: Terminal ── */}
        {phase < 3 && (
          <motion.div
            key="terminal"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
            className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-[0_16px_40px_-16px_rgba(16,24,40,0.4)] ring-1 ring-zinc-950/10 dark:border-zinc-700/60 dark:shadow-2xl dark:ring-0 dark:shadow-black/40"
          >
            {/* Title bar */}
            <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900/80 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
              <span className="ml-3 flex-1 text-center text-xs text-zinc-500">bash — zsh</span>
            </div>

            {/* Package manager tabs */}
            <div className="flex border-b border-zinc-800 bg-zinc-950/50">
              {["pnpm", "npm", "yarn", "bun"].map((pm, i) => (
                <button
                  key={pm}
                  className={`px-4 py-2 text-xs font-medium transition-colors ${i === 0 ? "rounded-sm bg-zinc-700 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
                >
                  {pm}
                </button>
              ))}
            </div>

            {/* Terminal body */}
            <div className="min-h-[220px] p-5 font-mono text-sm">
              {/* Command line */}
              <div className="flex items-start gap-2 text-zinc-300">
                <span className="mt-0.5 shrink-0 text-emerald-400">❯</span>
                <span>
                  <span className="text-white">pnpm</span>{" "}
                  <span className="text-zinc-400">dlx hudbird-ui@latest init</span>
                </span>
              </div>

              {/* Phase 1: Installing */}
              {phase >= 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-3 space-y-2"
                >
                  <div className="text-xs text-zinc-500">Installing packages…</div>
                  {packages.slice(0, pkgStep).map((pkg, i) => (
                    <motion.div
                      key={pkg.name}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-3"
                    >
                      <span className="text-emerald-400">✔</span>
                      <span className="w-40 text-xs text-zinc-300">{pkg.name}</span>
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-800">
                        <motion.div
                          className="h-full w-full origin-left rounded-full bg-emerald-500"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                        />
                      </div>
                      <span className="text-[10px] text-zinc-600">{pkg.version}</span>
                    </motion.div>
                  ))}
                  {pkgStep < packages.length && phase === 1 && (
                    <motion.div
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="flex items-center gap-2 text-xs text-zinc-500"
                    >
                      <span className="inline-block h-2 w-2 animate-spin rounded-sm bg-blue-500" />
                      Resolving dependencies…
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Phase 2: Success */}
              {phase === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 space-y-1.5"
                >
                  <div className="text-xs text-emerald-400">✔ Initializing hudbird-ui…</div>
                  <div className="text-xs text-emerald-400">✔ Writing components.json</div>
                  <div className="text-xs text-emerald-400">✔ Configuring Tailwind CSS v4</div>
                  <div className="mt-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
                    <div className="text-xs font-semibold text-emerald-400">
                      🎉 hudbird-ui initialized successfully!
                    </div>
                    <div className="mt-1 text-[11px] text-zinc-500">
                      Run <span className="text-zinc-300">pnpm dlx hudbird-ui add [component]</span>{" "}
                      to add components
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* ── Phase 3+: VS Code UI ── */}
        {phase >= 3 && (
          <motion.div
            key="vscode"
            initial={{ opacity: 0, scale: 0.97, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.15 }}
            className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-[0_16px_40px_-16px_rgba(16,24,40,0.4)] ring-1 ring-zinc-950/10 dark:border-zinc-700/60 dark:shadow-2xl dark:ring-0 dark:shadow-black/50"
          >
            {/* VS Code title bar */}
            <div className="flex items-center gap-2 border-b border-zinc-800 bg-[#323233] px-4 py-2">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
              <span className="ml-4 flex-1 text-center text-xs text-zinc-400">
                hudbird-ui — VS Code
              </span>
            </div>

            {/* Tab bar */}
            <div className="flex items-center border-b border-zinc-800 bg-[#2d2d2d]">
              <VSCodeFile active name="Hero.tsx" icon="⚛" />
              <VSCodeFile name="components.json" icon="📄" />
              <VSCodeFile name="tailwind.css" icon="🎨" />
            </div>

            <div className="flex" style={{ height: 260 }}>
              {/* Sidebar */}
              <div className="w-44 shrink-0 border-r border-zinc-800 bg-[#252526] p-3">
                <div className="mb-2 text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">
                  Explorer
                </div>
                {[
                  { icon: "📁", name: "components", indent: 0 },
                  { icon: "📁", name: "ui", indent: 1 },
                  { icon: "⚛", name: "Hero.tsx", indent: 2, active: true },
                  { icon: "⚛", name: "Button.tsx", indent: 2 },
                  { icon: "📁", name: "marketing", indent: 1 },
                  { icon: "📁", name: "pages", indent: 0 },
                ].map((f, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-1.5 rounded px-1 py-0.5 text-[11px] ${f.active ? "bg-zinc-700/60 text-white" : "text-zinc-400"}`}
                    style={{ paddingLeft: 4 + f.indent * 12 }}
                  >
                    <span>{f.icon}</span>
                    <span>{f.name}</span>
                  </div>
                ))}
              </div>

              {/* Editor */}
              <div className="flex flex-1 flex-col overflow-hidden bg-zinc-900 p-4 font-mono text-xs">
                {/* Terminal panel at bottom */}
                <div className="flex-1 overflow-hidden">
                  <div className="text-zinc-600">
                    <span className="text-blue-400">import</span>{" "}
                    <span className="text-yellow-300">{"{ Hero }"}</span>{" "}
                    <span className="text-blue-400">from</span>{" "}
                    <span className="text-emerald-300">'@hudbird/marketing'</span>
                  </div>
                  <div className="mt-2 text-zinc-600">
                    <span className="text-blue-400">export default function</span>{" "}
                    <span className="text-yellow-300">Page</span>
                    <span className="text-zinc-400">{"() {"}</span>
                  </div>
                  <div className="ml-4 text-zinc-600">
                    <span className="text-blue-400">return</span>{" "}
                    <span className="text-zinc-400">{"("}</span>
                  </div>
                  <div className="ml-8 text-zinc-500">
                    <span className="text-red-400">{"<Hero"}</span>
                  </div>
                  <div className="ml-10 text-zinc-500">
                    <span className="text-green-400">title</span>
                    <span className="text-zinc-400">{"="}</span>
                    <span className="text-yellow-300">{'"Build Faster"'}</span>
                  </div>
                  <div className="ml-8 text-zinc-500">
                    <span className="text-red-400">{"/>"}</span>
                  </div>
                </div>

                {/* Integrated terminal strip */}
                <div className="border-t border-zinc-800 pt-3">
                  <div className="mb-1 text-[10px] text-zinc-600">TERMINAL</div>
                  {/* add command */}
                  <div className="flex items-center gap-2 text-zinc-300">
                    <span className="text-emerald-400">❯</span>
                    <span>
                      <span className="text-white">pnpm</span>{" "}
                      <span className="text-zinc-400">dlx hudbird-ui@latest add Hero</span>
                    </span>
                  </div>
                  {addStep >= 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-1 flex items-center gap-2 text-xs text-emerald-400"
                    >
                      <span>✔</span>
                      <span>Installing @hudbird/marketing…</span>
                    </motion.div>
                  )}
                  {addStep >= 2 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2 text-xs text-emerald-400"
                    >
                      <span>✔</span>
                      <span>
                        Created <span className="text-white">components/ui/Hero.tsx</span>
                      </span>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase indicator dots — transform + color only (no width layout animation) */}
      <div className="mt-4 flex justify-center gap-2">
        {["Init", "Installing", "Success", "VS Code"].map((label, i) => (
          <div
            key={label}
            title={label}
            className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${
              (phase < 3 ? phase : 3) === i
                ? "scale-125 bg-blue-500"
                : "scale-100 bg-zinc-300 dark:bg-zinc-700"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Component Gallery — bento mosaic above the logo cloud.
   Built from @hudbird/ui core primitives (Button, Badge,
   Input, Textarea) inside marketing BentoGrid compound
   components. Monochrome zinc so it stays clean in both
   light and dark mode. Static data-viz mocks are plain
   divs (aria-hidden); motion is transform/opacity only.
───────────────────────────────────────────── */
export const GTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-white">{children}</h3>
);

export const GDesc = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <p className={`text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400 ${className}`}>
    {children}
  </p>
);

export const GLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[11px] font-semibold text-zinc-900 dark:text-zinc-100">{children}</span>
);

export const MockCheck = ({ checked = false }: { checked?: boolean }) => (
  <span
    aria-hidden
    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[5px] border ${
      checked
        ? "border-zinc-900 bg-zinc-900 dark:border-white dark:bg-white"
        : "border-zinc-300 dark:border-zinc-700"
    }`}
  >
    {checked && <Check size={11} strokeWidth={3.5} className="text-white dark:text-zinc-900" />}
  </span>
);

export const MockToggle = () => (
  <span
    aria-hidden
    className="flex h-5 w-9 shrink-0 items-center justify-end rounded-full bg-zinc-900 px-0.5 dark:bg-white"
  >
    <span className="h-4 w-4 rounded-full bg-white dark:bg-zinc-900" />
  </span>
);

export const MockBar = ({ h, hot = false }: { h: string; hot?: boolean }) => (
  <div
    aria-hidden
    style={{ height: h }}
    className={`w-full rounded-md ${hot ? "bg-zinc-900 dark:bg-white" : "bg-zinc-200 dark:bg-zinc-800"}`}
  />
);

export const NavItem = ({
  icon: Icon,
  label,
  active = false,
}: {
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
  label: string;
  active?: boolean;
}) => (
  <span
    className={`flex items-center gap-1.5 rounded-md px-1.5 py-[3px] text-[11px] ${
      active
        ? "bg-zinc-100 font-semibold text-zinc-900 dark:bg-white/10 dark:text-white"
        : "text-zinc-600 dark:text-zinc-400"
    }`}
  >
    <Icon size={12} className="shrink-0" />
    <span className="truncate">{label}</span>
  </span>
);

export const ComponentShowcase = () => {
  // 17 gallery cards — extracted from dense masonry so they can marquee as 4 vertical columns
  const galleryCards: React.ReactNode[] = [
    // 1 — Core controls
    <BentoCard key="g-0" className="p-5">
      <BentoCardContent className="justify-start gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" color="dark" radius="full" endContent={<ArrowRight size={12} />}>
            Button
          </Button>
          <Button size="sm" variant="flat" color="secondary">
            Secondary
          </Button>
          <Button size="sm" variant="outline">
            Outline
          </Button>
        </div>
        <Input
          size="sm"
          radius="full"
          placeholder="Name"
          aria-label="Name"
          endContent={<Search size={13} className="text-zinc-400" />}
        />
        <Textarea rows={2} placeholder="Message" aria-label="Message" className="text-xs" />
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge size="sm" color="secondary">
            Badge
          </Badge>
          <Badge size="sm" variant="soft" color="secondary">
            Secondary
          </Badge>
          <Badge size="sm" variant="outline" color="secondary">
            Outline
          </Badge>
          <MockCheck checked />
          <MockCheck />
          <MockCheck checked />
          <MockCheck />
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" radius="full">
            Alert Dialog
          </Button>
          <Button size="sm" variant="outline" radius="full" endContent={<ChevronDown size={12} />}>
            Button Group
          </Button>
          <MockToggle />
        </div>
      </BentoCardContent>
    </BentoCard>,
    // 2 — Contribution history
    <BentoCard key="g-1" className="p-5">
      <BentoCardContent className="justify-start gap-2">
        <GTitle>Contribution History</GTitle>
        <GDesc>Last 6 months of activity</GDesc>
        <div className="mt-1 flex h-20 items-end gap-2">
          <MockBar h="52%" />
          <MockBar h="82%" />
          <MockBar h="68%" />
          <MockBar h="92%" hot />
          <MockBar h="58%" />
        </div>
        <div className="flex gap-4 text-[10px] text-zinc-400 dark:text-zinc-500">
          {["Dec", "Jan", "Feb", "Mar", "Apr"].map((m) => (
            <span key={m} className="flex-1 text-center">
              {m}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-zinc-50 p-2 dark:bg-white/5">
            <p className="text-[9px] tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
              Upcoming
            </p>
            <p className="text-xs font-bold text-zinc-900 dark:text-white">May 2024</p>
            <p className="text-[10px] text-zinc-400">Scheduled</p>
          </div>
          <div className="rounded-lg bg-zinc-50 p-2 dark:bg-white/5">
            <p className="text-[9px] tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
              Savings plan
            </p>
            <p className="text-xs font-bold text-zinc-900 dark:text-white">Accelerated</p>
            <p className="text-[10px] text-zinc-400">Recurring</p>
          </div>
        </div>
        <Button size="sm" color="dark" radius="full" className="mt-auto w-full">
          View Full Report
        </Button>
      </BentoCardContent>
    </BentoCard>,
    // 3 — New milestone
    <BentoCard key="g-2" className="p-5">
      <BentoCardContent className="justify-start gap-2">
        <GTitle>Set a new milestone</GTitle>
        <GDesc>Define your financial target and we&apos;ll help you pace your savings.</GDesc>
        <GLabel>Goal Name</GLabel>
        <Input
          size="sm"
          radius="full"
          placeholder="e.g. New Car, Home Downpayment"
          aria-label="Goal name"
        />
        <div className="grid grid-cols-2 gap-2">
          <div>
            <GLabel>Target Amount</GLabel>
            <Input
              size="sm"
              radius="full"
              defaultValue="$15,000"
              aria-label="Target amount"
              className="mt-1"
            />
          </div>
          <div>
            <GLabel>Target Date</GLabel>
            <Input
              size="sm"
              radius="full"
              defaultValue="Dec 2025"
              aria-label="Target date"
              className="mt-1"
            />
          </div>
        </div>
        <Button size="sm" color="dark" radius="full" className="mt-1 w-full">
          Create Goal
        </Button>
        <Button size="sm" variant="outline" radius="full" className="w-full">
          Cancel
        </Button>
      </BentoCardContent>
    </BentoCard>,
    // 4 — QR connect
    <BentoCard key="g-3" className="p-5">
      <BentoCardContent className="items-center justify-center gap-3 text-center">
        <span className="rounded-2xl border border-zinc-200 bg-white p-4">
          <QrCode size={104} className="text-zinc-900" aria-label="Pairing code" />
        </span>
        <GTitle>Scan to connect your mobile device</GTitle>
        <GDesc>Open the Ledger mobile app and scan this code to link your device.</GDesc>
      </BentoCardContent>
    </BentoCard>,
    // 5 — Distribute
    <BentoCard key="g-4" className="p-5">
      <BentoCardContent className="items-center justify-center gap-1.5 text-center">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-white/10">
          <Plus size={15} className="text-zinc-700 dark:text-zinc-200" />
        </span>
        <GTitle>Distribute Track</GTitle>
        <GDesc className="line-clamp-2">
          Upload your first master to start reaching listeners everywhere.
        </GDesc>
        <Button size="sm" color="dark" radius="full" className="mt-1">
          Create Release
        </Button>
      </BentoCardContent>
    </BentoCard>,
    // 6 — Workspace navs
    <BentoCard key="g-5" className="p-4">
      <BentoCardContent className="justify-start">
        <div className="grid grid-cols-2 gap-2">
          <nav aria-label="Planning">
            <p className="px-1.5 pb-1 text-[10px] font-medium text-zinc-400 dark:text-zinc-500">
              Planning
            </p>
            <NavItem icon={FileText} label="Documents" />
            <NavItem icon={Wallet} label="Budget" />
            <NavItem icon={BarChart3} label="Reports" />
            <NavItem icon={Target} label="Goals" />
            <NavItem icon={Calendar} label="Calendar" />
          </nav>
          <nav aria-label="Support">
            <p className="px-1.5 pb-1 text-[10px] font-medium text-zinc-400 dark:text-zinc-500">
              Support
            </p>
            <NavItem icon={LifeBuoy} label="Help Center" />
            <NavItem icon={BookOpen} label="Docs" />
            <NavItem icon={Mail} label="Contact Us" />
            <NavItem icon={Activity} label="Status" />
            <NavItem icon={Globe} label="Community" />
          </nav>
        </div>
      </BentoCardContent>
    </BentoCard>,
    // 7 — Claimable balance
    <BentoCard key="g-6" className="p-5">
      <BentoCardContent className="justify-start gap-2">
        <GDesc>Claimable Balance</GDesc>
        <p className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">$1,211.29</p>
        <Badge size="sm" variant="soft" color="warning">
          Pending Setup
        </Badge>
        <div className="rounded-xl bg-zinc-50 p-3 text-[11px] dark:bg-white/5">
          <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
            <span>Net Royalties</span>
            <span className="font-semibold text-zinc-900 dark:text-white">$1,248.75</span>
          </div>
          <div className="mt-1.5 flex justify-between text-zinc-500 dark:text-zinc-400">
            <span>Processing Fee</span>
            <span className="font-semibold text-zinc-900 dark:text-white">-$37.46</span>
          </div>
          <div className="mt-1.5 flex justify-between border-t border-zinc-200 pt-1.5 font-semibold text-zinc-900 dark:border-white/10 dark:text-white">
            <span>Total Ready to Claim</span>
            <span>$1,211.29 USD</span>
          </div>
        </div>
        <GDesc>
          Once your bank is connected, balances over $10.00 are automatically eligible for monthly
          distribution.
        </GDesc>
      </BentoCardContent>
    </BentoCard>,
    // 8 — Payout threshold
    <BentoCard key="g-7" className="p-5">
      <BentoCardContent className="justify-start gap-2">
        <div className="flex items-center justify-between">
          <GTitle>Payout Threshold</GTitle>
          <Button size="sm" variant="ghost" isIconOnly aria-label="Close">
            <X size={13} />
          </Button>
        </div>
        <GDesc>Set the minimum balance required before a payout is triggered.</GDesc>
        <GLabel>Preferred Currency</GLabel>
        <Button
          size="sm"
          variant="outline"
          radius="full"
          className="w-full justify-between font-normal"
        >
          USD — United States Dollar
          <ChevronDown size={13} className="text-zinc-400" />
        </Button>
        <div className="mt-1 flex items-center justify-between">
          <GLabel>Minimum Payout Amount</GLabel>
          <span className="text-lg font-bold text-zinc-900 dark:text-white">$2500.00</span>
        </div>
        <div
          aria-hidden
          className="h-1.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800"
        >
          <div className="relative h-full w-1/4 rounded-full bg-zinc-900 dark:bg-white">
            <span className="absolute top-1/2 -right-1 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-zinc-900 bg-white dark:border-white dark:bg-zinc-900" />
          </div>
        </div>
        <div className="flex justify-between text-[10px] text-zinc-400 dark:text-zinc-500">
          <span>$50 (MIN)</span>
          <span>$10,000 (MAX)</span>
        </div>
        <GLabel>Notes</GLabel>
        <Textarea
          rows={2}
          placeholder="Add any notes for this payout configuration…"
          aria-label="Payout notes"
          className="text-xs"
        />
        <Button size="sm" color="dark" radius="full" className="mt-auto w-full">
          Save Threshold
        </Button>
      </BentoCardContent>
    </BentoCard>,
    // 9 — New chat
    <BentoCard key="g-8" className="p-5">
      <BentoCardContent className="justify-start gap-2">
        <div className="flex items-center justify-between">
          <GTitle>New Chat</GTitle>
          <Button size="sm" variant="ghost" isIconOnly aria-label="Regenerate">
            <RefreshCw size={13} />
          </Button>
        </div>
        <GDesc>How can I help you today?</GDesc>
        <div className="flex flex-1 flex-col items-center justify-center gap-1.5 text-center">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700">
            <MessageSquare size={14} className="text-zinc-400" />
          </span>
          <p className="text-sm font-semibold text-zinc-900 dark:text-white">Morning, builder!</p>
          <GDesc>What are we working on today? Press send to start a new conversation.</GDesc>
        </div>
        <p className="line-clamp-2 rounded-xl bg-zinc-100 p-2 text-[11px] text-zinc-600 dark:bg-white/10 dark:text-zinc-300">
          I&apos;m building a chat for our app and the scroll behavior is driving me nuts…
        </p>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" radius="full" isIconOnly aria-label="Attach">
            <Plus size={13} />
          </Button>
          <Button
            size="sm"
            color="dark"
            radius="full"
            isIconOnly
            aria-label="Send"
            className="ml-auto"
          >
            <Send size={13} />
          </Button>
        </div>
      </BentoCardContent>
    </BentoCard>,
    // 10 — Analytics
    <BentoCard key="g-9" className="p-5">
      <BentoCardContent className="justify-start gap-1.5">
        <div className="flex items-center justify-between">
          <GTitle>Analytics</GTitle>
          <Button size="sm" variant="ghost">
            View Analytics
          </Button>
        </div>
        <p className="flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
          418.2K Visitors
          <span className="rounded-full bg-zinc-900 px-1.5 py-px text-[9px] font-bold text-white dark:bg-white dark:text-zinc-900">
            +10%
          </span>
        </p>
        <svg
          viewBox="0 0 200 48"
          className="mt-1 h-11 w-full text-zinc-300 dark:text-zinc-700"
          aria-hidden
        >
          <polygon
            points="0,36 25,30 50,33 75,22 100,27 125,14 150,21 175,10 200,16 200,48 0,48"
            fill="currentColor"
            opacity="0.25"
          />
          <polyline
            points="0,36 25,30 50,33 75,22 100,27 125,14 150,21 175,10 200,16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </BentoCardContent>
    </BentoCard>,
    // 11 — Notifications
    <BentoCard key="g-10" className="p-5">
      <BentoCardContent className="justify-start gap-2">
        <GTitle>Notifications</GTitle>
        <GDesc>Choose which email and push alerts you want to receive.</GDesc>
        {[
          { t: "Transaction alerts", d: "Deposits, withdrawals, and transfers.", on: true },
          { t: "Security alerts", d: "Login attempts and account changes.", on: true },
          { t: "Goal milestones", d: "Updates at 25%, 50%, 75%, and 100%.", on: false },
          { t: "Market updates", d: "Daily portfolio summary and price alerts.", on: false },
        ].map((n) => (
          <div key={n.t} className="flex items-start gap-2">
            <MockCheck checked={n.on} />
            <div>
              <p className="text-[11px] font-semibold text-zinc-900 dark:text-zinc-100">{n.t}</p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400">{n.d}</p>
            </div>
          </div>
        ))}
        <Button size="sm" color="dark" radius="full" className="mt-auto w-full">
          Save Preferences
        </Button>
      </BentoCardContent>
    </BentoCard>,
    // 12 — Savings targets
    <BentoCard key="g-11" className="p-5">
      <BentoCardContent className="justify-start gap-2">
        <GTitle>Savings Targets</GTitle>
        <GDesc>Active milestones for 2024 across your portfolio.</GDesc>
        <div className="rounded-xl bg-zinc-50 p-3 dark:bg-white/5">
          <p className="text-[9px] tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
            Retirement
          </p>
          <p className="text-xl font-bold text-zinc-900 dark:text-white">$420,000</p>
          <div
            aria-hidden
            className="mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-200/70 dark:bg-zinc-800"
          >
            <div className="h-full w-[65%] rounded-full bg-zinc-900 dark:bg-white" />
          </div>
          <div className="mt-1.5 flex justify-between text-[10px] text-zinc-500 dark:text-zinc-400">
            <span>65% achieved</span>
            <span className="font-semibold text-zinc-900 dark:text-white">$273,000</span>
          </div>
        </div>
        <div className="rounded-xl bg-zinc-50 p-3 dark:bg-white/5">
          <p className="text-[9px] tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
            Real Estate
          </p>
          <p className="text-xl font-bold text-zinc-500 dark:text-zinc-400">$85,000</p>
          <div
            aria-hidden
            className="mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-200/70 dark:bg-zinc-800"
          >
            <div className="h-full w-[32%] rounded-full bg-zinc-400 dark:bg-zinc-500" />
          </div>
          <div className="mt-1.5 flex justify-between text-[10px] text-zinc-400 dark:text-zinc-500">
            <span>32% achieved</span>
            <span>$27,200</span>
          </div>
        </div>
      </BentoCardContent>
    </BentoCard>,
    // 13 — Dividend income
    <BentoCard key="g-12" className="p-5">
      <BentoCardContent className="justify-start gap-2">
        <div className="flex items-center justify-between">
          <GTitle>Q2 Dividend Income</GTitle>
          <Button size="sm" variant="ghost" isIconOnly aria-label="Close">
            <X size={13} />
          </Button>
        </div>
        <GDesc>Quarterly dividend payouts across your portfolio holdings.</GDesc>
        {[
          { n: "Vanguard", s: "450 Shares", bars: ["14px", "16px", "15px", "22px"] },
          { n: "S&P 500 VOO", s: "112 Shares", bars: ["12px", "15px", "20px", "16px"] },
          { n: "Apple AAPL", s: "85 Shares", bars: ["10px", "13px", "18px", "14px"] },
        ].map((h) => (
          <div
            key={h.n}
            className="flex items-center justify-between gap-2 rounded-xl bg-zinc-50 p-2.5 dark:bg-white/5"
          >
            <div>
              <p className="text-[11px] font-semibold text-zinc-900 dark:text-zinc-100">{h.n}</p>
              <p className="text-[10px] text-zinc-400">{h.s}</p>
            </div>
            <div className="flex items-end gap-1" aria-hidden>
              {h.bars.map((bh, bi) => (
                <span
                  key={bi}
                  style={{ height: bh }}
                  className="w-3 rounded-sm bg-zinc-300 last:bg-zinc-500 dark:bg-zinc-700 dark:last:bg-zinc-400"
                />
              ))}
            </div>
          </div>
        ))}
      </BentoCardContent>
    </BentoCard>,
    // 14 — Account access
    <BentoCard key="g-13" className="p-5">
      <BentoCardContent className="justify-start gap-2">
        <GTitle>Account Access</GTitle>
        <GDesc>Update your credentials or re-authenticate.</GDesc>
        <GLabel>Email Address</GLabel>
        <Input
          size="sm"
          radius="full"
          defaultValue="artist@studio.inc"
          aria-label="Email address"
        />
        <div className="flex items-center justify-between">
          <GLabel>Current Password</GLabel>
          <span className="text-[10px] font-medium text-zinc-400">FORGOT?</span>
        </div>
        <Input
          size="sm"
          radius="full"
          type="password"
          defaultValue="supersecret12"
          aria-label="Current password"
        />
        <Button
          size="sm"
          variant="flat"
          color="secondary"
          radius="full"
          startContent={<Lock size={12} />}
          className="w-full"
        >
          Update Security
        </Button>
        <div className="mt-auto flex items-center gap-2 border-t border-zinc-100 pt-2 dark:border-white/10">
          <TriangleAlert size={13} className="shrink-0 text-zinc-400" />
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
              Danger Zone
            </p>
            <p className="truncate text-[10px] text-zinc-400">Archive account and remove…</p>
          </div>
          <ChevronRight size={13} className="ml-auto shrink-0 text-zinc-400" />
        </div>
      </BentoCardContent>
    </BentoCard>,
    // 15 — Settings shortcuts
    <BentoCard key="g-14" className="p-4">
      <BentoCardContent className="justify-start gap-1.5">
        <p className="flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
          Home <ChevronRight size={11} /> <span className="tracking-widest">•••</span>
          <ChevronRight size={11} />
          <span className="font-medium text-zinc-800 dark:text-zinc-200">Payments</span>
        </p>
        {[
          { icon: Settings, t: "Change transfer limit", d: "Adjust how much you can send." },
          { icon: Calendar, t: "Scheduled transfers", d: "Send at a later date." },
        ].map((r) => (
          <div
            key={r.t}
            className="flex items-center gap-2 rounded-xl bg-zinc-50 p-2 dark:bg-white/5"
          >
            <r.icon size={13} className="shrink-0 text-zinc-500 dark:text-zinc-400" />
            <div className="min-w-0">
              <p className="truncate text-[11px] font-semibold text-zinc-900 dark:text-zinc-100">
                {r.t}
              </p>
              <p className="truncate text-[10px] text-zinc-400">{r.d}</p>
            </div>
            <ChevronRight size={13} className="ml-auto shrink-0 text-zinc-400" />
          </div>
        ))}
      </BentoCardContent>
    </BentoCard>,
    // 16 — Power usage
    <BentoCard key="g-15" className="p-5">
      <BentoCardContent className="justify-start gap-2">
        <GTitle>Power Usage</GTitle>
        <GDesc>Whole Home</GDesc>
        <div className="flex h-20 items-end gap-1.5" aria-hidden>
          {["38%", "72%", "80%", "64%", "84%", "76%", "82%", "82%"].map((h) => (
            <div key={h} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
              <div
                style={{ height: h }}
                className="w-full rounded-t-md bg-gradient-to-t from-zinc-300 to-zinc-400 dark:from-zinc-700 dark:to-zinc-600"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between text-[9px] text-zinc-400 dark:text-zinc-500">
          {["6a", "8a", "10a", "12p", "2p", "4p", "6p", "8p"].map((t) => (
            <span key={t} className="flex-1 text-center">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-auto grid grid-cols-2 gap-2 border-t border-zinc-100 pt-2 dark:border-white/10">
          <div>
            <p className="text-[10px] text-zinc-400">Currently Using</p>
            <p className="text-sm font-bold text-zinc-900 dark:text-white">3.4 kW</p>
          </div>
          <div>
            <p className="text-[10px] text-zinc-400">Solar Gen</p>
            <p className="text-sm font-bold text-zinc-900 dark:text-white">+1.2 kW</p>
          </div>
        </div>
      </BentoCardContent>
    </BentoCard>,
    // 17 — Account navs
    <BentoCard key="g-16" className="p-4">
      <BentoCardContent className="justify-start">
        <div className="grid grid-cols-2 gap-2">
          <nav aria-label="Overview">
            <p className="px-1.5 pb-1 text-[10px] font-medium text-zinc-400 dark:text-zinc-500">
              Overview
            </p>
            <NavItem icon={LayoutDashboard} label="Analytics" active />
            <NavItem icon={ArrowLeftRight} label="Transactions" />
            <NavItem icon={TrendingUp} label="Investments" />
            <NavItem icon={Landmark} label="Accounts" />
            <NavItem icon={Clock} label="Spending" />
          </nav>
          <nav aria-label="Account">
            <p className="px-1.5 pb-1 text-[10px] font-medium text-zinc-400 dark:text-zinc-500">
              Account
            </p>
            <NavItem icon={User} label="Profile" />
            <NavItem icon={CreditCard} label="Billing" active />
            <NavItem icon={Bell} label="Notifications" />
            <NavItem icon={Shield} label="Security" />
            <NavItem icon={Palette} label="Appearance" />
          </nav>
        </div>
      </BentoCardContent>
    </BentoCard>,
  ];

  // 4 columns — each row has 4, 3 of them get a random inset width so the masonry breathes
  const MARQUEE_WIDTHS = ["w-[100%]", "w-[96%]", "w-[93%]", "w-[98%]"] as const;
  const columns: React.ReactNode[][] = [[], [], [], []];
  galleryCards.forEach((card, i) => columns[i % 4].push(card));

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-title"
      className="relative w-full overflow-hidden border-b border-zinc-100 bg-zinc-50/60 px-4 py-12 sm:px-8 sm:py-16 dark:border-white/5 dark:bg-[#03071200]"
    >
      {/* Subtle blue gradient glow — matches hero */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[50%] -right-[-20%] -left-[-30%] h-[60%] w-[40%] rounded-full bg-blue-500/5 blur-[120px] dark:bg-blue-600/10" />
        <div className="absolute -bottom-[20%] -left-[10%] h-[50%] w-[100%] rounded-full bg-blue-400/5 blur-[100px] dark:bg-blue-500/8" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="mb-12 max-w-2xl"
        >
          <span className="mb-1 inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-2 text-xs font-semibold tracking-wide text-blue-600 uppercase dark:text-blue-400">
            Hudbird UI — Component Gallery
          </span>
          <h1
            id="gallery-title"
            className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-white"
          >
            Every primitive, ready to compose
          </h1>
          <p className="mt-4 mb-24 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            Atomic core components, molecule-level sections, and data-driven templates — the
            building blocks behind every hudbird interface.
          </p>
        </motion.div>

        {/* 4-per-row bento marquee — transform-only y, no layout thrash */}
        <BentoGrid className="auto-rows-auto items-start gap-4 [mask-image:linear-gradient(to_bottom,black_78%,transparent_100%)] sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
          {columns.map((col, colIdx) => (
            <div
              key={colIdx}
              className="relative h-[560px] overflow-hidden sm:h-[640px] lg:h-[720px]"
            >
              {/* soft top/bottom fade — ui-ux featherweight */}
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-10 bg-gradient-to-b from-zinc-50/60 to-transparent dark:from-[#030712]" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-10 bg-gradient-to-t from-zinc-50/60 to-transparent dark:from-[#030712]" />
              <motion.div
                className="flex flex-col gap-4 will-change-transform sm:gap-5"
                animate={{ y: colIdx % 2 === 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
                transition={{ duration: 26 + colIdx * 2.5, repeat: Infinity, ease: "linear" }}
              >
                {[...col, ...col].map((card, idx) => {
                  const rowInCol = idx % col.length;
                  // 3 of 4 per visual row get a random inset width — cheap masonry variance
                  const widthCls =
                    colIdx === 3 && rowInCol % 4 === 3
                      ? MARQUEE_WIDTHS[0]
                      : MARQUEE_WIDTHS[(rowInCol * 3 + colIdx) % MARQUEE_WIDTHS.length];
                  const isNarrow = widthCls !== MARQUEE_WIDTHS[0];
                  return (
                    <div
                      key={`${colIdx}-${idx}`}
                      className={`${widthCls} ${isNarrow ? "mx-auto" : ""} shrink-0`}
                    >
                      {card}
                    </div>
                  );
                })}
              </motion.div>
            </div>
          ))}
        </BentoGrid>
      </div>
    </section>
  );
};
