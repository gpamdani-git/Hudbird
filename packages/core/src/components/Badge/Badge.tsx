// packages/core/src/components/Badge/Badge.tsx
"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

export type BadgeVariant = "solid" | "soft" | "outline" | "flat" | "modern" | "default";
export type BadgeColor =
  "primary" | "secondary" | "success" | "warning" | "danger" | "info" | "zinc" | "neutral";
export type BadgeSize = "sm" | "md" | "lg";
export type BadgePlacement = "top-right" | "top-left" | "bottom-right" | "bottom-left";
export type BadgeShape = "circle" | "rectangle";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium tracking-tight whitespace-nowrap select-none transition-colors duration-150",
  {
    variants: {
      variant: {
        solid: "font-semibold shadow-xs",
        soft: "font-semibold",
        outline: "bg-transparent border",
        flat: "font-medium",
        modern:
          "rounded-lg bg-white text-zinc-700 ring-1 ring-inset ring-zinc-200/90 shadow-xs font-medium dark:bg-[#161618] dark:text-zinc-200 dark:ring-white/15",
        default: "font-semibold shadow-xs",
      },
      color: {
        primary: "",
        secondary: "",
        success: "",
        warning: "",
        danger: "",
        info: "",
        zinc: "",
        neutral: "",
      },
      size: {
        dot: "p-0 min-h-0 min-w-0 h-2.5 w-2.5 aspect-square rounded-full shrink-0",
        "dot-sm": "p-0 min-h-0 min-w-0 h-2 w-2 aspect-square rounded-full shrink-0",
        "dot-md": "p-0 min-h-0 min-w-0 h-2.5 w-2.5 aspect-square rounded-full shrink-0",
        "dot-lg": "p-0 min-h-0 min-w-0 h-3.5 w-3.5 aspect-square rounded-full shrink-0",
        sm: "px-2.5 py-0.5 text-[10px] font-semibold min-h-5 gap-1",
        md: "px-3.5 py-1 text-xs font-semibold min-h-6 gap-1.5",
        lg: "px-4.5 py-1.5 text-sm font-medium min-h-7 gap-2",
      },
    },
    compoundVariants: [
      // Solid Variants
      {
        variant: "solid",
        color: "primary",
        className: "bg-primary text-primary-foreground",
      },
      {
        variant: "solid",
        color: "secondary",
        className: "bg-secondary text-secondary-foreground",
      },
      {
        variant: "solid",
        color: "success",
        className: "bg-emerald-600 text-white dark:bg-emerald-500",
      },
      {
        variant: "solid",
        color: "warning",
        className: "bg-amber-500 text-zinc-950 font-bold dark:bg-amber-400",
      },
      {
        variant: "solid",
        color: "danger",
        className: "bg-rose-600 text-white dark:bg-rose-500",
      },
      {
        variant: "solid",
        color: "info",
        className: "bg-sky-600 text-white dark:bg-sky-500",
      },
      {
        variant: "solid",
        color: "zinc",
        className: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900",
      },
      {
        variant: "solid",
        color: "neutral",
        className: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900",
      },

      // Soft (Pastel / Smoked Jewel on Dark & Glass) Variants — WCAG 2.2 AA (>= 4.5:1)
      {
        variant: "soft",
        color: "primary",
        className:
          "bg-primary-50 text-primary-700 ring-1 ring-inset ring-primary-200 dark:bg-primary-500/20 dark:text-primary-200 dark:ring-primary-400/35 [[data-glass-mode=glass][data-hb-theme=dark]_&]:bg-indigo-950/80 [[data-glass-mode=glass][data-hb-theme=dark]_&]:text-indigo-100 [[data-glass-mode=glass][data-hb-theme=dark]_&]:ring-indigo-400/45",
      },
      {
        variant: "soft",
        color: "secondary",
        className:
          "bg-secondary-50 text-secondary-700 ring-1 ring-inset ring-secondary-200 dark:bg-secondary-500/20 dark:text-secondary-200 dark:ring-secondary-400/35 [[data-glass-mode=glass][data-hb-theme=dark]_&]:bg-cyan-950/80 [[data-glass-mode=glass][data-hb-theme=dark]_&]:text-cyan-100 [[data-glass-mode=glass][data-hb-theme=dark]_&]:ring-cyan-400/45",
      },
      {
        variant: "soft",
        color: "success",
        className:
          "bg-emerald-50 text-emerald-800 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-200 dark:ring-emerald-400/35 [[data-glass-mode=glass][data-hb-theme=dark]_&]:bg-emerald-950/80 [[data-glass-mode=glass][data-hb-theme=dark]_&]:text-emerald-100 [[data-glass-mode=glass][data-hb-theme=dark]_&]:ring-emerald-400/45",
      },
      {
        variant: "soft",
        color: "warning",
        className:
          "bg-amber-50 text-amber-800 ring-1 ring-inset ring-amber-200 dark:bg-amber-500/20 dark:text-amber-200 dark:ring-amber-400/35 [[data-glass-mode=glass][data-hb-theme=dark]_&]:bg-amber-950/80 [[data-glass-mode=glass][data-hb-theme=dark]_&]:text-amber-100 [[data-glass-mode=glass][data-hb-theme=dark]_&]:ring-amber-400/45",
      },
      {
        variant: "soft",
        color: "danger",
        className:
          "bg-rose-50 text-rose-800 ring-1 ring-inset ring-rose-200 dark:bg-rose-500/20 dark:text-rose-200 dark:ring-rose-400/35 [[data-glass-mode=glass][data-hb-theme=dark]_&]:bg-rose-950/80 [[data-glass-mode=glass][data-hb-theme=dark]_&]:text-rose-100 [[data-glass-mode=glass][data-hb-theme=dark]_&]:ring-rose-400/45",
      },
      {
        variant: "soft",
        color: "info",
        className:
          "bg-sky-50 text-sky-800 ring-1 ring-inset ring-sky-200 dark:bg-sky-500/20 dark:text-sky-200 dark:ring-sky-400/35 [[data-glass-mode=glass][data-hb-theme=dark]_&]:bg-sky-950/80 [[data-glass-mode=glass][data-hb-theme=dark]_&]:text-sky-100 [[data-glass-mode=glass][data-hb-theme=dark]_&]:ring-sky-400/45",
      },
      {
        variant: "soft",
        color: "zinc",
        className:
          "bg-zinc-100 text-zinc-800 ring-1 ring-inset ring-zinc-200 dark:bg-zinc-800/85 dark:text-zinc-100 dark:ring-zinc-600/60 [[data-glass-mode=glass][data-hb-theme=dark]_&]:bg-slate-950/75 [[data-glass-mode=glass][data-hb-theme=dark]_&]:text-slate-100 [[data-glass-mode=glass][data-hb-theme=dark]_&]:ring-white/25",
      },
      {
        variant: "soft",
        color: "neutral",
        className:
          "bg-zinc-100 text-zinc-800 ring-1 ring-inset ring-zinc-200 dark:bg-zinc-800/85 dark:text-zinc-100 dark:ring-zinc-600/60 [[data-glass-mode=glass][data-hb-theme=dark]_&]:bg-slate-950/75 [[data-glass-mode=glass][data-hb-theme=dark]_&]:text-slate-100 [[data-glass-mode=glass][data-hb-theme=dark]_&]:ring-white/25",
      },

      // Outline Variants
      {
        variant: "outline",
        color: "primary",
        className:
          "border-primary-600 text-primary-700 hover:bg-primary-50 dark:border-primary-500 dark:text-primary-400 dark:hover:bg-primary-500/15",
      },
      {
        variant: "outline",
        color: "secondary",
        className:
          "border-secondary-600 text-secondary-700 hover:bg-secondary-50 dark:border-secondary-500 dark:text-secondary-400 dark:hover:bg-secondary-500/15",
      },
      {
        variant: "outline",
        color: "success",
        className:
          "border-emerald-600 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-500 dark:text-emerald-400 dark:hover:bg-emerald-500/15",
      },
      {
        variant: "outline",
        color: "warning",
        className:
          "border-amber-500 text-amber-700 hover:bg-amber-50 dark:border-amber-400 dark:text-amber-400 dark:hover:bg-amber-500/15",
      },
      {
        variant: "outline",
        color: "danger",
        className:
          "border-rose-600 text-rose-700 hover:bg-rose-50 dark:border-rose-500 dark:text-rose-400 dark:hover:bg-rose-500/15",
      },
      {
        variant: "outline",
        color: "info",
        className:
          "border-sky-600 text-sky-700 hover:bg-sky-50 dark:border-sky-500 dark:text-sky-400 dark:hover:bg-sky-500/15",
      },
      {
        variant: "outline",
        color: "zinc",
        className:
          "border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800",
      },
      {
        variant: "outline",
        color: "neutral",
        className:
          "border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800",
      },

      // Flat Variants
      {
        variant: "flat",
        color: "primary",
        className: "bg-primary-50 text-primary-700 dark:bg-primary-500/15 dark:text-primary-400",
      },
      {
        variant: "flat",
        color: "secondary",
        className:
          "bg-secondary-50 text-secondary-700 dark:bg-secondary-500/15 dark:text-secondary-400",
      },
      {
        variant: "flat",
        color: "success",
        className: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
      },
      {
        variant: "flat",
        color: "warning",
        className: "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
      },
      {
        variant: "flat",
        color: "danger",
        className: "bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400",
      },
      {
        variant: "flat",
        color: "info",
        className: "bg-sky-50 text-sky-700 dark:bg-sky-500/15 dark:text-sky-400",
      },
      {
        variant: "flat",
        color: "zinc",
        className: "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200",
      },
      {
        variant: "flat",
        color: "neutral",
        className: "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200",
      },
      {
        variant: "flat",
        color: "info",
        className: "bg-sky-50 text-sky-700 dark:bg-sky-500/15 dark:text-sky-400",
      },

      // Default Variants
      {
        variant: "default",
        color: "primary",
        className: "bg-primary text-primary-foreground",
      },
      {
        variant: "default",
        color: "secondary",
        className: "bg-secondary text-secondary-foreground",
      },
      {
        variant: "default",
        color: "success",
        className: "bg-emerald-600 text-white dark:bg-emerald-500",
      },
      {
        variant: "default",
        color: "warning",
        className: "bg-amber-500 text-zinc-950 font-bold dark:bg-amber-400",
      },
      {
        variant: "default",
        color: "danger",
        className: "bg-rose-600 text-white dark:bg-rose-500",
      },
      {
        variant: "default",
        color: "info",
        className: "bg-sky-600 text-white dark:bg-sky-500",
      },
      {
        variant: "default",
        color: "zinc",
        className: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900",
      },
      {
        variant: "default",
        color: "neutral",
        className: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900",
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
const placementStyles: Record<BadgeShape, Record<BadgePlacement, string>> = {
  rectangle: {
    "top-right": "top-0 right-0 translate-x-1/2 -translate-y-1/2",
    "top-left": "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
    "bottom-right": "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
    "bottom-left": "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
  },
  circle: {
    "top-right": "top-[6%] right-[6%] translate-x-1/2 -translate-y-1/2",
    "top-left": "top-[6%] left-[6%] -translate-x-1/2 -translate-y-1/2",
    "bottom-right": "bottom-[6%] right-[6%] translate-x-1/2 translate-y-1/2",
    "bottom-left": "bottom-[6%] left-[6%] -translate-x-1/2 translate-y-1/2",
  },
};

export interface BadgeProps
  extends
    Omit<React.HTMLAttributes<HTMLSpanElement>, "color" | "content">,
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
   * Target shape of wrapped element to optimize corner offsets.
   * Use "circle" for rounded-full elements like Avatars.
   * @default "rectangle"
   */
  shape?: BadgeShape;
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
      shape = "rectangle",
      isDot = false,
      isInvisible = false,
      children,
      ...props
    },
    ref
  ) => {
    // Mode 1: Floating Badge wrapping child elements (Avatar, Button, Icon, e.g.)
    const isFloating = children !== undefined && (content !== undefined || isDot);
    const resolvedSize = isDot
      ? ((size === "sm" ? "dot-sm" : size === "lg" ? "dot-lg" : "dot-md") as any)
      : size;

    const badgeContent = (
      <span
        ref={ref}
        className={cn(
          badgeVariants({ variant, color, size: resolvedSize }),
          isDot && "block aspect-square !min-h-0 !min-w-0 !p-0 !leading-none",
          isFloating && [
            "absolute z-10 box-border ring-2 ring-white dark:ring-[#161618]",
            placementStyles[shape][placement],
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
          badgeVariants({ variant, color, size: resolvedSize }),
          isDot && "block aspect-square !min-h-0 !min-w-0 !p-0 !leading-none",
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
