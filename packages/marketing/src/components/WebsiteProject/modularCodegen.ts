import type {
  LandingSectionSelection,
  LandingSectionType,
  SectionAppearanceSettings,
} from "@hudbird/schemas";
import {
  createWebsiteProjectFiles,
  getAboutPageSections,
  getContactPageSections,
  getEffectiveAuthConfig,
  getEffectiveDashboardConfig,
  getEffectiveNotFoundConfig,
  getEffectiveSharedSections,
  getEffectiveTokens,
  getLegalPageSections,
  isPricingCompareEnabled,
  isSectionPage,
  resolvePageContent,
  type WebsiteExportFile,
  type WebsitePage,
  type WebsiteProjectConfig,
} from "./config";

const SECTION_COMPONENT_NAMES: Record<
  LandingSectionType,
  { importName: string; fileStem: string }
> = {
  navbar: { importName: "LandingNavbar", fileStem: "NavbarSection" },
  hero: { importName: "HeroSection", fileStem: "HeroSection" },
  logos: { importName: "LandingLogoCloud", fileStem: "LogoCloudSection" },
  benefits: { importName: "LandingBenefits", fileStem: "BenefitsSection" },
  features: { importName: "LandingFeatureShowcase", fileStem: "FeaturesSection" },
  "how-it-works": { importName: "LandingHowItWorks", fileStem: "HowItWorksSection" },
  integrations: { importName: "LandingIntegrations", fileStem: "IntegrationsSection" },
  testimonials: { importName: "LandingTestimonials", fileStem: "TestimonialsSection" },
  pricing: { importName: "LandingPricing", fileStem: "PricingSection" },
  faq: { importName: "LandingFaq", fileStem: "FaqSection" },
  cta: { importName: "LandingCta", fileStem: "CtaSection" },
  footer: { importName: "LandingFooter", fileStem: "FooterSection" },
};

const MODULAR_BLOCK_META: Record<string, { importName: string; fileStem: string }> = {
  "pricing-compare": { importName: "PricingCompareSection", fileStem: "PricingCompareSection" },
  about: { importName: "AboutUsSection", fileStem: "AboutHeroSection" },
  "who-are-we": { importName: "WhoAreWeSection", fileStem: "WhoAreWeSection" },
  "our-team": { importName: "OurTeamSection", fileStem: "OurTeamSection" },
  "meet-our-expert": { importName: "MeetOurExpertSection", fileStem: "MeetOurExpertSection" },
  values: { importName: "ValuesSection", fileStem: "ValuesSection" },
  "editorial-cta": { importName: "EditorialBrandCtaSection", fileStem: "EditorialBrandCtaSection" },
  "blog-index": { importName: "BlogIndexSection", fileStem: "BlogIndexSection" },
  "blog-post": { importName: "BlogPostSection", fileStem: "BlogPostSection" },
  "contact-mail": { importName: "ContactPageSection", fileStem: "ContactSection" },
  "legal-hero": { importName: "LegalPageSection", fileStem: "LegalSection" },
  auth: { importName: "LoginPage", fileStem: "AuthSection" },
  dashboard: { importName: "ApplicationPageRenderer", fileStem: "DashboardSection" },
  "not-found": { importName: "Section", fileStem: "NotFoundSection" },
};

export function toPascalIdentifier(raw: string, fallback = "Generated"): string {
  const words = raw
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return fallback;
  const pascal = words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("");
  return /^[A-Za-z_]/.test(pascal) ? pascal : `${fallback}${pascal}`;
}

export function getPageSlugFolder(page: WebsitePage): string {
  const clean = page.id.replace(/[^a-zA-Z0-9_-]+/g, "-").replace(/^-+|-+$/g, "");
  return clean || "page";
}

