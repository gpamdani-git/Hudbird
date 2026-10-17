// starter-kits/pro-templates/src/components/nexus-sections/inner-pages/HudbirdAuthUtilityViews.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { NicheConfig } from "@hudbird/schemas";
import { Container, Reveal } from "../ScrollReveal";
import { HB, HbImage } from "../HudbirdKit";
import { PEXELS } from "../HudbirdVisualWidgets";
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  KeyRound,
  CheckCircle2,
  Eye,
  EyeOff,
  Fingerprint,
  Sparkles,
  RefreshCw,
  Server,
  Clock,
  AlertCircle,
  UserPlus,
} from "lucide-react";

export type HudbirdAuthMode = "sign-in" | "sign-up" | "forgot-password" | "otp" | "maintenance";

export interface HudbirdAuthUtilityViewProps {
  niche: NicheConfig;
  initialMode: HudbirdAuthMode;
}

export const HudbirdAuthUtilityView: React.FC<HudbirdAuthUtilityViewProps> = ({
  niche,
  initialMode,
}) => {
  const [mode, setMode] = useState<HudbirdAuthMode>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("alex.rivera@hudbirdui.com");
  const [password, setPassword] = useState("••••••••••••");
  const [fullName, setFullName] = useState("Alex Rivera");
  const [workspaceName, setWorkspaceName] = useState(`${niche.name} Studio`);
  const [submittedState, setSubmittedState] = useState<string | null>(null);

  // 6-digit interactive OTP state
  const [otpDigits, setOtpDigits] = useState<string[]>(["4", "8", "2", "9", "", ""]);
  const [resendSeconds, setResendSeconds] = useState<number>(42);
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    setMode(initialMode);
    setSubmittedState(null);
  }, [initialMode]);

  useEffect(() => {
    if (mode !== "otp") return;
    const timer = setInterval(() => {
      setResendSeconds((prev) => (prev > 0 ? prev - 1 : 45));
    }, 1000);
    return () => clearInterval(timer);
  }, [mode]);

  const handleOtpChange = (index: number, val: string) => {
    const clean = val.replace(/[^0-9]/g, "").slice(-1);
    const next = [...otpDigits];
    next[index] = clean;
    setOtpDigits(next);
    if (clean && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "sign-in") {
      setSubmittedState("Authenticated via SSO + Hardware Passkey. Redirecting to workspace...");
    } else if (mode === "sign-up") {
      setMode("otp");
      setSubmittedState("Verification code dispatched to your inbox.");
    } else if (mode === "forgot-password") {
      setSubmittedState(`Encrypted password recovery link sent to ${email}`);
    } else if (mode === "otp") {
      setSubmittedState("2FA Token Verified! Hardware session established.");
    }
  };

  const authModes: { id: HudbirdAuthMode; label: string }[] = [
    { id: "sign-in", label: "Sign In / Login" },
    { id: "sign-up", label: "Create Account" },
    { id: "forgot-password", label: "Forgot Password" },
    { id: "otp", label: "OTP 2FA Verify" },
    { id: "maintenance", label: "System Maintenance" },
  ];

  const showcaseImage =
    niche.slug.includes("ai") || niche.slug.includes("neural")
      ? PEXELS.vrPortrait
      : niche.slug.includes("fintech") || niche.slug.includes("financial")
        ? PEXELS.villaHero
        : niche.slug.includes("cyber") || niche.slug.includes("security")
          ? PEXELS.neuralBrain
          : PEXELS.studioTeam;

  return (
    <section className="relative overflow-hidden bg-[#F4F5F8] py-12 transition-colors duration-300 sm:py-20 dark:bg-[#0B0C10]">
      <Container>
        {/* Top Interactive Mode Switcher Bar so User Can Inspect All Auth & Utility Views */}
        <div className="mb-10 flex flex-col justify-between gap-4 rounded-[28px] border border-black/[0.06] bg-white p-3.5 sm:flex-row sm:items-center dark:border-white/10 dark:bg-[#14161D]">
          <div className="flex items-center gap-2.5 pl-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#C8F560] text-[#0D0F14]">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <div>
              <div className="text-xs font-semibold text-zinc-900 dark:text-white">
                HudbirdUI Identity & Utility Suite · {niche.name}
              </div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Switch between Auth, 2FA OTP, Recovery & Utility screens below
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {authModes.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  setMode(m.id);
                  setSubmittedState(null);
                }}
                className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  mode === m.id
                    ? "bg-[#C8F560] text-[#0D0F14] shadow-xs"
                    : "bg-[#F4F5F8] text-zinc-600 hover:text-zinc-900 dark:bg-white/5 dark:text-zinc-300 dark:hover:text-white"
                }`}
              >
                {m.label}
              </button>
            ))}
            <Link
              to={`/demos/${niche.slug}/privacy`}
              className="rounded-full border border-black/[0.08] px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-100 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-white/10"
            >
              Privacy
            </Link>
            <Link
              to={`/demos/${niche.slug}/coming-soon`}
              className="rounded-full border border-black/[0.08] px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-100 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-white/10"
            >
              Coming Soon
            </Link>
          </div>
        </div>

        {/* Main Split Double-Bezel Layout */}
        {mode === "maintenance" ? (
          /* SYSTEM MAINTENANCE & LIVE TELEMETRY VIEW */
          <Reveal y={18}>
            <div className={HB.bezel}>
              <div className="grid grid-cols-1 gap-8 rounded-[26px] border border-black/[0.06] bg-white p-6 sm:p-12 lg:grid-cols-12 lg:items-center dark:border-white/10 dark:bg-[#12141C]">
                <div className="space-y-6 lg:col-span-7">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#C8F560] px-4 py-1.5 text-xs font-bold text-[#0D0F14]">
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    Scheduled Zero-Downtime Upgrade · v4.2
                  </span>

                  <h1 className="text-[clamp(2rem,4vw,3.4rem)] leading-[1.06] font-semibold tracking-[-0.035em] text-zinc-900 dark:text-white">
                    We are upgrading the {niche.name} cluster infrastructure.
                  </h1>

                  <p className="max-w-xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                    Our engineering team is rolling out high-throughput edge nodes and hardware
                    encryption upgrades. All active workspaces and API webhooks remain queued and
                    protected.
                  </p>

                  {/* Cluster Node Telemetry */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {[
                      {
                        region: "US-East (Virginia)",
                        status: "Operational",
                        pct: "100%",
                        tone: "text-emerald-500",
                      },
                      {
                        region: "EU-Central (Frankfurt)",
                        status: "Migrating...",
                        pct: "84%",
                        tone: "text-[#C8F560]",
                      },
                      {
                        region: "AP-South (Singapore)",
                        status: "Operational",
                        pct: "100%",
                        tone: "text-emerald-500",
                      },
                    ].map((node) => (
                      <div
                        key={node.region}
                        className="rounded-2xl border border-black/[0.06] bg-[#F4F5F8] p-4 dark:border-white/10 dark:bg-white/[0.03]"
                      >
                        <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                          <span>{node.region}</span>
                          <Server className="h-3.5 w-3.5" />
                        </div>
                        <div className="mt-2 flex items-baseline justify-between">
                          <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                            {node.status}
                          </span>
                          <span className={`text-xs font-bold tabular-nums ${node.tone}`}>
                            {node.pct}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Link
                      to={`/demos/${niche.slug}`}
                      className="inline-flex items-center gap-2 rounded-full bg-[#C8F560] px-6 py-3 text-sm font-semibold text-[#0D0F14] shadow-sm transition-transform hover:scale-[1.02]"
                    >
                      <span>Return to {niche.name} Home</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => setMode("sign-in")}
                      className="cursor-pointer rounded-full border border-black/[0.08] px-5 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:border-white/15 dark:text-zinc-200 dark:hover:bg-white/5"
                    >
                      Admin Bypass Sign In
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="relative aspect-[4/4.2] overflow-hidden rounded-[24px] bg-zinc-900">
                    <HbImage
                      src={showcaseImage}
                      alt={niche.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/20 bg-black/65 p-4 text-white backdrop-blur-xl">
                      <div className="flex items-center justify-between text-xs text-[#C8F560]">
                        <span className="inline-flex items-center gap-1.5 font-semibold">
                          <Clock className="h-3.5 w-3.5" /> Estimated Completion
                        </span>
                        <span className="font-mono">14 mins remaining</span>
                      </div>
                      <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-white/15">
                        <div className="h-full w-[84%] rounded-full bg-[#C8F560]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        ) : (
          /* AUTHENTICATION SPLIT CARD: SIGN IN / SIGN UP / FORGOT PASSWORD / OTP */
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
            {/* Left 6 Cols: Interactive Double-Bezel Auth Card */}
            <div className="flex lg:col-span-6">
              <div className={`${HB.bezel} flex w-full`}>
                <div className="flex w-full flex-col justify-between rounded-[26px] border border-black/[0.06] bg-white p-6 sm:p-10 dark:border-white/10 dark:bg-[#12141C]">
                  <div>
                    {/* Top Brand Pill */}
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 rounded-full bg-[#C8F560] px-3.5 py-1 text-xs font-bold text-[#0D0F14]">
                        {mode === "sign-in" && (
                          <>
                            <Lock className="h-3.5 w-3.5" />
                            <span>Zero-Trust SSO</span>
                          </>
                        )}
                        {mode === "sign-up" && (
                          <>
                            <UserPlus className="h-3.5 w-3.5" />
                            <span>14-Day Pro Trial</span>
                          </>
                        )}
                        {mode === "forgot-password" && (
                          <>
                            <KeyRound className="h-3.5 w-3.5" />
                            <span>Account Recovery</span>
                          </>
                        )}
                        {mode === "otp" && (
                          <>
                            <Fingerprint className="h-3.5 w-3.5" />
                            <span>2FA Verification</span>
                          </>
                        )}
                      </span>

                      <span className="text-xs font-medium text-zinc-400">{niche.name} Portal</span>
                    </div>

                    {/* Dynamic Heading */}
                    <div className="mt-6 space-y-2">
                      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
                        {mode === "sign-in" && `Sign in to ${niche.name}`}
                        {mode === "sign-up" && `Create your ${niche.name} workspace`}
                        {mode === "forgot-password" && "Reset your security credentials"}
                        {mode === "otp" && "Enter 6-digit verification code"}
                      </h1>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {mode === "sign-in" &&
                          "Use your enterprise SSO passkey or work email to access live telemetry."}
                        {mode === "sign-up" &&
                          "Deploy pre-built workflows in under 60 seconds. No credit card required."}
                        {mode === "forgot-password" &&
                          "Enter the email associated with your workspace and we'll dispatch a one-time recovery link."}
                        {mode === "otp" &&
                          `We sent a 6-digit cryptographic code to ${email}. Enter it below to verify your session.`}
                      </p>
                    </div>

                    {/* Social / Passkey Quick Auth Buttons (for sign-in and sign-up) */}
                    {(mode === "sign-in" || mode === "sign-up") && (
                      <div className="mt-6 grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setSubmittedState("Connected with Google Workspace SSO!")}
                          className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-black/[0.08] bg-[#F4F5F8] px-4 py-3 text-xs font-semibold text-zinc-900 transition-colors hover:bg-zinc-200/70 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/10"
                        >
                          <Sparkles className="h-3.5 w-3.5 text-[#C8F560]" />
                          <span>Continue with Google</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setMode("otp")}
                          className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-black/[0.08] bg-[#F4F5F8] px-4 py-3 text-xs font-semibold text-zinc-900 transition-colors hover:bg-zinc-200/70 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/10"
                        >
                          <Fingerprint className="h-3.5 w-3.5 text-[#7EE7EE]" />
                          <span>Hardware Passkey / OTP</span>
                        </button>
                      </div>
                    )}

                    {/* Form Fields */}
                    <form onSubmit={handleFormSubmit} className="mt-6 space-y-4">
                      {mode === "sign-up" && (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <label className="mb-1.5 block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                              Full Name
                            </label>
                            <input
                              type="text"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              className={HB.input}
                              placeholder="Alex Rivera"
                              required
                            />
                          </div>
                          <div>
                            <label className="mb-1.5 block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                              Workspace Name
                            </label>
                            <input
                              type="text"
                              value={workspaceName}
                              onChange={(e) => setWorkspaceName(e.target.value)}
                              className={HB.input}
                              placeholder="Acme Corp"
                              required
                            />
                          </div>
                        </div>
                      )}

                      {mode !== "otp" && (
                        <div>
                          <label className="mb-1.5 block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                            Work Email Address
                          </label>
                          <div className="relative">
                            <Mail className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className={`${HB.input} pl-10`}
                              placeholder="you@company.com"
                              required
                            />
                          </div>
                        </div>
                      )}

                      {(mode === "sign-in" || mode === "sign-up") && (
                        <div>
                          <div className="mb-1.5 flex items-center justify-between">
                            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                              Password
                            </label>
                            {mode === "sign-in" && (
                              <button
                                type="button"
                                onClick={() => setMode("forgot-password")}
                                className="cursor-pointer text-xs font-semibold text-zinc-600 hover:underline dark:text-[#C8F560]"
                              >
                                Forgot password?
                              </button>
                            )}
                          </div>
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className={`${HB.input} pr-10`}
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute top-1/2 right-3.5 -translate-y-1/2 cursor-pointer text-zinc-400 hover:text-zinc-700 dark:hover:text-white"
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* 6-DIGIT INTERACTIVE OTP INPUT GRID */}
                      {mode === "otp" && (
                        <div className="space-y-4 pt-2">
                          <div className="grid grid-cols-6 gap-2.5 sm:gap-3">
                            {otpDigits.map((digit, idx) => (
                              <input
                                key={idx}
                                ref={(el) => {
                                  otpRefs.current[idx] = el;
                                }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleOtpChange(idx, e.target.value)}
                                onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                                className="h-14 w-full rounded-2xl border border-black/[0.1] bg-[#F4F5F8] text-center text-xl font-bold text-zinc-900 focus:border-[#C8F560] focus:ring-2 focus:ring-[#C8F560] focus:outline-none dark:border-white/15 dark:bg-white/[0.05] dark:text-white"
                              />
                            ))}
                          </div>

                          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                            <span>
                              Resend code in{" "}
                              <strong className="font-mono text-zinc-900 dark:text-[#C8F560]">
                                00:{resendSeconds.toString().padStart(2, "0")}
                              </strong>
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                setOtpDigits(["9", "1", "4", "0", "2", "7"]);
                                setSubmittedState("Auto-filled demo 2FA token: 914027");
                              }}
                              className="cursor-pointer font-semibold text-zinc-900 hover:underline dark:text-[#C8F560]"
                            >
                              Auto-fill demo OTP
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Primary Submit CTA */}
                      <button
                        type="submit"
                        className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#C8F560] px-6 py-3.5 text-sm font-bold text-[#0D0F14] shadow-[0_12px_30px_-8px_rgba(200,245,96,0.45)] transition-transform hover:scale-[1.01] active:scale-[0.99]"
                      >
                        <span>
                          {mode === "sign-in" && "Sign in to Workspace"}
                          {mode === "sign-up" && "Create Free Account"}
                          {mode === "forgot-password" && "Send Recovery Link"}
                          {mode === "otp" && "Verify 6-Digit Code"}
                        </span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </form>

                    {/* Interactive Status Feedback Banner */}
                    <AnimatePresence>
                      {submittedState && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          className="mt-4 flex items-center gap-2.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-xs font-medium text-emerald-700 dark:text-emerald-300"
                        >
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                          <span>{submittedState}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Bottom Mode Switch Links */}
                  <div className="mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-black/[0.06] pt-5 text-xs text-zinc-500 dark:border-white/10 dark:text-zinc-400">
                    {mode === "sign-in" ? (
                      <span>
                        New to {niche.name}?{" "}
                        <button
                          type="button"
                          onClick={() => setMode("sign-up")}
                          className="cursor-pointer font-semibold text-zinc-900 hover:underline dark:text-[#C8F560]"
                        >
                          Create an account →
                        </button>
                      </span>
                    ) : (
                      <span>
                        Already have an account?{" "}
                        <button
                          type="button"
                          onClick={() => setMode("sign-in")}
                          className="cursor-pointer font-semibold text-zinc-900 hover:underline dark:text-[#C8F560]"
                        >
                          Sign in →
                        </button>
                      </span>
                    )}

                    <Link
                      to={`/demos/${niche.slug}/privacy`}
                      className="hover:text-zinc-900 hover:underline dark:hover:text-white"
                    >
                      Privacy & SOC2 Terms
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 6 Cols: Editorial Pexels Visual Showcase + Live Security Telemetry Card */}
            <div className="flex lg:col-span-6">
              <div className={`${HB.bezel} flex w-full`}>
                <div className="relative flex min-h-[480px] w-full flex-col justify-between overflow-hidden rounded-[26px] bg-zinc-950 p-7 text-white sm:p-10">
                  <HbImage
                    src={showcaseImage}
                    alt={niche.name}
                    className="absolute inset-0 h-full w-full object-cover opacity-65 transition-transform duration-1000 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/55 to-zinc-950/20" />

                  {/* Top Floating Security Badge */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                      <span className="h-2 w-2 rounded-full bg-[#C8F560]" />
                      SOC2 Type II · End-to-End Encrypted
                    </span>
                    <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold backdrop-blur-md">
                      {niche.theme.mode.toUpperCase()} THEME
                    </span>
                  </div>

                  {/* Bottom Frosted Glass Testimonial + Telemetry Widget */}
                  <div className="relative z-10 space-y-4">
                    <div className="rounded-[24px] border border-white/20 bg-black/60 p-6 backdrop-blur-xl">
                      <p className="text-base leading-relaxed font-medium text-white/95">
                        “Switching our product workflows to {niche.name} cut onboarding time by 68%
                        while giving every enterprise client hardware-verified 2FA out of the box.”
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={PEXELS.avatars[0]}
                            alt=" Elena Rostova"
                            className="h-10 w-10 rounded-full object-cover ring-2 ring-[#C8F560]"
                          />
                          <div>
                            <div className="text-xs font-semibold text-white">Elena Rostova</div>
                            <div className="text-[11px] text-zinc-300">
                              VP of Platform Engineering · {niche.name}
                            </div>
                          </div>
                        </div>
                        <span className="rounded-full bg-[#C8F560] px-3 py-1 text-[11px] font-bold text-[#0D0F14]">
                          99.99% SLA
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};
