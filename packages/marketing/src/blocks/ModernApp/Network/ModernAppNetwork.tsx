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

export const ModernAppNetwork = () => (
  <>
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
                  A9$ JS! VAS F0C 395 87! QDS ELS CD= AN1 FAS K2N 6HP WV7 FNA Q3D G SRF Q3I GEM CL2
                  8JY PAJ FZT 2R6 TB0 4## S1B T+G ELT R#D LTL 4YG SMR F6G PX7 1VN QT6 F6W S!8 #C B
                  EJT #$* VQH 61C C9! UM V#V 8CN NSY D94 WIU E0A Z0E 9+S QHL UY HQ CI9 P74 SDK 64E
                  #A 3 PAD 960 BFD S!I CZ PY TE9 S7R BZN Z30 UI J2
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
  </>
);
