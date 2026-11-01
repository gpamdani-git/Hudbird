"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { Badge, Switch, Button } from "@hudbird/ui";

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

export interface PricingBadgeProps extends Omit<React.HTMLAttributes<HTMLHeadingElement>, "color"> {
  color?: "primary" | "secondary" | "success" | "warning" | "danger" | "info";
}

const PricingBadge = React.forwardRef<HTMLHeadingElement, PricingBadgeProps>(
  ({ className, children, color = "primary", ...props }, ref) => {
    return (
      <div className="flex justify-center">
        <Badge
          ref={ref as any}
          variant="soft"
          color={color}
          size="md"
          className={cn("mx-auto inline-flex w-fit font-semibold", className)}
          {...(props as any)}
        >
          {children}
        </Badge>
      </div>
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
  /** Override the discount badge colors (e.g. "bg-violet-50 text-violet-600 ring-violet-500/20 dark:bg-violet-500/10 dark:text-violet-400") */
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
      toggleActiveClassName = "bg-primary",
      discountClassName = "bg-primary/10 text-primary ring-1 ring-primary/20 dark:bg-primary/20 dark:text-primary-foreground",
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
        <Switch
          size="sm"
          color="primary"
          checked={isAnnual}
          onChange={() => onChange?.(!isAnnual)}
          aria-label="Toggle billing period"
        />
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
            <Badge variant="soft" color="primary" size="sm" className={discountClassName}>
              {discountLabel}
            </Badge>
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
      popularBadgeClassName = "bg-blue-600 text-white ring-blue-500/20",
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
          "relative rounded-3xl p-6 ring-1 transition-all sm:p-8",
          popular
            ? "dark:ring-primary/40 bg-zinc-900 shadow-2xl ring-zinc-900 xl:scale-105 dark:bg-[#1d1d20] dark:shadow-[0_0_50px_rgba(79,70,229,0.15)]"
            : "bg-white ring-zinc-200/80 dark:bg-[#161618] dark:ring-white/[0.08]",
          className
        )}
        {...(props as any)}
      >
        {popular && (
          <div className="absolute inset-x-0 -top-4 flex justify-center">
            <Badge
              variant="solid"
              color="primary"
              size="md"
              className={cn("font-semibold shadow-sm", popularBadgeClassName)}
            >
              {popularLabel}
            </Badge>
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
        popular
          ? "dark:text-primary-foreground text-white"
          : "text-primary dark:text-primary-foreground",
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
            checkClassName ??
              (popular
                ? "text-primary-foreground dark:text-primary"
                : "text-primary dark:text-primary-foreground")
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
