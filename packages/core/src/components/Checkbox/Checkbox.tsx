// packages/core/src/components/Checkbox/Checkbox.tsx
"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

export type CheckboxColor = "primary" | "success" | "danger";
export type CheckboxSize = "sm" | "md" | "lg";

const checkboxControlVariants = cva(
  "inline-flex items-center justify-center shrink-0 border transition-all duration-200 ease-in-out select-none active:scale-[0.96] focus-within:ring-2 focus-within:ring-offset-2",
  {
    variants: {
      size: {
        sm: "h-4 w-4 rounded-md",
        md: "h-5 w-5 rounded-lg",
        lg: "h-6 w-6 rounded-lg",
      },
      color: {
        primary: "focus-within:ring-primary focus-within:ring-offset-background",
        success: "focus-within:ring-success focus-within:ring-offset-background",
        danger: "focus-within:ring-destructive focus-within:ring-offset-background",
      },
      isChecked: {
        true: "",
        false:
          "bg-white border-zinc-300 hover:border-zinc-400 dark:bg-zinc-900 dark:border-zinc-700 dark:hover:border-zinc-600 shadow-2xs",
      },
      isInvalid: {
        true: "border-rose-500 dark:border-rose-400 ring-1 ring-rose-500/20",
        false: "",
      },
    },
    compoundVariants: [
      // Primary checked state
      {
        isChecked: true,
        color: "primary",
        className: "bg-primary border-primary text-primary-foreground shadow-xs",
      },
      // Success checked state
      {
        isChecked: true,
        color: "success",
        className: "bg-success border-success text-success-foreground shadow-xs",
      },
      // Danger checked state
      {
        isChecked: true,
        color: "danger",
        className: "bg-destructive border-destructive text-destructive-foreground shadow-xs",
      },
    ],
    defaultVariants: {
      size: "md",
      color: "primary",
      isChecked: false,
      isInvalid: false,
    },
  }
);

const labelTextVariants = cva(
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

export interface CheckboxProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "color">,
    VariantProps<typeof checkboxControlVariants> {
  /**
   * Label text or custom element beside the checkbox.
   */
  label?: React.ReactNode;
  /**
   * Description text rendered under the label.
   */
  description?: React.ReactNode;
  /**
   * Marks the checkbox as invalid with red border styling.
   * @default false
   */
  isInvalid?: boolean;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      size = "md",
      color = "primary",
      isInvalid = false,
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
          "group relative inline-flex gap-2.5 transition-opacity duration-150",
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
          checked={isCurrentChecked}
          disabled={disabled}
          onChange={handleChange}
          aria-invalid={isInvalid}
          className="peer sr-only"
          {...props}
        />

        {/* Custom Styled Checkbox Box */}
        <div
          className={cn(
            checkboxControlVariants({
              size,
              color,
              isChecked: isCurrentChecked,
              isInvalid,
            }),
            description ? "mt-0.5" : "",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2",
            color === "primary" && "peer-focus-visible:ring-primary",
            color === "success" && "peer-focus-visible:ring-success",
            color === "danger" && "peer-focus-visible:ring-destructive"
          )}
          aria-hidden="true"
        >
          {/* Animated SVG Checkmark */}
          <svg
            className={cn(
              "transform fill-none stroke-current stroke-[3] transition-all duration-200 ease-in-out",
              size === "sm" && "h-2.5 w-2.5",
              size === "md" && "h-3 w-3",
              size === "lg" && "h-3.5 w-3.5",
              isCurrentChecked ? "scale-100 opacity-100" : "scale-50 opacity-0"
            )}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>

        {/* Label & Description Text */}
        {labelContent && (
          <div className="flex flex-col justify-center">
            <span
              className={cn(
                labelTextVariants({ size, disabled }),
                "group-hover:text-zinc-950 dark:group-hover:text-white"
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

Checkbox.displayName = "Checkbox";

export { Checkbox, checkboxControlVariants, labelTextVariants };
