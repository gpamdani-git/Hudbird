// starter-kits/pro-templates/src/components/nexus-sections/inner-pages/domainContent.ts
// Exhaustive domain intelligence and content dictionary for all 5 flagship niches.
// Adheres strictly to UI/UX Pro Max guidelines: zero AI slop, verified domain terminology,
// tailored telemetry metrics, and authentic deliverables.

export interface NicheHeroContent {
  title: string;
  subtitle: string;
  description: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  metrics: [
    { value: string; label: string; subtext: string },
    { value: string; label: string; subtext: string },
    { value: string; label: string; subtext: string },
    { value: string; label: string; subtext: string },
  ];
}

export interface DomainProjectItem {
  id: string;
  title: string;
  client: string;
  category: string;
  categoryFilter: "primary" | "secondary" | "enterprise" | "core";
  year: string;
  metrics: { label: string; value: string };
  impactHeadline: string;
  image: string;
  stackTags: string[];
  deliverablesSummary: string;
}

export interface DomainChangelogItem {
  version: string;
  badge: "LATEST" | "STABLE" | "SECURITY";
  date: string;
  headline: string;
  summary: string;
  changes: Array<{
    type: "feature" | "perf" | "security" | "fix";
    title: string;
    description: string;
    commitSha?: string;
  }>;
  diffCode?: string;
}

export interface DomainBlogPostItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: {
    name: string;
    role: string;
  };
  imagePreset: string;
  featured?: boolean;
  contentQuote?: string;
  section1Title?: string;
  section1Body?: string;
  section2Title?: string;
  section2Body?: string;
}

export interface DomainPortalData {
  sprintTitle: string;
  hudBadge: string;
  activeMetrics: [
    { label: string; value: string; subtext: string },
    { label: string; value: string; subtext: string },
    { label: string; value: string; subtext: string },
    { label: string; value: string; subtext: string },
  ];
  deliverables: Array<{
    id: string;
    title: string;
    phase: string;
    status: "Shipped" | "In Review" | "In Progress";
    signedOff: boolean;
  }>;
}

export interface DomainContactData {
  headline: string;
  subtext: string;
  email: string;
  channel: string;
  workstreams: string[];
  submitButtonText: string;
}

export interface DomainAboutData {
  title: string;
  subtitle: string;
  description: string;
  philosophyTag: string;
  philosophyHeading: string;
  philosophyAccentWord: string;
  philosophyParagraph1: string;
  philosophyParagraph2: string;
  metrics: [
    { value: string; label: string; subtext: string },
    { value: string; label: string; subtext: string },
    { value: string; label: string; subtext: string },
    { value: string; label: string; subtext: string },
  ];
}

