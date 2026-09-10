import React from "react";
import { Menu, ChevronRight } from "lucide-react";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { InstallationTabs } from "../components/InstallationTabs";

export const authTocItems = [
  { id: "installation", title: "Installation" },
  { id: "preview", title: "Preview" },
];

export default function AuthLayoutDoc({ onOpenSidebar }: { onOpenSidebar?: () => void }) {
  const codeString = `// Full source code available in the demo URL.
// The Auth Layout features a centered card with a clean, distraction-free background.
import AuthLayoutDemo from "./demos/AuthLayoutDemo";

export default function App() {
  return <AuthLayoutDemo />;
}
`;

  return (
    <div className="flex w-full flex-col items-center pb-24">
      <div className="sticky top-14 z-30 mb-8 w-full border-b border-zinc-200/50 bg-white/80 px-4 py-4 backdrop-blur-md transition-all sm:px-6 lg:px-8 dark:border-zinc-800/50 dark:bg-zinc-950/80">
        <div className="flex items-center gap-3 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {onOpenSidebar && (
            <button
              onClick={onOpenSidebar}
              className="-ml-1.5 hidden rounded-md p-1.5 text-zinc-600 transition-colors hover:bg-zinc-100 lg:flex dark:text-zinc-300 dark:hover:bg-zinc-800"
              aria-label="Open Navigation"
            >
              <Menu size={18} />
            </button>
          )}
          <span>Layouts section</span>
          <ChevronRight size={14} className="text-zinc-400" />
          <span className="text-zinc-900 dark:text-zinc-100">Auth Layout</span>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl space-y-16 px-4 sm:px-8 lg:px-12">
        {/* Title & Subtitle */}
        <div className="-mt-8">
          <div className="mb-3 flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
              Auth Layout
            </h1>
            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              New
            </span>
          </div>
          <p className="text-base text-zinc-600 dark:text-zinc-400">
            A clean, distraction-free layout optimized for authentication and onboarding flows.
          </p>
        </div>

        {/* Main Preview & Code */}
        <section className="space-y-4" id="preview">
          <ComponentPreview demoUrl="/demos/auth" iframeMode="always">
            <div className="flex w-full items-center justify-center p-4">
              <div className="w-full max-w-5xl overflow-hidden rounded-2xl border border-zinc-200 shadow-xl dark:border-zinc-800">
                {/* Fake Mini Preview */}
                <div className="relative flex h-[600px] w-full flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950">
                  <div className="w-full max-w-[400px]">
                    <div className="mx-auto mb-6 h-10 w-10 rounded-lg bg-indigo-600"></div>
                    <div className="mx-auto mb-8 h-6 w-48 rounded bg-zinc-200 dark:bg-zinc-800"></div>
                    <div className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                      <div className="mb-2 h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-800"></div>
                      <div className="mb-4 h-10 w-full rounded-lg border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950"></div>

                      <div className="mb-2 h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-800"></div>
                      <div className="mb-6 h-10 w-full rounded-lg border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950"></div>

                      <div className="h-10 w-full rounded-lg bg-indigo-600"></div>
                    </div>
                  </div>
                  {/* Overlay text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900/10 backdrop-blur-[2px] dark:bg-black/40">
                    <p className="mb-2 text-sm font-medium text-zinc-900 shadow-sm dark:text-white">
                      Interactive Preview Available
                    </p>
                    <span className="text-xs text-zinc-600 dark:text-zinc-300">
                      Click "Open in new tab" to interact
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ComponentPreview>
          <CodeBlock code={codeString} />
        </section>

        <div id="installation" className="scroll-mt-24">
          <InstallationTabs
            componentName="auth-layout"
            manualCode={`import { Card, CardBody, Heading } from "@hudbird/ui";

export default function Example() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-4">
      <Card className="w-full max-w-sm">
        <CardBody className="p-8">
          <Heading className="text-center mb-6">Sign in to your account</Heading>
          {/* Auth form */}
        </CardBody>
      </Card>
    </div>
  );
}`}
          />
        </div>
      </div>
    </div>
  );
}
