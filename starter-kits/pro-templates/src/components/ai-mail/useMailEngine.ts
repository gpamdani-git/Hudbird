import { useCallback, useMemo, useRef, useState } from "react";
import type {
  AppNotification,
  AppView,
  Attachment,
  CalendarEvent,
  ComposeDraft,
  ComposeMode,
  CustomFolder,
  ListFilter,
  Mail,
  MailFolder,
  Toast,
} from "./types";
import { ME, MOCK_EMAILS, MOCK_EVENTS, MOCK_NOTIFICATIONS, SEED_FOLDERS } from "./data";

const uid = (p: string) =>
  `${p}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

const FOLDER_COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#14b8a6"];

export function useMailEngine() {
  const [emails, setEmails] = useState<Mail[]>(MOCK_EMAILS);
  const [folders, setFolders] = useState<CustomFolder[]>(SEED_FOLDERS);
  const [events, setEvents] = useState<CalendarEvent[]>(MOCK_EVENTS);
  const [notifications, setNotifications] = useState<AppNotification[]>(MOCK_NOTIFICATIONS);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const [view, setView] = useState<AppView>("mail");
  const [activeFolder, setActiveFolderState] = useState<MailFolder>("inbox");
  const [filter, setFilter] = useState<ListFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMailId, setSelectedMailId] = useState<string | null>(null);
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [composeDraft, setComposeDraft] = useState<ComposeDraft | null>(null);

  /* ------------------------------ toasts ------------------------------ */
  const dismissToast = useCallback((id: string) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const toast = useCallback(
    (message: string, opts: Omit<Toast, "id" | "message"> = {}) => {
      const id = uid("t");
      setToasts((t) => [...t.slice(-2), { id, message, ...opts }]);
      window.setTimeout(() => dismissToast(id), 4200);
    },
    [dismissToast]
  );

  /** Snapshot used for "Undo" on destructive actions. */
  const snapshot = useRef<Mail[] | null>(null);
  const withUndo = useCallback(
    (message: string, mutate: (prev: Mail[]) => Mail[]) => {
      setEmails((prev) => {
        snapshot.current = prev;
        return mutate(prev);
      });
      toast(message, {
        action: {
          label: "Undo",
          onClick: () => snapshot.current && setEmails(snapshot.current),
        },
      });
    },
    [toast]
  );

  /* ---------------------------- navigation ---------------------------- */
  const setActiveFolder = useCallback((f: MailFolder) => {
    setActiveFolderState(f);
    setView("mail");
    setSelectedMailId(null);
    setChecked(new Set());
    setFilter("all");
  }, []);

  /* ------------------------------ queries ----------------------------- */
  const inFolder = useCallback((m: Mail, f: MailFolder) => {
    if (f === "starred") return m.isStarred && m.folder !== "trash" && m.folder !== "spam";
    if (f === "snoozed") return !!m.isSnoozed && m.folder !== "trash";
    return m.folder === f;
  }, []);

  const filteredEmails = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    let result = q
      ? emails.filter((m) => m.folder !== "trash" && m.folder !== "spam")
      : emails.filter((m) => inFolder(m, activeFolder));

    if (q) {
      result = result.filter(
        (m) =>
          m.subject.toLowerCase().includes(q) ||
          m.senderName.toLowerCase().includes(q) ||
          m.senderEmail.toLowerCase().includes(q) ||
          m.body.toLowerCase().includes(q) ||
          m.attachments?.some((a) => a.name.toLowerCase().includes(q))
      );
    }
    if (filter === "unread") result = result.filter((m) => !m.isRead);
    if (filter === "read") result = result.filter((m) => m.isRead);
    if (filter === "starred") result = result.filter((m) => m.isStarred);
    if (filter === "attachments") result = result.filter((m) => m.attachments?.length);

    return [...result].sort((a, b) => +new Date(b.date) - +new Date(a.date));
  }, [emails, activeFolder, searchQuery, filter, inFolder]);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    const unread = (f: MailFolder) => emails.filter((m) => inFolder(m, f) && !m.isRead).length;
    const total = (f: MailFolder) => emails.filter((m) => inFolder(m, f)).length;
    c.inbox = unread("inbox");
    c.drafts = total("drafts");
    c.scheduled = total("scheduled");
    c.spam = unread("spam");
    c.starred = total("starred");
    folders.forEach((f) => (c[f.id] = unread(f.id)));
    return c;
  }, [emails, folders, inFolder]);

  /* --------------------------- mail actions --------------------------- */
  const patch = useCallback((ids: string[], p: Partial<Mail>) => {
    setEmails((prev) => prev.map((m) => (ids.includes(m.id) ? { ...m, ...p } : m)));
  }, []);

  const toggleStar = useCallback((id: string) => {
    setEmails((prev) => prev.map((m) => (m.id === id ? { ...m, isStarred: !m.isStarred } : m)));
  }, []);

  const setRead = useCallback((ids: string[], isRead: boolean) => patch(ids, { isRead }), [patch]);

  const toggleRead = useCallback((id: string) => {
    setEmails((prev) => prev.map((m) => (m.id === id ? { ...m, isRead: !m.isRead } : m)));
  }, []);

  const clearSelectionIf = useCallback(
    (ids: string[]) => {
      if (selectedMailId && ids.includes(selectedMailId)) setSelectedMailId(null);
      setChecked(new Set());
    },
    [selectedMailId]
  );

  const moveTo = useCallback(
    (ids: string[], folder: MailFolder, label?: string) => {
      const name = label ?? folders.find((f) => f.id === folder)?.name ?? folder;
      withUndo(
        `${ids.length > 1 ? `${ids.length} conversations` : "Conversation"} moved to ${name}`,
        (prev) => prev.map((m) => (ids.includes(m.id) ? { ...m, folder, isSnoozed: false } : m))
      );
      clearSelectionIf(ids);
    },
    [folders, withUndo, clearSelectionIf]
  );

  const trash = useCallback(
    (ids: string[]) => {
      const permanent = activeFolder === "trash" || activeFolder === "spam";
      if (permanent) {
        withUndo(`${ids.length} permanently deleted`, (prev) =>
          prev.filter((m) => !ids.includes(m.id))
        );
      } else {
        withUndo(
          `${ids.length > 1 ? `${ids.length} conversations` : "Conversation"} moved to Trash`,
          (prev) => prev.map((m) => (ids.includes(m.id) ? { ...m, folder: "trash" } : m))
        );
      }
      clearSelectionIf(ids);
    },
    [activeFolder, withUndo, clearSelectionIf]
  );

  const archive = useCallback((ids: string[]) => moveTo(ids, "archive", "Archive"), [moveTo]);
  const markSpam = useCallback((ids: string[]) => moveTo(ids, "spam", "Spam"), [moveTo]);
  const restore = useCallback((ids: string[]) => moveTo(ids, "inbox", "Inbox"), [moveTo]);

  const snooze = useCallback(
    (ids: string[]) => {
      withUndo("Snoozed until tomorrow, 9:00 AM", (prev) =>
        prev.map((m) => (ids.includes(m.id) ? { ...m, isSnoozed: true } : m))
      );
      clearSelectionIf(ids);
    },
    [withUndo, clearSelectionIf]
  );

  const emptyFolder = useCallback(
    (f: "trash" | "spam") => {
      withUndo(`${f === "trash" ? "Trash" : "Spam"} emptied`, (prev) =>
        prev.filter((m) => m.folder !== f)
      );
    },
    [withUndo]
  );

  const selectMail = useCallback((id: string | null) => {
    setSelectedMailId(id);
    if (id) setEmails((prev) => prev.map((m) => (m.id === id ? { ...m, isRead: true } : m)));
  }, []);

  const toggleChecked = useCallback((id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const checkAll = useCallback(
    (on: boolean) => setChecked(on ? new Set(filteredEmails.map((m) => m.id)) : new Set()),
    [filteredEmails]
  );

  /* ------------------------------ folders ----------------------------- */
  const createFolder = useCallback(
    (name: string) => {
      const id = `f:${name.toLowerCase().replace(/\W+/g, "-")}-${Date.now().toString(36)}` as const;
      setFolders((prev) => [
        ...prev,
        { id, name, color: FOLDER_COLORS[prev.length % FOLDER_COLORS.length] },
      ]);
      toast(`Folder "${name}" created`, { tone: "success" });
      return id;
    },
    [toast]
  );

  const renameFolder = useCallback((id: CustomFolder["id"], name: string) => {
    setFolders((prev) => prev.map((f) => (f.id === id ? { ...f, name } : f)));
  }, []);

  const recolorFolder = useCallback((id: CustomFolder["id"], color: string) => {
    setFolders((prev) => prev.map((f) => (f.id === id ? { ...f, color } : f)));
  }, []);

  const deleteFolder = useCallback(
    (id: CustomFolder["id"]) => {
      const f = folders.find((x) => x.id === id);
      setFolders((prev) => prev.filter((x) => x.id !== id));
      setEmails((prev) => prev.map((m) => (m.folder === id ? { ...m, folder: "inbox" } : m)));
      if (activeFolder === id) setActiveFolderState("inbox");
      toast(`Folder "${f?.name}" deleted · emails moved to Inbox`);
    },
    [folders, activeFolder, toast]
  );

  /* ------------------------------ compose ----------------------------- */
  const openCompose = useCallback((mode: ComposeMode = "new", source?: Mail | null) => {
    const base: ComposeDraft = {
      id: uid("c"),
      mode,
      to: "",
      cc: "",
      subject: "",
      body: "",
      attachments: [],
      status: "idle",
    };
    if (source && mode === "reply") {
      base.to = source.senderEmail;
      base.subject = source.subject.startsWith("Re:") ? source.subject : `Re: ${source.subject}`;
    }
    if (source && mode === "forward") {
      base.subject = `Fwd: ${source.subject}`;
      base.body = `\n\n---------- Forwarded message ----------\nFrom: ${source.senderName} <${source.senderEmail}>\nSubject: ${source.subject}\n\n${source.body}`;
      base.attachments = source.attachments ?? [];
    }
    if (source && mode === "draft") {
      base.to = source.to ?? "";
      base.subject = source.subject;
      base.body = source.body;
      base.attachments = source.attachments ?? [];
      base.sourceDraftId = source.id;
    }
    setComposeDraft(base);
  }, []);

  const updateDraft = useCallback((updates: Partial<ComposeDraft>) => {
    setComposeDraft((prev) => (prev ? { ...prev, ...updates } : null));
  }, []);

  const toMail = (d: ComposeDraft, folder: MailFolder, date = new Date().toISOString()): Mail => ({
    id: d.sourceDraftId ?? uid(folder),
    senderName: ME.name,
    senderEmail: ME.email,
    to: d.to,
    subject: d.subject || "(No subject)",
    preview: d.body.replace(/\s+/g, " ").slice(0, 90) || "(No content)",
    body: d.body,
    date,
    folder,
    labels: [],
    isRead: true,
    isStarred: false,
    attachments: d.attachments.length ? d.attachments : undefined,
  });

  const closeCompose = useCallback(
    (saveDraft = true) => {
      const d = composeDraft;
      if (
        d &&
        saveDraft &&
        d.status === "idle" &&
        (d.body.trim() || d.subject.trim() || d.to.trim())
      ) {
        const mail = toMail(d, "drafts");
        setEmails((prev) => [mail, ...prev.filter((m) => m.id !== mail.id)]);
        toast("Draft saved", { tone: "success" });
      }
      setComposeDraft(null);
    },
    [composeDraft, toast]
  );

  const sendMail = useCallback(
    (scheduledFor?: string) => {
      const d = composeDraft;
      if (!d || d.status === "sending") return;
      setComposeDraft({ ...d, status: "sending" });
      window.setTimeout(() => {
        const folder: MailFolder = scheduledFor ? "scheduled" : "sent";
        const mail = toMail(d, folder, scheduledFor ?? new Date().toISOString());
        setEmails((prev) => [mail, ...prev.filter((m) => m.id !== mail.id)]);
        setComposeDraft((cur) => (cur ? { ...cur, status: "sent" } : cur));
        toast(scheduledFor ? "Email scheduled" : "Message sent", {
          tone: "success",
          action: { label: "View", onClick: () => setActiveFolder(folder) },
        });
        window.setTimeout(() => setComposeDraft(null), 900);
      }, 1300);
    },
    [composeDraft, toast, setActiveFolder]
  );

  const sendDirect = useCallback(
    (p: { to: string; subject: string; body: string }) => {
      const mail: Mail = {
        id: uid("sent"),
        senderName: ME.name,
        senderEmail: ME.email,
        to: p.to,
        subject: p.subject,
        preview: p.body.replace(/\s+/g, " ").slice(0, 90),
        body: p.body,
        date: new Date().toISOString(),
        folder: "sent",
        labels: [],
        isRead: true,
        isStarred: false,
      };
      setEmails((prev) => [mail, ...prev]);
      toast("Reply sent", {
        tone: "success",
        action: { label: "View", onClick: () => setActiveFolder("sent") },
      });
    },
    [toast, setActiveFolder]
  );

  const addAttachment = useCallback((a: Attachment) => {
    setComposeDraft((prev) => (prev ? { ...prev, attachments: [...prev.attachments, a] } : prev));
  }, []);

  const removeAttachment = useCallback((id: string) => {
    setComposeDraft((prev) =>
      prev ? { ...prev, attachments: prev.attachments.filter((a) => a.id !== id) } : prev
    );
  }, []);

  /* ------------------------------ calendar ---------------------------- */
  const addEvent = useCallback(
    (e: Omit<CalendarEvent, "id">) => {
      setEvents((prev) => [...prev, { ...e, id: uid("e") }]);
      toast(`"${e.title}" added to calendar`, { tone: "success" });
    },
    [toast]
  );

  const removeEvent = useCallback((id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }, []);

  /* --------------------------- notifications -------------------------- */
  const markNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const clearNotifications = useCallback(() => setNotifications([]), []);

  return {
    // data
    emails: filteredEmails,
    allEmails: emails,
    folders,
    events,
    notifications,
    toasts,
    counts,

    // navigation
    view,
    setView,
    activeFolder,
    setActiveFolder,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    selectedMailId,
    selectMail,
    checked,
    toggleChecked,
    checkAll,

    // mail actions
    toggleStar,
    toggleRead,
    setRead,
    moveTo,
    trash,
    archive,
    snooze,
    markSpam,
    restore,
    emptyFolder,

    // folders
    createFolder,
    renameFolder,
    recolorFolder,
    deleteFolder,

    // compose
    composeDraft,
    openCompose,
    closeCompose,
    updateDraft,
    sendMail,
    sendDirect,
    addAttachment,
    removeAttachment,

    // calendar
    addEvent,
    removeEvent,

    // notifications + toasts
    markNotificationsRead,
    clearNotifications,
    toast,
    dismissToast,
  };
}

export type MailEngine = ReturnType<typeof useMailEngine>;
