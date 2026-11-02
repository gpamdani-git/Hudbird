"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Accordion, AccordionItem, Badge, Button, Container } from "@hudbird/ui";
import { cn } from "../../utils/cn";
import { FaqItem } from "./Faq";

export interface FaqCategory {
  id: string;
  label: string;
  icon?: React.ReactNode;
  faqs: FaqItem[];
}

export interface FaqCategorizedProps {
  label?: string;
  title?: string;
  categories: FaqCategory[];
  className?: string;
  /**
   * Override the active category tab & accordion accent color.
   * Provide two space-separated classes for light/dark:
   * e.g. "text-violet-600 dark:text-violet-400"
   * The active tab bg is derived automatically.
   */
  accentClassName?: string;
}

export function FaqCategorized({
  label = "HOW TO GET STARTED",
  title = "Frequently asked questions",
  categories,
  className,
  accentClassName = "text-primary dark:text-primary-foreground",
}: FaqCategorizedProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    categories.length > 0 ? categories[0].id : ""
  );

  const activeCategory = categories.find((c) => c.id === activeCategoryId) || categories[0];

  return (
    <section
      className={cn("overflow-hidden bg-zinc-50 py-24 sm:py-32 dark:bg-zinc-900/50", className)}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <Container size="xl">
          <div className="rounded-3xl border border-zinc-200/50 bg-white p-8 shadow-sm sm:p-12 lg:p-16 dark:border-zinc-800/50 dark:bg-zinc-950">
            <div className="mb-12 lg:mb-16">
              {label && (
                <div
                  className={cn(
                    "mb-4 text-xs font-bold tracking-widest uppercase",
                    accentClassName
                  )}
                >
                  {label}
                </div>
              )}
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
                {title}
              </h2>
            </div>

            <div className="flex flex-col items-start gap-12 lg:flex-row lg:gap-16">
              {/* Left Tabs */}
              <div className="hide-scrollbar flex w-full shrink-0 flex-row gap-2 overflow-x-auto pb-4 lg:w-1/4 lg:flex-col lg:overflow-visible lg:border-r lg:border-zinc-200 lg:pr-6 lg:pb-0 dark:lg:border-zinc-800">
                {categories.map((category) => {
                  const isActive = activeCategoryId === category.id;
                  return (
                    <Button
                      key={category.id}
                      onClick={() => setActiveCategoryId(category.id)}
                      variant={isActive ? "flat" : "light"}
                      color={isActive ? "primary" : "secondary"}
                      startContent={category.icon}
                      className="w-auto justify-start text-sm font-medium lg:w-full"
                    >
                      {category.label}
                    </Button>
                  );
                })}
              </div>

              {/* Right Accordion Area */}
              <div className="relative min-h-[300px] w-full lg:flex-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCategoryId}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {activeCategory ? (
                      <Accordion variant="light" className="gap-0 space-y-0">
                        {activeCategory.faqs.map((faq) => (
                          <AccordionItem
                            key={faq.id}
                            title={faq.question}
                            classNames={{
                              base: "border-b border-zinc-100 dark:border-zinc-800/60 last:border-0",
                              title: cn(
                                "font-medium text-[15px] transition-colors",
                                `group-hover:${accentClassName} group-[[aria-expanded=true]]:${accentClassName}`
                              ),
                              content:
                                "text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed px-2",
                              trigger:
                                "group py-5 px-2 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20 rounded-md transition-colors",
                              indicator: cn(
                                "text-zinc-400 transition-colors",
                                `group-hover:${accentClassName} group-[[aria-expanded=true]]:${accentClassName}`
                              ),
                            }}
                          >
                            {faq.answer}
                          </AccordionItem>
                        ))}
                      </Accordion>
                    ) : (
                      <div className="py-8 text-zinc-500">No FAQs available for this category.</div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Container>
      </motion.div>
    </section>
  );
}
