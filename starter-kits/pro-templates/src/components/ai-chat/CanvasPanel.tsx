import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  BookOpen,
  Check,
  Download,
  Eye,
  Minus,
  PenLine,
  Plus,
  Smile,
  Sparkles,
  Wand2,
  X,
} from "lucide-react";
import type { CanvasDoc } from "./types";
import type { CanvasAction } from "./useChatEngine";
import { CopyIcon, IconButton, Markdown, cx, softSpring, useCopy } from "./primitives";

interface CanvasPanelProps {
  canvas: CanvasDoc;
  onClose: () => void;
  onAction: (a: CanvasAction) => void;
  onEdit: (content: string) => void;
  onToast: (m: string) => void;
}

export function CanvasPanel({ canvas, onClose, onAction, onEdit, onToast }: CanvasPanelProps) {
  const { copied, copy } = useCopy();
  const [editing, setEditing] = useState(false);
  const streaming = canvas.status === "streaming";

  return (
    <motion.section
      initial={{ x: "100%", opacity: 0.4 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0.4, transition: { duration: 0.22 } }}
      transition={{ type: "spring", bounce: 0.12, visualDuration: 0.45 }}
      className="absolute inset-0 z-40 flex flex-col border-l border-[var(--c-border)] bg-[var(--c-bg)] lg:relative lg:inset-auto lg:w-[56%] lg:shrink-0"
      aria-label="Canvas"
    >
      {/* Progress shimmer while streaming */}
      <AnimatePresence>
        {streaming && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-x-0 top-0 h-0.5 overflow-hidden"
          >
            <motion.div
              className="h-full w-1/3 bg-gradient-to-r from-transparent via-[var(--c-accent)] to-transparent"
              animate={{ x: ["-100%", "300%"] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <header className="flex h-14 shrink-0 items-center gap-2 border-b border-[var(--c-border)] px-3">
        <IconButton label="Close canvas" onClick={onClose}>
          <X className="h-[18px] w-[18px]" />
        </IconButton>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{canvas.title}</p>
          <p className="text-xs text-[var(--c-subtle)]">
            {streaming ? "Writing…" : `Version ${canvas.version} · Saved`}
          </p>
        </div>
        <IconButton
          label={editing ? "Preview" : "Edit"}
          onClick={() => setEditing((e) => !e)}
          active={editing}
          disabled={streaming}
        >
          {editing ? (
            <Eye className="h-[18px] w-[18px]" />
          ) : (
            <PenLine className="h-[18px] w-[18px]" />
          )}
        </IconButton>
        <IconButton label={copied ? "Copied" : "Copy"} onClick={() => copy(canvas.content)}>
          <CopyIcon copied={copied} />
        </IconButton>
        <IconButton label="Download" onClick={() => onToast("Exported as .docx")}>
          <Download className="h-[18px] w-[18px]" />
        </IconButton>
      </header>

      <div className="aichat-scroll relative flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[680px] px-6 py-10 sm:px-10">
          {editing && !streaming ? (
            <textarea
              value={canvas.content}
              onChange={(e) => onEdit(e.target.value)}
              aria-label="Edit document"
              className="aichat-scroll min-h-[70vh] w-full resize-none bg-transparent font-mono text-sm leading-7 text-[var(--c-text)] focus:outline-none"
            />
          ) : (
            <Markdown text={canvas.content} streaming={streaming} />
          )}
        </div>
      </div>

      <CanvasToolbar disabled={streaming} onAction={onAction} onToast={onToast} />
    </motion.section>
  );
}

function CanvasToolbar({
  disabled,
  onAction,
  onToast,
}: {
  disabled: boolean;
  onAction: (a: CanvasAction) => void;
  onToast: (m: string) => void;
}) {
  const [open, setOpen] = useState<null | "length">(null);
  const tools: { id: string; label: string; icon: React.ReactNode; run: () => void }[] = [
    {
      id: "suggest",
      label: "Suggest edits",
      icon: <Wand2 className="h-[18px] w-[18px]" />,
      run: () => onToast("3 suggestions added inline"),
    },
    {
      id: "length",
      label: "Adjust length",
      icon: <Minus className="h-[18px] w-[18px] rotate-90" />,
      run: () => setOpen((o) => (o ? null : "length")),
    },
    {
      id: "reading",
      label: "Reading level",
      icon: <BookOpen className="h-[18px] w-[18px]" />,
      run: () => onAction("reading"),
    },
    {
      id: "polish",
      label: "Add final polish",
      icon: <Sparkles className="h-[18px] w-[18px]" />,
      run: () => onAction("polish"),
    },
    {
      id: "emoji",
      label: "Add emojis",
      icon: <Smile className="h-[18px] w-[18px]" />,
      run: () => onAction("emoji"),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...softSpring, delay: 0.3 }}
      className={cx(
        "absolute right-6 bottom-6 flex flex-col items-end gap-2",
        disabled && "pointer-events-none opacity-40"
      )}
    >
      <AnimatePresence>
        {open === "length" && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            className="absolute right-16 bottom-[72px] flex flex-col gap-1 rounded-2xl border border-[var(--c-border-strong)] bg-[var(--c-elevated)] p-1.5 shadow-xl"
          >
            {[
              { l: "Longer", a: "longer" as const, i: <Plus className="h-4 w-4" /> },
              { l: "Shorter", a: "shorter" as const, i: <Minus className="h-4 w-4" /> },
            ].map((x) => (
              <button
                key={x.l}
                type="button"
                onClick={() => {
                  setOpen(null);
                  onAction(x.a);
                }}
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-[var(--c-surface-2)]"
              >
                {x.i}
                {x.l}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex flex-col gap-1 rounded-full border border-[var(--c-border-strong)] bg-[var(--c-elevated)] p-1.5 shadow-[0_20px_50px_-15px_rgb(0_0_0/0.6)]">
        {tools.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...softSpring, delay: 0.35 + i * 0.05 }}
          >
            <IconButton
              label={t.label}
              tooltipSide="top"
              onClick={t.run}
              active={open === t.id}
              className="h-10 w-10 rounded-full [&>span[role=tooltip]]:top-1/2 [&>span[role=tooltip]]:right-full [&>span[role=tooltip]]:left-auto [&>span[role=tooltip]]:mr-2 [&>span[role=tooltip]]:mb-0 [&>span[role=tooltip]]:translate-x-0 [&>span[role=tooltip]]:-translate-y-1/2"
            >
              {t.icon}
            </IconButton>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function CanvasDoneBadge() {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-emerald-400">
      <Check className="h-3 w-3" /> Saved
    </span>
  );
}
