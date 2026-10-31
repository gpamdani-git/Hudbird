/**
 * MorphingUIHero
 *
 * One shape morphs through 11 UI component states in a seamless loop.
 * A cursor drives every transition with visible clicks.
 * Springs everywhere, tiny overshoot at most.
 *
 * States: Button → Loader → Check → Dynamic Island → Player →
 *         Slider → Toggle → Tabs → Chart → ⌘K → Toast → (loop)
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Play,
  Search,
  ArrowRight,
  Music2,
  Pause,
  SkipBack,
  SkipForward,
  Cast,
  Shuffle,
  Volume2,
} from "lucide-react";

// ─── Springs ──────────────────────────────────────────────────────────────
const MORPH = { type: "spring" as const, stiffness: 450, damping: 22, bounce: 0.4 };
const CURSOR_SPRING = { type: "spring" as const, stiffness: 350, damping: 20 };

// ─── Dark mode detection ──────────────────────────────────────────────────
function useDark(): boolean {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const el = document.documentElement;
    const sync = () => setDark(el.classList.contains("dark"));
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return dark;
}

// ─── State config ─────────────────────────────────────────────────────────
interface StateConfig {
  key: string;
  label: string;
  w: number;
  h: number;
  r: number;
  bg: [string, string]; // [light, dark]
  border?: [string, string];
  shadow?: [string, string];
  hold: number;
}

const STATES: StateConfig[] = [
  {
    key: "button",
    label: "Button",
    w: 200,
    h: 48,
    r: 24,
    bg: ["#3b82f6", "#3b82f6"],
    hold: 1400,
  },
  {
    key: "loader",
    label: "Loader",
    w: 48,
    h: 48,
    r: 24,
    bg: ["#f4f4f5", "#18181b"],
    hold: 1200,
  },
  {
    key: "check",
    label: "Success",
    w: 48,
    h: 48,
    r: 24,
    bg: ["#22c55e", "#22c55e"],
    hold: 900,
  },
  {
    key: "island",
    label: "Dynamic Island",
    w: 176,
    h: 40,
    r: 20,
    bg: ["#000000", "#000000"],
    hold: 1400,
  },
  {
    key: "player",
    label: "Expanded Player",
    w: 320,
    h: 160,
    r: 40,
    bg: ["#1e1b4b", "#1e1b4b"], // Indigo 950 for smooth color morph
    hold: 1800,
  },
  {
    key: "slider",
    label: "Slider",
    w: 256,
    h: 40,
    r: 20,
    bg: ["#f4f4f5", "#18181b"],
    hold: 1300,
  },
  {
    key: "toggle",
    label: "Toggle",
    w: 56,
    h: 32,
    r: 16,
    bg: ["#3b82f6", "#3b82f6"],
    hold: 1200,
  },
  {
    key: "tabs",
    label: "Tabs",
    w: 304,
    h: 40,
    r: 16,
    bg: ["#f4f4f5", "#18181b"],
    border: ["#e4e4e7", "#27272a"],
    hold: 1500,
  },
  {
    key: "chart",
    label: "Chart",
    w: 328,
    h: 192,
    r: 16,
    bg: ["#ffffff", "#09090b"],
    border: ["#e4e4e7", "#27272a"],
    shadow: ["0 1px 3px rgba(0,0,0,0.08)", "0 1px 3px rgba(0,0,0,0.3)"],
    hold: 1800,
  },
  {
    key: "command",
    label: "⌘K",
    w: 336,
    h: 208,
    r: 16,
    bg: ["#ffffff", "#09090b"],
    border: ["#e4e4e7", "#27272a"],
    shadow: ["0 16px 40px rgba(0,0,0,0.08)", "0 16px 40px rgba(0,0,0,0.4)"],
    hold: 2000,
  },
  {
    key: "toast",
    label: "Toast",
    w: 240,
    h: 48,
    r: 24,
    bg: ["#ffffff", "#18181b"],
    border: ["#e4e4e7", "#27272a"],
    shadow: ["0 4px 12px rgba(0,0,0,0.06)", "0 4px 12px rgba(0,0,0,0.3)"],
    hold: 1200,
  },
  {
    key: "music-library",
    label: "Music Library",
    w: 360,
    h: 416,
    r: 32,
    bg: ["#474367", "#474367"], // Solid purple fallback
    hold: 3800, // Longer hold to show off the swipe animation!
  },
];

// Cursor offset from center of morph element
const CURSOR: [number, number][] = [
  [55, 3], // button
  [0, -34], // loader
  [0, -34], // check
  [75, 2], // island (spotify icon)
  [0, 50], // player (pause button)
  [75, 3], // slider
  [16, 3], // toggle
  [50, 3], // tabs
  [65, -30], // chart
  [0, -68], // command
  [82, 3], // toast
  [0, 140], // music-library (pause button)
];

// ─── Typing animation for ⌘K ─────────────────────────────────────────────
function TypedText({ text, delay = 400 }: { text: string; delay?: number }) {
  const [len, setLen] = useState(0);

  useEffect(() => {
    setLen(0);
    let i = 0;
    let iv: ReturnType<typeof setInterval> | undefined;
    const st = setTimeout(() => {
      iv = setInterval(() => {
        i += 1;
        setLen(i);
        if (i >= text.length && iv) clearInterval(iv);
      }, 70);
    }, delay);
    return () => {
      clearTimeout(st);
      if (iv) clearInterval(iv);
    };
  }, [text, delay]);

  return (
    <>
      <span className="text-sm text-zinc-900 dark:text-white">{text.slice(0, len)}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="ml-px inline-block h-3.5 w-[1.5px] translate-y-px bg-blue-500"
      />
    </>
  );
}

// ─── Content renderer per state ───────────────────────────────────────────

function MusicLibraryContent() {
  const [idx, setIdx] = useState(0);

  // Swipe animation interval
  useEffect(() => {
    // Delay the first swipe to let the shape morph finish
    const startDelay = setTimeout(() => {
      setIdx((prev) => prev + 1);
      const interval = setInterval(() => setIdx((prev) => prev + 1), 1400);
      return () => clearInterval(interval);
    }, 600);
    return () => clearTimeout(startDelay);
  }, []);

  const covers = [
    { title: "Rusuk", artist: "Gery & Gany", color: "from-indigo-400/80 to-purple-600/80" },
    { title: "Sial", artist: "Mahalini", color: "from-rose-400/80 to-red-600/80" },
    { title: "Monokrom", artist: "Tulus", color: "from-zinc-500/80 to-zinc-800/80" },
    { title: "Hati", artist: "Kunto Aji", color: "from-amber-400/80 to-orange-600/80" },
    { title: "Sempurna", artist: "Andra", color: "from-emerald-400/80 to-teal-600/80" },
  ];

  const activeCover = covers[idx % 5];

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-between overflow-hidden p-8 text-white select-none">
      <div className="flex items-center gap-2 opacity-60">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.6 14.4c-.2.3-.6.4-.9.2-2.4-1.5-5.4-1.8-8.9-1-.4.1-.7-.2-.8-.6-.1-.4.2-.7.6-.8 3.9-.9 7.2-.5 9.8 1.1.4.2.4.6.2 1.1zm1.2-2.7c-.2.4-.7.5-1.1.3-2.7-1.7-6.8-2.2-9.8-1.2-.4.1-.9-.1-1-.6-.1-.4.1-.9.6-1 3.5-1.1 8-0.6 11.1 1.3.4.2.5.8.2 1.2zm.1-2.9c-3.2-1.9-8.5-2.1-11.5-1.2-.5.1-1-.2-1.2-.7-.1-.5.2-1 .7-1.2 3.5-1 9.4-.7 13.1 1.5.5.3.6.9.3 1.4-.2.5-.8.6-1.4.2z" />
        </svg>
        <span className="text-[14px] font-semibold tracking-wide">Spotify</span>
      </div>

      {/* Cover Flow Simulator */}
      <div className="relative flex h-[144px] w-full items-center justify-center perspective-[1000px]">
        {covers.map((cover, i) => {
          let offset = (i - (idx % 5)) % 5;
          // Wrap around logic for smooth circular carousel
          if (offset < -2) offset += 5;
          if (offset > 2) offset -= 5;
          const isCenter = offset === 0;

          return (
            <motion.div
              key={cover.title} // Use title so React tracks it properly
              initial={{ opacity: 0, x: offset * 40, scale: 0.8 }}
              animate={{
                opacity: isCenter ? 1 : 0.6 - Math.abs(offset) * 0.2,
                x: offset * 50,
                scale: isCenter ? 1 : 0.85 - Math.abs(offset) * 0.1,
                rotateY: offset * -20,
                zIndex: 10 - Math.abs(offset),
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                opacity: { duration: 0.4 },
              }}
              className={`absolute flex h-[144px] w-[144px] flex-col items-center overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br shadow-2xl backdrop-blur-xl ${cover.color} ${!isCenter ? "brightness-[0.6]" : ""}`}
            >
              <span className="mt-8 text-[18px] leading-tight font-bold text-white drop-shadow-md">
                {cover.title}
              </span>
              <span className="mt-auto mb-3 text-[10px] font-medium text-white/80">
                {cover.artist}
              </span>
            </motion.div>
          );
        })}
      </div>

      <p className="text-[12px] text-white/60">
        List lagu yang sekali denger langsung suka, dijamin :D
      </p>

      {/* Glass Player Pill */}
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.55, type: "spring", stiffness: 300, damping: 25 }}
        className="flex h-16 w-full items-center justify-between rounded-full border border-white/10 bg-white/10 px-4 shadow-inner backdrop-blur-md"
      >
        <div className="flex gap-4 pl-2">
          <SkipBack
            size={16}
            className="cursor-pointer fill-white text-white transition-colors hover:text-white/80"
          />
          <Pause
            size={16}
            className="cursor-pointer fill-white text-white transition-colors hover:text-white/80"
          />
          <SkipForward
            size={16}
            className="cursor-pointer fill-white text-white transition-colors hover:text-white/80"
          />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="flex h-[12px] items-end gap-[2px]">
            {[4, 8, 3, 6, 2].map((h, i) => (
              <motion.div
                key={i}
                animate={{ height: [h, h * 2, h] }}
                transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.1 }}
                className="w-[2px] rounded-full bg-white"
              />
            ))}
          </div>
        </div>
        <div className="flex gap-4 pr-2 text-white/70">
          <Cast size={16} className="cursor-pointer transition-colors hover:text-white" />
          <Shuffle size={16} className="cursor-pointer transition-colors hover:text-white" />
          <Volume2 size={16} className="cursor-pointer transition-colors hover:text-white" />
        </div>
      </motion.div>
    </div>
  );
}

