// starter-kits/pro-templates/src/pages/NexusInnerPageView.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getNicheBySlug, digitalAgencyNiche } from "@hudbird/schemas";
import { NexusInnerPageRenderer, LivePreviewToolbar } from "../components/nexus-sections";

export function NexusInnerPageView() {
  const { nicheSlug, "*": wildCardSlug } = useParams<{ nicheSlug?: string; "*": string }>();
  const location = useLocation();

  // Resolve niche based on route parameter or default
  const resolvedNiche = getNicheBySlug(nicheSlug || "digital-agency") || digitalAgencyNiche;
  const [accentColor, setAccentColor] = useState(resolvedNiche.theme.brandPrimary);

  // Extract page slug from wildcard or location pathname
  const pageSlug = wildCardSlug || location.pathname.split(`/${nicheSlug}/`)[1] || "about";

  useEffect(() => {
    // Sync accent color if niche changes
    setAccentColor(resolvedNiche.theme.brandPrimary);

    // Update document title
    const formattedTitle = pageSlug.split("/").pop()?.replace(/-/g, " ").toUpperCase() || "PAGE";
    document.title = `${formattedTitle} — ${resolvedNiche.name} | Hudbird Nexus`;

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [resolvedNiche, pageSlug]);

  return (
    <div
      data-niche={resolvedNiche.slug}
      style={{ "--brand-primary": accentColor } as React.CSSProperties}
      className="bg-nx-page text-nx-ink selection:bg-nx-inverse selection:text-nx-inverse-ink relative min-h-screen transition-colors duration-500"
    >
      <NexusInnerPageRenderer
        niche={resolvedNiche}
        pageSlug={pageSlug}
        customBrandPrimary={accentColor}
      />

      <LivePreviewToolbar
        currentAccentColor={accentColor}
        onAccentColorChange={(color) => setAccentColor(color)}
      />
    </div>
  );
}

export default NexusInnerPageView;