// ============================================================================
// 1. FINTECH PROTOCOL (Aura Protocol - Web3 Treasury & Yield)
// ============================================================================
export const FINTECH_CONTENT = {
  process: {
    title: "Cryptographic Protocol Lifecycle & Formal Verification",
    subtitle: "Mathematical Rigor & Solvency",
    description:
      "Our 5-gate protocol deployment pipeline pairs continuous formal verification with real-time Chainlink Proof-of-Reserves to eliminate counterparty and smart contract risk.",
    primaryCtaText: "Review Security Audit",
    secondaryCtaText: "Explore Protocol Gates",
    metrics: [
      { value: "100%", label: "Formal Verification", subtext: "Certora mathematical specs" },
      { value: "$0.00", label: "Historical Slashing", subtext: "Zero liquidation failures" },
      { value: "0.8s", label: "Settlement Finality", subtext: "Sub-second L2 execution" },
      { value: "24/7", label: "Proof of Reserves", subtext: "Chainlink live telemetry" },
    ],
  } as NicheHeroContent,

  services: {
    title: "Institutional Treasury Infrastructure & Liquidity Vaults",
    subtitle: "Enterprise DeFi Capabilities",
    description:
      "From automated delta-neutral yield harvesting to zero-knowledge travel rule compliance and custom Fireblocks multi-sig routing.",
    primaryCtaText: "Explore Vault Tiers",
    secondaryCtaText: "Treasury Calculator",
    metrics: [
      { value: "$8.4B+", label: "Settled Volume", subtext: "Verified on-chain transactions" },
      { value: "<12ms", label: "Orderbook Latency", subtext: "Private liquidity mempool" },
      { value: "100%", label: "MPC Custody", subtext: "Hardware isolation standards" },
      { value: "0.02%", label: "Max Price Slippage", subtext: "Atomic curve execution" },
    ],
  } as NicheHeroContent,

  pricing: {
    title: "Transparent Basis-Point Tiers & Custody Allocations",
    subtitle: "Zero Hidden Spreads",
    description:
      "Pay purely on institutional capital deployed with transparent tier discounts, zero exit lockups, and complete multi-sig sovereignty.",
    primaryCtaText: "Connect Custody Desk",
    secondaryCtaText: "Compare Fee Schedule",
    metrics: [
      { value: "15 bps", label: "Base Management", subtext: "Decreases with volume" },
      { value: "0 bps", label: "Exit / Withdrawal", subtext: "Instant liquidity access" },
      { value: "100%", label: "Audited Yield", subtext: "On-chain verifiable returns" },
      { value: "24/7", label: "Dedicated Desk", subtext: "Real-time Telegram & Signal" },
    ],
  } as NicheHeroContent,

  projects: [
    {
      id: "fintech-p1",
      title: "Kroma Institutional Vault V3",
      client: "Kroma Labs AG",
      category: "Autonomous Yield Harvesting",
      categoryFilter: "primary",
      year: "2026",
      metrics: { label: "Net APY Delivered", value: "+14.8%" },
      impactHeadline: "Sub-second execution for $850M institutional decentralized liquidity.",
      image: "kroma-fintech",
      stackTags: ["Solidity 0.8.26", "Foundry", "Certora", "Safe Multi-Sig"],
      deliverablesSummary: "Automated Rebalancing Vault, Slashing Circuit Breaker, Chainlink PoR.",
    },
    {
      id: "fintech-p2",
      title: "Strata Sovereign Reserve Protocol",
      client: "Strata Foundation",
      category: "Cross-Chain Liquidity Mesh",
      categoryFilter: "secondary",
      year: "2026",
      metrics: { label: "Assets Under Shield", value: "$420M" },
      impactHeadline: "Zero-slippage cross-chain rebalancing using Chainlink CCIP bridges.",
      image: "aura-hardware",
      stackTags: ["Chainlink CCIP", "Arbitrum Orbit", "Rust", "Ethers.js"],
      deliverablesSummary: "Atomic Bridging Router, Liquidity Pool Contracts, Slippage Guard.",
    },
    {
      id: "fintech-p3",
      title: "Apex Horizon Treasury Terminal",
      client: "Horizon Capital",
      category: "Institutional Orderbook & Swaps",
      categoryFilter: "enterprise",
      year: "2025",
      metrics: { label: "Orderbook Latency", value: "< 18ms" },
      impactHeadline:
        "MEV-protected private mempool routing for high-frequency algorithmic market makers.",
      image: "synapse-ai",
      stackTags: ["Next.js 15", "WebSockets", "Flashbots Protect", "Tailwind 4"],
      deliverablesSummary: "Real-time Depth Chart, Private RPC Router, Sub-second Execution.",
    },
    {
      id: "fintech-p4",
      title: "ZK Regulatory Passport Engine",
      client: "Zurich Digital Custody",
      category: "Zero-Knowledge Travel Rule",
      categoryFilter: "core",
      year: "2025",
      metrics: { label: "Audit Verification", value: "100%" },
      impactHeadline:
        "Cryptographic proof of accreditation and KYC compliance without revealing underlying balances.",
      image: "vesper-commerce",
      stackTags: ["Circom", "SnarkJS", "Solidity", "TypeScript"],
      deliverablesSummary: "zk-SNARK Verifier Contract, Compliance API Gateway, Travel Rule Mesh.",
    },
  ] as DomainProjectItem[],

  changelog: [
    {
      version: "v4.2.0",
      badge: "LATEST",
      date: "October 16, 2026",
      headline: "Multi-Vault Allocation Engine & Chainlink CCIP v2 Bridge",
      summary:
        "Activated autonomous cross-chain rebalancing contracts with sub-second settlement, automated delta-neutral yield harvesting, and Fireblocks MPC API v3.",
      changes: [
        {
          type: "feature",
          title: "Isolated Sovereign Vaults with Multi-Sig Ownership",
          description:
            "Clients can now deploy dedicated ERC-4626 vault contracts governed solely by their institutional signing keys.",
          commitSha: "f8a12c4",
        },
        {
          type: "security",
          title: "Formal Verification via Certora Prover",
          description:
            "Mathematically proved that insolvency invariants cannot be violated under any extreme market liquidation cascades.",
          commitSha: "9c3e7b1",
        },
        {
          type: "perf",
          title: "Calldata Gas Optimization (-38%)",
          description:
            "Compressed on-chain batch settlement calls using assembly transient storage (EIP-1153).",
          commitSha: "2d1f90a",
        },
      ],
      diffCode: `// contracts/vaults/AuraIsolatedVault.sol
+ function rebalanceWithProof(bytes calldata proof, bytes32 stateRoot) 
+     external onlyMultisig nonReentrant returns (uint256 deltaYield) {
+     require(IVerifier(zkVerifier).verify(proof, stateRoot), "INVALID_ZK_PROOF");
+     return _executeDeltaNeutralHarvest();
+ }`,
    },
    {
      version: "v4.1.0",
      badge: "STABLE",
      date: "September 20, 2026",
      headline: "Zero-Knowledge Travel Rule Passport & Sanctions Oracle",
      summary:
        "Integrated automated zk-KYC compliance verification allowing cross-border institutional fund movement without public address balance exposure.",
      changes: [
        {
          type: "feature",
          title: "zk-SNARK Identity Verifiers",
          description:
            "Instant accreditation validation compliant with Swiss FINMA and EU MiCA regulations.",
          commitSha: "7b4d1a0",
        },
        {
          type: "security",
          title: "Automated Flash Crash Circuit Breaker",
          description:
            "Halt deposits and re-route collateral to cold storage if oracle spread exceeds 150 basis points.",
          commitSha: "4a2e8c9",
        },
      ],
    },
  ] as DomainChangelogItem[],

  blog: [
    {
      id: "fintech-b1",
      slug: "mathematical-invariants-in-autonomous-vaults",
      title: "Mathematical Invariants in Autonomous Vault Design (ERC-4626)",
      excerpt:
        "How we eliminate smart contract vulnerabilities by proving insolvency impossible using formal methods and symbolic execution before mainnet deployment.",
      category: "CRYPTOGRAPHIC RESEARCH",
      readTime: "9 MIN READ",
      date: "October 14, 2026",
      author: { name: "Dr. Julian Thorne", role: "Chief Cryptographer" },
      imagePreset: "kroma-fintech",
      featured: true,
      contentQuote:
        "“In DeFi treasury management, unit tests only prove what you anticipate. Formal verification proves what you couldn't imagine.”",
      section1Title: "1. The Limit of Traditional Unit Testing in High-TVL Systems",
      section1Body:
        "Traditional testing relies on developer intuition to craft edge cases. For a protocol managing hundreds of millions in digital assets, combinatorial explosion makes manual edge testing inadequate. Certora formal verification mathematically explores all possible state transitions against invariant rules.",
      section2Title: "2. Transient Storage & EIP-1153 Gas Efficiency",
      section2Body:
        "With Ethereum's Dencun upgrade and EIP-1153, reentrancy guards and intra-transaction accounting no longer require persistent SSTORE operations, dropping batch rebalancing overhead by over 38%.",
    },
    {
      id: "fintech-b2",
      slug: "zk-compliance-and-institutional-privacy",
      title: "Zero-Knowledge Proofs for Travel Rule Compliance",
      excerpt:
        "Demonstrating institutional accreditation and source-of-wealth compliance without revealing corporate wallet balances or transaction history to public ledgers.",
      category: "REGULATORY ARCHITECTURE",
      readTime: "6 MIN READ",
      date: "September 28, 2026",
      author: { name: "Amara Kalu", role: "Head of Custody & Security" },
      imagePreset: "aura-hardware",
    },
    {
      id: "fintech-b3",
      slug: "mev-protection-and-atomic-settlement",
      title: "Eliminating Sandwich Attacks with Private Mempools",
      excerpt:
        "Why institutional treasury swaps must route through encrypted Flashbots RPCs to prevent predatory MEV searchers from siphoning basis points.",
      category: "EXECUTION SYSTEMS",
      readTime: "7 MIN READ",
      date: "August 19, 2026",
      author: { name: "Viktor Orlov", role: "Lead Smart Contract Auditor" },
      imagePreset: "synapse-ai",
    },
  ] as DomainBlogPostItem[],

  portal: {
    sprintTitle: "Active Treasury Vault Telemetry · Mainnet Node #04",
    hudBadge: "AUTHENTICATED INSTITUTIONAL CONSOLE",
    activeMetrics: [
      { label: "Total Asset Value", value: "$420.4M", subtext: "Audited across 4 vaults" },
      { label: "Current Blended APY", value: "14.82%", subtext: "Delta-neutral compounded" },
      { label: "Historical Slashing", value: "0.00%", subtext: "100% principal protected" },
      { label: "Proof of Reserve", value: "100%", subtext: "Chainlink live attestation" },
    ],
    deliverables: [
      {
        id: "ft-1",
        title: "Dedicated ERC-4626 Vault Smart Contract",
        phase: "Deployment Gate",
        status: "Shipped",
        signedOff: true,
      },
      {
        id: "ft-2",
        title: "Certora Mathematical Invariant Formal Audit",
        phase: "Verification Gate",
        status: "Shipped",
        signedOff: true,
      },
      {
        id: "ft-3",
        title: "Fireblocks MPC Custody Key Policy Binding",
        phase: "Custody Gate",
        status: "Shipped",
        signedOff: true,
      },
      {
        id: "ft-4",
        title: "Chainlink Proof-of-Reserves Oracle Pipeline",
        phase: "Telemetry Gate",
        status: "Shipped",
        signedOff: false,
      },
      {
        id: "ft-5",
        title: "Emergency Multi-Sig Timelock Circuit Breaker",
        phase: "Hardening Gate",
        status: "In Review",
        signedOff: false,
      },
    ],
  } as DomainPortalData,

  contact: {
    headline: "Speak directly with our Treasury Principals.",
    subtext:
      "We review institutional parameters, regulatory requirements, and custody architecture within 2 hours. Strict non-disclosure agreements in place.",
    email: "treasury@aura-protocol.fi",
    channel: "#aura-institutional-desk",
    workstreams: [
      "Institutional Yield Vault",
      "Formal Verification Audit",
      "MPC Custody Integration",
      "Zero-Knowledge Compliance",
      "Cross-Chain CCIP Bridge",
    ],
    submitButtonText: "Submit Institutional Inquiry",
  } as DomainContactData,

  about: {
    title: "Cryptographic Restraint. Sovereign Capital.",
    subtitle: "About Aura Protocol",
    description:
      "We are an institutional research and protocol engineering lab. We eliminate financial middlemen through immutable mathematical contracts and zero-knowledge privacy.",
    philosophyTag: "PROTOCOL MANIFESTO",
    philosophyHeading: "Engineered for mathematical certainty. Backed by absolute",
    philosophyAccentWord: "solvency",
    philosophyParagraph1:
      "Traditional finance relies on opaque balance sheets and counterparty trust. Aura Protocol replaces subjective trust with immutable code, zero-knowledge proofs, and real-time verifiable reserves.",
    philosophyParagraph2:
      "Headquartered in Zurich, our engineering team consists of former university cryptography researchers, high-frequency quant architects, and audited smart contract authors who have secured billions in on-chain assets.",
    metrics: [
      { value: "2024", label: "Protocol Founded", subtext: "Zurich Cryptography Lab" },
      { value: "$8.4B+", label: "Total Settled", subtext: "Zero liquidation failures" },
      { value: "100%", label: "Open Audits", subtext: "Certora & OpenZeppelin" },
      { value: "0", label: "Counterparty Debt", subtext: "100% on-chain collateral" },
    ],
  } as DomainAboutData,
};

