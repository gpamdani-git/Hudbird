// starter-kits/pro-templates/src/components/nexus-sections/niches/ai/AICopilotNicheHome.tsx
"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NicheConfig } from "@hudbird/schemas";
import { NavbarMegaMenu } from "../../NavbarMegaMenu";
import { HeroSaaS } from "../../HeroSaaS";
import { SplitTextCtaFooter } from "../../SplitTextCtaFooter";
import { PEXELS, HudbirdFeatureWidgetGrid } from "../../HudbirdVisualWidgets";
import { Container, SectionLabel, MaskedHeading, PillLink } from "../../ScrollReveal";
import {
  Play,
  ArrowRight,
  Check,
  Clock,
  Target,
  RefreshCw,
  Layers,
  Mail,
  MessageSquare,
  Bell,
} from "lucide-react";

const USE_CASES = [
  {
    role: "SEO Specialists",
    desc: "SEO Specialists optimize websites to rank higher on search engines and attract high-intent organic audiences in record time.",
    stat: "+73% Organic Traffic",
    image: PEXELS.projects[0],
  },
  {
    role: "Content Marketers",
    desc: "Content marketers create valuable content that ranks and converts, from automated blog briefs to high-converting landing pages.",
    stat: "60% Faster Research",
    image: PEXELS.projects[3],
  },
  {
    role: "Digital Agencies",
    desc: "Agencies use AI keyword clusters to deliver measurable SEO and content ROI across dozens of client domains simultaneously.",
    stat: "5x Client Capacity",
    image: PEXELS.studioTeam,
  },
  {
    role: "E-commerce Brands",
    desc: "E-commerce teams use search intent data to optimize product pages and category listings for transactional buyers.",
    stat: "+40% Search CTR",
    image: PEXELS.projects[1],
  },
  {
    role: "Startup Founders",
    desc: "Founders get research-backed keywords fast so they can focus on building product and capturing early organic growth.",
    stat: "-35% Cost Per Lead",
    image: PEXELS.projects[4],
  },
];

const AI_REVIEWS = [
  {
    name: "Alexandra Morgan",
    role: "Content Marketing Manager, ContentPro",
    quote:
      "The smart keyword generator cut our research time by 60%. We now launch content briefs in hours instead of days. Our organic traffic is up 73% in the first quarter.",
  },
  {
    name: "James Chen",
    role: "Head of SEO, GrowthLabs",
    quote:
      "We were drowning in spreadsheets. This tool surfaces intent and competition in one place. Our click-through rates from search have improved by 40% since we switched.",
  },
  {
    name: "Sarah Mitchell",
    role: "Senior Content Strategist, BrandVoice",
    quote:
      "Finally, keyword research that feels built for content teams. The suggestions are relevant and actionable. We've ranked for terms we never would have found manually.",
  },
  {
    name: "Marcus Webb",
    role: "Digital Marketing Lead, ScaleUp",
    quote:
      "The AI understands context, not just search volume. We're targeting long-tail keywords that actually convert. Our cost per lead from organic search has dropped 35%.",
  },
  {
    name: "Elena Rodriguez",
    role: "Content Director, NextGen Media",
    quote:
      "We use it for every new campaign. Clustering and prioritization are spot-on. Our writers get clear briefs and our rankings have never been stronger.",
  },
  {
    name: "David Park",
    role: "Founder, StartupSEO",
    quote:
      "As a small team, we needed to compete with bigger budgets. This tool levels the field. We discovered 500+ high-value keywords in our first month alone.",
  },
];

export interface AICopilotNicheHomeProps {
  niche: NicheConfig;
  customBrandPrimary?: string;
}

