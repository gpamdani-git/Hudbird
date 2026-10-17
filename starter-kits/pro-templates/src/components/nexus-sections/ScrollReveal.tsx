// starter-kits/pro-templates/src/components/nexus-sections/ScrollReveal.tsx
// HudbirdUI-grade motion primitives, double-ring capsule buttons, and clean section headers.
"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const VIEWPORT = { once: true, margin: "-70px" } as const;

/* -------------------------------------------------------------------------- */
/* Theme helpers                                                              */
/* -------------------------------------------------------------------------- */

export function useIsDark(): boolean {
  const [isDark, setIsDark] = useState(
    () => typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  );
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setIsDark(root.classList.contains("dark"));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  return isDark;
}

export function toggleTheme(): void {
  const root = document.documentElement;
  const next = !root.classList.contains("dark");
  root.classList.toggle("dark", next);
  try {
    localStorage.setItem("theme", next ? "dark" : "light");
  } catch {
    /* storage unavailable */
  }
}

/* -------------------------------------------------------------------------- */
/* Text parsing — `*word*` marks the accent                                   */
/* -------------------------------------------------------------------------- */

export interface ParsedWord {
  word: string;
  accent: boolean;
  space: boolean;
}

export function stripAccent(text: string): string {
  return text.replace(/\*/g, "");
}

export function toWords(text: string, accentWord?: string): ParsedWord[] {
  const out: ParsedWord[] = [];
  let pendingSpace = false;
  const target = accentWord?.toLowerCase();

  text
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .forEach((segment) => {
      const isAccent = segment.length > 2 && segment.startsWith("*") && segment.endsWith("*");
      const clean = isAccent ? segment.slice(1, -1) : segment;
      clean.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          pendingSpace = true;
          return;
        }
        const bare = part.replace(/[^\p{L}\p{N}'-]/gu, "").toLowerCase();
        out.push({
          word: part,
          accent: isAccent || (!!target && bare === target),
          space: out.length > 0 && pendingSpace,
        });
        pendingSpace = false;
      });
    });
  return out;
}

export const ACCENT_CLASS =
  "text-[color:var(--brand-primary,#7C3AED)] font-semibold tracking-[-0.03em]";

/* -------------------------------------------------------------------------- */
/* Layout                                                                     */
/* -------------------------------------------------------------------------- */

export const Container: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <div className={`mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10 ${className}`}>
    {children}
  </div>
);

/* -------------------------------------------------------------------------- */
/* MaskedHeading — GSAP/Lenis-inspired word rise reveal                       */
/* -------------------------------------------------------------------------- */

type HeadingTag = "h1" | "h2" | "h3" | "p";

export interface MaskedHeadingProps {
  text: string;
  accent?: string;
  as?: HeadingTag;
  className?: string;
  accentClassName?: string;
  delay?: number;
  stagger?: number;
}

const wordVariants: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: { y: "0%", opacity: 1, transition: { duration: 0.72, ease: EASE } },
};

export const MaskedHeading: React.FC<MaskedHeadingProps> = ({
  text,
  accent,
  as = "h2",
  className = "",
  accentClassName = "",
  delay = 0,
  stagger = 0.045,
}) => {
  const reduce = useReducedMotion();
  const words = toWords(text, accent);
  const Tag = as as React.ElementType;

  if (reduce) {
    return (
      <Tag className={className}>
        {words.map((w, i) => (
          <React.Fragment key={i}>
            {w.space && " "}
            <span className={w.accent ? `${ACCENT_CLASS} ${accentClassName}` : ""}>{w.word}</span>
          </React.Fragment>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={className} aria-label={stripAccent(text)}>
      <motion.span
        aria-hidden
        className="block"
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: stagger, delayChildren: delay } },
        }}
      >
        {words.map((w, i) => (
          <React.Fragment key={i}>
            {w.space && " "}
            <span className="relative -my-[0.08em] -mr-[0.04em] inline-block overflow-hidden py-[0.08em] pr-[0.04em] align-top">
              <motion.span
                variants={wordVariants}
                className={`inline-block will-change-transform ${
                  w.accent ? `${ACCENT_CLASS} ${accentClassName}` : ""
                }`}
              >
                {w.word}
              </motion.span>
            </span>
          </React.Fragment>
        ))}
      </motion.span>
    </Tag>
  );
};

/* -------------------------------------------------------------------------- */
/* Reveal / Stagger                                                           */
/* -------------------------------------------------------------------------- */

