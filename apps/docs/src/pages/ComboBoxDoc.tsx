// apps/docs/src/pages/ComboBoxDoc.tsx
import comboBoxCode from "../../../../packages/core/src/components/ComboBox/ComboBox.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import React, { useState } from "react";
import { PageToolbar } from "../components/PageToolbar";
import { ComboBox, type ComboBoxOption } from "@hudbird/ui";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";

export const comboBoxTocItems = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "single-select", title: "Single Select (Autocomplete)" },
      { id: "multi-select", title: "Multi-Select (Advanced Chips)" },
      { id: "variants-sizes", title: "Variants & Sizes" },
      { id: "states", title: "Disabled & Invalid States" },
    ],
  },
];

const frameworks: ComboBoxOption[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue.js" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "nextjs", label: "Next.js" },
  { value: "astro", label: "Astro" },
  { value: "solid", label: "SolidJS" },
  { value: "typescript", label: "TypeScript" },
  { value: "tailwind", label: "Tailwind CSS" },
];

const countries: ComboBoxOption[] = [
  { value: "id", label: "Indonesia" },
  { value: "us", label: "United States" },
  { value: "jp", label: "Japan" },
  { value: "de", label: "Germany" },
  { value: "uk", label: "United Kingdom" },
  { value: "sg", label: "Singapore" },
  { value: "kr", label: "South Korea" },
];

