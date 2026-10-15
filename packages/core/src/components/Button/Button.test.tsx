import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

describe("Button component", () => {
  it("renders correctly with default props", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it("handles onClick callback when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Submit</Button>);
    const button = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("disables the button and prevents click when disabled prop is true", () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled Button
      </Button>
    );
    const button = screen.getByRole("button", { name: /disabled button/i });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-disabled", "true");
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("shows loading spinner and disables button when isLoading is true", () => {
    render(<Button isLoading>Saving...</Button>);
    const button = screen.getByRole("button", { name: /saving\.\.\./i });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button.querySelector("svg")).toBeInTheDocument();
  });

  it("renders with different variants", () => {
    const { rerender } = render(<Button variant="solid">Solid</Button>);
    expect(screen.getByRole("button")).toHaveClass("shadow-xs");

    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole("button")).toHaveClass("border");

    rerender(<Button variant="bordered">Bordered</Button>);
    expect(screen.getByRole("button")).toHaveClass("border-2");
  });

  it("renders as anchor link when href prop is provided", () => {
    render(<Button href="https://hudbird.com">Go to Hudbird</Button>);
    const link = screen.getByRole("link", { name: /go to hudbird/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://hudbird.com");
  });

  it("renders startContent and endContent icons", () => {
    render(
      <Button
        startContent={<span data-testid="start-icon">⭐</span>}
        endContent={<span data-testid="end-icon">🚀</span>}
      >
        Icon Button
      </Button>
    );
    expect(screen.getByTestId("start-icon")).toBeInTheDocument();
    expect(screen.getByTestId("end-icon")).toBeInTheDocument();
  });
});
