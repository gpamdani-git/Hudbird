// starter-kits/pro-templates/src/pages/VibecodeUiTheme.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Play,
  Copy,
  Check,
  ArrowUpRight,
  Plus,
  Minus,
  Sun,
  Moon,
  Terminal,
  Sliders,
  Layers,
  Code2,
  X,
  Star,
  ArrowLeft,
  Volume2,
  Eye,
  Crown,
  Globe,
} from "lucide-react";
import { PEXELS } from "../components/nexus-sections/HudbirdVisualWidgets";
import { LivePreviewToolbar } from "../components/nexus-sections/LivePreviewToolbar";

/* -------------------------------------------------------------------------- */
/* Lazy-Load Image with Skeleton Loader                                       */
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
      {/* Animated shimmer skeleton while loading */}
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
/* HorizonX 4-Quadrant Emblem Mark                                            */
/* -------------------------------------------------------------------------- */

function HorizonXLogo({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="currentColor" fillOpacity="0.15" />
      <path
        d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm1 1.08a8 8 0 016.92 6.92H13zm-2 0V10H4.08A8 8 0 0111 3.08zM4.08 14H11v6.92A8 8 0 014.08 14zm8.92 6.92V14h6.92a8 8 0 01-6.92 6.92z"
        fill="currentColor"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Data — 5 Hero Fan Cards                                                    */
/* -------------------------------------------------------------------------- */

const HERO_FAN_CARDS = [
  {
    id: "fan-1",
    title: "NEXT-GEN",
    subtitle: "3D Organic Shader Rings",
    tag: "WebGL · GLSL",
    rotate: -13,
    yOffset: 26,
    theme: "light",
    code: `<OrganicTorusShader rings={6} roughness={0.18} color="#4D7C0F" />`,
  },
  {
    id: "fan-2",
    title: "NEXTGEN",
    subtitle: "Particle Sphere Matrix",
    tag: "Three.js · 60fps",
    rotate: -6.5,
    yOffset: 8,
    theme: "dark",
    code: `<ParticleOrbitalGlobe count={18000} bloom={1.4} wireframe />`,
  },
  {
    id: "fan-3",
    title: "MONOLITH",
    subtitle: "Architectural Sky Portal",
    tag: "Spatial Hero",
    rotate: 0,
    yOffset: 0,
    theme: "sky",
    code: `<SpatialPortalHero archRadius={240} reflection={0.85} />`,
  },
  {
    id: "fan-4",
    title: "CYBERIA",
    subtitle: "Chrome Visor Portrait",
    tag: "Specular UI",
    rotate: 6.5,
    yOffset: 8,
    theme: "silver",
    code: `<ChromaticPortraitCard irid={0.92} glassBlur="24px" />`,
  },
  {
    id: "fan-5",
    title: "SOLARIS",
    subtitle: "Molten Amber Refraction",
    tag: "Raymarched",
    rotate: 13,
    yOffset: 26,
    theme: "amber",
    code: `<RaymarchedGlassOrb ior={1.52} tint="#F59E0B" dispersion={0.35} />`,
  },
];

/* -------------------------------------------------------------------------- */
/* Data — Section 1: Library (8 Templates from HorizonX Library)               */
/* -------------------------------------------------------------------------- */

const LIBRARY_CARDS = [
  {
    id: "sorvine",
    title: "AI Solutions Platform",
    shortDesc: "Next-gen reasoning copilot with...",
    desc: "Autonomous LLM reasoning engine, live neural copilot interface, and multi-agent streaming execution pipeline.",
    image: "/assets/templates/prebuilt/ai-solutions.jpg",
    tag: "AI & WebGL",
    author: "HudbirdUI",
    type: "Code",
    bgTint: "bg-[#F8F9FA] dark:bg-[#11131B]",
    accent: "#6366F1",
    isNew: false,
    isPremium: false,
  },
  {
    id: "crest-water-hero",
    title: "Financial Management OS",
    shortDesc: "Real-time ledger analytics with tactile...",
    desc: "A 3D credit card floats over a live reflective water plane with realistic horizon lighting & treasury analytics.",
    image: "/assets/templates/prebuilt/financial-management-platform.jpg",
    tag: "Fintech Hero",
    author: "HudbirdUI",
    type: "Code",
    bgTint: "bg-[#FDF3F1] dark:bg-[#1A1213]",
    accent: "#FF4D00",
    isNew: false,
    isPremium: false,
  },
  {
    id: "orvane-ai-particle-hero",
    title: "Neural Network Intelligence",
    shortDesc: "A WebGL2 hero where a 3D-...",
    desc: "A WebGL2 hero where a 3D particle neural head responds to audio frequencies and cursor depth in real-time.",
    image: "/assets/templates/prebuilt/neural-network.jpg",
    tag: "WebGL Shader",
    author: "HudbirdUI",
    type: "Code",
    bgTint: "bg-[#EFF3FE] dark:bg-[#111422]",
    accent: "#3B82F6",
    isNew: false,
    isPremium: false,
  },
  {
    id: "rootline-land-intelligence-hero",
    title: "Analytics & Telemetry Engine",
    shortDesc: "A SaaS dashboard with live metric...",
    desc: "A high-performance SaaS dashboard with real-time streaming charts, data pipeline monitors, and cohort tables.",
    image: "/assets/templates/prebuilt/analytics.jpg",
    tag: "Clean SaaS",
    author: "HudbirdUI",
    type: "Code",
    bgTint: "bg-[#F6F8F5] dark:bg-[#121614]",
    accent: "#10B981",
    isNew: false,
    isPremium: false,
  },
  {
    id: "alder-stone",
    title: "Automation SaaS Platform",
    shortDesc: "A scroll-driven one-page site for an...",
    desc: "Event-driven workflow composer and serverless queue orchestrator featuring 3D wireframe matrices.",
    image: "/assets/templates/prebuilt/automation-saas.jpg",
    tag: "Architecture",
    author: "HudbirdUI",
    type: "Vibe coding",
    bgTint: "bg-[#F8F9FA] dark:bg-[#11131B]",
    accent: "#18181B",
    isNew: true,
    isPremium: false,
  },
  {
    id: "halovane-hologram-simulator",
    title: "Cyber Security Suite",
    shortDesc: "Interactive particle defense with...",
    desc: "Zero-trust edge firewall telemetry, active intrusion prevention matrix, and live particle security scanner.",
    image: "/assets/templates/prebuilt/cyber-security.jpg",
    tag: "Cybersecurity",
    author: "HudbirdUI",
    type: "Vibe coding",
    bgTint: "bg-[#F0F4F8] dark:bg-[#12161F]",
    accent: "#06B6D4",
    isNew: false,
    isPremium: false,
  },
  {
    id: "emberline-fire-hero",
    title: "Forex & Algorithmic Trading",
    shortDesc: "Sub-millisecond order book for...",
    desc: "A one-screen SaaS hero for an operational analytics trading engine forged in real time with ambient fiery horizon arc.",
    image: "/assets/templates/prebuilt/forex-trading.jpg",
    tag: "SaaS Cockpit",
    author: "HudbirdUI",
    type: "Code",
    bgTint: "bg-[#FDF3F1] dark:bg-[#1A1213]",
    accent: "#F97316",
    isNew: true,
    isPremium: true,
  },
  {
    id: "vigil",
    title: "Digital Agency Studio",
    shortDesc: "Award-winning editorial showcase...",
    desc: "A flagship agency narrative passage with immersive kinetic typography, client case studies, and studio decks.",
    image: "/assets/templates/prebuilt/digital-agency.jpg",
    tag: "Flagship Agency",
    author: "HudbirdUI",
    type: "Code",
    bgTint: "bg-[#F6F6F8] dark:bg-[#11131B]",
    accent: "#8B5CF6",
    isNew: false,
    isPremium: false,
  },
];

/* -------------------------------------------------------------------------- */
/* Data — Section 2: Blocks (8 Interactive 3D & Motion Primitives)            */
/* -------------------------------------------------------------------------- */

const BLOCK_CARDS = [
  {
    id: "block-1",
    title: "Cobalt Ribbed Torus",
    desc: "Procedural 3D sliced sphere with spring-driven mouse tilt.",
    tag: "3D Motion",
    variant: "cobalt-sphere",
    code: `<RibbedSphere3D slices={9} color="#2563EB" roughness={0.2} />`,
  },
  {
    id: "block-2",
    title: "Curved Panorama Cylinder",
    desc: "3D concave cylindrical gallery strip with inertia drag physics.",
    tag: "WebGL Carousel",
    variant: "cylinder-panorama",
    code: `<CylinderGallery radius={480} bend={-0.38} autoplay />`,
  },
  {
    id: "block-3",
    title: "Specular Liquid Emblem",
    desc: "Four-leaf chrome specular badge with real-time cursor spotlight.",
    tag: "Shader Badge",
    variant: "liquid-quatrefoil",
    code: `<LiquidMetalBadge leaves={4} specular={1.8} />`,
  },
  {
    id: "block-4",
    title: "Orbital Card Ring",
    desc: "12 miniature media cards orbiting in a continuous 360° dial.",
    tag: "Framer Motion",
    variant: "orbital-ring",
    code: `<OrbitalCardRing items={cards} radius={110} duration={28} />`,
  },
  {
    id: "block-5",
    title: "Tactile Spring Scrubber",
    desc: "Floating glass parameter slider with magnetic detents & haptic ticks.",
    tag: "Micro-UI",
    variant: "spring-slider",
    code: `<MagneticScrubber min={0} max={100} defaultValue={68} />`,
  },
  {
    id: "block-6",
    title: "Exploded 3D Media Stack",
    desc: "Multi-plane perspective photo cluster that separates on scroll.",
    tag: "Scroll 3D",
    variant: "exploded-planes",
    code: `<ExplodedMediaStack depth={120} planes={7} />`,
  },
  {
    id: "block-7",
    title: "Iridescent Blur Plasma",
    desc: "Directional Gaussian motion-blurred energy orb on studio canvas.",
    tag: "CSS + SVG Filter",
    variant: "motion-orb",
    code: `<DirectionalPlasmaOrb angle={-35} blur={42} color="#1D4ED8" />`,
  },
  {
    id: "block-8",
    title: "Brutalist Star Cutout",
    desc: "Dynamic SVG polygon clip-path mask with dual-tone color split.",
    tag: "SVG Mask",
    variant: "star-cutout",
    code: `<PolygonClipPortrait points={8} accent="#FF4D00" />`,
  },
];

/* -------------------------------------------------------------------------- */
/* Data — Section 3: Shaders (8 Dither, Halftone & ASCII Shaders)             */
/* -------------------------------------------------------------------------- */

const SHADER_CARDS = [
  {
    id: "shader-1",
    title: "Bayer Matrix Botanical",
    desc: "Ordered 8×8 Bayer dithering shader with warm botanical palette.",
    tag: "GLSL Dither",
    variant: "tulip-dither",
    image:
      "https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=900",
    code: `<BayerDitherCanvas matrix={8} palette={["#FF5500", "#38BDF8"]} />`,
  },
  {
    id: "shader-2",
    title: "Stochastic Marble Bust",
    desc: "High-contrast monochrome dot-matrix halftone over classical sculpture.",
    tag: "Halftone GLSL",
    variant: "marble-halftone",
    image: PEXELS.neuralSculpture,
    code: `<HalftoneShader dotScale={3.2} contrast={1.45} monochrome />`,
  },
  {
    id: "shader-3",
    title: "Alpha Checkerboard Wave",
    desc: "Organic silhouette masked against a procedural alpha transparency grid.",
    tag: "Alpha Mask",
    variant: "checker-silhouette",
    image: PEXELS.abstract3d2,
    code: `<AlphaCheckerShader cellSize={14} threshold={0.52} />`,
  },
  {
    id: "shader-4",
    title: "Crosshatch Tartan CRT",
    desc: "Dual-axis woven scanline interference pattern with cobalt/cream tint.",
    tag: "CRT Crosshatch",
    variant: "plaid-statue",
    image: PEXELS.neuralBrain,
    code: `<CrosshatchShader freqX={24} freqY={24} tint="#1E3A8A" />`,
  },
  {
    id: "shader-5",
    title: "ASCII Terminal Matrix",
    desc: "Real-time luminance-to-glyph mapper (`@#%*+=-:. `) at 60fps.",
    tag: "ASCII Shader",
    variant: "ascii-portrait",
    image: PEXELS.avatarMan2,
    code: `<AsciiLuminanceShader chars="@#%*+=-:." cellPx={8} />`,
  },
  {
    id: "shader-6",
    title: "Vertical Scanline Relief",
    desc: " Variable-width vertical column modulation driven by depth map.",
    tag: "Line Modulation",
    variant: "vertical-scan",
    image: PEXELS.avatarWoman1,
    code: `<VerticalColumnShader columns={48} modulation={0.85} />`,
  },
  {
    id: "shader-7",
    title: "Gaussian Threshold Grain",
    desc: "High-contrast ink bleed with animated analog film grain overlay.",
    tag: "Film Threshold",
    variant: "gaussian-silhouette",
    image: PEXELS.vrPortrait,
    code: `<ThresholdGrainShader cutoff={0.48} softness={0.18} />`,
  },
  {
    id: "shader-8",
    title: "Voronoi Stepped Mosaic",
    desc: "Block-quantized pixel sorting with adaptive edge preservation.",
    tag: "Pixel Sort",
    variant: "pixel-mosaic",
    image: PEXELS.skyClouds,
    code: `<QuantizedMosaicShader blockSize={10} edgePreserve />`,
  },
];

/* -------------------------------------------------------------------------- */
/* Data — Section 4: Sections (8 Drop-in Hero & Marketing Sections)           */
/* -------------------------------------------------------------------------- */

const SECTION_CARDS = [
  {
    id: "sec-1",
    title: "Neon Hardware Frame Hero",
    desc: "Hands-on device frame with electric cobalt light ring & CTA bar.",
    tag: "Hero Section",
    href: "/demos/ai-application",
    variant: "neon-tablet",
    screenshot: "/assets/templates/prebuilt/ai-application.jpg",
  },
  {
    id: "sec-2",
    title: "Alpine Monolith Showcase",
    desc: "Full-bleed atmospheric mountain backdrop with inset dark editorial window.",
    tag: "Editorial Hero",
    href: "/demos/smart-solutions",
    variant: "alpine-window",
    screenshot: "/assets/templates/prebuilt/smart-solutions.jpg",
  },
  {
    id: "sec-3",
    title: "Liquid Chrome Display",
    desc: "Oversized metallic Liquid typography over precision dark dot matrix.",
    tag: "Typography Section",
    href: "/demos/decentralized-finance",
    variant: "liquid-type",
    screenshot: "/assets/templates/prebuilt/decentralized-finance.jpg",
  },
  {
    id: "sec-4",
    title: "Aerodynamic Silver Curve",
    desc: "Sculpted automotive-grade metallic surface with minimal left copy.",
    tag: "Luxury Feature",
    href: "/demos/wealth-management",
    variant: "chrome-curve",
    screenshot: "/assets/templates/prebuilt/wealth-management.jpg",
  },
  {
    id: "sec-5",
    title: "Realtime Telemetry Bento",
    desc: "Dark obsidian metrics grid with glowing orange & amber bar charts.",
    tag: "Analytics Bento",
    href: "/demos/data-visualization-software",
    variant: "orange-bento",
    screenshot: "/assets/templates/prebuilt/data-visualization-software.jpg",
  },
  {
    id: "sec-6",
    title: "Autonomous Fleet Hero",
    desc: "Cinematic logistics highway scene with frosted glass HUD overlay.",
    tag: "Enterprise Hero",
    href: "/demos/risk-management-software",
    variant: "highway-hud",
    screenshot: "/assets/templates/prebuilt/risk-management-software.jpg",
  },
  {
    id: "sec-7",
    title: "Lime Split SaaS Cockpit",
    desc: "Asymmetric dark grid pairing bold headline with lime KPI dashboard.",
    tag: "SaaS Section",
    href: "/demos/automation-saas",
    variant: "lime-cockpit",
    screenshot: "/assets/templates/prebuilt/automation-saas.jpg",
  },
  {
    id: "sec-8",
    title: "Mint Glow Creator Hero",
    desc: "Emerald gradient halo framing a crisp white studio portfolio window.",
    tag: "Creator Hero",
    href: "/demos/creative-portfolio",
    variant: "mint-creator",
    screenshot: "/assets/templates/prebuilt/creative-portfolio.jpg",
  },
];

/* -------------------------------------------------------------------------- */
/* Data — Testimonials, Pricing, FAQ                                          */
/* -------------------------------------------------------------------------- */

const TESTIMONIALS = [
  {
    name: "Liam Hendriks",
    role: "Staff Design Engineer · Linear",
    avatar: PEXELS.avatarMan1,
    quote:
      "The 3D fan cards and GLSL dither shaders saved us three weeks of custom WebGL work. Everything drops straight into Next.js and Vite.",
  },
  {
    name: "Elena Rostova",
    role: "Founder · Aether AI",
    avatar: PEXELS.avatarWoman1,
    quote:
      "Finally a UI library built for the vibecoding era. Our landing page conversion jumped 42% the week we swapped in the Vibecode hero.",
  },
  {
    name: "Marcus Vance",
    role: "Principal Frontend · Vercel Community",
    avatar: PEXELS.avatarMan2,
    quote:
      "Zero bloat, clean TypeScript props, and 60fps Framer Motion springs. The copy-paste CLI workflow feels effortless.",
  },
  {
    name: "Sora Takahashi",
    role: "Creative Director · Mono Tokyo",
    avatar: PEXELS.avatarWoman2,
    quote:
      "Every card, shader, and section feels art-directed by a boutique studio rather than generated from a generic template.",
  },
  {
    name: "David K.",
    role: "CTO · FinPulse Treasury",
    avatar: PEXELS.avatarMan3,
    quote:
      "Combining the 47 full-page templates with these WebGL blocks and ASCII shaders gives our design team superpowers.",
  },
  {
    name: "Chloe Laurent",
    role: "Product Designer · Raycast",
    avatar: PEXELS.avatarWoman3,
    quote:
      "The attention to micro-interactions, border radii, and dark/light polarity is unmatched.",
  },
];

const PRICING_PLANS = [
  {
    name: "Starter",
    desc: "Essential open-source primitives & core UI blocks for solo makers.",
    monthly: "$0",
    yearly: "$0",
    period: "Forever free",
    popular: false,
    cta: "Start Building Free",
    features: [
      "24 Core React & Tailwind v4 blocks",
      "3 Basic CSS/SVG dither effects",
      "2 Community starter templates",
      "MIT License for personal & commercial",
      "Copy-paste TSX & CLI access",
      "Community Discord support",
    ],
  },
  {
    name: "Pro All-Access",
    desc: "Every 3D block, GLSL shader, section, and all 47+ flagship templates.",
    monthly: "$29",
    yearly: "$19",
    period: "per month, billed annually",
    popular: true,
    cta: "Unlock Pro All-Access",
    features: [
      "All 120+ 3D Motion & Interactive Blocks",
      "Full WebGL Dither, Halftone & ASCII Shaders",
      "All 47+ Pre-Built Multi-Page Websites",
      "29+ Inner, Auth, 6-Digit OTP & Legal Pages",
      "Figma Design System & Token Variables",
      "Lifetime updates + Private GitHub registry",
      "Unlimited commercial client projects",
    ],
  },
  {
    name: "Team & Studio",
    desc: "For product teams, design agencies, and multi-seat organizations.",
    monthly: "$79",
    yearly: "$49",
    period: "per month, up to 15 seats",
    popular: false,
    cta: "Get Team License",
    features: [
      "Everything in Pro All-Access for 15 seats",
      "Private npm / shadcn registry token",
      "Custom brand theme & shader presets",
      "White-label agency client rights",
      "Priority Slack channel with engineers",
      "Custom invoice & SOC2 vendor docs",
    ],
  },
];

const FAQ_ITEMS = [
  {
    q: "What makes Vibecode UI different from standard component libraries?",
    a: "Traditional UI kits only give you flat buttons and forms. Vibecode UI combines interactive 3D fan decks, real-time dither/ASCII shaders, physics-driven Framer Motion blocks, and 47+ complete industry websites ready for copy-paste or CLI installation.",
  },
  {
    q: "How do I install components into my React, Next.js, or Vite project?",
    a: "Every component supports one-click TSX copy-paste or instant installation via our CLI (`npx @hudbird/ui add <block-name>`). All dependencies use standard Tailwind CSS and Framer Motion.",
  },
  {
    q: "Do the shaders and 3D blocks hurt page performance or Core Web Vitals?",
    a: "No. Every shader and 3D primitive is lazy-loaded, pauses when off-screen via IntersectionObserver, and runs at a locked 60fps using hardware-accelerated transforms.",
  },
  {
    q: "Are all 47+ pre-built templates and 29+ inner/auth pages included?",
    a: "Yes! Pro All-Access and Team licenses include full source code to all 47+ domain templates plus the 29+ inner, Sign-In, Register, 6-Digit OTP, and Legal pages.",
  },
  {
    q: "Can I use Vibecode UI for client work and commercial SaaS products?",
    a: "Absolutely. Your license covers unlimited commercial products, SaaS applications, and client deliverables with zero attribution required.",
  },
  {
    q: "Does it support both Light Mode and Dark Mode out of the box?",
    a: "Yes. Every single block, section, and template is engineered with dual-polarity tokens so you can run crisp studio white or deep obsidian dark mode.",
  },
  {
    q: "Can I use these components with Cursor, Windsurf, Claude, or v0?",
    a: "Yes! Every component includes clean, self-contained TypeScript schemas and semantic props specifically structured for AI-assisted vibecoding workflows.",
  },
  {
    q: "Do you offer refunds or a free tier to test first?",
    a: "You can test the Starter tier and live interactive previews for free right now, and every paid license includes a 14-day no-questions-asked guarantee.",
  },
];

/* -------------------------------------------------------------------------- */
/* Main Component                                                             */
/* -------------------------------------------------------------------------- */

export function VibecodeUiTheme() {
  const { sectionSlug } = useParams<{ sectionSlug?: string }>();
  const [isDark, setIsDark] = useState(false);
  const [accentColor, setAccentColor] = useState("#7C3AED");
  const [showBanner, setShowBanner] = useState(true);
  const [selectedFanIdx, setSelectedFanIdx] = useState<number>(2);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sliderValue, setSliderValue] = useState(68);
  const [shaderPixelSize, setShaderPixelSize] = useState(4);
  const [billingCycle, setBillingCycle] = useState<"yearly" | "monthly">("yearly");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedGridCell, setSelectedGridCell] = useState<number>(4);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeCodeModal, setActiveCodeModal] = useState<{
    title: string;
    code: string;
    tag: string;
  } | null>(null);

  useEffect(() => {
    document.title = "Vibecode UI — The Premium UI & Code Library for the Vibecoding Era";

    const params = new URLSearchParams(window.location.search);
    const themeParam = params.get("theme");

    if (themeParam === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      // Reference image is crisp light mode by default
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }

    if (sectionSlug) {
      const el = document.getElementById(sectionSlug);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [sectionSlug]);

  const handleToggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div
      style={{ "--brand-primary": accentColor } as React.CSSProperties}
      className="min-h-screen bg-[#FAFAFC] font-sans text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white dark:bg-[#090A0F] dark:text-white dark:selection:bg-[#C8F560] dark:selection:text-zinc-950"
    >
      {/* =====================================================================
          1. TOP ANNOUNCEMENT BAR
      ===================================================================== */}
      {showBanner && (
        <div className="relative z-50 flex items-center justify-center bg-zinc-950 px-4 py-2 text-[11px] font-medium text-zinc-200 dark:bg-[#141622]">
          <div className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#C8F560]" />
            <span>
              Introducing <strong>Vibecode UI 2.0</strong> — 120+ WebGL Shaders, 3D Fan Decks & 47+
              Full-Page Templates
            </span>
            <a
              href="#pricing"
              className="ml-1 font-semibold text-white underline decoration-white/40 underline-offset-2 hover:decoration-white"
            >
              Get Pro Access →
            </a>
          </div>
          <button
            type="button"
            onClick={() => setShowBanner(false)}
            className="absolute right-3 cursor-pointer rounded p-1 text-zinc-400 hover:text-white"
            aria-label="Dismiss announcement"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* =====================================================================
          2. STICKY MINIMAL NAVBAR
      ===================================================================== */}
      <header className="sticky top-0 z-40 border-b border-black/[0.05] bg-[#FAFAFC]/85 backdrop-blur-xl dark:border-white/[0.07] dark:bg-[#090A0F]/85">
        <div className="mx-auto flex h-14 max-w-[1320px] items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: Brand + Back to Root Showcase */}
          <div className="flex items-center gap-4">
            <Link to="/vibecode-ui" className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-950 text-xs font-bold text-white dark:bg-white dark:text-zinc-950">
                V
              </span>
              <span className="text-sm font-bold tracking-tight text-zinc-950 dark:text-white">
                Vibecode<span className="font-normal text-zinc-400">.ui</span>
              </span>
            </Link>

            <Link
              to="/"
              className="hidden items-center gap-1 rounded-full border border-black/[0.07] bg-white px-2.5 py-1 text-[11px] font-medium text-zinc-600 transition-colors hover:border-black/20 hover:text-zinc-950 sm:inline-flex dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300 dark:hover:text-white"
            >
              <ArrowLeft className="h-3 w-3" />
              <span>All Themes</span>
            </Link>
          </div>

          {/* Center: Section Jump Links */}
          <nav className="hidden items-center gap-6 text-xs font-medium text-zinc-600 md:flex dark:text-zinc-400">
            <a
              href="#demos"
              className="transition-colors hover:text-zinc-950 dark:hover:text-white"
            >
              Demos
            </a>
            <a
              href="#blocks"
              className="transition-colors hover:text-zinc-950 dark:hover:text-white"
            >
              Blocks
            </a>
            <a
              href="#shaders"
              className="transition-colors hover:text-zinc-950 dark:hover:text-white"
            >
              Shaders
            </a>
            <a
              href="#sections"
              className="transition-colors hover:text-zinc-950 dark:hover:text-white"
            >
              Sections
            </a>
            <a
              href="#how-it-works"
              className="transition-colors hover:text-zinc-950 dark:hover:text-white"
            >
              How it works
            </a>
            <a
              href="#pricing"
              className="transition-colors hover:text-zinc-950 dark:hover:text-white"
            >
              Pricing
            </a>
            <a href="#faq" className="transition-colors hover:text-zinc-950 dark:hover:text-white">
              FAQ
            </a>
          </nav>

          {/* Right: Theme Toggle + Auth + Black Pill CTA */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleToggleTheme}
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
              className="inline-flex items-center gap-1.5 rounded-full bg-zinc-950 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs transition-transform hover:scale-[1.02] dark:bg-white dark:text-zinc-950"
            >
              <span>Get All-Access</span>
            </a>
          </div>
        </div>
      </header>

      {/* =====================================================================
          3. HERO SECTION — HEADLINE + 5-CARD 3D FAN DECK + FLOATING REEL CARD
      ===================================================================== */}
      <section className="relative overflow-hidden pt-10 pb-14 sm:pt-14 sm:pb-20">
        <div className="relative mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          {/* Centered 2-Line Editorial Headline */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-4xl text-center"
          >
            <h1 className="text-[clamp(2rem,3.7vw,3.35rem)] leading-[1.06] font-bold tracking-[-0.04em] text-zinc-950 dark:text-white">
              The premium UI &amp; code library
              <br />
              for the vibecoding era.
            </h1>
          </motion.div>

          {/* 5-Card Overlapping 3D Fan Deck (Exact Reference Proportions) */}
          <div className="relative mx-auto mt-8 flex min-h-[250px] max-w-4xl items-center justify-center sm:mt-10 sm:min-h-[285px]">
            <div className="relative flex items-center justify-center">
              {HERO_FAN_CARDS.map((card, idx) => {
                const isSelected = selectedFanIdx === idx;
                return (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 30, rotate: 0 }}
                    animate={{
                      opacity: 1,
                      y: isSelected ? card.yOffset - 12 : card.yOffset,
                      rotate: card.rotate,
                      scale: isSelected ? 1.04 : 1,
                    }}
                    whileHover={{
                      y: card.yOffset - 18,
                      scale: 1.07,
                      zIndex: 40,
                    }}
                    transition={{ type: "spring", stiffness: 260, damping: 24 }}
                    onClick={() => setSelectedFanIdx(idx)}
                    style={{ zIndex: isSelected ? 35 : 10 + idx }}
                    className={`group -mx-3.5 cursor-pointer overflow-hidden rounded-[20px] border shadow-[0_24px_50px_-12px_rgba(0,0,0,0.28)] transition-shadow hover:shadow-[0_32px_70px_-10px_rgba(0,0,0,0.42)] sm:-mx-4 ${
                      idx === 0 || idx === 4
                        ? "hidden h-[210px] w-[154px] sm:block sm:h-[236px] sm:w-[172px]"
                        : "h-[205px] w-[148px] sm:h-[244px] sm:w-[178px]"
                    } ${
                      card.theme === "light"
                        ? "border-black/10 bg-white text-zinc-950"
                        : "border-white/15 bg-zinc-950 text-white"
                    }`}
                  >
                    {/* Card 1: White Poster + 3D Organic Green Torus Cluster */}
                    {card.theme === "light" && (
                      <div className="relative flex h-full w-full flex-col justify-between p-3.5">
                        <div>
                          <div className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase">
                            01 · GLSL
                          </div>
                          <div className="mt-0.5 text-xl leading-none font-black tracking-tighter text-zinc-950">
                            NEXT-GEN
                          </div>
                        </div>
                        {/* Organic 3D Green Rings Visual */}
                        <div className="relative my-auto flex items-center justify-center py-1">
                          <div className="grid grid-cols-3 gap-1">
                            {[0, 1, 2, 3, 4, 5].map((n) => (
                              <div
                                key={n}
                                className="h-9 w-9 rounded-full border-[6px] border-[#4D7C0F] bg-gradient-to-br from-[#84CC16] to-[#365314] shadow-inner"
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-[9px] font-semibold text-zinc-500">
                          <span>{card.subtitle}</span>
                          <span>↗</span>
                        </div>
                      </div>
                    )}

                    {/* Card 2: Dark Wireframe Particle Globe + Bold NEXTGEN bottom type */}
                    {card.theme === "dark" && (
                      <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-[#07080C] p-3.5">
                        <div className="flex items-center justify-between text-[9px] text-zinc-400">
                          <span>PARTICLE.OS</span>
                          <span className="h-1.5 w-1.5 rounded-full bg-white" />
                        </div>
                        <div className="relative my-auto flex items-center justify-center">
                          <div className="relative h-24 w-24 rounded-full border border-white/25 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.35),rgba(255,255,255,0.03)_65%,transparent)] shadow-[0_0_36px_rgba(255,255,255,0.12)]">
                            <div className="absolute inset-2 rounded-full border border-dashed border-white/20" />
                            <div className="absolute inset-4 rounded-full border border-white/15" />
                          </div>
                        </div>
                        <div className="-mx-2 -mb-1 text-center text-2xl leading-none font-black tracking-tighter text-white">
                          NEXTGEN
                        </div>
                      </div>
                    )}

                    {/* Card 3 (Center): Sky Blue Arch & Futuristic Monolith Tower */}
                    {card.theme === "sky" && (
                      <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-gradient-to-b from-[#DBEAFE] via-[#93C5FD] to-[#1E3A8A] p-3.5 text-zinc-950">
                        <div className="relative z-10 flex items-center justify-between text-[9px] font-bold text-blue-950/70">
                          <span>SPATIAL ARCH</span>
                          <span>v2.4</span>
                        </div>
                        {/* Arch + Central Spire */}
                        <div className="relative inset-x-0 my-auto flex h-36 items-end justify-center">
                          <div className="absolute inset-x-1.5 top-2 bottom-0 rounded-t-full border-[4px] border-blue-950/80" />
                          <div className="relative z-10 h-26 w-7 rounded-t-full bg-gradient-to-b from-white via-slate-200 to-blue-900 shadow-xl" />
                        </div>
                        <div className="relative z-10 rounded-md border border-white/40 bg-white/75 px-2 py-1 text-center text-[9px] font-bold text-blue-950 backdrop-blur-md">
                          {card.subtitle}
                        </div>
                      </div>
                    )}

                    {/* Card 4: Silver/Chrome Futuristic Portrait */}
                    {card.theme === "silver" && (
                      <div className="relative h-full w-full overflow-hidden bg-zinc-200">
                        <img
                          src={PEXELS.vrPortrait}
                          alt={card.title}
                          className="h-full w-full object-cover object-center contrast-110 saturate-50 transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-white/20" />
                        <div className="absolute inset-x-3 bottom-2.5 flex items-center justify-between text-[9px] font-bold text-white">
                          <span>{card.title}</span>
                          <span className="rounded bg-white/20 px-1.5 py-0.5 backdrop-blur-md">
                            {card.tag}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Card 5: Warm Molten Amber / Copper 3D Glass */}
                    {card.theme === "amber" && (
                      <div className="relative h-full w-full overflow-hidden bg-[#1A0D06]">
                        <img
                          src={PEXELS.abstract3d1}
                          alt={card.title}
                          className="h-full w-full object-cover opacity-90 hue-rotate-[-25deg] saturate-150 transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1A0D06] via-transparent to-amber-500/20" />
                        <div className="absolute inset-x-3 top-2.5 text-center text-[9px] font-semibold tracking-widest text-amber-200/80 uppercase">
                          RAYMARCHED
                        </div>
                        <div className="absolute inset-x-3 bottom-2.5 flex items-center justify-between text-[9px] font-bold text-amber-100">
                          <span>{card.title}</span>
                          <span>60 FPS</span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Subtitle + Primary & Secondary CTAs below the 5-card fan */}
          <div className="mx-auto mt-8 max-w-lg text-center">
            <p className="text-xs leading-relaxed text-zinc-500 sm:text-[13px] dark:text-zinc-400">
              Explore 120+ production-ready React components, GLSL dither shaders, 3D motion blocks,
              and 47+ complete website templates built for design engineers.
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#demos"
                className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-6 py-2.5 text-xs font-semibold text-white shadow-lg transition-transform hover:scale-[1.02] dark:bg-white dark:text-zinc-950"
              >
                <span>Browse Components</span>
              </a>
              <Link
                to="/vibecode-ui/detail"
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-black/[0.08] bg-white px-5 py-2.5 text-xs font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-white/10 dark:bg-white/[0.05] dark:text-zinc-200"
              >
                <Sparkles className="h-3.5 w-3.5 text-orange-500" />
                <span>Explore Card Detail View ↗</span>
              </Link>
              <button
                type="button"
                onClick={() =>
                  setActiveCodeModal({
                    title: HERO_FAN_CARDS[selectedFanIdx].subtitle,
                    code: HERO_FAN_CARDS[selectedFanIdx].code,
                    tag: HERO_FAN_CARDS[selectedFanIdx].tag,
                  })
                }
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-black/[0.08] bg-white px-4 py-2.5 text-xs font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-white/10 dark:bg-white/[0.05] dark:text-zinc-200"
              >
                <Code2 className="h-3.5 w-3.5" />
                <span>Inspect Fan JSX</span>
              </button>
            </div>
          </div>

          {/* Floating Walkthrough Video Preview Card (Right side of Hero, clear of bottom toolbar) */}
          <div className="mt-8 flex justify-end lg:absolute lg:right-8 lg:bottom-2 lg:mt-0">
            <div className="w-[210px] overflow-hidden rounded-2xl border border-white/15 bg-[#0E0F17] p-2 text-white shadow-[0_24px_50px_rgba(0,0,0,0.35)]">
              <div
                onClick={() => setVideoModalOpen(true)}
                className="group relative flex h-20 w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-indigo-900 via-purple-900 to-zinc-950"
              >
                <img
                  src={PEXELS.abstract3d3}
                  alt="Walkthrough Reel"
                  className="absolute inset-0 h-full w-full object-cover opacity-65 transition-transform duration-500 group-hover:scale-105"
                />
                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-zinc-950 shadow-md transition-transform group-hover:scale-110">
                  <Play className="ml-0.5 h-3 w-3 fill-current" />
                </span>
                <span className="absolute top-1.5 right-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-semibold">
                  01:24
                </span>
              </div>
              <div className="mt-1.5 px-1">
                <div className="text-[11px] font-semibold text-white">Vibecode Studio Reel</div>
                <div className="text-[10px] text-zinc-400">See how CLI &amp; shaders work</div>
              </div>
              <button
                type="button"
                onClick={() => setVideoModalOpen(true)}
                className="mt-1.5 w-full cursor-pointer rounded-lg bg-white py-1.5 text-center text-[10px] font-bold text-zinc-950 transition-colors hover:bg-[#C8F560]"
              >
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. SECTION 1: LIBRARY (8 TEMPLATES MATCHING HORIZONX / VIBECODE DESIGN)
      ===================================================================== */}
      <section id="demos" className="scroll-mt-20 py-14 sm:py-20">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl dark:text-white">
                Library
              </h2>
              <p className="mt-1 text-xs text-zinc-500 sm:text-sm dark:text-zinc-400">
                A selection of templates and assets from the HudbirdUI library.
              </p>
            </div>
            <Link
              to="/#templates"
              className="text-xs font-semibold text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
            >
              Browse all 47+ templates →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {LIBRARY_CARDS.map((card) => (
              <Link
                key={card.id}
                to={`/vibecode-ui/item/${card.id}`}
                className="group flex flex-col overflow-hidden rounded-[26px] border border-black/[0.08] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl dark:border-white/10 dark:bg-[#11131B]"
              >
                {/* Full-Bleed Image Thumbnail Without Padding Matching Image 2 */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950">
                  <LazyThumbnail
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Badges Overlay */}
                  {(card.isNew || card.isPremium) && (
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      {card.isNew && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white/95 px-2.5 py-0.5 text-[11px] font-bold text-zinc-900 shadow-sm backdrop-blur-md dark:border-white/15 dark:bg-black/80 dark:text-white">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          <span>New</span>
                        </span>
                      )}
                      {card.isPremium && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-zinc-950/90 px-2.5 py-0.5 text-[11px] font-bold text-white shadow-sm backdrop-blur-md dark:border-white/20 dark:bg-white/90 dark:text-zinc-950">
                          <Crown className="h-3 w-3 text-amber-400" />
                          <span>Premium</span>
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Editorial Content with Padding Matching Image 2 */}
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="truncate text-[15px] font-bold tracking-tight text-zinc-950 transition-colors group-hover:text-black dark:text-white dark:group-hover:text-[#C8F560]">
                        {card.title}
                      </h3>
                      <span className="shrink-0 rounded-full bg-black/[0.05] px-2.5 py-0.5 text-[11px] font-medium text-zinc-600 dark:bg-white/10 dark:text-zinc-300">
                        {card.type}
                      </span>
                    </div>
                    <p className="mt-1.5 line-clamp-1 text-xs text-zinc-500 dark:text-zinc-400">
                      {card.shortDesc}
                    </p>
                  </div>

                  {/* Brand Row: HudbirdUI Logo + HudbirdUI · Code */}
                  <div className="mt-4 flex items-center gap-2 border-t border-black/[0.06] pt-3 text-xs text-zinc-500 dark:border-white/[0.08] dark:text-zinc-400">
                    <img
                      src="/assets/new-logo/hudbirdui-icon-black.svg"
                      alt="HudbirdUI"
                      className="h-3.5 w-3.5 shrink-0 dark:hidden"
                    />
                    <img
                      src="/assets/new-logo/hudbirdui-icon-white.svg"
                      alt="HudbirdUI"
                      className="hidden h-3.5 w-3.5 shrink-0 dark:block"
                    />
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                      HudbirdUI
                    </span>
                    <span className="text-zinc-300 dark:text-zinc-700">·</span>
                    <span className="font-medium text-zinc-500 dark:text-zinc-400">
                      {card.type}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              to="/#templates"
              className="inline-flex items-center gap-1.5 rounded-full bg-zinc-950 px-5 py-2 text-xs font-semibold text-white transition-transform hover:scale-105 dark:bg-white dark:text-zinc-950"
            >
              <span>View all 47+ templates</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. SECTION 2: BLOCKS (4-COLUMN × 2-ROW = 8 INTERACTIVE 3D & MOTION CARDS)
      ===================================================================== */}
      <section id="blocks" className="scroll-mt-20 py-14 sm:py-20">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-zinc-950 sm:text-2xl dark:text-white">
                Blocks
              </h2>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                Interactive motion primitives, 3D carousels, and tactile micro-interactions.
              </p>
            </div>
            <span className="text-xs font-medium text-zinc-400">Click any block to copy JSX</span>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {BLOCK_CARDS.map((block) => (
              <div
                key={block.id}
                className="group flex flex-col overflow-hidden rounded-[22px] border border-black/[0.06] bg-white shadow-[0_8px_28px_-12px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-16px_rgba(15,23,42,0.14)] dark:border-white/10 dark:bg-[#11131B]"
              >
                {/* Visual Stage matching Slice 1 */}
                <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden">
                  {/* 1. Cobalt 3D Ribbed Sphere */}
                  {block.variant === "cobalt-sphere" && (
                    <div className="flex h-full w-full items-center justify-center bg-[#0D0E12]">
                      <motion.div
                        animate={{ rotate: [0, 8, -8, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="relative flex h-36 w-36 flex-col items-center justify-center gap-1 rounded-full p-2"
                      >
                        {[55, 82, 96, 100, 96, 82, 55].map((w, i) => (
                          <div
                            key={i}
                            style={{ width: `${w}%` }}
                            className="h-3.5 rounded-full bg-gradient-to-r from-blue-900 via-blue-500 to-indigo-400 shadow-[0_2px_10px_rgba(37,99,235,0.65)]"
                          />
                        ))}
                      </motion.div>
                    </div>
                  )}

                  {/* 2. 3D Curved Panorama Cylinder */}
                  {block.variant === "cylinder-panorama" && (
                    <div className="relative flex h-full w-full items-center justify-center bg-[#ECEDF2] dark:bg-zinc-900">
                      <div className="relative flex h-32 w-full items-center justify-center gap-1.5 px-3 [perspective:600px]">
                        {PEXELS.projects.slice(0, 6).map((img, i) => {
                          const dist = Math.abs(i - 2.5);
                          const scaleY = 0.65 + dist * 0.16;
                          return (
                            <div
                              key={i}
                              style={{ transform: `scaleY(${scaleY})` }}
                              className="h-28 flex-1 overflow-hidden rounded-md shadow-md transition-transform duration-500 group-hover:scale-y-100"
                            >
                              <img src={img} alt="" className="h-full w-full object-cover" />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* 3. Glowing 4-Leaf Liquid Quatrefoil */}
                  {block.variant === "liquid-quatrefoil" && (
                    <div className="flex h-full w-full items-center justify-center bg-[#050508]">
                      <div className="grid grid-cols-2 gap-2 p-2">
                        {[0, 1, 2, 3].map((leaf) => (
                          <div
                            key={leaf}
                            className="h-14 w-14 rounded-2xl border border-white/30 bg-[radial-gradient(circle_at_30%_30%,#FFFFFF,#94A3B8_45%,#1E293B_85%)] shadow-[0_0_25px_rgba(255,255,255,0.22)] transition-transform duration-500 group-hover:scale-105"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 4. Circular Orbiting Photo Ring */}
                  {block.variant === "orbital-ring" && (
                    <div className="relative flex h-full w-full items-center justify-center bg-[#ECEDF2] dark:bg-zinc-900">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                        className="relative h-36 w-36 rounded-full"
                      >
                        {Array.from({ length: 10 }).map((_, idx) => {
                          const angle = (idx / 10) * 360;
                          return (
                            <div
                              key={idx}
                              style={{
                                transform: `rotate(${angle}deg) translateY(-58px)`,
                              }}
                              className="absolute top-1/2 left-1/2 -mt-3 -ml-2.5 h-6 w-5 overflow-hidden rounded-[4px] border border-black/15 bg-zinc-900 shadow-xs"
                            >
                              <img
                                src={PEXELS.avatars[idx % PEXELS.avatars.length]}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            </div>
                          );
                        })}
                      </motion.div>
                    </div>
                  )}

                  {/* 5. Tactile Interactive Scrubber Slider */}
                  {block.variant === "spring-slider" && (
                    <div className="flex h-full w-full items-center justify-center bg-[#ECEDF2] p-5 dark:bg-zinc-900">
                      <div className="w-full rounded-2xl border border-black/[0.06] bg-white p-4 shadow-lg dark:border-white/10 dark:bg-zinc-950">
                        <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-700 dark:text-zinc-200">
                          <span className="inline-flex items-center gap-1.5">
                            <Volume2 className="h-3.5 w-3.5" /> Spring Tension
                          </span>
                          <span className="font-mono text-xs font-bold">{sliderValue}%</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={sliderValue}
                          onChange={(e) => setSliderValue(Number(e.target.value))}
                          className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-zinc-900 dark:bg-zinc-800 dark:accent-[#C8F560]"
                        />
                      </div>
                    </div>
                  )}

                  {/* 6. Exploded 3D Media Planes */}
                  {block.variant === "exploded-planes" && (
                    <div className="relative flex h-full w-full items-center justify-center bg-[#ECEDF2] dark:bg-zinc-900">
                      <div className="relative h-36 w-48">
                        <div className="absolute top-2 left-4 h-14 w-16 -rotate-12 overflow-hidden rounded-lg bg-blue-600 shadow-lg transition-transform group-hover:-translate-x-2">
                          <img
                            src={PEXELS.abstract3d2}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="absolute top-8 left-14 z-10 h-16 w-20 -rotate-3 overflow-hidden rounded-lg border-2 border-white bg-zinc-900 shadow-xl">
                          <img
                            src={PEXELS.avatarMan2}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="absolute right-4 bottom-3 z-20 flex h-14 w-16 rotate-6 items-center justify-center rounded-lg bg-[#FF4D00] text-xs font-black text-white shadow-lg transition-transform group-hover:translate-x-2">
                          60 FPS
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 7. Iridescent Motion Blur Orb */}
                  {block.variant === "motion-orb" && (
                    <div className="flex h-full w-full items-center justify-center bg-[#D8DADF] dark:bg-zinc-900">
                      <div className="h-24 w-36 -rotate-12 rounded-full bg-[radial-gradient(circle,#38BDF8_10%,#2563EB_55%,transparent_80%)] blur-[8px] transition-all duration-500 group-hover:scale-110 group-hover:blur-[4px]" />
                    </div>
                  )}

                  {/* 8. Brutalist Star Cutout Portrait */}
                  {block.variant === "star-cutout" && (
                    <div className="relative flex h-full w-full items-center justify-center bg-[#ECEDF2] dark:bg-zinc-900">
                      <div className="relative flex h-36 w-36 items-center justify-center">
                        <div className="absolute inset-3 rotate-12 rounded-xl bg-[#FF4D00]" />
                        <div className="absolute inset-3 -rotate-12 rounded-xl bg-[#2563EB]" />
                        <img
                          src={PEXELS.avatarWoman2}
                          alt=""
                          className="relative z-10 h-28 w-24 rounded-lg object-cover contrast-125 grayscale"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                        {block.title}
                      </h3>
                      <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-600 dark:bg-white/10 dark:text-zinc-300">
                        {block.tag}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                      {block.desc}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-black/[0.05] pt-2.5 dark:border-white/[0.06]">
                    <button
                      type="button"
                      onClick={() => handleCopy(block.id, block.code)}
                      className="inline-flex cursor-pointer items-center gap-1 text-[10px] font-semibold text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                    >
                      {copiedId === block.id ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-500" />
                          <span className="text-emerald-600 dark:text-[#C8F560]">Copied JSX!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy JSX</span>
                        </>
                      )}
                    </button>
                    <Link
                      to={`/vibecode-ui/item/${block.id}`}
                      className="inline-flex cursor-pointer items-center gap-1 text-[10px] font-bold text-zinc-900 dark:text-white"
                    >
                      <Eye className="h-3 w-3" />
                      <span>Inspect</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-1.5 rounded-full bg-zinc-950 px-5 py-2 text-xs font-semibold text-white transition-transform hover:scale-105 dark:bg-white dark:text-zinc-950"
            >
              <span>View all</span>
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. SECTION 3: SHADERS (4-COLUMN × 2-ROW = 8 DITHER / HALFTONE / ASCII)
      ===================================================================== */}
      <section id="shaders" className="scroll-mt-20 py-14 sm:py-20">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-zinc-950 sm:text-2xl dark:text-white">
                Shaders
              </h2>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                Real-time ordered dithering, halftone dot matrices, and ASCII luminance shaders.
              </p>
            </div>

            {/* Live Shader Matrix Density Control */}
            <div className="flex items-center gap-3 rounded-full border border-black/[0.08] bg-white px-4 py-1.5 text-xs dark:border-white/10 dark:bg-[#11131B]">
              <Sliders className="h-3.5 w-3.5 text-zinc-400" />
              <span className="font-medium text-zinc-600 dark:text-zinc-300">Matrix Scale:</span>
              {[3, 5, 8].map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setShaderPixelSize(sz)}
                  className={`cursor-pointer rounded-full px-2 py-0.5 text-[11px] font-bold transition-colors ${
                    shaderPixelSize === sz
                      ? "bg-zinc-950 text-white dark:bg-[#C8F560] dark:text-zinc-950"
                      : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400"
                  }`}
                >
                  {sz}px
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SHADER_CARDS.map((shader) => (
              <div
                key={shader.id}
                className="group flex flex-col overflow-hidden rounded-[22px] border border-black/[0.06] bg-white shadow-[0_8px_28px_-12px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-16px_rgba(15,23,42,0.14)] dark:border-white/10 dark:bg-[#11131B]"
              >
                {/* Shader Visual Stage matching Slice 2 */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-950">
                  <img
                    src={shader.image}
                    alt={shader.title}
                    className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                      shader.variant === "tulip-dither"
                        ? "contrast-125 saturate-150"
                        : shader.variant === "plaid-statue"
                          ? "contrast-125 hue-rotate-180 saturate-50"
                          : shader.variant === "pixel-mosaic"
                            ? "contrast-125 hue-rotate-90"
                            : "contrast-150 grayscale"
                    }`}
                  />

                  {/* Procedural Dither / Halftone / Scanline Overlay */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      backgroundImage:
                        shader.variant === "vertical-scan"
                          ? `repeating-linear-gradient(90deg, rgba(0,0,0,0.68) 0px, rgba(0,0,0,0.68) ${shaderPixelSize}px, transparent ${shaderPixelSize}px, transparent ${shaderPixelSize * 2}px)`
                          : shader.variant === "plaid-statue"
                            ? `repeating-linear-gradient(0deg, rgba(15,23,42,0.45) 0px, rgba(15,23,42,0.45) ${shaderPixelSize}px, transparent ${shaderPixelSize}px, transparent ${shaderPixelSize * 2}px), repeating-linear-gradient(90deg, rgba(15,23,42,0.45) 0px, rgba(15,23,42,0.45) ${shaderPixelSize}px, transparent ${shaderPixelSize}px, transparent ${shaderPixelSize * 2}px)`
                            : shader.variant === "checker-silhouette"
                              ? `conic-gradient(rgba(255,255,255,0.38) 90deg, rgba(0,0,0,0.42) 90deg 180deg, rgba(255,255,255,0.38) 180deg 270deg, rgba(0,0,0,0.42) 270deg)`
                              : `radial-gradient(rgba(0,0,0,0.62) 1.25px, transparent 1.25px)`,
                      backgroundSize:
                        shader.variant === "checker-silhouette"
                          ? `${shaderPixelSize * 3}px ${shaderPixelSize * 3}px`
                          : `${shaderPixelSize * 1.5}px ${shaderPixelSize * 1.5}px`,
                    }}
                  />

                  {shader.variant === "ascii-portrait" && (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden font-mono text-[8px] leading-[8px] tracking-widest text-white/40 select-none">
                      {Array.from({ length: 18 })
                        .map(() => "@ # % * + = - : . @ # % * + = - : .")
                        .join("\n")}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                        {shader.title}
                      </h3>
                      <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-600 dark:bg-white/10 dark:text-zinc-300">
                        {shader.tag}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                      {shader.desc}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-black/[0.05] pt-2.5 dark:border-white/[0.06]">
                    <button
                      type="button"
                      onClick={() => handleCopy(shader.id, shader.code)}
                      className="inline-flex cursor-pointer items-center gap-1 text-[10px] font-semibold text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                    >
                      {copiedId === shader.id ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-500" />
                          <span className="text-emerald-600 dark:text-[#C8F560]">
                            Copied Shader!
                          </span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy GLSL</span>
                        </>
                      )}
                    </button>
                    <Link
                      to={`/vibecode-ui/item/${shader.id}`}
                      className="inline-flex cursor-pointer items-center gap-1 text-[10px] font-bold text-zinc-900 dark:text-white"
                    >
                      <span>View Code</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <a
              href="#sections"
              className="inline-flex items-center gap-1.5 rounded-full bg-zinc-950 px-5 py-2 text-xs font-semibold text-white transition-transform hover:scale-105 dark:bg-white dark:text-zinc-950"
            >
              <span>View all</span>
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================================
          7. SECTION 4: SECTIONS (4-COLUMN × 2-ROW = 8 HERO & BENTO SECTIONS)
      ===================================================================== */}
      <section id="sections" className="scroll-mt-20 py-14 sm:py-20">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-zinc-950 sm:text-2xl dark:text-white">
                Sections
              </h2>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                Drop-in hero sections, telemetry bento grids, and product showcases.
              </p>
            </div>
            <Link
              to="/#templates"
              className="text-xs font-semibold text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
            >
              Explore all sections →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SECTION_CARDS.map((sec) => (
              <div
                key={sec.id}
                className="group flex flex-col overflow-hidden rounded-[22px] border border-black/[0.06] bg-white shadow-[0_8px_28px_-12px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-16px_rgba(15,23,42,0.14)] dark:border-white/10 dark:bg-[#11131B]"
              >
                <Link
                  to={`/vibecode-ui/item/${sec.id}`}
                  className="relative block aspect-[4/3] w-full overflow-hidden bg-zinc-950"
                >
                  {sec.variant === "liquid-type" ? (
                    <div className="relative flex h-full w-full items-end justify-end overflow-hidden bg-[#050508] p-5">
                      <div
                        className="absolute inset-0 opacity-30"
                        style={{
                          backgroundImage:
                            "radial-gradient(rgba(255,255,255,0.35) 1px, transparent 1px)",
                          backgroundSize: "16px 16px",
                        }}
                      />
                      <span className="relative z-10 bg-gradient-to-b from-white via-zinc-300 to-zinc-600 bg-clip-text text-5xl font-black tracking-tighter text-transparent">
                        Liquid
                      </span>
                    </div>
                  ) : sec.variant === "orange-bento" ? (
                    <div className="relative flex h-full w-full flex-col justify-between bg-[#0C0D12] p-4">
                      <div className="grid grid-cols-3 gap-2">
                        <div className="rounded-lg bg-[#FF5500] p-2 text-[10px] font-bold text-white">
                          +248%
                        </div>
                        <div className="rounded-lg bg-zinc-800 p-2 text-[10px] font-bold text-zinc-300">
                          99.9%
                        </div>
                        <div className="rounded-lg bg-amber-400 p-2 text-[10px] font-bold text-zinc-950">
                          60fps
                        </div>
                      </div>
                      <div className="my-auto flex h-20 items-end gap-1.5 px-2">
                        {[35, 65, 45, 90, 70, 100, 60, 80, 50].map((h, i) => (
                          <div
                            key={i}
                            style={{ height: `${h}%` }}
                            className="flex-1 rounded-t bg-gradient-to-t from-[#FF5500] to-amber-400"
                          />
                        ))}
                      </div>
                      <div className="text-[10px] font-semibold text-zinc-400">
                        REALTIME TELEMETRY
                      </div>
                    </div>
                  ) : sec.variant === "mint-creator" ? (
                    <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-300 via-teal-200 to-cyan-300 p-4">
                      <div className="h-full w-full overflow-hidden rounded-xl border border-white/60 bg-white shadow-xl">
                        <img
                          src={PEXELS.avatarMan1}
                          alt={sec.title}
                          className="h-full w-full object-cover object-top"
                        />
                      </div>
                    </div>
                  ) : (
                    <img
                      src={sec.screenshot}
                      alt={sec.title}
                      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                </Link>

                <div className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <Link
                        to={`/vibecode-ui/item/${sec.id}`}
                        className="text-sm font-bold text-zinc-900 hover:underline dark:text-white"
                      >
                        {sec.title}
                      </Link>
                      <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-600 dark:bg-white/10 dark:text-zinc-300">
                        {sec.tag}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                      {sec.desc}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-black/[0.05] pt-2.5 dark:border-white/[0.06]">
                    <span className="text-[10px] font-medium text-zinc-400">React + Tailwind</span>
                    <Link
                      to={`/vibecode-ui/item/${sec.id}`}
                      className="inline-flex items-center gap-1 text-[10px] font-bold text-zinc-900 dark:text-white"
                    >
                      <span>Open Preview</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              to="/#templates"
              className="inline-flex items-center gap-1.5 rounded-full bg-zinc-950 px-5 py-2 text-xs font-semibold text-white transition-transform hover:scale-105 dark:bg-white dark:text-zinc-950"
            >
              <span>View all</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================================
          8. SECTION 5: HOW IT WORKS (3-STEP VISUAL CARD MATCHING SLICE 3)
      ===================================================================== */}
      <section id="how-it-works" className="scroll-mt-20 py-16 sm:py-24">
        <div className="mx-auto max-w-[1040px] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl dark:text-white">
              Built for high-velocity vibecoding
            </h2>
            <p className="mt-2 text-xs text-zinc-500 sm:text-sm dark:text-zinc-400">
              Three steps from browsing the component gallery to shipping a production interface.
            </p>
          </div>

          <div className="rounded-[28px] border border-black/[0.07] bg-white p-6 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.08)] sm:p-8 dark:border-white/10 dark:bg-[#11131B]">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Step 1: Browse & Pick */}
              <div className="flex flex-col justify-between space-y-5">
                <div>
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100 text-[11px] font-bold text-zinc-700 dark:bg-white/10 dark:text-zinc-200">
                    1
                  </span>
                  <h3 className="mt-3 text-sm font-bold text-zinc-950 dark:text-white">
                    Pick a primitive or template
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                    Browse 120+ interactive blocks, GLSL shaders, and 47+ complete domain websites.
                  </p>
                </div>

                {/* 3x3 Interactive Tile Grid */}
                <div className="rounded-2xl border border-black/[0.05] bg-[#F4F5F8] p-4 dark:border-white/10 dark:bg-zinc-900">
                  <div className="grid grid-cols-3 gap-2">
                    {Array.from({ length: 9 }).map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedGridCell(idx)}
                        className={`flex h-11 cursor-pointer items-center justify-center rounded-lg border text-xs font-bold transition-all ${
                          selectedGridCell === idx
                            ? "border-zinc-900 bg-zinc-900 text-white shadow-sm dark:border-[#C8F560] dark:bg-[#C8F560] dark:text-zinc-950"
                            : "border-black/[0.06] bg-white text-zinc-400 hover:text-zinc-700 dark:border-white/10 dark:bg-zinc-950"
                        }`}
                      >
                        <Layers className="h-3.5 w-3.5" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 2: Copy or CLI */}
              <div className="flex flex-col justify-between space-y-5">
                <div>
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100 text-[11px] font-bold text-zinc-700 dark:bg-white/10 dark:text-zinc-200">
                    2
                  </span>
                  <h3 className="mt-3 text-sm font-bold text-zinc-950 dark:text-white">
                    Copy TSX or run the CLI
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                    Zero lock-in. Drop clean TypeScript + Tailwind code directly into your codebase.
                  </p>
                </div>

                <div className="space-y-2.5 rounded-2xl border border-black/[0.05] bg-[#F4F5F8] p-4 dark:border-white/10 dark:bg-zinc-900">
                  <div className="flex items-center justify-between rounded-xl border border-black/[0.06] bg-white px-3 py-2.5 dark:border-white/10 dark:bg-zinc-950">
                    <span className="font-mono text-[11px] text-zinc-700 dark:text-zinc-300">
                      npx @hudbird/ui add fan
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy("cli-step", "npx @hudbird/ui add fan-deck")}
                      className="cursor-pointer rounded-full bg-zinc-950 px-2.5 py-1 text-[10px] font-bold text-white dark:bg-[#C8F560] dark:text-zinc-950"
                    >
                      {copiedId === "cli-step" ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-black/[0.06] bg-white px-3 py-2 text-[11px] text-zinc-500 dark:border-white/10 dark:bg-zinc-950">
                    <span className="inline-flex items-center gap-1.5">
                      <Terminal className="h-3.5 w-3.5" /> React 19 + Tailwind v4
                    </span>
                    <span className="font-semibold text-emerald-600">Ready</span>
                  </div>
                </div>
              </div>

              {/* Step 3: Tune & Ship */}
              <div className="flex flex-col justify-between space-y-5">
                <div>
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100 text-[11px] font-bold text-zinc-700 dark:bg-white/10 dark:text-zinc-200">
                    3
                  </span>
                  <h3 className="mt-3 text-sm font-bold text-zinc-950 dark:text-white">
                    Tune props & ship in minutes
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                    Customize spring physics, brand tokens, and shader uniforms with typed props.
                  </p>
                </div>

                <div className="space-y-3 rounded-2xl border border-black/[0.05] bg-[#F4F5F8] p-4 dark:border-white/10 dark:bg-zinc-900">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-medium text-zinc-500">
                      <span>Spring Stiffness</span>
                      <span>260</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-zinc-200 dark:bg-zinc-800">
                      <div className="h-full w-3/4 rounded-full bg-zinc-900 dark:bg-[#C8F560]" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-medium text-zinc-500">
                      <span>Shader Bloom</span>
                      <span>1.4x</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-zinc-200 dark:bg-zinc-800">
                      <div className="h-full w-2/3 rounded-full bg-zinc-900 dark:bg-[#C8F560]" />
                    </div>
                  </div>
                  <Link
                    to="/#templates"
                    className="block w-full rounded-xl bg-zinc-950 py-2.5 text-center text-xs font-semibold text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-zinc-950"
                  >
                    Deploy to Production
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          9. SECTION 6: TESTIMONIALS MARQUEE ("LOVED BY THOUSANDS OF BUILDERS")
      ===================================================================== */}
      <section className="overflow-hidden py-14 sm:py-20">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-zinc-950 sm:text-2xl dark:text-white">
                Loved by design engineers
              </h2>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                Trusted by 2,400+ frontend engineers, indie founders, and creative studios.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-white px-3.5 py-1.5 text-xs font-semibold dark:border-white/10 dark:bg-[#11131B]">
              <span className="flex items-center text-amber-400">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </span>
              <span>4.9/5 from 1,400+ builders</span>
            </div>
          </div>
        </div>

        {/* Edge-to-Edge Marquee Strip */}
        <div className="relative [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
            className="flex w-max gap-4 px-4"
          >
            {[...TESTIMONIALS, ...TESTIMONIALS].map((item, idx) => (
              <div
                key={idx}
                className="flex w-[280px] shrink-0 flex-col justify-between rounded-2xl border border-black/[0.06] bg-white p-5 shadow-2xs dark:border-white/10 dark:bg-[#11131B]"
              >
                <div>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[0, 1, 2, 3, 4].map((s) => (
                      <Star key={s} className="h-3 w-3 fill-current" />
                    ))}
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
                    “{item.quote}”
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-2.5 border-t border-black/[0.05] pt-3 dark:border-white/[0.06]">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="h-7 w-7 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-[11px] font-bold text-zinc-900 dark:text-white">
                      {item.name}
                    </div>
                    <div className="text-[10px] text-zinc-400">{item.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
          10. SECTION 7: PRICING (3-TIER CARDS MATCHING SLICE 3)
      ===================================================================== */}
      <section id="pricing" className="scroll-mt-20 py-16 sm:py-24">
        <div className="mx-auto max-w-[1040px] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl dark:text-white">
              Simple, transparent pricing
            </h2>
            <p className="mt-2 text-xs text-zinc-500 sm:text-sm dark:text-zinc-400">
              Start free with core blocks or unlock every shader, 3D primitive, and 47+ templates.
            </p>

            {/* Billing Toggle Pill */}
            <div className="mt-6 inline-flex items-center gap-1 rounded-full border border-black/[0.08] bg-white p-1 dark:border-white/10 dark:bg-[#11131B]">
              <button
                type="button"
                onClick={() => setBillingCycle("monthly")}
                className={`cursor-pointer rounded-full px-3.5 py-1 text-xs font-semibold transition-colors ${
                  billingCycle === "monthly"
                    ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400"
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle("yearly")}
                className={`cursor-pointer rounded-full px-3.5 py-1 text-xs font-semibold transition-colors ${
                  billingCycle === "yearly"
                    ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400"
                }`}
              >
                Yearly
              </button>
              <span className="rounded-full bg-emerald-500 px-2.5 py-0.5 text-[10px] font-bold text-white">
                Save 30%
              </span>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col justify-between rounded-[26px] border p-7 transition-all ${
                  plan.popular
                    ? "border-zinc-950 bg-white shadow-[0_24px_60px_-15px_rgba(0,0,0,0.14)] dark:border-white/30 dark:bg-[#141722]"
                    : "border-black/[0.07] bg-white dark:border-white/10 dark:bg-[#11131B]"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-zinc-950 px-3 py-0.5 text-[10px] font-bold text-white dark:bg-[#C8F560] dark:text-zinc-950">
                    Most Popular
                  </span>
                )}

                <div>
                  <div className="text-sm font-bold text-zinc-950 dark:text-white">{plan.name}</div>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                    {plan.desc}
                  </p>

                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="text-4xl font-bold tracking-tight text-zinc-950 tabular-nums dark:text-white">
                      {billingCycle === "yearly" ? plan.yearly : plan.monthly}
                    </span>
                    <span className="text-xs text-zinc-400">/ month</span>
                  </div>
                  <div className="mt-0.5 text-[11px] text-zinc-400">{plan.period}</div>

                  <Link
                    to="/demos/digital-agency/sign-up"
                    className={`mt-6 block w-full rounded-xl py-2.5 text-center text-xs font-semibold transition-all ${
                      plan.popular
                        ? "bg-zinc-950 text-white hover:opacity-90 dark:bg-white dark:text-zinc-950"
                        : "border border-black/15 bg-white text-zinc-900 hover:bg-zinc-50 dark:border-white/15 dark:bg-white/5 dark:text-white"
                    }`}
                  >
                    {plan.cta}
                  </Link>

                  <div className="my-6 border-t border-black/[0.06] dark:border-white/10" />

                  <div className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
                    What&apos;s included:
                  </div>
                  <ul className="mt-3 space-y-2.5">
                    {plan.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-2.5 text-xs text-zinc-600 dark:text-zinc-300"
                      >
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          11. SECTION 8: FAQ ("QUESTIONS & ANSWERS" MATCHING SLICE 4)
      ===================================================================== */}
      <section id="faq" className="scroll-mt-20 py-14 sm:py-20">
        <div className="mx-auto max-w-[720px] px-4 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl dark:text-white">
              Questions & Answers
            </h2>
          </div>

          <div className="divide-y divide-black/[0.06] rounded-[24px] border border-black/[0.06] bg-white px-6 dark:divide-white/10 dark:border-white/10 dark:bg-[#11131B]">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={item.q} className="py-4">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 text-left text-xs font-semibold text-zinc-900 sm:text-sm dark:text-white"
                  >
                    <span>{item.q}</span>
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 dark:bg-white/10 dark:text-zinc-300">
                      {isOpen ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="pt-2.5 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          12. SECTION 9: BOTTOM EDITORIAL CTA (MATCHING SLICE 4)
      ===================================================================== */}
      <section className="py-20 text-center sm:py-28">
        <div className="mx-auto max-w-2xl px-4">
          <span className="text-[11px] font-semibold tracking-widest text-zinc-400 uppercase">
            VIBECODE UI PRO 4.2
          </span>
          <h2 className="mt-3 text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.06] font-bold tracking-[-0.04em] text-zinc-950 dark:text-white">
            The UI & code library
            <br />
            <span className="text-zinc-400 dark:text-zinc-500">for the vibecoding era.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-xs leading-relaxed text-zinc-500 sm:text-sm dark:text-zinc-400">
            Ship 10x faster with 120+ interactive blocks, real-time shaders, and 47+ complete
            website templates.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#pricing"
              className="rounded-full bg-zinc-950 px-6 py-3 text-xs font-semibold text-white shadow-md transition-transform hover:scale-105 dark:bg-white dark:text-zinc-950"
            >
              Get Unlimited Access
            </a>
            <Link
              to="/"
              className="rounded-full border border-black/10 bg-white px-5 py-3 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-white/15 dark:bg-white/5 dark:text-zinc-200"
            >
              Back to Root Showcase
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================================
          13. SECTION 10: DARK NEWSLETTER & CELESTIAL PLANET HORIZON GLOW FOOTER
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
                    <a href="#demos" className="transition-colors hover:text-white">
                      Explore
                    </a>
                  </li>
                  <li>
                    <a href="#blocks" className="transition-colors hover:text-white">
                      Collections
                    </a>
                  </li>
                  <li>
                    <a href="#pricing" className="transition-colors hover:text-white">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="#how-it-works" className="transition-colors hover:text-white">
                      How it works
                    </a>
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

          {/* Big Atmospheric Horizon Space (where celestial glow arches upward into black space) */}
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

      {/* =====================================================================
          MODALS: CODE INSPECTOR & VIDEO WALKTHROUGH
      ===================================================================== */}
      <AnimatePresence>
        {activeCodeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCodeModal(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-3xl border border-white/15 bg-zinc-950 p-6 text-white shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="rounded-full bg-[#C8F560] px-2.5 py-0.5 text-[10px] font-bold text-zinc-950">
                    {activeCodeModal.tag}
                  </span>
                  <h3 className="mt-2 text-lg font-bold">{activeCodeModal.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveCodeModal(null)}
                  className="cursor-pointer rounded-full bg-white/10 p-2 text-zinc-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <pre className="mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-black p-4 font-mono text-xs text-[#C8F560]">
                <code>{activeCodeModal.code}</code>
              </pre>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy("modal-copy", activeCodeModal.code)}
                  className="cursor-pointer rounded-full bg-white px-4 py-2 text-xs font-bold text-zinc-950 hover:bg-[#C8F560]"
                >
                  {copiedId === "modal-copy" ? "Copied to Clipboard ✓" : "Copy JSX Snippet"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {videoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVideoModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl overflow-hidden rounded-3xl border border-white/15 bg-zinc-950 text-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#C8F560]" />
                  <span className="text-sm font-bold">Vibecode UI 2.0 — Interactive Overview</span>
                </div>
                <button
                  type="button"
                  onClick={() => setVideoModalOpen(false)}
                  className="cursor-pointer rounded-full bg-white/10 p-1.5 text-zinc-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <img
                    src="/assets/templates/prebuilt/digital-agency.jpg"
                    alt="Digital Agency"
                    className="aspect-[16/10] w-full rounded-2xl border border-white/10 object-cover object-top"
                  />
                  <img
                    src="/assets/templates/prebuilt/ai-voice-generator.jpg"
                    alt="AI Voice Studio"
                    className="aspect-[16/10] w-full rounded-2xl border border-white/10 object-cover object-top"
                  />
                </div>
                <p className="mt-4 text-xs leading-relaxed text-zinc-400">
                  Combine 120+ interactive 3D blocks and real-time GLSL dither shaders with 47+
                  complete multi-page templates.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <LivePreviewToolbar
        currentAccentColor={accentColor}
        onAccentColorChange={(c) => setAccentColor(c)}
      />
    </div>
  );
}

export default VibecodeUiTheme;
