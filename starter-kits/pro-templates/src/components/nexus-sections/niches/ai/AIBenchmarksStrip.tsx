// starter-kits/pro-templates/src/components/nexus-sections/niches/ai/AIBenchmarksStrip.tsx
"use client";

import React, { useState } from "react";
import { AICopilotSectionsProps } from "@hudbird/schemas";
import { Award, Zap, Cpu, CheckCircle2, Shield, ArrowUpRight } from "lucide-react";

interface AIBenchmarksStripProps {
  data: AICopilotSectionsProps["benchmarksStrip"];
}

interface BenchmarkRow {
  id: string;
  metric: string;
  description: string;
  nexus: string;
  claude: string;
  gpt: string;
  leadRatio: string;
  nexusBar: number; // percentage
  claudeBar: number;
  gptBar: number;
  advantage: string;
}

const BENCHMARK_ROWS: BenchmarkRow[] = [
  {
    id: "ttft",
    metric: "Time To First Token (TTFT)",
    description: "Cold-request speculative draft verification at the edge",
    nexus: "14ms",
    claude: "78ms",
    gpt: "54ms",
    leadRatio: "3.8x faster",
    nexusBar: 96,
    claudeBar: 32,
    gptBar: 48,
    advantage: "Sub-15ms edge routing",
  },
  {
    id: "swe-bench",
    metric: "SWE-bench Verified Bug Resolution",
    description: "End-to-end multi-file repo patches with micro-VM pass proof",
    nexus: "94.6%",
    claude: "81.2%",
    gpt: "76.4%",
    leadRatio: "+13.4% accuracy",
    nexusBar: 94.6,
    claudeBar: 81.2,
    gptBar: 76.4,
    advantage: "State-of-the-art SWE score",
  },
  {
    id: "throughput",
    metric: "Streaming Concurrency Throughput",
    description: "Continuous batching with FP8 quantized weight matrices",
    nexus: "185 tok/s",
    claude: "52 tok/s",
    gpt: "68 tok/s",
    leadRatio: "2.7x throughput",
    nexusBar: 92,
    claudeBar: 35,
    gptBar: 46,
    advantage: "FP8 speculative engine",
  },
  {
    id: "cache-hit",
    metric: "KV-Cache Prefix Reuse Ratio",
    description: "Multi-tier context caching across repository AST nodes",
    nexus: "84.2%",
    claude: "38.0%",
    gpt: "42.5%",
    leadRatio: "2.2x cache reuse",
    nexusBar: 84.2,
    claudeBar: 38,
    gptBar: 42.5,
    advantage: "AST symbol deduplication",
  },
];

