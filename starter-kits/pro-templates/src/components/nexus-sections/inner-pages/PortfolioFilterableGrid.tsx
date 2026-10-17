// starter-kits/pro-templates/src/components/nexus-sections/inner-pages/PortfolioFilterableGrid.tsx
"use client";

import React, { useState } from "react";
import { Reveal, PillLink } from "../ScrollReveal";
import { Sparkles } from "lucide-react";
import { PEXELS } from "../HudbirdVisualWidgets";
import { HB, HbSection, HbHeader, HbImage } from "../HudbirdKit";
import { getDomainContent } from "./domainContent";

export const PortfolioFilterableGrid: React.FC<{
  nicheSlug?: string;
  title?: string;
  subtitle?: string;
}> = ({
  nicheSlug = "digital-agency",
  title = "Selected work & real-world results",
  subtitle = "Explore how we help ambitious brands design, engineer, and scale high-converting digital products.",
}) => {
  const domainData = getDomainContent(nicheSlug);
  const projects = domainData.projects;
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const categories = Array.from(new Set(projects.map((p) => p.category)));
  const filteredProjects =
    activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <HbSection id="portfolio-grid" tone="muted">
      <HbHeader badge="Portfolio & Case Studies" title={title} subtitle={subtitle} />

      {/* Clean Filter Pills */}
      <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setActiveFilter("all")}
          className={`cursor-pointer rounded-full px-4 py-2 text-xs font-medium transition-all sm:text-sm ${
            activeFilter === "all"
              ? "bg-zinc-900 text-white shadow-sm dark:bg-white dark:text-zinc-950"
              : "border border-black/[0.06] bg-white text-zinc-600 hover:text-zinc-900 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          }`}
        >
          All Projects ({projects.length})
        </button>
        {categories.map((cat) => {
          const isSelected = activeFilter === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              className={`cursor-pointer rounded-full px-4 py-2 text-xs font-medium transition-all sm:text-sm ${
                isSelected
                  ? "bg-zinc-900 text-white shadow-sm dark:bg-white dark:text-zinc-950"
                  : "border border-black/[0.06] bg-white text-zinc-600 hover:text-zinc-900 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* 2-Column Rounded-[28px] Portfolio Cards */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {filteredProjects.map((project, idx) => (
          <Reveal key={project.id} delay={idx * 0.07} y={22}>
            <div
              className={`${HB.card} group flex h-full flex-col justify-between p-4 sm:p-6 ${HB.hoverLift}`}
            >
              {/* Visual Frame with Frosted Glass Overlay Badges */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] bg-zinc-900">
                <HbImage
                  src={PEXELS.projects[idx % PEXELS.projects.length]}
                  alt={project.title}
                  fallbackIndex={idx}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3.5 left-3.5 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-zinc-900 backdrop-blur-md dark:bg-zinc-950/85 dark:text-white">
                    {project.client}
                  </span>
                  <span className="rounded-full bg-black/55 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md">
                    {project.year}
                  </span>
                </div>

                <div className="absolute right-3.5 bottom-3.5">
                  <span className="flex items-center gap-1.5 rounded-full bg-[#C8F560] px-3.5 py-1.5 text-xs font-semibold text-zinc-950 shadow-lg">
                    <Sparkles className="h-3.5 w-3.5" />
                    {project.metrics.label}: {project.metrics.value}
                  </span>
                </div>
              </div>

              {/* Text Info */}
              <div className="space-y-2.5 px-2 pt-5">
                <span className={HB.brandChip}>{project.category}</span>
                <h3 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
                  {project.title}
                </h3>
                <p className={`text-sm leading-relaxed ${HB.ink2}`}>{project.impactHeadline}</p>
              </div>

              {/* Stack & Action */}
              <div className="mt-5 space-y-4 border-t border-black/[0.06] px-2 pt-5 dark:border-white/10">
                <div className="flex flex-wrap gap-1.5">
                  {project.stackTags.map((tag) => (
                    <span key={tag} className={HB.chip}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col justify-between gap-3 pt-1 sm:flex-row sm:items-center">
                  <span className="line-clamp-1 text-xs text-zinc-500 dark:text-zinc-400">
                    {project.deliverablesSummary}
                  </span>
                  <PillLink
                    href={`/demos/${nicheSlug}/projects/case-study`}
                    variant="brand"
                    size="sm"
                  >
                    View case study
                  </PillLink>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </HbSection>
  );
};
