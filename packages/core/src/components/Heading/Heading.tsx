// packages/core/src/components/Heading/Heading.tsx
"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type HeadingSize = "display" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "inherit";
export type HeadingTracking = "stitch" | "tighter" | "tight" | "normal" | "wide";
export type HeadingColor = "default" | "muted" | "primary" | "stitch";

const headingVariants = cva("font-display transition-colors duration-150 leading-tight", {
  variants: {
    size: {
      display: "text-4xl sm:text-5xl lg:text-7xl font-medium tracking-[-1.8px] leading-[1.15]",
      h1: "text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.2]",
      h2: "text-2xl sm:text-3xl font-semibold tracking-[-0.3px] leading-[1.33]",
      h3: "text-xl sm:text-2xl font-medium tracking-[-0.3px] leading-[1.4]",
      h4: "text-lg font-semibold",
      h5: "text-base font-semibold",
      h6: "text-sm font-medium",
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
      default: "text-zinc-900 dark:text-white",
      muted: "text-zinc-500 dark:text-[#828282]",
      primary: "text-primary",
      stitch: "text-pink-600 dark:text-[#FFB1EE]",
    },
    withDivider: {
      true: "pb-3 border-b border-zinc-200/80 dark:border-zinc-800/80 mb-4",
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
