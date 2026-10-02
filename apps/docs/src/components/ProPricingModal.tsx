import React, { useState } from "react";
import { Dialog, DialogContent, Button, Badge } from "@hudbird/ui";
import { Check, Sparkles, X, Zap, ShieldCheck, ArrowRight, HelpCircle } from "lucide-react";
import { trackEvent } from "../lib/analytics";

interface ProPricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlan?: "single" | "all-access" | "agency";
}

export const ProPricingModal: React.FC<ProPricingModalProps> = ({
  isOpen,
  onClose,
  defaultPlan = "all-access",
}) => {
  const [selectedPlan, setSelectedPlan] = useState<"single" | "all-access" | "agency">(defaultPlan);

  const handleCheckout = (planName: string, price: string) => {
    trackEvent("pro_checkout_click", {
      plan: planName,
      price: price,
    });

    // You can update this URL to your LemonSqueezy or Gumroad checkout link
    // e.g. window.open("https://hudbird.lemonsqueezy.com/buy/...", "_blank");
    window.open("https://github.com/gpamdani-git/Hudbird-UI-Discus", "_blank");
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} size="lg">
      <DialogContent className="max-w-4xl overflow-hidden rounded-3xl border border-zinc-200 bg-white p-0 shadow-2xl dark:border-white/10 dark:bg-zinc-950">
        {/* Modal Top Banner with Ambient Glow */}
        <div className="relative overflow-hidden border-b border-zinc-200 bg-gradient-to-b from-blue-50/50 via-zinc-50 to-white px-6 pt-8 pb-6 text-center dark:border-white/10 dark:from-blue-950/20 dark:via-zinc-900/40 dark:to-zinc-950">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-200/60 dark:hover:bg-white/10 dark:hover:text-white"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50/80 px-3 py-1 text-xs font-semibold text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/50 dark:text-blue-300">
            <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span>Early Bird Launch • Save 40%</span>
          </div>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
            Unlock{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
              Hudbird Pro
            </span>{" "}
            All-Access
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-zinc-600 dark:text-zinc-400">
            Skip weeks of design and coding. Get instant access to 9+ production templates, the
            visual Admin CMS Builder, and ready-to-deploy Next.js & Vite source code repositories.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-3 md:gap-5">
          {/* Card 1: Single Template */}
          <div
            onClick={() => setSelectedPlan("single")}
            className={`relative flex cursor-pointer flex-col justify-between rounded-2xl border p-5 transition-all ${
              selectedPlan === "single"
                ? "border-zinc-900 bg-zinc-50/80 ring-2 ring-zinc-900/10 dark:border-white dark:bg-white/[0.04] dark:ring-white/20"
                : "border-zinc-200 hover:border-zinc-300 dark:border-white/10 dark:hover:border-white/20"
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-zinc-900 dark:text-white">Single Template</h3>
              </div>
              <p className="mt-1 text-xs text-zinc-500">Pick any 1 full template repo</p>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                  $29
                </span>
                <span className="text-xs text-zinc-500">/ one-time</span>
              </div>

              <ul className="mt-5 space-y-2.5 text-xs text-zinc-600 dark:text-zinc-300">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
                  <span>1 Template full source repository</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
                  <span>Next.js & Vite clean starter</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
                  <span>Commercial license (1 project)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
                  <span>Lifetime template updates</span>
                </li>
              </ul>
            </div>

            <Button
              variant={selectedPlan === "single" ? "primary" : "outline"}
              className="mt-6 w-full text-xs font-semibold"
              onClick={() => handleCheckout("Single Template", "$29")}
            >
              Get Single Template
            </Button>
          </div>

          {/* Card 2: All-Access Pass (Highlighted) */}
          <div
            onClick={() => setSelectedPlan("all-access")}
            className={`relative flex cursor-pointer flex-col justify-between rounded-2xl border-2 p-5 shadow-xl transition-all ${
              selectedPlan === "all-access"
                ? "border-blue-600 bg-gradient-to-b from-blue-50/50 to-white ring-4 ring-blue-500/10 dark:border-blue-500 dark:from-blue-950/20 dark:to-zinc-950 dark:ring-blue-500/20"
                : "border-blue-500/60 hover:border-blue-500 dark:border-blue-500/40"
            }`}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-0.5 text-[10px] font-bold tracking-wider text-white uppercase shadow-md">
              Most Popular • Early Bird
            </div>

            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-zinc-900 dark:text-white">All-Access Pass</h3>
                <Badge variant="primary" size="sm" className="font-bold">
                  Save $30
                </Badge>
              </div>
              <p className="mt-1 text-xs text-zinc-500">Every template & future releases</p>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                  $49
                </span>
                <span className="text-xs text-zinc-400 line-through">$79</span>
                <span className="text-xs text-zinc-500">/ lifetime</span>
              </div>

              <ul className="mt-5 space-y-2.5 text-xs text-zinc-700 dark:text-zinc-200">
                <li className="flex items-center gap-2 font-medium">
                  <Zap className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
                  <span>All 9+ Production Templates</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
                  <span>Admin CMS Builder & Visual Site Editor</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
                  <span>All Marketing & Bento Grid Blocks</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
                  <span>Unlimited Personal & Client Projects</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
                  <span>All future templates added for FREE</span>
                </li>
              </ul>
            </div>

            <Button
              variant="primary"
              className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-xs font-semibold text-white shadow-lg shadow-blue-500/25 hover:from-blue-700 hover:to-indigo-700"
              onClick={() => handleCheckout("All-Access Pass", "$49")}
            >
              Get All-Access ($49) <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </div>

          {/* Card 3: Agency License */}
          <div
            onClick={() => setSelectedPlan("agency")}
            className={`relative flex cursor-pointer flex-col justify-between rounded-2xl border p-5 transition-all ${
              selectedPlan === "agency"
                ? "border-zinc-900 bg-zinc-50/80 ring-2 ring-zinc-900/10 dark:border-white dark:bg-white/[0.04] dark:ring-white/20"
                : "border-zinc-200 hover:border-zinc-300 dark:border-white/10 dark:hover:border-white/20"
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-zinc-900 dark:text-white">Agency / Team</h3>
              </div>
              <p className="mt-1 text-xs text-zinc-500">For teams, agencies & studios</p>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                  $199
                </span>
                <span className="text-xs text-zinc-500">/ lifetime</span>
              </div>

              <ul className="mt-5 space-y-2.5 text-xs text-zinc-600 dark:text-zinc-300">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
                  <span>Up to 10 team seats</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
                  <span>Everything in All-Access Pass</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
                  <span>Unlimited client handovers</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
                  <span>Private Discord channel & priority support</span>
                </li>
              </ul>
            </div>

            <Button
              variant={selectedPlan === "agency" ? "primary" : "outline"}
              className="mt-6 w-full text-xs font-semibold"
              onClick={() => handleCheckout("Agency / Team", "$199")}
            >
              Get Agency License
            </Button>
          </div>
        </div>

        {/* Footer Guarantee */}
        <div className="flex flex-wrap items-center justify-between border-t border-zinc-200 bg-zinc-50/80 px-6 py-3.5 text-xs text-zinc-500 dark:border-white/10 dark:bg-white/[0.02] dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>One-time payment • No recurring subscription • Instant access</span>
          </div>
          <div className="flex items-center gap-1.5">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>
              Need custom licensing?{" "}
              <a
                href="mailto:support@hudbird.com"
                className="underline hover:text-zinc-900 dark:hover:text-white"
              >
                Contact us
              </a>
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
