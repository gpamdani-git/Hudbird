import React from "react";
import { CodeBlock } from "../components/CodeBlock";
import { Text, Strong, Code } from "@hudbird/ui";

export const supportTocItems = [
  { id: "requirements", title: "System Requirements" },
  { id: "frameworks", title: "Supported Frameworks" },
  { id: "faq", title: "Frequently Asked Questions (FAQ)" },
];

export default function SupportDoc() {
  return (
    <div className="space-y-16 pb-24">
      {/* 1. Requirements */}
      <div id="requirements" className="scroll-mt-24">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
          Support & FAQ
        </h1>
        <p className="mb-8 text-lg text-zinc-600 dark:text-zinc-400">
          Information about supported library versions, framework compatibility, and troubleshooting
          for common issues.
        </p>

        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">System Requirements</h2>
        <div className="mt-6 space-y-6">
          <div className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
            <h3 className="mb-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">React</h3>
            <p className="mb-4 text-zinc-600 dark:text-zinc-400">
              Hudbird UI requires <Strong>React 18</Strong> or <Strong>React 19</Strong>.
            </p>
            <div className="rounded-lg border border-orange-100 bg-orange-50 p-4 dark:border-orange-900/50 dark:bg-orange-950/30">
              <h4 className="font-semibold text-orange-900 dark:text-orange-200">
                React 19 Compatibility Note
              </h4>
              <p className="mt-1 text-sm text-orange-800 dark:text-orange-300">
                While Hudbird UI supports React 19, many third-party libraries (like{" "}
                <Code>@react-three/fiber</Code> or <Code>framer-motion</Code>) might still enforce{" "}
                <Code>peerDependencies</Code> for React 18. If you encounter <Code>ERESOLVE</Code>{" "}
                conflicts during NPM installation, check our FAQ section below.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
            <h3 className="mb-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Tailwind CSS
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Optimized for <Strong>Tailwind CSS v4</Strong>. The CLI automatically injects native{" "}
              <Code>@theme</Code> blocks for v4 projects, but we also maintain full backward
              compatibility for <Strong>Tailwind CSS v3</Strong> via standard{" "}
              <Code>tailwind.config.js</Code> presets.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
            <h3 className="mb-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Core Dependencies
            </h3>
            <ul className="list-disc space-y-2 pl-5 text-zinc-600 dark:text-zinc-400">
              <li>
                <Strong>Framer Motion</Strong>: v11.0.0 or higher.
              </li>
              <li>
                <Strong>Lucide React</Strong>: Any recent version for iconography.
              </li>
              <li>
                <Strong>Radix UI Primitives</Strong>: v1.0.0 or higher (Installed automatically when
                needed).
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 2. Frameworks */}
      <section id="frameworks" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Supported Frameworks</h2>
        <Text>
          Since Hudbird UI is built as a set of React components rather than a compiled library, it
          works seamlessly anywhere React and Tailwind CSS work.
        </Text>
        <ul className="mt-4 list-inside list-disc space-y-2 text-zinc-600 dark:text-zinc-400">
          <li>
            <Strong>Next.js</Strong> (App Router & Pages Router)
          </li>
          <li>
            <Strong>Vite</Strong> (React)
          </li>
          <li>
            <Strong>Remix</Strong>
          </li>
          <li>
            <Strong>Gatsby</Strong>
          </li>
        </ul>
      </section>

      {/* 3. FAQ */}
      <section id="faq" className="scroll-mt-24 space-y-6">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Frequently Asked Questions (FAQ)
        </h2>

        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Why do I get an ERESOLVE / Peer Dependency error when installing components?
            </h3>
            <Text>
              If you are using NPM and React 19, you might see an error like:{" "}
              <Code>npm ERR! ERESOLVE unable to resolve dependency tree</Code>. This happens because
              some packages (like Three.js wrappers or Framer Motion) have strict peer dependencies
              explicitly requiring React 18, and NPM v7+ strictly enforces this by blocking the
              installation.
            </Text>
            <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              <Strong>Solutions:</Strong>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>
                  <Strong>Use pnpm or yarn:</Strong> Modern package managers handle these mismatches
                  gracefully without breaking.
                </li>
                <li>
                  <Strong>Downgrade to React 18:</Strong> If you don't need React 19 features,
                  downgrade your React version.
                </li>
                <li>
                  <Strong>Use overrides:</Strong> Add an overrides block in your{" "}
                  <Code>package.json</Code> to force React 19 resolution.
                </li>
                <li>
                  <Strong>Force install:</Strong> Run the installation manually with the{" "}
                  <Code>--legacy-peer-deps</Code> flag.
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Why did the CLI skip installing a component?
            </h3>
            <Text>
              Our CLI includes a <Strong>Smart Overwrite Protection</Strong> feature. If it detects
              that a component (e.g., <Code>Button.tsx</Code>) already exists in your{" "}
              <Code>src/components/hudbird-ui</Code> folder, it will prompt you before overwriting
              it. If you decline, it skips the installation to protect any custom styling or logic
              you've added to that component.
            </Text>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Do I have to use the CLI?
            </h3>
            <Text>
              Not at all! Hudbird UI is designed to be fully copy-pasteable. You can manually create
              the files, copy the code from our GitHub repository, and install the required
              dependencies yourself. However, the CLI automates dependency resolution, path
              rewriting, and <Code>index.ts</Code> generation, which significantly speeds up
              development.
            </Text>
          </div>
        </div>
      </section>
    </div>
  );
}
