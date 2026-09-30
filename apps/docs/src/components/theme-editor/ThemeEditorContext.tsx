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
    let styleStr = `/* 
 * BLANK UI THEME
 * Add this to your index.css or globals.css
 */\n\n`;

    const { c, h } = parseOklch(primaryColor);

    styleStr += `:root {\n`;
    styleStr += `  /* Core Theme Colors */\n`;
    styleStr += `  --primary-c: ${c.toFixed(3)};\n`;
    styleStr += `  --primary-h: ${h.toFixed(1)};\n`;

    // Only output base scale if it's not the default Zinc
    const baseMap: Record<string, string> = {
      slate: "0.008 240",
      gray: "0.008 80",
    };
    if (activeBase !== "zinc" && activeBase in baseMap) {
      styleStr += `  --secondary-c: ${baseMap[activeBase].split(" ")[0]};\n`;
      styleStr += `  --secondary-h: ${baseMap[activeBase].split(" ")[1]};\n`;
    }

    styleStr += `\n  /* Typography */\n`;
    styleStr += `  --theme-font-sans: "${activeFontSans}";\n`;
    styleStr += `  --theme-font-heading: "${activeFontHeading}";\n`;

    styleStr += `\n  /* Border Radius */\n`;
    styleStr += `  --theme-radius: ${activeRadius}rem;\n`;
    styleStr += `}\n`;

    return styleStr;
  };

  const getCliCommand = () => {
    return `# 1. Initialize Blank UI in your project\nnpx blank-ui@latest init\n\n# 2. Add individual components\nnpx blank-ui@latest add Button Input Select Badge Alert\n\n# 3. Paste the lightweight CSS theme above into your index.css`;
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
    css += `  font-family: var(--theme-font-sans), sans-serif !important;\n`;
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
    css += `${SCOPE} h1, ${SCOPE} h2, ${SCOPE} h3, ${SCOPE} h4, ${SCOPE} h5, ${SCOPE} h6 {\n`;
    css += `  font-family: var(--theme-font-heading), sans-serif !important;\n`;
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

    // Debounce the DOM injection slightly to prevent reflow locking while dragging sliders
    const timeoutId = setTimeout(() => {
      let dynamicStyleEl = document.getElementById("theme-builder-dynamic");
      if (!dynamicStyleEl) {
        dynamicStyleEl = document.createElement("style");
        dynamicStyleEl.id = "theme-builder-dynamic";
        document.head.appendChild(dynamicStyleEl);
      }
      // Use requestAnimationFrame for smooth DOM updates
      requestAnimationFrame(() => {
        if (dynamicStyleEl) dynamicStyleEl.innerHTML = css;
      });
    }, 16); // roughly 1 frame

    return () => clearTimeout(timeoutId);
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
