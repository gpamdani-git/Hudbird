import React, { useState } from "react";
import { TemplateThemeToggle } from "./TemplateThemeToggle";
import {
  AdminSidebar,
  AdminHeader,
  AdminStats,
  AdminCharts,
  AdminTable,
  AdminToolbar,
  AdminAnalytics,
  AdminMessages,
  AdminPosts,
  AdminPages,
  AdminCategories,
  AdminMedia,
  AdminEditor,
  AdminUsers,
  AdminSiteBuilder,
  AdminAppearance,
  AdminPlugins,
  AdminSettings,
  AdminNotifications,
  AdminSecurity,
  AdminProfile,
  AdminInbox,
} from "@hudbird/marketing";
import type { AdminPage } from "@hudbird/marketing";
import { Button } from "@hudbird/ui";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PAGE_TABS: { key: AdminPage; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "analytics", label: "Analytics" },
  { key: "messages", label: "Form Messages" },
];

const BREADCRUMB_LABELS: Record<string, string> = {
  overview: "Overview",
  analytics: "Analytics",
  messages: "Form Messages",
  posts: "All Posts",
  categories: "Categories",
  pages: "Static Pages",
  media: "Media Library",
  "editor-post": "Editor",
  "editor-page": "Editor",
  users: "Users & Roles",
  "site-builder": "Site Builder",
  appearance: "Appearance",
  plugins: "Plugins",
  notifications: "Notifications",
  security: "Security",
  settings: "Settings",
};

const OverviewPage = ({ onNavigate }: { onNavigate: (page: AdminPage) => void }) => (
  <div className="space-y-5">
    <AdminStats />
    <AdminCharts />
    <AdminToolbar />
    <AdminTable onEdit={() => onNavigate("editor-post")} />
  </div>
);

const PageContent = ({
  page,
  onNavigate,
}: {
  page: AdminPage;
  onNavigate: (page: AdminPage) => void;
}) => {
  switch (page) {
    case "analytics":
      return <AdminAnalytics />;
    case "messages":
      return <AdminMessages />;
    case "posts":
      return <AdminPosts onEdit={() => onNavigate("editor-post")} />;
    case "categories":
      return <AdminCategories />;
    case "pages":
      return <AdminPages onEdit={() => onNavigate("editor-page")} />;
    case "media":
      return <AdminMedia />;
    case "editor-post":
      return <AdminEditor type="post" onBack={() => onNavigate("posts")} />;
    case "editor-page":
      return <AdminEditor type="page" onBack={() => onNavigate("pages")} />;
    case "users":
      return <AdminUsers />;
    case "site-builder":
      return <AdminSiteBuilder onNavigate={onNavigate} />;
    case "appearance":
      return <AdminAppearance />;
    case "plugins":
      return <AdminPlugins />;
    case "settings":
      return <AdminSettings />;
    case "notifications":
      return <AdminNotifications />;
    case "security":
      return <AdminSecurity />;
    case "profile":
      return <AdminProfile />;
    case "inbox":
      return <AdminInbox />;
    default:
      return <OverviewPage onNavigate={onNavigate} />;
  }
};

export const AdminCmsTemplate = () => {
  const [activePage, setActivePage] = useState<AdminPage>("overview");

  return (
    <div className="bg-background text-foreground flex h-screen w-full overflow-hidden">
      {/* Sidebar — synced with active tab */}
      <AdminSidebar activePage={activePage} onPageChange={setActivePage} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader onNavigate={setActivePage} activePage={activePage}>
          <TemplateThemeToggle />
        </AdminHeader>

        <main className="bg-muted/20 flex-1 overflow-y-auto dark:bg-zinc-950/50">
          <div className="mx-auto max-w-[1200px] p-5">
            {/* Generic Page Header - Only render for pages that don't have their own internal header */}
            {![
              "users",
              "site-builder",
              "appearance",
              "plugins",
              "settings",
              "notifications",
              "security",
              "profile",
              "inbox",
              "editor-post",
              "editor-page",
            ].includes(activePage) && (
              <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-xl font-bold tracking-tight">
                    {activePage === "posts"
                      ? "Posts"
                      : activePage === "categories"
                        ? "Categories"
                        : activePage === "pages"
                          ? "Pages"
                          : activePage === "media"
                            ? "Media Library"
                            : "Dashboard"}
                  </h1>
                  <p className="text-muted-foreground/60 mt-0.5 text-[13px]">
                    {["posts", "categories", "pages", "media"].includes(activePage)
                      ? "Manage your content"
                      : `${BREADCRUMB_LABELS[activePage] || "Overview"} — content & analytics`}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {(activePage === "posts" || activePage === "pages") && (
                    <Button
                      variant="solid"
                      size="sm"
                      className="gap-1.5"
                      onClick={() =>
                        setActivePage(activePage === "pages" ? "editor-page" : "editor-post")
                      }
                    >
                      <Plus className="h-3.5 w-3.5" />
                      {activePage === "pages" ? "New Page" : "New Post"}
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Tab Navigation - Only show for Dashboard pages */}
            {(activePage === "overview" ||
              activePage === "analytics" ||
              activePage === "messages") && (
              <div className="border-border/30 mb-5 flex items-center gap-1 border-b">
                {PAGE_TABS.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActivePage(tab.key)}
                    className={`relative px-4 py-2.5 text-[13px] font-medium transition-colors ${
                      activePage === tab.key
                        ? "text-foreground"
                        : "text-muted-foreground/50 hover:text-muted-foreground"
                    }`}
                  >
                    {tab.label}
                    {activePage === tab.key && (
                      <motion.div
                        layoutId="admin-tab-indicator"
                        className="bg-primary absolute right-0 bottom-0 left-0 h-[2px] rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 35,
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Page Content with Animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activePage}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <PageContent page={activePage} onNavigate={setActivePage} />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};
