import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, LayoutGrid, Component, Terminal } from "lucide-react";

export function ShowcaseDeveloper() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-zinc-50 py-32 dark:bg-zinc-950"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 blur-[100px] transition-opacity dark:opacity-20">
        <div className="h-[40rem] w-[40rem] rounded-full bg-gradient-to-br from-blue-500/40 via-cyan-400/40 to-blue-600/40 mix-blend-multiply dark:mix-blend-screen" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-4 flex items-center gap-2 rounded-full border border-zinc-200 bg-white/50 px-4 py-1.5 text-sm font-medium text-zinc-600 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400"
          >
            <Terminal className="h-4 w-4" /> Built for Developers
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading max-w-3xl text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-white"
          >
            Beyond Templates.
            <br />
            <span className="text-zinc-400 dark:text-zinc-500">A Complete Ecosystem.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400"
          >
            Hudbird UI PRO gives you full access to our comprehensive Core UI component library and
            a massive Block Gallery. Assemble your own unique layouts in minutes.
          </motion.p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Core UI Card */}
          <motion.div
            style={{ y: y1 }}
            className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-10 shadow-xl transition-all hover:shadow-2xl dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-blue-500/10 blur-[80px] transition-colors group-hover:bg-blue-500/20" />

            {/* Blueprint Wireframe for Core UI */}
            <div className="relative mb-8 h-48 w-full overflow-hidden rounded-2xl border border-dashed border-blue-500/40 bg-blue-500/[0.03] p-4 dark:border-blue-400/30 dark:bg-blue-400/[0.03]">
              {/* Ruler Grid Background */}
              <div
                className="absolute inset-0 opacity-[0.15]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />

              {/* Corner markers */}
              <div className="absolute top-2 left-2 h-2 w-2 border-t border-l border-blue-500/60" />
              <div className="absolute top-2 right-2 h-2 w-2 border-t border-r border-blue-500/60" />
              <div className="absolute bottom-2 left-2 h-2 w-2 border-b border-l border-blue-500/60" />
              <div className="absolute right-2 bottom-2 h-2 w-2 border-r border-b border-blue-500/60" />

              <div className="relative z-10 flex h-full flex-col gap-4 p-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-wider text-blue-600/80 dark:text-blue-400/80">
                    UI_SYS_BTN.tsx
                  </span>
                  <span className="font-mono text-[9px] text-blue-600/60 dark:text-blue-400/60">
                    W:120 H:40
                  </span>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-8 w-24 items-center justify-center rounded-md border border-blue-500/40 bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                    <span className="h-1.5 w-12 rounded-full bg-blue-500/50" />
                  </div>
                  <div className="flex h-8 w-10 items-center justify-center rounded-md border border-dashed border-blue-500/40 bg-transparent">
                    <span className="h-3 w-3 rounded-full border border-blue-500/50" />
                  </div>
                </div>
                <div className="mt-2 flex-1 rounded-lg border border-blue-500/20 bg-blue-500/5 p-3">
                  <div className="mb-2 h-2 w-1/3 rounded-full bg-blue-500/40" />
                  <div className="h-2 w-full rounded-full bg-blue-500/30" />
                  <div className="mt-2 h-2 w-4/5 rounded-full bg-blue-500/30" />
                </div>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-zinc-900 dark:text-white">
              Core UI Components
            </h3>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              A meticulously crafted set of accessible, highly-customizable React components. From
              simple buttons to complex data tables, all styled with Tailwind CSS v4.
            </p>

            <ul className="mt-8 space-y-3">
              {[
                "Accessible (Radix UI based)",
                "Framer Motion Animations",
                "Light & Dark Mode Support",
              ].map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    ✓
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <a
              href="https://hudbird.vercel.app/#/docs"
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex items-center gap-2 font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Explore Core UI Docs{" "}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>

          {/* Block Gallery Card */}
          <motion.div
            style={{ y: y2 }}
            className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-10 shadow-xl transition-all hover:shadow-2xl dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-[80px] transition-colors group-hover:bg-cyan-500/20" />

            {/* Blueprint Wireframe for Block Gallery */}
            <div className="relative mb-8 h-48 w-full overflow-hidden rounded-2xl border border-dashed border-cyan-500/40 bg-cyan-500/[0.03] p-4 dark:border-cyan-400/30 dark:bg-cyan-400/[0.03]">
              {/* Ruler Grid Background */}
              <div
                className="absolute inset-0 opacity-[0.15]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #06b6d4 1px, transparent 1px), linear-gradient(to bottom, #06b6d4 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />

              {/* Crosshairs & Center Marker */}
              <div className="absolute top-1/2 left-0 h-[1px] w-full bg-cyan-500/20" />
              <div className="absolute top-0 left-1/2 h-full w-[1px] bg-cyan-500/20" />
              <div className="absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/50" />

              <div className="relative z-10 flex h-full gap-4">
                {/* Sidebar Block Blueprint */}
                <div className="flex h-full w-1/3 flex-col gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-3 shadow-[0_0_20px_rgba(6,182,212,0.05)]">
                  <span className="font-mono text-[8px] tracking-wider text-cyan-600/80 dark:text-cyan-400/80">
                    NAV_BLOCK
                  </span>
                  <div className="h-2 w-full rounded-sm bg-cyan-500/40" />
                  <div className="h-2 w-3/4 rounded-sm bg-cyan-500/30" />
                  <div className="h-2 w-4/5 rounded-sm bg-cyan-500/30" />
                </div>
                {/* Main Blocks Blueprint */}
                <div className="flex h-full flex-1 flex-col gap-2">
                  <div className="flex h-[55%] w-full flex-col items-center justify-center rounded-xl border border-dashed border-cyan-500/40 bg-cyan-500/5">
                    <span className="font-mono text-[10px] tracking-widest text-cyan-600/60 dark:text-cyan-400/60">
                      HERO_SECTION
                    </span>
                    <span className="mt-1 font-mono text-[8px] text-cyan-600/40 dark:text-cyan-400/40">
                      100% x 400px
                    </span>
                  </div>
                  <div className="flex w-full flex-1 gap-2">
                    <div className="flex h-full flex-1 items-center justify-center rounded-lg border border-cyan-500/20 bg-cyan-500/10">
                      <span className="font-mono text-[8px] text-cyan-600/40 dark:text-cyan-400/40">
                        CARD_A
                      </span>
                    </div>
                    <div className="flex h-full flex-1 items-center justify-center rounded-lg border border-cyan-500/20 bg-cyan-500/10">
                      <span className="font-mono text-[8px] text-cyan-600/40 dark:text-cyan-400/40">
                        CARD_B
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-zinc-900 dark:text-white">
              The Block Gallery
            </h3>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              Don't want to use a full template? Mix and match from over 100+ individual marketing
              blocks. Hero sections, features, pricing, testimonials, and more.
            </p>

            <ul className="mt-8 space-y-3">
              {["Copy & Paste Code", "Modular Architecture", "Production-Ready Designs"].map(
                (feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-sm font-medium text-zinc-700 dark:text-zinc-300"
                  >
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400">
                      ✓
                    </div>
                    {feature}
                  </li>
                )
              )}
            </ul>

            <a
              href="https://hudbird.vercel.app/#/blocks"
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex items-center gap-2 font-semibold text-cyan-600 transition-colors hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"
            >
              Browse Block Gallery{" "}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
