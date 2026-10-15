import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Calendar } from "./Calendar";
import { DatePicker } from "./DatePicker";
import { DateRangePicker } from "./DateRangePicker";

describe("Calendar component", () => {
  it("renders calendar with current month header and weekday columns", () => {
    const fixedDate = new Date(2026, 4, 15); // May 15, 2026
    render(<Calendar defaultValue={fixedDate} />);

    expect(screen.getByText("May 2026")).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /calendar/i })).toBeInTheDocument();
    expect(screen.getByRole("grid", { name: "May 2026" })).toBeInTheDocument();
  });

  it("selects a date when clicked and fires onChange callback", () => {
    const onChange = vi.fn();
    const fixedDate = new Date(2026, 4, 10); // May 10, 2026
    render(<Calendar defaultValue={fixedDate} onChange={onChange} />);

    // Click on 20th of May
    const day20 = screen.getByRole("button", {
      name: /Wednesday, May 20, 2026/i,
    });
    fireEvent.click(day20);

    expect(onChange).toHaveBeenCalledTimes(1);
    const selectedArg: Date = onChange.mock.calls[0][0];
    expect(selectedArg.getDate()).toBe(20);
    expect(selectedArg.getMonth()).toBe(4);
    expect(selectedArg.getFullYear()).toBe(2026);
  });

  it("navigates to next and previous months", () => {
    const fixedDate = new Date(2026, 4, 1); // May 2026
    render(<Calendar defaultValue={fixedDate} />);

    expect(screen.getByText("May 2026")).toBeInTheDocument();

    const nextBtn = screen.getByRole("button", { name: /next month/i });
    fireEvent.click(nextBtn);
    expect(screen.getByText("June 2026")).toBeInTheDocument();

    const prevBtn = screen.getByRole("button", { name: /previous month/i });
    fireEvent.click(prevBtn);
    expect(screen.getByText("May 2026")).toBeInTheDocument();
  });

  it("supports fast year navigation buttons (<< and >>)", () => {
    const fixedDate = new Date(2026, 4, 1); // May 2026
    render(<Calendar defaultValue={fixedDate} />);

    const nextYearBtn = screen.getByRole("button", { name: /next year/i });
    fireEvent.click(nextYearBtn);
    expect(screen.getByText("May 2027")).toBeInTheDocument();

    const prevYearBtn = screen.getByRole("button", { name: /previous year/i });
    fireEvent.click(prevYearBtn);
    expect(screen.getByText("May 2026")).toBeInTheDocument();
  });

  it("switches to month grid view when clicking month header and selects a month quickly", () => {
    const fixedDate = new Date(2026, 4, 1); // May 2026
    render(<Calendar defaultValue={fixedDate} />);

    // Click Month Year header title button
    const titleBtn = screen.getByRole("button", { name: /switch to month picker/i });
    fireEvent.click(titleBtn);

    // Month picker view is active, displays month buttons like Oct
    const octBtn = screen.getByRole("button", { name: /^oct$/i });
    fireEvent.click(octBtn);

    // Returns to day grid in October 2026
    expect(screen.getByText("October 2026")).toBeInTheDocument();
  });

  it("handles range selection in mode='range'", () => {
    const onRangeChange = vi.fn();
    const startDate = new Date(2026, 4, 5);
    render(<Calendar mode="range" defaultValue={startDate} onRangeChange={onRangeChange} />);

    // Select start: May 5
    const day5 = screen.getByRole("button", {
      name: /Tuesday, May 5, 2026/i,
    });
    fireEvent.click(day5);
    expect(onRangeChange).toHaveBeenCalledWith(
      expect.objectContaining({
        start: expect.any(Date),
        end: null,
      })
    );

    // Select end: May 12
    const day12 = screen.getByRole("button", {
      name: /Tuesday, May 12, 2026/i,
    });
    fireEvent.click(day12);
    expect(onRangeChange).toHaveBeenCalledWith(
      expect.objectContaining({
        start: expect.any(Date),
        end: expect.any(Date),
      })
    );
  });

  it("respects minDate and disables earlier dates", () => {
    const onChange = vi.fn();
    const fixedDate = new Date(2026, 4, 15);
    const minDate = new Date(2026, 4, 10);
    render(<Calendar defaultValue={fixedDate} minDate={minDate} onChange={onChange} />);

    // May 5 is before minDate (May 10)
    const day5 = screen.getByRole("button", {
      name: /Tuesday, May 5, 2026/i,
    });
    expect(day5).toBeDisabled();
    fireEvent.click(day5);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("supports fast preset shortcuts", () => {
    const onChange = vi.fn();
    const presets = [
      { label: "Christmas", value: new Date(2026, 11, 25) },
      { label: "New Year", value: new Date(2027, 0, 1) },
    ];
    render(<Calendar presets={presets} onChange={onChange} />);

    const xmasBtn = screen.getByRole("button", { name: "Christmas" });
    fireEvent.click(xmasBtn);

    expect(onChange).toHaveBeenCalledTimes(1);
    const selected: Date = onChange.mock.calls[0][0];
    expect(selected.getMonth()).toBe(11);
    expect(selected.getDate()).toBe(25);
  });

  it("supports time picker when showTime is true", () => {
    const onChange = vi.fn();
    const fixedDate = new Date(2026, 4, 15, 10, 30);
    render(<Calendar defaultValue={fixedDate} showTime onChange={onChange} />);

    expect(screen.getByText("Time:")).toBeInTheDocument();
    const hourSelect = screen.getByRole("combobox", { name: /hours/i });
    const minuteSelect = screen.getByRole("combobox", { name: /minutes/i });

    expect(hourSelect).toBeInTheDocument();
    expect(minuteSelect).toBeInTheDocument();

    // Select hour 14
    fireEvent.change(hourSelect, { target: { value: "14" } });
    expect(onChange).toHaveBeenCalled();
  });
});

