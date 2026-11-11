import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroEditorialPhoto } from "./HeroEditorialPhoto";
import { HeroSection } from "./HeroSection";
import type { HeroContent, HeroSectionConfig } from "@hudbird/schemas";

const sampleContent: HeroContent = {
  title: "A single considered space for design leadership.",
  description: "Architecture, brand identity, and engineering crafted without agency compromise.",
  primaryAction: { label: "Explore the studio", href: "#studio" },
  secondaryAction: { label: "Selected work", href: "#work" },
};

const sampleConfig: Extract<HeroSectionConfig, { variant: "editorial-photo" }> = {
  variant: "editorial-photo",
  image: {
    src: "https://images.pexels.com/photos/21529967/pexels-photo-21529967.jpeg?auto=compress&cs=tinysrgb&w=1600",
    portraitSrc:
      "https://images.pexels.com/photos/21529967/pexels-photo-21529967.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Lamp over table and chairs in a minimalist monochrome room",
    caption: "Monochrome room architecture · Pexels 21529967",
    focalPoint: "center",
  },
  credit: {
    label: "Photo via Pexels",
    href: "https://www.pexels.com/photo/lamp-over-table-and-chairs-in-room-21529967/",
  },
};

describe("HeroEditorialPhoto (Obsidian 02-03)", () => {
  it("renders DOM in correct order: H1, summary, primary CTA, secondary CTA, and credit link", () => {
    const { container } = render(
      <HeroEditorialPhoto content={sampleContent} config={sampleConfig} />
    );

    // Headline
    const heading = screen.getAllByRole("heading", { level: 1 })[0];
    expect(heading).toHaveTextContent("A single considered space for design leadership.");

    // Summary description
    expect(
      screen.getAllByText(/Architecture, brand identity, and engineering/i)[0]
    ).toBeInTheDocument();

    // Primary CTA
    const primaryBtn = screen.getAllByRole("link", { name: "Explore the studio" })[0];
    expect(primaryBtn).toHaveAttribute("href", "#studio");

    // Secondary CTA
    const secondaryBtn = screen.getAllByRole("link", { name: "Selected work" })[0];
    expect(secondaryBtn).toHaveAttribute("href", "#work");

    // Credit Link
    const creditLink = screen.getAllByRole("link", { name: /Photo via Pexels/i })[0];
    expect(creditLink).toHaveAttribute(
      "href",
      "https://www.pexels.com/photo/lamp-over-table-and-chairs-in-room-21529967/"
    );
    expect(creditLink).toHaveAttribute("target", "_blank");
    expect(creditLink).toHaveAttribute("rel", "noreferrer");

    // Verify DOM structure within panel contains H1 before CTA
    const panel = container.querySelector(".hb-editorial-copy-panel");
    expect(panel).not.toBeNull();
  });

  it("renders responsive picture tag with portrait source and eager loading", () => {
    const { container } = render(
      <HeroEditorialPhoto content={sampleContent} config={sampleConfig} />
    );

    const picture = container.querySelector("picture");
    expect(picture).not.toBeNull();

    const source = picture?.querySelector("source[media='(max-width: 639px)']");
    expect(source).toHaveAttribute("srcSet", sampleConfig.image?.portraitSrc);

    const img = container.querySelector("img");
    expect(img).toHaveAttribute("src", sampleConfig.image?.src);
    expect(img).toHaveAttribute("alt", sampleConfig.image?.alt);
    expect(img).toHaveAttribute("loading", "eager");
    expect(img).toHaveAttribute("fetchpriority", "high");
  });

  it("gracefully falls back to text-only mode (max 680px) when media is missing", () => {
    const missingMediaConfig: Extract<HeroSectionConfig, { variant: "editorial-photo" }> = {
      variant: "editorial-photo",
    };

    const { container } = render(
      <HeroEditorialPhoto content={sampleContent} config={missingMediaConfig} />
    );

    // Section marked as fallback with no media
    const section = container.querySelector("[data-hero-variant='editorial-photo']");
    expect(section).toHaveAttribute("data-has-media", "false");
    expect(container.querySelector("picture")).toBeNull();
    expect(container.querySelector("img")).toBeNull();

    // Container max-width 680px constraint
    const fallbackBox = container.querySelector(".max-w-\\[680px\\]");
    expect(fallbackBox).not.toBeNull();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "A single considered space for design leadership."
    );
  });

  it("renders custom heading levels (h2, h3)", () => {
    render(<HeroEditorialPhoto content={sampleContent} config={sampleConfig} headingLevel="h2" />);
    expect(screen.getAllByRole("heading", { level: 2 })[0]).toBeInTheDocument();
  });

  it("integrates seamlessly through HeroSection polymorphic dispatcher", () => {
    render(<HeroSection content={sampleContent} config={sampleConfig} />);
    expect(
      screen.getAllByRole("heading", {
        name: "A single considered space for design leadership.",
      })[0]
    ).toBeInTheDocument();
  });
});
