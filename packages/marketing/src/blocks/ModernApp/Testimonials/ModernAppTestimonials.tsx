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

export const ModernAppTestimonials = () => (
  <>
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
  </>
);
