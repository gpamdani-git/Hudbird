// starter-kits/pro-templates/src/components/nexus-sections/niches/wellness/AlunaraWellnessNicheHome.tsx
"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NicheConfig } from "@hudbird/schemas";
import { NavbarMegaMenu } from "../../NavbarMegaMenu";
import { SplitTextCtaFooter } from "../../SplitTextCtaFooter";
import { Container, SectionLabel, Reveal, PillLink } from "../../ScrollReveal";
import { PEXELS } from "../../HudbirdVisualWidgets";
import { HbImage } from "../../HudbirdKit";
import {
  Play,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  Star,
  Sparkles,
  Check,
  Clock,
  Activity,
  Droplets,
  Moon,
} from "lucide-react";

const GALLERY_SLIDES = [
  {
    title: "Cellular Longevity Protocol",
    subtitle: "Bio-harmonic formulation & cold-pressed botanical actives",
    badge: "99.4% Bio-Active Purity",
    image: PEXELS.wellness1,
  },
  {
    title: "Nocturnal Neural Recovery",
    subtitle: "Circadian rhythm optimization & deep REM architecture",
    badge: "+42% Deep Sleep Score",
    image: PEXELS.wellness2,
  },
  {
    title: "Atmospheric Sanctuary Diffuser",
    subtitle: "Hand-turned travertine stone & wild Kyoto hinoki mist",
    badge: "Limited Edition 04",
    image: PEXELS.wellness3,
  },
  {
    title: "Adaptogenic Elixir System",
    subtitle: "Clinical-grade reishi, cordyceps & swiss glacier mineral complex",
    badge: "Clinically Verified",
    image: PEXELS.wellness4,
  },
];

const LONGEVITY_PROTOCOLS = [
  {
    id: "autophagy",
    label: "Cellular Autophagy",
    biomarkerLift: "+38% NAD+ Synthesis",
    purity: "99.8% Clinical Grade",
    clinicalTrials: "14 Peer-Reviewed Studies",
    summary:
      "Targets mitochondrial renewal and cellular cleanup using liposomal spermidine, wild Japanese knotweed resveratrol, and glacier trace minerals.",
    schedule: [
      { time: "07:00 AM", ritual: "Fasted Cellular Activator Drops (Sublingual)", dose: "2.5 ml" },
      { time: "01:30 PM", ritual: "Polyphenol & Electrolyte Botanical Infusion", dose: "1 Sachet" },
      { time: "09:30 PM", ritual: "Nocturnal Repair & Autophagy Complex", dose: "2 Capsules" },
    ],
    image: PEXELS.wellness1,
  },
  {
    id: "rem-sleep",
    label: "Deep REM Architecture",
    biomarkerLift: "+44% Slow-Wave Sleep",
    purity: "100% Non-Habit Botanical",
    clinicalTrials: "Polysomnography Verified",
    summary:
      "Restores natural circadian melatonin cascades and lowers nocturnal resting heart rate by 6.4 BPM without morning grogginess.",
    schedule: [
      { time: "08:00 AM", ritual: "Morning Circadian Light & Cortisol Anchor", dose: "1 Capsule" },
      { time: "06:00 PM", ritual: "L-Theanine & Kyoto Hinoki Aromatic Mist", dose: "Atmospheric" },
      { time: "10:00 PM", ritual: "Liposomal Magnesium Bisglycinate + Apigenin", dose: "3.0 ml" },
    ],
    image: PEXELS.wellness2,
  },
  {
    id: "cortisol",
    label: "Cortisol Equilibrium",
    biomarkerLift: "-31% Stress Biomarkers",
    purity: "Wild-Harvested Adaptogens",
    clinicalTrials: "Double-Blind Validated",
    summary:
      "Balances HPA-axis reactivity and autonomic nervous system recovery (HRV) using dual-extracted fruiting body Reishi and Ashwagandha KSM-66.",
    schedule: [
      { time: "07:30 AM", ritual: "Adaptogenic Cordyceps & Rhodiola Tonic", dose: "2.0 ml" },
      { time: "03:00 PM", ritual: "Vagal Tone Botanical Elixir", dose: "1 Vial" },
      { time: "09:00 PM", ritual: "Reishi Spores & Saffron Calm Tincture", dose: "2.0 ml" },
    ],
    image: PEXELS.wellness4,
  },
];

