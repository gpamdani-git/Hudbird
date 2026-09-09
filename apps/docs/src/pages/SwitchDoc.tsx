import React, { useState } from "react";
import switchCode from "../../../../packages/core/src/components/Switch/Switch.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import { Switch } from "@hudbird/ui";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";

export const switchTocItems = [
  { id: "installation", title: "Installation" },
  { id: "overview", title: "Overview" },
  { id: "sizes", title: "Sizes" },
  { id: "colors", title: "Colors" },
  { id: "with-labels", title: "With Labels" },
  { id: "api", title: "API Reference" },
];

export default function SwitchDoc() {
  const apiRows: ApiPropRow[] = [
    { prop: "size", type: '"sm" | "md" | "lg"', defaultVal: '"md"', description: "The size of the switch." },
    { prop: "color", type: '"primary" | "success" | "danger" | "warning"', defaultVal: '"primary"', description: "The color variant when checked." },
    { prop: "label", type: "ReactNode", defaultVal: "-", description: "Label text displayed next to the switch." },
    { prop: "description", type: "ReactNode", defaultVal: "-", description: "Additional text rendered under the label." },
    { prop: "checked", type: "boolean", defaultVal: "-", description: "Controlled checked state." },
    { prop: "defaultChecked", type: "boolean", defaultVal: "false", description: "Uncontrolled default checked state." },
  ];

  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(true);
  const [isChecked3, setIsChecked3] = useState(false);

  return (
    <div className="space-y-16 pb-24">
      {/* Title & Subtitle */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Switch
          </h1>
          <span className="text-xs font-semibold px-2 py-0.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full border border-indigo-500/20">
            Component
          </span>
        </div>
        <p className="text-base text-zinc-600 dark:text-zinc-400">
          A control that allows the user to toggle between checked and not checked.
        </p>
      </div>

      {/* Main Preview */}
      <section className="space-y-4" id="overview">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Overview</h2>
        <ComponentPreview>
          <div className="flex flex-col items-center gap-4">
            <Switch
              checked={isChecked1}
              onChange={(e) => setIsChecked1(e.target.checked)}
              label="Airplane Mode"
            />
          </div>
        </ComponentPreview>
        <CodeBlock
          code={`import { Switch } from "@hudbird/ui";
import { useState } from "react";

export default function Example() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch 
      checked={enabled} 
      onChange={(e) => setEnabled(e.target.checked)}
      label="Airplane Mode"
    />
  );
}`}
        />
      </section>
      <div id="installation" className="scroll-mt-24 space-y-4">
        <InstallationTabs componentName="switch" manualCode={switchCode} />
      </div>


      {/* Sizes */}
      <section className="space-y-4" id="sizes">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Sizes</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Switches come in three sizes: <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">sm</code>, <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">md</code>, and <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">lg</code>.
        </p>
        <ComponentPreview>
          <div className="flex items-end gap-8">
            <Switch size="sm" defaultChecked label="Small" />
            <Switch size="md" defaultChecked label="Medium" />
            <Switch size="lg" defaultChecked label="Large" />
          </div>
        </ComponentPreview>
        <CodeBlock
          code={`<Switch size="sm" defaultChecked label="Small" />
<Switch size="md" defaultChecked label="Medium" />
<Switch size="lg" defaultChecked label="Large" />`}
        />
      </section>

      {/* Colors */}
      <section className="space-y-4" id="colors">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Colors</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Choose from different color variants to match your branding or indicate states.
        </p>
        <ComponentPreview>
          <div className="flex flex-col gap-4">
            <Switch color="primary" defaultChecked label="Primary" />
            <Switch color="success" defaultChecked label="Success" />
            <Switch color="warning" defaultChecked label="Warning" />
            <Switch color="danger" defaultChecked label="Danger" />
          </div>
        </ComponentPreview>
        <CodeBlock
          code={`<Switch color="primary" defaultChecked label="Primary" />
<Switch color="success" defaultChecked label="Success" />
<Switch color="warning" defaultChecked label="Warning" />
<Switch color="danger" defaultChecked label="Danger" />`}
        />
      </section>

      {/* With Description */}
      <section className="space-y-4" id="with-labels">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">With Description</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Provide additional context by passing a <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">description</code> prop.
        </p>
        <ComponentPreview>
          <div className="flex flex-col gap-6">
            <Switch 
              defaultChecked 
              label="Email notifications" 
              description="Receive weekly digest emails about your account activity."
            />
            <Switch 
              disabled 
              label="Marketing emails" 
              description="Receive offers and product updates. (Disabled)"
            />
          </div>
        </ComponentPreview>
        <CodeBlock
          code={`<Switch 
  defaultChecked 
  label="Email notifications" 
  description="Receive weekly digest emails about your account activity."
/>
<Switch 
  disabled 
  label="Marketing emails" 
  description="Receive offers and product updates. (Disabled)"
/>`}
        />
      </section>

      {/* API Reference */}
      <section className="space-y-4" id="api">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">API Reference</h2>
        <ApiTable rows={apiRows} />
      </section>
    </div>
  );
}
