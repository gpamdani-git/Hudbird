import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Toaster, toast } from "./Toast";

describe("Toast & Toaster component", () => {
  beforeEach(() => {
    toast.dismiss();
  });

  it("renders toaster container and displays triggered toast", () => {
    render(<Toaster />);

    act(() => {
      toast("Profile saved successfully");
    });

    expect(screen.getByText("Profile saved successfully")).toBeInTheDocument();
  });

  it("displays success, error, and warning toasts with proper types", () => {
    render(<Toaster />);

    act(() => {
      toast.success("Success Toast");
      toast.error("Error Toast");
      toast.warning("Warning Toast");
    });

    expect(screen.getByText("Success Toast")).toBeInTheDocument();
    expect(screen.getByText("Error Toast")).toBeInTheDocument();
    expect(screen.getByText("Warning Toast")).toBeInTheDocument();
  });

  it("dismisses toast when close button is clicked", () => {
    render(<Toaster />);

    act(() => {
      toast("Dismissible message");
    });

    const closeBtn = screen.getByRole("button", { name: /dismiss toast/i });
    expect(closeBtn).toBeInTheDocument();

    act(() => {
      fireEvent.click(closeBtn);
    });

    expect(screen.queryByText("Dismissible message")).not.toBeInTheDocument();
  });

  it("triggers action button callback and closes toast", () => {
    const handleAction = vi.fn();
    render(<Toaster />);

    act(() => {
      toast("File deleted", {
        action: {
          label: "Undo",
          onClick: handleAction,
        },
      });
    });

    const actionBtn = screen.getByRole("button", { name: /undo/i });
    expect(actionBtn).toBeInTheDocument();

    act(() => {
      fireEvent.click(actionBtn);
    });

    expect(handleAction).toHaveBeenCalledTimes(1);
    expect(screen.queryByText("File deleted")).not.toBeInTheDocument();
  });
});
