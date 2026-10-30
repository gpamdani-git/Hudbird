// apps/docs/src/pages/InputDoc.tsx
import inputCode from "../../../../packages/core/src/components/Input/Input.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import React, { useState } from "react";
import { DocHeader } from "../components/DocHeader";
import {
  Input,
  Button,
  type InputVariant,
  type InputSize,
  type InputRadius,
  type InputLabelPlacement,
} from "@hudbird/ui";
import { Search, Eye, EyeOff, Mail, Lock, DollarSign, Sparkles } from "lucide-react";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";

export const inputTocItems = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "basic-inputs", title: "Basic Form Variants (Flat, Bordered, Underlined)" },
      { id: "label-placements", title: "Label Placements (Outside vs Inside)" },
      { id: "content-slots", title: "Input with Content Slots (Start & End)" },
      { id: "clearable-input", title: "Clearable Input" },
      { id: "validation-states", title: "Validation & Descriptions" },
      { id: "sizes-and-radius", title: "Sizes & Corner Radii" },
      { id: "interactive-customizer", title: "Interactive Customizer" },
    ],
  },
];

export default function InputDoc() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [clearableValue, setClearableValue] = useState("john.doe@company.org");
  const [isInvalidState, setIsInvalidState] = useState(true);

  // Customizer state
  const [custVariant, setCustVariant] = useState<InputVariant>("flat");
  const [custSize, setCustSize] = useState<InputSize>("md");
  const [custRadius, setCustRadius] = useState<InputRadius>("md");
  const [custPlacement, setCustPlacement] = useState<InputLabelPlacement>("outside");
  const [custIsClearable, setCustIsClearable] = useState(true);
  const [custIsInvalid, setCustIsInvalid] = useState(false);
  const [custDisabled, setCustDisabled] = useState(false);

  const apiRows: ApiPropRow[] = [
    {
      prop: "variant",
      defaultVal: "'flat'",
      description: (
        <span>
          Visual container variant:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'flat'
          </code>{" "}
          (soft filled backdrop),{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'bordered'
          </code>{" "}
          (subtle perimeter outline), or{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'underlined'
          </code>{" "}
          (minimalist bottom border line).
        </span>
      ),
    },
    {
      prop: "size",
      defaultVal: "'md'",
      description: (
        <span>
          Input height & typography scale:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'sm'
          </code>{" "}
          (h-8 / 32px),{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'md'
          </code>{" "}
          (h-10 / 40px), or{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'lg'
          </code>{" "}
          (h-12 / 48px).
        </span>
      ),
    },
    {
      prop: "radius",
      defaultVal: "'md'",
      description: (
        <span>
          Corner curvature:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'none'
          </code>
          ,{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'md'
          </code>{" "}
          (12px rounded-xl),{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'lg'
          </code>{" "}
          (16px rounded-2xl), or{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'full'
          </code>{" "}
          (pill-shaped).
        </span>
      ),
    },
    {
      prop: "labelPlacement",
      defaultVal: "'outside'",
      description: (
        <span>
          Label position:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'outside'
          </code>{" "}
          (standard top-aligned title) or{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'inside'
          </code>{" "}
          (modern HeroUI-style embedded floating label).
        </span>
      ),
    },
    {
      prop: "isClearable",
      defaultVal: "false",
      description:
        "When true and input has text, renders an interactive cross icon (X) that instantly resets the input value.",
    },
    {
      prop: "isInvalid",
      defaultVal: "false",
      description:
        "When true, turns the perimeter border and text highlights into warning rose colors and swaps description for errorMessage.",
    },
    {
      prop: "startContent",
      defaultVal: "-",
      description:
        "ReactNode rendered at the start of the input frame (e.g. search icon, prefix currency symbol).",
    },
    {
      prop: "endContent",
      defaultVal: "-",
      description:
        "ReactNode rendered at the end of the input frame (e.g. password visibility toggle, unit suffix).",
    },
    {
      prop: "description",
      defaultVal: "-",
      description: "Informative helper text rendered beneath the input frame.",
    },
    {
      prop: "errorMessage",
      defaultVal: "-",
      description: "Descriptive error message displayed automatically when isInvalid={true}.",
    },
  ];

  return (
    <div className="space-y-16 pb-24">
      {/* Title & Introduction */}
      <DocHeader
        category="COMPONENTS"
        title="Input"
        badge="Component"
        description="A high-performance form field primitive with rich visual variants, embedded inside/outside labels, interactive clear buttons, custom start/end content slots, and robust validation state handling."
      />

      {/* Hero Preview & Code */}
      <section className="space-y-4">
        <ComponentPreview>
          <div className="w-full max-w-md space-y-4 py-4">
            <Input
              label="Email Address"
              placeholder="you@company.com"
              defaultValue="sophia.taylor@acme.inc"
              isClearable
              startContent={<Mail size={16} />}
              description="We'll never share your email address with third-parties."
            />
          </div>
        </ComponentPreview>

        <CodeBlock
          code={`import { Input } from "@/components/hudbird-ui/Input";
import { Mail } from 'lucide-react'

export default function Example() {
  return (
    <Input
      label="Email Address"
      placeholder="you@company.com"
      defaultValue="sophia.taylor@acme.inc"
      isClearable
      startContent={<Mail size={16} />}
      description="We'll never share your email address with third-parties."
    />
  )
}`}
        />
      </section>
      <div id="installation" className="scroll-mt-24 space-y-4">
        <InstallationTabs componentName="input" manualCode={inputCode} />
      </div>

      {/* Component API */}
      <section id="component-api" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-medium tracking-[-0.3px] text-zinc-900 dark:text-white">
          Component API
        </h2>
        <ApiTable
          note="Input extends standard HTML input attributes (e.g., type, placeholder, value, onChange, disabled)."
          rows={apiRows}
        />
      </section>

      {/* Examples Header */}
      <section id="examples" className="scroll-mt-24 space-y-14">
        <div>
          <h2 className="mb-2 text-2xl font-medium tracking-[-0.3px] text-zinc-900 dark:text-white">
            Examples
          </h2>
        </div>

        {/* 1. Basic Form Variants */}
        <div id="basic-inputs" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Basic Form Variants (Flat, Bordered, Underlined)
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Select among three distinctive visual archetypes:{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              flat
            </code>
            ,{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              bordered
            </code>
            , and{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              underlined
            </code>
            :
          </p>

          <ComponentPreview>
            <div className="grid w-full max-w-3xl grid-cols-1 gap-6 py-4 md:grid-cols-3">
              <Input
                variant="flat"
                label="Flat (Default)"
                placeholder="Enter workspace name"
                defaultValue="Acme Production"
              />
              <Input
                variant="bordered"
                label="Bordered"
                placeholder="Enter workspace name"
                defaultValue="Acme Production"
              />
              <Input
                variant="underlined"
                label="Underlined"
                placeholder="Enter workspace name"
                defaultValue="Acme Production"
              />
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Input } from "@/components/hudbird-ui/Input";

{/* 1. Flat Variant (Default) */}
<Input variant="flat" label="Flat (Default)" placeholder="Enter workspace name" />

{/* 2. Bordered Variant */}
<Input variant="bordered" label="Bordered" placeholder="Enter workspace name" />

{/* 3. Underlined Variant */}
<Input variant="underlined" label="Underlined" placeholder="Enter workspace name" />`}
          />
        </div>

        {/* 2. Label Placements */}
        <div id="label-placements" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Label Placements (Outside vs Inside)
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Position labels conventionally above the control (
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              labelPlacement="outside"
            </code>
            ) or embedded directly inside the input container frame (
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              labelPlacement="inside"
            </code>
            ):
          </p>

          <ComponentPreview>
            <div className="grid w-full max-w-2xl grid-cols-1 gap-6 py-4 sm:grid-cols-2">
              <Input
                label="Full Name"
                labelPlacement="outside"
                placeholder="Jane Cooper"
                defaultValue="Jane Cooper"
              />
              <Input
                label="Full Name"
                labelPlacement="inside"
                placeholder="Jane Cooper"
                defaultValue="Jane Cooper"
              />
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Input } from "@/components/hudbird-ui/Input";

{/* Standard Outside Placement */}
<Input
  label="Full Name"
  labelPlacement="outside"
  placeholder="Jane Cooper"
/>

{/* Modern Inside Placement */}
<Input
  label="Full Name"
  labelPlacement="inside"
  placeholder="Jane Cooper"
/>`}
          />
        </div>

        {/* 3. Content Slots */}
        <div id="content-slots" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Input with Content Slots (Start & End)
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Enrich inputs with prefix symbols, interactive action buttons, currency selectors, and
            password visibility toggles using{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              startContent
            </code>{" "}
            and{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              endContent
            </code>
            :
          </p>

          <ComponentPreview>
            <div className="grid w-full max-w-2xl grid-cols-1 gap-6 py-4 sm:grid-cols-2">
              {/* Search Bar */}
              <Input
                label="Global Search"
                placeholder="Search resources, API keys, documents..."
                startContent={<Search size={16} />}
                isClearable
                defaultValue="deployment cluster"
              />

              {/* Currency Price */}
              <Input
                label="Billing Threshold"
                type="number"
                defaultValue="250"
                startContent={<DollarSign size={16} />}
                endContent={
                  <span className="font-mono text-xs font-semibold text-zinc-400">USD / mo</span>
                }
              />

              {/* Password Toggle */}
              <Input
                label="Master Password"
                type={isPasswordVisible ? "text" : "password"}
                defaultValue="secretPassw0rd!"
                startContent={<Lock size={16} />}
                endContent={
                  <button
                    type="button"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    className="cursor-pointer p-1 text-zinc-400 transition-colors hover:text-zinc-700 dark:hover:text-zinc-200"
                    aria-label="Toggle password visibility"
                  >
                    {isPasswordVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                }
              />

              {/* Feature Upgrade with Badge */}
              <Input
                label="Custom Subdomain"
                defaultValue="my-startup"
                endContent={
                  <div className="flex items-center gap-1 rounded-md border border-indigo-200/60 bg-indigo-50 px-2 py-0.5 text-[11px] font-semibold text-indigo-600 dark:border-indigo-800/60 dark:bg-indigo-950/60 dark:text-indigo-400">
                    <Sparkles size={12} />
                    <span>.brand.io</span>
                  </div>
                }
              />
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { useState } from 'react'
import { Input } from "@/components/hudbird-ui/Input";
import { Search, DollarSign, Lock, Eye, EyeOff } from 'lucide-react'

export function ContentSlotsExample() {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Search Bar */}
      <Input
        label="Global Search"
        placeholder="Search resources..."
        startContent={<Search size={16} />}
        isClearable
      />

      {/* Currency */}
      <Input
        label="Billing Threshold"
        type="number"
        defaultValue="250"
        startContent={<DollarSign size={16} />}
        endContent={<span className="text-xs text-zinc-400 font-mono">USD / mo</span>}
      />

      {/* Password with Eye Toggle */}
      <Input
        label="Master Password"
        type={isVisible ? "text" : "password"}
        startContent={<Lock size={16} />}
        endContent={
          <button type="button" onClick={() => setIsVisible(!isVisible)}>
            {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        }
      />
    </div>
  )
}`}
          />
        </div>

        {/* 4. Clearable Input */}
        <div id="clearable-input" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Clearable Input</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Enable{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              isClearable
            </code>{" "}
            to automatically show an interactive clear button when text is present:
          </p>

          <ComponentPreview>
            <div className="w-full max-w-md space-y-4 py-4">
              <Input
                label="Username / Handle"
                value={clearableValue}
                onChange={(e) => setClearableValue(e.target.value)}
                onClear={() => setClearableValue("")}
                isClearable
                placeholder="Type something to see clear icon..."
              />
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Current controlled value:{" "}
                <code className="font-mono font-semibold text-zinc-800 dark:text-zinc-200">
                  "{clearableValue}"
                </code>
              </p>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { useState } from 'react'
import { Input } from "@/components/hudbird-ui/Input";

export function ClearableExample() {
  const [value, setValue] = useState('john.doe@company.org')

  return (
    <Input
      label="Username / Handle"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onClear={() => setValue('')}
      isClearable
      placeholder="Type something..."
    />
  )
}`}
          />
        </div>

        {/* 5. Validation States */}
        <div id="validation-states" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Validation & Descriptions
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Provide helpful context with{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              description
            </code>{" "}
            or trigger warning alerts with{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              isInvalid
            </code>{" "}
            and{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              errorMessage
            </code>
            :
          </p>

          <div className="flex items-center gap-3">
            <Button
              size="sm"
              variant={isInvalidState ? "solid" : "outline"}
              color={isInvalidState ? "rose" : "zinc"}
              onClick={() => setIsInvalidState(!isInvalidState)}
            >
              Toggle isInvalid: {isInvalidState ? "True (Error Active)" : "False (Valid)"}
            </Button>
          </div>

          <ComponentPreview>
            <div className="grid w-full max-w-2xl grid-cols-1 gap-6 py-4 sm:grid-cols-2">
              <Input
                label="Email"
                defaultValue="invalid-email-format"
                isInvalid={isInvalidState}
                errorMessage="Please enter a valid RFC-compliant email address."
                description="Your account confirmation receipt will be dispatched here."
              />

              <Input
                label="Organization Slug"
                defaultValue="acme-corp"
                isInvalid={isInvalidState}
                errorMessage="This slug is already claimed by another organization."
                description="Slug is permanent and cannot be modified later."
              />
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Input } from "@/components/hudbird-ui/Input";

<Input
  label="Email"
  defaultValue="invalid-email-format"
  isInvalid={${isInvalidState}}
  errorMessage="Please enter a valid RFC-compliant email address."
  description="Your account confirmation receipt will be dispatched here."
/>`}
          />
        </div>

        {/* 6. Sizes & Radius */}
        <div id="sizes-and-radius" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Sizes & Corner Radii
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Mix and match size dimensions (
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              sm
            </code>
            ,{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              md
            </code>
            ,{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              lg
            </code>
            ) with corner radius tokens (
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              none
            </code>
            ,{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              md
            </code>
            ,{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              lg
            </code>
            ,{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              full
            </code>
            ):
          </p>

          <ComponentPreview>
            <div className="flex w-full max-w-md flex-col gap-5 py-4">
              <Input
                size="sm"
                radius="md"
                label="Small Size (h-8 / 32px)"
                placeholder="Small input control"
                startContent={<Search size={14} />}
              />
              <Input
                size="md"
                radius="md"
                label="Medium Size (h-10 / 40px - Default)"
                placeholder="Medium input control"
                startContent={<Search size={16} />}
              />
              <Input
                size="lg"
                radius="lg"
                label="Large Size (h-12 / 48px)"
                placeholder="Large input control"
                startContent={<Search size={18} />}
              />
              <Input
                size="md"
                radius="full"
                label="Pill Rounded (radius='full')"
                placeholder="Search with pill frame..."
                startContent={<Search size={16} />}
                isClearable
                defaultValue="quick filter"
              />
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Input } from "@/components/hudbird-ui/Input";

{/* Small */}
<Input size="sm" radius="md" label="Small (h-8)" />

{/* Medium */}
<Input size="md" radius="md" label="Medium (h-10)" />

{/* Large */}
<Input size="lg" radius="lg" label="Large (h-12)" />

{/* Pill Shaped */}
<Input size="md" radius="full" label="Pill Frame" isClearable />`}
          />
        </div>

        {/* 7. Interactive Customizer */}
        <div id="interactive-customizer" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Interactive Customizer
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Experiment with combinations of variants, label placements, sizes, corner radii, and
            error flags:
          </p>

          {/* Controls Bar */}
          <div className="grid grid-cols-2 gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4 sm:grid-cols-4 dark:border-zinc-800 dark:bg-zinc-900/50">
            {/* Variant */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
                Variant
              </label>
              <select
                value={custVariant}
                onChange={(e) => setCustVariant(e.target.value as InputVariant)}
                className="h-9 w-full rounded-lg border border-zinc-300 bg-white px-2.5 text-xs font-medium text-zinc-900 outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              >
                <option value="flat">Flat</option>
                <option value="bordered">Bordered</option>
                <option value="underlined">Underlined</option>
              </select>
            </div>

            {/* Label Placement */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
                Label Placement
              </label>
              <select
                value={custPlacement}
                onChange={(e) => setCustPlacement(e.target.value as InputLabelPlacement)}
                className="h-9 w-full rounded-lg border border-zinc-300 bg-white px-2.5 text-xs font-medium text-zinc-900 outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              >
                <option value="outside">Outside</option>
                <option value="inside">Inside</option>
              </select>
            </div>

            {/* Size */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
                Size
              </label>
              <select
                value={custSize}
                onChange={(e) => setCustSize(e.target.value as InputSize)}
                className="h-9 w-full rounded-lg border border-zinc-300 bg-white px-2.5 text-xs font-medium text-zinc-900 outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              >
                <option value="sm">Small (sm)</option>
                <option value="md">Medium (md)</option>
                <option value="lg">Large (lg)</option>
              </select>
            </div>

            {/* Radius */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
                Radius
              </label>
              <select
                value={custRadius}
                onChange={(e) => setCustRadius(e.target.value as InputRadius)}
                className="h-9 w-full rounded-lg border border-zinc-300 bg-white px-2.5 text-xs font-medium text-zinc-900 outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              >
                <option value="none">None</option>
                <option value="md">Medium (md)</option>
                <option value="lg">Large (lg)</option>
                <option value="full">Full (Pill)</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              size="sm"
              variant={custIsClearable ? "solid" : "outline"}
              color="indigo"
              onClick={() => setCustIsClearable(!custIsClearable)}
            >
              isClearable: {custIsClearable ? "True" : "False"}
            </Button>
            <Button
              size="sm"
              variant={custIsInvalid ? "solid" : "outline"}
              color={custIsInvalid ? "rose" : "zinc"}
              onClick={() => setCustIsInvalid(!custIsInvalid)}
            >
              isInvalid: {custIsInvalid ? "True" : "False"}
            </Button>
            <Button
              size="sm"
              variant={custDisabled ? "solid" : "outline"}
              color={custDisabled ? "indigo" : "zinc"}
              onClick={() => setCustDisabled(!custDisabled)}
            >
              disabled: {custDisabled ? "True" : "False"}
            </Button>
          </div>

          <ComponentPreview>
            <div className="w-full max-w-md py-6">
              <Input
                variant={custVariant}
                size={custSize}
                radius={custRadius}
                labelPlacement={custPlacement}
                isClearable={custIsClearable}
                isInvalid={custIsInvalid}
                disabled={custDisabled}
                label="Customized Field"
                placeholder="Type here..."
                defaultValue="Creative developer sample text"
                startContent={<Mail size={16} />}
                description="Standard descriptive helper hint."
                errorMessage="Invalid value provided."
              />
            </div>
          </ComponentPreview>
        </div>
      </section>
    </div>
  );
}
