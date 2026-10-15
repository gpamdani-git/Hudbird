import React, { useState } from "react";
import { useThemeEditor } from "./ThemeEditorContext";
import { ThemeExportDialog } from "./ActionMenu";
import { baseColors } from "../../lib/themes";
import { parseOklch, oklchToHex, hexToOklch } from "../../lib/colorUtils";
import { Button, Badge } from "@hudbird/ui";
import { Sparkles, Download, Copy, Check, Code, Palette, SlidersHorizontal } from "lucide-react";

export const PRIMARY_PRESETS = [
  { name: "Violet", color: "0.511 0.262 276.966" },
  { name: "Blue", color: "0.6 0.2 260" },
  { name: "Emerald", color: "0.6 0.15 150" },
  { name: "Rose", color: "0.6 0.2 25" },
  { name: "Amber", color: "0.75 0.2 80" },
  { name: "Orange", color: "0.68 0.21 45" },
  { name: "Cyan", color: "0.65 0.18 220" },
  { name: "Zinc", color: "0.5 0 0" },
];

export const RADIUS_PRESETS = [
  { value: 0, label: "0" },
  { value: 0.25, label: "0.25" },
  { value: 0.5, label: "0.5" },
  { value: 0.75, label: "0.75" },
  { value: 1.0, label: "1.0" },
];

