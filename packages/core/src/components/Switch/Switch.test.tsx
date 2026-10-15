import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Switch } from "./Switch";

describe("Switch component", () => {
  it("renders with role='switch' and label", () => {
    render(<Switch label="Enable Notifications" />);
    const switchEl = screen.getByRole("switch", { name: /enable notifications/i });
    expect(switchEl).toBeInTheDocument();
    expect(switchEl).not.toBeChecked();
  });

  it("handles toggling in uncontrolled mode", () => {
    const handleChange = vi.fn();
    render(<Switch label="Dark Mode" onChange={handleChange} />);
    const switchEl = screen.getByRole("switch");

    fireEvent.click(switchEl);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(switchEl).toBeChecked();

    fireEvent.click(switchEl);
    expect(handleChange).toHaveBeenCalledTimes(2);
    expect(switchEl).not.toBeChecked();
  });

  it("respects defaultChecked prop", () => {
    render(<Switch label="Active" defaultChecked />);
    const switchEl = screen.getByRole("switch");
    expect(switchEl).toBeChecked();
  });

  it("respects disabled prop and prevents changes", () => {
    const handleChange = vi.fn();
    render(<Switch label="Disabled Switch" disabled onChange={handleChange} />);
    const switchEl = screen.getByRole("switch");
    expect(switchEl).toBeDisabled();

    fireEvent.click(switchEl);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("renders description helper text", () => {
    render(<Switch label="Biometric Login" description="Use fingerprint or face recognition" />);
    expect(screen.getByText("Use fingerprint or face recognition")).toBeInTheDocument();
  });
});
