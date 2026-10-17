// starter-kits/pro-templates/src/components/nexus-sections/HeroAgency.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { HeroAgencyProps } from "@hudbird/schemas";
import { Container, MaskedHeading, Reveal, PillLink } from "./ScrollReveal";
import { PEXELS } from "./HudbirdVisualWidgets";
import { Globe, Box, Sparkles } from "lucide-react";

export const HeroAgency: React.FC<{ data: HeroAgencyProps }> = ({ data }) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden bg-[#F4F5F8] pt-10 pb-20 transition-colors duration-300 sm:pt-14 sm:pb-28 dark:bg-[#0B0B10]">
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-[380px] w-[780px] -translate-x-1/2 rounded-full bg-[#7C3AED]/12 blur-[120px] dark:bg-[#7C3AED]/20"
      />

      <Container>
        {/* Top 2-Column Split */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-6 lg:col-span-7">
            <MaskedHeading
              as="h1"
              text="Build, launch, and grow—all from one *powerful* platform"
              accent="powerful"
              className="max-w-[16ch] text-[clamp(2.5rem,5vw,4.35rem)] leading-[1.06] font-semibold tracking-[-0.035em] text-zinc-900 dark:text-white"
            />

            <Reveal delay={0.1} y={16}>
              <p className="max-w-[50ch] text-[15px] leading-relaxed text-zinc-600 sm:text-[16px] dark:text-zinc-400">
                No fluff, no unnecessary complexity. Just smart design and powerful functionality
                focused on one goal—helping your business grow faster and smarter.
              </p>
            </Reveal>

            <Reveal delay={0.18} y={16}>
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <PillLink
                  href={data.primaryCta?.href || "/demos/digital-agency/pricing"}
                  variant="brand"
                  size="lg"
                >
                  Get Started
                </PillLink>
                <PillLink
                  href={data.secondaryCta?.href || "/demos/digital-agency/services"}
                  variant="ghost"
                  size="lg"
                >
                  Learn more
                </PillLink>
              </div>
            </Reveal>
          </div>

          <div className="space-y-5 pt-1 lg:col-span-5 lg:pl-6">
            <Reveal delay={0.12} y={14}>
              <div className="flex items-center gap-3.5">
                <div className="flex -space-x-2.5">
                  {PEXELS.avatars.slice(0, 3).map((av, i) => (
                    <img
                      key={i}
                      src={av}
                      alt="Client avatar"
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-[#F4F5F8] dark:ring-[#0B0B10]"
                    />
                  ))}
                </div>
                <p className="text-sm leading-snug font-medium text-zinc-700 dark:text-zinc-300">
                  <span className="font-bold text-zinc-900 dark:text-white">2,000+</span> teams
                  shipping faster this week.
                </p>
              </div>
            </Reveal>

            <div className="h-px w-full bg-black/[0.08] dark:bg-white/10" />

            <Reveal delay={0.2} y={14}>
              <div className="grid grid-cols-2 gap-6 py-1">
                <div>
                  <div className="text-4xl leading-none font-semibold tracking-[-0.03em] text-zinc-900 sm:text-[42px] dark:text-white">
                    95%
                  </div>
                  <div className="mt-2 text-xs text-zinc-500 sm:text-[13px] dark:text-zinc-400">
                    Client Satisfaction Rate
                  </div>
                </div>
                <div>
                  <div className="text-4xl leading-none font-semibold tracking-[-0.03em] text-zinc-900 sm:text-[42px] dark:text-white">
                    130+
                  </div>
                  <div className="mt-2 text-xs text-zinc-500 sm:text-[13px] dark:text-zinc-400">
                    Projects Delivered
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="h-px w-full bg-black/[0.08] dark:bg-white/10" />

            <Reveal delay={0.28} y={14}>
              <div className="flex items-center justify-between gap-6 pt-1 opacity-55 grayscale dark:opacity-50">
                <span className="flex items-center gap-1 text-base font-bold tracking-tight text-zinc-700 dark:text-zinc-300">
                  <span className="text-lg">🔥</span> hotjar
                </span>
                <span className="text-base font-semibold tracking-wide text-zinc-700 dark:text-zinc-300">
                  scapic
                </span>
                <span className="flex items-center gap-1.5 text-base font-bold tracking-tight text-zinc-700 dark:text-zinc-300">
                  <span className="inline-block h-3.5 w-3.5 rotate-45 rounded-sm border-2 border-current" />
                  Lattice
                </span>
                <span className="hidden text-base font-semibold tracking-tight text-zinc-700 sm:inline-block dark:text-zinc-300">
                  Linear
                </span>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Bottom Visual Showpiece: 3 Fan-Tilted 3D Artwork Cards (100% Pexels) */}
        <div className="relative mt-16 flex items-center justify-center pt-6 pb-8 sm:mt-24">
          <div className="relative flex h-[320px] w-full max-w-[980px] items-center justify-center sm:h-[390px]">
            {/* Left Tilted 3D Card */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotate: 0, x: 0 }}
              whileInView={{
                opacity: 1,
                y: hoveredCard === 0 ? 4 : 22,
                rotate: hoveredCard === 0 ? -8 : -13,
                x: hoveredCard !== null ? -215 : -190,
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHoveredCard(0)}
              onMouseLeave={() => setHoveredCard(null)}
              className="absolute z-10 h-[270px] w-[220px] cursor-pointer rounded-[28px] border border-white bg-white/80 p-2 shadow-[0_25px_60px_-15px_rgba(30,27,75,0.28)] backdrop-blur-xl sm:h-[345px] sm:w-[285px] dark:border-white/15 dark:bg-zinc-900/80"
            >
              <div className="absolute -top-5 -left-5 z-30 flex h-14 w-14 items-center justify-center rounded-full border border-black/[0.06] bg-white text-[#7C3AED] shadow-xl dark:border-white/15 dark:bg-zinc-900">
                <Globe className="h-7 w-7 stroke-[1.5]" />
              </div>

              <div className="relative h-full w-full overflow-hidden rounded-[22px] bg-gradient-to-br from-[#1E1B4B] via-[#3B0764] to-[#1D4ED8]">
                <img
                  src={PEXELS.abstract3D_1}
                  alt="3D Iridescent Fluid Art"
                  className="h-full w-full scale-105 object-cover opacity-90 mix-blend-lighten transition-transform duration-700 hover:scale-115"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-5">
                  <span className="text-[11px] font-medium text-purple-200">UI/UX & Brand</span>
                  <p className="text-sm font-semibold text-white">Fluid Design Systems</p>
                </div>
              </div>
            </motion.div>

            {/* Center Featured 3D Card */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.94 }}
              whileInView={{
                opacity: 1,
                y: hoveredCard === 1 ? -16 : -6,
                rotate: hoveredCard === 1 ? 0 : 2,
                scale: hoveredCard === 1 ? 1.04 : 1,
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHoveredCard(1)}
              onMouseLeave={() => setHoveredCard(null)}
              className="relative z-20 h-[285px] w-[235px] cursor-pointer rounded-[30px] border border-white bg-white p-2 shadow-[0_32px_70px_-15px_rgba(124,58,237,0.35)] sm:h-[365px] sm:w-[305px] dark:border-white/15 dark:bg-zinc-900"
            >
              <div className="absolute -top-5 -right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full border border-black/[0.06] bg-white text-[#7C3AED] shadow-xl dark:border-white/15 dark:bg-zinc-900">
                <Box className="h-7 w-7 stroke-[1.5]" />
              </div>

              <div className="relative h-full w-full overflow-hidden rounded-[24px] bg-gradient-to-br from-[#4C1D95] via-[#7C3AED] to-[#EC4899]">
                <img
                  src={PEXELS.abstract3D_2}
                  alt="3D Prism Sculpture"
                  className="h-full w-full scale-105 object-cover opacity-95 transition-transform duration-700 hover:scale-115"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/65 via-transparent to-transparent p-5">
                  <span className="text-[11px] font-medium text-pink-200">Full-Stack Platform</span>
                  <p className="text-sm font-semibold text-white">Interactive 3D & Motion</p>
                </div>
              </div>
            </motion.div>

            {/* Right Tilted 3D Card */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotate: 0, x: 0 }}
              whileInView={{
                opacity: 1,
                y: hoveredCard === 2 ? 8 : 28,
                rotate: hoveredCard === 2 ? 9 : 14,
                x: hoveredCard !== null ? 215 : 190,
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHoveredCard(2)}
              onMouseLeave={() => setHoveredCard(null)}
              className="absolute z-10 h-[270px] w-[220px] cursor-pointer rounded-[28px] border border-white bg-white/80 p-2 shadow-[0_25px_60px_-15px_rgba(30,27,75,0.28)] backdrop-blur-xl sm:h-[345px] sm:w-[285px] dark:border-white/15 dark:bg-zinc-900/80"
            >
              <div className="absolute -right-4 -bottom-4 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-black/[0.06] bg-white text-[#7C3AED] shadow-xl dark:border-white/15 dark:bg-zinc-900">
                <Sparkles className="h-5 w-5 stroke-[1.75]" />
              </div>

              <div className="relative h-full w-full overflow-hidden rounded-[22px] bg-gradient-to-br from-[#0F172A] via-[#311042] to-[#6D28D9]">
                <img
                  src={PEXELS.abstract3D_3}
                  alt="3D Crystal Geometry"
                  className="h-full w-full scale-105 object-cover opacity-90 transition-transform duration-700 hover:scale-115"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/65 via-transparent to-transparent p-5">
                  <span className="text-[11px] font-medium text-indigo-200">Growth Engine</span>
                  <p className="text-sm font-semibold text-white">High-Converting Experiences</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};
