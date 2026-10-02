// packages/core/src/components/Alert/Alert.tsx
"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

export type AlertVariant = "solid" | "flat" | "soft" | "bordered" | "outline";
export type AlertColor = "primary" | "secondary" | "success" | "danger" | "warning" | "info";

const alertVariants = cva(
  "relative flex w-full items-start gap-3.5 p-4 rounded-2xl text-sm transition-all duration-200",
  {
    variants: {
      variant: {
        solid: "shadow-xs text-white",
        flat: "shadow-none",
        soft: "shadow-none",
        bordered: "border-2 bg-transparent",
        outline: "border-2 bg-transparent",
      },
      color: {
        primary: "",
        secondary: "",
        success: "",
        danger: "",
        warning: "",
        info: "",
      },
    },
    compoundVariants: [
      // Solid Variants
      {
        variant: "solid",
        color: "primary",
        className: "bg-primary text-primary-foreground shadow-primary/20",
      },
      {
        variant: "solid",
        color: "secondary",
        className: "bg-secondary text-secondary-foreground shadow-secondary/20",
      },
      {
        variant: "solid",
        color: "success",
        className: "bg-emerald-600 text-white shadow-zinc-600/20 dark:bg-blue-500",
      },
      {
        variant: "solid",
        color: "danger",
        className: "bg-rose-600 text-white shadow-zinc-600/20 dark:bg-blue-500",
      },
      {
        variant: "solid",
        color: "warning",
        className: "bg-blue-500 text-zinc-950 font-bold shadow-zinc-500/20 dark:bg-amber-400",
      },
      {
        variant: "solid",
        color: "info",
        className: "bg-sky-600 text-white shadow-zinc-600/20 dark:bg-blue-500",
      },

      // Flat Variants
      {
        variant: ["flat", "soft"],
        color: "primary",
        className:
          "bg-primary-50 text-primary-700 border border-primary-200 dark:bg-primary-500/15 dark:text-primary-400 dark:border-primary-500/20",
      },
      {
        variant: ["flat", "soft"],
        color: "secondary",
        className:
          "bg-secondary-50 text-secondary-700 border border-secondary-200 dark:bg-secondary-500/15 dark:text-secondary-400 dark:border-secondary-500/20",
      },
      {
        variant: ["flat", "soft"],
        color: "success",
        className:
          "bg-zinc-100/50 text-emerald-700 border border-zinc-200 dark:bg-blue-500/15 dark:text-emerald-400 dark:border-blue-500/20",
      },
      {
        variant: ["flat", "soft"],
        color: "danger",
        className:
          "bg-zinc-100/50 text-rose-700 border border-zinc-200 dark:bg-blue-500/15 dark:text-rose-400 dark:border-blue-500/20",
      },
      {
        variant: ["flat", "soft"],
        color: "warning",
        className:
          "bg-zinc-100/50 text-amber-700 border border-zinc-200 dark:bg-blue-500/15 dark:text-amber-400 dark:border-blue-500/20",
      },
      {
        variant: ["flat", "soft"],
        color: "info",
        className:
          "bg-zinc-100/50 text-sky-700 border border-zinc-200 dark:bg-blue-500/15 dark:text-sky-400 dark:border-blue-500/20",
      },

      // Bordered Variants
      {
        variant: ["bordered", "outline"],
        color: "primary",
        className:
          "border-primary-600 text-primary-700 dark:border-primary-500 dark:text-primary-400",
      },
      {
        variant: ["bordered", "outline"],
        color: "secondary",
        className:
          "border-secondary-600 text-secondary-700 dark:border-secondary-500 dark:text-secondary-400",
      },
      {
        variant: ["bordered", "outline"],
        color: "success",
        className:
          "border-zinc-600 text-emerald-700 dark:border-blue-500 dark:text-emerald-400",
      },
      {
        variant: ["bordered", "outline"],
        color: "danger",
        className: "border-zinc-600 text-rose-700 dark:border-blue-500 dark:text-rose-400",
      },
      {
        variant: ["bordered", "outline"],
        color: "warning",
        className: "border-zinc-500 text-amber-700 dark:border-amber-400 dark:text-amber-400",
      },
      {
        variant: ["bordered", "outline"],
        color: "info",
        className: "border-zinc-600 text-sky-700 dark:border-blue-500 dark:text-sky-400",
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
