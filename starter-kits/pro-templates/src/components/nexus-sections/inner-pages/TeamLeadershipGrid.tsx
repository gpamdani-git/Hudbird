// starter-kits/pro-templates/src/components/nexus-sections/inner-pages/TeamLeadershipGrid.tsx
"use client";

import React from "react";
import { Reveal, PillLink } from "../ScrollReveal";
import { Globe, Sparkles, ArrowUpRight } from "lucide-react";
import { PEXELS } from "../HudbirdVisualWidgets";
import { HB, HbSection, HbHeader, HbImage } from "../HudbirdKit";

const GitHubIcon = () => (
  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const TwitterIcon = () => (
  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.66 1.66 0 1 0 0 3.32 1.66 1.66 0 0 0 0-3.32z"
    />
  </svg>
);

interface TeamMember {
  id: string;
  name: string;
  role: string;
  discipline: string;
  location: string;
  bio: string;
  shippedProjects: string[];
  avatar: string;
}

const NICHE_TEAMS: Record<string, TeamMember[]> = {
  "fintech-protocol": [
    {
      id: "dr-julian-thorne",
      name: "Dr. Julian Thorne",
      role: "Chief Cryptographer",
      discipline: "Zero-Knowledge & Custody",
      location: "Zurich",
      bio: "Former ETH Zurich researcher designing non-custodial multi-sig vaults protecting $4.2B+ in institutional liquidity.",
      shippedProjects: ["Aura Sovereign Vault", "ERC-4626 Engine"],
      avatar: PEXELS.avatars[0],
    },
    {
      id: "mei-ling-zhang",
      name: "Mei-Ling Zhang",
      role: "Head of Quant Strategy",
      discipline: "Liquidity & Risk Models",
      location: "Singapore",
      bio: "Specializes in concentrated liquidity routing, sub-cent slippage engines, and real-time treasury analytics.",
      shippedProjects: ["AMM Router", "Dune Telemetry"],
      avatar: PEXELS.avatars[1],
    },
    {
      id: "viktor-orlov",
      name: "Viktor Orlov",
      role: "Principal Smart Contract Auditor",
      discipline: "Formal Verification",
      location: "Berlin",
      bio: "Leads Certora formal proofs and automated Foundry invariant fuzzing across all institutional vault releases.",
      shippedProjects: ["Invariant Harness", "Slashing Guard"],
      avatar: PEXELS.avatars[2],
    },
    {
      id: "amara-kalu",
      name: "Amara Kalu",
      role: "Head of Institutional MPC",
      discipline: "Threshold Signatures",
      location: "London",
      bio: "Architects Fireblocks policy engines and regulatory compliance workflows for global digital asset funds.",
      shippedProjects: ["MPC Bridge", "Compliance Core"],
      avatar: PEXELS.avatars[3],
    },
  ],
  "ai-copilot": [
    {
      id: "dr-aris-vance",
      name: "Dr. Aris Vance",
      role: "Chief AI Scientist",
      discipline: "Foundation Models",
      location: "San Francisco",
      bio: "Specializes in distributed attention kernels, synthetic data pipelines, and sub-20ms streaming inference.",
      shippedProjects: ["Synapse Core", "vLLM Kernels"],
      avatar: PEXELS.avatars[0],
    },
    {
      id: "kaori-tanaka",
      name: "Kaori Tanaka",
      role: "Staff Infrastructure Lead",
      discipline: "GPU Clusters & CUDA",
      location: "Tokyo",
      bio: "Builds high-throughput multi-GPU clusters with zero-downtime weight updates and low-latency routing.",
      shippedProjects: ["GPU Sharding", "Tensor Cache"],
      avatar: PEXELS.avatars[1],
    },
    {
      id: "gabriel-duarte",
      name: "Gabriel Duarte",
      role: "Lead Agent Architect",
      discipline: "Multi-Agent Graphs",
      location: "Toronto",
      bio: "Designs autonomous agent workflows with deterministic tool schemas and real-time evaluation guardrails.",
      shippedProjects: ["Agent Suite", "Eval Guardrails"],
      avatar: PEXELS.avatars[2],
    },
    {
      id: "sarah-jenkins",
      name: "Sarah Jenkins",
      role: "Principal AI UX Lead",
      discipline: "Streaming Interfaces",
      location: "New York",
      bio: "Crafts responsive streaming web surfaces that render real-time AI completions at 60fps with zero layout shift.",
      shippedProjects: ["Streaming Canvas", "Token Studio"],
      avatar: PEXELS.avatars[3],
    },
  ],
  "alunara-wellness": [
    {
      id: "dr-madeleine-laurent",
      name: "Dr. Madeleine Laurent",
      role: "Master Botanical Formulator",
      discipline: "Clean Chemistry",
      location: "Grasse",
      bio: "Specializes in supercritical CO2 botanical extraction, bio-fermented actives, and organic longevity rituals.",
      shippedProjects: ["Nocturne Elixir", "Solaris Essence"],
      avatar: PEXELS.avatars[3],
    },
    {
      id: "saffron-lee",
      name: "Saffron Lee",
      role: "Creative & Packaging Director",
      discipline: "Sensory Design",
      location: "Kyoto",
      bio: "Blends serene Japanese aesthetics with sustainable European craftsmanship and tactile refillable vessels.",
      shippedProjects: ["Amber Vessel", "Tactile Editions"],
      avatar: PEXELS.avatars[1],
    },
    {
      id: "oliver-vance",
      name: "Oliver Vance",
      role: "Regenerative Sourcing Lead",
      discipline: "Biodynamic Harvests",
      location: "Provence",
      bio: "Partners directly with regenerative farms across Provence and Hokkaido for 100% traceable botanicals.",
      shippedProjects: ["Provenance Ledger", "Cold-Press Spec"],
      avatar: PEXELS.avatars[0],
    },
    {
      id: "kiara-mehta",
      name: "Kiara Mehta",
      role: "Digital Atelier Lead",
      discipline: "Headless Commerce",
      location: "London",
      bio: "Builds ultra-fast digital flagship storefronts with personalized ritual diagnostics and member concierge.",
      shippedProjects: ["Digital Atelier", "Ritual Quiz"],
      avatar: PEXELS.avatars[5],
    },
  ],
  "cyber-shield": [
    {
      id: "col-robert-sterling",
      name: "Robert Sterling",
      role: "Chief Security Officer",
      discipline: "Zero-Trust Mesh",
      location: "Washington D.C.",
      bio: "Architected micro-segmented zero-trust perimeters defending critical cloud workloads and enterprise fleets.",
      shippedProjects: ["Zero-Trust Mesh", "FIDO2 Core"],
      avatar: PEXELS.avatars[4],
    },
    {
      id: "nadia-volkova",
      name: "Nadia Volkova",
      role: "Head of Threat Research",
      discipline: "Autonomous Defense",
      location: "Tel Aviv",
      bio: "Pioneered continuous breach-simulation suites and automated zero-day quarantine across multi-cloud nodes.",
      shippedProjects: ["Attack Scanner", "Runtime Guard"],
      avatar: PEXELS.avatars[1],
    },
    {
      id: "tarek-al-mansoor",
      name: "Tarek Al-Mansoor",
      role: "Principal Kernel Architect",
      discipline: "eBPF Telemetry",
      location: "Dubai",
      bio: "Builds real-time eBPF kernel sensors with sub-millisecond threat isolation and hardware key meshes.",
      shippedProjects: ["eBPF Sensor", "Key Mesh"],
      avatar: PEXELS.avatars[2],
    },
    {
      id: "chloe-dubois",
      name: "Chloe Dubois",
      role: "Compliance & SecOps Lead",
      discipline: "SOC 2 & ISO Automation",
      location: "Paris",
      bio: "Automates continuous compliance evidence collection and cryptographic audit trails for regulated teams.",
      shippedProjects: ["SOC 2 Engine", "Audit Ledger"],
      avatar: PEXELS.avatars[3],
    },
  ],
  "digital-agency": [
    {
      id: "daniele-rossi",
      name: "Daniele Rossi",
      role: "Founder & Principal Architect",
      discipline: "Design Systems & Next.js",
      location: "Zurich",
      bio: "Obsessed with clean visual hierarchy, interactive motion, and sub-second web applications that convert.",
      shippedProjects: ["FinovaX Pro", "Synapse Copilot"],
      avatar: PEXELS.avatars[0],
    },
    {
      id: "elena-vance",
      name: "Elena Vance",
      role: "Creative & Brand Director",
      discipline: "Visual Identity & Motion",
      location: "Tokyo",
      bio: "Bridges editorial typography, 3D art direction, and fluid micro-interactions across web and mobile.",
      shippedProjects: ["Alunara Atelier", "Orbit Commerce"],
      avatar: PEXELS.avatars[1],
    },
    {
      id: "marcus-chen",
      name: "Marcus Chen",
      role: "Staff Product Engineer",
      discipline: "Full-Stack & AI",
      location: "San Francisco",
      bio: "Leads full-stack architecture, real-time data visualizations, and scalable component libraries.",
      shippedProjects: ["Nexora CRM", "CyberShield UI"],
      avatar: PEXELS.avatars[2],
    },
    {
      id: "sophia-lindqvist",
      name: "Sophia Lindqvist",
      role: "Lead Interactive Technologist",
      discipline: "3D WebGL & Motion",
      location: "Stockholm",
      bio: "Crafts GPU-accelerated interactive canvases and tactile product showcases at a locked 60fps.",
      shippedProjects: ["Verdant Travel", "Pulse Media"],
      avatar: PEXELS.avatars[3],
    },
  ],
};

export const TeamLeadershipGrid: React.FC<{
  nicheSlug?: string;
  title?: string;
  subtitle?: string;
}> = ({
  nicheSlug = "digital-agency",
  title = "Meet the leadership team behind every release",
  subtitle = "Led by senior designers, principal engineers, and domain specialists working directly with your team.",
}) => {
  const activeNicheKey = NICHE_TEAMS[nicheSlug] ? nicheSlug : "digital-agency";
  const team = NICHE_TEAMS[activeNicheKey];

  return (
    <HbSection id="team" tone="light">
      <HbHeader badge="Leadership & Team" title={title} subtitle={subtitle} />

      {/* 4-Column Portrait Photo Cards with Frosted Glass Caption Overlay + Bio */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((member, idx) => (
          <Reveal key={member.id} delay={idx * 0.07} y={20}>
            <div
              className={`${HB.cardMuted} group flex h-full flex-col justify-between p-3 ${HB.hoverLift}`}
            >
              <div>
                {/* Portrait Image with Frosted Glass Overlay Caption */}
                <div className="relative aspect-[4/4.7] overflow-hidden rounded-[22px] bg-zinc-900">
                  <HbImage
                    src={member.avatar}
                    alt={member.name}
                    fallbackIndex={idx}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md">
                      <Globe className="h-3 w-3 text-[#C8F560]" />
                      {member.location}
                    </span>
                  </div>

                  {/* Frosted Glass Bottom Card Overlay (Matching Screenshot 2) */}
                  <div className="absolute inset-x-2.5 bottom-2.5 rounded-2xl border border-white/50 bg-white/75 px-4 py-3 text-left backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/80">
                    <div className="text-[11px] font-semibold text-[color:var(--brand-primary,#7C3AED)]">
                      {member.discipline}
                    </div>
                    <h3 className="mt-0.5 text-base font-semibold tracking-tight text-zinc-900 dark:text-white">
                      {member.name}
                    </h3>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">{member.role}</p>
                  </div>
                </div>

                {/* Concise Bio */}
                <p className="px-2 pt-4 text-xs leading-relaxed text-zinc-600 sm:text-sm dark:text-zinc-400">
                  {member.bio}
                </p>
              </div>

              {/* Shipped tags + social */}
              <div className="mt-4 flex items-center justify-between gap-2 border-t border-black/[0.06] px-2 pt-4 dark:border-white/10">
                <div className="flex flex-wrap gap-1.5">
                  {member.shippedProjects.map((proj) => (
                    <span
                      key={proj}
                      className="rounded-full border border-black/[0.05] bg-white px-2.5 py-0.5 text-[11px] font-medium text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300"
                    >
                      {proj}
                    </span>
                  ))}
                </div>
                <div className="flex shrink-0 items-center gap-2 text-zinc-400">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-zinc-900 dark:hover:text-white"
                    aria-label="LinkedIn"
                  >
                    <LinkedInIcon />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-zinc-900 dark:hover:text-white"
                    aria-label="Twitter"
                  >
                    <TwitterIcon />
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-zinc-900 dark:hover:text-white"
                    aria-label="GitHub"
                  >
                    <GitHubIcon />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Bottom Hiring Highlight Card (Dark + Neon Lime Widget Style) */}
      <Reveal delay={0.2} y={20}>
        <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-[32px] border border-white/10 bg-[#0E1017] p-7 text-white sm:p-10 lg:flex-row lg:items-center">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex shrink-0 -space-x-3">
              {PEXELS.avatars.slice(0, 4).map((av, i) => (
                <img
                  key={i}
                  src={av}
                  alt=""
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-[#C8F560]"
                />
              ))}
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C8F560] text-xs font-bold text-zinc-950">
                +14
              </span>
            </div>
            <div>
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-[#C8F560]/15 px-3 py-1 text-xs font-semibold text-[#C8F560]">
                <Sparkles className="h-3.5 w-3.5" /> We are hiring globally
              </div>
              <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                Want to build category-defining digital products with us?
              </h3>
              <p className="mt-1 text-sm text-zinc-400">
                100% remote-friendly pods across Zurich, Tokyo, San Francisco, and London.
              </p>
            </div>
          </div>

          <PillLink href={`/demos/${nicheSlug}/careers`} variant="inverse" size="md">
            Explore open roles
          </PillLink>
        </div>
      </Reveal>
    </HbSection>
  );
};
