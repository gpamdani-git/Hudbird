"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { Accordion, AccordionItem } from "@hudbird/ui";
import { FaqItem } from "./Faq";

export interface FaqGlassProps {
  label?: string;
  title?: string;
  description?: string;
  faqs: FaqItem[];
  className?: string;
  /**
   * Override the label text color.
   * e.g. "text-violet-600 dark:text-violet-400"
   */
  labelClassName?: string;
}

export const FaqGlass: React.FC<FaqGlassProps> = ({
  label,
  title = "Frequently Asked Questions",
  description,
  faqs,
  className,
  labelClassName = "text-blue-600 dark:text-blue-400",
}) => {
  return (
    <section className={cn("relative overflow-hidden py-24 sm:py-32", className)}>
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          {label && (
            <p className={cn("text-sm leading-7 font-semibold", labelClassName)}>{label}</p>
          )}
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
            {title}
          </h2>
          {description && (
            <p className="mt-6 text-base leading-8 text-zinc-600 dark:text-zinc-400">
              {description}
            </p>
          )}
        </motion.div>

        <Accordion variant="bordered" className="space-y-4">
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={faq.id ?? idx}
              itemKey={String(faq.id ?? idx)}
              title={faq.question}
              className="rounded-2xl border-white/50 bg-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/40 dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)]"
            >
              <div className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">{faq.answer}</div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

FaqGlass.displayName = "FaqGlass";
