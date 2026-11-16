import type {
  LandingSectionType,
  ManifestBlockDef,
  ManifestFieldDef,
  SectionVariantManifest,
} from "@hudbird/schemas";

const HERO_SLIDE_BLOCK: ManifestBlockDef = {
  type: "slide",
  label: "Slideshow Deck",
  arrayBindPath: "hero:slides",
  itemSelectNode: "media",
  fields: [
    {
      id: "imageSrc",
      label: "Slide Image",
      widget: "image",
      bindPath: "image.src",
      coreNode: "media",
      group: "visual",
    },
    {
      id: "title",
      label: "Overlay Title / Quote",
      widget: "text",
      bindPath: "title",
      coreNode: "heading",
      group: "content",
    },
    {
      id: "subtitle",
      label: "Subtitle / Author",
      widget: "text",
      bindPath: "subtitle",
      coreNode: "text",
      group: "content",
    },
  ],
};

function makeNavbarManifest(variantId: string, label: string): SectionVariantManifest {
  const hasSecondary = variantId === "mega" || variantId === "centered";
  return {
    sectionType: "navbar",
    variantId,
    label,
    capabilities: {
      hasEyebrow: false,
      hasHeading: false,
      hasDescription: false,
      hasPrimaryButton: true,
      hasSecondaryButton: hasSecondary,
      hasGridLayout: false,
      hasCardSurface: false,
      hasItems: true,
      hasIcons: false,
    },
    visual: { kind: "none" },
    settings: [
      {
        id: "brandName",
        label: "Brand Name & Logo",
        widget: "text",
        bindPath: "navbar:brandName",
        coreNode: "brand",
        group: "content",
      },
      {
        id: "actionLabel",
        label: "Navbar CTA Button",
        widget: "button-action",
        bindPath: "navbar:action.label",
        coreNode: "primary-button",
        group: "actions",
      },
      ...(hasSecondary
        ? ([
            {
              id: "secondaryAction",
              label: "Navbar Secondary Action",
              widget: "button-action",
              bindPath: "navbar:secondaryAction",
              coreNode: "secondary-button",
              group: "actions",
            },
          ] satisfies ManifestFieldDef[])
        : []),
    ],
  };
}

function makeFooterManifest(variantId: string, label: string): SectionVariantManifest {
  const isSimple = variantId === "simple" || variantId === "centered";
  const hasStatus =
    variantId === "locale-status" || variantId === "columns" || variantId === "contact-action";
  return {
    sectionType: "footer",
    variantId,
    label,
    capabilities: {
      hasEyebrow: false,
      hasHeading: false,
      hasDescription: true,
      hasPrimaryButton: variantId === "contact-action",
      hasSecondaryButton: false,
      hasGridLayout: false,
      hasCardSurface: false,
      hasItems: !isSimple,
      hasIcons: false,
    },
    visual: { kind: "none" },
    settings: [
      {
        id: "description",
        label: "Brand Tagline",
        widget: "textarea",
        bindPath: "footer:description",
        coreNode: "text",
        group: "content",
      },
      {
        id: "note",
        label: "Copyright Note",
        widget: "text",
        bindPath: "footer:note",
        coreNode: "text",
        group: "content",
      },
      ...(hasStatus
        ? ([
            {
              id: "statusBadge",
              label: "Service Status Pill",
              widget: "badge",
              bindPath: "footer:status",
              coreNode: "badge",
              group: "content",
            },
          ] satisfies ManifestFieldDef[])
        : []),
    ],
  };
}

