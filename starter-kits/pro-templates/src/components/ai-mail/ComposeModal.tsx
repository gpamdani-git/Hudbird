import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  AlignLeft,
  Check,
  ChevronDown,
  Clock,
  FileText,
  ImagePlus,
  Loader2,
  Maximize2,
  Minimize2,
  Minus,
  Paperclip,
  Send,
  Sparkles,
  SpellCheck,
  Trash2,
  Type,
  Wand2,
  X,
} from "lucide-react";
import { cn } from "@/lib/cn";
import type { Attachment, ComposeDraft, Mail } from "./types";
import type { MailEngine } from "./useMailEngine";
import { AI_IMAGE_POOL, TONES, type Tone } from "./data";
import { THINKING_STEPS, generateEmail, rewrite, useStreamer, useThinking } from "./ai";
import {
  AiOrb,
  IconButton,
  MailAvatar,
  ShimmerText,
  StreamCaret,
  ThinkingSteps,
  spring,
  useClickOutside,
} from "./primitives";

const PROMPT_IDEAS = [
  "Follow up on the Q4 launch deck",
  "Schedule a call with Daniel next week",
  "Politely decline the conference invite",
  "Thank the team for the offsite",
];

const CONTACTS = [
  { name: "Sofia Lindqvist", email: "sofia@northwind.io" },
  { name: "Marcus Chen", email: "marcus@pixelforge.design" },
  { name: "Daniel Okafor", email: "daniel@acme.co" },
  { name: "Priya Raman", email: "priya@hudmail.ai" },
  { name: "Jordan Blake", email: "jordan@clientco.com" },
];

const uid = () => Math.random().toString(36).slice(2, 9);

function formatSize(bytes: number) {
  if (bytes > 1e6) return `${(bytes / 1e6).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1e3))} KB`;
}

