import React, { useState } from "react";
import {
  Hero,
  HeroBadge,
  HeroTitle,
  HeroDescription,
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
  CtaCentered,
  FooterMega,
  TestimonialsGlobe,
} from "@hudbird/marketing";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@hudbird/ui";
import {
  Smartphone,
  Zap,
  Shield,
  MessageCircle,
  Video,
  FileText,
  CloudLightning,
  Lock,
  Globe,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Phone,
  Mail,
  Home,
  Clock,
  BookOpen,
  Settings,
  Paperclip,
  Wrench,
  ArrowUp,
  Image as ImageIcon,
  Mic,
  ListChecks,
  PenTool,
  Bot,
} from "lucide-react";

import { ParticleSphere } from "@hudbird/marketing";
import { motion, useMotionValue, useSpring, useScroll, useMotionValueEvent } from "framer-motion";

export const logos = [
  { name: "React", src: "/assets/marketing-section/logo/react-dev-logo.png" },
  { name: "OpenAI", src: "/assets/marketing-section/logo/openai-com-brandmark.svg" },
  { name: "NPM", src: "/assets/marketing-section/logo/npmjs-com-logo.png" },
  { name: "Claude", src: "/assets/marketing-section/logo/ai-claude-net-logo.png" },
  { name: "Nike", src: "/assets/marketing-section/logo/nike-com-brandmark.svg" },
];

export const MEGA_LINK_GROUPS = [
  {
    title: "Platform",
    links: [
      { label: "HD Video Calls", href: "#" },
      { label: "Smart Messaging", href: "#" },
      { label: "File Sharing", href: "#" },
      { label: "Security", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Help Center", href: "#" },
      { label: "API Docs", href: "#" },
      { label: "Community", href: "#" },
      { label: "Status", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Pulse", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Contact Us", href: "#" },
    ],
  },
];

export const SOCIALS = [{ label: "Twitter", href: "#", icon: <Globe className="h-5 w-5" /> }];

export const MINIMAL_FEATURES = [
  {
    icon: <Bot className="h-5 w-5" />,
    title: "AI Co-founders",
    description: "Spin up specialized AI agents for marketing, code, and design.",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Built for speed",
    description: "Execute complex workflows in seconds, not weeks.",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: "Automated Publishing",
    description: "Draft, schedule, and publish content across all your channels.",
  },
  {
    icon: <Lock className="h-5 w-5" />,
    title: "Absolute privacy",
    description: "Your business strategies and prompts stay completely private.",
  },
  {
    icon: <Clock className="h-5 w-5" />,
    title: "24/7 Execution",
    description: "Your AI team works around the clock while you sleep.",
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "Self-improving",
    description: "Pulse learns your brand voice and coding style over time.",
  },
  {
    icon: <Wrench className="h-5 w-5" />,
    title: "Instant integrations",
    description: "Connect to Stripe, Vercel, and GitHub with zero config.",
  },
  {
    icon: <FileText className="h-5 w-5" />,
    title: "Infinite memory",
    description: "Instantly recall every generated asset and past conversation.",
  },
];

export const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export const MatrixText = ({ children }: { children: React.ReactNode }) => {
  const text = typeof children === "string" ? children : "";
  const [displayText, setDisplayText] = React.useState(text);
  const [isHovering, setIsHovering] = React.useState(false);

  React.useEffect(() => {
    if (!isHovering || !text) {
      setDisplayText(text);
      return;
    }
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$*";
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration || letter === " ") {
              return text[index];
            }
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("")
      );
      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 3;
    }, 20);

    return () => clearInterval(interval);
  }, [isHovering, text]);

  if (!text) return <>{children}</>;

  return (
    <span
      className="relative inline-flex cursor-pointer items-center overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <span
        className={`transition-colors duration-300 ${isHovering ? "font-medium text-rose-500 dark:text-rose-400" : ""}`}
      >
        {displayText}
      </span>
      {isHovering && (
        <motion.span
          layoutId="navbar-hover"
          className="absolute right-0 -bottom-1 left-0 h-[2px] bg-rose-500 shadow-[0_0_8px_rgba(225,29,72,0.8)] dark:bg-rose-400"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          exit={{ opacity: 0, scaleX: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </span>
  );
};

export const CyberSectionDivider = () => (
  <div className="pointer-events-none absolute top-0 right-0 left-0 z-30">
    <div className="absolute -top-[1px] left-1/2 h-[2px] w-[2px] -translate-x-1/2 rounded-full bg-rose-500 shadow-[0_0_10px_4px_rgba(225,29,72,0.3)] dark:bg-white dark:shadow-[0_0_10px_4px_rgba(255,255,255,0.5),0_0_20px_8px_rgba(225,29,72,0.3)]" />
    <div className="absolute top-0 left-1/2 h-[1px] w-[50%] max-w-[600px] -translate-x-1/2 bg-gradient-to-r from-rose-500/0 via-rose-500/40 to-rose-500/0 dark:via-white/30 dark:shadow-[0_0_5px_rgba(255,255,255,0.2),0_0_15px_rgba(225,29,72,0.15)]" />
    <div className="absolute top-0 left-1/2 h-[10px] w-[30%] max-w-[400px] -translate-x-1/2 bg-gradient-to-r from-rose-600/0 via-rose-600/10 to-rose-600/0 blur-[6px] dark:via-rose-500/15" />
  </div>
);
