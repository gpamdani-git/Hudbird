import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Badge, Button, Input, Select, SelectItem, Switch } from "@hudbird/ui";
import {
  generateTailwindV4ThemeCss,
  generateTokensJson,
  getEffectiveTokens,
  pilotBrands,
  type WebsiteProjectConfig,
} from "@hudbird/marketing";
import type {
  BrandProfile,
  LandingMotionProfile,
  LandingPageConfig,
  WebsiteDesignTokens,
  WebsiteSurfaceBase,
} from "@hudbird/schemas";
import { typographyPresets } from "../../lib/themes";
import { Check, Copy, Download, Monitor, Moon, Palette, RotateCcw, Sun, X } from "lucide-react";
import { BUTTON_PRESS_CLASS, drawerTransition } from "./motionPresets";
import { MediaUploadField } from "./MediaUploadField";

const ACCENT_SWATCHES = [
  { name: "Indigo", hex: "#4f46e5" },
  { name: "Violet", hex: "#7c3aed" },
  { name: "Cobalt", hex: "#2457d6" },
  { name: "Cyan", hex: "#0891b2" },
  { name: "Emerald", hex: "#059669" },
  { name: "Amber", hex: "#d97706" },
  { name: "Rose", hex: "#e11d48" },
  { name: "Obsidian", hex: "#18181b" },
];

const SURFACE_OPTIONS: { id: WebsiteSurfaceBase; label: string; swatch: string }[] = [
  { id: "zinc", label: "Zinc", swatch: "#27272a" },
  { id: "slate", label: "Slate", swatch: "#1e293b" },
  { id: "neutral", label: "Neutral", swatch: "#262626" },
  { id: "stone", label: "Warm Stone", swatch: "#292524" },
  { id: "obsidian", label: "Obsidian Deep", swatch: "#0b0b0f" },
];

const FONT_PAIRINGS = [
  { id: "inter-clean", label: "Modern SaaS (Inter)", heading: "Inter", body: "Inter" },
  {
    id: "jakarta-inter",
    label: "Startup Display (Jakarta + Inter)",
    heading: "Plus Jakarta Sans",
    body: "Inter",
  },
  {
    id: "editorial-serif",
    label: "Editorial (Playfair + Inter)",
    heading: "Playfair Display",
    body: "Inter",
  },
  {
    id: "tech-grotesk",
    label: "Developer Grid (Space Grotesk)",
    heading: "Space Grotesk",
    body: "DM Sans",
  },
];

