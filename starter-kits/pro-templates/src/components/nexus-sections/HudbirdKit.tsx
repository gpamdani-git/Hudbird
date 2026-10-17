// starter-kits/pro-templates/src/components/nexus-sections/HudbirdKit.tsx
// HudbirdUI shared design kit — the single source of truth for the landing-page look
// (light #F4F5F8 / white surfaces, dark #0B0B10 / zinc-950, rounded-[28px] cards,
// centered pill badge headers, lime / cyan / violet widget accents, glass image captions).
"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Sparkles,
  CalendarDays,
  MousePointerClick,
  Wand2,
  Compass,
  Workflow,
  Brain,
  PieChart,
  PenTool,
  Palette,
  Orbit,
  Landmark,
  Mic,
  Cpu,
  FileText,
  Coins,
  Terminal,
  Bot,
  Server,
  BarChart3,
  Wallet,
  CreditCard,
  Building,
  Cloud,
  ShieldCheck,
  Mail,
  Target,
  MessageSquare,
  Home,
  Aperture,
  Blocks,
  Smartphone,
  Radar,
  Scale,
  PiggyBank,
  TrendingUp,
  Umbrella,
  Building2,
  Store,
  Share2,
  Kanban,
  Gem,
  Lock,
  Clock,
  LineChart,
  Megaphone,
  Activity,
  Hexagon,
} from "lucide-react";
import { Container, Reveal, MaskedHeading, PillLink } from "./ScrollReveal";
import { PEXELS } from "./HudbirdVisualWidgets";

/**
 * Domain-specific logo icon resolver for all 47 Pre-Built Templates.
 * Ensures every single template in the navbar, cards, and fullscreen modal displays a relevant vector mark.
 */
export const HudbirdTemplateLogoIcon: React.FC<{
  slug?: string;
  className?: string;
}> = ({ slug = "digital-agency", className = "w-5 h-5" }) => {
  const s = (slug || "").toLowerCase();
  const map: Record<string, React.ComponentType<{ className?: string }>> = {
    "digital-agency": Compass,
    "automation-saas": Workflow,
    "automation-platform": Workflow,
    "neural-network": Brain,
    "ai-keyword-generator": PenTool,
    "ai-marketing-agency": Megaphone,
    "ai-saas-software": Sparkles,
    "ai-application": Brain,
    "ai-copilot": Brain,
    "analytics-reporting": PieChart,
    "ai-agency-solutions": Sparkles,
    "content-generator": PenTool,
    "creative-design-studio": Palette,
    "ai-solutions": Orbit,
    "alunara-wellness": Orbit,
    "financial-management-platform": Landmark,
    "fintech-protocol": Landmark,
    "ai-voice-generator": Mic,
    "ai-gadget": Cpu,
    "ai-resume-builder": FileText,
    "crypto-marketing": Coins,
    "ai-software": Terminal,
    "ai-chatbot": Bot,
    "web-hosting": Server,
    analytics: BarChart3,
    "financial-application": Wallet,
    "payment-solution": CreditCard,
    "online-banking": Building,
    "cloud-based-software": Cloud,
    "cyber-security": ShieldCheck,
    "cyber-shield": ShieldCheck,
    "email-marketing": Mail,
    "lead-capture": Target,
    "messaging-platform": MessageSquare,
    "mortgage-services": Home,
    "creative-portfolio": Aperture,
    "app-builder": Blocks,
    "app-development": Smartphone,
    "ai-agency": Wand2,
    "smart-solutions": Radar,
    "risk-management-software": Scale,
    "personal-finance": PiggyBank,
    "mobile-management-software": Smartphone,
    "investment-management": TrendingUp,
    insurance: Umbrella,
    "property-management-software": Building2,
    "pos-system": Store,
    "social-media-management": Share2,
    "nuvexa-crm": Kanban,
    "wealth-management": Gem,
    "security-software": Lock,
    "time-tracking": Clock,
    "data-visualization-software": LineChart,
    "digital-marketing-agency": Megaphone,
    "forex-trading": Activity,
    "decentralized-finance": Hexagon,
  };

  const IconComp = map[s] || Compass;
  return <IconComp className={className} />;
};

