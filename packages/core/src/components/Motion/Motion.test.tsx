import * as React from "react";
import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MotionReveal, MotionSlideshow, MotionTicker } from "./Motion";

describe("Motion primitives", () => {
  it("keeps reveal content visible when IntersectionObserver is unavailable", () => {
    render(<MotionReveal>Ready now</MotionReveal>);
    expect(screen.getByText("Ready now")).toBeVisible();
  });

  it("provides manual slideshow controls and an announced position", async () => {
    render(<MotionSlideshow slides={[<span key="a">First</span>, <span key="b">Second</span>]} />);
    expect(screen.getByText("First")).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    await waitFor(() => expect(screen.getByText("Second")).toBeVisible());
    expect(screen.getByLabelText("Slide 2 of 2")).toBeInTheDocument();
  });

  it("marks the repeated ticker row as decorative", () => {
    const { container } = render(<MotionTicker items={[<span key="a">Hudbird</span>]} />);
    expect(screen.getAllByText("Hudbird")).toHaveLength(2);
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });
});
