// starter-kits/pro-templates/src/components/nexus-sections/inner-pages/InnerPageArchitecturalHero.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container, MaskedHeading, Reveal, PillLink } from "../ScrollReveal";
import { PEXELS } from "../HudbirdVisualWidgets";
import { HbImage, HB } from "../HudbirdKit";
import { Star, TrendingUp, Activity, ShieldCheck } from "lucide-react";

export interface TelemetryMetric {
  value: string;
  label: string;
  subtext?: string;
}

export type InnerHeroVariant = "showcase" | "split" | "telemetry" | "minimal";

export interface InnerPageArchitecturalHeroProps {
  nicheSlug: string;
  nicheName: string;
  indexCode?: string;
  specCode?: string;
  title: string;
  subtitle?: string;
  description: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  metrics: [TelemetryMetric, TelemetryMetric, TelemetryMetric, TelemetryMetric];
  image?: string;
  variant?: InnerHeroVariant;
}

const NICHE_BANNERS: Record<string, string> = {
  "digital-agency": PEXELS.studioTeam,
  "ai-copilot": PEXELS.neuralSculpture,
  "fintech-protocol": PEXELS.villaHero,
  "cyber-shield": PEXELS.abstract3D_2,
  "alunara-wellness": PEXELS.wellness1,
};

const SPEC_BANNERS: Record<string, string> = {
  ABOUT: PEXELS.studioTeam,
  TEAM: PEXELS.studioTeam,
  CAREERS: PEXELS.project4,
  CONTACT: PEXELS.villaInterior,
  PRICING: PEXELS.villaExterior1,
  PORTFOLIO: PEXELS.project1,
  "CASE-STUDY": PEXELS.project2,
  JOURNAL: PEXELS.project3,
  CHANGELOG: PEXELS.abstract3D_1,
  ECOSYSTEM: PEXELS.abstract3D_3,
  SERVICES: PEXELS.project5,
  PROCESS: PEXELS.architectureWhite,
  REVIEWS: PEXELS.villaExterior2,
  FAQ: PEXELS.skyClouds,
};

const stripLegacy = (s?: string) =>
  (s || "")
    .replace(/[[\]]/g, "")
    .toLowerCase()
    .replace(/(^|\s|-)\S/g, (m) => m.toUpperCase())
    .trim();

function resolveVariant(specCode: string, explicit?: InnerHeroVariant): InnerHeroVariant {
  if (explicit) return explicit;
  const code = specCode.toUpperCase();
  if (["ABOUT", "TEAM", "CAREERS", "REVIEWS", "JOURNAL"].includes(code)) {
    return "split";
  }
  if (["PORTAL", "ECOSYSTEM", "CONTACT"].includes(code)) {
    return "telemetry";
  }
  if (
    ["PRICING", "FAQ", "CHANGELOG", "PRIVACY", "TERMS", "DIAGNOSTIC", "PRE-RELEASE"].includes(code)
  ) {
    return "minimal";
  }
  return "showcase";
}