export default function ComboBoxDoc() {
  const [selectedCountry, setSelectedCountry] = useState("id");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    "react",
    "typescript",
    "tailwind",
  ]);

  const apiRows: ApiPropRow[] = [
    {
      prop: "options",
      defaultVal: "[]",
      description: (
        <span>
          Array of selectable item objects:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            {"{ value: string, label: string, disabled?: boolean }[]"}
          </code>
          .
        </span>
      ),
    },
    {
      prop: "isMulti",
      defaultVal: "false",
      description: "Enables multiple item selection mode with dismissible tags/chips.",
    },
    {
      prop: "value",
      defaultVal: "-",
      description: "Controlled single selection value (when isMulti is false).",
    },
    {
      prop: "defaultValue",
      defaultVal: "''",
      description: "Initial value for uncontrolled single selection.",
    },
    {
      prop: "onValueChange",
      defaultVal: "-",
      description: "Callback invoked when single value changes: (val: string) => void.",
    },
    {
      prop: "values",
      defaultVal: "-",
      description: "Controlled multi-selection array of string values (when isMulti is true).",
    },
    {
      prop: "defaultValues",
      defaultVal: "[]",
      description: "Initial values for uncontrolled multi-selection mode.",
    },
    {
      prop: "onValuesChange",
      defaultVal: "-",
      description: "Callback invoked when multi-selection values change: (vals: string[]) => void.",
    },
    {
      prop: "variant",
      defaultVal: "'bordered'",
      description: (
        <span>
          Input styling surface:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'bordered'
          </code>{" "}
          or{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'flat'
          </code>
          .
        </span>
      ),
    },
    {
      prop: "size",
      defaultVal: "'md'",
      description: (
        <span>
          Size proportion:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'sm'
          </code>
          ,{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'md'
          </code>
          , or{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'lg'
          </code>
          .
        </span>
      ),
    },
    {
      prop: "placeholder",
      defaultVal: "'Select or search...'",
      description: "Placeholder text displayed when no option or tags are selected.",
    },
    {
      prop: "emptyMessage",
      defaultVal: "'No results found.'",
      description: "Message displayed when the search query yields no matching results.",
    },
    {
      prop: "isInvalid",
      defaultVal: "false",
      description: "Applies error state highlighting (rose border and focus ring).",
    },
    {
      prop: "disabled",
      defaultVal: "false",
      description: "Disables user interaction and dims visual opacity.",
    },
  ];

  return (
    <div className="space-y-16 pb-24">
      {/* Title & Introduction */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="w-full min-w-0 flex-1 pr-4">
          <div className="mb-3 flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
              ComboBox
            </h1>
            <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              Component
            </span>
          </div>
          <p className="pr-8 text-base text-zinc-600 dark:text-zinc-400">
            Advanced searchable autocomplete dropdown supporting single selection and multi-select
            tags/chips with live fuzzy filtering.
          </p>
        </div>
        <PageToolbar />
      </div>

      {/* Hero Preview & Code */}
      <section className="space-y-4">
        <ComponentPreview>
          <div className="w-full max-w-md py-4">
            <ComboBox
              isMulti
              label="Selected Tech Stack"
              description="Type to filter and click items to add or remove tags."
              options={frameworks}
              defaultValues={["react", "typescript", "tailwind"]}
              placeholder="Search technologies..."
            />
          </div>
        </ComponentPreview>

        <CodeBlock
          code={`import { ComboBox } from '@hudbird/ui'

const frameworks = [
  { value: 'react', label: 'React' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'tailwind', label: 'Tailwind CSS' },
  { value: 'nextjs', label: 'Next.js' },
]

function Example() {
  return (
    <ComboBox
      isMulti
      label="Selected Tech Stack"
      description="Type to filter and click items to add or remove tags."
      options={frameworks}
      defaultValues={['react', 'typescript', 'tailwind']}
      placeholder="Search technologies..."
    />
  )
}`}
        />
      </section>
      <div id="installation" className="scroll-mt-24 space-y-4">
        <InstallationTabs componentName="combo-box" manualCode={comboBoxCode} />
      </div>

      {/* Component API */}
      <section id="component-api" className="scroll-mt-24 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Component API
        </h2>
        <ApiTable
          note={
            <span>
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">ComboBox</strong>{" "}
              supports both single-value (autocomplete dropdown) and multi-value (interactive chips
              container) modes.
            </span>
          }
          rows={apiRows}
        />
      </section>

      {/* Examples Header */}
      <section id="examples" className="scroll-mt-24 space-y-14">
        <div>
          <h2 className="mb-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Examples
          </h2>
        </div>

        {/* 1. Single Select (Autocomplete) */}
        <div id="single-select" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Single Select (Autocomplete)
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Standard single selection autocomplete. Typing in the input filters the items, and
            choosing an option immediately selects it:
          </p>

          <ComponentPreview>
            <div className="w-full max-w-sm space-y-4 py-4">
              <ComboBox
                label="Country Destination"
                options={countries}
                value={selectedCountry}
                onValueChange={(val) => setSelectedCountry(val)}
                placeholder="Select country..."
              />
              <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50/50 p-3 text-xs dark:border-zinc-800 dark:bg-zinc-900/40">
                <span className="text-zinc-500 dark:text-zinc-400">Selected Value:</span>
                <span className="font-mono font-semibold text-indigo-600 dark:text-indigo-400">
                  {selectedCountry || "(none)"}
                </span>
              </div>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { useState } from 'react'
import { ComboBox } from '@hudbird/ui'

function Example() {
  const [selectedCountry, setSelectedCountry] = useState('id')

  return (
    <ComboBox
      label="Country Destination"
      options={countries}
      value={selectedCountry}
      onValueChange={(val) => setSelectedCountry(val)}
      placeholder="Select country..."
    />
  )
}`}
          />
        </div>

        {/* 2. Multi-Select (Advanced Chips) */}
        <div id="multi-select" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Multi-Select (Advanced Chips)
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Pass{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              isMulti
            </code>{" "}
            to enable multi-selection tags. Users can dismiss individual chips with the (X) button
            or click items in the dropdown to toggle them:
          </p>

          <ComponentPreview>
            <div className="w-full max-w-md space-y-4 py-4">
              <ComboBox
                isMulti
                label="Developer Skills"
                description="Select all relevant frontend competencies."
                options={frameworks}
                values={selectedSkills}
                onValuesChange={(vals) => setSelectedSkills(vals)}
                placeholder="Add more skills..."
              />

              <div className="space-y-1.5 rounded-xl border border-zinc-200 bg-zinc-50/50 p-3.5 text-xs dark:border-zinc-800 dark:bg-zinc-900/40">
                <div className="text-zinc-500 dark:text-zinc-400">
                  Selected Values ({selectedSkills.length}):
                </div>
                <div className="font-mono font-semibold text-indigo-600 dark:text-indigo-400">
                  {selectedSkills.length > 0 ? selectedSkills.join(", ") : "(empty)"}
                </div>
              </div>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { useState } from 'react'
import { ComboBox } from '@hudbird/ui'

function Example() {
  const [skills, setSkills] = useState(['react', 'typescript', 'tailwind'])

  return (
    <ComboBox
      isMulti
      label="Developer Skills"
      options={frameworks}
      values={skills}
      onValuesChange={(vals) => setSkills(vals)}
      placeholder="Add more skills..."
    />
  )
}`}
          />
        </div>

        {/* 3. Variants & Sizes */}
        <div id="variants-sizes" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Variants & Sizes
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Supports{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              'bordered'
            </code>{" "}
            and{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              'flat'
            </code>{" "}
            surface designs across three sizes:
          </p>

          <ComponentPreview>
            <div className="grid w-full max-w-2xl grid-cols-1 gap-6 py-4 md:grid-cols-2">
              <ComboBox
                label="Bordered Variant (Size MD)"
                variant="bordered"
                size="md"
                options={frameworks}
                defaultValue="vue"
              />
              <ComboBox
                label="Flat Variant (Size MD)"
                variant="flat"
                size="md"
                options={frameworks}
                defaultValue="svelte"
              />
              <ComboBox
                label="Small (sm)"
                size="sm"
                options={frameworks}
                placeholder="Small ComboBox..."
              />
              <ComboBox
                label="Large (lg)"
                size="lg"
                options={frameworks}
                placeholder="Large ComboBox..."
              />
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { ComboBox } from '@hudbird/ui'

function Example() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ComboBox label="Bordered (md)" variant="bordered" options={frameworks} defaultValue="vue" />
      <ComboBox label="Flat (md)" variant="flat" options={frameworks} defaultValue="svelte" />
      <ComboBox label="Small (sm)" size="sm" options={frameworks} />
      <ComboBox label="Large (lg)" size="lg" options={frameworks} />
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
            Showcase for{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              disabled
            </code>{" "}
            state and{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              isInvalid
            </code>{" "}
            validation error borders:
          </p>

          <ComponentPreview>
            <div className="grid w-full max-w-2xl grid-cols-1 gap-6 py-4 md:grid-cols-2">
              <ComboBox
                isMulti
                label="Disabled ComboBox"
                disabled
                options={frameworks}
                defaultValues={["react", "nextjs"]}
                description="This field is currently read-only."
              />
              <ComboBox
                label="Required Framework"
                isInvalid
                options={frameworks}
                errorMessage="Please select a valid technology."
                placeholder="Search..."
              />
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { ComboBox } from '@hudbird/ui'

function Example() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Disabled Multi-Select */}
      <ComboBox
        isMulti
        label="Disabled ComboBox"
        disabled
        options={frameworks}
        defaultValues={['react', 'nextjs']}
        description="This field is currently read-only."
      />

      {/* Invalid Validation State */}
      <ComboBox
        label="Required Framework"
        isInvalid
        options={frameworks}
        errorMessage="Please select a valid technology."
        placeholder="Search..."
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
