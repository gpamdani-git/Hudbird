"use client";

import React from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionItem } from "@hudbird/ui";
import { cn } from "../../utils/cn";
import { FaqItem } from "./Faq";

export interface FaqWithIllustrationProps {
  title?: string;
  description?: string;
  faqs: FaqItem[];
  className?: string;
  /**
   * Override the accordion accent color on hover & expanded state.
   * e.g. "text-violet-600 dark:text-violet-400"
   */
  accentClassName?: string;
}

const AnimatedIllustration = () => {
  return (
    <div className="relative flex h-[350px] w-full items-center justify-center overflow-hidden rounded-2xl border border-zinc-100 bg-sky-50 sm:h-[450px] dark:border-zinc-800/50 dark:bg-sky-950/20">
      {/* Background grids / lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Decorative glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400/20 blur-[64px] dark:bg-sky-600/20"></div>

      {/* Main composition container - slightly rotated to give a pseudo-3D perspective */}
      <div className="relative flex aspect-square w-full max-w-sm items-center justify-center">
        <motion.div
          className="relative h-full w-full perspective-[1000px]"
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Base Platform (Isometric style) */}
          <div
            className="absolute top-[60%] left-1/2 h-64 w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-[3rem] border border-white/60 bg-white/50 shadow-2xl backdrop-blur-sm sm:w-[110%] dark:border-zinc-700/50 dark:bg-zinc-800/30"
            style={{ transform: "rotateX(65deg) rotateZ(-45deg)" }}
          >
            {/* Lines moving on platform */}
            <div className="absolute inset-0 overflow-hidden rounded-[3rem] opacity-50">
              <motion.div
                className="absolute left-[20%] h-full w-1.5 bg-sky-400/40"
                animate={{ y: ["-100%", "100%"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute left-[80%] h-full w-1.5 bg-sky-400/40"
                animate={{ y: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
              />
            </div>
          </div>

          {/* Floating UI Card 1 (Dashboard) */}
          <motion.div
            className="absolute top-[15%] left-[5%] flex h-36 w-48 flex-col gap-4 rounded-2xl border border-zinc-200/50 bg-white/90 p-5 shadow-xl backdrop-blur-md sm:w-56 dark:border-zinc-800/80 dark:bg-zinc-900/90"
            animate={{ y: [0, -15, 0], rotateX: [0, 5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="h-2.5 w-2/3 rounded-full bg-sky-100 dark:bg-sky-900/50"></div>
            <div className="flex gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/20 dark:bg-sky-500/30">
                <div className="h-4 w-4 rounded-full bg-sky-500/50" />
              </div>
              <div className="flex flex-1 flex-col justify-center gap-2">
                <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800"></div>
                <div className="h-2 w-2/3 rounded-full bg-zinc-100 dark:bg-zinc-800"></div>
              </div>
            </div>
            <div className="relative mt-auto h-14 w-full overflow-hidden rounded-lg border border-zinc-100 bg-zinc-50 dark:border-zinc-800/80 dark:bg-zinc-800/50">
              <motion.div
                className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-sky-400/40 to-transparent"
                animate={{ height: ["30%", "90%", "50%", "80%", "30%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <svg
                className="absolute bottom-0 left-0 h-full w-full text-sky-500 opacity-30"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <motion.polyline
                  points="0,100 20,60 40,80 60,30 80,50 100,10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  initial={{ strokeDasharray: "0 1000" }}
                  animate={{ strokeDasharray: ["0 1000", "500 1000"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
              </svg>
            </div>
          </motion.div>

          {/* Floating UI Card 2 (Server Stack) */}
          <motion.div
            className="absolute top-[35%] right-[5%] flex w-32 flex-col gap-2.5 perspective-[500px] sm:right-[10%] sm:w-40"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="relative h-12 w-full overflow-hidden rounded-xl border-2 border-sky-300/50 bg-sky-500/90 shadow-lg backdrop-blur-md dark:border-sky-400/50 dark:bg-sky-600/90"
                style={{ transformOrigin: "left center" }}
                animate={{
                  backgroundColor: [
                    "rgba(14, 165, 233, 0.9)",
                    "rgba(56, 189, 248, 0.9)",
                    "rgba(14, 165, 233, 0.9)",
                  ],
                  rotateY: [0, -10, 0],
                }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.7, ease: "easeInOut" }}
              >
                <div className="absolute top-1/2 left-3 flex -translate-y-1/2 items-center gap-2">
                  <motion.div
                    className="h-2 w-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                    animate={{ opacity: [1, 0.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: Math.random() * 2 }}
                  />
                  <div className="h-1.5 w-1.5 rounded-full bg-white/40"></div>
                  <div className="h-1.5 w-1.5 rounded-full bg-white/40"></div>
                </div>
                <div className="absolute top-1/2 right-3 flex w-8 -translate-y-1/2 flex-col gap-1">
                  <div className="h-0.5 w-full rounded-full bg-white/30" />
                  <div className="h-0.5 w-2/3 rounded-full bg-white/30" />
                  <div className="h-0.5 w-full rounded-full bg-white/30" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export function FaqWithIllustration({
  title = "Frequently asked questions",
  description = "Explore answers to the most common questions from our trusted partners and clients.",
  faqs,
  className,
  accentClassName = "text-blue-600 dark:text-blue-400",
}: FaqWithIllustrationProps) {
  return (
    <section className={cn("overflow-hidden bg-white py-24 sm:py-32 dark:bg-zinc-950", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Text & Illustration */}
          <div className="flex flex-col gap-10">
            <div>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
                {title}
              </h2>
              <p className="max-w-lg text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                {description}
              </p>
            </div>

            <div className="w-full">
              <AnimatedIllustration />
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="w-full">
            <Accordion variant="splitted">
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  title={faq.question}
                  classNames={{
                    base: "border border-zinc-200 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900 rounded-xl overflow-hidden mb-3 last:mb-0",
                    title: cn(
                      "font-medium text-[15px] sm:text-base transition-colors",
                      `group-hover:${accentClassName} group-[[aria-expanded=true]]:${accentClassName}`
                    ),
                    content:
                      "text-zinc-500 dark:text-zinc-400 text-sm sm:text-base leading-relaxed px-5 pb-5",
                    trigger:
                      "group py-5 px-5 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors",
                    indicator: cn(
                      "text-zinc-400 transition-colors",
                      `group-hover:${accentClassName} group-[[aria-expanded=true]]:${accentClassName}`
                    ),
                  }}
                >
                  {faq.answer}
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
