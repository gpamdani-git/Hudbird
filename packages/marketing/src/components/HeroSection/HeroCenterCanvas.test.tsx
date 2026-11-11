import * as React from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HeroCenterCanvas, HeroCenterVideo } from "./HeroCenterCanvas";
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
  title: "Design systems with tactile craft",
  description: "One unified canvas for your entire product interface.",
  primaryAction: { label: "Get started", href: "/signup" },
  secondaryAction: { label: "Documentation", href: "/docs" },
};

const image = {
  src: "/canvas-desktop.webp",
  darkSrc: "/canvas-dark-desktop.webp",
  mobileSrc: "/canvas-mobile.webp",
  darkMobileSrc: "/canvas-dark-mobile.webp",
  alt: "Unified workspace canvas",
  caption: "The complete workspace canvas with real-time layout inspector.",
};

const config = { variant: "center-canvas" as const, image };

describe("Hero Center Canvas", () => {
  it("renders centered copy, single primary CTA, and responsive media canvas", () => {
    const view = render(
      <HeroCenterCanvas
        id="hero-canvas"
        className="custom-canvas"
        content={content}
        config={config}
        headingLevel="h1"
      />
    );

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(content.title);
    expect(screen.getByRole("link", { name: content.primaryAction.label })).toHaveAttribute(
      "href",
      "/signup"
    );
    expect(screen.getByRole("link", { name: content.secondaryAction.label })).toHaveAttribute(
      "href",
      "/docs"
    );

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("loading", "eager");
    expect(img).toHaveAttribute("fetchpriority", "high");
    expect(img).toHaveAttribute("width", "1024");
    expect(img).toHaveAttribute("height", "576");

    // Picture element with mobile source
    const picture = view.container.querySelector("picture");
    expect(picture).toBeTruthy();
    const source = picture?.querySelector("source");
    expect(source).toHaveAttribute("media", "(max-width: 639px)");
    expect(source).toHaveAttribute("srcset", image.mobileSrc);

    expect(view.container.querySelector("#hero-canvas")).toHaveClass("custom-canvas");
    expect(view.container.querySelector("section")).toHaveAttribute("data-has-media", "true");
  });

  it("omits media figure and collapses spacing when media is empty", () => {
    const view = render(
      <HeroCenterCanvas
        content={{
          ...content,
          primaryAction: { label: "Action", href: "/action" },
          secondaryAction: undefined,
        }}
        config={{ variant: "center-canvas", image: undefined }}
      />
    );

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(view.container.querySelector("picture")).toBeNull();
    expect(view.container.querySelector("figure")).toBeNull();
    expect(view.container.querySelector("section")).toHaveAttribute("data-has-media", "false");
    expect(screen.getByRole("link", { name: "Action" })).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: content.secondaryAction.label })
    ).not.toBeInTheDocument();
  });

  it("handles image load failure gracefully by showing accessible status text", () => {
    render(<HeroCenterCanvas content={content} config={config} />);
    fireEvent.error(screen.getByRole("img"));
    expect(screen.getByRole("status")).toHaveTextContent(image.alt);
  });

  it("adapts artwork according to brand mode (light vs dark)", () => {
    const view = render(
      <BrandScope brand={pilotBrands[0]}>
        <HeroCenterCanvas content={content} config={config} />
      </BrandScope>
    );
    expect(screen.getByRole("img")).toHaveAttribute("src", image.src);

    view.rerender(
      <BrandScope brand={{ ...pilotBrands[0], mode: "dark" }}>
        <HeroCenterCanvas content={content} config={config} />
      </BrandScope>
    );
    expect(screen.getByRole("img")).toHaveAttribute("src", image.darkSrc);
  });

  it("honors motion off by revealing caption immediately and omitting motion styles", () => {
    const view = render(
      <LandingMotionContext.Provider
        value={{ reveal: "off", autoplay: false, smoothScroll: false }}
      >
        <HeroCenterCanvas content={content} config={config} />
      </LandingMotionContext.Provider>
    );

    const caption = view.container.querySelector("figcaption");
    expect(caption).toHaveAttribute("data-visible", "true");
    expect(view.container.querySelector("section")).toHaveAttribute("data-motion", "off");
  });

  it("round-trips the center-canvas selection through recipe/export and works in LandingSectionPreview", () => {
    const page = createLandingPageConfig();
    page.sections = page.sections.map((section) =>
      section.type === "hero" ? { ...section, variant: "center-canvas" } : section
    );
    expect(parseLandingPageConfig(JSON.parse(JSON.stringify(page)))).toEqual(page);

    const recipe = JSON.parse(JSON.stringify(createLandingPageRecipe(page, formaLandingContent)));
    expect(parseLandingPageConfig(recipe.config)).toEqual(page);
    expect(createLandingPageCode(page)).toContain('"center-canvas"');

    const view = render(
      <LandingSectionPreview
        selection={{ type: "hero", variant: "center-canvas", enabled: true }}
        brand={page.brand}
        content={formaLandingContent}
      />
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      formaLandingContent.hero.content.title
    );
    expect(view.container.querySelector('[data-landing-section="hero"]')).toBeTruthy();
  });

  it("renders an accessible play button and opens fullscreen video player on click", async () => {
    render(<HeroCenterCanvas content={content} config={config} />);
    const playBtn = screen.getByRole("button", { name: "Play video walkthrough" });
    expect(playBtn).toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(playBtn);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");

    const closeBtn = screen.getByRole("button", { name: "Close video player" });
    fireEvent.click(closeBtn);
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("disables video player trigger when videoUrl is explicitly empty", () => {
    render(<HeroCenterCanvas content={content} config={{ ...config, videoUrl: "" }} />);
    expect(
      screen.queryByRole("button", { name: "Play video walkthrough" })
    ).not.toBeInTheDocument();
  });

  it("renders with HeroCenterVideo alias and center-video variant cleanly", () => {
    render(<HeroCenterVideo content={content} config={{ variant: "center-video", image }} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(content.title);
    expect(screen.getByRole("button", { name: "Play video walkthrough" })).toBeInTheDocument();
  });
});
