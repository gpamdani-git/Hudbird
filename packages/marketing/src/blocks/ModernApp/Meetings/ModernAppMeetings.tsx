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

export const ModernAppMeetings = () => (
  <>
    {/* Meetings Section */}
    <section className="relative flex flex-col items-center overflow-hidden border-t border-zinc-200 bg-zinc-50 pb-32 font-sans transition-colors duration-500 dark:border-white/5 dark:bg-[#05050A]">
      <CyberSectionDivider />

      {/* Top Arc Illustration (Animated Horizon) */}
      <div className="relative flex h-[350px] w-full flex-col items-center justify-end overflow-hidden">
        {/* Background Ambient Pulsing Glow */}
        <motion.div
          whileInView={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="pointer-events-none absolute top-20 h-[400px] w-[800px] rounded-full bg-rose-500/20 blur-[120px]"
        />

        {/* Vertical Rays (Aurora effect) */}
        <div className="pointer-events-none absolute inset-0 flex justify-center gap-6 opacity-60">
          <motion.div
            whileInView={{ opacity: [0.3, 0.8, 0.3], height: ["350px", "450px", "350px"] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0 }}
            className="mt-[-50px] w-32 bg-gradient-to-t from-rose-500/0 via-rose-500/20 to-transparent blur-2xl"
          />
          <motion.div
            whileInView={{ opacity: [0.5, 1, 0.5], height: ["400px", "500px", "400px"] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            className="mt-[-50px] w-48 bg-gradient-to-t from-rose-500/0 via-violet-500/20 to-transparent blur-2xl"
          />
          <motion.div
            whileInView={{ opacity: [0.3, 0.8, 0.3], height: ["350px", "450px", "350px"] }}
            transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 2 }}
            className="mt-[-50px] w-32 bg-gradient-to-t from-rose-500/0 via-rose-500/20 to-transparent blur-2xl"
          />
        </div>

        {/* The Glowing Arc (Horizon) */}
        <div className="relative h-[350px] w-full max-w-[1000px] overflow-hidden">
          {/* Base Planet (Dark with subtle red inner glow) */}
          <div className="absolute top-[150px] left-1/2 h-[1000px] w-[1000px] -translate-x-1/2 rounded-full bg-zinc-50 shadow-[inset_0_40px_100px_rgba(244,63,94,0.1)] dark:bg-[#05050A] dark:shadow-[inset_0_40px_100px_rgba(244,63,94,0.2)]" />

          {/* The Crisp Arc Line (Full width, subtle) */}
          <div className="absolute top-[150px] left-1/2 h-[1000px] w-[1000px] -translate-x-1/2 rounded-full border-[1px] border-rose-500/30" />

          {/* The Bright Apex Flare (Perfectly wraps the curve using mask) */}
          <div
            className="absolute top-[150px] left-1/2 h-[1000px] w-[1000px] -translate-x-1/2 rounded-full border-[2px] border-white"
            style={{
              boxShadow:
                "0 -20px 80px 20px rgba(244,63,94,0.8), 0 -5px 20px 2px rgba(255,255,255,0.8), inset 0 10px 40px 5px rgba(244,63,94,0.6)",
              maskImage: "radial-gradient(ellipse at top, black 0%, transparent 40%)",
              WebkitMaskImage: "radial-gradient(ellipse at top, black 0%, transparent 40%)",
            }}
          />

          {/* Center Intense Core (Very tight mask for pure white center) */}
          <div
            className="absolute top-[150px] left-1/2 h-[1000px] w-[1000px] -translate-x-1/2 rounded-full border-[3px] border-white"
            style={{
              boxShadow:
                "0 -2px 10px 2px rgba(255,255,255,1), inset 0 2px 10px 2px rgba(255,255,255,1)",
              maskImage: "radial-gradient(ellipse at top, black 0%, transparent 15%)",
              WebkitMaskImage: "radial-gradient(ellipse at top, black 0%, transparent 15%)",
            }}
          />

          {/* Animated Sweeping Light (Motion skill) */}
          <motion.div
            whileInView={{ rotate: [-8, 8, -8] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="absolute top-[150px] left-1/2 h-[1000px] w-[1000px] origin-center -translate-x-1/2 rounded-full border-[4px] border-white"
            style={{
              boxShadow: "0 -5px 20px 4px rgba(255,255,255,0.9)",
              maskImage: "radial-gradient(ellipse at top, black 0%, transparent 10%)",
              WebkitMaskImage: "radial-gradient(ellipse at top, black 0%, transparent 10%)",
            }}
          />
        </div>

        {/* Inner dark gradient to mask the bottom of the arc smoothly */}
        <div className="pointer-events-none absolute bottom-0 z-10 h-[180px] w-full max-w-[1200px] bg-gradient-to-t from-zinc-50 via-zinc-50/90 to-transparent dark:from-[#05050A] dark:via-[#05050A]/90" />
      </div>

      {/* Text Header */}
      <div className="relative z-10 mt-[-60px] flex flex-col items-center px-4 text-center">
        <div className="mb-6 rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-xs font-medium text-zinc-600 backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-white/70">
          Meetings
        </div>
        <h2 className="mb-6 text-4xl font-medium tracking-tight text-zinc-900 md:text-5xl lg:text-5xl dark:text-white">
          Get more out of your meetings
        </h2>
        <p className="max-w-2xl text-lg text-zinc-500 dark:text-white/60">
          Keep track of all your meetings and what was discussed.
          <br className="hidden md:block" />
          Import events quickly with our Google Calendar and Outlook integrations.
        </p>
      </div>

      {/* Meeting UI Card */}
      <div className="relative z-10 mt-16 w-full max-w-[900px] px-4">
        <div className="relative flex h-[500px] flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl md:flex-row dark:border-white/10 dark:bg-[#0A0A0F]">
          {/* Left Col: Notes */}
          <div className="flex-1 border-r border-zinc-100 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px] p-8 pt-10 dark:border-white/5 dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)]">
            <div className="mb-10">
              <h4 className="mb-5 text-sm font-semibold text-zinc-900 dark:text-white">
                Fri, October 15th, 2024
              </h4>
              <ul className="flex flex-col gap-4 border-l border-zinc-200 pl-5 text-xs text-zinc-500 dark:border-white/10 dark:text-white/60">
                <li className="relative">
                  <div className="absolute top-1.5 -left-[23px] h-1.5 w-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
                  I started using{" "}
                  <span className="text-zinc-900 underline decoration-zinc-300 underline-offset-4 dark:text-white dark:decoration-white/30">
                    pulse.app
                  </span>
                  !
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-5 text-sm font-semibold text-zinc-900 dark:text-white">
                Sat, October 16th, 2024
              </h4>
              <ul className="flex flex-col gap-4 border-l border-zinc-200 pl-5 text-xs text-zinc-500 dark:border-white/10 dark:text-white/60">
                <li className="relative">
                  <div className="absolute top-1.5 -left-[23px] h-1.5 w-1.5 rounded-full bg-rose-500/50" />
                  What is Pulse?
                </li>
                <li className="relative">
                  <div className="absolute top-1.5 -left-[23px] h-1.5 w-1.5 rounded-full bg-rose-500/50" />
                  What are some use-cases for Pulse?
                </li>
                <li className="relative">
                  <div className="absolute top-1.5 -left-[23px] h-1.5 w-1.5 rounded-full bg-zinc-200 dark:bg-white/20" />
                  Next steps...
                </li>
              </ul>
            </div>
          </div>

          {/* Right Col: Calendar */}
          <div className="w-full shrink-0 bg-zinc-50/50 p-8 pt-10 md:w-[350px] dark:bg-white/[0.01]">
            <div className="mb-8 flex items-center justify-between">
              <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                September 2024
              </span>
              <div className="flex gap-2">
                <div className="flex h-6 w-6 cursor-pointer items-center justify-center rounded border border-zinc-200 bg-white transition-colors hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
                  <ChevronDown className="h-3 w-3 rotate-90 text-zinc-500 dark:text-white/70" />
                </div>
                <div className="flex h-6 w-6 cursor-pointer items-center justify-center rounded border border-zinc-200 bg-white transition-colors hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
                  <ChevronDown className="h-3 w-3 -rotate-90 text-zinc-500 dark:text-white/70" />
                </div>
              </div>
            </div>

            {/* Days Header */}
            <div className="mb-4 grid grid-cols-7 gap-2 text-center text-[10px] font-medium tracking-wider text-zinc-400 uppercase dark:text-white/40">
              <div>Su</div>
              <div>Mo</div>
              <div>Tu</div>
              <div>We</div>
              <div>Th</div>
              <div>Fr</div>
              <div>Sa</div>
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-x-2 gap-y-4 text-center text-xs text-zinc-600 dark:text-white/70">
              <div className="opacity-30">26</div>
              <div className="opacity-30">27</div>
              <div className="opacity-30">28</div>
              <div className="opacity-30">29</div>
              <div className="opacity-30">30</div>
              <div className="opacity-30">31</div>
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
              <div>5</div>
              <div>6</div>
              <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-md bg-rose-500 font-semibold text-white shadow-[0_0_15px_rgba(244,63,94,0.6)]">
                7
              </div>
              <div>8</div>
              <div>9</div>
              <div>10</div>
              <div>11</div>
              <div>12</div>
              <div>13</div>
              <div>14</div>
              <div>15</div>
              <div>16</div>
              <div>17</div>
              <div>18</div>
              <div>19</div>
              <div>20</div>
              <div>21</div>
              <div>22</div>
              <div>23</div>
              <div>24</div>
              <div>25</div>
              <div>26</div>
              <div>27</div>
              <div>28</div>
              <div>29</div>
              <div>30</div>
              <div className="opacity-30">1</div>
              <div className="opacity-30">2</div>
              <div className="opacity-30">3</div>
              <div className="opacity-30">4</div>
              <div className="opacity-30">5</div>
              <div className="opacity-30">6</div>
            </div>
          </div>

          {/* Floating Elements */}
          {/* Outlook Pill */}
          <motion.div
            whileInView={{ y: [-4, 4, -4] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute bottom-[180px] left-[20%] flex items-center gap-3 rounded-xl border border-zinc-200 bg-white/90 p-3 shadow-xl backdrop-blur-xl md:left-[35%] dark:border-white/10 dark:bg-[#1A1A24]/90 dark:shadow-2xl"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded bg-[#0078D4]/20">
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 4H10V20H4V4Z" fill="#0078D4" />
                <path d="M10 4L20 7.2V16.8L10 20V4Z" fill="#28A8EA" />
                <path
                  d="M13 10.5C13 9.67157 13.6716 9 14.5 9C15.3284 9 16 9.67157 16 10.5V13.5C16 14.3284 15.3284 15 14.5 15C13.6716 15 13 14.3284 13 13.5V10.5Z"
                  fill="white"
                />
              </svg>
            </div>
            <div>
              <div className="text-xs font-medium text-zinc-900 dark:text-white">Outlook</div>
              <div className="text-[10px] text-zinc-500 dark:text-white/50">
                alexmaccaw@outlook.com
              </div>
            </div>
          </motion.div>

          {/* Google Calendar Pill */}
          <motion.div
            whileInView={{ y: [4, -4, 4] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="absolute bottom-[100px] left-[5%] flex items-center gap-3 rounded-xl border border-zinc-200 bg-white/90 p-3 shadow-xl backdrop-blur-xl md:left-[15%] dark:border-white/10 dark:bg-[#1A1A24]/90 dark:shadow-2xl"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded bg-zinc-100 dark:bg-white">
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" fill="#4285F4" />
                <rect x="2" y="4" width="20" height="6" fill="#EA4335" />
                <text
                  x="12"
                  y="15"
                  fill="white"
                  fontSize="9"
                  fontWeight="bold"
                  textAnchor="middle"
                  fontFamily="sans-serif"
                >
                  31
                </text>
              </svg>
            </div>
            <div>
              <div className="text-xs font-medium text-zinc-900 dark:text-white">
                Google Calendar
              </div>
              <div className="text-[10px] text-zinc-500 dark:text-white/50">
                alexmaccaw@gmail.com
              </div>
            </div>
          </motion.div>

          {/* Meetings Popover */}
          <motion.div
            whileInView={{ y: [-6, 6, -6] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="absolute right-[5%] bottom-[40px] w-[280px] rounded-2xl border border-zinc-200 bg-white/95 p-4 shadow-xl backdrop-blur-xl md:right-[15%] dark:border-white/10 dark:bg-[#1A1A24]/95 dark:shadow-2xl"
          >
            <div className="mb-3 text-[10px] font-semibold tracking-wider text-zinc-400 uppercase dark:text-white/40">
              Meetings
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex cursor-pointer items-center justify-between rounded-lg bg-zinc-50 px-3 py-2.5 transition-colors hover:bg-zinc-100 dark:bg-white/5 dark:hover:bg-white/10">
                <span className="text-xs text-zinc-800 dark:text-white/90">
                  Meeting with Jonathan...
                </span>
                <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 dark:text-white/40">
                  <span>5:00am</span>
                  <Clock className="h-3 w-3" />
                </div>
              </div>
              <div className="flex cursor-pointer items-center justify-between rounded-lg bg-zinc-50 px-3 py-2.5 transition-colors hover:bg-zinc-100 dark:bg-white/5 dark:hover:bg-white/10">
                <span className="text-xs text-zinc-800 dark:text-white/90">
                  Product call with Design
                </span>
                <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 dark:text-white/40">
                  <span>7:00am</span>
                  <Clock className="h-3 w-3" />
                </div>
              </div>
              <div className="flex cursor-pointer items-center justify-between rounded-lg bg-zinc-50 px-3 py-2.5 transition-colors hover:bg-zinc-100 dark:bg-white/5 dark:hover:bg-white/10">
                <span className="text-xs text-zinc-800 dark:text-white/90">
                  Team call to figure out...
                </span>
                <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 dark:text-white/40">
                  <span>12:00pm</span>
                  <Clock className="h-3 w-3" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  </>
);
