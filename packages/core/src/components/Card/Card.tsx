"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const cardVariants = cva(
  "inline-flex items-center justify-center transition-colors font-medium rounded-xl",
  {
    variants: {
      variant: {
        solid: "bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900",
        flat: "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "md",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

export { Card, cardVariants };
