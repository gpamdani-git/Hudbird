import React, { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform, type PanInfo } from "motion/react";
import {
  Archive,
  Check,
  Clock,
  FolderInput,
  Inbox,
  Mail as MailIcon,
  MailOpen,
  Minus,
  Paperclip,
  RefreshCw,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { cn } from "@/lib/cn";
import type { ListFilter, Mail } from "./types";
import type { MailEngine } from "./useMailEngine";
import {
  IconButton,
  MailAvatar,
  MenuItem,
  PopoverPanel,
  formatMailDate,
  spring,
  useClickOutside,
} from "./primitives";

const FILTERS: { id: ListFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
  { id: "read", label: "Read" },
  { id: "starred", label: "Starred" },
  { id: "attachments", label: "Files" },
];

const LABEL_STYLES: Record<string, string> = {
  work: "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300",
  personal: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
  finance: "bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-300",
  social: "bg-pink-50 text-pink-700 dark:bg-pink-500/10 dark:text-pink-300",
  promotions: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
  updates: "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300",
};

/* ------------------------------------------------------------------ */
/*  Row                                                                 */
/* ------------------------------------------------------------------ */
function MailRow({
  mail,
  engine,
  active,
  checked,
  index,
  onOpen,
}: {
  mail: Mail;
  engine: MailEngine;
  active: boolean;
  checked: boolean;
  index: number;
  onOpen: () => void;
}) {
  const x = useMotionValue(0);
  const archiveOpacity = useTransform(x, [20, 90], [0, 1]);
  const trashOpacity = useTransform(x, [-20, -90], [0, 1]);
  const archiveScale = useTransform(x, [20, 90], [0.6, 1]);
  const trashScale = useTransform(x, [-20, -90], [0.6, 1]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > 90) engine.archive([mail.id]);
    else if (info.offset.x < -90) engine.trash([mail.id]);
  };

  const isOutgoing = ["sent", "drafts", "scheduled"].includes(mail.folder);
  const displayName = isOutgoing ? (mail.to ? `To: ${mail.to}` : "No recipient") : mail.senderName;

  const stop = (fn: () => void) => (e: React.MouseEvent) => {
    e.stopPropagation();
    fn();
  };

  return (
    <motion.li
      layout="position"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0, transition: { delay: Math.min(index * 0.03, 0.3), ...spring } }}
      exit={{ opacity: 0, x: -40, height: 0, transition: { duration: 0.22 } }}
      className="relative overflow-hidden"
    >
      {/* swipe backgrounds */}
      <motion.div
        style={{ opacity: archiveOpacity }}
        className="absolute inset-0 flex items-center bg-emerald-500 pl-6 text-sm font-semibold text-white dark:bg-emerald-600"
      >
        <motion.span style={{ scale: archiveScale }} className="flex items-center gap-2">
          <Archive className="h-5 w-5" /> Archive
        </motion.span>
      </motion.div>
      <motion.div
        style={{ opacity: trashOpacity }}
        className="absolute inset-0 flex items-center justify-end bg-rose-500 pr-6 text-sm font-semibold text-white dark:bg-rose-600"
      >
        <motion.span style={{ scale: trashScale }} className="flex items-center gap-2">
          Delete <Trash2 className="h-5 w-5" />
        </motion.span>
      </motion.div>

      <motion.div
        style={{ x }}
        drag="x"
        dragDirectionLock
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.5}
        onDragEnd={onDragEnd}
        onClick={onOpen}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onOpen()}
        aria-label={`${mail.isRead ? "" : "Unread, "}${mail.senderName}: ${mail.subject}`}
        className={cn(
          "group relative flex cursor-pointer gap-4 border-b border-zinc-100 px-4 py-4 transition-colors outline-none focus-visible:bg-blue-50/60 sm:px-5 dark:border-white/[0.05] dark:focus-visible:bg-blue-500/10",
          active
            ? "bg-blue-50/80 dark:bg-blue-500/[0.08]"
            : checked
              ? "bg-blue-50/50 dark:bg-blue-500/[0.05]"
              : "bg-white hover:bg-zinc-50/80 dark:bg-[#0f0f10] dark:hover:bg-[#1f1f22]"
        )}
      >
        {active && (
          <motion.span
            layoutId="aimail-row-active"
            transition={spring}
            className="absolute inset-y-2 left-0 w-[3px] rounded-r-full bg-blue-600"
          />
        )}

        {/* avatar / checkbox */}
        <div className="relative flex h-[38px] w-[38px] shrink-0 items-center justify-center pt-0.5">
          <div
            className={cn(
              "absolute inset-0 transition-opacity",
              checked ? "opacity-0" : "group-hover:opacity-0"
            )}
          >
            <MailAvatar name={isOutgoing ? mail.to || "Draft" : mail.senderName} size={38} />
          </div>
          <button
            type="button"
            aria-label={checked ? "Deselect" : "Select"}
            onClick={stop(() => engine.toggleChecked(mail.id))}
            className={cn(
              "relative z-10 flex h-5 w-5 cursor-pointer items-center justify-center rounded border-[1.5px] transition-all",
              checked
                ? "border-blue-600 bg-blue-600 text-white opacity-100"
                : "border-zinc-300 bg-white opacity-0 shadow-sm group-hover:opacity-100 dark:border-zinc-500 dark:bg-zinc-800"
            )}
          >
            {checked && <Check className="h-3 w-3" strokeWidth={3} />}
          </button>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            {!mail.isRead && (
              <span className="h-2 w-2 shrink-0 rounded-full bg-blue-600" aria-hidden />
            )}
            <span
              className={cn(
                "truncate text-[14px]",
                mail.isRead
                  ? "font-medium text-zinc-700 dark:text-zinc-300"
                  : "font-semibold text-zinc-950 dark:text-white"
              )}
            >
              {displayName}
            </span>
            {mail.threadCount && (
              <span className="shrink-0 rounded-md bg-zinc-100 px-1.5 text-[10px] font-semibold text-zinc-500 dark:bg-white/[0.06]">
                {mail.threadCount}
              </span>
            )}
            {mail.aiPriority === "high" && (
              <span className="flex shrink-0 items-center gap-0.5 rounded-md bg-blue-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-blue-600 dark:text-blue-300">
                <Sparkles className="h-2.5 w-2.5" /> Priority
              </span>
            )}
            <span
              className={cn(
                "ml-auto shrink-0 text-xs tabular-nums transition-opacity md:group-hover:opacity-0",
                mail.isRead ? "text-zinc-400" : "font-semibold text-blue-600 dark:text-blue-400"
              )}
            >
              {mail.folder === "drafts" ? (
                <span className="text-rose-500">Draft</span>
              ) : (
                formatMailDate(mail.date)
              )}
            </span>
          </div>

          <p
            className={cn(
              "mt-0.5 truncate text-[13.5px]",
              mail.isRead
                ? "text-zinc-600 dark:text-zinc-400"
                : "font-semibold text-zinc-900 dark:text-zinc-100"
            )}
          >
            {mail.subject}
          </p>
          <p className="mt-0.5 line-clamp-1 text-[13px] text-zinc-500 dark:text-zinc-500">
            {mail.preview}
          </p>

          {(mail.labels.length > 0 || mail.attachments?.length) && (
            <div className="mt-2 flex items-center gap-1.5 overflow-hidden">
              {mail.labels.slice(0, 2).map((l) => (
                <span
                  key={l}
                  className={cn(
                    "shrink-0 rounded-md px-1.5 py-0.5 text-[10.5px] font-semibold capitalize",
                    LABEL_STYLES[l]
                  )}
                >
                  {l}
                </span>
              ))}
              {mail.attachments?.slice(0, 2).map((a) =>
                a.type === "image" ? (
                  <span
                    key={a.name}
                    className="flex shrink-0 items-center gap-1.5 rounded-lg border border-zinc-200 bg-white py-0.5 pr-2 pl-0.5 text-[11px] text-zinc-600 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300"
                  >
                    <img
                      src={a.url}
                      alt=""
                      className="h-5 w-5 rounded-md object-cover"
                      loading="lazy"
                    />
                    <span className="max-w-[90px] truncate">{a.name}</span>
                  </span>
                ) : (
                  <span
                    key={a.name}
                    className="flex shrink-0 items-center gap-1 rounded-lg border border-zinc-200 bg-white px-2 py-0.5 text-[11px] text-zinc-600 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300"
                  >
                    <Paperclip className="h-3 w-3" />
                    <span className="max-w-[90px] truncate">{a.name}</span>
                  </span>
                )
              )}
            </div>
          )}
        </div>

        {/* star */}
        <button
          type="button"
          aria-label={mail.isStarred ? "Unstar" : "Star"}
          onClick={stop(() => engine.toggleStar(mail.id))}
          className="mt-6 shrink-0 cursor-pointer self-start p-1"
        >
          <motion.span whileTap={{ scale: 1.5, rotate: 72 }} className="block">
            <Star
              className={cn(
                "h-4 w-4 transition-colors",
                mail.isStarred
                  ? "fill-amber-400 text-amber-400"
                  : "text-zinc-300 hover:text-zinc-500 dark:text-zinc-600"
              )}
            />
          </motion.span>
        </button>

        {/* hover actions (desktop) */}
        <div className="absolute top-3 right-4 hidden items-center gap-0.5 rounded-xl border border-zinc-200 bg-white p-0.5 opacity-0 shadow-sm transition-all group-hover:opacity-100 md:flex dark:border-white/10 dark:bg-zinc-900">
          {mail.folder === "trash" || mail.folder === "spam" || mail.folder === "archive" ? (
            <IconButton
              label="Restore to Inbox"
              className="h-7 w-7"
              onClick={stop(() => engine.restore([mail.id]))}
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </IconButton>
          ) : (
            <IconButton
              label="Archive"
              className="h-7 w-7"
              onClick={stop(() => engine.archive([mail.id]))}
            >
              <Archive className="h-3.5 w-3.5" />
            </IconButton>
          )}
          <IconButton
            label={mail.isRead ? "Mark as unread" : "Mark as read"}
            className="h-7 w-7"
            onClick={stop(() => engine.toggleRead(mail.id))}
          >
            {mail.isRead ? (
              <MailIcon className="h-3.5 w-3.5" />
            ) : (
              <MailOpen className="h-3.5 w-3.5" />
            )}
          </IconButton>
          <IconButton
            label="Snooze"
            className="h-7 w-7"
            onClick={stop(() => engine.snooze([mail.id]))}
          >
            <Clock className="h-3.5 w-3.5" />
          </IconButton>
          <IconButton
            label="Delete"
            className="h-7 w-7 hover:!bg-rose-50 hover:!text-rose-600 dark:hover:!bg-rose-500/10"
            onClick={stop(() => engine.trash([mail.id]))}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </IconButton>
        </div>
      </motion.div>
    </motion.li>
  );
}

