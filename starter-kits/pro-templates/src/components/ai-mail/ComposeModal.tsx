import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Minimize2,
  Maximize2,
  Paperclip,
  Image as ImageIcon,
  Sparkles,
  Send,
  Loader2,
  Trash2,
} from "lucide-react";
import { ComposeDraft } from "./types";

interface ComposeModalProps {
  draft: ComposeDraft;
  onClose: () => void;
  onUpdate: (updates: Partial<ComposeDraft>) => void;
  onSend: () => void;
  onAiGenerate: (prompt: string) => void;
}

export function ComposeModal({
  draft,
  onClose,
  onUpdate,
  onSend,
  onAiGenerate,
}: ComposeModalProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showAiPrompt, setShowAiPrompt] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");

  if (isMinimized) {
    return (
      <div
        className="fixed right-24 bottom-0 z-50 flex w-64 cursor-pointer items-center justify-between rounded-t-xl border border-zinc-200 bg-white px-4 py-2 shadow-xl dark:border-white/10 dark:bg-zinc-900"
        onClick={() => setIsMinimized(false)}
      >
        <span className="truncate text-sm font-medium">{draft.subject || "New Message"}</span>
        <div className="flex items-center gap-2">
          <button className="rounded p-1 text-zinc-500 hover:bg-zinc-100">
            <Maximize2 className="h-3.5 w-3.5" />
          </button>
          <button
            className="rounded p-1 text-zinc-500 hover:bg-zinc-100"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className={`fixed z-50 flex flex-col overflow-hidden border border-zinc-200 bg-white shadow-2xl transition-all duration-300 dark:border-white/10 dark:bg-zinc-900 ${
        isFullscreen
          ? "inset-0 md:inset-4 md:rounded-xl"
          : "right-24 bottom-0 h-[540px] w-[500px] rounded-t-xl"
      }`}
    >
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-zinc-200 bg-zinc-50 px-4 py-2.5 dark:border-white/10 dark:bg-zinc-800/50">
        <span className="text-sm font-medium">New Message</span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(true)}
            className="rounded p-1.5 text-zinc-500 transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-700"
            title="Minimize"
          >
            <Minimize2 className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="rounded p-1.5 text-zinc-500 transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-700"
            title="Fullscreen"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={onClose}
            className="rounded p-1.5 text-zinc-500 transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-700"
            title="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Fields */}
      <div className="relative flex flex-1 flex-col overflow-hidden">
        <div className="flex items-center border-b border-zinc-100 px-4 py-2 dark:border-white/5">
          <span className="w-16 shrink-0 text-sm text-zinc-500">To</span>
          <input
            type="text"
            className="flex-1 border-none bg-transparent text-sm outline-none"
            value={draft.to}
            onChange={(e) => onUpdate({ to: e.target.value })}
          />
        </div>
        <div className="flex items-center border-b border-zinc-100 px-4 py-2 dark:border-white/5">
          <span className="w-16 shrink-0 text-sm text-zinc-500">Subject</span>
          <input
            type="text"
            className="flex-1 border-none bg-transparent text-sm font-medium outline-none"
            value={draft.subject}
            onChange={(e) => onUpdate({ subject: e.target.value })}
          />
        </div>

        {/* AI Help Overlay */}
        <AnimatePresence>
          {showAiPrompt && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-b border-blue-100 bg-blue-50 p-3 dark:border-blue-800/30 dark:bg-blue-900/20"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Help me write about..."
                  className="flex-1 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-zinc-800"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && aiPrompt.trim()) {
                      onAiGenerate(aiPrompt);
                      setShowAiPrompt(false);
                      setAiPrompt("");
                    }
                  }}
                  autoFocus
                />
                <button
                  onClick={() => {
                    if (aiPrompt.trim()) {
                      onAiGenerate(aiPrompt);
                      setShowAiPrompt(false);
                      setAiPrompt("");
                    }
                  }}
                  className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Generate
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative flex-1">
          <textarea
            className="absolute inset-0 h-full w-full resize-none border-none bg-transparent p-4 text-sm leading-relaxed outline-none"
            value={draft.body}
            onChange={(e) => onUpdate({ body: e.target.value })}
          />
          <AnimatePresence>
            {draft.isAiThinking && (
              <motion.div
                initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
                exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 dark:bg-zinc-900/50"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="relative flex h-10 w-10 items-center justify-center">
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-blue-500 border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <Sparkles className="h-5 w-5 text-blue-500" />
                    </motion.div>
                  </div>
                  <motion.span
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-sm font-medium text-blue-600 dark:text-blue-400"
                  >
                    AI is writing...
                  </motion.span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-white/10 dark:bg-zinc-800/50">
        <div className="flex items-center gap-2">
          <button
            onClick={onSend}
            disabled={draft.status === "sending" || !draft.to}
            className="flex items-center gap-2 rounded-full bg-[#0b57d0] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0842a0] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {draft.status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send"}
          </button>

          <div className="mx-1 h-6 w-px bg-zinc-300 dark:bg-zinc-700" />

          <button
            className="tooltip rounded-full p-2 text-zinc-500 transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-700"
            title="Attach files"
          >
            <Paperclip className="h-4 w-4" />
          </button>
          <button
            className="tooltip rounded-full p-2 text-zinc-500 transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-700"
            title="Insert image"
          >
            <ImageIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAiPrompt(!showAiPrompt)}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30"
          >
            <Sparkles className="h-4 w-4" />
            Help me write
          </button>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-zinc-500 transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-700"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
