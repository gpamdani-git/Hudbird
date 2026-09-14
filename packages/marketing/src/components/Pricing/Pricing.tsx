"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

const pricingSectionVariants = cva("py-24 sm:py-32 overflow-hidden", {
  variants: {
    variant: {
      default: "bg-white dark:bg-zinc-950",
      subtle: "bg-zinc-50 dark:bg-[#0a0a0a]",
      transparent: "bg-transparent",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface PricingSectionProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof pricingSectionVariants> {}

const PricingSection = React.forwardRef<HTMLDivElement, PricingSectionProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(pricingSectionVariants({ variant }), className)} {...props} />
    );
  }
);
PricingSection.displayName = "PricingSection";

const PricingHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("mx-auto mb-16 max-w-7xl px-6 sm:mb-20 lg:px-8", className)}
        {...props}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          {children}
        </motion.div>
      </div>
    );
  }
);
PricingHeader.displayName = "Pricing.Header";

const PricingBadge = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        className={cn(
          "mx-auto inline-flex w-fit rounded-full px-4 py-1.5 text-base leading-7 font-semibold text-indigo-600 dark:text-indigo-400",
          className
        )}
        {...props}
      />
    );
  }
);
PricingBadge.displayName = "Pricing.Badge";

const PricingTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(
          "mt-2 text-4xl font-bold tracking-tight text-balance text-zinc-900 sm:text-5xl dark:text-white",
          className
        )}
        {...props}
      />
    );
  }
);
PricingTitle.displayName = "Pricing.Title";

const PricingDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(
        "mx-auto mt-6 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400",
        className
      )}
      {...props}
    />
  );
});
PricingDescription.displayName = "Pricing.Description";

// --- Toggle ---

export interface PricingToggleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  monthlyLabel?: string;
  annualLabel?: string;
  isAnnual?: boolean;
  onChange?: (isAnnual: boolean) => void;
  discountLabel?: string;
}

const PricingToggle = React.forwardRef<HTMLDivElement, PricingToggleProps>(
  (
    {
      className,
      monthlyLabel = "Monthly",
      annualLabel = "Annually",
      isAnnual = false,
      onChange,
      discountLabel = "Save 20%",
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("mt-8 flex items-center justify-center gap-4", className)}
        {...props}
      >
        <span
          className={cn(
            "text-sm font-semibold",
            !isAnnual ? "text-zinc-900 dark:text-white" : "text-zinc-500 dark:text-zinc-400"
          )}
        >
          {monthlyLabel}
        </span>
        <button
          type="button"
          onClick={() => onChange?.(!isAnnual)}
          className={cn(
            "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:outline-none",
            isAnnual ? "bg-indigo-600" : "bg-zinc-200 dark:bg-zinc-700"
          )}
          role="switch"
          aria-checked={isAnnual}
        >
          <span className="sr-only">Toggle billing period</span>
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-1 ring-zinc-900/5 transition duration-200 ease-in-out",
              isAnnual ? "translate-x-5" : "translate-x-0"
            )}
          />
        </button>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "text-sm font-semibold",
              isAnnual ? "text-zinc-900 dark:text-white" : "text-zinc-500 dark:text-zinc-400"
            )}
          >
            {annualLabel}
          </span>
          {discountLabel && (
            <span className="inline-flex items-center rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-600 ring-1 ring-indigo-500/20 ring-inset dark:bg-indigo-500/10 dark:text-indigo-400">
              {discountLabel}
            </span>
          )}
        </div>
      </div>
    );
  }
);
PricingToggle.displayName = "Pricing.Toggle";

// --- Grid ---

const PricingGrid = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("relative z-10 mx-auto max-w-7xl px-6 lg:px-8", className)}>
        <div
          className="mx-auto grid max-w-md grid-cols-1 items-center gap-8 lg:max-w-4xl lg:grid-cols-2 xl:max-w-5xl xl:grid-cols-3"
          {...props}
        />
      </div>
    );
  }
);
PricingGrid.displayName = "Pricing.Grid";

export interface PricingTierProps extends React.HTMLAttributes<HTMLDivElement> {
  popular?: boolean;
  index?: number;
}

