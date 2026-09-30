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

export const ModernAppHero = () => (
  <>
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
              Plan, execute, and scale faster. Pulse gives you a marketing, engineering, and design
              team—all powered by an intelligent AI assistant working 24/7.
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
  </>
);
