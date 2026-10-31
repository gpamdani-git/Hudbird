// apps/docs/src/pages/SliderDoc.tsx
import sliderCode from "../../../../packages/core/src/components/Slider/Slider.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import React, { useState } from "react";
import { DocHeader } from "../components/DocHeader";
import { Slider, Button } from "@hudbird/ui";
import { Volume2, VolumeX, Sun, Sparkles } from "lucide-react";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";

export const sliderTocItems = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "basic-slider", title: "Basic slider" },
      { id: "steps-and-range", title: "Custom min, max & step" },
      { id: "formatted-values", title: "Custom formatting" },
      { id: "disabled-state", title: "Disabled state" },
    ],
  },
];

export default function SliderDoc() {
  const [volume, setVolume] = useState(65);
  const [brightness, setBrightness] = useState(80);
  const [price, setPrice] = useState(250);

  const apiRows: ApiPropRow[] = [
    {
      prop: "value",
      defaultVal: "-",
      description: "Controlled numeric value of the slider.",
    },
    {
      prop: "defaultValue",
      defaultVal: "0",
      description: "Default uncontrolled initial value.",
    },
    {
      prop: "onChange",
      defaultVal: "-",
      description: "Callback invoked when value updates via drag, click, or keyboard arrows.",
    },
    {
      prop: "min",
      defaultVal: "0",
      description: "Minimum numeric bound.",
    },
    {
      prop: "max",
      defaultVal: "100",
      description: "Maximum numeric bound.",
    },
    {
      prop: "step",
      defaultVal: "1",
      description: "Granularity stepping interval for value increments.",
    },
    {
      prop: "label",
      defaultVal: "-",
      description: "Optional top label for accessible identification.",
    },
    {
      prop: "showValue",
      defaultVal: "false",
      description: "Whether to render current value text on top right.",
    },
    {
      prop: "valueFormat",
      defaultVal: "(val) => `${val}`",
      description: "Formatting callback for the displayed value string.",
    },
    {
      prop: "disabled",
      defaultVal: "false",
      description: "Disables interaction and applies muted opacity.",
    },
  ];

  return (
    <div className="space-y-24 pb-24 sm:space-y-32">
      {/* Header */}
      <DocHeader
        category="Components"
        title="Slider"
        badge="Core"
        description="Accessible input component allowing users to select numeric values along a track via mouse dragging, track clicks, or keyboard navigation."
      />

      {/* Main Preview */}
      <section className="space-y-4">
        <ComponentPreview>
          <div className="w-full max-w-md py-4">
            <Slider
              label="Volume Level"
              showValue
              value={volume}
              onChange={setVolume}
              valueFormat={(val) => `${val}%`}
            />
          </div>
        </ComponentPreview>

        <CodeBlock
          code={`import { Slider } from "@hudbird/ui";

export function Example() {
  const [value, setValue] = useState(50);

  return (
    <Slider
      label="Volume Level"
      showValue
      value={value}
      onChange={setValue}
      valueFormat={(val) => \`\${val}%\`}
    />
  );
}`}
        />
      </section>

      {/* Installation */}
      <div id="installation" className="scroll-mt-24 space-y-4">
        <InstallationTabs componentName="slider" manualCode={sliderCode} />
      </div>

      {/* Component API */}
      <section id="component-api" className="scroll-mt-24 space-y-6">
        <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
          Component API
        </h2>
        <ApiTable
          note={
            <span>
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">Slider</strong>{" "}
              adheres to WAI-ARIA slider specifications, featuring full keyboard support with Arrow
              keys, Home, and End.
            </span>
          }
          rows={apiRows}
        />
      </section>

      {/* Examples */}
      <section id="examples" className="scroll-mt-24 space-y-20 sm:space-y-24">
        <div>
          <h2 className="font-outfit mb-2 text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
            Examples
          </h2>
        </div>

        {/* 1. Basic Slider */}
        <div id="basic-slider" className="scroll-mt-24 space-y-4">
          <h3 className="font-outfit text-xl font-medium tracking-tight text-zinc-900 dark:text-white">
            Basic slider
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Clean and responsive slider with an icon:
          </p>

          <ComponentPreview>
            <div className="w-full max-w-md space-y-6 py-4">
              <div className="flex items-center gap-4">
                <Sun className="h-5 w-5 text-amber-500" />
                <div className="flex-1">
                  <Slider
                    value={brightness}
                    onChange={setBrightness}
                    label="Screen Brightness"
                    showValue
                  />
                </div>
              </div>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`<Slider
  value={brightness}
  onChange={setBrightness}
  label="Screen Brightness"
  showValue
/>`}
          />
        </div>

        {/* 2. Custom min, max & step */}
        <div id="steps-and-range" className="scroll-mt-24 space-y-4">
          <h3 className="font-outfit text-xl font-medium tracking-tight text-zinc-900 dark:text-white">
            Custom min, max & step
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Discrete increments (e.g. stepping in increments of 25):
          </p>

          <ComponentPreview>
            <div className="w-full max-w-md py-4">
              <Slider
                min={0}
                max={500}
                step={25}
                value={price}
                onChange={setPrice}
                label="Budget Limit"
                showValue
                valueFormat={(v) => `$${v}`}
              />
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`<Slider
  min={0}
  max={500}
  step={25}
  value={price}
  onChange={setPrice}
  label="Budget Limit"
  showValue
  valueFormat={(val) => \`$\${val}\`}
/>`}
          />
        </div>

        {/* 3. Disabled state */}
        <div id="disabled-state" className="scroll-mt-24 space-y-4">
          <h3 className="font-outfit text-xl font-medium tracking-tight text-zinc-900 dark:text-white">
            Disabled state
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Muted appearance with interactions disabled:
          </p>

          <ComponentPreview>
            <div className="w-full max-w-md py-4">
              <Slider disabled defaultValue={40} label="Locked Setting" showValue />
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`<Slider disabled defaultValue={40} label="Locked Setting" showValue />`}
          />
        </div>
      </section>
    </div>
  );
}
