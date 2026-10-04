import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUp,
  BellRing,
  CalendarCheck,
  Clock3,
  FolderTree,
  MessageSquareReply,
  PenLine,
  Reply,
  ScanText,
  Sparkles,
  TrendingDown,
  Wand2,
  X,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/cn";
import type { MailEngine } from "./useMailEngine";
import { ME, TONES, type Tone } from "./data";
import { answerAssistant, generateEmail, useStreamer, useThinking } from "./ai";
import {
  AiOrb,
  MailAvatar,
  SectionCard,
  ShimmerText,
  StreamCaret,
  ThinkingSteps,
  Toggle,
  TypingDots,
  pageVariants,
  spring,
} from "./primitives";

/* ------------------------------------------------------------------ */
/*  Rich-ish markdown for **bold** in AI answers                        */
/* ------------------------------------------------------------------ */
function Md({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("**") ? (
          <strong key={i} className="font-semibold text-zinc-900 dark:text-white">
            {p.slice(2, -2)}
          </strong>
        ) : (
          <React.Fragment key={i}>{p}</React.Fragment>
        )
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  AI Features hub                                                      */
/* ------------------------------------------------------------------ */
const BRIEF_STEPS = [
  "Scanning 1,897 emails",
  "Ranking by urgency",
  "Checking your calendar",
  "Writing your brief",
];

export function AiFeaturesView({ engine, userName }: { engine: MailEngine; userName: string }) {
  const brief = useStreamer();
  const briefThinking = useThinking();
  const play = useStreamer();
  const playThinking = useThinking();
  const [prompt, setPrompt] = useState("Ask Daniel for a November pilot kickoff call");
  const [tone, setTone] = useState<Tone>("Friendly");
  const [features, setFeatures] = useState({
    summaries: true,
    categorize: true,
    meetings: true,
    replies: true,
    followups: false,
  });
  const [sorting, setSorting] = useState(false);
  const [sorted, setSorted] = useState(false);

  const priority = engine.allEmails.filter((m) => m.folder === "inbox" && m.aiPriority === "high");
  const hour = new Date().getHours();
  const greet = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const runBrief = async () => {
    await briefThinking.think(BRIEF_STEPS, 450);
    brief.stream(answerAssistant("summarize today", engine.allEmails), undefined, 10);
  };

  const runPlay = async () => {
    await playThinking.think(["Understanding intent", "Choosing tone", "Drafting"], 380);
    play.stream(generateEmail({ prompt, tone, to: "daniel@acme.co" }).body);
  };

  const organize = () => {
    setSorting(true);
    setSorted(false);
    window.setTimeout(() => {
      setSorting(false);
      setSorted(true);
      engine.toast("AI organised 1,204 emails into smart folders", { tone: "ai" });
    }, 2200);
  };

  const stats = [
    {
      label: "Time saved this week",
      value: "4.2h",
      icon: Clock3,
      delta: "+18%",
      color: "from-blue-500 to-cyan-400",
    },
    {
      label: "AI drafts written",
      value: "128",
      icon: PenLine,
      delta: "+32",
      color: "from-violet-500 to-fuchsia-500",
    },
    {
      label: "Emails auto-sorted",
      value: "1,204",
      icon: FolderTree,
      delta: "98% acc.",
      color: "from-emerald-500 to-teal-400",
    },
    {
      label: "Avg. reply time",
      value: "38m",
      icon: TrendingDown,
      delta: "−41%",
      color: "from-amber-500 to-orange-400",
    },
  ];

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="aimail-scroll h-full overflow-y-auto"
    >
      <div className="mx-auto max-w-6xl space-y-5 px-4 py-6 pb-28 sm:px-6 md:pb-10">
        {/* Hero brief */}
        <div className="relative overflow-hidden rounded-[28px] bg-zinc-950 p-6 text-white sm:p-8">
          <div className="aimail-aurora pointer-events-none absolute -top-1/2 -right-1/4 h-[200%] w-[80%] bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.55),transparent_55%)]" />
          <div className="pointer-events-none absolute -bottom-1/2 -left-1/4 h-[160%] w-[70%] bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.45),transparent_55%)]" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start">
            <div className="flex-1">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur">
                <Sparkles className="h-3 w-3" /> HudMail Intelligence
              </span>
              <h2 className="font-heading mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                {greet}, {userName.split(" ")[0]}.
              </h2>
              <p className="mt-2 max-w-md text-sm text-white/60">
                {engine.counts.inbox} unread · {priority.length} need replies · 2 meetings today.
                Get a 30-second brief of everything that matters.
              </p>
              <motion.button
                id="aimail-generate-brief"
                type="button"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={runBrief}
                disabled={briefThinking.isThinking || brief.isStreaming}
                className="mt-6 flex cursor-pointer items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-900 shadow-xl shadow-violet-900/40 disabled:opacity-70"
              >
                <Zap className="h-4 w-4 text-violet-600" />{" "}
                {brief.text ? "Regenerate brief" : "Generate daily brief"}
              </motion.button>
            </div>

            <div className="min-h-[200px] w-full rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl lg:w-[440px]">
              <AnimatePresence mode="wait">
                {briefThinking.isThinking ? (
                  <motion.div
                    key="t"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center gap-2.5">
                      <AiOrb size={24} spinning />
                      <ShimmerText className="text-sm font-semibold">
                        {BRIEF_STEPS[briefThinking.step]}…
                      </ShimmerText>
                    </div>
                    {[80, 95, 60, 88].map((w, i) => (
                      <motion.div
                        key={i}
                        className="h-2.5 rounded-full bg-white/10"
                        style={{ width: `${w}%` }}
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.15 }}
                      />
                    ))}
                  </motion.div>
                ) : brief.text ? (
                  <motion.p
                    key="b"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[13.5px] leading-relaxed whitespace-pre-wrap text-white/85 [&_strong]:text-white"
                  >
                    <Md text={brief.text} />
                    {brief.isStreaming && <StreamCaret />}
                  </motion.p>
                ) : (
                  <motion.div
                    key="e"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex h-full min-h-[160px] flex-col items-center justify-center text-center text-sm text-white/50"
                  >
                    <AiOrb size={40} />
                    <p className="mt-3">Your AI brief will appear here</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06, ...spring }}
            >
              <SectionCard className="p-4">
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md",
                      s.color
                    )}
                  >
                    <s.icon className="h-4 w-4" />
                  </span>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                    {s.delta}
                  </span>
                </div>
                <p className="font-heading mt-4 text-2xl font-semibold text-zinc-900 tabular-nums dark:text-white">
                  {s.value}
                </p>
                <p className="text-xs text-zinc-500">{s.label}</p>
                <div className="mt-3 flex h-8 items-end gap-1">
                  {[40, 65, 45, 80, 55, 90, 70].map((h, k) => (
                    <motion.span
                      key={k}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 0.3 + k * 0.04 + i * 0.05, ...spring }}
                      className={cn("flex-1 rounded-sm bg-gradient-to-t opacity-80", s.color)}
                    />
                  ))}
                </div>
              </SectionCard>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
          {/* Priority queue */}
          <SectionCard>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-heading text-base font-semibold text-zinc-900 dark:text-white">
                  Priority queue
                </h3>
                <p className="text-xs text-zinc-500">Ranked by AI urgency score</p>
              </div>
              <span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-600 dark:bg-rose-500/10 dark:text-rose-400">
                {priority.length} urgent
              </span>
            </div>
            <ul className="space-y-2">
              {priority.map((m, i) => (
                <motion.li
                  key={m.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="group flex items-center gap-3 rounded-2xl border border-zinc-100 p-3 transition-colors hover:border-zinc-200 hover:bg-zinc-50 dark:border-white/[0.06] dark:hover:bg-white/[0.03]"
                >
                  <MailAvatar name={m.senderName} size={36} />
                  <button
                    type="button"
                    onClick={() => (engine.setView("mail"), engine.selectMail(m.id))}
                    className="min-w-0 flex-1 cursor-pointer text-left"
                  >
                    <p className="truncate text-sm font-semibold text-zinc-900 dark:text-white">
                      {m.subject}
                    </p>
                    <p className="truncate text-xs text-zinc-500">{m.aiSummary?.[0]}</p>
                  </button>
                  <div className="hidden w-16 shrink-0 sm:block">
                    <div className="h-1.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${92 - i * 9}%` }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="h-full rounded-full bg-gradient-to-r from-amber-400 to-rose-500"
                      />
                    </div>
                    <p className="mt-1 text-right text-[10px] text-zinc-400">{92 - i * 9} score</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => engine.openCompose("reply", m)}
                    className="flex shrink-0 cursor-pointer items-center gap-1 rounded-xl bg-violet-50 px-2.5 py-1.5 text-xs font-semibold text-violet-700 hover:bg-violet-100 dark:bg-violet-500/10 dark:text-violet-300"
                  >
                    <Reply className="h-3.5 w-3.5" /> AI reply
                  </button>
                </motion.li>
              ))}
            </ul>

            {/* Auto categorise */}
            <div className="mt-5 rounded-2xl bg-zinc-50 p-4 dark:bg-white/[0.03]">
              <div className="flex items-center gap-3">
                <FolderTree className="h-5 w-5 text-emerald-500" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                    Auto-organise inbox
                  </p>
                  <p className="text-xs text-zinc-500">
                    Sort mail into smart folders with one click
                  </p>
                </div>
                <button
                  type="button"
                  onClick={organize}
                  disabled={sorting}
                  className="cursor-pointer rounded-xl bg-zinc-900 px-3 py-2 text-xs font-semibold text-white disabled:opacity-60 dark:bg-white dark:text-zinc-900"
                >
                  {sorting ? "Sorting…" : sorted ? "Run again" : "Organise"}
                </button>
              </div>
              <AnimatePresence>
                {(sorting || sorted) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {engine.folders.map((f, i) => (
                        <div
                          key={f.id}
                          className="rounded-xl border border-zinc-200 bg-white p-2.5 dark:border-white/10 dark:bg-zinc-900"
                        >
                          <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                            <span
                              className="h-2 w-2 rounded-full"
                              style={{ background: f.color }}
                            />{" "}
                            {f.name}
                          </div>
                          <motion.p
                            className="font-heading mt-1 text-lg font-semibold text-zinc-900 tabular-nums dark:text-white"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            {sorting ? <TypingDots /> : [412, 286, 318, 188][i % 4]}
                          </motion.p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </SectionCard>

          {/* Writing playground */}
          <SectionCard className="flex flex-col">
            <div className="mb-4 flex items-center gap-2">
              <Wand2 className="h-5 w-5 text-violet-500" />
              <h3 className="font-heading text-base font-semibold text-zinc-900 dark:text-white">
                AI writing playground
              </h3>
            </div>
            <div className="rounded-2xl border border-zinc-200 p-3 focus-within:border-violet-400 focus-within:ring-4 focus-within:ring-violet-500/10 dark:border-white/10">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={2}
                aria-label="Playground prompt"
                className="w-full resize-none bg-transparent text-sm text-zinc-900 outline-none dark:text-white"
              />
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                {TONES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTone(t)}
                    className={cn(
                      "cursor-pointer rounded-full px-2.5 py-1 text-[11.5px] font-medium transition-colors",
                      tone === t
                        ? "bg-violet-600 text-white"
                        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-white/[0.06] dark:text-zinc-400"
                    )}
                  >
                    {t}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={runPlay}
                  disabled={playThinking.isThinking || play.isStreaming}
                  className="ml-auto flex h-8 cursor-pointer items-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-3 text-xs font-semibold text-white disabled:opacity-60"
                >
                  <Sparkles className="h-3.5 w-3.5" /> Write
                </button>
              </div>
            </div>
            <div className="mt-3 min-h-[220px] flex-1">
              <AnimatePresence mode="wait">
                {playThinking.isThinking ? (
                  <ThinkingSteps
                    key="t"
                    steps={["Understanding intent", "Choosing tone", "Drafting"]}
                    current={playThinking.step}
                  />
                ) : play.text ? (
                  <motion.div
                    key="r"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="rounded-2xl bg-zinc-50 p-4 dark:bg-white/[0.03]"
                  >
                    <p className="text-[13.5px] leading-relaxed whitespace-pre-wrap text-zinc-700 dark:text-zinc-300">
                      {play.text}
                      {play.isStreaming && <StreamCaret />}
                    </p>
                    {!play.isStreaming && (
                      <button
                        type="button"
                        onClick={() => {
                          engine.openCompose("new");
                          window.setTimeout(
                            () =>
                              engine.updateDraft({
                                to: "daniel@acme.co",
                                subject: "November pilot kickoff",
                                body: play.text,
                              }),
                            0
                          );
                        }}
                        className="mt-3 cursor-pointer rounded-xl bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white dark:bg-white dark:text-zinc-900"
                      >
                        Open in composer →
                      </button>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="e"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex h-full min-h-[200px] items-center justify-center rounded-2xl border border-dashed border-zinc-200 text-sm text-zinc-400 dark:border-white/10"
                  >
                    Pick a tone and press Write
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </SectionCard>
        </div>

        {/* Feature toggles */}
        <SectionCard>
          <h3 className="font-heading mb-1 text-base font-semibold text-zinc-900 dark:text-white">
            AI capabilities
          </h3>
          <p className="mb-4 text-xs text-zinc-500">
            Fine-tune what HudMail AI does automatically.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(
              [
                ["summaries", "Smart summaries", "TL;DR at the top of long emails", ScanText],
                ["categorize", "Auto-categorise", "Route mail into smart folders", FolderTree],
                [
                  "meetings",
                  "Meeting detection",
                  "Turn requests into calendar events",
                  CalendarCheck,
                ],
                ["replies", "Smart replies", "One-tap contextual responses", MessageSquareReply],
                ["followups", "Follow-up nudges", "Remind me if no reply in 3 days", BellRing],
              ] as const
            ).map(([k, t, d, Icon]) => (
              <div
                key={k}
                className="flex items-start gap-3 rounded-2xl border border-zinc-100 p-3.5 dark:border-white/[0.06]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white">{t}</p>
                  <p className="text-xs text-zinc-500">{d}</p>
                </div>
                <Toggle
                  label={t}
                  checked={features[k]}
                  onChange={(v) => setFeatures((f) => ({ ...f, [k]: v }))}
                />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  AI Assistant slide-over                                              */
/* ------------------------------------------------------------------ */
interface Msg {
  id: string;
  role: "user" | "ai";
  text: string;
}

const STARTERS = [
  "Summarise my inbox",
  "What meetings do I have?",
  "Find finance emails",
  "Clean up promotions",
];

export function AiAssistantPanel({
  open,
  onClose,
  engine,
}: {
  open: boolean;
  onClose: () => void;
  engine: MailEngine;
}) {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState<"idle" | "thinking" | "streaming">("idle");
  const streamer = useStreamer();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, streamer.text, phase]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const ask = (q: string) => {
    if (!q.trim() || phase !== "idle") return;
    setMsgs((m) => [...m, { id: `u${Date.now()}`, role: "user", text: q }]);
    setInput("");
    setPhase("thinking");
    window.setTimeout(() => {
      setPhase("streaming");
      streamer.stream(
        answerAssistant(q, engine.allEmails),
        (final) => {
          setMsgs((m) => [...m, { id: `a${Date.now()}`, role: "ai", text: final }]);
          streamer.setText("");
          setPhase("idle");
        },
        10
      );
    }, 1400);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[70] bg-zinc-950/30 backdrop-blur-[2px]"
          />
          <motion.aside
            role="dialog"
            aria-label="AI assistant"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%", transition: { duration: 0.22 } }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed inset-y-0 right-0 z-[75] flex w-full flex-col border-l border-zinc-200 bg-white shadow-2xl sm:w-[440px] sm:rounded-l-[28px] dark:border-white/10 dark:bg-zinc-950"
          >
            <div className="relative flex h-16 shrink-0 items-center gap-3 overflow-hidden border-b border-zinc-100 px-5 dark:border-white/[0.06]">
              <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-violet-500/20 blur-3xl" />
              <AiOrb size={30} spinning={phase !== "idle"} />
              <div className="flex-1">
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">HudMail AI</p>
                <p className="text-xs text-zinc-500">
                  {phase === "idle" ? "Ask anything about your mail" : "Working on it…"}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close assistant"
                onClick={onClose}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-zinc-500 hover:bg-zinc-100 dark:hover:bg-white/5"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div ref={scrollRef} className="aimail-scroll flex-1 space-y-4 overflow-y-auto p-5">
              {msgs.length === 0 && phase === "idle" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-8 text-center"
                >
                  <div className="mx-auto mb-4 w-fit">
                    <AiOrb size={56} />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-zinc-900 dark:text-white">
                    Hi {ME.name.split(" ")[0]}, how can I help?
                  </h3>
                  <p className="mt-1 text-sm text-zinc-500">
                    I can search, summarise, draft and schedule.
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-2">
                    {STARTERS.map((s, i) => (
                      <motion.button
                        key={s}
                        type="button"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                        onClick={() => ask(s)}
                        className="cursor-pointer rounded-2xl border border-zinc-200 p-3 text-left text-[13px] text-zinc-700 transition-all hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-md dark:border-white/10 dark:text-zinc-300"
                      >
                        {s}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {msgs.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={spring}
                  className={cn("flex gap-2.5", m.role === "user" && "justify-end")}
                >
                  {m.role === "ai" && <AiOrb size={26} />}
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-2.5 text-[13.5px] leading-relaxed whitespace-pre-wrap",
                      m.role === "user"
                        ? "rounded-br-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                        : "rounded-tl-md bg-zinc-100 text-zinc-700 dark:bg-white/[0.06] dark:text-zinc-300"
                    )}
                  >
                    {m.role === "ai" ? <Md text={m.text} /> : m.text}
                  </div>
                </motion.div>
              ))}

              {phase === "thinking" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2.5"
                >
                  <AiOrb size={26} spinning />
                  <div className="flex items-center gap-2 rounded-2xl rounded-tl-md bg-zinc-100 px-4 py-3 dark:bg-white/[0.06]">
                    <ShimmerText className="text-[13px] font-medium">
                      Searching your mailbox
                    </ShimmerText>
                    <TypingDots />
                  </div>
                </motion.div>
              )}
              {phase === "streaming" && (
                <div className="flex gap-2.5">
                  <AiOrb size={26} spinning />
                  <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-zinc-100 px-4 py-2.5 text-[13.5px] leading-relaxed whitespace-pre-wrap text-zinc-700 dark:bg-white/[0.06] dark:text-zinc-300">
                    <Md text={streamer.text} />
                    <StreamCaret />
                  </div>
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
              className="shrink-0 border-t border-zinc-100 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] dark:border-white/[0.06]"
            >
              <div className="flex items-end gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 p-2 pl-4 focus-within:border-violet-400 focus-within:ring-4 focus-within:ring-violet-500/10 dark:border-white/10 dark:bg-zinc-900">
                <textarea
                  id="aimail-assistant-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      ask(input);
                    }
                  }}
                  rows={1}
                  placeholder="Ask about your emails…"
                  aria-label="Message AI assistant"
                  className="max-h-32 min-w-0 flex-1 resize-none bg-transparent py-1.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white"
                />
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.9 }}
                  disabled={!input.trim() || phase !== "idle"}
                  aria-label="Send"
                  className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 text-white disabled:opacity-40"
                >
                  <ArrowUp className="h-4 w-4" />
                </motion.button>
              </div>
              <p className="mt-2 text-center text-[10.5px] text-zinc-400">
                AI responses are simulated in this template.
              </p>
            </form>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
