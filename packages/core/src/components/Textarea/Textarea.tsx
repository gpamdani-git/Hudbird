// packages/core/src/components/Textarea/Textarea.tsx
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const textareaVariants = cva(
  "flex w-full resize-y appearance-none rounded-xl text-sm transition-all duration-150 outline-none select-text disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        flat: "bg-muted hover:bg-muted/80 focus:bg-background border border-transparent dark:border-white/10 focus:border-indigo-500/60 dark:focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20 shadow-2xs text-foreground placeholder:text-muted-foreground",
        bordered:
          "bg-transparent border border-zinc-200 dark:border-white/10 hover:border-zinc-300 dark:hover:border-white/20 focus:border-indigo-500/60 dark:focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20 shadow-2xs text-foreground placeholder:text-muted-foreground",
        underlined:
          "bg-transparent rounded-none border-0 border-b-2 border-zinc-200 dark:border-white/10 hover:border-zinc-400 dark:hover:border-white/25 focus:border-indigo-500 dark:focus:border-indigo-400 px-0.5 shadow-none text-foreground placeholder:text-muted-foreground",
      },
      radius: {
        none: "rounded-none",
        md: "rounded-xl",
        lg: "rounded-2xl",
        full: "rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "bordered",
      radius: "md",
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, VariantProps<typeof textareaVariants> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  errorMessage?: React.ReactNode;
  isInvalid?: boolean;
  isDisabled?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant = "bordered",
      radius = "md",
      label,
      description,
      errorMessage,
      isInvalid = false,
      disabled = false,
      isDisabled: propIsDisabled,
      ...props
    },
    ref
  ) => {
    const resolvedDisabled = disabled || Boolean(propIsDisabled);

    const textareaElement = (
      <textarea
        className={cn(
          textareaVariants({ variant, radius }),
          isInvalid && "!border-rose-600 focus:!border-rose-600 focus:!ring-rose-600/20",
          "min-h-[120px] px-4 py-3.5 text-sm leading-relaxed",
          className
        )}
        ref={ref}
        disabled={resolvedDisabled}
        aria-invalid={isInvalid ? "true" : undefined}
        {...props}
      />
    );

    if (!label && !description && !errorMessage) {
      return textareaElement;
    }

    return (
      <div className="flex w-full flex-col text-left">
        {label && (
          <label
            className={cn(
              "mb-1.5 text-xs font-semibold tracking-tight text-zinc-800 transition-colors select-none dark:text-zinc-200",
              isInvalid ? "text-rose-600 dark:text-rose-400" : "text-foreground",
              resolvedDisabled && "cursor-not-allowed opacity-50"
            )}
          >
            {label}
          </label>
        )}

        {textareaElement}

        {isInvalid && errorMessage ? (
          <p
            role="alert"
            className="animate-in fade-in-0 slide-in-from-top-0.5 mt-1.5 flex items-center gap-1 text-xs font-medium text-rose-600 duration-150 dark:text-rose-400"
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

Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };
