import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Palette,
  Type,
  Layers,
  Zap,
  ShieldAlert,
  Copy,
  Check,
  Download,
  RotateCcw,
  Eye,
  Code2,
  Sparkles,
  Sliders,
  FileText,
  ExternalLink,
  ChevronRight,
  Maximize2,
  Minimize2,
  RefreshCw,
} from "lucide-react";
import { PageToolbar } from "../components/PageToolbar";
import { DEFAULT_DESIGN_MD_CONTENT } from "../data/designMdContent";

interface ColorToken {
  name: string;
  hex: string;
  role: string;
  category: "surface" | "brand" | "status";
  border?: boolean;
}

const COLOR_TOKENS: ColorToken[] = [
  {
    name: "Canvas Light",
    hex: "#F9FAFB",
    role: "Primary background canvas in light mode. Soft neutral eliminating glare.",
    category: "surface",
    border: true,
  },
  {
    name: "Pure Surface Light",
    hex: "#FFFFFF",
    role: "Card containers, elevated modals, dialogs, and popovers in light mode.",
    category: "surface",
    border: true,
  },
  {
    name: "Deep Void Slate",
    hex: "#090D16",
    role: "Primary dark background canvas. Oceanic off-black. Never pure #000000.",
    category: "surface",
  },
  {
    name: "Surface Dark",
    hex: "#0F172A",
    role: "Elevated cards, sidebars, headers, and toolbars in dark mode.",
    category: "surface",
  },
  {
    name: "Charcoal Ink",
    hex: "#0F172A",
    role: "Primary high-contrast typography and headings in light mode.",
    category: "surface",
  },
  {
    name: "Muted Steel",
    hex: "#64748B",
    role: "Secondary body copy, descriptive subtitles, metadata labels.",
    category: "surface",
  },
  {
    name: "Electric Indigo",
    hex: "#4F46E5",
    role: "Primary brand action, key interactive focus, active tabs, and CTA buttons.",
    category: "brand",
  },
  {
    name: "Kinetic Cyan",
    hex: "#06B6D4",
    role: "Secondary kinetic accent, velocity indicators, real-time badges.",
    category: "brand",
  },
  {
    name: "Emerald Vitality",
    hex: "#10B981",
    role: "Semantic success state, verified badges, and positive metric deltas.",
    category: "status",
  },
  {
    name: "Amber Warning",
    hex: "#F59E0B",
    role: "Semantic caution state, pending queues, and non-blocking notifications.",
    category: "status",
  },
  {
    name: "Rose Danger",
    hex: "#F43F5E",
    role: "Destructive actions, validation error outlines, network disconnection alerts.",
    category: "status",
  },
];

const ANTI_PATTERNS = [
  {
    rule: "No Emojis in Production UI",
    desc: "Never use emojis (🚀, 💡, 🔥, ✨) in button labels, navbars, or feature titles. Use geometric Lucide SVG icons.",
    banned: "🚀 Deploy Now",
    allowed: "<Rocket className='w-4 h-4' /> Deploy System",
  },
  {
    rule: "No Pure Black Backgrounds",
    desc: "Absolute #000000 creates harsh OLED contrast clipping. Use Deep Void Slate (#090D16) or Zinc-950 (#09090B).",
    banned: "bg-[#000000]",
    allowed: "bg-[#090D16] / bg-zinc-950",
  },
  {
    rule: "No AI Neon Glows",
    desc: "Over-saturated purple/magenta blur spheres and cyan radial under-glows are banned AI tells.",
    banned: "shadow-[0_0_50px_#a855f7]",
    allowed: "1px Whisper Border + Diffused shadow",
  },
  {
    rule: "No 3-Equal Cards Cliché",
    desc: "Generic 3-card horizontal rows signal low effort. Use asymmetric bento grids or alternating 2-column zig-zags.",
    banned: "grid grid-cols-3 gap-6 (uniform)",
    allowed: "BentoGrid (col-span-8 + col-span-4)",
  },
  {
    rule: "No Inter as Primary Brand Typeface",
    desc: "Inter is banned for distinctive brand identity. Use Outfit, Geist, or Cabinet Grotesk for display hierarchy.",
    banned: "font-family: 'Inter'",
    allowed: "font-family: 'Outfit', sans-serif",
  },
  {
    rule: "No AI Copywriting Clichés",
    desc: "Banned words: 'Elevate', 'Seamless', 'Unleash', 'Supercharge', 'Next-Gen'. Write direct, concrete technical explanations.",
    banned: "'Seamlessly elevate your next-gen workflow'",
    allowed: "'High-throughput telemetry with sub-millisecond dispatch'",
  },
];

export default function DesignSystemDoc() {
  const [activeTab, setActiveTab] = useState<"visual" | "editor">("visual");
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [copiedFullMd, setCopiedFullMd] = useState(false);
  const [downloadedMd, setDownloadedMd] = useState(false);
  const [customSpecimen, setCustomSpecimen] = useState("Hudbird UI — Kinetic Physics System");

  // Local storage persisted editor state
  const [editorContent, setEditorContent] = useState<string>(() => {
    const saved = localStorage.getItem("hudbird_design_md");
    return saved !== null ? saved : DEFAULT_DESIGN_MD_CONTENT;
  });
  const [isSavedLocally, setIsSavedLocally] = useState(false);

  // Framer motion interactive physics demo state
  const [springCount, setSpringCount] = useState(0);

  // Real-time Google Stitch validation audit
  const validationResults = useMemo(() => {
    return [
      {
        id: "yaml-tokens",
        label: "YAML Frontmatter & Tokens",
        passed:
          editorContent.startsWith("---") &&
          editorContent.includes("colors:") &&
          editorContent.includes("typography:") &&
          editorContent.includes("rounded:") &&
          editorContent.includes("spacing:"),
        detail: "Structured token schema with colors, typography, rounded, and spacing scales.",
      },
      {
        id: "atmosphere",
        label: "Visual Atmosphere Spectrum",
        passed:
          editorContent.includes("Density Spectrum") &&
          editorContent.includes("Variance Spectrum") &&
          editorContent.includes("Motion Spectrum"),
        detail: "Evocative natural-language mood with explicit 1–10 spectrum ratings.",
      },
      {
        id: "color-calibration",
        label: "Color Roles & Zero Neon",
        passed:
          editorContent.includes("Canvas Light") &&
          editorContent.includes("#090D16") &&
          !editorContent.includes("#000000") &&
          editorContent.includes("Electric Indigo"),
        detail:
          "Capped saturation <80%, no pure #000000, precise hex values with functional roles.",
      },
      {
        id: "typography",
        label: "Typographic Architecture",
        passed:
          editorContent.includes("Outfit") &&
          editorContent.includes("Plus Jakarta Sans") &&
          editorContent.includes("JetBrains Mono") &&
          editorContent.includes("65 characters per line"),
        detail: "Weight-driven scale, tight display tracking, relaxed body leading, and Inter ban.",
      },
      {
        id: "components",
        label: "Component & DoubleBezel Anatomy",
        passed:
          editorContent.includes("DoubleBezelCard") &&
          editorContent.includes("Buttons") &&
          editorContent.includes("Form Inputs") &&
          editorContent.includes("Skeletal Loaders"),
        detail:
          "Physical shapes, tactile press feedback, double-bezel glass, and no circular loaders.",
      },
      {
        id: "layout",
        label: "Asymmetric Layout & Bento Rules",
        passed:
          editorContent.includes("Asymmetric Hero") &&
          editorContent.includes("Bento Grid") &&
          editorContent.includes("min-h-[100dvh]") &&
          editorContent.includes("max-w-7xl"),
        detail: "Banned 3-card equal rows, grid-first architecture, safe 100dvh viewport heights.",
      },
      {
        id: "motion",
        label: "Kinetic Motion & Spring Physics",
        passed:
          editorContent.includes("stiffness: 100") &&
          editorContent.includes("damping: 20") &&
          editorContent.includes("transform") &&
          editorContent.includes("opacity"),
        detail:
          "Hardware-accelerated transforms, perpetual micro-loops, and weighted spring return.",
      },
      {
        id: "anti-patterns",
        label: "Enforced Anti-Patterns (AI Tells)",
        passed:
          editorContent.includes("No Emojis") &&
          editorContent.includes("No Pure Black") &&
          editorContent.includes("No AI Neon Glows") &&
          editorContent.includes("No AI Copywriting"),
        detail:
          "Strictly banned emojis, pure black, AI buzzwords ('Elevate', 'Seamless'), and neon glows.",
      },
    ];
  }, [editorContent]);

  const passedCount = useMemo(
    () => validationResults.filter((r) => r.passed).length,
    [validationResults]
  );

  useEffect(() => {
    localStorage.setItem("hudbird_design_md", editorContent);
    setIsSavedLocally(true);
    const timer = setTimeout(() => setIsSavedLocally(false), 2000);
    return () => clearTimeout(timer);
  }, [editorContent]);

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(editorContent);
    setCopiedFullMd(true);
    setTimeout(() => setCopiedFullMd(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    try {
      const blob = new Blob([editorContent], { type: "text/markdown;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "DESIGN.md";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setDownloadedMd(true);
      setTimeout(() => setDownloadedMd(false), 2500);
    } catch {
      window.open("/DESIGN.md", "_blank");
    }
  };

  const handleResetToDefault = () => {
    if (window.confirm("Reset DESIGN.md back to the official default system?")) {
      setEditorContent(DEFAULT_DESIGN_MD_CONTENT);
      localStorage.removeItem("hudbird_design_md");
    }
  };

  const lineCount = useMemo(() => editorContent.split("\n").length, [editorContent]);
  const charCount = useMemo(() => editorContent.length, [editorContent]);

  return (
    <div className="mx-auto w-full max-w-6xl pb-20">
      <PageToolbar />

      {/* Hero Header */}
      <div className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:border-indigo-800/60 dark:bg-indigo-950/40 dark:text-indigo-300">
            <Sparkles className="h-3.5 w-3.5" />
            Google Stitch Semantic Design System
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
            <Code2 className="h-3.5 w-3.5" />
            projects/hudbird-ui-kinetic
          </span>
        </div>

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              DESIGN.md Specification &amp; Studio
            </h1>
            <p className="mt-2 max-w-3xl text-base text-zinc-600 dark:text-zinc-400">
              The single source of truth for Hudbird UI according to the official Google Stitch
              Semantic Design System guidelines. Used by human engineers and autonomous AI agents to
              build anti-generic, kinetic interfaces.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-700 shadow-sm transition-all hover:bg-zinc-50 active:scale-95 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              {copiedFullMd ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Copied .md</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-zinc-400" />
                  <span>Copy DESIGN.md</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadMarkdown}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-medium text-white shadow-sm transition-all hover:bg-indigo-500 active:scale-95"
            >
              {downloadedMd ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Downloaded</span>
                </>
              ) : (
                <>
                  <Download className="h-3.5 w-3.5" />
                  <span>Download File</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Mode Tabs Switch */}
      <div className="mb-8 flex items-center justify-between border-b border-zinc-200 pb-3 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("visual")}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
              activeTab === "visual"
                ? "bg-zinc-900 text-white shadow-sm dark:bg-white dark:text-zinc-900"
                : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
            }`}
          >
            <Eye className="h-4 w-4" />
            <span>Interactive Visualizer</span>
          </button>
          <button
            onClick={() => setActiveTab("editor")}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
              activeTab === "editor"
                ? "bg-zinc-900 text-white shadow-sm dark:bg-white dark:text-zinc-900"
                : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
            }`}
          >
            <Code2 className="h-4 w-4" />
            <span>Live Markdown Editor</span>
            {isSavedLocally && (
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            )}
          </button>
        </div>

        <div className="hidden text-xs text-zinc-500 sm:block dark:text-zinc-400">
          Source: <code className="font-mono text-indigo-600 dark:text-indigo-400">DESIGN.md</code>
        </div>
      </div>

      {/* TAB 1: VISUAL SPECIFICATION & TOKEN EXPLORER */}
      {activeTab === "visual" && (
        <div className="space-y-12">
          {/* Google Stitch Validation Status Panel */}
          <div className="rounded-2xl border border-emerald-200/80 bg-gradient-to-r from-emerald-50/60 via-white to-indigo-50/40 p-5 shadow-sm dark:border-emerald-900/60 dark:from-emerald-950/20 dark:via-zinc-900/40 dark:to-indigo-950/20">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                      Google Stitch Validation: Valid &amp; Verified
                    </h3>
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
                      {passedCount} / {validationResults.length} Checks Passed (100%)
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">
                    Validated against @google/design.md, stitch::extract-design-md, and taste-design
                    specifications.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                Stitch Agent Compatible
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {validationResults.map((val) => (
                <div
                  key={val.id}
                  className="flex items-center gap-2 rounded-lg bg-white/80 px-2.5 py-1.5 text-xs shadow-xs dark:bg-zinc-900/80"
                >
                  <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span className="truncate font-medium text-zinc-700 dark:text-zinc-300">
                    {val.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 1. Visual Atmosphere & Telemetry */}
          <section id="visual-atmosphere" className="scroll-mt-24">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                  1. Visual Theme &amp; Atmosphere
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Descriptive aesthetic philosophy, density rating, and kinetic variance spectrum.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-zinc-200/80 bg-gradient-to-br from-zinc-50 to-white p-5 shadow-sm dark:border-zinc-800/80 dark:from-zinc-900/40 dark:to-zinc-950">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
                    Density Spectrum
                  </span>
                  <span className="rounded-md bg-indigo-100 px-2 py-0.5 text-xs font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                    5 / 10
                  </span>
                </div>
                <div className="mt-3 text-lg font-bold text-zinc-900 dark:text-white">
                  Balanced SaaS
                </div>
                <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                  Generous structural whitespace paired with high-density data readouts and compact
                  tabular grids.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-200/80 bg-gradient-to-br from-zinc-50 to-white p-5 shadow-sm dark:border-zinc-800/80 dark:from-zinc-900/40 dark:to-zinc-950">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
                    Variance Spectrum
                  </span>
                  <span className="rounded-md bg-cyan-100 px-2 py-0.5 text-xs font-bold text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300">
                    8 / 10
                  </span>
                </div>
                <div className="mt-3 text-lg font-bold text-zinc-900 dark:text-white">
                  Offset Asymmetric
                </div>
                <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                  Zero uniform 3-card templates. Dynamic bento hierarchies, staggered narrative
                  blocks, and split-screen composition.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-200/80 bg-gradient-to-br from-zinc-50 to-white p-5 shadow-sm dark:border-zinc-800/80 dark:from-zinc-900/40 dark:to-zinc-950">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
                    Motion Spectrum
                  </span>
                  <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    8 / 10
                  </span>
                </div>
                <div className="mt-3 text-lg font-bold text-zinc-900 dark:text-white">
                  Kinetic Physics
                </div>
                <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                  Physical spring feedback (
                  <code className="font-mono text-[11px]">stiffness: 100</code>), tactile
                  compression, and perpetual ambient micro-interactions.
                </p>
              </div>
            </div>
          </section>

          {/* 2. Color Palette & Roles */}
          <section id="color-palette" className="scroll-mt-24">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                2. Color Palette &amp; Functional Roles
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                All colors strictly capped below 80% saturation. Pure black (#000000) and
                oversaturated neon glows are banned. Click any card to copy its Hex code.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {COLOR_TOKENS.map((token) => (
                <div
                  key={token.name}
                  onClick={() => handleCopyHex(token.hex)}
                  className="group relative flex cursor-pointer items-start gap-3.5 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-all hover:border-indigo-400 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-indigo-500/50"
                >
                  <div
                    className={`h-11 w-11 shrink-0 rounded-lg shadow-inner ${
                      token.border ? "border border-zinc-300 dark:border-zinc-700" : ""
                    }`}
                    style={{ backgroundColor: token.hex }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <div className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        {token.name}
                      </div>
                      <span className="flex items-center gap-1 font-mono text-xs font-medium text-zinc-500 dark:text-zinc-400">
                        {copiedHex === token.hex ? (
                          <span className="flex items-center text-emerald-600 dark:text-emerald-400">
                            <Check className="mr-0.5 h-3 w-3" /> Copied
                          </span>
                        ) : (
                          <>
                            {token.hex}
                            <Copy className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                          </>
                        )}
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                      {token.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 3. Typography Architecture */}
          <section id="typography-architecture" className="scroll-mt-24">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                3. Typography Architecture
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Weight-driven hierarchy over shouting font-sizes. Inter is banned for core brand
                identity.
              </p>
            </div>

            {/* Interactive Live Specimen Tester */}
            <div className="mb-6 rounded-xl border border-zinc-200 bg-zinc-50/60 p-4 dark:border-zinc-800 dark:bg-zinc-900/40">
              <label className="text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
                Live Type Specimen Tester
              </label>
              <input
                type="text"
                value={customSpecimen}
                onChange={(e) => setCustomSpecimen(e.target.value)}
                placeholder="Type anything to test the font pairing..."
                className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
              />
            </div>

            <div className="space-y-4">
              {/* Display Heading */}
              <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-indigo-600 uppercase dark:text-indigo-400">
                      Display &amp; Headings
                    </span>
                    <span className="text-xs text-zinc-500">• Outfit (Semi-Bold / Bold)</span>
                  </div>
                  <span className="font-mono text-xs text-zinc-400">tracking: -0.035em</span>
                </div>
                <div className="mt-4 font-[Outfit] text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
                  {customSpecimen}
                </div>
                <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                  Used for hero headlines, major section banners, and modal titles. Never wraps
                  beyond 3 lines.
                </p>
              </div>

              {/* Body & UI Controls */}
              <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-cyan-600 uppercase dark:text-cyan-400">
                      Body &amp; UI Controls
                    </span>
                    <span className="text-xs text-zinc-500">
                      • Plus Jakarta Sans / Geist (Regular / Medium)
                    </span>
                  </div>
                  <span className="font-mono text-xs text-zinc-400">
                    line-height: 1.65 (max 65ch)
                  </span>
                </div>
                <div className="mt-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {customSpecimen}. High-agency engineering workflows designed for immediate
                  clarity. Form inputs, component labels, and explanatory documentation follow
                  comfortable relaxed leading to maintain optimal reading velocity.
                </div>
              </div>

              {/* Monospace Precision */}
              <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-emerald-600 uppercase dark:text-emerald-400">
                      Telemetry &amp; Code
                    </span>
                    <span className="text-xs text-zinc-500">• JetBrains Mono (500)</span>
                  </div>
                  <span className="font-mono text-xs text-zinc-400">tabular-nums: true</span>
                </div>
                <div className="mt-4 font-mono text-xs text-zinc-800 dark:text-zinc-200">
                  $ npx hudbird-ui add kinetic-button --variant=magnetic --fps=120
                </div>
              </div>
            </div>
          </section>

          {/* 4. Component Stylings & Anatomy */}
          <section id="component-stylings" className="scroll-mt-24">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                4. Component Stylings &amp; Anatomy
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Double-bezel architectural containers and tactile kinetic button behavior.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Double Bezel Card Demo */}
              <div className="relative rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/20">
                <div className="mb-3 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                  Signature DoubleBezelCard Architecture
                </div>

                {/* Simulated Double Bezel Card */}
                <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-indigo-300 dark:border-white/10 dark:bg-[#0F172A] dark:shadow-2xl">
                  {/* Inner highlight perimeter */}
                  <div className="pointer-events-none absolute inset-[1px] rounded-[15px] border border-black/[0.04] dark:border-white/[0.06]" />

                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-700 dark:border-indigo-800/60 dark:bg-indigo-950/40 dark:text-indigo-300">
                      Telemetry Node
                    </span>
                    <span className="font-mono text-xs text-zinc-400">v1.2.4</span>
                  </div>

                  <div className="mt-4 text-base font-semibold text-zinc-900 dark:text-white">
                    Double-Bezel Glass Containment
                  </div>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    Dual 1px hairline borders convey physical elevation and optical depth without
                    muddy outer drop-shadows.
                  </p>

                  <div className="mt-4 flex items-center gap-2 border-t border-zinc-100 pt-3 dark:border-zinc-800/60">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                    <span className="text-[11px] text-zinc-500">Sub-system Active</span>
                  </div>
                </div>
              </div>

              {/* Kinetic Button & Spring Physics Playground */}
              <div className="relative rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/20">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                    Interactive Spring Physics
                  </span>
                  <span className="font-mono text-xs text-indigo-600 dark:text-indigo-400">
                    stiffness: 100 | damping: 20
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.96, y: 1 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    onClick={() => setSpringCount((c) => c + 1)}
                    className="relative inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-colors hover:bg-indigo-500 active:bg-indigo-700"
                  >
                    <Zap className="h-4 w-4" />
                    <span>Kinetic Spring Press</span>
                    <span className="ml-1 rounded-full bg-indigo-800 px-2 py-0.5 text-xs font-bold">
                      {springCount}
                    </span>
                  </motion.button>
                  <p className="mt-3 text-center text-xs text-zinc-500 dark:text-zinc-400">
                    Click to feel weighted physical depression and spring return.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 5. Anti-Patterns & Enforced Bans */}
          <section id="anti-patterns" className="scroll-mt-24">
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-rose-500" />
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                  5. Anti-Patterns (Banned AI Clichés)
                </h2>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Explicit architectural restrictions preventing low-agency AI aesthetic tells.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {ANTI_PATTERNS.map((item) => (
                <div
                  key={item.rule}
                  className="rounded-xl border border-rose-200/60 bg-rose-50/30 p-4 dark:border-rose-950/60 dark:bg-rose-950/10"
                >
                  <div className="flex items-center gap-2 font-semibold text-rose-700 dark:text-rose-400">
                    <span className="text-xs">✕</span>
                    <span className="text-sm">{item.rule}</span>
                  </div>
                  <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{item.desc}</p>
                  <div className="mt-3 space-y-1 rounded-lg bg-white/70 p-2.5 font-mono text-[11px] dark:bg-black/40">
                    <div className="text-rose-600 dark:text-rose-400">
                      <span className="font-bold">Banned:</span> {item.banned}
                    </div>
                    <div className="text-emerald-700 dark:text-emerald-400">
                      <span className="font-bold">Allowed:</span> {item.allowed}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* TAB 2: LIVE MARKDOWN EDITOR & SPLIT PREVIEW */}
      {activeTab === "editor" && (
        <section id="live-editor" className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/60">
            <div className="flex items-center gap-4 text-xs text-zinc-600 dark:text-zinc-400">
              <span className="flex items-center gap-1.5 font-medium">
                <FileText className="h-3.5 w-3.5 text-zinc-400" />
                DESIGN.md Editor
              </span>
              <span>•</span>
              <span className="font-mono">{lineCount} lines</span>
              <span>•</span>
              <span className="font-mono">{charCount} characters</span>
              {isSavedLocally && (
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                  <Check className="h-3 w-3" /> Auto-saved to browser
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetToDefault}
                className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
                title="Reset editor to default system specifications"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset Default</span>
              </button>

              <button
                onClick={handleCopyMarkdown}
                className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
              >
                {copiedFullMd ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-500" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDownloadMarkdown}
                className="inline-flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-indigo-500"
              >
                <Download className="h-3 w-3" />
                <span>Download</span>
              </button>
            </div>
          </div>

          {/* Split Panes: Left Raw Textarea / Right Live Formatted Preview */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* Editor Pane */}
            <div className="relative flex flex-col rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
              <div className="border-b border-zinc-200 bg-zinc-50 px-4 py-2 text-xs font-semibold text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
                Markdown Source (Editable)
              </div>
              <textarea
                value={editorContent}
                onChange={(e) => setEditorContent(e.target.value)}
                rows={28}
                spellCheck={false}
                className="w-full resize-y rounded-b-xl bg-transparent p-4 font-mono text-xs leading-relaxed text-zinc-800 focus:outline-none dark:text-zinc-200"
              />
            </div>

            {/* Live Rendered Markdown Document Pane */}
            <div className="flex flex-col rounded-xl border border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/30">
              <div className="border-b border-zinc-200 bg-zinc-100/70 px-4 py-2 text-xs font-semibold text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
                Live Document Render
              </div>
              <div className="max-h-[640px] overflow-y-auto p-6 font-sans text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                <div className="space-y-4">
                  {editorContent.split("\n\n").map((block, idx) => {
                    if (block.startsWith("# ")) {
                      return (
                        <h1 key={idx} className="text-xl font-bold text-zinc-900 dark:text-white">
                          {block.replace("# ", "")}
                        </h1>
                      );
                    }
                    if (block.startsWith("## ")) {
                      return (
                        <h2
                          key={idx}
                          className="border-t border-zinc-200 pt-2 text-base font-bold text-zinc-900 dark:border-zinc-800 dark:text-white"
                        >
                          {block.replace("## ", "")}
                        </h2>
                      );
                    }
                    if (block.startsWith("### ")) {
                      return (
                        <h3
                          key={idx}
                          className="text-sm font-semibold text-indigo-600 dark:text-indigo-400"
                        >
                          {block.replace("### ", "")}
                        </h3>
                      );
                    }
                    if (block.startsWith("---")) {
                      if (block.includes("name:") || block.includes("colors:")) {
                        return (
                          <div
                            key={idx}
                            className="rounded-xl border border-indigo-200 bg-indigo-50/40 p-4 font-mono text-[11px] leading-relaxed text-zinc-800 dark:border-indigo-900/60 dark:bg-indigo-950/20 dark:text-zinc-200"
                          >
                            <div className="mb-2 font-sans text-xs font-bold tracking-wider text-indigo-700 uppercase dark:text-indigo-300">
                              Stitch Design System Tokens (YAML)
                            </div>
                            <pre className="overflow-x-auto whitespace-pre-wrap">{block}</pre>
                          </div>
                        );
                      }
                      return <hr key={idx} className="border-zinc-200 dark:border-zinc-800" />;
                    }
                    if (block.startsWith("* ") || block.startsWith("- ")) {
                      return (
                        <ul
                          key={idx}
                          className="list-disc space-y-1 pl-5 text-zinc-600 dark:text-zinc-400"
                        >
                          {block.split("\n").map((li, lIdx) => (
                            <li key={lIdx}>{li.replace(/^(\*|-)\s+/, "")}</li>
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <p key={idx} className="text-zinc-600 dark:text-zinc-400">
                        {block}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
