import * as React from "react";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LandingNavbar } from "../LandingNavbar";
import { LandingFooter } from "../LandingFooter";
import { createLandingPageConfig } from "./config";
import { formaLandingContent } from "./data";

const brand = createLandingPageConfig().brand;

describe("landing navigation links", () => {
  it("supports real URLs in the navbar without changing target-based links", () => {
    render(
      <LandingNavbar
        variant="simple"
        content={{
          ...formaLandingContent.navbar,
          links: [
            {
              label: "Features",
              target: "features",
              description: "Internal feature section.",
            },
            {
              label: "Docs",
              href: "/docs",
              description: "Documentation.",
            },
          ],
        }}
        brand={brand}
      />
    );
    expect(screen.getByRole("link", { name: "Features" })).toHaveAttribute("href", "#features");
    expect(screen.getByRole("link", { name: "Docs" })).toHaveAttribute("href", "/docs");
  });

  it("supports real URLs in the simple footer", () => {
    render(
      <LandingFooter
        variant="simple"
        content={{
          ...formaLandingContent.footer,
          groups: [
            {
              title: "Links",
              links: [
                { label: "Builder", href: "/#/marketing/landing-builder" },
                { label: "GitHub", href: "https://github.com/gpamdani-git/Hudbird" },
              ],
            },
          ],
        }}
        brand={brand}
      />
    );
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/gpamdani-git/Hudbird"
    );
    expect(screen.getByRole("link", { name: "Builder" })).toHaveAttribute(
      "href",
      "/#/marketing/landing-builder"
    );
  });
});
