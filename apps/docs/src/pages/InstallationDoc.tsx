import React from "react";
import { PageToolbar } from "../components/PageToolbar";
import { CodeBlock } from "../components/CodeBlock";

export default function InstallationDoc() {
  return (
    <div className="mx-auto w-full">
      <PageToolbar />

      <div className="mb-8 max-w-3xl">
        <h1 className="text-foreground mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Installation Guide
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Step-by-step tutorial on how to install and configure Hudbird UI in your React project.
        </p>
      </div>

      <div className="prose prose-zinc dark:prose-invert max-w-3xl">
        <h2>1. Create a New React Project</h2>
        <p>If you don't already have a React project, you can create one using Vite.</p>
        <CodeBlock
          language="bash"
          code="npm create vite@latest my-app -- --template react-ts\ncd my-app"
        />

        <h2>2. Install Tailwind CSS v4</h2>
        <p>Hudbird UI requires Tailwind CSS v4. Install it using the following command:</p>
        <CodeBlock language="bash" code="npm install tailwindcss @tailwindcss/vite" />
        <p>Configure Vite to use the Tailwind plugin:</p>
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

        <h2>3. Initialize Hudbird UI</h2>
        <p>
          Run the CLI to automatically install dependencies and configure your project for Hudbird
          UI.
        </p>
        <CodeBlock language="bash" code="npx hudbird-ui@latest init" />

        <h2>4. Add Components</h2>
        <p>
          You can now use the CLI to add components to your project. It will automatically resolve
          dependencies and place them in your components folder.
        </p>
        <CodeBlock language="bash" code="npx hudbird-ui@latest add Button Alert" />

        <h2>5. CLI Commands Reference</h2>
        <p>
          The official Hudbird UI CLI provides a full suite of developer utilities for component
          scaffolding, batch installations, and upstream diffing:
        </p>

        <div className="not-prose my-6 flex items-center justify-between rounded-xl border border-indigo-200 bg-indigo-50/50 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/30">
          <div>
            <h4 className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">
              Looking for the complete CLI manual?
            </h4>
            <p className="mt-0.5 text-xs text-indigo-700/80 dark:text-indigo-300/80">
              Read the full CLI documentation for multi-select prompts, --all flag, LCS diff engine,
              and components.json schema.
            </p>
          </div>
          <a
            href="#/cli"
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-indigo-500"
          >
            CLI Reference &rarr;
          </a>
        </div>

        <h3>List Available Components &amp; Status</h3>
        <p>
          Inspect all 62 components categorized by domain with your local installation status (
          <code>✔ installed</code> vs <code>○ available</code>):
        </p>
        <CodeBlock
          language="bash"
          code="npx hudbird-ui@latest list\n# Or shorthand:\nnpx hudbird-ui@latest ls"
        />

        <h3>Inspect Component Differences &amp; Upstream Updates</h3>
        <p>
          Compare your local component code against upstream registry updates using our
          zero-dependency diff engine:
        </p>
        <CodeBlock
          language="bash"
          code="npx hudbird-ui@latest diff Button\n# Or scan all installed components across the project:\nnpx hudbird-ui@latest diff"
        />

        <h3>Batch Component Installation</h3>
        <p>Install multiple components or launch the interactive multi-select menu:</p>
        <CodeBlock
          language="bash"
          code="# Batch install\nnpx hudbird-ui@latest add Button Input Select Card Dialog\n\n# Interactive multi-select menu\nnpx hudbird-ui@latest add\n\n# Install all 62 components\nnpx hudbird-ui@latest add --all"
        />

        <h3>Configuration file (components.json)</h3>
        <p>
          Customize your import aliases, base color, and CSS variables in{" "}
          <code>components.json</code>:
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

        <h2>6. Use Components</h2>
        <p>Now you can import and use any Hudbird UI components directly in your application.</p>
        <CodeBlock
          language="tsx"
          code={`import { Button } from "@/components/hudbird-ui/Button";\nimport { Alert } from "@/components/hudbird-ui/Alert";

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
      </div>
    </div>
  );
}
