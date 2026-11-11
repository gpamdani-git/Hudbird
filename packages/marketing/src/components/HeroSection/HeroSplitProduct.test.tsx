import * as React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HeroSplitProduct } from "./HeroSplitProduct";
import { BrandScope } from "./BrandScope";
import { pilotBrands } from "../StartupPilot/demo-data";
import { LandingMotionContext } from "../LandingShared";
import {
  createLandingPageConfig,
  createLandingPageCode,
  createLandingPageRecipe,
  parseLandingPageConfig,
} from "../LandingPage/config";
import { LandingSectionPreview } from "../LandingPage/LandingPage";
import { formaLandingContent } from "../LandingPage/data";

const content = {
  title: "Build a page around your product",
  description: "Choose a section and give your work room to speak.",
  primaryAction: { label: "Explore sections", href: "/sections" },
  secondaryAction: { label: "See the workflow", href: "#workflow" },
};
const image = { src: "/light.webp", darkSrc: "/dark.webp", alt: "Product workspace" };
const config = { variant: "split-product" as const, image };

describe("Hero Split Product", () => {
  it("renders immediate copy, semantic links and reserved priority media", () => {
    const view = render(
      <HeroSplitProduct
        id="product"
        className="custom"
        aria-label="Product introduction"
        content={content}
        config={config}
        headingLevel="h2"
      />
    );
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(content.title);
    expect(screen.getByRole("link", { name: content.primaryAction.label })).toHaveAttribute(
      "href",
      "/sections"
    );
    expect(screen.getByRole("img")).toHaveAttribute("loading", "eager");
    expect(screen.getByRole("img")).toHaveAttribute("width", "1200");
    expect(view.container.querySelector("#product")).toHaveClass("custom");
    expect(view.container.querySelector("h2")?.closest('[style*="opacity"]')).toBeNull();
  });
  it("uses a text-only layout and omits empty actions and unsourced proof", () => {
    render(
      <HeroSplitProduct
        content={{
          ...content,
          primaryAction: { label: "Missing", href: "" },
          secondaryAction: undefined,
        }}
        config={{ variant: "split-product", proof: { label: "Claim", sourceUrl: "" } }}
      />
    );
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByRole("heading").closest("section")).toHaveAttribute(
      "data-has-media",
      "false"
    );
  });
  it("recovers from failed artwork when the theme changes and falls back to light artwork", () => {
    const view = render(
      <BrandScope brand={pilotBrands[0]}>
        <HeroSplitProduct content={content} config={config} />
      </BrandScope>
    );
    fireEvent.error(screen.getByRole("img"));
    expect(screen.getByRole("status")).toHaveTextContent(image.alt);
    view.rerender(
      <BrandScope brand={{ ...pilotBrands[0], mode: "dark" }}>
        <HeroSplitProduct content={content} config={config} />
      </BrandScope>
    );
    expect(screen.getByRole("img")).toHaveAttribute("src", image.darkSrc);
    view.rerender(
      <BrandScope brand={{ ...pilotBrands[0], mode: "dark" }}>
        <HeroSplitProduct
          content={content}
          config={{ ...config, image: { ...image, darkSrc: undefined } }}
        />
      </BrandScope>
    );
    expect(screen.getByRole("img")).toHaveAttribute("src", image.src);
  });
  it("honors motion off after image loading and exposes sourced proof", async () => {
    const view = render(
      <LandingMotionContext.Provider
        value={{ reveal: "off", autoplay: false, smoothScroll: false }}
      >
        <HeroSplitProduct
          content={content}
          config={{
            ...config,
            proof: { label: "Read the source", sourceUrl: "https://example.com/case-study" },
          }}
        />
      </LandingMotionContext.Provider>
    );
    await act(async () => {
      fireEvent.load(screen.getByRole("img"));
    });
    expect(view.container.querySelector(".hb-split-product-accent")).toBeNull();
    expect(screen.getByRole("link", { name: "Read the source" })).toHaveAttribute(
      "href",
      "https://example.com/case-study"
    );
  });
  it("round-trips the new selection through recipe/export and accepts old content maps", () => {
    const page = createLandingPageConfig();
    expect(parseLandingPageConfig(JSON.parse(JSON.stringify(page)))).toEqual(page);
    page.sections = page.sections.map((section) =>
      section.type === "hero" ? { ...section, variant: "split-product" } : section
    );
    const recipe = JSON.parse(JSON.stringify(createLandingPageRecipe(page, formaLandingContent)));
    expect(parseLandingPageConfig(recipe.config)).toEqual(page);
    expect(createLandingPageCode(page)).toContain('"split-product"');
    const { "split-product": _newPreset, ...legacyVariants } = formaLandingContent.hero.variants;
    render(
      <LandingSectionPreview
        selection={{ type: "hero", variant: "split-product", enabled: true }}
        brand={page.brand}
        content={{
          ...formaLandingContent,
          hero: { ...formaLandingContent.hero, variants: legacyVariants },
        }}
      />
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      formaLandingContent.hero.content.title
    );
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
