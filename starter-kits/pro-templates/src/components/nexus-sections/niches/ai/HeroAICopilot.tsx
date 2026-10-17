// starter-kits/pro-templates/src/components/nexus-sections/niches/ai/HeroAICopilot.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  Terminal,
  Sparkles,
  Cpu,
  Play,
  CheckCircle2,
  Copy,
  Check,
  Zap,
  ShieldCheck,
  ArrowRight,
  CornerDownLeft,
  GitBranch,
  Layers,
} from "lucide-react";
import { AICopilotSectionsProps, HeroAgencyProps } from "@hudbird/schemas";
import { PillLink } from "../../ScrollReveal";

interface HeroAICopilotProps {
  data: AICopilotSectionsProps["heroAi"];
  fallbackHero: HeroAgencyProps;
}

interface ProgramDiffLine {
  type: "context" | "addition" | "deletion";
  content: string;
}

interface PresetProgram {
  id: string;
  name: string;
  filename: string;
  lang: string;
  prompt: string;
  ttft: string;
  throughput: string;
  verificationStatus: string;
  lines: ProgramDiffLine[];
}

const PRESET_PROGRAMS: PresetProgram[] = [
  {
    id: "ebpf",
    name: "eBPF Kernel Probe",
    filename: "ebpf_probe.go",
    lang: "go",
    prompt: "Synthesize distributed eBPF tracing hook with Ring 0 memory safety verification",
    ttft: "14ms",
    throughput: "185 tok/s",
    verificationStatus: "Verified · 0 out-of-bounds syscalls",
    lines: [
      { type: "context", content: "package telemetry" },
      { type: "context", content: "" },
      { type: "context", content: "import (" },
      { type: "context", content: '    "context"' },
      { type: "context", content: '    "github.com/cilium/ebpf"' },
      { type: "context", content: ")" },
      { type: "context", content: "" },
      { type: "deletion", content: "- func AttachTracepoint(pid uint32) error {" },
      { type: "deletion", content: "-     // Unchecked syscall filter may trigger kernel panic" },
      {
        type: "addition",
        content:
          "+ // Formally verified: Ring 0 memory bounds verified via abstract interpretation",
      },
      {
        type: "addition",
        content: "+ func AttachTracepoint(ctx context.Context, pid uint32) (*SocketProbe, error) {",
      },
      { type: "addition", content: '+     spec, err := loadKernelSpec("trace_sys_enter_connect")' },
      { type: "addition", content: "+     if err != nil {" },
      { type: "addition", content: "+         return nil, err" },
      { type: "addition", content: "+     }" },
      {
        type: "addition",
        content: '+     prog, err := ebpf.NewProgram(spec.Programs["trace_exec"])',
      },
      { type: "addition", content: "+     return &SocketProbe{filter: prog, latencyNs: 120}, nil" },
      { type: "context", content: "}" },
    ],
  },
  {
    id: "tailwind",
    name: "Tailwind v4 Tokens",
    filename: "theme_engine.css",
    lang: "css",
    prompt: "Migrate legacy Tailwind v3 config to native CSS @theme with OKLCH dynamic contrast",
    ttft: "12ms",
    throughput: "194 tok/s",
    verificationStatus: "Verified · W3C CSS4 conforming",
    lines: [
      { type: "deletion", content: "- // tailwind.config.js (deprecated JS runtime overhead)" },
      {
        type: "deletion",
        content: "- module.exports = { theme: { extend: { colors: { brand: '#10b981' } } } };",
      },
      { type: "addition", content: "+ /* Native Tailwind v4 OKLCH token engine */" },
      { type: "addition", content: "+ @theme {" },
      { type: "addition", content: "+   --color-brand-primary: oklch(0.68 0.19 162.4);" },
      { type: "addition", content: "+   --color-brand-accent: oklch(0.82 0.16 164.2);" },
      { type: "addition", content: "+   --color-nx-page: oklch(0.12 0.01 240.0);" },
      { type: "addition", content: "+   --color-nx-surface: oklch(0.16 0.01 240.0);" },
      { type: "addition", content: "+   --font-mono: 'JetBrains Mono', monospace;" },
      { type: "addition", content: "+ }" },
      { type: "context", content: "" },
      { type: "context", content: "@utility .matrix-glow {" },
      { type: "addition", content: "+   box-shadow: 0 0 40px -10px var(--color-brand-primary);" },
      { type: "addition", content: "+   backdrop-filter: blur(16px);" },
      { type: "context", content: "}" },
    ],
  },
  {
    id: "postgres",
    name: "Postgres Index Plan",
    filename: "telemetry_idx.sql",
    lang: "sql",
    prompt: "Eliminate sequential table scans on 40M-row telemetry partition via composite index",
    ttft: "16ms",
    throughput: "178 tok/s",
    verificationStatus: "Verified · Query cost reduced from 14,290 to 3.12",
    lines: [
      {
        type: "deletion",
        content: "- -- EXPLAIN: Seq Scan on telemetry_events (cost=0.00..14290.45 rows=42100)",
      },
      {
        type: "deletion",
        content: "- SELECT tenant_id, avg(latency_ns) FROM telemetry_events WHERE status >= 400;",
      },
      { type: "addition", content: "+ -- High-concurrency composite partial index" },
      { type: "addition", content: "+ CREATE INDEX CONCURRENTLY idx_telemetry_event_tenant" },
      { type: "addition", content: "+ ON telemetry_events (tenant_id, timestamp DESC)" },
      { type: "addition", content: "+ INCLUDE (latency_ns, status_code)" },
      { type: "addition", content: "+ WHERE status_code >= 400;" },
      { type: "context", content: "" },
      {
        type: "addition",
        content: "+ -- EXPLAIN (ANALYZE): Index Only Scan (cost=0.04..3.12 rows=14)",
      },
      { type: "context", content: "SELECT tenant_id, avg(latency_ns)" },
      { type: "context", content: "FROM telemetry_events" },
      {
        type: "context",
        content: "WHERE tenant_id = $1 AND timestamp >= now() - INTERVAL '1 hour';",
      },
    ],
  },
  {
    id: "auth",
    name: "OAuth PKCE Guard",
    filename: "pkce_session.ts",
    lang: "typescript",
    prompt:
      "Replace vulnerable string equality with timing-attack resistant cryptographic attestation",
    ttft: "13ms",
    throughput: "189 tok/s",
    verificationStatus: "Verified · Timing-attack invulnerable (Constant-Time)",
    lines: [
      { type: "context", content: 'import { timingSafeEqual } from "node:crypto";' },
      { type: "context", content: "" },
      {
        type: "deletion",
        content:
          "- // Insecure naive string comparison is vulnerable to side-channel timing attacks",
      },
      { type: "deletion", content: "- if (clientVerifier === session.codeChallenge) return true;" },
      { type: "addition", content: "+ // Timing attack resistant cryptographic attestation" },
      {
        type: "addition",
        content:
          '+ const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier));',
      },
      { type: "addition", content: '+ const challenge = Buffer.from(hash).toString("base64url");' },
      { type: "addition", content: "+ return timingSafeEqual(" },
      { type: "addition", content: '+   Buffer.from(challenge, "utf-8"),' },
      { type: "addition", content: '+   Buffer.from(session.codeChallenge, "utf-8")' },
      { type: "addition", content: "+ );" },
    ],
  },
];

