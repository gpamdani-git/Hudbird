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
          Step-by-step tutorial on how to install and configure BlankUI in your React project.
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
        <p>BlankUI requires Tailwind CSS v4. Install it using the following command:</p>
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

        <h2>5. Use Components</h2>
        <p>Now you can import and use any BlankUI components directly in your application.</p>
        <CodeBlock
          language="tsx"
          code={`import { Button } from "@/components/hudbird-ui/Button";\nimport { Alert } from "@/components/hudbird-ui/Alert";

function App() {
  return (
    <div className="p-8 space-y-4">
      <Alert title="Welcome" description="BlankUI is successfully installed!" color="success" />
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
