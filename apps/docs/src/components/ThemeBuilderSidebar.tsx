import React, { useState, useEffect } from "react";
import { Download, Copy, RefreshCw, Layers, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@hudbird/ui/utils/cn";
import { Button } from "@hudbird/ui/components/Button/Button";
import { Card } from "@hudbird/ui/components/Card/Card";
import { Select, SelectItem } from "@hudbird/ui/components/Select/Select";
import { baseColors, primaryColors, typographyPresets } from "../lib/themes";

const radii = [0, 0.5, 0.75, 1.0];

interface ThemeBuilderSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isMini?: boolean;
}

import {
  adjustLightness,
  generateColorScale,
  parseHsl,
  hslToRgb,
  getLuminance,
  getContrastRatio,
} from "../lib/colorUtils";

const calculateSemanticColors = (primaryHsl: string) => {
  const { h, s } = parseHsl(primaryHsl);
  return {
    secondary: `${h} ${Math.min(s, 15)}%`,
    info: `199 ${Math.min(s, 80)}%`,
    success: `142 ${Math.min(s, 80)}%`,
    warning: `38 ${Math.min(s + 20, 100)}%`,
    danger: `347 ${Math.min(s, 90)}%`,
  };
};

const generateScaleVars = (name: string, base: string) => {
  const { h, s } = parseHsl(`${base} 50%`);
  const scale = generateColorScale(h, s);
  return Object.entries(scale)
    .map(([k, v]) => `  --${name}-${k}: ${v};\n`)
    .join("");
};

