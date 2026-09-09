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
  "group relative flex items-center w-full transition-all duration-150 text-zinc-900 dark:text-zinc-50 outline-none select-none",
  {
    variants: {
      variant: {
        flat: "bg-zinc-100 hover:bg-zinc-200/70 focus-within:bg-white dark:bg-zinc-900 dark:hover:bg-zinc-800/80 dark:focus-within:bg-zinc-900 border border-transparent focus-within:border-indigo-500 dark:focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 shadow-2xs",
        bordered:
          "bg-transparent border border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700 focus-within:border-indigo-500 dark:focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 shadow-2xs",
        underlined:
          "bg-transparent rounded-none border-0 border-b-2 border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700 focus-within:border-indigo-500 dark:focus-within:border-indigo-500 px-0.5",
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
        true: "!border-rose-500 dark:!border-rose-500 focus-within:!border-rose-500 focus-within:!ring-rose-500/20",
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
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
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
      <div className={cn("flex flex-col w-full text-left", className)}>
        {/* Outside Label */}
        {label && labelPlacement === "outside" && (
          <label
            className={cn(
              "text-xs font-semibold mb-1.5 transition-colors select-none",
              isInvalid
                ? "text-rose-600 dark:text-rose-400"
                : "text-zinc-700 dark:text-zinc-300",
              disabled && "opacity-50 cursor-not-allowed"
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
            <div className="shrink-0 flex items-center justify-center text-zinc-400 dark:text-zinc-500 select-none">
              {startContent}
            </div>
          )}

          {/* Main Input Element or Inside Label Wrapper */}
          {isInsideLabel ? (
            <div className="flex flex-col justify-center flex-1 min-w-0 h-full py-0.5">
              <span
                className={cn(
                  "text-[10px] font-semibold tracking-wide uppercase transition-colors select-none leading-tight",
                  isInvalid
                    ? "text-rose-600 dark:text-rose-400"
                    : "text-zinc-500 dark:text-zinc-400"
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
                className="w-full bg-transparent p-0 text-zinc-900 dark:text-zinc-50 outline-none border-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500 font-normal leading-tight disabled:cursor-not-allowed"
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
              className="w-full h-full bg-transparent outline-none border-none text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 font-normal disabled:cursor-not-allowed"
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
              className="shrink-0 p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-200/80 dark:hover:bg-zinc-800 rounded-lg active:scale-90 transition-all cursor-pointer"
            >
              <svg
                className="w-3.5 h-3.5"
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
            <div className="shrink-0 flex items-center justify-center text-zinc-400 dark:text-zinc-500 select-none">
              {endContent}
            </div>
          )}
        </div>

        {/* Validation Error Message or Helper Description */}
        {isInvalid && errorMessage ? (
          <p
            role="alert"
            className="text-xs font-medium text-rose-600 dark:text-rose-400 mt-1.5 flex items-center gap-1 animate-in fade-in-0 slide-in-from-top-0.5 duration-150"
          >
            {errorMessage}
          </p>
        ) : description ? (
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5">
            {description}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, inputWrapperVariants };
