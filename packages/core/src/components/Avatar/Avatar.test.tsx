import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Avatar } from "./Avatar";

describe("Avatar component", () => {
  it("renders image when src is provided", () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="User Avatar" />);
    const img = screen.getByAltText("User Avatar");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/avatar.jpg");
  });

  it("renders initials fallback when name is provided without src", () => {
    render(<Avatar name="John Doe" />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("applies size and radius styling properly", () => {
    const { container, rerender } = render(<Avatar name="Alice" size="lg" radius="full" />);
    expect(container.firstChild).toHaveClass("h-12", "w-12", "rounded-full");

    rerender(<Avatar name="Bob" size="sm" radius="md" />);
    expect(container.firstChild).toHaveClass("h-8", "w-8", "rounded-xl");
  });
});
