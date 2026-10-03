import React from "react";
import {
  Inbox,
  Send,
  File,
  Calendar,
  CheckSquare,
  Sparkles,
  Search,
  Plus,
  MoreVertical,
  Activity,
  Code,
  Layout,
  Bug,
  Headphones,
  Settings,
} from "lucide-react";
import { MailFolder } from "./types";
import { Avatar } from "@/components/ui";

interface SidebarProps {
  activeFolder: MailFolder;
  onSelectFolder: (folder: MailFolder) => void;
  onCompose: () => void;
  unreadCount: number;
}

const GENERAL = [
  { id: "inbox", label: "Inbox", icon: Inbox },
  { id: "sent", label: "Sent", icon: Send },
  { id: "drafts", label: "Drafts", icon: File },
  { id: "ai", label: "AI Features", icon: Sparkles },
  { id: "calendar", label: "Calendar", icon: Calendar },
  { id: "tasks", label: "Tasks & To-dos", icon: CheckSquare },
];

const FOLDERS = [
  { id: "operation", label: "Operation", icon: Activity },
  { id: "frontend", label: "Front-End", icon: Code },
  { id: "uidesign", label: "UI Design", icon: Layout },
  { id: "debugs", label: "Debugs", icon: Bug },
];

export function Sidebar({ activeFolder, onSelectFolder, onCompose }: SidebarProps) {
  return (
    <div className="flex h-full w-[260px] shrink-0 flex-col overflow-y-auto border-r border-zinc-100 bg-white dark:border-white/5 dark:bg-[#111111]">
      {/* Profile */}
      <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-zinc-100 px-4 dark:border-white/5">
        <div className="flex items-center gap-3">
          <Avatar name="Johnathan Hayes" size="sm" className="h-9 w-9 bg-zinc-800 text-white" />
          <div className="flex flex-col">
            <span className="text-sm leading-tight font-semibold text-zinc-900 dark:text-white">
              Johnathan Hayes
            </span>
            <span className="text-xs text-zinc-500">Johnathan@gmail.com</span>
          </div>
        </div>
        <button className="text-zinc-400 hover:text-zinc-600">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>

      {/* Compose */}
      <div className="flex flex-col gap-4 px-4 py-4">
        <button
          onClick={onCompose}
          className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-blue-500 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-600"
        >
          <Plus className="h-4 w-4" />
          Compose email
        </button>
      </div>

      {/* General */}
      <div className="mb-6 px-4">
        <div className="mb-2 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
          General
        </div>
        <nav className="space-y-0.5">
          {GENERAL.map((f) => {
            const Icon = f.icon;
            const isActive = activeFolder === f.id;
            return (
              <button
                key={f.id}
                onClick={() =>
                  f.id === "inbox" || f.id === "sent" || f.id === "drafts"
                    ? onSelectFolder(f.id as MailFolder)
                    : null
                }
                className={`group relative flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                  isActive
                    ? "bg-zinc-100 font-medium text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-white"
                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-200"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm">{f.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Folders */}
      <div className="mb-6 px-4">
        <div className="mb-2 flex items-center justify-between text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
          <span>Folders</span>
          <Plus className="h-3 w-3 cursor-pointer hover:text-zinc-600" />
        </div>
        <nav className="space-y-0.5">
          {FOLDERS.map((f) => {
            const Icon = f.icon;
            return (
              <button
                key={f.id}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-200"
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm">{f.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="mt-auto space-y-4 px-4 pt-4 pb-6">
        {/* Go Pro */}
        <div className="flex items-center justify-between rounded-lg border border-blue-100 bg-blue-50 px-3 py-2.5 dark:border-blue-800/30 dark:bg-blue-900/20">
          <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
            <Sparkles className="h-4 w-4" /> Go Pro
          </div>
          <span className="rounded-md bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-600 dark:bg-blue-800/40 dark:text-blue-400">
            $12/month
          </span>
        </div>

        <nav className="space-y-0.5">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-200">
            <Headphones className="h-4 w-4" />
            <span className="text-sm">Support</span>
          </button>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-200">
            <Settings className="h-4 w-4" />
            <span className="text-sm">Settings</span>
          </button>
        </nav>

        {/* Storage */}
        <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-zinc-800/30">
          <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-white">
            <File className="h-4 w-4 text-zinc-400" /> Total storage
          </div>
          <div className="mb-3 text-xs text-zinc-500">
            <strong className="text-zinc-900 dark:text-white">100GB</strong> used from 256GB
          </div>
          <div className="mb-4 flex h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-700">
            <div className="h-full w-1/3 bg-blue-500"></div>
            <div className="h-full w-1/4 bg-orange-400"></div>
            <div className="h-full w-1/6 bg-green-500"></div>
          </div>
          <button className="w-full rounded-lg bg-zinc-900 py-2 text-xs font-bold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black">
            Upgrade
          </button>
        </div>
      </div>
    </div>
  );
}
