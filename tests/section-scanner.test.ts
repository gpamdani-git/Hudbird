import { describe, expect, it } from "vitest";
import { createWebsiteProject } from "@hudbird/marketing";
import {
  scanActiveSection,
  shouldRenderWidgetGroup,
} from "../apps/docs/src/components/builder/sectionScanner";
import {
  computeContrastBadge,
  extractYouTubeVideoId,
} from "../apps/docs/src/components/builder/SectionScannerWidgets";

describe("SectionScannerEngine & Widget Helpers", () => {
  it("scans Hero split (default carousel) and Hero split-product accurately via manifests", () => {
    const project = createWebsiteProject();
    const homePage = project.pages[0]!;

    // Default home hero is `split` (4-slide carousel + Watch Story video + Eyebrow, no Secondary CTA)
    const splitProfile = scanActiveSection({
      project,
      page: homePage,
      selectedTarget: "hero",
      selectedCoreNode: "section",
      selectedItemIndex: null,
    });

    expect(splitProfile.sectionType).toBe("hero");
    expect(splitProfile.variant).toBe("split");
    expect(splitProfile.capabilities.has("color")).toBe(true);
    expect(splitProfile.capabilities.has("multi-image-slideshow")).toBe(true);
    expect(splitProfile.capabilities.has("video-media")).toBe(true);
    expect(splitProfile.capabilities.has("primary-button")).toBe(true);
    expect(splitProfile.capabilities.has("secondary-button")).toBe(false);
    expect(splitProfile.capabilities.has("badge")).toBe(true);
    expect(splitProfile.availableWidgetPages).toEqual([
      "media-color",
      "type-actions",
      "layout-motion",
      "data-advanced",
    ]);

    // Explicit `split-product` hero exposes single-image + both CTAs, without slideshow/video/eyebrow
    const splitProductPage = {
      ...homePage,
      sections: homePage.sections.map((s) =>
        s.type === "hero" ? { ...s, variant: "split-product" as const } : s
      ),
    };
    const productProfile = scanActiveSection({
      project,
      page: splitProductPage,
      selectedTarget: "hero",
      selectedCoreNode: "section",
      selectedItemIndex: null,
    });

    expect(productProfile.variant).toBe("split-product");
    expect(productProfile.capabilities.has("single-image")).toBe(true);
    expect(productProfile.capabilities.has("video-media")).toBe(false);
    expect(productProfile.capabilities.has("multi-image-slideshow")).toBe(false);
    expect(productProfile.capabilities.has("primary-button")).toBe(true);
    expect(productProfile.capabilities.has("secondary-button")).toBe(true);
    expect(productProfile.capabilities.has("badge")).toBe(false);
  });

  it("scans Hero video preset and switches capability to video-media", () => {
    const project = createWebsiteProject();
    const basePage = project.pages[0]!;
    const videoPage = {
      ...basePage,
      sections: basePage.sections.map((s) => (s.type === "hero" ? { ...s, variant: "video" } : s)),
    };

    const profile = scanActiveSection({
      project,
      page: videoPage,
      selectedTarget: "hero",
      selectedCoreNode: "section",
      selectedItemIndex: null,
    });

    expect(profile.variant).toBe("video");
    expect(profile.capabilities.has("video-media")).toBe(true);
    expect(profile.capabilities.has("multi-image-slideshow")).toBe(false);
    expect(profile.recommendedPage).toBe("media-color");
  });

  it("scans Hero slideshow preset and switches capability to multi-image-slideshow", () => {
    const project = createWebsiteProject();
    const basePage = project.pages[0]!;
    const slideshowPage = {
      ...basePage,
      sections: basePage.sections.map((s) =>
        s.type === "hero" ? { ...s, variant: "slideshow" } : s
      ),
    };

    const profile = scanActiveSection({
      project,
      page: slideshowPage,
      selectedTarget: "hero",
      selectedCoreNode: "section",
      selectedItemIndex: null,
    });

    expect(profile.variant).toBe("slideshow");
    expect(profile.capabilities.has("multi-image-slideshow")).toBe(true);
    expect(profile.capabilities.has("video-media")).toBe(false);
    expect(profile.recommendedPage).toBe("media-color");
  });

  it("auto-hides non-applicable widget category pages for Announcement and Navbar", () => {
    const project = createWebsiteProject();
    const homePage = project.pages[0]!;

    const announcementProfile = scanActiveSection({
      project,
      page: homePage,
      selectedTarget: "announcement",
      selectedCoreNode: "section",
      selectedItemIndex: null,
    });

    // Announcement has no grid, cards, motion, or collection items -> layout-motion is auto-hidden
    expect(announcementProfile.availableWidgetPages).not.toContain("layout-motion");
    expect(
      shouldRenderWidgetGroup(announcementProfile, "all", "layout-motion", [
        "grid-layout",
        "motion-reveal",
      ])
    ).toBe(false);

    const navbarProfile = scanActiveSection({
      project,
      page: homePage,
      selectedTarget: "navbar",
      selectedCoreNode: "section",
      selectedItemIndex: null,
    });

    // Navbar has brand-logo, primary/secondary buttons, shared-scope, but no grid/motion
    expect(navbarProfile.capabilities.has("brand-logo")).toBe(true);
    expect(navbarProfile.capabilities.has("shared-scope")).toBe(true);
    expect(navbarProfile.availableWidgetPages).not.toContain("layout-motion");
  });

  it("scans Pricing comparison preset and Modular sections accurately", () => {
    const project = createWebsiteProject();
    const basePage = project.pages[0]!;
    const comparisonPage = {
      ...basePage,
      sections: basePage.sections.map((s) =>
        s.type === "pricing" ? { ...s, variant: "comparison" } : s
      ),
    };

    const pricingProfile = scanActiveSection({
      project,
      page: comparisonPage,
      selectedTarget: "pricing",
      selectedCoreNode: "section",
      selectedItemIndex: null,
    });

    expect(pricingProfile.capabilities.has("comparison-matrix")).toBe(true);
    expect(pricingProfile.capabilities.has("card-surface")).toBe(true);

    const contactPage = project.pages.find((p) => p.template === "contact") ?? basePage;
    const contactProfile = scanActiveSection({
      project,
      page: contactPage,
      selectedTarget: "contact-form-call",
      selectedCoreNode: "section",
      selectedItemIndex: null,
    });

    expect(contactProfile.capabilities.has("form-fields")).toBe(true);
    expect(contactProfile.recommendedPage).toBe("data-advanced");
  });

  it("parses YouTube URLs and computes WCAG contrast ratios", () => {
    expect(extractYouTubeVideoId("https://www.youtube.com/watch?v=dQw4w9WgXcQ")).toBe(
      "dQw4w9WgXcQ"
    );
    expect(extractYouTubeVideoId("https://youtu.be/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
    expect(extractYouTubeVideoId("https://www.youtube.com/shorts/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
    expect(extractYouTubeVideoId("https://cdn.hudbird.dev/demo.mp4")).toBeNull();

    const highContrast = computeContrastBadge("#09090b", "#fafafa");
    expect(highContrast.tier).toBe("AAA");

    const lowContrast = computeContrastBadge("#f4f4f5", "#e4e4e7");
    expect(lowContrast.tier).toBe("Low");
  });

  it("scans CTA variants dynamically across editorial-showcase, centered, and split", () => {
    const project = createWebsiteProject();
    const basePage = project.pages[0]!;

    const withCtaVariant = (variant: string) => ({
      ...basePage,
      sections: basePage.sections.map((s) => (s.type === "cta" ? { ...s, variant } : s)),
    });

    const editorialProfile = scanActiveSection({
      project,
      page: withCtaVariant("editorial-showcase"),
      selectedTarget: "cta",
      selectedCoreNode: "section",
      selectedItemIndex: null,
    });

    const editorialNodeTypes = editorialProfile.treeNodes.map((n) => n.node);
    expect(editorialNodeTypes).toEqual(
      expect.arrayContaining([
        "heading",
        "text",
        "primary-button",
        "secondary-button",
        "items",
        "media",
      ])
    );
    expect(editorialNodeTypes).not.toContain("badge");
    expect(editorialNodeTypes).not.toContain("card");

    expect(editorialProfile.capabilities.has("video-media")).toBe(true);
    expect(editorialProfile.capabilities.has("single-image")).toBe(true);
    expect(editorialProfile.capabilities.has("collection-items")).toBe(true);
    expect(editorialProfile.capabilities.has("badge")).toBe(false);
    expect(editorialProfile.capabilities.has("grid-layout")).toBe(false);
    expect(editorialProfile.capabilities.has("card-surface")).toBe(false);

    const centeredProfile = scanActiveSection({
      project,
      page: withCtaVariant("centered"),
      selectedTarget: "cta",
      selectedCoreNode: "section",
      selectedItemIndex: null,
    });
    expect(centeredProfile.capabilities.has("badge")).toBe(true);
    expect(centeredProfile.capabilities.has("card-surface")).toBe(true);
    expect(centeredProfile.capabilities.has("grid-layout")).toBe(false);
    expect(centeredProfile.capabilities.has("collection-items")).toBe(false);

    const splitProfile = scanActiveSection({
      project,
      page: withCtaVariant("split"),
      selectedTarget: "cta",
      selectedCoreNode: "section",
      selectedItemIndex: null,
    });
    expect(splitProfile.capabilities.has("grid-layout")).toBe(true);
    expect(splitProfile.capabilities.has("collection-items")).toBe(true);
  });

  it("scans Hero remit-grid and Testimonials featured/collection dynamically", () => {
    const project = createWebsiteProject();
    const basePage = project.pages[0]!;

    const remitPage = {
      ...basePage,
      sections: basePage.sections.map((s) =>
        s.type === "hero" ? { ...s, variant: "remit-grid" } : s
      ),
    };
    const remitProfile = scanActiveSection({
      project,
      page: remitPage,
      selectedTarget: "hero",
      selectedCoreNode: "section",
      selectedItemIndex: null,
    });
    const remitNodes = remitProfile.treeNodes.map((n) => n.node);
    expect(remitNodes).toEqual(expect.arrayContaining(["card", "media", "items"]));
    expect(remitProfile.capabilities.has("single-image")).toBe(true);
    expect(remitProfile.capabilities.has("icon-picker")).toBe(true);

    const withTestimonialsVariant = (variant: string) => ({
      ...basePage,
      sections: basePage.sections.map((s) => (s.type === "testimonials" ? { ...s, variant } : s)),
    });

    const featuredProfile = scanActiveSection({
      project,
      page: withTestimonialsVariant("featured"),
      selectedTarget: "testimonials",
      selectedCoreNode: "section",
      selectedItemIndex: null,
    });
    expect(featuredProfile.capabilities.has("single-image")).toBe(true);

    const collectionProfile = scanActiveSection({
      project,
      page: withTestimonialsVariant("collection"),
      selectedTarget: "testimonials",
      selectedCoreNode: "section",
      selectedItemIndex: null,
    });
    expect(collectionProfile.capabilities.has("video-media")).toBe(true);
    expect(collectionProfile.capabilities.has("single-image")).toBe(true);
    expect(collectionProfile.capabilities.has("primary-button")).toBe(true);
  });
});
