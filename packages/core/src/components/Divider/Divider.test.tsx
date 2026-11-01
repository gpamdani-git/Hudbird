import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Divider } from "./Divider";

describe("Divider component", () => {
  it("renders with separator role", () => {
    render(<Divider />);
    const divider = screen.getByRole("separator");
    expect(divider).toBeInTheDocument();
  });

  it("renders with children label in center", () => {
    render(<Divider>OR</Divider>);
    expect(screen.getByText("OR")).toBeInTheDocument();
  });

  it("supports vertical orientation", () => {
    render(<Divider orientation="vertical" />);
    const divider = screen.getByRole("separator");
    expect(divider).toHaveAttribute("aria-orientation", "vertical");
  });

  it("supports dotted and gradient variants", () => {
    const { rerender } = render(<Divider variant="dotted" data-testid="div-dotted" />);
    expect(screen.getByTestId("div-dotted")).toBeInTheDocument();

    rerender(<Divider variant="gradient" data-testid="div-gradient" />);
    expect(screen.getByTestId("div-gradient")).toBeInTheDocument();
  });

  it("supports icon slot in separator", () => {
    render(<Divider icon={<span data-testid="test-icon">✦</span>}>Featured</Divider>);
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    expect(screen.getByText("Featured")).toBeInTheDocument();
  });
});
