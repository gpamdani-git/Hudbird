"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { Avatar } from "@hudbird/ui";
import { Testimonial } from "./Testimonials";

export interface TestimonialGlassProps {
  title?: string;
  description?: string;
  testimonials: Testimonial[];
  className?: string;
  /**
   * Override the fallback avatar icon container colors.
   * e.g. "bg-violet-100 text-violet-600 dark:bg-violet-900/50 dark:text-violet-400"
   */
  iconClassName?: string;
}

export const TestimonialGlass: React.FC<TestimonialGlassProps> = ({
  title = "Loved by businesses worldwide.",
  description = "See what our customers are saying about us.",
  testimonials,
  className,
  iconClassName = "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400",
}) => {
  return (
    <section className={cn("relative overflow-hidden py-24 sm:py-32", className)}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">{description}</p>
          )}
        </motion.div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:max-w-none">
          <div className="columns-1 gap-8 sm:columns-2 lg:columns-3 xl:columns-4">
            {testimonials.map((testimonial, idx) => {
              if (testimonial.featured) return null; // We'll skip featured hero cards in this masonry glass grid, or we could handle them differently

              return (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="mb-8 break-inside-avoid"
                >
                  <div className="relative rounded-3xl border border-white/50 bg-white/40 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/40 dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
                    <p className="text-sm leading-6 text-zinc-800 dark:text-zinc-300">
                      "{testimonial.content}"
                    </p>
                    <div className="mt-6 flex items-center gap-x-4">
                      {testimonial.avatar ? (
                        <Avatar
                          src={testimonial.avatar}
                          alt={testimonial.author}
                          className="h-10 w-10 bg-zinc-100 dark:bg-zinc-800"
                        />
                      ) : (
                        <div
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-full",
                            iconClassName
                          )}
                        >
                          {testimonial.author?.[0]}
                        </div>
                      )}
                      <div>
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                          {testimonial.author}
                        </h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

TestimonialGlass.displayName = "TestimonialGlass";
