// apps/docs/src/pages/DividerDoc.tsx
import dividerCode from "../../../../packages/core/src/components/Divider/Divider.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import React from "react";
import { Divider, Button, Input } from "@hudbird/ui";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";

export const dividerTocItems = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "horizontal-divider", title: "Horizontal Divider" },
      { id: "vertical-divider", title: "Vertical Divider in Navigation" },
      { id: "divider-with-content", title: "Divider with Content (OR / Sign-in)" },
      { id: "dashed-variant", title: "Dashed Variant in Receipt / Invoice" },
    ],
  },
];

export default function DividerDoc() {
  const apiRows: ApiPropRow[] = [
    {
      prop: "orientation",
      defaultVal: "'horizontal'",
      description: (
        <span>
          Layout direction of the separator:{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'horizontal'</code> (spans full width <code className="font-mono text-[11px]">w-full</code>) or{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'vertical'</code> (stretches along vertical axes <code className="font-mono text-[11px]">h-full self-stretch</code>).
        </span>
      ),
    },
    {
      prop: "variant",
      defaultVal: "'solid'",
      description: (
        <span>
          Stroke style:{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'solid'</code> (continuous thin stroke) or{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'dashed'</code> (minimalist dashed pattern).
        </span>
      ),
    },
    {
      prop: "contentPosition",
      defaultVal: "'center'",
      description: (
        <span>
          Horizontal placement of embedded children labels:{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'left'</code>,{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'center'</code>, or{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'right'</code>.
        </span>
      ),
    },
    {
      prop: "children",
      defaultVal: "undefined",
      description: "Optional content or badge to embed directly inside the center or offset position of the divider.",
    },
    {
      prop: "className",
      defaultVal: "undefined",
      description: "Additional Tailwind CSS classes merged via cn() utility.",
    },
  ];

  return (
    <div className="space-y-16 pb-24">
      {/* Title & Introduction */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Divider
          </h1>
          <span className="text-xs font-semibold px-2 py-0.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full border border-indigo-500/20">
            Component
          </span>
        </div>
        <p className="text-base text-zinc-600 dark:text-zinc-400">
          Clean visual separators used to partition sections, group navigation elements, and render intermediate labeled break points.
        </p>
      </div>

      {/* Hero Preview & Code */}
      <section className="space-y-4">
        <ComponentPreview>
          <div className="w-full max-w-md py-4 space-y-4">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                Design System Core
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                An accessible collection of modern React components.
              </p>
            </div>

            <Divider />

            <div className="flex h-5 items-center space-x-4 text-xs font-medium text-zinc-600 dark:text-zinc-300">
              <span>Docs</span>
              <Divider orientation="vertical" />
              <span>Components</span>
              <Divider orientation="vertical" />
              <span>Changelog</span>
              <Divider orientation="vertical" />
              <span>GitHub</span>
            </div>
          </div>
        </ComponentPreview>

        <CodeBlock
          code={`import { Divider } from '@hudbird/ui'

function Example() {
  return (
    <div className="space-y-4 max-w-md">
      <div>
        <h4 className="text-sm font-semibold">Design System Core</h4>
        <p className="text-xs text-zinc-500">An accessible collection of modern React components.</p>
      </div>

      <Divider />

      <div className="flex h-5 items-center space-x-4 text-xs font-medium">
        <span>Docs</span>
        <Divider orientation="vertical" />
        <span>Components</span>
        <Divider orientation="vertical" />
        <span>Changelog</span>
      </div>
    </div>
  )
}`}
        />
      </section>
      <div id="installation" className="scroll-mt-24 space-y-4">
        <InstallationTabs componentName="divider" manualCode={dividerCode} />
      </div>


      {/* Component API */}
      <section id="component-api" className="scroll-mt-24 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Component API
        </h2>
        <ApiTable
          note={
            <span>
              Implements WAI-ARIA <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">role="separator"</code> with dynamic <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">aria-orientation</code> attributes.
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

        {/* 1. Horizontal Divider */}
        <div id="horizontal-divider" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Horizontal Divider
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Partition distinct editorial paragraphs or content blocks cleanly across vertical flows:
          </p>

          <ComponentPreview>
            <div className="w-full max-w-lg space-y-3 py-2">
              <div>
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Typography Principles
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                  Hierarchy and rhythmic line height balance readability while anchoring user attention on crucial action vectors.
                </p>
              </div>

              <Divider />

              <div>
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Elevation & Contrast
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                  Surface borders with subtle opacity ensure accessible visual separation in both high-key light and deep dark palettes.
                </p>
              </div>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Divider } from '@hudbird/ui'

function Example() {
  return (
    <div className="space-y-3 max-w-lg">
      <div>
        <h4 className="text-sm font-semibold">Typography Principles</h4>
        <p className="text-xs text-zinc-500">Hierarchy and rhythmic line height balance readability.</p>
      </div>

      <Divider />

      <div>
        <h4 className="text-sm font-semibold">Elevation & Contrast</h4>
        <p className="text-xs text-zinc-500">Surface borders ensure accessible visual separation.</p>
      </div>
    </div>
  )
}`}
          />
        </div>

        {/* 2. Vertical Divider in Navigation */}
        <div id="vertical-divider" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Vertical Divider in Navigation
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Divide inline actions, header bar toolbars, or metadata breadcrumbs with <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:text-zinc-200">orientation="vertical"</code>:
          </p>

          <ComponentPreview>
            <div className="flex flex-wrap items-center justify-center gap-4 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800 px-6 max-w-lg w-full">
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Home</span>
              <Divider orientation="vertical" className="h-4" />
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Profile</span>
              <Divider orientation="vertical" className="h-4" />
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Settings</span>
              <Divider orientation="vertical" className="h-4" />
              <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">Billing</span>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Divider } from '@hudbird/ui'

function Example() {
  return (
    <div className="flex items-center gap-4">
      <span className="text-xs font-medium">Home</span>
      <Divider orientation="vertical" className="h-4" />
      <span className="text-xs font-medium">Profile</span>
      <Divider orientation="vertical" className="h-4" />
      <span className="text-xs font-medium">Settings</span>
      <Divider orientation="vertical" className="h-4" />
      <span className="text-xs font-medium text-indigo-600">Billing</span>
    </div>
  )
}`}
          />
        </div>

        {/* 3. Divider with Content (OR / Sign-in) */}
        <div id="divider-with-content" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Divider with Content (OR / Sign-in)
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Place customizable badges, icons, or text labels directly inside the divider line with support for <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:text-zinc-200">contentPosition="left" | "center" | "right"</code>:
          </p>

          <ComponentPreview>
            <div className="w-full max-w-sm space-y-4 py-4">
              <Button color="indigo" className="w-full">
                Sign in with Email
              </Button>

              <Divider>OR</Divider>

              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                Continue with Google
              </Button>

              <div className="pt-4 space-y-3">
                <Divider contentPosition="left">Left Aligned</Divider>
                <Divider contentPosition="right">Right Aligned</Divider>
              </div>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Divider, Button } from '@hudbird/ui'

function Example() {
  return (
    <div className="space-y-4 max-w-sm">
      <Button color="indigo" className="w-full">Sign in with Email</Button>
      
      {/* Center Label */}
      <Divider>OR</Divider>

      <Button variant="outline" className="w-full">Continue with Google</Button>

      {/* Position Alignment Options */}
      <Divider contentPosition="left">Left Aligned</Divider>
      <Divider contentPosition="right">Right Aligned</Divider>
    </div>
  )
}`}
          />
        </div>

        {/* 4. Dashed Variant in Receipt / Invoice */}
        <div id="dashed-variant" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Dashed Variant in Receipt / Invoice
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Use <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:text-zinc-200">variant="dashed"</code> for ticket vouchers, receipts, and order cost breakdowns:
          </p>

          <ComponentPreview>
            <div className="w-full max-w-sm rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 p-5 space-y-3">
              <div className="flex justify-between text-xs text-zinc-600 dark:text-zinc-400">
                <span>Core Library Subscription (Annual)</span>
                <span className="font-mono font-medium text-zinc-900 dark:text-zinc-100">$240.00</span>
              </div>
              <div className="flex justify-between text-xs text-zinc-600 dark:text-zinc-400">
                <span>Priority Cloud Support Tier</span>
                <span className="font-mono font-medium text-zinc-900 dark:text-zinc-100">$60.00</span>
              </div>
              <div className="flex justify-between text-xs text-zinc-600 dark:text-zinc-400">
                <span>Tax Estimate</span>
                <span className="font-mono font-medium text-zinc-900 dark:text-zinc-100">$24.00</span>
              </div>

              <Divider variant="dashed" />

              <div className="flex justify-between text-sm font-semibold text-zinc-900 dark:text-zinc-50 pt-1">
                <span>Total Due</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400">$324.00 USD</span>
              </div>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Divider } from '@hudbird/ui'

function Example() {
  return (
    <div className="max-w-sm p-5 border rounded-2xl space-y-3">
      <div className="flex justify-between text-xs">
        <span>Core Library Subscription</span>
        <span>$240.00</span>
      </div>
      <div className="flex justify-between text-xs">
        <span>Priority Cloud Support</span>
        <span>$60.00</span>
      </div>

      <Divider variant="dashed" />

      <div className="flex justify-between text-sm font-semibold">
        <span>Total Due</span>
        <span className="text-indigo-600">$300.00 USD</span>
      </div>
    </div>
  )
}`}
          />
        </div>
      </section>
    </div>
  );
}
