// starter-kits/pro-templates/src/components/nexus-sections/inner-pages/InteractiveSprintEstimator.tsx
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Reveal, PillLink } from "../ScrollReveal";
import { Check, Calculator, Sparkles, Users, Clock } from "lucide-react";
import { PEXELS } from "../HudbirdVisualWidgets";
import { HB, HbSection, HbHeader } from "../HudbirdKit";

interface WorkstreamOption {
  id: string;
  name: string;
  category: string;
  baseCost: number;
  engineers: number;
  designers: number;
  deliverables: string[];
}

interface NicheEstimatorData {
  title: string;
  subtitle: string;
  sectionLabel: string;
  ctaText: string;
  availabilityText: string;
  workstreams: WorkstreamOption[];
}

const NICHE_DATA: Record<string, NicheEstimatorData> = {
  "fintech-protocol": {
    title: "Institutional Yield & Protocol Allocator",
    subtitle:
      "Configure on-chain vault architectures, formal audit verifications, and multi-sig custody deployments in real time.",
    sectionLabel: "TREASURY ESTIMATOR",
    ctaText: "Lock In Treasury Allocation",
    availabilityText: "● Next institutional validator slot opens in 14 days",
    workstreams: [
      {
        id: "yield-vault",
        name: "Autonomous Yield Vault & Strategy Engine",
        category: "Smart Contracts",
        baseCost: 24000,
        engineers: 2,
        designers: 0,
        deliverables: [
          "ERC-4626 Vault Architecture",
          "Automated Strategy Rebalancing",
          "Mathematical APY Simulation",
        ],
      },
      {
        id: "formal-audit",
        name: "Formal Verification & Invariant Fuzzing",
        category: "Security & Audits",
        baseCost: 18500,
        engineers: 1,
        designers: 0,
        deliverables: [
          "Certora / Foundry Proofs",
          "Zero Re-entrancy Guarantee",
          "Comprehensive Public Audit Report",
        ],
      },
      {
        id: "mpc-custody",
        name: "Institutional MPC Custody Bridge",
        category: "Infrastructure",
        baseCost: 22000,
        engineers: 2,
        designers: 0,
        deliverables: [
          "Fireblocks / Safe Multi-Sig Adapter",
          "Zero-Knowledge Travel Rule",
          "Sub-4ms Settlement Pipeline",
        ],
      },
      {
        id: "amm-liquidity",
        name: "On-Chain Liquidity Routing Pool",
        category: "DeFi Protocol",
        baseCost: 16500,
        engineers: 1,
        designers: 0,
        deliverables: [
          "Concentrated Liquidity Curve",
          "MEV-Resistant Swap Engine",
          "Dune Real-Time Analytics",
        ],
      },
      {
        id: "terminal-ui",
        name: "High-Frequency Web3 Trading Terminal",
        category: "Interface",
        baseCost: 12500,
        engineers: 1,
        designers: 1,
        deliverables: [
          "WebSocket Depth Orderbook",
          "Zero Layout-Shift Charts",
          "Hardware Wallet Direct Connect",
        ],
      },
    ],
  },
  "ai-copilot": {
    title: "AI Inference & Agent Cluster Estimator",
    subtitle:
      "Configure dedicated vLLM GPU clusters, autonomous multi-agent graphs, and streaming SSE browser surfaces in real time.",
    sectionLabel: "AI CAPACITY ESTIMATOR",
    ctaText: "Deploy Synapse Cluster",
    availabilityText: "● High-throughput GPU cluster ready for deployment in 48 hours",
    workstreams: [
      {
        id: "inference-cluster",
        name: "Fine-Tuned LLM Inference Cluster",
        category: "Machine Learning",
        baseCost: 18500,
        engineers: 2,
        designers: 0,
        deliverables: [
          "vLLM / Triton Kernel Optimization",
          "Sub-20ms Time-To-First-Token",
          "Multi-GPU Distributed Sharding",
        ],
      },
      {
        id: "agent-graph",
        name: "Autonomous Multi-Agent Graph",
        category: "Agent Architecture",
        baseCost: 15000,
        engineers: 1,
        designers: 0,
        deliverables: [
          "LangGraph Orchestration Pipeline",
          "Tool Calling & Function Execution",
          "Deterministic Safety Guardrails",
        ],
      },
      {
        id: "vector-rag",
        name: "Vector Embeddings & Hybrid Search Engine",
        category: "Retrieval",
        baseCost: 12500,
        engineers: 1,
        designers: 0,
        deliverables: [
          "Pinecone / pgvector Pipeline",
          "Dense + Sparse Embedding Fusion",
          "Zero-Latency In-Memory Cache",
        ],
      },
      {
        id: "streaming-ui",
        name: "Real-Time Streaming UI Surface",
        category: "Frontend Core",
        baseCost: 9500,
        engineers: 1,
        designers: 1,
        deliverables: [
          "SSE Chunked Stream Parser",
          "Interactive Sandbox Code Runner",
          "Fluid Token Velocity Indicator",
        ],
      },
      {
        id: "model-eval",
        name: "Continuous Model Evaluation & Red-Team",
        category: "Governance & Safety",
        baseCost: 11000,
        engineers: 1,
        designers: 0,
        deliverables: [
          "Automated Hallucination Scorer",
          "Adversarial Jailbreak Test Suite",
          "SOC 2 Type II Privacy Guard",
        ],
      },
    ],
  },
  "alunara-wellness": {
    title: "Sensory Formulation & Luxury Atelier Estimator",
    subtitle:
      "Select organic botanical extractions, custom packaging tooling, and luxury headless commerce allocations.",
    sectionLabel: "ATELIER ESTIMATOR",
    ctaText: "Reserve Atelier Allocation",
    availabilityText: "● Next laboratory formulation batch opens in 7 days",
    workstreams: [
      {
        id: "botanical-lab",
        name: "Botanical Sourcing & Cold-Press Lab",
        category: "Organic Formulation",
        baseCost: 14500,
        engineers: 0,
        designers: 1,
        deliverables: [
          "100% Certified Organic Extraction",
          "Zero Synthetic Stabilizers",
          "Clinical Bioavailability Assay",
        ],
      },
      {
        id: "hydrogen-atelier",
        name: "Shopify Hydrogen Luxury Atelier",
        category: "Headless E-Commerce",
        baseCost: 16000,
        engineers: 2,
        designers: 1,
        deliverables: [
          "Sub-500ms Headless Storefront",
          "Predictive Scent Profiler",
          "Apple Pay 1-Touch Checkout",
        ],
      },
      {
        id: "bespoke-packaging",
        name: "Bespoke Glassware & 3D Unboxing",
        category: "Tactile Design",
        baseCost: 9500,
        engineers: 0,
        designers: 2,
        deliverables: [
          "Custom Amber Glass Mold Spec",
          "Tactile Foil-Embossed Labels",
          "Zero-Plastic Recyclable Boxes",
        ],
      },
      {
        id: "wholesale-portal",
        name: "Private B2B Allocation Portal",
        category: "Wholesale & VIP",
        baseCost: 12000,
        engineers: 1,
        designers: 0,
        deliverables: [
          "Tiered Wholesale Ordering",
          "Real-Time Batch Reserve Locking",
          "Automated Customs Documentation",
        ],
      },
      {
        id: "replenishment-engine",
        name: "Sensory Replenishment Subscription",
        category: "Retention & CRM",
        baseCost: 8500,
        engineers: 1,
        designers: 0,
        deliverables: [
          "Flexible Cadence Delivery Engine",
          "VIP Atelier Gifting Workflow",
          "Klaviyo Predictive Re-order Flow",
        ],
      },
    ],
  },
  "cyber-shield": {
    title: "Zero-Trust Mesh & SecOps Estimator",
    subtitle:
      "Model your enterprise attack surface, cloud workloads, and automated threat defense infrastructure in real time.",
    sectionLabel: "SECOPS ESTIMATOR",
    ctaText: "Deploy Security Pod",
    availabilityText: "● SOC engineering pod ready for on-site or remote deployment",
    workstreams: [
      {
        id: "cloud-mesh",
        name: "Zero-Trust Cloud Mesh (Magic WAN)",
        category: "Network Defense",
        baseCost: 21000,
        engineers: 2,
        designers: 0,
        deliverables: [
          "Global SASE & WireGuard Mesh",
          "Hardware Token MFA (FIDO2)",
          "Micro-Segmentation Policy Engine",
        ],
      },
      {
        id: "red-team",
        name: "Continuous Red Team & Vulnerability Emulation",
        category: "Offensive Security",
        baseCost: 17500,
        engineers: 2,
        designers: 0,
        deliverables: [
          "Continuous Attack Surface Mapping",
          "Automated Penetration Test Suite",
          "CVSS Risk Priority Matrix",
        ],
      },
      {
        id: "soc-compliance",
        name: "SOC 2 Type II & FedRAMP Compliance Pod",
        category: "Compliance",
        baseCost: 19000,
        engineers: 1,
        designers: 0,
        deliverables: [
          "Continuous Infrastructure Evidence",
          "HashiCorp Vault HSM Integration",
          "Cryptographic Audit Trail",
        ],
      },
      {
        id: "threat-feed",
        name: "Sub-Second Threat Intelligence Feed",
        category: "Real-Time SecOps",
        baseCost: 14500,
        engineers: 1,
        designers: 0,
        deliverables: [
          "Real-Time Syslog & eBPF Analysis",
          "MITRE ATT&CK Matrix Correlation",
          "Automated Quarantine Webhooks",
        ],
      },
      {
        id: "edge-waf",
        name: "Edge Web Application Firewall (WAF)",
        category: "Perimeter",
        baseCost: 12000,
        engineers: 1,
        designers: 0,
        deliverables: [
          "Zero-Day DDoS Protection (L3-L7)",
          "Custom Rate Limiting Rulesets",
          "Zero SSL Latency Termination",
        ],
      },
    ],
  },
  "digital-agency": {
    title: "Interactive Sprint Estimator",
    subtitle:
      "Configure your technical workstreams and cadence to calculate transparent duration, team composition, and investment in real time.",
    sectionLabel: "REAL-TIME ESTIMATOR",
    ctaText: "Lock In Sprint Schedule",
    availabilityText: "● Next available sprint starts in 12 days",
    workstreams: [
      {
        id: "design-system",
        name: "Design System & Token Primitives",
        category: "Design Architecture",
        baseCost: 8500,
        engineers: 1,
        designers: 1,
        deliverables: [
          "Figma Variable Library",
          "W3C Token Pipeline",
          "Accessible Primitives (70+)",
        ],
      },
      {
        id: "web-app",
        name: "Web App / Next.js Production Core",
        category: "Fullstack Engineering",
        baseCost: 14500,
        engineers: 2,
        designers: 0,
        deliverables: [
          "Turborepo Workspace",
          "Server Actions & Edge API",
          "100/100 Lighthouse Performance",
        ],
      },
      {
        id: "ai-copilot-ws",
        name: "AI Copilot & Workflow Agents",
        category: "Machine Learning / LLM",
        baseCost: 12500,
        engineers: 1,
        designers: 0,
        deliverables: [
          "Streaming SSE Chat Interface",
          "RAG Vector Pipeline",
          "Tool Calling Function Schema",
        ],
      },
      {
        id: "shopify-commerce",
        name: "Shopify OS 2.0 / Luxury Commerce",
        category: "E-Commerce",
        baseCost: 10500,
        engineers: 1,
        designers: 1,
        deliverables: [
          "Liquid / Hydrogen Storefront",
          "Predictive Cart Drawer",
          "Checkout Branding API",
        ],
      },
      {
        id: "motion-3d",
        name: "Motion Physics & WebGL 3D Canvas",
        category: "Creative Technology",
        baseCost: 9500,
        engineers: 1,
        designers: 1,
        deliverables: [
          "Interactive Three.js Shader",
          "Spring Micro-Interactions",
          "MotionScore > 95 Audit",
        ],
      },
    ],
  },
};

