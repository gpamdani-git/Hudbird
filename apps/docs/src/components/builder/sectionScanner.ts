import {
  defaultSplitSlides,
  getEffectiveSharedSections,
  landingSectionRegistry,
  resolvePageContent,
  resolveVariantManifest,
  type WebsitePage,
  type WebsiteProjectConfig,
} from "@hudbird/marketing";
import type {
  HeroImage,
  HeroRemitGridConfig,
  LandingSectionType,
  SectionVariantManifest,
} from "@hudbird/schemas";
import type { SelectedCoreNode } from "./CoreComponentEditors";

export type ScannerCapability =
  | "color"
  | "single-image"
  | "video-media"
  | "multi-image-slideshow"
  | "code-illustration"
  | "typography"
  | "primary-button"
  | "secondary-button"
  | "badge"
  | "icon-picker"
  | "brand-logo"
  | "grid-layout"
  | "card-surface"
  | "spacing-container"
  | "motion-reveal"
  | "collection-items"
  | "interactive-tabs"
  | "comparison-matrix"
  | "form-fields"
  | "legal-consent"
  | "shared-scope"
  | "breakpoint-visibility"
  | "anchor-seo";

export type WidgetPageGroup = "media-color" | "type-actions" | "layout-motion" | "data-advanced";

export type ScannerCategoryFilter = "all" | WidgetPageGroup;

export const WIDGET_PAGE_META: Record<
  WidgetPageGroup,
  { id: WidgetPageGroup; shortLabel: string; label: string }
> = {
  "media-color": {
    id: "media-color",
    shortLabel: "Media & Color",
    label: "Media, Video & Color",
  },
  "type-actions": {
    id: "type-actions",
    shortLabel: "Type & Actions",
    label: "Typography, Actions & Icons",
  },
  "layout-motion": {
    id: "layout-motion",
    shortLabel: "Layout & Motion",
    label: "Layout, Grid, Cards & Motion",
  },
  "data-advanced": {
    id: "data-advanced",
    shortLabel: "Data & Scope",
    label: "Items, Forms, Scope & Visibility",
  },
};

export const CAPABILITY_PAGE_MAP: Record<ScannerCapability, WidgetPageGroup> = {
  color: "media-color",
  "single-image": "media-color",
  "video-media": "media-color",
  "multi-image-slideshow": "media-color",
  "code-illustration": "media-color",
  typography: "type-actions",
  "primary-button": "type-actions",
  "secondary-button": "type-actions",
  badge: "type-actions",
  "icon-picker": "type-actions",
  "brand-logo": "type-actions",
  "grid-layout": "layout-motion",
  "card-surface": "layout-motion",
  "spacing-container": "layout-motion",
  "motion-reveal": "layout-motion",
  "collection-items": "data-advanced",
  "interactive-tabs": "data-advanced",
  "comparison-matrix": "data-advanced",
  "form-fields": "data-advanced",
  "legal-consent": "data-advanced",
  "shared-scope": "data-advanced",
  "breakpoint-visibility": "data-advanced",
  "anchor-seo": "data-advanced",
};

export type TreeNodeIconKey =
  | "grid"
  | "badge"
  | "heading"
  | "text"
  | "primary-button"
  | "secondary-button"
  | "media"
  | "card"
  | "items"
  | "links"
  | "brand";

export interface ScannedTreeNode {
  node: SelectedCoreNode;
  label: string;
  coreType: string;
  iconKey: TreeNodeIconKey;
  itemLabels?: string[];
  itemSelectNode?: SelectedCoreNode;
  isSlideshowQueue?: boolean;
  detectedInDom?: boolean;
  domCount?: number;
}

export interface ScannedSlotDescriptor {
  slotId: string;
  capability: ScannerCapability;
  pageGroup: WidgetPageGroup;
  label: string;
  editKey?: string;
  coreNode?: SelectedCoreNode;
  itemCount?: number;
  detectedInDom: boolean;
  availableInSchema: boolean;
}

export interface ScannedSectionProfile {
  sectionType: string;
  variant: string;
  pageTemplate: string;
  title: string;
  variantSummary: string;
  manifest?: SectionVariantManifest | null;
  capabilities: Set<ScannerCapability>;
  slots: ScannedSlotDescriptor[];
  treeNodes: ScannedTreeNode[];
  availableWidgetPages: WidgetPageGroup[];
  recommendedPage: WidgetPageGroup;
  focusedSlotId?: string | null;
  mediaCount: number;
  videoCount: number;
  domScanned: boolean;
}

const ORDERED_PAGES: WidgetPageGroup[] = [
  "media-color",
  "type-actions",
  "layout-motion",
  "data-advanced",
];

function findSectionElementInDom(
  iframeDoc: Document | null | undefined,
  sectionType: string
): HTMLElement | null {
  if (!iframeDoc) return null;
  const candidates =
    sectionType === "logos"
      ? ["logos", "logo-cloud"]
      : sectionType === "logo-cloud"
        ? ["logo-cloud", "logos"]
        : [sectionType];
  for (const id of candidates) {
    const el = iframeDoc.querySelector<HTMLElement>(`[data-landing-section="${id}"]`);
    if (el) return el;
  }
  if (sectionType === "navbar") {
    return iframeDoc.querySelector<HTMLElement>("header");
  }
  if (sectionType === "footer") {
    return iframeDoc.querySelector<HTMLElement>("footer");
  }
  return null;
}

/**
 * Unified Dynamic Variant-Aware Section Scanner.
 * Combines live iframe DOM telemetry, @hudbird/schemas variant rules,
 * resolved content counts, and canvas focus priority to drive BOTH
 * the Left Layers Tree (BuilderTreeInspector) and Right Settings Drawer (SectionEditorPanel).
 */
