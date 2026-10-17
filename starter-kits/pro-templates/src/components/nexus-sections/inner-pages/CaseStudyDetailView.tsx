// starter-kits/pro-templates/src/components/nexus-sections/inner-pages/CaseStudyDetailView.tsx
"use client";

import React, { useState } from "react";
import { Reveal, PillLink } from "../ScrollReveal";
import { Zap, Layers, Award, Sparkles, Check } from "lucide-react";
import { PEXELS } from "../HudbirdVisualWidgets";
import { HB, HbSection, HbHeader, HbImage } from "../HudbirdKit";

interface BenchmarkMetric {
  label: string;
  before: string;
  after: string;
  lift: string;
  subtext: string;
}

interface CaseStudyStory {
  title: string;
  clientName: string;
  clientRole: string;
  clientOrg: string;
  mandateTagline: string;
  paragraphs: string[];
  pillar1Title: string;
  pillar1Desc: string;
  pillar2Title: string;
  pillar2Desc: string;
  quote: string;
  nextCaseStudyLabel: string;
  nextCaseStudyHref: string;
  benchmarks: BenchmarkMetric[];
}

const NICHE_CASE_STUDIES: Record<string, CaseStudyStory> = {
  "fintech-protocol": {
    title: "Aura Treasury Terminal: Institutional Non-Custodial Multi-Sig",
    clientName: "Stefan Lindemann",
    clientRole: "Chief Technology Officer",
    clientOrg: "Kroma Protocol AG (Zurich)",
    mandateTagline: "From a sluggish legacy terminal to sub-second institutional liquidity.",
    paragraphs: [
      "Kroma Protocol managed over $850M in locked treasury volume, yet their web terminal suffered from slow initial bundle loading, runtime layout jumping, and a fragmented design language across sub-teams.",
      "We completed a 6-week intensive sprint, replacing their monolithic app with an ERC-4626 vault architecture, clean design tokens, and edge-cached actions with sub-50ms response times.",
    ],
    pillar1Title: "Core Web Vitals",
    pillar1Desc: "LCP reduced from 4.2s to 0.42s with zero runtime layout shift.",
    pillar2Title: "Formal Audit Proofs",
    pillar2Desc: "100% Certora invariant proofs passing with zero vulnerabilities.",
    quote:
      "“The new interface delivered more in 6 weeks than our previous agency managed in 9 months. Our institutional depositors frequently comment on how fast and responsive the new terminal feels.”",
    nextCaseStudyLabel: "Next: Synapse AI Cluster",
    nextCaseStudyHref: "/demos/ai-copilot/projects/case-study",
    benchmarks: [
      {
        label: "Largest Contentful Paint",
        before: "4.20s",
        after: "0.42s",
        lift: "10x Faster",
        subtext: "Sub-second initial paint",
      },
      {
        label: "Cumulative Layout Shift",
        before: "0.348",
        after: "0.000",
        lift: "Zero Shift",
        subtext: "Locked layout stability",
      },
      {
        label: "Total Value Locked (TVL)",
        before: "$850M",
        after: "$4.20B",
        lift: "+394% Growth",
        subtext: "Verified on-chain growth",
      },
      {
        label: "Settlement Latency",
        before: "185ms",
        after: "4ms",
        lift: "46x Lift",
        subtext: "Near-instant execution",
      },
    ],
  },
  "ai-copilot": {
    title: "Synapse Copilot: Distributed Inference & Real-Time Streaming",
    clientName: "Dr. Marcus Vance",
    clientRole: "VP of AI Systems",
    clientOrg: "Neuromorph Technologies (San Francisco)",
    mandateTagline:
      "Architecting a high-throughput autonomous AI workspace with zero layout shift.",
    paragraphs: [
      "Neuromorph's enterprise AI copilot suffered from a 1.8s time-to-first-token delay, jittery markdown streaming, and inconsistent tool execution.",
      "We re-architected their serving pipeline on vLLM H100 clusters and built a tactile 60fps streaming UI with deterministic multi-agent guardrails.",
    ],
    pillar1Title: "Time To First Token",
    pillar1Desc: "TTFT reduced from 1.80s to 18ms using PagedAttention and prompt caching.",
    pillar2Title: "Tool Call Accuracy",
    pillar2Desc: "99.98% deterministic schema adherence with zero syntax drift.",
    quote:
      "“Synapse turned what used to be a sluggish chat widget into a lightning-fast enterprise workspace. The streaming speed and precision are night and day.”",
    nextCaseStudyLabel: "Next: Alunara Atelier",
    nextCaseStudyHref: "/demos/alunara-wellness/projects/case-study",
    benchmarks: [
      {
        label: "Time To First Token",
        before: "1.80s",
        after: "18ms",
        lift: "100x Faster",
        subtext: "Instant streaming start",
      },
      {
        label: "Throughput (Tokens/Sec)",
        before: "42 t/s",
        after: "1,200 t/s",
        lift: "28x Throughput",
        subtext: "Cluster-wide generation",
      },
      {
        label: "Layout Stability (CLS)",
        before: "0.412",
        after: "0.000",
        lift: "Zero Shift",
        subtext: "Locked typography height",
      },
      {
        label: "Tool Schema Adherence",
        before: "84.2%",
        after: "99.98%",
        lift: "+18.7% Accuracy",
        subtext: "Deterministic tool calls",
      },
    ],
  },
  "alunara-wellness": {
    title: "Alunara Luxury Atelier: Sub-400ms Headless Storefront",
    clientName: "Camille Delacroix",
    clientRole: "Co-Founder & Brand Director",
    clientOrg: "Alunara Parfums (Paris & Kyoto)",
    mandateTagline:
      "Transforming organic botanical storytelling into a high-converting digital atelier.",
    paragraphs: [
      "Alunara's luxury brand needed an online flagship matching the tactile elegance of their hand-blown glass vessels, replacing a slow 5-second legacy storefront.",
      "We rebuilt the entire customer journey on Shopify Hydrogen and React 19 with an interactive 3D bottle explorer, ritual quiz, and sub-400ms global edge delivery.",
    ],
    pillar1Title: "Mobile Conversion",
    pillar1Desc: "Checkout completion jumped +340% following the 1-tap Apple Pay redesign.",
    pillar2Title: "Global Edge Speed",
    pillar2Desc: "TTFB reduced from 2.8s to 28ms across Paris, Tokyo, and New York.",
    quote:
      "“Our patrons describe ordering through our new digital flagship as seamless as walking through our Kyoto studio. The tactile beauty and instant loading are extraordinary.”",
    nextCaseStudyLabel: "Next: CyberShield Defense",
    nextCaseStudyHref: "/demos/cyber-shield/projects/case-study",
    benchmarks: [
      {
        label: "Mobile Page Load (LCP)",
        before: "5.40s",
        after: "0.68s",
        lift: "8x Faster",
        subtext: "Sub-second mobile speed",
      },
      {
        label: "Checkout Conversion",
        before: "1.24%",
        after: "5.45%",
        lift: "+340% Lift",
        subtext: "1-tap luxury checkout",
      },
      {
        label: "Subscription Retention",
        before: "14%",
        after: "48%",
        lift: "+242% Lift",
        subtext: "Automated ritual refills",
      },
      {
        label: "Return on Ad Spend",
        before: "1.8x",
        after: "4.6x",
        lift: "2.5x ROI",
        subtext: "High-ticket conversion lift",
      },
    ],
  },
  "cyber-shield": {
    title: "CyberShield Defense Mesh: Zero-Trust SASE & eBPF Telemetry",
    clientName: "Henrik Blomqvist",
    clientRole: "Chief Information Security Officer",
    clientOrg: "Nordik Enterprise Bank (Stockholm)",
    mandateTagline: "Replacing fragmented firewalls with hardware-enforced micro-segmentation.",
    paragraphs: [
      "Nordik Bank managed hybrid cloud workloads across 40+ disjointed security appliances, creating visibility blind spots and slow incident triage.",
      "We deployed a unified Zero-Trust mesh with eBPF kernel probes, enabling sub-second threat isolation, FIDO2 passwordless auth, and automated SOC 2 compliance.",
    ],
    pillar1Title: "Mean Time To Detect",
    pillar1Desc: "Threat detection slashed from 4.5 hours to under 45 seconds via eBPF sensors.",
    pillar2Title: "Zero Lateral Breaches",
    pillar2Desc: "100% containment across 140+ automated red-team simulation drills.",
    quote:
      "“CyberShield transformed our enterprise perimeter from a compliance headache into an automated defense mesh. It gives our board complete peace of mind.”",
    nextCaseStudyLabel: "Next: HudbirdUI Studio",
    nextCaseStudyHref: "/demos/digital-agency/projects/case-study",
    benchmarks: [
      {
        label: "Mean Time To Detect",
        before: "4.50 hrs",
        after: "45 sec",
        lift: "360x Faster",
        subtext: "Instant threat triage",
      },
      {
        label: "Mean Time To Contain",
        before: "18.0 hrs",
        after: "3.2 min",
        lift: "337x Faster",
        subtext: "Automated isolation",
      },
      {
        label: "Audit Prep Time",
        before: "6 Weeks",
        after: "0 Hours",
        lift: "100% Automated",
        subtext: "Continuous SOC 2 evidence",
      },
      {
        label: "Annual Security TCO",
        before: "$1.4M",
        after: "$420k",
        lift: "-70% Cost",
        subtext: "Consolidated platform",
      },
    ],
  },
  "digital-agency": {
    title: "FinovaX & Synapse Flagship: Design System & Full-Stack Revamp",
    clientName: "Daniele Rossi",
    clientRole: "Principal Systems Architect",
    clientOrg: "HudbirdUI Studio (Zurich & Tokyo)",
    mandateTagline: "From a fragmented codebase to an award-winning digital product flagship.",
    paragraphs: [
      "The client platform suffered from slow initial page loads, inconsistent UI components, and low conversion across mobile and desktop funnels.",
      "Our team executed a 6-week sprint, delivering a unified React 19 & Tailwind v4 design system, interactive product widgets, and sub-second edge performance.",
    ],
    pillar1Title: "Core Web Vitals",
    pillar1Desc: "LCP reduced from 4.2s to 0.6s with zero layout shift across all devices.",
    pillar2Title: "Design System Scale",
    pillar2Desc: "70+ accessible UI components synchronized between Figma and code.",
    quote:
      "“HudbirdUI delivered more in 6 weeks than our previous agency managed in 9 months. Our customers constantly mention how fast and polished the new product feels.”",
    nextCaseStudyLabel: "Next: Kroma Protocol",
    nextCaseStudyHref: "/demos/fintech-protocol/projects/case-study",
    benchmarks: [
      {
        label: "Largest Contentful Paint",
        before: "4.20s",
        after: "0.62s",
        lift: "6.7x Faster",
        subtext: "Instant initial render",
      },
      {
        label: "Layout Stability (CLS)",
        before: "0.348",
        after: "0.000",
        lift: "Zero Shift",
        subtext: "Locked visual grid",
      },
      {
        label: "Qualified Demo Signups",
        before: "12 / mo",
        after: "53 / mo",
        lift: "+341% Lift",
        subtext: "Conversion-led UI",
      },
      {
        label: "Client NPS Score",
        before: "64",
        after: "98.4",
        lift: "+34.4 Pts",
        subtext: "Verified customer CSAT",
      },
    ],
  },
};

