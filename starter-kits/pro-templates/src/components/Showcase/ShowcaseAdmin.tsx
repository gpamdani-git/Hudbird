import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  AdminSidebar,
  AdminHeader,
  AdminStats,
  AdminCharts,
  AdminTable,
  AdminAnalytics,
  AdminPosts,
  AdminMedia,
  AdminUsers,
  type AdminPage,
} from "@hudbird/marketing";

const TABS: { label: string; value: string }[] = [
  { label: "Overview", value: "overview" },
  { label: "Analytics", value: "analytics" },
  { label: "Posts", value: "posts" },
  { label: "Media", value: "media" },
  { label: "Users", value: "users" },
  { label: "AI Mail", value: "ai-mail" },
  { label: "AI Chat", value: "ai-chat" },
];

export function ShowcaseAdmin() {
  const [activeTab, setActiveTab] = useState<string>("overview");

  return (
    <section className="relative w-full overflow-hidden bg-zinc-50 py-24 dark:bg-zinc-950">
      {/* Intense Background Blurs matching Image 3 */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[20%] -left-[10%] h-[600px] w-[600px] rounded-full bg-purple-400/20 blur-[120px] dark:bg-purple-600/20" />
        <div className="absolute top-[40%] left-[20%] h-[500px] w-[500px] rounded-full bg-orange-400/20 blur-[120px] dark:bg-orange-500/20" />
        <div className="absolute top-[10%] right-[0%] h-[700px] w-[700px] rounded-full bg-blue-300/20 blur-[130px] dark:bg-blue-600/10" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold tracking-wide text-blue-600 dark:text-blue-400"
          >
            Pro templates
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading mt-4 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-white"
          >
            Start from something real. <br />
            <span className="text-zinc-400 dark:text-zinc-500">Not a blank file.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400"
          >
            Full-page, responsive templates for dashboards, CRM, mail, chat, and finance. Strong
            structure from the first commit.
          </motion.p>
        </div>

        {/* Tab Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex justify-center"
        >
          <div className="inline-flex items-center gap-1 rounded-full border border-zinc-200/50 bg-zinc-100 p-1.5 shadow-sm dark:border-white/5 dark:bg-white/5 dark:backdrop-blur-md">
            {TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`relative px-5 py-2 text-sm font-medium transition-colors ${activeTab === tab.value ? "text-zinc-900 dark:text-white" : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"}`}
              >
                {activeTab === tab.value && (
                  <motion.div
                    layoutId="adminTabBubble"
                    className="absolute inset-0 rounded-full border border-zinc-200/50 bg-white shadow-sm dark:border-white/5 dark:bg-zinc-800"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Dashboard Mockup Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative mx-auto mt-16 max-w-[1200px] overflow-hidden rounded-[2rem] border border-zinc-200/50 bg-white shadow-2xl dark:border-white/10 dark:bg-[#09090b]"
        >
          {/* Admin CMS Layout */}
          <div className="flex h-[800px] w-full text-left">
            <AdminSidebar
              activePage={activeTab as AdminPage}
              onPageChange={(p) => setActiveTab(p as string)}
              simplified={true}
            />
            <div className="relative flex min-w-0 flex-1 flex-col bg-zinc-50 dark:bg-[#09090b]">
              <AdminHeader
                activePage={activeTab as AdminPage}
                onNavigate={(p) => setActiveTab(p as string)}
              />
              <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-6"
                  >
                    {activeTab === "overview" && (
                      <>
                        <AdminStats />
                        <AdminCharts />
                        <AdminTable />
                      </>
                    )}
                    {activeTab === "analytics" && <AdminAnalytics />}
                    {activeTab === "posts" && <AdminPosts />}
                    {activeTab === "media" && <AdminMedia />}
                    {activeTab === "users" && <AdminUsers />}
                    {activeTab === "ai-mail" && (
                      <div className="h-[600px] w-full overflow-hidden rounded-2xl border border-zinc-200/50 shadow-sm dark:border-white/10">
                        <iframe
                          src="/ai-mail"
                          className="h-full w-full border-none"
                          title="AI Mail Preview"
                        />
                      </div>
                    )}
                    {activeTab === "ai-chat" && (
                      <div className="h-[600px] w-full overflow-hidden rounded-2xl border border-zinc-200/50 shadow-sm dark:border-white/10">
                        <iframe
                          src="/ai-chat"
                          className="h-full w-full border-none"
                          title="AI Chat Preview"
                        />
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Global Soft Bottom Fade */}
          <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-48 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#09090b] dark:via-[#09090b]/80" />
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <Link
            to="/dashboard"
            className="rounded-full bg-zinc-200/80 px-8 py-2.5 text-sm font-bold text-zinc-900 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
          >
            Live preview
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
