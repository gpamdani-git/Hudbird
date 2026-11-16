import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { LegalPageSection } from "./LegalPageSection";
import { LEGAL_DOCUMENTS, LEGAL_VERSIONS, buildLegalPlainText } from "./data";
import { WebsiteProjectPage } from "../WebsiteProject/WebsiteProject";
import {
  addWebsitePage,
  createWebsiteProject,
  getLegalPageSections,
  parseWebsiteProject,
  toggleLegalPageSection,
} from "../WebsiteProject/config";

describe("LegalPageSection", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    window.localStorage?.clear();
  });

  it("switches legal documents via underline tabs and updates clauses without em dashes", async () => {
    render(<LegalPageSection />);

    expect(screen.getByRole("heading", { name: "Legal & Compliance Center" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Privacy Policy" })).toBeInTheDocument();
    expect(screen.getAllByText(/PRIV-2026-11/).length).toBeGreaterThanOrEqual(1);

    fireEvent.click(screen.getByRole("tab", { name: "Terms of Service" }));
    await waitFor(() => {
      expect(screen.getByRole("heading", { name: "Terms of Service" })).toBeInTheDocument();
      expect(screen.getAllByText(/TERMS-2026-11/).length).toBeGreaterThanOrEqual(1);
    });

    fireEvent.click(screen.getByRole("tab", { name: "MIT & Pro License" }));
    await waitFor(() => {
      expect(screen.getByRole("heading", { name: "MIT & Pro License" })).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: /Open-Source MIT Core Primitives/i })
      ).toBeInTheDocument();
    });

    const plainText = buildLegalPlainText(LEGAL_DOCUMENTS[0], LEGAL_VERSIONS[0], "Hudbird");
    expect(plainText).toContain("Hudbird - Privacy Policy");
    expect(plainText).not.toContain("\u2014");
  });

  it("filters clauses, toggles plain-language summaries, and copies clause anchor links", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });

    render(<LegalPageSection />);

    expect(
      screen.getByText(/We only collect the details needed to keep your builder projects synced/i)
    ).toBeInTheDocument();

    // Toggle plain summary off
    fireEvent.click(screen.getByRole("switch", { name: /plain-language summary/i }));
    await waitFor(() => {
      expect(
        screen.queryByText(
          /We only collect the details needed to keep your builder projects synced/i
        )
      ).not.toBeInTheDocument();
    });

    // Search clauses by keyword
    const searchInput = screen.getByLabelText("Filter document clauses");
    fireEvent.change(searchInput, { target: { value: "Retention" } });
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /Retention Windows & Subprocessors/i })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole("heading", { name: /Account & Workspace Data We Collect/i })
      ).not.toBeInTheDocument();
    });

    // Empty state + reset
    fireEvent.change(searchInput, { target: { value: "zzzz-no-match" } });
    expect(screen.getByText("No matching clauses found")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Reset filter" }));
    expect(
      screen.getByRole("heading", { name: /Account & Workspace Data We Collect/i })
    ).toBeInTheDocument();

    // Copy clause deep link
    fireEvent.click(
      screen.getByRole("button", {
        name: /Copy link to Account & Workspace Data We Collect/i,
      })
    );
    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith(
        expect.stringContaining("#clause-privacy-data-collected")
      );
      expect(screen.getByText("Copied")).toBeInTheDocument();
    });
  });

  it("switches document revision history and triggers .txt download", async () => {
    const createObjectURL = vi.fn().mockReturnValue("blob:legal-test");
    const revokeObjectURL = vi.fn();
    vi.stubGlobal("URL", { ...URL, createObjectURL, revokeObjectURL });
    vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});

    render(<LegalPageSection />);

    const versionSelect = screen.getByRole("combobox", { name: "Revision history" });
    fireEvent.click(versionSelect);
    fireEvent.click(screen.getByRole("option", { name: /v2\.3 \(Aug 04, 2026\)/i }));

    await waitFor(() => {
      expect(screen.getByText(/Effective August 04, 2026/)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /Download \.txt/i }));
    expect(createObjectURL).toHaveBeenCalledTimes(1);
    expect(revokeObjectURL).toHaveBeenCalledWith("blob:legal-test");
    expect(screen.getByText("Downloaded .txt")).toBeInTheDocument();
  });

  it("saves cookie preferences, resets to essential only, and submits validated DSAR requests", () => {
    render(<LegalPageSection />);

    // Cookie preferences
    fireEvent.click(screen.getByRole("switch", { name: /Usage analytics/i }));
    fireEvent.click(screen.getByRole("button", { name: "Save preferences" }));
    expect(screen.getByRole("status")).toHaveTextContent("Analytics");

    fireEvent.click(screen.getByRole("button", { name: "Essential only" }));
    expect(screen.getByRole("status")).toHaveTextContent(
      "Preferences saved: Essential cookies only."
    );

    // DSAR validation & submit
    fireEvent.click(screen.getByRole("button", { name: "Submit data request" }));
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Enter a valid email address so we can verify account ownership."
    );

    fireEvent.change(screen.getByLabelText("Account or contact email"), {
      target: { value: "dpo@acme.dev" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Submit data request" }));
    expect(screen.getAllByRole("status").some((el) => el.textContent?.includes("HB-DSAR-"))).toBe(
      true
    );
  });

  it("renders 3 modular sections and auto-wires Homepage Footer legal links in WebsiteProjectPage", async () => {
    const project = addWebsitePage(createWebsiteProject(), "legal", "legal-page");
    const legalPage = project.pages.find((p) => p.id === "legal-page")!;
    expect(getLegalPageSections(legalPage).map((s) => s.id)).toEqual([
      "legal-hero",
      "legal-reader",
      "legal-preferences",
    ]);
    expect(parseWebsiteProject(JSON.parse(JSON.stringify(project)))).toEqual(project);

    const homePage = project.pages.find((p) => p.path === "/")!;

    function Harness() {
      const [pageId, setPageId] = React.useState(homePage.id);
      return <WebsiteProjectPage project={project} pageId={pageId} onNavigate={setPageId} />;
    }

    const { container, unmount } = render(<Harness />);

    // Click "Terms of Service" from Homepage footer -> navigates to Legal with Terms tab active
    const termsFooterLinks = screen.getAllByRole("link", { name: "Terms of Service" });
    expect(termsFooterLinks[0]).toHaveAttribute("href", "/legal?doc=terms");
    fireEvent.click(termsFooterLinks[0]);

    await waitFor(() => {
      expect(container.querySelector('[data-landing-section="legal-hero"]')).toBeInTheDocument();
      expect(container.querySelector('[data-landing-section="legal-reader"]')).toBeInTheDocument();
      expect(
        container.querySelector('[data-landing-section="legal-preferences"]')
      ).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: "Terms of Service" })).toBeInTheDocument();
    });
    unmount();

    // Toggle off "legal-preferences" and verify section hides cleanly
    const updatedProject = {
      ...project,
      pages: project.pages.map((p) =>
        p.id === "legal-page" ? toggleLegalPageSection(p, "legal-preferences", false) : p
      ),
    };
    const { container: updatedContainer } = render(
      <WebsiteProjectPage project={updatedProject} pageId="legal-page" onNavigate={vi.fn()} />
    );
    expect(
      updatedContainer.querySelector('[data-landing-section="legal-hero"]')
    ).toBeInTheDocument();
    expect(
      updatedContainer.querySelector('[data-landing-section="legal-reader"]')
    ).toBeInTheDocument();
    expect(
      updatedContainer.querySelector('[data-landing-section="legal-preferences"]')
    ).not.toBeInTheDocument();
  });
});
