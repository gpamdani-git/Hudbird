// apps/docs/src/pages/AvatarDoc.tsx
import avatarCode from "../../../../packages/core/src/components/Avatar/Avatar.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import React, { useState } from "react";
import { PageToolbar } from "../components/PageToolbar";
import { Avatar, Button } from "@hudbird/ui";
import { RefreshCw } from "lucide-react";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";

export const avatarTocItems = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "image-avatars", title: "Image avatars" },
      { id: "fallback-initials", title: "Fallback initials & Colors" },
      { id: "avatar-sizes", title: "Avatar sizes" },
      { id: "avatar-radii", title: "Border radii" },
      { id: "avatar-group", title: "Avatar group" },
      { id: "error-handling", title: "Fallback error demo" },
    ],
  },
];

export default function AvatarDoc() {
  const [brokenUrl, setBrokenUrl] = useState("https://invalid-avatar-url.png");

  const apiRows: ApiPropRow[] = [
    {
      prop: "src",
      defaultVal: "-",
      description: "The source image URL to be loaded as the avatar.",
    },
    {
      prop: "alt",
      defaultVal: "'Avatar'",
      description: "Alternative text describing the avatar image for screen readers.",
    },
    {
      prop: "name",
      defaultVal: "-",
      description: (
        <span>
          Full name or label used to generate initials (e.g.{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'John Doe'
          </code>{" "}
          renders{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'JD'
          </code>
          ) when image is missing or errors.
        </span>
      ),
    },
    {
      prop: "size",
      defaultVal: "md",
      description: (
        <span>
          The dimensions of the avatar:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'sm'
          </code>{" "}
          (32px),{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'md'
          </code>{" "}
          (40px),{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'lg'
          </code>{" "}
          (48px), or{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'xl'
          </code>{" "}
          (56px).
        </span>
      ),
    },
    {
      prop: "radius",
      defaultVal: "full",
      description: (
        <span>
          The border radius:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'none'
          </code>
          ,{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'md'
          </code>{" "}
          (12px),{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'lg'
          </code>{" "}
          (16px), or{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'full'
          </code>
          .
        </span>
      ),
    },
    {
      prop: "color",
      defaultVal: "default",
      description: (
        <span>
          Background and text color palette used for initial fallbacks:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'default'
          </code>
          ,{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'primary'
          </code>
          ,{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'success'
          </code>
          , or{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'danger'
          </code>
          .
        </span>
      ),
    },
    {
      prop: "onError",
      defaultVal: "-",
      description: "Callback triggered when the image fails to load.",
    },
  ];

  return (
    <div className="space-y-16 pb-24">
      {/* Title & Subtitle */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="w-full min-w-0 flex-1 pr-4">
          <div className="mb-3 flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
              Avatar
            </h1>
            <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              Component
            </span>
          </div>
          <p className="pr-8 text-base text-zinc-600 dark:text-zinc-400">
            Visual representation of a user or entity using photos, initials, or status icons.
          </p>
        </div>
        <PageToolbar />
      </div>

      {/* Main Preview & Code */}
      <section className="space-y-4">
        <ComponentPreview>
          <div className="flex items-center gap-4">
            <Avatar
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80"
              name="Sarah Jenkins"
              size="lg"
            />
            <Avatar name="Alex Rivera" color="primary" size="lg" />
            <Avatar name="Elena Rostova" color="success" size="lg" />
            <Avatar name="Marcus Chen" color="danger" size="lg" />
          </div>
        </ComponentPreview>

        <CodeBlock
          code={`import { Avatar } from '@hudbird/ui'

function Example() {
  return (
    <div className="flex items-center gap-4">
      <Avatar
        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb"
        name="Sarah Jenkins"
        size="lg"
      />
      <Avatar name="Alex Rivera" color="primary" size="lg" />
      <Avatar name="Elena Rostova" color="success" size="lg" />
      <Avatar name="Marcus Chen" color="danger" size="lg" />
    </div>
  )
}`}
        />
      </section>
      <div id="installation" className="scroll-mt-24 space-y-4">
        <InstallationTabs componentName="avatar" manualCode={avatarCode} />
      </div>

      {/* Component API */}
      <section id="component-api" className="scroll-mt-24 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Component API
        </h2>
        <ApiTable
          note={
            <span>
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">Avatar</strong>{" "}
              supports all standard HTML div attributes, accessible ARIA labels, and image fallback
              management.
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

        {/* 1. Image avatars */}
        <div id="image-avatars" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Image avatars</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Provide a{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              'src'
            </code>{" "}
            prop pointing to a valid photo URL:
          </p>

          <ComponentPreview>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Avatar
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80"
                alt="Sarah"
              />
              <Avatar
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80"
                alt="David"
              />
              <Avatar
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&h=256&q=80"
                alt="Emily"
              />
              <Avatar
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80"
                alt="Michael"
              />
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Avatar } from '@hudbird/ui'

function Example() {
  return (
    <div className="flex items-center gap-4">
      <Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" alt="Sarah" />
      <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" alt="David" />
    </div>
  )
}`}
          />
        </div>

        {/* 2. Fallback initials & Colors */}
        <div id="fallback-initials" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Fallback initials & Colors
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            If no{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              'src'
            </code>{" "}
            is provided, the avatar computes initials from the{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              'name'
            </code>{" "}
            string with semantic colors:
          </p>

          <ComponentPreview>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Avatar name="General User" color="default" />
              <Avatar name="Primary Developer" color="primary" />
              <Avatar name="Success Verified" color="success" />
              <Avatar name="Danger Admin" color="danger" />
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Avatar } from '@hudbird/ui'

function Example() {
  return (
    <div className="flex items-center gap-4">
      <Avatar name="General User" color="default" />
      <Avatar name="Primary Developer" color="primary" />
      <Avatar name="Success Verified" color="success" />
      <Avatar name="Danger Admin" color="danger" />
    </div>
  )
}`}
          />
        </div>

        {/* 3. Avatar sizes */}
        <div id="avatar-sizes" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Avatar sizes</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Scale from compact lists to large profile banners with{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              'sm'
            </code>
            ,{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              'md'
            </code>
            ,{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              'lg'
            </code>
            , and{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              'xl'
            </code>
            :
          </p>

          <ComponentPreview>
            <div className="flex items-end gap-5">
              <div className="flex flex-col items-center gap-2">
                <Avatar
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80"
                  size="sm"
                />
                <span className="font-mono text-[11px] text-zinc-500">sm (32px)</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Avatar
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80"
                  size="md"
                />
                <span className="font-mono text-[11px] text-zinc-500">md (40px)</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Avatar
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80"
                  size="lg"
                />
                <span className="font-mono text-[11px] text-zinc-500">lg (48px)</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Avatar
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80"
                  size="xl"
                />
                <span className="font-mono text-[11px] text-zinc-500">xl (56px)</span>
              </div>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Avatar } from '@hudbird/ui'

function Example() {
  return (
    <div className="flex items-center gap-4">
      <Avatar size="sm" src="..." />
      <Avatar size="md" src="..." />
      <Avatar size="lg" src="..." />
      <Avatar size="xl" src="..." />
    </div>
  )
}`}
          />
        </div>

        {/* 4. Border radii */}
        <div id="avatar-radii" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Border radii</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Customize corner rounding with{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              'radius'
            </code>{" "}
            options:
          </p>

          <ComponentPreview>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <div className="flex flex-col items-center gap-2">
                <Avatar
                  radius="none"
                  size="lg"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80"
                />
                <span className="font-mono text-[11px] text-zinc-500">none</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Avatar
                  radius="md"
                  size="lg"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80"
                />
                <span className="font-mono text-[11px] text-zinc-500">md (12px)</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Avatar
                  radius="lg"
                  size="lg"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80"
                />
                <span className="font-mono text-[11px] text-zinc-500">lg (16px)</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Avatar
                  radius="full"
                  size="lg"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80"
                />
                <span className="font-mono text-[11px] text-zinc-500">full</span>
              </div>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Avatar } from '@hudbird/ui'

function Example() {
  return (
    <div className="flex items-center gap-4">
      <Avatar radius="none" src="..." />
      <Avatar radius="md" src="..." />
      <Avatar radius="lg" src="..." />
      <Avatar radius="full" src="..." />
    </div>
  )
}`}
          />
        </div>

        {/* 5. Avatar group */}
        <div id="avatar-group" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Avatar group</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Stack multiple avatars with negative margin and ring borders:
          </p>

          <ComponentPreview>
            <div className="flex items-center -space-x-3">
              <Avatar
                className="ring-2 ring-white dark:ring-zinc-950"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80"
              />
              <Avatar
                className="ring-2 ring-white dark:ring-zinc-950"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80"
              />
              <Avatar
                className="ring-2 ring-white dark:ring-zinc-950"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80"
              />
              <Avatar className="bg-zinc-100 text-xs font-medium text-zinc-800 ring-2 ring-white dark:bg-zinc-800 dark:text-zinc-200 dark:ring-zinc-950">
                +5
              </Avatar>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Avatar } from '@hudbird/ui'

function AvatarGroup() {
  return (
    <div className="flex items-center -space-x-3">
      <Avatar className="ring-2 ring-white dark:ring-zinc-950" src="..." />
      <Avatar className="ring-2 ring-white dark:ring-zinc-950" src="..." />
      <Avatar className="ring-2 ring-white dark:ring-zinc-950" src="..." />
      <Avatar className="ring-2 ring-white dark:ring-zinc-950">+5</Avatar>
    </div>
  )
}`}
          />
        </div>

        {/* 6. Fallback error handling */}
        <div id="error-handling" className="scroll-mt-24 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Fallback error demo
            </h3>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setBrokenUrl(`https://invalid-avatar-url.png?t=${Date.now()}`)}
              className="flex items-center gap-1.5"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Retrigger Broken Image
            </Button>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            If the image link fails or 404s, the component automatically falls back to the user's
            computed initials without UI flash or layout breakdown:
          </p>

          <ComponentPreview>
            <div className="flex items-center gap-4">
              <Avatar src={brokenUrl} name="Taylor Swift" color="primary" size="lg" />
              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                <p className="font-semibold text-zinc-800 dark:text-zinc-200">
                  Image failed to load
                </p>
                <p>
                  Fallback initials{" "}
                  <code className="font-mono text-indigo-600 dark:text-indigo-400">'TS'</code>{" "}
                  automatically displayed.
                </p>
              </div>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Avatar } from '@hudbird/ui'

function Example() {
  return (
    <Avatar
      src="https://broken-image-link.png"
      name="Taylor Swift"
      color="primary"
      size="lg"
    />
  )
}`}
          />
        </div>
      </section>
    </div>
  );
}
