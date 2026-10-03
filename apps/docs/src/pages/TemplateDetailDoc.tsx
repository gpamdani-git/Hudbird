import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  ShoppingCart,
  CheckCircle2,
  Monitor,
  Smartphone,
  Palette,
  Code2,
  Box,
  Layers,
  Copy,
  Terminal,
  Sparkles,
  Download,
  Eye,
  Lock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { ProPricingModal } from "../components/ProPricingModal";

/* ═══════════════════════════════════════════════
   Template Data
   ═══════════════════════════════════════════════ */
interface TemplateData {
  name: string;
  author: string;
  price: string;
  originalPrice?: string;
  category: string;
  subCategory: string;
  images: string[]; // multi-image gallery
  previewUrl: string;
  purchaseUrl?: string;
  description: string;
  longDescription: string;
  features: string[];
  proOnlyFeatures?: string[];
  techStack: { name: string; icon: React.ReactNode }[];
}

const TECH = {
  react: { name: "React 18", icon: <Code2 className="h-4 w-4" /> },
  tw: { name: "Tailwind CSS v4", icon: <Box className="h-4 w-4" /> },
  motion: { name: "Framer Motion", icon: <Layers className="h-4 w-4" /> },
  vite: { name: "Vite", icon: <Monitor className="h-4 w-4" /> },
};

