import type {
  BrandProfile,
  LandingPageConfig,
  LandingSectionContent,
  LandingSectionSelection,
  LandingSectionType,
  NavbarCustomSettings,
  SectionAppearanceSettings,
  WebsiteAnnouncementConfig,
  WebsiteAuthConfig,
  WebsiteDashboardBlockConfig,
  WebsiteDashboardConfig,
  WebsiteDesignTokens,
  WebsiteLinkTarget,
  WebsiteNavItem,
  WebsiteNotFoundConfig,
  WebsitePageSeo,
} from "@hudbird/schemas";
import { createLandingPageConfig, parseLandingPageConfig } from "../LandingPage/config";
import { formaLandingContent } from "../LandingPage/data";
import { brandCssVarsRecord } from "../HeroSection/brand";
import { defaultSplitSlides } from "../HeroSection/SplitIntroductionHero";
import { DEFAULT_CONTACT_CHANNELS, DEFAULT_CONTACT_OFFICES } from "../ContactSection";
import { DEFAULT_BLOG_POSTS } from "../BlogSection";
import {
  DEFAULT_PRICING_COMPARE_PLANS,
  DEFAULT_PRICING_COMPARE_GROUPS,
} from "../PricingCompareSection";
import {
  DEFAULT_EXPERTS,
  DEFAULT_VALUES,
  DEFAULT_CTA_AVATARS,
  DEFAULT_CTA_IMAGE,
  DEFAULT_CTA_VIDEO,
} from "../AboutUsSection";

export const websiteTemplates = [
  {
    id: "home",
    name: "Landing page",
    group: "Website",
    description: "A complete page built from sections.",
    path: "/home",
  },
  {
    id: "pricing",
    name: "Pricing",
    group: "Website",
    description: "Plans, questions, and a clear next step.",
    path: "/pricing",
  },
  {
    id: "about",
    name: "About",
    group: "Website",
    description: "Introduce your product and how it works.",
    path: "/about",
  },
  {
    id: "blog",
    name: "Blog",
    group: "Website",
    description: "Editorial journal with search, filters, and featured articles.",
    path: "/blog",
  },
  {
    id: "blog-post",
    name: "Single Post",
    group: "Website",
    description: "Long-form article view with quotes, related posts, and comments.",
    path: "/blog/post",
  },
  {
    id: "contact",
    name: "Contact",
    group: "Website",
    description: "Inquiry form, studio maps, detailed addresses, and booking calendar.",
    path: "/contact",
  },
  {
    id: "legal",
    name: "Legal",
    group: "Website",
    description: "Privacy policy, terms, cookie preferences, and data rights.",
    path: "/legal",
  },
  {
    id: "blank",
    name: "Blank page",
    group: "Website",
    description: "Choose the sections you need.",
    path: "/untitled",
  },
  {
    id: "login",
    name: "Log in",
    group: "Account",
    description: "Social sign-in and email credentials.",
    path: "/login",
  },
  {
    id: "signup",
    name: "Sign up",
    group: "Account",
    description: "A simple account creation form.",
    path: "/signup",
  },
  {
    id: "recovery",
    name: "Forgot password",
    group: "Account",
    description: "Help people recover their account.",
    path: "/forgot-password",
  },
  {
    id: "dashboard",
    name: "Overview",
    group: "Dashboard",
    description: "A dashboard with sample metrics and data.",
    path: "/app",
  },
  {
    id: "not-found",
    name: "404",
    group: "System",
    description: "Help visitors find their way back.",
    path: "/404",
  },
] as const;
export type WebsiteTemplate = (typeof websiteTemplates)[number]["id"];

export type AboutSectionId =
  "about" | "who-are-we" | "our-team" | "meet-our-expert" | "values" | "editorial-cta";

export interface AboutSectionState {
  id: AboutSectionId;
  enabled: boolean;
}

export interface AboutSectionDefinition extends AboutSectionState {
  title: string;
  variant: string;
}

export const aboutSectionRegistry: ReadonlyArray<{
  id: AboutSectionId;
  title: string;
  variant: string;
}> = [
  { id: "about", title: "About Us", variant: "video-hero" },
  { id: "who-are-we", title: "Who Are We", variant: "metrics-split" },
  { id: "our-team", title: "Our Team", variant: "team-photo" },
  { id: "meet-our-expert", title: "Meet Our Expert", variant: "experts-grid" },
  { id: "values", title: "Values", variant: "bento-hover" },
  { id: "editorial-cta", title: "CTA Section", variant: "editorial-showcase" },
];

export type ContactSectionId = "contact-mail" | "contact-form-call" | "contact-locations";

export interface ContactSectionState {
  id: ContactSectionId;
  enabled: boolean;
}

export interface ContactSectionDefinition extends ContactSectionState {
  title: string;
  variant: string;
}

export const contactSectionRegistry: ReadonlyArray<{
  id: ContactSectionId;
  title: string;
  variant: string;
}> = [
  { id: "contact-mail", title: "Contact Mail", variant: "direct-channels" },
  { id: "contact-form-call", title: "Form & Call", variant: "inquiry-scheduler" },
  { id: "contact-locations", title: "Location with Map", variant: "office-map" },
];

export type LegalSectionId = "legal-hero" | "legal-reader" | "legal-preferences";

export interface LegalSectionState {
  id: LegalSectionId;
  enabled: boolean;
}

export interface LegalSectionDefinition extends LegalSectionState {
  title: string;
  variant: string;
}

export const legalSectionRegistry: ReadonlyArray<{
  id: LegalSectionId;
  title: string;
  variant: string;
}> = [
  { id: "legal-hero", title: "Document Switcher", variant: "version-tabs" },
  { id: "legal-reader", title: "Clause Reader & ToC", variant: "sticky-toc" },
  { id: "legal-preferences", title: "Consent & DSAR", variant: "consent-dsar" },
];

export interface WebsitePageSharedMode {
  navbar?: "inherit" | "hidden" | "custom";
  footer?: "inherit" | "hidden" | "custom";
}

export interface WebsitePageSharedOverrides {
  navbar?: Record<string, unknown>;
  navbarSettings?: NavbarCustomSettings;
  footer?: Record<string, unknown>;
  footerSettings?: SectionAppearanceSettings;
}

export interface WebsiteSectionLinksOverride {
  primaryAction?: WebsiteLinkTarget;
  secondaryAction?: WebsiteLinkTarget;
}

export const MODULAR_SECTION_SCOPES = new Set<string>([
  "about",
  "who-are-we",
  "our-team",
  "meet-our-expert",
  "values",
  "editorial-cta",
  "pricing-compare",
  "contact-mail",
  "contact-form-call",
  "contact-locations",
  "legal-hero",
  "legal-reader",
  "legal-preferences",
  "blog-index",
  "blog-post",
]);

export interface WebsitePage {
  id: string;
  name: string;
  path: string;
  template: WebsiteTemplate;
  sections: LandingSectionSelection[];
  sharedMode?: WebsitePageSharedMode;
  sharedOverrides?: WebsitePageSharedOverrides;
  contentOverrides?: Partial<Record<LandingSectionType, Record<string, unknown>>>;
  modularOverrides?: Partial<Record<string, Record<string, unknown>>>;
  modularSettings?: Partial<Record<string, SectionAppearanceSettings>>;
  sectionLinks?: Partial<Record<LandingSectionType, WebsiteSectionLinksOverride>>;
  seo?: WebsitePageSeo;
  aboutSections?: AboutSectionState[];
  contactSections?: ContactSectionState[];
  legalSections?: LegalSectionState[];
  pricingCompareEnabled?: boolean;
  authLayout: "split" | "centered";
}

function resolveSectionGroup<TId extends string>(
  registry: ReadonlyArray<{ id: TId; title: string; variant: string }>,
  items?: ReadonlyArray<{ id: TId; enabled: boolean }>
): Array<{ id: TId; title: string; variant: string; enabled: boolean }> {
  const stateById = new Map((items ?? []).map((item) => [item.id, item.enabled]));
  return registry.map((item) => ({
    ...item,
    enabled: stateById.get(item.id) ?? true,
  }));
}

function toggleSectionGroupItem<TId extends string>(
  registry: ReadonlyArray<{ id: TId; title: string; variant: string }>,
  items: ReadonlyArray<{ id: TId; enabled: boolean }> | undefined,
  id: TId,
  enabled: boolean
): Array<{ id: TId; enabled: boolean }> {
  return resolveSectionGroup(registry, items).map((item) => ({
    id: item.id,
    enabled: item.id === id ? enabled : item.enabled,
  }));
}

export function isPricingCompareEnabled(page: WebsitePage): boolean {
  return page.template === "pricing" && (page.pricingCompareEnabled ?? true);
}

export function togglePricingCompareSection(page: WebsitePage, enabled: boolean): WebsitePage {
  if (page.template !== "pricing") return page;
  return {
    ...page,
    pricingCompareEnabled: enabled,
  };
}

export function getAboutPageSections(page: WebsitePage): AboutSectionDefinition[] {
  if (page.template !== "about") return [];
  return resolveSectionGroup(aboutSectionRegistry, page.aboutSections);
}

export function toggleAboutPageSection(
  page: WebsitePage,
  id: AboutSectionId,
  enabled: boolean
): WebsitePage {
  if (page.template !== "about") return page;
  return {
    ...page,
    aboutSections: toggleSectionGroupItem(aboutSectionRegistry, page.aboutSections, id, enabled),
  };
}

export function getContactPageSections(page: WebsitePage): ContactSectionDefinition[] {
  if (page.template !== "contact") return [];
  return resolveSectionGroup(contactSectionRegistry, page.contactSections);
}

export function toggleContactPageSection(
  page: WebsitePage,
  id: ContactSectionId,
  enabled: boolean
): WebsitePage {
  if (page.template !== "contact") return page;
  return {
    ...page,
    contactSections: toggleSectionGroupItem(
      contactSectionRegistry,
      page.contactSections,
      id,
      enabled
    ),
  };
}

export function getLegalPageSections(page: WebsitePage): LegalSectionDefinition[] {
  if (page.template !== "legal") return [];
  return resolveSectionGroup(legalSectionRegistry, page.legalSections);
}

export function toggleLegalPageSection(
  page: WebsitePage,
  id: LegalSectionId,
  enabled: boolean
): WebsitePage {
  if (page.template !== "legal") return page;
  return {
    ...page,
    legalSections: toggleSectionGroupItem(legalSectionRegistry, page.legalSections, id, enabled),
  };
}
export interface WebsiteSharedNavbarConfig {
  selection: Extract<LandingSectionSelection, { type: "navbar" }>;
  items?: WebsiteNavItem[];
  actionLabel?: string;
  actionTarget?: WebsiteLinkTarget | null;
}

export interface WebsiteSharedFooterConfig {
  selection: Extract<LandingSectionSelection, { type: "footer" }>;
  heading?: string;
  description?: string;
  note?: string;
  contactAction?: { label: string; href: string };
  contactLinks?: {
    type?: "email" | "phone" | "schedule" | "chat";
    label: string;
    href: string;
  }[];
  officeHours?: string;
  status?: {
    label: string;
    href: string;
    summary?: string;
    checkedAt?: string;
  };
  locales?: {
    code: string;
    label: string;
    href: string;
  }[];
  activeLocale?: string;
  groups?: {
    title: string;
    links: { label: string; target: WebsiteLinkTarget }[];
  }[];
  legalLinks?: { label: string; target: WebsiteLinkTarget }[];
}

export interface WebsiteSharedSections {
  announcement?: WebsiteAnnouncementConfig;
  navbar?: WebsiteSharedNavbarConfig;
  footer?: WebsiteSharedFooterConfig;
}

