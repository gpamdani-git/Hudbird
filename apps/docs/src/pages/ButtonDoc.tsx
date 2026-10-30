// apps/docs/src/pages/ButtonDoc.tsx
import buttonCode from "../../../../packages/core/src/components/Button/Button.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import React, { useState } from "react";
import { DocHeader } from "../components/DocHeader";
import { Button } from "@hudbird/ui";
import {
  Plus,
  ArrowRight,
  Trash2,
  Edit,
  Search,
  Download,
  Heart,
  Mail,
  Send,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";

export const buttonTocItems = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "basic-buttons", title: "Basic Buttons & Colors" },
      { id: "button-variants", title: "Button Variants" },
      { id: "buttons-with-icons", title: "Buttons with Icons" },
      { id: "icon-only", title: "Icon Only Buttons" },
      { id: "custom-radius", title: "Custom Radius" },
      { id: "loading-disabled", title: "Loading & Disabled States" },
      { id: "using-as-a-link", title: "Using as a Link" },
    ],
  },
  {
    id: "appendix",
    title: "Appendix",
    children: [{ id: "solid-color-reference", title: "Solid Color Reference" }],
  },
];

export default function ButtonDoc() {
  const [isLoadingActive, setIsLoadingActive] = useState(false);

  const apiRows: ApiPropRow[] = [
    {
      prop: "variant",
      defaultVal: "'solid'",
      description: (
        <span>
          Visual variant style:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'solid'
          </code>
          ,{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'bordered'
          </code>
          ,{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'flat'
          </code>
          , or{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'light'
          </code>
          .
        </span>
      ),
    },
    {
      prop: "color",
      defaultVal: "'primary'",
      description: (
        <span>
          The semantic color palette:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'primary'
          </code>
          ,{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'success'
          </code>
          ,{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'danger'
          </code>
          , or solid tokens.
        </span>
      ),
    },
    {
      prop: "size",
      defaultVal: "'md'",
      description: (
        <span>
          Button size dimensions:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'sm'
          </code>{" "}
          (h-8),{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'md'
          </code>{" "}
          (h-9), or{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'lg'
          </code>{" "}
          (h-11).
        </span>
      ),
    },
    {
      prop: "radius",
      defaultVal: "'md'",
      description: (
        <span>
          Border radius curvature:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'none'
          </code>
          ,{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'md'
          </code>{" "}
          (rounded-xl),{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'lg'
          </code>{" "}
          (rounded-2xl), or{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'full'
          </code>{" "}
          (rounded-full).
        </span>
      ),
    },
    {
      prop: "isIconOnly",
      defaultVal: "false",
      description: "Optimizes padding to a square or circle aspect ratio for icon-only buttons.",
    },
    {
      prop: "startContent",
      defaultVal: "-",
      description: "Slot to render an icon or component at the start (left) of the button label.",
    },
    {
      prop: "endContent",
      defaultVal: "-",
      description: "Slot to render an icon or component at the end (right) of the button label.",
    },
    {
      prop: "isLoading",
      defaultVal: "false",
      description: "Renders an animated SVG spinner and disables click interactions.",
    },
    {
      prop: "disabled",
      defaultVal: "false",
      description: "Disables button interactions and applies muted opacity styling.",
    },
    {
      prop: "href",
      defaultVal: "-",
      description: "Renders the component as an <a> HTML anchor tag.",
    },
  ];

  const adaptiveColors = [
    { name: "primary", color: "primary" as const },
    { name: "success", color: "success" as const },
    { name: "danger", color: "danger" as const },
    { name: "dark/zinc", color: "dark/zinc" as const },
  ];

  const solidColors = [
    { name: "dark", color: "dark" as const },
    { name: "zinc", color: "zinc" as const },
    { name: "white", color: "white" as const },
    { name: "red", color: "red" as const },
    { name: "orange", color: "orange" as const },
    { name: "amber", color: "amber" as const },
    { name: "yellow", color: "yellow" as const },
    { name: "lime", color: "lime" as const },
    { name: "green", color: "green" as const },
    { name: "emerald", color: "emerald" as const },
    { name: "teal", color: "teal" as const },
    { name: "cyan", color: "cyan" as const },
    { name: "sky", color: "sky" as const },
    { name: "blue", color: "blue" as const },
    { name: "indigo", color: "indigo" as const },
    { name: "violet", color: "violet" as const },
    { name: "purple", color: "purple" as const },
    { name: "fuchsia", color: "fuchsia" as const },
    { name: "pink", color: "pink" as const },
    { name: "rose", color: "rose" as const },
  ];

  return (
    <div className="space-y-20 sm:space-y-28 pb-32">
      {/* Title & Introduction */}
      <DocHeader
        category="COMPONENTS"
        title="Button"
        badge="Component"
        description="Interactive trigger component with rich slot support for icons, loaders, compound variants, and corner radiuses."
      />

      {/* Hero Preview & Code */}
      <section className="space-y-6">
        <ComponentPreview>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button color="primary" startContent={<Sparkles className="h-4 w-4" />}>
              Get Started
            </Button>
            <Button variant="bordered" color="primary">
              Learn More
            </Button>
            <Button
              variant="flat"
              color="success"
              startContent={<CheckCircle2 className="h-4 w-4" />}
            >
              Completed
            </Button>
            <Button isIconOnly color="danger" variant="light" aria-label="Like">
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        </ComponentPreview>

        <CodeBlock
          code={`import { Button } from "@/components/hudbird-ui/Button";
import { Sparkles, CheckCircle2, Heart } from 'lucide-react'

function Example() {
  return (
    <div className="flex items-center gap-4">
      <Button color="primary" startContent={<Sparkles className="w-4 h-4" />}>
        Get Started
      </Button>
      <Button variant="bordered" color="primary">
        Learn More
      </Button>
      <Button variant="flat" color="success" startContent={<CheckCircle2 className="w-4 h-4" />}>
        Completed
      </Button>
      <Button isIconOnly color="danger" variant="light">
        <Heart className="w-5 h-5" />
      </Button>
    </div>
  )
}`}
        />
      </section>
      <div id="installation" className="scroll-mt-24 space-y-6">
        <InstallationTabs componentName="button" manualCode={buttonCode} />
      </div>

      {/* Component API */}
      <section id="component-api" className="scroll-mt-24 space-y-6">
        <h2 className="font-outfit text-3xl sm:text-4xl font-medium tracking-[-0.8px] leading-[1.22] text-zinc-900 dark:text-white">
          Component API
        </h2>
        <ApiTable
          note={
            <span>
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">Button</strong>{" "}
              supports standard HTML button and anchor attributes, accessible focus rings, and
              seamless slot management for icons.
            </span>
          }
          rows={apiRows}
        />
      </section>

      {/* Examples Header */}
      <section id="examples" className="scroll-mt-24 space-y-16">
        <div>
          <h2 className="font-outfit mb-4 text-3xl sm:text-4xl font-medium tracking-[-0.8px] leading-[1.22] text-zinc-900 dark:text-white">
            Examples
          </h2>
        </div>

        {/* 1. Basic Buttons & Colors */}
        <div id="basic-buttons" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Basic Buttons & Colors
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Render buttons in primary brand colors and three standard sizes (
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              'sm'
            </code>
            ,{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              'md'
            </code>
            ,{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              'lg'
            </code>
            ):
          </p>

          <ComponentPreview>
            <div className="flex w-full flex-col items-center gap-5">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button color="primary">Primary</Button>
                <Button color="success">Success</Button>
                <Button color="danger">Danger</Button>
                <Button color="dark/zinc">Dark / Zinc</Button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Button size="sm" color="primary">
                  Small (sm)
                </Button>
                <Button size="md" color="primary">
                  Medium (md)
                </Button>
                <Button size="lg" color="primary">
                  Large (lg)
                </Button>
              </div>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Button } from "@/components/hudbird-ui/Button";

function Example() {
  return (
    <>
      <Button color="primary">Primary</Button>
      <Button color="success">Success</Button>
      <Button color="danger">Danger</Button>
      
      {/* Sizes */}
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </>
  )
}`}
          />
        </div>

        {/* 2. Button Variants */}
        <div id="button-variants" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Button Variants</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Choose between{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              'solid'
            </code>
            ,{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              'bordered'
            </code>
            ,{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              'flat'
            </code>
            , and{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              'light'
            </code>
            :
          </p>

          <ComponentPreview>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button variant="solid" color="primary">
                Solid
              </Button>
              <Button variant="bordered" color="primary">
                Bordered
              </Button>
              <Button variant="flat" color="primary">
                Flat
              </Button>
              <Button variant="light" color="primary">
                Light
              </Button>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Button } from "@/components/hudbird-ui/Button";

function Example() {
  return (
    <div className="flex items-center gap-4">
      <Button variant="solid" color="primary">Solid</Button>
      <Button variant="bordered" color="primary">Bordered</Button>
      <Button variant="flat" color="primary">Flat</Button>
      <Button variant="light" color="primary">Light</Button>
    </div>
  )
}`}
          />
        </div>

        {/* 3. Buttons with Icons */}
        <div id="buttons-with-icons" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Buttons with Icons
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Use{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              startContent
            </code>{" "}
            to place an icon on the left, or{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              endContent
            </code>{" "}
            to place it on the right with automatic gap alignment:
          </p>

          <ComponentPreview>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button color="primary" startContent={<Plus className="h-4 w-4" />}>
                Create Project
              </Button>
              <Button color="success" variant="flat" startContent={<Mail className="h-4 w-4" />}>
                Send Email
              </Button>
              <Button
                color="primary"
                variant="bordered"
                endContent={<ArrowRight className="h-4 w-4" />}
              >
                Continue
              </Button>
              <Button color="danger" variant="light" startContent={<Trash2 className="h-4 w-4" />}>
                Delete Item
              </Button>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Button } from "@/components/hudbird-ui/Button";
import { Plus, Mail, ArrowRight, Trash2 } from 'lucide-react'

function Example() {
  return (
    <div className="flex items-center gap-4">
      {/* Icon at start */}
      <Button color="primary" startContent={<Plus className="w-4 h-4" />}>
        Create Project
      </Button>

      {/* Icon at start with flat variant */}
      <Button color="success" variant="flat" startContent={<Mail className="w-4 h-4" />}>
        Send Email
      </Button>

      {/* Icon at end */}
      <Button color="primary" variant="bordered" endContent={<ArrowRight className="w-4 h-4" />}>
        Continue
      </Button>

      {/* Danger light button */}
      <Button color="danger" variant="light" startContent={<Trash2 className="w-4 h-4" />}>
        Delete Item
      </Button>
    </div>
  )
}`}
          />
        </div>

        {/* 4. Icon Only */}
        <div id="icon-only" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Icon Only Buttons
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Set{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              isIconOnly
            </code>{" "}
            to create square or circular action triggers without text:
          </p>

          <ComponentPreview>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button isIconOnly color="primary" aria-label="Search">
                <Search className="h-4 w-4" />
              </Button>
              <Button isIconOnly variant="bordered" color="primary" aria-label="Edit">
                <Edit className="h-4 w-4" />
              </Button>
              <Button isIconOnly variant="flat" color="success" radius="full" aria-label="Download">
                <Download className="h-4 w-4" />
              </Button>
              <Button isIconOnly variant="light" color="danger" radius="full" aria-label="Delete">
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button isIconOnly size="sm" color="dark/zinc" radius="md" aria-label="Plus">
                <Plus className="h-3.5 w-3.5" />
              </Button>
              <Button isIconOnly size="lg" color="primary" radius="full" aria-label="Send">
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Button } from "@/components/hudbird-ui/Button";
import { Search, Edit, Download, Trash2, Send } from 'lucide-react'

function Example() {
  return (
    <div className="flex items-center gap-4">
      {/* Standard square */}
      <Button isIconOnly color="primary" aria-label="Search">
        <Search className="w-4 h-4" />
      </Button>

      {/* Bordered */}
      <Button isIconOnly variant="bordered" color="primary" aria-label="Edit">
        <Edit className="w-4 h-4" />
      </Button>

      {/* Rounded full circular */}
      <Button isIconOnly variant="flat" color="success" radius="full" aria-label="Download">
        <Download className="w-4 h-4" />
      </Button>

      {/* Large size icon button */}
      <Button isIconOnly size="lg" color="primary" radius="full" aria-label="Send">
        <Send className="w-5 h-5" />
      </Button>
    </div>
  )
}`}
          />
        </div>

        {/* 5. Custom Radius */}
        <div id="custom-radius" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Custom Radius</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Customize corner rounding from sharp edges to full pills using the{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              'radius'
            </code>{" "}
            prop:
          </p>

          <ComponentPreview>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button radius="none" color="primary">
                radius="none"
              </Button>
              <Button radius="md" color="primary">
                radius="md" (default)
              </Button>
              <Button radius="lg" color="primary">
                radius="lg"
              </Button>
              <Button radius="full" color="primary">
                radius="full"
              </Button>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Button } from "@/components/hudbird-ui/Button";

function Example() {
  return (
    <div className="flex items-center gap-4">
      <Button radius="none" color="primary">Square</Button>
      <Button radius="md" color="primary">Rounded XL</Button>
      <Button radius="lg" color="primary">Rounded 2XL</Button>
      <Button radius="full" color="primary">Pill</Button>
    </div>
  )
}`}
          />
        </div>

        {/* 6. Loading & Disabled States */}
        <div id="loading-disabled" className="scroll-mt-24 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Loading & Disabled States
            </h3>
            <Button size="sm" variant="bordered" onClick={() => setIsLoadingActive((v) => !v)}>
              Toggle Loading: {isLoadingActive ? "ON" : "OFF"}
            </Button>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Toggle{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              isLoading
            </code>{" "}
            to display a spinner and prevent clicks, or use{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              disabled
            </code>{" "}
            to lock interactions:
          </p>

          <ComponentPreview>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button isLoading={isLoadingActive} color="primary">
                {isLoadingActive ? "Processing..." : "Submit Order"}
              </Button>
              <Button
                isLoading={isLoadingActive}
                isIconOnly
                color="primary"
                radius="full"
                aria-label="Loading"
              >
                <Send className="h-4 w-4" />
              </Button>
              <Button disabled color="primary">
                Disabled Solid
              </Button>
              <Button disabled variant="bordered" color="primary">
                Disabled Bordered
              </Button>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Button } from "@/components/hudbird-ui/Button";

function Example() {
  return (
    <div className="flex items-center gap-4">
      {/* Loading state with spinner */}
      <Button isLoading color="primary">
        Processing...
      </Button>

      {/* Loading icon only button */}
      <Button isLoading isIconOnly color="primary" radius="full" />

      {/* Disabled button */}
      <Button disabled color="primary">
        Disabled Action
      </Button>
    </div>
  )
}`}
          />
        </div>

        {/* 7. Using as a link */}
        <div id="using-as-a-link" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Using as a link</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Pass the{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              'href'
            </code>{" "}
            prop to render an accessible HTML anchor tag with identical button styling:
          </p>

          <ComponentPreview>
            <Button
              href="#get-started"
              color="primary"
              endContent={<ArrowRight className="h-4 w-4" />}
            >
              Get started
            </Button>
          </ComponentPreview>

          <CodeBlock
            code={`import { Button } from "@/components/hudbird-ui/Button";
import { ArrowRight } from 'lucide-react'

function Example() {
  return (
    <Button href="/get-started" color="primary" endContent={<ArrowRight className="w-4 h-4" />}>
      Get started
    </Button>
  )
}`}
          />
        </div>
      </section>

      {/* Appendix */}
      <section id="appendix" className="scroll-mt-24 space-y-10">
        <h2 className="text-2xl font-medium tracking-[-0.3px] text-zinc-900 dark:text-white">
          Appendix
        </h2>

        {/* Solid color reference */}
        <div id="solid-color-reference" className="scroll-mt-24 space-y-6">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Solid Color Reference
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Adaptive color tokens automatically adjust contrast across light and dark modes:
          </p>

          {/* Adaptive color table */}
          <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-[#2E2F33] dark:bg-[#161618]">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-zinc-200 bg-zinc-50/40 text-xs font-semibold text-zinc-900 dark:border-[#2E2F33] dark:bg-[#202124] dark:text-zinc-200">
                <tr>
                  <th className="w-1/2 px-4 py-3">Color</th>
                  <th className="w-1/2 px-4 py-3">Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/70 dark:divide-[#2E2F33]">
                {adaptiveColors.map((item) => (
                  <tr key={item.name} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30">
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                      <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                        '{item.name}'
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Button color={item.color}>Submit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="pt-4 text-sm text-zinc-600 dark:text-zinc-400">
            Solid color tokens for consistent accents:
          </p>

          {/* 20 Solid Colors table */}
          <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/40">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-zinc-200 bg-zinc-50/40 text-xs font-semibold text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-200">
                <tr>
                  <th className="w-1/2 px-4 py-3">Color</th>
                  <th className="w-1/2 px-4 py-3">Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/70 dark:divide-zinc-800/70">
                {solidColors.map((item) => (
                  <tr key={item.name} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30">
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                      <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                        '{item.name}'
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Button color={item.color}>Submit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
