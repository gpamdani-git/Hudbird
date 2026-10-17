// starter-kits/pro-templates/src/components/nexus-sections/niches/ai/AICapabilitiesBento.tsx
"use client";

import React, { useState } from "react";
import { AICopilotSectionsProps } from "@hudbird/schemas";
import {
  Network,
  Zap,
  ShieldCheck,
  Cpu,
  Check,
  Terminal,
  Play,
  Server,
  ArrowRight,
} from "lucide-react";

interface AICapabilitiesBentoProps {
  data: AICopilotSectionsProps["capabilitiesBento"];
}

export const AICapabilitiesBento: React.FC<AICapabilitiesBentoProps> = ({ data }) => {
  const [activeAstNode, setActiveAstNode] = useState<string>("symbols");
  const [vmRunning, setVmRunning] = useState<boolean>(false);
  const [vmLogs, setVmLogs] = useState<string[]>([
    "micro-vm: firecracker init (isolated namespace)",
    "sandbox: mounted ephemeral /workspace overlay",
    "compiler: cargo test --workspace (0 CVEs detected)",
    "verdict: formal verification passed (0.14s)",
  ]);

  const handleRunVmProof = () => {
    setVmRunning(true);
    setVmLogs(["micro-vm: bootstrapping ephemeral container..."]);
    setTimeout(() => {
      setVmLogs((prev) => [...prev, "sandbox: inspecting AST memory boundaries..."]);
    }, 400);
    setTimeout(() => {
      setVmLogs((prev) => [...prev, "compiler: formal attestation check 100% OK"]);
      setVmRunning(false);
    }, 900);
  };

  return (
    <section
      className="bg-nx-page text-nx-ink border-nx-line/70 relative border-b py-24 sm:py-32"
      id="capabilities"
    >
      <div className="mx-auto max-w-[1360px] px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 max-w-2xl">
          <div className="text-nx-muted mb-3 inline-flex items-center gap-2 font-mono text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>Architecture & Capabilities</span>
          </div>
          <h2 className="text-nx-ink mb-4 font-sans text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
            {data.headline}
          </h2>
          <p className="text-nx-muted text-base leading-relaxed font-normal sm:text-lg">
            {data.description}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Bento Card 1: Autonomous Graph RAG (8 cols) */}
          <div className="bg-nx-surface/80 border-nx-line/80 hover:border-nx-line flex flex-col justify-between rounded-2xl border p-7 shadow-2xs transition-all sm:p-9 lg:col-span-8">
            <div>
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2.5 font-mono text-xs text-emerald-600 dark:text-emerald-400">
                  <Network className="h-4 w-4" />
                  <span>Deep AST Ingestion</span>
                </div>
                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                  142k symbols indexed
                </span>
              </div>

              <h3 className="text-nx-ink mb-3 font-sans text-2xl font-medium tracking-tight">
                Autonomous Graph RAG & Recursive Call Trees
              </h3>
              <p className="text-nx-muted mb-8 max-w-2xl text-sm leading-relaxed sm:text-base">
                Constructs live AST call graphs across millions of lines of code. Understands
                cross-file imports, interface contracts, and monorepo boundaries with
                sub-millisecond incremental synchronization.
              </p>
            </div>

            {/* Interactive Visualizer */}
            <div className="border-nx-line/80 bg-nx-page rounded-xl border p-5">
              <div className="border-nx-line/60 mb-4 flex flex-wrap items-center justify-between gap-3 border-b pb-3 font-mono text-xs">
                <span className="text-nx-muted">Repository Call-Graph Explorer</span>
                <div className="flex items-center gap-1.5">
                  {["symbols", "contracts", "resolvers"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveAstNode(tab)}
                      className={`cursor-pointer rounded px-2.5 py-1 text-xs capitalize transition-colors ${
                        activeAstNode === tab
                          ? "bg-nx-ink text-nx-page font-medium"
                          : "text-nx-muted hover:text-nx-ink"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 font-mono text-xs sm:grid-cols-3">
                <div className="border-nx-line/60 bg-nx-surface/60 rounded-lg border p-3.5">
                  <div className="text-nx-muted mb-1 text-[11px]">AST Parser</div>
                  <div className="text-nx-ink font-semibold">142,800 Nodes</div>
                  <div className="mt-1.5 text-[11px] text-emerald-600 dark:text-emerald-400">
                    Delta Sync &lt; 8ms
                  </div>
                </div>

                <div className="border-nx-line/60 bg-nx-surface/60 rounded-lg border p-3.5">
                  <div className="text-nx-muted mb-1 text-[11px]">Vector Index</div>
                  <div className="text-nx-ink font-semibold">Hierarchical HNSW</div>
                  <div className="mt-1.5 text-[11px] text-teal-600 dark:text-teal-400">
                    84.2% Cache Hit
                  </div>
                </div>

                <div className="border-nx-line/60 bg-nx-surface/60 rounded-lg border p-3.5">
                  <div className="text-nx-muted mb-1 text-[11px]">Type Checker</div>
                  <div className="text-nx-ink font-semibold">Consensus VM</div>
                  <div className="mt-1.5 text-[11px] text-purple-600 dark:text-purple-400">
                    0 Type Errors
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Speculative Stream (4 cols) */}
          <div className="bg-nx-surface/80 border-nx-line/80 hover:border-nx-line flex flex-col justify-between rounded-2xl border p-7 shadow-2xs transition-all sm:p-9 lg:col-span-4">
            <div>
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs text-amber-500">
                  <Zap className="h-4 w-4" />
                  <span>Speculative Stream</span>
                </div>
                <span className="text-nx-muted font-mono text-[11px]">H100 Cluster</span>
              </div>

              <h3 className="text-nx-ink mb-3 font-sans text-xl font-medium tracking-tight sm:text-2xl">
                Sub-15ms Speculative Inference
              </h3>
              <p className="text-nx-muted mb-6 text-sm leading-relaxed">
                Parallel draft model verification delivers continuous token streaming speed without
                syntax truncations or context drops.
              </p>
            </div>

            <div className="border-nx-line/80 bg-nx-page rounded-xl border p-5 text-center font-mono">
              <div className="text-nx-ink mb-1 text-3xl font-medium">
                185 <span className="text-nx-muted text-xs">tok/s</span>
              </div>
              <div className="mb-3 text-xs text-emerald-600 dark:text-emerald-400">
                +82% Token Reuse Ratio
              </div>
              <div className="bg-nx-surface border-nx-line/60 h-2 w-full overflow-hidden rounded-full border p-0.5">
                <div className="h-full w-[88%] rounded-full bg-emerald-500" />
              </div>
            </div>
          </div>

          {/* Bento Card 3: Micro-VM Sandboxes (5 cols) */}
          <div className="bg-nx-surface/80 border-nx-line/80 hover:border-nx-line flex flex-col justify-between rounded-2xl border p-7 shadow-2xs transition-all sm:p-9 lg:col-span-5">
            <div>
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Zero-Trust Sandbox</span>
                </div>
                <button
                  onClick={handleRunVmProof}
                  disabled={vmRunning}
                  className="bg-nx-ink text-nx-page flex cursor-pointer items-center gap-1 rounded px-2.5 py-1 font-mono text-xs hover:opacity-90 disabled:opacity-50"
                >
                  <Play className="h-3 w-3 fill-current" />
                  <span>Test Proof</span>
                </button>
              </div>

              <h3 className="text-nx-ink mb-3 font-sans text-xl font-medium tracking-tight sm:text-2xl">
                Micro-VM Sandboxed Proofs
              </h3>
              <p className="text-nx-muted mb-6 text-sm leading-relaxed">
                Every suggested patch compiles and runs in an isolated, firewalled Linux container
                with zero outbound internet access.
              </p>
            </div>

            <div className="border-nx-line/80 bg-nx-page rounded-xl border p-4 font-mono text-xs">
              <div className="border-nx-line/40 mb-2 flex items-center gap-1.5 border-b pb-2 text-zinc-500">
                <Terminal className="h-3.5 w-3.5 text-emerald-500" />
                <span>firecracker-vm-proof.log</span>
              </div>
              <div className="text-nx-ink/80 space-y-1 text-[11px]">
                {vmLogs.map((log, lIdx) => (
                  <div key={lIdx} className="flex items-center gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400">›</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bento Card 4: Multi-Agent Consensus Swarm (7 cols) */}
          <div className="bg-nx-surface/80 border-nx-line/80 hover:border-nx-line flex flex-col justify-between rounded-2xl border p-7 shadow-2xs transition-all sm:p-9 lg:col-span-7">
            <div>
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs text-purple-600 dark:text-purple-400">
                  <Cpu className="h-4 w-4" />
                  <span>Multi-Agent Swarm</span>
                </div>
                <span className="rounded border border-purple-500/20 bg-purple-500/10 px-2 py-0.5 font-mono text-[11px] font-medium text-purple-600 dark:text-purple-400">
                  3 Autonomous Reviewers
                </span>
              </div>

              <h3 className="text-nx-ink mb-3 font-sans text-xl font-medium tracking-tight sm:text-2xl">
                Multi-Agent Consensus Swarm
              </h3>
              <p className="text-nx-muted mb-6 text-sm leading-relaxed">
                Three autonomous domain specialists debate code diffs in parallel: Principal
                Architect, Security Auditor, and Performance Profiler. Only diffs with &gt;98%
                consensus are offered.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 font-mono text-xs sm:grid-cols-3">
              <div className="border-nx-line/60 bg-nx-page rounded-lg border p-3.5">
                <div className="text-nx-muted mb-1 text-[11px]">Architect</div>
                <div className="text-nx-ink font-semibold">Interface Valid</div>
                <div className="mt-1 text-[11px] text-emerald-600 dark:text-emerald-400">
                  98% Consensus
                </div>
              </div>

              <div className="border-nx-line/60 bg-nx-page rounded-lg border p-3.5">
                <div className="text-nx-muted mb-1 text-[11px]">Security Guard</div>
                <div className="text-nx-ink font-semibold">Zero CVEs</div>
                <div className="mt-1 text-[11px] text-emerald-600 dark:text-emerald-400">
                  Constant-Time OK
                </div>
              </div>

              <div className="border-nx-line/60 bg-nx-page rounded-lg border p-3.5">
                <div className="text-nx-muted mb-1 text-[11px]">Profiler</div>
                <div className="text-nx-ink font-semibold">-34% Allocations</div>
                <div className="mt-1 text-[11px] text-emerald-600 dark:text-emerald-400">
                  Zero Leaks
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
