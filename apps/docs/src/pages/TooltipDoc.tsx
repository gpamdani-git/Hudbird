// apps/docs/src/pages/TooltipDoc.tsx
import tooltipCode from "../../../../packages/core/src/components/Tooltip/Tooltip.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import React, { useState } from "react";
import { PageToolbar } from "../components/PageToolbar";
import { Tooltip, Button, Avatar, Badge } from "@hudbird/ui";
import { Info, HelpCircle, Bell, Share2, Sparkles, Check, Heart } from "lucide-react";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";

export const tooltipTocItems = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "basic-tooltip", title: "Basic Usage" },
      { id: "tooltip-placements", title: "Placements (Top, Bottom, Left, Right)" },
      { id: "tooltip-colors", title: "Color Options" },
      { id: "delay-timing", title: "Delay Timers" },
      { id: "rich-content", title: "Rich Custom Content" },
      { id: "custom-radius", title: "Radius Options" },
      { id: "controlled-state", title: "Controlled State" },
    ],
  },
];

export default function TooltipDoc() {
  const [isControlledOpen, setIsControlledOpen] = useState(false);

  const tooltipApiRows: ApiPropRow[] = [
    {
      prop: "content",
      type: "ReactNode",
      defaultVal: "-",
      description: "Content rendered inside the floating tooltip popover (required).",
    },
    {
      prop: "children",
      type: "ReactElement",
      defaultVal: "-",
      description: "Target trigger element that activates the tooltip upon hover/focus.",
    },
    {
      prop: "placement",
      type: '"top" | "bottom" | "left" | "right"',
      defaultVal: '"top"',
      description: "Preferred positioning relative to the anchor trigger.",
    },
    {
      prop: "color",
      type: '"default" | "foreground" | "primary" | "secondary" | "success" | "warning" | "danger"',
      defaultVal: '"default"',
      description: "Background and border color theme of the tooltip bubble.",
    },
    {
      prop: "size",
      type: '"sm" | "md" | "lg"',
      defaultVal: '"md"',
      description: "Padding and font size dimensions.",
    },
    {
      prop: "radius",
      type: '"none" | "sm" | "md" | "lg" | "full"',
      defaultVal: '"md"',
      description: "Border radius curvature.",
    },
    {
      prop: "showArrow",
      type: "boolean",
      defaultVal: "true",
      description: "Whether to display the directional arrow pointing to trigger.",
    },
    {
      prop: "delay",
      type: "number",
      defaultVal: "150",
      description: "Delay in milliseconds before the tooltip appears on hover/focus.",
    },
    {
      prop: "closeDelay",
      type: "number",
      defaultVal: "100",
      description: "Delay in milliseconds before the tooltip dismisses on mouse exit.",
    },
    {
      prop: "offset",
      type: "number",
      defaultVal: "8",
      description: "Distance spacing in pixels between target element and tooltip.",
    },
    {
      prop: "isOpen",
      type: "boolean",
      defaultVal: "-",
      description: "Controlled open visibility state.",
    },
    {
      prop: "onOpenChange",
      type: "(open: boolean) => void",
      defaultVal: "-",
      description: "Callback invoked when visibility changes.",
    },
    {
      prop: "isDisabled",
      type: "boolean",
      defaultVal: "false",
      description: "Prevents tooltip from appearing.",
    },
  ];

  return (
    <div className="space-y-16 pb-24">
      {/* Title & Subtitle */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="w-full min-w-0 flex-1 pr-4">
          <div className="mb-3 flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
              Tooltip
            </h1>
            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              New
            </span>
            <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              Component
            </span>
          </div>
          <p className="pr-8 text-base text-zinc-600 dark:text-zinc-400">
            Tooltips display contextual informational labels when users hover over or focus an
            interactive element, with automatic directional arrows and full keyboard support.
          </p>
        </div>
        <PageToolbar />
      </div>

      {/* Main Preview */}
      <section className="space-y-4">
        <ComponentPreview>
          <div className="flex flex-wrap items-center justify-center gap-6 py-8">
            <Tooltip content="Quickly share this link with colleagues" color="primary">
              <Button variant="solid" startContent={<Share2 className="h-4 w-4" />}>
                Hover me
              </Button>
            </Tooltip>

            <Tooltip content="Add item to saved favorites" color="danger">
              <Button variant="outline" startContent={<Heart className="h-4 w-4 text-rose-500" />}>
                Like project
              </Button>
            </Tooltip>

            <Tooltip content="All systems operational and synced" color="success">
              <Button variant="flat" startContent={<Check className="h-4 w-4 text-emerald-500" />}>
                System status
              </Button>
            </Tooltip>
          </div>
        </ComponentPreview>

        <CodeBlock
          code={`import { Tooltip } from "@/components/hudbird-ui/Tooltip";\nimport { Button } from "@/components/hudbird-ui/Button";
import { Share2 } from "lucide-react";

export default function Example() {
  return (
    <Tooltip content="Quickly share this link with colleagues" color="primary">
      <Button startContent={<Share2 className="w-4 h-4" />}>
        Hover me
      </Button>
    </Tooltip>
  );
}`}
        />
      </section>
      <div id="installation" className="scroll-mt-24 space-y-4">
        <InstallationTabs componentName="tooltip" manualCode={tooltipCode} />
      </div>

      {/* Component API */}
      <section className="space-y-6" id="component-api">
        <div className="border-b border-zinc-200 pb-2 dark:border-zinc-800">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Component API</h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Complete prop specification for the{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-xs dark:bg-zinc-800">
              Tooltip
            </code>{" "}
            component.
          </p>
        </div>

        <ApiTable rows={tooltipApiRows} />
      </section>

      {/* Examples & Variants */}
      <div className="space-y-12" id="examples">
        <div className="border-b border-zinc-200 pb-2 dark:border-zinc-800">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Examples & Variants
          </h2>
        </div>

        {/* Basic Usage */}
        <section className="space-y-4" id="basic-tooltip">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Basic Usage</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Wrap any button, link, or icon with Tooltip to attach accessible helper text.
          </p>
          <ComponentPreview>
            <div className="flex items-center justify-center gap-4 py-4">
              <Tooltip content="Need help? Read our documentation">
                <Button
                  variant="bordered"
                  size="sm"
                  startContent={<HelpCircle className="h-4 w-4" />}
                >
                  Help
                </Button>
              </Tooltip>

              <Tooltip content="You have 3 unread notifications">
                <button
                  type="button"
                  className="rounded-full p-2 text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5" />
                </button>
              </Tooltip>
            </div>
          </ComponentPreview>
          <CodeBlock
            code={`<Tooltip content="Need help? Read our documentation">
  <Button variant="bordered" size="sm" startContent={<HelpCircle className="w-4 h-4" />}>
    Help
  </Button>
</Tooltip>`}
          />
        </section>

        {/* Placements */}
        <section className="space-y-4" id="tooltip-placements">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            Placements (Top, Bottom, Left, Right)
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Set{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">
              placement
            </code>{" "}
            to position the popup on any of the 4 cardinal directions.
          </p>
          <ComponentPreview>
            <div className="flex flex-wrap items-center justify-center gap-6 py-6">
              <Tooltip content="Tooltip on top" placement="top">
                <Button size="sm">Top</Button>
              </Tooltip>

              <Tooltip content="Tooltip on bottom" placement="bottom">
                <Button size="sm">Bottom</Button>
              </Tooltip>

              <Tooltip content="Tooltip on left" placement="left">
                <Button size="sm">Left</Button>
              </Tooltip>

              <Tooltip content="Tooltip on right" placement="right">
                <Button size="sm">Right</Button>
              </Tooltip>
            </div>
          </ComponentPreview>
          <CodeBlock
            code={`<Tooltip content="Tooltip on top" placement="top"><Button>Top</Button></Tooltip>
<Tooltip content="Tooltip on bottom" placement="bottom"><Button>Bottom</Button></Tooltip>
<Tooltip content="Tooltip on left" placement="left"><Button>Left</Button></Tooltip>
<Tooltip content="Tooltip on right" placement="right"><Button>Right</Button></Tooltip>`}
          />
        </section>

        {/* Colors */}
        <section className="space-y-4" id="tooltip-colors">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            Color Options
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Select from semantic tones matching the component library color palette.
          </p>
          <ComponentPreview>
            <div className="flex flex-wrap items-center justify-center gap-4 py-4">
              <Tooltip content="Default theme" color="default">
                <Button size="sm" variant="bordered">
                  Default
                </Button>
              </Tooltip>
              <Tooltip content="Primary indigo theme" color="primary">
                <Button size="sm" variant="bordered">
                  Primary
                </Button>
              </Tooltip>
              <Tooltip content="Secondary purple theme" color="secondary">
                <Button size="sm" variant="bordered">
                  Secondary
                </Button>
              </Tooltip>
              <Tooltip content="Success emerald theme" color="success">
                <Button size="sm" variant="bordered">
                  Success
                </Button>
              </Tooltip>
              <Tooltip content="Warning amber theme" color="warning">
                <Button size="sm" variant="bordered">
                  Warning
                </Button>
              </Tooltip>
              <Tooltip content="Danger rose theme" color="danger">
                <Button size="sm" variant="bordered">
                  Danger
                </Button>
              </Tooltip>
            </div>
          </ComponentPreview>
          <CodeBlock
            code={`<Tooltip content="Default" color="default"><Button>Default</Button></Tooltip>
<Tooltip content="Primary" color="primary"><Button>Primary</Button></Tooltip>
<Tooltip content="Success" color="success"><Button>Success</Button></Tooltip>
<Tooltip content="Danger" color="danger"><Button>Danger</Button></Tooltip>`}
          />
        </section>

        {/* Delay Timers */}
        <section className="space-y-4" id="delay-timing">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Delay Timers</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Customize{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">delay</code>{" "}
            (entry time) and{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">
              closeDelay
            </code>{" "}
            (dismissal time) in milliseconds.
          </p>
          <ComponentPreview>
            <div className="flex items-center justify-center gap-6 py-4">
              <Tooltip content="Instant tooltip (0ms delay)" delay={0}>
                <Button variant="solid" size="sm">
                  Instant (0ms)
                </Button>
              </Tooltip>

              <Tooltip content="Slow reveal (500ms delay)" delay={500}>
                <Button variant="bordered" size="sm">
                  Slow (500ms)
                </Button>
              </Tooltip>
            </div>
          </ComponentPreview>
          <CodeBlock
            code={`<Tooltip content="Instant tooltip" delay={0}>
  <Button>Instant (0ms)</Button>
</Tooltip>
<Tooltip content="Slow reveal" delay={500}>
  <Button>Slow (500ms)</Button>
</Tooltip>`}
          />
        </section>

        {/* Rich Custom Content */}
        <section className="space-y-4" id="rich-content">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            Rich Custom Content
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            The{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">
              content
            </code>{" "}
            prop accepts any React node, including avatars, badges, and formatted cards.
          </p>
          <ComponentPreview>
            <div className="flex items-center justify-center py-4">
              <Tooltip
                color="default"
                content={
                  <div className="flex items-center gap-3 p-1">
                    <Avatar
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                      name="Sarah Doe"
                      size="sm"
                    />
                    <div className="text-left">
                      <p className="text-xs font-semibold text-white dark:text-zinc-900">
                        Sarah Doe
                      </p>
                      <p className="text-[10px] text-zinc-400 dark:text-zinc-600">
                        Design Lead · Active now
                      </p>
                    </div>
                  </div>
                }
              >
                <Button variant="flat" size="sm">
                  User profile
                </Button>
              </Tooltip>
            </div>
          </ComponentPreview>
          <CodeBlock
            code={`<Tooltip
  content={
    <div className="flex items-center gap-3 p-1">
      <Avatar name="Sarah Doe" size="sm" />
      <div>
        <p className="text-xs font-semibold">Sarah Doe</p>
        <p className="text-[10px] text-zinc-400">Design Lead · Active now</p>
      </div>
    </div>
  }
>
  <Button variant="flat">User profile</Button>
</Tooltip>`}
          />
        </section>

        {/* Radius Options */}
        <section className="space-y-4" id="custom-radius">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            Radius Options
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Adjust the border radius of the tooltip bubble.
          </p>
          <ComponentPreview>
            <div className="flex flex-wrap items-center justify-center gap-4 py-4">
              <Tooltip content="Square edges" radius="none">
                <Button size="sm" variant="bordered">
                  None
                </Button>
              </Tooltip>
              <Tooltip content="Small radius" radius="sm">
                <Button size="sm" variant="bordered">
                  Small
                </Button>
              </Tooltip>
              <Tooltip content="Medium radius" radius="md">
                <Button size="sm" variant="bordered">
                  Medium (md)
                </Button>
              </Tooltip>
              <Tooltip content="Large radius" radius="lg">
                <Button size="sm" variant="bordered">
                  Large (lg)
                </Button>
              </Tooltip>
              <Tooltip content="Pill full radius" radius="full">
                <Button size="sm" variant="bordered">
                  Full Pill
                </Button>
              </Tooltip>
            </div>
          </ComponentPreview>
          <CodeBlock
            code={`<Tooltip content="None" radius="none"><Button>None</Button></Tooltip>
<Tooltip content="Full" radius="full"><Button>Full</Button></Tooltip>`}
          />
        </section>

        {/* Controlled State */}
        <section className="space-y-4" id="controlled-state">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            Controlled State
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Control the tooltip's open state programmatically with{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">isOpen</code>{" "}
            and{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">
              onOpenChange
            </code>
            .
          </p>
          <ComponentPreview>
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="flat"
                  onClick={() => setIsControlledOpen(!isControlledOpen)}
                >
                  {isControlledOpen ? "Close Tooltip" : "Open Tooltip"}
                </Button>
              </div>

              <Tooltip
                content="Programmatically controlled tooltip!"
                color="primary"
                isOpen={isControlledOpen}
                onOpenChange={setIsControlledOpen}
              >
                <div className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium dark:border-zinc-800">
                  Target Anchor Element
                </div>
              </Tooltip>
            </div>
          </ComponentPreview>
          <CodeBlock
            code={`const [isOpen, setIsOpen] = useState(false);

<Button onClick={() => setIsOpen(!isOpen)}>Toggle</Button>
<Tooltip content="Controlled!" isOpen={isOpen} onOpenChange={setIsOpen}>
  <div>Target Anchor</div>
</Tooltip>`}
          />
        </section>
      </div>
    </div>
  );
}
