"use client";
import * as React from "react";
import type { BrandProfile } from "@hudbird/schemas";

export const HUDBIRD_SVG_MARK = (
  <svg viewBox="0 0 81 123" fill="currentColor" className="h-6 w-auto shrink-0" aria-hidden="true">
    <path d="M 11.5,0 A 11.5,11.5 0 0,1 23,11.5 L 23,44 C 25,38 36,35 48,35 C 64,35 80.5,45 80.5,65 L 80.5,111.5 A 11.25,11.25 0 0,1 58,111.5 L 58,65 C 58,57 50,53.5 40.5,53.5 C 31,53.5 23,58 23,67 L 23,111.5 A 11.5,11.5 0 0,1 0,111.5 L 0,11.5 A 11.5,11.5 0 0,1 11.5,0 Z" />
  </svg>
);

export interface NavbarBrandMarkProps {
  brand: BrandProfile;
  brandContent?: React.ReactNode;
  href?: string;
  tag?: string;
  className?: string;
}

export function NavbarBrandMark({
  brand,
  brandContent,
  href = "#landing-page",
  tag,
  className = "",
}: NavbarBrandMarkProps) {
  if (brandContent) {
    return (
      <a
        href={href}
        className={`flex items-center gap-2 transition-opacity hover:opacity-85 ${className}`}
      >
        {brandContent}
      </a>
    );
  }

  const displayName = brand.name === "Forma" ? "Hudbird UI" : brand.name;

  return (
    <a
      href={href}
      className={`group flex items-center gap-2.5 font-bold tracking-tight text-zinc-950 transition-all hover:opacity-90 dark:text-white ${className}`}
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white shadow-xs transition-transform group-hover:scale-105 dark:bg-white dark:text-zinc-950">
        {brand.logo?.src ? (
          <img
            src={brand.logo.src}
            alt={brand.logo.alt ?? displayName}
            width={20}
            height={20}
            className="h-5 w-5 object-contain"
          />
        ) : (
          HUDBIRD_SVG_MARK
        )}
      </div>

      <div className="flex items-center gap-1.5">
        <span className="text-foreground text-base font-bold tracking-tight">{displayName}</span>
        {tag && (
          <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-semibold tracking-wider text-zinc-600 uppercase dark:bg-white/10 dark:text-zinc-300">
            {tag}
          </span>
        )}
      </div>
    </a>
  );
}
