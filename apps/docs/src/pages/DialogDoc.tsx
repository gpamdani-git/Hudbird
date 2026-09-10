// apps/docs/src/pages/DialogDoc.tsx
import dialogCode from "../../../../packages/core/src/components/Dialog/Dialog.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
} from "@hudbird/ui";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";

export const dialogTocItems = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "confirmation-dialog", title: "Standard Confirmation Dialog" },
      { id: "destructive-dialog", title: "Destructive Alert Dialog (Danger)" },
      { id: "dialog-sizes", title: "Dialog Sizes (sm & md)" },
    ],
  },
];

export default function DialogDoc() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [destructiveOpen, setDestructiveOpen] = useState(false);
  const [smallOpen, setSmallOpen] = useState(false);

  const apiRows: ApiPropRow[] = [
    {
      prop: "isOpen",
      defaultVal: "false",
      description: "Controls the open visibility state of the modal dialog overlay.",
    },
    {
      prop: "onClose",
      defaultVal: "undefined",
      description:
        "Callback triggered when clicking the backdrop, pressing ESC, or dismissing the dialog.",
    },
    {
      prop: "size",
      defaultVal: "'md'",
      description: (
        <span>
          Max-width container preset:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'sm'
          </code>{" "}
          (~400px) or{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'md'
          </code>{" "}
          (~540px).
        </span>
      ),
    },
    {
      prop: "severity",
      defaultVal: "'default'",
      description: (
        <span>
          Visual urgency motif:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'default'
          </code>{" "}
          or{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'danger'
          </code>{" "}
          (adds rose top-border accent and title highlight).
        </span>
      ),
    },
    {
      prop: "isDismissable",
      defaultVal: "true",
      description: "Whether clicking the backdrop or pressing the Escape key closes the dialog.",
    },
    {
      prop: "children",
      defaultVal: "-",
      description:
        "Structured subcomponents: <DialogContent>, <DialogHeader>, <DialogTitle>, <DialogDescription>, <DialogFooter>.",
    },
  ];

  return (
    <div className="space-y-16 pb-24">
      {/* Title & Introduction */}
      <div>
        <div className="mb-3 flex items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            Dialog
          </h1>
          <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            Component
          </span>
        </div>
        <p className="text-base text-zinc-600 dark:text-zinc-400">
          High-elevation modal overlays for critical confirmations, destructive alerts, and user
          action decisions with backdrop blur and fluid micro-transitions.
        </p>
      </div>

      {/* Hero Preview & Code */}
      <section className="space-y-4">
        <ComponentPreview>
          <div className="flex flex-col items-center justify-center py-6">
            <Button onClick={() => setBasicOpen(true)}>Open Confirmation Dialog</Button>

            <Dialog isOpen={basicOpen} onClose={() => setBasicOpen(false)}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Save Document Changes?</DialogTitle>
                  <DialogDescription>
                    Your unsaved draft edits will be synced across all team members and published to
                    production immediately.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="plain" onClick={() => setBasicOpen(false)}>
                    Cancel
                  </Button>
                  <Button color="indigo" onClick={() => setBasicOpen(false)}>
                    Save & Publish
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </ComponentPreview>

        <CodeBlock
          code={`import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
} from '@hudbird/ui'

function Example() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>

      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Document Changes?</DialogTitle>
            <DialogDescription>
              Your unsaved draft edits will be synced across all team members and published immediately.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="plain" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button color="indigo" onClick={() => setIsOpen(false)}>
              Save & Publish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}`}
        />
      </section>
      <div id="installation" className="scroll-mt-24 space-y-4">
        <InstallationTabs componentName="dialog" manualCode={dialogCode} />
      </div>

      {/* Component API */}
      <section id="component-api" className="scroll-mt-24 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Component API
        </h2>
        <ApiTable
          note={
            <span>
              The modal structure is built from composable subcomponents:{" "}
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                &lt;Dialog&gt;
              </strong>
              ,{" "}
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                &lt;DialogContent&gt;
              </strong>
              ,{" "}
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                &lt;DialogHeader&gt;
              </strong>
              ,{" "}
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                &lt;DialogTitle&gt;
              </strong>
              ,{" "}
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                &lt;DialogDescription&gt;
              </strong>
              , and{" "}
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                &lt;DialogFooter&gt;
              </strong>
              .
            </span>
          }
          rows={apiRows}
        />
      </section>

      {/* Examples Header */}
      <section id="examples" className="scroll-mt-24 space-y-14">
        <div>
          <h2 className="mb-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Examples
          </h2>
        </div>

        {/* 1. Standard Confirmation Dialog */}
        <div id="confirmation-dialog" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Standard Confirmation Dialog
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            A neutral confirmation prompt for approving state transitions, applying configuration
            changes, or initiating background jobs:
          </p>

          <ComponentPreview>
            <div className="flex justify-center py-4">
              <Button variant="outline" onClick={() => setBasicOpen(true)}>
                Deploy New Release
              </Button>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
} from '@hudbird/ui'

function Example() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog isOpen={open} onClose={() => setOpen(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deploy New Release</DialogTitle>
          <DialogDescription>
            This action will roll out version v2.4.0 to production ingress gateways.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="plain" onClick={() => setOpen(false)}>Cancel</Button>
          <Button color="primary" onClick={() => setOpen(false)}>Confirm Deployment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`}
          />
        </div>

        {/* 2. Destructive Alert Dialog (Danger) */}
        <div id="destructive-dialog" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Destructive Alert Dialog (Danger)
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Use{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              severity="danger"
            </code>{" "}
            along with a danger action button for permanent deletions and irreversible system
            modifications:
          </p>

          <ComponentPreview>
            <div className="flex flex-col items-center justify-center py-4">
              <Button color="danger" onClick={() => setDestructiveOpen(true)}>
                Delete Production Cluster
              </Button>

              <Dialog
                isOpen={destructiveOpen}
                onClose={() => setDestructiveOpen(false)}
                severity="danger"
              >
                <DialogContent>
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-rose-200 bg-rose-50 text-rose-600 dark:border-rose-900/50 dark:bg-rose-950/60 dark:text-rose-400">
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        <line x1="10" x2="10" y1="11" y2="17" />
                        <line x1="14" x2="14" y1="11" y2="17" />
                      </svg>
                    </div>

                    <div className="min-w-0 flex-1">
                      <DialogHeader className="mb-2">
                        <DialogTitle>Delete Production Cluster?</DialogTitle>
                        <DialogDescription>
                          Are you absolutely sure? This will immediately terminate all active pods,
                          release attached storage volumes, and purge telemetry indices. This action
                          cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button variant="plain" onClick={() => setDestructiveOpen(false)}>
                      Keep Cluster
                    </Button>
                    <Button color="danger" onClick={() => setDestructiveOpen(false)}>
                      Permanently Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
} from '@hudbird/ui'

function Example() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog isOpen={open} onClose={() => setOpen(false)} severity="danger">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Production Cluster?</DialogTitle>
          <DialogDescription>
            Are you absolutely sure? This will immediately terminate all active pods and release attached storage volumes. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="plain" onClick={() => setOpen(false)}>
            Keep Cluster
          </Button>
          <Button color="danger" onClick={() => setOpen(false)}>
            Permanently Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`}
          />
        </div>

        {/* 3. Dialog Sizes */}
        <div id="dialog-sizes" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Dialog Sizes (sm & md)
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Choose between compact{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              size="sm"
            </code>{" "}
            and comfortable standard{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              size="md"
            </code>{" "}
            dialog widths:
          </p>

          <ComponentPreview>
            <div className="flex justify-center gap-4 py-4">
              <Button variant="outline" size="sm" onClick={() => setSmallOpen(true)}>
                Small Dialog (sm)
              </Button>
              <Button variant="outline" size="sm" onClick={() => setBasicOpen(true)}>
                Medium Dialog (md)
              </Button>

              <Dialog isOpen={smallOpen} onClose={() => setSmallOpen(false)} size="sm">
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Quick Confirmation</DialogTitle>
                    <DialogDescription>
                      Sign out from your active workstation session?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button size="sm" variant="plain" onClick={() => setSmallOpen(false)}>
                      Cancel
                    </Button>
                    <Button size="sm" color="indigo" onClick={() => setSmallOpen(false)}>
                      Sign Out
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
} from '@hudbird/ui'

function Example() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog isOpen={open} onClose={() => setOpen(false)} size="sm">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Quick Confirmation</DialogTitle>
          <DialogDescription>
            Sign out from your active workstation session?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button size="sm" variant="plain" onClick={() => setOpen(false)}>Cancel</Button>
          <Button size="sm" color="indigo" onClick={() => setOpen(false)}>Sign Out</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`}
          />
        </div>
      </section>
    </div>
  );
}
