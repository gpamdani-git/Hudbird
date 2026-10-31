import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  ArrowRight,
  Check,
  Copy,
  Terminal,
  Layers,
  Sliders,
  Palette,
  Search,
  CheckCircle2,
} from "lucide-react";
import { Button, Badge, Input } from "@hudbird/ui";

export function HeroComponentShowcase() {
  const [activeTab, setActiveTab] = useState<"preview" | "cli" | "tokens">("preview");
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const [copiedCli, setCopiedCli] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const cliCommand = "pnpm dlx hudbird-ui@latest init";

  const handleCopy = () => {
    navigator.clipboard?.writeText(cliCommand);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  return (
    <div className="relative mx-auto w-full max-w-5xl">
      {/* Outer Double-Bezel Frame */}
      <div className="relative rounded-2xl border border-zinc-200/80 bg-zinc-100/80 p-1.5 backdrop-blur-md dark:border-white/10 dark:bg-[#1C1C1F]">
        {/* Inner Surface with Concentric Radius */}
        <div className="relative overflow-hidden rounded-[14px] border border-zinc-200/60 bg-white dark:border-white/5 dark:bg-[#161618]">
          {/* Top Window Navigation Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200/70 bg-zinc-50/80 px-4 py-3 sm:px-6 dark:border-white/5 dark:bg-[#1A1A1D]">
            {/* Left: Window Controls & Breadcrumb */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              </div>
              <span className="h-4 w-px bg-zinc-200 dark:bg-white/10" />
              <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                <Layers className="text-primary h-3.5 w-3.5" />
                <span className="font-mono text-[11px] text-zinc-800 dark:text-zinc-200">
                  @hudbird/ui
                </span>
                <span className="text-zinc-400">/</span>
                <span className="font-mono text-[11px] text-zinc-500">workbench.tsx</span>
              </div>
            </div>

            {/* Center: Interactive Tabs */}
            <div className="flex items-center rounded-lg border border-zinc-200/80 bg-zinc-200/40 p-0.5 dark:border-white/10 dark:bg-white/5">
              {(
                [
                  { id: "preview", label: "Interactive UI", icon: Sliders },
                  { id: "cli", label: "CLI Generator", icon: Terminal },
                  { id: "tokens", label: "Tokens", icon: Palette },
                ] as const
              ).map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                      isActive
                        ? "bg-white text-zinc-900 shadow-xs dark:bg-[#202124] dark:text-white"
                        : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                    }`}
                  >
                    <Icon className="h-3 w-3" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Right: Optical Verified Indicator */}
            <div className="hidden items-center gap-2 sm:flex">
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-2.5 w-2.5" />
                Tailwind v4 Native
              </span>
            </div>
          </div>

          {/* Workbench Body */}
          <div className="p-6 sm:p-8 lg:p-10">
            <AnimatePresence mode="wait">
              {activeTab === "preview" && (
                <motion.div
                  key="tab-preview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 gap-8 lg:grid-cols-12"
                >
                  {/* Left Column: Interactive Controls Canvas (8 cols) */}
                  <div className="space-y-6 lg:col-span-7">
                    <div>
                      <span className="font-mono text-[10px] font-bold tracking-widest text-zinc-400 uppercase dark:text-zinc-500">
                        01. TACTILE CONTROLS & PHYSICS
                      </span>
                      <h4 className="font-outfit mt-1 text-xl font-medium tracking-tight text-zinc-900 dark:text-white">
                        Live Component Primitives
                      </h4>
                      <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                        Click controls to test kinetic spring physics and zero-latency feedback.
                      </p>
                    </div>

                    {/* Button Gallery Row using native Hudbird color="primary" */}
                    <div className="flex flex-wrap items-center gap-3">
                      <Button
                        variant="solid"
                        color="primary"
                        size="md"
                        endContent={<ArrowRight className="h-3.5 w-3.5" />}
                      >
                        Primary Solid
                      </Button>

                      <Button
                        size="md"
                        variant="outline"
                        className="border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50 active:scale-[0.98] dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 dark:hover:bg-white/10"
                      >
                        Secondary Outline
                      </Button>

                      {/* Icon Button with Optical Center Compensation for Play Icon */}
                      <Button
                        size="md"
                        variant="outline"
                        isIconOnly
                        aria-label="Play demonstration"
                        className="border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 active:scale-[0.98] dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:bg-white/10"
                      >
                        {/* Optical compensation: +1px horizontal offset on play icon */}
                        <Play className="h-3.5 w-3.5 translate-x-[1px] fill-current" />
                      </Button>
                    </div>

                    {/* Interactive Form & Switch Row */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-semibold tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
                          Search Primitives
                        </label>
                        <div className="relative">
                          <Input
                            size="sm"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type to filter components..."
                            className="w-full pr-3 pl-8 text-xs"
                          />
                          <Search className="absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
                        </div>
                      </div>

                      {/* Interactive Switch Container */}
                      <div className="flex flex-col justify-between space-y-1.5">
                        <label className="text-[11px] font-semibold tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
                          Tactile Toggle Switch
                        </label>
                        <div
                          onClick={() => setIsSwitchOn(!isSwitchOn)}
                          role="switch"
                          aria-checked={isSwitchOn}
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setIsSwitchOn(!isSwitchOn);
                            }
                          }}
                          className={`flex h-8 cursor-pointer items-center justify-between rounded-lg border px-3 transition-colors ${
                            isSwitchOn
                              ? "border-primary/30 bg-primary/10 dark:border-primary/20 dark:bg-primary/10"
                              : "border-zinc-200 bg-zinc-50 dark:border-white/5 dark:bg-white/5"
                          }`}
                        >
                          <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                            {isSwitchOn ? "Hardware Springs: ON" : "Springs: OFF"}
                          </span>
                          <div
                            className={`relative h-4 w-7 rounded-full transition-colors duration-200 ${
                              isSwitchOn ? "bg-primary" : "bg-zinc-300 dark:bg-zinc-700"
                            }`}
                          >
                            <motion.span
                              layout
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              className="absolute top-0.5 left-0.5 h-3 w-3 rounded-full bg-white shadow-xs"
                              style={{ left: isSwitchOn ? "calc(100% - 14px)" : "2px" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Semantic Badges */}
                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      <Badge size="sm" color="primary" className="font-mono text-[10px]">
                        @hudbird/ui
                      </Badge>
                      <Badge size="sm" variant="soft" color="secondary" className="text-[10px]">
                        Kinetic Cyan
                      </Badge>
                      <Badge size="sm" variant="outline" color="success" className="text-[10px]">
                        Accessible Radix
                      </Badge>
                      <Badge size="sm" variant="soft" color="warning" className="text-[10px]">
                        Zero AI Slop
                      </Badge>
                    </div>
                  </div>

                  {/* Right Column: Code & Configuration Preview (5 cols) */}
                  <div className="flex flex-col justify-between rounded-xl border border-zinc-200/80 bg-zinc-50/60 p-5 lg:col-span-5 dark:border-white/10 dark:bg-[#1E1E22]">
                    <div>
                      <div className="flex items-center justify-between border-b border-zinc-200/60 pb-3 dark:border-white/5">
                        <span className="font-mono text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                          Button.tsx
                        </span>
                        <span className="bg-primary/10 text-primary rounded px-1.5 py-0.5 font-mono text-[10px] font-medium">
                          React 19 + CVA
                        </span>
                      </div>

                      <pre className="mt-4 font-mono text-[11px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                        <code>{`import { Button } from "@hudbird/ui";

export function HeroCta() {
  return (
    <Button
      variant="solid"
      color="primary"
      size="md"
    >
      Ship with Confidence
    </Button>
  );
}`}</code>
                      </pre>
                    </div>

                    <div className="mt-6 border-t border-zinc-200/60 pt-4 dark:border-white/5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-zinc-500 dark:text-zinc-400">Bundle size</span>
                        <span className="font-mono font-medium text-emerald-600 dark:text-emerald-400">
                          &lt; 2.1 kB (tree-shaken)
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "cli" && (
                <motion.div
                  key="tab-cli"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div>
                    <span className="font-mono text-[10px] font-bold tracking-widest text-zinc-400 uppercase dark:text-zinc-500">
                      02. SMART WORKSPACE INITIALIZATION
                    </span>
                    <h4 className="font-outfit mt-1 text-xl font-medium tracking-tight text-zinc-900 dark:text-white">
                      One Command Setup
                    </h4>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                      Scaffold components into your existing project with zero overhead.
                    </p>
                  </div>

                  <div className="rounded-xl border border-zinc-200/80 bg-zinc-900 p-4 text-white dark:border-white/10 dark:bg-[#111113]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                        <Terminal className="text-primary h-3.5 w-3.5" />
                        <span>Terminal</span>
                      </div>
                      <button
                        onClick={handleCopy}
                        className="flex items-center gap-1 rounded bg-white/10 px-2 py-1 text-[11px] font-medium text-zinc-200 transition-colors hover:bg-white/20 active:scale-95"
                      >
                        {copiedCli ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="mt-3 font-mono text-sm text-emerald-400">
                      <span className="text-zinc-500 select-none">$ </span>
                      {cliCommand}
                    </div>

                    <div className="mt-4 border-t border-zinc-800 pt-3 text-[11px] text-zinc-500">
                      ✔ Discovered Tailwind CSS v4 environment
                      <br />
                      ✔ Created components.json configuration
                      <br />✔ Ready to add 26+ core UI primitives and 40+ block layouts
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "tokens" && (
                <motion.div
                  key="tab-tokens"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div>
                    <span className="font-mono text-[10px] font-bold tracking-widest text-zinc-400 uppercase dark:text-zinc-500">
                      03. CSS-FIRST DESIGN SYSTEM TOKENS
                    </span>
                    <h4 className="font-outfit mt-1 text-xl font-medium tracking-tight text-zinc-900 dark:text-white">
                      Hudbird Native Token Palette
                    </h4>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                      Tailwind v4 @theme variables configured for zero OLED contrast clipping.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-4 dark:border-white/5 dark:bg-[#1E1E22]">
                      <div className="h-8 w-full rounded-md border border-white/20 bg-[#161618]" />
                      <div className="mt-3">
                        <div className="text-xs font-semibold text-zinc-900 dark:text-white">
                          Canvas
                        </div>
                        <div className="font-mono text-[10px] text-zinc-500">#161618</div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-4 dark:border-white/5 dark:bg-[#1E1E22]">
                      <div className="bg-primary h-8 w-full rounded-md" />
                      <div className="mt-3">
                        <div className="text-xs font-semibold text-zinc-900 dark:text-white">
                          Primary (Hudbird)
                        </div>
                        <div className="font-mono text-[10px] text-zinc-500">
                          var(--color-primary)
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-4 dark:border-white/5 dark:bg-[#1E1E22]">
                      <div className="h-8 w-full rounded-md bg-[#06B6D4]" />
                      <div className="mt-3">
                        <div className="text-xs font-semibold text-zinc-900 dark:text-white">
                          Secondary
                        </div>
                        <div className="font-mono text-[10px] text-zinc-500">
                          var(--color-secondary)
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-4 dark:border-white/5 dark:bg-[#1E1E22]">
                      <div className="h-8 w-full rounded-md bg-[#10B981]" />
                      <div className="mt-3">
                        <div className="text-xs font-semibold text-zinc-900 dark:text-white">
                          Success
                        </div>
                        <div className="font-mono text-[10px] text-zinc-500">#10B981</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
