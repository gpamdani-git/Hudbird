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

export const ModernAppLogoCloud = () => (
  <>
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
  </>
);
