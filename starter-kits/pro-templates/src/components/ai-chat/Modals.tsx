import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Bell,
  Check,
  ChartColumn,
  Database,
  FileText,
  Folder,
  Link2,
  MessageSquare,
  Palette,
  Presentation,
  Search,
  Settings,
  Sparkles,
  SquarePen,
  User,
} from "lucide-react";
import type { Conversation } from "./types";
import { PROJECT_COLORS } from "./data";
import { CopyIcon, Logo, Modal, Switch, cx, softSpring, spring, useCopy } from "./primitives";

/* ------------------------------------------------------------------ */
/* Meet Work — Unlock with Plus                                        */
/* ------------------------------------------------------------------ */
export function WorkModal({
  open,
  onClose,
  onUnlock,
}: {
  open: boolean;
  onClose: () => void;
  onUnlock: () => void;
}) {
  const [tab, setTab] = useState<"chat" | "work">("work");
  useEffect(() => {
    if (open) setTab("chat");
    const id = open ? window.setTimeout(() => setTab("work"), 450) : 0;
    return () => window.clearTimeout(id);
  }, [open]);

  return (
    <Modal open={open} onClose={onClose} label="Meet Hudbird Work" className="max-w-[420px]">
      <div className="relative overflow-hidden px-8 pt-10 pb-8 text-center">
        {/* Aurora */}
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-violet-500/50 blur-3xl"
            animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -top-20 -right-10 h-64 w-64 rounded-full bg-blue-400/50 blur-3xl"
            animate={{ x: [0, -24, 0], y: [0, 30, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--c-elevated)]/60 to-[var(--c-elevated)]" />
        </div>

        <div className="relative">
          <div className="relative mx-auto inline-flex rounded-full bg-white/15 p-1 backdrop-blur-md">
            {(["chat", "work"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={cx(
                  "relative z-10 h-9 rounded-full px-7 text-sm font-medium transition-colors",
                  tab === t ? "text-zinc-900" : "text-white/70"
                )}
              >
                {tab === t && (
                  <motion.span
                    layoutId="aichat-work-pill"
                    transition={spring}
                    className="absolute inset-0 -z-10 rounded-full bg-white shadow"
                  />
                )}
                {t === "chat" ? "Chat" : "Work"}
              </button>
            ))}
          </div>

          {/* Floating artifacts */}
          <div className="relative mx-auto mt-7 h-20 w-56">
            {[
              {
                icon: <FileText className="h-5 w-5" />,
                c: "from-blue-500 to-blue-600",
                x: -70,
                r: -10,
                d: 0,
              },
              {
                icon: <Presentation className="h-5 w-5" />,
                c: "from-orange-400 to-rose-500",
                x: 0,
                r: 0,
                d: 0.1,
              },
              {
                icon: <ChartColumn className="h-5 w-5" />,
                c: "from-emerald-400 to-teal-500",
                x: 70,
                r: 10,
                d: 0.2,
              },
            ].map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, rotate: 0, x: 0 }}
                animate={{ opacity: 1, y: [0, -6, 0], rotate: a.r, x: a.x }}
                transition={{
                  opacity: { delay: 0.3 + a.d },
                  x: { ...spring, delay: 0.3 + a.d },
                  rotate: { ...spring, delay: 0.3 + a.d },
                  y: { duration: 3, repeat: Infinity, delay: a.d },
                }}
                className={cx(
                  "absolute top-0 left-1/2 -ml-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-xl",
                  a.c
                )}
              >
                {a.icon}
              </motion.div>
            ))}
          </div>

          <h2 className="mt-6 text-xl font-semibold tracking-tight">Meet Hudbird Work</h2>
          <p className="mt-3 text-sm leading-6 text-[var(--c-muted)]">
            Use Hudbird Work when a task needs more than a quick answer. It can gather context,
            organize the work, and create polished docs, slides, spreadsheets, and more.{" "}
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-[var(--c-text)] underline underline-offset-2"
            >
              Learn more
            </a>
          </p>
          <motion.button
            type="button"
            onClick={onUnlock}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            data-glow="focus"
            className="aichat-glow-ring mt-8 inline-flex h-10 items-center gap-2 rounded-full bg-[var(--c-accent-soft)] px-5 text-sm font-medium text-[var(--c-accent)]"
          >
            <Sparkles className="h-4 w-4" fill="currentColor" /> Unlock with Plus
          </motion.button>
        </div>
      </div>
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/* Plans                                                               */
/* ------------------------------------------------------------------ */
const PLANS = [
  {
    id: "free",
    name: "Free",
    price: { personal: 0, business: 0 },
    tagline: "Intelligence for everyday tasks",
    cta: "Your current plan",
    features: [
      "Access to Hudbird 5",
      "Limited file uploads",
      "Limited image generation",
      "Standard voice mode",
    ],
  },
  {
    id: "plus",
    name: "Plus",
    price: { personal: 20, business: 25 },
    tagline: "More access to advanced intelligence",
    cta: "Get Plus",
    popular: true,
    features: [
      "Hudbird 5 Thinking",
      "Hudbird Work & deep research",
      "Expanded image generation",
      "Advanced voice with video",
      "Projects & custom apps",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: { personal: 200, business: 200 },
    tagline: "Full access to the best of Hudbird",
    cta: "Get Pro",
    features: [
      "Everything in Plus",
      "Hudbird 5 Pro reasoning",
      "Unlimited messages & uploads",
      "Research preview of agents",
      "Priority access to new features",
    ],
  },
];

export function PlansModal({
  open,
  onClose,
  onUpgrade,
  plan,
}: {
  open: boolean;
  onClose: () => void;
  onUpgrade: (p: string) => void;
  plan: string;
}) {
  const [tier, setTier] = useState<"personal" | "business">("personal");
  return (
    <Modal
      open={open}
      onClose={onClose}
      label="Upgrade your plan"
      className="max-h-[92vh] max-w-[1040px]"
    >
      <div className="aichat-scroll max-h-[92vh] overflow-y-auto px-5 pt-10 pb-8 sm:px-10">
        <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">
          Upgrade your plan
        </h2>
        <div className="mt-5 flex justify-center">
          <div className="inline-flex rounded-full bg-[var(--c-surface-2)] p-1">
            {(["personal", "business"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTier(t)}
                className={cx(
                  "relative z-10 h-8 rounded-full px-5 text-sm font-medium capitalize",
                  tier === t ? "text-[var(--c-text)]" : "text-[var(--c-muted)]"
                )}
              >
                {tier === t && (
                  <motion.span
                    layoutId="aichat-tier"
                    transition={softSpring}
                    className="absolute inset-0 -z-10 rounded-full bg-[var(--c-surface-3)]"
                  />
                )}
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {PLANS.map((p, i) => {
            const current = p.id === plan;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring, delay: 0.06 * i }}
                data-glow={p.popular ? "focus" : undefined}
                className={cx(
                  "relative flex flex-col rounded-3xl border p-6",
                  p.popular
                    ? "aichat-glow-ring border-[var(--c-accent)]/40 bg-gradient-to-b from-[var(--c-accent-soft)] to-transparent"
                    : "border-[var(--c-border-strong)]"
                )}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{p.name}</h3>
                  {p.popular && (
                    <span className="rounded-full bg-[var(--c-accent)] px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-white uppercase">
                      Popular
                    </span>
                  )}
                </div>
                <div className="mt-4 flex items-end gap-1">
                  <span className="text-sm text-[var(--c-muted)]">$</span>
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={p.price[tier]}
                      initial={{ y: 16, opacity: 0, filter: "blur(4px)" }}
                      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                      exit={{ y: -16, opacity: 0, filter: "blur(4px)" }}
                      className="text-5xl font-semibold tracking-tight tabular-nums"
                    >
                      {p.price[tier]}
                    </motion.span>
                  </AnimatePresence>
                  <span className="mb-1.5 text-xs leading-4 text-[var(--c-muted)]">
                    USD /<br />
                    month
                  </span>
                </div>
                <p className="mt-3 text-sm font-medium">{p.tagline}</p>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  disabled={current}
                  onClick={() => onUpgrade(p.id)}
                  className={cx(
                    "mt-5 h-11 rounded-full text-sm font-semibold transition-opacity",
                    current
                      ? "cursor-default border border-[var(--c-border-strong)] text-[var(--c-muted)]"
                      : p.popular
                        ? "bg-[var(--c-accent)] text-white hover:opacity-90"
                        : "bg-[var(--c-invert)] text-[var(--c-invert-text)] hover:opacity-90"
                  )}
                >
                  {current ? "Your current plan" : p.cta}
                </motion.button>
                <ul className="mt-6 flex flex-col gap-3 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--c-muted)]" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/* Settings                                                            */
/* ------------------------------------------------------------------ */
const SETTINGS_TABS = [
  { id: "general", label: "General", icon: <Settings className="h-4 w-4" /> },
  { id: "personalization", label: "Personalization", icon: <Palette className="h-4 w-4" /> },
  { id: "notifications", label: "Notifications", icon: <Bell className="h-4 w-4" /> },
  { id: "data", label: "Data controls", icon: <Database className="h-4 w-4" /> },
  { id: "account", label: "Account", icon: <User className="h-4 w-4" /> },
] as const;

export function SettingsModal({
  open,
  onClose,
  theme,
  onTheme,
  onToast,
  onClearChats,
}: {
  open: boolean;
  onClose: () => void;
  theme: "dark" | "light";
  onTheme: (t: "dark" | "light") => void;
  onToast: (m: string) => void;
  onClearChats: () => void;
}) {
  const [tab, setTab] = useState<(typeof SETTINGS_TABS)[number]["id"]>("general");
  const [prefs, setPrefs] = useState({
    followUps: true,
    memory: true,
    improve: false,
    push: true,
    email: false,
    autoVoice: true,
  });
  const set = (k: keyof typeof prefs) => (v: boolean) => setPrefs((p) => ({ ...p, [k]: v }));

  return (
    <Modal open={open} onClose={onClose} label="Settings" className="max-w-[720px]">
      <div className="flex h-[min(560px,85vh)] flex-col sm:flex-row">
        <nav className="aichat-no-scrollbar flex shrink-0 gap-1 overflow-x-auto border-b border-[var(--c-border)] p-3 sm:w-52 sm:flex-col sm:border-r sm:border-b-0 sm:pt-12">
          {SETTINGS_TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cx(
                "relative flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition-colors",
                tab === t.id
                  ? "text-[var(--c-text)]"
                  : "text-[var(--c-muted)] hover:text-[var(--c-text)]"
              )}
            >
              {tab === t.id && (
                <motion.span
                  layoutId="aichat-settings-tab"
                  transition={softSpring}
                  className="absolute inset-0 -z-0 rounded-xl bg-[var(--c-surface-2)]"
                />
              )}
              <span className="relative">{t.icon}</span>
              <span className="relative">{t.label}</span>
            </button>
          ))}
        </nav>
        <div className="aichat-scroll flex-1 overflow-y-auto p-6 sm:pt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.18 }}
            >
              <h3 className="mb-4 text-lg font-semibold">
                {SETTINGS_TABS.find((t) => t.id === tab)?.label}
              </h3>
              {tab === "general" && (
                <div className="divide-y divide-[var(--c-border)]">
                  <Row label="Theme">
                    <div className="inline-flex rounded-full bg-[var(--c-surface-2)] p-1">
                      {(["dark", "light"] as const).map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => onTheme(t)}
                          className={cx(
                            "relative z-10 h-7 rounded-full px-4 text-xs font-medium capitalize",
                            theme === t ? "text-[var(--c-text)]" : "text-[var(--c-muted)]"
                          )}
                        >
                          {theme === t && (
                            <motion.span
                              layoutId="aichat-theme"
                              transition={softSpring}
                              className="absolute inset-0 -z-10 rounded-full bg-[var(--c-surface-3)]"
                            />
                          )}
                          {t}
                        </button>
                      ))}
                    </div>
                  </Row>
                  <Row label="Language">
                    <select className="h-8 rounded-lg border border-[var(--c-border-strong)] bg-[var(--c-surface)] px-2 text-sm">
                      <option>Auto-detect</option>
                      <option>English</option>
                      <option>Bahasa Indonesia</option>
                    </select>
                  </Row>
                  <Row label="Show follow-up suggestions">
                    <Switch
                      label="Follow-up suggestions"
                      checked={prefs.followUps}
                      onChange={set("followUps")}
                    />
                  </Row>
                  <Row label="Auto-start voice on open">
                    <Switch
                      label="Auto voice"
                      checked={prefs.autoVoice}
                      onChange={set("autoVoice")}
                    />
                  </Row>
                </div>
              )}
              {tab === "personalization" && (
                <div className="flex flex-col gap-5">
                  <label className="block">
                    <span className="text-sm font-medium">Custom instructions</span>
                    <span className="mt-0.5 block text-xs text-[var(--c-subtle)]">
                      What would you like Hudbird to know about you?
                    </span>
                    <textarea
                      rows={4}
                      defaultValue="I'm a product designer. Keep answers concise and use bullet points."
                      className="mt-2 w-full resize-none rounded-2xl border border-[var(--c-border-strong)] bg-[var(--c-surface)] p-3 text-sm focus:border-[var(--c-accent)] focus:outline-none"
                    />
                  </label>
                  <Row label="Memory" hint="Let Hudbird remember useful details between chats">
                    <Switch label="Memory" checked={prefs.memory} onChange={set("memory")} />
                  </Row>
                </div>
              )}
              {tab === "notifications" && (
                <div className="divide-y divide-[var(--c-border)]">
                  <Row label="Push notifications" hint="When long tasks finish">
                    <Switch label="Push" checked={prefs.push} onChange={set("push")} />
                  </Row>
                  <Row label="Email digests">
                    <Switch label="Email" checked={prefs.email} onChange={set("email")} />
                  </Row>
                </div>
              )}
              {tab === "data" && (
                <div className="divide-y divide-[var(--c-border)]">
                  <Row label="Improve the model for everyone">
                    <Switch
                      label="Improve model"
                      checked={prefs.improve}
                      onChange={set("improve")}
                    />
                  </Row>
                  <Row label="Export data">
                    <button
                      type="button"
                      onClick={() => onToast("Export started — check your email")}
                      className="h-8 rounded-full border border-[var(--c-border-strong)] px-3 text-xs font-medium hover:bg-[var(--c-surface-2)]"
                    >
                      Export
                    </button>
                  </Row>
                  <Row label="Delete all chats">
                    <button
                      type="button"
                      onClick={() => {
                        onClearChats();
                        onToast("All chats deleted");
                      }}
                      className="h-8 rounded-full bg-rose-500/15 px-3 text-xs font-medium text-rose-400 hover:bg-rose-500/25"
                    >
                      Delete all
                    </button>
                  </Row>
                </div>
              )}
              {tab === "account" && (
                <div className="divide-y divide-[var(--c-border)]">
                  <Row label="Name">
                    <span className="text-sm text-[var(--c-muted)]">Dani Akbar</span>
                  </Row>
                  <Row label="Email">
                    <span className="text-sm text-[var(--c-muted)]">dani@hudbird.com</span>
                  </Row>
                  <Row label="Plan">
                    <span className="text-sm text-[var(--c-muted)]">Free</span>
                  </Row>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Modal>
  );
}

function Row({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5">
      <span>
        <span className="block text-sm">{label}</span>
        {hint && <span className="block text-xs text-[var(--c-subtle)]">{hint}</span>}
      </span>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Search chats (⌘K)                                                   */
/* ------------------------------------------------------------------ */
export function SearchModal({
  open,
  onClose,
  conversations,
  onSelect,
  onNewChat,
}: {
  open: boolean;
  onClose: () => void;
  conversations: Conversation[];
  onSelect: (id: string) => void;
  onNewChat: () => void;
}) {
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQ("");
      setIdx(0);
      window.setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const results = useMemo(() => {
    const s = q.toLowerCase();
    return conversations
      .filter(
        (c) =>
          !s ||
          c.title.toLowerCase().includes(s) ||
          c.messages.some((m) => m.content.toLowerCase().includes(s))
      )
      .slice(0, 8);
  }, [q, conversations]);

  const total = results.length + 1;
  const choose = (i: number) => {
    if (i === 0) onNewChat();
    else onSelect(results[i - 1].id);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} label="Search chats" className="max-w-[640px]" hideClose>
      <div className="flex items-center gap-3 border-b border-[var(--c-border)] px-5 py-4">
        <Search className="h-5 w-5 text-[var(--c-subtle)]" />
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setIdx(0);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setIdx((i) => (i + 1) % total);
            }
            if (e.key === "ArrowUp") {
              e.preventDefault();
              setIdx((i) => (i - 1 + total) % total);
            }
            if (e.key === "Enter") choose(idx);
          }}
          placeholder="Search chats…"
          aria-label="Search chats"
          className="flex-1 bg-transparent text-base placeholder:text-[var(--c-subtle)] focus:outline-none"
        />
        <kbd className="rounded-md border border-[var(--c-border-strong)] px-1.5 py-0.5 text-[11px] text-[var(--c-subtle)]">
          ESC
        </kbd>
      </div>
      <div className="aichat-scroll max-h-[420px] overflow-y-auto p-2">
        <SearchRow
          active={idx === 0}
          onHover={() => setIdx(0)}
          onClick={() => choose(0)}
          icon={<SquarePen className="h-4 w-4" />}
          title="New chat"
        />
        {results.length > 0 && (
          <div className="px-3 pt-3 pb-1 text-xs font-medium text-[var(--c-subtle)]">
            {q ? "Results" : "Recent"}
          </div>
        )}
        {results.map((c, i) => {
          const snippet = c.messages
            .find((m) => m.role === "assistant")
            ?.content.replace(/[#*`>|]/g, "")
            .slice(0, 90);
          return (
            <SearchRow
              key={c.id}
              active={idx === i + 1}
              onHover={() => setIdx(i + 1)}
              onClick={() => choose(i + 1)}
              icon={<MessageSquare className="h-4 w-4" />}
              title={c.title}
              subtitle={snippet}
            />
          );
        })}
        {q && results.length === 0 && (
          <p className="px-3 py-8 text-center text-sm text-[var(--c-subtle)]">
            No chats match “{q}”
          </p>
        )}
      </div>
    </Modal>
  );
}

function SearchRow({
  active,
  onHover,
  onClick,
  icon,
  title,
  subtitle,
}: {
  active: boolean;
  onHover: () => void;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <button
      type="button"
      onMouseMove={onHover}
      onClick={onClick}
      className="relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left"
    >
      {active && (
        <motion.span
          layoutId="aichat-search-hl"
          transition={{ type: "spring", bounce: 0, visualDuration: 0.18 }}
          className="absolute inset-0 rounded-xl bg-[var(--c-surface-2)]"
        />
      )}
      <span className="relative text-[var(--c-muted)]">{icon}</span>
      <span className="relative min-w-0 flex-1">
        <span className="block truncate text-sm">{title}</span>
        {subtitle && (
          <span className="block truncate text-xs text-[var(--c-subtle)]">{subtitle}</span>
        )}
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* New project                                                         */
/* ------------------------------------------------------------------ */
export function NewProjectModal({
  open,
  onClose,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string, color: string) => void;
}) {
  const [name, setName] = useState("");
  const [color, setColor] = useState(PROJECT_COLORS[0]);
  useEffect(() => {
    if (open) setName("");
  }, [open]);
  return (
    <Modal open={open} onClose={onClose} label="Create project" className="max-w-[460px]">
      <form
        className="p-6 pt-8"
        onSubmit={(e) => {
          e.preventDefault();
          if (!name.trim()) return;
          onCreate(name.trim(), color);
          onClose();
        }}
      >
        <motion.div
          key={color}
          initial={{ scale: 0.8, rotate: -8 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={spring}
          className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{ backgroundColor: color + "22", color }}
        >
          <Folder className="h-7 w-7" fill={color} fillOpacity={0.3} />
        </motion.div>
        <h2 className="text-xl font-semibold">Create project</h2>
        <p className="mt-1 text-sm text-[var(--c-muted)]">
          Projects keep chats, files and custom instructions in one place.
        </p>
        <label className="mt-5 block">
          <span className="text-sm font-medium">Project name</span>
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Birthday party plan"
            className="mt-2 h-11 w-full rounded-xl border border-[var(--c-border-strong)] bg-[var(--c-surface)] px-3 text-sm focus:border-[var(--c-accent)] focus:outline-none"
          />
        </label>
        <div className="mt-4">
          <span className="text-sm font-medium">Color</span>
          <div className="mt-2 flex gap-2">
            {PROJECT_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                aria-label={`Color ${c}`}
                onClick={() => setColor(c)}
                className="relative h-8 w-8 rounded-full transition-transform hover:scale-110"
                style={{ backgroundColor: c }}
              >
                {color === c && (
                  <motion.span
                    layoutId="aichat-color-ring"
                    transition={softSpring}
                    className="absolute -inset-1 rounded-full border-2"
                    style={{ borderColor: c }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-7 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-full px-4 text-sm font-medium hover:bg-[var(--c-surface-2)]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!name.trim()}
            className="h-10 rounded-full bg-[var(--c-invert)] px-5 text-sm font-semibold text-[var(--c-invert-text)] transition-opacity disabled:opacity-40"
          >
            Create project
          </button>
        </div>
      </form>
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/* Share                                                               */
/* ------------------------------------------------------------------ */
export function ShareModal({
  open,
  onClose,
  title,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
}) {
  const { copied, copy } = useCopy();
  const link = `https://hudbird.ai/share/${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .slice(0, 24)}`;
  return (
    <Modal open={open} onClose={onClose} label="Share chat" className="max-w-[520px]">
      <div className="p-6 pt-8">
        <h2 className="text-lg font-semibold">Share public link to chat</h2>
        <p className="mt-1 text-sm text-[var(--c-muted)]">
          Messages you send after creating the link stay private.
        </p>
        <div className="mt-5 overflow-hidden rounded-2xl border border-[var(--c-border)] bg-[var(--c-surface)]">
          <div className="flex items-center gap-3 p-4">
            <Logo size={28} />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{title}</p>
              <p className="text-xs text-[var(--c-subtle)]">Shared by Dani Akbar</p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-full border border-[var(--c-border-strong)] p-1 pl-4">
          <Link2 className="h-4 w-4 shrink-0 text-[var(--c-subtle)]" />
          <span className="flex-1 truncate text-sm text-[var(--c-muted)]">{link}</span>
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => copy(link)}
            className="inline-flex h-9 items-center gap-2 rounded-full bg-[var(--c-invert)] px-4 text-sm font-semibold text-[var(--c-invert-text)]"
          >
            <CopyIcon copied={copied} />
            {copied ? "Copied" : "Copy link"}
          </motion.button>
        </div>
      </div>
    </Modal>
  );
}
