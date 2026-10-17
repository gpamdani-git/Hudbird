// packages/schemas/src/niches/ai-copilot.ts
import { NicheConfig } from "../types";
import { createNicheInnerPages } from "./inner-pages";

const SLUG = "ai-copilot";
const BASE = `/demos/${SLUG}`;
const NAME = "Nexus Copilot";

export const aiCopilotNiche: NicheConfig = {
  id: "ai-copilot",
  name: NAME,
  slug: SLUG,
  tagline: "Autonomous Agentic Intelligence & Generative Copilot",
  category: "ai-saas",
  theme: {
    brandPrimary: "#10B981", // Emerald
    brandAccent: "#34D399",
    fontDisplay: "var(--font-sans, Inter)",
    fontSerifAccent: "var(--font-serif, Instrument Serif)",
    fontSans: "var(--font-sans, Inter)",
    fontMono: "var(--font-mono, JetBrains Mono)",
    mode: "dark-default",
  },
  innerPages: createNicheInnerPages(SLUG, NAME),
  sections: {
    navbar: {
      brandName: "nexus",
      brandTag: "copilot",
      navigationColumns: [
        {
          categoryTitle: "Platform",
          links: [
            { title: "About", description: "Architecture & Safety", href: `${BASE}/about` },
            {
              title: "Capabilities",
              description: "Autonomous Agent Engine",
              href: `${BASE}/services`,
            },
            { title: "Benchmarks", description: "Evaluations & Metrics", href: `${BASE}/projects` },
            { title: "Pipeline", description: "Model Orchestration", href: `${BASE}/process` },
            { title: "Pricing", description: "Compute & Tokens", href: `${BASE}/pricing` },
          ],
        },
        {
          categoryTitle: "Developers",
          links: [
            { title: "Team", description: "Research Staff", href: `${BASE}/team` },
            {
              title: "Careers",
              description: "Hiring Systems Leads",
              href: `${BASE}/careers`,
              badge: "Hiring",
            },
            { title: "Journal", description: "Model Papers & Benchmarks", href: `${BASE}/blog` },
            {
              title: "Integrations",
              description: "SDKs & Cloud Mesh",
              href: `${BASE}/integrations`,
            },
            { title: "Changelog", description: "v4.2 Model Weights", href: `${BASE}/changelog` },
          ],
        },
      ],
      directLinks: [
        { label: "Capabilities", href: "#services" },
        { label: "Benchmarks", href: "#work" },
        { label: "Pipeline", href: "#process" },
        { label: "Pricing", href: "#pricing" },
      ],
      primaryCta: { label: "Deploy Cluster", href: `${BASE}/contact` },
      enableThemeToggle: true,
    },
    hero: {
      taglineBadge: { label: "Autonomous AI Engine v4.2" },
      headline: {
        preText: "Autonomous intelligence for engineering teams that",
        serifAccentWord: "ship",
        postText: ".",
      },
      description:
        "Multi-agent code synthesis, context vector caching, and real-time inference with verifiable formal proofs.",
      primaryCta: { label: "Explore Benchmarks", href: "#work" },
      secondaryCta: { label: "Schedule Benchmark", href: `${BASE}/book` },
      socialProof: {
        avatars: [
          "/assets/nexus/dani-akbar.jpg",
          "preset:avatar-monogram?name=Alex+Rivera",
          "preset:avatar-monogram?name=Siddharth+Patel",
        ],
        metricText: "Over 4.2B inference tokens evaluated with 99.8% accuracy.",
        ratingText: "Rated 4.9 by AI Engineers",
      },
      heroVisual: {
        src: "/assets/nexus/work-synapse.svg",
        alt: "Nexus Copilot Neural Mesh",
        badgeText: "Engine v4",
        aspectRatio: "16/9",
      },
      stats: [
        { value: "14ms", label: "Median TTFT" },
        { value: "99.8%", label: "Code Accuracy" },
      ],
    },
    logos: {
      headline: "Deployed in mission-critical environments by",
      speed: 35,
      logos: [
        { name: "Anthropic" },
        { name: "OpenAI" },
        { name: "Hugging Face" },
        { name: "Mistral" },
        { name: "Vercel" },
        { name: "Modal" },
        { name: "Scale AI" },
        { name: "Together" },
      ],
    },
    services: {
      sectionTag: "Core Engine",
      headline: "Four agentic layers, zero hallucination *risk*.",
      description:
        "From semantic context retrieval to production code synthesis with automated test execution.",
      services: [
        {
          index: "01",
          title: "Agentic Workflows",
          category: "Autonomy",
          description:
            "Multi-agent planning trees that break complex refactors into verifiable, deterministic diffs.",
          deliverables: ["Tree-of-thought routing", "Automated rollbacks", "Multi-file diffs"],
          previewImage: "/assets/nexus/service-webapp.svg",
          href: `${BASE}/services/detail`,
          timeline: "Instant",
        },
        {
          index: "02",
          title: "Code Synthesis",
          category: "Generation",
          description:
            "Context-aware code completion fine-tuned on AST syntax trees with zero layout shift.",
          deliverables: ["AST parsing", "Type check validation", "Security scanning"],
          previewImage: "/assets/nexus/service-brand.svg",
          href: `${BASE}/services/detail`,
          timeline: "14ms latency",
        },
        {
          index: "03",
          title: "Vector Mesh",
          category: "Memory",
          description:
            "Sub-millisecond retrieval of multi-gigabyte repos through tiered hierarchical vector embeddings.",
          deliverables: ["HNSW indexing", "Semantic chunking", "Local caching"],
          previewImage: "/assets/nexus/work-kroma.svg",
          href: `${BASE}/services/detail`,
          timeline: "Continuous",
        },
        {
          index: "04",
          title: "Formal Verification",
          category: "Reliability",
          description:
            "Automated test-suite execution in secure firewalled micro-VMs before pull-request submission.",
          deliverables: ["Sandboxed execution", "Coverage proofs", "Deterministic logs"],
          previewImage: "/assets/nexus/service-audit.svg",
          href: `${BASE}/services/detail`,
          timeline: "Automated",
        },
      ],
    },
    caseStudies: {
      sectionTag: "Field Outcomes",
      headline: "Measured in velocity and zero-defect *deliveries*.",
      description:
        "Real-world engineering organizations accelerating release cycles with Nexus Copilot.",
      projects: [
        {
          title: "Helix Neural Kernel",
          client: "Helix Robotics",
          category: "Embedded AI Firmware",
          year: "2026",
          metrics: { label: "Refactor speed", value: "+340%" },
          image: "/assets/nexus/work-synapse.svg",
          href: `${BASE}/projects/case-study`,
          featured: true,
        },
        {
          title: "VectorMesh Cloud",
          client: "VectorMesh Inc.",
          category: "Distributed Index",
          year: "2026",
          metrics: { label: "Inference Latency", value: "8.4ms" },
          image: "/assets/nexus/work-kroma.svg",
          href: `${BASE}/projects/case-study`,
        },
        {
          title: "Cerebrum Codebase",
          client: "Cerebrum Health",
          category: "HIPAA Compliant Copilot",
          year: "2025",
          metrics: { label: "Test Coverage", value: "99.4%" },
          image: "/assets/nexus/work-aura.svg",
          href: `${BASE}/projects/case-study`,
        },
        {
          title: "Aethel Security Audit",
          client: "Aethel Labs",
          category: "Formal Verification",
          year: "2026",
          metrics: { label: "Vulnerabilities Caught", value: "100%" },
          image: "/assets/nexus/work-vesper.svg",
          href: `${BASE}/projects/case-study`,
        },
      ],
    },
    process: {
      sectionTag: "Pipeline",
      headline: "From repository ingestion to live cluster in *four* phases.",
      description:
        "Every step is cryptographically audited and validated against strict safety constraints.",
      baseTop: "6.5rem",
      offsetStep: "1.5rem",
      phases: [
        {
          phaseNumber: "01",
          title: "Ingest",
          subtitle: "Repository AST & Vector Mapping",
          description:
            "Full dependency tree indexing and local semantic memory synthesis without data leak.",
          deliverables: ["AST Knowledge Graph", "Embedding Indexes"],
          timeline: "Day 1",
        },
        {
          phaseNumber: "02",
          title: "Specialize",
          subtitle: "Fine-Tuned Domain Adapters",
          description:
            "Lightweight LoRA adapters aligned to your team's code conventions and architecture rules.",
          deliverables: ["Custom Model Adapter", "Benchmark Suite"],
          timeline: "Day 2",
        },
        {
          phaseNumber: "03",
          title: "Enforce",
          subtitle: "Formal Sandboxed Evaluation",
          description: "Firewalled VM runners execute synthetic test suites on every agentic diff.",
          deliverables: ["Security Policies", "Determinism Reports"],
          timeline: "Day 3",
        },
        {
          phaseNumber: "04",
          title: "Deploy",
          subtitle: "Continuous Cluster Autopilot",
          description:
            "Direct integration into IDEs, CI pipelines, and automated review workflows.",
          deliverables: ["IDE Extensions", "CI Webhooks"],
          timeline: "Ongoing",
        },
      ],
    },
    pricing: {
      sectionTag: "Compute Tiers",
      headline: "Predictable cluster seats. Scale *dynamically*.",
      description:
        "Dedicated model inference clusters with zero noisy neighbors and enterprise SLAs.",
      quarterlyDiscountPercent: 20,
      tiers: [
        {
          name: "Developer",
          tagline: "For individual engineers and rapid prototyping.",
          monthlyPrice: 49,
          quarterlyPrice: 39,
          features: [
            "500k monthly inference tokens",
            "10 concurrent agent workflows",
            "Standard vector indexing",
            "Community Discord support",
          ],
          cta: { label: "Start Free Trial", href: `${BASE}/pricing?tier=developer` },
        },
        {
          name: "Team Cluster",
          tagline: "Dedicated compute cluster for engineering teams.",
          monthlyPrice: 149,
          quarterlyPrice: 119,
          isPopular: true,
          features: [
            "Unlimited inference tokens",
            "Dedicated private LoRA adapters",
            "Sub-15ms guaranteed latency",
            "SOC2 Type II compliance",
            "Priority Slack war-room",
          ],
          cta: { label: "Deploy Cluster", href: `${BASE}/pricing?tier=team` },
        },
        {
          name: "Enterprise",
          tagline: "On-premise or isolated VPC deployment with custom weights.",
          monthlyPrice: 499,
          quarterlyPrice: 399,
          features: [
            "Custom fine-tuned base models",
            "Zero data retention guarantee",
            "Unlimited team seats",
            "99.99% uptime SLA",
            "Dedicated solutions architect",
          ],
          cta: { label: "Contact Sales", href: `${BASE}/contact?tier=enterprise` },
        },
      ],
      guarantee: {
        title: "30-Day Benchmark Guarantee",
        text: "If our model does not outperform your existing baseline by 2x in velocity, full refund.",
      },
    },
    faqTestimonials: {
      sectionTag: "Verification",
      headline: "Evaluated by engineers, validated in *production*.",
      description: "Straightforward answers on privacy, model latency and infrastructure.",
      testimonials: [
        {
          quote:
            "Nexus Copilot cut our PR review cycles by 65%. The formal verification layer gives us complete confidence.",
          author: "Dr. Evelyn Reed",
          title: "VP of Engineering",
          company: "Helix Robotics",
          avatar: "preset:avatar-monogram?name=Evelyn+Reed",
          rating: 5,
        },
        {
          quote:
            "Sub-15ms response times with accurate multi-file context. It feels like pair programming with our principal architect.",
          author: "Marcus Vance",
          title: "CTO",
          company: "VectorMesh",
          avatar: "preset:avatar-monogram?name=Marcus+Vance",
          rating: 5,
        },
        {
          quote:
            "Finally an AI tool with zero hallucination in critical infrastructure code. The formal proof step is revolutionary.",
          author: "Siddharth Patel",
          title: "Head of Infrastructure",
          company: "Aethel Labs",
          avatar: "preset:avatar-monogram?name=Siddharth+Patel",
          rating: 5,
        },
      ],
      faq: [
        {
          question: "Where are our repository contents stored?",
          answer:
            "All vector embeddings are cached in isolated, tenant-partitioned VPCs. We enforce a strict zero data retention policy.",
        },
        {
          question: "How does the formal verification step prevent bugs?",
          answer:
            "Every code diff is executed in a firewalled micro-VM runner that runs type checkers, unit tests, and security scans before suggesting changes.",
        },
        {
          question: "Can we connect on-premise GitLab or GitHub Enterprise?",
          answer:
            "Yes, our agent connects via bidirectional webhooks and self-hosted runners behind your internal VPN.",
        },
      ],
    },
    footer: {
      splitHeadline: "ACCELERATE ENGINE",
      primaryCta: { label: "Deploy Cluster", href: `${BASE}/contact` },
      contactEmail: "copilot@nexus.ai",
      officeLocation: "San Francisco · Zurich · Tokyo",
      sitemapColumns: [
        {
          title: "Platform",
          links: [
            { label: "Overview", href: `${BASE}/about` },
            { label: "Capabilities", href: `${BASE}/services` },
            { label: "Benchmarks", href: `${BASE}/projects` },
            { label: "Pricing", href: `${BASE}/pricing` },
          ],
        },
        {
          title: "Developers",
          links: [
            { label: "Documentation", href: `${BASE}/integrations` },
            { label: "Changelog", href: `${BASE}/changelog` },
            { label: "Security", href: `${BASE}/privacy` },
            { label: "Terms", href: `${BASE}/terms` },
          ],
        },
      ],
      socialLinks: [
        { platform: "GitHub", href: "https://github.com" },
        { platform: "X", href: "https://x.com" },
        { platform: "Discord", href: "https://discord.com" },
      ],
      copyrightText: "© 2026 Nexus Copilot Systems Inc. All rights reserved.",
    },
    ai: {
      heroAi: {
        taglineBadge: { label: "Autonomous Agent Engine v4.2", pulsing: true },
        headline: {
          preText: "Autonomous intelligence for engineering teams that",
          highlightWord: "ship",
          postText: "production software.",
        },
        description:
          "Multi-agent code synthesis, context vector caching, and real-time inference with verifiable formal proofs.",
        primaryCta: { label: "Explore Benchmarks", href: "#benchmarks" },
        secondaryCta: { label: "Deploy Cluster", href: `${BASE}/contact` },
        samplePrompts: [
          "Synthesize distributed eBPF tracing hook for Go microservices",
          "Generate Tailwind v4 theme variables with OKLCH dynamic contrast",
          "Optimize PostgreSQL partitioned query indexing with explain plan",
          "Refactor OAuth PKCE authorization server to stateless JWT session",
        ],
        activeTokensCount: "4,821,904 tok/sec",
      },
      benchmarksStrip: {
        title: "Rigorous Formal Benchmarks vs Industry Frontier",
        metrics: [
          {
            label: "Time To First Token",
            value: "14ms",
            deltaVsCompetitor: "3.8x faster than GPT-4o",
            subtext: "Edge-routed Speculative Decoding",
          },
          {
            label: "SWE-Bench Verified",
            value: "94.6%",
            deltaVsCompetitor: "+18.2% vs Claude 3.5 Sonnet",
            subtext: "End-to-end repository bug resolution",
          },
          {
            label: "Throughput Efficiency",
            value: "185 tok/s",
            deltaVsCompetitor: "4.2x higher concurrency",
            subtext: "FP8 TensorRT-LLM inference cluster",
          },
          {
            label: "Context Verification",
            value: "100%",
            deltaVsCompetitor: "Zero silent hallucination",
            subtext: "Micro-VM sandboxed test execution",
          },
        ],
      },
      capabilitiesBento: {
        sectionTag: "ARCHITECTURAL CAPABILITIES",
        headline: "Engineered for autonomous precision, not casual chat.",
        description:
          "Replace superficial completion prompts with deep graph-level static analysis, isolated VM runners, and autonomous multi-agent consensus.",
        items: [
          {
            id: "cap-1",
            title: "Autonomous Graph RAG",
            description:
              "Constructs live AST call graphs across millions of lines of code. Understands deep symbol relations across microservices.",
            badge: "Deep Context",
            colSpan: 2,
            visualType: "graph-nodes",
            metrics: { label: "Index Latency", value: "<180ms" },
          },
          {
            id: "cap-2",
            title: "Sub-15ms Speculative Stream",
            description:
              "Parallel draft model verification delivering raw streaming speed with zero syntax truncation.",
            badge: "Streaming Engine",
            colSpan: 1,
            visualType: "latency-gauge",
            metrics: { label: "Median TTFT", value: "14ms" },
          },
          {
            id: "cap-3",
            title: "Micro-VM Sandboxed Proofs",
            description:
              "Every generated diff is compiled and tested inside an isolated firewalled container before suggestion.",
            badge: "Zero Hallucination",
            colSpan: 1,
            visualType: "code-stream",
            codeSnippet: `// VM Execution Guard
const res = await sandbox.run({
  cmd: "cargo test --workspace",
  timeoutMs: 3000
});
assert(res.exitCode === 0);`,
          },
          {
            id: "cap-4",
            title: "Multi-Agent Consensus Swarm",
            description:
              "Orchestrates specialized subagents (Security Auditor, Performance Profiler, Type Checker) in parallel before committing.",
            badge: "Multi-Agent",
            colSpan: 2,
            visualType: "vector-cluster",
            metrics: { label: "Pass Rate", value: "99.8%" },
          },
        ],
      },
      workflowClustering: {
        sectionTag: "AUTONOMOUS PIPELINE",
        headline: "From repository ingestion to verified deployment.",
        description:
          "Three synchronized phases ensure your codebase stays pristine while development velocity multiplies exponentially.",
        steps: [
          {
            stepNumber: "01",
            title: "Deep AST Symbol Ingestion",
            subtitle: "Repository Call-Graph Construction",
            description:
              "Our parser indexes syntax trees, types, and dependencies into an in-memory graph database with continuous delta sync.",
            metricsBadge: "Sub-second sync",
            codeExample: "agent.ingestTree('./src', { depth: 'exhaustive' })",
          },
          {
            stepNumber: "02",
            title: "Multi-Agent Speculative Drafting",
            subtitle: "Parallel Plan Synthesis",
            description:
              "Architect, coder, and test generator agents debate solutions in parallel, selecting the highest-confidence execution plan.",
            metricsBadge: "Consensus scored",
            codeExample: "consensus.resolve(['planA', 'planB'], threshold: 0.98)",
          },
          {
            stepNumber: "03",
            title: "Micro-VM Formal Verification",
            subtitle: "Automated Sandbox Proof",
            description:
              "Generated patches run against real compilers and integration suites in firewalled containers. Only 100% clean passes are offered.",
            metricsBadge: "100% verified",
            codeExample: "sandbox.verifyAll({ typecheck: true, lint: true })",
          },
        ],
      },
    },
  },
};
