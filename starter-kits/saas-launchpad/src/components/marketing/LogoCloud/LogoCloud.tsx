"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { motion } from "framer-motion";

const logoCloudVariants = cva("py-16 sm:py-24", {
  variants: {
    variant: {
      default: "bg-white dark:bg-zinc-950",
      subtle: "bg-zinc-50 dark:bg-zinc-900/50",
      transparent: "bg-transparent",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface LogoCloudProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof logoCloudVariants> {}

const LogoCloud = React.forwardRef<HTMLDivElement, LogoCloudProps>(
  ({ className, variant, ...props }, ref) => {
    return <div ref={ref} className={cn(logoCloudVariants({ variant }), className)} {...props} />;
  }
);
LogoCloud.displayName = "LogoCloud";

const LogoCloudTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h2
      ref={ref}
      className={cn(
        "text-center text-base leading-8 font-semibold text-zinc-900 sm:text-lg md:text-xl dark:text-zinc-100",
        className
      )}
      {...props}
    />
  );
});
LogoCloudTitle.displayName = "LogoCloud.Title";

const LogoCloudGrid = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto mt-10 grid max-w-lg grid-cols-4 items-center justify-items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:max-w-none lg:grid-cols-5",
          className
        )}
        {...props}
      />
    );
  }
);
LogoCloudGrid.displayName = "LogoCloud.Grid";

const LogoCloudItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "col-span-2 flex max-h-12 w-full justify-center object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 lg:col-span-1",
          className
        )}
        {...props}
      />
    );
  }
);
LogoCloudItem.displayName = "LogoCloud.Item";

export interface LogoCloudTickerProps extends React.HTMLAttributes<HTMLDivElement> {
  speed?: "fast" | "normal" | "slow";
  direction?: "left" | "right";
}

const LogoCloudTicker = React.forwardRef<HTMLDivElement, LogoCloudTickerProps>(
  ({ className, children, speed = "normal", direction = "left", ...props }, ref) => {
    const duration = speed === "fast" ? 10 : speed === "slow" ? 40 : 25;

    return (
      <div
        ref={ref}
        className={cn("relative mt-10 flex w-full overflow-hidden", className)}
        {...props}
      >
        {/* Left and Right Fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/3 bg-gradient-to-r from-white to-transparent dark:from-zinc-950"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-1/3 bg-gradient-to-l from-white to-transparent dark:from-zinc-950"></div>

        <div className="group flex overflow-hidden">
          <motion.div
            className="flex min-w-full shrink-0 items-center justify-around gap-16 py-4 pr-16"
            animate={{ x: direction === "left" ? ["0%", "-100%"] : ["-100%", "0%"] }}
            transition={{ duration, ease: "linear", repeat: Infinity }}
          >
            {children}
          </motion.div>
          <motion.div
            className="flex min-w-full shrink-0 items-center justify-around gap-16 py-4 pr-16"
            animate={{ x: direction === "left" ? ["0%", "-100%"] : ["-100%", "0%"] }}
            transition={{ duration, ease: "linear", repeat: Infinity }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    );
  }
);
LogoCloudTicker.displayName = "LogoCloud.Ticker";

export { LogoCloud, LogoCloudTitle, LogoCloudGrid, LogoCloudItem, LogoCloudTicker };
