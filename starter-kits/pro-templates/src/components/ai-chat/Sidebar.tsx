import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Archive,
  CircleHelp,
  Compass,
  Ellipsis,
  Folder,
  FolderPlus,
  ImageIcon,
  Library,
  LogOut,
  PanelLeft,
  Pencil,
  Pin,
  Search,
  Settings,
  Share2,
  Sparkles,
  SquarePen,
  Telescope,
  Trash2,
} from "lucide-react";
import type { AppView, Conversation, ModalKey, Project } from "./types";
import {
  Avatar,
  IconButton,
  Logo,
  Menu,
  MenuItem,
  cx,
  softSpring,
  useClickOutside,
} from "./primitives";

interface SidebarProps {
  isGuest: boolean;
  collapsed: boolean;
  onToggle: () => void;
  conversations: Conversation[];
  activeId: string | null;
  projects: Project[];
  view: AppView;
  activeProjectId: string | null;
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
  onRename: (id: string, title: string) => void;
  onDelete: (id: string) => void;
  onPin: (id: string) => void;
  onView: (v: AppView) => void;
  onOpenProject: (id: string) => void;
  onModal: (m: ModalKey) => void;
  onLogin: () => void;
  onLogout: () => void;
  onToast: (m: string) => void;
  /** Mobile drawer mode — always expanded */
  mobile?: boolean;
}

const DAY = 86_400_000;

function groupByDate(list: Conversation[]) {
  const now = Date.now();
  const groups: { label: string; items: Conversation[] }[] = [
    { label: "Pinned", items: [] },
    { label: "Today", items: [] },
    { label: "Yesterday", items: [] },
    { label: "Previous 7 days", items: [] },
    { label: "Previous 30 days", items: [] },
  ];
  [...list]
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .forEach((c) => {
      const age = now - c.updatedAt;
      if (c.pinned) groups[0].items.push(c);
      else if (age < DAY) groups[1].items.push(c);
      else if (age < 2 * DAY) groups[2].items.push(c);
      else if (age < 7 * DAY) groups[3].items.push(c);
      else groups[4].items.push(c);
    });
  return groups.filter((g) => g.items.length);
}

