// starter-kits/pro-templates/src/components/nexus-sections/inner-pages/ProcessDeliverablesMatrix.tsx
"use client";

import React, { useState } from "react";
import { Reveal } from "../ScrollReveal";
import { Check, Layers, ShieldCheck, Sparkles, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { PEXELS } from "../HudbirdVisualWidgets";
import { HB, HbSection, HbHeader, HbImage } from "../HudbirdKit";

interface DeliverableItem {
  id: string;
  name: string;
  format: string;
  cadence: string;
  stack: string[];
  description: string;
  acceptanceCriteria: string;
}

interface PhaseDeliverable {
  phaseNumber: string;
  phaseName: string;
  subtitle: string;
  badge: string;
  leadRole: string;
  deliverables: DeliverableItem[];
}

const NICHE_PHASES: Record<string, PhaseDeliverable[]> = {
  "fintech-protocol": [
    {
      phaseNumber: "01",
      phaseName: "Mathematical Modeling",
      subtitle: "Invariant Proofs & Economic Model",
      badge: "WEEK 01",
      leadRole: "Chief Cryptographer & Quant",
      deliverables: [
        {
          id: "fp-01",
          name: "Protocol Invariant & Economic Model Specification",
          format: "LaTeX / Mathematical Whitepaper",
          cadence: "Day 3",
          stack: ["Python", "SymPy", "Jupyter"],
          description:
            "Stochastic volatility proofs, impermanent loss bounds, and mathematical yield equilibrium formulas.",
          acceptanceCriteria:
            "Signed off by quantitative risk lead; zero division-by-zero or arbitrage drain states.",
        },
        {
          id: "fp-02",
          name: "ERC-4626 Tokenized Vault Architecture Blueprint",
          format: "EIP Spec / Markdown RFC",
          cadence: "Day 5",
          stack: ["Solidity 0.8.28", "ERC-4626", "Foundry"],
          description:
            "Non-custodial vault interface design with automated share minting, yield accrual, and multi-asset routing.",
          acceptanceCriteria: "100% compliant with standard ERC-4626 interface contracts.",
        },
      ],
    },
    {
      phaseNumber: "02",
      phaseName: "Smart Contract Core",
      subtitle: "Implementation & Gas Optimization",
      badge: "WEEK 02",
      leadRole: "Principal Solidity Architect",
      deliverables: [
        {
          id: "fp-03",
          name: "Core Vault & Strategy Engine Contracts",
          format: "Solidity Source & ABIs",
          cadence: "Day 8",
          stack: ["Solidity", "Yul / Assembly", "Foundry"],
          description:
            "High-efficiency vault contracts with custom assembly optimizations achieving sub-65k gas execution costs.",
          acceptanceCriteria: "Zero compiler warnings; 100% unit test branch coverage via Foundry.",
        },
        {
          id: "fp-04",
          name: "Concentrated AMM Liquidity Router",
          format: "Router Engine & SDK",
          cadence: "Day 10",
          stack: ["Uniswap v3 / v4", "Viem", "TypeScript"],
          description:
            "Multi-hop routing engine preventing flash-loan exploitation and front-running sandwich attacks.",
          acceptanceCriteria: "Slippage strictly constrained to < 0.05% on standard test trades.",
        },
      ],
    },
    {
      phaseNumber: "03",
      phaseName: "Formal Verification",
      subtitle: "Certora Proofs & Invariant Fuzzing",
      badge: "WEEK 03",
      leadRole: "Security Auditor & Formal Methods Lead",
      deliverables: [
        {
          id: "fp-05",
          name: "Certora Mathematical Verification Proofs",
          format: "Certora Spec (CVL)",
          cadence: "Day 15",
          stack: ["Certora Prover", "SMT Solvers"],
          description:
            "Formally proved invariants guaranteeing solvency, non-reentrancy, and invariant balance conservation.",
          acceptanceCriteria: "100% of mathematical rules verify successfully on Certora Prover.",
        },
        {
          id: "fp-06",
          name: "Automated Foundry Invariant Fuzzing Suite",
          format: "Forge Fuzz Test Suite",
          cadence: "Day 17",
          stack: ["Foundry", "Forge", "Echidna"],
          description:
            "10,000,000 randomized state mutation runs testing edge conditions and multi-contract interactions.",
          acceptanceCriteria: "Zero assertion violations after 10M fuzzing iterations.",
        },
      ],
    },
    {
      phaseNumber: "04",
      phaseName: "Testnet & Mainnet Cutover",
      subtitle: "Institutional Custody & Launch",
      badge: "WEEK 04",
      leadRole: "DevOps & Treasury Custody Lead",
      deliverables: [
        {
          id: "fp-07",
          name: "Multi-Sig Policy & Hardware Custody Mesh",
          format: "Safe Multi-Sig Deployment",
          cadence: "Day 22",
          stack: ["Safe", "Fireblocks", "Ledger Hardware"],
          description:
            "Institutional quorum signing policies, time-locked upgrades, and emergency circuit breakers.",
          acceptanceCriteria: "Multi-sig ceremony completed; threshold policies active on mainnet.",
        },
        {
          id: "fp-08",
          name: "Dune Real-Time Analytics & Settlement API",
          format: "Live Dashboard & SDK",
          cadence: "Day 25",
          stack: ["Dune SQL", "WebSocket RPC", "Next.js 15"],
          description:
            "Public verifiable transparency dashboard streaming TVL, historical yield, and transaction volume.",
          acceptanceCriteria: "Lighthouse 100/100 CWV; sub-2s block index latency.",
        },
      ],
    },
  ],
  "ai-copilot": [
    {
      phaseNumber: "01",
      phaseName: "Dataset & Tokenomics",
      subtitle: "Synthetic Alignment & RAG Topology",
      badge: "WEEK 01",
      leadRole: "Chief AI Scientist",
      deliverables: [
        {
          id: "ai-01",
          name: "Domain Embedding Pipeline & Vector Topology",
          format: "Vector Schema RFC",
          cadence: "Day 3",
          stack: ["Pinecone", "pgvector", "OpenAI Embeddings"],
          description:
            "Dense and sparse hybrid vector retrieval schema with metadata partitioning and token chunking.",
          acceptanceCriteria: "Mean Reciprocal Rank (MRR) > 0.88 on domain evaluation benchmark.",
        },
        {
          id: "ai-02",
          name: "Synthetic Alignment & Evaluation Dataset",
          format: "JSONL Evaluation Benchmark",
          cadence: "Day 5",
          stack: ["HuggingFace", "Python", "Ragas"],
          description:
            "1,500 curated adversarial evaluation queries testing domain accuracy, tool usage, and safety guardrails.",
          acceptanceCriteria: "Baseline accuracy established with automated scoring harness.",
        },
      ],
    },
    {
      phaseNumber: "02",
      phaseName: "Inference & Kernel Opt",
      subtitle: "vLLM Serving & Triton Kernels",
      badge: "WEEK 02",
      leadRole: "Staff GPU Systems Engineer",
      deliverables: [
        {
          id: "ai-03",
          name: "vLLM Multi-GPU Distributed Serving Core",
          format: "Cluster Deployment Config",
          cadence: "Day 8",
          stack: ["vLLM", "Triton", "PyTorch", "H100"],
          description:
            "Distributed model sharding with PagedAttention and chunked prefill achieving sub-20ms TTFT.",
          acceptanceCriteria: "P99 TTFT < 24ms under 500 concurrent streaming connections.",
        },
        {
          id: "ai-04",
          name: "Deterministic Tool Calling Schema & Sandbox",
          format: "JSON Schema & Execution Runtime",
          cadence: "Day 11",
          stack: ["TypeScript", "Zod", "WebAssembly"],
          description:
            "Strict schema validation enforcing structured outputs and sandboxed code execution.",
          acceptanceCriteria: "Zero schema validation drift across 10,000 synthetic test runs.",
        },
      ],
    },
    {
      phaseNumber: "03",
      phaseName: "Agent Graph Architecture",
      subtitle: "LangGraph State & Multi-Actor Routing",
      badge: "WEEK 03",
      leadRole: "Lead Agent Architect",
      deliverables: [
        {
          id: "ai-05",
          name: "LangGraph Multi-Agent Orchestration Engine",
          format: "State Machine Definition",
          cadence: "Day 15",
          stack: ["LangGraph", "FastAPI", "Redis"],
          description:
            "Cyclic multi-agent graph with error recovery loops, human-in-the-loop approvals, and checkpointing.",
          acceptanceCriteria:
            "100% deterministic state transitions verified under network drop simulations.",
        },
        {
          id: "ai-06",
          name: "Automated Hallucination & Privacy Guardrails",
          format: "Guardrail Policy Module",
          cadence: "Day 18",
          stack: ["NeMo Guardrails", "Python", "Llama-Guard"],
          description:
            "Zero data retention enforcement, PII masking, and adversarial prompt jailbreak protection.",
          acceptanceCriteria:
            "100% pass rate on prompt injection and PII exfiltration test suites.",
        },
      ],
    },
    {
      phaseNumber: "04",
      phaseName: "Streaming UI & Cutover",
      subtitle: "Real-Time Interface & Telemetry",
      badge: "WEEK 04",
      leadRole: "Principal Frontend Architect",
      deliverables: [
        {
          id: "ai-07",
          name: "Sub-20ms SSE Streaming Browser Surface",
          format: "React 19 / Next.js Component Suite",
          cadence: "Day 22",
          stack: ["Next.js 15", "Server-Sent Events", "Web Workers"],
          description:
            "Tactile, fluid streaming markdown parser rendering tokens at 60fps with zero layout shift.",
          acceptanceCriteria: "Lighthouse 100/100 CWV; CLS strictly 0.000 during live streaming.",
        },
        {
          id: "ai-08",
          name: "Model Observability & Telemetry Pipeline",
          format: "OpenTelemetry & W&B Integration",
          cadence: "Day 25",
          stack: ["Weights & Biases", "OpenTelemetry", "Sentry"],
          description:
            "Distributed trace spans capturing token latency percentiles, cost per query, and prompt cache hits.",
          acceptanceCriteria: "Production alerting active; sub-minute anomaly notification.",
        },
      ],
    },
  ],
  "alunara-wellness": [
    {
      phaseNumber: "01",
      phaseName: "Botanical Extraction",
      subtitle: "Pharmacognosy & Clean Chemistry",
      badge: "WEEK 01",
      leadRole: "Master Formulator",
      deliverables: [
        {
          id: "aw-01",
          name: "Supercritical CO2 Extraction Specification",
          format: "Laboratory Assay Report",
          cadence: "Day 4",
          stack: ["Grasse Lab Testing", "GC-MS Analysis"],
          description:
            "100% certified organic solventless extraction protocols preserving delicate botanical terpenes.",
          acceptanceCriteria:
            "0.00% synthetic solvents, phthalates, or parabens detected in laboratory assay.",
        },
        {
          id: "aw-02",
          name: "Sensory Olfactory & Terpene Chord Profiles",
          format: "Formulation Specification Sheet",
          cadence: "Day 7",
          stack: ["Spectrometry", "Stability Chamber"],
          description:
            "Layered top, heart, and base notes engineered for extended bioavailability and calm induction.",
          acceptanceCriteria:
            "Formula approved by clinical toxicology and dermatology testing panel.",
        },
      ],
    },
    {
      phaseNumber: "02",
      phaseName: "Tactile Packaging",
      subtitle: "Glassware Tooling & 3D WebGL",
      badge: "WEEK 02",
      leadRole: "Creative Director & Packaging Architect",
      deliverables: [
        {
          id: "aw-03",
          name: "UV-Blocking Amber Glass Mold Tooling Spec",
          format: "CAD Industrial Drawing",
          cadence: "Day 10",
          stack: ["SolidWorks", "Industrial Glass Mold"],
          description:
            "Bespoke weighted glass vessel blocking 99.4% of ultraviolet degradation to preserve active terpenes.",
          acceptanceCriteria:
            "Factory tooling sample verified for air-tight seal and weight balance.",
        },
        {
          id: "aw-04",
          name: "Photorealistic WebGL 3D Bottle Viewer",
          format: "Three.js Interactive Canvas",
          cadence: "Day 13",
          stack: ["Three.js", "WebGL", "GLSL Shaders"],
          description:
            "Interactive 3D product showcase simulating physical light refractions through amber glassware.",
          acceptanceCriteria: "Locked 60fps on mobile viewports; sub-300kb compressed 3D assets.",
        },
      ],
    },
    {
      phaseNumber: "03",
      phaseName: "Headless Atelier",
      subtitle: "Shopify Hydrogen & Sub-500ms Edge",
      badge: "WEEK 03",
      leadRole: "Headless E-Commerce Lead",
      deliverables: [
        {
          id: "aw-05",
          name: "Shopify Hydrogen React 19 Digital Atelier",
          format: "Hydrogen Core Workspace",
          cadence: "Day 17",
          stack: ["Shopify Hydrogen", "Oxygen Edge", "React 19"],
          description:
            "Ultra-fast luxury commerce storefront deployed across Oxygen global edge network.",
          acceptanceCriteria: "Sub-28ms global TTFB; Lighthouse 100/100 Core Web Vitals.",
        },
        {
          id: "aw-06",
          name: "Predictive Scent Profiler & Sensory Quiz",
          format: "Interactive Quiz Engine",
          cadence: "Day 20",
          stack: ["Framer Motion", "Sanity CMS", "TypeScript"],
          description:
            "Interactive recommendation engine mapping patron lifestyle and biorhythms to bespoke formulations.",
          acceptanceCriteria: "Conversion rate lift > 35% in staged A/B simulation.",
        },
      ],
    },
    {
      phaseNumber: "04",
      phaseName: "VIP Fulfillment",
      subtitle: "Subscriptions & Global Logistics",
      badge: "WEEK 04",
      leadRole: "E-Commerce Operations Lead",
      deliverables: [
        {
          id: "aw-07",
          name: "Sensory Replenishment Subscription Engine",
          format: "Recharge / Shopify Subscriptions",
          cadence: "Day 23",
          stack: ["Shopify Subscription API", "Klaviyo"],
          description:
            "Frictionless recurring replenishment with custom delivery cadence and seasonal gift reserves.",
          acceptanceCriteria:
            "Zero checkout drop-off; automated dunning and pause controls verified.",
        },
        {
          id: "aw-08",
          name: "Private B2B Wholesale Allocation Portal",
          format: "Gated Wholesale Portal",
          cadence: "Day 26",
          stack: ["Stripe B2B", "Custom Tiered Pricing"],
          description:
            "Exclusive ordering desk for five-star luxury boutique hotels, wellness spas, and private members clubs.",
          acceptanceCriteria:
            "Automated tax exempt compliance and bulk shipping documents generated.",
        },
      ],
    },
  ],
  "cyber-shield": [
    {
      phaseNumber: "01",
      phaseName: "Attack Surface Mapping",
      subtitle: "Threat Modeling & Topology",
      badge: "WEEK 01",
      leadRole: "Chief Information Security Officer",
      deliverables: [
        {
          id: "cs-01",
          name: "Comprehensive Attack Surface Discovery Report",
          format: "Automated Recon & Threat Matrix",
          cadence: "Day 3",
          stack: ["Amass", "Shodan API", "Nmap", "DNS Recon"],
          description:
            "Complete inventory of all exposed cloud IP addresses, subdomain takeovers, and open port vectors.",
          acceptanceCriteria:
            "100% of public cloud assets mapped; zero unmonitored external interfaces.",
        },
        {
          id: "cs-02",
          name: "Zero-Trust Perimeter RFC & SASE Architecture",
          format: "SASE Blueprint Spec",
          cadence: "Day 5",
          stack: ["Cloudflare Magic WAN", "WireGuard"],
          description:
            "Micro-segmented network blueprint enforcing strict mutual TLS and continuous identity verification.",
          acceptanceCriteria:
            "Signed off by enterprise security committee; zero implicit trust zones.",
        },
      ],
    },
    {
      phaseNumber: "02",
      phaseName: "Zero-Trust Cloud Mesh",
      subtitle: "SASE, HSM & FIDO2 Identity",
      badge: "WEEK 02",
      leadRole: "Principal Security Infrastructure Architect",
      deliverables: [
        {
          id: "cs-03",
          name: "Global WireGuard Mesh & Cloudflare SASE Core",
          format: "Terraform Infrastructure",
          cadence: "Day 9",
          stack: ["Terraform", "Cloudflare Zero Trust", "WireGuard"],
          description:
            "High-performance encrypted mesh connecting all enterprise cloud VPCs, Kubernetes pods, and edge nodes.",
          acceptanceCriteria:
            "Sub-10ms inter-region latency overhead; automated failover verified.",
        },
        {
          id: "cs-04",
          name: "Hardware Security Module (HSM) Vault Deployment",
          format: "HashiCorp Vault HSM Cluster",
          cadence: "Day 12",
          stack: ["HashiCorp Vault", "AWS CloudHSM", "FIPS 140-3"],
          description:
            "Zero static credentials; automated 60-minute secret rotation and cryptographic hardware root-of-trust.",
          acceptanceCriteria:
            "100% ephemeral database credentials; automated certificate lifecycle active.",
        },
      ],
    },
    {
      phaseNumber: "03",
      phaseName: "Red Team & eBPF",
      subtitle: "Adversarial Fuzzing & Kernel Telemetry",
      badge: "WEEK 03",
      leadRole: "Head of Red Team Emulation",
      deliverables: [
        {
          id: "cs-05",
          name: "Automated MITRE ATT&CK Penetration Test Suite",
          format: "Breach-and-Attack Simulation Harness",
          cadence: "Day 16",
          stack: ["Caldera", "Atomic Red Team", "Metasploit"],
          description:
            "140+ automated attack simulations evaluating lateral movement, credential dumping, and container escapes.",
          acceptanceCriteria:
            "100% of tested attacks detected and quarantined within < 15 seconds.",
        },
        {
          id: "cs-06",
          name: "eBPF Linux Kernel Threat Interceptor (Falco)",
          format: "eBPF Kernel Probes & Rules",
          cadence: "Day 19",
          stack: ["Falco", "eBPF", "Kubernetes DaemonSet"],
          description:
            "Sub-millisecond process execution tracking with automated memory core dumps on anomaly detection.",
          acceptanceCriteria: "Zero kernel panics; CPU overhead strictly bounded < 0.2%.",
        },
      ],
    },
    {
      phaseNumber: "04",
      phaseName: "SOC 2 & Cutover",
      subtitle: "Continuous Compliance & SecOps Hotline",
      badge: "WEEK 04",
      leadRole: "Staff Compliance & DevSecOps Lead",
      deliverables: [
        {
          id: "cs-07",
          name: "Continuous SOC 2 Type II Compliance Engine",
          format: "Vanta / Drata Evidence Automation",
          cadence: "Day 23",
          stack: ["Vanta API", "OpenFGA", "Auditd"],
          description:
            "Automated evidence extraction verifying encryption-at-rest, access reviews, and change management logs.",
          acceptanceCriteria:
            "100% compliance test pass rate; zero unresolved high-severity audit findings.",
        },
        {
          id: "cs-08",
          name: "24/7 SecOps War Room & Incident Response SLA",
          format: "Runbooks & PagerDuty Integration",
          cadence: "Day 26",
          stack: ["PagerDuty", "Sentry SecOps", "Slack Bot"],
          description:
            "Sub-15 minute critical incident response SLA with automated quarantine webhooks and forensic snapshots.",
          acceptanceCriteria: "Drill completed with sub-8 minute mean time to containment (MTTC).",
        },
      ],
    },
  ],
  "digital-agency": [
    {
      phaseNumber: "01",
      phaseName: "Discovery & Topology",
      subtitle: "System Architecture & Foundations",
      badge: "WEEK 01–02",
      leadRole: "Principal Architect",
      deliverables: [
        {
          id: "d-01",
          name: "System Architecture RFC & Data Topology",
          format: "RFC / Architecture Spec",
          cadence: "Day 3",
          stack: ["Next.js 15", "Turborepo", "Mermaid.js"],
          description:
            "Comprehensive blueprint identifying boundary contexts, state hydration pathways, edge-caching zones, and zero-layout-shift contracts.",
          acceptanceCriteria: "Signed off by client CTO; 100% boundary isolation verified.",
        },
        {
          id: "d-02",
          name: "Enterprise Threat & Security Model",
          format: "OWASP Threat Matrix",
          cadence: "Day 5",
          stack: ["OWASP ASVS", "Sentry", "TypeScript"],
          description:
            "Data-flow vulnerability analysis mapping out CSRF protection, CSP header hardening, and rate-limiting rules.",
          acceptanceCriteria: "Zero high/critical CVEs in automated dependencies scan.",
        },
      ],
    },
    {
      phaseNumber: "02",
      phaseName: "Design System & Tokens",
      subtitle: "Mathematical Scales & Primitives",
      badge: "WEEK 02–03",
      leadRole: "Design Systems Lead",
      deliverables: [
        {
          id: "d-03",
          name: "W3C Design Token Schema & Tailwind v4 Theme",
          format: "JSON Schema + CSS Variables",
          cadence: "Day 8",
          stack: ["Tailwind 4", "W3C Token Spec", "Figma Variables"],
          description:
            "Single-source-of-truth token dictionary controlling high-gamut OKLCH palettes, typographic clamp curves, and semantic radiuses.",
          acceptanceCriteria: "Automated pipeline compiling tokens to CSS, Swift, and Android XML.",
        },
        {
          id: "d-04",
          name: "Figma Variable Component Library (70+ Primitives)",
          format: "Figma Design System",
          cadence: "Day 12",
          stack: ["Figma Enterprise", "Auto Layout 5.0", "Variables"],
          description:
            "Fully interactive design kit with nested variants, auto-layout constraints, and tactile kinetic micro-interactions.",
          acceptanceCriteria: "WCAG 2.2 AAA contrast verified across both light and dark themes.",
        },
      ],
    },
    {
      phaseNumber: "03",
      phaseName: "Fullstack Engineering",
      subtitle: "Component Assembly & Kinetic Motion",
      badge: "WEEK 03–05",
      leadRole: "Staff Frontend Engineer",
      deliverables: [
        {
          id: "d-05",
          name: "React 19 Server Components Core",
          format: "Production Monorepo",
          cadence: "Day 16",
          stack: ["React 19", "Next.js 15", "TypeScript Strict"],
          description:
            "Zero client-side JS overhead on static prose and grids, fluid streaming SSR boundaries, and Server Actions for all mutations.",
          acceptanceCriteria: "TypeScript Strict Mode zero 'any' policy; 100% build green.",
        },
        {
          id: "d-06",
          name: "Framer Motion Physics & Spring Micro-Interactions",
          format: "Motion Choreography Files",
          cadence: "Day 21",
          stack: ["Motion 13", "CSS linear()", "IntersectionObserver"],
          description:
            "Tactile spring physics calibrated to 60fps locked frame rates, magnetic cursors, and layout transitions.",
          acceptanceCriteria: "MotionScore audit rating > 95; zero layout thrashing.",
        },
      ],
    },
    {
      phaseNumber: "04",
      phaseName: "Hardening & Cutover",
      subtitle: "Verification & Global Deployment",
      badge: "WEEK 05–06",
      leadRole: "QA & Performance Lead",
      deliverables: [
        {
          id: "d-07",
          name: "Core Web Vitals 100/100 Audit Suite",
          format: "Lighthouse CI & Synthetic Reports",
          cadence: "Day 26",
          stack: ["Lighthouse CI", "PageSpeed Insights", "Web Vitals API"],
          description:
            "Exhaustive performance optimization ensuring Largest Contentful Paint < 800ms, Cumulative Layout Shift 0.000, and INP < 50ms.",
          acceptanceCriteria: "Lighthouse 100/100 on standard mobile 4G throttle profiles.",
        },
        {
          id: "d-08",
          name: "Automated Playwright E2E Regression Suite",
          format: "Playwright Test Scripts",
          cadence: "Day 28",
          stack: ["Playwright", "GitHub Actions", "Docker"],
          description:
            "Cross-browser end-to-end tests validating keyboard focus traps, checkout funnels, and screen-reader VoiceOver compatibility.",
          acceptanceCriteria: "100% test suite green in CI with zero flaky retries.",
        },
      ],
    },
  ],
};

const PHASE_COLORS = [HB.lime, HB.cyan, HB.violet, "#FACC15"];

export const ProcessDeliverablesMatrix: React.FC<{
  nicheSlug?: string;
  title?: string;
  subtitle?: string;
}> = ({
  nicheSlug = "digital-agency",
  title = "Concrete deliverables shipped in every sprint",
  subtitle = "Every milestone produces production-ready code, interactive prototypes, and design tokens — zero fluff.",
}) => {
  const activeNicheKey = NICHE_PHASES[nicheSlug] ? nicheSlug : "digital-agency";
  const phases = NICHE_PHASES[activeNicheKey];

  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const currentPhase = phases[activePhaseIndex] || phases[0];

  return (
    <HbSection id="deliverables" tone="light">
      <HbHeader badge="Sprint Deliverables" title={title} subtitle={subtitle} />

      {/* 4 Phase Selector Cards */}
      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {phases.map((phase, idx) => {
          const isSelected = activePhaseIndex === idx;
          const accent = PHASE_COLORS[idx % PHASE_COLORS.length];
          return (
            <button
              key={phase.phaseNumber}
              type="button"
              onClick={() => setActivePhaseIndex(idx)}
              className={`flex cursor-pointer flex-col justify-between gap-4 rounded-[24px] border p-6 text-left transition-all duration-300 ${
                isSelected
                  ? "-translate-y-0.5 border-zinc-900 bg-zinc-900 text-white shadow-lg dark:border-white dark:bg-white dark:text-zinc-950"
                  : "border-black/[0.05] bg-[#F4F5F8] text-zinc-900 hover:border-zinc-400 dark:border-white/10 dark:bg-zinc-900 dark:text-white"
              }`}
            >
              <div className="flex w-full items-center justify-between">
                <span
                  className="rounded-full px-2.5 py-1 text-xs font-bold text-zinc-950"
                  style={{ background: accent }}
                >
                  Step {phase.phaseNumber}
                </span>
                <span
                  className={`text-xs font-medium ${
                    isSelected
                      ? "text-zinc-300 dark:text-zinc-600"
                      : "text-zinc-500 dark:text-zinc-400"
                  }`}
                >
                  {phase.badge}
                </span>
              </div>

              <div>
                <h4 className="text-lg font-semibold tracking-tight">{phase.phaseName}</h4>
                <p
                  className={`mt-0.5 text-xs ${
                    isSelected
                      ? "text-zinc-300 dark:text-zinc-600"
                      : "text-zinc-500 dark:text-zinc-400"
                  }`}
                >
                  {phase.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Phase Container */}
      <div className={`${HB.cardMuted} space-y-8 p-6 sm:p-10`}>
        {/* Phase Header + Pexels Preview Strip */}
        <div className="grid grid-cols-1 items-center gap-6 border-b border-black/[0.06] pb-8 lg:grid-cols-12 dark:border-white/10">
          <div className="flex items-center gap-4 lg:col-span-7">
            <img
              src={PEXELS.avatars[activePhaseIndex % PEXELS.avatars.length]}
              alt={currentPhase.leadRole}
              className="h-14 w-14 shrink-0 rounded-2xl object-cover ring-2 ring-[#C8F560]"
            />
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[color:var(--brand-primary,#7C3AED)]">
                <Sparkles className="h-3.5 w-3.5" /> Phase Lead: {currentPhase.leadRole}
              </div>
              <h3 className="mt-0.5 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                {currentPhase.phaseName} — {currentPhase.subtitle}
              </h3>
              <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                {currentPhase.deliverables.length} verified production deliverables included
              </p>
            </div>
          </div>

          <div className="relative h-28 overflow-hidden rounded-[20px] bg-zinc-900 lg:col-span-5">
            <HbImage
              src={PEXELS.projects[activePhaseIndex % PEXELS.projects.length]}
              alt={currentPhase.phaseName}
              fallbackIndex={activePhaseIndex}
              className="h-full w-full object-cover opacity-85"
            />
            <div className="absolute inset-0 flex items-center bg-gradient-to-r from-black/65 via-black/30 to-transparent px-5">
              <div className="text-white">
                <div className="text-xs font-semibold text-[#C8F560]">{currentPhase.badge}</div>
                <div className="mt-0.5 text-sm font-semibold">100% On-Time Milestone SLA</div>
              </div>
            </div>
          </div>
        </div>

        {/* Deliverable Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {currentPhase.deliverables.map((item, idx) => (
            <Reveal key={item.id} delay={idx * 0.06} y={16}>
              <div
                className={`${HB.card} flex h-full flex-col justify-between space-y-6 p-6 sm:p-8 ${HB.hoverLift}`}
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className={HB.brandChip}>
                      <Layers className="mr-1.5 h-3.5 w-3.5" />
                      {item.format}
                    </span>
                    <span className={HB.chip}>
                      <Clock className="mr-1 h-3.5 w-3.5 text-zinc-400" />
                      {item.cadence}
                    </span>
                  </div>

                  <h4 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                    {item.name}
                  </h4>

                  <p className={`text-sm leading-relaxed ${HB.ink2}`}>{item.description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.stack.map((s) => (
                      <span key={s} className={HB.chip}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-2.5 border-t border-black/[0.06] pt-4 dark:border-white/10">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#C8F560] text-zinc-950">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <p className="text-xs leading-relaxed font-medium text-zinc-700 dark:text-zinc-300">
                    {item.acceptanceCriteria}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </HbSection>
  );
};
