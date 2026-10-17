// starter-kits/pro-templates/src/components/nexus-sections/HudbirdPolymorphicSections.tsx
"use client";

import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { NicheConfig, PrebuiltTemplateMeta } from "@hudbird/schemas";
import { NavbarMegaMenu } from "./NavbarMegaMenu";
import { AllPagesDirectory } from "./AllPagesDirectory";
import { SplitTextCtaFooter } from "./SplitTextCtaFooter";
import { Container, MaskedHeading, PillLink, Reveal } from "./ScrollReveal";
import { HB, HbSection, HbHeader, HbImage } from "./HudbirdKit";
import { getTemplatePexelsPack } from "./HudbirdVisualWidgets";
import {
  ArrowUpRight,
  Sparkles,
  Check,
  Play,
  Pause,
  Sliders,
  Zap,
  ShieldCheck,
  TrendingUp,
  Layers,
  Activity,
  Globe,
  Cpu,
  BarChart3,
  Clock,
  ChevronRight,
  Plus,
  Minus,
} from "lucide-react";

export interface DomainBlueprint {
  badge: string;
  heroLayout: 0 | 1 | 2 | 3 | 4;
  sectionOrder: 0 | 1 | 2 | 3;
  unitLabel: string;
  unitStep: number;
  unitMin: number;
  unitMax: number;
  unitDefault: number;
  dollarPerUnit: number;
  hoursSavedPerUnit: number;
  sandboxTitle: string;
  sandboxSubtitle: string;
  sandboxModes: {
    id: string;
    label: string;
    metricLabel: string;
    metricValue: string;
    latency: string;
    status: string;
    headline: string;
    description: string;
    bullets: [string, string, string];
    bars: [number, number, number, number, number, number];
  }[];
  bentoCards: {
    tag: string;
    title: string;
    desc: string;
    stat: string;
    statSub: string;
  }[];
  legacyPainPoints: [string, string, string, string];
  automatedWins: [string, string, string, string];
  caseStudies: {
    client: string;
    industry: string;
    title: string;
    metric: string;
    quote: string;
  }[];
  pricingPlans: {
    name: string;
    desc: string;
    monthly: number;
    annual: number;
    popular?: boolean;
    features: string[];
  }[];
  faqs: {
    q: string;
    a: string;
  }[];
}

/**
 * Generates domain-authentic copywriting, interactive sandbox modes, ROI formulas,
 * and case studies tailored to each of the 47 pre-built templates.
 */
