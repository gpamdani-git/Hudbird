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
    <div className="pb-24 w-full flex flex-col items-center">
      <div className="sticky top-14 z-30 w-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md py-4 px-4 sm:px-6 lg:px-8 transition-all border-b border-zinc-200/50 dark:border-zinc-800/50 mb-8">
        <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
          {onOpenSidebar && (
            <button 
              onClick={onOpenSidebar}
              className="p-1.5 -ml-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors"
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

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12 space-y-16">
      {/* Title & Subtitle */}
      <div className="-mt-8">
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

      <div id="installation" className="scroll-mt-24">
        <InstallationTabs componentName="auth-layout"  manualCode={`import { Card, CardBody, Heading } from "@hudbird/ui";

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
}`} />
      </div>
      </div>
    </div>
  );
}