export interface WebsiteProjectConfig {
  version: 1;
  name: string;
  brand: LandingPageConfig["brand"];
  themeMode: LandingPageConfig["themeMode"];
  motion?: LandingPageConfig["motion"];
  tokens?: WebsiteDesignTokens;
  shared?: WebsiteSharedSections;
  contentOverrides?: Partial<Record<LandingSectionType, Record<string, unknown>>>;
  authConfig?: WebsiteAuthConfig;
  dashboardConfig?: WebsiteDashboardConfig;
  notFoundConfig?: WebsiteNotFoundConfig;
  pages: WebsitePage[];
  activePageId: string;
  navigation: string[];
  primaryActionPageId: string | null;
  customFiles?: Record<string, string>;
}
export function createWebsiteProject(landing = createLandingPageConfig()): WebsiteProjectConfig {
  return {
    version: 1,
    name: "My workspace",
    brand: landing.brand,
    themeMode: landing.themeMode,
    motion: landing.motion,
    pages: [
      {
        id: "home",
        name: "Home",
        path: "/",
        template: "home",
        sections: landing.sections,
        authLayout: "split",
      },
    ],
    activePageId: "home",
    navigation: [],
    primaryActionPageId: null,
  };
}
export function pageConfig(project: WebsiteProjectConfig, page: WebsitePage): LandingPageConfig {
  return {
    version: 1,
    brand: project.brand,
    themeMode: project.themeMode,
    motion: project.motion,
    sections: page.sections,
  };
}
export function isSectionPage(page: WebsitePage) {
  return ["home", "pricing", "about", "blog", "blog-post", "contact", "legal", "blank"].includes(
    page.template
  );
}
export function normalizePagePath(path: string): string | undefined {
  const value = path.trim();
  if (!/^\/[a-zA-Z0-9\-_/]*$/.test(value) || value.includes("//")) return;
  return value.toLowerCase().replace(/\/+$/, "") || "/";
}
function availablePath(project: WebsiteProjectConfig, base: string) {
  let path = base;
  for (let n = 2; project.pages.some((p) => p.path === path); n++) path = `${base}-${n}`;
  return path;
}
export function addWebsitePage(
  project: WebsiteProjectConfig,
  template: WebsiteTemplate,
  id: string
): WebsiteProjectConfig {
  if (project.pages.some((p) => p.id === id)) return project;
  const meta = websiteTemplates.find((t) => t.id === template)!;
  const selection = createLandingPageConfig().sections;
  const enabled =
    template === "pricing"
      ? ["navbar", "pricing", "faq", "cta", "footer"]
      : template === "about"
        ? ["navbar", "benefits", "how-it-works", "footer"]
        : template === "blog" ||
            template === "blog-post" ||
            template === "contact" ||
            template === "legal"
          ? ["navbar", "footer"]
          : template === "blank"
            ? []
            : null;
  const page: WebsitePage = {
    id,
    name: meta.name,
    path: availablePath(project, meta.path),
    template,
    sections: selection.map((s) => ({
      ...s,
      enabled: enabled ? enabled.includes(s.type) : s.enabled,
    })),
    ...(template === "about"
      ? {
          aboutSections: aboutSectionRegistry.map((item) => ({
            id: item.id,
            enabled: true,
          })),
        }
      : {}),
    ...(template === "contact"
      ? {
          contactSections: contactSectionRegistry.map((item) => ({
            id: item.id,
            enabled: true,
          })),
        }
      : {}),
    ...(template === "legal"
      ? {
          legalSections: legalSectionRegistry.map((item) => ({
            id: item.id,
            enabled: true,
          })),
        }
      : {}),
    authLayout: "split",
  };
  return { ...project, pages: [...project.pages, page], activePageId: id };
}
export function duplicateWebsitePage(project: WebsiteProjectConfig, id: string, newId: string) {
  const source = project.pages.find((p) => p.id === id);
  if (!source || project.pages.some((p) => p.id === newId)) return project;
  const page = {
    ...structuredClone(source),
    id: newId,
    name: `${source.name} copy`,
    path: availablePath(project, source.path === "/" ? "/home-copy" : `${source.path}-copy`),
  };
  return { ...project, pages: [...project.pages, page], activePageId: newId };
}
export function deleteWebsitePage(project: WebsiteProjectConfig, id: string): WebsiteProjectConfig {
  const page = project.pages.find((p) => p.id === id);
  if (!page || page.path === "/") return project;
  const keepTarget = (target?: WebsiteLinkTarget | null) =>
    !(target?.kind === "page" && target.pageId === id);

  const nextShared: WebsiteSharedSections | undefined = project.shared
    ? {
        ...project.shared,
        announcement:
          project.shared.announcement && !keepTarget(project.shared.announcement.target)
            ? { ...project.shared.announcement, target: undefined }
            : project.shared.announcement,
        navbar: project.shared.navbar
          ? {
              ...project.shared.navbar,
              items: project.shared.navbar.items?.filter((item) => keepTarget(item.target)),
              actionTarget: keepTarget(project.shared.navbar.actionTarget)
                ? project.shared.navbar.actionTarget
                : null,
            }
          : undefined,
        footer: project.shared.footer
          ? {
              ...project.shared.footer,
              groups: project.shared.footer.groups?.map((g) => ({
                ...g,
                links: g.links.filter((l) => keepTarget(l.target)),
              })),
              legalLinks: project.shared.footer.legalLinks?.filter((l) => keepTarget(l.target)),
            }
          : undefined,
      }
    : undefined;

  return {
    ...project,
    pages: project.pages.filter((p) => p.id !== id),
    navigation: project.navigation.filter((p) => p !== id),
    primaryActionPageId: project.primaryActionPageId === id ? null : project.primaryActionPageId,
    shared: nextShared,
    authConfig: project.authConfig
      ? {
          ...project.authConfig,
          postAuthPageId:
            project.authConfig.postAuthPageId === id ? null : project.authConfig.postAuthPageId,
          forgotPasswordPageId:
            project.authConfig.forgotPasswordPageId === id
              ? null
              : project.authConfig.forgotPasswordPageId,
          termsPageId:
            project.authConfig.termsPageId === id ? null : project.authConfig.termsPageId,
          privacyPageId:
            project.authConfig.privacyPageId === id ? null : project.authConfig.privacyPageId,
        }
      : undefined,
    dashboardConfig: project.dashboardConfig
      ? {
          ...project.dashboardConfig,
          backToSitePageId:
            project.dashboardConfig.backToSitePageId === id
              ? null
              : project.dashboardConfig.backToSitePageId,
          sidebarLinks: project.dashboardConfig.sidebarLinks.filter((l) => keepTarget(l.target)),
        }
      : undefined,
    activePageId:
      project.activePageId === id
        ? project.pages.find((p) => p.path === "/")!.id
        : project.activePageId,
  };
}
/** Restore only the removed page, preserving any edits made after deletion. */
export function restoreWebsitePage(project: WebsiteProjectConfig, previous: WebsiteProjectConfig) {
  const removed = previous.pages.find((page) => !project.pages.some((p) => p.id === page.id));
  if (!removed) return project;
  const page = { ...removed, path: availablePath(project, removed.path) };
  return {
    ...project,
    pages: [...project.pages, page],
    activePageId: page.id,
    navigation: previous.navigation.includes(page.id)
      ? [...project.navigation, page.id]
      : project.navigation,
    primaryActionPageId:
      !project.primaryActionPageId && previous.primaryActionPageId === page.id
        ? page.id
        : project.primaryActionPageId,
  };
}

export function parseWebsiteProject(value: unknown): WebsiteProjectConfig | undefined {
  if (!value || typeof value !== "object") return;
  const p = value as WebsiteProjectConfig;
  if (
    p.version !== 1 ||
    typeof p.name !== "string" ||
    !p.name.trim() ||
    !Array.isArray(p.pages) ||
    !p.pages.length ||
    p.pages.length > 200
  )
    return;
  for (const page of p.pages) {
    if (
      !page ||
      typeof page.id !== "string" ||
      !page.id ||
      typeof page.name !== "string" ||
      !page.name.trim() ||
      typeof page.path !== "string" ||
      normalizePagePath(page.path) !== page.path ||
      !websiteTemplates.some((t) => t.id === page.template) ||
      !["split", "centered"].includes(page.authLayout) ||
      !parseLandingPageConfig(pageConfig(p, page))
    )
      return;
  }
  const ids = new Set(p.pages.map((page) => page.id));
  if (
    ids.size !== p.pages.length ||
    new Set(p.pages.map((page) => page.path)).size !== p.pages.length ||
    p.pages.filter((page) => page.path === "/").length !== 1 ||
    !ids.has(p.activePageId)
  )
    return;
  if (
    !Array.isArray(p.navigation) ||
    new Set(p.navigation).size !== p.navigation.length ||
    p.navigation.some((id) => !ids.has(id))
  )
    return;
  if (p.primaryActionPageId !== null && !ids.has(p.primaryActionPageId)) return;
  if (p.customFiles !== undefined) {
    if (!p.customFiles || typeof p.customFiles !== "object" || Array.isArray(p.customFiles)) {
      return;
    }
    for (const val of Object.values(p.customFiles)) {
      if (typeof val !== "string") return;
    }
  }
  return p;
}
export function createWebsiteProjectCode(project: WebsiteProjectConfig) {
  return `import { WebsiteProject } from "@hudbird/marketing";\nimport type { WebsiteProjectConfig } from "@hudbird/marketing";\nimport "@hudbird/marketing/pilot.css";\n\n// Requires the local Hudbird package containing WebsiteProject.\n// Auth and dashboard templates use demo data until connected to your backend.\nconst project: WebsiteProjectConfig = ${JSON.stringify(project, null, 2)};\n\nexport default function App() {\n  return <WebsiteProject project={project} />;\n}\n`;
}

export const DEFAULT_DASHBOARD_BLOCKS: WebsiteDashboardBlockConfig[] = [
  {
    id: "app-shell",
    type: "app-shell",
    variant: "sidebar-dual",
    title: "App Shell",
    enabled: true,
  },
  {
    id: "page-header",
    type: "page-header",
    variant: "breadcrumbs-actions",
    title: "Overview Header",
    enabled: true,
  },
  {
    id: "kpi-metrics",
    type: "kpi-metrics",
    variant: "sparkline-cards",
    title: "KPI Strip",
    enabled: true,
  },
  {
    id: "primary-panel",
    type: "primary-panel",
    variant: "revenue-analytics",
    title: "Revenue & Activity Chart",
    enabled: true,
  },
  {
    id: "data-table",
    type: "data-table",
    variant: "customer-directory",
    title: "Customer Ledger",
    enabled: true,
  },
  {
    id: "status-footer",
    type: "status-footer",
    variant: "pagination-summary",
    title: "Pagination & Status",
    enabled: true,
  },
];

export function getEffectiveTokens(project: WebsiteProjectConfig): WebsiteDesignTokens {
  const fallbackRadius = { square: 0, soft: 12, round: 24 }[project.brand.radius];
  return {
    surfaceBase: project.tokens?.surfaceBase ?? "zinc",
    secondaryColor: project.tokens?.secondaryColor ?? "#6366f1",
    customColors: project.tokens?.customColors,
    semantic: {
      success: project.tokens?.semantic?.success ?? "#10b981",
      warning: project.tokens?.semantic?.warning ?? "#f59e0b",
      danger: project.tokens?.semantic?.danger ?? "#ef4444",
    },
    typography: {
      headingFont: project.tokens?.typography?.headingFont ?? project.brand.fontFamily,
      headingGoogleFont: project.tokens?.typography?.headingGoogleFont ?? project.brand.googleFont,
      bodyFont: project.tokens?.typography?.bodyFont ?? project.brand.fontFamily,
      bodyGoogleFont: project.tokens?.typography?.bodyGoogleFont ?? project.brand.googleFont,
      monoFont:
        project.tokens?.typography?.monoFont ??
        '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
      monoGoogleFont: project.tokens?.typography?.monoGoogleFont ?? "JetBrains Mono",
      scale: project.tokens?.typography?.scale ?? "default",
      tracking: project.tokens?.typography?.tracking ?? "normal",
    },
    shape: {
      radiusPx: project.tokens?.shape?.radiusPx ?? fallbackRadius,
      borderStyle: project.tokens?.shape?.borderStyle ?? "subtle",
      elevation: project.tokens?.shape?.elevation ?? "soft",
    },
    spacing: {
      containerWidth: project.tokens?.spacing?.containerWidth ?? "standard",
      sectionPadding:
        project.tokens?.spacing?.sectionPadding ??
        (project.brand.density === "compact" ? "compact" : "comfortable"),
    },
  };
}

export function getEffectiveSharedSections(project: WebsiteProjectConfig): WebsiteSharedSections {
  const home = project.pages.find((p) => p.path === "/") ?? project.pages[0];
  const baseSections = home?.sections ?? createLandingPageConfig().sections;
  const baseNavbar = baseSections.find(
    (s): s is Extract<LandingSectionSelection, { type: "navbar" }> => s.type === "navbar"
  )!;
  const baseFooter = baseSections.find(
    (s): s is Extract<LandingSectionSelection, { type: "footer" }> => s.type === "footer"
  )!;

  const fallbackNavItems: WebsiteNavItem[] = project.navigation
    .map((id): WebsiteNavItem | null => {
      const targetPage = project.pages.find((p) => p.id === id);
      if (!targetPage) return null;
      return {
        id: `nav-${targetPage.id}`,
        label: targetPage.name,
        description: `Visit ${targetPage.name}`,
        target: { kind: "page", pageId: targetPage.id },
      };
    })
    .filter((item): item is WebsiteNavItem => item !== null);

  const fallbackActionTarget: WebsiteLinkTarget | null = project.primaryActionPageId
    ? { kind: "page", pageId: project.primaryActionPageId }
    : null;
  const fallbackActionPage = project.primaryActionPageId
    ? project.pages.find((p) => p.id === project.primaryActionPageId)
    : undefined;

  return {
    announcement: project.shared?.announcement ?? {
      enabled: false,
      badge: "New",
      text: `Now introducing ${project.brand.name} 2.0 — designed for faster launches.`,
      linkLabel: "Learn more",
      target: home ? { kind: "page", pageId: home.id } : undefined,
    },
    navbar: {
      selection: project.shared?.navbar?.selection ?? baseNavbar,
      items: project.shared?.navbar?.items ?? fallbackNavItems,
      actionLabel:
        project.shared?.navbar?.actionLabel ??
        fallbackActionPage?.name ??
        formaLandingContent.navbar.action.label,
      actionTarget:
        project.shared?.navbar?.actionTarget !== undefined
          ? project.shared.navbar.actionTarget
          : fallbackActionTarget,
    },
    footer: {
      selection: project.shared?.footer?.selection ?? baseFooter,
      heading: project.shared?.footer?.heading,
      description: project.shared?.footer?.description ?? formaLandingContent.footer.description,
      note: project.shared?.footer?.note ?? formaLandingContent.footer.note,
      contactAction: project.shared?.footer?.contactAction,
      contactLinks: project.shared?.footer?.contactLinks,
      officeHours: project.shared?.footer?.officeHours,
      status: project.shared?.footer?.status,
      locales: project.shared?.footer?.locales,
      activeLocale: project.shared?.footer?.activeLocale,
      groups: project.shared?.footer?.groups,
      legalLinks: project.shared?.footer?.legalLinks,
    },
  };
}

export function getEffectiveAuthConfig(project: WebsiteProjectConfig): WebsiteAuthConfig {
  const dashboard = project.pages.find((p) => p.template === "dashboard");
  const recovery = project.pages.find((p) => p.template === "recovery");
  const legal = project.pages.find((p) => p.template === "legal");
  const home = project.pages.find((p) => p.path === "/") ?? project.pages[0];
  return {
    loginHeading: project.authConfig?.loginHeading ?? "Welcome back!",
    loginDescription:
      project.authConfig?.loginDescription ??
      `Sign in to ${project.brand.name}. Pick up where you left off.`,
    loginSubmitLabel: project.authConfig?.loginSubmitLabel ?? "Log in",
    signupHeading: project.authConfig?.signupHeading ?? "Create your account",
    signupDescription: project.authConfig?.signupDescription ?? "Make room for your next project.",
    recoveryHeading: project.authConfig?.recoveryHeading ?? "Forgot password?",
    recoveryDescription:
      project.authConfig?.recoveryDescription ?? "Enter your email to request a reset link.",
    socialProviders: {
      google: project.authConfig?.socialProviders?.google ?? true,
      github: project.authConfig?.socialProviders?.github ?? true,
      sso: project.authConfig?.socialProviders?.sso ?? false,
    },
    postAuthPageId:
      project.authConfig?.postAuthPageId !== undefined
        ? project.authConfig.postAuthPageId
        : (dashboard?.id ?? home?.id ?? null),
    forgotPasswordPageId:
      project.authConfig?.forgotPasswordPageId !== undefined
        ? project.authConfig.forgotPasswordPageId
        : (recovery?.id ?? null),
    termsPageId:
      project.authConfig?.termsPageId !== undefined
        ? project.authConfig.termsPageId
        : (legal?.id ?? null),
    privacyPageId:
      project.authConfig?.privacyPageId !== undefined
        ? project.authConfig.privacyPageId
        : (legal?.id ?? null),
  };
}

