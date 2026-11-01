import React, { useState } from "react";
import { Badge, Button, Tabs, Tab, Card, CardHeader, CardBody } from "@hudbird/ui";
import { DocHeader } from "../components/DocHeader";
import { CodeBlock } from "../components/CodeBlock";
import { HUDBIRD_SKILL_CONTENT } from "../data/hudbirdSkillContent";
import {
  Bot,
  Palette,
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
  XCircle,
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
        description="Supercharge your favorite AI coding assistant (Claude Code, OpenAI Codex, Antigravity, Cursor, or Windsurf) with native knowledge of Hudbird UI. Build production-grade interfaces using verified components, exact props, and battle-tested prompts."
        className="mb-8 max-w-4xl"
      />

      <div className="max-w-4xl space-y-24 text-zinc-800 sm:space-y-32 dark:text-zinc-200">
        {/* 1. Overview & Zero-Hallucination */}
        <section id="overview" className="scroll-mt-24 space-y-8">
          <div className="mb-6 space-y-3">
            <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
              Why Use Hudbird UI Skills?
            </h2>
            <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#828282]">
              Turn generic code generation into a specialized design-system architect that respects
              your tokens and component contracts.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card variant="shadow">
              <CardHeader>
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-500/15 dark:text-rose-400">
                    <XCircle className="h-4 w-4" />
                  </span>
                  <h3 className="text-base font-semibold tracking-tight text-zinc-900 sm:text-lg dark:text-white">
                    Without Skill (Default Model Guessing)
                  </h3>
                </div>
              </CardHeader>
              <CardBody>
                <ul className="space-y-3 text-sm leading-relaxed text-zinc-600 sm:text-[15px] dark:text-zinc-300">
                  <li>
                    Invents non-existent props or variants (e.g.{" "}
                    <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-white/10 dark:text-zinc-200">
                      variant="gradient-glow"
                    </code>
                    ).
                  </li>
                  <li>Writes raw ad-hoc CSS strings instead of leveraging built-in primitives.</li>
                  <li>Omits dark mode classes, producing unreadable contrast in dark themes.</li>
                  <li>
                    Unaware of local CLI installation commands (
                    <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-white/10 dark:text-zinc-200">
                      npx hudbird-ui add
                    </code>
                    ).
                  </li>
                </ul>
              </CardBody>
            </Card>

            <Card variant="shadow">
              <CardHeader>
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                  </span>
                  <h3 className="text-base font-semibold tracking-tight text-zinc-900 sm:text-lg dark:text-white">
                    With Hudbird UI Skill (Enforced Contract)
                  </h3>
                </div>
              </CardHeader>
              <CardBody>
                <ul className="space-y-3 text-sm leading-relaxed text-zinc-600 sm:text-[15px] dark:text-zinc-300">
                  <li>
                    Strictly constrained to 60+ verified components and authentic CVA variants.
                  </li>
                  <li>
                    Correctly imports signature primitives:{" "}
                    <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-white/10 dark:text-zinc-200">
                      DoubleBezelCard
                    </code>
                    ,{" "}
                    <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-white/10 dark:text-zinc-200">
                      KineticButton
                    </code>
                    ,{" "}
                    <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-white/10 dark:text-zinc-200">
                      Tabs
                    </code>
                    .
                  </li>
                  <li>Enforces 100% paired dark mode classes on every container.</li>
                  <li>Automatically identifies missing components and runs CLI commands.</li>
                </ul>
              </CardBody>
            </Card>
          </div>
        </section>

        {/* 2. Key Advantages & Architecture */}
        <section id="advantages" className="scroll-mt-24 space-y-8">
          <div className="mb-6 space-y-3">
            <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
              Core Capabilities
            </h2>
            <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#828282]">
              How the skill instructs models to produce production-grade interfaces.
            </p>
          </div>

          <div className="space-y-4">
            {/* Flagship Card */}
            <Card variant="shadow">
              <CardBody className="p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900 dark:bg-white/[0.06] dark:text-white">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold tracking-tight text-zinc-900 sm:text-lg dark:text-white">
                      Strict Component Contracts & Verified API
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Zero hallucinations on imports, CVA variants, and prop names
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-zinc-600 sm:text-[15px] dark:text-zinc-300">
                  The skill provides complete type signatures for all 62+ primitives, eliminating
                  common LLM errors like inventing props or mixing up compound component slots.
                  Models generate code that compiles cleanly on first run.
                </p>
              </CardBody>
            </Card>

            {/* 2 Side-by-Side Cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Card variant="shadow">
                <CardBody className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900 dark:bg-white/[0.06] dark:text-white">
                      <Palette className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-white">
                      Automated Dark Mode & Geometry
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-[15px] dark:text-zinc-300">
                    Enforces paired light and dark classes with Obsidian (#161618) canvas and
                    concentric padding (R_inner = R_outer - p) across all generated containers.
                  </p>
                </CardBody>
              </Card>

              <Card variant="shadow">
                <CardBody className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900 dark:bg-white/[0.06] dark:text-white">
                      <Terminal className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-white">
                      CLI Scaffolding Awareness
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-[15px] dark:text-zinc-300">
                    The model knows how to inspect{" "}
                    <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-white/10 dark:text-zinc-200">
                      components.json
                    </code>{" "}
                    and trigger recursive installation of missing components and peer dependencies
                    automatically.
                  </p>
                </CardBody>
              </Card>
            </div>
          </div>
        </section>

        {/* 3. Fast 1-Liner Installation */}
        <section id="quickstart-setup" className="scroll-mt-24 space-y-8">
          <div className="mb-6 space-y-3">
            <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
              Quickstart: Install Skill in 1 Line
            </h2>
            <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#828282]">
              Run this command in the root of any React / Next.js project to install the skill
              instantly:
            </p>
          </div>

          <div className="relative rounded-2xl border border-zinc-200/80 bg-zinc-950 p-4 font-mono text-sm text-zinc-100 dark:border-white/[0.08]">
            <div className="flex items-center justify-between gap-4">
              <span className="overflow-x-auto text-xs select-all sm:text-sm">{curlCommand}</span>
              <Button
                type="button"
                size="sm"
                variant="bordered"
                color="secondary"
                radius="md"
                onClick={handleCopyCurl}
                className="shrink-0"
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
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Prefer manual file setup?
            </span>
            <Button
              type="button"
              size="sm"
              variant="bordered"
              color="secondary"
              radius="md"
              onClick={handleDownloadSkill}
            >
              {downloadedSkill ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  Downloaded SKILL.md!
                </>
              ) : (
                <>
                  <Download className="h-3.5 w-3.5 opacity-70" />
                  Download SKILL.md directly
                </>
              )}
            </Button>
          </div>
        </section>

        {/* 4. Supported AI Assistants */}
        <section id="supported-assistants" className="scroll-mt-24 space-y-8">
          <div className="mb-6 space-y-3">
            <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
              Configuring Your Model or Assistant
            </h2>
            <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#828282]">
              Select your AI tool below for exact integration steps:
            </p>
          </div>

          {/* Model Switcher Tabs */}
          <Tabs
            size="sm"
            variant="solid"
            radius="md"
            selectedKey={activeAgentTab}
            onSelectionChange={(k) => setActiveAgentTab(k as any)}
          >
            <Tab tabKey="claude" title="Claude Code / CLI" />
            <Tab tabKey="antigravity" title="Google Antigravity" />
            <Tab tabKey="cursor" title="Cursor IDE" />
            <Tab tabKey="windsurf" title="Windsurf Cascade" />
            <Tab tabKey="codex" title="OpenAI Codex / ChatGPT" />
          </Tabs>

          {/* Tab Content: Claude Code */}
          {activeAgentTab === "claude" && (
            <div className="space-y-4 rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-6 dark:border-white/[0.08] dark:bg-[#161618]">
              <h3 className="flex items-center gap-2 text-base font-semibold text-zinc-900 dark:text-white">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100 text-xs font-bold text-zinc-900 dark:bg-white/10 dark:text-white">
                  C
                </span>
                Anthropic Claude Code Configuration
              </h3>
              <p className="text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-300">
                Claude Code automatically detects project instructions in <code>CLAUDE.md</code> or
                agent skills in <code>.agents/skills/</code>.
              </p>
              <div className="space-y-2">
                <span className="text-xs font-semibold tracking-wider text-zinc-500 uppercase sm:text-sm">
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
                <span className="text-xs font-semibold tracking-wider text-zinc-500 uppercase sm:text-sm">
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
            <div className="space-y-4 rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-6 dark:border-white/[0.08] dark:bg-[#161618]">
              <h3 className="flex items-center gap-2 text-base font-semibold text-zinc-900 dark:text-white">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100 text-xs font-bold text-zinc-900 dark:bg-white/10 dark:text-white">
                  A
                </span>
                Google Antigravity Agent Configuration
              </h3>
              <p className="text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-300">
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
            <div className="space-y-4 rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-6 dark:border-white/[0.08] dark:bg-[#161618]">
              <h3 className="flex items-center gap-2 text-base font-semibold text-zinc-900 dark:text-white">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100 text-xs font-bold text-zinc-900 dark:bg-white/10 dark:text-white">
                  CR
                </span>
                Cursor IDE Rules (.cursorrules or .cursor/rules/)
              </h3>
              <p className="text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-300">
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
            <div className="space-y-4 rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-6 dark:border-white/[0.08] dark:bg-[#161618]">
              <h3 className="flex items-center gap-2 text-base font-semibold text-zinc-900 dark:text-white">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100 text-xs font-bold text-zinc-900 dark:bg-white/10 dark:text-white">
                  W
                </span>
                Windsurf (Codeium Cascade) Configuration
              </h3>
              <p className="text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-300">
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
            <div className="space-y-4 rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-6 dark:border-white/[0.08] dark:bg-[#161618]">
              <h3 className="flex items-center gap-2 text-base font-semibold text-zinc-900 dark:text-white">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100 text-xs font-bold text-zinc-900 dark:bg-white/10 dark:text-white">
                  O
                </span>
                OpenAI Codex & ChatGPT Custom Instructions
              </h3>
              <p className="text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-300">
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

        {/* 5. Real Working Prompt Examples (No Halu) */}
        <section id="real-prompts" className="scroll-mt-24 space-y-8">
          <div className="mb-6 space-y-3">
            <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
              Battle-Tested Prompt Examples (Real Works, No Halu)
            </h2>
            <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#828282]">
              These prompts have been verified to generate 100% working, syntax-accurate code with
              all tested models.
            </p>
          </div>

          {/* Prompt 1 */}
          <div className="space-y-4 rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xs dark:border-white/[0.08] dark:bg-[#161618]">
            <div className="flex items-center justify-between">
              <Badge variant="soft" color="secondary" size="sm">
                Prompt 1: Dark Mode SaaS Hero Section
              </Badge>
              <span className="text-xs text-zinc-400 sm:text-sm">
                Tested on Claude 3.5 Sonnet &amp; GPT-4o
              </span>
            </div>

            <div>
              <div className="mb-1.5 text-xs font-semibold tracking-wider text-zinc-500 uppercase sm:text-sm">
                Prompt to give your AI:
              </div>
              <div className="rounded-xl bg-zinc-100 p-4 font-mono text-sm leading-relaxed text-zinc-800 dark:bg-white/[0.04] dark:text-zinc-200">
                "Create an editorial SaaS Hero section using Hudbird UI. Include a clean navigation
                bar, a high-contrast title with SplitTextReveal animation, a descriptive paragraph,
                a KineticButton primary CTA, and a secondary outline Button. Ensure full Obsidian
                #161618 dark mode parity."
              </div>
            </div>

            <div>
              <div className="mb-1.5 text-xs font-semibold tracking-wider text-zinc-500 uppercase sm:text-sm">
                AI Execution &amp; Output (Verified Working Code):
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
  HeroTitle,
  HeroDescription,
  HeroActions,
} from "@/components/hudbird-ui/Hero";
import { KineticButton } from "@/components/hudbird-ui/KineticButton";
import { Button } from "@/components/hudbird-ui/Button";
import { SplitTextReveal } from "@/components/hudbird-ui/SplitTextReveal";
import { ArrowRight } from "lucide-react";

export function SaaSMarketingHero() {
  return (
    <Hero size="full" className="border-b border-zinc-200/80 dark:border-white/[0.08]">
      <HeroHeader
        logo={<span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">Hudbird</span>}
        links={[
          { label: "Components", href: "#components" },
          { label: "Documentation", href: "#docs" },
        ]}
        action={<Button variant="solid" color="primary">Get Started</Button>}
      />
      <HeroBody variant="centered">
        <HeroContent align="center">
          <HeroTitle>
            <SplitTextReveal
              as="h1"
              text="Engineered for software that demands attention"
              className="text-4xl sm:text-6xl font-bold text-zinc-900 dark:text-white tracking-tight"
            />
          </HeroTitle>

          <HeroDescription>
            High-agency UI components with verified CVA variants, hardware-accelerated micro-motion, and local code ownership.
          </HeroDescription>

          <HeroActions>
            <KineticButton variant="primary" size="lg" href="/docs">
              Browse Components
            </KineticButton>
            <Button variant="outline" size="lg" endContent={<ArrowRight className="h-4 w-4" />}>
              Read Specification
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
          <div className="space-y-4 rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xs dark:border-white/[0.08] dark:bg-[#161618]">
            <div className="flex items-center justify-between">
              <Badge variant="soft" color="secondary" size="sm">
                Prompt 2: Asymmetric Bento Feature Showcase
              </Badge>
              <span className="text-xs text-zinc-400 sm:text-sm">
                Tested on Gemini 1.5 Pro &amp; Claude 3.5
              </span>
            </div>

            <div>
              <div className="mb-1.5 text-xs font-semibold tracking-wider text-zinc-500 uppercase sm:text-sm">
                Prompt to give your AI:
              </div>
              <div className="rounded-xl bg-zinc-100 p-4 font-mono text-sm leading-relaxed text-zinc-800 dark:bg-white/[0.04] dark:text-zinc-200">
                "Build an asymmetric feature section using Hudbird UI's BentoGrid and BentoCard
                components. Place a DoubleBezelCard with hairline borders and corner crosshairs
                inside the main 2-column card. Add clean subheadings and Obsidian #161618 dark
                mode."
              </div>
            </div>

            <div>
              <div className="mb-1.5 text-xs font-semibold tracking-wider text-zinc-500 uppercase sm:text-sm">
                AI Execution &amp; Output (Verified Working Code):
              </div>
              <CodeBlock
                language="tsx"
                filename="FeatureBento.tsx"
                code={`import React from "react";
import { BentoGrid, BentoCard, BentoCardContent } from "@/components/hudbird-ui/BentoGrid";
import { DoubleBezelCard } from "@/components/hudbird-ui/DoubleBezelCard";
import { Badge } from "@/components/hudbird-ui/Badge";
import { ShieldCheck, Cpu, Terminal } from "lucide-react";

export function ProductFeatures() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
          System Architecture
        </h2>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Core primitives calibrated for enterprise design systems.
        </p>
      </div>

      <BentoGrid>
        {/* Flagship Highlight Card */}
        <BentoCard className="md:col-span-2">
          <BentoCardContent className="p-4 sm:p-6">
            <DoubleBezelCard
              variant="default"
              showCrosshairs
              isHoverable
              padding="lg"
              className="h-full"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900 dark:bg-white/[0.06] dark:text-white">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-zinc-900 dark:text-white">
                Dual-Tier Architectural Chassis
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Double-bezel aesthetics with SVG alignment crosshairs create optical depth without muddy drop shadows.
              </p>
            </DoubleBezelCard>
          </BentoCardContent>
        </BentoCard>

        {/* Card 2 */}
        <BentoCard>
          <BentoCardContent className="p-6 flex flex-col justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900 dark:bg-white/[0.06] dark:text-white">
              <Terminal className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-zinc-900 dark:text-white">Zero Runtime Lock-In</h4>
              <p className="mt-1 text-sm text-zinc-500">Pure Tailwind CSS with full local ownership.</p>
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
          <div className="space-y-4 rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xs dark:border-white/[0.08] dark:bg-[#161618]">
            <div className="flex items-center justify-between">
              <Badge variant="soft" color="secondary" size="sm">
                Prompt 3: Build &amp; Telemetry Dashboard
              </Badge>
              <span className="text-xs text-zinc-400 sm:text-sm">
                Tested on Claude 3.5 Sonnet &amp; Windsurf
              </span>
            </div>

            <div>
              <div className="mb-1.5 text-xs font-semibold tracking-wider text-zinc-500 uppercase sm:text-sm">
                Prompt to give your AI:
              </div>
              <div className="rounded-xl bg-zinc-100 p-4 font-mono text-sm leading-relaxed text-zinc-800 dark:bg-white/[0.04] dark:text-zinc-200">
                "Build a build and deployment telemetry monitor with Hudbird UI. Display 3 status
                cards using DoubleBezelCard with verified status indicators, an AreaChart showing
                build duration trends, and real-time service health."
              </div>
            </div>

            <div>
              <div className="mb-1.5 text-xs font-semibold tracking-wider text-zinc-500 uppercase sm:text-sm">
                AI Execution &amp; Output (Verified Working Code):
              </div>
              <CodeBlock
                language="tsx"
                filename="BuildTelemetry.tsx"
                code={`import React from "react";
import { DoubleBezelCard } from "@/components/hudbird-ui/DoubleBezelCard";
import { AreaChart } from "@/components/hudbird-ui/AreaChart";
import { Badge } from "@/components/hudbird-ui/Badge";
import { Cpu, Terminal, Activity } from "lucide-react";

const buildTelemetryData = [
  { commit: "c1a2", durationMs: 420 },
  { commit: "f9b3", durationMs: 380 },
  { commit: "8e01", durationMs: 405 },
  { commit: "2d54", durationMs: 350 },
  { commit: "6a90", durationMs: 310 },
];

export function BuildTelemetryOverview() {
  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Build Pipeline", val: "Passing", status: "success" as const, icon: Terminal },
          { label: "Average Duration", val: "350ms", status: "success" as const, icon: Cpu },
          { label: "Bundle Tree-Shaking", val: "100%", status: "success" as const, icon: Activity },
        ].map((item, idx) => (
          <DoubleBezelCard key={idx} variant="default" padding="sm">
            <div className="flex items-center justify-between text-zinc-500">
              <span className="text-xs sm:text-sm font-medium uppercase tracking-wider">{item.label}</span>
              <item.icon className="h-4 w-4" />
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-zinc-900 dark:text-white">{item.val}</span>
              <Badge variant="soft" color={item.status}>{item.val}</Badge>
            </div>
          </DoubleBezelCard>
        ))}
      </div>

      <DoubleBezelCard variant="default" padding="lg">
        <h3 className="text-base font-semibold text-zinc-900 dark:text-white">Build Duration History</h3>
        <p className="text-sm text-zinc-500 mb-4">Compilation time in milliseconds across recent commits</p>
        <AreaChart
          data={buildTelemetryData}
          categories={["durationMs"]}
          index="commit"
          className="h-64 w-full"
        />
      </DoubleBezelCard>
    </div>
  );
}`}
              />
            </div>
          </div>
        </section>

        {/* 6. Full Skill Reference */}
        <section id="full-skill-reference" className="scroll-mt-24 space-y-8">
          <div className="mb-6 space-y-3">
            <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
              Full SKILL.md Reference File
            </h2>
            <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#828282]">
              Download the official skill or preview and copy the full markdown definition loaded by
              AI agents:
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="button"
              size="md"
              color="primary"
              radius="full"
              onClick={handleDownloadSkill}
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
            </Button>

            <Button
              type="button"
              size="md"
              variant="bordered"
              color="secondary"
              radius="full"
              onClick={handleCopySkill}
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
            </Button>

            <div className="ml-auto flex items-center gap-3">
              <a
                href="https://raw.githubusercontent.com/gpamdani-git/Hudbird/main/.agents/skills/hudbird-ui/SKILL.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
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
                className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              >
                <span>Direct Raw</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-zinc-500">
              <span>Preview &amp; Direct Copy:</span>
              <span>
                Project Target:{" "}
                <code className="font-mono text-xs">.agents/skills/hudbird-ui/SKILL.md</code>
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
