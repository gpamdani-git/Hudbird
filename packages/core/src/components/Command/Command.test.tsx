import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
  CommandShortcut,
} from "./Command";

describe("Command Palette component", () => {
  it("renders search input, groups, and command items", () => {
    render(
      <Command>
        <CommandInput placeholder="Type a command..." />
        <CommandList>
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>
              Settings
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );

    expect(screen.getByPlaceholderText("Type a command...")).toBeInTheDocument();
    expect(screen.getByText("Suggestions")).toBeInTheDocument();
    expect(screen.getByText("Calendar")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("⌘S")).toBeInTheDocument();
  });

  it("filters command items based on search input", () => {
    render(
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup heading="Actions">
            <CommandItem>Profile</CommandItem>
            <CommandItem>Billing</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );

    const input = screen.getByPlaceholderText("Search...");
    fireEvent.change(input, { target: { value: "Bill" } });

    expect(screen.getByText("Billing")).toBeInTheDocument();
    expect(screen.queryByText("Profile")).not.toBeInTheDocument();
  });

  it("calls onSelect callback when item is clicked", () => {
    const handleSelect = vi.fn();
    render(
      <Command>
        <CommandInput />
        <CommandList>
          <CommandGroup>
            <CommandItem onSelect={handleSelect}>Copy Link</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );

    const item = screen.getByText("Copy Link");
    fireEvent.click(item);
    expect(handleSelect).toHaveBeenCalledTimes(1);
  });

  it("renders in modal dialog and handles escape key", () => {
    const handleClose = vi.fn();
    render(
      <CommandDialog isOpen={true} onClose={handleClose}>
        <CommandInput placeholder="Search actions..." />
        <CommandList>
          <CommandItem>Dashboard</CommandItem>
        </CommandList>
      </CommandDialog>
    );

    expect(screen.getByPlaceholderText("Search actions...")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
