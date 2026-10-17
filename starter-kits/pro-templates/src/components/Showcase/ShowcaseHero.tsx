import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Heart,
  SkipForward,
  SkipBack,
  Plus,
  ArrowUpRight,
  Sparkles,
  LayoutGrid,
  Check,
  Layers,
  KeyRound,
  Activity,
} from "lucide-react";
import { PEXELS, getTemplatePexelsPack } from "../nexus-sections/HudbirdVisualWidgets";
import { HudbirdTemplateLogoIcon } from "../nexus-sections/HudbirdKit";

const FEATURED_SHOWCASE_DEMOS = [
  {
    slug: "digital-agency",
    num: "01",
    title: "Digital Agency Studio",
    category: "Agency & Creative Flagship",
    headline: "Turning digital ideas into measurable client growth",
    accentWord: "measurable",
    description:
      "2-column split agency hero, 3 fan-tilted 3D visual cards, interactive services bento, project showcase slider, and full client portal.",
    accent: "#7C3AED",
    metric: "3.4x Client ROI",
    secondaryMetric: "98.4% Retention",
    screenshot: "/assets/templates/prebuilt/digital-agency.jpg",
    highlights: [
      "Interactive Services & Deliverable Matrix",
      "Filterable Portfolio & Case Study Detail Views",
      "Interactive Sprint & Project Cost Estimator",
    ],
  },
  {
    slug: "ai-voice-generator",
    num: "02",
    title: "AI Voice & Audio Studio",
    category: "Generative AI & Media SaaS",
    headline: "Clone, direct, and stream studio-grade neural voices",
    accentWord: "studio-grade",
    description:
      "Real-time neural waveform playground, syllable-level emotion & pitch director, multi-track dubbing calculator, and dark OLED telemetry.",
    accent: "#06B6D4",
    metric: "24ms Audio Stream",
    secondaryMetric: "4.92 MOS Score",
    screenshot: "/assets/templates/prebuilt/ai-voice-generator.jpg",
    highlights: [
      "Live Neural Voice & Prosody Waveform Sandbox",
      "Interactive Studio Minutes ROI Simulator",
      "Before vs. After Dubbing Pipeline Comparison",
    ],
  },
  {
    slug: "financial-management-platform",
    num: "03",
    title: "Financial Management OS",
    category: "Fintech, Treasury & Spend",
    headline: "Autonomous corporate treasury, cards, and global payouts",
    accentWord: "Autonomous",
    description:
      "Multi-currency cashflow cockpit, automated tax & invoice reconciliation table, interactive treasury yield simulator, and audit trails.",
    accent: "#10B981",
    metric: "5.28% Treasury Yield",
    secondaryMetric: "T+0 Settlement",
    screenshot: "/assets/templates/prebuilt/financial-management-platform.jpg",
    highlights: [
      "Interactive Treasury Yield & Burn-Rate Calculator",
      "Live Multi-Entity Ledger & Approval Workflows",
      "SOC2 Type II & ISO-27001 Security Architecture",
    ],
  },
  {
    slug: "property-management-software",
    num: "04",
    title: "Smart Property & PropTech",
    category: "Real Estate & Occupancy OS",
    headline: "Simplify property management and boost unit occupancy",
    accentWord: "occupancy",
    description:
      "Architectural luxury villa showcase, floating NOI & occupancy sparkline cards, automated rent collection ledger, and tenant portal.",
    accent: "#2EA3F2",
    metric: "98.4% Occupancy",
    secondaryMetric: "+38% Net NOI",
    screenshot: "/assets/templates/prebuilt/property-management-software.jpg",
    highlights: [
      "Architectural Villa Hero with Floating Profit Cards",
      "Multi-Unit Portfolio & Maintenance Telemetry",
      "Automated Lease & Instant Underwriting Flows",
    ],
  },
  {
    slug: "nuvexa-crm",
    num: "05",
    title: "Nuvexa Revenue CRM",
    category: "Autonomous Sales & Pipeline AI",
    headline: "The self-updating CRM that closes more enterprise deals",
    accentWord: "closes",
    description:
      "Zero manual data entry with automatic email/call capture, predictive deal scoring, interactive pipeline stages, and live revenue forecasting.",
    accent: "#7C3AED",
    metric: "+41% Win Rate",
    secondaryMetric: "2.4x Pipeline Speed",
    screenshot: "/assets/templates/prebuilt/nuvexa-crm.jpg",
    highlights: [
      "Interactive Deal Stage & Conversion Sandbox",
      "Automated Firmographic Lead Enrichment",
      "Executive Revenue Attribution & Cohort BI",
    ],
  },
  {
    slug: "cyber-security",
    num: "06",
    title: "Zero-Trust Cyber & Cloud",
    category: "eBPF Runtime & Cloud Defense",
    headline: "Neutralize zero-day threats in sub-millisecond runtime",
    accentWord: "sub-millisecond",
    description:
      "Continuous kernel-level telemetry, automated attack path isolation, multi-region edge latency router, and SOC2 evidence automation.",
    accent: "#10B981",
    metric: "99.98% Block Rate",
    secondaryMetric: "8.4ms Global p99",
    screenshot: "/assets/templates/prebuilt/cyber-security.jpg",
    highlights: [
      "Live Edge Node & Threat Isolation Console",
      "Protected Fleet & Cloud Cost Savings Calculator",
      "Hardware Passkey & Ephemeral Access Vault",
    ],
  },
];