export function Sidebar(props: SidebarProps) {
  const { isGuest, collapsed: rawCollapsed, mobile } = props;
  const collapsed = mobile ? false : rawCollapsed;

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 64 : 268 }}
      transition={softSpring}
      className="relative z-30 flex h-full shrink-0 flex-col overflow-hidden border-r border-[var(--c-border)] bg-[var(--c-sidebar)]"
      aria-label="Sidebar"
    >
      {/* Header */}
      <div
        className={cx(
          "flex h-14 shrink-0 items-center px-3",
          collapsed ? "justify-center" : "justify-between"
        )}
      >
        {collapsed ? (
          <IconButton
            label="Open sidebar"
            tooltipSide="right"
            onClick={props.onToggle}
            className="group/logo"
          >
            <span className="group-hover/logo:hidden">
              <Logo size={22} />
            </span>
            <PanelLeft className="hidden h-[18px] w-[18px] group-hover/logo:block" />
          </IconButton>
        ) : (
          <>
            <button
              type="button"
              onClick={props.onNewChat}
              className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition-colors hover:bg-[var(--c-surface-2)]"
            >
              <Logo size={22} />
              <span className="text-[15px] font-semibold tracking-tight">Hudbird</span>
            </button>
            <div className="flex items-center">
              {!isGuest && (
                <IconButton label="Search chats  ⌘K" onClick={() => props.onModal("search")}>
                  <Search className="h-[18px] w-[18px]" />
                </IconButton>
              )}
              <IconButton
                label={mobile ? "Close sidebar" : "Close sidebar"}
                onClick={props.onToggle}
              >
                <PanelLeft className="h-[18px] w-[18px]" />
              </IconButton>
            </div>
          </>
        )}
      </div>

      {/* Primary nav */}
      <nav className="flex shrink-0 flex-col gap-0.5 px-2">
        <NavItem
          collapsed={collapsed}
          icon={<SquarePen className="h-[18px] w-[18px]" />}
          label="New chat"
          kbd="⇧⌘O"
          onClick={props.onNewChat}
          active={props.view === "chat" && !props.activeId}
        />
        {collapsed && !isGuest && (
          <NavItem
            collapsed
            icon={<Search className="h-[18px] w-[18px]" />}
            label="Search chats"
            onClick={() => props.onModal("search")}
          />
        )}
        <NavItem
          collapsed={collapsed}
          icon={<ImageIcon className="h-[18px] w-[18px]" />}
          label="Images"
          onClick={() => props.onView("images")}
          active={props.view === "images"}
        />
        {isGuest ? (
          <>
            <NavItem
              collapsed={collapsed}
              icon={<Compass className="h-[18px] w-[18px]" />}
              label="Explore apps"
              onClick={() => props.onLogin()}
            />
            <NavItem
              collapsed={collapsed}
              icon={<Telescope className="h-[18px] w-[18px]" />}
              label="Deep research"
              onClick={() => props.onModal("plans")}
            />
            <NavItem
              collapsed={collapsed}
              icon={<Sparkles className="h-[18px] w-[18px]" />}
              label="See plans and pricing"
              onClick={() => props.onModal("plans")}
            />
            <NavItem
              collapsed={collapsed}
              icon={<CircleHelp className="h-[18px] w-[18px]" />}
              label="Help"
              onClick={() => props.onToast("Help center opened")}
            />
            <NavItem
              collapsed={collapsed}
              icon={<Settings className="h-[18px] w-[18px]" />}
              label="Settings"
              onClick={() => props.onModal("settings")}
            />
          </>
        ) : (
          <>
            <NavItem
              collapsed={collapsed}
              icon={<Library className="h-[18px] w-[18px]" />}
              label="Library"
              onClick={() => props.onView("library")}
              active={props.view === "library"}
            />
            <NavItem
              collapsed={collapsed}
              icon={<Folder className="h-[18px] w-[18px]" />}
              label="Projects"
              onClick={() => props.onView("projects")}
              active={props.view === "projects"}
            />
            <NavItem
              collapsed={collapsed}
              icon={<Compass className="h-[18px] w-[18px]" />}
              label="Explore apps"
              onClick={() => props.onToast("App directory coming soon")}
            />
          </>
        )}
      </nav>

      {/* Scroll area */}
      <div className="aichat-scroll mt-3 min-h-0 flex-1 overflow-x-hidden overflow-y-auto px-2 pb-4">
        <AnimatePresence initial={false}>
          {!collapsed && !isGuest && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <ProjectsSection {...props} />
              <HistoryList {...props} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="shrink-0 border-t border-[var(--c-border)] p-2">
        {isGuest ? (
          !collapsed && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-2"
            >
              <p className="text-sm font-semibold">Get responses tailored to you</p>
              <p className="mt-1 text-[13px] leading-5 text-[var(--c-muted)]">
                Log in to get answers based on saved chats, plus create images and upload files.
              </p>
              <button
                type="button"
                onClick={props.onLogin}
                className="mt-3 h-10 w-full rounded-full border border-[var(--c-border-strong)] bg-[var(--c-surface)] text-sm font-medium transition-colors hover:bg-[var(--c-surface-2)]"
              >
                Log in
              </button>
            </motion.div>
          )
        ) : (
          <AccountButton collapsed={collapsed} onModal={props.onModal} onLogout={props.onLogout} />
        )}
      </div>
    </motion.aside>
  );
}

function NavItem({
  icon,
  label,
  onClick,
  active,
  collapsed,
  kbd,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
  collapsed: boolean;
  kbd?: string;
}) {
  if (collapsed)
    return (
      <IconButton
        label={label}
        tooltipSide="right"
        onClick={onClick}
        active={active}
        className="mx-auto h-10 w-10"
      >
        {icon}
      </IconButton>
    );
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "group flex h-9 w-full items-center gap-3 rounded-xl px-2.5 text-left text-sm transition-colors",
        active
          ? "bg-[var(--c-surface-2)] text-[var(--c-text)]"
          : "text-[var(--c-text)] hover:bg-[var(--c-surface-2)]"
      )}
    >
      <span className="text-[var(--c-muted)] group-hover:text-[var(--c-text)]">{icon}</span>
      <span className="flex-1 truncate">{label}</span>
      {kbd && (
        <span className="text-xs text-[var(--c-subtle)] opacity-0 transition-opacity group-hover:opacity-100">
          {kbd}
        </span>
      )}
    </button>
  );
}

