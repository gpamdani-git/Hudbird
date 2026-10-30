// packages/schemas/src/niches/cyber-shield.ts
import { NicheConfig } from "../types";
import { createNicheInnerPages } from "./inner-pages";

const SLUG = "cyber-shield";
const BASE = `/demos/${SLUG}`;
const NAME = "CyberShield Cloud";

export const cyberShieldNiche: NicheConfig = {
  id: "cyber-shield",
  name: NAME,
  slug: SLUG,
  tagline: "Zero-Trust Cloud Mesh & Automated Threat Defense",
  category: "ai-saas",
  theme: {
    brandPrimary: "#6366F1", // Electric Indigo
    brandAccent: "#818CF8",
    fontDisplay: "var(--font-sans, Inter)",
    fontSerifAccent: "var(--font-serif, Instrument Serif)",
    fontSans: "var(--font-sans, Inter)",
    fontMono: "var(--font-mono, JetBrains Mono)",
    mode: "dark-default",
  },
  innerPages: createNicheInnerPages(SLUG, NAME),
  sections: {
    navbar: {
      brandName: "cybershield",
      brandTag: "security",
      navigationColumns: [
        {
          categoryTitle: "Mesh Platform",
          links: [
            { title: "Architecture", description: "Zero-Trust Kernel", href: `${BASE}/about` },
            {
              title: "Cloud Defense",
              description: "Autonomous Detection & Response",
              href: `${BASE}/services`,
            },
            {
              title: "Threat Surface",
              description: "Continuous Breach Simulation",
              href: `${BASE}/projects`,
            },
            {
              title: "Hardening Gates",
              description: "Policy-as-Code Orchestration",
              href: `${BASE}/process`,
            },
            {
              title: "Defense Tiers",
              description: "Enterprise Cloud Pricing",
              href: `${BASE}/pricing`,
            },
          ],
        },
        {
          categoryTitle: "SOC War Room",
          links: [
            {
              title: "Security Researchers",
              description: "White-Hat Staff & Hall of Fame",
              href: `${BASE}/team`,
            },
            {
              title: "Threat Intelligence",
              description: "0-Day Vulnerability Advisories",
              href: `${BASE}/blog`,
            },
            {
              title: "SOC Client Portal",
              description: "Real-Time Telemetry Feed",
              href: `${BASE}/portal`,
            },
            {
              title: "Compliance Frameworks",
              description: "SOC2, FedRAMP, HIPAA, ISO27001",
              href: `${BASE}/privacy`,
            },
            {
              title: "Incident Hotline",
              description: "Emergency Incident Response",
              href: `${BASE}/contact`,
            },
          ],
        },
      ],
      directLinks: [
        { label: "Cloud Defense", href: "#services" },
        { label: "Threat Surface", href: "#work" },
        { label: "Hardening", href: "#process" },
        { label: "Pricing", href: "#pricing" },
      ],
      primaryCta: { label: "Scan Cloud Mesh", href: `${BASE}/contact` },
      enableThemeToggle: true,
    },
    hero: {
      taglineBadge: { label: "Automated Zero-Trust Defense" },
      headline: {
        preText: "Autonomous zero-trust infrastructure that halts",
        serifAccentWord: "breaches",
        postText: ".",
      },
      description:
        "Micro-segmentation, continuous AI red-teaming, and sub-millisecond automated containment across AWS, GCP, and Kubernetes clusters.",
      primaryCta: { label: "Scan Attack Surface", href: "#services" },
      secondaryCta: { label: "Request Incident Brief", href: `${BASE}/book` },
      socialProof: {
        avatars: [
          "/assets/nexus/dani-akbar.jpg",
          "preset:avatar-monogram?name=Rachel+Voss",
          "preset:avatar-monogram?name=Tariq+Mansoor",
        ],
        metricText: "Guarding 4,500+ cloud VPCs with zero successful intrusions.",
        ratingText: "Rated 5.0 by Chief Information Security Officers",
      },
      heroVisual: {
        src: "/assets/nexus/service-audit.svg",
        alt: "CyberShield Real-Time Security Telemetry Radar",
        badgeText: "SOC Guard 24/7",
        aspectRatio: "16/9",
      },
      stats: [
        { value: "0.2s", label: "Threat Containment" },
        { value: "100%", label: "Zero-Day Mitigation" },
      ],
    },
    logos: {
      headline: "Enforcing zero-trust compliance for defense, fintech and healthcare",
      speed: 38,
      logos: [
        { name: "AWS Cloud" },
        { name: "Google Cloud" },
        { name: "Microsoft Azure" },
        { name: "Datadog" },
        { name: "CrowdStrike" },
        { name: "HashiCorp" },
        { name: "Palo Alto" },
      ],
    },
    services: {
      sectionTag: "Defense Capabilities",
      headline: "Four autonomous shields, zero breach *tolerance*.",
      description:
        "From kernel-level eBPF behavioral monitoring to automated cloud IAM privilege revoking.",
      services: [
        {
          index: "01",
          title: "Autonomous Red Teaming",
          category: "Offensive AI",
          description:
            "Synthetic AI agents continuously simulating sophisticated multi-stage APT lateral movements across your cloud assets.",
          deliverables: ["24/7 penetration tests", "Attack graph maps", "Exploit mitigation diffs"],
          previewImage: "/assets/nexus/service-audit.svg",
          href: `${BASE}/services/detail`,
          timeline: "Continuous",
        },
        {
          index: "02",
          title: "Micro-Segmentation Mesh",
          category: "Zero-Trust",
          description:
            "Cryptographically enforced eBPF network boundaries preventing malicious lateral traversal between Kubernetes pods.",
          deliverables: ["eBPF telemetry", "Mutual TLS mesh", "Zero network drift"],
          previewImage: "/assets/nexus/work-synapse.svg",
          href: `${BASE}/services/detail`,
          timeline: "Sub-millisecond",
        },
        {
          index: "03",
          title: "JIT Identity Bastion",
          category: "Access",
          description:
            "Ephemeral, just-in-time access credentials that auto-expire in 15 minutes with hardware token bio-attestation.",
          deliverables: ["FIDO2 WebAuthn", "Ephemeral SSH keys", "Immutable audit log"],
          previewImage: "/assets/nexus/work-kroma.svg",
          href: `${BASE}/services/detail`,
          timeline: "Instant",
        },
        {
          index: "04",
          title: "Supply Chain Shield",
          category: "DevSecOps",
          description:
            "Real-time verification of all container images and npm/pip packages before runtime deployment in production.",
          deliverables: ["Sigstore SBOMs", "Malicious package blocks", "Signed git commits"],
          previewImage: "/assets/nexus/service-webapp.svg",
          href: `${BASE}/services/detail`,
          timeline: "Automated",
        },
      ],
    },
    caseStudies: {
      sectionTag: "Active Defenses",
      headline: "Critical infrastructure defended against nation-state *adversaries*.",
      description:
        "Verifiable case records of complex zero-day threats neutralised in under 300 milliseconds.",
      projects: [
        {
          title: "Citadel Cloud Defense",
          client: "Citadel Financial",
          category: "Kubernetes Hardening",
          year: "2026",
          metrics: { label: "Breach Containment", value: "0.18s" },
          image: "/assets/nexus/service-audit.svg",
          href: `${BASE}/projects/case-study`,
          featured: true,
        },
        {
          title: "Sentinel Health Vault",
          client: "Sentinel Health",
          category: "HIPAA Zero-Trust Enclave",
          year: "2026",
          metrics: { label: "Compliance Pass", value: "100%" },
          image: "/assets/nexus/work-aura.svg",
          href: `${BASE}/projects/case-study`,
        },
        {
          title: "VaultNine Ledger Security",
          client: "VaultNine Inc.",
          category: "Key-Management Hardening",
          year: "2025",
          metrics: { label: "Privileged Leakage", value: "Zero" },
          image: "/assets/nexus/work-kroma.svg",
          href: `${BASE}/projects/case-study`,
        },
        {
          title: "Omnia Defense Mesh",
          client: "Omnia Aerospace",
          category: "Defense Supply Chain",
          year: "2026",
          metrics: { label: "Vulnerabilities Blocked", value: "2,400+" },
          image: "/assets/nexus/work-synapse.svg",
          href: `${BASE}/projects/case-study`,
        },
      ],
    },
    process: {
      sectionTag: "Hardening Gates",
      headline: "From perimeter audit to autonomous containment in *five* gates.",
      description:
        "Enforcing immutable cloud configuration policies that eliminate configuration drift.",
      baseTop: "6.5rem",
      offsetStep: "1.5rem",
      phases: [
        {
          phaseNumber: "01",
          title: "Discover",
          subtitle: "Complete Cloud Attack Surface",
          description:
            "Read-only enumeration of all IAM permissions, open ports, and orphaned assets across multi-cloud tenants.",
          deliverables: ["Attack Surface Matrix", "Orphaned Asset Ledger"],
          timeline: "Hour 1",
        },
        {
          phaseNumber: "02",
          title: "Segment",
          subtitle: "eBPF Policy Injection",
          description:
            "Deploy lightweight, low-overhead kernel probes that monitor inter-service traffic without adding latency.",
          deliverables: ["Kernel Probes", "Mutual TLS Rules"],
          timeline: "Day 1",
        },
        {
          phaseNumber: "03",
          title: "Simulate",
          subtitle: "Continuous Red-Team Attack",
          description:
            "Synthetic adversary agents attempt privilege escalation and data exfiltration under strict non-destructive bounds.",
          deliverables: ["Exploit Heatmaps", "Remediation Script"],
          timeline: "Day 2",
        },
        {
          phaseNumber: "04",
          title: "Shield",
          subtitle: "Autonomous Kill-Switch",
          description:
            "Instantly isolate compromised nodes and revoke leaked credentials in under 200 milliseconds.",
          deliverables: ["Automated Playbooks", "SIEM Webhooks"],
          timeline: "Live Active",
        },
        {
          phaseNumber: "05",
          title: "Certify",
          subtitle: "Automated Continuous Compliance",
          description:
            "Cryptographically signed compliance reports for SOC2 Type II, ISO 27001, and FedRAMP auditors.",
          deliverables: ["Auditor Evidence Vault", "Daily Badges"],
          timeline: "Continuous",
        },
      ],
    },
    pricing: {
      sectionTag: "Defense Tiers",
      headline: "Predictable cloud coverage. Zero surprise *penalties*.",
      description:
        "Billed simply by active cloud nodes with unlimited attack simulations and incident response.",
      quarterlyDiscountPercent: 20,
      tiers: [
        {
          name: "VPC Core",
          tagline: "For high-growth startups and critical microservices.",
          monthlyPrice: 1200,
          quarterlyPrice: 960,
          features: [
            "Up to 50 protected cloud nodes",
            "Continuous automated red-teaming",
            "eBPF network micro-segmentation",
            "Standard SOC2 compliance reports",
          ],
          cta: { label: "Deploy VPC Shield", href: `${BASE}/pricing?tier=core` },
        },
        {
          name: "Mesh Shield",
          tagline: "For mid-market enterprises with multi-cloud clusters.",
          monthlyPrice: 3400,
          quarterlyPrice: 2720,
          isPopular: true,
          features: [
            "Up to 250 protected cloud nodes",
            "Sub-200ms autonomous kill switch",
            "JIT ephemeral access bastion",
            "24/7 dedicated SOC war-room",
            "Custom compliance export pack",
          ],
          cta: { label: "Deploy Mesh Shield", href: `${BASE}/pricing?tier=mesh` },
        },
        {
          name: "Sovereign Enclave",
          tagline: "Dedicated defense infrastructure for regulated industries.",
          monthlyPrice: 9800,
          quarterlyPrice: 7840,
          features: [
            "Unlimited cloud nodes & clusters",
            "Air-gapped on-premise installation option",
            "Dedicated red-team staff assigned",
            "15-minute SLA incident hotline",
            "$10M cyber breach warranty indemnity",
          ],
          cta: { label: "Contact Defense Desk", href: `${BASE}/contact?tier=sovereign` },
        },
      ],
      guarantee: {
        title: "Zero-Breach Guarantee",
        text: "Backed by our $10,000,000 incident mitigation indemnity warranty for enterprise sovereign tier clients.",
      },
    },
    faqTestimonials: {
      sectionTag: "Security Assurance",
      headline: "Endorsed by CISOs, battle-tested in the *wild*.",
      description: "Clear answers on agent overhead, false positive rates and privacy guarantees.",
      testimonials: [
        {
          quote:
            "CyberShield stopped an active zero-day lateral breach in 180 milliseconds before our on-call engineers even woke up.",
          author: "Rachel Voss",
          title: "Chief Information Security Officer",
          company: "Citadel Financial",
          avatar: "preset:avatar-monogram?name=Rachel+Voss",
          rating: 5,
        },
        {
          quote:
            "Zero measurable latency penalty on our high-throughput Kubernetes clusters. The eBPF implementation is pure artistry.",
          author: "Tariq Mansoor",
          title: "Head of Cloud Infrastructure",
          company: "Sentinel Health",
          avatar: "preset:avatar-monogram?name=Tariq+Mansoor",
          rating: 5,
        },
        {
          quote:
            "Passed our SOC2 Type II audit in 4 days instead of 3 months because every policy was continuously self-attesting.",
          author: "Elena Rostova",
          title: "VP Security & Compliance",
          company: "VaultNine",
          avatar: "preset:avatar-monogram?name=Elena+Rostova",
          rating: 5,
        },
      ],
      faq: [
        {
          question: "Does the eBPF agent impact cluster CPU or memory performance?",
          answer:
            "No. Our eBPF probes operate strictly in kernel space with less than 0.8% CPU overhead and zero packet buffering delay.",
        },
        {
          question: "Does CyberShield inspect customer payload data?",
          answer:
            "Never. CyberShield inspects only network packet headers, system calls, and cryptographic handshakes. Payload data remains strictly encrypted and unread.",
        },
        {
          question: "How does the autonomous kill switch avoid breaking production?",
          answer:
            "Our engine uses surgical micro-segmentation that quarantines only the anomalous pod or connection without taking down healthy sibling containers.",
        },
      ],
    },
    footer: {
      splitHeadline: "DEFEND PERIMETER",
      primaryCta: { label: "Scan Cloud Mesh", href: `${BASE}/contact` },
      contactEmail: "defense@cybershield.security",
      officeLocation: "Tel Aviv · Washington D.C. · London",
      sitemapColumns: [
        {
          title: "Platform",
          links: [
            { label: "Overview", href: `${BASE}/about` },
            { label: "Cloud Defense", href: `${BASE}/services` },
            { label: "Threat Surface", href: `${BASE}/projects` },
            { label: "Pricing", href: `${BASE}/pricing` },
          ],
        },
        {
          title: "War Room",
          links: [
            { label: "Advisories", href: `${BASE}/blog` },
            { label: "Changelog", href: `${BASE}/changelog` },
            { label: "Compliance", href: `${BASE}/privacy` },
            { label: "Terms", href: `${BASE}/terms` },
          ],
        },
      ],
      socialLinks: [
        { platform: "GitHub", href: "https://github.com/gpamdani-git/Hudbird" },
        { platform: "X", href: "https://x.com" },
        { platform: "LinkedIn", href: "https://linkedin.com" },
      ],
      copyrightText: "© 2026 CyberShield Cloud Security Inc. All rights reserved.",
    },
    cyber: {
      heroCyber: {
        taglineBadge: { label: "eBPF Autonomous Defense v5.1", pulsing: true },
        headline: {
          preText: "Autonomous kernel-level defense against",
          highlightWord: "zero-day",
          postText: "threat vectors.",
        },
        description:
          "Zero-latency kernel telemetry, automated lateral kill-chain quarantine, and continuous compliance posture across all multi-cloud clusters.",
        primaryCta: { label: "Deploy eBPF Agent", href: `${BASE}/contact` },
        secondaryCta: { label: "View Threat Radar", href: "#radar" },
        liveThreatCount: "1,842,910",
        activeDefenses: [
          "Memory Exploits",
          "Container Escapes",
          "Privilege Escalation",
          "DNS Exfiltration",
          "DDoS Reflection",
        ],
      },
      defenseStrip: {
        metrics: [
          {
            label: "Threat Neutralization Rate",
            value: "99.98%",
            slaText: "Verified across 1.4B security events",
          },
          {
            label: "Mean Time to Quarantine (MTTQ)",
            value: "420ms",
            slaText: "Surgical in-kernel packet drop",
          },
          {
            label: "Kernel Overhead Impact",
            value: "<0.8%",
            slaText: "Zero measurable latency penalty",
          },
          {
            label: "Continuous Compliance",
            value: "SOC2 + ISO",
            slaText: "Zero-drift automated audit telemetry",
          },
        ],
      },
      cyberMatrixBento: {
        sectionTag: "DEFENSE ARCHITECTURE",
        headline: "Comprehensive protection spanning kernel to cloud boundary.",
        description:
          "Traditional firewalls miss container escapes and privilege escalations. CyberShield operates in deep Linux kernel space via non-intrusive eBPF hooks.",
        vectors: [
          {
            id: "vec-1",
            title: "Kernel-Space eBPF Probing",
            description:
              "Inspects system calls, network sockets, and memory allocations in real time before malicious instructions reach user space.",
            badge: "Ring 0 Defense",
            layer: "eBPF Kernel",
            status: "Active",
          },
          {
            id: "vec-2",
            title: "Autonomous Lateral Containment",
            description:
              "Isolates compromised microservice pods in under 420 milliseconds using surgical BPF filter injection without affecting healthy nodes.",
            badge: "Kill Chain Block",
            layer: "Automated Containment",
            status: "Zero-Day Protected",
          },
          {
            id: "vec-3",
            title: "Multi-Cloud Posture & Drift (CSPM)",
            description:
              "Continuously audits AWS IAM roles, Kubernetes RBAC, and GCP VPC peering against CIS benchmarks.",
            badge: "Continuous Audit",
            layer: "Cloud Posture (CSPM)",
            status: "Guarded",
          },
          {
            id: "vec-4",
            title: "Cryptographic Identity Attestation",
            description:
              "SPIFFE/SPIRE-backed mutual TLS verification for every service-to-service call. Replaces brittle static API secrets.",
            badge: "Zero Trust",
            layer: "Zero Trust Identity",
            status: "Active",
          },
        ],
      },
      containmentLifecycle: {
        sectionTag: "CONTAINMENT LIFECYCLE",
        headline: "From anomalous syscall to complete isolation in sub-second SLA.",
        description:
          "Experience the autonomous execution loop that disarms sophisticated APT attacks without human intervention.",
        phases: [
          {
            timeOffset: "0ms",
            title: "Anomalous Syscall Detected",
            action: "SYS_PTRACE hook flagged in Linux kernel",
            detail: "Unverified process attempts memory inspection of sibling container",
          },
          {
            timeOffset: "140ms",
            title: "Autonomous Threat Correlation",
            action: "Neural signature match with CVE-2026-9214",
            detail: "Kernel event correlated against global threat intelligence feed",
          },
          {
            timeOffset: "380ms",
            title: "Surgical Micro-Segmentation",
            action: "Network socket drop via eBPF TC filter",
            detail: "Ingress and egress traffic quarantined instantly at network interface",
          },
          {
            timeOffset: "720ms",
            title: "Forensic Memory Snapshot",
            action: "Container state frozen to secure vault",
            detail:
              "Full forensic artifact captured for CISO audit with zero production disruption",
          },
        ],
      },
    },
  },
};
