"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { ChevronDown } from "lucide-react";
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
  const [openId, setOpenId] = useState<string | number | null>(null);

  const toggleOpen = (id: string | number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

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

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="overflow-hidden rounded-2xl border border-white/50 bg-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/40 dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)]"
              >
                <button
                  onClick={() => toggleOpen(faq.id)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left text-base font-medium text-zinc-900 transition-colors hover:bg-white/50 focus:outline-none dark:text-zinc-100 dark:hover:bg-zinc-800/50"
                >
                  <span>{faq.question}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-100/50 text-zinc-500 dark:bg-zinc-800/50 dark:text-zinc-400"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pt-0 pb-5 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

FaqGlass.displayName = "FaqGlass";
