import React, { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Image,
  Users,
  Settings,
  FolderOpen,
  Globe,
  Palette,
  Shield,
  Bell,
  Plug,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { Avatar } from "@hudbird/ui";
import { ConfirmModal } from "../Components/ConfirmModal";

export type AdminPage =
  | "overview"
  | "analytics"
  | "messages"
  | "posts"
  | "categories"
  | "pages"
  | "media"
  | "editor-post"
  | "editor-page"
  | "users"
  | "site-builder"
  | "appearance"
  | "plugins"
  | "notifications"
  | "security"
  | "settings"
  | "profile"
  | "inbox";

interface SubItem {
  label: string;
  pageKey?: AdminPage;
}

interface NavItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  pageKey?: AdminPage;
  children?: SubItem[];
}

const CONTENT_MENU: NavItem[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    children: [
      { label: "Overview", pageKey: "overview" },
      { label: "Analytics", pageKey: "analytics" },
      { label: "Form Messages", pageKey: "messages" },
    ],
  },
  {
    label: "Posts & Pages",
    icon: FileText,
    children: [
      { label: "Posts", pageKey: "posts" },
      { label: "Pages", pageKey: "pages" },
    ],
  },
  { label: "Media Library", icon: Image, pageKey: "media" },
  { label: "Categories", icon: FolderOpen, pageKey: "categories" },
];

const MANAGE_MENU: NavItem[] = [
  { label: "Users & Roles", icon: Users, pageKey: "users" },
  { label: "Site Builder", icon: Globe, pageKey: "site-builder" },
  { label: "Appearance", icon: Palette, pageKey: "appearance" },
  { label: "Plugins", icon: Plug, pageKey: "plugins" },
];

const SYSTEM_MENU: NavItem[] = [
  { label: "Notifications", icon: Bell, pageKey: "notifications" },
  { label: "Security", icon: Shield, pageKey: "security" },
  { label: "Settings", icon: Settings, pageKey: "settings" },
];

const SidebarSection = ({
  title,
  items,
  activePage,
  onPageChange,
}: {
  title: string;
  items: NavItem[];
  activePage: AdminPage;
  onPageChange: (page: AdminPage) => void;
}) => {
  // Auto-expand item that contains the active page
  const autoExpandLabel = items.find((item) =>
    item.children?.some((child) => child.pageKey === activePage)
  )?.label;

  const [expandedItem, setExpandedItem] = useState<string | null>(autoExpandLabel || null);

  // Keep expanded state in sync when activePage changes externally (via tabs)
  React.useEffect(() => {
    if (autoExpandLabel) {
      setExpandedItem(autoExpandLabel);
    }
  }, [autoExpandLabel]);

  return (
    <div>
      <p className="text-muted-foreground/50 mb-1.5 px-3 text-[10px] font-bold tracking-[0.12em] uppercase">
        {title}
      </p>
      <nav className="space-y-0.5">
        {items.map((item) => {
          const Icon = item.icon;
          const hasChildren = !!item.children?.length;
          const isExpanded = expandedItem === item.label;
          const isParentActive = item.children?.some((c) => c.pageKey === activePage);
          const isActive = item.pageKey === activePage;

          return (
            <div key={item.label}>
              <button
                onClick={() => {
                  if (hasChildren) {
                    setExpandedItem(isExpanded ? null : item.label);
                  } else if (item.pageKey) {
                    onPageChange(item.pageKey);
                  }
                }}
                className={`group flex w-full items-center gap-2 rounded-lg px-3 py-[7px] text-[13px] font-medium transition-all duration-150 ${
                  isParentActive || isActive
                    ? "bg-primary/10 text-primary dark:bg-primary/15"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                }`}
              >
                <Icon className="h-[15px] w-[15px] shrink-0 opacity-70" />
                <span className="flex-1 text-left">{item.label}</span>
                {hasChildren && (
                  <ChevronRight
                    className={`text-muted-foreground/40 h-3 w-3 transition-transform duration-200 ${
                      isExpanded ? "rotate-90" : ""
                    }`}
                  />
                )}
              </button>

              {hasChildren && isExpanded && (
                <div className="border-border/30 mt-0.5 ml-[18px] space-y-px border-l pb-1 pl-3">
                  {item.children!.map((child) => {
                    const isActive = child.pageKey === activePage;
                    return (
                      <button
                        key={child.label}
                        onClick={() => {
                          if (child.pageKey) onPageChange(child.pageKey);
                        }}
                        className={`block w-full rounded-md px-2 py-[5px] text-left text-[12px] transition-colors ${
                          isActive
                            ? "text-primary bg-primary/5 font-semibold"
                            : "text-muted-foreground/60 hover:text-foreground hover:bg-muted/50"
                        }`}
                      >
                        {child.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export interface AdminSidebarProps {
  activePage?: AdminPage;
  onPageChange?: (page: AdminPage) => void;
}

export const AdminSidebar = ({
  activePage = "overview",
  onPageChange = () => {},
}: AdminSidebarProps) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  return (
    <aside className="border-border/30 bg-card hidden w-[240px] shrink-0 flex-col border-r lg:flex">
      {/* Brand */}
      <div className="border-border/30 flex h-14 items-center gap-2.5 border-b px-5">
        <div className="bg-primary text-primary-foreground flex h-7 w-7 items-center justify-center rounded-md text-[11px] font-bold">
          H
        </div>
        <span className="text-[14px] font-bold tracking-tight">Hudbird CMS</span>
      </div>

      {/* Nav */}
      <div className="flex-1 space-y-5 overflow-y-auto px-3 py-4">
        <SidebarSection
          title="Content"
          items={CONTENT_MENU}
          activePage={activePage}
          onPageChange={onPageChange}
        />
        <SidebarSection
          title="Manage"
          items={MANAGE_MENU}
          activePage={activePage}
          onPageChange={onPageChange}
        />
        <SidebarSection
          title="System"
          items={SYSTEM_MENU}
          activePage={activePage}
          onPageChange={onPageChange}
        />
      </div>

      {/* User */}
      <div className="border-border/30 border-t px-3 py-3">
        <div
          onClick={() => setIsLogoutModalOpen(true)}
          className="hover:bg-destructive/10 hover:text-destructive group flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 transition-colors"
        >
          <Avatar name="Admin" size="sm" />
          <div className="min-w-0 flex-1">
            <p className="group-hover:text-destructive truncate text-[13px] leading-tight font-medium">
              Admin User
            </p>
            <p className="text-muted-foreground/60 group-hover:text-destructive/70 truncate text-[11px]">
              admin@hudbirdui.com
            </p>
          </div>
          <LogOut className="text-muted-foreground/40 group-hover:text-destructive h-3.5 w-3.5 shrink-0 transition-colors" />
        </div>
      </div>

      <ConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={() => {
          setIsLogoutModalOpen(false);
          // In a real app, you would handle logout logic here
        }}
        title="Sign Out"
        description="Are you sure you want to sign out of the CMS? You will need to enter your credentials again to access the dashboard."
        confirmText="Sign Out"
        cancelText="Cancel"
      />
    </aside>
  );
};
