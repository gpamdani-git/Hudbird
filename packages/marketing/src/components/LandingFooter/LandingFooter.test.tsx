import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LandingFooter, FooterLocaleStatus, FooterContactAction } from "./index";
import { pilotBrands } from "../StartupPilot/demo-data";
import { LandingMotionContext } from "../LandingShared";

const brand = pilotBrands[0];

const defaultFooterContent = {
  description: "A shared place for projects, notes, and the next step.",
  note: "Forma is a Hudbird demo. Replace sample content before publishing.",
  groups: [
    {
      title: "Product",
      links: [
        { label: "Features", target: "features" as const },
        { label: "Benefits", target: "benefits" as const },
      ],
    },
    {
      title: "Explore",
      links: [
        { label: "Documentation", href: "/docs" },
        { label: "Integrations", href: "/integrations" },
      ],
    },
  ],
  locales: [
    { code: "en", label: "English (US)", href: "/en" },
    { code: "id", label: "Bahasa Indonesia", href: "/id" },
    { code: "ja", label: "日本語", href: "/ja" },
  ],
  activeLocale: "en",
  status: {
    label: "All systems operational",
    href: "https://status.hudbird.com",
    summary: "99.99% uptime",
    checkedAt: "Checked just now",
  },
  heading: "Bicarakan kebutuhan project Anda.",
  contactAction: {
    label: "Book a consultation",
    href: "https://cal.com/hudbird/intro",
  },
  contactLinks: [
    { type: "email" as const, label: "hello@hudbird.com", href: "mailto:hello@hudbird.com" },
    { type: "phone" as const, label: "+1 (555) 019-2834", href: "tel:+15550192834" },
    {
      type: "schedule" as const,
      label: "cal.com/hudbird/intro",
      href: "https://cal.com/hudbird/intro",
    },
  ],
  officeHours: "Mon–Fri · 9:00 – 18:00 WIB (UTC+7)",
  legalLinks: [
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Terms of Service", href: "#terms" },
  ],
};

