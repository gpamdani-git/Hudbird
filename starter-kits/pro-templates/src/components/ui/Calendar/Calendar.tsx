// packages/core/src/components/Calendar/Calendar.tsx
"use client";

import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronDown,
  Clock,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/cn";

export type CalendarColor = "default" | "primary" | "secondary" | "success" | "warning" | "danger";

export type CalendarSize = "sm" | "md" | "lg";
export type CalendarViewMode = "day" | "month" | "year";

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface CalendarPreset {
  label: string;
  value: Date | DateRange | (() => Date | DateRange);
}

export interface CalendarProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange" | "defaultValue"
> {
  /**
   * The selected date in single mode (controlled)
   */
  value?: Date | null;
  /**
   * The initial selected date in single mode (uncontrolled)
   */
  defaultValue?: Date | null;
  /**
   * Callback fired when a date is selected
   */
  onChange?: (date: Date) => void;
  /**
   * Selection mode: "single" or "range"
   */
  mode?: "single" | "range";
  /**
   * Range selection value (controlled)
   */
  rangeValue?: DateRange;
  /**
   * Callback fired when date range changes
   */
  onRangeChange?: (range: DateRange) => void;
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
   * Disable all dates prior to today
   */
  disablePastDates?: boolean;
  /**
   * Disable all dates after today
   */
  disableFutureDates?: boolean;
  /**
   * Disable Saturday and Sunday
   */
  disableWeekends?: boolean;
  /**
   * The locale used for formatting months and weekdays
   */
  locale?: string;
  /**
   * First day of the week (0 = Sunday, 1 = Monday)
   */
  firstDayOfWeek?: number;
  /**
   * Color theme for selected dates
   */
  color?: CalendarColor;
  /**
   * Overall sizing of the calendar
   */
  size?: CalendarSize;
  /**
   * Show quick "Today" navigation button
   */
  showTodayButton?: boolean;
  /**
   * Show fast previous/next year jump buttons (<< and >>)
   */
  showYearNavigation?: boolean;
  /**
   * Quick preset buttons (e.g. Today, Yesterday, This Week)
   */
  presets?: CalendarPreset[];
  /**
   * Show time picker beneath calendar
   */
  showTime?: boolean;
  /**
   * 12h or 24h format for time picker
   */
  timeFormat?: "12h" | "24h";
}

// ----------------------------------------------------
// Date Utility Helpers
// ----------------------------------------------------

