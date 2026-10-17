// starter-kits/pro-templates/src/components/nexus-sections/SectionRenderer.tsx
"use client";

import React from "react";
import { NicheConfig, getPrebuiltTemplateMeta } from "@hudbird/schemas";
import {
  AgencyNicheHome,
  AICopilotNicheHome,
  FintechNicheHome,
  CyberShieldNicheHome,
  AlunaraWellnessNicheHome,
} from "./niches";
import { HudbirdPolymorphicTemplateHome } from "./HudbirdPolymorphicSections";

export interface SectionRendererProps {
  niche: NicheConfig;
  customBrandPrimary?: string;
}

const FLAGSHIP_BASE_SLUGS = new Set([
  "digital-agency",
  "ai-copilot",
  "fintech-protocol",
  "cyber-shield",
  "alunara-wellness",
  "property-management-software",
]);

export const SectionRenderer: React.FC<SectionRendererProps> = ({ niche, customBrandPrimary }) => {
  const brandColor = customBrandPrimary || niche.theme.brandPrimary;

  const dynamicStyles = {
    "--brand-primary": brandColor,
    "--brand-accent": niche.theme.brandAccent,
  } as React.CSSProperties;

  const prebuiltMeta = getPrebuiltTemplateMeta(niche.slug);

  const renderNicheHome = () => {
    // Any of the 47 pre-built templates outside the 6 flagship base layouts renders its own
    // polymorphic domain-adaptive template home (5 hero layouts, interactive sandbox, ROI calculator,
    // asymmetric Pexels bento, before/after diff, and domain case studies).
    if (prebuiltMeta && !FLAGSHIP_BASE_SLUGS.has(niche.slug)) {
      return (
        <HudbirdPolymorphicTemplateHome
          niche={niche}
          meta={prebuiltMeta}
          customBrandPrimary={customBrandPrimary}
        />
      );
    }

    if (niche.slug === "ai-copilot") {
      return <AICopilotNicheHome niche={niche} customBrandPrimary={customBrandPrimary} />;
    }
    if (niche.slug === "fintech-protocol" || niche.slug === "property-management-software") {
      return (
        <FintechNicheHome
          niche={niche}
          customBrandPrimary={customBrandPrimary}
          defaultHeroMode={niche.slug === "property-management-software" ? "proptech" : undefined}
        />
      );
    }
    if (niche.slug === "cyber-shield") {
      return <CyberShieldNicheHome niche={niche} customBrandPrimary={customBrandPrimary} />;
    }
    if (niche.slug === "alunara-wellness") {
      return <AlunaraWellnessNicheHome niche={niche} customBrandPrimary={customBrandPrimary} />;
    }
    return <AgencyNicheHome niche={niche} customBrandPrimary={customBrandPrimary} />;
  };

  return (
    <div
      data-niche={niche.slug}
      style={dynamicStyles}
      className="bg-nx-page text-nx-ink selection:bg-nx-inverse selection:text-nx-inverse-ink relative min-h-screen font-sans transition-colors duration-500"
    >
      {/* Polymorphic Niche Flow — Supports all 47 Pre-Built Templates */}
      <main className="relative z-10 flex flex-col">{renderNicheHome()}</main>
    </div>
  );
};
