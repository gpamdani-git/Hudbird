import type React from "react";
import type {
  BrandProfile,
  LandingAction,
  LandingNavigationLink,
  NavbarPresetId,
  NavbarVariant,
  NavbarCustomSettings,
} from "@hudbird/schemas";

export type { NavbarCustomSettings };

export type NavbarLayoutArchetype =
  "logo-left" | "logo-center" | "logo-right" | "split" | "two-row";

export type NavbarSurfaceStyle = "solid" | "glass" | "transparent" | "floating" | "overlay";

export type NavbarMobileMode = "drawer-left" | "drawer-right" | "top" | "fullscreen";

export interface NavbarCapabilities {
  sticky: boolean;
  scrollTransform: boolean;
  hideOnScroll: boolean;
  dropdown: boolean;
  megaMenu: boolean;
  mobileMode: NavbarMobileMode;
  activeSection: boolean;
}

export interface NavbarPresetMeta {
  id: NavbarPresetId;
  name: string;
  category: "saas" | "startup" | "creative" | "corporate" | "hospitality" | "services";
  description: string;
  layout: NavbarLayoutArchetype;
  surface: NavbarSurfaceStyle;
  capabilities: NavbarCapabilities;
  accentForegroundOverride?: string;
}

export interface NavbarMegaGroup {
  id: string;
  title: string;
  links: LandingNavigationLink[];
}

export interface NavbarFeaturedCard {
  title: string;
  description: string;
  badge?: string;
  action?: LandingAction;
  image?: string;
}

export interface NavbarProps {
  variant?: NavbarVariant;
  brand: BrandProfile;
  content: {
    action: LandingAction;
    links: LandingNavigationLink[];
    secondaryAction?: LandingAction;
    featuredCard?: NavbarFeaturedCard;
    announcement?: string;
  };
  brandContent?: React.ReactNode;
  endContent?: React.ReactNode;
  className?: string;
  enableScrollHide?: boolean;
  customSettings?: NavbarCustomSettings;
}
