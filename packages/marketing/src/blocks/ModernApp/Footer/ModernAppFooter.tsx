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

import {
  logos,
  MEGA_LINK_GROUPS,
  SOCIALS,
  MINIMAL_FEATURES,
  containerVariants,
  itemVariants,
  MatrixText,
  CyberSectionDivider,
} from "../components/ModernAppInternal";

export const ModernAppFooter = () => (
  <>
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
              <p className="mb-2 text-sm text-zinc-800 dark:text-white/90">Upgrade Your Reality</p>
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
  </>
);
