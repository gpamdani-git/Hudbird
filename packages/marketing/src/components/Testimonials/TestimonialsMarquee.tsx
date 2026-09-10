"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "../../utils/cn";
import {
  Testimonial,
  TestimonialsProps,
  DEFAULT_TESTIMONIALS,
  TestimonialCard,
} from "./Testimonials";

import { motion, useAnimationFrame, useMotionValue, useTransform, animate } from "framer-motion";

function MarqueeRow({
  items,
  direction = "left",
  speed = 40,
}: {
  items: React.ReactNode[];
  direction?: "left" | "right";
  speed?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const baseX = useMotionValue(0);
  const [contentWidth, setContentWidth] = useState(0);
  const isHovered = useRef(false);
  const isDragging = useRef(false);
  const isSnapping = useRef(false);
  const animationControls = useRef<any>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (copyRef.current) {
        setContentWidth(copyRef.current.offsetWidth);
      }
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    if (copyRef.current) observer.observe(copyRef.current);
    return () => observer.disconnect();
  }, []);

  useAnimationFrame((t, delta) => {
    if (contentWidth === 0) return;
    if (isHovered.current || isDragging.current || isSnapping.current) return;

    const moveBy = speed * (delta / 1000);
    const currentX = baseX.get();

    if (direction === "left") {
      baseX.set(currentX - moveBy);
    } else {
      baseX.set(currentX + moveBy);
    }
  });

  const x = useTransform(baseX, (v) => {
    if (contentWidth === 0) return "0px";
    const wrap = (min: number, max: number, val: number) => {
      const range = max - min;
      return ((((val - min) % range) + range) % range) + min;
    };
    return `${wrap(-contentWidth, 0, v)}px`;
  });

  return (
    <div className="-my-8 w-full overflow-hidden py-8">
      <motion.div
        ref={containerRef}
        style={{ x }}
        onPanStart={() => {
          isDragging.current = true;
          if (animationControls.current) {
            animationControls.current.stop();
          }
        }}
        onPan={(e, info) => {
          baseX.set(baseX.get() + info.delta.x);
        }}
        onPanEnd={(e, info) => {
          isDragging.current = false;
          isSnapping.current = true;

          const currentX = baseX.get();
          const velocity = info.velocity.x;
          const itemWidth = contentWidth / items.length;

          // Calculate projected target based on swipe velocity
          const power = 0.3;
          const targetX = currentX + velocity * power;

          // Snap to nearest item boundary
          const snapTarget = Math.round(targetX / itemWidth) * itemWidth;

          animationControls.current = animate(baseX, snapTarget, {
            type: "spring",
            stiffness: 400,
            damping: 40,
            velocity: velocity,
            onComplete: () => {
              isSnapping.current = false;
            },
          });
        }}
        onMouseEnter={() => {
          isHovered.current = true;
        }}
        onMouseLeave={() => {
          isHovered.current = false;
        }}
        className="flex w-max cursor-grab touch-pan-y active:cursor-grabbing"
      >
        <div ref={copyRef} className="flex">
          {items}
        </div>
        <div className="flex">{items}</div>
        <div className="flex">{items}</div>
        <div className="flex">{items}</div>
      </motion.div>
    </div>
  );
}

export function TestimonialsMarquee({
  title = "What They're Saying",
  description = "",
  testimonials = DEFAULT_TESTIMONIALS,
  className,
}: TestimonialsProps) {
  // Split into two rows for the marquee effect
  const middleIndex = Math.ceil(testimonials.length / 2);
  const row1 = testimonials.slice(0, middleIndex);
  const row2 = testimonials.slice(middleIndex);

  // We only need to map one copy. The MarqueeRow handles duplicating it internally for smooth infinite scrolling.
  const Row1Content = row1.map((testimonial) => (
    <div
      key={testimonial.id}
      className="w-[300px] flex-shrink-0 pr-4 sm:w-[350px] sm:pr-6 md:w-[400px] lg:pr-8"
    >
      <TestimonialCard testimonial={testimonial} />
    </div>
  ));

  const Row2Content = row2.map((testimonial) => (
    <div
      key={testimonial.id}
      className="w-[300px] flex-shrink-0 pr-4 sm:w-[350px] sm:pr-6 md:w-[400px] lg:pr-8"
    >
      <TestimonialCard testimonial={testimonial} />
    </div>
  ));

  return (
    <section
      className={cn("relative overflow-hidden bg-white py-24 sm:py-32 dark:bg-zinc-950", className)}
    >
      <style>{`
        /* Subtle scrollbar for mobile native scrolling */
        .subtle-scrollbar::-webkit-scrollbar {
          height: 4px;
        }
        .subtle-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .subtle-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(161, 161, 170, 0.3);
          border-radius: 4px;
        }
        .subtle-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(161, 161, 170, 0.3) transparent;
        }
      `}</style>

      {/* Aesthetic Background Blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-30 dark:opacity-20">
        <div className="absolute top-1/2 left-1/2 aspect-square w-full max-w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/30 mix-blend-multiply blur-3xl dark:mix-blend-screen" />
        <div className="absolute top-1/3 left-1/3 aspect-square w-full max-w-[600px] rounded-full bg-purple-500/30 mix-blend-multiply blur-3xl dark:mix-blend-screen" />
      </div>

      <div className="mx-auto mb-16 max-w-7xl px-4 sm:mb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
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
      </div>

      {/* Marquee Rows Container */}
      <div className="group relative flex w-full flex-col gap-6 overflow-hidden lg:gap-8">
        {/* Left & Right Fade/Gradient Masks for aesthetic cutoff */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-white to-transparent sm:w-32 md:w-64 dark:from-zinc-950" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-white to-transparent sm:w-32 md:w-64 dark:from-zinc-950" />

        <MarqueeRow items={Row1Content} direction="left" speed={30} />

        <div className="md:pl-16">
          <MarqueeRow items={Row2Content} direction="right" speed={30} />
        </div>
      </div>
    </section>
  );
}
