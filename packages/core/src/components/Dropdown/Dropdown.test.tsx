import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "./Dropdown";

describe("Dropdown component", () => {
  it("renders trigger and does not display menu items by default", () => {
    render(
      <Dropdown>
        <DropdownTrigger>
          <button>Options</button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Edit</DropdownItem>
          <DropdownItem>Delete</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );

    const trigger = screen.getByRole("button", { name: /options/i });
    expect(trigger).toBeInTheDocument();
    expect(screen.queryByText("Edit")).not.toBeInTheDocument();
  });

  it("opens menu when trigger is clicked and displays menu items", () => {
    render(
      <Dropdown>
        <DropdownTrigger>
          <button>Actions</button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Copy Link</DropdownItem>
          <DropdownItem>Duplicate</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );

    const trigger = screen.getByRole("button", { name: /actions/i });
    fireEvent.click(trigger);

    expect(screen.getByText("Copy Link")).toBeInTheDocument();
    expect(screen.getByText("Duplicate")).toBeInTheDocument();
  });

  it("handles item click and closes the menu", () => {
    const handleItemClick = vi.fn();
    render(
      <Dropdown defaultOpen>
        <DropdownTrigger>
          <button>Menu</button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem onClick={handleItemClick}>Save Project</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );

    const item = screen.getByRole("menuitem", { name: /save project/i });
    expect(item).toBeInTheDocument();

    fireEvent.click(item);
    expect(handleItemClick).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menuitem")).not.toBeInTheDocument();
  });

  it("does not trigger onClick for disabled items", () => {
    const handleItemClick = vi.fn();
    render(
      <Dropdown defaultOpen>
        <DropdownTrigger>
          <button>Menu</button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem disabled onClick={handleItemClick}>
            Archive
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );

    const item = screen.getByRole("menuitem", { name: /archive/i });
    expect(item).toHaveAttribute("aria-disabled", "true");

    fireEvent.click(item);
    expect(handleItemClick).not.toHaveBeenCalled();
  });
});
