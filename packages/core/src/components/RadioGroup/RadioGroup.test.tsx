import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { RadioGroup, Radio } from "./index";

describe("RadioGroup and Radio component", () => {
  it("renders with label and radio items", () => {
    render(
      <RadioGroup label="Select Plan">
        <Radio value="free">Free</Radio>
        <Radio value="pro">Pro</Radio>
      </RadioGroup>
    );

    expect(screen.getByText("Select Plan")).toBeInTheDocument();
    expect(screen.getByLabelText("Free")).toBeInTheDocument();
    expect(screen.getByLabelText("Pro")).toBeInTheDocument();
  });

  it("handles selection and triggers onValueChange", () => {
    const handleValueChange = vi.fn();
    render(
      <RadioGroup onValueChange={handleValueChange}>
        <Radio value="apple">Apple</Radio>
        <Radio value="orange">Orange</Radio>
      </RadioGroup>
    );

    const appleRadio = screen.getByLabelText("Apple");
    const orangeRadio = screen.getByLabelText("Orange");

    expect(appleRadio).not.toBeChecked();
    fireEvent.click(appleRadio);

    expect(appleRadio).toBeChecked();
    expect(handleValueChange).toHaveBeenCalledWith("apple");

    fireEvent.click(orangeRadio);
    expect(orangeRadio).toBeChecked();
    expect(appleRadio).not.toBeChecked();
    expect(handleValueChange).toHaveBeenCalledWith("orange");
  });

  it("disables all radio buttons when isDisabled is true", () => {
    render(
      <RadioGroup isDisabled>
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
      </RadioGroup>
    );

    expect(screen.getByLabelText("A")).toBeDisabled();
    expect(screen.getByLabelText("B")).toBeDisabled();
  });

  it("displays errorMessage when isInvalid is true", () => {
    render(
      <RadioGroup isInvalid errorMessage="Selection is required">
        <Radio value="1">Option 1</Radio>
      </RadioGroup>
    );

    expect(screen.getByText("Selection is required")).toBeInTheDocument();
  });
});
