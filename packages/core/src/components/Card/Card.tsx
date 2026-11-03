// packages/core/src/components/Card/Card.tsx
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

export type CardVariant = "shadow" | "bordered" | "flat";
export type CardRadius = "none" | "md" | "lg" | "full" | "capsule";
export type CardBodyPadding = "default" | "compact" | "capsule" | "none";

const cardVariants = cva(
  "relative flex flex-col justify-between overflow-hidden text-card-foreground transition-all box-border",
  {
    variants: {
      variant: {
        shadow:
          "bg-white dark:bg-[#161618] border border-zinc-200/90 dark:border-white/[0.08] shadow-[0_4px_16px_-4px_rgba(0,0,0,0.06),0_1px_3px_-1px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_-6px_rgba(0,0,0,0.08)] transition-all duration-200",
        bordered:
          "bg-white/80 dark:bg-[#161618]/80 backdrop-blur-xl border border-zinc-200/90 dark:border-white/[0.08] shadow-xs",
        flat: "bg-zinc-100/80 dark:bg-[#1e1e22] border border-black/[0.04] dark:border-white/[0.04] shadow-none",
      },
      radius: {
        none: "rounded-none",
        md: "rounded-xl",
        lg: "rounded-2xl",
        full: "rounded-3xl",
        capsule: "rounded-full",
      },
      isHoverable: {
        true: "hover:-translate-y-1 hover:shadow-md transition-all duration-200 ease-out cursor-pointer hover:border-black/15 dark:hover:border-white/20",
        false: "",
      },
      isPressable: {
        true: "cursor-pointer active:scale-[0.98] transition-all duration-150 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#161618]",
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
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
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
        role={isPressable ? (role ?? "button") : role}
        tabIndex={isPressable ? (tabIndex ?? 0) : tabIndex}
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
          "z-10 flex w-full shrink-0 items-center justify-between gap-3 px-6 pt-6 pb-2 font-semibold tracking-tight text-zinc-950 dark:text-zinc-50",
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

const cardBodyPaddingClasses: Record<CardBodyPadding, string> = {
  default: "px-6 py-4 leading-relaxed",
  compact: "px-4 py-3 leading-normal",
  capsule: "p-2.5 leading-none",
  none: "p-0",
};

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: CardBodyPadding;
}

const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, padding = "default", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative h-auto w-full flex-1 overflow-visible text-left text-sm font-normal break-words text-zinc-600 dark:text-zinc-400",
          cardBodyPaddingClasses[padding],
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
          "z-10 flex w-full shrink-0 items-center justify-between px-6 pt-2 pb-6 text-xs font-medium text-zinc-500 dark:text-zinc-400",
          isBlurred &&
            "absolute inset-x-0 bottom-0 rounded-b-2xl border-t border-black/[0.08] bg-white/70 px-6 py-3.5 backdrop-blur-xl dark:border-white/10 dark:bg-[#161618]/70",
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
