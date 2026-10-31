import React, { useEffect, useRef } from "react";
import { motion, animate, useInView } from "framer-motion";
import { Box, Layout, Component, BarChart3 } from "lucide-react";

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
    <section className="relative z-10 mx-auto mt-16 mb-20 w-full max-w-7xl px-4 sm:mt-24 sm:mb-28 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="relative z-10 overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-6 sm:p-8 dark:border-white/10 dark:bg-[#1C1C1F]"
      >
        <div className="grid grid-cols-2 gap-8 divide-x-0 divide-zinc-200/50 md:grid-cols-4 md:divide-x dark:divide-white/10">
          <div className="flex flex-col items-center justify-center px-4 text-center">
            <div className="mb-4 flex items-center justify-center text-zinc-400 dark:text-zinc-500">
              <Box className="h-7 w-7" strokeWidth={1.5} />
            </div>
            <h3 className="font-outfit text-3xl font-medium tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              <AnimatedCounter to={26} suffix="+" />
            </h3>
            <p className="mt-1 text-xs font-medium text-zinc-500 sm:text-sm dark:text-zinc-400">
              Core UI Primitives
            </p>
          </div>

          <div className="flex flex-col items-center justify-center px-4 text-center">
            <div className="mb-4 flex items-center justify-center text-zinc-400 dark:text-zinc-500">
              <Component className="h-7 w-7" strokeWidth={1.5} />
            </div>
            <h3 className="font-outfit text-3xl font-medium tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              <AnimatedCounter to={18} suffix="+" />
            </h3>
            <p className="mt-1 text-xs font-medium text-zinc-500 sm:text-sm dark:text-zinc-400">
              Marketing Sections
            </p>
          </div>

          <div className="flex flex-col items-center justify-center px-4 text-center">
            <div className="mb-4 flex items-center justify-center text-zinc-400 dark:text-zinc-500">
              <BarChart3 className="h-7 w-7" strokeWidth={1.5} />
            </div>
            <h3 className="font-outfit text-3xl font-medium tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              <AnimatedCounter to={8} suffix="" />
            </h3>
            <p className="mt-1 text-xs font-medium text-zinc-500 sm:text-sm dark:text-zinc-400">
              Chart Types
            </p>
          </div>

          <div className="flex flex-col items-center justify-center px-4 text-center">
            <div className="mb-4 flex items-center justify-center text-zinc-400 dark:text-zinc-500">
              <Layout className="h-7 w-7" strokeWidth={1.5} />
            </div>
            <h3 className="font-outfit text-3xl font-medium tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              <AnimatedCounter to={40} suffix="+" />
            </h3>
            <p className="mt-1 text-xs font-medium text-zinc-500 sm:text-sm dark:text-zinc-400">
              Block Layouts
            </p>
          </div>
        </div>

        {/* Note about free vs pro templates */}
        <div className="mt-8 flex items-center justify-center border-t border-zinc-200/50 pt-6 dark:border-white/5">
          <p className="text-center text-xs font-medium text-zinc-500 sm:text-sm dark:text-zinc-400">
            All core components and blocks are{" "}
            <strong className="font-semibold text-zinc-900 dark:text-white">
              100% free and open-source
            </strong>
            .
            <br className="sm:hidden" /> Support our craft with the{" "}
            <a
              href="/#/templates"
              className="text-primary font-semibold transition-colors hover:opacity-80"
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