export const CaseStudyDetailView: React.FC<{
  nicheSlug?: string;
}> = ({ nicheSlug = "digital-agency" }) => {
  const activeNicheKey = NICHE_CASE_STUDIES[nicheSlug] ? nicheSlug : "digital-agency";
  const story = NICHE_CASE_STUDIES[activeNicheKey];
  const [activeTab, setActiveTab] = useState<"after" | "before">("after");

  return (
    <>
      {/* 1. Challenge, Solution & Client Summary Card */}
      <HbSection tone="muted">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left 7 cols */}
          <div className="space-y-6 lg:col-span-7">
            <span className={HB.brandChip}>Case Study Deep-Dive</span>
            <h2 className="text-2xl leading-[1.12] font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              {story.mandateTagline}
            </h2>

            <div className={`space-y-4 text-base leading-relaxed sm:text-lg ${HB.ink2}`}>
              {story.paragraphs.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
            </div>

            {/* 2 Highlight Cards (Lime + Cyan Accents) */}
            <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
              <div className={`${HB.card} space-y-2.5 p-6`}>
                <div className="flex items-center gap-2.5">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-xl text-zinc-950"
                    style={{ background: HB.lime }}
                  >
                    <Zap className="h-4 w-4" />
                  </span>
                  <span className="font-semibold text-zinc-900 dark:text-white">
                    {story.pillar1Title}
                  </span>
                </div>
                <p className={`text-sm leading-relaxed ${HB.ink2}`}>{story.pillar1Desc}</p>
              </div>

              <div className={`${HB.card} space-y-2.5 p-6`}>
                <div className="flex items-center gap-2.5">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-xl text-zinc-950"
                    style={{ background: HB.cyan }}
                  >
                    <Layers className="h-4 w-4" />
                  </span>
                  <span className="font-semibold text-zinc-900 dark:text-white">
                    {story.pillar2Title}
                  </span>
                </div>
                <p className={`text-sm leading-relaxed ${HB.ink2}`}>{story.pillar2Desc}</p>
              </div>
            </div>
          </div>

          {/* Right 5 cols: Dark Client Telemetry Widget Card */}
          <div className="lg:col-span-5">
            <div className="space-y-6 rounded-[32px] border border-white/10 bg-[#0E1017] p-7 text-white shadow-xl sm:p-9">
              <div className="flex items-center gap-3.5 border-b border-white/10 pb-5">
                <img
                  src={PEXELS.avatars[0]}
                  alt={story.clientName}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-[#C8F560]"
                />
                <div>
                  <div className="text-xs font-semibold text-[#C8F560]">
                    Verified Client Partner
                  </div>
                  <h4 className="text-lg font-semibold text-white">{story.clientOrg}</h4>
                </div>
              </div>

              <div className="space-y-3.5 text-sm">
                <div className="flex items-center justify-between border-b border-white/[0.06] py-2">
                  <span className="text-zinc-400">Executive Sponsor</span>
                  <span className="font-medium text-white">{story.clientName}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/[0.06] py-2">
                  <span className="text-zinc-400">Role</span>
                  <span className="font-medium text-zinc-200">{story.clientRole}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/[0.06] py-2">
                  <span className="text-zinc-400">Delivery Window</span>
                  <span className="font-semibold text-[#C8F560]">6 Weeks Fixed-Scope</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-zinc-400">Status</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    Live in Production
                  </span>
                </div>
              </div>

              <PillLink href={`/demos/${nicheSlug}/contact`} variant="inverse" size="md" fullWidth>
                Request similar project
              </PillLink>
            </div>
          </div>
        </div>
      </HbSection>

      {/* 2. Interactive Before / After Benchmark Cards */}
      <HbSection id="telemetry-benchmark" tone="light">
        <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="space-y-3">
            <span className={HB.brandChip}>
              <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Measurable Impact
            </span>
            <h3 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              Before & after production benchmarks
            </h3>
          </div>

          {/* Segmented Pill Toggle */}
          <div className="inline-flex items-center self-start rounded-full border border-black/[0.06] bg-[#F4F5F8] p-1.5 sm:self-auto dark:border-white/10 dark:bg-zinc-900">
            <button
              type="button"
              onClick={() => setActiveTab("before")}
              className={`cursor-pointer rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                activeTab === "before"
                  ? "bg-zinc-900 text-white shadow-sm dark:bg-white dark:text-zinc-950"
                  : "text-zinc-600 dark:text-zinc-400"
              }`}
            >
              Before Revamp
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("after")}
              className={`cursor-pointer rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                activeTab === "after"
                  ? "bg-[#C8F560] text-zinc-950 shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400"
              }`}
            >
              After Launch ✓
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {story.benchmarks.map((b, idx) => (
            <Reveal key={idx} delay={idx * 0.06} y={16}>
              <div
                className={`${HB.cardMuted} flex h-full flex-col justify-between p-6 sm:p-7 ${HB.hoverLift}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    {b.label}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                      activeTab === "after"
                        ? "bg-[#C8F560] text-zinc-950"
                        : "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                    }`}
                  >
                    {activeTab === "after" ? b.lift : "Legacy"}
                  </span>
                </div>

                <div className="my-4 text-3xl font-semibold tracking-tight text-zinc-900 tabular-nums sm:text-4xl dark:text-white">
                  {activeTab === "after" ? b.after : b.before}
                </div>

                <div className="border-t border-black/[0.06] pt-3 text-xs text-zinc-500 dark:border-white/10 dark:text-zinc-400">
                  {b.subtext}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </HbSection>

      {/* 3. Visual Showcase Gallery (3 Pexels Cards with Frosted Glass Captions + Client Quote) */}
      <HbSection tone="muted">
        <HbHeader
          badge="Visual Gallery"
          title="Shipped interfaces & product highlights"
          subtitle="Every screen, interactive widget, and mobile breakpoint crafted for clarity and conversion."
        />

        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              title: "Executive Overview",
              desc: "Real-time telemetry & KPIs",
              img: PEXELS.projects[0],
            },
            {
              title: "Interactive Workflows",
              desc: "Zero-latency command actions",
              img: PEXELS.projects[1],
            },
            {
              title: "Mobile Companion",
              desc: "Responsive 60fps mobile experience",
              img: PEXELS.projects[2],
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08} y={20}>
              <div className="group relative aspect-[4/4.2] overflow-hidden rounded-[28px] bg-zinc-900">
                <HbImage
                  src={item.img}
                  alt={item.title}
                  fallbackIndex={i}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/50 bg-white/75 px-5 py-3.5 text-center backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/80">
                  <div className="text-base font-semibold text-zinc-900 dark:text-white">
                    {item.title}
                  </div>
                  <div className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">{item.desc}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Client Endorsement Card */}
        <Reveal y={20}>
          <div className={`${HB.card} space-y-6 p-8 sm:p-12`}>
            <span className={HB.brandChip}>
              <Award className="mr-1.5 h-3.5 w-3.5" /> Client Endorsement
            </span>

            <blockquote className="text-xl leading-relaxed font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
              {story.quote}
            </blockquote>

            <div className="flex flex-col justify-between gap-4 border-t border-black/[0.06] pt-6 sm:flex-row sm:items-center dark:border-white/10">
              <div className="flex items-center gap-3.5">
                <img
                  src={PEXELS.avatars[1]}
                  alt={story.clientName}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-[#C8F560]"
                />
                <div>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                    {story.clientName}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {story.clientRole}, {story.clientOrg}
                  </p>
                </div>
              </div>

              <PillLink href={story.nextCaseStudyHref} variant="brand" size="md">
                {story.nextCaseStudyLabel}
              </PillLink>
            </div>
          </div>
        </Reveal>
      </HbSection>
    </>
  );
};
