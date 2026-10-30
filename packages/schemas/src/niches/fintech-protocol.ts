// packages/schemas/src/niches/fintech-protocol.ts
import { NicheConfig } from "../types";
import { createNicheInnerPages } from "./inner-pages";

const SLUG = "fintech-protocol";
const BASE = `/demos/${SLUG}`;
const NAME = "Aura Protocol";

export const fintechProtocolNiche: NicheConfig = {
  id: "fintech-protocol",
  name: NAME,
  slug: SLUG,
  tagline: "Autonomous Yield, Institutional Liquidity & Web3 Treasury",
  category: "fintech",
  theme: {
    brandPrimary: "#F59E0B", // Amber Gold
    brandAccent: "#FBBF24",
    fontDisplay: "var(--font-sans, Inter)",
    fontSerifAccent: "var(--font-serif, Instrument Serif)",
    fontSans: "var(--font-sans, Inter)",
    fontMono: "var(--font-mono, JetBrains Mono)",
    mode: "dark-default",
  },
  innerPages: createNicheInnerPages(SLUG, NAME),
  sections: {
    navbar: {
      brandName: "aura",
      brandTag: "protocol",
      navigationColumns: [
        {
          categoryTitle: "Treasury",
          links: [
            {
              title: "Protocol Overview",
              description: "Architecture & Multi-Sig",
              href: `${BASE}/about`,
            },
            {
              title: "Treasury Vaults",
              description: "Autonomous Yield Strategies",
              href: `${BASE}/services`,
            },
            {
              title: "Liquidity Pools",
              description: "On-Chain Depth & Spreads",
              href: `${BASE}/projects`,
            },
            {
              title: "Risk Framework",
              description: "Mathematical Stress Tests",
              href: `${BASE}/process`,
            },
            {
              title: "Institutional Tiers",
              description: "Volume Tiers & Fees",
              href: `${BASE}/pricing`,
            },
          ],
        },
        {
          categoryTitle: "Security & Governance",
          links: [
            { title: "Auditors", description: "Formal Verification Reports", href: `${BASE}/team` },
            { title: "Governance DAO", description: "Proposals & Voting", href: `${BASE}/blog` },
            {
              title: "Institutional Portal",
              description: "Custody Integration",
              href: `${BASE}/portal`,
            },
            {
              title: "Compliance & AML",
              description: "Zero-Knowledge Travel Rule",
              href: `${BASE}/privacy`,
            },
            {
              title: "Institutional Contact",
              description: "Speak with Treasury Desk",
              href: `${BASE}/contact`,
            },
          ],
        },
      ],
      directLinks: [
        { label: "Vaults", href: "#services" },
        { label: "Liquidity", href: "#work" },
        { label: "Risk Model", href: "#process" },
        { label: "Yield Tiers", href: "#pricing" },
      ],
      primaryCta: { label: "Connect Custody", href: `${BASE}/portal` },
      enableThemeToggle: true,
    },
    hero: {
      taglineBadge: { label: "Institutional Treasury Protocol v3" },
      headline: {
        preText: "Institutional treasury management engineered for",
        serifAccentWord: "yield",
        postText: ".",
      },
      description:
        "Autonomous multi-vault allocation, zero-knowledge compliance, and sub-millisecond settlement across digital asset treasuries.",
      primaryCta: { label: "View Treasury Vaults", href: "#services" },
      secondaryCta: { label: "Book Desk Briefing", href: `${BASE}/book` },
      socialProof: {
        avatars: [
          "/assets/nexus/dani-akbar.jpg",
          "preset:avatar-monogram?name=Damian+Sterling",
          "preset:avatar-monogram?name=Helena+Vance",
        ],
        metricText: "$8.4B total asset value settled with zero liquidation events.",
        ratingText: "Rated 4.95 by Fund Treasurers",
      },
      heroVisual: {
        src: "/assets/nexus/work-kroma.svg",
        alt: "Aura Protocol Real-time Treasury Dashboard",
        badgeText: "Mainnet Live",
        aspectRatio: "16/9",
      },
      stats: [
        { value: "$8.4B", label: "Volume Settled" },
        { value: "0.0%", label: "Historical Slashing" },
      ],
    },
    logos: {
      headline: "Trusted by tier-one crypto funds, market makers and DAOs",
      speed: 40,
      logos: [
        { name: "Coinbase Prime" },
        { name: "Fireblocks" },
        { name: "Wintermute" },
        { name: "Jump Crypto" },
        { name: "ConsenSys" },
        { name: "Lido" },
        { name: "BitGo" },
      ],
    },
    services: {
      sectionTag: "Core Infrastructure",
      headline: "Four treasury primitives, zero counterparty *risk*.",
      description:
        "From programmatic yield harvesting to multi-jurisdiction regulatory automation.",
      services: [
        {
          index: "01",
          title: "Multi-Vault Allocation",
          category: "Treasury",
          description:
            "Real-time algorithmic rebalancing across insured blue-chip lending markets and delta-neutral yields.",
          deliverables: ["Automated rebalancing", "Slashing insurance", "Custom yield caps"],
          previewImage: "/assets/nexus/work-kroma.svg",
          href: `${BASE}/services/detail`,
          timeline: "Real-Time",
        },
        {
          index: "02",
          title: "Smart Settlement Engine",
          category: "Execution",
          description:
            "Sub-second atomic swaps routing through private liquidity pools with zero front-running (MEV protection).",
          deliverables: ["MEV immunity", "Atomic batching", "Gas abstraction"],
          previewImage: "/assets/nexus/work-aura.svg",
          href: `${BASE}/services/detail`,
          timeline: "Sub-second",
        },
        {
          index: "03",
          title: "ZK Regulatory Passports",
          category: "Compliance",
          description:
            "Zero-knowledge proofs validating compliance and accredited status without revealing underlying wallet balances.",
          deliverables: ["zk-KYC proofs", "Sanctions screening", "Audit trail"],
          previewImage: "/assets/nexus/service-audit.svg",
          href: `${BASE}/services/detail`,
          timeline: "Continuous",
        },
        {
          index: "04",
          title: "Custom Custody Routing",
          category: "Security",
          description:
            "Native integrations with Fireblocks, Qredo, and BitGo multi-sig governance workflows.",
          deliverables: ["Multi-sig policies", "Timelock controllers", "Emergency circuit breaker"],
          previewImage: "/assets/nexus/work-synapse.svg",
          href: `${BASE}/services/detail`,
          timeline: "Instant API",
        },
      ],
    },
    caseStudies: {
      sectionTag: "Treasury Deployments",
      headline: "Capital efficiency proven across market *cycles*.",
      description:
        "How leading venture funds and foundation treasuries safeguard assets on Aura Protocol.",
      projects: [
        {
          title: "Apex Horizon Treasury",
          client: "Horizon Capital",
          category: "Venture Fund Liquidity",
          year: "2026",
          metrics: { label: "Net APY Delivered", value: "+14.8%" },
          image: "/assets/nexus/work-kroma.svg",
          href: `${BASE}/projects/case-study`,
          featured: true,
        },
        {
          title: "Strata DAO Reserve",
          client: "Strata Foundation",
          category: "Decentralized Reserve",
          year: "2026",
          metrics: { label: "Assets Under Shield", value: "$420M" },
          image: "/assets/nexus/work-aura.svg",
          href: `${BASE}/projects/case-study`,
        },
        {
          title: "Sovereign Ledger Prime",
          client: "Sovereign Wealth",
          category: "Institutional Custody",
          year: "2025",
          metrics: { label: "Settlement Speed", value: "0.8s" },
          image: "/assets/nexus/service-webapp.svg",
          href: `${BASE}/projects/case-study`,
        },
        {
          title: "Kroma Yield Engine",
          client: "Kroma Labs",
          category: "Automated Treasury",
          year: "2026",
          metrics: { label: "Gas Savings", value: "92%" },
          image: "/assets/nexus/service-audit.svg",
          href: `${BASE}/projects/case-study`,
        },
      ],
    },
    process: {
      sectionTag: "Protocol Mechanics",
      headline: "From custody integration to yield streaming in *five* gates.",
      description:
        "Every strategy requires multi-sig threshold approvals and formal mathematical proofs.",
      baseTop: "6.5rem",
      offsetStep: "1.5rem",
      phases: [
        {
          phaseNumber: "01",
          title: "Bind",
          subtitle: "Custody & Multi-Sig Binding",
          description:
            "Establish zero-knowledge API connections with your existing institutional custodian.",
          deliverables: ["Custody link", "Policy boundaries"],
          timeline: "Day 1",
        },
        {
          phaseNumber: "02",
          title: "Model",
          subtitle: "Risk & VaR Simulation",
          description:
            "Simulate worst-case liquidity cascades using 10,000 historical market stress-test scenarios.",
          deliverables: ["VaR Report", "Drawdown bounds"],
          timeline: "Day 2",
        },
        {
          phaseNumber: "03",
          title: "Deploy",
          subtitle: "Isolated Vault Deployment",
          description:
            "Spin up a dedicated smart vault contract governed solely by your institution's signing keys.",
          deliverables: ["Dedicated contract", "Audited source"],
          timeline: "Day 3",
        },
        {
          phaseNumber: "04",
          title: "Harvest",
          subtitle: "Programmatic Rebalancing",
          description:
            "Continuous yield optimization routing capital through delta-neutral protocol positions.",
          deliverables: ["Automated compounding", "Telemetry dashboard"],
          timeline: "Active",
        },
        {
          phaseNumber: "05",
          title: "Audit",
          subtitle: "Real-Time Proof of Reserves",
          description:
            "Live on-chain cryptographic proofs confirming solvency and asset reserves 24/7/365.",
          deliverables: ["Chainlink PoR", "Live attestations"],
          timeline: "Continuous",
        },
      ],
    },
    pricing: {
      sectionTag: "Institutional Tiers",
      headline: "Transparent basis-point fees. No hidden *spreads*.",
      description: "Pay purely on capital deployed with volume discounts and zero exit fees.",
      quarterlyDiscountPercent: 20,
      tiers: [
        {
          name: "Fund Core",
          tagline: "For boutique crypto funds and family offices.",
          monthlyPrice: 2500,
          quarterlyPrice: 2000,
          features: [
            "Up to $25M Treasury AUM",
            "3 multi-sig signing policies",
            "Daily liquidity rebalancing",
            "Standard ZK-compliance pass",
          ],
          cta: { label: "Deploy Fund Vault", href: `${BASE}/pricing?tier=fund` },
        },
        {
          name: "Prime Protocol",
          tagline: "For mid-sized foundations and institutional funds.",
          monthlyPrice: 7500,
          quarterlyPrice: 6000,
          isPopular: true,
          features: [
            "Up to $150M Treasury AUM",
            "Unlimited signing workflows",
            "Sub-second MEV-proof settlement",
            "Dedicated quantitative risk officer",
            "Slashing insurance indemnity",
          ],
          cta: { label: "Onboard Prime Vault", href: `${BASE}/pricing?tier=prime` },
        },
        {
          name: "Sovereign Institutional",
          tagline: "Custom bespoke infrastructure for Tier-1 institutions.",
          monthlyPrice: 18000,
          quarterlyPrice: 14400,
          features: [
            "Unlimited Treasury AUM",
            "Custom smart contract development",
            "Private dark-pool liquidity routing",
            "Direct hotline with protocol architects",
            "SOC1 & SOC2 Type II audit pack",
          ],
          cta: { label: "Contact Treasury Desk", href: `${BASE}/contact?tier=sovereign` },
        },
      ],
      guarantee: {
        title: "Mathematical Security Assurance",
        text: "Zero smart-contract vulnerabilities covered up to $50M via our institutional insurance backstop.",
      },
    },
    faqTestimonials: {
      sectionTag: "Institutional Assurance",
      headline: "Verified by auditors, trusted with *billions*.",
      description:
        "Direct answers regarding smart contract audits, custody keys and emergency procedures.",
      testimonials: [
        {
          quote:
            "Aura Protocol has handled our $180M foundation treasury for over 18 months with zero downtime and steady 14% yield.",
          author: "Damian Sterling",
          title: "Chief Investment Officer",
          company: "Horizon Capital",
          avatar: "preset:avatar-monogram?name=Damian+Sterling",
          rating: 5,
        },
        {
          quote:
            "The ZK-compliance passport resolved our regulatory reporting friction overnight. Clean, institutional engineering.",
          author: "Helena Vance",
          title: "Head of Treasury Operations",
          company: "Apex Liquid",
          avatar: "preset:avatar-monogram?name=Helena+Vance",
          rating: 5,
        },
        {
          quote:
            "MEV-protected settlement without exposing orders to the public mempool saved our desk an estimated 80 bps.",
          author: "Marcus Chen",
          title: "Managing Partner",
          company: "Strata Digital",
          avatar: "preset:avatar-monogram?name=Marcus+Chen",
          rating: 5,
        },
      ],
      faq: [
        {
          question: "Does Aura Protocol have access to client private keys?",
          answer:
            "Never. Aura Protocol is completely non-custodial. All operations execute strictly via your own multi-sig keys (e.g. Fireblocks, Safe, BitGo).",
        },
        {
          question: "Who audited the protocol smart contracts?",
          answer:
            "Our smart contracts have undergone formal verification by OpenZeppelin, Trail of Bits, and Certora with zero high-severity vulnerabilities.",
        },
        {
          question: "How quickly can funds be withdrawn in market downturns?",
          answer:
            "There are zero lockup periods or exit fees. Treasury assets can be withdrawn or converted to cash equivalents instantly in a single transaction block.",
        },
      ],
    },
    footer: {
      splitHeadline: "SOVEREIGN CAPITAL",
      primaryCta: { label: "Connect Custody", href: `${BASE}/portal` },
      contactEmail: "treasury@auraprotocol.fi",
      officeLocation: "Zug · Singapore · New York",
      sitemapColumns: [
        {
          title: "Protocol",
          links: [
            { label: "Overview", href: `${BASE}/about` },
            { label: "Treasury Vaults", href: `${BASE}/services` },
            { label: "Liquidity Pools", href: `${BASE}/projects` },
            { label: "Institutional Tiers", href: `${BASE}/pricing` },
          ],
        },
        {
          title: "Security & Legal",
          links: [
            { label: "Audits", href: `${BASE}/team` },
            { label: "Changelog", href: `${BASE}/changelog` },
            { label: "Privacy Policy", href: `${BASE}/privacy` },
            { label: "Terms of Service", href: `${BASE}/terms` },
          ],
        },
      ],
      socialLinks: [
        { platform: "X", href: "https://x.com" },
        { platform: "Discord", href: "https://discord.com" },
        { platform: "GitHub", href: "https://github.com/gpamdani-git/Hudbird" },
      ],
      copyrightText: "© 2026 Aura Protocol Labs Ltd. All rights reserved.",
    },
    fintech: {
      heroFintech: {
        taglineBadge: { label: "Decentralized Liquidity Mesh v2.8", pulsing: true },
        headline: {
          preText: "Algorithmic treasury and sovereign liquidity for",
          highlightWord: "global",
          postText: "institutions.",
        },
        description:
          "Institutional-grade yield optimization, sub-millisecond cross-currency settlement, and provable non-custodial risk engine.",
        primaryCta: { label: "Launch Terminal", href: `${BASE}/portal` },
        secondaryCta: { label: "Schedule Audit Review", href: `${BASE}/contact` },
        liveApy: "14.82% Weighted APY",
        supportedCurrencies: [
          { code: "USD", symbol: "$", rate: "1.0000", change24h: "+0.01%" },
          { code: "EUR", symbol: "€", rate: "1.0842", change24h: "+0.18%" },
          { code: "GBP", symbol: "£", rate: "1.2915", change24h: "-0.04%" },
          { code: "JPY", symbol: "¥", rate: "153.20", change24h: "+0.45%" },
          { code: "CHF", symbol: "Fr", rate: "0.8920", change24h: "+0.02%" },
        ],
      },
      treasuryStrip: {
        metrics: [
          {
            label: "Total Value Locked (TVL)",
            value: "$8,429,180,412",
            detail: "+18.4% monthly expansion",
            trendingUp: true,
          },
          {
            label: "Institutional Weighted APY",
            value: "14.82%",
            detail: "Zero liquidation history across 4 years",
            trendingUp: true,
          },
          {
            label: "Average Settlement Velocity",
            value: "420ms",
            detail: "Instant atomic liquidity delivery",
            trendingUp: true,
          },
          {
            label: "Verified Proof of Reserves",
            value: "100.0%",
            detail: "Real-time cryptographically attested by Chainlink",
            trendingUp: true,
          },
        ],
      },
      financialBento: {
        sectionTag: "TREASURY DYNAMICS",
        headline: "Engineered for institutional capital preservation.",
        description:
          "Automate cross-border liquidity routing, eliminate foreign exchange slippage, and hold reserves in audited non-custodial smart vaults.",
        cards: [
          {
            id: "fb-1",
            title: "Dynamic Multi-Asset Vaults",
            description:
              "Self-rebalancing liquidity engines that deploy capital into risk-curated delta-neutral staking, lending, and liquidity pools.",
            badge: "Automated Alpha",
            colSpan: 2,
            type: "yield-vault",
          },
          {
            id: "fb-2",
            title: "Zero-Spread Currency Settlement",
            description:
              "Instant FX swaps directly against deep decentralized automated market-makers with sub-millisecond execution.",
            badge: "Forex Engine",
            colSpan: 1,
            type: "multi-currency-card",
          },
          {
            id: "fb-3",
            title: "Isolated Risk Collateral",
            description:
              "Every pool operates in segregated sandboxes. Bad debt cannot propagate across unrelated collateral markets.",
            badge: "Risk Ringfencing",
            colSpan: 1,
            type: "liquidity-pool",
          },
          {
            id: "fb-4",
            title: "Atomic Institutional Settlement",
            description:
              "Simultaneous delivery-versus-payment eliminating counterparty risk and multi-day clearinghouse delays.",
            badge: "Atomic DvP",
            colSpan: 2,
            type: "instant-settlement",
          },
        ],
      },
      accountingRails: {
        sectionTag: "GLOBAL CONNECTIVITY",
        headline: "Seamless bridge to traditional enterprise ledgers.",
        description:
          "Direct bidirectional sync with tier-1 accounting suites, core banking rails, and institutional custodian multi-sigs.",
        partners: [
          {
            name: "Stripe Treasury",
            type: "Fiat On/Off Ramp",
            status: "Live Feed",
            latency: "140ms",
          },
          {
            name: "QuickBooks Enterprise",
            type: "Automated Reconciliation",
            status: "Continuous Sync",
            latency: "Real-time",
          },
          {
            name: "Xero Accounting",
            type: "Tax & FX Ledger",
            status: "Certified App",
            latency: "Sub-second",
          },
          {
            name: "Fireblocks Custody",
            type: "Institutional MPC Multi-Sig",
            status: "Protected",
            latency: "Enclave",
          },
          {
            name: "Plaid Financial",
            type: "ACH & FedNow Clearing",
            status: "Instant Link",
            latency: "Atomic",
          },
          {
            name: "Bloomberg AIM",
            type: "Portfolio Compliance Feed",
            status: "Enterprise FIX",
            latency: "Direct",
          },
        ],
      },
    },
  },
};
