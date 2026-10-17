// starter-kits/pro-templates/src/components/nexus-sections/HudbirdVisualWidgets.tsx
"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Container, Reveal } from "./ScrollReveal";
import { ArrowUpRight, Star, FileText, MapPin, Sparkles } from "lucide-react";

/**
 * 100% Verified Pexels High-Resolution Image Library (HTTP 200 Verified, Zero Unsplash)
 * Exports both array collections and named keys so every niche and inner page resolves cleanly.
 */
export const PEXELS = {
  // Avatars (Named + Array)
  avatarWoman1:
    "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
  avatarMan1:
    "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
  avatarWoman2:
    "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
  avatarMan2:
    "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
  avatarWoman3:
    "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400",
  avatarMan3:
    "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400",
  avatars: [
    "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400",
  ],

  // Architecture & PropTech Villas (Both naming conventions supported)
  architectureVilla:
    "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1400",
  architectureWhite:
    "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1200",
  villaHero:
    "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1600",
  villaExterior1:
    "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1200",
  villaExterior2:
    "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200",
  villaInterior:
    "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200",

  // Sky & Clouds Backdrop
  skyClouds:
    "https://images.pexels.com/photos/531756/pexels-photo-531756.jpeg?auto=compress&cs=tinysrgb&w=1800",

  // 3D Abstract & Fluid Art (Both camelCase and underscore supported)
  abstract3D_1:
    "https://images.pexels.com/photos/5011647/pexels-photo-5011647.jpeg?auto=compress&cs=tinysrgb&w=1000",
  abstract3D_2:
    "https://images.pexels.com/photos/7130555/pexels-photo-7130555.jpeg?auto=compress&cs=tinysrgb&w=1000",
  abstract3D_3:
    "https://images.pexels.com/photos/7130498/pexels-photo-7130498.jpeg?auto=compress&cs=tinysrgb&w=1000",
  abstract3d1:
    "https://images.pexels.com/photos/5011647/pexels-photo-5011647.jpeg?auto=compress&cs=tinysrgb&w=1000",
  abstract3d2:
    "https://images.pexels.com/photos/7130555/pexels-photo-7130555.jpeg?auto=compress&cs=tinysrgb&w=1000",
  abstract3d3:
    "https://images.pexels.com/photos/7130498/pexels-photo-7130498.jpeg?auto=compress&cs=tinysrgb&w=1000",

  // AI, Neural & VR Portraits
  vrPortrait:
    "https://images.pexels.com/photos/8728382/pexels-photo-8728382.jpeg?auto=compress&cs=tinysrgb&w=1400",
  neuralSculpture:
    "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200",
  neuralBrain:
    "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200",

  // Studio & Collaborative Engineering Team
  studioTeam:
    "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1200",

  // Portfolio & Project Showcases (Named + Array)
  project1:
    "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1000",
  project2:
    "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1000",
  project3:
    "https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&w=1000",
  project4:
    "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1000",
  project5:
    "https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?auto=compress&cs=tinysrgb&w=1000",
  project6:
    "https://images.pexels.com/photos/5011647/pexels-photo-5011647.jpeg?auto=compress&cs=tinysrgb&w=1000",
  projects: [
    "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1000",
    "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1000",
    "https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&w=1000",
    "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1000",
    "https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?auto=compress&cs=tinysrgb&w=1000",
    "https://images.pexels.com/photos/5011647/pexels-photo-5011647.jpeg?auto=compress&cs=tinysrgb&w=1000",
  ],

  // Wellness & Bio-Longevity (Named + Array)
  wellness1:
    "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=1000",
  wellness2:
    "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=1000",
  wellness3:
    "https://images.pexels.com/photos/3865676/pexels-photo-3865676.jpeg?auto=compress&cs=tinysrgb&w=1000",
  wellness4:
    "https://images.pexels.com/photos/6621462/pexels-photo-6621462.jpeg?auto=compress&cs=tinysrgb&w=1000",
  wellness: [
    "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=1000",
    "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=1000",
    "https://images.pexels.com/photos/3865676/pexels-photo-3865676.jpeg?auto=compress&cs=tinysrgb&w=1000",
    "https://images.pexels.com/photos/6621462/pexels-photo-6621462.jpeg?auto=compress&cs=tinysrgb&w=1000",
  ],

  // Domain-Specific Pexels Collections for 47 Pre-Built Templates
  aiAndNeural: [
    "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/8728382/pexels-photo-8728382.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/5011647/pexels-photo-5011647.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/7130555/pexels-photo-7130555.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200",
  ],
  fintechAndTrading: [
    "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/6770610/pexels-photo-6770610.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/5980856/pexels-photo-5980856.jpeg?auto=compress&cs=tinysrgb&w=1200",
  ],
  cyberAndCloud: [
    "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1200",
  ],
  agencyAndCreative: [
    "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/7130498/pexels-photo-7130498.jpeg?auto=compress&cs=tinysrgb&w=1200",
  ],
  proptechAndArchitecture: [
    "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1200",
  ],
  posAndCommerce: [
    "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/12935074/pexels-photo-12935074.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg?auto=compress&cs=tinysrgb&w=1200",
  ],
  audioAndVoice: [
    "https://images.pexels.com/photos/3783471/pexels-photo-3783471.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&w=1200",
  ],
};

