import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Archive,
  CalendarDays,
  Clock,
  Crown,
  FileText,
  FolderOpen,
  Headphones,
  Inbox,
  Mail as MailIcon,
  PenSquare,
  Plus,
  Send,
  Settings,
  ShieldAlert,
  Sparkles,
  Star,
  Timer,
  Trash2,
  X,
} from "lucide-react";
import { cn } from "@/lib/cn";
import type { AppView, MailFolder } from "./types";
import type { MailEngine } from "./useMailEngine";
import { spring } from "./primitives";

interface SidebarProps {
  engine: MailEngine;
  onNavigate?: () => void;
  onClose?: () => void;
}

const MAILBOX: { id: MailFolder; label: string; icon: React.ElementType }[] = [
  { id: "inbox", label: "Inbox", icon: Inbox },
  { id: "starred", label: "Starred", icon: Star },
  { id: "snoozed", label: "Snoozed", icon: Clock },
  { id: "sent", label: "Sent", icon: Send },
  { id: "drafts", label: "Drafts", icon: FileText },
  { id: "scheduled", label: "Scheduled", icon: Timer },
  { id: "archive", label: "Archive", icon: Archive },
  { id: "spam", label: "Spam", icon: ShieldAlert },
  { id: "trash", label: "Trash", icon: Trash2 },
];

const WORKSPACE: { id: AppView; label: string; icon: React.ElementType; badge?: string }[] = [
  { id: "ai", label: "AI Features", icon: Sparkles, badge: "New" },
  { id: "calendar", label: "Calendar", icon: CalendarDays },
  { id: "folders", label: "Manage folders", icon: FolderOpen },
];

