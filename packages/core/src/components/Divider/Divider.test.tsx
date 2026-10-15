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
});