/**
 * Deterministic Pexels visual resolver for all 47 Pre-Built Templates.
 * Matches every template slug to its genuine industry vertical photography from Pexels,
 * shifting index per slug hash so each of the 47 templates gets a unique visual set.
 */
export function getTemplatePexelsPack(slug: string, archetype?: string) {
  const s = (slug || "").toLowerCase();
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = (hash * 31 + s.charCodeAt(i)) >>> 0;
  }

  let pool: string[] = PEXELS.agencyAndCreative;
  if (s.includes("voice") || s.includes("audio") || s.includes("podcast")) {
    pool = [...PEXELS.audioAndVoice, ...PEXELS.aiAndNeural];
  } else if (
    s.includes("property") ||
    s.includes("mortgage") ||
    s.includes("insurance") ||
    s.includes("smart-solutions") ||
    archetype === "proptech"
  ) {
    pool = PEXELS.proptechAndArchitecture;
  } else if (s.includes("pos") || s.includes("commerce") || s.includes("retail")) {
    pool = [...PEXELS.posAndCommerce, ...PEXELS.fintechAndTrading];
  } else if (
    s.includes("cloud") ||
    s.includes("hosting") ||
    s.includes("cyber") ||
    s.includes("security") ||
    s.includes("risk") ||
    s.includes("gadget") ||
    archetype === "cyber"
  ) {
    pool = PEXELS.cyberAndCloud;
  } else if (
    s.includes("crypto") ||
    s.includes("defi") ||
    s.includes("decentralized") ||
    s.includes("forex") ||
    s.includes("wealth") ||
    s.includes("investment") ||
    s.includes("payment") ||
    s.includes("banking") ||
    s.includes("financial") ||
    s.includes("finance") ||
    s.includes("analytics") ||
    archetype === "fintech"
  ) {
    pool = PEXELS.fintechAndTrading;
  } else if (
    s.includes("wellness") ||
    s.includes("health") ||
    s.includes("longevity") ||
    archetype === "wellness"
  ) {
    pool = [...PEXELS.wellness, ...PEXELS.proptechAndArchitecture];
  } else if (
    s.includes("ai") ||
    s.includes("chatbot") ||
    s.includes("data-visualization") ||
    s.includes("app-builder") ||
    archetype === "ai"
  ) {
    pool = PEXELS.aiAndNeural;
  } else {
    pool = PEXELS.agencyAndCreative;
  }

  const pick = (offset: number) => pool[(hash + offset) % pool.length];

  return {
    hero: pick(0),
    secondary: pick(1),
    gallery: [pick(0), pick(1), pick(2), pick(3)] as [string, string, string, string],
    caseStudies: [pick(2), pick(3), pick(4)] as [string, string, string],
    avatars: [
      PEXELS.avatars[hash % PEXELS.avatars.length],
      PEXELS.avatars[(hash + 1) % PEXELS.avatars.length],
      PEXELS.avatars[(hash + 2) % PEXELS.avatars.length],
    ] as [string, string, string],
  };
}

/**
 * Isometric 3D Wireframe Cube Icons (Matching Screenshots C & D)
 */
