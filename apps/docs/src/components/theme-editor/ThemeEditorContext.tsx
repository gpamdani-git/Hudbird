import React, { createContext, useContext, useState, useEffect } from "react";
import { baseColors, typographyPresets } from "../../lib/themes";
import { parseOklch, generateThemeColorScales } from "../../lib/colorUtils";

type ExportFormat = "css" | "json" | "cli";

interface ThemeEditorState {
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  secondaryColor: string;
  setSecondaryColor: (color: string) => void;
  successColor: string;
  setSuccessColor: (color: string) => void;
  infoColor: string;
  setInfoColor: (color: string) => void;
  warningColor: string;
  setWarningColor: (color: string) => void;
  destructiveColor: string;
  setDestructiveColor: (color: string) => void;
  activeBase: keyof typeof baseColors;
  setActiveBase: (base: keyof typeof baseColors) => void;
  activeRadius: number;
  setActiveRadius: (radius: number) => void;
  activeFontSans: string;
  setActiveFontSans: (font: string) => void;
  activeFontHeading: string;
  setActiveFontHeading: (font: string) => void;
  exportFormat: ExportFormat;
  setExportFormat: (format: ExportFormat) => void;
  getCssString: () => string;
  getCliCommand: () => string;
}

const ThemeEditorContext = createContext<ThemeEditorState | undefined>(undefined);

const generateScaleVars = (name: string, oklchStr: string) => {
  const { c, h } = parseOklch(oklchStr);
  const { light } = generateThemeColorScales(c, h);
  let css = "";
  for (const [k, v] of Object.entries(light)) {
    css += `  --color-${name}-${k}: oklch(${v});\n`;
  }
  return css;
};

