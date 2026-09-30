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

export const ModernAppReflect = () => (
  <>
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
              <p className="text-xs text-zinc-500 dark:text-white/50">with human-level accuracy</p>
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
  </>
);
