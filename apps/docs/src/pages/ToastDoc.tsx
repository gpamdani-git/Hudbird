// apps/docs/src/pages/ToastDoc.tsx
import toastCode from "../../../../packages/core/src/components/Toast/Toast.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import React, { useState } from "react";
import { PageToolbar } from "../components/PageToolbar";
import { toast, Toaster, Button } from "@hudbird/ui";
import { CheckCircle2, AlertTriangle, AlertCircle, Info, Loader2, Sparkles } from "lucide-react";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";

export const toastTocItems = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "toast-variants", title: "Toast variants" },
      { id: "toast-positions", title: "Positioning" },
      { id: "async-promise", title: "Promise toast" },
      { id: "action-toast", title: "Action buttons" },
    ],
  },
];

export default function ToastDoc() {
  const [position, setPosition] = useState<
    "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"
  >("bottom-right");

  const apiRows: ApiPropRow[] = [
    {
      prop: "message",
      defaultVal: "-",
      description: "Primary toast title or message string or React node.",
    },
    {
      prop: "description",
      defaultVal: "-",
      description: "Optional secondary description for additional context.",
    },
    {
      prop: "type",
      defaultVal: "'default'",
      description: (
        <span>
          Severity type:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'default'
          </code>
          ,{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'success'
          </code>
          ,{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'error'
          </code>
          ,{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'warning'
          </code>
          ,{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'info'
          </code>
          , or{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'loading'
          </code>
          .
        </span>
      ),
    },
    {
      prop: "duration",
      defaultVal: "4000",
      description: "Auto-dismiss duration in milliseconds. Pass Infinity to persist.",
    },
    {
      prop: "action",
      defaultVal: "-",
      description: "Primary action button configuration with label and onClick handler.",
    },
    {
      prop: "cancel",
      defaultVal: "-",
      description: "Cancel or secondary action button configuration.",
    },
  ];

  return (
    <div className="space-y-16 pb-24">
      {/* Container Toaster */}
      <Toaster position={position} />

      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="w-full min-w-0 flex-1 pr-4">
          <div className="mb-3 flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
              Toast
            </h1>
            <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              Component
            </span>
          </div>
          <p className="pr-8 text-base text-zinc-600 dark:text-zinc-400">
            Non-intrusive floating feedback notifications with decoupled state, promise handling,
            and customizable positions.
          </p>
        </div>
        <PageToolbar />
      </div>

      {/* Main Preview & Code */}
      <section className="space-y-4">
        <ComponentPreview>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="flat"
              onClick={() =>
                toast.success("Changes saved successfully", {
                  description: "Your workspace settings have been synchronized.",
                })
              }
            >
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              Trigger Toast
            </Button>
            <Button
              variant="flat"
              color="danger"
              onClick={() =>
                toast.error("Upload failed", {
                  description: "Network timeout while streaming file payload.",
                })
              }
            >
              <AlertCircle className="h-4 w-4 text-rose-500" />
              Error Toast
            </Button>
          </div>
        </ComponentPreview>

        <CodeBlock
          code={`import { toast, Toaster, Button } from "@hudbird/ui";

export function App() {
  return (
    <>
      <Button onClick={() => toast.success("Changes saved successfully!")}>
        Save Changes
      </Button>

      {/* Render once at the root of your application */}
      <Toaster position="bottom-right" />
    </>
  );
}`}
        />
      </section>

      {/* Installation */}
      <div id="installation" className="scroll-mt-24 space-y-4">
        <InstallationTabs componentName="toast" manualCode={toastCode} />
      </div>

      {/* Component API */}
      <section id="component-api" className="scroll-mt-24 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Component API
        </h2>
        <ApiTable
          note={
            <span>
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">Toast</strong>{" "}
              operates on a decoupled event emitter. Call methods anywhere without React Context
              providers.
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

        {/* 1. Variants */}
        <div id="toast-variants" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Toast variants</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Pre-configured semantic helpers for standard feedback loops:
          </p>

          <ComponentPreview>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button
                variant="flat"
                onClick={() =>
                  toast("Event logged", { description: "Default informational message." })
                }
              >
                Default
              </Button>
              <Button
                variant="flat"
                className="text-emerald-600 dark:text-emerald-400"
                onClick={() =>
                  toast.success("Payment verified", { description: "Transaction ID #HB-98124." })
                }
              >
                <CheckCircle2 className="h-4 w-4" />
                Success
              </Button>
              <Button
                variant="flat"
                className="text-rose-600 dark:text-rose-400"
                onClick={() =>
                  toast.error("Deployment crashed", {
                    description: "Exit code 1 on process worker.",
                  })
                }
              >
                <AlertCircle className="h-4 w-4" />
                Error
              </Button>
              <Button
                variant="flat"
                className="text-amber-600 dark:text-amber-400"
                onClick={() =>
                  toast.warning("Quota warning", {
                    description: "You have used 85% of your API requests.",
                  })
                }
              >
                <AlertTriangle className="h-4 w-4" />
                Warning
              </Button>
              <Button
                variant="flat"
                className="text-sky-600 dark:text-sky-400"
                onClick={() =>
                  toast.info("Update available", {
                    description: "Hudbird UI v2.0 is ready to install.",
                  })
                }
              >
                <Info className="h-4 w-4" />
                Info
              </Button>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`toast("Default message");
toast.success("Payment verified");
toast.error("Deployment crashed");
toast.warning("Quota warning");
toast.info("Update available");`}
          />
        </div>

        {/* 2. Positioning */}
        <div id="toast-positions" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Positioning</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Configure where the toasts appear in viewport coordinates:
          </p>

          <ComponentPreview>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {(
                [
                  "top-left",
                  "top-center",
                  "top-right",
                  "bottom-left",
                  "bottom-center",
                  "bottom-right",
                ] as const
              ).map((pos) => (
                <Button
                  key={pos}
                  variant={position === pos ? "solid" : "bordered"}
                  size="sm"
                  onClick={() => {
                    setPosition(pos);
                    toast.info(`Position switched to ${pos}`);
                  }}
                >
                  {pos}
                </Button>
              ))}
            </div>
          </ComponentPreview>

          <CodeBlock code={`<Toaster position="${position}" />`} />
        </div>

        {/* 3. Promise toast */}
        <div id="async-promise" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Promise toast</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Automatically tracks asynchronous operations through pending, success, and error states:
          </p>

          <ComponentPreview>
            <div className="flex items-center justify-center gap-3">
              <Button
                variant="solid"
                onClick={() => {
                  const simulateApi = new Promise<string>((resolve) =>
                    setTimeout(() => resolve("Document exported as PDF"), 2000)
                  );
                  toast.promise(simulateApi, {
                    loading: "Rendering high-res PDF...",
                    success: (msg) => `${msg}`,
                    error: "Failed to export document",
                  });
                }}
              >
                <Sparkles className="h-4 w-4" />
                Run Async Promise
              </Button>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`toast.promise(saveRecordApi(), {
  loading: "Saving changes...",
  success: (data) => "Record saved successfully!",
  error: "Could not save record",
});`}
          />
        </div>

        {/* 4. Action toast */}
        <div id="action-toast" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Action buttons</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Toasts can include action and cancel callbacks for quick reversals (e.g. undo delete):
          </p>

          <ComponentPreview>
            <div className="flex items-center justify-center gap-3">
              <Button
                variant="bordered"
                onClick={() => {
                  toast("File moved to trash", {
                    description: "You can undo this action within 10 seconds.",
                    action: {
                      label: "Undo",
                      onClick: () => toast.success("Action reverted!"),
                    },
                    cancel: {
                      label: "Dismiss",
                      onClick: () => {},
                    },
                  });
                }}
              >
                Delete File with Undo
              </Button>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`toast("File moved to trash", {
  description: "You can undo this action within 10 seconds.",
  action: {
    label: "Undo",
    onClick: () => restoreFile(),
  },
  cancel: {
    label: "Dismiss",
    onClick: () => {},
  },
});`}
          />
        </div>
      </section>
    </div>
  );
}
