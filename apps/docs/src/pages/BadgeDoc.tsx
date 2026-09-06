// apps/docs/src/pages/BadgeDoc.tsx
import React, { useState } from "react";
import { Badge, Avatar, Button } from "@my-lib/core";
import { Bell, Mail, ShoppingCart, MessageSquare, Check, Sparkles } from "lucide-react";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";

export const badgeTocItems = [
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
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'solid'</code>,{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'soft'</code>, or{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'outline'</code>.
        </span>
      ),
    },
    {
      prop: "color",
      defaultVal: "'primary'",
      description: (
        <span>
          Color theme palette:{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'primary'</code> (Indigo),{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'success'</code> (Emerald),{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'warning'</code> (Amber), or{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'danger'</code> (Rose).
        </span>
      ),
    },
    {
      prop: "size",
      defaultVal: "'md'",
      description: (
        <span>
          Size scale:{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'sm'</code> (text-[10px]),{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'md'</code> (text-xs), or{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'lg'</code> (text-sm).
        </span>
      ),
    },
    {
      prop: "content",
      defaultVal: "-",
      description: "Content (text, number, or icon) displayed in the floating badge over a wrapped child.",
    },
    {
      prop: "placement",
      defaultVal: "'top-right'",
      description: (
        <span>
          Corner positioning when wrapping an element:{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'top-right'</code>,{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'top-left'</code>,{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'bottom-right'</code>, or{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'bottom-left'</code>.
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
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl mb-3">
          Badge
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400">
          Small status descriptors, labels, and notification counters used for highlighting metadata or activity.
        </p>
      </div>

      {/* Main Preview & Code */}
      <section className="space-y-4">
        <ComponentPreview>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {/* Standalone Badges */}
            <div className="flex items-center gap-2">
              <Badge variant="solid" color="primary">New</Badge>
              <Badge variant="soft" color="success">Active</Badge>
              <Badge variant="outline" color="warning">Pending</Badge>
              <Badge variant="solid" color="danger">Failed</Badge>
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
                  <Mail className="w-4 h-4 mr-1.5" />
                  Inbox
                </Button>
              </Badge>
            </div>
          </div>
        </ComponentPreview>

        <CodeBlock
          code={`import { Badge, Avatar, Button } from '@my-lib/core'

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

      {/* Component API */}
      <section id="component-api" className="scroll-mt-24 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Component API
        </h2>
        <ApiTable
          note={
            <span>
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">Badge</strong> automatically handles relative positioning, corner placement offsets, and full dark-mode palette balance.
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

        {/* 1. Standalone Variants & Colors */}
        <div id="standalone-variants" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Variants & Colors
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Choose between <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:text-zinc-200">'solid'</code>, <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:text-zinc-200">'soft'</code>, and <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:text-zinc-200">'outline'</code> across all semantic color states:
          </p>

          <ComponentPreview>
            <div className="flex flex-col gap-5 w-full max-w-lg">
              {/* Solid Row */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400 w-16">solid:</span>
                <div className="flex items-center gap-2.5">
                  <Badge variant="solid" color="primary">Primary</Badge>
                  <Badge variant="solid" color="success">Success</Badge>
                  <Badge variant="solid" color="warning">Warning</Badge>
                  <Badge variant="solid" color="danger">Danger</Badge>
                </div>
              </div>

              {/* Soft Row */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400 w-16">soft:</span>
                <div className="flex items-center gap-2.5">
                  <Badge variant="soft" color="primary">Primary</Badge>
                  <Badge variant="soft" color="success">Success</Badge>
                  <Badge variant="soft" color="warning">Warning</Badge>
                  <Badge variant="soft" color="danger">Danger</Badge>
                </div>
              </div>

              {/* Outline Row */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400 w-16">outline:</span>
                <div className="flex items-center gap-2.5">
                  <Badge variant="outline" color="primary">Primary</Badge>
                  <Badge variant="outline" color="success">Success</Badge>
                  <Badge variant="outline" color="warning">Warning</Badge>
                  <Badge variant="outline" color="danger">Danger</Badge>
                </div>
              </div>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Badge } from '@my-lib/core'

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
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Badge sizes
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Badges are available in three proportions: <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:text-zinc-200">'sm'</code>, <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:text-zinc-200">'md'</code>, and <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:text-zinc-200">'lg'</code>:
          </p>

          <ComponentPreview>
            <div className="flex items-center gap-4">
              <Badge size="sm" variant="soft" color="primary">Small (sm)</Badge>
              <Badge size="md" variant="soft" color="primary">Medium (md)</Badge>
              <Badge size="lg" variant="soft" color="primary">Large (lg)</Badge>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Badge } from '@my-lib/core'

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
              <Button
                size="sm"
                variant="outline"
                onClick={() => setCounter((c) => c + 1)}
              >
                +1
              </Button>
            </div>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Wrap any target element with <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:text-zinc-200">&lt;Badge content=&#123;...&#125;&gt;</code> to render a floating notification counter:
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
                  <ShoppingCart className="w-4 h-4" />
                  Cart
                </Button>
              </Badge>

              {/* Icon-Only Button */}
              <Badge content="12" color="danger" size="sm">
                <Button variant="outline" className="w-10 h-10 p-0">
                  <Bell className="w-4 h-4" />
                </Button>
              </Badge>

              {/* Verified Status on Avatar */}
              <Badge
                content={<Check className="w-2.5 h-2.5 stroke-[3]" />}
                color="success"
                size="sm"
                placement="bottom-right"
              >
                <Avatar
                  name="Alex Rivera"
                  color="primary"
                  size="lg"
                />
              </Badge>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Badge, Avatar, Button } from '@my-lib/core'
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
            Use <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:text-zinc-200">isDot</code> to display a minimal presence dot (e.g. online, busy, away) on avatars or buttons:
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
                  <Button variant="plain" size="sm" className="w-9 h-9 p-0">
                    <Bell className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
                  </Button>
                </Badge>
                <span className="text-xs text-zinc-500">Unread</span>
              </div>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Badge, Avatar } from '@my-lib/core'

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
            Attach badges to all four corners using the <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:text-zinc-200">'placement'</code> property:
          </p>

          <ComponentPreview>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-2">
              <div className="flex flex-col items-center gap-2">
                <Badge content="1" color="primary" size="sm" placement="top-left">
                  <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-zinc-500" />
                  </div>
                </Badge>
                <span className="text-xs font-mono text-zinc-500">top-left</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <Badge content="2" color="primary" size="sm" placement="top-right">
                  <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-zinc-500" />
                  </div>
                </Badge>
                <span className="text-xs font-mono text-zinc-500">top-right</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <Badge content="3" color="primary" size="sm" placement="bottom-left">
                  <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-zinc-500" />
                  </div>
                </Badge>
                <span className="text-xs font-mono text-zinc-500">bottom-left</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <Badge content="4" color="primary" size="sm" placement="bottom-right">
                  <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-zinc-500" />
                  </div>
                </Badge>
                <span className="text-xs font-mono text-zinc-500">bottom-right</span>
              </div>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Badge } from '@my-lib/core'

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
