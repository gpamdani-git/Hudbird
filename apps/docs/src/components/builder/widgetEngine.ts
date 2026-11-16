import { resolveVariantManifest, type WebsitePage } from "@hudbird/marketing";
import type { LandingSectionType, SectionVariantManifest } from "@hudbird/schemas";
import type { SelectedCoreNode } from "./CoreComponentEditors";
import type { ScannedSectionProfile, WidgetPageGroup } from "./sectionScanner";

/**
 * Atomic widget modules that can be composed dynamically for any
 * Page -> Section -> Item -> CoreNode editing target across the builder.
 */
export type WidgetAtomId =
  | "core-header"
  | "shared-scope"
  | "variant-switcher"
  | "inline-field"
  | "typography-style"
  | "button-action"
  | "badge-editor"
  | "icon-picker"
  | "single-media"
  | "video-media"
  | "slideshow-media"
  | "code-illustration"
  | "card-surface"
  | "grid-layout"
  | "links-nav"
  | "brand-identity"
  | "color-palette"
  | "section-items"
  | "comparison-cell"
  | "hero-remit-stats"
  | "spacing-surface"
  | "motion-reveal"
  | "visibility-anchor"
  | "modular-fields"
  | "announcement-bar"
  | "auth-config"
  | "dashboard-config"
  | "not-found-config";

export type EngineTargetKind = "landing" | "chrome" | "special" | "modular";

export interface EditPathInsight {
  rawPath: string | null;
  scope: string | null;
  fieldPath: string;
  itemIndex: number | null;
  subIndex: number | null;
  valueIndex: number | null;
  isVideo: boolean;
  isSlideshow: boolean;
  isIcon: boolean;
  isMedia: boolean;
  isCodeIllustration: boolean;
  isComparison: boolean;
  isRemitStat: boolean;
  isButton: boolean;
  isBadge: boolean;
  isMultilineText: boolean;
}

export interface WidgetResolutionContext {
  pageTemplate: WebsitePage["template"];
  target: string;
  variant?: string;
  selectedNode?: SelectedCoreNode;
  selectedItemIndex?: number | null;
  editPath?: string | null;
  mode: "popover" | "drawer";
  scannedProfile?: ScannedSectionProfile;
}

export interface ResolvedWidgetPlan {
  normalizedTarget: string;
  targetKind: EngineTargetKind;
  selectedNode: SelectedCoreNode;
  selectedItemIndex: number | null;
  editPath: string | null;
  insight: EditPathInsight;
  manifest?: SectionVariantManifest | null;
  title: string;
  subtitle: string;
  recommendedCategory: WidgetPageGroup;
  atoms: WidgetAtomId[];
  useCategoryFilteredDrawer: boolean;
}

const CHROME_TARGETS = new Set<string>(["announcement", "navbar", "footer"]);

const LANDING_CONTENT_TARGETS = new Set<LandingSectionType>([
  "hero",
  "logos",
  "benefits",
  "how-it-works",
  "features",
  "integrations",
  "testimonials",
  "pricing",
  "faq",
  "cta",
]);

const SPECIAL_TARGETS = new Set<string>(["auth", "dashboard", "not-found"]);

const AUTH_TEMPLATES = new Set<WebsitePage["template"]>(["login", "signup", "recovery"]);

const SECTION_LABEL_MAP: Record<string, string> = {
  announcement: "Announcement Bar",
  navbar: "Navbar",
  hero: "Hero",
  logos: "Logo Cloud",
  benefits: "Benefits",
  "how-it-works": "How It Works",
  features: "Feature Showcase",
  integrations: "Integrations",
  testimonials: "Testimonials",
  pricing: "Pricing",
  faq: "FAQ",
  cta: "Call to Action",
  footer: "Footer",
  auth: "Account Authentication",
  dashboard: "Dashboard Workspace",
  "not-found": "404 Not Found",
  "pricing-compare": "Pricing Comparison",
  about: "About Intro",
  "who-are-we": "Who Are We",
  values: "Company Values",
  "our-team": "Our Team",
  "meet-our-expert": "Meet Our Experts",
  "editorial-cta": "Editorial CTA",
  "contact-mail": "Contact Channels",
  "contact-form-call": "Contact Form & Call",
  "contact-locations": "Office Locations",
  "legal-hero": "Legal Header",
  "legal-reader": "Legal Document",
  "legal-preferences": "Privacy Preferences",
  "blog-index": "Blog Index",
  "blog-post": "Blog Article",
};

