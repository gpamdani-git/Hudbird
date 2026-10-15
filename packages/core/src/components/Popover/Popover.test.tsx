import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Popover, PopoverTrigger, PopoverContent } from "./Popover";

describe("Popover component", () => {
  it("renders trigger and does not display content when closed", () => {
    render(
      <Popover>
        <PopoverTrigger>
          <button>Open Popover</button>
        </PopoverTrigger>
        <PopoverContent>
          <p>Popover Details</p>
        </PopoverContent>
      </Popover>
    );

    expect(screen.getByRole("button", { name: /open popover/i })).toBeInTheDocument();
    expect(screen.queryByText("Popover Details")).not.toBeInTheDocument();
  });

  it("opens popover when trigger is clicked", () => {
    render(
      <Popover>
        <PopoverTrigger>
          <button>Click for Details</button>
        </PopoverTrigger>
        <PopoverContent>
          <p>Popover Content</p>
        </PopoverContent>
      </Popover>
    );

    const trigger = screen.getByRole("button", { name: /click for details/i });
    fireEvent.click(trigger);

    expect(screen.getByText("Popover Content")).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("closes popover when escape key is pressed", () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverContent>
          <p>Visible Content</p>
        </PopoverContent>
      </Popover>
    );

    expect(screen.getByText("Visible Content")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByText("Visible Content")).not.toBeInTheDocument();
  });

  it("calls onOpenChange callback when state changes", () => {
    const handleOpenChange = vi.fn();
    render(
      <Popover onOpenChange={handleOpenChange}>
        <PopoverTrigger>
          <button>Toggle</button>
        </PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    );

    const trigger = screen.getByRole("button", { name: /toggle/i });
    fireEvent.click(trigger);
    expect(handleOpenChange).toHaveBeenCalledWith(true);
  });
});
