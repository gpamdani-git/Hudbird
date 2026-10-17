// packages/core/src/components/KineticButton/KineticButton.tsx
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

export const kineticButtonVariants = cva(
  "group relative inline-flex items-center justify-center font-bold tracking-tight select-none overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100 shadow-md hover:shadow-lg focus-visible:ring-zinc-950 dark:focus-visible:ring-white",
        brand:
          "bg-brand-600 text-white hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600 shadow-md shadow-brand-500/25 hover:shadow-glow focus-visible:ring-brand-500",
        secondary:
          "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-white/[0.08] dark:text-zinc-100 dark:hover:bg-white/[0.12] border border-zinc-200/80 dark:border-white/[0.08] focus-visible:ring-zinc-400",
        outline:
          "bg-transparent text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-white/[0.15] hover:bg-zinc-100/80 dark:hover:bg-white/[0.06] hover:border-zinc-400 dark:hover:border-white/[0.3] focus-visible:ring-zinc-400",
        ghost:
          "bg-transparent text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white hover:bg-zinc-100/70 dark:hover:bg-white/[0.06] focus-visible:ring-zinc-400",
      },
      size: {
        sm: "h-9 px-4 text-xs rounded-xl gap-2",
        md: "h-11 px-5 text-sm rounded-xl gap-2.5",
        lg: "h-13 px-7 text-base rounded-2xl gap-3",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface KineticButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof kineticButtonVariants> {
  href?: string;
  target?: string;
  rel?: string;
  showArrow?: boolean;
  arrowPosition?: "right" | "left";
  icon?: React.ReactNode;
  classNames?: {
    base?: string;
    textWrapper?: string;
    textPrimary?: string;
    textDuplicate?: string;
    arrowWrapper?: string;
  };
}

export const KineticButton = React.forwardRef<HTMLButtonElement, KineticButtonProps>(
  (
    {
      children,
      className,
      classNames,
      variant = "primary",
      size = "md",
      href,
      target,
      rel,
      showArrow = true,
      arrowPosition = "right",
      icon,
      disabled,
      ...props
    },
    ref
  ) => {
    const isLink = Boolean(href);

    const arrowElement = showArrow && (
      <span
        className={cn(
          "relative flex shrink-0 items-center justify-center overflow-hidden",
          size === "sm" ? "h-4 w-4" : size === "lg" ? "h-5 w-5" : "h-4.5 w-4.5",
          classNames?.arrowWrapper
        )}
        aria-hidden="true"
      >
        {/* Outgoing diagonal arrow (flies to top-right on hover) */}
        <svg
          className="absolute inset-0 h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-full group-hover:-translate-y-full"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>

        {/* Incoming diagonal arrow (arrives from bottom-left on hover) */}
        <svg
          className="absolute inset-0 h-full w-full -translate-x-full translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      </span>
    );

    const textElement = (
      <span
        className={cn(
          "relative inline-flex h-[1.3em] flex-col overflow-hidden leading-[1.3em]",
          classNames?.textWrapper
        )}
      >
        {/* Current primary text (rolls up on hover) */}
        <span
          className={cn(
            "inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform group-hover:-translate-y-full",
            classNames?.textPrimary
          )}
        >
          {children}
        </span>

        {/* Duplicate text (rolls in from bottom on hover) */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute top-full left-0 inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform group-hover:-translate-y-full",
            classNames?.textDuplicate
          )}
        >
          {children}
        </span>
      </span>
    );

    const content = (
      <>
        {arrowPosition === "left" && (icon || arrowElement)}
        {textElement}
        {arrowPosition === "right" && (icon || arrowElement)}
      </>
    );

    if (isLink) {
      return (
        <a
          href={href}
          target={target}
          rel={target === "_blank" ? rel || "noopener noreferrer" : rel}
          className={cn(kineticButtonVariants({ variant, size }), classNames?.base, className)}
          aria-disabled={disabled}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={cn(kineticButtonVariants({ variant, size }), classNames?.base, className)}
        {...props}
      >
        {content}
      </button>
    );
  }
);

KineticButton.displayName = "KineticButton";
