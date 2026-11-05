import * as React from "react";
import "@testing-library/jest-dom/vitest";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ts from "typescript";
import { landingSectionRegistry } from "./catalog";
import {
  createLandingPageConfig,
  parseLandingPageConfig,
  moveLandingSection,
  createLandingPageCode,
  createLandingPageRecipe,
} from "./config";
import { formaLandingContent } from "./data";
import { SaasLandingPage, LandingSectionPreview } from "./LandingPage";
import type { LandingSectionSelection } from "@hudbird/schemas";

describe("SaaS landing collection", () => {
  it("keeps slideshow and video as additional hero options outside the 27 primary variants", () => {
    const definition = landingSectionRegistry.find((section) => section.type === "hero")!;
    expect(definition.variants).toHaveLength(3);
    expect(definition.additionalVariants?.map((variant) => variant.id)).toEqual([
      "slideshow",
      "video",
    ]);
    for (const variant of ["slideshow", "video"] as const) {
      const config = createLandingPageConfig();
      config.sections = config.sections.map((section) =>
        section.type === "hero" ? { ...section, variant } : section
      );
      expect(parseLandingPageConfig(config)).toBe(config);
      const view = render(<SaasLandingPage config={config} content={formaLandingContent} />);
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        formaLandingContent.hero.content.title
      );
      view.unmount();
    }
  });
  it("contains 12 section types and 27 distinct primary variants that render", () => {
    expect(landingSectionRegistry).toHaveLength(12);
    expect(
      landingSectionRegistry.reduce((count, section) => count + section.variants.length, 0)
    ).toBe(27);
    expect(new Set(landingSectionRegistry.map((section) => section.type)).size).toBe(12);
    for (const definition of landingSectionRegistry)
      for (const variant of definition.variants) {
        const view = render(
          <LandingSectionPreview
            selection={
              {
                type: definition.type,
                variant: variant.id,
                enabled: true,
              } as LandingSectionSelection
            }
            content={formaLandingContent}
            brand={createLandingPageConfig().brand}
          />
        );
        expect(
          view.container.querySelector(`[data-landing-section="${definition.type}"]`)
        ).toBeTruthy();
        expect(view.container.textContent!.trim().length).toBeGreaterThan(20);
        view.unmount();
      }
  });

  it("roundtrips a complete config and rejects stale, incomplete, or incompatible stored data", () => {
    const config = createLandingPageConfig();
    expect(parseLandingPageConfig(JSON.parse(JSON.stringify(config)))).toEqual(config);
    expect(parseLandingPageConfig({ ...config, version: 2 })).toBeUndefined();
    expect(
      parseLandingPageConfig({ ...config, sections: config.sections.slice(1) })
    ).toBeUndefined();
    expect(
      parseLandingPageConfig({
        ...config,
        sections: config.sections.map((section) =>
          section.type === "pricing" ? { ...section, variant: "calculator" } : section
        ),
      })
    ).toBeUndefined();
    expect(
      parseLandingPageConfig({ ...config, brand: { ...config.brand, primary: "invalid" } })
    ).toBeUndefined();
    expect(parseLandingPageConfig(null)).toBeUndefined();
  });

  it("exports a versioned recipe with matching config and editable content", () => {
    const config = createLandingPageConfig();
    const recipe = createLandingPageRecipe(config, formaLandingContent);
    expect(recipe.schema).toBe("hudbird.landing.recipe");
    expect(recipe.config).toBe(config);
    expect(recipe.content).toBe(formaLandingContent);
    expect(recipe.registryVersion).toMatch(/^1\.5\.0/);
  });

  it("moves content sections while preserving the pinned header/footer and original config", () => {
    const config = createLandingPageConfig();
    const before = JSON.stringify(config);
    const next = moveLandingSection(config, "benefits", -1);
    expect(next.sections.map((section) => section.type).slice(0, 4)).toEqual([
      "navbar",
      "hero",
      "benefits",
      "logos",
    ]);
    expect(JSON.stringify(config)).toBe(before);
    expect(moveLandingSection(config, "navbar", 1)).toBe(config);
    expect(moveLandingSection(config, "footer", -1)).toBe(config);
    expect(moveLandingSection(config, "hero", -1)).toBe(config);
  });

  it("retains content and brand when variants change and removes links to hidden sections", () => {
    const config = createLandingPageConfig();
    const view = render(<SaasLandingPage config={config} content={formaLandingContent} />);
    const title = screen.getByRole("heading", { level: 1 }).textContent;
    const changed = {
      ...config,
      sections: config.sections.map((section) =>
        section.type === "hero"
          ? { ...section, variant: "split" as const }
          : section.type === "benefits"
            ? { ...section, variant: "visual-list" as const }
            : section.type === "pricing"
              ? { ...section, enabled: false }
              : section
      ),
    };
    view.rerender(<SaasLandingPage config={changed} content={formaLandingContent} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(title!);
    expect(view.container.querySelector("[data-brand]")).toHaveAttribute(
      "data-brand",
      config.brand.id
    );
    expect(view.container.querySelector("#pricing")).toBeNull();
    expect(view.container.querySelectorAll('a[href="#pricing"]')).toHaveLength(0);
    expect(screen.getByText(formaLandingContent.benefits.items[0].description)).toBeVisible();
  });

  it("keeps an accessible page title when the hero is hidden", () => {
    const config = createLandingPageConfig();
    config.sections = config.sections.map((section) => ({
      ...section,
      enabled: section.type !== "hero",
    }));
    render(<SaasLandingPage config={config} content={formaLandingContent} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Forma product overview");
  });

  it("updates matching visuals with tabs and accordion feature selection", () => {
    const brand = createLandingPageConfig().brand;
    const view = render(
      <LandingSectionPreview
        selection={{ type: "features", variant: "tabs", enabled: true }}
        content={formaLandingContent}
        brand={brand}
      />
    );
    fireEvent.click(screen.getByRole("tab", { name: "Projects with a next step" }));
    expect(within(screen.getByRole("tabpanel")).getByRole("img")).toHaveAttribute(
      "alt",
      expect.stringContaining("Projects")
    );
    view.rerender(
      <LandingSectionPreview
        selection={{ type: "features", variant: "accordion", enabled: true }}
        content={formaLandingContent}
        brand={brand}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: "Notes in context" }));
    expect(screen.getByRole("img")).toHaveAttribute("alt", expect.stringContaining("Notes"));
    expect(screen.getByText(formaLandingContent.features.items[2].description)).toBeVisible();
  });

  it("follows the website theme in exported-page mode while allowing an explicit override", async () => {
    const config = createLandingPageConfig();
    const view = render(<SaasLandingPage config={config} content={formaLandingContent} />);
    await act(async () => {
      document.documentElement.classList.add("dark");
    });
    expect(view.container.querySelector("[data-brand]")).toHaveAttribute("data-brand-mode", "dark");
    view.rerender(
      <SaasLandingPage config={{ ...config, themeMode: "light" }} content={formaLandingContent} />
    );
    expect(view.container.querySelector("[data-brand]")).toHaveAttribute(
      "data-brand-mode",
      "light"
    );
    await act(async () => {
      document.documentElement.classList.remove("dark");
    });
  });

  it("exports runnable React source with the selected config and safely serialized brand text", () => {
    const config = createLandingPageConfig();
    config.brand.name = 'A "quoted" brand\nwith a second line';
    const code = createLandingPageCode(config);
    expect(code).toContain(JSON.stringify(config, null, 2));
    expect(code).toContain('from "@/components/hudbird-ui/LandingPage"');
    const result = ts.transpileModule(code, {
      fileName: "App.tsx",
      compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.ESNext },
      reportDiagnostics: true,
    });
    expect(
      result.diagnostics?.filter(
        (diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error
      )
    ).toEqual([]);
  });
});
