import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Textarea } from "./Textarea";

describe("Textarea component", () => {
  it("renders textarea element with placeholder", () => {
    render(<Textarea placeholder="Enter your comments..." />);
    const textarea = screen.getByPlaceholderText("Enter your comments...");
    expect(textarea).toBeInTheDocument();
  });

  it("handles input changes", () => {
    const handleChange = vi.fn();
    render(<Textarea placeholder="Type here" onChange={handleChange} />);
    const textarea = screen.getByPlaceholderText("Type here");

    fireEvent.change(textarea, { target: { value: "Hello World" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("renders disabled state correctly", () => {
    render(<Textarea disabled placeholder="Disabled notes" />);
    const textarea = screen.getByPlaceholderText("Disabled notes");
    expect(textarea).toBeDisabled();
  });

  it("applies error styling when isInvalid is true", () => {
    render(<Textarea isInvalid placeholder="Invalid input" />);
    const textarea = screen.getByPlaceholderText("Invalid input");
    expect(textarea.className).toContain("!border-rose-600");
  });

  it("renders different variants", () => {
    const { rerender } = render(<Textarea variant="flat" placeholder="Flat" />);
    let textarea = screen.getByPlaceholderText("Flat");
    expect(textarea.className).toContain("bg-muted");

    rerender(<Textarea variant="underlined" placeholder="Underlined" />);
    textarea = screen.getByPlaceholderText("Underlined");
    expect(textarea.className).toContain("border-b-2");
  });
});
