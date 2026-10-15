import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Slider } from "./Slider";

describe("Slider component", () => {
  it("renders with role='slider' and default value", () => {
    render(<Slider label="Volume" defaultValue={50} min={0} max={100} showValue />);
    const slider = screen.getByRole("slider");
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute("aria-valuenow", "50");
    expect(slider).toHaveAttribute("aria-valuemin", "0");
    expect(slider).toHaveAttribute("aria-valuemax", "100");
    expect(screen.getByText("Volume")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
  });

  it("handles keyboard navigation (ArrowRight and ArrowLeft)", () => {
    const handleChange = vi.fn();
    render(<Slider defaultValue={20} min={0} max={100} step={5} onChange={handleChange} />);
    const slider = screen.getByRole("slider");

    // Arrow Right should increment by step
    fireEvent.keyDown(slider, { key: "ArrowRight" });
    expect(handleChange).toHaveBeenCalledWith(25);
    expect(slider).toHaveAttribute("aria-valuenow", "25");

    // Arrow Left should decrement by step
    fireEvent.keyDown(slider, { key: "ArrowLeft" });
    expect(handleChange).toHaveBeenCalledWith(20);
    expect(slider).toHaveAttribute("aria-valuenow", "20");
  });

  it("handles Home and End keys for min and max boundaries", () => {
    const handleChange = vi.fn();
    render(<Slider defaultValue={30} min={0} max={100} onChange={handleChange} />);
    const slider = screen.getByRole("slider");

    fireEvent.keyDown(slider, { key: "Home" });
    expect(handleChange).toHaveBeenCalledWith(0);

    fireEvent.keyDown(slider, { key: "End" });
    expect(handleChange).toHaveBeenCalledWith(100);
  });

  it("disables interaction when disabled is true", () => {
    const handleChange = vi.fn();
    render(<Slider defaultValue={40} disabled onChange={handleChange} />);
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-disabled", "true");

    fireEvent.keyDown(slider, { key: "ArrowRight" });
    expect(handleChange).not.toHaveBeenCalled();
  });
});