export const ThemeSyncBar: React.FC = () => {
  const {
    primaryColor,
    setPrimaryColor,
    activeBase,
    setActiveBase,
    activeRadius,
    setActiveRadius,
    getTailwindV4ThemeString,
    getFigmaTokensJson,
    setIsExportModalOpen,
  } = useThemeEditor();

  const [copiedTailwind, setCopiedTailwind] = useState(false);
  const [downloadedFigma, setDownloadedFigma] = useState(false);

  const { l, c, h } = parseOklch(primaryColor);
  const currentHex = oklchToHex(l, c, h);

  const handleCopyTailwind = () => {
    navigator.clipboard.writeText(getTailwindV4ThemeString());
    setCopiedTailwind(true);
    setTimeout(() => setCopiedTailwind(false), 2000);
  };

  const handleDownloadFigma = () => {
    const jsonStr = getFigmaTokensJson();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "hudbird-tokens.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadedFigma(true);
    setTimeout(() => setDownloadedFigma(false), 2000);
  };

  return (
    <div
      data-theme-sync-bar
      className="mb-6 rounded-2xl border border-zinc-200/80 bg-white/70 p-4 shadow-sm backdrop-blur-xl transition-all sm:p-5 dark:border-zinc-800/80 dark:bg-zinc-900/70"
    >
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200/60 pb-3.5 dark:border-zinc-800/60">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
            <Palette className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                Theme Token Sync &amp; Exporter
              </h3>
              <Badge variant="soft" color="primary" size="sm">
                Tailwind v4 &amp; Figma DTCG
              </Badge>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Select your color palette and dimensions below to preview changes live and export sync
              tokens.
            </p>
          </div>
        </div>

        {/* Quick Action Export Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyTailwind}
            className="h-8 cursor-pointer gap-1.5 text-xs shadow-2xs"
            title="Copy Tailwind CSS v4 @theme directive block"
          >
            {copiedTailwind ? (
              <Check className="h-3.5 w-3.5 text-emerald-500" />
            ) : (
              <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
            )}
            <span>{copiedTailwind ? "Copied @theme!" : "Copy @theme"}</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadFigma}
            className="h-8 cursor-pointer gap-1.5 text-xs shadow-2xs"
            title="Download Figma Tokens Studio DTCG specification JSON"
          >
            {downloadedFigma ? (
              <Check className="h-3.5 w-3.5 text-emerald-500" />
            ) : (
              <Download className="h-3.5 w-3.5 text-purple-500" />
            )}
            <span>{downloadedFigma ? "Downloaded!" : "Figma JSON"}</span>
          </Button>

          <Button
            variant="solid"
            color="dark"
            size="sm"
            onClick={() => setIsExportModalOpen(true)}
            className="h-8 cursor-pointer gap-1.5 text-xs shadow-xs"
          >
            <Code className="h-3.5 w-3.5" />
            <span>Export Tokens</span>
          </Button>
        </div>
      </div>

      {/* Controls Grid */}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-12 md:items-center">
        {/* Primary Accent Color Presets */}
        <div className="space-y-1.5 md:col-span-5">
          <label className="text-[11px] font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
            Primary Color
          </label>
          <div className="flex flex-wrap items-center gap-2">
            {PRIMARY_PRESETS.map((preset) => {
              const isActive = primaryColor === preset.color;
              const { l: pl, c: pc, h: ph } = parseOklch(preset.color);
              const hexVal = oklchToHex(pl, pc, ph);

              return (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => setPrimaryColor(preset.color)}
                  title={`${preset.name} (${hexVal})`}
                  className={`group relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border transition-all ${
                    isActive
                      ? "scale-110 border-zinc-950 shadow-xs ring-2 ring-zinc-950/20 dark:border-white dark:ring-white/30"
                      : "border-black/10 hover:scale-105 dark:border-white/10"
                  }`}
                  style={{ backgroundColor: hexVal }}
                >
                  {isActive && (
                    <Check
                      className={`h-3 w-3 stroke-[3] ${
                        preset.name === "Amber" || preset.name === "Cyan"
                          ? "text-zinc-950"
                          : "text-white"
                      }`}
                    />
                  )}
                </button>
              );
            })}

            {/* Custom Native Color Picker */}
            <div
              className={`relative flex h-7 cursor-pointer items-center gap-1.5 rounded-full border px-2 text-[11px] font-medium transition-all ${
                !PRIMARY_PRESETS.some((p) => p.color === primaryColor)
                  ? "border-zinc-950 bg-zinc-100 ring-2 ring-zinc-950/20 dark:border-white dark:bg-zinc-800 dark:ring-white/30"
                  : "border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
              }`}
            >
              <input
                type="color"
                value={currentHex}
                onChange={(e) => setPrimaryColor(hexToOklch(e.target.value))}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                aria-label="Pick custom primary color"
              />
              <span
                className="h-3.5 w-3.5 rounded-full border border-black/10 shadow-2xs dark:border-white/10"
                style={{ backgroundColor: currentHex }}
              />
              <span className="text-zinc-700 dark:text-zinc-300">Custom</span>
            </div>
          </div>
        </div>

        {/* Base Neutral Tone Switcher */}
        <div className="space-y-1.5 md:col-span-4">
          <label className="text-[11px] font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
            Neutral Base
          </label>
          <div className="inline-flex rounded-lg border border-zinc-200/80 bg-zinc-100/60 p-0.5 dark:border-zinc-800/80 dark:bg-zinc-900/60">
            {(Object.keys(baseColors) as Array<keyof typeof baseColors>).map((key) => {
              const isActive = activeBase === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveBase(key)}
                  className={`cursor-pointer rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                    isActive
                      ? "bg-white font-semibold text-zinc-950 shadow-2xs dark:bg-zinc-800 dark:text-white"
                      : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                  }`}
                >
                  {baseColors[key].name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Radius Selector */}
        <div className="space-y-1.5 md:col-span-3">
          <label className="text-[11px] font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
            Radius
          </label>
          <div className="inline-flex rounded-lg border border-zinc-200/80 bg-zinc-100/60 p-0.5 dark:border-zinc-800/80 dark:bg-zinc-900/60">
            {RADIUS_PRESETS.map((r) => {
              const isActive = activeRadius === r.value;
              return (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setActiveRadius(r.value)}
                  className={`cursor-pointer rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                    isActive
                      ? "bg-white font-semibold text-zinc-950 shadow-2xs dark:bg-zinc-800 dark:text-white"
                      : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                  }`}
                  title={`${r.value}rem`}
                >
                  {r.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Global Sync Export Dialog */}
      <ThemeExportDialog />
    </div>
  );
};
