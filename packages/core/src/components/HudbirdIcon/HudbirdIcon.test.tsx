import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { HudbirdIcon } from "./HudbirdIcon";

describe("HudbirdIcon component", () => {
  it("renders correctly with default props", () => {
    const { container } = render(<HudbirdIcon data-testid="hudbird-icon" />);
    const icon = screen.getByTestId("hudbird-icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("viewBox", "0 0 81 123");
    expect(icon).toHaveAttribute("fill", "currentColor");
    expect(container.querySelector("path")).toBeInTheDocument();
  });

  it("applies custom className and size", () => {
    render(<HudbirdIcon data-testid="hudbird-icon-custom" className="text-indigo-600" size={32} />);
    const icon = screen.getByTestId("hudbird-icon-custom");
    expect(icon).toHaveClass("text-indigo-600");
    expect(icon).toHaveStyle({ width: "32px", height: "32px" });
  });
});
