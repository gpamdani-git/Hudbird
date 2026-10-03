import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ChevronDown,
  Download,
  FileText,
  Maximize2,
  Pause,
  PenLine,
  Play,
  RefreshCw,
  Share2,
  ThumbsDown,
  ThumbsUp,
  Volume2,
  Wand2,
} from "lucide-react";
import type { Message } from "./types";
import {
  AudioBars,
  CopyIcon,
  IconButton,
  Logo,
  Markdown,
  cx,
  softSpring,
  spring,
  useCopy,
} from "./primitives";

interface ThreadProps {
  messages: Message[];
  onRegenerate: (id: string) => void;
  onOpenImage: (src: string) => void;
  onOpenCanvas: () => void;
  onToast: (msg: string) => void;
}

export function Thread({
  messages,
  onRegenerate,
  onOpenImage,
  onOpenCanvas,
  onToast,
}: ThreadProps) {
  return (
    <div className="mx-auto flex w-full max-w-[760px] flex-col gap-8 px-4 pt-6 pb-10 sm:px-6">
      <AnimatePresence initial={false}>
        {messages.map((m, i) =>
          m.role === "user" ? (
            <UserMessage key={m.id} message={m} />
          ) : (
            <AssistantMessage
              key={m.id}
              message={m}
              isLast={i === messages.length - 1}
              onRegenerate={() => onRegenerate(m.id)}
              onOpenImage={onOpenImage}
              onOpenCanvas={onOpenCanvas}
              onToast={onToast}
            />
          )
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* User                                                                */
/* ------------------------------------------------------------------ */
function UserMessage({ message }: { message: Message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={spring}
      className="flex flex-col items-end gap-2"
    >
      {message.attachments?.map((a) => (
        <div
          key={a.name}
          className="flex items-center gap-3 rounded-2xl border border-[var(--c-border)] bg-[var(--c-surface)] p-2 pr-4"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500 text-white">
            <FileText className="h-4 w-4" />
          </span>
          <span className="text-sm">
            <span className="block font-medium">{a.name}</span>
            <span className="block text-xs text-[var(--c-subtle)]">PDF · {a.size}</span>
          </span>
        </div>
      ))}
      {message.voice ? (
        <VoiceNote durationSec={message.voice.durationSec} transcript={message.content} />
      ) : (
        <div className="max-w-[85%] rounded-[22px] rounded-br-md bg-[var(--c-surface-2)] px-4 py-2.5 text-[15.5px] leading-6 whitespace-pre-wrap text-[var(--c-text)]">
          {message.content}
        </div>
      )}
    </motion.div>
  );
}

function VoiceNote({ durationSec, transcript }: { durationSec: number; transcript: string }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showText, setShowText] = useState(false);
  const bars = useRef(
    Array.from({ length: 36 }, (_, i) => 0.25 + Math.abs(Math.sin(i * 1.7) * 0.75))
  );

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setProgress((p) => {
        const n = p + 100 / (durationSec * 10);
        if (n >= 100) {
          setPlaying(false);
          return 0;
        }
        return n;
      });
    }, 100);
    return () => window.clearInterval(id);
  }, [playing, durationSec]);

  return (
    <div className="flex max-w-[85%] flex-col items-end gap-1.5">
      <div className="flex items-center gap-3 rounded-[22px] rounded-br-md bg-[var(--c-surface-2)] py-2 pr-4 pl-2">
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause voice message" : "Play voice message"}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--c-invert)] text-[var(--c-invert-text)]"
        >
          {playing ? (
            <Pause className="h-4 w-4" fill="currentColor" />
          ) : (
            <Play className="ml-0.5 h-4 w-4" fill="currentColor" />
          )}
        </motion.button>
        <div className="flex h-8 items-center gap-[3px]" aria-hidden>
          {bars.current.map((h, i) => (
            <motion.span
              key={i}
              className="w-[3px] rounded-full"
              animate={{
                height: `${h * (playing ? 0.7 + Math.random() * 0.5 : 1) * 100}%`,
                backgroundColor:
                  (i / bars.current.length) * 100 <= progress
                    ? "var(--c-accent)"
                    : "var(--c-subtle)",
              }}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
        <span className="font-mono text-xs text-[var(--c-muted)] tabular-nums">
          0:{String(Math.round(durationSec * (1 - progress / 100))).padStart(2, "0")}
        </span>
      </div>
      <button
        type="button"
        onClick={() => setShowText((s) => !s)}
        className="text-xs text-[var(--c-subtle)] hover:text-[var(--c-text)]"
      >
        {showText ? "Hide transcript" : "Show transcript"}
      </button>
      <AnimatePresence>
        {showText && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden text-right text-sm text-[var(--c-muted)]"
          >
            “{transcript}”
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Assistant                                                           */
/* ------------------------------------------------------------------ */
function AssistantMessage({
  message,
  isLast,
  onRegenerate,
  onOpenImage,
  onOpenCanvas,
  onToast,
}: {
  message: Message;
  isLast: boolean;
  onRegenerate: () => void;
  onOpenImage: (src: string) => void;
  onOpenCanvas: () => void;
  onToast: (msg: string) => void;
}) {
  const { status } = message;
  const busy = status !== "done";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={spring}
      className="group/msg relative flex gap-4"
    >
      <div className="relative mt-0.5 hidden h-8 w-8 shrink-0 items-center justify-center sm:flex">
        <ThinkingOrb
          active={status === "thinking" || status === "pending" || status === "generating"}
        />
      </div>

      <div className="min-w-0 flex-1">
        {/* Pending */}
        {status === "pending" && (
          <div className="flex h-8 items-center gap-1.5" aria-label="Assistant is typing">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-2 w-2 rounded-full bg-[var(--c-text)]"
                animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </div>
        )}

        {/* Thinking trace */}
        {message.thinking && <ThinkingTrace message={message} />}

        {/* Search sources */}
        {message.sources && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 flex flex-wrap gap-2"
          >
            {message.sources.map((s, i) => (
              <motion.a
                key={s.domain}
                href="#"
                onClick={(e) => e.preventDefault()}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-2 rounded-full border border-[var(--c-border)] bg-[var(--c-surface)] py-1 pr-3 pl-1 text-xs text-[var(--c-muted)] transition-colors hover:border-[var(--c-border-strong)] hover:text-[var(--c-text)]"
              >
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--c-surface-3)] text-[10px] font-bold text-[var(--c-text)] uppercase">
                  {s.domain[0]}
                </span>
                {s.domain}
              </motion.a>
            ))}
          </motion.div>
        )}

        {/* Image generation */}
        {message.mode === "image" && (status === "generating" || message.images) && (
          <ImageGeneration
            progress={message.progress ?? 0}
            image={message.images?.[0]}
            onOpen={onOpenImage}
            onToast={onToast}
          />
        )}

        {/* Text */}
        {message.content && (status === "streaming" || status === "done") && (
          <Markdown text={message.content} streaming={status === "streaming"} />
        )}

        {/* Canvas card */}
        {message.canvasTitle && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2 }}
            onClick={onOpenCanvas}
            className="mt-4 flex w-full max-w-sm items-center gap-3 rounded-2xl border border-[var(--c-border-strong)] bg-[var(--c-surface)] p-3 text-left transition-colors hover:bg-[var(--c-surface-2)]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 text-white">
              <PenLine className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold">{message.canvasTitle}</span>
              <span className="block text-xs text-[var(--c-subtle)]">Document · Click to open</span>
            </span>
          </motion.button>
        )}

        {/* Actions */}
        {!busy && message.content && (
          <MessageActions
            content={message.content}
            visible={isLast}
            onRegenerate={onRegenerate}
            onToast={onToast}
          />
        )}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Thinking orb — glowing gradient sphere                              */