const TEMPLATES_DATA: Record<string, TemplateData> = {
  "saas-launchpad": {
    name: "SaaS Launchpad + Hudbird CMS",
    author: "Hudbird UI Team",
    price: "$99",
    originalPrice: "$149",
    category: "Software",
    subCategory: "SaaS & Dashboard",
    images: [
      "/assets/pro-assets/landingpage-mockup.png",
      "/assets/pro-assets/dashboard-mockup.png",
      "/assets/templates/saas-launchpad.webp",
      "/assets/templates/saas-launchpad-light.webp",
    ],
    previewUrl: import.meta.env.DEV ? "http://localhost:5174" : "/saas-launchpad/",
    purchaseUrl:
      "https://hudbirdui.lemonsqueezy.com/checkout/buy/985b3a9c-e686-44f4-bd2c-42d3c177d374",
    description:
      "The ultimate starter kit for building modern SaaS applications. Includes a fully functional landing page with 15+ marketing sections and a premium Admin Dashboard UI.",
    longDescription:
      "Crafted with precision for high-converting user acquisition. You'll receive the complete Git repository, ready to deploy to Vercel or Netlify in minutes.",
    features: [
      "40+ Premium Pages",
      "Admin Dashboard UI",
      "Fluid Micro-interactions",
      "Light & Dark Mode",
      "Lifetime Updates",
      "Component Library Integration",
    ],
    proOnlyFeatures: ["Premium Support", "Commercial License"],
    techStack: [TECH.react, TECH.tw, TECH.motion, TECH.vite],
  },
  fintech: {
    name: "Fintech App",
    author: "Hudbird UI Team",
    price: "Free",
    category: "Software",
    subCategory: "Fintech",
    images: ["/assets/templates/fintech.webp", "/assets/templates/fintech-light.webp"],
    previewUrl: "/#/templates/fintech",
    description:
      "A financial application template engineered for trust and clarity. Features complex data visualizations and secure transaction flows.",
    longDescription:
      "Every element is tuned for financial-grade polish — from WCAG-compliant contrast to subtle motion cues.",
    features: [
      "Dynamic Dashboard Layouts",
      "Interactive Financial Charts",
      "Secure Transaction UIs",
      "Dark Mode Integration",
      "Mobile-First Architecture",
      "WCAG Compliant",
    ],
    techStack: [TECH.react, TECH.tw, TECH.motion, TECH.vite],
  },
  "ai-startup": {
    name: "AI Startup",
    author: "Hudbird UI Team",
    price: "Free",
    category: "Software",
    subCategory: "AI",
    images: ["/assets/templates/ai-startup.webp", "/assets/templates/ai-startup-light.webp"],
    previewUrl: "/#/templates/ai-startup",
    description:
      "Position your AI product as the future with deep spatial design, glowing accents, and fluid bento-grid layouts.",
    longDescription:
      "Built for the next wave of AI-native products with chat interface mockups, terminal illustrations, and animated gradient glows.",
    features: [
      "Bento Grid Showcases",
      "Animated Gradient Glows",
      "High-Conversion Hero",
      "Terminal & Code Mockups",
      "AI Chat Components",
      "Performance Optimized",
    ],
    techStack: [TECH.react, TECH.tw, TECH.motion, TECH.vite],
  },
  ecommerce: {
    name: "E-Commerce",
    author: "Hudbird UI Team",
    price: "Free",
    category: "Ecommerce",
    subCategory: "Digital",
    images: ["/assets/templates/ecommerce.webp", "/assets/templates/ecommerce-light.webp"],
    previewUrl: "/#/templates/ecommerce",
    description:
      "A modern e-commerce storefront designed to maximize conversion rates with smooth product galleries.",
    longDescription:
      "Every interaction nudges the user toward conversion while maintaining a premium, editorial aesthetic.",
    features: [
      "Immersive Product Galleries",
      "Distraction-Free Cart",
      "Advanced Filtering UI",
      "Mega Menu Navigation",
      "Review & Rating Components",
      "Core Web Vitals Optimized",
    ],
    techStack: [TECH.react, TECH.tw, TECH.motion, TECH.vite],
  },
  "modern-app": {
    name: "Modern App",
    author: "Hudbird UI Team",
    price: "Free",
    category: "Software",
    subCategory: "Apps",
    images: ["/assets/templates/modern-app.webp", "/assets/templates/modern-app-light.webp"],
    previewUrl: "/#/templates/modern-app",
    description:
      "A versatile marketing template with crisp typography, generous whitespace, and scroll-driven animations.",
    longDescription:
      "Perfect for SaaS products or developer tools that need a polished web presence.",
    features: [
      "Scroll-Driven Animations",
      "App Screenshot Showcases",
      "Testimonial Carousels",
      "Pricing Tier Tables",
      "FAQ Accordions",
      "Dark Mode Excellence",
    ],
    techStack: [TECH.react, TECH.tw, TECH.motion, TECH.vite],
  },
  enterprise: {
    name: "Digital Agency",
    author: "Hudbird UI Team",
    price: "Free",
    category: "Agency",
    subCategory: "Design",
    images: [
      "/assets/templates/digital-agency.webp",
      "/assets/templates/digital-agency-light.webp",
    ],
    previewUrl: "/#/templates/enterprise",
    description:
      "A bold, brutalist-inspired agency template with striking typography and unexpected layouts.",
    longDescription: "Designed for studios, agencies, and freelancers who want to stand out.",
    features: [
      "Bold Typography Architecture",
      "Portfolio Grid Layouts",
      "Interactive Case Studies",
      "Smooth Page Transitions",
      "Client Logo Marquees",
      "Contact Form Integrations",
    ],
    techStack: [TECH.react, TECH.tw, TECH.motion, TECH.vite],
  },
  hospitality: {
    name: "Luxury Villa & Resort",
    author: "Hudbird UI Team",
    price: "Free",
    category: "Services",
    subCategory: "Hospitality",
    images: ["/assets/hospitality/bali-resort.jpg"],
    previewUrl: "/#/templates/hospitality",
    description:
      "An elegant template designed for premium hospitality brands with large-scale photography and serene spacing.",
    longDescription:
      "Every pixel breathes calm sophistication, guiding guests toward booking with a seamless experience.",
    features: [
      "Full-Screen Hero Media",
      "Elegant Date Pickers",
      "Room & Amenities Showcase",
      "Parallax Scrolling",
      "Integrated Maps UI",
      "Accessibility Optimized",
    ],
    techStack: [TECH.react, TECH.tw, TECH.motion, TECH.vite],
  },
  "admin-cms": {
    name: "Admin CMS Dashboard",
    author: "Hudbird UI Team",
    price: "Free",
    category: "Software",
    subCategory: "SaaS",
    images: ["/assets/templates/admin-cms.webp", "/assets/templates/admin-cms-light.webp"],
    previewUrl: "/#/templates/admin-cms",
    description:
      "A comprehensive control center. Dense but highly scannable interface with robust tables and real-time metrics.",
    longDescription:
      "Collapsible sidebar, sortable tables, complex validation — all out of the box.",
    features: [
      "Data-Dense Table Layouts",
      "Advanced Analytics Cards",
      "Complex Form Components",
      "Collapsible Sidebar",
      "Global Search Interface",
      "Status Badges & Indicators",
    ],
    techStack: [TECH.react, TECH.tw, TECH.motion, TECH.vite],
  },
};