export function getTemplateDomainBlueprint(
  meta: PrebuiltTemplateMeta,
  niche: NicheConfig
): DomainBlueprint {
  const slug = meta.slug.toLowerCase();
  const title = meta.title || meta.name || "Enterprise Platform";
  const numId = meta.numId || 1;
  const heroLayout = ((numId - 1) % 5) as 0 | 1 | 2 | 3 | 4;
  const sectionOrder = ((numId - 1) % 4) as 0 | 1 | 2 | 3;

  // Determine vertical family for specialized interactive terminology
  const isVoiceOrMedia =
    slug.includes("voice") ||
    slug.includes("video") ||
    slug.includes("podcast") ||
    slug.includes("content");
  const isTradingOrCrypto =
    slug.includes("forex") ||
    slug.includes("crypto") ||
    slug.includes("defi") ||
    slug.includes("decentralized") ||
    slug.includes("wealth") ||
    slug.includes("investment");
  const isPropertyOrPos =
    slug.includes("property") ||
    slug.includes("mortgage") ||
    slug.includes("insurance") ||
    slug.includes("pos");
  const isCloudOrCyber =
    slug.includes("cloud") ||
    slug.includes("hosting") ||
    slug.includes("cyber") ||
    slug.includes("security") ||
    slug.includes("risk") ||
    slug.includes("data-visualization");
  const isCrmOrGrowth =
    slug.includes("crm") ||
    slug.includes("lead") ||
    slug.includes("email") ||
    slug.includes("messaging") ||
    slug.includes("social") ||
    slug.includes("time-tracking");

  const unitLabel = isVoiceOrMedia
    ? "Monthly Studio Minutes / Generations"
    : isTradingOrCrypto
      ? "Monthly Settlement Volume ($K)"
      : isPropertyOrPos
        ? "Active Units / Store Locations"
        : isCloudOrCyber
          ? "Protected Nodes & Edge Clusters"
          : isCrmOrGrowth
            ? "Active Pipeline Deals & Workflows"
            : "Monthly Active Projects & Sprints";

  const sandboxModes: DomainBlueprint["sandboxModes"] = isVoiceOrMedia
    ? [
        {
          id: "neural-voice",
          label: "Neural Voice Cloning",
          metricLabel: "MOS Naturalness",
          metricValue: "4.92 / 5.0",
          latency: "38ms stream",
          status: "48kHz Lossless",
          headline: `Studio-grade ${title} synthesis with zero robotic artifacts`,
          description:
            "Fine-tune breath control, emotional cadence, and multilingual lip-sync in real time from a single 15-second reference clip.",
          bullets: [
            "Sub-40ms WebRTC streaming for live conversational agents",
            "32+ native languages with automatic accent preservation",
            "Frame-accurate timeline markers & DAW export",
          ],
          bars: [78, 92, 64, 96, 88, 94],
        },
        {
          id: "emotion-director",
          label: "Emotion & Pitch Director",
          metricLabel: "Expressive Range",
          metricValue: "+310% Dynamic",
          latency: "42ms stream",
          status: "Liveprosody v4",
          headline: "Direct emphasis, whisper, and broadcast energy per syllable",
          description:
            "Highlight any phrase to adjust pitch contour, pacing speed, and studio room acoustics without re-recording.",
          bullets: [
            "Syllable-level prosody curve editor in the browser",
            "Instant A/B variant generation for commercial reads",
            "Zero-watermark enterprise commercial licensing",
          ],
          bars: [85, 72, 95, 81, 90, 98],
        },
        {
          id: "batch-dubbing",
          label: "Multi-Track Dubbing API",
          metricLabel: "Localization Speed",
          metricValue: "14x Faster",
          latency: "110ms batch",
          status: "ISO-Certified",
          headline: "Localize entire video libraries and podcasts in one click",
          description:
            "Automatically separate background stems, translate idioms, and dub multi-speaker dialogue while preserving each speaker's timbre.",
          bullets: [
            "Automatic stem separation preserves music & SFX tracks",
            "Speaker diarization for up to 12 distinct voices",
            "Webhook & S3 bucket automation for media pipelines",
          ],
          bars: [68, 84, 91, 97, 79, 93],
        },
      ]
    : isTradingOrCrypto
      ? [
          {
            id: "liquidity-router",
            label: "Smart Liquidity Router",
            metricLabel: "Execution Spread",
            metricValue: "0.01 bps",
            latency: "1.4ms NY4",
            status: "MEV-Protected",
            headline: `Institutional order routing built for ${title}`,
            description:
              "Aggregate deep liquidity across tier-1 venues and on-chain vaults with zero-slippage split execution and real-time risk guardrails.",
            bullets: [
              "Sub-2ms Equinix colocation & zero-knowledge settlement",
              "Automated TWAP, VWAP, and iceberg order slicing",
              "Real-time margin & counterparty exposure telemetry",
            ],
            bars: [94, 88, 97, 91, 95, 99],
          },
          {
            id: "yield-treasury",
            label: "Automated Yield & Alpha",
            metricLabel: "Net APY / Alpha",
            metricValue: "+14.8% Verified",
            latency: "Real-time",
            status: "Audited Vaults",
            headline: "Continuous portfolio rebalancing and tax-loss harvesting",
            description:
              "Deploy idle treasury or client capital into delta-neutral strategies and sovereign-grade fixed income with instant liquidity.",
            bullets: [
              "24/7 algorithmic drift detection & auto-rebalancing",
              "Multi-sig hardware quorum & SOC2 Type II custody",
              "One-click audit trail export for fund administrators",
            ],
            bars: [76, 85, 89, 94, 92, 96],
          },
          {
            id: "compliance-shield",
            label: "KYT & Risk Stress-Test",
            metricLabel: "Risk Coverage",
            metricValue: "99.98% Screened",
            latency: "12ms check",
            status: "Basel / MiCA Ready",
            headline: "Pre-trade compliance and value-at-risk simulation",
            description:
              "Simulate macro rate shocks, liquidity drawdowns, and sanctions screening before a single transaction hits the ledger.",
            bullets: [
              "Real-time Monte Carlo portfolio stress testing",
              "Automated AML/KYT wallet & IBAN screening",
              "Custom per-desk position limits & circuit breakers",
            ],
            bars: [88, 92, 84, 96, 90, 95],
          },
        ]
      : isPropertyOrPos
        ? [
            {
              id: "occupancy-autopilot",
              label: "Operations & Revenue OS",
              metricLabel: "Net Operating Lift",
              metricValue: meta.metricHighlight || "+38% NOI",
              latency: "0.6s sync",
              status: "Live Ledger",
              headline: `Unify every location, unit, and checkout inside ${title}`,
              description:
                "Eliminate fragmented spreadsheets with automated billing, real-time inventory/unit occupancy telemetry, and instant payout reconciliation.",
              bullets: [
                "Automated recurring billing, tap-to-pay & instant settlement",
                "Predictive maintenance & smart stock-out alerts",
                "Owner, tenant & staff mobile portals included out of the box",
              ],
              bars: [82, 90, 87, 95, 91, 98],
            },
            {
              id: "underwriting-ai",
              label: "Instant Verification & Sync",
              metricLabel: "Approval Speed",
              metricValue: "90 Seconds",
              latency: "Real-time API",
              status: "Zero Paperwork",
              headline: "Verify applications, orders, and claims in under 90 seconds",
              description:
                "Connect banking, identity, and property/inventory feeds to approve customers automatically with 99.4% fraud accuracy.",
              bullets: [
                "Direct Plaid, Stripe, and regional registry integrations",
                "Automated contract e-signature & digital receipt vault",
                "Real-time multi-location P&L and cashflow forecasting",
              ],
              bars: [79, 86, 93, 89, 96, 94],
            },
            {
              id: "loyalty-crm",
              label: "Retention & Loyalty Engine",
              metricLabel: "Repeat Retention",
              metricValue: "94.2% Renewal",
              latency: "Automated",
              status: "Omnichannel",
              headline: "Turn one-time buyers and tenants into lifelong advocates",
              description:
                "Trigger personalized renewal offers, VIP loyalty rewards, and SMS status updates based on real-time customer behavior.",
              bullets: [
                "Automated SMS, WhatsApp & email lifecycle triggers",
                "Built-in Net Promoter Score & review generation",
                "Custom white-label customer mobile experience",
              ],
              bars: [74, 88, 91, 94, 89, 97],
            },
          ]
        : isCloudOrCyber
          ? [
              {
                id: "edge-mesh",
                label: "Zero-Trust Edge Mesh",
                metricLabel: "Global Latency",
                metricValue: "8.4ms p99",
                latency: "42 Edge PoPs",
                status: "99.999% SLA",
                headline: `Kernel-level speed and autonomous defense for ${title}`,
                description:
                  "Deploy workloads and eBPF security sensors across AWS, GCP, and bare metal in 30 seconds with zero configuration drift.",
                bullets: [
                  "Sub-millisecond threat isolation & DDoS scrubbing",
                  "Automated Kubernetes right-sizing cuts cloud waste by 38%",
                  "Continuous SOC2, HIPAA & ISO27001 evidence collection",
                ],
                bars: [96, 91, 98, 89, 94, 99],
              },
              {
                id: "telemetry-lake",
                label: "60fps Telemetry & Query",
                metricLabel: "Query Throughput",
                metricValue: "100M rows/s",
                latency: "0.3s cold query",
                status: "GPU-Accelerated",
                headline: "Inspect billion-row logs, traces, and metrics without sampling",
                description:
                  "Correlate infrastructure spikes, user funnels, and security anomalies in a single GPU-accelerated observability canvas.",
                bullets: [
                  "Zero-schema ingestion for OpenTelemetry, SQL & JSON",
                  "AI root-cause copilot pinpoints regressions in seconds",
                  "Role-based executive dashboards & Slack incident alerts",
                ],
                bars: [88, 94, 86, 97, 93, 96],
              },
              {
                id: "vault-access",
                label: "Just-in-Time Access Vault",
                metricLabel: "Standing Keys",
                metricValue: "Zero Keys",
                latency: "Instant Ephemeral",
                status: "Hardware Passkey",
                headline: "Replace static credentials with ephemeral biometric certificates",
                description:
                  "Grant time-bound production access via Slack approval workflows with full session recording and automatic revocation.",
                bullets: [
                  "Hardware-backed FIDO2 passkey authentication",
                  "Automated secret rotation for Postgres, Redis & AWS IAM",
                  "Immutable cryptographic audit log for every command",
                ],
                bars: [90, 87, 95, 92, 98, 94],
              },
            ]
          : [
              {
                id: "autonomous-pipeline",
                label: "Autonomous Workflow Studio",
                metricLabel: "Velocity Gain",
                metricValue: meta.metricHighlight || "4.2x Faster",
                latency: "Real-time Sync",
                status: "AI-Native",
                headline: `Orchestrate every campaign, deal, and sprint inside ${title}`,
                description:
                  "Replace 6 disconnected SaaS tabs with one unified workspace that captures context automatically and predicts next-best actions.",
                bullets: [
                  "Bi-directional sync with Slack, Notion, Linear, HubSpot & GitHub",
                  "Autonomous AI agents draft replies, specs, and follow-ups",
                  "Live executive attribution from first touch to closed revenue",
                ],
                bars: [84, 91, 88, 95, 90, 97],
              },
              {
                id: "conversion-lab",
                label: "Live Conversion & Funnel AI",
                metricLabel: "Conversion Lift",
                metricValue: "+68% Pipeline",
                latency: "Edge A/B Test",
                status: "Auto-Optimized",
                headline: "Personalize every touchpoint dynamically for each visitor",
                description:
                  "Enrich leads in real time, route high-intent accounts to senior reps within 30 seconds, and scale winning creative variations.",
                bullets: [
                  "Instant firmographic enrichment & intent scoring",
                  "Visual multi-step journey builder with conditional branching",
                  "Automated revenue cohort & LTV:CAC diagnostics",
                ],
                bars: [78, 86, 92, 89, 94, 96],
              },
              {
                id: "client-portal",
                label: "Executive Client Portal",
                metricLabel: "Client CSAT",
                metricValue: "99.1% Rating",
                latency: "White-Label",
                status: "Custom Domain",
                headline: "Give stakeholders a real-time window into deliverables & ROI",
                description:
                  "Share interactive roadmaps, one-click deliverable approvals, and automated billing milestones under your own custom domain.",
                bullets: [
                  "One-click stakeholder sign-off & version history",
                  "Automated time-tracking & milestone invoice generation",
                  "Granular guest permissions & SSO security",
                ],
                bars: [89, 83, 94, 91, 96, 98],
              },
            ];

  return {
    badge: `${title} · #${numId.toString().padStart(2, "0")} Pre-Built Edition`,
    heroLayout,
    sectionOrder,
    unitLabel,
    unitStep: 10,
    unitMin: 10,
    unitMax: 500,
    unitDefault: 120,
    dollarPerUnit: isTradingOrCrypto ? 420 : isCloudOrCyber ? 280 : 195,
    hoursSavedPerUnit: 2.4,
    sandboxTitle: `Interactive ${title} Command Center`,
    sandboxSubtitle: `Test how ${title} processes real-time workloads, automates manual bottlenecks, and compounds ${meta.metricHighlight.toLowerCase()}.`,
    sandboxModes,
    bentoCards: [
      {
        tag: "Architecture 01",
        title: `Built specifically for ${title} teams`,
        desc: meta.heroDescription,
        stat: meta.metricHighlight,
        statSub: "Verified across enterprise deployments",
      },
      {
        tag: "Automation 02",
        title: "Zero manual handoffs or brittle scripts",
        desc: `Every event in ${title} triggers deterministic workflows with full observability, instant rollback, and real-time webhook streaming.`,
        stat: "99.99%",
        statSub: "Execution reliability SLA",
      },
      {
        tag: "Integration 03",
        title: "Drop-in SDK & 1-click native connectors",
        desc: "Connect your existing data warehouse, auth provider, and payment or messaging rails in under 5 minutes without rewriting legacy code.",
        stat: "< 5 min",
        statSub: "From signup to live production",
      },
      {
        tag: "Governance 04",
        title: "Enterprise security & role-based control",
        desc: "Hardware-backed encryption, SAML 2.0 SSO, granular audit logs, and regional data residency built into every tier.",
        stat: "SOC2 II",
        statSub: "ISO 27001 & GDPR compliant",
      },
    ],
    legacyPainPoints: [
      "Stitching together 7+ fragmented tools with brittle Zapier webhooks",
      "Waiting days for manual approvals, data exports, and status updates",
      "Zero visibility into real-time unit economics or bottleneck root causes",
      "Generic, slow interfaces that frustrate power users and customers",
    ],
    automatedWins: [
      `Single unified ${title} operating system with real-time telemetry`,
      `Autonomous AI execution delivering ${meta.metricHighlight} out of the box`,
      "Sub-second live dashboards with predictive anomaly & ROI alerts",
      "Awwwards-grade tactile interface with instant keyboard & mobile flows",
    ],
    caseStudies: [
      {
        client: `${title.split(" ")[0]}Flow Global`,
        industry: title,
        title: `How ${title.split(" ")[0]}Flow scaled to ${meta.metricHighlight} in 60 days`,
        metric: meta.metricHighlight,
        quote: `"Switching to HudbirdUI's ${title} architecture eliminated 40 hours of weekly manual ops and paid for itself in the first 11 days."`,
      },
      {
        client: "Vanguard Meridian",
        industry: "Enterprise Operations",
        title: "Consolidating 14 legacy regional workflows into one live control plane",
        metric: "3.8x ROI Lift",
        quote: `"The interactive telemetry and speed of ${title} transformed how our leadership team allocates capital every single morning."`,
      },
      {
        client: "Aether Labs",
        industry: "High-Growth Scaleup",
        title: "Cutting customer onboarding time from 3 weeks to 4 minutes",
        metric: "-89% Onboarding Time",
        quote: `"Our customers rave about the new portal experience—our Net Promoter Score jumped 34 points within one quarter."`,
      },
    ],
    pricingPlans: [
      {
        name: "Growth Starter",
        desc: `Essential ${title} capabilities for fast-moving teams launching new initiatives.`,
        monthly: 79,
        annual: 64,
        features: [
          `Up to 5 team seats & ${title} workspaces`,
          "Real-time telemetry & Pexels visual studio",
          "Standard API, Webhook & Slack integration",
          "99.9% uptime SLA & community support",
        ],
      },
      {
        name: `${title} Pro`,
        desc: `Full automation power, custom branding, and priority compute for scaling organizations.`,
        monthly: 249,
        annual: 199,
        popular: true,
        features: [
          "Unlimited seats, workflows & custom domains",
          `Full ${meta.metricHighlight} optimization engine`,
          "Advanced role-based access & audit logs",
          "24/7 priority engineering Slack channel",
        ],
      },
      {
        name: "Enterprise Custom",
        desc: "Dedicated single-tenant cloud, custom SLAs, and hands-on architectural onboarding.",
        monthly: 890,
        annual: 720,
        features: [
          "Dedicated VPC / on-premise deployment option",
          "Custom SAML SSO, SOC2 & HIPAA BAA",
          "Dedicated Solutions Architect & quarterly reviews",
          "99.999% financially backed uptime SLA",
        ],
      },
    ],
    faqs: [
      {
        q: `How quickly can our team deploy ${title} into production?`,
        a: `Most teams connect their existing stack and go live with ${title} in under 15 minutes using our pre-built connectors and zero-config templates. Full enterprise migrations typically complete within 5 business days.`,
      },
      {
        q: `Does ${title} include all 29+ inner, auth, OTP, and legal pages?`,
        a: `Yes! Every single one of the 47 pre-built templates includes complete, route-ready inner pages—including Sign In, Register, Forgot Password, 6-Digit OTP Verification, Privacy Policy with sticky navigation, Pricing, Portfolio, Case Studies, and Client Portal.`,
      },
      {
        q: "Can we customize the brand accent color, light/dark polarity, and Pexels media?",
        a: "Absolutely. Everything is powered by semantic CSS tokens and modular React schemas, allowing instant runtime theme switching and 1-line customization.",
      },
    ],
  };
}

