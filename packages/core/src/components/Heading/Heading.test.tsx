import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Heading } from "./Heading";

describe("Heading component", () => {
  it("renders with default h1 element and text", () => {
    render(<Heading>Main Heading</Heading>);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Main Heading");
  });

  it("supports polymorphic 'as' prop", () => {
    const { rerender } = render(<Heading as="h2">Level 2</Heading>);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();

    rerender(<Heading as="h4">Level 4</Heading>);
    expect(screen.getByRole("heading", { level: 4 })).toBeInTheDocument();
  });

  it("applies color variants correctly", () => {
    const { container } = render(<Heading color="muted">Muted Subhead</Heading>);
    expect(container.firstChild).toHaveClass("text-zinc-500");
  });
});
