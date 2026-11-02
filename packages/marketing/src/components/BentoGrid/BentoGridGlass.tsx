"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { Container } from "@hudbird/ui";

export interface BentoGlassItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
  className?: string;
}

export interface BentoGridGlassProps extends React.HTMLAttributes<HTMLElement> {
  badge?: React.ReactNode;
  title?: string;
  description?: string;
  items: BentoGlassItem[];
  /**
   * Override the decorative glow orb inside each card.
   * e.g. "bg-violet-500/10 dark:bg-violet-500/20"
   */
  glowClassName?: string;
  /**
   * Override the icon container colors.
   * e.g. "bg-violet-600/10 text-violet-600 dark:bg-violet-500/20 dark:text-violet-300"
   */
  iconClassName?: string;
}

export const BentoGridGlass = React.forwardRef<HTMLElement, BentoGridGlassProps>(
  (
    {
      className,
      badge,
      title = "Engineered for speed, composability, and scale",
      description = "Everything you need to build production interfaces, organized around your component system.",
      items,
      glowClassName = "bg-primary/10 dark:bg-primary/20",
      iconClassName = "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground",
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
        <Container size="xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            {badge && <div className="mb-6 flex justify-center">{badge}</div>}
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
              {title}
            </h2>
            {description && (
              <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                {description}
              </p>
            )}
          </motion.div>

          <div className="grid w-full auto-rows-[22rem] grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {items.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={cn(
                  "group relative overflow-hidden rounded-3xl border border-white/50 bg-white/40 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl transition-all hover:bg-white/60 dark:border-white/10 dark:bg-zinc-900/40 dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] dark:hover:bg-zinc-900/60",
                  item.className
                )}
              >
                {/* Decorative glowing orb inside the card */}
                <div
                  className={cn(
                    "absolute -top-12 -right-12 h-32 w-32 rounded-full blur-2xl transition-transform group-hover:scale-150",
                    glowClassName
                  )}
                />

                <div className="relative z-10 flex h-full flex-col">
                  {item.content && (
                    <div className="mb-6 flex-1 overflow-hidden rounded-2xl">{item.content}</div>
                  )}
                  <div className={cn("mt-auto", !item.content && "flex-1")}>
                    {item.icon && (
                      <div
                        className={cn(
                          "mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg",
                          iconClassName
                        )}
                      >
                        {item.icon}
                      </div>
                    )}
                    <h3 className="text-lg leading-7 font-semibold text-zinc-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    );
  }
);

BentoGridGlass.displayName = "BentoGridGlass";
