import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LandingNavbar } from "./index";
import { resolveNavbarPreset, NAVBAR_PRESETS } from "./presetMatrix";
import type { NavbarPresetId } from "@hudbird/schemas";

const mockBrand = {
  id: "test-brand",
  name: "Acme Corp",
  primary: "#2457d6",
  fontFamily: "Inter, sans-serif",
  radius: "soft" as const,
  density: "comfortable" as const,
  mode: "light" as const,
};

const mockContent = {
  action: { label: "Get started", href: "#start" },
  links: [
    { label: "Features", href: "#features", description: "All modern features" },
    { label: "Pricing", href: "#pricing", description: "Transparent plans" },
    { label: "About", href: "#about", description: "Our company story" },
  ],
};

describe("LandingNavbar 12-Preset System", () => {
  it("resolves all 12 preset IDs and legacy aliases correctly", () => {
    const allIds: NavbarPresetId[] = [
      "nav-01",
      "nav-02",
      "nav-03",
      "nav-04",
      "nav-05",
      "nav-06",
      "nav-07",
      "nav-08",
      "nav-09",
      "nav-10",
      "nav-11",
      "nav-12",
    ];

    for (const id of allIds) {
      const meta = resolveNavbarPreset(id);
      expect(meta.id).toBe(id);
      expect(NAVBAR_PRESETS[id]).toBeDefined();
    }

    expect(resolveNavbarPreset("simple").id).toBe("nav-01");
    expect(resolveNavbarPreset("centered").id).toBe("nav-04");
    expect(resolveNavbarPreset("mega").id).toBe("nav-03");
    expect(resolveNavbarPreset("sidebar-1").id).toBe("nav-06");
    expect(resolveNavbarPreset("sidebar-2").id).toBe("nav-05");
  });

  const presetIds: NavbarPresetId[] = [
    "nav-01",
    "nav-02",
    "nav-03",
    "nav-04",
    "nav-05",
    "nav-06",
    "nav-07",
    "nav-08",
    "nav-09",
    "nav-10",
    "nav-11",
    "nav-12",
  ];

  for (const id of presetIds) {
    it(`renders preset ${id} (${NAVBAR_PRESETS[id].name}) with brand and links`, () => {
      const { container, unmount } = render(
        <LandingNavbar variant={id} brand={mockBrand} content={mockContent} />
      );

      expect(container.querySelector(`[data-navbar-preset="${id}"]`)).not.toBeNull();
      expect(screen.getAllByText("Acme Corp").length).toBeGreaterThan(0);
      if (id === "nav-05") {
        const menuBtn = screen.getByRole("button", { name: /Open fullscreen navigation menu/i });
        fireEvent.click(menuBtn);
      }
      expect(screen.getAllByText("Features").length).toBeGreaterThan(0);
      unmount();
    });
  }

  it("nav-03 (SaaS Platform) toggles mega menu on click", () => {
    render(<LandingNavbar variant="nav-03" brand={mockBrand} content={mockContent} />);

    const trigger = screen.getByRole("button", { name: /Platform & Products/i });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(/Platform Solutions/i)).toBeInTheDocument();
  });

  it("nav-08 (Corporate Classic) toggles solutions dropdown", () => {
    render(<LandingNavbar variant="nav-08" brand={mockBrand} content={mockContent} />);

    const trigger = screen.getByRole("button", { name: /Solutions/i });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(/Enterprise Compliance/i)).toBeInTheDocument();
  });

  it("nav-05 (Creative Agency) opens fullscreen overlay", () => {
    render(<LandingNavbar variant="nav-05" brand={mockBrand} content={mockContent} />);

    const menuButton = screen.getByRole("button", { name: /Open fullscreen navigation menu/i });
    fireEvent.click(menuButton);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(/Global Digital Practice/i)).toBeInTheDocument();
  });
});
