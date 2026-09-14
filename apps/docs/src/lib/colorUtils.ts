import { oklch, parseHex, formatHex } from "culori";

export const hexToOklch = (hexStr: string) => {
  const color = oklch(hexStr);
  if (!color) return "0.5 0.1 0"; // fallback
  const l = Number(color.l.toFixed(3));
  const c = Number(color.c.toFixed(3));
  const h = Number((color.h || 0).toFixed(3));
  return `${l} ${c} ${h}`;
};

export const parseOklch = (oklchStr: string) => {
  const parts = oklchStr.trim().split(" ");
  return {
    l: parseFloat(parts[0]),
    c: parseFloat(parts[1]),
    h: parseFloat(parts[2] || "0"),
  };
};

// Fungsi kalkulasi pintar untuk Primary Base Color menggunakan Non-Linear Anchor Curve
export const generateThemeColorScales = (c_base: number, h: number) => {
  return {
    light: {
      50: `0.96 ${Number((c_base * 0.35).toFixed(3))} ${h}`,
      100: `0.92 ${Number((c_base * 0.5).toFixed(3))} ${h}`,
      200: `0.88 ${Number((c_base * 0.65).toFixed(3))} ${h}`,
      300: `0.80 ${Number((c_base * 0.8).toFixed(3))} ${h}`,
      400: `0.70 ${Number((c_base * 0.9).toFixed(3))} ${h}`,
      500: `0.60 ${Number((c_base * 0.95).toFixed(3))} ${h}`,
      600: `0.53 ${Number((c_base * 1.0).toFixed(3))} ${h}`,
      700: `0.44 ${Number((c_base * 0.85).toFixed(3))} ${h}`,
      800: `0.35 ${Number((c_base * 0.65).toFixed(3))} ${h}`,
      900: `0.26 ${Number((c_base * 0.5).toFixed(3))} ${h}`,
      950: `0.18 ${Number((c_base * 0.35).toFixed(3))} ${h}`,
    },
    dark: {
      50: `0.14 ${Number((c_base * 0.25).toFixed(3))} ${h}`,
      100: `0.18 ${Number((c_base * 0.3).toFixed(3))} ${h}`,
      200: `0.24 ${Number((c_base * 0.45).toFixed(3))} ${h}`,
      300: `0.33 ${Number((c_base * 0.6).toFixed(3))} ${h}`,
      400: `0.43 ${Number((c_base * 0.75).toFixed(3))} ${h}`,
      500: `0.53 ${Number((c_base * 0.85).toFixed(3))} ${h}`,
      600: `0.62 ${Number((c_base * 0.95).toFixed(3))} ${h}`,
      700: `0.72 ${Number((c_base * 0.7).toFixed(3))} ${h}`,
      800: `0.82 ${Number((c_base * 0.45).toFixed(3))} ${h}`,
      900: `0.93 ${Number((c_base * 0.2).toFixed(3))} ${h}`,
      950: `0.96 ${Number((c_base * 0.1).toFixed(3))} ${h}`,
    },
  };
};

export const oklchToHex = (l: number, c: number, h: number) => {
  const hex = formatHex({ mode: "oklch", l, c, h });
  return hex || "#000000";
};

// Deprecated: Kept for backwards compatibility if needed elsewhere temporarily
export const generateColorScale = (h: number, s: number) => {
  return {
    50: `${h} ${s}% 97%`,
    100: `${h} ${s}% 93%`,
    200: `${h} ${s}% 85%`,
    300: `${h} ${s}% 75%`,
    400: `${h} ${s}% 65%`,
    500: `${h} ${s}% 50%`,
    600: `${h} ${s}% 40%`,
    700: `${h} ${s}% 30%`,
    800: `${h} ${s}% 20%`,
    900: `${h} ${s}% 15%`,
    950: `${h} ${s}% 10%`,
  };
};

export const parseHsl = (hslStr: string) => {
  const parts = hslStr.replace(/%/g, "").split(" ");
  return { h: parseFloat(parts[0]), s: parseFloat(parts[1]), l: parseFloat(parts[2]) };
};
