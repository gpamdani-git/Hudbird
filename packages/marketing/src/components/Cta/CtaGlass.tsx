"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { Button } from "@hudbird/ui";

export interface CtaGlassProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  badge?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
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

export const CtaGlass = React.forwardRef<HTMLElement, CtaGlassProps>(
  ({ className, badge, title, description, primaryAction, secondaryAction, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn("relative overflow-hidden py-24 sm:py-32", className)}
        {...props}
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-[2rem] border border-white/50 bg-white/40 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-2xl sm:p-16 dark:border-white/10 dark:bg-black/20 dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)]"
          >
            <div className="relative z-10 mx-auto max-w-3xl text-center">
              {badge && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="mb-6 flex justify-center"
                >
                  {badge}
                </motion.div>
              )}

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-white"
              >
                {title}
              </motion.h2>

              {description && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400"
                >
                  {description}
                </motion.p>
              )}

              {(primaryAction || secondaryAction) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
                >
                  {primaryAction && (
                    <Button
                      size="lg"
                      variant="solid"
                      color="zinc"
                      onClick={primaryAction.onClick}
                      {...(primaryAction.href ? { href: primaryAction.href } : {})}
                      className="w-full sm:w-auto"
                    >
                      {primaryAction.label}
                    </Button>
                  )}
                  {secondaryAction && (
                    <Button
                      size="lg"
                      variant="outline"
                      color="zinc"
                      onClick={secondaryAction.onClick}
                      {...(secondaryAction.href ? { href: secondaryAction.href } : {})}
                      className="w-full bg-white/50 backdrop-blur-md sm:w-auto dark:bg-black/50"
                    >
                      {secondaryAction.label}
                    </Button>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    );
  }
);

CtaGlass.displayName = "CtaGlass";
