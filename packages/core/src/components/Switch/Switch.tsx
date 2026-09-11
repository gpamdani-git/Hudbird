// packages/core/src/components/Switch/Switch.tsx
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

export type SwitchColor = "primary" | "success" | "danger" | "warning";
export type SwitchSize = "sm" | "md" | "lg";

const switchTrackVariants = cva(
  "inline-flex shrink-0 items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out cursor-pointer",
  {
    variants: {
      size: {
        sm: "h-5 w-9",
        md: "h-6 w-11",
        lg: "h-7 w-14",
      },
      color: {
        primary: "",
        success: "",
        danger: "",
        warning: "",
      },
      isChecked: {
        true: "",
        false: "bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600",
      },
      disabled: {
        true: "cursor-not-allowed opacity-50 hover:bg-zinc-200 dark:hover:bg-zinc-700",
        false: "",
      },
    },
    compoundVariants: [
      {
        isChecked: true,
        color: "primary",
        className: "bg-primary hover:bg-primary-hover",
      },
      {
        isChecked: true,
        color: "success",
        className: "bg-success hover:bg-success-hover",
      },
      {
        isChecked: true,
        color: "danger",
        className: "bg-destructive hover:bg-destructive-hover",
      },
      {
        isChecked: true,
        color: "warning",
        className: "bg-warning hover:bg-warning-hover",
      },
    ],
    defaultVariants: {
      size: "md",
      color: "primary",
      isChecked: false,
      disabled: false,
    },
  }
);

const switchThumbVariants = cva(
  "pointer-events-none inline-block transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
      isChecked: {
        true: "",
        false: "translate-x-0",
      },
    },
    compoundVariants: [
      { isChecked: true, size: "sm", className: "translate-x-4" },
      { isChecked: true, size: "md", className: "translate-x-5" },
      { isChecked: true, size: "lg", className: "translate-x-7" },
    ],
    defaultVariants: {
      size: "md",
      isChecked: false,
    },
  }
);

const switchLabelVariants = cva(
  "select-none font-medium tracking-tight text-zinc-800 dark:text-zinc-200 transition-colors",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
      disabled: {
        true: "cursor-not-allowed opacity-60",
        false: "cursor-pointer",
      },
    },
    defaultVariants: {
      size: "md",
      disabled: false,
    },
  }
);

export interface SwitchProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "color">,
    Omit<VariantProps<typeof switchTrackVariants>, "disabled"> {
  /**
   * Label text rendered next to the switch.
   */
  label?: React.ReactNode;
  /**
   * Description text rendered under the label.
   */
  description?: React.ReactNode;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      className,
      size = "md",
      color = "primary",
      checked,
      defaultChecked,
      disabled = false,
      onChange,
      label,
      description,
      children,
      id: customId,
      ...props
    },
    ref
  ) => {
    // Unique ID fallback for label association
    const generatedId = React.useId();
    const id = customId || generatedId;

    // Internal state for uncontrolled mode
    const [internalChecked, setInternalChecked] = React.useState<boolean>(defaultChecked ?? false);
    const isControlled = checked !== undefined;
    const isCurrentChecked = isControlled ? checked : internalChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      if (!isControlled) {
        setInternalChecked(e.target.checked);
      }
      onChange?.(e);
    };

    const labelContent = label ?? children;

    return (
      <label
        htmlFor={id}
        className={cn(
          "group relative inline-flex gap-3 transition-opacity duration-150",
          description ? "items-start" : "items-center",
          disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
          className
        )}
      >
        {/* Hidden Native Input */}
        <input
          ref={ref}
          type="checkbox"
          id={id}
          role="switch"
          aria-checked={isCurrentChecked}
          checked={isCurrentChecked}
          disabled={disabled}
          onChange={handleChange}
          className="peer sr-only"
          {...props}
        />

        {/* Custom Styled Switch Track */}
        <div
          className={cn(
            switchTrackVariants({
              size,
              color,
              isChecked: isCurrentChecked,
              disabled,
            }),
            description ? "mt-0.5" : "",
            "dark:peer-focus-visible:ring-offset-background peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2",
            color === "primary" && "peer-focus-visible:ring-primary",
            color === "success" && "peer-focus-visible:ring-success",
            color === "danger" && "peer-focus-visible:ring-destructive",
            color === "warning" && "peer-focus-visible:ring-warning"
          )}
          aria-hidden="true"
        >
          {/* Thumb */}
          <span className={cn(switchThumbVariants({ size, isChecked: isCurrentChecked }))} />
        </div>

        {/* Label & Description Text */}
        {labelContent && (
          <div className="flex flex-col justify-center">
            <span
              className={cn(
                switchLabelVariants({ size, disabled }),
                !disabled && "group-hover:text-zinc-950 dark:group-hover:text-white"
              )}
            >
              {labelContent}
            </span>
            {description && (
              <span className="mt-0.5 text-xs leading-normal text-zinc-500 dark:text-zinc-400">
                {description}
              </span>
            )}
          </div>
        )}
      </label>
    );
  }
);

Switch.displayName = "Switch";

export { Switch, switchTrackVariants, switchThumbVariants, switchLabelVariants };