function SectionLabel({
  children,
  action,
}: {
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between px-2.5 pt-4 pb-1 text-xs font-medium text-[var(--c-subtle)]">
      <span>{children}</span>
      {action}
    </div>
  );
}

function ProjectsSection({
  projects,
  onOpenProject,
  onModal,
  activeProjectId,
  view,
}: SidebarProps) {
  return (
    <div>
      <SectionLabel
        action={
          <button
            type="button"
            aria-label="New project"
            onClick={() => onModal("newProject")}
            className="rounded-md p-0.5 hover:text-[var(--c-text)]"
          >
            <FolderPlus className="h-3.5 w-3.5" />
          </button>
        }
      >
        Projects
      </SectionLabel>
      <AnimatePresence initial={false}>
        {projects.map((p) => (
          <motion.button
            key={p.id}
            layout
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            type="button"
            onClick={() => onOpenProject(p.id)}
            className={cx(
              "flex h-9 w-full items-center gap-3 rounded-xl px-2.5 text-left text-sm transition-colors hover:bg-[var(--c-surface-2)]",
              view === "project" && activeProjectId === p.id && "bg-[var(--c-surface-2)]"
            )}
          >
            <Folder
              className="h-[18px] w-[18px]"
              style={{ color: p.color }}
              fill={p.color}
              fillOpacity={0.2}
            />
            <span className="truncate">{p.name}</span>
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
}

function HistoryList(props: SidebarProps) {
  const groups = useMemo(() => groupByDate(props.conversations), [props.conversations]);
  return (
    <div>
      {groups.map((g) => (
        <div key={g.label}>
          <SectionLabel>{g.label}</SectionLabel>
          <AnimatePresence initial={false}>
            {g.items.map((c) => (
              <HistoryItem key={c.id} conv={c} {...props} />
            ))}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

function HistoryItem({
  conv,
  activeId,
  onSelectChat,
  onRename,
  onDelete,
  onPin,
  onToast,
}: SidebarProps & { conv: Conversation }) {
  const [menu, setMenu] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(conv.title);
  const ref = useClickOutside<HTMLDivElement>(menu, () => setMenu(false));
  const active = activeId === conv.id;

  const commit = () => {
    setEditing(false);
    if (draft.trim()) onRename(conv.id, draft.trim());
    else setDraft(conv.title);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0, x: -40 }}
      transition={softSpring}
      className="relative"
      ref={ref}
    >
      {/* Swipe-to-delete backdrop */}
      <div
        className="absolute inset-y-0 right-0 flex items-center rounded-xl bg-rose-500/90 pr-3 text-white"
        aria-hidden
      >
        <Trash2 className="h-4 w-4" />
      </div>
      <motion.div
        drag={editing ? false : "x"}
        dragDirectionLock
        dragConstraints={{ left: -90, right: 0 }}
        dragElastic={{ left: 0.2, right: 0 }}
        dragSnapToOrigin
        onDragEnd={(_, info) => {
          if (info.offset.x < -70) {
            onDelete(conv.id);
            onToast("Chat deleted");
          }
        }}
        className={cx(
          "group relative flex h-9 items-center rounded-xl bg-[var(--c-sidebar)] pr-1 transition-colors",
          active ? "!bg-[var(--c-surface-2)]" : "hover:!bg-[var(--c-surface-2)]",
          menu && "!bg-[var(--c-surface-2)]"
        )}
      >
        {editing ? (
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === "Enter") commit();
              if (e.key === "Escape") {
                setDraft(conv.title);
                setEditing(false);
              }
            }}
            aria-label="Rename chat"
            className="mx-1 h-7 w-full rounded-lg border border-[var(--c-accent)] bg-[var(--c-bg)] px-2 text-sm outline-none"
          />
        ) : (
          <button
            type="button"
            onClick={() => onSelectChat(conv.id)}
            className="flex h-full min-w-0 flex-1 items-center gap-2 px-2.5 text-left text-sm"
          >
            {active && (
              <motion.span
                layoutId="aichat-active-dot"
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--c-accent)]"
              />
            )}
            <span className="truncate [mask-image:linear-gradient(90deg,#000_80%,transparent)]">
              {conv.title}
            </span>
          </button>
        )}
        {!editing && (
          <button
            type="button"
            aria-label="Chat options"
            onClick={() => setMenu((m) => !m)}
            className={cx(
              "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[var(--c-muted)] transition-opacity hover:text-[var(--c-text)]",
              menu || active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )}
          >
            <Ellipsis className="h-4 w-4" />
          </button>
        )}
      </motion.div>
      <Menu open={menu} className="top-9 right-0 w-48" origin="top right">
        <MenuItem
          icon={<Share2 className="h-4 w-4" />}
          onClick={() => {
            setMenu(false);
            onToast("Share link copied");
          }}
        >
          Share
        </MenuItem>
        <MenuItem
          icon={<Pencil className="h-4 w-4" />}
          onClick={() => {
            setMenu(false);
            setEditing(true);
          }}
        >
          Rename
        </MenuItem>
        <MenuItem
          icon={<Pin className="h-4 w-4" />}
          onClick={() => {
            setMenu(false);
            onPin(conv.id);
          }}
        >
          {conv.pinned ? "Unpin" : "Pin chat"}
        </MenuItem>
        <MenuItem
          icon={<Archive className="h-4 w-4" />}
          onClick={() => {
            setMenu(false);
            onDelete(conv.id);
            onToast("Chat archived");
          }}
        >
          Archive
        </MenuItem>
        <div className="my-1 h-px bg-[var(--c-border)]" />
        <MenuItem
          danger
          icon={<Trash2 className="h-4 w-4" />}
          onClick={() => {
            setMenu(false);
            onDelete(conv.id);
            onToast("Chat deleted");
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </motion.div>
  );
}

function AccountButton({
  collapsed,
  onModal,
  onLogout,
}: {
  collapsed: boolean;
  onModal: (m: ModalKey) => void;
  onLogout: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(open, () => setOpen(false));
  return (
    <div className="relative" ref={ref}>
      <Menu
        open={open}
        className={cx("bottom-full mb-2", collapsed ? "left-0 w-60" : "inset-x-0")}
        origin="bottom left"
      >
        <div className="px-2.5 py-2 text-xs text-[var(--c-subtle)]">dani@hudbird.com</div>
        <MenuItem
          icon={<Sparkles className="h-4 w-4" />}
          onClick={() => {
            setOpen(false);
            onModal("plans");
          }}
        >
          Upgrade plan
        </MenuItem>
        <MenuItem
          icon={<Settings className="h-4 w-4" />}
          onClick={() => {
            setOpen(false);
            onModal("settings");
          }}
        >
          Settings
        </MenuItem>
        <MenuItem icon={<CircleHelp className="h-4 w-4" />} onClick={() => setOpen(false)}>
          Help
        </MenuItem>
        <div className="my-1 h-px bg-[var(--c-border)]" />
        <MenuItem
          icon={<LogOut className="h-4 w-4" />}
          onClick={() => {
            setOpen(false);
            onLogout();
          }}
        >
          Log out
        </MenuItem>
      </Menu>
      {collapsed ? (
        <button
          type="button"
          aria-label="Account"
          onClick={() => setOpen((o) => !o)}
          className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl hover:bg-[var(--c-surface-2)]"
        >
          <Avatar name="Dani Akbar" size={28} />
        </button>
      ) : (
        <div className="flex items-center gap-2 rounded-xl p-1.5 transition-colors hover:bg-[var(--c-surface-2)]">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="flex min-w-0 flex-1 items-center gap-2.5 text-left"
          >
            <Avatar name="Dani Akbar" size={32} />
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium">Dani Akbar</span>
              <span className="block text-xs text-[var(--c-subtle)]">Free</span>
            </span>
          </button>
          <button
            type="button"
            onClick={() => onModal("plans")}
            className="h-8 rounded-full border border-[var(--c-border-strong)] px-3 text-xs font-medium transition-colors hover:bg-[var(--c-surface-3)]"
          >
            Upgrade
          </button>
        </div>
      )}
    </div>
  );
}