const generateThemeScales = (name: string) => {
  return [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
    .map((k) => `  --color-${name}-${k}: oklch(var(--${name}-${k}));\n`)
    .join("");
};

export const ThemeEditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [primaryColor, setPrimaryColor] = useState("0.511 0.262 276.966");
  const [secondaryColor, setSecondaryColor] = useState("0.511 0.05 276.966");
  const [successColor, setSuccessColor] = useState("0.65 0.2 150");
  const [infoColor, setInfoColor] = useState("0.6 0.2 250");
  const [warningColor, setWarningColor] = useState("0.75 0.2 80");
  const [destructiveColor, setDestructiveColor] = useState("0.6 0.2 25");
  const [activeBase, setActiveBase] = useState<keyof typeof baseColors>("zinc");
  const [activeRadius, setActiveRadius] = useState<number>(0.5);
  const [activeFontSans, setActiveFontSans] = useState<string>("Inter");
  const [activeFontHeading, setActiveFontHeading] = useState<string>("Inter");
  const [exportFormat, setExportFormat] = useState<ExportFormat>("cli");

  // Auto-generate semantic colors based on primary color
  useEffect(() => {
    const { l, c, h } = parseOklch(primaryColor);
    if (isNaN(l) || isNaN(c) || isNaN(h)) return;

    // Secondary is same hue, very low chroma (muted)
    setSecondaryColor(`${l} 0.05 ${h}`);

    // Scale the chroma for semantic colors to match primary vibrancy, but cap it so it remains within gamut
    const baseC = Math.min(Math.max(c, 0.1), 0.22);

    // Semantic hues: Info (Blue 250), Success (Green 150), Warning (Yellow 80), Danger (Red 25)
    // We use optimal lightness for each hue to prevent muddy/unreadable colors
    setInfoColor(`0.6 ${baseC} 250`);
    setSuccessColor(`0.65 ${baseC} 150`);
    setWarningColor(`0.75 ${baseC} 80`);
    setDestructiveColor(`0.6 ${baseC} 25`);
  }, [primaryColor]);

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

  const getCssString = () => {
    const base = baseColors[activeBase];
    if (!base) return "";

    let styleStr = `:root {\n`;
    styleStr += generateScaleVars("primary", primaryColor);
    styleStr += generateScaleVars("secondary", secondaryColor);
    styleStr += `  --color-primary: var(--color-primary-600);\n`;
    styleStr += `  --color-primary-hover: var(--color-primary-700);\n`;
    styleStr += `  --color-primary-active: var(--color-primary-800);\n`;
    styleStr += `  --color-primary-foreground: oklch(1 0 0);\n`;
    styleStr += `  --color-primary-soft: var(--color-primary-50);\n`;
    styleStr += `  --color-primary-soft-hover: var(--color-primary-100);\n`;
    styleStr += `  --color-primary-soft-active: var(--color-primary-200);\n`;
    styleStr += `  --color-primary-border: var(--color-primary-600);\n`;
    styleStr += `  --color-primary-border-soft: var(--color-primary-200);\n`;
    styleStr += `  --color-primary-text: var(--color-primary-700);\n`;
    styleStr += `  --color-primary-text-soft: var(--color-primary-600);\n`;
    styleStr += `  --theme-radius: ${activeRadius}rem;\n`;
    styleStr += `}\n\n`;

    styleStr += `.dark {\n`;
    const { c, h } = parseOklch(primaryColor);
    const { dark } = generateThemeColorScales(c, h);
    for (const [k, v] of Object.entries(dark)) {
      styleStr += `  --color-primary-${k}: oklch(${v});\n`;
    }
    const secC = 0.01;
    const secH = h;
    const secDark = generateThemeColorScales(secC, secH).dark;
    for (const [k, v] of Object.entries(secDark)) {
      styleStr += `  --color-secondary-${k}: oklch(${v});\n`;
    }
    styleStr += `}\n\n`;

    styleStr += `body {\n`;
    styleStr += `  --theme-font-sans: "${activeFontSans}";\n`;
    styleStr += `  --theme-font-heading: "${activeFontHeading}";\n`;
    styleStr += `  font-family: var(--theme-font-sans), sans-serif !important;\n`;
    styleStr += `}\n\n`;

    styleStr += `h1, h2, h3, h4, h5, h6 {\n`;
    styleStr += `  font-family: var(--theme-font-heading), sans-serif !important;\n`;
    styleStr += `}\n\n`;

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

  const getCliCommand = () => {
    return `# 1. Initialize Hudbird UI in your project\nnpx hudbird-ui@latest init\n\n# 2. Add individual components\nnpx hudbird-ui@latest add Button\nnpx hudbird-ui@latest add Input Select Badge Alert\n\n# 3. Paste the generated CSS theme above into your index.css`;
  };

  useEffect(() => {
    // Scope = the preview wrapper in ThemesDoc, not the global :root
    // This prevents Theme Editor changes from modifying the rest of the app
    const SCOPE = "[data-theme-preview]";

    const { c, h } = parseOklch(primaryColor);
    const { light } = generateThemeColorScales(c, h);

    const injectSemanticScale = (scaleName: string, colorStr: string) => {
      const { c: sc, h: sh } = parseOklch(colorStr);
      const { light: sl } = generateThemeColorScales(sc, sh);
      let css = "";
      for (const [k, v] of Object.entries(sl)) css += `  --color-${scaleName}-${k}: oklch(${v});\n`;
      return css;
    };

    let css = `${SCOPE} {\n`;
    css += `  --primary-c: ${c};\n`;
    css += `  --primary-h: ${h};\n`;
    css += `  --theme-radius: ${activeRadius}rem;\n`;
    css += `  --radius: ${activeRadius}rem;\n`;
    css += `  --radius-sm: calc(${activeRadius}rem - 4px);\n`;
    css += `  --radius-md: calc(${activeRadius}rem - 2px);\n`;
    css += `  --radius-lg: ${activeRadius}rem;\n`;
    css += `  --radius-xl: calc(${activeRadius}rem + 4px);\n`;
    css += `  --radius-2xl: calc(${activeRadius}rem + 8px);\n`;
    css += `  --radius-3xl: calc(${activeRadius}rem + 12px);\n`;
    css += `  --theme-font-sans: "${activeFontSans}";\n`;
    css += `  --theme-font-heading: "${activeFontHeading}";\n`;
    // Primary scale
    for (const [k, v] of Object.entries(light)) {
      css += `  --color-primary-${k}: oklch(${v});\n`;
    }
    // Semantic scales
    css += injectSemanticScale("emerald", successColor);
    css += injectSemanticScale("amber", warningColor);
    css += injectSemanticScale("rose", destructiveColor);
    css += injectSemanticScale("sky", infoColor);
    css += `}\n`;

    // Base style
    const baseMap: Record<string, string> = {
      zinc: "0.09 0 0",
      slate: "0.09 0.008 240",
      gray: "0.09 0.008 80",
    };
    if (activeBase in baseMap) {
      css += `${SCOPE} {\n  --background: oklch(${baseMap[activeBase as keyof typeof baseMap]});\n}\n`;
    }

    let dynamicStyleEl = document.getElementById("theme-builder-dynamic");
    if (!dynamicStyleEl) {
      dynamicStyleEl = document.createElement("style");
      dynamicStyleEl.id = "theme-builder-dynamic";
      document.head.appendChild(dynamicStyleEl);
    }
    dynamicStyleEl.innerHTML = css;
  }, [
    activeBase,
    primaryColor,
    successColor,
    infoColor,
    warningColor,
    destructiveColor,
    activeRadius,
    activeFontSans,
    activeFontHeading,
  ]);

  // Cleanup injected styles on unmount
  useEffect(() => {
    return () => {
      const el = document.getElementById("theme-builder-dynamic");
      if (el) el.remove();
      const el2 = document.getElementById("theme-builder-style");
      if (el2) el2.remove();
    };
  }, []);

  return (
    <ThemeEditorContext.Provider
      value={{
        primaryColor,
        setPrimaryColor,
        secondaryColor,
        setSecondaryColor,
        successColor,
        setSuccessColor,
        infoColor,
        setInfoColor,
        warningColor,
        setWarningColor,
        destructiveColor,
        setDestructiveColor,
        activeBase,
        setActiveBase,
        activeRadius,
        setActiveRadius,
        activeFontSans,
        setActiveFontSans,
        activeFontHeading,
        setActiveFontHeading,
        exportFormat,
        setExportFormat,
        getCssString,
        getCliCommand,
      }}
    >
      {children}
    </ThemeEditorContext.Provider>
  );
};

export const useThemeEditor = () => {
  const context = useContext(ThemeEditorContext);
  if (!context) {
    throw new Error("useThemeEditor must be used within a ThemeEditorProvider");
  }
  return context;
};
