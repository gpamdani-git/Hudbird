import React from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@hudbird/ui";
import {
  MapPin,
  Search,
  Bookmark,
  Navigation,
  MessageSquare,
  Sparkles,
  Mic,
  Play,
  Pause,
  Heart,
  SkipForward,
  SkipBack,
  ShoppingBag,
  Plus,
} from "lucide-react";
import { AiStartupFeatures, SaaSPricing, ModernAppTestimonials } from "@hudbird/marketing";

export function ShowcaseHero() {
  const { scrollY } = useScroll();
  // Parallax effects for the floating cards
  const y1 = useTransform(scrollY, [0, 1000], [0, -100]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -50]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y4 = useTransform(scrollY, [0, 1000], [0, -80]);

  return (
    <section className="relative w-full flex-col items-center justify-center overflow-hidden bg-zinc-50 pt-24 pb-32 dark:bg-zinc-950">
      {/* Background glow for the top section */}
      <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[600px] w-[1000px] -translate-x-1/2 -translate-y-1/2 opacity-30 blur-[120px] dark:opacity-20">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-zinc-500 uppercase dark:text-zinc-400">
            <Sparkles className="h-3.5 w-3.5" />
            Hudbird UI Pro
          </div>

          <h1 className="font-heading text-5xl leading-[1.05] font-medium tracking-tight text-zinc-900 sm:text-7xl lg:text-[5rem] dark:text-white">
            Uncompromising design. <br />
            <span className="text-zinc-400 dark:text-zinc-500">Built for production.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg font-light text-zinc-600 sm:text-xl dark:text-zinc-400">
            A meticulously crafted collection of premium templates and components for React and
            Tailwind CSS. The fastest path to extraordinary applications.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://danihudbird.gumroad.com/l/hudbirdui-pro-allaccess"
              target="_blank"
              rel="noreferrer"
            >
              <Button
                size="lg"
                color="dark/white"
                className="rounded-full border-0 px-8 py-6 text-base font-medium shadow-2xl shadow-black/10 transition-transform hover:scale-105 active:scale-95 dark:shadow-white/5"
              >
                Unlock Pro Access
              </Button>
            </a>
            <a href="#templates">
              <Button
                size="lg"
                variant="outline"
                color="zinc"
                className="rounded-full border-zinc-200 px-8 py-6 text-base font-medium transition-colors hover:bg-zinc-100 dark:border-white/10 dark:hover:bg-white/5"
              >
                Explore Templates
              </Button>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Massive Visual Showcase (The Bento Grid Marquee) */}
      <div className="relative mt-20 w-full overflow-hidden pb-10">
        {/* Luxurious Ambient Glows */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {/* Top/Center subtle glow */}
          <div className="absolute top-1/4 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-blue-500/50 opacity-20 mix-blend-multiply blur-[100px] dark:mix-blend-screen" />

          {/* Luxurious Bottom Gradient Glows */}
          <div className="absolute inset-x-0 bottom-[-150px] flex justify-center opacity-40 mix-blend-multiply dark:opacity-30 dark:mix-blend-screen">
            <div className="absolute h-[400px] w-[600px] -translate-x-[300px] rounded-full bg-blue-500/60 blur-[120px]" />
            <div className="absolute h-[400px] w-[600px] translate-x-[300px] rounded-full bg-purple-500/60 blur-[120px]" />
            <div className="absolute bottom-0 h-[300px] w-full bg-gradient-to-t from-blue-400/20 via-purple-400/10 to-transparent blur-3xl" />
          </div>
        </div>
        {/* Marquee Content */}
        <div className="relative z-20 mx-auto flex w-full items-center">
          {/* Left/Right Fade Masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-30 w-16 bg-gradient-to-r from-white to-transparent md:w-48 dark:from-[#030712]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-30 w-16 bg-gradient-to-l from-white to-transparent md:w-48 dark:from-[#030712]" />

          {/* Scrolling Track - Slide Right Slowly */}
          <motion.div
            className="flex gap-6"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            style={{ width: "max-content" }}
          >
            {/* First Grid */}
            <div className="w-[1200px] columns-1 gap-6 space-y-6 px-4 md:columns-2 lg:columns-4">
              {bentoCards.map((card, i) => (
                <div key={i} className="break-inside-avoid">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="w-full overflow-visible rounded-[2rem] border border-zinc-100 bg-white shadow-xl shadow-zinc-200/50 hover:z-40 hover:shadow-2xl dark:border-white/5 dark:bg-[#0a0a0b] dark:shadow-none"
                  >
                    {card}
                  </motion.div>
                </div>
              ))}
            </div>
            {/* Second Grid (Duplicate) */}
            <div className="w-[1200px] columns-1 gap-6 space-y-6 px-4 md:columns-2 lg:columns-4">
              {bentoCards.map((card, i) => (
                <div key={`dup-${i}`} className="break-inside-avoid">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="w-full overflow-visible rounded-[2rem] border border-zinc-100 bg-white shadow-xl shadow-zinc-200/50 hover:z-40 hover:shadow-2xl dark:border-white/5 dark:bg-[#0a0a0b] dark:shadow-none"
                  >
                    {card}
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Luxurious Bottom Fade Mask (Effect Menghilang) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-80 bg-gradient-to-t from-white via-white/90 to-transparent dark:from-[#030712] dark:via-[#030712]/90" />
      </div>
    </section>
  );
}

// 4 Custom Core Component Cards for the Showcase
const cards = [
  // 1. Media Player
  <div key="c1" className="flex h-full w-full flex-col justify-between gap-5">
    <div className="relative h-44 w-full overflow-hidden rounded-[1.25rem] shadow-inner">
      <motion.div
        animate={{
          background: [
            "linear-gradient(to bottom right, #6366f1, #a855f7)",
            "linear-gradient(to bottom right, #3b82f6, #8b5cf6)",
            "linear-gradient(to bottom right, #6366f1, #a855f7)",
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      />
      {/* Glossy overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent mix-blend-overlay" />
      <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]" />
    </div>

    <div>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
            Neon Nights
          </div>
          <div className="mt-0.5 text-xs font-medium text-zinc-500">Synthwave Boy</div>
        </div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Heart className="h-5 w-5 cursor-pointer text-zinc-400 transition-colors hover:text-rose-500" />
        </motion.div>
      </div>

      {/* Animated Progress Bar */}
      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-zinc-200/50 dark:bg-zinc-800/50">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="h-full rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]"
        />
      </div>

      <div className="mt-5 flex items-center justify-center gap-8 text-zinc-800 dark:text-zinc-200">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <SkipBack className="h-5 w-5 cursor-pointer fill-current transition-colors hover:text-blue-500" />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-zinc-900 text-white shadow-xl dark:bg-white dark:text-zinc-900"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0, 0.2, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-blue-500/30"
          />
          <Play className="z-10 ml-1 h-6 w-6 fill-current" />
        </motion.div>

        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <SkipForward className="h-5 w-5 cursor-pointer fill-current transition-colors hover:text-blue-500" />
        </motion.div>
      </div>
    </div>
  </div>,

  // 2. Storage Widget
  <div key="c2" className="flex h-full w-full flex-col items-center justify-between py-2">
    <div className="relative flex h-40 w-40 items-center justify-center">
      {/* Background Circle */}
      <svg className="absolute inset-0 h-full w-full -rotate-90 overflow-visible">
        <circle
          cx="50%"
          cy="50%"
          r="42%"
          className="stroke-zinc-100 dark:stroke-zinc-800/50"
          strokeWidth="12"
          fill="none"
        />
      </svg>
      {/* Animated Foreground Circle */}
      <svg className="absolute inset-0 h-full w-full -rotate-90 overflow-visible">
        <motion.circle
          cx="50%"
          cy="50%"
          r="42%"
          className="stroke-blue-500 drop-shadow-[0_0_12px_rgba(59,130,246,0.6)]"
          strokeWidth="12"
          strokeDasharray="264"
          initial={{ strokeDashoffset: 264 }}
          animate={{ strokeDashoffset: 74 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {/* Pulsing inner glow */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute h-24 w-24 rounded-full bg-blue-500/20 blur-xl"
      />

      <div className="z-10 text-center">
        <div className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
          74<span className="text-lg font-bold text-zinc-400 dark:text-zinc-500">%</span>
        </div>
        <div className="mt-0.5 text-[10px] font-bold tracking-widest text-zinc-500 uppercase dark:text-zinc-400">
          Used
        </div>
      </div>
    </div>

    <div className="mt-4 w-full space-y-4 px-2">
      <div className="group flex items-center justify-between rounded-xl border border-transparent p-3 transition-colors hover:border-zinc-100 hover:bg-zinc-50 dark:hover:border-white/5 dark:hover:bg-white/[0.02]">
        <span className="flex items-center gap-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          <div className="h-2.5 w-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
          Documents
        </span>
        <span className="text-sm font-bold text-zinc-900 dark:text-white">42.5 GB</span>
      </div>
      <div className="group flex items-center justify-between rounded-xl border border-transparent p-3 transition-colors hover:border-zinc-100 hover:bg-zinc-50 dark:hover:border-white/5 dark:hover:bg-white/[0.02]">
        <span className="flex items-center gap-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          <div className="h-2.5 w-2.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
          Media
        </span>
        <span className="text-sm font-bold text-zinc-900 dark:text-white">18.2 GB</span>
      </div>
    </div>
  </div>,

  // 3. User Profile
  <div
    key="c3"
    className="flex h-full w-full flex-col items-center justify-between pt-2 text-center"
  >
    <div className="relative flex w-full flex-col items-center">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute top-0 -mx-6 -mt-8 h-24 w-full rounded-t-[2rem] bg-gradient-to-b from-blue-500/10 to-transparent" />

      <div className="relative mt-2">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-0.5 rounded-full bg-gradient-to-tr from-blue-500 via-indigo-500 to-cyan-400 opacity-30 blur-[2px]"
        />
        <div className="relative h-20 w-20 rounded-full bg-gradient-to-tr from-blue-500 via-indigo-500 to-cyan-400 p-[2px]">
          <div className="h-full w-full overflow-hidden rounded-full border-[3px] border-white bg-zinc-200 dark:border-[#0a0a0b]">
            <img
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=faces"
              alt="Sarah Jenkins"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      <h3 className="mt-5 text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
        Sarah Jenkins
      </h3>
      <p className="mt-1 text-sm font-medium text-zinc-500">Product Designer</p>

      <div className="mt-6 flex w-full gap-3">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="flex-1 rounded-xl bg-blue-600 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-500"
        >
          Follow
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="flex-1 rounded-xl border border-zinc-200 bg-white py-2.5 text-sm font-bold text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-900 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:bg-white/10"
        >
          Message
        </motion.button>
      </div>
    </div>

    <div className="flex w-full justify-around border-t border-zinc-100 pt-5 pb-2 dark:border-white/5">
      <div className="flex flex-col items-center">
        <div className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">12.4k</div>
        <div className="mt-1 text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
          Followers
        </div>
      </div>
      <div className="w-px bg-zinc-100 dark:bg-white/5" />
      <div className="flex flex-col items-center">
        <div className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">842</div>
        <div className="mt-1 text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
          Following
        </div>
      </div>
    </div>
  </div>,

  // 4. Finance Card
  <div key="c4" className="flex h-full w-full flex-col justify-between">
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-sm font-bold text-zinc-900 dark:text-white">
          <motion.div
            animate={{ y: [0, 2, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-100 shadow-sm dark:border-emerald-500/20 dark:bg-emerald-500/10"
          >
            <span className="text-xl leading-none font-bold text-emerald-600 dark:text-emerald-400">
              ↓
            </span>
          </motion.div>
          Received
        </div>
        <div className="relative overflow-hidden rounded-md border border-zinc-200/50 bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-500 dark:border-white/5 dark:bg-white/5 dark:text-zinc-400">
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
            className="absolute inset-0 w-1/2 skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/10"
          />
          Just now
        </div>
      </div>
      <div className="mt-8">
        <div className="text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
          $4,250<span className="text-3xl font-bold text-zinc-300 dark:text-zinc-600">.00</span>
        </div>
        <div className="mt-2 text-sm font-medium text-zinc-500">
          from <span className="font-semibold text-zinc-900 dark:text-white">Apple Inc.</span>
        </div>
      </div>
    </div>

    <div className="mt-6 space-y-2 rounded-2xl border border-zinc-100 bg-zinc-50/50 p-2 dark:border-white/5 dark:bg-white/[0.02]">
      <div className="flex items-center justify-between rounded-xl p-3 transition-colors hover:bg-white dark:hover:bg-white/[0.02]">
        <div className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Auto-invest</div>
        <motion.div
          whileTap={{ scale: 0.9 }}
          className="relative h-6 w-11 cursor-pointer rounded-full bg-blue-500 p-[3px] shadow-inner"
        >
          <motion.div
            layout
            className="h-full w-5 translate-x-[20px] rounded-full bg-white shadow-sm"
          />
        </motion.div>
      </div>
      <div className="flex items-center justify-between rounded-xl p-3 transition-colors hover:bg-white dark:hover:bg-white/[0.02]">
        <div className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Push alert</div>
        <motion.div
          whileTap={{ scale: 0.9 }}
          className="relative h-6 w-11 cursor-pointer rounded-full bg-blue-500 p-[3px] shadow-inner"
        >
          <motion.div
            layout
            className="h-full w-5 translate-x-[20px] rounded-full bg-white shadow-sm"
          />
        </motion.div>
      </div>
    </div>
  </div>,
];

// Additional smaller bento cards for the masonry layout
const c5 = (
  <div key="c5" className="flex h-full flex-col gap-4">
    <div className="flex items-center justify-between">
      <span className="text-sm font-semibold text-zinc-900 dark:text-white">Show Frame</span>
      <div className="h-6 w-11 rounded-full bg-zinc-800 p-1 dark:bg-white">
        <div className="h-4 w-4 translate-x-5 rounded-full bg-white dark:bg-zinc-900" />
      </div>
    </div>
    <div className="h-px w-full bg-zinc-100 dark:bg-white/5" />
    <div>
      <span className="text-sm font-semibold text-zinc-900 dark:text-white">Artboard</span>
      <div className="mt-3 flex gap-2">
        <div className="flex-1 rounded-xl bg-zinc-50 px-3 py-2 text-xs font-medium text-zinc-500 dark:bg-white/5">
          W 800
        </div>
        <div className="flex-1 rounded-xl bg-zinc-50 px-3 py-2 text-xs font-medium text-zinc-500 dark:bg-white/5">
          H 600
        </div>
      </div>
    </div>
  </div>
);

const c6 = (
  <div key="c6" className="flex h-full flex-col gap-4">
    <div className="flex items-center justify-between">
      <span className="text-sm font-semibold text-zinc-900 dark:text-white">Materials</span>
      <Plus className="h-4 w-4 text-zinc-400" />
    </div>
    <div className="grid grid-cols-2 gap-3">
      <div className="flex aspect-square items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-zinc-300 to-zinc-500 shadow-inner" />
      </div>
      <div className="flex aspect-square items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-200 to-amber-600 shadow-inner" />
      </div>
      <div className="flex aspect-square items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-300 to-blue-600 shadow-inner" />
      </div>
      <div className="flex aspect-square items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-rose-300 to-rose-600 shadow-inner" />
      </div>
    </div>
  </div>
);

const c7 = (
  <div key="c7" className="flex h-full flex-col gap-3">
    <div className="flex gap-3">
      <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-blue-100">
        <img
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=faces"
          alt="Elena Rodriguez"
          className="h-full w-full object-cover"
        />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-zinc-900 dark:text-white">Elena Rodriguez</span>
          <span className="text-xs text-zinc-400">2s</span>
        </div>
        <p className="mt-1 text-sm leading-snug text-zinc-600 dark:text-zinc-400">
          The new analytics dashboard looks excellent. Could we schedule a review before the Q3
          stakeholder meeting? 📊
        </p>
      </div>
    </div>
    <div className="mt-2 flex items-center gap-2 rounded-xl bg-zinc-50 p-2 dark:bg-white/5">
      <div className="h-6 w-6 shrink-0 rounded-full bg-blue-200" />
      <span className="flex-1 text-xs font-medium text-zinc-400">Reply</span>
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-700">
        <span className="text-xs font-bold">↑</span>
      </div>
    </div>
  </div>
);

const c8 = (
  <div key="c8" className="flex h-full flex-col gap-2">
    <div className="mb-2 flex items-center justify-between">
      <div>
        <span className="text-sm font-bold text-zinc-900 dark:text-white">Robot 2.0</span>
        <span className="block text-[10px] text-zinc-400">3D Design Project</span>
      </div>
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-50 dark:bg-white/5">
        <span className="text-xs">⌘</span>
      </div>
    </div>

    <div className="flex flex-col gap-1">
      {["Camera 1", "Dome Light", "Key Light", "Area Light"].map((t) => (
        <div
          key={t}
          className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 hover:bg-zinc-50 dark:hover:bg-white/5"
        >
          <div className="h-4 w-4 rounded bg-zinc-200 dark:bg-zinc-800" />
          <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{t}</span>
        </div>
      ))}
    </div>
  </div>
);

const c9 = (
  <div key="c9" className="flex h-full flex-col gap-4">
    <div className="flex items-center justify-between">
      <span className="text-sm font-semibold text-zinc-900 dark:text-white">Styles</span>
      <Plus className="h-4 w-4 text-zinc-400" />
    </div>
    <div className="flex gap-3">
      <div className="h-24 flex-1 rounded-xl bg-gradient-to-tr from-cyan-200 to-blue-400 shadow-inner" />
      <div className="h-24 flex-1 rounded-xl bg-gradient-to-tr from-fuchsia-300 to-rose-400 shadow-inner" />
    </div>
  </div>
);

// We combine the original 4 rich cards with the new 5 smaller UI panel cards to form the grid
const bentoCards = [
  <div key="b1" className="h-full p-6">
    {c5}
  </div>,
  <div key="b2" className="h-full p-6">
    {c9}
  </div>,
  <div key="b3" className="h-full p-6">
    {c7}
  </div>,
  <div key="b4" className="h-full bg-zinc-50/50 p-6 dark:bg-black/20">
    {cards[0]}
  </div>,
  <div key="b5" className="h-full p-6">
    {c6}
  </div>,
  <div key="b6" className="h-full p-6">
    {c8}
  </div>,
  <div key="b7" className="h-full bg-zinc-50/50 p-6 dark:bg-black/20">
    {cards[1]}
  </div>,
  <div key="b8" className="h-full p-6">
    {c7}
  </div>,
  <div key="b9" className="h-full bg-zinc-50/50 p-6 dark:bg-black/20">
    {cards[3]}
  </div>,
  <div key="b10" className="h-full bg-zinc-50/50 p-6 dark:bg-black/20">
    {cards[2]}
  </div>,
];