function StateContent({ stateKey }: { stateKey: string }) {
  switch (stateKey) {
    /* ── Button ─────────────────────────────────────────────────── */
    case "button":
      return (
        <div className="flex items-center gap-2 select-none">
          <span className="text-[13px] font-semibold text-white">Get Started</span>
          <ArrowRight size={14} className="text-white/70" />
        </div>
      );

    /* ── Loader ─────────────────────────────────────────────────── */
    case "loader":
      return (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 0.75, repeat: Infinity, ease: "linear" }}
          className="h-6 w-6 rounded-full border-[2.5px] border-zinc-300 border-t-blue-500 dark:border-zinc-600 dark:border-t-blue-400"
        />
      );

    /* ── Success Check ──────────────────────────────────────────── */
    case "check":
      return (
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.45, type: "spring", stiffness: 500, damping: 18 }}
        >
          <Check size={24} className="text-white" strokeWidth={3} />
        </motion.div>
      );

    /* ── Dynamic Island ─────────────────────────────────────────── */
    case "island":
      return (
        <div className="flex h-full w-full items-center justify-between px-4 select-none">
          <div className="flex items-center gap-2.5">
            {/* Green waveform */}
            <div className="flex h-[12px] items-end gap-[1.5px]">
              {[8, 12, 6, 10].map((h, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [h * 0.4, h, h * 0.4] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeInOut",
                  }}
                  className="w-[1.5px] rounded-full bg-[#1ed760]"
                />
              ))}
            </div>
            <span className="text-[13px] font-semibold tracking-tight text-white/90">00:51</span>
          </div>
          {/* Spotify icon */}
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1ed760]">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="black">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.6 14.4c-.2.3-.6.4-.9.2-2.4-1.5-5.4-1.8-8.9-1-.4.1-.7-.2-.8-.6-.1-.4.2-.7.6-.8 3.9-.9 7.2-.5 9.8 1.1.4.2.4.6.2 1.1zm1.2-2.7c-.2.4-.7.5-1.1.3-2.7-1.7-6.8-2.2-9.8-1.2-.4.1-.9-.1-1-.6-.1-.4.1-.9.6-1 3.5-1.1 8-0.6 11.1 1.3.4.2.5.8.2 1.2zm.1-2.9c-3.2-1.9-8.5-2.1-11.5-1.2-.5.1-1-.2-1.2-.7-.1-.5.2-1 .7-1.2 3.5-1 9.4-.7 13.1 1.5.5.3.6.9.3 1.4-.2.5-.8.6-1.4.2z" />
            </svg>
          </div>
        </div>
      );

    /* ── Music Player ───────────────────────────────────────────── */
    case "player":
      return (
        <div className="flex h-full w-full flex-col justify-center p-6 text-white select-none">
          <div className="flex w-full items-center gap-4">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl shadow-sm">
              <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=150&auto=format&fit=crop')] bg-cover bg-center" />
            </div>
            <div className="flex flex-col">
              <span className="text-[16px] leading-tight font-semibold tracking-tight text-white/95">
                Go Let It Out
              </span>
              <span className="mt-[2px] text-[12px] font-medium text-indigo-200/80">Oasis</span>
            </div>
            <div className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-white opacity-90 shadow-sm">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="black">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.6 14.4c-.2.3-.6.4-.9.2-2.4-1.5-5.4-1.8-8.9-1-.4.1-.7-.2-.8-.6-.1-.4.2-.7.6-.8 3.9-.9 7.2-.5 9.8 1.1.4.2.4.6.2 1.1zm1.2-2.7c-.2.4-.7.5-1.1.3-2.7-1.7-6.8-2.2-9.8-1.2-.4.1-.9-.1-1-.6-.1-.4.1-.9.6-1 3.5-1.1 8-0.6 11.1 1.3.4.2.5.8.2 1.2zm.1-2.9c-3.2-1.9-8.5-2.1-11.5-1.2-.5.1-1-.2-1.2-.7-.1-.5.2-1 .7-1.2 3.5-1 9.4-.7 13.1 1.5.5.3.6.9.3 1.4-.2.5-.8.6-1.4.2z" />
              </svg>
            </div>
          </div>

          <div className="mt-6 flex w-full items-center gap-4">
            <span className="text-[12px] font-medium text-indigo-200/70">2:35</span>
            <div className="relative h-1 flex-1 rounded-full bg-indigo-900/50">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-white"
                initial={{ width: "0%" }}
                animate={{ width: "60%" }}
                transition={{ delay: 0.45, duration: 2, ease: "easeOut" }}
              />
              <motion.div
                className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-sm"
                initial={{ left: "0%" }}
                animate={{ left: "60%" }}
                transition={{ delay: 0.45, duration: 2, ease: "easeOut" }}
              />
            </div>
            <span className="text-[12px] font-medium text-indigo-200/70">-2:02</span>
          </div>

          <div className="mt-6 flex w-full items-center justify-center gap-8">
            <SkipBack
              size={20}
              className="cursor-pointer fill-white/80 text-white/80 transition-colors hover:fill-white hover:text-white"
            />
            <Pause
              size={24}
              className="cursor-pointer fill-white text-white transition-colors hover:scale-105"
            />
            <SkipForward
              size={20}
              className="cursor-pointer fill-white/80 text-white/80 transition-colors hover:fill-white hover:text-white"
            />
          </div>
        </div>
      );

    /* ── Slider ──────────────────────────────────────────────────── */
    case "slider":
      return (
        <div className="relative flex h-full w-full items-center px-4">
          {/* Track */}
          <div className="relative h-2 w-full rounded-full bg-zinc-300 dark:bg-zinc-600">
            {/* Fill */}
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-blue-500"
              initial={{ width: "0%" }}
              animate={{ width: "60%" }}
              transition={{
                delay: 0.45,
                type: "spring",
                stiffness: 280,
                damping: 20,
              }}
            />
            {/* Knob */}
            <motion.div
              className="absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 shadow-md ring-4 ring-white dark:ring-zinc-900"
              initial={{ left: "0%" }}
              animate={{ left: "60%" }}
              transition={{
                delay: 0.45,
                type: "spring",
                stiffness: 280,
                damping: 20,
              }}
            />
          </div>
        </div>
      );

    /* ── Toggle ──────────────────────────────────────────────────── */
    case "toggle":
      return (
        <div className="relative flex h-full w-full items-center px-1">
          <motion.div
            className="h-6 w-6 rounded-full bg-white shadow-sm"
            initial={{ x: 0 }}
            animate={{ x: 24 }}
            transition={{ delay: 0.45, type: "spring", stiffness: 500, damping: 24 }}
          />
        </div>
      );

    /* ── Tabs with liquid indicator ──────────────────────────────── */
    case "tabs": {
      const tabs = ["Overview", "Activity", "Settings"];
      return (
        <div className="relative flex h-full w-full items-center select-none">
          {tabs.map((tab, i) => (
            <div key={tab} className="flex flex-1 items-center justify-center">
              <span
                className={`text-[11px] font-medium ${
                  i === 1 ? "text-blue-600 dark:text-blue-400" : "text-zinc-400 dark:text-zinc-500"
                }`}
              >
                {tab}
              </span>
            </div>
          ))}
          {/* Liquid indicator — leading edge springs faster than trailing */}
          <motion.div
            className="absolute bottom-0 h-[2.5px] rounded-full bg-blue-500"
            initial={{ left: "6%", right: "66%" }}
            animate={{ left: "36%", right: "36%" }}
            transition={{
              left: { delay: 0.45, type: "spring", stiffness: 200, damping: 28 },
              right: { delay: 0.45, type: "spring", stiffness: 400, damping: 28 },
            }}
          />
        </div>
      );
    }

    /* ── Chart ────────────────────────────────────────────────────── */
    case "chart":
      return (
        <div className="flex h-full w-full flex-col p-4 select-none">
          <span className="text-[11px] font-semibold text-zinc-900 dark:text-white">
            Weekly Activity
          </span>
          <span className="mt-0.5 text-[9px] text-zinc-400 dark:text-zinc-500">Revenue by day</span>
          <div className="relative mt-3 flex flex-1 items-end gap-[6px]">
            {/* Area chart background */}
            <svg
              className="absolute inset-0 h-full w-full opacity-50 dark:opacity-30"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <defs>
                <linearGradient id="area-gradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.path
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                d="M0,65 L16.6,42 L33.3,58 L50,25 L66.6,10 L83.3,45 L100,52 L100,100 L0,100 Z"
                fill="url(#area-gradient)"
              />
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.45, ease: "easeInOut" }}
                d="M0,65 L16.6,42 L33.3,58 L50,25 L66.6,10 L83.3,45 L100,52"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-blue-500"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {[35, 58, 42, 75, 90, 55, 48].map((h, i) => (
              <div key={i} className="relative z-10 flex flex-1 flex-col items-center gap-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{
                    delay: 0.45 + i * 0.05,
                    type: "spring",
                    stiffness: 200,
                    damping: 18,
                  }}
                  className={`w-full rounded-[3px] ${
                    i === 4 ? "bg-blue-500" : "bg-blue-100 dark:bg-blue-500/15"
                  }`}
                />
                <span className="text-[7px] font-medium text-zinc-400 dark:text-zinc-600">
                  {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      );

    /* ── Command Palette ──────────────────────────────────────────── */
    case "command":
      return (
        <div className="flex h-full w-full flex-col overflow-hidden select-none">
          {/* Search row */}
          <div className="flex items-center gap-2 border-b border-zinc-200 px-3.5 py-2.5 dark:border-zinc-800">
            <Search size={13} className="shrink-0 text-zinc-400" />
            <TypedText text="button" />
            <div className="ml-auto flex shrink-0 items-center rounded border border-zinc-200 px-1.5 py-0.5 dark:border-zinc-700">
              <span className="text-[9px] font-medium text-zinc-400">⌘K</span>
            </div>
          </div>
          {/* Results */}
          <div className="flex flex-col gap-0.5 p-1.5">
            {[
              { label: "Button", desc: "Interactive button component" },
              { label: "ButtonGroup", desc: "Group of related buttons" },
              { label: "IconButton", desc: "Icon-only button" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.07 }}
                className={`flex flex-col rounded-lg px-3 py-2 ${
                  i === 0 ? "bg-blue-50 dark:bg-blue-500/10" : ""
                }`}
              >
                <span
                  className={`text-[11px] font-medium ${
                    i === 0
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  {item.label}
                </span>
                <span className="text-[9px] text-zinc-400 dark:text-zinc-500">{item.desc}</span>
              </motion.div>
            ))}
          </div>
        </div>
      );

    /* ── Toast ─────────────────────────────────────────────────────── */
    case "toast":
      return (
        <div className="flex items-center gap-2.5 px-4 select-none">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 18 }}
            className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-green-500"
          >
            <Check size={10} className="text-white" strokeWidth={3} />
          </motion.div>
          <span className="text-[12px] font-medium text-zinc-900 dark:text-white">
            Changes saved
          </span>
        </div>
      );

    /* ── Music Library ────────────────────────────────────────────── */
    case "music-library":
      return <MusicLibraryContent />;

    default:
      return null;
  }
}

// ─── Main component ───────────────────────────────────────────────────────
export const MorphingUIHero: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const [pressed, setPressed] = useState(false);
  const dark = useDark();
  const state = STATES[idx];
  const [cx, cy] = CURSOR[idx];

  // Auto-cycle through states
  useEffect(() => {
    const t = setTimeout(() => setIdx((i) => (i + 1) % STATES.length), state.hold);
    return () => clearTimeout(t);
  }, [idx, state.hold]);

  // Cursor press feedback (realistic timing)
  useEffect(() => {
    // Wait for cursor to arrive (400ms) then click for 150ms
    const t1 = setTimeout(() => setPressed(true), 400);
    const t2 = setTimeout(() => setPressed(false), 550);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [idx]);

  const bg = dark ? state.bg[1] : state.bg[0];
  const border = state.border ? (dark ? state.border[1] : state.border[0]) : undefined;
  const shadow = state.shadow ? (dark ? state.shadow[1] : state.shadow[0]) : "none";

  return (
    <div className="relative flex h-[280px] w-full items-center justify-center sm:h-[380px] md:h-[460px]">
      {/* ── Morphing container ───────────────────────────────────── */}
      <motion.div
        animate={{
          width: state.w,
          height: state.h,
          borderRadius: state.r,
          backgroundColor: bg,
          borderColor: border || "transparent",
          borderWidth: border ? 1 : 0,
          boxShadow: shadow,
        }}
        transition={MORPH}
        className="relative z-10 flex items-center justify-center overflow-hidden"
        style={{ borderStyle: "solid" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={state.key}
            initial={{ opacity: 0, filter: "blur(6px)" }}
            animate={{
              opacity: 1,
              filter: "blur(0px)",
              transition: { duration: 0.18, delay: 0.06 },
            }}
            exit={{
              opacity: 0,
              filter: "blur(6px)",
              transition: { duration: 0.1 },
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <StateContent stateKey={state.key} />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ── Cursor ───────────────────────────────────────────────── */}
      <motion.div
        className="pointer-events-none absolute z-30"
        style={{ top: "50%", left: "50%" }}
        animate={{ x: cx, y: cy, scale: pressed ? 0.8 : 1 }}
        transition={CURSOR_SPRING}
      >
        {state.key === "slider" ? (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            className="-translate-x-1/2 -translate-y-1/2 drop-shadow-sm"
          >
            <circle cx="12" cy="12" r="10" fill="white" stroke="black" strokeWidth="1.2" />
            <path
              d="M8 12h8m-2-3l3 3-3 3M10 9l-3 3 3 3"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg width="15" height="19" viewBox="0 0 15 19" fill="none" className="drop-shadow-sm">
            <path
              d="M1 1L1 15.5L4.5 12L7.5 18L9.5 17L6.5 11L12 11L1 1Z"
              fill="white"
              stroke="black"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {/* Click ripple (After Effects style) */}
        <AnimatePresence>
          {pressed && (
            <div className="absolute top-[1px] left-[1px]">
              <motion.div
                initial={{ scale: 0, opacity: 0.8, borderWidth: 2 }}
                animate={{ scale: 4, opacity: 0, borderWidth: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute -mt-2 -ml-2 h-4 w-4 rounded-full border-blue-500 bg-transparent"
              />
              <motion.div
                initial={{ scale: 0, opacity: 0.6, borderWidth: 2 }}
                animate={{ scale: 6, opacity: 0, borderWidth: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
                className="absolute -mt-2 -ml-2 h-4 w-4 rounded-full border-sky-400 bg-transparent"
              />
            </div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── State label ──────────────────────────────────────────── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 sm:bottom-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={state.key}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-2"
          >
            <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            <span className="text-[11px] font-medium tracking-wide text-zinc-400 dark:text-zinc-500">
              {state.label}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