function NavItem({
  active,
  icon: Icon,
  label,
  count,
  badge,
  onClick,
  dot,
}: {
  active: boolean;
  icon?: React.ElementType;
  label: string;
  count?: number;
  badge?: string;
  dot?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group relative flex h-9 w-full cursor-pointer items-center gap-3 rounded-xl px-3 text-[13.5px] transition-colors",
        active
          ? "font-semibold text-zinc-900 dark:text-white"
          : "text-zinc-600 hover:bg-zinc-100/80 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/[0.04] dark:hover:text-zinc-100"
      )}
    >
      {active && (
        <motion.span
          layoutId="aimail-nav-active"
          transition={spring}
          className="absolute inset-0 rounded-xl bg-white shadow-[0_1px_2px_rgba(15,23,42,0.08),0_0_0_1px_rgba(15,23,42,0.04)] dark:bg-white/[0.08] dark:shadow-none"
        />
      )}
      {dot ? (
        <span className="relative h-2.5 w-2.5 rounded-full" style={{ background: dot }} />
      ) : (
        Icon && (
          <Icon
            className={cn(
              "relative h-4 w-4 shrink-0",
              active ? "text-blue-600 dark:text-blue-400" : "opacity-80"
            )}
          />
        )
      )}
      <span className="relative flex-1 truncate text-left">{label}</span>
      {badge && (
        <span className="relative rounded-full bg-blue-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
          {badge}
        </span>
      )}
      {!!count && (
        <span
          className={cn(
            "relative min-w-5 rounded-full px-1.5 text-center text-[11px] font-semibold tabular-nums",
            active ? "bg-blue-600 text-white" : "text-zinc-500 dark:text-zinc-400"
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}

export function Sidebar({ engine, onNavigate, onClose }: SidebarProps) {
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");

  const goFolder = (f: MailFolder) => {
    engine.setActiveFolder(f);
    onNavigate?.();
  };
  const goView = (v: AppView) => {
    engine.setView(v);
    engine.selectMail(null);
    onNavigate?.();
  };

  const submitFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return setAdding(false);
    const id = engine.createFolder(newName.trim());
    setNewName("");
    setAdding(false);
    goFolder(id);
  };

  const isMail = engine.view === "mail";

  return (
    <aside className="flex h-full w-[272px] shrink-0 flex-col bg-[#f6f6f7] dark:bg-[#0c0c0d]">
      {/* Brand */}
      <div className="flex h-16 shrink-0 items-center justify-between px-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-blue-600">
            <MailIcon className="h-4 w-4 text-white" />
          </div>
          <span className="font-heading text-[17px] font-semibold tracking-tight text-zinc-900 dark:text-white">
            HudMail
          </span>
          <span className="rounded-md border border-zinc-200 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-500 dark:border-white/10">
            AI
          </span>
        </div>
        {onClose && (
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-200/60 md:hidden dark:hover:bg-white/5"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Compose */}
      <div className="px-4 pb-3">
        <motion.button
          id="aimail-compose-btn"
          type="button"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            engine.openCompose("new");
            onNavigate?.();
          }}
          className="group relative flex h-11 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-2xl bg-blue-600 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          <PenSquare className="relative h-4 w-4 text-white" />
          <span className="relative text-white">Compose</span>
          <span className="relative ml-1 flex items-center gap-1 rounded-md bg-white/20 px-1.5 py-0.5 text-[10px] text-white">
            <Sparkles className="h-3 w-3" /> AI
          </span>
        </motion.button>
      </div>

      <nav className="aimail-scroll flex-1 overflow-y-auto px-3 pb-4" aria-label="Mailboxes">
        <p className="px-3 pt-2 pb-1.5 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
          Mailbox
        </p>
        <div className="space-y-0.5">
          {MAILBOX.map((f) => (
            <NavItem
              key={f.id}
              icon={f.icon}
              label={f.label}
              active={isMail && engine.activeFolder === f.id}
              count={engine.counts[f.id]}
              onClick={() => goFolder(f.id)}
            />
          ))}
        </div>

        <p className="px-3 pt-5 pb-1.5 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
          Workspace
        </p>
        <div className="space-y-0.5">
          {WORKSPACE.map((w) => (
            <NavItem
              key={w.id}
              icon={w.icon}
              label={w.label}
              badge={w.badge}
              active={engine.view === w.id}
              onClick={() => goView(w.id)}
            />
          ))}
        </div>

        <div className="flex items-center justify-between px-3 pt-5 pb-1.5">
          <p className="text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
            Folders
          </p>
          <button
            type="button"
            aria-label="New folder"
            onClick={() => setAdding(true)}
            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-zinc-200/70 hover:text-zinc-700 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="space-y-0.5">
          <AnimatePresence initial={false}>
            {engine.folders.map((f) => (
              <motion.div
                key={f.id}
                layout
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
              >
                <NavItem
                  dot={f.color}
                  label={f.name}
                  active={isMail && engine.activeFolder === f.id}
                  count={engine.counts[f.id]}
                  onClick={() => goFolder(f.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
          <AnimatePresence>
            {adding && (
              <motion.form
                onSubmit={submitFolder}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden px-1 pt-1"
              >
                <input
                  autoFocus
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onBlur={submitFolder}
                  onKeyDown={(e) => e.key === "Escape" && setAdding(false)}
                  placeholder="Folder name…"
                  aria-label="New folder name"
                  className="h-9 w-full rounded-xl border border-blue-500 bg-white px-3 text-sm ring-4 ring-blue-500/10 outline-none dark:bg-zinc-900 dark:text-white"
                />
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Bottom */}
      <div className="space-y-3 border-t border-zinc-200/70 p-3 dark:border-white/[0.06]">
        <button
          type="button"
          onClick={() => goView("upgrade")}
          className="group relative w-full cursor-pointer overflow-hidden rounded-2xl border border-zinc-200 bg-white p-4 text-left dark:border-none dark:bg-zinc-900 dark:text-white dark:ring-1 dark:ring-white/10"
        >
          <span className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-blue-50 blur-2xl transition-transform duration-500 group-hover:scale-125 dark:bg-blue-600/50" />
          <span className="absolute -bottom-12 -left-6 h-24 w-24 rounded-full bg-blue-50 blur-2xl dark:bg-blue-600/40" />
          <span className="relative flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-white">
            <Crown className="h-4 w-4 text-blue-600 dark:text-amber-300" /> Upgrade to Pro
          </span>
          <span className="relative mt-1 block text-xs text-zinc-500 dark:text-white/60">
            Unlimited AI drafts & 1 TB storage
          </span>
          <span className="relative mt-3 block h-1.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-white/10">
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: "62%" }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="block h-full rounded-full bg-blue-500 dark:bg-gradient-to-r dark:from-blue-400 dark:to-blue-500"
            />
          </span>
          <span className="relative mt-1.5 block text-[11px] text-zinc-400 dark:text-white/50">
            9.3 GB of 15 GB used
          </span>
        </button>
        <div className="grid grid-cols-2 gap-1">
          <NavItem
            icon={Headphones}
            label="Support"
            active={engine.view === "support"}
            onClick={() => goView("support")}
          />
          <NavItem
            icon={Settings}
            label="Settings"
            active={engine.view === "settings"}
            onClick={() => goView("settings")}
          />
        </div>
      </div>
    </aside>
  );
}
