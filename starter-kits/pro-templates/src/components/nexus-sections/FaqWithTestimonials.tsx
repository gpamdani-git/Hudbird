// starter-kits/pro-templates/src/components/nexus-sections/FaqWithTestimonials.tsx
"use client";

import React, { useState } from "react";
import { FaqWithTestimonialsProps } from "@hudbird/schemas";
import { PEXELS } from "./HudbirdVisualWidgets";
import { Container, SectionHeader, Reveal } from "./ScrollReveal";
import { Plus, Minus, Star } from "lucide-react";

export const FaqWithTestimonials: React.FC<{ data?: FaqWithTestimonialsProps }> = ({ data }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const safeData: FaqWithTestimonialsProps = data || {
    sectionTag: "FAQ & Client Reviews",
    headline: "Clarity before you start.",
    description: "Straight answers to architectural, contractual, and product delivery questions.",
    testimonials: [
      {
        quote:
          "The cleanest design system and template library we have ever deployed in production.",
        author: "Marcus Vance",
        title: "CTO",
        company: "Kroma Protocol",
        avatar: PEXELS.avatarMan1,
        rating: 5,
        metricHighlight: "100/100 CWV",
      },
    ],
    faq: [
      {
        question: "How does code ownership work?",
        answer:
          "100% intellectual property ownership transfers to you immediately upon sprint milestone completion.",
      },
      {
        question: "Can we integrate our existing design system?",
        answer:
          "Yes, our token pipeline supports seamless mapping from existing Figma variable schemas.",
      },
    ],
  };

  return (
    <section id="faq" className="bg-nx-page py-20 transition-colors duration-300 sm:py-28">
      <Container>
        <SectionHeader
          index="06"
          label={safeData.sectionTag || "FAQ & Reviews"}
          headline={safeData.headline}
          description={safeData.description}
          className="mb-14 sm:mb-18"
        />

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Side: Rounded-3xl Testimonial Cards with Verified Pexels Avatars */}
          <div className="space-y-5 lg:col-span-5">
            {(safeData.testimonials || []).map((t, idx) => (
              <Reveal key={t.author || idx} delay={idx * 0.08}>
                <div className="bg-nx-surface border-nx-line space-y-5 rounded-[28px] border p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] sm:p-7">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, sIdx) => (
                        <Star key={sIdx} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </div>
                    {t.metricHighlight && (
                      <span className="rounded-full bg-[#C8F560] px-3 py-1 text-[11px] font-bold text-zinc-950">
                        {t.metricHighlight}
                      </span>
                    )}
                  </div>

                  <p className="text-nx-ink text-sm leading-relaxed sm:text-base">“{t.quote}”</p>

                  <div className="border-nx-line flex items-center gap-3 border-t pt-2">
                    <img
                      src={PEXELS.avatars[idx % PEXELS.avatars.length]}
                      alt={t.author}
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-[#C8F560]"
                    />
                    <div>
                      <h4 className="text-nx-ink text-sm leading-none font-semibold">{t.author}</h4>
                      <p className="text-nx-muted mt-1 text-xs">
                        {t.title}, {t.company}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Right Side: Clean Rounded-2xl Accordion */}
          <div className="space-y-3.5 lg:col-span-7">
            {(safeData.faq || []).map((item, idx) => {
              const isOpen = openFaq === idx;

              return (
                <Reveal key={idx} delay={idx * 0.05}>
                  <div className="bg-nx-surface border-nx-line overflow-hidden rounded-[24px] border transition-colors">
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none"
                      aria-expanded={isOpen}
                    >
                      <span className="text-nx-ink text-base font-semibold sm:text-lg">
                        {item.question}
                      </span>
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all ${
                          isOpen
                            ? "bg-[color:var(--brand-primary,#7C3AED)] text-white"
                            : "bg-nx-page border-nx-line text-nx-muted border"
                        }`}
                      >
                        {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="text-nx-ink-2 px-6 pb-5 text-sm leading-relaxed sm:text-[15px]">
                        {item.answer}
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};
