"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
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
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof featureSectionVariants> {}

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
      <div ref={ref} className={cn("mx-auto max-w-7xl px-6 lg:px-8 mb-16 sm:mb-20 relative z-10", className)} {...props}>
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
        className={cn("text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400", className)}
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
        className={cn("mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl text-balance", className)}
        {...props}
      />
    );
  }
);
FeatureTitle.displayName = "Feature.Title";

const FeatureDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn("mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400", className)}
        {...props}
      />
    );
  }
);
FeatureDescription.displayName = "Feature.Description";

// --- Grid Layout ---

const FeatureGrid = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("mx-auto max-w-7xl px-6 lg:px-8 relative z-10", className)}>
        <div
          className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
          {...props}
        />
      </div>
    );
  }
);
FeatureGrid.displayName = "Feature.Grid";

const FeatureCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { index?: number }>(
  ({ className, index = 0, children, ...props }, ref) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        ref={ref}
        className={cn("flex flex-col", className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
FeatureCard.displayName = "Feature.Card";

const FeatureIcon = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 dark:bg-indigo-500/20 text-white dark:text-indigo-400 ring-1 ring-indigo-500/30", className)}
        {...props}
      />
    );
  }
);
FeatureIcon.displayName = "Feature.Icon";

const FeatureCardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => {
    return (
      <dt ref={ref} className={cn("text-base font-semibold leading-7 text-zinc-900 dark:text-white", className)} {...props} />
    );
  }
);
FeatureCardTitle.displayName = "Feature.CardTitle";

const FeatureCardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    return (
      <dd ref={ref} className={cn("mt-1 flex flex-auto flex-col text-base leading-7 text-zinc-600 dark:text-zinc-400", className)} {...props} />
    );
  }
);
FeatureCardDescription.displayName = "Feature.CardDescription";

// --- Alternating Layout ---

const FeatureAlternating = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("mx-auto max-w-7xl px-6 lg:px-8 space-y-24 sm:space-y-32 relative z-10", className)} {...props} />
    );
  }
);
FeatureAlternating.displayName = "Feature.Alternating";

const FeatureRow = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { reverse?: boolean }>(
  ({ className, reverse = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid grid-cols-1 items-center gap-x-12 gap-y-16 lg:grid-cols-2",
          className
        )}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child;
          
          const isText = child.type === FeatureRowContent;
          const orderClass = reverse 
            ? (isText ? "lg:order-2" : "lg:order-1")
            : (isText ? "lg:order-1" : "lg:order-2");
            
          return React.cloneElement(child as React.ReactElement<any>, {
            className: cn(child.props.className, orderClass)
          });
        })}
      </div>
    );
  }
);
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
        {...props}
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
        className={cn("relative rounded-2xl bg-zinc-100 dark:bg-zinc-900/50 p-2 sm:p-4 ring-1 ring-zinc-900/10 dark:ring-white/10 overflow-hidden backdrop-blur-sm", className)}
        {...props}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-purple-500/10 pointer-events-none" />
        <div className="relative rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl">
          {children}
        </div>
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
