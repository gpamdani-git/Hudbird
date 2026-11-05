import * as React from "react";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LandingHeroShowcase, type LandingHeroShowcaseContent } from "./index";

const content: LandingHeroShowcaseContent = {
  eyebrow: "The system is ready",
  title: "Give AI a system",
  accentTitle: "you are proud to ship.",
  description: "Components, layout rules, and source code in one coherent system.",
  primaryAction: { label: "Open builder", href: "/builder" },
  secondaryAction: { label: "Browse sections", href: "/sections" },
};

describe("LandingHeroShowcase", () => {
  it("renders one heading, real actions, and a Hudbird-composed product canvas", () => {
    render(<LandingHeroShowcase content={content} />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Give AI a system you are proud to ship."
    );
    expect(screen.getAllByRole("link", { name: "Open builder" })[0]).toHaveAttribute(
      "href",
      "/builder"
    );
    expect(screen.getByRole("link", { name: "Browse sections" })).toHaveAttribute(
      "href",
      "/sections"
    );
    expect(screen.getByLabelText("Hudbird design system preview")).toBeVisible();
    expect(screen.getByText("Core components")).toBeVisible();
    expect(screen.getByText("Landing sections")).toBeVisible();
  });
});
