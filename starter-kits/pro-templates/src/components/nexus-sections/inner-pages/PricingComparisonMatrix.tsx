// starter-kits/pro-templates/src/components/nexus-sections/inner-pages/PricingComparisonMatrix.tsx
"use client";

import React from "react";
import { PillLink } from "../ScrollReveal";
import { Check, Minus, ShieldCheck, Sparkles } from "lucide-react";
import { HB, HbSection, HbHeader } from "../HudbirdKit";

interface FeatureRow {
  name: string;
  tooltip?: string;
  tier1: boolean | string;
  tier2: boolean | string;
  tier3: boolean | string;
}

interface FeatureCategory {
  category: string;
  rows: FeatureRow[];
}

interface NicheMatrixConfig {
  tier1Name: string;
  tier1Price: string;
  tier1Desc: string;
  tier2Name: string;
  tier2Price: string;
  tier2Desc: string;
  tier3Name: string;
  tier3Price: string;
  tier3Desc: string;
  categories: FeatureCategory[];
}

const NICHE_MATRICES: Record<string, NicheMatrixConfig> = {
  "fintech-protocol": {
    tier1Name: "Fund Vault",
    tier1Price: "$12,500/mo",
    tier1Desc: "Autonomous yield generation for single-asset funds & hedge funds.",
    tier2Name: "Prime Protocol",
    tier2Price: "$28,000/mo",
    tier2Desc: "Multi-strategy cross-chain treasury with dedicated quantitative risk desk.",
    tier3Name: "Sovereign Institutional",
    tier3Price: "Custom Allocation",
    tier3Desc:
      "Bespoke smart contract infrastructure, private validator nodes, & custom MPC custody.",
    categories: [
      {
        category: "Smart Contracts & Verification",
        rows: [
          { name: "ERC-4626 Tokenized Vault Standard", tier1: true, tier2: true, tier3: true },
          {
            name: "Formal Verification (Certora / Foundry)",
            tier1: "Key Invariants",
            tier2: "Full Testnet Suite",
            tier3: "Continuous Automated",
          },
          {
            name: "Slashing Protection & Audit Insurance",
            tier1: false,
            tier2: "$5M Coverage",
            tier3: "Unlimited Sovereign",
          },
          { name: "Zero-Knowledge Travel Rule Bridge", tier1: false, tier2: true, tier3: true },
        ],
      },
      {
        category: "Treasury & Liquidity Operations",
        rows: [
          {
            name: "Concentrated AMM Liquidity Routing",
            tier1: "Single Pool",
            tier2: "Multi-DEX Aggregation",
            tier3: "Private Dark Pool",
          },
          {
            name: "Automated Strategy Yield Rebalancing",
            tier1: "Daily Epoch",
            tier2: "Real-Time Volatility",
            tier3: "Sub-Second MEV Guard",
          },
          {
            name: "Real-Time Dune Analytics & Telemetry",
            tier1: true,
            tier2: true,
            tier3: "Custom Single-Tenant",
          },
          { name: "Sub-4ms Orderbook Settlement Feed", tier1: false, tier2: true, tier3: true },
        ],
      },
      {
        category: "Custody & Governance",
        rows: [
          {
            name: "Safe Multi-Sig / Fireblocks Integration",
            tier1: "3-of-5 Signers",
            tier2: "Custom MPC Quorum",
            tier3: "Hardware HSM Cluster",
          },
          {
            name: "DAO Governance Voting & Proposals",
            tier1: false,
            tier2: true,
            tier3: "Custom Voting Curves",
          },
          {
            name: "Regulatory Compliance & AML Reports",
            tier1: "Monthly Export",
            tier2: "Weekly Audits",
            tier3: "Real-Time API Stream",
          },
          {
            name: "Dedicated Institutional Risk Desk SLA",
            tier1: "24-Hour SLA",
            tier2: "1-Hour Priority",
            tier3: "15-Minute Dedicated Hotline",
          },
        ],
      },
    ],
  },
  "ai-copilot": {
    tier1Name: "Developer Tier",
    tier1Price: "$4,500/mo",
    tier1Desc: "Essential AI inference endpoints, RAG pipeline, and streaming web UI.",
    tier2Name: "Enterprise Copilot",
    tier2Price: "$16,000/mo",
    tier2Desc: "Dedicated GPU sharding, autonomous multi-agent graphs, and fine-tuning.",
    tier3Name: "Autonomous Cluster",
    tier3Price: "Custom Scale",
    tier3Desc: "Private single-tenant VPC, customized foundation models, and sub-10ms TTFT.",
    categories: [
      {
        category: "Model Architecture & Serving",
        rows: [
          {
            name: "Dedicated vLLM / Triton GPU Sharding",
            tier1: "Shared Cluster",
            tier2: "Dedicated H100 Pod",
            tier3: "Multi-Region Cluster",
          },
          {
            name: "Sub-20ms Time-To-First-Token (TTFT)",
            tier1: true,
            tier2: true,
            tier3: "Sub-10ms Locked",
          },
          { name: "Multi-Modal Vision & Audio Streaming", tier1: false, tier2: true, tier3: true },
          {
            name: "Custom Domain Fine-Tuning Pipeline",
            tier1: false,
            tier2: "Quarterly Run",
            tier3: "Continuous Synthetic RLHF",
          },
        ],
      },
      {
        category: "Agent Graph & Orchestration",
        rows: [
          {
            name: "LangGraph Multi-Agent Workflows",
            tier1: "Up to 5 Agents",
            tier2: "Unlimited Workflows",
            tier3: "Distributed Multi-Tenant",
          },
          {
            name: "Deterministic Tool Calling & Function Schemas",
            tier1: true,
            tier2: true,
            tier3: true,
          },
          {
            name: "Automated Hallucination & Safety Scoring",
            tier1: "Standard Filter",
            tier2: "Adversarial Fuzzing",
            tier3: "Formal Safety Guarantees",
          },
          { name: "Dynamic Context Window Compaction", tier1: false, tier2: true, tier3: true },
        ],
      },
      {
        category: "Vector Retrieval & Data Privacy",
        rows: [
          {
            name: "Zero Data Retention Guarantee (No Training)",
            tier1: true,
            tier2: true,
            tier3: true,
          },
          {
            name: "Dense + Sparse Hybrid Vector Search",
            tier1: "1M Vectors",
            tier2: "50M Vectors",
            tier3: "Unlimited Sharded",
          },
          {
            name: "SOC 2 Type II & HIPAA Compliance",
            tier1: false,
            tier2: true,
            tier3: "Air-Gapped Private VPC",
          },
          {
            name: "Dedicated ML Infrastructure Engineer SLA",
            tier1: "Standard Slack",
            tier2: "Same-Day Pod Support",
            tier3: "24/7 Dedicated Pager",
          },
        ],
      },
    ],
  },
  "alunara-wellness": {
    tier1Name: "Bespoke Ritual",
    tier1Price: "$4,800/mo",
    tier1Desc: "Custom botanical formulations and headless Shopify storefront foundation.",
    tier2Name: "Seasonal Atelier",
    tier2Price: "$12,500/mo",
    tier2Desc: "Exclusive cold-press extraction batches, 3D packaging, & VIP replenishment.",
    tier3Name: "Sovereign Patron",
    tier3Price: "Private Allocation",
    tier3Desc:
      "Private harvest allocation, bespoke fragrance signatures, & white-glove atelier concierge.",
    categories: [
      {
        category: "Botanical Formulations & Clinical Assays",
        rows: [
          { name: "100% Certified Organic Extraction", tier1: true, tier2: true, tier3: true },
          {
            name: "Clinical Bioavailability Assays",
            tier1: "Standard Lab",
            tier2: "Full Spectrometry Report",
            tier3: "Custom Double-Blind Trial",
          },
          { name: "Zero Synthetic Stabilizers or Fillers", tier1: true, tier2: true, tier3: true },
          {
            name: "Custom Scent & Terpene Signature",
            tier1: false,
            tier2: true,
            tier3: "Bespoke Proprietary Patent",
          },
        ],
      },
      {
        category: "Headless E-Commerce & Atelier Digital",
        rows: [
          { name: "Shopify Hydrogen React 19 Storefront", tier1: true, tier2: true, tier3: true },
          {
            name: "Predictive Scent Profiler & Sensory Quiz",
            tier1: false,
            tier2: true,
            tier3: true,
          },
          { name: "Sub-500ms Global Edge TTFB", tier1: true, tier2: true, tier3: true },
          {
            name: "Interactive 3D WebGL Bottle Viewer",
            tier1: false,
            tier2: true,
            tier3: "Custom AR Try-On",
          },
        ],
      },
      {
        category: "Packaging & Private Allocations",
        rows: [
          {
            name: "Custom Amber Glass Mold & Embossing",
            tier1: "Standard Mold",
            tier2: "Custom Tooling Spec",
            tier3: "Hand-Blown Glass Reserve",
          },
          { name: "Zero-Plastic Biodegradable Packaging", tier1: true, tier2: true, tier3: true },
          {
            name: "Private B2B Wholesale Allocation Portal",
            tier1: false,
            tier2: true,
            tier3: true,
          },
          {
            name: "Dedicated Atelier Formulator Hotline",
            tier1: "Weekly Loom",
            tier2: "Dedicated Slack Desk",
            tier3: "Direct Master Chemist Access",
          },
        ],
      },
    ],
  },
  "cyber-shield": {
    tier1Name: "Perimeter Shield",
    tier1Price: "$8,500/mo",
    tier1Desc: "Essential zero-trust edge protection, WAF, and automated threat monitoring.",
    tier2Name: "Zero-Trust Mesh",
    tier2Price: "$22,000/mo",
    tier2Desc: "Continuous red team emulation, Cloudflare Magic WAN, and SOC 2 automation.",
    tier3Name: "Global Defense Cloud",
    tier3Price: "Custom Enterprise",
    tier3Desc:
      "Full enterprise SecOps pod, automated killswitch deployment, & FedRAMP High readiness.",
    categories: [
      {
        category: "Threat Defense & Endpoint EDR",
        rows: [
          { name: "Cloudflare Magic WAN & WireGuard Mesh", tier1: true, tier2: true, tier3: true },
          {
            name: "Automated eBPF Kernel Telemetry",
            tier1: "Basic Syslog",
            tier2: "Full Kernel eBPF",
            tier3: "Zero-Overhead Memory Dumps",
          },
          { name: "Real-Time Ransomware Interception", tier1: true, tier2: true, tier3: true },
          { name: "MITRE ATT&CK Matrix Correlation", tier1: false, tier2: true, tier3: true },
        ],
      },
      {
        category: "Offensive Security & Red Team",
        rows: [
          {
            name: "Automated Penetration Fuzzing",
            tier1: "Monthly Run",
            tier2: "Daily Automated",
            tier3: "Continuous Autonomous",
          },
          { name: "Adversarial Threat Vector Modeling", tier1: false, tier2: true, tier3: true },
          {
            name: "Zero-Day Vulnerability Patching SLA",
            tier1: "48 Hours",
            tier2: "6 Hours",
            tier3: "Sub-15 Minute Hotpatch",
          },
          {
            name: "Hardware Security Module (HSM) Vault",
            tier1: false,
            tier2: true,
            tier3: "FIPS 140-3 Level 4",
          },
        ],
      },
      {
        category: "Governance, Audit & Incident Response",
        rows: [
          {
            name: "SOC 2 Type II Continuous Compliance",
            tier1: false,
            tier2: true,
            tier3: "FedRAMP High Ready",
          },
          { name: "Cryptographic Audit Trail & Evidence", tier1: true, tier2: true, tier3: true },
          {
            name: "Dedicated SecOps Incident Response SLA",
            tier1: "1-Hour P1",
            tier2: "15-Minute Critical",
            tier3: "Real-Time War Room Hotline",
          },
          {
            name: "Dedicated Principal Security Engineer",
            tier1: "Quarterly Review",
            tier2: "Dedicated Pod Lead",
            tier3: "Embedded Staff Architect",
          },
        ],
      },
    ],
  },
  "digital-agency": {
    tier1Name: "Sprint Pod",
    tier1Price: "$8,500/mo",
    tier1Desc: "Targeted design systems and Next.js performance sprints for fast-moving startups.",
    tier2Name: "Dedicated Pod",
    tier2Price: "$16,500/mo",
    tier2Desc: "Embedded staff engineers and design technologists shipping full product flagships.",
    tier3Name: "Enterprise Retainer",
    tier3Price: "$32,000/mo",
    tier3Desc: "Comprehensive studio partnership for multi-brand portfolios and venture studios.",
    categories: [
      {
        category: "Architecture & Design",
        rows: [
          {
            name: "Design Token Specification (W3C standard)",
            tier1: true,
            tier2: true,
            tier3: true,
          },
          {
            name: "Figma Variable Primitives & Component Kit",
            tier1: "Up to 50 items",
            tier2: "Unlimited (70+)",
            tier3: "Custom Multi-brand",
          },
          {
            name: "Interactive Micro-Prototypes & Kinetic Motion",
            tier1: "Key Views",
            tier2: "All Flows",
            tier3: "Custom 3D / WebGL",
          },
          {
            name: "WCAG 2.2 AAA Accessibility Audit",
            tier1: true,
            tier2: true,
            tier3: "Full VPAT Document",
          },
          { name: "Design System Governance & Changelog", tier1: false, tier2: true, tier3: true },
        ],
      },
      {
        category: "Engineering & Stack",
        rows: [
          { name: "Next.js 15 App Router & React 19 Core", tier1: true, tier2: true, tier3: true },
          { name: "TypeScript Strict Mode (Zero `any`)", tier1: true, tier2: true, tier3: true },
          {
            name: "Core Web Vitals Guarantee (100/100 CWV)",
            tier1: true,
            tier2: true,
            tier3: true,
          },
          {
            name: "Playwright E2E & Visual Regression Suite",
            tier1: "Core Views",
            tier2: "Full Matrix",
            tier3: "CI Automated Pipeline",
          },
          { name: "Edge Middleware & Server Actions", tier1: false, tier2: true, tier3: true },
        ],
      },
      {
        category: "Velocity, Team & Delivery",
        rows: [
          {
            name: "Team Composition",
            tier1: "1 Staff Eng + 1 Lead",
            tier2: "2 Staff Eng + 1 Lead",
            tier3: "Dedicated 4-Person Pod",
          },
          {
            name: "Production Deployment Cadence",
            tier1: "Bi-Weekly",
            tier2: "Continuous Daily",
            tier3: "Real-Time Staging Deploy",
          },
          { name: "Dedicated Slack Hotline & Standups", tier1: true, tier2: true, tier3: true },
          {
            name: "Post-Launch Warranty & Bug Fix SLA",
            tier1: "14 Days",
            tier2: "30 Days",
            tier3: "Perpetual Retainer",
          },
        ],
      },
    ],
  },
};

