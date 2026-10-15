import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const textareaVariants = cva(
  "flex w-full resize-y appearance-none rounded-xl text-sm shadow-sm transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        flat: "bg-muted hover:bg-muted/80 focus-within:bg-background border border-transparent focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20 text-foreground placeholder:text-muted-foreground",
        bordered:
          "bg-transparent border border-border hover:border-foreground/30 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20 text-foreground placeholder:text-muted-foreground",
        underlined:
          "bg-transparent rounded-none border-0 border-b-2 border-border hover:border-foreground/30 focus-within:border-ring px-0.5 shadow-none text-foreground placeholder:text-muted-foreground",
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
            "!border-rose-600 focus-within:!border-rose-600 focus-within:!ring-rose-600/20",
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
