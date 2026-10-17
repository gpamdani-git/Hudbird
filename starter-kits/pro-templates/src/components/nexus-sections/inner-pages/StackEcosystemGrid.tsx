// starter-kits/pro-templates/src/components/nexus-sections/inner-pages/StackEcosystemGrid.tsx
"use client";

import React, { useState } from "react";
import { Reveal, PillLink } from "../ScrollReveal";
import {
  Layers,
  Cpu,
  Globe,
  Database,
  ShieldCheck,
  Zap,
  Copy,
  Check,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { PEXELS } from "../HudbirdVisualWidgets";
import { HB, HbSection, HbHeader, HbImage } from "../HudbirdKit";

interface IntegrationItem {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  version: string;
  compatibilityBadge: string;
  description: string;
  architectureRole: string;
  metrics: string;
  installSnippet: string;
}

const NICHE_INTEGRATIONS: Record<string, IntegrationItem[]> = {
  "fintech-protocol": [
    {
      id: "evm-l2",
      name: "Ethereum, Arbitrum & Base",
      category: "protocols",
      categoryLabel: "Chains & Rollups",
      version: "EVM Cancun+",
      compatibilityBadge: "Sub-4ms Settlement",
      description:
        "Non-custodial smart contracts deployed across Ethereum mainnet and high-throughput L2 rollups.",
      architectureRole: "Execution Settlement",
      metrics: "< $0.01 Gas Fee",
      installSnippet: "pnpm add viem wagmi @tanstack/react-query",
    },
    {
      id: "foundry",
      name: "Foundry & Forge Harness",
      category: "verification",
      categoryLabel: "Testing & Audits",
      version: "v0.2.0+",
      compatibilityBadge: "Invariant Fuzzing",
      description:
        "Automated property-based fuzzing and symbolic execution testing all protocol balance invariants.",
      architectureRole: "Formal Verification",
      metrics: "10k Fuzz Runs",
      installSnippet: "curl -L https://foundry.paradigm.xyz | bash",
    },
    {
      id: "safe-multisig",
      name: "Safe Multi-Sig & MPC",
      category: "custody",
      categoryLabel: "Institutional Custody",
      version: "v1.4.1 Core",
      compatibilityBadge: "Threshold Quorum",
      description:
        "Multi-party computation and multi-sig policy engine for institutional treasury allocations.",
      architectureRole: "Vault Custody",
      metrics: "$4.2B Protected",
      installSnippet: "pnpm add @safe-global/protocol-kit",
    },
    {
      id: "chainlink",
      name: "Chainlink CCIP & Oracles",
      category: "oracles",
      categoryLabel: "Cross-Chain Feeds",
      version: "v0.8+",
      compatibilityBadge: "Verified Price Feeds",
      description:
        "Sub-second on-chain price feeds and trust-minimized cross-chain liquidity routing.",
      architectureRole: "Oracle Network",
      metrics: "99.999% Uptime",
      installSnippet: "pnpm add @chainlink/contracts",
    },
    {
      id: "dune",
      name: "Dune Real-Time Indexer",
      category: "telemetry",
      categoryLabel: "On-Chain Analytics",
      version: "v2 SQL",
      compatibilityBadge: "Live APY & TVL",
      description:
        "Live on-chain indexer capturing liquidity pool depth, slippage variances, and treasury reserves.",
      architectureRole: "Public Telemetry",
      metrics: "Real-Time Blocks",
      installSnippet: "pnpm add @duneanalytics/client-sdk",
    },
    {
      id: "fireblocks",
      name: "Fireblocks Institutional API",
      category: "custody",
      categoryLabel: "Institutional Custody",
      version: "v2 SDK",
      compatibilityBadge: "SOC 2 Type II",
      description:
        "Direct API integration for programmatic multi-sig signing and automated treasury yield sweeps.",
      architectureRole: "Policy Engine",
      metrics: "Sub-10ms Signing",
      installSnippet: "pnpm add fireblocks-sdk",
    },
  ],
  "ai-copilot": [
    {
      id: "vllm",
      name: "vLLM Inference Engine",
      category: "inference",
      categoryLabel: "Model Serving",
      version: "v0.6.3+",
      compatibilityBadge: "PagedAttention",
      description:
        "High-throughput, low-latency LLM serving engine optimized for distributed H100 clusters.",
      architectureRole: "Serving Core",
      metrics: "Sub-20ms TTFT",
      installSnippet: "pip install vllm",
    },
    {
      id: "langgraph",
      name: "LangGraph Agent Mesh",
      category: "agents",
      categoryLabel: "Agent Workflows",
      version: "v0.2.0+",
      compatibilityBadge: "Deterministic Tools",
      description:
        "Stateful multi-actor agent workflows with human-in-the-loop approvals and instant state replay.",
      architectureRole: "Agent Orchestrator",
      metrics: "100% Traceable",
      installSnippet: "pnpm add @langchain/langgraph",
    },
    {
      id: "pinecone",
      name: "Hybrid Vector Index",
      category: "memory",
      categoryLabel: "Vector Memory",
      version: "Serverless v3",
      compatibilityBadge: "Semantic + BM25",
      description:
        "Sub-millisecond hybrid semantic and keyword retrieval across millions of enterprise documents.",
      architectureRole: "Knowledge Graph",
      metrics: "8ms P95 Query",
      installSnippet: "pnpm add @pinecone-database/pinecone",
    },
    {
      id: "triton",
      name: "NVIDIA Triton Server",
      category: "inference",
      categoryLabel: "Model Serving",
      version: "24.08+",
      compatibilityBadge: "Dynamic Batching",
      description:
        "Concurrent model execution and dynamic tensor batching across multi-GPU inference nodes.",
      architectureRole: "GPU Runtime",
      metrics: "4.2x Throughput",
      installSnippet: "docker pull nvcr.io/nvidia/tritonserver",
    },
    {
      id: "ai-sdk",
      name: "Streaming UI SDK",
      category: "frontend",
      categoryLabel: "Streaming UI",
      version: "v4.0+",
      compatibilityBadge: "Generative UI",
      description:
        "React 19 streaming hooks rendering live tool calls, interactive widgets, and structured citations.",
      architectureRole: "Client Surface",
      metrics: "60fps Stream",
      installSnippet: "pnpm add ai @ai-sdk/react",
    },
    {
      id: "openfga",
      name: "OpenFGA Fine-Grained Auth",
      category: "security",
      categoryLabel: "Access Control",
      version: "v1.6+",
      compatibilityBadge: "Zanzibar ACLs",
      description:
        "Document-level permission checks ensuring AI agents only retrieve authorized context per user.",
      architectureRole: "Security Guard",
      metrics: "< 3ms Auth Check",
      installSnippet: "pnpm add @openfga/sdk",
    },
  ],
  "alunara-wellness": [
    {
      id: "hydrogen",
      name: "Shopify Hydrogen Storefront",
      category: "commerce",
      categoryLabel: "Headless Commerce",
      version: "2026.1+",
      compatibilityBadge: "Global Edge SSR",
      description:
        "Sub-second luxury storefront with localized currencies, VIP subscriptions, and instant checkout.",
      architectureRole: "Digital Atelier",
      metrics: "380ms Global LCP",
      installSnippet: "pnpm create @shopify/hydrogen@latest",
    },
    {
      id: "sanity",
      name: "Sanity Editorial Studio",
      category: "content",
      categoryLabel: "Editorial CMS",
      version: "v3 Studio",
      compatibilityBadge: "Live Visual Editing",
      description:
        "Real-time structured storytelling for botanical provenance, ritual guides, and clinical journals.",
      architectureRole: "Content Graph",
      metrics: "Instant Preview",
      installSnippet: "pnpm add next-sanity @sanity/vision",
    },
    {
      id: "klaviyo",
      name: "Klaviyo Ritual Concierge",
      category: "crm",
      categoryLabel: "Member Concierge",
      version: "v2026 API",
      compatibilityBadge: "Personalized Flows",
      description:
        "Automated replenishment reminders and bespoke skin-ritual sequences tailored to each patron.",
      architectureRole: "Retention Engine",
      metrics: "+48% Repeat LTV",
      installSnippet: "pnpm add klaviyo-api",
    },
    {
      id: "biosuisse",
      name: "Provenance Batch Ledger",
      category: "traceability",
      categoryLabel: "Lab Traceability",
      version: "ISO-16128",
      compatibilityBadge: "QR Batch Lookup",
      description:
        "Every glass vessel links directly to its harvest origin, GC-MS purity assay, and formulation date.",
      architectureRole: "Lab Verification",
      metrics: "100% Traceable",
      installSnippet: "pnpm add @hudbird/provenance-sdk",
    },
    {
      id: "stripe",
      name: "Apple Pay & Global Checkout",
      category: "commerce",
      categoryLabel: "Headless Commerce",
      version: "Elements v4",
      compatibilityBadge: "One-Tap Luxury Checkout",
      description:
        "Frictionless multi-currency checkout with duties pre-calculation across 42 countries.",
      architectureRole: "Payment Rail",
      metrics: "+29% Checkout Conv",
      installSnippet: "pnpm add @stripe/stripe-js",
    },
    {
      id: "threejs",
      name: "Interactive 3D Vessel Viewer",
      category: "experience",
      categoryLabel: "3D Product Showcase",
      version: "R3F v9",
      compatibilityBadge: "PBR Glass Shaders",
      description:
        "Tactile 60fps 3D amber-glass bottle inspection with realistic refraction and botanical notes.",
      architectureRole: "Visual Showcase",
      metrics: "60fps Mobile",
      installSnippet: "pnpm add three @react-three/fiber",
    },
  ],
  "cyber-shield": [
    {
      id: "falco-ebpf",
      name: "Falco eBPF Kernel Sensor",
      category: "runtime",
      categoryLabel: "Kernel Telemetry",
      version: "v0.39+",
      compatibilityBadge: "Zero-Overhead Ring Buffer",
      description:
        "Real-time Linux syscall inspection detecting container escapes and privilege escalation in sub-ms.",
      architectureRole: "Runtime Sensor",
      metrics: "< 0.4% CPU Load",
      installSnippet: "helm install falco falcosecurity/falco",
    },
    {
      id: "cloudflare-wan",
      name: "Zero-Trust Magic WAN",
      category: "network",
      categoryLabel: "Edge Perimeter",
      version: "Anycast v4",
      compatibilityBadge: "310+ Edge Cities",
      description:
        "Hardware-authenticated micro-segmentation and L7 DDoS scrubbing across every global office and cloud.",
      architectureRole: "Network Mesh",
      metrics: "0ms Added Latency",
      installSnippet: "terraform apply -target=module.zero_trust",
    },
    {
      id: "vault",
      name: "HashiCorp Vault & CloudHSM",
      category: "cryptography",
      categoryLabel: "Secrets & Keys",
      version: "v1.18 Ent",
      compatibilityBadge: "FIPS 140-3 Level 3",
      description:
        "Dynamic short-lived credentials, automated PKI certificate rotation, and hardware-backed encryption.",
      architectureRole: "Key Management",
      metrics: "Auto-Rotate 15m",
      installSnippet: "pnpm add node-vault",
    },
    {
      id: "crowdstrike",
      name: "Falcon XDR Telemetry Bridge",
      category: "runtime",
      categoryLabel: "Endpoint Defense",
      version: "Falcon API v2",
      compatibilityBadge: "Automated Quarantine",
      description:
        "Bi-directional streaming bridge correlating endpoint anomalies with cloud identity logs.",
      architectureRole: "XDR Correlation",
      metrics: "Sub-2s Isolation",
      installSnippet: "pnpm add crowdstrike-falcon-sdk",
    },
    {
      id: "opa",
      name: "Open Policy Agent (OPA)",
      category: "compliance",
      categoryLabel: "Policy-as-Code",
      version: "Rego v1",
      compatibilityBadge: "CI/CD Gatekeeper",
      description:
        "Declarative policy enforcement blocking misconfigured Kubernetes manifests before deployment.",
      architectureRole: "Admission Guard",
      metrics: "100% Policy Audit",
      installSnippet: "brew install opa",
    },
    {
      id: "siem",
      name: "ClickHouse Security Lake",
      category: "telemetry",
      categoryLabel: "Log Analytics",
      version: "v24.8+",
      compatibilityBadge: "Petabyte Scale",
      description:
        "High-compression columnar telemetry engine querying billions of security events in milliseconds.",
      architectureRole: "Threat Data Lake",
      metrics: "120M Events/sec",
      installSnippet: "pnpm add @clickhouse/client",
    },
  ],
  "digital-agency": [
    {
      id: "nextjs-react",
      name: "React 19 & Next.js App Router",
      category: "frontend",
      categoryLabel: "Frontend Core",
      version: "v19 / v15",
      compatibilityBadge: "Server Actions & SSR",
      description:
        "Streaming server components, zero-bundle client islands, and instant route prefetching.",
      architectureRole: "Application Core",
      metrics: "100/100 Lighthouse",
      installSnippet: "pnpm add react react-dom next",
    },
    {
      id: "tailwind-v4",
      name: "Tailwind CSS v4 Design Tokens",
      category: "design",
      categoryLabel: "Styling & Tokens",
      version: "v4.0 Engine",
      compatibilityBadge: "CSS-First Variables",
      description:
        "Sub-millisecond Rust Oxide CSS compiler with semantic dark/light theme tokens and zero runtime cost.",
      architectureRole: "Design System",
      metrics: "< 8kB Gzipped CSS",
      installSnippet: "pnpm add tailwindcss @tailwindcss/vite",
    },
    {
      id: "framer-motion",
      name: "Motion 13 Hardware Springs",
      category: "motion",
      categoryLabel: "Interactive Motion",
      version: "v13.2+",
      compatibilityBadge: "120fps WAAPI Engine",
      description:
        "Hardware-accelerated layout transitions, scroll-linked reveals, and tactile micro-interactions.",
      architectureRole: "Kinetic Engine",
      metrics: "Locked 60/120fps",
      installSnippet: "pnpm add framer-motion",
    },
    {
      id: "typescript",
      name: "TypeScript & Zod Contracts",
      category: "verification",
      categoryLabel: "Type Safety",
      version: "v5.7 Strict",
      compatibilityBadge: "End-to-End Schemas",
      description:
        "Strict compile-time and runtime schema validation across every component prop and API payload.",
      architectureRole: "Schema Contract",
      metrics: "Zero Runtime Any",
      installSnippet: "pnpm add zod typescript",
    },
    {
      id: "vercel-cloudflare",
      name: "Global Edge CDN & Workers",
      category: "infrastructure",
      categoryLabel: "Cloud Edge",
      version: "Edge Network",
      compatibilityBadge: "300+ Global POPs",
      description:
        "Instant global asset delivery, image optimization, and zero-cold-start edge middleware.",
      architectureRole: "Global Delivery",
      metrics: "14ms Global TTFB",
      installSnippet: "pnpm dlx wrangler deploy",
    },
    {
      id: "playwright",
      name: "Playwright Visual QA Suite",
      category: "verification",
      categoryLabel: "Automated QA",
      version: "v1.49+",
      compatibilityBadge: "Cross-Browser CI",
      description:
        "Automated end-to-end user journey tests and responsive viewport checks on every pull request.",
      architectureRole: "Quality Gate",
      metrics: "100% Pass Rate",
      installSnippet: "pnpm add -D @playwright/test",
    },
  ],
};

const NICHE_SECTORS: Record<string, { title: string; desc: string; image: string }[]> = {
  "fintech-protocol": [
    {
      title: "Institutional Treasuries",
      desc: "Multi-sig custody, automated yield sweeps, and real-time risk telemetry.",
      image: PEXELS.villaExterior1,
    },
    {
      title: "Global Payment Rails",
      desc: "Instant cross-border settlement with sub-cent fees and full compliance.",
      image: PEXELS.villaHero,
    },
    {
      title: "Digital Asset Funds",
      desc: "Deep liquidity routing, formal verification, and transparent audit trails.",
      image: PEXELS.villaExterior2,
    },
  ],
  "ai-copilot": [
    {
      title: "Enterprise Knowledge Hubs",
      desc: "Private RAG search across millions of internal docs with strict ACLs.",
      image: PEXELS.neuralSculpture,
    },
    {
      title: "Autonomous Support Pods",
      desc: "Multi-agent workflows resolving customer tickets with human-in-the-loop.",
      image: PEXELS.vrPortrait,
    },
    {
      title: "Engineering Copilots",
      desc: "Sub-20ms code generation, PR review, and automated test synthesis.",
      image: PEXELS.abstract3D_1,
    },
  ],
  "alunara-wellness": [
    {
      title: "Luxury Spas & Sanctuaries",
      desc: "Bespoke cabin formulations and sensory treatment protocols for five-star resorts.",
      image: PEXELS.wellness1,
    },
    {
      title: "Botanical Flagship Boutiques",
      desc: "Architectural retail spaces with interactive skin diagnostics and refill bars.",
      image: PEXELS.wellness2,
    },
    {
      title: "Longevity Clinics",
      desc: "Clinically validated cellular nutrition and circadian recovery programs.",
      image: PEXELS.wellness3,
    },
  ],
  "cyber-shield": [
    {
      title: "Cloud-Native FinTech",
      desc: "Zero-trust micro-segmentation and continuous SOC 2 / PCI-DSS compliance.",
      image: PEXELS.abstract3D_2,
    },
    {
      title: "Critical Infrastructure",
      desc: "Hardware-authenticated perimeters and sub-millisecond threat containment.",
      image: PEXELS.abstract3D_3,
    },
    {
      title: "Global Enterprise SaaS",
      desc: "24/7 autonomous red-team validation and unified XDR telemetry.",
      image: PEXELS.project1,
    },
  ],
  "digital-agency": [
    {
      title: "High-Growth SaaS & AI",
      desc: "Category-defining product interfaces, design systems, and conversion-focused web platforms.",
      image: PEXELS.villaExterior1,
    },
    {
      title: "Fintech & PropTech Leaders",
      desc: "High-trust dashboards, real-time analytics widgets, and frictionless onboarding.",
      image: PEXELS.villaHero,
    },
    {
      title: "Luxury & Hospitality Brands",
      desc: "Immersive editorial storytelling, 3D showcases, and ultra-fast headless commerce.",
      image: PEXELS.villaExterior2,
    },
  ],
};

const ACCENT_COLORS = [HB.lime, HB.cyan, HB.violet, "#FACC15"];
const ICONS = [Layers, Cpu, Globe, Database, ShieldCheck, Zap];

export const StackEcosystemGrid: React.FC<{
  nicheSlug?: string;
  title?: string;
  subtitle?: string;
}> = ({
  nicheSlug = "digital-agency",
  title = "Seamless integrations across your modern stack",
  subtitle = "Connect your favorite tools, APIs, and cloud infrastructure in minutes with zero vendor lock-in.",
}) => {
  const activeNicheKey = NICHE_INTEGRATIONS[nicheSlug] ? nicheSlug : "digital-agency";
  const integrations = NICHE_INTEGRATIONS[activeNicheKey];
  const sectors = NICHE_SECTORS[activeNicheKey] || NICHE_SECTORS["digital-agency"];

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ["all", ...Array.from(new Set(integrations.map((i) => i.category)))];
  const filteredIntegrations =
    activeCategory === "all"
      ? integrations
      : integrations.filter((item) => item.category === activeCategory);

  const handleCopy = (id: string, snippet: string) => {
    navigator.clipboard.writeText(snippet);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      {/* SECTION 1: Screenshot 2 Style — "Integration / Industries we serve" Frosted Glass Pexels Cards */}
      <HbSection tone="dark">
        <HbHeader
          badge="Integration"
          title="Industries & ecosystems we power"
          subtitle="We deliver tailored solutions that meet the unique needs of each sector — adapting fast and driving measurable results."
          tone="dark"
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector, i) => (
            <Reveal key={sector.title} delay={i * 0.08} y={24}>
              <div className="group relative aspect-[4/4.4] overflow-hidden rounded-[28px] bg-zinc-800">
                <HbImage
                  src={sector.image}
                  alt={sector.title}
                  fallbackIndex={i}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                {/* Frosted Glass Bottom Overlay (Exact match to Screenshot 2) */}
                <div className="absolute inset-x-3.5 bottom-3.5 rounded-2xl border border-white/60 bg-white/70 px-6 py-5 text-center text-zinc-900 backdrop-blur-xl transition-all duration-300 group-hover:bg-white/85">
                  <h3 className="text-xl font-medium tracking-tight text-zinc-950 sm:text-2xl">
                    {sector.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-zinc-700 sm:text-sm">
                    {sector.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </HbSection>

      {/* SECTION 2: Interactive Ecosystem & SDK Cards Grid */}
      <HbSection id="ecosystem" tone="muted">
        <HbHeader badge="Tech Stack & APIs" title={title} subtitle={subtitle} />

        {/* Filter Pills */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => {
            const active = activeCategory === cat;
            const label =
              cat === "all"
                ? `All Integrations (${integrations.length})`
                : integrations.find((i) => i.category === cat)?.categoryLabel || cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
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

        {/* 3-Column Rounded-[28px] Widget Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredIntegrations.map((item, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            const accent = ACCENT_COLORS[idx % ACCENT_COLORS.length];
            return (
              <Reveal key={item.id} delay={idx * 0.06} y={20}>
                <div
                  className={`${HB.card} flex h-full flex-col justify-between p-6 sm:p-7 ${HB.hoverLift}`}
                >
                  <div className="space-y-5">
                    {/* Top Icon + Status Pill */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3.5">
                        <span
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-zinc-950 shadow-sm"
                          style={{ background: accent }}
                        >
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                            {item.categoryLabel}
                          </span>
                          <h3 className="text-lg leading-snug font-semibold text-zinc-900 dark:text-white">
                            {item.name}
                          </h3>
                        </div>
                      </div>
                      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        {item.version}
                      </span>
                    </div>

                    <p className={`text-sm leading-relaxed ${HB.ink2}`}>{item.description}</p>

                    {/* Mini Metric & Role Strip */}
                    <div className="grid grid-cols-2 gap-3 rounded-2xl border border-black/[0.04] bg-[#F4F5F8] p-3.5 dark:border-white/[0.06] dark:bg-zinc-950/70">
                      <div>
                        <div className="text-[11px] text-zinc-500 dark:text-zinc-400">Role</div>
                        <div className="mt-0.5 text-xs font-semibold text-zinc-900 dark:text-white">
                          {item.architectureRole}
                        </div>
                      </div>
                      <div>
                        <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                          Benchmark
                        </div>
                        <div className="mt-0.5 text-xs font-semibold text-[color:var(--brand-primary,#7C3AED)] tabular-nums">
                          {item.metrics}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Copy Pill */}
                  <div className="mt-5 border-t border-black/[0.06] pt-4 dark:border-white/10">
                    <div className="flex items-center justify-between rounded-xl bg-zinc-950 px-3.5 py-2 text-xs text-zinc-200">
                      <code className="truncate pr-2 text-[11px] text-[#C8F560]">
                        {item.installSnippet}
                      </code>
                      <button
                        type="button"
                        onClick={() => handleCopy(item.id, item.installSnippet)}
                        className="shrink-0 cursor-pointer rounded-lg bg-white/10 p-1.5 text-white transition-colors hover:bg-white/20"
                        title="Copy command"
                      >
                        {copiedId === item.id ? (
                          <Check className="h-3.5 w-3.5 text-[#C8F560]" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom Custom API Banner */}
        <Reveal delay={0.2} y={20}>
          <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-[32px] border border-black/[0.06] bg-white p-7 sm:p-10 lg:flex-row lg:items-center dark:border-white/10 dark:bg-zinc-900">
            <div className="max-w-2xl space-y-2">
              <span className={HB.brandChip}>
                <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Custom Webhooks & Adapters
              </span>
              <h3 className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl dark:text-white">
                Need a custom integration with your internal API or private cloud?
              </h3>
              <p className={`text-sm ${HB.ink2}`}>
                Our engineering team builds bespoke connectors, real-time webhooks, and SSO security
                bridges in days.
              </p>
            </div>
            <PillLink href={`/demos/${nicheSlug}/contact`} variant="brand" size="md">
              Request custom integration
            </PillLink>
          </div>
        </Reveal>
      </HbSection>
    </>
  );
};
