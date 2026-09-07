// packages/core/src/components/RadioGroup/Radio.tsx
"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

export type RadioColor = "default" | "primary" | "success" | "warning" | "danger";
export type RadioSize = "sm" | "md" | "lg";

export interface RadioGroupContextValue {
  name: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size?: RadioSize;
  color?: RadioColor;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
}

export const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null);

export function useRadioGroupContext() {
  return React.useContext(RadioGroupContext);
}

export const radioCircleVariants = cva(
  "shrink-0 rounded-full border flex items-center justify-center transition-all duration-150 ease-out",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
      color: {
        default: "",
        primary: "",
        success: "",
        warning: "",
        danger: "",
      },
      isChecked: {
        true: "",
        false: "bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600",
      },
      isInvalid: {
        true: "!border-rose-500 dark:!border-rose-400",
        false: "",
      },
    },
    compoundVariants: [
      {
        isChecked: true,
        color: "default",
        className: "bg-zinc-900 dark:bg-zinc-100 border-zinc-900 dark:border-zinc-100",
      },
      {
        isChecked: true,
        color: "primary",
        className: "bg-indigo-600 dark:bg-indigo-500 border-indigo-600 dark:border-indigo-500",
      },
      {
        isChecked: true,
        color: "success",
        className: "bg-emerald-600 dark:bg-emerald-500 border-emerald-600 dark:border-emerald-500",
      },
      {
        isChecked: true,
        color: "warning",
        className: "bg-amber-500 dark:bg-amber-500 border-amber-500 dark:border-amber-500",
      },
      {
        isChecked: true,
        color: "danger",
        className: "bg-rose-600 dark:bg-rose-500 border-rose-600 dark:border-rose-500",
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

export const radioDotVariants = cva("rounded-full transition-transform duration-150 ease-out", {
  variants: {
    size: {
      sm: "h-1.5 w-1.5",
      md: "h-2 w-2",
      lg: "h-2.5 w-2.5",
    },
    color: {
      default: "bg-white dark:bg-zinc-950",
      primary: "bg-white",
      success: "bg-white",
      warning: "bg-white",
      danger: "bg-white",
    },
    isChecked: {
      true: "scale-100",
      false: "scale-0",
    },
  },
  defaultVariants: {
    size: "md",
    color: "primary",
    isChecked: false,
  },
});

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "color">,
    Omit<VariantProps<typeof radioCircleVariants>, "disabled" | "isChecked"> {
  value: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  variant?: "default" | "card";
  classNames?: {
    base?: string;
    wrapper?: string;
    control?: string;
    labelWrapper?: string;
    label?: string;
    description?: string;
  };
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      className,
      classNames,
      value,
      label,
      description,
      size: propSize,
      color: propColor,
      isInvalid: propInvalid,
      disabled: propDisabled,
      variant = "default",
      children,
      checked: propChecked,
      onChange: propOnChange,
      ...props
    },
    ref
  ) => {
    const group = useRadioGroupContext();

    const size = propSize || group?.size || "md";
    const color = propColor || group?.color || "primary";
    const isInvalid = propInvalid !== undefined ? propInvalid : (group?.isInvalid ?? false);
    const isDisabled = propDisabled !== undefined ? propDisabled : (group?.isDisabled ?? false);
    const isReadOnly = group?.isReadOnly ?? false;

    const isChecked = group ? group.value === value : propChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isDisabled || isReadOnly) return;
      propOnChange?.(e);
      group?.onChange(e);
    };

    const isCard = variant === "card";

    return (
      <label
        className={cn(
          "group relative inline-flex items-start select-none transition-all duration-150",
          isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
          isCard
            ? cn(
                "p-4 rounded-xl border transition-all duration-200",
                isChecked
                  ? "border-indigo-600 dark:border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/20 ring-1 ring-indigo-600/30 dark:ring-indigo-500/30"
                  : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-zinc-700"
              )
            : "gap-3",
          classNames?.base,
          className
        )}
      >
        {/* Hidden Native Input */}
        <input
          ref={ref}
          type="radio"
          name={group?.name || props.name}
          value={value}
          checked={isChecked}
          disabled={isDisabled || isReadOnly}
          onChange={handleChange}
          aria-invalid={isInvalid ? true : undefined}
          className="sr-only"
          {...props}
        />

        {/* Custom Visual Radio Indicator */}
        <div
          className={cn(
            "relative flex items-center justify-center rounded-full group-focus-within:ring-2 group-focus-within:ring-indigo-500 group-focus-within:ring-offset-2 dark:group-focus-within:ring-offset-zinc-950",
            size === "sm" ? "mt-0.5" : size === "md" ? "mt-0.5" : "mt-1",
            classNames?.wrapper
          )}
        >
          <div
            className={cn(
              radioCircleVariants({ size, color, isChecked, isInvalid }),
              classNames?.control
            )}
          >
            <span className={cn(radioDotVariants({ size, color, isChecked }))} />
          </div>
        </div>

        {/* Label and Description */}
        {(label || children || description) && (
          <div
            className={cn(
              "flex flex-col text-left",
              isCard ? "ml-3" : "",
              classNames?.labelWrapper
            )}
          >
            {(label || children) && (
              <span
                className={cn(
                  "font-medium leading-tight text-zinc-900 dark:text-zinc-100",
                  size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base",
                  classNames?.label
                )}
              >
                {label || children}
              </span>
            )}
            {description && (
              <span
                className={cn(
                  "text-zinc-500 dark:text-zinc-400 mt-1 leading-normal",
                  size === "sm" ? "text-[11px]" : "text-xs",
                  classNames?.description
                )}
              >
                {description}
              </span>
            )}
          </div>
        )}
      </label>
    );
  }
);
Radio.displayName = "Radio";
