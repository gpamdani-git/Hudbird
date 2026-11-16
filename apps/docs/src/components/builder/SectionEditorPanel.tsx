import * as React from "react";
import {
  Button,
  Checkbox,
  Heading,
  Input,
  Select,
  SelectItem,
  Switch,
  Text,
  Textarea,
} from "@hudbird/ui";
import {
  defaultSplitSlides,
  enableAndPositionPageSection,
  getAboutPageSections,
  getContactPageSections,
  getEffectiveAuthConfig,
  getEffectiveDashboardConfig,
  getEffectiveNotFoundConfig,
  getEffectiveSharedSections,
  getLegalPageSections,
  landingSectionRegistry,
  resetPageSharedChromeOverride,
  resolveLinkTarget,
  resolvePageContent,
  syncNavigationFromSharedNavbar,
  toggleAboutPageSection,
  toggleContactPageSection,
  toggleLegalPageSection,
  togglePricingCompareSection,
  updateModularSectionOverride,
  updateModularSectionSettings,
  updateSectionContentOverride,
  type AboutSectionId,
  type ContactSectionId,
  type LegalSectionId,
  type WebsitePage,
  type WebsiteProjectConfig,
  type WebsiteSharedFooterConfig,
} from "@hudbird/marketing";
import type {
  CtaEditorialConfig,
  HeroImage,
  HeroRemitGridConfig,
  HeroSectionConfig,
  HeroSplitSlide,
  LandingFeature,
  LandingItem,
  LandingSectionSelection,
  LandingSectionType,
  NavbarCustomSettings,
  ProductDemoTab,
  SectionAppearanceSettings,
  WebsiteDashboardBlockType,
  WebsiteLinkTarget,
  WebsiteNavItem,
} from "@hudbird/schemas";
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  ChevronRight,
  Plus,
  RotateCcw,
  Trash2,
  X,
} from "lucide-react";
import {
  BlockVariantsInspector,
  type HoveredVariantPreviewData,
} from "../landing/BlockVariantsInspector";
import { LinkTargetPicker } from "./LinkTargetPicker";
import { MediaUploadField } from "./MediaUploadField";
import {
  ButtonCoreEditor,
  CardBadgeCoreEditor,
  GridCoreEditor,
  MediaCoreEditor,
  TypographyCoreEditor,
  type SelectedCoreNode,
} from "./CoreComponentEditors";
import {
  BenefitsCrudEditor,
  FaqCrudEditor,
  FeatureItemsCrudEditor,
  FooterContactStatusCrud,
  HeroInteractiveTabsCrudEditor,
  IntegrationsCrudEditor,
  LogosCrudEditor,
  PricingPlansCrudEditor,
  SelectedItemIndexProvider,
  TestimonialsCrudEditor,
} from "./SectionItemCrudList";
import {
  scanActiveSection,
  shouldRenderWidgetGroup,
  type ScannerCategoryFilter,
} from "./sectionScanner";
import {
  CodeIllustrationWidget,
  IconBrandPickerWidget,
  MotionRevealWidget,
  SectionColorPickerWidget,
  SectionScannerHeader,
  SlideshowMediaWidget,
  VideoMediaWidget,
  VisibilityAnchorWidget,
} from "./SectionScannerWidgets";
import { resolveWidgetPlan } from "./widgetEngine";
import { UniversalWidgetRenderer } from "./UniversalWidgetRenderer";

export type ModularSectionTarget =
  | "pricing-compare"
  | "blog-index"
  | "blog-post"
  | AboutSectionId
  | ContactSectionId
  | LegalSectionId;

export type InspectorTarget =
  LandingSectionType | "announcement" | "auth" | "dashboard" | "not-found" | ModularSectionTarget;

const GRID_CAPABLE_SECTIONS = new Set<LandingSectionType>([
  "benefits",
  "features",
  "how-it-works",
  "integrations",
  "testimonials",
  "pricing",
  "faq",
  "logos",
  "cta",
]);

interface ModularFieldSpec {
  key: string;
  label: string;
  placeholder?: string;
  multiline?: boolean;
}

const MODULAR_SECTION_EDITOR_SPEC: Record<
  string,
  { title: string; subtitle: string; fields: ModularFieldSpec[] }
> = {
  "pricing-compare": {
    title: "Pricing Comparison",
    subtitle: "Side-by-side plan matrix shown below pricing tiers.",
    fields: [
      { key: "badgeLabel", label: "Eyebrow badge", placeholder: "Compare plans" },
      { key: "title", label: "Heading", placeholder: "Everything included in every plan" },
      { key: "description", label: "Description", multiline: true },
    ],
  },
  about: {
    title: "About Intro",
    subtitle: "Opening narrative & CTA on the About page.",
    fields: [
      { key: "badgeLabel", label: "Eyebrow badge", placeholder: "About Us" },
      { key: "title", label: "Headline", placeholder: "Designed for durable software teams" },
      { key: "actionLabel", label: "Primary action label", placeholder: "Explore platform" },
    ],
  },
  "who-are-we": {
    title: "Who We Are",
    subtitle: "Company background & founding story block.",
    fields: [
      { key: "badgeLabel", label: "Eyebrow badge", placeholder: "Who we are" },
      { key: "title", label: "Section heading" },
      { key: "description", label: "Summary paragraph", multiline: true },
    ],
  },
  "our-team": {
    title: "Our Team",
    subtitle: "Leadership & team roster section.",
    fields: [
      { key: "title", label: "Section heading" },
      { key: "description", label: "Subtitle", multiline: true },
    ],
  },
  "meet-our-expert": {
    title: "Meet Our Experts",
    subtitle: "Subject-matter specialists showcase.",
    fields: [
      { key: "badgeLabel", label: "Eyebrow badge", placeholder: "Specialists" },
      { key: "title", label: "Section heading" },
      { key: "description", label: "Subtitle", multiline: true },
    ],
  },
  values: {
    title: "Company Values",
    subtitle: "Core operating principles grid.",
    fields: [
      { key: "eyebrow", label: "Eyebrow badge", placeholder: "Values" },
      { key: "title", label: "Section heading" },
      { key: "description", label: "Description", multiline: true },
    ],
  },
  "editorial-cta": {
    title: "Editorial CTA",
    subtitle: "Closing call-to-action banner on About page.",
    fields: [
      { key: "title", label: "Headline" },
      { key: "description", label: "Supporting copy", multiline: true },
      { key: "primaryLabel", label: "Primary button label", placeholder: "Book a demo" },
    ],
  },
  "contact-mail": {
    title: "Support Email & SLA",
    subtitle: "Direct contact header and support intro.",
    fields: [
      { key: "title", label: "Heading" },
      { key: "description", label: "Subheading", multiline: true },
    ],
  },
  "contact-form-call": {
    title: "Contact Form & Call",
    subtitle: "Inquiry form and scheduled call booking.",
    fields: [
      { key: "heading", label: "Heading" },
      { key: "subheading", label: "Subheading", multiline: true },
    ],
  },
  "contact-locations": {
    title: "Offices & Hours",
    subtitle: "Physical office addresses and business hours.",
    fields: [
      { key: "heading", label: "Heading" },
      { key: "subheading", label: "Subheading", multiline: true },
    ],
  },
  "legal-hero": {
    title: "Document Switcher Header",
    subtitle: "Top policy header and document selector tabs.",
    fields: [
      { key: "heading", label: "Document heading" },
      { key: "subheading", label: "Intro summary", multiline: true },
    ],
  },
  "legal-reader": {
    title: "Clause Reader & ToC",
    subtitle: "Sticky table of contents and readable policy clauses.",
    fields: [{ key: "tocHeading", label: "Table of contents title", placeholder: "On this page" }],
  },
  "legal-preferences": {
    title: "Consent & DSAR",
    subtitle: "Cookie preferences and privacy request form.",
    fields: [
      { key: "heading", label: "Section heading" },
      { key: "subheading", label: "Description", multiline: true },
    ],
  },
  "blog-index": {
    title: "Article Catalog",
    subtitle: "Searchable blog index and category filters.",
    fields: [
      { key: "badgeLabel", label: "Eyebrow badge", placeholder: "Editorial" },
      { key: "title", label: "Blog heading" },
      { key: "description", label: "Blog subtitle", multiline: true },
    ],
  },
  "blog-post": {
    title: "Article Content",
    subtitle: "Long-form article reader layout.",
    fields: [
      { key: "title", label: "Article headline" },
      { key: "summary", label: "Article summary", multiline: true },
    ],
  },
};

const HERO_MEDIA_PRESETS = [
  {
    label: "Hudbird Studio UI",
    src: "/assets/homepage/builder-sections-light.png",
    darkSrc: "/assets/homepage/builder-sections-dark.png",
  },
  {
    label: "SaaS Analytics",
    src: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1400",
    darkSrc:
      "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1400",
  },
  {
    label: "Editorial Studio",
    src: "https://images.pexels.com/photos/4261617/pexels-photo-4261617.jpeg?auto=compress&cs=tinysrgb&w=1400",
    darkSrc:
      "https://images.pexels.com/photos/4261617/pexels-photo-4261617.jpeg?auto=compress&cs=tinysrgb&w=1400",
  },
];

const DEFAULT_CTA_EDITORIAL_IMAGE =
  "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1200";

const DEFAULT_CTA_EDITORIAL_VIDEO =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

const DEFAULT_CTA_EDITORIAL_AVATARS = [
  "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=160&h=160",
  "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=160&h=160",
  "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=160&h=160",
  "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=160&h=160",
];

const DASHBOARD_BLOCK_VARIANTS: Record<WebsiteDashboardBlockType, string[]> = {
  "app-shell": ["sidebar-dual", "sidebar-slim", "stacked-top"],
  "page-header": ["breadcrumbs-actions", "tabs-toolbar", "command-search"],
  "kpi-metrics": ["sparkline-cards", "compact-strip", "goal-progress"],
  "primary-panel": ["revenue-analytics", "workspace-settings", "crm-inspector"],
  "data-table": ["customer-directory", "team-permissions", "audit-stream"],
  "status-footer": ["pagination-summary", "system-telemetry"],
};

function inferLinkTarget(
  project: WebsiteProjectConfig,
  rawHref: string | undefined,
  fallbackTarget?: string
): WebsiteLinkTarget {
  const href = rawHref?.trim() || (fallbackTarget ? `#${fallbackTarget}` : "");
  if (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:")) {
    return { kind: "external", href, openInNewTab: href.startsWith("http") };
  }
  if (href.startsWith("#/")) {
    const cleanPath = href.slice(1).split("?")[0];
    const matched = project.pages.find((p) => p.path === cleanPath);
    if (matched) return { kind: "page", pageId: matched.id };
  }
  if (href.startsWith("/")) {
    const cleanPath = href.split("#")[0].split("?")[0];
    const matched = project.pages.find((p) => p.path === cleanPath);
    if (matched) return { kind: "page", pageId: matched.id };
  }
  if (href.startsWith("#")) {
    const sec = (href.slice(1) === "logo-cloud" ? "logos" : href.slice(1)) || "features";
    return { kind: "section", section: sec as LandingSectionType };
  }
  const home = project.pages.find((p) => p.path === "/") ?? project.pages[0];
  return { kind: "page", pageId: home.id };
}

function InspectorHeader({
  title,
  subtitle,
  onBack,
  showBack = true,
  rightSlot,
}: {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  showBack?: boolean;
  rightSlot?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0 space-y-0.5">
        <Heading as="h3" size="h6">
          {title}
        </Heading>
        {subtitle && (
          <Text variant="small" className="text-zinc-500 dark:text-zinc-400">
            {subtitle}
          </Text>
        )}
      </div>
      {rightSlot ??
        (showBack && onBack ? (
          <Button variant="plain" size="sm" onClick={onBack} className="shrink-0">
            All sections
          </Button>
        ) : null)}
    </div>
  );
}

function InspectorGroup({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4 border-t border-zinc-200 pt-5 dark:border-white/10">
      <div className="flex items-center justify-between gap-2">
        <Heading
          as="h4"
          size="h6"
          className="text-xs font-semibold tracking-wider text-zinc-900 uppercase dark:text-zinc-100"
        >
          {title}
        </Heading>
        {action}
      </div>
      {description && (
        <Text variant="small" className="text-zinc-500 dark:text-zinc-400">
          {description}
        </Text>
      )}
      {children}
    </div>
  );
}

export interface SectionEditorPanelProps {
  project: WebsiteProjectConfig;
  page: WebsitePage;
  selectedTarget: InspectorTarget | (string & {});
  selectedNode?: SelectedCoreNode;
  selectedItemIndex?: number | null;
  selectedEditPath?: string | null;
  iframeDoc?: Document | null;
  activeSlideIndex?: number | null;
  onSelectSlide?: (idx: number) => void;
  showGridOverlay?: boolean;
  onToggleGridOverlay?: () => void;
  onSelectNode?: (node: SelectedCoreNode) => void;
  showHeaderBackButton?: boolean;
  onChange: React.Dispatch<React.SetStateAction<WebsiteProjectConfig>>;
  onBack: () => void;
  onSelectPage: (pageId: string) => void;
  onHoverVariant: (preview: HoveredVariantPreviewData | null) => void;
  displayMode?: "drawer" | "popover";
  onClosePopover?: () => void;
}

