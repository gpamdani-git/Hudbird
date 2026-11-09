import type { BrandProfile, LandingPageConfig } from "./composition";

export type HudbirdBlueprintDomain = "application-ui" | "shared-pages" | "marketing";

export type HudbirdArchitectureLayerId =
  "base-ui" | "ui-organisms" | "domain-blocks" | "page-examples";

export interface HudbirdArchitectureLayer {
  id: HudbirdArchitectureLayerId;
  title: string;
  subtitle: string;
  description: string;
  packageName: "@hudbird/ui" | "@hudbird/marketing" | "@hudbird/schemas";
  primitives: string[];
}

export type ApplicationExampleCategorySlug =
  | "dashboards"
  | "dashboards-stacked"
  | "settings"
  | "settings-stacked"
  | "informational"
  | "informational-stacked";

export type ApplicationBlockSlotType =
  "app-shell" | "page-header" | "kpi-metrics" | "primary-panel" | "data-table" | "status-footer";

export interface ApplicationBlockVariantMap {
  "app-shell": "sidebar-dual" | "sidebar-slim" | "stacked-top";
  "page-header": "breadcrumbs-actions" | "tabs-toolbar" | "command-search";
  "kpi-metrics": "sparkline-cards" | "compact-strip" | "goal-progress";
  "primary-panel": "revenue-analytics" | "workspace-settings" | "crm-inspector";
  "data-table": "customer-directory" | "team-permissions" | "audit-stream";
  "status-footer": "pagination-summary" | "system-telemetry";
}

export type ApplicationBlockSelection = {
  [K in ApplicationBlockSlotType]: {
    type: K;
    variant: ApplicationBlockVariantMap[K];
    enabled: boolean;
  };
}[ApplicationBlockSlotType];

export interface ApplicationExampleVariant {
  id: string;
  name: string;
  description: string;
  shell: ApplicationBlockVariantMap["app-shell"];
  basePrimitives: string[];
  uiComponents: string[];
  defaultBlocks: ApplicationBlockSelection[];
}

export interface ApplicationExampleCategory {
  slug: ApplicationExampleCategorySlug;
  title: string;
  badge: string;
  navigationStyle: "sidebar" | "stacked";
  description: string;
  basePrimitives: string[];
  uiComponents: string[];
  variants: ApplicationExampleVariant[];
}

export type SharedPageCategorySlug =
  "login" | "signup" | "verification" | "forgot-password" | "404" | "email-templates";

export type SharedBlockSlotType =
  "brand-bar" | "core-flow" | "social-auth" | "trust-aside" | "support-footer";

export interface SharedBlockVariantMap {
  "brand-bar": "minimal-logo" | "back-link-bar";
  "core-flow":
    | "login-form"
    | "signup-form"
    | "otp-verification"
    | "password-recovery"
    | "error-404"
    | "transactional-email";
  "social-auth": "oauth-buttons" | "sso-enterprise" | "hidden";
  "trust-aside": "none" | "telemetry-preview" | "editorial-quote" | "documentation-links";
  "support-footer": "compact-legal" | "help-links";
}

export type SharedBlockSelection = {
  [K in SharedBlockSlotType]: {
    type: K;
    variant: SharedBlockVariantMap[K];
    enabled: boolean;
  };
}[SharedBlockSlotType];

export interface SharedPageVariant {
  id: string;
  name: string;
  description: string;
  layout: "centered" | "split" | "email-frame";
  basePrimitives: string[];
  uiComponents: string[];
  defaultBlocks: SharedBlockSelection[];
}

export interface SharedPageCategory {
  slug: SharedPageCategorySlug;
  title: string;
  badge: string;
  sharedBetween: ("application-ui" | "marketing")[];
  description: string;
  basePrimitives: string[];
  uiComponents: string[];
  variants: SharedPageVariant[];
}

export type MarketingComponentCategorySlug =
  | "header-navigations"
  | "hero-sections"
  | "social-proof"
  | "benefits-sections"
  | "features-sections"
  | "how-it-works"
  | "metrics-sections"
  | "pricing-sections"
  | "testimonial-sections"
  | "faq-sections"
  | "cta-sections"
  | "newsletter-sections"
  | "team-sections"
  | "careers-sections"
  | "contact-sections"
  | "blog-sections"
  | "banners"
  | "footers";

export interface MarketingComponentCategoryItem {
  slug: MarketingComponentCategorySlug;
  title: string;
  countLabel: string;
  description: string;
  hudbirdExport: string;
  basePrimitives: string[];
  uiComponents: string[];
  variants: { id: string; name: string; description: string }[];
}

export type MarketingExampleCategorySlug =
  | "landing-pages"
  | "pricing-pages"
  | "about-pages"
  | "contact-pages"
  | "blog-pages"
  | "blog-post-pages"
  | "faq-pages"
  | "team-pages"
  | "legal-pages"
  | "404-pages";

export type MarketingExtendedBlockType =
  | "banner"
  | "navbar"
  | "hero"
  | "logos"
  | "metrics"
  | "benefits"
  | "features"
  | "how-it-works"
  | "integrations"
  | "team"
  | "careers"
  | "blog"
  | "contact"
  | "legal"
  | "testimonials"
  | "pricing"
  | "faq"
  | "newsletter"
  | "cta"
  | "footer";

export interface MarketingExtendedBlockSelection {
  type: MarketingExtendedBlockType;
  variant: string;
  enabled: boolean;
}

export interface MarketingExamplePageDefinition {
  slug: MarketingExampleCategorySlug;
  title: string;
  badge: string;
  description: string;
  basePrimitives: string[];
  uiComponents: string[];
  defaultBlocks: MarketingExtendedBlockSelection[];
}

export interface HudbirdStudioBuilderConfig {
  version: 1;
  domain: HudbirdBlueprintDomain;
  brand: BrandProfile;
  themeMode: "auto" | "light" | "dark";
  application: {
    category: ApplicationExampleCategorySlug;
    variantId: string;
    blocks: ApplicationBlockSelection[];
  };
  shared: {
    category: SharedPageCategorySlug;
    variantId: string;
    blocks: SharedBlockSelection[];
  };
  marketing: {
    exampleSlug: MarketingExampleCategorySlug;
    landingConfig: LandingPageConfig;
    extendedBlocks: MarketingExtendedBlockSelection[];
  };
}

export interface HudbirdStudioRecipe {
  schema: "hudbird.studio.recipe";
  schemaVersion: 1;
  registryVersion: string;
  generatedAt: string;
  config: HudbirdStudioBuilderConfig;
}