/* -------------------------------------------------------------------------- */
/* Tokens                                                                     */
/* -------------------------------------------------------------------------- */

export const HB = {
  page: "bg-[#F4F5F8] dark:bg-[#0B0B10] text-zinc-900 dark:text-white",
  sectionMuted: "bg-[#F4F5F8] dark:bg-[#0B0B10]",
  sectionLight: "bg-white dark:bg-zinc-950",
  sectionDark: "bg-[#0B0C10] text-white",
  card: "rounded-[28px] bg-white dark:bg-zinc-900 border border-black/[0.06] dark:border-white/10 shadow-[0_14px_38px_-16px_rgba(15,23,42,0.06)]",
  cardMuted:
    "rounded-[28px] bg-[#F4F5F8] dark:bg-zinc-900/80 border border-black/[0.06] dark:border-white/10",
  cardDark:
    "rounded-[28px] bg-[#14161D] border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]",
  cardLime:
    "rounded-[28px] bg-[#C8F560] text-[#0D0F14] border border-black/10 shadow-[0_14px_38px_-16px_rgba(200,245,96,0.3)]",
  bezel:
    "rounded-[32px] p-1.5 bg-zinc-900/[0.04] dark:bg-white/[0.04] border border-zinc-900/[0.08] dark:border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
  bezelDark:
    "rounded-[32px] p-1.5 bg-white/[0.04] border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
  pillActive:
    "bg-[#C8F560] text-[#0D0F14] border border-black/10 shadow-[0_8px_20px_-6px_rgba(200,245,96,0.45)]",
  pillIdle:
    "bg-white dark:bg-[#14171F] text-zinc-700 dark:text-zinc-300 border border-black/[0.08] dark:border-white/10 hover:text-zinc-950 dark:hover:text-white",
  hoverLift:
    "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-20px_rgba(0,0,0,0.18)]",
  ink: "text-zinc-900 dark:text-white",
  ink2: "text-zinc-600 dark:text-zinc-400",
  ink3: "text-zinc-500 dark:text-zinc-400",
  muted: "text-zinc-500 dark:text-zinc-400",
  line: "border-black/[0.06] dark:border-white/10",
  chip: "inline-flex items-center px-3 py-1 rounded-full bg-[#F4F5F8] dark:bg-white/5 border border-black/[0.06] dark:border-white/10 text-xs font-medium text-zinc-700 dark:text-zinc-300",
  brandChip:
    "inline-flex items-center px-3 py-1 rounded-full bg-[#C8F560] text-[#0D0F14] border border-black/10 text-xs font-semibold",
  input:
    "w-full px-4 py-3 rounded-2xl bg-[#F4F5F8] dark:bg-white/5 border border-black/[0.06] dark:border-white/10 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#C8F560]/60",
  h2: "text-[clamp(2rem,4vw,3.4rem)] font-semibold tracking-[-0.035em] leading-[1.08]",
  lime: "#C8F560",
  cyan: "#7EE7EE",
  violet: "#A78BFA",
} as const;

export type HbTone = "muted" | "light" | "dark";

const toneClass = (tone: HbTone) =>
  tone === "dark" ? HB.sectionDark : tone === "light" ? HB.sectionLight : HB.sectionMuted;

/* -------------------------------------------------------------------------- */
/* Section + Header                                                           */
/* -------------------------------------------------------------------------- */

export const HbSection: React.FC<{
  children: React.ReactNode;
  tone?: HbTone;
  id?: string;
  className?: string;
  rounded?: boolean;
}> = ({ children, tone = "muted", id, className = "", rounded = false }) => (
  <section
    id={id}
    className={`overflow-x-clip py-20 sm:py-28 ${toneClass(tone)} ${
      rounded ? "rounded-t-[40px] sm:rounded-t-[56px]" : ""
    } ${className}`}
  >
    <Container>{children}</Container>
  </section>
);

