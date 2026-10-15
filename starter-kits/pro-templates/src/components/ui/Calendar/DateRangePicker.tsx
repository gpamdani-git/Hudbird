// packages/core/src/components/Calendar/DateRangePicker.tsx
"use client";

import * as React from "react";
import { DatePicker, type DatePickerProps } from "./DatePicker";
import { type DateRange } from "./Calendar";

export interface DateRangePickerProps extends Omit<
  DatePickerProps,
  "mode" | "value" | "defaultValue" | "onChange"
> {
  /**
   * The controlled range value
   */
  value?: DateRange;
  /**
   * Uncontrolled default range value
   */
  defaultValue?: DateRange;
  /**
   * Callback fired when range changes
   */
  onChange?: (range: DateRange) => void;
}

export const DateRangePicker = React.forwardRef<HTMLDivElement, DateRangePickerProps>(
  ({ value, defaultValue, onChange, placeholder = "Select date range", ...props }, ref) => {
    return (
      <DatePicker
        ref={ref}
        mode="range"
        rangeValue={value}
        defaultRangeValue={defaultValue}
        onRangeChange={onChange}
        placeholder={placeholder}
        showPresets
        {...props}
      />
    );
  }
);

DateRangePicker.displayName = "DateRangePicker";
