// packages/core/src/components/Divider/Divider.tsx
"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

export type DividerOrientation = "horizontal" | "vertical";
export type DividerVariant = "solid" | "dashed";
export type DividerContentPosition = "left" | "center" | "right";

const dividerVariants = cva("shrink-0", {
  variants: {
    orientation: {
      horizontal: "w-full",
      vertical: "h-full min-h-[1.25rem] w-[1px] self-stretch",
    },
    variant: {
      solid: "",
      dashed: "",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    variant: "solid",
  },
});

export interface DividerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dividerVariants> {
  orientation?: DividerOrientation;
  variant?: DividerVariant;
  contentPosition?: DividerContentPosition;
  children?: React.ReactNode;
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      className,
      orientation = "horizontal",
      variant = "solid",
      contentPosition = "center",
      children,
      ...props
    },
    ref
  ) => {
    // If divider has children/content (only applicable in horizontal layout)
    if (children && orientation === "horizontal") {
      const isLeft = contentPosition === "left";
      const isRight = contentPosition === "right";

      const lineStyle =
        variant === "dashed"
          ? "border-b border-dashed border-zinc-200 dark:border-zinc-800"
          : "h-[1px] bg-zinc-200/70 dark:bg-zinc-800/70";

      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="horizontal"
          className={cn("flex items-center w-full my-3 select-none", className)}
          {...props}
        >
          {/* Left line */}
          <div
            className={cn(
              lineStyle,
              isLeft ? "w-8 shrink-0" : isRight ? "flex-1" : "flex-1"
            )}
          />

          {/* Content */}
          <span className="px-3 text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider shrink-0">
            {children}
          </span>

          {/* Right line */}
          <div
            className={cn(
              lineStyle,
              isRight ? "w-8 shrink-0" : isLeft ? "flex-1" : "flex-1"
            )}
          />
        </div>
      );
    }

    // Standard simple divider
    if (orientation === "vertical") {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="vertical"
          className={cn(
            dividerVariants({ orientation, variant }),
            variant === "dashed"
              ? "border-l border-dashed border-zinc-200 dark:border-zinc-800 bg-transparent"
              : "bg-zinc-200/70 dark:bg-zinc-800/70",
            className
          )}
          {...props}
        />
      );
    }

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation="horizontal"
        className={cn(
          dividerVariants({ orientation, variant }),
          variant === "dashed"
            ? "border-b border-dashed border-zinc-200 dark:border-zinc-800 bg-transparent h-0 my-3"
            : "h-[1px] bg-zinc-200/70 dark:bg-zinc-800/70 my-3",
          className
        )}
        {...props}
      />
    );
  }
);

Divider.displayName = "Divider";

export { Divider, dividerVariants };
