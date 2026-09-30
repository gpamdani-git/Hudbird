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

export const ModernAppRadar = () => (
  <>
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
          <Smartphone className="mb-4 h-8 w-8 text-zinc-400 dark:text-white/70" strokeWidth={1.5} />
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
  </>
);
