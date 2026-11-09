"use client";
import React from "react";
import type {
  BrandProfile,
  LandingSectionContent,
  LandingSectionSelection,
} from "@hudbird/schemas";
import { LandingSectionPreview } from "@hudbird/marketing";
import { Sparkles } from "lucide-react";
import { IframePreview } from "../IframePreview";
import type { HoveredVariantPreviewData } from "./BlockVariantsInspector";

export interface VariantHoverPreviewProps {
  hoveredVariant: HoveredVariantPreviewData | null;
  content: LandingSectionContent;
  brand: BrandProfile;
}

export function VariantHoverPreview({ hoveredVariant, content, brand }: VariantHoverPreviewProps) {
  if (!hoveredVariant) return null;

  const isNavbar = hoveredVariant.type === "navbar";
  const previewHeight = isNavbar
    ? 130
    : hoveredVariant.type === "logos"
      ? 150
      : hoveredVariant.type === "cta" || hoveredVariant.type === "faq"
        ? 220
        : 280;

  // Clamp vertical position so the card stays within viewport
  const maxTop = typeof window !== "undefined" ? window.innerHeight - previewHeight - 90 : 400;
  const top = Math.min(Math.max(hoveredVariant.top - 20, 16), maxTop);

  return (
    <div
      style={{ top: `${top}px` }}
      className="pointer-events-none fixed left-[21rem] z-[100] hidden w-[520px] overflow-hidden rounded-2xl border border-zinc-200/90 bg-white/95 text-zinc-900 shadow-2xl backdrop-blur-2xl transition-all duration-150 lg:block dark:border-white/[0.12] dark:bg-[#161618]/95 dark:text-zinc-100"
    >
      {/* 1. Header with Glow Badge & Variant Info */}
      <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-50/90 px-3.5 py-2.5 dark:border-white/[0.08] dark:bg-white/[0.03]">
        <div className="flex min-w-0 items-center gap-2">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="truncate text-xs font-bold text-zinc-900 dark:text-white">
            {hoveredVariant.variantName.replace(/NAV-\d+\s*—\s*/, "")}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span className="rounded-full bg-zinc-100 px-2 py-0.5 font-mono text-[10px] font-medium text-zinc-600 dark:bg-white/[0.08] dark:text-zinc-300">
            {hoveredVariant.variantId}
          </span>
          <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
            <Sparkles className="h-3 w-3" />
            <span>Live Preview</span>
          </span>
        </div>
      </div>

      {/* 2. Isolated Iframe Preview Viewport (Zero CSS leakage, True Real UI) */}
      <div
        style={{ height: `${previewHeight}px` }}
        className="relative w-full overflow-hidden bg-white dark:bg-[#0c0d10]"
      >
        <IframePreview flush minHeight={previewHeight} className="h-full w-full">
          <div className="pointer-events-none w-full select-none">
            <LandingSectionPreview
              selection={
                {
                  type: hoveredVariant.type,
                  variant: hoveredVariant.variantId,
                  enabled: true,
                } as LandingSectionSelection
              }
              content={content}
              brand={brand}
            />
          </div>
        </IframePreview>
      </div>

      {/* 3. Footer with helper hint */}
      <div className="flex items-center justify-between border-t border-zinc-100 bg-zinc-50/60 px-3.5 py-1.5 text-[10px] text-zinc-500 dark:border-white/[0.06] dark:bg-white/[0.02] dark:text-zinc-400">
        <span className="max-w-[340px] truncate">{hoveredVariant.variantDescription}</span>
        <span className="shrink-0 font-semibold text-zinc-700 dark:text-zinc-300">
          Click card to apply
        </span>
      </div>
    </div>
  );
}