describe("Footer Locale and Status (Obsidian 18-03)", () => {
  it("renders brand signature, verified service status, navigation, and language select", () => {
    render(<FooterLocaleStatus content={defaultFooterContent} brand={brand} />);

    expect(screen.getByText(brand.name)).toBeInTheDocument();
    expect(screen.getByText(defaultFooterContent.description)).toBeInTheDocument();

    // Status indicator
    const statusLink = screen.getByRole("link", {
      name: /All systems operational/i,
    });
    expect(statusLink).toHaveAttribute("href", "https://status.hudbird.com");
    expect(screen.getByText(/99.99% uptime/i)).toBeInTheDocument();

    // Language selector
    const select = screen.getByRole("combobox", { name: /Bahasa situs/i });
    expect(select).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "English (US)" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Bahasa Indonesia" })).toBeInTheDocument();

    // Legal & note
    expect(screen.getByText(defaultFooterContent.note)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Privacy Policy" })).toBeInTheDocument();
  });

  it("hides locale control when only one locale is available or no alternative href exists", () => {
    const singleLocaleContent = {
      ...defaultFooterContent,
      locales: [{ code: "en", label: "English", href: "/en" }],
    };
    render(<FooterLocaleStatus content={singleLocaleContent} brand={brand} />);
    expect(screen.queryByRole("combobox", { name: /Bahasa situs/i })).not.toBeInTheDocument();
  });

  it("does not claim operational without evidence when status data is absent", () => {
    const noStatusContent = {
      ...defaultFooterContent,
      status: { label: "", href: "https://status.example.com" },
    };
    render(<FooterLocaleStatus content={noStatusContent} brand={brand} />);
    // Falls back to neutral "Service status" link without claiming "operational" or "normal"
    const statusLink = screen.getByRole("link", { name: /Service status/i });
    expect(statusLink).toBeInTheDocument();
    expect(screen.queryByText(/operational/i)).not.toBeInTheDocument();
  });

  it("honors motion off profile", () => {
    const { container } = render(
      <LandingMotionContext.Provider
        value={{ reveal: "off", autoplay: false, smoothScroll: false }}
      >
        <FooterLocaleStatus content={defaultFooterContent} brand={brand} />
      </LandingMotionContext.Provider>
    );
    expect(container.querySelector("footer")).toHaveAttribute("data-motion", "off");
  });
});

describe("Footer Contact and Next Action (Obsidian 18-04)", () => {
  it("renders contact action panel with heading, primary CTA, and semantic address channels", () => {
    render(<FooterContactAction content={defaultFooterContent} brand={brand} />);

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      defaultFooterContent.heading
    );

    const cta = screen.getByRole("link", { name: /Book a consultation/i });
    expect(cta).toHaveAttribute("href", "https://cal.com/hudbird/intro");

    // Semantic address element
    const address = screen.getByText("Jalur komunikasi").closest("address");
    expect(address).toBeTruthy();

    const emailLink = screen.getByRole("link", { name: "hello@hudbird.com" });
    expect(emailLink).toHaveAttribute("href", "mailto:hello@hudbird.com");

    const phoneLink = screen.getByRole("link", { name: "+1 (555) 019-2834" });
    expect(phoneLink).toHaveAttribute("href", "tel:+15550192834");

    // Office hours with timezone
    expect(screen.getByText(defaultFooterContent.officeHours)).toBeInTheDocument();
  });

  it("promotes email to primary action without duplication when booking action is invalid", () => {
    const noBookingContent = {
      ...defaultFooterContent,
      contactAction: { label: "Book a consultation", href: "" }, // invalid href
    };

    render(<FooterContactAction content={noBookingContent} brand={brand} />);

    // Primary action is promoted to Email hello@hudbird.com
    const primaryCta = screen.getByRole("link", { name: /Email hello@hudbird.com/i });
    expect(primaryCta).toHaveAttribute("href", "mailto:hello@hudbird.com");

    // The email is not duplicated inside the address list
    const addressLinks = screen
      .getByText("Jalur komunikasi")
      .closest("address")
      ?.querySelectorAll("a");
    const addressHrefs = Array.from(addressLinks || []).map((a) => a.getAttribute("href"));
    expect(addressHrefs).not.toContain("mailto:hello@hudbird.com");
  });

  it("omits contact panel entirely when all channels and actions are absent", () => {
    const emptyChannelsContent = {
      ...defaultFooterContent,
      contactAction: undefined,
      contactLinks: [],
      officeHours: undefined,
    };

    const { container } = render(
      <FooterContactAction content={emptyChannelsContent} brand={brand} />
    );

    expect(container.querySelector(".hb-contact-action-panel")).toBeNull();
  });

  it("renders all navigation groups without truncation and styles links with hb-footer-nav-link", () => {
    const multiGroupContent = {
      ...defaultFooterContent,
      groups: [
        { title: "Product", links: [{ label: "Features", href: "#features" }] },
        { title: "Solutions", links: [{ label: "SaaS", href: "#saas" }] },
        { title: "Resources", links: [{ label: "Docs", href: "#docs" }] },
        { title: "Company", links: [{ label: "About", href: "#about" }] },
        { title: "Legal", links: [{ label: "Privacy", href: "#privacy" }] },
      ],
    };

    const { container } = render(<FooterContactAction content={multiGroupContent} brand={brand} />);

    // All 5 group titles are present
    expect(screen.getByText("Product")).toBeInTheDocument();
    expect(screen.getByText("Solutions")).toBeInTheDocument();
    expect(screen.getByText("Resources")).toBeInTheDocument();
    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByText("Legal")).toBeInTheDocument();

    // Links use hb-footer-nav-link class and are anchor tags (not buttons)
    const navLinks = container.querySelectorAll(".hb-footer-nav-link");
    expect(navLinks.length).toBeGreaterThanOrEqual(5);
    navLinks.forEach((link) => {
      expect(link.tagName.toLowerCase()).toBe("a");
    });
  });
});

