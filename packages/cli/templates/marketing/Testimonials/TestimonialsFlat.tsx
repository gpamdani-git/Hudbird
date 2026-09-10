"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "../../utils/cn";
import {
  Testimonial,
  TestimonialsProps,
  DEFAULT_TESTIMONIALS,
  TestimonialCard,
} from "./Testimonials";

export function TestimonialsFlat({
  title = "What They're Saying",
  description = "",
  testimonials = DEFAULT_TESTIMONIALS,
  className,
}: TestimonialsProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
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
      {/* Aesthetic Background Blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-30 dark:opacity-20">
        <div className="absolute top-1/2 left-1/2 aspect-square w-full max-w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/30 mix-blend-multiply blur-3xl dark:mix-blend-screen" />
        <div className="absolute top-1/3 left-1/3 aspect-square w-full max-w-[600px] rounded-full bg-purple-500/30 mix-blend-multiply blur-3xl dark:mix-blend-screen" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center sm:mb-20">
          <div className="mb-6 inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white">
            <span className="mr-2 flex h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
            007 TESTIMONIAL
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl dark:text-white">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">{description}</p>
          )}
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.id} variants={itemVariants} className="flex w-full">
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
