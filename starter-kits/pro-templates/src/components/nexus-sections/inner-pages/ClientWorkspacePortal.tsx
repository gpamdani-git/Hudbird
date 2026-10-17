// starter-kits/pro-templates/src/components/nexus-sections/inner-pages/ClientWorkspacePortal.tsx
"use client";

import React, { useState } from "react";
import { Reveal } from "../ScrollReveal";
import {
  Check,
  Send,
  MessageSquare,
  ShieldCheck,
  FileCheck,
  Activity,
  Sparkles,
  Clock,
} from "lucide-react";
import { getDomainContent } from "./domainContent";
import { HB, HbSection, HbHeader, HbImage } from "../HudbirdKit";
import { PEXELS } from "../HudbirdVisualWidgets";

export const ClientWorkspacePortal: React.FC<{
  nicheSlug?: string;
}> = ({ nicheSlug = "digital-agency" }) => {
  const domainData = getDomainContent(nicheSlug);
  const portalInfo = domainData.portal;

  const [deliverables, setDeliverables] = useState(portalInfo.deliverables);
  const [ticketSent, setTicketSent] = useState(false);
  const [ticketText, setTicketText] = useState("");

  const toggleSignOff = (id: string) => {
    setDeliverables((prev) =>
      prev.map((d) => (d.id === id ? { ...d, signedOff: !d.signedOff } : d))
    );
  };

  const completedCount = deliverables.filter((d) => d.status === "Shipped" || d.signedOff).length;
  const progressPercent = Math.round((completedCount / deliverables.length) * 100);

  return (
    <HbSection id="client-portal" tone="muted">
      <HbHeader
        badge={portalInfo.hudBadge || "Client Portal"}
        title={portalInfo.sprintTitle}
        subtitle="Track sprint milestones, review staging deployments, and sign off on production deliverables in real time."
        align="left"
        action={
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2.5">
              {PEXELS.avatars.slice(0, 3).map((src, i) => (
                <HbImage
                  key={i}
                  src={src}
                  alt="Pod member"
                  fallbackIndex={i}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-[#F4F5F8] dark:ring-[#0B0C10]"
                />
              ))}
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#C8F560] px-4 py-2 text-xs font-semibold text-[#0D0F14] shadow-sm">
              <span className="h-2 w-2 animate-ping rounded-full bg-[#0D0F14]" />
              Live Deployment Active
            </span>
          </div>
        }
      />

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        {/* Left Column (8 cols): Burndown + Deliverables */}
        <div className="space-y-8 lg:col-span-8">
          {/* Dark SaaS Burndown Card */}
          <Reveal>
            <div className={`${HB.cardDark} space-y-7 p-7 sm:p-9`}>
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#C8F560] text-[#0D0F14]">
                    <Activity className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-white/60">
                      Production Velocity & Acceptance
                    </span>
                    <h3 className="text-lg font-semibold text-white">Active Sprint Burndown</h3>
                  </div>
                </div>
                <span className="rounded-full bg-[#C8F560] px-4 py-1.5 text-sm font-bold text-[#0D0F14] tabular-nums">
                  {progressPercent}% Shipped
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-3">
                <div className="h-3.5 w-full overflow-hidden rounded-full bg-white/10 p-0.5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#C8F560] to-[#7EE7EE] transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs font-medium text-white/60">
                  <span>Phase Gate Status</span>
                  <span className="font-semibold text-white tabular-nums">
                    {completedCount} of {deliverables.length} Gates Verified
                  </span>
                </div>
              </div>

              {/* 4 Metric Mini Cards */}
              <div className="grid grid-cols-2 gap-4 pt-2 sm:grid-cols-4">
                {portalInfo.activeMetrics.map((m, idx) => {
                  const accentColors = [
                    "bg-[#C8F560]/15 text-[#C8F560] border-[#C8F560]/25",
                    "bg-[#7EE7EE]/15 text-[#7EE7EE] border-[#7EE7EE]/25",
                    "bg-[#A78BFA]/15 text-[#A78BFA] border-[#A78BFA]/25",
                    "bg-white/10 text-white border-white/15",
                  ];
                  return (
                    <div
                      key={idx}
                      className={`rounded-2xl border p-4 ${accentColors[idx % 4]} space-y-1`}
                    >
                      <span className="block truncate text-[11px] font-medium opacity-80">
                        {m.label}
                      </span>
                      <p className="text-xl font-bold text-white tabular-nums">{m.value}</p>
                      <span className="block truncate text-[11px] text-white/60">{m.subtext}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* Deliverables Sign-Off Checklist */}
          <Reveal delay={0.1}>
            <div className={`${HB.card} space-y-6 p-7 sm:p-9`}>
              <div className="flex items-center justify-between border-b border-black/[0.06] pb-5 dark:border-white/[0.08]">
                <div>
                  <h3 className={`text-xl font-semibold ${HB.ink}`}>
                    Technical Deliverables Sign-Off
                  </h3>
                  <p className={`text-xs ${HB.ink3} mt-1`}>
                    Click any milestone checkbox to toggle formal acceptance
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F4F5F8] text-[color:var(--brand-primary)] dark:bg-white/[0.06]">
                  <FileCheck className="h-5 w-5" />
                </div>
              </div>

              <div className="space-y-3">
                {deliverables.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleSignOff(item.id)}
                    className={`flex cursor-pointer items-start justify-between gap-4 rounded-2xl border p-4 transition-all sm:items-center sm:p-5 ${
                      item.signedOff
                        ? "border-[#C8F560]/40 bg-[#C8F560]/12 dark:bg-[#C8F560]/10"
                        : "border-black/[0.06] bg-[#F4F5F8]/70 hover:border-black/15 dark:border-white/[0.08] dark:bg-white/[0.03]"
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSignOff(item.id);
                        }}
                        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors ${
                          item.signedOff
                            ? "bg-[#C8F560] text-[#0D0F14]"
                            : "border-2 border-black/20 bg-white text-transparent dark:border-white/25 dark:bg-[#14171F]"
                        }`}
                      >
                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                      </button>

                      <div className="space-y-1">
                        <p
                          className={`text-sm font-semibold sm:text-base ${
                            item.signedOff ? `${HB.ink} line-through opacity-75` : HB.ink
                          }`}
                        >
                          {item.title}
                        </p>
                        <p className={`text-xs font-medium ${HB.ink3}`}>{item.phase}</p>
                      </div>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold ${
                        item.status === "Shipped" || item.signedOff
                          ? "bg-[#C8F560] text-[#0D0F14]"
                          : "bg-[#7EE7EE]/25 text-[#0D0F14] dark:text-[#7EE7EE]"
                      }`}
                    >
                      {item.signedOff ? "Accepted" : item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column (4 cols): Direct Studio Pod Hotline & Fast-Track Ticket */}
        <div className="space-y-8 lg:col-span-4">
          {/* Neon Lime Direct Escalation Card */}
          <Reveal delay={0.12}>
            <div className={`${HB.cardLime} space-y-6 p-7`}>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#0D0F14] px-3.5 py-1.5 text-xs font-semibold text-[#C8F560]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Direct Studio Pod
                </span>
                <span className="flex items-center gap-1 text-xs font-bold text-[#0D0F14]/70">
                  <Clock className="h-3.5 w-3.5" />
                  &lt; 15m SLA
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between rounded-2xl bg-[#1A1C20] p-3.5 text-white">
                  <span className="text-xs text-white/60">Slack Channel</span>
                  <span className="text-xs font-semibold text-[#C8F560]">
                    {domainData.contact.channel}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-[#1A1C20] p-3.5 text-white">
                  <span className="text-xs text-white/60">Principal Lead</span>
                  <span className="max-w-[160px] truncate text-xs font-semibold text-white">
                    {domainData.contact.email}
                  </span>
                </div>
              </div>

              <a
                href={`mailto:${domainData.contact.email}`}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#0D0F14] py-3.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
              >
                <MessageSquare className="h-4 w-4 text-[#C8F560]" />
                Open Direct Slack Bridge
              </a>
            </div>
          </Reveal>

          {/* Fast-Track Milestone Ticket Card */}
          <Reveal delay={0.18}>
            <div className={`${HB.card} space-y-5 p-7`}>
              <div className="space-y-1">
                <span className={HB.chip}>Fast-Track Request</span>
                <h4 className={`text-lg font-semibold ${HB.ink} pt-2`}>Submit Milestone Ticket</h4>
                <p className={`text-xs ${HB.ink2}`}>
                  Routes directly to your dedicated principal architect.
                </p>
              </div>

              {ticketSent ? (
                <div className="space-y-2 rounded-2xl border border-[#C8F560] bg-[#C8F560]/20 p-6 text-center">
                  <p className={`text-sm font-bold ${HB.ink}`}>✓ Ticket #9481 Dispatched</p>
                  <p className={`text-xs ${HB.ink2}`}>
                    Your principal architect will respond in Slack within 15 minutes.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (ticketText) setTicketSent(true);
                  }}
                  className="space-y-3"
                >
                  <textarea
                    rows={3}
                    required
                    value={ticketText}
                    onChange={(e) => setTicketText(e.target.value)}
                    placeholder="Describe scope update, staging feedback, or PR request..."
                    className={`w-full rounded-2xl border border-black/10 bg-[#F4F5F8] p-4 text-xs dark:border-white/10 dark:bg-white/[0.04] ${HB.ink} focus:border-[color:var(--brand-primary)] focus:outline-none`}
                  />
                  <button
                    type="submit"
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#0D0F14] py-3.5 text-xs font-semibold text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-[#0D0F14]"
                  >
                    <Send className="h-3.5 w-3.5" />
                    Submit Priority Ticket
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </HbSection>
  );
};
