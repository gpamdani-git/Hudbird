import React from "react";
import { Mail } from "./types";
import {
  X,
  Trash2,
  Archive,
  AlertCircle,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Star,
  Reply,
  CornerUpLeft,
  FileText,
  Image as ImageIcon,
  FileVideo,
  Download,
  ShieldCheck,
  Search,
  ChevronDown,
  Sparkles,
  Bell,
} from "lucide-react";
import { Avatar } from "@/components/ui";
import { motion, AnimatePresence } from "motion/react";

interface MailDetailProps {
  mail: Mail;
  onBack: () => void;
  onStar: () => void;
}

export function MailDetail({ mail, onBack, onStar }: MailDetailProps) {
  const [actionToast, setActionToast] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (actionToast) {
      const timer = setTimeout(() => setActionToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [actionToast]);

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-[#fcfcfd] dark:bg-[#111111]">
      {/* Toolbar */}
      <div className="flex h-14 shrink-0 items-center gap-4 border-b border-zinc-100 bg-white px-6 dark:border-white/5 dark:bg-[#111111]">
        <div className="flex items-center gap-1 text-zinc-400">
          <button
            onClick={onBack}
            className="rounded p-1.5 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
            title="Close"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="mx-1 h-4 w-px bg-zinc-200 dark:bg-zinc-800" />
          <button
            className="tooltip rounded p-1.5 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          <button
            className="tooltip rounded p-1.5 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
            title="Archive"
          >
            <Archive className="h-4 w-4" />
          </button>
          <button
            className="tooltip rounded p-1.5 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
            title="Spam"
          >
            <AlertCircle className="h-4 w-4" />
          </button>
          <div className="mx-1 h-4 w-px bg-zinc-200 dark:bg-zinc-800" />
          <button
            className="tooltip rounded p-1.5 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
            title="More"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>

        <div className="ml-auto flex items-center gap-2 text-xs font-medium text-zinc-400">
          <button className="rounded p-1 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span>1 of 18</span>
          <button className="rounded p-1 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-8">
        {/* Title */}
        <div className="mb-8 flex items-start justify-between">
          <h1 className="text-xl leading-tight font-bold text-zinc-900 dark:text-white">
            {mail.subject}
          </h1>
          <div className="mt-1 shrink-0 text-xs font-medium text-zinc-500">
            {new Date(mail.date).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}
          </div>
        </div>

        {/* Sender Info */}
        <div className="mb-6 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar name={mail.senderName} size="md" className="h-11 w-11" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-semibold text-zinc-900 dark:text-white">
                  {mail.senderName}
                </span>
                <Sparkles className="h-3.5 w-3.5 text-blue-500" />
                <span className="text-xs text-zinc-500">| {mail.senderEmail}</span>
              </div>
              <div className="mt-0.5 text-[11px] text-zinc-500">
                To:{" "}
                <span className="font-medium text-zinc-700 dark:text-zinc-300">Tomas Adams</span>
                <span className="mx-2">;</span>
                Cc:{" "}
                <span className="font-medium text-zinc-700 dark:text-zinc-300">Jonathan Amiri</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 text-zinc-400">
            <button
              onClick={onStar}
              className={`rounded-full p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 ${mail.isStarred ? "text-yellow-400" : ""}`}
            >
              <Star className={`h-4 w-4 ${mail.isStarred ? "fill-yellow-400" : ""}`} />
            </button>
            <button
              onClick={() => setActionToast("Drafting reply...")}
              className="rounded-full p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <CornerUpLeft className="h-4 w-4" />
            </button>
            <button className="rounded-full p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* AI Banner */}
        <div className="mb-8 flex items-center gap-2 rounded-lg border border-purple-100 bg-purple-50 p-3 text-sm font-medium text-purple-700 dark:border-purple-800/30 dark:bg-purple-900/20 dark:text-purple-300">
          <Sparkles className="h-4 w-4" />
          This message is highly important.
        </div>

        {/* Body */}
        <div className="mb-12 font-serif text-[14px] leading-[1.8] whitespace-pre-wrap text-zinc-800 dark:text-zinc-200">
          {mail.body}
        </div>

        {/* Attachments Area */}
        {mail.attachments && mail.attachments.length > 0 && (
          <div className="mt-8 border-t border-zinc-100 pt-6 dark:border-white/5">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-white">
                Attachment
                <span className="flex items-center gap-1 rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-normal text-zinc-500 dark:bg-zinc-800">
                  Secured by Lexi.ai
                </span>
              </div>
              <button
                className="p-1 text-zinc-400 transition-colors hover:text-zinc-600"
                title="Download All"
              >
                <Download className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {mail.attachments.map((att, i) => (
                <div
                  key={i}
                  className="group flex w-64 cursor-pointer items-center gap-3 rounded-xl border border-zinc-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md dark:border-white/10 dark:bg-zinc-900"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-50 dark:bg-zinc-800">
                    {att.type === "document" && <FileText className="h-5 w-5 text-zinc-400" />}
                    {att.type === "image" && <ImageIcon className="h-5 w-5 text-zinc-400" />}
                    {att.type === "video" && <FileVideo className="h-5 w-5 text-zinc-400" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-0.5 truncate text-xs font-semibold text-zinc-900 dark:text-white">
                      {att.name}
                    </div>
                    <div className="flex items-center gap-2 text-[10px]">
                      <span className="text-zinc-500">{att.size || "12MB"}</span>
                      <span className="font-medium text-blue-500 hover:underline">Download</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Toast Notification Simulation */}
      <AnimatePresence>
        {actionToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-10 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-2xl"
          >
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
            {actionToast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
