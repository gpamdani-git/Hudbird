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

export const ModernAppGrid = () => (
  <>
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
  </>
);
