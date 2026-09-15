// apps/docs/src/pages/DescriptionListDoc.tsx
import descriptionListCode from "../../../../packages/core/src/components/DescriptionList/DescriptionList.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import React from "react";
import { PageToolbar } from "../components/PageToolbar";
import {
  DescriptionList,
  DescriptionListItem,
  DescriptionListLabel,
  DescriptionListValue,
  Badge,
  Button,
} from "@hudbird/ui";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";

export const descriptionListTocItems = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "basic-usage", title: "Basic Profile Information" },
      { id: "card-styled", title: "Card-Styled Invoice Details" },
      { id: "vertical-orientation", title: "Vertical Orientation" },
      { id: "advanced-content", title: "Advanced Content & Actions" },
    ],
  },
];

export default function DescriptionListDoc() {
  const apiRows: ApiPropRow[] = [
    {
      prop: "variant",
      defaultVal: "'flat'",
      description: (
        <span>
          Surface presentation container:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'flat'
          </code>{" "}
          (border dividers only) or{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'card'
          </code>{" "}
          (enclosed in a rounded panel with subtle background).
        </span>
      ),
    },
    {
      prop: "orientation",
      defaultVal: "'horizontal'",
      description: (
        <span>
          Layout direction:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'horizontal'
          </code>{" "}
          (responsive side-by-side grid) or{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'vertical'
          </code>{" "}
          (stacked label and value).
        </span>
      ),
    },
    {
      prop: "className",
      defaultVal: "undefined",
      description: "Additional Tailwind CSS classes merged via the cn() utility.",
    },
    {
      prop: "children",
      defaultVal: "-",
      description: "Collection of DescriptionListItem components containing Label and Value pairs.",
    },
  ];

  return (
    <div className="space-y-16 pb-24">
      {/* Title & Introduction */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="w-full min-w-0 flex-1 pr-4">
          <div className="mb-3 flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
              Description List
            </h1>
            <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              Component
            </span>
          </div>
          <p className="pr-8 text-base text-zinc-600 dark:text-zinc-400">
            Clean, structured key-value display components for presenting metadata, user profile
            specifications, transaction breakdowns, and configuration records.
          </p>
        </div>
        <PageToolbar />
      </div>

      {/* Hero Preview & Code */}
      <section className="space-y-4">
        <ComponentPreview>
          <div className="w-full max-w-xl py-4">
            <DescriptionList variant="card">
              <DescriptionListItem>
                <DescriptionListLabel>Full Name</DescriptionListLabel>
                <DescriptionListValue>Alex Morgan</DescriptionListValue>
              </DescriptionListItem>
              <DescriptionListItem>
                <DescriptionListLabel>Job Title</DescriptionListLabel>
                <DescriptionListValue>Staff Design Technologist</DescriptionListValue>
              </DescriptionListItem>
              <DescriptionListItem>
                <DescriptionListLabel>Email Address</DescriptionListLabel>
                <DescriptionListValue>alex.morgan@example.com</DescriptionListValue>
              </DescriptionListItem>
              <DescriptionListItem>
                <DescriptionListLabel>Account Status</DescriptionListLabel>
                <DescriptionListValue>
                  <Badge variant="soft" color="success">
                    Active Subscriber
                  </Badge>
                </DescriptionListValue>
              </DescriptionListItem>
            </DescriptionList>
          </div>
        </ComponentPreview>

        <CodeBlock
          code={`import { DescriptionList, DescriptionListItem, DescriptionListLabel, DescriptionListValue } from "@/components/hudbird-ui/DescriptionList";\nimport { Badge } from "@/components/hudbird-ui/Badge";

function Example() {
  return (
    <DescriptionList variant="card">
      <DescriptionListItem>
        <DescriptionListLabel>Full Name</DescriptionListLabel>
        <DescriptionListValue>Alex Morgan</DescriptionListValue>
      </DescriptionListItem>

      <DescriptionListItem>
        <DescriptionListLabel>Job Title</DescriptionListLabel>
        <DescriptionListValue>Staff Design Technologist</DescriptionListValue>
      </DescriptionListItem>

      <DescriptionListItem>
        <DescriptionListLabel>Email Address</DescriptionListLabel>
        <DescriptionListValue>alex.morgan@example.com</DescriptionListValue>
      </DescriptionListItem>

      <DescriptionListItem>
        <DescriptionListLabel>Account Status</DescriptionListLabel>
        <DescriptionListValue>
          <Badge variant="soft" color="success">
            Active Subscriber
          </Badge>
        </DescriptionListValue>
      </DescriptionListItem>
    </DescriptionList>
  )
}`}
        />
      </section>
      <div id="installation" className="scroll-mt-24 space-y-4">
        <InstallationTabs componentName="description-list" manualCode={descriptionListCode} />
      </div>

      {/* Component API */}
      <section id="component-api" className="scroll-mt-24 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Component API
        </h2>
        <ApiTable
          note={
            <span>
              Composed of{" "}
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                &lt;DescriptionList&gt;
              </strong>
              ,{" "}
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                &lt;DescriptionListItem&gt;
              </strong>
              ,{" "}
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                &lt;DescriptionListLabel&gt;
              </strong>
              , and{" "}
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                &lt;DescriptionListValue&gt;
              </strong>{" "}
              semantic tags.
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

        {/* 1. Basic Profile Information */}
        <div id="basic-usage" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Basic Profile Information
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Standard flat presentation with subtle divider lines between row items:
          </p>

          <ComponentPreview>
            <div className="w-full max-w-xl py-4">
              <DescriptionList variant="flat">
                <DescriptionListItem>
                  <DescriptionListLabel>Organization</DescriptionListLabel>
                  <DescriptionListValue>Acme Corporation, Inc.</DescriptionListValue>
                </DescriptionListItem>
                <DescriptionListItem>
                  <DescriptionListLabel>Billing Contact</DescriptionListLabel>
                  <DescriptionListValue>billing@acme.com</DescriptionListValue>
                </DescriptionListItem>
                <DescriptionListItem>
                  <DescriptionListLabel>Primary Timezone</DescriptionListLabel>
                  <DescriptionListValue>UTC-08:00 (Pacific Standard Time)</DescriptionListValue>
                </DescriptionListItem>
                <DescriptionListItem>
                  <DescriptionListLabel>Security Key</DescriptionListLabel>
                  <DescriptionListValue className="font-mono text-xs text-zinc-600 dark:text-zinc-400">
                    ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIG
                  </DescriptionListValue>
                </DescriptionListItem>
              </DescriptionList>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { DescriptionList, DescriptionListItem, DescriptionListLabel, DescriptionListValue } from "@/components/hudbird-ui/DescriptionList";

function Example() {
  return (
    <DescriptionList variant="flat">
      <DescriptionListItem>
        <DescriptionListLabel>Organization</DescriptionListLabel>
        <DescriptionListValue>Acme Corporation, Inc.</DescriptionListValue>
      </DescriptionListItem>

      <DescriptionListItem>
        <DescriptionListLabel>Billing Contact</DescriptionListLabel>
        <DescriptionListValue>billing@acme.com</DescriptionListValue>
      </DescriptionListItem>

      <DescriptionListItem>
        <DescriptionListLabel>Primary Timezone</DescriptionListLabel>
        <DescriptionListValue>UTC-08:00 (Pacific Standard Time)</DescriptionListValue>
      </DescriptionListItem>
    </DescriptionList>
  )
}`}
          />
        </div>

        {/* 2. Card-Styled Invoice Details */}
        <div id="card-styled" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Card-Styled Invoice Details
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Enclose metadata inside an elevated container with{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              variant="card"
            </code>{" "}
            for invoices and receipt summaries:
          </p>

          <ComponentPreview>
            <div className="w-full max-w-xl py-4">
              <DescriptionList variant="card">
                <DescriptionListItem>
                  <DescriptionListLabel>Invoice Number</DescriptionListLabel>
                  <DescriptionListValue className="font-mono font-medium text-indigo-600 dark:text-indigo-400">
                    INV-2026-8942
                  </DescriptionListValue>
                </DescriptionListItem>
                <DescriptionListItem>
                  <DescriptionListLabel>Issue Date</DescriptionListLabel>
                  <DescriptionListValue>September 6, 2026</DescriptionListValue>
                </DescriptionListItem>
                <DescriptionListItem>
                  <DescriptionListLabel>Payment Method</DescriptionListLabel>
                  <DescriptionListValue className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                    Mastercard ending in •••• 4242
                  </DescriptionListValue>
                </DescriptionListItem>
                <DescriptionListItem>
                  <DescriptionListLabel>Amount Settled</DescriptionListLabel>
                  <DescriptionListValue className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                    $1,450.00 USD
                  </DescriptionListValue>
                </DescriptionListItem>
              </DescriptionList>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { DescriptionList, DescriptionListItem, DescriptionListLabel, DescriptionListValue } from "@/components/hudbird-ui/DescriptionList";

function Example() {
  return (
    <DescriptionList variant="card">
      <DescriptionListItem>
        <DescriptionListLabel>Invoice Number</DescriptionListLabel>
        <DescriptionListValue className="font-mono font-medium text-indigo-600 dark:text-indigo-400">
          INV-2026-8942
        </DescriptionListValue>
      </DescriptionListItem>

      <DescriptionListItem>
        <DescriptionListLabel>Issue Date</DescriptionListLabel>
        <DescriptionListValue>September 6, 2026</DescriptionListValue>
      </DescriptionListItem>

      <DescriptionListItem>
        <DescriptionListLabel>Amount Settled</DescriptionListLabel>
        <DescriptionListValue className="text-base font-semibold">
          $1,450.00 USD
        </DescriptionListValue>
      </DescriptionListItem>
    </DescriptionList>
  )
}`}
          />
        </div>

        {/* 3. Vertical Orientation */}
        <div id="vertical-orientation" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Vertical Orientation
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Stack labels above values on all screen sizes with{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              orientation="vertical"
            </code>
            :
          </p>

          <ComponentPreview>
            <div className="w-full max-w-xl py-4">
              <DescriptionList variant="card" orientation="vertical">
                <DescriptionListItem>
                  <DescriptionListLabel>Project Scope & Objectives</DescriptionListLabel>
                  <DescriptionListValue className="leading-relaxed text-zinc-600 dark:text-zinc-400">
                    Build a comprehensive, accessible design system with atomic tokens, flexible
                    components, and full dark-mode compliance.
                  </DescriptionListValue>
                </DescriptionListItem>
                <DescriptionListItem>
                  <DescriptionListLabel>Release Schedule</DescriptionListLabel>
                  <DescriptionListValue>
                    Targeting continuous delivery with bi-weekly stable channel cuts.
                  </DescriptionListValue>
                </DescriptionListItem>
              </DescriptionList>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { DescriptionList, DescriptionListItem, DescriptionListLabel, DescriptionListValue } from "@/components/hudbird-ui/DescriptionList";

function Example() {
  return (
    <DescriptionList variant="card" orientation="vertical">
      <DescriptionListItem>
        <DescriptionListLabel>Project Scope & Objectives</DescriptionListLabel>
        <DescriptionListValue>
          Build a comprehensive, accessible design system with atomic tokens.
        </DescriptionListValue>
      </DescriptionListItem>

      <DescriptionListItem>
        <DescriptionListLabel>Release Schedule</DescriptionListLabel>
        <DescriptionListValue>
          Targeting continuous delivery with bi-weekly stable cuts.
        </DescriptionListValue>
      </DescriptionListItem>
    </DescriptionList>
  )
}`}
          />
        </div>

        {/* 4. Advanced Content & Actions */}
        <div id="advanced-content" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Advanced Content & Actions
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Embed rich interactive components such as Badges, action buttons, and secondary links
            directly within{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              &lt;DescriptionListValue&gt;
            </code>
            :
          </p>

          <ComponentPreview>
            <div className="w-full max-w-xl py-4">
              <DescriptionList variant="card">
                <DescriptionListItem>
                  <DescriptionListLabel>Deployment URL</DescriptionListLabel>
                  <DescriptionListValue className="flex items-center justify-between gap-4">
                    <span className="truncate font-mono text-xs text-indigo-600 dark:text-indigo-400">
                      https://app.design-system.io/v2
                    </span>
                    <Button size="sm" variant="outline" className="h-7 shrink-0 px-2.5 text-xs">
                      Visit Link
                    </Button>
                  </DescriptionListValue>
                </DescriptionListItem>

                <DescriptionListItem>
                  <DescriptionListLabel>Environment Tier</DescriptionListLabel>
                  <DescriptionListValue className="flex items-center gap-2">
                    <Badge variant="soft" color="warning">
                      Staging Preview
                    </Badge>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      (Branch: <code className="font-mono">feat/combobox</code>)
                    </span>
                  </DescriptionListValue>
                </DescriptionListItem>

                <DescriptionListItem>
                  <DescriptionListLabel>API Secret Key</DescriptionListLabel>
                  <DescriptionListValue className="flex items-center justify-between gap-4">
                    <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                      sk_live_••••••••••••9821
                    </span>
                    <Button size="sm" variant="outline" className="h-7 shrink-0 px-2.5 text-xs">
                      Reveal Key
                    </Button>
                  </DescriptionListValue>
                </DescriptionListItem>
              </DescriptionList>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { DescriptionList, DescriptionListItem, DescriptionListLabel, DescriptionListValue } from "@/components/hudbird-ui/DescriptionList";\nimport { Badge } from "@/components/hudbird-ui/Badge";\nimport { Button } from "@/components/hudbird-ui/Button";

function Example() {
  return (
    <DescriptionList variant="card">
      <DescriptionListItem>
        <DescriptionListLabel>Deployment URL</DescriptionListLabel>
        <DescriptionListValue className="flex items-center justify-between gap-4">
          <span className="font-mono text-xs text-indigo-600 dark:text-indigo-400 truncate">
            https://app.design-system.io/v2
          </span>
          <Button size="sm" variant="outline">Visit Link</Button>
        </DescriptionListValue>
      </DescriptionListItem>

      <DescriptionListItem>
        <DescriptionListLabel>Environment Tier</DescriptionListLabel>
        <DescriptionListValue className="flex items-center gap-2">
          <Badge variant="soft" color="warning">Staging Preview</Badge>
        </DescriptionListValue>
      </DescriptionListItem>
    </DescriptionList>
  )
}`}
          />
        </div>
      </section>
    </div>
  );
}
