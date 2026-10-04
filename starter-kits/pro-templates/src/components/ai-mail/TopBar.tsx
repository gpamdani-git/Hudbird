import React, { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Bell,
  CalendarDays,
  CheckCheck,
  Command,
  Crown,
  Headphones,
  LogOut,
  Mail as MailIcon,
  Menu,
  Moon,
  Paperclip,
  Search,
  Settings,
  Sparkles,
  Sun,
  User,
  X,
} from "lucide-react";
import { cn } from "@/lib/cn";
import type { MailEngine } from "./useMailEngine";
import { ME } from "./data";
import {
  IconButton,
  Kbd,
  MailAvatar,
  MenuItem,
  PopoverPanel,
  formatMailDate,
  useClickOutside,
} from "./primitives";

interface TopBarProps {
  engine: MailEngine;
  title: string;
  subtitle?: string;
  isDark: boolean;
  onToggleTheme: () => void;
  onMenu: () => void;
  onOpenAssistant: () => void;
  onSignOut: () => void;
  userName: string;
}

const NOTIF_ICON = { mail: MailIcon, ai: Sparkles, calendar: CalendarDays, system: Crown } as const;
const NOTIF_TONE = {
  mail: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
  ai: "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
  calendar: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  system: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
} as const;

export function TopBar({
  engine,
  title,
  subtitle,
  isDark,
  onToggleTheme,
  onMenu,
  onOpenAssistant,
  onSignOut,
  userName,
}: TopBarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchRef = useClickOutside<HTMLDivElement>(searchOpen, () => setSearchOpen(false));
  const notifRef = useClickOutside<HTMLDivElement>(notifOpen, () => setNotifOpen(false));
  const profileRef = useClickOutside<HTMLDivElement>(profileOpen, () => setProfileOpen(false));

  const unreadNotifs = engine.notifications.filter((n) => !n.read).length;

  // ⌘K / Ctrl+K focuses search
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setMobileSearch(true);
        inputRef.current?.focus();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const q = engine.searchQuery.trim().toLowerCase();
  const results = useMemo(
    () =>
      q
        ? engine.allEmails
            .filter(
              (m) =>
                m.folder !== "trash" &&
                (m.subject.toLowerCase().includes(q) ||
                  m.senderName.toLowerCase().includes(q) ||
                  m.body.toLowerCase().includes(q))
            )
            .slice(0, 5)
        : [],
    [q, engine.allEmails]
  );

  const people = useMemo(() => {
    if (!q) return [];
    const map = new Map<string, string>();
    engine.allEmails.forEach((m) => {
      if (m.senderName.toLowerCase().includes(q) && m.senderEmail !== ME.email)
        map.set(m.senderEmail, m.senderName);
    });
    return [...map.entries()].slice(0, 3);
  }, [q, engine.allEmails]);

  const quick = [
    { label: "Unread", icon: MailIcon, run: () => engine.setFilter("unread") },
    { label: "Has attachment", icon: Paperclip, run: () => engine.setFilter("attachments") },
    { label: "Starred", icon: Sparkles, run: () => engine.setFilter("starred") },
  ];

  const searchBox = (
    <div ref={searchRef} className="relative w-full">
      <div
        className={cn(
          "flex h-10 items-center gap-2.5 rounded-2xl border bg-zinc-100/70 px-3.5 transition-all dark:bg-white/[0.04]",
          searchOpen
            ? "border-blue-500/60 bg-white ring-4 ring-blue-500/10 dark:bg-zinc-900"
            : "border-transparent hover:border-zinc-200 dark:hover:border-white/10"
        )}
      >
        <Search className="h-4 w-4 shrink-0 text-zinc-400" />
        <input
          id="aimail-search"
          ref={inputRef}
          value={engine.searchQuery}
          onChange={(e) => {
            engine.setSearchQuery(e.target.value);
            setSearchOpen(true);
          }}
          onFocus={() => setSearchOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              engine.setView("mail");
              setSearchOpen(false);
            }
          }}
          placeholder="Search mail, people, attachments…"
          aria-label="Search mail"
          className="min-w-0 flex-1 bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white"
        />
        {engine.searchQuery ? (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => engine.setSearchQuery("")}
            className="cursor-pointer rounded-md p-0.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        ) : (
          <span className="hidden items-center gap-1 sm:flex">
            <Kbd>
              <Command className="inline h-2.5 w-2.5" />
            </Kbd>
            <Kbd>K</Kbd>
          </span>
        )}
      </div>

      <PopoverPanel open={searchOpen} align="left" className="w-full min-w-[320px] p-2">
        {!q ? (
          <div className="p-1">
            <p className="px-2 pt-1 pb-2 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
              Quick filters
            </p>
            <div className="flex flex-wrap gap-2 px-2 pb-2">
              {quick.map((f) => (
                <button
                  key={f.label}
                  type="button"
                  onClick={() => {
                    engine.setView("mail");
                    f.run();
                    setSearchOpen(false);
                  }}
                  className="flex cursor-pointer items-center gap-1.5 rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-blue-500/10"
                >
                  <f.icon className="h-3.5 w-3.5" /> {f.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                setSearchOpen(false);
                onOpenAssistant();
              }}
              className="mt-1 flex w-full cursor-pointer items-center gap-3 rounded-xl bg-gradient-to-r from-violet-50 to-sky-50 px-3 py-2.5 text-left text-sm dark:from-violet-500/10 dark:to-sky-500/10"
            >
              <Sparkles className="h-4 w-4 text-violet-500" />
              <span className="flex-1 text-zinc-700 dark:text-zinc-200">
                Ask AI: "What needs my reply today?"
              </span>
            </button>
          </div>
        ) : (
          <div className="max-h-[60vh] overflow-y-auto">
            {people.length > 0 && (
              <>
                <p className="px-3 pt-2 pb-1 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
                  People
                </p>
                {people.map(([email, name]) => (
                  <button
                    key={email}
                    type="button"
                    onClick={() => {
                      engine.setSearchQuery(name);
                      engine.setView("mail");
                      setSearchOpen(false);
                    }}
                    className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-left hover:bg-zinc-100 dark:hover:bg-white/5"
                  >
                    <MailAvatar name={name} size={28} />
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-zinc-900 dark:text-white">
                        {name}
                      </span>
                      <span className="block truncate text-xs text-zinc-500">{email}</span>
                    </span>
                  </button>
                ))}
              </>
            )}
            <p className="px-3 pt-2 pb-1 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
              Emails · {results.length}
            </p>
            {results.length === 0 && (
              <p className="px-3 py-4 text-sm text-zinc-500">
                No emails match "{engine.searchQuery}".
              </p>
            )}
            {results.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  engine.setView("mail");
                  engine.selectMail(m.id);
                  setSearchOpen(false);
                }}
                className="flex w-full cursor-pointer items-start gap-3 rounded-xl px-3 py-2 text-left hover:bg-zinc-100 dark:hover:bg-white/5"
              >
                <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-zinc-900 dark:text-white">
                    {m.subject}
                  </span>
                  <span className="block truncate text-xs text-zinc-500">
                    {m.senderName} · {formatMailDate(m.date)}
                  </span>
                </span>
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                engine.setView("mail");
                setSearchOpen(false);
              }}
              className="mt-1 w-full cursor-pointer rounded-xl px-3 py-2 text-left text-sm font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-500/10"
            >
              See all results in list →
            </button>
          </div>
        )}
      </PopoverPanel>
    </div>
  );

  return (
    <header className="relative z-30 flex h-16 shrink-0 items-center gap-2 border-b border-zinc-200/70 bg-white/80 px-3 backdrop-blur-xl sm:gap-3 sm:px-5 dark:border-white/[0.06] dark:bg-[#0f0f10]/80">
      <IconButton label="Open menu" onClick={onMenu} className="md:hidden">
        <Menu className="h-5 w-5" />
      </IconButton>

      {!mobileSearch && (
        <div className="min-w-0 flex-1 md:hidden">
          <h1 className="font-heading truncate text-base font-semibold text-zinc-900 dark:text-white">
            {title}
          </h1>
        </div>
      )}

      <div className="hidden min-w-0 shrink-0 md:block md:w-[200px] lg:w-[240px]">
        <h1 className="font-heading truncate text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
          {title}
        </h1>
        {subtitle && <p className="truncate text-xs text-zinc-500">{subtitle}</p>}
      </div>

      <div
        className={cn(
          "max-w-xl flex-1 items-center gap-2",
          mobileSearch ? "flex" : "hidden md:flex"
        )}
      >
        {searchBox}
        <IconButton
          label="Close search"
          className="md:hidden"
          onClick={() => setMobileSearch(false)}
        >
          <X className="h-4 w-4" />
        </IconButton>
      </div>

      <div
        className={cn(
          "ml-auto flex items-center gap-1 sm:gap-1.5",
          mobileSearch && "hidden md:flex"
        )}
      >
        <IconButton label="Search" className="md:hidden" onClick={() => setMobileSearch(true)}>
          <Search className="h-[18px] w-[18px]" />
        </IconButton>

        <motion.button
          id="aimail-ai-button"
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={onOpenAssistant}
          aria-label="Open AI assistant"
          className="group relative flex h-9 cursor-pointer items-center gap-1.5 overflow-hidden rounded-xl px-2.5 text-sm font-semibold text-white shadow-[0_6px_20px_-6px_rgba(139,92,246,0.7)] sm:px-3"
        >
          <span className="absolute inset-0 bg-[linear-gradient(110deg,#4f46e5,#7c3aed,#db2777,#4f46e5)] bg-[length:200%_100%] transition-[background-position] duration-700 group-hover:bg-[position:100%_0]" />
          <Sparkles className="relative h-4 w-4" />
          <span className="relative hidden sm:inline">Ask AI</span>
        </motion.button>

        <IconButton
          label={isDark ? "Light mode" : "Dark mode"}
          onClick={onToggleTheme}
          id="aimail-theme-toggle"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isDark ? "d" : "l"}
              initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isDark ? (
                <Sun className="h-[18px] w-[18px]" />
              ) : (
                <Moon className="h-[18px] w-[18px]" />
              )}
            </motion.span>
          </AnimatePresence>
        </IconButton>

        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <IconButton
            label="Notifications"
            active={notifOpen}
            onClick={() => setNotifOpen((v) => !v)}
            id="aimail-notifications"
          >
            <motion.span
              animate={unreadNotifs ? { rotate: [0, -14, 12, -8, 6, 0] } : {}}
              transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 6 }}
            >
              <Bell className="h-[18px] w-[18px]" />
            </motion.span>
            {unreadNotifs > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-bold text-white ring-2 ring-white dark:ring-[#0f0f10]">
                {unreadNotifs}
              </span>
            )}
          </IconButton>
          <PopoverPanel open={notifOpen} className="w-[min(92vw,380px)]">
            <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3 dark:border-white/[0.06]">
              <p className="font-semibold text-zinc-900 dark:text-white">Notifications</p>
              <button
                type="button"
                onClick={engine.markNotificationsRead}
                className="flex cursor-pointer items-center gap-1 text-xs font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                <CheckCheck className="h-3.5 w-3.5" /> Mark all read
              </button>
            </div>
            <div className="max-h-[360px] overflow-y-auto p-2">
              {engine.notifications.length === 0 && (
                <div className="py-10 text-center text-sm text-zinc-500">
                  <Bell className="mx-auto mb-2 h-6 w-6 opacity-40" /> You're all caught up
                </div>
              )}
              {engine.notifications.map((n, i) => {
                const Icon = NOTIF_ICON[n.type];
                return (
                  <motion.div
                    key={n.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex gap-3 rounded-xl p-2.5 transition-colors hover:bg-zinc-50 dark:hover:bg-white/[0.04]"
                  >
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                        NOTIF_TONE[n.type]
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-zinc-900 dark:text-white">{n.title}</p>
                      <p className="mt-0.5 line-clamp-2 text-xs text-zinc-500">{n.body}</p>
                      <p className="mt-1 text-[11px] text-zinc-400">{n.time}</p>
                    </div>
                    {!n.read && (
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                    )}
                  </motion.div>
                );
              })}
            </div>
            {engine.notifications.length > 0 && (
              <button
                type="button"
                onClick={engine.clearNotifications}
                className="w-full cursor-pointer border-t border-zinc-100 py-2.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:border-white/[0.06] dark:hover:text-white"
              >
                Clear all
              </button>
            )}
          </PopoverPanel>
        </div>

        {/* Profile */}
        <div ref={profileRef} className="relative ml-0.5">
          <button
            id="aimail-profile"
            type="button"
            aria-label="Account menu"
            onClick={() => setProfileOpen((v) => !v)}
            className="flex cursor-pointer items-center gap-2 rounded-full p-0.5 transition-shadow hover:ring-4 hover:ring-zinc-100 dark:hover:ring-white/5"
          >
            <span className="relative">
              <MailAvatar name={userName} size={34} />
              <span className="absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#0f0f10]" />
            </span>
          </button>
          <PopoverPanel open={profileOpen} className="w-72 p-2">
            <div className="flex items-center gap-3 rounded-xl p-2.5">
              <MailAvatar name={userName} size={42} />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-zinc-900 dark:text-white">
                  {userName}
                </p>
                <p className="truncate text-xs text-zinc-500">{ME.email}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                engine.setView("upgrade");
                setProfileOpen(false);
              }}
              className="mx-1 mb-1 flex w-[calc(100%-0.5rem)] cursor-pointer items-center justify-between rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-3 py-2 text-xs font-semibold text-white"
            >
              <span className="flex items-center gap-1.5">
                <Crown className="h-3.5 w-3.5" /> Free plan
              </span>
              <span>Upgrade →</span>
            </button>
            <div className="my-1 h-px bg-zinc-100 dark:bg-white/[0.06]" />
            {[
              { icon: User, label: "Profile", view: "settings" as const },
              { icon: Settings, label: "Settings", view: "settings" as const, hint: "⌘," },
              { icon: Headphones, label: "Help & support", view: "support" as const },
            ].map((i) => (
              <MenuItem
                key={i.label}
                icon={i.icon}
                hint={i.hint}
                onClick={() => {
                  engine.setView(i.view);
                  setProfileOpen(false);
                }}
              >
                {i.label}
              </MenuItem>
            ))}
            <MenuItem
              icon={isDark ? Sun : Moon}
              onClick={onToggleTheme}
              hint={isDark ? "Dark" : "Light"}
            >
              Appearance
            </MenuItem>
            <div className="my-1 h-px bg-zinc-100 dark:bg-white/[0.06]" />
            <MenuItem icon={LogOut} danger onClick={onSignOut}>
              Sign out
            </MenuItem>
          </PopoverPanel>
        </div>
      </div>
    </header>
  );
}
