// starter-kits/pro-templates/src/components/nexus-sections/inner-pages/BlogJournalListing.tsx
"use client";

import React from "react";
import { Reveal, PillLink } from "../ScrollReveal";
import { Clock, Sparkles } from "lucide-react";
import { PEXELS } from "../HudbirdVisualWidgets";
import { HB, HbSection, HbHeader, HbImage } from "../HudbirdKit";
import { getDomainContent } from "./domainContent";

export const BlogJournalListing: React.FC<{
  nicheSlug?: string;
  title?: string;
  subtitle?: string;
}> = ({
  nicheSlug = "digital-agency",
  title = "Insights, playbooks & product stories",
  subtitle = "Practical guides and deep-dives from our design and engineering leads on building modern digital products.",
}) => {
  const domainData = getDomainContent(nicheSlug);
  const posts = domainData.blog;

  return (
    <HbSection id="blog-listing" tone="muted">
      <HbHeader badge="Journal & Insights" title={title} subtitle={subtitle} />

      {/* Featured Post Card */}
      {posts
        .filter((p) => p.featured)
        .map((post, idx) => (
          <Reveal key={post.id} y={20}>
            <div
              className={`mb-12 grid grid-cols-1 items-center gap-8 rounded-[32px] border border-black/[0.06] bg-white p-6 sm:p-10 lg:grid-cols-12 lg:gap-12 dark:border-white/10 dark:bg-zinc-900 ${HB.hoverLift}`}
            >
              <div className="space-y-5 lg:col-span-6">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className={HB.brandChip}>{post.category}</span>
                  <span className={HB.chip}>
                    <Clock className="mr-1 h-3.5 w-3.5 text-zinc-400" />
                    {post.readTime}
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">{post.date}</span>
                </div>

                <h3 className="text-2xl leading-[1.12] font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
                  {post.title}
                </h3>

                <p className={`text-sm leading-relaxed sm:text-base ${HB.ink2}`}>{post.excerpt}</p>

                <div className="flex flex-col justify-between gap-4 border-t border-black/[0.06] pt-5 sm:flex-row sm:items-center dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <img
                      src={PEXELS.avatars[idx % PEXELS.avatars.length]}
                      alt={post.author.name}
                      className="h-11 w-11 rounded-full object-cover ring-2 ring-[#C8F560]"
                    />
                    <div>
                      <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                        {post.author.name}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">{post.author.role}</p>
                    </div>
                  </div>

                  <PillLink href={`/demos/${nicheSlug}/blog/post`} variant="brand" size="md">
                    Read article
                  </PillLink>
                </div>
              </div>

              <div className="group relative aspect-[16/10] overflow-hidden rounded-[26px] bg-zinc-900 lg:col-span-6">
                <HbImage
                  src={PEXELS.projects[0]}
                  alt={post.title}
                  fallbackIndex={0}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#C8F560] px-3 py-1 text-xs font-semibold text-zinc-950 shadow-md">
                    <Sparkles className="h-3.5 w-3.5" /> Featured Story
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        ))}

      {/* Grid for Other Posts */}
      <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
        {posts
          .filter((p) => !p.featured)
          .map((post, idx) => (
            <Reveal key={post.id} delay={idx * 0.08} y={20}>
              <div
                className={`${HB.card} group flex h-full flex-col justify-between p-5 sm:p-6 ${HB.hoverLift}`}
              >
                <div className="space-y-5">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] bg-zinc-900">
                    <HbImage
                      src={PEXELS.projects[(idx + 1) % PEXELS.projects.length]}
                      alt={post.title}
                      fallbackIndex={idx + 1}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-zinc-900 backdrop-blur-md dark:bg-zinc-950/85 dark:text-white">
                        {post.category}
                      </span>
                    </div>
                    <div className="absolute right-3 bottom-3">
                      <span className="rounded-full bg-black/65 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md">
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2.5 px-1">
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">{post.date}</div>
                    <h4 className="text-xl leading-snug font-semibold tracking-tight text-zinc-900 sm:text-2xl dark:text-white">
                      {post.title}
                    </h4>
                    <p className={`text-sm leading-relaxed ${HB.ink2}`}>{post.excerpt}</p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-black/[0.06] px-1 pt-5 dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <img
                      src={PEXELS.avatars[(idx + 1) % PEXELS.avatars.length]}
                      alt={post.author.name}
                      className="h-9 w-9 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-xs font-semibold text-zinc-900 dark:text-white">
                        {post.author.name}
                      </p>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                        {post.author.role}
                      </p>
                    </div>
                  </div>

                  <PillLink href={`/demos/${nicheSlug}/blog/post`} variant="ghost" size="sm">
                    Read
                  </PillLink>
                </div>
              </div>
            </Reveal>
          ))}
      </div>
    </HbSection>
  );
};
