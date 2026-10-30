import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Text, Badge, Input, Textarea } from "@hudbird/ui";
import {
  Sparkles,
  BrainCircuit,
  MessageSquare,
  Moon,
  Sun,
  Monitor,
  Code2,
  Layers,
  Cpu,
  Network,
  Zap,
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
} from "lucide-react";
import { DiscordIcon, GithubIcon } from "../../../components/SocialIcons";

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

export const logos = [
  { name: "TechCrunch", src: "/assets/marketing-section/logo/react-dev-logo.png" },
  { name: "Wired", src: "/assets/marketing-section/logo/openai-com-brandmark.svg" },
  { name: "Forbes", src: "/assets/marketing-section/logo/npmjs-com-logo.png" },
  { name: "Bloomberg", src: "/assets/marketing-section/logo/ai-claude-net-logo.png" },
  { name: "Verge", src: "/assets/marketing-section/logo/nike-com-brandmark.svg" },
  { name: "OpenAI", src: "/assets/marketing-section/logo/openai-com-brandmark.svg" },
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
      { label: "Navbar", href: "/#/navbar" },
      { label: "Divider", href: "/#/divider" },
      { label: "Heading", href: "/#/heading" },
      { label: "Text", href: "/#/text" },
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
      { label: "Description list", href: "/#/description-list" },
      { label: "Fieldset", href: "/#/fieldset" },
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
    action: (
      <a
        href="/#/blocks"
        className="group relative mt-2 inline-flex overflow-hidden rounded-xl p-[1px] text-xs font-medium"
      >
        <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#3b82f6_50%,#0000_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#60a5fa_50%,#0000_100%)]" />
        <span className="relative flex h-full w-full items-center justify-center rounded-xl bg-white px-3 py-1.5 transition-colors group-hover:bg-zinc-50 dark:bg-zinc-950 dark:group-hover:bg-zinc-900">
          <span className="whitespace-nowrap text-zinc-700 transition-colors group-hover:text-zinc-900 dark:text-zinc-300 dark:group-hover:text-white">
            +40 more blocks
          </span>
          <ArrowRight className="ml-1 h-3 w-3 text-zinc-500 transition-colors group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-white" />
        </span>
      </a>
    ),
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
    title: "Charts",
    links: [
      { label: "Area Chart", href: "/#/area-chart" },
      { label: "Bar Chart", href: "/#/bar-chart" },
      { label: "Line Chart", href: "/#/line-chart" },
      { label: "Pie Chart", href: "/#/pie-chart" },
      { label: "Composed Chart", href: "/#/composed-chart" },
      { label: "Radar Chart", href: "/#/radar-chart" },
      { label: "Radial Chart", href: "/#/radial-chart" },
      { label: "Chart Tooltip", href: "/#/chart-tooltip" },
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
      { label: "Discord Community", href: "https://discord.gg/NPBspwkXke" },
      { label: "GitHub", href: "https://github.com/gpamdani-git/Hudbird" },
    ],
  },
];
export const SOCIALS = [
  {
    label: "Discord",
    href: "https://discord.gg/NPBspwkXke",
    icon: <DiscordIcon className="h-5 w-5" />,
  },
  {
    label: "GitHub",
    href: "https://github.com/gpamdani-git/Hudbird",
    icon: <GithubIcon className="h-5 w-5" />,
  },
  { label: "Twitter", href: "#", icon: <MessageSquare className="h-5 w-5" /> },
];

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
export const FolderIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 opacity-70">
    <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
  </svg>
);

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

// Observes the class-based Tailwind v4 dark variant (`<html class="dark">`)
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
