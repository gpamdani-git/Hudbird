import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUp,
  AudioLines,
  Brain,
  Check,
  FileText,
  Globe,
  ImageIcon,
  Lock,
  Mic,
  Paperclip,
  PenLine,
  Plus,
  Square,
  Telescope,
  X,
} from "lucide-react";
import type { ComposerMode } from "./types";
import { IconButton, Menu, MenuItem, cx, softSpring, useClickOutside } from "./primitives";

export const MODE_META: Record<
  Exclude<ComposerMode, "chat">,
  { label: string; icon: React.ReactNode; placeholder: string }
> = {
  image: {
    label: "Image",
    icon: <ImageIcon className="h-4 w-4" />,
    placeholder: "Describe or edit an image",
  },
  write: {
    label: "Canvas",
    icon: <PenLine className="h-4 w-4" />,
    placeholder: "What should we write?",
  },
  search: { label: "Search", icon: <Globe className="h-4 w-4" />, placeholder: "Search the web" },
  research: {
    label: "Deep research",
    icon: <Telescope className="h-4 w-4" />,
    placeholder: "Get a detailed report",
  },
};

export interface ComposerProps {
  onSend: (
    text: string,
    opts: { mode: ComposerMode; think: boolean; attachments?: { name: string; size: string }[] }
  ) => void;
  onStop: () => void;
  onVoice: () => void;
  onLocked: (reason: "research" | "image" | "files") => void;
  isGenerating: boolean;
  isGuest: boolean;
  mode: ComposerMode;
  setMode: (m: ComposerMode) => void;
  think: boolean;
  setThink: (v: boolean) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

const DICTATION_TEXT =
  "Summarize the key ideas from my last meeting notes and turn them into action items";

export function Composer({
  onSend,
  onStop,
  onVoice,
  onLocked,
  isGenerating,
  isGuest,
  mode,
  setMode,
  think,
  setThink,
  placeholder,
  autoFocus,
}: ComposerProps) {
  const [text, setText] = useState("");
  const [focused, setFocused] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [attachments, setAttachments] = useState<{ name: string; size: string }[]>([]);
  const [dictating, setDictating] = useState(false);
  const [dictSeconds, setDictSeconds] = useState(0);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const menuRef = useClickOutside<HTMLDivElement>(menuOpen, () => setMenuOpen(false));

  // Autosize
  useEffect(() => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = "0px";
    ta.style.height = Math.min(ta.scrollHeight, 220) + "px";
  }, [text]);

  useEffect(() => {
    if (autoFocus) taRef.current?.focus();
  }, [autoFocus]);

