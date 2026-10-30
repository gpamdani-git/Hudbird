import React from "react";
import { DocHeader } from "../components/DocHeader";
import { CodeBlock } from "../components/CodeBlock";
import { Text, Strong, Code } from "@hudbird/ui";
import {
  Info,
  Palette,
  CheckCircle2,
  Box,
  Terminal,
  ArrowRight,
  BookOpen,
  MessageSquare,
  Bug,
  ShieldCheck,
  Check,
  HelpCircle,
} from "lucide-react";

export const supportTocItems = [
  { id: "requirements", title: "System Requirements" },
  { id: "frameworks", title: "Supported Frameworks" },
  { id: "cli-guide", title: "CLI & Theme Setup Guide" },
  { id: "faq", title: "Frequently Asked Questions (FAQ)" },
  { id: "contact", title: "Get Help & Report Bugs" },
];

export default function SupportDoc() {
  return (
    <div className="space-y-24 sm:space-y-32 pb-32">
      {/* 1. Header & Requirements */}
      <div id="requirements" className="scroll-mt-24 space-y-12">
        <DocHeader
          category="DOCUMENTATION"
          title="Support & FAQ"
          badge="v2.0"
          description="Information about supported library versions, framework compatibility, and troubleshooting for common development issues."
        />

        <div className="space-y-6">
          <h2 className="font-outfit text-3xl sm:text-4xl font-medium tracking-[-0.8px] leading-[1.22] text-zinc-900 dark:text-white">
            System Requirements
          </h2>
          <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#828282]">
            Ensure your development environment meets the minimum runtime and bundler specifications:
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* React Card */}
          <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-6 sm:p-8 dark:border-[#2e2f33] dark:bg-[#202124]">
            <h3 className="font-outfit text-xl font-medium tracking-[-0.4px] text-zinc-900 dark:text-white mb-2">
              React Runtime
            </h3>
            <p className="text-[15px] leading-relaxed text-zinc-600 dark:text-[#E5E5E5] mb-6">
              Hudbird UI requires <Strong className="text-zinc-900 dark:text-white">React 18</Strong> or <Strong className="text-zinc-900 dark:text-white">React 19</Strong>.
            </p>
            <div className="rounded-xl border border-zinc-200/70 bg-white p-4 dark:border-[#2e2f33] dark:bg-[#161618]">
              <div className="flex items-center gap-2 font-medium text-xs text-zinc-900 dark:text-zinc-200 mb-1.5">
                <Info className="h-4 w-4 text-indigo-500" />
                <span>React 19 Compatibility Note</span>
              </div>
              <p className="text-xs leading-relaxed text-zinc-600 dark:text-[#828282]">
                While Hudbird UI fully supports React 19, select 3D libraries (like{" "}
                <Code className="text-[11px]">@react-three/fiber</Code>) still enforce{" "}
                <Code className="text-[11px]">peerDependencies</Code> for React 18. If you encounter{" "}
                <Code className="text-[11px]">ERESOLVE</Code> conflicts during NPM install, refer to our FAQ below.
              </p>
            </div>
          </div>

          {/* Tailwind CSS Card */}
          <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-6 sm:p-8 dark:border-[#2e2f33] dark:bg-[#202124]">
            <h3 className="font-outfit text-xl font-medium tracking-[-0.4px] text-zinc-900 dark:text-white mb-2">
              Tailwind CSS Engine
            </h3>
            <p className="text-[15px] leading-relaxed text-zinc-600 dark:text-[#E5E5E5] mb-4">
              Native architecture optimized for <Strong className="text-zinc-900 dark:text-white">Tailwind CSS v4</Strong>.
            </p>
            <p className="text-xs leading-relaxed text-zinc-600 dark:text-[#828282]">
              The CLI automatically injects modern <Code className="text-[11px]">@theme</Code> blocks for v4 projects, while maintaining seamless backward compatibility for <Strong className="text-zinc-900 dark:text-zinc-200">Tailwind CSS v3</Strong> via standard presets.
            </p>
          </div>
        </div>

        {/* Core Dependencies */}
        <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-6 sm:p-8 dark:border-[#2e2f33] dark:bg-[#202124]">
          <h3 className="font-outfit text-xl font-medium tracking-[-0.4px] text-zinc-900 dark:text-white mb-4">
            Core Peer Dependencies
          </h3>
          <div className="grid gap-3 sm:grid-cols-3 text-sm">
            <div className="flex items-center gap-2.5 rounded-lg border border-zinc-200/60 bg-white p-3 dark:border-[#2e2f33] dark:bg-[#161618]">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span><Strong className="text-zinc-900 dark:text-white">Framer Motion</Strong> v11+</span>
            </div>
            <div className="flex items-center gap-2.5 rounded-lg border border-zinc-200/60 bg-white p-3 dark:border-[#2e2f33] dark:bg-[#161618]">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span><Strong className="text-zinc-900 dark:text-white">Lucide React</Strong> icons</span>
            </div>
            <div className="flex items-center gap-2.5 rounded-lg border border-zinc-200/60 bg-white p-3 dark:border-[#2e2f33] dark:bg-[#161618]">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span><Strong className="text-zinc-900 dark:text-white">Radix UI</Strong> primitives</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Frameworks */}
      <section id="frameworks" className="scroll-mt-24 space-y-6">
        <h2 className="font-outfit text-3xl sm:text-4xl font-medium tracking-[-0.8px] leading-[1.22] text-zinc-900 dark:text-white">
          Supported Frameworks
        </h2>
        <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#828282]">
          Since Hudbird UI is distributed as local copy-pasteable React components rather than a black-box compiled library, it works seamlessly anywhere React and Tailwind CSS v4 run:
        </p>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4 pt-2">
          {["Next.js (App & Pages Router)", "Vite (React & SSR)", "Remix / React Router v7", "Astro / Gatsby"].map((fw) => (
            <div key={fw} className="flex items-center gap-2.5 rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-4 dark:border-[#2e2f33] dark:bg-[#202124]">
              <Check className="h-4 w-4 text-indigo-500 shrink-0" />
              <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{fw}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CLI & Theme Setup Guide */}
      <section id="cli-guide" className="scroll-mt-24 space-y-8">
        <div className="space-y-3 mb-6">
          <h2 className="font-outfit text-3xl sm:text-4xl font-medium tracking-[-0.8px] leading-[1.22] text-zinc-900 dark:text-white">
            CLI &amp; Theme Setup Guide
          </h2>
          <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#828282]">
            Scaffold components, automate dependency resolution, and configure Tailwind CSS tokens using the smart developer CLI:
          </p>
        </div>

        {/* Step 1: Install */}
        <div className="space-y-4 rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-6 sm:p-8 dark:border-[#2e2f33] dark:bg-[#202124]">
          <h3 className="font-outfit text-xl font-medium tracking-[-0.4px] text-zinc-900 dark:text-white">
            1. Project Initialization
          </h3>
          <p className="text-[15px] leading-relaxed text-zinc-600 dark:text-[#E5E5E5]">
            Run the initialization command at your project root. The CLI automatically detects your package manager (<Code>npm</Code>, <Code>pnpm</Code>, <Code>yarn</Code>, or <Code>bun</Code>) and Tailwind engine version:
          </p>
          <CodeBlock code="npx hudbird-ui@latest init" />
          <div className="space-y-2 rounded-xl border border-zinc-200/60 bg-white p-4 dark:border-[#2e2f33] dark:bg-[#161618]">
            <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Automated CLI actions:
            </p>
            <ul className="list-disc space-y-1 pl-5 text-xs text-zinc-600 dark:text-[#828282]">
              <li>
                Detects whether project uses <Strong className="text-zinc-800 dark:text-zinc-200">Tailwind v4</Strong> or <Strong className="text-zinc-800 dark:text-zinc-200">Tailwind v3</Strong>
              </li>
              <li>
                For <Strong className="text-zinc-800 dark:text-zinc-200">Tailwind v4</Strong>: injects native <Code className="text-[11px]">@theme</Code> OKLCH variables into your CSS
              </li>
              <li>
                For <Strong className="text-zinc-800 dark:text-zinc-200">Tailwind v3</Strong>: scaffolds <Code className="text-[11px]">hudbirdPreset.js</Code> and links it to <Code className="text-[11px]">tailwind.config.js</Code>
              </li>
              <li>
                Installs foundational primitives: <Code className="text-[11px]">clsx</Code>, <Code className="text-[11px]">tailwind-merge</Code>, <Code className="text-[11px]">class-variance-authority</Code>
              </li>
            </ul>
          </div>
        </div>

        {/* Step 2: Add Components */}
        <div className="space-y-4 rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-6 sm:p-8 dark:border-[#2e2f33] dark:bg-[#202124]">
          <h3 className="font-outfit text-xl font-medium tracking-[-0.4px] text-zinc-900 dark:text-white">
            2. Adding Components
          </h3>
          <p className="text-[15px] leading-relaxed text-zinc-600 dark:text-[#E5E5E5]">
            Use the <Code>add</Code> command to install components individually or in batch. Files are copied directly into <Code>src/components/hudbird-ui/</Code> for 100% code ownership:
          </p>
          <CodeBlock
            code={`# Add single component\nnpx hudbird-ui@latest add Button\n\n# Batch installation\nnpx hudbird-ui@latest add Button Input Select Badge Alert Pagination`}
          />
          <div className="rounded-xl border border-zinc-200/60 bg-white p-4 dark:border-[#2e2f33] dark:bg-[#161618]">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-900 dark:text-zinc-200 mb-1">
              <ShieldCheck className="h-4 w-4 text-indigo-500" />
              <span>Smart Overwrite Protection</span>
            </div>
            <p className="text-xs leading-relaxed text-zinc-600 dark:text-[#828282]">
              If a component file already exists, the CLI will ask before overwriting. Answer <Code className="text-[11px]">N</Code> to preserve your modifications, or use the <Code className="text-[11px]">--overwrite</Code> flag to sync with upstream updates.
            </p>
          </div>
        </div>

        {/* Step 3: List & Diff */}
        <div className="space-y-4 rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-6 sm:p-8 dark:border-[#2e2f33] dark:bg-[#202124]">
          <h3 className="font-outfit text-xl font-medium tracking-[-0.4px] text-zinc-900 dark:text-white">
            3. Verifying Status &amp; Upstream Diffs
          </h3>
          <p className="text-[15px] leading-relaxed text-zinc-600 dark:text-[#E5E5E5]">
            Inspect the installation status of all 62 components in real-time and review modifications using the zero-dependency diff engine:
          </p>
          <CodeBlock
            code={`# Inspect local installation status\nnpx hudbird-ui@latest list\n\n# Compare local component modifications against registry\nnpx hudbird-ui@latest diff Button\n\n# Scan whole repository for modified components\nnpx hudbird-ui@latest diff`}
          />
        </div>

        {/* Step 4: Theme Customization via Builder */}
        <div className="space-y-4 rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-6 sm:p-8 dark:border-[#2e2f33] dark:bg-[#202124]">
          <h3 className="font-outfit text-xl font-medium tracking-[-0.4px] text-zinc-900 dark:text-white">
            4. Theme Customization via Theme Builder
          </h3>
          <p className="text-[15px] leading-relaxed text-zinc-600 dark:text-[#E5E5E5]">
            Navigate to the <Strong className="text-zinc-900 dark:text-white">Theme Builder</Strong> in the sidebar to access the live palette inspector. You can customize:
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-zinc-600 dark:text-[#828282]">
            <li>
              <Strong className="text-zinc-800 dark:text-zinc-200">Base Color</Strong> — Neutral scales (zinc, slate, neutral, gray)
            </li>
            <li>
              <Strong className="text-zinc-800 dark:text-zinc-200">Primary Color</Strong> — Brand accent color with OKLCH precision
            </li>
            <li>
              <Strong className="text-zinc-800 dark:text-zinc-200">Border Radius</Strong> — Global rounding curve tokens
            </li>
            <li>
              <Strong className="text-zinc-800 dark:text-zinc-200">Typography</Strong> — Editorial font pairings (Outfit, Geist, Cabinet Grotesk)
            </li>
          </ul>
          <p className="pt-2 text-[15px] leading-relaxed text-zinc-600 dark:text-[#E5E5E5]">
            Export the configuration to your project stylesheet (<Code>src/index.css</Code>):
          </p>
          <CodeBlock
            code={`/* Generated @theme configuration for Tailwind CSS v4 */\n@theme {\n  --color-primary-50: oklch(0.97 0.02 264.5);\n  --color-primary-500: oklch(0.55 0.28 264.5);\n  /* ... full semantic scale */\n  --radius: 0.5rem;\n  --font-sans: 'Outfit', sans-serif;\n}`}
          />
        </div>

        {/* Step 5: Dependency resolution */}
        <div className="space-y-4 rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-6 sm:p-8 dark:border-[#2e2f33] dark:bg-[#202124]">
          <h3 className="font-outfit text-xl font-medium tracking-[-0.4px] text-zinc-900 dark:text-white">
            5. Manual Dependency Resolution
          </h3>
          <p className="text-[15px] leading-relaxed text-zinc-600 dark:text-[#E5E5E5]">
            While the CLI resolves dependencies automatically on <Code>add</Code>, you can also install peer libraries manually:
          </p>
          <CodeBlock
            code={`# Core UI dependencies\nnpm install framer-motion lucide-react clsx tailwind-merge class-variance-authority\n\n# Radix primitives (for Dialog, Select, Tooltip)\nnpm install @radix-ui/react-dialog @radix-ui/react-select @radix-ui/react-tooltip`}
          />
        </div>

        {/* Available components list */}
        <div className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
          <h3 className="mb-4 text-lg font-bold text-zinc-900 dark:text-zinc-100">
            Daftar Komponen Tersedia
          </h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {[
              "Button",
              "Badge",
              "Alert",
              "Input",
              "Textarea",
              "Select",
              "Checkbox",
              "Switch",
              "Radio",
              "Tabs",
              "Dialog",
              "Tooltip",
              "Avatar",
              "Card",
              "Pagination",
              "Accordion",
              "Dropdown",
              "Skeleton",
            ].map((comp) => (
              <div
                key={comp}
                className="flex items-center gap-2 rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                <Code>{comp}</Code>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FAQ */}
      <section id="faq" className="scroll-mt-24 space-y-8">
        <div className="space-y-3 mb-6">
          <h2 className="font-outfit text-3xl sm:text-4xl font-medium tracking-[-0.8px] leading-[1.22] text-zinc-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#828282]">
            Answers to common build configuration, package manager, and overwrite questions:
          </p>
        </div>

        <div className="space-y-8">
          <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-6 sm:p-8 dark:border-[#2e2f33] dark:bg-[#202124]">
            <h3 className="font-outfit text-xl font-medium tracking-[-0.4px] text-zinc-900 dark:text-white mb-3">
              Why do I encounter ERESOLVE / Peer Dependency errors when installing components?
            </h3>
            <p className="text-[15px] leading-relaxed text-zinc-600 dark:text-[#E5E5E5] mb-6">
              When using NPM with React 19, strict peer dependency trees in third-party libraries (such as <Code>@react-three/fiber</Code>) can halt installation.
            </p>

            <div className="space-y-4">
              <p className="text-xs font-semibold tracking-wider uppercase text-zinc-500 dark:text-[#828282]">
                Recommended Resolution Steps:
              </p>

              {/* Solution 1 - Recommended */}
              <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/50 p-5 dark:border-emerald-900/40 dark:bg-emerald-950/20">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span className="font-semibold text-sm text-emerald-900 dark:text-emerald-200">
                    Option 1: Pin React Version (Recommended)
                  </span>
                </div>
                <p className="text-xs text-emerald-800 dark:text-emerald-300 mb-3 leading-relaxed">
                  Pinning with <Code className="text-[11px]">--save-exact</Code> prevents automated minor version bumps that trigger peer dependency mismatches:
                </p>
                <CodeBlock code="npm install react@19.2.0 react-dom@19.2.0 --save-exact" />
              </div>

              {/* Solution 2 - pnpm */}
              <div className="rounded-xl border border-zinc-200/60 bg-white p-5 dark:border-[#2e2f33] dark:bg-[#161618]">
                <div className="flex items-center gap-2 mb-2">
                  <Box className="h-4 w-4 text-indigo-500 shrink-0" />
                  <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                    Option 2: Switch to PNPM
                  </span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-[#828282] mb-3 leading-relaxed">
                  PNPM's isolated virtual store resolves non-breaking peer dependency mismatches automatically:
                </p>
                <CodeBlock code="pnpm add @react-three/fiber @react-three/drei maath" />
              </div>

              {/* Solution 3 - legacy-peer-deps */}
              <div className="rounded-xl border border-zinc-200/60 bg-white p-5 dark:border-[#2e2f33] dark:bg-[#161618]">
                <div className="flex items-center gap-2 mb-2">
                  <Terminal className="h-4 w-4 text-amber-500 shrink-0" />
                  <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                    Option 3: Bypass with Legacy Peer Deps
                  </span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-[#828282] mb-3 leading-relaxed">
                  Instructs NPM to proceed with installation despite version variance:
                </p>
                <CodeBlock code="npm install @react-three/fiber @react-three/drei maath --legacy-peer-deps" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-6 sm:p-8 dark:border-[#2e2f33] dark:bg-[#202124]">
            <h3 className="font-outfit text-xl font-medium tracking-[-0.4px] text-zinc-900 dark:text-white mb-2">
              Why did the CLI skip installing a component file?
            </h3>
            <p className="text-[15px] leading-relaxed text-zinc-600 dark:text-[#E5E5E5]">
              Hudbird UI enforces <Strong className="text-zinc-900 dark:text-white">Zero Unintended Overwrites</Strong>. When a component already exists in <Code>src/components/hudbird-ui</Code>, the CLI halts to protect your local customizations. Pass <Code className="text-[11px]">--overwrite</Code> to intentionally replace it with the latest registry version.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-6 sm:p-8 dark:border-[#2e2f33] dark:bg-[#202124]">
            <h3 className="font-outfit text-xl font-medium tracking-[-0.4px] text-zinc-900 dark:text-white mb-2">
              Do I have to use the CLI to use Hudbird UI?
            </h3>
            <p className="text-[15px] leading-relaxed text-zinc-600 dark:text-[#E5E5E5]">
              No. Every component is completely copy-pasteable directly from the documentation or GitHub repository. The CLI simply automates peer dependency installation and path alias resolution.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Get Help & Report Bugs (Bento Layout, No 3-Cards Cliché, No Emojis) */}
      <section id="contact" className="scroll-mt-24 space-y-8">
        <div className="space-y-3 mb-6">
          <h2 className="font-outfit text-3xl sm:text-4xl font-medium tracking-[-0.8px] leading-[1.22] text-zinc-900 dark:text-white">
            Community &amp; Issue Reporting
          </h2>
          <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#828282]">
            Connect with the core team or report reproducible bugs on GitHub:
          </p>
        </div>

        {/* Asymmetric 2-Column Bento Layout */}
        <div className="grid gap-6 md:grid-cols-12">
          {/* Main Community Card (Col span 7) */}
          <div className="md:col-span-7 flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-6 sm:p-8 dark:border-[#2e2f33] dark:bg-[#202124]">
            <div>
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                <MessageSquare className="h-5 w-5" />
              </div>
              <h3 className="font-outfit text-2xl font-medium tracking-[-0.5px] text-zinc-900 dark:text-white mb-2">
                Discord Community
              </h3>
              <p className="text-[15px] leading-relaxed text-zinc-600 dark:text-[#828282] mb-6">
                Join our developer server to share feedback, ask architecture questions, and preview upcoming component releases.
              </p>
            </div>
            <a
              href="https://discord.gg/NPBspwkXke"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-indigo-500"
            >
              <span>Join Discord</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* GitHub Issues & Bug Report Card (Col span 5) */}
          <div className="md:col-span-5 flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-6 sm:p-8 dark:border-[#2e2f33] dark:bg-[#202124]">
            <div>
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-100 text-zinc-800 dark:bg-[#161618] dark:text-zinc-200">
                <Bug className="h-5 w-5 text-indigo-500" />
              </div>
              <h3 className="font-outfit text-xl font-medium tracking-[-0.4px] text-zinc-900 dark:text-white mb-2">
                Report an Issue
              </h3>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-[#828282] mb-6">
                Encountered unexpected behavior or visual clipping? Submit a structured bug report on GitHub.
              </p>
            </div>
            <a
              href="https://github.com/gpamdani-git/Hudbird/issues/new"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-xs font-semibold text-zinc-800 transition hover:bg-zinc-50 dark:border-[#2e2f33] dark:bg-[#161618] dark:text-zinc-200 dark:hover:bg-[#202124]"
            >
              <span>Open Issue</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
