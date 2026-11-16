import React from "react";
import "@testing-library/jest-dom/vitest";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { AboutUsSection } from "./AboutUsSection";
import { WhoAreWeSection } from "./WhoAreWeSection";
import { OurTeamSection } from "./OurTeamSection";
import { MeetOurExpertSection } from "./MeetOurExpertSection";
import { ValuesSection } from "./ValuesSection";
import { EditorialBrandCtaSection } from "./EditorialBrandCtaSection";
import { LandingCta } from "../LandingCta";
import { formaLandingContent } from "../LandingPage/data";
import {
  addWebsitePage,
  createWebsiteProject,
  getAboutPageSections,
  toggleAboutPageSection,
} from "../WebsiteProject/config";
import { WebsiteProjectPage } from "../WebsiteProject/WebsiteProject";

describe("AboutUsSection", () => {
  it("renders the eyebrow pill, editorial headline, explore link, and video poster", () => {
    render(<AboutUsSection />);

    expect(screen.getByText("About Hudbird UI")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Engineering clean interfaces with precision and craft",
      })
    ).toBeInTheDocument();

    const exploreLink = screen.getByRole("link", { name: /Explore Hudbird UI/i });
    expect(exploreLink).toHaveAttribute("href", "#benefits");

    const playButton = screen.getByRole("button", { name: /Play About Hudbird UI Story Video/i });
    expect(playButton).toBeInTheDocument();
  });

  it("opens the fullscreen video dialog on play and closes via close button or Escape", async () => {
    render(<AboutUsSection videoUrl="/demo-about.mp4" videoTitle="Wellthy Film" />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Play Wellthy Film/i }));

    const dialog = screen.getByRole("dialog", { name: "Wellthy Film" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog.querySelector("video")).toHaveAttribute("src", "/demo-about.mp4");

    fireEvent.keyDown(window, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());

    fireEvent.click(screen.getByRole("button", { name: /Play Wellthy Film/i }));
    expect(screen.getByRole("dialog", { name: "Wellthy Film" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Close video dialog" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("embeds YouTube URLs safely when a YouTube link is provided", () => {
    render(
      <AboutUsSection
        videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        videoTitle="YouTube Story"
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Play YouTube Story/i }));
    const iframe = screen.getByTitle("YouTube Story");
    expect(iframe).toHaveAttribute(
      "src",
      "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0"
    );
  });

  it("renders automatically inside WebsiteProjectPage for the about page template", () => {
    const project = addWebsitePage(createWebsiteProject(), "about", "about-page");
    render(<WebsiteProjectPage project={project} pageId="about-page" onNavigate={vi.fn()} />);

    expect(screen.getByText(`About ${project.brand.name}`)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: new RegExp(`Explore ${project.brand.name}`, "i") })
    ).toHaveAttribute("href", "#who-are-we");
    expect(screen.getByText("Who Are We")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Modular UI Architecture Built for Scale" })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Our Team" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Meet the Engineers Behind Hudbird UI" })
    ).toBeInTheDocument();
  });

  it("exposes and toggles About Us, Who Are We, Our Team, and Meet Our Expert sections", () => {
    const project = addWebsitePage(createWebsiteProject(), "about", "about-page");
    const aboutPage = project.pages.find((p) => p.id === "about-page")!;
    expect(getAboutPageSections(aboutPage).map((s) => s.id)).toEqual([
      "about",
      "who-are-we",
      "our-team",
      "meet-our-expert",
      "values",
      "editorial-cta",
    ]);

    const updatedProject = {
      ...project,
      pages: project.pages.map((p) =>
        p.id === "about-page" ? toggleAboutPageSection(p, "our-team", false) : p
      ),
    };

    render(
      <WebsiteProjectPage project={updatedProject} pageId="about-page" onNavigate={vi.fn()} />
    );

    expect(screen.queryByRole("heading", { level: 2, name: "Our Team" })).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Meet the Engineers Behind Hudbird UI" })
    ).toBeInTheDocument();
  });
});

