// packages/core/src/components/Alert/Alert.tsx
"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "../../utils/cn";

export type AlertVariant = "solid" | "flat" | "bordered";
export type AlertColor = "primary" | "success" | "danger" | "warning";

const alertVariants = cva(
  "relative flex w-full items-start gap-3.5 p-4 rounded-2xl text-sm transition-all duration-200",
  {
    variants: {
      variant: {
        solid: "shadow-xs text-white",
        flat: "shadow-none",
        bordered: "border-2 bg-transparent",
      },
      color: {
        primary: "",
        success: "",
        danger: "",
        warning: "",
      },
    },
    compoundVariants: [
      // Solid Variants
      {
        variant: "solid",
        color: "primary",
        className: "bg-indigo-600 text-white shadow-indigo-500/20",
      },
      {
        variant: "solid",
        color: "success",
        className: "bg-emerald-600 text-white shadow-emerald-500/20",
      },
      {
        variant: "solid",
        color: "danger",
        className: "bg-rose-600 text-white shadow-rose-500/20",
      },
      {
        variant: "solid",
        color: "warning",
        className: "bg-amber-500 text-zinc-950 font-medium shadow-amber-500/20",
      },

      // Flat Variants
      {
        variant: "flat",
        color: "primary",
        className:
          "bg-indigo-500/10 text-indigo-950 border border-indigo-500/20 dark:bg-indigo-950/40 dark:text-indigo-200 dark:border-indigo-800/40",
      },
      {
        variant: "flat",
        color: "success",
        className:
          "bg-emerald-500/10 text-emerald-950 border border-emerald-500/20 dark:bg-emerald-950/40 dark:text-emerald-200 dark:border-emerald-800/40",
      },
      {
        variant: "flat",
        color: "danger",
        className:
          "bg-rose-500/10 text-rose-950 border border-rose-500/20 dark:bg-rose-950/40 dark:text-rose-200 dark:border-rose-800/40",
      },
      {
        variant: "flat",
        color: "warning",
        className:
          "bg-amber-500/10 text-amber-950 border border-amber-500/20 dark:bg-amber-950/40 dark:text-amber-200 dark:border-amber-800/40",
      },

      // Bordered Variants
      {
        variant: "bordered",
        color: "primary",
        className: "border-indigo-600 text-indigo-700 dark:border-indigo-400 dark:text-indigo-300",
      },
      {
        variant: "bordered",
        color: "success",
        className:
          "border-emerald-600 text-emerald-700 dark:border-emerald-400 dark:text-emerald-300",
      },
      {
        variant: "bordered",
        color: "danger",
        className: "border-rose-600 text-rose-700 dark:border-rose-400 dark:text-rose-300",
      },
      {
        variant: "bordered",
        color: "warning",
        className: "border-amber-500 text-amber-700 dark:border-amber-400 dark:text-amber-300",
      },
    ],
    defaultVariants: {
      variant: "flat",
      color: "primary",
    },
  }
);

export interface AlertProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "color">,
    VariantProps<typeof alertVariants> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  isClosable?: boolean;
  onClose?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = "flat",
      color = "primary",
      title,
      description,
      icon,
      isClosable = false,
      onClose,
      children,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(true);

    const handleClose = () => {
      setIsOpen(false);
      onClose?.();
    };

    if (!isOpen) return null;

    // Determine close button styling according to variant
    const getCloseButtonClass = () => {
      if (variant === "solid") {
        if (color === "warning") {
          return "text-zinc-950/70 hover:text-zinc-950 hover:bg-black/10 dark:hover:bg-black/20";
        }
        return "text-white/80 hover:text-white hover:bg-white/20 dark:hover:bg-white/15";
      }
      return "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/50 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800/50";
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant, color, className }))}
        {...props}
      >
        {/* Left Icon Slot */}
        {icon && (
          <div className="shrink-0 pt-0.5" aria-hidden="true">
            {icon}
          </div>
        )}

        {/* Center Content Area */}
        <div className="min-w-0 flex-1 space-y-1">
          {title && <h5 className="leading-tight font-semibold tracking-tight">{title}</h5>}
          {description && (
            <div className="text-xs leading-relaxed font-normal opacity-90 sm:text-sm">
              {description}
            </div>
          )}
          {children && (
            <div className="text-xs leading-relaxed font-normal opacity-90 sm:text-sm">
              {children}
            </div>
          )}
        </div>

        {/* Right Close Button */}
        {isClosable && (
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close alert"
            className={cn(
              "-mt-1.5 -mr-1.5 shrink-0 rounded-xl p-1 transition-all focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:outline-none active:scale-95 dark:focus-visible:ring-zinc-300",
              getCloseButtonClass()
            )}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = "Alert";

export { Alert, alertVariants };
