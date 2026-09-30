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

export const ModernAppCta = () => (
  <>
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
            Join millions of users who rely on Pulse every day. Available on iOS, Android, Mac, and
            Windows.
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
  </>
);
