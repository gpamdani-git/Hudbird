import type { CSSProperties } from "react";
import type { BrandProfile, WebsiteDesignTokens, WebsiteSurfaceBase } from "@hudbird/schemas";

function luminance(hex: string) {
  const rgb = hex.match(/.{2}/g)!.map((channel) => {
    const value = parseInt(channel, 16) / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
}

export interface SurfacePalette {
  bg: string;
  surface: string;
  ink: string;
  muted: string;
  border: string;
}

export const SURFACE_BASE_PALETTES: Record<
  WebsiteSurfaceBase,
  { light: SurfacePalette; dark: SurfacePalette }
> = {
  zinc: {
    light: {
      bg: "#ffffff",
      surface: "#f9fafb",
      ink: "#18181b",
      muted: "#52525b",
      border: "#e4e4e7",
    },
    dark: {
      bg: "#0c0d10",
      surface: "#14151a",
      ink: "#f4f4f6",
      muted: "#a1a1aa",
      border: "#27272a",
    },
  },
  slate: {
    light: {
      bg: "#ffffff",
      surface: "#f1f5f9",
      ink: "#0f172a",
      muted: "#475569",
      border: "#e2e8f0",
    },
    dark: {
      bg: "#0b1120",
      surface: "#111827",
      ink: "#f8fafc",
      muted: "#94a3b8",
      border: "#1e293b",
    },
  },
  neutral: {
    light: {
      bg: "#ffffff",
      surface: "#f5f5f5",
      ink: "#171717",
      muted: "#525252",
      border: "#e5e5e5",
    },
    dark: {
      bg: "#0a0a0a",
      surface: "#141414",
      ink: "#fafafa",
      muted: "#a3a3a3",
      border: "#262626",
    },
  },
  stone: {
    light: {
      bg: "#fafaf9",
      surface: "#f5f5f4",
      ink: "#1c1917",
      muted: "#57534e",
      border: "#e7e5e4",
    },
    dark: {
      bg: "#0c0a09",
      surface: "#161412",
      ink: "#fafaf9",
      muted: "#a8a29e",
      border: "#292524",
    },
  },
  obsidian: {
    light: {
      bg: "#fcfcfd",
      surface: "#f3f4f8",
      ink: "#111216",
      muted: "#5a5d6c",
      border: "#e3e5ec",
    },
    dark: {
      bg: "#070709",
      surface: "#111114",
      ink: "#f5f5f7",
      muted: "#8c8c98",
      border: "#202026",
    },
  },
};

export function brandCssVarsRecord(
  brand: BrandProfile,
  tokens?: WebsiteDesignTokens
): Record<string, string> {
  if (!/^#[\da-f]{6}$/i.test(brand.primary)) {
    throw new Error("BrandProfile.primary must be a six-digit hex color, for example #2457d6.");
  }
  const lum = luminance(brand.primary.slice(1));
  const foreground = (lum + 0.05) / 0.05 > 1.05 / (lum + 0.05) ? "#000000" : "#ffffff";
  const baseKey = tokens?.surfaceBase ?? "zinc";
  const palette =
    SURFACE_BASE_PALETTES[baseKey]?.[brand.mode] ?? SURFACE_BASE_PALETTES.zinc[brand.mode];
  const radiusPx =
    tokens?.shape?.radiusPx !== undefined
      ? `${tokens.shape.radiusPx}px`
      : { square: "0px", soft: "12px", round: "24px" }[brand.radius];
  const scaleFactor = { compact: "0.94", default: "1", expressive: "1.07" }[
    tokens?.typography?.scale ?? "default"
  ];
  const tracking = { tight: "-0.04em", normal: "-0.025em", wide: "-0.01em" }[
    tokens?.typography?.tracking ?? "normal"
  ];
  const containerWidth = { narrow: "62rem", standard: "80rem", wide: "90rem", full: "100%" }[
    tokens?.spacing?.containerWidth ?? "standard"
  ];
  const sectionPad =
    tokens?.spacing?.sectionPadding ?? (brand.density === "compact" ? "compact" : "comfortable");
  const sectionSpacing = {
    compact: "clamp(3rem, 5vw, 4.25rem)",
    comfortable: "clamp(4.5rem, 7vw, 6rem)",
    spacious: "clamp(5.75rem, 8.5vw, 7.5rem)",
  }[sectionPad];
  const elevation = {
    flat: "none",
    soft: "0 1px 3px rgba(0, 0, 0, 0.08)",
    layered: "0 12px 32px -12px rgba(0, 0, 0, 0.18)",
  }[tokens?.shape?.elevation ?? "soft"];
  const borderAlpha = { hairline: "0.55", subtle: "0.85", crisp: "1" }[
    tokens?.shape?.borderStyle ?? "subtle"
  ];
  const bodyFont = tokens?.typography?.bodyFont?.trim() || brand.fontFamily;
  const headingFont = tokens?.typography?.headingFont?.trim() || bodyFont;
  const monoFont =
    tokens?.typography?.monoFont?.trim() ||
    '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

  const custom = tokens?.customColors;
  return {
    "--hb-accent": brand.primary,
    "--hb-on-accent": foreground,
    "--hb-secondary": tokens?.secondaryColor ?? brand.primary,
    "--hb-success": tokens?.semantic?.success ?? "#10b981",
    "--hb-warning": tokens?.semantic?.warning ?? "#f59e0b",
    "--hb-danger": tokens?.semantic?.danger ?? "#ef4444",
    "--hb-bg": custom?.bg?.trim() || palette.bg,
    "--hb-ink": custom?.ink?.trim() || palette.ink,
    "--hb-muted": custom?.muted?.trim() || palette.muted,
    "--hb-surface": custom?.surface?.trim() || palette.surface,
    "--hb-border": custom?.border?.trim() || palette.border,
    "--hb-border-alpha": borderAlpha,
    "--hb-elevation": elevation,
    "--hb-radius": radiusPx,
    "--hb-font": bodyFont,
    "--hb-font-heading": headingFont,
    "--hb-font-mono": monoFont,
    "--hb-scale": scaleFactor,
    "--hb-tracking": tracking,
    "--hb-container": containerWidth,
    "--hb-section": sectionSpacing,
  };
}

/** Choose an opaque, readable foreground even when a customer's accent is very light. */
export function brandStyle(brand: BrandProfile, tokens?: WebsiteDesignTokens): CSSProperties {
  const vars = brandCssVarsRecord(brand, tokens);
  return {
    ...vars,
    fontFamily: vars["--hb-font"],
    colorScheme: brand.mode,
  } as CSSProperties;
}