  // Dictation timer
  useEffect(() => {
    if (!dictating) return;
    setDictSeconds(0);
    const id = window.setInterval(() => setDictSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [dictating]);

  const submit = () => {
    if (isGenerating) return;
    if (!text.trim()) return;
    onSend(text, { mode, think, attachments: attachments.length ? attachments : undefined });
    setText("");
    setAttachments([]);
  };

  const acceptDictation = () => {
    setDictating(false);
    let i = 0;
    const id = window.setInterval(() => {
      i += 3;
      setText(DICTATION_TEXT.slice(0, i));
      if (i >= DICTATION_TEXT.length) {
        window.clearInterval(id);
        taRef.current?.focus();
      }
    }, 18);
  };

  const pick = (m: ComposerMode) => {
    setMenuOpen(false);
    if (m === "research") return onLocked("research");
    if (m === "image" && isGuest) return onLocked("image");
    setMode(m);
    taRef.current?.focus();
  };

  const hasText = text.trim().length > 0;
  const glow = isGenerating ? "active" : focused || dictating ? "focus" : undefined;
  const activeMeta = mode !== "chat" ? MODE_META[mode] : null;

  return (
    <div className="relative w-full">
      <motion.div
        layout
        transition={softSpring}
        data-glow={glow}
        className="aichat-glow-ring rounded-[28px] border border-[var(--c-border-strong)] bg-[var(--c-surface)] shadow-[0_8px_40px_-12px_rgb(0_0_0/0.45)]"
      >
        {/* Attachments */}
        <AnimatePresence initial={false}>
          {attachments.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex flex-wrap gap-2 overflow-hidden px-3 pt-3"
            >
              {attachments.map((a) => (
                <motion.div
                  key={a.name}
                  layout
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="group relative flex items-center gap-3 rounded-2xl border border-[var(--c-border)] bg-[var(--c-surface-2)] py-2 pr-8 pl-2"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500 text-white">
                    <FileText className="h-4 w-4" />
                  </span>
                  <span className="text-sm">
                    <span className="block max-w-[160px] truncate font-medium">{a.name}</span>
                    <span className="block text-xs text-[var(--c-subtle)]">PDF · {a.size}</span>
                  </span>
                  <button
                    type="button"
                    aria-label={`Remove ${a.name}`}
                    onClick={() => setAttachments((xs) => xs.filter((x) => x.name !== a.name))}
                    className="absolute top-1.5 right-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--c-invert)] text-[var(--c-invert-text)] opacity-80 transition-opacity hover:opacity-100"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-end gap-1 p-2 pl-2.5">
          {/* Tools */}
          <div className="relative" ref={menuRef}>
            <IconButton
              label="Add files and more"
              tooltipSide="top"
              onClick={() => setMenuOpen((v) => !v)}
              active={menuOpen}
              className="h-10 w-10 rounded-full"
            >
              <motion.span
                animate={{ rotate: menuOpen ? 45 : 0 }}
                transition={softSpring}
                className="inline-flex"
              >
                <Plus className="h-5 w-5" />
              </motion.span>
            </IconButton>
            <Menu open={menuOpen} className="bottom-full left-0 mb-3 w-64" origin="bottom left">
              <MenuItem
                icon={<Paperclip className="h-4 w-4" />}
                onClick={() => {
                  setMenuOpen(false);
                  if (isGuest) return onLocked("files");
                  setAttachments((xs) => [
                    ...xs,
                    {
                      name: xs.length ? `notes-${xs.length + 1}.pdf` : "design-brief.pdf",
                      size: "2.4 MB",
                    },
                  ]);
                }}
              >
                Add photos & files
              </MenuItem>
              <div className="my-1 h-px bg-[var(--c-border)]" />
              <MenuItem icon={<ImageIcon className="h-4 w-4" />} onClick={() => pick("image")}>
                Create image
              </MenuItem>
              <MenuItem icon={<PenLine className="h-4 w-4" />} onClick={() => pick("write")}>
                Write or code in canvas
              </MenuItem>
              <MenuItem icon={<Globe className="h-4 w-4" />} onClick={() => pick("search")}>
                Web search
              </MenuItem>
              <MenuItem
                icon={<Telescope className="h-4 w-4" />}
                onClick={() => pick("research")}
                trailing={
                  <span className="inline-flex items-center gap-1 rounded-full bg-[var(--c-accent-soft)] px-2 py-0.5 text-[11px] font-medium text-[var(--c-accent)]">
                    <Lock className="h-3 w-3" /> Plus
                  </span>
                }
              >
                Deep research
              </MenuItem>
            </Menu>
          </div>

          {/* Mode chip */}
          <AnimatePresence mode="popLayout" initial={false}>
            {activeMeta && (
              <motion.button
                key={mode}
                type="button"
                layout
                initial={{ opacity: 0, scale: 0.7, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.7, filter: "blur(4px)" }}
                transition={softSpring}
                onClick={() => setMode("chat")}
                aria-label={`Remove ${activeMeta.label} mode`}
                className="group mb-1 inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full bg-[var(--c-accent-soft)] pr-2 pl-2.5 text-sm font-medium text-[var(--c-accent)]"
              >
                <span className="group-hover:hidden">{activeMeta.icon}</span>
                <X className="hidden h-4 w-4 group-hover:block" />
                {activeMeta.label}
              </motion.button>
            )}
          </AnimatePresence>

          {/* Input / dictation */}
          <div className="relative flex min-h-10 flex-1 items-center">
            <AnimatePresence mode="wait" initial={false}>
              {dictating ? (
                <motion.div
                  key="dict"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="flex h-10 w-full items-center gap-3 px-2"
                >
                  <DictationWave />
                  <span className="font-mono text-xs text-[var(--c-muted)] tabular-nums">
                    0:{String(dictSeconds).padStart(2, "0")}
                  </span>
                </motion.div>
              ) : (
                <motion.textarea
                  key="ta"
                  ref={taRef}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  rows={1}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                      e.preventDefault();
                      submit();
                    }
                  }}
                  placeholder={activeMeta?.placeholder ?? placeholder ?? "Ask anything"}
                  aria-label="Message"
                  className="aichat-scroll block max-h-[220px] w-full resize-none bg-transparent px-2 py-2 text-[15.5px] leading-6 text-[var(--c-text)] placeholder:text-[var(--c-subtle)] focus:outline-none"
                />
              )}
            </AnimatePresence>
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-1">
            {dictating ? (
              <>
                <IconButton
                  label="Cancel dictation"
                  tooltipSide="top"
                  onClick={() => setDictating(false)}
                  className="h-10 w-10 rounded-full"
                >
                  <X className="h-5 w-5" />
                </IconButton>
                <IconButton
                  label="Accept"
                  tooltipSide="top"
                  onClick={acceptDictation}
                  className="h-10 w-10 rounded-full bg-[var(--c-invert)] text-[var(--c-invert-text)] hover:bg-[var(--c-invert)] hover:text-[var(--c-invert-text)] hover:opacity-90"
                >
                  <Check className="h-5 w-5" />
                </IconButton>
              </>
            ) : (
              <>
                {!isGuest && (
                  <button
                    type="button"
                    onClick={() => setThink(!think)}
                    aria-pressed={think}
                    className={cx(
                      "relative mb-0.5 hidden h-9 items-center gap-1.5 overflow-hidden rounded-full px-3 text-sm font-medium transition-colors sm:inline-flex",
                      think
                        ? "bg-[var(--c-accent-soft)] text-[var(--c-accent)]"
                        : "text-[var(--c-muted)] hover:bg-[var(--c-surface-2)] hover:text-[var(--c-text)]"
                    )}
                  >
                    <motion.span
                      animate={
                        think
                          ? { rotate: [0, -12, 12, 0], scale: [1, 1.15, 1] }
                          : { rotate: 0, scale: 1 }
                      }
                      transition={{ duration: 0.5 }}
                      className="inline-flex"
                    >
                      <Brain className="h-4 w-4" />
                    </motion.span>
                    Think
                  </button>
                )}
                <IconButton
                  label="Dictate"
                  tooltipSide="top"
                  onClick={() => setDictating(true)}
                  className="h-10 w-10 rounded-full"
                >
                  <Mic className="h-[18px] w-[18px]" />
                </IconButton>
                <ActionButton
                  state={isGenerating ? "stop" : hasText ? "send" : "voice"}
                  onSend={submit}
                  onStop={onStop}
                  onVoice={onVoice}
                />
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ActionButton({
  state,
  onSend,
  onStop,
  onVoice,
}: {
  state: "send" | "stop" | "voice";
  onSend: () => void;
  onStop: () => void;
  onVoice: () => void;
}) {
  const label =
    state === "send" ? "Send message" : state === "stop" ? "Stop generating" : "Start voice mode";
  return (
    <motion.button
      type="button"
      aria-label={label}
      title={label}
      onClick={state === "send" ? onSend : state === "stop" ? onStop : onVoice}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      transition={softSpring}
      className={cx(
        "relative inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full transition-colors duration-200",
        state === "voice"
          ? "bg-[var(--c-accent)] text-white shadow-[0_0_24px_-4px_var(--c-accent)]"
          : "bg-[var(--c-invert)] text-[var(--c-invert-text)]"
      )}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={state}
          initial={{ opacity: 0, scale: 0.4, rotate: -45 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.4, rotate: 45 }}
          transition={softSpring}
          className="inline-flex"
        >
          {state === "send" && <ArrowUp className="h-5 w-5" strokeWidth={2.4} />}
          {state === "stop" && <Square className="h-3.5 w-3.5" fill="currentColor" />}
          {state === "voice" && <AudioLines className="h-5 w-5" />}
        </motion.span>
      </AnimatePresence>
      {state === "stop" && (
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-[var(--c-accent)] border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          aria-hidden
        />
      )}
    </motion.button>
  );
}

function DictationWave() {
  const [levels, setLevels] = useState<number[]>(() => Array.from({ length: 48 }, () => 0.15));
  useEffect(() => {
    const id = window.setInterval(() => {
      setLevels((prev) => [
        ...prev.slice(1),
        0.15 + Math.random() * (Math.random() > 0.3 ? 0.85 : 0.25),
      ]);
    }, 80);
    return () => window.clearInterval(id);
  }, []);
  return (
    <div className="flex h-8 flex-1 items-center gap-[3px] overflow-hidden" aria-label="Listening">
      {levels.map((l, i) => (
        <span
          key={i}
          className="w-[3px] shrink-0 rounded-full bg-[var(--c-text)] transition-[height] duration-75"
          style={{ height: `${Math.max(8, l * 100)}%`, opacity: 0.35 + (i / levels.length) * 0.65 }}
        />
      ))}
    </div>
  );
}
