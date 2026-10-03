import { useState, useMemo, useCallback } from "react";
import { Mail, MailFolder, ComposeDraft } from "./types";
import { MOCK_EMAILS } from "./data";

export function useMailEngine() {
  const [emails, setEmails] = useState<Mail[]>(MOCK_EMAILS);
  const [activeFolder, setActiveFolder] = useState<MailFolder>("inbox");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMailId, setSelectedMailId] = useState<string | null>(null);
  const [composeDraft, setComposeDraft] = useState<ComposeDraft | null>(null);

  const filteredEmails = useMemo(() => {
    let result = emails;

    // Filter by folder
    if (activeFolder === "starred") {
      result = result.filter((m) => m.isStarred && m.folder !== "trash");
    } else if (activeFolder === "snoozed") {
      result = result.filter((m) => m.isSnoozed && m.folder !== "trash");
    } else {
      result = result.filter((m) => m.folder === activeFolder);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (m) =>
          m.subject.toLowerCase().includes(q) ||
          m.senderName.toLowerCase().includes(q) ||
          m.body.toLowerCase().includes(q)
      );
    }

    // Sort by date descending
    return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [emails, activeFolder, searchQuery]);

  const toggleStar = useCallback((id: string) => {
    setEmails((prev) => prev.map((m) => (m.id === id ? { ...m, isStarred: !m.isStarred } : m)));
  }, []);

  const markAsRead = useCallback((id: string) => {
    setEmails((prev) => prev.map((m) => (m.id === id ? { ...m, isRead: true } : m)));
  }, []);

  const moveToTrash = useCallback(
    (id: string) => {
      setEmails((prev) => prev.map((m) => (m.id === id ? { ...m, folder: "trash" } : m)));
      if (selectedMailId === id) setSelectedMailId(null);
    },
    [selectedMailId]
  );

  const snoozeMail = useCallback(
    (id: string) => {
      setEmails((prev) =>
        prev.map((m) => (m.id === id ? { ...m, folder: "snoozed", isSnoozed: true } : m))
      );
      if (selectedMailId === id) setSelectedMailId(null);
    },
    [selectedMailId]
  );

  const archiveMail = useCallback(
    (id: string) => {
      setEmails(
        (prev) => prev.map((m) => (m.id === id ? { ...m, folder: "trash" } : m)) // simpler to just trash or 'all mail'
      );
      if (selectedMailId === id) setSelectedMailId(null);
    },
    [selectedMailId]
  );

  const selectMail = useCallback(
    (id: string) => {
      setSelectedMailId(id);
      markAsRead(id);
    },
    [markAsRead]
  );

  // Compose actions
  const openCompose = useCallback(() => {
    setComposeDraft({
      to: "",
      subject: "",
      body: "",
      status: "idle",
      isAiThinking: false,
    });
  }, []);

  const closeCompose = useCallback(() => {
    // optionally save to drafts if body isn't empty
    setComposeDraft(null);
  }, []);

  const updateDraft = useCallback((updates: Partial<ComposeDraft>) => {
    setComposeDraft((prev) => (prev ? { ...prev, ...updates } : null));
  }, []);

  const generateWithAi = useCallback(
    (prompt: string) => {
      if (!composeDraft) return;
      updateDraft({ isAiThinking: true });

      // Simulate AI response
      setTimeout(() => {
        let aiText = `Here is a drafted email based on: "${prompt}"\n\nHi there,\n\nI hope this email finds you well. I'm reaching out because... \n\nBest,\nDani`;

        if (prompt.toLowerCase().includes("decline")) {
          aiText = `Hi,\n\nThanks for reaching out. Unfortunately, I won't be able to make it this time due to prior commitments.\n\nBest,\nDani`;
        } else if (prompt.toLowerCase().includes("follow up")) {
          aiText = `Hi,\n\nJust following up on my previous email. Let me know if you need any additional information from my side.\n\nThanks,\nDani`;
        }

        updateDraft({
          body: aiText,
          isAiThinking: false,
        });
      }, 1500);
    },
    [composeDraft, updateDraft]
  );

  const sendMail = useCallback(() => {
    if (!composeDraft) return;
    updateDraft({ status: "sending" });

    // Simulate network
    setTimeout(() => {
      // 10% chance to fail for simulation
      if (Math.random() > 0.9) {
        updateDraft({ status: "failed" });
        return;
      }

      // Success
      const newMail: Mail = {
        id: `m-sent-${Date.now()}`,
        senderName: "Me",
        senderEmail: "me@hudbirdui.com",
        subject: composeDraft.subject || "(No Subject)",
        preview: composeDraft.body.substring(0, 50),
        body: composeDraft.body,
        date: new Date().toISOString(),
        folder: "sent",
        labels: [],
        isRead: true,
        isStarred: false,
      };

      setEmails((prev) => [newMail, ...prev]);
      updateDraft({ status: "sent" });

      setTimeout(() => {
        setComposeDraft(null);
      }, 1000);
    }, 1200);
  }, [composeDraft, updateDraft]);

  return {
    emails: filteredEmails,
    allEmails: emails,
    activeFolder,
    setActiveFolder,
    searchQuery,
    setSearchQuery,
    selectedMailId,
    selectMail,
    toggleStar,
    moveToTrash,
    snoozeMail,
    archiveMail,

    // Compose
    composeDraft,
    openCompose,
    closeCompose,
    updateDraft,
    generateWithAi,
    sendMail,
  };
}
