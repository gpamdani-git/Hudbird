import React from "react";
import { Menu, ChevronRight } from "lucide-react";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { InstallationTabs } from "../components/InstallationTabs";

export const stackedTocItems = [
  { id: "installation", title: "Installation" },
  { id: "preview", title: "Preview" },
];

export default function StackedLayoutDoc({ onOpenSidebar }: { onOpenSidebar?: () => void }) {
  const codeString = `// Full source code available in the demo URL.
// The Stacked Layout features a top Navbar and a centered max-w-7xl main content area.
import StackedLayoutDemo from "./demos/StackedLayoutDemo";

export default function App() {
  return <StackedLayoutDemo />;
}
`;

  return (
    <div className="flex w-full flex-col items-center pb-24">
      <div className="sticky top-14 z-30 mb-8 w-full border-b border-zinc-200/50 bg-white/80 px-4 py-4 backdrop-blur-md transition-all sm:px-6 lg:px-8 dark:border-zinc-800/50 dark:bg-zinc-950/80">
        <div className="flex items-center gap-3 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {onOpenSidebar && (
            <button
              onClick={onOpenSidebar}
              className="-ml-1.5 rounded-md p-1.5 text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              aria-label="Open Navigation"
            >
              <Menu size={18} />
            </button>
          )}
          <span>Layouts section</span>
          <ChevronRight size={14} className="text-zinc-400" />
          <span className="text-zinc-900 dark:text-zinc-100">Stacked Layout</span>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl space-y-16 px-4 sm:px-8 lg:px-12">
        {/* Title & Subtitle */}
        <div>
          <div className="mb-3 flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
              Stacked Layout
            </h1>
            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              New
            </span>
          </div>
          <p className="text-base text-zinc-600 dark:text-zinc-400">
            A classic application layout featuring a top navigation bar and a centered content area.
          </p>
        </div>

        {/* Main Preview & Code */}
        <section className="space-y-4" id="preview">
          <ComponentPreview demoUrl="/demos/stacked" iframeMode="always">
            <div className="flex w-full items-center justify-center p-4">
              <div className="w-full max-w-5xl overflow-hidden rounded-2xl border border-zinc-200 shadow-xl dark:border-zinc-800">
                {/* Fake Mini Preview */}
                <div className="relative flex h-[500px] w-full flex-col bg-zinc-50 dark:bg-zinc-950">
                  {/* Navbar */}
                  <div className="flex h-14 items-center justify-between border-b border-zinc-200 bg-white px-6 dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="flex items-center gap-6">
                      <div className="h-6 w-6 rounded-full bg-indigo-600"></div>
                      <div className="flex gap-4">
                        <div className="h-2 w-12 rounded bg-zinc-200 dark:bg-zinc-800"></div>
                        <div className="h-2 w-12 rounded bg-zinc-200 dark:bg-zinc-800"></div>
                        <div className="h-2 w-12 rounded bg-zinc-200 dark:bg-zinc-800"></div>
                      </div>
                    </div>
                    <div className="h-6 w-6 rounded-full bg-zinc-200 dark:bg-zinc-800"></div>
                  </div>
                  {/* Header */}
                  <div className="flex h-20 items-center justify-between border-b border-zinc-200 bg-white px-6 dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="h-4 w-32 rounded bg-zinc-200 dark:bg-zinc-800"></div>
                    <div className="h-8 w-24 rounded-md bg-indigo-600"></div>
                  </div>
                  {/* Content */}
                  <div className="flex-1 bg-zinc-50 p-6 dark:bg-zinc-950">
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <div className="h-24 rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"></div>
                      <div className="h-24 rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"></div>
                      <div className="h-24 rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"></div>
                    </div>
                    <div className="h-48 rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"></div>
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
            componentName="stacked-layout"
            manualCode={`import { Navbar, NavbarItem } from "@hudbird/ui";

export default function Example() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar>
        <NavbarItem href="/">Home</NavbarItem>
      </Navbar>
      <main className="max-w-7xl mx-auto px-4 py-8">
        Content goes here
      </main>
    </div>
  );
}`}
          />
        </div>
      </div>
    </div>
  );
}
