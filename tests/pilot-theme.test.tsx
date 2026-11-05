import * as React from "react";
import "@testing-library/jest-dom/vitest";
import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useWebsiteMode } from "../apps/docs/src/lib/useWebsiteMode";
import { BrandScope } from "../packages/marketing/src/components/HeroSection/BrandScope";
import { pilotBrands } from "../packages/marketing/src/components/StartupPilot/demo-data";

function WebsiteMode() {
  return <output>{useWebsiteMode()}</output>;
}

afterEach(() => {
  document.documentElement.classList.remove("dark");
  document.querySelectorAll('[id^="hudbird-google-font-"]').forEach((link) => link.remove());
});

describe("Website theme and brand fonts", () => {
  it("reads the initial website mode and tracks changes in both directions", async () => {
    document.documentElement.classList.add("dark");
    render(<WebsiteMode />);
    expect(screen.getByRole("status")).toHaveTextContent("dark");
    await act(async () => {
      document.documentElement.classList.remove("dark");
    });
    expect(screen.getByRole("status")).toHaveTextContent("light");
    await act(async () => {
      document.documentElement.classList.add("dark");
    });
    expect(screen.getByRole("status")).toHaveTextContent("dark");
  });

  it("loads an opted-in Google font once for multiple blocks and retains a fallback stack", () => {
    const brand = {
      ...pilotBrands[0],
      googleFont: "Poppins",
      fontFamily: '"Poppins", system-ui, sans-serif',
    };
    const view = render(
      <>
        <BrandScope brand={brand}>First block</BrandScope>
        <BrandScope brand={brand}>Second block</BrandScope>
      </>
    );
    const links = document.querySelectorAll<HTMLLinkElement>('[id^="hudbird-google-font-"]');
    expect(links).toHaveLength(1);
    const url = new URL(links[0].href);
    expect(url.origin).toBe("https://fonts.googleapis.com");
    expect(url.searchParams.get("family")).toBe("Poppins:wght@400;500;600;700");
    expect(url.searchParams.get("display")).toBe("swap");
    expect(view.container.querySelector("[data-brand]")).toHaveStyle({
      fontFamily: brand.fontFamily,
    });
  });

  it("does not request remote fonts for local brand fonts", () => {
    render(<BrandScope brand={pilotBrands[1]}>Local font</BrandScope>);
    expect(document.querySelectorAll('[id^="hudbird-google-font-"]')).toHaveLength(0);
  });
});
