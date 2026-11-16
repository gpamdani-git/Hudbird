import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ContactPageSection } from "./ContactPageSection";
import { buildBookingIcsContent, DEFAULT_CONTACT_OFFICES } from "./data";
import { WebsiteProjectPage } from "../WebsiteProject/WebsiteProject";
import {
  addWebsitePage,
  createWebsiteProject,
  getContactPageSections,
  parseWebsiteProject,
  toggleContactPageSection,
} from "../WebsiteProject/config";

describe("ContactPageSection", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders direct channels, monochrome studio photo, and one-click email copy feedback", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });

    const { container } = render(<ContactPageSection />);

    expect(
      screen.getByRole("heading", { name: /talk with the engineers building hudbird ui/i })
    ).toBeInTheDocument();
    expect(screen.getByText("enterprise@hudbird.studio")).toBeInTheDocument();

    const copyBtn = screen.getByRole("button", { name: /copy enterprise@hudbird\.studio/i });
    fireEvent.click(copyBtn);

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith("enterprise@hudbird.studio");
      expect(screen.getByText("Copied")).toBeInTheDocument();
    });

    const imgs = container.querySelectorAll("img.hb-contact-media-img");
    expect(imgs.length).toBeGreaterThanOrEqual(1);
    expect(imgs[0]).toHaveAttribute("src", expect.stringContaining("images.pexels.com"));
  });

  it("validates required inquiry fields and submits a scoped inquiry packet with NDA toggle", async () => {
    const onSubmitInquiry = vi.fn();
    render(<ContactPageSection onSubmitInquiry={onSubmitInquiry} />);

    // Empty submit triggers validation alert
    fireEvent.click(screen.getByRole("button", { name: /send inquiry/i }));
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Please fill in your full name, work email, and project details."
    );

    // Invalid email check
    fireEvent.change(screen.getByLabelText("Full name"), { target: { value: "Nadia Kusuma" } });
    fireEvent.change(screen.getByLabelText("Work email"), { target: { value: "invalid-email" } });
    fireEvent.change(screen.getByLabelText("Project requirements"), {
      target: { value: "Need multi-brand tokens for 4 apps." },
    });
    fireEvent.click(screen.getByRole("button", { name: /send inquiry/i }));
    expect(screen.getByRole("alert")).toHaveTextContent("Please enter a valid work email address.");

    // Valid submit with Team Size 51-200 and NDA switch enabled
    fireEvent.change(screen.getByLabelText("Work email"), {
      target: { value: "nadia@hudbird.dev" },
    });
    fireEvent.change(screen.getByLabelText("Company or organization"), {
      target: { value: "Nusantara Fintech" },
    });
    fireEvent.click(screen.getByRole("button", { name: "51-200" }));
    fireEvent.click(screen.getByLabelText(/include mutual nda/i));
    fireEvent.click(screen.getByRole("button", { name: /send inquiry/i }));

    await waitFor(() => {
      expect(onSubmitInquiry).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Nadia Kusuma",
          email: "nadia@hudbird.dev",
          company: "Nusantara Fintech",
          teamSize: "51-200",
          requireNda: true,
        })
      );
    });

    const status = screen.getByRole("status");
    expect(status).toHaveTextContent("Inquiry received");
    expect(status).toHaveTextContent("Mutual NDA packet requested");
  });

  it("switches to Book a Call underline tab, confirms booking with Calendar + slots, and exports .ics invite", async () => {
    const onConfirmBooking = vi.fn();
    const createObjectUrlSpy = vi.fn(() => "blob:hudbird-test-ics");
    const revokeObjectUrlSpy = vi.fn();
    vi.stubGlobal("URL", {
      ...URL,
      createObjectURL: createObjectUrlSpy,
      revokeObjectURL: revokeObjectUrlSpy,
    });

    render(<ContactPageSection onConfirmBooking={onConfirmBooking} />);

    fireEvent.click(screen.getByRole("tab", { name: /book a call/i }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /confirm 30-min call/i })).toBeInTheDocument();
    });

    // Unavailable slot should be disabled
    expect(screen.getByRole("button", { name: /time slot 13:30 unavailable/i })).toBeDisabled();

    // Select 15:00 slot
    const slot15 = screen.getByRole("button", { name: /time slot 15:00/i });
    fireEvent.click(slot15);
    expect(slot15).toHaveAttribute("aria-pressed", "true");

    // Validation before details
    fireEvent.click(screen.getByRole("button", { name: /confirm 30-min call/i }));
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Please enter your name and work email to lock in the time slot."
    );

    // Fill attendee info and confirm
    fireEvent.change(screen.getByLabelText("Your name"), { target: { value: "Raka Pratama" } });
    fireEvent.change(screen.getByLabelText("Invite email"), {
      target: { value: "raka@product.co" },
    });
    fireEvent.click(screen.getByRole("button", { name: /confirm 30-min call/i }));

    await waitFor(() => {
      expect(onConfirmBooking).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Raka Pratama",
          email: "raka@product.co",
          slotId: "15:00",
        })
      );
    });

    expect(screen.getByRole("status")).toHaveTextContent("Consultation scheduled");

    // Trigger .ics download
    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});
    fireEvent.click(screen.getByRole("button", { name: /download \.ics invite/i }));

    await waitFor(() => {
      expect(createObjectUrlSpy).toHaveBeenCalledTimes(1);
      expect(clickSpy).toHaveBeenCalledTimes(1);
      expect(screen.getByText("Invite downloaded")).toBeInTheDocument();
    });

    // Check RFC 5545 .ics string formatter directly
    const ics = buildBookingIcsContent({
      brandName: "Hudbird UI",
      attendeeName: "Raka Pratama",
      attendeeEmail: "raka@product.co",
      topicLabel: "Design System Architecture Review",
      date: new Date(2026, 10, 18),
      hour: 15,
      minute: 0,
      timezoneOffsetHours: 7,
      timezoneShortLabel: "WIB (UTC+7)",
      officeLocation: "Jakarta HQ",
      referenceCode: "HB-CALL-123456",
    });
    expect(ics).toContain("BEGIN:VCALENDAR");
    expect(ics).toContain("SUMMARY:Hudbird UI Consultation: Design System Architecture Review");
    expect(ics).toContain("DTSTART:20261118T080000Z");
    expect(ics).toContain("END:VCALENDAR");
  });

  it("switches regional offices, toggles monochrome/color map state, and copies office address", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });

    render(<ContactPageSection />);

    // Default office is Jakarta HQ
    expect(screen.getByTitle("Jakarta HQ map location")).toHaveAttribute(
      "src",
      DEFAULT_CONTACT_OFFICES[0].osmEmbedUrl
    );

    // Switch to Singapore Hub
    fireEvent.click(screen.getByRole("button", { name: "Singapore Hub" }));
    await waitFor(() => {
      expect(screen.getByTitle("Singapore Hub map location")).toHaveAttribute(
        "src",
        DEFAULT_CONTACT_OFFICES[1].osmEmbedUrl
      );
    });
    expect(screen.getByText("1 Wallich Street, Tanjong Pagar")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /open in google maps/i })).toHaveAttribute(
      "href",
      DEFAULT_CONTACT_OFFICES[1].googleMapsUrl
    );

    // Touch-friendly Color map toggle
    const mapToggle = screen.getByRole("button", { name: "Color map" });
    expect(mapToggle).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(mapToggle);
    expect(screen.getByRole("button", { name: "Monochrome map" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    expect(screen.getByTitle("Singapore Hub map location")).toHaveAttribute(
      "data-color-active",
      "true"
    );

    // Copy full office address
    fireEvent.click(screen.getByRole("button", { name: /copy address/i }));
    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith(DEFAULT_CONTACT_OFFICES[1].fullAddress);
      expect(screen.getByText("Address copied")).toBeInTheDocument();
    });
  });

  it("renders all 3 sections (contact-mail, contact-form-call, contact-locations) and supports toggling sections in WebsiteProjectPage", () => {
    const project = addWebsitePage(createWebsiteProject(), "contact", "contact-page");
    const contactPage = project.pages.find((p) => p.id === "contact-page")!;
    expect(getContactPageSections(contactPage).map((s) => s.id)).toEqual([
      "contact-mail",
      "contact-form-call",
      "contact-locations",
    ]);
    expect(parseWebsiteProject(JSON.parse(JSON.stringify(project)))).toEqual(project);

    const { container, unmount } = render(
      <WebsiteProjectPage project={project} pageId="contact-page" onNavigate={vi.fn()} />
    );
    expect(container.querySelector('[data-landing-section="contact-mail"]')).toBeInTheDocument();
    expect(
      container.querySelector('[data-landing-section="contact-form-call"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-landing-section="contact-locations"]')
    ).toBeInTheDocument();
    expect(screen.getByText("Studios and regional hubs")).toBeInTheDocument();
    unmount();

    // Hide Location with Map section and re-render
    const updatedProject = {
      ...project,
      pages: project.pages.map((p) =>
        p.id === "contact-page" ? toggleContactPageSection(p, "contact-locations", false) : p
      ),
    };
    const { container: updatedContainer } = render(
      <WebsiteProjectPage project={updatedProject} pageId="contact-page" onNavigate={vi.fn()} />
    );
    expect(
      updatedContainer.querySelector('[data-landing-section="contact-mail"]')
    ).toBeInTheDocument();
    expect(
      updatedContainer.querySelector('[data-landing-section="contact-form-call"]')
    ).toBeInTheDocument();
    expect(
      updatedContainer.querySelector('[data-landing-section="contact-locations"]')
    ).not.toBeInTheDocument();
  });
});
