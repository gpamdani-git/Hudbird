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
import { TemplateThemeToggle } from "./TemplateThemeToggle";
import { ParticleSphere } from "@hudbird/marketing";
import { motion, useMotionValue, useSpring, useScroll, useMotionValueEvent } from "framer-motion";

const logos = [
  { name: "React", src: "/assets/marketing-section/logo/react-dev-logo.png" },
  { name: "OpenAI", src: "/assets/marketing-section/logo/openai-com-brandmark.svg" },
  { name: "NPM", src: "/assets/marketing-section/logo/npmjs-com-logo.png" },
  { name: "Claude", src: "/assets/marketing-section/logo/ai-claude-net-logo.png" },
  { name: "Nike", src: "/assets/marketing-section/logo/nike-com-brandmark.svg" },
];

const MEGA_LINK_GROUPS = [
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

const SOCIALS = [{ label: "Twitter", href: "#", icon: <Globe className="h-5 w-5" /> }];

const MINIMAL_FEATURES = [
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

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const MatrixText = ({ children }: { children: React.ReactNode }) => {
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

const CyberSectionDivider = () => (
  <div className="pointer-events-none absolute top-0 right-0 left-0 z-30">
    <div className="absolute -top-[1px] left-1/2 h-[2px] w-[2px] -translate-x-1/2 rounded-full bg-rose-500 shadow-[0_0_10px_4px_rgba(225,29,72,0.3)] dark:bg-white dark:shadow-[0_0_10px_4px_rgba(255,255,255,0.5),0_0_20px_8px_rgba(225,29,72,0.3)]" />
    <div className="absolute top-0 left-1/2 h-[1px] w-[50%] max-w-[600px] -translate-x-1/2 bg-gradient-to-r from-rose-500/0 via-rose-500/40 to-rose-500/0 dark:via-white/30 dark:shadow-[0_0_5px_rgba(255,255,255,0.2),0_0_15px_rgba(225,29,72,0.15)]" />
    <div className="absolute top-0 left-1/2 h-[10px] w-[30%] max-w-[400px] -translate-x-1/2 bg-gradient-to-r from-rose-600/0 via-rose-600/10 to-rose-600/0 blur-[6px] dark:via-rose-500/15" />
  </div>
);

export const ModernAppTemplate = () => {
  const { scrollY } = useScroll();
  const [navVisible, setNavVisible] = useState(true);
  const [navCompact, setNavCompact] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() || 0;
    const diff = current - previous;

    if (current > 50) {
      setNavCompact(true);
    } else {
      setNavCompact(false);
    }

    if (current > 150 && diff > 5) {
      setNavVisible(false);
    } else if (diff < -5 || current <= 150) {
      setNavVisible(true);
    }
  });

  return (
    <div className="flex min-h-screen w-full flex-col bg-zinc-50 selection:bg-rose-500/30 dark:bg-zinc-950">
      <TemplateThemeToggle />

      {/* Floating Navbar */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: navVisible ? 0 : -100,
          opacity: navVisible ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed inset-x-0 top-4 z-[100] mx-auto w-full max-w-4xl px-4 sm:top-6"
      >
        <Navbar
          styleVariant="floating-full"
          position="static"
          className={`!mx-auto !mt-0 transition-all duration-300 ${
            navCompact
              ? "!max-w-2xl !py-0 [&>div:first-child]:!h-[48px]"
              : "!max-w-3xl !py-1 [&>div:first-child]:!h-[56px]"
          } !border-zinc-200/80 !bg-white/80 !px-2 !shadow-2xl !backdrop-blur-2xl dark:!border-white/10 dark:!bg-[#12141d]/85 [&>div:first-child]:!px-2`}
        >
          <NavbarBrand>
            <div className="flex items-center gap-2 pl-2">
              <div className="flex items-center justify-center text-rose-500 dark:text-rose-400">
                <Smartphone className="h-5 w-5" fill="currentColor" />
              </div>
              <span className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
                Pulse
              </span>
            </div>
          </NavbarBrand>

          <NavbarContent justify="center" className="gap-6">
            <NavbarItem>
              <MatrixText>Home</MatrixText>
            </NavbarItem>
            <NavbarItem className="group flex items-center gap-1">
              <MatrixText>Features</MatrixText>{" "}
              <ChevronDown className="h-3.5 w-3.5 opacity-70 transition-transform group-hover:rotate-180" />
            </NavbarItem>
            <NavbarItem className="group flex items-center gap-1">
              <MatrixText>Solutions</MatrixText>{" "}
              <ChevronDown className="h-3.5 w-3.5 opacity-70 transition-transform group-hover:rotate-180" />
            </NavbarItem>
            <NavbarItem>
              <MatrixText>Pricing</MatrixText>
            </NavbarItem>
          </NavbarContent>

          <NavbarContent justify="end">
            <button className="hidden rounded-full bg-rose-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-rose-700 md:inline-flex dark:bg-[#e11d48] dark:hover:bg-rose-500">
              Download
            </button>
          </NavbarContent>

          <NavbarMenuToggle />

          <NavbarMenu
            variant="top"
            isContained={false}
            className="!bg-white/95 !backdrop-blur-3xl !backdrop-saturate-200 dark:!border-white/10 dark:!bg-[#070912]/95"
          >
            <NavbarMenuItem>
              <MatrixText>Home</MatrixText>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <MatrixText>Features</MatrixText>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <MatrixText>Solutions</MatrixText>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <MatrixText>Pricing</MatrixText>
            </NavbarMenuItem>
            <div className="mt-4 flex flex-col gap-2">
              <button className="rounded-full bg-rose-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-rose-700 dark:bg-[#e11d48] dark:hover:bg-rose-500">
                Download
              </button>
            </div>
          </NavbarMenu>
        </Navbar>
      </motion.div>

      {/* Hero Section */}
      <div className="relative">
        <Hero
          size="full"
          className="relative overflow-hidden bg-zinc-50 text-zinc-900 transition-colors duration-500 dark:bg-[#020617] dark:text-white"
        >
          {/* Starry background effect (CSS radial gradients) */}
          <div
            className="pointer-events-none absolute inset-0 z-0 dark:hidden"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, rgba(0,0,0,0.05) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 z-0 hidden dark:block"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          {/* Deep background glow and intense vertical beam */}
          <div className="pointer-events-none absolute inset-0 z-0 flex flex-col items-center justify-end overflow-hidden">
            {/* === Huly-Style Cone Beam of Light (Masked to fade out before mockup) === */}
            <div
              className="absolute inset-0"
              style={{
                WebkitMaskImage: "linear-gradient(to bottom, white 0%, white 35%, transparent 60%)",
                maskImage: "linear-gradient(to bottom, white 0%, white 35%, transparent 60%)",
              }}
            >
              {/* Gaussian Blur wrapper — softens all polygon edges into organic light */}
              <div className="absolute inset-0" style={{ filter: "blur(18px)" }}>
                {/* Layer 1: Widest outer atmospheric cone */}
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{ duration: 1.8, ease: "easeOut" }}
                  style={{
                    transformOrigin: "top center",
                    clipPath: "polygon(49% 0%, 51% 0%, 80% 100%, 20% 100%)",
                  }}
                  className="absolute top-0 left-1/2 h-[90%] w-[800px] -translate-x-1/2 bg-gradient-to-b from-rose-500/10 via-rose-500/20 to-transparent dark:from-rose-500/5 dark:via-rose-500/10 dark:to-rose-600/5"
                />

                {/* Layer 2: Medium cone */}
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 0.9, scaleY: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.15 }}
                  style={{
                    transformOrigin: "top center",
                    clipPath: "polygon(49.2% 0%, 50.8% 0%, 72% 100%, 28% 100%)",
                  }}
                  className="absolute top-0 left-1/2 h-[90%] w-[800px] -translate-x-1/2 bg-gradient-to-b from-rose-500/20 via-rose-500/15 to-transparent dark:from-rose-500/10 dark:via-rose-500/10 dark:to-transparent"
                />

                {/* Layer 3: Inner bright cone */}
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{ duration: 1.3, ease: "easeOut", delay: 0.2 }}
                  style={{
                    transformOrigin: "top center",
                    clipPath: "polygon(49.5% 0%, 50.5% 0%, 62% 100%, 38% 100%)",
                  }}
                  className="absolute top-0 left-1/2 h-[90%] w-[800px] -translate-x-1/2 bg-gradient-to-b from-rose-500/30 via-rose-500/20 to-transparent dark:from-rose-500/20 dark:via-rose-400/10 dark:to-transparent"
                />

                {/* Layer 4: Intense core — very narrow, white-hot */}
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                  style={{
                    transformOrigin: "top center",
                    clipPath: "polygon(49.8% 0%, 50.2% 0%, 55% 100%, 45% 100%)",
                  }}
                  className="absolute top-0 left-1/2 h-[90%] w-[800px] -translate-x-1/2 bg-gradient-to-b from-rose-500/40 via-rose-500/30 to-transparent dark:from-rose-300/30 dark:via-rose-300/15 dark:to-transparent"
                />
              </div>

              {/* Layer 5: The sharp center line (outside blur wrapper to stay crisp) */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "88%", opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute top-0 left-1/2 w-[2px] -translate-x-1/2 bg-gradient-to-b from-rose-500 via-rose-400 to-transparent shadow-[0_0_10px_rgba(225,29,72,0.2)] dark:from-white/70 dark:via-rose-200/50 dark:to-transparent dark:shadow-[0_0_10px_rgba(255,255,255,0.5),0_0_20px_rgba(225,29,72,0.4)]"
              />

              {/* Layer 6: Moving beam pulse traveling down the cone */}
              <motion.div
                whileInView={{ top: ["-10%", "90%"], opacity: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                className="absolute left-1/2 h-[20vh] w-[6px] -translate-x-1/2 bg-gradient-to-b from-transparent via-rose-500 to-transparent shadow-[0_0_15px_rgba(225,29,72,0.3)] dark:via-white/70 dark:shadow-[0_0_10px_rgba(255,255,255,0.7),0_0_30px_rgba(225,29,72,0.4)]"
              />
              {/* Moving pulse — expanding halo */}
              <motion.div
                whileInView={{
                  top: ["-10%", "90%"],
                  opacity: [0, 0.4, 0],
                  width: ["40px", "200px"],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                className="absolute left-1/2 h-[20vh] -translate-x-1/2 bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,rgba(225,29,72,0.2)_0%,transparent_70%)] blur-[20px] dark:bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_70%)]"
              />
            </div>

            {/* Aura Smoke Effect (Optimized: No border-radius morphing, no mouse tracking) */}
            <div className="pointer-events-none absolute top-[50%] left-1/2 h-[500px] w-[800px] -translate-x-1/2 opacity-60 sm:w-[1200px]">
              {/* Primary rotating smoke blob */}
              <motion.div
                whileInView={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-[40%_60%_70%_30%] bg-rose-600/15 blur-[60px] will-change-transform dark:bg-rose-700/20 dark:blur-[80px]"
              />
              {/* Secondary counter-rotating smoke blob (added subtle violet) */}
              <motion.div
                whileInView={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-[60%_40%_30%_70%] bg-violet-500/10 blur-[50px] will-change-transform dark:bg-violet-600/15 dark:blur-[70px]"
              />
            </div>

            {/* Bottom horizon line blur */}
            <div className="absolute right-0 bottom-0 left-0 h-64 bg-gradient-to-t from-zinc-50 via-zinc-50/80 to-transparent dark:from-[#020617] dark:via-[#020617]/80" />
          </div>

          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 pt-32 sm:pt-40 lg:pt-48">
            {/* Text Contrast Enhancer (radial fade behind text) */}
            <div className="pointer-events-none absolute top-40 left-1/2 -z-10 h-[400px] w-full max-w-[800px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.6)_0%,transparent_70%)] blur-[20px] dark:bg-[radial-gradient(ellipse_at_center,rgba(2,6,23,0.8)_0%,transparent_70%)]" />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              viewport={{ once: true, margin: "-50px" }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <HeroBadge className="mx-auto flex w-fit items-center gap-3 rounded-full border border-zinc-200 bg-white/50 px-4 py-1.5 text-sm font-medium tracking-wide text-zinc-700 shadow-[0_0_15px_rgba(225,29,72,0.05)] backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:shadow-[0_0_15px_rgba(225,29,72,0.15)]">
                <Sparkles className="h-3.5 w-3.5 text-rose-500 dark:text-rose-400" />
                <span>Meet your new AI co-founder</span>
              </HeroBadge>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true, margin: "-50px" }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <HeroTitle className="mt-6 text-center text-5xl leading-tight font-medium tracking-tight text-zinc-900 drop-shadow-sm sm:text-6xl md:text-[4.5rem] dark:text-white dark:drop-shadow-md">
                The Future AI Team <br className="hidden md:block" /> for Solopreneurs
              </HeroTitle>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true, margin: "-50px" }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <HeroDescription className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-zinc-500 dark:text-zinc-400">
                Plan, execute, and scale faster. Pulse gives you a marketing, engineering, and
                design team—all powered by an intelligent AI assistant working 24/7.
              </HeroDescription>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true, margin: "-50px" }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex w-full justify-center"
            >
              <form className="relative flex w-full max-w-md items-center gap-2 rounded-full border border-zinc-200 bg-white/80 p-1.5 pl-6 shadow-[0_0_20px_rgba(225,29,72,0.1)] backdrop-blur-xl transition-all focus-within:border-rose-500/50 focus-within:bg-white dark:border-white/20 dark:bg-white/5 dark:shadow-[0_0_40px_rgba(225,29,72,0.2)] dark:focus-within:bg-white/10">
                <Mail className="h-5 w-5 text-zinc-400" />
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="w-full flex-1 bg-transparent text-sm text-zinc-900 placeholder-zinc-400 outline-none dark:text-white dark:placeholder-zinc-500"
                  required
                />
                <button
                  type="button"
                  className="shrink-0 rounded-full bg-rose-600 px-8 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(225,29,72,0.4)] transition hover:bg-rose-500"
                >
                  Hire your AI
                </button>
              </form>
            </motion.div>
          </div>

          {/* Desktop App UI Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            viewport={{ once: true, margin: "-50px" }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative z-20 mx-auto mt-20 w-full max-w-6xl cursor-default px-4 pb-0"
          >
            {/* === Light Splash — beam hitting the mockup surface === */}

            {/* Bright impact point (intense white center) */}
            <div className="absolute -top-1 left-1/2 z-30 h-[6px] w-[6px] -translate-x-1/2 rounded-full bg-rose-500 shadow-[0_0_20px_8px_rgba(225,29,72,0.6),0_0_60px_20px_rgba(225,29,72,0.4)] dark:bg-white dark:shadow-[0_0_20px_8px_rgba(255,255,255,0.9),0_0_60px_20px_rgba(225,29,72,0.6)]" />

            {/* Sharp horizontal line (the visible edge glow) */}
            <div className="absolute top-0 left-1/2 z-30 h-[2px] w-[85%] -translate-x-1/2 bg-gradient-to-r from-rose-500/0 via-rose-500/80 to-rose-500/0 shadow-[0_0_10px_rgba(225,29,72,0.5),0_0_30px_rgba(225,29,72,0.3)] dark:via-white/90 dark:shadow-[0_0_10px_rgba(255,255,255,0.8),0_0_30px_rgba(225,29,72,0.5)]" />

            {/* Medium horizontal spread (rose-tinted) */}
            <div className="absolute -top-2 left-1/2 z-30 h-[20px] w-[70%] -translate-x-1/2 bg-gradient-to-r from-rose-500/0 via-rose-500/40 to-rose-500/0 blur-[6px] dark:via-rose-400/50" />

            {/* Wide diffused halo (atmospheric spread) */}
            <div className="absolute -top-4 left-1/2 z-30 h-[60px] w-[60%] -translate-x-1/2 bg-gradient-to-r from-rose-600/0 via-rose-600/20 to-rose-600/0 blur-[20px] dark:via-rose-500/30" />

            {/* Vertical light bleeding downward into the mockup */}
            <div className="absolute top-0 left-1/2 z-30 h-[150px] w-[250px] -translate-x-1/2 bg-[radial-gradient(ellipse_100%_100%_at_50%_0%,rgba(225,29,72,0.15)_0%,rgba(225,29,72,0.05)_40%,rgba(225,29,72,0)_100%)] blur-[20px] dark:bg-[radial-gradient(ellipse_100%_100%_at_50%_0%,rgba(255,255,255,0.15)_0%,rgba(225,29,72,0.08)_40%,rgba(225,29,72,0)_100%)]" />

            {/* Animated Border Wrapper */}
            <div
              className="relative overflow-hidden rounded-t-[2rem] p-[1px]"
              style={{
                WebkitMaskImage: "linear-gradient(to bottom, white 60%, transparent 100%)",
                maskImage: "linear-gradient(to bottom, white 60%, transparent 100%)",
              }}
            >
              {/* Inner Content (The Mockup itself) */}
              <div className="relative flex h-auto min-h-[500px] w-full flex-col overflow-hidden rounded-t-[2rem] bg-white/40 shadow-[0_-20px_80px_-15px_rgba(225,29,72,0.1),0_20px_80px_-15px_rgba(139,92,246,0.1)] ring-1 ring-white/50 backdrop-blur-3xl transition-colors duration-500 ring-inset sm:h-[650px] dark:bg-[#020617]/40 dark:shadow-[0_-20px_80px_-15px_rgba(225,29,72,0.2),0_20px_80px_-15px_rgba(139,92,246,0.2)] dark:ring-white/10">
                <div className="flex h-full w-full">
                  {/* Main Area */}
                  <div className="relative flex flex-1 flex-col items-center justify-center bg-transparent p-6 py-16 sm:p-8 sm:py-8">
                    {/* Huge ambient gradient glow at the top (Fading effect matching reference, with violet accent) */}
                    <motion.div
                      whileInView={{
                        opacity: [0.4, 0.7, 0.4],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="pointer-events-none absolute top-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(159,18,57,0.15)_0%,rgba(139,92,246,0.1)_40%,rgba(159,18,57,0)_80%)] blur-[40px] dark:bg-[radial-gradient(ellipse_at_center,rgba(190,18,60,0.2)_0%,rgba(139,92,246,0.15)_40%,rgba(190,18,60,0)_80%)]"
                    />

                    {/* Particle Sphere Orb */}
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="relative z-10 mb-8 h-[140px] w-[140px] shrink-0 sm:mb-10 sm:h-[180px] sm:w-[180px]"
                    >
                      <ParticleSphere particleColor="#f43f5e" className="scale-[1.1]" />
                    </motion.div>

                    {/* Greeting Text */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="relative z-10 text-center"
                    >
                      <h2 className="text-xl font-medium text-zinc-500 sm:text-2xl dark:text-zinc-400">
                        Hi, Founder
                      </h2>
                      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
                        What are we shipping today?
                      </h1>
                      <p className="mx-auto mt-4 max-w-sm text-xs text-zinc-500 sm:text-sm">
                        Your AI team is standing by. Let's execute your vision.
                      </p>
                    </motion.div>

                    {/* Prompt Input Area */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="relative z-10 mt-10 w-full max-w-2xl rounded-2xl border border-white/40 bg-white/30 p-2 shadow-sm ring-1 ring-white/50 backdrop-blur-2xl ring-inset sm:mt-12 dark:border-white/5 dark:bg-black/30 dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] dark:ring-white/10"
                    >
                      <div className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-rose-600 dark:text-rose-400">
                        <Sparkles className="h-3 w-3" />
                        Unlock more features with Pro
                      </div>
                      <div className="mt-1 rounded-xl border border-white/50 bg-white/60 p-4 shadow-sm backdrop-blur-md dark:border-white/5 dark:bg-white/5 dark:shadow-none">
                        <input
                          type="text"
                          placeholder="Ask me anything..."
                          className="w-full bg-transparent text-sm text-zinc-900 placeholder-zinc-500 outline-none dark:text-white dark:placeholder-zinc-400"
                        />
                        <div className="mt-6 flex items-center justify-between sm:mt-8">
                          <div className="flex items-center gap-4 sm:gap-6">
                            <button className="flex items-center gap-2 text-xs font-medium text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                              <Paperclip className="h-4 w-4" />{" "}
                              <span className="hidden sm:inline">Import file</span>
                            </button>
                            <button className="flex items-center gap-2 text-xs font-medium text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                              <Wrench className="h-4 w-4" />{" "}
                              <span className="hidden sm:inline">Tools</span>
                            </button>
                          </div>
                          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-600 text-white shadow-[0_0_15px_rgba(225,29,72,0.4)] transition hover:bg-rose-500">
                            <ArrowUp className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>

                    {/* Suggestion Cards */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="relative z-10 mt-6 flex w-full max-w-2xl flex-col gap-3 sm:flex-row sm:gap-4"
                    >
                      <div className="group flex-1 cursor-pointer rounded-xl border border-white/40 bg-white/30 p-4 shadow-sm ring-1 ring-white/50 backdrop-blur-xl transition ring-inset hover:bg-white/50 dark:border-white/5 dark:bg-black/30 dark:shadow-[0_4px_15px_rgba(0,0,0,0.5)] dark:ring-white/10 dark:hover:bg-white/10">
                        <div className="mb-1.5 flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-white">
                          <MessageCircle className="h-4 w-4 text-rose-500 transition group-hover:text-rose-600 dark:text-rose-400 dark:group-hover:text-rose-300" />{" "}
                          Surprise me!
                        </div>
                        <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                          Surprise me with a creative idea or story.
                        </p>
                      </div>
                      <div className="group flex-1 cursor-pointer rounded-xl border border-white/40 bg-white/30 p-4 shadow-sm ring-1 ring-white/50 backdrop-blur-xl transition ring-inset hover:bg-white/50 dark:border-white/5 dark:bg-black/30 dark:shadow-[0_4px_15px_rgba(0,0,0,0.5)] dark:ring-white/10 dark:hover:bg-white/10">
                        <div className="mb-1.5 flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-white">
                          <ImageIcon className="h-4 w-4 text-rose-500 transition group-hover:text-rose-600 dark:text-rose-400 dark:group-hover:text-rose-300" />{" "}
                          Create image
                        </div>
                        <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                          Create an image from your idea or prompt.
                        </p>
                      </div>
                      <div className="group hidden flex-1 cursor-pointer rounded-xl border border-white/40 bg-white/30 p-4 shadow-sm ring-1 ring-white/50 backdrop-blur-xl transition ring-inset hover:bg-white/50 sm:block dark:border-white/5 dark:bg-black/30 dark:shadow-[0_4px_15px_rgba(0,0,0,0.5)] dark:ring-white/10 dark:hover:bg-white/10">
                        <div className="mb-1.5 flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-white">
                          <FileText className="h-4 w-4 text-rose-500 transition group-hover:text-rose-600 dark:text-rose-400 dark:group-hover:text-rose-300" />{" "}
                          Summarise
                        </div>
                        <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                          Summarise a document or text in seconds.
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </Hero>
      </div>

      {/* Logo Cloud Section */}
      <LogoCloud className="relative overflow-hidden border-t border-zinc-100 bg-white py-16 dark:border-white/5 dark:bg-[#070912]">
        {/* Subtle violet ambient glow for dark mode */}
        <div className="pointer-events-none absolute inset-0 z-0 hidden bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.05)_0%,transparent_60%)] dark:block" />

        <LogoCloudTitle className="relative z-10 mb-8 text-sm font-medium tracking-wide text-zinc-500 dark:text-zinc-400">
          INTEGRATES WITH YOUR FAVORITE TOOLS
        </LogoCloudTitle>
        <LogoCloudTicker speed="slow">
          {logos.map((logo, index) => (
            <LogoCloudItem key={index} className="mx-12 w-32 shrink-0">
              <img
                src={logo.src}
                alt={logo.name}
                className="h-7 w-auto object-contain opacity-40 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 dark:opacity-60 dark:invert dark:hover:invert-0"
              />
            </LogoCloudItem>
          ))}
        </LogoCloudTicker>
      </LogoCloud>

      {/* Minimalist Grid Section (Reflect-style) */}
      <div className="relative overflow-hidden border-t border-zinc-100 bg-white py-24 dark:border-white/5 dark:bg-[#070912]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Grid Container with Faded Borders Mask */}
          <div className="relative">
            {/* Background Grid Lines with Radial Mask */}
            <div
              className="pointer-events-none absolute inset-0 hidden md:block"
              style={{
                maskImage: "radial-gradient(ellipse at center, black 40%, transparent 70%)",
                WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 70%)",
              }}
            >
              {/* Horizontal Divider */}
              <div className="absolute top-1/2 left-0 h-px w-full bg-zinc-200 dark:bg-white/10" />

              {/* Vertical Dividers for 4 columns */}
              <div className="absolute top-0 bottom-0 left-1/4 w-px bg-zinc-200 dark:bg-white/10" />
              <div className="absolute top-0 bottom-0 left-2/4 w-px bg-zinc-200 dark:bg-white/10" />
              <div className="absolute top-0 bottom-0 left-3/4 w-px bg-zinc-200 dark:bg-white/10" />
            </div>

            {/* Grid Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
            >
              {MINIMAL_FEATURES.map((feature, i) => (
                <motion.div
                  variants={itemVariants}
                  key={i}
                  className="group relative flex cursor-pointer flex-col p-8 transition-colors sm:p-10"
                >
                  {/* Hover glow effect behind item with violet accent */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:via-violet-500/15" />

                  <div className="relative mb-6 flex items-center text-zinc-400 transition-colors duration-300 group-hover:text-rose-500 dark:text-zinc-500 dark:group-hover:text-rose-400">
                    {feature.icon}
                  </div>
                  <h3 className="relative mb-3 text-sm font-semibold tracking-tight text-zinc-900 transition-colors group-hover:text-rose-600 dark:text-white dark:group-hover:text-rose-400">
                    {feature.title}
                  </h3>
                  <p className="relative text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Reflect AI-style AI Feature Section */}
      <section className="relative flex flex-col items-center overflow-hidden bg-zinc-50 pt-32 pb-40 font-sans transition-colors duration-500 dark:bg-[#05050A]">
        {/* Starry Background (subtle) */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-40 dark:opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, var(--tw-gradient-stops) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse at center, black 20%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 80%)",
          }}
        >
          <div
            className="absolute inset-0 bg-[rgba(0,0,0,0.1)] dark:bg-[rgba(255,255,255,1)]"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 0.1 }}
          />
        </div>

        {/* Top Header */}
        <div className="relative z-10 flex flex-col items-center px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 rounded-full border border-zinc-200 bg-white/50 px-3 py-1 text-xs font-medium text-zinc-600 backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-white/80"
          >
            Your AI Employees
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="mb-6 text-4xl font-medium tracking-tight text-zinc-900 md:text-5xl lg:text-6xl dark:text-white"
          >
            Delegate tasks to your AI team
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl text-lg text-zinc-500 dark:text-white/60"
          >
            Pulse uses advanced LLMs to execute marketing, coding,
            <br className="hidden md:block" />
            and design tasks, acting as your 24/7 intelligent workforce.
          </motion.p>
        </div>

        {/* 3D Grid & Beam Illustration */}
        <div className="relative mt-24 flex h-[500px] w-full max-w-5xl flex-col items-center justify-start pt-16">
          {/* Glowing Beam Source (Portal) */}
          {/* Glowing Beam Source (Portal) */}
          <div className="absolute top-[250px] z-0 h-[2px] w-[300px] rounded-full bg-gradient-to-r from-rose-500 via-violet-400 to-rose-500 shadow-[0_0_20px_10px_rgba(244,63,94,0.3),0_0_40px_5px_rgba(139,92,246,0.2)] dark:shadow-[0_0_40px_20px_rgba(244,63,94,0.5),0_0_60px_10px_rgba(139,92,246,0.3)]" />

          {/* Vertical Upward Beam with violet edge */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            whileInView={{ opacity: 1, height: "400px" }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="absolute bottom-[calc(100%-250px)] left-1/2 z-0 w-[200px] -translate-x-1/2 bg-gradient-to-t from-rose-500/40 via-violet-500/10 to-transparent blur-[20px] dark:from-rose-500/80 dark:via-violet-500/20 dark:blur-[30px]"
          />

          {/* Perspective Grid Floor */}
          <div
            className="absolute top-[250px] left-1/2 z-0 h-[600px] w-[200vw] -translate-x-1/2 dark:hidden"
            style={{
              transform: "perspective(1000px) rotateX(70deg)",
              transformOrigin: "top center",
              backgroundSize: "60px 60px",
              backgroundImage:
                "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
              maskImage: "linear-gradient(to bottom, black 0%, transparent 80%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 80%)",
            }}
          />
          <div
            className="absolute top-[250px] left-1/2 z-0 hidden h-[600px] w-[200vw] -translate-x-1/2 dark:block"
            style={{
              transform: "perspective(1000px) rotateX(70deg)",
              transformOrigin: "top center",
              backgroundSize: "60px 60px",
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)",
              maskImage: "linear-gradient(to bottom, black 0%, transparent 80%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 80%)",
            }}
          />

          {/* Glowing floor reflection (mixed rose and violet) */}
          <div
            className="absolute top-[250px] left-1/2 z-0 h-[400px] w-[600px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(244,63,94,0.15)_0%,rgba(139,92,246,0.1)_40%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(244,63,94,0.3)_0%,rgba(139,92,246,0.2)_40%,transparent_70%)]"
            style={{
              transform: "perspective(1000px) rotateX(70deg)",
              transformOrigin: "top center",
            }}
          />

          {/* Floating UI Glass Card - AI Chat Simulation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
            className="relative z-10 mt-8 w-full max-w-xl overflow-hidden rounded-2xl border border-zinc-200 border-b-rose-500/20 bg-white/70 shadow-2xl backdrop-blur-3xl dark:border-white/10 dark:border-b-rose-500/30 dark:bg-[#0A0A0F]/70"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-zinc-100 bg-zinc-50/50 px-4 py-3 dark:border-white/5 dark:bg-white/[0.02]">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-500/10 text-rose-500 dark:bg-rose-500/20">
                <Sparkles className="h-3 w-3" />
              </div>
              <div>
                <h3 className="text-[13px] font-medium text-zinc-800 dark:text-white/90">
                  Pulse AI Assistant
                </h3>
                <p className="text-[10px] text-zinc-500 dark:text-white/40">Always active</p>
              </div>
            </div>

            {/* Chat Body */}
            <div className="relative flex flex-col gap-4 p-5 sm:p-6">
              {/* User Message */}
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                viewport={{ once: true }}
                className="flex w-full justify-end"
              >
                <div className="max-w-[85%] rounded-xl rounded-tr-sm border border-zinc-200/60 bg-white px-4 py-2.5 text-[13px] leading-relaxed text-zinc-700 shadow-sm dark:border-white/5 dark:bg-zinc-800/80 dark:text-white/90">
                  Summarize the Q3 Campaign thread and list action items.
                </div>
              </motion.div>

              {/* Typing Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.5, delay: 1.5, times: [0, 0.2, 0.8, 1] }}
                viewport={{ once: true }}
                className="absolute top-[102px] left-5 flex items-center gap-1.5 rounded-xl rounded-tl-sm border border-zinc-100 bg-white px-3 py-2 sm:left-6 dark:border-white/10 dark:bg-white/5"
              >
                <motion.div
                  whileInView={{ y: [0, -2, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                  className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-white/50"
                />
                <motion.div
                  whileInView={{ y: [0, -2, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                  className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-white/50"
                />
                <motion.div
                  whileInView={{ y: [0, -2, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                  className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-white/50"
                />
              </motion.div>

              {/* AI Response */}
              <motion.div
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 3 }}
                viewport={{ once: true }}
                className="flex w-full justify-start gap-3"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)] dark:shadow-[0_0_15px_rgba(244,63,94,0.5)]">
                  <Sparkles className="h-3.5 w-3.5 text-white" />
                </div>

                <div className="flex w-full flex-col gap-2">
                  <div className="rounded-xl rounded-tl-sm border border-rose-500/10 bg-rose-50 px-4 py-3 text-[13px] leading-relaxed text-zinc-700 backdrop-blur-md dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-white/90">
                    <p className="mb-2.5 font-medium text-rose-600 dark:text-rose-200">
                      Key takeaways from Q3:
                    </p>
                    <ul className="mb-3 flex flex-col gap-1.5 text-zinc-600 dark:text-white/70">
                      <li className="flex items-start gap-2">
                        <div className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-rose-500" />
                        Target audience shifted to enterprise clients.
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-rose-500" />
                        Budget increased by 15% for paid social.
                      </li>
                    </ul>

                    {/* Action Items Card inside AI message */}
                    <div className="rounded-lg border border-zinc-200 bg-white/60 p-2.5 dark:border-white/5 dark:bg-black/40">
                      <p className="mb-2 text-[10px] font-semibold tracking-wider text-zinc-400 uppercase dark:text-white/50">
                        Action Items
                      </p>
                      <div className="flex items-center gap-2.5 rounded-md bg-zinc-100/80 px-2.5 py-1.5 dark:bg-white/5">
                        <div className="flex h-4 w-4 items-center justify-center rounded border border-zinc-300 bg-white dark:border-white/20 dark:bg-white/5">
                          <svg
                            className="h-2.5 w-2.5 text-rose-500 dark:text-rose-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span className="text-[11px] text-zinc-500 line-through opacity-70 dark:text-white/80 dark:opacity-50">
                          Sarah: Update ad creatives
                        </span>
                      </div>
                      <div className="mt-1.5 flex items-center gap-2.5 rounded-md bg-zinc-100/80 px-2.5 py-1.5 dark:bg-white/5">
                        <div className="flex h-4 w-4 items-center justify-center rounded border border-zinc-300 bg-white dark:border-white/20 dark:bg-white/5"></div>
                        <span className="text-[11px] text-zinc-700 dark:text-white/80">
                          David: Finalize new budget
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Feature Grid */}
        <div className="relative z-10 mt-20 flex flex-col items-center">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16 text-2xl font-medium tracking-tight text-zinc-900 md:text-3xl dark:text-white"
          >
            What can you do with Pulse AI?
          </motion.h3>

          <div
            className="flex flex-col items-center"
            style={{
              maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
              WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
            }}
          >
            {/* Top Row (3 columns) */}
            <div className="flex flex-col border-b border-zinc-200 md:flex-row dark:border-white/10">
              <div className="flex w-[280px] flex-col items-center border-zinc-200 p-8 text-center md:border-r dark:border-white/10">
                <Mic className="mb-4 h-6 w-6 text-zinc-400 dark:text-white/50" />
                <h4 className="mb-2 text-sm font-medium text-zinc-800 dark:text-white/90">
                  Transcribe voice notes
                </h4>
                <p className="text-xs text-zinc-500 dark:text-white/50">
                  with human-level accuracy
                </p>
              </div>
              <div className="flex w-[280px] flex-col items-center border-zinc-200 p-8 text-center md:border-r dark:border-white/10">
                <FileText className="mb-4 h-6 w-6 text-zinc-400 dark:text-white/50" />
                <h4 className="mb-2 text-sm font-medium text-zinc-800 dark:text-white/90">
                  Summarize long threads
                </h4>
                <p className="text-xs text-zinc-500 dark:text-white/50">
                  from scattered conversations
                </p>
              </div>
              <div className="flex w-[280px] flex-col items-center p-8 text-center">
                <ListChecks className="mb-4 h-6 w-6 text-zinc-400 dark:text-white/50" />
                <h4 className="mb-2 text-sm font-medium text-zinc-800 dark:text-white/90">
                  List key takeaways
                </h4>
                <p className="text-xs text-zinc-500 dark:text-white/50">
                  and action items from chats
                </p>
              </div>
            </div>
            {/* Bottom Row (2 columns) */}
            <div className="flex flex-col md:flex-row">
              <div className="flex w-[280px] flex-col items-center border-zinc-200 p-8 text-center md:border-r dark:border-white/10">
                <PenTool className="mb-4 h-6 w-6 text-zinc-400 dark:text-white/50" />
                <h4 className="mb-2 text-sm font-medium text-zinc-800 dark:text-white/90">
                  Draft your replies,
                </h4>
                <p className="text-xs text-zinc-500 dark:text-white/50">and improve your tone</p>
              </div>
              <div className="flex w-[280px] flex-col items-center p-8 text-center">
                <Bot className="mb-4 h-6 w-6 text-zinc-400 dark:text-white/50" />
                <h4 className="mb-2 text-sm font-medium text-zinc-800 dark:text-white/90">
                  Save your own
                </h4>
                <p className="text-xs text-zinc-500 dark:text-white/50">custom team prompts</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Network & Superpowers Section */}
      <section className="relative flex flex-col items-center overflow-hidden border-t border-zinc-200 bg-zinc-50 pb-32 font-sans transition-colors duration-500 dark:border-white/5 dark:bg-[#05050A]">
        <CyberSectionDivider />

        {/* Top Illustration: AI Chip & Hacker Matrix */}
        <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
          {/* Ambient Glow */}
          <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-500/20 blur-[120px]" />

          {/* Floating Particles (Stars/Data Dust) */}
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            {Array.from({ length: 30 }).map((_, i) => {
              const left = (i * 17) % 100;
              const duration = 5 + (i % 5);
              const delay = (i * 1.3) % 5;
              return (
                <motion.div
                  key={`p-${i}`}
                  initial={{ y: 500 }}
                  whileInView={{ y: -100, opacity: [0, 1, 1, 0] }}
                  transition={{ repeat: Infinity, duration, delay, ease: "linear" }}
                  className="absolute h-1 w-1 rounded-full bg-rose-200 blur-[1px]"
                  style={{ left: `${left}%` }}
                />
              );
            })}
          </div>

          {/* The AI Chip Card Container */}
          <div className="relative z-10 mt-10 flex h-[260px] w-[460px]">
            {/* Left Solid Half (Physical Card) */}
            <div className="relative z-10 flex h-full w-[230px] shrink-0 flex-col justify-between overflow-hidden rounded-l-2xl border border-r-0 border-white/20 bg-[#f43f5e] bg-gradient-to-br from-rose-500 to-rose-700 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              {/* Faint watermark in background */}
              <Sparkles
                className="absolute -right-6 -bottom-6 h-32 w-32 text-white opacity-10"
                strokeWidth={1}
              />

              {/* EMV Chip */}
              <div className="mb-8 flex h-10 w-12 flex-wrap gap-[1px] rounded-md border border-white/40 bg-[#e2cb8f] bg-gradient-to-br from-[#fef0c7] to-[#d4af37] p-[2px] shadow-inner">
                <div className="flex h-[48%] w-full gap-[2px] border-b border-black/10">
                  <div className="flex-1 border-r border-black/10" />
                  <div className="flex-1 border-r border-black/10" />
                  <div className="flex-1" />
                </div>
                <div className="flex h-[48%] w-full gap-[2px]">
                  <div className="flex-1 border-r border-black/10" />
                  <div className="flex-1 border-r border-black/10" />
                  <div className="flex-1" />
                </div>
              </div>

              <div className="z-10 mt-auto">
                <div className="mb-4 font-mono text-lg font-semibold tracking-[0.15em] text-white drop-shadow-sm">
                  4242 4242 4242
                </div>
                <div>
                  <div className="mb-1 text-[9px] font-medium tracking-widest text-white/60 uppercase">
                    Card Holder
                  </div>
                  <div className="text-sm font-medium tracking-wide text-white">Pulse User</div>
                </div>
              </div>
            </div>

            {/* The Glowing Divider / Tear */}
            <div className="pointer-events-none absolute top-[-40px] bottom-[-40px] left-[230px] z-20 flex w-[50px] -translate-x-1/2 justify-center">
              {/* Massive bright vertical beam */}
              <div className="absolute inset-0 bg-white opacity-90 blur-[20px]" />
              <div className="absolute inset-0 bg-rose-200 opacity-70 blur-[40px]" />
              <div className="absolute inset-0 bg-rose-400 opacity-50 blur-[60px]" />

              {/* The core intense white line */}
              <div className="absolute top-10 bottom-10 w-[6px] rounded-full bg-white shadow-[0_0_30px_15px_rgba(255,255,255,1)]" />

              {/* Pulsing hacker energy */}
              <motion.div
                whileInView={{ opacity: [0.4, 1, 0.4], scaleX: [1, 1.5, 1] }}
                transition={{ repeat: Infinity, duration: 0.1, ease: "linear" }}
                className="absolute top-8 bottom-8 w-[2px] bg-white mix-blend-overlay"
              />
            </div>

            {/* Right Matrix Half (Fading out) */}
            <motion.div
              whileInView={{ filter: ["blur(0px)", "blur(1.5px)", "blur(0px)"] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="relative h-full w-[350px] overflow-hidden"
              style={{
                maskImage:
                  "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0) 80%)",
                WebkitMaskImage:
                  "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0) 80%)",
              }}
            >
              {/* Slow Matrix scrolling code */}
              <motion.div
                whileInView={{ translateY: [-500, 0] }}
                transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                className="absolute top-0 left-1 w-[400px] font-mono text-[11px] leading-[14px] font-bold tracking-[0.25em] break-all text-rose-300 drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]"
              >
                {Array.from({ length: 40 }).map((_, i) => (
                  <span key={`s-${i}`}>
                    A9$ JS! VAS F0C 395 87! QDS ELS CD= AN1 FAS K2N 6HP WV7 FNA Q3D G SRF Q3I GEM
                    CL2 8JY PAJ FZT 2R6 TB0 4## S1B T+G ELT R#D LTL 4YG SMR F6G PX7 1VN QT6 F6W S!8
                    #C B EJT #$* VQH 61C C9! UM V#V 8CN NSY D94 WIU E0A Z0E 9+S QHL UY HQ CI9 P74
                    SDK 64E #A 3 PAD 960 BFD S!I CZ PY TE9 S7R BZN Z30 UI J2
                  </span>
                ))}
              </motion.div>

              {/* Fast Matrix overlay */}
              <motion.div
                whileInView={{ translateY: [0, -500] }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                className="absolute left-1 w-[400px] font-mono text-[11px] leading-[14px] font-bold tracking-[0.2em] break-all text-white opacity-50 mix-blend-overlay"
              >
                {Array.from({ length: 40 }).map((_, i) => (
                  <span key={`f-${i}`}>
                    {
                      "01X9 4!A 8B# ZC2 9V@ 1N$ 7M% 3Q^ W5& E6* R0( T2) Y8- U4+ I7= O1[ P3] A5 S9| D6; F2: G8 H0 J4, K7. L5/ Z1? X3 C9 V6~ B2 N8! M0@ "
                    }
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Badge */}
          <div className="relative z-30 mt-12 mb-4 rounded-full border border-rose-200 bg-rose-50 px-4 py-1.5 text-xs font-medium text-rose-600 backdrop-blur-md dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200">
            All your team's knowledge, connected
          </div>
        </div>

        {/* Text Header */}
        <div className="relative z-10 mt-6 flex flex-col items-center px-4 text-center">
          <h2 className="mb-6 text-4xl font-medium tracking-tight text-zinc-900 md:text-5xl lg:text-6xl dark:text-white">
            Give your team superpowers
          </h2>
          <p className="max-w-2xl text-lg text-zinc-500 dark:text-white/60">
            Mirror the way your mind works by associating conversations and documents.
            <br className="hidden md:block" />
            Pulse builds a collective intelligence you can reference anytime.
          </p>
        </div>

        {/* Two Cards Container */}
        <div className="relative z-10 mt-24 grid w-full max-w-6xl grid-cols-1 gap-8 px-4 md:grid-cols-2">
          {/* Card 1: Network Graph */}
          <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl transition-colors hover:border-zinc-300 dark:border-white/10 dark:bg-[#0A0A0F] dark:hover:border-white/20">
            {/* Graph Illustration Area (Backlinks) */}
            <div className="relative flex h-[300px] w-full items-center justify-center overflow-hidden border-b border-zinc-100 bg-zinc-50/50 bg-[radial-gradient(ellipse_at_center,rgba(244,63,94,0.05)_0%,transparent_70%)] dark:border-white/5 dark:bg-[#0A0A0F] dark:bg-[radial-gradient(ellipse_at_center,rgba(244,63,94,0.08)_0%,transparent_70%)]">
              {/* Animated connection line */}
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 300">
                <motion.path
                  d="M 180 150 C 300 150 300 150 420 150"
                  fill="none"
                  stroke="rgba(244,63,94,0.3)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                {/* Moving particle on line */}
                <motion.circle
                  r="3"
                  fill="#f43f5e"
                  filter="drop-shadow(0 0 8px #f43f5e)"
                  whileInView={{ cx: [180, 420, 180] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  cy="150"
                />
              </svg>

              {/* Left Node: Document */}
              <motion.div
                whileInView={{ y: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute left-[80px] flex h-36 w-32 flex-col gap-2 rounded-xl border border-zinc-200 bg-white p-4 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-white/[0.02] dark:shadow-2xl"
              >
                <div className="h-2 w-1/2 rounded-full bg-zinc-200 dark:bg-white/20" />
                <div className="mt-2 h-1.5 w-full rounded-full bg-zinc-100 dark:bg-white/10" />
                <div className="h-1.5 w-5/6 rounded-full bg-zinc-100 dark:bg-white/10" />
                <div className="h-1.5 w-full rounded-full bg-zinc-100 dark:bg-white/10" />

                <div className="mt-auto flex items-center gap-2">
                  <div className="flex h-4 w-4 items-center justify-center rounded-[4px] border border-blue-500/50 bg-blue-500/20">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                  </div>
                  <span className="text-[10px] font-medium text-zinc-400 dark:text-white/50">
                    Specs.md
                  </span>
                </div>
              </motion.div>

              {/* Center Node: Link/Pulse Icon */}
              <div className="absolute top-1/2 left-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-rose-200 bg-rose-50 shadow-[0_0_30px_rgba(244,63,94,0.1)] backdrop-blur-md dark:border-rose-500/30 dark:bg-rose-500/10 dark:shadow-[0_0_30px_rgba(244,63,94,0.2)]">
                <Sparkles className="h-4 w-4 text-rose-500 dark:text-rose-400" />
              </div>

              {/* Right Node: Conversation */}
              <motion.div
                whileInView={{ y: [5, -5, 5] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                className="absolute right-[80px] flex h-36 w-32 flex-col gap-2 rounded-xl border border-zinc-200 bg-white p-4 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-white/[0.02] dark:shadow-2xl"
              >
                <div className="w-[85%] self-start rounded-lg rounded-tl-none bg-zinc-100 px-2.5 py-2 text-[8px] leading-relaxed text-zinc-600 dark:bg-white/5 dark:text-white/70">
                  Update the design?
                </div>
                <div className="w-[85%] self-end rounded-lg rounded-tr-none border border-rose-200 bg-rose-100 px-2.5 py-2 text-[8px] leading-relaxed text-rose-700 dark:border-rose-500/20 dark:bg-rose-500/20 dark:text-rose-100">
                  Linked the doc!
                </div>

                <div className="mt-auto flex items-center gap-2">
                  <div className="flex h-4 w-4 items-center justify-center rounded-full border border-emerald-500/50 bg-emerald-500/20">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-[10px] font-medium text-zinc-400 dark:text-white/50">
                    #design
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Text Content (Card 1) */}
            <div className="p-8">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-white/5">
                <Globe className="h-5 w-5 text-rose-500 dark:text-rose-400" />
              </div>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-white/70">
                <strong className="text-zinc-900 dark:text-white">Your team connected.</strong>{" "}
                Backlink your conversations and documents to make everything easily searchable.
              </p>
            </div>
          </div>

          {/* Card 2: Thought Capture */}
          <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl transition-colors hover:border-zinc-300 dark:border-white/10 dark:bg-[#0A0A0F] dark:hover:border-white/20">
            {/* Illustration Area */}
            <div className="relative flex h-[300px] w-full items-center justify-center overflow-hidden border-b border-zinc-100 bg-zinc-50/50 bg-[radial-gradient(ellipse_at_top,rgba(244,63,94,0.05)_0%,transparent_70%)] dark:border-white/5 dark:bg-[#0A0A0F] dark:bg-[radial-gradient(ellipse_at_top,rgba(244,63,94,0.15)_0%,transparent_70%)]">
              {/* Captured Thoughts floating away */}
              <motion.div
                whileInView={{ y: [20, -60], opacity: [0, 1, 0], scale: [0.9, 1, 0.9] }}
                transition={{ repeat: Infinity, duration: 4, delay: 0.5, ease: "easeOut" }}
                className="absolute top-[80px] left-[55%] -translate-x-1/2 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-[10px] text-zinc-500 backdrop-blur-sm dark:border-white/5 dark:bg-white/[0.02] dark:text-white/50"
              >
                Update marketing copy
              </motion.div>

              <motion.div
                whileInView={{ y: [20, -50], opacity: [0, 1, 0], scale: [0.9, 1, 0.9] }}
                transition={{ repeat: Infinity, duration: 4, delay: 2.5, ease: "easeOut" }}
                className="absolute top-[50px] left-[35%] -translate-x-1/2 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-[10px] text-zinc-500 backdrop-blur-sm dark:border-white/5 dark:bg-white/[0.02] dark:text-white/50"
              >
                Idea: New landing page
              </motion.div>

              {/* Command Input Bar */}
              <div className="relative z-10 flex h-12 w-64 items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 shadow-[0_20px_40px_rgba(0,0,0,0.05)] backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                <Zap className="h-4 w-4 text-rose-500 dark:text-rose-400" />

                {/* Animated Typing Text */}
                <div className="relative h-5 flex-1 overflow-hidden">
                  <motion.div
                    whileInView={{ x: ["-100%", "0%", "0%", "-100%"] }}
                    transition={{
                      repeat: Infinity,
                      duration: 4,
                      times: [0, 0.3, 0.8, 1],
                      ease: "easeInOut",
                    }}
                    className="absolute top-0 left-0 flex h-full w-full items-center text-xs font-medium whitespace-nowrap text-zinc-700 dark:text-white/90"
                  >
                    Call John at 5pm
                  </motion.div>
                </div>

                {/* Blinking Cursor */}
                <motion.div
                  whileInView={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                  className="h-3 w-0.5 rounded-full bg-rose-500"
                />
              </div>

              {/* Ambient glow behind command bar */}
              <div className="absolute top-1/2 left-1/2 h-20 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-500/10 blur-[30px]" />
            </div>

            {/* Text Content */}
            <div className="p-8">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-white/5">
                <Zap className="h-5 w-5 text-rose-500 dark:text-rose-400" />
              </div>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-white/70">
                <strong className="text-zinc-900 dark:text-white">
                  Frictionless thought capture.
                </strong>{" "}
                Record your ideas and to-do's easily, so you never miss a thing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Radar Section */}
      <section className="relative flex flex-col items-center overflow-hidden border-t border-zinc-200 bg-zinc-50 pt-24 pb-32 font-sans transition-colors duration-500 dark:border-white/5 dark:bg-[#05050A]">
        <CyberSectionDivider />

        {/* Radar Illustration */}
        <div className="relative flex h-[350px] w-full max-w-3xl flex-col items-center justify-end">
          {/* Radar Container (Semi-circle) */}
          <div className="relative h-[300px] w-[600px] overflow-hidden rounded-t-[300px] border-b border-zinc-200 dark:border-white/10">
            {/* SVG Grid */}
            <svg viewBox="0 0 600 300" className="absolute inset-0 h-full w-full opacity-30">
              {/* Concentric Circles */}
              <circle
                cx="300"
                cy="300"
                r="100"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="4 4"
                className="text-rose-500/40"
              />
              <circle
                cx="300"
                cy="300"
                r="200"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="4 4"
                className="text-rose-500/40"
              />
              <circle
                cx="300"
                cy="300"
                r="300"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-rose-500/40"
              />

              {/* Radial Lines */}
              <line
                x1="300"
                y1="300"
                x2="300"
                y2="0"
                stroke="currentColor"
                strokeWidth="1"
                className="text-rose-500/30"
              />
              <line
                x1="300"
                y1="300"
                x2="43.5"
                y2="150"
                stroke="currentColor"
                strokeWidth="1"
                className="text-rose-500/30"
              />
              <line
                x1="300"
                y1="300"
                x2="556.5"
                y2="150"
                stroke="currentColor"
                strokeWidth="1"
                className="text-rose-500/30"
              />
              <line
                x1="300"
                y1="300"
                x2="150"
                y2="40.2"
                stroke="currentColor"
                strokeWidth="1"
                className="text-rose-500/30"
              />
              <line
                x1="300"
                y1="300"
                x2="450"
                y2="40.2"
                stroke="currentColor"
                strokeWidth="1"
                className="text-rose-500/30"
              />
            </svg>

            {/* Glowing sweep/radar mask */}
            {/* Sweeping Scanner */}
            <motion.div
              whileInView={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
              className="absolute bottom-0 left-1/2 h-[600px] w-[600px] origin-center -translate-x-1/2 translate-y-1/2 rounded-full"
            >
              {/* The conic gradient sweep */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(244,63,94,0.1) 40deg, rgba(139,92,246,0.4) 60deg, transparent 60deg)",
                }}
              />
            </motion.div>
          </div>

          {/* Glowing dot on the radar sweep - static blips */}
          <motion.div
            whileInView={{ opacity: [0.1, 1, 0.1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute bottom-[100px] left-[calc(50%-100px)] h-1.5 w-1.5 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)] dark:bg-white dark:shadow-[0_0_10px_rgba(255,255,255,1)]"
          />
          <motion.div
            whileInView={{ opacity: [0.1, 1, 0.1] }}
            transition={{ repeat: Infinity, duration: 3, delay: 1, ease: "easeInOut" }}
            className="absolute bottom-[200px] left-[calc(50%+50px)] h-2 w-2 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)] dark:bg-white dark:shadow-[0_0_10px_rgba(255,255,255,1)]"
          />
          <motion.div
            whileInView={{ opacity: [0.1, 1, 0.1] }}
            transition={{ repeat: Infinity, duration: 4, delay: 2, ease: "easeInOut" }}
            className="absolute bottom-[150px] left-[calc(50%+150px)] h-1.5 w-1.5 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)] dark:bg-white dark:shadow-[0_0_10px_rgba(255,255,255,1)]"
          />

          {/* Central Glowing Core */}
          <div className="absolute bottom-[-24px] left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-rose-200 bg-white shadow-[0_0_30px_rgba(244,63,94,0.1)] backdrop-blur-md dark:border-rose-500/50 dark:bg-[#0A0A0F] dark:shadow-[0_0_30px_rgba(244,63,94,0.8)]">
            <Globe className="h-5 w-5 text-rose-500 dark:text-rose-300" />
            {/* Core inner pulse */}
            <motion.div
              whileInView={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-rose-500/20 blur-sm"
            />
          </div>
        </div>

        {/* Text Header */}
        <div className="relative z-10 mt-16 flex flex-col items-center px-4 text-center">
          <div className="mb-8 rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-xs font-medium text-zinc-600 backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-white/70">
            Research and reading
          </div>
          <h2 className="mb-6 text-4xl font-medium tracking-tight text-zinc-900 md:text-5xl lg:text-5xl dark:text-white">
            Never lose information
          </h2>
          <p className="max-w-2xl text-lg text-zinc-500 dark:text-white/60">
            Collect your web snippets, files, and important links – all in one place.
            <br className="hidden md:block" />
            Then quickly find them again from any device using AI.
          </p>
        </div>

        {/* Two Feature Blurbs */}
        <div className="relative z-10 mt-20 flex w-full max-w-4xl flex-col items-center justify-center gap-12 px-4 md:flex-row md:items-start md:gap-24">
          <div className="flex flex-col items-center text-center">
            <Smartphone
              className="mb-4 h-8 w-8 text-zinc-400 dark:text-white/70"
              strokeWidth={1.5}
            />
            <h4 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-white">
              Integrated with your devices
            </h4>
            <p className="max-w-[280px] text-xs leading-relaxed text-zinc-500 dark:text-white/50">
              We're everywhere, mobile or desktop, online or offline. Everything is synced in
              real-time.
            </p>
          </div>

          {/* Vertical divider */}
          <div className="hidden h-24 w-px bg-zinc-200 md:block dark:bg-white/10" />

          <div className="flex flex-col items-center text-center">
            <Shield className="mb-4 h-8 w-8 text-zinc-400 dark:text-white/70" strokeWidth={1.5} />
            <h4 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-white">
              Secure but open
            </h4>
            <p className="max-w-[280px] text-xs leading-relaxed text-zinc-500 dark:text-white/50">
              End-to-end encryption keeps your notes secure. Our export and API keeps your notes
              accessible.
            </p>
          </div>
        </div>
      </section>

      {/* Meetings Section */}
      <section className="relative flex flex-col items-center overflow-hidden border-t border-zinc-200 bg-zinc-50 pb-32 font-sans transition-colors duration-500 dark:border-white/5 dark:bg-[#05050A]">
        <CyberSectionDivider />

        {/* Top Arc Illustration (Animated Horizon) */}
        <div className="relative flex h-[350px] w-full flex-col items-center justify-end overflow-hidden">
          {/* Background Ambient Pulsing Glow */}
          <motion.div
            whileInView={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="pointer-events-none absolute top-20 h-[400px] w-[800px] rounded-full bg-rose-500/20 blur-[120px]"
          />

          {/* Vertical Rays (Aurora effect) */}
          <div className="pointer-events-none absolute inset-0 flex justify-center gap-6 opacity-60">
            <motion.div
              whileInView={{ opacity: [0.3, 0.8, 0.3], height: ["350px", "450px", "350px"] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0 }}
              className="mt-[-50px] w-32 bg-gradient-to-t from-rose-500/0 via-rose-500/20 to-transparent blur-2xl"
            />
            <motion.div
              whileInView={{ opacity: [0.5, 1, 0.5], height: ["400px", "500px", "400px"] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="mt-[-50px] w-48 bg-gradient-to-t from-rose-500/0 via-violet-500/20 to-transparent blur-2xl"
            />
            <motion.div
              whileInView={{ opacity: [0.3, 0.8, 0.3], height: ["350px", "450px", "350px"] }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 2 }}
              className="mt-[-50px] w-32 bg-gradient-to-t from-rose-500/0 via-rose-500/20 to-transparent blur-2xl"
            />
          </div>

          {/* The Glowing Arc (Horizon) */}
          <div className="relative h-[350px] w-full max-w-[1000px] overflow-hidden">
            {/* Base Planet (Dark with subtle red inner glow) */}
            <div className="absolute top-[150px] left-1/2 h-[1000px] w-[1000px] -translate-x-1/2 rounded-full bg-zinc-50 shadow-[inset_0_40px_100px_rgba(244,63,94,0.1)] dark:bg-[#05050A] dark:shadow-[inset_0_40px_100px_rgba(244,63,94,0.2)]" />

            {/* The Crisp Arc Line (Full width, subtle) */}
            <div className="absolute top-[150px] left-1/2 h-[1000px] w-[1000px] -translate-x-1/2 rounded-full border-[1px] border-rose-500/30" />

            {/* The Bright Apex Flare (Perfectly wraps the curve using mask) */}
            <div
              className="absolute top-[150px] left-1/2 h-[1000px] w-[1000px] -translate-x-1/2 rounded-full border-[2px] border-white"
              style={{
                boxShadow:
                  "0 -20px 80px 20px rgba(244,63,94,0.8), 0 -5px 20px 2px rgba(255,255,255,0.8), inset 0 10px 40px 5px rgba(244,63,94,0.6)",
                maskImage: "radial-gradient(ellipse at top, black 0%, transparent 40%)",
                WebkitMaskImage: "radial-gradient(ellipse at top, black 0%, transparent 40%)",
              }}
            />

            {/* Center Intense Core (Very tight mask for pure white center) */}
            <div
              className="absolute top-[150px] left-1/2 h-[1000px] w-[1000px] -translate-x-1/2 rounded-full border-[3px] border-white"
              style={{
                boxShadow:
                  "0 -2px 10px 2px rgba(255,255,255,1), inset 0 2px 10px 2px rgba(255,255,255,1)",
                maskImage: "radial-gradient(ellipse at top, black 0%, transparent 15%)",
                WebkitMaskImage: "radial-gradient(ellipse at top, black 0%, transparent 15%)",
              }}
            />

            {/* Animated Sweeping Light (Motion skill) */}
            <motion.div
              whileInView={{ rotate: [-8, 8, -8] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              className="absolute top-[150px] left-1/2 h-[1000px] w-[1000px] origin-center -translate-x-1/2 rounded-full border-[4px] border-white"
              style={{
                boxShadow: "0 -5px 20px 4px rgba(255,255,255,0.9)",
                maskImage: "radial-gradient(ellipse at top, black 0%, transparent 10%)",
                WebkitMaskImage: "radial-gradient(ellipse at top, black 0%, transparent 10%)",
              }}
            />
          </div>

          {/* Inner dark gradient to mask the bottom of the arc smoothly */}
          <div className="pointer-events-none absolute bottom-0 z-10 h-[180px] w-full max-w-[1200px] bg-gradient-to-t from-zinc-50 via-zinc-50/90 to-transparent dark:from-[#05050A] dark:via-[#05050A]/90" />
        </div>

        {/* Text Header */}
        <div className="relative z-10 mt-[-60px] flex flex-col items-center px-4 text-center">
          <div className="mb-6 rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-xs font-medium text-zinc-600 backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-white/70">
            Meetings
          </div>
          <h2 className="mb-6 text-4xl font-medium tracking-tight text-zinc-900 md:text-5xl lg:text-5xl dark:text-white">
            Get more out of your meetings
          </h2>
          <p className="max-w-2xl text-lg text-zinc-500 dark:text-white/60">
            Keep track of all your meetings and what was discussed.
            <br className="hidden md:block" />
            Import events quickly with our Google Calendar and Outlook integrations.
          </p>
        </div>

        {/* Meeting UI Card */}
        <div className="relative z-10 mt-16 w-full max-w-[900px] px-4">
          <div className="relative flex h-[500px] flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl md:flex-row dark:border-white/10 dark:bg-[#0A0A0F]">
            {/* Left Col: Notes */}
            <div className="flex-1 border-r border-zinc-100 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px] p-8 pt-10 dark:border-white/5 dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)]">
              <div className="mb-10">
                <h4 className="mb-5 text-sm font-semibold text-zinc-900 dark:text-white">
                  Fri, October 15th, 2024
                </h4>
                <ul className="flex flex-col gap-4 border-l border-zinc-200 pl-5 text-xs text-zinc-500 dark:border-white/10 dark:text-white/60">
                  <li className="relative">
                    <div className="absolute top-1.5 -left-[23px] h-1.5 w-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
                    I started using{" "}
                    <span className="text-zinc-900 underline decoration-zinc-300 underline-offset-4 dark:text-white dark:decoration-white/30">
                      pulse.app
                    </span>
                    !
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-5 text-sm font-semibold text-zinc-900 dark:text-white">
                  Sat, October 16th, 2024
                </h4>
                <ul className="flex flex-col gap-4 border-l border-zinc-200 pl-5 text-xs text-zinc-500 dark:border-white/10 dark:text-white/60">
                  <li className="relative">
                    <div className="absolute top-1.5 -left-[23px] h-1.5 w-1.5 rounded-full bg-rose-500/50" />
                    What is Pulse?
                  </li>
                  <li className="relative">
                    <div className="absolute top-1.5 -left-[23px] h-1.5 w-1.5 rounded-full bg-rose-500/50" />
                    What are some use-cases for Pulse?
                  </li>
                  <li className="relative">
                    <div className="absolute top-1.5 -left-[23px] h-1.5 w-1.5 rounded-full bg-zinc-200 dark:bg-white/20" />
                    Next steps...
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Col: Calendar */}
            <div className="w-full shrink-0 bg-zinc-50/50 p-8 pt-10 md:w-[350px] dark:bg-white/[0.01]">
              <div className="mb-8 flex items-center justify-between">
                <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                  September 2024
                </span>
                <div className="flex gap-2">
                  <div className="flex h-6 w-6 cursor-pointer items-center justify-center rounded border border-zinc-200 bg-white transition-colors hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
                    <ChevronDown className="h-3 w-3 rotate-90 text-zinc-500 dark:text-white/70" />
                  </div>
                  <div className="flex h-6 w-6 cursor-pointer items-center justify-center rounded border border-zinc-200 bg-white transition-colors hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
                    <ChevronDown className="h-3 w-3 -rotate-90 text-zinc-500 dark:text-white/70" />
                  </div>
                </div>
              </div>

              {/* Days Header */}
              <div className="mb-4 grid grid-cols-7 gap-2 text-center text-[10px] font-medium tracking-wider text-zinc-400 uppercase dark:text-white/40">
                <div>Su</div>
                <div>Mo</div>
                <div>Tu</div>
                <div>We</div>
                <div>Th</div>
                <div>Fr</div>
                <div>Sa</div>
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-x-2 gap-y-4 text-center text-xs text-zinc-600 dark:text-white/70">
                <div className="opacity-30">26</div>
                <div className="opacity-30">27</div>
                <div className="opacity-30">28</div>
                <div className="opacity-30">29</div>
                <div className="opacity-30">30</div>
                <div className="opacity-30">31</div>
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
                <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-md bg-rose-500 font-semibold text-white shadow-[0_0_15px_rgba(244,63,94,0.6)]">
                  7
                </div>
                <div>8</div>
                <div>9</div>
                <div>10</div>
                <div>11</div>
                <div>12</div>
                <div>13</div>
                <div>14</div>
                <div>15</div>
                <div>16</div>
                <div>17</div>
                <div>18</div>
                <div>19</div>
                <div>20</div>
                <div>21</div>
                <div>22</div>
                <div>23</div>
                <div>24</div>
                <div>25</div>
                <div>26</div>
                <div>27</div>
                <div>28</div>
                <div>29</div>
                <div>30</div>
                <div className="opacity-30">1</div>
                <div className="opacity-30">2</div>
                <div className="opacity-30">3</div>
                <div className="opacity-30">4</div>
                <div className="opacity-30">5</div>
                <div className="opacity-30">6</div>
              </div>
            </div>

            {/* Floating Elements */}
            {/* Outlook Pill */}
            <motion.div
              whileInView={{ y: [-4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute bottom-[180px] left-[20%] flex items-center gap-3 rounded-xl border border-zinc-200 bg-white/90 p-3 shadow-xl backdrop-blur-xl md:left-[35%] dark:border-white/10 dark:bg-[#1A1A24]/90 dark:shadow-2xl"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded bg-[#0078D4]/20">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4 4H10V20H4V4Z" fill="#0078D4" />
                  <path d="M10 4L20 7.2V16.8L10 20V4Z" fill="#28A8EA" />
                  <path
                    d="M13 10.5C13 9.67157 13.6716 9 14.5 9C15.3284 9 16 9.67157 16 10.5V13.5C16 14.3284 15.3284 15 14.5 15C13.6716 15 13 14.3284 13 13.5V10.5Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div>
                <div className="text-xs font-medium text-zinc-900 dark:text-white">Outlook</div>
                <div className="text-[10px] text-zinc-500 dark:text-white/50">
                  alexmaccaw@outlook.com
                </div>
              </div>
            </motion.div>

            {/* Google Calendar Pill */}
            <motion.div
              whileInView={{ y: [4, -4, 4] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute bottom-[100px] left-[5%] flex items-center gap-3 rounded-xl border border-zinc-200 bg-white/90 p-3 shadow-xl backdrop-blur-xl md:left-[15%] dark:border-white/10 dark:bg-[#1A1A24]/90 dark:shadow-2xl"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded bg-zinc-100 dark:bg-white">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" fill="#4285F4" />
                  <rect x="2" y="4" width="20" height="6" fill="#EA4335" />
                  <text
                    x="12"
                    y="15"
                    fill="white"
                    fontSize="9"
                    fontWeight="bold"
                    textAnchor="middle"
                    fontFamily="sans-serif"
                  >
                    31
                  </text>
                </svg>
              </div>
              <div>
                <div className="text-xs font-medium text-zinc-900 dark:text-white">
                  Google Calendar
                </div>
                <div className="text-[10px] text-zinc-500 dark:text-white/50">
                  alexmaccaw@gmail.com
                </div>
              </div>
            </motion.div>

            {/* Meetings Popover */}
            <motion.div
              whileInView={{ y: [-6, 6, -6] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute right-[5%] bottom-[40px] w-[280px] rounded-2xl border border-zinc-200 bg-white/95 p-4 shadow-xl backdrop-blur-xl md:right-[15%] dark:border-white/10 dark:bg-[#1A1A24]/95 dark:shadow-2xl"
            >
              <div className="mb-3 text-[10px] font-semibold tracking-wider text-zinc-400 uppercase dark:text-white/40">
                Meetings
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex cursor-pointer items-center justify-between rounded-lg bg-zinc-50 px-3 py-2.5 transition-colors hover:bg-zinc-100 dark:bg-white/5 dark:hover:bg-white/10">
                  <span className="text-xs text-zinc-800 dark:text-white/90">
                    Meeting with Jonathan...
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 dark:text-white/40">
                    <span>5:00am</span>
                    <Clock className="h-3 w-3" />
                  </div>
                </div>
                <div className="flex cursor-pointer items-center justify-between rounded-lg bg-zinc-50 px-3 py-2.5 transition-colors hover:bg-zinc-100 dark:bg-white/5 dark:hover:bg-white/10">
                  <span className="text-xs text-zinc-800 dark:text-white/90">
                    Product call with Design
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 dark:text-white/40">
                    <span>7:00am</span>
                    <Clock className="h-3 w-3" />
                  </div>
                </div>
                <div className="flex cursor-pointer items-center justify-between rounded-lg bg-zinc-50 px-3 py-2.5 transition-colors hover:bg-zinc-100 dark:bg-white/5 dark:hover:bg-white/10">
                  <span className="text-xs text-zinc-800 dark:text-white/90">
                    Team call to figure out...
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 dark:text-white/40">
                    <span>12:00pm</span>
                    <Clock className="h-3 w-3" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section className="relative flex flex-col items-center overflow-hidden border-t border-zinc-200 bg-zinc-50 py-32 font-sans transition-colors duration-500 dark:border-white/5 dark:bg-[#05050A]">
        <CyberSectionDivider />
        {/* Added violet glow mixed with rose */}
        <div className="pointer-events-none absolute top-0 h-[300px] w-full max-w-4xl -translate-y-1/2 rounded-full bg-gradient-to-r from-rose-500/5 via-violet-500/10 to-rose-500/5 blur-[120px]" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4">
          <div className="mb-16 flex flex-col items-center text-center">
            <div className="mb-6 rounded-full border border-rose-200 bg-rose-50 px-4 py-1.5 text-xs font-medium text-rose-600 backdrop-blur-md dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300">
              Wall of Love
            </div>
            <h2 className="text-4xl font-medium tracking-tight text-zinc-900 md:text-5xl dark:text-white">
              Loved by teams worldwide
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                name: "Sarah Jenkins",
                role: "Product, Acme Corp",
                text: "Pulse has completely transformed how we capture ideas. The AI features are borderline magic.",
              },
              {
                name: "David Chen",
                role: "Engineering, Startup Inc",
                text: "Finally, a tool that doesn't get in the way. The interface is incredibly fast and responsive.",
              },
              {
                name: "Maya Patel",
                role: "Design Lead, StudioX",
                text: "The attention to detail in the design is inspiring. It's a joy to use every single day.",
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 bg-white p-8 shadow-2xl transition-colors hover:border-zinc-300 hover:border-t-violet-400/50 dark:border-white/10 dark:bg-[#0A0A0F] dark:hover:border-white/20 dark:hover:border-t-violet-500/30"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-rose-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <p className="relative z-10 mb-8 text-sm leading-relaxed text-zinc-600 dark:text-white/70">
                  "{t.text}"
                </p>
                <div className="relative z-10 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-xs font-medium text-zinc-500 dark:bg-white/10 dark:text-white/50">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-zinc-800 dark:text-white/90">
                      {t.name}
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-white/40">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative flex flex-col items-center overflow-hidden border-t border-zinc-200 bg-zinc-50 py-32 font-sans transition-colors duration-500 dark:border-white/5 dark:bg-[#05050A]">
        <CyberSectionDivider />
        {/* Mixed violet/rose ambient bottom glow */}
        <div className="pointer-events-none absolute bottom-0 h-[400px] w-full max-w-5xl bg-[radial-gradient(ellipse_at_bottom,rgba(139,92,246,0.1)_0%,rgba(244,63,94,0.05)_40%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_bottom,rgba(139,92,246,0.15)_0%,rgba(244,63,94,0.1)_40%,transparent_70%)]" />

        <div className="relative z-10 mx-auto w-full max-w-4xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center rounded-[2.5rem] border border-zinc-200 bg-white/80 p-10 shadow-[0_0_80px_rgba(244,63,94,0.05)] backdrop-blur-xl sm:p-16 dark:border-white/10 dark:bg-[#0A0A0F]/80 dark:shadow-[0_0_80px_rgba(244,63,94,0.1)]"
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-rose-200 bg-rose-50 text-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.1)] dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-400 dark:shadow-[0_0_30px_rgba(244,63,94,0.2)]">
              <Sparkles className="h-8 w-8" />
            </div>
            <h2 className="mb-6 text-4xl font-medium tracking-tight text-zinc-900 md:text-5xl dark:text-white">
              Ready to upgrade your communication?
            </h2>
            <p className="mb-10 max-w-2xl text-lg text-zinc-500 dark:text-white/50">
              Join millions of users who rely on Pulse every day. Available on iOS, Android, Mac,
              and Windows.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <a
                href="#"
                className="flex h-12 items-center justify-center rounded-full bg-rose-500 px-8 text-sm font-medium text-white transition-all hover:bg-rose-400 hover:shadow-[0_0_20px_rgba(244,63,94,0.4)]"
              >
                Download Pulse
              </a>
              <a
                href="#"
                className="flex h-12 items-center justify-center rounded-full border border-zinc-200 bg-white px-8 text-sm font-medium text-zinc-900 transition-all hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                Contact Sales
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative mx-auto w-full max-w-7xl px-4 pt-20 pb-10 font-sans md:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-zinc-200 bg-white shadow-2xl dark:border-white/5 dark:bg-[#05050A]">
          {/* Aurora Background (bottom half) */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-full overflow-hidden opacity-100 dark:opacity-80"
            style={{
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 50%, black 100%)",
              maskImage: "linear-gradient(to bottom, transparent 0%, black 50%, black 100%)",
            }}
          >
            <div className="absolute inset-0 z-0 flex items-end justify-center">
              {/* Aurora blobs using transform for best performance */}
              <motion.div
                whileInView={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-[20%] left-[-10%] h-[600px] w-[600px] rounded-[40%_60%_70%_30%] bg-violet-300/40 blur-[80px] will-change-transform sm:h-[800px] sm:w-[800px] sm:blur-[120px] dark:bg-violet-600/40"
              />
              <motion.div
                whileInView={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute right-[-10%] -bottom-[20%] h-[600px] w-[600px] rounded-[60%_40%_30%_70%] bg-rose-300/40 blur-[80px] will-change-transform sm:h-[800px] sm:w-[800px] sm:blur-[120px] dark:bg-rose-600/40"
              />
              <motion.div
                whileInView={{ rotate: 180, scale: [1, 1.1, 1] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-[30%] left-[20%] h-[400px] w-[400px] rounded-[50%_50%_60%_40%] bg-fuchsia-300/30 blur-[80px] will-change-transform sm:h-[600px] sm:w-[600px] sm:blur-[100px] dark:bg-fuchsia-500/30"
              />
            </div>
          </div>

          {/* Content Container */}
          <div className="relative z-10 flex flex-col justify-between px-6 pt-16 sm:px-10 md:px-16">
            {/* Top Header Row */}
            <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="mb-2 text-sm text-zinc-500 dark:text-white/50">Pulse Limitless</p>
                <a
                  href="mailto:hello@pulse.ai"
                  className="text-3xl font-medium tracking-tight text-zinc-900 transition-colors hover:text-rose-500 sm:text-4xl md:text-5xl dark:text-white dark:hover:text-rose-400"
                >
                  hello@pulse.ai
                </a>
                <div className="mt-10 flex flex-wrap gap-8 text-sm text-zinc-600 dark:text-white/70">
                  <a href="#" className="transition hover:text-zinc-900 dark:hover:text-white">
                    How It Works
                  </a>
                  <a href="#" className="transition hover:text-zinc-900 dark:hover:text-white">
                    Who Benefits
                  </a>
                  <a href="#" className="transition hover:text-zinc-900 dark:hover:text-white">
                    Events
                  </a>
                  <a href="#" className="transition hover:text-zinc-900 dark:hover:text-white">
                    Learn More
                  </a>
                </div>
              </div>

              <div className="flex flex-col items-start md:items-end">
                <p className="mb-2 text-sm text-zinc-800 dark:text-white/90">
                  Upgrade Your Reality
                </p>
                <p className="mb-6 max-w-[200px] text-left text-xs text-zinc-500 md:text-right dark:text-white/50">
                  Join the waitlist and get priority access to Pulse.
                </p>
                <a
                  href="#"
                  className="flex h-10 items-center justify-center rounded-full bg-zinc-900 px-6 text-sm font-semibold text-white transition-transform hover:scale-105 dark:bg-white dark:text-black"
                >
                  Join Waitlist
                </a>
              </div>
            </div>

            {/* Spacing to push bottom content down */}
            <div className="mt-32 sm:mt-48" />

            {/* Social Links Row */}
            <div className="flex w-full flex-wrap justify-between gap-4 pb-6 text-sm font-medium text-zinc-900 dark:text-white/90">
              <a href="#" className="transition hover:text-rose-500 dark:hover:text-rose-300">
                Instagram
              </a>
              <a href="#" className="transition hover:text-rose-500 dark:hover:text-rose-300">
                Tik Tok
              </a>
              <a href="#" className="transition hover:text-rose-500 dark:hover:text-rose-300">
                Twitter X
              </a>
              <a href="#" className="transition hover:text-rose-500 dark:hover:text-rose-300">
                Youtube
              </a>
            </div>

            <div className="h-px w-full bg-black/[0.05] dark:bg-white/10" />

            {/* Massive Text Logo */}
            <div className="w-full pt-8 pb-4 text-center">
              <h1 className="text-[clamp(3.5rem,15vw,14rem)] leading-none font-bold tracking-tighter text-zinc-900 dark:text-white">
                PULSE
              </h1>
            </div>

            {/* Bottom Footer Row */}
            <div className="flex flex-col items-center justify-between py-6 text-[10px] text-zinc-500 sm:flex-row sm:text-xs dark:text-white/50">
              <p>© 2026 Pulse. All Rights Reserved.</p>
              <div className="mt-4 flex gap-4 sm:mt-0">
                <a href="#" className="transition hover:text-zinc-900 dark:hover:text-white">
                  Privacy policy
                </a>
                <a href="#" className="transition hover:text-zinc-900 dark:hover:text-white">
                  Terms and conditions
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
