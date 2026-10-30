import React, { useState } from "react";
import { DocHeader } from "../components/DocHeader";
import { CodeBlock } from "../components/CodeBlock";
import { HUDBIRD_SKILL_CONTENT } from "../data/hudbirdSkillContent";
import {
  Bot,
  Sparkles,
  Terminal,
  CheckCircle2,
  Layers,
  Cpu,
  ArrowRight,
  ShieldCheck,
  FileCode,
  Zap,
  Code2,
  Workflow,
  Laptop,
  Check,
  Copy,
  Download,
  ExternalLink,
} from "lucide-react";

export default function AiSkillsDoc() {
  const [copiedCurl, setCopiedCurl] = useState(false);
  const [copiedSkill, setCopiedSkill] = useState(false);
  const [downloadedSkill, setDownloadedSkill] = useState(false);
  const [activeAgentTab, setActiveAgentTab] = useState<
    "claude" | "codex" | "antigravity" | "cursor" | "windsurf"
  >("claude");

  const curlCommand = `mkdir -p .agents/skills/hudbird-ui && curl -sSL https://raw.githubusercontent.com/gpamdani-git/Hudbird/main/.agents/skills/hudbird-ui/SKILL.md -o .agents/skills/hudbird-ui/SKILL.md`;

  const handleCopyCurl = () => {
    navigator.clipboard.writeText(curlCommand);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  const handleDownloadSkill = () => {
    try {
      const blob = new Blob([HUDBIRD_SKILL_CONTENT], {
        type: "text/markdown;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "SKILL.md";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setDownloadedSkill(true);
      setTimeout(() => setDownloadedSkill(false), 2500);
    } catch (err) {
      console.error("Failed to download file directly, falling back to window.open", err);
      window.open("/skills/hudbird-ui.md", "_blank");
    }
  };

  const handleCopySkill = () => {
    navigator.clipboard.writeText(HUDBIRD_SKILL_CONTENT);
    setCopiedSkill(true);
    setTimeout(() => setCopiedSkill(false), 2000);
  };

  return (
    <div className="mx-auto w-full pb-24">
      {/* Hero Header */}
      <DocHeader
        category="INTEGRATION"
        title="AI Agent Skills & DX"
        badge="v1.5"
        description="Supercharge your favorite AI coding assistant (Claude Code, OpenAI Codex, Antigravity, Cursor, or Windsurf) with native knowledge of Hudbird UI. Build production-grade interfaces using verified components, exact props, and battle-tested prompts."
        className="mb-8 max-w-4xl"
      />

      <div className="mb-8 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1 text-xs font-semibold text-pink-600 dark:text-[#FFB1EE]">
          <Bot className="h-3.5 w-3.5" />
          AI Skills v1.5
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <ShieldCheck className="h-3.5 w-3.5" />
          Zero-Hallucination Guarantee
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700 dark:border-[#2E2F33] dark:bg-[#202124] dark:text-[#E5E5E5]">
          <Cpu className="h-3.5 w-3.5" />
          Claude • Codex • Antigravity • Cursor
        </span>
      </div>

      <div className="max-w-4xl space-y-14 text-zinc-800 dark:text-zinc-200">
        {/* 1. Overview & Zero-Hallucination */}
        <section id="overview" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                Why Use Hudbird UI Skills?
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Turn your AI from a generic code guesser into a specialized Hudbird UI architect.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-rose-200/80 bg-rose-50/40 p-5 dark:border-rose-900/30 dark:bg-rose-950/20">
              <div className="flex items-center gap-2 font-semibold text-rose-700 dark:text-rose-400">
                <span>❌</span> Without AI Skill (Hallucinations)
              </div>
              <ul className="mt-3 space-y-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                <li className="flex items-start gap-1.5">
                  <span className="font-bold text-rose-500">•</span>
                  <span>
                    Invents non-existent props or variants (e.g.{" "}
                    <code>variant="gradient-glow"</code>).
                  </span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="font-bold text-rose-500">•</span>
                  <span>
                    Writes raw unmaintainable CSS strings instead of leveraging built-in components.
                  </span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="font-bold text-rose-500">•</span>
                  <span>Forgets dark mode classes or produces broken layout contrast.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="font-bold text-rose-500">•</span>
                  <span>
                    Doesn't know how to run <code>npx hudbird-ui add</code> to install dependencies.
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/40 p-5 dark:border-emerald-900/30 dark:bg-emerald-950/20">
              <div className="flex items-center gap-2 font-semibold text-emerald-700 dark:dark:text-emerald-400">
                <span>✅</span> With Hudbird UI Skill (Real Works)
              </div>
              <ul className="mt-3 space-y-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>
                    Knows all <strong>60+ official components</strong> and their exact CVA variants.
                  </span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>
                    Uses signature blocks: <code>DoubleBezelCard</code>, <code>KineticButton</code>,{" "}
                    <code>SplitTextReveal</code>.
                  </span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>
                    Automatically executes CLI install commands and configures{" "}
                    <code>components.json</code>.
                  </span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>
                    Guarantees 100% paired dark mode classes and accessible ARIA attributes.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 2. Key Advantages & Superpowers */}
        <section id="advantages" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                Key Superpowers & Advantages
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                How the Hudbird UI Skill accelerates developer experience and turns natural language
                into production code.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Advantage 1 */}
            <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-xs transition-all hover:border-indigo-500/40 hover:shadow-md dark:border-[#2E2F33] dark:bg-[#202124]">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                10x Prototyping Velocity
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                Zero documentation context switching. You don't need to manually check prop names or
                import paths—simply prompt your idea and get production-ready code in seconds.
              </p>
            </div>

            {/* Advantage 2 */}
            <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-xs transition-all hover:border-emerald-500/40 hover:shadow-md dark:border-[#2E2F33] dark:bg-[#202124]">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                100% Zero-Hallucination
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                Locks your model's vocabulary to authentic CVA variants, subcomponents, and color
                tokens. Eliminates broken imports and non-existent props.
              </p>
            </div>

            {/* Advantage 3 */}
            <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-xs transition-all hover:border-amber-500/40 hover:shadow-md dark:border-[#2E2F33] dark:bg-[#202124]">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Automated Dark Mode & Glassmorphism
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                Guarantees paired light/dark classes (
                <code className="font-mono text-[11px]">bg-white dark:bg-zinc-950</code>) and
                architectural backdrop blurs on every generated container.
              </p>
            </div>

            {/* Advantage 4 */}
            <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-xs transition-all hover:border-purple-500/40 hover:shadow-md dark:border-[#2E2F33] dark:bg-[#202124]">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400">
                <Workflow className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Kinetic Motion Out-of-the-Box
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                Naturally implements signature components like{" "}
                <code className="font-mono text-[11px]">KineticButton</code>,{" "}
                <code className="font-mono text-[11px]">SplitTextReveal</code>, and{" "}
                <code className="font-mono text-[11px]">StickyStack</code> without manual Framer
                Motion hooks.
              </p>
            </div>

            {/* Advantage 5 */}
            <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-xs transition-all hover:border-cyan-500/40 hover:shadow-md dark:border-[#2E2F33] dark:bg-[#202124]">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600 dark:bg-cyan-950/60 dark:text-cyan-400">
                <Terminal className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Integrated CLI Scaffolding
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                The AI automatically instructs (or executes directly in terminal agents) the
                required <code className="font-mono text-[11px]">npx hudbird-ui add</code> commands
                with recursive sub-dependencies.
              </p>
            </div>

            {/* Advantage 6 */}
            <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-xs transition-all hover:border-rose-500/40 hover:shadow-md dark:border-[#2E2F33] dark:bg-[#202124]">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                8 Vertical Niche Blocks Ready
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                Understands prebuilt blocks for SaaS, Fintech, ModernApp, Agency, Ecommerce,
                Hospitality, AiStartup, and AdminCms to compose entire pages instantly.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Fast 1-Liner Installation */}
        <section id="quickstart-setup" className="scroll-mt-24 space-y-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <Terminal className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                Quickstart: Install Skill in 1 Line
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Run this command in the root of any React / Next.js project to install the skill
                instantly:
              </p>
            </div>
          </div>

          <div className="relative rounded-xl border border-zinc-200 bg-zinc-950 p-4 font-mono text-sm text-zinc-100 dark:border-[#2E2F33]">
            <div className="flex items-center justify-between gap-4">
              <span className="overflow-x-auto text-xs select-all sm:text-sm">{curlCommand}</span>
              <button
                type="button"
                onClick={handleCopyCurl}
                className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg bg-zinc-800 px-3 py-1.5 text-xs font-semibold text-zinc-200 transition-colors hover:bg-zinc-700"
              >
                {copiedCurl ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Prefer manual file setup?
            </span>
            <button
              type="button"
              onClick={handleDownloadSkill}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-800 shadow-xs transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
            >
              {downloadedSkill ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  Downloaded SKILL.md!
                </>
              ) : (
                <>
                  <Download className="h-3.5 w-3.5 text-indigo-500" />
                  Download SKILL.md directly
                </>
              )}
            </button>
          </div>
        </section>

        {/* 3. Supported AI Assistants */}
        <section id="supported-assistants" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                Configuring Your Model or Assistant
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Select your AI tool below for exact integration steps:
              </p>
            </div>
          </div>

          {/* Model Switcher Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-zinc-200 pb-3 dark:border-[#2E2F33]">
            {[
              { id: "claude", label: "Claude Code / CLI" },
              { id: "antigravity", label: "Google Antigravity" },
              { id: "cursor", label: "Cursor IDE" },
              { id: "windsurf", label: "Windsurf Cascade" },
              { id: "codex", label: "OpenAI Codex / ChatGPT" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveAgentTab(tab.id as any)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  activeAgentTab === tab.id
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content: Claude Code */}
          {activeAgentTab === "claude" && (
            <div className="space-y-4 rounded-xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-[#2E2F33] dark:bg-[#202124]">
              <h3 className="flex items-center gap-2 text-base font-bold text-zinc-900 dark:text-zinc-100">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/10 text-xs font-bold text-amber-600">
                  C
                </span>
                Anthropic Claude Code Configuration
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Claude Code automatically detects project instructions in <code>CLAUDE.md</code> or
                agent skills in <code>.agents/skills/</code>.
              </p>
              <div className="space-y-2">
                <span className="text-xs font-semibold text-zinc-500 uppercase">
                  Method 1: Project Skill (Recommended)
                </span>
                <CodeBlock
                  language="bash"
                  filename="terminal"
                  code={`# 1. Download the skill into your project
mkdir -p .agents/skills/hudbird-ui
curl -sSL https://hudbird.vercel.app/skills/hudbird-ui.md -o .agents/skills/hudbird-ui/SKILL.md

# 2. Run Claude Code - it will auto-index the skill
claude`}
                />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-semibold text-zinc-500 uppercase">
                  Method 2: Reference in CLAUDE.md
                </span>
                <CodeBlock
                  language="markdown"
                  filename="CLAUDE.md"
                  code={`## UI Architecture & Components
This project uses **Hudbird UI**. Whenever building UI, pages, or components:
- Always check and use components from \`@/components/hudbird-ui/\`.
- Install missing components using \`npx hudbird-ui add <ComponentName>\`.
- Pair light/dark classes on every container (e.g. \`bg-white dark:bg-zinc-950\`).
- Refer to \`.agents/skills/hudbird-ui/SKILL.md\` for the full component API.`}
                />
              </div>
            </div>
          )}

          {/* Tab Content: Google Antigravity */}
          {activeAgentTab === "antigravity" && (
            <div className="space-y-4 rounded-xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-[#2E2F33] dark:bg-[#202124]">
              <h3 className="flex items-center gap-2 text-base font-bold text-zinc-900 dark:text-zinc-100">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/10 text-xs font-bold text-blue-600">
                  A
                </span>
                Google Antigravity Agent Configuration
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Google Antigravity natively loads skills with YAML frontmatter located in{" "}
                <code>.agents/skills/&lt;skill-name&gt;/SKILL.md</code>.
              </p>
              <CodeBlock
                language="bash"
                filename="terminal"
                code={`# Install skill directly in workspace
mkdir -p .agents/skills/hudbird-ui
curl -sSL https://hudbird.vercel.app/skills/hudbird-ui.md -o .agents/skills/hudbird-ui/SKILL.md

# Antigravity will now automatically activate the skill whenever you ask UI questions!`}
              />
            </div>
          )}

          {/* Tab Content: Cursor */}
          {activeAgentTab === "cursor" && (
            <div className="space-y-4 rounded-xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-[#2E2F33] dark:bg-[#202124]">
              <h3 className="flex items-center gap-2 text-base font-bold text-zinc-900 dark:text-zinc-100">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/10 text-xs font-bold text-indigo-600">
                  CR
                </span>
                Cursor IDE Rules (.cursorrules or .cursor/rules/)
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                In Cursor, create <code>.cursorrules</code> or{" "}
                <code>.cursor/rules/hudbird.mdc</code> to teach Cursor Composer and Chat:
              </p>
              <CodeBlock
                language="markdown"
                filename=".cursorrules"
                code={`# Hudbird UI Integration Rules
When asked to build or refactor frontend components or pages:
1. Always utilize Hudbird UI components located in \`@/components/hudbird-ui/\`.
2. If a required component is missing, tell the user to run or execute: \`npx hudbird-ui add [ComponentName]\`.
3. Use signature components:
   - For high-end cards: \`<DoubleBezelCard variant="glass" showCrosshairs />\`
   - For interactive buttons: \`<KineticButton variant="primary" />\`
   - For scroll typography: \`<SplitTextReveal as="h2" text="..." />\`
   - For feature layout: \`<BentoGrid>\` with \`<BentoCard>\`
4. Never invent props. Always pair light and dark mode classes.`}
              />
            </div>
          )}

          {/* Tab Content: Windsurf */}
          {activeAgentTab === "windsurf" && (
            <div className="space-y-4 rounded-xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-[#2E2F33] dark:bg-[#202124]">
              <h3 className="flex items-center gap-2 text-base font-bold text-zinc-900 dark:text-zinc-100">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-500/10 text-xs font-bold text-teal-600">
                  W
                </span>
                Windsurf (Codeium Cascade) Configuration
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Create a <code>.windsurfrules</code> file in your repository root:
              </p>
              <CodeBlock
                language="markdown"
                filename=".windsurfrules"
                code={`## Hudbird UI Engineering Rules
- Components are owned locally under \`@/components/hudbird-ui/\`.
- Install components using the CLI: \`npx hudbird-ui add [Component]\`.
- Support Tailwind v4 with \`@theme\` variables and Lucide React icons.
- Ensure strict dark mode parity: every container must have matching \`dark:\` styles.`}
              />
            </div>
          )}

          {/* Tab Content: Codex / ChatGPT */}
          {activeAgentTab === "codex" && (
            <div className="space-y-4 rounded-xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-[#2E2F33] dark:bg-[#202124]">
              <h3 className="flex items-center gap-2 text-base font-bold text-zinc-900 dark:text-zinc-100">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/10 text-xs font-bold text-green-600">
                  O
                </span>
                OpenAI Codex & ChatGPT Custom Instructions
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Paste the following snippet into your project's custom instructions or prompt
                system:
              </p>
              <CodeBlock
                language="text"
                filename="Custom Instructions"
                code={`You are an expert React engineer specializing in Hudbird UI (@hudbird/ui).
Components are installed via 'npx hudbird-ui add [Component]' into '@/components/hudbird-ui'.
Always use authentic Hudbird components (DoubleBezelCard, KineticButton, SplitTextReveal, BentoGrid, Hero, Form, Dialog).
Ensure clean TypeScript types and paired Tailwind dark mode classes.`}
              />
            </div>
          )}
        </section>

        {/* 4. Real Working Prompt Examples (No Halu) */}
        <section id="real-prompts" className="scroll-mt-24 space-y-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                Battle-Tested Prompt Examples (Real Works, No Halu)
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                These prompts have been verified to generate 100% working, syntax-accurate code with
                all tested models.
              </p>
            </div>
          </div>

          {/* Prompt 1 */}
          <div className="space-y-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-[#2E2F33] dark:bg-[#202124]">
            <div className="flex items-center justify-between">
              <span className="rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">
                Prompt 1: Dark Mode SaaS Hero Section
              </span>
              <span className="text-xs text-zinc-400">Tested on Claude 3.5 Sonnet & GPT-4o</span>
            </div>

            <div>
              <div className="mb-1 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                Prompt to give your AI:
              </div>
              <div className="rounded-lg bg-zinc-100 p-3.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-200">
                "Create a high-converting SaaS Hero section using Hudbird UI. Include decorative
                backdrop blobs, a badge with an announcement, a bold title with SplitTextReveal
                scroll animation, and a KineticButton primary CTA alongside a secondary outline
                Button. Ensure full dark mode support."
              </div>
            </div>

            <div>
              <div className="mb-1 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                AI Execution & Output (Real Working Code):
              </div>
              <CodeBlock
                language="tsx"
                filename="HeroSection.tsx"
                code={`import React from "react";
import {
  Hero,
  HeroHeader,
  HeroBody,
  HeroContent,
  HeroBadge,
  HeroTitle,
  HeroDescription,
  HeroActions,
} from "@/components/hudbird-ui/Hero";
import { KineticButton } from "@/components/hudbird-ui/KineticButton";
import { Button } from "@/components/hudbird-ui/Button";
import { SplitTextReveal } from "@/components/hudbird-ui/SplitTextReveal";
import { Sparkles, ArrowRight } from "lucide-react";

export function SaaSMarketingHero() {
  return (
    <Hero size="full" withBlobs className="border-b border-zinc-200 dark:border-[#2E2F33]">
      <HeroHeader
        logo={<span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">Hudbird</span>}
        links={[
          { label: "Features", href: "#features" },
          { label: "Pricing", href: "#pricing" },
        ]}
        action={<Button variant="solid" color="primary">Sign In</Button>}
      />
      <HeroBody variant="centered">
        <HeroContent align="center">
          <HeroBadge>
            <span className="flex items-center gap-1.5 text-xs font-medium">
              <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
              Introducing Hudbird UI 1.5
            </span>
          </HeroBadge>
          
          <HeroTitle>
            <SplitTextReveal
              as="h1"
              text="Engineered for software that demands attention"
              className="text-4xl sm:text-6xl font-black text-zinc-900 dark:text-white"
            />
          </HeroTitle>

          <HeroDescription>
            Stop settling for generic templates. Craft signature web applications with architectural double-bezel cards and tactile micro-motion.
          </HeroDescription>

          <HeroActions>
            <KineticButton variant="primary" size="lg" href="/dashboard">
              Start Free Trial
            </KineticButton>
            <Button variant="outline" size="lg" endContent={<ArrowRight className="h-4 w-4" />}>
              Documentation
            </Button>
          </HeroActions>
        </HeroContent>
      </HeroBody>
    </Hero>
  );
}`}
              />
            </div>
          </div>

          {/* Prompt 2 */}
          <div className="space-y-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-[#2E2F33] dark:bg-[#202124]">
            <div className="flex items-center justify-between">
              <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                Prompt 2: Bento Grid Feature Showcase with DoubleBezelCard
              </span>
              <span className="text-xs text-zinc-400">Tested on Gemini 1.5 Pro & Claude 3.5</span>
            </div>

            <div>
              <div className="mb-1 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                Prompt to give your AI:
              </div>
              <div className="rounded-lg bg-zinc-100 p-3.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-200">
                "Build a feature section using Hudbird UI's BentoGrid and BentoCard components.
                Place a DoubleBezelCard with glass variant and architectural corner crosshairs
                inside the main 2-column card. Add Lucide icons and clean subheadings."
              </div>
            </div>

            <div>
              <div className="mb-1 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                AI Execution & Output (Real Working Code):
              </div>
              <CodeBlock
                language="tsx"
                filename="FeatureBento.tsx"
                code={`import React from "react";
import { BentoGrid, BentoCard, BentoCardContent } from "@/components/hudbird-ui/BentoGrid";
import { DoubleBezelCard } from "@/components/hudbird-ui/DoubleBezelCard";
import { Badge } from "@/components/hudbird-ui/Badge";
import { Zap, ShieldCheck, Cpu } from "lucide-react";

export function ProductFeatures() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="mb-12 text-center">
        <Badge variant="flat" color="primary">Core Architecture</Badge>
        <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50">
          Engineered for Maximum Reliability
        </h2>
      </div>

      <BentoGrid>
        {/* Large Highlight Card with DoubleBezelCard */}
        <BentoCard className="md:col-span-2">
          <BentoCardContent className="p-4 sm:p-6">
            <DoubleBezelCard
              variant="glass"
              showCrosshairs
              isHoverable
              padding="lg"
              className="h-full"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Dual-Tier Architectural Chassis
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Double-bezel aesthetics with SVG alignment crosshairs create an instant high-tech, futuristic hardware vibe.
              </p>
            </DoubleBezelCard>
          </BentoCardContent>
        </BentoCard>

        {/* Card 2 */}
        <BentoCard>
          <BentoCardContent className="p-8 flex flex-col justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Zero Runtime Slop</h4>
              <p className="mt-2 text-sm text-zinc-500">Pure Tailwind CSS classes with full tree-shaking support.</p>
            </div>
          </BentoCardContent>
        </BentoCard>

        {/* Card 3 */}
        <BentoCard>
          <BentoCardContent className="p-8 flex flex-col justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Micro-Interactions</h4>
              <p className="mt-2 text-sm text-zinc-500">Framer Motion physics integrated natively into every interaction.</p>
            </div>
          </BentoCardContent>
        </BentoCard>
      </BentoGrid>
    </section>
  );
}`}
              />
            </div>
          </div>

          {/* Prompt 3 */}
          <div className="space-y-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-[#2E2F33] dark:bg-[#202124]">
            <div className="flex items-center justify-between">
              <span className="rounded-md bg-purple-50 px-2.5 py-1 text-xs font-bold text-purple-700 dark:bg-purple-950/50 dark:text-purple-300">
                Prompt 3: Analytics Dashboard with Charts & Table
              </span>
              <span className="text-xs text-zinc-400">Tested on Claude 3.5 Sonnet & Windsurf</span>
            </div>

            <div>
              <div className="mb-1 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                Prompt to give your AI:
              </div>
              <div className="rounded-lg bg-zinc-100 p-3.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-200">
                "Build a modern SaaS metrics dashboard with Hudbird UI. Display 4 metric cards using
                DoubleBezelCard with status badges, an AreaChart showing monthly revenue, and a data
                Table displaying recent transactions with color badges."
              </div>
            </div>

            <div>
              <div className="mb-1 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                AI Execution & Output (Real Working Code):
              </div>
              <CodeBlock
                language="tsx"
                filename="DashboardMetrics.tsx"
                code={`import React from "react";
import { DoubleBezelCard } from "@/components/hudbird-ui/DoubleBezelCard";
import { AreaChart } from "@/components/hudbird-ui/AreaChart";
import { Badge } from "@/components/hudbird-ui/Badge";
import { DollarSign, Users, ShoppingCart, Activity } from "lucide-react";

const chartData = [
  { month: "Jan", revenue: 4500 },
  { month: "Feb", revenue: 5200 },
  { month: "Mar", revenue: 6800 },
  { month: "Apr", revenue: 8900 },
  { month: "May", revenue: 12400 },
];

export function AnalyticsOverview() {
  return (
    <div className="space-y-8 p-6">
      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", val: "$48,290", change: "+14.2%", icon: DollarSign },
          { label: "Active Users", val: "12,450", change: "+8.1%", icon: Users },
          { label: "New Orders", val: "1,204", change: "+23.5%", icon: ShoppingCart },
          { label: "Server Health", val: "99.99%", change: "Optimal", icon: Activity },
        ].map((item, idx) => (
          <DoubleBezelCard key={idx} variant="glass" showCrosshairs isHoverable padding="sm">
            <div className="flex items-center justify-between text-zinc-500">
              <span className="text-xs font-medium uppercase">{item.label}</span>
              <item.icon className="h-4 w-4 text-zinc-400" />
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{item.val}</span>
              <Badge variant="flat" color="success">{item.change}</Badge>
            </div>
          </DoubleBezelCard>
        ))}
      </div>

      {/* Main Chart */}
      <DoubleBezelCard variant="default" padding="lg">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">Revenue Velocity</h3>
        <p className="text-xs text-zinc-500 mb-6">Gross monthly subscription volume (USD)</p>
        <AreaChart
          data={chartData}
          categories={["revenue"]}
          index="month"
          colors={["indigo"]}
          className="h-72 w-full"
        />
      </DoubleBezelCard>
    </div>
  );
}`}
              />
            </div>
          </div>
        </section>

        {/* 5. Full Skill Reference */}
        <section id="full-skill-reference" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              <FileCode className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                Full SKILL.md Reference File
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Download the official skill or preview and copy the full markdown definition loaded
                by AI agents:
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleDownloadSkill}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-indigo-500"
            >
              {downloadedSkill ? (
                <>
                  <Check className="h-4 w-4 text-emerald-300" />
                  <span>Downloaded SKILL.md!</span>
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  <span>Download SKILL.md</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleCopySkill}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-xs font-semibold text-zinc-700 shadow-xs transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
            >
              {copiedSkill ? (
                <>
                  <Check className="h-4 w-4 text-emerald-500" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy Full SKILL.md</span>
                </>
              )}
            </button>

            <div className="ml-auto flex items-center gap-3">
              <a
                href="https://raw.githubusercontent.com/gpamdani-git/Hudbird/main/.agents/skills/hudbird-ui/SKILL.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400"
              >
                <span>GitHub Raw</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>
              <a
                href="/skills/hudbird-ui.md"
                download="SKILL.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400"
              >
                <span>Direct Raw</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-500">
              <span>Preview & Direct Copy:</span>
              <span>
                Project Target: <code>.agents/skills/hudbird-ui/SKILL.md</code>
              </span>
            </div>
            <CodeBlock
              code={HUDBIRD_SKILL_CONTENT}
              language="markdown"
              filename="SKILL.md"
              expandable={true}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
