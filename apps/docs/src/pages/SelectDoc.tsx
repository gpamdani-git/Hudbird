// apps/docs/src/pages/SelectDoc.tsx
import selectCode from "../../../../packages/core/src/components/Select/Select.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import React, { useState } from "react";
import { PageToolbar } from "../components/PageToolbar";
import {
  Select,
  SelectItem,
  type SelectVariant,
  type SelectSize,
  type SelectRadius,
  Button,
} from "@hudbird/ui";
import {
  Shield,
  UserCheck,
  Eye,
  Settings,
  Sparkles,
  Globe,
  Lock,
  Mail,
  CheckCircle2,
} from "lucide-react";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";

export const selectTocItems = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "select-examples",
    title: "Select Examples",
    children: [
      { id: "basic-select", title: "Basic Select" },
      { id: "select-variants-sizes", title: "Variants & Sizes" },
      { id: "select-radius", title: "Corner Radii" },
      { id: "select-icons", title: "With Option Icons" },
      { id: "select-states", title: "Error & Disabled States" },
    ],
  },
];

export default function SelectDoc() {
  // --- Interactive Hero State ---
  const [heroValue, setHeroValue] = useState<string>("admin");
  const [heroVariant, setHeroVariant] = useState<SelectVariant>("flat");
  const [heroSize, setHeroSize] = useState<SelectSize>("md");
  const [heroRadius, setHeroRadius] = useState<SelectRadius>("md");

  // --- Example States ---
  const [roleValue, setRoleValue] = useState("editor");
  const [sizeSmVal, setSizeSmVal] = useState("eu");
  const [sizeMdVal, setSizeMdVal] = useState("us");
  const [sizeLgVal, setSizeLgVal] = useState("ap");
  const [iconVal, setIconVal] = useState("public");
  const [submitted, setSubmitted] = useState(false);

  // API Prop Tables
  const selectApiRows: ApiPropRow[] = [
    {
      prop: "value",
      defaultVal: "-",
      description: (
        <span>
          Controlled active selected key/value. Pair with{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            onValueChange
          </code>
          .
        </span>
      ),
    },
    {
      prop: "defaultValue",
      defaultVal: "''",
      description: "Default initial value for uncontrolled usage.",
    },
    {
      prop: "onValueChange",
      defaultVal: "-",
      description: (
        <span>
          Callback emitted when a user picks an option:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            (value: string) =&gt; void
          </code>
          .
        </span>
      ),
    },
    {
      prop: "placeholder",
      defaultVal: "'Select an option'",
      description: "Placeholder text shown when no item is selected.",
    },
    {
      prop: "label",
      defaultVal: "-",
      description: "Label text rendered above the Select trigger.",
    },
    {
      prop: "description",
      defaultVal: "-",
      description: "Helpful secondary text displayed beneath the trigger.",
    },
    {
      prop: "errorMessage",
      defaultVal: "-",
      description: "Validation error message displayed when isInvalid is true.",
    },
    {
      prop: "variant",
      defaultVal: "'flat'",
      description: (
        <span>
          Visual variant of the trigger:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'flat'
          </code>{" "}
          or{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'bordered'
          </code>
          .
        </span>
      ),
    },
    {
      prop: "size",
      defaultVal: "'md'",
      description: (
        <span>
          Control size scale:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'sm' | 'md' | 'lg'
          </code>
          .
        </span>
      ),
    },
    {
      prop: "radius",
      defaultVal: "'md'",
      description: (
        <span>
          Corner radius token:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'none' | 'md' | 'lg' | 'full'
          </code>
          .
        </span>
      ),
    },
    {
      prop: "isInvalid",
      defaultVal: "false",
      description: "Renders red validation highlight borders on the trigger.",
    },
    {
      prop: "disabled",
      defaultVal: "false",
      description: "Disables all user interaction and dims the trigger opacity.",
    },
  ];

  const selectItemApiRows: ApiPropRow[] = [
    {
      prop: "value",
      defaultVal: "required",
      description: "Unique string key identifier for this option item.",
    },
    {
      prop: "icon",
      defaultVal: "-",
      description: "Optional left-aligned leading icon for the option row.",
    },
    {
      prop: "disabled",
      defaultVal: "false",
      description: "Disables picking this specific item from the dropdown list.",
    },
    {
      prop: "children",
      defaultVal: "required",
      description: "Label and rendered content of the option.",
    },
  ];

  return (
    <div className="space-y-16 pb-24">
      {/* Header Section */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="w-full min-w-0 flex-1 pr-4">
          <div className="mb-3 flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
              Select
            </h1>
            <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              Component
            </span>
          </div>
          <p className="pr-8 text-base text-zinc-600 dark:text-zinc-400">
            Modular dropdown select component featuring pure React state interaction, outside click
            handling, animated chevron rotation, high-elevation floating menus, and comprehensive
            dark mode support.
          </p>
        </div>
        <PageToolbar />
      </div>

      {/* Hero Interactive Playground */}
      <section className="space-y-4">
        <ComponentPreview>
          <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center gap-6 py-4">
            {/* Customizer Controls Bar */}
            <div className="flex w-full flex-wrap items-center justify-center gap-3 rounded-2xl border border-zinc-200/80 bg-zinc-100/80 p-3 text-xs dark:border-zinc-800 dark:bg-zinc-900/80">
              {/* Variant Selector */}
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-zinc-500">Variant:</span>
                {(["flat", "bordered"] as SelectVariant[]).map((v) => (
                  <button
                    key={v}
                    onClick={() => setHeroVariant(v)}
                    className={`rounded-lg px-2.5 py-1 font-medium transition-all ${
                      heroVariant === v
                        ? "border border-zinc-200 bg-white text-zinc-950 shadow-xs dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                        : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>

              <div className="hidden h-4 w-[1px] bg-zinc-300 sm:block dark:bg-zinc-700" />

              {/* Size Selector */}
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-zinc-500">Size:</span>
                {(["sm", "md", "lg"] as SelectSize[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setHeroSize(s)}
                    className={`rounded-lg px-2.5 py-1 font-medium uppercase transition-all ${
                      heroSize === s
                        ? "border border-zinc-200 bg-white text-zinc-950 shadow-xs dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                        : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Interactive Select */}
            <div className="w-full">
              <Select
                label="Assigned Access Role"
                placeholder="Choose user permissions"
                value={heroValue}
                onValueChange={setHeroValue}
                variant={heroVariant}
                size={heroSize}
                radius={heroRadius}
                description="Governs data authorization levels across the workspace"
              >
                <SelectItem value="admin" icon={<Shield className="h-4 w-4 text-indigo-500" />}>
                  Administrator (Full Access)
                </SelectItem>
                <SelectItem
                  value="editor"
                  icon={<UserCheck className="h-4 w-4 text-emerald-500" />}
                >
                  Content Editor
                </SelectItem>
                <SelectItem value="viewer" icon={<Eye className="h-4 w-4 text-amber-500" />}>
                  Read-Only Viewer
                </SelectItem>
                <SelectItem value="billing" icon={<Settings className="h-4 w-4 text-zinc-500" />}>
                  Billing Manager
                </SelectItem>
              </Select>
            </div>

            {/* Selected feedback pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1.5 text-xs dark:border-zinc-800 dark:bg-zinc-900">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              <span className="font-medium text-zinc-500">Active Value:</span>
              <code className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                "{heroValue}"
              </code>
            </div>
          </div>
        </ComponentPreview>

        <CodeBlock
          code={`import { useState } from "react";
import { Select, SelectItem } from "@hudbird/ui";
import { Shield, UserCheck, Eye, Settings } from "lucide-react";

export default function SelectHero() {
  const [role, setRole] = useState("admin");

  return (
    <Select
      label="Assigned Access Role"
      placeholder="Choose user permissions"
      value={role}
      onValueChange={setRole}
      variant="${heroVariant}"
      size="${heroSize}"
      radius="${heroRadius}"
      description="Governs data authorization levels across the workspace"
    >
      <SelectItem value="admin" icon={<Shield className="w-4 h-4 text-indigo-500" />}>
        Administrator (Full Access)
      </SelectItem>
      <SelectItem value="editor" icon={<UserCheck className="w-4 h-4 text-emerald-500" />}>
        Content Editor
      </SelectItem>
      <SelectItem value="viewer" icon={<Eye className="w-4 h-4 text-amber-500" />}>
        Read-Only Viewer
      </SelectItem>
      <SelectItem value="billing" icon={<Settings className="w-4 h-4 text-zinc-500" />}>
        Billing Manager
      </SelectItem>
    </Select>
  );
}`}
        />
      </section>
      <div id="installation" className="scroll-mt-24 space-y-4">
        <InstallationTabs componentName="select" manualCode={selectCode} />
      </div>

      {/* Component API Documentation */}
      <section id="component-api" className="scroll-mt-24 space-y-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Component API
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Complete props interface specification for{" "}
            <code className="font-mono text-xs text-indigo-600 dark:text-indigo-400">
              &lt;Select&gt;
            </code>{" "}
            and{" "}
            <code className="font-mono text-xs text-indigo-600 dark:text-indigo-400">
              &lt;SelectItem&gt;
            </code>
            .
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Select Props</h3>
          <ApiTable rows={selectApiRows} />
        </div>

        <div className="space-y-4 pt-4">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            SelectItem Props
          </h3>
          <ApiTable rows={selectItemApiRows} />
        </div>
      </section>

      {/* Showcase Examples */}
      <section id="select-examples" className="space-y-12">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Select Examples
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Explore diverse usage patterns, layout variants, size scales, and validation states.
          </p>
        </div>

        {/* 1. Basic Select */}
        <div id="basic-select" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Basic Select</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Standard role selector with clean flat styling, chevron toggle indicator, and automatic
            outside click dismissal.
          </p>

          <ComponentPreview>
            <div className="mx-auto w-full max-w-sm py-2">
              <Select
                label="Select Role"
                placeholder="Choose account role..."
                value={roleValue}
                onValueChange={setRoleValue}
              >
                <SelectItem value="admin">Administrator</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </Select>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`<Select
  label="Select Role"
  placeholder="Choose account role..."
  value={role}
  onValueChange={setRole}
>
  <SelectItem value="admin">Administrator</SelectItem>
  <SelectItem value="editor">Editor</SelectItem>
  <SelectItem value="viewer">Viewer</SelectItem>
</Select>`}
          />
        </div>

        {/* 2. Variants & Sizes */}
        <div id="select-variants-sizes" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Select Variants & Sizes
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Compare <code className="font-mono text-xs">flat</code> and{" "}
            <code className="font-mono text-xs">bordered</code> styling across small (
            <code className="font-mono text-xs">sm</code>), medium (
            <code className="font-mono text-xs">md</code>), and large (
            <code className="font-mono text-xs">lg</code>) dimensions.
          </p>

          <ComponentPreview>
            <div className="mx-auto grid w-full max-w-2xl grid-cols-1 gap-6 py-2 md:grid-cols-2">
              {/* Flat Column */}
              <div className="space-y-4 rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-900/30">
                <span className="block text-xs font-bold tracking-wider text-zinc-500 uppercase">
                  Flat Variant (Default)
                </span>

                <Select
                  label="Small (sm - h-9)"
                  size="sm"
                  variant="flat"
                  value={sizeSmVal}
                  onValueChange={setSizeSmVal}
                >
                  <SelectItem value="us">United States (East)</SelectItem>
                  <SelectItem value="eu">Europe (Frankfurt)</SelectItem>
                  <SelectItem value="ap">Asia Pacific (Tokyo)</SelectItem>
                </Select>

                <Select
                  label="Medium (md - h-10)"
                  size="md"
                  variant="flat"
                  value={sizeMdVal}
                  onValueChange={setSizeMdVal}
                >
                  <SelectItem value="us">United States (East)</SelectItem>
                  <SelectItem value="eu">Europe (Frankfurt)</SelectItem>
                  <SelectItem value="ap">Asia Pacific (Tokyo)</SelectItem>
                </Select>

                <Select
                  label="Large (lg - h-12)"
                  size="lg"
                  variant="flat"
                  value={sizeLgVal}
                  onValueChange={setSizeLgVal}
                >
                  <SelectItem value="us">United States (East)</SelectItem>
                  <SelectItem value="eu">Europe (Frankfurt)</SelectItem>
                  <SelectItem value="ap">Asia Pacific (Tokyo)</SelectItem>
                </Select>
              </div>

              {/* Bordered Column */}
              <div className="space-y-4 rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-900/30">
                <span className="block text-xs font-bold tracking-wider text-zinc-500 uppercase">
                  Bordered Variant
                </span>

                <Select
                  label="Small (sm - h-9)"
                  size="sm"
                  variant="bordered"
                  value={sizeSmVal}
                  onValueChange={setSizeSmVal}
                >
                  <SelectItem value="us">United States (East)</SelectItem>
                  <SelectItem value="eu">Europe (Frankfurt)</SelectItem>
                  <SelectItem value="ap">Asia Pacific (Tokyo)</SelectItem>
                </Select>

                <Select
                  label="Medium (md - h-10)"
                  size="md"
                  variant="bordered"
                  value={sizeMdVal}
                  onValueChange={setSizeMdVal}
                >
                  <SelectItem value="us">United States (East)</SelectItem>
                  <SelectItem value="eu">Europe (Frankfurt)</SelectItem>
                  <SelectItem value="ap">Asia Pacific (Tokyo)</SelectItem>
                </Select>

                <Select
                  label="Large (lg - h-12)"
                  size="lg"
                  variant="bordered"
                  value={sizeLgVal}
                  onValueChange={setSizeLgVal}
                >
                  <SelectItem value="us">United States (East)</SelectItem>
                  <SelectItem value="eu">Europe (Frankfurt)</SelectItem>
                  <SelectItem value="ap">Asia Pacific (Tokyo)</SelectItem>
                </Select>
              </div>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`{/* Small Flat */}
<Select size="sm" variant="flat" label="Region" value={region} onValueChange={setRegion}>
  <SelectItem value="us">United States (East)</SelectItem>
  <SelectItem value="eu">Europe (Frankfurt)</SelectItem>
</Select>

{/* Medium Bordered */}
<Select size="md" variant="bordered" label="Region" value={region} onValueChange={setRegion}>
  <SelectItem value="us">United States (East)</SelectItem>
  <SelectItem value="eu">Europe (Frankfurt)</SelectItem>
</Select>

{/* Large Bordered */}
<Select size="lg" variant="bordered" label="Region" value={region} onValueChange={setRegion}>
  <SelectItem value="us">United States (East)</SelectItem>
  <SelectItem value="eu">Europe (Frankfurt)</SelectItem>
</Select>`}
          />
        </div>

        {/* 3. Corner Radii */}
        <div id="select-radius" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Corner Radii</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Shape tokens ranging from modern rounded (<code className="font-mono text-xs">md</code>{" "}
            / <code className="font-mono text-xs">lg</code>) to full pill (
            <code className="font-mono text-xs">full</code>).
          </p>

          <ComponentPreview>
            <div className="mx-auto grid w-full max-w-2xl grid-cols-1 gap-4 py-2 sm:grid-cols-3">
              <Select label="Radius: md (rounded-xl)" radius="md" defaultValue="standard">
                <SelectItem value="basic">Basic Tier</SelectItem>
                <SelectItem value="standard">Standard Tier</SelectItem>
                <SelectItem value="pro">Pro Tier</SelectItem>
              </Select>

              <Select label="Radius: lg (rounded-2xl)" radius="lg" defaultValue="pro">
                <SelectItem value="basic">Basic Tier</SelectItem>
                <SelectItem value="standard">Standard Tier</SelectItem>
                <SelectItem value="pro">Pro Tier</SelectItem>
              </Select>

              <Select label="Radius: full (rounded-full)" radius="full" defaultValue="pro">
                <SelectItem value="basic">Basic Tier</SelectItem>
                <SelectItem value="standard">Standard Tier</SelectItem>
                <SelectItem value="pro">Pro Tier</SelectItem>
              </Select>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`<Select radius="md" label="Standard" defaultValue="standard">
  <SelectItem value="standard">Standard Tier</SelectItem>
</Select>

<Select radius="lg" label="Enhanced" defaultValue="pro">
  <SelectItem value="pro">Pro Tier</SelectItem>
</Select>

<Select radius="full" label="Pill Rounded" defaultValue="pro">
  <SelectItem value="pro">Pro Tier</SelectItem>
</Select>`}
          />
        </div>

        {/* 4. With Option Icons */}
        <div id="select-icons" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            With Option Icons
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Enhance visual clarity and recognition by passing custom icons into individual{" "}
            <code className="font-mono text-xs">&lt;SelectItem icon=...&gt;</code> rows.
          </p>

          <ComponentPreview>
            <div className="mx-auto w-full max-w-sm py-2">
              <Select
                label="Repository Visibility"
                value={iconVal}
                onValueChange={setIconVal}
                description="Controls who can fork or clone this repository"
              >
                <SelectItem value="public" icon={<Globe className="h-4 w-4 text-emerald-500" />}>
                  Public (Anyone on the internet)
                </SelectItem>
                <SelectItem value="private" icon={<Lock className="h-4 w-4 text-rose-500" />}>
                  Private (Restricted to members)
                </SelectItem>
                <SelectItem
                  value="internal"
                  icon={<Sparkles className="h-4 w-4 text-indigo-500" />}
                >
                  Internal (Organization only)
                </SelectItem>
              </Select>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`<Select label="Repository Visibility" value={visibility} onValueChange={setVisibility}>
  <SelectItem value="public" icon={<Globe className="w-4 h-4 text-emerald-500" />}>
    Public (Anyone on the internet)
  </SelectItem>
  <SelectItem value="private" icon={<Lock className="w-4 h-4 text-rose-500" />}>
    Private (Restricted to members)
  </SelectItem>
</Select>`}
          />
        </div>

        {/* 5. Error & Disabled States */}
        <div id="select-states" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Error & Disabled States
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Display validation feedback when <code className="font-mono text-xs">isInvalid</code> is
            triggered, or prevent interactions with{" "}
            <code className="font-mono text-xs">disabled</code>.
          </p>

          <ComponentPreview>
            <div className="mx-auto grid w-full max-w-xl grid-cols-1 gap-6 py-2 sm:grid-cols-2">
              {/* Invalid Select */}
              <Select
                label="Notification Email Channel"
                placeholder="Choose destination channel"
                isInvalid={true}
                errorMessage="Please select a verified notification channel."
                defaultValue=""
              >
                <SelectItem value="primary" icon={<Mail className="h-4 w-4 text-zinc-500" />}>
                  Primary Admin Email
                </SelectItem>
                <SelectItem value="security" icon={<Shield className="h-4 w-4 text-zinc-500" />}>
                  Security Incident Desk
                </SelectItem>
              </Select>

              {/* Disabled Select */}
              <Select
                label="Organization Plan (Locked)"
                defaultValue="enterprise"
                disabled={true}
                description="Upgraded by Workspace Owner"
              >
                <SelectItem value="enterprise">Enterprise Custom Tier</SelectItem>
                <SelectItem value="team">Team Tier</SelectItem>
              </Select>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`{/* Invalid with Error Message */}
<Select
  label="Notification Email Channel"
  placeholder="Choose destination channel"
  isInvalid={true}
  errorMessage="Please select a verified notification channel."
>
  <SelectItem value="primary">Primary Admin Email</SelectItem>
</Select>

{/* Disabled Select */}
<Select
  label="Organization Plan (Locked)"
  defaultValue="enterprise"
  disabled={true}
  description="Upgraded by Workspace Owner"
>
  <SelectItem value="enterprise">Enterprise Custom Tier</SelectItem>
</Select>`}
          />
        </div>
      </section>
    </div>
  );
}
