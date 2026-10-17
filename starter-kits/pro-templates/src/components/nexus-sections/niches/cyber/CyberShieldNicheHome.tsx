// starter-kits/pro-templates/src/components/nexus-sections/niches/cyber/CyberShieldNicheHome.tsx
"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { NicheConfig } from "@hudbird/schemas";
import { NavbarMegaMenu } from "../../NavbarMegaMenu";
import { SplitTextCtaFooter } from "../../SplitTextCtaFooter";
import { Container, MaskedHeading, Reveal, PillLink } from "../../ScrollReveal";
import { PEXELS, HudbirdRobustTelemetryBento } from "../../HudbirdVisualWidgets";
import { HB, HbSection, HbHeader, HbImage } from "../../HudbirdKit";
import {
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  Lock,
  Cpu,
  Globe,
  Activity,
  CheckCircle2,
  Terminal,
} from "lucide-react";

const NEURAL_SOLUTIONS = [
  {
    title: "Autonomous Threat & Anomaly Detection",
    category: "Predictive Defense",
    metric: "99.98% Block Rate",
    desc: "Sub-millisecond behavioral models isolate lateral movement, credential stuffing, and zero-day API exploits before execution.",
    image: PEXELS.abstract3d1,
  },
  {
    title: "Enterprise LLM & Knowledge Guardrails",
    category: "Neural Firewall",
    metric: "0.4ms Inspection",
    desc: "Real-time PII redaction, prompt-injection defense, and cryptographic provenance across every internal AI workflow.",
    image: PEXELS.abstract3d2,
  },
  {
    title: "Zero-Trust Cloud & Compliance Mesh",
    category: "Continuous Audit",
    metric: "SOC2 + ISO42001",
    desc: "Automated evidence collection, ephemeral workload identities, and hardware-attested key rotation across multi-cloud clusters.",
    image: PEXELS.abstract3d3,
  },
];

const DEFENSE_PROTOCOLS = [
  {
    id: "prompt-shield",
    label: "LLM Prompt Firewall",
    latency: "0.38 ms",
    blockedToday: "142,890",
    complianceScore: "99.9%",
    status: "Enforcing Strict Policy",
    ruleSnippet: "POLICY: redact_pii(ssn, api_key) -> block_jailbreak(threshold=0.92)",
    regions: [
      { code: "us-east-va", ping: "1.2 ms", load: "38%", status: "Healthy" },
      { code: "eu-central-fra", ping: "1.8 ms", load: "44%", status: "Healthy" },
      { code: "ap-east-tyo", ping: "2.4 ms", load: "31%", status: "Healthy" },
    ],
  },
  {
    id: "zero-trust-mesh",
    label: "Zero-Trust Service Mesh",
    latency: "0.21 ms",
    blockedToday: "89,410",
    complianceScore: "100%",
    status: "mTLS Hardware Attested",
    ruleSnippet: "MESH: spiffe://hudbird.io/prod/* -> require_mtls(cipher=TLS_AES_256_GCM)",
    regions: [
      { code: "us-west-ore", ping: "0.9 ms", load: "52%", status: "Healthy" },
      { code: "eu-west-dub", ping: "1.5 ms", load: "29%", status: "Healthy" },
      { code: "ap-south-sin", ping: "2.1 ms", load: "41%", status: "Healthy" },
    ],
  },
  {
    id: "soc2-autopilot",
    label: "Automated SOC2 & ISO42001",
    latency: "1.10 ms",
    blockedToday: "18,320",
    complianceScore: "99.7%",
    status: "248/248 Controls Passing",
    ruleSnippet: "AUDIT: verify_iam_drift(interval=60s) -> sign_attestation(ed25519)",
    regions: [
      { code: "global-control-plane", ping: "1.4 ms", load: "19%", status: "Verified" },
      { code: "eu-sovereign-zrh", ping: "1.1 ms", load: "24%", status: "Verified" },
      { code: "us-gov-enclave", ping: "1.6 ms", load: "22%", status: "Verified" },
    ],
  },
];

