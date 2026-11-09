"use client";
import * as React from "react";
import type { LandingSectionType } from "@hudbird/schemas";
import { landingSectionRegistry } from "@hudbird/marketing";
import { ArrowLeft, Check, Eye, EyeOff } from "lucide-react";
import { SectionWireframeSvg } from "./SectionWireframeSvg";

export interface HoveredVariantPreviewData {
  type: LandingSectionType;
  title: string;
  variantId: string;
  variantName: string;
  variantDescription: string;
  top: number;
}

export interface BlockVariantsInspectorProps {
  sectionType: LandingSectionType;
  currentVariant: string;
  isEnabled: boolean;
  onSelectVariant: (variantId: string) => void;
  onHoverVariant: (preview: HoveredVariantPreviewData | null) => void;
  onToggleEnabled: (enabled: boolean) => void;
  onBack: () => void;
}

export function BlockVariantsInspector({
  sectionType,
  currentVariant,
  isEnabled,
  onSelectVariant,
  onHoverVariant,
  onToggleEnabled,
  onBack,
}: BlockVariantsInspectorProps) {
  const [filterCategory, setFilterCategory] = React.useState<string>("all");

  const definition = React.useMemo(() => {
    return landingSectionRegistry.find((s) => s.type === sectionType);
  }, [sectionType]);

  const rawVariants = React.useMemo(() => {
    if (!definition) return [];
    if (sectionType === "navbar") {
      const all = [...definition.variants, ...(definition.additionalVariants ?? [])];
      const navNumbered = all.filter((v) => v.id.startsWith("nav-"));
      const others = all.filter((v) => !v.id.startsWith("nav-"));
      return [...navNumbered, ...others];
    }
    return [...definition.variants, ...(definition.additionalVariants ?? [])];
  }, [definition, sectionType]);

  // Navbar category filter options
  const navbarCategories = [
    { id: "all", label: "All" },
    { id: "saas", label: "SaaS" },
    { id: "creative", label: "Creative" },
    { id: "corporate", label: "Corporate" },
    { id: "specialty", label: "Specialty" },
  ];

  const filteredVariants = React.useMemo(() => {
    if (sectionType !== "navbar" || filterCategory === "all") return rawVariants;

    return rawVariants.filter((v) => {
      if (filterCategory === "saas") {
        return ["nav-01", "nav-02", "nav-03", "nav-04", "simple", "mega", "centered"].includes(
          v.id
        );
      }
      if (filterCategory === "creative") {
        return ["nav-05", "nav-06", "nav-07", "sidebar-1"].includes(v.id);
      }
      if (filterCategory === "corporate") {
        return ["nav-08", "nav-09", "nav-12", "sidebar-2"].includes(v.id);
      }
      if (filterCategory === "specialty") {
        return ["nav-10", "nav-11"].includes(v.id);
      }
      return true;
    });
  }, [rawVariants, sectionType, filterCategory]);

  if (!definition) {
    return <div className="p-4 text-xs text-zinc-500">Section definition not found.</div>;
  }

  return (
    <div className="space-y-3">
      {/* 1. Header with Back button, Title & Visibility Toggle */}
      <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/80 p-3 dark:border-white/10 dark:bg-[#161618]">
        <div className="mb-2 flex items-center justify-between border-b border-zinc-200/60 pb-2 dark:border-white/10">
          <button
            type="button"
            onClick={onBack}
            className="group flex items-center gap-1.5 text-xs font-semibold text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>All Sections</span>
          </button>

          {/* Visibility toggle button */}
          <button
            type="button"
            onClick={() => onToggleEnabled(!isEnabled)}
            className={`flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium transition-colors ${
              isEnabled
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                : "bg-zinc-200/70 text-zinc-600 dark:bg-white/10 dark:text-zinc-400"
            }`}
          >
            {isEnabled ? (
              <>
                <Eye className="h-3 w-3" />
                <span>Visible</span>
              </>
            ) : (
              <>
                <EyeOff className="h-3 w-3" />
                <span>Hidden</span>
              </>
            )}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-zinc-900 capitalize dark:text-white">
              {definition.title}
            </span>
            <span className="rounded-full bg-zinc-200/80 px-2 py-0.5 font-mono text-[10px] font-medium text-zinc-600 dark:bg-white/10 dark:text-zinc-300">
              {rawVariants.length} Presets
            </span>
          </div>
          <span className="text-[10px] text-zinc-400">Click to apply</span>
        </div>
      </div>

      {/* Navbar Category Filter Pills */}
      {sectionType === "navbar" && (
        <div className="scrollbar-hide flex items-center gap-1 overflow-x-auto pb-1">
          {navbarCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFilterCategory(cat.id)}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap transition-all ${
                filterCategory === cat.id
                  ? "bg-zinc-900 text-white shadow-2xs dark:bg-white dark:text-zinc-950"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200/80 dark:bg-zinc-800/80 dark:text-zinc-400 dark:hover:bg-zinc-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* 2. Visual Block Cards List (Exact layout as Reference Image) */}
      <div className="space-y-2.5">
        {filteredVariants.map((v) => {
          const isSelected = currentVariant === v.id;

          return (
            <div
              key={v.id}
              role="button"
              tabIndex={0}
              onClick={() => onSelectVariant(v.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onSelectVariant(v.id);
                }
              }}
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const previewHeight = 240;
                const top = Math.min(
                  Math.max(rect.top - 15, 16),
                  window.innerHeight - previewHeight - 20
                );
                onHoverVariant({
                  type: sectionType,
                  title: definition.title,
                  variantId: v.id,
                  variantName: v.name,
                  variantDescription: v.description,
                  top,
                });
              }}
              onMouseLeave={() => onHoverVariant(null)}
              className={`group relative cursor-pointer overflow-hidden rounded-2xl border p-3 transition-all duration-200 ${
                isSelected
                  ? "border-zinc-900 bg-zinc-50/90 shadow-md ring-2 ring-zinc-900/10 dark:border-white/90 dark:bg-[#1a1b1f] dark:ring-white/10"
                  : "border-zinc-200/80 bg-white hover:border-zinc-400 hover:shadow-2xs dark:border-zinc-800 dark:bg-[#161618] dark:hover:border-zinc-700"
              }`}
            >
              {/* Top Row: Title, Variant Badge & Active Status */}
              <div className="flex items-center justify-between pb-1">
                <div className="flex min-w-0 items-center gap-1.5">
                  <span className="truncate text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    {v.name.replace(/NAV-\d+\s*—\s*/, "")}
                  </span>
                  <span className="rounded-full bg-zinc-100 px-2 py-0.5 font-mono text-[9px] font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                    {v.id}
                  </span>
                </div>

                {isSelected && (
                  <span className="flex items-center gap-0.5 rounded-full bg-emerald-500 px-1.5 py-0.5 text-[9px] font-bold text-white shadow-2xs">
                    <Check className="h-2.5 w-2.5 stroke-[3]" />
                    <span>Active</span>
                  </span>
                )}
              </div>

              {/* Schematic Wireframe Preview Canvas */}
              <div className="pt-1">
                <div className="flex items-center justify-center rounded-xl border border-black/[0.04] bg-zinc-100/70 p-2.5 dark:border-white/[0.06] dark:bg-[#0e0f11]">
                  <SectionWireframeSvg type={sectionType} variant={v.id} />
                </div>
              </div>

              {/* Selected Top-Right Corner Accent */}
              {isSelected && (
                <div className="absolute top-0 right-0 h-3 w-3 rounded-bl-lg bg-zinc-900 dark:bg-white" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
