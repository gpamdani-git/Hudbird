"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { Card, Avatar } from "@hudbird/ui";
import { cn } from "../../utils/cn";
import { Testimonial, DEFAULT_TESTIMONIALS } from "./Testimonials";

export interface TestimonialsSideBySideProps {
  label?: string;
  title?: string;
  description?: string;
  stats?: { value: string; label: string }[];
  testimonials?: Testimonial[];
  className?: string;
}

export function TestimonialsSideBySide({
  label = "TESTIMONIALS",
  title = "What our clients say",
  description = "We've worked with the best in the industry to produce millions of dollars in return on ad spend. We do away with the inefficiencies & formalities that plague most agencies.",
  stats = [
    { value: "52+", label: "TESTIMONIALS" },
    { value: "2M+", label: "REVENUE" },
  ],
  testimonials = DEFAULT_TESTIMONIALS.filter((t) => !t.featured).slice(0, 6),
  className,
}: TestimonialsSideBySideProps) {
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
    <section className={cn("relative bg-zinc-50 py-24 sm:py-32 dark:bg-zinc-950", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column - Content */}
          <div className="flex h-full flex-col justify-between lg:sticky lg:top-24 lg:col-span-5 lg:pb-16">
            <div>
              {label && (
                <div className="mb-6 text-sm font-bold tracking-widest text-indigo-600 uppercase dark:text-indigo-400">
                  {label}
                </div>
              )}
              <h2 className="mb-6 text-4xl font-medium tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-white">
                {title}
              </h2>
              {description && (
                <p className="max-w-lg text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {description}
                </p>
              )}
            </div>

            {/* Stats */}
            {stats && stats.length > 0 && (
              <div className="mt-12 flex items-center gap-12 lg:mt-24">
                {stats.map((stat, idx) => (
                  <div key={idx}>
                    <div className="mb-2 text-4xl font-semibold text-zinc-900 dark:text-white">
                      {stat.value}
                    </div>
                    <div className="text-xs font-bold tracking-widest text-zinc-500 uppercase">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Testimonials Grid */}
          <div className="relative lg:col-span-7">
            {/* Top and Bottom Fade Masks */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24 bg-gradient-to-b from-zinc-50 to-transparent dark:from-zinc-950" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-32 bg-gradient-to-t from-zinc-50 to-transparent dark:from-zinc-950" />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 gap-6 pt-12 pb-24 sm:grid-cols-2"
            >
              {testimonials.map((testimonial, i) => (
                <motion.div key={testimonial.id || i} variants={itemVariants} className="h-full">
                  <Card className="group flex h-full flex-col rounded-2xl border-zinc-200/50 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="mb-4 flex items-center gap-3">
                      <Avatar
                        src={testimonial.avatar!}
                        className="h-10 w-10 ring-2 ring-transparent transition-all group-hover:ring-zinc-100 dark:group-hover:ring-zinc-800"
                      />
                      <div>
                        <div className="text-sm font-semibold text-zinc-900 dark:text-white">
                          {testimonial.author}
                        </div>
                        {testimonial.role && (
                          <div className="text-xs text-zinc-500 dark:text-zinc-400">
                            {testimonial.role.includes("@")
                              ? testimonial.role
                              : `@${testimonial.role.toLowerCase().replace(/[^a-z0-9]/g, "")}`}
                          </div>
                        )}
                      </div>
                    </div>

                    <blockquote className="flex-1 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                      <p>"{testimonial.content}"</p>
                    </blockquote>

                    {/* Hashtags based on role or content - decorative */}
                    <div className="mt-4 text-xs font-medium text-indigo-500 dark:text-indigo-400">
                      #
                      {testimonial.role
                        .split(" ")[0]
                        .toLowerCase()
                        .replace(/[^a-z]/g, "") || "client"}{" "}
                      #success
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