// ============================================================================
// 2. AI COPILOT (Nexus Copilot - Autonomous Agents & LLM Clusters)
// ============================================================================
export const AI_CONTENT = {
  process: {
    title: "Autonomous Agent Orchestration & Model Safety Pipeline",
    subtitle: "Deterministic Engineering Precision",
    description:
      "From fine-tuning specialized domain weights on distributed H100 clusters to latency-critical streaming tool calling and continuous RLHF evaluation.",
    primaryCtaText: "Review Benchmarks",
    secondaryCtaText: "Explore Model Pipeline",
    metrics: [
      { value: "<18ms", label: "Time-To-First-Token", subtext: "vLLM speculative decoding" },
      { value: "128k", label: "Active Context", subtext: "Zero degradation needle-in-haystack" },
      { value: "99.4%", label: "Tool Call Accuracy", subtext: "Structured JSON schema adherence" },
      { value: "99.99%", label: "Inference Uptime", subtext: "Multi-region fallback cluster" },
    ],
  } as NicheHeroContent,

  services: {
    title: "Autonomous Agentic Intelligence & Generative Capabilities",
    subtitle: "Enterprise Foundation Runtimes",
    description:
      "We build high-throughput vLLM clusters, autonomous multi-agent reasoning graphs, sub-second vector RAG retrieval, and real-time streaming interfaces.",
    primaryCtaText: "Explore Compute Tiers",
    secondaryCtaText: "Cluster Calculator",
    metrics: [
      { value: "480 T/s", label: "Streaming Throughput", subtext: "Continuous batching execution" },
      { value: "120M+", label: "Indexed Vectors", subtext: "Sub-20ms cosine similarity" },
      { value: "100%", label: "Data Isolation", subtext: "Zero telemetry or model training" },
      {
        value: "14+",
        label: "Supported Foundation LLMs",
        subtext: "Claude 3.5, Llama 3.3, DeepSeek",
      },
    ],
  } as NicheHeroContent,

  pricing: {
    title: "Transparent Token Pricing & Dedicated Inference Clusters",
    subtitle: "Zero Markup On Raw Compute",
    description:
      "Flexible pay-per-token API consumption or isolated private GPU clusters on bare-metal H100 instances. Full cost predictability with zero hidden egress fees.",
    primaryCtaText: "Deploy Dedicated Cluster",
    secondaryCtaText: "Compare Token Tiers",
    metrics: [
      { value: "$0.002", label: "Per 1k Tokens", subtext: "High-throughput fine-tuned models" },
      { value: "0ms", label: "Cold Start Overhead", subtext: "Always-hot standby replicas" },
      { value: "100%", label: "IP Ownership", subtext: "Fine-tuned adapter weights" },
      { value: "Sub-1h", label: "Cluster Spinup", subtext: "Automated Kubernetes helm deploy" },
    ],
  } as NicheHeroContent,

  projects: [
    {
      id: "ai-p1",
      title: "Synapse Code Generation Engine",
      client: "Synapse Intelligence Inc.",
      category: "Autonomous Agentic Copilot",
      categoryFilter: "primary",
      year: "2026",
      metrics: { label: "Developer Velocity", value: "+340%" },
      impactHeadline:
        "Sub-20ms streaming code completion engine with real-time AST syntax verification.",
      image: "synapse-ai",
      stackTags: ["vLLM", "Triton Server", "Claude 3.5 Sonnet", "React 19"],
      deliverablesSummary: "Streaming IDE Plugin, AST Parser, AST Evaluation Harness.",
    },
    {
      id: "ai-p2",
      title: "Cognition Multi-Agent Graph",
      client: "Cognition Robotics",
      category: "Multi-Agent System Orchestration",
      categoryFilter: "secondary",
      year: "2026",
      metrics: { label: "Reasoning Accuracy", value: "96.4%" },
      impactHeadline:
        "Autonomous graph-based multi-agent supervisor orchestrating 12 specialized subagents.",
      image: "kroma-fintech",
      stackTags: ["LangGraph", "Python 3.12", "FastAPI", "Pinecone"],
      deliverablesSummary:
        "Hierarchical Agent Router, Memory Retention Layer, Tool Calling Schema.",
    },
    {
      id: "ai-p3",
      title: "Cortex Semantic Vector RAG Mesh",
      client: "Cortex Enterprise",
      category: "Enterprise Retrieval Augmented Generation",
      categoryFilter: "enterprise",
      year: "2025",
      metrics: { label: "Query Latency", value: "< 14ms" },
      impactHeadline:
        "Sub-second hybrid dense-sparse vector search over 80 million enterprise documents.",
      image: "aura-hardware",
      stackTags: ["Qdrant", "Splade Embeddings", "Next.js 15", "gRPC"],
      deliverablesSummary: "Hybrid Vector Index, Chunking Optimizer, Citation Verification Engine.",
    },
    {
      id: "ai-p4",
      title: "Triton Model Inference Gateway",
      client: "Omni Labs",
      category: "High-Throughput GPU Inference",
      categoryFilter: "core",
      year: "2025",
      metrics: { label: "Concurrent Streams", value: "12,000+" },
      impactHeadline:
        "Dynamic continuous batching gateway serving fine-tuned 70B parameter models with zero GPU idle time.",
      image: "vesper-commerce",
      stackTags: ["NVIDIA Triton", "TensorRT-LLM", "CUDA", "Prometheus"],
      deliverablesSummary:
        "Inference Load Balancer, Autoscaling Controller, P99 Latency Telemetry.",
    },
  ] as DomainProjectItem[],

  changelog: [
    {
      version: "v4.2.0",
      badge: "LATEST",
      date: "October 16, 2026",
      headline: "vLLM PagedAttention v3 & Streaming Tool Calling Orchestrator",
      summary:
        "Shipped breakthrough speculative decoding engine cutting Time-To-First-Token down to 14ms, alongside parallel JSON tool calling with zero token hallucinations.",
      changes: [
        {
          type: "feature",
          title: "Parallel Agentic Tool Execution",
          description:
            "Agents can now invoke up to 8 external tools simultaneously and aggregate results in a single forward pass.",
          commitSha: "8a12e34",
        },
        {
          type: "perf",
          title: "KV-Cache Memory Footprint Reduced by 45%",
          description:
            "Implemented FP8 quantization across attention caches without precision degradation.",
          commitSha: "6c2b9f1",
        },
        {
          type: "security",
          title: "Prompt Injection & Jailbreak Guardrail v2",
          description:
            "Real-time semantic heuristic firewall inspecting input prompts at sub-millisecond speeds.",
          commitSha: "1f4e7d0",
        },
      ],
      diffCode: `// runtime/agenticRouter.ts
+ export async function streamAgentThought(session: AgentSession, prompt: string) {
+   const speculativeDraft = await draftModel.generateFast(prompt, { maxTokens: 16 });
+   return mainEngine.streamVerify({ draft: speculativeDraft, tools: session.tools });
+ }`,
    },
    {
      version: "v4.1.0",
      badge: "STABLE",
      date: "September 18, 2026",
      headline: "LangGraph Multi-Agent Supervisor & Long-Term Memory Mesh",
      summary:
        "Introduced episodic memory persistence allowing copilot agents to recall user preferences across multi-month development cycles.",
      changes: [
        {
          type: "feature",
          title: "Episodic Vector Memory",
          description:
            "Automatic background summarization and vector sharding of past conversation histories.",
          commitSha: "3d5a1b8",
        },
      ],
    },
  ] as DomainChangelogItem[],

  blog: [
    {
      id: "ai-b1",
      slug: "optimizing-time-to-first-token-in-vllm",
      title: "Optimizing Time-To-First-Token (TTFT) Under 18ms",
      excerpt:
        "A technical deep-dive into speculative decoding, chunked prefill, and GPU tensor parallelism on NVIDIA H100 clusters.",
      category: "SYSTEMS & INFERENCE",
      readTime: "8 MIN READ",
      date: "October 11, 2026",
      author: { name: "Dr. Aris Vance", role: "Foundation Systems Lead" },
      imagePreset: "synapse-ai",
      featured: true,
      contentQuote:
        "“In conversational AI, latency is the difference between a tool that feels alive and one that feels like a slow search engine.”",
      section1Title: "1. The Anatomy of LLM Latency: Prefill vs Decode",
      section1Body:
        "Latency in Large Language Models is divided into the Prefill phase (processing the input prompt) and the Decode phase (generating sequential tokens). Chunked prefill allows us to interleave short decoding steps between heavy context processing.",
      section2Title: "2. Speculative Decoding with Draft Heuristics",
      section2Body:
        "By running a lightweight 1.5B parameter draft model alongside our 70B flagship model, the main engine only verifies parallel tokens, yielding a 2.8x speedup in wall-clock execution time.",
    },
    {
      id: "ai-b2",
      slug: "autonomous-multi-agent-handshake-protocols",
      title: "Autonomous Multi-Agent Handshake Protocols",
      excerpt:
        "Designing deterministic communication contracts between specialized agents to prevent circular deadlock and hallucination amplification.",
      category: "AGENT ARCHITECTURE",
      readTime: "7 MIN READ",
      date: "September 22, 2026",
      author: { name: "Kaori Tanaka", role: "Triton GPU Lead" },
      imagePreset: "kroma-fintech",
    },
  ] as DomainBlogPostItem[],

  portal: {
    sprintTitle: "Active Synapse Copilot Telemetry · Cluster EU-West",
    hudBadge: "AUTHENTICATED COPILOT CONSOLE",
    activeMetrics: [
      { label: "Active Inference Nodes", value: "32x H100", subtext: "Bare-metal GPU cluster" },
      { label: "P99 Time-To-First-Token", value: "14.2ms", subtext: "Speculative decoding active" },
      { label: "Daily Token Velocity", value: "48.2M", subtext: "Zero throttling limits" },
      { label: "Tool Call Accuracy", value: "99.4%", subtext: "Verified JSON output" },
    ],
    deliverables: [
      {
        id: "ai-1",
        title: "Dedicated vLLM Cluster Deployment with Helm",
        phase: "Inference Gate",
        status: "Shipped",
        signedOff: true,
      },
      {
        id: "ai-2",
        title: "Domain Fine-Tuned LoRA Adapter Weights",
        phase: "Training Gate",
        status: "Shipped",
        signedOff: true,
      },
      {
        id: "ai-3",
        title: "Streaming SSE Frontend SDK (React 19 Hooks)",
        phase: "Client Gate",
        status: "Shipped",
        signedOff: true,
      },
      {
        id: "ai-4",
        title: "Vector RAG Chunking & Hybrid Search Index",
        phase: "Retrieval Gate",
        status: "Shipped",
        signedOff: false,
      },
      {
        id: "ai-5",
        title: "Automated Prompt Injection Firewall",
        phase: "Security Gate",
        status: "In Review",
        signedOff: false,
      },
    ],
  } as DomainPortalData,

  contact: {
    headline: "Deploy dedicated AI infrastructure with our Systems Leads.",
    subtext:
      "Connect directly with our staff machine learning engineers. We evaluate your model latency requirements and sizing within 2 hours.",
    email: "ai@synapse-neural.io",
    channel: "#synapse-enterprise-support",
    workstreams: [
      "Custom vLLM Cluster",
      "Multi-Agent LangGraph System",
      "Vector RAG Knowledge Mesh",
      "Domain Model Fine-Tuning",
      "Streaming Copilot UI",
    ],
    submitButtonText: "Deploy Dedicated Cluster",
  } as DomainContactData,

  about: {
    title: "Cognitive Velocity. Deterministic Precision.",
    subtitle: "About Nexus Copilot",
    description:
      "We are an applied AI research and systems studio. We build production-ready agentic architectures that transform enterprise engineering velocity with sub-second responsiveness.",
    philosophyTag: "AI SYSTEMS MANIFESTO",
    philosophyHeading: "Engineered for zero latency. Built for deterministic",
    philosophyAccentWord: "intelligence",
    philosophyParagraph1:
      "Too many AI interfaces today feel like fragile toys—laggy streaming, random hallucinations, and opaque errors. We treat LLMs as high-performance compilers, enforcing strict typing, structured JSON schemas, and deterministic tool execution.",
    philosophyParagraph2:
      "Founded in San Francisco and Tokyo, our research leads have authored seminal papers in speculative decoding, distributed GPU orchestration, and multi-agent coordination frameworks.",
    metrics: [
      { value: "2024", label: "Studio Founded", subtext: "San Francisco & Tokyo" },
      { value: "480 T/s", label: "Peak Generation", subtext: "Continuous batching" },
      { value: "100%", label: "IP Ownership", subtext: "Adapter weights transferred" },
      { value: "0", label: "Telemetry Kept", subtext: "Zero customer data retention" },
    ],
  } as DomainAboutData,
};

