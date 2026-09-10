import React, { useState } from "react";
import {
  Sidebar,
  SidebarHeader,
  SidebarToggle,
  SidebarContent,
  SidebarNav,
  SidebarItem,
  SidebarFooter,
} from "@hudbird/ui";
import {
  Home,
  Inbox,
  Search,
  Ticket,
  ShoppingBag,
  Radio,
  Settings,
  LifeBuoy,
  FileText,
} from "lucide-react";

export default function SidebarFlatDemo() {
  const [activeItem, setActiveItem] = useState("Home");

  const renderContent = () => {
    switch (activeItem) {
      case "Home":
        return (
          <div className="p-8 md:p-12">
            <h1 className="mb-6 text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white">
              Home
            </h1>
            <hr className="mb-6 w-full border-t border-zinc-950/10 dark:border-white/10" />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="h-40 rounded-xl border border-zinc-200/50 bg-zinc-100 dark:border-zinc-800/50 dark:bg-zinc-900/80"></div>
              <div className="h-40 rounded-xl border border-zinc-200/50 bg-zinc-100 dark:border-zinc-800/50 dark:bg-zinc-900/80"></div>
              <div className="h-40 rounded-xl border border-zinc-200/50 bg-zinc-100 dark:border-zinc-800/50 dark:bg-zinc-900/80"></div>
            </div>
            <div className="mt-6 h-64 rounded-xl border border-zinc-200/50 bg-zinc-100 dark:border-zinc-800/50 dark:bg-zinc-900/80"></div>
          </div>
        );
      case "Inbox":
        return (
          <div className="p-8 md:p-12">
            <h1 className="mb-6 text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white">
              Inbox
            </h1>
            <hr className="mb-6 w-full border-t border-zinc-950/10 dark:border-white/10" />
            <div className="space-y-4">
              <div className="h-20 rounded-xl border border-zinc-200/50 bg-zinc-100 dark:border-zinc-800/50 dark:bg-zinc-900/80"></div>
              <div className="h-20 rounded-xl border border-zinc-200/50 bg-zinc-100 dark:border-zinc-800/50 dark:bg-zinc-900/80"></div>
              <div className="h-20 rounded-xl border border-zinc-200/50 bg-zinc-100 dark:border-zinc-800/50 dark:bg-zinc-900/80"></div>
            </div>
          </div>
        );
      case "Events":
        return (
          <div className="p-8 md:p-12">
            <h1 className="mb-6 text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white">
              Events
            </h1>
            <hr className="mb-6 w-full border-t border-zinc-950/10 dark:border-white/10" />
            <div className="h-96 rounded-xl border border-zinc-200/50 bg-zinc-100 dark:border-zinc-800/50 dark:bg-zinc-900/80"></div>
          </div>
        );
      default:
        return (
          <div className="p-8 md:p-12">
            <h1 className="mb-6 text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white">
              {activeItem}
            </h1>
            <hr className="mb-6 w-full border-t border-zinc-950/10 dark:border-white/10" />
            <p className="text-zinc-500">This is a simulated page transition.</p>
          </div>
        );
    }
  };

  return (
    <div className="relative flex h-screen w-full bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-950">
      <div className="relative flex h-full w-full overflow-hidden p-4 shadow-xl lg:p-8">
        <Sidebar variant="flat" size="sm" radius="full">
          <SidebarHeader className="relative h-14">
            <div className="flex items-center gap-2 overflow-hidden transition-all duration-300 group-aria-[expanded=false]:w-0 group-aria-[expanded=false]:opacity-0">
              <span className="text-sm font-bold tracking-wider text-zinc-900 dark:text-zinc-50">
                WORKSPACE
              </span>
            </div>
            <SidebarToggle className="absolute right-4 bg-white/50 shadow-sm transition-all duration-300 group-aria-[expanded=false]:right-1/2 group-aria-[expanded=false]:translate-x-1/2 dark:bg-zinc-800/50" />
          </SidebarHeader>

          <SidebarContent>
            <div className="mb-2 px-3 pt-2">
              <div className="flex items-center gap-2 rounded-full bg-zinc-200/50 px-2.5 py-1.5 text-zinc-500 transition-all group-aria-[expanded=false]:justify-center dark:bg-zinc-800/50">
                <Search size={14} className="shrink-0" />
                <span className="overflow-hidden text-xs whitespace-nowrap transition-all group-aria-[expanded=false]:w-0 group-aria-[expanded=false]:opacity-0">
                  Search...
                </span>
              </div>
            </div>

            <div className="mb-4 space-y-1 px-3">
              <SidebarItem
                icon={<Inbox size={16} />}
                isActive={activeItem === "Inbox"}
                onClick={() => setActiveItem("Inbox")}
                label="Inbox"
              >
                Inbox
              </SidebarItem>
            </div>

            <SidebarNav>
              <SidebarItem
                icon={<Home size={16} />}
                isActive={activeItem === "Home"}
                onClick={() => setActiveItem("Home")}
                label="Home"
              >
                Home
              </SidebarItem>
              <SidebarItem
                icon={<Ticket size={16} />}
                isActive={activeItem === "Events"}
                onClick={() => setActiveItem("Events")}
                label="Events"
              >
                Events
              </SidebarItem>
              <SidebarItem
                icon={<ShoppingBag size={16} />}
                isActive={activeItem === "Orders"}
                onClick={() => setActiveItem("Orders")}
                label="Orders"
              >
                Orders
              </SidebarItem>
              <SidebarItem
                icon={<Radio size={16} />}
                isActive={activeItem === "Broadcasts"}
                onClick={() => setActiveItem("Broadcasts")}
                label="Broadcasts"
              >
                Broadcasts
              </SidebarItem>
              <SidebarItem
                icon={<Settings size={16} />}
                isActive={activeItem === "Settings"}
                onClick={() => setActiveItem("Settings")}
                label="Settings"
              >
                Settings
              </SidebarItem>
            </SidebarNav>

            <SidebarNav title="Upcoming Events">
              <SidebarItem
                isActive={activeItem === "Bear Hug"}
                onClick={() => setActiveItem("Bear Hug")}
                label="Bear Hug"
              >
                Bear Hug: Live in Concert
              </SidebarItem>
              <SidebarItem
                isActive={activeItem === "Viking People"}
                onClick={() => setActiveItem("Viking People")}
                label="Viking People"
              >
                Viking People
              </SidebarItem>
              <SidebarItem
                isActive={activeItem === "Six Fingers"}
                onClick={() => setActiveItem("Six Fingers")}
                label="Six Fingers"
              >
                Six Fingers — DJ Set
              </SidebarItem>
            </SidebarNav>

            <div className="mt-auto pt-8">
              <SidebarNav>
                <SidebarItem
                  icon={<LifeBuoy size={16} />}
                  isActive={activeItem === "Support"}
                  onClick={() => setActiveItem("Support")}
                  label="Support"
                >
                  Support
                </SidebarItem>
                <SidebarItem
                  icon={<FileText size={16} />}
                  isActive={activeItem === "Changelog"}
                  onClick={() => setActiveItem("Changelog")}
                  label="Changelog"
                >
                  Changelog
                </SidebarItem>
              </SidebarNav>
            </div>
          </SidebarContent>

          <SidebarFooter>
            <div className="flex cursor-pointer items-center gap-3 overflow-hidden px-1 py-2 group-aria-[expanded=false]:justify-center">
              <div className="h-8 w-8 shrink-0 rounded-full border-2 border-white bg-indigo-500 dark:border-zinc-900" />
              <div className="flex flex-col truncate transition-all duration-300 group-aria-[expanded=false]:w-0 group-aria-[expanded=false]:opacity-0">
                <span className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  Jane Doe
                </span>
                <span className="truncate text-[10px] text-zinc-500">jane@example.com</span>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="ml-4 flex-1 overflow-y-auto rounded-xl border border-zinc-200/50 bg-white shadow-sm dark:border-zinc-800/50 dark:bg-zinc-950">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
