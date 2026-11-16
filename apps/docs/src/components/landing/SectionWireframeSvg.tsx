"use client";
import * as React from "react";
import type { AboutSectionId, ContactSectionId, LegalSectionId } from "@hudbird/marketing";
import type { LandingSectionType } from "@hudbird/schemas";

export interface SectionWireframeSvgProps {
  type:
    | LandingSectionType
    | AboutSectionId
    | ContactSectionId
    | LegalSectionId
    | "pricing-compare"
    | "blog-index"
    | "blog-post"
    | "contact-page";
  variant?: string;
  className?: string;
}

export function SectionWireframeSvg({
  type,
  variant,
  className = "w-full h-auto text-zinc-400 dark:text-zinc-500",
}: SectionWireframeSvgProps) {
  if (type === "about") {
    return (
      <svg viewBox="0 0 160 56" fill="none" className={className}>
        <rect x="10" y="6" width="28" height="6" rx="3" fill="currentColor" opacity="0.28" />
        <rect x="10" y="15" width="96" height="5" rx="2" fill="currentColor" />
        <rect x="10" y="22" width="76" height="4" rx="2" fill="currentColor" opacity="0.8" />
        <rect x="120" y="23" width="30" height="4" rx="2" fill="currentColor" opacity="0.5" />
        <rect
          x="10"
          y="30"
          width="140"
          height="21"
          rx="4"
          fill="currentColor"
          fillOpacity="0.12"
          stroke="currentColor"
          strokeOpacity="0.25"
        />
        <circle cx="80" cy="40.5" r="5" fill="#ffffff" fillOpacity="0.7" />
        <path d="M78.5 38.2L82.5 40.5L78.5 42.8V38.2Z" fill="#18181b" />
      </svg>
    );
  }

  if (type === "who-are-we") {
    return (
      <svg viewBox="0 0 160 56" fill="none" className={className}>
        <rect x="10" y="6" width="30" height="6" rx="3" fill="currentColor" opacity="0.28" />
        <rect x="10" y="15" width="54" height="4.5" rx="2" fill="currentColor" />
        <rect x="10" y="22" width="44" height="4.5" rx="2" fill="currentColor" opacity="0.8" />
        <rect x="84" y="15" width="66" height="2.5" rx="1" fill="currentColor" opacity="0.5" />
        <rect x="84" y="20" width="60" height="2.5" rx="1" fill="currentColor" opacity="0.4" />
        <rect x="84" y="25" width="50" height="2.5" rx="1" fill="currentColor" opacity="0.35" />
        {[10, 46, 82, 118].map((x) => (
          <g key={x}>
            <rect x={x} y="35" width="24" height="5" rx="1.5" fill="currentColor" />
            <rect x={x} y="43" width="28" height="2.5" rx="1" fill="currentColor" opacity="0.45" />
          </g>
        ))}
      </svg>
    );
  }

  if (type === "our-team") {
    return (
      <svg viewBox="0 0 160 56" fill="none" className={className}>
        <rect x="10" y="8" width="46" height="6" rx="2" fill="currentColor" />
        <rect x="84" y="8" width="66" height="2.5" rx="1" fill="currentColor" opacity="0.5" />
        <rect x="84" y="13" width="56" height="2.5" rx="1" fill="currentColor" opacity="0.4" />
        <rect
          x="10"
          y="22"
          width="140"
          height="28"
          rx="5"
          fill="currentColor"
          fillOpacity="0.14"
          stroke="currentColor"
          strokeOpacity="0.25"
        />
        <circle cx="44" cy="34" r="4" fill="currentColor" opacity="0.35" />
        <circle cx="80" cy="31" r="4.5" fill="currentColor" opacity="0.45" />
        <circle cx="116" cy="34" r="4" fill="currentColor" opacity="0.35" />
      </svg>
    );
  }

  if (type === "meet-our-expert") {
    return (
      <svg viewBox="0 0 160 56" fill="none" className={className}>
        <rect x="10" y="5" width="32" height="5" rx="2.5" fill="currentColor" opacity="0.28" />
        <rect x="10" y="13" width="58" height="4.5" rx="2" fill="currentColor" />
        <rect x="84" y="13" width="66" height="2.5" rx="1" fill="currentColor" opacity="0.45" />
        {[10, 46, 82, 118].map((x) => (
          <g key={x}>
            <rect
              x={x}
              y="22"
              width="30"
              height="24"
              rx="4"
              fill="currentColor"
              fillOpacity="0.14"
              stroke="currentColor"
              strokeOpacity="0.22"
            />
            <rect
              x={x + 4}
              y="48"
              width="22"
              height="2.5"
              rx="1"
              fill="currentColor"
              opacity="0.7"
            />
          </g>
        ))}
      </svg>
    );
  }

  if (type === "values") {
    return (
      <svg viewBox="0 0 160 56" fill="none" className={className}>
        <rect
          x="10"
          y="6"
          width="52"
          height="30"
          rx="4"
          fill="currentColor"
          fillOpacity="0.16"
          stroke="currentColor"
          strokeOpacity="0.25"
        />
        <rect x="68" y="6" width="22" height="3" rx="1" fill="currentColor" opacity="0.4" />
        <rect x="68" y="11" width="66" height="4.5" rx="1.5" fill="currentColor" />
        <rect
          x="68"
          y="19"
          width="38"
          height="17"
          rx="3.5"
          fill="currentColor"
          fillOpacity="0.12"
        />
        <rect
          x="111"
          y="19"
          width="39"
          height="17"
          rx="3.5"
          fill="currentColor"
          fillOpacity="0.12"
        />
        <rect x="10" y="40" width="56" height="11" rx="3" fill="currentColor" fillOpacity="0.14" />
        <rect x="70" y="40" width="80" height="11" rx="3" fill="currentColor" fillOpacity="0.14" />
      </svg>
    );
  }

  if (type === "editorial-cta" || (type === "cta" && variant === "editorial-showcase")) {
    return (
      <svg viewBox="0 0 160 52" fill="none" className={className}>
        <rect x="10" y="6" width="64" height="5" rx="2" fill="currentColor" />
        <rect x="10" y="13" width="48" height="4" rx="1.5" fill="currentColor" opacity="0.8" />
        <rect x="10" y="21" width="28" height="7" rx="2.5" fill="currentColor" />
        <circle
          cx="46"
          cy="24.5"
          r="3.5"
          stroke="currentColor"
          strokeOpacity="0.5"
          strokeWidth="1"
        />
        <rect x="53" y="23" width="22" height="3" rx="1" fill="currentColor" opacity="0.45" />
        <rect
          x="100"
          y="6"
          width="48"
          height="28"
          rx="5"
          fill="currentColor"
          fillOpacity="0.14"
          stroke="currentColor"
          strokeOpacity="0.25"
        />
        <rect x="14" y="40" width="132" height="7" rx="2" fill="currentColor" opacity="0.9" />
      </svg>
    );
  }

  // 1. NAVBAR PRESETS
  if (type === "navbar") {
    switch (variant) {
      case "nav-13":
      case "modern-mini":
        return (
          <svg viewBox="0 0 160 36" fill="none" className={className}>
            {/* Left Logo */}
            <rect x="8" y="12" width="12" height="12" rx="3" fill="currentColor" />
            <circle cx="14" cy="18" r="2" fill="#18181b" />
            {/* Center Capsule */}
            <rect
              x="52"
              y="9"
              width="56"
              height="18"
              rx="9"
              fill="#18181b"
              stroke="currentColor"
              strokeWidth="1"
              strokeOpacity="0.3"
            />
            {/* Menu icon lines */}
            <line
              x1="59"
              y1="16"
              x2="65"
              y2="16"
              stroke="white"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <line
              x1="59"
              y1="20"
              x2="65"
              y2="20"
              stroke="white"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <circle cx="78" cy="18" r="3" fill="white" fillOpacity="0.3" />
            <rect x="87" y="14" width="15" height="8" rx="4" fill="white" fillOpacity="0.25" />
            {/* Right User circle & CTA pill */}
            <circle
              cx="122"
              cy="18"
              r="5"
              stroke="currentColor"
              strokeWidth="1"
              strokeOpacity="0.4"
            />
            <rect x="132" y="13" width="20" height="10" rx="5" fill="#3b82f6" />
          </svg>
        );

      case "nav-02": // SaaS Floating Pill
      case "centered":
        return (
          <svg viewBox="0 0 160 36" fill="none" className={className}>
            <rect
              x="20"
              y="8"
              width="120"
              height="20"
              rx="10"
              stroke="#3b82f6"
              strokeWidth="1.2"
              strokeOpacity="0.5"
              fill="currentColor"
              fillOpacity="0.06"
            />
            <circle cx="32" cy="18" r="3" fill="currentColor" />
            <rect x="39" y="16.5" width="14" height="3" rx="1.5" fill="currentColor" />
            <rect x="66" y="16.5" width="9" height="3" rx="1.5" fill="currentColor" opacity="0.6" />
            <rect x="79" y="16.5" width="9" height="3" rx="1.5" fill="currentColor" opacity="0.6" />
            <rect x="92" y="16.5" width="9" height="3" rx="1.5" fill="currentColor" opacity="0.6" />
            <rect x="110" y="13" width="22" height="10" rx="5" fill="#3b82f6" />
          </svg>
        );

      case "nav-04": // Startup Launch - Symmetrical Split (Center Brand)
      case "nav-07": // Portfolio Split
      case "nav-10": // Luxury Hospitality Split
        return (
          <svg viewBox="0 0 160 36" fill="none" className={className}>
            <rect
              x="6"
              y="8"
              width="148"
              height="20"
              rx="4"
              className="stroke-current"
              strokeWidth="1"
              fill="currentColor"
              fillOpacity="0.04"
            />
            {/* Left Split Links */}
            <rect
              x="14"
              y="16.5"
              width="14"
              height="3"
              rx="1.5"
              fill="currentColor"
              opacity="0.7"
            />
            <rect
              x="32"
              y="16.5"
              width="14"
              height="3"
              rx="1.5"
              fill="currentColor"
              opacity="0.7"
            />
            {/* Center Logo */}
            <circle cx="80" cy="18" r="3.5" fill="currentColor" />
            <rect x="73" y="23" width="14" height="2" rx="1" fill="currentColor" opacity="0.5" />
            {/* Right Split Links & CTA */}
            <rect
              x="104"
              y="16.5"
              width="14"
              height="3"
              rx="1.5"
              fill="currentColor"
              opacity="0.7"
            />
            <rect x="124" y="13" width="22" height="10" rx="3" fill="#3b82f6" />
          </svg>
        );

      case "nav-06": // Creative Studio (Asymmetric - CTA on LEFT, Logo on RIGHT)
      case "nav-12": // Professional Services (Corporate - CTA on LEFT, Wordmark on RIGHT)
        return (
          <svg viewBox="0 0 160 36" fill="none" className={className}>
            <rect
              x="6"
              y="8"
              width="148"
              height="20"
              rx="4"
              className="stroke-current"
              strokeWidth="1"
              fill="currentColor"
              fillOpacity="0.04"
            />
            {/* Left Action CTA */}
            <rect x="14" y="13" width="24" height="10" rx="3" fill="#3b82f6" />
            {/* Left Links */}
            <rect
              x="44"
              y="16.5"
              width="12"
              height="3"
              rx="1.5"
              fill="currentColor"
              opacity="0.7"
            />
            <rect
              x="60"
              y="16.5"
              width="12"
              height="3"
              rx="1.5"
              fill="currentColor"
              opacity="0.7"
            />
            {/* Right Studio Logo */}
            <circle cx="126" cy="18" r="3" fill="currentColor" />
            <rect x="133" y="16.5" width="15" height="3" rx="1.5" fill="currentColor" />
          </svg>
        );

      case "nav-05": // Creative Agency (Menu Trigger on Right)
      case "sidebar-1":
      case "sidebar-2":
        return (
          <svg viewBox="0 0 160 36" fill="none" className={className}>
            <rect
              x="6"
              y="8"
              width="148"
              height="20"
              rx="4"
              className="stroke-current"
              strokeWidth="1"
              fill="currentColor"
              fillOpacity="0.04"
            />
            {/* Left Brand */}
            <circle cx="18" cy="18" r="3.5" fill="currentColor" />
            <rect x="25" y="16" width="22" height="4" rx="2" fill="currentColor" />
            {/* Right Bold Menu Pill Trigger */}
            <rect
              x="114"
              y="12"
              width="32"
              height="12"
              rx="4"
              stroke="currentColor"
              strokeWidth="1"
              fill="currentColor"
              fillOpacity="0.08"
            />
            <rect x="120" y="16" width="14" height="3" rx="1" fill="currentColor" />
            <circle cx="139" cy="17.5" r="2" fill="#10b981" />
          </svg>
        );

      case "nav-09": // Corporate Enterprise (Two-Row)
        return (
          <svg viewBox="0 0 160 40" fill="none" className={className}>
            {/* Top Utility Row */}
            <rect
              x="6"
              y="4"
              width="148"
              height="10"
              rx="2"
              fill="currentColor"
              fillOpacity="0.04"
            />
            <rect x="96" y="7" width="14" height="3" rx="1" fill="currentColor" opacity="0.4" />
            <rect x="114" y="7" width="14" height="3" rx="1" fill="currentColor" opacity="0.4" />
            <rect x="132" y="6" width="16" height="5" rx="1.5" fill="#3b82f6" />
            {/* Main Navbar Row */}
            <rect
              x="6"
              y="17"
              width="148"
              height="18"
              rx="3"
              className="stroke-current"
              strokeWidth="1"
              fill="currentColor"
              fillOpacity="0.08"
            />
            <circle cx="16" cy="26" r="3" fill="currentColor" />
            <rect x="23" y="24.5" width="16" height="3" rx="1.5" fill="currentColor" />
            <rect x="60" y="24.5" width="12" height="3" rx="1" fill="currentColor" opacity="0.6" />
            <rect x="76" y="24.5" width="12" height="3" rx="1" fill="currentColor" opacity="0.6" />
            <rect x="124" y="21" width="22" height="10" rx="2.5" fill="#3b82f6" />
          </svg>
        );

      case "nav-03": // SaaS Platform (Mega Menu)
      case "mega":
        return (
          <svg viewBox="0 0 160 36" fill="none" className={className}>
            <rect
              x="6"
              y="8"
              width="148"
              height="20"
              rx="4"
              className="stroke-current"
              strokeWidth="1"
              fill="currentColor"
              fillOpacity="0.04"
            />
            <circle cx="18" cy="18" r="3" fill="currentColor" />
            <rect x="25" y="16.5" width="18" height="3" rx="1.5" fill="currentColor" />
            {/* Platform Dropdown Pill */}
            <rect
              x="58"
              y="13"
              width="28"
              height="10"
              rx="3"
              fill="currentColor"
              fillOpacity="0.12"
            />
            <rect x="63" y="16.5" width="14" height="3" rx="1" fill="currentColor" />
            <polygon points="80,16 83,20 86,16" fill="currentColor" opacity="0.7" />
            <rect
              x="94"
              y="16.5"
              width="10"
              height="3"
              rx="1.5"
              fill="currentColor"
              opacity="0.6"
            />
            <rect x="124" y="13" width="22" height="10" rx="3" fill="#3b82f6" />
          </svg>
        );

      default: // nav-01 (SaaS Classic), nav-08 (Corporate), nav-11 (Restaurant), simple
        return (
          <svg viewBox="0 0 160 36" fill="none" className={className}>
            <rect
              x="6"
              y="8"
              width="148"
              height="20"
              rx="4"
              className="stroke-current"
              strokeWidth="1"
              fill="currentColor"
              fillOpacity="0.04"
            />
            <circle cx="18" cy="18" r="3" fill="currentColor" />
            <rect x="25" y="16.5" width="20" height="3" rx="1.5" fill="currentColor" />
            <rect
              x="62"
              y="16.5"
              width="10"
              height="3"
              rx="1.5"
              fill="currentColor"
              opacity="0.6"
            />
            <rect
              x="76"
              y="16.5"
              width="10"
              height="3"
              rx="1.5"
              fill="currentColor"
              opacity="0.6"
            />
            <rect
              x="90"
              y="16.5"
              width="10"
              height="3"
              rx="1.5"
              fill="currentColor"
              opacity="0.6"
            />
            <rect x="124" y="13" width="22" height="10" rx="3" fill="#3b82f6" />
          </svg>
        );
    }
  }

  // 2. HERO PRESETS
  if (type === "hero") {
    switch (variant) {
      case "split-product":
      case "split":
        return (
          <svg viewBox="0 0 160 56" fill="none" className={className}>
            {/* Left Copy */}
            <rect x="12" y="12" width="56" height="6" rx="2" fill="currentColor" />
            <rect x="12" y="21" width="48" height="4" rx="2" fill="currentColor" opacity="0.6" />
            <rect x="12" y="28" width="40" height="4" rx="2" fill="currentColor" opacity="0.6" />
            <rect x="12" y="36" width="24" height="9" rx="3" fill="#3b82f6" />
            {/* Right Visual Card */}
            <rect
              x="80"
              y="10"
              width="68"
              height="38"
              rx="5"
              className="stroke-current"
              strokeWidth="1"
              fill="currentColor"
              fillOpacity="0.06"
            />
            <circle cx="96" cy="24" r="6" fill="#3b82f6" opacity="0.4" />
            <rect x="108" y="20" width="30" height="4" rx="2" fill="currentColor" opacity="0.5" />
            <rect x="108" y="27" width="22" height="3" rx="1.5" fill="currentColor" opacity="0.3" />
          </svg>
        );

      case "interactive":
        return (
          <svg viewBox="0 0 160 56" fill="none" className={className}>
            {/* Centered Top Title */}
            <rect x="48" y="6" width="64" height="5" rx="2" fill="currentColor" />
            {/* Tabs Pill Bar */}
            <rect
              x="36"
              y="14"
              width="88"
              height="10"
              rx="5"
              fill="currentColor"
              fillOpacity="0.06"
            />
            <rect x="40" y="16" width="26" height="6" rx="3" fill="#3b82f6" />
            <rect
              x="70"
              y="17.5"
              width="22"
              height="3"
              rx="1.5"
              fill="currentColor"
              opacity="0.5"
            />
            <rect
              x="96"
              y="17.5"
              width="22"
              height="3"
              rx="1.5"
              fill="currentColor"
              opacity="0.5"
            />
            {/* Interactive Demo Window */}
            <rect
              x="24"
              y="28"
              width="112"
              height="24"
              rx="4"
              className="stroke-current"
              strokeWidth="1"
              fill="currentColor"
              fillOpacity="0.04"
            />
          </svg>
        );

      case "slideshow":
        return (
          <svg viewBox="0 0 160 56" fill="none" className={className}>
            <rect
              x="16"
              y="8"
              width="128"
              height="40"
              rx="6"
              className="stroke-current"
              strokeWidth="1"
              fill="currentColor"
              fillOpacity="0.06"
            />
            {/* Navigation Arrows */}
            <polygon points="26,28 32,24 32,32" fill="currentColor" opacity="0.7" />
            <polygon points="134,28 128,24 128,32" fill="currentColor" opacity="0.7" />
            {/* Pagination Dots */}
            <circle cx="74" cy="42" r="2" fill="#3b82f6" />
            <circle cx="80" cy="42" r="1.5" fill="currentColor" opacity="0.4" />
            <circle cx="86" cy="42" r="1.5" fill="currentColor" opacity="0.4" />
          </svg>
        );

      case "video":
        return (
          <svg viewBox="0 0 160 56" fill="none" className={className}>
            <rect
              x="16"
              y="8"
              width="128"
              height="40"
              rx="6"
              className="stroke-current"
              strokeWidth="1"
              fill="currentColor"
              fillOpacity="0.06"
            />
            {/* Play Button Circle */}
            <circle cx="80" cy="28" r="9" fill="#3b82f6" />
            <polygon points="78,24 85,28 78,32" fill="#ffffff" />
          </svg>
        );

      case "center-canvas":
      case "center-video":
        return (
          <svg viewBox="0 0 160 56" fill="none" className={className}>
            {/* Centered Top Title & CTA */}
            <rect x="46" y="5" width="68" height="5" rx="2" fill="currentColor" />
            <rect x="68" y="13" width="24" height="6" rx="2.5" fill="#3b82f6" />
            {/* Wide 16:9 Video Canvas Chassis */}
            <rect
              x="20"
              y="22"
              width="120"
              height="30"
              rx="4"
              className="stroke-current"
              strokeWidth="1"
              strokeOpacity="0.4"
              fill="currentColor"
              fillOpacity="0.08"
            />
            {/* Centered Play Button */}
            <circle cx="80" cy="37" r="5" fill="#3b82f6" />
            <polygon points="78.5,34.5 83,37 78.5,39.5" fill="#ffffff" />
          </svg>
        );

      case "editorial-photo":
        return (
          <svg viewBox="0 0 160 56" fill="none" className={className}>
            {/* Full photo background frame */}
            <rect
              x="14"
              y="6"
              width="132"
              height="44"
              rx="4"
              className="stroke-current"
              strokeWidth="1"
              fill="currentColor"
              fillOpacity="0.08"
            />
            {/* Bottom-left floating solid copy panel */}
            <rect
              x="20"
              y="20"
              width="62"
              height="26"
              rx="3"
              fill="currentColor"
              fillOpacity="0.9"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            {/* Inner panel title, text, cta */}
            <rect x="24" y="24" width="40" height="3.5" rx="1" fill="#3b82f6" />
            <rect x="24" y="30" width="50" height="2.5" rx="1" fill="white" opacity="0.8" />
            <rect x="24" y="36" width="20" height="5" rx="1.5" fill="#3b82f6" />
          </svg>
        );

      case "remit-grid":
      case "fintech-remit":
        return (
          <svg viewBox="0 0 160 56" fill="none" className={className}>
            {/* Top Left: Badge, Headline & CTA */}
            <rect
              x="14"
              y="8"
              width="22"
              height="3"
              rx="1.5"
              stroke="currentColor"
              strokeWidth="0.6"
              strokeOpacity="0.4"
              fill="currentColor"
              fillOpacity="0.1"
            />
            <rect x="14" y="13" width="48" height="4" rx="1" fill="currentColor" />
            <rect x="14" y="19" width="38" height="4" rx="1" fill="var(--primary, #84cc16)" />
            <rect x="14" y="26" width="18" height="5" rx="2" fill="var(--primary, #84cc16)" />
            <rect
              x="35"
              y="26"
              width="16"
              height="5"
              rx="2"
              stroke="currentColor"
              strokeWidth="0.6"
              strokeOpacity="0.3"
              fill="none"
            />

            {/* Top Right: Dashboard Card with bar chart */}
            <rect
              x="80"
              y="8"
              width="66"
              height="23"
              rx="3"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeOpacity="0.25"
              fill="currentColor"
              fillOpacity="0.05"
            />
            <rect
              x="86"
              y="11"
              width="20"
              height="2"
              rx="0.5"
              fill="currentColor"
              fillOpacity="0.4"
            />
            <rect x="86" y="15" width="18" height="4" rx="0.5" fill="currentColor" />
            {/* Micro bars */}
            <rect
              x="110"
              y="18"
              width="3"
              height="7"
              rx="0.5"
              fill="currentColor"
              fillOpacity="0.2"
            />
            <rect
              x="115"
              y="15"
              width="3"
              height="10"
              rx="0.5"
              fill="currentColor"
              fillOpacity="0.2"
            />
            <rect
              x="120"
              y="12"
              width="3"
              height="13"
              rx="0.5"
              fill="currentColor"
              fillOpacity="0.2"
            />
            <rect x="125" y="9" width="3.5" height="16" rx="0.5" fill="var(--primary, #84cc16)" />

            {/* Floating overlapping accent badge */}
            <rect x="118" y="21" width="30" height="13" rx="2.5" fill="var(--primary, #84cc16)" />
            <rect
              x="122"
              y="23.5"
              width="12"
              height="2"
              rx="0.5"
              fill="currentColor"
              fillOpacity="0.7"
            />
            <rect x="122" y="27" width="22" height="2.5" rx="0.5" fill="currentColor" />

            {/* Bottom: 3 metric stats cards */}
            <rect
              x="14"
              y="37"
              width="41"
              height="13"
              rx="2"
              stroke="currentColor"
              strokeWidth="0.6"
              strokeOpacity="0.25"
              fill="currentColor"
              fillOpacity="0.05"
            />
            <rect x="18" y="40" width="14" height="3" rx="0.5" fill="var(--primary, #84cc16)" />
            <rect
              x="18"
              y="45"
              width="26"
              height="2"
              rx="0.5"
              fill="currentColor"
              fillOpacity="0.4"
            />

            <rect
              x="59.5"
              y="37"
              width="41"
              height="13"
              rx="2"
              stroke="currentColor"
              strokeWidth="0.6"
              strokeOpacity="0.25"
              fill="currentColor"
              fillOpacity="0.05"
            />
            <rect x="63.5" y="40" width="14" height="3" rx="0.5" fill="var(--primary, #84cc16)" />
            <rect
              x="63.5"
              y="45"
              width="26"
              height="2"
              rx="0.5"
              fill="currentColor"
              fillOpacity="0.4"
            />

            <rect
              x="105"
              y="37"
              width="41"
              height="13"
              rx="2"
              stroke="currentColor"
              strokeWidth="0.6"
              strokeOpacity="0.25"
              fill="currentColor"
              fillOpacity="0.05"
            />
            <rect x="109" y="40" width="14" height="3" rx="0.5" fill="var(--primary, #84cc16)" />
            <rect
              x="109"
              y="45"
              width="26"
              height="2"
              rx="0.5"
              fill="currentColor"
              fillOpacity="0.4"
            />
          </svg>
        );

      default: // centered (Matches Card 2 in reference image)
        return (
          <svg viewBox="0 0 160 56" fill="none" className={className}>
            <rect x="42" y="8" width="76" height="7" rx="3" fill="currentColor" />
            <rect x="28" y="19" width="104" height="4" rx="2" fill="currentColor" opacity="0.6" />
            <rect x="48" y="27" width="64" height="4" rx="2" fill="currentColor" opacity="0.6" />
            <rect x="66" y="36" width="28" height="9" rx="3" fill="#3b82f6" />
          </svg>
        );
    }
  }

  // 3. LOGOS PRESETS
  if (type === "logos") {
    switch (variant) {
      case "intro-grid":
        return (
          <svg viewBox="0 0 160 36" fill="none" className={className}>
            <rect x="12" y="12" width="36" height="4" rx="2" fill="currentColor" />
            <rect x="12" y="19" width="28" height="3" rx="1.5" fill="currentColor" opacity="0.5" />
            {/* 2x2 Logo Grid */}
            <circle cx="80" cy="14" r="5" className="stroke-current" strokeWidth="1" />
            <rect
              x="100"
              y="9"
              width="14"
              height="10"
              rx="2"
              className="stroke-current"
              strokeWidth="1"
            />
            <polygon points="77,29 83,21 89,29" className="stroke-current" strokeWidth="1" />
            <rect
              x="100"
              y="22"
              width="14"
              height="8"
              rx="4"
              className="stroke-current"
              strokeWidth="1"
            />
          </svg>
        );

      case "ticker":
        return (
          <svg viewBox="0 0 160 36" fill="none" className={className}>
            <circle cx="20" cy="18" r="6" className="stroke-current" strokeWidth="1" />
            <rect
              x="44"
              y="13"
              width="16"
              height="10"
              rx="2"
              className="stroke-current"
              strokeWidth="1"
            />
            <polygon points="80,12 87,24 73,24" className="stroke-current" strokeWidth="1" />
            <rect
              x="104"
              y="13"
              width="18"
              height="10"
              rx="5"
              className="stroke-current"
              strokeWidth="1"
            />
            <circle cx="142" cy="18" r="6" className="stroke-current" strokeWidth="1" />
          </svg>
        );

      default: // row (Matches Card 3 in reference image)
        return (
          <svg viewBox="0 0 160 36" fill="none" className={className}>
            <circle cx="32" cy="18" r="7" className="stroke-current" strokeWidth="1" />
            <rect
              x="58"
              y="13"
              width="18"
              height="10"
              rx="2"
              className="stroke-current"
              strokeWidth="1"
            />
            <polygon points="98,11 106,25 90,25" className="stroke-current" strokeWidth="1" />
            <rect
              x="122"
              y="13"
              width="20"
              height="10"
              rx="5"
              className="stroke-current"
              strokeWidth="1"
            />
          </svg>
        );
    }
  }

  // 4. BENEFITS PRESETS
  if (type === "benefits") {
    switch (variant) {
      case "columns":
        return (
          <svg viewBox="0 0 160 46" fill="none" className={className}>
            {/* 3 Open Typographic Columns */}
            <rect x="14" y="10" width="36" height="5" rx="2" fill="currentColor" />
            <rect x="14" y="19" width="32" height="3" rx="1.5" fill="currentColor" opacity="0.6" />
            <rect x="14" y="25" width="28" height="3" rx="1.5" fill="currentColor" opacity="0.6" />

            <rect x="62" y="10" width="36" height="5" rx="2" fill="currentColor" />
            <rect x="62" y="19" width="32" height="3" rx="1.5" fill="currentColor" opacity="0.6" />
            <rect x="62" y="25" width="28" height="3" rx="1.5" fill="currentColor" opacity="0.6" />

            <rect x="110" y="10" width="36" height="5" rx="2" fill="currentColor" />
            <rect x="110" y="19" width="32" height="3" rx="1.5" fill="currentColor" opacity="0.6" />
            <rect x="110" y="25" width="28" height="3" rx="1.5" fill="currentColor" opacity="0.6" />
          </svg>
        );

      case "visual-list":
        return (
          <svg viewBox="0 0 160 46" fill="none" className={className}>
            {/* Left Product Visual */}
            <rect
              x="12"
              y="8"
              width="60"
              height="30"
              rx="4"
              className="stroke-current"
              strokeWidth="1"
              fill="currentColor"
              fillOpacity="0.05"
            />
            {/* Right Checklist */}
            <circle cx="86" cy="14" r="3" fill="#3b82f6" />
            <rect
              x="94"
              y="12.5"
              width="50"
              height="3"
              rx="1.5"
              fill="currentColor"
              opacity="0.7"
            />
            <circle cx="86" cy="23" r="3" fill="#3b82f6" />
            <rect
              x="94"
              y="21.5"
              width="44"
              height="3"
              rx="1.5"
              fill="currentColor"
              opacity="0.7"
            />
            <circle cx="86" cy="32" r="3" fill="#3b82f6" />
            <rect
              x="94"
              y="30.5"
              width="48"
              height="3"
              rx="1.5"
              fill="currentColor"
              opacity="0.7"
            />
          </svg>
        );

      default: // cards (Matches Card 4 in reference image)
        return (
          <svg viewBox="0 0 160 46" fill="none" className={className}>
            {/* Card 1 */}
            <rect
              x="12"
              y="8"
              width="40"
              height="30"
              rx="5"
              className="stroke-current"
              strokeWidth="1"
              fill="currentColor"
              fillOpacity="0.04"
            />
            <rect x="18" y="14" width="18" height="4" rx="2" fill="currentColor" />
            <rect x="18" y="22" width="28" height="3" rx="1.5" fill="currentColor" opacity="0.6" />
            {/* Card 2 */}
            <rect
              x="60"
              y="8"
              width="40"
              height="30"
              rx="5"
              className="stroke-current"
              strokeWidth="1"
              fill="currentColor"
              fillOpacity="0.04"
            />
            <rect x="66" y="14" width="18" height="4" rx="2" fill="currentColor" />
            <rect x="66" y="22" width="28" height="3" rx="1.5" fill="currentColor" opacity="0.6" />
            {/* Card 3 */}
            <rect
              x="108"
              y="8"
              width="40"
              height="30"
              rx="5"
              className="stroke-current"
              strokeWidth="1"
              fill="currentColor"
              fillOpacity="0.04"
            />
            <rect x="114" y="14" width="18" height="4" rx="2" fill="currentColor" />
            <rect x="114" y="22" width="28" height="3" rx="1.5" fill="currentColor" opacity="0.6" />
          </svg>
        );
    }
  }

  // 5. FEATURES PRESETS
  if (type === "features") {
    switch (variant) {
      case "accordion":
        return (
          <svg viewBox="0 0 160 46" fill="none" className={className}>
            {/* Left Accordion Stack */}
            <rect x="12" y="8" width="50" height="9" rx="2" fill="#3b82f6" />
            <rect
              x="12"
              y="19"
              width="50"
              height="8"
              rx="2"
              fill="currentColor"
              fillOpacity="0.08"
            />
            <rect
              x="12"
              y="29"
              width="50"
              height="8"
              rx="2"
              fill="currentColor"
              fillOpacity="0.08"
            />
            {/* Right Preview Window */}
            <rect
              x="70"
              y="8"
              width="78"
              height="30"
              rx="4"
              className="stroke-current"
              strokeWidth="1"
              fill="currentColor"
              fillOpacity="0.05"
            />
          </svg>
        );

      case "split":
        return (
          <svg viewBox="0 0 160 46" fill="none" className={className}>
            <rect
              x="12"
              y="8"
              width="58"
              height="13"
              rx="3"
              className="stroke-current"
              strokeWidth="1"
              fill="currentColor"
              fillOpacity="0.04"
            />
            <rect x="78" y="11" width="68" height="5" rx="2" fill="currentColor" />
            <rect x="78" y="19" width="48" height="3" rx="1.5" fill="currentColor" opacity="0.6" />

            <rect x="12" y="26" width="68" height="5" rx="2" fill="currentColor" />
            <rect x="12" y="34" width="48" height="3" rx="1.5" fill="currentColor" opacity="0.6" />
            <rect
              x="88"
              y="24"
              width="58"
              height="13"
              rx="3"
              className="stroke-current"
              strokeWidth="1"
              fill="currentColor"
              fillOpacity="0.04"
            />
          </svg>
        );

      default: // tabs (Matches Card 5 in reference image)
        return (
          <svg viewBox="0 0 160 46" fill="none" className={className}>
            <rect
              x="12"
              y="8"
              width="40"
              height="30"
              rx="5"
              className="stroke-current"
              strokeWidth="1"
              fill="currentColor"
              fillOpacity="0.04"
            />
            <rect x="18" y="14" width="18" height="4" rx="2" fill="currentColor" />
            <rect x="18" y="22" width="28" height="3" rx="1.5" fill="currentColor" opacity="0.6" />

            <rect
              x="60"
              y="8"
              width="40"
              height="30"
              rx="5"
              className="stroke-current"
              strokeWidth="1"
              fill="currentColor"
              fillOpacity="0.04"
            />
            <rect x="66" y="14" width="18" height="4" rx="2" fill="currentColor" />
            <rect x="66" y="22" width="28" height="3" rx="1.5" fill="currentColor" opacity="0.6" />

            <rect
              x="108"
              y="8"
              width="40"
              height="30"
              rx="5"
              className="stroke-current"
              strokeWidth="1"
              fill="currentColor"
              fillOpacity="0.04"
            />
            <rect x="114" y="14" width="18" height="4" rx="2" fill="currentColor" />
            <rect x="114" y="22" width="28" height="3" rx="1.5" fill="currentColor" opacity="0.6" />
          </svg>
        );
    }
  }

  // 6. HOW IT WORKS
  if (type === "how-it-works") {
    return (
      <svg viewBox="0 0 160 40" fill="none" className={className}>
        <circle cx="30" cy="20" r="7" fill="#3b82f6" />
        <text x="30" y="23" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">
          1
        </text>
        <line
          x1="42"
          y1="20"
          x2="68"
          y2="20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="2 2"
          opacity="0.4"
        />

        <circle cx="80" cy="20" r="7" fill="#3b82f6" />
        <text x="80" y="23" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">
          2
        </text>
        <line
          x1="92"
          y1="20"
          x2="118"
          y2="20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="2 2"
          opacity="0.4"
        />

        <circle cx="130" cy="20" r="7" fill="#3b82f6" />
        <text x="130" y="23" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">
          3
        </text>
      </svg>
    );
  }

  // 7. INTEGRATIONS
  if (type === "integrations") {
    return (
      <svg viewBox="0 0 160 42" fill="none" className={className}>
        <rect
          x="22"
          y="8"
          width="24"
          height="24"
          rx="5"
          className="stroke-current"
          strokeWidth="1"
          fill="currentColor"
          fillOpacity="0.05"
        />
        <circle cx="34" cy="20" r="4" fill="#3b82f6" />

        <rect
          x="54"
          y="8"
          width="24"
          height="24"
          rx="5"
          className="stroke-current"
          strokeWidth="1"
          fill="currentColor"
          fillOpacity="0.05"
        />
        <rect x="62" y="16" width="8" height="8" rx="2" fill="#10b981" />

        <rect
          x="86"
          y="8"
          width="24"
          height="24"
          rx="5"
          className="stroke-current"
          strokeWidth="1"
          fill="currentColor"
          fillOpacity="0.05"
        />
        <polygon points="98,15 103,23 93,23" fill="#8b5cf6" />

        <rect
          x="118"
          y="8"
          width="24"
          height="24"
          rx="5"
          className="stroke-current"
          strokeWidth="1"
          fill="currentColor"
          fillOpacity="0.05"
        />
        <circle cx="130" cy="20" r="4" fill="#f59e0b" />
      </svg>
    );
  }

  // 8. TESTIMONIALS
  if (type === "testimonials") {
    return (
      <svg viewBox="0 0 160 42" fill="none" className={className}>
        <rect
          x="14"
          y="6"
          width="132"
          height="30"
          rx="5"
          className="stroke-current"
          strokeWidth="1"
          fill="currentColor"
          fillOpacity="0.04"
        />
        <circle cx="28" cy="21" r="6" fill="#3b82f6" opacity="0.6" />
        <rect x="42" y="15" width="72" height="4" rx="2" fill="currentColor" />
        <rect x="42" y="23" width="48" height="3" rx="1.5" fill="currentColor" opacity="0.6" />
      </svg>
    );
  }

  if (type === "blog-index") {
    return (
      <svg viewBox="0 0 160 52" fill="none" className={className}>
        <rect x="14" y="6" width="52" height="5" rx="2.5" fill="currentColor" opacity="0.65" />
        <rect x="14" y="14" width="22" height="3" rx="1.5" fill="#3b82f6" />
        <rect x="40" y="14" width="20" height="3" rx="1.5" fill="currentColor" opacity="0.25" />
        <rect x="14" y="21" width="60" height="24" rx="4" fill="currentColor" opacity="0.14" />
        <rect x="80" y="21" width="66" height="5" rx="2" fill="currentColor" opacity="0.55" />
        <rect x="80" y="29" width="52" height="3" rx="1.5" fill="currentColor" opacity="0.3" />
        <rect x="80" y="35" width="44" height="3" rx="1.5" fill="currentColor" opacity="0.25" />
      </svg>
    );
  }

  if (type === "blog-post") {
    return (
      <svg viewBox="0 0 160 52" fill="none" className={className}>
        <rect x="18" y="6" width="76" height="5" rx="2.5" fill="currentColor" opacity="0.65" />
        <rect x="18" y="14" width="124" height="16" rx="4" fill="currentColor" opacity="0.16" />
        <rect x="42" y="34" width="2" height="12" rx="1" fill="#3b82f6" />
        <rect x="48" y="35" width="84" height="3" rx="1.5" fill="currentColor" opacity="0.4" />
        <rect x="48" y="41" width="66" height="3" rx="1.5" fill="currentColor" opacity="0.25" />
      </svg>
    );
  }
  if (type === "contact-mail") {
    return (
      <svg viewBox="0 0 160 52" fill="none" className={className}>
        <rect x="12" y="7" width="66" height="5" rx="2.5" fill="currentColor" opacity="0.65" />
        <rect x="12" y="15" width="76" height="3" rx="1.5" fill="currentColor" opacity="0.3" />
        <rect x="12" y="20" width="56" height="3" rx="1.5" fill="currentColor" opacity="0.24" />
        <rect x="98" y="6" width="50" height="20" rx="4" fill="currentColor" opacity="0.16" />
        <rect x="12" y="30" width="42" height="16" rx="3.5" fill="currentColor" opacity="0.12" />
        <rect x="59" y="30" width="42" height="16" rx="3.5" fill="currentColor" opacity="0.12" />
        <rect x="106" y="30" width="42" height="16" rx="3.5" fill="currentColor" opacity="0.12" />
        <rect x="17" y="35" width="24" height="3" rx="1.5" fill="#3b82f6" opacity="0.8" />
        <rect x="64" y="35" width="24" height="3" rx="1.5" fill="currentColor" opacity="0.45" />
        <rect x="111" y="35" width="24" height="3" rx="1.5" fill="currentColor" opacity="0.45" />
        <rect x="17" y="40" width="30" height="2.5" rx="1.25" fill="currentColor" opacity="0.25" />
        <rect x="64" y="40" width="30" height="2.5" rx="1.25" fill="currentColor" opacity="0.25" />
        <rect x="111" y="40" width="30" height="2.5" rx="1.25" fill="currentColor" opacity="0.25" />
      </svg>
    );
  }
  if (type === "contact-form-call") {
    return (
      <svg viewBox="0 0 160 52" fill="none" className={className}>
        <rect x="14" y="6" width="58" height="4" rx="2" fill="currentColor" opacity="0.6" />
        <rect x="14" y="13" width="132" height="33" rx="4.5" fill="currentColor" opacity="0.1" />
        <rect x="22" y="18" width="26" height="3" rx="1.5" fill="#3b82f6" />
        <rect x="54" y="18" width="26" height="3" rx="1.5" fill="currentColor" opacity="0.3" />
        <rect x="22" y="25" width="54" height="6" rx="2" fill="currentColor" opacity="0.24" />
        <rect x="82" y="25" width="56" height="6" rx="2" fill="currentColor" opacity="0.24" />
        <rect x="22" y="34" width="82" height="7" rx="2" fill="currentColor" opacity="0.18" />
        <rect x="110" y="34" width="28" height="7" rx="2.5" fill="#3b82f6" opacity="0.9" />
      </svg>
    );
  }
  if (type === "contact-locations") {
    return (
      <svg viewBox="0 0 160 52" fill="none" className={className}>
        <rect x="12" y="6" width="54" height="4" rx="2" fill="currentColor" opacity="0.6" />
        <rect x="108" y="5" width="18" height="6" rx="2" fill="#3b82f6" opacity="0.85" />
        <rect x="129" y="5" width="19" height="6" rx="2" fill="currentColor" opacity="0.2" />
        <rect x="12" y="14" width="52" height="32" rx="4" fill="currentColor" opacity="0.12" />
        <rect x="18" y="20" width="32" height="3.5" rx="1.75" fill="currentColor" opacity="0.5" />
        <rect x="18" y="26" width="38" height="2.5" rx="1.25" fill="currentColor" opacity="0.28" />
        <rect x="18" y="31" width="34" height="2.5" rx="1.25" fill="currentColor" opacity="0.28" />
        <rect x="18" y="38" width="24" height="4" rx="2" fill="#3b82f6" opacity="0.85" />
        <rect x="70" y="14" width="78" height="32" rx="4" fill="currentColor" opacity="0.16" />
        <circle cx="109" cy="30" r="4" fill="#3b82f6" opacity="0.9" />
        <circle cx="109" cy="30" r="8" stroke="#3b82f6" strokeOpacity="0.35" strokeWidth="1.5" />
      </svg>
    );
  }
  if (type === "legal-hero") {
    return (
      <svg viewBox="0 0 160 52" fill="none" className={className}>
        <rect x="12" y="7" width="68" height="5.5" rx="2.5" fill="currentColor" opacity="0.65" />
        <rect x="12" y="15" width="84" height="3" rx="1.5" fill="currentColor" opacity="0.3" />
        <rect x="12" y="21" width="52" height="2.5" rx="1.25" fill="currentColor" opacity="0.22" />
        <rect x="114" y="8" width="16" height="7" rx="2" fill="currentColor" opacity="0.18" />
        <rect x="133" y="8" width="15" height="7" rx="2" fill="currentColor" opacity="0.18" />
        <rect x="12" y="34" width="136" height="1" fill="currentColor" opacity="0.2" />
        <rect x="12" y="31" width="26" height="2" rx="1" fill="#3b82f6" />
        <rect x="44" y="31" width="24" height="2" rx="1" fill="currentColor" opacity="0.28" />
        <rect x="74" y="31" width="22" height="2" rx="1" fill="currentColor" opacity="0.28" />
        <rect x="102" y="31" width="24" height="2" rx="1" fill="currentColor" opacity="0.28" />
      </svg>
    );
  }
  if (type === "legal-reader") {
    return (
      <svg viewBox="0 0 160 52" fill="none" className={className}>
        <rect x="12" y="7" width="44" height="38" rx="4" fill="currentColor" opacity="0.1" />
        <rect x="16" y="12" width="36" height="5" rx="2" fill="currentColor" opacity="0.22" />
        <rect x="16" y="21" width="36" height="5" rx="2" fill="#3b82f6" opacity="0.85" />
        <rect x="16" y="29" width="32" height="4" rx="1.5" fill="currentColor" opacity="0.25" />
        <rect x="16" y="36" width="28" height="4" rx="1.5" fill="currentColor" opacity="0.25" />
        <rect x="62" y="7" width="86" height="18" rx="4" fill="currentColor" opacity="0.12" />
        <rect x="68" y="11" width="46" height="3.5" rx="1.5" fill="currentColor" opacity="0.5" />
        <rect x="68" y="17" width="2" height="5" rx="1" fill="#3b82f6" />
        <rect x="73" y="17" width="66" height="3" rx="1.5" fill="currentColor" opacity="0.28" />
        <rect x="62" y="28" width="86" height="17" rx="4" fill="currentColor" opacity="0.12" />
        <rect x="68" y="32" width="52" height="3.5" rx="1.5" fill="currentColor" opacity="0.45" />
        <rect x="68" y="38" width="68" height="3" rx="1.5" fill="currentColor" opacity="0.25" />
      </svg>
    );
  }
  if (type === "legal-preferences") {
    return (
      <svg viewBox="0 0 160 52" fill="none" className={className}>
        <rect x="12" y="7" width="66" height="38" rx="4" fill="currentColor" opacity="0.1" />
        <rect x="17" y="13" width="38" height="3" rx="1.5" fill="currentColor" opacity="0.45" />
        <rect x="62" y="12" width="11" height="5" rx="2.5" fill="#3b82f6" opacity="0.9" />
        <rect x="17" y="21" width="34" height="3" rx="1.5" fill="currentColor" opacity="0.35" />
        <rect x="62" y="20" width="11" height="5" rx="2.5" fill="currentColor" opacity="0.28" />
        <rect x="17" y="34" width="26" height="6" rx="2.5" fill="#3b82f6" opacity="0.85" />
        <rect x="84" y="7" width="64" height="38" rx="4" fill="currentColor" opacity="0.1" />
        <rect x="90" y="12" width="52" height="6" rx="2" fill="currentColor" opacity="0.2" />
        <rect x="90" y="21" width="52" height="6" rx="2" fill="currentColor" opacity="0.2" />
        <rect x="90" y="34" width="32" height="6" rx="2.5" fill="#3b82f6" opacity="0.85" />
      </svg>
    );
  }
  if (type === "contact-page") {
    return (
      <svg viewBox="0 0 160 52" fill="none" className={className}>
        <rect x="12" y="7" width="44" height="5" rx="2" fill="currentColor" opacity="0.65" />
        <rect x="12" y="15" width="52" height="3" rx="1.5" fill="currentColor" opacity="0.3" />
        <rect x="12" y="21" width="48" height="7" rx="2.5" fill="currentColor" opacity="0.14" />
        <rect x="12" y="30" width="48" height="7" rx="2.5" fill="currentColor" opacity="0.14" />
        <rect x="74" y="6" width="24" height="3" rx="1.5" fill="#3b82f6" />
        <rect x="102" y="6" width="24" height="3" rx="1.5" fill="currentColor" opacity="0.28" />
        <rect x="74" y="12" width="74" height="25" rx="4" fill="currentColor" opacity="0.1" />
        <rect x="80" y="17" width="28" height="4" rx="1.5" fill="currentColor" opacity="0.3" />
        <rect x="112" y="17" width="28" height="4" rx="1.5" fill="currentColor" opacity="0.3" />
        <rect x="80" y="24" width="60" height="5" rx="1.5" fill="currentColor" opacity="0.22" />
        <rect x="80" y="31" width="24" height="4" rx="2" fill="#3b82f6" opacity="0.85" />
        <rect x="12" y="40" width="136" height="8" rx="3" fill="currentColor" opacity="0.16" />
        <circle cx="24" cy="44" r="2" fill="#3b82f6" />
      </svg>
    );
  }

  // 9. PRICING
  if (type === "pricing-compare") {
    return (
      <svg viewBox="0 0 160 48" fill="none" className={className}>
        <rect x="14" y="6" width="38" height="5" rx="2.5" fill="currentColor" opacity="0.55" />
        <rect x="96" y="6" width="50" height="5" rx="2.5" fill="currentColor" opacity="0.2" />
        <rect
          x="14"
          y="15"
          width="132"
          height="27"
          rx="4"
          className="stroke-current"
          strokeWidth="1"
          opacity="0.45"
        />
        <line
          x1="14"
          y1="23"
          x2="146"
          y2="23"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.25"
        />
        <line
          x1="14"
          y1="30"
          x2="146"
          y2="30"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.2"
        />
        <line
          x1="14"
          y1="36"
          x2="146"
          y2="36"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.2"
        />
        <rect x="86" y="15" width="24" height="27" fill="currentColor" opacity="0.06" />
        <circle cx="98" cy="26.5" r="2" fill="#3b82f6" />
        <circle cx="98" cy="33" r="2" fill="#3b82f6" />
        <circle cx="98" cy="39" r="2" fill="#3b82f6" />
        <circle cx="72" cy="26.5" r="1.5" fill="currentColor" opacity="0.35" />
        <circle cx="128" cy="26.5" r="1.5" fill="currentColor" opacity="0.45" />
      </svg>
    );
  }

  if (type === "pricing") {
    return (
      <svg viewBox="0 0 160 48" fill="none" className={className}>
        <rect
          x="14"
          y="10"
          width="38"
          height="30"
          rx="4"
          className="stroke-current"
          strokeWidth="1"
        />
        <rect
          x="61"
          y="6"
          width="38"
          height="38"
          rx="5"
          stroke="#3b82f6"
          strokeWidth="1.5"
          fill="currentColor"
          fillOpacity="0.06"
        />
        <rect x="71" y="11" width="18" height="3" rx="1" fill="#3b82f6" />
        <rect
          x="108"
          y="10"
          width="38"
          height="30"
          rx="4"
          className="stroke-current"
          strokeWidth="1"
        />
      </svg>
    );
  }

  // 10. FAQ
  if (type === "faq") {
    return (
      <svg viewBox="0 0 160 44" fill="none" className={className}>
        <rect
          x="14"
          y="8"
          width="132"
          height="9"
          rx="3"
          className="stroke-current"
          strokeWidth="1"
          fill="currentColor"
          fillOpacity="0.04"
        />
        <rect x="22" y="11.5" width="60" height="3" rx="1" fill="currentColor" />
        <rect
          x="14"
          y="21"
          width="132"
          height="9"
          rx="3"
          className="stroke-current"
          strokeWidth="1"
          fill="currentColor"
          fillOpacity="0.04"
        />
        <rect x="22" y="24.5" width="48" height="3" rx="1" fill="currentColor" />
      </svg>
    );
  }

  // 11. CTA
  if (type === "cta") {
    return (
      <svg viewBox="0 0 160 38" fill="none" className={className}>
        <rect
          x="10"
          y="6"
          width="140"
          height="26"
          rx="6"
          stroke="#3b82f6"
          strokeWidth="1.2"
          strokeDasharray="3 3"
          fill="currentColor"
          fillOpacity="0.05"
        />
        <rect x="48" y="12" width="64" height="4" rx="2" fill="currentColor" />
        <rect x="65" y="20" width="30" height="8" rx="3" fill="#3b82f6" />
      </svg>
    );
  }

  // 12. FOOTER
  if (variant === "locale-status") {
    return (
      <svg viewBox="0 0 160 44" fill="none" className={className}>
        {/* Brand logo & status pill */}
        <circle cx="20" cy="14" r="3" fill="currentColor" />
        <rect x="27" y="12.5" width="22" height="3" rx="1.5" fill="currentColor" />
        {/* Green status indicator */}
        <circle cx="20" cy="24" r="2" fill="#10b981" />
        <rect x="26" y="23" width="28" height="2" rx="1" fill="currentColor" opacity="0.7" />
        {/* Link columns */}
        <rect x="68" y="12" width="16" height="2.5" rx="1" fill="currentColor" opacity="0.5" />
        <rect x="68" y="18" width="12" height="2" rx="1" fill="currentColor" opacity="0.3" />
        <rect x="68" y="23" width="14" height="2" rx="1" fill="currentColor" opacity="0.3" />

        <rect x="92" y="12" width="16" height="2.5" rx="1" fill="currentColor" opacity="0.5" />
        <rect x="92" y="18" width="14" height="2" rx="1" fill="currentColor" opacity="0.3" />
        <rect x="92" y="23" width="10" height="2" rx="1" fill="currentColor" opacity="0.3" />

        {/* Globe + Locale Selector Box */}
        <rect
          x="116"
          y="12"
          width="32"
          height="14"
          rx="3"
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.4"
          fill="currentColor"
          fillOpacity="0.06"
        />
        <circle cx="123" cy="19" r="2.5" stroke="#3b82f6" strokeWidth="0.8" />
        <rect x="128" y="18" width="14" height="2" rx="1" fill="currentColor" />
        {/* Bottom policy border */}
        <line
          x1="12"
          y1="36"
          x2="148"
          y2="36"
          stroke="currentColor"
          strokeOpacity="0.15"
          strokeWidth="1"
        />
      </svg>
    );
  }

  if (variant === "contact-action") {
    return (
      <svg viewBox="0 0 160 52" fill="none" className={className}>
        {/* Contact Action Panel */}
        <rect
          x="10"
          y="4"
          width="140"
          height="32"
          rx="5"
          className="stroke-current"
          strokeWidth="1"
          strokeOpacity="0.4"
          fill="currentColor"
          fillOpacity="0.06"
        />
        {/* Left Heading & CTA */}
        <rect x="18" y="10" width="52" height="4.5" rx="2" fill="currentColor" />
        <rect x="18" y="18" width="40" height="2.5" rx="1" fill="currentColor" opacity="0.6" />
        <rect x="18" y="24" width="28" height="7" rx="2.5" fill="#3b82f6" />
        {/* Right Contact Channels in panel */}
        <line
          x1="88"
          y1="8"
          x2="88"
          y2="32"
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeWidth="1"
        />
        <circle cx="96" cy="14" r="2" fill="currentColor" opacity="0.7" />
        <rect x="102" y="13" width="38" height="2.5" rx="1" fill="currentColor" opacity="0.8" />
        <circle cx="96" cy="22" r="2" fill="currentColor" opacity="0.7" />
        <rect x="102" y="21" width="30" height="2.5" rx="1" fill="currentColor" opacity="0.8" />
        {/* Bottom policy bar */}
        <rect x="14" y="42" width="44" height="2.5" rx="1" fill="currentColor" opacity="0.4" />
        <rect x="110" y="42" width="36" height="2.5" rx="1" fill="currentColor" opacity="0.4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 160 36" fill="none" className={className}>
      <rect
        x="12"
        y="8"
        width="136"
        height="20"
        rx="3"
        className="stroke-current"
        strokeWidth="1"
        fill="currentColor"
        fillOpacity="0.04"
      />
      <circle cx="22" cy="18" r="3" fill="currentColor" />
      <rect x="29" y="16.5" width="20" height="3" rx="1.5" fill="currentColor" />
      <rect x="90" y="16.5" width="14" height="3" rx="1.5" fill="currentColor" opacity="0.6" />
      <rect x="108" y="16.5" width="14" height="3" rx="1.5" fill="currentColor" opacity="0.6" />
      <rect x="126" y="16.5" width="14" height="3" rx="1.5" fill="currentColor" opacity="0.6" />
    </svg>
  );
}
