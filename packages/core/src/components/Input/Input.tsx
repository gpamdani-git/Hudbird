"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const inputWrapperVariants = cva(
  "flex items-center w-full px-3 gap-2 text-sm transition-colors border overflow-hidden text-zinc-900 dark:text-zinc-50 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500",
  {
    variants: {
      variant: {
        flat: "bg-zinc-100 border-transparent dark:bg-zinc-800",
        bordered: "bg-transparent border-zinc-200 dark:border-zinc-800",
      },
      inputSize: {
        sm: "h-8 rounded-lg text-xs",
        md: "h-10 rounded-xl",
        lg: "h-12 rounded-2xl text-base",
      },
      isInvalid: {
        true: "!border-rose-500 focus-within:!border-rose-500 focus-within:!ring-rose-500/20",
        false: "",
      },
    },
    defaultVariants: {
      variant: "bordered",
      inputSize: "md",
      isInvalid: false,
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputWrapperVariants> {
  label?: React.ReactNode;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  isInvalid?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, isInvalid, label, startContent, endContent, type, ...props }, ref) => {
    return (
      <div className={cn("flex flex-col w-full gap-1.5", className)}>
        {label && (
          <label
            className={cn(
              "text-xs font-semibold text-zinc-700 dark:text-zinc-300",
              isInvalid && "text-rose-500 dark:text-rose-500"
            )}
          >
            {label}
          </label>
        )}
        <div className={inputWrapperVariants({ variant, inputSize, isInvalid })}>
          {startContent && (
            <div className="flex-shrink-0 text-zinc-500 dark:text-zinc-400 flex items-center justify-center">
              {startContent}
            </div>
          )}
          <input
            type={type}
            className="w-full h-full bg-transparent outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500 disabled:cursor-not-allowed disabled:opacity-50"
            ref={ref}
            {...props}
          />
          {endContent && (
            <div className="flex-shrink-0 text-zinc-500 dark:text-zinc-400 flex items-center justify-center">
              {endContent}
            </div>
          )}
        </div>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input, inputWrapperVariants };
