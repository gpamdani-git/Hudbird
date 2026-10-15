// apps/docs/src/pages/PopoverDoc.tsx
import popoverCode from "../../../../packages/core/src/components/Popover/Popover.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import React, { useState } from "react";
import { PageToolbar } from "../components/PageToolbar";
import { Popover, PopoverTrigger, PopoverContent, Button, Input, Badge } from "@hudbird/ui";
import { Settings, Info, Bell, User, Check } from "lucide-react";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";

export const popoverTocItems = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "placements", title: "Placements" },
      { id: "interactive-card", title: "Interactive card" },
      { id: "form-popover", title: "Form in Popover" },
    ],
  },
];

export default function PopoverDoc() {
  const [placement, setPlacement] = useState<"top" | "bottom" | "left" | "right">("bottom");

  const apiRows: ApiPropRow[] = [
    {
      prop: "isOpen",
      defaultVal: "undefined",
      description: "Optional controlled open state for external management.",
    },
    {
      prop: "onOpenChange",
      defaultVal: "-",
      description: "Callback invoked when open state changes via click or dismissal.",
    },
    {
      prop: "placement",
      defaultVal: "'bottom'",
      description: (
        <span>
          Floating alignment relative to trigger:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'top'
          </code>
          ,{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'bottom'
          </code>
          ,{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'left'
          </code>
          , or{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'right'
          </code>{" "}
          (plus -start and -end variations).
        </span>
      ),
    },
    {
      prop: "offset",
      defaultVal: "8",
      description: "Distance in pixels between trigger and popover surface.",
    },
  ];

  return (
    <div className="space-y-16 pb-24">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="w-full min-w-0 flex-1 pr-4">
          <div className="mb-3 flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
              Popover
            </h1>
            <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              Component
            </span>
          </div>
          <p className="pr-8 text-base text-zinc-600 dark:text-zinc-400">
            Accessible floating container triggered by click, with outside-click detection, keyboard
            navigation, and smooth spring entry.
          </p>
        </div>
        <PageToolbar />
      </div>

      {/* Main Preview */}
      <section className="space-y-4">
        <ComponentPreview>
          <div className="flex items-center justify-center py-8">
            <Popover placement="bottom">
              <PopoverTrigger>
                <Button variant="solid">
                  <Settings className="h-4 w-4" />
                  View Settings
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72 p-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">Preferences</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Configure notifications and telemetry defaults for this project.
                  </p>
                  <div className="flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-800">
                    <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                      Auto-sync
                    </span>
                    <Badge variant="flat" color="success">
                      Active
                    </Badge>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </ComponentPreview>

        <CodeBlock
          code={`import { Popover, PopoverTrigger, PopoverContent, Button } from "@hudbird/ui";

export function Example() {
  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4">
        <h4 className="font-semibold">Contextual Card</h4>
        <p className="text-sm text-zinc-500">Accessible floating dropdown.</p>
      </PopoverContent>
    </Popover>
  );
}`}
        />
      </section>

      {/* Installation */}
      <div id="installation" className="scroll-mt-24 space-y-4">
        <InstallationTabs componentName="popover" manualCode={popoverCode} />
      </div>

      {/* Component API */}
      <section id="component-api" className="scroll-mt-24 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Component API
        </h2>
        <ApiTable
          note={
            <span>
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">Popover</strong>{" "}
              supports both uncontrolled click triggering and controlled state via{" "}
              <code className="font-mono text-xs">isOpen</code>.
            </span>
          }
          rows={apiRows}
        />
      </section>

      {/* Examples */}
      <section id="examples" className="scroll-mt-24 space-y-14">
        <div>
          <h2 className="mb-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Examples
          </h2>
        </div>

        {/* 1. Placements */}
        <div id="placements" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Placements</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Place the floating card relative to any side of the trigger:
          </p>

          <ComponentPreview>
            <div className="flex flex-wrap items-center justify-center gap-6 py-6">
              {(["top", "bottom", "left", "right"] as const).map((pos) => (
                <Popover key={pos} placement={pos}>
                  <PopoverTrigger>
                    <Button variant="bordered" size="sm">
                      {pos.toUpperCase()}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-3 text-center text-xs text-zinc-600 dark:text-zinc-300">
                    Floating aligned to <strong>{pos}</strong>
                  </PopoverContent>
                </Popover>
              ))}
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`<Popover placement="top"><PopoverTrigger><Button>Top</Button></PopoverTrigger>...</Popover>
<Popover placement="bottom"><PopoverTrigger><Button>Bottom</Button></PopoverTrigger>...</Popover>
<Popover placement="left"><PopoverTrigger><Button>Left</Button></PopoverTrigger>...</Popover>
<Popover placement="right"><PopoverTrigger><Button>Right</Button></PopoverTrigger>...</Popover>`}
          />
        </div>

        {/* 2. Interactive Card */}
        <div id="interactive-card" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Interactive card
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Rich popovers with profile headers and quick action buttons:
          </p>

          <ComponentPreview>
            <div className="flex items-center justify-center py-6">
              <Popover placement="bottom">
                <PopoverTrigger>
                  <Button variant="flat">
                    <User className="h-4 w-4" />
                    Dani Akbar
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 space-y-3 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/10 font-semibold text-indigo-600">
                      DA
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        Dani Akbar
                      </p>
                      <p className="text-xs text-zinc-500">Lead Architect</p>
                    </div>
                  </div>
                  <div className="border-t border-zinc-100 pt-3 dark:border-zinc-800">
                    <Button variant="solid" size="sm" className="w-full">
                      View Profile
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`<Popover placement="bottom">
  <PopoverTrigger>
    <Button variant="flat">User Profile</Button>
  </PopoverTrigger>
  <PopoverContent className="w-64 p-4">
    <p className="font-semibold">Dani Akbar</p>
    <Button size="sm" className="mt-3 w-full">View Profile</Button>
  </PopoverContent>
</Popover>`}
          />
        </div>
      </section>
    </div>
  );
}