const MEMBERSHIP_TIERS = [
  {
    name: "Essential Ritual",
    subtitle: "Monthly botanical refill & digital circadian companion",
    price: "$180",
    cadence: "/month",
    badge: "Daily Foundation",
    features: [
      "1 custom-compounded morning & evening formulation",
      "Continuous wearable HRV & sleep ring synchronization",
      "Seasonal formulation recalibration every 90 days",
      "Complimentary travertine vessel on first delivery",
    ],
    featured: false,
  },
  {
    name: "Clinical Bio-Sync",
    subtitle: "Quarterly epigenetic blood panel + full longevity stack",
    price: "$420",
    cadence: "/month",
    badge: "Most Popular",
    features: [
      "Full 3-step morning, afternoon & nocturnal protocol",
      "Quarterly at-home biological age & NAD+ biomarker kit",
      "1-on-1 monthly review with Geneva longevity clinician",
      "Priority access to limited-harvest botanical editions",
    ],
    featured: true,
  },
  {
    name: "Sanctuary Private",
    subtitle: "In-person clinical retreats & bespoke family formulation",
    price: "$1,250",
    cadence: "/month",
    badge: "Bespoke Concierge",
    features: [
      " Dedicated longevity physician & 24/7 clinical concierge",
      "Full-genome & microbiome precision compounding",
      "Annual 4-day immersive recovery retreat in Geneva or Kyoto",
      "Custom architectural scent & water filtration installation",
    ],
    featured: false,
  },
];

export interface AlunaraWellnessNicheHomeProps {
  niche: NicheConfig;
  customBrandPrimary?: string;
}

