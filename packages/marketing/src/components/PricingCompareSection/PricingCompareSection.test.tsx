import React from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { PricingCompareSection } from "./PricingCompareSection";
import { WebsiteProjectPage } from "../WebsiteProject/WebsiteProject";
import { addWebsitePage, createWebsiteProject } from "../WebsiteProject/config";

describe("PricingCompareSection", () => {
  it("renders editorial header, billing toggle, core Switch, underline Tabs, and plans", async () => {
    render(<PricingCompareSection />);

    expect(screen.getByText("Compare Plans")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Every Primitive, Token, and Workflow Compared",
      })
    ).toBeInTheDocument();

    expect(screen.getAllByRole("heading", { level: 3, name: "Starter" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("heading", { level: 3, name: "Pro" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("heading", { level: 3, name: "Enterprise" }).length).toBeGreaterThan(
      0
    );

    expect(screen.getAllByText("$23").length).toBeGreaterThan(0);
    fireEvent.click(screen.getByRole("button", { name: /Monthly/i }));
    await waitFor(() => {
      expect(screen.getAllByText("$29").length).toBeGreaterThan(0);
    });
  });

  it("filters identical rows when Differences only Switch is toggled and filters by underline Tabs", async () => {
    render(<PricingCompareSection />);

    expect(screen.getAllByText("WCAG 2.2 AA keyboard & ARIA").length).toBeGreaterThan(0);
    fireEvent.click(screen.getByRole("switch", { name: /Differences only/i }));
    await waitFor(() => {
      expect(screen.queryByText("WCAG 2.2 AA keyboard & ARIA")).not.toBeInTheDocument();
    });
    expect(screen.getAllByText("Production React primitives").length).toBeGreaterThan(0);

    fireEvent.click(screen.getByRole("tab", { name: "Motion & Multi-Page Builder" }));
    await waitFor(() => {
      expect(screen.queryByText("Production React primitives")).not.toBeInTheDocument();
    });
    expect(screen.getAllByText("Calibrated Motion & spring physics").length).toBeGreaterThan(0);
  });

  it("renders above the FAQ section on the pricing page template", () => {
    const project = addWebsitePage(createWebsiteProject(), "pricing", "pricing-page");
    const { container } = render(
      <WebsiteProjectPage project={project} pageId="pricing-page" onNavigate={vi.fn()} />
    );

    const sections = Array.from(container.querySelectorAll("[data-landing-section]")).map((el) =>
      el.getAttribute("data-landing-section")
    );
    const compareIdx = sections.indexOf("pricing-compare");
    const faqIdx = sections.indexOf("faq");

    expect(compareIdx).toBeGreaterThan(-1);
    expect(faqIdx).toBeGreaterThan(compareIdx);
  });
});