const ALL_IDS = Object.keys(TEMPLATES_DATA);

/* ═══════════════════════════════════════════════
   CLI Install Tabs
   ═══════════════════════════════════════════════ */
function CliInstallTabs({ templateId }: { templateId: string }) {
  const managers = [
    { name: "npm", cmd: `npx hudbird-ui add ${templateId}` },
    { name: "pnpm", cmd: `pnpm dlx hudbird-ui add ${templateId}` },
    { name: "bun", cmd: `bunx hudbird-ui add ${templateId}` },
  ];
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1 rounded-lg bg-zinc-100 p-0.5 dark:bg-white/5">
        {managers.map((m, i) => (
          <button
            key={m.name}
            onClick={() => setActive(i)}
            className={`flex-1 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
              active === i
                ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-white"
                : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`}
          >
            {m.name}
          </button>
        ))}
      </div>
      <div className="flex w-full items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 p-1 dark:border-white/10 dark:bg-black/30">
        <div className="flex items-center gap-2.5 overflow-x-auto pl-3">
          <Terminal className="h-4 w-4 shrink-0 text-zinc-400" />
          <code className="font-mono text-sm whitespace-nowrap text-zinc-700 dark:text-zinc-300">
            {managers[active].cmd}
          </code>
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(managers[active].cmd);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-zinc-500 shadow-sm transition-all hover:bg-zinc-100 hover:text-zinc-900 dark:bg-white/5 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
          title="Copy command"
        >
          {copied ? (
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Image Gallery Component
   ═══════════════════════════════════════════════ */
function ImageGallery({
  images,
  name,
  previewUrl,
}: {
  images: string[];
  name: string;
  previewUrl: string;
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  // Filter out broken images
  const validImages = images.filter((_, i) => !failedImages.has(i));
  const currentSrc = images[activeIdx];
  const isCurrentFailed = failedImages.has(activeIdx);

  const goTo = (idx: number) => {
    // Find next valid image in that direction
    if (idx < 0) idx = images.length - 1;
    if (idx >= images.length) idx = 0;
    setActiveIdx(idx);
  };

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="group relative aspect-video overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 dark:border-white/10 dark:bg-[#0a0a0b]">
        {isCurrentFailed ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-zinc-400">
            <Eye className="h-12 w-12 opacity-30" />
            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">{name}</span>
            <span className="text-xs text-zinc-500">Preview image unavailable</span>
          </div>
        ) : (
          <img
            key={activeIdx}
            src={currentSrc}
            alt={`${name} - ${activeIdx + 1}`}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            onError={() => setFailedImages((prev) => new Set(prev).add(activeIdx))}
          />
        )}

        {/* Hover overlay with Live Preview */}
        {!isCurrentFailed && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/20 group-hover:opacity-100">
            <a
              href={previewUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-bold text-zinc-900 shadow-xl transition-transform hover:scale-105"
            >
              <Monitor className="h-4 w-4" /> Live Preview
            </a>
          </div>
        )}

        {/* Nav arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => goTo(activeIdx - 1)}
              className="absolute top-1/2 left-3 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white/80 backdrop-blur-sm transition-all hover:bg-black/70"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => goTo(activeIdx + 1)}
              className="absolute top-1/2 right-3 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white/80 backdrop-blur-sm transition-all hover:bg-black/70"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}

        {/* Counter */}
        {images.length > 1 && (
          <div className="absolute right-3 bottom-3 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {activeIdx + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                i === activeIdx
                  ? "border-blue-500 ring-2 ring-blue-500/20"
                  : "border-zinc-200 hover:border-zinc-400 dark:border-white/10 dark:hover:border-white/20"
              }`}
            >
              {failedImages.has(i) ? (
                <div className="flex h-full w-full items-center justify-center bg-zinc-100 dark:bg-zinc-900">
                  <Eye className="h-4 w-4 text-zinc-400" />
                </div>
              ) : (
                <img
                  src={src}
                  alt={`Thumbnail ${i + 1}`}
                  className="h-full w-full object-cover"
                  onError={() => setFailedImages((prev) => new Set(prev).add(i))}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════ */
export function TemplateDetailDoc() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isProModalOpen, setIsProModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const template = id && TEMPLATES_DATA[id] ? TEMPLATES_DATA[id] : TEMPLATES_DATA["saas-launchpad"];
  const isFree = template.price.toLowerCase() === "free";
  const relatedTemplates = ALL_IDS.filter((tid) => tid !== id).slice(0, 4);

  return (
    <div className="mx-auto w-full">
      {/* Breadcrumb */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <button
          onClick={() => navigate("/templates")}
          className="flex items-center text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to templates
        </button>
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            isFree
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
          }`}
        >
          {isFree ? "Free & Open Source" : "Pro Template"}
        </span>
      </div>

      {/* Main Grid */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 pb-16 lg:grid-cols-12">
        {/* ── Left: Gallery & Content ── */}
        <div className="space-y-10 lg:col-span-8">
          {/* Image Gallery */}
          <ImageGallery
            images={template.images}
            name={template.name}
            previewUrl={template.previewUrl}
          />

          {/* Overview */}
          <div>
            <h2 className="mb-4 text-2xl font-bold">Overview</h2>
            <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              {template.description}
            </p>
            <p className="mt-3 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              {template.longDescription}
            </p>
          </div>

          <hr className="border-zinc-200 dark:border-white/10" />

          {/* Features */}
          <div>
            <h2 className="mb-6 text-2xl font-bold">What's included</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {template.features.map((f, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-white/5 dark:bg-zinc-900"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">{f}</span>
                </div>
              ))}
              {template.proOnlyFeatures?.map((f, i) => (
                <div
                  key={`p-${i}`}
                  className="flex items-start gap-3 rounded-xl border border-amber-200/60 bg-amber-50/50 p-4 shadow-sm dark:border-amber-500/10 dark:bg-amber-500/5"
                >
                  <Lock className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                  <div>
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">{f}</span>
                    <span className="ml-2 text-xs text-amber-600 dark:text-amber-400">
                      Pro only
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: Sticky Sidebar ── */}
        <div className="relative lg:col-span-4">
          <div className="sticky top-28 space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-zinc-900">
            {/* Name */}
            <div>
              <h1 className="text-2xl font-bold">{template.name}</h1>
              <p className="mt-1 text-sm text-zinc-500">
                by{" "}
                <span className="font-semibold text-zinc-900 dark:text-white">
                  {template.author}
                </span>
              </p>
            </div>

            {/* Price */}
            <div>
              {isFree ? (
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-black text-emerald-600 dark:text-emerald-400">
                    Free
                  </span>
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    Open Source
                  </span>
                </div>
              ) : (
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-zinc-900 dark:text-white">
                    {template.price}
                  </span>
                  {template.originalPrice && (
                    <span className="text-lg font-medium text-zinc-400 line-through decoration-zinc-300 dark:decoration-zinc-600">
                      {template.originalPrice}
                    </span>
                  )}
                  <span className="text-sm text-zinc-500">/ one-time</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-3">
              {isFree ? (
                <>
                  <CliInstallTabs templateId={id || "ai-startup"} />
                  <button
                    onClick={() => navigate("/blocks")}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-3.5 font-bold text-white shadow-lg transition-all hover:bg-zinc-800 active:scale-[0.97] dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                  >
                    <Download className="h-4 w-4" /> Browse Components
                  </button>
                  <p className="text-center text-xs text-zinc-500">
                    Free forever. No account required.
                  </p>
                </>
              ) : (
                <>
                  <a
                    href={template.purchaseUrl || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-3.5 font-bold text-white shadow-lg transition-all hover:bg-zinc-800 active:scale-[0.97] dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                  >
                    <ShoppingCart className="h-5 w-5" /> Get Pro Access — {template.price}
                  </a>
                  <p className="text-center text-xs text-zinc-500">
                    Secure checkout via LemonSqueezy. Instant download.
                  </p>
                </>
              )}

              <a
                href={template.previewUrl}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-transparent bg-zinc-100 px-4 py-3.5 font-semibold text-zinc-900 transition-all hover:bg-zinc-200 dark:border-white/5 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                <ExternalLink className="h-4 w-4" /> Live Preview
              </a>
            </div>

            {/* Pro upsell for free templates */}
            {isFree && (
              <div className="rounded-xl border border-amber-200/50 bg-gradient-to-br from-amber-50 to-orange-50/50 p-4 dark:border-amber-500/10 dark:from-amber-500/5 dark:to-transparent">
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                  <div>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                      Want the full collection?
                    </p>
                    <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                      All templates & commercial license.
                    </p>
                    <button
                      onClick={() => setIsProModalOpen(true)}
                      className="mt-2 flex items-center gap-1 text-xs font-bold text-amber-600 transition-colors hover:text-amber-700 dark:text-amber-400"
                    >
                      View Pro Pricing <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tech Stack */}
            <div className="space-y-3 border-t border-zinc-200 pt-6 dark:border-white/10">
              <h3 className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {template.techStack.map((t, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1.5 rounded-md border border-zinc-200 bg-zinc-100 px-2.5 py-1.5 text-xs font-medium dark:border-white/10 dark:bg-white/5"
                  >
                    {t.icon} {t.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Meta */}
            <div className="space-y-3 border-t border-zinc-200 pt-6 dark:border-white/10">
              <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Monitor className="h-4 w-4" /> Desktop
                </span>
                <span className="flex items-center gap-1.5">
                  <Smartphone className="h-4 w-4" /> Mobile
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── You May Also Like ── */}
      <section className="border-t border-zinc-200 bg-zinc-50 py-12 dark:border-white/5 dark:bg-[#050510]">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-6 text-lg font-bold">You may also like</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedTemplates.map((tid) => {
              const t = TEMPLATES_DATA[tid];
              const [imgErr, setImgErr] = useState(false);
              return (
                <button
                  key={tid}
                  onClick={() => navigate(`/templates/${tid}/detail`)}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white text-left transition-all hover:border-zinc-300 hover:shadow-lg dark:border-white/10 dark:bg-zinc-900 dark:hover:border-white/20"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-[#0a0a0b]">
                    {imgErr ? (
                      <div className="flex h-full w-full items-center justify-center">
                        <Eye className="h-8 w-8 text-zinc-300 dark:text-zinc-700" />
                      </div>
                    ) : (
                      <img
                        src={t.images[0]}
                        alt={t.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={() => setImgErr(true)}
                      />
                    )}
                  </div>
                  <div className="flex items-start justify-between p-3">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-semibold">{t.name}</span>
                      <span className="text-xs text-zinc-500">{t.author}</span>
                    </div>
                    <span
                      className={`rounded-md px-2 py-1 text-xs font-semibold ${t.price.toLowerCase() === "free" ? "bg-zinc-100 text-zinc-900 dark:bg-white/10 dark:text-white" : "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"}`}
                    >
                      {t.price}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <ProPricingModal isOpen={isProModalOpen} onClose={() => setIsProModalOpen(false)} />
    </div>
  );
}