/** Centered pill badge + headline + subtitle — exact landing-page header pattern. */
export const HbHeader: React.FC<{
  badge: string;
  title: string;
  accent?: string;
  subtitle?: string;
  align?: "center" | "left";
  tone?: HbTone;
  action?: React.ReactNode;
  className?: string;
}> = ({
  badge,
  title,
  accent,
  subtitle,
  align = "center",
  tone = "muted",
  action,
  className = "",
}) => {
  const dark = tone === "dark";
  const badgeCls = dark
    ? "bg-[#181A20] border-white/10 text-[#C8F560] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
    : "bg-white dark:bg-white/5 border-black/[0.08] dark:border-white/10 text-zinc-800 dark:text-zinc-200 shadow-xs";
  if (align === "left") {
    return (
      <div
        className={`mb-12 flex flex-col justify-between gap-6 sm:mb-14 lg:flex-row lg:items-end ${className}`}
      >
        <div className="max-w-2xl space-y-4">
          <Reveal y={10}>
            <span
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium ${badgeCls}`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--brand-primary,#7C3AED)]" />
              {badge}
            </span>
          </Reveal>
          <MaskedHeading
            as="h2"
            text={title}
            accent={accent}
            className={`${HB.h2} ${dark ? "text-white" : ""}`}
          />
          {subtitle && (
            <Reveal delay={0.1}>
              <p className={`text-base leading-relaxed ${dark ? "text-zinc-400" : HB.ink2}`}>
                {subtitle}
              </p>
            </Reveal>
          )}
        </div>
        {action && <Reveal delay={0.15}>{action}</Reveal>}
      </div>
    );
  }
  return (
    <div className={`mx-auto mb-12 max-w-3xl space-y-4 text-center sm:mb-16 ${className}`}>
      <Reveal y={10}>
        <span
          className={`inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-medium ${badgeCls}`}
        >
          {badge}
        </span>
      </Reveal>
      <MaskedHeading
        as="h2"
        text={title}
        accent={accent}
        className={`${HB.h2} ${dark ? "text-white" : ""}`}
      />
      {subtitle && (
        <Reveal delay={0.1}>
          <p
            className={`mx-auto max-w-2xl text-sm leading-relaxed sm:text-base ${dark ? "text-zinc-400" : HB.ink2}`}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
      {action && (
        <Reveal delay={0.15}>
          <div className="flex justify-center pt-2">{action}</div>
        </Reveal>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Image with verified-Pexels fallback                                        */
/* -------------------------------------------------------------------------- */

export const HbImage: React.FC<{
  src?: string;
  alt?: string;
  className?: string;
  fallbackIndex?: number;
}> = ({ src, alt = "", className = "", fallbackIndex = 0 }) => {
  const fallback = PEXELS.projects[fallbackIndex % PEXELS.projects.length];
  const safe = src && src.startsWith("http") ? src : fallback;
  return (
    <img
      src={safe}
      alt={alt}
      loading="lazy"
      className={className}
      onError={(e) => {
        const el = e.currentTarget;
        if (el.src !== fallback) el.src = fallback;
      }}
    />
  );
};

/* -------------------------------------------------------------------------- */
/* NEW SECTION: Color Widget Trio (lime / cyan / violet mini-UI cards)         */
/* -------------------------------------------------------------------------- */

export const HudbirdColorWidgetTrio: React.FC<{
  badge?: string;
  title?: string;
  tone?: HbTone;
  items?: [
    { title: string; desc: string },
    { title: string; desc: string },
    { title: string; desc: string },
  ];
}> = ({
  badge = "Features",
  title = "Powerful features to elevate your business",
  tone = "dark",
  items = [
    { title: "Smart scheduling", desc: "Auto-assign tasks & updates in real-time" },
    { title: "Approval tracking", desc: "Mobile reporting, automated work orders" },
    { title: "Asset inspections", desc: "Custom forms, AI-assisted file review" },
  ],
}) => {
  const dark = tone === "dark";
  const shell = dark ? "bg-black border border-white/[0.06]" : "bg-zinc-950 border border-black/10";
  const people = [
    { name: "Bessie Cooper", img: PEXELS.avatars[1] },
    { name: "Liam Johnson", img: PEXELS.avatars[0] },
    { name: "Oliver Thompson", img: PEXELS.avatars[2] },
  ];
  return (
    <HbSection tone={tone}>
      <HbHeader badge={badge} title={title} tone={tone} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Card 1 — schedule */}
        <Reveal y={20}>
          <div className="group space-y-4">
            <div
              className={`rounded-[22px] ${shell} flex h-[250px] flex-col gap-3 p-5 transition-transform duration-300 group-hover:-translate-y-1`}
            >
              <div className="flex items-center gap-3 text-[11px] text-zinc-400">
                Today <span className="h-px flex-1 bg-white/10" />
              </div>
              <div
                className="flex items-start justify-between rounded-xl px-4 py-3 text-zinc-950"
                style={{ background: HB.lime }}
              >
                <div>
                  <div className="text-sm font-semibold">Kickoff workshop</div>
                  <div className="text-xs text-zinc-700">10:00–11:00 AM</div>
                </div>
                <MousePointerClick className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-3 text-[11px] text-zinc-400">
                Sat, Jan 20 <span className="h-px flex-1 bg-white/10" />
              </div>
              <div
                className="flex items-start justify-between rounded-xl px-4 py-3 text-zinc-950"
                style={{ background: HB.cyan }}
              >
                <div>
                  <div className="text-sm font-semibold">Design review</div>
                  <div className="text-xs text-zinc-700">10:00–11:00 AM</div>
                </div>
                <Wand2 className="h-4 w-4" />
              </div>
            </div>
            <div className="px-1">
              <h3 className={`text-xl font-medium ${dark ? "text-white" : HB.ink}`}>
                {items[0].title}
              </h3>
              <p className={`mt-1 text-sm ${dark ? "text-zinc-400" : HB.ink2}`}>{items[0].desc}</p>
            </div>
          </div>
        </Reveal>

        {/* Card 2 — confirmations on lime */}
        <Reveal delay={0.08} y={20}>
          <div className="group space-y-4">
            <div
              className="flex h-[250px] flex-col justify-center gap-2.5 rounded-[22px] p-4 transition-transform duration-300 group-hover:-translate-y-1"
              style={{ background: HB.lime }}
            >
              {people.map((p) => (
                <div
                  key={p.name}
                  className="flex items-center justify-between gap-3 rounded-xl bg-zinc-950 px-3.5 py-2.5"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="h-9 w-9 rounded-full object-cover ring-2 ring-[#7EE7EE]"
                    />
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium text-white">{p.name}</div>
                      <div className="truncate text-[11px] text-zinc-400">team@hudbirdui.com</div>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-lg bg-white/10 px-3 py-1 text-[11px] font-semibold text-[#C8F560]">
                    Confirm
                  </span>
                </div>
              ))}
            </div>
            <div className="px-1">
              <h3 className={`text-xl font-medium ${dark ? "text-white" : HB.ink}`}>
                {items[1].title}
              </h3>
              <p className={`mt-1 text-sm ${dark ? "text-zinc-400" : HB.ink2}`}>{items[1].desc}</p>
            </div>
          </div>
        </Reveal>

        {/* Card 3 — file uploads */}
        <Reveal delay={0.16} y={20}>
          <div className="group space-y-4">
            <div
              className={`rounded-[22px] ${shell} flex h-[250px] flex-col justify-center gap-3 p-5 transition-transform duration-300 group-hover:-translate-y-1`}
            >
              {[
                {
                  name: "brand_system.fig",
                  size: "16 MB",
                  pct: 74,
                  bg: HB.violet,
                  text: "text-zinc-950",
                  track: "bg-white/50",
                },
                {
                  name: "q3_report.xls",
                  size: "16 MB",
                  pct: 28,
                  bg: "#FFFFFF",
                  text: "text-zinc-950",
                  track: "bg-zinc-200",
                },
              ].map((f) => (
                <div
                  key={f.name}
                  className={`rounded-xl px-4 py-3 ${f.text}`}
                  style={{ background: f.bg }}
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-zinc-950 text-white">
                      <Sparkles className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="text-sm font-semibold">{f.name}</div>
                      <div className="text-[11px] opacity-70">{f.size}</div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <div className={`h-1.5 flex-1 rounded-full ${f.track} overflow-hidden`}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${f.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full rounded-full bg-[#84CC16]"
                      />
                    </div>
                    <span className="text-[11px] font-semibold tabular-nums">{f.pct}%</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-1">
              <h3 className={`text-xl font-medium ${dark ? "text-white" : HB.ink}`}>
                {items[2].title}
              </h3>
              <p className={`mt-1 text-sm ${dark ? "text-zinc-400" : HB.ink2}`}>{items[2].desc}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </HbSection>
  );
};

/* -------------------------------------------------------------------------- */
/* NEW SECTION: Industry Glass Cards (image + frosted caption)                 */
/* -------------------------------------------------------------------------- */

export interface HbGlassItem {
  title: string;
  desc: string;
  image: string;
  href?: string;
}

export const HudbirdIndustryGlassCards: React.FC<{
  badge?: string;
  title?: string;
  subtitle?: string;
  tone?: HbTone;
  items?: HbGlassItem[];
}> = ({
  badge = "Integration",
  title = "Industries we serve",
  subtitle = "We deliver tailored solutions that meet the unique needs of each sector — adapting fast and driving measurable results.",
  tone = "dark",
  items = [
    {
      title: "Vacation rentals",
      desc: "Fully furnished spaces with every amenity.",
      image: PEXELS.villaExterior1,
    },
    {
      title: "Corporate housing",
      desc: "Comfortable living solutions for business teams.",
      image: PEXELS.villaHero,
    },
    {
      title: "Hotels & resorts",
      desc: "Where comfort meets timeless elegance.",
      image: PEXELS.villaExterior2,
    },
  ],
}) => (
  <HbSection tone={tone}>
    <HbHeader badge={badge} title={title} subtitle={subtitle} tone={tone} />
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 ${items.length >= 3 ? "lg:grid-cols-3" : ""} gap-6`}
    >
      {items.map((it, i) => (
        <Reveal key={it.title} delay={i * 0.08} y={24}>
          <a
            href={it.href || "#"}
            className="group relative block aspect-[4/4.4] overflow-hidden rounded-[28px] bg-zinc-800"
          >
            <HbImage
              src={it.image}
              alt={it.title}
              fallbackIndex={i}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
            />
            <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/50 bg-white/55 px-5 py-4 text-center text-zinc-900 backdrop-blur-xl transition-all duration-500 group-hover:bg-white/75 dark:bg-white/40">
              <h3 className="text-lg font-medium tracking-tight sm:text-xl">{it.title}</h3>
              <p className="mt-1 line-clamp-2 text-xs text-zinc-700 sm:text-sm">{it.desc}</p>
              <span className="mt-0 inline-flex max-h-0 items-center gap-1 overflow-hidden text-xs font-semibold opacity-0 transition-all duration-500 group-hover:mt-2 group-hover:max-h-6 group-hover:opacity-100">
                Explore <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </a>
        </Reveal>
      ))}
    </div>
  </HbSection>
);

/* -------------------------------------------------------------------------- */
/* NEW SECTION: Logo / Trust marquee                                           */
/* -------------------------------------------------------------------------- */

export const HudbirdLogoMarquee: React.FC<{ label?: string; logos?: string[]; tone?: HbTone }> = ({
  label = "Trusted by 2,400+ fast-moving teams worldwide",
  logos = [
    "Northwind",
    "Lumora",
    "Orbitly",
    "Vertex",
    "Kinetica",
    "Polaris",
    "Monolith",
    "Aether",
    "Nimbus",
    "Helix",
  ],
  tone = "light",
}) => (
  <section className={`overflow-hidden py-12 sm:py-14 ${toneClass(tone)}`}>
    <Container>
      <p className={`mb-8 text-center text-sm ${tone === "dark" ? "text-zinc-400" : HB.muted}`}>
        {label}
      </p>
    </Container>
    <div className="relative [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
      <motion.div
        className="flex w-max gap-14"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 32, ease: "linear", repeat: Infinity }}
      >
        {[...logos, ...logos].map((l, i) => (
          <span
            key={i}
            className={`text-2xl font-semibold tracking-[-0.04em] whitespace-nowrap sm:text-3xl ${
              tone === "dark" ? "text-white/30" : "text-zinc-300 dark:text-white/25"
            }`}
          >
            {l}
          </span>
        ))}
      </motion.div>
    </div>
  </section>
);