export const InnerPageArchitecturalHero: React.FC<InnerPageArchitecturalHeroProps> = ({
  nicheSlug,
  nicheName,
  specCode = "Overview",
  title,
  subtitle,
  description,
  primaryCtaText = "Get Started",
  primaryCtaHref,
  secondaryCtaText = "Explore Details",
  secondaryCtaHref = "#deliverables",
  metrics,
  image,
  variant,
}) => {
  const ctaTarget = primaryCtaHref || `/demos/${nicheSlug}/contact`;
  const banner =
    image ||
    (nicheSlug === "alunara-wellness" || nicheSlug === "ai-copilot"
      ? NICHE_BANNERS[nicheSlug]
      : undefined) ||
    SPEC_BANNERS[specCode.toUpperCase()] ||
    NICHE_BANNERS[nicheSlug] ||
    PEXELS.villaHero;
  const badge = stripLegacy(subtitle) || stripLegacy(specCode);
  const cleanTitle = title.replace(/\s·\s.*$/, "");
  const mode = resolveVariant(specCode, variant);

  // =========================================================================
  // VARIANT 1: MINIMAL (Pricing, FAQ, Changelog, Legal, 404, Coming Soon)
  // Fast above-the-fold clarity without repeating a giant stock banner.
  // =========================================================================
  if (mode === "minimal") {
    return (
      <section
        className={`relative overflow-hidden pt-12 pb-12 sm:pt-16 sm:pb-16 ${HB.sectionMuted}`}
      >
        <Container className="relative">
          <div className="mx-auto max-w-4xl space-y-5 text-center">
            <Reveal y={8}>
              <div className="inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-white py-1.5 pr-4 pl-2 dark:border-white/10 dark:bg-white/[0.06]">
                <span className="rounded-full bg-[#0D0F14] px-2.5 py-0.5 text-[11px] font-semibold text-white dark:bg-[#C8F560] dark:text-[#0D0F14]">
                  {nicheName}
                </span>
                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  {badge}
                </span>
              </div>
            </Reveal>

            <MaskedHeading
              as="h1"
              text={cleanTitle}
              className="mx-auto max-w-4xl text-[clamp(2.2rem,4.6vw,3.9rem)] leading-[1.06] font-semibold tracking-[-0.035em] text-balance text-zinc-900 dark:text-white"
            />

            <Reveal delay={0.08}>
              <p className={`mx-auto max-w-2xl text-base leading-relaxed sm:text-lg ${HB.ink2}`}>
                {description}
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                <PillLink href={ctaTarget} variant="brand" size="md">
                  {primaryCtaText}
                </PillLink>
                {secondaryCtaText && (
                  <PillLink href={secondaryCtaHref} variant="ghost" size="md">
                    {secondaryCtaText}
                  </PillLink>
                )}
              </div>
            </Reveal>
          </div>

          {/* Compact Double-Bezel Metric Strip */}
          <div className="mt-10 rounded-[28px] border border-black/[0.06] bg-[#ECEEF4] p-2 dark:border-white/10 dark:bg-white/[0.03]">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-3 rounded-[22px] border border-black/[0.05] bg-white p-4 sm:p-5 dark:border-white/10 dark:bg-[#14171F]"
                >
                  <div>
                    <div className="text-xl font-bold text-zinc-900 tabular-nums sm:text-2xl dark:text-white">
                      {m.value}
                    </div>
                    <div className="mt-0.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                      {m.label}
                    </div>
                  </div>
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ background: [HB.lime, HB.cyan, HB.violet, "#FACC15"][idx % 4] }}
                  />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    );
  }

  // =========================================================================
  // VARIANT 2: TELEMETRY (Portal, Ecosystem/Integrations, Contact)
  // Dark Double-Bezel command bar with live status & instant KPIs.
  // =========================================================================
  if (mode === "telemetry") {
    return (
      <section
        className={`relative overflow-hidden pt-10 pb-12 sm:pt-14 sm:pb-16 ${HB.sectionMuted}`}
      >
        <Container>
          <div className="rounded-[36px] border border-black/[0.06] bg-[#E5E8F0] p-2 dark:border-white/10 dark:bg-white/[0.04]">
            <div className="rounded-[28px] border border-white/10 bg-[#0D0F14] p-7 text-white sm:p-11">
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                <div className="space-y-5 lg:col-span-7">
                  <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.07] px-3.5 py-1.5 text-xs font-semibold">
                    <span className="h-2 w-2 animate-ping rounded-full bg-[#C8F560]" />
                    <span className="text-[#C8F560]">{nicheName}</span>
                    <span className="text-zinc-400">· {badge}</span>
                  </div>

                  <h1 className="text-[clamp(2rem,4vw,3.4rem)] leading-[1.08] font-semibold tracking-[-0.035em] text-balance text-white">
                    {cleanTitle}
                  </h1>

                  <p className="max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
                    {description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <PillLink href={ctaTarget} variant="lime" size="md">
                      {primaryCtaText}
                    </PillLink>
                    {secondaryCtaText && (
                      <PillLink href={secondaryCtaHref} variant="inverse" size="md">
                        {secondaryCtaText}
                      </PillLink>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3.5 lg:col-span-5">
                  {metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col justify-between space-y-2 rounded-2xl border border-white/10 bg-white/[0.05] p-4 sm:p-5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-medium text-zinc-400">{m.label}</span>
                        <Activity className="h-3.5 w-3.5 text-[#C8F560]" />
                      </div>
                      <div className="text-2xl font-bold text-white tabular-nums sm:text-3xl">
                        {m.value}
                      </div>
                      {m.subtext && (
                        <div className="line-clamp-1 text-[11px] text-zinc-400">{m.subtext}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  // =========================================================================
  // VARIANT 3: SPLIT (About, Team, Careers, Reviews, Journal)
  // Asymmetric 12-column editorial split: left copy + 2x2 metrics, right Double-Bezel portrait.
  // =========================================================================
  if (mode === "split") {
    return (
      <section
        className={`relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-20 ${HB.sectionMuted}`}
      >
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="space-y-6 lg:col-span-7">
              <Reveal y={10}>
                <div className="inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-white py-1.5 pr-4 pl-2 dark:border-white/10 dark:bg-white/[0.06]">
                  <span className="rounded-full bg-[#0D0F14] px-2.5 py-0.5 text-[11px] font-semibold text-white dark:bg-[#C8F560] dark:text-[#0D0F14]">
                    {nicheName}
                  </span>
                  <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    {badge}
                  </span>
                </div>
              </Reveal>

              <MaskedHeading
                as="h1"
                text={cleanTitle}
                className="text-[clamp(2.25rem,4.6vw,4rem)] leading-[1.06] font-semibold tracking-[-0.035em] text-balance text-zinc-900 dark:text-white"
              />

              <Reveal delay={0.08}>
                <p className={`max-w-2xl text-base leading-relaxed sm:text-lg ${HB.ink2}`}>
                  {description}
                </p>
              </Reveal>

              <Reveal delay={0.14}>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <PillLink href={ctaTarget} variant="brand" size="md">
                    {primaryCtaText}
                  </PillLink>
                  {secondaryCtaText && (
                    <PillLink href={secondaryCtaHref} variant="ghost" size="md">
                      {secondaryCtaText}
                    </PillLink>
                  )}
                </div>
              </Reveal>

              <div className="grid grid-cols-2 gap-3 pt-4 sm:grid-cols-4">
                {metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-black/[0.06] bg-white p-4 dark:border-white/10 dark:bg-[#14171F]"
                  >
                    <div className="text-xl font-bold text-zinc-900 tabular-nums sm:text-2xl dark:text-white">
                      {m.value}
                    </div>
                    <div className="mt-0.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={0.15} y={20}>
                <div className="rounded-[34px] border border-black/[0.06] bg-white/80 p-2 shadow-[0_24px_60px_-20px_rgba(13,15,20,0.14)] dark:border-white/10 dark:bg-white/[0.04]">
                  <div className="relative aspect-[4/4] overflow-hidden rounded-[26px] bg-zinc-900">
                    <HbImage src={banner} alt={cleanTitle} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/65 via-transparent to-transparent p-6">
                      <div>
                        <span className="rounded-full bg-[#C8F560] px-3 py-1 text-[11px] font-semibold text-[#0D0F14]">
                          {badge}
                        </span>
                        <div className="mt-2 text-base font-semibold text-white">
                          {nicheName} · Senior Practice
                        </div>
                      </div>
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/15 text-white backdrop-blur-md">
                        <ShieldCheck className="h-5 w-5" />
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  // =========================================================================
  // VARIANT 4: SHOWCASE (Portfolio, Case Study, Services, Process)
  // Widescreen Double-Bezel visual showcase + floating live telemetry cards.
  // =========================================================================
  return (
    <section
      className={`relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-22 ${HB.sectionMuted}`}
    >
      <Container className="relative">
        <div className="mx-auto max-w-4xl space-y-5 text-center">
          <Reveal y={10}>
            <div className="inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-white py-1.5 pr-4 pl-2 dark:border-white/10 dark:bg-white/[0.06]">
              <span className="rounded-full bg-[#0D0F14] px-2.5 py-0.5 text-[11px] font-semibold text-white dark:bg-[#C8F560] dark:text-[#0D0F14]">
                {nicheName}
              </span>
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{badge}</span>
            </div>
          </Reveal>

          <MaskedHeading
            as="h1"
            text={cleanTitle}
            className="mx-auto max-w-4xl text-[clamp(2.35rem,5vw,4.35rem)] leading-[1.06] font-semibold tracking-[-0.035em] text-balance text-zinc-900 dark:text-white"
          />

          <Reveal delay={0.1}>
            <p className={`mx-auto max-w-2xl text-base leading-relaxed sm:text-lg ${HB.ink2}`}>
              {description}
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <PillLink href={ctaTarget} variant="brand" size="md">
                {primaryCtaText}
              </PillLink>
              {secondaryCtaText && (
                <PillLink href={secondaryCtaHref} variant="ghost" size="md">
                  {secondaryCtaText}
                </PillLink>
              )}
            </div>
          </Reveal>
        </div>

        {/* Double-Bezel Pexels banner with floating widgets */}
        <Reveal delay={0.2} y={24}>
          <div className="relative mt-12 sm:mt-14">
            <div className="rounded-[36px] border border-black/[0.06] bg-white/80 p-2 shadow-[0_32px_70px_-28px_rgba(0,0,0,0.22)] dark:border-white/10 dark:bg-white/[0.04]">
              <div className="relative aspect-[16/9] overflow-hidden rounded-[28px] bg-zinc-900 sm:aspect-[21/9]">
                <HbImage src={banner} alt={cleanTitle} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              </div>
            </div>

            {/* floating left widget */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="absolute bottom-8 left-6 hidden w-[235px] rounded-[22px] border border-white/10 bg-[#0D0F14]/95 p-4 text-white shadow-2xl backdrop-blur-xl md:block lg:-left-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-zinc-400">{metrics[0]?.label}</span>
                <span className="rounded-lg bg-[#C8F560] px-2 py-0.5 text-[11px] font-bold text-[#0D0F14]">
                  <TrendingUp className="mr-0.5 inline h-3 w-3" />
                  Live
                </span>
              </div>
              <div className="mt-1 text-2xl font-semibold tabular-nums">{metrics[0]?.value}</div>
            </motion.div>

            {/* floating right widget */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.38 }}
              className="absolute top-8 right-6 hidden items-center gap-3 rounded-[20px] border border-black/[0.06] bg-white/95 p-3 pr-5 text-zinc-900 shadow-2xl backdrop-blur-xl md:flex lg:-right-4 dark:border-white/10 dark:bg-zinc-900/95 dark:text-white"
            >
              <span
                className="grid h-11 w-11 place-items-center rounded-2xl font-bold text-zinc-950 tabular-nums"
                style={{ background: HB.cyan }}
              >
                {metrics[1]?.value?.slice(0, 4)}
              </span>
              <div>
                <div className="text-sm font-semibold">{metrics[1]?.label}</div>
                <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  {metrics[1]?.subtext || "Verified metric"}
                </div>
              </div>
            </motion.div>
          </div>
        </Reveal>

        {/* Metric strip */}
        <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {metrics.map((metric, idx) => (
            <Reveal key={idx} delay={0.05 * idx} y={12}>
              <div
                className={`h-full p-6 ${HB.card} ${HB.hoverLift} flex flex-col justify-between`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="text-3xl font-semibold tracking-tight text-zinc-900 tabular-nums sm:text-4xl dark:text-white">
                    {metric.value}
                  </div>
                  <span
                    className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ background: [HB.lime, HB.cyan, HB.violet, "#FACC15"][idx % 4] }}
                  />
                </div>
                <div className="mt-3">
                  <div className="text-sm font-semibold text-zinc-900 dark:text-white">
                    {metric.label}
                  </div>
                  {metric.subtext && (
                    <p className={`mt-0.5 line-clamp-1 text-xs ${HB.muted}`}>{metric.subtext}</p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};
