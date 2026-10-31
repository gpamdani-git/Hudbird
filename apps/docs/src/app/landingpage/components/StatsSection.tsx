import React, { useEffect, useRef } from "react";
import { motion, animate, useInView } from "framer-motion";
import { Box, Layout, Component, BarChart3, Info } from "lucide-react";

function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  suffix = "",
}: {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
}) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView && nodeRef.current) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.round(value).toString() + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [from, to, duration, inView, suffix]);

  return (
    <span ref={nodeRef}>
      {from}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="relative z-10 mx-auto -mt-48 mb-24 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Glow background behind the stats card */}
      <div className="pointer-events-none absolute inset-0 z-0 mx-auto max-w-5xl translate-y-8 rounded-[100px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-30 blur-3xl dark:opacity-20" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="relative z-10 overflow-hidden rounded-3xl border border-zinc-200/50 bg-white/60 p-8 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#0a0a0c]/60 dark:shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
      >
        <div className="grid grid-cols-2 gap-8 divide-x-0 divide-zinc-200/50 md:grid-cols-4 md:divide-x dark:divide-white/10">
          <div className="flex flex-col items-center justify-center px-4 text-center">
            <div className="mb-4 flex items-center justify-center text-zinc-400 dark:text-zinc-500">
              <Box className="h-8 w-8" strokeWidth={1.2} />
            </div>
            <h3 className="font-outfit text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
              <AnimatedCounter to={26} suffix="+" />
            </h3>
            <p className="mt-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">Core UI</p>
          </div>

          <div className="flex flex-col items-center justify-center px-4 text-center">
            <div className="mb-4 flex items-center justify-center text-zinc-400 dark:text-zinc-500">
              <Component className="h-8 w-8" strokeWidth={1.2} />
            </div>
            <h3 className="font-outfit text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
              <AnimatedCounter to={12} suffix="+" />
            </h3>
            <p className="mt-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">Sections</p>
          </div>

          <div className="flex flex-col items-center justify-center px-4 text-center">
            <div className="mb-4 flex items-center justify-center text-zinc-400 dark:text-zinc-500">
              <BarChart3 className="h-8 w-8" strokeWidth={1.2} />
            </div>
            <h3 className="font-outfit text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
              <AnimatedCounter to={8} suffix="" />
            </h3>
            <p className="mt-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">Chart Types</p>
          </div>

          <div className="flex flex-col items-center justify-center px-4 text-center">
            <div className="mb-4 flex items-center justify-center text-zinc-400 dark:text-zinc-500">
              <Layout className="h-8 w-8" strokeWidth={1.2} />
            </div>
            <h3 className="font-outfit text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
              <AnimatedCounter to={40} suffix="+" />
            </h3>
            <p className="mt-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Block Gallery
            </p>
          </div>
        </div>

        {/* Note about free vs pro templates */}
        <div className="mt-8 flex items-center justify-center border-t border-zinc-200/50 pt-6 dark:border-white/5">
          <p className="text-center text-sm font-medium text-zinc-500 dark:text-zinc-400">
            All core components and blocks are{" "}
            <strong className="font-semibold text-zinc-900 dark:text-white">100% free</strong>.
            <br className="sm:hidden" /> Support our work by purchasing the{" "}
            <a
              href="/#/templates"
              className="font-semibold text-blue-500 transition-colors hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Starter Kit Pro
            </a>{" "}
            templates.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