export function resolvePageFilePath(project: WebsiteProjectConfig, pageId: string): string {
  const seen = new Set<string>();
  for (const p of project.pages) {
    let stem = toPascalIdentifier(p.name, "Custom");
    if (!stem.endsWith("Page")) stem = `${stem}Page`;
    if (seen.has(stem.toLowerCase())) {
      stem = `${toPascalIdentifier(p.id, "Page")}${stem}`;
    }
    seen.add(stem.toLowerCase());
    if (p.id === pageId) {
      return `src/pages/${stem}.tsx`;
    }
  }
  return "src/pages/HomePage.tsx";
}

export function resolveSectionFilePath(
  project: WebsiteProjectConfig,
  pageId: string,
  sectionType: string
): string {
  const page = project.pages.find((p) => p.id === pageId) ?? project.pages[0];
  const isSharedChrome =
    (sectionType === "navbar" || sectionType === "footer") &&
    (page?.sharedMode?.[sectionType] ?? "inherit") === "inherit";
  const landingMeta = SECTION_COMPONENT_NAMES[sectionType as LandingSectionType];
  const modularMeta = MODULAR_BLOCK_META[sectionType];
  const stem =
    landingMeta?.fileStem ?? modularMeta?.fileStem ?? `${toPascalIdentifier(sectionType)}Section`;
  if (isSharedChrome) {
    return `src/sections/shared/${stem}.tsx`;
  }
  return `src/sections/${getPageSlugFolder(page)}/${stem}.tsx`;
}

function formatTsJson(value: unknown): string {
  return JSON.stringify(value, null, 2);
}

function buildLandingSectionTsx(
  project: WebsiteProjectConfig,
  page: WebsitePage,
  selection: LandingSectionSelection
): string {
  const resolved = resolvePageContent(project, page, { hashRoutes: true });
  const sectionType = selection.type;
  const meta = SECTION_COMPONENT_NAMES[sectionType];
  const prefix =
    (sectionType === "navbar" || sectionType === "footer") &&
    (page.sharedMode?.[sectionType] ?? "inherit") === "inherit"
      ? "Shared"
      : toPascalIdentifier(page.id, "Page");
  const componentFnName = `${prefix}${meta.fileStem}`;
  const appearance = (selection.customSettings as SectionAppearanceSettings | undefined) ?? {};

  if (sectionType === "hero") {
    const heroConfig =
      resolved.hero.variants[selection.variant] ??
      ({ variant: selection.variant } as Record<string, unknown>);
    return `import { HeroSection } from "@hudbird/marketing";

export const sectionVariant = ${formatTsJson(selection.variant)} as const;
export const sectionContent = ${formatTsJson(resolved.hero.content)};
export const sectionConfig = ${formatTsJson(heroConfig)};
export const sectionAppearance = ${formatTsJson(appearance)};

export default function ${componentFnName}() {
  return (
    <HeroSection
      id="hero"
      content={sectionContent}
      config={{ ...sectionConfig, variant: sectionVariant } as never}
    />
  );
}
`;
  }

  if (sectionType === "navbar") {
    const isCustom = page.sharedMode?.navbar === "custom";
    const customBrand =
      isCustom && (page.sharedOverrides?.navbar as { brandName?: string } | undefined)?.brandName;
    const brandObj = customBrand ? { ...project.brand, name: customBrand } : project.brand;
    return `import { LandingNavbar } from "@hudbird/marketing";

export const sectionVariant = ${formatTsJson(selection.variant)} as const;
export const sectionContent = ${formatTsJson(resolved.navbar)};
export const sectionBrand = ${formatTsJson(brandObj)};
export const sectionAppearance = ${formatTsJson(appearance)};

export default function ${componentFnName}() {
  return (
    <LandingNavbar
      variant={sectionVariant as never}
      content={sectionContent}
      brand={sectionBrand}
      customSettings={sectionAppearance}
    />
  );
}
`;
  }

  if (sectionType === "footer") {
    return `import { LandingFooter } from "@hudbird/marketing";

export const sectionVariant = ${formatTsJson(selection.variant)} as const;
export const sectionContent = ${formatTsJson(resolved.footer)};
export const sectionBrand = ${formatTsJson(project.brand)};
export const sectionAppearance = ${formatTsJson(appearance)};

export default function ${componentFnName}() {
  return (
    <LandingFooter
      variant={sectionVariant as never}
      content={sectionContent}
      brand={sectionBrand}
    />
  );
}
`;
  }

  const sectionContent = resolved[sectionType as keyof typeof resolved];
  return `import { ${meta.importName} } from "@hudbird/marketing";

export const sectionVariant = ${formatTsJson(selection.variant)} as const;
export const sectionContent = ${formatTsJson(sectionContent)};
export const sectionAppearance = ${formatTsJson(appearance)};

export default function ${componentFnName}() {
  return <${meta.importName} variant={sectionVariant as never} content={sectionContent as never} />;
}
`;
}

