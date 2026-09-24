"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { Check } from "lucide-react";

export interface PricingGlassTier {
  name: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
  buttonLabel: string;
  href?: string;
}

export interface PricingGlassProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  description?: string;
  tiers: PricingGlassTier[];
  isAnnual?: boolean;
  onToggleAnnual?: (isAnnual: boolean) => void;
  annualLabel?: string;
  monthlyLabel?: string;
  /**
   * Override the popular tier card border & background.
   * e.g. "border-violet-500/30 bg-violet-50/40 dark:border-violet-500/30 dark:bg-violet-500/10"
   */
  popularCardClassName?: string;
  /**
   * Override the popular tier badge (top-right pill) colors.
   * e.g. "bg-violet-500/10 text-violet-600 ring-violet-500/20 dark:bg-violet-500/20 dark:text-violet-300"
   */
  popularBadgeClassName?: string;
  /**
   * Override the popular tier check icon color.
   * e.g. "text-violet-600 dark:text-violet-400"
   */
  popularCheckClassName?: string;
  /**
   * Override the popular tier CTA button.
   * e.g. "bg-violet-600 hover:bg-violet-500 focus-visible:outline-violet-600"
   */
  popularCtaClassName?: string;
}

export const PricingGlass = React.forwardRef<HTMLElement, PricingGlassProps>(
  (
    {
      className,
      title = "Pricing Plans",
      description = "Choose the right plan for your business.",
      tiers,
      isAnnual,
      onToggleAnnual,
      annualLabel = "Annually",
      monthlyLabel = "Monthly",
      popularCardClassName = "border-blue-500/30 bg-blue-50/40 dark:border-blue-500/30 dark:bg-blue-500/10 dark:shadow-[0_8px_30px_rgba(59,130,246,0.2)]",
      popularBadgeClassName = "bg-blue-500/10 text-blue-600 ring-blue-500/20 dark:bg-blue-500/20 dark:text-blue-300",
      popularCheckClassName = "text-blue-600 dark:text-blue-400",
      popularCtaClassName = "bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline-blue-600",
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        className={cn("relative overflow-hidden py-24 sm:py-32", className)}
        {...props}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
              {description}
            </p>
          </motion.div>

          {onToggleAnnual !== undefined && isAnnual !== undefined && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-10 flex justify-center"
            >
              <div className="relative flex items-center rounded-full border border-zinc-200/50 bg-white/50 p-1 shadow-sm backdrop-blur-xl dark:border-zinc-800/50 dark:bg-black/50">
                <button
                  type="button"
                  onClick={() => onToggleAnnual(false)}
                  className={cn(
                    "relative w-32 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    !isAnnual
                      ? "text-zinc-900 dark:text-white"
                      : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  )}
                >
                  {!isAnnual && (
                    <motion.div
                      layoutId="pricing-toggle-glass"
                      className="absolute inset-0 rounded-full bg-white shadow-sm dark:bg-zinc-800"
                    />
                  )}
                  <span className="relative z-10">{monthlyLabel}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onToggleAnnual(true)}
                  className={cn(
                    "relative w-32 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    isAnnual
                      ? "text-zinc-900 dark:text-white"
                      : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  )}
                >
                  {isAnnual && (
                    <motion.div
                      layoutId="pricing-toggle-glass"
                      className="absolute inset-0 rounded-full bg-white shadow-sm dark:bg-zinc-800"
                    />
                  )}
                  <span className="relative z-10">{annualLabel}</span>
                </button>
              </div>
            </motion.div>
          )}

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {tiers.map((tier, idx) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
                className={cn(
                  "relative flex flex-col justify-between overflow-hidden rounded-[2rem] border p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-2xl transition-transform hover:-translate-y-1 sm:p-10",
                  tier.popular
                    ? popularCardClassName
                    : "border-white/50 bg-white/40 dark:border-white/10 dark:bg-black/20 dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)]"
                )}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div
                    className={cn(
                      "absolute top-6 right-6 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset",
                      popularBadgeClassName
                    )}
                  >
                    Most Popular
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{tier.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                    {tier.description}
                  </p>
                  <div className="mt-8 flex items-baseline gap-x-1">
                    <span className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
                      {tier.price}
                    </span>
                    <span className="text-sm leading-6 font-semibold text-zinc-500 dark:text-zinc-400">
                      {tier.period}
                    </span>
                  </div>

                  <ul className="mt-8 space-y-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                    {tier.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex gap-x-3">
                        <Check
                          className={cn(
                            "h-6 w-5 flex-none",
                            tier.popular ? popularCheckClassName : "text-zinc-900 dark:text-white"
                          )}
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={tier.href || "#"}
                  className={cn(
                    "mt-10 block rounded-full px-4 py-2.5 text-center text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                    tier.popular
                      ? popularCtaClassName
                      : "bg-white/50 text-zinc-900 ring-1 ring-zinc-200/50 ring-inset hover:bg-white/80 hover:ring-zinc-300/50 dark:bg-white/10 dark:text-white dark:ring-white/10 dark:hover:bg-white/20 dark:hover:ring-white/20"
                  )}
                >
                  {tier.buttonLabel}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }
);

PricingGlass.displayName = "PricingGlass";
