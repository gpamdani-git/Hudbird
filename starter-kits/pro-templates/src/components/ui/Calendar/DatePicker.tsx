// packages/core/src/components/Calendar/DatePicker.tsx
"use client";

import * as React from "react";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  Calendar,
  type CalendarColor,
  type CalendarSize,
  type CalendarPreset,
  type DateRange,
} from "./Calendar";

export interface DatePickerProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange" | "defaultValue"
> {
  /**
   * Mode: "single" for one date, or "range" for start and end span
   */
  mode?: "single" | "range";
  /**
   * The selected date value in single mode (controlled)
   */
  value?: Date | null;
  /**
   * The default date value in single mode (uncontrolled)
   */
  defaultValue?: Date | null;
  /**
   * Callback fired when selected date changes in single mode
   */
  onChange?: (date: Date | null) => void;
  /**
   * The selected date range in range mode (controlled)
   */
  rangeValue?: DateRange;
  /**
   * Default date range in range mode (uncontrolled)
   */
  defaultRangeValue?: DateRange;
  /**
   * Callback fired when range changes in range mode
   */
  onRangeChange?: (range: DateRange) => void;
  /**
   * Field label
   */
  label?: string;
  /**
   * Placeholder when no date is selected
   */
  placeholder?: string;
  /**
   * Earliest selectable date
   */
  minDate?: Date;
  /**
   * Latest selectable date
   */
  maxDate?: Date;
  /**
   * Function to determine if a specific date is disabled
   */
  isDateDisabled?: (date: Date) => boolean;
  /**
   * Disable past dates
   */
  disablePastDates?: boolean;
  /**
   * Disable future dates
   */
  disableFutureDates?: boolean;
  /**
   * Disable Saturday and Sunday
   */
  disableWeekends?: boolean;
  /**
   * Visual style variant
   */
  variant?: "flat" | "bordered" | "underlined";
  /**
   * Size of the input
   */
  size?: CalendarSize;
  /**
   * Color theme
   */
  color?: CalendarColor;
  /**
   * Disable the picker
   */
  disabled?: boolean;
  /**
   * Show clear button when a date is selected
   */
  isClearable?: boolean;
  /**
   * Custom date formatting function for single date
   */
  formatDate?: (date: Date) => string;
  /**
   * Custom date formatting function for date range
   */
  formatRange?: (range: DateRange) => string;
  /**
   * Helper text shown beneath the input
   */
  helperText?: React.ReactNode;
  /**
   * Error message shown beneath the input
   */
  errorMessage?: React.ReactNode;
  /**
   * Whether the input is in an invalid state
   */
  isInvalid?: boolean;
  /**
   * Include fast presets shortcuts
   */
  presets?: CalendarPreset[];
  /**
   * Enable default quick presets
   */
  showPresets?: boolean;
  /**
   * Show time picker inside calendar
   */
  showTime?: boolean;
  /**
   * Time format (12h or 24h)
   */
  timeFormat?: "12h" | "24h";
}

const variantStyles = {
  flat: "bg-muted/60 hover:bg-muted/90 border border-transparent focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20 shadow-2xs",
  bordered:
    "bg-transparent border border-border hover:border-foreground/30 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20 shadow-2xs",
  underlined:
    "bg-transparent rounded-none border-0 border-b-2 border-border hover:border-foreground/30 focus-within:border-ring px-0.5",
};

const sizeStyles = {
  sm: "h-8 text-xs px-2.5 gap-2",
  md: "h-10 text-sm px-3 gap-2.5",
  lg: "h-12 text-base px-3.5 gap-3",
};

