"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { Check } from "lucide-react";
import { Badge, Button, Container } from "@hudbird/ui";

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
      popularCardClassName = "border-primary/30 bg-primary/5 dark:border-primary/30 dark:bg-primary/10 dark:shadow-[0_8px_30px_rgba(79,70,229,0.15)]",
      popularBadgeClassName = "bg-primary/10 text-primary ring-1 ring-primary/20 dark:bg-primary/20 dark:text-primary-foreground",
      popularCheckClassName = "text-primary dark:text-primary-foreground",
      popularCtaClassName = "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-primary",
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
        <Container size="xl">
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
              <div className="relative flex items-center gap-1 rounded-full border border-zinc-200/50 bg-white/50 p-1 shadow-sm backdrop-blur-xl dark:border-zinc-800/50 dark:bg-black/50">
                <Button
                  size="sm"
                  variant={!isAnnual ? "solid" : "light"}
                  radius="full"
                  onClick={() => onToggleAnnual(false)}
                  className="w-32"
                >
                  {monthlyLabel}
                </Button>
                <Button
                  size="sm"
                  variant={isAnnual ? "solid" : "light"}
                  radius="full"
                  onClick={() => onToggleAnnual(true)}
                  className="w-32"
                >
                  {annualLabel}
                </Button>
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
                  <div className="absolute top-6 right-6">
                    <Badge
                      variant="soft"
                      color="primary"
                      size="sm"
                      className={cn("font-semibold", popularBadgeClassName)}
                    >
                      Most Popular
                    </Badge>
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

                <Button
                  href={tier.href || "#"}
                  radius="full"
                  variant={tier.popular ? "solid" : "bordered"}
                  color={tier.popular ? "primary" : "secondary"}
                  className={cn("mt-10 w-full", tier.popular ? popularCtaClassName : "")}
                >
                  {tier.buttonLabel}
                </Button>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    );
  }
);

PricingGlass.displayName = "PricingGlass";