function buildModularSectionTsx(
  project: WebsiteProjectConfig,
  page: WebsitePage,
  sectionType: string
): string | null {
  const meta = MODULAR_BLOCK_META[sectionType];
  if (!meta) return null;
  const pagePrefix = toPascalIdentifier(page.id, "Page");
  const componentFnName = `${pagePrefix}${meta.fileStem}`;
  const modStr = (id: string, field: string) => {
    const val = page.modularOverrides?.[id]?.[field];
    return typeof val === "string" ? val : undefined;
  };
  const modVal = (id: string, field: string) => page.modularOverrides?.[id]?.[field];

  let props: Record<string, unknown> = {};

  switch (sectionType) {
    case "pricing-compare":
      props = {
        badgeLabel: modStr("pricing-compare", "badgeLabel"),
        title: modStr("pricing-compare", "title"),
        description: modStr("pricing-compare", "description"),
        plans: modVal("pricing-compare", "plans"),
        groups: modVal("pricing-compare", "groups"),
      };
      break;
    case "about":
      props = {
        badgeLabel: modStr("about", "badgeLabel") ?? `About ${project.brand.name}`,
        title: modStr("about", "title"),
        actionLabel: modStr("about", "actionLabel") ?? `Explore ${project.brand.name}`,
        actionHref: "#who-are-we",
        posterSrc: modStr("about", "posterSrc"),
        videoUrl: modStr("about", "videoUrl"),
        videoTitle: modStr("about", "videoTitle"),
      };
      break;
    case "who-are-we":
      props = {
        badgeLabel: modStr("who-are-we", "badgeLabel"),
        title: modStr("who-are-we", "title"),
        description: modStr("who-are-we", "description"),
      };
      break;
    case "our-team":
      props = {
        title: modStr("our-team", "title"),
        description: modStr("our-team", "description"),
        imageSrc: modStr("our-team", "imageSrc"),
        imageAlt: modStr("our-team", "imageAlt"),
      };
      break;
    case "meet-our-expert":
      props = {
        badgeLabel: modStr("meet-our-expert", "badgeLabel"),
        title: modStr("meet-our-expert", "title"),
        description: modStr("meet-our-expert", "description"),
        experts: modVal("meet-our-expert", "experts"),
      };
      break;
    case "values":
      props = {
        brandName: project.brand.name,
        eyebrow: modStr("values", "eyebrow"),
        title: modStr("values", "title"),
        description: modStr("values", "description"),
        items: modVal("values", "items"),
      };
      break;
    case "editorial-cta":
      props = {
        title: modStr("editorial-cta", "title"),
        description: modStr("editorial-cta", "description"),
        primaryLabel: modStr("editorial-cta", "primaryLabel"),
        imageSrc: modStr("editorial-cta", "imageSrc"),
        videoUrl: modStr("editorial-cta", "videoUrl"),
        videoCaptionLabel: modStr("editorial-cta", "videoCaptionLabel"),
        videoPromptLabel: modStr("editorial-cta", "videoPromptLabel"),
        rating: modStr("editorial-cta", "rating"),
        ratingSummary: modStr("editorial-cta", "ratingSummary"),
        avatars: modVal("editorial-cta", "avatars"),
      };
      break;
    case "blog-index":
      props = {
        brandName: project.brand.name,
        badgeLabel: modStr("blog-index", "badgeLabel"),
        title: modStr("blog-index", "title"),
        description: modStr("blog-index", "description"),
        posts: modVal("blog-index", "posts"),
      };
      break;
    case "blog-post":
      props = {
        title: modStr("blog-post", "title"),
        summary: modStr("blog-post", "summary"),
        coverImage: modVal("blog-post", "coverImage"),
      };
      break;
    case "contact-mail": {
      const contactBlocks = getContactPageSections(page);
      props = {
        brandName: project.brand.name,
        title: modStr("contact-mail", "title"),
        description: modStr("contact-mail", "description"),
        channels: modVal("contact-mail", "channels"),
        formHeading: modStr("contact-form-call", "heading"),
        formSubheading: modStr("contact-form-call", "subheading"),
        locationsHeading: modStr("contact-locations", "heading"),
        locationsSubheading: modStr("contact-locations", "subheading"),
        offices: modVal("contact-locations", "offices"),
        visibleSections: Object.fromEntries(contactBlocks.map((b) => [b.id, b.enabled])),
      };
      break;
    }
    case "legal-hero": {
      const legalBlocks = getLegalPageSections(page);
      props = {
        brandName: project.brand.name,
        heroHeading: modStr("legal-hero", "heading"),
        heroSubheading: modStr("legal-hero", "subheading"),
        readerTocHeading: modStr("legal-reader", "tocHeading"),
        preferencesHeading: modStr("legal-preferences", "heading"),
        preferencesSubheading: modStr("legal-preferences", "subheading"),
        visibleSections: legalBlocks.filter((b) => b.enabled).map((b) => b.id),
      };
      break;
    }
    case "auth": {
      const auth = getEffectiveAuthConfig(project);
      props = {
        brandName: project.brand.name,
        variant: page.authLayout,
        heading:
          page.template === "signup"
            ? auth.signupHeading
            : page.template === "recovery"
              ? auth.recoveryHeading
              : auth.loginHeading,
        subheading:
          page.template === "signup"
            ? auth.signupDescription
            : page.template === "recovery"
              ? auth.recoveryDescription
              : auth.loginDescription,
        submitLabel: auth.loginSubmitLabel,
        showSocial: Boolean(
          auth.socialProviders?.google || auth.socialProviders?.github || auth.socialProviders?.sso
        ),
      };
      break;
    }
    case "dashboard": {
      const dash = getEffectiveDashboardConfig(project);
      props = {
        category: dash.category,
        brand: project.brand,
        appTitle: dash.appTitle,
        welcomeSubtitle: dash.welcomeSubtitle,
        blocks: dash.blocks.map((b) => ({
          type: b.type,
          variant: b.variant,
          enabled: b.enabled,
        })),
      };
      break;
    }
    case "not-found": {
      const nf = getEffectiveNotFoundConfig(project);
      return `import { Button, Container, Heading, Section, Text } from "@hudbird/ui";

export const sectionProps = ${formatTsJson(nf)};

export default function ${componentFnName}() {
  return (
    <Section spacing="xl">
      <Container size="sm" className="space-y-6 text-center">
        <Text variant="muted" className="font-mono text-sm">
          {sectionProps.code}
        </Text>
        <Heading as="h1" size="h2">
          {sectionProps.title}
        </Heading>
        <Text variant="muted">{sectionProps.description}</Text>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild color="primary">
            <a href="/">{sectionProps.primaryActionLabel || "Back to home"}</a>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
`;
    }
  }

  return `import { ${meta.importName} } from "@hudbird/marketing";

export const sectionProps = ${formatTsJson(props)};

export default function ${componentFnName}() {
  return <${meta.importName} {...(sectionProps as never)} />;
}
`;
}

