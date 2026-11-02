import React from "react";
import { DocHeader } from "../components/DocHeader";
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
    <div className="space-y-24 pb-24 sm:space-y-32">
      <DocHeader
        category="APPLICATION LAYOUTS"
        title="Stacked Layout"
        badge="Layout"
        description="A classic application layout featuring a responsive top navigation bar, containerized breadcrumbs, and a centered content area."
      />

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
          manualCode={`import { Navbar, NavbarItem, Container } from "@hudbird/ui";

export default function Example() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Navbar>
        <NavbarItem href="/">Home</NavbarItem>
      </Navbar>
      <Container size="xl" className="py-8">
        Content goes here
      </Container>
    </div>
  );
}`}
        />
      </div>
    </div>
  );
}
