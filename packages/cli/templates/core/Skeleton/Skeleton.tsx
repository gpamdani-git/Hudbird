import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const skeletonVariants = cva("block bg-zinc-200/80 dark:bg-zinc-800/80 shrink-0", {
  variants: {
    variant: {
      rect: "rounded-xl",
      circle: "rounded-full",
      text: "rounded-md h-4 w-full",
    },
    animation: {
      pulse: "animate-pulse",
      wave: "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/20 dark:before:via-white/10 before:to-transparent",
      none: "",
    },
  },
  defaultVariants: {
    variant: "rect",
    animation: "pulse",
  },
});

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof skeletonVariants> {}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, animation, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ variant, animation, className }))}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

export { Skeleton, skeletonVariants };
