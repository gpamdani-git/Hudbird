// starter-kits/pro-templates/src/components/nexus-sections/StickyProcessSteps.tsx
"use client";

import React from "react";
import { StickyProcessStepsProps } from "@hudbird/schemas";
import { StickyStack, StickyStackItem } from "@/components/ui/StickyStack";
import { Container, SectionLabel, MaskedHeading, Reveal, PillLink } from "./ScrollReveal";
import { PEXELS, IsoCubeIcon } from "./HudbirdVisualWidgets";
import { Check } from "lucide-react";

const PHASE_IMAGES = [
  PEXELS.studioTeam,
  PEXELS.villaExterior1,
  PEXELS.abstract3d1,
  PEXELS.project1,
];

export const StickyProcessSteps: React.FC<{ data: StickyProcessStepsProps }> = ({ data }) => {
  return (
    <section id="process" className="bg-nx-page py-20 transition-colors duration-300 sm:py-28">
      <Container>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Sticky Column (5 Columns) */}
          <div className="space-y-6 lg:sticky lg:top-28 lg:col-span-5">
            <Reveal y={12}>
              <SectionLabel index="04" label={data.sectionTag || "Our Process"} />
            </Reveal>

            <MaskedHeading
              text={data.headline}
              className="text-nx-ink text-[clamp(2.25rem,4.5vw,3.8rem)] leading-[1.06] font-semibold tracking-[-0.035em]"
            />

            <Reveal delay={0.12} y={14}>
              <p className="text-nx-ink-2 max-w-[44ch] text-[15px] leading-relaxed sm:text-base">
                {data.description}
              </p>
            </Reveal>

            {/* Mini Pexels Visual Card in Sticky Left Column */}
            <Reveal delay={0.18} y={16}>
              <div className="border-nx-line bg-nx-surface overflow-hidden rounded-[26px] border p-2.5 shadow-sm">
                <div className="relative aspect-[16/9] overflow-hidden rounded-[18px]">
                  <img
                    src={PEXELS.studioTeam}
                    alt="HudbirdUI Sprint Pod"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/65 via-transparent to-transparent p-4">
                    <span className="text-xs font-semibold text-white">
                      Weekly production releases · 100% transparent velocity
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.22} y={16}>
              <div className="pt-1">
                <PillLink href="/demos/digital-agency/process" variant="brand" size="md">
                  Explore methodology
                </PillLink>
              </div>
            </Reveal>
          </div>

          {/* Right Sticky Stacking Cards (7 Columns) */}
          <div className="lg:col-span-7">
            <StickyStack
              baseTop={data.baseTop || "6.5rem"}
              offsetStep={data.offsetStep || "1.5rem"}
              totalItems={data.phases.length}
            >
              {data.phases.map((phase, idx) => (
                <StickyStackItem key={phase.phaseNumber} index={idx} total={data.phases.length}>
                  <div className="border-nx-line bg-nx-surface space-y-6 rounded-[30px] border p-6 shadow-[0_20px_50px_rgba(0,0,0,0.06)] sm:p-8">
                    {/* Phase Header */}
                    <div className="border-nx-line flex items-center justify-between border-b pb-5">
                      <div className="flex items-center gap-3.5">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[color:var(--brand-primary,#7C3AED)]/10 text-[color:var(--brand-primary,#7C3AED)]">
                          <IsoCubeIcon
                            variant={((idx % 4) + 1) as 1 | 2 | 3 | 4}
                            className="h-6 w-6"
                          />
                        </span>
                        <div>
                          <span className="text-xs font-semibold text-[color:var(--brand-primary,#7C3AED)]">
                            Phase {phase.phaseNumber}
                          </span>
                          <h3 className="text-nx-ink text-xl font-semibold tracking-tight sm:text-2xl">
                            {phase.title}
                          </h3>
                        </div>
                      </div>

                      {phase.subtitle && (
                        <span className="bg-nx-page border-nx-line text-nx-ink-2 hidden rounded-full border px-3.5 py-1 text-xs font-semibold sm:inline-block">
                          {phase.subtitle}
                        </span>
                      )}
                    </div>

                    {/* Phase Description + Thumbnail */}
                    <div className="grid grid-cols-1 items-center gap-5 sm:grid-cols-12">
                      <p className="text-nx-ink-2 text-sm leading-relaxed sm:col-span-7 sm:text-[15px]">
                        {phase.description}
                      </p>
                      <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-zinc-900 sm:col-span-5">
                        <img
                          src={PHASE_IMAGES[idx % PHASE_IMAGES.length]}
                          alt={phase.title}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Deliverables Pill Row */}
                    <div className="border-nx-line flex flex-wrap items-center gap-2 border-t pt-4">
                      {phase.deliverables.map((item, dIdx) => (
                        <span
                          key={dIdx}
                          className="bg-nx-page border-nx-line text-nx-ink inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium"
                        >
                          <Check className="h-3.5 w-3.5 text-[#84CC16]" />
                          <span>{item}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </StickyStackItem>
              ))}
            </StickyStack>
          </div>
        </div>
      </Container>
    </section>
  );
};
