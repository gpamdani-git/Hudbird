import * as React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroRemitGrid } from "./HeroRemitGrid";
import { HeroSection } from "./HeroSection";
import type { HeroContent, HeroRemitGridConfig } from "@hudbird/schemas";

const sampleContent: HeroContent = {
  title: "Invoices that chase themselves.",
  description:
    "Send, track and get paid faster. Remit follows up on late invoices so you don't have to.",
  primaryAction: { label: "Start free", href: "#start" },
  secondaryAction: { label: "Watch demo", href: "#demo" },
};

const sampleConfig: HeroRemitGridConfig = {
  variant: "remit-grid",
  badgeText: "New · automatic reminders",
  statLabel: "PAID THIS MONTH",
  statValue: "$24,800",
  chartBars: [38, 55, 46, 75, 62, 100],
  invoiceList: [
    { name: "Northwind", status: "Paid", isPaid: true },
    { name: "Studio Park", status: "Due in 3d", isPaid: false },
    { name: "Acme Co.", status: "Paid", isPaid: true },
  ],
  floatingReminder: {
    tag: "REMINDER SENT",
    title: "Invoice #1042 paid in 2 days",
    badge: "On time",
  },
  metricCards: [
    {
      title: "2 days",
      description: "average time to get paid",
      footerText: "Original concept, not client work Shubhank Agrey",
      footerHref: "#concept",
      imageSrc:
        "https://images.pexels.com/photos/5882678/pexels-photo-5882678.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      title: "Auto",
      description: "friendly reminders on late invoices",
      footerText: "friendly reminders on late invoices",
      footerHref: "#reminders",
      imageSrc:
        "https://images.pexels.com/photos/5951735/pexels-photo-5951735.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      title: "1 click",
      description: "pay links for every client",
      footerText: "pay links for every client",
      footerHref: "#paylinks",
      imageSrc:
        "https://images.pexels.com/photos/7582781/pexels-photo-7582781.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ],
  credit: {
    label: "Original concept, not client work · Shubhank Agrey",
    href: "https://dribbble.com",
  },
};

describe("HeroRemitGrid (Remit Grid — Theme & Hudbird UI)", () => {
  it("renders main headline, badge, and live dashboard with floating reminder card", () => {
    render(<HeroRemitGrid content={sampleContent} config={sampleConfig} />);

    expect(screen.getByText("New · automatic reminders")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Invoices that chase themselves."
    );
    expect(
      screen.getByText(
        "Send, track and get paid faster. Remit follows up on late invoices so you don't have to."
      )
    ).toBeInTheDocument();

    // Primary and secondary action buttons
    expect(screen.getByRole("link", { name: "Start free" })).toHaveAttribute("href", "#start");
    expect(screen.getByRole("link", { name: "Watch demo" })).toHaveAttribute("href", "#demo");

    // Dashboard card content
    expect(screen.getByText("PAID THIS MONTH")).toBeInTheDocument();
    expect(screen.getByText("$24,800")).toBeInTheDocument();
    expect(screen.getByText("Northwind")).toBeInTheDocument();
    expect(screen.getByText("Studio Park")).toBeInTheDocument();
    expect(screen.getByText("Acme Co.")).toBeInTheDocument();

    // Floating card content
    expect(screen.getByText("REMINDER SENT")).toBeInTheDocument();
    expect(screen.getByText("Invoice #1042 paid in 2 days")).toBeInTheDocument();
    expect(screen.getByText("On time")).toBeInTheDocument();
  });

  it("does not render separate navbar or logo header inside hero section", () => {
    render(<HeroRemitGrid content={sampleContent} config={sampleConfig} />);
    expect(screen.queryByText("Remit.")).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Product" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Pricing" })).not.toBeInTheDocument();
  });

  it("does not render the removed feature cards row", () => {
    render(<HeroRemitGrid content={sampleContent} config={sampleConfig} />);
    expect(screen.queryByRole("heading", { level: 3, name: "themselves" })).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /invoices so you don't have to/i })
    ).not.toBeInTheDocument();
  });

  it("renders 3-column metric cards and credit footer", () => {
    render(<HeroRemitGrid content={sampleContent} config={sampleConfig} />);

    expect(screen.getAllByText("2 days")[0]).toBeInTheDocument();
    expect(screen.getAllByText("average time to get paid")[0]).toBeInTheDocument();

    expect(screen.getAllByText("Auto")[0]).toBeInTheDocument();
    expect(screen.getAllByText("friendly reminders on late invoices")[0]).toBeInTheDocument();

    expect(screen.getAllByText("1 click")[0]).toBeInTheDocument();
    expect(screen.getAllByText("pay links for every client")[0]).toBeInTheDocument();

    expect(
      screen.getByText(/Original concept, not client work · Shubhank Agrey/i)
    ).toBeInTheDocument();
  });

  it("delegates from top-level HeroSection router for remit-grid variant", () => {
    render(<HeroSection content={sampleContent} config={sampleConfig} />);
    expect(screen.getByText("$24,800")).toBeInTheDocument();
    expect(screen.getByText("Invoice #1042 paid in 2 days")).toBeInTheDocument();
  });
});