export const Reveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}> = ({ children, className = "", delay = 0, y = 24 }) => {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.65, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const Stagger: React.FC<{
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}> = ({ children, className = "", stagger = 0.08, delay = 0 }) => {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  y?: number;
}> = ({ children, className = "", y = 24 }) => {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/* HairLine                                                                   */
/* -------------------------------------------------------------------------- */

export const HairLine: React.FC<{ className?: string; delay?: number }> = ({
  className = "",
  delay = 0,
}) => {
  const reduce = useReducedMotion();
  if (reduce) return <div aria-hidden className={`bg-nx-line h-px w-full ${className}`} />;
  return (
    <motion.div
      aria-hidden
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      style={{ originX: 0 }}
      className={`bg-nx-line h-px w-full ${className}`}
    />
  );
};

/* -------------------------------------------------------------------------- */
/* ClipReveal                                                                 */
/* -------------------------------------------------------------------------- */

export const ClipReveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  radius?: number;
  delay?: number;
}> = ({ children, className = "", radius = 24, delay = 0 }) => {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <div className={`relative overflow-hidden ${className}`} style={{ borderRadius: radius }}>
        {children}
      </div>
    );
  }
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={{ borderRadius: radius }}
      initial={{ clipPath: `inset(100% 0% 0% 0% round ${radius}px)` }}
      whileInView={{ clipPath: `inset(0% 0% 0% 0% round ${radius}px)` }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.0, delay, ease: EASE }}
    >
      <motion.div
        className="h-full w-full"
        initial={{ scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.3, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/* Clean HudbirdUI Pill Badge & Section Header (Zero [ BRACKET ] clutter)        */
/* -------------------------------------------------------------------------- */

export const SectionLabel: React.FC<{ index?: string; label: string; className?: string }> = ({
  label,
  className = "",
}) => (
  <span
    className={`bg-nx-surface border-nx-line text-nx-ink-2 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium shadow-[0_2px_10px_rgba(0,0,0,0.03)] ${className}`}
  >
    <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--brand-primary,#7C3AED)]" />
    <span>{label}</span>
  </span>
);

export const HEADLINE_CLASS =
  "text-[clamp(2.25rem,4.8vw,4rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-nx-ink";

export const SectionHeader: React.FC<{
  index?: string;
  label: string;
  headline: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}> = ({ index, label, headline, description, action, className = "" }) => (
  <div className={className}>
    <div className="flex flex-col justify-between gap-6 pb-4 lg:flex-row lg:items-end">
      <div className="max-w-2xl space-y-4">
        <Reveal y={10}>
          <SectionLabel index={index} label={label} />
        </Reveal>
        <MaskedHeading text={headline} className={HEADLINE_CLASS} />
      </div>
      {(description || action) && (
        <div className="flex max-w-md flex-col items-start justify-between gap-4 sm:flex-row lg:flex-col lg:items-end">
          {description && (
            <Reveal delay={0.1}>
              <p className="text-nx-ink-2 text-[15px] leading-relaxed sm:text-base lg:text-right">
                {description}
              </p>
            </Reveal>
          )}
          {action && <Reveal delay={0.18}>{action}</Reveal>}
        </div>
      )}
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/* PillLink — Signature HudbirdUI Double-Ring Capsule Button with Vertical Slide */
/* -------------------------------------------------------------------------- */

export type PillVariant =
  "brand" | "primary" | "lime" | "ink" | "ghost" | "outline" | "secondary" | "inverse";

const PILL_STYLES: Record<string, { ring: string; body: string; dot: string }> = {
  brand: {
    ring: "border-black/10 dark:border-white/15 bg-black/[0.03] dark:bg-white/[0.05]",
    body: "bg-[#0D0F14] dark:bg-white text-white dark:text-[#0D0F14] shadow-[0_10px_24px_-8px_rgba(13,15,20,0.25)]",
    dot: "bg-[#C8F560] text-[#0D0F14]",
  },
  primary: {
    ring: "border-black/10 dark:border-white/15 bg-black/[0.03] dark:bg-white/[0.05]",
    body: "bg-[#0D0F14] dark:bg-white text-white dark:text-[#0D0F14] shadow-[0_10px_24px_-8px_rgba(13,15,20,0.25)]",
    dot: "bg-[#C8F560] text-[#0D0F14]",
  },
  lime: {
    ring: "border-[#C8F560]/35 bg-[#C8F560]/10",
    body: "bg-[#C8F560] text-[#0D0F14] font-semibold shadow-[0_10px_24px_-8px_rgba(200,245,96,0.3)]",
    dot: "bg-[#0D0F14] text-[#C8F560]",
  },
  ink: {
    ring: "border-nx-line bg-nx-surface/60",
    body: "bg-nx-inverse text-nx-inverse-ink",
    dot: "bg-nx-inverse-ink text-nx-inverse",
  },
  ghost: {
    ring: "border-nx-line bg-nx-surface/50",
    body: "bg-nx-surface text-nx-ink border border-nx-line/80",
    dot: "bg-nx-inverse text-nx-inverse-ink",
  },
  outline: {
    ring: "border-nx-line bg-nx-surface/50",
    body: "bg-nx-surface text-nx-ink border border-nx-line/80",
    dot: "bg-nx-inverse text-nx-inverse-ink",
  },
  secondary: {
    ring: "border-nx-line bg-nx-surface/50",
    body: "bg-nx-surface text-nx-ink border border-nx-line/80",
    dot: "bg-nx-inverse text-nx-inverse-ink",
  },
  inverse: {
    ring: "border-white/20 bg-white/[0.06]",
    body: "bg-white text-[#0D0F14] font-semibold",
    dot: "bg-[#0D0F14] text-white",
  },
};

export const PillLink: React.FC<{
  href: string;
  children: React.ReactNode;
  variant?: PillVariant;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  className?: string;
  hideArrow?: boolean;
}> = ({
  href,
  children,
  variant = "brand",
  size = "md",
  fullWidth = false,
  className = "",
  hideArrow = false,
}) => {
  const s = PILL_STYLES[variant] || PILL_STYLES.brand;
  const dotSize = size === "sm" ? "h-6 w-6" : size === "lg" ? "h-9 w-9" : "h-8 w-8";
  const iconSize = size === "sm" ? "h-3 w-3" : size === "lg" ? "h-4 w-4" : "h-3.5 w-3.5";
  const pad =
    size === "sm"
      ? "py-1.5 pl-4 pr-1.5 text-xs"
      : size === "lg"
        ? "py-2.5 pl-6 pr-2 text-[15px]"
        : "py-2 pl-5 pr-1.5 text-sm";

  const cleanChildren =
    typeof children === "string"
      ? children
          .replace(/[\u2190-\u21FF\u2790-\u27BF\u2B00-\u2BFF]/g, "")
          .replace(/\s+/g, " ")
          .trim()
      : children;

  return (
    <a
      href={href}
      className={`group/pill inline-flex cursor-pointer items-center rounded-full border p-1 transition-all duration-300 select-none hover:scale-[1.015] active:scale-[0.99] ${
        s.ring
      } ${fullWidth ? "w-full" : "min-w-fit"} ${className}`}
    >
      <span
        className={`inline-flex items-center gap-3 rounded-full font-medium whitespace-nowrap transition-all duration-300 ${pad} ${
          s.body
        } ${fullWidth ? "w-full justify-between" : ""}`}
      >
        {/* HudbirdUI Vertical Text Slide Effect */}
        <span className="relative inline-flex h-[1.3em] items-center overflow-hidden">
          <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/pill:-translate-y-full">
            {cleanChildren}
          </span>
          <span
            aria-hidden="true"
            className="absolute inset-0 inline-block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/pill:translate-y-0"
          >
            {cleanChildren}
          </span>
        </span>

        {!hideArrow && (
          <span
            aria-hidden="true"
            className={`relative grid shrink-0 place-items-center overflow-hidden rounded-full ${dotSize} ${s.dot}`}
          >
            <ArrowUpRight
              className={`${iconSize} transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/pill:translate-x-5 group-hover/pill:-translate-y-5`}
            />
            <ArrowUpRight
              className={`absolute ${iconSize} -translate-x-5 translate-y-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/pill:translate-x-0 group-hover/pill:translate-y-0`}
            />
          </span>
        )}
      </span>
    </a>
  );
};

/* -------------------------------------------------------------------------- */
/* Backwards-compatible aliases                                               */
/* -------------------------------------------------------------------------- */

export const ScrollReveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
}> = ({ distance = 24, ...rest }) => <Reveal y={distance} {...rest} />;

export const DoubleBezelCard: React.FC<{
  children: React.ReactNode;
  outerClassName?: string;
  innerClassName?: string;
  className?: string;
}> = ({ children, outerClassName = "", innerClassName = "", className = "" }) => (
  <div
    className={`border-nx-line bg-nx-surface/60 rounded-[28px] border p-1.5 backdrop-blur-md transition-all duration-300 ${outerClassName} ${className}`}
  >
    <div
      className={`border-nx-line/50 bg-nx-page overflow-hidden rounded-[22px] border ${innerClassName}`}
    >
      {children}
    </div>
  </div>
);

export const ScrollRevealLine = HairLine;
export const ScrollRevealStagger = Stagger;
export const ScrollRevealItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  distance?: number;
}> = ({ distance = 24, ...rest }) => <StaggerItem y={distance} {...rest} />;
