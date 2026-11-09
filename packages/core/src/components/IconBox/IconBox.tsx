// packages/core/src/components/IconBox/IconBox.tsx
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

export const iconBoxVariants = cva(
  "relative flex items-center justify-center select-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-zinc-100 dark:bg-white/[0.05] border border-zinc-200/90 dark:border-white/[0.08] text-zinc-800 dark:text-zinc-200 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] group-hover:border-brand-500/40 group-hover:bg-brand-500/10 group-hover:text-brand-600 dark:group-hover:text-brand-300",
        brand:
          "bg-brand-500/15 border border-brand-500/30 text-brand-600 dark:text-brand-300 shadow-[inset_0_1px_0_0_rgba(157,88,190,0.2)] group-hover:bg-brand-500/25 group-hover:border-brand-500/50",
        modern:
          "bg-white dark:bg-[#161618] border border-zinc-200/90 dark:border-white/[0.1] text-zinc-700 dark:text-zinc-200 shadow-xs ring-1 ring-inset ring-black/[0.03] dark:ring-white/[0.04]",
        "double-ring":
          "bg-primary/10 text-primary border border-primary/20 ring-4 ring-primary/5 dark:bg-primary/15 dark:border-primary/30 dark:ring-primary/10",
        glass:
          "bg-white/75 dark:bg-[#161618]/65 [[data-glass-mode=glass][data-hb-theme=dark]_&]:bg-white/15 border border-black/[0.08] dark:border-white/[0.1] [[data-glass-mode=glass][data-hb-theme=dark]_&]:border-white/25 backdrop-blur-xl text-zinc-900 dark:text-white shadow-xs group-hover:border-brand-500/40",
        subtle:
          "bg-transparent border border-black/[0.08] dark:border-white/[0.08] text-zinc-600 dark:text-zinc-400 group-hover:border-zinc-300 dark:group-hover:border-zinc-700 group-hover:text-zinc-900 dark:group-hover:text-white",
        solid:
          "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-md group-hover:scale-105",
      },
      size: {
        xs: "w-6 h-6 rounded-full text-xs",
        sm: "w-9 h-9 rounded-xl text-sm",
        md: "w-11 h-11 rounded-xl text-base",
        lg: "w-13 h-13 rounded-2xl text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface IconBoxProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof iconBoxVariants> {
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number | string }>;
  showGlow?: boolean;
  classNames?: {
    base?: string;
    glow?: string;
    icon?: string;
  };
}

export const IconBox = React.forwardRef<HTMLDivElement, IconBoxProps>(
  (
    {
      children,
      className,
      classNames,
      variant = "default",
      size = "md",
      icon: Icon,
      showGlow = true,
      ...props
    },
    ref
  ) => {
    const iconSizeClass =
      size === "xs"
        ? "w-3.5 h-3.5"
        : size === "sm"
          ? "w-4 h-4"
          : size === "lg"
            ? "w-6 h-6"
            : "w-5 h-5";

    return (
      <div
        ref={ref}
        className={cn(iconBoxVariants({ variant, size }), classNames?.base, className)}
        {...props}
      >
        {/* Specular backlight glow */}
        {showGlow && (
          <div
            className={cn(
              "bg-brand-500/0 group-hover:bg-brand-500/20 pointer-events-none absolute inset-0 rounded-2xl blur-md transition-all duration-500",
              classNames?.glow
            )}
            aria-hidden="true"
          />
        )}

        {/* Render provided icon or children */}
        {Icon ? (
          <Icon
            className={cn(
              "relative z-10 transition-colors duration-300",
              iconSizeClass,
              classNames?.icon
            )}
            strokeWidth={1.5}
          />
        ) : (
          <span className="relative z-10 flex items-center justify-center">{children}</span>
        )}
      </div>
    );
  }
);

IconBox.displayName = "IconBox";
