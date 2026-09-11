import React from "react";
import { PageToolbar } from "../components/PageToolbar";
import { Menu, ChevronRight } from "lucide-react";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { InstallationTabs } from "../components/InstallationTabs";
import AuthLayoutDemo from "./demos/AuthLayoutDemo";

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
    <div className="flex w-full flex-col items-center pt-24 pb-24">
      <div className="mx-auto w-full max-w-7xl space-y-8 px-4 sm:px-8 lg:px-12">
        {/* Title & Subtitle */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="w-full min-w-0 flex-1 pr-4">
            <div className="mb-3 flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
                Auth Layout
              </h1>
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                New
              </span>
            </div>
            <p className="pr-32 text-base text-zinc-600 sm:pr-40 lg:max-w-4xl dark:text-zinc-400">
              A clean, distraction-free layout optimized for authentication and onboarding flows.
            </p>
          </div>
          <PageToolbar />
        </div>

        {/* Main Preview & Code */}
        <section className="space-y-4" id="preview">
          <ComponentPreview demoUrl="/demos/auth" iframeMode="always">
            <div className="flex w-full items-center justify-center px-4 py-8 sm:px-8">
              <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
                <div className="relative flex h-[700px] w-full flex-col items-center justify-center">
                  <AuthLayoutDemo />
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
