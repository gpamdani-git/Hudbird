export interface BrandProfile {
  id: string;
  name: string;
  logo?: { src: string; alt: string };
  primary: string;
  fontFamily: string;
  /** Optional Google Fonts family to load; omit for local or self-hosted fonts. */
  googleFont?: string;
  radius: "square" | "soft" | "round";
  density: "comfortable" | "compact";
  mode: "light" | "dark";
  referenceUrl?: string;
}

export interface HeroImage {
  src: string;
  /** Optional dark artwork; the original asset is retained when not provided. */
  darkSrc?: string;
  alt: string;
  caption?: string;
}

export interface HeroContent {
  title: string;
  description: string;
  primaryAction: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
}

export interface ProductDemoTab {
  id: string;
  label: string;
  title: string;
  description: string;
  items: string[];
}

export type HeroSectionConfig =
  | { variant: "centered" | "split"; image: HeroImage }
  | { variant: "slideshow"; slides: HeroImage[] }
  | { variant: "video"; video: { src: string; poster: HeroImage } }
  | { variant: "interactive"; tabs: ProductDemoTab[] };

export type PromotionalSectionId = "benefits" | "demo" | "faq" | "cta";

export interface PageComposition {
  id: "story-first" | "product-first";
  name: string;
  rationale: string;
  hero: HeroSectionConfig;
  sections: PromotionalSectionId[];
}

export interface StartupPageContent {
  hero: HeroContent;
  benefitsTitle: string;
  benefits: { title: string; description: string }[];
  demo: { title: string; description: string; tabs: ProductDemoTab[] };
  faq: { question: string; answer: string }[];
  faqTitle: string;
  cta: { title: string; description: string; action: { label: string; href: string } };
  footer: string;
}

export type NavbarPresetId =
  | "nav-01"
  | "nav-02"
  | "nav-03"
  | "nav-04"
  | "nav-05"
  | "nav-06"
  | "nav-07"
  | "nav-08"
  | "nav-09"
  | "nav-10"
  | "nav-11"
  | "nav-12"
  | "nav-13";

export type LegacyNavbarVariant =
  "simple" | "mega" | "centered" | "sidebar-1" | "sidebar-2" | "modern-mini";

export type NavbarVariant = NavbarPresetId | LegacyNavbarVariant;

export interface NavbarCustomSettings {
  surface?: "preset" | "solid" | "transparent" | "glass";
  backgroundColor?: string;
  borderColor?: string;
  hasBorder?: boolean;
  hasShadow?: boolean;
  containerWidth?: "compact" | "standard" | "wide" | "floating" | "full";
  paddingY?: "none" | "compact" | "default" | "spacious";
  paddingX?: "none" | "compact" | "default" | "spacious";
  heroClearance?: "none" | "compact" | "default" | "generous";
  showCta?: boolean;
  showSocialIcons?: boolean;
  navigationStyle?: "links" | "mega" | "drawer-only";
  layoutAlignment?:
    | "default"
    | "logo-left-links-center-cta-right"
    | "logo-left-links-left-cta-right"
    | "logo-center-split-links"
    | "logo-right-asymmetric";
}

export interface LandingVariantMap {
  navbar: NavbarVariant;
  hero: "centered" | "split" | "interactive" | "slideshow" | "video";
  logos: "row" | "intro-grid" | "ticker";
  benefits: "columns" | "visual-list" | "cards";
  features: "tabs" | "accordion" | "split";
  "how-it-works": "horizontal" | "vertical";
  integrations: "grid" | "grouped";
  testimonials: "featured" | "collection";
  pricing: "cards" | "comparison" | "highlight";
  faq: "single" | "grouped" | "columns";
  cta: "centered" | "split" | "banner";
  footer: "simple" | "columns" | "centered";
}

export type LandingSectionType = keyof LandingVariantMap;
export type LandingSectionSelection = {
  [K in LandingSectionType]: {
    type: K;
    variant: LandingVariantMap[K];
    enabled: boolean;
    customSettings?: K extends "navbar" ? NavbarCustomSettings : Record<string, unknown>;
  };
}[LandingSectionType];

export interface LandingPageConfig {
  version: 1;
  brand: BrandProfile;
  themeMode: "auto" | "light" | "dark";
  motion?: LandingMotionProfile;
  sections: LandingSectionSelection[];
}

export interface LandingMotionProfile {
  reveal: "off" | "subtle";
  autoplay: boolean;
  smoothScroll: boolean;
}

export interface LandingAction {
  label: string;
  href: string;
}

export type LandingNavigationLink =
  | {
      label: string;
      target: LandingSectionType;
      href?: never;
      description: string;
    }
  | {
      label: string;
      href: string;
      target?: never;
      description: string;
    };

export type LandingFooterLink =
  | { label: string; target: LandingSectionType; href?: never }
  | { label: string; href: string; target?: never };

export interface LandingItem {
  id: string;
  title: string;
  description: string;
}
export interface LandingFeature extends LandingItem {
  image: HeroImage;
}
export interface LandingSectionContent {
  navbar: {
    action: LandingAction;
    links: LandingNavigationLink[];
  };
  hero: { content: HeroContent; variants: Record<LandingVariantMap["hero"], HeroSectionConfig> };
  logos: { title: string; description: string; items: string[]; logo?: HeroImage };
  benefits: { title: string; description: string; items: LandingItem[]; image: HeroImage };
  features: { title: string; description: string; items: LandingFeature[] };
  "how-it-works": { title: string; description: string; items: LandingFeature[] };
  integrations: {
    title: string;
    description: string;
    items: (LandingItem & { category: string })[];
  };
  testimonials: {
    title: string;
    description: string;
    items: { id: string; quote: string; source: string; context: string }[];
  };
  pricing: {
    title: string;
    description: string;
    plans: {
      id: string;
      name: string;
      price: string;
      period: string;
      description: string;
      features: string[];
      action: LandingAction;
    }[];
    comparisons: { label: string; values: string[] }[];
  };
  faq: {
    title: string;
    description: string;
    items: { id: string; question: string; answer: string; group: string }[];
  };
  cta: { title: string; description: string; action: LandingAction; benefits: string[] };
  footer: {
    description: string;
    note: string;
    groups: { title: string; links: LandingFooterLink[] }[];
  };
}

export interface LandingSectionProps<K extends LandingSectionType> {
  variant: LandingVariantMap[K];
  content: LandingSectionContent[K];
}

export interface LandingSectionDefinition<K extends LandingSectionType = LandingSectionType> {
  type: K;
  title: string;
  description: string;
  variants: { id: LandingVariantMap[K]; name: string; description: string }[];
  additionalVariants?: { id: LandingVariantMap[K]; name: string; description: string }[];
  coreComponents: string[];
}

export interface LandingPageRecipe {
  schema: "hudbird.landing.recipe";
  schemaVersion: 1;
  registryVersion: string;
  generatedAt: string;
  config: LandingPageConfig;
  content: LandingSectionContent;
}