// ============================================================================
// 3. ALUNARA WELLNESS (Alunara Sanctuary - Luxury Biophilic D2C & Spa)
// ============================================================================
export const WELLNESS_CONTENT = {
  process: {
    title: "Botanical Sourcing, Extraction & Atelier Ritual Formulation",
    subtitle: "Circadian Body & Space",
    description:
      "Our 5-phase extraction cadence preserves delicate volatile terpenes through sub-zero cold pressing, biodynamic alpine harvesting, and Swiss formulation laboratories.",
    primaryCtaText: "Explore Atelier Formulations",
    secondaryCtaText: "View Sourcing Protocol",
    metrics: [
      { value: "100%", label: "Biodynamic Organic", subtext: "Swiss Alpine certified harvest" },
      { value: "-18°C", label: "Cold Extraction", subtext: "Zero heat degradation of terpenes" },
      {
        value: "100%",
        label: "Recycled Amber Glass",
        subtext: "UV-protective sustainable vessels",
      },
      { value: "60 Days", label: "Maceration Period", subtext: "Unrushed formulation maturation" },
    ],
  } as NicheHeroContent,

  services: {
    title: "Circadian Formulations, Botanical Rituals & Bespoke Ateliers",
    subtitle: "Sensory Living Primitives",
    description:
      "From circadian body elixirs and spatial scent architecture to bespoke daily olfactory sequences formulated for cognitive recovery and deep rest.",
    primaryCtaText: "Order Discovery Set",
    secondaryCtaText: "Sanctuary Membership",
    metrics: [
      { value: "24", label: "Signature Formulations", subtext: "Botanical extracts and elixirs" },
      { value: "4.98", label: "Patron Rating", subtext: "Over 4,200 luxury atelier reviews" },
      { value: "48h", label: "Atelier Dispatch", subtext: "Hand-poured batch delivery" },
      { value: "+48%", label: "Deep Sleep Quality", subtext: "Verified clinical sleep telemetry" },
    ],
  } as NicheHeroContent,

  pricing: {
    title: "Sanctuary Memberships & Bespoke Seasonal Allocations",
    subtitle: "Limited Seasonal Harvests",
    description:
      "Reserve access to limited seasonal botanical distillations, private spa reservations, and personal olfactory consultations with our master formulators.",
    primaryCtaText: "Reserve Sanctuary Allocation",
    secondaryCtaText: "Explore Membership Tiers",
    metrics: [
      { value: "4x / yr", label: "Seasonal Deliveries", subtext: "Equinox & Solstice releases" },
      { value: "100%", label: "Custom Blends", subtext: "Personalized to circadian rhythm" },
      { value: "VIP", label: "Atelier Access", subtext: "Private bookings in Zurich & Kyoto" },
      { value: "Complimentary", label: "Refills", subtext: "Zero-waste vessel return system" },
    ],
  } as NicheHeroContent,

  projects: [
    {
      id: "well-p1",
      title: "Alunara Nocturne Recovery Elixir",
      client: "Alunara Atelier Zurich",
      category: "Circadian Rest Formulation",
      categoryFilter: "primary",
      year: "2026",
      metrics: { label: "Deep Rest Metric", value: "+48%" },
      impactHeadline: "Sub-zero cold extracted Swiss stone pine and blue chamomile sleep serum.",
      image: "aura-hardware",
      stackTags: ["Alpine Harvest", "Amber Glass", "Hydrogen 2026", "Three.js"],
      deliverablesSummary: "Bespoke Vessel Design, 3D Spatial Bottle Viewer, Hydrogen Cart.",
    },
    {
      id: "well-p2",
      title: "Kyoto Hinoki Spatial Fragrance",
      client: "Aman Kyoto Sanctuary",
      category: "Spatial Olfactory Architecture",
      categoryFilter: "secondary",
      year: "2026",
      metrics: { label: "Atmosphere Lift", value: "99.2%" },
      impactHeadline:
        "Wild-harvested Japanese Hinoki and vetiver diffuser for restorative hotel suites.",
      image: "vesper-commerce",
      stackTags: ["Wild Hinoki", "Ceramic Diffuser", "Refill System", "Shopify Plus"],
      deliverablesSummary: "Spatial Scent Architecture, Ultrasonic Diffuser Shell, Batch Ledger.",
    },
    {
      id: "well-p3",
      title: "Circadian Ritual Diagnostic Engine",
      client: "Alunara Digital",
      category: "Interactive Olfactory Finder",
      categoryFilter: "enterprise",
      year: "2025",
      metrics: { label: "Conversion Lift", value: "+62%" },
      impactHeadline:
        "Tactile web ritual configurator tailoring personal botanical sequences to chronotype.",
      image: "kroma-fintech",
      stackTags: ["React 19", "Motion 13", "Fluid Typography", "Klaviyo"],
      deliverablesSummary: "Interactive Chronotype Quiz, Dynamic Product Bundling, Custom Drawer.",
    },
    {
      id: "well-p4",
      title: "Botanical Sourcing Traceability Ledger",
      client: "Bio-Suisse Federation",
      category: "Ethical Harvest Transparency",
      categoryFilter: "core",
      year: "2025",
      metrics: { label: "Origin Verification", value: "100%" },
      impactHeadline:
        "QR-accessible harvest coordinates and batch gas chromatography lab certificates.",
      image: "synapse-ai",
      stackTags: ["Zero-Knowledge Proofs", "Alpine Geolocation", "Laboratory Reports"],
      deliverablesSummary: "Batch QR Code Verification, Certificate Vault, Farmer Royalty Mesh.",
    },
  ] as DomainProjectItem[],

  changelog: [
    {
      version: "v4.2.0",
      badge: "LATEST",
      date: "October 16, 2026",
      headline: "Autumn Solstice Harvest Release & Hydrogen Spatial Atelier",
      summary:
        "Unveiled our limited Autumn Solstice distillation of high-altitude Swiss alpine edelweiss and cedar, supported by a 60fps Three.js spatial bottle visualizer.",
      changes: [
        {
          type: "feature",
          title: "Spatial 3D Vessel Configurator",
          description:
            "Patrons can inspect glass refraction, botanical sediment, and custom engraved monograms in real time.",
          commitSha: "e9a11f2",
        },
        {
          type: "perf",
          title: "Sub-Second Cart Drawer Cutover",
          description:
            "Zero layout shift checkout integration with instant Apple Pay and Klarna one-click.",
          commitSha: "8b4d2c1",
        },
      ],
      diffCode: `// atelier/ritualConfigurator.ts
+ export function calculateCircadianBlend(chronotype: "Lark" | "Owl", stressLevel: number) {
+   return chronotype === "Owl" 
+     ? { morning: "Bergamot & Elemi", evening: "Swiss Pine & Blue Tansy" }
+     : { morning: "Grapefruit & Rosemary", evening: "Sandalwood & Vetiver" };
+ }`,
    },
  ] as DomainChangelogItem[],

  blog: [
    {
      id: "well-b1",
      slug: "the-science-of-cold-pressed-alpine-extraction",
      title: "The Science of Cold-Pressed Alpine Extraction",
      excerpt:
        "Why high-temperature industrial steam distillation destroys over 60% of delicate aromatic compounds, and how sub-zero pressing preserves biological potency.",
      category: "BOTANICAL SCIENCE",
      readTime: "6 MIN READ",
      date: "October 10, 2026",
      author: { name: "Dr. Madeleine Laurent", role: "Master Formulator" },
      imagePreset: "aura-hardware",
      featured: true,
      contentQuote:
        "“Nature does not rush her distillations. Modern beauty’s obsession with industrial yield is the enemy of botanical purity.”",
      section1Title: "1. Preserving Fragile Monoterpenes Under Sub-Zero Temperatures",
      section1Body:
        "Industrial distillation blasts delicate plants with 100°C steam, oxidizing monoterpenes and denaturing skin-nourishing lipids. By lowering temperature to -18°C in nitrogen-flushed stainless steel presses, cellular membranes rupture without molecular damage.",
      section2Title: "2. The Circadian Rhythm of Plant Chemistry",
      section2Body:
        "Alpine edelweiss harvested at 5:00 AM before dawn contains 3.2x higher concentrations of leontopodic acid than flowers picked at midday, maximizing antioxidant protection against oxidative stress.",
    },
  ] as DomainBlogPostItem[],

  portal: {
    sprintTitle: "Active Atelier Production · Batch #08 Zurich",
    hudBadge: "AUTHENTICATED PATRON PORTAL",
    activeMetrics: [
      { label: "Current Harvest Batch", value: "#08 Autumn", subtext: "Alpine Edelweiss & Cedar" },
      { label: "Maceration Maturity", value: "84% (48/60d)", subtext: "Cold stainless maturation" },
      { label: "Vessels Reserved", value: "240 / 300", subtext: "Limited seasonal allocation" },
      { label: "Atelier Dispatch Date", value: "Nov 04, 2026", subtext: "Hand-poured delivery" },
    ],
    deliverables: [
      {
        id: "wl-1",
        title: "Alpine Harvest Bio-Suisse Certification",
        phase: "Harvest Gate",
        status: "Shipped",
        signedOff: true,
      },
      {
        id: "wl-2",
        title: "Gas Chromatography Purity Certificate",
        phase: "Laboratory Gate",
        status: "Shipped",
        signedOff: true,
      },
      {
        id: "wl-3",
        title: "Custom Engraved Amber Glass Prototype",
        phase: "Atelier Gate",
        status: "Shipped",
        signedOff: true,
      },
      {
        id: "wl-4",
        title: "Shopify Hydrogen Spatial Cart Review",
        phase: "Digital Gate",
        status: "Shipped",
        signedOff: false,
      },
      {
        id: "wl-5",
        title: "Private Spa Sanctuary Booking Calendar",
        phase: "Hospitality Gate",
        status: "In Review",
        signedOff: false,
      },
    ],
  } as DomainPortalData,

  contact: {
    headline: "Inquire with our Master Formulators & Concierge.",
    subtext:
      "Connect directly with our Grasse formulation atelier. We respond to wholesale, hospitality, and private bespoke inquiries within 2 hours.",
    email: "concierge@alunara.ch",
    channel: "#alunara-atelier-desk",
    workstreams: [
      "Bespoke Formulation Atelier",
      "Spatial Scent Architecture",
      "Luxury Spa Partnership",
      "Sanctuary Private Retainer",
      "Wholesale Boutique Supply",
    ],
    submitButtonText: "Submit Atelier Inquiry",
  } as DomainContactData,

  about: {
    title: "Purity of Nature. Scientific Extraction.",
    subtitle: "About Alunara Sanctuary",
    description:
      "We are an artisanal botanical atelier and circadian research laboratory. We formulate rare bio-certified elixirs honoring ancient apothecary rituals.",
    philosophyTag: "BOTANICAL MANIFESTO",
    philosophyHeading: "Harvested with reverence. Formulated for biological",
    philosophyAccentWord: "harmony",
    philosophyParagraph1:
      "Modern cosmetic manufacturing prioritizes synthetic fillers and infinite shelf-life over living vitality. Alunara rejects mass production in favor of limited seasonal harvests, cold-press extraction, and zero-compromise purity.",
    philosophyParagraph2:
      "Operating between Zurich, Grasse, and Kyoto, our formulators partner directly with regenerative high-altitude alpine farms to craft tactile sensory experiences that restore equilibrium to body and space.",
    metrics: [
      { value: "1924", label: "Apothecary Heritage", subtext: "Century of herbal mastery" },
      { value: "100%", label: "Wild & Biodynamic", subtext: "Zero chemical synthetics" },
      { value: "300", label: "Numbered Vessels", subtext: "Per seasonal distillation" },
      { value: "Zero", label: "Synthetic Fragrance", subtext: "Pure botanical essences" },
    ],
  } as DomainAboutData,
};

