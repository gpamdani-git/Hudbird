import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Select, SelectItem } from "./Select";

describe("Select component", () => {
  it("renders trigger button with placeholder", () => {
    render(
      <Select placeholder="Choose country">
        <SelectItem value="id">Indonesia</SelectItem>
        <SelectItem value="us">United States</SelectItem>
      </Select>
    );

    expect(screen.getByRole("combobox")).toHaveTextContent("Choose country");
  });

  it("renders label and description", () => {
    render(
      <Select label="Country" description="Select your citizenship">
        <SelectItem value="id">Indonesia</SelectItem>
      </Select>
    );

    expect(screen.getByText("Country")).toBeInTheDocument();
    expect(screen.getByText("Select your citizenship")).toBeInTheDocument();
  });

  it("opens options list on click and selects an item", () => {
    const handleValueChange = vi.fn();
    render(
      <Select placeholder="Choose fruit" onValueChange={handleValueChange}>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
      </Select>
    );

    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);

    expect(screen.getByRole("listbox")).toBeInTheDocument();
    const bananaOption = screen.getByText("Banana");
    fireEvent.click(bananaOption);

    expect(handleValueChange).toHaveBeenCalledWith("banana");
    expect(trigger).toHaveTextContent("Banana");
  });

  it("disables trigger when disabled is true", () => {
    render(
      <Select disabled placeholder="Disabled select">
        <SelectItem value="1">One</SelectItem>
      </Select>
    );

    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("displays error message when isInvalid is true", () => {
    render(
      <Select isInvalid errorMessage="Selection required">
        <SelectItem value="1">One</SelectItem>
      </Select>
    );

    expect(screen.getByText("Selection required")).toBeInTheDocument();
  });
});
