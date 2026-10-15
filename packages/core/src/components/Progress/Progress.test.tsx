import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Progress, CircularProgress } from "./Progress";

describe("Progress component", () => {
  it("renders with default progressbar role and calculates percentage", () => {
    render(<Progress value={45} label="Uploading file" showValueLabel />);

    const bar = screen.getByRole("progressbar");
    expect(bar).toBeInTheDocument();
    expect(bar).toHaveAttribute("aria-valuenow", "45");
    expect(bar).toHaveAttribute("aria-valuemin", "0");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
    expect(screen.getByText("Uploading file")).toBeInTheDocument();
    expect(screen.getByText("45%")).toBeInTheDocument();
  });

  it("handles indeterminate mode", () => {
    render(<Progress isIndeterminate label="Syncing..." />);
    const bar = screen.getByRole("progressbar");
    expect(bar).not.toHaveAttribute("aria-valuenow");
    expect(bar).toHaveAttribute("aria-valuetext", "Loading...");
  });

  it("clamps percentage values between 0 and 100", () => {
    const { rerender } = render(<Progress value={150} showValueLabel />);
    expect(screen.getByText("100%")).toBeInTheDocument();

    rerender(<Progress value={-20} showValueLabel />);
    expect(screen.getByText("0%")).toBeInTheDocument();
  });

  it("renders CircularProgress with center label", () => {
    render(<CircularProgress value={75} showValueLabel />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(screen.getByText("75%")).toBeInTheDocument();
  });
});