const NODE_LABEL_MAP: Record<SelectedCoreNode, string> = {
  section: "Section",
  heading: "Heading Typography",
  text: "Body Typography",
  "primary-button": "Primary Action",
  "secondary-button": "Secondary Action",
  media: "Media & Assets",
  card: "Card Surface",
  badge: "Badge & Eyebrow",
  items: "Collection Item",
  grid: "Grid Layout",
  links: "Links & Navigation",
  brand: "Brand Identity",
};

/**
 * Normalizes canvas/inspector targets across aliases (`notFound` -> `not-found`)
 * while preserving chrome targets (`announcement`, `navbar`, `footer`) on special pages.
 */
export function normalizeEngineTarget(
  target: string,
  pageTemplate: WebsitePage["template"]
): { normalizedTarget: string; targetKind: EngineTargetKind } {
  const trimmed = target.trim();
  const aliasNormalized =
    trimmed === "notFound" ? "not-found" : trimmed === "about-section" ? "about" : trimmed;

  if (!aliasNormalized) {
    if (AUTH_TEMPLATES.has(pageTemplate)) {
      return { normalizedTarget: "auth", targetKind: "special" };
    }
    if (pageTemplate === "dashboard") {
      return { normalizedTarget: "dashboard", targetKind: "special" };
    }
    if (pageTemplate === "not-found") {
      return { normalizedTarget: "not-found", targetKind: "special" };
    }
    return { normalizedTarget: "hero", targetKind: "landing" };
  }

  if (CHROME_TARGETS.has(aliasNormalized)) {
    return { normalizedTarget: aliasNormalized, targetKind: "chrome" };
  }
  if (SPECIAL_TARGETS.has(aliasNormalized)) {
    return { normalizedTarget: aliasNormalized, targetKind: "special" };
  }
  if (LANDING_CONTENT_TARGETS.has(aliasNormalized as LandingSectionType)) {
    return { normalizedTarget: aliasNormalized, targetKind: "landing" };
  }
  return { normalizedTarget: aliasNormalized, targetKind: "modular" };
}

/**
 * Extracts all numeric array indices from any `scope:foo.0.bar.2` path.
 */
export function extractNumericIndicesFromPath(editPath?: string | null): number[] {
  if (!editPath) return [];
  const matches: number[] = [];
  const regex = /\.(\d+)(?=\.|$)/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(editPath)) !== null) {
    matches.push(Number(match[1]));
  }
  return matches;
}

export function extractItemIndexFromPath(editPath?: string | null): number | null {
  const indices = extractNumericIndicesFromPath(editPath);
  return indices.length > 0 ? indices[0] : null;
}

/**
 * Inspects an exact `data-hb-edit` path so the widget engine routes clicked
 * icons, video triggers, comparison cells, logos, slides, buttons, and inline text
 * to the right specialized widget atom across all templates.
 */
