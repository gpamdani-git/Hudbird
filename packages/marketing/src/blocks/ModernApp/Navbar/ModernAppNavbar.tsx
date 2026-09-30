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

export const ModernAppNavbar = ({
  navVisible,
  navCompact,
}: {
  navVisible: boolean;
  navCompact: boolean;
}) => (
  <>
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
  </>
);
