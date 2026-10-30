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
    <div className="space-y-24 sm:space-y-32 pb-32">
      {/* 1. Getting started */}
      <div id="getting-started" className="scroll-mt-24">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="w-full min-w-0 flex-1 pr-4">
            <div className="mb-6 text-[14px] font-extrabold tracking-[1.4px] text-indigo-600 uppercase dark:text-indigo-400">
              ESSENTIALS
            </div>
            <h1 className="font-outfit mb-8 text-4xl sm:text-6xl lg:text-[72px] leading-[1.12] font-medium tracking-[-1.8px] sm:tracking-[-2.2px] text-zinc-900 dark:text-white">
              Getting started
            </h1>
            <p className="mb-12 max-w-3xl text-lg sm:text-xl lg:text-2xl leading-[1.6] font-normal text-zinc-600 dark:text-[#828282]">
              Fly through your development. Minimize the noise, keep the essence with kinetic
              precision.
            </p>
          </div>
          <PageToolbar />
        </div>

        <div className="space-y-4 rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-6 sm:p-8 dark:border-[#2e2f33] dark:bg-[#202124]">
          <h2 className="font-outfit text-2xl font-medium tracking-[-0.5px] text-zinc-900 dark:text-white">
            The Hudbird DNA
          </h2>
          <div className="space-y-4 text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-700 dark:text-[#e5e5e5]">
            <p>
              <Strong className="text-zinc-900 dark:text-white">Precise Navigation.</Strong> Seperti burung Hudhud yang terkenal dengan navigasinya yang luar biasa akurat, library
              ini menawarkan komponen dengan struktur tata letak (layout) dan spacing Tailwind yang
              sangat presisi.
            </p>
            <p>
              <Strong className="text-zinc-900 dark:text-white">Aesthetic Crown.</Strong> Terinspirasi dari mahkota khas Hudhud, komponen ini memberikan sentuhan akhir yang
              elegan dan premium meskipun mengusung tema minimalis.
            </p>
            <p>
              <Strong className="text-zinc-900 dark:text-white">Featherweight Core.</Strong> Sangat
              ringan, cepat, dan berfokus menghilangkan visual noise yang tidak perlu pada performa
              web modern.
            </p>
          </div>
        </div>
      </div>

      {/* 2. New Project */}
      <section id="new-project" className="scroll-mt-24 space-y-6">
        <h2 className="font-outfit text-3xl sm:text-4xl font-medium tracking-[-0.8px] leading-[1.22] text-zinc-900 dark:text-white">
          New Project Quickstart
        </h2>
        <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#E5E5E5]">
          <strong>Start from scratch.</strong> If you don't have an existing project, generate a new Vite or Next.js app with Tailwind CSS already configured:
        </p>

        <h3 className="mt-6 text-lg font-medium text-zinc-900 dark:text-zinc-100">
          For Vite (React):
        </h3>
        <CodeBlock
          code="npm create vite@latest my-app -- --template react-ts
cd my-app
npm install -D tailwindcss @tailwindcss/vite
npm run dev"
        />

        <h3 className="mt-8 text-lg font-medium text-zinc-900 dark:text-zinc-100">
          For Next.js:
        </h3>
        <CodeBlock
          code="npx create-next-app@latest my-app
cd my-app
npm run dev"
        />
      </section>

      {/* 3. Existing Project */}
      <section id="existing-project" className="scroll-mt-24 space-y-6">
        <h2 className="font-outfit text-3xl sm:text-4xl font-medium tracking-[-0.8px] leading-[1.22] text-zinc-900 dark:text-white">
          Adding to an Existing Project
        </h2>
        <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#E5E5E5]">
          Ensure your project has React 18+ and Tailwind CSS installed. To initialize Hudbird UI,
          run our setup command at the root of your project:
        </p>
        <CliCommandTabs commandType="init" />
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          This command will set up the necessary base dependencies and prepare your project for
          component installation.
        </p>
      </section>

      {/* 4. Smart CLI */}
      <section id="smart-cli" className="scroll-mt-24 space-y-6">
        <h2 className="font-outfit text-3xl sm:text-4xl font-medium tracking-[-0.8px] leading-[1.22] text-zinc-900 dark:text-white">
          Using the Smart CLI
        </h2>
        <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#E5E5E5]">
          Hudbird UI features an intelligent CLI designed to make adding components a breeze.
          To add any component, simply run:
        </p>
        <CliCommandTabs commandType="add" />

        <div className="mt-6 space-y-4">
          <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
              Auto Dependency Resolution
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
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">Smart Pathing</h4>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              The CLI detects your folder structure. If you have a <Code>src/</Code> directory,
              components are placed in <Code>src/components/hudbird-ui</Code>. If not, they are
              placed in <Code>components/hudbird-ui</Code>.
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
              Batch &amp; Interactive Mode
            </h4>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Install multiple components at once (<Code>npx hudbird-ui add Button Card Form</Code>
              ), or run <Code>npx hudbird-ui add</Code> bare to select components interactively.
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
              Live Status &amp; Diff Engine
            </h4>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Use <Code>npx hudbird-ui list</Code> to inspect your local installation status, and{" "}
              <Code>npx hudbird-ui diff</Code> to compare local changes against upstream registry
              updates.
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between rounded-xl border border-indigo-200 bg-indigo-50/50 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/30">
          <div>
            <h4 className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">
              Explore the Full CLI Guide
            </h4>
            <p className="mt-0.5 text-xs text-indigo-700/80 dark:text-indigo-300/80">
              Read the complete reference for command flags, components.json configuration, and
              monorepo tips.
            </p>
          </div>
          <a
            href="#/cli"
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-indigo-500"
          >
            CLI Reference &rarr;
          </a>
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
import { HudbirdProvider } from "@/components/hudbird-ui/HudbirdProvider";

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
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Optional: Setup Font</h2>
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
