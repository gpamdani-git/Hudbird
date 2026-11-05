import * as React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HomepageAssembly } from "../apps/docs/src/components/landing/HomepageAssembly";

describe("HomepageAssembly", () => {
  it("connects every selected layer to its explanation, illustration, and catalog link", async () => {
    render(<HomepageAssembly />);
    expect(screen.getByRole("tab", { name: "Core" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("link", { name: "Explore core components" })).toHaveAttribute(
      "href",
      "/#/button"
    );

    for (const [label, title, link, href, caption] of [
      [
        "Block",
        "One job, composed.",
        "Explore a signature block",
        "/#/signature/morphing-island",
        "The same primitives, grouped into a content block.",
      ],
      [
        "Section",
        "Give the content its place.",
        "Explore marketing sections",
        "/#/marketing/landing-sections",
        "A section adds spacing, structure, and a page boundary.",
      ],
      [
        "Template",
        "A whole page. Still your pieces.",
        "Explore templates",
        "/#/templates",
        "Sections become a page, with the original pieces still inside.",
      ],
    ]) {
      const tab = screen.getByRole("tab", { name: label });
      fireEvent.click(tab);
      await waitFor(() => expect(screen.getByRole("heading", { name: title })).toBeVisible());
      const panel = screen.getByRole("tabpanel", { name: label });
      expect(tab).toHaveAttribute("aria-controls", panel.id);
      expect(tab).toHaveAttribute("aria-selected", "true");
      expect(screen.getByRole("figure", { name: caption })).toBeVisible();
      expect(screen.getByRole("link", { name: link })).toHaveAttribute("href", href);
    }
    expect(screen.getByRole("link", { name: "View the Button component" })).toHaveAttribute(
      "href",
      "/#/button"
    );
  });

  it("supports arrow, Home, and End selection when reduced motion is requested", () => {
    const query = vi.spyOn(window, "matchMedia").mockImplementation((media) => ({
      media,
      matches: media === "(prefers-reduced-motion: reduce)",
      onchange: null,
      addListener() {},
      removeListener() {},
      addEventListener() {},
      removeEventListener() {},
      dispatchEvent: () => true,
    }));
    try {
      render(<HomepageAssembly />);
      const core = screen.getByRole("tab", { name: "Core" });
      core.focus();
      fireEvent.keyDown(core, { key: "ArrowRight" });
      const block = screen.getByRole("tab", { name: "Block" });
      expect(block).toHaveFocus();
      expect(screen.getByRole("tabpanel", { name: "Block" })).toBeVisible();
      fireEvent.keyDown(block, { key: "End" });
      const template = screen.getByRole("tab", { name: "Template" });
      expect(template).toHaveFocus();
      expect(screen.getByRole("tabpanel", { name: "Template" })).toBeVisible();
      fireEvent.keyDown(template, { key: "Home" });
      expect(core).toHaveFocus();
      expect(core).toHaveAttribute("aria-selected", "true");
    } finally {
      query.mockRestore();
    }
  });
});
