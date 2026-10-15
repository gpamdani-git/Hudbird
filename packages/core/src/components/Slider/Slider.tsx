// packages/core/src/components/Slider/Slider.tsx
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

export type SliderColor = "primary" | "success" | "danger" | "warning";
export type SliderSize = "sm" | "md" | "lg";

const trackVariants = cva(
  "relative w-full rounded-full bg-zinc-200 dark:bg-zinc-800 cursor-pointer select-none transition-colors",
  {
    variants: {
      size: {
        sm: "h-1.5",
        md: "h-2.5",
        lg: "h-3.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const rangeVariants = cva("absolute h-full rounded-full transition-all duration-75", {
  variants: {
    color: {
      primary: "bg-primary",
      success: "bg-emerald-600 dark:bg-emerald-500",
      danger: "bg-rose-600 dark:bg-rose-500",
      warning: "bg-amber-500 dark:bg-amber-400",
    },
  },
  defaultVariants: {
    color: "primary",
  },
});

const thumbVariants = cva(
  "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full border-2 border-white bg-white shadow-md transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-110 cursor-grab active:cursor-grabbing dark:border-zinc-900",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
      color: {
        primary: "focus-visible:ring-primary",
        success: "focus-visible:ring-emerald-500",
        danger: "focus-visible:ring-rose-500",
        warning: "focus-visible:ring-amber-500",
      },
    },
    defaultVariants: {
      size: "md",
      color: "primary",
    },
  }
);

export interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  label?: React.ReactNode;
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  color?: SliderColor;
  size?: SliderSize;
  isDisabled?: boolean;
  disabled?: boolean;
  showValue?: boolean;
  formatValue?: (val: number) => string;
  onChange?: (val: number) => void;
  onChangeEnd?: (val: number) => void;
}

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      className,
      label,
      value: propValue,
      defaultValue = 0,
      min = 0,
      max = 100,
      step = 1,
      color = "primary",
      size = "md",
      isDisabled: propIsDisabled,
      disabled = false,
      showValue = false,
      formatValue = (v) => String(v),
      onChange,
      onChangeEnd,
      ...props
    },
    ref
  ) => {
    const isActuallyDisabled = disabled || Boolean(propIsDisabled);

    const [uncontrolledVal, setUncontrolledVal] = React.useState<number>(defaultValue);
    const isControlled = propValue !== undefined;
    const currentVal = isControlled ? propValue : uncontrolledVal;

    // Clamp value
    const clampedVal = Math.min(Math.max(currentVal, min), max);
    const percentage = ((clampedVal - min) / (max - min)) * 100;

    const trackRef = React.useRef<HTMLDivElement | null>(null);

    const updateValue = React.useCallback(
      (newVal: number) => {
        if (isActuallyDisabled) return;
        const steppedVal = Math.round((newVal - min) / step) * step + min;
        const finalVal = Math.min(Math.max(steppedVal, min), max);

        if (!isControlled) {
          setUncontrolledVal(finalVal);
        }
        onChange?.(finalVal);
      },
      [isActuallyDisabled, min, max, step, isControlled, onChange]
    );

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      if (isActuallyDisabled || !trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      const newVal = min + pos * (max - min);
      updateValue(newVal);

      const onPointerMove = (moveEvent: PointerEvent) => {
        const movePos = (moveEvent.clientX - rect.left) / rect.width;
        const moveVal = min + movePos * (max - min);
        updateValue(moveVal);
      };

      const onPointerUp = () => {
        document.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerup", onPointerUp);
        onChangeEnd?.(clampedVal);
      };

      document.addEventListener("pointermove", onPointerMove);
      document.addEventListener("pointerup", onPointerUp);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (isActuallyDisabled) return;
      let next: number;
      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        next = Math.min(clampedVal + step, max);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        next = Math.max(clampedVal - step, min);
      } else if (e.key === "Home") {
        next = min;
      } else if (e.key === "End") {
        next = max;
      } else {
        return;
      }
      e.preventDefault();
      updateValue(next);
      onChangeEnd?.(next);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex w-full flex-col gap-2 select-none",
          isActuallyDisabled && "pointer-events-none cursor-not-allowed opacity-50",
          className
        )}
        {...props}
      >
        {(label || showValue) && (
          <div className="text-foreground flex items-center justify-between text-xs font-semibold">
            {label && <span>{label}</span>}
            {showValue && (
              <span className="text-muted-foreground font-mono">{formatValue(clampedVal)}</span>
            )}
          </div>
        )}

        <div
          ref={trackRef}
          onPointerDown={handlePointerDown}
          className={cn(trackVariants({ size }))}
        >
          {/* Active Range Fill */}
          <div className={cn(rangeVariants({ color }))} style={{ width: `${percentage}%` }} />

          {/* Draggable & Focusable Thumb */}
          <div
            role="slider"
            tabIndex={isActuallyDisabled ? -1 : 0}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={clampedVal}
            aria-disabled={isActuallyDisabled}
            onKeyDown={handleKeyDown}
            className={cn(thumbVariants({ size, color }))}
            style={{ left: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);

Slider.displayName = "Slider";