export function getEffectiveDashboardConfig(project: WebsiteProjectConfig): WebsiteDashboardConfig {
  const home = project.pages.find((p) => p.path === "/") ?? project.pages[0];
  const pricing = project.pages.find((p) => p.template === "pricing");
  const contact = project.pages.find((p) => p.template === "contact");
  const defaultLinks: WebsiteDashboardConfig["sidebarLinks"] = [
    ...(home
      ? [{ id: "dash-home", label: home.name, target: { kind: "page" as const, pageId: home.id } }]
      : []),
    ...(pricing
      ? [
          {
            id: "dash-pricing",
            label: "Billing & Plans",
            target: { kind: "page" as const, pageId: pricing.id },
          },
        ]
      : []),
    ...(contact
      ? [
          {
            id: "dash-support",
            label: "Support",
            target: { kind: "page" as const, pageId: contact.id },
          },
        ]
      : []),
  ];

  return {
    appTitle: project.dashboardConfig?.appTitle ?? `${project.brand.name} Console`,
    welcomeSubtitle:
      project.dashboardConfig?.welcomeSubtitle ??
      "Real-time workspace metrics, billing controls, and operational telemetry.",
    category: project.dashboardConfig?.category ?? "dashboards",
    sidebarLinks: project.dashboardConfig?.sidebarLinks ?? defaultLinks,
    backToSiteLabel: project.dashboardConfig?.backToSiteLabel ?? "Back to website",
    backToSitePageId:
      project.dashboardConfig?.backToSitePageId !== undefined
        ? project.dashboardConfig.backToSitePageId
        : (home?.id ?? null),
    blocks: project.dashboardConfig?.blocks?.length
      ? project.dashboardConfig.blocks
      : DEFAULT_DASHBOARD_BLOCKS.map((b) => ({ ...b })),
  };
}

export function getEffectiveNotFoundConfig(project: WebsiteProjectConfig): WebsiteNotFoundConfig {
  const home = project.pages.find((p) => p.path === "/") ?? project.pages[0];
  return {
    code: project.notFoundConfig?.code ?? "404",
    title: project.notFoundConfig?.title ?? "This page isn’t here.",
    description: project.notFoundConfig?.description ?? "Let’s get you back to a familiar place.",
    primaryActionLabel: project.notFoundConfig?.primaryActionLabel ?? "Back to home",
    primaryActionTarget: project.notFoundConfig?.primaryActionTarget ?? {
      kind: "page",
      pageId: home?.id ?? "home",
    },
    secondaryActionLabel: project.notFoundConfig?.secondaryActionLabel,
    secondaryActionTarget: project.notFoundConfig?.secondaryActionTarget,
    showQuickLinks: project.notFoundConfig?.showQuickLinks ?? true,
  };
}

export function resolveLinkTarget(
  project: WebsiteProjectConfig,
  target: WebsiteLinkTarget | undefined | null,
  opts?: { hashRoutes?: boolean }
): { href: string; valid: boolean; external: boolean; page?: WebsitePage; anchor?: string } {
  if (!target) return { href: "#", valid: false, external: false };
  if (target.kind === "external") {
    const clean = target.href.trim();
    return {
      href: clean || "#",
      valid: Boolean(clean),
      external: true,
    };
  }
  if (target.kind === "section") {
    return { href: `#${target.section}`, valid: true, external: false, anchor: target.section };
  }
  const dest = project.pages.find((p) => p.id === target.pageId);
  if (!dest) {
    return { href: "#missing-page", valid: false, external: false };
  }
  const basePath = opts?.hashRoutes ? `#${dest.path}` : dest.path;
  const anchor = target.sectionAnchor?.trim() ? `#${target.sectionAnchor.trim()}` : "";
  return {
    href: `${basePath}${anchor}`,
    valid: true,
    external: false,
    page: dest,
    anchor: target.sectionAnchor?.trim() || undefined,
  };
}

export function collectLinkedPageIds(project: WebsiteProjectConfig): Set<string> {
  const linked = new Set<string>();
  const home = project.pages.find((p) => p.path === "/");
  if (home) linked.add(home.id);

  const recordTarget = (target?: WebsiteLinkTarget | null) => {
    if (target?.kind === "page" && project.pages.some((p) => p.id === target.pageId)) {
      linked.add(target.pageId);
    }
  };

  for (const id of project.navigation) linked.add(id);
  if (project.primaryActionPageId) linked.add(project.primaryActionPageId);

  const shared = getEffectiveSharedSections(project);
  recordTarget(shared.announcement?.target);
  for (const item of shared.navbar?.items ?? []) recordTarget(item.target);
  recordTarget(shared.navbar?.actionTarget);
  for (const group of shared.footer?.groups ?? []) {
    for (const l of group.links) recordTarget(l.target);
  }
  for (const l of shared.footer?.legalLinks ?? []) recordTarget(l.target);

  for (const page of project.pages) {
    for (const links of Object.values(page.sectionLinks ?? {})) {
      recordTarget(links?.primaryAction);
      recordTarget(links?.secondaryAction);
    }
  }

  const auth = getEffectiveAuthConfig(project);
  if (auth.postAuthPageId) linked.add(auth.postAuthPageId);
  if (auth.forgotPasswordPageId) linked.add(auth.forgotPasswordPageId);
  if (auth.termsPageId) linked.add(auth.termsPageId);
  if (auth.privacyPageId) linked.add(auth.privacyPageId);

  const dash = getEffectiveDashboardConfig(project);
  if (dash.backToSitePageId) linked.add(dash.backToSitePageId);
  for (const l of dash.sidebarLinks) recordTarget(l.target);

  const nf = getEffectiveNotFoundConfig(project);
  recordTarget(nf.primaryActionTarget);
  recordTarget(nf.secondaryActionTarget);

  return linked;
}

export function findOrphanPages(project: WebsiteProjectConfig): WebsitePage[] {
  const linked = collectLinkedPageIds(project);
  return project.pages.filter(
    (page) => page.path !== "/" && page.template !== "not-found" && !linked.has(page.id)
  );
}

export function resolveEffectiveSections(
  project: WebsiteProjectConfig,
  page: WebsitePage
): LandingSectionSelection[] {
  const shared = project.shared;
  return page.sections.map((section) => {
    if (section.type === "navbar") {
      const mode = page.sharedMode?.navbar ?? "inherit";
      if (mode === "hidden") return { ...section, enabled: false };
      if (mode === "custom") {
        return page.sharedOverrides?.navbarSettings
          ? {
              ...section,
              customSettings: {
                ...(section.customSettings ?? {}),
                ...page.sharedOverrides.navbarSettings,
              } as NavbarCustomSettings,
            }
          : section;
      }
      if (mode === "inherit" && shared?.navbar?.selection) {
        const allowBlankNavbar = page.template !== "blank" || page.sharedMode?.navbar === "inherit";
        return {
          ...shared.navbar.selection,
          enabled: allowBlankNavbar ? shared.navbar.selection.enabled : section.enabled,
        };
      }
      return section;
    }
    if (section.type === "footer") {
      const mode = page.sharedMode?.footer ?? "inherit";
      if (mode === "hidden") return { ...section, enabled: false };
      if (mode === "custom") {
        return page.sharedOverrides?.footerSettings
          ? {
              ...section,
              customSettings: {
                ...(section.customSettings ?? {}),
                ...page.sharedOverrides.footerSettings,
              },
            }
          : section;
      }
      if (mode === "inherit" && shared?.footer?.selection) {
        const allowBlankFooter = page.template !== "blank" || page.sharedMode?.footer === "inherit";
        return {
          ...shared.footer.selection,
          enabled: allowBlankFooter ? shared.footer.selection.enabled : section.enabled,
        };
      }
      return section;
    }
    return section;
  });
}

export function resolvedPageConfig(
  project: WebsiteProjectConfig,
  page: WebsitePage
): LandingPageConfig {
  return {
    version: 1,
    brand: project.brand,
    themeMode: project.themeMode,
    motion: project.motion,
    sections: resolveEffectiveSections(project, page),
  };
}

function mergePlainObject<T extends Record<string, unknown>>(
  base: T,
  override?: Record<string, unknown>
): T {
  if (!override) return base;
  const next: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(override)) {
    if (value === undefined) continue;
    const baseVal = next[key];
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      baseVal &&
      typeof baseVal === "object" &&
      !Array.isArray(baseVal)
    ) {
      next[key] = mergePlainObject(
        baseVal as Record<string, unknown>,
        value as Record<string, unknown>
      );
    } else {
      next[key] = value;
    }
  }
  return next as T;
}

export function resolvePageContent(
  project: WebsiteProjectConfig,
  page: WebsitePage,
  opts?: { hashRoutes?: boolean }
): LandingSectionContent {
  const routeHref = (path: string) => (opts?.hashRoutes ? `#${path}` : path);
  const legalPage = project.pages.find((p) => p.template === "legal");

  const mergedContent = {
    navbar: mergePlainObject(
      mergePlainObject(formaLandingContent.navbar, project.contentOverrides?.navbar),
      page.contentOverrides?.navbar
    ),
    hero: mergePlainObject(
      mergePlainObject(formaLandingContent.hero, project.contentOverrides?.hero),
      page.contentOverrides?.hero
    ),
    logos: mergePlainObject(
      mergePlainObject(formaLandingContent.logos, project.contentOverrides?.logos),
      page.contentOverrides?.logos
    ),
    benefits: mergePlainObject(
      mergePlainObject(formaLandingContent.benefits, project.contentOverrides?.benefits),
      page.contentOverrides?.benefits
    ),
    features: mergePlainObject(
      mergePlainObject(formaLandingContent.features, project.contentOverrides?.features),
      page.contentOverrides?.features
    ),
    "how-it-works": mergePlainObject(
      mergePlainObject(
        formaLandingContent["how-it-works"],
        project.contentOverrides?.["how-it-works"]
      ),
      page.contentOverrides?.["how-it-works"]
    ),
    integrations: mergePlainObject(
      mergePlainObject(formaLandingContent.integrations, project.contentOverrides?.integrations),
      page.contentOverrides?.integrations
    ),
    testimonials: mergePlainObject(
      mergePlainObject(formaLandingContent.testimonials, project.contentOverrides?.testimonials),
      page.contentOverrides?.testimonials
    ),
    pricing: mergePlainObject(
      mergePlainObject(formaLandingContent.pricing, project.contentOverrides?.pricing),
      page.contentOverrides?.pricing
    ),
    faq: mergePlainObject(
      mergePlainObject(formaLandingContent.faq, project.contentOverrides?.faq),
      page.contentOverrides?.faq
    ),
    cta: mergePlainObject(
      mergePlainObject(formaLandingContent.cta, project.contentOverrides?.cta),
      page.contentOverrides?.cta
    ),
    footer: mergePlainObject(
      mergePlainObject(formaLandingContent.footer, project.contentOverrides?.footer),
      page.contentOverrides?.footer
    ),
  } as LandingSectionContent;

  const rewriteLegalHref = <T extends { label: string; href?: string }>(link: T): T => {
    if (!legalPage) return link;
    const rawHref = link.href?.toLowerCase();
    const label = link.label.toLowerCase();
    let docKey: string | null = null;
    if (rawHref === "#privacy" || label.includes("privacy")) docKey = "privacy";
    else if (rawHref === "#terms" || label.includes("terms")) docKey = "terms";
    else if (rawHref === "#cookies" || label.includes("cookie")) docKey = "cookies";
    else if (rawHref === "#license" || label.includes("license")) docKey = "license";
    if (!docKey) return link;
    return {
      ...link,
      href: routeHref(`${legalPage.path}?doc=${docKey}`),
    };
  };

  // Shared Navbar items & CTA resolution
  const sharedNavbar = project.shared?.navbar;
  const navMode = page.sharedMode?.navbar ?? "inherit";
  if (sharedNavbar?.items?.length) {
    mergedContent.navbar.links = sharedNavbar.items.map((item) => ({
      label: item.label,
      href: resolveLinkTarget(project, item.target, opts).href,
      description: item.description ?? `Go to ${item.label}`,
    }));
  } else if (project.navigation.length) {
    mergedContent.navbar.links = project.navigation
      .map((id) => project.pages.find((p) => p.id === id))
      .filter((p): p is WebsitePage => Boolean(p))
      .map((p) => ({ label: p.name, href: routeHref(p.path), description: `Visit ${p.name}` }));
  }

  if (sharedNavbar?.actionTarget) {
    const resolvedAction = resolveLinkTarget(project, sharedNavbar.actionTarget, opts);
    mergedContent.navbar.action = {
      label:
        sharedNavbar.actionLabel?.trim() ||
        resolvedAction.page?.name ||
        mergedContent.navbar.action.label,
      href: resolvedAction.href,
    };
  } else {
    const actionPage = project.pages.find((p) => p.id === project.primaryActionPageId);
    if (actionPage) {
      mergedContent.navbar.action = { label: actionPage.name, href: routeHref(actionPage.path) };
    }
  }

  if (navMode === "custom") {
    if (page.contentOverrides?.navbar) {
      mergedContent.navbar = mergePlainObject(mergedContent.navbar, page.contentOverrides.navbar);
    }
    if (page.sharedOverrides?.navbar) {
      mergedContent.navbar = mergePlainObject(mergedContent.navbar, page.sharedOverrides.navbar);
    }
  } else if (project.contentOverrides?.navbar) {
    mergedContent.navbar = mergePlainObject(mergedContent.navbar, project.contentOverrides.navbar);
  }

  // Hero primary action falls back to project primaryActionPageId if page has no override
  const primaryPage = project.pages.find((p) => p.id === project.primaryActionPageId);
  if (primaryPage && !page.sectionLinks?.hero?.primaryAction) {
    mergedContent.hero = {
      ...mergedContent.hero,
      content: {
        ...mergedContent.hero.content,
        primaryAction: {
          ...mergedContent.hero.content.primaryAction,
          label:
            (
              page.contentOverrides?.hero as
                { content?: { primaryAction?: { label?: string } } } | undefined
            )?.content?.primaryAction?.label ?? primaryPage.name,
          href: routeHref(primaryPage.path),
        },
      },
    };
  }

  // Page section link overrides (Hero & CTA)
  const heroLinks = page.sectionLinks?.hero;
  if (heroLinks?.primaryAction) {
    mergedContent.hero = {
      ...mergedContent.hero,
      content: {
        ...mergedContent.hero.content,
        primaryAction: {
          ...mergedContent.hero.content.primaryAction,
          href: resolveLinkTarget(project, heroLinks.primaryAction, opts).href,
        },
      },
    };
  }
  if (heroLinks?.secondaryAction && mergedContent.hero.content.secondaryAction) {
    mergedContent.hero = {
      ...mergedContent.hero,
      content: {
        ...mergedContent.hero.content,
        secondaryAction: {
          ...mergedContent.hero.content.secondaryAction,
          href: resolveLinkTarget(project, heroLinks.secondaryAction, opts).href,
        },
      },
    };
  }
  const ctaLinks = page.sectionLinks?.cta;
  if (ctaLinks?.primaryAction) {
    mergedContent.cta = {
      ...mergedContent.cta,
      action: {
        ...mergedContent.cta.action,
        href: resolveLinkTarget(project, ctaLinks.primaryAction, opts).href,
      },
    };
  }

  // Shared Footer overrides + legal links
  const sharedFooter = project.shared?.footer;
  const footerMode = page.sharedMode?.footer ?? "inherit";
  if (sharedFooter) {
    if (sharedFooter.heading !== undefined) {
      mergedContent.footer.heading = sharedFooter.heading;
    }
    if (sharedFooter.description !== undefined) {
      mergedContent.footer.description = sharedFooter.description;
    }
    if (sharedFooter.note !== undefined) {
      mergedContent.footer.note = sharedFooter.note;
    }
    if (sharedFooter.contactAction !== undefined) {
      mergedContent.footer.contactAction = sharedFooter.contactAction;
    }
    if (sharedFooter.contactLinks !== undefined) {
      mergedContent.footer.contactLinks = sharedFooter.contactLinks;
    }
    if (sharedFooter.officeHours !== undefined) {
      mergedContent.footer.officeHours = sharedFooter.officeHours;
    }
    if (sharedFooter.status !== undefined) {
      mergedContent.footer.status = sharedFooter.status;
    }
    if (sharedFooter.locales !== undefined) {
      mergedContent.footer.locales = sharedFooter.locales;
    }
    if (sharedFooter.activeLocale !== undefined) {
      mergedContent.footer.activeLocale = sharedFooter.activeLocale;
    }
    if (sharedFooter.groups?.length) {
      mergedContent.footer.groups = sharedFooter.groups.map((g) => ({
        title: g.title,
        links: g.links.map((link) => ({
          label: link.label,
          href: resolveLinkTarget(project, link.target, opts).href,
        })),
      }));
    }
    if (sharedFooter.legalLinks?.length) {
      mergedContent.footer.legalLinks = sharedFooter.legalLinks.map((link) => ({
        label: link.label,
        href: resolveLinkTarget(project, link.target, opts).href,
      }));
    }
  }

  if (footerMode === "custom") {
    if (page.contentOverrides?.footer) {
      mergedContent.footer = mergePlainObject(mergedContent.footer, page.contentOverrides.footer);
    }
    if (page.sharedOverrides?.footer) {
      mergedContent.footer = mergePlainObject(mergedContent.footer, page.sharedOverrides.footer);
    }
  } else if (project.contentOverrides?.footer) {
    mergedContent.footer = mergePlainObject(mergedContent.footer, project.contentOverrides.footer);
  }

  const hasCustomLegalLinks =
    footerMode === "custom" &&
    (Boolean(page.sharedOverrides?.footer?.legalLinks) ||
      Boolean(page.contentOverrides?.footer?.legalLinks));

  if (legalPage && !sharedFooter?.legalLinks?.length && !hasCustomLegalLinks) {
    mergedContent.footer = {
      ...mergedContent.footer,
      groups: mergedContent.footer.groups.map((group) => ({
        ...group,
        links: group.links.map((link) => ("href" in link ? rewriteLegalHref(link) : link)),
      })),
      legalLinks: [
        ...(mergedContent.footer.legalLinks ?? []).map((link) => rewriteLegalHref(link)),
        ...(mergedContent.footer.legalLinks?.some((l) => l.label.toLowerCase().includes("cookie"))
          ? []
          : [
              {
                label: "Cookie Settings",
                href: routeHref(`${legalPage.path}?doc=cookies`),
              },
            ]),
      ],
    };
  }

  return mergedContent;
}

