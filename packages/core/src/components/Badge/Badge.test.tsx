import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "./Badge";

describe("Badge component", () => {
  it("renders correctly with text content", () => {
    render(<Badge>New Feature</Badge>);
    expect(screen.getByText("New Feature")).toBeInTheDocument();
  });

  it("applies variant classes correctly", () => {
    const { rerender } = render(
      <Badge variant="solid" color="success">
        Success
      </Badge>
    );
    const badge = screen.getByText("Success");
    expect(badge).toHaveClass("bg-emerald-600");

    rerender(
      <Badge variant="outline" color="primary">
        Outline
      </Badge>
    );
    const outlineBadge = screen.getByText("Outline");
    expect(outlineBadge).toHaveClass("border");

    rerender(
      <Badge variant="flat" color="danger">
        Flat Danger
      </Badge>
    );
    const flatBadge = screen.getByText("Flat Danger");
    expect(flatBadge).toHaveClass("bg-rose-50");
  });

  it("applies size classes accurately", () => {
    const { rerender } = render(<Badge size="sm">Small</Badge>);
    expect(screen.getByText("Small")).toHaveClass("text-[10px]");

    rerender(<Badge size="md">Medium</Badge>);
    expect(screen.getByText("Medium")).toHaveClass("text-xs");

    rerender(<Badge size="lg">Large</Badge>);
    expect(screen.getByText("Large")).toHaveClass("text-sm");
  });

  it("merges custom className with default variant styles", () => {
    render(<Badge className="custom-test-class">Custom</Badge>);
    expect(screen.getByText("Custom")).toHaveClass("custom-test-class");
  });

  it("supports wrapping children with a badge notification content", () => {
    render(
      <Badge content="5" color="danger">
        <button>Notifications</button>
      </Badge>
    );
    expect(screen.getByRole("button", { name: /notifications/i })).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });
});
