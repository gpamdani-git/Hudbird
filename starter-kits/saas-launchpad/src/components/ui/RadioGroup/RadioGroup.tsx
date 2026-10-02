// packages/core/src/components/RadioGroup/RadioGroup.tsx
"use client";
import * as React from "react";
import { cn } from "@/lib/cn";
import { RadioGroupContext, type RadioColor, type RadioSize } from "./Radio";

export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size?: RadioSize;
  color?: RadioColor;
  orientation?: "vertical" | "horizontal";
  label?: React.ReactNode;
  description?: React.ReactNode;
  errorMessage?: React.ReactNode;
  isInvalid?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  classNames?: {
    base?: string;
    label?: string;
    wrapper?: string;
    description?: string;
    errorMessage?: string;
  };
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      className,
      classNames,
      name: propName,
      value: propValue,
      defaultValue = "",
      onValueChange,
      onChange,
      size = "md",
      color = "primary",
      orientation = "vertical",
      label,
      description,
      errorMessage,
      isInvalid = false,
      isDisabled = false,
      isReadOnly = false,
      isRequired = false,
      children,
      ...props
    },
    ref
  ) => {
    const defaultName = React.useId();
    const groupName = propName || defaultName;

    const [uncontrolledValue, setUncontrolledValue] = React.useState<string>(defaultValue);
    const isControlled = propValue !== undefined;
    const currentValue = isControlled ? propValue : uncontrolledValue;

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const nextValue = e.target.value;
        if (!isControlled) {
          setUncontrolledValue(nextValue);
        }
        onValueChange?.(nextValue);
        onChange?.(e);
      },
      [isControlled, onValueChange, onChange]
    );

    const contextValue = React.useMemo(
      () => ({
        name: groupName,
        value: currentValue,
        onChange: handleChange,
        size,
        color,
        isDisabled,
        isInvalid,
        isReadOnly,
      }),
      [groupName, currentValue, handleChange, size, color, isDisabled, isInvalid, isReadOnly]
    );

    return (
      <RadioGroupContext.Provider value={contextValue}>
        <div
          ref={ref}
          role="radiogroup"
          aria-orientation={orientation}
          aria-invalid={isInvalid}
          aria-disabled={isDisabled ? true : undefined}
          aria-required={isRequired}
          className={cn("flex flex-col gap-2", classNames?.base, className)}
          {...props}
        >
          {label && (
            <div className="flex items-center gap-1">
              <span
                className={cn(
                  "font-medium text-zinc-900 select-none dark:text-zinc-100",
                  size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base",
                  isInvalid ? "text-rose-600 dark:text-rose-400" : "",
                  classNames?.label
                )}
              >
                {label}
              </span>
              {isRequired && <span className="text-sm text-rose-500">*</span>}
            </div>
          )}

          {description && !isInvalid && (
            <p
              className={cn(
                "-mt-1 text-xs text-zinc-500 dark:text-zinc-400",
                classNames?.description
              )}
            >
              {description}
            </p>
          )}

          <div
            className={cn(
              "flex",
              orientation === "horizontal" ? "flex-row flex-wrap gap-4" : "flex-col gap-3",
              classNames?.wrapper
            )}
          >
            {children}
          </div>

          {isInvalid && errorMessage && (
            <p
              className={cn(
                "mt-0.5 text-xs font-medium text-rose-600 dark:text-rose-400",
                classNames?.errorMessage
              )}
            >
              {errorMessage}
            </p>
          )}
        </div>
      </RadioGroupContext.Provider>
    );
  }
);
RadioGroup.displayName = "RadioGroup";
