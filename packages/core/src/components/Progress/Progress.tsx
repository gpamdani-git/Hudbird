// packages/core/src/components/Progress/Progress.tsx
"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

export type ProgressColor = "primary" | "secondary" | "success" | "warning" | "danger" | "default";
export type ProgressSize = "sm" | "md" | "lg";
export type ProgressRadius = "none" | "sm" | "md" | "lg" | "full";

export const progressTrackVariants = cva(
  "w-full bg-zinc-200/75 dark:bg-[#202124] [[data-glass-mode=glass][data-hb-theme=dark]_&]:bg-white/24 shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)] [[data-glass-mode=glass][data-hb-theme=dark]_&]:shadow-none border border-black/[0.06] dark:border-white/[0.08] [[data-glass-mode=glass][data-hb-theme=dark]_&]:border-white/20 overflow-hidden relative",
  {
    variants: {
      size: {
        sm: "h-1.5",
        md: "h-2.5",
        lg: "h-4",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      size: "md",
      radius: "full",
    },
  }
);

export const progressIndicatorVariants = cva(
  "h-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
  {
    variants: {
      color: {
        default:
          "bg-zinc-800 dark:bg-zinc-200 [[data-glass-mode=glass][data-hb-theme=dark]_&]:bg-white",
        primary:
          "bg-indigo-600 dark:bg-indigo-400 [[data-glass-mode=glass][data-hb-theme=dark]_&]:bg-indigo-400",
        secondary:
          "bg-purple-600 dark:bg-purple-400 [[data-glass-mode=glass][data-hb-theme=dark]_&]:bg-purple-400",
        success:
          "bg-emerald-600 dark:bg-emerald-400 [[data-glass-mode=glass][data-hb-theme=dark]_&]:bg-emerald-400",
        warning:
          "bg-amber-500 dark:bg-amber-400 [[data-glass-mode=glass][data-hb-theme=dark]_&]:bg-amber-300",
        danger:
          "bg-rose-600 dark:bg-rose-400 [[data-glass-mode=glass][data-hb-theme=dark]_&]:bg-rose-400",
      },
      isStriped: {
        true: "bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem]",
        false: "",
      },
      isIndeterminate: {
        true: "w-full origin-left animate-[progress-indeterminate_1.5s_infinite_linear]",
        false: "",
      },
    },
    defaultVariants: {
      color: "primary",
      isStriped: false,
      isIndeterminate: false,
    },
  }
);

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof progressTrackVariants> {
  value?: number;
  minValue?: number;
  maxValue?: number;
  label?: React.ReactNode;
  showValueLabel?: boolean;
  valueLabel?: React.ReactNode;
  color?: ProgressColor;
  isStriped?: boolean;
  isIndeterminate?: boolean;
  classNames?: {
    base?: string;
    track?: string;
    indicator?: string;
    label?: string;
    value?: string;
  };
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value = 0,
      minValue = 0,
      maxValue = 100,
      size = "md",
      radius = "full",
      color = "primary",
      isStriped = false,
      isIndeterminate = false,
      label,
      showValueLabel = false,
      valueLabel,
      className,
      classNames,
      ...props
    },
    ref
  ) => {
    const percentage = isIndeterminate
      ? 0
      : Math.min(100, Math.max(0, ((value - minValue) / (maxValue - minValue)) * 100));

    const formattedValue = valueLabel ?? `${Math.round(percentage)}%`;

    return (
      <div
        ref={ref}
        className={cn("flex w-full flex-col gap-1.5", classNames?.base, className)}
        role="progressbar"
        aria-valuenow={isIndeterminate ? undefined : value}
        aria-valuemin={minValue}
        aria-valuemax={maxValue}
        aria-valuetext={isIndeterminate ? "Loading..." : String(formattedValue)}
        {...props}
      >
        {(label || showValueLabel) && (
          <div className="flex items-center justify-between text-xs">
            {label && (
              <span
                className={cn(
                  "font-medium text-zinc-800 dark:text-zinc-100 [[data-glass-mode=glass][data-hb-theme=dark]_&]:text-white",
                  classNames?.label
                )}
              >
                {label}
              </span>
            )}
            {showValueLabel && (
              <span
                className={cn(
                  "font-mono font-medium text-zinc-700 dark:text-zinc-200 [[data-glass-mode=glass][data-hb-theme=dark]_&]:text-slate-100",
                  classNames?.value
                )}
              >
                {formattedValue}
              </span>
            )}
          </div>
        )}

        <div className={cn(progressTrackVariants({ size, radius }), classNames?.track)}>
          <div
            className={cn(
              progressIndicatorVariants({ color, isStriped, isIndeterminate }),
              classNames?.indicator
            )}
            style={{ width: isIndeterminate ? "100%" : `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);
Progress.displayName = "Progress";

/* -------------------------------------------------------------------------------------------------
 * CircularProgress
 * -----------------------------------------------------------------------------------------------*/

export interface CircularProgressProps extends Omit<React.SVGProps<SVGSVGElement>, "color"> {
  value?: number;
  minValue?: number;
  maxValue?: number;
  size?: "sm" | "md" | "lg";
  color?: ProgressColor;
  isIndeterminate?: boolean;
  showValueLabel?: boolean;
  valueLabel?: React.ReactNode;
  strokeWidth?: number;
}

const circleSizeMap = {
  sm: 32,
  md: 48,
  lg: 64,
};

const circleStrokeMap = {
  sm: 3,
  md: 4,
  lg: 6,
};

const circleColorClasses: Record<ProgressColor, string> = {
  default:
    "stroke-zinc-800 dark:stroke-zinc-200 [[data-glass-mode=glass][data-hb-theme=dark]_&]:stroke-white",
  primary:
    "stroke-indigo-600 dark:stroke-indigo-400 [[data-glass-mode=glass][data-hb-theme=dark]_&]:stroke-indigo-400",
  secondary:
    "stroke-purple-600 dark:stroke-purple-400 [[data-glass-mode=glass][data-hb-theme=dark]_&]:stroke-purple-400",
  success:
    "stroke-emerald-600 dark:stroke-emerald-400 [[data-glass-mode=glass][data-hb-theme=dark]_&]:stroke-emerald-400",
  warning:
    "stroke-amber-500 dark:stroke-amber-400 [[data-glass-mode=glass][data-hb-theme=dark]_&]:stroke-amber-300",
  danger:
    "stroke-rose-600 dark:stroke-rose-400 [[data-glass-mode=glass][data-hb-theme=dark]_&]:stroke-rose-400",
};

export const CircularProgress = React.forwardRef<SVGSVGElement, CircularProgressProps>(
  (
    {
      value = 0,
      minValue = 0,
      maxValue = 100,
      size = "md",
      color = "primary",
      isIndeterminate = false,
      showValueLabel = false,
      valueLabel,
      strokeWidth: propStrokeWidth,
      className,
      ...props
    },
    ref
  ) => {
    const dimension = circleSizeMap[size];
    const strokeWidth = propStrokeWidth ?? circleStrokeMap[size];
    const radius = (dimension - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    const percentage = isIndeterminate
      ? 0
      : Math.min(100, Math.max(0, ((value - minValue) / (maxValue - minValue)) * 100));

    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    const formattedValue = valueLabel ?? `${Math.round(percentage)}%`;

    return (
      <div
        className={cn("relative inline-flex items-center justify-center", className)}
        role="progressbar"
        aria-valuenow={isIndeterminate ? undefined : value}
        aria-valuemin={minValue}
        aria-valuemax={maxValue}
      >
        <svg
          ref={ref}
          width={dimension}
          height={dimension}
          viewBox={`0 0 ${dimension} ${dimension}`}
          className={cn("-rotate-90 transform", isIndeterminate && "animate-spin")}
          {...props}
        >
          {/* Background track */}
          <circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            fill="transparent"
            strokeWidth={strokeWidth}
            className="stroke-zinc-200/75 dark:stroke-[#202124] [[data-glass-mode=glass][data-hb-theme=dark]_&]:stroke-white/25"
          />
          {/* Active indicator */}
          <circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={isIndeterminate ? circumference * 0.75 : strokeDashoffset}
            strokeLinecap="round"
            className={cn("transition-all duration-300 ease-out", circleColorClasses[color])}
          />
        </svg>

        {showValueLabel && !isIndeterminate && (
          <span className="absolute font-mono text-xs font-semibold text-zinc-800 dark:text-zinc-100 [[data-glass-mode=glass][data-hb-theme=dark]_&]:text-white">
            {formattedValue}
          </span>
        )}
      </div>
    );
  }
);
CircularProgress.displayName = "CircularProgress";
