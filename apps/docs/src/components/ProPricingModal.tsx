import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  Check,
  Sparkles,
  X,
  Zap,
  ShieldCheck,
  ArrowRight,
  Crown,
  Users,
  Gift,
  Star,
} from "lucide-react";
import { trackEvent } from "../lib/analytics";
import { motion, AnimatePresence } from "framer-motion";

interface ProPricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlan?: "single" | "all-access" | "agency";
}

/* ─────────────────────────────────────────────
   Plan data
   ───────────────────────────────────────────── */
const PLANS = {
  single: {
    name: "SaaS Launchpad + CMS",
    tagline: "Production-ready SaaS starter kit",
    price: "$99",
    originalPrice: "$149",
    period: "one-time",
    icon: <Star className="h-5 w-5" />,
    cta: "Get SaaS Launchpad",
    checkoutUrl: "https://hudbirdui.lemonsqueezy.com/checkout/buy/985b3a9c-e686-44f4-bd2c-42d3c177d374",
    features: [
      "SaaS Launchpad full repository",
      "Premium Admin Dashboard UI",
      "React, Vite & Tailwind CSS v4",
      "Commercial license (1 project)",
      "Priority Customer Support",
    ],
  },
  "all-access": {
    name: "All-Access Pass",
    tagline: "Every template + future releases",
    price: "$249",
    originalPrice: "$399",
    period: "lifetime",
    icon: <Zap className="h-5 w-5" />,
    cta: "Join Waitlist",
    checkoutUrl: "mailto:gpamdani@gmail.com?subject=Waitlist%20for%20Hudbird%20Pro%20All-Access&body=Hi%20Dani%2C%0A%0AI%20would%20like%20to%20join%20the%20waitlist%20for%20the%20Hudbird%20Pro%20All-Access%20Pass.%0A%0AThanks!",
    badge: "Best Value",
    features: [
      "All 9+ Production Templates",
      "Premium Admin Dashboard UI",
      "All Marketing & Bento Grid Blocks",
      "Unlimited Personal & Client Projects",
      "All future templates — FREE forever",
      "Priority Customer Support",
    ],
  },
  agency: {
    name: "Agency / Team",
    tagline: "For teams, agencies & studios",
    price: "$499",
    originalPrice: "$799",
    period: "lifetime",
    icon: <Users className="h-5 w-5" />,
    cta: "Join Waitlist",
    checkoutUrl: "mailto:gpamdani@gmail.com?subject=Waitlist%20for%20Hudbird%20Pro%20Agency&body=Hi%20Dani%2C%0A%0AI%20would%20like%20to%20join%20the%20waitlist%20for%20the%20Hudbird%20Pro%20Agency%20License.%0A%0AThanks!",
    features: [
      "Everything in All-Access Pass",
      "Up to 10 team seats",
      "Unlimited client handovers",
      "Priority support & private Discord",
    ],
  },
} as const;

type PlanKey = keyof typeof PLANS;

/* ─────────────────────────────────────────────
   Modal Component
   ───────────────────────────────────────────── */
