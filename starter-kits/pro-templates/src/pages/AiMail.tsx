import React, { useState, useEffect } from "react";
import { useMailEngine } from "../components/ai-mail/useMailEngine";
import { AuthScreen } from "../components/ai-mail/AuthScreen";
import { Sidebar } from "../components/ai-mail/Sidebar";
import { MailList } from "../components/ai-mail/MailList";
import { MailDetail, EmptyReader } from "../components/ai-mail/MailDetail";
import { ComposeModal } from "../components/ai-mail/ComposeModal";
import { TopBar } from "../components/ai-mail/TopBar";
import { AiFeaturesView, AiAssistantPanel } from "../components/ai-mail/AiViews";
import {
  CalendarView,
  FoldersView,
  SettingsView,
  SupportView,
  UpgradeView,
} from "../components/ai-mail/WorkspaceViews";
import { Toaster } from "../components/ai-mail/primitives";
import { AnimatePresence, motion } from "motion/react";

/* ------------------------------------------------------------------ */
/*  Title map                                                          */
/* ------------------------------------------------------------------ */
const FOLDER_TITLES: Record<string, string> = {
  inbox: "Inbox",
  starred: "Starred",
  snoozed: "Snoozed",
  sent: "Sent",
  drafts: "Drafts",
  scheduled: "Scheduled",
  archive: "Archive",
  spam: "Spam",
  trash: "Trash",
};

const VIEW_TITLES: Record<string, string> = {
  ai: "AI Features",
  calendar: "Calendar",
  folders: "Manage Folders",
  settings: "Settings",
  support: "Help & Support",
  upgrade: "Upgrade to Pro",
};

export function AiMail() {
  const [isAuth, setIsAuth] = useState(false);
  const [userName, setUserName] = useState("Alex Morgan");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);

  /* -------- Theme -------- */
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return true;
    const stored = localStorage.getItem("aimail-theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("aimail-theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => setIsDark((v) => !v);

  /* -------- Engine -------- */
  const engine = useMailEngine();

  /* -------- Auth -------- */
  if (!isAuth) {
    return (
      <AuthScreen
        onSuccess={(name) => {
          if (name) setUserName(name);
          setIsAuth(true);
        }}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />
    );
  }

  /* -------- Computed -------- */
  const selectedMail = engine.selectedMailId
    ? (engine.allEmails.find((m) => m.id === engine.selectedMailId) ?? null)
    : null;

  const title =
    engine.view === "mail"
      ? engine.activeFolder.startsWith("f:")
        ? (engine.folders.find((f) => f.id === engine.activeFolder)?.name ?? "Folder")
        : (FOLDER_TITLES[engine.activeFolder] ?? "Inbox")
      : (VIEW_TITLES[engine.view] ?? "HudMail");

  const subtitle = engine.view === "mail" ? `${engine.emails.length} conversations` : undefined;

  const showMailLayout = engine.view === "mail";

  /* -------- Render -------- */
  return (
    <div className="aimail-root fixed inset-0 flex overflow-hidden bg-white font-sans text-zinc-900 dark:bg-[#111111] dark:text-zinc-200">
      {/* Sidebar */}
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/25 md:hidden dark:bg-black/50"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 400, damping: 38 }}
              className="fixed inset-y-0 left-0 z-50 shadow-2xl md:hidden"
            >
              <Sidebar
                engine={engine}
                onNavigate={() => setSidebarOpen(false)}
                onClose={() => setSidebarOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar engine={engine} onNavigate={() => {}} />
      </div>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <TopBar
          engine={engine}
          title={title}
          subtitle={subtitle}
          isDark={isDark}
          onToggleTheme={toggleTheme}
          onMenu={() => setSidebarOpen(true)}
          onOpenAssistant={() => setAssistantOpen(true)}
          onSignOut={() => setIsAuth(false)}
          userName={userName}
        />

        <div className="relative flex min-w-0 flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {showMailLayout ? (
              <motion.div
                key="mail-layout"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex min-w-0 flex-1 overflow-hidden"
              >
                {/* Mail list */}
                <div
                  className={`z-10 flex h-full flex-col overflow-hidden border-r border-zinc-100 bg-white dark:border-white/5 dark:bg-[#111111] ${
                    selectedMail
                      ? "hidden shrink-0 lg:flex lg:w-[400px] xl:w-[420px]"
                      : "flex flex-1 shrink-0 lg:w-[400px] lg:flex-none xl:w-[420px]"
                  }`}
                >
                  <MailList engine={engine} />
                </div>

                {/* Mail detail / empty */}
                <div
                  className={`relative h-full min-w-0 flex-1 flex-col overflow-hidden bg-[#fcfcfd] dark:bg-[#111111] ${
                    selectedMail ? "flex" : "hidden lg:flex"
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {selectedMail ? (
                      <motion.div
                        key={`detail-${selectedMail.id}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="flex h-full w-full flex-col"
                      >
                        <MailDetail
                          mail={selectedMail}
                          engine={engine}
                          onBack={() => engine.selectMail(null)}
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex h-full"
                      >
                        <EmptyReader engine={engine} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ) : engine.view === "ai" ? (
              <AiFeaturesView key="ai" engine={engine} userName={userName} />
            ) : engine.view === "calendar" ? (
              <CalendarView key="calendar" engine={engine} />
            ) : engine.view === "folders" ? (
              <FoldersView key="folders" engine={engine} />
            ) : engine.view === "settings" ? (
              <SettingsView
                key="settings"
                engine={engine}
                isDark={isDark}
                onToggleTheme={toggleTheme}
              />
            ) : engine.view === "support" ? (
              <SupportView key="support" engine={engine} />
            ) : engine.view === "upgrade" ? (
              <UpgradeView key="upgrade" engine={engine} />
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      {/* Compose modal */}
      <AnimatePresence>
        {engine.composeDraft && (
          <ComposeModal
            key={`compose-${engine.composeDraft.id}`}
            draft={engine.composeDraft}
            engine={engine}
            context={
              engine.composeDraft.mode === "reply"
                ? (engine.allEmails.find((m) => m.senderEmail === engine.composeDraft!.to) ?? null)
                : null
            }
          />
        )}
      </AnimatePresence>

      {/* AI Assistant panel */}
      <AiAssistantPanel
        open={assistantOpen}
        onClose={() => setAssistantOpen(false)}
        engine={engine}
      />

      {/* Toast notifications */}
      <Toaster toasts={engine.toasts} onDismiss={engine.dismissToast} />
    </div>
  );
}
