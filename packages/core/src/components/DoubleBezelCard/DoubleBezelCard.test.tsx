import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DoubleBezelCard } from "./DoubleBezelCard";

describe("DoubleBezelCard", () => {
  it("renders children correctly", () => {
    render(<DoubleBezelCard>Card Content</DoubleBezelCard>);
    expect(screen.getByText("Card Content")).toBeInTheDocument();
  });

  it("renders crosshairs when showCrosshairs is true", () => {
    const { container } = render(
      <DoubleBezelCard showCrosshairs>Card with crosshairs</DoubleBezelCard>
    );
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBe(4);
  });
});
