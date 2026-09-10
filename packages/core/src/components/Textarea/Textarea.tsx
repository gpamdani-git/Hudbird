import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const textareaVariants = cva(
  "flex w-full resize-y appearance-none rounded-xl text-sm shadow-sm transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        flat: "bg-zinc-100 hover:bg-zinc-200/70 focus-within:bg-white dark:bg-zinc-900/40 dark:hover:bg-zinc-800/80 dark:focus-within:bg-zinc-900 border border-transparent focus-within:border-indigo-500 dark:focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-500 dark:placeholder:text-zinc-400",
        bordered:
          "bg-transparent border border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700 focus-within:border-indigo-500 dark:focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-500 dark:placeholder:text-zinc-400",
        underlined:
          "bg-transparent rounded-none border-0 border-b-2 border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700 focus-within:border-indigo-500 dark:focus-within:border-indigo-500 px-0.5 shadow-none text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-500 dark:placeholder:text-zinc-400",
      },
    },
    defaultVariants: {
      variant: "bordered",
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, VariantProps<typeof textareaVariants> {
  isInvalid?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, isInvalid, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          textareaVariants({ variant }),
          isInvalid &&
            "border-rose-500 focus-within:border-rose-500 focus-within:ring-rose-500/20 dark:border-rose-500 dark:focus-within:border-rose-500",
          "min-h-[80px] p-3",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };
