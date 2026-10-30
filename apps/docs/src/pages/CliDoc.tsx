import React from "react";
import { DocHeader } from "../components/DocHeader";
import { CodeBlock } from "../components/CodeBlock";
import {
  Terminal,
  CheckCircle2,
  FolderGit2,
  Layers,
  Sparkles,
  GitCompare,
  ArrowRight,
  ShieldCheck,
  Package,
  FileCode,
  Sliders,
  RefreshCw,
  Cpu,
} from "lucide-react";

export default function CliDoc() {
  return (
    <div className="mx-auto w-full pb-24">
      {/* Hero Header */}
      <DocHeader
        category="TOOLING"
        title="Hudbird UI CLI"
        badge="v1.4.0"
        description="The official developer command-line tool for scaffolding, batch-installing, and tracking upstream diffs across 62+ components with 100% local code ownership."
        className="mb-10 max-w-4xl"
      />

      <div className="mb-8 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
          <Terminal className="h-3.5 w-3.5" />
          CLI v1.4.0
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <Sparkles className="h-3.5 w-3.5" />
          Zero External Dependencies
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700 dark:border-[#2E2F33] dark:bg-[#202124] dark:text-[#E5E5E5]">
          <Sliders className="h-3.5 w-3.5" />
          components.json Standard
        </span>
      </div>

      <div className="max-w-4xl space-y-14 text-zinc-800 dark:text-zinc-200">
        {/* 1. Overview & Architecture */}
        <section id="overview" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                Architecture & Core Features
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Built specifically for rapid prototyping and enterprise design systems.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-5 dark:border-[#2E2F33] dark:bg-[#202124]">
              <div className="flex items-center gap-2.5 font-semibold text-zinc-900 dark:text-zinc-100">
                <FolderGit2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                Local Code Ownership
              </div>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-[#828282]">
                Components live directly inside your project directory (e.g.{" "}
                <code className="rounded bg-zinc-200/60 px-1.5 py-0.5 text-xs dark:border dark:border-[#2E2F33] dark:bg-[#161618] dark:text-[#E5E5E5]">
                  src/components/hudbird-ui
                </code>
                ). You have complete freedom to modify, style, or extend every line of code without
                library lock-in.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-5 dark:border-[#2E2F33] dark:bg-[#202124]">
              <div className="flex items-center gap-2.5 font-semibold text-zinc-900 dark:text-zinc-100">
                <Layers className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                Recursive Dependency Graph
              </div>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-[#828282]">
                When you install complex components (like{" "}
                <code className="rounded bg-zinc-200/60 px-1.5 py-0.5 text-xs dark:border dark:border-[#2E2F33] dark:bg-[#161618] dark:text-[#E5E5E5]">
                  Dialog
                </code>{" "}
                or{" "}
                <code className="rounded bg-zinc-200/60 px-1.5 py-0.5 text-xs dark:border dark:border-[#2E2F33] dark:bg-[#161618] dark:text-[#E5E5E5]">
                  DatePicker
                </code>
                ), the CLI automatically resolves sub-components (
                <code className="rounded bg-zinc-200/60 px-1.5 py-0.5 text-xs dark:border dark:border-[#2E2F33] dark:bg-[#161618] dark:text-[#E5E5E5]">
                  Slot
                </code>
                ,{" "}
                <code className="rounded bg-zinc-200/60 px-1.5 py-0.5 text-xs dark:border dark:border-[#2E2F33] dark:bg-[#161618] dark:text-[#E5E5E5]">
                  utils/cn.ts
                </code>
                ) and installs missing NPM packages.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-5 dark:border-[#2E2F33] dark:bg-[#202124]">
              <div className="flex items-center gap-2.5 font-semibold text-zinc-900 dark:text-zinc-100">
                <Sliders className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                Standard components.json
              </div>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-[#828282]">
                Respects your custom path aliases (
                <code className="rounded bg-zinc-200/60 px-1.5 py-0.5 text-xs dark:border dark:border-[#2E2F33] dark:bg-[#161618] dark:text-[#E5E5E5]">
                  @/components/ui
                </code>{" "}
                vs{" "}
                <code className="rounded bg-zinc-200/60 px-1.5 py-0.5 text-xs dark:border dark:border-[#2E2F33] dark:bg-[#161618] dark:text-[#E5E5E5]">
                  @/components/hudbird-ui
                </code>
                ), base palette, and Tailwind CSS engine version (v4 or v3).
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
              <div className="flex items-center gap-2.5 font-semibold text-zinc-900 dark:text-zinc-100">
                <GitCompare className="h-4 w-4 text-purple-500" />
                Zero-Dependency LCS Diff
              </div>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Compare local files against upstream registry updates line-by-line with colored
                additions and deletions, keeping your CLI footprint exceptionally lightweight.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Quickstart */}
        <section id="quickstart" className="scroll-mt-24 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                Quickstart Guide
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Get up and running in less than 60 seconds with no global installation required.
              </p>
            </div>
          </div>

          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Initialize your project configuration, scaffold utility functions, and inject the
            Tailwind theme tokens:
          </p>
          <CodeBlock language="bash" code="npx hudbird-ui@latest init" />

          <p className="pt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Add components individually, in batch, or using the interactive selector:
          </p>
          <CodeBlock
            language="bash"
            code={`# Add specific components\nnpx hudbird-ui@latest add Button Input Select\n\n# Or launch interactive multiselect selector\nnpx hudbird-ui@latest add`}
          />
        </section>

        {/* 3. Configuration (components.json) */}
        <section id="configuration" className="scroll-mt-24 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
              <FileCode className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                Configuration: components.json
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Declarative configuration schema stored at your project root.
              </p>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            The{" "}
            <code className="rounded bg-zinc-200/60 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
              components.json
            </code>{" "}
            file configures your import aliases, CSS variable definitions, and Tailwind integration:
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

          <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-zinc-200 bg-zinc-50 text-xs font-semibold text-zinc-700 uppercase dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
                <tr>
                  <th className="px-4 py-3">Property</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Default</th>
                  <th className="px-4 py-3">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 text-zinc-600 dark:divide-zinc-800 dark:text-zinc-400">
                <tr>
                  <td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                    $schema
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">string</td>
                  <td className="px-4 py-3 text-xs">-</td>
                  <td className="px-4 py-3 text-xs">
                    JSON schema validation URL for IDE autocompletion.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                    style
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">string</td>
                  <td className="px-4 py-3 text-xs">"default"</td>
                  <td className="px-4 py-3 text-xs">
                    Design style preset for component templates.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                    tailwind.version
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">4 | 3</td>
                  <td className="px-4 py-3 text-xs">4</td>
                  <td className="px-4 py-3 text-xs">
                    Tailwind CSS version. v4 utilizes @theme and OKLCH color palettes.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                    tailwind.css
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">string</td>
                  <td className="px-4 py-3 text-xs">"src/index.css"</td>
                  <td className="px-4 py-3 text-xs">
                    Path to your main stylesheet where variables and presets are injected.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                    tailwind.baseColor
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">string</td>
                  <td className="px-4 py-3 text-xs">"zinc"</td>
                  <td className="px-4 py-3 text-xs">
                    Neutral base color scale ("zinc", "slate", "gray", "neutral", "stone").
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                    aliases.components
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">string</td>
                  <td className="px-4 py-3 text-xs">"@/components/hudbird-ui"</td>
                  <td className="px-4 py-3 text-xs">
                    Import path alias for generated component files. Can be customized to
                    "@/components/ui".
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                    aliases.utils
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">string</td>
                  <td className="px-4 py-3 text-xs">"@/components/hudbird-ui/utils"</td>
                  <td className="px-4 py-3 text-xs">
                    Import path alias for the cn() utility helper.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. Command: init */}
        <section id="command-init" className="scroll-mt-24 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
              <RefreshCw className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                Command: init
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Setup and configure your project for Hudbird UI.
              </p>
            </div>
          </div>

          <CodeBlock language="bash" code="npx hudbird-ui@latest init [options]" />

          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Running{" "}
            <code className="rounded bg-zinc-200/60 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
              init
            </code>{" "}
            executes an automated setup sequence:
          </p>

          <div className="space-y-2 rounded-xl border border-zinc-200 bg-zinc-50/50 p-5 text-sm dark:border-zinc-800 dark:bg-zinc-900/40">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
              <span>
                <strong>Framework & Package Manager Detection:</strong> Identifies npm, pnpm, yarn,
                or bun automatically.
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
              <span>
                <strong>Tailwind CSS Adaptation:</strong> Injects{" "}
                <code className="rounded bg-zinc-200 px-1 text-xs dark:bg-zinc-800">@theme</code>{" "}
                OKLCH variables into your CSS file for Tailwind v4, or creates{" "}
                <code className="rounded bg-zinc-200 px-1 text-xs dark:bg-zinc-800">
                  hudbirdPreset.js
                </code>{" "}
                for Tailwind v3.
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
              <span>
                <strong>Utility Scaffolding:</strong> Generates{" "}
                <code className="rounded bg-zinc-200 px-1 text-xs dark:bg-zinc-800">cn.ts</code>{" "}
                with clsx and tailwind-merge inside your configured utils directory.
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
              <span>
                <strong>Dependency Installation:</strong> Installs core peer dependencies:{" "}
                <code className="rounded bg-zinc-200 px-1 text-xs dark:bg-zinc-800">clsx</code>,{" "}
                <code className="rounded bg-zinc-200 px-1 text-xs dark:bg-zinc-800">
                  tailwind-merge
                </code>
                ,{" "}
                <code className="rounded bg-zinc-200 px-1 text-xs dark:bg-zinc-800">
                  framer-motion
                </code>
                ,{" "}
                <code className="rounded bg-zinc-200 px-1 text-xs dark:bg-zinc-800">
                  lucide-react
                </code>
                , and{" "}
                <code className="rounded bg-zinc-200 px-1 text-xs dark:bg-zinc-800">
                  class-variance-authority
                </code>
                .
              </span>
            </div>
          </div>

          <h4 className="pt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Flags & Options:
          </h4>
          <div className="grid gap-2 text-xs">
            <div className="flex items-center gap-3 rounded-lg border border-zinc-200 p-2.5 dark:border-zinc-800">
              <code className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                -y, --yes
              </code>
              <span className="text-zinc-600 dark:text-zinc-400">
                Skip interactive prompt questions and use default project settings.
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-zinc-200 p-2.5 dark:border-zinc-800">
              <code className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                -h, --help
              </code>
              <span className="text-zinc-600 dark:text-zinc-400">
                Display CLI help documentation and available options.
              </span>
            </div>
          </div>
        </section>

        {/* 5. Command: add */}
        <section id="command-add" className="scroll-mt-24 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400">
              <Package className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                Command: add
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Add one, multiple, or all components to your codebase.
              </p>
            </div>
          </div>

          <CodeBlock language="bash" code="npx hudbird-ui@latest add [components...] [options]" />

          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
                1. Batch Component Installation
              </h4>
              <p className="mt-1 text-zinc-600 dark:text-zinc-400">
                Specify multiple component names separated by space to install everything in a
                single fast command:
              </p>
              <CodeBlock
                language="bash"
                code="npx hudbird-ui@latest add Button Card Dialog Form InputOTP"
              />
            </div>

            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
                2. Interactive Multi-Select Mode
              </h4>
              <p className="mt-1 text-zinc-600 dark:text-zinc-400">
                Run{" "}
                <code className="rounded bg-zinc-200/60 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
                  add
                </code>{" "}
                with no arguments to trigger the keyboard-navigable multi-select menu:
              </p>
              <CodeBlock language="bash" code="npx hudbird-ui@latest add" />
            </div>

            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
                3. Install All 62 Components
              </h4>
              <p className="mt-1 text-zinc-600 dark:text-zinc-400">
                Use the{" "}
                <code className="rounded bg-zinc-200/60 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
                  --all
                </code>{" "}
                flag to pull down the entire component library in one sweep:
              </p>
              <CodeBlock language="bash" code="npx hudbird-ui@latest add --all --yes" />
            </div>
          </div>

          <h4 className="pt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Flags & Options:
          </h4>
          <div className="grid gap-2 text-xs">
            <div className="flex items-center gap-3 rounded-lg border border-zinc-200 p-2.5 dark:border-zinc-800">
              <code className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                --all
              </code>
              <span className="text-zinc-600 dark:text-zinc-400">
                Install all 62 components currently published in the registry.
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-zinc-200 p-2.5 dark:border-zinc-800">
              <code className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                -o, --overwrite
              </code>
              <span className="text-zinc-600 dark:text-zinc-400">
                Overwrite existing component files without asking for confirmation.
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-zinc-200 p-2.5 dark:border-zinc-800">
              <code className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                -y, --yes
              </code>
              <span className="text-zinc-600 dark:text-zinc-400">
                Bypass confirmation prompts and accept defaults automatically.
              </span>
            </div>
          </div>
        </section>

        {/* 6. Command: list */}
        <section id="command-list" className="scroll-mt-24 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                Command: list &amp; status
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Inspect registry catalog and check real-time local project installation status.
              </p>
            </div>
          </div>

          <CodeBlock
            language="bash"
            code="npx hudbird-ui@latest list\n# Or shorthand:\nnpx hudbird-ui@latest ls"
          />

          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            The{" "}
            <code className="rounded bg-zinc-200/60 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
              list
            </code>{" "}
            command scans your local project against the 62 components in the official registry,
            displaying real-time indicators:
          </p>

          <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs text-zinc-200 shadow-xl">
            <div className="mb-2 text-zinc-400"># Terminal output preview:</div>
            <div className="font-bold text-indigo-400">
              ┌ Hudbird UI Registry (62 components available)
            </div>
            <div className="text-zinc-500">│</div>
            <div className="font-semibold text-zinc-300">◆ Primitives</div>
            <div className="pl-4 text-emerald-400">
              ✔ Button <span className="text-[11px] text-zinc-500">(Slot)</span>
            </div>
            <div className="pl-4 text-emerald-400">✔ Card</div>
            <div className="pl-4 text-zinc-500">○ Avatar</div>
            <div className="pl-4 text-zinc-500">○ Badge</div>
            <div className="text-zinc-500">│</div>
            <div className="font-semibold text-zinc-300">◆ Forms</div>
            <div className="pl-4 text-emerald-400">✔ Input</div>
            <div className="pl-4 text-emerald-400">
              ✔ InputOTP <span className="text-[11px] text-zinc-500">(input-otp)</span>
            </div>
            <div className="pl-4 text-zinc-500">○ Select</div>
            <div className="pl-4 text-zinc-500">○ ComboBox</div>
            <div className="text-zinc-500">│</div>
            <div className="text-zinc-400">└ 14 of 62 components installed in your project.</div>
          </div>
        </section>

        {/* 7. Command: diff */}
        <section id="command-diff" className="scroll-mt-24 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
              <GitCompare className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                Command: diff &amp; updates
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Inspect local modifications and upstream registry changes before updating.
              </p>
            </div>
          </div>

          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Compare a specific component against upstream:
          </p>
          <CodeBlock language="bash" code="npx hudbird-ui@latest diff Button" />

          <p className="pt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Or scan your entire project to detect all modified or out-of-sync components:
          </p>
          <CodeBlock language="bash" code="npx hudbird-ui@latest diff" />

          <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-5 text-sm dark:border-zinc-800 dark:bg-zinc-900/40">
            <h4 className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-100">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              Safe Upgrades Without Unintended Overwrites
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              Because you own the component code in your repository,{" "}
              <code className="rounded bg-zinc-200 px-1 text-xs dark:bg-zinc-800">diff</code> lets
              you see exactly what upstream bugfixes or enhancements were made. You can choose to
              selectively merge them or run{" "}
              <code className="rounded bg-zinc-200 px-1 text-xs dark:bg-zinc-800">
                npx hudbird-ui add Button --overwrite
              </code>{" "}
              when you want to take the upstream version cleanly.
            </p>
          </div>
        </section>

        {/* 8. Troubleshooting & FAQ */}
        <section id="troubleshooting" className="scroll-mt-24 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                Troubleshooting &amp; Monorepos
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Frequently asked questions and best practices.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-800">
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                How do I configure import path aliases in TypeScript?
              </h4>
              <p className="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                Ensure your{" "}
                <code className="rounded bg-zinc-200/60 px-1 py-0.5 dark:bg-zinc-800">
                  tsconfig.json
                </code>{" "}
                or{" "}
                <code className="rounded bg-zinc-200/60 px-1 py-0.5 dark:bg-zinc-800">
                  tsconfig.app.json
                </code>{" "}
                includes the path mapping matching your{" "}
                <code className="rounded bg-zinc-200/60 px-1 py-0.5 dark:bg-zinc-800">
                  components.json
                </code>{" "}
                aliases:
              </p>
              <div className="mt-2">
                <CodeBlock
                  language="json"
                  code={`{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}`}
                />
              </div>
            </div>

            <div className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-800">
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Can I use the CLI in PNPM / Turbo monorepos?
              </h4>
              <p className="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                Yes! Simply navigate to the target app or package directory (e.g.{" "}
                <code className="rounded bg-zinc-200/60 px-1 py-0.5 dark:bg-zinc-800">
                  apps/web
                </code>
                ) before running the command, or execute through pnpm filter:
              </p>
              <div className="mt-2">
                <CodeBlock
                  language="bash"
                  code="pnpm --filter web dlx hudbird-ui add Button Card"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
