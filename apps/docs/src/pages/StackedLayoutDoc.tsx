import React from "react";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";

export const stackedTocItems = [
  { id: "preview", title: "Preview" },
];

export default function StackedLayoutDoc() {
  const codeString = `// Full source code available in the demo URL.
// The Stacked Layout features a top Navbar and a centered max-w-7xl main content area.
import StackedLayoutDemo from "./demos/StackedLayoutDemo";

export default function App() {
  return <StackedLayoutDemo />;
}
`;

  return (
    <div className="space-y-16 pb-24">
      {/* Title & Subtitle */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Stacked Layout
          </h1>
          <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full border border-emerald-500/20">
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
          <div className="w-full flex items-center justify-center p-4">
            <div className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-xl border border-zinc-200 dark:border-zinc-800">
              {/* Fake Mini Preview */}
              <div className="h-[500px] w-full bg-zinc-50 dark:bg-zinc-950 flex flex-col relative">
                {/* Navbar */}
                <div className="h-14 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-6 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                     <div className="w-6 h-6 rounded-full bg-indigo-600"></div>
                     <div className="flex gap-4">
                       <div className="h-2 w-12 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                       <div className="h-2 w-12 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                       <div className="h-2 w-12 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                     </div>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800"></div>
                </div>
                {/* Header */}
                <div className="h-20 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-6 flex items-center justify-between">
                  <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                  <div className="h-8 w-24 bg-indigo-600 rounded-md"></div>
                </div>
                {/* Content */}
                <div className="p-6 flex-1 bg-zinc-50 dark:bg-zinc-950">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="h-24 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg"></div>
                    <div className="h-24 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg"></div>
                    <div className="h-24 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg"></div>
                  </div>
                  <div className="h-48 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg"></div>
                </div>
                {/* Overlay text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900/10 dark:bg-black/40 backdrop-blur-[2px]">
                  <p className="text-zinc-900 dark:text-white font-medium text-sm mb-2 shadow-sm">Interactive Preview Available</p>
                  <span className="text-xs text-zinc-600 dark:text-zinc-300">Click "Open in new tab" to interact</span>
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>
        <CodeBlock code={codeString} />
      </section>
    </div>
  );
}
