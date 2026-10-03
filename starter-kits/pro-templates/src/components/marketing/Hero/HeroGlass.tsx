"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export interface HeroGlassProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  badge?: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  actions?: React.ReactNode;
  illustration?: React.ReactNode;
  /**
   * Override the background ambient glow orb color.
   * e.g. "bg-zinc-100/50"
   */
  glowClassName?: string;
}

export const HeroGlass = React.forwardRef<HTMLElement, HeroGlassProps>(
  (
    {
      className,
      badge,
      title,
      description,
      actions,
      illustration,
      glowClassName = "bg-zinc-100/50",
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        className={cn(
          "relative flex min-h-[100dvh] items-center overflow-hidden bg-gradient-to-br from-zinc-100/50 to-zinc-100 pt-24 pb-16 sm:pt-32 dark:from-zinc-950 dark:to-indigo-950/20",
          className
        )}
        {...props}
      >
        {/* Background ambient orbs */}
        <div
          className={cn(
            "pointer-events-none absolute top-1/4 left-1/4 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-[150px]",
            glowClassName
          )}
        />
        <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-[600px] w-[600px] translate-x-1/2 translate-y-1/2 rounded-full bg-zinc-100/50 opacity-70 blur-[150px]" />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-16 px-6 lg:flex-row lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl flex-1 text-center lg:text-left"
          >
            {badge && (
              <div className="mb-6 flex justify-center lg:justify-start">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white/40 px-3 py-1 text-sm font-medium text-zinc-900 shadow-sm ring-1 ring-white/50 backdrop-blur-md ring-inset dark:bg-zinc-900/40 dark:text-zinc-100 dark:ring-white/10">
                  {badge}
                </div>
              </div>
            )}
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl dark:text-white">
              {title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">{description}</p>
            {actions && (
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                {actions}
              </div>
            )}
          </motion.div>

          {illustration && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="w-full max-w-2xl flex-1 lg:max-w-none"
            >
              <div className="relative rounded-3xl border border-white/40 bg-white/20 p-2 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-zinc-900/20">
                <div className="absolute -top-px left-1/2 -ml-[250px] h-[2px] w-[500px] bg-gradient-to-r from-transparent via-zinc-500/50 to-transparent dark:via-indigo-400/50" />
                <div className="overflow-hidden rounded-2xl bg-zinc-50 dark:bg-zinc-950">
                  {illustration}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    );
  }
);

HeroGlass.displayName = "HeroGlass";