export const AIBenchmarksStrip: React.FC<AIBenchmarksStripProps> = ({ data }) => {
  const [activeRow, setActiveRow] = useState(0);

  return (
    <section
      className="bg-nx-page text-nx-ink border-nx-line/70 relative border-b py-24 sm:py-32"
      id="benchmarks"
    >
      <div className="mx-auto max-w-[1360px] px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="text-nx-muted mb-3 inline-flex items-center gap-2 font-mono text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>Empirical evaluations</span>
              <span>·</span>
              <span>Independent verification</span>
            </div>
            <h2 className="text-nx-ink font-sans text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
              {data.title}
            </h2>
            <p className="text-nx-muted mt-3 text-base font-normal sm:text-lg">
              Evaluated on independent SWE-bench Verified tasks and edge token streaming
              infrastructure against frontier API models.
            </p>
          </div>

          <div className="text-nx-muted flex shrink-0 items-center gap-4 font-mono text-xs">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-emerald-500" />
              <span className="text-nx-ink font-medium">Nexus v4.2</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-zinc-400 dark:bg-zinc-600" />
              <span>Claude 3.5</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-zinc-300 dark:bg-zinc-700" />
              <span>GPT-4o</span>
            </div>
          </div>
        </div>

        {/* 4 Summary Stat Cards */}
        <div className="mb-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {data.metrics.map((metric, idx) => (
            <div
              key={idx}
              className="bg-nx-surface/70 border-nx-line/80 hover:border-nx-line rounded-xl border p-6 shadow-2xs transition-all"
            >
              <div className="text-nx-muted mb-2 font-mono text-xs">{metric.label}</div>
              <div className="text-nx-ink mb-2 font-mono text-3xl font-medium tracking-tight lg:text-4xl">
                {metric.value}
              </div>
              <div className="mb-3 inline-flex items-center gap-1 rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <span>{metric.deltaVsCompetitor}</span>
              </div>
              <p className="text-nx-muted font-sans text-xs leading-relaxed">{metric.subtext}</p>
            </div>
          ))}
        </div>

        {/* Comprehensive Comparative Table */}
        <div className="border-nx-line/80 bg-nx-surface/60 overflow-hidden rounded-2xl border shadow-xs">
          <div className="border-nx-line/70 flex flex-wrap items-center justify-between gap-4 border-b p-6">
            <div>
              <h3 className="text-nx-ink font-sans text-lg font-medium">
                Head-to-head empirical comparison
              </h3>
              <p className="text-nx-muted mt-0.5 font-mono text-xs">
                Hardware: NVIDIA H100 SXM5 80GB · FP8 Speculative Inference · Linux 6.8 Micro-VMs
              </p>
            </div>
            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-medium text-emerald-600 dark:text-emerald-400">
              SWE-bench Verified Leaderboard
            </span>
          </div>

          <div className="divide-nx-line/60 divide-y">
            {BENCHMARK_ROWS.map((row, idx) => (
              <div
                key={row.id}
                onClick={() => setActiveRow(idx)}
                className={`cursor-pointer p-6 transition-colors ${
                  activeRow === idx ? "bg-nx-surface" : "hover:bg-nx-surface/40"
                }`}
              >
                <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
                  {/* Metric Name & Description */}
                  <div className="lg:col-span-4">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="text-nx-ink font-sans text-base font-medium">
                        {row.metric}
                      </span>
                    </div>
                    <p className="text-nx-muted font-sans text-xs leading-relaxed">
                      {row.description}
                    </p>
                  </div>

                  {/* Relative Visual Bars */}
                  <div className="space-y-2 font-mono text-xs lg:col-span-5">
                    {/* Nexus */}
                    <div className="flex items-center gap-3">
                      <span className="w-20 shrink-0 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        Nexus v4.2
                      </span>
                      <div className="bg-nx-page border-nx-line/60 h-3 flex-1 overflow-hidden rounded-full border p-0.5">
                        <div
                          className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                          style={{ width: `${row.nexusBar}%` }}
                        />
                      </div>
                      <span className="w-16 text-right font-bold text-emerald-600 dark:text-emerald-400">
                        {row.nexus}
                      </span>
                    </div>

                    {/* Claude 3.5 */}
                    <div className="flex items-center gap-3">
                      <span className="text-nx-muted w-20 shrink-0 text-xs">Claude 3.5</span>
                      <div className="bg-nx-page border-nx-line/40 h-2 flex-1 overflow-hidden rounded-full border p-0.5">
                        <div
                          className="h-full rounded-full bg-zinc-400 transition-all duration-500 dark:bg-zinc-600"
                          style={{ width: `${row.claudeBar}%` }}
                        />
                      </div>
                      <span className="text-nx-muted w-16 text-right">{row.claude}</span>
                    </div>

                    {/* GPT-4o */}
                    <div className="flex items-center gap-3">
                      <span className="text-nx-muted w-20 shrink-0 text-xs">GPT-4o</span>
                      <div className="bg-nx-page border-nx-line/40 h-2 flex-1 overflow-hidden rounded-full border p-0.5">
                        <div
                          className="h-full rounded-full bg-zinc-300 transition-all duration-500 dark:bg-zinc-700"
                          style={{ width: `${row.gptBar}%` }}
                        />
                      </div>
                      <span className="text-nx-muted w-16 text-right">{row.gpt}</span>
                    </div>
                  </div>

                  {/* Competitive Advantage Callout */}
                  <div className="flex lg:col-span-3 lg:justify-end">
                    <div className="inline-flex flex-col items-start lg:items-end">
                      <span className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">
                        {row.leadRatio}
                      </span>
                      <span className="text-nx-muted font-sans text-xs">{row.advantage}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
