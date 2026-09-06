// packages/core/src/components/Badge/Badge.tsx
"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

export type BadgeVariant = "solid" | "soft" | "outline";
export type BadgeColor = "primary" | "success" | "warning" | "danger";
export type BadgeSize = "sm" | "md" | "lg";
export type BadgePlacement = "top-right" | "top-left" | "bottom-right" | "bottom-left";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium tracking-tight whitespace-nowrap select-none transition-colors duration-150",
  {
    variants: {
      variant: {
        solid: "text-white font-semibold shadow-xs",
        soft: "font-semibold",
        outline: "bg-transparent border",
      },
      color: {
        primary: "",
        success: "",
        warning: "",
        danger: "",
      },
      size: {
        sm: "px-1.5 py-0.5 text-[10px] font-bold min-w-4.5 h-4.5",
        md: "px-2.5 py-0.5 text-xs font-semibold min-w-5 h-5",
        lg: "px-3 py-1 text-sm font-medium min-w-6 h-6",
      },
    },
    compoundVariants: [
      // Solid Variants
      {
        variant: "solid",
        color: "primary",
        className: "bg-indigo-600 text-white dark:bg-indigo-500",
      },
      {
        variant: "solid",
        color: "success",
        className: "bg-emerald-600 text-white dark:bg-emerald-500",
      },
      {
        variant: "solid",
        color: "warning",
        className: "bg-amber-500 text-zinc-950 font-bold dark:bg-amber-400 dark:text-zinc-950",
      },
      {
        variant: "solid",
        color: "danger",
        className: "bg-rose-600 text-white dark:bg-rose-500",
      },

      // Soft (Pastel) Variants
      {
        variant: "soft",
        color: "primary",
        className:
          "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 ring-1 ring-inset ring-indigo-700/10 dark:ring-indigo-400/20",
      },
      {
        variant: "soft",
        color: "success",
        className:
          "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 ring-1 ring-inset ring-emerald-700/10 dark:ring-emerald-400/20",
      },
      {
        variant: "soft",
        color: "warning",
        className:
          "bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 ring-1 ring-inset ring-amber-700/10 dark:ring-amber-400/20",
      },
      {
        variant: "soft",
        color: "danger",
        className:
          "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 ring-1 ring-inset ring-rose-700/10 dark:ring-rose-400/20",
      },

      // Outline Variants
      {
        variant: "outline",
        color: "primary",
        className:
          "border-indigo-600/30 text-indigo-700 dark:border-indigo-400/40 dark:text-indigo-300 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30",
      },
      {
        variant: "outline",
        color: "success",
        className:
          "border-emerald-600/30 text-emerald-700 dark:border-emerald-400/40 dark:text-emerald-300 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30",
      },
      {
        variant: "outline",
        color: "warning",
        className:
          "border-amber-600/30 text-amber-800 dark:border-amber-400/40 dark:text-amber-300 hover:bg-amber-50/50 dark:hover:bg-amber-950/30",
      },
      {
        variant: "outline",
        color: "danger",
        className:
          "border-rose-600/30 text-rose-700 dark:border-rose-400/40 dark:text-rose-300 hover:bg-rose-50/50 dark:hover:bg-rose-950/30",
      },
    ],
    defaultVariants: {
      variant: "solid",
      color: "primary",
      size: "md",
    },
  }
);

// Floating badge placement classes
const placementStyles: Record<BadgePlacement, string> = {
  "top-right": "top-0 right-0 translate-x-1/2 -translate-y-1/2",
  "top-left": "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
  "bottom-right": "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
  "bottom-left": "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
};

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color" | "content">,
    VariantProps<typeof badgeVariants> {
  /**
   * Content to render inside the floating badge (when wrapping child elements).
   * If omitted, renders as a standalone badge using `children`.
   */
  content?: React.ReactNode;
  /**
   * Corner placement when used as a floating notification on a wrapped element.
   * @default "top-right"
   */
  placement?: BadgePlacement;
  /**
   * Shows a small indicator dot without text content when true.
   * @default false
   */
  isDot?: boolean;
  /**
   * Controls whether the badge is visible.
   * @default true
   */
  isInvisible?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant = "solid",
      color = "primary",
      size = "md",
      content,
      placement = "top-right",
      isDot = false,
      isInvisible = false,
      children,
      ...props
    },
    ref
  ) => {
    // Mode 1: Floating Badge wrapping child elements (Avatar, Button, Icon, etc.)
    const isFloating = children !== undefined && (content !== undefined || isDot);

    const badgeContent = (
      <span
        ref={ref}
        className={cn(
          badgeVariants({ variant, color, size }),
          isFloating && [
            "absolute z-10 box-border ring-2 ring-white dark:ring-zinc-950",
            placementStyles[placement],
            isDot && "p-0 min-w-0 h-2.5 w-2.5 rounded-full px-0 py-0",
          ],
          isInvisible && "hidden",
          className
        )}
        {...props}
      >
        {!isDot && (content ?? children)}
      </span>
    );

    if (isFloating) {
      return (
        <span className="relative inline-flex shrink-0">
          {children}
          {badgeContent}
        </span>
      );
    }

    // Mode 2: Standalone inline badge (e.g. tag label in table or card)
    return (
      <span
        ref={ref}
        className={cn(
          badgeVariants({ variant, color, size }),
          isDot && "p-0 min-w-0 h-2.5 w-2.5 rounded-full px-0 py-0",
          isInvisible && "hidden",
          className
        )}
        {...props}
      >
        {!isDot && children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };
