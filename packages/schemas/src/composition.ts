export interface BrandProfile {
  id: string;
  name: string;
  logo?: { src: string; darkSrc?: string; alt: string };
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
  /** Optional mobile-specific crop artwork. */
  mobileSrc?: string;
  /** Optional dark mobile-specific crop artwork. */
  darkMobileSrc?: string;
  /** CSS object-position focal point (e.g. "center center", "top center", "50% 25%"). */
  focalPoint?: string;
  alt: string;
  caption?: string;
  /** Optional overlay headline shown on rich slideshow frames. */
  title?: string;
  /** Optional overlay subtitle shown on rich slideshow frames. */
  subtitle?: string;
  /** Optional CTA link & label rendered on the active slide. */
  action?: LandingAction;
}

export interface HeroContent {
  eyebrow?: string;
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

export interface HeroRemitGridConfig {
  variant: "remit-grid" | "fintech-remit";
  brandName?: string;
  navLinks?: { label: string; href: string }[];
  badgeText?: string;
  statValue?: string;
  statLabel?: string;
  chartBars?: number[];
  invoiceList?: { name: string; status: string; isPaid?: boolean }[];
  floatingReminder?: { tag: string; title: string; badge: string };
  featureCards?: {
    title: string;
    description: string;
    actionText?: string;
    actionHref?: string;
    imageSrc?: string;
  }[];
  metricCards?: {
    title: string;
    description: string;
    footerText?: string;
    footerHref?: string;
    imageSrc?: string;
  }[];
  backdropSrc?: string;
  backdropAlt?: string;
  credit?: { label: string; href?: string };
}

export interface HeroSplitSlide {
  id?: string;
  image: HeroImage;
  videoUrl?: string;
  badge?: string;
  quote?: string;
  author?: string;
  role?: string;
}

export type HeroSectionConfig =
  | {
      variant: "centered" | "split";
      image: HeroImage;
      slides?: HeroSplitSlide[];
      videoUrl?: string;
    }
  | { variant: "split-product"; image?: HeroImage; proof?: { label: string; sourceUrl: string } }
  | { variant: "center-canvas" | "center-video"; image?: HeroImage; videoUrl?: string }
  | {
      variant: "editorial-photo";
      image?: HeroImage & { portraitSrc?: string; focalPoint?: string };
      credit?: { label: string; href?: string };
    }
  | HeroRemitGridConfig
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
  hero:
    | "centered"
    | "split"
    | "interactive"
    | "slideshow"
    | "video"
    | "split-product"
    | "center-canvas"
    | "center-video"
    | "editorial-photo"
    | "remit-grid";
  logos: "row" | "intro-grid" | "ticker";
  benefits: "columns" | "visual-list" | "cards";
  features: "tabs" | "accordion" | "split";
  "how-it-works": "horizontal" | "vertical";
  integrations: "grid" | "grouped";
  testimonials: "single" | "featured" | "collection";
  pricing: "cards" | "comparison" | "highlight";
  faq: "single" | "grouped" | "columns";
  cta: "centered" | "split" | "banner" | "editorial-showcase";
  footer: "simple" | "columns" | "centered" | "locale-status" | "contact-action";
}

export interface SectionButtonSettings {
  variant?: "solid" | "bordered" | "flat" | "soft" | "outline" | "ghost";
  color?: "primary" | "secondary" | "dark" | "zinc" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  radius?: "none" | "md" | "lg" | "full";
}

export interface SectionHeadingSettings {
  size?: "display" | "h1" | "h2" | "h3" | "h4";
  tracking?: "stitch" | "tighter" | "tight" | "normal" | "wide";
  color?: "default" | "muted" | "primary";
  withDivider?: boolean;
}

export interface SectionTextSettings {
  variant?: "default" | "lead" | "muted" | "prose";
  weight?: "normal" | "medium" | "semibold";
  align?: "left" | "center" | "right";
}

export interface SectionMediaSettings {
  aspectRatio?: "auto" | "16/9" | "4/3" | "3/2" | "21/9" | "1/1";
  radius?: "none" | "md" | "lg" | "xl";
  hasBorder?: boolean;
  overlayGradient?: boolean;
  isZoomable?: boolean;
  focalPoint?:
    | "center"
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";
}

export interface SectionCardSettings {
  variant?: "shadow" | "bordered" | "flat";
  radius?: "none" | "md" | "lg" | "full";
  featuredIndex?: number;
}

export interface SectionBadgeSettings {
  variant?: "modern" | "solid" | "soft" | "outline" | "flat";
  color?: "primary" | "secondary" | "zinc" | "neutral" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  showPulseDot?: boolean;
}

export interface SectionGridSettings {
  columns?: "auto" | 1 | 2 | 3 | 4;
  gap?: "tight" | "normal" | "relaxed";
  align?: "stretch" | "start" | "center";
}

export interface SectionColorSettings {
  background?: string;
  foreground?: string;
  accent?: string;
  scrimColor?: string;
  scrimOpacity?: number;
  borderColor?: string;
}

export interface SectionVideoSettings {
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  grayscale?: boolean;
}

export interface SectionSlideshowSettings {
  autoplayMs?: number;
  transition?: "slide" | "fade" | "zoom";
  showIndicators?: boolean;
  showArrows?: boolean;
  loop?: boolean;
  pauseOnHover?: boolean;
  aspectRatio?: "auto" | "16/9" | "4/3" | "21/9";
}

export interface SectionMotionSettings {
  entrance?: "none" | "fade-up" | "stagger" | "blur-reveal" | "scale-in";
  durationMs?: number;
  staggerMs?: number;
  hoverEffect?: "none" | "lift" | "border-glow";
}

export interface SectionVisibilitySettings {
  hideDesktop?: boolean;
  hideTablet?: boolean;
  hideMobile?: boolean;
}

export interface SectionIllustrationSettings {
  mode?: "code" | "custom-image";
  presetVariant?: string;
  interactive?: boolean;
  accentTone?: "theme" | "indigo" | "emerald" | "amber" | "monochrome";
  badgeText?: string;
  titleText?: string;
  subtitleText?: string;
  metricValue?: string;
  showFloatingCallout?: boolean;
  customImage?: HeroImage;
}

export interface SectionAppearanceSettings {
  surface?: "default" | "muted" | "inverted" | "accent-subtle";
  paddingY?: "compact" | "normal" | "spacious";
  containerWidth?: "default" | "narrow" | "wide";
  align?: "left" | "center";
  badge?: string;
  anchorId?: string;
  button?: SectionButtonSettings;
  secondaryButton?: SectionButtonSettings;
  heading?: SectionHeadingSettings;
  text?: SectionTextSettings;
  media?: SectionMediaSettings;
  card?: SectionCardSettings;
  badgeStyle?: SectionBadgeSettings;
  grid?: SectionGridSettings;
  color?: SectionColorSettings;
  video?: SectionVideoSettings;
  slideshow?: SectionSlideshowSettings;
  illustration?: SectionIllustrationSettings;
  motion?: SectionMotionSettings;
  visibility?: SectionVisibilitySettings;
}

