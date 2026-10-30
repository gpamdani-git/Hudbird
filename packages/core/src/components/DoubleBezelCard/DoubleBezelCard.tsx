// packages/core/src/components/DoubleBezelCard/DoubleBezelCard.tsx
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

export const cornerCrosshairPositions = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
] as const;

export type CornerCrosshairPosition = (typeof cornerCrosshairPositions)[number];

export interface CornerCrosshairProps extends React.SVGAttributes<SVGSVGElement> {
  position?: CornerCrosshairPosition;
}

export function CornerCrosshair({
  position = "top-left",
  className,
  ...props
}: CornerCrosshairProps) {
  const posClasses: Record<CornerCrosshairPosition, string> = {
    "top-left": "-top-1.5 -left-1.5",
    "top-right": "-top-1.5 -right-1.5",
    "bottom-left": "-bottom-1.5 -left-1.5",
    "bottom-right": "-bottom-1.5 -right-1.5",
  };

  return (
    <svg
      className={cn(
        "pointer-events-none absolute z-20 h-3 w-3 text-zinc-400/80 select-none dark:text-zinc-600",
        posClasses[position],
        className
      )}
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      {...props}
    >
      <path d="M6 1v10M1 6h10" strokeLinecap="round" />
    </svg>
  );
}

const outerChassisVariants = cva(
  "group relative rounded-[28px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] box-border",
  {
    variants: {
      variant: {
        default:
          "p-1.5 sm:p-2 bg-zinc-200/55 dark:bg-[#161618] border border-zinc-300/70 dark:border-[#2E2F33] backdrop-blur-md hover:border-brand-500/40 dark:hover:border-indigo-500/40",
        glass:
          "p-2 bg-white/40 dark:bg-[#161618]/70 border border-white/60 dark:border-[#2E2F33] backdrop-blur-xl shadow-lg hover:shadow-glow",
        solid:
          "p-1.5 sm:p-2 bg-zinc-100 dark:bg-[#161618] border border-zinc-300/90 dark:border-[#2E2F33]",
        highlight:
          "p-2 bg-gradient-to-b from-indigo-500/20 via-indigo-500/5 to-transparent border border-indigo-500/30 shadow-glow",
      },
      isHoverable: {
        true: "hover:-translate-y-1 hover:shadow-xl cursor-pointer",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      isHoverable: false,
    },
  }
);

const innerCoreVariants = cva(
  "relative rounded-[22px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden",
  {
    variants: {
      padding: {
        none: "p-0",
        sm: "p-4 sm:p-5",
        md: "p-6 sm:p-8",
        lg: "p-8 sm:p-10",
      },
      variant: {
        default:
          "bg-white dark:bg-[#202124] border border-zinc-200/90 dark:border-[#2E2F33] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] text-zinc-900 dark:text-[#E5E5E5]",
        glass:
          "bg-white/80 dark:bg-[#202124]/90 backdrop-blur-md border border-white/40 dark:border-[#2E2F33] shadow-sm text-zinc-900 dark:text-[#E5E5E5]",
        solid:
          "bg-white dark:bg-[#202124] border border-zinc-200 dark:border-[#2E2F33] text-zinc-900 dark:text-[#E5E5E5]",
        highlight:
          "bg-white dark:bg-[#202124] border border-indigo-500/30 shadow-[inset_0_1px_0_0_rgba(99,102,241,0.15)] text-zinc-900 dark:text-[#E5E5E5]",
      },
    },
    defaultVariants: {
      padding: "md",
      variant: "default",
    },
  }
);

export interface DoubleBezelCardProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof outerChassisVariants> {
  padding?: VariantProps<typeof innerCoreVariants>["padding"];
  showCrosshairs?: boolean | CornerCrosshairPosition[];
  classNames?: {
    chassis?: string;
    core?: string;
    glow?: string;
  };
}

export const DoubleBezelCard = React.forwardRef<HTMLDivElement, DoubleBezelCardProps>(
  (
    {
      children,
      className,
      classNames,
      variant = "default",
      padding = "md",
      isHoverable = false,
      showCrosshairs = false,
      ...props
    },
    ref
  ) => {
    const activeCrosshairs: CornerCrosshairPosition[] = React.useMemo(() => {
      if (showCrosshairs === true) {
        return ["top-left", "top-right", "bottom-left", "bottom-right"];
      }
      if (Array.isArray(showCrosshairs)) {
        return showCrosshairs;
      }
      return [];
    }, [showCrosshairs]);

    return (
      <div
        ref={ref}
        className={cn(
          outerChassisVariants({ variant, isHoverable }),
          classNames?.chassis,
          className
        )}
        {...props}
      >
        {/* Architectural Crosshairs */}
        {activeCrosshairs.map((pos) => (
          <CornerCrosshair key={pos} position={pos} />
        ))}

        {/* Inner Core */}
        <div className={cn(innerCoreVariants({ padding, variant }), classNames?.core)}>
          {children}
        </div>
      </div>
    );
  }
);

DoubleBezelCard.displayName = "DoubleBezelCard";