export const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      className,
      mode = "single",
      value: controlledValue,
      defaultValue = null,
      onChange,
      rangeValue: controlledRange,
      defaultRangeValue = { start: null, end: null },
      onRangeChange,
      label,
      placeholder = mode === "range" ? "Select date range" : "Select a date",
      minDate,
      maxDate,
      isDateDisabled,
      disablePastDates = false,
      disableFutureDates = false,
      disableWeekends = false,
      variant = "flat",
      size = "md",
      color = "primary",
      disabled = false,
      isClearable = true,
      formatDate,
      formatRange,
      helperText,
      errorMessage,
      isInvalid = false,
      presets: customPresets,
      showPresets = false,
      showTime = false,
      timeFormat = "24h",
      ...props
    },
    ref
  ) => {
    // Single mode state
    const [uncontrolledValue, setUncontrolledValue] = React.useState<Date | null>(defaultValue);
    const selectedDate = controlledValue !== undefined ? controlledValue : uncontrolledValue;

    // Range mode state
    const [uncontrolledRange, setUncontrolledRange] = React.useState<DateRange>(defaultRangeValue);
    const selectedRange = controlledRange !== undefined ? controlledRange : uncontrolledRange;

    const [isOpen, setIsOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement | null>(null);

    // Default presets
    const presets = React.useMemo(() => {
      if (customPresets) return customPresets;
      if (!showPresets) return undefined;

      const now = new Date();
      if (mode === "single") {
        return [
          { label: "Today", value: () => new Date() },
          {
            label: "Tomorrow",
            value: () => new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
          },
          {
            label: "In 7 Days",
            value: () => new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7),
          },
          {
            label: "In 30 Days",
            value: () => new Date(now.getFullYear(), now.getMonth(), now.getDate() + 30),
          },
        ];
      } else {
        return [
          {
            label: "Today",
            value: () => ({ start: new Date(), end: new Date() }),
          },
          {
            label: "Last 7 Days",
            value: () => ({
              start: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6),
              end: new Date(),
            }),
          },
          {
            label: "Last 30 Days",
            value: () => ({
              start: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 29),
              end: new Date(),
            }),
          },
          {
            label: "This Month",
            value: () => ({
              start: new Date(now.getFullYear(), now.getMonth(), 1),
              end: new Date(now.getFullYear(), now.getMonth() + 1, 0),
            }),
          },
        ];
      }
    }, [customPresets, showPresets, mode]);

    // Click outside listener
    React.useEffect(() => {
      if (!isOpen) return;

      const handlePointerDown = (event: MouseEvent | TouchEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handlePointerDown);
      document.addEventListener("touchstart", handlePointerDown);
      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("mousedown", handlePointerDown);
        document.removeEventListener("touchstart", handlePointerDown);
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [isOpen]);

    // Formatted display text
    const formattedDisplay = React.useMemo(() => {
      const defaultFormat = (d: Date) => {
        const dateStr = new Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }).format(d);

        if (showTime) {
          const timeStr = new Intl.DateTimeFormat("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: timeFormat === "12h",
          }).format(d);
          return `${dateStr}, ${timeStr}`;
        }
        return dateStr;
      };

      if (mode === "single") {
        if (!selectedDate) return "";
        if (formatDate) return formatDate(selectedDate);
        return defaultFormat(selectedDate);
      } else {
        if (!selectedRange.start && !selectedRange.end) return "";
        if (formatRange) return formatRange(selectedRange);
        if (selectedRange.start && selectedRange.end) {
          return `${defaultFormat(selectedRange.start)} – ${defaultFormat(selectedRange.end)}`;
        }
        if (selectedRange.start) {
          return `${defaultFormat(selectedRange.start)} – ...`;
        }
        return "";
      }
    }, [mode, selectedDate, selectedRange, formatDate, formatRange, showTime, timeFormat]);

    const handleSingleSelect = (date: Date) => {
      if (controlledValue === undefined) {
        setUncontrolledValue(date);
      }
      onChange?.(date);
      if (!showTime) {
        setIsOpen(false);
      }
    };

    const handleRangeSelect = (range: DateRange) => {
      if (controlledRange === undefined) {
        setUncontrolledRange(range);
      }
      onRangeChange?.(range);
      if (range.start && range.end) {
        setIsOpen(false);
      }
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (mode === "single") {
        if (controlledValue === undefined) {
          setUncontrolledValue(null);
        }
        onChange?.(null);
      } else {
        const emptyRange = { start: null, end: null };
        if (controlledRange === undefined) {
          setUncontrolledRange(emptyRange);
        }
        onRangeChange?.(emptyRange);
      }
    };

    const hasValue = mode === "single" ? Boolean(selectedDate) : Boolean(selectedRange.start);

    return (
      <div
        ref={containerRef}
        className={cn("relative flex w-full flex-col gap-1.5", className)}
        {...props}
      >
        {label && <label className="text-foreground text-sm font-medium">{label}</label>}

        <div
          ref={ref}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-disabled={disabled}
          onClick={() => {
            if (!disabled) setIsOpen((prev) => !prev);
          }}
          onKeyDown={(e) => {
            if (disabled) return;
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsOpen((prev) => !prev);
            }
          }}
          className={cn(
            "relative flex cursor-pointer items-center justify-between rounded-xl transition-all outline-none select-none",
            variantStyles[variant],
            sizeStyles[size],
            disabled && "pointer-events-none cursor-not-allowed opacity-50",
            isInvalid && "!border-rose-600 focus-within:!ring-rose-600/20"
          )}
        >
          <div className="flex items-center gap-2 truncate overflow-hidden text-left">
            <CalendarIcon className="text-muted-foreground h-4 w-4 shrink-0" />
            {formattedDisplay ? (
              <span className="text-foreground truncate font-normal">{formattedDisplay}</span>
            ) : (
              <span className="text-muted-foreground truncate">{placeholder}</span>
            )}
          </div>

          <div className="flex items-center gap-1">
            {isClearable && hasValue && !disabled && (
              <button
                type="button"
                aria-label="Clear date"
                onClick={handleClear}
                className="text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer rounded-full p-0.5 transition"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Popover Calendar Dropdown */}
        {isOpen && (
          <div
            role="dialog"
            aria-label="Calendar date picker"
            className="animate-in fade-in-0 zoom-in-95 absolute top-[calc(100%+6px)] left-0 z-50 duration-150"
          >
            <Calendar
              mode={mode}
              value={selectedDate}
              onChange={handleSingleSelect}
              rangeValue={selectedRange}
              onRangeChange={handleRangeSelect}
              minDate={minDate}
              maxDate={maxDate}
              isDateDisabled={isDateDisabled}
              disablePastDates={disablePastDates}
              disableFutureDates={disableFutureDates}
              disableWeekends={disableWeekends}
              color={color}
              size={size}
              presets={presets}
              showTime={showTime}
              timeFormat={timeFormat}
              className="shadow-2xl"
            />
          </div>
        )}

        {(helperText || (isInvalid && errorMessage)) && (
          <p className={cn("text-xs", isInvalid ? "text-rose-600" : "text-muted-foreground")}>
            {isInvalid && errorMessage ? errorMessage : helperText}
          </p>
        )}
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";
