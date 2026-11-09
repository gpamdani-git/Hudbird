"use client";
import * as React from "react";
import { Card, CardBody, Grid, Text } from "@hudbird/ui";
import { motion, useReducedMotion } from "framer-motion";
import type { LandingSectionProps } from "@hudbird/schemas";
import { LandingFrame, LandingDemoNote, useLandingMotion } from "../LandingShared";

export const STARTUP_LOGOS = [
  { name: "Stripe", src: "/assets/logos/stripe.svg" },
  { name: "Linear", src: "/assets/logos/linear.svg" },
  { name: "Supabase", src: "/assets/logos/supabase.svg" },
  { name: "GitHub", src: "/assets/logos/github.svg" },
  { name: "Vercel", src: "/assets/logos/vercel.svg" },
  { name: "OpenAI", src: "/assets/logos/openai.svg" },
  { name: "Notion", src: "/assets/logos/notion.svg" },
  { name: "Figma", src: "/assets/logos/figma.svg" },
];

export function renderReferenceTitle(rawTitle: string) {
  if (!rawTitle) return null;

  // Custom formatting if title contains specific keywords or markdown italic
  if (rawTitle.includes("*")) {
    const parts = rawTitle.split(/(\*[^*]+\*)/g);
    return (
      <>
        {parts.map((part, i) => {
          if (part.startsWith("*") && part.endsWith("*")) {
            return (
              <span
                key={i}
                className="font-serif font-normal text-zinc-800 italic dark:text-zinc-200"
              >
                {part.slice(1, -1)}
              </span>
            );
          }
          return (
            <span key={i} className="text-zinc-500 dark:text-zinc-400">
              {part}
            </span>
          );
        })}
      </>
    );
  }

  // Exact reference from user image: "Shaping the future of investment intelligence"
  if (rawTitle.toLowerCase().includes("shaping the future")) {
    return (
      <>
        <span className="text-zinc-500 dark:text-zinc-400">Shaping the </span>
        <span className="font-serif font-normal text-zinc-900 italic dark:text-zinc-100">
          future
        </span>
        <span className="text-zinc-500 dark:text-zinc-400"> of investment intelligence</span>
      </>
    );
  }

  // Standard case: highlight middle or italic keyword if available, else clean editorial dual-grey
  const words = rawTitle.split(" ");
  if (words.length > 2) {
    const firstPart = words.slice(0, 2).join(" ");
    const midWord = words[2];
    const restPart = words.slice(3).join(" ");
    return (
      <>
        <span className="text-zinc-500 dark:text-zinc-400">{firstPart} </span>
        <span className="font-serif font-normal text-zinc-900 italic dark:text-zinc-100">
          {midWord}
        </span>
        {restPart && <span className="text-zinc-500 dark:text-zinc-400"> {restPart}</span>}
      </>
    );
  }

  return <span className="text-zinc-500 dark:text-zinc-400">{rawTitle}</span>;
}

interface LogoPillProps {
  name: string;
  src: string;
}

function LogoPill({ name, src }: LogoPillProps) {
  return (
    <div
      className="group relative flex h-12 items-center justify-center px-6 transition-all duration-300 select-none sm:px-8"
      aria-label={name}
    >
      <img
        src={src}
        alt={name}
        className="h-5 w-auto max-w-[100px] object-contain opacity-40 contrast-125 grayscale filter transition-all duration-300 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0 dark:opacity-40 dark:invert dark:group-hover:opacity-100"
      />
    </div>
  );
}

export function LandingLogoCloud({ variant, content }: LandingSectionProps<"logos">) {
  const { autoplay } = useLandingMotion();
  const reduce = useReducedMotion();
  const [isHovered, setIsHovered] = React.useState(false);

  // Map 8 logos
  const logoItems = STARTUP_LOGOS.map((item) => (
    <LogoPill key={item.name} name={item.name} src={item.src} />
  ));

  const isTickerActive = !reduce && autoplay && !isHovered;

  return (
    <LandingFrame id="logos" compact>
      {/* 1. Top: Tulisan kecil center dengan 2 macam font seperti hero dengan warna abu berbeda */}
      <div className="mb-8 flex flex-col items-center justify-center text-center sm:mb-10">
        <p className="text-xs font-medium tracking-tight sm:text-sm md:text-base">
          {renderReferenceTitle(content.title)}
        </p>
      </div>

      {/* 2. Bottom: 8 image logo monochrome kecil with Shopify-style continuous marquee */}
      <div
        className="relative mx-auto w-full max-w-6xl overflow-hidden py-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Soft edge gradients for clean infinite flow */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white via-white/80 to-transparent sm:w-24 dark:from-zinc-950 dark:via-zinc-950/80"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white via-white/80 to-transparent sm:w-24 dark:from-zinc-950 dark:via-zinc-950/80"
          aria-hidden="true"
        />

        {/* Looping animation smooth gaya shopify (kiri ke kanan / kanan ke kiri smooth loop) */}
        {variant === "intro-grid" ? (
          <Grid cols={2} gap="md">
            {STARTUP_LOGOS.map((item) => (
              <Card key={item.name} variant="bordered" radius="lg" className="hb-radius shadow-2xs">
                <CardBody className="flex items-center gap-3 p-4">
                  <img
                    src={item.src}
                    alt={item.name}
                    className="h-5 w-auto max-w-[80px] object-contain opacity-50 contrast-125 grayscale dark:invert"
                  />
                  <Text className="text-sm font-semibold">{item.name}</Text>
                </CardBody>
              </Card>
            ))}
          </Grid>
        ) : (
          <div className="flex w-max items-center">
            <motion.div
              className="flex shrink-0 items-center gap-6 sm:gap-10"
              animate={isTickerActive ? { x: ["-50%", "0%"] } : undefined}
              transition={{
                duration: 25,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              <div className="flex shrink-0 items-center gap-6 sm:gap-10">{logoItems}</div>
              <div className="flex shrink-0 items-center gap-6 sm:gap-10" aria-hidden="true">
                {logoItems}
              </div>
              <div className="flex shrink-0 items-center gap-6 sm:gap-10" aria-hidden="true">
                {logoItems}
              </div>
              <div className="flex shrink-0 items-center gap-6 sm:gap-10" aria-hidden="true">
                {logoItems}
              </div>
            </motion.div>
          </div>
        )}
      </div>

      <LandingDemoNote>
        Startup brand marks. Replace with approved customer or partner assets.
      </LandingDemoNote>
    </LandingFrame>
  );
}
