// packages/core/src/components/Button/Button.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl font-medium transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:active:scale-100 dark:focus-visible:ring-offset-slate-900",
  {
    variants: {
      variant: {
        solid: "border border-transparent",
        bordered: "border-2 bg-transparent",
        flat: "border border-transparent",
        light: "bg-transparent border border-transparent",
      },
      color: {
        primary: "",
        success: "",
        danger: "",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base rounded-2xl",
      },
    },
    compoundVariants: [
      // Solid
      { variant: "solid", color: "primary", className: "bg-primary-indigo text-white hover:opacity-90" },
      { variant: "solid", color: "success", className: "bg-success text-white hover:opacity-90" },
      { variant: "solid", color: "danger", className: "bg-danger text-white hover:opacity-90" },
      // Bordered
      { variant: "bordered", color: "primary", className: "border-primary-indigo text-primary-indigo hover:bg-primary-indigo/10" },
      { variant: "bordered", color: "success", className: "border-success text-success hover:bg-success/10" },
      { variant: "bordered", color: "danger", className: "border-danger text-danger hover:bg-danger/10" },
      // Flat
      { variant: "flat", color: "primary", className: "bg-primary-indigo/20 text-primary-indigo hover:bg-primary-indigo/30" },
      { variant: "flat", color: "success", className: "bg-success/20 text-success hover:bg-success/30" },
      { variant: "flat", color: "danger", className: "bg-danger/20 text-danger hover:bg-danger/30" },
      // Light
      { variant: "light", color: "primary", className: "text-primary-indigo hover:bg-primary-indigo/10" },
      { variant: "light", color: "success", className: "text-success hover:bg-success/10" },
      { variant: "light", color: "danger", className: "text-danger hover:bg-danger/10" },
    ],
    defaultVariants: {
      variant: "solid",
      color: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, color, size, isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, color, size, className }))}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
