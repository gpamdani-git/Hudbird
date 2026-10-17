// starter-kits/pro-templates/src/components/nexus-sections/inner-pages/CareersBoardView.tsx
"use client";

import React, { useState } from "react";
import { Reveal, PillLink } from "../ScrollReveal";
import { Check, MapPin, Sparkles, Globe, HeartHandshake, Zap } from "lucide-react";
import { PEXELS } from "../HudbirdVisualWidgets";
import { HB, HbSection, HbHeader, HbImage } from "../HudbirdKit";

interface JobRole {
  id: string;
  title: string;
  department: string;
  departmentLabel: string;
  location: string;
  type: string;
  compensation: string;
  equity: string;
  description: string;
  requirements: string[];
}

const NICHE_CAREERS: Record<string, JobRole[]> = {
  "fintech-protocol": [
    {
      id: "solidity-rust-architect",
      title: "Senior Solidity & Rust Protocol Architect",
      department: "smart-contracts",
      departmentLabel: "Smart Contracts",
      location: "Remote · Zurich",
      type: "Full-Time",
      compensation: "$190k – $240k",
      equity: "0.40% – 0.85%",
      description:
        "Architect and formally verify non-custodial ERC-4626 treasury vaults and cross-chain settlement bridges.",
      requirements: [
        "Solidity, Foundry & Rust on EVM/SVM",
        "$100M+ verified TVL experience",
        "Certora formal verification proofs",
      ],
    },
    {
      id: "quant-treasury-risk",
      title: "Quantitative Risk & Treasury Modeler",
      department: "quantitative",
      departmentLabel: "Quant Strategy",
      location: "Remote · Singapore",
      type: "Full-Time",
      compensation: "$175k – $220k",
      equity: "0.35% – 0.70%",
      description:
        "Build volatility simulation harnesses, concentrated AMM curves, and automated rebalancing engines.",
      requirements: [
        "Stochastic calculus & risk modeling",
        "Python, NumPy & on-chain indexing",
        "AMM invariants & liquidity routing",
      ],
    },
    {
      id: "formal-verification-lead",
      title: "Cryptographic Security & Audit Lead",
      department: "security",
      departmentLabel: "Security",
      location: "Remote · Berlin",
      type: "Full-Time",
      compensation: "$180k – $230k",
      equity: "0.30% – 0.65%",
      description:
        "Design mathematical proof harnesses and invariant fuzzers across all institutional vault releases.",
      requirements: [
        "Certora Prover & Foundry fuzzing",
        "Smart contract audit track record",
        "Hardware MPC & multi-sig policies",
      ],
    },
  ],
  "ai-copilot": [
    {
      id: "llm-inference-engineer",
      title: "Staff LLM Inference & Kernel Engineer",
      department: "ml-systems",
      departmentLabel: "ML Systems",
      location: "Remote · San Francisco",
      type: "Full-Time",
      compensation: "$185k – $235k",
      equity: "0.35% – 0.75%",
      description:
        "Optimize high-throughput vLLM serving engines, custom Triton GPU kernels, and sub-20ms streaming pipelines.",
      requirements: [
        "PyTorch, CUDA, Triton & vLLM",
        "Multi-GPU sharding on H100 clusters",
        "KV-cache & memory optimization",
      ],
    },
    {
      id: "agent-graph-architect",
      title: "Autonomous Agent & Evaluation Architect",
      department: "ai-research",
      departmentLabel: "Agent Systems",
      location: "Remote · Toronto",
      type: "Full-Time",
      compensation: "$175k – $220k",
      equity: "0.30% – 0.65%",
      description:
        "Design multi-agent orchestration pipelines, deterministic tool schemas, and real-time evaluation guardrails.",
      requirements: [
        "Production multi-agent orchestration",
        "Deterministic tool-calling schemas",
        "Automated evals & safety guardrails",
      ],
    },
    {
      id: "ai-ui-streaming-lead",
      title: "Lead AI Interface & Motion Engineer",
      department: "frontend",
      departmentLabel: "Frontend",
      location: "Remote · New York",
      type: "Full-Time",
      compensation: "$160k – $205k",
      equity: "0.25% – 0.55%",
      description:
        "Build fluid 60fps streaming browser surfaces with interactive code sandboxes and zero layout shift.",
      requirements: [
        "React 19, TypeScript & streaming SSE",
        "Zero-CLS live token rendering",
        "Framer Motion & tactile UI craft",
      ],
    },
  ],
  "alunara-wellness": [
    {
      id: "botanical-chemist",
      title: "Senior Botanical Formulation Chemist",
      department: "formulation",
      departmentLabel: "Formulation Lab",
      location: "Grasse · Hybrid",
      type: "Full-Time",
      compensation: "$145k – $180k",
      equity: "0.25% – 0.50%",
      description:
        "Lead supercritical CO2 botanical extraction and clinical longevity formulations in our Grasse atelier.",
      requirements: [
        "Clean botanical & lipid chemistry",
        "Bio-Suisse & ECOCERT standards",
        "Clinical dermal efficacy testing",
      ],
    },
    {
      id: "luxury-art-director",
      title: "Senior Brand & Packaging Art Director",
      department: "design",
      departmentLabel: "Creative Atelier",
      location: "Kyoto · Remote",
      type: "Full-Time",
      compensation: "$140k – $175k",
      equity: "0.20% – 0.45%",
      description:
        "Craft tactile sustainable glass vessels, editorial campaigns, and serene digital storytelling.",
      requirements: [
        "Luxury packaging & vessel design",
        "Editorial photography direction",
        "Sustainable material sourcing",
      ],
    },
    {
      id: "headless-commerce-lead",
      title: "Lead Digital Flagship Engineer",
      department: "engineering",
      departmentLabel: "Digital Flagship",
      location: "Remote · London",
      type: "Full-Time",
      compensation: "$155k – $190k",
      equity: "0.25% – 0.50%",
      description:
        "Architect ultra-fast headless commerce experiences, personalized ritual diagnostics, and member portals.",
      requirements: [
        "React 19, Shopify Hydrogen & Tailwind",
        "Interactive 3D & smooth motion",
        "Sub-second global storefront LCP",
      ],
    },
  ],
  "cyber-shield": [
    {
      id: "ebpf-kernel-architect",
      title: "Principal eBPF & Runtime Security Engineer",
      department: "kernel",
      departmentLabel: "Kernel Defense",
      location: "Remote · Tel Aviv",
      type: "Full-Time",
      compensation: "$190k – $240k",
      equity: "0.35% – 0.75%",
      description:
        "Engineer zero-overhead eBPF kernel probes and sub-millisecond automated threat containment.",
      requirements: [
        "Linux kernel, eBPF & Rust",
        "Container & Kubernetes security",
        "Sub-millisecond telemetry pipelines",
      ],
    },
    {
      id: "red-team-lead",
      title: "Autonomous Red-Team Simulation Lead",
      department: "offensive",
      departmentLabel: "Threat Research",
      location: "Remote · Washington D.C.",
      type: "Full-Time",
      compensation: "$180k – $225k",
      equity: "0.30% – 0.60%",
      description:
        "Build continuous breach-simulation harnesses mapped to MITRE ATT&CK across multi-cloud perimeters.",
      requirements: [
        "Cloud attack-surface research",
        "Automated purple-team validation",
        "Zero-trust policy verification",
      ],
    },
    {
      id: "secops-ui-lead",
      title: "Staff Security Visualization Architect",
      department: "frontend",
      departmentLabel: "SecOps UI",
      location: "Remote · Paris",
      type: "Full-Time",
      compensation: "$165k – $205k",
      equity: "0.25% – 0.55%",
      description:
        "Build real-time threat topology graphs, incident response war-rooms, and compliance dashboards.",
      requirements: [
        "React 19, WebGL & real-time telemetry",
        "High-density data visualization",
        "Zero-latency streaming updates",
      ],
    },
  ],
  "digital-agency": [
    {
      id: "senior-systems-engineer",
      title: "Senior Systems & Frontend Architect",
      department: "engineering",
      departmentLabel: "Engineering",
      location: "Remote · Zurich / US",
      type: "Full-Time",
      compensation: "$165k – $210k",
      equity: "0.25% – 0.60%",
      description:
        "Own the core component architecture, edge rendering performance, and design token systems across flagship products.",
      requirements: [
        "Next.js 15, React 19 & TypeScript",
        "Sub-800ms LCP & zero layout shift",
        "Modular design system architecture",
      ],
    },
    {
      id: "lead-design-technologist",
      title: "Lead Design Technologist & Motion",
      department: "design",
      departmentLabel: "Design Systems",
      location: "Remote · Tokyo",
      type: "Full-Time",
      compensation: "$150k – $190k",
      equity: "0.20% – 0.50%",
      description:
        "Bridge Figma design systems into fluid Framer Motion micro-interactions and accessible React primitives.",
      requirements: [
        "Editorial typography & layout craft",
        "Framer Motion & interactive widgets",
        "WCAG AAA accessible components",
      ],
    },
    {
      id: "staff-ai-copilot-engineer",
      title: "Staff AI Product & Full-Stack Engineer",
      department: "ai",
      departmentLabel: "AI & Product",
      location: "Remote · San Francisco",
      type: "Full-Time",
      compensation: "$170k – $215k",
      equity: "0.30% – 0.65%",
      description:
        "Build real-time AI workflows, streaming interfaces, and full-stack SaaS features for venture-backed clients.",
      requirements: [
        "LLM streaming APIs & tool calling",
        "Full-stack Node.js, React & Edge",
        "Rapid product prototyping",
      ],
    },
  ],
};