const QUICK_INNER_ROUTES = [
  { label: "Sign In", slug: "sign-in" },
  { label: "Register", slug: "sign-up" },
  { label: "6-Digit OTP", slug: "otp" },
  { label: "Forgot Password", slug: "forgot-password" },
  { label: "Privacy Policy", slug: "privacy" },
  { label: "Portfolio", slug: "projects" },
  { label: "Case Study", slug: "projects/case-study" },
  { label: "Pricing", slug: "pricing" },
  { label: "Client Portal", slug: "portal" },
  { label: "Coming Soon", slug: "coming-soon" },
];

export function ShowcaseHero() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeDemo = FEATURED_SHOWCASE_DEMOS[activeIdx];
  const pack = getTemplatePexelsPack(activeDemo.slug);

  return (
    <section className="relative w-full flex-col items-center justify-center overflow-hidden bg-[#F4F5F8] pt-14 pb-28 transition-colors duration-300 dark:bg-[#090B10]">
      {/* Subtle Ambient Glow */}
      <div
        className="pointer-events-none absolute top-10 left-1/2 h-[360px] w-[780px] -translate-x-1/2 rounded-full opacity-20 blur-[140px] transition-colors duration-500 dark:opacity-25"
        style={{ backgroundColor: activeDemo.accent }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        {/* Top Badge + Headline + Primary Actions */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex max-w-4xl flex-col items-center gap-5"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-4 py-1.5 text-xs font-semibold text-zinc-800 shadow-2xs dark:border-white/10 dark:bg-white/[0.06] dark:text-zinc-200">
            <span className="rounded-full bg-[#C8F560] px-2 py-0.5 text-[10px] font-bold text-[#0D0F14]">
              NEW v4.2
            </span>
            <span>47+ Pre-Built Websites · 29+ Inner, Auth & OTP Pages · Pexels Curated</span>
          </div>

          <h1 className="text-[clamp(2.4rem,5.2vw,4.5rem)] leading-[1.03] font-semibold tracking-[-0.04em] text-zinc-900 dark:text-white">
            47+ pre-built websites &{" "}
            <span className="font-serif font-normal text-zinc-600 italic dark:text-[#C8F560]">
              interactive UI systems
            </span>{" "}
            ready to ship.
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
            Every template features bespoke industry layouts, interactive domain playgrounds,
            real-time ROI calculators, curated Pexels photography, and 29+ inner, Auth, 6-digit OTP,
            and Legal pages.
          </p>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-3.5">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("hudbird:open-demos-modal"))}
              className="inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-zinc-900 px-7 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:scale-[1.02] dark:bg-[#C8F560] dark:text-[#0D0F14]"
            >
              <LayoutGrid className="h-4 w-4" />
              <span>Browse All 47+ Pre-built Websites</span>
            </button>

            <Link
              to={`/demos/${activeDemo.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-7 py-4 text-sm font-semibold text-zinc-900 transition-all hover:bg-zinc-100 dark:border-white/15 dark:bg-white/[0.07] dark:text-white dark:hover:bg-white/10"
            >
              <span>Launch {activeDemo.title} Demo</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        {/* Revamped Interactive Flagship Preview Deck with Real Browser Screenshots */}
        <div className="mt-14 w-full rounded-[34px] border border-black/[0.08] bg-zinc-900/[0.05] p-1.5 text-left shadow-[0_30px_90px_-20px_rgba(0,0,0,0.28)] dark:border-white/10 dark:bg-white/[0.05]">
          <div className="overflow-hidden rounded-[28px] border border-black/[0.06] bg-white dark:border-white/10 dark:bg-[#11131B]">
            {/* Top 6-Template Interactive Switcher Pills with Domain Logo Icons */}
            <div className="no-scrollbar flex items-center justify-between gap-3 overflow-x-auto border-b border-black/[0.06] bg-[#F4F5F8] p-3 sm:p-4 dark:border-white/10 dark:bg-[#0D0F16]">
              <div className="flex items-center gap-2">
                {FEATURED_SHOWCASE_DEMOS.map((item, idx) => {
                  const isSelected = idx === activeIdx;
                  return (
                    <button
                      key={item.slug}
                      type="button"
                      onClick={() => setActiveIdx(idx)}
                      className={`group flex cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-all ${
                        isSelected
                          ? "bg-zinc-900 text-white shadow-sm dark:bg-[#C8F560] dark:text-[#0D0F14]"
                          : "border border-black/[0.05] bg-white text-zinc-600 hover:bg-zinc-100 dark:border-white/10 dark:bg-white/[0.05] dark:text-zinc-300 dark:hover:bg-white/10"
                      }`}
                    >
                      <span
                        className="flex shrink-0 items-center justify-center"
                        style={{
                          color: isSelected ? "currentColor" : item.accent,
                        }}
                      >
                        <HudbirdTemplateLogoIcon slug={item.slug} className="h-3.5 w-3.5" />
                      </span>
                      <span>{item.title}</span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent("hudbird:open-demos-modal"))}
                className="hidden shrink-0 cursor-pointer items-center gap-1.5 rounded-full bg-[#C8F560] px-4 py-2 text-xs font-bold whitespace-nowrap text-[#0D0F14] transition-opacity hover:opacity-95 xl:inline-flex"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>View All 47 Websites ↗</span>
              </button>
            </div>

            {/* Active Demo Real Screenshot Preview & Interactive Route Explorer */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDemo.slug}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 items-center gap-8 p-6 sm:p-8 lg:grid-cols-12 lg:p-10"
              >
                {/* Left 7 Columns: Real Captured Website Screenshot Window */}
                <div className="lg:col-span-7">
                  <Link
                    to={`/demos/${activeDemo.slug}`}
                    className="group relative block aspect-[16/10] w-full overflow-hidden rounded-[24px] border border-black/10 bg-zinc-950 shadow-xl dark:border-white/15"
                  >
                    <img
                      src={activeDemo.screenshot}
                      alt={activeDemo.title}
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src !== pack.hero) {
                          target.src = pack.hero;
                        }
                      }}
                      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    />

                    {/* Subtle Bottom Bar on Hover / Corner CTA so the Real Screenshot stays 100% clear */}
                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-4">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full border border-white/15 bg-black/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                          /demos/{activeDemo.slug}
                        </span>
                        <span className="hidden rounded-full bg-[#C8F560] px-3 py-1 text-xs font-bold text-[#0D0F14] shadow sm:inline-flex">
                          {activeDemo.metric}
                        </span>
                      </div>

                      <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-zinc-950 shadow-lg transition-colors group-hover:bg-[#C8F560]">
                        <span>Open Live Preview</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </div>

                {/* Right 5 Columns: Template Capabilities & 29+ Inner/Auth Direct Links */}
                <div className="flex flex-col justify-between space-y-6 lg:col-span-5">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-[#F4F5F8] px-3 py-1 text-xs font-semibold text-zinc-700 dark:bg-white/[0.06] dark:text-zinc-300">
                        Template #{activeDemo.num} of 47
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-[#C8F560]">
                        <Activity className="h-3.5 w-3.5" />
                        Light & Dark Ready
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-black/[0.06] dark:border-white/10"
                        style={{
                          backgroundColor: `${activeDemo.accent}18`,
                          color: activeDemo.accent,
                        }}
                      >
                        <HudbirdTemplateLogoIcon slug={activeDemo.slug} className="h-5 w-5" />
                      </span>
                      <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
                        {activeDemo.title}
                      </h2>
                    </div>

                    <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {activeDemo.description}
                    </p>
                  </div>

                  {/* Included Interactive Sections */}
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                      Included Interactive Sections:
                    </div>
                    {activeDemo.highlights.map((h) => (
                      <div
                        key={h}
                        className="flex items-center gap-2.5 text-xs font-medium text-zinc-800 dark:text-zinc-200"
                      >
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#C8F560] text-[#0D0F14]">
                          <Check className="h-2.5 w-2.5 stroke-[2.5]" />
                        </span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Direct Jump to 29+ Inner, Auth & OTP Pages for this Template */}
                  <div className="space-y-2.5 rounded-2xl border border-black/[0.05] bg-[#F4F5F8] p-4 dark:border-white/10 dark:bg-white/[0.04]">
                    <div className="flex items-center justify-between text-xs font-semibold text-zinc-900 dark:text-white">
                      <span className="inline-flex items-center gap-1.5">
                        <KeyRound className="h-3.5 w-3.5 text-[#84CC16]" />
                        <span>Jump to Inner, Auth & OTP Pages:</span>
                      </span>
                      <span className="text-[11px] text-zinc-500">29+ routes</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {QUICK_INNER_ROUTES.map((r) => (
                        <Link
                          key={r.slug}
                          to={`/demos/${activeDemo.slug}/${r.slug}`}
                          className="rounded-full border border-black/[0.06] bg-white px-2.5 py-1 text-[11px] font-medium text-zinc-700 transition-colors hover:bg-[#C8F560] hover:text-[#0D0F14] dark:border-white/10 dark:bg-white/[0.06] dark:text-zinc-200"
                        >
                          {r.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Massive Visual Showcase (The Bento Grid Marquee) */}
      <div className="relative mt-20 w-full overflow-hidden pb-10">
        {/* Ambient Glows */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-blue-500/40 opacity-20 mix-blend-multiply blur-[100px] dark:mix-blend-screen" />
        </div>

        <div className="relative z-20 mx-auto flex w-full items-center">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-30 w-16 bg-gradient-to-r from-[#F4F5F8] to-transparent md:w-48 dark:from-[#090B10]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-30 w-16 bg-gradient-to-l from-[#F4F5F8] to-transparent md:w-48 dark:from-[#090B10]" />

          <motion.div
            className="flex gap-6"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            style={{ width: "max-content" }}
          >
            <div className="w-[1200px] columns-1 gap-6 space-y-6 px-4 md:columns-2 lg:columns-4">
              {bentoCards.map((card, i) => (
                <div key={i} className="break-inside-avoid">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="w-full overflow-visible rounded-[2rem] border border-zinc-200/80 bg-white shadow-xl shadow-zinc-200/50 hover:z-40 hover:shadow-2xl dark:border-white/10 dark:bg-[#11131B] dark:shadow-none"
                  >
                    {card}
                  </motion.div>
                </div>
              ))}
            </div>
            <div className="w-[1200px] columns-1 gap-6 space-y-6 px-4 md:columns-2 lg:columns-4">
              {bentoCards.map((card, i) => (
                <div key={`dup-${i}`} className="break-inside-avoid">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="w-full overflow-visible rounded-[2rem] border border-zinc-200/80 bg-white shadow-xl shadow-zinc-200/50 hover:z-40 hover:shadow-2xl dark:border-white/10 dark:bg-[#11131B] dark:shadow-none"
                  >
                    {card}
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-60 bg-gradient-to-t from-[#F4F5F8] via-[#F4F5F8]/85 to-transparent dark:from-[#090B10] dark:via-[#090B10]/85" />
      </div>
    </section>
  );
}

// 4 Custom Core Component Cards for the Showcase
const cards = [
  <div key="c1" className="flex h-full w-full flex-col justify-between gap-5">
    <div className="relative h-44 w-full overflow-hidden rounded-[1.25rem] shadow-inner">
      <img
        src={PEXELS.audioAndVoice[0]}
        alt="Neural Audio Studio"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <span className="absolute top-3 left-3 rounded-full bg-[#C8F560] px-2.5 py-1 text-[10px] font-bold text-[#0D0F14]">
        AI Voice Studio
      </span>
    </div>

    <div>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
            Neural Voice v4
          </div>
          <div className="mt-0.5 text-xs font-medium text-zinc-500">48kHz Studio Stream</div>
        </div>
        <Heart className="h-5 w-5 cursor-pointer text-zinc-400 transition-colors hover:text-rose-500" />
      </div>

      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-zinc-200/50 dark:bg-zinc-800/50">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="h-full rounded-full bg-[#84CC16]"
        />
      </div>

      <div className="mt-5 flex items-center justify-center gap-8 text-zinc-800 dark:text-zinc-200">
        <SkipBack className="h-5 w-5 cursor-pointer fill-current" />
        <div className="relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-zinc-900 text-white shadow-xl dark:bg-[#C8F560] dark:text-[#0D0F14]">
          <Play className="z-10 ml-0.5 h-5 w-5 fill-current" />
        </div>
        <SkipForward className="h-5 w-5 cursor-pointer fill-current" />
      </div>
    </div>
  </div>,

  <div key="c2" className="flex h-full w-full flex-col items-center justify-between py-2">
    <div className="relative flex h-40 w-40 items-center justify-center">
      <svg className="absolute inset-0 h-full w-full -rotate-90 overflow-visible">
        <circle
          cx="50%"
          cy="50%"
          r="42%"
          className="stroke-zinc-100 dark:stroke-zinc-800/50"
          strokeWidth="12"
          fill="none"
        />
      </svg>
      <svg className="absolute inset-0 h-full w-full -rotate-90 overflow-visible">
        <motion.circle
          cx="50%"
          cy="50%"
          r="42%"
          className="stroke-[#84CC16]"
          strokeWidth="12"
          strokeDasharray="264"
          initial={{ strokeDashoffset: 264 }}
          animate={{ strokeDashoffset: 48 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
          fill="none"
          strokeLinecap="round"
        />
      </svg>
      <div className="z-10 text-center">
        <div className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
          98<span className="text-lg font-bold text-zinc-400">%</span>
        </div>
        <div className="mt-0.5 text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
          Occupancy
        </div>
      </div>
    </div>

    <div className="mt-4 w-full space-y-3 px-2">
      <div className="flex items-center justify-between rounded-xl bg-zinc-50 p-2.5 dark:bg-white/[0.03]">
        <span className="flex items-center gap-2.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
          <span className="h-2.5 w-2.5 rounded-full bg-[#84CC16]" />
          Commercial Units
        </span>
        <span className="text-xs font-bold text-zinc-900 dark:text-white">412 Active</span>
      </div>
      <div className="flex items-center justify-between rounded-xl bg-zinc-50 p-2.5 dark:bg-white/[0.03]">
        <span className="flex items-center gap-2.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
          <span className="h-2.5 w-2.5 rounded-full bg-[#7C3AED]" />
          Net Yield Lift
        </span>
        <span className="text-xs font-bold text-emerald-500">+38.4%</span>
      </div>
    </div>
  </div>,

  <div
    key="c3"
    className="flex h-full w-full flex-col items-center justify-between pt-2 text-center"
  >
    <div className="relative flex w-full flex-col items-center">
      <div className="relative mt-2 h-20 w-20 overflow-hidden rounded-full ring-4 ring-[#C8F560]/40">
        <img src={PEXELS.avatarWoman1} alt="Sarah Jenkins" className="h-full w-full object-cover" />
      </div>
      <h3 className="mt-4 text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
        Sarah Jenkins
      </h3>
      <p className="mt-0.5 text-xs font-medium text-zinc-500">VP of Design Engineering</p>

      <div className="mt-5 flex w-full gap-2.5">
        <span className="flex-1 rounded-full bg-zinc-900 py-2 text-xs font-bold text-white dark:bg-[#C8F560] dark:text-[#0D0F14]">
          47 Demos
        </span>
        <span className="flex-1 rounded-full border border-zinc-200 py-2 text-xs font-bold text-zinc-700 dark:border-white/10 dark:text-zinc-300">
          29+ Pages
        </span>
      </div>
    </div>

    <div className="mt-4 flex w-full justify-around border-t border-zinc-100 pt-4 pb-1 dark:border-white/5">
      <div className="flex flex-col items-center">
        <div className="text-lg font-bold text-zinc-900 dark:text-white">99.4%</div>
        <div className="text-[10px] font-semibold text-zinc-400 uppercase">CSAT</div>
      </div>
      <div className="w-px bg-zinc-100 dark:bg-white/5" />
      <div className="flex flex-col items-center">
        <div className="text-lg font-bold text-zinc-900 dark:text-white">1,360+</div>
        <div className="text-[10px] font-semibold text-zinc-400 uppercase">Routes</div>
      </div>
    </div>
  </div>,

  <div key="c4" className="flex h-full w-full flex-col justify-between">
    <div>
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-[#C8F560] px-2.5 py-1 text-xs font-bold text-[#0D0F14]">
          Instant Settlement
        </span>
        <span className="text-xs text-zinc-400">T+0 Live</span>
      </div>
      <div className="mt-6">
        <div className="text-4xl font-extrabold tracking-tight text-zinc-900 tabular-nums dark:text-white">
          $41,379<span className="text-xl font-bold text-zinc-400">.00</span>
        </div>
        <div className="mt-1 text-xs font-medium text-zinc-500">
          Automated Treasury Sweep ·{" "}
          <span className="font-semibold text-emerald-500">+14.8% APY</span>
        </div>
      </div>
    </div>

    <div className="mt-6 space-y-2 rounded-2xl border border-zinc-100 bg-zinc-50/50 p-3 dark:border-white/5 dark:bg-white/[0.02]">
      <div className="flex items-center justify-between text-xs font-semibold text-zinc-700 dark:text-zinc-300">
        <span>Auto-Rebalance</span>
        <span className="text-emerald-500">Active ✓</span>
      </div>
      <div className="flex items-center justify-between text-xs font-semibold text-zinc-700 dark:text-zinc-300">
        <span>Zero-Knowledge Audit</span>
        <span className="text-[#84CC16]">Verified</span>
      </div>
    </div>
  </div>,
];

const c5 = (
  <div key="c5" className="flex h-full flex-col gap-3">
    <div className="flex items-center justify-between">
      <span className="text-sm font-semibold text-zinc-900 dark:text-white">Double-Bezel UI</span>
      <span className="rounded-full bg-[#C8F560] px-2 py-0.5 text-[10px] font-bold text-[#0D0F14]">
        v4.2
      </span>
    </div>
    <p className="text-xs text-zinc-500 dark:text-zinc-400">
      Nested rounded-[28px] surfaces with spring physics and Pexels photography.
    </p>
  </div>
);

const c6 = (
  <div key="c6" className="flex h-full flex-col gap-3">
    <div className="flex items-center justify-between">
      <span className="text-sm font-semibold text-zinc-900 dark:text-white">Curated Pexels</span>
      <Plus className="h-4 w-4 text-zinc-400" />
    </div>
    <div className="grid grid-cols-2 gap-2">
      <img
        src={PEXELS.villaExterior1}
        alt="Preview 1"
        className="aspect-square rounded-xl object-cover"
      />
      <img
        src={PEXELS.aiAndNeural[0]}
        alt="Preview 2"
        className="aspect-square rounded-xl object-cover"
      />
    </div>
  </div>
);

const c7 = (
  <div key="c7" className="flex h-full flex-col gap-3">
    <div className="flex items-center gap-3">
      <img
        src={PEXELS.avatarMan1}
        alt="Alex Rivera"
        className="h-9 w-9 rounded-full object-cover"
      />
      <div>
        <div className="text-xs font-bold text-zinc-900 dark:text-white">Alex Rivera</div>
        <div className="text-[10px] text-zinc-400">Founder · Nuvexa CRM</div>
      </div>
    </div>
    <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
      “We launched our entire SaaS marketing site, 6-digit OTP auth flow, and pricing calculator in
      one afternoon.”
    </p>
  </div>
);

const bentoCards = [
  <div key="b1" className="h-full p-6">
    {c5}
  </div>,
  <div key="b2" className="h-full p-6">
    {c6}
  </div>,
  <div key="b3" className="h-full p-6">
    {c7}
  </div>,
  <div key="b4" className="h-full p-6">
    {cards[0]}
  </div>,
  <div key="b5" className="h-full p-6">
    {cards[1]}
  </div>,
  <div key="b6" className="h-full p-6">
    {cards[3]}
  </div>,
  <div key="b7" className="h-full p-6">
    {cards[2]}
  </div>,
  <div key="b8" className="h-full p-6">
    {c7}
  </div>,
];
