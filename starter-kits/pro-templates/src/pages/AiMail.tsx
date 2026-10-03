import React, { useState } from "react";
import { useMailEngine } from "../components/ai-mail/useMailEngine";
import { AuthScreen } from "../components/ai-mail/AuthScreen";
import { Sidebar } from "../components/ai-mail/Sidebar";
import { SearchHeader } from "../components/ai-mail/SearchHeader";
import { MailList } from "../components/ai-mail/MailList";
import { MailDetail } from "../components/ai-mail/MailDetail";
import { ComposeModal } from "../components/ai-mail/ComposeModal";
import { AnimatePresence, motion } from "motion/react";
import { Search, ChevronDown, Sparkles, Bell, SortDesc } from "lucide-react";

export function AiMail() {
  const [isAuth, setIsAuth] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
                activeFolder={engine.activeFolder}
                onSelectFolder={(f) => {
                  engine.setActiveFolder(f);
                  if (engine.selectedMailId) engine.selectMail("");
                  if (window.innerWidth < 768) setSidebarOpen(false); // Close on mobile after selection
                }}
                onCompose={engine.openCompose}
                unreadCount={unreadCount}
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
          {/* Unified Global Header */}
          <div className="relative z-20 flex h-[72px] w-full shrink-0 items-center border-b border-zinc-100 dark:border-white/5">
            {/* Left side (Mail List context) */}
            <div className="flex w-[400px] shrink-0 items-center justify-between px-4 xl:w-[420px]">
              <div className="flex items-baseline gap-3">
                <h1 className="text-xl font-bold text-zinc-900 dark:text-white">
                  Good Morning. Alex
                </h1>
                <span className="text-xs font-medium text-zinc-500">1,897 Emails</span>
              </div>
              <button className="text-zinc-400 transition-colors hover:text-zinc-600">
                <SortDesc className="h-4 w-4" />
              </button>
            </div>

            {/* Divider */}
            <div className="h-full w-px bg-zinc-100 dark:bg-white/5" />

            {/* Right side (Search & Actions) */}
            <div className="flex flex-1 items-center justify-between px-6">
              <div className="flex w-full max-w-xl items-center rounded-lg border border-zinc-100 bg-zinc-50 px-4 py-2 dark:border-white/10 dark:bg-zinc-900">
                <Search className="mr-2 h-4 w-4 shrink-0 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search anything..."
                  className="min-w-0 flex-1 border-none bg-transparent text-sm outline-none"
                />
                <div className="ml-2 flex shrink-0 cursor-pointer items-center gap-1 border-l border-zinc-200 pl-3 hover:text-zinc-900 dark:border-white/10">
                  <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    All Categories
                  </span>
                  <ChevronDown className="h-3 w-3 text-zinc-400" />
                </div>
              </div>

              <div className="ml-4 flex shrink-0 items-center gap-4">
                <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500 text-white shadow-sm shadow-purple-500/20 transition-colors hover:bg-purple-600">
                  <Sparkles className="h-4 w-4" />
                </button>
                <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800" />
                <button className="relative text-zinc-400 transition-colors hover:text-zinc-600">
                  <Bell className="h-5 w-5" />
                  <div className="absolute top-0 right-0 h-2 w-2 rounded-full border-2 border-white bg-red-500" />
                </button>
              </div>
            </div>
          </div>

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
                <MailList
                  emails={engine.emails}
                  onSelect={engine.selectMail}
                  onStar={engine.toggleStar}
                  onSnooze={engine.snoozeMail}
                  onArchive={engine.archiveMail}
                  onTrash={engine.moveToTrash}
                  onCompose={engine.openCompose}
                  activeFolder={engine.activeFolder}
                />
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
                      onBack={() => engine.selectMail("")}
                      onStar={() => engine.toggleStar(selectedMail.id)}
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
