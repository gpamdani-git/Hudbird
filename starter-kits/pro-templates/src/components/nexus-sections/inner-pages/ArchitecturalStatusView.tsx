// starter-kits/pro-templates/src/components/nexus-sections/inner-pages/ArchitecturalStatusView.tsx
"use client";

import React, { useState } from "react";
import { Reveal, PillLink } from "../ScrollReveal";
import {
  AlertTriangle,
  Clock,
  ArrowRight,
  CheckCircle2,
  Send,
  Compass,
  Sparkles,
} from "lucide-react";
import { HB, HbSection, HbImage } from "../HudbirdKit";
import { PEXELS } from "../HudbirdVisualWidgets";

export const ArchitecturalStatusView: React.FC<{
  mode?: "404" | "coming-soon";
  nicheSlug?: string;
  nicheName?: string;
  attemptedPath?: string;
}> = ({
  mode = "404",
  nicheSlug = "digital-agency",
  nicheName = "Digital Agency",
  attemptedPath = "/demos/digital-agency/unknown",
}) => {
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (waitlistEmail) {
      setWaitlistSubmitted(true);
    }
  };

  const RECOVERY_ROUTES = [
    {
      label: "Flagship Home",
      path: `/demos/${nicheSlug}`,
      desc: "Explore the primary interactive showcase",
      accent: "bg-[#C8F560]",
    },
    {
      label: "Engineering Process",
      path: `/demos/${nicheSlug}/process`,
      desc: "Review the 4-phase sprint methodology",
      accent: "bg-[#7EE7EE]",
    },
    {
      label: "Services & Capabilities",
      path: `/demos/${nicheSlug}/services`,
      desc: "Interactive service matrix & pods",
      accent: "bg-[#A78BFA]",
    },
    {
      label: "Transparent Pricing",
      path: `/demos/${nicheSlug}/pricing`,
      desc: "Sprint pods and 16-row comparison",
      accent: "bg-[#C8F560]",
    },
    {
      label: "Client Workspace Portal",
      path: `/demos/${nicheSlug}/portal`,
      desc: "Live project burndown and CWV stats",
      accent: "bg-[#7EE7EE]",
    },
    {
      label: "Ecosystem Integrations",
      path: `/demos/${nicheSlug}/integrations`,
      desc: "Certified tech stack and runtimes",
      accent: "bg-[#A78BFA]",
    },
  ];

  if (mode === "coming-soon") {
    return (
      <HbSection tone="muted">
        <div className="mx-auto max-w-4xl space-y-10">
          {/* Hero Glass Card on Pexels Photo */}
          <Reveal>
            <div className="relative flex min-h-[380px] items-center justify-center overflow-hidden rounded-[32px] p-8 text-center shadow-[0_24px_60px_-20px_rgba(13,15,20,0.18)] sm:p-14">
              <HbImage
                src={PEXELS.architectureHero}
                alt="Upcoming HudbirdUI Surface"
                fallbackIndex={0}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[#0D0F14]/70 backdrop-blur-[2px]" />

              <div className="relative z-10 max-w-2xl space-y-5">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#C8F560] px-4 py-1.5 text-xs font-semibold text-[#0D0F14]">
                  <Clock className="h-3.5 w-3.5" />
                  Upcoming Release Wave
                </span>
                <h2 className="text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-5xl">
                  New HudbirdUI Surface in Final QA
                </h2>
                <p className="text-base leading-relaxed text-white/75 sm:text-lg">
                  This template module is completing Playwright E2E verification and design token
                  synchronization. Join the early access list below.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Burndown Progress Card */}
          <Reveal delay={0.08}>
            <div className={`${HB.cardDark} space-y-5 p-8`}>
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-white/70">Release Readiness Progress</span>
                <span className="rounded-full bg-[#C8F560] px-3 py-1 font-bold text-[#0D0F14] tabular-nums">
                  92% Complete · 34/37 Checks Passed
                </span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-white/10 p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#C8F560] to-[#7EE7EE] transition-all duration-1000"
                  style={{ width: "92%" }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-3 sm:grid-cols-4">
                {[
                  { label: "TypeScript Strict", val: "100% Passed" },
                  { label: "CLS Budget", val: "0.000 Locked" },
                  { label: "Token Schema", val: "W3C Synced" },
                  { label: "Lighthouse CWV", val: "100 / 100" },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-white/10 bg-white/[0.05] p-3.5"
                  >
                    <span className="block text-xs text-white/60">{stat.label}</span>
                    <span className="mt-0.5 block text-sm font-semibold text-white">
                      {stat.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Waitlist Subscription Box */}
          <Reveal delay={0.14}>
            <div className={`${HB.card} space-y-6 p-8 text-center sm:p-10`}>
              <div className="mx-auto max-w-xl space-y-2">
                <span className={HB.brandChip}>VIP Notification</span>
                <h3 className={`text-2xl font-semibold ${HB.ink} pt-2`}>
                  Get Instant Release Access
                </h3>
                <p className={`${HB.ink2} text-sm`}>
                  Be notified the moment this module and its Figma + React token schemas ship.
                </p>
              </div>

              {waitlistSubmitted ? (
                <div className="inline-flex items-center gap-2 rounded-2xl border border-[#C8F560] bg-[#C8F560]/25 p-5 text-xs font-semibold text-[#0D0F14] dark:text-white">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>You are #48 on the priority list. We will notify you immediately.</span>
                </div>
              ) : (
                <form
                  onSubmit={handleWaitlist}
                  className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
                >
                  <input
                    type="email"
                    required
                    value={waitlistEmail}
                    onChange={(e) => setWaitlistEmail(e.target.value)}
                    placeholder="founder@company.com"
                    className={`flex-1 rounded-full border border-black/10 bg-[#F4F5F8] px-5 py-3.5 text-sm dark:border-white/15 dark:bg-white/[0.05] ${HB.ink} focus:border-[color:var(--brand-primary)] focus:outline-none`}
                  />
                  <button
                    type="submit"
                    className="flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#0D0F14] px-6 py-3.5 text-xs font-semibold text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-[#0D0F14]"
                  >
                    <span>Notify Me</span>
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </HbSection>
    );
  }

  // 404 Mode
  return (
    <HbSection tone="muted">
      <div className="mx-auto max-w-5xl space-y-12">
        {/* Hero 404 Card */}
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] bg-[#0D0F14] p-8 text-white shadow-[0_24px_60px_-20px_rgba(13,15,20,0.22)] sm:p-14">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              <div className="space-y-5 lg:col-span-7">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#C8F560] px-4 py-1.5 text-xs font-semibold text-[#0D0F14]">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  Status 404 · Route Unresolved
                </span>
                <h2 className="text-3xl leading-[1.1] font-semibold tracking-tight sm:text-5xl">
                  We couldn&apos;t find that page surface
                </h2>
                <p className="text-sm leading-relaxed text-white/70 sm:text-base">
                  The requested path{" "}
                  <code className="rounded bg-white/10 px-2 py-0.5 text-xs text-[#C8F560]">
                    {attemptedPath}
                  </code>{" "}
                  is not mapped in the <strong className="text-white">{nicheName}</strong> showcase.
                  Jump directly to any verified page below.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <PillLink href={`/demos/${nicheSlug}`} variant="brand">
                    Return to {nicheName} Home
                  </PillLink>
                  <PillLink href={`/demos/${nicheSlug}/all-pages`} variant="ghost">
                    Browse All 24+ Pages →
                  </PillLink>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] border border-white/10">
                  <HbImage
                    src={PEXELS.projects[0]}
                    alt="HudbirdUI Showcase"
                    fallbackIndex={0}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-2xl bg-white/75 p-3.5 backdrop-blur-xl dark:bg-[#14171F]/80">
                    <span className="text-xs font-semibold text-[#0D0F14] dark:text-white">
                      Active Niche: {nicheName}
                    </span>
                    <span className="rounded-full bg-[#C8F560] px-2.5 py-1 text-[11px] font-bold text-[#0D0F14]">
                      24+ Pages Ready
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Suggested Recovery Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className={HB.chip}>Quick Navigation</span>
              <h3 className={`text-2xl font-semibold ${HB.ink} mt-2`}>
                Explore Verified Production Surfaces
              </h3>
            </div>
            <Compass className="h-6 w-6 text-[color:var(--brand-primary)]" />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {RECOVERY_ROUTES.map((route, idx) => (
              <Reveal key={route.path} delay={idx * 0.05}>
                <a
                  href={route.path}
                  className={`${HB.card} ${HB.hoverLift} group block flex h-full flex-col justify-between space-y-4 p-6`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className={`h-2.5 w-2.5 rounded-full ${route.accent}`} />
                      <ArrowRight className="h-4 w-4 text-[#5E6472] transition-all group-hover:translate-x-1 group-hover:text-[color:var(--brand-primary)]" />
                    </div>
                    <h4
                      className={`text-lg font-semibold ${HB.ink} transition-colors group-hover:text-[color:var(--brand-primary)]`}
                    >
                      {route.label}
                    </h4>
                    <p className={`${HB.ink2} text-xs leading-relaxed`}>{route.desc}</p>
                  </div>
                  <span className="truncate border-t border-black/[0.05] pt-2 text-[11px] font-medium text-[#5E6472] dark:border-white/[0.06] dark:text-[#9CA3AF]">
                    {route.path}
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </HbSection>
  );
};
