import React from "react";
import { DocHeader } from "../components/DocHeader";
import { CodeBlock } from "../components/CodeBlock";

export default function InstallationDoc() {
  return (
    <div className="mx-auto w-full pb-32">
      <DocHeader
        category="ESSENTIALS"
        title="Installation"
        badge="v2.0"
        description="Step-by-step tutorial on how to install and configure Hudbird UI in your React project with Tailwind CSS v4."
      />

      <div className="max-w-4xl space-y-24 sm:space-y-32">
        {/* Step 1 */}
        <section id="create-project" className="scroll-mt-24 space-y-6 sm:space-y-8">
          <h2 className="font-outfit text-3xl font-medium tracking-[-0.8px] leading-[1.22] text-zinc-900 sm:text-4xl dark:text-white">
            1. Create a New React Project
          </h2>
          <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 sm:text-lg dark:text-[#E5E5E5]">
            <strong className="font-semibold text-zinc-900 dark:text-white">Start with Vite.</strong>{" "}
            If you don&apos;t already have an existing React application, scaffold a clean TypeScript
            workspace using the official template:
          </p>
          <CodeBlock
            language="bash"
            code="npm create vite@latest my-app -- --template react-ts\ncd my-app"
          />
        </section>

        {/* Step 2 */}
        <section id="install-tailwind" className="scroll-mt-24 space-y-6 sm:space-y-8">
          <h2 className="font-outfit text-3xl font-medium tracking-[-0.8px] leading-[1.22] text-zinc-900 sm:text-4xl dark:text-white">
            2. Install Tailwind CSS v4
          </h2>
          <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 sm:text-lg dark:text-[#E5E5E5]">
            <strong className="font-semibold text-zinc-900 dark:text-white">CSS-First Architecture.</strong>{" "}
            Hudbird UI is engineered natively for Tailwind CSS v4. Install the core engine and the Vite plugin:
          </p>
          <CodeBlock language="bash" code="npm install tailwindcss @tailwindcss/vite" />

          <p className="pt-2 text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 sm:text-lg dark:text-[#E5E5E5]">
            Configure your <code className="rounded bg-zinc-200/60 px-1.5 py-0.5 font-mono text-xs dark:border dark:border-[#2E2F33] dark:bg-[#202124] dark:text-[#E5E5E5]">vite.config.ts</code> to enable the Tailwind plugin:
          </p>
          <CodeBlock
            language="typescript"
            code={`// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});`}
          />
        </section>

        {/* Step 3 */}
        <section id="init-hudbird" className="scroll-mt-24 space-y-6 sm:space-y-8">
          <h2 className="font-outfit text-3xl font-medium tracking-[-0.8px] leading-[1.22] text-zinc-900 sm:text-4xl dark:text-white">
            3. Initialize Hudbird UI
          </h2>
          <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 sm:text-lg dark:text-[#E5E5E5]">
            <strong className="font-semibold text-zinc-900 dark:text-white">Automated Scaffolding.</strong>{" "}
            Run the CLI initialization command to automatically resolve peer dependencies, configure path aliases, and generate your <code className="rounded bg-zinc-200/60 px-1.5 py-0.5 font-mono text-xs dark:border dark:border-[#2E2F33] dark:bg-[#202124] dark:text-[#E5E5E5]">components.json</code> file:
          </p>
          <CodeBlock language="bash" code="npx hudbird-ui@latest init" />
        </section>

        {/* Step 4 */}
        <section id="add-components" className="scroll-mt-24 space-y-6 sm:space-y-8">
          <h2 className="font-outfit text-3xl font-medium tracking-[-0.8px] leading-[1.22] text-zinc-900 sm:text-4xl dark:text-white">
            4. Add Components
          </h2>
          <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 sm:text-lg dark:text-[#E5E5E5]">
            <strong className="font-semibold text-zinc-900 dark:text-white">On-Demand Registry.</strong>{" "}
            Pull individual primitives or batch-install multiple components directly into your codebase with zero vendor lock-in:
          </p>
          <CodeBlock language="bash" code="npx hudbird-ui@latest add Button Alert" />
        </section>

        {/* Step 5 */}
        <section id="cli-reference" className="scroll-mt-24 space-y-8">
          <h2 className="font-outfit text-3xl font-medium tracking-[-0.8px] leading-[1.22] text-zinc-900 sm:text-4xl dark:text-white">
            5. CLI Commands Reference
          </h2>
          <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 sm:text-lg dark:text-[#E5E5E5]">
            The official Hudbird UI CLI provides a full suite of developer utilities for component
            scaffolding, batch installations, and upstream diffing:
          </p>

          <div className="my-8 rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 sm:p-8 dark:border-[#2E2F33] dark:bg-[#202124]">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <h3 className="mb-2 text-xl font-medium tracking-tight text-zinc-900 dark:text-white">
                  Looking for the complete CLI manual?
                </h3>
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-[#828282]">
                  Read the full CLI documentation for multi-select prompts, --all flag, LCS diff engine,
                  and components.json schema.
                </p>
              </div>
              <a
                href="#/cli"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-xs font-semibold text-zinc-900 shadow-xs transition-colors hover:bg-zinc-50 dark:border-[#2E2F33] dark:bg-[#161618] dark:text-[#E5E5E5] dark:hover:bg-[#2E2F33] dark:hover:text-indigo-400"
              >
                CLI Reference &rarr;
              </a>
            </div>
          </div>

          <div className="space-y-16 pt-6">
            <div className="space-y-4">
              <h3 className="font-outfit text-2xl font-medium tracking-[-0.5px] leading-[1.3] text-zinc-900 dark:text-white">
                List Available Components &amp; Status
              </h3>
              <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 sm:text-lg dark:text-[#E5E5E5]">
                Inspect all 62 components categorized by domain with your local installation status (
                <code className="rounded bg-zinc-200/60 px-1.5 py-0.5 font-mono text-xs dark:border dark:border-[#2E2F33] dark:bg-[#202124] dark:text-[#E5E5E5]">✔ installed</code> vs{" "}
                <code className="rounded bg-zinc-200/60 px-1.5 py-0.5 font-mono text-xs dark:border dark:border-[#2E2F33] dark:bg-[#202124] dark:text-[#E5E5E5]">○ available</code>):
              </p>
              <CodeBlock
                language="bash"
                code="npx hudbird-ui@latest list\n# Or shorthand:\nnpx hudbird-ui@latest ls"
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-outfit text-2xl font-medium tracking-[-0.5px] leading-[1.3] text-zinc-900 dark:text-white">
                Inspect Component Differences &amp; Upstream Updates
              </h3>
              <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 sm:text-lg dark:text-[#E5E5E5]">
                Compare your local component code against upstream registry updates using our
                zero-dependency diff engine:
              </p>
              <CodeBlock
                language="bash"
                code="npx hudbird-ui@latest diff Button\n# Or scan all installed components across the project:\nnpx hudbird-ui@latest diff"
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-outfit text-2xl font-medium tracking-[-0.5px] leading-[1.3] text-zinc-900 dark:text-white">
                Batch Component Installation
              </h3>
              <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 sm:text-lg dark:text-[#E5E5E5]">
                Install multiple components simultaneously or trigger the interactive keyboard selector:
              </p>
              <CodeBlock
                language="bash"
                code="# Batch install\nnpx hudbird-ui@latest add Button Input Select Card Dialog\n\n# Interactive multi-select menu\nnpx hudbird-ui@latest add\n\n# Install all 62 components\nnpx hudbird-ui@latest add --all"
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-outfit text-2xl font-medium tracking-[-0.5px] leading-[1.3] text-zinc-900 dark:text-white">
                Configuration File (components.json)
              </h3>
              <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 sm:text-lg dark:text-[#E5E5E5]">
                Customize your import aliases, base color palette, and CSS variable integration in{" "}
                <code className="rounded bg-zinc-200/60 px-1.5 py-0.5 font-mono text-xs dark:border dark:border-[#2E2F33] dark:bg-[#202124] dark:text-[#E5E5E5]">components.json</code>:
              </p>
              <CodeBlock
                language="json"
                filename="components.json"
                code={`{
  "$schema": "https://hudbird.vercel.app/schema.json",
  "style": "default",
  "tailwind": {
    "version": 4,
    "css": "src/index.css",
    "baseColor": "zinc"
  },
  "aliases": {
    "components": "@/components/hudbird-ui",
    "utils": "@/components/hudbird-ui/utils"
  }
}`}
              />
            </div>
          </div>
        </section>

        {/* Step 6 */}
        <section id="use-components" className="scroll-mt-24 space-y-6 sm:space-y-8">
          <h2 className="font-outfit text-3xl font-medium tracking-[-0.8px] leading-[1.22] text-zinc-900 sm:text-4xl dark:text-white">
            6. Use Components
          </h2>
          <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 sm:text-lg dark:text-[#E5E5E5]">
            <strong className="font-semibold text-zinc-900 dark:text-white">Ready for Production.</strong>{" "}
            Now import and compose any Hudbird UI component directly within your views:
          </p>
          <CodeBlock
            language="tsx"
            code={`import { Button } from "@/components/hudbird-ui/Button";
import { Alert } from "@/components/hudbird-ui/Alert";

function App() {
  return (
    <div className="p-8 space-y-4">
      <Alert title="Welcome" description="Hudbird UI is successfully installed!" color="success" />
      <Button variant="solid" color="primary">Click Me</Button>
    </div>
  );
}

export default App;`}
          />
        </section>
      </div>
    </div>
  );
}
