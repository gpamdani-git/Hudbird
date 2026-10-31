import React, { useState } from "react";
import { DocHeader } from "../components/DocHeader";
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
    <div className="space-y-24 pb-24 sm:space-y-32">
      {/* Title & Subtitle */}
      <DocHeader
        category="Components"
        title="Textarea"
        badge="Core"
        description="A multi-line text input field used for long-form content, support tickets, comments, and narrative user input."
      />

      {/* Main Preview */}
      <section className="space-y-6" id="overview">
        <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
          Overview
        </h2>
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
          code={`import { Textarea } from "@/components/hudbird-ui/Textarea";
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
      <div id="installation" className="scroll-mt-24 space-y-6">
        <InstallationTabs componentName="textarea" manualCode={textareaCode} />
      </div>

      {/* Variants */}
      <section className="space-y-6" id="variants">
        <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
          Variants
        </h2>
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
      <section className="space-y-6" id="invalid-state">
        <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
          Invalid State
        </h2>
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
      <section className="space-y-6" id="api">
        <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
          API Reference
        </h2>
        <ApiTable
          note="Textarea supports all native HTML textarea element attributes."
          rows={apiRows}
        />
      </section>
    </div>
  );
}
