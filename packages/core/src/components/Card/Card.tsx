// packages/core/src/components/Card/Card.tsx
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

export type CardVariant = "shadow" | "bordered" | "flat";
export type CardRadius = "none" | "md" | "lg" | "full";

const cardVariants = cva(
  "relative flex flex-col justify-between overflow-hidden text-zinc-950 dark:text-zinc-50 transition-all box-border",
  {
    variants: {
      variant: {
        shadow:
          "bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm",
        bordered:
          "bg-transparent border border-zinc-200 dark:border-zinc-800 shadow-none",
        flat: "bg-zinc-50 dark:bg-zinc-900/50 border border-transparent shadow-none",
      },
      radius: {
        none: "rounded-none",
        md: "rounded-xl",
        lg: "rounded-2xl",
        full: "rounded-3xl",
      },
      isHoverable: {
        true: "hover:-translate-y-1 hover:shadow-md transition-all duration-300 ease-in-out cursor-pointer",
        false: "",
      },
      isPressable: {
        true: "cursor-pointer active:scale-[0.98] transition-all duration-200 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950",
        false: "",
      },
    },
    defaultVariants: {
      variant: "shadow",
      radius: "lg",
      isHoverable: false,
      isPressable: false,
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  variant?: CardVariant;
  radius?: CardRadius;
  isHoverable?: boolean;
  isPressable?: boolean;
  isFooterBlurred?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "shadow",
      radius = "lg",
      isHoverable = false,
      isPressable = false,
      isFooterBlurred = false,
      children,
      tabIndex,
      role,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role={isPressable ? role ?? "button" : role}
        tabIndex={isPressable ? tabIndex ?? 0 : tabIndex}
        data-footer-blurred={isFooterBlurred ? "true" : undefined}
        className={cn(
          cardVariants({
            variant,
            radius,
            isHoverable,
            isPressable,
            className,
          })
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "p-5 flex items-center gap-3 z-10 w-full justify-start shrink-0 font-semibold text-zinc-900 dark:text-zinc-50",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CardHeader.displayName = "CardHeader";

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "p-5 pt-0 relative flex-1 w-full h-auto break-words text-left overflow-visible text-sm text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CardBody.displayName = "CardBody";

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  isBlurred?: boolean;
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, isBlurred = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "p-5 pt-0 flex items-center justify-between w-full z-10 shrink-0 border-zinc-200/50 dark:border-zinc-800/50",
          isBlurred &&
            "bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md absolute bottom-0 inset-x-0 pt-3.5 pb-3.5 border-t border-white/20 dark:border-zinc-700/30 rounded-b-2xl",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardBody, CardFooter, cardVariants };
