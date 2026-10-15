import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./Dialog";

describe("Dialog component", () => {
  it("renders when isOpen is true", () => {
    render(
      <Dialog isOpen={true}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modal Title</DialogTitle>
            <DialogDescription>Modal Description</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button>Close</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText("Modal Title")).toBeInTheDocument();
    expect(screen.getByText("Modal Description")).toBeInTheDocument();
  });

  it("does not render dialog content when isOpen is false", () => {
    render(
      <Dialog isOpen={false}>
        <DialogContent>
          <DialogTitle>Hidden Title</DialogTitle>
        </DialogContent>
      </Dialog>
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("calls onClose when escape key is pressed", () => {
    const handleClose = vi.fn();
    render(
      <Dialog isOpen={true} onClose={handleClose}>
        <DialogContent>
          <DialogTitle>Escape Modal</DialogTitle>
        </DialogContent>
      </Dialog>
    );

    fireEvent.keyDown(document, { key: "Escape" });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
