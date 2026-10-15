import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ComboBox } from "./ComboBox";

const sampleOptions = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "angular", label: "Angular", disabled: true },
];

describe("ComboBox component", () => {
  it("renders with placeholder and label", () => {
    render(<ComboBox label="Framework" placeholder="Choose a framework" options={sampleOptions} />);
    expect(screen.getByText("Framework")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Choose a framework")).toBeInTheDocument();
  });

  it("filters and selects an option", () => {
    const handleValueChange = vi.fn();
    render(
      <ComboBox
        placeholder="Search tech"
        options={sampleOptions}
        onValueChange={handleValueChange}
      />
    );

    const input = screen.getByPlaceholderText("Search tech");
    fireEvent.focus(input);

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Vue")).toBeInTheDocument();

    // Select Vue
    fireEvent.click(screen.getByText("Vue"));
    expect(handleValueChange).toHaveBeenCalledWith("vue");
    expect(input).toHaveValue("Vue");
  });

  it("renders disabled state", () => {
    render(<ComboBox disabled placeholder="Disabled box" options={sampleOptions} />);
    expect(screen.getByPlaceholderText("Disabled box")).toBeDisabled();
  });

  it("shows error message when isInvalid is true", () => {
    render(
      <ComboBox isInvalid errorMessage="Framework selection is required" options={sampleOptions} />
    );
    expect(screen.getByText("Framework selection is required")).toBeInTheDocument();
  });
});