/* ------------------------------------------------------------------ */
/*  Bulk toolbar                                                        */
/* ------------------------------------------------------------------ */
function BulkBar({ engine }: { engine: MailEngine }) {
  const ids = [...engine.checked];
  const [moveOpen, setMoveOpen] = useState(false);
  const moveRef = useClickOutside<HTMLDivElement>(moveOpen, () => setMoveOpen(false));
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={spring}
      className="flex items-center gap-1 rounded-2xl bg-zinc-900 px-2 py-1.5 text-white shadow-lg dark:bg-white dark:text-zinc-900"
    >
      <button
        type="button"
        aria-label="Clear selection"
        onClick={() => engine.checkAll(false)}
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg hover:bg-white/10 dark:hover:bg-zinc-100"
      >
        <X className="h-4 w-4" />
      </button>
      <span className="mr-auto pl-1 text-sm font-semibold tabular-nums">{ids.length} selected</span>
      {[
        { label: "Archive", icon: Archive, run: () => engine.archive(ids) },
        {
          label: "Mark read",
          icon: MailOpen,
          run: () => (engine.setRead(ids, true), engine.checkAll(false)),
        },
        {
          label: "Mark unread",
          icon: MailIcon,
          run: () => (engine.setRead(ids, false), engine.checkAll(false)),
        },
        { label: "Spam", icon: ShieldAlert, run: () => engine.markSpam(ids) },
        { label: "Delete", icon: Trash2, run: () => engine.trash(ids) },
      ].map((a) => (
        <button
          key={a.label}
          type="button"
          aria-label={a.label}
          title={a.label}
          onClick={a.run}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg hover:bg-white/10 dark:hover:bg-zinc-100"
        >
          <a.icon className="h-4 w-4" />
        </button>
      ))}
      <div ref={moveRef} className="relative">
        <button
          type="button"
          aria-label="Move to folder"
          title="Move to folder"
          onClick={() => setMoveOpen((v) => !v)}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg hover:bg-white/10 dark:hover:bg-zinc-100"
        >
          <FolderInput className="h-4 w-4" />
        </button>
        <PopoverPanel open={moveOpen} className="w-52 p-1.5 text-zinc-900 dark:text-white">
          <MenuItem icon={Inbox} onClick={() => engine.moveTo(ids, "inbox", "Inbox")}>
            Inbox
          </MenuItem>
          {engine.folders.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => engine.moveTo(ids, f.id)}
              className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/[0.06]"
            >
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: f.color }} />
              {f.name}
            </button>
          ))}
        </PopoverPanel>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  List                                                                */