export const ProPricingModal: React.FC<ProPricingModalProps> = ({
  isOpen,
  onClose,
  defaultPlan = "all-access",
}) => {
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>(defaultPlan);

  const panelRef = useRef<HTMLDivElement>(null);

  // Reset plan on open
  useEffect(() => {
    if (isOpen) {
      setSelectedPlan(defaultPlan);
    }
  }, [isOpen, defaultPlan]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleCheckout = (planKey: PlanKey) => {
    const plan = PLANS[planKey];
    trackEvent("pro_checkout_click", {
      plan: plan.name,
      price: plan.price,
    });
    window.open(plan.checkoutUrl, "_blank");
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Pro Pricing"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
            className="relative z-10 w-full max-w-[920px]"
          >
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a14] shadow-2xl shadow-blue-950/30">
          {/* ── Header ── */}
          <div className="relative overflow-hidden px-6 pt-8 pb-6 text-center sm:px-8">
            {/* Ambient glow */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -top-1/2 left-1/2 h-full w-[600px] -translate-x-1/2 rounded-full bg-blue-600/15 blur-[100px]" />
              <div className="absolute -top-1/3 left-1/3 h-1/2 w-[300px] rounded-full bg-indigo-500/10 blur-[80px]" />
            </div>

            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 transition-all hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Badge */}
            <div className="relative inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1.5 text-xs font-semibold text-blue-400">
              <Gift className="h-3.5 w-3.5" />
              Early Bird Launch — Save 40%
            </div>

            {/* Title */}
            <h2 className="relative mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Unlock{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Hudbird Pro
              </span>
            </h2>
            <p className="relative mx-auto mt-2 max-w-md text-sm leading-relaxed text-zinc-400">
              Skip weeks of design and coding. Get production-ready templates,
              premium UI components, and beautiful Admin Dashboard layouts.
            </p>
          </div>

          {/* ── Pricing Cards ── */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
            }}
            className="grid grid-cols-1 gap-3 px-4 pb-4 sm:px-6 sm:pb-6 md:grid-cols-3 md:gap-4"
          >
            {(Object.keys(PLANS) as PlanKey[]).map((key) => {
              const plan = PLANS[key];
              const isSelected = selectedPlan === key;
              const isPopular = key === "all-access";

              return (
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.3 } }
                  }}
                  key={key}
                  onClick={() => setSelectedPlan(key)}
                  className={`relative flex cursor-pointer flex-col justify-between rounded-2xl border p-5 transition-all duration-200 ${
                    isPopular
                      ? isSelected
                        ? "border-blue-500 bg-gradient-to-b from-blue-500/10 to-transparent ring-2 ring-blue-500/30"
                        : "border-blue-500/30 bg-blue-500/[0.03] hover:border-blue-500/50"
                      : isSelected
                        ? "border-white/20 bg-white/[0.04] ring-2 ring-white/10"
                        : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]"
                  }`}
                >
                  {/* Popular badge */}
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-600/30">
                        <Crown className="h-3 w-3" />
                        Best Value
                      </div>
                    </div>
                  )}

                  <div>
                    {/* Plan icon & name */}
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                          isPopular
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-white/5 text-zinc-400"
                        }`}
                      >
                        {plan.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">
                          {plan.name}
                        </h3>
                        <p className="text-[11px] text-zinc-500">
                          {plan.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mt-5 flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold tracking-tight text-white">
                        {plan.price}
                      </span>
                      {plan.originalPrice && (
                        <span className="text-sm text-zinc-500 line-through">
                          {plan.originalPrice}
                        </span>
                      )}
                      <span className="text-xs text-zinc-500">
                        / {plan.period}
                      </span>
                    </div>

                    {/* Features */}
                    <ul className="mt-5 space-y-2.5">
                      {plan.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-[13px] leading-snug text-zinc-300"
                        >
                          <Check
                            className={`mt-0.5 h-4 w-4 shrink-0 ${
                              isPopular
                                ? "text-blue-400"
                                : "text-emerald-500"
                            }`}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCheckout(key);
                    }}
                    className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0a0a14] ${
                      isPopular
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/25 hover:from-blue-500 hover:to-indigo-500"
                        : isSelected
                          ? "bg-white text-zinc-950 hover:bg-zinc-200"
                          : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </motion.div>
              );
            })}
          </motion.div>

          {/* ── Footer ── */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/5 bg-white/[0.02] px-6 py-3.5 text-xs text-zinc-500">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span>Secure checkout</span>
              </div>
              <span className="hidden text-zinc-700 sm:inline">•</span>
              <span className="hidden sm:inline">
                One-time payment — no subscription
              </span>
              <span className="hidden text-zinc-700 sm:inline">•</span>
              <span className="hidden sm:inline">Instant download</span>
            </div>
            <a
              href="mailto:support@hudbird.com"
              className="text-zinc-500 underline decoration-zinc-700 underline-offset-2 transition-colors hover:text-white"
            >
              Need custom licensing?
            </a>
          </div>
        </div>
        </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