/* ------------------------------------------------------------------ */
export function ThinkingOrb({ active, size = 32 }: { active: boolean; size?: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <AnimatePresence>
        {active && (
          <motion.div
            className="absolute -inset-2 rounded-full bg-[conic-gradient(from_0deg,#8b5cf6,#3d7bff,#22d3ee,#f472b6,#8b5cf6)] blur-md"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 0.7, scale: [0.9, 1.1, 0.9], rotate: 360 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{
              rotate: { duration: 3, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity },
              opacity: { duration: 0.3 },
            }}
          />
        )}
      </AnimatePresence>
      <motion.div
        className="relative flex h-full w-full items-center justify-center rounded-full border border-[var(--c-border-strong)] bg-[var(--c-bg)]"
        animate={active ? { scale: [1, 0.92, 1] } : { scale: 1 }}
        transition={active ? { duration: 1.4, repeat: Infinity, ease: "easeInOut" } : undefined}
      >
        <Logo size={size * 0.55} animated={active} />
      </motion.div>
    </div>
  );
}

function ThinkingTrace({ message }: { message: Message }) {
  const t = message.thinking!;
  const thinking = message.status === "thinking";
  const [open, setOpen] = useState(false);
  const expanded = thinking || open;

  return (
    <div className="mb-4">
      <button
        type="button"
        onClick={() => !thinking && setOpen((o) => !o)}
        aria-expanded={expanded}
        className="group inline-flex items-center gap-2 text-sm"
      >
        {thinking ? (
          <span className="aichat-shimmer font-medium">
            {t.steps[t.visible - 1] ?? "Thinking"}…
          </span>
        ) : (
          <span className="font-medium text-[var(--c-muted)] group-hover:text-[var(--c-text)]">
            Thought for {t.durationSec}s
          </span>
        )}
        {!thinking && (
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            className="inline-flex text-[var(--c-subtle)]"
          >
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        )}
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.ol
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={softSpring}
            className="relative mt-3 overflow-hidden border-l border-[var(--c-border-strong)] pl-4"
          >
            {t.steps.slice(0, thinking ? t.visible : t.steps.length).map((s, i, arr) => {
              const current = thinking && i === arr.length - 1;
              return (
                <motion.li
                  key={s}
                  initial={{ opacity: 0, x: -8, filter: "blur(4px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  transition={softSpring}
                  className="relative py-1 text-sm text-[var(--c-muted)]"
                >
                  <span
                    className={cx(
                      "absolute top-[11px] -left-[21px] h-2 w-2 rounded-full",
                      current
                        ? "bg-[var(--c-accent)] shadow-[0_0_10px_2px_var(--c-accent)]"
                        : "bg-[var(--c-surface-3)]"
                    )}
                  />
                  <span className={current ? "text-[var(--c-text)]" : undefined}>{s}</span>
                </motion.li>
              );
            })}
          </motion.ol>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Image generation reveal                                             */
/* ------------------------------------------------------------------ */
function ImageGeneration({
  progress,
  image,
  onOpen,
  onToast,
}: {
  progress: number;
  image?: string;
  onOpen: (src: string) => void;
  onToast: (m: string) => void;
}) {
  const done = !!image;
  return (
    <div className="mb-4">
      {!done && (
        <div className="mb-3 flex items-center gap-2 text-sm">
          <span className="aichat-shimmer font-medium">
            {progress < 35
              ? "Sketching composition"
              : progress < 75
                ? "Adding detail"
                : "Final touches"}
            …
          </span>
          <span className="font-mono text-xs text-[var(--c-subtle)] tabular-nums">
            {Math.round(progress)}%
          </span>
        </div>
      )}
      <motion.div
        layout
        className="group/img relative aspect-square w-full max-w-[420px] overflow-hidden rounded-3xl border border-[var(--c-border)]"
      >
        {/* Generating field */}
        <div className="aichat-genfield absolute inset-0" />
        <div className="aichat-noise absolute inset-0 opacity-60" />
        {!done && (
          <motion.div
            className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-white/25 to-transparent"
            animate={{ top: ["-20%", "110%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        {/* Reveal */}
        {image && (
          <motion.img
            src={image}
            alt="Generated"
            initial={{ opacity: 0, filter: "blur(40px) saturate(1.6)", scale: 1.15 }}
            animate={{ opacity: 1, filter: "blur(0px) saturate(1)", scale: 1 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 h-full w-full cursor-zoom-in object-cover"
            onClick={() => onOpen(image)}
          />
        )}
        {done && (
          <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 transition-opacity group-hover/img:opacity-100">
            {[
              {
                icon: <Wand2 className="h-4 w-4" />,
                label: "Edit",
                fn: () => onToast("Select an area to edit"),
              },
              {
                icon: <Download className="h-4 w-4" />,
                label: "Download",
                fn: () => onToast("Image downloaded"),
              },
              {
                icon: <Maximize2 className="h-4 w-4" />,
                label: "Expand",
                fn: () => onOpen(image!),
              },
            ].map((b) => (
              <button
                key={b.label}
                type="button"
                aria-label={b.label}
                onClick={b.fn}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-md transition-colors hover:bg-black/75"
              >
                {b.icon}
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Actions                                                             */
/* ------------------------------------------------------------------ */
function MessageActions({
  content,
  visible,
  onRegenerate,
  onToast,
}: {
  content: string;
  visible: boolean;
  onRegenerate: () => void;
  onToast: (m: string) => void;
}) {
  const { copied, copy } = useCopy();
  const [vote, setVote] = useState<"up" | "down" | null>(null);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    if (!speaking) return;
    const id = window.setTimeout(() => setSpeaking(false), 6000);
    return () => window.clearTimeout(id);
  }, [speaking]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.15 }}
      className={cx(
        "mt-3 -ml-2 flex items-center gap-0.5 transition-opacity duration-200",
        visible ? "opacity-100" : "opacity-0 group-hover/msg:opacity-100 focus-within:opacity-100"
      )}
    >
      <IconButton
        label={copied ? "Copied" : "Copy"}
        onClick={() => copy(content)}
        className="h-8 w-8 rounded-lg"
      >
        <CopyIcon copied={copied} />
      </IconButton>
      <IconButton
        label="Good response"
        onClick={() => setVote(vote === "up" ? null : "up")}
        active={vote === "up"}
        className="h-8 w-8 rounded-lg"
      >
        <motion.span
          animate={vote === "up" ? { scale: [1, 1.35, 1], rotate: [0, -15, 0] } : {}}
          className="inline-flex"
        >
          <ThumbsUp className="h-4 w-4" fill={vote === "up" ? "currentColor" : "none"} />
        </motion.span>
      </IconButton>
      <IconButton
        label="Bad response"
        onClick={() => {
          setVote(vote === "down" ? null : "down");
          if (vote !== "down") onToast("Thanks for the feedback");
        }}
        active={vote === "down"}
        className="h-8 w-8 rounded-lg"
      >
        <ThumbsDown className="h-4 w-4" fill={vote === "down" ? "currentColor" : "none"} />
      </IconButton>
      <IconButton
        label={speaking ? "Stop reading" : "Read aloud"}
        onClick={() => setSpeaking((s) => !s)}
        active={speaking}
        className={cx(
          "h-8 rounded-lg",
          speaking ? "w-auto gap-2 px-2.5 text-[var(--c-accent)]" : "w-8"
        )}
      >
        {speaking ? <AudioBars playing /> : <Volume2 className="h-4 w-4" />}
        {speaking && <span className="text-xs font-medium">Playing</span>}
      </IconButton>
      <IconButton
        label="Share"
        onClick={() => onToast("Link copied to clipboard")}
        className="h-8 w-8 rounded-lg"
      >
        <Share2 className="h-4 w-4" />
      </IconButton>
      <IconButton label="Regenerate" onClick={onRegenerate} className="h-8 w-8 rounded-lg">
        <motion.span whileTap={{ rotate: 180 }} className="inline-flex">
          <RefreshCw className="h-4 w-4" />
        </motion.span>
      </IconButton>
    </motion.div>
  );
}
