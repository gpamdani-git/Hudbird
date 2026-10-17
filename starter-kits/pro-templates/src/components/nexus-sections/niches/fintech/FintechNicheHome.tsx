// starter-kits/pro-templates/src/components/nexus-sections/niches/fintech/FintechNicheHome.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { NicheConfig } from "@hudbird/schemas";
import { NavbarMegaMenu } from "../../NavbarMegaMenu";
import { SplitTextCtaFooter } from "../../SplitTextCtaFooter";
import { Container, Reveal, PillLink } from "../../ScrollReveal";
import { PEXELS } from "../../HudbirdVisualWidgets";
import {
  HB,
  HbSection,
  HbHeader,
  HbImage,
  HudbirdColorWidgetTrio,
  HudbirdIndustryGlassCards,
} from "../../HudbirdKit";
import {
  ChevronRight,
  Search,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  FileText,
  Layers,
  ShieldCheck,
  Zap,
  BarChart3,
  Building2,
} from "lucide-react";

const TAX_FILING_ROWS = [
  {
    id: "TF-9482",
    company: "Linear Systems Inc.",
    owner: "Devon Lane",
    avatar: PEXELS.avatarWoman1,
    jurisdiction: "US Federal · Form 1120",
    amount: "$148,400.00",
    status: "Completed",
  },
  {
    id: "TF-9483",
    company: "Raycast Global Ltd.",
    owner: "Courtney Henry",
    avatar: PEXELS.avatarMan1,
    jurisdiction: "UK HMRC · VAT Return",
    amount: "$64,920.50",
    status: "Completed",
  },
  {
    id: "TF-9484",
    company: "Vercel Cloud Corp.",
    owner: "Arlene McCoy",
    avatar: PEXELS.avatarWoman2,
    jurisdiction: "DE ELSTER · Corporate",
    amount: "$219,000.00",
    status: "In Review",
  },
  {
    id: "TF-9485",
    company: "Retool Operations",
    owner: "Albert Flores",
    avatar: PEXELS.avatarMan2,
    jurisdiction: "SG IRAS · GST Filing",
    amount: "$89,310.00",
    status: "Completed",
  },
];

const WORKFLOW_TEMPLATES = [
  {
    title: "Automated Tax Filing & Multi-State Compliance",
    category: "Tax & Compliance",
    saved: "18.5 hrs/week saved",
    image: PEXELS.villaExterior1,
  },
  {
    title: "Multi-Entity Treasury Sweeps & Real Estate Yield",
    category: "Treasury & PropTech",
    saved: "+4.85% APY Automated",
    image: PEXELS.villaExterior2,
  },
  {
    title: "AI Lease & Invoice OCR with 3-Way Matching",
    category: "Accounts & Leasing",
    saved: "99.4% Touchless Rate",
    image: PEXELS.villaInterior,
  },
];

export interface FintechNicheHomeProps {
  niche: NicheConfig;
  customBrandPrimary?: string;
  defaultHeroMode?: "fintech" | "proptech";
}

