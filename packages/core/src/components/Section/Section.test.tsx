import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Section } from "./Section";

describe("Section Component", () => {
  it("renders with default props as <section>", () => {
    render(<Section data-testid="section">Content</Section>);
    const el = screen.getByTestId("section");
    expect(el.tagName).toBe("SECTION");
    expect(el).toHaveClass("relative", "w-full", "py-12");
  });

  it("renders polymorphic tags correctly", () => {
    const { rerender } = render(
      <Section as="main" data-testid="section">
        Main Content
      </Section>
    );
    expect(screen.getByTestId("section").tagName).toBe("MAIN");

    rerender(
      <Section as="article" data-testid="section">
        Article Content
      </Section>
    );
    expect(screen.getByTestId("section").tagName).toBe("ARTICLE");
  });

  it("applies spacing variants accurately", () => {
    const { rerender } = render(
      <Section spacing="none" data-testid="section">
        None
      </Section>
    );
    expect(screen.getByTestId("section")).toHaveClass("py-0");

    rerender(
      <Section spacing="xs" data-testid="section">
        XS
      </Section>
    );
    expect(screen.getByTestId("section")).toHaveClass("py-6");

    rerender(
      <Section spacing="lg" data-testid="section">
        LG
      </Section>
    );
    expect(screen.getByTestId("section")).toHaveClass("py-16");

    rerender(
      <Section spacing="xl" data-testid="section">
        XL
      </Section>
    );
    expect(screen.getByTestId("section")).toHaveClass("py-20");
  });

  it("applies surface variants correctly", () => {
    const { rerender } = render(
      <Section variant="card" data-testid="section">
        Card
      </Section>
    );
    expect(screen.getByTestId("section")).toHaveClass("bg-card", "border-y");

    rerender(
      <Section variant="obsidian" data-testid="section">
        Obsidian
      </Section>
    );
    expect(screen.getByTestId("section")).toHaveClass("bg-[#161618]", "text-white");
  });

  it("applies hairline border options", () => {
    const { rerender } = render(
      <Section bordered="top" data-testid="section">
        Border Top
      </Section>
    );
    expect(screen.getByTestId("section")).toHaveClass("border-t", "border-border");

    rerender(
      <Section bordered="bottom" data-testid="section">
        Border Bottom
      </Section>
    );
    expect(screen.getByTestId("section")).toHaveClass("border-b", "border-border");

    rerender(
      <Section bordered={true} data-testid="section">
        Border Both
      </Section>
    );
    expect(screen.getByTestId("section")).toHaveClass("border-y", "border-border");
  });

  it("applies fullHeight with safe 100dvh viewport class", () => {
    render(
      <Section fullHeight data-testid="section">
        Hero Fullscreen
      </Section>
    );
    const el = screen.getByTestId("section");
    expect(el).toHaveClass("min-h-[100dvh]", "flex", "flex-col", "justify-center");
  });

  it("forwards ref to the underlying element", () => {
    const ref = React.createRef<HTMLElement>();
    render(<Section ref={ref}>Ref test</Section>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
