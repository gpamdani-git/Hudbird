import * as React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BrandScope } from "@hudbird/marketing";
import type { BrandProfile } from "@hudbird/schemas";
import { HomepagePlayground } from "../apps/docs/src/components/landing/HomepagePlayground";

const pageBrand: BrandProfile = {
  id: "page-brand",
  name: "Page brand",
  primary: "#75caff",
  fontFamily: "sans-serif",
  radius: "soft",
  density: "comfortable",
  mode: "dark",
};

describe("HomepagePlayground", () => {
  it("changes the local brand while preserving the sample content and page brand", () => {
    const { container } = render(
      <BrandScope brand={pageBrand}>
        <HomepagePlayground />
      </BrandScope>
    );
    const sample = screen.getByRole("region", { name: "Sample landing page" });
    const preview = sample.closest<HTMLElement>("[data-brand]")!;
    const page = container.querySelector<HTMLElement>("[data-brand='page-brand']")!;
    const sampleTitle = within(sample).getByRole("heading").textContent;

    expect(preview).toHaveAttribute("data-brand-mode", "dark");
    fireEvent.click(screen.getByRole("button", { name: "Clay brand" }));
    expect(screen.getByRole("button", { name: "Clay brand" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    expect(preview.style.getPropertyValue("--hb-accent")).toBe("#e4ab8e");
    expect(preview.style.getPropertyValue("--hb-font")).toContain("Georgia");
    expect(preview.style.getPropertyValue("--hb-radius")).toBe("0px");
    expect(within(sample).getByRole("heading")).toHaveTextContent(sampleTitle!);
    expect(page.style.getPropertyValue("--hb-accent")).toBe("#75caff");

    fireEvent.click(screen.getByRole("button", { name: "Sage brand" }));
    expect(preview.style.getPropertyValue("--hb-accent")).toBe("#b9d0aa");
    expect(preview.style.getPropertyValue("--hb-radius")).toBe("24px");
    expect(screen.getByRole("status")).toHaveTextContent("Sage brand, Split layout selected.");
  });

  it("switches compositions with arrow keys and retains the chosen brand", () => {
    render(<HomepagePlayground />);
    fireEvent.click(screen.getByRole("button", { name: "Clay brand" }));
    const split = screen.getByRole("tab", { name: "Split" });
    split.focus();
    fireEvent.keyDown(screen.getByRole("tablist", { name: "Sample website layout" }), {
      key: "ArrowRight",
    });

    const centered = screen.getByRole("tab", { name: "Centered" });
    expect(centered).toHaveFocus();
    expect(centered).toHaveAttribute("aria-selected", "true");
    const panel = screen.getByRole("tabpanel", { name: "Centered" });
    expect(panel.querySelector("[data-preview-layout='centered']")).toHaveAttribute(
      "data-brand",
      "clay"
    );
    expect(
      within(panel).getByRole("heading", { name: "Your next idea starts here." })
    ).toBeVisible();
    expect(screen.getByRole("status")).toHaveTextContent("Clay brand, Centered layout selected.");
  });

  it("follows the page mode and sends the actions to the real builder and sections", () => {
    const view = render(
      <BrandScope brand={pageBrand}>
        <HomepagePlayground />
      </BrandScope>
    );
    view.rerender(
      <BrandScope brand={{ ...pageBrand, mode: "light" }}>
        <HomepagePlayground />
      </BrandScope>
    );
    expect(
      screen.getByRole("region", { name: "Sample landing page" }).closest("[data-brand]")
    ).toHaveAttribute("data-brand-mode", "light");
    expect(screen.getByRole("link", { name: "Open the page builder" })).toHaveAttribute(
      "href",
      "/#/marketing/landing-builder"
    );
    expect(screen.getByRole("link", { name: "Make it yours" })).toHaveAttribute(
      "href",
      "/#/marketing/landing-builder"
    );
    expect(screen.getByRole("link", { name: "Browse the sections" })).toHaveAttribute(
      "href",
      "/#/marketing/landing-sections"
    );
  });
});