export function syncNavigationFromSharedNavbar(
  project: WebsiteProjectConfig
): WebsiteProjectConfig {
  const sharedNavbar = project.shared?.navbar;
  if (!sharedNavbar) return project;
  const navIds = Array.from(
    new Set(
      (sharedNavbar.items ?? [])
        .filter((item) => item.target.kind === "page")
        .map((item) => (item.target as { kind: "page"; pageId: string }).pageId)
        .filter((id) => project.pages.some((p) => p.id === id))
    )
  );
  const primaryId =
    sharedNavbar.actionTarget?.kind === "page" &&
    project.pages.some((p) => p.id === (sharedNavbar.actionTarget as { pageId: string }).pageId)
      ? (sharedNavbar.actionTarget as { pageId: string }).pageId
      : sharedNavbar.actionTarget === null
        ? null
        : project.primaryActionPageId;

  return {
    ...project,
    navigation: navIds,
    primaryActionPageId: primaryId,
  };
}

export function updateModularSectionOverride(
  project: WebsiteProjectConfig,
  sectionId: string,
  patch: Record<string, unknown>,
  opts?: { pageId?: string }
): WebsiteProjectConfig {
  const targetId = opts?.pageId ?? project.activePageId;
  return {
    ...project,
    pages: project.pages.map((p) => {
      if (p.id !== targetId) return p;
      const existing = p.modularOverrides?.[sectionId] ?? {};
      return {
        ...p,
        modularOverrides: {
          ...p.modularOverrides,
          [sectionId]: mergePlainObject(existing, patch),
        },
      };
    }),
  };
}

export function updateModularSectionSettings(
  project: WebsiteProjectConfig,
  sectionId: string,
  patch: Partial<SectionAppearanceSettings>,
  opts?: { pageId?: string }
): WebsiteProjectConfig {
  const targetId = opts?.pageId ?? project.activePageId;
  return {
    ...project,
    pages: project.pages.map((p) => {
      if (p.id !== targetId) return p;
      const existing = p.modularSettings?.[sectionId] ?? {};
      return {
        ...p,
        modularSettings: {
          ...p.modularSettings,
          [sectionId]: { ...existing, ...patch },
        },
      };
    }),
  };
}

export function resetPageSharedChromeOverride(
  project: WebsiteProjectConfig,
  pageId: string,
  type: "navbar" | "footer"
): WebsiteProjectConfig {
  return {
    ...project,
    pages: project.pages.map((p) => {
      if (p.id !== pageId) return p;
      const nextSharedOverrides = { ...(p.sharedOverrides ?? {}) };
      const nextContentOverrides = { ...(p.contentOverrides ?? {}) };
      if (type === "navbar") {
        delete nextSharedOverrides.navbar;
        delete nextSharedOverrides.navbarSettings;
        delete nextContentOverrides.navbar;
      } else {
        delete nextSharedOverrides.footer;
        delete nextSharedOverrides.footerSettings;
        delete nextContentOverrides.footer;
      }
      return {
        ...p,
        sharedMode: { ...p.sharedMode, [type]: "inherit" },
        sharedOverrides: nextSharedOverrides,
        contentOverrides: nextContentOverrides,
      };
    }),
  };
}

export function updateSectionContentOverride(
  project: WebsiteProjectConfig,
  sectionType: LandingSectionType,
  patch: Record<string, unknown>,
  opts?: { pageId?: string; global?: boolean }
): WebsiteProjectConfig {
  const targetId = opts?.pageId ?? project.activePageId;
  const targetPage = project.pages.find((p) => p.id === targetId);
  const isCustomChrome =
    !opts?.global &&
    (sectionType === "navbar" || sectionType === "footer") &&
    targetPage?.sharedMode?.[sectionType] === "custom";

  if (isCustomChrome) {
    return {
      ...project,
      pages: project.pages.map((p) => {
        if (p.id !== targetId) return p;
        const existing = p.sharedOverrides?.[sectionType] ?? {};
        return {
          ...p,
          sharedOverrides: {
            ...p.sharedOverrides,
            [sectionType]: mergePlainObject(existing, patch),
          },
        };
      }),
    };
  }

  if (opts?.global || sectionType === "footer" || sectionType === "navbar") {
    const existing = project.contentOverrides?.[sectionType] ?? {};
    return {
      ...project,
      contentOverrides: {
        ...project.contentOverrides,
        [sectionType]: mergePlainObject(existing, patch),
      },
    };
  }
  return {
    ...project,
    pages: project.pages.map((p) => {
      if (p.id !== targetId) return p;
      const existing = p.contentOverrides?.[sectionType] ?? {};
      return {
        ...p,
        contentOverrides: {
          ...p.contentOverrides,
          [sectionType]: mergePlainObject(existing, patch),
        },
      };
    }),
  };
}

const DEFAULT_HERO_INVOICES = [
  { name: "Northwind", status: "Paid", isPaid: true },
  { name: "Studio Park", status: "Due in 3d", isPaid: false },
  { name: "Acme Co.", status: "Paid", isPaid: true },
];

const DEFAULT_BENEFIT_QUOTES = [
  {
    highlight: "Building this in-house",
    quote: "would've cost us $2M and 18 months. Hudbird had us live in six weeks.",
    author: "Head of AI, Tech-Forward Insurance Brokerage",
  },
  {
    highlight: "Hudbird UI",
    quote: "delivers enterprise-grade components that used to require an entire team.",
    author: "VP of Operations, National Commercial Bank",
  },
  {
    highlight: "Zero manual handoff",
    quote: "We shipped our complete 14-page SaaS site and design system in 48 hours.",
    author: "Design Director, Series B AI Lab",
  },
];

const DEFAULT_HOW_IT_WORKS_SUBSTEPS: Array<
  Array<{ id: string; label: string; description: string }>
> = [
  [
    {
      id: "open",
      label: "Open page builder",
      description:
        "Launch the visual studio to compose layouts on a real-time preview canvas with zero friction.",
    },
    {
      id: "customize",
      label: "Customize & reorder sections",
      description:
        "Toggle sections on or off (Navbar, Hero, Logos, Benefits, Pricing) and reorder narrative flow with intuitive controls.",
    },
    {
      id: "theme",
      label: "Change theme & brand system",
      description:
        "Tune OKLCH color palettes, typography pairings, and border radius to match your company's design identity.",
    },
  ],
  [
    {
      id: "react",
      label: "Export React & Next.js Project",
      description:
        "Download fully typed TSX with Tailwind CSS v4, Framer Motion, and original source components.",
    },
    {
      id: "html",
      label: "Export Clean Static HTML & CSS",
      description:
        "Zero-runtime static bundle with semantic markup and inlined CSS variables for immediate hosting.",
    },
    {
      id: "prompt",
      label: "Copy AI System Prompt",
      description:
        "Calibrated design token instructions for Claude, Stitch, or Cursor to extend pages seamlessly.",
    },
  ],
  [
    {
      id: "vercel",
      label: "Vercel & Next.js Deployment",
      description:
        "Instant edge deployment with automated preview URLs, Fluid Compute, and CDN caching.",
    },
    {
      id: "cloudflare",
      label: "Cloudflare & Netlify Edge",
      description:
        "Global CDN distribution with sub-millisecond static delivery and zero cold starts.",
    },
    {
      id: "docker",
      label: "Docker & Standalone Containers",
      description: "Self-host anywhere with standalone micro-frontend or monorepo packages.",
    },
  ],
];

function seedHowItWorksSubSteps(
  stepIdx: number,
  rawSubSteps: unknown
): Array<{ id: string; label: string; badge?: string; description?: string }> {
  const defaults = DEFAULT_HOW_IT_WORKS_SUBSTEPS[stepIdx] ?? DEFAULT_HOW_IT_WORKS_SUBSTEPS[0];
  if (!Array.isArray(rawSubSteps) || rawSubSteps.length === 0) {
    return defaults.map((s) => ({ ...s }));
  }
  const len = Math.max(rawSubSteps.length, defaults.length);
  const seeded: Array<{ id: string; label: string; badge?: string; description?: string }> = [];
  for (let i = 0; i < len; i++) {
    const raw = rawSubSteps[i];
    const fallback = defaults[i];
    if (raw && typeof raw === "object" && !Array.isArray(raw)) {
      const r = raw as { id?: string; label?: string; badge?: string; description?: string };
      seeded.push({
        id: r.id || fallback?.id || `sub-${i + 1}`,
        label: r.label ?? fallback?.label ?? `Step ${i + 1}`,
        ...(r.badge ? { badge: r.badge } : {}),
        ...(r.description !== undefined
          ? { description: r.description }
          : fallback?.description
            ? { description: fallback.description }
            : {}),
      });
    } else if (fallback) {
      seeded.push({ ...fallback });
    }
  }
  return seeded;
}

export const MODULAR_ARRAY_DEFAULTS: Record<string, () => unknown[]> = {
  "pricing-compare.plans": () => DEFAULT_PRICING_COMPARE_PLANS.map((p) => ({ ...p })),
  "pricing-compare.groups": () =>
    DEFAULT_PRICING_COMPARE_GROUPS.map((g) => ({
      ...g,
      rows: g.rows.map((r) => ({ ...r, values: [...r.values] })),
    })),
  "contact-mail.channels": () => DEFAULT_CONTACT_CHANNELS.map((c) => ({ ...c })),
  "contact-locations.offices": () => DEFAULT_CONTACT_OFFICES.map((o) => ({ ...o })),
  "blog-index.posts": () =>
    DEFAULT_BLOG_POSTS.map((p) => ({
      ...p,
      coverImage: { ...p.coverImage },
    })),
  "meet-our-expert.experts": () => DEFAULT_EXPERTS.map((e) => ({ ...e })),
  "values.items": () => DEFAULT_VALUES.map((v) => ({ ...v })),
  "editorial-cta.avatars": () => [...DEFAULT_CTA_AVATARS],
};