/* -------------------------------------------------------------------------- */
/* NEW SECTION: Full-bleed image CTA banner                                    */
/* -------------------------------------------------------------------------- */

export const HudbirdCtaBanner: React.FC<{
  badge?: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryText?: string;
  secondaryHref?: string;
  image?: string;
  bullets?: string[];
}> = ({
  badge = "Get started today",
  title = "Ready to launch something remarkable?",
  subtitle = "Book a 30-minute call. We'll map scope, timeline and the fastest path to production.",
  ctaText = "Book a call",
  ctaHref = "#",
  secondaryText = "View pricing",
  secondaryHref = "#",
  image = PEXELS.skyClouds,
  bullets = ["Kickoff in 48 hours", "Fixed-scope sprints", "100% IP ownership"],
}) => (
  <section className={`py-16 sm:py-24 ${HB.sectionMuted}`}>
    <Container>
      <Reveal y={24}>
        <div className="relative flex min-h-[420px] items-center overflow-hidden rounded-[36px]">
          <HbImage src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/65 to-zinc-950/10" />
          <div className="relative z-10 max-w-2xl space-y-6 p-8 text-white sm:p-14">
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-[#EAB308] backdrop-blur-md">
              {badge}
            </span>
            <h2 className="text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.06] font-semibold tracking-[-0.035em]">
              {title}
            </h2>
            <p className="text-base leading-relaxed text-white/75">{subtitle}</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/85">
              {bullets.map((b) => (
                <li key={b} className="inline-flex items-center gap-2">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-[#C8F560] text-zinc-950">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3 pt-2">
              <PillLink href={ctaHref} variant="inverse" size="md">
                {ctaText}
              </PillLink>
              {secondaryText && (
                <a
                  href={secondaryHref}
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-medium transition-colors hover:bg-white/10"
                >
                  {secondaryText}
                </a>
              )}
            </div>
          </div>
          {/* floating schedule widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute right-10 bottom-10 hidden w-[260px] rounded-[22px] bg-white/90 p-4 text-zinc-900 shadow-2xl backdrop-blur-xl lg:block"
          >
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <CalendarDays className="h-4 w-4" /> Next available
            </div>
            <div className="mt-2 rounded-xl px-3 py-2.5" style={{ background: HB.lime }}>
              <div className="text-sm font-semibold">Discovery call</div>
              <div className="text-xs text-zinc-700">Tomorrow · 10:00 AM</div>
            </div>
            <div className="mt-3 flex -space-x-2">
              {PEXELS.avatars.slice(0, 4).map((a, i) => (
                <img
                  key={i}
                  src={a}
                  alt=""
                  className="h-7 w-7 rounded-full object-cover ring-2 ring-white"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </Reveal>
    </Container>
  </section>
);

/* -------------------------------------------------------------------------- */
/* NEW SECTION: Stats band                                                     */
/* -------------------------------------------------------------------------- */

export const HudbirdStatsBand: React.FC<{
  stats?: { value: string; label: string; sub?: string }[];
  tone?: HbTone;
}> = ({
  stats = [
    { value: "150+", label: "Trusted partners", sub: "Global SaaS & enterprise" },
    { value: "12+", label: "Years of craft", sub: "Shipping digital products" },
    { value: "48+", label: "Awards won", sub: "Awwwards, FWA & UI8" },
    { value: "4.9", label: "Client rating", sub: "Across 200+ reviews" },
  ],
  tone = "light",
}) => (
  <section className={`py-14 sm:py-16 ${toneClass(tone)}`}>
    <Container>
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06} y={14}>
            <div
              className={`h-full p-7 ${tone === "dark" ? HB.cardDark : HB.cardMuted} flex flex-col justify-between`}
            >
              <div
                className={`text-4xl font-semibold tracking-[-0.03em] tabular-nums sm:text-5xl ${tone === "dark" ? "text-white" : HB.ink}`}
              >
                {s.value}
              </div>
              <div className="mt-4">
                <div
                  className={`text-base font-semibold ${tone === "dark" ? "text-white" : HB.ink}`}
                >
                  {s.label}
                </div>
                {s.sub && (
                  <div className={`mt-0.5 text-xs ${tone === "dark" ? "text-zinc-400" : HB.muted}`}>
                    {s.sub}
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Container>
  </section>
);
