// starter-kits/pro-templates/src/components/nexus-sections/inner-pages/BlogPostDetailView.tsx
"use client";

import React, { useState } from "react";
import { MaskedHeading, Reveal, PillLink } from "../ScrollReveal";
import { Share2, Sparkles, Clock, Check } from "lucide-react";
import { PEXELS } from "../HudbirdVisualWidgets";
import { HB, HbSection, HbImage } from "../HudbirdKit";
import { getDomainContent } from "./domainContent";

export const BlogPostDetailView: React.FC<{
  nicheSlug?: string;
}> = ({ nicheSlug = "digital-agency" }) => {
  const domainData = getDomainContent(nicheSlug);
  const article = domainData.blog[0] || domainData.blog[1];
  const [copied, setCopied] = useState(false);

  return (
    <HbSection tone="muted">
      {/* Centered Article Header */}
      <div className="mx-auto mb-12 max-w-3xl space-y-6 text-center">
        <Reveal y={10}>
          <div className="inline-flex flex-wrap items-center justify-center gap-2">
            <span className={HB.brandChip}>{article.category}</span>
            <span className={HB.chip}>
              <Clock className="mr-1 h-3.5 w-3.5 text-zinc-400" />
              {article.readTime}
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">{article.date}</span>
          </div>
        </Reveal>

        <MaskedHeading
          as="h1"
          text={article.title}
          className="text-[clamp(2.2rem,5vw,4rem)] leading-[1.06] font-semibold tracking-[-0.035em] text-zinc-900 dark:text-white"
        />

        <Reveal delay={0.1}>
          <p className={`text-base leading-relaxed sm:text-lg ${HB.ink2}`}>{article.excerpt}</p>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-black/[0.06] pt-6 text-left dark:border-white/10">
            <div className="flex items-center gap-3">
              <img
                src={PEXELS.avatars[0]}
                alt={article.author.name}
                className="h-11 w-11 rounded-full object-cover ring-2 ring-[#C8F560]"
              />
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                  {article.author.name}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{article.author.role}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }
              }}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-black/[0.06] bg-white px-4 py-2 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-white/10"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" /> Copied link
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5" /> Share article
                </>
              )}
            </button>
          </div>
        </Reveal>
      </div>

      {/* Hero Cover Image with Floating Telemetry Pill */}
      <Reveal delay={0.2} y={24}>
        <div className="relative mx-auto mb-14 aspect-[21/9] max-w-5xl overflow-hidden rounded-[32px] bg-zinc-900 shadow-[0_32px_70px_-25px_rgba(0,0,0,0.3)]">
          <HbImage
            src={PEXELS.villaHero}
            alt={article.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute right-4 bottom-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-950/85 px-4 py-2 text-xs font-semibold text-[#C8F560] backdrop-blur-xl">
              <Sparkles className="h-3.5 w-3.5" /> Verified Production Architecture
            </span>
          </div>
        </div>
      </Reveal>

      {/* Editorial Body Card */}
      <div className="mx-auto max-w-3xl space-y-8 rounded-[32px] border border-black/[0.06] bg-white p-7 sm:p-12 dark:border-white/10 dark:bg-zinc-900">
        {article.contentQuote && (
          <div className="rounded-2xl border border-black/[0.05] bg-[#F4F5F8] p-6 sm:p-8 dark:border-white/10 dark:bg-zinc-950/70">
            <p className="text-lg leading-relaxed font-medium text-zinc-900 sm:text-xl dark:text-white">
              {article.contentQuote}
            </p>
          </div>
        )}

        {article.section1Title && (
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
              {article.section1Title}
            </h2>
            {article.section1Body && (
              <p className={`text-base leading-relaxed sm:text-lg ${HB.ink2}`}>
                {article.section1Body}
              </p>
            )}
          </div>
        )}

        {/* Highlight Widget Callout */}
        <div className="flex flex-col justify-between gap-6 rounded-[24px] bg-[#0E1017] p-6 text-white sm:flex-row sm:items-center sm:p-8">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#C8F560] px-3 py-1 text-xs font-semibold text-zinc-950">
              <Sparkles className="h-3.5 w-3.5" /> Key Takeaway
            </span>
            <p className="max-w-xl pt-1 text-sm leading-relaxed text-zinc-300 sm:text-base">
              Every template and component is engineered with zero layout shift, responsive grids,
              and dark/light design tokens out of the box.
            </p>
          </div>
          <PillLink href={`/demos/${nicheSlug}/contact`} variant="inverse" size="sm">
            Book a call
          </PillLink>
        </div>

        {article.section2Title && (
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
              {article.section2Title}
            </h2>
            {article.section2Body && (
              <p className={`text-base leading-relaxed sm:text-lg ${HB.ink2}`}>
                {article.section2Body}
              </p>
            )}
          </div>
        )}
      </div>
    </HbSection>
  );
};