function getNestedPath(target: unknown, segments: string[]): unknown {
  let curr = target;
  for (const seg of segments) {
    if (curr == null || typeof curr !== "object") return undefined;
    curr = (curr as Record<string, unknown>)[seg];
  }
  return curr;
}

function setNestedPath(target: unknown, segments: string[], value: unknown): unknown {
  if (segments.length === 0) return value;
  const [head, ...rest] = segments;
  if (/^\d+$/.test(head)) {
    const idx = Number(head);
    const arr = Array.isArray(target) ? [...target] : [];
    arr[idx] = rest.length === 0 ? value : setNestedPath(arr[idx], rest, value);
    return arr;
  }
  const obj =
    target && typeof target === "object" && !Array.isArray(target)
      ? { ...(target as Record<string, unknown>) }
      : {};
  obj[head] = rest.length === 0 ? value : setNestedPath(obj[head], rest, value);
  return obj;
}

export function updateInlineContent(
  project: WebsiteProjectConfig,
  pageId: string,
  editKey: string,
  value: string
): WebsiteProjectConfig {
  const trimmed = value;
  const colonIdx = editKey.indexOf(":");
  if (colonIdx <= 0) return project;
  const scope = editKey.slice(0, colonIdx);
  const field = editKey.slice(colonIdx + 1);
  if (!scope || !field) return project;

  const targetPage =
    project.pages.find((p) => p.id === pageId) ??
    project.pages.find((p) => p.id === project.activePageId) ??
    project.pages[0];
  const resolvedPageId = targetPage?.id ?? pageId;

  if (scope === "announcement") {
    const shared = getEffectiveSharedSections(project);
    if (field === "text" || field === "badge" || field === "linkLabel") {
      return {
        ...project,
        shared: {
          ...project.shared,
          announcement: {
            ...shared.announcement!,
            [field]: trimmed,
          },
        },
      };
    }
    return project;
  }

  if (scope === "brand" && field === "name") {
    return {
      ...project,
      brand: { ...project.brand, name: trimmed },
    };
  }

  if (scope === "auth") {
    const currentAuth = getEffectiveAuthConfig(project);
    const isSignup = targetPage?.template === "signup";
    const isRecovery = targetPage?.template === "recovery";
    if (field === "heading") {
      return {
        ...project,
        authConfig: {
          ...currentAuth,
          ...(isSignup
            ? { signupHeading: trimmed }
            : isRecovery
              ? { recoveryHeading: trimmed }
              : { loginHeading: trimmed }),
        },
      };
    }
    if (field === "subheading") {
      return {
        ...project,
        authConfig: {
          ...currentAuth,
          ...(isSignup
            ? { signupDescription: trimmed }
            : isRecovery
              ? { recoveryDescription: trimmed }
              : { loginDescription: trimmed }),
        },
      };
    }
    if (field === "submitLabel") {
      return {
        ...project,
        authConfig: {
          ...currentAuth,
          loginSubmitLabel: trimmed,
        },
      };
    }
    if (field in currentAuth) {
      return {
        ...project,
        authConfig: {
          ...currentAuth,
          [field]: trimmed,
        },
      };
    }
    return project;
  }

  if (scope === "dashboard") {
    const dash = getEffectiveDashboardConfig(project);
    if (field === "appTitle" || field === "welcomeSubtitle" || field === "backToSiteLabel") {
      return {
        ...project,
        dashboardConfig: {
          ...dash,
          [field]: trimmed,
        },
      };
    }
    return project;
  }

  if (scope === "notFound" || scope === "not-found") {
    const nf = getEffectiveNotFoundConfig(project);
    if (
      field === "code" ||
      field === "title" ||
      field === "description" ||
      field === "primaryActionLabel" ||
      field === "secondaryActionLabel"
    ) {
      return {
        ...project,
        notFoundConfig: {
          ...nf,
          [field]: trimmed,
        },
      };
    }
    return project;
  }

  if (MODULAR_SECTION_SCOPES.has(scope)) {
    if (!field.includes(".")) {
      return updateModularSectionOverride(
        project,
        scope,
        { [field]: trimmed },
        { pageId: resolvedPageId }
      );
    }
    const existing = { ...(targetPage?.modularOverrides?.[scope] ?? {}) };
    const segments = field.split(".");
    const rootKey = segments[0];
    const seedKey = `${scope}.${rootKey}`;
    if (!Array.isArray(existing[rootKey]) && MODULAR_ARRAY_DEFAULTS[seedKey]) {
      existing[rootKey] = MODULAR_ARRAY_DEFAULTS[seedKey]();
    }
    const currentValue = getNestedPath(existing, segments);
    const nextValue =
      typeof currentValue === "boolean" && (trimmed === "true" || trimmed === "false")
        ? trimmed === "true"
        : trimmed;
    const patched = setNestedPath(existing, segments, nextValue) as Record<string, unknown>;
    return updateModularSectionOverride(
      project,
      scope,
      { [rootKey]: patched[rootKey] },
      { pageId: resolvedPageId }
    );
  }

  if (scope === "navbar") {
    const isCustomNav = targetPage?.sharedMode?.navbar === "custom";
    if (field === "brandName") {
      if (isCustomNav) {
        return updateSectionContentOverride(
          project,
          "navbar",
          { brandName: trimmed },
          { pageId: resolvedPageId }
        );
      }
      return {
        ...project,
        brand: { ...project.brand, name: trimmed },
      };
    }
    if (field === "action.label") {
      const resolvedNav = targetPage
        ? resolvePageContent(project, targetPage).navbar
        : formaLandingContent.navbar;
      const nextAction = { ...resolvedNav.action, label: trimmed };
      if (isCustomNav) {
        return updateSectionContentOverride(
          project,
          "navbar",
          { action: nextAction },
          { pageId: resolvedPageId }
        );
      }
      const shared = getEffectiveSharedSections(project);
      return {
        ...updateSectionContentOverride(
          project,
          "navbar",
          { action: nextAction },
          { global: true }
        ),
        shared: {
          ...project.shared,
          navbar: {
            ...shared.navbar!,
            actionLabel: trimmed,
          },
        },
      };
    }
    const navLinkMatch = /^links\.(\d+)\.label$/.exec(field);
    if (navLinkMatch) {
      const idx = Number(navLinkMatch[1]);
      const resolvedNav = targetPage
        ? resolvePageContent(project, targetPage).navbar
        : formaLandingContent.navbar;
      const nextLinks = [...resolvedNav.links];
      if (!nextLinks[idx]) return project;
      nextLinks[idx] = { ...nextLinks[idx], label: trimmed };
      if (isCustomNav) {
        return updateSectionContentOverride(
          project,
          "navbar",
          { links: nextLinks },
          { pageId: resolvedPageId }
        );
      }
      const shared = getEffectiveSharedSections(project);
      const nextSharedItems = [...(shared.navbar?.items ?? [])];
      if (nextSharedItems[idx]) {
        nextSharedItems[idx] = { ...nextSharedItems[idx], label: trimmed };
      }
      return {
        ...updateSectionContentOverride(project, "navbar", { links: nextLinks }, { global: true }),
        shared: {
          ...project.shared,
          navbar: {
            ...shared.navbar!,
            items: nextSharedItems,
          },
        },
      };
    }
    return project;
  }

  if (scope === "hero") {
    const resolvedHero = targetPage
      ? resolvePageContent(project, targetPage).hero
      : formaLandingContent.hero;
    const activeHeroVariant =
      targetPage?.sections.find((s) => s.type === "hero")?.variant ?? "split-product";

    if (field === "eyebrow" || field === "title" || field === "description") {
      const variantsPatch =
        field === "eyebrow" &&
        (activeHeroVariant === "remit-grid" || (activeHeroVariant as string) === "fintech-remit")
          ? { variants: { [activeHeroVariant]: { badgeText: trimmed } } }
          : undefined;
      return updateSectionContentOverride(
        project,
        "hero",
        variantsPatch
          ? { content: { [field]: trimmed }, ...variantsPatch }
          : { content: { [field]: trimmed } },
        { pageId: resolvedPageId }
      );
    }
    if (field === "primaryAction.label") {
      return updateSectionContentOverride(
        project,
        "hero",
        { content: { primaryAction: { label: trimmed } } },
        { pageId: resolvedPageId }
      );
    }
    if (field === "secondaryAction.label") {
      return updateSectionContentOverride(
        project,
        "hero",
        { content: { secondaryAction: { label: trimmed } } },
        { pageId: resolvedPageId }
      );
    }
    if (field === "media.src" || field === "media.alt" || field === "media.caption") {
      const prop = field.slice("media.".length);
      const imageVariants = new Set([
        "centered",
        "split",
        "split-product",
        "center-canvas",
        "center-video",
        "editorial-photo",
        "image",
      ]);
      const variantCfg = (resolvedHero.variants as Record<string, unknown>)[activeHeroVariant] as
        { image?: Record<string, unknown> } | undefined;
      const variantImagePatch = imageVariants.has(activeHeroVariant)
        ? {
            variants: {
              [activeHeroVariant]: {
                variant: activeHeroVariant,
                image: { ...(variantCfg?.image ?? {}), [prop]: trimmed },
              },
            },
          }
        : undefined;
      return updateSectionContentOverride(
        project,
        "hero",
        variantImagePatch
          ? { content: { media: { [prop]: trimmed } }, ...variantImagePatch }
          : { content: { media: { [prop]: trimmed } } },
        { pageId: resolvedPageId }
      );
    }
    if (field === "video.src") {
      const videoCfg = resolvedHero.variants.video as
        { variant?: string; video?: { src?: string; poster?: unknown } } | undefined;
      const variantsPatch: Record<string, unknown> = {
        video: {
          variant: "video",
          video: { ...(videoCfg?.video ?? {}), src: trimmed },
        },
      };
      if (activeHeroVariant === "center-canvas" || activeHeroVariant === "center-video") {
        variantsPatch[activeHeroVariant] = { variant: activeHeroVariant, videoUrl: trimmed };
      }
      return updateSectionContentOverride(
        project,
        "hero",
        { variants: variantsPatch },
        { pageId: resolvedPageId }
      );
    }
    if (field === "statLabel" || field === "statValue" || field === "badgeText") {
      return updateSectionContentOverride(
        project,
        "hero",
        { variants: { [activeHeroVariant]: { [field]: trimmed } } },
        { pageId: resolvedPageId }
      );
    }
    const invoiceMatch = /^invoiceList\.(\d+)\.(name|status)$/.exec(field);
    if (invoiceMatch) {
      const idx = Number(invoiceMatch[1]);
      const prop = invoiceMatch[2];
      const remitCfg = (resolvedHero.variants as Record<string, unknown>)[activeHeroVariant] as
        { invoiceList?: Array<Record<string, unknown>> } | undefined;
      const nextList = (remitCfg?.invoiceList ?? DEFAULT_HERO_INVOICES).map((row) => ({ ...row }));
      if (idx >= 0 && idx < nextList.length) {
        nextList[idx] = { ...nextList[idx], [prop]: trimmed };
        return updateSectionContentOverride(
          project,
          "hero",
          { variants: { [activeHeroVariant]: { invoiceList: nextList } } },
          { pageId: resolvedPageId }
        );
      }
    }
    const tabMatch = /^tabs\.(\d+)\.(label|title|description)$/.exec(field);
    if (tabMatch) {
      const tIdx = Number(tabMatch[1]);
      const prop = tabMatch[2];
      const interactiveCfg = resolvedHero.variants.interactive as
        { variant?: string; tabs?: Array<Record<string, unknown>> } | undefined;
      const nextTabs = [...(interactiveCfg?.tabs ?? [])];
      if (nextTabs[tIdx]) {
        nextTabs[tIdx] = { ...nextTabs[tIdx], [prop]: trimmed };
        return updateSectionContentOverride(
          project,
          "hero",
          { variants: { interactive: { variant: "interactive", tabs: nextTabs } } },
          { pageId: resolvedPageId }
        );
      }
    }
    const tabItemMatch = /^tabs\.(\d+)\.items\.(\d+)$/.exec(field);
    if (tabItemMatch) {
      const tIdx = Number(tabItemMatch[1]);
      const bIdx = Number(tabItemMatch[2]);
      const interactiveCfg = resolvedHero.variants.interactive as
        | { variant?: string; tabs?: Array<{ items?: string[] } & Record<string, unknown>> }
        | undefined;
      const nextTabs = [...(interactiveCfg?.tabs ?? [])];
      if (nextTabs[tIdx] && Array.isArray(nextTabs[tIdx].items)) {
        const nextItems = [...(nextTabs[tIdx].items ?? [])];
        if (bIdx >= 0 && bIdx < nextItems.length) {
          nextItems[bIdx] = trimmed;
          nextTabs[tIdx] = { ...nextTabs[tIdx], items: nextItems };
          return updateSectionContentOverride(
            project,
            "hero",
            { variants: { interactive: { variant: "interactive", tabs: nextTabs } } },
            { pageId: resolvedPageId }
          );
        }
      }
    }
    const slideMatch =
      /^slides\.(\d+)\.(title|subtitle|caption|action\.label|image\.src|image\.alt|videoUrl|quote|author|role)$/.exec(
        field
      );
    if (slideMatch) {
      const idx = Number(slideMatch[1]);
      const prop = slideMatch[2];
      if (activeHeroVariant === "split") {
        const splitCfg = resolvedHero.variants.split as unknown as
          | {
              variant?: string;
              image?: Record<string, unknown>;
              slides?: Array<Record<string, unknown>>;
            }
          | undefined;
        const seedSlides = (
          splitCfg?.slides && splitCfg.slides.length > 0
            ? splitCfg.slides
            : defaultSplitSlides.map((d, i) => ({
                id: d.id,
                image:
                  i === 0 &&
                  splitCfg?.image &&
                  !String((splitCfg.image as { src?: string }).src ?? "").startsWith(
                    "data:image/svg+xml"
                  )
                    ? splitCfg.image
                    : d.image,
                videoUrl: d.videoSrc,
                quote: d.testimonial.quote,
                author: d.testimonial.author,
                role: d.testimonial.role,
              }))
        ) as Array<Record<string, unknown>>;
        const nextSlides = seedSlides.map((s) => ({ ...s }));
        if (nextSlides[idx]) {
          if (prop === "image.src" || prop === "image.alt") {
            const imgProp = prop.slice("image.".length);
            nextSlides[idx] = {
              ...nextSlides[idx],
              image: {
                ...((nextSlides[idx].image as Record<string, unknown> | undefined) ?? {}),
                [imgProp]: trimmed,
              },
            };
          } else {
            nextSlides[idx] = { ...nextSlides[idx], [prop]: trimmed };
          }
          return updateSectionContentOverride(
            project,
            "hero",
            {
              variants: {
                split: {
                  ...(splitCfg ?? { variant: "split", image: defaultSplitSlides[0].image }),
                  variant: "split",
                  slides: nextSlides,
                },
              },
            },
            { pageId: resolvedPageId }
          );
        }
      }
      const slideshowCfg = resolvedHero.variants.slideshow as unknown as
        { variant?: string; slides?: Array<Record<string, unknown>> } | undefined;
      const slides = [...(slideshowCfg?.slides ?? [])];
      if (slides[idx]) {
        if (prop === "action.label") {
          slides[idx] = {
            ...slides[idx],
            action: {
              ...((slides[idx].action as Record<string, unknown> | undefined) ?? {
                href: "#pricing",
              }),
              label: trimmed,
            },
          };
        } else if (prop === "image.src" || prop === "image.alt") {
          const imgProp = prop.slice("image.".length);
          slides[idx] = { ...slides[idx], [imgProp]: trimmed };
        } else {
          slides[idx] = { ...slides[idx], [prop]: trimmed };
        }
        return updateSectionContentOverride(
          project,
          "hero",
          { variants: { slideshow: { variant: "slideshow", slides } } },
          { pageId: resolvedPageId }
        );
      }
    }
    return project;
  }

  if (scope === "cta") {
    const resolvedCta = targetPage
      ? resolvePageContent(project, targetPage).cta
      : formaLandingContent.cta;
    if (field === "eyebrow") {
      return updateSectionContentOverride(
        project,
        "cta",
        { eyebrow: trimmed },
        { pageId: resolvedPageId }
      );
    }
    if (field === "action.label" || field === "primaryLabel") {
      return updateSectionContentOverride(
        project,
        "cta",
        { action: { label: trimmed } },
        { pageId: resolvedPageId }
      );
    }
    if (field === "secondaryAction.label") {
      return updateSectionContentOverride(
        project,
        "cta",
        {
          secondaryAction: {
            ...(resolvedCta.secondaryAction ?? { href: "#features" }),
            label: trimmed,
          },
        },
        { pageId: resolvedPageId }
      );
    }
    if (field === "videoUrl") {
      return updateSectionContentOverride(
        project,
        "cta",
        { editorial: { videoUrl: trimmed } },
        { pageId: resolvedPageId }
      );
    }
    if (field === "imageSrc") {
      return updateSectionContentOverride(
        project,
        "cta",
        {
          editorial: {
            image: {
              ...(resolvedCta.editorial?.image ?? { alt: resolvedCta.title }),
              src: trimmed,
            },
          },
        },
        { pageId: resolvedPageId }
      );
    }
    const avatarMatch = /^avatars\.(\d+)$/.exec(field);
    if (avatarMatch) {
      const idx = Number(avatarMatch[1]);
      const baseAvatars =
        resolvedCta.editorial?.avatars && resolvedCta.editorial.avatars.length > 0
          ? resolvedCta.editorial.avatars
          : DEFAULT_CTA_AVATARS;
      const nextAvatars = [...baseAvatars];
      if (idx >= 0 && idx < nextAvatars.length) {
        nextAvatars[idx] = trimmed;
        return updateSectionContentOverride(
          project,
          "cta",
          { editorial: { avatars: nextAvatars } },
          { pageId: resolvedPageId }
        );
      }
    }
    if (field.startsWith("editorial.")) {
      const subField = field.slice("editorial.".length);
      if (
        subField === "videoCaptionLabel" ||
        subField === "videoPromptLabel" ||
        subField === "videoTitle" ||
        subField === "rating" ||
        subField === "ratingSummary"
      ) {
        return updateSectionContentOverride(
          project,
          "cta",
          { editorial: { [subField]: trimmed } },
          { pageId: resolvedPageId }
        );
      }
    }
    const benefitMatch = /^benefits\.(\d+)$/.exec(field);
    if (benefitMatch) {
      const idx = Number(benefitMatch[1]);
      const nextBenefits = [...resolvedCta.benefits];
      if (idx >= 0 && idx < nextBenefits.length) {
        nextBenefits[idx] = trimmed;
        return updateSectionContentOverride(
          project,
          "cta",
          { benefits: nextBenefits },
          { pageId: resolvedPageId }
        );
      }
    }
  }

  if (scope === "footer") {
    const isCustomFooter = targetPage?.sharedMode?.footer === "custom";
    const resolvedFooter = targetPage
      ? resolvePageContent(project, targetPage).footer
      : formaLandingContent.footer;
    const shared = getEffectiveSharedSections(project);

    const applyFooterPatch = (
      patch: Record<string, unknown>,
      sharedPatch?: Partial<NonNullable<WebsiteSharedSections["footer"]>>
    ): WebsiteProjectConfig => {
      const updated = updateSectionContentOverride(project, "footer", patch, {
        pageId: resolvedPageId,
        global: !isCustomFooter,
      });
      if (isCustomFooter || !sharedPatch) return updated;
      return {
        ...updated,
        shared: {
          ...updated.shared,
          footer: {
            ...shared.footer!,
            ...sharedPatch,
          },
        },
      };
    };

    if (
      field === "heading" ||
      field === "description" ||
      field === "note" ||
      field === "officeHours"
    ) {
      return applyFooterPatch({ [field]: trimmed }, { [field]: trimmed });
    }
    if (field === "status.label") {
      const baseStatus = resolvedFooter.status ?? {
        label: "All systems operational",
        href: "/status",
      };
      const nextStatus = { ...baseStatus, label: trimmed };
      return applyFooterPatch(
        { status: nextStatus },
        shared.footer?.status ? { status: { ...shared.footer.status, label: trimmed } } : undefined
      );
    }
    const contactLinkMatch = /^contactLinks\.(\d+)\.label$/.exec(field);
    if (contactLinkMatch) {
      const cIdx = Number(contactLinkMatch[1]);
      const nextContactLinks = [...(resolvedFooter.contactLinks ?? [])];
      if (!nextContactLinks[cIdx]) return project;
      nextContactLinks[cIdx] = { ...nextContactLinks[cIdx], label: trimmed };
      const sharedLinks = project.shared?.footer?.contactLinks
        ? [...project.shared.footer.contactLinks]
        : undefined;
      if (sharedLinks?.[cIdx]) {
        sharedLinks[cIdx] = { ...sharedLinks[cIdx], label: trimmed };
      }
      return applyFooterPatch(
        { contactLinks: nextContactLinks },
        sharedLinks ? { contactLinks: sharedLinks } : undefined
      );
    }
    if (field === "contactAction.label") {
      const baseAction = resolvedFooter.contactAction ?? {
        label: "Book a demo",
        href: "#contact",
      };
      const nextAction = { ...baseAction, label: trimmed };
      return applyFooterPatch({ contactAction: nextAction }, { contactAction: nextAction });
    }
    const colTitleMatch = /^columns\.(\d+)\.title$/.exec(field);
    if (colTitleMatch) {
      const gIdx = Number(colTitleMatch[1]);
      const nextGroups = [...resolvedFooter.groups];
      if (!nextGroups[gIdx]) return project;
      nextGroups[gIdx] = { ...nextGroups[gIdx], title: trimmed };
      const sharedGroups = project.shared?.footer?.groups
        ? [...project.shared.footer.groups]
        : undefined;
      if (sharedGroups?.[gIdx]) {
        sharedGroups[gIdx] = { ...sharedGroups[gIdx], title: trimmed };
      }
      return applyFooterPatch(
        { groups: nextGroups },
        sharedGroups ? { groups: sharedGroups } : undefined
      );
    }
    const colLinkMatch = /^columns\.(\d+)\.links\.(\d+)\.label$/.exec(field);
    if (colLinkMatch) {
      const gIdx = Number(colLinkMatch[1]);
      const lIdx = Number(colLinkMatch[2]);
      const nextGroups = [...resolvedFooter.groups];
      if (!nextGroups[gIdx]?.links?.[lIdx]) return project;
      const nextLinks = [...nextGroups[gIdx].links];
      nextLinks[lIdx] = { ...nextLinks[lIdx], label: trimmed };
      nextGroups[gIdx] = { ...nextGroups[gIdx], links: nextLinks };
      const sharedGroups = project.shared?.footer?.groups
        ? [...project.shared.footer.groups]
        : undefined;
      if (sharedGroups?.[gIdx]?.links?.[lIdx]) {
        const nextSharedLinks = [...sharedGroups[gIdx].links];
        nextSharedLinks[lIdx] = { ...nextSharedLinks[lIdx], label: trimmed };
        sharedGroups[gIdx] = { ...sharedGroups[gIdx], links: nextSharedLinks };
      }
      return applyFooterPatch(
        { groups: nextGroups },
        sharedGroups ? { groups: sharedGroups } : undefined
      );
    }
    const legalLinkMatch = /^legalLinks\.(\d+)\.label$/.exec(field);
    if (legalLinkMatch) {
      const lIdx = Number(legalLinkMatch[1]);
      const nextLegal = [...(resolvedFooter.legalLinks ?? [])];
      if (!nextLegal[lIdx]) return project;
      nextLegal[lIdx] = { ...nextLegal[lIdx], label: trimmed };
      const sharedLegal = project.shared?.footer?.legalLinks
        ? [...project.shared.footer.legalLinks]
        : undefined;
      if (sharedLegal?.[lIdx]) {
        sharedLegal[lIdx] = { ...sharedLegal[lIdx], label: trimmed };
      }
      return applyFooterPatch(
        { legalLinks: nextLegal },
        sharedLegal ? { legalLinks: sharedLegal } : undefined
      );
    }
    return project;
  }

  const knownSection = sectionTypesSet.has(scope as LandingSectionType);
  if (!knownSection) return project;
  const sec = scope as LandingSectionType;

  if (field === "badge") {
    return {
      ...project,
      pages: project.pages.map((p) => {
        if (p.id !== resolvedPageId) return p;
        return {
          ...p,
          sections: p.sections.map((s) =>
            s.type === sec
              ? ({
                  ...s,
                  customSettings: { ...(s.customSettings ?? {}), badge: trimmed },
                } as LandingSectionSelection)
              : s
          ),
        };
      }),
    };
  }

  if (field.startsWith("illustration.")) {
    const subPath = field.slice("illustration.".length).split(".");
    const coerced: string | boolean =
      subPath[0] === "interactive" || subPath[0] === "showFloatingCallout"
        ? trimmed === "true"
        : trimmed;
    return {
      ...project,
      pages: project.pages.map((p) => {
        if (p.id !== resolvedPageId) return p;
        return {
          ...p,
          sections: p.sections.map((s) => {
            if (s.type !== sec) return s;
            const prevApp = (s.customSettings ?? {}) as SectionAppearanceSettings;
            const nextIllus = setNestedPath(
              (prevApp.illustration ?? {}) as Record<string, unknown>,
              subPath,
              coerced
            );
            return {
              ...s,
              customSettings: { ...prevApp, illustration: nextIllus },
            } as LandingSectionSelection;
          }),
        };
      }),
    };
  }

  if (field === "title" || field === "description") {
    return updateSectionContentOverride(
      project,
      sec,
      { [field]: trimmed },
      { pageId: resolvedPageId }
    );
  }

  if (field === "media.src" || field === "media.alt") {
    const prop = field.slice("media.".length);
    const resolvedSec = (targetPage
      ? resolvePageContent(project, targetPage)[sec]
      : formaLandingContent[sec]) as unknown as { media?: { src?: string; alt?: string } };
    return updateSectionContentOverride(
      project,
      sec,
      { media: { ...(resolvedSec.media ?? { src: "", alt: "" }), [prop]: trimmed } },
      { pageId: resolvedPageId }
    );
  }

  const itemMatch = /^items\.(\d+)(?:\.(.+))?$/.exec(field);
  if (itemMatch) {
    const idx = Number(itemMatch[1]);
    const subPath = itemMatch[2];
    const resolvedSec = (targetPage
      ? resolvePageContent(project, targetPage)[sec]
      : formaLandingContent[sec]) as unknown as { items?: unknown[] };
    const nextItems = [...(resolvedSec.items ?? [])];
    if (idx < 0 || idx >= nextItems.length) return project;
    const currentItem = nextItems[idx];
    if (!subPath) {
      if (currentItem && typeof currentItem === "object" && !Array.isArray(currentItem)) {
        nextItems[idx] = {
          ...(currentItem as Record<string, unknown>),
          name: trimmed,
        };
      } else {
        nextItems[idx] = trimmed;
      }
    } else if (currentItem && typeof currentItem === "object") {
      const itemObj = currentItem as Record<string, unknown>;
      if (subPath === "image") {
        nextItems[idx] = {
          ...itemObj,
          image:
            itemObj.image && typeof itemObj.image === "object"
              ? { ...(itemObj.image as Record<string, unknown>), src: trimmed }
              : trimmed,
        };
      } else if (subPath === "image.src" || subPath === "image.alt") {
        const imgProp = subPath.slice("image.".length);
        const existingImg = itemObj.image;
        nextItems[idx] = {
          ...itemObj,
          image:
            existingImg && typeof existingImg === "object"
              ? { ...(existingImg as Record<string, unknown>), [imgProp]: trimmed }
              : {
                  src: typeof existingImg === "string" ? existingImg : "",
                  alt: String(itemObj.title ?? ""),
                  [imgProp]: trimmed,
                },
        };
      } else if (sec === "how-it-works" && subPath.startsWith("subSteps.")) {
        const seeded = seedHowItWorksSubSteps(idx, itemObj.subSteps);
        nextItems[idx] = setNestedPath(
          { ...itemObj, subSteps: seeded },
          subPath.split("."),
          trimmed
        );
      } else {
        nextItems[idx] = setNestedPath(itemObj, subPath.split("."), trimmed);
      }
    }
    return updateSectionContentOverride(
      project,
      sec,
      { items: nextItems },
      { pageId: resolvedPageId }
    );
  }

  if (sec === "benefits") {
    const quoteMatch = /^impactQuotes\.(\d+)\.(highlight|quote|author)$/.exec(field);
    if (quoteMatch) {
      const qIdx = Number(quoteMatch[1]);
      const prop = quoteMatch[2];
      const resolvedBenefits = targetPage
        ? resolvePageContent(project, targetPage).benefits
        : formaLandingContent.benefits;
      const baseQuotes =
        resolvedBenefits.impactQuotes && resolvedBenefits.impactQuotes.length > 0
          ? resolvedBenefits.impactQuotes
          : DEFAULT_BENEFIT_QUOTES;
      const nextQuotes = baseQuotes.map((q) => ({ ...q }));
      if (qIdx >= 0 && qIdx < nextQuotes.length) {
        nextQuotes[qIdx] = { ...nextQuotes[qIdx], [prop]: trimmed };
        return updateSectionContentOverride(
          project,
          "benefits",
          { impactQuotes: nextQuotes },
          { pageId: resolvedPageId }
        );
      }
    }
  }

  if (sec === "testimonials" && field === "featuredAction.label") {
    const resolvedTestimonials = targetPage
      ? resolvePageContent(project, targetPage).testimonials
      : formaLandingContent.testimonials;
    return updateSectionContentOverride(
      project,
      "testimonials",
      {
        featuredAction: {
          ...(resolvedTestimonials.featuredAction ?? { href: "#contact" }),
          label: trimmed,
        },
      },
      { pageId: resolvedPageId }
    );
  }

  if (sec === "pricing") {
    const resolvedPricing = targetPage
      ? resolvePageContent(project, targetPage).pricing
      : formaLandingContent.pricing;
    const planFeatMatch = /^plans\.(\d+)\.features\.(\d+)$/.exec(field);
    if (planFeatMatch) {
      const pIdx = Number(planFeatMatch[1]);
      const fIdx = Number(planFeatMatch[2]);
      const nextPlans = [...resolvedPricing.plans];
      if (!nextPlans[pIdx]) return project;
      const nextFeatures = [...nextPlans[pIdx].features];
      if (fIdx < 0 || fIdx >= nextFeatures.length) return project;
      nextFeatures[fIdx] = trimmed;
      nextPlans[pIdx] = { ...nextPlans[pIdx], features: nextFeatures };
      return updateSectionContentOverride(
        project,
        "pricing",
        { plans: nextPlans },
        { pageId: resolvedPageId }
      );
    }
    const planActionMatch = /^plans\.(\d+)\.action\.label$/.exec(field);
    if (planActionMatch) {
      const pIdx = Number(planActionMatch[1]);
      const nextPlans = [...resolvedPricing.plans];
      if (!nextPlans[pIdx]) return project;
      nextPlans[pIdx] = {
        ...nextPlans[pIdx],
        action: { ...nextPlans[pIdx].action, label: trimmed },
      };
      return updateSectionContentOverride(
        project,
        "pricing",
        { plans: nextPlans },
        { pageId: resolvedPageId }
      );
    }
    const planFieldMatch = /^plans\.(\d+)\.(name|price|period|description|badge|icon)$/.exec(field);
    if (planFieldMatch) {
      const pIdx = Number(planFieldMatch[1]);
      const prop = planFieldMatch[2];
      const nextPlans = [...resolvedPricing.plans];
      if (!nextPlans[pIdx]) return project;
      nextPlans[pIdx] = { ...nextPlans[pIdx], [prop]: trimmed };
      return updateSectionContentOverride(
        project,
        "pricing",
        { plans: nextPlans },
        { pageId: resolvedPageId }
      );
    }
    const compLabelMatch = /^comparisons\.(\d+)\.label$/.exec(field);
    if (compLabelMatch) {
      const rIdx = Number(compLabelMatch[1]);
      const nextComps = resolvedPricing.comparisons.map((r) => ({ ...r, values: [...r.values] }));
      if (!nextComps[rIdx]) return project;
      nextComps[rIdx] = { ...nextComps[rIdx], label: trimmed };
      return updateSectionContentOverride(
        project,
        "pricing",
        { comparisons: nextComps },
        { pageId: resolvedPageId }
      );
    }
    const compValMatch = /^comparisons\.(\d+)\.values\.(\d+)$/.exec(field);
    if (compValMatch) {
      const rIdx = Number(compValMatch[1]);
      const cIdx = Number(compValMatch[2]);
      const nextComps = resolvedPricing.comparisons.map((r) => ({ ...r, values: [...r.values] }));
      if (!nextComps[rIdx]) return project;
      nextComps[rIdx].values[cIdx] = trimmed;
      return updateSectionContentOverride(
        project,
        "pricing",
        { comparisons: nextComps },
        { pageId: resolvedPageId }
      );
    }
  }

  return project;
}

