import {
  ParticleOrb,
  TypewriterText,
  IdeCaret,
  FolderIcon,
  MockToggle,
  logos,
  MEGA_LINK_GROUPS,
  SOCIALS,
  useHtmlTheme,
  TerminalTyping,
  IdeSuggestPopup,
} from "./shared";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Text, Badge, Input, Textarea } from "@hudbird/ui";
import {
  Zap,
  Code2,
  Layers,
  Cpu,
  Network,
  PlayIcon,
  ArrowRight,
  ArrowUpCircle,
  CheckCircle2,
  Shield,
  Globe,
  BarChart3,
  Database,
  LayoutDashboard,
  Bot,
  Command,
  Layout,
  LineChart,
  Search,
  Plus,
  X,
  Check,
  ChevronDown,
  ChevronRight,
  FileText,
  Wallet,
  Target,
  Calendar,
  LifeBuoy,
  BookOpen,
  Mail,
  Activity,
  User,
  CreditCard,
  Bell,
  Palette,
  ArrowLeftRight,
  TrendingUp,
  Landmark,
  Clock,
  QrCode,
  RefreshCw,
  Send,
  Lock,
  TriangleAlert,
  Settings,
  Sparkles,
  BrainCircuit,
  MessageSquare,
} from "lucide-react";
import { ThemeToggleButton } from "../../../components/templates/TemplateThemeToggle";

