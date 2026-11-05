import * as React from "react";
import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { BrandProfile, HeroContent } from "@hudbird/schemas";
import { LandingBuilderShowcase } from "./index";

const brand: BrandProfile = {
  id: "test-brand",
  name: "Test brand",
  primary: "#2457d6",
  fontFamily: "sans-serif",
  radius: "soft",
  density: "comfortable",
  mode: "light",
};
const content: HeroContent = {
  title: "A shared hero",
  description: "The content and brand stay in place.",
  primaryAction: { label: "Start", href: "#start" },
};
const image = {
  src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E",
  alt: "Preview",
};
const variants = [
  {
    id: "centered",
    label: "Centered",
    description: "Centered preview",
    config: { variant: "centered" as const, image },
  },
  {
    id: "split",
    label: "Split",
    description: "Split preview",
    config: { variant: "split" as const, image },
  },
  {
    id: "interactive",
    label: "Interactive",
    description: "Interactive preview",
    config: {
      variant: "interactive" as const,
      tabs: [{ id: "one", label: "One", title: "One", description: "One", items: ["One"] }],
    },
  },
];

describe("LandingBuilderShowcase", () => {
  it("shows the layout choices together and uses dark artwork for the gallery", () => {
    render(
      <LandingBuilderShowcase
        brand={{ ...brand, mode: "dark" }}
        content={content}
        variants={[
          {
            ...variants[0],
            config: { variant: "centered", image: { ...image, darkSrc: "/dark.png" } },
          },
          ...variants.slice(1),
        ]}
        initialVariant="split"
        builderHref="/builder"
      />
    );
    const gallery = screen.getByRole("tablist", { name: "Hero layout" });
    expect(
      within(gallery)
        .getAllByRole("tab")
        .map((tab) => tab.textContent)
    ).toEqual(["Centered", "Split", "Interactive"]);
    expect(gallery.querySelector("img")).toHaveAttribute("src", "/dark.png");
    expect(
      screen.getByRole("heading", { name: "Change the layout. Keep the system." })
    ).toBeVisible();
    fireEvent.click(within(gallery).getByRole("tab", { name: "Interactive" }));
    const panel = screen.getByRole("tabpanel", { name: "Interactive" });
    expect(within(panel).getByText("Interactive preview")).toBeVisible();
    expect(within(panel).getByRole("tab", { name: "One" })).toBeVisible();
  });

  it("switches variants while retaining the shared brand and content", () => {
    const view = render(
      <LandingBuilderShowcase
        brand={brand}
        content={content}
        variants={variants}
        initialVariant="centered"
        builderHref="/builder"
      />
    );

    expect(view.container.querySelector("[data-builder-preview='centered']")).toHaveAttribute(
      "data-brand",
      brand.id
    );
    fireEvent.click(screen.getByRole("tab", { name: "Split" }));
    expect(view.container.querySelector("[data-builder-preview='split']")).toHaveAttribute(
      "data-brand",
      brand.id
    );
    expect(screen.getByRole("heading", { level: 3, name: content.title })).toBeVisible();
    expect(screen.getByRole("status")).toHaveTextContent("Split preview selected.");
    expect(screen.getByRole("status")).not.toHaveTextContent(content.description);
    expect(screen.getByRole("link", { name: "Open the full page builder" })).toHaveAttribute(
      "href",
      "/builder"
    );
  });

  it("supports arrow-key tab selection", () => {
    render(
      <LandingBuilderShowcase
        brand={brand}
        content={content}
        variants={variants}
        initialVariant="centered"
        builderHref="/builder"
      />
    );
    const first = screen.getByRole("tab", { name: "Centered" });
    first.focus();
    fireEvent.keyDown(screen.getByRole("tablist", { name: "Hero layout" }), {
      key: "ArrowRight",
    });
    expect(screen.getByRole("tab", { name: "Split" })).toHaveAttribute("aria-selected", "true");
  });
});
