"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { Button } from "@hudbird/ui";

export interface CtaCenteredProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  badge?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  primaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
    color?: any;
    className?: string;
  };
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
    color?: any;
    className?: string;
  };
}

export const CtaCentered = React.forwardRef<HTMLElement, CtaCenteredProps>(
  ({ className, badge, title, description, primaryAction, secondaryAction, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn("relative overflow-hidden py-24 sm:py-32", className)}
        {...props}
      >
        {/* Decorative Background Glow for Dark Mode */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 dark:opacity-100" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
            className="mx-auto max-w-3xl text-center"
          >
            {badge && (
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="mb-6 flex justify-center"
              >
                {badge}
              </motion.div>
            )}

            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-white"
            >
              {title}
            </motion.h2>

            {description && (
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="mx-auto mt-6 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400"
              >
                {description}
              </motion.p>
            )}

            {(primaryAction || secondaryAction) && (
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
              >
                {primaryAction && (
                  <Button
                    variant="solid"
                    color={primaryAction.color || "indigo"}
                    className={cn("w-full sm:w-auto", primaryAction.className)}
                    onClick={primaryAction.onClick}
                    {...(primaryAction.href ? { href: primaryAction.href, as: "a" } : {})}
                  >
                    {primaryAction.label}
                  </Button>
                )}
                {secondaryAction && (
                  <Button
                    variant="outline"
                    color={secondaryAction.color || "zinc"}
                    className={cn("w-full sm:w-auto", secondaryAction.className)}
                    onClick={secondaryAction.onClick}
                    {...(secondaryAction.href ? { href: secondaryAction.href, as: "a" } : {})}
                  >
                    {secondaryAction.label}
                  </Button>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    );
  }
);

CtaCentered.displayName = "CtaCentered";