describe("DatePicker component", () => {
  it("renders trigger and placeholder and opens calendar popover when clicked", () => {
    const onChange = vi.fn();
    render(<DatePicker placeholder="Pick your date" label="Event Date" onChange={onChange} />);

    expect(screen.getByText("Event Date")).toBeInTheDocument();
    expect(screen.getByText("Pick your date")).toBeInTheDocument();

    const trigger = screen.getByRole("button", { name: /pick your date/i });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("dialog", { name: /calendar date picker/i })).toBeInTheDocument();
  });

  it("selects a date from the popover and closes", () => {
    const onChange = vi.fn();
    const initialDate = new Date(2026, 4, 1);
    render(<DatePicker defaultValue={initialDate} onChange={onChange} />);

    // Click trigger to open
    const trigger = screen.getByRole("button", { name: /May 1, 2026/i });
    fireEvent.click(trigger);

    // Click day 18 in May 2026
    const day18 = screen.getByRole("button", {
      name: /Monday, May 18, 2026/i,
    });
    fireEvent.click(day18);

    expect(onChange).toHaveBeenCalledTimes(1);
    // Dialog should close
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("clears selected date when clear button is clicked", () => {
    const onChange = vi.fn();
    const initialDate = new Date(2026, 4, 1);
    render(<DatePicker defaultValue={initialDate} onChange={onChange} isClearable />);

    const clearBtn = screen.getByRole("button", { name: /clear date/i });
    fireEvent.click(clearBtn);

    expect(onChange).toHaveBeenCalledWith(null);
  });

  it("supports mode='range' and DateRangePicker component", () => {
    const onRangeChange = vi.fn();
    render(<DateRangePicker placeholder="Select booking period" onChange={onRangeChange} />);

    const trigger = screen.getByRole("button", { name: /select booking period/i });
    fireEvent.click(trigger);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