/**
 * 1. POLYMORPHIC HERO SECTION (5 Distinct Layout Architectures across the 47 Templates)
 */
export const HudbirdPolymorphicHero: React.FC<{
  meta: PrebuiltTemplateMeta;
  niche: NicheConfig;
  blueprint: DomainBlueprint;
}> = ({ meta, niche, blueprint }) => {
  const pack = getTemplatePexelsPack(meta.slug, meta.archetype);
  const [activePromptIdx, setActivePromptIdx] = useState(0);
  const [isPlayingWave, setIsPlayingWave] = useState(true);
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState(0);

  const variant = blueprint.heroLayout;
  const activeMode = blueprint.sandboxModes[activePromptIdx % blueprint.sandboxModes.length];

  return (
    <section className="relative overflow-x-clip bg-[#F4F5F8] pt-10 pb-20 text-zinc-900 transition-colors duration-300 sm:pt-14 sm:pb-28 dark:bg-[#0B0C10] dark:text-white">
      {/* Subtle Ambient Accent Glow */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-[340px] w-[720px] -translate-x-1/2 rounded-full opacity-20 blur-[130px] dark:opacity-25"
        style={{ backgroundColor: meta.accent }}
      />

      <Container className="relative z-10">
        {/* VARIANT 0 & 2: Split Asymmetric Studio + Interactive Live Console Card */}
        {(variant === 0 || variant === 2) && (
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="space-y-6 lg:col-span-6">
              <Reveal y={10}>
                <div className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-3.5 py-1.5 shadow-2xs dark:border-white/10 dark:bg-white/[0.07]">
                  <span
                    className="h-2 w-2 animate-pulse rounded-full"
                    style={{ backgroundColor: meta.accent }}
                  />
                  <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                    {blueprint.badge}
                  </span>
                  <span className="rounded-full bg-[#C8F560] px-2 py-0.5 text-[10px] font-bold text-[#0D0F14]">
                    {meta.metricHighlight}
                  </span>
                </div>
              </Reveal>

              <MaskedHeading
                as="h1"
                text={`${meta.heroPreText} *${meta.heroAccentWord}* ${meta.heroPostText}`}
                accent={meta.heroAccentWord}
                className="text-[clamp(2.35rem,4.6vw,4.1rem)] leading-[1.04] font-semibold tracking-[-0.04em] text-zinc-900 dark:text-white"
              />

              <p className="max-w-xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
                {meta.heroDescription}
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <PillLink href={`/demos/${meta.slug}/contact`} variant="brand" size="lg">
                  {meta.primaryCtaLabel}
                </PillLink>
                <PillLink href={`/demos/${meta.slug}/services`} variant="outline" size="lg">
                  Explore {meta.title}
                </PillLink>
              </div>

              {/* Trust Avatar Row + Live Metric */}
              <div className="flex flex-wrap items-center gap-6 border-t border-black/[0.06] pt-4 dark:border-white/10">
                <div className="flex items-center -space-x-2.5">
                  {pack.avatars.map((av, i) => (
                    <img
                      key={i}
                      src={av}
                      alt="Verified Customer"
                      className="h-9 w-9 rounded-full object-cover ring-2 ring-white dark:ring-[#0B0C10]"
                    />
                  ))}
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C8F560] text-[11px] font-bold text-[#0D0F14] ring-2 ring-white dark:ring-[#0B0C10]">
                    4.9★
                  </span>
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                  <strong className="font-semibold text-zinc-900 dark:text-white">
                    {meta.metricHighlight}
                  </strong>{" "}
                  · Trusted by 1,400+ modern teams
                </div>
              </div>
            </div>

            {/* Right Interactive Double-Bezel Visual + Live Telemetry Console */}
            <div className="lg:col-span-6">
              <div className={HB.bezel}>
                <div className="space-y-4 rounded-[28px] border border-black/[0.06] bg-white p-4 sm:p-5 dark:border-white/10 dark:bg-[#14161D]">
                  {/* Pexels Hero Frame with Interactive Overlay */}
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] bg-zinc-900">
                    <HbImage
                      src={pack.hero}
                      alt={meta.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                    {/* Top Floating Status Bar */}
                    <div className="absolute top-3.5 right-3.5 left-3.5 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                        <Activity className="h-3.5 w-3.5 text-[#C8F560]" />
                        {activeMode.status}
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsPlayingWave(!isPlayingWave)}
                        className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-[#C8F560] px-3 py-1 text-xs font-bold text-[#0D0F14] shadow"
                      >
                        {isPlayingWave ? (
                          <Pause className="h-3 w-3" />
                        ) : (
                          <Play className="h-3 w-3" />
                        )}
                        <span>{isPlayingWave ? "Live Telemetry" : "Paused"}</span>
                      </button>
                    </div>

                    {/* Bottom Interactive Waveform / Telemetry Bars inside Hero Image */}
                    <div className="absolute right-3.5 bottom-3.5 left-3.5 flex items-center justify-between gap-4 rounded-2xl border border-white/15 bg-black/75 p-3.5 text-white backdrop-blur-xl">
                      <div>
                        <div className="text-[11px] text-zinc-300">{activeMode.metricLabel}</div>
                        <div className="text-lg font-bold tracking-tight text-[#C8F560] tabular-nums">
                          {activeMode.metricValue}
                        </div>
                      </div>
                      <div className="flex h-9 items-end gap-1.5">
                        {activeMode.bars.map((h, idx) => (
                          <motion.span
                            key={idx}
                            animate={{
                              height: isPlayingWave
                                ? [`${Math.max(25, h - 20)}%`, `${h}%`, `${Math.max(30, h - 15)}%`]
                                : `${h}%`,
                            }}
                            transition={{
                              duration: 1.4,
                              repeat: isPlayingWave ? Infinity : 0,
                              delay: idx * 0.12,
                            }}
                            className="w-2 rounded-full"
                            style={{ backgroundColor: idx % 2 === 0 ? "#C8F560" : meta.accent }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Interactive Mode Selector Pills inside Hero Card */}
                  <div className="grid grid-cols-3 gap-2">
                    {blueprint.sandboxModes.map((m, idx) => {
                      const active = activePromptIdx === idx;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setActivePromptIdx(idx)}
                          className={`cursor-pointer rounded-2xl border p-3 text-left transition-all ${
                            active
                              ? "border-transparent bg-zinc-900 text-white shadow-sm dark:bg-[#C8F560] dark:text-[#0D0F14]"
                              : "border-black/[0.05] bg-[#F4F5F8] text-zinc-700 hover:bg-zinc-200/70 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300 dark:hover:bg-white/10"
                          }`}
                        >
                          <div className="truncate text-[11px] font-bold">{m.label}</div>
                          <div
                            className={`mt-0.5 truncate text-[10px] ${
                              active ? "opacity-85" : "text-zinc-500 dark:text-zinc-400"
                            }`}
                          >
                            {m.latency}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VARIANT 1 & 3: Centered Editorial Flagship + Interactive 3-Column Visual Bento Deck */}
        {(variant === 1 || variant === 3) && (
          <div className="space-y-12">
            <div className="mx-auto max-w-3xl space-y-5 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-4 py-1.5 shadow-2xs dark:border-white/10 dark:bg-white/[0.07]">
                <Sparkles className="h-3.5 w-3.5" style={{ color: meta.accent }} />
                <span className="text-xs font-semibold">{blueprint.badge}</span>
              </div>

              <MaskedHeading
                as="h1"
                text={`${meta.heroPreText} *${meta.heroAccentWord}* ${meta.heroPostText}`}
                accent={meta.heroAccentWord}
                className="text-[clamp(2.4rem,4.8vw,4.3rem)] leading-[1.04] font-semibold tracking-[-0.04em]"
              />

              <p className="mx-auto max-w-2xl text-base text-zinc-600 sm:text-lg dark:text-zinc-400">
                {meta.heroDescription}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
                <PillLink href={`/demos/${meta.slug}/contact`} variant="brand" size="lg">
                  {meta.primaryCtaLabel}
                </PillLink>
                <PillLink href={`/demos/${meta.slug}/pricing`} variant="outline" size="lg">
                  View Pricing & ROI
                </PillLink>
              </div>
            </div>

            {/* 3-Card Asymmetric Interactive Hero Showcase */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
              {/* Left 4 cols: Dark Telemetry & Live Controls */}
              <div className="flex flex-col justify-between space-y-6 rounded-[28px] border border-white/10 bg-[#0E1016] p-6 text-white lg:col-span-4">
                <div className="space-y-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#C8F560] px-3 py-1 text-xs font-bold text-[#0D0F14]">
                    {meta.metricHighlight}
                  </span>
                  <h3 className="pt-1 text-xl font-semibold tracking-tight">
                    {activeMode.headline}
                  </h3>
                  <p className="text-xs leading-relaxed text-zinc-400">{activeMode.description}</p>
                </div>

                <div className="space-y-2">
                  {blueprint.sandboxModes.map((m, idx) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setActivePromptIdx(idx)}
                      className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all ${
                        activePromptIdx === idx
                          ? "bg-[#C8F560] text-[#0D0F14]"
                          : "bg-white/[0.06] text-zinc-300 hover:bg-white/10"
                      }`}
                    >
                      <span>{m.label}</span>
                      <span className="tabular-nums">{m.metricValue}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Center 5 cols: Main Pexels Architectural / Product Showcase */}
              <div className="group relative min-h-[340px] overflow-hidden rounded-[28px] bg-zinc-900 lg:col-span-5">
                <HbImage
                  src={pack.gallery[activePromptIdx % pack.gallery.length]}
                  alt={meta.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute right-5 bottom-5 left-5 flex items-center justify-between rounded-2xl border border-black/10 bg-white/90 p-4 backdrop-blur-xl dark:border-white/15 dark:bg-zinc-900/90">
                  <div>
                    <div className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
                      {meta.title} Live Workspace
                    </div>
                    <div className="text-sm font-bold text-zinc-900 dark:text-white">
                      {activeMode.label} · {activeMode.status}
                    </div>
                  </div>
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full text-white"
                    style={{ backgroundColor: meta.accent }}
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>

              {/* Right 3 cols: Stacked Metric + Secondary Pexels Card */}
              <div className="flex flex-col gap-5 lg:col-span-3">
                <div className="flex flex-1 flex-col justify-between rounded-[28px] border border-black/[0.06] bg-white p-6 dark:border-white/10 dark:bg-[#14161D]">
                  <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                    Verified Performance
                  </span>
                  <div className="my-2">
                    <div
                      className="text-3xl font-bold tracking-tight tabular-nums"
                      style={{ color: meta.accent }}
                    >
                      {meta.metricHighlight}
                    </div>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                      Benchmarked across production {meta.title} deployments
                    </p>
                  </div>
                  <Link
                    to={`/demos/${meta.slug}/case-study-detail`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-900 hover:underline dark:text-[#C8F560]"
                  >
                    <span>Read case study</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <div className="relative h-44 overflow-hidden rounded-[28px] bg-zinc-900">
                  <HbImage
                    src={pack.secondary}
                    alt={meta.tagline}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-end bg-black/45 p-4">
                    <span className="text-xs font-semibold text-white">{meta.tagline}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VARIANT 4: Interactive Expandable Pexels Gallery Accordion Hero */}
        {variant === 4 && (
          <div className="space-y-10">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div className="max-w-2xl space-y-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#C8F560] px-3.5 py-1.5 text-xs font-bold text-[#0D0F14]">
                  <Sparkles className="h-3.5 w-3.5" />
                  {blueprint.badge}
                </span>
                <MaskedHeading
                  as="h1"
                  text={`${meta.heroPreText} *${meta.heroAccentWord}* ${meta.heroPostText}`}
                  accent={meta.heroAccentWord}
                  className="text-[clamp(2.3rem,4.5vw,4rem)] leading-[1.05] font-semibold tracking-[-0.04em]"
                />
              </div>
              <div className="max-w-md space-y-4">
                <p className="text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400">
                  {meta.heroDescription}
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <PillLink href={`/demos/${meta.slug}/contact`} variant="brand" size="md">
                    {meta.primaryCtaLabel}
                  </PillLink>
                  <PillLink href={`/demos/${meta.slug}/portfolio`} variant="outline" size="md">
                    Selected Work ({meta.metricHighlight})
                  </PillLink>
                </div>
              </div>
            </div>

            {/* Interactive 4-Panel Expandable Pexels Strip */}
            <div className="grid min-h-[380px] grid-cols-1 gap-4 md:grid-cols-12">
              {pack.gallery.map((imgUrl, idx) => {
                const isExpanded = selectedGalleryIdx === idx;
                const modeItem = blueprint.sandboxModes[idx % blueprint.sandboxModes.length];
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setSelectedGalleryIdx(idx)}
                    onClick={() => setSelectedGalleryIdx(idx)}
                    className={`relative min-h-[260px] cursor-pointer overflow-hidden rounded-[28px] transition-all duration-500 md:min-h-[380px] ${
                      isExpanded ? "md:col-span-6" : "md:col-span-2"
                    }`}
                  >
                    <HbImage
                      src={imgUrl}
                      alt={`${meta.title} ${idx + 1}`}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
                        0{idx + 1}
                      </span>
                    </div>
                    <div className="absolute right-4 bottom-4 left-4 text-white">
                      <div className="text-xs font-bold text-[#C8F560]">{modeItem.metricValue}</div>
                      <div className="mt-0.5 truncate text-base font-semibold tracking-tight">
                        {modeItem.label}
                      </div>
                      {isExpanded && (
                        <p className="mt-1 line-clamp-2 text-xs text-zinc-300">
                          {modeItem.description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

/**
 * 2. INTERACTIVE DOMAIN SANDBOX & LIVE WORKFLOW SIMULATOR
 */
export const HudbirdInteractiveDomainSandbox: React.FC<{
  meta: PrebuiltTemplateMeta;
  blueprint: DomainBlueprint;
}> = ({ meta, blueprint }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [autoBoost, setAutoBoost] = useState(true);
  const pack = getTemplatePexelsPack(meta.slug, meta.archetype);
  const current = blueprint.sandboxModes[activeIdx] || blueprint.sandboxModes[0];

  return (
    <HbSection tone="light" id="interactive-sandbox">
      <HbHeader
        badge={`Interactive ${meta.title} Playground`}
        title={`Experience *${meta.title}* workflows in real time`}
        accent={meta.title}
        subtitle={blueprint.sandboxSubtitle}
      />

      <div className={HB.bezel}>
        <div className="rounded-[28px] border border-black/[0.06] bg-[#F4F5F8] p-5 sm:p-8 dark:border-white/10 dark:bg-[#14161D]">
          {/* Top Mode Tabs + AI Boost Switch */}
          <div className="mb-6 flex flex-col justify-between gap-4 border-b border-black/[0.06] pb-6 md:flex-row md:items-center dark:border-white/10">
            <div className="flex flex-wrap items-center gap-2">
              {blueprint.sandboxModes.map((mode, idx) => {
                const active = activeIdx === idx;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    className={`flex cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold transition-all ${
                      active
                        ? "bg-zinc-900 text-white shadow-sm dark:bg-[#C8F560] dark:text-[#0D0F14]"
                        : "bg-white text-zinc-600 hover:bg-zinc-100 dark:bg-white/[0.05] dark:text-zinc-300 dark:hover:bg-white/10"
                    }`}
                  >
                    <Sliders className="h-3.5 w-3.5" />
                    <span>{mode.label}</span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setAutoBoost(!autoBoost)}
              className="inline-flex cursor-pointer items-center gap-2.5 self-start rounded-full border border-black/[0.08] bg-white px-4 py-2 text-xs font-semibold md:self-auto dark:border-white/10 dark:bg-white/[0.06]"
            >
              <span
                className={`flex h-4 w-8 items-center rounded-full p-0.5 transition-colors ${
                  autoBoost
                    ? "justify-end bg-[#84CC16]"
                    : "justify-start bg-zinc-300 dark:bg-zinc-700"
                }`}
              >
                <span className="h-3 w-3 rounded-full bg-white shadow" />
              </span>
              <span>Autonomous Optimization: {autoBoost ? "Active (+24% Lift)" : "Standard"}</span>
            </button>
          </div>

          {/* Sandbox Body: Left Interactive Spec + Right Visual & Telemetry */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id + String(autoBoost)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12"
            >
              <div className="space-y-5 lg:col-span-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#C8F560] px-3 py-1 text-xs font-bold text-[#0D0F14]">
                  <Zap className="h-3.5 w-3.5" />
                  <span>
                    {current.metricLabel}: {current.metricValue}
                  </span>
                </div>

                <h3 className="text-2xl leading-tight font-semibold tracking-[-0.03em] text-zinc-900 sm:text-3xl dark:text-white">
                  {current.headline}
                </h3>

                <p className="text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400">
                  {current.description}
                </p>

                <ul className="space-y-2.5 pt-1">
                  {current.bullets.map((b, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm font-medium text-zinc-800 dark:text-zinc-200"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#C8F560] text-[#0D0F14]">
                        <Check className="h-3 w-3 stroke-[2.5]" />
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <PillLink href={`/demos/${meta.slug}/service-detail`} variant="brand" size="md">
                    Launch {current.label}
                  </PillLink>
                  <Link
                    to={`/demos/${meta.slug}/integrations`}
                    className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-semibold text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
                  >
                    <span>Explore API & Webhooks</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-12 lg:col-span-6">
                {/* Pexels Visual Card */}
                <div className="relative min-h-[280px] overflow-hidden rounded-[24px] bg-zinc-900 sm:col-span-7">
                  <HbImage
                    src={pack.gallery[(activeIdx + 1) % pack.gallery.length]}
                    alt={current.label}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute right-4 bottom-4 left-4 text-white">
                    <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-semibold backdrop-blur-md">
                      {current.status}
                    </span>
                    <div className="mt-1 text-base font-semibold">{current.label}</div>
                    <div className="text-xs text-zinc-300">{current.latency}</div>
                  </div>
                </div>

                {/* Live Animated Telemetry Column */}
                <div className="flex flex-col justify-between rounded-[24px] border border-white/10 bg-[#0D0F14] p-5 text-white sm:col-span-5">
                  <div>
                    <div className="flex items-center justify-between text-xs text-zinc-400">
                      <span>Throughput</span>
                      <span className="font-semibold text-[#C8F560]">{current.latency}</span>
                    </div>
                    <div className="mt-1 text-2xl font-bold tracking-tight tabular-nums">
                      {current.metricValue}
                    </div>
                  </div>

                  <div className="my-5 space-y-2.5">
                    {current.bars.slice(0, 4).map((val, idx) => {
                      const boostedVal = autoBoost ? Math.min(100, val + 6) : val;
                      return (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between text-[10px] text-zinc-400">
                            <span>Node 0{idx + 1}</span>
                            <span className="font-semibold text-white tabular-nums">
                              {boostedVal}%
                            </span>
                          </div>
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${boostedVal}%` }}
                              transition={{ duration: 0.5, delay: idx * 0.06 }}
                              className="h-full rounded-full"
                              style={{
                                backgroundColor: idx === 0 ? "#C8F560" : meta.accent,
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 pt-3 text-[11px] text-zinc-400">
                    <span>Status</span>
                    <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-400">
                      <span className="h-1.5 w-1.5 animate-ping rounded-full bg-emerald-400" />
                      Optimal
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </HbSection>
  );
};

/**
 * 3. ASYMMETRIC DOUBLE-BEZEL EDITORIAL BENTO (7/5 + 5/7 Grid with Domain Pexels Media)
 */
export const HudbirdAsymmetricEditorialBento: React.FC<{
  meta: PrebuiltTemplateMeta;
  blueprint: DomainBlueprint;
}> = ({ meta, blueprint }) => {
  const pack = getTemplatePexelsPack(meta.slug, meta.archetype);

  return (
    <HbSection tone="muted" id="architecture-bento">
      <HbHeader
        badge={`Why ${meta.title} Wins`}
        title={`Engineered for *${meta.heroAccentWord}* at enterprise scale`}
        accent={meta.heroAccentWord}
        subtitle={`Unlike generic templates, ${meta.title} pairs domain-calibrated workflows with tactile telemetry.`}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {blueprint.bentoCards.map((card, idx) => {
          const isWide = idx === 0 || idx === 3;
          const imgUrl = pack.gallery[idx % pack.gallery.length];

          return (
            <div
              key={card.tag}
              className={`${isWide ? "lg:col-span-7" : "lg:col-span-5"} ${HB.bezel}`}
            >
              <div className="group flex h-full flex-col justify-between gap-6 rounded-[28px] border border-black/[0.06] bg-white p-6 transition-all duration-300 hover:-translate-y-1 sm:p-7 dark:border-white/10 dark:bg-[#14161D]">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[#F4F5F8] px-3 py-1 text-xs font-semibold text-zinc-700 dark:bg-white/[0.06] dark:text-zinc-300">
                    {card.tag}
                  </span>
                  <span className="rounded-full bg-[#C8F560] px-3 py-1 text-xs font-bold text-[#0D0F14] tabular-nums">
                    {card.stat}
                  </span>
                </div>

                <div className="grid grid-cols-1 items-center gap-5 sm:grid-cols-12">
                  <div
                    className={isWide ? "space-y-2.5 sm:col-span-7" : "space-y-2.5 sm:col-span-12"}
                  >
                    <h3 className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl dark:text-white">
                      {card.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {card.desc}
                    </p>
                  </div>

                  {isWide && (
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-900 sm:col-span-5">
                      <HbImage
                        src={imgUrl}
                        alt={card.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-black/[0.06] pt-4 text-xs text-zinc-500 dark:border-white/10 dark:text-zinc-400">
                  <span>{card.statSub}</span>
                  <Link
                    to={`/demos/${meta.slug}/services`}
                    className="inline-flex items-center gap-1 font-semibold text-zinc-900 group-hover:text-[color:var(--brand-primary,#7C3AED)] dark:text-white"
                  >
                    <span>Inspect spec</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </HbSection>
  );
};

/**
 * 4. INTERACTIVE DOMAIN ROI & EFFICIENCY CALCULATOR
 */
export const HudbirdInteractiveRoiSimulator: React.FC<{
  meta: PrebuiltTemplateMeta;
  blueprint: DomainBlueprint;
}> = ({ meta, blueprint }) => {
  const [units, setUnits] = useState(blueprint.unitDefault);
  const [annualCommit, setAnnualCommit] = useState(true);

  const annualSavings = useMemo(() => {
    const base = units * blueprint.dollarPerUnit * 12;
    return Math.round(annualCommit ? base * 1.18 : base);
  }, [units, blueprint.dollarPerUnit, annualCommit]);

  const hoursSaved = useMemo(() => {
    return Math.round(units * blueprint.hoursSavedPerUnit);
  }, [units, blueprint.hoursSavedPerUnit]);

  return (
    <HbSection tone="light" id="roi-calculator">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-6">
          <span className={HB.chip}>Interactive ROI & Efficiency Simulator</span>
          <MaskedHeading
            as="h2"
            text={`Quantify your *${meta.title}* return in 30 seconds`}
            accent={meta.title}
            className="text-[clamp(1.9rem,3.6vw,3.1rem)] leading-[1.08] font-semibold tracking-[-0.035em]"
          />
          <p className="text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400">
            Adjust the volume slider to match your current operations and see how{" "}
            <strong className="text-zinc-900 dark:text-white">{meta.title}</strong> compounds{" "}
            {meta.metricHighlight.toLowerCase()} over 12 months.
          </p>

          {/* Interactive Slider Card */}
          <div className="space-y-5 rounded-[28px] border border-black/[0.06] bg-[#F4F5F8] p-6 dark:border-white/10 dark:bg-[#14161D]">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                {blueprint.unitLabel}
              </label>
              <span className="rounded-full bg-zinc-900 px-3 py-1 text-sm font-bold text-white tabular-nums dark:bg-[#C8F560] dark:text-[#0D0F14]">
                {units.toLocaleString()}
              </span>
            </div>

            <input
              type="range"
              min={blueprint.unitMin}
              max={blueprint.unitMax}
              step={blueprint.unitStep}
              value={units}
              onChange={(e) => setUnits(Number(e.target.value))}
              className="h-2 w-full cursor-pointer rounded-lg bg-zinc-300 accent-[#84CC16] dark:bg-white/15"
            />

            <div className="flex items-center justify-between text-[11px] text-zinc-400 tabular-nums">
              <span>{blueprint.unitMin}</span>
              <span>{Math.round(blueprint.unitMax / 2)}</span>
              <span>{blueprint.unitMax}+</span>
            </div>

            <div className="flex items-center justify-between border-t border-black/[0.06] pt-3 dark:border-white/10">
              <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
                Enable AI Autonomous Mode (+18% efficiency)
              </span>
              <button
                type="button"
                onClick={() => setAnnualCommit(!annualCommit)}
                className={`cursor-pointer rounded-full px-3 py-1 text-xs font-bold transition-colors ${
                  annualCommit
                    ? "bg-[#C8F560] text-[#0D0F14]"
                    : "bg-zinc-200 text-zinc-700 dark:bg-white/10 dark:text-zinc-300"
                }`}
              >
                {annualCommit ? "Enabled ✓" : "Enable"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Dark Output Telemetry Card */}
        <div className="lg:col-span-6">
          <div className={HB.bezel}>
            <div className="space-y-6 rounded-[28px] border border-white/10 bg-[#0D0F14] p-7 text-white sm:p-9">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-zinc-300">
                  Projected Annual Impact
                </span>
                <span className="rounded-full bg-[#C8F560] px-3 py-1 text-xs font-bold text-[#0D0F14]">
                  {meta.metricHighlight}
                </span>
              </div>

              <div>
                <div className="text-xs text-zinc-400">Estimated Annual Value & Savings</div>
                <div className="mt-1 text-4xl font-bold tracking-[-0.04em] text-[#C8F560] tabular-nums sm:text-5xl">
                  ${annualSavings.toLocaleString()}
                  <span className="text-base font-normal text-zinc-400"> / year</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <div className="text-xs text-zinc-400">Engineering / Ops Hours Saved</div>
                  <div className="mt-1 text-2xl font-bold tabular-nums">
                    {hoursSaved.toLocaleString()} hrs/mo
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <div className="text-xs text-zinc-400">Payback Period</div>
                  <div className="mt-1 text-2xl font-bold text-emerald-400 tabular-nums">
                    &lt; 14 Days
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <PillLink href={`/demos/${meta.slug}/contact`} variant="brand" size="md">
                  Claim Custom ROI Report
                </PillLink>
                <Link
                  to={`/demos/${meta.slug}/pricing`}
                  className="text-xs font-semibold text-zinc-300 transition-colors hover:text-[#C8F560]"
                >
                  Compare Pricing Tiers →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HbSection>
  );
};

/**
 * 5. BEFORE vs AFTER WORKFLOW DIFF & CASE STUDIES DECK
 */
export const HudbirdBeforeAfterAndCases: React.FC<{
  meta: PrebuiltTemplateMeta;
  blueprint: DomainBlueprint;
}> = ({ meta, blueprint }) => {
  const [diffMode, setDiffMode] = useState<"after" | "before">("after");
  const pack = getTemplatePexelsPack(meta.slug, meta.archetype);

  return (
    <HbSection tone="muted" id="workflow-comparison">
      <div className="space-y-20">
        {/* Before vs After Interactive Toggle Card */}
        <div className="space-y-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl space-y-3">
              <span className={HB.chip}>Architecture Transformation</span>
              <h2 className="text-3xl font-semibold tracking-[-0.035em] text-zinc-900 sm:text-4xl dark:text-white">
                Stop duct-taping legacy tools. Upgrade to{" "}
                <span style={{ color: meta.accent }}>{meta.title}</span>.
              </h2>
            </div>

            <div className="inline-flex self-start rounded-full border border-black/[0.08] bg-white p-1.5 dark:border-white/10 dark:bg-[#14161D]">
              <button
                type="button"
                onClick={() => setDiffMode("before")}
                className={`cursor-pointer rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                  diffMode === "before"
                    ? "bg-rose-500 text-white"
                    : "text-zinc-600 dark:text-zinc-400"
                }`}
              >
                Legacy Manual Stack
              </button>
              <button
                type="button"
                onClick={() => setDiffMode("after")}
                className={`cursor-pointer rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                  diffMode === "after"
                    ? "bg-[#C8F560] text-[#0D0F14]"
                    : "text-zinc-600 dark:text-zinc-400"
                }`}
              >
                HudbirdUI {meta.title}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Legacy Side */}
            <div
              className={`rounded-[28px] border p-7 transition-all ${
                diffMode === "before"
                  ? "border-rose-500/40 bg-white ring-2 ring-rose-500/20 dark:bg-[#14161D]"
                  : "border-black/[0.05] bg-white/60 opacity-75 dark:border-white/5 dark:bg-[#14161D]/60"
              }`}
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="rounded-full bg-rose-500/10 px-3 py-1 text-xs font-bold text-rose-600 dark:text-rose-400">
                  Before · Fragmented Legacy Workflow
                </span>
                <span className="text-xs text-zinc-400">Slow & Error-Prone</span>
              </div>
              <ul className="space-y-3.5">
                {blueprint.legacyPainPoints.map((pt, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-500/15 text-xs font-bold text-rose-500">
                      ✕
                    </span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* HudbirdUI Automated Side */}
            <div
              className={`rounded-[28px] border p-7 transition-all ${
                diffMode === "after"
                  ? "border-[#C8F560]/50 bg-[#0D0F14] text-white shadow-xl ring-2 ring-[#C8F560]/30"
                  : "border-white/10 bg-[#0D0F14]/90 text-white"
              }`}
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="rounded-full bg-[#C8F560] px-3 py-1 text-xs font-bold text-[#0D0F14]">
                  After · HudbirdUI {meta.title}
                </span>
                <span className="text-xs font-semibold text-[#C8F560]">{meta.metricHighlight}</span>
              </div>
              <ul className="space-y-3.5">
                {blueprint.automatedWins.map((win, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-zinc-100">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#C8F560] text-[#0D0F14]">
                      <Check className="h-3 w-3 stroke-[2.5]" />
                    </span>
                    <span>{win}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 3 Curated Domain Case Study Cards with Pexels Photography */}
        <div className="space-y-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className={HB.chip}>Verified Customer Outcomes</span>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
                How category leaders win with {meta.title}
              </h3>
            </div>
            <Link
              to={`/demos/${meta.slug}/portfolio`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 hover:underline dark:text-[#C8F560]"
            >
              <span>View all case studies</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {blueprint.caseStudies.map((cs, idx) => (
              <Link
                key={cs.client}
                to={`/demos/${meta.slug}/case-study-detail`}
                className="group flex flex-col justify-between rounded-[28px] border border-black/[0.06] bg-white p-3.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-[#14161D]"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-zinc-900">
                  <HbImage
                    src={pack.caseStudies[idx % pack.caseStudies.length]}
                    alt={cs.client}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <span className="absolute top-3 left-3 rounded-full bg-[#C8F560] px-3 py-1 text-xs font-bold text-[#0D0F14]">
                    {cs.metric}
                  </span>
                </div>

                <div className="space-y-2.5 p-3 pt-4">
                  <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                    {cs.client} · {cs.industry}
                  </div>
                  <h4 className="text-base font-semibold text-zinc-900 transition-colors group-hover:text-[color:var(--brand-primary,#7C3AED)] dark:text-white">
                    {cs.title}
                  </h4>
                  <p className="line-clamp-2 text-xs text-zinc-500 italic dark:text-zinc-400">
                    {cs.quote}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </HbSection>
  );
};

/**
 * 6. DOMAIN PRICING & INTERACTIVE ACCORDION FAQ
 */
export const HudbirdDomainPricingAndFaq: React.FC<{
  meta: PrebuiltTemplateMeta;
  blueprint: DomainBlueprint;
}> = ({ meta, blueprint }) => {
  const [annual, setAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <HbSection tone="light" id="pricing-and-faq">
      <div className="space-y-20">
        {/* Pricing Header + Billing Toggle */}
        <div className="space-y-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl space-y-3">
              <span className={HB.chip}>Transparent {meta.title} Pricing</span>
              <h2 className="text-3xl font-semibold tracking-[-0.035em] text-zinc-900 sm:text-4xl dark:text-white">
                Predictable plans that scale with your{" "}
                <span style={{ color: meta.accent }}>{meta.heroAccentWord}</span>
              </h2>
            </div>

            <div className="inline-flex items-center gap-1.5 self-start rounded-full border border-black/[0.08] bg-[#F4F5F8] p-1.5 dark:border-white/10 dark:bg-[#14161D]">
              <button
                type="button"
                onClick={() => setAnnual(false)}
                className={`cursor-pointer rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                  !annual
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                    : "text-zinc-500"
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setAnnual(true)}
                className={`cursor-pointer rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                  annual ? "bg-[#C8F560] text-[#0D0F14]" : "text-zinc-500"
                }`}
              >
                Annual (Save 20%)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {blueprint.pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`flex flex-col justify-between rounded-[28px] border p-7 transition-all ${
                  plan.popular
                    ? "border-[#C8F560]/50 bg-[#0D0F14] text-white shadow-xl"
                    : "border-black/[0.06] bg-[#F4F5F8] text-zinc-900 dark:border-white/10 dark:bg-[#14161D] dark:text-white"
                }`}
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{plan.name}</h3>
                    {plan.popular && (
                      <span className="rounded-full bg-[#C8F560] px-3 py-1 text-[11px] font-bold text-[#0D0F14]">
                        Most Popular
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-xs leading-relaxed ${
                      plan.popular ? "text-zinc-300" : "text-zinc-600 dark:text-zinc-400"
                    }`}
                  >
                    {plan.desc}
                  </p>
                  <div className="pt-2">
                    <span className="text-4xl font-bold tracking-tight tabular-nums">
                      ${annual ? plan.annual : plan.monthly}
                    </span>
                    <span
                      className={`text-xs ${
                        plan.popular ? "text-zinc-400" : "text-zinc-500 dark:text-zinc-400"
                      }`}
                    >
                      {" "}
                      / month
                    </span>
                  </div>
                  <ul className="space-y-2.5 pt-2">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-xs">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#C8F560] text-[#0D0F14]">
                          <Check className="h-2.5 w-2.5 stroke-[2.5]" />
                        </span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-7">
                  <PillLink
                    href={`/demos/${meta.slug}/contact`}
                    variant={plan.popular ? "brand" : "outline"}
                    size="md"
                    fullWidth
                  >
                    {meta.primaryCtaLabel}
                  </PillLink>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Domain FAQ Accordion */}
        <div className="mx-auto max-w-3xl space-y-4">
          <div className="mb-8 space-y-2 text-center">
            <span className={HB.chip}>Frequently Asked Questions</span>
            <h3 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
              Everything you need to know about {meta.title}
            </h3>
          </div>

          {blueprint.faqs.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-[24px] border border-black/[0.06] bg-[#F4F5F8] dark:border-white/10 dark:bg-[#14161D]"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left text-sm font-semibold text-zinc-900 sm:p-6 sm:text-base dark:text-white"
                >
                  <span>{item.q}</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white dark:bg-white/10">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-6 text-sm leading-relaxed text-zinc-600 sm:px-6 dark:text-zinc-400">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </HbSection>
  );
};

/**
 * MASTER POLYMORPHIC TEMPLATE HOME RENDERER
 * Ensures all 47 pre-built templates render bespoke hero variations,
 * domain-specific Pexels photography, interactive sandboxes, and varied section sequences.
 */
export const HudbirdPolymorphicTemplateHome: React.FC<{
  niche: NicheConfig;
  meta: PrebuiltTemplateMeta;
  customBrandPrimary?: string;
}> = ({ niche, meta }) => {
  const blueprint = useMemo(() => getTemplateDomainBlueprint(meta, niche), [meta, niche]);

  // Permute the body sections based on blueprint.sectionOrder so different templates have distinct narrative rhythm
  const orderedSections = useMemo(() => {
    const sandbox = (
      <HudbirdInteractiveDomainSandbox key="sandbox" meta={meta} blueprint={blueprint} />
    );
    const bento = <HudbirdAsymmetricEditorialBento key="bento" meta={meta} blueprint={blueprint} />;
    const roi = <HudbirdInteractiveRoiSimulator key="roi" meta={meta} blueprint={blueprint} />;
    const diffCases = (
      <HudbirdBeforeAfterAndCases key="diffCases" meta={meta} blueprint={blueprint} />
    );

    if (blueprint.sectionOrder === 1) return [bento, sandbox, diffCases, roi];
    if (blueprint.sectionOrder === 2) return [sandbox, roi, bento, diffCases];
    if (blueprint.sectionOrder === 3) return [diffCases, sandbox, roi, bento];
    return [sandbox, bento, roi, diffCases];
  }, [meta, blueprint]);

  return (
    <div className="min-h-screen bg-[#F4F5F8] text-zinc-900 transition-colors duration-300 dark:bg-[#0B0C10] dark:text-white">
      <NavbarMegaMenu data={niche.sections.navbar} />
      <HudbirdPolymorphicHero meta={meta} niche={niche} blueprint={blueprint} />
      {orderedSections}
      <HudbirdDomainPricingAndFaq meta={meta} blueprint={blueprint} />
      <AllPagesDirectory nicheSlug={niche.slug} nicheName={meta.title || niche.name} />
      <SplitTextCtaFooter data={niche.sections.footer} />
    </div>
  );
};
