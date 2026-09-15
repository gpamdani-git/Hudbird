import React from "react";
import { PageToolbar } from "../components/PageToolbar";
import { Menu, ChevronRight } from "lucide-react";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { InstallationTabs } from "../components/InstallationTabs";
import StackedLayoutDemo from "./demos/StackedLayoutDemo";

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
    <div className="flex w-full flex-col items-center pt-24 pb-24">
      <div className="mx-auto w-full max-w-7xl space-y-8 px-4 sm:px-8 lg:px-12">
        {/* Title & Subtitle */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="w-full min-w-0 flex-1 pr-4">
            <div className="mb-3 flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
                Stacked Layout
              </h1>
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                New
              </span>
            </div>
            <p className="pr-8 text-base text-zinc-600 lg:max-w-4xl dark:text-zinc-400">
              A classic application layout featuring a top navigation bar and a centered content
              area.
            </p>
          </div>
          <PageToolbar />
        </div>

        {/* Main Preview & Code */}
        <section className="space-y-4" id="preview">
          <ComponentPreview demoUrl="/demos/stacked" iframeMode="always">
            <div className="flex w-full items-center justify-center px-4 py-8 sm:px-8">
              <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
                <div className="relative flex h-[700px] w-full flex-col">
                  <StackedLayoutDemo />
                </div>
              </div>
            </div>
          </ComponentPreview>
          <CodeBlock code={codeString} />
        </section>

        <div id="installation" className="scroll-mt-24">
          <InstallationTabs
            componentName="stacked-layout"
            manualCode={`import { Navbar, NavbarItem } from "@/components/hudbird-ui/Navbar";

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
