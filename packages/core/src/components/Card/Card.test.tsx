import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card, CardHeader, CardBody, CardFooter } from "./Card";

describe("Card component", () => {
  it("renders with subcomponents correctly", () => {
    render(
      <Card>
        <CardHeader>Card Header</CardHeader>
        <CardBody>Card Body Content</CardBody>
        <CardFooter>Card Footer Action</CardFooter>
      </Card>
    );

    expect(screen.getByText("Card Header")).toBeInTheDocument();
    expect(screen.getByText("Card Body Content")).toBeInTheDocument();
    expect(screen.getByText("Card Footer Action")).toBeInTheDocument();
  });

  it("applies role='button' and tabIndex when isPressable is true", () => {
    render(<Card isPressable>Clickable Card</Card>);
    const cardEl = screen.getByRole("button", { name: /clickable card/i });
    expect(cardEl).toBeInTheDocument();
    expect(cardEl).toHaveAttribute("tabindex", "0");
  });

  it("applies variants and hoverable styling", () => {
    const { rerender } = render(<Card variant="bordered">Bordered Card</Card>);
    expect(screen.getByText("Bordered Card")).toHaveClass("border");

    rerender(<Card isHoverable>Hoverable Card</Card>);
    expect(screen.getByText("Hoverable Card")).toHaveClass("hover:-translate-y-1");
  });
});