export const LANDING_VARIANT_MANIFESTS: Record<string, SectionVariantManifest> = {
  // ---------------------------------------------------------------------------
  // NAVBAR
  // ---------------------------------------------------------------------------
  "navbar:nav-13": makeNavbarManifest("nav-13", "Modern Mini"),
  "navbar:mega": makeNavbarManifest("mega", "Product Mega Menu"),
  "navbar:simple": makeNavbarManifest("simple", "Simple Navigation"),
  "navbar:centered": makeNavbarManifest("centered", "Centered Pill Bar"),
  "navbar:sidebar-1": makeNavbarManifest("sidebar-1", "Sidebar 1 — Compact Rail"),
  "navbar:sidebar-2": makeNavbarManifest("sidebar-2", "Sidebar 2 — Command Drawer"),
  "navbar:nav-01": makeNavbarManifest("nav-01", "NAV-01 — SaaS Classic"),
  "navbar:nav-02": makeNavbarManifest("nav-02", "NAV-02 — SaaS Floating"),
  "navbar:nav-03": makeNavbarManifest("nav-03", "NAV-03 — SaaS Platform"),
  "navbar:nav-04": makeNavbarManifest("nav-04", "NAV-04 — Startup Launch"),
  "navbar:nav-05": makeNavbarManifest("nav-05", "NAV-05 — Creative Agency"),
  "navbar:nav-06": makeNavbarManifest("nav-06", "NAV-06 — Creative Studio"),
  "navbar:nav-07": makeNavbarManifest("nav-07", "NAV-07 — Portfolio"),
  "navbar:nav-08": makeNavbarManifest("nav-08", "NAV-08 — Corporate Classic"),
  "navbar:nav-09": makeNavbarManifest("nav-09", "NAV-09 — Corporate Enterprise"),
  "navbar:nav-10": makeNavbarManifest("nav-10", "NAV-10 — Luxury Hospitality"),
  "navbar:nav-11": makeNavbarManifest("nav-11", "NAV-11 — Restaurant & F&B"),
  "navbar:nav-12": makeNavbarManifest("nav-12", "NAV-12 — Professional Services"),

  // ---------------------------------------------------------------------------
  // HERO
  // ---------------------------------------------------------------------------
  "hero:split": {
    sectionType: "hero",
    variantId: "split",
    label: "Split Introduction Carousel",
    capabilities: {
      hasEyebrow: true,
      hasHeading: true,
      hasDescription: true,
      hasPrimaryButton: true,
      hasSecondaryButton: false,
      hasGridLayout: false,
      hasCardSurface: false,
      hasItems: true,
      hasIcons: false,
      eyebrowSource: "content.eyebrow",
    },
    visual: { kind: "slideshow" },
    settings: [
      {
        id: "eyebrow",
        label: "Launch Pill Eyebrow",
        widget: "badge",
        bindPath: "hero:eyebrow",
        coreNode: "badge",
        group: "content",
      },
      {
        id: "slides",
        label: "Slideshow Carousel & Cards",
        widget: "slideshow",
        bindPath: "hero:slides",
        coreNode: "media",
        group: "visual",
      },
      {
        id: "storyVideo",
        label: "Watch Story Video",
        widget: "video",
        bindPath: "hero:slides.0.videoUrl",
        coreNode: "media",
        group: "visual",
      },
    ],
    blocks: [HERO_SLIDE_BLOCK],
  },
  "hero:centered": {
    sectionType: "hero",
    variantId: "centered",
    label: "Centered Product",
    capabilities: {
      hasEyebrow: true,
      hasHeading: true,
      hasDescription: true,
      hasPrimaryButton: true,
      hasSecondaryButton: true,
      hasGridLayout: false,
      hasCardSurface: false,
      hasItems: false,
      hasIcons: false,
      eyebrowSource: "content.eyebrow",
    },
    visual: { kind: "single-image" },
    settings: [
      {
        id: "image",
        label: "Hero Product Visual",
        widget: "image",
        bindPath: "hero:media.src",
        coreNode: "media",
        group: "visual",
      },
    ],
  },
  "hero:split-product": {
    sectionType: "hero",
    variantId: "split-product",
    label: "Hero Split Product",
    capabilities: {
      hasEyebrow: false,
      hasHeading: true,
      hasDescription: true,
      hasPrimaryButton: true,
      hasSecondaryButton: true,
      hasGridLayout: false,
      hasCardSurface: false,
      hasItems: false,
      hasIcons: false,
    },
    visual: { kind: "single-image" },
    settings: [
      {
        id: "image",
        label: "Product Screenshot",
        widget: "image",
        bindPath: "hero:media.src",
        coreNode: "media",
        group: "visual",
      },
    ],
  },
  "hero:interactive": {
    sectionType: "hero",
    variantId: "interactive",
    label: "Hands-On Preview",
    capabilities: {
      hasEyebrow: true,
      hasHeading: true,
      hasDescription: true,
      hasPrimaryButton: true,
      hasSecondaryButton: true,
      hasGridLayout: false,
      hasCardSurface: true,
      hasItems: true,
      hasIcons: false,
      eyebrowSource: "content.eyebrow",
    },
    visual: { kind: "interactive-tabs" },
    settings: [],
  },
  "hero:center-canvas": {
    sectionType: "hero",
    variantId: "center-canvas",
    label: "Hero Center Canvas & Video",
    capabilities: {
      hasEyebrow: false,
      hasHeading: true,
      hasDescription: true,
      hasPrimaryButton: true,
      hasSecondaryButton: true,
      hasGridLayout: true,
      hasCardSurface: false,
      hasItems: false,
      hasIcons: false,
    },
    visual: {
      kind: "video",
      canOverrideWithImage: true,
      codeIllustrationId: "product-canvas",
      presets: [
        { id: "canvas-default", label: "Studio Canvas" },
        { id: "video-spotlight", label: "Video Spotlight" },
      ],
    },
    settings: [
      {
        id: "video",
        label: "Canvas Video Walkthrough",
        widget: "video",
        bindPath: "hero:video.src",
        coreNode: "media",
        group: "visual",
      },
      {
        id: "illustration",
        label: "Canvas Frame & Callout",
        widget: "code-illustration",
        bindPath: "hero:illustration",
        coreNode: "media",
        group: "visual",
      },
    ],
  },
  "hero:center-video": {
    sectionType: "hero",
    variantId: "center-video",
    label: "Hero Center Video",
    capabilities: {
      hasEyebrow: false,
      hasHeading: true,
      hasDescription: true,
      hasPrimaryButton: true,
      hasSecondaryButton: true,
      hasGridLayout: true,
      hasCardSurface: false,
      hasItems: false,
      hasIcons: false,
    },
    visual: { kind: "video" },
    settings: [
      {
        id: "video",
        label: "Center Video Stream",
        widget: "video",
        bindPath: "hero:video.src",
        coreNode: "media",
        group: "visual",
      },
    ],
  },
  "hero:editorial-photo": {
    sectionType: "hero",
    variantId: "editorial-photo",
    label: "Hero Editorial Photo",
    capabilities: {
      hasEyebrow: false,
      hasHeading: true,
      hasDescription: true,
      hasPrimaryButton: true,
      hasSecondaryButton: true,
      hasGridLayout: false,
      hasCardSurface: false,
      hasItems: false,
      hasIcons: false,
    },
    visual: { kind: "single-image" },
    settings: [
      {
        id: "image",
        label: "Editorial Full-Bleed Portrait",
        widget: "image",
        bindPath: "hero:media.src",
        coreNode: "media",
        group: "visual",
      },
    ],
  },
  "hero:remit-grid": {
    sectionType: "hero",
    variantId: "remit-grid",
    label: "Hero Remit Grid",
    capabilities: {
      hasEyebrow: true,
      hasHeading: true,
      hasDescription: true,
      hasPrimaryButton: true,
      hasSecondaryButton: true,
      hasGridLayout: false,
      hasCardSurface: true,
      hasItems: true,
      hasIcons: true,
      eyebrowSource: "content.eyebrow",
    },
    visual: {
      kind: "remit-dashboard",
      canOverrideWithImage: true,
      codeIllustrationId: "remit-metrics",
      presets: [
        { id: "remit-default", label: "Live Invoices & KPI" },
        { id: "remit-compact", label: "Compact Settlement" },
      ],
    },
    settings: [],
  },
  "hero:slideshow": {
    sectionType: "hero",
    variantId: "slideshow",
    label: "Hero Slideshow",
    capabilities: {
      hasEyebrow: true,
      hasHeading: true,
      hasDescription: true,
      hasPrimaryButton: true,
      hasSecondaryButton: true,
      hasGridLayout: false,
      hasCardSurface: false,
      hasItems: true,
      hasIcons: false,
      eyebrowSource: "content.eyebrow",
    },
    visual: { kind: "slideshow" },
    settings: [],
    blocks: [HERO_SLIDE_BLOCK],
  },
  "hero:video": {
    sectionType: "hero",
    variantId: "video",
    label: "Hero Video Background",
    capabilities: {
      hasEyebrow: true,
      hasHeading: true,
      hasDescription: true,
      hasPrimaryButton: true,
      hasSecondaryButton: true,
      hasGridLayout: false,
      hasCardSurface: false,
      hasItems: false,
      hasIcons: false,
      eyebrowSource: "content.eyebrow",
    },
    visual: { kind: "video" },
    settings: [],
  },

  // ---------------------------------------------------------------------------
  // LOGOS
  // ---------------------------------------------------------------------------
  "logos:row": {
    sectionType: "logos",
    variantId: "row",
    label: "Logo Row",
    capabilities: {
      hasEyebrow: false,
      hasHeading: true,
      hasDescription: false,
      hasPrimaryButton: false,
      hasSecondaryButton: false,
      hasGridLayout: false,
      hasCardSurface: false,
      hasItems: true,
      hasIcons: false,
    },
    visual: { kind: "none" },
    settings: [],
  },
  "logos:ticker": {
    sectionType: "logos",
    variantId: "ticker",
    label: "Automatic Logo Ticker",
    capabilities: {
      hasEyebrow: false,
      hasHeading: true,
      hasDescription: false,
      hasPrimaryButton: false,
      hasSecondaryButton: false,
      hasGridLayout: false,
      hasCardSurface: false,
      hasItems: true,
      hasIcons: false,
    },
    visual: { kind: "none" },
    settings: [],
  },
  "logos:intro-grid": {
    sectionType: "logos",
    variantId: "intro-grid",
    label: "Introduction & Logo Grid",
    capabilities: {
      hasEyebrow: false,
      hasHeading: true,
      hasDescription: false,
      hasPrimaryButton: false,
      hasSecondaryButton: false,
      hasGridLayout: true,
      hasCardSurface: true,
      hasItems: true,
      hasIcons: false,
    },
    visual: { kind: "none" },
    settings: [],
  },

  // ---------------------------------------------------------------------------
  // BENEFITS
  // ---------------------------------------------------------------------------
  "benefits:columns": {
    sectionType: "benefits",
    variantId: "columns",
    label: "Benefit Columns",
    capabilities: {
      hasEyebrow: false,
      hasHeading: true,
      hasDescription: false,
      hasPrimaryButton: false,
      hasSecondaryButton: false,
      hasGridLayout: true,
      hasCardSurface: true,
      hasItems: true,
      hasIcons: true,
    },
    visual: { kind: "none" },
    settings: [],
  },
  "benefits:visual-list": {
    sectionType: "benefits",
    variantId: "visual-list",
    label: "Visual & Benefits List",
    capabilities: {
      hasEyebrow: false,
      hasHeading: true,
      hasDescription: false,
      hasPrimaryButton: false,
      hasSecondaryButton: false,
      hasGridLayout: true,
      hasCardSurface: true,
      hasItems: true,
      hasIcons: true,
    },
    visual: { kind: "single-image" },
    settings: [],
  },
  "benefits:cards": {
    sectionType: "benefits",
    variantId: "cards",
    label: "2x2 Outcome Showcase",
    capabilities: {
      hasEyebrow: false,
      hasHeading: true,
      hasDescription: true,
      hasPrimaryButton: false,
      hasSecondaryButton: false,
      hasGridLayout: true,
      hasCardSurface: true,
      hasItems: true,
      hasIcons: true,
    },
    visual: {
      kind: "code-illustration",
      canOverrideWithImage: true,
      codeIllustrationId: "phone-mockup-stack",
      presets: [
        { id: "phone-stack", label: "iPhone Reference Mockup" },
        { id: "workflow-cards", label: "Floating Outcome Cards" },
      ],
    },
    settings: [],
  },

  // ---------------------------------------------------------------------------
  // FEATURES
  // ---------------------------------------------------------------------------
  "features:tabs": {
    sectionType: "features",
    variantId: "tabs",
    label: "Features Horizontal Carousel",
    capabilities: {
      hasEyebrow: true,
      hasHeading: true,
      hasDescription: false,
      hasPrimaryButton: false,
      hasSecondaryButton: false,
      hasGridLayout: false,
      hasCardSurface: true,
      hasItems: true,
      hasIcons: true,
      eyebrowSource: "appearance.badge",
    },
    visual: {
      kind: "code-illustration",
      canOverrideWithImage: true,
      codeIllustrationId: "feature-code-cards",
      presets: [
        { id: "code-feed", label: "Live Export Code Cards" },
        { id: "token-tags", label: "Token Tag Overlay" },
      ],
    },
    settings: [],
  },
  "features:accordion": {
    sectionType: "features",
    variantId: "accordion",
    label: "Expandable Preview",
    capabilities: {
      hasEyebrow: true,
      hasHeading: true,
      hasDescription: false,
      hasPrimaryButton: false,
      hasSecondaryButton: false,
      hasGridLayout: true,
      hasCardSurface: false,
      hasItems: true,
      hasIcons: true,
      eyebrowSource: "appearance.badge",
    },
    visual: { kind: "single-image" },
    settings: [],
  },
  "features:split": {
    sectionType: "features",
    variantId: "split",
    label: "Editorial Feature Rows",
    capabilities: {
      hasEyebrow: true,
      hasHeading: true,
      hasDescription: false,
      hasPrimaryButton: true,
      hasSecondaryButton: false,
      hasGridLayout: false,
      hasCardSurface: true,
      hasItems: true,
      hasIcons: true,
      eyebrowSource: "appearance.badge",
    },
    visual: {
      kind: "code-illustration",
      canOverrideWithImage: true,
      codeIllustrationId: "feature-code-cards",
      presets: [
        { id: "paper-fold", label: "3D Paper-Fold Mockups" },
        { id: "minimal-frame", label: "Minimal Wireframe" },
      ],
    },
    settings: [],
  },

  // ---------------------------------------------------------------------------
  // HOW IT WORKS
  // ---------------------------------------------------------------------------
  "how-it-works:vertical": {
    sectionType: "how-it-works",
    variantId: "vertical",
    label: "Visual Steps (3D Wireframe)",
    capabilities: {
      hasEyebrow: false,
      hasHeading: false,
      hasDescription: false,
      hasPrimaryButton: true,
      hasSecondaryButton: true,
      hasGridLayout: false,
      hasCardSurface: true,
      hasItems: true,
      hasIcons: false,
    },
    visual: {
      kind: "code-illustration",
      canOverrideWithImage: true,
      codeIllustrationId: "workflow-wireframe-3d",
      presets: [
        { id: "isometric-3d", label: "Isometric 3D Wireframe" },
        { id: "blueprint-grid", label: "Architectural Blueprint" },
      ],
    },
    settings: [],
  },
  "how-it-works:horizontal": {
    sectionType: "how-it-works",
    variantId: "horizontal",
    label: "Horizontal Steps",
    capabilities: {
      hasEyebrow: false,
      hasHeading: false,
      hasDescription: false,
      hasPrimaryButton: false,
      hasSecondaryButton: false,
      hasGridLayout: true,
      hasCardSurface: true,
      hasItems: true,
      hasIcons: true,
    },
    visual: { kind: "single-image" },
    settings: [],
  },

  // ---------------------------------------------------------------------------
  // INTEGRATIONS
  // ---------------------------------------------------------------------------
  "integrations:grid": {
    sectionType: "integrations",
    variantId: "grid",
    label: "Integration Grid",
    capabilities: {
      hasEyebrow: true,
      hasHeading: true,
      hasDescription: true,
      hasPrimaryButton: false,
      hasSecondaryButton: false,
      hasGridLayout: true,
      hasCardSurface: true,
      hasItems: true,
      hasIcons: true,
      eyebrowSource: "appearance.badge",
    },
    visual: { kind: "none" },
    settings: [],
  },
  "integrations:grouped": {
    sectionType: "integrations",
    variantId: "grouped",
    label: "Workflow Groups",
    capabilities: {
      hasEyebrow: true,
      hasHeading: true,
      hasDescription: true,
      hasPrimaryButton: false,
      hasSecondaryButton: false,
      hasGridLayout: true,
      hasCardSurface: true,
      hasItems: true,
      hasIcons: true,
      eyebrowSource: "appearance.badge",
    },
    visual: { kind: "none" },
    settings: [],
  },

  // ---------------------------------------------------------------------------
  // TESTIMONIALS
  // ---------------------------------------------------------------------------
  "testimonials:single": {
    sectionType: "testimonials",
    variantId: "single",
    label: "Single Quote Slider",
    capabilities: {
      hasEyebrow: false,
      hasHeading: false,
      hasDescription: false,
      hasPrimaryButton: false,
      hasSecondaryButton: false,
      hasGridLayout: false,
      hasCardSurface: true,
      hasItems: true,
      hasIcons: false,
    },
    visual: { kind: "slideshow" },
    settings: [],
  },
  "testimonials:collection": {
    sectionType: "testimonials",
    variantId: "collection",
    label: "Quotation Cards & Video",
    capabilities: {
      hasEyebrow: true,
      hasHeading: true,
      hasDescription: false,
      hasPrimaryButton: true,
      hasSecondaryButton: false,
      hasGridLayout: true,
      hasCardSurface: true,
      hasItems: true,
      hasIcons: false,
      eyebrowSource: "appearance.badge",
    },
    visual: { kind: "video" },
    settings: [],
  },
  "testimonials:featured": {
    sectionType: "testimonials",
    variantId: "featured",
    label: "Featured Video Story",
    capabilities: {
      hasEyebrow: true,
      hasHeading: true,
      hasDescription: true,
      hasPrimaryButton: true,
      hasSecondaryButton: false,
      hasGridLayout: true,
      hasCardSurface: true,
      hasItems: true,
      hasIcons: false,
      eyebrowSource: "appearance.badge",
    },
    visual: { kind: "video" },
    settings: [],
  },

  // ---------------------------------------------------------------------------
  // PRICING
  // ---------------------------------------------------------------------------
  "pricing:cards": {
    sectionType: "pricing",
    variantId: "cards",
    label: "Pricing Plan Cards",
    capabilities: {
      hasEyebrow: true,
      hasHeading: true,
      hasDescription: true,
      hasPrimaryButton: true,
      hasSecondaryButton: false,
      hasGridLayout: true,
      hasCardSurface: true,
      hasItems: true,
      hasIcons: true,
      eyebrowSource: "appearance.badge",
    },
    visual: { kind: "none" },
    settings: [],
  },
  "pricing:comparison": {
    sectionType: "pricing",
    variantId: "comparison",
    label: "Feature Comparison Table",
    capabilities: {
      hasEyebrow: true,
      hasHeading: true,
      hasDescription: true,
      hasPrimaryButton: true,
      hasSecondaryButton: false,
      hasGridLayout: true,
      hasCardSurface: true,
      hasItems: true,
      hasIcons: true,
      eyebrowSource: "appearance.badge",
    },
    visual: { kind: "none" },
    settings: [],
  },
  "pricing:highlight": {
    sectionType: "pricing",
    variantId: "highlight",
    label: "Featured Plan Spotlight",
    capabilities: {
      hasEyebrow: true,
      hasHeading: true,
      hasDescription: true,
      hasPrimaryButton: true,
      hasSecondaryButton: false,
      hasGridLayout: true,
      hasCardSurface: true,
      hasItems: true,
      hasIcons: true,
      eyebrowSource: "appearance.badge",
    },
    visual: { kind: "none" },
    settings: [],
  },

  // ---------------------------------------------------------------------------
  // FAQ
  // ---------------------------------------------------------------------------
  "faq:single": {
    sectionType: "faq",
    variantId: "single",
    label: "Simple Questions",
    capabilities: {
      hasEyebrow: true,
      hasHeading: true,
      hasDescription: true,
      hasPrimaryButton: false,
      hasSecondaryButton: false,
      hasGridLayout: true,
      hasCardSurface: false,
      hasItems: true,
      hasIcons: false,
      eyebrowSource: "appearance.badge",
    },
    visual: { kind: "none" },
    settings: [],
  },
  "faq:grouped": {
    sectionType: "faq",
    variantId: "grouped",
    label: "Grouped Questions",
    capabilities: {
      hasEyebrow: true,
      hasHeading: true,
      hasDescription: true,
      hasPrimaryButton: false,
      hasSecondaryButton: false,
      hasGridLayout: true,
      hasCardSurface: true,
      hasItems: true,
      hasIcons: false,
      eyebrowSource: "appearance.badge",
    },
    visual: { kind: "none" },
    settings: [],
  },
  "faq:columns": {
    sectionType: "faq",
    variantId: "columns",
    label: "Two-Column Q&A Grid",
    capabilities: {
      hasEyebrow: true,
      hasHeading: true,
      hasDescription: true,
      hasPrimaryButton: false,
      hasSecondaryButton: false,
      hasGridLayout: true,
      hasCardSurface: true,
      hasItems: true,
      hasIcons: false,
      eyebrowSource: "appearance.badge",
    },
    visual: { kind: "none" },
    settings: [],
  },

  // ---------------------------------------------------------------------------
  // CTA
  // ---------------------------------------------------------------------------
  "cta:centered": {
    sectionType: "cta",
    variantId: "centered",
    label: "Focused Invitation",
    capabilities: {
      hasEyebrow: true,
      hasHeading: true,
      hasDescription: true,
      hasPrimaryButton: true,
      hasSecondaryButton: false,
      hasGridLayout: false,
      hasCardSurface: true,
      hasItems: false,
      hasIcons: false,
      eyebrowSource: "appearance.badge",
    },
    visual: { kind: "none" },
    settings: [],
  },
  "cta:split": {
    sectionType: "cta",
    variantId: "split",
    label: "Invitation & Benefits",
    capabilities: {
      hasEyebrow: true,
      hasHeading: true,
      hasDescription: true,
      hasPrimaryButton: true,
      hasSecondaryButton: false,
      hasGridLayout: true,
      hasCardSurface: true,
      hasItems: true,
      hasIcons: false,
      eyebrowSource: "appearance.badge",
    },
    visual: { kind: "none" },
    settings: [],
  },
  "cta:banner": {
    sectionType: "cta",
    variantId: "banner",
    label: "High-Contrast Banner",
    capabilities: {
      hasEyebrow: true,
      hasHeading: true,
      hasDescription: true,
      hasPrimaryButton: true,
      hasSecondaryButton: false,
      hasGridLayout: true,
      hasCardSurface: true,
      hasItems: true,
      hasIcons: false,
      eyebrowSource: "appearance.badge",
    },
    visual: { kind: "none" },
    settings: [],
  },
  "cta:editorial-showcase": {
    sectionType: "cta",
    variantId: "editorial-showcase",
    label: "Editorial Showcase",
    capabilities: {
      hasEyebrow: false,
      hasHeading: true,
      hasDescription: true,
      hasPrimaryButton: true,
      hasSecondaryButton: true,
      hasGridLayout: false,
      hasCardSurface: false,
      hasItems: true,
      hasIcons: false,
    },
    visual: { kind: "video" },
    settings: [],
  },

  // ---------------------------------------------------------------------------
  // FOOTER
  // ---------------------------------------------------------------------------
  "footer:simple": makeFooterManifest("simple", "Simple Footer"),
  "footer:columns": makeFooterManifest("columns", "Navigation Columns"),
  "footer:centered": makeFooterManifest("centered", "Centered Minimal Footer"),
  "footer:locale-status": makeFooterManifest("locale-status", "Footer Locale & Status"),
  "footer:contact-action": makeFooterManifest("contact-action", "Footer Contact & Action"),
};

/**
 * Resolves the authoritative Shopify-style declarative manifest for any
 * `(sectionType, variantId)` pair across all Landing sections and variants.
 */
export function resolveVariantManifest(
  sectionType: LandingSectionType | string,
  variantId?: string | null
): SectionVariantManifest | null {
  const normalizedType = sectionType === "logo-cloud" ? "logos" : String(sectionType);
  const normalizedVariant =
    normalizedType === "hero" && variantId === "fintech-remit"
      ? "remit-grid"
      : String(variantId ?? "").trim();

  if (normalizedVariant) {
    const exact = LANDING_VARIANT_MANIFESTS[`${normalizedType}:${normalizedVariant}`];
    if (exact) return exact;
  }

  const fallbackKey = Object.keys(LANDING_VARIANT_MANIFESTS).find((key) =>
    key.startsWith(`${normalizedType}:`)
  );
  return fallbackKey ? LANDING_VARIANT_MANIFESTS[fallbackKey] : null;
}
