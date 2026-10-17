"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { Card, Avatar } from "@/components/ui";
import { cn } from "@/lib/cn";
import { Play } from "lucide-react";

export interface Testimonial {
  id: string | number;
  content: string | React.ReactNode;
  author: string;
  role: string;
  avatar?: string;
  featured?: boolean;
  featuredImage?: string;
  featuredTitle?: string;
  videoUrl?: string;
}

export interface TestimonialsProps {
  title?: string;
  description?: string;
  testimonials?: Testimonial[];
  className?: string;
  /**
   * Override the background glow blob color.
   * e.g. "bg-zinc-100/50"
   */
  glowClassName?: string;
  /**
   * Override the live dot color in the badge.
   * e.g. "bg-blue-500"
   */
  dotClassName?: string;
}

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "f1",
    featured: true,
    featuredImage:
      "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=600",
    featuredTitle: "How Puno Automated 80% of Lead Handling",
    author: "",
    role: "",
    content: "",
  },
  {
    id: "1",
    author: "David Lee",
    role: "Founder, Atodio Studio",
    avatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200",
    content:
      "We were spending hours on repetitive tasks. Their automation system saved us 30+ hours per week and dramatically improved our sales performance.",
  },
  {
    id: "2",
    author: "Michael Tran",
    role: "Founder & CEO, Skyline Realty Group",
    avatar:
      "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=200",
    content:
      "We reduced admin work by nearly 50% and doubled our qualified appointment bookings. The ROI was faster than we expected — and the system continues to scale with us.",
  },
  {
    id: "3",
    author: "Daniel Kim",
    role: "Founder, ScaleLabs Education",
    avatar:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200",
    content:
      "Our enrollment process used to require manual follow-ups and spreadsheet tracking. Now, AI handles lead qualification, scheduling, reminders, and CRM updates automatically.\n\nWe've increased enrollment conversion by 35% in just one quarter.",
  },
  {
    id: "4",
    author: "Sarah Mitchell",
    role: "COO, BrightPath SaaS",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200",
    content:
      "We struggled with inconsistent lead follow-ups and slow response times. Their AI automation blueprint gave us clarity first, then execution.\n\nNow, our CRM runs intelligently, leads are scored automatically, and follow-ups happen without manual effort. We've increased demo bookings by 40% while reducing operational friction.",
  },
  {
    id: "f2",
    featured: true,
    featuredImage:
      "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600",
    featuredTitle: "Scaling SaaS Operations with AI Automation",
    author: "",
    role: "",
    content: "",
  },
  {
    id: "5",
    author: "Alex Johnson",
    role: "Head of Operations, Finovate Consulting",
    avatar:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200",
    content:
      "Security and compliance were major concerns for us. They designed an automation architecture that was not only efficient but enterprise-grade secure.",
  },
  {
    id: "6",
    author: "Jonathan Reed",
    role: "Managing Director, Nexora Digital Agency",
    avatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200",
    content:
      "We were scaling fast but drowning in manual workflows. Their automation system connected our CRM, email marketing, and reporting into one intelligent flow.\n\nThe result? 30+ hours saved per week and complete visibility across our pipeline.",
  },
  {
    id: "7",
    author: "Laura Martinez",
    role: "CMO, Elevate Commerce Co.",
    avatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200",
    content:
      "Marketing automation always felt fragmented — too many tools, not enough cohesion.\n\nThey unified everything into one intelligent ecosystem. Campaign triggers, abandoned cart flows, segmentation — all automated with precision.",
  },
];

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

export const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  if (testimonial.featured) {
    return (
      <Card className="group relative flex h-full min-h-[420px] w-full cursor-pointer flex-col justify-between overflow-hidden border-0 bg-zinc-900">
        <div className="absolute inset-0 z-0">
          {testimonial.videoUrl ? (
            <video
              src={testimonial.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover opacity-70 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-80"
            />
          ) : (
            <img
              src={testimonial.featuredImage}
              alt={testimonial.featuredTitle}
              className="h-full w-full object-cover opacity-70 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-80"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/40 to-transparent" />
        </div>

        <div className="absolute top-6 left-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition-colors group-hover:bg-white/30">
          <Play size={18} className="ml-1 text-white" fill="currentColor" />
        </div>

        <div className="relative z-10 mt-auto p-6 pt-0 lg:p-8">
          <div className="mb-3 flex items-center gap-2">
            <LogoIpsum />
            <span className="text-sm font-bold tracking-tight text-white">Logoipsum</span>
          </div>
          <h3 className="text-xl leading-tight font-bold text-white sm:text-2xl">
            {testimonial.featuredTitle}
          </h3>
        </div>
      </Card>
    );
  }

  return (
    <Card className="group flex h-full w-full flex-col border-zinc-200/50 bg-white/60 p-6 backdrop-blur-xl transition-shadow hover:shadow-lg lg:p-8 dark:border-zinc-800/50 dark:bg-zinc-900/60 dark:hover:shadow-none">
      <div className="mb-4 text-zinc-400 dark:text-zinc-600">
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>
      <blockquote className="flex-1 text-sm leading-relaxed font-medium whitespace-pre-wrap text-zinc-700 sm:text-base dark:text-zinc-300">
        <p>"{testimonial.content}"</p>
      </blockquote>
      <figcaption className="mt-8 flex items-center gap-x-4 border-t border-zinc-100 pt-6 dark:border-zinc-800/50">
        <Avatar
          src={testimonial.avatar!}
          className="h-10 w-10 ring-2 ring-white transition-transform group-hover:scale-105 dark:ring-zinc-900"
        />
        <div>
          <div className="text-sm font-semibold text-zinc-900 dark:text-white">
            {testimonial.author}
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
  glowClassName = "bg-zinc-100/50",
  dotClassName = "bg-blue-500",
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
        <div
          className={cn(
            "absolute top-1/2 left-1/2 aspect-square w-full max-w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-multiply blur-3xl dark:mix-blend-screen",
            glowClassName
          )}
        />
        <div className="absolute top-1/3 left-1/3 aspect-square w-full max-w-[600px] rounded-full bg-zinc-100/50 mix-blend-multiply blur-3xl dark:mix-blend-screen" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center sm:mb-20">
          <div className="mb-6 inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white">
            <span className={cn("mr-2 flex h-1.5 w-1.5 rounded-full", dotClassName)}></span>
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
          className="mx-auto columns-1 gap-6 md:columns-2 lg:columns-3 lg:gap-8"
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="mb-6 w-full min-w-0 transform-none break-inside-avoid lg:mb-8"
            >
              <motion.div variants={itemVariants} className="w-full">
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
