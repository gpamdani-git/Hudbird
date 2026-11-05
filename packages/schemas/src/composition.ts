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

export interface LandingVariantMap {
  navbar: "simple" | "mega";
  hero: "centered" | "split" | "interactive" | "slideshow" | "video";
  logos: "row" | "intro-grid" | "ticker";
  benefits: "columns" | "visual-list";
  features: "tabs" | "accordion" | "split";
  "how-it-works": "horizontal" | "vertical";
  integrations: "grid" | "grouped";
  testimonials: "featured" | "collection";
  pricing: "cards" | "comparison";
  faq: "single" | "grouped";
  cta: "centered" | "split";
  footer: "simple" | "columns";
}

export type LandingSectionType = keyof LandingVariantMap;
export type LandingSectionSelection = {
  [K in LandingSectionType]: { type: K; variant: LandingVariantMap[K]; enabled: boolean };
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