/**
 * Reads the effective current value for any `data-hb-edit` path (`scope:field`)
 * across global chrome, landing sections, special pages, and modular blocks.
 */
export function readInlineContent(
  project: WebsiteProjectConfig,
  pageId: string,
  path: string
): string | boolean | undefined {
  const colonIdx = path.indexOf(":");
  if (colonIdx === -1) return undefined;
  const scope = path.slice(0, colonIdx);
  const field = path.slice(colonIdx + 1);
  if (!scope || !field) return undefined;

  const targetPage =
    project.pages.find((p) => p.id === pageId) ??
    project.pages.find((p) => p.id === project.activePageId) ??
    project.pages[0];

  if (scope === "brand") {
    return field === "name" ? project.brand.name : undefined;
  }

  if (scope === "announcement") {
    const ann = getEffectiveSharedSections(project).announcement;
    if (field === "text") return ann?.text;
    if (field === "badge") return ann?.badge;
    if (field === "linkLabel") return ann?.linkLabel;
    return undefined;
  }

  if (scope === "auth") {
    const auth = getEffectiveAuthConfig(project);
    const isSignup = targetPage?.template === "signup";
    const isRecovery = targetPage?.template === "recovery";
    if (field === "submitLabel") return auth.loginSubmitLabel;
    if (field === "heading") {
      return isSignup ? auth.signupHeading : isRecovery ? auth.recoveryHeading : auth.loginHeading;
    }
    if (field === "subheading") {
      return isSignup
        ? auth.signupDescription
        : isRecovery
          ? auth.recoveryDescription
          : auth.loginDescription;
    }
    const raw = (auth as unknown as Record<string, unknown>)[field];
    return typeof raw === "string" || typeof raw === "boolean" ? raw : undefined;
  }

  if (scope === "dashboard") {
    const dash = getEffectiveDashboardConfig(project);
    if (field === "appTitle") return dash.appTitle;
    if (field === "welcomeSubtitle") return dash.welcomeSubtitle;
    if (field === "backToSiteLabel") return dash.backToSiteLabel;
    const raw = getNestedPath(dash, field.split("."));
    return typeof raw === "string" || typeof raw === "boolean" ? raw : undefined;
  }

  if (scope === "notFound" || scope === "not-found") {
    const nf = getEffectiveNotFoundConfig(project);
    const raw = (nf as unknown as Record<string, unknown>)[field];
    return typeof raw === "string" || typeof raw === "boolean" ? raw : undefined;
  }

  if (MODULAR_SECTION_SCOPES.has(scope)) {
    const existing = targetPage?.modularOverrides?.[scope] as Record<string, unknown> | undefined;
    const segments = field.split(".");
    if (existing) {
      const direct = getNestedPath(existing, segments);
      if (typeof direct === "string" || typeof direct === "boolean") {
        return direct;
      }
    }
    const seedKey = `${scope}.${segments[0]}`;
    if (segments.length > 1 && MODULAR_ARRAY_DEFAULTS[seedKey]) {
      const seededArr = MODULAR_ARRAY_DEFAULTS[seedKey]();
      const fromSeed = getNestedPath(seededArr, segments.slice(1));
      if (typeof fromSeed === "string" || typeof fromSeed === "boolean") {
        return fromSeed;
      }
    }
    if (scope === "editorial-cta") {
      if (field === "imageSrc") return DEFAULT_CTA_IMAGE;
      if (field === "videoUrl") return DEFAULT_CTA_VIDEO;
    }
    return undefined;
  }

  const resolved = targetPage ? resolvePageContent(project, targetPage) : formaLandingContent;

  if (scope === "hero") {
    const activeHeroVariant =
      targetPage?.sections.find((s) => s.type === "hero")?.variant ?? "split-product";
    const variantCfg = resolved.hero.variants[
      activeHeroVariant as keyof typeof resolved.hero.variants
    ] as Record<string, unknown> | undefined;

    if (field.startsWith("illustration.")) {
      const heroSec = targetPage?.sections.find((s) => s.type === "hero");
      const illus = (heroSec?.customSettings as SectionAppearanceSettings | undefined)
        ?.illustration;
      const raw = illus
        ? getNestedPath(illus, field.slice("illustration.".length).split("."))
        : undefined;
      return typeof raw === "string" || typeof raw === "boolean" ? raw : undefined;
    }

    if (field.startsWith("slides.") && activeHeroVariant === "split") {
      const splitCfg = variantCfg as
        { slides?: Array<Record<string, unknown>>; image?: Record<string, unknown> } | undefined;
      const splitSlides = splitCfg?.slides?.length
        ? splitCfg.slides
        : defaultSplitSlides.map((d, i) => ({
            id: d.id,
            image:
              i === 0 &&
              splitCfg?.image &&
              !String((splitCfg.image as { src?: string }).src ?? "").startsWith(
                "data:image/svg+xml"
              )
                ? splitCfg.image
                : d.image,
            videoUrl: d.videoSrc,
            quote: d.testimonial.quote,
            author: d.testimonial.author,
            role: d.testimonial.role,
          }));
      const raw = getNestedPath({ slides: splitSlides }, field.split("."));
      return typeof raw === "string" || typeof raw === "boolean" ? raw : undefined;
    }

    if (field === "eyebrow" || field === "title" || field === "description") {
      return resolved.hero.content[field];
    }
    if (field === "primaryAction.label") return resolved.hero.content.primaryAction.label;
    if (field === "secondaryAction.label") return resolved.hero.content.secondaryAction?.label;
    const heroContentMedia = (resolved.hero.content as { media?: { src?: string } }).media;
    if (field === "media.src" || field === "heroImage") {
      const img = variantCfg?.image as { portraitSrc?: string; src?: string } | undefined;
      return img?.portraitSrc ?? img?.src ?? heroContentMedia?.src;
    }
    if (field === "video.src" || field === "videoUrl") {
      const vObj = variantCfg?.video as { src?: string } | undefined;
      return vObj?.src ?? (variantCfg?.videoUrl as string | undefined) ?? heroContentMedia?.src;
    }
    if (variantCfg) {
      const fromVar = getNestedPath(variantCfg, field.split("."));
      if (typeof fromVar === "string" || typeof fromVar === "boolean") return fromVar;
    }
    if (field.startsWith("invoiceList.")) {
      const fromDefault = getNestedPath({ invoiceList: DEFAULT_HERO_INVOICES }, field.split("."));
      if (typeof fromDefault === "string" || typeof fromDefault === "boolean") return fromDefault;
    }
    const fromHeroContent = getNestedPath(resolved.hero.content, field.split("."));
    return typeof fromHeroContent === "string" || typeof fromHeroContent === "boolean"
      ? fromHeroContent
      : undefined;
  }

  if (scope === "navbar") {
    if (field === "action.label" || field === "actionLabel") return resolved.navbar.action.label;
    const linksMatch = /^links\.(\d+)\.label$/.exec(field);
    if (linksMatch) {
      return resolved.navbar.links[Number(linksMatch[1])]?.label;
    }
    return undefined;
  }

  if (scope === "footer") {
    const colMatch = /^columns\.(\d+)\.(title|links\.(\d+)\.label)$/.exec(field);
    if (colMatch) {
      const gIdx = Number(colMatch[1]);
      if (colMatch[3] !== undefined) {
        return resolved.footer.groups[gIdx]?.links[Number(colMatch[3])]?.label;
      }
      return resolved.footer.groups[gIdx]?.title;
    }
    const raw = getNestedPath(resolved.footer, field.split("."));
    return typeof raw === "string" || typeof raw === "boolean" ? raw : undefined;
  }

  if (scope === "cta") {
    if (field === "videoUrl") return resolved.cta.editorial?.videoUrl ?? DEFAULT_CTA_VIDEO;
    if (field === "imageSrc") return resolved.cta.editorial?.image?.src ?? DEFAULT_CTA_IMAGE;
    const avatarMatch = /^avatars\.(\d+)$/.exec(field);
    if (avatarMatch) {
      const avatars = resolved.cta.editorial?.avatars?.length
        ? resolved.cta.editorial.avatars
        : DEFAULT_CTA_AVATARS;
      return avatars[Number(avatarMatch[1])];
    }
    const raw = getNestedPath(resolved.cta, field.split("."));
    return typeof raw === "string" || typeof raw === "boolean" ? raw : undefined;
  }

  if (scope === "how-it-works") {
    if (field === "media.src") {
      return resolved["how-it-works"].media?.src ?? resolved["how-it-works"].items[0]?.image?.src;
    }
    const subStepMatch = /^items\.(\d+)\.subSteps\.(\d+)\.(label|description|badge)$/.exec(field);
    if (subStepMatch) {
      const sIdx = Number(subStepMatch[1]);
      const subIdx = Number(subStepMatch[2]);
      const prop = subStepMatch[3];
      const seeded = seedHowItWorksSubSteps(sIdx, resolved["how-it-works"].items[sIdx]?.subSteps);
      const val = seeded[subIdx]?.[prop as "label" | "description" | "badge"];
      if (typeof val === "string") return val;
    }
    const raw = getNestedPath(resolved["how-it-works"], field.split("."));
    return typeof raw === "string" || typeof raw === "boolean" ? raw : undefined;
  }

  if (scope === "benefits") {
    const quoteMatch = /^impactQuotes\.(\d+)\.(highlight|quote|author)$/.exec(field);
    if (quoteMatch) {
      const baseQuotes = resolved.benefits.impactQuotes?.length
        ? resolved.benefits.impactQuotes
        : DEFAULT_BENEFIT_QUOTES;
      return getNestedPath(baseQuotes, [quoteMatch[1], quoteMatch[2]]) as string | undefined;
    }
  }

  if (scope === "testimonials" && field === "featuredAction.label") {
    return resolved.testimonials.featuredAction?.label ?? "See customer story";
  }

  if (scope in resolved) {
    const secSelection = targetPage?.sections.find((s) => s.type === (scope as LandingSectionType));
    const secAppearance = secSelection?.customSettings as SectionAppearanceSettings | undefined;
    if (field === "badge") {
      if (secAppearance?.badge?.trim()) return secAppearance.badge;
      if (scope === "pricing") return "Pricing";
      if (scope === "integrations") return "Integrations";
      if (scope === "faq") return "Support & FAQ";
      if (scope === "cta") return resolved.cta.eyebrow ?? "Get started";
      if (scope === "testimonials") return "TESTIMONIALS";
      if (scope === "features") return "YEAH... WE DIDN'T STOP THERE...";
      return undefined;
    }
    if (field.startsWith("illustration.")) {
      const raw = secAppearance?.illustration
        ? getNestedPath(secAppearance.illustration, field.slice("illustration.".length).split("."))
        : undefined;
      return typeof raw === "string" || typeof raw === "boolean" ? raw : undefined;
    }
    const secContent = resolved[scope as keyof typeof resolved];
    if (scope === "logos") {
      const logoMatch = /^items\.(\d+)$/.exec(field);
      if (logoMatch) {
        const logo = resolved.logos.items[Number(logoMatch[1])] as
          string | { src?: string; name?: string } | undefined;
        return typeof logo === "string" ? logo : (logo?.src ?? logo?.name);
      }
    }
    const itemImgMatch = /^items\.(\d+)\.image$/.exec(field);
    if (itemImgMatch) {
      const items = (secContent as { items?: Array<{ image?: string | { src?: string } }> }).items;
      const imgVal = items?.[Number(itemImgMatch[1])]?.image;
      return typeof imgVal === "string" ? imgVal : imgVal?.src;
    }
    const raw = getNestedPath(secContent, field.split("."));
    return typeof raw === "string" || typeof raw === "boolean" ? raw : undefined;
  }

  return undefined;
}