const PricingTier = React.forwardRef<HTMLDivElement, PricingTierProps>(
  ({ className, popular, index = 0, children, ...props }, ref) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        ref={ref}
        className={cn(
          "relative rounded-3xl p-8 ring-1",
          popular
            ? "bg-zinc-900 shadow-2xl ring-zinc-900 xl:scale-105 dark:bg-white/5 dark:ring-white/20"
            : "bg-white ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800",
          className
        )}
        {...(props as any)}
      >
        {popular && (
          <div className="absolute inset-x-0 -top-4 flex justify-center">
            <span className="rounded-full bg-indigo-600 px-4 py-1 text-sm leading-6 font-semibold text-white shadow-sm ring-1 ring-indigo-500/20 ring-inset">
              Most popular
            </span>
          </div>
        )}
        {children}
      </motion.div>
    );
  }
);
PricingTier.displayName = "Pricing.Tier";

const PricingTierHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("mb-6", className)} {...props} />;
  }
);
PricingTierHeader.displayName = "Pricing.TierHeader";

const PricingTierName = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & { popular?: boolean }
>(({ className, popular, ...props }, ref) => {
  return (
    <h3
      ref={ref}
      className={cn(
        "text-lg leading-8 font-semibold",
        popular ? "text-white dark:text-indigo-400" : "text-indigo-600 dark:text-indigo-400",
        className
      )}
      {...props}
    />
  );
});
PricingTierName.displayName = "Pricing.TierName";

const PricingTierDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & { popular?: boolean }
>(({ className, popular, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(
        "mt-4 text-sm leading-6",
        popular ? "text-zinc-300 dark:text-zinc-400" : "text-zinc-600 dark:text-zinc-400",
        className
      )}
      {...props}
    />
  );
});
PricingTierDescription.displayName = "Pricing.TierDescription";

const PricingTierPrice = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    popular?: boolean;
    price: React.ReactNode;
    period?: React.ReactNode;
    priceClassName?: string;
    periodClassName?: string;
  }
>(({ className, popular, price, period, priceClassName, periodClassName, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("mt-6 flex items-baseline gap-x-1", className)} {...props}>
      <AnimatePresence mode="wait">
        <motion.span
          key={price?.toString()}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "text-4xl font-bold tracking-tight",
            popular ? "text-white" : "text-zinc-900 dark:text-white",
            priceClassName
          )}
        >
          {price}
        </motion.span>
      </AnimatePresence>
      {period && (
        <span
          className={cn(
            "text-sm leading-6 font-semibold",
            popular ? "text-zinc-300" : "text-zinc-600 dark:text-zinc-400",
            periodClassName
          )}
        >
          {period}
        </span>
      )}
    </div>
  );
});
PricingTierPrice.displayName = "Pricing.TierPrice";

const PricingTierFeatures = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement> & { popular?: boolean }
>(({ className, popular, ...props }, ref) => {
  return (
    <ul
      ref={ref}
      role="list"
      className={cn(
        "mt-8 space-y-3 text-sm leading-6",
        popular ? "text-zinc-300" : "text-zinc-600 dark:text-zinc-400",
        className
      )}
      {...props}
    />
  );
});
PricingTierFeatures.displayName = "Pricing.TierFeatures";

const PricingTierFeature = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement> & { popular?: boolean }
>(({ className, popular, children, ...props }, ref) => {
  return (
    <li ref={ref} className={cn("flex gap-x-3", className)} {...props}>
      <Check
        className={cn(
          "h-6 w-5 flex-none",
          popular ? "text-indigo-400" : "text-indigo-600 dark:text-indigo-400"
        )}
        aria-hidden="true"
      />
      {children}
    </li>
  );
});
PricingTierFeature.displayName = "Pricing.TierFeature";

export {
  PricingSection,
  PricingHeader,
  PricingBadge,
  PricingTitle,
  PricingDescription,
  PricingToggle,
  PricingGrid,
  PricingTier,
  PricingTierHeader,
  PricingTierName,
  PricingTierDescription,
  PricingTierPrice,
  PricingTierFeatures,
  PricingTierFeature,
};
