// packages/core/src/components/RadioGroup/Radio.tsx
"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

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
        false:
          "bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600",
      },
      isInvalid: {
        true: "!border-zinc-500 dark:!border-zinc-400",
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
        className: "bg-primary border-primary text-primary-foreground",
      },
      {
        isChecked: true,
        color: "success",
        className:
          "bg-emerald-600 border-zinc-600 text-white dark:bg-blue-500 dark:border-blue-500",
      },
      {
        isChecked: true,
        color: "warning",
        className:
          "bg-blue-500 border-zinc-500 text-zinc-950 dark:bg-amber-400 dark:border-amber-400",
      },
      {
        isChecked: true,
        color: "danger",
        className: "bg-rose-600 border-zinc-600 text-white dark:bg-blue-500 dark:border-blue-500",
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
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "color">,
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
          "group relative inline-flex items-start transition-all duration-150 select-none",
          isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
          isCard
            ? cn(
                "rounded-xl border p-4 transition-all duration-200",
                isChecked
                  ? "border-primary bg-primary/10 ring-primary/30 ring-1"
                  : "border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700"
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
            "dark:group-focus-within:ring-offset-background relative flex items-center justify-center rounded-full group-focus-within:ring-2 group-focus-within:ring-offset-2",
            color === "primary" && "group-focus-within:ring-primary",
            color === "success" && "group-focus-within:ring-success",
            color === "warning" && "group-focus-within:ring-warning",
            color === "danger" && "group-focus-within:ring-destructive",
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
                  "leading-tight font-medium text-zinc-900 dark:text-zinc-100",
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
                  "mt-1 leading-normal text-zinc-500 dark:text-zinc-400",
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
