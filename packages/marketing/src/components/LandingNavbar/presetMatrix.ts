import type { NavbarPresetId, NavbarVariant } from "@hudbird/schemas";
import type { NavbarPresetMeta } from "./types";

export const NAVBAR_PRESETS: Record<NavbarPresetId, NavbarPresetMeta> = {
  "nav-01": {
    id: "nav-01",
    name: "SaaS Classic",
    category: "saas",
    description:
      "Left logo, centered navigation links, and right conversion CTA with sticky active section tracking.",
    layout: "logo-left",
    surface: "solid",
    capabilities: {
      sticky: true,
      scrollTransform: true,
      hideOnScroll: false,
      dropdown: false,
      megaMenu: false,
      mobileMode: "drawer-right",
      activeSection: true,
    },
  },
  "nav-02": {
    id: "nav-02",
    name: "SaaS Floating",
    category: "saas",
    description:
      "Floating rounded pill navbar with backdrop glassmorphism, scroll-aware shrink, and hide/reveal behavior.",
    layout: "logo-left",
    surface: "floating",
    capabilities: {
      sticky: true,
      scrollTransform: true,
      hideOnScroll: true,
      dropdown: false,
      megaMenu: false,
      mobileMode: "top",
      activeSection: true,
    },
  },
  "nav-03": {
    id: "nav-03",
    name: "SaaS Platform",
    category: "saas",
    description:
      "Modern platform header with multi-column rich mega menu, icon links, and featured customer story card.",
    layout: "logo-left",
    surface: "glass",
    capabilities: {
      sticky: true,
      scrollTransform: true,
      hideOnScroll: false,
      dropdown: false,
      megaMenu: true,
      mobileMode: "drawer-right",
      activeSection: true,
    },
  },
  "nav-04": {
    id: "nav-04",
    name: "Startup Launch",
    category: "startup",
    description:
      "Centered brand wordmark with symmetrical split navigation links and seamless hero transparent-to-solid transition.",
    layout: "split",
    surface: "transparent",
    capabilities: {
      sticky: true,
      scrollTransform: true,
      hideOnScroll: false,
      dropdown: false,
      megaMenu: false,
      mobileMode: "fullscreen",
      activeSection: true,
    },
  },
  "nav-05": {
    id: "nav-05",
    name: "Creative Agency",
    category: "creative",
    description:
      "Bold editorial layout with left brand, right trigger, and an immersive split-screen fullscreen overlay menu.",
    layout: "logo-left",
    surface: "transparent",
    capabilities: {
      sticky: true,
      scrollTransform: true,
      hideOnScroll: true,
      dropdown: false,
      megaMenu: false,
      mobileMode: "fullscreen",
      activeSection: false,
    },
  },
  "nav-06": {
    id: "nav-06",
    name: "Creative Studio",
    category: "creative",
    description:
      "Asymmetric typographic navigation with right-aligned logo and left navigation links with slide drawer.",
    layout: "logo-right",
    surface: "solid",
    capabilities: {
      sticky: true,
      scrollTransform: true,
      hideOnScroll: false,
      dropdown: true,
      megaMenu: false,
      mobileMode: "drawer-left",
      activeSection: true,
    },
  },
  "nav-07": {
    id: "nav-07",
    name: "Portfolio",
    category: "creative",
    description:
      "Cinematic minimal header with subtle centered branding, split anchor navigation, and full-screen menu overlay.",
    layout: "split",
    surface: "glass",
    capabilities: {
      sticky: true,
      scrollTransform: true,
      hideOnScroll: false,
      dropdown: false,
      megaMenu: false,
      mobileMode: "fullscreen",
      activeSection: true,
    },
  },
  "nav-08": {
    id: "nav-08",
    name: "Corporate Classic",
    category: "corporate",
    description:
      "Restrained corporate header with left brand, disclosure dropdown submenu, and clear enterprise CTA hierarchy.",
    layout: "logo-left",
    surface: "solid",
    capabilities: {
      sticky: true,
      scrollTransform: true,
      hideOnScroll: false,
      dropdown: true,
      megaMenu: false,
      mobileMode: "drawer-right",
      activeSection: true,
    },
  },
  "nav-09": {
    id: "nav-09",
    name: "Corporate Enterprise",
    category: "corporate",
    description:
      "Dense two-row header with top utility row (phone, portal, search) and primary sticky row with enterprise mega menu.",
    layout: "two-row",
    surface: "solid",
    capabilities: {
      sticky: true,
      scrollTransform: true,
      hideOnScroll: false,
      dropdown: false,
      megaMenu: true,
      mobileMode: "drawer-right",
      activeSection: true,
    },
  },
  "nav-10": {
    id: "nav-10",
    name: "Luxury Hospitality",
    category: "hospitality",
    description:
      "High-contrast hero overlay header with centered serif typography, split links, and immediate reservation booking action.",
    layout: "split",
    surface: "overlay",
    capabilities: {
      sticky: true,
      scrollTransform: true,
      hideOnScroll: false,
      dropdown: false,
      megaMenu: false,
      mobileMode: "fullscreen",
      activeSection: false,
    },
  },
  "nav-11": {
    id: "nav-11",
    name: "Restaurant & F&B",
    category: "hospitality",
    description:
      "Warm brand-first header with prominent table reservation CTA and smooth color/elevation change on scroll.",
    layout: "logo-left",
    surface: "transparent",
    capabilities: {
      sticky: true,
      scrollTransform: true,
      hideOnScroll: false,
      dropdown: true,
      megaMenu: false,
      mobileMode: "drawer-right",
      activeSection: true,
    },
  },
  "nav-12": {
    id: "nav-12",
    name: "Professional Services",
    category: "services",
    description:
      "Refined geometric corporate header with right-anchored wordmark, consultation CTA, and dropdown disclosure.",
    layout: "logo-right",
    surface: "solid",
    capabilities: {
      sticky: true,
      scrollTransform: true,
      hideOnScroll: false,
      dropdown: true,
      megaMenu: false,
      mobileMode: "drawer-left",
      activeSection: true,
    },
  },
  "nav-13": {
    id: "nav-13",
    name: "Modern Mini",
    category: "creative",
    description:
      "Ultra-compact floating capsule with live scroll percentage indicator, quick dark/light theme switch, and spring modal dropdown.",
    layout: "logo-left",
    surface: "transparent",
    capabilities: {
      sticky: true,
      scrollTransform: true,
      hideOnScroll: false,
      dropdown: true,
      megaMenu: false,
      mobileMode: "top",
      activeSection: true,
    },
  },
};

export const LEGACY_NAVBAR_MAP: Record<string, NavbarPresetId> = {
  simple: "nav-01",
  centered: "nav-04",
  mega: "nav-03",
  "sidebar-1": "nav-06",
  "sidebar-2": "nav-05",
  "modern-mini": "nav-13",
};

export function resolveNavbarPreset(variant?: NavbarVariant): NavbarPresetMeta {
  if (!variant) return NAVBAR_PRESETS["nav-13"];
  if (variant in NAVBAR_PRESETS) {
    return NAVBAR_PRESETS[variant as NavbarPresetId];
  }
  const mapped = LEGACY_NAVBAR_MAP[variant];
  if (mapped && mapped in NAVBAR_PRESETS) {
    return NAVBAR_PRESETS[mapped];
  }
  return NAVBAR_PRESETS["nav-13"];
}