/* ------------------------------------------------------------------ */
export function MailList({ engine }: { engine: MailEngine }) {
  const [refreshing, setRefreshing] = useState(false);
  const emails = engine.emails;
  const allChecked = emails.length > 0 && emails.every((m) => engine.checked.has(m.id));
  const someChecked = engine.checked.size > 0;

  const highPriority = engine.allEmails.filter(
    (m) => m.folder === "inbox" && m.aiPriority === "high" && !m.isRead
  );
  const showAiStrip =
    engine.activeFolder === "inbox" && !engine.searchQuery && engine.filter === "all";

  const refresh = () => {
    setRefreshing(true);
    window.setTimeout(() => {
      setRefreshing(false);
      engine.toast("Inbox is up to date", { tone: "success" });
    }, 900);
  };

  const open = (m: Mail) => {
    if (m.folder === "drafts") engine.openCompose("draft", m);
    else engine.selectMail(m.id);
  };

  return (
    <div className="flex h-full min-h-0 flex-col bg-white dark:bg-[#0f0f10]">
      {/* toolbar */}
      <div className="sticky top-0 z-10 space-y-3 border-b border-zinc-100 bg-white/90 px-4 pt-3 pb-3 backdrop-blur sm:px-5 dark:border-white/[0.05] dark:bg-[#0f0f10]/90">
        <AnimatePresence mode="wait" initial={false}>
          {someChecked ? (
            <BulkBar key="bulk" engine={engine} />
          ) : (
            <motion.div
              key="filters"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <button
                type="button"
                aria-label={allChecked ? "Deselect all" : "Select all"}
                onClick={() => engine.checkAll(!allChecked)}
                className="flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-md border-2 border-zinc-300 text-white transition-colors hover:border-zinc-400 dark:border-zinc-600"
              >
                {someChecked && <Minus className="h-3 w-3" />}
              </button>
              <div
                className="aimail-noscroll flex flex-1 items-center gap-1 overflow-x-auto"
                role="tablist"
                aria-label="Filter emails"
              >
                {FILTERS.map((f) => {
                  const on = engine.filter === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      role="tab"
                      aria-selected={on}
                      onClick={() => engine.setFilter(f.id)}
                      className={cn(
                        "relative h-8 shrink-0 cursor-pointer rounded-full px-3 text-[12.5px] font-medium transition-colors",
                        on
                          ? "text-white dark:text-zinc-900"
                          : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                      )}
                    >
                      {on && (
                        <motion.span
                          layoutId="aimail-filter"
                          transition={spring}
                          className="absolute inset-0 rounded-full bg-zinc-900 dark:bg-white"
                        />
                      )}
                      <span className="relative">{f.label}</span>
                    </button>
                  );
                })}
              </div>
              <IconButton label="Refresh" onClick={refresh} className="h-8 w-8">
                <RefreshCw className={cn("h-4 w-4", refreshing && "animate-spin")} />
              </IconButton>
            </motion.div>
          )}
        </AnimatePresence>

        {engine.searchQuery && (
          <div className="flex items-center justify-between rounded-xl bg-blue-50 px-3 py-2 text-xs text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
            <span>
              {emails.length} results for <b>"{engine.searchQuery}"</b> across all mail
            </span>
            <button
              type="button"
              onClick={() => engine.setSearchQuery("")}
              className="cursor-pointer font-semibold hover:underline"
            >
              Clear
            </button>
          </div>
        )}

        {(engine.activeFolder === "trash" || engine.activeFolder === "spam") &&
          emails.length > 0 &&
          !engine.searchQuery && (
            <div className="flex items-center justify-between rounded-xl bg-zinc-100 px-3 py-2 text-xs text-zinc-600 dark:bg-white/[0.04] dark:text-zinc-400">
              <span>Items here are deleted forever after 30 days.</span>
              <button
                type="button"
                onClick={() => engine.emptyFolder(engine.activeFolder as "trash" | "spam")}
                className="cursor-pointer font-semibold text-rose-600 hover:underline dark:text-rose-400"
              >
                Empty {engine.activeFolder} now
              </button>
            </div>
          )}
      </div>

      <div className="aimail-scroll relative flex-1 overflow-y-auto pb-24 md:pb-4">
        {showAiStrip && highPriority.length > 0 && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => engine.setView("ai")}
            className="aimail-ai-border group mx-4 mt-3 mb-1 flex w-[calc(100%-2rem)] cursor-pointer items-center gap-3 rounded-2xl p-3 text-left sm:mx-5 sm:w-[calc(100%-2.5rem)]"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/30">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[13px] font-semibold text-zinc-900 dark:text-white">
                {highPriority.length} emails need your reply
              </span>
              <span className="block truncate text-xs text-zinc-500">
                {highPriority.map((m) => m.senderName.split(" ")[0]).join(", ")} · AI sorted by
                urgency
              </span>
            </span>
            <span className="text-xs font-semibold text-blue-600 transition-transform group-hover:translate-x-0.5 dark:text-blue-300">
              Review →
            </span>
          </motion.button>
        )}

        {emails.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center px-8 py-24 text-center"
          >
            <div className="relative mb-5">
              <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-2xl" />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900">
                <Inbox className="h-7 w-7 text-zinc-400" />
              </div>
            </div>
            <p className="font-heading text-lg font-semibold text-zinc-900 dark:text-white">
              {engine.searchQuery ? "No results found" : "All clear here"}
            </p>
            <p className="mt-1 max-w-xs text-sm text-zinc-500">
              {engine.searchQuery
                ? "Try different keywords or ask AI to search for you."
                : "Nothing in this view right now. Enjoy the calm ✨"}
            </p>
          </motion.div>
        ) : (
          <ul>
            <AnimatePresence initial={false}>
              {emails.map((m, i) => (
                <MailRow
                  key={m.id}
                  mail={m}
                  index={i}
                  engine={engine}
                  active={engine.selectedMailId === m.id}
                  checked={engine.checked.has(m.id)}
                  onOpen={() => open(m)}
                />
              ))}
            </AnimatePresence>
          </ul>
        )}
        {emails.length > 0 && (
          <p className="py-6 text-center text-xs text-zinc-400 md:hidden">
            Swipe right to archive · left to delete
          </p>
        )}
      </div>
    </div>
  );
}
