import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Slot } from "./Slot";
import { Button } from "../Button";

describe("Slot component and asChild polymorphism", () => {
  it("renders child element directly without wrapping div", () => {
    render(
      <Slot className="custom-slot-class" data-testid="slot-child">
        <a href="/test">Link Child</a>
      </Slot>
    );

    const link = screen.getByRole("link", { name: "Link Child" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/test");
    expect(link).toHaveClass("custom-slot-class");
    expect(link.tagName.toLowerCase()).toBe("a");
  });

  it("merges event handlers between slot and child", () => {
    const slotClick = vi.fn();
    const childClick = vi.fn();

    render(
      <Slot onClick={slotClick}>
        <button onClick={childClick}>Click Me</button>
      </Slot>
    );

    const btn = screen.getByRole("button", { name: "Click Me" });
    fireEvent.click(btn);

    expect(childClick).toHaveBeenCalledTimes(1);
    expect(slotClick).toHaveBeenCalledTimes(1);
  });

  it("works seamlessly with Button asChild prop", () => {
    render(
      <Button asChild variant="outline" color="primary">
        <a href="/dashboard">Go to Dashboard</a>
      </Button>
    );

    const link = screen.getByRole("link", { name: "Go to Dashboard" });
    expect(link).toBeInTheDocument();
    expect(link.tagName.toLowerCase()).toBe("a");
    // Ensure button variants styling is transferred to the <a> tag
    expect(link).toHaveClass("border", "inline-flex");
    // Should NOT have a nested button inside
    expect(link.querySelector("button")).toBeNull();
  });
});