export function analyzeEditPath(
  editPath?: string | null,
  selectedNode: SelectedCoreNode = "section",
  normalizedTarget = "",
  variant = "",
  manifest?: SectionVariantManifest | null
): EditPathInsight {
  const rawPath = editPath?.trim() ? editPath.trim() : null;
  const colonIdx = rawPath ? rawPath.indexOf(":") : -1;
  const scope = rawPath && colonIdx > 0 ? rawPath.slice(0, colonIdx) : null;
  const fieldPath = rawPath && colonIdx > 0 ? rawPath.slice(colonIdx + 1) : (rawPath ?? "");
  const indices = extractNumericIndicesFromPath(rawPath);
  const lowerField = fieldPath.toLowerCase();

  const isVideo =
    lowerField.includes("videourl") ||
    lowerField.includes("video.src") ||
    lowerField === "video" ||
    lowerField.endsWith(".videourl");

  const isSlideshow =
    (lowerField.startsWith("slides") && !isVideo) ||
    (manifest?.visual.kind === "slideshow" && selectedNode === "media") ||
    (normalizedTarget === "hero" &&
      (variant === "slideshow" || variant === "split") &&
      selectedNode === "media" &&
      !isVideo);

  const isIcon =
    (selectedNode as string) === "icon" || lowerField === "icon" || lowerField.endsWith(".icon");

  const isExplicitImagePath =
    lowerField.endsWith(".src") ||
    lowerField.endsWith("imagesrc") ||
    lowerField.endsWith("postersrc") ||
    lowerField.endsWith("photosrc") ||
    lowerField.endsWith("portraitSrc".toLowerCase()) ||
    lowerField.endsWith("coverimage") ||
    lowerField.endsWith(".image") ||
    lowerField.includes("avatar") ||
    lowerField === "media.src" ||
    lowerField === "heroimage" ||
    (scope === "logos" && /^items\.\d+$/.test(lowerField));

  const isCodeIllustration =
    !isVideo &&
    !isSlideshow &&
    (lowerField === "illustration" ||
      lowerField.startsWith("illustration.") ||
      (selectedNode === "media" &&
        manifest?.visual.kind === "code-illustration" &&
        !isExplicitImagePath));

  const isMedia = !isVideo && !isSlideshow && !isCodeIllustration && isExplicitImagePath;

  const isComparison =
    lowerField.startsWith("comparisons.") ||
    (scope === "pricing-compare" && lowerField.startsWith("groups."));

  const isRemitStat =
    scope === "hero" &&
    (lowerField.startsWith("invoicelist") ||
      lowerField === "statlabel" ||
      lowerField === "statvalue" ||
      lowerField === "badgetext");

  const isButton =
    !isVideo &&
    (lowerField.endsWith("action.label") ||
      lowerField.endsWith("actionlabel") ||
      lowerField.endsWith("secondarylabel") ||
      lowerField.endsWith("ctalabel") ||
      lowerField === "submitlabel" ||
      lowerField === "backtositelabel" ||
      lowerField === "linklabel" ||
      lowerField.endsWith(".href"));

  const isBadge =
    !isIcon &&
    (lowerField === "badge" ||
      lowerField.endsWith(".badge") ||
      lowerField === "badgelabel" ||
      lowerField === "badgetext" ||
      lowerField === "eyebrow" ||
      lowerField === "category" ||
      lowerField === "group" ||
      lowerField.includes(".tags."));

  const isMultilineText =
    lowerField.includes("description") ||
    lowerField.includes("quote") ||
    lowerField.includes("summary") ||
    lowerField.includes("answer") ||
    lowerField.includes("subtitle") ||
    lowerField.includes("subheading") ||
    lowerField === "note" ||
    lowerField === "message";

  return {
    rawPath,
    scope,
    fieldPath,
    itemIndex: indices[0] ?? null,
    subIndex: indices[1] ?? null,
    valueIndex: indices[2] ?? null,
    isVideo,
    isSlideshow,
    isIcon,
    isMedia,
    isCodeIllustration,
    isComparison,
    isRemitStat,
    isButton,
    isBadge,
    isMultilineText,
  };
}

function humanizeEditLabel(insight: EditPathInsight, node: SelectedCoreNode): string {
  if (insight.isVideo) return "Video & Stream Media";
  if (insight.isSlideshow) return "Slideshow Media";
  if (insight.isCodeIllustration) return "Code Illustration & Mockup";
  if (insight.isIcon) return "Icon Picker";
  if (insight.isMedia) return "Image & Media";
  if (insight.isComparison) return "Comparison Matrix Cell";
  if (insight.isRemitStat) return "Live Stat & Invoice Item";
  if (insight.isButton) return "Button & Link Action";
  if (insight.isBadge) return "Badge & Label";
  return NODE_LABEL_MAP[node];
}

function getModularCapabilities(
  normalizedTarget: string,
  scannedProfile?: ScannedSectionProfile
): WidgetAtomId[] {
  const atoms: WidgetAtomId[] = ["modular-fields"];

  if (
    normalizedTarget === "about" ||
    normalizedTarget === "editorial-cta" ||
    scannedProfile?.capabilities.has("video-media")
  ) {
    atoms.push("video-media");
  }

  if (
    normalizedTarget === "about" ||
    normalizedTarget === "editorial-cta" ||
    normalizedTarget === "our-team" ||
    normalizedTarget === "meet-our-expert" ||
    normalizedTarget === "values" ||
    normalizedTarget === "contact-locations" ||
    normalizedTarget === "blog-index" ||
    normalizedTarget === "blog-post" ||
    scannedProfile?.capabilities.has("single-image")
  ) {
    atoms.push("single-media");
  }

  if (
    normalizedTarget === "pricing-compare" ||
    scannedProfile?.capabilities.has("comparison-matrix")
  ) {
    atoms.push("comparison-cell");
  }

  if (
    normalizedTarget === "meet-our-expert" ||
    normalizedTarget === "values" ||
    normalizedTarget === "our-team" ||
    normalizedTarget === "contact-mail" ||
    normalizedTarget === "contact-locations" ||
    normalizedTarget === "blog-index" ||
    normalizedTarget === "pricing-compare" ||
    scannedProfile?.capabilities.has("collection-items")
  ) {
    atoms.push("section-items");
  }

  atoms.push("color-palette", "spacing-surface", "visibility-anchor");
  return Array.from(new Set(atoms));
}

