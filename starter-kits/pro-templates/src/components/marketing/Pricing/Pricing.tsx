"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

// ---------------------------------------------------------------------------
// PricingSection
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// PricingHeader
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// PricingBadge
// ---------------------------------------------------------------------------

const PricingBadge = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        className={cn(
          "mx-auto inline-flex w-fit rounded-full px-4 py-1.5 text-base leading-7 font-semibold text-blue-600 dark:text-blue-400",
          className
        )}
        {...props}
      />
    );
  }
);
PricingBadge.displayName = "Pricing.Badge";

// ---------------------------------------------------------------------------
// PricingTitle
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// PricingDescription
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// PricingToggle
// ---------------------------------------------------------------------------

export interface PricingToggleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  monthlyLabel?: string;
  annualLabel?: string;
  isAnnual?: boolean;
  onChange?: (isAnnual: boolean) => void;
  discountLabel?: string;
  /** Override the active-state color of the toggle switch (e.g. "bg-violet-600") */
  toggleActiveClassName?: string;
  /** Override the discount badge colors (e.g. "bg-zinc-100/50 text-violet-600 ring-zinc-500/20 dark:bg-blue-500/10 dark:text-violet-400") */
  discountClassName?: string;
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
      toggleActiveClassName = "bg-blue-600",
      discountClassName = "bg-zinc-100/50 text-blue-600 ring-zinc-500/20 dark:bg-blue-500/10 dark:text-blue-400",
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
            "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-offset-2 focus:outline-none",
            isAnnual ? toggleActiveClassName : "bg-zinc-200 dark:bg-zinc-700"
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
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset",
                discountClassName
              )}
            >
              {discountLabel}
            </span>
          )}
        </div>
      </div>
    );
  }
);
PricingToggle.displayName = "Pricing.Toggle";

// ---------------------------------------------------------------------------
// PricingGrid
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// PricingTier
// ---------------------------------------------------------------------------

export interface PricingTierProps extends React.HTMLAttributes<HTMLDivElement> {
  popular?: boolean;
  index?: number;
  /** Label shown in the "popular" pill badge. Default: "Most popular" */
  popularLabel?: string;
  /** Override the popular badge background/text classes (e.g. "bg-violet-600 text-white") */
  popularBadgeClassName?: string;
}

const PricingTier = React.forwardRef<HTMLDivElement, PricingTierProps>(
  (
    {
      className,
      popular,
      index = 0,
      children,
      popularLabel = "Most popular",
      popularBadgeClassName = "bg-blue-600 text-white ring-zinc-500/20",
      ...props
    },
    ref
  ) => {
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
            <span
              className={cn(
                "rounded-full px-4 py-1 text-sm leading-6 font-semibold shadow-sm ring-1 ring-inset",
                popularBadgeClassName
              )}
            >
              {popularLabel}
            </span>
          </div>
        )}
        {children}
      </motion.div>
    );
  }
);
PricingTier.displayName = "Pricing.Tier";

// ---------------------------------------------------------------------------
// PricingTierHeader
// ---------------------------------------------------------------------------

const PricingTierHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("mb-6", className)} {...props} />;
  }
);
PricingTierHeader.displayName = "Pricing.TierHeader";

// ---------------------------------------------------------------------------
// PricingTierName
// ---------------------------------------------------------------------------

const PricingTierName = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & { popular?: boolean }
>(({ className, popular, ...props }, ref) => {
  return (
    <h3
      ref={ref}
      className={cn(
        "text-lg leading-8 font-semibold",
        popular ? "text-white dark:text-blue-400" : "text-blue-600 dark:text-blue-400",
        className
      )}
      {...props}
    />
  );
});
PricingTierName.displayName = "Pricing.TierName";

// ---------------------------------------------------------------------------
// PricingTierDescription
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// PricingTierPrice
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// PricingTierFeatures
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// PricingTierFeature
// ---------------------------------------------------------------------------

export interface PricingTierFeatureProps extends React.HTMLAttributes<HTMLLIElement> {
  popular?: boolean;
  /** Override the check icon color (e.g. "text-violet-500") */
  checkClassName?: string;
}

const PricingTierFeature = React.forwardRef<HTMLLIElement, PricingTierFeatureProps>(
  ({ className, popular, children, checkClassName, ...props }, ref) => {
    return (
      <li ref={ref} className={cn("flex gap-x-3", className)} {...props}>
        <Check
          className={cn(
            "h-6 w-5 flex-none",
            // If checkClassName is explicitly provided, it wins.
            // Otherwise fall back to popular vs. default colours.
            checkClassName ?? (popular ? "text-blue-400" : "text-blue-600 dark:text-blue-400")
          )}
          aria-hidden="true"
        />
        {children}
      </li>
    );
  }
);
PricingTierFeature.displayName = "Pricing.TierFeature";

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

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
