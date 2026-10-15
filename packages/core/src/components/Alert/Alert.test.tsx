import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Alert } from "./Alert";

describe("Alert component", () => {
  it("renders with role='alert' and text content", () => {
    render(<Alert title="System Update" description="A new update is available." />);
    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(screen.getByText("System Update")).toBeInTheDocument();
    expect(screen.getByText("A new update is available.")).toBeInTheDocument();
  });

  it("handles isClosable and triggers onClose callback", () => {
    const handleClose = vi.fn();
    render(<Alert title="Notice" isClosable onClose={handleClose} />);
    const closeBtn = screen.getByRole("button", { name: /close alert/i });
    expect(closeBtn).toBeInTheDocument();

    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("applies variant and color classes properly", () => {
    const { rerender } = render(<Alert variant="solid" color="success" title="Success Alert" />);
    expect(screen.getByRole("alert")).toHaveClass("bg-emerald-600");

    rerender(<Alert variant="solid" color="danger" title="Danger Alert" />);
    expect(screen.getByRole("alert")).toHaveClass("bg-rose-600");
  });

  it("renders custom icon", () => {
    render(<Alert title="Warning" icon={<span data-testid="alert-icon">⚠️</span>} />);
    expect(screen.getByTestId("alert-icon")).toBeInTheDocument();
  });
});
