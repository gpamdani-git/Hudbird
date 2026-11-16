import { describe, expect, it } from "vitest";
import {
  addWebsitePage,
  createWebsiteStarterPack,
  landingSectionRegistry,
  readInlineContent,
  resolveVariantManifest,
  updateInlineContent,
} from "@hudbird/marketing";
import {
  analyzeEditPath,
  extractItemIndexFromPath,
  extractNumericIndicesFromPath,
  normalizeEngineTarget,
  resolveWidgetPlan,
} from "../apps/docs/src/components/builder/widgetEngine";
import { scanActiveSection } from "../apps/docs/src/components/builder/sectionScanner";
import type { SelectedCoreNode } from "../apps/docs/src/components/builder/CoreComponentEditors";

describe("widgetEngine", () => {
  it("normalizes chrome, special, modular, and landing targets accurately", () => {
    expect(normalizeEngineTarget("navbar", "home")).toEqual({
      normalizedTarget: "navbar",
      targetKind: "chrome",
    });
    expect(normalizeEngineTarget("footer", "about")).toEqual({
      normalizedTarget: "footer",
      targetKind: "chrome",
    });
    expect(normalizeEngineTarget("announcement", "pricing")).toEqual({
      normalizedTarget: "announcement",
      targetKind: "chrome",
    });
    expect(normalizeEngineTarget("notFound", "not-found")).toEqual({
      normalizedTarget: "not-found",
      targetKind: "special",
    });
    expect(normalizeEngineTarget("about-section", "about")).toEqual({
      normalizedTarget: "about",
      targetKind: "modular",
    });
    expect(normalizeEngineTarget("pricing-compare", "pricing")).toEqual({
      normalizedTarget: "pricing-compare",
      targetKind: "modular",
    });
    expect(normalizeEngineTarget("auth", "login")).toEqual({
      normalizedTarget: "auth",
      targetKind: "special",
    });
    expect(normalizeEngineTarget("hero", "home")).toEqual({
      normalizedTarget: "hero",
      targetKind: "landing",
    });
  });

  it("extracts numeric indices from deeply nested edit paths", () => {
    expect(extractNumericIndicesFromPath("pricing:comparisons.1.values.2")).toEqual([1, 2]);
    expect(extractItemIndexFromPath("pricing:comparisons.1.values.2")).toBe(1);
    expect(extractItemIndexFromPath("benefits:items.3.image")).toBe(3);
    expect(extractNumericIndicesFromPath("hero:title")).toEqual([]);
    expect(extractItemIndexFromPath("hero:title")).toBeNull();
  });

  it("classifies specialized video, slideshow, icon, media, comparison, remit, button, and badge edit paths", () => {
    const project = createWebsiteStarterPack("saas-complete");
    const homePage = project.pages.find((p) => p.template === "home")!;

    const videoPlan = resolveWidgetPlan({
      pageTemplate: homePage.template,
      target: "cta",
      editPath: "cta:videoUrl",
      mode: "popover",
    });
    expect(videoPlan.insight.isVideo).toBe(true);
    expect(videoPlan.atoms).toContain("video-media");
    expect(videoPlan.useCategoryFilteredDrawer).toBe(false);

    const testimonialVideoPlan = resolveWidgetPlan({
      pageTemplate: "home",
      target: "testimonials",
      editPath: "testimonials:items.0.videoUrl",
      mode: "popover",
    });
    expect(testimonialVideoPlan.selectedItemIndex).toBe(0);
    expect(testimonialVideoPlan.atoms).toContain("video-media");

    const slideshowPlan = resolveWidgetPlan({
      pageTemplate: "home",
      target: "hero",
      editPath: "hero:slides.2.image",
      mode: "popover",
    });
    expect(slideshowPlan.insight.isSlideshow).toBe(true);
    expect(slideshowPlan.selectedItemIndex).toBe(2);
    expect(slideshowPlan.atoms).toContain("slideshow-media");

    const iconPlan = resolveWidgetPlan({
      pageTemplate: "home",
      target: "benefits",
      selectedNode: "icon",
      editPath: "benefits:items.1.icon",
      mode: "popover",
    });
    expect(iconPlan.insight.isIcon).toBe(true);
    expect(iconPlan.selectedItemIndex).toBe(1);
    expect(iconPlan.atoms).toContain("icon-picker");

    const comparisonPlan = resolveWidgetPlan({
      pageTemplate: "pricing",
      target: "pricing",
      editPath: "pricing:comparisons.0.values.1",
      mode: "popover",
    });
    expect(comparisonPlan.insight.isComparison).toBe(true);
    expect(comparisonPlan.atoms).toContain("comparison-cell");

    const remitPlan = resolveWidgetPlan({
      pageTemplate: "home",
      target: "hero",
      variant: "remit-grid",
      editPath: "hero:statLabel",
      mode: "popover",
    });
    expect(remitPlan.insight.isRemitStat).toBe(true);
    expect(remitPlan.atoms).toContain("hero-remit-stats");
    expect(remitPlan.atoms).toContain("inline-field");

    const remitInvoicePlan = resolveWidgetPlan({
      pageTemplate: "home",
      target: "hero",
      variant: "remit-grid",
      editPath: "hero:invoiceList.0.name",
      mode: "popover",
    });
    expect(remitInvoicePlan.insight.isRemitStat).toBe(true);
    expect(remitInvoicePlan.selectedItemIndex).toBe(0);
    expect(remitInvoicePlan.atoms).toContain("hero-remit-stats");

    const btnPlan = resolveWidgetPlan({
      pageTemplate: "home",
      target: "cta",
      selectedNode: "primary-button",
      editPath: "cta:primaryLabel",
      mode: "popover",
    });
    expect(btnPlan.atoms).toContain("button-action");

    const annBadgePlan = resolveWidgetPlan({
      pageTemplate: "home",
      target: "announcement",
      selectedNode: "badge",
      editPath: "announcement:badge",
      mode: "popover",
    });
    expect(annBadgePlan.atoms).toContain("badge-editor");
    expect(annBadgePlan.atoms).toContain("inline-field");
    expect(annBadgePlan.atoms).toContain("color-palette");

    const singleMediaInsight = analyzeEditPath("our-team:members.1.avatar", "media", "our-team");
    expect(singleMediaInsight.isMedia).toBe(true);
    expect(singleMediaInsight.itemIndex).toBe(1);
  });

  it("resolves every core node type across all 12 page templates cleanly", () => {
    let project = createWebsiteStarterPack("saas-complete");
    project = addWebsitePage(project, "blog-post", "blog-post");
    const coreNodes: SelectedCoreNode[] = [
      "heading",
      "text",
      "badge",
      "primary-button",
      "secondary-button",
      "media",
      "icon",
      "card",
      "grid",
      "links",
      "brand",
      "items",
    ];

    const expectedTemplates = [
      "home",
      "pricing",
      "about",
      "contact",
      "blog",
      "blog-post",
      "legal",
      "login",
      "signup",
      "recovery",
      "dashboard",
      "not-found",
    ];

    const actualTemplates = project.pages.map((p) => p.template);
    for (const tpl of expectedTemplates) {
      expect(actualTemplates).toContain(tpl);
    }

    for (const page of project.pages) {
      const sampleTarget =
        page.template === "login" || page.template === "signup" || page.template === "recovery"
          ? "auth"
          : page.template === "dashboard"
            ? "dashboard"
            : page.template === "not-found"
              ? "not-found"
              : page.template === "about"
                ? "about"
                : page.template === "contact"
                  ? "contact-mail"
                  : page.template === "legal"
                    ? "legal-hero"
                    : page.template === "blog"
                      ? "blog-index"
                      : page.template === "blog-post"
                        ? "blog-post"
                        : "hero";

      const sectionPlan = resolveWidgetPlan({
        pageTemplate: page.template,
        target: sampleTarget,
        mode: "popover",
      });
      expect(sectionPlan.atoms.length).toBeGreaterThan(0);

      for (const node of coreNodes) {
        const plan = resolveWidgetPlan({
          pageTemplate: page.template,
          target: sampleTarget,
          selectedNode: node,
          selectedItemIndex: node === "items" || node === "card" ? 0 : null,
          mode: "popover",
        });
        expect(plan.useCategoryFilteredDrawer).toBe(false);
        expect(plan.atoms[0]).toBe("core-header");
        expect(plan.atoms.length).toBeGreaterThanOrEqual(2);
      }
    }
  });

  it("persists and reads back inline edits across home, special, chrome, and modular pages", () => {
    let project = createWebsiteStarterPack("saas-complete");
    const homePage = project.pages.find((p) => p.template === "home")!;
    const aboutPage = project.pages.find((p) => p.template === "about")!;
    const contactPage = project.pages.find((p) => p.template === "contact")!;
    const legalPage = project.pages.find((p) => p.template === "legal")!;
    const blogPage = project.pages.find((p) => p.template === "blog")!;
    const pricingPage = project.pages.find((p) => p.template === "pricing")!;
    const loginPage = project.pages.find((p) => p.template === "login")!;
    const notFoundPage = project.pages.find((p) => p.template === "not-found")!;

    project = updateInlineContent(project, homePage.id, "hero:title", "Universal Title");
    expect(readInlineContent(project, homePage.id, "hero:title")).toBe("Universal Title");

    project = updateInlineContent(project, homePage.id, "hero:primaryAction.label", "Launch App");
    expect(readInlineContent(project, homePage.id, "hero:primaryAction.label")).toBe("Launch App");

    project = updateInlineContent(
      project,
      homePage.id,
      "cta:videoUrl",
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    );
    expect(readInlineContent(project, homePage.id, "cta:videoUrl")).toBe(
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    );

    project = updateInlineContent(project, homePage.id, "announcement:text", "Spring Launch Live");
    expect(readInlineContent(project, homePage.id, "announcement:text")).toBe("Spring Launch Live");

    project = updateInlineContent(project, loginPage.id, "auth:heading", "Sign In Securely");
    expect(readInlineContent(project, loginPage.id, "auth:heading")).toBe("Sign In Securely");

    project = updateInlineContent(
      project,
      loginPage.id,
      "auth:loginHeading",
      "Welcome Back Member"
    );
    expect(readInlineContent(project, loginPage.id, "auth:loginHeading")).toBe(
      "Welcome Back Member"
    );

    project = updateInlineContent(project, notFoundPage.id, "notFound:title", "Missing Route");
    expect(readInlineContent(project, notFoundPage.id, "notFound:title")).toBe("Missing Route");

    project = updateInlineContent(project, aboutPage.id, "about:title", "Built by Craftspeople");
    expect(readInlineContent(project, aboutPage.id, "about:title")).toBe("Built by Craftspeople");

    project = updateInlineContent(project, contactPage.id, "contact-mail:email", "team@acme.test");
    expect(readInlineContent(project, contactPage.id, "contact-mail:email")).toBe("team@acme.test");

    project = updateInlineContent(project, legalPage.id, "legal-hero:title", "Updated Legal Terms");
    expect(readInlineContent(project, legalPage.id, "legal-hero:title")).toBe(
      "Updated Legal Terms"
    );

    project = updateInlineContent(project, blogPage.id, "blog-index:title", "Engineering Notes");
    expect(readInlineContent(project, blogPage.id, "blog-index:title")).toBe("Engineering Notes");

    project = updateInlineContent(
      project,
      pricingPage.id,
      "pricing-compare:groups.0.title",
      "Core Specs"
    );
    expect(readInlineContent(project, pricingPage.id, "pricing-compare:groups.0.title")).toBe(
      "Core Specs"
    );
  });

  it("scans special & modular sections with real layer trees and without chrome hijack", () => {
    let project = createWebsiteStarterPack("saas-complete");
    project = addWebsitePage(project, "blog-post", "blog-post");
    const pairs: Array<[string, string]> = [
      ["login", "auth"],
      ["dashboard", "dashboard"],
      ["not-found", "not-found"],
      ["about", "about"],
      ["contact", "contact-mail"],
      ["pricing", "pricing-compare"],
      ["blog", "blog-index"],
      ["blog-post", "blog-post"],
      ["legal", "legal-hero"],
    ];

    for (const [template, target] of pairs) {
      const page = project.pages.find((p) => p.template === template)!;
      const profile = scanActiveSection({
        project,
        page,
        selectedTarget: target,
      });
      expect(profile.sectionType).toBe(target);
      expect(profile.treeNodes.length).toBeGreaterThan(0);
      expect(profile.slots.length).toBeGreaterThan(0);
    }
  });

  it("enforces Shopify-style variant manifest parity for eyebrow, slideshow, and code illustrations", () => {
    const project = createWebsiteStarterPack("saas-complete");
    const homePage = project.pages.find((p) => p.template === "home")!;

    // Every registered primary + additional variant in landingSectionRegistry resolves a manifest
    for (const def of landingSectionRegistry) {
      for (const v of [...def.variants, ...(def.additionalVariants ?? [])]) {
        const manifest = resolveVariantManifest(def.type, String(v.id));
        expect(manifest).not.toBeNull();
        expect(manifest!.sectionType).toBe(def.type);
      }
    }

    // Sections WITHOUT section eyebrow must NOT expose eyebrow capability or badge tree node
    const noEyebrowPairs: Array<[string, string]> = [
      ["logos", "row"],
      ["logos", "ticker"],
      ["logos", "intro-grid"],
      ["benefits", "columns"],
      ["benefits", "cards"],
      ["how-it-works", "vertical"],
      ["testimonials", "single"],
      ["cta", "editorial-showcase"],
      ["hero", "split-product"],
      ["hero", "center-canvas"],
      ["hero", "editorial-photo"],
    ];
    for (const [secType, varId] of noEyebrowPairs) {
      const customPage = {
        ...homePage,
        sections: homePage.sections.map((s) =>
          s.type === secType ? ({ ...s, variant: varId } as typeof s) : s
        ),
      };
      const profile = scanActiveSection({
        project,
        page: customPage,
        selectedTarget: secType,
      });
      expect(profile.capabilities.has("badge")).toBe(false);
      expect(profile.treeNodes.some((n) => n.node === "badge" && n.label === "Eyebrow")).toBe(
        false
      );
    }

    // Hero `split` carousel resolves `slideshow-media` on visual click and `video-media` on Watch Story
    const splitVisualPlan = resolveWidgetPlan({
      pageTemplate: "home",
      target: "hero",
      variant: "split",
      selectedNode: "media",
      selectedItemIndex: 0,
      editPath: "hero:slides.0.image.src",
      mode: "popover",
    });
    expect(splitVisualPlan.insight.isSlideshow).toBe(true);
    expect(splitVisualPlan.atoms).toContain("slideshow-media");

    const splitStoryPlan = resolveWidgetPlan({
      pageTemplate: "home",
      target: "hero",
      variant: "split",
      selectedNode: "media",
      selectedItemIndex: 0,
      editPath: "hero:slides.0.videoUrl",
      mode: "popover",
    });
    expect(splitStoryPlan.insight.isVideo).toBe(true);
    expect(splitStoryPlan.atoms).toContain("video-media");

    // Sections rendered with code illustrations resolve `code-illustration`
    for (const [secType, varId] of [
      ["features", "tabs"],
      ["features", "split"],
      ["how-it-works", "vertical"],
      ["benefits", "cards"],
    ] as const) {
      const plan = resolveWidgetPlan({
        pageTemplate: "home",
        target: secType,
        variant: varId,
        selectedNode: "media",
        editPath: `${secType}:illustration`,
        mode: "popover",
      });
      expect(plan.insight.isCodeIllustration).toBe(true);
      expect(plan.atoms).toContain("code-illustration");
    }

    // Round-trip persistence for split hero slides and illustration settings
    let edited = updateInlineContent(
      project,
      homePage.id,
      "hero:slides.1.quote",
      "Verified split quote"
    );
    expect(readInlineContent(edited, homePage.id, "hero:slides.1.quote")).toBe(
      "Verified split quote"
    );

    edited = updateInlineContent(
      edited,
      homePage.id,
      "features:illustration.badgeText",
      "Live AST"
    );
    expect(readInlineContent(edited, homePage.id, "features:illustration.badgeText")).toBe(
      "Live AST"
    );

    edited = updateInlineContent(edited, homePage.id, "features:illustration.mode", "custom-image");
    expect(readInlineContent(edited, homePage.id, "features:illustration.mode")).toBe(
      "custom-image"
    );
  });
});