export interface CyberShieldNicheHomeProps {
  niche: NicheConfig;
  customBrandPrimary?: string;
}

export const CyberShieldNicheHome: React.FC<CyberShieldNicheHomeProps> = ({ niche }) => {
  const [activeFeature, setActiveFeature] = useState<number>(0);
  const [activeProtocolIdx, setActiveProtocolIdx] = useState<number>(0);

  const activeProtocol = DEFENSE_PROTOCOLS[activeProtocolIdx];
  const isCustomSlug = niche.slug !== "cyber-shield";
  const heroHeading = isCustomSlug
    ? `${niche.sections.hero.headline.preText} *${niche.sections.hero.headline.accentWord}* ${niche.sections.hero.headline.postText}`.trim()
    : "Neural security that protects enterprise AI and *accelerates* trust";
  const heroAccent = isCustomSlug ? niche.sections.hero.headline.accentWord : "accelerates";
  const heroDesc = isCustomSlug
    ? niche.sections.hero.description
    : "Deploy sub-millisecond LLM firewalls, zero-trust service meshes, and continuous cryptographic compliance across every cloud region with HudbirdUI.";

  return (
    <div className="min-h-screen bg-[#F5F6FA] text-zinc-900 transition-colors duration-300 dark:bg-[#090B10] dark:text-white">
      {/* 1. Floating Pill Navbar */}
      <NavbarMegaMenu data={niche.sections.navbar} />

      {/* 2. Hero Section: 3D Neural Sculpture + Floating Telemetry Cards */}
      <section className="relative overflow-hidden pt-12 pb-24 sm:pt-16 sm:pb-32">
        <Container>
          <div className="mx-auto max-w-4xl space-y-6 text-center">
            <Reveal y={10}>
              <span className={HB.chip}>
                <span className="mr-2 h-2 w-2 rounded-full bg-[#C8F560]" />
                <span>
                  {niche.sections.hero.badge?.text ||
                    "Autonomous Neural Defense & Cloud Governance"}
                </span>
              </span>
            </Reveal>

            <MaskedHeading
              as="h1"
              text={heroHeading}
              accent={heroAccent}
              className="mx-auto max-w-4xl text-[clamp(2.4rem,5vw,4.35rem)] leading-[1.08] font-semibold tracking-[-0.035em] text-balance text-zinc-900 dark:text-white"
            />

            <Reveal delay={0.1} y={14}>
              <p className="mx-auto max-w-[54ch] text-[15px] leading-relaxed text-zinc-600 sm:text-[17px] dark:text-zinc-400">
                {heroDesc}
              </p>
            </Reveal>

            <Reveal delay={0.18} y={16}>
              <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
                <PillLink href={`/demos/${niche.slug}/contact`} variant="brand" size="lg">
                  {niche.sections.hero.primaryCta?.label || "Request security demo"}
                </PillLink>
                <PillLink href={`/demos/${niche.slug}/services`} variant="ghost" size="lg">
                  Inspect architecture
                </PillLink>
              </div>
            </Reveal>
          </div>

          {/* Bottom Hero Showpiece: Double-Bezel 3D Neural Sculpture + Floating Tilted Glass Cards */}
          <div className="relative mx-auto mt-14 max-w-[880px] sm:mt-16">
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto w-full max-w-[660px] rounded-[38px] border border-black/[0.08] bg-white/80 p-2 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.14)] dark:border-white/10 dark:bg-white/[0.04]"
            >
              <div className="relative flex aspect-[16/11] items-center justify-center overflow-hidden rounded-[30px] border border-black/[0.06] bg-gradient-to-b from-[#DCE6F7] via-[#E8DFF5] to-[#F5E1EC] dark:border-white/10 dark:from-[#131826] dark:via-[#1A2035] dark:to-[#0D0F14]">
                <img
                  src={PEXELS.neuralBrain}
                  alt="3D Pastel AI Neural Sculpture"
                  className="h-full w-full scale-105 object-cover opacity-90 mix-blend-multiply dark:mix-blend-lighten"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              </div>
            </motion.div>

            {/* Left Floating Tilted Card */}
            <motion.div
              initial={{ opacity: 0, x: -30, rotate: -8 }}
              whileInView={{ opacity: 1, x: 0, rotate: -5 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-1/3 left-0 z-20 hidden w-[255px] rounded-2xl border border-black/[0.08] bg-white/95 p-4 shadow-[0_24px_50px_rgba(0,0,0,0.14)] backdrop-blur-xl sm:block lg:-left-6 dark:border-white/15 dark:bg-zinc-900/95"
            >
              <div className="flex items-center gap-3">
                <img
                  src={PEXELS.avatarMan1}
                  alt="Wade Warren"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <div className="text-xs font-bold text-zinc-900 dark:text-white">Wade Warren</div>
                  <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    Principal SecOps Lead
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-black/[0.06] pt-3 text-[11px] dark:border-white/10">
                <span className="text-zinc-500">Zero-Trust Enclave</span>
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 font-semibold text-emerald-600 dark:text-emerald-400">
                  Verified
                </span>
              </div>
            </motion.div>

            {/* Right Top Floating Tilted Card */}
            <motion.div
              initial={{ opacity: 0, x: 30, rotate: 6 }}
              whileInView={{ opacity: 1, x: 0, rotate: 4 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-8 right-2 z-20 hidden w-[215px] rounded-2xl border border-black/[0.08] bg-white/95 p-4 shadow-[0_24px_50px_rgba(0,0,0,0.14)] backdrop-blur-xl sm:block lg:-right-4 dark:border-white/15 dark:bg-zinc-900/95"
            >
              <div className="mb-2.5 flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-900 dark:text-white">
                  SOC Response
                </span>
                <span className="rounded-full bg-[#C8F560] px-2 py-0.5 text-[10px] font-semibold text-[#0D0F14]">
                  0 Alerts
                </span>
              </div>
              <div className="flex -space-x-2">
                <img
                  src={PEXELS.avatarWoman1}
                  alt=""
                  className="h-8 w-8 rounded-full object-cover ring-2 ring-white dark:ring-zinc-900"
                />
                <img
                  src={PEXELS.avatarWoman2}
                  alt=""
                  className="h-8 w-8 rounded-full object-cover ring-2 ring-white dark:ring-zinc-900"
                />
                <img
                  src={PEXELS.avatarMan2}
                  alt=""
                  className="h-8 w-8 rounded-full object-cover ring-2 ring-white dark:ring-zinc-900"
                />
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-bold text-white ring-2 ring-white">
                  +12
                </span>
              </div>
            </motion.div>

            {/* Right Bottom Floating Tilted Card */}
            <motion.div
              initial={{ opacity: 0, y: 24, rotate: -4 }}
              whileInView={{ opacity: 1, y: 0, rotate: -3 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 bottom-8 z-20 hidden w-[230px] rounded-2xl border border-black/[0.08] bg-white/95 p-4 shadow-[0_24px_50px_rgba(0,0,0,0.14)] backdrop-blur-xl sm:block lg:-right-8 dark:border-white/15 dark:bg-zinc-900/95"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  Threat Mitigation
                </span>
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              </div>
              <div className="mt-1 text-3xl font-bold text-zinc-900 tabular-nums dark:text-white">
                99.98%
              </div>
              <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-white/10">
                <div className="h-full w-[96%] rounded-full bg-gradient-to-r from-[#0D0F14] to-emerald-400 dark:from-[#C8F560]" />
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 3. Interactive Zero-Trust Threat & Inference Firewall Simulator ("One Live Thing") */}
      <HbSection tone="light">
        <HbHeader
          badge="Live Defense Console"
          title="Inspect how HudbirdUI secures every inference and API call"
          subtitle="Toggle between active defense layers to inspect real-time latency, policy enforcement rules, and regional cluster health."
        />

        <div className="rounded-[34px] border border-black/[0.06] bg-[#ECEEF4] p-2 dark:border-white/10 dark:bg-white/[0.04]">
          <div className="rounded-[28px] border border-white/10 bg-[#0D0F14] p-6 text-white sm:p-10">
            <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-8 lg:flex-row lg:items-center">
              <div className="flex flex-wrap gap-2">
                {DEFENSE_PROTOCOLS.map((p, idx) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setActiveProtocolIdx(idx)}
                    className={`cursor-pointer rounded-full px-4 py-2.5 text-xs font-semibold transition-all sm:text-sm ${
                      activeProtocolIdx === idx
                        ? "bg-[#C8F560] text-[#0D0F14]"
                        : "bg-white/[0.06] text-zinc-300 hover:bg-white/10"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3.5 py-1.5 text-xs font-semibold text-emerald-300">
                <span className="h-2 w-2 animate-ping rounded-full bg-emerald-400" />
                <span>{activeProtocol.status}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 items-center gap-8 pt-8 lg:grid-cols-12">
              <div className="space-y-5 lg:col-span-5">
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="text-[11px] text-zinc-400">Inspection Latency</div>
                    <div className="mt-1 text-xl font-bold text-[#C8F560] tabular-nums sm:text-2xl">
                      {activeProtocol.latency}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="text-[11px] text-zinc-400">Threats Blocked</div>
                    <div className="mt-1 text-xl font-bold text-white tabular-nums sm:text-2xl">
                      {activeProtocol.blockedToday}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="text-[11px] text-zinc-400">Audit Score</div>
                    <div className="mt-1 text-xl font-bold text-[#7EE7EE] tabular-nums sm:text-2xl">
                      {activeProtocol.complianceScore}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 rounded-2xl border border-white/10 bg-black/60 p-4 font-mono text-xs text-zinc-300">
                  <div className="flex items-center gap-2 text-[#C8F560]">
                    <Terminal className="h-3.5 w-3.5" />
                    <span>Active Policy Rule</span>
                  </div>
                  <div className="break-all text-zinc-200">{activeProtocol.ruleSnippet}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-7">
                {activeProtocol.regions.map((reg) => (
                  <div
                    key={reg.code}
                    className="flex flex-col justify-between space-y-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-zinc-300">{reg.code}</span>
                      <Globe className="h-4 w-4 text-[#7EE7EE]" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white tabular-nums">{reg.ping}</div>
                      <div className="mt-0.5 text-[11px] text-zinc-400">
                        Node Load: {reg.load} · {reg.status}
                      </div>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-[#C8F560]"
                        style={{ width: reg.load }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </HbSection>

      {/* 4. Neural Defense Capabilities 3-Card Double-Bezel Bento */}
      <HbSection tone="muted">
        <HbHeader
          badge="Neural Defense Stack"
          title="Engineered for zero-trust speed, resilience, and enterprise scale"
          subtitle="Modular security primitives that drop directly into your existing Kubernetes, LLM, and multi-cloud pipelines."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {NEURAL_SOLUTIONS.map((item, idx) => (
            <Link
              key={item.title}
              to="/demos/cyber-shield/service-detail"
              onMouseEnter={() => setActiveFeature(idx)}
              className="group flex rounded-[32px] border border-black/[0.06] bg-white/70 p-2 transition-all duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-white/[0.03]"
            >
              <div
                className={`flex w-full flex-col justify-between rounded-[26px] border p-4 transition-colors ${
                  activeFeature === idx
                    ? "border-zinc-800 bg-[#0D0F14] text-white"
                    : "border-black/[0.05] bg-white text-zinc-900 dark:border-white/10 dark:bg-zinc-900 dark:text-white"
                }`}
              >
                <div>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[20px]">
                    <HbImage
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-zinc-950">
                      {item.category}
                    </span>
                    <span className="absolute right-3 bottom-3 rounded-full bg-[#C8F560] px-3 py-1 text-[11px] font-semibold text-[#0D0F14] tabular-nums">
                      {item.metric}
                    </span>
                  </div>
                  <div className="px-2 pt-5">
                    <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                    <p
                      className={`mt-2 text-xs leading-relaxed sm:text-sm ${
                        activeFeature === idx ? "text-zinc-300" : "text-zinc-600 dark:text-zinc-400"
                      }`}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-current/10 px-2 pt-5">
                  <span className="text-xs font-semibold">Explore specification</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-current/10">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </HbSection>

      {/* 5. 2x2 Dark Cobalt Ring Telemetry Bento (Exclusive to Cyber Shield) */}
      <HudbirdRobustTelemetryBento
        badge="Infrastructure Scale"
        title="Robust telemetry to safeguard your global operations."
        subtitle="Built for sub-10ms threat inspection, cryptographic audit trails, and 99.999% multi-region availability."
        metrics={[
          { label: "Protected endpoints", value: "60 M+" },
          { label: "Threats neutralized", value: "8950" },
          { label: "Mean inspection", value: "0.4 ms" },
          { label: "Compliance pass", value: "100 %" },
        ]}
        image={PEXELS.project4}
      />

      {/* 6. Cryptographic Compliance & Sovereignty Guarantees */}
      <HbSection tone="light">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-5">
            <span className={HB.chip}>
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              <span>Continuous Compliance</span>
            </span>
            <h2 className={HB.h2}>Hardware-attested security built for regulated enterprises</h2>
            <p className={HB.lead}>
              From sovereign financial enclaves to healthcare AI pipelines, every packet and model
              weight is verified with zero-knowledge cryptographic proofs.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <PillLink href="/demos/cyber-shield/security" variant="brand" size="md">
                View compliance center
              </PillLink>
              <PillLink href="/demos/cyber-shield/pricing" variant="ghost" size="md">
                Compare enterprise plans
              </PillLink>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
            {[
              {
                icon: Lock,
                title: "SOC2 Type II & ISO 42001",
                desc: "Continuous automated control monitoring with real-time auditor read-only portals.",
                tag: "Verified",
              },
              {
                icon: Cpu,
                title: "Confidential GPU Enclaves",
                desc: "Model weights and customer prompts remain encrypted in-memory during inference.",
                tag: "Hardware TEE",
              },
              {
                icon: Activity,
                title: "Immutable Audit Ledger",
                desc: "Every policy decision and token generation is cryptographically signed and indexed.",
                tag: "Tamper-Proof",
              },
              {
                icon: CheckCircle2,
                title: "99.999% Zero-Downtime SLA",
                desc: "Multi-region anycast failover with contractual financial backing for enterprise tiers.",
                tag: "Tier-1 SLA",
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="flex rounded-[28px] border border-black/[0.06] bg-[#ECEEF4] p-1.5 dark:border-white/10 dark:bg-white/[0.04]"
                >
                  <div className="flex w-full flex-col justify-between space-y-4 rounded-[22px] border border-black/[0.05] bg-white p-6 dark:border-white/10 dark:bg-[#14171F]">
                    <div className="flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0D0F14] text-[#C8F560] dark:bg-white/10">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-semibold text-zinc-700 dark:bg-white/10 dark:text-zinc-300">
                        {card.tag}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-zinc-900 dark:text-white">
                        {card.title}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </HbSection>

      {/* 7. Footer */}
      <SplitTextCtaFooter data={niche.sections.footer} />
    </div>
  );
};

export default CyberShieldNicheHome;
