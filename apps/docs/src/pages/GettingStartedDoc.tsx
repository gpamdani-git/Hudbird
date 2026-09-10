import React from "react";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
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

export const gettingStartedTocItems = [
  { id: "installation", title: "Installation" },
  { id: "getting-started", title: "Getting started" },
  { id: "before-you-start", title: "Before you start" },
  { id: "adding-hudbird", title: "Adding Hudbird to your project" },
  { id: "installing-dependencies", title: "Installing dependencies" },
  { id: "router-integration", title: "Client-side router integration" },
  { id: "setup-font", title: "Optional: Setup font family" },
  { id: "framework-examples", title: "Framework integration" },
];

export default function GettingStartedDoc() {
  return (
    <div className="space-y-16 pb-24">
      {/* 1. Getting started */}
      <div id="getting-started" className="scroll-mt-24">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
          Getting started
        </h1>
        <p className="mb-8 text-lg text-zinc-600 dark:text-zinc-400">
          Fly through your development. Minimize the noise, keep the essence.
        </p>

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

      {/* 2. Before you start */}
      <section id="before-you-start" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Before you start</h2>
        <Text>
          Hudbird UI is built on top of modern web technologies. Before integrating our components,
          ensure your project meets the following prerequisites:
        </Text>
        <ul className="mt-4 list-inside list-disc space-y-2 text-zinc-600 dark:text-zinc-400">
          <li>A working React 18+ environment (Next.js, Vite, or Remix).</li>
          <li>Tailwind CSS installed and configured in your project.</li>
          <li>Basic familiarity with Tailwind CSS utility classes.</li>
        </ul>
      </section>

      {/* 3. Adding Catalyst (Hudbird) to your project */}
      <section id="adding-hudbird" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Adding Hudbird to your project
        </h2>

        <div className="my-6 rounded-xl border border-emerald-100 bg-emerald-50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-bold text-emerald-900 dark:text-emerald-300">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-200 text-xs dark:bg-emerald-800">
              ✨
            </span>
            New in v1.1.2: Native Tailwind CSS v4 Support
          </h3>
          <p className="text-sm text-emerald-800/80 dark:text-emerald-200/80">
            The Hudbird CLI now seamlessly supports Tailwind CSS v4! When initialized in a v4
            project, it skips legacy configuration files and natively injects{" "}
            <Code className="bg-emerald-100 text-xs dark:bg-emerald-800">@theme</Code> variables
            directly into your CSS. We also fully support{" "}
            <Code className="bg-emerald-100 text-xs dark:bg-emerald-800">pnpm</Code>,{" "}
            <Code className="bg-emerald-100 text-xs dark:bg-emerald-800">npm</Code>,{" "}
            <Code className="bg-emerald-100 text-xs dark:bg-emerald-800">yarn</Code>, and{" "}
            <Code className="bg-emerald-100 text-xs dark:bg-emerald-800">bun</Code> natively. See
            the{" "}
            <a href="/changelog" className="font-semibold underline underline-offset-2">
              Changelog
            </a>{" "}
            for full details.
          </p>
        </div>

        <Text>
          The fastest way to get started is by using our CLI tool. This will scaffold the core
          configuration and allow you to cherry-pick the exact components you need.
        </Text>
        <div className="mt-4">
          <CodeBlock code="npx hudbird-ui@latest init" />
        </div>
        <Text className="mt-4">
          You can now use the new <Code>add</Code> command to seamlessly install any component into
          your project:
        </Text>
        <div className="mt-4">
          <CodeBlock code="npx hudbird-ui@latest add [component-name]" />
        </div>
      </section>

      {/* 4. Installing dependencies */}
      <section id="installing-dependencies" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Installing dependencies
        </h2>
        <Text>
          Hudbird UI relies on a few featherweight, highly optimized headless libraries to handle
          complex interactions, accessibility, and animations. Install the core dependencies:
        </Text>
        <div className="mt-4">
          <CodeBlock code="pnpm add @radix-ui/react-slot class-variance-authority clsx tailwind-merge lucide-react" />
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
          Next.js Router) to prevent full-page reloads.
        </Text>
        <Text className="mt-2">
          When configuring your <Code>HudbirdProvider</Code>, pass your router's navigation
          function:
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

      {/* 6. Optional: Setup Plus Jakarta Sans font family */}
      <section id="setup-font" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Optional: Setup Plus Jakarta Sans
        </h2>
        <Text>
          To achieve the exact typography aesthetic seen in our documentation, we recommend using{" "}
          <Strong>Plus Jakarta Sans</Strong>.
        </Text>
        <Text className="mt-2">First, import the font in your main CSS or HTML file:</Text>
        <div className="mt-4">
          <CodeBlock
            code={`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');`}
          />
        </div>
        <Text className="mt-4">
          Then, configure it as your default sans font in <Code>tailwind.config.js</Code>:
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

      {/* 7. Framework integration examples */}
      <section id="framework-examples" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Framework integration examples
        </h2>
        <Text>Hudbird UI works seamlessly across all modern React frameworks.</Text>
        <div className="mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Framework</TableHead>
                <TableHead>Support Status</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold text-zinc-900 dark:text-zinc-50">
                  Next.js (App Router)
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                    First-class
                  </span>
                </TableCell>
                <TableCell className="text-zinc-500 dark:text-zinc-400">
                  Fully supported. Requires <Code>"use client"</Code> on interactive components.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-zinc-900 dark:text-zinc-50">
                  Vite (React)
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                    First-class
                  </span>
                </TableCell>
                <TableCell className="text-zinc-500 dark:text-zinc-400">
                  Fully supported out of the box.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-zinc-900 dark:text-zinc-50">
                  Remix
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                    First-class
                  </span>
                </TableCell>
                <TableCell className="text-zinc-500 dark:text-zinc-400">
                  Supported with standard Tailwind config.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
}
