// apps/docs/src/pages/RadioGroupDoc.tsx
import radioGroupCode from "../../../../packages/core/src/components/RadioGroup/RadioGroup.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import React, { useState } from "react";
import { PageToolbar } from "../components/PageToolbar";
import { RadioGroup, Radio } from "@hudbird/ui";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";

export const radioGroupTocItems = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "basic-radio-group", title: "Basic Usage" },
      { id: "horizontal-orientation", title: "Horizontal Orientation" },
      { id: "radio-colors", title: "Color Options" },
      { id: "radio-sizes", title: "Sizes (sm, md, lg)" },
      { id: "with-descriptions", title: "With Descriptions" },
      { id: "radio-cards", title: "Custom Radio Card Tiles" },
      { id: "invalid-and-disabled", title: "Validation & Disabled States" },
    ],
  },
];

export default function RadioGroupDoc() {
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [selectedNotification, setSelectedNotification] = useState("all");
  const [selectedColor, setSelectedColor] = useState("indigo");

  const radioGroupApiRows: ApiPropRow[] = [
    {
      prop: "value",
      type: "string",
      defaultVal: "-",
      description: "Controlled selected value of the radio group.",
    },
    {
      prop: "defaultValue",
      type: "string",
      defaultVal: "''",
      description: "Default initial selected value when uncontrolled.",
    },
    {
      prop: "onValueChange",
      type: "(value: string) => void",
      defaultVal: "-",
      description: "Callback triggered with the new value upon selection.",
    },
    {
      prop: "label",
      type: "ReactNode",
      defaultVal: "-",
      description: "Group header title text rendered above radios.",
    },
    {
      prop: "description",
      type: "ReactNode",
      defaultVal: "-",
      description: "Secondary helper text explaining the group.",
    },
    {
      prop: "errorMessage",
      type: "ReactNode",
      defaultVal: "-",
      description: "Error message displayed when isInvalid is true.",
    },
    {
      prop: "orientation",
      type: '"vertical" | "horizontal"',
      defaultVal: '"vertical"',
      description: "Layout direction of the radio options.",
    },
    {
      prop: "color",
      type: '"default" | "primary" | "success" | "warning" | "danger"',
      defaultVal: '"primary"',
      description: "Active accent color applied to all child radios.",
    },
    {
      prop: "size",
      type: '"sm" | "md" | "lg"',
      defaultVal: '"md"',
      description: "Dimension scale for radio circles and text.",
    },
    {
      prop: "isInvalid",
      type: "boolean",
      defaultVal: "false",
      description: "Highlights the group and radios in an invalid error state.",
    },
    {
      prop: "isDisabled",
      type: "boolean",
      defaultVal: "false",
      description: "Disables interaction for all radios in the group.",
    },
  ];

  const radioApiRows: ApiPropRow[] = [
    {
      prop: "value",
      type: "string",
      defaultVal: "-",
      description: "The unique value associated with this radio option (required).",
    },
    {
      prop: "label",
      type: "ReactNode",
      defaultVal: "-",
      description: "Primary label text for this radio item.",
    },
    {
      prop: "description",
      type: "ReactNode",
      defaultVal: "-",
      description: "Optional secondary description rendered below the label.",
    },
    {
      prop: "variant",
      type: '"default" | "card"',
      defaultVal: '"default"',
      description: "Renders as standard inline radio or bordered selectable card tile.",
    },
    {
      prop: "isDisabled",
      type: "boolean",
      defaultVal: "false",
      description: "Disables interaction for this specific radio button.",
    },
  ];

  return (
    <div className="space-y-16 pb-24">
      {/* Title & Subtitle */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="w-full min-w-0 flex-1 pr-4">
          <div className="mb-3 flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
              RadioGroup
            </h1>
            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              New
            </span>
            <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              Component
            </span>
          </div>
          <p className="pr-8 text-base text-zinc-600 dark:text-zinc-400">
            Radio groups let users select a single choice from a set of mutually exclusive options
            with accessible keyboard arrow navigation and clear visual indicators.
          </p>
        </div>
        <PageToolbar />
      </div>

      {/* Main Preview */}
      <section className="space-y-4">
        <ComponentPreview>
          <div className="mx-auto w-full max-w-sm">
            <RadioGroup
              label="Select subscription tier"
              description="You can upgrade or downgrade anytime"
              value={selectedPlan}
              onValueChange={setSelectedPlan}
              color="primary"
            >
              <Radio
                value="starter"
                label="Starter Plan"
                description="$9/month — Up to 5 team members"
              />
              <Radio
                value="pro"
                label="Pro Unlimited"
                description="$29/month — Unlimited projects and priority support"
              />
              <Radio
                value="enterprise"
                label="Enterprise"
                description="Custom pricing — Dedicated server and SLA"
              />
            </RadioGroup>
          </div>
        </ComponentPreview>

        <CodeBlock
          code={`import { RadioGroup } from "@/components/hudbird-ui/RadioGroup";\nimport { Radio } from "@/components/hudbird-ui/Radio";
import { useState } from "react";

export default function Example() {
  const [plan, setPlan] = useState("pro");

  return (
    <RadioGroup
      label="Select subscription tier"
      description="You can upgrade or downgrade anytime"
      value={plan}
      onValueChange={setPlan}
      color="primary"
    >
      <Radio value="starter" label="Starter Plan" description="$9/month — Up to 5 members" />
      <Radio value="pro" label="Pro Unlimited" description="$29/month — Unlimited projects" />
      <Radio value="enterprise" label="Enterprise" description="Custom pricing" />
    </RadioGroup>
  );
}`}
        />
      </section>
      <div id="installation" className="scroll-mt-24 space-y-4">
        <InstallationTabs componentName="radio-group" manualCode={radioGroupCode} />
      </div>

      {/* Component API */}
      <section className="space-y-6" id="component-api">
        <div className="border-b border-zinc-200 pb-2 dark:border-zinc-800">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Component API</h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Properties for{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-xs dark:bg-zinc-800">
              RadioGroup
            </code>{" "}
            container and{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-xs dark:bg-zinc-800">
              Radio
            </code>{" "}
            items.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            RadioGroup Props
          </h3>
          <ApiTable rows={radioGroupApiRows} />
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Radio Item Props
          </h3>
          <ApiTable rows={radioApiRows} />
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
        <section className="space-y-4" id="basic-radio-group">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Basic Usage</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Standard vertical stack with label and simple choices.
          </p>
          <ComponentPreview>
            <div className="w-full max-w-sm">
              <RadioGroup label="Favorite coffee drink" defaultValue="latte">
                <Radio value="espresso" label="Espresso" />
                <Radio value="latte" label="Caffè Latte" />
                <Radio value="cappuccino" label="Cappuccino" />
                <Radio value="americano" label="Americano" />
              </RadioGroup>
            </div>
          </ComponentPreview>
          <CodeBlock
            code={`<RadioGroup label="Favorite coffee drink" defaultValue="latte">
  <Radio value="espresso" label="Espresso" />
  <Radio value="latte" label="Caffè Latte" />
  <Radio value="cappuccino" label="Cappuccino" />
  <Radio value="americano" label="Americano" />
</RadioGroup>`}
          />
        </section>

        {/* Horizontal Orientation */}
        <section className="space-y-4" id="horizontal-orientation">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            Horizontal Orientation
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Set{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">
              orientation="horizontal"
            </code>{" "}
            to arrange items in an inline row.
          </p>
          <ComponentPreview>
            <div className="w-full max-w-md">
              <RadioGroup
                orientation="horizontal"
                label="Frequency of reports"
                defaultValue="weekly"
              >
                <Radio value="daily" label="Daily" />
                <Radio value="weekly" label="Weekly" />
                <Radio value="monthly" label="Monthly" />
                <Radio value="quarterly" label="Quarterly" />
              </RadioGroup>
            </div>
          </ComponentPreview>
          <CodeBlock
            code={`<RadioGroup orientation="horizontal" label="Frequency of reports" defaultValue="weekly">
  <Radio value="daily" label="Daily" />
  <Radio value="weekly" label="Weekly" />
  <Radio value="monthly" label="Monthly" />
</RadioGroup>`}
          />
        </section>

        {/* Colors */}
        <section className="space-y-4" id="radio-colors">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            Color Options
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Choose from 5 dynamic semantic colors for the selected active circle and dot.
          </p>
          <ComponentPreview>
            <div className="grid w-full max-w-md grid-cols-2 gap-6 sm:grid-cols-3">
              <RadioGroup color="primary" defaultValue="opt">
                <Radio value="opt" label="Primary (Indigo)" />
              </RadioGroup>
              <RadioGroup color="success" defaultValue="opt">
                <Radio value="opt" label="Success (Emerald)" />
              </RadioGroup>
              <RadioGroup color="warning" defaultValue="opt">
                <Radio value="opt" label="Warning (Amber)" />
              </RadioGroup>
              <RadioGroup color="danger" defaultValue="opt">
                <Radio value="opt" label="Danger (Rose)" />
              </RadioGroup>
              <RadioGroup color="default" defaultValue="opt">
                <Radio value="opt" label="Default (Monochrome)" />
              </RadioGroup>
            </div>
          </ComponentPreview>
          <CodeBlock
            code={`<RadioGroup color="primary" defaultValue="opt">
  <Radio value="opt" label="Primary" />
</RadioGroup>
<RadioGroup color="success" defaultValue="opt">
  <Radio value="opt" label="Success" />
</RadioGroup>`}
          />
        </section>

        {/* Sizes */}
        <section className="space-y-4" id="radio-sizes">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            Sizes (sm, md, lg)
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Radios are available in three proportions:{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">sm</code>,{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">md</code>,
            and <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">lg</code>
            .
          </p>
          <ComponentPreview>
            <div className="w-full max-w-md space-y-4">
              <RadioGroup size="sm" defaultValue="sm">
                <Radio value="sm" label="Small size (sm)" />
              </RadioGroup>
              <RadioGroup size="md" defaultValue="md">
                <Radio value="md" label="Medium default size (md)" />
              </RadioGroup>
              <RadioGroup size="lg" defaultValue="lg">
                <Radio value="lg" label="Large size (lg)" />
              </RadioGroup>
            </div>
          </ComponentPreview>
          <CodeBlock
            code={`<RadioGroup size="sm" defaultValue="sm">
  <Radio value="sm" label="Small size (sm)" />
</RadioGroup>
<RadioGroup size="md" defaultValue="md">
  <Radio value="md" label="Medium size (md)" />
</RadioGroup>
<RadioGroup size="lg" defaultValue="lg">
  <Radio value="lg" label="Large size (lg)" />
</RadioGroup>`}
          />
        </section>

        {/* With Descriptions */}
        <section className="space-y-4" id="with-descriptions">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            With Descriptions
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Include supportive contextual text under each option.
          </p>
          <ComponentPreview>
            <div className="w-full max-w-md">
              <RadioGroup
                label="Notification preferences"
                value={selectedNotification}
                onValueChange={setSelectedNotification}
              >
                <Radio
                  value="all"
                  label="All notifications"
                  description="Receive immediate alerts for mentions, comments, and project milestones."
                />
                <Radio
                  value="mentions"
                  label="Direct mentions only"
                  description="Only alert when team members specifically tag @your-username."
                />
                <Radio
                  value="none"
                  label="Muted"
                  description="Do not send notifications; browse at your own schedule."
                />
              </RadioGroup>
            </div>
          </ComponentPreview>
          <CodeBlock
            code={`<RadioGroup label="Notification preferences" defaultValue="all">
  <Radio
    value="all"
    label="All notifications"
    description="Receive immediate alerts for all activities."
  />
  <Radio
    value="mentions"
    label="Direct mentions only"
    description="Only alert when specifically tagged."
  />
</RadioGroup>`}
          />
        </section>

        {/* Custom Card Tiles */}
        <section className="space-y-4" id="radio-cards">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            Custom Radio Card Tiles
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Render rich bordered card tiles using{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">
              variant="card"
            </code>{" "}
            for checkout forms and pricing options.
          </p>
          <ComponentPreview>
            <div className="w-full max-w-md">
              <RadioGroup defaultValue="express">
                <Radio
                  variant="card"
                  value="standard"
                  label="Standard Shipping"
                  description="Estimated delivery in 4-6 business days · Free"
                />
                <Radio
                  variant="card"
                  value="express"
                  label="Express Delivery"
                  description="Estimated delivery in 1-2 business days · $12.00"
                />
                <Radio
                  variant="card"
                  value="overnight"
                  label="Overnight Priority"
                  description="Guaranteed next business morning delivery · $25.00"
                />
              </RadioGroup>
            </div>
          </ComponentPreview>
          <CodeBlock
            code={`<RadioGroup defaultValue="express">
  <Radio
    variant="card"
    value="standard"
    label="Standard Shipping"
    description="Estimated delivery in 4-6 business days · Free"
  />
  <Radio
    variant="card"
    value="express"
    label="Express Delivery"
    description="Estimated delivery in 1-2 business days · $12.00"
  />
</RadioGroup>`}
          />
        </section>

        {/* Validation & Disabled */}
        <section className="space-y-4" id="invalid-and-disabled">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            Validation & Disabled States
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Handle form validation feedback with{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">
              isInvalid
            </code>{" "}
            and error messaging, or disable items with{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">
              isDisabled
            </code>
            .
          </p>
          <ComponentPreview>
            <div className="w-full max-w-md space-y-6">
              <RadioGroup
                label="Terms Agreement"
                isInvalid
                errorMessage="Please select an option to proceed"
                isRequired
              >
                <Radio value="yes" label="I agree to the terms and privacy policy" />
                <Radio value="no" label="I decline" />
              </RadioGroup>

              <div className="border-t border-zinc-200 pt-2 dark:border-zinc-800">
                <RadioGroup label="Disabled Group" isDisabled defaultValue="1">
                  <Radio value="1" label="Disabled Option 1" />
                  <Radio value="2" label="Disabled Option 2" />
                </RadioGroup>
              </div>
            </div>
          </ComponentPreview>
          <CodeBlock
            code={`<RadioGroup
  label="Terms Agreement"
  isInvalid
  errorMessage="Please select an option to proceed"
  isRequired
>
  <Radio value="yes" label="I agree" />
  <Radio value="no" label="I decline" />
</RadioGroup>`}
          />
        </section>
      </div>
    </div>
  );
}
