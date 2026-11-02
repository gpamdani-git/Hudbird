import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Container } from "./Container";

describe("Container Component", () => {
  it("renders with default props (xl size, centered, md gutter)", () => {
    render(<Container data-testid="container">Container Content</Container>);
    const el = screen.getByTestId("container");
    expect(el.tagName).toBe("DIV");
    expect(el).toHaveClass("w-full", "max-w-7xl", "mx-auto", "px-4");
  });

  it("renders polymorphic tags correctly", () => {
    const { rerender } = render(
      <Container as="main" data-testid="container">
        Main
      </Container>
    );
    expect(screen.getByTestId("container").tagName).toBe("MAIN");

    rerender(
      <Container as="header" data-testid="container">
        Header
      </Container>
    );
    expect(screen.getByTestId("container").tagName).toBe("HEADER");
  });

  it("applies size variants accurately, including prose reading measure", () => {
    const { rerender } = render(
      <Container size="prose" data-testid="container">
        Prose Reading Channel
      </Container>
    );
    expect(screen.getByTestId("container")).toHaveClass("max-w-3xl");

    rerender(
      <Container size="sm" data-testid="container">
        Small
      </Container>
    );
    expect(screen.getByTestId("container")).toHaveClass("max-w-screen-sm");

    rerender(
      <Container size="2xl" data-testid="container">
        2XL Wide
      </Container>
    );
    expect(screen.getByTestId("container")).toHaveClass("max-w-[1440px]");

    rerender(
      <Container size="fluid" data-testid="container">
        Fluid
      </Container>
    );
    expect(screen.getByTestId("container")).toHaveClass("max-w-none");
  });

  it("applies gutter padding correctly", () => {
    const { rerender } = render(
      <Container gutter="none" data-testid="container">
        No Gutter
      </Container>
    );
    expect(screen.getByTestId("container")).toHaveClass("px-0");

    rerender(
      <Container gutter="lg" data-testid="container">
        Monumental Gutter
      </Container>
    );
    expect(screen.getByTestId("container")).toHaveClass("px-6");
  });

  it("handles non-centered layouts", () => {
    render(
      <Container centered={false} data-testid="container">
        Left Aligned
      </Container>
    );
    expect(screen.getByTestId("container")).not.toHaveClass("mx-auto");
  });

  it("forwards ref to the underlying div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Container ref={ref}>Ref test</Container>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