describe("WhoAreWeSection", () => {
  it("renders the pill badge, editorial heading, narrative copy, and four metric stats", () => {
    render(<WhoAreWeSection />);

    expect(screen.getByText("Who Are We")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Modular UI Architecture Built for Scale" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/modern design system and multi-page React builder/i)
    ).toBeInTheDocument();

    expect(screen.getByText("120+")).toBeInTheDocument();
    expect(screen.getByText("Production UI primitives")).toBeInTheDocument();
    expect(screen.getByText("40+")).toBeInTheDocument();
    expect(screen.getByText("Composable page sections")).toBeInTheDocument();
    expect(screen.getByText("100%")).toBeInTheDocument();
    expect(screen.getByText("WCAG AA token contrast")).toBeInTheDocument();
    expect(screen.getByText("24+")).toBeInTheDocument();
    expect(screen.getByText("Built-in brand presets")).toBeInTheDocument();
  });
});

describe("OurTeamSection", () => {
  it("renders heading, team narrative, and Pexels group photograph", () => {
    render(<OurTeamSection />);

    expect(screen.getByRole("heading", { level: 2, name: "Our Team" })).toBeInTheDocument();
    expect(screen.getByText(/engineering and design systems team/i)).toBeInTheDocument();
    const img = screen.getByRole("img", { name: /team/i });
    expect(img).toHaveAttribute("src", expect.stringContaining("images.pexels.com"));
  });
});

describe("MeetOurExpertSection", () => {
  it("renders badge, header split, eight experts, and hover-revealed social links", () => {
    render(<MeetOurExpertSection />);

    expect(screen.getByText("Core Engineering")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Meet the Engineers Behind Hudbird UI" })
    ).toBeInTheDocument();
    expect(screen.getByText("Sarah Thompson")).toBeInTheDocument();
    expect(screen.getByText("John Ramirez")).toBeInTheDocument();
    expect(screen.getByText("Emily Chen")).toBeInTheDocument();
    expect(screen.getByText("Michael Patel")).toBeInTheDocument();
    expect(screen.getByText("Liam Carter")).toBeInTheDocument();
    expect(screen.getByText("Sophia Hughes")).toBeInTheDocument();
    expect(screen.getByText("Marcus Lee")).toBeInTheDocument();
    expect(screen.getByText("Isabella Collins")).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Sarah Thompson on Facebook" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Sarah Thompson on X" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Sarah Thompson on LinkedIn" })).toBeInTheDocument();
  });
});

describe("ValuesSection", () => {
  it("renders the values heading and five bento cards with Pexels imagery", () => {
    render(<ValuesSection brandName="Hudbird" />);

    expect(screen.getByText("Values")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Build Faster Interfaces with Hudbird" })
    ).toBeInTheDocument();
    expect(screen.getByText("Precision Primitives")).toBeInTheDocument();
    expect(screen.getByText("Token-Driven Themes")).toBeInTheDocument();
    expect(screen.getByText("Calibrated Motion")).toBeInTheDocument();
    expect(screen.getByText("Composable Sections")).toBeInTheDocument();
    expect(screen.getByText("Developer Ergonomics")).toBeInTheDocument();

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(5);
    images.forEach((img) => {
      expect(img).toHaveAttribute("src", expect.stringContaining("images.pexels.com"));
    });
  });
});

describe("EditorialBrandCtaSection", () => {
  it("renders headline, rating summary, and video trigger modal without wordmark", async () => {
    render(<EditorialBrandCtaSection videoUrl="/cta-film.mp4" />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Ship Cleaner Interfaces in Half the Time" })
    ).toBeInTheDocument();
    expect(screen.queryByText("HUDBIRD")).not.toBeInTheDocument();
    expect(screen.getByText("4.9")).toBeInTheDocument();
    expect(screen.getByText("Trusted by 10k+ product engineers")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Play Video/i }));
    expect(
      screen.getByRole("dialog", { name: "How Hudbird UI accelerates your workflow" })
    ).toBeInTheDocument();
    fireEvent.keyDown(window, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("renders cleanly as the editorial-showcase variant inside LandingCta", () => {
    render(<LandingCta variant="editorial-showcase" content={formaLandingContent.cta} />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Ship Cleaner Interfaces in Half the Time" })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Start Building/i })).toBeInTheDocument();
  });
});
