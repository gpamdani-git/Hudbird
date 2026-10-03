import React from "react";
import { Mail } from "./types";
import { motion, AnimatePresence, useMotionValue, useTransform } from "motion/react";
import {
  Star,
  Clock,
  Trash2,
  Archive,
  SortDesc,
  Plus,
  FileText,
  Image as ImageIcon,
  FileVideo,
} from "lucide-react";
import { Avatar } from "@/components/ui";

export interface MailListProps {
  emails: Mail[];
  onSelect: (id: string) => void;
  onStar: (id: string) => void;
  onSnooze: (id: string) => void;
  onArchive: (id: string) => void;
  onTrash: (id: string) => void;
  onCompose?: () => void;
  activeFolder: string;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  const isToday = new Date().toDateString() === d.toDateString();
  if (isToday) {
    // "Just now", "10 min ago" logic mock based on image
    return "10 min ago";
  }
  return d.toLocaleDateString([], { month: "short", day: "numeric" });
}

function MailItem({
  mail,
  onSelect,
  onArchive,
  onTrash,
  onSnooze,
}: {
  mail: Mail;
  onSelect: () => void;
  onArchive: () => void;
  onTrash: () => void;
  onSnooze: () => void;
}) {
  const x = useMotionValue(0);
  const archiveOpacity = useTransform(x, [0, 80], [0, 1]);
  const snoozeOpacity = useTransform(x, [0, -80], [0, 1]);

  const handleDragEnd = (_: any, info: any) => {
    const threshold = 80;
    if (info.offset.x > threshold) {
      onArchive();
    } else if (info.offset.x < -threshold) {
      onSnooze();
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, overflow: "hidden", height: 0 }}
      className="group relative overflow-hidden border-b border-zinc-100 bg-white dark:border-white/5 dark:bg-[#111111]"
    >
      {/* Dynamic Backgrounds based on swipe */}
      <motion.div
        className="absolute inset-y-0 left-0 flex w-1/2 items-center bg-green-500 px-6 text-white"
        style={{ opacity: archiveOpacity }}
      >
        <Archive className="mr-2 h-5 w-5" /> Archive
      </motion.div>
      <motion.div
        className="absolute inset-y-0 right-0 flex w-1/2 items-center justify-end bg-orange-500 px-6 text-white"
        style={{ opacity: snoozeOpacity }}
      >
        Snooze <Clock className="ml-2 h-5 w-5" />
      </motion.div>

      <motion.div
        style={{ x }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={{ left: 0.2, right: 0.2 }}
        onDragEnd={handleDragEnd}
        onClick={onSelect}
        whileTap={{ cursor: "grabbing" }}
        className={`relative z-10 flex cursor-pointer gap-3 bg-white p-4 transition-colors hover:bg-zinc-50 dark:bg-[#111111] dark:hover:bg-zinc-900/50`}
      >
        {/* Avatar */}
        <div className="shrink-0 pt-0.5">
          <Avatar name={mail.senderName} size="md" className="h-10 w-10" />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="mb-0.5 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span
                className={`text-[14px] font-semibold ${mail.isRead ? "text-zinc-700 dark:text-zinc-300" : "text-zinc-900 dark:text-white"}`}
              >
                {mail.senderName}
              </span>
              <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
            </div>
            <span className="text-xs font-medium text-zinc-500">{formatDate(mail.date)}</span>
          </div>

          <div
            className={`mb-1 text-[13px] ${mail.isRead ? "font-normal text-zinc-700 dark:text-zinc-300" : "font-semibold text-zinc-900 dark:text-white"}`}
          >
            {mail.subject}
          </div>

          <div className="line-clamp-1 pr-6 text-[12px] leading-relaxed text-zinc-500">
            {mail.preview}
          </div>

          {/* Attachment Chips */}
          {mail.attachments && mail.attachments.length > 0 && (
            <div className="no-scrollbar mt-2.5 flex items-center gap-2 overflow-x-auto pb-1">
              {mail.attachments.map((att, i) => (
                <div
                  key={i}
                  className="flex shrink-0 items-center gap-1.5 rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1 text-[11px] font-medium text-zinc-600 dark:border-white/10 dark:bg-zinc-800/80 dark:text-zinc-300"
                >
                  {att.type === "document" && <FileText className="h-3 w-3 text-zinc-400" />}
                  {att.type === "image" && <ImageIcon className="h-3 w-3 text-zinc-400" />}
                  {att.type === "video" && <FileVideo className="h-3 w-3 text-zinc-400" />}
                  {att.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Hover actions */}
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-white pl-2 opacity-0 shadow-[-10px_0_10px_white] transition-opacity group-hover:opacity-100 dark:bg-[#111111] dark:shadow-[-10px_0_10px_#111111]">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onArchive();
            }}
            className="rounded-full p-1.5 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            title="Archive"
          >
            <Archive className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onTrash();
            }}
            className="rounded-full p-1.5 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            title="Delete"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function MailList({
  emails,
  onSelect,
  onStar,
  onSnooze,
  onArchive,
  onTrash,
  activeFolder,
}: MailListProps) {
  const [activeTab, setActiveTab] = React.useState("All Mails");

  const tabs = [
    { id: "All Mails", label: "All Mails" },
    { id: "Unread", label: "Unread (125)" },
    { id: "Others", label: "Others (5)" },
  ];

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-white dark:bg-[#111111]">
      {/* Header */}
      {/* Segmented Tabs Area (Aligns with Compose button) */}
      <div className="flex shrink-0 items-center justify-between px-4 py-4">
        <div className="mr-2 flex flex-1 items-center gap-1 rounded-lg bg-zinc-100 p-1 dark:bg-zinc-800/80">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative h-8 flex-1 rounded-md text-[11px] font-semibold transition-colors ${
                  isActive
                    ? "text-zinc-900 dark:text-white"
                    : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="maillist-tab-active"
                    className="absolute inset-0 rounded-md bg-white shadow-sm dark:bg-zinc-700"
                    transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10 flex w-full items-center justify-center gap-1.5">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
        <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-400 transition-colors hover:bg-zinc-200 hover:text-zinc-600 dark:bg-zinc-800/80 dark:hover:bg-zinc-700 dark:hover:text-zinc-200">
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* List */}
      <div className="relative flex-1 overflow-y-auto">
        <AnimatePresence>
          {emails.map((mail) => (
            <MailItem
              key={mail.id}
              mail={mail}
              onSelect={() => onSelect(mail.id)}
              onArchive={() => onArchive(mail.id)}
              onTrash={() => onTrash(mail.id)}
              onSnooze={() => onSnooze(mail.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
