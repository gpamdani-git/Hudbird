// packages/core/src/components/Alert/Alert.tsx
"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "../../utils/cn";

export type AlertVariant = "solid" | "flat" | "soft" | "bordered" | "outline";
export type AlertColor = "primary" | "secondary" | "success" | "danger" | "warning" | "info";

const alertVariants = cva(
  "relative flex w-full items-start gap-3.5 py-4 px-5 rounded-2xl text-sm transition-all duration-200",
  {
    variants: {
      variant: {
        solid: "shadow-xs text-white",
        flat: "shadow-none",
        soft: "shadow-none",
        bordered: "border bg-transparent",
        outline: "border bg-transparent",
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
        className: "bg-emerald-600 text-white shadow-emerald-600/20 dark:bg-emerald-500",
      },
      {
        variant: "solid",
        color: "danger",
        className: "bg-rose-600 text-white shadow-rose-600/20 dark:bg-rose-500",
      },
      {
        variant: "solid",
        color: "warning",
        className: "bg-amber-500 text-zinc-950 font-bold shadow-amber-500/20 dark:bg-amber-400",
      },
      {
        variant: "solid",
        color: "info",
        className: "bg-sky-600 text-white shadow-sky-600/20 dark:bg-sky-500",
      },

      // Flat Variants
      {
        variant: ["flat", "soft"],
        color: "primary",
        className:
          "bg-indigo-50/70 text-zinc-900 border border-indigo-200/80 dark:bg-indigo-950/20 dark:text-zinc-100 dark:border-indigo-500/20",
      },
      {
        variant: ["flat", "soft"],
        color: "secondary",
        className:
          "bg-zinc-100/70 text-zinc-900 border border-zinc-200/80 dark:bg-zinc-800/30 dark:text-zinc-100 dark:border-zinc-700/30",
      },
      {
        variant: ["flat", "soft"],
        color: "success",
        className:
          "bg-emerald-50/70 text-zinc-900 border border-emerald-200/80 dark:bg-emerald-950/20 dark:text-zinc-100 dark:border-emerald-500/20",
      },
      {
        variant: ["flat", "soft"],
        color: "danger",
        className:
          "bg-rose-50/70 text-zinc-900 border border-rose-200/80 dark:bg-rose-950/20 dark:text-zinc-100 dark:border-rose-500/20",
      },
      {
        variant: ["flat", "soft"],
        color: "warning",
        className:
          "bg-amber-50/70 text-zinc-900 border border-amber-200/80 dark:bg-amber-950/20 dark:text-zinc-100 dark:border-amber-500/20",
      },
      {
        variant: ["flat", "soft"],
        color: "info",
        className:
          "bg-sky-50/70 text-zinc-900 border border-sky-200/80 dark:bg-sky-950/20 dark:text-zinc-100 dark:border-sky-500/20",
      },

      // Bordered Variants
      {
        variant: ["bordered", "outline"],
        color: "primary",
        className:
          "bg-white/70 dark:bg-[#161618]/70 backdrop-blur-md border border-indigo-500/30 text-zinc-900 dark:border-indigo-500/30 dark:text-zinc-100 shadow-2xs",
      },
      {
        variant: ["bordered", "outline"],
        color: "secondary",
        className:
          "bg-white/70 dark:bg-[#161618]/70 backdrop-blur-md border border-zinc-300/80 text-zinc-900 dark:border-zinc-700/60 dark:text-zinc-100 shadow-2xs",
      },
      {
        variant: ["bordered", "outline"],
        color: "success",
        className:
          "bg-white/70 dark:bg-[#161618]/70 backdrop-blur-md border border-emerald-500/30 text-zinc-900 dark:border-emerald-500/30 dark:text-zinc-100 shadow-2xs",
      },
      {
        variant: ["bordered", "outline"],
        color: "danger",
        className:
          "bg-white/70 dark:bg-[#161618]/70 backdrop-blur-md border border-rose-500/30 text-zinc-900 dark:border-rose-500/30 dark:text-zinc-100 shadow-2xs",
      },
      {
        variant: ["bordered", "outline"],
        color: "warning",
        className:
          "bg-white/70 dark:bg-[#161618]/70 backdrop-blur-md border border-amber-500/40 text-zinc-900 dark:border-amber-500/30 dark:text-zinc-100 shadow-2xs",
      },
      {
        variant: ["bordered", "outline"],
        color: "info",
        className:
          "bg-white/70 dark:bg-[#161618]/70 backdrop-blur-md border border-sky-500/30 text-zinc-900 dark:border-sky-500/30 dark:text-zinc-100 shadow-2xs",
      },
    ],
    defaultVariants: {
      variant: "flat",
      color: "primary",
    },
  }
);

const iconContainerMap: Record<AlertColor, string> = {
  primary:
    "bg-indigo-100/90 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 ring-1 ring-indigo-500/25",
  secondary:
    "bg-zinc-200/80 text-zinc-700 dark:bg-white/10 dark:text-zinc-300 ring-1 ring-zinc-500/20",
  success:
    "bg-emerald-100/90 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 ring-1 ring-emerald-500/25",
  danger:
    "bg-rose-100/90 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400 ring-1 ring-rose-500/25",
  warning:
    "bg-amber-100/90 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 ring-1 ring-amber-500/25",
  info: "bg-sky-100/90 text-sky-600 dark:bg-sky-500/20 dark:text-sky-400 ring-1 ring-sky-500/25",
};

const iconColorMap: Record<AlertColor, string> = {
  primary: "text-indigo-600 dark:text-indigo-400",
  secondary: "text-zinc-600 dark:text-zinc-400",
  success: "text-emerald-600 dark:text-emerald-400",
  danger: "text-rose-600 dark:text-rose-400",
  warning: "text-amber-600 dark:text-amber-400",
  info: "text-sky-600 dark:text-sky-400",
};

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
      return "text-zinc-500 hover:text-zinc-900 hover:bg-black/5 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-white/10";
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
          <div
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-all duration-200",
              variant === "solid"
                ? color === "warning"
                  ? "bg-zinc-950/15 text-zinc-950"
                  : "bg-white/20 text-white"
                : iconContainerMap[color || "primary"]
            )}
            aria-hidden="true"
          >
            {icon}
          </div>
        )}

        {/* Center Content Area */}
        <div className="min-w-0 flex-1 space-y-1">
          {title && (
            <h5
              className={cn(
                "text-sm leading-snug font-semibold tracking-tight",
                variant === "solid"
                  ? color === "warning"
                    ? "text-zinc-950"
                    : "text-white"
                  : "text-zinc-950 dark:text-zinc-50"
              )}
            >
              {title}
            </h5>
          )}
          {description && (
            <div
              className={cn(
                "text-xs leading-relaxed font-normal sm:text-sm",
                variant === "solid"
                  ? color === "warning"
                    ? "text-zinc-950/80"
                    : "text-white/85"
                  : "text-zinc-600 dark:text-zinc-400"
              )}
            >
              {description}
            </div>
          )}
          {children && (
            <div
              className={cn(
                "text-xs leading-relaxed font-normal sm:text-sm",
                variant === "solid"
                  ? color === "warning"
                    ? "text-zinc-950/80"
                    : "text-white/85"
                  : "text-zinc-600 dark:text-zinc-400"
              )}
            >
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
              "-mt-1 -mr-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:outline-none active:scale-90 dark:focus-visible:ring-zinc-300",
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
