// starter-kits/pro-templates/src/components/nexus-sections/niches/ai/AIWorkflowClustering.tsx
"use client";

import React, { useState } from "react";
import { AICopilotSectionsProps } from "@hudbird/schemas";
import { Terminal, Copy, Check, ArrowRight, CheckCircle2, GitCommit, Shield } from "lucide-react";

interface AIWorkflowClusteringProps {
  data: AICopilotSectionsProps["workflowClustering"];
}

interface StepDetail {
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  codeSnippet: string;
  outputArtifact: string;
  latencySla: string;
}

const EXTENDED_STEPS: StepDetail[] = [
  {
    stepNumber: "01",
    title: "Deep AST Symbol Ingestion",
    subtitle: "Repository Call-Graph Construction",
    description:
      "Our continuous indexing daemon parses full abstract syntax trees, cross-file imports, and type interfaces into an in-memory graph database with sub-millisecond incremental delta synchronization.",
    codeSnippet: `// Phase 01: Ingest repository AST & build symbol vectors
const tree = await copilot.ingest({
  repoPath: "./services/core",
  depth: "exhaustive",
  indexInterfaces: true,
  cachePolicy: "tenant-isolated-vpc"
});
console.log(\`Indexed \${tree.symbolCount} symbols across \${tree.fileCount} files.\`);`,
    outputArtifact: "ast_symbol_mesh.db (142k nodes)",
    latencySla: "<180ms delta sync",
  },
  {
    stepNumber: "02",
    title: "Multi-Agent Speculative Drafting",
    subtitle: "Parallel Plan Synthesis",
    description:
      "Specialized subagents debate implementation plans simultaneously. A small draft model generates candidate tokens at 185 tok/s, verified in parallel against the primary reasoning model.",
    codeSnippet: `// Phase 02: Launch 3-agent speculative consensus loop
const draft = await consensus.debate({
  agents: ["architect", "security_auditor", "perf_profiler"],
  speculativeBatchSize: 8,
  minConsensusScore: 0.98
});
assert(draft.consensusReached === true);`,
    outputArtifact: "verified_patch_v4.diff",
    latencySla: "14ms TTFT",
  },
  {
    stepNumber: "03",
    title: "Micro-VM Formal Verification",
    subtitle: "Automated Sandbox Proof",
    description:
      "Before any code diff is surfaced to the developer, it is compiled and executed in an isolated, firewalled Linux container with zero internet access to guarantee zero regressions.",
    codeSnippet: `// Phase 03: Run formal proof in firewalled ephemeral container
const proof = await sandbox.execute({
  diff: draft.selectedDiff,
  testSuite: "cargo test --workspace --locked",
  firewallPolicy: "strict-zero-egress"
});
assert(proof.exitCode === 0 && proof.cveCount === 0);`,
    outputArtifact: "sandbox_telemetry_receipt.json",
    latencySla: "100% formal pass",
  },
];

export const AIWorkflowClustering: React.FC<AIWorkflowClusteringProps> = ({ data }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [copied, setCopied] = useState(false);

  const current = EXTENDED_STEPS[activeStep];

  const handleCopy = () => {
    navigator.clipboard.writeText(current.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      className="bg-nx-page text-nx-ink border-nx-line/70 relative border-b py-24 sm:py-32"
      id="pipeline"
    >
      <div className="mx-auto max-w-[1360px] px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 max-w-2xl">
          <div className="text-nx-muted mb-3 inline-flex items-center gap-2 font-mono text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>Workflow pipeline</span>
          </div>
          <h2 className="text-nx-ink mb-4 font-sans text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
            {data.headline}
          </h2>
          <p className="text-nx-muted text-base leading-relaxed font-normal sm:text-lg">
            {data.description}
          </p>
        </div>

        {/* 3 Steps Interactive Tabs */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {EXTENDED_STEPS.map((step, idx) => (
            <button
              key={step.stepNumber}
              onClick={() => setActiveStep(idx)}
              className={`cursor-pointer rounded-xl border p-6 text-left transition-all ${
                activeStep === idx
                  ? "bg-nx-surface border-emerald-500/80 shadow-xs ring-1 ring-emerald-500/20"
                  : "bg-nx-surface/40 border-nx-line/70 hover:bg-nx-surface/80"
              }`}
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  Phase {step.stepNumber}
                </span>
                <span className="border-nx-line/60 text-nx-muted rounded border px-2 py-0.5 font-mono text-[11px]">
                  {step.latencySla}
                </span>
              </div>
              <h3 className="text-nx-ink mb-1 font-sans text-base font-medium">{step.title}</h3>
              <p className="text-nx-muted truncate font-mono text-xs">{step.subtitle}</p>
            </button>
          ))}
        </div>

        {/* Active Phase Canvas */}
        <div className="border-nx-line/80 bg-nx-surface/70 rounded-2xl border p-7 shadow-xs sm:p-10">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
            {/* Left: Phase Explainer */}
            <div className="space-y-4 lg:col-span-5">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                <span>Phase {current.stepNumber} Execution Plan</span>
              </div>

              <h3 className="text-nx-ink font-sans text-2xl font-medium tracking-tight sm:text-3xl">
                {current.title}
              </h3>

              <div className="text-nx-muted font-mono text-xs">{current.subtitle}</div>

              <p className="text-nx-muted text-sm leading-relaxed font-normal sm:text-base">
                {current.description}
              </p>

              <div className="border-nx-line/60 space-y-2 border-t pt-6 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-nx-muted">Generated Artifact:</span>
                  <span className="text-nx-ink font-medium">{current.outputArtifact}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-nx-muted">Verification SLA:</span>
                  <span className="font-medium text-emerald-600 dark:text-emerald-400">
                    {current.latencySla}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Real Code Pipeline Runner */}
            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-xl border border-zinc-800 bg-[#0d0f16] text-zinc-300 shadow-md">
                <div className="flex items-center justify-between border-b border-zinc-800 bg-[#090b10] px-4 py-2.5 font-mono text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    <Terminal className="h-3.5 w-3.5 text-emerald-400" />
                    <span>pipeline_runner_{current.stepNumber}.ts</span>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="cursor-pointer rounded p-1 text-zinc-400 transition-colors hover:text-zinc-200"
                    title="Copy code"
                  >
                    {copied ? (
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>

                <div className="overflow-x-auto p-5 font-mono text-xs leading-relaxed text-zinc-200 sm:text-[13px]">
                  <pre className="whitespace-pre">
                    <code>{current.codeSnippet}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