export function SectionEditorPanel({
  project,
  page,
  selectedTarget,
  selectedNode = "section",
  selectedItemIndex = null,
  selectedEditPath = null,
  iframeDoc = null,
  activeSlideIndex = null,
  onSelectSlide,
  showGridOverlay = false,
  onToggleGridOverlay,
  onSelectNode,
  showHeaderBackButton = true,
  onChange,
  onBack,
  onSelectPage,
  onHoverVariant,
  displayMode = "drawer",
  onClosePopover,
}: SectionEditorPanelProps) {
  const [openFooterGroupIdx, setOpenFooterGroupIdx] = React.useState<number | null>(0);
  const [scannerCategory, setScannerCategory] = React.useState<ScannerCategoryFilter>("all");

  // Per-(page, section, variant) memory for widget tab filter & active carousel slide
  const scannerMemoryRef = React.useRef<
    Map<string, { category: ScannerCategoryFilter; slideIndex: number }>
  >(new Map());

  const scannedProfile = React.useMemo(
    () =>
      scanActiveSection({
        project,
        page,
        selectedTarget: String(selectedTarget),
        selectedCoreNode: selectedNode,
        selectedItemIndex,
        iframeDoc,
      }),
    [project, page, selectedTarget, selectedNode, selectedItemIndex, iframeDoc]
  );

  const widgetPlan = React.useMemo(
    () =>
      resolveWidgetPlan({
        pageTemplate: page.template,
        target: String(selectedTarget),
        variant: scannedProfile.variant,
        selectedNode,
        selectedItemIndex,
        editPath: selectedEditPath,
        mode: displayMode,
        scannedProfile,
      }),
    [
      page.template,
      selectedTarget,
      scannedProfile,
      selectedNode,
      selectedItemIndex,
      selectedEditPath,
      displayMode,
    ]
  );

  const isTopLevelSectionView = widgetPlan.selectedNode === "section" && !widgetPlan.editPath;

  const memoryKey = `${page.id}:${scannedProfile.sectionType}:${scannedProfile.variant}`;

  React.useEffect(() => {
    setOpenFooterGroupIdx(0);
    const saved = scannerMemoryRef.current.get(memoryKey);
    if (saved) {
      const validSavedCategory =
        saved.category === "all" || scannedProfile.availableWidgetPages.includes(saved.category);
      setScannerCategory(validSavedCategory ? saved.category : "all");
      if (scannedProfile.variant === "slideshow" && saved.slideIndex > 0) {
        onSelectSlide?.(saved.slideIndex);
      }
      return;
    }
    if (selectedNode !== "section") {
      setScannerCategory(scannedProfile.recommendedPage);
    } else {
      setScannerCategory("all");
    }
  }, [memoryKey]);

  // Focus matching category automatically when user clicks an inner canvas element
  React.useEffect(() => {
    if (selectedNode !== "section" && scannerCategory !== "all") {
      if (scannedProfile.recommendedPage !== scannerCategory) {
        setScannerCategory(scannedProfile.recommendedPage);
      }
    }
  }, [selectedNode, scannedProfile.recommendedPage]);

  React.useEffect(() => {
    scannerMemoryRef.current.set(memoryKey, {
      category: scannerCategory,
      slideIndex: activeSlideIndex ?? 0,
    });
  }, [memoryKey, scannerCategory, activeSlideIndex]);

  React.useEffect(() => {
    if (
      scannerCategory !== "all" &&
      !scannedProfile.availableWidgetPages.includes(scannerCategory)
    ) {
      setScannerCategory("all");
    }
  }, [scannerCategory, scannedProfile]);

  const shared = React.useMemo(() => getEffectiveSharedSections(project), [project]);
  const content = React.useMemo(() => resolvePageContent(project, page), [project, page]);
  const auth = React.useMemo(() => getEffectiveAuthConfig(project), [project]);
  const dash = React.useMemo(() => getEffectiveDashboardConfig(project), [project]);
  const nf = React.useMemo(() => getEffectiveNotFoundConfig(project), [project]);

  const updateCurrentPage = (updater: (p: WebsitePage) => WebsitePage) => {
    onChange((prev) => ({
      ...prev,
      pages: prev.pages.map((p) => (p.id === page.id ? updater(p) : p)),
    }));
  };

  const renderSharedScopeGroup = (slot: "navbar" | "footer") => {
    const mode = page.sharedMode?.[slot] ?? "inherit";
    const label = slot === "navbar" ? "Global Navbar" : "Global Footer";
    const hasCustomData = Boolean(
      slot === "navbar"
        ? page.sharedOverrides?.navbar || page.sharedOverrides?.navbarSettings
        : page.sharedOverrides?.footer || page.sharedOverrides?.footerSettings
    );
    return (
      <InspectorGroup
        title="Page Display"
        description={
          mode === "inherit"
            ? `${label} syncs across all pages set to Inherit.`
            : mode === "custom"
              ? `Using an independent custom ${slot} isolated to ${page.name}.`
              : `${label} is hidden on ${page.name}.`
        }
      >
        <div className="space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{label}</div>
            {mode === "custom" && (
              <span className="rounded-full bg-indigo-500/15 px-2 py-0.5 text-[10px] font-semibold text-indigo-600 dark:text-indigo-300">
                Page-only custom
              </span>
            )}
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {(["inherit", "custom", "hidden"] as const).map((choice) => (
              <Button
                key={choice}
                size="sm"
                variant={mode === choice ? "solid" : "outline"}
                onClick={() =>
                  updateCurrentPage((p) => ({
                    ...p,
                    sharedMode: { ...p.sharedMode, [slot]: choice },
                  }))
                }
                className="capitalize"
              >
                {choice}
              </Button>
            ))}
          </div>
          {mode === "custom" && hasCustomData && (
            <Button
              size="sm"
              variant="plain"
              startContent={<RotateCcw size={12} />}
              onClick={() => onChange((prev) => resetPageSharedChromeOverride(prev, page.id, slot))}
            >
              Reset to Shared {slot === "navbar" ? "Navbar" : "Footer"}
            </Button>
          )}
        </div>
      </InspectorGroup>
    );
  };

  // 1. SHARED ANNOUNCEMENT BAR
  if (isTopLevelSectionView && widgetPlan.normalizedTarget === "announcement") {
    const ann = shared.announcement!;
    const setAnn = (patch: Partial<typeof ann>) =>
      onChange((prev) => ({
        ...prev,
        shared: {
          ...prev.shared,
          announcement: { ...getEffectiveSharedSections(prev).announcement!, ...patch },
        },
      }));
    return (
      <div className={displayMode === "popover" ? "space-y-4 pb-1" : "space-y-6 pb-8"}>
        <InspectorHeader
          title="Announcement Bar"
          subtitle="Shared top notice displayed above the header."
          onBack={onClosePopover ?? onBack}
          showBack={displayMode !== "popover"}
          rightSlot={
            <div className="flex items-center gap-1.5">
              <Switch
                size="sm"
                aria-label="Enable announcement bar"
                checked={ann.enabled}
                onChange={(e) => setAnn({ enabled: e.target.checked })}
              />
              {displayMode === "popover" && onClosePopover && (
                <button
                  type="button"
                  onClick={onClosePopover}
                  aria-label="Close widget settings"
                  className="flex h-6 w-6 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-white/[0.08] dark:hover:text-white"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          }
        />

        <InspectorGroup title="Content">
          <Input
            label="Label tag"
            value={ann.badge ?? ""}
            onChange={(e) => setAnn({ badge: e.target.value })}
          />
          <Textarea
            label="Message"
            rows={2}
            value={ann.text}
            onChange={(e) => setAnn({ text: e.target.value })}
          />
          <Input
            label="Action link text"
            value={ann.linkLabel ?? ""}
            onChange={(e) => setAnn({ linkLabel: e.target.value })}
          />
        </InspectorGroup>

        <InspectorGroup title="Link Destination">
          <LinkTargetPicker
            label="Banner link target"
            value={ann.target}
            project={project}
            onChange={(target) => setAnn({ target })}
            onJumpToPage={onSelectPage}
          />
        </InspectorGroup>
      </div>
    );
  }

  // 2. ACCOUNT AUTH PAGE INSPECTOR
  if (isTopLevelSectionView && widgetPlan.normalizedTarget === "auth") {
    const isSignup = page.template === "signup";
    const isRecovery = page.template === "recovery";
    const setAuth = (patch: Partial<typeof auth>) =>
      onChange((prev) => ({
        ...prev,
        authConfig: { ...getEffectiveAuthConfig(prev), ...patch },
      }));

    return (
      <div className="space-y-6 pb-8">
        <InspectorHeader
          title={page.name}
          subtitle="Heading, layout, OAuth providers, and redirect flow."
          showBack={false}
        />

        <InspectorGroup title="Content">
          <Input
            label="Heading"
            value={
              isSignup
                ? (auth.signupHeading ?? "")
                : isRecovery
                  ? (auth.recoveryHeading ?? "")
                  : (auth.loginHeading ?? "")
            }
            onChange={(e) =>
              setAuth(
                isSignup
                  ? { signupHeading: e.target.value }
                  : isRecovery
                    ? { recoveryHeading: e.target.value }
                    : { loginHeading: e.target.value }
              )
            }
          />
          <Textarea
            label="Description"
            rows={2}
            value={
              isSignup
                ? (auth.signupDescription ?? "")
                : isRecovery
                  ? (auth.recoveryDescription ?? "")
                  : (auth.loginDescription ?? "")
            }
            onChange={(e) =>
              setAuth(
                isSignup
                  ? { signupDescription: e.target.value }
                  : isRecovery
                    ? { recoveryDescription: e.target.value }
                    : { loginDescription: e.target.value }
              )
            }
          />
        </InspectorGroup>

        {page.template === "login" && (
          <InspectorGroup title="Layout & Providers">
            <div className="space-y-2">
              <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Page Layout
              </div>
              <div className="grid grid-cols-2 gap-2">
                {(["split", "centered"] as const).map((layout) => (
                  <Button
                    key={layout}
                    size="sm"
                    variant={page.authLayout === layout ? "solid" : "outline"}
                    onClick={() => updateCurrentPage((p) => ({ ...p, authLayout: layout }))}
                    className="capitalize"
                  >
                    {layout}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Sign-in Options
              </div>
              <Checkbox
                size="sm"
                checked={Boolean(auth.socialProviders?.google)}
                onChange={(e) =>
                  setAuth({
                    socialProviders: { ...auth.socialProviders, google: e.target.checked },
                  })
                }
              >
                Google &amp; Apple OAuth
              </Checkbox>
              <Checkbox
                size="sm"
                checked={Boolean(auth.socialProviders?.github)}
                onChange={(e) =>
                  setAuth({
                    socialProviders: { ...auth.socialProviders, github: e.target.checked },
                  })
                }
              >
                GitHub OAuth
              </Checkbox>
              <Checkbox
                size="sm"
                checked={Boolean(auth.socialProviders?.sso)}
                onChange={(e) =>
                  setAuth({
                    socialProviders: { ...auth.socialProviders, sso: e.target.checked },
                  })
                }
              >
                Enterprise SAML / SSO
              </Checkbox>
            </div>
          </InspectorGroup>
        )}

        <InspectorGroup title="Redirect Links">
          <LinkTargetPicker
            label="After login redirect"
            helperText="Submit the form in Navigate mode to test the redirect live."
            value={auth.postAuthPageId ? { kind: "page", pageId: auth.postAuthPageId } : undefined}
            project={project}
            onChange={(target) => {
              if (target.kind === "page") setAuth({ postAuthPageId: target.pageId });
            }}
            onJumpToPage={onSelectPage}
          />
          {page.template === "login" && (
            <div className="pt-2">
              <LinkTargetPicker
                label="Forgot password link"
                value={
                  auth.forgotPasswordPageId
                    ? { kind: "page", pageId: auth.forgotPasswordPageId }
                    : undefined
                }
                project={project}
                onChange={(target) => {
                  if (target.kind === "page") setAuth({ forgotPasswordPageId: target.pageId });
                }}
                onJumpToPage={onSelectPage}
              />
            </div>
          )}
        </InspectorGroup>
      </div>
    );
  }

  // 3. DASHBOARD MVP (1 Page Overview)
  if (isTopLevelSectionView && widgetPlan.normalizedTarget === "dashboard") {
    const setDash = (patch: Partial<typeof dash>) =>
      onChange((prev) => ({
        ...prev,
        dashboardConfig: { ...getEffectiveDashboardConfig(prev), ...patch },
      }));

    const moveDashBlock = (idx: number, dir: "up" | "down") => {
      const next = [...dash.blocks];
      const swap = dir === "up" ? idx - 1 : idx + 1;
      if (swap < 0 || swap >= next.length) return;
      [next[idx], next[swap]] = [next[swap], next[idx]];
      setDash({ blocks: next });
    };

    return (
      <div className="space-y-6 pb-8">
        <InspectorHeader
          title="Dashboard Overview"
          subtitle={`Workspace route ${page.path}`}
          showBack={false}
        />

        <InspectorGroup title="Content">
          <Input
            label="Workspace App Title"
            value={dash.appTitle}
            onChange={(e) => setDash({ appTitle: e.target.value })}
          />
          <Textarea
            label="Overview Subtitle"
            rows={2}
            value={dash.welcomeSubtitle}
            onChange={(e) => setDash({ welcomeSubtitle: e.target.value })}
          />
          <Input
            label="Return to website label"
            value={dash.backToSiteLabel}
            onChange={(e) => setDash({ backToSiteLabel: e.target.value })}
          />
        </InspectorGroup>

        <InspectorGroup title="Layout & Widgets">
          <Select
            label="Dashboard Shell Preset"
            value={dash.category}
            onValueChange={(category) =>
              setDash({
                category: category as typeof dash.category,
                blocks: dash.blocks.map((b) =>
                  b.type === "app-shell"
                    ? {
                        ...b,
                        variant: category === "dashboards-stacked" ? "stacked-top" : "sidebar-dual",
                      }
                    : b
                ),
              })
            }
          >
            <SelectItem value="dashboards">Sidebar Analytics (SaaS)</SelectItem>
            <SelectItem value="dashboards-stacked">Stacked Top Header</SelectItem>
            <SelectItem value="settings">Workspace Governance</SelectItem>
            <SelectItem value="informational">Customer Dossier</SelectItem>
          </Select>

          <div className="divide-y divide-zinc-200 dark:divide-white/10">
            {dash.blocks.map((block, index) => (
              <div key={block.id} className="space-y-3 py-3 first:pt-1 last:pb-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                    {block.title}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => moveDashBlock(index, "up")}
                      aria-label={`Move ${block.title} up`}
                      className="rounded p-1 text-zinc-400 hover:text-zinc-900 disabled:opacity-25 dark:hover:text-white"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={index === dash.blocks.length - 1}
                      onClick={() => moveDashBlock(index, "down")}
                      aria-label={`Move ${block.title} down`}
                      className="rounded p-1 text-zinc-400 hover:text-zinc-900 disabled:opacity-25 dark:hover:text-white"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </button>
                    <Switch
                      size="sm"
                      checked={block.enabled}
                      onChange={(e) =>
                        setDash({
                          blocks: dash.blocks.map((item) =>
                            item.id === block.id ? { ...item, enabled: e.target.checked } : item
                          ),
                        })
                      }
                    />
                  </div>
                </div>
                <Select
                  aria-label={`${block.title} style`}
                  value={block.variant}
                  onValueChange={(variant) =>
                    setDash({
                      blocks: dash.blocks.map((item) =>
                        item.id === block.id ? { ...item, variant } : item
                      ),
                    })
                  }
                >
                  {DASHBOARD_BLOCK_VARIANTS[block.type].map((v) => (
                    <SelectItem key={v} value={v}>
                      {v}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            ))}
          </div>
        </InspectorGroup>

        <InspectorGroup title="Navigation Links">
          <LinkTargetPicker
            label="Back to website button"
            value={
              dash.backToSitePageId ? { kind: "page", pageId: dash.backToSitePageId } : undefined
            }
            project={project}
            onChange={(target) => {
              if (target.kind === "page") setDash({ backToSitePageId: target.pageId });
            }}
            onJumpToPage={onSelectPage}
          />

          <div className="space-y-4 pt-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Sidebar Links
              </span>
              <Button
                size="sm"
                variant="plain"
                startContent={<Plus size={13} />}
                onClick={() => {
                  const home = project.pages.find((p) => p.path === "/") ?? project.pages[0];
                  setDash({
                    sidebarLinks: [
                      ...dash.sidebarLinks,
                      {
                        id: `dash-link-${Date.now().toString(36)}`,
                        label: home.name,
                        target: { kind: "page", pageId: home.id },
                      },
                    ],
                  });
                }}
              >
                Add link
              </Button>
            </div>
            <div className="divide-y divide-zinc-200 dark:divide-white/10">
              {dash.sidebarLinks.map((item, idx) => (
                <div key={item.id} className="space-y-3 py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-2">
                    <Input
                      aria-label="Sidebar link label"
                      value={item.label}
                      onChange={(e) =>
                        setDash({
                          sidebarLinks: dash.sidebarLinks.map((l, i) =>
                            i === idx ? { ...l, label: e.target.value } : l
                          ),
                        })
                      }
                    />
                    <button
                      type="button"
                      aria-label={`Remove ${item.label}`}
                      onClick={() =>
                        setDash({
                          sidebarLinks: dash.sidebarLinks.filter((_, i) => i !== idx),
                        })
                      }
                      className="rounded-lg p-2 text-zinc-400 hover:bg-red-500/10 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <LinkTargetPicker
                    value={item.target}
                    project={project}
                    onChange={(target) =>
                      setDash({
                        sidebarLinks: dash.sidebarLinks.map((l, i) =>
                          i === idx ? { ...l, target } : l
                        ),
                      })
                    }
                    onJumpToPage={onSelectPage}
                  />
                </div>
              ))}
            </div>
          </div>
        </InspectorGroup>
      </div>
    );
  }

  // 4. EDITABLE 404 PAGE
  if (isTopLevelSectionView && widgetPlan.normalizedTarget === "not-found") {
    const setNf = (patch: Partial<typeof nf>) =>
      onChange((prev) => ({
        ...prev,
        notFoundConfig: { ...getEffectiveNotFoundConfig(prev), ...patch },
      }));

    return (
      <div className="space-y-6 pb-8">
        <InspectorHeader
          title="404 Page"
          subtitle="Error message and recovery actions for unknown routes."
          showBack={false}
        />

        <InspectorGroup title="Content">
          <Input
            label="Status code"
            value={nf.code}
            onChange={(e) => setNf({ code: e.target.value })}
          />
          <Input
            label="Headline"
            value={nf.title}
            onChange={(e) => setNf({ title: e.target.value })}
          />
          <Textarea
            label="Description"
            rows={2}
            value={nf.description}
            onChange={(e) => setNf({ description: e.target.value })}
          />
          <Input
            label="Primary button label"
            value={nf.primaryActionLabel}
            onChange={(e) => setNf({ primaryActionLabel: e.target.value })}
          />
          <Input
            label="Secondary button label"
            value={nf.secondaryActionLabel ?? ""}
            onChange={(e) => setNf({ secondaryActionLabel: e.target.value })}
          />
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Show quick site links below
            </span>
            <Switch
              size="sm"
              checked={nf.showQuickLinks}
              onChange={(e) => setNf({ showQuickLinks: e.target.checked })}
            />
          </div>
        </InspectorGroup>

        <InspectorGroup title="Recovery Links">
          <LinkTargetPicker
            label="Primary action destination"
            value={nf.primaryActionTarget}
            project={project}
            onChange={(primaryActionTarget) => setNf({ primaryActionTarget })}
            onJumpToPage={onSelectPage}
          />
          <div className="pt-2">
            <LinkTargetPicker
              label="Secondary destination"
              value={nf.secondaryActionTarget}
              project={project}
              onChange={(secondaryActionTarget) => setNf({ secondaryActionTarget })}
              onClear={() => setNf({ secondaryActionTarget: undefined, secondaryActionLabel: "" })}
              onJumpToPage={onSelectPage}
            />
          </div>
        </InspectorGroup>
      </div>
    );
  }

  // 5. MARKETING SECTION & TEMPLATE BLOCKS
  const normalizedTarget = selectedTarget === "logo-cloud" ? "logos" : String(selectedTarget);
  const aboutBlocks = getAboutPageSections(page);
  const contactBlocks = getContactPageSections(page);
  const legalBlocks = getLegalPageSections(page);
  const modularSpec = MODULAR_SECTION_EDITOR_SPEC[normalizedTarget];

  if (isTopLevelSectionView && modularSpec) {
    const matchedAbout = aboutBlocks.find((b) => b.id === normalizedTarget);
    const matchedContact = contactBlocks.find((b) => b.id === normalizedTarget);
    const matchedLegal = legalBlocks.find((b) => b.id === normalizedTarget);
    const isToggleable =
      normalizedTarget === "pricing-compare" ||
      Boolean(matchedAbout || matchedContact || matchedLegal);
    const isEnabled =
      normalizedTarget === "pricing-compare"
        ? page.pricingCompareEnabled !== false
        : ((matchedAbout ?? matchedContact ?? matchedLegal)?.enabled ?? true);
    const modOverrides = page.modularOverrides?.[normalizedTarget] ?? {};
    const modAppearance = (page.modularSettings?.[normalizedTarget] ??
      {}) as SectionAppearanceSettings;

    const toggleModularEnabled = (checked: boolean) => {
      if (normalizedTarget === "pricing-compare") {
        updateCurrentPage((p) => togglePricingCompareSection(p, checked));
      } else if (matchedAbout) {
        updateCurrentPage((p) =>
          toggleAboutPageSection(p, matchedAbout.id as AboutSectionId, checked)
        );
      } else if (matchedContact) {
        updateCurrentPage((p) =>
          toggleContactPageSection(p, matchedContact.id as ContactSectionId, checked)
        );
      } else if (matchedLegal) {
        updateCurrentPage((p) =>
          toggleLegalPageSection(p, matchedLegal.id as LegalSectionId, checked)
        );
      }
    };

    const setModularField = (key: string, value: string) => {
      onChange((prev) =>
        updateModularSectionOverride(prev, normalizedTarget, { [key]: value }, { pageId: page.id })
      );
    };

    const setModularAppearance = (patch: Partial<SectionAppearanceSettings>) => {
      onChange((prev) =>
        updateModularSectionSettings(prev, normalizedTarget, patch, { pageId: page.id })
      );
    };

    return (
      <div className="space-y-6 pb-8">
        <InspectorHeader
          title={modularSpec.title}
          subtitle={`${modularSpec.subtitle} · ${page.name}`}
          onBack={onBack}
          showBack={showHeaderBackButton}
          rightSlot={
            isToggleable ? (
              <Switch
                size="sm"
                aria-label={`Toggle ${modularSpec.title}`}
                checked={isEnabled}
                onChange={(e) => toggleModularEnabled(e.target.checked)}
              />
            ) : undefined
          }
        />

        <SectionScannerHeader
          profile={scannedProfile}
          activeCategory={scannerCategory}
          onSelectCategory={setScannerCategory}
        />

        {shouldRenderWidgetGroup(scannedProfile, scannerCategory, "type-actions", [
          "typography",
        ]) && (
          <InspectorGroup title="Content & Copy">
            {modularSpec.fields.map((field) => {
              const val =
                typeof modOverrides[field.key] === "string"
                  ? (modOverrides[field.key] as string)
                  : "";
              return field.multiline ? (
                <Textarea
                  key={field.key}
                  label={field.label}
                  placeholder={
                    field.placeholder ?? "Double-click text on canvas or override here..."
                  }
                  rows={3}
                  value={val}
                  onChange={(e) => setModularField(field.key, e.target.value)}
                />
              ) : (
                <Input
                  key={field.key}
                  label={field.label}
                  placeholder={
                    field.placeholder ?? "Double-click text on canvas or override here..."
                  }
                  value={val}
                  onChange={(e) => setModularField(field.key, e.target.value)}
                />
              );
            })}
            {Object.keys(modOverrides).length > 0 && (
              <Button
                size="sm"
                variant="plain"
                startContent={<RotateCcw size={13} />}
                onClick={() =>
                  updateCurrentPage((p) => {
                    const next = { ...(p.modularOverrides ?? {}) };
                    delete next[normalizedTarget];
                    return { ...p, modularOverrides: next };
                  })
                }
              >
                Reset copy overrides
              </Button>
            )}
          </InspectorGroup>
        )}

        {shouldRenderWidgetGroup(scannedProfile, scannerCategory, "media-color", ["color"]) && (
          <InspectorGroup title="Color & Contrast">
            <SectionColorPickerWidget
              settings={modAppearance.color}
              onChange={(color) => setModularAppearance({ color })}
              showScrim={false}
            />
          </InspectorGroup>
        )}

        {shouldRenderWidgetGroup(scannedProfile, scannerCategory, "layout-motion", [
          "spacing-container",
        ]) && (
          <InspectorGroup title="Surface & Spacing">
            <Select
              label="Surface"
              value={modAppearance.surface ?? "default"}
              onValueChange={(surface) =>
                setModularAppearance({ surface: surface as SectionAppearanceSettings["surface"] })
              }
            >
              <SelectItem value="default">Default Base</SelectItem>
              <SelectItem value="muted">Muted Surface</SelectItem>
              <SelectItem value="accent-subtle">Accent Tint</SelectItem>
              <SelectItem value="inverted">Inverted Contrast</SelectItem>
            </Select>
            <Select
              label="Vertical Padding"
              value={modAppearance.paddingY ?? "normal"}
              onValueChange={(paddingY) =>
                setModularAppearance({
                  paddingY: paddingY as SectionAppearanceSettings["paddingY"],
                })
              }
            >
              <SelectItem value="compact">Compact</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="spacious">Spacious</SelectItem>
            </Select>
            <Select
              label="Container Width"
              value={modAppearance.containerWidth ?? "default"}
              onValueChange={(containerWidth) =>
                setModularAppearance({
                  containerWidth: containerWidth as SectionAppearanceSettings["containerWidth"],
                })
              }
            >
              <SelectItem value="default">Token Default</SelectItem>
              <SelectItem value="narrow">Narrow (58rem)</SelectItem>
              <SelectItem value="wide">Wide (92rem)</SelectItem>
            </Select>
            <Select
              label="Header Alignment"
              value={modAppearance.align ?? "left"}
              onValueChange={(align) =>
                setModularAppearance({ align: align as SectionAppearanceSettings["align"] })
              }
            >
              <SelectItem value="left">Preset Default</SelectItem>
              <SelectItem value="center">Centered</SelectItem>
            </Select>
          </InspectorGroup>
        )}

        {shouldRenderWidgetGroup(scannedProfile, scannerCategory, "data-advanced", [
          "breakpoint-visibility",
        ]) && (
          <InspectorGroup title="Visibility">
            <VisibilityAnchorWidget
              visibility={modAppearance.visibility}
              onVisibilityChange={(visibility) => setModularAppearance({ visibility })}
            />
          </InspectorGroup>
        )}
      </div>
    );
  }

  const sectionType = normalizedTarget as LandingSectionType;
  const isSharedNav =
    sectionType === "navbar" && (page.sharedMode?.navbar ?? "inherit") === "inherit";
  const isSharedFoot =
    sectionType === "footer" && (page.sharedMode?.footer ?? "inherit") === "inherit";
  const isCustomNav = sectionType === "navbar" && page.sharedMode?.navbar === "custom";
  const isCustomFoot = sectionType === "footer" && page.sharedMode?.footer === "custom";
  const currentSection =
    (isSharedNav
      ? shared.navbar?.selection
      : isSharedFoot
        ? shared.footer?.selection
        : undefined) ?? page.sections.find((s) => s.type === sectionType);
  const definition = landingSectionRegistry.find((d) => d.type === sectionType);

  const isNonSectionArrayTarget =
    widgetPlan.targetKind === "modular" ||
    widgetPlan.targetKind === "special" ||
    widgetPlan.normalizedTarget === "announcement";

  if (!currentSection && !isNonSectionArrayTarget) {
    return (
      <div className="space-y-6 pb-8">
        <InspectorHeader
          title={definition?.title ?? sectionType}
          subtitle={
            definition
              ? `This section is not added to ${page.name} yet.`
              : `Using template layout for ${page.name}.`
          }
          onBack={onBack}
        />
        {(sectionType === "navbar" || sectionType === "footer") &&
          renderSharedScopeGroup(sectionType)}
        {definition && (
          <div className="flex items-center gap-2 pt-2">
            <Button
              size="sm"
              variant="solid"
              color="primary"
              startContent={<Plus size={14} />}
              onClick={() =>
                onChange((prev) => enableAndPositionPageSection(prev, page.id, sectionType))
              }
            >
              Add to page
            </Button>
          </div>
        )}
      </div>
    );
  }

  const updateSectionSelection = (
    updater: (s: LandingSectionSelection) => LandingSectionSelection
  ) => {
    if (isSharedNav && sectionType === "navbar") {
      onChange((prev) => {
        const eff = getEffectiveSharedSections(prev);
        return {
          ...prev,
          shared: {
            ...prev.shared,
            navbar: {
              ...eff.navbar!,
              selection: updater(eff.navbar!.selection) as Extract<
                LandingSectionSelection,
                { type: "navbar" }
              >,
            },
          },
        };
      });
      return;
    }
    if (isSharedFoot && sectionType === "footer") {
      onChange((prev) => {
        const eff = getEffectiveSharedSections(prev);
        return {
          ...prev,
          shared: {
            ...prev.shared,
            footer: {
              ...eff.footer!,
              selection: updater(eff.footer!.selection) as Extract<
                LandingSectionSelection,
                { type: "footer" }
              >,
            },
          },
        };
      });
      return;
    }
    updateCurrentPage((p) => ({
      ...p,
      sections: p.sections.map((s) => (s.type === sectionType ? updater(s) : s)),
    }));
  };

  const setAppearance = (patch: Partial<SectionAppearanceSettings>) => {
    if (widgetPlan.targetKind === "modular") {
      updateCurrentPage((p) => ({
        ...p,
        modularSettings: {
          ...(p.modularSettings ?? {}),
          [widgetPlan.normalizedTarget]: {
            ...((p.modularSettings?.[widgetPlan.normalizedTarget] ??
              {}) as SectionAppearanceSettings),
            ...patch,
          },
        },
      }));
      return;
    }
    if (!currentSection) return;
    updateSectionSelection(
      (s) =>
        ({
          ...s,
          customSettings: { ...(s.customSettings ?? {}), ...patch },
        }) as LandingSectionSelection
    );
  };

  const setSectionContent = (patch: Record<string, unknown>, globalOverride = false) => {
    onChange((prev) =>
      updateSectionContentOverride(prev, sectionType, patch, {
        pageId: page.id,
        global: globalOverride,
      })
    );
  };

  const appearance = (
    widgetPlan.targetKind === "modular"
      ? (page.modularSettings?.[widgetPlan.normalizedTarget] ?? {})
      : (currentSection?.customSettings ?? {})
  ) as SectionAppearanceSettings;
  const customNavData = (isCustomNav ? page.sharedOverrides?.navbar : undefined) as
    | {
        items?: WebsiteNavItem[];
        actionLabel?: string;
        actionTarget?: WebsiteLinkTarget | null;
        brandName?: string;
      }
    | undefined;
  const customFootData = (isCustomFoot ? page.sharedOverrides?.footer : undefined) as
    Partial<WebsiteSharedFooterConfig> | undefined;
  const fallbackFooterSelection: Extract<LandingSectionSelection, { type: "footer" }> =
    currentSection?.type === "footer"
      ? currentSection
      : { type: "footer", variant: "columns", enabled: true };
  const effectiveFooterData: WebsiteSharedFooterConfig = {
    ...(shared.footer ?? {
      selection: fallbackFooterSelection,
      description: content.footer.description,
      note: content.footer.note,
    }),
    ...(customFootData ?? {}),
    selection: customFootData?.selection ?? shared.footer?.selection ?? fallbackFooterSelection,
  };
  const navItems: WebsiteNavItem[] =
    (isCustomNav ? customNavData?.items : undefined) ?? shared.navbar?.items ?? [];

  const updateSharedNavbar = (
    patch: Partial<NonNullable<typeof shared.navbar>> & { brandName?: string }
  ) => {
    if (isCustomNav) {
      updateCurrentPage((p) => ({
        ...p,
        sharedOverrides: {
          ...p.sharedOverrides,
          navbar: {
            ...(p.sharedOverrides?.navbar ?? {}),
            ...patch,
          },
        },
      }));
      return;
    }
    const { brandName, ...sharedPatch } = patch;
    onChange((prev) => {
      const eff = getEffectiveSharedSections(prev);
      const updated: WebsiteProjectConfig = {
        ...prev,
        ...(brandName !== undefined ? { brand: { ...prev.brand, name: brandName } } : {}),
        shared: {
          ...prev.shared,
          navbar: {
            ...eff.navbar!,
            ...sharedPatch,
          },
        },
      };
      return syncNavigationFromSharedNavbar(updated);
    });
  };

  const updateFooterData = (patch: Partial<WebsiteSharedFooterConfig>) => {
    if (isCustomFoot) {
      updateCurrentPage((p) => ({
        ...p,
        sharedOverrides: {
          ...p.sharedOverrides,
          footer: {
            ...(p.sharedOverrides?.footer ?? {}),
            ...patch,
          },
        },
      }));
      return;
    }
    onChange((prev) => ({
      ...prev,
      shared: {
        ...prev.shared,
        footer: {
          ...getEffectiveSharedSections(prev).footer!,
          ...patch,
        },
      },
    }));
  };

  const resolveFooterGroups = () => {
    if (effectiveFooterData.groups?.length) {
      return effectiveFooterData.groups;
    }
    return content.footer.groups.map((g) => ({
      title: g.title,
      links: g.links.map((l) => ({
        label: l.label,
        target:
          "target" in l && typeof l.target === "object" && l.target !== null
            ? (l.target as WebsiteLinkTarget)
            : inferLinkTarget(project, "href" in l ? l.href : undefined),
      })),
    }));
  };

  const saveFooterGroups = (
    nextGroups: { title: string; links: { label: string; target: WebsiteLinkTarget }[] }[]
  ) => {
    updateFooterData({ groups: nextGroups });
  };

  const renderHeroVariantMedia = () => {
    if (!currentSection) return null;
    const heroVariant = currentSection.variant;
    if (heroVariant === "split") {
      const splitCfg = (content.hero.variants.split ?? {
        variant: "split",
        image: defaultSplitSlides[0].image,
      }) as {
        variant?: string;
        image?: HeroImage;
        slides?: HeroSplitSlide[];
        videoUrl?: string;
      };
      const hasCustomLead = Boolean(
        splitCfg.image?.src && !splitCfg.image.src.startsWith("data:image/svg+xml")
      );
      const splitSlides: HeroSplitSlide[] =
        splitCfg.slides && splitCfg.slides.length > 0
          ? splitCfg.slides
          : defaultSplitSlides.map((d, idx) => ({
              id: d.id,
              image: idx === 0 && hasCustomLead && splitCfg.image ? splitCfg.image : d.image,
              videoUrl: idx === 0 ? (splitCfg.videoUrl ?? d.videoSrc) : d.videoSrc,
              quote: d.testimonial.quote,
              author: d.testimonial.author,
              role: d.testimonial.role,
            }));
      const slideIdx = Math.min(activeSlideIndex ?? 0, Math.max(0, splitSlides.length - 1));
      const currentSplitSlide = splitSlides[slideIdx] ?? splitSlides[0];
      const patchSplitSlides = (nextSlides: HeroSplitSlide[]) =>
        setSectionContent({
          variants: {
            split: {
              ...splitCfg,
              variant: "split",
              image: nextSlides[0]?.image ?? splitCfg.image ?? defaultSplitSlides[0].image,
              slides: nextSlides,
            },
          },
        });

      return (
        <div className="space-y-3">
          <SlideshowMediaWidget
            slides={splitSlides.map((s) => s.image)}
            presets={HERO_MEDIA_PRESETS}
            activeSlideIndex={slideIdx}
            onSelectSlide={onSelectSlide}
            project={project}
            onSlidesChange={(nextImages) => {
              const mergedSlides: HeroSplitSlide[] = nextImages.map((img, i) => {
                const existing = splitSlides[i];
                const fb = defaultSplitSlides[i % defaultSplitSlides.length];
                return {
                  id: existing?.id ?? `split-slide-${i + 1}`,
                  image: img,
                  videoUrl: existing?.videoUrl ?? (i === 0 ? fb.videoSrc : undefined),
                  quote: img.subtitle ?? existing?.quote ?? fb.testimonial.quote,
                  author: img.title ?? existing?.author ?? fb.testimonial.author,
                  role: existing?.role ?? fb.testimonial.role,
                };
              });
              patchSplitSlides(mergedSlides);
            }}
            slideshowSettings={appearance.slideshow}
            onSlideshowSettingsChange={(slideshow) => setAppearance({ slideshow })}
          />
          {currentSplitSlide && (
            <div className="space-y-2 rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-3 dark:border-white/[0.08] dark:bg-white/[0.02]">
              <Text variant="small" className="font-medium text-zinc-700 dark:text-zinc-200">
                Slide #{slideIdx + 1} Story &amp; Card Quote
              </Text>
              <Input
                label="Watch Story Video URL (MP4 / YouTube)"
                placeholder="https://... or /video.mp4"
                value={currentSplitSlide.videoUrl ?? ""}
                onChange={(e) =>
                  patchSplitSlides(
                    splitSlides.map((s, i) =>
                      i === slideIdx ? { ...s, videoUrl: e.target.value || undefined } : s
                    )
                  )
                }
              />
              <Textarea
                label="Floating Card Quote"
                rows={2}
                value={currentSplitSlide.quote ?? ""}
                onChange={(e) =>
                  patchSplitSlides(
                    splitSlides.map((s, i) =>
                      i === slideIdx ? { ...s, quote: e.target.value } : s
                    )
                  )
                }
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  label="Author"
                  value={currentSplitSlide.author ?? ""}
                  onChange={(e) =>
                    patchSplitSlides(
                      splitSlides.map((s, i) =>
                        i === slideIdx ? { ...s, author: e.target.value } : s
                      )
                    )
                  }
                />
                <Input
                  label="Role"
                  value={currentSplitSlide.role ?? ""}
                  onChange={(e) =>
                    patchSplitSlides(
                      splitSlides.map((s, i) =>
                        i === slideIdx ? { ...s, role: e.target.value } : s
                      )
                    )
                  }
                />
              </div>
            </div>
          )}
        </div>
      );
    }
    if (heroVariant === "slideshow") {
      const cfg = content.hero.variants.slideshow as Extract<
        HeroSectionConfig,
        { variant: "slideshow" }
      >;
      return (
        <SlideshowMediaWidget
          slides={cfg.slides}
          presets={HERO_MEDIA_PRESETS}
          activeSlideIndex={activeSlideIndex}
          onSelectSlide={onSelectSlide}
          project={project}
          onSlidesChange={(slides) =>
            setSectionContent({ variants: { slideshow: { variant: "slideshow", slides } } })
          }
          slideshowSettings={appearance.slideshow}
          onSlideshowSettingsChange={(slideshow) => setAppearance({ slideshow })}
        />
      );
    }
    if (heroVariant === "interactive") {
      const cfg = content.hero.variants.interactive as Extract<
        HeroSectionConfig,
        { variant: "interactive" }
      >;
      return (
        <HeroInteractiveTabsCrudEditor
          tabs={cfg.tabs as ProductDemoTab[]}
          onChange={(tabs) =>
            setSectionContent({ variants: { interactive: { variant: "interactive", tabs } } })
          }
        />
      );
    }
    if (heroVariant === "video") {
      const cfg = content.hero.variants.video as Extract<HeroSectionConfig, { variant: "video" }>;
      return (
        <VideoMediaWidget
          videoSrc={cfg.video.src}
          onVideoSrcChange={(src) =>
            setSectionContent({
              variants: {
                video: {
                  variant: "video",
                  video: { ...cfg.video, src },
                },
              },
            })
          }
          poster={cfg.video.poster}
          presets={HERO_MEDIA_PRESETS}
          onPosterChange={(patch) =>
            setSectionContent({
              variants: {
                video: {
                  variant: "video",
                  video: {
                    ...cfg.video,
                    poster: { ...cfg.video.poster, ...patch },
                  },
                },
              },
            })
          }
          onPosterCaptionChange={(caption) =>
            setSectionContent({
              variants: {
                video: {
                  variant: "video",
                  video: {
                    ...cfg.video,
                    poster: { ...cfg.video.poster, caption },
                  },
                },
              },
            })
          }
          mediaSettings={appearance.media}
          onMediaSettingsChange={(media) => setAppearance({ media })}
          videoSettings={appearance.video}
          onVideoSettingsChange={(video) => setAppearance({ video })}
        />
      );
    }

    if (heroVariant === "center-video") {
      const cfg = (content.hero.variants["center-video"] ?? {
        variant: "center-video",
        image: { src: HERO_MEDIA_PRESETS[0].src, alt: "Center video poster" },
        videoUrl: "",
      }) as { variant: "center-video"; image?: HeroImage; videoUrl?: string };
      const posterImg = cfg.image ?? { src: "", alt: "Center video poster" };
      return (
        <VideoMediaWidget
          videoSrc={cfg.videoUrl ?? ""}
          onVideoSrcChange={(videoUrl) =>
            setSectionContent({
              variants: {
                "center-video": {
                  ...cfg,
                  variant: "center-video",
                  videoUrl,
                },
              },
            })
          }
          poster={posterImg}
          presets={HERO_MEDIA_PRESETS}
          onPosterChange={(patch) =>
            setSectionContent({
              variants: {
                "center-video": {
                  ...cfg,
                  variant: "center-video",
                  image: { ...posterImg, ...patch },
                },
              },
            })
          }
          onPosterCaptionChange={(caption) =>
            setSectionContent({
              variants: {
                "center-video": {
                  ...cfg,
                  variant: "center-video",
                  image: { ...posterImg, caption },
                },
              },
            })
          }
          mediaSettings={appearance.media}
          onMediaSettingsChange={(media) => setAppearance({ media })}
          videoSettings={appearance.video}
          onVideoSettingsChange={(video) => setAppearance({ video })}
        />
      );
    }

    if (heroVariant === "remit-grid" || heroVariant === ("fintech-remit" as string)) {
      const remitKey = "remit-grid";
      const cfg = (content.hero.variants["remit-grid"] ?? {
        variant: "remit-grid",
      }) as HeroRemitGridConfig;
      const patchRemit = (patch: Partial<HeroRemitGridConfig>) =>
        setSectionContent({
          variants: {
            [remitKey]: { ...cfg, variant: "remit-grid", ...patch },
          },
        });
      const metricCards = cfg.metricCards ?? [];
      const invoiceList = cfg.invoiceList ?? [];
      const reminder = cfg.floatingReminder ?? {
        tag: "Auto-chase",
        title: "24h payout guarantee",
        badge: "Verified",
      };

      return (
        <div className="space-y-3.5">
          <MediaUploadField
            label="Dashboard card backdrop"
            src={
              cfg.backdropSrc ??
              "https://images.pexels.com/photos/5882678/pexels-photo-5882678.jpeg?auto=compress&cs=tinysrgb&w=800"
            }
            alt={cfg.backdropAlt ?? "Remit backdrop"}
            showAlt
            presets={HERO_MEDIA_PRESETS}
            onChange={(p) =>
              patchRemit({
                ...(p.src !== undefined ? { backdropSrc: p.src } : {}),
                ...(p.alt !== undefined ? { backdropAlt: p.alt } : {}),
              })
            }
          />
          <Input
            label="Top pill badge text"
            value={cfg.badgeText ?? "New · automatic reminders"}
            onChange={(e) => patchRemit({ badgeText: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-2">
            <Input
              label="Stat metric label"
              value={cfg.statLabel ?? "Collected this week"}
              onChange={(e) => patchRemit({ statLabel: e.target.value })}
            />
            <Input
              label="Stat metric value"
              value={cfg.statValue ?? "$142,800"}
              onChange={(e) => patchRemit({ statValue: e.target.value })}
            />
          </div>
          <div className="space-y-2 rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-3 dark:border-white/[0.08] dark:bg-white/[0.02]">
            <Text variant="small" className="font-medium text-zinc-700 dark:text-zinc-200">
              Floating reminder card
            </Text>
            <div className="grid grid-cols-2 gap-2">
              <Input
                label="Tag"
                value={reminder.tag}
                onChange={(e) =>
                  patchRemit({ floatingReminder: { ...reminder, tag: e.target.value } })
                }
              />
              <Input
                label="Badge"
                value={reminder.badge}
                onChange={(e) =>
                  patchRemit({ floatingReminder: { ...reminder, badge: e.target.value } })
                }
              />
            </div>
            <Input
              label="Reminder title"
              value={reminder.title}
              onChange={(e) =>
                patchRemit({ floatingReminder: { ...reminder, title: e.target.value } })
              }
            />
          </div>

          {metricCards.length > 0 && (
            <div className="space-y-2 rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-3 dark:border-white/[0.08] dark:bg-white/[0.02]">
              <Text variant="small" className="font-medium text-zinc-700 dark:text-zinc-200">
                Bottom metric cards ({metricCards.length})
              </Text>
              {metricCards.map((mc, idx) => (
                <div
                  key={idx}
                  className="space-y-2 rounded-lg border border-zinc-200/70 bg-white/80 p-2.5 dark:border-white/10 dark:bg-black/20"
                >
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      label={`#${idx + 1} Value`}
                      value={mc.title}
                      onChange={(e) =>
                        patchRemit({
                          metricCards: metricCards.map((row, i) =>
                            i === idx ? { ...row, title: e.target.value } : row
                          ),
                        })
                      }
                    />
                    <Input
                      label="Footer"
                      value={mc.footerText ?? ""}
                      onChange={(e) =>
                        patchRemit({
                          metricCards: metricCards.map((row, i) =>
                            i === idx ? { ...row, footerText: e.target.value } : row
                          ),
                        })
                      }
                    />
                  </div>
                  <Input
                    label="Description"
                    value={mc.description}
                    onChange={(e) =>
                      patchRemit({
                        metricCards: metricCards.map((row, i) =>
                          i === idx ? { ...row, description: e.target.value } : row
                        ),
                      })
                    }
                  />
                </div>
              ))}
            </div>
          )}

          {invoiceList.length > 0 && (
            <div className="space-y-2 rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-3 dark:border-white/[0.08] dark:bg-white/[0.02]">
              <Text variant="small" className="font-medium text-zinc-700 dark:text-zinc-200">
                Invoice status rows ({invoiceList.length})
              </Text>
              {invoiceList.map((inv, idx) => (
                <div key={idx} className="grid grid-cols-2 gap-2">
                  <Input
                    aria-label={`Invoice row ${idx + 1} name`}
                    value={inv.name}
                    onChange={(e) =>
                      patchRemit({
                        invoiceList: invoiceList.map((row, i) =>
                          i === idx ? { ...row, name: e.target.value } : row
                        ),
                      })
                    }
                  />
                  <Input
                    aria-label={`Invoice row ${idx + 1} status`}
                    value={inv.status}
                    onChange={(e) =>
                      patchRemit({
                        invoiceList: invoiceList.map((row, i) =>
                          i === idx ? { ...row, status: e.target.value } : row
                        ),
                      })
                    }
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    const variantCfg = content.hero.variants[heroVariant as keyof typeof content.hero.variants] as
      | {
          image?: HeroImage & { portraitSrc?: string; focalPoint?: string };
          videoUrl?: string;
          proof?: { label: string; sourceUrl: string };
          credit?: { label: string; href?: string };
        }
      | undefined;
    const img = variantCfg?.image;
    if (!img) {
      return (
        <Text variant="small" className="text-zinc-500 dark:text-zinc-400">
          Switch to Split, Split Product, Center Canvas, or Editorial Photo layout preset to attach
          and customize a hero visual.
        </Text>
      );
    }

    return (
      <div className="space-y-3">
        <MediaCoreEditor
          src={img.portraitSrc ?? img.src}
          darkSrc={img.darkSrc}
          alt={img.alt}
          caption={img.caption}
          presets={HERO_MEDIA_PRESETS}
          onImageChange={(patch) =>
            setSectionContent({
              variants: {
                [heroVariant]: {
                  image: {
                    ...img,
                    ...patch,
                    ...(heroVariant === "editorial-photo" && patch.src !== undefined
                      ? { portraitSrc: patch.src }
                      : {}),
                  },
                },
              },
            })
          }
          onCaptionChange={(caption) =>
            setSectionContent({
              variants: {
                [heroVariant]: {
                  image: { ...img, caption },
                },
              },
            })
          }
          settings={appearance.media}
          onSettingsChange={(media) => setAppearance({ media })}
        />

        {heroVariant === "center-canvas" && (
          <div className="space-y-3">
            <Input
              label="Optional background video URL"
              placeholder="https://youtube.com/watch?v=... or .mp4"
              value={variantCfg?.videoUrl ?? ""}
              onChange={(e) =>
                setSectionContent({
                  variants: {
                    "center-canvas": {
                      ...variantCfg,
                      variant: "center-canvas",
                      videoUrl: e.target.value || undefined,
                    },
                  },
                })
              }
            />
            <CodeIllustrationWidget
              settings={appearance.illustration}
              onChange={(illustration) => setAppearance({ illustration })}
              presets={scannedProfile.manifest?.visual.presets ?? []}
              mediaPresets={HERO_MEDIA_PRESETS}
              illustrationLabel="Canvas UI Illustration"
            />
          </div>
        )}

        {heroVariant === "split-product" && variantCfg?.proof && (
          <div className="space-y-2 rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-3 dark:border-white/[0.08] dark:bg-white/[0.02]">
            <Input
              label="Social proof pill text"
              value={variantCfg.proof.label}
              onChange={(e) =>
                setSectionContent({
                  variants: {
                    "split-product": {
                      ...variantCfg,
                      variant: "split-product",
                      proof: { ...variantCfg.proof!, label: e.target.value },
                    },
                  },
                })
              }
            />
            <Input
              label="Proof link URL"
              value={variantCfg.proof.sourceUrl}
              onChange={(e) =>
                setSectionContent({
                  variants: {
                    "split-product": {
                      ...variantCfg,
                      variant: "split-product",
                      proof: { ...variantCfg.proof!, sourceUrl: e.target.value },
                    },
                  },
                })
              }
            />
          </div>
        )}

        {heroVariant === "editorial-photo" && variantCfg?.credit && (
          <div className="grid grid-cols-2 gap-2">
            <Input
              label="Photo credit label"
              value={variantCfg.credit.label}
              onChange={(e) =>
                setSectionContent({
                  variants: {
                    "editorial-photo": {
                      ...variantCfg,
                      variant: "editorial-photo",
                      credit: { ...variantCfg.credit!, label: e.target.value },
                    },
                  },
                })
              }
            />
            <Input
              label="Credit link"
              value={variantCfg.credit.href ?? ""}
              onChange={(e) =>
                setSectionContent({
                  variants: {
                    "editorial-photo": {
                      ...variantCfg,
                      variant: "editorial-photo",
                      credit: { ...variantCfg.credit!, href: e.target.value || undefined },
                    },
                  },
                })
              }
            />
          </div>
        )}
      </div>
    );
  };

  const patchCtaEditorial = (patch: Partial<CtaEditorialConfig>) => {
    const cur = content.cta.editorial ?? {};
    setSectionContent({
      editorial: {
        ...cur,
        ...patch,
      },
    });
  };

  const renderCtaEditorialMediaEditor = () => {
    const ed = content.cta.editorial ?? {};
    const img: HeroImage = ed.image ?? {
      src: DEFAULT_CTA_EDITORIAL_IMAGE,
      alt: "Founder workspace showcase",
      focalPoint: "center center",
    };
    return (
      <div className="space-y-3">
        <MediaCoreEditor
          src={img.src || DEFAULT_CTA_EDITORIAL_IMAGE}
          darkSrc={img.darkSrc}
          alt={img.alt}
          caption={img.caption}
          presets={HERO_MEDIA_PRESETS}
          onImageChange={(patch) => patchCtaEditorial({ image: { ...img, ...patch } })}
          onCaptionChange={(caption) => patchCtaEditorial({ image: { ...img, caption } })}
          settings={appearance.media}
          onSettingsChange={(media) => setAppearance({ media })}
        />
        <Select
          label="Photo focal point"
          value={img.focalPoint ?? "center center"}
          onValueChange={(focalPoint) => patchCtaEditorial({ image: { ...img, focalPoint } })}
        >
          <SelectItem value="center center">Center</SelectItem>
          <SelectItem value="top center">Top Subject</SelectItem>
          <SelectItem value="50% 25%">Upper Frame (25%)</SelectItem>
          <SelectItem value="bottom center">Bottom Frame</SelectItem>
          <SelectItem value="left center">Left Subject</SelectItem>
          <SelectItem value="right center">Right Subject</SelectItem>
        </Select>
      </div>
    );
  };

  const renderCtaEditorialVideoEditor = () => {
    const ed = content.cta.editorial ?? {};
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <Input
            label="Play caption label"
            value={ed.videoCaptionLabel ?? "Product tour"}
            onChange={(e) => patchCtaEditorial({ videoCaptionLabel: e.target.value })}
          />
          <Input
            label="Play prompt CTA"
            value={ed.videoPromptLabel ?? "Watch 90s overview"}
            onChange={(e) => patchCtaEditorial({ videoPromptLabel: e.target.value })}
          />
        </div>
        <Input
          label="Video modal dialog title"
          value={ed.videoTitle ?? "See Hudbird in action"}
          onChange={(e) => patchCtaEditorial({ videoTitle: e.target.value })}
        />
        <VideoMediaWidget
          videoSrc={ed.videoUrl ?? DEFAULT_CTA_EDITORIAL_VIDEO}
          onVideoSrcChange={(videoUrl) => patchCtaEditorial({ videoUrl })}
          poster={
            ed.image ?? {
              src: DEFAULT_CTA_EDITORIAL_IMAGE,
              alt: "Video modal poster",
            }
          }
          presets={HERO_MEDIA_PRESETS}
          onPosterChange={(patch) =>
            patchCtaEditorial({
              image: {
                ...(ed.image ?? {
                  src: DEFAULT_CTA_EDITORIAL_IMAGE,
                  alt: "Video modal poster",
                }),
                ...patch,
              },
            })
          }
          onPosterCaptionChange={(caption) =>
            patchCtaEditorial({
              image: {
                ...(ed.image ?? {
                  src: DEFAULT_CTA_EDITORIAL_IMAGE,
                  alt: "Video modal poster",
                }),
                caption,
              },
            })
          }
          mediaSettings={appearance.media}
          onMediaSettingsChange={(media) => setAppearance({ media })}
          videoSettings={appearance.video}
          onVideoSettingsChange={(video) => setAppearance({ video })}
        />
      </div>
    );
  };

  const renderCtaEditorialSocialProofEditor = () => {
    const ed = content.cta.editorial ?? {};
    const avatars = ed.avatars?.length ? ed.avatars : DEFAULT_CTA_EDITORIAL_AVATARS;
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <Input
            label="Star rating badge"
            value={ed.rating ?? "4.9/5"}
            onChange={(e) => patchCtaEditorial({ rating: e.target.value })}
          />
          <Input
            label="Social proof summary"
            value={ed.ratingSummary ?? "Trusted by 400+ engineering & design teams"}
            onChange={(e) => patchCtaEditorial({ ratingSummary: e.target.value })}
          />
        </div>
        <div className="space-y-2 rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-3 dark:border-white/[0.08] dark:bg-white/[0.02]">
          <div className="flex items-center justify-between gap-2">
            <Text variant="small" className="font-medium text-zinc-700 dark:text-zinc-200">
              Customer avatars ({avatars.length})
            </Text>
            <Button
              type="button"
              size="sm"
              variant="outline"
              startContent={<Plus className="h-3 w-3" />}
              onClick={() =>
                patchCtaEditorial({
                  avatars: [...avatars, DEFAULT_CTA_EDITORIAL_AVATARS[0]],
                })
              }
            >
              Add avatar
            </Button>
          </div>
          <div className="space-y-2">
            {avatars.map((src, idx) => (
              <div
                key={idx}
                className="space-y-2 rounded-lg border border-zinc-200/70 bg-white/80 p-2 dark:border-white/10 dark:bg-black/20"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={src}
                      alt={`Avatar ${idx + 1}`}
                      className="h-7 w-7 rounded-full object-cover ring-1 ring-zinc-300 dark:ring-white/20"
                    />
                    <span className="text-[11px] font-medium text-zinc-700 dark:text-zinc-200">
                      Customer #{idx + 1}
                    </span>
                  </div>
                  <button
                    type="button"
                    disabled={avatars.length <= 1}
                    aria-label={`Remove avatar ${idx + 1}`}
                    onClick={() =>
                      patchCtaEditorial({
                        avatars: avatars.filter((_, i) => i !== idx),
                      })
                    }
                    className="rounded p-1 text-zinc-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-30 dark:hover:bg-red-950/30 dark:hover:text-red-400"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                <MediaUploadField
                  label={`Upload / URL #${idx + 1}`}
                  src={src}
                  presets={HERO_MEDIA_PRESETS}
                  onChange={(p) => {
                    if (p.src !== undefined) {
                      patchCtaEditorial({
                        avatars: avatars.map((cur, i) => (i === idx ? p.src! : cur)),
                      });
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderPrimaryButtonEditor = () => {
    if (sectionType === "hero") {
      return (
        <ButtonCoreEditor
          title="Primary Button"
          labelValue={content.hero.content.primaryAction.label}
          onLabelChange={(label) => setSectionContent({ content: { primaryAction: { label } } })}
          targetValue={
            page.sectionLinks?.hero?.primaryAction ??
            (project.primaryActionPageId
              ? { kind: "page", pageId: project.primaryActionPageId }
              : { kind: "section", section: "features" })
          }
          project={project}
          onTargetChange={(target) => {
            const resolvedHref = resolveLinkTarget(project, target).href;
            updateCurrentPage((p) => ({
              ...p,
              sectionLinks: {
                ...p.sectionLinks,
                hero: { ...p.sectionLinks?.hero, primaryAction: target },
              },
            }));
            setSectionContent({
              content: {
                primaryAction: {
                  ...content.hero.content.primaryAction,
                  href: resolvedHref,
                },
              },
            });
          }}
          onJumpToPage={onSelectPage}
          settings={appearance.button}
          onSettingsChange={(button) => setAppearance({ button })}
        />
      );
    }

    if (sectionType === "cta") {
      return (
        <ButtonCoreEditor
          title="Action Button"
          labelValue={content.cta.action.label}
          onLabelChange={(label) => setSectionContent({ action: { ...content.cta.action, label } })}
          targetValue={
            page.sectionLinks?.cta?.primaryAction ?? { kind: "section", section: "pricing" }
          }
          project={project}
          onTargetChange={(target) => {
            const resolvedHref = resolveLinkTarget(project, target).href;
            updateCurrentPage((p) => ({
              ...p,
              sectionLinks: {
                ...p.sectionLinks,
                cta: { ...p.sectionLinks?.cta, primaryAction: target },
              },
            }));
            setSectionContent({ action: { ...content.cta.action, href: resolvedHref } });
          }}
          onJumpToPage={onSelectPage}
          settings={appearance.button}
          onSettingsChange={(button) => setAppearance({ button })}
        />
      );
    }

    if (sectionType === "navbar") {
      return (
        <ButtonCoreEditor
          title="Navbar Action Button"
          labelValue={
            (isCustomNav ? customNavData?.actionLabel : shared.navbar?.actionLabel) ??
            content.navbar.action.label
          }
          onLabelChange={(actionLabel) => updateSharedNavbar({ actionLabel })}
          targetValue={
            (isCustomNav && customNavData && "actionTarget" in customNavData
              ? customNavData.actionTarget
              : shared.navbar?.actionTarget) ??
            (project.primaryActionPageId
              ? { kind: "page", pageId: project.primaryActionPageId }
              : undefined)
          }
          project={project}
          onTargetChange={(actionTarget) => updateSharedNavbar({ actionTarget })}
          onClearTarget={() => updateSharedNavbar({ actionTarget: null })}
          onJumpToPage={onSelectPage}
          settings={undefined}
          onSettingsChange={() => undefined}
        />
      );
    }

    return null;
  };

  const renderSecondaryButtonEditor = () => {
    if (sectionType === "cta" && currentSection?.variant === "editorial-showcase") {
      return renderCtaEditorialVideoEditor();
    }
    if (sectionType !== "hero") return null;
    return (
      <ButtonCoreEditor
        title="Secondary Button"
        labelValue={content.hero.content.secondaryAction?.label ?? ""}
        onLabelChange={(label) =>
          setSectionContent({
            content: {
              secondaryAction: {
                label,
                href: content.hero.content.secondaryAction?.href ?? "#how-it-works",
              },
            },
          })
        }
        targetValue={
          page.sectionLinks?.hero?.secondaryAction ?? {
            kind: "section",
            section: "how-it-works",
          }
        }
        project={project}
        onTargetChange={(target) => {
          const resolvedHref = resolveLinkTarget(project, target).href;
          updateCurrentPage((p) => ({
            ...p,
            sectionLinks: {
              ...p.sectionLinks,
              hero: { ...p.sectionLinks?.hero, secondaryAction: target },
            },
          }));
          setSectionContent({
            content: {
              secondaryAction: {
                label: content.hero.content.secondaryAction?.label ?? "Learn more",
                href: resolvedHref,
              },
            },
          });
        }}
        onClearTarget={() => {
          updateCurrentPage((p) => ({
            ...p,
            sectionLinks: {
              ...p.sectionLinks,
              hero: { ...p.sectionLinks?.hero, secondaryAction: undefined },
            },
          }));
          setSectionContent({
            content: { secondaryAction: { label: "", href: "" } },
          });
        }}
        onJumpToPage={onSelectPage}
        settings={appearance.secondaryButton}
        onSettingsChange={(secondaryButton) => setAppearance({ secondaryButton })}
      />
    );
  };

  const renderTypographyEditor = (
    includeCopy: boolean,
    focusField: "both" | "heading" | "text" = "both"
  ) => {
    if (sectionType === "navbar" || sectionType === "footer") return null;
    const headingText =
      sectionType === "hero"
        ? content.hero.content.title
        : sectionType === "cta"
          ? content.cta.title
          : ((content[sectionType as keyof typeof content] as { title?: string }).title ?? "");
    const descriptionText =
      sectionType === "hero"
        ? content.hero.content.description
        : sectionType === "cta"
          ? content.cta.description
          : ((content[sectionType as keyof typeof content] as { description?: string })
              .description ?? "");

    return (
      <TypographyCoreEditor
        headingText={includeCopy ? headingText : undefined}
        onHeadingTextChange={
          includeCopy
            ? (val) =>
                sectionType === "hero"
                  ? setSectionContent({ content: { title: val } })
                  : setSectionContent({ title: val })
            : undefined
        }
        descriptionText={includeCopy ? descriptionText : undefined}
        onDescriptionTextChange={
          includeCopy
            ? (val) =>
                sectionType === "hero"
                  ? setSectionContent({ content: { description: val } })
                  : setSectionContent({ description: val })
            : undefined
        }
        headingSettings={appearance.heading}
        onHeadingSettingsChange={(heading) => setAppearance({ heading })}
        textSettings={appearance.text}
        onTextSettingsChange={(text) => setAppearance({ text })}
        focusField={focusField}
      />
    );
  };

  const renderCardBadgeEditor = (overrides?: {
    showCard?: boolean;
    showBadge?: boolean;
    showAnchor?: boolean;
  }) => {
    if (sectionType === "navbar") return null;
    const hasBadgeCap = scannedProfile.capabilities.has("badge");
    const hasCardCap = scannedProfile.capabilities.has("card-surface");
    return (
      <CardBadgeCoreEditor
        anchorId={appearance.anchorId}
        defaultAnchorId={sectionType === "logos" ? "logo-cloud" : sectionType}
        onAnchorIdChange={(anchorId) => setAppearance({ anchorId })}
        badgeText={
          sectionType === "hero" ? (content.hero.content.eyebrow ?? "") : (appearance.badge ?? "")
        }
        onBadgeTextChange={
          !hasBadgeCap || sectionType === "footer"
            ? undefined
            : (next) =>
                sectionType === "hero"
                  ? setSectionContent({ content: { eyebrow: next } })
                  : setAppearance({ badge: next })
        }
        badgeSettings={appearance.badgeStyle}
        onBadgeSettingsChange={(badgeStyle) => setAppearance({ badgeStyle })}
        cardSettings={appearance.card}
        onCardSettingsChange={(card) => setAppearance({ card })}
        showCard={
          overrides?.showCard ?? (hasCardCap && !["hero", "footer", "logos"].includes(sectionType))
        }
        showBadge={overrides?.showBadge ?? hasBadgeCap}
        showAnchor={overrides?.showAnchor ?? true}
      />
    );
  };

  const renderItemsEditor = () => {
    switch (sectionType) {
      case "logos":
        return (
          <LogosCrudEditor
            items={content.logos.items}
            logoAssets={content.logos.logoAssets}
            presets={HERO_MEDIA_PRESETS}
            onChange={(items) => setSectionContent({ items })}
            onLogoAssetsChange={(logoAssets) => setSectionContent({ logoAssets })}
          />
        );
      case "benefits":
        return (
          <BenefitsCrudEditor
            items={content.benefits.items}
            image={content.benefits.image}
            impactQuotes={content.benefits.impactQuotes}
            presets={HERO_MEDIA_PRESETS}
            onItemsChange={(items) => setSectionContent({ items })}
            onImageChange={(image) => setSectionContent({ image })}
            onImpactQuotesChange={(impactQuotes) => setSectionContent({ impactQuotes })}
          />
        );
      case "features":
      case "how-it-works":
        return (
          <FeatureItemsCrudEditor
            label={sectionType === "features" ? "Feature items" : "Workflow steps"}
            items={(content[sectionType] as { items: LandingFeature[] }).items}
            presets={HERO_MEDIA_PRESETS}
            showSubSteps={sectionType === "how-it-works"}
            onChange={(items) => setSectionContent({ items })}
          />
        );
      case "integrations":
        return (
          <IntegrationsCrudEditor
            items={content.integrations.items}
            onChange={(items) => setSectionContent({ items })}
          />
        );
      case "testimonials":
        return (
          <TestimonialsCrudEditor
            items={content.testimonials.items}
            presets={HERO_MEDIA_PRESETS}
            metrics={content.testimonials.metrics}
            onMetricsChange={(metrics) => setSectionContent({ metrics })}
            featuredAction={content.testimonials.featuredAction}
            onFeaturedActionChange={(featuredAction) => setSectionContent({ featuredAction })}
            project={project}
            onChange={(items) => setSectionContent({ items })}
          />
        );
      case "pricing":
        return (
          <PricingPlansCrudEditor
            project={project}
            plans={content.pricing.plans}
            onChange={(plans) => setSectionContent({ plans })}
            onJumpToPage={onSelectPage}
          />
        );
      case "faq":
        return (
          <FaqCrudEditor
            items={content.faq.items}
            onChange={(items) => setSectionContent({ items })}
          />
        );
      case "cta":
        if (currentSection?.variant === "editorial-showcase") {
          return renderCtaEditorialSocialProofEditor();
        }
        if (currentSection?.variant === "split" || currentSection?.variant === "banner") {
          return (
            <Textarea
              label="Included benefits checklist (one per line)"
              rows={4}
              value={(content.cta.benefits ?? []).join("\n")}
              onChange={(e) =>
                setSectionContent({
                  benefits: e.target.value
                    .split("\n")
                    .map((line) => line.trim())
                    .filter(Boolean),
                })
              }
            />
          );
        }
        return null;
      case "footer":
        return (
          <FooterContactStatusCrud
            project={project}
            footer={effectiveFooterData}
            onChange={(patch) => updateFooterData(patch)}
            onJumpToPage={onSelectPage}
          />
        );
      default:
        return null;
    }
  };

  const renderGridEditor = () => {
    if (
      !GRID_CAPABLE_SECTIONS.has(sectionType) &&
      !scannedProfile.capabilities.has("grid-layout")
    ) {
      return null;
    }
    if (!scannedProfile.capabilities.has("grid-layout")) return null;
    return (
      <GridCoreEditor
        settings={appearance.grid}
        onChange={(grid) => setAppearance({ grid })}
        showGridOverlay={showGridOverlay}
        onToggleGridOverlay={onToggleGridOverlay}
      />
    );
  };

  const renderBrandLogoEditor = () => {
    const brandNameVal = isCustomNav
      ? (customNavData?.brandName ?? project.brand.name)
      : project.brand.name;
    return (
      <div className="space-y-4">
        <Input
          label="Brand Name"
          value={brandNameVal}
          onChange={(e) => {
            if (isCustomNav) {
              updateSharedNavbar({ brandName: e.target.value });
            } else {
              onChange((prev) => ({
                ...prev,
                brand: { ...prev.brand, name: e.target.value },
              }));
            }
          }}
        />
        <MediaUploadField
          label="Brand Logo (Light & Dark themes)"
          src={project.brand.logo?.src ?? ""}
          darkSrc={project.brand.logo?.darkSrc}
          alt={project.brand.logo?.alt ?? project.brand.name}
          showAlt
          onChange={(patch) =>
            onChange((prev) => ({
              ...prev,
              brand: {
                ...prev.brand,
                logo: {
                  alt: prev.brand.logo?.alt ?? prev.brand.name,
                  src: prev.brand.logo?.src ?? "",
                  ...(prev.brand.logo ?? {}),
                  ...patch,
                },
              },
            }))
          }
          onClear={() =>
            onChange((prev) => ({
              ...prev,
              brand: { ...prev.brand, logo: undefined },
            }))
          }
        />
      </div>
    );
  };

  const renderNavbarLinksGroup = () => (
    <InspectorGroup
      title="Links"
      action={
        <Button
          size="sm"
          variant="plain"
          startContent={<Plus size={13} />}
          onClick={() => {
            const fallbackPage =
              project.pages.find(
                (p) => !navItems.some((n) => n.target.kind === "page" && n.target.pageId === p.id)
              ) ?? project.pages[0];
            updateSharedNavbar({
              items: [
                ...navItems,
                {
                  id: `nav-${Date.now().toString(36)}`,
                  label: fallbackPage.name,
                  description: `Go to ${fallbackPage.name}`,
                  target: { kind: "page", pageId: fallbackPage.id },
                },
              ],
            });
          }}
        >
          Add item
        </Button>
      }
    >
      <LinkTargetPicker
        label="Primary button destination"
        value={
          (isCustomNav && customNavData && "actionTarget" in customNavData
            ? customNavData.actionTarget
            : shared.navbar?.actionTarget) ??
          (project.primaryActionPageId
            ? { kind: "page", pageId: project.primaryActionPageId }
            : undefined)
        }
        project={project}
        onChange={(actionTarget) => updateSharedNavbar({ actionTarget })}
        onClear={() => updateSharedNavbar({ actionTarget: null })}
        onJumpToPage={onSelectPage}
      />

      <div className="divide-y divide-zinc-200 pt-2 dark:divide-white/10">
        {navItems.map((item, idx) => (
          <div key={item.id} className="space-y-3 py-4 first:pt-2 last:pb-0">
            <div className="flex items-center gap-1.5">
              <Input
                aria-label="Nav item label"
                value={item.label}
                onChange={(e) =>
                  updateSharedNavbar({
                    items: navItems.map((n, i) =>
                      i === idx ? { ...n, label: e.target.value } : n
                    ),
                  })
                }
              />
              <button
                type="button"
                disabled={idx === 0}
                aria-label="Move nav item up"
                onClick={() => {
                  const next = [...navItems];
                  [next[idx], next[idx - 1]] = [next[idx - 1], next[idx]];
                  updateSharedNavbar({ items: next });
                }}
                className="rounded p-1.5 text-zinc-400 hover:text-zinc-900 disabled:opacity-25 dark:hover:text-white"
              >
                <ArrowUp className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                disabled={idx === navItems.length - 1}
                aria-label="Move nav item down"
                onClick={() => {
                  const next = [...navItems];
                  [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
                  updateSharedNavbar({ items: next });
                }}
                className="rounded p-1.5 text-zinc-400 hover:text-zinc-900 disabled:opacity-25 dark:hover:text-white"
              >
                <ArrowDown className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                aria-label={`Remove ${item.label}`}
                onClick={() =>
                  updateSharedNavbar({
                    items: navItems.filter((_, i) => i !== idx),
                  })
                }
                className="rounded p-1.5 text-zinc-400 hover:bg-red-500/10 hover:text-red-500"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
            <LinkTargetPicker
              value={item.target}
              project={project}
              onChange={(target) =>
                updateSharedNavbar({
                  items: navItems.map((n, i) => (i === idx ? { ...n, target } : n)),
                })
              }
              onJumpToPage={onSelectPage}
            />
          </div>
        ))}
      </div>
    </InspectorGroup>
  );

  const renderFooterLinksGroup = () => (
    <InspectorGroup title="Links">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
            Footer Columns
          </span>
        </div>
        <div className="divide-y divide-zinc-200 dark:divide-white/10">
          {resolveFooterGroups().map((group, gIdx, allGroups) => {
            const isOpen = openFooterGroupIdx === gIdx;
            return (
              <div key={`${group.title}-${gIdx}`} className="py-2.5">
                <button
                  type="button"
                  onClick={() => setOpenFooterGroupIdx(isOpen ? null : gIdx)}
                  className="flex w-full items-center justify-between py-1 text-left text-xs font-medium text-zinc-900 dark:text-zinc-100"
                >
                  <span>
                    {group.title} ({group.links.length})
                  </span>
                  {isOpen ? (
                    <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
                  ) : (
                    <ChevronRight className="h-3.5 w-3.5 text-zinc-400" />
                  )}
                </button>
                {isOpen && (
                  <div className="space-y-4 pt-3">
                    <Input
                      label="Column title"
                      value={group.title}
                      onChange={(e) =>
                        saveFooterGroups(
                          allGroups.map((g, i) =>
                            i === gIdx ? { ...g, title: e.target.value } : g
                          )
                        )
                      }
                    />
                    <div className="divide-y divide-zinc-200/80 dark:divide-white/10">
                      {group.links.map((link, lIdx) => (
                        <div key={`${link.label}-${lIdx}`} className="space-y-3 py-3 first:pt-0">
                          <div className="flex items-center gap-2">
                            <Input
                              aria-label="Footer link label"
                              value={link.label}
                              onChange={(e) =>
                                saveFooterGroups(
                                  allGroups.map((g, gi) =>
                                    gi === gIdx
                                      ? {
                                          ...g,
                                          links: g.links.map((it, li) =>
                                            li === lIdx ? { ...it, label: e.target.value } : it
                                          ),
                                        }
                                      : g
                                  )
                                )
                              }
                            />
                            <button
                              type="button"
                              aria-label={`Remove ${link.label}`}
                              onClick={() =>
                                saveFooterGroups(
                                  allGroups.map((g, gi) =>
                                    gi === gIdx
                                      ? {
                                          ...g,
                                          links: g.links.filter((_, li) => li !== lIdx),
                                        }
                                      : g
                                  )
                                )
                              }
                              className="rounded p-1.5 text-zinc-400 hover:bg-red-500/10 hover:text-red-500"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <LinkTargetPicker
                            value={link.target}
                            project={project}
                            onChange={(target) =>
                              saveFooterGroups(
                                allGroups.map((g, gi) =>
                                  gi === gIdx
                                    ? {
                                        ...g,
                                        links: g.links.map((it, li) =>
                                          li === lIdx ? { ...it, target } : it
                                        ),
                                      }
                                    : g
                                )
                              )
                            }
                            onJumpToPage={onSelectPage}
                          />
                        </div>
                      ))}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      startContent={<Plus size={13} />}
                      onClick={() => {
                        const home = project.pages.find((p) => p.path === "/") ?? project.pages[0];
                        saveFooterGroups(
                          allGroups.map((g, gi) =>
                            gi === gIdx
                              ? {
                                  ...g,
                                  links: [
                                    ...g.links,
                                    {
                                      label: home.name,
                                      target: { kind: "page", pageId: home.id },
                                    },
                                  ],
                                }
                              : g
                          )
                        );
                      }}
                    >
                      Add link to {group.title}
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-3 border-t border-zinc-200 pt-4 dark:border-white/10">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
            Bottom Legal Links
          </span>
          <Button
            size="sm"
            variant="plain"
            startContent={<Plus size={13} />}
            onClick={() => {
              const legalPage =
                project.pages.find((p) => p.template === "legal") ?? project.pages[0];
              const currentLegal = effectiveFooterData.legalLinks ?? [];
              updateFooterData({
                legalLinks: [
                  ...currentLegal,
                  {
                    label: "Privacy Policy",
                    target: { kind: "page", pageId: legalPage.id },
                  },
                ],
              });
            }}
          >
            Add legal link
          </Button>
        </div>
        <div className="divide-y divide-zinc-200 dark:divide-white/10">
          {(effectiveFooterData.legalLinks ?? []).map((l, idx, arr) => (
            <div key={`${l.label}-${idx}`} className="space-y-3 py-3 first:pt-0">
              <div className="flex items-center gap-2">
                <Input
                  aria-label="Legal link label"
                  value={l.label}
                  onChange={(e) =>
                    updateFooterData({
                      legalLinks: arr.map((item, i) =>
                        i === idx ? { ...item, label: e.target.value } : item
                      ),
                    })
                  }
                />
                <button
                  type="button"
                  aria-label={`Remove ${l.label}`}
                  onClick={() =>
                    updateFooterData({
                      legalLinks: arr.filter((_, i) => i !== idx),
                    })
                  }
                  className="rounded p-1.5 text-zinc-400 hover:bg-red-500/10 hover:text-red-500"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <LinkTargetPicker
                value={l.target}
                project={project}
                onChange={(target) =>
                  updateFooterData({
                    legalLinks: arr.map((item, i) => (i === idx ? { ...item, target } : item)),
                  })
                }
                onJumpToPage={onSelectPage}
              />
            </div>
          ))}
        </div>
        {!(effectiveFooterData.legalLinks ?? []).length && (
          <Text variant="small" className="text-zinc-500 dark:text-zinc-400">
            Auto-linked legal routes are active whenever a Legal page exists.
          </Text>
        )}
      </div>
    </InspectorGroup>
  );

  const renderScannedIconPicker = () => {
    if (!scannedProfile.capabilities.has("icon-picker")) return null;
    if (
      sectionType !== "benefits" &&
      sectionType !== "features" &&
      sectionType !== "how-it-works" &&
      sectionType !== "integrations"
    ) {
      return null;
    }
    const sectionItems = (content[sectionType]?.items ?? []) as LandingItem[];
    if (sectionItems.length === 0) return null;
    const targetIdx =
      selectedItemIndex !== null &&
      selectedItemIndex >= 0 &&
      selectedItemIndex < sectionItems.length
        ? selectedItemIndex
        : 0;
    const activeItem = sectionItems[targetIdx];
    return (
      <IconBrandPickerWidget
        selectedIcon={activeItem?.icon}
        targetLabel={`Item #${targetIdx + 1} Icon (${activeItem?.title || "Card"})`}
        onSelectIcon={(iconId) => {
          const nextItems = sectionItems.map((it, idx) =>
            idx === targetIdx ? { ...it, icon: iconId } : it
          );
          setSectionContent({ items: nextItems });
        }}
      />
    );
  };

  if (!widgetPlan.useCategoryFilteredDrawer) {
    const canDelegateLanding =
      widgetPlan.targetKind === "landing" || sectionType === "navbar" || sectionType === "footer";
    const renderDelegatedMedia = () => {
      if (!canDelegateLanding) return null;
      if (scannedProfile.manifest?.visual.kind === "code-illustration") {
        return (
          <CodeIllustrationWidget
            settings={appearance.illustration}
            onChange={(illustration) => setAppearance({ illustration })}
            presets={scannedProfile.manifest.visual.presets ?? []}
            mediaPresets={HERO_MEDIA_PRESETS}
            illustrationLabel={`${scannedProfile.title} Visual`}
          />
        );
      }
      if (sectionType === "benefits") {
        return (
          <MediaCoreEditor
            src={content.benefits.image.src}
            darkSrc={content.benefits.image.darkSrc}
            alt={content.benefits.image.alt}
            caption={content.benefits.image.caption}
            presets={HERO_MEDIA_PRESETS}
            onImageChange={(patch) =>
              setSectionContent({ image: { ...content.benefits.image, ...patch } })
            }
            onCaptionChange={(caption) =>
              setSectionContent({ image: { ...content.benefits.image, caption } })
            }
            settings={appearance.media}
            onSettingsChange={(media) => setAppearance({ media })}
          />
        );
      }
      if (sectionType === "cta" && currentSection?.variant === "editorial-showcase") {
        return renderCtaEditorialMediaEditor();
      }
      if (["features", "how-it-works", "testimonials", "logos"].includes(sectionType)) {
        return renderItemsEditor();
      }
      return renderHeroVariantMedia();
    };

    return (
      <UniversalWidgetRenderer
        plan={widgetPlan}
        project={project}
        page={page}
        displayMode={displayMode}
        onChange={onChange}
        onSelectNode={(node) => (onSelectNode ? onSelectNode(node) : onBack())}
        onSelectPage={onSelectPage}
        onClosePopover={onClosePopover}
        mediaPresets={HERO_MEDIA_PRESETS}
        appearance={appearance}
        onAppearanceChange={setAppearance}
        showGridOverlay={showGridOverlay}
        onToggleGridOverlay={onToggleGridOverlay}
        modularSpec={modularSpec}
        renderLegacyPrimaryButton={
          canDelegateLanding ? () => renderPrimaryButtonEditor() : undefined
        }
        renderLegacySecondaryButton={
          canDelegateLanding ? () => renderSecondaryButtonEditor() : undefined
        }
        renderLegacyMedia={canDelegateLanding ? renderDelegatedMedia : undefined}
        renderLegacyBadge={
          canDelegateLanding
            ? () =>
                renderCardBadgeEditor({
                  showCard: false,
                  showAnchor: false,
                  showBadge: true,
                })
            : undefined
        }
        renderLegacyItems={canDelegateLanding ? () => renderItemsEditor() : undefined}
        renderLegacyTypographyText={
          canDelegateLanding && sectionType !== "navbar" && sectionType !== "footer"
            ? () =>
                renderTypographyEditor(
                  true,
                  widgetPlan.selectedNode === "heading" ? "heading" : "text"
                )
            : undefined
        }
        renderHeroRemitStats={sectionType === "hero" ? () => renderHeroVariantMedia() : undefined}
        renderSectionLinks={
          sectionType === "navbar"
            ? renderNavbarLinksGroup
            : sectionType === "footer"
              ? renderFooterLinksGroup
              : undefined
        }
        renderSectionBrand={canDelegateLanding ? renderBrandLogoEditor : undefined}
      />
    );
  }

  if (!currentSection) return null;

  const isPopover = displayMode === "popover";

  return (
    <SelectedItemIndexProvider selectedItemIndex={selectedItemIndex}>
      <div className={isPopover ? "space-y-4 pb-1" : "space-y-6 pb-8"}>
        {isPopover ? (
          <div className="flex items-center justify-between gap-2 border-b border-zinc-200/80 pb-2.5 dark:border-white/[0.08]">
            <div className="flex min-w-0 items-center gap-2">
              <span className="truncate text-xs font-semibold text-zinc-900 dark:text-white">
                {definition?.title ?? sectionType} Section
              </span>
              <span className="rounded-md bg-zinc-100 px-1.5 py-0.5 font-mono text-[10px] font-medium text-zinc-600 dark:bg-white/[0.08] dark:text-zinc-300">
                {currentSection.variant}
              </span>
            </div>
            {onClosePopover && (
              <button
                type="button"
                onClick={onClosePopover}
                aria-label="Close section widget"
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-white/[0.08] dark:hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        ) : (
          <InspectorHeader
            title={definition?.title ?? sectionType}
            subtitle="Double-click text on canvas to edit inline, or adjust below."
            onBack={onBack}
            showBack={showHeaderBackButton}
          />
        )}

        <SectionScannerHeader
          profile={scannedProfile}
          activeCategory={scannerCategory}
          onSelectCategory={setScannerCategory}
        />

        {(sectionType === "navbar" || sectionType === "footer") &&
          (scannerCategory === "all" || scannerCategory === "data-advanced") &&
          renderSharedScopeGroup(sectionType)}

        {/* 1. CONTENT GROUP */}
        <InspectorGroup
          title="Content"
          action={
            <Switch
              size="sm"
              aria-label={`Toggle ${definition?.title ?? sectionType} visibility`}
              checked={currentSection.enabled}
              onChange={(e) =>
                updateSectionSelection(
                  (s) => ({ ...s, enabled: e.target.checked }) as LandingSectionSelection
                )
              }
            />
          }
        >
          {sectionType === "hero" && (
            <>
              {(scannedProfile.manifest?.capabilities.hasEyebrow ??
                scannedProfile.capabilities.has("badge")) && (
                <Input
                  label="Eyebrow Label"
                  placeholder="New release"
                  value={content.hero.content.eyebrow ?? ""}
                  onChange={(e) => setSectionContent({ content: { eyebrow: e.target.value } })}
                />
              )}
              <Input
                label="Headline (*word* = italic accent)"
                value={content.hero.content.title}
                onChange={(e) => setSectionContent({ content: { title: e.target.value } })}
              />
              <Textarea
                label="Description"
                rows={3}
                value={content.hero.content.description}
                onChange={(e) => setSectionContent({ content: { description: e.target.value } })}
              />
              <div className="pt-1">{renderHeroVariantMedia()}</div>
            </>
          )}

          {sectionType === "navbar" && (
            <>
              {renderBrandLogoEditor()}
              <Input
                label="Primary Button Label"
                value={
                  (isCustomNav ? customNavData?.actionLabel : shared.navbar?.actionLabel) ??
                  content.navbar.action.label
                }
                onChange={(e) => updateSharedNavbar({ actionLabel: e.target.value })}
              />
            </>
          )}

          {sectionType === "footer" && (
            <>
              {renderBrandLogoEditor()}
              <Textarea
                label="Brand Tagline"
                rows={2}
                value={effectiveFooterData.description ?? content.footer.description}
                onChange={(e) => updateFooterData({ description: e.target.value })}
              />
              <Input
                label="Copyright Note"
                value={effectiveFooterData.note ?? content.footer.note}
                onChange={(e) => updateFooterData({ note: e.target.value })}
              />
              <div className="pt-2">{renderItemsEditor()}</div>
            </>
          )}

          {sectionType === "cta" && (
            <>
              {scannedProfile.capabilities.has("badge") && (
                <Input
                  label="Eyebrow Label"
                  value={appearance.badge ?? "Get started"}
                  onChange={(e) => setAppearance({ badge: e.target.value })}
                />
              )}
              <Input
                label="Heading"
                value={content.cta.title}
                onChange={(e) => setSectionContent({ title: e.target.value })}
              />
              <Textarea
                label="Description"
                rows={2}
                value={content.cta.description}
                onChange={(e) => setSectionContent({ description: e.target.value })}
              />
              {(currentSection.variant === "split" || currentSection.variant === "banner") && (
                <div className="pt-1">{renderItemsEditor()}</div>
              )}
            </>
          )}

          {!["hero", "navbar", "footer", "cta"].includes(sectionType) && (
            <>
              {(scannedProfile.manifest?.capabilities.hasEyebrow ??
                scannedProfile.capabilities.has("badge")) && (
                <Input
                  label="Eyebrow Label (optional)"
                  placeholder="Add eyebrow text..."
                  value={appearance.badge ?? ""}
                  onChange={(e) => setAppearance({ badge: e.target.value })}
                />
              )}
              {(scannedProfile.manifest?.capabilities.hasHeading ?? true) && (
                <Input
                  label="Heading"
                  value={
                    (content[sectionType as keyof typeof content] as { title?: string }).title ?? ""
                  }
                  onChange={(e) => setSectionContent({ title: e.target.value })}
                />
              )}
              {(scannedProfile.manifest?.capabilities.hasDescription ?? true) && (
                <Textarea
                  label="Description"
                  rows={2}
                  value={
                    (content[sectionType as keyof typeof content] as { description?: string })
                      .description ?? ""
                  }
                  onChange={(e) => setSectionContent({ description: e.target.value })}
                />
              )}
              {scannedProfile.manifest?.visual.kind === "code-illustration" && (
                <div className="pt-1">
                  <CodeIllustrationWidget
                    settings={appearance.illustration}
                    onChange={(illustration) => setAppearance({ illustration })}
                    presets={scannedProfile.manifest.visual.presets ?? []}
                    mediaPresets={HERO_MEDIA_PRESETS}
                    illustrationLabel={`${scannedProfile.title} Visual`}
                  />
                </div>
              )}
              <div className="pt-1">{renderItemsEditor()}</div>
            </>
          )}

          {page.contentOverrides?.[sectionType] && (
            <Button
              size="sm"
              variant="plain"
              startContent={<RotateCcw size={13} />}
              onClick={() =>
                updateCurrentPage((p) => {
                  const nextOverrides = { ...(p.contentOverrides ?? {}) };
                  delete nextOverrides[sectionType];
                  return { ...p, contentOverrides: nextOverrides };
                })
              }
            >
              Reset text overrides
            </Button>
          )}
        </InspectorGroup>

        {/* Variant-scanned Editorial Showcase widgets for CTA */}
        {sectionType === "cta" && currentSection.variant === "editorial-showcase" && (
          <>
            {shouldRenderWidgetGroup(scannedProfile, scannerCategory, "media-color", [
              "single-image",
            ]) && (
              <InspectorGroup title="Lifestyle Photo Card">
                {renderCtaEditorialMediaEditor()}
              </InspectorGroup>
            )}
            {shouldRenderWidgetGroup(scannedProfile, scannerCategory, "media-color", [
              "video-media",
            ]) && (
              <InspectorGroup title="Video Trigger & Stream">
                {renderCtaEditorialVideoEditor()}
              </InspectorGroup>
            )}
            {shouldRenderWidgetGroup(scannedProfile, scannerCategory, "data-advanced", [
              "collection-items",
            ]) && (
              <InspectorGroup title="Social Proof & Avatars">
                {renderCtaEditorialSocialProofEditor()}
              </InspectorGroup>
            )}
          </>
        )}

        {/* 2. LINKS GROUP (Navbar, Hero, CTA, Pricing, Footer) */}
        {(scannerCategory === "all" || scannerCategory === "type-actions") && (
          <>
            {sectionType === "navbar" && renderNavbarLinksGroup()}

            {sectionType === "hero" && (
              <InspectorGroup title="Buttons & Links">
                {renderPrimaryButtonEditor()}
                {scannedProfile.capabilities.has("secondary-button") && (
                  <div className="border-t border-zinc-200/80 pt-4 dark:border-white/10">
                    {renderSecondaryButtonEditor()}
                  </div>
                )}
              </InspectorGroup>
            )}

            {sectionType === "cta" && (
              <InspectorGroup title="Button & Link">{renderPrimaryButtonEditor()}</InspectorGroup>
            )}

            {sectionType === "pricing" && (
              <InspectorGroup
                title="Bulk Plan Links"
                description="Set one destination across all pricing plan buttons."
              >
                <LinkTargetPicker
                  label="All plan buttons destination"
                  value={
                    content.pricing.plans[0]?.action.href.startsWith("/")
                      ? (() => {
                          const dest = project.pages.find(
                            (p) => p.path === content.pricing.plans[0]?.action.href
                          );
                          return dest
                            ? { kind: "page", pageId: dest.id }
                            : { kind: "external", href: content.pricing.plans[0]?.action.href };
                        })()
                      : undefined
                  }
                  project={project}
                  onChange={(target: WebsiteLinkTarget) => {
                    const destHref = resolveLinkTarget(project, target).href;
                    setSectionContent({
                      plans: content.pricing.plans.map((pl) => ({
                        ...pl,
                        action: { ...pl.action, href: destHref },
                      })),
                    });
                  }}
                  onJumpToPage={onSelectPage}
                />
              </InspectorGroup>
            )}

            {sectionType === "footer" && renderFooterLinksGroup()}
          </>
        )}

        {/* 3. SURFACE, GRID & SPACING GROUP */}
        {sectionType === "navbar" ? (
          <InspectorGroup title="Appearance">
            <Select
              label="Background Surface"
              value={
                (currentSection.customSettings as NavbarCustomSettings | undefined)?.surface ??
                "preset"
              }
              onValueChange={(surface) =>
                updateSectionSelection(
                  (s) =>
                    ({
                      ...s,
                      customSettings: {
                        ...(s.customSettings ?? {}),
                        surface: surface as NavbarCustomSettings["surface"],
                      },
                    }) as LandingSectionSelection
                )
              }
            >
              <SelectItem value="preset">Preset Default</SelectItem>
              <SelectItem value="solid">Solid Surface</SelectItem>
              <SelectItem value="glass">Translucent Glass</SelectItem>
              <SelectItem value="transparent">Transparent Overlay</SelectItem>
            </Select>
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Show CTA button
              </span>
              <Switch
                size="sm"
                checked={
                  (currentSection.customSettings as NavbarCustomSettings | undefined)?.showCta ??
                  true
                }
                onChange={(e) =>
                  updateSectionSelection(
                    (s) =>
                      ({
                        ...s,
                        customSettings: { ...(s.customSettings ?? {}), showCta: e.target.checked },
                      }) as LandingSectionSelection
                  )
                }
              />
            </div>
          </InspectorGroup>
        ) : (
          <>
            {shouldRenderWidgetGroup(scannedProfile, scannerCategory, "media-color", ["color"]) && (
              <InspectorGroup title="Section Color & Contrast">
                <SectionColorPickerWidget
                  settings={appearance.color}
                  onChange={(color) => setAppearance({ color })}
                  showScrim={sectionType === "hero"}
                />
              </InspectorGroup>
            )}
            {shouldRenderWidgetGroup(scannedProfile, scannerCategory, "type-actions", [
              "icon-picker",
            ]) &&
              renderScannedIconPicker() && (
                <InspectorGroup title="Icon & Brand Picker">
                  {renderScannedIconPicker()}
                </InspectorGroup>
              )}
            {shouldRenderWidgetGroup(scannedProfile, scannerCategory, "layout-motion", [
              "grid-layout",
            ]) &&
              renderGridEditor() && (
                <InspectorGroup title="Grid Layout">{renderGridEditor()}</InspectorGroup>
              )}
            {shouldRenderWidgetGroup(scannedProfile, scannerCategory, "type-actions", [
              "typography",
            ]) &&
              renderTypographyEditor(false) && (
                <InspectorGroup title="Typography">{renderTypographyEditor(false)}</InspectorGroup>
              )}
            {(scannerCategory === "all" ||
              (scannerCategory === "type-actions" && scannedProfile.capabilities.has("badge")) ||
              (scannerCategory === "layout-motion" &&
                scannedProfile.capabilities.has("card-surface")) ||
              scannerCategory === "data-advanced") &&
              renderCardBadgeEditor() && (
                <InspectorGroup
                  title={
                    scannedProfile.capabilities.has("card-surface") &&
                    scannedProfile.capabilities.has("badge")
                      ? "Card, Badge & Anchor"
                      : scannedProfile.capabilities.has("badge")
                        ? "Badge & Anchor"
                        : scannedProfile.capabilities.has("card-surface")
                          ? "Card & Anchor"
                          : "Anchor"
                  }
                >
                  {renderCardBadgeEditor()}
                </InspectorGroup>
              )}
            {shouldRenderWidgetGroup(scannedProfile, scannerCategory, "layout-motion", [
              "spacing-container",
            ]) && (
              <InspectorGroup title="Surface & Spacing">
                <Select
                  label="Surface"
                  value={appearance.surface ?? "default"}
                  onValueChange={(surface) =>
                    setAppearance({ surface: surface as SectionAppearanceSettings["surface"] })
                  }
                >
                  <SelectItem value="default">Default Base</SelectItem>
                  <SelectItem value="muted">Muted Surface</SelectItem>
                  <SelectItem value="accent-subtle">Accent Tint</SelectItem>
                  <SelectItem value="inverted">Inverted Contrast</SelectItem>
                </Select>
                <Select
                  label="Vertical Padding"
                  value={appearance.paddingY ?? "normal"}
                  onValueChange={(paddingY) =>
                    setAppearance({ paddingY: paddingY as SectionAppearanceSettings["paddingY"] })
                  }
                >
                  <SelectItem value="compact">Compact</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="spacious">Spacious</SelectItem>
                </Select>
                <Select
                  label="Container Width"
                  value={appearance.containerWidth ?? "default"}
                  onValueChange={(containerWidth) =>
                    setAppearance({
                      containerWidth: containerWidth as SectionAppearanceSettings["containerWidth"],
                    })
                  }
                >
                  <SelectItem value="default">Token Default</SelectItem>
                  <SelectItem value="narrow">Narrow (58rem)</SelectItem>
                  <SelectItem value="wide">Wide (92rem)</SelectItem>
                </Select>
                <Select
                  label="Header Alignment"
                  value={appearance.align ?? "left"}
                  onValueChange={(align) =>
                    setAppearance({ align: align as SectionAppearanceSettings["align"] })
                  }
                >
                  <SelectItem value="left">Preset Default</SelectItem>
                  <SelectItem value="center">Centered</SelectItem>
                </Select>
              </InspectorGroup>
            )}
            {shouldRenderWidgetGroup(scannedProfile, scannerCategory, "layout-motion", [
              "motion-reveal",
            ]) && (
              <InspectorGroup title="Animation & Motion">
                <MotionRevealWidget
                  settings={appearance.motion}
                  onChange={(motion) => setAppearance({ motion })}
                  sectionType={sectionType}
                />
              </InspectorGroup>
            )}
            {shouldRenderWidgetGroup(scannedProfile, scannerCategory, "data-advanced", [
              "breakpoint-visibility",
            ]) && (
              <InspectorGroup title="Breakpoint Visibility">
                <VisibilityAnchorWidget
                  visibility={appearance.visibility}
                  onVisibilityChange={(visibility) => setAppearance({ visibility })}
                />
              </InspectorGroup>
            )}
          </>
        )}

        {/* Template Page Module Switches */}
        {page.template === "pricing" && (
          <InspectorGroup title="Page Modules">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Include Comparison Matrix
              </span>
              <Switch
                size="sm"
                checked={page.pricingCompareEnabled ?? true}
                onChange={(e) =>
                  updateCurrentPage((p) => togglePricingCompareSection(p, e.target.checked))
                }
              />
            </div>
          </InspectorGroup>
        )}

        {page.template === "about" && (
          <InspectorGroup title="About Page Modules">
            <div className="space-y-3">
              {getAboutPageSections(page).map((mod) => (
                <div key={mod.id} className="flex items-center justify-between">
                  <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    {mod.title}
                  </span>
                  <Switch
                    size="sm"
                    checked={mod.enabled}
                    onChange={(e) =>
                      updateCurrentPage((p) =>
                        toggleAboutPageSection(p, mod.id as AboutSectionId, e.target.checked)
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </InspectorGroup>
        )}

        {page.template === "contact" && (
          <InspectorGroup title="Contact Page Modules">
            <div className="space-y-3">
              {getContactPageSections(page).map((mod) => (
                <div key={mod.id} className="flex items-center justify-between">
                  <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    {mod.title}
                  </span>
                  <Switch
                    size="sm"
                    checked={mod.enabled}
                    onChange={(e) =>
                      updateCurrentPage((p) =>
                        toggleContactPageSection(p, mod.id as ContactSectionId, e.target.checked)
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </InspectorGroup>
        )}

        {page.template === "legal" && (
          <InspectorGroup title="Legal Page Modules">
            <div className="space-y-3">
              {getLegalPageSections(page).map((mod) => (
                <div key={mod.id} className="flex items-center justify-between">
                  <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    {mod.title}
                  </span>
                  <Switch
                    size="sm"
                    checked={mod.enabled}
                    onChange={(e) =>
                      updateCurrentPage((p) =>
                        toggleLegalPageSection(p, mod.id as LegalSectionId, e.target.checked)
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </InspectorGroup>
        )}

        {/* 4. LAYOUT PRESETS */}
        <InspectorGroup title="Layout Preset">
          <BlockVariantsInspector
            embedded
            sectionType={sectionType}
            currentVariant={currentSection.variant}
            isEnabled={currentSection.enabled}
            onSelectVariant={(variantId) => {
              onHoverVariant(null);
              updateSectionSelection(
                (s) => ({ ...s, variant: variantId, enabled: true }) as LandingSectionSelection
              );
            }}
            onHoverVariant={onHoverVariant}
            onToggleEnabled={(enabled) =>
              updateSectionSelection((s) => ({ ...s, enabled }) as LandingSectionSelection)
            }
            onBack={onBack}
          />
        </InspectorGroup>
      </div>
    </SelectedItemIndexProvider>
  );
}
