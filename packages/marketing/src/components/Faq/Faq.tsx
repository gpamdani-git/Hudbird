"use client";

import React from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionItem } from "@hudbird/ui";
import { cn } from "../../utils/cn";

export interface FaqItem {
  id: string | number;
  question: string;
  answer: React.ReactNode;
}

export interface FaqProps {
  label?: string;
  title?: string;
  description?: string;
  faqs?: FaqItem[];
  className?: string;
  variant?: "centered" | "side-by-side";
}

const DEFAULT_FAQS: FaqItem[] = [
  {
    id: "1",
    question: "How does the pricing work?",
    answer:
      "Our pricing is based on a monthly subscription model. You can choose between our Starter, Pro, and Enterprise plans depending on your team's size and feature requirements. There are no hidden fees or long-term contracts.",
  },
  {
    id: "2",
    question: "Can I cancel my subscription at any time?",
    answer:
      "Yes, you can cancel your subscription at any time from your account settings. Once canceled, you will continue to have access to your plan until the end of your current billing cycle.",
  },
  {
    id: "3",
    question: "Do you offer a free trial?",
    answer:
      "We offer a 14-day free trial on all our plans. You get full access to all features so you can thoroughly evaluate if our product is the right fit for your needs before committing.",
  },
  {
    id: "4",
    question: "What kind of support do you provide?",
    answer:
      "All customers receive access to our comprehensive knowledge base and email support. Pro and Enterprise customers also get priority chat support and dedicated account managers.",
  },
  {
    id: "5",
    question: "Is my data secure with your platform?",
    answer:
      "Security is our top priority. We use industry-standard encryption, regular security audits, and comply with strict data protection regulations to ensure your data is always safe and secure.",
  },
];

export function Faq({
  label = "FAQ",
  title = "Frequently asked questions",
  description = "Find answers to common questions about our platform, pricing, and features. Can't find what you're looking for? Reach out to our support team.",
  faqs = DEFAULT_FAQS,
  className,
  variant = "side-by-side",
}: FaqProps) {
  if (variant === "centered") {
    return (
      <section
        className={cn("overflow-hidden bg-white py-24 sm:py-32 dark:bg-zinc-950", className)}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="mx-auto mb-16 max-w-4xl text-center">
            {label && (
              <div className="mb-6 inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold tracking-wide text-blue-600 uppercase dark:text-blue-400">
                {label}
              </div>
            )}
            <h2 className="font-outfit text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              {title}
            </h2>
            {description && (
              <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">{description}</p>
            )}
          </div>

          <div className="mx-auto max-w-3xl">
            <Accordion variant="splitted">
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  title={faq.question}
                  classNames={{
                    trigger:
                      "group hover:bg-blue-50/50 dark:hover:bg-blue-950/30 rounded-xl transition-all duration-200",
                    title:
                      "font-outfit font-semibold text-base transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400 group-[&[aria-expanded=true]]:text-blue-600 dark:group-[&[aria-expanded=true]]:text-blue-400",
                    content: "text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed",
                  }}
                >
                  {faq.answer}
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>
      </section>
    );
  }

  // Side by Side variant
  return (
    <section className={cn("overflow-hidden bg-white py-24 sm:py-32 dark:bg-zinc-950", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:sticky lg:top-24 lg:col-span-5">
            {label && (
              <div className="mb-4 text-sm font-semibold tracking-wide text-indigo-600 uppercase dark:text-indigo-400">
                {label}
              </div>
            )}
            <h2 className="font-outfit mb-6 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              {title}
            </h2>
            {description && (
              <p className="text-lg text-zinc-600 dark:text-zinc-400">{description}</p>
            )}
          </div>
          <div className="lg:col-span-7">
            <Accordion variant="light">
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  title={faq.question}
                  classNames={{
                    trigger:
                      "group py-5 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 rounded-xl transition-all duration-200 px-3 -mx-3",
                    title:
                      "font-outfit font-semibold text-base transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400 group-[&[aria-expanded=true]]:text-blue-600 dark:group-[&[aria-expanded=true]]:text-blue-400",
                    content: "text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed px-3 -mx-3",
                  }}
                >
                  {faq.answer}
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
