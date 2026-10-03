import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What exactly is included in Hudbird UI PRO?",
    answer:
      "You get full source code access to 7+ premium full-page templates, 100+ core UI components, Admin CMS dashboards, and the marketing block gallery. Everything is built with React, Tailwind CSS v4, and Framer Motion.",
  },
  {
    question: "Is this a subscription?",
    answer:
      "No, it's a one-time purchase. You get lifetime access to the code, plus free updates for all future components and templates we add to the PRO tier.",
  },
  {
    question: "Can I use it for commercial projects?",
    answer:
      "Yes! You can use Hudbird UI PRO for an unlimited number of personal and commercial projects, including SaaS applications, client websites, and internal tools. The only restriction is that you cannot redistribute or resell the templates themselves as UI kits.",
  },
  {
    question: "What frameworks are supported?",
    answer:
      "Currently, all components and templates are built for React. They are easily adaptable to Next.js, Vite, or Remix, as long as you are using Tailwind CSS v4.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Due to the non-returnable nature of digital products and source code, we do not offer refunds once you have accessed the repository. Please explore our live previews to ensure it meets your needs before purchasing.",
  },
];

export function ShowcaseFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative w-full bg-zinc-50 py-24 dark:bg-zinc-950">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white"
          >
            Frequently asked questions
          </motion.h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                key={index}
                className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-semibold text-zinc-900 dark:text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-zinc-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-6 pb-5 text-zinc-600 dark:text-zinc-400">{faq.answer}</div>
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
}