// ============================================================================
// 4. CYBER SHIELD (CyberShield Cloud - Zero-Trust & eBPF Security)
// ============================================================================
export const CYBER_CONTENT = {
  process: {
    title: "Zero-Trust Hardening Gates & Automated Continuous Red Teaming",
    subtitle: "Defense-In-Depth Architecture",
    description:
      "Our 5-gate security orchestration applies kernel-level eBPF behavioral detection, automated attack graph simulation, and SOC 2 Type II policy-as-code enforcement.",
    primaryCtaText: "Review Threat Telemetry",
    secondaryCtaText: "Explore Hardening Gates",
    metrics: [
      { value: "<45s", label: "Mean Time to Detect (MTTD)", subtext: "Kernel eBPF interception" },
      { value: "0", label: "Breaches / Zero Days", subtext: "Multi-cloud perimeter lock" },
      { value: "100%", label: "SOC 2 & FedRAMP", subtext: "Automated continuous evidence" },
      { value: "14,000+", label: "Attack Vectors Simulated", subtext: "Daily red team execution" },
    ],
  } as NicheHeroContent,

  services: {
    title: "Zero-Trust Cloud Mesh & Autonomous Threat Defense",
    subtitle: "Kernel-Level Protection",
    description:
      "From automated Falco eBPF runtime security and WireGuard encrypted magic WANs to continuous red teaming and instant SOC 2 compliance automation.",
    primaryCtaText: "Deploy Security Pod",
    secondaryCtaText: "Threat Simulator",
    metrics: [
      { value: "100k+", label: "Secured Endpoints", subtext: "Global hybrid cloud mesh" },
      { value: "<2ms", label: "Mesh Overhead", subtext: "WireGuard kernel acceleration" },
      { value: "24/7/365", label: "Active SOC War Room", subtext: "Staff security researchers" },
      { value: "Zero", label: "Trust Implicit", subtext: "Cryptographic identity verified" },
    ],
  } as NicheHeroContent,

  pricing: {
    title: "Predictable Cloud Security Tiers & Dedicated Red Teams",
    subtitle: "Zero Hidden Incident Fees",
    description:
      "All plans include 24/7 automated threat monitoring, continuous vulnerability scanning, and guaranteed sub-15 minute critical incident response SLAs.",
    primaryCtaText: "Request Security Scoping",
    secondaryCtaText: "Compare Defense Tiers",
    metrics: [
      {
        value: "<15m",
        label: "Critical Incident SLA",
        subtext: "Direct to Lead Incident Commander",
      },
      { value: "100%", label: "Audit Coverage", subtext: "SOC 2, ISO 27001, HIPAA, PCI" },
      {
        value: "Unlimited",
        label: "Vulnerability Scans",
        subtext: "Zero per-scan billing surcharges",
      },
      { value: "$1M", label: "Breach Protection", subtext: "Underwritten warranty coverage" },
    ],
  } as NicheHeroContent,

  projects: [
    {
      id: "cyber-p1",
      title: "Global Financial WireGuard Mesh",
      client: "Meridian Financial",
      category: "Zero-Trust Infrastructure Mesh",
      categoryFilter: "primary",
      year: "2026",
      metrics: { label: "Perimeter Breaches", value: "0" },
      impactHeadline:
        "Kernel-level encrypted WireGuard mesh connecting 42,000 multi-cloud banking microservices.",
      image: "kroma-fintech",
      stackTags: ["WireGuard", "Rust", "Falco eBPF", "HashiCorp Vault"],
      deliverablesSummary: "Encrypted Magic WAN, Mutual TLS Gateway, Automated Key Rotation.",
    },
    {
      id: "cyber-p2",
      title: "Autonomous Red Team Breach Simulator",
      client: "Defense Logistics Agency",
      category: "Automated Continuous Penetration Testing",
      categoryFilter: "secondary",
      year: "2026",
      metrics: { label: "Vulnerabilities Found", value: "142 Prior to Prod" },
      impactHeadline:
        "Autonomous agentic attack simulation mimicking nation-state APT evasion tactics.",
      image: "synapse-ai",
      stackTags: ["Go", "Python", "Metasploit Core", "Docker Sandbox"],
      deliverablesSummary: "Automated Attack Graph, Exploit Verification, Patch Generation.",
    },
  ] as DomainProjectItem[],

  changelog: [
    {
      version: "v4.2.0",
      badge: "LATEST",
      date: "October 16, 2026",
      headline: "Falco eBPF Kernel Threat Interception Engine & Magic WAN Mesh",
      summary:
        "Released automated kernel-level syscall interception stopping container escape attempts within 45 microseconds.",
      changes: [
        {
          type: "security",
          title: "Sub-Microsecond Container Escape Blocking",
          description:
            "Detects unauthorized namespace unshare and setns calls before execution completes.",
          commitSha: "9f11a4c",
        },
      ],
    },
  ] as DomainChangelogItem[],

  blog: [
    {
      id: "cyber-b1",
      slug: "kernel-level-threat-detection-with-ebpf",
      title: "Kernel-Level Threat Detection with eBPF and Falco",
      excerpt:
        "Why userspace security agents miss advanced evasion tactics, and how eBPF hooks into the Linux kernel without kernel module instability.",
      category: "KERNEL ARCHITECTURE",
      readTime: "8 MIN READ",
      date: "October 08, 2026",
      author: { name: "Col. Robert Sterling", role: "Chief Information Security Officer" },
      imagePreset: "kroma-fintech",
      featured: true,
      contentQuote:
        "“If your security agent lives in userspace, the attacker who gains root privileges has already blinded you.”",
      section1Title: "1. The Fundamental Flaw of Userspace Security Daemons",
      section1Body:
        "Traditional EDR solutions monitor logs and ptrace processes from userspace. Sophisticated malware can easily unlink shared libraries, suppress log emitters, and mask process IDs. eBPF executes sandboxed bytecode directly inside the Linux kernel, capturing system calls at the hardware boundary.",
      section2Title: "2. Zero-Overhead Telemetry with BPF CO-RE",
      section2Body:
        "Compile-Once Run-Everywhere (CO-RE) technology allows security engineers to deploy identical eBPF bytecode across any modern Linux kernel distribution with less than 0.8% CPU overhead.",
    },
  ] as DomainBlogPostItem[],

  portal: {
    sprintTitle: "Active Security Operations Center (SOC) Telemetry · Mesh Node #01",
    hudBadge: "AUTHENTICATED WAR ROOM CONSOLE",
    activeMetrics: [
      { label: "Active eBPF Probes", value: "14,820", subtext: "100% cloud nodes covered" },
      { label: "Mean Time to Detect (MTTD)", value: "38s", subtext: "Kernel event correlation" },
      { label: "Blocked Threats (24h)", value: "1,249", subtext: "DDoS, port scans, injections" },
      { label: "SOC 2 Compliance Score", value: "100%", subtext: "Automated evidence engine" },
    ],
    deliverables: [
      {
        id: "cs-1",
        title: "eBPF Falco Daemonset Kubernetes Integration",
        phase: "Detection Gate",
        status: "Shipped",
        signedOff: true,
      },
      {
        id: "cs-2",
        title: "WireGuard Zero-Trust Mesh Tunnel Deployment",
        phase: "Network Gate",
        status: "Shipped",
        signedOff: true,
      },
      {
        id: "cs-3",
        title: "Automated Continuous Red Team Attack Audit",
        phase: "Simulation Gate",
        status: "Shipped",
        signedOff: true,
      },
      {
        id: "cs-4",
        title: "HashiCorp Vault Secret Ephemeral Rotation",
        phase: "Identity Gate",
        status: "Shipped",
        signedOff: false,
      },
      {
        id: "cs-5",
        title: "SOC 2 Type II Automated Audit Package",
        phase: "Compliance Gate",
        status: "In Review",
        signedOff: false,
      },
    ],
  } as DomainPortalData,

  contact: {
    headline: "Speak directly with our Incident Commanders & CISOs.",
    subtext:
      "Connect directly with our security researchers. We evaluate cloud infrastructure posture, compliance targets, and threat models within 2 hours.",
    email: "secops@cybershield.cloud",
    channel: "#cybershield-war-room",
    workstreams: [
      "Zero-Trust Architecture",
      "eBPF Kernel Defense",
      "Automated Red Team Simulation",
      "SOC 2 Type II Compliance",
      "Cloud Perimeter Hardening",
    ],
    submitButtonText: "Initiate Security Engagement",
  } as DomainContactData,

  about: {
    title: "Zero-Trust Vigilance. Kernel Defense.",
    subtitle: "About CyberShield Cloud",
    description:
      "We are an elite cybersecurity research practice. We protect critical cloud infrastructure from advanced persistent threats through kernel-level defense.",
    philosophyTag: "SECURITY MANIFESTO",
    philosophyHeading: "Engineered for zero trust. Defended with absolute",
    philosophyAccentWord: "vigilance",
    philosophyParagraph1:
      "Traditional perimeter security is obsolete in a decentralized multi-cloud world. CyberShield enforces cryptographic verification at every boundary, assuming breach and neutralizing threats at the kernel level before damage occurs.",
    philosophyParagraph2:
      "Our security engineering staff consists of former military intelligence operators, white-hat zero-day researchers, and kernel developers who have defended critical infrastructure against nation-state adversaries.",
    metrics: [
      { value: "2024", label: "Practice Founded", subtext: "Zurich & Washington DC" },
      { value: "0", label: "Breaches Allowed", subtext: "100% perimeter containment" },
      { value: "<45s", label: "Avg Detection Time", subtext: "eBPF kernel interception" },
      { value: "100%", label: "SOC2 & ISO Ready", subtext: "Continuous evidence engine" },
    ],
  } as DomainAboutData,
};

