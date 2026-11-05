"use client";
import * as React from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";
import { Button } from "../Button";
import { cn } from "../../utils/cn";

const quietEase = [0.22, 1, 0.36, 1] as const;

export interface MotionRevealProps extends HTMLMotionProps<"div"> {
  distance?: number;
  once?: boolean;
}

export const MotionReveal = React.forwardRef<HTMLDivElement, MotionRevealProps>(
  ({ children, distance = 18, once = true, className, ...props }, ref) => {
    const reduce = useReducedMotion();
    const canObserve = typeof IntersectionObserver !== "undefined";
    const active = !reduce && canObserve;
    return (
      <motion.div
        ref={ref}
        initial={active ? { opacity: 0.01, y: distance } : false}
        whileInView={active ? { opacity: 1, y: 0 } : undefined}
        viewport={{ once, amount: 0.12 }}
        transition={{ duration: 0.55, ease: quietEase }}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
MotionReveal.displayName = "MotionReveal";

const staggerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.03 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: quietEase } },
};

export const MotionStagger = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ children, ...props }, ref) => {
    const reduce = useReducedMotion();
    const active = !reduce && typeof IntersectionObserver !== "undefined";
    return (
      <motion.div
        ref={ref}
        initial={active ? "hidden" : false}
        whileInView={active ? "visible" : undefined}
        viewport={{ once: true, amount: 0.12 }}
        variants={staggerVariants}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
MotionStagger.displayName = "MotionStagger";

export const MotionStaggerItem = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  (props, ref) => <motion.div ref={ref} variants={itemVariants} {...props} />
);
MotionStaggerItem.displayName = "MotionStaggerItem";

export interface MotionCrossfadeProps extends React.HTMLAttributes<HTMLDivElement> {
  transitionKey: React.Key;
}

export const MotionCrossfade = React.forwardRef<HTMLDivElement, MotionCrossfadeProps>(
  ({ transitionKey, children, className, ...props }, ref) => {
    const reduce = useReducedMotion();
    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={transitionKey}
            initial={reduce ? false : { opacity: 0.01, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.24, ease: quietEase }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }
);
MotionCrossfade.displayName = "MotionCrossfade";

export interface MotionTickerProps extends React.HTMLAttributes<HTMLDivElement> {
  items: React.ReactNode[];
  duration?: number;
  paused?: boolean;
}

export const MotionTicker = React.forwardRef<HTMLDivElement, MotionTickerProps>(
  ({ items, duration = 24, paused = false, className, ...props }, ref) => {
    const reduce = useReducedMotion();
    const [interacting, setInteracting] = React.useState(false);
    const running = !reduce && !paused && !interacting;
    return (
      <div
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        onMouseEnter={() => setInteracting(true)}
        onMouseLeave={() => setInteracting(false)}
        onFocusCapture={() => setInteracting(true)}
        onBlurCapture={() => setInteracting(false)}
        {...props}
      >
        <motion.div
          className="flex w-max items-center"
          animate={running ? { x: ["0%", "-50%"] } : undefined}
          transition={{ duration, ease: "linear", repeat: Infinity }}
        >
          <div className="flex shrink-0 items-center">{items}</div>
          <div className="flex shrink-0 items-center" aria-hidden="true">
            {items}
          </div>
        </motion.div>
      </div>
    );
  }
);
MotionTicker.displayName = "MotionTicker";

export interface MotionSlideshowProps extends React.HTMLAttributes<HTMLDivElement> {
  slides: React.ReactNode[];
  label?: string;
}

export const MotionSlideshow = React.forwardRef<HTMLDivElement, MotionSlideshowProps>(
  ({ slides, label = "Slideshow", className, ...props }, ref) => {
    const reduce = useReducedMotion();
    const [active, setActive] = React.useState(0);
    if (!slides.length) return null;
    const select = (next: number) => setActive((next + slides.length) % slides.length);
    return (
      <div ref={ref} className={cn("space-y-4", className)} aria-label={label} {...props}>
        <div className="relative overflow-hidden" aria-live="polite">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={active}
              initial={reduce ? false : { opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0, x: -12 }}
              transition={{ duration: 0.32, ease: quietEase }}
            >
              {slides[active]}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex items-center justify-between gap-3">
          <Button variant="outline" size="sm" onClick={() => select(active - 1)}>
            Previous
          </Button>
          <span
            className="text-sm tabular-nums"
            aria-label={`Slide ${active + 1} of ${slides.length}`}
          >
            {active + 1} / {slides.length}
          </span>
          <Button variant="outline" size="sm" onClick={() => select(active + 1)}>
            Next
          </Button>
        </div>
      </div>
    );
  }
);
MotionSlideshow.displayName = "MotionSlideshow";

export function MotionScrollProgress({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden="true"
      className={cn("bg-primary fixed inset-x-0 top-0 z-50 h-0.5 origin-left", className)}
      style={{ scaleX: reduce ? 0 : scrollYProgress }}
    />
  );
}