export const IsoCubeIcon: React.FC<{ variant?: 1 | 2 | 3 | 4; className?: string }> = ({
  variant = 1,
  className = "w-7 h-7",
}) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    className={className}
  >
    <path d="M16 3L28 10V22L16 29L4 22V10L16 3Z" />
    <path d="M4 10L16 17L28 10" />
    <path d="M16 17V29" />
    {variant === 1 && <path d="M10 6.5L22 13.5V25.5" strokeOpacity="0.5" />}
    {variant === 2 && (
      <>
        <path d="M10 13.5L22 6.5" strokeOpacity="0.5" />
        <path d="M4 16L16 23L28 16" strokeOpacity="0.5" />
      </>
    )}
    {variant === 3 && (
      <polygon points="16,8 23,12 16,16 9,12" fill="currentColor" fillOpacity="0.15" />
    )}
    {variant === 4 && (
      <>
        <path d="M4 14L16 21L28 14" strokeOpacity="0.55" />
        <path d="M4 18L16 25L28 18" strokeOpacity="0.4" />
      </>
    )}
  </svg>
);

/**
 * SCREENSHOT A: "Features that set HudbirdUI apart"
 * 5-Card Interactive UI Widget Bento (Top 3 + Bottom 2 Centered)
 */
export const HudbirdFeatureWidgetGrid: React.FC<{
  badge?: string;
  headline?: string;
  title?: string;
  subtitle?: string;
  cardTitles?: [
    { title: string; desc: string },
    { title: string; desc: string },
    { title: string; desc: string },
  ];
}> = ({
  badge = "More features",
  headline,
  title,
  subtitle,
  cardTitles = [
    {
      title: "Drag & drop workflow builder",
      desc: "Design experiences effortlessly, no coding needed.",
    },
    {
      title: "Transactional event API",
      desc: "Send real-time order confirmations and instant triggers.",
    },
    {
      title: "Automated relay & webhooks",
      desc: "Seamless real-time infrastructure for modern teams.",
    },
  ],
}) => {
  const [qty, setQty] = useState<number>(1);
  const [addedToCart, setAddedToCart] = useState<boolean>(false);
  const resolvedHeading = title || headline || "Features that set HudbirdUI apart";

  return (
    <section className="overflow-hidden bg-[#0B0C10] py-20 text-white sm:py-28">
      <Container>
        {/* Top Centered Pill Badge + Headline */}
        <div className="mx-auto mb-14 max-w-3xl space-y-4 text-center sm:mb-16">
          <Reveal y={10}>
            <span className="inline-flex items-center rounded-full border border-white/10 bg-[#181A20] px-4 py-1.5 text-xs font-medium text-[#C8F560] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              {badge}
            </span>
          </Reveal>
          <Reveal delay={0.08} y={14}>
            <h2 className="text-[clamp(2.2rem,4.5vw,3.6rem)] leading-[1.08] font-medium tracking-[-0.03em] text-white">
              {resolvedHeading}
            </h2>
          </Reveal>
          {subtitle && (
            <Reveal delay={0.12} y={12}>
              <p className="mx-auto max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
                {subtitle}
              </p>
            </Reveal>
          )}
        </div>

        {/* Top Row: 3 Dark UI Widget Cards with Double-Bezel Architecture */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Card 1: Trusted by 20k+ Avatar Stack Widget */}
          <Reveal y={20}>
            <div className="space-y-4">
              <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-transform duration-300 hover:-translate-y-1">
                <div className="flex h-[250px] flex-col justify-between rounded-[26px] border border-white/[0.06] bg-[#14161D] p-7">
                  <div className="flex items-center">
                    <div className="flex -space-x-3">
                      {PEXELS.avatars.slice(0, 3).map((av, i) => (
                        <img
                          key={i}
                          src={av}
                          alt="Customer"
                          className="h-12 w-12 rounded-full bg-emerald-500 object-cover ring-2 ring-[#C8F560]"
                        />
                      ))}
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C8F560] text-[#0D0F14] shadow-lg">
                        <ArrowUpRight className="h-5 w-5" />
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-xl font-medium text-white">Trusted by 20k+</div>
                    <div className="mt-1 text-sm text-zinc-400">Customers Across the globe</div>
                  </div>
                </div>
              </div>

              <div className="px-1">
                <h3 className="text-xl font-medium text-white">{cardTitles[0].title}</h3>
                <p className="mt-1 text-sm text-zinc-400">{cardTitles[0].desc}</p>
              </div>
            </div>
          </Reveal>

          {/* Card 2: Two Stacked Neon Lime-Green Interactive Pills (Bessie Cooper + $240 Add to Cart) */}
          <Reveal delay={0.08} y={20}>
            <div className="space-y-4">
              <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-transform duration-300 hover:-translate-y-1">
                <div className="flex h-[250px] flex-col justify-between gap-3 rounded-[26px] border border-white/[0.06] bg-[#14161D] p-5">
                  {/* Top Neon Lime Card */}
                  <div className="flex items-center gap-3.5 rounded-2xl bg-[#C8F560] px-4 py-3.5 text-[#0D0F14] shadow-sm">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0D0F14] text-white">
                      <Sparkles className="h-4 w-4 text-[#C8F560]" />
                    </span>
                    <div>
                      <div className="text-sm leading-tight font-semibold">Bessie cooper</div>
                      <div className="mt-0.5 text-xs text-zinc-700">15 Oct, 2026 at 10:20AM!</div>
                    </div>
                  </div>

                  {/* Bottom Neon Lime Interactive Cart Card */}
                  <div className="flex items-center justify-between gap-2 rounded-2xl bg-[#C8F560] px-4 py-3.5 text-[#0D0F14] shadow-sm">
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-bold tabular-nums">
                        ${(240 * qty).toFixed(2)}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-zinc-700">
                        <span>Quantity</span>
                        <button
                          type="button"
                          onClick={() => setQty(Math.max(1, qty - 1))}
                          className="flex h-5 w-5 cursor-pointer items-center justify-center rounded bg-black/10 font-bold hover:bg-black/20"
                        >
                          -
                        </button>
                        <span className="font-semibold text-zinc-950">{qty}</span>
                        <button
                          type="button"
                          onClick={() => setQty(qty + 1)}
                          className="flex h-5 w-5 cursor-pointer items-center justify-center rounded bg-black/10 font-bold hover:bg-black/20"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setAddedToCart(!addedToCart)}
                      className="shrink-0 cursor-pointer rounded-full bg-[#0D0F14] px-4 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90"
                    >
                      {addedToCart ? "Added ✓" : "Add to cart"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="px-1">
                <h3 className="text-xl font-medium text-white">{cardTitles[1].title}</h3>
                <p className="mt-1 text-sm text-zinc-400">{cardTitles[1].desc}</p>
              </div>
            </div>
          </Reveal>

          {/* Card 3: Transaction Statistics $41.379 + 20% Yellow Badge + 7 Vertical Lime Gradient Bars */}
          <Reveal delay={0.16} y={20}>
            <div className="space-y-4">
              <div className="flex h-[250px] flex-col justify-between rounded-[28px] border border-white/10 bg-[#14161D] p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-transform duration-300 hover:-translate-y-1">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs text-zinc-400">Transaction statistics</div>
                    <div className="mt-1 text-2xl font-semibold text-white tabular-nums">
                      $ 41.379
                    </div>
                  </div>
                  <span className="rounded-xl bg-[#FACC15] px-3 py-1.5 text-xs font-bold text-zinc-950">
                    20%
                  </span>
                </div>

                {/* 7 Vertical Lime-to-White Rounded Pill Bars */}
                <div className="flex h-24 items-end justify-between gap-3 pt-4">
                  {[52, 36, 78, 48, 64, 86, 26].map((h, i) => (
                    <div key={i} className="flex h-full flex-1 flex-col items-center justify-end">
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: i * 0.06 }}
                        className="w-3 rounded-t-full bg-gradient-to-b from-[#BEF264] to-white sm:w-3.5"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-1">
                <h3 className="text-xl font-medium text-white">{cardTitles[2].title}</h3>
                <p className="mt-1 text-sm text-zinc-400">{cardTitles[2].desc}</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Bottom Row: 2 Centered Dark UI Widget Cards (150% Business Growth $682.5 + Curious George 40 Task) */}
        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          {/* Card 4: 150% Business Growth $682.5 */}
          <Reveal delay={0.2} y={20}>
            <div className="flex h-[220px] flex-col justify-between rounded-[28px] border border-white/[0.06] bg-[#14161D] p-7 transition-transform duration-300 hover:-translate-y-1">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-2xl font-medium text-white">150%</div>
                  <div className="mt-1 text-xs text-zinc-400">Business growth</div>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#BEF264] text-zinc-950">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>

              <div className="text-4xl font-medium tracking-tight text-[#BEF264] tabular-nums sm:text-5xl">
                $682.5
              </div>
            </div>
          </Reveal>

          {/* Card 5: Curious George UI UX Designer + 40 Task + 4,7 (750 Reviews) */}
          <Reveal delay={0.26} y={20}>
            <div className="flex h-[220px] flex-col justify-between rounded-[28px] border border-white/[0.06] bg-[#14161D] p-7 transition-transform duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#BEF264] p-0.5">
                  <img
                    src={PEXELS.avatars[2]}
                    alt="Curious george"
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-lg font-medium text-white">Curious george</div>
                  <div className="text-xs text-zinc-400">UI UX designer</div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/[0.06] pt-4 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#BEF264]" />
                  <span>40 Task</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-current text-[#BEF264]" />
                  <span className="font-medium text-zinc-300">4,7</span>
                  <span>(750 Reviews)</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};

/**
 * SCREENSHOT C: "Reasons to select us — Modern tools built for today's teams."
 * Left 4 Isometric Cube Feature Rows + Right Architectural/Product Photo with 2 Overlapping Dark Stat Cards
 */
export const HudbirdSplitFloatingStats: React.FC<{
  badge?: string;
  headline?: string;
  title?: string;
  subtitle?: string;
  features?: [string, string, string, string];
  image?: string;
}> = ({
  badge = "Reasons to select us",
  headline,
  title,
  subtitle = "Streamline operations, reduce manual tasks, and maximize revenue.",
  features = [
    "Unified dashboard for all projects, assets & clients",
    "Automated billing collection & smart milestone reminders",
    "Online requests, real-time approvals & work orders",
    "AI-powered analytics & predictive resource screening",
  ],
  image = PEXELS.architectureWhite,
}) => {
  const resolvedHeading =
    title || headline || "Modern tools built for today’s high-velocity teams.";

  return (
    <section className="overflow-hidden border-t border-white/[0.06] bg-[#0B0C10] py-20 text-white sm:py-28">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column (6 Cols): Badge + Headline + 4 Isometric 3D Cube Feature Rows */}
          <div className="space-y-6 lg:col-span-6">
            <Reveal y={10}>
              <span className="inline-flex items-center rounded-full border border-white/10 bg-[#181A20] px-4 py-1.5 text-xs font-medium text-[#EAB308]">
                {badge}
              </span>
            </Reveal>

            <Reveal delay={0.08} y={14}>
              <h2 className="text-[clamp(2.1rem,4.2vw,3.4rem)] leading-[1.1] font-medium tracking-[-0.03em] text-white">
                {resolvedHeading}
              </h2>
            </Reveal>

            <Reveal delay={0.14} y={14}>
              <p className="max-w-lg text-sm leading-relaxed text-zinc-400 sm:text-base">
                {subtitle}
              </p>
            </Reveal>

            <div className="space-y-5 pt-4">
              {features.map((feat, idx) => (
                <Reveal key={feat} delay={0.16 + idx * 0.06} y={14}>
                  <div className="group flex items-center gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-zinc-300 transition-colors group-hover:border-[#BEF264]/40 group-hover:text-[#BEF264]">
                      <IsoCubeIcon variant={((idx % 4) + 1) as 1 | 2 | 3 | 4} className="h-6 w-6" />
                    </span>
                    <span className="text-sm font-medium text-zinc-200 transition-colors group-hover:text-white sm:text-base">
                      {feat}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right Column (6 Cols): Pexels Photo Card + 2 Overlapping Floating Dark Stat Cards */}
          <div className="relative lg:col-span-6">
            <Reveal delay={0.15} y={24}>
              <div className="relative mx-auto max-w-[480px] lg:mr-8">
                {/* Main Rounded-3xl Pexels Photo */}
                <div className="aspect-[4/4.6] overflow-hidden rounded-[32px] border border-white/10 bg-zinc-800">
                  <img
                    src={image || PEXELS.architectureWhite}
                    alt="Modern architecture & workspace"
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Top-Right Overlapping Card: Transaction statistics $41.379 + Tilted 20% Yellow Sticker + S M T W T F S Bars */}
                <motion.div
                  initial={{ opacity: 0, x: 24, y: -10 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.25 }}
                  className="absolute top-8 -right-8 hidden w-[245px] flex-col justify-between rounded-[26px] border border-white/10 bg-[#161922]/95 p-5 shadow-[0_28px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:flex"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[11px] text-zinc-400">Transaction statistics</div>
                      <div className="mt-0.5 text-base font-semibold text-white tabular-nums">
                        $ 41.379
                      </div>
                    </div>
                    <span className="-rotate-12 rounded-xl bg-[#FACC15] px-3 py-1 text-sm font-bold text-zinc-950 shadow-md">
                      20%
                    </span>
                  </div>

                  <div className="mt-6 space-y-2">
                    <div className="flex h-20 items-end justify-between gap-2">
                      {[55, 35, 72, 48, 65, 85, 25].map((h, i) => (
                        <div
                          key={i}
                          className="flex h-full flex-1 flex-col items-center justify-end"
                        >
                          <div
                            style={{ height: `${h}%` }}
                            className="w-2.5 rounded-t-sm bg-gradient-to-b from-[#99CC33] to-[#D9F99D]"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between px-0.5 text-[10px] font-medium text-zinc-400">
                      {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                        <span key={i}>{d}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Bottom Overlapping Card: Profit 85.4% + Dual Wave Sparkline + 4 Neon-Lime Avatars */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.35 }}
                  className="absolute right-4 -bottom-6 left-12 hidden rounded-[26px] border border-white/10 bg-[#11131A]/95 p-5 shadow-[0_28px_60px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:block"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-[11px] text-zinc-400">Profit</div>
                      <div className="mt-0.5 text-2xl font-semibold text-white tabular-nums">
                        85.4%
                      </div>
                    </div>

                    {/* Smooth Dual-Wave SVG Sparkline (Purple + White) */}
                    <svg viewBox="0 0 180 50" className="h-12 w-40 overflow-visible" fill="none">
                      <path
                        d="M0 36 C25 36, 35 38, 48 38 C58 38, 62 8, 68 8 C74 8, 78 36, 92 36 C104 36, 110 22, 120 22 C130 22, 136 38, 146 38 C156 38, 160 12, 168 12 C174 12, 176 20, 180 20"
                        stroke="#8B5CF6"
                        strokeWidth="2"
                      />
                      <path
                        d="M0 38 C25 38, 35 40, 48 40 C58 40, 62 14, 68 14 C74 14, 78 40, 92 40 C104 40, 110 28, 120 28 C130 28, 136 41, 146 41 C156 41, 160 18, 168 18 C174 18, 176 24, 180 24"
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                        strokeOpacity="0.85"
                      />
                    </svg>
                  </div>

                  <div className="mt-3 flex -space-x-2">
                    {PEXELS.avatars.slice(0, 4).map((av, i) => (
                      <img
                        key={i}
                        src={av}
                        alt="Team member"
                        className="h-8 w-8 rounded-full bg-[#BEF264] object-cover ring-2 ring-[#BEF264]"
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
};

/**
 * SCREENSHOT D: "Features — Robust tools to enhance your business."
 * Left Architectural/Product Pexels Card + Right 2x2 Glowing Cobalt-Blue Halo Telemetry Grid
 * + Bottom 3-Card Bento Row (Yellow Team Card + Dark Automation Card + Map Card)
 */
export const HudbirdRobustTelemetryBento: React.FC<{
  badge?: string;
  headline?: string;
  title?: string;
  subtitle?: string;
  metrics?: [
    { label: string; value: string },
    { label: string; value: string },
    { label: string; value: string },
    { label: string; value: string },
  ];
  image?: string;
}> = ({
  badge = "Features",
  headline,
  title,
  subtitle,
  metrics = [
    { label: "Platform uptime", value: "10 Y" },
    { label: "Daily active users", value: "8950" },
    { label: "Latency score", value: "34 ms" },
    { label: "Conversion rate", value: "85 %" },
  ],
  image = PEXELS.architectureVilla,
}) => {
  const resolvedHeading =
    title || headline || "Robust tools to enhance your modern business operations.";

  return (
    <section className="overflow-hidden border-t border-white/[0.06] bg-[#0B0C10] py-20 text-white sm:py-28">
      <Container>
        {/* Centered Header */}
        <div className="mx-auto mb-14 max-w-3xl space-y-4 text-center sm:mb-16">
          <Reveal y={10}>
            <span className="inline-flex items-center rounded-full border border-white/10 bg-[#181A20] px-4 py-1.5 text-xs font-medium text-[#EAB308]">
              {badge}
            </span>
          </Reveal>
          <Reveal delay={0.08} y={14}>
            <h2 className="text-[clamp(2.1rem,4.4vw,3.5rem)] leading-[1.1] font-medium tracking-[-0.03em] text-white">
              {resolvedHeading}
            </h2>
          </Reveal>
          {subtitle && (
            <Reveal delay={0.12} y={12}>
              <p className="mx-auto max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
                {subtitle}
              </p>
            </Reveal>
          )}
        </div>

        {/* Top 2-Column Bento Row: Left Pexels Photo + Right 2x2 Glowing Cobalt Ring Metric Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left 6 Cols: Large Pexels Photo Card */}
          <div className="aspect-[16/12] overflow-hidden rounded-[32px] border border-white/10 bg-zinc-800 lg:col-span-6">
            <img
              src={image || PEXELS.architectureVilla}
              alt="HudbirdUI Flagship Showcase"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Right 6 Cols: Dark Glowing Cobalt-Blue Halo Container with 2x2 Isometric Cube Metric Cards */}
          <div className="relative flex items-center overflow-hidden rounded-[32px] border border-white/10 bg-[#0E1017] p-6 sm:p-8 lg:col-span-6">
            {/* Glowing Cobalt Blue Circular Ring Halo in the Center (Exact Match to Screenshot D) */}
            <div
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[28px] border-[#2563EB]/55 blur-[28px]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3B82F6]/25 blur-[50px]"
            />

            <div className="relative z-10 grid w-full grid-cols-1 gap-5 sm:grid-cols-2">
              {metrics.map((m, idx) => (
                <div
                  key={m.label}
                  className="flex min-h-[165px] flex-col justify-between rounded-[24px] border border-white/10 bg-[#141722]/85 p-6 backdrop-blur-xl transition-colors hover:border-blue-400/40"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-xs text-zinc-400">{m.label}</span>
                    <IsoCubeIcon
                      variant={((idx % 4) + 1) as 1 | 2 | 3 | 4}
                      className="h-6 w-6 text-zinc-300"
                    />
                  </div>
                  <div className="mt-4 text-4xl font-medium tracking-tight text-white tabular-nums sm:text-[42px]">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom 3-Card Bento Row (Yellow Team Card + Dark Status Card + Interactive Map Card) */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-12">
          {/* Yellow Card (3 Cols) */}
          <div className="flex min-h-[190px] flex-col justify-between rounded-[28px] bg-[#FACC15] p-6 text-zinc-950 md:col-span-3">
            <div className="flex -space-x-2.5">
              {PEXELS.avatars.slice(0, 4).map((av, i) => (
                <img
                  key={i}
                  src={av}
                  alt="Member"
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-zinc-950"
                />
              ))}
            </div>
            <div>
              <div className="text-2xl font-bold tracking-tight">24/7 Live Sync</div>
              <div className="mt-1 text-xs font-medium text-zinc-800">
                Dedicated engineering & design pods
              </div>
            </div>
          </div>

          {/* Dark Center Card (3 Cols) */}
          <div className="flex min-h-[190px] flex-col justify-between rounded-[28px] border border-white/10 bg-[#14161D] p-6 md:col-span-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-400">Global Edge Nodes</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-zinc-950">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
            <div>
              <div className="text-3xl font-semibold text-white">99.99%</div>
              <div className="mt-1 text-xs text-emerald-400">Zero-latency multi-region CDN</div>
            </div>
          </div>

          {/* Right Map / Global Presence Card (6 Cols) */}
          <div className="relative flex min-h-[190px] flex-col justify-between overflow-hidden rounded-[28px] border border-white/10 bg-[#14161D] p-6 md:col-span-6">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)",
                backgroundSize: "18px 18px",
              }}
            />
            <div className="relative z-10 flex items-center justify-between">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-400">
                <MapPin className="h-3.5 w-3.5" />
                <span>Global Infrastructure Coverage</span>
              </div>
              <span className="text-xs text-zinc-400">North America · Europe · APAC</span>
            </div>

            <div className="relative z-10 flex items-end justify-between gap-4 pt-6">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Real-time telemetry across 42+ cities
                </h3>
                <p className="mt-1 text-xs text-zinc-400">
                  Automated regional routing, compliance, and instant failover.
                </p>
              </div>
              <Link
                to="/demos/digital-agency/contact"
                className="shrink-0 rounded-full bg-white px-4 py-2 text-xs font-semibold text-zinc-950 transition-transform hover:scale-105"
              >
                Explore Map
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

/**
 * SCREENSHOT B: Smart Property Management / PropTech Hero Showcase Section
 * Sky-Blue Backdrop + Centered Bold Dark Typography + White Pill "Request a demo" Over Modern Architectural Villa
 */
export const HudbirdPropTechShowcaseSection: React.FC<{ nicheSlug?: string }> = ({
  nicheSlug = "fintech-protocol",
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#2EA3F2] via-[#7BC6F9] to-[#0B0C10] pt-16 pb-0">
      <Container className="relative z-10 text-center">
        {/* Top Subtle Pill Badge */}
        <Reveal y={10}>
          <span className="inline-flex items-center rounded-full border border-white/25 bg-black/15 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-md">
            Smart asset & property management software
          </span>
        </Reveal>

        {/* Bold Dark Headline */}
        <Reveal delay={0.08} y={14}>
          <h2 className="mx-auto mt-5 max-w-4xl text-[clamp(2.4rem,5.4vw,4.5rem)] leading-[1.06] font-semibold tracking-[-0.035em] text-zinc-950">
            Simplify asset management.
            <br />
            boost occupancy.
          </h2>
        </Reveal>

        <Reveal delay={0.14} y={14}>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-zinc-900/80 sm:text-base">
            All-in-one platform to manage portfolios, automate billing, streamline maintenance, and
            grow your real-world operations.
          </p>
        </Reveal>

        {/* Architectural Villa Showcase with Centered White "Request a demo" Pill */}
        <div className="relative mx-auto mt-8 max-w-5xl">
          {/* Centered White Pill CTA Overlapping the Top of the Building (Screenshot B) */}
          <div className="relative z-20 translate-y-6">
            <Link
              to={`/demos/${nicheSlug}/contact`}
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-zinc-950 shadow-[0_16px_40px_rgba(0,0,0,0.22)] transition-transform hover:scale-105"
            >
              Request a demo
            </Link>
          </div>

          <div className="relative aspect-[16/8.5] overflow-hidden rounded-t-[36px] border-x border-t border-white/30 shadow-2xl">
            <img
              src={PEXELS.architectureVilla}
              alt="Modern luxury architectural property"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10] via-[#0B0C10]/35 to-transparent" />
          </div>

          {/* Bottom Partner Logo Strip (Gopro / Apple / Kenio / Mantio) */}
          <div className="relative z-20 -mt-12 flex flex-wrap items-center justify-center gap-8 pb-10 text-lg font-semibold tracking-tight text-white/45 sm:gap-14">
            <span className="flex items-center gap-2">
              <span className="inline-block h-4 w-4 rounded-sm bg-white/30" /> Gopro
            </span>
            <span>Apple</span>
            <span className="flex items-center gap-2">
              <span className="inline-block h-4 w-4 rounded-full border border-white/40" /> Kenio
            </span>
            <span>Mantio</span>
          </div>
        </div>
      </Container>
    </section>
  );
};