export const AICopilotNicheHome: React.FC<AICopilotNicheHomeProps> = ({ niche }) => {
  const [activeUseCase, setActiveUseCase] = useState<number>(0);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "quarterly" | "yearly">("monthly");
  const [activeTrigger, setActiveTrigger] = useState<"email" | "sms" | "push">("email");

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white transition-colors duration-300">
      {/* 1. Floating Pill Navbar */}
      <NavbarMegaMenu data={niche.sections.navbar} />

      {/* 2. Hero with 3D Perspective Grid & Coral-Glow Prompt Box */}
      <HeroSaaS data={niche.sections.hero as any} />

      {/* 3. SCREENSHOT A SECTION: "Features that set HudbirdUI apart" 5-Card Interactive UI Widget Bento */}
      <HudbirdFeatureWidgetGrid
        badge="More features"
        headline="Features that set HudbirdUI apart"
        cardTitles={[
          {
            title: "Drag & drop email builder",
            desc: "Design emails effortlessly, no coding needed.",
          },
          {
            title: "Transactional email API",
            desc: "Send real-time order confirmations, password resets",
          },
          {
            title: "SMTP relay & webhooks",
            desc: "Seamless email infrastructure for developers.",
          },
        ]}
      />

      {/* 4. Value Bento Grid + Workflow Trigger */}
      <section className="border-t border-white/10 bg-[#0E0E16] py-20 sm:py-28">
        <Container>
          <div className="mx-auto mb-16 max-w-2xl space-y-4 text-center">
            <SectionLabel
              label="AI Research Engine"
              className="!border-white/10 !bg-white/5 !text-zinc-300"
            />
            <MaskedHeading
              as="h2"
              text="Uncover valuable search terms in *seconds*—no expertise required."
              accent="seconds"
              accentClassName="!text-[#FB923C]"
              className="text-[clamp(2rem,4vw,3.3rem)] leading-[1.08] font-semibold tracking-[-0.035em] text-white"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="relative flex flex-col justify-between overflow-hidden rounded-[32px] border border-white/10 bg-[#151521] p-7 sm:p-8 lg:col-span-5">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#F97316]/20 blur-[80px]"
              />
              <div className="relative z-10 space-y-4">
                <span className="text-xs font-semibold tracking-wider text-[#FB923C] uppercase">
                  Workflow trigger
                </span>
                <h3 className="text-2xl font-semibold">
                  Automated keyword alerts & cluster exports
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  Group keywords into themes and trigger instant briefs to your content team via
                  Email, SMS, or Push Notification.
                </p>

                <div className="flex flex-wrap gap-2 pt-3">
                  {[
                    { id: "email", label: "Email", icon: Mail },
                    { id: "sms", label: "SMS", icon: MessageSquare },
                    { id: "push", label: "Push Notification", icon: Bell },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const active = activeTrigger === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTrigger(tab.id as any)}
                        className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                          active
                            ? "bg-[#F97316] text-white shadow-lg"
                            : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 p-4">
                <div>
                  <div className="text-xs font-semibold text-white">
                    {activeTrigger === "email" &&
                      "Weekly SERP Cluster Digest sent to team@hudbirdui.com"}
                    {activeTrigger === "sms" && "SMS Alert: 14 new low-KD keywords detected"}
                    {activeTrigger === "push" && "Push: Competitor ranking gap found (+42k vol)"}
                  </div>
                  <div className="mt-1 text-[11px] text-emerald-400">Active · Real-time sync</div>
                </div>
                <span className="h-2.5 w-2.5 animate-ping rounded-full bg-emerald-400" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7">
              {[
                {
                  title: "Save Time",
                  desc: "Let AI handle competitive research and trend analysis in seconds instead of days.",
                  icon: Clock,
                },
                {
                  title: "Precision Targeting",
                  desc: "Find long-tail and intent-driven keywords with low difficulty and high conversion.",
                  icon: Target,
                },
                {
                  title: "Stay Updated",
                  desc: "Real-time SERP insights keep your content strategy ahead of algorithm shifts.",
                  icon: RefreshCw,
                },
                {
                  title: "Better Content Fit",
                  desc: "Get semantic keyword clusters that match real user searches and buyer journeys.",
                  icon: Layers,
                },
              ].map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.title}
                    className="flex flex-col justify-between rounded-[28px] border border-white/10 bg-[#151521] p-6 transition-all hover:border-[#FB923C]/40 sm:p-7"
                  >
                    <span className="mb-6 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F97316]/15 text-[#FB923C]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{card.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* 5. AI Solutions Inline Video Pill + VR Aurora Wave (100% Pexels) */}
      <section className="relative overflow-hidden border-t border-white/10 bg-gradient-to-b from-[#090414] via-[#1C0B3B] to-[#0A0A0F] py-24 sm:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[420px] bg-gradient-to-t from-[#7C3AED]/30 via-[#9333EA]/15 to-transparent blur-[90px]"
        />

        <Container className="relative z-10 text-center">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-[clamp(2.4rem,5.2vw,4.4rem)] leading-[1.12] font-semibold tracking-[-0.035em] text-white">
              AI solutions{" "}
              <span className="group relative mx-1.5 inline-flex h-11 w-24 cursor-pointer items-center overflow-hidden rounded-full border border-white/25 bg-white/15 p-1 align-middle shadow-lg sm:h-14 sm:w-32">
                <img
                  src={PEXELS.abstract3D_1}
                  alt="AI video preview"
                  className="h-full w-full rounded-full object-cover opacity-85 transition-transform group-hover:scale-110"
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-zinc-950 shadow">
                    <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />
                  </span>
                </span>
              </span>{" "}
              built for real business impact
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-purple-200/80 sm:text-base">
              Harness next-generation neural workflows to automate research, personalize customer
              journeys, and scale revenue effortlessly.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-6">
              <div className="relative inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 p-2">
                <div className="rounded-full border border-white/25 bg-white/10 p-1.5">
                  <Link
                    to="/demos/ai-copilot/sign-up"
                    className="inline-flex items-center gap-3 rounded-full bg-white py-2.5 pr-2 pl-6 text-sm font-semibold text-zinc-950 shadow-xl transition-transform hover:scale-105"
                  >
                    <span>Start for free</span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-950 text-white">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                </div>
              </div>

              <div className="relative inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 p-2">
                <Link
                  to="/demos/ai-copilot/portfolio"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white transition-transform hover:scale-105 hover:bg-white/25"
                  aria-label="Play AI demo"
                >
                  <Play className="ml-0.5 h-5 w-5 fill-current" />
                </Link>
              </div>
            </div>
          </div>

          <div className="relative mx-auto mt-14 max-w-3xl">
            <div className="rounded-[38px] border border-white/10 bg-white/[0.04] p-2">
              <div className="relative aspect-[16/9] overflow-hidden rounded-[30px] border border-white/15 bg-[#0F111A] shadow-[0_30px_90px_-20px_rgba(0,0,0,0.75)]">
                <img
                  src={PEXELS.vrPortrait}
                  alt="AI VR Neural Experience"
                  className="h-full w-full object-cover object-center opacity-90 mix-blend-lighten"
                />
                <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent p-6 text-left sm:p-8">
                  <div>
                    <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-[#C8F560]">
                      HudbirdUI Neural Engine v4.2
                    </span>
                    <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                      Real-time semantic clustering & intent prediction
                    </h3>
                  </div>
                  <span className="hidden rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white tabular-nums backdrop-blur-md sm:inline-flex">
                    99.8% Accuracy
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 6. Interactive Use-Case Switcher */}
      <section className="bg-[#0A0A0F] py-20 sm:py-28">
        <Container>
          <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-xl space-y-3">
              <SectionLabel
                label="Built For Every Team"
                className="!border-white/10 !bg-white/5 !text-zinc-300"
              />
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Whether you're optimizing blog content or building landing pages.
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {USE_CASES.map((u, idx) => (
                <button
                  key={u.role}
                  type="button"
                  onClick={() => setActiveUseCase(idx)}
                  className={`cursor-pointer rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                    activeUseCase === idx
                      ? "bg-[#C8F560] text-[#0D0F14]"
                      : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {u.role}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[36px] border border-white/10 bg-white/[0.03] p-2">
            <div className="grid grid-cols-1 items-center gap-8 rounded-[28px] border border-white/10 bg-[#13131D] p-6 sm:p-10 lg:grid-cols-12">
              <div className="space-y-5 lg:col-span-6">
                <span className="inline-block rounded-full bg-[#C8F560]/15 px-3.5 py-1 text-xs font-semibold text-[#C8F560]">
                  {USE_CASES[activeUseCase].stat}
                </span>
                <h3 className="text-2xl font-semibold sm:text-3xl">
                  {USE_CASES[activeUseCase].role}
                </h3>
                <p className="text-base leading-relaxed text-zinc-400">
                  {USE_CASES[activeUseCase].desc}
                </p>
                <div className="pt-2">
                  <PillLink href="/demos/ai-copilot/services" variant="lime" size="md">
                    Generate smart keywords
                  </PillLink>
                </div>
              </div>
              <div className="lg:col-span-6">
                <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-white/10">
                  <img
                    src={USE_CASES[activeUseCase].image}
                    alt={USE_CASES[activeUseCase].role}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 7. Clean 2-Tier Pricing Section */}
      <section className="border-t border-white/10 bg-[#0E0E16] py-20 sm:py-28">
        <Container>
          <div className="mx-auto mb-12 max-w-2xl space-y-4 text-center">
            <SectionLabel
              label="Simple Pricing"
              className="!border-white/10 !bg-white/5 !text-zinc-300"
            />
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Pick a plan that fits how your team discovers, clusters, and ships SEO content.
            </h2>

            <div className="mt-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 p-1">
              {(["monthly", "quarterly", "yearly"] as const).map((cycle) => (
                <button
                  key={cycle}
                  type="button"
                  onClick={() => setBillingCycle(cycle)}
                  className={`cursor-pointer rounded-full px-4 py-1.5 text-xs font-semibold capitalize transition-all ${
                    billingCycle === cycle
                      ? "bg-[#C8F560] text-[#0D0F14]"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {cycle}
                </button>
              ))}
            </div>
          </div>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex rounded-[34px] border border-white/10 bg-white/[0.03] p-2">
              <div className="flex w-full flex-col justify-between space-y-8 rounded-[26px] border border-white/10 bg-[#151521] p-8">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold">Starter</h3>
                    <p className="mt-1 text-xs text-zinc-400">Best for startup and small teams</p>
                  </div>
                  <div className="flex items-baseline gap-2 tabular-nums">
                    <span className="text-sm text-zinc-500 line-through">
                      {billingCycle === "monthly"
                        ? "$29"
                        : billingCycle === "quarterly"
                          ? "$87"
                          : "$116"}
                    </span>
                    <span className="text-4xl font-bold text-white sm:text-5xl">
                      {billingCycle === "monthly"
                        ? "$19"
                        : billingCycle === "quarterly"
                          ? "$49"
                          : "$69"}
                    </span>
                    <span className="text-xs text-zinc-400">/{billingCycle}</span>
                  </div>

                  <div className="space-y-3 border-t border-white/10 pt-4">
                    <div className="text-xs font-semibold text-zinc-300">Starter includes:</div>
                    {[
                      "Up to 10,000 keyword credits per month",
                      "5 active projects across domains or clients",
                      "AI keyword suggestions for up to 5 languages",
                      "SERP overview and basic difficulty scores",
                      "CSV export of keyword lists and clusters",
                      "Email support with 48-hour response time",
                    ].map((f) => (
                      <div key={f} className="flex items-center gap-2.5 text-xs text-zinc-300">
                        <Check className="h-4 w-4 shrink-0 text-[#C8F560]" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <PillLink href="/demos/ai-copilot/contact" variant="inverse" size="lg" fullWidth>
                  Get started
                </PillLink>
              </div>
            </div>

            <div className="flex rounded-[34px] border border-[#C8F560]/40 bg-[#C8F560]/15 p-2">
              <div className="relative flex w-full flex-col justify-between space-y-8 rounded-[26px] border border-white/10 bg-[#151521] p-8">
                <span className="absolute top-6 right-6 rounded-full bg-[#C8F560] px-3 py-1 text-[11px] font-semibold text-[#0D0F14]">
                  Most Popular
                </span>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold">Pro</h3>
                    <p className="mt-1 text-xs text-zinc-400">
                      Best for growing businesses and teams
                    </p>
                  </div>
                  <div className="flex items-baseline gap-2 tabular-nums">
                    <span className="text-sm text-zinc-500 line-through">
                      {billingCycle === "monthly"
                        ? "$79"
                        : billingCycle === "quarterly"
                          ? "$237"
                          : "$948"}
                    </span>
                    <span className="text-4xl font-bold text-white sm:text-5xl">
                      {billingCycle === "monthly"
                        ? "$49"
                        : billingCycle === "quarterly"
                          ? "$129"
                          : "$399"}
                    </span>
                    <span className="text-xs text-zinc-400">/{billingCycle}</span>
                  </div>

                  <div className="space-y-3 border-t border-white/10 pt-4">
                    <div className="text-xs font-semibold text-zinc-300">
                      Pro includes everything in Starter, plus:
                    </div>
                    {[
                      "100,000+ keyword credits per month",
                      "Unlimited projects and workspaces",
                      "One-click keyword clustering and topic grouping",
                      "Content brief generation for every keyword cluster",
                      "Team seats with role-based access control",
                      "Priority chat support and onboarding call",
                    ].map((f) => (
                      <div key={f} className="flex items-center gap-2.5 text-xs text-zinc-200">
                        <Check className="h-4 w-4 shrink-0 text-[#C8F560]" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <PillLink href="/demos/ai-copilot/contact" variant="lime" size="lg" fullWidth>
                  Buy Now
                </PillLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 8. Customer Impact Stories Grid with Verified Pexels Avatars */}
      <section className="border-t border-white/10 bg-[#0A0A0F] py-20 sm:py-28">
        <Container>
          <div className="mx-auto mb-14 max-w-2xl space-y-3 text-center">
            <SectionLabel
              label="Customer Results"
              className="!border-white/10 !bg-white/5 !text-zinc-300"
            />
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Join the growing number of businesses delivering exceptional results with AI.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {AI_REVIEWS.map((r, idx) => (
              <div
                key={r.name}
                className="flex rounded-[30px] border border-white/10 bg-white/[0.03] p-1.5"
              >
                <div className="flex w-full flex-col justify-between space-y-5 rounded-[24px] border border-white/10 bg-[#14141F] p-6">
                  <p className="text-sm leading-relaxed text-zinc-300">“{r.quote}”</p>
                  <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                    <img
                      src={PEXELS.avatars[idx % PEXELS.avatars.length]}
                      alt={r.name}
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-[#C8F560]"
                    />
                    <div>
                      <div className="text-sm font-semibold text-white">{r.name}</div>
                      <div className="mt-0.5 text-xs text-zinc-400">{r.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 9. Footer */}
      <SplitTextCtaFooter data={niche.sections.footer} />
    </div>
  );
};

export default AICopilotNicheHome;
