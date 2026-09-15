// apps/docs/src/pages/BadgeDoc.tsx
import badgeCode from "../../../../packages/core/src/components/Badge/Badge.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import React, { useState } from "react";
import { PageToolbar } from "../components/PageToolbar";
import { Badge, Avatar, Button } from "@hudbird/ui";
import { Bell, Mail, ShoppingCart, MessageSquare, Check, Sparkles } from "lucide-react";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";

export const badgeTocItems = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "standalone-variants", title: "Variants & Colors" },
      { id: "badge-sizes", title: "Badge sizes" },
      { id: "floating-notifications", title: "Floating on Avatar & Button" },
      { id: "dot-indicators", title: "Dot status indicators" },
      { id: "placements", title: "Badge placements" },
    ],
  },
];

export default function BadgeDoc() {
  const [counter, setCounter] = useState(3);

  const apiRows: ApiPropRow[] = [
    {
      prop: "variant",
      defaultVal: "'solid'",
      description: (
        <span>
          Visual styling of the badge:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'solid'
          </code>
          ,{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'soft'
          </code>
          , or{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'outline'
          </code>
          .
        </span>
      ),
    },
    {
      prop: "color",
      defaultVal: "'primary'",
      description: (
        <span>
          Color theme palette:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'primary'
          </code>{" "}
          (Indigo),{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'success'
          </code>{" "}
          (Emerald),{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'warning'
          </code>{" "}
          (Amber), or{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'danger'
          </code>{" "}
          (Rose).
        </span>
      ),
    },
    {
      prop: "size",
      defaultVal: "'md'",
      description: (
        <span>
          Size scale:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'sm'
          </code>{" "}
          (text-[10px]),{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'md'
          </code>{" "}
          (text-xs), or{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'lg'
          </code>{" "}
          (text-sm).
        </span>
      ),
    },
    {
      prop: "content",
      defaultVal: "-",
      description:
        "Content (text, number, or icon) displayed in the floating badge over a wrapped child.",
    },
    {
      prop: "placement",
      defaultVal: "'top-right'",
      description: (
        <span>
          Corner positioning when wrapping an element:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'top-right'
          </code>
          ,{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'top-left'
          </code>
          ,{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'bottom-right'
          </code>
          , or{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'bottom-left'
          </code>
          .
        </span>
      ),
    },
    {
      prop: "isDot",
      defaultVal: "false",
      description: "Renders as a compact status indicator dot without text content.",
    },
    {
      prop: "isInvisible",
      defaultVal: "false",
      description: "Toggles visibility of the badge without unmounting.",
    },
  ];

  return (
    <div className="space-y-16 pb-24">
      {/* Title & Subtitle */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="w-full min-w-0 flex-1 pr-4">
          <div className="mb-3 flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
              Badge
            </h1>
            <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              Component
            </span>
          </div>
          <p className="pr-8 text-base text-zinc-600 dark:text-zinc-400">
            Small status descriptors, labels, and notification counters used for highlighting
            metadata or activity.
          </p>
        </div>
        <PageToolbar />
      </div>

      {/* Main Preview & Code */}
      <section className="space-y-4">
        <ComponentPreview>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {/* Standalone Badges */}
            <div className="flex items-center gap-2">
              <Badge variant="solid" color="primary">
                New
              </Badge>
              <Badge variant="soft" color="success">
                Active
              </Badge>
              <Badge variant="outline" color="warning">
                Pending
              </Badge>
              <Badge variant="solid" color="danger">
                Failed
              </Badge>
            </div>

            <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800" />

            {/* Floating on Avatar & Button */}
            <div className="flex items-center gap-5">
              <Badge content="5" color="danger" size="sm">
                <Avatar
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80"
                  size="md"
                />
              </Badge>

              <Badge content="99+" color="primary" size="sm">
                <Button variant="outline" size="sm" className="px-3">
                  <Mail className="mr-1.5 h-4 w-4" />
                  Inbox
                </Button>
              </Badge>
            </div>
          </div>
        </ComponentPreview>

        <CodeBlock
          code={`import { Badge } from "@/components/hudbird-ui/Badge";\nimport { Avatar } from "@/components/hudbird-ui/Avatar";\nimport { Button } from "@/components/hudbird-ui/Button";

function Example() {
  return (
    <div className="flex items-center gap-4">
      {/* Standalone Badges */}
      <Badge variant="solid" color="primary">New</Badge>
      <Badge variant="soft" color="success">Active</Badge>

      {/* Floating on Avatar & Button */}
      <Badge content="5" color="danger" size="sm">
        <Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb" />
      </Badge>

      <Badge content="99+" color="primary" size="sm">
        <Button variant="outline" size="sm">Inbox</Button>
      </Badge>
    </div>
  )
}`}
        />
      </section>
      <div id="installation" className="scroll-mt-24 space-y-4">
        <InstallationTabs componentName="badge" manualCode={badgeCode} />
      </div>

      {/* Component API */}
      <section id="component-api" className="scroll-mt-24 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Component API
        </h2>
        <ApiTable
          note={
            <span>
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">Badge</strong>{" "}
              automatically handles relative positioning, corner placement offsets, and full
              dark-mode palette balance.
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

        {/* 1. Standalone Variants & Colors */}
        <div id="standalone-variants" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Variants & Colors
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Choose between{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              'solid'
            </code>
            ,{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              'soft'
            </code>
            , and{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              'outline'
            </code>{" "}
            across all semantic color states:
          </p>

          <ComponentPreview>
            <div className="flex w-full max-w-lg flex-col gap-5">
              {/* Solid Row */}
              <div className="flex items-center justify-between">
                <span className="w-16 font-mono text-xs text-zinc-400">solid:</span>
                <div className="flex items-center gap-2.5">
                  <Badge variant="solid" color="primary">
                    Primary
                  </Badge>
                  <Badge variant="solid" color="success">
                    Success
                  </Badge>
                  <Badge variant="solid" color="warning">
                    Warning
                  </Badge>
                  <Badge variant="solid" color="danger">
                    Danger
                  </Badge>
                </div>
              </div>

              {/* Soft Row */}
              <div className="flex items-center justify-between">
                <span className="w-16 font-mono text-xs text-zinc-400">soft:</span>
                <div className="flex items-center gap-2.5">
                  <Badge variant="soft" color="primary">
                    Primary
                  </Badge>
                  <Badge variant="soft" color="success">
                    Success
                  </Badge>
                  <Badge variant="soft" color="warning">
                    Warning
                  </Badge>
                  <Badge variant="soft" color="danger">
                    Danger
                  </Badge>
                </div>
              </div>

              {/* Outline Row */}
              <div className="flex items-center justify-between">
                <span className="w-16 font-mono text-xs text-zinc-400">outline:</span>
                <div className="flex items-center gap-2.5">
                  <Badge variant="outline" color="primary">
                    Primary
                  </Badge>
                  <Badge variant="outline" color="success">
                    Success
                  </Badge>
                  <Badge variant="outline" color="warning">
                    Warning
                  </Badge>
                  <Badge variant="outline" color="danger">
                    Danger
                  </Badge>
                </div>
              </div>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Badge } from "@/components/hudbird-ui/Badge";

function Example() {
  return (
    <>
      {/* Solid */}
      <Badge variant="solid" color="primary">Primary</Badge>
      <Badge variant="solid" color="success">Success</Badge>
      <Badge variant="solid" color="warning">Warning</Badge>
      <Badge variant="solid" color="danger">Danger</Badge>

      {/* Soft */}
      <Badge variant="soft" color="primary">Primary</Badge>
      <Badge variant="soft" color="success">Success</Badge>
      <Badge variant="soft" color="warning">Warning</Badge>
      <Badge variant="soft" color="danger">Danger</Badge>

      {/* Outline */}
      <Badge variant="outline" color="primary">Primary</Badge>
      <Badge variant="outline" color="success">Success</Badge>
      <Badge variant="outline" color="warning">Warning</Badge>
      <Badge variant="outline" color="danger">Danger</Badge>
    </>
  )
}`}
          />
        </div>

        {/* 2. Badge Sizes */}
        <div id="badge-sizes" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Badge sizes</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Badges are available in three proportions:{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              'sm'
            </code>
            ,{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              'md'
            </code>
            , and{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              'lg'
            </code>
            :
          </p>

          <ComponentPreview>
            <div className="flex items-center gap-4">
              <Badge size="sm" variant="soft" color="primary">
                Small (sm)
              </Badge>
              <Badge size="md" variant="soft" color="primary">
                Medium (md)
              </Badge>
              <Badge size="lg" variant="soft" color="primary">
                Large (lg)
              </Badge>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Badge } from "@/components/hudbird-ui/Badge";

function Example() {
  return (
    <div className="flex items-center gap-4">
      <Badge size="sm" variant="soft" color="primary">Small</Badge>
      <Badge size="md" variant="soft" color="primary">Medium</Badge>
      <Badge size="lg" variant="soft" color="primary">Large</Badge>
    </div>
  )
}`}
          />
        </div>

        {/* 3. Floating on Avatar & Button */}
        <div id="floating-notifications" className="scroll-mt-24 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Floating on Avatar & Button
            </h3>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setCounter((c) => Math.max(0, c - 1))}
              >
                -1
              </Button>
              <Button size="sm" variant="outline" onClick={() => setCounter((c) => c + 1)}>
                +1
              </Button>
            </div>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Wrap any target element with{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              &lt;Badge content=&#123;...&#125;&gt;
            </code>{" "}
            to render a floating notification counter:
          </p>

          <ComponentPreview>
            <div className="flex flex-wrap items-center justify-center gap-8 py-2">
              {/* Avatar Notification */}
              <Badge
                content={counter > 0 ? counter : undefined}
                isInvisible={counter === 0}
                color="danger"
                size="sm"
              >
                <Avatar
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80"
                  size="lg"
                />
              </Badge>

              {/* Shopping Cart Button */}
              <Badge content={counter > 0 ? counter : undefined} color="primary" size="sm">
                <Button variant="outline" className="gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Cart
                </Button>
              </Badge>

              {/* Icon-Only Button */}
              <Badge content="12" color="danger" size="sm">
                <Button variant="outline" className="h-10 w-10 p-0">
                  <Bell className="h-4 w-4" />
                </Button>
              </Badge>

              {/* Verified Status on Avatar */}
              <Badge
                content={<Check className="h-2.5 w-2.5 stroke-[3]" />}
                color="success"
                size="sm"
                placement="bottom-right"
              >
                <Avatar name="Alex Rivera" color="primary" size="lg" />
              </Badge>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Badge } from "@/components/hudbird-ui/Badge";\nimport { Avatar } from "@/components/hudbird-ui/Avatar";\nimport { Button } from "@/components/hudbird-ui/Button";
import { ShoppingCart, Bell, Check } from 'lucide-react'

function Example() {
  return (
    <div className="flex items-center gap-8">
      {/* Avatar notification */}
      <Badge content="3" color="danger" size="sm">
        <Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb" size="lg" />
      </Badge>

      {/* Button badge */}
      <Badge content="3" color="primary" size="sm">
        <Button variant="outline">
          <ShoppingCart className="w-4 h-4 mr-2" /> Cart
        </Button>
      </Badge>

      {/* Status icon badge on avatar bottom-right */}
      <Badge
        content={<Check className="w-2.5 h-2.5 stroke-[3]" />}
        color="success"
        size="sm"
        placement="bottom-right"
      >
        <Avatar name="Alex Rivera" color="primary" size="lg" />
      </Badge>
    </div>
  )
}`}
          />
        </div>

        {/* 4. Dot Status Indicators */}
        <div id="dot-indicators" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Dot status indicators
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Use{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              isDot
            </code>{" "}
            to display a minimal presence dot (e.g. online, busy, away) on avatars or buttons:
          </p>

          <ComponentPreview>
            <div className="flex items-center gap-8">
              {/* Online Avatar */}
              <div className="flex flex-col items-center gap-2">
                <Badge isDot color="success" placement="bottom-right">
                  <Avatar
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80"
                    size="md"
                  />
                </Badge>
                <span className="text-xs text-zinc-500">Online</span>
              </div>

              {/* Busy Avatar */}
              <div className="flex flex-col items-center gap-2">
                <Badge isDot color="danger" placement="bottom-right">
                  <Avatar
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80"
                    size="md"
                  />
                </Badge>
                <span className="text-xs text-zinc-500">Do not disturb</span>
              </div>

              {/* Away Avatar */}
              <div className="flex flex-col items-center gap-2">
                <Badge isDot color="warning" placement="bottom-right">
                  <Avatar
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&h=256&q=80"
                    size="md"
                  />
                </Badge>
                <span className="text-xs text-zinc-500">Away</span>
              </div>

              {/* Notifications Indicator on Icon */}
              <div className="flex flex-col items-center gap-2">
                <Badge isDot color="primary" placement="top-right">
                  <Button variant="plain" size="sm" className="h-9 w-9 p-0">
                    <Bell className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
                  </Button>
                </Badge>
                <span className="text-xs text-zinc-500">Unread</span>
              </div>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Badge } from "@/components/hudbird-ui/Badge";\nimport { Avatar } from "@/components/hudbird-ui/Avatar";

function Example() {
  return (
    <div className="flex items-center gap-6">
      <Badge isDot color="success" placement="bottom-right">
        <Avatar src="..." />
      </Badge>

      <Badge isDot color="danger" placement="bottom-right">
        <Avatar src="..." />
      </Badge>
    </div>
  )
}`}
          />
        </div>

        {/* 5. Placements */}
        <div id="placements" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Badge placements
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Attach badges to all four corners using the{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              'placement'
            </code>{" "}
            property:
          </p>

          <ComponentPreview>
            <div className="grid grid-cols-2 gap-8 py-2 sm:grid-cols-4">
              <div className="flex flex-col items-center gap-2">
                <Badge content="1" color="primary" size="sm" placement="top-left">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
                    <MessageSquare className="h-5 w-5 text-zinc-500" />
                  </div>
                </Badge>
                <span className="font-mono text-xs text-zinc-500">top-left</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <Badge content="2" color="primary" size="sm" placement="top-right">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
                    <MessageSquare className="h-5 w-5 text-zinc-500" />
                  </div>
                </Badge>
                <span className="font-mono text-xs text-zinc-500">top-right</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <Badge content="3" color="primary" size="sm" placement="bottom-left">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
                    <MessageSquare className="h-5 w-5 text-zinc-500" />
                  </div>
                </Badge>
                <span className="font-mono text-xs text-zinc-500">bottom-left</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <Badge content="4" color="primary" size="sm" placement="bottom-right">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
                    <MessageSquare className="h-5 w-5 text-zinc-500" />
                  </div>
                </Badge>
                <span className="font-mono text-xs text-zinc-500">bottom-right</span>
              </div>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Badge } from "@/components/hudbird-ui/Badge";

function Example() {
  return (
    <>
      <Badge content="1" placement="top-left">{/* Element */}</Badge>
      <Badge content="2" placement="top-right">{/* Element */}</Badge>
      <Badge content="3" placement="bottom-left">{/* Element */}</Badge>
      <Badge content="4" placement="bottom-right">{/* Element */}</Badge>
    </>
  )
}`}
          />
        </div>
      </section>
    </div>
  );
}
