// apps/docs/src/pages/CalendarDoc.tsx
import calendarCode from "../../../../packages/core/src/components/Calendar/Calendar.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import React, { useState } from "react";
import { PageToolbar } from "../components/PageToolbar";
import { Calendar, DatePicker, DateRangePicker, type DateRange } from "@hudbird/ui";
import { Sparkles, CalendarDays, Clock, Zap, ShieldCheck } from "lucide-react";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";

export const calendarTocItems = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "basic-calendar", title: "Basic Calendar & Fast Switcher" },
      { id: "range-selection", title: "Date Range Picker with Presets" },
      { id: "date-time-picker", title: "Date & Time Picker" },
      { id: "date-constraints", title: "Constraints & Disabled Days" },
      { id: "color-themes", title: "Color Themes" },
    ],
  },
];

export default function CalendarDoc() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [range, setRange] = useState<DateRange>({
    start: new Date(),
    end: new Date(Date.now() + 6 * 86400000),
  });
  const [dateTime, setDateTime] = useState<Date | null>(new Date());
  const [meetingDate, setMeetingDate] = useState<Date | null>(new Date());

  const apiRows: ApiPropRow[] = [
    {
      prop: "mode",
      defaultVal: '"single"',
      description: '"single" | "range" for single day or span range selection.',
    },
    {
      prop: "value / onChange",
      defaultVal: "-",
      description: "Controlled selected Date and update callback in single mode.",
    },
    {
      prop: "rangeValue / onRangeChange",
      defaultVal: "-",
      description: "Controlled range object { start, end } and update callback in range mode.",
    },
    {
      prop: "showYearNavigation",
      defaultVal: "true",
      description: "Fast navigation buttons (<< and >>) to skip forward/backward by full years.",
    },
    {
      prop: "presets",
      defaultVal: "-",
      description: "Array of quick shortcuts { label, value: Date | DateRange }.",
    },
    {
      prop: "showPresets",
      defaultVal: "false",
      description: "Enables smart default presets (Today, Tomorrow, In 7 days / Last 7, 30 days).",
    },
    {
      prop: "showTime",
      defaultVal: "false",
      description: "Enables integrated hour and minute selector beneath the calendar.",
    },
    {
      prop: "timeFormat",
      defaultVal: '"24h"',
      description: '"12h" or "24h" clock display format.',
    },
    {
      prop: "disablePastDates",
      defaultVal: "false",
      description: "Disables all calendar dates prior to today.",
    },
    {
      prop: "disableFutureDates",
      defaultVal: "false",
      description: "Disables all calendar dates after today.",
    },
    {
      prop: "disableWeekends",
      defaultVal: "false",
      description: "Disables Saturday and Sunday for business day selection.",
    },
    {
      prop: "minDate / maxDate",
      defaultVal: "-",
      description: "Absolute minimum and maximum selectable bounds.",
    },
    {
      prop: "color",
      defaultVal: '"primary"',
      description: '"default" | "primary" | "secondary" | "success" | "warning" | "danger".',
    },
    {
      prop: "size",
      defaultVal: '"md"',
      description: '"sm" | "md" | "lg" cell sizing.',
    },
  ];

  return (
    <div className="space-y-16 pb-24">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="w-full min-w-0 flex-1 pr-4">
          <div className="mb-3 flex items-center gap-3">
            <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
              Calendar & DatePicker
            </h1>
            <span className="inline-flex items-center gap-1 rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-500">
              <Sparkles className="h-3 w-3" />
              Expanded in v1.5
            </span>
          </div>
          <p className="text-muted-foreground text-base">
            Zero-dependency, high-performance calendar and date picker suite featuring fast
            month/year selectors, live range preview, quick presets, and integrated time selection.
          </p>
        </div>
        <div className="flex w-full shrink-0 justify-end sm:w-auto">
          <PageToolbar />
        </div>
      </div>

      {/* Installation */}
      <section id="installation" className="space-y-4">
        <h2 className="text-foreground text-xl font-semibold tracking-tight">Installation</h2>
        <InstallationTabs componentName="Calendar" code={calendarCode} fileName="Calendar.tsx" />
      </section>

      {/* Feature Badges Highlight */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="border-border bg-card space-y-1 rounded-xl border p-4 shadow-2xs">
          <div className="flex items-center gap-2 text-sm font-semibold text-blue-500">
            <Zap className="h-4 w-4" /> Fast Month & Year Switcher
          </div>
          <p className="text-muted-foreground text-xs">
            Click the Month/Year header to open an interactive 12-month grid or decade selector with{" "}
            <code className="text-foreground">&lt;&lt;</code> and{" "}
            <code className="text-foreground">&gt;&gt;</code> year jumps.
          </p>
        </div>

        <div className="border-border bg-card space-y-1 rounded-xl border p-4 shadow-2xs">
          <div className="flex items-center gap-2 text-sm font-semibold text-purple-500">
            <CalendarDays className="h-4 w-4" /> Live Range Preview
          </div>
          <p className="text-muted-foreground text-xs">
            Select a start date, hover over candidate end dates, and watch the interactive range
            highlight dynamically adjust.
          </p>
        </div>

        <div className="border-border bg-card space-y-1 rounded-xl border p-4 shadow-2xs">
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-500">
            <Clock className="h-4 w-4" /> Time Picker & Presets
          </div>
          <p className="text-muted-foreground text-xs">
            Combine date picking with precise hour/minute selection and one-click shortcuts for
            Today, Tomorrow, and Last 30 Days.
          </p>
        </div>
      </div>

      {/* Basic Calendar & Fast Switcher */}
      <section id="basic-calendar" className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-foreground text-xl font-semibold tracking-tight">
            Basic Calendar & Fast Switcher
          </h2>
          <p className="text-muted-foreground text-sm">
            Click on <strong>"May 2026"</strong> to switch instantly to month or decade view, or use
            the double arrows (<code className="text-foreground">&lt;&lt;</code> /{" "}
            <code className="text-foreground">&gt;&gt;</code>) to jump full years.
          </p>
        </div>
        <ComponentPreview>
          <div className="flex flex-col items-center gap-4 py-2">
            <Calendar value={selectedDate} onChange={(d) => setSelectedDate(d)} />
            <p className="text-muted-foreground text-xs">
              Selected Date:{" "}
              <span className="text-foreground font-semibold">
                {selectedDate?.toLocaleDateString() ?? "None"}
              </span>
            </p>
          </div>
        </ComponentPreview>
        <CodeBlock
          language="tsx"
          code={`const [date, setDate] = useState<Date | null>(new Date());

<Calendar
  value={date}
  onChange={setDate}
  showYearNavigation={true}
/>`}
        />
      </section>

      {/* Date Range Picker with Presets */}
      <section id="range-selection" className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-foreground text-xl font-semibold tracking-tight">
            Date Range Picker with Presets
          </h2>
          <p className="text-muted-foreground text-sm">
            Use <code className="text-foreground">&lt;DateRangePicker /&gt;</code> or{" "}
            <code className="text-foreground">&lt;DatePicker mode="range" /&gt;</code> with default
            or custom preset shortcuts and dynamic hover spans.
          </p>
        </div>
        <ComponentPreview>
          <div className="w-full max-w-sm space-y-4 py-4">
            <DateRangePicker
              label="Reservation Period"
              value={range}
              onChange={setRange}
              helperText="Click to select arrival and departure dates."
            />
            <p className="text-muted-foreground text-center text-xs">
              Active Range:{" "}
              <span className="text-foreground font-semibold">
                {range.start?.toLocaleDateString() ?? "..."} &rarr;{" "}
                {range.end?.toLocaleDateString() ?? "..."}
              </span>
            </p>
          </div>
        </ComponentPreview>
        <CodeBlock
          language="tsx"
          code={`import { DateRangePicker, type DateRange } from "@hudbird/ui";

const [range, setRange] = useState<DateRange>({
  start: new Date(),
  end: new Date(Date.now() + 6 * 86400000),
});

<DateRangePicker
  label="Reservation Period"
  value={range}
  onChange={setRange}
  showPresets
/>`}
        />
      </section>

      {/* Date & Time Picker */}
      <section id="date-time-picker" className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-foreground text-xl font-semibold tracking-tight">
            Date & Time Picker
          </h2>
          <p className="text-muted-foreground text-sm">
            Pass <code className="text-foreground">showTime={true}</code> to enable integrated hour
            and minute selection.
          </p>
        </div>
        <ComponentPreview>
          <div className="w-full max-w-sm space-y-4 py-4">
            <DatePicker
              label="Flight Schedule"
              placeholder="Select departure date & time..."
              value={dateTime}
              onChange={setDateTime}
              showTime
              showPresets
              helperText="Includes exact hour and minute timestamp."
            />
          </div>
        </ComponentPreview>
        <CodeBlock
          language="tsx"
          code={`<DatePicker
  label="Flight Schedule"
  value={dateTime}
  onChange={setDateTime}
  showTime
  timeFormat="24h"
  showPresets
/>`}
        />
      </section>

      {/* Constraints & Disabled Days */}
      <section id="date-constraints" className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-foreground text-xl font-semibold tracking-tight">
            Constraints & Disabled Days
          </h2>
          <p className="text-muted-foreground text-sm">
            Disable past days, future days, or weekends with zero configuration.
          </p>
        </div>
        <ComponentPreview>
          <div className="w-full max-w-sm space-y-4 py-4">
            <DatePicker
              label="Business Meeting"
              placeholder="Select upcoming weekday..."
              value={meetingDate}
              onChange={setMeetingDate}
              disablePastDates
              disableWeekends
              helperText="Past dates and weekends (Sat-Sun) are disabled."
            />
          </div>
        </ComponentPreview>
        <CodeBlock
          language="tsx"
          code={`<DatePicker
  label="Business Meeting"
  value={meetingDate}
  onChange={setMeetingDate}
  disablePastDates
  disableWeekends
/>`}
        />
      </section>

      {/* Color Themes */}
      <section id="color-themes" className="space-y-4">
        <h2 className="text-foreground text-xl font-semibold tracking-tight">Color Themes</h2>
        <ComponentPreview>
          <div className="flex flex-wrap justify-center gap-6">
            <Calendar size="sm" color="success" defaultValue={new Date()} />
            <Calendar size="sm" color="secondary" defaultValue={new Date()} />
          </div>
        </ComponentPreview>
      </section>

      {/* Component API */}
      <section id="component-api" className="space-y-4">
        <h2 className="text-foreground text-xl font-semibold tracking-tight">Component API</h2>
        <ApiTable rows={apiRows} />
      </section>
    </div>
  );
}
