// apps/docs/src/pages/CheckboxDoc.tsx
import React, { useState } from "react";
import { Checkbox, Button } from "@hudbird/ui";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";

export const checkboxTocItems = [
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "basic-usage", title: "Basic Checkboxes & Colors" },
      { id: "checkbox-sizes", title: "Sizes" },
      { id: "with-description", title: "With Description" },
      { id: "states", title: "Disabled & Invalid States" },
      { id: "checkbox-group", title: "Checkbox Group" },
    ],
  },
];

export default function CheckboxDoc() {
  // State for interactive group
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "notifications",
  ]);

  const toggleService = (val: string) => {
    setSelectedServices((prev) =>
      prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val]
    );
  };

  const apiRows: ApiPropRow[] = [
    {
      prop: "color",
      defaultVal: "'primary'",
      description: (
        <span>
          Checked accent color theme:{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'primary'</code> (Indigo),{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'success'</code> (Emerald), or{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'danger'</code> (Rose).
        </span>
      ),
    },
    {
      prop: "size",
      defaultVal: "'md'",
      description: (
        <span>
          Visual scale:{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'sm'</code> (h-4 w-4),{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'md'</code> (h-5 w-5), or{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'lg'</code> (h-6 w-6).
        </span>
      ),
    },
    {
      prop: "label",
      defaultVal: "-",
      description: "Label text or custom element rendered adjacent to the checkbox.",
    },
    {
      prop: "description",
      defaultVal: "-",
      description: "Secondary helper text rendered beneath the primary label.",
    },
    {
      prop: "checked",
      defaultVal: "-",
      description: "Controlled checked state boolean.",
    },
    {
      prop: "defaultChecked",
      defaultVal: "false",
      description: "Initial checked state when operating in uncontrolled mode.",
    },
    {
      prop: "isInvalid",
      defaultVal: "false",
      description: "Applies error state highlighting (rose border and focus ring).",
    },
    {
      prop: "disabled",
      defaultVal: "false",
      description: "Disables checkbox interaction and fades the visual opacity.",
    },
  ];

  return (
    <div className="space-y-16 pb-24">
      {/* Title & Introduction */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Checkbox
          </h1>
          <span className="text-xs font-semibold px-2 py-0.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full border border-indigo-500/20">
            Component
          </span>
        </div>
        <p className="text-base text-zinc-600 dark:text-zinc-400">
          Interactive control allowing users to select one or multiple items from a set, complete with animated checkmarks and accessible focus rings.
        </p>
      </div>

      {/* Hero Preview & Code */}
      <section className="space-y-4">
        <ComponentPreview>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Checkbox defaultChecked color="primary" label="Indigo Option" />
            <Checkbox defaultChecked color="success" label="Emerald Option" />
            <Checkbox defaultChecked color="danger" label="Rose Option" />
          </div>
        </ComponentPreview>

        <CodeBlock
          code={`import { Checkbox } from '@hudbird/ui'

function Example() {
  return (
    <div className="flex items-center gap-6">
      <Checkbox defaultChecked color="primary" label="Indigo Option" />
      <Checkbox defaultChecked color="success" label="Emerald Option" />
      <Checkbox defaultChecked color="danger" label="Rose Option" />
    </div>
  )
}`}
        />
      </section>

      {/* Component API */}
      <section id="component-api" className="scroll-mt-24 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Component API
        </h2>
        <ApiTable
          note={
            <span>
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">Checkbox</strong> supports all native input HTML attributes and works interchangeably in controlled or uncontrolled modes.
            </span>
          }
          rows={apiRows}
        />
      </section>

      {/* Examples Header */}
      <section id="examples" className="scroll-mt-24 space-y-14">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-2">
            Examples
          </h2>
        </div>

        {/* 1. Basic Checkboxes & Colors */}
        <div id="basic-usage" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Basic Checkboxes & Colors
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Checkboxes support three semantic color themes: <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:text-zinc-200">'primary'</code>, <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:text-zinc-200">'success'</code>, and <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:text-zinc-200">'danger'</code>:
          </p>

          <ComponentPreview>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Checkbox defaultChecked color="primary" label="Primary (Indigo)" />
              <Checkbox defaultChecked color="success" label="Success (Emerald)" />
              <Checkbox defaultChecked color="danger" label="Danger (Rose)" />
              <Checkbox color="primary" label="Unchecked" />
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Checkbox } from '@hudbird/ui'

function Example() {
  return (
    <div className="flex items-center gap-6">
      <Checkbox defaultChecked color="primary" label="Primary" />
      <Checkbox defaultChecked color="success" label="Success" />
      <Checkbox defaultChecked color="danger" label="Danger" />
      <Checkbox color="primary" label="Unchecked" />
    </div>
  )
}`}
          />
        </div>

        {/* 2. Checkbox Sizes */}
        <div id="checkbox-sizes" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Sizes
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Available in three responsive proportions: <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:text-zinc-200">'sm'</code> (h-4), <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:text-zinc-200">'md'</code> (h-5), and <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:text-zinc-200">'lg'</code> (h-6):
          </p>

          <ComponentPreview>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Checkbox size="sm" defaultChecked label="Small (sm)" />
              <Checkbox size="md" defaultChecked label="Medium (md)" />
              <Checkbox size="lg" defaultChecked label="Large (lg)" />
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Checkbox } from '@hudbird/ui'

function Example() {
  return (
    <div className="flex items-center gap-6">
      <Checkbox size="sm" defaultChecked label="Small (sm)" />
      <Checkbox size="md" defaultChecked label="Medium (md)" />
      <Checkbox size="lg" defaultChecked label="Large (lg)" />
    </div>
  )
}`}
          />
        </div>

        {/* 3. With Description */}
        <div id="with-description" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            With Description
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Provide additional context using the <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:text-zinc-200">'description'</code> prop:
          </p>

          <ComponentPreview>
            <div className="flex flex-col gap-4 max-w-md">
              <Checkbox
                defaultChecked
                color="primary"
                label="Automatic updates"
                description="Automatically download and install system patches in the background."
              />
              <Checkbox
                defaultChecked
                color="primary"
                label="Analytics & telemetry"
                description="Help us improve product stability by sharing anonymous diagnostics."
              />
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Checkbox } from '@hudbird/ui'

function Example() {
  return (
    <div className="flex flex-col gap-4 max-w-md">
      <Checkbox
        defaultChecked
        color="primary"
        label="Automatic updates"
        description="Automatically download and install system patches in the background."
      />
      <Checkbox
        color="primary"
        label="Analytics & telemetry"
        description="Help us improve product stability by sharing anonymous diagnostics."
      />
    </div>
  )
}`}
          />
        </div>

        {/* 4. Disabled & Invalid States */}
        <div id="states" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Disabled & Invalid States
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Use <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:text-zinc-200">disabled</code> to lock interactions or <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:text-zinc-200">isInvalid</code> to indicate an error state:
          </p>

          <ComponentPreview>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Checkbox disabled defaultChecked label="Disabled Checked" />
              <Checkbox disabled label="Disabled Unchecked" />
              <Checkbox isInvalid label="Invalid / Required" />
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Checkbox } from '@hudbird/ui'

function Example() {
  return (
    <div className="flex items-center gap-6">
      {/* Disabled States */}
      <Checkbox disabled defaultChecked label="Disabled Checked" />
      <Checkbox disabled label="Disabled Unchecked" />

      {/* Invalid Error State */}
      <Checkbox isInvalid label="Invalid / Required" />
    </div>
  )
}`}
          />
        </div>

        {/* 5. Checkbox Group */}
        <div id="checkbox-group" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Checkbox Group
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Easily manage multi-selection states in forms:
          </p>

          <ComponentPreview>
            <div className="w-full max-w-sm space-y-3 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 bg-zinc-50/50 dark:bg-zinc-900/30">
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                Notification Channels
              </h4>
              <div className="flex flex-col gap-3">
                <Checkbox
                  checked={selectedServices.includes("email")}
                  onChange={() => toggleService("email")}
                  color="primary"
                  label="Email alerts"
                />
                <Checkbox
                  checked={selectedServices.includes("sms")}
                  onChange={() => toggleService("sms")}
                  color="primary"
                  label="SMS text messages"
                />
                <Checkbox
                  checked={selectedServices.includes("notifications")}
                  onChange={() => toggleService("notifications")}
                  color="primary"
                  label="Push notifications"
                />
              </div>

              <div className="pt-2 text-xs text-zinc-500 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-800">
                Selected:{" "}
                <span className="font-mono text-zinc-900 dark:text-zinc-200 font-semibold">
                  {selectedServices.join(", ") || "none"}
                </span>
              </div>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { useState } from 'react'
import { Checkbox } from '@hudbird/ui'

function Example() {
  const [selected, setSelected] = useState(['notifications'])

  const toggle = (val: string) => {
    setSelected((prev) =>
      prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val]
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <Checkbox
        checked={selected.includes('email')}
        onChange={() => toggle('email')}
        label="Email alerts"
      />
      <Checkbox
        checked={selected.includes('sms')}
        onChange={() => toggle('sms')}
        label="SMS text messages"
      />
      <Checkbox
        checked={selected.includes('notifications')}
        onChange={() => toggle('notifications')}
        label="Push notifications"
      />
    </div>
  )
}`}
          />
        </div>
      </section>
    </div>
  );
}
