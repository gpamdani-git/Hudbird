import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Archive,
  ArrowLeft,
  CalendarPlus,
  ChevronDown,
  Download,
  FileText,
  Forward,
  Mail as MailIcon,
  Maximize2,
  Paperclip,
  Reply,
  RotateCcw,
  Send,
  ShieldAlert,
  Sparkles,
  Star,
  Trash2,
  Wand2,
  X,
} from "lucide-react";
import { cn } from "@/lib/cn";
import type { Attachment, Mail } from "./types";
import type { MailEngine } from "./useMailEngine";
import { SMART_REPLIES } from "./data";
import { generateEmail, summarize, useStreamer, useThinking } from "./ai";
import {
  AiOrb,
  IconButton,
  MailAvatar,
  ShimmerText,
  StreamCaret,
  ThinkingSteps,
  ease,
  spring,
} from "./primitives";

const SUMMARY_STEPS = ["Reading the email", "Extracting key points", "Detecting action items"];
const REPLY_STEPS = ["Reading the thread", "Matching your tone", "Drafting reply"];

function detectMeeting(m: Mail) {
  return /\b(call|meeting|pilot|kickoff|sync|webinar)\b/i.test(m.body) && m.folder !== "sent";
}

export function MailDetail({
  mail,
  engine,
  onBack,
}: {
  mail: Mail;
  engine: MailEngine;
  onBack: () => void;
}) {
  const summaryThinking = useThinking();
  const summaryStream = useStreamer();
  const [summaryOpen, setSummaryOpen] = useState(true);

  const replyThinking = useThinking();
  const replyStream = useStreamer();
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [lightbox, setLightbox] = useState<Attachment | null>(null);
  const [meetingAdded, setMeetingAdded] = useState(false);
  const [threadOpen, setThreadOpen] = useState(false);
  const replyRef = useRef<HTMLTextAreaElement>(null);

  // Auto-run AI summary on open
  useEffect(() => {
    let alive = true;
    setReplyOpen(false);
    setReplyText("");
    setMeetingAdded(false);
    setThreadOpen(false);
    replyStream.stop();
    summaryStream.setText("");
    if (mail.body.length < 120 && !mail.aiSummary) return;
    summaryThinking.think(SUMMARY_STEPS, 380).then(() => {
      if (!alive) return;
      summaryStream.stream(
        summarize(mail)
          .map((s) => `• ${s}`)
          .join("\n"),
        undefined,
        10
      );
    });
    return () => {
      alive = false;
      summaryThinking.cancel();
      summaryStream.stop();
    };
  }, [mail.id]);

  const aiReply = async (prompt: string) => {
    setReplyOpen(true);
    setReplyText("");
    await replyThinking.think(REPLY_STEPS, 360);
    const { body } = generateEmail({ prompt, tone: "Professional", context: mail });
    replyStream.stream(body, (final) => setReplyText(final));
  };

  const smartReplies = SMART_REPLIES[mail.id] ?? SMART_REPLIES.default;
  const isTrashLike = ["trash", "spam", "archive"].includes(mail.folder);
  const shownReply = replyStream.isStreaming ? replyStream.text : replyText;

  const send = () => {
    if (!shownReply.trim()) return;
    engine.sendDirect({
      to: mail.senderEmail,
      subject: mail.subject.startsWith("Re:") ? mail.subject : `Re: ${mail.subject}`,
      body: shownReply,
    });
    setReplyOpen(false);
    setReplyText("");
  };

  return (
    <div className="flex h-full min-h-0 flex-col bg-white dark:bg-[#0f0f10]">
      {/* Toolbar */}
      <div className="flex h-14 shrink-0 items-center gap-1 border-b border-zinc-100 px-2 sm:px-4 dark:border-white/[0.05]">
        <IconButton label="Back" onClick={onBack} className="lg:hidden">
          <ArrowLeft className="h-[18px] w-[18px]" />
        </IconButton>
        {isTrashLike ? (
          <IconButton label="Restore to Inbox" onClick={() => engine.restore([mail.id])}>
            <RotateCcw className="h-4 w-4" />
          </IconButton>
        ) : (
          <IconButton label="Archive" onClick={() => engine.archive([mail.id])}>
            <Archive className="h-4 w-4" />
          </IconButton>
        )}
        <IconButton label="Report spam" onClick={() => engine.markSpam([mail.id])}>
          <ShieldAlert className="h-4 w-4" />
        </IconButton>
        <IconButton
          label="Delete"
          onClick={() => engine.trash([mail.id])}
          className="hover:!bg-rose-50 hover:!text-rose-600 dark:hover:!bg-rose-500/10"
        >
          <Trash2 className="h-4 w-4" />
        </IconButton>
        <div className="mx-1 h-5 w-px bg-zinc-200 dark:bg-white/10" />
        <IconButton
          label="Mark as unread"
          onClick={() => {
            engine.toggleRead(mail.id);
            onBack();
          }}
        >
          <MailIcon className="h-4 w-4" />
        </IconButton>
        <IconButton
          label={mail.isStarred ? "Unstar" : "Star"}
          onClick={() => engine.toggleStar(mail.id)}
        >
          <Star className={cn("h-4 w-4", mail.isStarred && "fill-amber-400 text-amber-400")} />
        </IconButton>
        <div className="ml-auto flex items-center gap-1">
          <IconButton label="Forward" onClick={() => engine.openCompose("forward", mail)}>
            <Forward className="h-4 w-4" />
          </IconButton>
          <button
            type="button"
            onClick={() => {
              setReplyOpen(true);
              window.setTimeout(() => replyRef.current?.focus(), 50);
            }}
            className="flex h-9 cursor-pointer items-center gap-1.5 rounded-xl bg-zinc-900 px-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            <Reply className="h-4 w-4" /> <span className="hidden sm:inline">Reply</span>
          </button>
        </div>
      </div>

      <div className="aimail-scroll flex-1 overflow-y-auto">
        <motion.article
          key={mail.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease }}
          className="mx-auto max-w-3xl px-4 pt-6 pb-32 sm:px-8"
        >
          {/* Subject */}
          <div className="flex flex-wrap items-center gap-2">
            {mail.labels.map((l) => (
              <span
                key={l}
                className="rounded-md bg-zinc-100 px-2 py-0.5 text-[11px] font-semibold text-zinc-600 capitalize dark:bg-white/[0.06] dark:text-zinc-300"
              >
                {l}
              </span>
            ))}
            {mail.aiPriority === "high" && (
              <span className="flex items-center gap-1 rounded-md bg-blue-100 px-2 py-0.5 text-[11px] font-semibold text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
                <Sparkles className="h-3 w-3" /> High priority
              </span>
            )}
          </div>
          <h2 className="font-heading mt-3 text-[22px] leading-snug font-semibold tracking-tight text-zinc-950 sm:text-[26px] dark:text-white">
            {mail.subject}
          </h2>

          {/* Sender */}
          <div className="mt-5 flex items-center gap-3">
            <MailAvatar name={mail.senderName} size={44} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-zinc-900 dark:text-white">
                {mail.senderName}{" "}
                <span className="font-normal text-zinc-500">&lt;{mail.senderEmail}&gt;</span>
              </p>
              <p className="text-xs text-zinc-500">to {mail.to ?? "me"}</p>
            </div>
            <p className="shrink-0 text-xs text-zinc-500">
              {new Date(mail.date).toLocaleString([], {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>
          </div>

          {/* AI Summary */}
          <AnimatePresence>
            {(summaryThinking.isThinking || summaryStream.text) && (
              <motion.section
                initial={{ opacity: 0, y: 8, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={spring}
                className="aimail-ai-border mt-6 overflow-hidden rounded-2xl"
                aria-label="AI summary"
              >
                <button
                  type="button"
                  onClick={() => setSummaryOpen((v) => !v)}
                  className="flex w-full cursor-pointer items-center gap-2.5 px-4 py-3 text-left"
                >
                  <AiOrb
                    size={22}
                    spinning={summaryThinking.isThinking || summaryStream.isStreaming}
                  />
                  {summaryThinking.isThinking ? (
                    <ShimmerText className="text-sm font-semibold">
                      {SUMMARY_STEPS[summaryThinking.step]}…
                    </ShimmerText>
                  ) : (
                    <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                      AI Summary
                    </span>
                  )}
                  <span className="ml-auto text-[11px] text-zinc-400">HudMail AI</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-zinc-400 transition-transform",
                      !summaryOpen && "-rotate-90"
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {summaryOpen && summaryStream.text && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 pb-4 text-[13.5px] leading-relaxed whitespace-pre-wrap text-zinc-700 dark:text-zinc-300">
                        {summaryStream.text}
                        {summaryStream.isStreaming && <StreamCaret />}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.section>
            )}
          </AnimatePresence>

          {/* Meeting detection */}
          {detectMeeting(mail) && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-3 flex flex-wrap items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/70 px-4 py-3 dark:border-emerald-500/20 dark:bg-emerald-500/[0.07]"
            >
              <CalendarPlus className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <p className="flex-1 text-[13px] text-emerald-900 dark:text-emerald-200">
                AI detected a meeting request in this email.
              </p>
              <button
                type="button"
                disabled={meetingAdded}
                onClick={() => {
                  const d = new Date();
                  d.setDate(d.getDate() + 3);
                  engine.addEvent({
                    title: `Call with ${mail.senderName.split(" ")[0]}`,
                    date: d.toISOString().slice(0, 10),
                    start: "11:00",
                    end: "11:30",
                    color: "emerald",
                    attendees: [mail.senderName],
                    fromMailId: mail.id,
                    aiSuggested: true,
                  });
                  setMeetingAdded(true);
                }}
                className="cursor-pointer rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-700 disabled:cursor-default disabled:bg-emerald-600/40"
              >
                {meetingAdded ? "Added ✓" : "Add to calendar"}
              </button>
            </motion.div>
          )}

          {/* Earlier thread */}
          {mail.thread && mail.thread.length > 0 && (
            <div className="mt-6">
              <button
                type="button"
                onClick={() => setThreadOpen((v) => !v)}
                className="flex w-full cursor-pointer items-center gap-2 rounded-xl border border-dashed border-zinc-200 px-4 py-2 text-xs font-medium text-zinc-500 hover:bg-zinc-50 dark:border-white/10 dark:hover:bg-white/[0.03]"
              >
                <ChevronDown
                  className={cn("h-3.5 w-3.5 transition-transform", !threadOpen && "-rotate-90")}
                />
                {mail.thread.length} earlier message{mail.thread.length > 1 ? "s" : ""}
              </button>
              <AnimatePresence>
                {threadOpen &&
                  mail.thread.map((t) => (
                    <motion.div
                      key={t.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 rounded-2xl bg-zinc-50 p-4 dark:bg-white/[0.03]">
                        <div className="mb-2 flex items-center gap-2">
                          <MailAvatar name={t.senderName} size={24} />
                          <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                            {t.senderName}
                          </span>
                          <span className="ml-auto text-[11px] text-zinc-400">
                            {new Date(t.date).toLocaleDateString([], {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <p className="text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                          {t.body}
                        </p>
                      </div>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
          )}

          {/* Body */}
          <div className="mt-6 text-[15px] leading-[1.75] whitespace-pre-wrap text-zinc-800 dark:text-zinc-300">
            {mail.body}
          </div>

          {/* Attachments */}
          {mail.attachments && mail.attachments.length > 0 && (
            <div className="mt-8">
              <p className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                <Paperclip className="h-3.5 w-3.5" /> {mail.attachments.length} attachments
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {mail.attachments.map((a, i) => (
                  <motion.button
                    key={a.name}
                    type="button"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    whileHover={{ y: -2 }}
                    onClick={() => a.type === "image" && setLightbox(a)}
                    className="group cursor-pointer overflow-hidden rounded-2xl border border-zinc-200 bg-white text-left transition-shadow hover:shadow-lg dark:border-white/10 dark:bg-zinc-900"
                  >
                    {a.type === "image" ? (
                      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                        <img
                          src={a.url}
                          alt={a.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <span className="absolute top-2 right-2 rounded-lg bg-black/50 p-1.5 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                          <Maximize2 className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    ) : (
                      <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900">
                        <div className="flex h-12 w-10 items-center justify-center rounded-lg bg-rose-500 text-[10px] font-bold text-white shadow-md">
                          {a.name.split(".").pop()?.toUpperCase()}
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-2 px-3 py-2">
                      <FileText className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-xs font-medium text-zinc-800 dark:text-zinc-200">
                          {a.name}
                        </span>
                        <span className="block text-[10px] text-zinc-400">{a.size}</span>
                      </span>
                      <Download className="h-3.5 w-3.5 shrink-0 text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-white" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Smart replies */}
          {!replyOpen && mail.folder !== "sent" && (
            <div className="mt-10">
              <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                <Sparkles className="h-3.5 w-3.5 text-blue-500" /> Smart replies
              </p>
              <div className="flex flex-wrap gap-2">
                {smartReplies.map((r, i) => (
                  <motion.button
                    key={r}
                    type="button"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.06 }}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => aiReply(r)}
                    className="cursor-pointer rounded-full border border-blue-200 bg-blue-50/60 px-4 py-2 text-[13px] font-medium text-blue-800 transition-colors hover:border-blue-300 hover:bg-blue-100 dark:border-blue-500/20 dark:bg-blue-500/[0.08] dark:text-blue-200 dark:hover:bg-blue-500/15"
                  >
                    {r}
                  </motion.button>
                ))}
                <button
                  type="button"
                  onClick={() => aiReply("reply")}
                  className="flex cursor-pointer items-center gap-1.5 rounded-full border border-zinc-200 px-4 py-2 text-[13px] font-medium text-zinc-700 hover:bg-zinc-50 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-white/5"
                >
                  <Wand2 className="h-3.5 w-3.5" /> Write full reply
                </button>
              </div>
            </div>
          )}

          {/* Inline reply */}
          <AnimatePresence>
            {replyOpen && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={spring}
                className="mt-8 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-[0_20px_50px_-20px_rgba(15,23,42,0.25)] dark:border-white/10 dark:bg-zinc-900"
              >
                <div className="flex items-center gap-2 border-b border-zinc-100 px-4 py-2.5 text-xs text-zinc-500 dark:border-white/[0.06]">
                  <Reply className="h-3.5 w-3.5" /> Replying to{" "}
                  <b className="text-zinc-800 dark:text-zinc-200">{mail.senderName}</b>
                  <button
                    type="button"
                    aria-label="Discard reply"
                    onClick={() => {
                      replyStream.stop();
                      setReplyOpen(false);
                    }}
                    className="ml-auto cursor-pointer rounded-md p-1 hover:bg-zinc-100 dark:hover:bg-white/5"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="p-4">
                  <AnimatePresence mode="wait">
                    {replyThinking.isThinking ? (
                      <ThinkingSteps key="t" steps={REPLY_STEPS} current={replyThinking.step} />
                    ) : replyStream.isStreaming ? (
                      <p
                        key="s"
                        className="min-h-[160px] text-[14.5px] leading-relaxed whitespace-pre-wrap text-zinc-800 dark:text-zinc-200"
                      >
                        {replyStream.text}
                        <StreamCaret />
                      </p>
                    ) : (
                      <textarea
                        key="e"
                        ref={replyRef}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write your reply, or let AI draft it…"
                        aria-label="Reply message"
                        className="min-h-[160px] w-full resize-none bg-transparent text-[14.5px] leading-relaxed text-zinc-800 outline-none placeholder:text-zinc-400 dark:text-zinc-200"
                      />
                    )}
                  </AnimatePresence>
                </div>
                <div className="flex items-center gap-2 border-t border-zinc-100 px-3 py-2.5 dark:border-white/[0.06]">
                  <button
                    type="button"
                    onClick={() => aiReply(replyText || "reply")}
                    disabled={replyThinking.isThinking || replyStream.isStreaming}
                    className="flex h-9 cursor-pointer items-center gap-1.5 rounded-xl bg-blue-50 px-3 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-100 disabled:opacity-50 dark:bg-blue-500/10 dark:text-blue-300"
                  >
                    <Sparkles className="h-4 w-4" /> {replyText ? "Rewrite" : "Write with AI"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      engine.openCompose("reply", mail);
                      window.setTimeout(() => engine.updateDraft({ body: shownReply }), 0);
                      setReplyOpen(false);
                    }}
                    className="hidden h-9 cursor-pointer items-center gap-1.5 rounded-xl px-3 text-sm font-medium text-zinc-500 hover:bg-zinc-100 sm:flex dark:hover:bg-white/5"
                  >
                    <Maximize2 className="h-3.5 w-3.5" /> Pop out
                  </button>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    onClick={send}
                    disabled={!shownReply.trim() || replyStream.isStreaming}
                    className="ml-auto flex h-9 cursor-pointer items-center gap-1.5 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Send <Send className="h-3.5 w-3.5" />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.article>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={spring}
              src={lightbox.url}
              alt={lightbox.name}
              className="max-h-[85vh] max-w-full rounded-2xl shadow-2xl"
            />
            <button
              type="button"
              aria-label="Close preview"
              className="absolute top-4 right-4 cursor-pointer rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white backdrop-blur">
              {lightbox.name} · {lightbox.size}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function EmptyReader({ engine }: { engine: MailEngine }) {
  const unread = engine.counts.inbox ?? 0;
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-[#fafafa] px-8 text-center dark:bg-[#0c0c0d]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={spring}
        className="relative mb-8"
      >
        <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-3xl dark:bg-blue-500/30" />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900">
          <MailIcon className="h-10 w-10 text-zinc-400 dark:text-zinc-500" />
        </div>
      </motion.div>
      <h3 className="font-heading text-xl font-semibold text-zinc-900 dark:text-white">
        Select an email to read
      </h3>
      <p className="mt-2.5 max-w-sm text-sm leading-relaxed text-zinc-500">
        You have <b className="text-zinc-900 dark:text-white">{unread} unread</b> emails. Let AI
        give you a 30-second brief of what matters.
      </p>
      <div className="mt-8 flex gap-3">
        <motion.button
          type="button"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => engine.setView("ai")}
          className="flex cursor-pointer items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white dark:bg-blue-600"
        >
          <Sparkles className="h-4 w-4" /> Get AI brief
        </motion.button>
        <motion.button
          type="button"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => engine.openCompose("new")}
          className="cursor-pointer rounded-2xl border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          Compose
        </motion.button>
      </div>
    </div>
  );
}