export const CtaTerminalDemo = () => {
  const [phase, setPhase] = useState(0);
  const [pkgStep, setPkgStep] = useState(0);
  const [addStep, setAddStep] = useState(0);

  const packages = [
    { name: "react", version: "18.3.1" },
    { name: "framer-motion", version: "11.3.0" },
    { name: "tailwindcss", version: "4.0.0" },
    { name: "@hudbird/ui", version: "1.2.4" },
    { name: "@hudbird/marketing", version: "1.2.4" },
  ];

  // Auto-advance phases
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    // Start installing packages after 1.4s
    timers.push(setTimeout(() => setPhase(1), 1400));
    // Tick pkg loading bars
    for (let i = 0; i < packages.length; i++) {
      timers.push(setTimeout(() => setPkgStep(i + 1), 1800 + i * 500));
    }
    // Success state
    timers.push(setTimeout(() => setPhase(2), 1800 + packages.length * 500 + 300));
    // Transition to VS Code
    timers.push(setTimeout(() => setPhase(3), 1800 + packages.length * 500 + 1800));
    // add Hero command
    timers.push(setTimeout(() => setPhase(4), 1800 + packages.length * 500 + 2800));
    // add Hero success
    timers.push(setTimeout(() => setAddStep(1), 1800 + packages.length * 500 + 3800));
    timers.push(setTimeout(() => setAddStep(2), 1800 + packages.length * 500 + 4600));
    // Loop back
    timers.push(
      setTimeout(
        () => {
          setPhase(0);
          setPkgStep(0);
          setAddStep(0);
        },
        1800 + packages.length * 500 + 6200
      )
    );
    return () => timers.forEach(clearTimeout);
  }, [phase === 0]);

  const VSCodeFile = ({ active, name, icon }: { active?: boolean; name: string; icon: string }) => (
    <div
      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs ${active ? "border-b border-b-blue-500 bg-zinc-900 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
    >
      <span>{icon}</span>
      <span>{name}</span>
    </div>
  );

  return (
    <div className="w-full max-w-lg">
      <AnimatePresence mode="wait">
        {/* ── Phase 0-2: Terminal ── */}
        {phase < 3 && (
          <motion.div
            key="terminal"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
            className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-[0_16px_40px_-16px_rgba(16,24,40,0.4)] ring-1 ring-zinc-950/10 dark:border-zinc-700/60 dark:shadow-2xl dark:ring-0 dark:shadow-black/40"
          >
            {/* Title bar */}
            <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900/80 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
              <span className="ml-3 flex-1 text-center text-xs text-zinc-500">bash — zsh</span>
            </div>

            {/* Package manager tabs */}
            <div className="flex border-b border-zinc-800 bg-zinc-950/50">
              {["pnpm", "npm", "yarn", "bun"].map((pm, i) => (
                <button
                  key={pm}
                  className={`px-4 py-2 text-xs font-medium transition-colors ${i === 0 ? "rounded-sm bg-zinc-700 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
                >
                  {pm}
                </button>
              ))}
            </div>

            {/* Terminal body */}
            <div className="min-h-[220px] p-5 font-mono text-sm">
              {/* Command line */}
              <div className="flex items-start gap-2 text-zinc-300">
                <span className="mt-0.5 shrink-0 text-emerald-400">❯</span>
                <span>
                  <span className="text-white">pnpm</span>{" "}
                  <span className="text-zinc-400">dlx hudbird-ui@latest init</span>
                </span>
              </div>

              {/* Phase 1: Installing */}
              {phase >= 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-3 space-y-2"
                >
                  <div className="text-xs text-zinc-500">Installing packages…</div>
                  {packages.slice(0, pkgStep).map((pkg, i) => (
                    <motion.div
                      key={pkg.name}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-3"
                    >
                      <span className="text-emerald-400">✔</span>
                      <span className="w-40 text-xs text-zinc-300">{pkg.name}</span>
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-800">
                        <motion.div
                          className="h-full w-full origin-left rounded-full bg-emerald-500"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                        />
                      </div>
                      <span className="text-[10px] text-zinc-600">{pkg.version}</span>
                    </motion.div>
                  ))}
                  {pkgStep < packages.length && phase === 1 && (
                    <motion.div
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="flex items-center gap-2 text-xs text-zinc-500"
                    >
                      <span className="inline-block h-2 w-2 animate-spin rounded-sm bg-blue-500" />
                      Resolving dependencies…
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Phase 2: Success */}
              {phase === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 space-y-1.5"
                >
                  <div className="text-xs text-emerald-400">✔ Initializing hudbird-ui…</div>
                  <div className="text-xs text-emerald-400">✔ Writing components.json</div>
                  <div className="text-xs text-emerald-400">✔ Configuring Tailwind CSS v4</div>
                  <div className="mt-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
                    <div className="text-xs font-semibold text-emerald-400">
                      🎉 hudbird-ui initialized successfully!
                    </div>
                    <div className="mt-1 text-[11px] text-zinc-500">
                      Run <span className="text-zinc-300">pnpm dlx hudbird-ui add [component]</span>{" "}
                      to add components
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* ── Phase 3+: VS Code UI ── */}
        {phase >= 3 && (
          <motion.div
            key="vscode"
            initial={{ opacity: 0, scale: 0.97, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.15 }}
            className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-[0_16px_40px_-16px_rgba(16,24,40,0.4)] ring-1 ring-zinc-950/10 dark:border-zinc-700/60 dark:shadow-2xl dark:ring-0 dark:shadow-black/50"
          >
            {/* VS Code title bar */}
            <div className="flex items-center gap-2 border-b border-zinc-800 bg-[#323233] px-4 py-2">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
              <span className="ml-4 flex-1 text-center text-xs text-zinc-400">
                hudbird-ui — VS Code
              </span>
            </div>

            {/* Tab bar */}
            <div className="flex items-center border-b border-zinc-800 bg-[#2d2d2d]">
              <VSCodeFile active name="Hero.tsx" icon="⚛" />
              <VSCodeFile name="components.json" icon="📄" />
              <VSCodeFile name="tailwind.css" icon="🎨" />
            </div>

            <div className="flex" style={{ height: 260 }}>
              {/* Sidebar */}
              <div className="w-44 shrink-0 border-r border-zinc-800 bg-[#252526] p-3">
                <div className="mb-2 text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">
                  Explorer
                </div>
                {[
                  { icon: "📁", name: "components", indent: 0 },
                  { icon: "📁", name: "ui", indent: 1 },
                  { icon: "⚛", name: "Hero.tsx", indent: 2, active: true },
                  { icon: "⚛", name: "Button.tsx", indent: 2 },
                  { icon: "📁", name: "marketing", indent: 1 },
                  { icon: "📁", name: "pages", indent: 0 },
                ].map((f, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-1.5 rounded px-1 py-0.5 text-[11px] ${f.active ? "bg-zinc-700/60 text-white" : "text-zinc-400"}`}
                    style={{ paddingLeft: 4 + f.indent * 12 }}
                  >
                    <span>{f.icon}</span>
                    <span>{f.name}</span>
                  </div>
                ))}
              </div>

              {/* Editor */}
              <div className="flex flex-1 flex-col overflow-hidden bg-zinc-900 p-4 font-mono text-xs">
                {/* Terminal panel at bottom */}
                <div className="flex-1 overflow-hidden">
                  <div className="text-zinc-600">
                    <span className="text-blue-400">import</span>{" "}
                    <span className="text-yellow-300">{"{ Hero }"}</span>{" "}
                    <span className="text-blue-400">from</span>{" "}
                    <span className="text-emerald-300">'@hudbird/marketing'</span>
                  </div>
                  <div className="mt-2 text-zinc-600">
                    <span className="text-blue-400">export default function</span>{" "}
                    <span className="text-yellow-300">Page</span>
                    <span className="text-zinc-400">{"() {"}</span>
                  </div>
                  <div className="ml-4 text-zinc-600">
                    <span className="text-blue-400">return</span>{" "}
                    <span className="text-zinc-400">{"("}</span>
                  </div>
                  <div className="ml-8 text-zinc-500">
                    <span className="text-red-400">{"<Hero"}</span>
                  </div>
                  <div className="ml-10 text-zinc-500">
                    <span className="text-green-400">title</span>
                    <span className="text-zinc-400">{"="}</span>
                    <span className="text-yellow-300">{'"Build Faster"'}</span>
                  </div>
                  <div className="ml-8 text-zinc-500">
                    <span className="text-red-400">{"/>"}</span>
                  </div>
                </div>

                {/* Integrated terminal strip */}
                <div className="border-t border-zinc-800 pt-3">
                  <div className="mb-1 text-[10px] text-zinc-600">TERMINAL</div>
                  {/* add command */}
                  <div className="flex items-center gap-2 text-zinc-300">
                    <span className="text-emerald-400">❯</span>
                    <span>
                      <span className="text-white">pnpm</span>{" "}
                      <span className="text-zinc-400">dlx hudbird-ui@latest add Hero</span>
                    </span>
                  </div>
                  {addStep >= 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-1 flex items-center gap-2 text-xs text-emerald-400"
                    >
                      <span>✔</span>
                      <span>Installing @hudbird/marketing…</span>
                    </motion.div>
                  )}
                  {addStep >= 2 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2 text-xs text-emerald-400"
                    >
                      <span>✔</span>
                      <span>
                        Created <span className="text-white">components/ui/Hero.tsx</span>
                      </span>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase indicator dots — transform + color only (no width layout animation) */}
      <div className="mt-4 flex justify-center gap-2">
        {["Init", "Installing", "Success", "VS Code"].map((label, i) => (
          <div
            key={label}
            title={label}
            className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${
              (phase < 3 ? phase : 3) === i
                ? "scale-125 bg-blue-500"
                : "scale-100 bg-zinc-300 dark:bg-zinc-700"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Component Gallery — bento mosaic above the logo cloud.
   Built from @hudbird/ui core primitives (Button, Badge,
   Input, Textarea) inside marketing BentoGrid compound
   components. Monochrome zinc so it stays clean in both
   light and dark mode. Static data-viz mocks are plain
   divs (aria-hidden); motion is transform/opacity only.
───────────────────────────────────────────── */
