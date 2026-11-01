// packages/core/src/components/Heading/Heading.tsx
"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type HeadingSize = "display" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "inherit";
export type HeadingTracking = "stitch" | "tighter" | "tight" | "normal" | "wide";
export type HeadingColor = "default" | "muted" | "primary" | "stitch" | "brand";

const headingVariants = cva("font-display transition-colors duration-150 leading-tight", {
  variants: {
    size: {
      display: "text-4xl sm:text-5xl lg:text-7xl font-medium tracking-[-1.8px] leading-[1.08]",
      h1: "text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight sm:tracking-[-1px] leading-[1.15]",
      h2: "text-2xl sm:text-3xl font-semibold tracking-[-0.5px] leading-[1.25]",
      h3: "text-xl sm:text-2xl font-semibold tracking-[-0.3px] leading-[1.3]",
      h4: "text-lg font-semibold tracking-tight leading-[1.35]",
      h5: "text-base font-semibold leading-snug",
      h6: "text-sm font-semibold uppercase tracking-wider",
      inherit: "text-inherit font-inherit",
    },
    tracking: {
      stitch: "tracking-[-1.8px]",
      tighter: "tracking-tighter",
      tight: "tracking-tight",
      normal: "tracking-normal",
      wide: "tracking-wide",
    },
    color: {
      default: "text-zinc-950 dark:text-zinc-50",
      muted: "text-zinc-500 dark:text-zinc-400",
      primary: "text-primary",
      stitch: "text-indigo-600 dark:text-indigo-400",
      brand: "text-indigo-600 dark:text-indigo-400",
    },
    withDivider: {
      true: "pb-3.5 border-b border-black/[0.06] dark:border-white/[0.08] mb-4",
      false: "",
    },
  },
  defaultVariants: {
    size: "h1",
    tracking: "tight",
    color: "default",
    withDivider: false,
  },
});

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingVariants> {
  as?: HeadingLevel;
  size?: HeadingSize;
  tracking?: HeadingTracking;
  color?: HeadingColor;
  withDivider?: boolean;
  children: React.ReactNode;
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      as: Component = "h1",
      size,
      tracking,
      color = "default",
      withDivider = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Resolve size default to match the semantic tag if size is omitted
    const resolvedSize = size ?? Component;

    // Automatic default optical tracking based on size
    const defaultTrackingForSize: HeadingTracking =
      resolvedSize === "display"
        ? "stitch"
        : resolvedSize === "h1" || resolvedSize === "h2"
          ? "tight"
          : resolvedSize === "h3" || resolvedSize === "h4"
            ? "tight"
            : "normal";

    const resolvedTracking = tracking ?? defaultTrackingForSize;

    return (
      <Component
        ref={ref}
        className={cn(
          headingVariants({
            size: resolvedSize,
            tracking: resolvedTracking,
            color,
            withDivider,
          }),
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Heading.displayName = "Heading";

export { Heading, headingVariants };