export function scanActiveSection(params: {
  project: WebsiteProjectConfig;
  page: WebsitePage;
  selectedTarget: string;
  selectedCoreNode?: SelectedCoreNode;
  selectedItemIndex?: number | null;
  iframeDoc?: Document | null;
}): ScannedSectionProfile {
  const {
    project,
    page,
    selectedTarget,
    selectedCoreNode = "section",
    selectedItemIndex = null,
    iframeDoc = null,
  } = params;

  const normalizedType = selectedTarget === "logo-cloud" ? "logos" : String(selectedTarget);
  const shared = getEffectiveSharedSections(project);
  const content = resolvePageContent(project, page);
  const definition = landingSectionRegistry.find((d) => d.type === normalizedType);

  const isSharedNav =
    normalizedType === "navbar" && (page.sharedMode?.navbar ?? "inherit") === "inherit";
  const isSharedFoot =
    normalizedType === "footer" && (page.sharedMode?.footer ?? "inherit") === "inherit";
  const sectionSelection =
    (isSharedNav
      ? shared.navbar?.selection
      : isSharedFoot
        ? shared.footer?.selection
        : undefined) ??
    page.sections.find((s) => s.type === (normalizedType as LandingSectionType));

  const variant = String(sectionSelection?.variant ?? "default");
  const manifest = resolveVariantManifest(normalizedType, variant);
  const variantMeta = definition?.variants.find((v) => v.id === variant);
  const slots: ScannedSlotDescriptor[] = [];
  const capabilities = new Set<ScannerCapability>();
  const treeNodes: ScannedTreeNode[] = [];

  const domRoot = findSectionElementInDom(iframeDoc, normalizedType);
  const hasDom = (selector: string): boolean => Boolean(domRoot?.querySelector(selector));
  const countDom = (selector: string): number => domRoot?.querySelectorAll(selector).length ?? 0;

  const mediaCount = countDom("img");
  const videoCount = countDom('video, iframe[src*="youtube"]');

  const addSlot = (
    slotId: string,
    capability: ScannerCapability,
    label: string,
    opts?: {
      editKey?: string;
      coreNode?: SelectedCoreNode;
      itemCount?: number;
      domSelector?: string;
      availableInSchema?: boolean;
      detectedInDom?: boolean;
    }
  ) => {
    const detectedInDom =
      opts?.detectedInDom ?? (opts?.domSelector ? hasDom(opts.domSelector) : Boolean(domRoot));
    const availableInSchema = opts?.availableInSchema ?? true;
    if (!detectedInDom && !availableInSchema) return;
    capabilities.add(capability);
    slots.push({
      slotId,
      capability,
      pageGroup: CAPABILITY_PAGE_MAP[capability],
      label,
      editKey: opts?.editKey,
      coreNode: opts?.coreNode,
      itemCount: opts?.itemCount,
      detectedInDom,
      availableInSchema,
    });
  };

  const pushNode = (spec: ScannedTreeNode) => {
    const existing = treeNodes.find((n) => n.node === spec.node);
    if (existing) return;
    const nodeSelector = `[data-hb-node="${spec.node}"]`;
    treeNodes.push({
      ...spec,
      detectedInDom: domRoot ? hasDom(nodeSelector) : undefined,
      domCount:
        spec.itemLabels?.length ?? (domRoot ? countDom(nodeSelector) || undefined : undefined),
    });
  };

  // ---------------------------------------------------------------------------
  // 1. Special App & Chrome Scopes
  // ---------------------------------------------------------------------------
  if (normalizedType === "announcement") {
    addSlot("announcement:color", "color", "Banner Color", { availableInSchema: true });
    addSlot("announcement:badge", "badge", "Label Tag", {
      coreNode: "badge",
      availableInSchema: true,
    });
    addSlot("announcement:text", "typography", "Announcement Copy", {
      coreNode: "text",
      availableInSchema: true,
    });
    addSlot("announcement:link", "primary-button", "Banner Link Destination", {
      coreNode: "primary-button",
      availableInSchema: true,
    });
    pushNode({ node: "badge", label: "Label Tag", coreType: "Badge", iconKey: "badge" });
    pushNode({ node: "text", label: "Banner Message", coreType: "Text", iconKey: "text" });
    pushNode({
      node: "primary-button",
      label: "Banner Link",
      coreType: "Link",
      iconKey: "primary-button",
    });
  } else if (
    normalizedType === "auth" ||
    (normalizedType !== "navbar" &&
      normalizedType !== "footer" &&
      ["login", "signup", "recovery"].includes(page.template))
  ) {
    addSlot("auth:typography", "typography", "Auth Heading & Copy", {
      coreNode: "heading",
      domSelector: '[data-hb-node="heading"], [data-hb-node="text"]',
    });
    addSlot("auth:form", "form-fields", "OAuth & Sign-In Fields", {
      domSelector: "form, input",
    });
    addSlot("auth:links", "primary-button", "Redirect Links", {
      coreNode: "primary-button",
      availableInSchema: true,
    });
    pushNode({ node: "heading", label: "Auth Headline", coreType: "Heading", iconKey: "heading" });
    pushNode({ node: "text", label: "Helper Copy", coreType: "Text", iconKey: "text" });
    pushNode({
      node: "primary-button",
      label: "Submit / Redirect",
      coreType: "Button",
      iconKey: "primary-button",
    });
  } else if (
    normalizedType === "dashboard" ||
    (normalizedType !== "navbar" && normalizedType !== "footer" && page.template === "dashboard")
  ) {
    addSlot("dashboard:typography", "typography", "Workspace Title & Subtitle", {
      coreNode: "heading",
    });
    addSlot("dashboard:items", "collection-items", "Dashboard Blocks & Sidebar Links", {
      coreNode: "items",
      itemCount: project.dashboardConfig?.blocks.length ?? 6,
    });
    addSlot("dashboard:layout", "grid-layout", "Shell Layout Preset", { coreNode: "grid" });
    pushNode({ node: "grid", label: "Shell Layout", coreType: "Grid", iconKey: "grid" });
    pushNode({
      node: "heading",
      label: "Workspace Title",
      coreType: "Heading",
      iconKey: "heading",
    });
    pushNode({
      node: "text",
      label: "Welcome Subtitle",
      coreType: "Text",
      iconKey: "text",
    });
    pushNode({
      node: "primary-button",
      label: "Back Button",
      coreType: "Button",
      iconKey: "primary-button",
    });
    pushNode({
      node: "items",
      label: "Dashboard Blocks",
      coreType: "Blocks",
      iconKey: "items",
      itemLabels: project.dashboardConfig?.blocks.map((b) => b.title),
      itemSelectNode: "card",
    });
  } else if (
    normalizedType === "not-found" ||
    (normalizedType !== "navbar" && normalizedType !== "footer" && page.template === "not-found")
  ) {
    addSlot("nf:typography", "typography", "404 Status & Copy", { coreNode: "heading" });
    addSlot("nf:actions", "primary-button", "Recovery Actions", {
      coreNode: "primary-button",
    });
    pushNode({ node: "badge", label: "Error Code", coreType: "Badge", iconKey: "badge" });
    pushNode({ node: "heading", label: "404 Headline", coreType: "Heading", iconKey: "heading" });
    pushNode({ node: "text", label: "Explanation", coreType: "Text", iconKey: "text" });
    pushNode({
      node: "primary-button",
      label: "Back Home CTA",
      coreType: "Button",
      iconKey: "primary-button",
    });
    pushNode({
      node: "secondary-button",
      label: "Support CTA",
      coreType: "Button",
      iconKey: "secondary-button",
    });
  } else if (normalizedType === "navbar") {
    const navItems =
      shared.navbar?.items && shared.navbar.items.length > 0
        ? shared.navbar.items.map((it) => it.label)
        : content.navbar.links.map((it) => it.label);
    addSlot("navbar:scope", "shared-scope", "Global vs Page-Only Navbar");
    addSlot("navbar:brand", "brand-logo", "Brand Name & Logo", {
      coreNode: "brand",
      domSelector: '[data-hb-node="brand"]',
    });
    addSlot("navbar:links", "collection-items", "Navigation Links", {
      coreNode: "links",
      itemCount: navItems.length,
    });
    addSlot("navbar:cta", "primary-button", "Navbar CTA Button", {
      coreNode: "primary-button",
      domSelector: '[data-hb-node="primary-button"]',
    });
    const hasSecondaryNav =
      variant === "mega" || variant === "centered" || hasDom('[data-hb-node="secondary-button"]');
    addSlot("navbar:secondary", "secondary-button", "Navbar Secondary Link", {
      coreNode: "secondary-button",
      domSelector: '[data-hb-node="secondary-button"]',
      availableInSchema: hasSecondaryNav,
    });
    addSlot("navbar:color", "color", "Navbar Surface & Tint");
    addSlot("navbar:visibility", "breakpoint-visibility", "Device Visibility");

    pushNode({ node: "brand", label: "Brand & Logo", coreType: "Brand", iconKey: "brand" });
    pushNode({
      node: "links",
      label: "Navigation Links",
      coreType: "Links",
      iconKey: "links",
      itemLabels: navItems,
      itemSelectNode: "links",
    });
    pushNode({
      node: "primary-button",
      label: "Navbar CTA",
      coreType: "Button",
      iconKey: "primary-button",
    });
    if (hasSecondaryNav) {
      pushNode({
        node: "secondary-button",
        label: "Secondary Action",
        coreType: "Button",
        iconKey: "secondary-button",
      });
    }
  } else if (normalizedType === "footer") {
    addSlot("footer:scope", "shared-scope", "Global vs Page-Only Footer");
    addSlot("footer:brand", "brand-logo", "Footer Brand & Logo", {
      coreNode: "brand",
    });
    addSlot("footer:copy", "typography", "Brand Tagline & Copyright", {
      coreNode: "text",
    });
    if (variant !== "simple") {
      addSlot("footer:columns", "collection-items", "Footer Columns, Channels & Legal", {
        coreNode: "links",
        itemCount: content.footer.groups.length,
      });
    }
    if (variant === "locale-status" || variant === "columns" || variant === "contact-action") {
      addSlot("footer:status", "badge", "Service Status Pill", {
        coreNode: "badge",
      });
    }
    addSlot("footer:color", "color", "Footer Color & Surface");
    addSlot("footer:spacing", "spacing-container", "Footer Spacing & Width");
    addSlot("footer:visibility", "breakpoint-visibility", "Device Visibility");
    addSlot("footer:anchor", "anchor-seo", "Footer Anchor ID");

    pushNode({ node: "brand", label: "Brand & Logo", coreType: "Brand", iconKey: "brand" });
    pushNode({ node: "text", label: "Tagline & Copyright", coreType: "Text", iconKey: "text" });
    if (variant !== "simple") {
      pushNode({
        node: "links",
        label: "Columns & Legal",
        coreType: "Links",
        iconKey: "links",
        itemLabels: content.footer.groups.map((g) => g.title),
        itemSelectNode: "links",
      });
    }
    pushNode({
      node: "items",
      label: "Channels & Locales",
      coreType: "Items",
      iconKey: "items",
      itemLabels: [
        ...(content.footer.contactLinks ?? []).map((c) => c.label),
        ...(content.footer.locales ?? []).map((l) => l.label),
      ].slice(0, 8),
      itemSelectNode: "items",
    });
  } else if (normalizedType === "hero") {
    // -------------------------------------------------------------------------
    // 2. HERO (Shopify-Style Manifest-Backed Scan)
    // -------------------------------------------------------------------------
    const isVideoVariant = variant === "video" || variant === "center-video";
    const isSlideshowVariant =
      manifest?.visual.kind === "slideshow" || variant === "slideshow" || variant === "split";
    const isInteractiveVariant = variant === "interactive";
    const isRemitVariant = variant === "remit-grid" || variant === "fintech-remit";
    const isEditorialVariant = variant === "editorial-photo";
    const hasHeroEyebrow = manifest ? manifest.capabilities.hasEyebrow : !isEditorialVariant;
    const hasHeroSecondary = manifest
      ? manifest.capabilities.hasSecondaryButton
      : Boolean(content.hero.content.secondaryAction);

    addSlot("hero:color", "color", "Section Color & Scrim");

    if (hasHeroEyebrow) {
      addSlot("hero:badge", "badge", isRemitVariant ? "Live Status Pill" : "Eyebrow Badge", {
        coreNode: "badge",
        editKey: "hero:eyebrow",
        domSelector: '[data-hb-node="badge"]',
      });
      pushNode({
        node: "badge",
        label: isRemitVariant ? "Status Pill" : "Eyebrow",
        coreType: "Badge",
        iconKey: "badge",
      });
    }

    addSlot("hero:typography", "typography", "Headline & Description", {
      coreNode: "heading",
      editKey: "hero:title",
      domSelector: '[data-hb-node="heading"], [data-hb-node="text"]',
    });
    pushNode({ node: "heading", label: "Headline", coreType: "Heading", iconKey: "heading" });
    pushNode({ node: "text", label: "Description", coreType: "Text", iconKey: "text" });

    addSlot("hero:primary-button", "primary-button", "Primary CTA Button", {
      coreNode: "primary-button",
      editKey: "hero:primaryAction.label",
      domSelector: '[data-hb-node="primary-button"]',
    });
    pushNode({
      node: "primary-button",
      label: "Primary CTA",
      coreType: "Button",
      iconKey: "primary-button",
    });

    if (hasHeroSecondary) {
      addSlot("hero:secondary-button", "secondary-button", "Secondary CTA Button", {
        coreNode: "secondary-button",
        editKey: "hero:secondaryAction.label",
        domSelector: '[data-hb-node="secondary-button"]',
      });
      pushNode({
        node: "secondary-button",
        label: "Secondary CTA",
        coreType: "Button",
        iconKey: "secondary-button",
      });
    }

    if (isVideoVariant) {
      addSlot("hero:video", "video-media", "Video Upload & YouTube Stream", {
        coreNode: "media",
        domSelector: 'video, iframe[src*="youtube"]',
      });
      addSlot("hero:poster", "single-image", "Video Poster Image", {
        coreNode: "media",
        domSelector: "img",
      });
      pushNode({
        node: "media",
        label: "Video & Poster",
        coreType: "VideoPlayer",
        iconKey: "media",
      });
    } else if (isSlideshowVariant) {
      const splitCfg = content.hero.variants.split as
        { slides?: Array<{ image?: HeroImage }> } | undefined;
      const slides: HeroImage[] =
        variant === "split"
          ? splitCfg?.slides?.length
            ? splitCfg.slides.map(
                (s, idx) => s.image ?? defaultSplitSlides[idx % defaultSplitSlides.length].image
              )
            : defaultSplitSlides.map((s) => s.image)
          : ((content.hero.variants.slideshow as { slides?: HeroImage[] }).slides ?? []);

      addSlot("hero:slides", "multi-image-slideshow", "Slideshow Multi-Image Queue", {
        coreNode: "media",
        itemCount: slides.length,
        domSelector: '[aria-roledescription="carousel"], [role="tablist"], img',
      });
      addSlot("hero:slide-items", "collection-items", "Slide Deck & Overlays", {
        coreNode: "media",
        itemCount: slides.length,
        domSelector: '[role="tablist"], img',
      });
      if (variant === "split") {
        addSlot("hero:video", "video-media", "Story Video Modal Stream", {
          coreNode: "media",
          domSelector: '[data-hb-video-trigger="true"], video',
        });
      }
      pushNode({
        node: "media",
        label: `Slideshow (${slides.length})`,
        coreType: "Carousel",
        iconKey: "media",
        itemLabels: slides.map((s, idx) => s.title || s.caption || s.alt || `Slide ${idx + 1}`),
        itemSelectNode: "media",
        isSlideshowQueue: true,
      });
    } else if (isInteractiveVariant) {
      const tabs = (content.hero.variants.interactive as { tabs?: { label: string }[] }).tabs ?? [];
      addSlot("hero:tabs", "interactive-tabs", "Interactive Product Tabs", {
        coreNode: "items",
        itemCount: tabs.length,
        domSelector: '[role="tablist"]',
      });
      addSlot("hero:tab-visuals", "single-image", "Active Tab Screenshot", {
        coreNode: "media",
        domSelector: '[data-hb-node="media"], img',
      });
      pushNode({
        node: "items",
        label: "Interactive Tabs",
        coreType: "Tabs",
        iconKey: "items",
        itemLabels: tabs.map((t) => t.label),
        itemSelectNode: "items",
      });
      pushNode({
        node: "media",
        label: "Active Tab Preview",
        coreType: "Screenshot",
        iconKey: "media",
      });
    } else if (isRemitVariant) {
      const remitCfg = content.hero.variants["remit-grid"] as HeroRemitGridConfig | undefined;
      const metrics = remitCfg?.metricCards ?? [];
      addSlot("hero:remit-backdrop", "single-image", "Dashboard Card Backdrop", {
        coreNode: "media",
        domSelector: '[data-hb-node="media"], img',
      });
      addSlot("hero:illustration", "code-illustration", "Live Dashboard Code Illustration", {
        coreNode: "card",
      });
      addSlot("hero:remit-card", "card-surface", "Dashboard Card & Reminder", {
        coreNode: "card",
        domSelector: '[data-hb-node="card"]',
      });
      addSlot("hero:icons", "icon-picker", "Fintech Feature Icons");
      addSlot("hero:remit-metrics", "collection-items", "Metrics Row & Invoices", {
        coreNode: "items",
        itemCount: metrics.length,
        domSelector: "[data-hb-item]",
      });
      pushNode({
        node: "card",
        label: "Live Dashboard Card",
        coreType: "RemitCard",
        iconKey: "card",
      });
      pushNode({
        node: "media",
        label: "Card Backdrop Photo",
        coreType: "Image",
        iconKey: "media",
      });
      pushNode({
        node: "items",
        label: "Metrics Row",
        coreType: "Metrics",
        iconKey: "items",
        itemLabels: metrics.map((m, i) => `${m.title} — ${m.description || `Metric ${i + 1}`}`),
        itemSelectNode: "card",
      });
    } else if (variant === "center-canvas") {
      addSlot("hero:video", "video-media", "Canvas Video Walkthrough", {
        coreNode: "media",
        domSelector: '[data-hb-video-trigger="true"], video',
      });
      addSlot("hero:illustration", "code-illustration", "Canvas Illustration & Callout", {
        coreNode: "media",
        domSelector: '[data-hb-visual="code-illustration"]',
      });
      addSlot("hero:grid", "grid-layout", "Canvas Framing & Width", {
        coreNode: "grid",
      });
      pushNode({
        node: "media",
        label: "Canvas Visual & Video",
        coreType: "CodeCanvas",
        iconKey: "media",
      });
      pushNode({ node: "grid", label: "Canvas Frame", coreType: "Grid", iconKey: "grid" });
    } else {
      const variantCfg = content.hero.variants[variant as keyof typeof content.hero.variants] as
        { image?: HeroImage; portraitSrc?: string } | undefined;
      if (
        variantCfg?.image ||
        variantCfg?.portraitSrc ||
        ["split-product", "centered", "editorial-photo"].includes(variant)
      ) {
        addSlot(
          "hero:image",
          "single-image",
          isEditorialVariant ? "Editorial Portrait Photo" : "Hero Visual Image",
          {
            coreNode: "media",
            domSelector: '[data-hb-node="media"], img',
          }
        );
        pushNode({
          node: "media",
          label: isEditorialVariant ? "Editorial Photo" : "Visual",
          coreType: isEditorialVariant ? "Portrait" : "EditorialImage",
          iconKey: "media",
        });
      }
    }

    addSlot("hero:spacing", "spacing-container", "Surface, Padding & Width");
    addSlot("hero:motion", "motion-reveal", "Entrance Motion & Reveal");
    addSlot("hero:visibility", "breakpoint-visibility", "Responsive Breakpoints");
    addSlot("hero:anchor", "anchor-seo", "Section #anchorId");
  } else if (normalizedType === "cta") {
    // -------------------------------------------------------------------------
    // 3. CTA (Strictly variant-specific: editorial-showcase vs centered vs split vs banner)
    // -------------------------------------------------------------------------
    const editorial = content.cta.editorial;
    addSlot("cta:color", "color", "Section Color & Scrim");

    if (variant === "editorial-showcase") {
      addSlot("cta:typography", "typography", "Showcase Headline & Narrative", {
        coreNode: "heading",
        editKey: "cta:title",
        domSelector: '[data-hb-node="heading"], [data-hb-node="text"]',
      });
      addSlot("cta:button", "primary-button", "Primary Action Button", {
        coreNode: "primary-button",
        editKey: "cta:action.label",
        domSelector: '[data-hb-node="primary-button"]',
      });
      addSlot("cta:video-trigger", "secondary-button", "Video Trigger & Modal", {
        coreNode: "secondary-button",
        editKey: "cta:editorial.videoPromptLabel",
        domSelector: '[data-hb-node="secondary-button"]',
      });
      addSlot("cta:video-stream", "video-media", "Showcase Video Stream & Title", {
        coreNode: "secondary-button",
        domSelector: '[data-hb-node="secondary-button"], video, iframe[src*="youtube"]',
      });
      addSlot("cta:social-proof", "collection-items", "Social Proof Avatars & Rating", {
        coreNode: "items",
        itemCount: editorial?.avatars?.length ?? 3,
        domSelector: '[data-hb-node="items"]',
      });
      addSlot("cta:photo-card", "single-image", "Right Lifestyle Photo Card", {
        coreNode: "media",
        domSelector: '[data-hb-node="media"], img',
      });

      pushNode({
        node: "heading",
        label: "Showcase Title",
        coreType: "Heading",
        iconKey: "heading",
      });
      pushNode({ node: "text", label: "Narrative", coreType: "Text", iconKey: "text" });
      pushNode({
        node: "primary-button",
        label: "Primary CTA",
        coreType: "Button",
        iconKey: "primary-button",
      });
      pushNode({
        node: "secondary-button",
        label: "Video Play & Caption",
        coreType: "VideoTrigger",
        iconKey: "secondary-button",
      });
      pushNode({
        node: "items",
        label: `Social Proof (${editorial?.rating ?? "4.9/5"})`,
        coreType: "Avatars",
        iconKey: "items",
        itemLabels: (editorial?.avatars?.length
          ? editorial.avatars
          : ["Avatar 1", "Avatar 2", "Avatar 3"]
        ).map((_, idx) => `Customer Photo ${idx + 1}`),
        itemSelectNode: "items",
      });
      pushNode({
        node: "media",
        label: "Lifestyle Photo Card",
        coreType: "PhotoCard",
        iconKey: "media",
      });
    } else if (variant === "centered") {
      addSlot("cta:badge", "badge", "Eyebrow Badge", {
        coreNode: "badge",
        editKey: "cta:badge",
        domSelector: '[data-hb-node="badge"]',
      });
      addSlot("cta:typography", "typography", "Heading & Body Typography", {
        coreNode: "heading",
        editKey: "cta:title",
        domSelector: '[data-hb-node="heading"], [data-hb-node="text"]',
      });
      addSlot("cta:card", "card-surface", "CTA Surface Card", {
        coreNode: "card",
        domSelector: '[data-hb-node="card"]',
      });
      addSlot("cta:button", "primary-button", "Action Button", {
        coreNode: "primary-button",
        editKey: "cta:action.label",
        domSelector: '[data-hb-node="primary-button"]',
      });

      pushNode({ node: "card", label: "CTA Surface", coreType: "Surface", iconKey: "card" });
      pushNode({ node: "badge", label: "Eyebrow", coreType: "Badge", iconKey: "badge" });
      pushNode({ node: "heading", label: "Headline", coreType: "Heading", iconKey: "heading" });
      pushNode({ node: "text", label: "Description", coreType: "Text", iconKey: "text" });
      pushNode({
        node: "primary-button",
        label: "Action",
        coreType: "Button",
        iconKey: "primary-button",
      });
    } else {
      // split | banner
      addSlot("cta:grid", "grid-layout", "Split / Banner Grid", {
        coreNode: "grid",
        domSelector: '[data-hb-node="grid"]',
      });
      addSlot("cta:badge", "badge", "Eyebrow Badge", {
        coreNode: "badge",
        editKey: "cta:badge",
        domSelector: '[data-hb-node="badge"]',
      });
      addSlot("cta:typography", "typography", "Heading & Body Typography", {
        coreNode: "heading",
        editKey: "cta:title",
        domSelector: '[data-hb-node="heading"], [data-hb-node="text"]',
      });
      addSlot("cta:card", "card-surface", "CTA Container Card", {
        coreNode: "card",
        domSelector: '[data-hb-node="card"]',
      });
      addSlot("cta:button", "primary-button", "Action Button", {
        coreNode: "primary-button",
        editKey: "cta:action.label",
        domSelector: '[data-hb-node="primary-button"]',
      });
      addSlot("cta:benefits", "collection-items", "Included Benefits Checklist", {
        coreNode: "items",
        itemCount: content.cta.benefits?.length ?? 3,
        domSelector: '[data-hb-node="items"], [data-hb-item]',
      });

      pushNode({ node: "grid", label: "Split Grid", coreType: "Grid", iconKey: "grid" });
      pushNode({ node: "card", label: "CTA Surface", coreType: "Surface", iconKey: "card" });
      pushNode({ node: "badge", label: "Eyebrow", coreType: "Badge", iconKey: "badge" });
      pushNode({ node: "heading", label: "Headline", coreType: "Heading", iconKey: "heading" });
      pushNode({ node: "text", label: "Description", coreType: "Text", iconKey: "text" });
      pushNode({
        node: "primary-button",
        label: "Action",
        coreType: "Button",
        iconKey: "primary-button",
      });
      pushNode({
        node: "items",
        label: "Checklist Benefits",
        coreType: "Benefits",
        iconKey: "items",
        itemLabels: content.cta.benefits ?? [],
        itemSelectNode: "items",
      });
    }

    addSlot("cta:spacing", "spacing-container", "Surface, Padding & Width");
    addSlot("cta:motion", "motion-reveal", "Entrance Motion & Reveal");
    addSlot("cta:visibility", "breakpoint-visibility", "Responsive Breakpoints");
    addSlot("cta:anchor", "anchor-seo", "Section #anchorId");
  } else if (
    [
      "logos",
      "benefits",
      "features",
      "how-it-works",
      "integrations",
      "testimonials",
      "pricing",
      "faq",
    ].includes(normalizedType)
  ) {
    // -------------------------------------------------------------------------
    // 4. Body Marketing Sections (Shopify-Style Manifest-Driven)
    // -------------------------------------------------------------------------
    const cap = manifest?.capabilities;
    const hasSectionEyebrow = cap?.hasEyebrow ?? false;
    const hasSectionHeading = cap?.hasHeading ?? true;
    const hasSectionDescription = cap?.hasDescription ?? false;

    addSlot(`${normalizedType}:color`, "color", "Section Color & Scrim");
    if (hasSectionEyebrow) {
      addSlot(`${normalizedType}:badge`, "badge", "Eyebrow Badge", {
        coreNode: "badge",
        editKey: `${normalizedType}:badge`,
        domSelector: '[data-hb-node="badge"]',
      });
    }
    if (hasSectionHeading || hasSectionDescription) {
      addSlot(`${normalizedType}:typography`, "typography", "Heading & Body Typography", {
        coreNode: "heading",
        editKey: `${normalizedType}:title`,
        domSelector: '[data-hb-node="heading"], [data-hb-node="text"]',
      });
    }

    const hasExplicitGrid = cap
      ? cap.hasGridLayout
      : !(
          (normalizedType === "logos" && (variant === "ticker" || variant === "row")) ||
          (normalizedType === "testimonials" && variant === "single")
        );
    if (hasExplicitGrid) {
      addSlot(`${normalizedType}:grid`, "grid-layout", "Responsive Grid & Columns", {
        coreNode: "grid",
        domSelector: '[data-hb-node="grid"]',
      });
      pushNode({ node: "grid", label: "Grid Layout", coreType: "Grid", iconKey: "grid" });
    }

    const hasCardSurface = cap ? cap.hasCardSurface : normalizedType !== "logos";
    if (hasCardSurface) {
      addSlot(`${normalizedType}:card`, "card-surface", "Card Surface & Highlight", {
        coreNode: "card",
        domSelector: '[data-hb-node="card"]',
      });
    }

    if (hasSectionEyebrow) {
      pushNode({ node: "badge", label: "Eyebrow", coreType: "Badge", iconKey: "badge" });
    }
    if (hasSectionHeading) {
      pushNode({ node: "heading", label: "Headline", coreType: "Heading", iconKey: "heading" });
    }
    if (hasSectionDescription) {
      pushNode({ node: "text", label: "Description", coreType: "Text", iconKey: "text" });
    }

    if (normalizedType === "benefits") {
      if (variant === "visual-list" || variant === "cards") {
        addSlot("benefits:image", "single-image", "Benefit Card Photo", {
          coreNode: "media",
          domSelector: '[data-hb-node="media"], img',
        });
      }
      if (manifest?.visual.kind === "code-illustration") {
        addSlot("benefits:illustration", "code-illustration", "Phone & Outcome Mockups", {
          coreNode: "media",
          domSelector: '[data-hb-visual="code-illustration"]',
        });
      }
      if (variant === "visual-list" || variant === "cards") {
        pushNode({
          node: "media",
          label: variant === "cards" ? "Code Mockups & Photo" : "Benefit Visual",
          coreType: variant === "cards" ? "CodeVisual" : "Media",
          iconKey: "media",
        });
      }
      addSlot("benefits:icons", "icon-picker", "Benefit Item Icons");
      addSlot("benefits:items", "collection-items", "Benefit Items & Impact Quotes", {
        coreNode: "items",
        itemCount: content.benefits.items.length,
        domSelector: "[data-hb-item]",
      });
      if (hasCardSurface) {
        pushNode({ node: "card", label: "Card Surface", coreType: "Surface", iconKey: "card" });
      }
      pushNode({
        node: "items",
        label: "Benefit Items",
        coreType: "Items",
        iconKey: "items",
        itemLabels: content.benefits.items.map((it) => it.title),
        itemSelectNode: "card",
      });
    } else if (normalizedType === "features") {
      if (variant === "accordion") {
        addSlot("features:image", "single-image", "Feature Showcase Screenshots", {
          coreNode: "media",
          domSelector: '[data-hb-node="media"], img',
        });
      } else {
        addSlot("features:illustration", "code-illustration", "Code & UI Feature Cards", {
          coreNode: "media",
          domSelector: '[data-hb-visual="code-illustration"]',
        });
      }
      addSlot("features:icons", "icon-picker", "Feature Icons");
      if (variant === "tabs" || variant === "accordion") {
        addSlot("features:tabs", "interactive-tabs", "Interactive Feature Tabs", {
          coreNode: "items",
          itemCount: content.features.items.length,
        });
      }
      addSlot("features:items", "collection-items", "Feature Items & Bullets", {
        coreNode: "items",
        itemCount: content.features.items.length,
        domSelector: "[data-hb-item]",
      });
      pushNode({
        node: "media",
        label: variant === "accordion" ? "Showcase Screenshots" : "Code Illustration Cards",
        coreType: variant === "accordion" ? "Media" : "CodeVisual",
        iconKey: "media",
      });
      if (hasCardSurface) {
        pushNode({ node: "card", label: "Card Surface", coreType: "Surface", iconKey: "card" });
      }
      pushNode({
        node: "items",
        label:
          variant === "tabs"
            ? "Feature Cards"
            : variant === "accordion"
              ? "Accordion Panels"
              : "Feature Rows",
        coreType: variant === "tabs" ? "Tabs" : "Items",
        iconKey: "items",
        itemLabels: content.features.items.map((it) => it.title),
        itemSelectNode: "card",
      });
    } else if (normalizedType === "how-it-works") {
      if (variant === "horizontal") {
        addSlot("how-it-works:image", "single-image", "Step Illustration Artwork", {
          coreNode: "media",
          domSelector: '[data-hb-node="media"], img',
        });
        addSlot("how-it-works:icons", "icon-picker", "Step Icons");
      } else {
        addSlot("how-it-works:illustration", "code-illustration", "3D Wireframe Illustration", {
          coreNode: "media",
          domSelector: '[data-hb-visual="code-illustration"]',
        });
        addSlot("how-it-works:cta", "primary-button", "Step Action Links", {
          coreNode: "primary-button",
        });
      }
      addSlot("how-it-works:items", "collection-items", "Workflow Steps & Sub-Steps", {
        coreNode: "items",
        itemCount: content["how-it-works"].items.length,
        domSelector: "[data-hb-item]",
      });
      pushNode({
        node: "media",
        label: variant === "horizontal" ? "Step Visuals" : "3D Code Wireframe",
        coreType: variant === "horizontal" ? "Media" : "CodeVisual",
        iconKey: "media",
      });
      pushNode({ node: "card", label: "Step Card Surface", coreType: "Surface", iconKey: "card" });
      pushNode({
        node: "items",
        label: "Workflow Steps",
        coreType: "Steps",
        iconKey: "items",
        itemLabels: content["how-it-works"].items.map((it) => it.title),
        itemSelectNode: "card",
      });
    } else if (normalizedType === "logos") {
      addSlot("logos:brand", "brand-logo", "Partner Brand Logos & Assets", {
        coreNode: "items",
        itemCount: content.logos.items.length,
      });
      addSlot("logos:image", "single-image", "Custom Partner SVG / Logo Upload", {
        coreNode: "items",
        domSelector: "img, svg",
      });
      addSlot("logos:items", "collection-items", "Logo Cloud Items", {
        coreNode: "items",
        itemCount: content.logos.items.length,
      });
      pushNode({
        node: "items",
        label: variant === "ticker" ? "Marquee Logos" : "Partner Logos",
        coreType: "Logos",
        iconKey: "items",
        itemLabels: [...content.logos.items],
        itemSelectNode: "items",
      });
    } else if (normalizedType === "integrations") {
      addSlot("integrations:icons", "icon-picker", "Connector Icons");
      addSlot("integrations:items", "collection-items", "Integration Connectors", {
        coreNode: "items",
        itemCount: content.integrations.items.length,
        domSelector: "[data-hb-item]",
      });
      pushNode({ node: "card", label: "Card Surface", coreType: "Surface", iconKey: "card" });
      pushNode({
        node: "items",
        label: variant === "grouped" ? "Grouped Connectors" : "Connectors",
        coreType: "Connectors",
        iconKey: "items",
        itemLabels: content.integrations.items.map((it) => it.title),
        itemSelectNode: "card",
      });
    } else if (normalizedType === "testimonials") {
      const hasAnyVideo = variant === "featured" || variant === "collection";
      if (variant === "single") {
        addSlot("testimonials:slider", "multi-image-slideshow", "Auto-Sliding Quote Cards", {
          coreNode: "items",
          itemCount: content.testimonials.items.length,
          domSelector: '[data-hb-node="items"]',
        });
      }
      if (hasAnyVideo) {
        addSlot("testimonials:video", "video-media", "Customer Video Case Studies", {
          coreNode: "media",
          domSelector: 'video, iframe[src*="youtube"], [data-hb-node="media"]',
        });
        addSlot("testimonials:avatars", "single-image", "Customer Avatars & Video Posters", {
          coreNode: "media",
          domSelector: "img",
        });
      }
      if (variant === "collection" || variant === "featured") {
        addSlot("testimonials:cta", "primary-button", "Case Studies Action Button", {
          coreNode: "primary-button",
          domSelector: '[data-hb-node="primary-button"]',
        });
        pushNode({
          node: "primary-button",
          label: "Sales Action CTA",
          coreType: "Button",
          iconKey: "primary-button",
        });
      }
      addSlot("testimonials:items", "collection-items", "Customer Quotes & Metrics", {
        coreNode: "items",
        itemCount: content.testimonials.items.length,
        domSelector: "[data-hb-item]",
      });
      pushNode({ node: "card", label: "Quote Card", coreType: "Surface", iconKey: "card" });
      if (hasAnyVideo) {
        pushNode({
          node: "media",
          label: "Avatars & Video Stories",
          coreType: "Media",
          iconKey: "media",
        });
      }
      pushNode({
        node: "items",
        label: variant === "single" ? "Sliding Quote Deck" : "Customer Quotes",
        coreType: "Quotes",
        iconKey: "items",
        itemLabels: content.testimonials.items.map((it) => it.source),
        itemSelectNode: "card",
      });
    } else if (normalizedType === "pricing") {
      addSlot("pricing:plans", "collection-items", "Pricing Plans", {
        coreNode: "items",
        itemCount: content.pricing.plans.length,
        domSelector: "[data-hb-item]",
      });
      addSlot("pricing:button", "primary-button", "Bulk Plan Buttons", {
        coreNode: "primary-button",
      });
      if (variant === "comparison" || page.pricingCompareEnabled !== false) {
        addSlot("pricing:matrix", "comparison-matrix", "Plan Comparison Matrix", {
          domSelector: "table",
        });
      }
      pushNode({ node: "card", label: "Plan Card Surface", coreType: "Surface", iconKey: "card" });
      pushNode({
        node: "primary-button",
        label: "Plan Buttons",
        coreType: "Button",
        iconKey: "primary-button",
      });
      pushNode({
        node: "items",
        label: "Pricing Plans",
        coreType: "Plans",
        iconKey: "items",
        itemLabels: content.pricing.plans.map((pl) => pl.name),
        itemSelectNode: "card",
      });
    } else if (normalizedType === "faq") {
      addSlot("faq:items", "collection-items", "FAQ Questions & Answers", {
        coreNode: "items",
        itemCount: content.faq.items.length,
        domSelector: "[data-hb-item]",
      });
      pushNode({ node: "card", label: "FAQ Surface", coreType: "Surface", iconKey: "card" });
      pushNode({
        node: "items",
        label: variant === "grouped" ? "Grouped Questions" : "Questions",
        coreType: "Items",
        iconKey: "items",
        itemLabels: content.faq.items.map((q) => q.question),
        itemSelectNode: "card",
      });
    }

    addSlot(`${normalizedType}:spacing`, "spacing-container", "Surface, Padding & Width");
    addSlot(`${normalizedType}:motion`, "motion-reveal", "Entrance Motion & Reveal");
    addSlot(`${normalizedType}:visibility`, "breakpoint-visibility", "Responsive Breakpoints");
    addSlot(`${normalizedType}:anchor`, "anchor-seo", "Section #anchorId");
  } else {
    // -------------------------------------------------------------------------
    // 5. Modular Page Sections
    // -------------------------------------------------------------------------
    addSlot(`${normalizedType}:color`, "color", "Section Color & Scrim");
    addSlot(`${normalizedType}:typography`, "typography", "Section Heading & Copy", {
      coreNode: "heading",
    });
    addSlot(`${normalizedType}:spacing`, "spacing-container", "Surface, Padding & Width");
    addSlot(`${normalizedType}:visibility`, "breakpoint-visibility", "Responsive Breakpoints");

    pushNode({ node: "heading", label: "Headline", coreType: "Heading", iconKey: "heading" });
    pushNode({ node: "text", label: "Description", coreType: "Text", iconKey: "text" });

    if (normalizedType === "pricing-compare") {
      addSlot("pricing-compare:badge", "badge", "Eyebrow Badge", { coreNode: "badge" });
      addSlot("pricing-compare:matrix", "comparison-matrix", "Comparison Matrix");
      addSlot("pricing-compare:actions", "primary-button", "Plan CTA Buttons", {
        coreNode: "primary-button",
      });
      pushNode({ node: "badge", label: "Eyebrow", coreType: "Badge", iconKey: "badge" });
      pushNode({ node: "card", label: "Comparison Matrix", coreType: "Table", iconKey: "card" });
      pushNode({
        node: "primary-button",
        label: "Plan Buttons",
        coreType: "Button",
        iconKey: "primary-button",
      });
      pushNode({ node: "items", label: "Comparison Plans", coreType: "Plans", iconKey: "items" });
    } else if (normalizedType === "contact-form-call") {
      addSlot("contact-form-call:form", "form-fields", "Contact Inquiry Form & Fields");
      pushNode({
        node: "primary-button",
        label: "Submit Button",
        coreType: "Button",
        iconKey: "primary-button",
      });
    } else if (normalizedType === "contact-mail") {
      addSlot("contact-mail:badge", "badge", "Eyebrow Badge", { coreNode: "badge" });
      addSlot("contact-mail:channels", "collection-items", "Direct Support Channels", {
        coreNode: "items",
      });
      addSlot("contact-mail:grid", "grid-layout", "Channels Grid", { coreNode: "grid" });
      pushNode({ node: "badge", label: "Eyebrow", coreType: "Badge", iconKey: "badge" });
      pushNode({ node: "items", label: "Support Channels", coreType: "Items", iconKey: "items" });
      pushNode({ node: "grid", label: "Grid Layout", coreType: "Grid", iconKey: "grid" });
    } else if (normalizedType === "contact-locations") {
      addSlot("contact-locations:media", "single-image", "Office Photos", { coreNode: "media" });
      addSlot("contact-locations:offices", "collection-items", "Office Locations", {
        coreNode: "items",
      });
      addSlot("contact-locations:grid", "grid-layout", "Locations Grid", { coreNode: "grid" });
      pushNode({ node: "media", label: "Office Photos", coreType: "Image", iconKey: "media" });
      pushNode({ node: "items", label: "Offices", coreType: "Items", iconKey: "items" });
      pushNode({ node: "grid", label: "Grid Layout", coreType: "Grid", iconKey: "grid" });
    } else if (normalizedType === "legal-hero") {
      addSlot("legal-hero:badge", "badge", "Category Badge", { coreNode: "badge" });
      pushNode({ node: "badge", label: "Badge", coreType: "Badge", iconKey: "badge" });
    } else if (normalizedType === "legal-preferences") {
      addSlot("legal-preferences:consent", "legal-consent", "Cookie Consent & DSAR Switches");
      addSlot("legal-preferences:form", "form-fields", "Privacy Request Form");
      pushNode({
        node: "primary-button",
        label: "Save Preferences",
        coreType: "Button",
        iconKey: "primary-button",
      });
    } else if (normalizedType === "editorial-cta") {
      addSlot("editorial-cta:button", "primary-button", "Action Button", {
        coreNode: "primary-button",
      });
      addSlot("editorial-cta:video", "video-media", "Story Video & Play Trigger", {
        coreNode: "secondary-button",
      });
      addSlot("editorial-cta:photo", "single-image", "Editorial Lifestyle Photo", {
        coreNode: "media",
      });
      pushNode({
        node: "primary-button",
        label: "Primary CTA",
        coreType: "Button",
        iconKey: "primary-button",
      });
      pushNode({
        node: "secondary-button",
        label: "Video Trigger",
        coreType: "VideoTrigger",
        iconKey: "secondary-button",
      });
      pushNode({ node: "media", label: "Lifestyle Photo", coreType: "Image", iconKey: "media" });
    } else if (normalizedType === "about") {
      addSlot("about:button", "primary-button", "Action Button", { coreNode: "primary-button" });
      addSlot("about:badge", "badge", "Eyebrow Badge", { coreNode: "badge" });
      addSlot("about:video", "video-media", "About Video & Poster", { coreNode: "media" });
      pushNode({ node: "badge", label: "Eyebrow", coreType: "Badge", iconKey: "badge" });
      pushNode({
        node: "primary-button",
        label: "Action Button",
        coreType: "Button",
        iconKey: "primary-button",
      });
      pushNode({ node: "media", label: "Feature Video", coreType: "Video", iconKey: "media" });
    } else if (normalizedType === "who-are-we") {
      addSlot("who-are-we:badge", "badge", "Eyebrow Badge", { coreNode: "badge" });
      addSlot("who-are-we:items", "collection-items", "Key Metrics", { coreNode: "items" });
      pushNode({ node: "badge", label: "Eyebrow", coreType: "Badge", iconKey: "badge" });
      pushNode({ node: "items", label: "Key Metrics", coreType: "Stats", iconKey: "items" });
    } else if (normalizedType === "meet-our-expert") {
      addSlot("meet-our-expert:badge", "badge", "Eyebrow Badge", { coreNode: "badge" });
      addSlot("meet-our-expert:media", "single-image", "Expert Portraits", { coreNode: "media" });
      addSlot("meet-our-expert:experts", "collection-items", "Expert Profiles", {
        coreNode: "items",
      });
      addSlot("meet-our-expert:grid", "grid-layout", "Experts Grid", { coreNode: "grid" });
      pushNode({ node: "badge", label: "Eyebrow", coreType: "Badge", iconKey: "badge" });
      pushNode({ node: "media", label: "Portraits", coreType: "Image", iconKey: "media" });
      pushNode({ node: "items", label: "Experts", coreType: "Items", iconKey: "items" });
      pushNode({ node: "grid", label: "Grid Layout", coreType: "Grid", iconKey: "grid" });
    } else if (normalizedType === "values") {
      addSlot("values:badge", "badge", "Eyebrow Badge", { coreNode: "badge" });
      addSlot("values:media", "single-image", "Value Card Photos", { coreNode: "media" });
      addSlot("values:items", "collection-items", "Values Bento", { coreNode: "items" });
      addSlot("values:grid", "grid-layout", "Values Grid", { coreNode: "grid" });
      pushNode({ node: "badge", label: "Eyebrow", coreType: "Badge", iconKey: "badge" });
      pushNode({ node: "media", label: "Card Photos", coreType: "Image", iconKey: "media" });
      pushNode({ node: "card", label: "Value Cards", coreType: "Surface", iconKey: "card" });
      pushNode({ node: "items", label: "Values", coreType: "Items", iconKey: "items" });
      pushNode({ node: "grid", label: "Grid Layout", coreType: "Grid", iconKey: "grid" });
    } else if (normalizedType === "our-team") {
      addSlot("our-team:media", "single-image", "Team Photo", { coreNode: "media" });
      pushNode({ node: "media", label: "Team Photo", coreType: "Image", iconKey: "media" });
    } else if (normalizedType === "blog-index") {
      addSlot("blog-index:badge", "badge", "Eyebrow Badge", { coreNode: "badge" });
      addSlot("blog-index:media", "single-image", "Article Cover Images", { coreNode: "media" });
      addSlot("blog-index:posts", "collection-items", "Published Articles", { coreNode: "items" });
      addSlot("blog-index:grid", "grid-layout", "Articles Grid", { coreNode: "grid" });
      pushNode({ node: "badge", label: "Eyebrow", coreType: "Badge", iconKey: "badge" });
      pushNode({ node: "media", label: "Cover Images", coreType: "Image", iconKey: "media" });
      pushNode({ node: "items", label: "Articles", coreType: "Items", iconKey: "items" });
      pushNode({ node: "grid", label: "Grid Layout", coreType: "Grid", iconKey: "grid" });
    } else if (normalizedType === "blog-post") {
      addSlot("blog-post:badge", "badge", "Article Category", { coreNode: "badge" });
      addSlot("blog-post:media", "single-image", "Cover Image", { coreNode: "media" });
      pushNode({ node: "badge", label: "Category", coreType: "Badge", iconKey: "badge" });
      pushNode({ node: "media", label: "Cover Image", coreType: "Image", iconKey: "media" });
    }
  }

  // Merge unexpected live DOM capabilities dynamically detected on the active section root
  if (domRoot) {
    if (hasDom('[data-hb-visual="code-illustration"]') && !capabilities.has("code-illustration")) {
      addSlot(`${normalizedType}:dom-illustration`, "code-illustration", "Code Illustration", {
        coreNode: "media",
        detectedInDom: true,
      });
    }
    if (hasDom('video, iframe[src*="youtube"]') && !capabilities.has("video-media")) {
      addSlot(`${normalizedType}:dom-video`, "video-media", "Detected Video Stream", {
        coreNode: "media",
        detectedInDom: true,
      });
    }
    if (hasDom("form, input") && !capabilities.has("form-fields")) {
      addSlot(`${normalizedType}:dom-form`, "form-fields", "Detected Form Fields", {
        detectedInDom: true,
      });
    }
  }

  const availableWidgetPages = ORDERED_PAGES.filter((pageGroup) =>
    slots.some((slot) => slot.pageGroup === pageGroup)
  );

  // Determine recommendedPage based on canvas node focus or variant capabilities
  let recommendedPage: WidgetPageGroup = availableWidgetPages[0] ?? "type-actions";
  let focusedSlotId: string | null = null;

  if (selectedCoreNode !== "section") {
    const matchedSlot = slots.find((s) => s.coreNode === selectedCoreNode);
    if (matchedSlot) {
      recommendedPage = matchedSlot.pageGroup;
      focusedSlotId = matchedSlot.slotId;
    }
  } else if (capabilities.has("video-media") || capabilities.has("multi-image-slideshow")) {
    recommendedPage = "media-color";
  } else if (selectedItemIndex != null) {
    const itemSlot = slots.find(
      (s) => s.capability === "collection-items" || s.capability === "multi-image-slideshow"
    );
    if (itemSlot) {
      recommendedPage = itemSlot.pageGroup;
      focusedSlotId = itemSlot.slotId;
    }
  } else if (
    capabilities.has("form-fields") ||
    capabilities.has("legal-consent") ||
    capabilities.has("shared-scope")
  ) {
    recommendedPage = "data-advanced";
  }

  const variantLabel = variantMeta?.name ?? variant;
  const variantSummary = `${variantLabel} · ${treeNodes.length} layers · ${capabilities.size} widgets`;

  return {
    sectionType: normalizedType,
    variant,
    pageTemplate: page.template,
    title: definition?.title ?? normalizedType,
    variantSummary,
    manifest,
    capabilities,
    slots,
    treeNodes,
    availableWidgetPages,
    recommendedPage,
    focusedSlotId,
    mediaCount,
    videoCount,
    domScanned: Boolean(domRoot),
  };
}

export function shouldRenderWidgetGroup(
  profile: ScannedSectionProfile,
  activeFilter: ScannerCategoryFilter,
  groupPage: WidgetPageGroup,
  requiredAnyCapabilities?: ScannerCapability[]
): boolean {
  if (activeFilter !== "all" && activeFilter !== groupPage) {
    return false;
  }
  if (!requiredAnyCapabilities || requiredAnyCapabilities.length === 0) {
    return profile.availableWidgetPages.includes(groupPage);
  }
  return requiredAnyCapabilities.some((cap) => profile.capabilities.has(cap));
}
