// packages/core/src/components/Tooltip/Tooltip.tsx
"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";
export type TooltipColor =
  "default" | "foreground" | "primary" | "secondary" | "success" | "warning" | "danger";
export type TooltipSize = "sm" | "md" | "lg";
export type TooltipRadius = "none" | "sm" | "md" | "lg" | "full";

export const tooltipVariants = cva(
  "z-50 px-3 py-1.5 font-medium leading-tight shadow-md select-none pointer-events-none transition-all duration-150 ease-out whitespace-nowrap",
  {
    variants: {
      color: {
        default:
          "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 border border-zinc-800 dark:border-zinc-200",
        foreground:
          "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 border border-zinc-900 dark:border-zinc-100",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-purple-600 text-white dark:bg-purple-500",
        success: "bg-emerald-600 text-white dark:bg-blue-500",
        warning: "bg-blue-500 text-zinc-950 dark:bg-amber-400",
        danger: "bg-rose-600 text-white dark:bg-blue-500",
      },
      size: {
        sm: "text-[11px] px-2 py-0.5 min-h-6",
        md: "text-xs px-2.5 py-1 min-h-7",
        lg: "text-sm px-3.5 py-1.5 min-h-8",
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
      color: "default",
      size: "md",
      radius: "md",
    },
  }
);

// Matching arrow styles for each color
const arrowColorStyles: Record<TooltipColor, string> = {
  default: "bg-zinc-900 dark:bg-zinc-100 border-zinc-800 dark:border-zinc-200",
  foreground: "bg-zinc-950 dark:bg-white border-zinc-900 dark:border-zinc-100",
  primary: "bg-primary",
  secondary: "bg-purple-600 dark:bg-purple-500",
  success: "bg-emerald-600 dark:bg-blue-500",
  warning: "bg-blue-500 dark:bg-amber-400",
  danger: "bg-rose-600 dark:bg-blue-500",
};

export interface TooltipProps extends VariantProps<typeof tooltipVariants> {
  content: React.ReactNode;
  children: React.ReactElement;
  placement?: TooltipPlacement;
  delay?: number;
  closeDelay?: number;
  offset?: number;
  showArrow?: boolean;
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  isDisabled?: boolean;
  className?: string;
  classNames?: {
    base?: string;
    content?: string;
    arrow?: string;
  };
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = "top",
  color = "default",
  size = "md",
  radius = "md",
  delay = 150,
  closeDelay = 100,
  offset = 8,
  showArrow = true,
  isOpen: propIsOpen,
  defaultOpen = false,
  onOpenChange,
  isDisabled = false,
  className,
  classNames,
}) => {
  const tooltipId = React.useId();
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const openTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const isControlled = propIsOpen !== undefined;
  const isVisible = isControlled ? propIsOpen : uncontrolledOpen;

  const clearTimers = React.useCallback(() => {
    if (openTimerRef.current) clearTimeout(openTimerRef.current);
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  }, []);

  const handleOpen = React.useCallback(() => {
    if (isDisabled) return;
    clearTimers();
    if (delay === 0) {
      if (!isControlled) setUncontrolledOpen(true);
      onOpenChange?.(true);
    } else {
      openTimerRef.current = setTimeout(() => {
        if (!isControlled) setUncontrolledOpen(true);
        onOpenChange?.(true);
      }, delay);
    }
  }, [isDisabled, clearTimers, delay, isControlled, onOpenChange]);

  const handleClose = React.useCallback(() => {
    clearTimers();
    if (closeDelay === 0) {
      if (!isControlled) setUncontrolledOpen(false);
      onOpenChange?.(false);
    } else {
      closeTimerRef.current = setTimeout(() => {
        if (!isControlled) setUncontrolledOpen(false);
        onOpenChange?.(false);
      }, closeDelay);
    }
  }, [clearTimers, closeDelay, isControlled, onOpenChange]);

  React.useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  // Position offsets and arrow coordinates
  const positionClasses = React.useMemo(() => {
    switch (placement) {
      case "top":
        return "bottom-full left-1/2 -translate-x-1/2 mb-2 origin-bottom";
      case "bottom":
        return "top-full left-1/2 -translate-x-1/2 mt-2 origin-top";
      case "left":
        return "right-full top-1/2 -translate-y-1/2 mr-2 origin-right";
      case "right":
        return "left-full top-1/2 -translate-y-1/2 ml-2 origin-left";
      default:
        return "bottom-full left-1/2 -translate-x-1/2 mb-2 origin-bottom";
    }
  }, [placement]);

  const arrowClasses = React.useMemo(() => {
    switch (placement) {
      case "top":
        return "bottom-[-4px] left-1/2 -translate-x-1/2 border-b border-r rotate-45";
      case "bottom":
        return "top-[-4px] left-1/2 -translate-x-1/2 border-t border-l rotate-45";
      case "left":
        return "right-[-4px] top-1/2 -translate-y-1/2 border-t border-r rotate-45";
      case "right":
        return "left-[-4px] top-1/2 -translate-y-1/2 border-b border-l rotate-45";
      default:
        return "bottom-[-4px] left-1/2 -translate-x-1/2 border-b border-r rotate-45";
    }
  }, [placement]);

  if (!React.isValidElement(children)) {
    return children;
  }

  const childElement = children as React.ReactElement<any>;
  const childProps = childElement.props || {};

  // Clone child with interactive event triggers and accessible ARIA attributes
  const trigger = React.cloneElement(childElement, {
    "aria-describedby": isVisible && !isDisabled ? tooltipId : undefined,
    onMouseEnter: (e: React.MouseEvent) => {
      childProps.onMouseEnter?.(e);
      handleOpen();
    },
    onMouseLeave: (e: React.MouseEvent) => {
      childProps.onMouseLeave?.(e);
      handleClose();
    },
    onFocus: (e: React.FocusEvent) => {
      childProps.onFocus?.(e);
      handleOpen();
    },
    onBlur: (e: React.FocusEvent) => {
      childProps.onBlur?.(e);
      handleClose();
    },
    onKeyDown: (e: React.KeyboardEvent) => {
      childProps.onKeyDown?.(e);
      if (e.key === "Escape") {
        handleClose();
      }
    },
  });

  return (
    <div className={cn("relative inline-flex items-center", classNames?.base)}>
      {trigger}

      {isVisible && !isDisabled && (
        <div
          id={tooltipId}
          role="tooltip"
          className={cn(
            "animate-in fade-in-0 zoom-in-95 absolute duration-150",
            positionClasses,
            tooltipVariants({ color, size, radius }),
            classNames?.content,
            className
          )}
          style={{
            // Adjust margin based on custom offset if needed
            ...(placement === "top" && { marginBottom: `${offset}px` }),
            ...(placement === "bottom" && { marginTop: `${offset}px` }),
            ...(placement === "left" && { marginRight: `${offset}px` }),
            ...(placement === "right" && { marginLeft: `${offset}px` }),
          }}
        >
          {content}
          {showArrow && (
            <span
              aria-hidden="true"
              className={cn(
                "absolute h-2 w-2",
                arrowClasses,
                arrowColorStyles[color || "default"],
                classNames?.arrow
              )}
            />
          )}
        </div>
      )}
    </div>
  );
};

Tooltip.displayName = "Tooltip";
