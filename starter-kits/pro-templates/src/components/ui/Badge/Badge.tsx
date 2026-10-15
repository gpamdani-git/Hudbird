// packages/core/src/components/Badge/Badge.tsx
"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export type BadgeVariant = "solid" | "soft" | "outline" | "flat" | "default";
export type BadgeColor = "primary" | "secondary" | "success" | "warning" | "danger" | "info";
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
        flat: "font-medium",
        default: "text-white font-semibold shadow-xs",
      },
      color: {
        primary: "",
        secondary: "",
        success: "",
        warning: "",
        danger: "",
        info: "",
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

      // Soft (Pastel) Variants
      {
        variant: "soft",
        color: "primary",
        className:
          "bg-primary-50 text-primary-700 ring-1 ring-inset ring-primary-200 dark:bg-primary-500/15 dark:text-primary-400 dark:ring-primary-500/20",
      },
      {
        variant: "soft",
        color: "secondary",
        className:
          "bg-secondary-50 text-secondary-700 ring-1 ring-inset ring-secondary-200 dark:bg-secondary-500/15 dark:text-secondary-400 dark:ring-secondary-500/20",
      },
      {
        variant: "soft",
        color: "success",
        className:
          "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-400 dark:ring-emerald-500/20",
      },
      {
        variant: "soft",
        color: "warning",
        className:
          "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200 dark:bg-amber-500/15 dark:text-amber-400 dark:ring-amber-500/20",
      },
      {
        variant: "soft",
        color: "danger",
        className:
          "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200 dark:bg-rose-500/15 dark:text-rose-400 dark:ring-rose-500/20",
      },
      {
        variant: "soft",
        color: "info",
        className:
          "bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-200 dark:bg-sky-500/15 dark:text-sky-400 dark:ring-sky-500/20",
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
            "ring-background absolute z-10 box-border ring-2",
            placementStyles[placement],
            isDot && "h-2.5 w-2.5 min-w-0 rounded-full p-0 px-0 py-0",
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
          isDot && "h-2.5 w-2.5 min-w-0 rounded-full p-0 px-0 py-0",
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
