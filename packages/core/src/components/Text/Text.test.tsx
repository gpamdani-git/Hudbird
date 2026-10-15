import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Text, Strong, Code } from "./Text";

describe("Text polymorphic component", () => {
  it("renders as a paragraph <p> by default", () => {
    render(<Text>Default paragraph text</Text>);
    const textEl = screen.getByText("Default paragraph text");
    expect(textEl.tagName).toBe("P");
  });

  it("renders custom polymorphic tag when 'as' prop is passed", () => {
    const { rerender } = render(<Text as="span">Span element</Text>);
    expect(screen.getByText("Span element").tagName).toBe("SPAN");

    rerender(<Text as="h3">Heading 3 element</Text>);
    expect(screen.getByText("Heading 3 element").tagName).toBe("H3");
  });

  it("renders Strong component with semantic <strong> tag", () => {
    render(<Strong>Important text</Strong>);
    const strongEl = screen.getByText("Important text");
    expect(strongEl.tagName).toBe("STRONG");
    expect(strongEl).toHaveClass("font-semibold");
  });

  it("renders Code component with semantic <code> tag and mono font", () => {
    render(<Code>const x = 10;</Code>);
    const codeEl = screen.getByText("const x = 10;");
    expect(codeEl.tagName).toBe("CODE");
    expect(codeEl).toHaveClass("font-mono");
  });

  it("applies variant classes properly", () => {
    render(<Text variant="muted">Muted text</Text>);
    expect(screen.getByText("Muted text")).toHaveClass("text-zinc-500");
  });
});
