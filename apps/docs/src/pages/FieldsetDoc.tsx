// apps/docs/src/pages/FieldsetDoc.tsx
import fieldsetCode from "../../../../packages/core/src/components/Fieldset/Fieldset.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import React, { useState } from "react";
import { PageToolbar } from "../components/PageToolbar";
import {
  Fieldset,
  FieldsetHeader,
  FieldsetContent,
  FieldsetRow,
  FieldsetLegend,
  FieldsetHelperText,
  FieldsetErrorText,
  Input,
  Textarea,
  Button,
  Checkbox,
  Divider,
} from "@hudbird/ui";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";

export const fieldsetTocItems = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "left-labels-fieldset", title: "Left-Aligned Labels (Horizontal Style)" },
      { id: "basic-fieldset", title: "Basic Stacked Fieldset" },
      { id: "side-by-side-layout", title: "Side-by-Side (Split Section Style)" },
      { id: "bordered-and-card", title: "Bordered & Card Variants" },
      { id: "invalid-and-disabled", title: "Invalid & Disabled Fieldset States" },
    ],
  },
];

export default function FieldsetDoc() {
  const [isFormInvalid, setIsFormInvalid] = useState(true);
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  const apiRows: ApiPropRow[] = [
    {
      prop: "variant",
      defaultVal: "'flat'",
      description: (
        <span>
          Visual container styling:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'flat'
          </code>{" "}
          (frameless grouping),{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'bordered'
          </code>{" "}
          (subtle refined frame), or{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'card'
          </code>{" "}
          (solid elevated card with subtle tinted backdrop).
        </span>
      ),
    },
    {
      prop: "layout",
      defaultVal: "'stacked'",
      description: (
        <span>
          Layout structure:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'stacked'
          </code>{" "}
          (legend above form inputs),{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'side-by-side'
          </code>{" "}
          (split 2-column section layout with left header), or{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'horizontal-labels'
          </code>{" "}
          (left-aligned input labels via{" "}
          <code className="font-mono text-[11px]">&lt;FieldsetRow&gt;</code>).
        </span>
      ),
    },
    {
      prop: "disabled",
      defaultVal: "false",
      description:
        "When true, disables and applies macro opacity to the entire group of input controls.",
    },
    {
      prop: "isInvalid",
      defaultVal: "false",
      description:
        "When true, highlights invalid container styling and renders child <FieldsetErrorText> alerts.",
    },
    {
      prop: "children",
      defaultVal: "-",
      description:
        "Composable components: <FieldsetHeader>, <FieldsetContent>, <FieldsetRow>, <FieldsetLegend>, <FieldsetHelperText>, <FieldsetErrorText>, and nested form inputs.",
    },
  ];

  return (
    <div className="space-y-16 pb-24">
      {/* Title & Introduction */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="w-full min-w-0 flex-1 pr-4">
          <div className="mb-3 flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
              Fieldset
            </h1>
            <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              Component
            </span>
          </div>
          <p className="pr-32 text-base text-zinc-600 sm:pr-40 dark:text-zinc-400">
            Structural container used to group related form controls, provide legends, render
            descriptive helper guidance, support left-aligned labels or split section layouts, and
            broadcast collective error states.
          </p>
        </div>
        <PageToolbar />
      </div>

      {/* Hero Preview & Code (Horizontal Left Labels Showcase) */}
      <section className="space-y-4">
        <ComponentPreview>
          <div className="w-full max-w-xl py-4">
            <Fieldset layout="horizontal-labels">
              <FieldsetHeader className="mb-2">
                <FieldsetLegend className="text-lg">Shipping details</FieldsetLegend>
                <FieldsetHelperText>
                  Without this your odds of getting your order are low.
                </FieldsetHelperText>
              </FieldsetHeader>

              <FieldsetContent className="space-y-3">
                <FieldsetRow label="Full name">
                  <Input placeholder="" />
                </FieldsetRow>

                <FieldsetRow label="Street address">
                  <Input placeholder="" />
                </FieldsetRow>

                <FieldsetRow label="Country">
                  <div className="relative">
                    <select
                      defaultValue="Canada"
                      className="h-10 w-full cursor-pointer appearance-none rounded-xl border-none bg-zinc-100 px-3.5 pr-9 text-sm text-zinc-100 transition-colors outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-800"
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Indonesia">Indonesia</option>
                      <option value="Australia">Australia</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                        />
                      </svg>
                    </div>
                  </div>
                </FieldsetRow>

                <FieldsetRow label="Delivery notes">
                  <Textarea rows={3} placeholder="" />
                </FieldsetRow>
              </FieldsetContent>
            </Fieldset>
          </div>
        </ComponentPreview>

        <CodeBlock
          code={`import {
  Fieldset,
  FieldsetHeader,
  FieldsetContent,
  FieldsetRow,
  FieldsetLegend,
  FieldsetHelperText,
  Input,
} from '@hudbird/ui'

function ShippingDetailsExample() {
  return (
    <Fieldset layout="horizontal-labels">
      <FieldsetHeader className="mb-2">
        <FieldsetLegend className="text-lg">Shipping details</FieldsetLegend>
        <FieldsetHelperText>
          Without this your odds of getting your order are low.
        </FieldsetHelperText>
      </FieldsetHeader>

      <FieldsetContent className="space-y-3">
        <FieldsetRow label="Full name">
          <Input placeholder="" />
        </FieldsetRow>

        <FieldsetRow label="Street address">
          <Input placeholder="" />
        </FieldsetRow>

        <FieldsetRow label="Country">
          <select className="...">
            <option>Canada</option>
            <option>United States</option>
          </select>
        </FieldsetRow>

        <FieldsetRow label="Delivery notes">
          <textarea className="..." rows={3} />
        </FieldsetRow>
      </FieldsetContent>
    </Fieldset>
  )
}`}
        />
      </section>
      <div id="installation" className="scroll-mt-24 space-y-4">
        <InstallationTabs componentName="fieldset" manualCode={fieldsetCode} />
      </div>

      {/* Component API */}
      <section id="component-api" className="scroll-mt-24 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Component API
        </h2>
        <ApiTable
          note={
            <span>
              Composable using{" "}
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                &lt;Fieldset&gt;
              </strong>
              ,{" "}
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                &lt;FieldsetHeader&gt;
              </strong>
              ,{" "}
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                &lt;FieldsetContent&gt;
              </strong>
              ,{" "}
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                &lt;FieldsetRow&gt;
              </strong>
              ,{" "}
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                &lt;FieldsetLegend&gt;
              </strong>
              ,{" "}
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                &lt;FieldsetHelperText&gt;
              </strong>
              , and{" "}
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                &lt;FieldsetErrorText&gt;
              </strong>
              .
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

        {/* 1. Left-Aligned Labels (Horizontal Style) */}
        <div id="left-labels-fieldset" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Left-Aligned Labels (Horizontal Style)
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Place field labels horizontally on the left side of the input controls using{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              &lt;FieldsetRow label="..."&gt;
            </code>{" "}
            for clean, high-density form layouts:
          </p>

          <ComponentPreview>
            <div className="w-full max-w-xl py-2">
              <Fieldset layout="horizontal-labels">
                <FieldsetHeader className="mb-2">
                  <FieldsetLegend className="text-lg">Shipping details</FieldsetLegend>
                  <FieldsetHelperText>
                    Without this your odds of getting your order are low.
                  </FieldsetHelperText>
                </FieldsetHeader>

                <FieldsetContent className="space-y-3">
                  <FieldsetRow label="Full name">
                    <Input placeholder="" />
                  </FieldsetRow>

                  <FieldsetRow label="Street address">
                    <Input placeholder="" />
                  </FieldsetRow>

                  <FieldsetRow label="Country">
                    <div className="relative">
                      <select
                        defaultValue="Canada"
                        className="h-10 w-full cursor-pointer appearance-none rounded-xl border border-zinc-200 bg-zinc-100 px-3.5 pr-9 text-sm text-zinc-900 transition-colors outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Indonesia">Indonesia</option>
                        <option value="Australia">Australia</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
                        <svg
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                          />
                        </svg>
                      </div>
                    </div>
                  </FieldsetRow>

                  <FieldsetRow label="Delivery notes">
                    <textarea
                      rows={3}
                      placeholder=""
                      className="min-h-[80px] w-full resize-y rounded-xl border border-zinc-200 bg-zinc-100 p-3 text-sm text-zinc-900 transition-colors outline-none placeholder:text-zinc-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
                    />
                  </FieldsetRow>
                </FieldsetContent>
              </Fieldset>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import {
  Fieldset,
  FieldsetHeader,
  FieldsetContent,
  FieldsetRow,
  FieldsetLegend,
  FieldsetHelperText,
  Input,
} from '@hudbird/ui'

function Example() {
  return (
    <Fieldset layout="horizontal-labels">
      <FieldsetHeader>
        <FieldsetLegend>Shipping details</FieldsetLegend>
        <FieldsetHelperText>
          Without this your odds of getting your order are low.
        </FieldsetHelperText>
      </FieldsetHeader>

      <FieldsetContent className="space-y-3">
        <FieldsetRow label="Full name">
          <Input />
        </FieldsetRow>
        <FieldsetRow label="Street address">
          <Input />
        </FieldsetRow>
        <FieldsetRow label="Country">
          <select className="...">
            <option>Canada</option>
          </select>
        </FieldsetRow>
        <FieldsetRow label="Delivery notes">
          <textarea className="..." rows={3} />
        </FieldsetRow>
      </FieldsetContent>
    </Fieldset>
  )
}`}
          />
        </div>

        {/* 2. Basic Stacked Fieldset */}
        <div id="basic-fieldset" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Basic Stacked Fieldset
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Clean frameless section grouping using{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              variant="flat"
            </code>{" "}
            with proper vertical spacing:
          </p>

          <ComponentPreview>
            <div className="w-full max-w-lg py-2">
              <Fieldset variant="flat">
                <FieldsetHeader>
                  <FieldsetLegend>Contact Details</FieldsetLegend>
                  <FieldsetHelperText>
                    Provide an address where invoices and payment receipts should be delivered.
                  </FieldsetHelperText>
                </FieldsetHeader>

                <FieldsetContent>
                  <Input label="Full Name" placeholder="Jane Doe" />
                  <Input label="Billing Email" type="email" placeholder="billing@acme.org" />
                </FieldsetContent>
              </Fieldset>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import {
  Fieldset,
  FieldsetHeader,
  FieldsetContent,
  FieldsetLegend,
  FieldsetHelperText,
  Input,
} from '@hudbird/ui'

function Example() {
  return (
    <Fieldset variant="flat">
      <FieldsetHeader>
        <FieldsetLegend>Contact Details</FieldsetLegend>
        <FieldsetHelperText>
          Provide an address where invoices and payment receipts should be delivered.
        </FieldsetHelperText>
      </FieldsetHeader>

      <FieldsetContent>
        <Input label="Full Name" placeholder="Jane Doe" />
        <Input label="Billing Email" type="email" placeholder="billing@acme.org" />
      </FieldsetContent>
    </Fieldset>
  )
}`}
          />
        </div>

        {/* 3. Side-by-Side (Split Section Style) */}
        <div id="side-by-side-layout" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Side-by-Side (Split Section Style)
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Render the legend and helper descriptions on the left column using{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              layout="side-by-side"
            </code>
            , ideal for modern settings dashboards and multi-section account pages:
          </p>

          <ComponentPreview>
            <div className="w-full max-w-3xl space-y-8 py-4">
              <Fieldset layout="side-by-side">
                <FieldsetHeader>
                  <FieldsetLegend>Company & Organization</FieldsetLegend>
                  <FieldsetHelperText>
                    This information appears on team invoices, tax summaries, and customer-facing
                    reports.
                  </FieldsetHelperText>
                </FieldsetHeader>

                <FieldsetContent>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Input label="Organization Name" defaultValue="Acme Global Inc." />
                    <Input label="Tax ID / VAT" placeholder="US987654321" />
                  </div>
                  <Input label="Corporate Domain" placeholder="acme.com" />
                </FieldsetContent>
              </Fieldset>

              <Divider />

              <Fieldset layout="side-by-side">
                <FieldsetHeader>
                  <FieldsetLegend>Billing Preferences</FieldsetLegend>
                  <FieldsetHelperText>
                    Configure notification recipients and automatic recurring top-ups for bandwidth
                    credits.
                  </FieldsetHelperText>
                </FieldsetHeader>

                <FieldsetContent>
                  <Input label="Invoice Notification Email" placeholder="finance@acme.com" />
                  {/* Fixed Spacing Between Checkboxes */}
                  <div className="flex flex-col gap-3 pt-2">
                    <Checkbox label="Auto-renew active subscription cycle" defaultChecked />
                    <Checkbox
                      label="Send carbon copy of receipt to accounting team"
                      defaultChecked
                    />
                  </div>
                </FieldsetContent>
              </Fieldset>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import {
  Fieldset,
  FieldsetHeader,
  FieldsetContent,
  FieldsetLegend,
  FieldsetHelperText,
  Input,
  Checkbox,
  Divider,
} from '@hudbird/ui'

function SideBySideExample() {
  return (
    <div className="space-y-8">
      <Fieldset layout="side-by-side">
        <FieldsetHeader>
          <FieldsetLegend>Company & Organization</FieldsetLegend>
          <FieldsetHelperText>
            This information appears on team invoices, tax summaries, and customer-facing reports.
          </FieldsetHelperText>
        </FieldsetHeader>

        <FieldsetContent>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Organization Name" defaultValue="Acme Global Inc." />
            <Input label="Tax ID / VAT" placeholder="US987654321" />
          </div>
          <Input label="Corporate Domain" placeholder="acme.com" />
        </FieldsetContent>
      </Fieldset>

      <Divider />

      <Fieldset layout="side-by-side">
        <FieldsetHeader>
          <FieldsetLegend>Billing Preferences</FieldsetLegend>
          <FieldsetHelperText>
            Configure notification recipients and automatic recurring top-ups.
          </FieldsetHelperText>
        </FieldsetHeader>

        <FieldsetContent>
          <Input label="Invoice Notification Email" placeholder="finance@acme.com" />
          <div className="flex flex-col gap-3 pt-2">
            <Checkbox label="Auto-renew active subscription cycle" defaultChecked />
            <Checkbox label="Send carbon copy of receipt to accounting team" defaultChecked />
          </div>
        </FieldsetContent>
      </Fieldset>
    </div>
  )
}`}
          />
        </div>

        {/* 4. Bordered & Card Variants */}
        <div id="bordered-and-card" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Bordered & Card Variants
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Encase related controls inside an aesthetic frame using{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              variant="bordered"
            </code>{" "}
            or{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              variant="card"
            </code>
            :
          </p>

          <ComponentPreview>
            <div className="w-full max-w-lg space-y-6 py-2">
              {/* Bordered */}
              <Fieldset variant="bordered">
                <FieldsetHeader>
                  <FieldsetLegend>Security & Access Keys</FieldsetLegend>
                  <FieldsetHelperText>
                    API keys allow automated tools to communicate with your deployment clusters.
                  </FieldsetHelperText>
                </FieldsetHeader>

                <FieldsetContent>
                  <Input label="API Key Label" placeholder="e.g. Production Cluster v2" />
                  <div className="flex flex-col gap-3 pt-2">
                    <Checkbox label="Grant Read & Write Storage Permissions" defaultChecked />
                    <Checkbox label="Restrict requests to specified IP whitelist" />
                  </div>
                </FieldsetContent>
              </Fieldset>

              {/* Card */}
              <Fieldset variant="card">
                <FieldsetHeader>
                  <FieldsetLegend>Data Retention Policy</FieldsetLegend>
                  <FieldsetHelperText>
                    Configure automatic archival periods for server access audit logs.
                  </FieldsetHelperText>
                </FieldsetHeader>

                <FieldsetContent>
                  <Input label="Log Retention (Days)" defaultValue="90" />
                </FieldsetContent>
              </Fieldset>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import {
  Fieldset,
  FieldsetHeader,
  FieldsetContent,
  FieldsetLegend,
  FieldsetHelperText,
  Input,
  Checkbox,
} from '@hudbird/ui'

{/* 1. Bordered Style */}
<Fieldset variant="bordered">
  <FieldsetHeader>
    <FieldsetLegend>Security & Access Keys</FieldsetLegend>
    <FieldsetHelperText>API keys allow automated tools to communicate.</FieldsetHelperText>
  </FieldsetHeader>
  <FieldsetContent>
    <Input label="API Key Label" placeholder="e.g. Production Cluster v2" />
    <div className="flex flex-col gap-3 pt-2">
      <Checkbox label="Grant Read & Write Storage Permissions" defaultChecked />
      <Checkbox label="Restrict requests to specified IP whitelist" />
    </div>
  </FieldsetContent>
</Fieldset>

{/* 2. Card Style */}
<Fieldset variant="card">
  <FieldsetHeader>
    <FieldsetLegend>Data Retention Policy</FieldsetLegend>
    <FieldsetHelperText>Configure automatic archival periods.</FieldsetHelperText>
  </FieldsetHeader>
  <FieldsetContent>
    <Input label="Log Retention (Days)" defaultValue="90" />
  </FieldsetContent>
</Fieldset>`}
          />
        </div>

        {/* 5. Invalid & Disabled Fieldset States */}
        <div id="invalid-and-disabled" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Invalid & Disabled Fieldset States
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Toggle validation errors and macro-disable locked form sets dynamically:
          </p>

          {/* Interactive State Toggle Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <Button
              size="sm"
              variant={isFormInvalid ? "solid" : "outline"}
              color={isFormInvalid ? "rose" : "zinc"}
              onClick={() => setIsFormInvalid(!isFormInvalid)}
            >
              Toggle isInvalid: {isFormInvalid ? "True" : "False"}
            </Button>
            <Button
              size="sm"
              variant={isFormDisabled ? "solid" : "outline"}
              color={isFormDisabled ? "indigo" : "zinc"}
              onClick={() => setIsFormDisabled(!isFormDisabled)}
            >
              Toggle disabled: {isFormDisabled ? "True" : "False"}
            </Button>
          </div>

          <ComponentPreview>
            <div className="w-full max-w-lg py-2">
              <Fieldset variant="bordered" isInvalid={isFormInvalid} disabled={isFormDisabled}>
                <FieldsetHeader>
                  <FieldsetLegend>Payment Method</FieldsetLegend>
                  <FieldsetHelperText>
                    Enter your card credentials to activate pro tier resources.
                  </FieldsetHelperText>
                </FieldsetHeader>

                <FieldsetContent>
                  <Input
                    label="Card Number"
                    placeholder="4242 •••• •••• 4242"
                    isInvalid={isFormInvalid}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Expiry Date" placeholder="MM/YY" isInvalid={isFormInvalid} />
                    <Input label="CVC / CVV" placeholder="123" isInvalid={isFormInvalid} />
                  </div>

                  <FieldsetErrorText>
                    The credit card details provided were declined by the verification gateway.
                  </FieldsetErrorText>
                </FieldsetContent>
              </Fieldset>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import {
  Fieldset,
  FieldsetHeader,
  FieldsetContent,
  FieldsetLegend,
  FieldsetHelperText,
  FieldsetErrorText,
  Input,
} from '@hudbird/ui'

function Example() {
  return (
    <Fieldset variant="bordered" isInvalid={${isFormInvalid}} disabled={${isFormDisabled}}>
      <FieldsetHeader>
        <FieldsetLegend>Payment Method</FieldsetLegend>
        <FieldsetHelperText>
          Enter your card credentials to activate pro tier resources.
        </FieldsetHelperText>
      </FieldsetHeader>

      <FieldsetContent>
        <Input label="Card Number" placeholder="4242 •••• •••• 4242" isInvalid={${isFormInvalid}} />

        <FieldsetErrorText>
          The credit card details provided were declined by the verification gateway.
        </FieldsetErrorText>
      </FieldsetContent>
    </Fieldset>
  )
}`}
          />
        </div>
      </section>
    </div>
  );
}