export type LandingSectionType = keyof LandingVariantMap;
export type LandingSectionSelection = {
  [K in LandingSectionType]: {
    type: K;
    variant: LandingVariantMap[K];
    enabled: boolean;
    customSettings?: K extends "navbar"
      ? NavbarCustomSettings
      : SectionAppearanceSettings & Record<string, unknown>;
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
  icon?: string;
  tags?: string[];
  image?: HeroImage;
  href?: string;
  eyebrow?: string;
  badge?: string;
  actionLabel?: string;
  actionHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}
export interface LandingFeature extends LandingItem {
  image: HeroImage;
  bullets?: string[];
  subSteps?: { id: string; label: string; badge?: string; description?: string }[];
}
export interface CtaEditorialConfig {
  videoCaptionLabel?: string;
  videoPromptLabel?: string;
  videoUrl?: string;
  videoTitle?: string;
  rating?: string;
  ratingSummary?: string;
  image?: HeroImage;
  avatars?: string[];
}
export interface LandingSectionContent {
  navbar: {
    action: LandingAction;
    links: LandingNavigationLink[];
  };
  hero: {
    content: HeroContent;
    variants: Record<
      Exclude<
        LandingVariantMap["hero"],
        "split-product" | "center-canvas" | "center-video" | "editorial-photo"
      >,
      HeroSectionConfig
    > &
      Partial<Record<"split-product", Extract<HeroSectionConfig, { variant: "split-product" }>>> &
      Partial<
        Record<
          "center-canvas",
          Extract<HeroSectionConfig, { variant: "center-canvas" | "center-video" }>
        >
      > &
      Partial<
        Record<
          "center-video",
          Extract<HeroSectionConfig, { variant: "center-canvas" | "center-video" }>
        >
      > &
      Partial<
        Record<"editorial-photo", Extract<HeroSectionConfig, { variant: "editorial-photo" }>>
      >;
  };
  logos: {
    title: string;
    description: string;
    items: string[];
    logo?: HeroImage;
    logoAssets?: { id: string; name: string; src?: string; darkSrc?: string; href?: string }[];
  };
  benefits: {
    title: string;
    description: string;
    items: LandingItem[];
    image: HeroImage;
    impactQuotes?: {
      id?: string;
      highlight?: string;
      quote: string;
      author: string;
      role?: string;
    }[];
  };
  features: { title: string; description: string; items: LandingFeature[] };
  "how-it-works": {
    title: string;
    description: string;
    items: LandingFeature[];
    media?: HeroImage;
  };
  integrations: {
    title: string;
    description: string;
    items: (LandingItem & { category: string })[];
  };
  testimonials: {
    title: string;
    description: string;
    items: {
      id: string;
      quote: string;
      source: string;
      context: string;
      avatar?: string;
      image?: string;
      videoUrl?: string;
      videoDuration?: string;
      rating?: string;
      date?: string;
      signature?: string;
    }[];
    metrics?: { label: string; value: string }[];
    featuredAction?: LandingAction;
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
      badge?: string;
      icon?: string;
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
  cta: {
    eyebrow?: string;
    title: string;
    description: string;
    action: LandingAction;
    secondaryAction?: LandingAction;
    benefits: string[];
    editorial?: CtaEditorialConfig;
  };
  footer: {
    description: string;
    note: string;
    groups: { title: string; links: LandingFooterLink[] }[];
    /** Obsidian 18-03: Locale options for multi-lingual footer */
    locales?: { code: string; label: string; href?: string }[];
    /** Obsidian 18-03: Currently active locale */
    activeLocale?: string;
    /** Obsidian 18-03: Service status metadata and target */
    status?: { label: string; href?: string; summary?: string; checkedAt?: string };
    /** Obsidian 18-04: Contact heading */
    heading?: string;
    /** Obsidian 18-04: Primary booking or next action */
    contactAction?: LandingAction;
    /** Obsidian 18-04: Contact channels (email, phone, schedule) */
    contactLinks?: {
      type?: "email" | "phone" | "schedule" | "chat";
      label: string;
      href: string;
    }[];
    /** Obsidian 18-04: Operating office hours with timezone */
    officeHours?: string;
    /** Concise legal and policy links */
    legalLinks?: { label: string; href: string }[];
  };
}

export interface LandingSectionProps<K extends LandingSectionType> {
  variant: LandingVariantMap[K];
  content: LandingSectionContent[K];
}

export type SectionVisualKind =
  | "none"
  | "single-image"
  | "slideshow"
  | "video"
  | "interactive-tabs"
  | "code-illustration"
  | "remit-dashboard";

export type ManifestFieldWidgetType =
  | "text"
  | "textarea"
  | "badge"
  | "button-action"
  | "link"
  | "image"
  | "slideshow"
  | "video"
  | "icon"
  | "select"
  | "switch"
  | "color"
  | "code-illustration"
  | "comparison-matrix";

export type ManifestCoreNodeKind =
  | "section"
  | "heading"
  | "text"
  | "primary-button"
  | "secondary-button"
  | "media"
  | "card"
  | "badge"
  | "items"
  | "grid"
  | "links"
  | "brand";

export interface SectionVariantCapabilities {
  hasEyebrow: boolean;
  hasHeading: boolean;
  hasDescription: boolean;
  hasPrimaryButton: boolean;
  hasSecondaryButton: boolean;
  hasGridLayout: boolean;
  hasCardSurface: boolean;
  hasItems: boolean;
  hasIcons: boolean;
  eyebrowSource?: "content.eyebrow" | "appearance.badge";
}

export interface ManifestFieldDef {
  id: string;
  label: string;
  widget: ManifestFieldWidgetType;
  bindPath: string;
  coreNode: ManifestCoreNodeKind;
  group: "content" | "visual" | "actions" | "style" | "advanced";
  placeholder?: string;
  options?: { label: string; value: string }[];
}

export interface ManifestBlockDef {
  type: string;
  label: string;
  arrayBindPath: string;
  itemSelectNode: ManifestCoreNodeKind;
  fields: ManifestFieldDef[];
}

export interface SectionVariantManifest {
  sectionType: LandingSectionType | string;
  variantId: string;
  label: string;
  capabilities: SectionVariantCapabilities;
  visual: {
    kind: SectionVisualKind;
    canOverrideWithImage?: boolean;
    codeIllustrationId?:
      | "product-canvas"
      | "workflow-wireframe-3d"
      | "feature-code-cards"
      | "phone-mockup-stack"
      | "remit-metrics";
    presets?: { id: string; label: string }[];
  };
  settings: ManifestFieldDef[];
  blocks?: ManifestBlockDef[];
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

export type WebsiteSurfaceBase = "zinc" | "slate" | "neutral" | "stone" | "obsidian";

export interface WebsiteDesignTokens {
  surfaceBase: WebsiteSurfaceBase;
  secondaryColor?: string;
  customColors?: {
    bg?: string;
    surface?: string;
    ink?: string;
    muted?: string;
    border?: string;
  };
  semantic?: {
    success?: string;
    warning?: string;
    danger?: string;
  };
  typography?: {
    headingFont?: string;
    headingGoogleFont?: string;
    bodyFont?: string;
    bodyGoogleFont?: string;
    monoFont?: string;
    monoGoogleFont?: string;
    scale?: "compact" | "default" | "expressive";
    tracking?: "tight" | "normal" | "wide";
  };
  shape?: {
    radiusPx?: number;
    borderStyle?: "subtle" | "crisp" | "hairline";
    elevation?: "flat" | "soft" | "layered";
  };
  spacing?: {
    containerWidth?: "narrow" | "standard" | "wide" | "full";
    sectionPadding?: "compact" | "comfortable" | "spacious";
  };
}

export type WebsiteLinkTarget =
  | { kind: "page"; pageId: string; sectionAnchor?: string }
  | { kind: "section"; section: LandingSectionType }
  | { kind: "external"; href: string; openInNewTab?: boolean };

export interface WebsiteNavItem {
  id: string;
  label: string;
  description?: string;
  target: WebsiteLinkTarget;
}

export interface WebsiteAnnouncementConfig {
  enabled: boolean;
  badge?: string;
  text: string;
  linkLabel?: string;
  target?: WebsiteLinkTarget;
}

export interface WebsiteAuthConfig {
  loginHeading?: string;
  loginDescription?: string;
  loginSubmitLabel?: string;
  signupHeading?: string;
  signupDescription?: string;
  recoveryHeading?: string;
  recoveryDescription?: string;
  socialProviders?: {
    google?: boolean;
    github?: boolean;
    sso?: boolean;
  };
  postAuthPageId?: string | null;
  forgotPasswordPageId?: string | null;
  termsPageId?: string | null;
  privacyPageId?: string | null;
}

export type WebsiteDashboardBlockType =
  "app-shell" | "page-header" | "kpi-metrics" | "primary-panel" | "data-table" | "status-footer";

export interface WebsiteDashboardBlockConfig {
  id: string;
  type: WebsiteDashboardBlockType;
  variant: string;
  title: string;
  enabled: boolean;
}

export interface WebsiteDashboardConfig {
  appTitle: string;
  welcomeSubtitle: string;
  category: "dashboards" | "dashboards-stacked" | "settings" | "informational";
  sidebarLinks: { id: string; label: string; target: WebsiteLinkTarget }[];
  backToSiteLabel: string;
  backToSitePageId: string | null;
  blocks: WebsiteDashboardBlockConfig[];
}

export interface WebsiteNotFoundConfig {
  code: string;
  title: string;
  description: string;
  primaryActionLabel: string;
  primaryActionTarget: WebsiteLinkTarget;
  secondaryActionLabel?: string;
  secondaryActionTarget?: WebsiteLinkTarget;
  showQuickLinks: boolean;
}

export interface WebsitePageSeo {
  title?: string;
  description?: string;
}
