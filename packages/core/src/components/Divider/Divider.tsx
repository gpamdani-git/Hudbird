// packages/core/src/components/Divider/Divider.tsx
"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

export type DividerOrientation = "horizontal" | "vertical";
export type DividerVariant = "solid" | "dashed" | "dotted" | "gradient";
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
      dotted: "",
      gradient: "",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    variant: "solid",
  },
});

export interface DividerProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof dividerVariants> {
  orientation?: DividerOrientation;
  variant?: DividerVariant;
  contentPosition?: DividerContentPosition;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      className,
      orientation = "horizontal",
      variant = "solid",
      contentPosition = "center",
      icon,
      children,
      ...props
    },
    ref
  ) => {
    const hasContent = Boolean(children || icon);

    // If divider has children/content (only applicable in horizontal layout)
    if (hasContent && orientation === "horizontal") {
      const isLeft = contentPosition === "left";
      const isRight = contentPosition === "right";

      const getLineStyle = (side: "left" | "right") => {
        switch (variant) {
          case "dashed":
            return "border-b border-dashed border-zinc-200 dark:border-white/[0.08]";
          case "dotted":
            return "border-b border-dotted border-zinc-300 dark:border-white/[0.15]";
          case "gradient":
            return side === "left"
              ? "h-[1px] bg-gradient-to-r from-transparent to-zinc-300 dark:to-white/20"
              : "h-[1px] bg-gradient-to-r from-zinc-300 dark:from-white/20 to-transparent";
          case "solid":
          default:
            return "h-[1px] bg-zinc-200/80 dark:bg-white/[0.08]";
        }
      };

      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="horizontal"
          className={cn("my-3 flex w-full items-center select-none", className)}
          {...props}
        >
          {/* Left line */}
          <div
            className={cn(
              getLineStyle("left"),
              isLeft ? "w-8 shrink-0" : isRight ? "flex-1" : "flex-1"
            )}
          />

          {/* Content */}
          <span className="inline-flex shrink-0 items-center gap-2 px-3 text-xs font-medium tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
            {icon && (
              <span className="inline-flex shrink-0 items-center justify-center">{icon}</span>
            )}
            {children}
          </span>

          {/* Right line */}
          <div
            className={cn(
              getLineStyle("right"),
              isRight ? "w-8 shrink-0" : isLeft ? "flex-1" : "flex-1"
            )}
          />
        </div>
      );
    }

    // Standard simple divider
    if (orientation === "vertical") {
      const verticalVariantClasses = () => {
        switch (variant) {
          case "dashed":
            return "border-l border-dashed border-zinc-200 bg-transparent dark:border-white/[0.08]";
          case "dotted":
            return "border-l border-dotted border-zinc-300 bg-transparent dark:border-white/[0.15]";
          case "gradient":
            return "bg-gradient-to-b from-transparent via-zinc-300 dark:via-white/20 to-transparent";
          case "solid":
          default:
            return "bg-zinc-200/80 dark:bg-white/[0.08]";
        }
      };

      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="vertical"
          className={cn(
            dividerVariants({ orientation, variant }),
            verticalVariantClasses(),
            className
          )}
          {...props}
        />
      );
    }

    const horizontalVariantClasses = () => {
      switch (variant) {
        case "dashed":
          return "my-3 h-0 border-b border-dashed border-zinc-200 bg-transparent dark:border-white/[0.08] [[data-glass-mode=glass][data-hb-theme=dark]_&]:border-white/20";
        case "dotted":
          return "my-3 h-0 border-b border-dotted border-zinc-300 bg-transparent dark:border-white/[0.15] [[data-glass-mode=glass][data-hb-theme=dark]_&]:border-white/25";
        case "gradient":
          return "my-3 h-[1px] bg-gradient-to-r from-transparent via-zinc-300 dark:via-white/20 [[data-glass-mode=glass][data-hb-theme=dark]_&]:via-white/30 to-transparent";
        case "solid":
        default:
          return "my-3 h-[1px] bg-zinc-200/80 dark:bg-white/[0.08] [[data-glass-mode=glass][data-hb-theme=dark]_&]:bg-white/18";
      }
    };

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation="horizontal"
        className={cn(
          dividerVariants({ orientation, variant }),
          horizontalVariantClasses(),
          className
        )}
        {...props}
      />
    );
  }
);

Divider.displayName = "Divider";

export { Divider, dividerVariants };