export function isSameDay(d1: Date | null, d2: Date | null): boolean {
  if (!d1 || !d2) return false;
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export function isDateInRange(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false;
  const t = date.getTime();
  const s = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
  const e = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
  return t > s && t < e;
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

// ----------------------------------------------------
// Variants & Color Maps
// ----------------------------------------------------

const selectedColorMap: Record<CalendarColor, string> = {
  default: "bg-foreground text-background hover:bg-foreground/90 font-semibold",
  primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm font-semibold",
  secondary: "bg-purple-600 text-white hover:bg-purple-700 shadow-sm font-semibold",
  success: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm font-semibold",
  warning: "bg-amber-600 text-white hover:bg-amber-700 shadow-sm font-semibold",
  danger: "bg-rose-600 text-white hover:bg-rose-700 shadow-sm font-semibold",
};

const rangeBetweenColorMap: Record<CalendarColor, string> = {
  default: "bg-muted text-foreground rounded-none",
  primary: "bg-blue-500/15 text-blue-700 dark:text-blue-300 rounded-none",
  secondary: "bg-purple-500/15 text-purple-700 dark:text-purple-300 rounded-none",
  success: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 rounded-none",
  warning: "bg-amber-500/15 text-amber-700 dark:text-amber-300 rounded-none",
  danger: "bg-rose-500/15 text-rose-700 dark:text-rose-300 rounded-none",
};

const cellSizeMap: Record<CalendarSize, string> = {
  sm: "w-8 h-8 text-xs",
  md: "w-9 h-9 text-sm",
  lg: "w-11 h-11 text-base",
};

export const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue = null,
      onChange,
      mode = "single",
      rangeValue: controlledRange,
      onRangeChange,
      minDate,
      maxDate,
      isDateDisabled,
      disablePastDates = false,
      disableFutureDates = false,
      disableWeekends = false,
      locale = "en-US",
      firstDayOfWeek = 0,
      color = "primary",
      size = "md",
      showTodayButton = true,
      showYearNavigation = true,
      presets,
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
    const [uncontrolledRange, setUncontrolledRange] = React.useState<DateRange>({
      start: null,
      end: null,
    });
    const selectedRange = controlledRange !== undefined ? controlledRange : uncontrolledRange;

    // Hovered date state for interactive range highlight
    const [hoveredDate, setHoveredDate] = React.useState<Date | null>(null);

    // View mode: "day" | "month" | "year"
    const [viewMode, setViewMode] = React.useState<CalendarViewMode>("day");

    // View date (displayed year and month)
    const initialView = selectedDate || selectedRange.start || new Date();
    const [viewDate, setViewDate] = React.useState<Date>(
      new Date(initialView.getFullYear(), initialView.getMonth(), 1)
    );

    // Time picker state (hours, minutes)
    const [selectedHours, setSelectedHours] = React.useState<number>(initialView.getHours());
    const [selectedMinutes, setSelectedMinutes] = React.useState<number>(initialView.getMinutes());

    // Focused date for keyboard navigation
    const [focusedDate, setFocusedDate] = React.useState<Date>(selectedDate || new Date());

    // Month & Year title
    const monthYearTitle = React.useMemo(() => {
      return new Intl.DateTimeFormat(locale, {
        month: "long",
        year: "numeric",
      }).format(viewDate);
    }, [viewDate, locale]);

    // Current decade bounds for year view (e.g., 2020..2031)
    const currentDecadeStart = Math.floor(viewDate.getFullYear() / 10) * 10 - 1;
    const decadeYears = React.useMemo(() => {
      const years: number[] = [];
      for (let i = 0; i < 12; i++) {
        years.push(currentDecadeStart + i);
      }
      return years;
    }, [currentDecadeStart]);

    // Month names for month view (Jan .. Dec)
    const monthNames = React.useMemo(() => {
      const names: { month: number; name: string }[] = [];
      for (let m = 0; m < 12; m++) {
        const d = new Date(2026, m, 1);
        names.push({
          month: m,
          name: new Intl.DateTimeFormat(locale, { month: "short" }).format(d),
        });
      }
      return names;
    }, [locale]);

    // Weekday names
    const weekdays = React.useMemo(() => {
      const names: string[] = [];
      const now = new Date();
      const start = new Date(now.setDate(now.getDate() - now.getDay() + firstDayOfWeek));
      for (let i = 0; i < 7; i++) {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        names.push(new Intl.DateTimeFormat(locale, { weekday: "short" }).format(d));
      }
      return names;
    }, [locale, firstDayOfWeek]);

    // Grid days calculation (6 rows x 7 cols = 42 cells)
    const gridDays = React.useMemo(() => {
      const year = viewDate.getFullYear();
      const month = viewDate.getMonth();

      const firstOfMonth = new Date(year, month, 1);
      const startingDay = (firstOfMonth.getDay() - firstDayOfWeek + 7) % 7;

      const days: { date: Date; isCurrentMonth: boolean; isToday: boolean }[] = [];
      const today = new Date();

      // Days from previous month
      for (let i = startingDay; i > 0; i--) {
        const d = new Date(year, month, 1 - i);
        days.push({
          date: d,
          isCurrentMonth: false,
          isToday: isSameDay(d, today),
        });
      }

      // Current month days
      const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
      for (let i = 1; i <= daysInCurrentMonth; i++) {
        const d = new Date(year, month, i);
        days.push({
          date: d,
          isCurrentMonth: true,
          isToday: isSameDay(d, today),
        });
      }

      // Next month days to reach 42 cells
      const remaining = 42 - days.length;
      for (let i = 1; i <= remaining; i++) {
        const d = new Date(year, month + 1, i);
        days.push({
          date: d,
          isCurrentMonth: false,
          isToday: isSameDay(d, today),
        });
      }

      return days;
    }, [viewDate, firstDayOfWeek]);

    // Fast Month/Year Navigation handlers
    const prevMonth = () => {
      setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };

    const nextMonth = () => {
      setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };

    const prevYear = () => {
      setViewDate((prev) => new Date(prev.getFullYear() - 1, prev.getMonth(), 1));
    };

    const nextYear = () => {
      setViewDate((prev) => new Date(prev.getFullYear() + 1, prev.getMonth(), 1));
    };

    const prevDecade = () => {
      setViewDate((prev) => new Date(prev.getFullYear() - 10, prev.getMonth(), 1));
    };

    const nextDecade = () => {
      setViewDate((prev) => new Date(prev.getFullYear() + 10, prev.getMonth(), 1));
    };

    const goToToday = () => {
      const today = new Date();
      setViewDate(new Date(today.getFullYear(), today.getMonth(), 1));
      setViewMode("day");
      handleDateSelect(today);
    };

    // Date validity check
    const checkIsDisabled = (date: Date): boolean => {
      const dayTime = startOfDay(date).getTime();
      const todayTime = startOfDay(new Date()).getTime();

      if (disablePastDates && dayTime < todayTime) return true;
      if (disableFutureDates && dayTime > todayTime) return true;
      if (disableWeekends) {
        const dayOfWeek = date.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) return true;
      }
      if (minDate && dayTime < startOfDay(minDate).getTime()) return true;
      if (maxDate && dayTime > startOfDay(maxDate).getTime()) return true;
      if (isDateDisabled && isDateDisabled(date)) return true;
      return false;
    };

    // Date selection handler
    const handleDateSelect = (date: Date) => {
      if (checkIsDisabled(date)) return;

      const dateWithTime = new Date(date);
      if (showTime) {
        dateWithTime.setHours(selectedHours, selectedMinutes, 0, 0);
      }

      if (mode === "single") {
        if (controlledValue === undefined) {
          setUncontrolledValue(dateWithTime);
        }
        onChange?.(dateWithTime);
      } else {
        // Range mode
        let newRange: DateRange;
        if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
          newRange = { start: dateWithTime, end: null };
        } else {
          if (dateWithTime.getTime() < selectedRange.start.getTime()) {
            newRange = { start: dateWithTime, end: selectedRange.start };
          } else {
            newRange = { start: selectedRange.start, end: dateWithTime };
          }
          setHoveredDate(null);
        }

        if (controlledRange === undefined) {
          setUncontrolledRange(newRange);
        }
        onRangeChange?.(newRange);
      }
    };

    // Handle Month click in month view
    const handleMonthSelect = (monthIndex: number) => {
      setViewDate((prev) => new Date(prev.getFullYear(), monthIndex, 1));
      setViewMode("day");
    };

    // Handle Year click in year view
    const handleYearSelect = (yearNumber: number) => {
      setViewDate((prev) => new Date(yearNumber, prev.getMonth(), 1));
      setViewMode("month");
    };

    // Preset click handler
    const handlePresetClick = (preset: CalendarPreset) => {
      const val = typeof preset.value === "function" ? preset.value() : preset.value;
      if ("start" in val && "end" in val) {
        if (controlledRange === undefined) {
          setUncontrolledRange(val);
        }
        onRangeChange?.(val);
        if (val.start) {
          setViewDate(new Date(val.start.getFullYear(), val.start.getMonth(), 1));
        }
      } else if (val instanceof Date) {
        handleDateSelect(val);
        setViewDate(new Date(val.getFullYear(), val.getMonth(), 1));
      }
    };

    // Time change handler
    const handleTimeChange = (newHours: number, newMinutes: number) => {
      setSelectedHours(newHours);
      setSelectedMinutes(newMinutes);
      if (selectedDate && mode === "single") {
        const updated = new Date(selectedDate);
        updated.setHours(newHours, newMinutes);
        if (controlledValue === undefined) {
          setUncontrolledValue(updated);
        }
        onChange?.(updated);
      }
    };

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent, currentDate: Date) => {
      let target: Date | null = null;
      switch (e.key) {
        case "ArrowLeft":
          target = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() - 1
          );
          break;
        case "ArrowRight":
          target = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() + 1
          );
          break;
        case "ArrowUp":
          target = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() - 7
          );
          break;
        case "ArrowDown":
          target = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() + 7
          );
          break;
        case "PageUp":
          target = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - 1,
            currentDate.getDate()
          );
          break;
        case "PageDown":
          target = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            currentDate.getDate()
          );
          break;
        case "Home":
          target = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
          break;
        case "End":
          target = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          handleDateSelect(currentDate);
          return;
        case "Escape":
          if (viewMode !== "day") {
            setViewMode("day");
          }
          return;
      }

      if (target) {
        e.preventDefault();
        setFocusedDate(target);
        if (target.getMonth() !== viewDate.getMonth()) {
          setViewDate(new Date(target.getFullYear(), target.getMonth(), 1));
        }
      }
    };

    return (
      <div
        ref={ref}
        role="region"
        aria-label={props["aria-label"] || "Calendar"}
        className={cn(
          "border-border bg-card text-card-foreground inline-block rounded-2xl border p-4 shadow-sm select-none",
          className
        )}
        {...props}
      >
        {/* Optional Presets Header Bar */}
        {presets && presets.length > 0 && (
          <div className="border-border/80 mb-3 flex flex-wrap items-center gap-1.5 border-b pb-3">
            {presets.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handlePresetClick(preset)}
                className="text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer rounded-lg px-2.5 py-1 text-xs font-medium transition-all"
              >
                {preset.label}
              </button>
            ))}
          </div>
        )}

        {/* Calendar Header with Fast Switching */}
        <div className="mb-3 flex items-center justify-between gap-1">
          {/* Previous Controls */}
          <div className="flex items-center gap-0.5">
            {showYearNavigation && viewMode === "day" && (
              <button
                type="button"
                onClick={prevYear}
                aria-label="Previous year"
                title="Previous year"
                className="border-border/60 text-muted-foreground hover:bg-muted hover:text-foreground focus:ring-ring flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border bg-transparent transition focus:ring-1 focus:outline-none"
              >
                <ChevronsLeft className="h-3.5 w-3.5" />
              </button>
            )}
            <button
              type="button"
              onClick={
                viewMode === "day" ? prevMonth : viewMode === "month" ? prevYear : prevDecade
              }
              aria-label={
                viewMode === "day"
                  ? "Previous month"
                  : viewMode === "month"
                    ? "Previous year"
                    : "Previous decade"
              }
              className="border-border/60 text-muted-foreground hover:bg-muted hover:text-foreground focus:ring-ring flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border bg-transparent transition focus:ring-1 focus:outline-none"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Clickable Month / Year / Decade Switcher Title */}
          <div className="flex items-center">
            {viewMode === "day" && (
              <button
                type="button"
                onClick={() => setViewMode("month")}
                aria-label="Switch to month picker"
                className="group text-foreground hover:bg-muted flex cursor-pointer items-center gap-1 rounded-lg px-2 py-1 text-sm font-semibold tracking-tight transition-colors"
              >
                <span>{monthYearTitle}</span>
                <ChevronDown className="text-muted-foreground h-3 w-3 transition-transform group-hover:rotate-180" />
              </button>
            )}

            {viewMode === "month" && (
              <button
                type="button"
                onClick={() => setViewMode("year")}
                aria-label="Switch to year picker"
                className="group text-foreground hover:bg-muted flex cursor-pointer items-center gap-1 rounded-lg px-2 py-1 text-sm font-semibold tracking-tight transition-colors"
              >
                <span>{viewDate.getFullYear()}</span>
                <ChevronDown className="text-muted-foreground h-3 w-3 transition-transform group-hover:rotate-180" />
              </button>
            )}

            {viewMode === "year" && (
              <span className="text-foreground px-2 py-1 text-sm font-semibold tracking-tight">
                {currentDecadeStart + 1} – {currentDecadeStart + 10}
              </span>
            )}
          </div>

          {/* Next Controls & Today Button */}
          <div className="flex items-center gap-0.5">
            {showTodayButton && viewMode === "day" && (
              <button
                type="button"
                onClick={goToToday}
                className="text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer rounded-md px-2 py-0.5 text-xs font-medium transition"
              >
                Today
              </button>
            )}

            <button
              type="button"
              onClick={
                viewMode === "day" ? nextMonth : viewMode === "month" ? nextYear : nextDecade
              }
              aria-label={
                viewMode === "day"
                  ? "Next month"
                  : viewMode === "month"
                    ? "Next year"
                    : "Next decade"
              }
              className="border-border/60 text-muted-foreground hover:bg-muted hover:text-foreground focus:ring-ring flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border bg-transparent transition focus:ring-1 focus:outline-none"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>

            {showYearNavigation && viewMode === "day" && (
              <button
                type="button"
                onClick={nextYear}
                aria-label="Next year"
                title="Next year"
                className="border-border/60 text-muted-foreground hover:bg-muted hover:text-foreground focus:ring-ring flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border bg-transparent transition focus:ring-1 focus:outline-none"
              >
                <ChevronsRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* ------------------------------------------- */}
        {/* VIEW 1: DAY CALENDAR GRID                   */}
        {/* ------------------------------------------- */}
        {viewMode === "day" && (
          <>
            {/* Days of Week Header */}
            <div role="row" className="mb-1 grid grid-cols-7 gap-1 text-center">
              {weekdays.map((day, idx) => (
                <div
                  key={idx}
                  role="columnheader"
                  className="text-muted-foreground py-1 text-xs font-medium"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Day Grid */}
            <div
              role="grid"
              aria-label={monthYearTitle}
              className="grid grid-cols-7 gap-1"
              onMouseLeave={() => setHoveredDate(null)}
            >
              {gridDays.map(({ date, isCurrentMonth, isToday }, idx) => {
                const isDisabled = checkIsDisabled(date);
                const isSingleSelected = mode === "single" && isSameDay(date, selectedDate);
                const isRangeStart = mode === "range" && isSameDay(date, selectedRange.start);
                const isRangeEnd = mode === "range" && isSameDay(date, selectedRange.end);
                const isRangeMiddle =
                  mode === "range" && isDateInRange(date, selectedRange.start, selectedRange.end);

                // Range hover preview while user is choosing end date
                const isHoverPreviewMiddle =
                  mode === "range" &&
                  selectedRange.start &&
                  !selectedRange.end &&
                  hoveredDate &&
                  ((date.getTime() > selectedRange.start.getTime() &&
                    date.getTime() <= hoveredDate.getTime()) ||
                    (date.getTime() < selectedRange.start.getTime() &&
                      date.getTime() >= hoveredDate.getTime()));

                const isSelected = isSingleSelected || isRangeStart || isRangeEnd;

                return (
                  <div key={idx} role="gridcell" className="flex items-center justify-center p-0.5">
                    <button
                      type="button"
                      tabIndex={isSameDay(date, focusedDate) ? 0 : -1}
                      disabled={isDisabled}
                      aria-label={new Intl.DateTimeFormat(locale, {
                        dateStyle: "full",
                      }).format(date)}
                      aria-selected={isSelected || isRangeMiddle || Boolean(isHoverPreviewMiddle)}
                      aria-disabled={isDisabled}
                      onClick={() => handleDateSelect(date)}
                      onMouseEnter={() => {
                        if (mode === "range" && selectedRange.start && !selectedRange.end) {
                          setHoveredDate(date);
                        }
                      }}
                      onKeyDown={(e) => handleKeyDown(e, date)}
                      className={cn(
                        "focus:ring-ring flex cursor-pointer items-center justify-center rounded-xl font-medium transition-all select-none focus:ring-2 focus:outline-none",
                        cellSizeMap[size],
                        !isCurrentMonth && "text-muted-foreground/35",
                        isCurrentMonth &&
                          !isSelected &&
                          !isRangeMiddle &&
                          !isHoverPreviewMiddle &&
                          "text-foreground hover:bg-muted",
                        isToday && !isSelected && "ring-primary/50 text-primary font-bold ring-1",
                        isSelected && selectedColorMap[color],
                        isRangeMiddle && rangeBetweenColorMap[color],
                        isHoverPreviewMiddle && "bg-primary/10 text-primary rounded-none",
                        isRangeStart && "rounded-r-none",
                        isRangeEnd && "rounded-l-none",
                        isDisabled && "pointer-events-none cursor-not-allowed opacity-30"
                      )}
                    >
                      {date.getDate()}
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* ------------------------------------------- */}
        {/* VIEW 2: MONTH SELECTION GRID (12 MONTHS)    */}
        {/* ------------------------------------------- */}
        {viewMode === "month" && (
          <div className="grid grid-cols-3 gap-2 py-2">
            {monthNames.map(({ month, name }) => {
              const isSelectedMonth =
                viewDate.getMonth() === month &&
                ((selectedDate && selectedDate.getFullYear() === viewDate.getFullYear()) ||
                  (selectedRange.start &&
                    selectedRange.start.getFullYear() === viewDate.getFullYear()));
              return (
                <button
                  key={month}
                  type="button"
                  onClick={() => handleMonthSelect(month)}
                  className={cn(
                    "hover:bg-muted flex cursor-pointer items-center justify-center rounded-xl py-2.5 text-sm font-medium transition-all",
                    isSelectedMonth
                      ? selectedColorMap[color]
                      : "text-foreground hover:text-foreground"
                  )}
                >
                  {name}
                </button>
              );
            })}
          </div>
        )}

        {/* ------------------------------------------- */}
        {/* VIEW 3: YEAR SELECTION GRID (DECADE)        */}
        {/* ------------------------------------------- */}
        {viewMode === "year" && (
          <div className="grid grid-cols-3 gap-2 py-2">
            {decadeYears.map((yearNum, idx) => {
              const isSelectedYear =
                (selectedDate && selectedDate.getFullYear() === yearNum) ||
                (selectedRange.start && selectedRange.start.getFullYear() === yearNum);
              const isOutDecade = idx === 0 || idx === 11;
              return (
                <button
                  key={yearNum}
                  type="button"
                  onClick={() => handleYearSelect(yearNum)}
                  className={cn(
                    "hover:bg-muted flex cursor-pointer items-center justify-center rounded-xl py-2.5 text-sm font-medium transition-all",
                    isOutDecade && "text-muted-foreground/40",
                    !isOutDecade && !isSelectedYear && "text-foreground",
                    isSelectedYear && selectedColorMap[color]
                  )}
                >
                  {yearNum}
                </button>
              );
            })}
          </div>
        )}

        {/* ------------------------------------------- */}
        {/* TIME PICKER CONTROLLER (OPTIONAL)           */}
        {/* ------------------------------------------- */}
        {showTime && viewMode === "day" && (
          <div className="border-border mt-3 flex items-center justify-between gap-3 border-t pt-3 text-xs">
            <div className="text-muted-foreground flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>Time:</span>
            </div>

            <div className="flex items-center gap-1">
              <select
                value={selectedHours}
                onChange={(e) => handleTimeChange(Number(e.target.value), selectedMinutes)}
                aria-label="Hours"
                className="border-border bg-background text-foreground focus:ring-ring rounded-lg border px-2 py-1 text-xs focus:ring-1 focus:outline-none"
              >
                {Array.from({ length: 24 }).map((_, i) => (
                  <option key={i} value={i}>
                    {String(i).padStart(2, "0")}
                  </option>
                ))}
              </select>
              <span className="text-muted-foreground font-bold">:</span>
              <select
                value={selectedMinutes}
                onChange={(e) => handleTimeChange(selectedHours, Number(e.target.value))}
                aria-label="Minutes"
                className="border-border bg-background text-foreground focus:ring-ring rounded-lg border px-2 py-1 text-xs focus:ring-1 focus:outline-none"
              >
                {Array.from({ length: 60 }).map((_, i) => (
                  <option key={i} value={i}>
                    {String(i).padStart(2, "0")}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    );
  }
);

Calendar.displayName = "Calendar";
