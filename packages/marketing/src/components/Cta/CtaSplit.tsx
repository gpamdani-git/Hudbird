"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { Button } from "@hudbird/ui";

export interface CtaSplitProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  badge?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  primaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

export const CtaSplit = React.forwardRef<HTMLElement, CtaSplitProps>(
  (
    {
      className,
      badge,
      title,
      description,
      imageSrc,
      imageAlt = "Call to action graphic",
      primaryAction,
      secondaryAction,
      ...props
    },
    ref
  ) => {
    return (
      <section ref={ref} className={cn("overflow-hidden py-24 sm:py-32", className)} {...props}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center lg:gap-8">
            {/* Left Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 },
                },
              }}
              className="max-w-xl"
            >
              {badge && (
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                  }}
                  className="mb-6"
                >
                  {badge}
                </motion.div>
              )}

              <motion.h2
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                }}
                className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-white"
              >
                {title}
              </motion.h2>

              {description && (
                <motion.p
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                  }}
                  className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400"
                >
                  {description}
                </motion.p>
              )}

              {(primaryAction || secondaryAction) && (
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                  }}
                  className="mt-10 flex flex-col gap-4 sm:flex-row"
                >
                  {primaryAction && (
                    <Button
                      variant="solid"
                      color="indigo"
                      className="w-full sm:w-auto"
                      onClick={primaryAction.onClick}
                      {...(primaryAction.href ? { href: primaryAction.href, as: "a" } : {})}
                    >
                      {primaryAction.label}
                    </Button>
                  )}
                  {secondaryAction && (
                    <Button
                      variant="outline"
                      color="zinc"
                      className="w-full sm:w-auto"
                      onClick={secondaryAction.onClick}
                      {...(secondaryAction.href ? { href: secondaryAction.href, as: "a" } : {})}
                    >
                      {secondaryAction.label}
                    </Button>
                  )}
                </motion.div>
              )}
            </motion.div>

            {/* Right Graphic */}
            {imageSrc && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative lg:ml-auto"
              >
                <div className="relative rounded-2xl bg-zinc-100 p-2 shadow-2xl ring-1 ring-zinc-900/5 dark:bg-zinc-800/50 dark:ring-white/10">
                  <img src={imageSrc} alt={imageAlt} className="rounded-xl object-cover" />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    );
  }
);

CtaSplit.displayName = "CtaSplit";
