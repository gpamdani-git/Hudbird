// starter-kits/pro-templates/src/pages/NexusNicheDemoView.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getNicheBySlug, digitalAgencyNiche, getPrebuiltTemplateMeta } from "@hudbird/schemas";
import { SectionRenderer, LivePreviewToolbar } from "../components/nexus-sections";

const DEFAULT_NICHE_ACCENT: Record<string, string> = {
  "digital-agency": "#7C3AED",
  "ai-copilot": "#F97316",
  "fintech-protocol": "#84CC16",
  "cyber-shield": "#7C3AED",
  "alunara-wellness": "#9333EA",
};

const LIGHT_DEFAULT_NICHES = new Set(["digital-agency", "fintech-protocol", "cyber-shield"]);

export function NexusNicheDemoView() {
  const { nicheSlug } = useParams<{ nicheSlug: string }>();
  const resolvedNiche = getNicheBySlug(nicheSlug || "digital-agency") || digitalAgencyNiche;
  const prebuiltMeta = getPrebuiltTemplateMeta(nicheSlug || "");

  const defaultColor =
    prebuiltMeta?.accent ||
    DEFAULT_NICHE_ACCENT[resolvedNiche.slug] ||
    resolvedNiche.theme.brandPrimary;
  const [accentColor, setAccentColor] = useState(defaultColor);

  useEffect(() => {
    setAccentColor(
      prebuiltMeta?.accent ||
        DEFAULT_NICHE_ACCENT[resolvedNiche.slug] ||
        resolvedNiche.theme.brandPrimary
    );
    document.title = `${resolvedNiche.name} — ${resolvedNiche.tagline} | HudbirdUI`;

    const params = new URLSearchParams(window.location.search);
    const themeParam = params.get("theme");

    if (themeParam === "light") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else if (themeParam === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else if (prebuiltMeta) {
      if (prebuiltMeta.mode.startsWith("light")) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      }
    } else {
      if (LIGHT_DEFAULT_NICHES.has(resolvedNiche.slug)) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      }
    }

    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [resolvedNiche, nicheSlug, prebuiltMeta]);

  return (
    <div className="bg-nx-page text-nx-ink selection:bg-nx-ink selection:text-nx-page relative min-h-screen transition-colors duration-300">
      <SectionRenderer niche={resolvedNiche} customBrandPrimary={accentColor} />

      <LivePreviewToolbar
        currentAccentColor={accentColor}
        onAccentColorChange={(color) => setAccentColor(color)}
      />
    </div>
  );
}

export default NexusNicheDemoView;