const generateThemeScales = (name: string) => {
  return [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
    .map((k) => `  --color-${name}-${k}: hsl(var(--${name}-${k}));\n`)
    .join("");
};

export const ThemeBuilderSidebar: React.FC<ThemeBuilderSidebarProps> = ({
  isOpen,
  onClose,
  isMini = false,
}) => {
  const [activeBase, setActiveBase] = useState<keyof typeof baseColors>("zinc");
  const [activePrimary, setActivePrimary] = useState<keyof typeof primaryColors>("indigo");
  const [activeSuccess, setActiveSuccess] = useState<keyof typeof primaryColors>("emerald");
  const [activeInfo, setActiveInfo] = useState<keyof typeof primaryColors>("sky");
  const [activeWarning, setActiveWarning] = useState<keyof typeof primaryColors>("amber");
  const [activeDestructive, setActiveDestructive] = useState<keyof typeof primaryColors>("red");

  const [activeRadius, setActiveRadius] = useState<number>(0.5);
  const [activeFontSans, setActiveFontSans] = useState<string>("Inter");
  const [activeFontHeading, setActiveFontHeading] = useState<string>("Inter");

  // Dynamically load Google Fonts for live preview
  useEffect(() => {
    const fonts = new Set([activeFontSans, activeFontHeading]);
    const fontNames = Array.from(fonts).map((f) => f.replace(/ /g, "+"));

    const linkId = "theme-builder-google-fonts";
    let linkElement = document.getElementById(linkId) as HTMLLinkElement;

    if (!linkElement) {
      linkElement = document.createElement("link");
      linkElement.id = linkId;
      linkElement.rel = "stylesheet";
      document.head.appendChild(linkElement);
    }

    linkElement.href = `https://fonts.googleapis.com/css2?family=${fontNames.join("&family=")}:wght@400;500;600;700;800&display=swap`;
  }, [activeFontSans, activeFontHeading]);

  const [copied, setCopied] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [exportFormat, setExportFormat] = useState<"css" | "json">("css");

  // WCAG Contrast State
  const [contrastRatio, setContrastRatio] = useState<number>(1);
  const [isAccessible, setIsAccessible] = useState<boolean>(true);
  const [autoFixContrast, setAutoFixContrast] = useState<boolean>(false);

  // Dynamic Google Font Loader
  useEffect(() => {
    const fonts = Array.from(new Set([activeFontSans, activeFontHeading]));
    const linkId = "theme-builder-fonts";
    let linkEl = document.getElementById(linkId) as HTMLLinkElement;

    if (!linkEl) {
      linkEl = document.createElement("link");
      linkEl.id = linkId;
      linkEl.rel = "stylesheet";
      document.head.appendChild(linkEl);
    }

    const familyQuery = fonts
      .map((f) => `family=${f.replace(/ /g, "+")}:wght@400;500;600;700`)
      .join("&");
    linkEl.href = `https://fonts.googleapis.com/css2?${familyQuery}&display=swap`;
  }, [activeFontSans, activeFontHeading]);

  // Contrast Calculation
  useEffect(() => {
    const primary = primaryColors[activePrimary];
    if (primary) {
      const { h, s, l } = parseHsl(primary.hsl);
      const rgb = hslToRgb(h, s, l);
      const lumBg = getLuminance(rgb[0], rgb[1], rgb[2]);

      const lumWhite = getLuminance(255, 255, 255);
      const ratioWhite = getContrastRatio(lumWhite, lumBg);

      setContrastRatio(ratioWhite);
      setIsAccessible(ratioWhite >= 4.5);

      if (ratioWhite >= 4.5) setAutoFixContrast(false);
    }
  }, [activePrimary]);

  const getCssString = () => {
    const base = baseColors[activeBase];
    const primary = primaryColors[activePrimary];
    if (!base || !primary) return "";

    const primaryHsl = primary.hsl;
    const primaryHover = adjustLightness(primaryHsl, -5);
    const primaryActive = adjustLightness(primaryHsl, -10);
    const darkPrimaryHover = adjustLightness(primaryHsl, 5);
    const darkPrimaryActive = adjustLightness(primaryHsl, 10);

    const infoHsl = primaryColors[activeInfo]?.hsl || "199 89% 48%";
    const successHsl = primaryColors[activeSuccess]?.hsl || "142 76% 45%";
    const warningHsl = primaryColors[activeWarning]?.hsl || "38 92% 50%";
    const destructiveHsl = primaryColors[activeDestructive]?.hsl || "347 77% 55%";

    const primaryForeground = autoFixContrast && !isAccessible ? "0 0% 10%" : "0 0% 100%";

    const semantics = calculateSemanticColors(primaryHsl);
    const secondaryLight = `${semantics.secondary} 96%`;
    const secondaryDark = `${semantics.secondary} 16%`;

    let styleStr = "";

    // Export Google Fonts for user's index.css
    const fonts = new Set([activeFontSans, activeFontHeading]);
    const fontNames = Array.from(fonts).map((f) => f.replace(/ /g, "+"));
    styleStr += `@import url('https://fonts.googleapis.com/css2?family=${fontNames.join("&family=")}:wght@400;500;600;700;800&display=swap');\n\n`;

    styleStr += `:root {\n`;
    for (const [key, val] of Object.entries(base.light)) {
      styleStr += `  ${key}: ${val};\n`;
    }

    const colorsObj = {
      primary: primaryHsl,
      secondary: semantics.secondary,
      success: successHsl,
      info: infoHsl,
      warning: warningHsl,
      destructive: destructiveHsl,
    };

    let functionalLight = "";
    let functionalDark = "";

    for (const [name, val] of Object.entries(colorsObj)) {
      const isWarning = name === "warning";
      const baseLvl = isWarning ? 500 : 600;
      const hoverLvl = isWarning ? 600 : 700;
      const activeLvl = isWarning ? 700 : 800;

      functionalLight += `
  --${name}: var(--${name}-${baseLvl});
  --${name}-hover: var(--${name}-${hoverLvl});
  --${name}-active: var(--${name}-${activeLvl});
  --${name}-foreground: ${name === "primary" ? primaryForeground : isWarning ? "240 5.9% 10%" : "0 0% 100%"};
  --${name}-soft: hsl(var(--${name}-50));
  --${name}-soft-hover: hsl(var(--${name}-100));
  --${name}-soft-active: hsl(var(--${name}-200));
  --${name}-border: hsl(var(--${name}-${baseLvl}));
  --${name}-border-soft: hsl(var(--${name}-200));
  --${name}-text: hsl(var(--${name}-700));
  --${name}-text-soft: hsl(var(--${name}-${baseLvl}));\n`;

      functionalDark += `
  --${name}: var(--${name}-${baseLvl});
  --${name}-hover: var(--${name}-${hoverLvl});
  --${name}-active: var(--${name}-${activeLvl});
  --${name}-foreground: ${name === "primary" ? primaryForeground : "0 0% 100%"};
  --${name}-soft: color-mix(in oklab, hsl(var(--${name}-${baseLvl})) 15%, transparent);
  --${name}-soft-hover: color-mix(in oklab, hsl(var(--${name}-${baseLvl})) 25%, transparent);
  --${name}-soft-active: color-mix(in oklab, hsl(var(--${name}-${baseLvl})) 35%, transparent);
  --${name}-border: var(--${name}-${baseLvl});
  --${name}-border-soft: color-mix(in oklab, hsl(var(--${name}-${baseLvl})) 30%, transparent);
  --${name}-text: var(--${name}-300);
  --${name}-text-soft: var(--${name}-400);\n`;
    }

    functionalLight = functionalLight.replace(
      "--secondary-foreground: 0 0% 100%;",
      "--secondary-foreground: 240 5.9% 10%;"
    );
    functionalLight = functionalLight.replace(
      "--warning-foreground: 0 0% 100%;",
      "--warning-foreground: 240 5.9% 10%;"
    );

    functionalDark = functionalDark.replace(
      "--secondary-foreground: 0 0% 100%;",
      "--secondary-foreground: 0 0% 98%;"
    );
    functionalDark = functionalDark.replace(
      "--warning-foreground: 0 0% 100%;",
      "--warning-foreground: 0 0% 98%;"
    );

    styleStr += functionalLight;
    styleStr += `  --ring: var(--primary-500);\n`;
    styleStr += `  --theme-radius: ${activeRadius}rem;\n`;

    // Force fonts directly on the body block to ensure live preview update
    styleStr += `}\n\nbody {\n`;
    styleStr += `  --theme-font-sans: "${activeFontSans}";\n`;
    styleStr += `  --theme-font-heading: "${activeFontHeading}";\n`;
    styleStr += `  font-family: var(--theme-font-sans), sans-serif !important;\n`;
    styleStr += `}\n\nh1, h2, h3, h4, h5, h6 {\n`;
    styleStr += `  font-family: var(--theme-font-heading), sans-serif !important;\n`;

    styleStr += `}\n\n:root {\n`;
    styleStr += generateScaleVars("primary", primaryHsl);
    styleStr += generateScaleVars("secondary", semantics.secondary);
    styleStr += generateScaleVars("success", successHsl);
    styleStr += generateScaleVars("info", infoHsl);
    styleStr += generateScaleVars("warning", warningHsl);
    styleStr += generateScaleVars("destructive", destructiveHsl);

    styleStr += `}\n\n.dark {\n`;

    for (const [key, val] of Object.entries(base.dark)) {
      styleStr += `  ${key}: ${val};\n`;
    }

    styleStr += functionalDark;
    styleStr += `  --ring: var(--primary-500);\n`;
    styleStr += `}\n\n`;

    // Tailwind v4 @theme export
    styleStr += `@theme {\n`;
    styleStr += generateThemeScales("primary");
    styleStr += generateThemeScales("secondary");
    styleStr += generateThemeScales("success");
    styleStr += generateThemeScales("info");
    styleStr += generateThemeScales("warning");
    styleStr += generateThemeScales("destructive");
    styleStr += `}\n`;

    return styleStr;
  };

  const getTailwindConfigJson = () => {
    return JSON.stringify(
      {
        message:
          "JSON export not fully updated for functional tokens in v3 yet. Use CSS export for v4.",
      },
      null,
      2
    );
  };

  const getExportString = () => (exportFormat === "css" ? getCssString() : getTailwindConfigJson());

  useEffect(() => {
    // Only inject the active theme variables for the UI, not the @theme block because it breaks the live preview
    const uiStyleStr = getCssString().split("@theme")[0];

    let styleEl = document.getElementById("theme-builder-style");
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "theme-builder-style";
      document.head.appendChild(styleEl);
    }
    styleEl.innerHTML = uiStyleStr;
  }, [
    activeBase,
    activePrimary,
    activeSuccess,
    activeInfo,
    activeWarning,
    activeDestructive,
    activeRadius,
    activeFontSans,
    activeFontHeading,
    autoFixContrast,
  ]);

  const isMobileVisible = isOpen ? "translate-x-0" : "-translate-x-[120%]";
  const isDesktopVisible = !isMini ? "lg:translate-x-0" : "lg:-translate-x-[120%]";
  const transformClasses = `${isMobileVisible} ${isDesktopVisible}`;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className={`fixed inset-0 z-50 bg-zinc-950/40 backdrop-blur-sm lg:hidden`}
        />
      )}

      <aside
        className={`border-border/80 bg-background/80 fixed top-3 bottom-3 left-3 z-50 flex w-72 flex-col overflow-hidden rounded-xl border px-4 py-4 shadow-xl backdrop-blur-3xl ${transformClasses} pt-16 transition-transform duration-300 ease-in-out lg:pt-4`}
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="text-primary h-5 w-5" />
            <span className="text-foreground text-sm font-bold">Theme Builder</span>
          </div>
          <div className="flex gap-1">
            <button className="text-muted-foreground hover:bg-accent hover:text-foreground rounded-md p-1.5">
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
            <button
              className="text-muted-foreground hover:bg-accent hover:text-foreground rounded-md p-1.5 lg:hidden"
              onClick={onClose}
            >
              <Copy className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="scrollbar-hide flex-1 space-y-6 overflow-y-auto pr-1">
          <div className="space-y-3">
            <h4 className="text-foreground text-xs font-semibold tracking-wider uppercase">
              Base Style
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(baseColors) as Array<keyof typeof baseColors>).map((key) => {
                const isActive = activeBase === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveBase(key)}
                    className={cn(
                      "rounded-md border py-1.5 text-xs font-medium",
                      isActive
                        ? "border-primary bg-accent text-foreground"
                        : "border-border hover:bg-accent text-muted-foreground"
                    )}
                  >
                    {baseColors[key].name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-foreground text-xs font-semibold tracking-wider uppercase">
                Primary Color
              </h4>
            </div>

            <div className="grid grid-cols-6 gap-2">
              {(Object.keys(primaryColors) as Array<keyof typeof primaryColors>).map((key) => {
                const color = primaryColors[key];
                const isActive = activePrimary === key;
                return (
                  <button
                    key={key}
                    title={color.name}
                    onClick={() => setActivePrimary(key)}
                    className={cn(
                      "flex h-8 w-full items-center justify-center rounded-md border-2",
                      isActive ? "border-foreground" : "hover:border-border border-transparent"
                    )}
                  >
                    <div
                      className="h-5 w-5 rounded-full"
                      style={{ backgroundColor: `hsl(${color.hsl})` }}
                    />
                  </button>
                );
              })}
            </div>

            {/* WCAG Contrast Warning */}
            <div
              className={cn(
                "flex flex-col gap-2 rounded-lg border p-2.5 text-xs",
                isAccessible
                  ? "bg-success/10 border-success/20 text-success"
                  : "bg-destructive/10 border-destructive/20 text-destructive"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold">
                  {isAccessible ? "WCAG AA Passed" : "WCAG AA Failed"}
                </span>
                <span className="opacity-80">Ratio: {contrastRatio.toFixed(2)}:1</span>
              </div>
              {!isAccessible && (
                <div className="flex items-center justify-between pt-1">
                  <span className="opacity-80">Text contrast is too low.</span>
                  <button
                    onClick={() => setAutoFixContrast(true)}
                    className="bg-destructive text-destructive-foreground rounded px-2 py-1 font-medium transition-opacity hover:opacity-90"
                  >
                    Auto-Fix
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <button
              className="text-foreground flex w-full items-center justify-between py-1 text-xs font-semibold tracking-wider uppercase"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              <span>Advanced States</span>
              {showAdvanced ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
            {showAdvanced && (
              <div className="bg-muted/50 border-border/50 text-muted-foreground space-y-2 rounded-lg border p-3 text-xs">
                <p>
                  Hover and Active states are dynamically generated based on your primary color
                  choice using lightness adjustments (-5% for hover, -10% for active).
                </p>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <h4 className="text-foreground text-xs font-semibold tracking-wider uppercase">
              Typography
            </h4>

            <div className="space-y-2">
              <label className="text-muted-foreground text-xs">Heading Font</label>
              <Select
                value={activeFontHeading}
                onChange={(e: any) => setActiveFontHeading(e.target.value)}
              >
                {typographyPresets.heading.map((font) => (
                  <SelectItem key={font} value={font}>
                    {font}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-muted-foreground text-xs">Body Font</label>
              <Select
                value={activeFontSans}
                onChange={(e: any) => setActiveFontSans(e.target.value)}
              >
                {typographyPresets.sans.map((font) => (
                  <SelectItem key={font} value={font}>
                    {font}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-foreground text-xs font-semibold tracking-wider uppercase">
              Appearance
            </h4>

            <div className="space-y-2">
              <label className="text-muted-foreground text-xs">Border Radius</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { value: 0, label: "Sharp" },
                  { value: 0.25, label: "Subtle" },
                  { value: 0.5, label: "Std" },
                  { value: 1.0, label: "Full" },
                ].map((r) => {
                  const isActive = activeRadius === r.value;
                  return (
                    <button
                      key={r.value}
                      title={`${r.value}rem`}
                      onClick={() => setActiveRadius(r.value)}
                      className={cn(
                        "rounded-md py-1 text-xs font-medium",
                        isActive
                          ? "border-primary bg-accent text-foreground border-2"
                          : "border-border hover:bg-accent text-foreground border"
                      )}
                    >
                      {r.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-muted-foreground text-xs">Mode</label>
              <div className="bg-muted border-border/50 flex rounded-lg border p-1">
                <button
                  onClick={() => document.documentElement.classList.remove("dark")}
                  className="hover:bg-background text-foreground flex-1 rounded-md py-1.5 text-xs font-medium shadow-sm transition-colors"
                >
                  Light
                </button>
                <button
                  onClick={() => document.documentElement.classList.add("dark")}
                  className="text-foreground hover:bg-background flex-1 rounded-md py-1.5 text-xs font-medium shadow-sm transition-colors"
                >
                  Dark
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-border/60 mt-2 flex flex-col gap-3 border-t pt-4">
          <div className="bg-accent/30 border-border/50 text-muted-foreground space-y-1 rounded-lg border p-2.5 text-xs">
            <p className="text-foreground mb-1.5 font-medium">How to install Typography</p>
            <p>
              Add this to your{" "}
              <code className="bg-muted rounded px-1 py-0.5 text-[10px]">layout.tsx</code> or HTML
              header:
            </p>
            <div className="group relative">
              <pre className="mt-1 overflow-x-auto rounded border border-zinc-800 bg-zinc-950 p-2 text-[10px] text-zinc-300">
                &lt;link href="https://fonts.googleapis.com/css2?family=
                {activeFontSans.replace(/ /g, "+")}:wght@400;500;600;700&amp;family=
                {activeFontHeading.replace(/ /g, "+")}:wght@400;500;600;700&amp;display=swap"
                rel="stylesheet" /&gt;
              </pre>
            </div>
          </div>

          <div className="bg-muted border-border/50 flex rounded-lg border p-1">
            <button
              onClick={() => setExportFormat("css")}
              className={cn(
                "flex-1 rounded-md py-1 text-xs font-medium transition-colors",
                exportFormat === "css"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              CSS (v4)
            </button>
            <button
              onClick={() => setExportFormat("json")}
              className={cn(
                "flex-1 rounded-md py-1 text-xs font-medium transition-colors",
                exportFormat === "json"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              JSON (v3)
            </button>
          </div>

          <div className="flex gap-2">
            <Button
              variant="solid"
              color="primary"
              className="flex-1 justify-center px-2"
              onClick={() => {
                navigator.clipboard.writeText(getExportString());
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
            >
              {copied ? (
                "Copied!"
              ) : (
                <>
                  <Copy className="mr-1.5 h-4 w-4" /> Copy
                </>
              )}
            </Button>
            <Button
              variant="outline"
              color="default"
              className="flex-1 justify-center px-2"
              onClick={() => {
                const element = document.createElement("a");
                const file = new Blob([getExportString()], {
                  type: exportFormat === "css" ? "text/css" : "application/json",
                });
                element.href = URL.createObjectURL(file);
                element.download = exportFormat === "css" ? "theme.css" : "tailwind.config.json";
                document.body.appendChild(element);
                element.click();
              }}
            >
              <Download className="mr-1.5 h-4 w-4" /> DL
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};
