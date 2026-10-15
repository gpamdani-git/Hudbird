import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from "./Pagination";

describe("Pagination component", () => {
  it("renders page buttons and navigation arrows", () => {
    render(<Pagination total={5} defaultPage={1} />);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("handles page change when clicking a number", () => {
    const handleChange = vi.fn();
    render(<Pagination total={5} defaultPage={1} onChange={handleChange} />);

    const page3 = screen.getByText("3");
    fireEvent.click(page3);

    expect(handleChange).toHaveBeenCalledWith(3);
  });

  it("disables previous button on first page", () => {
    render(<Pagination total={5} page={1} />);
    const prevBtn = screen.getByLabelText("Previous page");
    expect(prevBtn).toBeDisabled();
  });

  it("disables all controls when isDisabled is true", () => {
    render(<Pagination total={5} isDisabled />);
    const pageButtons = screen.getAllByRole("button");
    pageButtons.forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  });
});
