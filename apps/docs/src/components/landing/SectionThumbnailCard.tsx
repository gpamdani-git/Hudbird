"use client";
import * as React from "react";
import type { LandingSectionSelection } from "@hudbird/schemas";
import { Eye, EyeOff, ArrowUp, ArrowDown } from "lucide-react";
import { SectionWireframeSvg } from "./SectionWireframeSvg";

export interface SectionThumbnailCardProps {
  selection: LandingSectionSelection;
  index: number;
  totalSections: number;
  isSelected: boolean;
  onSelect: () => void;
  onToggleEnabled: (enabled: boolean) => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

export function SectionThumbnailCard({
  selection,
  index,
  totalSections,
  isSelected,
  onSelect,
  onToggleEnabled,
  onMoveUp,
  onMoveDown,
}: SectionThumbnailCardProps) {
  const isFixed = selection.type === "navbar" || selection.type === "footer";

  return (
    <div
      onClick={onSelect}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl border p-3 transition-all duration-200 ${
        isSelected
          ? "border-zinc-900 bg-zinc-50/90 shadow-md ring-2 ring-zinc-900/10 dark:border-white/90 dark:bg-[#1a1b1f] dark:ring-white/10"
          : selection.enabled
            ? "border-zinc-200/80 bg-white hover:border-zinc-400 hover:shadow-2xs dark:border-zinc-800 dark:bg-[#161618] dark:hover:border-zinc-700"
            : "border-dashed border-zinc-200 bg-zinc-50/50 opacity-40 dark:border-zinc-800 dark:bg-[#141416]/50"
      }`}
    >
      {/* Top Bar: Title, Variant Badge & Actions */}
      <div className="flex items-center justify-between pb-1">
        <div className="flex min-w-0 items-center gap-1.5">
          <span className="truncate text-xs font-bold text-zinc-900 capitalize dark:text-zinc-100">
            {selection.type.replace(/-/g, " ")}
          </span>
          <span className="truncate rounded-full bg-zinc-100 px-2 py-0.5 font-mono text-[9px] font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
            {selection.variant}
          </span>
        </div>

        {/* Quick Icon Actions */}
        <div className="flex shrink-0 items-center gap-1" onClick={(e) => e.stopPropagation()}>
          {!isFixed && onMoveUp && (
            <button
              type="button"
              disabled={index <= 1}
              onClick={onMoveUp}
              aria-label="Move up"
              className="p-1 text-zinc-400 hover:text-zinc-800 disabled:opacity-20 dark:hover:text-zinc-200"
            >
              <ArrowUp className="h-3 w-3" />
            </button>
          )}
          {!isFixed && onMoveDown && (
            <button
              type="button"
              disabled={index >= totalSections - 2}
              onClick={onMoveDown}
              aria-label="Move down"
              className="p-1 text-zinc-400 hover:text-zinc-800 disabled:opacity-20 dark:hover:text-zinc-200"
            >
              <ArrowDown className="h-3 w-3" />
            </button>
          )}
          <button
            type="button"
            onClick={() => onToggleEnabled(!selection.enabled)}
            aria-label={selection.enabled ? "Hide section" : "Show section"}
            className="p-1 text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
          >
            {selection.enabled ? (
              <Eye className="h-3.5 w-3.5" />
            ) : (
              <EyeOff className="h-3.5 w-3.5 text-zinc-500" />
            )}
          </button>
        </div>
      </div>

      {/* Wireframe Preview Canvas */}
      <div className="pt-1">
        <div className="flex items-center justify-center rounded-xl border border-black/[0.04] bg-zinc-100/70 p-2.5 dark:border-white/[0.06] dark:bg-[#0e0f11]">
          <SectionWireframeSvg type={selection.type} variant={selection.variant} />
        </div>
      </div>

      {/* Selected Indicator Corner Accent (Matches Reference Image) */}
      {isSelected && (
        <div className="absolute top-0 right-0 h-3 w-3 rounded-bl-lg bg-zinc-900 dark:bg-white" />
      )}
    </div>
  );
}
