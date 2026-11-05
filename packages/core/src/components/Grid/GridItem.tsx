// packages/core/src/components/Grid/GridItem.tsx
"use client";
import * as React from "react";
import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import { cn } from "../../utils/cn";

export type GridColSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "full";
export type GridRowSpan = 1 | 2 | 3 | 4 | 5 | 6 | "full";

const colSpanClasses: Record<GridColSpan, string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  7: "col-span-7",
  8: "col-span-8",
  9: "col-span-9",
  10: "col-span-10",
  11: "col-span-11",
  12: "col-span-12",
  full: "col-span-full",
};

const rowSpanClasses: Record<GridRowSpan, string> = {
  1: "row-span-1",
  2: "row-span-2",
  3: "row-span-3",
  4: "row-span-4",
  5: "row-span-5",
  6: "row-span-6",
  full: "row-span-full",
};

const colStartClasses: Record<number, string> = {
  1: "col-start-1",
  2: "col-start-2",
  3: "col-start-3",
  4: "col-start-4",
  5: "col-start-5",
  6: "col-start-6",
  7: "col-start-7",
  8: "col-start-8",
  9: "col-start-9",
  10: "col-start-10",
  11: "col-start-11",
  12: "col-start-12",
};

export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The underlying HTML element tag to render when not animated.
   * @default "div"
   */
  as?: React.ElementType;
  /**
   * Number of grid columns the item should span.
   */
  colSpan?: GridColSpan;
  /**
   * Number of grid rows the item should span.
   */
  rowSpan?: GridRowSpan;
  /**
   * Grid column starting position index.
   */
  colStart?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  /**
   * Whether to animate using Google Stitch staggered waterfall physics.
   * @default false
   */
  animate?: boolean;
}

export const gridItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      mass: 1,
    },
  },
};

const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  (
    {
      as: Component = "div",
      colSpan,
      rowSpan,
      colStart,
      animate = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const combinedClassName = cn(
      colSpan && colSpanClasses[colSpan],
      rowSpan && rowSpanClasses[rowSpan],
      colStart && colStartClasses[colStart],
      className
    );

    if (animate) {
      return (
        <motion.div
          ref={ref}
          variants={gridItemVariants}
          className={combinedClassName}
          {...(props as HTMLMotionProps<"div">)}
        >
          {children}
        </motion.div>
      );
    }

    return React.createElement(
      Component,
      { ref, className: combinedClassName, ...props },
      children
    );
  }
);

GridItem.displayName = "GridItem";

export { GridItem };
