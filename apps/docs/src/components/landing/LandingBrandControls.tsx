import * as React from "react";
import { Button, Grid, Input, Select, SelectItem } from "@hudbird/ui";
import type { BrandProfile, LandingPageConfig } from "@hudbird/schemas";
import { pilotBrands } from "@hudbird/marketing";
import { typographyPresets } from "../../lib/themes";
import { Copy, Check, Palette, Sparkles, Sliders, Type, Box, Sun, Moon } from "lucide-react";

const ACCENT_SWATCHES = [
  { name: "Indigo", hex: "#4f46e5" },
  { name: "Violet", hex: "#7c3aed" },
  { name: "Blue", hex: "#2563eb" },
  { name: "Cyan", hex: "#06b6d4" },
  { name: "Emerald", hex: "#10b981" },
  { name: "Amber", hex: "#f59e0b" },
  { name: "Rose", hex: "#f43f5e" },
  { name: "Slate", hex: "#0f172a" },
];

function calculateLuminance(hex: string) {
  if (!/^#[\da-f]{6}$/i.test(hex)) return 0.5;
  const rgb = hex.match(/.{2}/g)!.map((c) => {
    const v = parseInt(c, 16) / 255;
    return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
}

export function LandingBrandControls({
  brand,
  onChange,
  themeMode,
  onThemeChange,
}: {
  brand: BrandProfile;
  onChange: (brand: BrandProfile) => void;
  themeMode: LandingPageConfig["themeMode"];
  onThemeChange: (mode: LandingPageConfig["themeMode"]) => void;
}) {
  const [color, setColor] = React.useState(brand.primary);
  const [copiedSnippet, setCopiedSnippet] = React.useState(false);

  React.useEffect(() => setColor(brand.primary), [brand.primary]);

  const fonts = [...new Set([...typographyPresets.sans, ...typographyPresets.heading])];

  const lum = calculateLuminance(color);
  const contrastWithWhite = (1 + 0.05) / (lum + 0.05);
  const contrastRatio = contrastWithWhite.toFixed(1);

  const handleCopyThemeSnippet = () => {
    const snippet = `/* Hudbird UI — Customized Tailwind v4 @theme for ${brand.name} */
@theme {
  --color-primary: ${brand.primary};
  --font-heading: ${brand.fontFamily};
  --radius: ${{ square: "0px", soft: "12px", round: "24px" }[brand.radius]};
  --hb-section-spacing: ${
    brand.density === "compact" ? "clamp(3.5rem, 6vw, 5rem)" : "clamp(4.5rem, 7vw, 6rem)"
  };
  --text-display-xl: clamp(2.25rem, 4.5vw, 3.75rem);
  --shadow-skeuomorphic: 0 1px 2px rgba(16, 24, 40, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.16), inset 0 0 0 1px rgba(16, 24, 40, 0.12);
}`;
    navigator.clipboard.writeText(snippet);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header: Brand Presets & Quick Export Token Snippet */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200/80 pb-4 dark:border-white/[0.08]">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 text-primary flex h-6 w-6 items-center justify-center rounded-md">
            <Palette className="h-3.5 w-3.5" />
          </div>
          <span className="text-xs font-semibold tracking-wider text-zinc-900 uppercase dark:text-white">
            Design Token Customizer
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyThemeSnippet}
            className="inline-flex h-7 items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 text-[11px] font-medium text-zinc-700 shadow-2xs hover:bg-zinc-50 dark:border-white/[0.1] dark:bg-[#1e1e22] dark:text-zinc-200 dark:hover:bg-white/[0.06]"
          >
            {copiedSnippet ? (
              <>
                <Check className="h-3 w-3 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">Copied @theme</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 text-zinc-400" />
                <span>Copy Tailwind v4 @theme</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* SECTION 1: Brand Presets & Theme Mode Selection */}
      <div className="space-y-2">
        <div className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
          Brand Presets
        </div>
        <div role="group" aria-label="Brand presets" className="flex flex-wrap gap-2">
          {pilotBrands.map((preset) => (
            <Button
              key={preset.id}
              size="sm"
              variant={brand.id === preset.id ? "solid" : "outline"}
              aria-pressed={brand.id === preset.id}
              onClick={() => onChange({ ...preset })}
            >
              {preset.name}
            </Button>
          ))}
        </div>
      </div>

      {/* SECTION 2: Accent Swatches & Live Color Calibration */}
      <div className="space-y-2 rounded-xl border border-zinc-200/70 bg-white p-3.5 shadow-2xs dark:border-white/[0.08] dark:bg-[#18181b]">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-300">
            Brand Accent & Primary Color
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] text-zinc-500 dark:text-zinc-400">
            Contrast ratio:{" "}
            <strong className="font-mono text-zinc-700 dark:text-zinc-200">
              {contrastRatio}:1
            </strong>
            {Number(contrastRatio) >= 4.5 && (
              <span className="py-0.2 rounded bg-emerald-500/10 px-1 text-[9px] font-semibold text-emerald-600 dark:text-emerald-400">
                AA/AAA Pass
              </span>
            )}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          {ACCENT_SWATCHES.map((swatch) => (
            <button
              key={swatch.hex}
              type="button"
              onClick={() => {
                setColor(swatch.hex);
                onChange({ ...brand, primary: swatch.hex });
              }}
              title={swatch.name}
              className={`group relative flex h-7 w-7 items-center justify-center rounded-lg border transition-transform hover:scale-105 ${
                brand.primary.toLowerCase() === swatch.hex.toLowerCase()
                  ? "ring-primary ring-2 ring-offset-2 dark:ring-offset-zinc-900"
                  : "border-black/[0.08] dark:border-white/[0.08]"
              }`}
              style={{ backgroundColor: swatch.hex }}
            >
              {brand.primary.toLowerCase() === swatch.hex.toLowerCase() && (
                <Check className="h-3.5 w-3.5 text-white drop-shadow" />
              )}
            </button>
          ))}

          {/* Color Picker input */}
          <div className="flex items-center gap-1.5 pl-2">
            <input
              type="color"
              value={/^#[\da-f]{6}$/i.test(color) ? color : "#4f46e5"}
              onChange={(e) => {
                setColor(e.target.value);
                onChange({ ...brand, primary: e.target.value });
              }}
              className="h-7 w-7 cursor-pointer rounded-lg border border-black/[0.08] bg-transparent p-0.5 dark:border-white/[0.08]"
            />
            <span className="font-mono text-xs text-zinc-500">{color.toUpperCase()}</span>
          </div>
        </div>
      </div>

      {/* SECTION 3: Detailed Configuration Grid */}
      <Grid cols={2} gap="md">
        <Input
          label="Brand name"
          value={brand.name}
          onChange={(event) => onChange({ ...brand, name: event.target.value })}
        />
        <Input
          label="Primary color (HEX)"
          value={color}
          isInvalid={!/^#[\da-f]{6}$/i.test(color)}
          errorMessage="Use a six-digit hex color (e.g. #4F46E5)."
          onChange={(event) => {
            setColor(event.target.value);
            if (/^#[\da-f]{6}$/i.test(event.target.value))
              onChange({ ...brand, primary: event.target.value });
          }}
        />
        <Select
          label="Brand font (Heading & Display)"
          value={brand.googleFont ?? "preset"}
          onValueChange={(font) =>
            onChange({
              ...brand,
              googleFont: font === "preset" ? undefined : font,
              fontFamily:
                font === "preset"
                  ? (pilotBrands.find((preset) => preset.id === brand.id) ?? pilotBrands[0])
                      .fontFamily
                  : `"${font}", ${["Lora", "Playfair Display"].includes(font) ? "Georgia, serif" : "system-ui, sans-serif"}`,
            })
          }
        >
          <SelectItem value="preset">Brand preset font</SelectItem>
          {fonts.map((font) => (
            <SelectItem key={font} value={font}>
              {font}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="Corner radius style"
          value={brand.radius}
          onValueChange={(radius) =>
            onChange({ ...brand, radius: radius as BrandProfile["radius"] })
          }
        >
          {["square", "soft", "round"].map((value) => (
            <SelectItem key={value} value={value}>
              {value === "square"
                ? "Sharp / Square (0px)"
                : value === "soft"
                  ? "Soft Rounded (12px)"
                  : "Pill / Round (24px)"}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="Section rhythm spacing"
          value={brand.density}
          onValueChange={(density) =>
            onChange({ ...brand, density: density as BrandProfile["density"] })
          }
        >
          <SelectItem value="comfortable">Comfortable (4.5rem – 6rem)</SelectItem>
          <SelectItem value="compact">Compact (3.5rem – 5rem)</SelectItem>
        </Select>
        <Input
          label="Logo URL or local path"
          value={brand.logo?.src ?? ""}
          onChange={(event) =>
            onChange({
              ...brand,
              logo: event.target.value
                ? { src: event.target.value, alt: `${brand.name} logo` }
                : undefined,
            })
          }
        />
        <Input
          label="Reference URL"
          value={brand.referenceUrl ?? ""}
          onChange={(event) => onChange({ ...brand, referenceUrl: event.target.value })}
          description="Saved with your brief. No automatic website import."
        />
      </Grid>

      {/* SECTION 4: Theme Mode Switcher */}
      <div className="space-y-2 border-t border-zinc-200/80 pt-4 dark:border-white/[0.08]">
        <div className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
          Canvas Theme Mode
        </div>
        <div role="group" aria-label="Preview theme" className="flex flex-wrap gap-2">
          {(["auto", "light", "dark"] as const).map((mode) => (
            <Button
              key={mode}
              size="sm"
              variant={themeMode === mode ? "solid" : "outline"}
              aria-pressed={themeMode === mode}
              onClick={() => onThemeChange(mode)}
            >
              {mode === "auto"
                ? "Follow website"
                : `${mode === "light" ? "Light" : "Dark"} preview`}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
