// starter-kits/pro-templates/src/components/nexus-sections/PricingGrid.tsx
"use client";

import React, { useState } from "react";
import { PricingGridProps } from "@hudbird/schemas";
import { Container, SectionHeader, Reveal, PillLink } from "./ScrollReveal";
import { Check, X } from "lucide-react";

export const PricingGrid: React.FC<{ data: PricingGridProps }> = ({ data }) => {
  const [isQuarterly, setIsQuarterly] = useState(true);

  return (
    <section id="pricing" className="bg-nx-page py-20 transition-colors duration-300 sm:py-28">
      <Container>
        <SectionHeader
          index="05"
          label={data.sectionTag || "Pricing Plans"}
          headline={data.headline}
          description={data.description}
          action={
            <div className="border-nx-line bg-nx-surface flex items-center gap-1.5 rounded-full border p-1">
              <button
                type="button"
                onClick={() => setIsQuarterly(false)}
                className={`cursor-pointer rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                  !isQuarterly
                    ? "bg-[color:var(--brand-primary,#7C3AED)] text-white shadow-sm"
                    : "text-nx-muted hover:text-nx-ink"
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setIsQuarterly(true)}
                className={`flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                  isQuarterly
                    ? "bg-[color:var(--brand-primary,#7C3AED)] text-white shadow-sm"
                    : "text-nx-muted hover:text-nx-ink"
                }`}
              >
                <span>Quarterly</span>
                <span className="rounded-full bg-[#C8F560] px-2 py-0.5 text-[10px] font-bold text-zinc-950">
                  -{data.quarterlyDiscountPercent}%
                </span>
              </button>
            </div>
          }
          className="mb-14 sm:mb-18"
        />

        <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-6 sm:gap-8 lg:grid-cols-3">
          {data.tiers.map((tier, idx) => {
            const displayPrice = isQuarterly ? tier.quarterlyPrice : tier.monthlyPrice;
            const isFeatured = tier.isPopular;

            return (
              <Reveal key={tier.name} delay={idx * 0.08} className="flex">
                <div
                  className={`flex flex-1 flex-col justify-between rounded-[32px] p-8 transition-all duration-300 ${
                    isFeatured
                      ? "border border-white/15 bg-[#13141C] text-white shadow-[0_28px_70px_-15px_rgba(124,58,237,0.3)] lg:-translate-y-2"
                      : "bg-nx-surface text-nx-ink border-nx-line border"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                        {tier.name}
                      </h3>
                      {isFeatured && (
                        <span className="rounded-full bg-[#C8F560] px-3 py-1 text-[11px] font-bold text-zinc-950">
                          Most Popular
                        </span>
                      )}
                    </div>

                    <p
                      className={`min-h-[36px] text-xs leading-relaxed sm:text-sm ${
                        isFeatured ? "text-zinc-400" : "text-nx-ink-2"
                      }`}
                    >
                      {tier.tagline}
                    </p>

                    <div
                      className={`flex items-baseline gap-2 border-t pt-4 ${
                        isFeatured ? "border-white/10" : "border-nx-line"
                      }`}
                    >
                      <span className="text-4xl font-bold tracking-tight tabular-nums sm:text-5xl">
                        ${displayPrice.toLocaleString()}
                      </span>
                      <span
                        className={`text-xs font-medium ${
                          isFeatured ? "text-zinc-400" : "text-nx-muted"
                        }`}
                      >
                        / month
                      </span>
                    </div>
                  </div>

                  <ul
                    className={`my-6 flex-1 space-y-3 border-t pt-6 text-xs sm:text-sm ${
                      isFeatured ? "border-white/10 text-zinc-200" : "border-nx-line text-nx-ink-2"
                    }`}
                  >
                    {tier.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#84CC16]" />
                        <span>{feat}</span>
                      </li>
                    ))}
                    {tier.notIncluded?.map((notInc, nIdx) => (
                      <li
                        key={nIdx}
                        className={`flex items-start gap-3 opacity-40 ${
                          isFeatured ? "text-zinc-400" : "text-nx-muted"
                        }`}
                      >
                        <X className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>{notInc}</span>
                      </li>
                    ))}
                  </ul>

                  <div
                    className={`border-t pt-6 ${isFeatured ? "border-white/10" : "border-nx-line"}`}
                  >
                    <PillLink
                      href={tier.cta.href}
                      variant={isFeatured ? "brand" : "ink"}
                      size="md"
                      fullWidth
                    >
                      {tier.cta.label}
                    </PillLink>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <div className="border-nx-line bg-nx-surface text-nx-ink-2 mx-auto mt-12 flex max-w-xl items-center gap-4 rounded-[24px] border p-5 text-xs sm:text-sm">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#C8F560] font-bold text-zinc-950">
              ✓
            </div>
            <div>
              <span className="text-nx-ink block font-semibold">{data.guarantee.title}</span>
              <span className="text-nx-muted text-xs">{data.guarantee.text}</span>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};