export const HeroAICopilot: React.FC<HeroAICopilotProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [visibleLineCount, setVisibleLineCount] = useState<number>(PRESET_PROGRAMS[0].lines.length);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");

  const activeProg = PRESET_PROGRAMS[activeTab];

  const handleSelectTab = (idx: number) => {
    setActiveTab(idx);
    setIsSynthesizing(true);
    setVisibleLineCount(3);

    const totalLines = PRESET_PROGRAMS[idx].lines.length;
    let current = 3;
    const interval = setInterval(() => {
      current += 1;
      setVisibleLineCount(current);
      if (current >= totalLines) {
        clearInterval(interval);
        setIsSynthesizing(false);
      }
    }, 60);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPrompt.trim()) return;
    const matchedIdx = customPrompt.length % PRESET_PROGRAMS.length;
    handleSelectTab(matchedIdx);
    setCustomPrompt("");
  };

  const handleCopyCode = () => {
    const rawText = activeProg.lines
      .map((l) => (l.type === "deletion" ? "" : l.content.replace(/^\+ /, "")))
      .filter(Boolean)
      .join("\n");
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Compose title naturally without gimmick italic tags
  const heroTitle =
    `${data.headline.preText} ${data.headline.highlightWord} ${data.headline.postText}`
      .replace(/\s+/g, " ")
      .trim();

  return (
    <section className="bg-nx-page text-nx-ink border-nx-line/70 relative overflow-hidden border-b pt-28 pb-16 md:pt-32 md:pb-20">
      {/* Subtle Ambient Engineering Glow - Soft, disciplined blur */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 right-1/4 h-[450px] w-[700px] -translate-y-1/2 rounded-full opacity-15 blur-[140px] dark:opacity-20"
        style={{ background: "radial-gradient(circle, #10B981 0%, transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto max-w-[1360px] px-6 lg:px-12">
        {/* Asymmetric 2-Column Grid */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Authoritative Editorial Narrative & CTA */}
          <div className="text-left lg:col-span-5">
            {/* Disciplined, quiet kicker */}
            <div className="border-nx-line/80 bg-nx-surface/80 text-nx-ink mb-6 inline-flex items-center gap-2.5 rounded-md border px-3 py-1 font-mono text-xs shadow-2xs">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              <span className="font-medium">{data.taglineBadge.label}</span>
              <span className="text-nx-muted">·</span>
              <span className="text-nx-muted text-[11px]">v4.2 Speculative</span>
            </div>

            {/* Bold, commanding, human headline */}
            <h1 className="text-nx-ink mb-6 font-sans text-4xl leading-[1.08] font-medium tracking-tight sm:text-5xl lg:text-[3.5rem]">
              {heroTitle}
            </h1>

            {/* Clear, technical explanation of value */}
            <p className="text-nx-muted mb-8 max-w-xl text-base leading-relaxed font-normal sm:text-lg">
              {data.description}
            </p>

            {/* Primary Action Buttons */}
            <div className="mb-8 flex flex-wrap items-center gap-3.5">
              <PillLink href={data.primaryCta.href} variant="primary">
                <span className="flex items-center gap-2">
                  <span>{data.primaryCta.label}</span>
                  <span className="hidden rounded bg-black/20 px-1.5 py-0.5 font-mono text-[10px] opacity-60 sm:inline-block dark:bg-white/20">
                    ⌘K
                  </span>
                </span>
              </PillLink>

              <PillLink href={data.secondaryCta.href} variant="outline">
                <span className="flex items-center gap-1.5">
                  <span>{data.secondaryCta.label}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </PillLink>
            </div>

            {/* Empirical Grounding Metrics Strip */}
            <div className="border-nx-line/70 grid grid-cols-3 gap-6 border-t pt-6">
              <div>
                <div className="text-nx-ink font-mono text-2xl font-medium tracking-tight lg:text-3xl">
                  14ms
                </div>
                <div className="text-nx-muted mt-0.5 font-sans text-xs">Median TTFT</div>
              </div>

              <div>
                <div className="font-mono text-2xl font-medium tracking-tight text-emerald-600 lg:text-3xl dark:text-emerald-400">
                  94.6%
                </div>
                <div className="text-nx-muted mt-0.5 font-sans text-xs">SWE-bench Verified</div>
              </div>

              <div>
                <div className="text-nx-ink font-mono text-2xl font-medium tracking-tight lg:text-3xl">
                  Zero
                </div>
                <div className="text-nx-muted mt-0.5 font-sans text-xs">Memory Violations</div>
              </div>
            </div>
          </div>

          {/* Right Column: Real Developer Workspace Canvas (Linear/Cursor-Grade) */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-zinc-800/90 bg-[#0e1017] text-zinc-300 shadow-2xl ring-1 ring-white/5">
              {/* Window Chrome & Header */}
              <div className="flex items-center justify-between border-b border-zinc-800/80 bg-[#0a0c12] px-4 py-3 select-none">
                <div className="flex items-center gap-2.5">
                  {/* Traffic lights */}
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-700/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-700/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-700/80" />
                  </div>

                  <div className="mx-1 h-3 w-px bg-zinc-800" />

                  {/* Active file breadcrumbs */}
                  <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-400">
                    <GitBranch className="h-3.5 w-3.5 text-emerald-400" />
                    <span>main</span>
                    <span className="text-zinc-600">›</span>
                    <span className="font-medium text-zinc-200">{activeProg.filename}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="hidden items-center gap-1.5 rounded border border-zinc-700/50 bg-zinc-800/60 px-2 py-0.5 font-mono text-[11px] text-zinc-400 sm:flex">
                    <Zap className="h-3 w-3 text-amber-400" />
                    <span>{activeProg.throughput}</span>
                  </div>

                  <button
                    onClick={handleCopyCode}
                    className="rounded p-1 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
                    title="Copy verified code"
                  >
                    {copied ? (
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Tab Bar: File Exploration */}
              <div className="flex items-center overflow-x-auto border-b border-zinc-800/70 bg-[#090b10] px-2 font-mono text-xs">
                {PRESET_PROGRAMS.map((prog, idx) => (
                  <button
                    key={prog.id}
                    onClick={() => handleSelectTab(idx)}
                    className={`flex cursor-pointer items-center gap-2 border-b-2 px-3.5 py-2 whitespace-nowrap transition-all ${
                      activeTab === idx
                        ? "border-emerald-500 bg-[#0e1017] font-medium text-zinc-100"
                        : "border-transparent text-zinc-500 hover:bg-zinc-900/40 hover:text-zinc-300"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${activeTab === idx ? "bg-emerald-400" : "bg-zinc-600"}`}
                    />
                    <span>{prog.filename}</span>
                  </button>
                ))}
              </div>

              {/* Code Diff Canvas */}
              <div className="max-h-[380px] min-h-[300px] overflow-x-auto bg-[#0e1017] p-4 font-mono text-xs leading-relaxed sm:p-5 sm:text-[13px]">
                <div className="space-y-0.5">
                  {activeProg.lines.slice(0, visibleLineCount).map((line, idx) => {
                    const isAddition = line.type === "addition";
                    const isDeletion = line.type === "deletion";

                    return (
                      <div
                        key={idx}
                        className={`flex items-start rounded px-2 py-0.5 transition-colors ${
                          isAddition
                            ? "bg-emerald-500/15 font-medium text-emerald-300"
                            : isDeletion
                              ? "bg-rose-500/15 text-rose-400 opacity-80"
                              : "text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        <span className="w-7 pr-3 text-right font-mono text-[11px] text-zinc-600 select-none">
                          {idx + 1}
                        </span>
                        <span className="pr-2 font-mono text-[11px] opacity-70 select-none">
                          {isAddition ? "+" : isDeletion ? "-" : " "}
                        </span>
                        <span className="flex-1 whitespace-pre">
                          {line.content.replace(/^[-+] /, "")}
                        </span>
                      </div>
                    );
                  })}

                  {isSynthesizing && (
                    <div className="flex animate-pulse items-center gap-2 px-2 py-1 font-mono text-xs text-emerald-400">
                      <span className="inline-block h-3 w-1.5 animate-ping bg-emerald-400" />
                      <span>Synthesizing speculative AST tokens ({activeProg.throughput})...</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Floating Inline Copilot Prompt Bar */}
              <div className="border-t border-zinc-800/80 bg-[#090b10] p-3.5">
                <form
                  onSubmit={handleCustomSubmit}
                  className="relative mb-2.5 flex items-center gap-2"
                >
                  <div className="relative flex flex-1 items-center rounded-lg border border-zinc-700/60 bg-[#141722] transition-all focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500">
                    <div className="pr-2 pl-3 text-emerald-400">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <input
                      type="text"
                      value={customPrompt}
                      onChange={(e) => setCustomPrompt(e.target.value)}
                      placeholder={activeProg.prompt}
                      className="w-full bg-transparent py-2 font-mono text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={isSynthesizing}
                      className="m-1 flex cursor-pointer items-center gap-1 rounded bg-emerald-500 px-3 py-1 font-mono text-xs text-white transition-colors hover:bg-emerald-600 disabled:opacity-50"
                    >
                      <Play className="h-2.5 w-2.5 fill-current" />
                      <span>Run</span>
                    </button>
                  </div>
                </form>

                {/* Status Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1 font-mono text-[11px] text-zinc-500">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>{activeProg.verificationStatus}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400">
                    <span>
                      TTFT: <strong className="text-zinc-200">{activeProg.ttft}</strong>
                    </span>
                    <span className="text-zinc-700">|</span>
                    <span className="text-zinc-400">FP8 Quantized</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
