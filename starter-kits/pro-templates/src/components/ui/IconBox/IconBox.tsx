// packages/core/src/components/IconBox/IconBox.tsx
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const iconBoxVariants = cva(
  "relative flex items-center justify-center select-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-zinc-100 dark:bg-white/[0.05] border border-zinc-200/90 dark:border-white/[0.08] text-zinc-800 dark:text-zinc-200 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] group-hover:border-brand-500/40 group-hover:bg-brand-500/10 group-hover:text-brand-600 dark:group-hover:text-brand-300",
        brand:
          "bg-brand-500/15 border border-brand-500/30 text-brand-600 dark:text-brand-300 shadow-[inset_0_1px_0_0_rgba(157,88,190,0.2)] group-hover:bg-brand-500/25 group-hover:border-brand-500/50",
        glass:
          "bg-white/40 dark:bg-zinc-900/40 border border-white/60 dark:border-white/[0.1] backdrop-blur-md text-zinc-900 dark:text-white shadow-xs group-hover:border-brand-500/40",
        subtle:
          "bg-transparent border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 group-hover:border-zinc-300 dark:group-hover:border-zinc-700 group-hover:text-zinc-900 dark:group-hover:text-white",
        solid:
          "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-md group-hover:scale-105",
      },
      size: {
        sm: "w-9 h-9 rounded-xl text-sm",
        md: "w-12 h-12 rounded-2xl text-base",
        lg: "w-14 h-14 rounded-2xl text-lg",
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
    const iconSizeClass = size === "sm" ? "w-4 h-4" : size === "lg" ? "w-6 h-6" : "w-5 h-5";

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
