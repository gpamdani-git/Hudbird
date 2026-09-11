// packages/core/src/components/Input/Input.tsx
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

export type InputVariant = "flat" | "bordered" | "underlined";
export type InputSize = "sm" | "md" | "lg";
export type InputRadius = "none" | "md" | "lg" | "full";
export type InputLabelPlacement = "outside" | "inside";

const inputWrapperVariants = cva(
  "group relative flex items-center w-full transition-all duration-150 text-foreground outline-none select-none",
  {
    variants: {
      variant: {
        flat: "bg-muted hover:bg-muted/80 focus-within:bg-background border border-transparent focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20 shadow-2xs",
        bordered:
          "bg-transparent border border-border hover:border-foreground/30 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20 shadow-2xs",
        underlined:
          "bg-transparent rounded-none border-0 border-b-2 border-border hover:border-foreground/30 focus-within:border-ring px-0.5",
      },
      size: {
        sm: "min-h-8 text-xs px-2.5 gap-1.5",
        md: "min-h-10 text-sm px-3 gap-2",
        lg: "min-h-12 text-base px-3.5 gap-2.5",
      },
      radius: {
        none: "rounded-none",
        md: "rounded-xl",
        lg: "rounded-2xl",
        full: "rounded-full",
      },
      isInvalid: {
        true: "!border-destructive focus-within:!border-destructive focus-within:!ring-destructive/20",
        false: "",
      },
      isDisabled: {
        true: "opacity-50 pointer-events-none select-none cursor-not-allowed",
        false: "",
      },
      labelPlacement: {
        outside: "",
        inside: "items-stretch",
      },
    },
    compoundVariants: [
      {
        variant: "underlined",
        className: "rounded-none",
      },
      {
        labelPlacement: "inside",
        size: "sm",
        className: "min-h-12 py-1 px-3",
      },
      {
        labelPlacement: "inside",
        size: "md",
        className: "min-h-14 py-1.5 px-3.5",
      },
      {
        labelPlacement: "inside",
        size: "lg",
        className: "min-h-16 py-2 px-4",
      },
    ],
    defaultVariants: {
      variant: "flat",
      size: "md",
      radius: "md",
      isInvalid: false,
      isDisabled: false,
      labelPlacement: "outside",
    },
  }
);

export interface InputProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputWrapperVariants> {
  variant?: InputVariant;
  size?: InputSize;
  /** Backward-compatibility alias for size */
  inputSize?: InputSize;
  radius?: InputRadius;
  label?: React.ReactNode;
  labelPlacement?: InputLabelPlacement;
  isInvalid?: boolean;
  description?: React.ReactNode;
  errorMessage?: React.ReactNode;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  isClearable?: boolean;
  onClear?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant = "flat",
      size = "md",
      inputSize,
      radius = "md",
      label,
      labelPlacement = "outside",
      isInvalid = false,
      disabled = false,
      description,
      errorMessage,
      startContent,
      endContent,
      isClearable = false,
      onClear,
      value,
      defaultValue,
      onChange,
      type = "text",
      ...props
    },
    ref
  ) => {
    // Support inputSize alias for seamless backwards-compatibility
    const resolvedSize = inputSize ?? size ?? "md";

    const innerInputRef = React.useRef<HTMLInputElement | null>(null);

    // Merge internal and external refs
    React.useImperativeHandle(ref, () => innerInputRef.current as HTMLInputElement);

    const [uncontrolledVal, setUncontrolledVal] = React.useState<string>(() => {
      if (defaultValue !== undefined) return String(defaultValue);
      return "";
    });

    const isControlled = value !== undefined;
    const currentVal = isControlled ? String(value ?? "") : uncontrolledVal;
    const hasValue = Boolean(currentVal && currentVal.length > 0);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setUncontrolledVal(e.target.value);
      }
      onChange?.(e);
    };

    const handleClearClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (!isControlled) {
        setUncontrolledVal("");
      }

      if (innerInputRef.current) {
        innerInputRef.current.value = "";
        // Dispatch synthetic change event to trigger reactive form subscribers
        const event = new Event("input", { bubbles: true });
        innerInputRef.current.dispatchEvent(event);
      }

      onClear?.();
      innerInputRef.current?.focus();
    };

    const isInsideLabel = labelPlacement === "inside" && Boolean(label);

    return (
      <div className={cn("flex w-full flex-col text-left", className)}>
        {/* Outside Label */}
        {label && labelPlacement === "outside" && (
          <label
            className={cn(
              "mb-1.5 text-xs font-semibold transition-colors select-none",
              isInvalid ? "text-destructive" : "text-foreground",
              disabled && "cursor-not-allowed opacity-50"
            )}
          >
            {label}
          </label>
        )}

        {/* Input Interactive Box Container */}
        <div
          className={cn(
            inputWrapperVariants({
              variant,
              size: resolvedSize,
              radius,
              isInvalid,
              isDisabled: disabled,
              labelPlacement,
            })
          )}
          onClick={() => innerInputRef.current?.focus()}
        >
          {/* Start Content Slot */}
          {startContent && (
            <div className="text-muted-foreground flex shrink-0 items-center justify-center select-none">
              {startContent}
            </div>
          )}

          {/* Main Input Element or Inside Label Wrapper */}
          {isInsideLabel ? (
            <div className="flex h-full min-w-0 flex-1 flex-col justify-center py-0.5">
              <span
                className={cn(
                  "text-[10px] leading-tight font-semibold tracking-wide uppercase transition-colors select-none",
                  isInvalid ? "text-destructive" : "text-muted-foreground"
                )}
              >
                {label}
              </span>
              <input
                ref={innerInputRef}
                type={type}
                value={isControlled ? value : uncontrolledVal}
                onChange={handleInputChange}
                disabled={disabled}
                aria-invalid={isInvalid ? "true" : undefined}
                className="text-foreground placeholder:text-muted-foreground w-full border-none bg-transparent p-0 leading-tight font-normal outline-none disabled:cursor-not-allowed"
                {...props}
              />
            </div>
          ) : (
            <input
              ref={innerInputRef}
              type={type}
              value={isControlled ? value : uncontrolledVal}
              onChange={handleInputChange}
              disabled={disabled}
              aria-invalid={isInvalid ? "true" : undefined}
              className="text-foreground placeholder:text-muted-foreground h-full w-full border-none bg-transparent font-normal outline-none disabled:cursor-not-allowed"
              {...props}
            />
          )}

          {/* Interactive Clear Button */}
          {isClearable && hasValue && !disabled && (
            <button
              type="button"
              aria-label="Clear input value"
              tabIndex={-1}
              onClick={handleClearClick}
              className="text-muted-foreground hover:bg-muted-foreground/10 hover:text-foreground shrink-0 cursor-pointer rounded-lg p-1 transition-all active:scale-90"
            >
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}

          {/* End Content Slot */}
          {endContent && (
            <div className="text-muted-foreground flex shrink-0 items-center justify-center select-none">
              {endContent}
            </div>
          )}
        </div>

        {/* Validation Error Message or Helper Description */}
        {isInvalid && errorMessage ? (
          <p
            role="alert"
            className="animate-in fade-in-0 slide-in-from-top-0.5 text-destructive mt-1.5 flex items-center gap-1 text-xs font-medium duration-150"
          >
            {errorMessage}
          </p>
        ) : description ? (
          <p className="text-muted-foreground mt-1.5 text-xs">{description}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, inputWrapperVariants };