function calculateLuminance(hex: string) {
  if (!/^#[\da-f]{6}$/i.test(hex)) return 0.5;
  const clean = hex.slice(1);
  const rgb = clean.match(/.{2}/g)!.map((c) => {
    const v = parseInt(c, 16) / 255;
    return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
}

function contrastOnBestForeground(hex: string) {
  const lum = calculateLuminance(hex);
  const vsWhite = (1 + 0.05) / (lum + 0.05);
  const vsBlack = (lum + 0.05) / 0.05;
  const best = Math.max(vsWhite, vsBlack);
  return {
    ratio: best.toFixed(1),
    textColor: vsWhite >= vsBlack ? "White text" : "Dark text",
    passAAA: best >= 7,
    passAA: best >= 4.5,
  };
}

const RAMP_STEPS: readonly { step: string; mixWhite?: number; mixBlack?: number }[] = [
  { step: "50", mixWhite: 0.92 },
  { step: "100", mixWhite: 0.84 },
  { step: "200", mixWhite: 0.68 },
  { step: "300", mixWhite: 0.48 },
  { step: "400", mixWhite: 0.24 },
  { step: "500" },
  { step: "600", mixBlack: 0.14 },
  { step: "700", mixBlack: 0.28 },
  { step: "800", mixBlack: 0.44 },
  { step: "900", mixBlack: 0.6 },
  { step: "950", mixBlack: 0.74 },
];

const MONO_FONT_OPTIONS = [
  "JetBrains Mono",
  "IBM Plex Mono",
  "Fira Code",
  "Source Code Pro",
  "Space Mono",
] as const;

function buildPrimaryRamp(hex: string): { step: string; color: string }[] {
  const valid = /^#[\da-f]{6}$/i.test(hex) ? hex : "#4f46e5";
  const r = parseInt(valid.slice(1, 3), 16);
  const g = parseInt(valid.slice(3, 5), 16);
  const b = parseInt(valid.slice(5, 7), 16);

  const toHex = (nr: number, ng: number, nb: number) =>
    `#${[nr, ng, nb]
      .map((v) =>
        Math.max(0, Math.min(255, Math.round(v)))
          .toString(16)
          .padStart(2, "0")
      )
      .join("")}`;

  return RAMP_STEPS.map(({ step, mixWhite, mixBlack }) => {
    if (mixWhite) {
      return {
        step,
        color: toHex(r + (255 - r) * mixWhite, g + (255 - g) * mixWhite, b + (255 - b) * mixWhite),
      };
    }
    if (mixBlack) {
      return {
        step,
        color: toHex(r * (1 - mixBlack), g * (1 - mixBlack), b * (1 - mixBlack)),
      };
    }
    return { step, color: valid };
  });
}

export interface DesignTokenStudioDrawerProps {
  project: WebsiteProjectConfig;
  onChange: React.Dispatch<React.SetStateAction<WebsiteProjectConfig>>;
  onClose: () => void;
  onThemeModeChange?: (mode: "auto" | "light" | "dark") => void;
  embedded?: boolean;
}

export function DesignTokenStudioDrawer({
  project,
  onChange,
  onClose,
  onThemeModeChange,
  embedded = false,
}: DesignTokenStudioDrawerProps) {
  const reduced = useReducedMotion();
  const [mode, setMode] = React.useState<"simple" | "pro">("simple");
  const [hexDraft, setHexDraft] = React.useState(project.brand.primary);
  const [copiedCss, setCopiedCss] = React.useState(false);
  const [copiedJson, setCopiedJson] = React.useState(false);

  React.useEffect(() => {
    setHexDraft(project.brand.primary);
  }, [project.brand.primary]);

  const tokens = React.useMemo(() => getEffectiveTokens(project), [project]);
  const contrast = React.useMemo(() => contrastOnBestForeground(hexDraft), [hexDraft]);
  const primaryRamp = React.useMemo(() => buildPrimaryRamp(hexDraft), [hexDraft]);

  const allFonts = React.useMemo(
    () => Array.from(new Set([...typographyPresets.heading, ...typographyPresets.sans, "DM Sans"])),
    []
  );

  const updateBrand = (patch: Partial<BrandProfile>) => {
    onChange((prev) => ({
      ...prev,
      brand: { ...prev.brand, ...patch },
    }));
  };

  const updateTokens = (updater: (current: WebsiteDesignTokens) => WebsiteDesignTokens) => {
    onChange((prev) => ({
      ...prev,
      tokens: updater(getEffectiveTokens(prev)),
    }));
  };

  const updateMotion = (patch: Partial<LandingMotionProfile>) => {
    onChange((prev) => ({
      ...prev,
      motion: {
        reveal: prev.motion?.reveal ?? "subtle",
        autoplay: prev.motion?.autoplay ?? true,
        smoothScroll: prev.motion?.smoothScroll ?? true,
        ...patch,
      },
    }));
  };

  const handleCopyThemeCss = async () => {
    const css = generateTailwindV4ThemeCss(project.brand, tokens);
    await navigator.clipboard.writeText(css);
    setCopiedCss(true);
    window.setTimeout(() => setCopiedCss(false), 1800);
  };

  const handleDownloadTokensJson = () => {
    const payload = JSON.stringify(generateTokensJson(project.brand, tokens), null, 2);
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${project.brand.id || "hudbird"}-tokens.json`;
    a.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setCopiedJson(true);
    window.setTimeout(() => setCopiedJson(false), 1800);
  };

  const content = (
    <>
      {!embedded && (
        <div className="flex items-center justify-between gap-2 border-b border-zinc-200/80 px-3.5 py-3 dark:border-white/[0.08]">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 text-primary flex h-7 w-7 items-center justify-center rounded-lg">
              <Palette className="h-3.5 w-3.5" />
            </div>
            <div>
              <div className="text-xs font-bold tracking-tight">Design Tokens</div>
              <div className="text-[10px] text-zinc-500 dark:text-zinc-400">
                Global theme variables
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Design Tokens drawer"
            className={`flex h-7 w-7 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-white/[0.08] dark:hover:text-white ${BUTTON_PRESS_CLASS}`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Mode Switcher: Simple | Pro */}
      <div className="border-b border-zinc-200/80 px-3.5 py-2 dark:border-white/[0.08]">
        <div
          role="group"
          aria-label="Token editing depth"
          className="grid grid-cols-2 gap-1 rounded-xl bg-zinc-100 p-0.5 dark:bg-black/35"
        >
          {(
            [
              { id: "simple", label: "Simple (Presets)" },
              { id: "pro", label: "Pro (Full Tokens)" },
            ] as const
          ).map((item) => {
            const active = mode === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                onClick={() => setMode(item.id)}
                className={`rounded-lg py-1.5 text-[11px] font-semibold ${BUTTON_PRESS_CLASS} ${
                  active
                    ? "bg-white text-zinc-950 shadow-xs dark:bg-[#27272b] dark:text-white"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Body */}
      <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-3.5 py-4">
        {/* Theme Mode (shared in both modes) */}
        <section className="space-y-2">
          <div className="text-[11px] font-semibold text-zinc-500 uppercase dark:text-zinc-400">
            Canvas Appearance
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {(
              [
                { id: "auto", label: "Auto", Icon: Monitor },
                { id: "light", label: "Light", Icon: Sun },
                { id: "dark", label: "Dark", Icon: Moon },
              ] as const
            ).map(({ id, label, Icon }) => {
              const active = project.themeMode === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() =>
                    onThemeModeChange
                      ? onThemeModeChange(id)
                      : onChange((prev) => ({ ...prev, themeMode: id }))
                  }
                  className={`flex items-center justify-center gap-1.5 rounded-xl border py-2 text-[11px] font-semibold ${BUTTON_PRESS_CLASS} ${
                    active
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-zinc-200/80 text-zinc-600 hover:bg-zinc-50 dark:border-white/[0.08] dark:text-zinc-300 dark:hover:bg-white/[0.04]"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </button>
              );
            })}
          </div>
        </section>

        {/* Accent Color & Contrast Guard */}
        <section className="space-y-2.5 rounded-xl border border-zinc-200/80 bg-zinc-50/70 p-3 dark:border-white/[0.08] dark:bg-white/[0.02]">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-200">
              Primary Accent
            </span>
            <Badge size="sm" variant="flat" color={contrast.passAA ? "success" : "warning"}>
              {contrast.ratio}:1 · {contrast.passAAA ? "AAA" : contrast.passAA ? "AA" : "Low"}
            </Badge>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {ACCENT_SWATCHES.map((swatch) => {
              const selected = project.brand.primary.toLowerCase() === swatch.hex.toLowerCase();
              return (
                <button
                  key={swatch.hex}
                  type="button"
                  title={swatch.name}
                  onClick={() => {
                    setHexDraft(swatch.hex);
                    updateBrand({ primary: swatch.hex });
                  }}
                  className={`flex h-7 w-7 items-center justify-center rounded-lg border ${BUTTON_PRESS_CLASS} ${
                    selected
                      ? "ring-primary ring-2 ring-offset-2 dark:ring-offset-[#161618]"
                      : "border-black/10 dark:border-white/10"
                  }`}
                  style={{ backgroundColor: swatch.hex }}
                >
                  {selected && <Check className="h-3.5 w-3.5 text-white drop-shadow" />}
                </button>
              );
            })}
            <label className="relative flex h-7 w-7 cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-zinc-300 dark:border-white/20">
              <input
                type="color"
                aria-label="Custom accent color picker"
                value={/^#[\da-f]{6}$/i.test(hexDraft) ? hexDraft : "#4f46e5"}
                onChange={(e) => {
                  setHexDraft(e.target.value);
                  updateBrand({ primary: e.target.value });
                }}
                className="h-10 w-10 cursor-pointer border-0 bg-transparent p-0"
              />
            </label>
          </div>
          <Input
            size="sm"
            aria-label="Accent HEX code"
            value={hexDraft}
            isInvalid={!/^#[\da-f]{6}$/i.test(hexDraft)}
            onChange={(e) => {
              setHexDraft(e.target.value);
              if (/^#[\da-f]{6}$/i.test(e.target.value)) {
                updateBrand({ primary: e.target.value });
              }
            }}
          />
          <div className="flex items-center justify-between text-[10px] text-zinc-500 dark:text-zinc-400">
            <span>
              Auto foreground: <strong>{contrast.textColor}</strong>
            </span>
            <Badge
              size="sm"
              variant="soft"
              color={contrast.passAAA || contrast.passAA ? "success" : "warning"}
            >
              {contrast.ratio}:1 {contrast.passAAA ? "AAA" : contrast.passAA ? "AA" : "Low"}
            </Badge>
          </div>
          <div className="space-y-1 pt-1">
            <div className="flex items-center justify-between text-[10px] text-zinc-500 dark:text-zinc-400">
              <span>50-950 scale preview</span>
              <span className="font-mono">{hexDraft.toUpperCase()}</span>
            </div>
            <div className="grid grid-cols-11 gap-0.5 overflow-hidden rounded-lg border border-zinc-200/80 p-0.5 dark:border-white/[0.08]">
              {primaryRamp.map((swatch) => (
                <div
                  key={swatch.step}
                  title={`${swatch.step}: ${swatch.color}`}
                  className="h-3.5 rounded-[3px]"
                  style={{ backgroundColor: swatch.color }}
                />
              ))}
            </div>
          </div>
        </section>

        {mode === "simple" ? (
          <>
            {/* Simple Mode: Brand Presets */}
            <section className="space-y-2">
              <div className="text-[11px] font-semibold text-zinc-500 uppercase dark:text-zinc-400">
                Brand Presets
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {pilotBrands.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => updateBrand({ ...preset })}
                    className={`flex items-center gap-2 rounded-xl border px-2.5 py-2 text-left text-xs font-medium ${BUTTON_PRESS_CLASS} ${
                      project.brand.id === preset.id
                        ? "border-primary bg-primary/10 text-zinc-950 dark:text-white"
                        : "border-zinc-200/80 text-zinc-700 hover:bg-zinc-50 dark:border-white/[0.08] dark:text-zinc-300 dark:hover:bg-white/[0.04]"
                    }`}
                  >
                    <span
                      className="h-3 w-3 shrink-0 rounded-full"
                      style={{ backgroundColor: preset.primary }}
                    />
                    <span className="truncate">{preset.name}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Simple Mode: Font Pairing Presets */}
            <section className="space-y-2">
              <div className="text-[11px] font-semibold text-zinc-500 uppercase dark:text-zinc-400">
                Curated Font Pairings
              </div>
              <div className="space-y-1.5">
                {FONT_PAIRINGS.map((pair) => {
                  const active =
                    tokens.typography?.headingGoogleFont === pair.heading &&
                    tokens.typography?.bodyGoogleFont === pair.body;
                  return (
                    <button
                      key={pair.id}
                      type="button"
                      onClick={() => {
                        const headingStack = `"${pair.heading}", ${
                          ["Lora", "Playfair Display"].includes(pair.heading)
                            ? "Georgia, serif"
                            : "system-ui, sans-serif"
                        }`;
                        const bodyStack = `"${pair.body}", system-ui, sans-serif`;
                        updateBrand({ googleFont: pair.heading, fontFamily: bodyStack });
                        updateTokens((curr) => ({
                          ...curr,
                          typography: {
                            ...curr.typography,
                            headingFont: headingStack,
                            headingGoogleFont: pair.heading,
                            bodyFont: bodyStack,
                            bodyGoogleFont: pair.body,
                          },
                        }));
                      }}
                      className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left text-xs ${BUTTON_PRESS_CLASS} ${
                        active
                          ? "border-primary bg-primary/10 font-semibold text-zinc-950 dark:text-white"
                          : "border-zinc-200/80 text-zinc-700 hover:bg-zinc-50 dark:border-white/[0.08] dark:text-zinc-300 dark:hover:bg-white/[0.04]"
                      }`}
                    >
                      <span>{pair.label}</span>
                      {active && <Check className="text-primary h-3.5 w-3.5" />}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Simple Mode: Brand Name & Radius / Density */}
            <section className="space-y-3">
              <Input
                size="sm"
                label="Brand name"
                value={project.brand.name}
                onChange={(e) => updateBrand({ name: e.target.value })}
              />
              <MediaUploadField
                label="Brand Logo (Light & Dark)"
                src={project.brand.logo?.src ?? ""}
                darkSrc={project.brand.logo?.darkSrc}
                alt={project.brand.logo?.alt ?? `${project.brand.name} logo`}
                showAlt
                placeholderUrl="/assets/logo.svg or https://..."
                onChange={(patch) =>
                  updateBrand({
                    logo: (() => {
                      const nextSrc =
                        patch.src !== undefined ? patch.src : (project.brand.logo?.src ?? "");
                      const nextDark =
                        patch.darkSrc !== undefined ? patch.darkSrc : project.brand.logo?.darkSrc;
                      const nextAlt =
                        patch.alt !== undefined
                          ? patch.alt
                          : (project.brand.logo?.alt ?? `${project.brand.name} logo`);
                      if (!nextSrc && !nextDark) return undefined;
                      return {
                        src: nextSrc || nextDark || "",
                        ...(nextDark ? { darkSrc: nextDark } : {}),
                        alt: nextAlt,
                      };
                    })(),
                  })
                }
                onClear={() => updateBrand({ logo: undefined })}
              />
              <Select
                size="sm"
                label="Corner Radius Style"
                value={project.brand.radius}
                onValueChange={(radius) => {
                  const r = radius as BrandProfile["radius"];
                  const radiusPx = { square: 0, soft: 12, round: 24 }[r];
                  updateBrand({ radius: r });
                  updateTokens((curr) => ({
                    ...curr,
                    shape: { ...curr.shape, radiusPx },
                  }));
                }}
              >
                <SelectItem value="square">Sharp / Square (0px)</SelectItem>
                <SelectItem value="soft">Soft Rounded (12px)</SelectItem>
                <SelectItem value="round">Pill / Round (24px)</SelectItem>
              </Select>
              <Select
                size="sm"
                label="Section Rhythm"
                value={project.brand.density}
                onValueChange={(density) => {
                  const d = density as BrandProfile["density"];
                  updateBrand({ density: d });
                  updateTokens((curr) => ({
                    ...curr,
                    spacing: {
                      ...curr.spacing,
                      sectionPadding: d === "compact" ? "compact" : "comfortable",
                    },
                  }));
                }}
              >
                <SelectItem value="comfortable">Comfortable</SelectItem>
                <SelectItem value="compact">Compact</SelectItem>
              </Select>
            </section>
          </>
        ) : (
          <>
            {/* Pro Mode: Surface Base & Secondary / Semantic Colors */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-zinc-500 uppercase dark:text-zinc-400">
                  Surfaces &amp; Semantic Palette
                </span>
                <button
                  type="button"
                  onClick={() =>
                    onChange((prev) => ({
                      ...prev,
                      tokens: undefined,
                    }))
                  }
                  className="inline-flex items-center gap-1 text-[10px] font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                >
                  <RotateCcw className="h-2.5 w-2.5" />
                  Reset tokens
                </button>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {SURFACE_OPTIONS.map((surf) => {
                  const active = (tokens.surfaceBase ?? "zinc") === surf.id;
                  return (
                    <button
                      key={surf.id}
                      type="button"
                      title={surf.label}
                      onClick={() => updateTokens((curr) => ({ ...curr, surfaceBase: surf.id }))}
                      className={`flex flex-col items-center gap-1 rounded-xl border p-1.5 text-[9px] font-medium ${BUTTON_PRESS_CLASS} ${
                        active
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-zinc-200/80 text-zinc-500 hover:bg-zinc-50 dark:border-white/[0.08] dark:hover:bg-white/[0.04]"
                      }`}
                    >
                      <span
                        className="h-4 w-4 rounded-full border border-white/20"
                        style={{ backgroundColor: surf.swatch }}
                      />
                      <span className="truncate">{surf.label.split(" ")[0]}</span>
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <label className="space-y-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                  <span>Secondary Color</span>
                  <div className="flex items-center gap-1.5 rounded-lg border border-zinc-200/80 px-2 py-1 dark:border-white/[0.08]">
                    <input
                      type="color"
                      value={tokens.secondaryColor ?? "#6366f1"}
                      onChange={(e) =>
                        updateTokens((curr) => ({ ...curr, secondaryColor: e.target.value }))
                      }
                      className="h-5 w-5 cursor-pointer border-0 bg-transparent p-0"
                    />
                    <span className="font-mono text-[10px]">
                      {(tokens.secondaryColor ?? "#6366f1").toUpperCase()}
                    </span>
                  </div>
                </label>
                <label className="space-y-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                  <span>Success Token</span>
                  <div className="flex items-center gap-1.5 rounded-lg border border-zinc-200/80 px-2 py-1 dark:border-white/[0.08]">
                    <input
                      type="color"
                      value={tokens.semantic?.success ?? "#10b981"}
                      onChange={(e) =>
                        updateTokens((curr) => ({
                          ...curr,
                          semantic: { ...curr.semantic, success: e.target.value },
                        }))
                      }
                      className="h-5 w-5 cursor-pointer border-0 bg-transparent p-0"
                    />
                    <span className="font-mono text-[10px]">
                      {(tokens.semantic?.success ?? "#10b981").toUpperCase()}
                    </span>
                  </div>
                </label>
                <label className="space-y-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                  <span>Warning Token</span>
                  <div className="flex items-center gap-1.5 rounded-lg border border-zinc-200/80 px-2 py-1 dark:border-white/[0.08]">
                    <input
                      type="color"
                      value={tokens.semantic?.warning ?? "#f59e0b"}
                      onChange={(e) =>
                        updateTokens((curr) => ({
                          ...curr,
                          semantic: { ...curr.semantic, warning: e.target.value },
                        }))
                      }
                      className="h-5 w-5 cursor-pointer border-0 bg-transparent p-0"
                    />
                    <span className="font-mono text-[10px]">
                      {(tokens.semantic?.warning ?? "#f59e0b").toUpperCase()}
                    </span>
                  </div>
                </label>
                <label className="space-y-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                  <span>Danger Token</span>
                  <div className="flex items-center gap-1.5 rounded-lg border border-zinc-200/80 px-2 py-1 dark:border-white/[0.08]">
                    <input
                      type="color"
                      value={tokens.semantic?.danger ?? "#ef4444"}
                      onChange={(e) =>
                        updateTokens((curr) => ({
                          ...curr,
                          semantic: { ...curr.semantic, danger: e.target.value },
                        }))
                      }
                      className="h-5 w-5 cursor-pointer border-0 bg-transparent p-0"
                    />
                    <span className="font-mono text-[10px]">
                      {(tokens.semantic?.danger ?? "#ef4444").toUpperCase()}
                    </span>
                  </div>
                </label>
              </div>

              {/* Pro Mode: Custom Surface CSS Variables (--hb-bg, --hb-surface, --hb-ink, --hb-muted, --hb-border) */}
              <div className="space-y-2 border-t border-zinc-200/80 pt-3 dark:border-white/[0.08]">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-zinc-700 dark:text-zinc-200">
                    Surface Token Overrides
                  </span>
                  {tokens.customColors && Object.values(tokens.customColors).some(Boolean) && (
                    <button
                      type="button"
                      onClick={() => updateTokens((curr) => ({ ...curr, customColors: undefined }))}
                      className="text-[10px] font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                    >
                      Clear overrides
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {(
                    [
                      { key: "bg", label: "--hb-bg", fallback: "#ffffff" },
                      { key: "surface", label: "--hb-surface", fallback: "#f4f4f5" },
                      { key: "ink", label: "--hb-ink", fallback: "#18181b" },
                      { key: "muted", label: "--hb-muted", fallback: "#71717a" },
                      { key: "border", label: "--hb-border", fallback: "#e4e4e7" },
                    ] as const
                  ).map(({ key, label, fallback }) => {
                    const currentVal = tokens.customColors?.[key];
                    return (
                      <label
                        key={key}
                        className="space-y-1 text-[11px] text-zinc-500 dark:text-zinc-400"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-mono text-[10px]">{label}</span>
                          {currentVal && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                updateTokens((curr) => {
                                  const next = { ...(curr.customColors ?? {}) };
                                  delete next[key];
                                  return {
                                    ...curr,
                                    customColors: Object.keys(next).length > 0 ? next : undefined,
                                  };
                                });
                              }}
                              className="text-[9px] text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                            >
                              Reset
                            </button>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 rounded-lg border border-zinc-200/80 px-2 py-1 dark:border-white/[0.08]">
                          <input
                            type="color"
                            value={
                              currentVal && /^#[\da-f]{6}$/i.test(currentVal)
                                ? currentVal
                                : fallback
                            }
                            onChange={(e) =>
                              updateTokens((curr) => ({
                                ...curr,
                                customColors: {
                                  ...curr.customColors,
                                  [key]: e.target.value,
                                },
                              }))
                            }
                            className="h-5 w-5 cursor-pointer border-0 bg-transparent p-0"
                          />
                          <span className="truncate font-mono text-[10px]">
                            {currentVal ? currentVal.toUpperCase() : "Auto"}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Pro Mode: Typography Scale */}
            <section className="space-y-2.5 border-t border-zinc-200/80 pt-3 dark:border-white/[0.08]">
              <div className="text-[11px] font-semibold text-zinc-500 uppercase dark:text-zinc-400">
                Typography System
              </div>
              <Select
                size="sm"
                label="Heading Font"
                value={tokens.typography?.headingGoogleFont ?? project.brand.googleFont ?? "Inter"}
                onValueChange={(font) => {
                  const stack = `"${font}", ${
                    ["Lora", "Playfair Display"].includes(font)
                      ? "Georgia, serif"
                      : "system-ui, sans-serif"
                  }`;
                  updateTokens((curr) => ({
                    ...curr,
                    typography: {
                      ...curr.typography,
                      headingFont: stack,
                      headingGoogleFont: font,
                    },
                  }));
                }}
              >
                {allFonts.map((font) => (
                  <SelectItem key={font} value={font}>
                    {font}
                  </SelectItem>
                ))}
              </Select>
              <Select
                size="sm"
                label="Body Font"
                value={tokens.typography?.bodyGoogleFont ?? project.brand.googleFont ?? "Inter"}
                onValueChange={(font) => {
                  const stack = `"${font}", system-ui, sans-serif`;
                  updateBrand({ googleFont: font, fontFamily: stack });
                  updateTokens((curr) => ({
                    ...curr,
                    typography: {
                      ...curr.typography,
                      bodyFont: stack,
                      bodyGoogleFont: font,
                    },
                  }));
                }}
              >
                {allFonts.map((font) => (
                  <SelectItem key={font} value={font}>
                    {font}
                  </SelectItem>
                ))}
              </Select>
              <Select
                size="sm"
                label="Monospace Font"
                value={tokens.typography?.monoGoogleFont ?? "JetBrains Mono"}
                onValueChange={(font) =>
                  updateTokens((curr) => ({
                    ...curr,
                    typography: {
                      ...curr.typography,
                      monoFont: `"${font}", ui-monospace, monospace`,
                      monoGoogleFont: font,
                    },
                  }))
                }
              >
                {MONO_FONT_OPTIONS.map((font) => (
                  <SelectItem key={font} value={font}>
                    {font}
                  </SelectItem>
                ))}
              </Select>
              <div className="grid grid-cols-2 gap-2">
                <Select
                  size="sm"
                  label="Scale"
                  value={tokens.typography?.scale ?? "default"}
                  onValueChange={(scale) =>
                    updateTokens((curr) => ({
                      ...curr,
                      typography: {
                        ...curr.typography,
                        scale: scale as "compact" | "default" | "expressive",
                      },
                    }))
                  }
                >
                  <SelectItem value="compact">Compact (0.94x)</SelectItem>
                  <SelectItem value="default">Default (1.0x)</SelectItem>
                  <SelectItem value="expressive">Expressive (1.07x)</SelectItem>
                </Select>
                <Select
                  size="sm"
                  label="Tracking"
                  value={tokens.typography?.tracking ?? "normal"}
                  onValueChange={(tracking) =>
                    updateTokens((curr) => ({
                      ...curr,
                      typography: {
                        ...curr.typography,
                        tracking: tracking as "tight" | "normal" | "wide",
                      },
                    }))
                  }
                >
                  <SelectItem value="tight">Tight (-0.04em)</SelectItem>
                  <SelectItem value="normal">Normal (-0.025em)</SelectItem>
                  <SelectItem value="wide">Wide (-0.01em)</SelectItem>
                </Select>
              </div>
            </section>

            {/* Pro Mode: Shape, Borders & Container Width */}
            <section className="space-y-3 border-t border-zinc-200/80 pt-3 dark:border-white/[0.08]">
              <div className="text-[11px] font-semibold text-zinc-500 uppercase dark:text-zinc-400">
                Shape, Spacing &amp; Motion
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-zinc-600 dark:text-zinc-300">Radius</span>
                  <span className="font-mono font-semibold tabular-nums">
                    {tokens.shape?.radiusPx ?? 12}px
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={28}
                  step={2}
                  aria-label="Global corner radius slider"
                  value={tokens.shape?.radiusPx ?? 12}
                  onChange={(e) => {
                    const px = Number(e.target.value);
                    updateTokens((curr) => ({
                      ...curr,
                      shape: { ...curr.shape, radiusPx: px },
                    }));
                  }}
                  className="accent-primary w-full cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Select
                  size="sm"
                  label="Borders"
                  value={tokens.shape?.borderStyle ?? "subtle"}
                  onValueChange={(borderStyle) =>
                    updateTokens((curr) => ({
                      ...curr,
                      shape: {
                        ...curr.shape,
                        borderStyle: borderStyle as "subtle" | "crisp" | "hairline",
                      },
                    }))
                  }
                >
                  <SelectItem value="hairline">Hairline</SelectItem>
                  <SelectItem value="subtle">Subtle</SelectItem>
                  <SelectItem value="crisp">Crisp</SelectItem>
                </Select>
                <Select
                  size="sm"
                  label="Elevation"
                  value={tokens.shape?.elevation ?? "soft"}
                  onValueChange={(elevation) =>
                    updateTokens((curr) => ({
                      ...curr,
                      shape: {
                        ...curr.shape,
                        elevation: elevation as "flat" | "soft" | "layered",
                      },
                    }))
                  }
                >
                  <SelectItem value="flat">Flat</SelectItem>
                  <SelectItem value="soft">Soft Shadow</SelectItem>
                  <SelectItem value="layered">Layered</SelectItem>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Select
                  size="sm"
                  label="Container Width"
                  value={tokens.spacing?.containerWidth ?? "standard"}
                  onValueChange={(containerWidth) =>
                    updateTokens((curr) => ({
                      ...curr,
                      spacing: {
                        ...curr.spacing,
                        containerWidth: containerWidth as "narrow" | "standard" | "wide" | "full",
                      },
                    }))
                  }
                >
                  <SelectItem value="narrow">Narrow (62rem)</SelectItem>
                  <SelectItem value="standard">Standard (80rem)</SelectItem>
                  <SelectItem value="wide">Wide (90rem)</SelectItem>
                  <SelectItem value="full">Full Bleed</SelectItem>
                </Select>
                <Select
                  size="sm"
                  label="Section Pad"
                  value={tokens.spacing?.sectionPadding ?? "comfortable"}
                  onValueChange={(sectionPadding) =>
                    updateTokens((curr) => ({
                      ...curr,
                      spacing: {
                        ...curr.spacing,
                        sectionPadding: sectionPadding as "compact" | "comfortable" | "spacious",
                      },
                    }))
                  }
                >
                  <SelectItem value="compact">Compact</SelectItem>
                  <SelectItem value="comfortable">Comfortable</SelectItem>
                  <SelectItem value="spacious">Spacious</SelectItem>
                </Select>
              </div>

              <div className="space-y-2 rounded-xl border border-zinc-200/80 p-2.5 dark:border-white/[0.08]">
                <div className="flex items-center justify-between text-xs">
                  <span>Scroll reveal motion</span>
                  <Switch
                    size="sm"
                    checked={(project.motion?.reveal ?? "subtle") === "subtle"}
                    onChange={(e) => updateMotion({ reveal: e.target.checked ? "subtle" : "off" })}
                  />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span>Smooth anchor scrolling</span>
                  <Switch
                    size="sm"
                    checked={project.motion?.smoothScroll ?? true}
                    onChange={(e) => updateMotion({ smoothScroll: e.target.checked })}
                  />
                </div>
              </div>
            </section>
          </>
        )}
      </div>

      {/* Footer Export Actions */}
      <div className="grid grid-cols-2 gap-2 border-t border-zinc-200/80 bg-zinc-50/80 px-3.5 py-2.5 dark:border-white/[0.08] dark:bg-[#141416]">
        <button
          type="button"
          onClick={handleCopyThemeCss}
          className={`inline-flex h-8 items-center justify-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-2.5 text-[11px] font-semibold text-zinc-800 hover:bg-zinc-50 dark:border-white/[0.1] dark:bg-[#1e1e22] dark:text-zinc-100 dark:hover:bg-white/[0.08] ${BUTTON_PRESS_CLASS}`}
        >
          {copiedCss ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-500" />
              <span>Copied @theme</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-zinc-400" />
              <span>Copy @theme</span>
            </>
          )}
        </button>

        <Button
          size="sm"
          color="primary"
          className="h-8 rounded-xl text-[11px] font-semibold"
          onClick={handleDownloadTokensJson}
        >
          {copiedJson ? (
            <>
              <Check className="mr-1 h-3.5 w-3.5" />
              Downloaded
            </>
          ) : (
            <>
              <Download className="mr-1 h-3.5 w-3.5" />
              tokens.json
            </>
          )}
        </Button>
      </div>
    </>
  );

  if (embedded) {
    return <div className="flex h-full min-h-0 flex-col">{content}</div>;
  }

  return (
    <motion.aside
      aria-label="Design Token Studio"
      initial={reduced ? { opacity: 0 } : { opacity: 0, x: "100%" }}
      animate={reduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, x: "100%" }}
      transition={drawerTransition(reduced)}
      className="fixed top-16 right-3 bottom-3 z-30 flex w-[calc(100vw-24px)] max-w-[336px] flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/95 text-zinc-900 shadow-2xl backdrop-blur-xl sm:right-4 sm:bottom-4 dark:border-white/[0.08] dark:bg-[#161618]/95 dark:text-zinc-100"
    >
      {content}
    </motion.aside>
  );
}
