import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "./Sheet";

describe("Sheet / Drawer component", () => {
  it("renders when isOpen is true with role='dialog'", () => {
    render(
      <Sheet isOpen={true}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Navigation Menu</SheetTitle>
            <SheetDescription>Explore all available routes</SheetDescription>
          </SheetHeader>
          <div>Drawer Body</div>
          <SheetFooter>
            <button>Logout</button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText("Navigation Menu")).toBeInTheDocument();
    expect(screen.getByText("Explore all available routes")).toBeInTheDocument();
    expect(screen.getByText("Drawer Body")).toBeInTheDocument();
  });

  it("does not render when isOpen is false", () => {
    render(
      <Sheet isOpen={false}>
        <SheetContent>
          <SheetTitle>Hidden Drawer</SheetTitle>
        </SheetContent>
      </Sheet>
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("triggers onClose when close button is clicked", () => {
    const handleClose = vi.fn();
    render(
      <Sheet isOpen={true} onClose={handleClose}>
        <SheetContent>
          <SheetTitle>Test Sheet</SheetTitle>
        </SheetContent>
      </Sheet>
    );

    const closeBtn = screen.getByRole("button", { name: /close sheet/i });
    expect(closeBtn).toBeInTheDocument();

    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("triggers onClose when Escape key is pressed", () => {
    const handleClose = vi.fn();
    render(
      <Sheet isOpen={true} onClose={handleClose}>
        <SheetContent>
          <SheetTitle>Escape Sheet</SheetTitle>
        </SheetContent>
      </Sheet>
    );

    fireEvent.keyDown(document, { key: "Escape" });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
