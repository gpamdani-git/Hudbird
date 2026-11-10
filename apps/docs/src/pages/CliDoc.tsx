import React from "react";
import { DocHeader } from "../components/DocHeader";
import { CodeBlock } from "../components/CodeBlock";
import {
  Terminal,
  CheckCircle2,
  FolderGit2,
  Layers,
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
    <div className="space-y-24 pb-24 sm:space-y-32">
      {/* Hero Header */}
      <DocHeader
        category="Tooling"
        title="Hudbird UI CLI"
        description="The official developer command-line tool for scaffolding, batch-installing, and tracking upstream diffs across 123+ components, signature blocks, and complete niche templates with 100% local code ownership."
        className="max-w-4xl"
      />

      <div className="max-w-4xl space-y-24 text-zinc-800 sm:space-y-32 dark:text-zinc-200">
        {/* 1. Overview & Architecture */}
        <section id="overview" className="scroll-mt-24 space-y-8">
          <div className="mb-6 space-y-3">
            <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
              Architecture & Core Features
            </h2>
            <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#828282]">
              Built specifically for rapid prototyping and enterprise design systems.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xs dark:border-white/[0.08] dark:bg-[#161618]">
              <div className="flex items-center gap-2.5 font-semibold text-zinc-900 dark:text-white">
                <FolderGit2 className="h-4 w-4 opacity-70" />
                Local Code Ownership
              </div>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Components live directly inside your project directory (e.g.{" "}
                <code className="rounded-md bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-white/[0.06] dark:text-zinc-200">
                  src/components/hudbird-ui
                </code>
                ). You have complete freedom to modify, style, or extend every line of code without
                library lock-in.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xs dark:border-white/[0.08] dark:bg-[#161618]">
              <div className="flex items-center gap-2.5 font-semibold text-zinc-900 dark:text-white">
                <Layers className="h-4 w-4 opacity-70" />
                Recursive Dependency Graph
              </div>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                When you install complex components (like{" "}
                <code className="rounded-md bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-white/[0.06] dark:text-zinc-200">
                  Dialog
                </code>{" "}
                or{" "}
                <code className="rounded-md bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-white/[0.06] dark:text-zinc-200">
                  DatePicker
                </code>
                ), the CLI automatically resolves sub-components (
                <code className="rounded-md bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-white/[0.06] dark:text-zinc-200">
                  Slot
                </code>
                ,{" "}
                <code className="rounded-md bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-white/[0.06] dark:text-zinc-200">
                  utils/cn.ts
                </code>
                ) and installs missing dependencies.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xs dark:border-white/[0.08] dark:bg-[#161618]">
              <div className="flex items-center gap-2.5 font-semibold text-zinc-900 dark:text-white">
                <Sliders className="h-4 w-4 opacity-70" />
                Standard components.json
              </div>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Respects your custom path aliases (
                <code className="rounded-md bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-white/[0.06] dark:text-zinc-200">
                  @/components/ui
                </code>{" "}
                vs{" "}
                <code className="rounded-md bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-white/[0.06] dark:text-zinc-200">
                  @/components/hudbird-ui
                </code>
                ), base palette, and Tailwind CSS engine version (v4 or v3).
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xs dark:border-white/[0.08] dark:bg-[#161618]">
              <div className="flex items-center gap-2.5 font-semibold text-zinc-900 dark:text-white">
                <GitCompare className="h-4 w-4 opacity-70" />
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
        <section id="quickstart" className="scroll-mt-24 space-y-8">
          <div className="mb-6 space-y-3">
            <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
              Quickstart Guide
            </h2>
            <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#828282]">
              Get up and running in less than 60 seconds with no global installation required.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#E5E5E5]">
              <strong>Initialize configuration.</strong> Scaffold utility functions and inject
              Tailwind CSS tokens:
            </p>
            <CodeBlock language="bash" code="npx hudbird-ui@latest init" />
          </div>

          <div className="space-y-4">
            <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#E5E5E5]">
              <strong>Add components.</strong> Install components individually, in batch, or using
              the interactive selector:
            </p>
            <CodeBlock
              language="bash"
              code={`# Add specific components\nnpx hudbird-ui@latest add Button Input Select\n\n# Or launch interactive multiselect selector\nnpx hudbird-ui@latest add`}
            />
          </div>
        </section>

        {/* 3. Configuration (components.json) */}
        <section id="configuration" className="scroll-mt-24 space-y-8">
          <div className="mb-6 space-y-3">
            <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
              Configuration: components.json
            </h2>
            <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#828282]">
              Declarative configuration schema stored at your project root.
            </p>
          </div>

          <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#E5E5E5]">
            The{" "}
            <code className="rounded bg-zinc-200/60 px-1.5 py-0.5 font-mono text-xs dark:border dark:border-[#2E2F33] dark:bg-[#161618] dark:text-[#E5E5E5]">
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

          <div className="overflow-x-auto rounded-2xl border border-zinc-200/80 bg-white shadow-xs dark:border-white/[0.08] dark:bg-[#161618]">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-zinc-200/80 bg-zinc-50/50 text-xs font-semibold tracking-wider text-zinc-700 uppercase dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-zinc-300">
                <tr>
                  <th className="px-4 py-3.5">Property</th>
                  <th className="px-4 py-3.5">Type</th>
                  <th className="px-4 py-3.5">Default</th>
                  <th className="px-4 py-3.5">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/80 text-zinc-600 dark:divide-white/[0.08] dark:text-zinc-400">
                <tr>
                  <td className="px-4 py-3 font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    $schema
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-zinc-500 sm:text-sm">string</td>
                  <td className="px-4 py-3 font-mono text-xs text-zinc-500 sm:text-sm">-</td>
                  <td className="px-4 py-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                    JSON schema validation URL for IDE autocompletion.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    style
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-zinc-500 sm:text-sm">string</td>
                  <td className="px-4 py-3 font-mono text-xs text-zinc-500 sm:text-sm">
                    "default"
                  </td>
                  <td className="px-4 py-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                    Design style preset for component templates.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    tailwind.version
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-zinc-500 sm:text-sm">4 | 3</td>
                  <td className="px-4 py-3 font-mono text-xs text-zinc-500 sm:text-sm">4</td>
                  <td className="px-4 py-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                    Tailwind CSS version. v4 utilizes @theme and OKLCH color palettes.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    tailwind.css
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-zinc-500 sm:text-sm">string</td>
                  <td className="px-4 py-3 font-mono text-xs text-zinc-500 sm:text-sm">
                    "src/index.css"
                  </td>
                  <td className="px-4 py-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                    Path to your main stylesheet where variables and presets are injected.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    tailwind.baseColor
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-zinc-500 sm:text-sm">string</td>
                  <td className="px-4 py-3 font-mono text-xs text-zinc-500 sm:text-sm">"zinc"</td>
                  <td className="px-4 py-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                    Neutral base color scale ("zinc", "slate", "gray", "neutral", "stone").
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    aliases.components
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-zinc-500 sm:text-sm">string</td>
                  <td className="px-4 py-3 font-mono text-xs text-zinc-500 sm:text-sm">
                    "@/components/hudbird-ui"
                  </td>
                  <td className="px-4 py-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                    Import path alias for generated component files. Can be customized to
                    "@/components/ui".
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    aliases.utils
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-zinc-500 sm:text-sm">string</td>
                  <td className="px-4 py-3 font-mono text-xs text-zinc-500 sm:text-sm">
                    "@/components/hudbird-ui/utils"
                  </td>
                  <td className="px-4 py-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                    Import path alias for the cn() utility helper.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. Command: init */}
        <section id="command-init" className="scroll-mt-24 space-y-8">
          <div className="mb-6 space-y-3">
            <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
              Command: init
            </h2>
            <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#828282]">
              Setup and configure your project for Hudbird UI.
            </p>
          </div>

          <CodeBlock language="bash" code="npx hudbird-ui@latest init [options]" />

          <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#E5E5E5]">
            Running{" "}
            <code className="rounded-md bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-white/[0.06] dark:text-zinc-200">
              init
            </code>{" "}
            executes an automated setup sequence:
          </p>

          <div className="space-y-4 rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-6 text-sm dark:border-white/[0.08] dark:bg-[#161618]">
            <div>
              <strong className="text-sm font-semibold text-zinc-900 sm:text-base dark:text-white">
                1. Package Manager Detection:
              </strong>
              <p className="mt-1 text-sm leading-relaxed text-zinc-600 sm:text-[15px] dark:text-zinc-300">
                Identifies npm, pnpm, yarn, or bun automatically from project lockfiles.
              </p>
            </div>
            <div>
              <strong className="text-sm font-semibold text-zinc-900 sm:text-base dark:text-white">
                2. Tailwind CSS Adaptation:
              </strong>
              <p className="mt-1 text-sm leading-relaxed text-zinc-600 sm:text-[15px] dark:text-zinc-300">
                Injects{" "}
                <code className="rounded-md bg-zinc-200/70 px-1.5 py-0.5 font-mono text-xs dark:bg-white/10 dark:text-zinc-200">
                  @theme
                </code>{" "}
                OKLCH variables into your CSS file for Tailwind v4, or creates{" "}
                <code className="rounded-md bg-zinc-200/70 px-1.5 py-0.5 font-mono text-xs dark:bg-white/10 dark:text-zinc-200">
                  hudbirdPreset.js
                </code>{" "}
                for Tailwind v3.
              </p>
            </div>
            <div>
              <strong className="text-sm font-semibold text-zinc-900 sm:text-base dark:text-white">
                3. Utility Scaffolding:
              </strong>
              <p className="mt-1 text-sm leading-relaxed text-zinc-600 sm:text-[15px] dark:text-zinc-300">
                Generates{" "}
                <code className="rounded-md bg-zinc-200/70 px-1.5 py-0.5 font-mono text-xs dark:bg-white/10 dark:text-zinc-200">
                  cn.ts
                </code>{" "}
                with clsx and tailwind-merge inside your configured utils directory.
              </p>
            </div>
            <div>
              <strong className="text-sm font-semibold text-zinc-900 sm:text-base dark:text-white">
                4. Core Dependency Installation:
              </strong>
              <p className="mt-1 text-sm leading-relaxed text-zinc-600 sm:text-[15px] dark:text-zinc-300">
                Installs required peer dependencies:{" "}
                <code className="rounded-md bg-zinc-200/70 px-1.5 py-0.5 font-mono text-xs dark:bg-white/10 dark:text-zinc-200">
                  clsx
                </code>
                ,{" "}
                <code className="rounded-md bg-zinc-200/70 px-1.5 py-0.5 font-mono text-xs dark:bg-white/10 dark:text-zinc-200">
                  tailwind-merge
                </code>
                ,{" "}
                <code className="rounded-md bg-zinc-200/70 px-1.5 py-0.5 font-mono text-xs dark:bg-white/10 dark:text-zinc-200">
                  framer-motion
                </code>
                ,{" "}
                <code className="rounded-md bg-zinc-200/70 px-1.5 py-0.5 font-mono text-xs dark:bg-white/10 dark:text-zinc-200">
                  lucide-react
                </code>
                , and{" "}
                <code className="rounded-md bg-zinc-200/70 px-1.5 py-0.5 font-mono text-xs dark:bg-white/10 dark:text-zinc-200">
                  class-variance-authority
                </code>
                .
              </p>
            </div>
          </div>

          <h4 className="pt-2 text-sm font-semibold text-zinc-900 sm:text-base dark:text-zinc-100">
            Flags &amp; Options:
          </h4>
          <div className="grid gap-2.5 text-sm">
            <div className="flex items-center gap-3 rounded-xl border border-zinc-200/80 bg-white p-3.5 shadow-xs dark:border-white/[0.08] dark:bg-[#161618]">
              <code className="font-mono text-sm font-semibold text-zinc-900 dark:text-white">
                -y, --yes
              </code>
              <span className="text-sm text-zinc-600 dark:text-zinc-300">
                Skip interactive prompt questions and use default project settings.
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-zinc-200/80 bg-white p-3.5 shadow-xs dark:border-white/[0.08] dark:bg-[#161618]">
              <code className="font-mono text-sm font-semibold text-zinc-900 dark:text-white">
                -h, --help
              </code>
              <span className="text-sm text-zinc-600 dark:text-zinc-300">
                Display CLI help documentation and available options.
              </span>
            </div>
          </div>
        </section>

        {/* 5. Command: add */}
        <section id="command-add" className="scroll-mt-24 space-y-8">
          <div className="mb-6 space-y-3">
            <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
              Command: add
            </h2>
            <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#828282]">
              Add one, multiple, or all components to your codebase.
            </p>
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
                3. Install Signature Blocks &amp; Complete Templates
              </h4>
              <p className="mt-1 text-zinc-600 dark:text-zinc-400">
                You can install entire industry landing pages or standalone signature blocks with
                recursive dependencies resolved:
              </p>
              <CodeBlock
                language="bash"
                code={`# Install signature blocks\nnpx hudbird-ui@latest add morphing-island\nnpx hudbird-ui@latest add agent-artifact-canvas\n\n# Install complete niche templates\nnpx hudbird-ui@latest add template-saas\nnpx hudbird-ui@latest add template-ai\nnpx hudbird-ui@latest add template-fintech`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
                4. Install All 123 Components &amp; Templates
              </h4>
              <p className="mt-1 text-zinc-600 dark:text-zinc-400">
                Use the{" "}
                <code className="rounded bg-zinc-200/60 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
                  --all
                </code>{" "}
                flag to pull down the entire component catalog in one sweep:
              </p>
              <CodeBlock language="bash" code="npx hudbird-ui@latest add --all --yes" />
            </div>
          </div>

          <h4 className="pt-2 text-sm font-semibold text-zinc-900 sm:text-base dark:text-zinc-100">
            Flags &amp; Options:
          </h4>
          <div className="grid gap-2.5 text-sm">
            <div className="flex items-center gap-3 rounded-xl border border-zinc-200/80 bg-white p-3.5 shadow-xs dark:border-white/[0.08] dark:bg-[#161618]">
              <code className="font-mono text-sm font-semibold text-zinc-900 dark:text-white">
                --all
              </code>
              <span className="text-sm text-zinc-600 dark:text-zinc-300">
                Install all 123 components, sections, and templates currently published in the
                registry.
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-zinc-200/80 bg-white p-3.5 shadow-xs dark:border-white/[0.08] dark:bg-[#161618]">
              <code className="font-mono text-sm font-semibold text-zinc-900 dark:text-white">
                -o, --overwrite
              </code>
              <span className="text-sm text-zinc-600 dark:text-zinc-300">
                Overwrite existing component files without asking for confirmation.
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-zinc-200/80 bg-white p-3.5 shadow-xs dark:border-white/[0.08] dark:bg-[#161618]">
              <code className="font-mono text-sm font-semibold text-zinc-900 dark:text-white">
                -y, --yes
              </code>
              <span className="text-sm text-zinc-600 dark:text-zinc-300">
                Bypass confirmation prompts and accept defaults automatically.
              </span>
            </div>
          </div>
        </section>

        {/* 6. Command: list */}
        <section id="command-list" className="scroll-mt-24 space-y-8">
          <div className="mb-6 space-y-3">
            <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
              Command: list &amp; status
            </h2>
            <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#828282]">
              Inspect registry catalog and check real-time local project installation status.
            </p>
          </div>

          <CodeBlock
            language="bash"
            code="npx hudbird-ui@latest list\n# Or shorthand:\nnpx hudbird-ui@latest ls"
          />

          <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#E5E5E5]">
            The{" "}
            <code className="rounded-md bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-white/[0.06] dark:text-zinc-200">
              list
            </code>{" "}
            command scans your local project against all 123 items in the official registry across 8
            categories:
          </p>

          <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-[#121214] p-5 font-mono text-xs text-zinc-200 shadow-xl sm:text-sm">
            <div className="mb-2 text-zinc-400"># Terminal output preview:</div>
            <div className="font-bold text-indigo-400">
              ┌ Hudbird UI Registry (123 items available)
            </div>
            <div className="text-zinc-500">│</div>
            <div className="font-semibold text-zinc-300">◆ Primitives</div>
            <div className="pl-4 text-emerald-400">
              + Button <span className="text-xs text-zinc-500">(Slot)</span>
            </div>
            <div className="pl-4 text-emerald-400">+ Card</div>
            <div className="pl-4 text-zinc-500">- Avatar</div>
            <div className="pl-4 text-zinc-500">- Badge</div>
            <div className="text-zinc-500">│</div>
            <div className="font-semibold text-zinc-300">◆ Forms</div>
            <div className="pl-4 text-emerald-400">+ Input</div>
            <div className="pl-4 text-emerald-400">
              + InputOTP <span className="text-xs text-zinc-500">(input-otp)</span>
            </div>
            <div className="pl-4 text-zinc-500">- Select</div>
            <div className="pl-4 text-zinc-500">- ComboBox</div>
            <div className="text-zinc-500">│</div>
            <div className="text-zinc-400">└ 14 of 62 components installed in your project.</div>
          </div>
        </section>

        {/* 7. Command: diff */}
        <section id="command-diff" className="scroll-mt-24 space-y-8">
          <div className="mb-6 space-y-3">
            <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
              Command: diff &amp; updates
            </h2>
            <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#828282]">
              Inspect local modifications and upstream registry changes before updating.
            </p>
          </div>

          <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#E5E5E5]">
            <strong>Compare single component.</strong> Inspect changes against upstream registry:
          </p>
          <CodeBlock language="bash" code="npx hudbird-ui@latest diff Button" />

          <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#E5E5E5]">
            <strong>Scan entire project.</strong> Detect all modified or out-of-sync components:
          </p>
          <CodeBlock language="bash" code="npx hudbird-ui@latest diff" />

          <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-6 text-sm dark:border-white/[0.08] dark:bg-[#161618]">
            <h4 className="flex items-center gap-2 text-base font-semibold text-zinc-900 dark:text-white">
              <ShieldCheck className="h-5 w-5 text-emerald-500" />
              Safe Upgrades Without Unintended Overwrites
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 sm:text-[15px] dark:text-zinc-300">
              Because you own the component code in your repository,{" "}
              <code className="rounded-md bg-zinc-200/70 px-1.5 py-0.5 font-mono text-xs dark:bg-white/10 dark:text-zinc-200">
                diff
              </code>{" "}
              lets you see exactly what upstream bugfixes or enhancements were made. You can choose
              to selectively merge them or run{" "}
              <code className="rounded-md bg-zinc-200/70 px-1.5 py-0.5 font-mono text-xs dark:bg-white/10 dark:text-zinc-200">
                npx hudbird-ui add Button --overwrite
              </code>{" "}
              when you want to take the upstream version cleanly.
            </p>
          </div>
        </section>

        {/* 8. Troubleshooting & FAQ */}
        <section id="troubleshooting" className="scroll-mt-24 space-y-8">
          <div className="mb-6 space-y-3">
            <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
              Troubleshooting &amp; Monorepos
            </h2>
            <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#828282]">
              Frequently asked questions and best practices.
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xs dark:border-white/[0.08] dark:bg-[#161618]">
              <h4 className="text-base font-semibold text-zinc-900 dark:text-white">
                How do I configure import path aliases in TypeScript?
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 sm:text-[15px] dark:text-zinc-300">
                Ensure your{" "}
                <code className="rounded-md bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-white/10 dark:text-zinc-200">
                  tsconfig.json
                </code>{" "}
                or{" "}
                <code className="rounded-md bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-white/10 dark:text-zinc-200">
                  tsconfig.app.json
                </code>{" "}
                includes the path mapping matching your{" "}
                <code className="rounded-md bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-white/10 dark:text-zinc-200">
                  components.json
                </code>{" "}
                aliases:
              </p>
              <div className="mt-3">
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

            <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xs dark:border-white/[0.08] dark:bg-[#161618]">
              <h4 className="text-base font-semibold text-zinc-900 dark:text-white">
                Can I use the CLI in PNPM / Turbo monorepos?
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 sm:text-[15px] dark:text-zinc-300">
                Yes! Simply navigate to the target app or package directory (e.g.{" "}
                <code className="rounded-md bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-white/10 dark:text-zinc-200">
                  apps/web
                </code>
                ) before running the command, or execute through pnpm filter:
              </p>
              <div className="mt-3">
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
