// starter-kits/pro-templates/src/components/nexus-sections/LogoMarquee.tsx
"use client";

import React from "react";
import { LogoMarqueeProps } from "@hudbird/schemas";
import { HairLine, Reveal } from "./ScrollReveal";

export const LogoMarquee: React.FC<{ data: LogoMarqueeProps }> = ({ data }) => {
  const duplicatedLogos = [...data.logos, ...data.logos, ...data.logos, ...data.logos];

  return (
    <section className="relative overflow-hidden py-8">
      <HairLine />

      <div className="py-8">
        {data.headline && (
          <div className="mb-6 text-center">
            <Reveal y={8}>
              <span className="text-nx-muted font-mono text-[11px] tracking-[0.22em] uppercase">
                [ {data.headline.toUpperCase()} ]
              </span>
            </Reveal>
          </div>
        )}

        {/* Marquee Track with Gradient Edge Fade */}
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <div className="flex w-max animate-[marquee_40s_linear_infinite] items-center gap-14 hover:[animation-play-state:paused] sm:gap-24">
            {duplicatedLogos.map((logo, idx) => (
              <div
                key={`${logo.name}-${idx}`}
                className="group flex cursor-pointer items-center gap-2 select-none"
              >
                <span className="text-nx-muted group-hover:text-nx-ink font-sans text-lg font-light tracking-tight transition-colors duration-300 sm:text-2xl">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <HairLine />
    </section>
  );
};
