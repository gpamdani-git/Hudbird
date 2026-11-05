import "@testing-library/jest-dom/vitest";
import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "./Input";

describe("Input component", () => {
  it("renders with placeholder and label correctly", () => {
    render(<Input label="Email Address" placeholder="you@example.com" />);
    expect(screen.getByText("Email Address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("you@example.com")).toBeInTheDocument();
  });

  it("handles user typing and triggers onChange", () => {
    const handleChange = vi.fn();
    render(<Input placeholder="Type here" onChange={handleChange} />);
    const input = screen.getByPlaceholderText("Type here") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "Hello World" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input.value).toBe("Hello World");
  });

  it("displays errorMessage when isInvalid is true", () => {
    render(
      <Input label="Password" isInvalid errorMessage="Password must be at least 8 characters" />
    );
    expect(screen.getByText("Password must be at least 8 characters")).toBeInTheDocument();
  });

  it("displays description helper text", () => {
    render(<Input label="Username" description="Choose a unique username for your profile" />);
    expect(screen.getByText("Choose a unique username for your profile")).toBeInTheDocument();
  });

  it("handles isClearable and triggers onClear callback", () => {
    const handleClear = vi.fn();
    render(<Input defaultValue="Clear me" isClearable onClear={handleClear} />);
    const input = screen.getByDisplayValue("Clear me");
    expect(input).toBeInTheDocument();

    const clearButton = screen.getByRole("button", { name: /clear input/i });
    expect(clearButton).toBeInTheDocument();

    fireEvent.click(clearButton);
    expect(handleClear).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue("");
  });

  it("disables the input when isDisabled is true", () => {
    render(<Input placeholder="Disabled input" isDisabled />);
    const input = screen.getByPlaceholderText("Disabled input");
    expect(input).toBeDisabled();
  });
});

describe("Input accessible label", () => {
  it("associates the outside label with a unique generated input id", () => {
    render(
      <>
        <Input label="Brand name" />
        <Input label="Primary color" />
      </>
    );
    expect(screen.getByLabelText("Brand name")).toHaveAttribute("id");
    expect(screen.getByLabelText("Brand name").id).not.toBe(
      screen.getByLabelText("Primary color").id
    );
  });
  it("preserves consumer ids and labels inside inputs", () => {
    render(<Input id="brand-logo" label="Logo URL" labelPlacement="inside" />);
    expect(screen.getByLabelText("Logo URL")).toHaveAttribute("id", "brand-logo");
  });
});