function buildPageTsx(
  project: WebsiteProjectConfig,
  page: WebsitePage,
  pageFilePath: string
): string {
  const pageStem = pageFilePath.replace(/^src\/pages\//, "").replace(/\.tsx$/, "");
  const imports: string[] = [];
  const bodyCalls: string[] = [];
  const usedNames = new Set<string>();

  const registerSectionImport = (secType: string) => {
    const secPath = resolveSectionFilePath(project, page.id, secType);
    const importRel = secPath.replace(/^src\//, "../").replace(/\.tsx$/, "");
    let localName = toPascalIdentifier(
      secPath
        .split("/")
        .pop()
        ?.replace(/\.tsx$/, "") ?? secType,
      "SectionBlock"
    );
    if (usedNames.has(localName)) {
      localName = `${localName}${usedNames.size + 1}`;
    }
    usedNames.add(localName);
    imports.push(`import ${localName} from "${importRel}";`);
    return localName;
  };

  if (page.template === "not-found") {
    const name = registerSectionImport("not-found");
    bodyCalls.push(`      <${name} />`);
  } else if (
    page.template === "login" ||
    page.template === "signup" ||
    page.template === "recovery"
  ) {
    const name = registerSectionImport("auth");
    bodyCalls.push(`      <${name} />`);
  } else if (page.template === "dashboard") {
    const name = registerSectionImport("dashboard");
    bodyCalls.push(`      <${name} />`);
  } else if (isSectionPage(page)) {
    const enabled = page.sections.filter((s) => s.enabled);
    const navbarSec = enabled.find((s) => s.type === "navbar");
    const footerSec = enabled.find((s) => s.type === "footer");
    const middleSecs = enabled.filter((s) => s.type !== "navbar" && s.type !== "footer");

    if (navbarSec) {
      const navName = registerSectionImport("navbar");
      bodyCalls.push(`      <${navName} />`);
    }

    if (page.template === "about") {
      for (const block of getAboutPageSections(page)) {
        if (block.enabled) {
          const bName = registerSectionImport(block.id);
          bodyCalls.push(`      <${bName} />`);
        }
      }
    } else if (page.template === "contact") {
      const cName = registerSectionImport("contact-mail");
      bodyCalls.push(`      <${cName} />`);
    } else if (page.template === "legal") {
      const lName = registerSectionImport("legal-hero");
      bodyCalls.push(`      <${lName} />`);
    } else if (page.template === "blog") {
      const bName = registerSectionImport("blog-index");
      bodyCalls.push(`      <${bName} />`);
    } else if (page.template === "blog-post") {
      const bpName = registerSectionImport("blog-post");
      bodyCalls.push(`      <${bpName} />`);
    }

    for (const sec of middleSecs) {
      if (
        sec.type === "hero" &&
        (page.template === "about" ||
          page.template === "blog" ||
          page.template === "blog-post" ||
          page.template === "contact" ||
          page.template === "legal")
      ) {
        continue;
      }
      if (sec.type === "faq" && isPricingCompareEnabled(page)) {
        const cmpName = registerSectionImport("pricing-compare");
        bodyCalls.push(`      <${cmpName} />`);
      }
      const sName = registerSectionImport(sec.type);
      bodyCalls.push(`      <${sName} />`);
    }

    if (footerSec) {
      const footName = registerSectionImport("footer");
      bodyCalls.push(`      <${footName} />`);
    }
  }

  return `${imports.join("\n")}

export default function ${pageStem}() {
  return (
    <div className="min-h-screen w-full">
${bodyCalls.join("\n")}
    </div>
  );
}
`;
}

function buildModularAppTsx(project: WebsiteProjectConfig): string {
  const imports: string[] = [
    `import { useEffect, useState } from "react";`,
    `import { BrandScope } from "@hudbird/marketing";`,
    `import "@hudbird/marketing/pilot.css";`,
    `import "./styles/tokens.css";`,
  ];
  const routes: string[] = [];

  for (const page of project.pages) {
    const filePath = resolvePageFilePath(project, page.id);
    const compName = filePath.replace(/^src\/pages\//, "").replace(/\.tsx$/, "");
    imports.push(`import ${compName} from "./pages/${compName}";`);
    routes.push(`  { path: ${formatTsJson(page.path)}, Component: ${compName} }`);
  }

  const brandJson = formatTsJson(project.brand);
  const tokensJson = formatTsJson(getEffectiveTokens(project));

  return `${imports.join("\n")}

const BRAND = ${brandJson} as const;
const TOKENS = ${tokensJson} as const;

const ROUTE_TABLE = [
${routes.join(",\n")}
];

export default function App() {
  const [path, setPath] = useState(() =>
    typeof window === "undefined" ? "/" : window.location.hash.slice(1) || "/"
  );

  useEffect(() => {
    const onHashChange = () => setPath(window.location.hash.slice(1) || "/");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const match = ROUTE_TABLE.find((entry) => entry.path === path) ?? ROUTE_TABLE[0];
  const ActivePage = match.Component;

  return (
    <BrandScope brand={BRAND as never} tokens={TOKENS as never}>
      <ActivePage />
    </BrandScope>
  );
}
`;
}

export function createModularWebsiteProjectFiles(
  project: WebsiteProjectConfig
): WebsiteExportFile[] {
  const customFiles = project.customFiles ?? {};
  const applyOverride = (file: WebsiteExportFile): WebsiteExportFile => {
    const custom = customFiles[file.path];
    const isCustomOverride = typeof custom === "string" && custom !== file.content;
    return {
      ...file,
      syncedContent: file.content,
      content: isCustomOverride ? custom : file.content,
      isCustomOverride,
    };
  };

  const baseFiles = createWebsiteProjectFiles(project);
  const routesFile = baseFiles.find((f) => f.path === "src/routes.ts")!;
  const tokensCssFile = baseFiles.find((f) => f.path === "src/styles/tokens.css")!;
  const configJsonFile = baseFiles.find((f) => f.path === "src/data/project.config.json")!;
  const tokensJsonFile = baseFiles.find((f) => f.path === "design-tokens.json")!;
  const standaloneFile = baseFiles.find((f) => f.path === "src/StandaloneApp.tsx")!;

  const modularFiles: WebsiteExportFile[] = [];
  const emittedPaths = new Set<string>();

  const pushUnique = (file: WebsiteExportFile) => {
    if (emittedPaths.has(file.path)) return;
    emittedPaths.add(file.path);
    modularFiles.push(applyOverride(file));
  };

  const appSynced = buildModularAppTsx(project);
  pushUnique({
    path: "src/App.tsx",
    language: "tsx",
    kind: "app",
    description: "Main multipage App entry routing directly to modular page components",
    content: appSynced,
  });

  // Generate page files first
  for (const page of project.pages) {
    const pagePath = resolvePageFilePath(project, page.id);
    pushUnique({
      path: pagePath,
      language: "tsx",
      kind: "page",
      pageId: page.id,
      description: `${page.name} (${page.path}) page composition`,
      content: buildPageTsx(project, page, pagePath),
    });
  }

  // Generate section files for enabled sections on each page (prioritizing activePageId first)
  const orderedPages = [
    ...project.pages.filter((p) => p.id === project.activePageId),
    ...project.pages.filter((p) => p.id !== project.activePageId),
  ];

  // Shared chrome status check
  void getEffectiveSharedSections(project);

  for (const page of orderedPages) {
    if (page.template === "not-found") {
      const secPath = resolveSectionFilePath(project, page.id, "not-found");
      const content = buildModularSectionTsx(project, page, "not-found");
      if (content) {
        pushUnique({
          path: secPath,
          language: "tsx",
          kind: "section",
          pageId: page.id,
          sectionType: "not-found",
          description: `${page.name} · 404 Not Found section`,
          content,
        });
      }
      continue;
    }

    if (page.template === "login" || page.template === "signup" || page.template === "recovery") {
      const secPath = resolveSectionFilePath(project, page.id, "auth");
      const content = buildModularSectionTsx(project, page, "auth");
      if (content) {
        pushUnique({
          path: secPath,
          language: "tsx",
          kind: "section",
          pageId: page.id,
          sectionType: "auth",
          description: `${page.name} · Authentication section`,
          content,
        });
      }
      continue;
    }

    if (page.template === "dashboard") {
      const secPath = resolveSectionFilePath(project, page.id, "dashboard");
      const content = buildModularSectionTsx(project, page, "dashboard");
      if (content) {
        pushUnique({
          path: secPath,
          language: "tsx",
          kind: "section",
          pageId: page.id,
          sectionType: "dashboard",
          description: `${page.name} · Dashboard Application section`,
          content,
        });
      }
      continue;
    }

    if (!isSectionPage(page)) continue;

    // Emit modular blocks for specialized templates
    if (page.template === "about") {
      for (const block of getAboutPageSections(page)) {
        if (!block.enabled) continue;
        const secPath = resolveSectionFilePath(project, page.id, block.id);
        const content = buildModularSectionTsx(project, page, block.id);
        if (content) {
          pushUnique({
            path: secPath,
            language: "tsx",
            kind: "section",
            pageId: page.id,
            sectionType: block.id,
            description: `${page.name} · ${block.title}`,
            content,
          });
        }
      }
    } else if (page.template === "contact") {
      const secPath = resolveSectionFilePath(project, page.id, "contact-mail");
      const content = buildModularSectionTsx(project, page, "contact-mail");
      if (content) {
        pushUnique({
          path: secPath,
          language: "tsx",
          kind: "section",
          pageId: page.id,
          sectionType: "contact-mail",
          description: `${page.name} · Contact Page sections`,
          content,
        });
      }
    } else if (page.template === "legal") {
      const secPath = resolveSectionFilePath(project, page.id, "legal-hero");
      const content = buildModularSectionTsx(project, page, "legal-hero");
      if (content) {
        pushUnique({
          path: secPath,
          language: "tsx",
          kind: "section",
          pageId: page.id,
          sectionType: "legal-hero",
          description: `${page.name} · Legal Reader sections`,
          content,
        });
      }
    } else if (page.template === "blog") {
      const secPath = resolveSectionFilePath(project, page.id, "blog-index");
      const content = buildModularSectionTsx(project, page, "blog-index");
      if (content) {
        pushUnique({
          path: secPath,
          language: "tsx",
          kind: "section",
          pageId: page.id,
          sectionType: "blog-index",
          description: `${page.name} · Blog Catalog`,
          content,
        });
      }
    } else if (page.template === "blog-post") {
      const secPath = resolveSectionFilePath(project, page.id, "blog-post");
      const content = buildModularSectionTsx(project, page, "blog-post");
      if (content) {
        pushUnique({
          path: secPath,
          language: "tsx",
          kind: "section",
          pageId: page.id,
          sectionType: "blog-post",
          description: `${page.name} · Article Reader`,
          content,
        });
      }
    }

    if (isPricingCompareEnabled(page)) {
      const secPath = resolveSectionFilePath(project, page.id, "pricing-compare");
      const content = buildModularSectionTsx(project, page, "pricing-compare");
      if (content) {
        pushUnique({
          path: secPath,
          language: "tsx",
          kind: "section",
          pageId: page.id,
          sectionType: "pricing-compare",
          description: `${page.name} · Pricing Comparison Matrix`,
          content,
        });
      }
    }

    for (const section of page.sections) {
      if (!section.enabled) continue;
      if (
        section.type === "hero" &&
        (page.template === "about" ||
          page.template === "blog" ||
          page.template === "blog-post" ||
          page.template === "contact" ||
          page.template === "legal")
      ) {
        continue;
      }
      const secPath = resolveSectionFilePath(project, page.id, section.type);
      pushUnique({
        path: secPath,
        language: "tsx",
        kind: "section",
        pageId: page.id,
        sectionType: section.type,
        description: `${page.name} · ${section.type} (${section.variant})`,
        content: buildLandingSectionTsx(project, page, section),
      });
    }
  }

  pushUnique(tokensCssFile);
  pushUnique(routesFile);
  pushUnique(configJsonFile);
  pushUnique(tokensJsonFile);
  pushUnique(standaloneFile);

  return modularFiles;
}