describe("LandingFooter variant dispatch", () => {
  it("dispatches locale-status variant correctly", () => {
    const { container } = render(
      <LandingFooter variant="locale-status" content={defaultFooterContent} brand={brand} />
    );
    expect(container.querySelector('[data-footer-variant="locale-status"]')).toBeTruthy();
  });

  it("dispatches contact-action variant correctly", () => {
    const { container } = render(
      <LandingFooter variant="contact-action" content={defaultFooterContent} brand={brand} />
    );
    expect(container.querySelector('[data-footer-variant="contact-action"]')).toBeTruthy();
  });

  it("maintains compatibility with simple, columns, and centered variants using hb-footer-nav-link", () => {
    for (const variant of ["simple", "columns", "centered"] as const) {
      const view = render(
        <LandingFooter variant={variant} content={defaultFooterContent} brand={brand} />
      );
      expect(screen.getByText(brand.name)).toBeInTheDocument();
      const navLinks = view.container.querySelectorAll(".hb-footer-nav-link");
      expect(navLinks.length).toBeGreaterThan(0);
      navLinks.forEach((link) => {
        expect(link.tagName.toLowerCase()).toBe("a");
      });
      view.unmount();
    }
  });

  it("keeps menu links compact in simple and centered variants even when content has many groups", () => {
    const hugeGroupsContent = {
      ...defaultFooterContent,
      groups: [
        {
          title: "Product",
          links: [
            { label: "Features", target: "features" as const },
            { label: "Benefits", target: "benefits" as const },
            { label: "Workflow", target: "how-it-works" as const },
            { label: "Integrations", target: "integrations" as const },
            { label: "Pricing", target: "pricing" as const },
            { label: "Questions", target: "faq" as const },
          ],
        },
        {
          title: "Solutions",
          links: [
            { label: "SaaS", href: "#saas" },
            { label: "Fintech", href: "#fintech" },
            { label: "AI", href: "#ai" },
          ],
        },
        {
          title: "Resources",
          links: [
            { label: "Docs", href: "#docs" },
            { label: "Tokens", href: "#tokens" },
          ],
        },
      ],
    };

    // Simple footer
    const simpleView = render(
      <LandingFooter variant="simple" content={hugeGroupsContent} brand={brand} />
    );
    const simpleLinks = simpleView.container.querySelectorAll(".hb-footer-nav-link");
    expect(simpleLinks.length).toBeLessThanOrEqual(6);
    expect(simpleView.queryByText("SaaS")).not.toBeInTheDocument();
    simpleView.unmount();

    // Centered footer
    const centeredView = render(
      <LandingFooter variant="centered" content={hugeGroupsContent} brand={brand} />
    );
    const centeredLinks = centeredView.container.querySelectorAll(".hb-footer-nav-link");
    expect(centeredLinks.length).toBeLessThanOrEqual(6);
    expect(centeredView.queryByText("SaaS")).not.toBeInTheDocument();
    centeredView.unmount();
  });

  it("isolates brand signature in columns variant so row 2 navigation columns do not sit under signature", () => {
    const multiGroupContent = {
      ...defaultFooterContent,
      groups: [
        { title: "Product", links: [{ label: "Features", href: "#features" }] },
        { title: "Solutions", links: [{ label: "SaaS", href: "#saas" }] },
        { title: "Resources", links: [{ label: "Docs", href: "#docs" }] },
        { title: "Company", links: [{ label: "About", href: "#about" }] },
        { title: "Legal", links: [{ label: "Privacy", href: "#privacy" }] },
      ],
    };

    const { container } = render(
      <LandingFooter variant="columns" content={multiGroupContent} brand={brand} />
    );

    // Dedicated signature container
    const signatureContainer = container.querySelector(".lg\\:col-span-4");
    expect(signatureContainer).toBeTruthy();
    expect(signatureContainer?.querySelector("nav")).toBeNull();

    // Dedicated navigation subgrid containing all 5 groups
    const navSubgrid = container.querySelector(".lg\\:col-span-8");
    expect(navSubgrid).toBeTruthy();
    expect(navSubgrid?.querySelectorAll("nav").length).toBe(5);
  });
});
