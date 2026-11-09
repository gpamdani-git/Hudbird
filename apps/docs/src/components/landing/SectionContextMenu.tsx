"use client";
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import type { LandingSectionType } from "@hudbird/schemas";
import { landingSectionRegistry } from "@hudbird/marketing";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Sliders,
  Sparkles,
  X,
  Layers,
} from "lucide-react";
import { SectionWireframeSvg } from "./SectionWireframeSvg";

export interface SectionContextMenuProps {
  isOpen: boolean;
  sectionType: LandingSectionType | null;
  position: { x: number; y: number };
  currentVariant: string;
  isEnabled: boolean;
  onSelectVariant: (type: LandingSectionType, variantId: string) => void;
  onOpenInspector: (type: LandingSectionType) => void;
  onToggleEnabled: (type: LandingSectionType) => void;
  onMoveOrder: (type: LandingSectionType, direction: "up" | "down") => void;
  onClose: () => void;
}

export function SectionContextMenu({
  isOpen,
  sectionType,
  position,
  currentVariant,
  isEnabled,
  onSelectVariant,
  onOpenInspector,
  onToggleEnabled,
  onMoveOrder,
  onClose,
}: SectionContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on Escape or click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const handlePointerDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("pointerdown", handlePointerDown, { capture: true });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("pointerdown", handlePointerDown, { capture: true });
    };
  }, [isOpen, onClose]);

  if (!isOpen || !sectionType) return null;

  const definition = landingSectionRegistry.find((s) => s.type === sectionType);
  if (!definition) return null;

  const allVariants = [...definition.variants, ...(definition.additionalVariants ?? [])];

  // Smart position clamping to avoid clipping off viewport
  const menuWidth = 320;
  const menuHeight = 440;
  const padding = 16;

  let left = position.x;
  let top = position.y;

  if (typeof window !== "undefined") {
    if (left + menuWidth > window.innerWidth - padding) {
      left = Math.max(padding, left - menuWidth);
    }
    if (top + menuHeight > window.innerHeight - padding) {
      top = Math.max(padding, window.innerHeight - menuHeight - padding);
    }
  }

  return ReactDOM.createPortal(
    <div
      ref={menuRef}
      style={{ left: `${left}px`, top: `${top}px` }}
      className="animate-in fade-in zoom-in-95 fixed z-[999999] flex w-80 flex-col overflow-hidden rounded-2xl border border-zinc-200/90 bg-white/95 text-zinc-900 shadow-2xl backdrop-blur-2xl duration-150 select-none dark:border-white/[0.12] dark:bg-[#18181b]/95 dark:text-zinc-100"
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* 1. Header with Section Name & Close Button */}
      <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-50/90 px-3.5 py-2.5 dark:border-white/[0.08] dark:bg-white/[0.03]">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-950">
            <Layers className="h-3.5 w-3.5" />
          </div>
          <div className="min-w-0">
            <div className="truncate text-xs font-bold text-zinc-900 capitalize dark:text-white">
              {definition.title} Section
            </div>
            <div className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400">
              Active:{" "}
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {currentVariant}
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-200/60 hover:text-zinc-700 dark:text-zinc-500 dark:hover:bg-white/10 dark:hover:text-zinc-200"
          aria-label="Close context menu"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* 2. Quick Action Toolbar */}
      <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-50/50 px-3 py-1.5 dark:border-white/[0.06] dark:bg-white/[0.01]">
        <button
          type="button"
          onClick={() => {
            onOpenInspector(sectionType);
            onClose();
          }}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-semibold text-zinc-700 hover:bg-zinc-200/60 dark:text-zinc-300 dark:hover:bg-white/10"
        >
          <Sliders className="h-3 w-3 text-zinc-500" />
          <span>Open Inspector</span>
        </button>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onMoveOrder(sectionType, "up")}
            title="Move Section Up"
            className="rounded p-1 text-zinc-500 hover:bg-zinc-200/60 dark:text-zinc-400 dark:hover:bg-white/10"
          >
            <ChevronUp className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onMoveOrder(sectionType, "down")}
            title="Move Section Down"
            className="rounded p-1 text-zinc-500 hover:bg-zinc-200/60 dark:text-zinc-400 dark:hover:bg-white/10"
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          <div className="mx-0.5 h-3 w-px bg-zinc-200 dark:bg-white/10" />
          <button
            type="button"
            onClick={() => onToggleEnabled(sectionType)}
            title={isEnabled ? "Hide section" : "Show section"}
            className="flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium text-zinc-500 hover:bg-zinc-200/60 dark:text-zinc-400 dark:hover:bg-white/10"
          >
            {isEnabled ? (
              <Eye className="h-3 w-3 text-emerald-500" />
            ) : (
              <EyeOff className="h-3 w-3 text-zinc-400" />
            )}
            <span>{isEnabled ? "Visible" : "Hidden"}</span>
          </button>
        </div>
      </div>

      {/* 3. Variant Switcher List */}
      <div className="px-2 pt-2 pb-1">
        <span className="px-1.5 font-mono text-[10px] font-bold tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
          Select Variant ({allVariants.length})
        </span>
      </div>

      <div className="max-h-64 space-y-1 overflow-y-auto overscroll-contain px-2 pb-2">
        {allVariants.map((v) => {
          const isSelected = currentVariant === v.id;
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => {
                onSelectVariant(sectionType, v.id);
                onClose();
              }}
              className={`group flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-left transition-all ${
                isSelected
                  ? "bg-zinc-900 font-semibold text-white shadow-xs dark:bg-white dark:text-zinc-950"
                  : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-white/[0.08] dark:hover:text-white"
              }`}
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <div
                  className={`flex h-6 w-9 shrink-0 items-center justify-center rounded-md border p-0.5 ${
                    isSelected
                      ? "border-white/20 bg-white/10 dark:border-black/20 dark:bg-black/10"
                      : "border-black/[0.06] bg-zinc-100 dark:border-white/[0.08] dark:bg-zinc-800"
                  }`}
                >
                  <SectionWireframeSvg type={sectionType} variant={v.id} />
                </div>
                <div className="min-w-0">
                  <div className="truncate text-xs">{v.name.replace(/NAV-\d+\s*—\s*/, "")}</div>
                  <div
                    className={`font-mono text-[10px] ${
                      isSelected
                        ? "text-white/70 dark:text-zinc-600"
                        : "text-zinc-400 dark:text-zinc-500"
                    }`}
                  >
                    {v.id}
                  </div>
                </div>
              </div>

              {isSelected && (
                <Check className="h-3.5 w-3.5 shrink-0 stroke-[3] text-emerald-400 dark:text-emerald-600" />
              )}
            </button>
          );
        })}
      </div>
    </div>,
    document.body
  );
}