const renderCell = (val: boolean | string, highlighted = false) => {
  if (typeof val === "boolean") {
    return val ? (
      <span
        className={`mx-auto grid h-6 w-6 place-items-center rounded-full ${
          highlighted ? "bg-[#C8F560] text-zinc-950" : "bg-emerald-500/15 text-emerald-500"
        }`}
      >
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      </span>
    ) : (
      <Minus className="mx-auto h-4 w-4 text-zinc-300 dark:text-zinc-700" />
    );
  }
  return (
    <span
      className={`text-xs font-semibold ${
        highlighted
          ? "text-[color:var(--brand-primary,#7C3AED)]"
          : "text-zinc-700 dark:text-zinc-300"
      }`}
    >
      {val}
    </span>
  );
};

export const PricingComparisonMatrix: React.FC<{
  nicheSlug?: string;
  title?: string;
  subtitle?: string;
}> = ({
  nicheSlug = "digital-agency",
  title = "Compare plans & included deliverables",
  subtitle = "Transparent side-by-side breakdown of deliverables, team velocity, and support across every tier.",
}) => {
  const activeNicheKey = NICHE_MATRICES[nicheSlug] ? nicheSlug : "digital-agency";
  const matrix = NICHE_MATRICES[activeNicheKey];

  return (
    <HbSection id="comparison" tone="light">
      <HbHeader badge="Plan Comparison" title={title} subtitle={subtitle} />

      {/* 3 Tier Summary Cards Above Table */}
      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
        {[
          {
            name: matrix.tier1Name,
            price: matrix.tier1Price,
            desc: matrix.tier1Desc,
            popular: false,
            accent: HB.cyan,
          },
          {
            name: matrix.tier2Name,
            price: matrix.tier2Price,
            desc: matrix.tier2Desc,
            popular: true,
            accent: HB.lime,
          },
          {
            name: matrix.tier3Name,
            price: matrix.tier3Price,
            desc: matrix.tier3Desc,
            popular: false,
            accent: HB.violet,
          },
        ].map((tier) => (
          <div
            key={tier.name}
            className={`flex flex-col justify-between gap-4 rounded-[28px] border p-6 ${
              tier.popular
                ? "border-white/10 bg-[#0E1017] text-white shadow-xl"
                : "border-black/[0.05] bg-[#F4F5F8] dark:border-white/10 dark:bg-zinc-900"
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold">{tier.name}</span>
                {tier.popular && (
                  <span className="rounded-full bg-[#C8F560] px-2.5 py-0.5 text-[11px] font-bold text-zinc-950">
                    Most Popular
                  </span>
                )}
              </div>
              <div
                className={`text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl ${
                  tier.popular ? "text-[#C8F560]" : "text-zinc-900 dark:text-white"
                }`}
              >
                {tier.price}
              </div>
              <p className={`text-xs leading-relaxed ${tier.popular ? "text-zinc-400" : HB.ink2}`}>
                {tier.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Rounded-[32px] Comparison Card */}
      <div className={`${HB.card} overflow-hidden`}>
        <div className="overflow-x-auto">
          <div className="min-w-[680px]">
            {/* Sticky Header */}
            <div className="grid grid-cols-12 items-center border-b border-black/[0.06] bg-[#F4F5F8] px-6 py-5 sm:px-8 dark:border-white/10 dark:bg-zinc-950/80">
              <div className="col-span-6">
                <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                  Included Features & Deliverables
                </span>
              </div>
              <div className="col-span-6 grid grid-cols-3 gap-4 text-center text-xs font-semibold text-zinc-900 dark:text-white">
                <span>{matrix.tier1Name}</span>
                <span className="text-[color:var(--brand-primary,#7C3AED)]">
                  {matrix.tier2Name}
                </span>
                <span>{matrix.tier3Name}</span>
              </div>
            </div>

            {/* Categories */}
            {matrix.categories.map((cat) => (
              <div key={cat.category}>
                <div className="flex items-center gap-2 border-y border-black/[0.05] bg-[#F4F5F8]/60 px-6 py-3.5 sm:px-8 dark:border-white/[0.06] dark:bg-white/[0.02]">
                  <Sparkles className="h-3.5 w-3.5 text-[color:var(--brand-primary,#7C3AED)]" />
                  <span className="text-xs font-semibold text-zinc-900 dark:text-white">
                    {cat.category}
                  </span>
                </div>

                <div className="divide-y divide-black/[0.04] dark:divide-white/[0.05]">
                  {cat.rows.map((row) => (
                    <div
                      key={row.name}
                      className="grid grid-cols-12 items-center px-6 py-4 transition-colors hover:bg-[#F4F5F8]/50 sm:px-8 dark:hover:bg-white/[0.02]"
                    >
                      <div className="col-span-6 pr-4">
                        <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                          {row.name}
                        </span>
                      </div>
                      <div className="col-span-6 grid grid-cols-3 items-center gap-4 text-center">
                        <div>{renderCell(row.tier1, false)}</div>
                        <div className="rounded-xl bg-[color:var(--brand-primary,#7C3AED)]/5 py-1">
                          {renderCell(row.tier2, true)}
                        </div>
                        <div>{renderCell(row.tier3, false)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Guarantee Footer */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-black/[0.06] bg-[#F4F5F8] p-6 sm:flex-row sm:p-8 dark:border-white/10 dark:bg-zinc-950/60">
          <div className="flex items-center gap-2.5 text-xs font-medium text-zinc-700 sm:text-sm dark:text-zinc-300">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#C8F560] text-zinc-950">
              <ShieldCheck className="h-3.5 w-3.5" />
            </span>
            <span>100% Commercial IP Ownership · Zero runtime licensing fees</span>
          </div>
          <PillLink href={`/demos/${nicheSlug}/contact`} variant="brand" size="md">
            Talk to our team
          </PillLink>
        </div>
      </div>
    </HbSection>
  );
};
