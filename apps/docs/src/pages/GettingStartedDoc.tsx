import React from "react";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { CliCommandTabs } from "../components/CliCommandTabs";
import {
  Text,
  Strong,
  Code,
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@hudbird/ui";
import { PageToolbar } from "../components/PageToolbar";

export const gettingStartedTocItems = [
  { id: "getting-started", title: "Getting started" },
  { id: "new-project", title: "New Project Quickstart" },
  { id: "existing-project", title: "Existing Project Installation" },
  { id: "smart-cli", title: "Using the Smart CLI" },
  { id: "router-integration", title: "Router integration" },
  { id: "setup-font", title: "Setup font family" },
];

export default function GettingStartedDoc() {
  return (
    <div className="space-y-16 pb-24">
      {/* 1. Getting started */}
      <div id="getting-started" className="scroll-mt-24">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="w-full min-w-0 flex-1 pr-4">
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
              Getting started
            </h1>
            <p className="mb-8 pr-32 text-base text-zinc-600 sm:pr-40 dark:text-zinc-400">
              Fly through your development. Minimize the noise, keep the essence.
            </p>
          </div>
          <PageToolbar />
        </div>

        <div className="space-y-4 rounded-2xl border border-indigo-100 bg-indigo-50 p-6 md:p-8 dark:border-indigo-900/50 dark:bg-indigo-950/30">
          <h2 className="text-xl font-bold text-indigo-900 dark:text-indigo-300">
            The Hudbird DNA
          </h2>
          <div className="space-y-4 text-indigo-800/80 dark:text-indigo-200/80">
            <p>
              <Strong className="text-indigo-900 dark:text-indigo-200">Precise Navigation</Strong> —
              Seperti burung Hudhud yang terkenal dengan navigasinya yang luar biasa akurat, library
              ini menawarkan komponen dengan struktur tata letak (layout) dan spacing Tailwind yang
              sangat presisi.
            </p>
            <p>
              <Strong className="text-indigo-900 dark:text-indigo-200">Aesthetic Crown</Strong> —
              Terinspirasi dari mahkota khas Hudhud, komponen ini memberikan sentuhan akhir yang
              elegan dan premium meskipun mengusung tema minimalis.
            </p>
            <p>
              <Strong className="text-indigo-900 dark:text-indigo-200">Featherweight Core</Strong> —
              Sangat ringan, cepat, dan berfokus menghilangkan visual noise yang tidak perlu pada
              performa web modern.
            </p>
          </div>
        </div>
      </div>

      {/* 2. New Project */}
      <section id="new-project" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          New Project Quickstart
        </h2>
        <Text>
          If you are starting from scratch, the fastest way to begin is by generating a new Vite or
          Next.js project with Tailwind CSS already configured.
        </Text>

        <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          For Vite (React):
        </h3>
        <CodeBlock
          code="npm create vite@latest my-app -- --template react-ts
cd my-app
npm install -D tailwindcss @tailwindcss/vite
npm run dev"
        />

        <h3 className="mt-6 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          For Next.js:
        </h3>
        <CodeBlock
          code="npx create-next-app@latest my-app
cd my-app
npm run dev"
        />
      </section>

      {/* 3. Existing Project */}
      <section id="existing-project" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Adding to an Existing Project
        </h2>
        <Text>
          Ensure your project has React 18+ and Tailwind CSS installed. To initialize Hudbird UI,
          run our setup command at the root of your project:
        </Text>
        <CliCommandTabs commandType="init" />
        <Text className="text-sm text-zinc-500">
          This command will set up the necessary base dependencies and prepare your project for
          component installation.
        </Text>
      </section>

      {/* 4. Smart CLI */}
      <section id="smart-cli" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Using the Smart CLI</h2>
        <Text>
          Hudbird UI features a highly intelligent CLI designed to make adding components a breeze.
          To add any component, simply run:
        </Text>
        <CliCommandTabs commandType="add" />

        <div className="mt-6 space-y-4">
          <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
              🧠 Auto Dependency Resolution
            </h4>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              When you install a component (e.g. <Code>Hero</Code>), the CLI will automatically
              detect and install any nested component dependencies it requires (e.g.{" "}
              <Code>Button</Code>, <Code>Badge</Code>), and auto-install required NPM packages like{" "}
              <Code>framer-motion</Code> using your preferred package manager (npm, pnpm, bun, or
              yarn).
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">📁 Smart Pathing</h4>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              The CLI detects your folder structure. If you have a <Code>src/</Code> directory,
              components are placed in <Code>src/components/hudbird-ui</Code>. If not, they are
              placed in <Code>components/hudbird-ui</Code>.
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
              🛡️ Overwrite Protection
            </h4>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Accidentally ran the install command twice? The CLI checks if a component already
              exists and prompts you before overwriting, protecting your customized code.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Client-side router integration */}
      <section id="router-integration" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Client-side router integration
        </h2>
        <Text>
          For components that perform navigation (like <Code>Navbar</Code> or <Code>Sidebar</Code>{" "}
          items), you may want to integrate them with your framework's router (e.g., React Router or
          Next.js Router) to prevent full-page reloads. Pass your router's navigation function to
          the <Code>HudbirdProvider</Code>:
        </Text>
        <div className="mt-4">
          <CodeBlock
            code={`import { useNavigate } from "react-router-dom";
import { HudbirdProvider } from "@hudbird/ui";

export function App() {
  const navigate = useNavigate();
  
  return (
    <HudbirdProvider navigate={navigate}>
      {/* Your app */}
    </HudbirdProvider>
  );
}`}
          />
        </div>
      </section>

      {/* 6. Setup font family */}
      <section id="setup-font" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Optional: Setup Plus Jakarta Sans
        </h2>
        <Text>
          To achieve the exact typography aesthetic seen in our documentation, we recommend using{" "}
          <Strong>Plus Jakarta Sans</Strong>. First, import the font in your main CSS or HTML file:
        </Text>
        <div className="mt-4">
          <CodeBlock
            code={`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');`}
          />
        </div>
        <Text className="mt-4">
          Then, configure it as your default sans font in <Code>tailwind.config.js</Code> (or CSS
          via <Code>@theme</Code> for Tailwind v4):
        </Text>
        <div className="mt-4">
          <CodeBlock
            code={`/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
    },
  },
}`}
          />
        </div>
      </section>
    </div>
  );
}
