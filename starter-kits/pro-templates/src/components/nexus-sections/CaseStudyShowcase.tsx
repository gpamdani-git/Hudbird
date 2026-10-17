// starter-kits/pro-templates/src/components/nexus-sections/CaseStudyShowcase.tsx
"use client";

import React from "react";
import { CaseStudyShowcaseProps, CaseStudyItem } from "@hudbird/schemas";
import { PEXELS } from "./HudbirdVisualWidgets";
import { Container, SectionHeader, Reveal } from "./ScrollReveal";
import { ArrowUpRight } from "lucide-react";

const CASE_PEXELS_IMAGES = [
  PEXELS.project1,
  PEXELS.villaHero,
  PEXELS.project2,
  PEXELS.abstract3d1,
  PEXELS.project3,
  PEXELS.villaExterior2,
];

interface ProjectCardProps {
  project: CaseStudyItem;
  imageSrc: string;
  delay?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, imageSrc, delay = 0 }) => {
  return (
    <Reveal delay={delay}>
      <div className="group bg-nx-surface border-nx-line cursor-pointer rounded-[32px] border p-3.5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] bg-zinc-900">
          <img
            src={imageSrc}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

          {/* Top Left Category Pill */}
          <span className="absolute top-3.5 left-3.5 rounded-full bg-white/90 px-3.5 py-1 text-xs font-semibold text-zinc-950">
            {project.category}
          </span>

          {/* Bottom Right Metric Pill */}
          <span className="absolute right-3.5 bottom-3.5 rounded-full bg-[#C8F560] px-3.5 py-1 text-xs font-bold text-zinc-950 shadow">
            {project.metrics.value} · {project.metrics.label}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4 p-4">
          <div>
            <div className="text-nx-muted text-xs font-medium">
              {project.client} · {project.year}
            </div>
            <h3 className="text-nx-ink mt-0.5 text-xl font-semibold transition-colors group-hover:text-[color:var(--brand-primary,#7C3AED)]">
              {project.title}
            </h3>
          </div>
          <div className="bg-nx-page border-nx-line text-nx-ink flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors group-hover:border-transparent group-hover:bg-[color:var(--brand-primary,#7C3AED)] group-hover:text-white">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Reveal>
  );
};

export const CaseStudyShowcase: React.FC<{ data: CaseStudyShowcaseProps }> = ({ data }) => {
  const projects = data.projects || [];

  return (
    <section id="work" className="bg-nx-page py-20 transition-colors duration-300 sm:py-28">
      <Container>
        <SectionHeader
          index="03"
          label={data.sectionTag || "Selected Projects"}
          headline={data.headline}
          description={data.description}
          className="mb-14 sm:mb-18"
        />

        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
          {projects.map((proj, idx) => (
            <ProjectCard
              key={proj.title || idx}
              project={proj}
              imageSrc={CASE_PEXELS_IMAGES[idx % CASE_PEXELS_IMAGES.length]}
              delay={idx * 0.08}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};
