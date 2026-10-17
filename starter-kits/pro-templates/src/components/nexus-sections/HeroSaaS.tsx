// starter-kits/pro-templates/src/components/nexus-sections/HeroSaaS.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroSaaSProps } from "@hudbird/schemas";
import { Container, MaskedHeading, Reveal } from "./ScrollReveal";
import { Mic, Paperclip, ArrowRight, Sparkles, TrendingUp, Check } from "lucide-react";

const PROMPT_SUGGESTIONS = [
  {
    label: "keywords for food delivery app",
    prompt: "Fast 15-minute organic food & grocery delivery app for busy urban professionals",
    clusters: [
      {
        kw: "15 minute grocery delivery app",
        vol: "42,500/mo",
        kd: "24 Easy",
        intent: "Transactional",
      },
      {
        kw: "healthy meal delivery near me",
        vol: "90,100/mo",
        kd: "31 Medium",
        intent: "Commercial",
      },
      {
        kw: "same day organic produce delivery",
        vol: "18,400/mo",
        kd: "19 Easy",
        intent: "Transactional",
      },
    ],
  },
  {
    label: "Ideas for Saas",
    prompt: "AI-powered workflow automation and team productivity SaaS platform",
    clusters: [
      {
        kw: "ai workflow automation software",
        vol: "64,200/mo",
        kd: "28 Easy",
        intent: "Commercial",
      },
      {
        kw: "automate repetitive business tasks",
        vol: "29,800/mo",
        kd: "21 Easy",
        intent: "Informational",
      },
      {
        kw: "best zapier alternative for enterprise",
        vol: "14,900/mo",
        kd: "26 Easy",
        intent: "Transactional",
      },
    ],
  },
  {
    label: "High-intent B2B clusters",
    prompt: "Enterprise cloud security and zero-trust compliance automation",
    clusters: [
      {
        kw: "automated soc2 compliance platform",
        vol: "22,300/mo",
        kd: "29 Easy",
        intent: "Transactional",
      },
      {
        kw: "zero trust cloud security posture",
        vol: "35,100/mo",
        kd: "33 Medium",
        intent: "Commercial",
      },
      {
        kw: "enterprise api threat detection",
        vol: "16,700/mo",
        kd: "22 Easy",
        intent: "Commercial",
      },
    ],
  },
];