const sectionTypesSet = new Set<LandingSectionType>([
  "navbar",
  "hero",
  "logos",
  "benefits",
  "features",
  "how-it-works",
  "integrations",
  "testimonials",
  "pricing",
  "faq",
  "cta",
  "footer",
]);

export function movePageSection(
  project: WebsiteProjectConfig,
  pageId: string,
  sectionType: LandingSectionType,
  direction: "up" | "down"
): WebsiteProjectConfig {
  if (sectionType === "navbar" || sectionType === "footer") return project;
  return {
    ...project,
    pages: project.pages.map((page) => {
      if (page.id !== pageId) return page;
      const sections = [...page.sections];
      const idx = sections.findIndex((s) => s.type === sectionType);
      const swapIdx = direction === "up" ? idx - 1 : idx + 1;
      if (
        idx <= 0 ||
        swapIdx <= 0 ||
        swapIdx >= sections.length - 1 ||
        sections[swapIdx].type === "navbar" ||
        sections[swapIdx].type === "footer"
      ) {
        return page;
      }
      [sections[idx], sections[swapIdx]] = [sections[swapIdx], sections[idx]];
      return { ...page, sections };
    }),
  };
}

export function enableAndPositionPageSection(
  project: WebsiteProjectConfig,
  pageId: string,
  sectionType: LandingSectionType,
  afterType?: LandingSectionType
): WebsiteProjectConfig {
  return {
    ...project,
    pages: project.pages.map((page) => {
      if (page.id !== pageId) return page;
      const next = page.sections.map((s) =>
        s.type === sectionType ? ({ ...s, enabled: true } as LandingSectionSelection) : s
      );
      if (sectionType === "navbar" || sectionType === "footer" || !afterType) {
        return { ...page, sections: next };
      }
      const movingIdx = next.findIndex((s) => s.type === sectionType);
      const afterIdx = next.findIndex((s) => s.type === afterType);
      if (movingIdx === -1 || afterIdx === -1 || afterIdx >= next.length - 1) {
        return { ...page, sections: next };
      }
      const [item] = next.splice(movingIdx, 1);
      const recalculatedAfter = next.findIndex((s) => s.type === afterType);
      const insertAt = recalculatedAfter === -1 ? next.length - 1 : recalculatedAfter + 1;
      next.splice(Math.max(1, Math.min(insertAt, next.length - 1)), 0, item);
      return { ...page, sections: next };
    }),
  };
}