// ============================================================================
// 5. DIGITAL AGENCY (Hudbird Nexus - High-End Design & Web Engineering)
// ============================================================================
export const AGENCY_CONTENT = {
  process: {
    title: "Sprint Methodology & Production Engineering Discipline",
    subtitle: "Repeatable Technical Execution",
    description:
      "Our structured 4-phase methodology guarantees predictable delivery, zero architectural debt, and sub-second performance across every surface we deploy.",
    primaryCtaText: "Lock In Next Sprint",
    secondaryCtaText: "View Phase Deliverables",
    metrics: [
      { value: "3–6w", label: "Sprint Duration", subtext: "Fixed-scope turnaround" },
      { value: "100%", label: "Strict TypeScript", subtext: "Zero runtime any errors" },
      { value: "0.00", label: "Layout Shift (CLS)", subtext: "Zero visual jumping" },
      { value: "99.9%", label: "Cutover Uptime", subtext: "Zero dropped connections" },
    ],
  } as NicheHeroContent,

  services: {
    title: "Specialized Capabilities & Technical Engineering Domains",
    subtitle: "High-Performance Systems",
    description:
      "We build uncompromising digital interfaces, design systems, and web architectures that scale seamlessly under enterprise traffic loads.",
    primaryCtaText: "Explore Service Pricing",
    secondaryCtaText: "Interactive Estimator",
    metrics: [
      { value: "54+", label: "UI Primitives", subtext: "Accessible component kit" },
      { value: "<50ms", label: "Interaction INP", subtext: "60fps frame rate lock" },
      { value: "0.8s", label: "Global LCP", subtext: "Edge-rendered performance" },
      { value: "100%", label: "Code Ownership", subtext: "Full IP transfer on day 1" },
    ],
  } as NicheHeroContent,

  pricing: {
    title: "Predictable Pricing & Dedicated Studio Retainer Pods",
    subtitle: "Transparent Investment Model",
    description:
      "Clear fixed-scope sprints and embedded studio pods. No unpredictable agency invoices or hidden junior staffing markups.",
    primaryCtaText: "Book Scoping Call",
    secondaryCtaText: "Compare Tiers",
    metrics: [
      { value: "$8.5k", label: "Starting Retainer", subtext: "Predictable monthly cadence" },
      { value: "48h", label: "Kickoff SLA", subtext: "Instant repo & Linear setup" },
      { value: "100%", label: "Transparent Scope", subtext: "Zero unexpected billables" },
      { value: "14d", label: "Guarantee Window", subtext: "Complete sprint satisfaction" },
    ],
  } as NicheHeroContent,

  projects: [
    {
      id: "agency-p1",
      title: "Kroma Protocol Flagship",
      client: "Kroma Labs AG",
      category: "Fintech & Web3 Treasury",
      categoryFilter: "primary",
      year: "2026",
      metrics: { label: "Conversion Lift", value: "+340%" },
      impactHeadline: "Sub-second execution for institutional decentralized liquidity.",
      image: "kroma-fintech",
      stackTags: ["Next.js 15", "Turborepo", "Web3", "Tailwind 4"],
      deliverablesSummary: "Design Token Engine, High-frequency Orderbook, SOC2 Vault.",
    },
    {
      id: "agency-p2",
      title: "Synapse Neural Copilot",
      client: "Synapse Intelligence Inc.",
      category: "Autonomous AI Workspace",
      categoryFilter: "secondary",
      year: "2026",
      metrics: { label: "Query Latency", value: "< 24ms" },
      impactHeadline: "Zero-latency streaming interface for generative engineering teams.",
      image: "synapse-ai",
      stackTags: ["React 19", "SSE Streaming", "Vector DB", "Motion 13"],
      deliverablesSummary: "Streaming Chat Surface, Tool Call Pipeline, Dark Canvas.",
    },
    {
      id: "agency-p3",
      title: "Alunara Luxury Atelier",
      client: "Alunara Botanicals Zurich",
      category: "Luxury D2C & Commerce",
      categoryFilter: "enterprise",
      year: "2025",
      metrics: { label: "AOV Increase", value: "+48%" },
      impactHeadline: "Tactile spatial e-commerce experience for bespoke botanical rituals.",
      image: "aura-hardware",
      stackTags: ["Shopify OS 2.0", "Hydrogen", "Fluid Typography", "Tailwind 4"],
      deliverablesSummary: "Custom Cart Drawer, Ritual Configurator, 60fps Micro-interactions.",
    },
    {
      id: "agency-p4",
      title: "Vesper Global Token Engine",
      client: "Vesper Enterprise",
      category: "Design Systems & Monorepo",
      categoryFilter: "core",
      year: "2025",
      metrics: { label: "Code Reusability", value: "94%" },
      impactHeadline: "Unified multi-brand design tokens powering 14 distinct web applications.",
      image: "vesper-commerce",
      stackTags: ["W3C Tokens", "Figma Variables", "Vitest", "Playwright"],
      deliverablesSummary: "74 UI Primitives, WCAG 2.2 AAA Audit, Automated CI/CD Sync.",
    },
  ] as DomainProjectItem[],

  changelog: [
    {
      version: "v4.2.0",
      badge: "LATEST",
      date: "October 16, 2026",
      headline: "Flagship Multiplier Engine & 120+ Inner Pages Matrix",
      summary:
        "Full activation of 5 flagship niches (Digital Agency, AI Copilot, Alunara Luxury Wellness, Fintech Protocol, Cyber Shield) with universal 24-inner page router dispatching and zero-layout-shift architecture.",
      changes: [
        {
          type: "feature",
          title: "Commercial & Methodology Suite Activated",
          description:
            "Added InteractiveSprintEstimator, ProcessDeliverablesMatrix, and PricingComparisonMatrix with real-time reactive calculation.",
          commitSha: "8f413a2",
        },
        {
          type: "perf",
          title: "Cold-Start Bundle Optimization",
          description:
            "Reduced client bundle size by 38% via code-splitting on three.js and lucide icon tree-shaking.",
          commitSha: "9c1b7e4",
        },
        {
          type: "security",
          title: "Strict CSP Level 3 & Vault Token Rotation",
          description:
            "Implemented strict nonces for inline styles and automated ephemeral preview token invalidation.",
          commitSha: "1d0a5f2",
        },
      ],
    },
  ] as DomainChangelogItem[],

  blog: [
    {
      id: "agency-b1",
      slug: "why-we-enforce-zero-runtime-layout-shift",
      title: "Why We Enforce Zero Runtime Layout Shift (CLS 0.000)",
      excerpt:
        "A deep architectural look at preventing layout thrash through explicit aspect ratios, fluid typography clamps, and SSR font metric overrides.",
      category: "ENGINEERING",
      readTime: "7 MIN READ",
      date: "October 12, 2026",
      author: { name: "Daniele Rossi", role: "Principal Systems Architect" },
      imagePreset: "kroma-fintech",
      featured: true,
      contentQuote:
        "“When an interface jumps during hydration, users perceive it as fragile and unpolished. Eliminating layout shift requires treating geometry as a first-class mathematical constraint.”",
      section1Title: "1. Explicit Aspect Ratios & Canvas Bounding Boxes",
      section1Body:
        "The most common cause of layout thrash is media containers loading without predetermined bounding dimensions. We enforce explicit aspect ratio containers across all visual canvas nodes before any SVG or bitmap asset initiates network request.",
      section2Title: "2. Font Fallback Metric Overrides",
      section2Body:
        "Custom web fonts inevitably cause Cumulative Layout Shift if the browser’s fallback system font has different x-heights. By calculating exact ascent-override and line-gap-override values, the fallback font occupies identical bounding boxes to the final web font.",
    },
    {
      id: "agency-b2",
      slug: "death-of-ephemeral-trends",
      title: "The Death of Ephemeral Web Trends: Building for Permanence",
      excerpt:
        "How Swiss typography, mathematical grid systems, and restraint create digital flagships that outlive annual design hype cycles.",
      category: "DESIGN PHILOSOPHY",
      readTime: "5 MIN READ",
      date: "September 24, 2026",
      author: { name: "Elena Vance", role: "Design Systems Lead" },
      imagePreset: "aura-hardware",
    },
  ] as DomainBlogPostItem[],

  portal: {
    sprintTitle: "Active Studio Pod Telemetry · Client Staging Hub",
    hudBadge: "AUTHENTICATED CLIENT CONSOLE",
    activeMetrics: [
      { label: "Burndown Velocity", value: "84%", subtext: "Sprint on schedule" },
      { label: "Blockers / P0 Bugs", value: "0", subtext: "All critical paths clear" },
      { label: "Next Live Demo", value: "Thursday", subtext: "2:00 PM UTC" },
      { label: "Staging Release", value: "v1.4.0", subtext: "CI/CD auto-deployed" },
    ],
    deliverables: [
      {
        id: "ag-1",
        title: "5 Flagship Niches Registered (120+ Pages Matrix)",
        phase: "Phase 03 · Core Engine",
        status: "Shipped",
        signedOff: true,
      },
      {
        id: "ag-2",
        title: "Universal 24 Inner Pages Router Dispatcher",
        phase: "Phase 03 · Core Engine",
        status: "Shipped",
        signedOff: true,
      },
      {
        id: "ag-3",
        title: "Master Sales Showcase Hub with Filterable Demos",
        phase: "Phase 04 · Cutover",
        status: "Shipped",
        signedOff: true,
      },
      {
        id: "ag-4",
        title: "Deliverables Matrix & Real-Time Sprint Estimator",
        phase: "Phase 04 · Cutover",
        status: "Shipped",
        signedOff: false,
      },
      {
        id: "ag-5",
        title: "Production Performance Audit (LCP < 0.8s, CLS 0.00)",
        phase: "Phase 04 · Cutover",
        status: "In Review",
        signedOff: false,
      },
    ],
  } as DomainPortalData,

  contact: {
    headline: "Tell us about your technical vision.",
    subtext:
      "We only take on 3 concurrent client engagements per quarter to ensure zero compromise on craft and engineering velocity.",
    email: "studio@hudbird.com",
    channel: "#hudbird-client-pod",
    workstreams: [
      "Design System Primitives",
      "Next.js 15 Web App",
      "AI Copilot Integration",
      "Luxury E-Commerce",
      "Complete Retainer Pod",
    ],
    submitButtonText: "Submit Technical Inquiry",
  } as DomainContactData,

  about: {
    title: "Engineering Restraint. Visual Permanence.",
    subtitle: "About Our Studio",
    description:
      "We are a multidisciplinary design and engineering practice. We reject disposable web trends in favor of timeless Swiss design and rigorous modern code.",
    philosophyTag: "STUDIO MANIFESTO",
    philosophyHeading: "Designed with restraint. Engineered for",
    philosophyAccentWord: "permanence",
    philosophyParagraph1:
      "Every web application we engineer starts from fundamental first principles: mathematically harmonious typographic scales, tactile micro-interactions, and zero runtime layout shift.",
    philosophyParagraph2:
      "As a specialized studio, we partner with visionary venture-backed founders to turn complex architectural concepts into clear, compelling, and commercially transformative digital flagships.",
    metrics: [
      { value: "2024", label: "Founded", subtext: "Tokyo & Zurich Studio" },
      { value: "120+", label: "Delivered Views", subtext: "High-performance systems" },
      { value: "98.4%", label: "Client NPS", subtext: "Founders & CTOs rating" },
      { value: "0", label: "Legacy Debt", subtext: "Modern clean-room stack" },
    ],
  } as DomainAboutData,
};

// ============================================================================
// HELPER GETTERS
// ============================================================================
export function getDomainContent(nicheSlug: string) {
  switch (nicheSlug) {
    case "fintech-protocol":
      return FINTECH_CONTENT;
    case "ai-copilot":
      return AI_CONTENT;
    case "alunara-wellness":
      return WELLNESS_CONTENT;
    case "cyber-shield":
      return CYBER_CONTENT;
    case "digital-agency":
    default:
      return AGENCY_CONTENT;
  }
}
