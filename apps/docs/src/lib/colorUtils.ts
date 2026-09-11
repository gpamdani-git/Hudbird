export const adjustLightness = (hslStr: string, delta: number) => {
  const parts = hslStr.replace(/%/g, "").split(" ");
  if (parts.length === 3) {
    const l = parseFloat(parts[2]);
    return `${parts[0]} ${parts[1]}% ${Math.max(0, Math.min(100, l + delta))}%`;
  }
  return hslStr;
};

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

export const hslToRgb = (h: number, s: number, l: number) => {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))];
};

export const getLuminance = (r: number, g: number, b: number) => {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

export const getContrastRatio = (l1: number, l2: number) => {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
};

export const parseHsl = (hslStr: string) => {
  const parts = hslStr.replace(/%/g, "").split(" ");
  return { h: parseFloat(parts[0]), s: parseFloat(parts[1]), l: parseFloat(parts[2]) };
};
