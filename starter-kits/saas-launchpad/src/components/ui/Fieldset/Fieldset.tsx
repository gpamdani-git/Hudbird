// packages/core/src/components/Fieldset/Fieldset.tsx
"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export type FieldsetVariant = "flat" | "bordered" | "card";
export type FieldsetLayout = "stacked" | "side-by-side" | "horizontal-labels";

interface FieldsetContextValue {
  disabled?: boolean;
  isInvalid?: boolean;
  variant?: FieldsetVariant;
  layout?: FieldsetLayout;
}

const FieldsetContext = React.createContext<FieldsetContextValue>({
  disabled: false,
  isInvalid: false,
  variant: "flat",
  layout: "stacked",
});

export const useFieldset = () => React.useContext(FieldsetContext);

const fieldsetVariants = cva("w-full transition-all duration-200", {
  variants: {
    variant: {
      flat: "p-0 border-0 bg-transparent",
      bordered:
        "border border-zinc-200/80 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/30 rounded-2xl p-6 sm:p-7 shadow-xs",
      card: "border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/60 rounded-2xl p-6 sm:p-7 shadow-sm",
    },
    layout: {
      stacked: "flex flex-col gap-5",
      "side-by-side": "grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start",
      "horizontal-labels": "flex flex-col gap-5",
    },
    isInvalid: {
      true: "",
      false: "",
    },
    disabled: {
      true: "opacity-50 pointer-events-none select-none cursor-not-allowed",
      false: "",
    },
  },
  compoundVariants: [
    {
      variant: "bordered",
      isInvalid: true,
      className: "border-zinc-300 dark:border-rose-900/60 bg-zinc-100/50/10 dark:bg-rose-950/10",
    },
    {
      variant: "card",
      isInvalid: true,
      className: "border-zinc-300 dark:border-rose-900/60 bg-zinc-100/50/20 dark:bg-rose-950/20",
    },
  ],
  defaultVariants: {
    variant: "flat",
    layout: "stacked",
    isInvalid: false,
    disabled: false,
  },
});

export interface FieldsetProps
  extends React.FieldsetHTMLAttributes<HTMLFieldSetElement>, VariantProps<typeof fieldsetVariants> {
  variant?: FieldsetVariant;
  layout?: FieldsetLayout;
  isInvalid?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

const Fieldset = React.forwardRef<HTMLFieldSetElement, FieldsetProps>(
  (
    {
      className,
      variant = "flat",
      layout = "stacked",
      isInvalid = false,
      disabled = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <FieldsetContext.Provider value={{ disabled, isInvalid, variant, layout }}>
        <fieldset
          ref={ref}
          disabled={disabled}
          aria-invalid={isInvalid ? "true" : undefined}
          className={cn(fieldsetVariants({ variant, layout, isInvalid, disabled }), className)}
          {...props}
        >
          {children}
        </fieldset>
      </FieldsetContext.Provider>
    );
  }
);
Fieldset.displayName = "Fieldset";

export interface FieldsetHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const FieldsetHeader = React.forwardRef<HTMLDivElement, FieldsetHeaderProps>(
  ({ className, children, ...props }, ref) => {
    const { layout } = React.useContext(FieldsetContext);

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-1.5",
          layout === "side-by-side" && "lg:sticky lg:top-24 lg:col-span-4",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
FieldsetHeader.displayName = "FieldsetHeader";

export interface FieldsetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const FieldsetContent = React.forwardRef<HTMLDivElement, FieldsetContentProps>(
  ({ className, children, ...props }, ref) => {
    const { layout } = React.useContext(FieldsetContext);

    return (
      <div
        ref={ref}
        className={cn(
          "flex w-full min-w-0 flex-col gap-4",
          layout === "side-by-side" && "lg:col-span-8",
          layout === "horizontal-labels" && "space-y-4",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
FieldsetContent.displayName = "FieldsetContent";

export interface FieldsetRowProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  isInvalid?: boolean;
  children: React.ReactNode;
}

const FieldsetRow = React.forwardRef<HTMLDivElement, FieldsetRowProps>(
  ({ className, label, description, isInvalid = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid grid-cols-1 items-start gap-2 py-1 sm:grid-cols-12 sm:gap-6",
          className
        )}
        {...props}
      >
        {label && (
          <div className="pt-2 sm:col-span-4">
            <label
              className={cn(
                "block text-sm leading-tight font-medium text-zinc-900 dark:text-zinc-100",
                isInvalid && "text-rose-600 dark:text-rose-400"
              )}
            >
              {label}
            </label>
            {description && (
              <p className="mt-0.5 text-xs leading-normal text-zinc-500 dark:text-zinc-400">
                {description}
              </p>
            )}
          </div>
        )}
        <div className={cn("w-full min-w-0", label ? "sm:col-span-8" : "sm:col-span-12")}>
          {children}
        </div>
      </div>
    );
  }
);
FieldsetRow.displayName = "FieldsetRow";

export interface FieldsetLegendProps extends React.HTMLAttributes<HTMLLegendElement> {
  children: React.ReactNode;
}

const FieldsetLegend = React.forwardRef<HTMLLegendElement, FieldsetLegendProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <legend
        ref={ref}
        className={cn(
          "text-base leading-snug font-semibold tracking-tight text-zinc-900 select-none dark:text-zinc-50",
          className
        )}
        {...props}
      >
        {children}
      </legend>
    );
  }
);
FieldsetLegend.displayName = "FieldsetLegend";

export interface FieldsetHelperTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

const FieldsetHelperText = React.forwardRef<HTMLParagraphElement, FieldsetHelperTextProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(
          "text-xs leading-relaxed font-normal text-zinc-500 sm:text-sm dark:text-zinc-400",
          className
        )}
        {...props}
      >
        {children}
      </p>
    );
  }
);
FieldsetHelperText.displayName = "FieldsetHelperText";

export interface FieldsetErrorTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  forceShow?: boolean;
  children: React.ReactNode;
}

const FieldsetErrorText = React.forwardRef<HTMLParagraphElement, FieldsetErrorTextProps>(
  ({ className, forceShow = false, children, ...props }, ref) => {
    const { isInvalid } = React.useContext(FieldsetContext);

    if (!isInvalid && !forceShow) return null;

    return (
      <p
        ref={ref}
        role="alert"
        className={cn(
          "animate-in fade-in-0 slide-in-from-top-0.5 mt-1 flex items-center gap-1.5 text-xs font-medium text-rose-600 duration-150 dark:text-rose-400",
          className
        )}
        {...props}
      >
        <svg
          className="h-3.5 w-3.5 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span>{children}</span>
      </p>
    );
  }
);
FieldsetErrorText.displayName = "FieldsetErrorText";

export {
  Fieldset,
  FieldsetHeader,
  FieldsetContent,
  FieldsetRow,
  FieldsetLegend,
  FieldsetHelperText,
  FieldsetErrorText,
  fieldsetVariants,
};
