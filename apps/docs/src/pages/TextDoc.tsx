import React from "react";
import { PageToolbar } from "../components/PageToolbar";
import textCode from "../../../../packages/core/src/components/Text/Text.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import { Text, Strong, Code } from "@hudbird/ui";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";

export const textTocItems = [
  { id: "installation", title: "Installation" },
  { id: "overview", title: "Overview" },
  { id: "variants", title: "Variants" },
  { id: "strong-and-code", title: "Strong & Code" },
  { id: "api", title: "API Reference" },
];

export default function TextDoc() {
  const apiRows: ApiPropRow[] = [
    {
      prop: "variant",
      type: '"default" | "strong" | "muted" | "small" | "code"',
      defaultVal: '"default"',
      description: "Visual typographic variant.",
    },
    {
      prop: "as",
      type: "React.ElementType",
      defaultVal: '"p" (for Text), "strong" (for Strong), "code" (for Code)',
      description: "Polymorphic prop to render as a different HTML element.",
    },
  ];

  return (
    <div className="space-y-16 pb-24">
      {/* Title & Subtitle */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="w-full min-w-0 flex-1 pr-4">
          <div className="mb-3 flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
              Text
            </h1>
            <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              Component
            </span>
          </div>
          <p className="pr-8 text-base text-zinc-600 dark:text-zinc-400">
            Typographic components for rendering paragraphs, strong text, and inline code.
          </p>
        </div>
        <PageToolbar />
      </div>

      {/* Main Preview */}
      <section className="space-y-4" id="overview">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Overview</h2>
        <ComponentPreview>
          <div className="w-full max-w-xl text-left">
            <Text>
              The quick brown fox jumps over the lazy dog. This is standard paragraph text used
              across the application.
            </Text>
          </div>
        </ComponentPreview>
        <CodeBlock
          code={`import { Text } from "@/components/hudbird-ui/Text";

export default function Example() {
  return (
    <Text>
      The quick brown fox jumps over the lazy dog.
    </Text>
  );
}`}
        />
      </section>
      <div id="installation" className="scroll-mt-24 space-y-4">
        <InstallationTabs componentName="text" manualCode={textCode} />
      </div>

      {/* Variants */}
      <section className="space-y-4" id="variants">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Variants</h2>
        <ComponentPreview>
          <div className="flex w-full max-w-xl flex-col items-start justify-center space-y-4 text-left">
            <Text variant="default">Default: Regular body text.</Text>
            <Text variant="muted">Muted: Subtle helper or secondary text.</Text>
            <Text variant="small">Small: Compact text for dense UI.</Text>
            <Text variant="strong">Strong: Emphasized text block.</Text>
            <Text variant="code">Code: Monospaced block.</Text>
          </div>
        </ComponentPreview>
        <CodeBlock
          code={`<Text variant="default">Default text</Text>
<Text variant="muted">Muted text</Text>
<Text variant="small">Small text</Text>`}
        />
      </section>

      {/* Strong & Code Components */}
      <section className="space-y-4" id="strong-and-code">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Strong & Code Helpers
        </h2>
        <ComponentPreview>
          <div className="w-full max-w-xl text-left">
            <Text>
              You can use the <Strong>Strong</Strong> component to emphasize inline text, or use the{" "}
              <Code>Code</Code> component to render monospaced identifiers like{" "}
              <Code>npm install</Code>.
            </Text>
          </div>
        </ComponentPreview>
        <CodeBlock
          code={`import { Text } from "@/components/hudbird-ui/Text";\nimport { Strong } from "@/components/hudbird-ui/Strong";\nimport { Code } from "@/components/hudbird-ui/Code";

export default function Example() {
  return (
    <Text>
      Use <Strong>Strong</Strong> to emphasize, or <Code>Code</Code> for identifiers.
    </Text>
  );
}`}
        />
      </section>

      {/* API Reference */}
      <section className="space-y-4" id="api">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">API Reference</h2>
        <ApiTable
          note="Text components support all standard HTML attributes for their respective elements."
          rows={apiRows}
        />
      </section>
    </div>
  );
}
