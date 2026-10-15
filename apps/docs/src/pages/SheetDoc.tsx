// apps/docs/src/pages/SheetDoc.tsx
import sheetCode from "../../../../packages/core/src/components/Sheet/Sheet.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import React, { useState } from "react";
import { PageToolbar } from "../components/PageToolbar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  Button,
  Input,
} from "@hudbird/ui";
import { PanelRight, PanelLeft, ArrowUp, ArrowDown } from "lucide-react";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";

export const sheetTocItems = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "sheet-sides", title: "Directional sides" },
      { id: "sheet-sizes", title: "Panel sizes" },
      { id: "interactive-form", title: "Interactive form" },
    ],
  },
];

export default function SheetDoc() {
  const [openRight, setOpenRight] = useState(false);
  const [openLeft, setOpenLeft] = useState(false);
  const [openTop, setOpenTop] = useState(false);
  const [openBottom, setOpenBottom] = useState(false);
  const [currentSize, setCurrentSize] = useState<"sm" | "md" | "lg" | "xl" | "full">("md");
  const [openSizeSheet, setOpenSizeSheet] = useState(false);

  const apiRows: ApiPropRow[] = [
    {
      prop: "isOpen",
      defaultVal: "false",
      description: "Controls whether the sheet panel is visible and mounted.",
    },
    {
      prop: "onClose",
      defaultVal: "-",
      description:
        "Callback triggered when clicking backdrop overlay, close trigger, or pressing Escape.",
    },
    {
      prop: "side",
      defaultVal: "'right'",
      description: (
        <span>
          Edge from which the sheet slides out:{" "}
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
          Panel dimension:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'sm'
          </code>
          ,{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'md'
          </code>
          ,{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'lg'
          </code>
          ,{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'xl'
          </code>
          , or{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'full'
          </code>
          .
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-16 pb-24">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="w-full min-w-0 flex-1 pr-4">
          <div className="mb-3 flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
              Sheet
            </h1>
            <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              Component
            </span>
          </div>
          <p className="pr-8 text-base text-zinc-600 dark:text-zinc-400">
            Slide-over drawer panel anchored to any viewport edge, featuring spring animations,
            backdrop blur, and keyboard dismissal.
          </p>
        </div>
        <PageToolbar />
      </div>

      {/* Main Preview */}
      <section className="space-y-4">
        <ComponentPreview>
          <div className="flex items-center justify-center">
            <Button onClick={() => setOpenRight(true)}>
              <PanelRight className="h-4 w-4" />
              Open Drawer
            </Button>
          </div>
        </ComponentPreview>

        <CodeBlock
          code={`import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  Button
} from "@hudbird/ui";

export function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
      <Sheet isOpen={isOpen} onClose={() => setIsOpen(false)} side="right">
        <SheetContent>
          <SheetHeader>
            <SheetTitle>User Profile</SheetTitle>
            <SheetDescription>Manage your workspace preferences.</SheetDescription>
          </SheetHeader>
          <div className="py-4">Content goes here...</div>
          <SheetFooter>
            <Button variant="bordered" onClick={() => setIsOpen(false)}>Close</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}`}
        />
      </section>

      {/* Installation */}
      <div id="installation" className="scroll-mt-24 space-y-4">
        <InstallationTabs componentName="sheet" manualCode={sheetCode} />
      </div>

      {/* Component API */}
      <section id="component-api" className="scroll-mt-24 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Component API
        </h2>
        <ApiTable
          note={
            <span>
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">Sheet</strong>{" "}
              locks document body scrolling when mounted and responds to the Escape key.
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

        {/* 1. Sides */}
        <div id="sheet-sides" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Directional sides
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Trigger drawers sliding from right, left, top, or bottom edges:
          </p>

          <ComponentPreview>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button variant="bordered" onClick={() => setOpenLeft(true)}>
                <PanelLeft className="h-4 w-4" /> Left
              </Button>
              <Button variant="bordered" onClick={() => setOpenRight(true)}>
                <PanelRight className="h-4 w-4" /> Right
              </Button>
              <Button variant="bordered" onClick={() => setOpenTop(true)}>
                <ArrowUp className="h-4 w-4" /> Top
              </Button>
              <Button variant="bordered" onClick={() => setOpenBottom(true)}>
                <ArrowDown className="h-4 w-4" /> Bottom
              </Button>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`<Sheet isOpen={openLeft} onClose={() => setOpenLeft(false)} side="left">...</Sheet>
<Sheet isOpen={openRight} onClose={() => setOpenRight(false)} side="right">...</Sheet>
<Sheet isOpen={openTop} onClose={() => setOpenTop(false)} side="top">...</Sheet>
<Sheet isOpen={openBottom} onClose={() => setOpenBottom(false)} side="bottom">...</Sheet>`}
          />
        </div>

        {/* 2. Sizes */}
        <div id="sheet-sizes" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Panel sizes</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Support for small panels, standard forms, or full-screen takeovers:
          </p>

          <ComponentPreview>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {(["sm", "md", "lg", "xl", "full"] as const).map((s) => (
                <Button
                  key={s}
                  variant="flat"
                  size="sm"
                  onClick={() => {
                    setCurrentSize(s);
                    setOpenSizeSheet(true);
                  }}
                >
                  Size: {s}
                </Button>
              ))}
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`<Sheet isOpen={isOpen} onClose={close} size="${currentSize}">...</Sheet>`}
          />
        </div>
      </section>

      {/* Render Sheets */}
      <Sheet isOpen={openRight} onClose={() => setOpenRight(false)} side="right">
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Right Drawer</SheetTitle>
            <SheetDescription>Default right slide-over panel.</SheetDescription>
          </SheetHeader>
          <div className="py-6 text-sm text-zinc-600 dark:text-zinc-400">
            This drawer is ideal for detailed configuration forms, inspect panels, and filter
            sidebars.
          </div>
          <SheetFooter>
            <Button variant="bordered" onClick={() => setOpenRight(false)}>
              Close
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Sheet isOpen={openLeft} onClose={() => setOpenLeft(false)} side="left">
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Left Navigation</SheetTitle>
            <SheetDescription>Mobile navigation sidebar drawer.</SheetDescription>
          </SheetHeader>
          <div className="py-6 text-sm text-zinc-600 dark:text-zinc-400">
            Ideal for mobile navigation menus or directory trees.
          </div>
          <SheetFooter>
            <Button variant="bordered" onClick={() => setOpenLeft(false)}>
              Close
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Sheet isOpen={openTop} onClose={() => setOpenTop(false)} side="top">
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Top Notification Panel</SheetTitle>
            <SheetDescription>Broadcast announcement drawer.</SheetDescription>
          </SheetHeader>
          <div className="py-4 text-sm text-zinc-600 dark:text-zinc-400">
            Notice: All scheduled systems will undergo security updates today.
          </div>
          <SheetFooter>
            <Button variant="bordered" onClick={() => setOpenTop(false)}>
              Dismiss
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Sheet isOpen={openBottom} onClose={() => setOpenBottom(false)} side="bottom">
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Bottom Action Sheet</SheetTitle>
            <SheetDescription>Mobile action sheet for fast contextual choices.</SheetDescription>
          </SheetHeader>
          <div className="py-4 text-sm text-zinc-600 dark:text-zinc-400">
            Select an action to proceed with this document.
          </div>
          <SheetFooter>
            <Button variant="bordered" onClick={() => setOpenBottom(false)}>
              Done
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Sheet
        isOpen={openSizeSheet}
        onClose={() => setOpenSizeSheet(false)}
        side="right"
        size={currentSize}
      >
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Size: {currentSize.toUpperCase()}</SheetTitle>
            <SheetDescription>Demonstrating dynamic width scaling.</SheetDescription>
          </SheetHeader>
          <div className="py-6 text-sm text-zinc-600 dark:text-zinc-400">
            Current panel width setting is <code className="font-mono text-xs">{currentSize}</code>.
          </div>
          <SheetFooter>
            <Button variant="bordered" onClick={() => setOpenSizeSheet(false)}>
              Close
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