function dedupeAtoms(atoms: WidgetAtomId[]): WidgetAtomId[] {
  return Array.from(new Set(atoms));
}

/**
 * Resolves the exact ordered list of widget atoms to render for any
 * Page -> Section -> Item -> CoreNode state across both inline popover and right drawer modes.
 */
export function resolveWidgetPlan(ctx: WidgetResolutionContext): ResolvedWidgetPlan {
  const { normalizedTarget, targetKind } = normalizeEngineTarget(ctx.target, ctx.pageTemplate);
  const selectedNode: SelectedCoreNode = ctx.selectedNode ?? "section";
  const variant = ctx.variant ?? ctx.scannedProfile?.variant ?? "";
  const manifest =
    ctx.scannedProfile?.manifest ?? resolveVariantManifest(normalizedTarget, variant);
  const insight = analyzeEditPath(ctx.editPath, selectedNode, normalizedTarget, variant, manifest);
  const resolvedItemIndex = ctx.selectedItemIndex ?? insight.itemIndex ?? null;
  const sectionLabel =
    SECTION_LABEL_MAP[normalizedTarget] ?? ctx.scannedProfile?.title ?? normalizedTarget;

  // 1. Item / Node-level resolution works uniformly across ALL page templates & section types
  if (selectedNode !== "section" || insight.rawPath) {
    const atoms: WidgetAtomId[] = ["core-header"];
    let recommendedCategory: WidgetPageGroup = "type-actions";

    if (insight.isIcon) {
      atoms.push("icon-picker");
      recommendedCategory = "type-actions";
    } else if (insight.isVideo) {
      atoms.push("video-media");
      if (manifest?.visual.codeIllustrationId) {
        atoms.push("code-illustration");
      }
      recommendedCategory = "media-color";
    } else if (insight.isSlideshow) {
      atoms.push("slideshow-media");
      recommendedCategory = "media-color";
    } else if (insight.isCodeIllustration) {
      atoms.push("code-illustration");
      recommendedCategory = "media-color";
    } else if (insight.isComparison) {
      atoms.push("comparison-cell");
      if (ctx.mode === "drawer") atoms.push("card-surface");
      recommendedCategory = "layout-motion";
    } else if (insight.isRemitStat) {
      if (insight.rawPath) atoms.push("inline-field");
      atoms.push("hero-remit-stats");
      recommendedCategory = "data-advanced";
    } else if (insight.isMedia || selectedNode === "media") {
      atoms.push("single-media");
      if (insight.scope === "logos") {
        if (insight.rawPath) atoms.push("inline-field");
        if (ctx.mode === "drawer") atoms.push("section-items");
      }
      recommendedCategory = "media-color";
    } else if (
      selectedNode === "primary-button" ||
      selectedNode === "secondary-button" ||
      insight.isButton
    ) {
      atoms.push("button-action");
      recommendedCategory = "type-actions";
    } else if (
      selectedNode === "badge" ||
      (insight.isBadge && selectedNode !== "heading" && selectedNode !== "text")
    ) {
      if (insight.rawPath) atoms.push("inline-field");
      atoms.push("badge-editor");
      if (normalizedTarget === "announcement" && ctx.mode === "popover") {
        atoms.push("color-palette");
      }
      recommendedCategory = "type-actions";
    } else if (selectedNode === "heading" || selectedNode === "text") {
      if (insight.rawPath) atoms.push("inline-field");
      atoms.push("typography-style");
      recommendedCategory = "type-actions";
    } else if (selectedNode === "card") {
      atoms.push("card-surface");
      if (resolvedItemIndex !== null) atoms.push("section-items");
      recommendedCategory = "layout-motion";
    } else if (selectedNode === "grid") {
      atoms.push("grid-layout");
      recommendedCategory = "layout-motion";
    } else if (selectedNode === "links") {
      atoms.push("links-nav");
      recommendedCategory = "data-advanced";
    } else if (selectedNode === "brand") {
      atoms.push("brand-identity");
      if (normalizedTarget !== "navbar") atoms.push("color-palette");
      recommendedCategory = "media-color";
    } else if (selectedNode === "items") {
      if (insight.rawPath) atoms.push("inline-field");
      if (insight.scope === "logos") atoms.push("single-media");
      atoms.push("section-items");
      recommendedCategory = "layout-motion";
    } else if (insight.rawPath) {
      atoms.push("inline-field");
      atoms.push("typography-style");
    } else {
      atoms.push("section-items");
    }

    const itemBadge = resolvedItemIndex !== null ? ` #${resolvedItemIndex + 1}` : "";
    return {
      normalizedTarget,
      targetKind,
      selectedNode,
      selectedItemIndex: resolvedItemIndex,
      editPath: insight.rawPath,
      insight,
      manifest,
      title: `${humanizeEditLabel(insight, selectedNode)}${itemBadge}`,
      subtitle: `${sectionLabel} · ${ctx.mode === "popover" ? "Context widget" : "Layer inspector"}`,
      recommendedCategory,
      atoms: dedupeAtoms(atoms),
      useCategoryFilteredDrawer: false,
    };
  }

  // 2. Top-level Special & Chrome Section Targets
  if (normalizedTarget === "announcement") {
    return {
      normalizedTarget,
      targetKind,
      selectedNode,
      selectedItemIndex: resolvedItemIndex,
      editPath: insight.rawPath,
      insight,
      title: "Announcement Bar",
      subtitle: "Shared top notice across site pages.",
      recommendedCategory: "data-advanced",
      atoms: ["announcement-bar", "color-palette"],
      useCategoryFilteredDrawer: false,
    };
  }

  if (normalizedTarget === "auth") {
    return {
      normalizedTarget,
      targetKind,
      selectedNode,
      selectedItemIndex: resolvedItemIndex,
      editPath: insight.rawPath,
      insight,
      title: "Account Authentication",
      subtitle: "Login, signup, and recovery page controls.",
      recommendedCategory: "data-advanced",
      atoms: ["auth-config", "color-palette", "visibility-anchor"],
      useCategoryFilteredDrawer: false,
    };
  }

  if (normalizedTarget === "dashboard") {
    return {
      normalizedTarget,
      targetKind,
      selectedNode,
      selectedItemIndex: resolvedItemIndex,
      editPath: insight.rawPath,
      insight,
      title: "Dashboard Workspace",
      subtitle: "Authenticated app shell, stats, and blocks.",
      recommendedCategory: "layout-motion",
      atoms: ["dashboard-config", "grid-layout", "color-palette"],
      useCategoryFilteredDrawer: false,
    };
  }

  if (normalizedTarget === "not-found") {
    return {
      normalizedTarget,
      targetKind,
      selectedNode,
      selectedItemIndex: resolvedItemIndex,
      editPath: insight.rawPath,
      insight,
      title: "404 Not Found",
      subtitle: "Fallback page heading, copy, and recovery CTA.",
      recommendedCategory: "type-actions",
      atoms: ["not-found-config", "color-palette"],
      useCategoryFilteredDrawer: false,
    };
  }

  // 3. Modular Page Sections
  if (targetKind === "modular") {
    return {
      normalizedTarget,
      targetKind,
      selectedNode,
      selectedItemIndex: resolvedItemIndex,
      editPath: insight.rawPath,
      insight,
      title: sectionLabel,
      subtitle: `${normalizedTarget} section settings`,
      recommendedCategory: ctx.scannedProfile?.recommendedPage ?? "type-actions",
      atoms: getModularCapabilities(normalizedTarget, ctx.scannedProfile),
      useCategoryFilteredDrawer: false,
    };
  }

  // 4. Full Landing Sections + Global Navbar / Footer (category-filtered scanner drawer)
  return {
    normalizedTarget,
    targetKind,
    selectedNode,
    selectedItemIndex: resolvedItemIndex,
    editPath: insight.rawPath,
    insight,
    manifest,
    title: sectionLabel,
    subtitle: ctx.scannedProfile?.variantSummary ?? `${normalizedTarget} section`,
    recommendedCategory: ctx.scannedProfile?.recommendedPage ?? "type-actions",
    atoms: [
      ...(normalizedTarget === "navbar" || normalizedTarget === "footer"
        ? (["shared-scope"] as WidgetAtomId[])
        : []),
      "variant-switcher",
      "color-palette",
      "typography-style",
      "button-action",
      "badge-editor",
      "icon-picker",
      "single-media",
      "video-media",
      "slideshow-media",
      "card-surface",
      "grid-layout",
      "links-nav",
      "brand-identity",
      "section-items",
      "spacing-surface",
      "motion-reveal",
      "visibility-anchor",
    ],
    useCategoryFilteredDrawer: true,
  };
}