export const HeroSaaS: React.FC<{ data: HeroSaaSProps }> = ({ data }) => {
  const [selectedChipIdx, setSelectedChipIdx] = useState<number>(0);
  const [promptValue, setPromptValue] = useState<string>("");
  const [showGenerated, setShowGenerated] = useState<boolean>(false);

  const activeCluster = PROMPT_SUGGESTIONS[selectedChipIdx];

  const handleSelectChip = (idx: number) => {
    setSelectedChipIdx(idx);
    setPromptValue(PROMPT_SUGGESTIONS[idx].prompt);
    setShowGenerated(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowGenerated(true);
  };

  // Dynamic headline support across all AI pre-built templates while preserving AI Keyword Generator default
  const preText = data?.headline?.preText || "AI keyword generator that drives";
  const accentWord = data?.headline?.accentWord || "results";
  const postText = data?.headline?.postText || "";
  const fullHeading = `${preText} *${accentWord}*${postText ? ` ${postText}` : ""}`;
  const description =
    data?.description ||
    "Effortlessly discover high-impact keywords tailored to your niche—rank faster, smarter, and with less effort.";
  const badgeText = data?.badge?.text || "AI-Powered Intelligence Engine · v4.2";

  return (
    <section className="relative overflow-hidden bg-[#0A0A0F] pt-12 pb-24 text-white sm:pt-16 sm:pb-32">
      {/* 3D Perspective Wireframe Grid Background (Exact Match to Screenshot 2: ai-kw-generator) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-65"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.065) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.065) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 45%, #000 35%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 45%, #000 35%, transparent 100%)",
        }}
      />

      {/* Ambient Top & Center Glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/2 h-[340px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F97316]/15 blur-[130px]"
      />

      <Container className="relative z-10">
        {/* Centered Clean Headline + 1-Line Subtitle */}
        <div className="mx-auto max-w-3xl space-y-5 text-center">
          <Reveal y={10}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#14161F] px-4 py-1.5 text-xs font-medium text-[#C8F560] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C8F560]" />
              {badgeText}
            </span>
          </Reveal>

          <MaskedHeading
            as="h1"
            text={fullHeading}
            accent={accentWord}
            accentClassName="!text-[#FB923C]"
            className="text-[clamp(2.5rem,5.4vw,4.5rem)] leading-[1.06] font-semibold tracking-[-0.035em] text-white"
          />

          <Reveal delay={0.1} y={14}>
            <p className="mx-auto max-w-[52ch] text-[15px] leading-relaxed text-zinc-400 sm:text-[17px]">
              {description}
            </p>
          </Reveal>
        </div>

        {/* Centerpiece: Large Interactive Prompt Box with Double-Bezel Shell & Warm Coral/Orange/Peach Radial Glow */}
        <Reveal delay={0.18} y={22}>
          <div className="mx-auto mt-10 max-w-[760px] sm:mt-12">
            <div className="rounded-[34px] border border-white/10 bg-white/[0.04] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <form
                onSubmit={handleSubmit}
                className="relative overflow-hidden rounded-[28px] border border-white/15 bg-[#13131C]/95 p-5 shadow-[0_30px_90px_-15px_rgba(249,115,22,0.28)] transition-all duration-300 focus-within:border-[#FB923C]/60 sm:p-6"
              >
                {/* Signature Warm Coral / Orange / Peach Radial Mesh Glow in Bottom-Right (Screenshot 2) */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-12 -bottom-16 h-[240px] w-[380px] rounded-full bg-gradient-to-tr from-[#F43F5E]/40 via-[#F97316]/65 to-[#FDE68A]/70 blur-[52px]"
                />

                <div className="relative z-10">
                  <textarea
                    rows={3}
                    value={promptValue}
                    onChange={(e) => setPromptValue(e.target.value)}
                    placeholder="Describe your product, workflow, or target audience..."
                    className="w-full resize-none bg-transparent text-base leading-relaxed text-white placeholder:text-zinc-500 focus:outline-none sm:text-lg"
                  />

                  {/* Bottom Bar: Mic + Attachment on Left, White Pill Submit Button on Right */}
                  <div className="mt-2 flex items-center justify-between pt-4">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleSelectChip(0)}
                        title="Voice input"
                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.08] text-zinc-300 transition-colors hover:bg-white/15 hover:text-white"
                      >
                        <Mic className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSelectChip(1)}
                        title="Attach URL or brief"
                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.08] text-zinc-300 transition-colors hover:bg-white/15 hover:text-white"
                      >
                        <Paperclip className="h-4 w-4" />
                      </button>
                      <span className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[11px] text-zinc-400 sm:inline-flex">
                        <TrendingUp className="h-3.5 w-3.5 text-[#C8F560]" />
                        98.4% Semantic Match
                      </span>
                    </div>

                    <button
                      type="submit"
                      className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[#C8F560] px-6 py-2.5 text-sm font-semibold text-[#0D0F14] shadow-[0_8px_25px_rgba(200,245,96,0.3)] transition-all hover:scale-105 active:scale-95"
                    >
                      <span>Generate</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Quick-Prompt Suggestion Chips Below Prompt Box */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
              {PROMPT_SUGGESTIONS.map((chip, idx) => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => handleSelectChip(idx)}
                  className={`cursor-pointer rounded-full border px-4 py-2 text-xs font-medium transition-all ${
                    showGenerated && selectedChipIdx === idx
                      ? "border-[#C8F560] bg-[#C8F560] font-semibold text-[#0D0F14] shadow-lg"
                      : "border-white/10 bg-white/[0.06] text-zinc-300 hover:bg-white/10"
                  }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Live Interactive AI Keyword Cluster Preview Output */}
            <AnimatePresence>
              {showGenerated && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="mt-6 rounded-[32px] border border-white/10 bg-white/[0.04] p-1.5 shadow-2xl"
                >
                  <div className="space-y-4 rounded-[26px] border border-white/10 bg-[#14141F]/95 p-5 sm:p-6">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#C8F560]">
                        <Sparkles className="h-4 w-4" />
                        <span>AI Cluster Generated in 0.4s</span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11px] text-zinc-400">
                        <Check className="h-3.5 w-3.5 text-[#C8F560]" />3 High-ROI Opportunities
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      {activeCluster.clusters.map((c) => (
                        <div
                          key={c.kw}
                          className="space-y-2 rounded-2xl border border-white/10 bg-white/[0.04] p-3.5"
                        >
                          <div className="text-xs font-semibold text-white">{c.kw}</div>
                          <div className="flex items-center justify-between text-[11px] text-zinc-400">
                            <span>{c.vol}</span>
                            <span className="font-medium text-[#C8F560]">{c.kd}</span>
                          </div>
                          <span className="inline-block rounded-md bg-[#F97316]/15 px-2 py-0.5 text-[10px] font-medium text-[#FB923C]">
                            {c.intent}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};