/* ------------------------------------------------------------------ */
/*  AI image generator (simulated)                                       */
/* ------------------------------------------------------------------ */
function ImageGenerator({
  onDone,
  onCancel,
}: {
  onDone: (a: Attachment) => void;
  onCancel: () => void;
}) {
  const [prompt, setPrompt] = useState("");
  const [progress, setProgress] = useState(-1);
  const [img] = useState(() => AI_IMAGE_POOL[Math.floor(Math.random() * AI_IMAGE_POOL.length)]);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  const run = () => {
    if (!prompt.trim()) return;
    setProgress(0);
    const t = window.setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          window.clearInterval(t);
          return 100;
        }
        return Math.min(100, p + 4 + Math.random() * 8);
      });
    }, 110);
  };

  useEffect(() => {
    if (progress >= 100) {
      const t = window.setTimeout(() => {
        doneRef.current({
          id: uid(),
          name: `${prompt.trim().slice(0, 24).replace(/\s+/g, "-").toLowerCase() || "ai-image"}.png`,
          size: "1.6 MB",
          type: "image",
          url: img,
          aiGenerated: true,
        });
      }, 600);
      return () => window.clearTimeout(t);
    }
  }, [progress, img, prompt]);

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="overflow-hidden"
    >
      <div className="mx-4 mb-3 rounded-2xl border border-fuchsia-200 bg-gradient-to-br from-fuchsia-50 to-violet-50 p-3 dark:border-fuchsia-500/20 dark:from-fuchsia-500/[0.07] dark:to-violet-500/[0.07]">
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-fuchsia-700 dark:text-fuchsia-300">
          <ImagePlus className="h-3.5 w-3.5" /> Generate image with AI
          <button
            type="button"
            aria-label="Close image generator"
            onClick={onCancel}
            className="ml-auto cursor-pointer opacity-60 hover:opacity-100"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
        {progress < 0 ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              run();
            }}
            className="flex gap-2"
          >
            <input
              autoFocus
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A glass envelope floating in violet light…"
              aria-label="Image prompt"
              className="h-9 min-w-0 flex-1 rounded-xl border border-fuchsia-200 bg-white px-3 text-sm outline-none focus:ring-4 focus:ring-fuchsia-500/15 dark:border-white/10 dark:bg-zinc-900 dark:text-white"
            />
            <button
              type="submit"
              className="h-9 shrink-0 cursor-pointer rounded-xl bg-fuchsia-600 px-3 text-sm font-semibold text-white hover:bg-fuchsia-700"
            >
              Generate
            </button>
          </form>
        ) : (
          <div className="flex items-center gap-3">
            <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-zinc-200 dark:bg-zinc-800">
              <motion.img
                src={img}
                alt=""
                className="h-full w-full object-cover"
                animate={{
                  filter: `blur(${Math.max(0, 18 - progress / 5.5)}px) saturate(${0.4 + progress / 160})`,
                  scale: 1.15 - progress / 700,
                }}
              />
              {progress < 100 && (
                <div className="absolute inset-0 animate-[aimail-shimmer_1.4s_linear_infinite] bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.45)_50%,transparent_70%)] bg-[length:200%_100%]" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              {progress < 100 ? (
                <ShimmerText className="text-sm font-semibold">Rendering pixels…</ShimmerText>
              ) : (
                <p className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  <Check className="h-4 w-4" /> Attached to email
                </p>
              )}
              <p className="mt-0.5 truncate text-xs text-zinc-500">"{prompt}"</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white dark:bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-600"
                  animate={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Compose                                                              */
/* ------------------------------------------------------------------ */
export function ComposeModal({
  draft,
  engine,
  context,
}: {
  draft: ComposeDraft;
  engine: MailEngine;
  context?: Mail | null;
}) {
  const [minimized, setMinimized] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [showCc, setShowCc] = useState(!!draft.cc);
  const [aiOpen, setAiOpen] = useState(draft.mode === "new" && !draft.body);
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState<Tone>("Professional");
  const [imageGen, setImageGen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [toFocus, setToFocus] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [rewriting, setRewriting] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const scheduleRef = useClickOutside<HTMLDivElement>(scheduleOpen, () => setScheduleOpen(false));

  const thinking = useThinking();
  const streamer = useStreamer();
  const busy = thinking.isThinking || streamer.isStreaming || !!rewriting;

  const generate = async () => {
    const p = prompt.trim() || (context ? "reply" : "");
    if (!p) return;
    await thinking.think(THINKING_STEPS, 400);
    const { subject, body } = generateEmail({ prompt: p, tone, to: draft.to, context });
    if (!draft.subject) engine.updateDraft({ subject });
    streamer.stream(body, (final) => engine.updateDraft({ body: final }));
    setAiOpen(false);
  };

  const runRewrite = (action: "shorten" | "expand" | "formal" | "fix", label: string) => {
    if (!draft.body.trim()) return;
    setRewriting(label);
    window.setTimeout(() => {
      setRewriting(null);
      streamer.stream(
        rewrite(draft.body, action),
        (final) => engine.updateDraft({ body: final }),
        8
      );
    }, 900);
  };

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach((f) => {
      engine.addAttachment({
        id: uid(),
        name: f.name,
        size: formatSize(f.size),
        type: f.type.startsWith("image")
          ? "image"
          : f.type.startsWith("video")
            ? "video"
            : "document",
        url: f.type.startsWith("image") ? URL.createObjectURL(f) : "#",
      });
    });
  };

  const scheduleAt = (label: string, hoursFromNow: number) => {
    setScheduleOpen(false);
    engine.sendMail(new Date(Date.now() + hoursFromNow * 3600_000).toISOString());
  };

  const suggestions =
    draft.to.length > 0 && toFocus
      ? CONTACTS.filter(
          (c) =>
            (c.name.toLowerCase().includes(draft.to.toLowerCase()) ||
              c.email.includes(draft.to.toLowerCase())) &&
            c.email !== draft.to
        )
      : [];

  const title =
    draft.mode === "reply"
      ? "Reply"
      : draft.mode === "forward"
        ? "Forward"
        : draft.mode === "draft"
          ? "Edit draft"
          : "New message";

  const sending = draft.status === "sending" || draft.status === "sent";

  return (
    <>
      {/* mobile + maximized backdrop */}
      <AnimatePresence>
        {(maximized || !minimized) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => maximized && setMaximized(false)}
            className={cn(
              "fixed inset-0 z-[80] bg-zinc-950/30 backdrop-blur-[2px]",
              maximized ? "block" : "md:hidden",
              minimized && "hidden"
            )}
          />
        )}
      </AnimatePresence>

      <motion.section
        role="dialog"
        aria-label={title}
        layout
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97, transition: { duration: 0.18 } }}
        transition={spring}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          addFiles(e.dataTransfer.files);
        }}
        className={cn(
          "fixed z-[85] flex flex-col overflow-hidden border border-zinc-200 bg-white shadow-[0_30px_80px_-20px_rgba(15,23,42,0.45)] dark:border-white/10 dark:bg-zinc-900 dark:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]",
          minimized
            ? "right-4 bottom-20 h-12 w-[300px] rounded-2xl md:bottom-4"
            : maximized
              ? "inset-3 rounded-3xl md:inset-x-[8%] md:inset-y-[5%]"
              : "inset-0 rounded-none md:inset-auto md:right-6 md:bottom-6 md:h-[min(720px,calc(100vh-48px))] md:w-[600px] md:rounded-3xl"
        )}
      >
        {/* Header */}
        <div
          className={cn(
            "flex h-12 shrink-0 cursor-default items-center gap-2 px-4",
            minimized
              ? "cursor-pointer bg-zinc-900 text-white dark:bg-zinc-800"
              : "border-b border-zinc-100 dark:border-white/[0.06]"
          )}
          onClick={() => minimized && setMinimized(false)}
        >
          {busy && <AiOrb size={18} spinning />}
          <p
            className={cn(
              "flex-1 truncate text-sm font-semibold",
              !minimized && "text-zinc-900 dark:text-white"
            )}
          >
            {minimized ? draft.subject || title : title}
          </p>
          <span className="hidden text-[11px] text-zinc-400 sm:inline">
            {!minimized && draft.body ? "Draft autosaved" : ""}
          </span>
          <IconButton
            label={minimized ? "Restore" : "Minimize"}
            className={cn(
              "hidden h-8 w-8 md:inline-flex",
              minimized && "text-white hover:bg-white/10 hover:text-white"
            )}
            onClick={(e) => {
              e.stopPropagation();
              setMinimized((v) => !v);
              setMaximized(false);
            }}
          >
            <Minus className="h-4 w-4" />
          </IconButton>
          {!minimized && (
            <IconButton
              label={maximized ? "Exit full screen" : "Full screen"}
              className="hidden h-8 w-8 md:inline-flex"
              onClick={() => setMaximized((v) => !v)}
            >
              {maximized ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </IconButton>
          )}
          <IconButton
            label="Close and save draft"
            className={cn("h-8 w-8", minimized && "text-white hover:bg-white/10 hover:text-white")}
            onClick={(e) => {
              e.stopPropagation();
              engine.closeCompose(true);
            }}
          >
            <X className="h-4 w-4" />
          </IconButton>
        </div>

        {!minimized && (
          <>
            {/* Sending overlay */}
            <AnimatePresence>
              {sending && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 top-12 z-20 flex flex-col items-center justify-center gap-4 bg-white/90 backdrop-blur-sm dark:bg-zinc-900/90"
                >
                  {draft.status === "sent" ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 320, damping: 14 }}
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-500/30"
                    >
                      <Check className="h-8 w-8" strokeWidth={3} />
                    </motion.div>
                  ) : (
                    <motion.div
                      animate={{
                        x: [0, 6, 0, -6, 0],
                        y: [0, -6, 0, -3, 0],
                        rotate: [0, -8, 0, 4, 0],
                      }}
                      transition={{ repeat: Infinity, duration: 1.2 }}
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl shadow-blue-600/30"
                    >
                      <Send className="h-7 w-7" />
                    </motion.div>
                  )}
                  <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                    {draft.status === "sent" ? "Sent!" : "Sending…"}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Drag overlay */}
            {dragOver && (
              <div className="pointer-events-none absolute inset-2 top-14 z-30 flex items-center justify-center rounded-2xl border-2 border-dashed border-blue-500 bg-blue-50/90 text-sm font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                Drop files to attach
              </div>
            )}

            {/* Recipients */}
            <div className="relative shrink-0 border-b border-zinc-100 px-4 dark:border-white/[0.06]">
              <div className="flex h-11 items-center gap-2">
                <span className="w-12 text-sm text-zinc-400">To</span>
                {draft.to && /@/.test(draft.to) && !toFocus ? (
                  <button
                    type="button"
                    onClick={() => setToFocus(true)}
                    className="flex cursor-pointer items-center gap-1.5 rounded-full bg-zinc-100 py-0.5 pr-2.5 pl-0.5 text-sm text-zinc-800 dark:bg-white/[0.08] dark:text-zinc-200"
                  >
                    <MailAvatar
                      name={CONTACTS.find((c) => c.email === draft.to)?.name ?? draft.to}
                      size={22}
                      className="ring-0"
                    />
                    {draft.to}
                  </button>
                ) : (
                  <input
                    id="aimail-compose-to"
                    autoFocus={draft.mode === "forward"}
                    value={draft.to}
                    onFocus={() => setToFocus(true)}
                    onBlur={() => window.setTimeout(() => setToFocus(false), 150)}
                    onChange={(e) => engine.updateDraft({ to: e.target.value })}
                    placeholder="name@company.com"
                    aria-label="Recipients"
                    className="min-w-0 flex-1 bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white"
                  />
                )}
                <button
                  type="button"
                  onClick={() => setShowCc((v) => !v)}
                  className="ml-auto cursor-pointer text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                >
                  Cc/Bcc
                </button>
              </div>
              <AnimatePresence>
                {suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-full right-4 left-16 z-30 rounded-2xl border border-zinc-200 bg-white p-1 shadow-xl dark:border-white/10 dark:bg-zinc-900"
                  >
                    {suggestions.map((c) => (
                      <button
                        key={c.email}
                        type="button"
                        onMouseDown={() => engine.updateDraft({ to: c.email })}
                        className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-left hover:bg-zinc-100 dark:hover:bg-white/5"
                      >
                        <MailAvatar name={c.name} size={28} />
                        <span>
                          <span className="block text-sm font-medium text-zinc-900 dark:text-white">
                            {c.name}
                          </span>
                          <span className="block text-xs text-zinc-500">{c.email}</span>
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence initial={false}>
                {showCc && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 44, opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="flex items-center gap-2 overflow-hidden border-t border-zinc-100 dark:border-white/[0.06]"
                  >
                    <span className="w-12 text-sm text-zinc-400">Cc</span>
                    <input
                      value={draft.cc}
                      onChange={(e) => engine.updateDraft({ cc: e.target.value })}
                      aria-label="Cc"
                      className="min-w-0 flex-1 bg-transparent text-sm text-zinc-900 outline-none dark:text-white"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="flex h-11 items-center gap-2 border-t border-zinc-100 dark:border-white/[0.06]">
                <span className="w-12 text-sm text-zinc-400">Subject</span>
                <input
                  id="aimail-compose-subject"
                  value={draft.subject}
                  onChange={(e) => engine.updateDraft({ subject: e.target.value })}
                  placeholder="What's this about?"
                  aria-label="Subject"
                  className="min-w-0 flex-1 bg-transparent text-sm font-medium text-zinc-900 outline-none placeholder:font-normal placeholder:text-zinc-400 dark:text-white"
                />
              </div>
            </div>

            {/* Body */}
            <div className="aimail-scroll relative flex min-h-0 flex-1 flex-col overflow-y-auto">
              {/* AI prompt panel */}
              <AnimatePresence initial={false}>
                {aiOpen && !thinking.isThinking && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="shrink-0 overflow-hidden"
                  >
                    <div className="m-4 mb-2 rounded-2xl bg-gradient-to-br from-violet-500/80 via-fuchsia-500/70 to-sky-500/80 p-px">
                      <div className="rounded-[15px] bg-white p-3 dark:bg-zinc-900">
                        <div className="flex items-start gap-2.5">
                          <AiOrb size={26} />
                          <textarea
                            id="aimail-ai-prompt"
                            autoFocus={draft.mode === "new"}
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                generate();
                              }
                            }}
                            rows={2}
                            placeholder={
                              context
                                ? "How should I reply? e.g. accept and propose Tuesday"
                                : "Describe the email you want to write…"
                            }
                            aria-label="AI prompt"
                            className="min-w-0 flex-1 resize-none bg-transparent pt-1 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white"
                          />
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-1.5">
                          {TONES.map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setTone(t)}
                              className={cn(
                                "relative cursor-pointer rounded-full px-2.5 py-1 text-[11.5px] font-medium transition-colors",
                                tone === t
                                  ? "text-white"
                                  : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-white/5"
                              )}
                            >
                              {tone === t && (
                                <motion.span
                                  layoutId="compose-tone"
                                  transition={spring}
                                  className="absolute inset-0 rounded-full bg-violet-600"
                                />
                              )}
                              <span className="relative">{t}</span>
                            </button>
                          ))}
                          <motion.button
                            id="aimail-ai-generate"
                            type="button"
                            whileTap={{ scale: 0.96 }}
                            onClick={generate}
                            disabled={!prompt.trim() && !context}
                            className="ml-auto flex h-8 cursor-pointer items-center gap-1.5 rounded-xl bg-zinc-900 px-3 text-xs font-semibold text-white disabled:opacity-40 dark:bg-white dark:text-zinc-900"
                          >
                            <Sparkles className="h-3.5 w-3.5" /> Generate
                          </motion.button>
                        </div>
                      </div>
                    </div>
                    {!prompt && (
                      <div className="aimail-noscroll flex gap-2 overflow-x-auto px-4 pb-2">
                        {PROMPT_IDEAS.map((p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => setPrompt(p)}
                            className="shrink-0 cursor-pointer rounded-full border border-zinc-200 px-3 py-1.5 text-xs text-zinc-600 transition-colors hover:border-violet-300 hover:text-violet-700 dark:border-white/10 dark:text-zinc-400 dark:hover:text-violet-300"
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {thinking.isThinking && (
                  <div className="p-4">
                    <ThinkingSteps steps={THINKING_STEPS} current={thinking.step} />
                  </div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {imageGen && (
                  <ImageGenerator
                    onCancel={() => setImageGen(false)}
                    onDone={(a) => (engine.addAttachment(a), setImageGen(false))}
                  />
                )}
              </AnimatePresence>

              {!thinking.isThinking && (
                <div className="relative flex-1 px-4 pt-2 pb-3">
                  {streamer.isStreaming ? (
                    <p className="text-[14.5px] leading-relaxed whitespace-pre-wrap text-zinc-800 dark:text-zinc-200">
                      {streamer.text}
                      <StreamCaret />
                    </p>
                  ) : (
                    <textarea
                      id="aimail-compose-body"
                      value={draft.body}
                      onChange={(e) => engine.updateDraft({ body: e.target.value })}
                      placeholder={aiOpen ? "…or start typing yourself" : "Write your message…"}
                      aria-label="Message body"
                      className={cn(
                        "h-full min-h-[220px] w-full resize-none bg-transparent text-[14.5px] leading-relaxed text-zinc-800 outline-none placeholder:text-zinc-400 dark:text-zinc-200",
                        rewriting && "opacity-40 blur-[1px]"
                      )}
                    />
                  )}
                  {rewriting && (
                    <div className="absolute inset-x-4 top-4 flex items-center gap-2 rounded-xl bg-white/90 px-3 py-2 shadow-lg dark:bg-zinc-800/90">
                      <AiOrb size={18} spinning />
                      <ShimmerText className="text-sm font-semibold">{rewriting}…</ShimmerText>
                    </div>
                  )}
                </div>
              )}

              {/* AI rewrite tools */}
              {draft.body && !busy && !aiOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="aimail-noscroll flex shrink-0 gap-1.5 overflow-x-auto px-4 pb-3"
                >
                  {[
                    { l: "Shorten", i: AlignLeft, a: "shorten" as const, s: "Making it concise" },
                    { l: "Expand", i: Type, a: "expand" as const, s: "Adding detail" },
                    { l: "More formal", i: Wand2, a: "formal" as const, s: "Adjusting tone" },
                    { l: "Fix grammar", i: SpellCheck, a: "fix" as const, s: "Proofreading" },
                  ].map((t) => (
                    <button
                      key={t.l}
                      type="button"
                      onClick={() => runRewrite(t.a, t.s)}
                      className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full bg-violet-50 px-3 py-1.5 text-xs font-medium text-violet-700 transition-colors hover:bg-violet-100 dark:bg-violet-500/10 dark:text-violet-300 dark:hover:bg-violet-500/20"
                    >
                      <t.i className="h-3.5 w-3.5" /> {t.l}
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Attachments */}
              {draft.attachments.length > 0 && (
                <div className="flex shrink-0 flex-wrap gap-2 px-4 pb-3">
                  <AnimatePresence>
                    {draft.attachments.map((a) => (
                      <motion.div
                        key={a.id ?? a.name}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="group relative flex items-center gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 p-1.5 pr-3 dark:border-white/10 dark:bg-white/[0.04]"
                      >
                        {a.type === "image" ? (
                          <img src={a.url} alt="" className="h-10 w-10 rounded-xl object-cover" />
                        ) : (
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white dark:bg-zinc-800">
                            <FileText className="h-4 w-4 text-zinc-400" />
                          </span>
                        )}
                        <span className="min-w-0">
                          <span className="block max-w-[140px] truncate text-xs font-medium text-zinc-800 dark:text-zinc-200">
                            {a.name}
                          </span>
                          <span className="flex items-center gap-1 text-[10px] text-zinc-400">
                            {a.size}
                            {a.aiGenerated && (
                              <span className="flex items-center gap-0.5 font-semibold text-fuchsia-600 dark:text-fuchsia-400">
                                · <Sparkles className="h-2.5 w-2.5" /> AI
                              </span>
                            )}
                          </span>
                        </span>
                        <button
                          type="button"
                          aria-label={`Remove ${a.name}`}
                          onClick={() => a.id && engine.removeAttachment(a.id)}
                          className="absolute -top-1.5 -right-1.5 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-zinc-900 text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-white dark:text-zinc-900"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex shrink-0 items-center gap-1 border-t border-zinc-100 px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] dark:border-white/[0.06]">
              <div ref={scheduleRef} className="relative flex">
                <motion.button
                  id="aimail-send"
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => engine.sendMail()}
                  disabled={!draft.to.trim() || busy || sending}
                  className="flex h-10 cursor-pointer items-center gap-2 rounded-l-2xl bg-blue-600 pr-3 pl-4 text-sm font-semibold text-white shadow-md shadow-blue-600/25 transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {draft.status === "sending" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  Send
                </motion.button>
                <button
                  type="button"
                  aria-label="Schedule send"
                  onClick={() => setScheduleOpen((v) => !v)}
                  disabled={!draft.to.trim() || busy}
                  className="flex h-10 cursor-pointer items-center rounded-r-2xl border-l border-blue-500 bg-blue-600 px-2 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
                <AnimatePresence>
                  {scheduleOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={spring}
                      className="absolute bottom-full left-0 mb-2 w-60 rounded-2xl border border-zinc-200 bg-white p-1.5 shadow-xl dark:border-white/10 dark:bg-zinc-900"
                    >
                      <p className="px-3 pt-1.5 pb-1 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
                        Schedule send
                      </p>
                      {[
                        ["Tomorrow morning", "8:00 AM", 16],
                        ["Tomorrow afternoon", "1:00 PM", 21],
                        ["Monday morning", "9:00 AM", 72],
                      ].map(([l, t, h]) => (
                        <button
                          key={l as string}
                          type="button"
                          onClick={() => scheduleAt(`${l} ${t}`, h as number)}
                          className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/5"
                        >
                          <span className="flex items-center gap-2">
                            <Clock className="h-3.5 w-3.5 text-zinc-400" /> {l}
                          </span>
                          <span className="text-xs text-zinc-400">{t}</span>
                        </button>
                      ))}
                      <div className="mt-1 flex items-center gap-2 rounded-xl bg-violet-50 px-3 py-2 text-xs text-violet-700 dark:bg-violet-500/10 dark:text-violet-300">
                        <Sparkles className="h-3.5 w-3.5" /> AI suggests: Tue 9:40 AM (highest open
                        rate)
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <IconButton
                label="AI write"
                active={aiOpen}
                onClick={() => setAiOpen((v) => !v)}
                className="ml-1 text-violet-600 dark:text-violet-400"
                id="aimail-compose-ai-toggle"
              >
                <Sparkles className="h-[18px] w-[18px]" />
              </IconButton>
              <IconButton label="Attach files" onClick={() => fileRef.current?.click()}>
                <Paperclip className="h-[18px] w-[18px]" />
              </IconButton>
              <IconButton
                label="Generate image with AI"
                active={imageGen}
                onClick={() => setImageGen((v) => !v)}
              >
                <ImagePlus className="h-[18px] w-[18px]" />
              </IconButton>
              <input
                ref={fileRef}
                type="file"
                multiple
                hidden
                onChange={(e) => addFiles(e.target.files)}
              />

              <IconButton
                label="Discard draft"
                className="ml-auto hover:!bg-rose-50 hover:!text-rose-600 dark:hover:!bg-rose-500/10"
                onClick={() => {
                  streamer.stop();
                  engine.closeCompose(false);
                  engine.toast("Draft discarded");
                }}
              >
                <Trash2 className="h-[18px] w-[18px]" />
              </IconButton>
            </div>
          </>
        )}
      </motion.section>
    </>
  );
}
