// packages/core/src/components/Section/Section.tsx
"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

export type SectionSpacing = "none" | "xs" | "sm" | "md" | "lg" | "xl";
export type SectionVariant = "default" | "muted" | "card" | "inverted" | "obsidian";
export type SectionBordered = boolean | "top" | "bottom" | "both";

const sectionVariants = cva("relative w-full transition-colors duration-200", {
  variants: {
    spacing: {
      none: "py-0",
      xs: "py-6 sm:py-8",
      sm: "py-8 sm:py-12",
      md: "py-12 sm:py-16 lg:py-20",
      lg: "py-16 sm:py-24 lg:py-32",
      xl: "py-20 sm:py-32 lg:py-40",
    },
    variant: {
      default: "bg-transparent text-foreground",
      muted: "bg-zinc-50/80 text-foreground dark:bg-[#1a1b1e]/80",
      card: "bg-card text-card-foreground border-y border-border",
      inverted: "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950",
      obsidian: "bg-[#161618] text-white",
    },
  },
  defaultVariants: {
    spacing: "md",
    variant: "default",
  },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof sectionVariants> {
  /**
   * The underlying HTML element tag to render for semantic structure.
   * @default "section"
   */
  as?: React.ElementType;
  /**
   * Enables Apple/Mobile-safe full viewport height using 100dvh without jumpy layout.
   * @default false
   */
  fullHeight?: boolean;
  /**
   * Hairline specular border placement conforming to the 8-point spatial rhythm.
   * @default false
   */
  bordered?: SectionBordered;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      as: Component = "section",
      spacing = "md",
      variant = "default",
      fullHeight = false,
      bordered = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const borderClass =
      bordered === true || bordered === "both"
        ? "border-y border-border"
        : bordered === "top"
          ? "border-t border-border"
          : bordered === "bottom"
            ? "border-b border-border"
            : undefined;

    return (
      <Component
        ref={ref as any}
        className={cn(
          sectionVariants({ spacing, variant }),
          borderClass,
          fullHeight && "flex min-h-[100dvh] flex-col justify-center",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Section.displayName = "Section";

export { Section, sectionVariants };
