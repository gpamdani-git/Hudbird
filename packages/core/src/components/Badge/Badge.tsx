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
        className: "bg-primary text-primary-foreground",
      },
      {
        variant: "solid",
        color: "success",
        className: "bg-success text-success-foreground",
      },
      {
        variant: "solid",
        color: "warning",
        className: "bg-warning text-warning-foreground font-bold",
      },
      {
        variant: "solid",
        color: "danger",
        className: "bg-destructive text-destructive-foreground",
      },

      // Soft (Pastel) Variants
      {
        variant: "soft",
        color: "primary",
        className: "bg-primary-soft text-primary-text ring-1 ring-inset ring-primary-border-soft",
      },
      {
        variant: "soft",
        color: "success",
        className: "bg-success-soft text-success-text ring-1 ring-inset ring-success-border-soft",
      },
      {
        variant: "soft",
        color: "warning",
        className: "bg-warning-soft text-warning-text ring-1 ring-inset ring-warning-border-soft",
      },
      {
        variant: "soft",
        color: "danger",
        className:
          "bg-destructive-soft text-destructive-text ring-1 ring-inset ring-destructive-border-soft",
      },

      // Outline Variants
      {
        variant: "outline",
        color: "primary",
        className: "border-primary-border text-primary-text hover:bg-primary-soft",
      },
      {
        variant: "outline",
        color: "success",
        className: "border-success-border text-success-text hover:bg-success-soft",
      },
      {
        variant: "outline",
        color: "warning",
        className: "border-warning-border text-warning-text hover:bg-warning-soft",
      },
      {
        variant: "outline",
        color: "danger",
        className: "border-destructive-border text-destructive-text hover:bg-destructive-soft",
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
