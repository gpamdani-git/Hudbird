import React, { useState, useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Crown,
  Edit3,
  ExternalLink,
  FolderOpen,
  Globe,
  HelpCircle,
  Inbox,
  Key,
  Lock,
  Mail as MailIcon,
  MessageCircle,
  Monitor,
  Moon,
  Palette,
  Plus,
  Search,
  Send,
  Shield,
  Sparkles,
  Sun,
  Trash2,
  User,
  Users,
  Video,
  Wand2,
  X,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/cn";
import type { MailEngine } from "./useMailEngine";
import type { CalendarEvent } from "./types";
import {
  AiOrb,
  IconButton,
  MailAvatar,
  Modal,
  SectionCard,
  Toggle,
  pageVariants,
  spring,
} from "./primitives";
import { ME } from "./data";

/* ================================================================== */
/*  CALENDAR VIEW                                                      */
/* ================================================================== */
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const EVENT_COLORS: Record<string, string> = {
  blue: "bg-blue-500",
  indigo: "bg-indigo-500",
  emerald: "bg-emerald-500",
  amber: "bg-amber-500",
  rose: "bg-rose-500",
};
const EVENT_BG: Record<string, string> = {
  blue: "bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-500/10 dark:border-blue-500/20 dark:text-blue-200",
  indigo:
    "bg-indigo-50 border-indigo-200 text-indigo-900 dark:bg-indigo-500/10 dark:border-indigo-500/20 dark:text-indigo-200",
  emerald:
    "bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-200",
  amber:
    "bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-200",
  rose: "bg-rose-50 border-rose-200 text-rose-900 dark:bg-rose-500/10 dark:border-rose-500/20 dark:text-rose-200",
};

export function CalendarView({ engine }: { engine: MailEngine }) {
  const [month, setMonth] = useState(() => {
    const d = new Date();
    return { year: d.getFullYear(), month: d.getMonth() };
  });
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "09:00",
    end: "10:00",
    color: "blue" as CalendarEvent["color"],
  });

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const firstDay = new Date(month.year, month.month, 1).getDay();
  const daysInMonth = new Date(month.year, month.month + 1, 0).getDate();
  const monthName = new Date(month.year, month.month).toLocaleDateString("en", {
    month: "long",
    year: "numeric",
  });

  const cells = useMemo(() => {
    const arr: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) arr.push(null);
    for (let d = 1; d <= daysInMonth; d++) arr.push(d);
    return arr;
  }, [firstDay, daysInMonth]);

  const dateStr = (d: number) =>
    `${month.year}-${String(month.month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  const eventsByDate = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    engine.events.forEach((e) => {
      const arr = map.get(e.date) ?? [];
      arr.push(e);
      map.set(e.date, arr);
    });
    return map;
  }, [engine.events]);

  const selectedEvents = selectedDate ? (eventsByDate.get(selectedDate) ?? []) : [];

  const addNewEvent = () => {
    if (!newEvent.title.trim() || !selectedDate) return;
    engine.addEvent({
      title: newEvent.title,
      date: selectedDate,
      start: newEvent.start,
      end: newEvent.end,
      color: newEvent.color,
    });
    setNewEvent({ title: "", start: "09:00", end: "10:00", color: "blue" });
    setAddOpen(false);
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="aimail-scroll h-full overflow-y-auto"
    >
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-6 pb-28 sm:px-6 md:pb-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
              Calendar
            </h2>
            <p className="mt-0.5 text-sm text-zinc-500">{engine.events.length} events this month</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setSelectedDate(todayStr);
              setAddOpen(true);
            }}
            className="flex h-10 cursor-pointer items-center gap-2 rounded-2xl bg-zinc-900 px-4 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
          >
            <Plus className="h-4 w-4" /> New event
          </button>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
          {/* Calendar grid */}
          <SectionCard>
            <div className="mb-5 flex items-center justify-between">
              <button
                type="button"
                onClick={() =>
                  setMonth((m) =>
                    m.month === 0 ? { year: m.year - 1, month: 11 } : { ...m, month: m.month - 1 }
                  )
                }
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-white/5"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <h3 className="font-heading text-base font-semibold text-zinc-900 dark:text-white">
                {monthName}
              </h3>
              <button
                type="button"
                onClick={() =>
                  setMonth((m) =>
                    m.month === 11 ? { year: m.year + 1, month: 0 } : { ...m, month: m.month + 1 }
                  )
                }
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-white/5"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-px">
              {DAYS.map((d) => (
                <div
                  key={d}
                  className="pb-2 text-center text-[11px] font-semibold text-zinc-400 uppercase"
                >
                  {d}
                </div>
              ))}
              {cells.map((day, i) => {
                if (day === null) return <div key={`e-${i}`} className="aspect-square" />;
                const ds = dateStr(day);
                const evts = eventsByDate.get(ds) ?? [];
                const isToday = ds === todayStr;
                const isSelected = ds === selectedDate;
                return (
                  <button
                    key={ds}
                    type="button"
                    onClick={() => setSelectedDate(ds)}
                    className={cn(
                      "group relative flex aspect-square cursor-pointer flex-col items-center justify-start rounded-2xl p-1 text-sm transition-all",
                      isSelected
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                        : isToday
                          ? "bg-blue-50 font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-300"
                          : "text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-white/[0.04]"
                    )}
                  >
                    <span className={cn("mt-1 text-[13px]", isSelected && "font-bold")}>{day}</span>
                    {evts.length > 0 && (
                      <div className="mt-auto mb-1 flex gap-0.5">
                        {evts.slice(0, 3).map((e) => (
                          <span
                            key={e.id}
                            className={cn(
                              "h-1.5 w-1.5 rounded-full",
                              isSelected ? "bg-white/70" : EVENT_COLORS[e.color]
                            )}
                          />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </SectionCard>

          {/* Day detail */}
          <div className="space-y-3">
            <SectionCard>
              <h4 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-white">
                {selectedDate
                  ? new Date(selectedDate + "T12:00").toLocaleDateString("en", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })
                  : "Select a day"}
              </h4>
              {selectedDate && selectedEvents.length === 0 && (
                <p className="py-6 text-center text-sm text-zinc-400">No events</p>
              )}
              <AnimatePresence>
                {selectedEvents.map((e, i) => (
                  <motion.div
                    key={e.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className={cn("mb-2 rounded-xl border p-3", EVENT_BG[e.color])}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-semibold">{e.title}</p>
                        <p className="mt-0.5 text-xs opacity-70">
                          {e.start} – {e.end}
                          {e.location && ` · ${e.location}`}
                        </p>
                        {e.attendees && (
                          <p className="mt-1 text-xs opacity-60">{e.attendees.join(", ")}</p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => engine.removeEvent(e.id)}
                        className="cursor-pointer rounded-lg p-1 opacity-40 transition-opacity hover:opacity-100"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    {e.aiSuggested && (
                      <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/60 px-2 py-0.5 text-[10px] font-semibold dark:bg-white/10">
                        <Sparkles className="h-2.5 w-2.5" /> AI suggested
                      </span>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              {selectedDate && (
                <button
                  type="button"
                  onClick={() => setAddOpen(true)}
                  className="mt-2 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-dashed border-zinc-200 py-2.5 text-xs font-medium text-zinc-500 transition-colors hover:border-blue-300 hover:text-blue-600 dark:border-white/10 dark:hover:border-blue-500/30"
                >
                  <Plus className="h-3.5 w-3.5" /> Add event
                </button>
              )}
            </SectionCard>
          </div>
        </div>
      </div>

      {/* Add event modal */}
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="New event">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addNewEvent();
          }}
          className="space-y-4 p-5"
        >
          <h3 className="font-heading text-lg font-semibold text-zinc-900 dark:text-white">
            New event
          </h3>
          <input
            autoFocus
            value={newEvent.title}
            onChange={(e) => setNewEvent((n) => ({ ...n, title: e.target.value }))}
            placeholder="Event title"
            className="h-11 w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 text-[15px] transition-all outline-none placeholder:text-zinc-400 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/15 dark:border-white/10 dark:bg-zinc-900/50 dark:text-white dark:focus:bg-zinc-900"
          />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-500">Start</label>
              <input
                type="time"
                value={newEvent.start}
                onChange={(e) => setNewEvent((n) => ({ ...n, start: e.target.value }))}
                className="h-11 w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3 text-sm transition-all outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/15 dark:border-white/10 dark:bg-zinc-900/50 dark:text-white dark:focus:bg-zinc-900"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-500">End</label>
              <input
                type="time"
                value={newEvent.end}
                onChange={(e) => setNewEvent((n) => ({ ...n, end: e.target.value }))}
                className="h-11 w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3 text-sm transition-all outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/15 dark:border-white/10 dark:bg-zinc-900/50 dark:text-white dark:focus:bg-zinc-900"
              />
            </div>
          </div>
          <div className="flex gap-2">
            {(["blue", "indigo", "emerald", "amber", "rose"] as const).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setNewEvent((n) => ({ ...n, color: c }))}
                className={cn(
                  "h-7 w-7 cursor-pointer rounded-full transition-all",
                  EVENT_COLORS[c],
                  newEvent.color === c
                    ? "ring-2 ring-offset-2 ring-offset-white dark:ring-offset-zinc-900"
                    : "opacity-50 hover:opacity-80"
                )}
                style={newEvent.color === c ? { ringColor: "currentColor" } : undefined}
              />
            ))}
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setAddOpen(false)}
              className="h-11 flex-1 cursor-pointer rounded-xl border border-zinc-200 bg-white text-[14px] font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:border-white/10 dark:bg-transparent dark:text-zinc-300 dark:hover:bg-white/5 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                engine.addEvent({
                  title: newEvent.title,
                  date: todayStr,
                  start: newEvent.start,
                  end: newEvent.end,
                  color: newEvent.color,
                });
                setNewEvent({ title: "", start: "09:00", end: "10:00", color: "blue" });
                setAddOpen(false);
              }}
              disabled={!newEvent.title.trim()}
              className="h-11 flex-1 cursor-pointer rounded-xl bg-blue-600 text-[14px] font-semibold text-white transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-400 dark:disabled:bg-white/5 dark:disabled:text-zinc-600"
            >
              Add event
            </button>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
}

/* ================================================================== */
/*  MANAGE FOLDERS VIEW                                                */
/* ================================================================== */
export function FoldersView({ engine }: { engine: MailEngine }) {
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [colorPickerId, setColorPickerId] = useState<string | null>(null);

  const PALETTE = [
    "#3b82f6",
    "#8b5cf6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#ec4899",
    "#14b8a6",
    "#6366f1",
  ];

  const startEdit = (id: string, name: string) => {
    setEditId(id);
    setEditName(name);
  };

  const saveEdit = () => {
    if (editId && editName.trim()) engine.renameFolder(editId as `f:${string}`, editName.trim());
    setEditId(null);
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="aimail-scroll h-full overflow-y-auto"
    >
      <div className="mx-auto max-w-4xl space-y-6 px-4 py-6 pb-28 sm:px-6 md:pb-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
              Manage Folders
            </h2>
            <p className="mt-0.5 text-sm text-zinc-500">Organise your mail into custom folders</p>
          </div>
          <button
            type="button"
            onClick={() => setAddOpen(true)}
            className="flex h-10 cursor-pointer items-center gap-2 rounded-2xl bg-zinc-900 px-4 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
          >
            <Plus className="h-4 w-4" /> New folder
          </button>
        </div>

        <SectionCard>
          {engine.folders.length === 0 ? (
            <div className="py-16 text-center">
              <FolderOpen className="mx-auto mb-3 h-10 w-10 text-zinc-300 dark:text-zinc-600" />
              <p className="text-sm font-medium text-zinc-500">No custom folders yet</p>
              <p className="mt-1 text-xs text-zinc-400">
                Create your first folder to organise mail
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <AnimatePresence initial={false}>
                {engine.folders.map((f, i) => (
                  <motion.div
                    key={f.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: i * 0.03, ...spring }}
                  >
                    <div className="flex items-center gap-4 rounded-2xl border border-zinc-100 px-4 py-3.5 transition-colors hover:bg-zinc-50/50 dark:border-white/[0.06] dark:hover:bg-white/[0.02]">
                      <button
                        type="button"
                        aria-label="Change color"
                        onClick={() => setColorPickerId(colorPickerId === f.id ? null : f.id)}
                        className="group/dot cursor-pointer"
                      >
                        <span
                          className="block h-4 w-4 rounded-full shadow-sm transition-all group-hover/dot:scale-110"
                          style={{ background: f.color }}
                        />
                      </button>
                      {editId === f.id ? (
                        <input
                          autoFocus
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          onBlur={saveEdit}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveEdit();
                            if (e.key === "Escape") setEditId(null);
                          }}
                          className="h-9 min-w-0 flex-1 rounded-xl border border-blue-500 bg-white px-3 text-sm font-medium ring-4 ring-blue-500/10 outline-none dark:bg-zinc-900 dark:text-white"
                        />
                      ) : (
                        <span className="min-w-0 flex-1 truncate text-sm font-semibold text-zinc-900 dark:text-white">
                          {f.name}
                        </span>
                      )}
                      <span className="shrink-0 rounded-full bg-zinc-100 px-2.5 py-0.5 text-[11px] font-medium text-zinc-500 tabular-nums dark:bg-white/[0.06] dark:text-zinc-400">
                        {engine.counts[f.id] ?? 0} emails
                      </span>
                      <div className="flex items-center gap-1">
                        <IconButton
                          label="Change color"
                          className="h-8 w-8"
                          onClick={() => setColorPickerId(colorPickerId === f.id ? null : f.id)}
                        >
                          <Palette className="h-3.5 w-3.5" />
                        </IconButton>
                        <IconButton
                          label="Rename"
                          className="h-8 w-8"
                          onClick={() => startEdit(f.id, f.name)}
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </IconButton>
                        <IconButton
                          label="Delete"
                          className="h-8 w-8 hover:!bg-rose-50 hover:!text-rose-600 dark:hover:!bg-rose-500/10"
                          onClick={() => setConfirmDelete(f.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </IconButton>
                      </div>
                    </div>
                    {/* Expandable color picker */}
                    <AnimatePresence>
                      {colorPickerId === f.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={spring}
                          className="overflow-hidden"
                        >
                          <div className="flex items-center gap-3 px-5 py-3">
                            <span className="text-xs font-medium text-zinc-400">Pick color:</span>
                            <div className="flex gap-2">
                              {PALETTE.map((c) => (
                                <motion.button
                                  key={c}
                                  type="button"
                                  whileHover={{ scale: 1.15 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => {
                                    engine.recolorFolder(f.id, c);
                                    setColorPickerId(null);
                                  }}
                                  className={cn(
                                    "h-6 w-6 cursor-pointer rounded-full transition-shadow",
                                    f.color === c
                                      ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-white dark:ring-offset-zinc-900"
                                      : "opacity-60 hover:opacity-100"
                                  )}
                                  style={{ background: c }}
                                />
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </SectionCard>
      </div>

      {/* Add folder modal */}
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="New folder">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (newName.trim()) {
              engine.createFolder(newName.trim());
              setNewName("");
              setAddOpen(false);
            }
          }}
          className="space-y-4 p-5"
        >
          <h3 className="font-heading text-lg font-semibold text-zinc-900 dark:text-white">
            Create folder
          </h3>
          <input
            autoFocus
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Folder name"
            className="h-11 w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 text-[15px] transition-all outline-none placeholder:text-zinc-400 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/15 dark:border-white/10 dark:bg-zinc-900/50 dark:text-white dark:focus:bg-zinc-900"
          />
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setAddOpen(false)}
              className="h-11 flex-1 cursor-pointer rounded-xl border border-zinc-200 bg-white text-[14px] font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:border-white/10 dark:bg-transparent dark:text-zinc-300 dark:hover:bg-white/5 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!newName.trim()}
              className="h-11 flex-1 cursor-pointer rounded-xl bg-blue-600 text-[14px] font-semibold text-white transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-400 dark:disabled:bg-white/5 dark:disabled:text-zinc-600"
            >
              Create
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete confirm */}
      <Modal open={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Delete folder">
        <div className="space-y-4 p-5">
          <h3 className="font-heading text-lg font-semibold text-zinc-900 dark:text-white">
            Delete folder?
          </h3>
          <p className="text-sm text-zinc-500">
            All emails in this folder will be moved back to Inbox. This cannot be undone.
          </p>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setConfirmDelete(null)}
              className="h-11 flex-1 cursor-pointer rounded-xl border border-zinc-200 bg-white text-[14px] font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:border-white/10 dark:bg-transparent dark:text-zinc-300 dark:hover:bg-white/5 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                if (confirmDelete) engine.deleteFolder(confirmDelete as `f:${string}`);
                setConfirmDelete(null);
              }}
              className="h-11 flex-1 cursor-pointer rounded-xl bg-rose-600 text-[14px] font-semibold text-white transition-all hover:bg-rose-700"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}

/* ================================================================== */
/*  SETTINGS VIEW                                                      */
/* ================================================================== */
interface SettingsViewProps {
  engine: MailEngine;
  isDark: boolean;
  onToggleTheme: () => void;
}

export function SettingsView({ engine, isDark, onToggleTheme }: SettingsViewProps) {
  const [tab, setTab] = useState<"general" | "account" | "ai" | "notifications">("general");
  const [settings, setSettings] = useState({
    displayName: ME.name,
    email: ME.email,
    signature: "Best regards,\nAlex Morgan",
    language: "English",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    aiSummaries: true,
    aiCompose: true,
    aiCategorize: true,
    aiSmartReply: true,
    notifEmail: true,
    notifDesktop: true,
    notifSound: false,
    notifDigest: "daily",
  });

  const TABS = [
    { id: "general" as const, label: "General", icon: Monitor },
    { id: "account" as const, label: "Account", icon: User },
    { id: "ai" as const, label: "AI & Smart", icon: Sparkles },
    { id: "notifications" as const, label: "Notifications", icon: Bell },
  ];

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="aimail-scroll h-full overflow-y-auto"
    >
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-6 pb-28 sm:px-6 md:pb-10">
        <div>
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            Settings
          </h2>
          <p className="mt-0.5 text-sm text-zinc-500">Manage your HudMail preferences</p>
        </div>

        {/* Tab bar */}
        <div className="flex gap-1 overflow-x-auto rounded-2xl bg-zinc-100 p-1 dark:bg-white/[0.06]">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className="relative flex h-10 min-w-[100px] flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl text-[13px] font-medium whitespace-nowrap"
            >
              {tab === t.id && (
                <motion.span
                  layoutId="settings-tab"
                  transition={spring}
                  className="absolute inset-0 rounded-xl bg-white shadow-sm dark:bg-zinc-800"
                />
              )}
              <t.icon className="relative h-4 w-4 shrink-0" />
              <span className="relative hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab === "general" && (
            <motion.div
              key="general"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              <SectionCard>
                <h3 className="font-heading mb-4 text-base font-semibold text-zinc-900 dark:text-white">
                  Appearance
                </h3>
                <div className="flex items-center justify-between rounded-xl border border-zinc-100 p-3 dark:border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    {isDark ? (
                      <Moon className="h-5 w-5 text-blue-500" />
                    ) : (
                      <Sun className="h-5 w-5 text-amber-500" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-white">
                        {isDark ? "Dark mode" : "Light mode"}
                      </p>
                      <p className="text-xs text-zinc-500">Switch between light and dark themes</p>
                    </div>
                  </div>
                  <Toggle label="Theme" checked={isDark} onChange={onToggleTheme} />
                </div>
                <div className="mt-3 flex items-center justify-between rounded-xl border border-zinc-100 p-3 dark:border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-white">Language</p>
                      <p className="text-xs text-zinc-500">{settings.language}</p>
                    </div>
                  </div>
                  <select
                    value={settings.language}
                    onChange={(e) => setSettings((s) => ({ ...s, language: e.target.value }))}
                    className="h-8 rounded-lg border border-zinc-200 bg-white px-2 text-xs dark:border-white/10 dark:bg-zinc-900 dark:text-white"
                  >
                    {["English", "Spanish", "French", "German", "Japanese"].map((l) => (
                      <option key={l}>{l}</option>
                    ))}
                  </select>
                </div>
              </SectionCard>

              <SectionCard>
                <h3 className="font-heading mb-4 text-base font-semibold text-zinc-900 dark:text-white">
                  Email signature
                </h3>
                <textarea
                  value={settings.signature}
                  onChange={(e) => setSettings((s) => ({ ...s, signature: e.target.value }))}
                  rows={3}
                  className="w-full rounded-xl border border-zinc-200 bg-white p-3 text-sm text-zinc-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300"
                />
              </SectionCard>
            </motion.div>
          )}

          {tab === "account" && (
            <motion.div
              key="account"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              <SectionCard>
                <h3 className="font-heading mb-4 text-base font-semibold text-zinc-900 dark:text-white">
                  Profile
                </h3>
                <div className="flex items-center gap-4">
                  <MailAvatar name={settings.displayName} size={64} />
                  <div className="flex-1">
                    <input
                      value={settings.displayName}
                      onChange={(e) => setSettings((s) => ({ ...s, displayName: e.target.value }))}
                      className="mb-2 h-10 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm font-medium outline-none focus:border-blue-500 dark:border-white/10 dark:bg-zinc-900 dark:text-white"
                    />
                    <p className="text-xs text-zinc-500">{settings.email}</p>
                  </div>
                </div>
              </SectionCard>
              <SectionCard>
                <h3 className="font-heading mb-4 text-base font-semibold text-zinc-900 dark:text-white">
                  Security
                </h3>
                {[
                  { label: "Change password", desc: "Last changed 30 days ago", icon: Key },
                  { label: "Two-factor authentication", desc: "Not enabled", icon: Shield },
                  {
                    label: "Connected accounts",
                    desc: "Google, Microsoft",
                    icon: Lock,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="mb-2 flex items-center gap-3 rounded-xl border border-zinc-100 p-3 dark:border-white/[0.06]"
                  >
                    <item.icon className="h-5 w-5 text-zinc-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-zinc-900 dark:text-white">
                        {item.label}
                      </p>
                      <p className="text-xs text-zinc-500">{item.desc}</p>
                    </div>
                    <button
                      type="button"
                      className="cursor-pointer rounded-lg px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-500/10"
                    >
                      Manage
                    </button>
                  </div>
                ))}
              </SectionCard>
            </motion.div>
          )}

          {tab === "ai" && (
            <motion.div
              key="ai"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <SectionCard>
                <div className="mb-4 flex items-center gap-2">
                  <AiOrb size={24} />
                  <h3 className="font-heading text-base font-semibold text-zinc-900 dark:text-white">
                    AI Features
                  </h3>
                </div>
                {[
                  {
                    key: "aiSummaries" as const,
                    label: "Smart summaries",
                    desc: "TL;DR at the top of long emails",
                  },
                  {
                    key: "aiCompose" as const,
                    label: "AI compose",
                    desc: "Generate drafts from prompts",
                  },
                  {
                    key: "aiCategorize" as const,
                    label: "Auto-categorise",
                    desc: "Sort emails into smart folders",
                  },
                  {
                    key: "aiSmartReply" as const,
                    label: "Smart replies",
                    desc: "One-tap contextual responses",
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="mb-2 flex items-center gap-3 rounded-xl border border-zinc-100 p-3 dark:border-white/[0.06]"
                  >
                    <Wand2 className="h-5 w-5 text-blue-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-zinc-900 dark:text-white">
                        {item.label}
                      </p>
                      <p className="text-xs text-zinc-500">{item.desc}</p>
                    </div>
                    <Toggle
                      label={item.label}
                      checked={settings[item.key]}
                      onChange={(v) => setSettings((s) => ({ ...s, [item.key]: v }))}
                    />
                  </div>
                ))}
              </SectionCard>
            </motion.div>
          )}

          {tab === "notifications" && (
            <motion.div
              key="notif"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <SectionCard>
                <h3 className="font-heading mb-4 text-base font-semibold text-zinc-900 dark:text-white">
                  Notification preferences
                </h3>
                {[
                  {
                    key: "notifEmail" as const,
                    label: "Email notifications",
                    desc: "Get notified for important emails",
                  },
                  {
                    key: "notifDesktop" as const,
                    label: "Desktop notifications",
                    desc: "Browser push notifications",
                  },
                  {
                    key: "notifSound" as const,
                    label: "Sound",
                    desc: "Play a sound for new mail",
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="mb-2 flex items-center gap-3 rounded-xl border border-zinc-100 p-3 dark:border-white/[0.06]"
                  >
                    <Bell className="h-5 w-5 text-zinc-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-zinc-900 dark:text-white">
                        {item.label}
                      </p>
                      <p className="text-xs text-zinc-500">{item.desc}</p>
                    </div>
                    <Toggle
                      label={item.label}
                      checked={settings[item.key]}
                      onChange={(v) => setSettings((s) => ({ ...s, [item.key]: v }))}
                    />
                  </div>
                ))}
              </SectionCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ================================================================== */
/*  SUPPORT VIEW                                                       */
/* ================================================================== */
export function SupportView({ engine }: { engine: MailEngine }) {
  const [search, setSearch] = useState("");

  const FAQ = [
    {
      q: "How do I connect my Google account?",
      a: "Go to Settings → Account → Connected accounts and click 'Add Google'. You'll be redirected to Google for authorisation.",
    },
    {
      q: "Can I use HudMail AI offline?",
      a: "AI features require an internet connection. However, your emails are cached locally for offline reading.",
    },
    {
      q: "How do I upgrade to Pro?",
      a: "Click the 'Upgrade to Pro' card in the sidebar, or go to Settings → Plan. Pro includes unlimited AI drafts and 1 TB storage.",
    },
    {
      q: "Is my data encrypted?",
      a: "Yes. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We never share your email content with third parties.",
    },
    {
      q: "How do I export my emails?",
      a: "Go to Settings → Account → Data Export. You can download all your emails as .mbox or .zip.",
    },
  ];

  const filtered = search
    ? FAQ.filter(
        (f) =>
          f.q.toLowerCase().includes(search.toLowerCase()) ||
          f.a.toLowerCase().includes(search.toLowerCase())
      )
    : FAQ;

  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="aimail-scroll h-full overflow-y-auto"
    >
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-6 pb-28 sm:px-6 md:pb-10">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-white sm:p-8">
          <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
          <h2 className="font-heading text-2xl font-semibold sm:text-3xl">How can we help?</h2>
          <p className="mt-2 max-w-md text-sm text-white/70">
            Search our knowledge base or get in touch with our support team.
          </p>
          <div className="mt-5 flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2.5 backdrop-blur">
            <Search className="h-4 w-4 text-white/60" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search help articles…"
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/50"
            />
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: MessageCircle, label: "Live chat", desc: "Talk to us" },
            { icon: MailIcon, label: "Email", desc: "support@hudmail.ai" },
            { icon: BookOpen, label: "Docs", desc: "Knowledge base" },
            { icon: Video, label: "Tutorials", desc: "Video guides" },
          ].map((item, i) => (
            <motion.button
              key={item.label}
              type="button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              onClick={() => engine.toast(`${item.label} opened`, { tone: "success" })}
              className="group cursor-pointer rounded-2xl border border-zinc-200 bg-white p-4 text-left transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md dark:border-white/[0.07] dark:bg-zinc-900/60 dark:hover:border-blue-500/30"
            >
              <item.icon className="mb-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
              <p className="text-sm font-semibold text-zinc-900 dark:text-white">{item.label}</p>
              <p className="text-xs text-zinc-500">{item.desc}</p>
            </motion.button>
          ))}
        </div>

        {/* FAQ */}
        <SectionCard>
          <h3 className="font-heading mb-4 text-base font-semibold text-zinc-900 dark:text-white">
            Frequently asked questions
          </h3>
          <div className="space-y-2">
            {filtered.map((faq, i) => (
              <div key={i} className="rounded-xl border border-zinc-100 dark:border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className="flex w-full cursor-pointer items-center gap-3 p-3 text-left"
                >
                  <HelpCircle className="h-4 w-4 shrink-0 text-blue-500" />
                  <span className="flex-1 text-sm font-medium text-zinc-900 dark:text-white">
                    {faq.q}
                  </span>
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 text-zinc-400 transition-transform",
                      openIdx === i && "rotate-90"
                    )}
                  />
                </button>
                <AnimatePresence>
                  {openIdx === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-3 pb-3 pl-10 text-sm text-zinc-600 dark:text-zinc-400">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </motion.div>
  );
}

/* ================================================================== */
/*  UPGRADE VIEW                                                       */
/* ================================================================== */
export function UpgradeView({ engine }: { engine: MailEngine }) {
  const PLANS = [
    {
      name: "Free",
      price: "$0",
      current: true,
      features: ["15 GB storage", "5 AI drafts/day", "Basic smart folders", "Email support"],
    },
    {
      name: "Pro",
      price: "$9",
      current: false,
      highlight: true,
      features: [
        "1 TB storage",
        "Unlimited AI drafts",
        "Advanced AI features",
        "Priority support",
        "Custom domains",
        "Team collaboration",
      ],
    },
    {
      name: "Enterprise",
      price: "$29",
      current: false,
      features: [
        "Unlimited storage",
        "Everything in Pro",
        "SSO & SAML",
        "Admin console",
        "SLA guarantee",
        "Dedicated support",
      ],
    },
  ];

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="aimail-scroll h-full overflow-y-auto"
    >
      <div className="mx-auto max-w-5xl space-y-8 px-4 py-8 pb-28 sm:px-6 md:pb-10">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-300">
            <Crown className="h-3 w-3" /> Upgrade
          </span>
          <h2 className="font-heading mt-4 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
            Choose your plan
          </h2>
          <p className="mt-2 text-base text-zinc-500">Unlock the full power of AI-powered email</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08, ...spring }}
            >
              <SectionCard
                className={cn(
                  "relative flex h-full flex-col p-6",
                  plan.highlight
                    ? "shadow-lg ring-2 shadow-blue-500/10 ring-blue-500 dark:shadow-blue-500/10 dark:ring-blue-500"
                    : ""
                )}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3.5 py-0.5 text-[11px] font-bold text-white dark:bg-gradient-to-r dark:from-blue-600 dark:to-blue-700">
                    Most popular
                  </span>
                )}
                <h3 className="font-heading text-lg font-semibold text-zinc-900 dark:text-white">
                  {plan.name}
                </h3>
                <p className="mt-2">
                  <span className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
                    {plan.price}
                  </span>
                  <span className="text-sm text-zinc-500">/mo</span>
                </p>
                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2.5 text-sm text-zinc-600 dark:text-zinc-400"
                    >
                      <Check className="h-4 w-4 shrink-0 text-emerald-500" /> {f}
                    </li>
                  ))}
                </ul>
                <motion.button
                  type="button"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    engine.toast(
                      plan.current ? "You're on the Free plan" : `Upgraded to ${plan.name}!`,
                      { tone: plan.current ? "default" : "success" }
                    )
                  }
                  className={cn(
                    "mt-8 h-12 w-full cursor-pointer rounded-2xl text-sm font-semibold transition-colors",
                    plan.current
                      ? "border border-zinc-200 text-zinc-600 hover:bg-zinc-50 dark:border-white/10 dark:text-zinc-400 dark:hover:bg-white/[0.03]"
                      : plan.highlight
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 dark:bg-gradient-to-r dark:from-blue-600 dark:to-blue-700 dark:shadow-blue-600/25"
                        : "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                  )}
                >
                  {plan.current ? "Current plan" : "Get started"}
                </motion.button>
              </SectionCard>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