export type WebsiteStarterPackId = "saas-complete" | "startup-launch" | "product-studio";

export function createWebsiteStarterPack(
  packId: WebsiteStarterPackId,
  baseLanding = createLandingPageConfig()
): WebsiteProjectConfig {
  let project = createWebsiteProject(baseLanding);
  if (packId === "product-studio") {
    project = addWebsitePage(project, "about", "about");
    project = addWebsitePage(project, "contact", "contact");
    project = addWebsitePage(project, "legal", "legal");
    project = addWebsitePage(project, "not-found", "not-found");
    project = {
      ...project,
      name: `${baseLanding.brand.name} Studio`,
      activePageId: "home",
      navigation: ["home", "about", "contact"],
      primaryActionPageId: "contact",
    };
  } else if (packId === "startup-launch") {
    project = addWebsitePage(project, "pricing", "pricing");
    project = addWebsitePage(project, "blog", "blog");
    project = addWebsitePage(project, "login", "login");
    project = addWebsitePage(project, "signup", "signup");
    project = addWebsitePage(project, "not-found", "not-found");
    project = {
      ...project,
      name: `${baseLanding.brand.name} Launch`,
      activePageId: "home",
      navigation: ["home", "pricing", "blog"],
      primaryActionPageId: "signup",
    };
  } else {
    project = addWebsitePage(project, "pricing", "pricing");
    project = addWebsitePage(project, "about", "about");
    project = addWebsitePage(project, "blog", "blog");
    project = addWebsitePage(project, "contact", "contact");
    project = addWebsitePage(project, "legal", "legal");
    project = addWebsitePage(project, "login", "login");
    project = addWebsitePage(project, "signup", "signup");
    project = addWebsitePage(project, "recovery", "recovery");
    project = addWebsitePage(project, "dashboard", "dashboard");
    project = addWebsitePage(project, "not-found", "not-found");
    project = {
      ...project,
      name: `${baseLanding.brand.name} Multipage`,
      activePageId: "home",
      navigation: ["home", "pricing", "about", "blog", "contact"],
      primaryActionPageId: "login",
    };
  }

  const shared = getEffectiveSharedSections(project);
  project = {
    ...project,
    tokens: getEffectiveTokens(project),
    shared,
    authConfig: getEffectiveAuthConfig(project),
    dashboardConfig: getEffectiveDashboardConfig(project),
    notFoundConfig: getEffectiveNotFoundConfig(project),
  };
  return syncNavigationFromSharedNavbar(project);
}

export function generateTailwindV4ThemeCss(
  brand: BrandProfile,
  tokens?: WebsiteDesignTokens
): string {
  const lightVars = brandCssVarsRecord({ ...brand, mode: "light" }, tokens);
  const darkVars = brandCssVarsRecord({ ...brand, mode: "dark" }, tokens);
  const formatVars = (vars: Record<string, string>) =>
    Object.entries(vars)
      .map(([key, val]) => `  ${key}: ${val};`)
      .join("\n");

  return `@import "tailwindcss";

@theme inline {
  --color-primary: var(--hb-accent);
  --color-primary-foreground: var(--hb-on-accent);
  --color-secondary: var(--hb-secondary);
  --color-background: var(--hb-bg);
  --color-foreground: var(--hb-ink);
  --color-card: var(--hb-surface);
  --color-muted-foreground: var(--hb-muted);
  --color-border: var(--hb-border);
  --font-sans: var(--hb-font);
  --font-heading: var(--hb-font-heading);
  --font-mono: var(--hb-font-mono);
  --radius-card: var(--hb-radius);
}

:root {
${formatVars(lightVars)}
}

.dark {
${formatVars(darkVars)}
}
`;
}

export function generateTokensJson(
  brand: BrandProfile,
  tokens?: WebsiteDesignTokens
): Record<string, unknown> {
  const resolved = {
    surfaceBase: tokens?.surfaceBase ?? "zinc",
    secondaryColor: tokens?.secondaryColor ?? "#6366f1",
    semantic: {
      success: tokens?.semantic?.success ?? "#10b981",
      warning: tokens?.semantic?.warning ?? "#f59e0b",
      danger: tokens?.semantic?.danger ?? "#ef4444",
    },
    typography: {
      headingFont: tokens?.typography?.headingFont ?? brand.fontFamily,
      bodyFont: tokens?.typography?.bodyFont ?? brand.fontFamily,
      monoFont: tokens?.typography?.monoFont ?? "JetBrains Mono",
      scale: tokens?.typography?.scale ?? "default",
      tracking: tokens?.typography?.tracking ?? "normal",
    },
    shape: {
      radiusPx: tokens?.shape?.radiusPx ?? { square: 0, soft: 12, round: 24 }[brand.radius],
      borderStyle: tokens?.shape?.borderStyle ?? "subtle",
      elevation: tokens?.shape?.elevation ?? "soft",
    },
    spacing: {
      containerWidth: tokens?.spacing?.containerWidth ?? "standard",
      sectionPadding:
        tokens?.spacing?.sectionPadding ??
        (brand.density === "compact" ? "compact" : "comfortable"),
    },
  };

  return {
    $schema: "https://hudbird.dev/schemas/design-tokens.v1.json",
    brand: {
      id: brand.id,
      name: brand.name,
      mode: brand.mode,
      primary: brand.primary,
    },
    tokens: resolved,
    cssVariables: brandCssVarsRecord(brand, tokens),
  };
}

export type WebsiteExportFileKind =
  "app" | "page" | "section" | "routes" | "css" | "config-json" | "tokens-json" | "standalone";

export interface WebsiteExportFile {
  path: string;
  language: "tsx" | "css" | "json";
  description: string;
  content: string;
  kind?: WebsiteExportFileKind;
  pageId?: string;
  sectionType?: string;
  syncedContent?: string;
  isCustomOverride?: boolean;
}

export function createWebsiteProjectFiles(project: WebsiteProjectConfig): WebsiteExportFile[] {
  const tokens = getEffectiveTokens(project);
  const routeLines = project.pages.map((p) => ({
    id: p.id,
    name: p.name,
    path: p.path,
    template: p.template,
    sharedNavbar: p.sharedMode?.navbar ?? "inherit",
    sharedFooter: p.sharedMode?.footer ?? "inherit",
    seo: p.seo,
  }));

  const routesFile = `import type { WebsiteTemplate } from "@hudbird/marketing";

export interface AppRouteMeta {
  id: string;
  name: string;
  path: string;
  template: WebsiteTemplate;
  sharedNavbar: "inherit" | "hidden" | "custom";
  sharedFooter: "inherit" | "hidden" | "custom";
}

export const WEBSITE_ROUTES: AppRouteMeta[] = ${JSON.stringify(routeLines, null, 2)};

export function resolvePagePath(pageId: string): string {
  return WEBSITE_ROUTES.find((route) => route.id === pageId)?.path ?? "/";
}
`;

  const appFile = `import { WebsiteProject } from "@hudbird/marketing";
import type { WebsiteProjectConfig } from "@hudbird/marketing";
import "@hudbird/marketing/pilot.css";
import "./styles/tokens.css";
import projectData from "./data/project.config.json";

const project = projectData as unknown as WebsiteProjectConfig;

export default function App() {
  return <WebsiteProject project={project} />;
}
`;

  return [
    {
      path: "src/App.tsx",
      language: "tsx" as const,
      kind: "app" as const,
      description: "Main multipage entry component rendering <WebsiteProject />",
      content: project.customFiles?.["src/App.tsx"] ?? appFile,
      syncedContent: appFile,
      isCustomOverride: Boolean(
        project.customFiles?.["src/App.tsx"] && project.customFiles["src/App.tsx"] !== appFile
      ),
    },
    {
      path: "src/StandaloneApp.tsx",
      language: "tsx" as const,
      kind: "standalone" as const,
      description: "Self-contained single-file TSX export (inline project config)",
      content: createWebsiteProjectCode(project),
      syncedContent: createWebsiteProjectCode(project),
    },
    {
      path: "src/routes.ts",
      language: "tsx" as const,
      kind: "routes" as const,
      description: "Typed multipage route manifest & ID-based URL resolver",
      content: project.customFiles?.["src/routes.ts"] ?? routesFile,
      syncedContent: routesFile,
      isCustomOverride: Boolean(
        project.customFiles?.["src/routes.ts"] &&
        project.customFiles["src/routes.ts"] !== routesFile
      ),
    },
    {
      path: "src/styles/tokens.css",
      language: "css" as const,
      kind: "css" as const,
      description: "Tailwind CSS v4 @theme & light/dark CSS custom properties",
      content: generateTailwindV4ThemeCss(project.brand, tokens),
      syncedContent: generateTailwindV4ThemeCss(project.brand, tokens),
    },
    {
      path: "src/data/project.config.json",
      language: "json" as const,
      kind: "config-json" as const,
      description: "Complete serialized multipage recipe, content overrides, links & tokens",
      content: JSON.stringify(project, null, 2),
      syncedContent: JSON.stringify(project, null, 2),
    },
    {
      path: "design-tokens.json",
      language: "json" as const,
      kind: "tokens-json" as const,
      description: "Design token JSON bundle (palette, fonts, radii, spacing)",
      content: JSON.stringify(generateTokensJson(project.brand, tokens), null, 2),
      syncedContent: JSON.stringify(generateTokensJson(project.brand, tokens), null, 2),
    },
  ];
}