export const CareersBoardView: React.FC<{
  nicheSlug?: string;
  title?: string;
  subtitle?: string;
}> = ({
  nicheSlug = "digital-agency",
  title = "Build the future with our global team",
  subtitle = "We hire senior designers, engineers, and researchers who love autonomy, craft, and shipping world-class work.",
}) => {
  const activeNicheKey = NICHE_CAREERS[nicheSlug] ? nicheSlug : "digital-agency";
  const roles = NICHE_CAREERS[activeNicheKey];
  const [activeDepartment, setActiveDepartment] = useState<string>("all");

  const departments = ["all", ...Array.from(new Set(roles.map((r) => r.department)))];
  const filteredRoles =
    activeDepartment === "all"
      ? roles
      : roles.filter((role) => role.department === activeDepartment);

  return (
    <HbSection id="careers" tone="muted">
      <HbHeader badge="Careers & Culture" title={title} subtitle={subtitle} />

      {/* Top 3-Card Culture & Perks Widget Bento (Matching Screenshot 1 & 2 Vibe) */}
      <div className="mb-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Card 1: Pexels Studio Photo with Frosted Glass Caption */}
        <Reveal y={20}>
          <div className="group relative h-[250px] overflow-hidden rounded-[28px] bg-zinc-900">
            <HbImage
              src={PEXELS.studioTeam}
              alt="Global team culture"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/50 bg-white/75 px-5 py-3.5 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/80">
              <div className="text-xs font-semibold text-[color:var(--brand-primary,#7C3AED)]">
                Remote-First Studio
              </div>
              <div className="mt-0.5 text-base font-semibold text-zinc-900 dark:text-white">
                Work from anywhere, zero meetings bloat
              </div>
            </div>
          </div>
        </Reveal>

        {/* Card 2: Neon Lime Compensation & Equity Card */}
        <Reveal delay={0.08} y={20}>
          <div
            className="flex h-[250px] flex-col justify-between rounded-[28px] p-7 text-zinc-950 transition-transform duration-300 hover:-translate-y-1"
            style={{ background: HB.lime }}
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-zinc-950 px-3 py-1 text-xs font-semibold text-[#C8F560]">
                Top-Quartile Pay
              </span>
              <Sparkles className="h-5 w-5 text-zinc-950" />
            </div>
            <div>
              <div className="text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl">
                $150k – $240k
              </div>
              <p className="mt-1 text-xs font-medium text-zinc-800 sm:text-sm">
                Transparent base salary + meaningful equity & annual profit share
              </p>
            </div>
          </div>
        </Reveal>

        {/* Card 3: Dark Perks & Wellness Widget Card */}
        <Reveal delay={0.16} y={20}>
          <div className="flex h-[250px] flex-col justify-between rounded-[28px] border border-white/10 bg-[#14161D] p-6 text-white transition-transform duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-400">Life & Sabbatical Benefits</span>
              <span className="rounded-lg bg-[#7EE7EE] px-2.5 py-1 text-xs font-bold text-zinc-950">
                100% Covered
              </span>
            </div>
            <div className="space-y-2.5">
              {[
                { label: "4-Week Paid Annual Sabbatical", icon: Globe, color: "#C8F560" },
                { label: "$6,000 Apple M4 Max Workspace Grant", icon: Zap, color: "#7EE7EE" },
                {
                  label: "Full Global Health, Dental & Wellness",
                  icon: HeartHandshake,
                  color: "#A78BFA",
                },
              ].map((perk) => {
                const Icon = perk.icon;
                return (
                  <div
                    key={perk.label}
                    className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.05] px-3.5 py-2.5"
                  >
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-zinc-950"
                      style={{ background: perk.color }}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-xs font-medium text-zinc-200 sm:text-sm">
                      {perk.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Department Filter Pills */}
      <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
        {departments.map((dept) => {
          const active = activeDepartment === dept;
          const label =
            dept === "all"
              ? `All Open Roles (${roles.length})`
              : roles.find((r) => r.department === dept)?.departmentLabel || dept;
          return (
            <button
              key={dept}
              type="button"
              onClick={() => setActiveDepartment(dept)}
              className={`cursor-pointer rounded-full px-4 py-2 text-xs font-medium transition-all sm:text-sm ${
                active
                  ? "bg-zinc-900 text-white shadow-sm dark:bg-white dark:text-zinc-950"
                  : "border border-black/[0.06] bg-white text-zinc-600 hover:text-zinc-900 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Job Roles List */}
      <div className="grid grid-cols-1 gap-5">
        {filteredRoles.map((role, idx) => (
          <Reveal key={role.id} delay={idx * 0.06} y={18}>
            <div
              className={`${HB.card} p-6 sm:p-8 ${HB.hoverLift} flex flex-col justify-between gap-6 lg:flex-row lg:items-center`}
            >
              <div className="max-w-3xl space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className={HB.brandChip}>{role.departmentLabel}</span>
                  <span className={HB.chip}>
                    <MapPin className="mr-1 h-3.5 w-3.5 text-zinc-400" />
                    {role.location}
                  </span>
                  <span className="rounded-full bg-[#C8F560]/25 px-3 py-1 text-xs font-semibold text-zinc-900 tabular-nums dark:bg-[#C8F560]/15 dark:text-[#C8F560]">
                    {role.compensation} · {role.equity} Equity
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl dark:text-white">
                    {role.title}
                  </h3>
                  <p className={`mt-1.5 text-sm leading-relaxed sm:text-base ${HB.ink2}`}>
                    {role.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {role.requirements.map((req) => (
                    <span
                      key={req}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F5F8] px-3 py-1 text-xs text-zinc-700 dark:bg-white/5 dark:text-zinc-300"
                    >
                      <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#C8F560] text-zinc-950">
                        <Check className="h-2.5 w-2.5" strokeWidth={3} />
                      </span>
                      {req}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex shrink-0 items-center justify-between gap-3 border-t border-black/[0.06] pt-4 lg:flex-col lg:items-end lg:border-t-0 lg:pt-0 dark:border-white/10">
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  Direct reply within 48h
                </span>
                <PillLink
                  href={`mailto:careers@hudbirdui.com?subject=Application:%20${encodeURIComponent(role.title)}`}
                  variant="brand"
                  size="md"
                >
                  Apply now
                </PillLink>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </HbSection>
  );
};
