// apps/docs/src/pages/AlertDoc.tsx
import alertCode from "../../../../packages/core/src/components/Alert/Alert.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import React, { useState } from "react";
import { Alert, Button } from "@hudbird/ui";
import { Info, CheckCircle2, AlertTriangle, AlertCircle, RotateCcw } from "lucide-react";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";

export const alertTocItems = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "alert-variants", title: "Alert variants" },
      { id: "status-colors", title: "Status colors" },
      { id: "with-icon", title: "With icon" },
      { id: "closable-alerts", title: "Closable alerts" },
    ],
  },
];

export default function AlertDoc() {
  const [closableKey, setClosableKey] = useState(0);

  const apiRows: ApiPropRow[] = [
    {
      prop: "variant",
      defaultVal: "flat",
      description: (
        <span>
          The visual styling of the alert:{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'solid'</code>,{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'flat'</code>, or{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'bordered'</code>.
        </span>
      ),
    },
    {
      prop: "color",
      defaultVal: "primary",
      description: (
        <span>
          The status color:{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'primary'</code> (info),{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'success'</code>,{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'danger'</code>, or{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'warning'</code>.
        </span>
      ),
    },
    {
      prop: "title",
      defaultVal: "-",
      description: "Header title displayed with prominent bold typography.",
    },
    {
      prop: "description",
      defaultVal: "-",
      description: "Main descriptive message or body content.",
    },
    {
      prop: "icon",
      defaultVal: "-",
      description: "Custom leading icon slot rendered on the left.",
    },
    {
      prop: "isClosable",
      defaultVal: "false",
      description: "Whether to render an interactive close dismissal button on the right.",
    },
    {
      prop: "onClose",
      defaultVal: "-",
      description: "Callback invoked when the close button is clicked.",
    },
  ];

  return (
    <div className="space-y-16 pb-24">
      {/* Title & Subtitle */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Alert
          </h1>
          <span className="text-xs font-semibold px-2 py-0.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full border border-indigo-500/20">
            Component
          </span>
        </div>
        <p className="text-base text-zinc-600 dark:text-zinc-400">
          Displays a callout banner for communicating status, contextual feedback, and user attention.
        </p>
      </div>

      {/* Main Preview & Code */}
      <section className="space-y-4">
        <ComponentPreview>
          <div className="w-full max-w-xl">
            <Alert
              icon={<Info className="w-5 h-5 text-indigo-500" />}
              title="System update scheduled"
              description="A new maintenance release will be deployed tonight at 02:00 UTC."
            />
          </div>
        </ComponentPreview>

        <CodeBlock
          code={`import { Alert } from '@hudbird/ui'
import { Info } from 'lucide-react'

function Example() {
  return (
    <Alert
      icon={<Info className="w-5 h-5 text-indigo-500" />}
      title="System update scheduled"
      description="A new maintenance release will be deployed tonight at 02:00 UTC."
    />
  )
}`}
        />
      </section>
      <div id="installation" className="scroll-mt-24 space-y-4">
        <InstallationTabs componentName="alert" manualCode={alertCode} />
      </div>


      {/* Component API */}
      <section id="component-api" className="scroll-mt-24 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Component API
        </h2>
        <ApiTable
          note={
            <span>
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">Alert</strong> adheres to WAI-ARIA alert role standards and supports all native HTML div attributes.
            </span>
          }
          rows={apiRows}
        />
      </section>

      {/* Examples */}
      <section id="examples" className="scroll-mt-24 space-y-14">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-2">
            Examples
          </h2>
        </div>

        {/* 1. Alert variants */}
        <div id="alert-variants" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Alert variants
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Choose between <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:text-zinc-200">'flat'</code>, <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:text-zinc-200">'solid'</code>, and <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:text-zinc-200">'bordered'</code>:
          </p>

          <ComponentPreview>
            <div className="w-full max-w-xl space-y-3">
              <Alert
                variant="flat"
                color="primary"
                title="Flat variant (Default)"
                description="Subtle background tint with harmonious tinted borders."
              />
              <Alert
                variant="solid"
                color="primary"
                title="Solid variant"
                description="Bold high-contrast background with crisp white typography."
              />
              <Alert
                variant="bordered"
                color="primary"
                title="Bordered variant"
                description="Transparent background with prominent outline borders."
              />
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Alert } from '@hudbird/ui'

function Example() {
  return (
    <div className="space-y-3">
      <Alert variant="flat" color="primary" title="Flat variant" description="..." />
      <Alert variant="solid" color="primary" title="Solid variant" description="..." />
      <Alert variant="bordered" color="primary" title="Bordered variant" description="..." />
    </div>
  )
}`}
          />
        </div>

        {/* 2. Status colors */}
        <div id="status-colors" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Status colors
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Semantic state colors communicate different severity levels:
          </p>

          <ComponentPreview>
            <div className="w-full max-w-xl space-y-3">
              <Alert
                color="primary"
                title="Information"
                description="A new workspace invitation is waiting for your review."
              />
              <Alert
                color="success"
                title="Success"
                description="Your deployment succeeded and DNS records have propagated."
              />
              <Alert
                color="warning"
                title="Warning"
                description="You are nearing 90% of your monthly storage quota."
              />
              <Alert
                color="danger"
                title="Error"
                description="Failed to authenticate credentials with the remote server."
              />
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Alert } from '@hudbird/ui'

function Example() {
  return (
    <div className="space-y-3">
      <Alert color="primary" title="Information" description="..." />
      <Alert color="success" title="Success" description="..." />
      <Alert color="warning" title="Warning" description="..." />
      <Alert color="danger" title="Error" description="..." />
    </div>
  )
}`}
          />
        </div>

        {/* 3. With icon */}
        <div id="with-icon" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            With icon
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Pass custom leading icons to give instant visual cues:
          </p>

          <ComponentPreview>
            <div className="w-full max-w-xl space-y-3">
              <Alert
                color="success"
                icon={<CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
                title="Payment processed"
                description="Invoice #2049 has been paid in full."
              />
              <Alert
                color="warning"
                icon={<AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
                title="API key expiring"
                description="Please rotate your secret keys within 48 hours."
              />
              <Alert
                color="danger"
                icon={<AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
                title="Connection lost"
                description="Check your network connection and retry."
              />
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Alert } from '@hudbird/ui'
import { CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react'

function Example() {
  return (
    <div className="space-y-3">
      <Alert
        color="success"
        icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
        title="Payment processed"
        description="Invoice #2049 has been paid in full."
      />
      <Alert
        color="warning"
        icon={<AlertTriangle className="w-5 h-5 text-amber-600" />}
        title="API key expiring"
        description="Please rotate your secret keys within 48 hours."
      />
      <Alert
        color="danger"
        icon={<AlertCircle className="w-5 h-5 text-rose-600" />}
        title="Connection lost"
        description="Check your network connection and retry."
      />
    </div>
  )
}`}
          />
        </div>

        {/* 4. Closable alerts */}
        <div id="closable-alerts" className="scroll-mt-24 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Closable alerts
            </h3>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setClosableKey((k) => k + 1)}
              className="flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Demo
            </Button>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Set <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:text-zinc-200">'isClosable'</code> to true to render a dismissal button:
          </p>

          <ComponentPreview>
            <div key={closableKey} className="w-full max-w-xl space-y-3">
              <Alert
                isClosable
                color="primary"
                icon={<Info className="w-5 h-5 text-indigo-500" />}
                title="Dismissible Information"
                description="Click the close button on the right to dismiss this alert."
              />
              <Alert
                isClosable
                variant="solid"
                color="success"
                icon={<CheckCircle2 className="w-5 h-5 text-white" />}
                title="Solid Dismissible Alert"
                description="Dismiss button dynamically adapts its hover contrast to solid styles."
              />
              <Alert
                isClosable
                variant="bordered"
                color="danger"
                icon={<AlertCircle className="w-5 h-5 text-rose-500" />}
                title="Bordered Dismissible Alert"
                description="Supports dismissal on all variant combinations."
              />
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Alert } from '@hudbird/ui'

function Example() {
  return (
    <Alert
      isClosable
      color="primary"
      title="Dismissible Information"
      description="Click the close button on the right to dismiss this alert."
      onClose={() => console.log('Alert closed')}
    />
  )
}`}
          />
        </div>
      </section>
    </div>
  );
}
