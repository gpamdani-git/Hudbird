"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export interface LogoGlassItem {
  name: string;
  url: string;
}

export interface LogoCloudGlassProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  logos: LogoGlassItem[];
}

export const LogoCloudGlass = React.forwardRef<HTMLElement, LogoCloudGlassProps>(
  ({ className, title = "Trusted by the world's most innovative teams", logos, ...props }, ref) => {
    return (
      <section ref={ref} className={cn("relative py-16 sm:py-24", className)} {...props}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center text-sm leading-8 font-semibold text-zinc-900 sm:text-base md:text-lg dark:text-zinc-100"
          >
            {title}
          </motion.h2>

          <div className="mx-auto grid max-w-lg grid-cols-4 items-center justify-items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:max-w-none lg:grid-cols-5">
            {logos.map((logo, idx) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={cn(
                  "col-span-2 rounded-2xl border border-white/40 bg-white/30 p-4 shadow-sm backdrop-blur-md transition-transform hover:scale-105 hover:bg-white/50 sm:col-span-2 lg:col-span-1 dark:border-white/10 dark:bg-zinc-900/30 dark:hover:bg-zinc-900/50",
                  // Center the last item if it's odd on tablet
                  idx === 4 && "sm:col-start-3 lg:col-start-auto"
                )}
              >
                <img
                  className="max-h-12 w-full object-contain grayscale transition-all hover:grayscale-0 dark:opacity-80 dark:invert dark:hover:opacity-100"
                  src={logo.url}
                  alt={logo.name}
                  width={158}
                  height={48}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }
);

LogoCloudGlass.displayName = "LogoCloudGlass";
