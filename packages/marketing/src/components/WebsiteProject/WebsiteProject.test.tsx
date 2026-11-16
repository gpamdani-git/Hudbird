import React from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import ts from "typescript";
import type { LandingSectionType } from "@hudbird/schemas";
import { createLandingPageConfig } from "../LandingPage/config";
import { brandCssVarsRecord } from "../HeroSection/brand";
import {
  addWebsitePage,
  createWebsiteProject,
  createWebsiteProjectCode,
  createWebsiteProjectFiles,
  createWebsiteStarterPack,
  deleteWebsitePage,
  duplicateWebsitePage,
  enableAndPositionPageSection,
  findOrphanPages,
  generateTailwindV4ThemeCss,
  generateTokensJson,
  getEffectiveDashboardConfig,
  getEffectiveSharedSections,
  movePageSection,
  normalizePagePath,
  pageConfig,
  parseWebsiteProject,
  readInlineContent,
  resetPageSharedChromeOverride,
  resolvedPageConfig,
  resolveLinkTarget,
  resolvePageContent,
  restoreWebsitePage,
  updateInlineContent,
} from "./config";
import { WebsiteProjectPage } from "./WebsiteProject";

describe("Website project", () => {
  it("migrates the entire landing configuration without changing its section choices", () => {
    const landing = createLandingPageConfig();
    landing.brand.primary = "#b42349";
    landing.sections[1].enabled = false;
    const project = createWebsiteProject(landing);
    expect(pageConfig(project, project.pages[0])).toEqual(landing);
    expect(parseWebsiteProject(JSON.parse(JSON.stringify(project)))).toEqual(project);
  });
  it("gives new pages unique URLs and duplicates independent section settings", () => {
    let project = addWebsitePage(createWebsiteProject(), "pricing", "pricing-a");
    project = addWebsitePage(project, "pricing", "pricing-b");
    project = duplicateWebsitePage(project, "home", "copy");
    expect(project.pages.map((p) => p.path)).toEqual(["/", "/pricing", "/pricing-2", "/home-copy"]);
    project.pages[3].sections[0].enabled = false;
    expect(project.pages[0].sections[0].enabled).toBe(true);
    expect(parseWebsiteProject(project)).toBeDefined();
  });
  it("protects home and cleans links when deleting, then restores without losing subsequent edits", () => {
    const project = {
      ...addWebsitePage(createWebsiteProject(), "pricing", "pricing"),
      navigation: ["pricing"],
      primaryActionPageId: "pricing",
    };
    expect(deleteWebsitePage(project, "home")).toBe(project);
    const deleted = deleteWebsitePage(project, "pricing");
    expect(deleted.activePageId).toBe("home");
    expect(deleted.navigation).toEqual([]);
    expect(deleted.primaryActionPageId).toBeNull();
    const edited = addWebsitePage({ ...deleted, name: "Edited after delete" }, "about", "about");
    const restored = restoreWebsitePage(edited, project);
    expect(restored.name).toBe("Edited after delete");
    expect(restored.pages.map((p) => p.id)).toContain("about");
    expect(restored.navigation).toContain("pricing");
  });
  it("rejects malformed or ambiguous persisted projects", () => {
    const project = addWebsitePage(createWebsiteProject(), "login", "login");
    for (const invalid of [
      null,
      {},
      { ...project, pages: [] },
      { ...project, pages: [null] },
      { ...project, activePageId: "missing" },
      { ...project, navigation: ["missing"] },
      { ...project, primaryActionPageId: "missing" },
      { ...project, pages: project.pages.map((p) => ({ ...p, path: "/" })) },
      { ...project, pages: project.pages.map((p) => ({ ...p, sections: [] })) },
    ])
      expect(parseWebsiteProject(invalid)).toBeUndefined();
    expect(normalizePagePath(" /About/ ")).toBe("/about");
    for (const path of [
      "//example.com",
      "javascript:alert(1)",
      "/foo?bar",
      "/foo#bar",
      "/../home",
      "home",
    ])
      expect(normalizePagePath(path)).toBeUndefined();
  });
  it("keeps ID-based navigation when a destination URL changes", () => {
    let project = addWebsitePage(createWebsiteProject(), "login", "login");
    project = addWebsitePage(project, "signup", "signup");
    project.pages = project.pages.map((p) => (p.id === "signup" ? { ...p, path: "/join-us" } : p));
    const navigate = vi.fn();
    render(<WebsiteProjectPage project={project} pageId="login" onNavigate={navigate} />);
    const link = screen.getByRole("link", { name: "Sign up" });
    expect(link).toHaveAttribute("href", "/join-us");
    fireEvent.click(link);
    expect(navigate).toHaveBeenCalledWith("signup");
  });
  it("renders an unknown route as 404 with a working home action", () => {
    const navigate = vi.fn();
    render(
      <WebsiteProjectPage project={createWebsiteProject()} pageId="missing" onNavigate={navigate} />
    );
    fireEvent.click(screen.getByRole("link", { name: "Back to home" }));
    expect(navigate).toHaveBeenCalledWith("home");
  });
  it("exports the full project as valid TSX", () => {
    const project = addWebsitePage(createWebsiteProject(), "signup", "signup");
    const code = createWebsiteProjectCode(project);
    const result = ts.transpileModule(code, {
      compilerOptions: { jsx: ts.JsxEmit.ReactJSX },
      reportDiagnostics: true,
    });
    expect(result.diagnostics).toEqual([]);
    expect(code).toContain('"/signup"');
    expect(code).toContain("<WebsiteProject project={project} />");
  });
  it("supports blog and blog-post page templates with valid serialization", () => {
    let project = addWebsitePage(createWebsiteProject(), "blog", "blog");
    project = addWebsitePage(project, "blog-post", "blog-post");
    expect(project.pages.map((p) => p.path)).toEqual(["/", "/blog", "/blog/post"]);
    expect(parseWebsiteProject(JSON.parse(JSON.stringify(project)))).toEqual(project);
  });
  it("supports contact page template with serialization and ContactPageSection render", () => {
    const project = addWebsitePage(createWebsiteProject(), "contact", "contact-main");
    expect(project.pages.map((p) => p.path)).toEqual(["/", "/contact"]);
    expect(parseWebsiteProject(JSON.parse(JSON.stringify(project)))).toEqual(project);
    render(<WebsiteProjectPage project={project} pageId="contact-main" onNavigate={vi.fn()} />);
    expect(
      screen.getByRole("heading", { name: /talk with the engineers building hudbird ui/i })
    ).toBeInTheDocument();
  });

  it("propagates shared navbar/footer inheritance and supports custom unlink & hidden overrides", () => {
    let project = addWebsitePage(createWebsiteProject(), "pricing", "pricing");
    const shared = getEffectiveSharedSections(project);
    project = {
      ...project,
      shared: {
        ...project.shared,
        navbar: {
          ...shared.navbar!,
          items: [
            {
              id: "nav-pricing",
              label: "Plans & Tiers",
              target: { kind: "page", pageId: "pricing" },
            },
          ],
        },
        footer: {
          ...shared.footer!,
          note: "Global Inc Copyright",
        },
      },
    };

    const { rerender } = render(
      <WebsiteProjectPage
        project={project}
        pageId="home"
        interactionMode="navigate"
        onNavigate={vi.fn()}
      />
    );
    expect(screen.getAllByText("Plans & Tiers").length).toBeGreaterThan(0);
    expect(screen.getByText("Global Inc Copyright")).toBeInTheDocument();

    // Unlink footer on pricing as hidden while keeping home footer enabled
    project = {
      ...project,
      pages: project.pages.map((p) =>
        p.id === "pricing" ? { ...p, sharedMode: { navbar: "inherit", footer: "hidden" } } : p
      ),
    };
    expect(
      resolvedPageConfig(project, project.pages[1]).sections.find((s) => s.type === "footer")
        ?.enabled
    ).toBe(false);
    rerender(
      <WebsiteProjectPage
        project={project}
        pageId="pricing"
        interactionMode="navigate"
        onNavigate={vi.fn()}
      />
    );
    expect(screen.queryByText("Global Inc Copyright")).not.toBeInTheDocument();
  });

  it("renders shared announcement bar and navigates cleanly in navigate mode but stays inert in edit mode", () => {
    let project = addWebsitePage(createWebsiteProject(), "pricing", "pricing");
    const shared = getEffectiveSharedSections(project);
    project = {
      ...project,
      shared: {
        ...project.shared,
        announcement: {
          ...shared.announcement!,
          enabled: true,
          badge: "Launch",
          text: "New v2.5 Studio Release",
          linkLabel: "Inspect pricing",
          target: { kind: "page", pageId: "pricing" },
        },
      },
    };

    const navInEdit = vi.fn();
    const { rerender } = render(
      <WebsiteProjectPage
        project={project}
        pageId="home"
        interactionMode="edit"
        onNavigate={navInEdit}
      />
    );
    expect(screen.getByText("New v2.5 Studio Release")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Inspect pricing"));
    expect(navInEdit).not.toHaveBeenCalled();

    const navInLive = vi.fn();
    rerender(
      <WebsiteProjectPage
        project={project}
        pageId="home"
        interactionMode="navigate"
        onNavigate={navInLive}
      />
    );
    fireEvent.click(screen.getByText("Inspect pricing"));
    expect(navInLive).toHaveBeenCalledWith("pricing");
  });

  it("updates inline content with per-page isolation for hero and global sync for footer", () => {
    let project = addWebsitePage(createWebsiteProject(), "pricing", "pricing");
    project = updateInlineContent(
      project,
      "home",
      "hero:title",
      "Build Multipage Sites Effortlessly"
    );
    project = updateInlineContent(project, "pricing", "footer:note", "Shared Footer Notice 2026");

    const { rerender } = render(
      <WebsiteProjectPage project={project} pageId="home" onNavigate={vi.fn()} />
    );
    expect(screen.getByText("Build Multipage Sites Effortlessly")).toBeInTheDocument();
    expect(screen.getByText("Shared Footer Notice 2026")).toBeInTheDocument();

    rerender(<WebsiteProjectPage project={project} pageId="pricing" onNavigate={vi.fn()} />);
    expect(screen.queryByText("Build Multipage Sites Effortlessly")).not.toBeInTheDocument();
    expect(screen.getByText("Shared Footer Notice 2026")).toBeInTheDocument();
  });

  it("wires starter pack auth redirect to single-page Overview dashboard and back to website", () => {
    let project = createWebsiteStarterPack("saas-complete");
    expect(project.pages.some((p) => p.template === "dashboard")).toBe(true);
    expect(project.pages.some((p) => p.template === "not-found")).toBe(true);
    expect(Array.isArray(findOrphanPages(project))).toBe(true);

    const onNav = vi.fn();
    const { rerender } = render(
      <WebsiteProjectPage
        project={project}
        pageId="login"
        interactionMode="navigate"
        onNavigate={onNav}
      />
    );
    const submitBtn = screen.getByRole("button", { name: /log in/i });
    const form = submitBtn.closest("form");
    if (form) {
      fireEvent.submit(form);
    } else {
      fireEvent.click(submitBtn);
    }
    expect(onNav).toHaveBeenCalledWith("dashboard");

    // Customize dashboard overview title and back link
    const dash = getEffectiveDashboardConfig(project);
    project = {
      ...project,
      dashboardConfig: {
        ...dash,
        appTitle: "Acme Cloud Console",
        backToSiteLabel: "Return Home",
      },
    };
    const dashNav = vi.fn();
    rerender(
      <WebsiteProjectPage
        project={project}
        pageId="dashboard"
        interactionMode="navigate"
        onNavigate={dashNav}
      />
    );
    expect(screen.getAllByText("Acme Cloud Console").length).toBeGreaterThan(0);
    fireEvent.click(screen.getByRole("link", { name: /return home/i }));
    expect(dashNav).toHaveBeenCalledWith("home");
  });

  it("supports customizable 404 content, quick links, and fallback routing", () => {
    const base = createWebsiteStarterPack("saas-complete");
    const project: typeof base = {
      ...base,
      notFoundConfig: {
        code: "404",
        title: "Custom Missing Route",
        description: "The requested workspace route moved.",
        primaryActionLabel: "Return to Home",
        primaryActionTarget: { kind: "page", pageId: "home" },
        secondaryActionLabel: "View Plans",
        secondaryActionTarget: { kind: "page", pageId: "pricing" },
        showQuickLinks: true,
      },
    };
    const onNav = vi.fn();
    render(
      <WebsiteProjectPage
        project={project}
        pageId="missing-route"
        interactionMode="navigate"
        onNavigate={onNav}
      />
    );
    expect(screen.getByText("Custom Missing Route")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("link", { name: "Return to Home" }));
    expect(onNav).toHaveBeenCalledWith("home");
    fireEvent.click(screen.getByRole("link", { name: "View Plans" }));
    expect(onNav).toHaveBeenCalledWith("pricing");
  });

  it("computes CSS runtime vars, Tailwind v4 tokens CSS, and design-tokens JSON", () => {
    const project = createWebsiteProject();
    const tokens = {
      surfaceBase: "obsidian" as const,
      secondaryColor: "#7c3aed",
      semantic: { success: "#10b981", warning: "#f59e0b", danger: "#ef4444" },
      typography: {
        headingFont: "Playfair Display",
        headingGoogleFont: "Playfair Display",
        bodyFont: "Inter",
        bodyGoogleFont: "Inter",
        monoFont: "JetBrains Mono",
        monoGoogleFont: "JetBrains Mono",
        scale: "expressive" as const,
        tracking: "tight" as const,
      },
      shape: { radiusPx: 18, borderStyle: "crisp" as const, elevation: "layered" as const },
      spacing: { containerWidth: "wide" as const, sectionPadding: "spacious" as const },
    };
    const cssVars = brandCssVarsRecord(project.brand, tokens);
    expect(cssVars["--hb-radius"]).toBe("18px");
    expect(cssVars["--hb-font-heading"]).toContain("Playfair Display");

    const themeCss = generateTailwindV4ThemeCss(project.brand, tokens);
    expect(themeCss).toContain("@theme inline");
    expect(themeCss).toContain("--font-heading:");

    const tokensJson = generateTokensJson(project.brand, tokens) as {
      brand: { primary: string };
      tokens: { shape: { radiusPx: number }; surfaceBase: string };
    };
    expect(tokensJson.brand.primary).toBe(project.brand.primary);
    expect(tokensJson.tokens.shape.radiusPx).toBe(18);
    expect(tokensJson.tokens.surfaceBase).toBe("obsidian");
  });

  it("reorders sections cleanly without displacing navbar/footer and compiles multi-file export", () => {
    let project = createWebsiteStarterPack("saas-complete");
    const home = project.pages[0];
    const initialBodyIdx = home.sections.findIndex((s) => s.type === "pricing");
    project = movePageSection(project, "home", "pricing", "up");
    const movedBodyIdx = project.pages[0].sections.findIndex((s) => s.type === "pricing");
    expect(movedBodyIdx).toBe(initialBodyIdx - 1);
    expect(project.pages[0].sections[0].type).toBe("navbar");
    expect(project.pages[0].sections[project.pages[0].sections.length - 1].type).toBe("footer");

    project = enableAndPositionPageSection(project, "home", "testimonials", "hero");
    const afterHeroIdx = project.pages[0].sections.findIndex((s) => s.type === "hero");
    const testimonialsIdx = project.pages[0].sections.findIndex((s) => s.type === "testimonials");
    expect(testimonialsIdx).toBe(afterHeroIdx + 1);

    const files = createWebsiteProjectFiles(project);
    expect(files.map((f) => f.path)).toEqual([
      "src/App.tsx",
      "src/StandaloneApp.tsx",
      "src/routes.ts",
      "src/styles/tokens.css",
      "src/data/project.config.json",
      "design-tokens.json",
    ]);

    files
      .filter((f) => f.path.endsWith(".ts") || f.path.endsWith(".tsx"))
      .forEach((file) => {
        const res = ts.transpileModule(file.content, {
          compilerOptions: { jsx: ts.JsxEmit.ReactJSX },
          reportDiagnostics: true,
        });
        expect(res.diagnostics).toEqual([]);
      });
  });

  it("updates nested dot-paths and modular scopes cleanly via updateInlineContent", () => {
    let project = createWebsiteStarterPack("saas-complete");
    project = addWebsitePage(project, "contact", "contact-test");
    const home = project.pages[0];
    const contactPage = project.pages.find((p) => p.id === "contact-test")!;

    project = updateInlineContent(project, home.id, "pricing:plans.1.name", "Enterprise Plus");
    project = updateInlineContent(
      project,
      home.id,
      "testimonials:items.0.quote",
      "Fastest setup we ever used."
    );
    project = updateInlineContent(project, home.id, "benefits:items.0.title", "Zero Layout Shift");
    project = updateInlineContent(
      project,
      home.id,
      "footer:columns.0.links.0.label",
      "Platform Overview"
    );
    project = updateInlineContent(project, home.id, "navbar:links.0.label", "Solutions");
    project = updateInlineContent(
      project,
      contactPage.id,
      "contact-form-call:heading",
      "Book a Strategy Call"
    );

    const updatedHomeContent = resolvePageContent(project, project.pages[0]);
    expect(updatedHomeContent.pricing.plans[1].name).toBe("Enterprise Plus");
    expect(updatedHomeContent.testimonials.items[0].quote).toBe("Fastest setup we ever used.");
    expect(updatedHomeContent.benefits.items[0].title).toBe("Zero Layout Shift");
    expect(updatedHomeContent.footer.groups[0].links[0].label).toBe("Platform Overview");
    expect(updatedHomeContent.navbar.links[0].label).toBe("Solutions");

    const updatedContactPage = project.pages.find((p) => p.id === "contact-test")!;
    expect(updatedContactPage.modularOverrides?.["contact-form-call"]?.heading).toBe(
      "Book a Strategy Call"
    );

    render(
      <WebsiteProjectPage project={project} pageId={updatedContactPage.id} onNavigate={vi.fn()} />
    );
    expect(screen.getByText("Book a Strategy Call")).toBeInTheDocument();
  });

  it("isolates sharedMode custom navbar and footer per page and resets cleanly to shared", () => {
    let project = createWebsiteStarterPack("saas-complete");
    const home = project.pages.find((p) => p.id === "home")!;
    const pricing = project.pages.find((p) => p.id === "pricing")!;
    const originalGlobalActionLabel = resolvePageContent(project, home).navbar.action.label;
    const originalGlobalFooterHeading = resolvePageContent(project, home).footer.heading;

    project = {
      ...project,
      pages: project.pages.map((p) =>
        p.id === pricing.id ? { ...p, sharedMode: { navbar: "custom", footer: "custom" } } : p
      ),
    };

    project = updateInlineContent(
      project,
      pricing.id,
      "navbar:action.label",
      "Start Pricing Trial"
    );
    project = updateInlineContent(project, pricing.id, "navbar:links.0.label", "Compare Tiers");
    project = updateInlineContent(
      project,
      pricing.id,
      "footer:heading",
      "Dedicated Pricing Footer"
    );
    project = updateInlineContent(
      project,
      pricing.id,
      "footer:columns.0.links.0.label",
      "Enterprise Terms"
    );

    const customPricing = project.pages.find((p) => p.id === pricing.id)!;
    const customPricingContent = resolvePageContent(project, customPricing);
    const homeAfterCustomContent = resolvePageContent(
      project,
      project.pages.find((p) => p.id === home.id)!
    );

    expect(customPricingContent.navbar.action.label).toBe("Start Pricing Trial");
    expect(customPricingContent.navbar.links[0].label).toBe("Compare Tiers");
    expect(customPricingContent.footer.heading).toBe("Dedicated Pricing Footer");
    expect(customPricingContent.footer.groups[0].links[0].label).toBe("Enterprise Terms");

    expect(homeAfterCustomContent.navbar.action.label).toBe(originalGlobalActionLabel);
    expect(homeAfterCustomContent.footer.heading).toBe(originalGlobalFooterHeading);

    project = resetPageSharedChromeOverride(project, pricing.id, "navbar");
    project = resetPageSharedChromeOverride(project, pricing.id, "footer");

    const resetPricing = project.pages.find((p) => p.id === pricing.id)!;
    const resetPricingContent = resolvePageContent(project, resetPricing);
    expect(resetPricing.sharedMode?.navbar).toBe("inherit");
    expect(resetPricing.sharedMode?.footer).toBe("inherit");
    expect(resetPricing.sharedOverrides?.navbar).toBeUndefined();
    expect(resetPricing.sharedOverrides?.footer).toBeUndefined();
    expect(resetPricingContent.navbar.action.label).toBe(originalGlobalActionLabel);
    expect(resetPricingContent.footer.heading).toBe(originalGlobalFooterHeading);
  });

  it("resolves custom anchorId targets on section links without missing-page fallbacks", () => {
    let project = createWebsiteStarterPack("saas-complete");
    const heroAnchorTarget = {
      kind: "section" as const,
      section: "custom-plans" as unknown as LandingSectionType,
    };
    expect(resolveLinkTarget(project, heroAnchorTarget)).toEqual({
      href: "#custom-plans",
      valid: true,
      external: false,
      anchor: "custom-plans",
    });

    project = {
      ...project,
      pages: project.pages.map((p) =>
        p.id === "home"
          ? {
              ...p,
              sections: p.sections.map((s) =>
                s.type === "pricing"
                  ? {
                      ...s,
                      enabled: true,
                      customSettings: { ...s.customSettings, anchorId: "custom-plans" },
                    }
                  : s
              ),
            }
          : p
      ),
      shared: {
        ...project.shared,
        navbar: {
          ...project.shared!.navbar!,
          actionLabel: "Jump to Plans",
          actionTarget: {
            kind: "section",
            section: "custom-plans" as unknown as LandingSectionType,
          },
        },
      },
    };

    const { container } = render(
      <WebsiteProjectPage
        project={project}
        pageId="home"
        interactionMode="navigate"
        onNavigate={vi.fn()}
      />
    );
    const customAnchorSection = container.querySelector("section#custom-plans");
    expect(customAnchorSection).not.toBeNull();
    const ctaLink = screen.getByRole("link", { name: "Jump to Plans" });
    expect(ctaLink).toHaveAttribute("href", "#custom-plans");
  });

  it("seeds dense subSteps on inline edits and safely renders how-it-works even when subSteps contains null holes", () => {
    let project = createWebsiteStarterPack("saas-complete");
    const home = project.pages[0];

    expect(readInlineContent(project, home.id, "how-it-works:items.0.subSteps.1.label")).toBe(
      "Customize & reorder sections"
    );

    project = updateInlineContent(
      project,
      home.id,
      "how-it-works:items.0.subSteps.1.label",
      "Configure visual sections"
    );
    const updatedHow = resolvePageContent(project, project.pages[0])["how-it-works"];
    const seededSubSteps = updatedHow.items[0].subSteps ?? [];
    expect(seededSubSteps.length).toBeGreaterThanOrEqual(3);
    expect(seededSubSteps.every((s) => s && typeof s.id === "string" && s.id.length > 0)).toBe(
      true
    );
    expect(seededSubSteps[1]?.label).toBe("Configure visual sections");

    // Simulate legacy corrupted localStorage payload with null holes inside subSteps
    const corruptedItems = updatedHow.items.map((item, idx) =>
      idx === 0
        ? {
            ...item,
            subSteps: [
              null,
              { label: "Legacy step override" },
              undefined,
            ] as unknown as NonNullable<typeof item.subSteps>,
          }
        : item
    );
    const corruptedProject = {
      ...project,
      pages: project.pages.map((p) =>
        p.id === home.id
          ? {
              ...p,
              sections: p.sections.map((s) =>
                s.type === "how-it-works"
                  ? { ...s, enabled: true, variant: "vertical" as const }
                  : s
              ),
              contentOverrides: {
                ...p.contentOverrides,
                "how-it-works": {
                  ...p.contentOverrides?.["how-it-works"],
                  items: corruptedItems,
                },
              },
            }
          : p
      ),
    };

    render(
      <WebsiteProjectPage
        project={corruptedProject}
        pageId={home.id}
        interactionMode="edit"
        onNavigate={vi.fn()}
      />
    );
    expect(screen.getAllByText("Legacy step override").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Open page builder").length).toBeGreaterThan(0);
  });
});
