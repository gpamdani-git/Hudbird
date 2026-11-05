import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HeroWidgetRail } from "../apps/docs/src/components/landing/HeroWidgetRail";

describe("HeroWidgetRail", () => {
  it("presents the twelve samples and steps through them even with reduced motion", () => {
    const query = vi.spyOn(window, "matchMedia").mockImplementation((media) => ({
      media,
      matches: true,
      onchange: null,
      addListener() {},
      removeListener() {},
      addEventListener() {},
      removeEventListener() {},
      dispatchEvent: () => true,
    }));
    try {
      render(<HeroWidgetRail />);
      expect(screen.getAllByRole("listitem")).toHaveLength(12);
      expect(screen.queryByRole("button", { name: "Pause widget gallery" })).toBeNull();
      const first = screen.getByRole("listitem", { name: "Record sleeve" });
      const start = first.style.transform;
      expect(first.style.getPropertyPriority("transform")).toBe("important");
      fireEvent.click(screen.getByRole("button", { name: "Next widget" }));
      expect(first.style.transform).not.toBe(start);
      expect(screen.getByRole("status")).toHaveTextContent("2 of 12: Activity chart");
      fireEvent.click(screen.getByRole("button", { name: "Previous widget" }));
      expect(first.style.transform).toBe(start);
    } finally {
      query.mockRestore();
    }
  });

  it("allows stopping and resuming autoplay independently of hover", () => {
    render(<HeroWidgetRail />);
    fireEvent.click(screen.getByRole("button", { name: "Pause widget gallery" }));
    fireEvent.click(screen.getByRole("button", { name: "Play widget gallery" }));
    expect(screen.getByRole("button", { name: "Pause widget gallery" })).toBeVisible();
  });
});
