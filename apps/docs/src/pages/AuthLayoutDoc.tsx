import React from "react";
import { DocHeader } from "../components/DocHeader";
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
    <div className="space-y-24 pb-24 sm:space-y-32">
      <DocHeader
        category="APPLICATION LAYOUTS"
        title="Auth Layout"
        badge="Layout"
        description="A clean, distraction-free layout optimized for authentication and onboarding flows with centered card anchoring and tactile focus."
      />

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
          manualCode={`import { Card, CardBody, Heading, Section, Container } from "@hudbird/ui";

export default function Example() {
  return (
    <Section fullHeight spacing="none" className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4">
      <Container size="sm" centered>
        <Card className="w-full">
          <CardBody className="p-8">
            <Heading className="text-center mb-6">Sign in to your account</Heading>
            {/* Auth form */}
          </CardBody>
        </Card>
      </Container>
    </Section>
  );
}`}
        />
      </div>
    </div>
  );
}
