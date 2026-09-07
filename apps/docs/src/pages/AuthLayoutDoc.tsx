import React from "react";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";

export const authTocItems = [
  { id: "preview", title: "Preview" },
];

export default function AuthLayoutDoc() {
  const codeString = `// Full source code available in the demo URL.
// The Auth Layout features a centered card with a clean, distraction-free background.
import AuthLayoutDemo from "./demos/AuthLayoutDemo";

export default function App() {
  return <AuthLayoutDemo />;
}
`;

  return (
    <div className="space-y-16 pb-24">
      {/* Title & Subtitle */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Auth Layout
          </h1>
          <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full border border-emerald-500/20">
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
          <div className="w-full flex items-center justify-center p-4">
            <div className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-xl border border-zinc-200 dark:border-zinc-800">
              {/* Fake Mini Preview */}
              <div className="h-[600px] w-full bg-zinc-50 dark:bg-zinc-950 flex flex-col relative items-center justify-center">
                <div className="w-full max-w-[400px]">
                  <div className="w-10 h-10 rounded-lg bg-indigo-600 mx-auto mb-6"></div>
                  <div className="h-6 w-48 bg-zinc-200 dark:bg-zinc-800 rounded mx-auto mb-8"></div>
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-8 shadow-sm">
                    <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded mb-2"></div>
                    <div className="h-10 w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg mb-4"></div>
                    
                    <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded mb-2"></div>
                    <div className="h-10 w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg mb-6"></div>
                    
                    <div className="h-10 w-full bg-indigo-600 rounded-lg"></div>
                  </div>
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
