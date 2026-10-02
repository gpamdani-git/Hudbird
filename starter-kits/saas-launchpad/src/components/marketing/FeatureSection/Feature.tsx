"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const featureSectionVariants = cva("py-24 sm:py-32 overflow-hidden relative", {
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

export interface FeatureSectionProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof featureSectionVariants> {}

const FeatureSection = React.forwardRef<HTMLDivElement, FeatureSectionProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(featureSectionVariants({ variant }), className)} {...props} />
    );
  }
);
FeatureSection.displayName = "FeatureSection";

const FeatureHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("relative z-10 mx-auto mb-16 max-w-7xl px-6 sm:mb-20 lg:px-8", className)}
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
FeatureHeader.displayName = "Feature.Header";

const FeatureBadge = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
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
FeatureBadge.displayName = "Feature.Badge";

const FeatureTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(
          "mt-2 text-3xl font-bold tracking-tight text-balance text-zinc-900 sm:text-4xl dark:text-white",
          className
        )}
        {...props}
      />
    );
  }
);
FeatureTitle.displayName = "Feature.Title";

const FeatureDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400", className)}
      {...props}
    />
  );
});
FeatureDescription.displayName = "Feature.Description";

// --- Grid Layout ---

const FeatureGrid = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("relative z-10 mx-auto max-w-7xl px-6 lg:px-8", className)}>
        <div
          className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
          {...props}
        />
      </div>
    );
  }
);
FeatureGrid.displayName = "Feature.Grid";

const FeatureCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { index?: number }
>(({ className, index = 0, children, ...props }, ref) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      ref={ref}
      className={cn("flex flex-col", className)}
      {...(props as any)}
    >
      {children}
    </motion.div>
  );
});
FeatureCard.displayName = "Feature.Card";

export interface FeatureIconProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Override the icon container colors.
   * e.g. "bg-violet-600 text-white ring-zinc-500/30 dark:bg-blue-500/20 dark:text-violet-400"
   */
  iconClassName?: string;
}

const FeatureIcon = React.forwardRef<HTMLDivElement, FeatureIconProps>(
  ({ className, iconClassName, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mb-6 flex h-10 w-10 items-center justify-center rounded-lg",
          iconClassName ??
            "bg-blue-600 text-white ring-1 ring-zinc-500/30 dark:bg-blue-500/20 dark:text-blue-400",
          className
        )}
        {...props}
      />
    );
  }
);
FeatureIcon.displayName = "Feature.Icon";

const FeatureCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <dt
      ref={ref}
      className={cn("text-base leading-7 font-semibold text-zinc-900 dark:text-white", className)}
      {...props}
    />
  );
});
FeatureCardTitle.displayName = "Feature.CardTitle";

const FeatureCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <dd
      ref={ref}
      className={cn(
        "mt-1 flex flex-auto flex-col text-base leading-7 text-zinc-600 dark:text-zinc-400",
        className
      )}
      {...props}
    />
  );
});
FeatureCardDescription.displayName = "Feature.CardDescription";

// --- Alternating Layout ---

const FeatureAlternating = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative z-10 mx-auto max-w-7xl space-y-24 px-6 sm:space-y-32 lg:px-8",
          className
        )}
        {...props}
      />
    );
  }
);
FeatureAlternating.displayName = "Feature.Alternating";

const FeatureRow = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { reverse?: boolean }
>(({ className, reverse = false, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("grid grid-cols-1 items-center gap-x-12 gap-y-16 lg:grid-cols-2", className)}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;

        const isText = child.type === FeatureRowContent;
        const orderClass = reverse
          ? isText
            ? "lg:order-2"
            : "lg:order-1"
          : isText
            ? "lg:order-1"
            : "lg:order-2";

        const typedChild = child as React.ReactElement<{ className?: string }>;
        return React.cloneElement(typedChild, {
          className: cn(typedChild.props.className, orderClass),
        });
      })}
    </div>
  );
});
FeatureRow.displayName = "Feature.Row";

const FeatureRowContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        ref={ref}
        className={cn("max-w-xl", className)}
        {...(props as any)}
      />
    );
  }
);
FeatureRowContent.displayName = "Feature.RowContent";

const FeatureRowMedia = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-2xl bg-zinc-100 p-2 ring-1 ring-zinc-900/10 backdrop-blur-sm sm:p-4 dark:bg-zinc-900/50 dark:ring-white/10",
          className
        )}
        {...(props as any)}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-zinc-500/10 via-transparent to-zinc-500/10" />
        {children}
      </motion.div>
    );
  }
);
FeatureRowMedia.displayName = "Feature.RowMedia";

export {
  FeatureSection,
  FeatureHeader,
  FeatureBadge,
  FeatureTitle,
  FeatureDescription,
  FeatureGrid,
  FeatureCard,
  FeatureIcon,
  FeatureCardTitle,
  FeatureCardDescription,
  FeatureAlternating,
  FeatureRow,
  FeatureRowContent,
  FeatureRowMedia,
};
