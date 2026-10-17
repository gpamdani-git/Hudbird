// starter-kits/pro-templates/src/components/nexus-sections/inner-pages/LegalDocumentLayout.tsx
"use client";

import React, { useState } from "react";
import { Reveal } from "../ScrollReveal";
import { Download, CheckCircle2, Scale, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { HB, HbSection, HbHeader } from "../HudbirdKit";

interface LegalSection {
  id: string;
  title: string;
  summary: string;
  content: string[];
  keyRules: string[];
}

const LEGAL_SECTIONS: LegalSection[] = [
  {
    id: "ip-ownership",
    title: "1. 100% Commercial IP Ownership & Royalty-Free Rights",
    summary:
      "Complete transfer of intellectual property, code artifacts, and assets upon contract settlement.",
    content: [
      "Upon receipt of final invoice settlement for any sprint pod, custom engagement, or template purchase, the Client receives irrevocable, worldwide, perpetual, royalty-free, and exclusive ownership of all tailored frontend code, design tokens, page compositions, and component implementations produced specifically for the Client.",
      "HudbirdUI Studio retains no ownership, claims, or licensing restrictions over your proprietary business logic, branded visual assets, database schemas, or customer records.",
      "Open source dependencies and foundational libraries (such as React, Next.js, and Tailwind CSS) remain governed by their respective MIT, Apache 2.0, or BSD licenses.",
    ],
    keyRules: [
      "No recurring royalties or runtime fee kickbacks.",
      "Full source code access with zero obfuscation or DRM locks.",
      "Permission to fork, modify, white-label, and resell in your own commercial product.",
    ],
  },
  {
    id: "data-retention",
    title: "2. Zero Data Retention & Local-First Processing",
    summary:
      "Strict zero-telemetry policy ensuring your proprietary enterprise data never touches third-party training pipelines.",
    content: [
      "Our templates, components, and interactive tools operate with a strict local-first architecture. We do not inspect, log, persist, or forward client-entered project parameters, design token values, or estimation configurations to external machine learning models or centralized analytics clusters.",
      "Any AI copilot or LLM-assisted workflows integrated into our templates connect directly to the Client's authenticated API endpoints via encrypted SSL/TLS channels with zero data retention guarantees.",
      "Our infrastructure does not set invasive tracking cookies, browser fingerprinting scripts, or cross-domain advertising pixels.",
    ],
    keyRules: [
      "Zero telemetry backdoors or remote killswitches.",
      "All persistent state lives in Client-controlled databases (e.g. Supabase, PostgreSQL).",
      "Full GDPR, CCPA, and Swiss Federal Act on Data Protection (FADP) compliance.",
    ],
  },
  {
    id: "performance-cwv",
    title: "3. Telemetry, Core Web Vitals & Real-User Performance Disclosures",
    summary:
      "Transparent technical disclosure of performance metrics and synthetic audit baselines.",
    content: [
      "All performance metrics published on this site (including sub-800ms Largest Contentful Paint, zero Cumulative Layout Shift, and sub-100ms Interaction to Next Paint) are measured on clean baseline devices using modern Chromium browser engines under standard mobile 4G throttling simulations.",
      "Real-world user performance may vary based on end-user hardware, third-party script injections (e.g. Tag Manager, heatmaps), and custom CDN configurations applied after template deployment.",
      "We provide continuous benchmarking suites via Playwright and automated Lighthouse CI to ensure your production deployments adhere strictly to the target performance budget.",
    ],
    keyRules: [
      "Target score: 100/100 Core Web Vitals across all flagship surfaces.",
      "Explicit aspect ratios enforced on all media to mathematically eliminate CLS.",
      "Optimized WebP/AVIF asset pipelines with native responsive srcSets.",
    ],
  },
  {
    id: "warranty-slas",
    title: "4. Warranty, SLAs, and Production Defect Guarantee",
    summary:
      "Guaranteed 30-day post-launch warranty and bug-fix coverage for all production deliverables.",
    content: [
      "All sprint deliverables and codebases provided by HudbirdUI Studio are accompanied by a comprehensive 30-day Production Defect Guarantee commencing on the date of final staging handover.",
      "During this warranty period, our dedicated engineering pod will resolve any verified regressions, TypeScript compilation errors, or responsive layout glitches at zero additional cost, with a guaranteed 24-hour response SLA.",
      "This warranty does not cover issues introduced by subsequent third-party modifications, unauthorized dependency upgrades, or uncoordinated backend breaking API changes.",
    ],
    keyRules: [
      "30-day comprehensive post-launch bug fix warranty.",
      "Sub-24h turnaround for critical production blockers.",
      "Direct communication channel via dedicated Slack pod during warranty.",
    ],
  },
  {
    id: "jurisdiction-law",
    title: "5. Jurisdiction, Arbitration & Governing Law",
    summary:
      "Clear legal governance rooted in Swiss commercial law and international commercial arbitration standards.",
    content: [
      "These terms and all associated commercial agreements shall be governed by and construed in accordance with the substantive laws of Switzerland, without regard to its conflict of law principles.",
      "Any dispute, controversy, or claim arising out of or in relation to this contract, including the validity, invalidity, breach, or termination thereof, shall be resolved by arbitration in accordance with the Swiss Rules of International Arbitration of the Swiss Arbitration Centre in force on the date on which the Notice of Arbitration is submitted.",
      "The seat of the arbitration shall be Zurich, Switzerland. The arbitral proceedings shall be conducted in English.",
    ],
    keyRules: [
      "Governing jurisdiction: Zurich, Switzerland.",
      "Neutral international commercial arbitration under Swiss Rules.",
      "Mutually binding confidentiality commitments regarding all client technical specs.",
    ],
  },
  {
    id: "dpo-hotline",
    title: "6. Data Privacy Officer & Legal Inquiries",
    summary:
      "Direct contact channel for legal counsel, compliance verification, and data processing agreements.",
    content: [
      "For enterprise clients requiring custom Data Processing Agreements (DPAs), SOC 2 compliance attestations, or custom vendor onboarding questionnaires, our legal and compliance counsel is available for direct engagement.",
      "Inquiries regarding copyright notices, licensing validation, or custom enterprise master services agreements (MSAs) should be directed to our designated legal desk.",
    ],
    keyRules: [
      "Direct legal inquiries: legal@hudbird.studio",
      "Standard DPA turnaround: 2 business days.",
      "Dedicated compliance officer for enterprise security reviews.",
    ],
  },
];

export const LegalDocumentLayout: React.FC<{
  documentType?: "terms" | "privacy" | "license";
  documentTitle?: string;
  effectiveDate?: string;
  version?: string;
}> = ({
  documentType = "terms",
  documentTitle = "Commercial Terms of Service & Architectural License",
  effectiveDate = "October 2026",
  version = "v2026.4.1",
}) => {
  const [activeSection, setActiveSection] = useState<string>(LEGAL_SECTIONS[0].id);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;
      for (let i = LEGAL_SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(LEGAL_SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(LEGAL_SECTIONS[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -110;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <HbSection tone="muted">
      {/* Top Summary Banner */}
      <Reveal>
        <div className={`${HB.cardDark} mb-14 p-8 sm:p-11`}>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#C8F560] text-[#0D0F14]">
                <Scale className="h-5 w-5" />
              </div>
              <div>
                <span className="block text-xs font-medium text-white/60">
                  HudbirdUI Legal Framework
                </span>
                <span className="text-sm font-semibold text-white capitalize">
                  {documentType} Agreement · Commercial Grade
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white">
                Effective: {effectiveDate}
              </span>
              <span className="rounded-full bg-[#7EE7EE]/20 px-3.5 py-1.5 text-xs font-semibold text-[#7EE7EE]">
                {version}
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-[#C8F560] px-3.5 py-1.5 text-xs font-semibold text-[#0D0F14]">
                <span className="h-1.5 w-1.5 animate-ping rounded-full bg-[#0D0F14]" />
                Verified Active
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6 pt-6 lg:flex-row lg:items-center">
            <div className="max-w-3xl space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-4xl">
                {documentTitle}
              </h2>
              <p className="text-sm leading-relaxed text-white/70 sm:text-base">
                Clear, transparent, and developer-friendly contractual framework designed for
                venture-backed product teams and global enterprises.
              </p>
            </div>
            <button
              onClick={() => window.print()}
              className="inline-flex shrink-0 cursor-pointer items-center gap-2 self-start rounded-full bg-[#C8F560] px-6 py-3.5 text-xs font-semibold text-[#0D0F14] transition-opacity hover:opacity-90 lg:self-center"
            >
              <Download className="h-4 w-4" />
              <span>Export Legal PDF</span>
            </button>
          </div>
        </div>
      </Reveal>

      {/* 2-Column Split: Sticky Sidebar TOC + Clauses */}
      <div className="relative grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
        <aside className="z-20 space-y-5 lg:sticky lg:top-24 lg:col-span-4 lg:self-start">
          <div className={HB.bezel}>
            <div className={`${HB.card} space-y-4 p-6`}>
              <div className="flex items-center justify-between border-b border-black/[0.06] pb-3 text-xs font-semibold text-zinc-500 dark:border-white/[0.08] dark:text-zinc-400">
                <span>Document Sections (Sticky)</span>
                <span className="rounded-full bg-[#C8F560] px-2.5 py-0.5 font-bold text-[#0D0F14]">
                  {LEGAL_SECTIONS.length} Clauses
                </span>
              </div>
              <nav className="space-y-1.5">
                {LEGAL_SECTIONS.map((sec, idx) => (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => scrollToSection(sec.id)}
                    className={`flex w-full cursor-pointer items-center gap-3 rounded-2xl p-3.5 text-left text-xs font-semibold transition-all ${
                      activeSection === sec.id
                        ? "bg-[#C8F560] text-[#0D0F14] shadow-sm"
                        : "text-zinc-600 hover:bg-[#F4F5F8] dark:text-zinc-300 dark:hover:bg-white/[0.06]"
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                        activeSection === sec.id
                          ? "bg-[#0D0F14] text-[#C8F560]"
                          : "bg-black/[0.06] text-zinc-700 dark:bg-white/[0.1] dark:text-zinc-200"
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span className="truncate">{sec.title.replace(/^\d+\.\s*/, "")}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="space-y-3 rounded-[28px] border border-black/10 bg-[#C8F560] p-6 text-[#0D0F14] shadow-md">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0D0F14]">
              <ShieldCheck className="h-4 w-4" />
              <span>Enterprise Legal Desk</span>
            </div>
            <p className="text-xs leading-relaxed font-medium text-[#0D0F14]/80">
              Need custom MSA revisions, SOC2 attestation, or DPA countersignature?
            </p>
            <a
              href="mailto:legal@hudbird.studio"
              className="inline-flex items-center gap-2 rounded-full bg-[#0D0F14] px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
            >
              <Mail className="h-3.5 w-3.5 text-[#C8F560]" />
              <span>legal@hudbird.studio</span>
            </a>
          </div>
        </aside>

        {/* Right Main Content */}
        <div className="space-y-8 lg:col-span-8">
          {LEGAL_SECTIONS.map((sec, idx) => (
            <Reveal key={sec.id} delay={idx * 0.05}>
              <article id={sec.id} className={`scroll-mt-32 ${HB.card} space-y-6 p-8 sm:p-10`}>
                <div className="space-y-2.5">
                  <span className={HB.brandChip}>Clause 0{idx + 1}</span>
                  <h3 className={`text-2xl font-semibold ${HB.ink} pt-1 tracking-tight`}>
                    {sec.title}
                  </h3>
                  <p className={`${HB.ink2} text-sm font-medium`}>{sec.summary}</p>
                </div>

                <div className={`space-y-4 ${HB.ink2} text-sm leading-relaxed sm:text-base`}>
                  {sec.content.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>

                {/* Key Rules Card */}
                <div className="space-y-3 rounded-2xl border border-black/[0.05] bg-[#F4F5F8] p-6 dark:border-white/[0.06] dark:bg-white/[0.04]">
                  <span className={`text-xs font-semibold ${HB.ink} block`}>
                    Binding Commitments & Guarantees
                  </span>
                  <ul className="space-y-2.5">
                    {sec.keyRules.map((rule, rIdx) => (
                      <li
                        key={rIdx}
                        className={`flex items-start gap-2.5 text-xs sm:text-sm ${HB.ink2}`}
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#C8F560] text-[#0D0F14]">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        </span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </HbSection>
  );
};
