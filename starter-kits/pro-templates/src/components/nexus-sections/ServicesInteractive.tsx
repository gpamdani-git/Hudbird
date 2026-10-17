// starter-kits/pro-templates/src/components/nexus-sections/ServicesInteractive.tsx
"use client";

import React, { useState } from "react";
import { ServicesInteractiveProps } from "@hudbird/schemas";
import { PEXELS } from "./HudbirdVisualWidgets";
import { Container, SectionHeader, Reveal } from "./ScrollReveal";
import { ArrowUpRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SERVICE_PEXELS_POOL = [
  PEXELS.abstract3d1,
  PEXELS.villaExterior1,
  PEXELS.project1,
  PEXELS.studioTeam,
  PEXELS.abstract3d2,
  PEXELS.project2,
];

export const ServicesInteractive: React.FC<{ data: ServicesInteractiveProps }> = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  return (
    <section id="services" className="bg-nx-page py-20 transition-colors duration-300 sm:py-28">
      <Container>
        <SectionHeader
          index="02"
          label={data.sectionTag || "Our Services"}
          headline={data.headline}
          description={data.description}
          className="mb-14 sm:mb-18"
        />

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Services Cards: Clean HudbirdUI Rounded-3xl Interactive Cards */}
          <div className="space-y-4 lg:col-span-7">
            {data.services.map((item, idx) => {
              const isHovered = hoveredIndex === idx;

              return (
                <div
                  key={item.index}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onClick={() => setHoveredIndex(idx)}
                  className={`group relative cursor-pointer rounded-[28px] border p-6 transition-all duration-300 sm:p-8 ${
                    isHovered
                      ? "-translate-y-0.5 border-white/15 bg-[#13141C] text-white shadow-[0_24px_60px_-15px_rgba(0,0,0,0.35)]"
                      : "bg-nx-surface text-nx-ink border-nx-line hover:border-[color:var(--brand-primary,#7C3AED)]/40"
                  }`}
                >
                  <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            isHovered
                              ? "bg-[#C8F560] text-zinc-950"
                              : "bg-[color:var(--brand-primary,#7C3AED)]/10 text-[color:var(--brand-primary,#7C3AED)]"
                          }`}
                        >
                          {item.category}
                        </span>
                        <span
                          className={`text-xs font-medium ${
                            isHovered ? "text-zinc-400" : "text-nx-muted"
                          }`}
                        >
                          0{idx + 1}
                        </span>
                      </div>

                      <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                        {item.title}
                      </h3>

                      <p
                        className={`max-w-xl text-sm leading-relaxed ${
                          isHovered ? "text-zinc-300" : "text-nx-ink-2"
                        }`}
                      >
                        {item.description}
                      </p>

                      {/* Clean Deliverable Pills */}
                      <div className="flex flex-wrap items-center gap-2 pt-2">
                        {item.deliverables.map((d, i) => (
                          <span
                            key={i}
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                              isHovered
                                ? "bg-white/10 text-zinc-200"
                                : "bg-nx-page text-nx-ink-2 border-nx-line border"
                            }`}
                          >
                            <Check className="h-3 w-3 text-[#84CC16]" />
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="shrink-0">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-full transition-all ${
                          isHovered
                            ? "rotate-45 bg-[#C8F560] text-zinc-950"
                            : "bg-nx-page border-nx-line text-nx-muted border"
                        }`}
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Floating Preview Card: Sticky Rounded-3xl Pexels Showcase */}
          <div className="sticky top-28 hidden lg:col-span-5 lg:block">
            <Reveal delay={0.12}>
              <div className="border-nx-line bg-nx-surface overflow-hidden rounded-[32px] border p-3 shadow-[0_24px_60px_rgba(0,0,0,0.06)]">
                <div className="relative aspect-[16/11] overflow-hidden rounded-[24px] bg-zinc-900">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={hoveredIndex}
                      src={SERVICE_PEXELS_POOL[hoveredIndex % SERVICE_PEXELS_POOL.length]}
                      alt={data.services[hoveredIndex]?.title || "Service preview"}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full w-full object-cover"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute top-3.5 left-3.5 rounded-full bg-white/90 px-3.5 py-1 text-xs font-semibold text-zinc-950">
                    {data.services[hoveredIndex]?.category}
                  </span>
                  <span className="absolute right-3.5 bottom-3.5 rounded-full bg-[#C8F560] px-3.5 py-1 text-xs font-bold text-zinc-950">
                    HudbirdUI Verified
                  </span>
                </div>

                <div className="p-5">
                  <h4 className="text-nx-ink text-xl font-semibold tracking-tight">
                    {data.services[hoveredIndex]?.title}
                  </h4>
                  <p className="text-nx-ink-2 mt-2 text-xs leading-relaxed sm:text-sm">
                    {data.services[hoveredIndex]?.description}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
};
