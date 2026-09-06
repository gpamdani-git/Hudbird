"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const inputVariants = cva(
  "flex w-full rounded-xl border bg-transparent px-3 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:focus-visible:ring-offset-slate-900",
  {
    variants: {
      variant: {
        default: "border-input border-slate-200 dark:border-slate-800 focus-visible:ring-indigo-500",
        filled: "border-transparent bg-slate-100 dark:bg-slate-800 focus-visible:ring-indigo-500",
        underlined: "rounded-none border-0 border-b-2 border-slate-200 dark:border-slate-800 px-0 focus-visible:border-indigo-500 focus-visible:ring-0",
      },
      inputSize: {
        sm: "h-8 text-xs",
        md: "h-10",
        lg: "h-12 text-base rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "md",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, error, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          inputVariants({ variant, inputSize, className }),
          error && "border-red-500 focus-visible:ring-red-500 dark:border-red-500 dark:focus-visible:ring-red-500"
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
