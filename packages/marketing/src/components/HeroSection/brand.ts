import type { CSSProperties } from "react";
import type { BrandProfile } from "@hudbird/schemas";

function luminance(hex: string) {
  const rgb = hex.match(/.{2}/g)!.map((channel) => {
    const value = parseInt(channel, 16) / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
}

/** Choose an opaque, readable foreground even when a customer's accent is very light. */
export function brandStyle(brand: BrandProfile): CSSProperties {
  if (!/^#[\da-f]{6}$/i.test(brand.primary)) {
    throw new Error("BrandProfile.primary must be a six-digit hex color, for example #2457d6.");
  }
  const lum = luminance(brand.primary.slice(1));
  const foreground = (lum + 0.05) / 0.05 > 1.05 / (lum + 0.05) ? "#000000" : "#ffffff";
  const dark = brand.mode === "dark";
  return {
    "--hb-accent": brand.primary,
    "--hb-on-accent": foreground,
    "--hb-bg": dark ? "#161618" : "#ffffff",
    "--hb-ink": dark ? "#f4f4f5" : "#18181b",
    "--hb-muted": dark ? "#b4b4bc" : "#52525b",
    "--hb-surface": dark ? "#202124" : "#f4f5f7",
    "--hb-border": dark ? "#42424a" : "#d4d4d8",
    "--hb-radius": { square: "0px", soft: "12px", round: "24px" }[brand.radius],
    "--hb-font": brand.fontFamily,
    "--hb-section":
      brand.density === "compact" ? "clamp(3rem, 6vw, 5rem)" : "clamp(4rem, 8vw, 7rem)",
    fontFamily: brand.fontFamily,
    colorScheme: brand.mode,
  } as CSSProperties;
}
