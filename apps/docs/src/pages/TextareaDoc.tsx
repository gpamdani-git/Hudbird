import React, { useState } from "react";
import { PageToolbar } from "../components/PageToolbar";
import textareaCode from "../../../../packages/core/src/components/Textarea/Textarea.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import { Textarea } from "@hudbird/ui";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";

export const textareaTocItems = [
  { id: "installation", title: "Installation" },
  { id: "overview", title: "Overview" },
  { id: "variants", title: "Variants" },
  { id: "invalid-state", title: "Invalid State" },
  { id: "api", title: "API Reference" },
];

export default function TextareaDoc() {
  const [val, setVal] = useState("");

  const apiRows: ApiPropRow[] = [
    {
      prop: "variant",
      type: '"flat" | "bordered" | "underlined"',
      defaultVal: '"bordered"',
      description: "Visual variant style of the textarea.",
    },
    {
      prop: "isInvalid",
      type: "boolean",
      defaultVal: "false",
      description: "Whether the textarea is in an invalid error state.",
    },
  ];

  return (
    <div className="space-y-16 pb-24">
      {/* Title & Subtitle */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="w-full min-w-0 flex-1 pr-4">
          <div className="mb-3 flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
              Textarea
            </h1>
            <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              Component
            </span>
          </div>
          <p className="pr-32 text-base text-zinc-600 sm:pr-40 dark:text-zinc-400">
            A multi-line text input field used for long-form content.
          </p>
        </div>
        <PageToolbar />
      </div>

      {/* Main Preview */}
      <section className="space-y-4" id="overview">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Overview</h2>
        <ComponentPreview>
          <div className="w-full max-w-sm">
            <Textarea
              placeholder="Tell us about your project..."
              value={val}
              onChange={(e) => setVal(e.target.value)}
              rows={4}
            />
          </div>
        </ComponentPreview>
        <CodeBlock
          code={`import { Textarea } from "@hudbird/ui";
import { useState } from "react";

export default function Example() {
  const [val, setVal] = useState("");
  
  return (
    <Textarea 
      placeholder="Tell us about your project..." 
      value={val}
      onChange={(e) => setVal(e.target.value)}
      rows={4}
    />
  );
}`}
        />
      </section>
      <div id="installation" className="scroll-mt-24 space-y-4">
        <InstallationTabs componentName="textarea" manualCode={textareaCode} />
      </div>

      {/* Variants */}
      <section className="space-y-4" id="variants">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Variants</h2>
        <ComponentPreview>
          <div className="w-full max-w-sm space-y-4">
            <Textarea variant="bordered" placeholder="Bordered (default)" />
            <Textarea variant="flat" placeholder="Flat variant" />
            <Textarea variant="underlined" placeholder="Underlined variant" />
          </div>
        </ComponentPreview>
        <CodeBlock
          code={`<Textarea variant="bordered" placeholder="Bordered (default)" />
<Textarea variant="flat" placeholder="Flat variant" />
<Textarea variant="underlined" placeholder="Underlined variant" />`}
        />
      </section>

      {/* Invalid State */}
      <section className="space-y-4" id="invalid-state">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Invalid State</h2>
        <ComponentPreview>
          <div className="w-full max-w-sm">
            <Textarea
              isInvalid
              placeholder="Enter your message..."
              defaultValue="This is a bad message!"
            />
          </div>
        </ComponentPreview>
        <CodeBlock
          code={`<Textarea isInvalid placeholder="Enter your message..." defaultValue="..." />`}
        />
      </section>

      {/* API Reference */}
      <section className="space-y-4" id="api">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">API Reference</h2>
        <ApiTable
          note="Textarea supports all native HTML textarea element attributes."
          rows={apiRows}
        />
      </section>
    </div>
  );
}
