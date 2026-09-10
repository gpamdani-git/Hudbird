"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { Card, CardHeader, CardBody, CardFooter } from "@hudbird/ui";
import { motion, HTMLMotionProps } from "framer-motion";
import { Slot } from "@radix-ui/react-slot";

// ----------------------------------------------------------------------
// BentoGrid Container
// ----------------------------------------------------------------------

export interface BentoGridProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
}

export const BentoGrid = React.forwardRef<HTMLElement, BentoGridProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "section";
    return (
      <Comp
        ref={ref}
        className={cn(
          "grid w-full auto-rows-[22rem] grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-4",
          className
        )}
        {...props}
      />
    );
  }
);
BentoGrid.displayName = "BentoGrid";

// ----------------------------------------------------------------------
// BentoCard
// ----------------------------------------------------------------------

// Safely create a Motion component from our Core Card
// Compatible with both Framer Motion v11 and v12+
const MotionCard = (motion as any).create ? (motion as any).create(Card) : (motion as any)(Card);

export interface BentoCardProps extends React.ComponentProps<typeof MotionCard> {}

export const BentoCard = React.forwardRef<HTMLDivElement, BentoCardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <MotionCard
        ref={ref}
        whileHover={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className={cn("group relative h-full w-full overflow-hidden", className)}
        {...props}
      >
        {children}
      </MotionCard>
    );
  }
);
BentoCard.displayName = "BentoCard";

// ----------------------------------------------------------------------
// BentoCardBackground
// ----------------------------------------------------------------------

export interface BentoCardBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
}

export const BentoCardBackground = React.forwardRef<HTMLDivElement, BentoCardBackgroundProps>(
  ({ className, src, alt = "background", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("absolute inset-0 z-0 overflow-hidden rounded-[inherit]", className)}
        {...props}
      >
        {src && (
          <motion.img
            src={src}
            alt={alt}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        {children}
      </div>
    );
  }
);
BentoCardBackground.displayName = "BentoCardBackground";

// ----------------------------------------------------------------------
// BentoCardContent
// ----------------------------------------------------------------------

export interface BentoCardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const BentoCardContent = React.forwardRef<HTMLDivElement, BentoCardContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("relative z-10 flex h-full flex-col justify-between", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
BentoCardContent.displayName = "BentoCardContent";

// Export standard Card pieces with semantic Bento aliases to maintain the namespace
export { CardHeader as BentoCardHeader, CardBody as BentoCardBody, CardFooter as BentoCardFooter };
