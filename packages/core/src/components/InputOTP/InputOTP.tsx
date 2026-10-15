// packages/core/src/components/InputOTP/InputOTP.tsx
"use client";

import * as React from "react";
import { Dot } from "lucide-react";
import { cn } from "../../utils/cn";

export type InputOTPSize = "sm" | "md" | "lg";
export type InputOTPRadius = "none" | "sm" | "md" | "lg" | "full";

const groupRadiusStyles: Record<InputOTPRadius, string> = {
  none: "rounded-none",
  sm: "rounded-md",
  md: "rounded-xl",
  lg: "rounded-2xl",
  full: "rounded-full",
};

interface InputOTPContextValue {
  value: string;
  focusedIndex: number;
  isFocused: boolean;
  maxLength: number;
  disabled: boolean;
  size: InputOTPSize;
  radius: InputOTPRadius;
  isInvalid: boolean;
}

const InputOTPContext = React.createContext<InputOTPContextValue>({
  value: "",
  focusedIndex: -1,
  isFocused: false,
  maxLength: 6,
  disabled: false,
  size: "md",
  radius: "md",
  isInvalid: false,
});

export const useInputOTPContext = () => React.useContext(InputOTPContext);

// ----------------------------------------------------
// InputOTP Root
// ----------------------------------------------------

export interface InputOTPProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange" | "defaultValue"
> {
  /**
   * Controlled string value
   */
  value?: string;
  /**
   * Uncontrolled initial string value
   */
  defaultValue?: string;
  /**
   * Callback fired when value changes
   */
  onChange?: (value: string) => void;
  /**
   * Callback fired when all slots are filled
   */
  onComplete?: (value: string) => void;
  /**
   * Number of OTP code slots (default 6)
   */
  maxLength?: number;
  /**
   * Disables user input
   */
  disabled?: boolean;
  /**
   * Automatically focuses input on mount
   */
  autoFocus?: boolean;
  /**
   * Sizing of slot tiles
   */
  size?: InputOTPSize;
  /**
   * Border radius applied to the slot group container
   */
  radius?: InputOTPRadius;
  /**
   * Whether the input is in an invalid error state
   */
  isInvalid?: boolean;
  /**
   * Allowed input regex pattern (default: digits only)
   */
  pattern?: RegExp;
}

export const InputOTP = React.forwardRef<HTMLDivElement, InputOTPProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue = "",
      onChange,
      onComplete,
      maxLength = 6,
      disabled = false,
      autoFocus = false,
      size = "md",
      radius = "md",
      isInvalid = false,
      pattern = /^\d+$/,
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
    const value = controlledValue !== undefined ? controlledValue : uncontrolledValue;

    const [isFocused, setIsFocused] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    const focusedIndex = Math.min(value.length, maxLength - 1);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      const filtered = pattern
        ? raw
            .split("")
            .filter((c) => pattern.test(c))
            .join("")
        : raw;
      const nextVal = filtered.slice(0, maxLength);

      if (controlledValue === undefined) {
        setUncontrolledValue(nextVal);
      }
      onChange?.(nextVal);

      if (nextVal.length === maxLength) {
        onComplete?.(nextVal);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        // Allow native arrow navigation inside input
      }
    };

    return (
      <InputOTPContext.Provider
        value={{
          value,
          focusedIndex: isFocused ? focusedIndex : -1,
          isFocused,
          maxLength,
          disabled,
          size,
          radius,
          isInvalid,
        }}
      >
        <div
          ref={ref}
          onClick={() => {
            if (!disabled && inputRef.current) {
              inputRef.current.focus();
            }
          }}
          className={cn(
            "relative inline-flex cursor-text items-center gap-2 select-none",
            disabled && "cursor-not-allowed opacity-50",
            className
          )}
          {...props}
        >
          {/* Accessible hidden HTML Input receiving touch and key events */}
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            autoFocus={autoFocus}
            disabled={disabled}
            value={value}
            maxLength={maxLength}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            aria-label={props["aria-label"] || "One-Time Password code"}
            aria-invalid={isInvalid}
            className="pointer-events-none absolute inset-0 h-full w-full opacity-0"
          />

          {children}
        </div>
      </InputOTPContext.Provider>
    );
  }
);

InputOTP.displayName = "InputOTP";

// ----------------------------------------------------
// InputOTP Group
// ----------------------------------------------------

export interface InputOTPGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  radius?: InputOTPRadius;
}

export const InputOTPGroup = React.forwardRef<HTMLDivElement, InputOTPGroupProps>(
  ({ className, radius: propRadius, ...props }, ref) => {
    const context = useInputOTPContext();
    const effectiveRadius = propRadius ?? context?.radius ?? "md";

    return (
      <div
        ref={ref}
        className={cn(
          "border-border bg-background divide-border flex items-center divide-x overflow-hidden border shadow-2xs transition-all duration-150",
          groupRadiusStyles[effectiveRadius],
          className
        )}
        {...props}
      />
    );
  }
);

InputOTPGroup.displayName = "InputOTPGroup";

// ----------------------------------------------------
// InputOTP Slot
// ----------------------------------------------------

export interface InputOTPSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
}

const slotSizeStyles: Record<InputOTPSize, string> = {
  sm: "w-8 h-9 text-sm",
  md: "w-10 h-12 text-base",
  lg: "w-12 h-14 text-lg",
};

export const InputOTPSlot = React.forwardRef<HTMLDivElement, InputOTPSlotProps>(
  ({ index, className, ...props }, ref) => {
    const { value, focusedIndex, isFocused, disabled, size, isInvalid } = useInputOTPContext();

    const char = value[index] || "";
    const isActive = isFocused && (index === focusedIndex || (index === value.length && index < 6));

    return (
      <div
        ref={ref}
        role="presentation"
        className={cn(
          "text-foreground relative flex items-center justify-center font-semibold transition-all duration-150",
          slotSizeStyles[size],
          isActive && "ring-ring ring-offset-background z-10 ring-2",
          isInvalid && "ring-offset-background ring-2 ring-rose-600",
          disabled && "bg-muted/40",
          className
        )}
        {...props}
      >
        {char}

        {/* Blinking cursor when slot is empty and active */}
        {isActive && !char && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
          </div>
        )}
      </div>
    );
  }
);

InputOTPSlot.displayName = "InputOTPSlot";

// ----------------------------------------------------
// InputOTP Separator
// ----------------------------------------------------

export interface InputOTPSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export const InputOTPSeparator = React.forwardRef<HTMLDivElement, InputOTPSeparatorProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="separator"
        aria-hidden="true"
        className={cn("text-muted-foreground flex items-center", className)}
        {...props}
      >
        <Dot className="h-5 w-5" />
      </div>
    );
  }
);

InputOTPSeparator.displayName = "InputOTPSeparator";
