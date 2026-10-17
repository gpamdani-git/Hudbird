// starter-kits/pro-templates/src/pages/VibecodeUiDetailPage.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Download,
  Terminal,
  Code2,
  Sun,
  Moon,
  Plus,
  Minus,
  CheckCircle2,
  X,
  Crown,
  Bookmark,
  Globe,
  Zap,
  Lock,
} from "lucide-react";
import { LivePreviewToolbar } from "../components/nexus-sections/LivePreviewToolbar";

/* -------------------------------------------------------------------------- */
/* Lazy-Load Image with Shimmer Pulse Skeleton                                */
/* -------------------------------------------------------------------------- */

function LazyThumbnail({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="relative h-full w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
      {!loaded && !error && (
        <div className="absolute inset-0 flex animate-pulse items-center justify-center bg-zinc-200/80 dark:bg-zinc-800/80">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-400 border-t-zinc-700 dark:border-zinc-600 dark:border-t-zinc-300" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => {
          setError(true);
          setLoaded(true);
        }}
        className={`${className} transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Component Detail Data Interface & Definitions                              */
/* -------------------------------------------------------------------------- */

export interface ComponentDetailData {
  id: string;
  category: string;
  subCategory: string;
  title: string;
  tagline: string;
  description: string;
  accent: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
    verified: boolean;
  };
  cliCommand: string;
  overview: string[];
  highlights: string[];
  specs: {
    category: string;
    published: string;
    framework: string;
    styling: string;
    animation: string;
    bundleSize: string;
    license: string;
  };
  tags: string[];
  slides: {
    title: string;
    badge: string;
    image: string;
  }[];
  faq: {
    q: string;
    a: string;
  }[];
}

const COMPONENT_ITEMS_MAP: Record<string, ComponentDetailData> = {
  sorvine: {
    id: "sorvine",
    category: "Templates",
    subCategory: "AI & Machine Learning",
    title: "AI Solutions Platform",
    tagline:
      "Next-gen autonomous reasoning engine, live neural copilot interface, and multi-agent streaming execution pipeline.",
    description:
      "A complete AI-native product interface engineered for developer platforms, agentic LLM assistants, and cloud inference systems.",
    accent: "#6366F1",
    author: {
      name: "HudbirdUI",
      handle: "@hudbirdui",
      avatar: "/assets/new-logo/hudbirdui-icon-black.svg",
      verified: true,
    },
    cliCommand: "npx @hudbird/ui add ai-solutions",
    overview: [
      "The AI Solutions Platform is crafted for founders and design engineers building intelligent autonomous copilots. It combines real-time streaming token visualizations with modular tool-calling panels, dynamic thought inspectors, and responsive latency meters.",
      "Engineered with React 19 server primitives and Tailwind CSS v4, this template includes dark and light theme parity, accessible keyboard shortcuts, and zero external layout thrashing.",
    ],
    highlights: [
      "Production-ready, documented React 19 source code",
      "Streaming markdown & code syntax highlighting blocks",
      "Multi-agent reasoning timeline with collapsible thoughts",
      "Drops into Next.js 15, Vite, or Remix with zero configuration",
    ],
    specs: {
      category: "Templates / AI",
      published: "Oct 2026",
      framework: "React 19 / Next.js 15",
      styling: "Tailwind CSS v4",
      animation: "Framer Motion",
      bundleSize: "14.2 KB (gzipped)",
      license: "Commercial & Personal",
    },
    tags: [
      "Artificial Intelligence",
      "Autonomous Agents",
      "Next.js 15",
      "Tailwind v4",
      "Full Source",
    ],
    slides: [
      {
        title: "Autonomous Reasoning Stage & Agent Pipeline",
        badge: "Hero Canvas",
        image: "/assets/templates/prebuilt/ai-solutions.jpg",
      },
      {
        title: "Audio Synthesis & Neural Voice Telemetry",
        badge: "Voice Matrix",
        image: "/assets/templates/prebuilt/ai-voice-generator.jpg",
      },
      {
        title: "Multi-Modal Agent Dialogue & Prompt Playground",
        badge: "Agent Chat",
        image: "/assets/templates/prebuilt/ai-chatbot.jpg",
      },
      {
        title: "Cloud Inference Cluster & Latency Analytics",
        badge: "Cluster Cockpit",
        image: "/assets/templates/prebuilt/ai-saas-software.jpg",
      },
    ],
    faq: [
      {
        q: "What do I get?",
        a: "The full source code for this template, ready to download, customize, and integrate into your production project.",
      },
      {
        q: "How do I access it?",
        a: "It is included with your HudbirdUI All-Access pass. Run the CLI command or download the complete TSX workspace instantly.",
      },
      {
        q: "Can I use this in client work?",
        a: "Yes. Your membership includes an unrestricted commercial license for personal, client, and commercial projects.",
      },
      {
        q: "What frameworks are supported?",
        a: "Fully tested and typed for React 19, Next.js 15 (App Router), Vite 6, and Tailwind CSS v4.",
      },
    ],
  },

  "crest-water-hero": {
    id: "crest-water-hero",
    category: "Sections",
    subCategory: "Fintech Hero",
    title: "Financial Management OS",
    tagline:
      "Dark cinematic fintech hero featuring a 3D credit card floating over a live reflective water horizon with real-time treasury analytics.",
    description:
      "A production-grade landing page hero section designed for modern cards, treasury protocols, and digital payment platforms.",
    accent: "#FF4D00",
    author: {
      name: "HudbirdUI",
      handle: "@hudbirdui",
      avatar: "/assets/new-logo/hudbirdui-icon-black.svg",
      verified: true,
    },
    cliCommand: "npx @hudbird/ui add financial-management-platform",
    overview: [
      "The Financial Management OS is engineered for fintech founders and creative developers who need a tactile, unforgettable first impression. Traditional hero sections rely on flat mockup screenshots; this component renders a responsive 3D floating debit card poised above a simulated reflective water plane with realistic horizon lighting.",
      "Optimized for 60fps performance across mobile and desktop browsers using pure CSS hardware transforms and hardware-accelerated Framer Motion springs.",
    ],
    highlights: [
      "3D perspective card tilt with realistic specular sheen & spring physics",
      "WebGL-inspired reflective water horizon backdrop with orange glow",
      "Interactive card detail preview with embedded balance & live action pills",
      "Dual polarity: stunning in dark mode, perfectly calibrated for light surfaces",
    ],
    specs: {
      category: "Sections / Hero",
      published: "Oct 2026",
      framework: "React 19 / Next.js 15",
      styling: "Tailwind CSS v4",
      animation: "Framer Motion Springs",
      bundleSize: "18.4 KB (gzipped)",
      license: "Commercial & Personal",
    },
    tags: ["Fintech", "3D Hero", "Cards", "Banking", "WebGL Water"],
    slides: [
      {
        title: "Real-Time Ledger Analytics & Treasury Cockpit",
        badge: "Hero Stage",
        image: "/assets/templates/prebuilt/financial-management-platform.jpg",
      },
      {
        title: "Digital Banking & Global Multi-Currency Cards",
        badge: "Banking UI",
        image: "/assets/templates/prebuilt/online-banking.jpg",
      },
      {
        title: "Global Checkout Engine & Instant Split API",
        badge: "Payment API",
        image: "/assets/templates/prebuilt/payment-solution.jpg",
      },
      {
        title: "Wealth & Portfolio Balance Telemetry",
        badge: "Portfolio Vault",
        image: "/assets/templates/prebuilt/personal-finance.jpg",
      },
    ],
    faq: [
      {
        q: "What do I get?",
        a: "The full source code for this component, complete with interactive 3D tilt physics, water reflection shaders, and responsive layout.",
      },
      {
        q: "How do I access it?",
        a: "It's included with your HudbirdUI membership. Download it instantly or add it to your project via the Hudbird CLI.",
      },
      {
        q: "Can I use this in client work?",
        a: "Yes. Your membership includes an unrestricted commercial license for personal, client, and commercial projects.",
      },
    ],
  },

  "credit-water-hero": {
    id: "credit-water-hero",
    category: "Sections",
    subCategory: "Fintech Hero",
    title: "Financial Management OS",
    tagline:
      "Dark cinematic fintech hero featuring a 3D credit card floating over a live reflective water horizon with real-time treasury analytics.",
    description:
      "A production-grade landing page hero section designed for modern cards, treasury protocols, and digital payment platforms.",
    accent: "#FF4D00",
    author: {
      name: "HudbirdUI",
      handle: "@hudbirdui",
      avatar: "/assets/new-logo/hudbirdui-icon-black.svg",
      verified: true,
    },
    cliCommand: "npx @hudbird/ui add financial-management-platform",
    overview: [
      "The Financial Management OS is engineered for fintech founders and creative developers who need a tactile, unforgettable first impression. Traditional hero sections rely on flat mockup screenshots; this component renders a responsive 3D floating debit card poised above a simulated reflective water plane with realistic horizon lighting.",
      "Optimized for 60fps performance across mobile and desktop browsers using pure CSS hardware transforms and hardware-accelerated Framer Motion springs.",
    ],
    highlights: [
      "3D perspective card tilt with realistic specular sheen & spring physics",
      "WebGL-inspired reflective water horizon backdrop with orange glow",
      "Interactive card detail preview with embedded balance & live action pills",
      "Dual polarity: stunning in dark mode, perfectly calibrated for light surfaces",
    ],
    specs: {
      category: "Sections / Hero",
      published: "Oct 2026",
      framework: "React 19 / Next.js 15",
      styling: "Tailwind CSS v4",
      animation: "Framer Motion Springs",
      bundleSize: "18.4 KB (gzipped)",
      license: "Commercial & Personal",
    },
    tags: ["Fintech", "3D Hero", "Cards", "Banking", "WebGL Water"],
    slides: [
      {
        title: "Real-Time Ledger Analytics & Treasury Cockpit",
        badge: "Hero Stage",
        image: "/assets/templates/prebuilt/financial-management-platform.jpg",
      },
      {
        title: "Digital Banking & Global Multi-Currency Cards",
        badge: "Banking UI",
        image: "/assets/templates/prebuilt/online-banking.jpg",
      },
      {
        title: "Global Checkout Engine & Instant Split API",
        badge: "Payment API",
        image: "/assets/templates/prebuilt/payment-solution.jpg",
      },
      {
        title: "Wealth & Portfolio Balance Telemetry",
        badge: "Portfolio Vault",
        image: "/assets/templates/prebuilt/personal-finance.jpg",
      },
    ],
    faq: [
      {
        q: "What do I get?",
        a: "The full source code for this component, complete with interactive 3D tilt physics, water reflection shaders, and responsive layout.",
      },
      {
        q: "How do I access it?",
        a: "It's included with your HudbirdUI membership. Download it instantly or add it to your project via the Hudbird CLI.",
      },
      {
        q: "Can I use this in client work?",
        a: "Yes. Your membership includes an unrestricted commercial license for personal, client, and commercial projects.",
      },
    ],
  },

  "orvane-ai-particle-hero": {
    id: "orvane-ai-particle-hero",
    category: "Sections",
    subCategory: "3D Particle Shader",
    title: "Neural Network Intelligence",
    tagline:
      "A WebGL2 hero where a 3D particle neural head responds to audio frequencies and cursor depth in real-time.",
    description:
      "An advanced Three.js WebGL hero component rendering a volumetric point-cloud neural head with mouse depth interaction and dynamic particle dispersal.",
    accent: "#3B82F6",
    author: {
      name: "HudbirdUI",
      handle: "@hudbirdui",
      avatar: "/assets/new-logo/hudbirdui-icon-black.svg",
      verified: true,
    },
    cliCommand: "npx @hudbird/ui add neural-network",
    overview: [
      "Constructed with raw Three.js buffer geometries and custom GLSL vertex shaders, this component features a 45,000 particle point cloud simulating human-grade cognition. When users move their cursor across the viewport, particles react with elastic repulsion forces and recalculate illumination in real time.",
      "Includes a live audio visualizer node that binds microphone or audio track frequency data directly to particle velocity vectors.",
    ],
    highlights: [
      "45,000 GPU-instanced particle buffer geometry running at constant 60 FPS",
      "Interactive pointer raycasting with elastic repulsion spring physics",
      "Dynamic bloom and chromatic aberration post-processing passes",
      "Audio reactive frequency node with automatic silence fallback",
    ],
    specs: {
      category: "Sections / 3D Shaders",
      published: "Oct 2026",
      framework: "React 19 / Three.js r168",
      styling: "Tailwind CSS v4",
      animation: "Custom GLSL Shaders",
      bundleSize: "28.5 KB (gzipped)",
      license: "Commercial & Personal",
    },
    tags: ["Three.js", "GLSL", "Particles", "Neural Net", "Audio Reactive"],
    slides: [
      {
        title: "3D Volumetric Token Visualizer & Particle Head",
        badge: "Point Cloud Stage",
        image: "/assets/templates/prebuilt/neural-network.jpg",
      },
      {
        title: "Cluster Supervisor & Distributed Neural Nodes",
        badge: "Node Supervisor",
        image: "/assets/templates/prebuilt/ai-software.jpg",
      },
      {
        title: "High-Dimensional Embedding Map & Vector Space",
        badge: "Vector Space",
        image: "/assets/templates/prebuilt/data-visualization-software.jpg",
      },
      {
        title: "Neural Studio Orchestrator & Weights Console",
        badge: "Studio Console",
        image: "/assets/templates/prebuilt/ai-application.jpg",
      },
    ],
    faq: [
      {
        q: "Does this require Three.js?",
        a: "Yes, it uses Three.js for WebGL buffer management. The package is pre-configured with tree-shaking so only required math and shader primitives are included.",
      },
      {
        q: "How does it perform on mobile devices?",
        a: "The component includes an automated GPU benchmark on mount that scales particle count down to 15,000 on low-power devices, guaranteeing silky 60fps performance.",
      },
    ],
  },

  "rootline-land-intelligence-hero": {
    id: "rootline-land-intelligence-hero",
    category: "Templates",
    subCategory: "Clean SaaS Dashboard",
    title: "Analytics & Telemetry Engine",
    tagline:
      "Enterprise data pipeline monitor and real-time telemetry dashboard with interactive streaming charts and cohort analytics.",
    description:
      "A high-precision editorial SaaS dashboard designed for geospatial intelligence, environmental sensors, and land management platforms.",
    accent: "#10B981",
    author: {
      name: "HudbirdUI",
      handle: "@hudbirdui",
      avatar: "/assets/new-logo/hudbirdui-icon-black.svg",
      verified: true,
    },
    cliCommand: "npx @hudbird/ui add analytics",
    overview: [
      "Analytics & Telemetry Engine is a masterclass in clean visual hierarchy and geospatial UX. Rather than cluttering the screen with dense tables, it pairs high-contrast metric summary cards with interactive topological vector elevation maps and real-time acreage telemetry.",
      "Includes animated counter pills, interactive chart scrubbers, and an integrated satellite imagery drawer with multi-spectral crop health overlays.",
    ],
    highlights: [
      "Topological elevation vector map with layer toggles and zoom physics",
      "Real-time acreage telemetry cards with animated tabular number counters",
      "Dynamic weather, soil moisture, and carbon credit yield estimators",
      "Responsive sidebar navigation with integrated project picker",
    ],
    specs: {
      category: "Templates / SaaS",
      published: "Oct 2026",
      framework: "React 19 / Next.js 15",
      styling: "Tailwind CSS v4",
      animation: "Framer Motion",
      bundleSize: "16.8 KB (gzipped)",
      license: "Commercial & Personal",
    },
    tags: ["GIS", "Dashboard", "SaaS", "Topography", "Clean UI"],
    slides: [
      {
        title: "Real-Time Pipeline Telemetry & Live Stream",
        badge: "Telemetry Stage",
        image: "/assets/templates/prebuilt/analytics.jpg",
      },
      {
        title: "Executive Metrics & Cohort Retention Analytics",
        badge: "Executive KPIs",
        image: "/assets/templates/prebuilt/analytics-reporting.jpg",
      },
      {
        title: "Streaming Event Stream & Time-Series Inspector",
        badge: "Event Stream",
        image: "/assets/templates/prebuilt/data-visualization.jpg",
      },
      {
        title: "Multi-Region Cloud Analytics & Edge Latency",
        badge: "Edge Metrics",
        image: "/assets/templates/prebuilt/cloud-software.jpg",
      },
    ],
    faq: [
      {
        q: "Can I connect real map APIs?",
        a: "Yes. The map container is architected with a clean adapter layer compatible with Mapbox GL, Maplibre, or Leaflet.",
      },
      {
        q: "Are the chart components modular?",
        a: "Yes, every chart component is a standalone React component that accepts standard JSON time-series data.",
      },
    ],
  },

  "alder-stone": {
    id: "alder-stone",
    category: "Templates",
    subCategory: "Architecture & Cloud",
    title: "Automation SaaS Platform",
    tagline:
      "Event-driven workflow composer and serverless queue orchestrator featuring 3D wireframe matrices.",
    description:
      "A scroll-driven architectural template featuring real-time 3D wireframe building matrices, minimalist typography, and editorial portfolio showcase.",
    accent: "#18181B",
    author: {
      name: "HudbirdUI",
      handle: "@hudbirdui",
      avatar: "/assets/new-logo/hudbirdui-icon-black.svg",
      verified: true,
    },
    cliCommand: "npx @hudbird/ui add automation-saas",
    overview: [
      "Automation SaaS Platform bridges high-end architectural aesthetics with modern web interaction. Built around an interactive 3D wireframe city matrix, the template responds to scroll progression by dissecting building structures into exploded axonometric views.",
      "Features high-fashion editorial typography, minimalist project indices, and smooth cursor-following project preview tooltips.",
    ],
    highlights: [
      "Scroll-linked 3D wireframe building model with exploded axonometric view",
      "Minimalist architectural index with interactive cursor preview cards",
      "Full dark / light polarity calibrated for gallery lighting conditions",
      "Award-winning typography pairing with ultra-clean grid lines",
    ],
    specs: {
      category: "Templates / Architecture",
      published: "Oct 2026",
      framework: "React 19 / Three.js",
      styling: "Tailwind CSS v4",
      animation: "Scroll-Driven Framer Motion",
      bundleSize: "19.2 KB (gzipped)",
      license: "Commercial & Personal",
    },
    tags: ["Architecture", "Editorial", "Wireframe 3D", "Scroll-Driven", "Portfolio"],
    slides: [
      {
        title: "Workflow Event Orchestrator & Serverless Queue",
        badge: "Workflow Stage",
        image: "/assets/templates/prebuilt/automation-saas.jpg",
      },
      {
        title: "Distributed Pipeline Monitor & Worker Fleet",
        badge: "Fleet Monitor",
        image: "/assets/templates/prebuilt/cloud-based-software.jpg",
      },
      {
        title: "Visual Block Composer & Low-Code Nodes",
        badge: "Block Composer",
        image: "/assets/templates/prebuilt/app-builder.jpg",
      },
      {
        title: "Developer CLI & Webhook Event Console",
        badge: "Webhook Console",
        image: "/assets/templates/prebuilt/app-development.jpg",
      },
    ],
    faq: [
      {
        q: "How does the 3D model work without heavy load times?",
        a: "The wireframe model is generated parametrically via lightweight procedural line segments, weighing less than 85 KB total.",
      },
    ],
  },

  "halovane-hologram-simulator": {
    id: "halovane-hologram-simulator",
    category: "Shaders",
    subCategory: "Cybersecurity",
    title: "Cyber Security Suite",
    tagline:
      "Zero-trust edge firewall telemetry, active intrusion prevention matrix, and live particle security scanner.",
    description:
      "An interactive WebGL hologram simulator featuring dual quantum emitter rings, volumetric particle beam projection, and realtime timeline scrubbing.",
    accent: "#06B6D4",
    author: {
      name: "HudbirdUI",
      handle: "@hudbirdui",
      avatar: "/assets/new-logo/hudbirdui-icon-black.svg",
      verified: true,
    },
    cliCommand: "npx @hudbird/ui add cyber-security",
    overview: [
      "Halovane Hologram Simulator delivers an interactive sci-fi computing experience in standard web browsers. It projects a volumetric cyber figure surrounded by two counter-rotating radiant quantum light rings.",
      "Includes a bottom timeline scrubber that lets users step forward and backward through the hologram boot sequence with millisecond precision.",
    ],
    highlights: [
      "Realtime particle projection shader with dual quantum emission rings",
      "Interactive timeline scrubber with frame-by-frame simulation playback",
      "Atmospheric volumetric dust particles and cinematic lens flares",
      "Fully responsive canvas with touch-friendly rotatable camera orbit",
    ],
    specs: {
      category: "Shaders / Hologram",
      published: "Oct 2026",
      framework: "React 19 / WebGL2",
      styling: "Tailwind CSS v4",
      animation: "Framer Motion & WebGL",
      bundleSize: "22.1 KB (gzipped)",
      license: "Commercial & Personal",
    },
    tags: ["Hologram", "Simulator", "Quantum Rings", "WebGL2", "Particle Projection"],
    slides: [
      {
        title: "Zero-Trust Security Telemetry & Perimeter Radar",
        badge: "Firewall Stage",
        image: "/assets/templates/prebuilt/cyber-security.jpg",
      },
      {
        title: "Threat Vector Analyzer & Exploit Mitigation",
        badge: "Threat Radar",
        image: "/assets/templates/prebuilt/security-software.jpg",
      },
      {
        title: "Cryptographic Key Vault & HSM Hardware Monitor",
        badge: "Key Vault",
        image: "/assets/templates/prebuilt/data-protection.jpg",
      },
      {
        title: "Compliance & Audit Radar Matrix",
        badge: "Audit Matrix",
        image: "/assets/templates/prebuilt/risk-management-software.jpg",
      },
    ],
    faq: [
      {
        q: "Can I use custom 3D models in the hologram?",
        a: "Yes, you can swap the mesh geometry with any glTF/GLB model using the provided useHologramMesh hook.",
      },
    ],
  },

  "emberline-fire-hero": {
    id: "emberline-fire-hero",
    category: "Sections",
    subCategory: "SaaS Cockpit",
    title: "Forex & Algorithmic Trading",
    tagline:
      "A one-screen SaaS hero for an operational analytics trading engine forged in real time with ambient fiery horizon arc.",
    description:
      "An elite, high-temperature SaaS hero section combining an orange-hot horizon arc shader with an operational analytics dark dashboard cockpit.",
    accent: "#F97316",
    author: {
      name: "HudbirdUI",
      handle: "@hudbirdui",
      avatar: "/assets/new-logo/hudbirdui-icon-black.svg",
      verified: true,
    },
    cliCommand: "npx @hudbird/ui add forex-trading",
    overview: [
      "Emberline Fire Hero is designed for infrastructure, developer tools, and operational telemetry products where uptime and power are paramount. It centers on an intense fiery horizon arc shader that casts dynamic amber and crimson illumination across an embedded analytics cockpit.",
      "The cockpit dashboard features real-time metric streams, server cluster health bars, latency graphs, and an interactive command palette modal.",
    ],
    highlights: [
      "GPU-accelerated ambient fiery horizon arc shader with procedural turbulence",
      "Complete operational analytics dark dashboard with interactive metric tiles",
      "Dynamic lighting cast across UI elements based on horizon intensity",
      "Award-winning layout matching premier Silicon Valley devtool launchpads",
    ],
    specs: {
      category: "Sections / SaaS Hero",
      published: "Oct 2026",
      framework: "React 19 / Next.js 15",
      styling: "Tailwind CSS v4",
      animation: "GLSL & Framer Motion",
      bundleSize: "24.6 KB (gzipped)",
      license: "Commercial & Personal",
    },
    tags: ["Fire Shader", "Devtools", "SaaS Cockpit", "Operational", "Premium"],
    slides: [
      {
        title: "Sub-Millisecond Order Book & Depth of Market",
        badge: "Terminal Stage",
        image: "/assets/templates/prebuilt/forex-trading.jpg",
      },
      {
        title: "Institutional Portfolio Vault & Multi-Asset Yield",
        badge: "Institutional Vault",
        image: "/assets/templates/prebuilt/wealth-management.jpg",
      },
      {
        title: "Quantitative Alpha Signals & Arbitrage Screener",
        badge: "Alpha Screener",
        image: "/assets/templates/prebuilt/investment-management.jpg",
      },
      {
        title: "Automated Market Maker & Liquidity Pool Cockpit",
        badge: "AMM Cockpit",
        image: "/assets/templates/prebuilt/decentralized-finance.jpg",
      },
    ],
    faq: [
      {
        q: "Is the fire horizon purely CSS or WebGL?",
        a: "It combines a lightweight WebGL procedural noise plane with hardware-accelerated CSS radial blur filters for maximum performance.",
      },
    ],
  },

  vigil: {
    id: "vigil",
    category: "Templates",
    subCategory: "Flagship Agency",
    title: "Digital Agency Studio",
    tagline:
      "A flagship agency narrative passage with immersive kinetic typography, client case studies, and studio decks.",
    description:
      "A cinematic, five-chapter night passage terminal where users journey through ancient fortress gates guarded by volumetric torches and zero-trust authentication.",
    accent: "#8B5CF6",
    author: {
      name: "HudbirdUI",
      handle: "@hudbirdui",
      avatar: "/assets/new-logo/hudbirdui-icon-black.svg",
      verified: true,
    },
    cliCommand: "npx @hudbird/ui add digital-agency",
    overview: [
      "Vigil is a storytelling experience built around tension, security, and prestige. Designed for high-end cybersecurity firms and privacy hardware, it takes visitors through five distinct narrative chapters.",
      "Features dynamic torchlight flickering, authentic soundscape trigger hooks, and cryptographic authorization forms embedded directly into 3D architecture.",
    ],
    highlights: [
      "Five-chapter narrative scroll flow with scene-by-scene audio trigger hooks",
      "Realtime torchlight illumination flickering and stone texture reflections",
      "Interactive gatehouse security puzzle with zero-trust key verification",
      "Cinematic widescreen ratio with letterbox presentation mode",
    ],
    specs: {
      category: "Templates / Narrative",
      published: "Oct 2026",
      framework: "React 19 / Next.js 15",
      styling: "Tailwind CSS v4",
      animation: "Framer Motion",
      bundleSize: "21.3 KB (gzipped)",
      license: "Commercial & Personal",
    },
    tags: ["Cybersecurity", "Narrative", "Gatehouse", "Dark Mode", "Interactive"],
    slides: [
      {
        title: "Award-Winning Digital Portfolio & Agency Stage",
        badge: "Flagship Agency",
        image: "/assets/templates/prebuilt/digital-agency.jpg",
      },
      {
        title: "Curated Editorial Case Studies & Brand Artifacts",
        badge: "Case Studies",
        image: "/assets/templates/prebuilt/creative-portfolio.jpg",
      },
      {
        title: "Brand Transformation Showcase & Media Studio",
        badge: "Brand Studio",
        image: "/assets/templates/prebuilt/digital-marketing-agency.jpg",
      },
      {
        title: "Kinetic Campaign Studio & AI Marketing Deck",
        badge: "Campaign Deck",
        image: "/assets/templates/prebuilt/ai-marketing-agency.jpg",
      },
    ],
    faq: [
      {
        q: "Can this be used as a company website?",
        a: "Yes! Many high-end agencies, cybersecurity firms, and luxury brands use Vigil to create an unforgettable narrative presence.",
      },
    ],
  },
};

const RELATED_PRODUCTS = [
  {
    id: "sorvine",
    title: "AI Solutions Platform",
    desc: "Next-gen autonomous reasoning engine and neural copilot.",
    image: "/assets/templates/prebuilt/ai-solutions.jpg",
    tag: "AI & WebGL",
    type: "Code",
  },
  {
    id: "crest-water-hero",
    title: "Financial Management OS",
    desc: "3D debit card floats over live reflective water plane.",
    image: "/assets/templates/prebuilt/financial-management-platform.jpg",
    tag: "Fintech Hero",
    type: "Code",
  },
  {
    id: "orvane-ai-particle-hero",
    title: "Neural Network Intelligence",
    desc: "WebGL2 3D particle human head responds to audio frequencies.",
    image: "/assets/templates/prebuilt/neural-network.jpg",
    tag: "WebGL Shader",
    type: "Code",
  },
  {
    id: "rootline-land-intelligence-hero",
    title: "Analytics & Telemetry Engine",
    desc: "Enterprise data pipeline monitor and real-time dashboard.",
    image: "/assets/templates/prebuilt/analytics.jpg",
    tag: "Clean SaaS",
    type: "Code",
  },
  {
    id: "alder-stone",
    title: "Automation SaaS Platform",
    desc: "Event-driven workflow composer with 3D wireframe matrices.",
    image: "/assets/templates/prebuilt/automation-saas.jpg",
    tag: "Architecture",
    type: "Vibe coding",
  },
  {
    id: "halovane-hologram-simulator",
    title: "Cyber Security Suite",
    desc: "Zero-trust edge firewall telemetry and live particle scanner.",
    image: "/assets/templates/prebuilt/cyber-security.jpg",
    tag: "Cybersecurity",
    type: "Vibe coding",
  },
  {
    id: "emberline-fire-hero",
    title: "Forex & Algorithmic Trading",
    desc: "Sub-millisecond order execution book with ambient fire arc.",
    image: "/assets/templates/prebuilt/forex-trading.jpg",
    tag: "SaaS Cockpit",
    type: "Code",
  },
  {
    id: "vigil",
    title: "Digital Agency Studio",
    desc: "Flagship agency narrative passage with immersive case studies.",
    image: "/assets/templates/prebuilt/digital-agency.jpg",
    tag: "Flagship Agency",
    type: "Code",
  },
];

/* -------------------------------------------------------------------------- */
/* Main Component View                                                        */
/* -------------------------------------------------------------------------- */

export function VibecodeUiDetailPage() {
  const { itemId = "crest-water-hero" } = useParams<{ itemId?: string }>();
  const [activeSlide, setActiveSlide] = useState(0);
  const [codeDrawerOpen, setCodeDrawerOpen] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [isDark, setIsDark] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Lookup target item
  const item: ComponentDetailData =
    COMPONENT_ITEMS_MAP[itemId] || COMPONENT_ITEMS_MAP["crest-water-hero"];

  useEffect(() => {
    document.title = `${item.title} — HudbirdUI Library`;
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveSlide(0);
  }, [itemId, item.title]);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleCopyCli = () => {
    navigator.clipboard.writeText(item.cliCommand);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2400);
  };

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setActiveSlide((prev) => (prev - 1 + item.slides.length) % item.slides.length);
      } else if (e.key === "ArrowRight") {
        setActiveSlide((prev) => (prev + 1) % item.slides.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [item.slides.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 45) {
      handleNextSlide();
    } else if (diff < -45) {
      handlePrevSlide();
    }
    touchStartX.current = null;
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + item.slides.length) % item.slides.length);
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % item.slides.length);
  };

  // Carousel geometry: responsive slide width & dynamic centered translateX
  const slideWidth = Math.min(
    Math.max(windowWidth * (windowWidth < 640 ? 0.86 : windowWidth < 1024 ? 0.74 : 0.66), 310),
    980
  );
  const slideGap = windowWidth < 640 ? 12 : 20;
  const translateX = (windowWidth - slideWidth) / 2 - activeSlide * (slideWidth + slideGap);

  const relatedItems = RELATED_PRODUCTS.filter((prod) => prod.id !== item.id).slice(0, 6);

  return (
    <div
      className={`min-h-screen bg-[#FAF9F5] font-sans text-zinc-900 antialiased transition-colors duration-300 dark:bg-[#07080C] dark:text-zinc-100`}
    >
      {/* Top Floating Pro Notification Bar */}
      <div className="border-b border-black/[0.06] bg-zinc-950 px-4 py-2 text-center text-xs font-medium text-white dark:border-white/10">
        <span>
          Introducing HudbirdUI 4.2 — 120+ WebGL Shaders, 3D Fan Decks &amp; 47+ Full-Page
          Templates.{" "}
        </span>
        <a href="#pricing" className="font-bold underline underline-offset-4 hover:text-[#C8F560]">
          Get Pro Access →
        </a>
      </div>

      {/* Sticky Top Header Navigation */}
      <header className="sticky top-0 z-40 border-b border-black/[0.06] bg-white/90 backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#090A0F]/90">
        <div className="mx-auto flex h-14 max-w-[1320px] items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand + Back Button */}
          <div className="flex items-center gap-3">
            <Link
              to="/vibecode-ui"
              className="flex items-center gap-2 text-zinc-950 transition-opacity hover:opacity-80 dark:text-white"
            >
              <img
                src="/assets/new-logo/hudbirdui-icon-black.svg"
                alt="HudbirdUI"
                className="h-6 w-6 dark:hidden"
              />
              <img
                src="/assets/new-logo/hudbirdui-icon-white.svg"
                alt="HudbirdUI"
                className="hidden h-6 w-6 dark:block"
              />
              <span className="text-sm font-bold tracking-tight">
                Hudbird<span className="font-normal text-zinc-400">.ui</span>
              </span>
            </Link>

            <span className="text-zinc-300 dark:text-zinc-700">/</span>

            <Link
              to="/vibecode-ui#demos"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Library</span>
            </Link>
          </div>

          {/* Center: Breadcrumbs matching HorizonX */}
          <nav className="hidden items-center gap-1.5 text-[13px] font-medium text-zinc-400 md:flex dark:text-zinc-500">
            <Link to="/" className="transition-colors hover:text-zinc-800 dark:hover:text-zinc-200">
              Home
            </Link>
            <span className="text-zinc-300 dark:text-zinc-700">/</span>
            <Link
              to="/vibecode-ui#demos"
              className="transition-colors hover:text-zinc-800 dark:hover:text-zinc-200"
            >
              Library
            </Link>
            <span className="text-zinc-300 dark:text-zinc-700">/</span>
            <span className="transition-colors hover:text-zinc-800 dark:hover:text-zinc-200">
              {item.category}
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">/</span>
            <span className="font-semibold text-zinc-900 dark:text-white">{item.title}</span>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-black/[0.08] bg-white text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-white/10 dark:bg-white/[0.06] dark:text-zinc-200"
              title="Toggle Light / Dark Theme"
            >
              {isDark ? (
                <Sun className="h-3.5 w-3.5 text-amber-400" />
              ) : (
                <Moon className="h-3.5 w-3.5" />
              )}
            </button>

            <Link
              to="/demos/digital-agency/sign-in"
              className="hidden text-xs font-medium text-zinc-600 transition-colors hover:text-zinc-950 sm:inline-block dark:text-zinc-300 dark:hover:text-white"
            >
              Login
            </Link>

            <a
              href="#pricing"
              className="inline-flex items-center rounded-full bg-zinc-950 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition-transform hover:scale-105 dark:bg-white dark:text-zinc-950"
            >
              Get All-Access
            </a>
          </div>
        </div>
      </header>

      {/* Main Container matching HorizonX clamp(1008px,66.67vw,1280px) */}
      <main id="main-content" className="w-full">
        <section className="mx-auto w-full max-w-[clamp(1008px,66.67vw,1280px)] space-y-6 px-4 py-8 sm:py-10 md:px-8">
          {/* Breadcrumb row on mobile */}
          <nav className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-zinc-400 md:hidden dark:text-zinc-500">
            <Link to="/vibecode-ui#demos" className="hover:text-zinc-700 dark:hover:text-zinc-300">
              Library
            </Link>
            <span>/</span>
            <span className="truncate font-semibold text-zinc-900 dark:text-white">
              {item.title}
            </span>
          </nav>

          {/* Header Banner Card matching HorizonX bg-articles */}
          <header className="space-y-5 rounded-[28px] border border-black/[0.06] bg-white p-5 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.04)] md:p-8 dark:border-white/[0.08] dark:bg-[#11131B]">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  {/* Category Pill Tag */}
                  <p className="mb-2 flex items-center gap-1.5 text-xs leading-snug font-semibold sm:text-[13px]">
                    <span className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-400">
                      <Crown className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                      Premium
                    </span>
                    <span className="text-zinc-300 dark:text-zinc-700">·</span>
                    <span className="font-medium text-zinc-500 dark:text-zinc-400">Code</span>
                    <span className="text-zinc-300 dark:text-zinc-700">·</span>
                    <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:bg-white/10 dark:text-zinc-300">
                      React 19 + Tailwind v4
                    </span>
                  </p>

                  {/* Title with exact HorizonX typography */}
                  <h1 className="text-2xl font-semibold tracking-[-0.03em] text-zinc-950 sm:text-3xl md:text-[34px] dark:text-white">
                    {item.title}
                  </h1>

                  {/* Tagline / Subtitle */}
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed font-normal text-zinc-500 sm:text-base dark:text-zinc-400">
                    {item.tagline}
                  </p>
                </div>

                {/* Bookmark Wishlist button */}
                <button
                  type="button"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-black/10 transition-colors hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/5"
                  aria-label="Save to wishlist"
                >
                  <Bookmark
                    className={`h-4 w-4 ${
                      isBookmarked
                        ? "fill-amber-500 text-amber-500"
                        : "text-zinc-600 dark:text-zinc-400"
                    }`}
                  />
                </button>
              </div>

              {/* Separator row with Author & Action CTAs */}
              <div className="flex flex-col gap-4 border-t border-black/[0.06] pt-5 sm:flex-row sm:items-center sm:justify-between dark:border-white/[0.08]">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/assets/new-logo/hudbirdui-icon-black.svg"
                    alt="HudbirdUI"
                    className="h-6 w-6 rounded-full dark:hidden"
                  />
                  <img
                    src="/assets/new-logo/hudbirdui-icon-white.svg"
                    alt="HudbirdUI"
                    className="hidden h-6 w-6 rounded-full dark:block"
                  />
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    HudbirdUI
                  </span>
                  <span className="inline-flex items-center gap-1 rounded bg-black/[0.05] px-1.5 py-0.5 text-[10px] font-medium text-zinc-500 dark:bg-white/10 dark:text-zinc-400">
                    <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Verified
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 md:justify-end">
                  <button
                    type="button"
                    onClick={() => setCodeDrawerOpen(true)}
                    className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-full border border-black/10 px-5 text-sm font-medium text-zinc-700 transition-colors hover:bg-black/5 dark:border-white/15 dark:text-zinc-300 dark:hover:bg-white/5"
                  >
                    <Code2 className="h-4 w-4" />
                    <span>View Full TSX</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyCli}
                    className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-full bg-zinc-950 px-6 text-sm font-medium text-white shadow-sm transition-all hover:scale-[1.03] dark:bg-white dark:text-zinc-950"
                  >
                    {copiedCli ? (
                      <Check className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <Terminal className="h-4 w-4" />
                    )}
                    <span>{copiedCli ? "Copied npx command!" : "Download Source Code"}</span>
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Full-Bleed Edge-to-Edge Continuous Slider (.peek-frame) matching Reference Image */}
          <div className="relative right-1/2 left-1/2 -mr-[50vw] -ml-[50vw] w-screen overflow-hidden py-4 sm:py-6">
            <div
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="flex items-center transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{
                transform: `translate3d(${translateX}px, 0, 0)`,
                gap: `${slideGap}px`,
              }}
            >
              {item.slides.map((slide, idx) => {
                const isActive = idx === activeSlide;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    style={{ width: `${slideWidth}px` }}
                    className={`relative aspect-[16/9] shrink-0 cursor-pointer overflow-hidden rounded-[24px] border transition-all duration-500 ease-out select-none sm:rounded-[32px] ${
                      isActive
                        ? "z-10 scale-100 border-black/10 opacity-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] dark:border-white/15 dark:shadow-[0_25px_65px_-15px_rgba(0,0,0,0.7)]"
                        : "z-0 scale-[0.93] border-black/[0.04] opacity-45 hover:opacity-75 dark:border-white/[0.06]"
                    }`}
                  >
                    <LazyThumbnail
                      src={slide.image}
                      alt={slide.title}
                      className="pointer-events-none h-full w-full object-cover"
                    />
                  </div>
                );
              })}
            </div>

            {/* Slider Controls matching HorizonX & Reference Image: Prev, Dots Capsule, Next */}
            <div className="mt-6 flex items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={handlePrevSlide}
                className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-black/[0.06] text-zinc-800 transition-colors hover:bg-black/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex h-9 items-center gap-2 rounded-full bg-black/[0.06] px-3.5 dark:bg-white/10">
                {item.slides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveSlide(idx)}
                    className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
                      idx === activeSlide
                        ? "w-6 bg-zinc-950 dark:bg-white"
                        : "w-2 bg-zinc-950/25 hover:bg-zinc-950/45 dark:bg-white/25 dark:hover:bg-white/50"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNextSlide}
                className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-black/[0.06] text-zinc-800 transition-colors hover:bg-black/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
                aria-label="Next slide"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Two-Column Main Content & Sticky Sidebar */}
          <div className="flex flex-col gap-6 lg:flex-row">
            {/* Left Column */}
            <div className="min-w-0 flex-1 space-y-6">
              {/* 1. Value Props 3-Tile Row */}
              <div className="rounded-[28px] border border-black/[0.06] bg-white p-4 md:p-5 dark:border-white/[0.08] dark:bg-[#11131B]">
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                  <li className="flex items-start gap-3 sm:flex-col sm:gap-2.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/5 text-zinc-900 dark:bg-white/10 dark:text-white">
                      <Zap className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm leading-snug font-medium text-zinc-950 dark:text-white">
                        Instant access
                      </span>
                      <span className="mt-0.5 block text-xs leading-snug text-zinc-500 dark:text-zinc-400">
                        Unlocked with membership
                      </span>
                    </span>
                  </li>
                  <li className="flex items-start gap-3 sm:flex-col sm:gap-2.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/5 text-zinc-900 dark:bg-white/10 dark:text-white">
                      <Download className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm leading-snug font-medium text-zinc-950 dark:text-white">
                        Full source code
                      </span>
                      <span className="mt-0.5 block text-xs leading-snug text-zinc-500 dark:text-zinc-400">
                        Download and run locally
                      </span>
                    </span>
                  </li>
                  <li className="flex items-start gap-3 sm:flex-col sm:gap-2.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/5 text-zinc-900 dark:bg-white/10 dark:text-white">
                      <Lock className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm leading-snug font-medium text-zinc-950 dark:text-white">
                        Commercial license
                      </span>
                      <span className="mt-0.5 block text-xs leading-snug text-zinc-500 dark:text-zinc-400">
                        Use in client &amp; commercial work
                      </span>
                    </span>
                  </li>
                </ul>
              </div>

              {/* 2. CLI / Offer Card */}
              <div className="rounded-[28px] border border-white/10 bg-zinc-950 p-5 text-white md:p-7 dark:bg-[#0c0d14]">
                <p className="text-base font-semibold">Not ready to subscribe yet?</p>
                <p className="mt-1 mb-4 text-sm text-white/70">
                  Install this module instantly via our CLI command or team license.
                </p>
                <div className="flex flex-col items-center gap-2.5 sm:flex-row">
                  <div className="flex w-full flex-1 items-center justify-between rounded-full border border-white/20 bg-white/10 px-5 py-2.5 font-mono text-xs text-zinc-200">
                    <span className="truncate">{item.cliCommand}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyCli}
                    className="flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-6 py-2.5 text-xs font-semibold text-zinc-950 transition hover:bg-white/90 sm:w-auto"
                  >
                    {copiedCli ? (
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    <span>{copiedCli ? "Copied!" : "Copy Command"}</span>
                  </button>
                </div>
              </div>

              {/* 3. Overview & Highlights Card */}
              <div className="space-y-6 rounded-[28px] border border-black/[0.06] bg-white p-5 md:p-8 dark:border-white/[0.08] dark:bg-[#11131B]">
                <article className="space-y-5 text-zinc-700 dark:text-zinc-300">
                  <h2 className="text-2xl font-semibold text-zinc-950 dark:text-white">Overview</h2>
                  <p className="text-base leading-relaxed whitespace-pre-line text-zinc-600 dark:text-zinc-300">
                    {item.overview.join("\n\n")}
                  </p>

                  <h2 className="pt-2 text-2xl font-semibold text-zinc-950 dark:text-white">
                    Highlights
                  </h2>
                  <ul className="list-none space-y-2.5">
                    {item.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-base text-zinc-800 dark:text-zinc-200"
                      >
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <h2 className="pt-2 text-2xl font-semibold text-zinc-950 dark:text-white">
                    Preview
                  </h2>
                  <div className="relative aspect-video overflow-hidden rounded-2xl border border-black/10 bg-zinc-950">
                    <LazyThumbnail
                      src={item.slides[0].image}
                      alt="Preview Canvas"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </article>
              </div>

              {/* 4. What's Included Card */}
              <div className="space-y-5 rounded-[28px] border border-black/[0.06] bg-white p-5 md:p-8 dark:border-white/[0.08] dark:bg-[#11131B]">
                <h2 className="text-2xl font-semibold text-zinc-950 dark:text-white">
                  What&apos;s included
                </h2>
                <ul className="grid grid-cols-1 gap-x-8 gap-y-3.5 sm:grid-cols-2">
                  <li className="flex items-center gap-3 text-base text-zinc-700 dark:text-zinc-300">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                      <Check className="h-3 w-3 text-emerald-600" />
                    </span>
                    <span>Full React 19 source code</span>
                  </li>
                  <li className="flex items-center gap-3 text-base text-zinc-700 dark:text-zinc-300">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                      <Check className="h-3 w-3 text-emerald-600" />
                    </span>
                    <span>README &amp; setup guide</span>
                  </li>
                  <li className="flex items-center gap-3 text-base text-zinc-700 dark:text-zinc-300">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                      <Check className="h-3 w-3 text-emerald-600" />
                    </span>
                    <span>Component documentation</span>
                  </li>
                  <li className="flex items-center gap-3 text-base text-zinc-700 dark:text-zinc-300">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                      <Check className="h-3 w-3 text-emerald-600" />
                    </span>
                    <span>Commercial &amp; client rights</span>
                  </li>
                </ul>
              </div>

              {/* 5. Frequently Asked Questions Accordion */}
              <div className="space-y-5 rounded-[28px] border border-black/[0.06] bg-white p-5 md:p-8 dark:border-white/[0.08] dark:bg-[#11131B]">
                <h2 className="text-2xl font-semibold text-zinc-950 dark:text-white">
                  Frequently asked questions
                </h2>
                <div className="divide-y divide-black/[0.06] dark:divide-white/[0.08]">
                  {item.faq.map((faqItem, idx) => {
                    const isOpen = expandedFaq === idx;
                    return (
                      <div key={idx} className="py-4">
                        <button
                          type="button"
                          onClick={() => setExpandedFaq(isOpen ? null : idx)}
                          className="group flex w-full cursor-pointer items-center justify-between gap-4 text-left"
                        >
                          <span className="text-base font-semibold text-zinc-950 transition-colors group-hover:text-indigo-600 md:text-lg dark:text-white dark:group-hover:text-indigo-400">
                            {faqItem.q}
                          </span>
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black/5 text-zinc-600 transition-transform dark:bg-white/10 dark:text-zinc-400">
                            {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                          </span>
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden pt-3 pr-10 text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400"
                            >
                              {faqItem.a}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Sidebar matching HorizonX */}
            <aside className="w-full shrink-0 lg:w-[380px] xl:w-[420px]">
              <div className="space-y-4 lg:sticky lg:top-24">
                {/* Developer Card */}
                <div className="space-y-4 rounded-[28px] border border-black/[0.06] bg-white p-5 md:p-6 dark:border-white/[0.08] dark:bg-[#11131B]">
                  <span className="text-xs font-medium tracking-wider text-zinc-400 uppercase">
                    Developer
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-black/5 dark:bg-white/10">
                      <img
                        src="/assets/new-logo/hudbirdui-icon-black.svg"
                        alt="HudbirdUI"
                        className="h-7 w-7 dark:hidden"
                      />
                      <img
                        src="/assets/new-logo/hudbirdui-icon-white.svg"
                        alt="HudbirdUI"
                        className="hidden h-7 w-7 dark:block"
                      />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-base font-semibold text-zinc-950 dark:text-white">
                        HudbirdUI
                      </p>
                      <p className="text-xs text-zinc-500">Official Design Systems Lab</p>
                    </div>
                  </div>
                </div>

                {/* Specs Card */}
                <div className="space-y-4 rounded-[28px] border border-black/[0.06] bg-white p-5 md:p-6 dark:border-white/[0.08] dark:bg-[#11131B]">
                  <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">Specs</h3>
                  <dl className="space-y-3">
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <dt className="text-zinc-500 dark:text-zinc-400">Category</dt>
                      <dd className="text-right font-medium text-zinc-950 dark:text-white">
                        {item.specs.category}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <dt className="text-zinc-500 dark:text-zinc-400">Subcategory</dt>
                      <dd className="text-right font-medium text-zinc-950 dark:text-white">
                        {item.subCategory}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <dt className="text-zinc-500 dark:text-zinc-400">Format</dt>
                      <dd className="text-right font-medium text-zinc-950 dark:text-white">
                        {item.specs.framework}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <dt className="text-zinc-500 dark:text-zinc-400">Styling</dt>
                      <dd className="text-right font-medium text-zinc-950 dark:text-white">
                        {item.specs.styling}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <dt className="text-zinc-500 dark:text-zinc-400">Delivery</dt>
                      <dd className="text-right font-medium text-zinc-950 dark:text-white">
                        Production-ready TSX
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <dt className="text-zinc-500 dark:text-zinc-400">Updated</dt>
                      <dd className="text-right font-medium text-zinc-950 dark:text-white">
                        {item.specs.published}
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* License Card */}
                <div className="space-y-3 rounded-[28px] border border-black/[0.06] bg-white p-5 md:p-6 dark:border-white/[0.08] dark:bg-[#11131B]">
                  <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">License</h3>
                  <p className="text-sm font-semibold text-zinc-950 dark:text-white">
                    Commercial license
                  </p>
                  <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      <span>Use in personal, client and commercial projects</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      <span>Modify and adapt the files</span>
                    </li>
                  </ul>
                </div>

                {/* Tags Card */}
                <div className="space-y-3 rounded-[28px] border border-black/[0.06] bg-white p-5 md:p-6 dark:border-white/[0.08] dark:bg-[#11131B]">
                  <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="rounded-full border border-black/10 px-3.5 py-1 text-xs font-medium text-zinc-700 dark:border-white/10 dark:text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* More from HudbirdUI */}
                <div className="space-y-3 rounded-[28px] border border-black/[0.06] bg-white p-5 md:p-6 dark:border-white/[0.08] dark:bg-[#11131B]">
                  <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">
                    More from HudbirdUI
                  </h3>
                  <ul className="space-y-2">
                    {RELATED_PRODUCTS.slice(0, 3).map((rel) => (
                      <li key={rel.id}>
                        <Link
                          to={`/vibecode-ui/item/${rel.id}`}
                          className="group flex items-center gap-3"
                        >
                          <img
                            src={rel.image}
                            alt={rel.title}
                            className="h-12 w-12 shrink-0 rounded-xl border border-black/10 object-cover dark:border-white/10"
                          />
                          <div className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-semibold text-zinc-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                              {rel.title}
                            </span>
                            <span className="block text-xs text-zinc-500">{rel.tag}</span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>

          {/* Related Products Section */}
          <div className="space-y-6 pt-10 md:pt-14">
            <h2 className="text-2xl font-semibold text-zinc-950 dark:text-white">
              Related Products
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedItems.map((prod) => (
                <Link
                  key={prod.id}
                  to={`/vibecode-ui/item/${prod.id}`}
                  className="group flex flex-col overflow-hidden rounded-[26px] border border-black/[0.08] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl dark:border-white/10 dark:bg-[#11131B]"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950">
                    <LazyThumbnail
                      src={prod.image}
                      alt={prod.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="truncate text-[15px] font-bold text-zinc-950 transition-colors group-hover:text-black dark:text-white dark:group-hover:text-[#C8F560]">
                          {prod.title}
                        </h3>
                        <span className="shrink-0 rounded-full bg-black/[0.05] px-2.5 py-0.5 text-[11px] font-medium text-zinc-600 dark:bg-white/10 dark:text-zinc-300">
                          {prod.type}
                        </span>
                      </div>
                      <p className="mt-1.5 line-clamp-1 text-xs text-zinc-500 dark:text-zinc-400">
                        {prod.desc}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center gap-2 border-t border-black/[0.06] pt-3 text-xs text-zinc-500 dark:border-white/[0.08] dark:text-zinc-400">
                      <img
                        src="/assets/new-logo/hudbirdui-icon-black.svg"
                        alt="HudbirdUI"
                        className="h-3.5 w-3.5 dark:hidden"
                      />
                      <img
                        src="/assets/new-logo/hudbirdui-icon-white.svg"
                        alt="HudbirdUI"
                        className="hidden h-3.5 w-3.5 dark:block"
                      />
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                        HudbirdUI
                      </span>
                      <span className="text-zinc-300 dark:text-zinc-700">·</span>
                      <span className="font-medium text-zinc-500 dark:text-zinc-400">
                        {prod.type}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            DARK NEWSLETTER & CELESTIAL PLANET HORIZON GLOW FOOTER (EXACT MATCH TO IMAGE 4)
        ===================================================================== */}
        <footer className="relative overflow-hidden bg-black text-white">
          {/* Top Newsletter Lead Row */}
          <div className="mx-auto max-w-[1400px] px-6 pt-16 pb-12 sm:px-10 lg:px-16">
            <div className="flex flex-col items-start justify-between gap-8 border-b border-white/[0.08] pb-12 sm:flex-row sm:items-end">
              <div className="max-w-xl">
                <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl lg:text-4xl">
                  New drops, straight to your inbox
                </h2>
                <p className="mt-3 text-sm text-zinc-400 sm:text-base">
                  Fresh templates, textures, shaders and tools the day they ship. No filler, just
                  what&apos;s new.
                </p>
              </div>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex w-full items-center rounded-full border border-white/20 bg-white/[0.05] p-1.5 focus-within:border-indigo-400/80 sm:w-[420px]"
              >
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="w-full bg-transparent px-4 text-sm text-white placeholder:text-zinc-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 cursor-pointer rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-zinc-950 transition-colors hover:bg-zinc-200"
                >
                  Notify me
                </button>
              </form>
            </div>
          </div>

          {/* Lower Section with Celestial Planet Horizon Gradient Arc Matching Image 4 */}
          <div
            className="relative pt-12"
            style={{
              background:
                "radial-gradient(4305px at 50% calc(100% + 4081px), #04030a 99.45%, #8a78ff 99.62%, #432dff73 99.8%, #432dff00 101.2%), radial-gradient(circle at 50% calc(100% - 224px), #fffffff2 0, #ded6ff99 26px, #785fff4d 90px, #432dff1a 210px, #432dff00 380px)",
            }}
          >
            {/* Columns: Brand + Product + Company + Resources + Legal */}
            <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16">
              <div className="grid grid-cols-12 gap-8 lg:gap-12">
                {/* Brand Column */}
                <div className="col-span-12 space-y-5 lg:col-span-4">
                  <Link to="/" className="inline-flex items-center gap-2.5">
                    <img
                      src="/assets/new-logo/hudbirdui-logo-white.svg"
                      alt="HudbirdUI"
                      className="h-6 w-auto"
                    />
                  </Link>
                  <div className="space-y-1.5">
                    <span className="block text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                      Contact
                    </span>
                    <a
                      href="mailto:support@hudbirdui.com"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-200 transition-colors hover:text-white"
                    >
                      <ArrowUpRight className="h-3.5 w-3.5" />
                      <span>support@hudbirdui.com</span>
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://discord.gg/hudbirdui"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 text-xs font-semibold text-white transition-colors hover:border-indigo-400 hover:bg-white/10"
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#5865F2] text-[10px] font-bold">
                        D
                      </span>
                      <span>Join our Discord</span>
                      <ArrowUpRight className="h-3 w-3 text-zinc-400" />
                    </a>
                  </div>
                  {/* Social Icons row matching Image 4 */}
                  <div className="flex items-center gap-4 pt-1 text-zinc-400">
                    <a
                      href="https://discord.gg/hudbirdui"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 transition-colors hover:text-white"
                      aria-label="Discord"
                    >
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                      </svg>
                    </a>
                    <a
                      href="https://x.com/hudbirdui"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 transition-colors hover:text-white"
                      aria-label="X (Twitter)"
                    >
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                    <a
                      href="https://instagram.com/hudbirdui"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 transition-colors hover:text-white"
                      aria-label="Instagram"
                    >
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                    <a
                      href="https://facebook.com/hudbirdui"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 transition-colors hover:text-white"
                      aria-label="Facebook"
                    >
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Product Column */}
                <div className="col-span-6 space-y-3 sm:col-span-3 lg:col-span-2">
                  <h4 className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                    Product
                  </h4>
                  <ul className="space-y-2 text-sm text-zinc-300">
                    <li>
                      <Link to="/vibecode-ui#demos" className="transition-colors hover:text-white">
                        Explore
                      </Link>
                    </li>
                    <li>
                      <Link to="/vibecode-ui#blocks" className="transition-colors hover:text-white">
                        Collections
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/vibecode-ui#pricing"
                        className="transition-colors hover:text-white"
                      >
                        Pricing
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/vibecode-ui#how-it-works"
                        className="transition-colors hover:text-white"
                      >
                        How it works
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Company Column */}
                <div className="col-span-6 space-y-3 sm:col-span-3 lg:col-span-2">
                  <h4 className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                    Company
                  </h4>
                  <ul className="space-y-2 text-sm text-zinc-300">
                    <li>
                      <Link to="/about" className="transition-colors hover:text-white">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link to="/blog" className="transition-colors hover:text-white">
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link to="/partnerships" className="transition-colors hover:text-white">
                        Partnerships
                      </Link>
                    </li>
                    <li>
                      <Link to="/affiliate" className="transition-colors hover:text-white">
                        Affiliate Program
                      </Link>
                    </li>
                    <li>
                      <Link to="/press" className="transition-colors hover:text-white">
                        Press
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Resources Column */}
                <div className="col-span-6 space-y-3 sm:col-span-3 lg:col-span-2">
                  <h4 className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                    Resources
                  </h4>
                  <ul className="space-y-2 text-sm text-zinc-300">
                    <li>
                      <Link to="/resources" className="transition-colors hover:text-white">
                        Vibe coding resources
                      </Link>
                    </li>
                    <li>
                      <Link to="/docs" className="transition-colors hover:text-white">
                        Docs
                      </Link>
                    </li>
                    <li>
                      <Link to="/faqs" className="transition-colors hover:text-white">
                        FAQ
                      </Link>
                    </li>
                    <li>
                      <Link to="/community" className="transition-colors hover:text-white">
                        Community
                      </Link>
                    </li>
                    <li>
                      <Link to="/contact" className="transition-colors hover:text-white">
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Legal Column */}
                <div className="col-span-6 space-y-3 sm:col-span-3 lg:col-span-2">
                  <h4 className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                    Legal
                  </h4>
                  <ul className="space-y-2 text-sm text-zinc-300">
                    <li>
                      <Link to="/terms" className="transition-colors hover:text-white">
                        Terms &amp; Conditions
                      </Link>
                    </li>
                    <li>
                      <Link to="/privacy" className="transition-colors hover:text-white">
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link to="/dmca" className="transition-colors hover:text-white">
                        DMCA
                      </Link>
                    </li>
                    <li>
                      <Link to="/cookies" className="transition-colors hover:text-white">
                        Cookies
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Big Atmospheric Horizon Space (where celestial glow radiates upward) */}
            <div className="h-[280px] sm:h-[340px] lg:h-[400px]" aria-hidden="true" />

            {/* Bottom Legal Row with subtle base shadow */}
            <div
              className="relative z-10 border-t border-white/[0.08] py-6"
              style={{
                background: "linear-gradient(#04030a00 0%, #04030a80 45%, #04030ab8 100%)",
              }}
            >
              <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 px-6 sm:flex-row sm:px-10 lg:px-16">
                <div className="flex items-center gap-4 text-xs text-zinc-400">
                  <span>&copy; 2026 HudbirdUI. All rights reserved.</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-zinc-300">
                    <Globe className="h-3 w-3 text-zinc-400" />
                    <span>English</span>
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-zinc-400">
                  <span>Secure payments</span>
                  <div className="flex items-center gap-1.5">
                    <span className="rounded border border-white/10 bg-white/[0.06] px-2 py-0.5 text-[10px] font-bold text-white italic">
                      VISA
                    </span>
                    <span className="rounded border border-white/10 bg-white/[0.06] px-2 py-0.5 text-[10px] font-semibold text-white">
                      Mastercard
                    </span>
                    <span className="rounded border border-white/10 bg-white/[0.06] px-2 py-0.5 text-[10px] font-semibold text-white">
                      AMEX
                    </span>
                    <span className="rounded border border-white/10 bg-white/[0.06] px-2 py-0.5 text-[10px] font-semibold text-white">
                      Apple Pay
                    </span>
                    <span className="rounded border border-white/10 bg-white/[0.06] px-2 py-0.5 text-[10px] font-semibold text-white lowercase">
                      stripe
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* Code Drawer Modal */}
      <AnimatePresence>
        {codeDrawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCodeDrawerOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] w-full max-w-2xl overflow-hidden rounded-3xl border border-white/15 bg-zinc-950 p-6 text-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="rounded-full bg-[#C8F560] px-2.5 py-0.5 text-[10px] font-bold text-zinc-950">
                    TypeScript Component
                  </span>
                  <h3 className="mt-1 text-lg font-bold">{item.title}.tsx</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setCodeDrawerOpen(false)}
                  className="cursor-pointer rounded-full bg-white/10 p-2 text-zinc-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4 max-h-[50vh] overflow-y-auto rounded-xl border border-white/10 bg-black/80 p-4 font-mono text-xs text-zinc-300">
                <pre>
                  <code>{`// ${item.title}.tsx
// Built with React 19 + Tailwind CSS v4
// Install via CLI: ${item.cliCommand}

import React from "react";
import { motion } from "framer-motion";

export function ${item.id
                    .split("-")
                    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
                    .join("")}() {
  return (
    <section className="relative w-full overflow-hidden bg-zinc-950 py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="text-4xl font-bold tracking-tight">${item.title}</h1>
        <p className="mt-4 max-w-2xl text-zinc-400">${item.tagline}</p>
      </div>
    </section>
  );
}`}</code>
                </pre>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <div className="text-xs text-zinc-400">{item.cliCommand}</div>
                <button
                  type="button"
                  onClick={handleCopyCli}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-white px-5 py-2 text-xs font-bold text-zinc-950 transition-colors hover:bg-[#C8F560]"
                >
                  {copiedCli ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedCli ? "Copied" : "Copy Source"}</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Bottom Navigator Pill */}
      <LivePreviewToolbar currentNiche="vibecode-ui" totalTemplatesCount={47} />
    </div>
  );
}

export default VibecodeUiDetailPage;
