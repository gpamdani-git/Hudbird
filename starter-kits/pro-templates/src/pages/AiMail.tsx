import React, { useState, useEffect } from "react";
import { useMailEngine } from "../components/ai-mail/useMailEngine";
import { AuthScreen } from "../components/ai-mail/AuthScreen";
import { Sidebar } from "../components/ai-mail/Sidebar";
import { SearchHeader } from "../components/ai-mail/SearchHeader";
import { MailList } from "../components/ai-mail/MailList";
import { MailDetail } from "../components/ai-mail/MailDetail";
import { ComposeModal } from "../components/ai-mail/ComposeModal";
import { TopBar } from "../components/ai-mail/TopBar";
import { AnimatePresence, motion } from "motion/react";
import { Search, ChevronDown, Sparkles, Bell, SortDesc } from "lucide-react";

export function AiMail() {
  const [isAuth, setIsAuth] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") !== "light";
  });

  useEffect(() => {
    const handleStorage = () => {
      setIsDark(localStorage.getItem("theme") !== "light");
    };
    window.addEventListener("storage", handleStorage);
    try {
      if (window.parent && window.parent.document.documentElement.classList.contains("dark")) {
        setIsDark(true);
      }
    } catch (e) {
      // Ignore cross-origin errors
    }
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const engine = useMailEngine();

  if (!isAuth) {
    return <AuthScreen onSuccess={() => setIsAuth(true)} />;
  }

  const selectedMail = engine.selectedMailId
    ? engine.allEmails.find((m) => m.id === engine.selectedMailId)
    : null;

  const unreadCount = engine.allEmails.filter((m) => m.folder === "inbox" && !m.isRead).length;

  return (
    <div className="fixed inset-0 flex overflow-hidden bg-white font-sans text-zinc-900 dark:bg-[#111111] dark:text-zinc-200">
      <div className="relative flex min-w-0 flex-1">
        <AnimatePresence initial={false}>
          {sidebarOpen && (
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="absolute z-40 h-full shadow-2xl md:relative md:shadow-none"
            >
              <Sidebar
                engine={engine}
                onNavigate={() => {
                  if (window.innerWidth < 768) setSidebarOpen(false);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Overlay for mobile sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-30 bg-black/20 md:hidden dark:bg-black/40"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Main Content Area (Global Header + Panes) */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden bg-white dark:bg-[#111111]">
          <TopBar
            engine={engine}
            title="Inbox"
            subtitle="1,897 Emails"
            isDark={isDark}
            onToggleTheme={() => {
              const newTheme = !isDark;
              setIsDark(newTheme);
              localStorage.setItem("theme", newTheme ? "dark" : "light");
            }}
            onMenu={() => setSidebarOpen(true)}
            onOpenAssistant={() => engine.setView("ai")}
            onSignOut={() => setIsAuth(false)}
            userName="Alex Doe"
          />

          <div className="relative flex min-w-0 flex-1 overflow-hidden">
            {/* Middle Pane: Inbox List */}
            <div
              className={`z-10 flex h-full flex-col overflow-hidden border-r border-zinc-100 bg-white dark:border-white/5 dark:bg-[#111111] ${
                selectedMail
                  ? "hidden shrink-0 lg:flex lg:w-[400px] xl:w-[420px]"
                  : "flex flex-1 shrink-0 lg:w-[400px] lg:flex-none xl:w-[420px]"
              }`}
            >
              <div className="flex h-full w-full min-w-[320px] flex-col">
                <MailList engine={engine} />
              </div>
            </div>

            {/* Right Pane: Mail Detail */}
            <div
              className={`relative h-full min-w-0 flex-1 flex-col overflow-hidden border-l border-zinc-100 bg-[#fcfcfd] dark:border-white/5 dark:bg-[#111111] ${
                selectedMail ? "flex" : "hidden lg:flex"
              }`}
            >
              <AnimatePresence mode="wait">
                {selectedMail ? (
                  <motion.div
                    key="detail"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
                    className="flex h-full w-full flex-col"
                  >
                    <MailDetail
                      mail={selectedMail}
                      engine={engine}
                      onBack={() => engine.selectMail("")}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
                    className="flex flex-1 flex-col items-center justify-center gap-4 text-zinc-400"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium">Select an item to read</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {engine.composeDraft && (
          <ComposeModal
            draft={engine.composeDraft}
            onClose={engine.closeCompose}
            onUpdate={engine.updateDraft}
            onAiGenerate={engine.generateWithAi}
            onSend={engine.sendMail}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
