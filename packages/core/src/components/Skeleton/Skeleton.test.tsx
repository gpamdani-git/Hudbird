import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Skeleton } from "./Skeleton";

describe("Skeleton component", () => {
  it("renders with aria-hidden='true'", () => {
    const { container } = render(<Skeleton className="h-8 w-32" />);
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveAttribute("aria-hidden", "true");
    expect(skeleton).toHaveClass("w-32", "h-8");
  });

  it("applies variant and animation classes properly", () => {
    const { container, rerender } = render(<Skeleton variant="circle" />);
    expect(container.firstChild).toHaveClass("rounded-full");

    rerender(<Skeleton variant="text" />);
    expect(container.firstChild).toHaveClass("rounded-md", "h-4");

    rerender(<Skeleton animation="pulse" />);
    expect(container.firstChild).toHaveClass("animate-pulse");
  });
});
