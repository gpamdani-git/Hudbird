// starter-kits/pro-templates/src/components/nexus-sections/inner-pages/ChangelogTimeline.tsx
"use client";

import React from "react";
import { Reveal } from "../ScrollReveal";
import { GitCommit, Sparkles, Zap, ShieldCheck, CheckCircle2 } from "lucide-react";
import { PEXELS } from "../HudbirdVisualWidgets";
import { HB, HbSection, HbHeader, HbImage } from "../HudbirdKit";
import { getDomainContent } from "./domainContent";

const TYPE_META: Record<string, { label: string; bg: string; icon: React.ElementType }> = {
  feature: { label: "New Feature", bg: "#C8F560", icon: Sparkles },
  perf: { label: "Performance", bg: "#7EE7EE", icon: Zap },
  security: { label: "Security", bg: "#A78BFA", icon: ShieldCheck },
  fix: { label: "Improvement", bg: "#FACC15", icon: CheckCircle2 },
};

export const ChangelogTimeline: React.FC<{
  nicheSlug?: string;
  title?: string;
  subtitle?: string;
}> = ({
  nicheSlug = "digital-agency",
  title = "What’s new in our latest releases",
  subtitle = "Follow our weekly product updates, UI component additions, and performance improvements.",
}) => {
  const domainData = getDomainContent(nicheSlug);
  const releases = domainData.changelog;

  return (
    <HbSection id="changelog" tone="muted">
      <HbHeader badge="Changelog & Releases" title={title} subtitle={subtitle} />

      <div className="space-y-10">
        {releases.map((rel, rIdx) => (
          <Reveal key={rel.version} delay={rIdx * 0.08} y={24}>
            <div className={`${HB.card} p-6 sm:p-10 ${HB.hoverLift}`}>
              {/* Top Release Banner + Meta */}
              <div className="grid grid-cols-1 items-center gap-8 border-b border-black/[0.06] pb-8 lg:grid-cols-12 dark:border-white/10">
                <div className="space-y-4 lg:col-span-7">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="rounded-full bg-zinc-900 px-3.5 py-1 text-sm font-bold text-white tabular-nums dark:bg-white dark:text-zinc-950">
                      {rel.version}
                    </span>
                    <span
                      className="rounded-full px-3 py-1 text-xs font-semibold text-zinc-950"
                      style={{
                        background: rIdx === 0 ? HB.lime : rIdx === 1 ? HB.cyan : HB.violet,
                      }}
                    >
                      {rel.badge === "LATEST" ? "Latest Release" : rel.badge}
                    </span>
                    <span className={HB.chip}>
                      <GitCommit className="mr-1 h-3.5 w-3.5 text-zinc-400" />
                      {rel.date}
                    </span>
                  </div>

                  <h3 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
                    {rel.headline}
                  </h3>
                  <p className={`text-sm leading-relaxed sm:text-base ${HB.ink2}`}>{rel.summary}</p>
                </div>

                {/* Right Pexels Visual Preview */}
                <div className="relative aspect-[16/9] overflow-hidden rounded-[22px] bg-zinc-900 lg:col-span-5">
                  <HbImage
                    src={PEXELS.projects[rIdx % PEXELS.projects.length]}
                    alt={rel.headline}
                    fallbackIndex={rIdx}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute right-3 bottom-3 left-3 flex items-center justify-between text-xs text-white">
                    <span className="rounded-full bg-black/60 px-2.5 py-1 font-medium backdrop-blur-md">
                      Release {rel.version}
                    </span>
                    <span className="rounded-full bg-[#C8F560] px-2.5 py-1 font-semibold text-zinc-950">
                      100% Verified
                    </span>
                  </div>
                </div>
              </div>

              {/* Shipped Items Grid */}
              <div className="grid grid-cols-1 gap-4 pt-8 md:grid-cols-2">
                {rel.changes.map((change, idx) => {
                  const meta = TYPE_META[change.type] || TYPE_META.fix;
                  const Icon = meta.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-start gap-4 rounded-2xl border border-black/[0.04] bg-[#F4F5F8] p-5 dark:border-white/[0.06] dark:bg-zinc-950/70"
                    >
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-zinc-950"
                        style={{ background: meta.bg }}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <div className="min-w-0 space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                            {change.title}
                          </span>
                          <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:bg-white/10 dark:text-zinc-300">
                            {meta.label}
                          </span>
                        </div>
                        <p className={`text-xs leading-relaxed sm:text-sm ${HB.ink2}`}>
                          {change.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </HbSection>
  );
};
