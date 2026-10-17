// starter-kits/pro-templates/src/components/nexus-sections/StudioVisualCanvas.tsx
// 100% Verified Pexels High-Resolution Visual Canvas for HudbirdUI.
// Deterministically maps every preset, avatar, or legacy path to a verified HTTP-200 Pexels photo.
"use client";

import React from "react";
import { PEXELS } from "./HudbirdVisualWidgets";

export type StudioVisualPreset =
  | "agency-hero"
  | "kroma-fintech"
  | "aura-hardware"
  | "vesper-commerce"
  | "synapse-ai"
  | "service-brand"
  | "service-nextjs"
  | "service-shopify"
  | "service-ai"
  | "avatar-monogram"
  | string;

export interface StudioVisualCanvasProps extends React.HTMLAttributes<HTMLDivElement> {
  preset: StudioVisualPreset;
  className?: string;
  name?: string;
  role?: string;
  initials?: string;
}

export function parsePresetString(str: string): { preset: string; params: Record<string, string> } {
  const clean = (str || "").replace(/^preset:/, "");
  const [presetName, queryString] = clean.split("?");
  const params: Record<string, string> = {};
  if (queryString) {
    new URLSearchParams(queryString).forEach((val, key) => {
      params[key] = val;
    });
  }
  return { preset: presetName, params };
}

const ALL_PEXELS_VISUALS = [
  PEXELS.villaHero,
  PEXELS.abstract3d1,
  PEXELS.project1,
  PEXELS.villaExterior1,
  PEXELS.abstract3d2,
  PEXELS.project2,
  PEXELS.villaExterior2,
  PEXELS.abstract3d3,
  PEXELS.project3,
  PEXELS.villaInterior,
  PEXELS.neuralBrain,
  PEXELS.vrPortrait,
  PEXELS.studioTeam,
  PEXELS.project4,
  PEXELS.project5,
  PEXELS.wellness1,
  PEXELS.wellness2,
  PEXELS.wellness3,
  PEXELS.wellness4,
];

function hashString(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) >>> 0;
  }
  return h;
}

export function resolvePexelsUrl(preset?: string, name?: string): string {
  const raw = (preset || "").trim();

  // If already a direct Pexels URL, use it directly
  if (raw.startsWith("https://images.pexels.com/")) {
    return raw;
  }

  const key = `${raw}::${name || ""}`.toLowerCase();

  // Avatar detection
  if (
    key.includes("avatar") ||
    key.includes("portrait") ||
    key.includes("member") ||
    key.includes("author") ||
    key.includes("founder") ||
    key.includes("team")
  ) {
    const idx = hashString(key) % PEXELS.avatars.length;
    return PEXELS.avatars[idx];
  }

  // Domain-specific preset mapping
  if (key.includes("kroma") || key.includes("fintech") || key.includes("treasury")) {
    return PEXELS.project1;
  }
  if (key.includes("proptech") || key.includes("villa") || key.includes("property")) {
    return PEXELS.villaHero;
  }
  if (key.includes("aura") || key.includes("wellness") || key.includes("botanical")) {
    return PEXELS.wellness1;
  }
  if (key.includes("vesper") || key.includes("commerce") || key.includes("shopify")) {
    return PEXELS.project2;
  }
  if (key.includes("synapse") || key.includes("neural") || key.includes("brain")) {
    return PEXELS.neuralBrain;
  }
  if (key.includes("ai") || key.includes("copilot") || key.includes("vr")) {
    return PEXELS.vrPortrait;
  }
  if (key.includes("brand") || key.includes("design")) {
    return PEXELS.abstract3d1;
  }
  if (key.includes("nextjs") || key.includes("webapp") || key.includes("code")) {
    return PEXELS.project4;
  }
  if (key.includes("agency") || key.includes("studio")) {
    return PEXELS.studioTeam;
  }

  // Deterministic fallback from verified Pexels pool
  const idx = hashString(key || "hudbirdui") % ALL_PEXELS_VISUALS.length;
  return ALL_PEXELS_VISUALS[idx];
}

export const StudioVisualCanvas: React.FC<StudioVisualCanvasProps> = ({
  preset,
  className = "",
  name,
  role: _role,
  initials: _initials,
  ...rest
}) => {
  const [fallbackIdx, setFallbackIdx] = React.useState<number | null>(null);
  const resolvedSrc =
    fallbackIdx !== null
      ? ALL_PEXELS_VISUALS[fallbackIdx % ALL_PEXELS_VISUALS.length]
      : resolvePexelsUrl(preset, name);

  return (
    <div className={`relative h-full w-full overflow-hidden bg-zinc-900 ${className}`} {...rest}>
      <img
        src={resolvedSrc}
        alt={name || "HudbirdUI visual"}
        className="h-full w-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        loading="lazy"
        onError={() => {
          setFallbackIdx((prev) => (prev === null ? 0 : prev + 1));
        }}
      />
    </div>
  );
};

export default StudioVisualCanvas;
