import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Checkbox } from "./Checkbox";

describe("Checkbox component", () => {
  it("renders with checkbox role and label", () => {
    render(<Checkbox label="I agree to terms" />);
    const checkbox = screen.getByRole("checkbox", { name: /i agree to terms/i });
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it("handles toggling checked state", () => {
    const handleChange = vi.fn();
    render(<Checkbox label="Subscribe" onChange={handleChange} />);
    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(2);
    expect(checkbox).not.toBeChecked();
  });

  it("respects defaultChecked prop", () => {
    render(<Checkbox label="Default selected" defaultChecked />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  it("disables input and prevents interaction when disabled is true", () => {
    const handleChange = vi.fn();
    render(<Checkbox label="Disabled option" disabled onChange={handleChange} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeDisabled();

    fireEvent.click(checkbox);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("renders description helper text", () => {
    render(<Checkbox label="Marketing emails" description="Receive weekly tips and discounts" />);
    expect(screen.getByText("Receive weekly tips and discounts")).toBeInTheDocument();
  });
});
