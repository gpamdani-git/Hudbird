import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  Menu,
  ChevronRight,
  User,
  Settings,
  LogOut,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import { Button, Avatar, Badge } from "@/components/ui";
import { motion, AnimatePresence } from "framer-motion";
import type { AdminPage } from "../Sidebar/AdminSidebar";
import { ConfirmModal } from "../Components/ConfirmModal";

export interface AdminHeaderProps {
  children?: React.ReactNode;
  onNavigate?: (page: AdminPage) => void;
  activePage?: AdminPage;
}

export const AdminHeader = ({
  children,
  onNavigate,
  activePage = "overview",
}: AdminHeaderProps) => {
  const navigate = useNavigate();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setIsUserOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="border-border/30 bg-card relative z-40 flex h-14 shrink-0 items-center gap-4 border-b px-5">
      {/* Mobile toggle */}
      <Button variant="ghost" size="sm" isIconOnly className="h-8 w-8 lg:hidden">
        <Menu className="h-4 w-4" />
      </Button>

      {/* Breadcrumbs */}
      <nav className="hidden items-center gap-1.5 text-[13px] sm:flex">
        <span
          className="text-muted-foreground/60 hover:text-foreground cursor-pointer transition-colors"
          onClick={() => onNavigate?.("overview")}
        >
          {["posts", "categories", "pages", "media"].includes(activePage)
            ? "Content"
            : ["users", "site-builder", "appearance", "plugins"].includes(activePage)
              ? "Manage"
              : ["settings", "notifications", "security", "inbox"].includes(activePage)
                ? "System"
                : activePage === "profile"
                  ? "Account"
                  : "Dashboard"}
        </span>
        <ChevronRight className="text-muted-foreground/30 h-3 w-3" />
        <span className="text-foreground font-medium capitalize">
          {activePage.replace("-", " ")}
        </span>
      </nav>

      <div className="flex-1" />

      {/* Search */}
      <div className="relative hidden md:block">
        <Search className="text-muted-foreground/40 absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2" />
        <input
          type="search"
          placeholder="Search..."
          className="border-border/40 bg-muted/30 text-foreground placeholder:text-muted-foreground/40 focus:border-border focus:bg-background h-8 w-44 rounded-lg border pr-3 pl-8 text-[12px] transition-colors outline-none"
        />
      </div>

      {/* Notifications Dropdown */}
      <div className="relative" ref={notifRef}>
        <Button
          variant="ghost"
          size="sm"
          isIconOnly
          onClick={() => {
            setIsNotifOpen(!isNotifOpen);
            setIsUserOpen(false);
          }}
          className={`relative h-8 w-8 transition-colors ${isNotifOpen ? "bg-muted/50 text-foreground" : "text-muted-foreground/60 hover:text-foreground"}`}
        >
          <Bell className="h-4 w-4" />
          <span className="bg-primary absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full" />
        </Button>

        <AnimatePresence>
          {isNotifOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="border-border/40 bg-card absolute top-full right-0 mt-2 w-[320px] overflow-hidden rounded-xl border shadow-lg"
            >
              <div className="border-border/30 bg-muted/20 flex items-center justify-between border-b px-4 py-3">
                <h4 className="text-[13px] font-semibold">Notifications</h4>
                <Badge variant="flat" className="bg-primary/10 text-primary h-5 px-1.5 text-[10px]">
                  2 New
                </Badge>
              </div>
              <div className="custom-scrollbar max-h-[300px] overflow-y-auto">
                <div className="border-border/10 hover:bg-muted/30 flex cursor-pointer gap-3 border-b p-4 transition-colors">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100/50 text-blue-500 dark:bg-blue-500/10 dark:text-blue-400">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-[13px] leading-tight font-medium">
                      New comment on "Next.js Architecture"
                    </p>
                    <p className="text-muted-foreground text-[11px]">
                      Sarah left a comment 2 hours ago.
                    </p>
                  </div>
                </div>
                <div className="hover:bg-muted/30 flex cursor-pointer gap-3 p-4 transition-colors">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100/50 text-rose-500 dark:bg-rose-500/10 dark:text-rose-400">
                    <AlertCircle className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-[13px] leading-tight font-medium">
                      Server CPU spike detected
                    </p>
                    <p className="text-muted-foreground text-[11px]">
                      Production server hit 90% load.
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-border/30 bg-muted/20 border-t p-2">
                <Button
                  variant="ghost"
                  className="text-primary h-8 w-full text-[12px]"
                  onClick={() => {
                    setIsNotifOpen(false);
                    onNavigate?.("inbox");
                  }}
                >
                  View all notifications
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {children}

      <div className="bg-border/40 hidden h-5 w-px sm:block" />

      {/* User Dropdown */}
      <div className="relative" ref={userRef}>
        <div
          onClick={() => {
            setIsUserOpen(!isUserOpen);
            setIsNotifOpen(false);
          }}
          className="cursor-pointer"
        >
          <Avatar
            name="Admin"
            size="sm"
            className="hidden transition-transform hover:scale-105 active:scale-95 sm:flex"
          />
        </div>

        <AnimatePresence>
          {isUserOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="border-border/40 bg-card absolute top-full right-0 mt-2 w-[240px] overflow-hidden rounded-xl border shadow-lg"
            >
              <div className="border-border/30 bg-muted/20 border-b px-4 py-3">
                <p className="text-foreground text-[14px] font-semibold">Admin User</p>
                <p className="text-muted-foreground mt-0.5 text-[11px]">admin@hudbird.com</p>
              </div>
              <div className="space-y-0.5 p-2">
                <button
                  onClick={() => {
                    setIsUserOpen(false);
                    onNavigate?.("profile");
                  }}
                  className="text-muted-foreground hover:bg-muted/50 hover:text-foreground flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors"
                >
                  <User className="h-4 w-4" /> My Profile
                </button>
                <button
                  onClick={() => {
                    setIsUserOpen(false);
                    onNavigate?.("settings");
                  }}
                  className="text-muted-foreground hover:bg-muted/50 hover:text-foreground flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors"
                >
                  <Settings className="h-4 w-4" /> Account Settings
                </button>
              </div>
              <div className="border-border/30 border-t p-2">
                <button
                  onClick={() => {
                    setIsUserOpen(false);
                    setIsLogoutModalOpen(true);
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium text-rose-500 transition-colors hover:bg-zinc-200/50"
                >
                  <LogOut className="h-4 w-4" /> Sign Out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={() => {
          setIsLogoutModalOpen(false);
          navigate("/login");
        }}
        title="Sign Out"
        description="Are you sure you want to sign out of the CMS? You will need to enter your credentials again to access the dashboard."
        confirmText="Sign Out"
        cancelText="Cancel"
      />
    </header>
  );
};
