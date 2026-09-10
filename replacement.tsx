"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, Avatar } from "@hudbird/ui";
import { cn } from "../../utils/cn";

export interface Testimonial {
  id: string;
  name?: string;
  role?: string;
  avatarUrl?: string;
  content?: string;
  featured?: boolean;
  featuredImage?: string;
  featuredTitle?: string;
}

export interface TestimonialsProps {
  title?: string;
  description?: string;
  testimonials?: Testimonial[];
  className?: string;
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "f1",
    featured: true,
    featuredImage:
      "https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?auto=format&fit=crop&q=80&w=400&h=500",
    featuredTitle: "How Puno Automated 80% of Lead Handling",
  },
  {
    id: "1",
    name: "David Lee",
    role: "Founder, Atodio Studio",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    content:
      "We were spending hours on repetitive tasks. Their automation system saved us 30+ hours per week and dramatically improved our sales performance.",
  },
  {
    id: "2",
    name: "Michael Tran",
    role: "Founder & CEO, Skyline Realty Group",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    content:
      "We reduced admin work by nearly 50% and doubled our qualified appointment bookings. The ROI was faster than we expected — and the system continues to scale with us.",
  },
  {
    id: "3",
    name: "Daniel Kim",
    role: "Founder, ScaleLabs Education",
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    content:
      "Our enrollment process used to require manual follow-ups and spreadsheet tracking. Now, AI handles lead qualification, scheduling, reminders, and CRM updates automatically.\n\nWe've increased enrollment conversion by 35% in just one quarter.",
  },
  {
    id: "4",
    name: "Sarah Mitchell",
    role: "COO, BrightPath SaaS",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    content:
      "We struggled with inconsistent lead follow-ups and slow response times. Their AI automation blueprint gave us clarity first, then execution.\n\nNow, our CRM runs intelligently, leads are scored automatically, and follow-ups happen without manual effort. We've increased demo bookings by 40% while reducing operational friction.",
  },
  {
    id: "f2",
    featured: true,
    featuredImage:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400&h=500",
    featuredTitle: "Scaling SaaS Operations with AI Automation",
  },
  {
    id: "5",
    name: "Alex Johnson",
    role: "Head of Operations, Finovate Consulting",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
    content:
      "Security and compliance were major concerns for us. They designed an automation architecture that was not only efficient but enterprise-grade secure.",
  },
  {
    id: "6",
    name: "Jonathan Reed",
    role: "Managing Director, Nexora Digital Agency",
    avatarUrl:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150",
    content:
      "We were scaling fast but drowning in manual workflows. Their automation system connected our CRM, email marketing, and reporting into one intelligent flow.\n\nThe result? 30+ hours saved per week and complete visibility across our pipeline.",
  },
  {
    id: "7",
    name: "Laura Martinez",
    role: "CMO, Elevate Commerce Co.",
    avatarUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    content:
      "Marketing automation always felt fragmented — too many tools, not enough cohesion.\n\nThey unified everything into one intelligent ecosystem. Campaign triggers, abandoned cart flows, segmentation — all automated with precision.",
  },
];

const PlayIcon = () => (
  <svg className="ml-0.5 h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const LogoIpsum = () => (
  <svg
    className="h-5 w-5 text-white"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  if (testimonial.featured) {
    return (
      <Card className="group relative flex h-[400px] cursor-pointer flex-col justify-between overflow-hidden border-0 bg-zinc-900">
        <div className="absolute inset-0 z-0">
          <img
            src={testimonial.featuredImage}
            alt={testimonial.featuredTitle}
            className="h-full w-full object-cover opacity-80 transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
        </div>

        <div className="relative z-10 flex items-start justify-between p-6 lg:p-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition-colors group-hover:bg-white/30">
            <PlayIcon />
          </div>
        </div>

        <div className="relative z-10 p-6 pt-0 lg:p-8">
          <div className="mb-3 flex items-center gap-2">
            <LogoIpsum />
            <span className="text-sm font-bold tracking-tight text-white">Logoipsum</span>
          </div>
          <h3 className="text-2xl leading-tight font-bold text-white">
            {testimonial.featuredTitle}
          </h3>
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex h-full flex-col border-zinc-200/50 bg-white/60 p-6 backdrop-blur-xl transition-shadow hover:shadow-lg lg:p-8 dark:border-zinc-800/50 dark:bg-zinc-900/60 dark:hover:shadow-none">
      <blockquote className="flex-1 text-sm leading-relaxed whitespace-pre-wrap text-zinc-700 lg:text-base dark:text-zinc-300">
        <p>"{testimonial.content}"</p>
      </blockquote>
      <figcaption className="mt-8 flex items-center gap-x-4 border-t border-zinc-100 pt-4 dark:border-zinc-800/50">
        <Avatar
          src={testimonial.avatarUrl!}
          fallback={testimonial.name?.charAt(0) || "U"}
          className="h-10 w-10"
        />
        <div>
          <div className="text-sm font-semibold text-zinc-900 dark:text-white">
            {testimonial.name}
          </div>
          <div className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">{testimonial.role}</div>
        </div>
      </figcaption>
    </Card>
  );
};

export function Testimonials({
  title = "What They're Saying",
  description = "",
  testimonials = DEFAULT_TESTIMONIALS,
  className,
}: TestimonialsProps) {
  // Split testimonials into 3 columns for masonry layout
  const col1 = testimonials.filter((_, i) => i % 3 === 0);
  const col2 = testimonials.filter((_, i) => i % 3 === 1);
  const col3 = testimonials.filter((_, i) => i % 3 === 2);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
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
        <div className="absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/30 mix-blend-multiply blur-3xl dark:mix-blend-screen" />
        <div className="absolute top-1/3 left-1/3 h-[600px] w-[600px] rounded-full bg-purple-500/30 mix-blend-multiply blur-3xl dark:mix-blend-screen" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center sm:mb-20">
          <div className="mb-8 inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white">
            <span className="mr-2 flex h-2 w-2 rounded-full bg-indigo-500"></span>
            TESTIMONIAL
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
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
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          {/* Column 1 */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {col1.map((testimonial) => (
              <motion.div key={testimonial.id} variants={itemVariants} className="w-full">
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </div>

          {/* Column 2 */}
          <div className="mt-0 flex flex-col gap-6 md:mt-12 lg:mt-0 lg:gap-8">
            {col2.map((testimonial) => (
              <motion.div key={testimonial.id} variants={itemVariants} className="w-full">
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </div>

          {/* Column 3 */}
          <div className="mt-0 flex flex-col gap-6 lg:mt-24 lg:gap-8">
            {col3.map((testimonial) => (
              <motion.div key={testimonial.id} variants={itemVariants} className="w-full">
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