export const AlunaraWellnessNicheHome: React.FC<AlunaraWellnessNicheHomeProps> = ({ niche }) => {
  const [slideIdx, setSlideIdx] = useState<number>(0);
  const [activeProtocolIdx, setActiveProtocolIdx] = useState<number>(0);

  const activeProtocol = LONGEVITY_PROTOCOLS[activeProtocolIdx];

  return (
    <div className="min-h-screen bg-[#0A0812] text-white transition-colors duration-300">
      {/* 1. Hero Section: Inline Video Pill inside Headline + Double-Bezel Geneva Bio-Lab Showcase */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#080510] via-[#130D24] to-[#0A0812]">
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/3 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-to-r from-[#C8F560]/10 via-emerald-500/10 to-teal-400/10 blur-[130px]"
        />

        <NavbarMegaMenu data={niche.sections.navbar} />

        <section className="relative z-10 pt-14 pb-20 text-center sm:pt-20 sm:pb-28">
          <Container>
            <div className="mx-auto max-w-4xl space-y-6">
              <Reveal y={14}>
                <h1 className="mx-auto max-w-4xl text-[clamp(2.4rem,5.2vw,4.5rem)] leading-[1.08] font-semibold tracking-[-0.035em] text-balance text-white">
                  Bio-AI solutions{" "}
                  <span className="group relative mx-1.5 inline-flex h-11 w-24 cursor-pointer items-center overflow-hidden rounded-full border border-white/25 bg-white/15 p-1 align-middle sm:h-14 sm:w-32">
                    <img
                      src={PEXELS.wellness1}
                      alt="Video pill"
                      className="h-full w-full rounded-full object-cover opacity-90 transition-transform group-hover:scale-110"
                    />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-zinc-950 shadow">
                        <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />
                      </span>
                    </span>
                  </span>{" "}
                  built for real human longevity
                </h1>
              </Reveal>

              <Reveal delay={0.1} y={14}>
                <p className="mx-auto max-w-[54ch] text-[15px] leading-relaxed text-zinc-300 sm:text-[17px]">
                  Precision cellular diagnostics, AI-personalized botanical formulations, and
                  immersive recovery rituals designed by HudbirdUI Bio-Labs for peak vitality.
                </p>
              </Reveal>

              <Reveal delay={0.18} y={16}>
                <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
                  <PillLink href="/demos/alunara-wellness/sign-up" variant="lime" size="lg">
                    Begin cellular assessment
                  </PillLink>
                  <PillLink href="/demos/alunara-wellness/portfolio" variant="inverse" size="lg">
                    Explore formulations
                  </PillLink>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.26} y={28}>
              <div className="relative mx-auto mt-14 max-w-4xl">
                <div className="rounded-[38px] border border-white/10 bg-white/[0.04] p-2">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-[30px] border border-white/15 bg-[#11131C] shadow-[0_30px_90px_-20px_rgba(0,0,0,0.75)]">
                    <HbImage
                      src={PEXELS.wellness3}
                      alt="Immersive Bio-AI Experience"
                      className="h-full w-full object-cover object-center opacity-90"
                    />
                    <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-[#0A0812] via-[#0A0812]/30 to-transparent p-6 text-left sm:p-10">
                      <div>
                        <span className="rounded-full border border-[#C8F560]/40 bg-[#C8F560]/20 px-3.5 py-1 text-xs font-semibold text-[#C8F560]">
                          HudbirdUI Bio-Lab · Geneva & Kyoto
                        </span>
                        <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                          Real-time biometric telemetry & adaptive cellular formulations
                        </h3>
                      </div>
                      <div className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold tabular-nums backdrop-blur-md sm:flex">
                        <Star className="h-3.5 w-3.5 fill-current text-[#C8F560]" />
                        <span>4.98/5 Clinical Score</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>
      </div>

      {/* 2. Signature Formulations Interactive Horizontal Slide Gallery */}
      <section className="border-t border-white/10 bg-[#0E0B18] py-20 sm:py-28">
        <Container>
          <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-xl space-y-3">
              <SectionLabel
                label="Signature Formulations"
                className="!border-white/10 !bg-white/5 !text-zinc-200"
              />
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Engineered for cellular clarity and effortless recovery.
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setSlideIdx((prev) =>
                    prev === 0 ? GALLERY_SLIDES.length - 3 : Math.max(0, prev - 1)
                  )
                }
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/15 transition-colors hover:bg-white hover:text-zinc-950"
                aria-label="Previous slide"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setSlideIdx((prev) => (prev >= GALLERY_SLIDES.length - 3 ? 0 : prev + 1))
                }
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/15 transition-colors hover:bg-white hover:text-zinc-950"
                aria-label="Next slide"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {GALLERY_SLIDES.slice(slideIdx, slideIdx + 3).map((item) => (
              <Link
                key={item.title}
                to="/demos/alunara-wellness/case-study-detail"
                className="group flex rounded-[32px] border border-white/10 bg-white/[0.03] p-2 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#C8F560]/40"
              >
                <div className="flex w-full flex-col justify-between rounded-[24px] border border-white/10 bg-[#141122] p-3">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[18px]">
                    <HbImage
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 rounded-full border border-white/15 bg-black/65 px-3 py-1 text-[11px] font-semibold text-[#C8F560] backdrop-blur-md">
                      {item.badge}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3 p-4">
                    <div>
                      <h3 className="text-base font-semibold text-white">{item.title}</h3>
                      <p className="mt-1 text-xs text-zinc-400">{item.subtitle}</p>
                    </div>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-[#C8F560] group-hover:text-[#0D0F14]">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. Interactive Circadian & Cellular Protocol Configurator ("One Live Thing") */}
      <section className="border-t border-white/10 bg-[#0A0812] py-20 sm:py-28">
        <Container>
          <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl space-y-3">
              <SectionLabel
                label="Interactive Bio-Protocol"
                className="!border-white/10 !bg-white/5 !text-zinc-200"
              />
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Personalize your circadian dosing and cellular recovery architecture
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {LONGEVITY_PROTOCOLS.map((p, idx) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActiveProtocolIdx(idx)}
                  className={`cursor-pointer rounded-full px-4 py-2.5 text-xs font-semibold transition-all ${
                    activeProtocolIdx === idx
                      ? "bg-[#C8F560] text-[#0D0F14]"
                      : "bg-white/[0.06] text-zinc-300 hover:bg-white/10"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[36px] border border-white/10 bg-white/[0.03] p-2">
            <div className="grid grid-cols-1 items-center gap-8 rounded-[28px] border border-white/10 bg-[#131020] p-6 sm:p-10 lg:grid-cols-12">
              <div className="space-y-6 lg:col-span-7">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="rounded-full bg-[#C8F560]/15 px-3.5 py-1 text-xs font-semibold text-[#C8F560]">
                    {activeProtocol.biomarkerLift}
                  </span>
                  <span className="rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-zinc-200">
                    {activeProtocol.purity}
                  </span>
                  <span className="rounded-full bg-[#7EE7EE]/15 px-3.5 py-1 text-xs font-semibold text-[#7EE7EE]">
                    {activeProtocol.clinicalTrials}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-white sm:text-3xl">
                    {activeProtocol.label} Protocol
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-300 sm:text-base">
                    {activeProtocol.summary}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                    Circadian Dosing Schedule
                  </div>
                  {activeProtocol.schedule.map((slot) => (
                    <div
                      key={slot.time}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="rounded-full bg-[#C8F560]/15 px-3 py-1 font-mono text-xs font-semibold text-[#C8F560] tabular-nums">
                          {slot.time}
                        </span>
                        <span className="text-sm font-medium text-white">{slot.ritual}</span>
                      </div>
                      <span className="shrink-0 text-xs font-semibold text-zinc-400 tabular-nums">
                        {slot.dose}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-2">
                  <div className="relative aspect-[4/4] overflow-hidden rounded-[22px]">
                    <HbImage
                      src={activeProtocol.image}
                      alt={activeProtocol.label}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/75 via-transparent to-transparent p-6">
                      <div className="text-xs font-semibold text-[#C8F560]">
                        Cold-Pressed in Geneva
                      </div>
                      <div className="mt-0.5 text-lg font-semibold text-white">
                        Batch #042 · UV-Protected Violet Glass
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. Sanctuary Atelier & Clinical Biomarker Bento */}
      <section className="border-t border-white/10 bg-[#0E0B18] py-20 sm:py-28">
        <Container>
          <div className="mx-auto mb-14 max-w-2xl space-y-3 text-center">
            <SectionLabel
              label="Sanctuary Architecture"
              className="!border-white/10 !bg-white/5 !text-zinc-200"
            />
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Where Swiss molecular diagnostics meet Kyoto botanical calm
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="flex rounded-[34px] border border-white/10 bg-white/[0.03] p-2 lg:col-span-7">
              <div className="flex w-full flex-col justify-between overflow-hidden rounded-[26px] border border-white/10 bg-[#141122]">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <HbImage
                    src={PEXELS.wellness3}
                    alt="Kyoto Sanctuary Atelier"
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute top-4 left-4 rounded-full border border-white/15 bg-black/60 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                    Architectural Flagships · Geneva · Kyoto · Zurich
                  </span>
                </div>
                <div className="flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center sm:p-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      Private Biometric & Thermal Recovery Suites
                    </h3>
                    <p className="mt-1 max-w-md text-xs text-zinc-400 sm:text-sm">
                      Book a full epigenetic blood panel, hyperbaric oxygen session, and custom
                      botanical compounding consultation.
                    </p>
                  </div>
                  <PillLink href="/demos/alunara-wellness/contact" variant="lime" size="md">
                    Reserve sanctuary
                  </PillLink>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
              {[
                {
                  icon: Droplets,
                  title: "99.4% Liposomal Bio-Availability",
                  desc: "Micro-encapsulated lipid spheres bypass gastric degradation for 4.8x higher cellular absorption.",
                  metric: "4.8x Absorption",
                },
                {
                  icon: Moon,
                  title: "Continuous Wearable Sync",
                  desc: "Automatically adjusts your next monthly formulation drop using Oura, Whoop, and Apple Health HRV trends.",
                  metric: "Real-Time Bio-Sync",
                },
              ].map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.title}
                    className="flex rounded-[32px] border border-white/10 bg-white/[0.03] p-2"
                  >
                    <div className="flex w-full flex-col justify-between space-y-5 rounded-[24px] border border-white/10 bg-[#141122] p-6 sm:p-7">
                      <div className="flex items-center justify-between">
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#C8F560]/15 text-[#C8F560]">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-[#C8F560]">
                          {card.metric}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                        <p className="mt-1.5 text-xs leading-relaxed text-zinc-400 sm:text-sm">
                          {card.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* 5. Private Longevity Membership Tiers */}
      <section className="border-t border-white/10 bg-[#0A0812] py-20 sm:py-28">
        <Container>
          <div className="mx-auto mb-14 max-w-2xl space-y-3 text-center">
            <SectionLabel
              label="Longevity Membership"
              className="!border-white/10 !bg-white/5 !text-zinc-200"
            />
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Clinical rituals tailored to your biological rhythm
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {MEMBERSHIP_TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`flex rounded-[34px] p-2 ${
                  tier.featured
                    ? "border border-[#C8F560]/50 bg-[#C8F560]/20"
                    : "border border-white/10 bg-white/[0.03]"
                }`}
              >
                <div className="flex w-full flex-col justify-between space-y-8 rounded-[26px] border border-white/10 bg-[#131020] p-7 sm:p-8">
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                          tier.featured
                            ? "bg-[#C8F560] text-[#0D0F14]"
                            : "bg-white/10 text-zinc-300"
                        }`}
                      >
                        {tier.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-white">{tier.name}</h3>
                      <p className="mt-1 text-xs text-zinc-400">{tier.subtitle}</p>
                    </div>

                    <div className="flex items-baseline gap-1.5 tabular-nums">
                      <span className="text-4xl font-bold text-white">{tier.price}</span>
                      <span className="text-xs text-zinc-400">{tier.cadence}</span>
                    </div>

                    <div className="space-y-3 border-t border-white/10 pt-5">
                      {tier.features.map((f) => (
                        <div key={f} className="flex items-start gap-2.5 text-xs text-zinc-200">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#C8F560]" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <PillLink
                    href="/demos/alunara-wellness/contact"
                    variant={tier.featured ? "lime" : "inverse"}
                    size="lg"
                    fullWidth
                  >
                    Apply for membership
                  </PillLink>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. Footer */}
      <SplitTextCtaFooter data={niche.sections.footer} />
    </div>
  );
};

export default AlunaraWellnessNicheHome;
