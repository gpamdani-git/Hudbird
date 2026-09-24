"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { Avatar } from "@hudbird/ui";
import { cn } from "../../utils/cn";
import { Testimonial, DEFAULT_TESTIMONIALS } from "./Testimonials";

export interface TestimonialsGlobeProps {
  label?: string;
  title?: string;
  testimonials?: Testimonial[];
  className?: string;
  glowClassName?: string;
  iconClassName?: string;
}

export function TestimonialsGlobe({
  label = "Testimonials",
  title = "Don't just take our words, listen to theirs.",
  testimonials = DEFAULT_TESTIMONIALS.filter((t) => !t.featured).slice(0, 6),
  className,
  glowClassName = "bg-blue-500/10 dark:bg-blue-500/20",
  iconClassName = "bg-blue-600/10 text-blue-600 ring-blue-600/20 dark:bg-blue-500/20 dark:text-blue-300 dark:ring-blue-500/30",
}: TestimonialsGlobeProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section
      className={cn("relative overflow-hidden bg-white py-24 sm:py-32 dark:bg-zinc-950", className)}
    >
      {/* Background Globe Wrapper */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
        {/* Glow behind section */}
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px] dark:bg-blue-500/20" />

        {/* Vignette/Mask to blend background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,white_70%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,#09090b_70%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          {label && (
            <span className="mb-4 block text-sm font-semibold tracking-wide text-zinc-600 dark:text-zinc-400">
              {label}
            </span>
          )}
          <h2 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
            {title}
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/50 bg-white/40 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl transition-all hover:bg-white/60 dark:border-white/10 dark:bg-zinc-900/40 dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] dark:hover:bg-zinc-900/60"
            >
              <div className="relative z-10 mb-6">
                <div className="mb-4 flex items-center gap-x-4">
                  {testimonial.avatar ? (
                    <Avatar
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="h-10 w-10 border border-zinc-200 bg-zinc-100 dark:border-white/10 dark:bg-zinc-800"
                    />
                  ) : (
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full shadow-sm ring-1 ring-inset",
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
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                  "{testimonial.content}"
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
