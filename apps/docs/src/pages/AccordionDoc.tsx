// apps/docs/src/pages/AccordionDoc.tsx
import accordionCode from "../../../../packages/core/src/components/Accordion/Accordion.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import React, { useState } from "react";
import { PageToolbar } from "../components/PageToolbar";
import { Accordion, AccordionItem, Button, Badge } from "@hudbird/ui";
import { Shield, Zap, Sparkles, HelpCircle, FileText, ChevronRight, Lock } from "lucide-react";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";

export const accordionTocItems = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "basic-accordion", title: "Basic Usage" },
      { id: "accordion-variants", title: "Variants (Light, Bordered, Shadow, Splitted)" },
      { id: "multiple-selection", title: "Multiple Selection Mode" },
      { id: "subtitles-and-icons", title: "With Subtitles & Start Content" },
      { id: "compact-mode", title: "Compact Mode" },
      { id: "custom-indicator", title: "Custom Indicators" },
      { id: "disabled-items", title: "Disabled States" },
    ],
  },
];

export default function AccordionDoc() {
  const [selectedKeys, setSelectedKeys] = useState<string[]>(["item-1"]);

  const accordionApiRows: ApiPropRow[] = [
    {
      prop: "variant",
      type: '"light" | "shadow" | "bordered" | "splitted"',
      defaultVal: '"light"',
      description: "Visual surface style of the accordion container and cards.",
    },
    {
      prop: "selectionMode",
      type: '"single" | "multiple"',
      defaultVal: '"single"',
      description: "Whether only one panel or multiple panels can be expanded simultaneously.",
    },
    {
      prop: "selectedKeys",
      type: "string[] | Set<string>",
      defaultVal: "-",
      description: "Controlled array of open item keys.",
    },
    {
      prop: "defaultSelectedKeys",
      type: "string[] | Set<string>",
      defaultVal: "[]",
      description: "Initial keys expanded by default when uncontrolled.",
    },
    {
      prop: "onSelectionChange",
      type: "(keys: string[]) => void",
      defaultVal: "-",
      description: "Callback invoked when expanded accordion items change.",
    },
    {
      prop: "isCompact",
      type: "boolean",
      defaultVal: "false",
      description: "Reduces header padding and spacing for high-density layouts.",
    },
    {
      prop: "showDivider",
      type: "boolean",
      defaultVal: "true",
      description: "Renders border dividers between adjacent items.",
    },
    {
      prop: "isDisabled",
      type: "boolean",
      defaultVal: "false",
      description: "Disables interaction across the entire accordion.",
    },
  ];

  const accordionItemApiRows: ApiPropRow[] = [
    {
      prop: "itemKey",
      type: "string",
      defaultVal: "auto generated",
      description: "Unique identifier for this item in selection state (can also use 'value').",
    },
    {
      prop: "title",
      type: "ReactNode",
      defaultVal: "-",
      description: "Main header title text (required).",
    },
    {
      prop: "subtitle",
      type: "ReactNode",
      defaultVal: "-",
      description: "Secondary supportive subtitle text below the title.",
    },
    {
      prop: "startContent",
      type: "ReactNode",
      defaultVal: "-",
      description: "Leading icon or status badge placed before the title.",
    },
    {
      prop: "indicator",
      type: "ReactNode | ((props: { isOpen: boolean }) => ReactNode)",
      defaultVal: "ChevronDown icon",
      description: "Custom expand indicator icon or render function.",
    },
    {
      prop: "hideIndicator",
      type: "boolean",
      defaultVal: "false",
      description: "Hides the trailing chevron indicator.",
    },
    {
      prop: "isDisabled",
      type: "boolean",
      defaultVal: "false",
      description: "Disables expand toggle for this specific item.",
    },
  ];

  return (
    <div className="space-y-16 pb-24">
      {/* Title & Subtitle */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="w-full min-w-0 flex-1 pr-4">
          <div className="mb-3 flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
              Accordion
            </h1>
            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              New
            </span>
            <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              Component
            </span>
          </div>
          <p className="pr-32 text-base text-zinc-600 sm:pr-40 dark:text-zinc-400">
            Accordions allow users to toggle the display of complex sections of content in an
            organized, collapsible view with smooth grid transitions and WAI-ARIA disclosure
            accessibility.
          </p>
        </div>
        <PageToolbar />
      </div>

      {/* Main Preview */}
      <section className="space-y-4">
        <ComponentPreview>
          <div className="mx-auto w-full max-w-lg">
            <Accordion variant="shadow" defaultSelectedKeys={["1"]}>
              <AccordionItem
                itemKey="1"
                startContent={<Zap className="h-4 w-4 text-indigo-500" />}
                title="What makes our Design System unique?"
                subtitle="Engineered with Tailwind CSS and CVA"
              >
                Our component library is compiled directly from source without bloated runtimes,
                leveraging pure Tailwind utilities, Class Variance Authority for deterministic
                styling, and seamless dark mode tokens.
              </AccordionItem>
              <AccordionItem
                itemKey="2"
                startContent={<Shield className="h-4 w-4 text-emerald-500" />}
                title="Is it accessible out-of-the-box?"
                subtitle="WAI-ARIA compliant keyboard navigation"
              >
                Yes! Every interactive element includes explicit focus rings, keyboard arrow
                controls, ARIA attributes (e.g. aria-expanded, aria-controls), and semantic button
                elements.
              </AccordionItem>
              <AccordionItem
                itemKey="3"
                startContent={<Sparkles className="h-4 w-4 text-amber-500" />}
                title="How does SSR hydration work?"
                subtitle="Zero layout shifts with CSS transitions"
              >
                Accordions render collapsible panel heights smoothly using modern CSS grid
                transitions without requiring JavaScript window resize observers or DOM mutations.
              </AccordionItem>
            </Accordion>
          </div>
        </ComponentPreview>

        <CodeBlock
          code={`import { Accordion, AccordionItem } from "@hudbird/ui";
import { Zap, Shield, Sparkles } from "lucide-react";

export default function Example() {
  return (
    <Accordion variant="shadow" defaultSelectedKeys={["1"]}>
      <AccordionItem
        itemKey="1"
        startContent={<Zap className="w-4 h-4 text-indigo-500" />}
        title="What makes our Design System unique?"
        subtitle="Engineered with Tailwind CSS and CVA"
      >
        Our component library is compiled directly from source...
      </AccordionItem>
      <AccordionItem
        itemKey="2"
        startContent={<Shield className="w-4 h-4 text-emerald-500" />}
        title="Is it accessible out-of-the-box?"
      >
        Yes! Every interactive element includes explicit focus rings...
      </AccordionItem>
    </Accordion>
  );
}`}
        />
      </section>
      <div id="installation" className="scroll-mt-24 space-y-4">
        <InstallationTabs componentName="accordion" manualCode={accordionCode} />
      </div>

      {/* Component API */}
      <section className="space-y-6" id="component-api">
        <div className="border-b border-zinc-200 pb-2 dark:border-zinc-800">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Component API</h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Properties for{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-xs dark:bg-zinc-800">
              Accordion
            </code>{" "}
            root container and{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-xs dark:bg-zinc-800">
              AccordionItem
            </code>{" "}
            disclosures.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Accordion Props
          </h3>
          <ApiTable rows={accordionApiRows} />
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            AccordionItem Props
          </h3>
          <ApiTable rows={accordionItemApiRows} />
        </div>
      </section>

      {/* Examples & Variants */}
      <div className="space-y-12" id="examples">
        <div className="border-b border-zinc-200 pb-2 dark:border-zinc-800">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Examples & Variants
          </h2>
        </div>

        {/* Basic Usage */}
        <section className="space-y-4" id="basic-accordion">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Basic Usage</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Standard single-selection accordion with clean underline dividers.
          </p>
          <ComponentPreview>
            <div className="w-full max-w-lg">
              <Accordion defaultSelectedKeys={["1"]}>
                <AccordionItem itemKey="1" title="Accordion Item 1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.
                </AccordionItem>
                <AccordionItem itemKey="2" title="Accordion Item 2">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                  fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
                </AccordionItem>
                <AccordionItem itemKey="3" title="Accordion Item 3">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                  doloremque laudantium, totam rem aperiam.
                </AccordionItem>
              </Accordion>
            </div>
          </ComponentPreview>
          <CodeBlock
            code={`<Accordion defaultSelectedKeys={["1"]}>
  <AccordionItem itemKey="1" title="Accordion Item 1">Content 1</AccordionItem>
  <AccordionItem itemKey="2" title="Accordion Item 2">Content 2</AccordionItem>
  <AccordionItem itemKey="3" title="Accordion Item 3">Content 3</AccordionItem>
</Accordion>`}
          />
        </section>

        {/* Variants */}
        <section className="space-y-4" id="accordion-variants">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            Variants (Light, Bordered, Shadow, Splitted)
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Four structural styling variants tailored for any surface density or card container.
          </p>
          <ComponentPreview>
            <div className="w-full max-w-lg space-y-8">
              <div>
                <span className="mb-2 block text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                  Bordered
                </span>
                <Accordion variant="bordered" defaultSelectedKeys={["b1"]}>
                  <AccordionItem itemKey="b1" title="Bordered Accordion Item 1">
                    Enclosed within a single smooth rounded card with border dividers.
                  </AccordionItem>
                  <AccordionItem itemKey="b2" title="Bordered Accordion Item 2">
                    Clean modern border lines that blend gracefully in dark mode.
                  </AccordionItem>
                </Accordion>
              </div>

              <div>
                <span className="mb-2 block text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                  Splitted
                </span>
                <Accordion variant="splitted" defaultSelectedKeys={["s1"]}>
                  <AccordionItem itemKey="s1" title="Splitted Card 1">
                    Separated independent floating card tiles with custom margins.
                  </AccordionItem>
                  <AccordionItem itemKey="s2" title="Splitted Card 2">
                    Ideal for checkout payment methods and settings categories.
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </ComponentPreview>
          <CodeBlock
            code={`<Accordion variant="bordered">...</Accordion>
<Accordion variant="splitted">...</Accordion>
<Accordion variant="shadow">...</Accordion>
<Accordion variant="light">...</Accordion>`}
          />
        </section>

        {/* Multiple Selection Mode */}
        <section className="space-y-4" id="multiple-selection">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            Multiple Selection Mode
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Enable{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">
              selectionMode="multiple"
            </code>{" "}
            to allow multiple accordion panels to remain expanded at the same time.
          </p>
          <ComponentPreview>
            <div className="w-full max-w-lg">
              <Accordion
                selectionMode="multiple"
                variant="bordered"
                defaultSelectedKeys={["m1", "m2"]}
              >
                <AccordionItem itemKey="m1" title="Section 1: General Information">
                  Both this section and section 2 can be opened together without closing each other.
                </AccordionItem>
                <AccordionItem itemKey="m2" title="Section 2: Privacy Settings">
                  Users can view and compare details across multiple expanded sections.
                </AccordionItem>
                <AccordionItem itemKey="m3" title="Section 3: Audit Logs">
                  Clicking will toggle this item independently.
                </AccordionItem>
              </Accordion>
            </div>
          </ComponentPreview>
          <CodeBlock
            code={`<Accordion selectionMode="multiple" defaultSelectedKeys={["m1", "m2"]}>
  <AccordionItem itemKey="m1" title="Section 1">Content 1</AccordionItem>
  <AccordionItem itemKey="m2" title="Section 2">Content 2</AccordionItem>
</Accordion>`}
          />
        </section>

        {/* With Subtitles & Start Content */}
        <section className="space-y-4" id="subtitles-and-icons">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            With Subtitles & Start Content
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Enhance accordion headers with informative icons and secondary subtitles.
          </p>
          <ComponentPreview>
            <div className="w-full max-w-lg">
              <Accordion variant="bordered" defaultSelectedKeys={["auth"]}>
                <AccordionItem
                  itemKey="auth"
                  startContent={<Lock className="h-4 w-4 text-zinc-500" />}
                  title="Two-Factor Authentication"
                  subtitle="Secure your account with authenticator apps"
                >
                  Configure Time-based One-Time Passwords (TOTP) using Google Authenticator or
                  1Password.
                </AccordionItem>
                <AccordionItem
                  itemKey="docs"
                  startContent={<FileText className="h-4 w-4 text-zinc-500" />}
                  title="Legal Documentation"
                  subtitle="Review updated master service agreement and privacy policy"
                >
                  Last revised on September 2026. All rights reserved.
                </AccordionItem>
              </Accordion>
            </div>
          </ComponentPreview>
          <CodeBlock
            code={`<Accordion variant="bordered">
  <AccordionItem
    startContent={<Lock className="w-4 h-4" />}
    title="Two-Factor Authentication"
    subtitle="Secure your account with authenticator apps"
  >
    Details...
  </AccordionItem>
</Accordion>`}
          />
        </section>

        {/* Compact Mode */}
        <section className="space-y-4" id="compact-mode">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Compact Mode</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Use{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">
              isCompact
            </code>{" "}
            for dense spaces like sidebars, drawers, or data tables.
          </p>
          <ComponentPreview>
            <div className="w-full max-w-md">
              <Accordion isCompact variant="bordered" defaultSelectedKeys={["c1"]}>
                <AccordionItem itemKey="c1" title="Compact Item 1">
                  Tighter vertical padding for space-constrained UI panels.
                </AccordionItem>
                <AccordionItem itemKey="c2" title="Compact Item 2">
                  Maintains high contrast readability and focus rings.
                </AccordionItem>
              </Accordion>
            </div>
          </ComponentPreview>
          <CodeBlock
            code={`<Accordion isCompact variant="bordered">
  <AccordionItem title="Compact Item 1">Tighter padding</AccordionItem>
  <AccordionItem title="Compact Item 2">High density</AccordionItem>
</Accordion>`}
          />
        </section>

        {/* Custom Indicator */}
        <section className="space-y-4" id="custom-indicator">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            Custom Indicators
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Replace the standard chevron with a custom icon or render function.
          </p>
          <ComponentPreview>
            <div className="w-full max-w-lg">
              <Accordion variant="bordered">
                <AccordionItem
                  itemKey="custom-1"
                  title="Item with custom plus/minus indicator"
                  indicator={({ isOpen }) => (
                    <span className="text-base font-bold text-indigo-600 dark:text-indigo-400">
                      {isOpen ? "−" : "+"}
                    </span>
                  )}
                >
                  Render custom interactive indicator markers depending on open status.
                </AccordionItem>
                <AccordionItem
                  itemKey="custom-2"
                  title="Item with horizontal arrow"
                  indicator={<ChevronRight className="h-4 w-4" />}
                >
                  Indicator rotates automatically when opened.
                </AccordionItem>
              </Accordion>
            </div>
          </ComponentPreview>
          <CodeBlock
            code={`<AccordionItem
  title="Custom indicator"
  indicator={({ isOpen }) => (
    <span>{isOpen ? "−" : "+"}</span>
  )}
>
  Content
</AccordionItem>`}
          />
        </section>

        {/* Disabled Items */}
        <section className="space-y-4" id="disabled-items">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            Disabled States
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Disable specific accordion items using{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">
              isDisabled
            </code>
            .
          </p>
          <ComponentPreview>
            <div className="w-full max-w-lg">
              <Accordion variant="bordered" defaultSelectedKeys={["d1"]}>
                <AccordionItem itemKey="d1" title="Active Accordion Item">
                  This item can be toggled normally.
                </AccordionItem>
                <AccordionItem
                  itemKey="d2"
                  isDisabled
                  title="Disabled Premium Feature"
                  subtitle="Upgrade required to unlock this section"
                >
                  This content is locked and cannot be expanded.
                </AccordionItem>
              </Accordion>
            </div>
          </ComponentPreview>
          <CodeBlock
            code={`<Accordion variant="bordered">
  <AccordionItem title="Active Item">Content</AccordionItem>
  <AccordionItem isDisabled title="Disabled Item">Locked content</AccordionItem>
</Accordion>`}
          />
        </section>
      </div>
    </div>
  );
}
