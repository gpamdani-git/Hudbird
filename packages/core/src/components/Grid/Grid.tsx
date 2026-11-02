// packages/core/src/components/Grid/Grid.tsx
"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import { cn } from "../../utils/cn";

export type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 12 | "auto-fit" | "auto-fill";
export type GridLayout = "default" | "bento-2-1" | "bento-1-2" | "bento-split";
export type GridGap = "none" | "xs" | "sm" | "md" | "lg" | "xl";
export type GridAlign = "start" | "center" | "end" | "stretch";

const gridVariants = cva("grid w-full", {
  variants: {
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5",
      6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
      12: "grid-cols-12",
      "auto-fit": "grid-cols-[repeat(auto-fit,minmax(280px,1fr))]",
      "auto-fill": "grid-cols-[repeat(auto-fill,minmax(280px,1fr))]",
    },
    layout: {
      default: "",
      "bento-2-1": "grid-cols-1 lg:grid-cols-3 [&>*:nth-child(1)]:lg:col-span-2",
      "bento-1-2": "grid-cols-1 lg:grid-cols-3 [&>*:nth-child(2)]:lg:col-span-2",
      "bento-split":
        "grid-cols-1 lg:grid-cols-12 [&>*:nth-child(1)]:lg:col-span-7 [&>*:nth-child(2)]:lg:col-span-5",
    },
    gap: {
      none: "gap-0",
      xs: "gap-2",
      sm: "gap-3 sm:gap-4",
      md: "gap-4 sm:gap-6 lg:gap-8",
      lg: "gap-6 sm:gap-8 lg:gap-10",
      xl: "gap-8 sm:gap-12 lg:gap-16",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    },
  },
  defaultVariants: {
    cols: 1,
    layout: "default",
    gap: "md",
    align: "stretch",
  },
});

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof gridVariants> {
  /**
   * The underlying HTML element tag to render when not animated.
   * @default "div"
   */
  as?: React.ElementType;
  /**
   * Enables Google Stitch staggered waterfall entrance animation.
   * @default false
   */
  animate?: boolean;
  /**
   * Delay between each child element in seconds.
   * @default 0.06
   */
  staggerDelay?: number;
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      as: Component = "div",
      cols,
      layout = "default",
      gap = "md",
      align = "stretch",
      animate = false,
      staggerDelay = 0.06,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // If an asymmetric layout is provided, ignore uniform cols
    const resolvedCols = layout !== "default" ? undefined : (cols ?? 1);

    const gridClassName = cn(
      gridVariants({
        cols: resolvedCols,
        layout,
        gap,
        align,
      }),
      className
    );

    if (animate) {
      const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.05,
          },
        },
      };

      return (
        <motion.div
          ref={ref}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={containerVariants}
          className={gridClassName}
          {...(props as HTMLMotionProps<"div">)}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <Component ref={ref as any} className={gridClassName} {...props}>
        {children}
      </Component>
    );
  }
);

Grid.displayName = "Grid";

export { Grid, gridVariants };
