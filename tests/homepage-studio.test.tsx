import { fireEvent, render, screen, within } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { HomepageStudioHero } from "../apps/docs/src/components/landing/HomepageStudioHero";
import { HomepageNavigation } from "../apps/docs/src/components/landing/HomepageNavigation";
import { navigationData } from "../apps/docs/src/navData";

it("links visitors to docs and the builder, and uses the documented inventory for proof", () => {
  render(<HomepageStudioHero />);
  expect(screen.getByRole("link", { name: "View Documentation" })).toHaveAttribute(
    "href",
    "/#/docs"
  );
  expect(screen.getByRole("link", { name: "Get Started" })).toHaveAttribute(
    "href",
    "/#/marketing/landing-builder"
  );
  const proof = within(screen.getByRole("navigation", { name: "Explore the Hudbird catalog" }));
  for (const title of ["Core Components", "Signature Blocks"]) {
    const group = navigationData.find((group) => group.title === title)!;
    expect(
      proof.getByRole("link", { name: new RegExp(group.items.length + "\\s*" + title) })
    ).toHaveAttribute("href", "/#" + group.items[0].path);
  }
});

it("opens the homepage directory and sends the CLI action to installation", () => {
  render(<HomepageNavigation mode="light" onToggle={vi.fn()} />);
  expect(screen.getByRole("link", { name: "Install CLI" })).toHaveAttribute(
    "href",
    "/#/installation"
  );
  const more = screen.getByRole("button", { name: "More links" });
  fireEvent.click(more);
  expect(more).toHaveAttribute("aria-expanded", "true");
  expect(screen.getByRole("link", { name: "Signature blocks" })).toHaveAttribute(
    "href",
    "/#/signature/morphing-island"
  );
  fireEvent.keyDown(more, { key: "Escape" });
  expect(more).toHaveAttribute("aria-expanded", "false");
});
