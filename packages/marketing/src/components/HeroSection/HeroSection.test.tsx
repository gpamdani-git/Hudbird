import * as React from "react";
import "@testing-library/jest-dom/vitest";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrandScope } from "./BrandScope";
import { HeroSection } from "./HeroSection";
import { brandStyle } from "./brand";
import { StartupPage } from "../StartupPilot/StartupPage";
import {
  pilotBrands,
  pilotCompositions,
  pilotHeroes,
  startupContent,
} from "../StartupPilot/demo-data";

describe("Composable startup hero", () => {
  it("switches preview artwork with the block theme and leaves single-source customer images intact", () => {
    const image = {
      src: "/product-light.svg",
      darkSrc: "/product-dark.svg",
      alt: "Product preview",
    };
    const view = render(
      <BrandScope brand={pilotBrands[0]}>
        <HeroSection content={startupContent.hero} config={{ variant: "centered", image }} />
      </BrandScope>
    );
    expect(screen.getByRole("img")).toHaveAttribute("src", image.src);
    view.rerender(
      <BrandScope brand={{ ...pilotBrands[0], mode: "dark" }}>
        <HeroSection content={startupContent.hero} config={{ variant: "split", image }} />
      </BrandScope>
    );
    expect(screen.getByRole("img")).toHaveAttribute("src", image.darkSrc);
    view.rerender(
      <BrandScope brand={{ ...pilotBrands[0], mode: "dark" }}>
        <HeroSection
          content={startupContent.hero}
          config={{ variant: "split", image: { src: "/customer.jpg", alt: "Customer photo" } }}
        />
      </BrandScope>
    );
    expect(screen.getByRole("img")).toHaveAttribute("src", "/customer.jpg");
  });

  it("uses the dark artwork as the paused video poster", () => {
    const poster = { src: "/poster-light.svg", darkSrc: "/poster-dark.svg", alt: "Video cover" };
    const view = render(
      <BrandScope brand={{ ...pilotBrands[0], mode: "dark" }}>
        <HeroSection
          content={startupContent.hero}
          config={{ variant: "video", video: { src: "/demo.webm", poster } }}
        />
      </BrandScope>
    );
    expect(screen.getByRole("img")).toHaveAttribute("src", poster.darkSrc);
    expect(view.container.querySelector("video")).toHaveAttribute("poster", poster.darkSrc);
  });

  it("preserves brand, content, actions, and section order across all five layouts", () => {
    const view = render(
      <StartupPage
        brand={pilotBrands[0]}
        composition={pilotCompositions[0]}
        content={startupContent}
      />
    );
    const sectionOrder = () =>
      Array.from(view.container.querySelectorAll("main > section")).map((node) => node.id);
    const originalOrder = sectionOrder();
    for (const hero of Object.values(pilotHeroes)) {
      view.rerender(
        <StartupPage
          brand={pilotBrands[0]}
          composition={{ ...pilotCompositions[0], hero }}
          content={startupContent}
        />
      );
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        startupContent.hero.title
      );
      expect(screen.getByRole("link", { name: "See the product demo" })).toHaveAttribute(
        "href",
        "#product-demo"
      );
      expect(view.container.querySelector("[data-brand]")).toHaveAttribute(
        "data-brand",
        pilotBrands[0].id
      );
      expect(sectionOrder()).toEqual(originalOrder);
    }
    view.rerender(
      <StartupPage
        brand={{ ...pilotBrands[1], mode: "dark" }}
        composition={pilotCompositions[1]}
        content={startupContent}
      />
    );
    expect(sectionOrder()).toEqual(["hero", "product-demo", "benefits", "next-step", "questions"]);
    expect(view.container.querySelector("[data-brand]")).toHaveStyle({
      "--hb-accent": pilotBrands[1].primary,
    });
    expect(view.container.querySelector("[data-hb-theme]")).toHaveAttribute(
      "data-hb-theme",
      "dark"
    );
  });

  it("changes slideshow images manually and wraps in both directions", () => {
    render(<HeroSection content={startupContent.hero} config={pilotHeroes.slideshow} />);
    expect(screen.getByRole("status")).toHaveTextContent("Slide 1 of 2");
    fireEvent.click(screen.getByRole("button", { name: "Previous slide" }));
    expect(screen.getByRole("status")).toHaveTextContent("Slide 2 of 2");
    expect(screen.getByRole("img")).toHaveAttribute("alt", expect.stringContaining("Projects"));
    fireEvent.click(screen.getByRole("button", { name: "Next slide" }));
    expect(screen.getByRole("status")).toHaveTextContent("Slide 1 of 2");
  });

  it("handles missing slides and image failures without collapsing the media area", () => {
    const view = render(
      <HeroSection content={startupContent.hero} config={{ variant: "slideshow", slides: [] }} />
    );
    expect(screen.getByRole("status")).toHaveTextContent("Add at least one slide");
    view.rerender(<HeroSection content={startupContent.hero} config={pilotHeroes.split} />);
    fireEvent.error(screen.getByRole("img"));
    expect(screen.getByRole("img")).toHaveTextContent("Image unavailable");
  });

  it("starts video paused, provides play/pause, and falls back after a playback failure", async () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(function (
      this: HTMLMediaElement
    ) {
      this.dispatchEvent(new Event("play"));
      return Promise.resolve();
    });
    const pause = vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(function (
      this: HTMLMediaElement
    ) {
      this.dispatchEvent(new Event("pause"));
    });
    const view = render(<HeroSection content={startupContent.hero} config={pilotHeroes.video} />);
    expect(view.container.querySelector("video")).not.toHaveAttribute("autoplay");
    fireEvent.click(screen.getByRole("button", { name: "Play background video" }));
    expect(play).toHaveBeenCalledOnce();
    fireEvent.click(screen.getByRole("button", { name: "Pause background video" }));
    expect(pause).toHaveBeenCalledOnce();
    play.mockRejectedValueOnce(new Error("blocked"));
    fireEvent.click(screen.getByRole("button", { name: "Play background video" }));
    expect(await screen.findByRole("status")).toHaveTextContent("Showing the cover image");
    expect(screen.getByRole("img")).toBeVisible();
    play.mockRestore();
    pause.mockRestore();
  });

  it("switches real tab panels and exposes demo content as sample data", () => {
    render(<HeroSection content={startupContent.hero} config={pilotHeroes.interactive} />);
    expect(screen.getByText("Demo · sample data")).toBeVisible();
    expect(screen.getByRole("tablist", { name: "Product demo" })).toBeVisible();
    fireEvent.click(screen.getByRole("tab", { name: "Notes" }));
    expect(screen.getByRole("tab", { name: "Notes" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Keep the useful details close");
    expect(screen.getByRole("tab", { name: "Notes" })).toHaveAttribute(
      "aria-controls",
      screen.getByRole("tabpanel").id
    );
  });

  it("chooses readable accent foregrounds and rejects malformed brand colors", () => {
    expect(brandStyle({ ...pilotBrands[0], primary: "#ffffff" })).toHaveProperty(
      "--hb-on-accent",
      "#000000"
    );
    expect(brandStyle({ ...pilotBrands[0], primary: "#000000" })).toHaveProperty(
      "--hb-on-accent",
      "#ffffff"
    );
    expect(() => brandStyle({ ...pilotBrands[0], primary: "blue" })).toThrow("six-digit hex");
    const view = render(
      <BrandScope brand={pilotBrands[0]}>
        <span>Brand content</span>
      </BrandScope>
    );
    expect(view.container.firstChild).toHaveStyle({
      "--hb-section": "clamp(4.5rem, 7vw, 6rem)",
      "--hb-radius": "12px",
    });
  });
});
