// packages/core/src/components/Heading/Heading.tsx
"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type HeadingSize = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "inherit";
export type HeadingTracking = "tighter" | "tight" | "normal" | "wide";
export type HeadingColor = "default" | "muted" | "primary";

const headingVariants = cva("font-display transition-colors duration-150 leading-tight", {
  variants: {
    size: {
      h1: "text-4xl font-extrabold md:text-5xl",
      h2: "text-3xl font-bold",
      h3: "text-2xl font-bold",
      h4: "text-xl font-semibold",
      h5: "text-lg font-semibold",
      h6: "text-base font-medium",
      inherit: "text-inherit font-inherit",
    },
    tracking: {
      tighter: "tracking-tighter",
      tight: "tracking-tight",
      normal: "tracking-normal",
      wide: "tracking-wide",
    },
    color: {
      default: "text-zinc-900 dark:text-zinc-50",
      muted: "text-zinc-500 dark:text-zinc-400",
      primary: "text-indigo-600 dark:text-indigo-400",
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
      resolvedSize === "h1" || resolvedSize === "h2"
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