type CadenceId = "standard" | "accelerated" | "dedicated";

interface CadenceOption {
  id: CadenceId;
  label: string;
  badge: string;
  multiplier: number;
  durationLabel: string;
  description: string;
}

const CADENCES: CadenceOption[] = [
  {
    id: "standard",
    label: "Standard Cadence",
    badge: "4–6 WEEKS",
    multiplier: 1.0,
    durationLabel: "4 – 6 Weeks",
    description:
      "Balanced cadence with weekly production milestones, verified commits, and async video walk-throughs.",
  },
  {
    id: "accelerated",
    label: "Accelerated Sprint",
    badge: "2.5 WEEKS",
    multiplier: 1.35,
    durationLabel: "2.5 Weeks Flat",
    description:
      "Double-allocation pod dedicated to urgent mainnet launches, investor cutovers, or tight milestone deadlines.",
  },
  {
    id: "dedicated",
    label: "Dedicated Pod Retainer",
    badge: "QUARTERLY",
    multiplier: 1.85,
    durationLabel: "Quarterly Retainer",
    description:
      "Continuously embedded staff engineers and design leads operating as a native branch of your organization.",
  },
];

export const InteractiveSprintEstimator: React.FC<{
  nicheSlug?: string;
  title?: string;
  subtitle?: string;
}> = ({ nicheSlug = "digital-agency", title, subtitle }) => {
  const nicheKey = NICHE_DATA[nicheSlug] ? nicheSlug : "digital-agency";
  const activeNicheData = NICHE_DATA[nicheKey];

  // Prioritize active niche authentic titles unless a custom specialized title is passed
  const resolvedTitle =
    title &&
    !title.toLowerCase().includes("sprint scope") &&
    !title.toLowerCase().includes("interactive sprint")
      ? title
      : activeNicheData.title;
  const resolvedSubtitle =
    subtitle &&
    !subtitle.toLowerCase().includes("sprint") &&
    !subtitle.toLowerCase().includes("technical workstreams required")
      ? subtitle
      : activeNicheData.subtitle;
  const workstreams = activeNicheData.workstreams;

  const [selectedWorkstreams, setSelectedWorkstreams] = useState<string[]>([
    workstreams[0]?.id || "yield-vault",
    workstreams[1]?.id || "formal-audit",
  ]);

  // Sync selected workstreams when switching niches
  useEffect(() => {
    if (workstreams && workstreams.length >= 2) {
      setSelectedWorkstreams([workstreams[0].id, workstreams[1].id]);
    }
  }, [nicheKey]);

  const [selectedCadence, setSelectedCadence] = useState<CadenceId>("standard");

  const toggleWorkstream = (id: string) => {
    setSelectedWorkstreams((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const calculation = useMemo(() => {
    const activeStreams = workstreams.filter((ws) => selectedWorkstreams.includes(ws.id));
    const cadence = CADENCES.find((c) => c.id === selectedCadence) || CADENCES[0];

    const rawCost = activeStreams.reduce((acc, curr) => acc + curr.baseCost, 0);
    const totalCost = Math.round((rawCost * cadence.multiplier) / 500) * 500;

    const baseEngineers = activeStreams.reduce((acc, curr) => acc + curr.engineers, 0);
    const baseDesigners = activeStreams.reduce((acc, curr) => acc + curr.designers, 0);

    const totalEngineers =
      selectedCadence === "accelerated" ? baseEngineers + 1 : Math.max(1, baseEngineers);
    const totalDesigners = Math.max(1, baseDesigners);

    const allDeliverables = activeStreams.flatMap((ws) => ws.deliverables);

    return {
      totalCost,
      costRangeMin: Math.round(totalCost * 0.95),
      costRangeMax: Math.round(totalCost * 1.05),
      engineers: totalEngineers,
      designers: totalDesigners,
      durationLabel: cadence.durationLabel,
      deliverables: allDeliverables,
    };
  }, [selectedWorkstreams, selectedCadence, workstreams]);

  return (
    <HbSection id="estimator" tone="muted">
      <HbHeader
        badge="Interactive Scope Estimator"
        title={resolvedTitle}
        subtitle={resolvedSubtitle}
      />

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
        {/* Left 7 Cols: Interactive Scope & Cadence Cards */}
        <div className="space-y-8 lg:col-span-7">
          {/* Step 1 */}
          <div className={`${HB.card} space-y-5 p-6 sm:p-8`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="rounded-full bg-[#C8F560] px-3 py-1 text-xs font-bold text-zinc-950">
                  Step 1
                </span>
                <span className="text-base font-semibold text-zinc-900 dark:text-white">
                  Select scope modules
                </span>
              </div>
              <span className={HB.brandChip}>
                {selectedWorkstreams.length} of {workstreams.length} selected
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3.5">
              {workstreams.map((ws) => {
                const isSelected = selectedWorkstreams.includes(ws.id);
                return (
                  <button
                    key={ws.id}
                    type="button"
                    onClick={() => toggleWorkstream(ws.id)}
                    className={`flex w-full cursor-pointer items-start justify-between gap-4 rounded-[22px] border p-5 text-left transition-all duration-200 ${
                      isSelected
                        ? "border-zinc-900 bg-zinc-900 text-white shadow-md dark:border-white dark:bg-white dark:text-zinc-950"
                        : "border-black/[0.05] bg-[#F4F5F8] text-zinc-900 hover:border-zinc-400 dark:border-white/10 dark:bg-zinc-950/70 dark:text-white"
                    }`}
                  >
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-colors ${
                            isSelected
                              ? "bg-[#C8F560] text-zinc-950"
                              : "border border-black/10 bg-white dark:border-white/20 dark:bg-white/10"
                          }`}
                        >
                          {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                        </span>
                        <span
                          className={`text-xs font-medium ${
                            isSelected
                              ? "text-[#C8F560] dark:text-zinc-600"
                              : "text-zinc-500 dark:text-zinc-400"
                          }`}
                        >
                          {ws.category}
                        </span>
                      </div>
                      <h4 className="text-base font-semibold tracking-tight sm:text-lg">
                        {ws.name}
                      </h4>
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {ws.deliverables.map((item, idx) => (
                          <span
                            key={idx}
                            className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                              isSelected
                                ? "bg-white/15 text-white/90 dark:bg-zinc-900/10 dark:text-zinc-800"
                                : "bg-white text-zinc-600 dark:bg-white/5 dark:text-zinc-400"
                            }`}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <span className="block text-base font-bold tabular-nums">
                        ${ws.baseCost.toLocaleString()}
                      </span>
                      <span
                        className={`text-[11px] ${
                          isSelected ? "text-zinc-300 dark:text-zinc-600" : "text-zinc-500"
                        }`}
                      >
                        Fixed module
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Delivery Cadence */}
          <div className={`${HB.card} space-y-5 p-6 sm:p-8`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="rounded-full bg-[#7EE7EE] px-3 py-1 text-xs font-bold text-zinc-950">
                  Step 2
                </span>
                <span className="text-base font-semibold text-zinc-900 dark:text-white">
                  Choose delivery speed
                </span>
              </div>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">Timeline multiplier</span>
            </div>

            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
              {CADENCES.map((cadence) => {
                const isSelected = selectedCadence === cadence.id;
                return (
                  <button
                    key={cadence.id}
                    type="button"
                    onClick={() => setSelectedCadence(cadence.id)}
                    className={`flex cursor-pointer flex-col justify-between gap-3 rounded-[22px] border p-5 text-left transition-all duration-200 ${
                      isSelected
                        ? "border-zinc-900 bg-zinc-900 text-white shadow-md dark:border-white dark:bg-white dark:text-zinc-950"
                        : "border-black/[0.05] bg-[#F4F5F8] text-zinc-900 hover:border-zinc-400 dark:border-white/10 dark:bg-zinc-950/70 dark:text-white"
                    }`}
                  >
                    <div>
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                          isSelected
                            ? "bg-[#C8F560] text-zinc-950"
                            : "bg-white text-zinc-700 dark:bg-white/10 dark:text-zinc-300"
                        }`}
                      >
                        {cadence.badge}
                      </span>
                      <h5 className="mt-2 text-base font-semibold">{cadence.label}</h5>
                    </div>
                    <p
                      className={`text-xs leading-relaxed ${
                        isSelected
                          ? "text-zinc-300 dark:text-zinc-600"
                          : "text-zinc-500 dark:text-zinc-400"
                      }`}
                    >
                      {cadence.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Dark/Lime SaaS Quote Summary Card */}
        <div className="lg:sticky lg:top-28 lg:col-span-5">
          <div className="space-y-6 rounded-[32px] border border-white/10 bg-[#0E1017] p-7 text-white shadow-2xl sm:p-9">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 text-xs font-medium text-zinc-300">
                <Calculator className="h-4 w-4 text-[#C8F560]" />
                <span>Instant Sprint Estimate</span>
              </div>
              <span className="rounded-full bg-[#C8F560] px-2.5 py-1 text-xs font-bold text-zinc-950">
                Fixed-Scope
              </span>
            </div>

            {/* Big Reactive Price */}
            <div className="space-y-1.5 rounded-2xl border border-white/[0.06] bg-[#161924] p-5">
              <div className="text-xs text-zinc-400">Estimated Investment</div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-semibold tracking-tight text-[#C8F560] tabular-nums sm:text-5xl">
                  ${calculation.totalCost.toLocaleString()}
                </span>
                <span className="text-xs font-medium text-zinc-400">USD</span>
              </div>
              <p className="text-xs text-zinc-400 tabular-nums">
                Range: ${calculation.costRangeMin.toLocaleString()} – $
                {calculation.costRangeMax.toLocaleString()}
              </p>
            </div>

            {/* Timeline & Pod */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.04] p-4">
                <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                  <Clock className="h-3.5 w-3.5 text-[#7EE7EE]" /> Delivery Window
                </div>
                <div className="mt-1 text-sm font-semibold text-white">
                  {calculation.durationLabel}
                </div>
              </div>
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.04] p-4">
                <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                  <Users className="h-3.5 w-3.5 text-[#A78BFA]" /> Dedicated Pod
                </div>
                <div className="mt-1 text-sm font-semibold text-white">
                  {calculation.engineers} Eng + {calculation.designers} Design
                </div>
              </div>
            </div>

            {/* Included Deliverables */}
            <div className="space-y-2.5">
              <div className="text-xs font-medium text-zinc-400">Included deliverables</div>
              <div className="space-y-2">
                {calculation.deliverables.slice(0, 4).map((d, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-zinc-200">
                    <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#C8F560] text-zinc-950">
                      <Check className="h-2.5 w-2.5" strokeWidth={3} />
                    </span>
                    <span className="truncate">{d}</span>
                  </div>
                ))}
                {calculation.deliverables.length > 4 && (
                  <div className="pl-6 text-xs text-zinc-400">
                    + {calculation.deliverables.length - 4} additional deliverables
                  </div>
                )}
              </div>
            </div>

            {/* Team Avatars + CTA */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {PEXELS.avatars.slice(0, 4).map((av, i) => (
                    <img
                      key={i}
                      src={av}
                      alt=""
                      className="h-8 w-8 rounded-full object-cover ring-2 ring-[#0E1017]"
                    />
                  ))}
                </div>
                <span className="text-xs font-medium text-emerald-400">
                  {activeNicheData.availabilityText}
                </span>
              </div>

              <PillLink href={`/demos/${nicheSlug}/contact`} variant="inverse" size="md" fullWidth>
                {activeNicheData.ctaText}
              </PillLink>
            </div>
          </div>
        </div>
      </div>
    </HbSection>
  );
};
