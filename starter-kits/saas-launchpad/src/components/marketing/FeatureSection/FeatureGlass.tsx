"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export interface FeatureGlassItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface FeatureGlassProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  badge?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  features: FeatureGlassItem[];
  /**
   * Override the decorative glow orb color inside each card.
   * e.g. "bg-zinc-100/50 dark:bg-blue-500/20"
   */
  glowClassName?: string;
  /**
   * Override the icon container colors.
   * e.g. "bg-zinc-100/50 text-violet-600 ring-zinc-600/20 dark:bg-blue-500/20 dark:text-violet-300 dark:ring-violet-500/30"
   */
  iconClassName?: string;
}

export const FeatureGlass = React.forwardRef<HTMLElement, FeatureGlassProps>(
  (
    {
      className,
      badge,
      title = "Everything you need.",
      description = "A complete toolkit to build better, faster, and more beautifully.",
      features,
      glowClassName = "bg-zinc-100/50 dark:bg-blue-500/20",
      iconClassName = "bg-zinc-100/50 text-blue-600 ring-zinc-600/20 dark:bg-blue-500/20 dark:text-blue-300 dark:ring-blue-500/30",
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        className={cn("relative overflow-hidden py-24 sm:py-32", className)}
        {...props}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-16 max-w-3xl text-center sm:mb-20"
          >
            {badge && <div className="mb-6 flex justify-center">{badge}</div>}
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
              {title}
            </h2>
            {description && (
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                {description}
              </p>
            )}
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-3xl border border-white/50 bg-white/40 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl transition-all hover:bg-white/60 dark:border-white/10 dark:bg-zinc-900/40 dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] dark:hover:bg-zinc-900/60"
              >
                {/* Decorative glowing orb inside the card */}
                <div
                  className={cn(
                    "absolute -top-12 -right-12 h-32 w-32 rounded-full blur-2xl transition-transform group-hover:scale-150",
                    glowClassName
                  )}
                />

                <div
                  className={cn(
                    "relative z-10 flex h-12 w-12 items-center justify-center rounded-xl shadow-sm ring-1 ring-inset",
                    iconClassName
                  )}
                >
                  {feature.icon}
                </div>
                <div className="relative z-10 mt-6">
                  <h3 className="text-lg leading-7 font-semibold text-zinc-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }
);

FeatureGlass.displayName = "FeatureGlass";
