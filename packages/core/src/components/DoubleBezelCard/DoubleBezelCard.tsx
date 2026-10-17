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
          "p-1.5 sm:p-2 bg-zinc-200/55 dark:bg-white/[0.03] border border-zinc-300/70 dark:border-white/[0.07] backdrop-blur-md hover:border-brand-500/40 dark:hover:border-brand-400/30",
        glass:
          "p-2 bg-white/40 dark:bg-zinc-900/40 border border-white/60 dark:border-white/[0.1] backdrop-blur-xl shadow-lg hover:shadow-glow",
        solid:
          "p-1.5 sm:p-2 bg-zinc-100 dark:bg-[#121216] border border-zinc-300/90 dark:border-zinc-800",
        highlight:
          "p-2 bg-gradient-to-b from-brand-500/20 via-brand-500/5 to-transparent border border-brand-500/30 dark:border-brand-400/30 shadow-glow",
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
          "bg-white dark:bg-[#111115] border border-zinc-200/90 dark:border-white/[0.06] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] text-zinc-900 dark:text-zinc-100",
        glass:
          "bg-white/80 dark:bg-[#121217]/80 backdrop-blur-md border border-white/40 dark:border-white/[0.06] shadow-sm text-zinc-900 dark:text-zinc-100",
        solid:
          "bg-white dark:bg-[#16161c] border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100",
        highlight:
          "bg-white dark:bg-[#13121a] border border-brand-200/60 dark:border-brand-900/50 shadow-[inset_0_1px_0_0_rgba(157,88,190,0.15)] text-zinc-900 dark:text-zinc-100",
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