export const FintechNicheHome: React.FC<FintechNicheHomeProps> = ({ niche, defaultHeroMode }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialVariant =
    searchParams.get("variant") === "proptech" || defaultHeroMode === "proptech"
      ? "proptech"
      : "fintech";
  const [heroMode, setHeroMode] = useState<"fintech" | "proptech">(initialVariant);
  const [activeTab, setActiveTab] = useState<"all" | "completed" | "review">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Interactive Yield & Occupancy Simulator ("One Live Thing" per taste-skill)
  const [portfolioMillions, setPortfolioMillions] = useState<number>(24);
  const [propertyUnits, setPropertyUnits] = useState<number>(120);

  useEffect(() => {
    const v = searchParams.get("variant");
    if (v === "proptech" || defaultHeroMode === "proptech") setHeroMode("proptech");
    else if (v === "fintech") setHeroMode("fintech");
  }, [searchParams, defaultHeroMode, niche.slug]);

  const isCustomSlug = niche.slug !== "fintech-protocol";
  const customHeadline = isCustomSlug
    ? `${niche.sections.hero.headline.preText} ${niche.sections.hero.headline.accentWord} ${niche.sections.hero.headline.postText}`.trim()
    : null;
  const customDesc = isCustomSlug ? niche.sections.hero.description : null;

  const handleModeSwitch = (mode: "fintech" | "proptech") => {
    setHeroMode(mode);
    if (mode === "proptech") {
      setSearchParams({ variant: "proptech" });
    } else {
      setSearchParams({});
    }
  };

  const filteredRows = TAX_FILING_ROWS.filter((row) => {
    const matchesTab =
      activeTab === "all"
        ? true
        : activeTab === "completed"
          ? row.status === "Completed"
          : row.status === "In Review";
    const matchesSearch =
      row.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.jurisdiction.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const annualTreasuryYield = Math.round(portfolioMillions * 1000000 * 0.0485);
  const annualHoursSaved = Math.round(propertyUnits * 14.2);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F4F5F8] text-[#0D0F14] transition-colors duration-300 dark:bg-[#0B0C10] dark:text-white">
      {/* 1. Sky & Clouds Hero Section with Clean Integrated Switcher & 2-Line Iron Rule H1 */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#9BC8E6] via-[#CBE4F5] to-[#F4F5F8] dark:from-[#0C192C] dark:via-[#0F1E36] dark:to-[#0B0C10]">
        <img
          src={PEXELS.skyClouds}
          alt="Sky backdrop"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-50 mix-blend-soft-light dark:opacity-20"
        />

        <NavbarMegaMenu data={niche.sections.navbar} />

        <section className="relative z-10 pt-12 pb-20 sm:pt-16 sm:pb-28">
          <Container>
            {/* Single Integrated Segmented Pill (Replaces stacked duplicate badges) */}
            <div className="mb-8 flex justify-center">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white/90 p-1.5 shadow-[0_10px_30px_rgba(13,15,20,0.08)] backdrop-blur-xl dark:border-white/15 dark:bg-[#14171F]/90">
                <button
                  type="button"
                  onClick={() => handleModeSwitch("fintech")}
                  className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                    heroMode === "fintech"
                      ? "bg-[#0D0F14] text-white shadow-sm dark:bg-[#C8F560] dark:text-[#0D0F14]"
                      : "text-[#5E6472] hover:text-[#0D0F14] dark:text-white/70 dark:hover:text-white"
                  }`}
                >
                  <BarChart3 className="h-3.5 w-3.5" />
                  <span>{isCustomSlug ? niche.name : "Treasury & Tax SaaS"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleModeSwitch("proptech")}
                  className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                    heroMode === "proptech"
                      ? "bg-[#0D0F14] text-white shadow-sm dark:bg-[#C8F560] dark:text-[#0D0F14]"
                      : "text-[#5E6472] hover:text-[#0D0F14] dark:text-white/70 dark:hover:text-white"
                  }`}
                >
                  <Building2 className="h-3.5 w-3.5" />
                  <span>Smart Property & POS</span>
                </button>
              </div>
            </div>

            {heroMode === "proptech" ? (
              /* PROPTECH HERO — Wide 2-Line H1 + Cantilevered Villa Showcase */
              <div>
                <div className="mx-auto max-w-5xl space-y-6 text-center">
                  <h1 className="text-[clamp(2.5rem,4.8vw,4.4rem)] leading-[1.06] font-semibold tracking-[-0.035em] text-balance text-[#0D0F14] dark:text-white">
                    {customHeadline ||
                      "Simplify property management and boost portfolio occupancy."}
                  </h1>

                  <p className="mx-auto max-w-[54ch] text-base leading-relaxed text-[#0D0F14]/75 sm:text-lg dark:text-white/75">
                    {customDesc ||
                      "Automate tenant leases, maintenance dispatch, and multi-property yield sweeps from one unified real estate operating system."}
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                    <PillLink href={`/demos/${niche.slug}/contact`} variant="brand" size="lg">
                      {niche.sections.hero.primaryCta?.label || "Request a Demo"}
                    </PillLink>
                    <PillLink href={`/demos/${niche.slug}/pricing`} variant="inverse" size="lg">
                      Explore Plans
                    </PillLink>
                  </div>
                </div>

                {/* Double-Bezel Architectural White Modern Cantilevered Villa Card */}
                <Reveal delay={0.15} y={24}>
                  <div className="mx-auto mt-12 max-w-[1100px] rounded-[36px] border border-white/80 bg-white/50 p-2 shadow-[0_32px_90px_-20px_rgba(13,15,20,0.25)] backdrop-blur-md sm:mt-14 dark:border-white/15 dark:bg-white/[0.06]">
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[28px]">
                      <HbImage
                        src={PEXELS.villaHero}
                        alt="Modern white cantilevered luxury property"
                        fallbackIndex={0}
                        className="h-full w-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                      <div className="absolute right-5 bottom-5 left-5 flex flex-wrap items-center justify-between gap-4 border-t border-white/20 pt-5 text-white sm:right-8 sm:bottom-8 sm:left-8">
                        <span className="text-xs font-semibold text-white/80">
                          Trusted by global residential & commercial property groups
                        </span>
                        <div className="flex flex-wrap items-center gap-6 text-sm font-bold tracking-tight sm:gap-10 sm:text-base">
                          <span>Greystar</span>
                          <span>Brookfield</span>
                          <span>Hines</span>
                          <span>Prologis</span>
                          <span>Knight Frank</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            ) : (
              /* FINTECH WORKFLOW SAAS HERO — Wide 2-Line H1 + Interactive Tax & Treasury Table */
              <div>
                <div className="mx-auto max-w-5xl space-y-6 text-center">
                  <h1 className="text-[clamp(2.5rem,4.8vw,4.4rem)] leading-[1.06] font-semibold tracking-[-0.035em] text-balance text-[#0D0F14] dark:text-white">
                    {customHeadline || "Automate financial workflows and eliminate manual filings."}
                  </h1>

                  <p className="mx-auto max-w-[54ch] text-base leading-relaxed text-[#0D0F14]/75 sm:text-lg dark:text-white/75">
                    {customDesc ||
                      "Connect your ERP, corporate bank accounts, and global tax engines to put multi-entity reconciliations and treasury sweeps on autopilot."}
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                    <PillLink href={`/demos/${niche.slug}/contact`} variant="brand" size="lg">
                      {niche.sections.hero.primaryCta?.label || "Start 14-Day Trial"}
                    </PillLink>
                    <PillLink href={`/demos/${niche.slug}/pricing`} variant="inverse" size="lg">
                      Compare Plans
                    </PillLink>
                  </div>
                </div>

                {/* Double-Bezel Interactive Tax & Treasury Dashboard */}
                <Reveal delay={0.18} y={24}>
                  <div className="mx-auto mt-12 max-w-[1080px] rounded-[36px] border border-white/80 bg-white/60 p-2 shadow-[0_32px_80px_-20px_rgba(13,15,20,0.2)] backdrop-blur-xl sm:mt-14 dark:border-white/15 dark:bg-white/[0.06]">
                    <div className="rounded-[28px] border border-black/[0.05] bg-white p-5 sm:p-7 dark:border-white/10 dark:bg-[#14171F]">
                      <div className="flex flex-col justify-between gap-4 border-b border-black/[0.06] pb-5 sm:flex-row sm:items-center dark:border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#C8F560] font-bold text-[#0D0F14]">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-[#0D0F14] dark:text-white">
                              Automated Tax & Treasury Ledger
                            </div>
                            <div className="text-xs text-[#5E6472] dark:text-[#9CA3AF]">
                              Real-time multi-jurisdiction filing & sweep status
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <div className="relative">
                            <Search className="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-[#5E6472]" />
                            <input
                              type="text"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              placeholder="Filter entity..."
                              className="w-36 rounded-full border border-black/[0.06] bg-[#F4F5F8] py-1.5 pr-3 pl-8 text-xs text-[#0D0F14] focus:outline-none sm:w-44 dark:border-white/10 dark:bg-white/[0.06] dark:text-white"
                            />
                          </div>

                          {(["all", "completed", "review"] as const).map((tab) => (
                            <button
                              key={tab}
                              type="button"
                              onClick={() => setActiveTab(tab)}
                              className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-semibold capitalize transition-colors ${
                                activeTab === tab
                                  ? "bg-[#0D0F14] text-white dark:bg-[#C8F560] dark:text-[#0D0F14]"
                                  : "bg-[#F4F5F8] text-[#5E6472] dark:bg-white/[0.05] dark:text-[#9CA3AF]"
                              }`}
                            >
                              {tab === "all" ? "All Filings" : tab}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 space-y-2.5">
                        {filteredRows.map((row) => (
                          <div
                            key={row.id}
                            className="flex flex-col justify-between gap-3 rounded-2xl border border-black/[0.04] bg-[#F4F5F8]/80 p-3.5 sm:flex-row sm:items-center sm:px-5 dark:border-white/[0.06] dark:bg-white/[0.03]"
                          >
                            <div className="flex items-center gap-3.5">
                              <HbImage
                                src={row.avatar}
                                alt={row.owner}
                                fallbackIndex={0}
                                className="h-10 w-10 rounded-full object-cover ring-2 ring-white dark:ring-white/10"
                              />
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-semibold text-[#0D0F14] dark:text-white">
                                    {row.company}
                                  </span>
                                  <span className="rounded-full bg-black/[0.05] px-2 py-0.5 text-[11px] font-medium text-[#5E6472] dark:bg-white/10 dark:text-white/70">
                                    {row.id}
                                  </span>
                                </div>
                                <div className="mt-0.5 text-xs text-[#5E6472] dark:text-[#9CA3AF]">
                                  {row.owner} · {row.jurisdiction}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between gap-4 sm:justify-end">
                              <span className="text-sm font-bold text-[#0D0F14] tabular-nums dark:text-white">
                                {row.amount}
                              </span>
                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                                  row.status === "Completed"
                                    ? "bg-[#C8F560] text-[#0D0F14]"
                                    : "bg-[#7EE7EE]/30 text-[#0D0F14] dark:text-[#7EE7EE]"
                                }`}
                              >
                                {row.status === "Completed" ? (
                                  <CheckCircle2 className="h-3.5 w-3.5" />
                                ) : (
                                  <Clock className="h-3.5 w-3.5" />
                                )}
                                {row.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            )}
          </Container>
        </section>
      </div>

      {/* 2. ONE LIVE THING (Taste-Skill Interactive Treasury & Occupancy Yield Calculator) */}
      <HbSection tone="light">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-5 lg:col-span-5">
            <span className={HB.brandChip}>Interactive ROI Simulator</span>
            <h2 className={`${HB.h2} ${HB.ink} text-balance`}>
              Calculate your automated treasury yield and hours saved.
            </h2>
            <p className={`text-base ${HB.ink2} leading-relaxed`}>
              Adjust your idle treasury balance and managed property units below to see real-time
              annual sweep returns and operational time recovered.
            </p>

            <div className="space-y-6 pt-3">
              <div className="space-y-3 rounded-2xl bg-[#F4F5F8] p-5 dark:bg-white/[0.04]">
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span className={HB.ink}>Idle Treasury Balance</span>
                  <span className="rounded-full bg-[#C8F560] px-3 py-1 font-bold text-[#0D0F14] tabular-nums">
                    ${portfolioMillions}M USD
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={100}
                  step={5}
                  value={portfolioMillions}
                  onChange={(e) => setPortfolioMillions(Number(e.target.value))}
                  aria-label="Idle Treasury Balance in Millions"
                  className="w-full cursor-pointer accent-[#0D0F14] dark:accent-[#C8F560]"
                />
                <div className="flex justify-between text-[11px] text-[#5E6472]">
                  <span>$5M</span>
                  <span>$50M</span>
                  <span>$100M</span>
                </div>
              </div>

              <div className="space-y-3 rounded-2xl bg-[#F4F5F8] p-5 dark:bg-white/[0.04]">
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span className={HB.ink}>Managed Units / Entities</span>
                  <span className="rounded-full bg-[#7EE7EE] px-3 py-1 font-bold text-[#0D0F14] tabular-nums">
                    {propertyUnits} Units
                  </span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={500}
                  step={20}
                  value={propertyUnits}
                  onChange={(e) => setPropertyUnits(Number(e.target.value))}
                  aria-label="Managed Property Units"
                  className="w-full cursor-pointer accent-[#0D0F14] dark:accent-[#7EE7EE]"
                />
                <div className="flex justify-between text-[11px] text-[#5E6472]">
                  <span>20 units</span>
                  <span>250 units</span>
                  <span>500 units</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-[34px] border border-black/[0.06] bg-black/[0.04] p-2 dark:border-white/10 dark:bg-white/[0.05]">
              <div className={`${HB.cardDark} space-y-8 p-8 sm:p-10`}>
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
                  <div>
                    <span className="block text-xs text-white/60">Projected Annual Impact</span>
                    <h3 className="mt-0.5 text-xl font-semibold text-white">
                      Automated Treasury + PropTech OS
                    </h3>
                  </div>
                  <span className="rounded-full bg-[#C8F560] px-3.5 py-1.5 text-xs font-bold text-[#0D0F14]">
                    4.85% Treasury APY
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="space-y-2 rounded-2xl bg-[#C8F560] p-6 text-[#0D0F14]">
                    <span className="block text-xs font-semibold text-[#0D0F14]/70">
                      Annual Automated Yield
                    </span>
                    <div className="text-3xl font-bold tracking-tight tabular-nums sm:text-4xl">
                      +${annualTreasuryYield.toLocaleString()}
                    </div>
                    <span className="block text-xs font-medium text-[#0D0F14]/80">
                      Swept nightly across T-Bill accounts
                    </span>
                  </div>

                  <div className="space-y-2 rounded-2xl border border-white/10 bg-white/[0.07] p-6 text-white">
                    <span className="block text-xs font-semibold text-white/60">
                      Manual Accounting Saved
                    </span>
                    <div className="text-3xl font-bold tracking-tight text-[#7EE7EE] tabular-nums sm:text-4xl">
                      {annualHoursSaved.toLocaleString()} hrs/yr
                    </div>
                    <span className="block text-xs text-white/60">
                      Zero manual ledger or lease entry
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-4 pt-2 sm:flex-row sm:items-center">
                  <div className="text-xs text-white/70">
                    Includes SOC2 Type II encryption & instant ERP two-way sync.
                  </div>
                  <PillLink href="/demos/fintech-protocol/contact" variant="lime" size="md">
                    Lock In Custom Rate
                  </PillLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HbSection>

      {/* 3. Property & Financial Workflow Widget Trio (Screenshot 1 Reference) */}
      <HudbirdColorWidgetTrio
        badge="Features"
        title="Powerful features to elevate your business"
        subtitle="Real-time closing schedules, automated buyer confirmations, and encrypted document vaulting."
      />

      {/* 4. Pre-Built Financial & Property Workflow Templates */}
      <HbSection tone="light">
        <HbHeader
          badge="Workflow Templates"
          title="Launch pre-built financial & property workflows in one click"
          subtitle="Deploy battle-tested tax, treasury, and real estate lease automations in minutes."
          align="left"
          action={
            <PillLink href="/demos/fintech-protocol/services" variant="brand" size="md">
              Explore All Workflows
            </PillLink>
          }
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {WORKFLOW_TEMPLATES.map((tpl, idx) => (
            <Reveal key={tpl.title} delay={idx * 0.06}>
              <Link
                to="/demos/fintech-protocol/services"
                className={`group block ${HB.cardMuted} p-3 ${HB.hoverLift}`}
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-[22px]">
                  <HbImage
                    src={tpl.image}
                    alt={tpl.title}
                    fallbackIndex={idx}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-[#0D0F14]">
                    {tpl.category}
                  </span>
                  <span className="absolute right-3 bottom-3 rounded-full bg-[#C8F560] px-3 py-1 text-[11px] font-bold text-[#0D0F14]">
                    {tpl.saved}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 p-4">
                  <h3 className={`text-base font-semibold ${HB.ink}`}>{tpl.title}</h3>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white transition-colors group-hover:bg-[#C8F560] group-hover:text-[#0D0F14] dark:bg-white/10">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </HbSection>

      {/* 5. Industries We Serve Frosted Glass Cards (Screenshot 2 Reference) */}
      <HudbirdIndustryGlassCards
        badge="Integration"
        title="Industries we serve"
        subtitle="Institutional financial and real estate infrastructure built for high-volume operators."
        ctaHref="/demos/fintech-protocol/projects"
      />

      {/* 6. Footer */}
      <SplitTextCtaFooter data={niche.sections.footer} />
    </div>
  );
};

export default FintechNicheHome;
