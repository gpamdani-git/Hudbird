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

        <h2>3. Install BlankUI</h2>
        <p>
          Install the BlankUI package along with its dependencies like Framer Motion and Lucide
          React.
        </p>
        <CodeBlock
          language="bash"
          code="npm install @hudbird/ui framer-motion lucide-react class-variance-authority"
        />

        <h2>4. Import CSS and Theme</h2>
        <p>
          In your main CSS file (e.g., <code>src/index.css</code>), import the Tailwind CSS
          utilities and optionally apply the BlankUI theme variables.
        </p>
        <CodeBlock
          language="css"
          code={`@import "tailwindcss";
@import "@hudbird/ui/styles.css";

/* Or define your custom variables here */
@theme {
  --color-primary: var(--primary);
  /* ... */
}`}
        />

        <h2>5. Use Components</h2>
        <p>Now you can import and use any BlankUI components directly in your application.</p>
        <CodeBlock
          language="tsx"
          code={`import { Button, Alert } from "@hudbird/ui";

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
