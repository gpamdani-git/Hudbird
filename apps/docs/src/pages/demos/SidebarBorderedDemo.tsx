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

export default function SidebarBorderedDemo() {
  const [activeItem, setActiveItem] = useState("Home");

  const renderContent = () => {
    switch (activeItem) {
      case "Home":
        return (
          <div className="p-8 md:p-12">
            <h1 className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white mb-6">Home</h1>
            <hr className="w-full border-t border-zinc-950/10 dark:border-white/10 mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="h-40 bg-zinc-100 dark:bg-zinc-900/80 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50"></div>
              <div className="h-40 bg-zinc-100 dark:bg-zinc-900/80 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50"></div>
              <div className="h-40 bg-zinc-100 dark:bg-zinc-900/80 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50"></div>
            </div>
            <div className="mt-6 h-64 bg-zinc-100 dark:bg-zinc-900/80 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50"></div>
          </div>
        );
      case "Inbox":
        return (
          <div className="p-8 md:p-12">
            <h1 className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white mb-6">Inbox</h1>
            <hr className="w-full border-t border-zinc-950/10 dark:border-white/10 mb-6" />
            <div className="space-y-4">
              <div className="h-20 bg-zinc-100 dark:bg-zinc-900/80 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50"></div>
              <div className="h-20 bg-zinc-100 dark:bg-zinc-900/80 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50"></div>
              <div className="h-20 bg-zinc-100 dark:bg-zinc-900/80 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50"></div>
            </div>
          </div>
        );
      case "Events":
        return (
          <div className="p-8 md:p-12">
            <h1 className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white mb-6">Events</h1>
            <hr className="w-full border-t border-zinc-950/10 dark:border-white/10 mb-6" />
            <div className="h-96 bg-zinc-100 dark:bg-zinc-900/80 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50"></div>
          </div>
        );
      default:
        return (
          <div className="p-8 md:p-12">
            <h1 className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white mb-6">{activeItem}</h1>
            <hr className="w-full border-t border-zinc-950/10 dark:border-white/10 mb-6" />
            <p className="text-zinc-500">This is a simulated page transition.</p>
          </div>
        );
    }
  };

  return (
    <div className="h-screen w-full flex bg-zinc-50 dark:bg-zinc-950 overflow-hidden relative">
      <Sidebar variant="bordered" radius="none" size="md">
        <SidebarHeader className="relative h-14">
          <div className="flex items-center gap-3 overflow-hidden transition-all duration-300 group-aria-[expanded=false]:w-0 group-aria-[expanded=false]:opacity-0">
            <div className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center shrink-0">
              <svg
                className="w-5 h-5 text-white dark:text-black"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-bold text-[15px] text-zinc-900 dark:text-zinc-50 truncate">
              Tailwind Labs
            </span>
          </div>
          <SidebarToggle className="absolute right-4 group-aria-[expanded=false]:right-1/2 group-aria-[expanded=false]:translate-x-1/2 transition-all duration-300 bg-white dark:bg-zinc-950 shadow-sm border border-zinc-200 dark:border-zinc-800" />
        </SidebarHeader>

        <SidebarContent>
          <div className="px-3 mb-4 space-y-1 pt-2">
            <SidebarItem icon={<Search size={18} />} label="Search">
              Search
            </SidebarItem>
            <SidebarItem
              icon={<Inbox size={18} />}
              isActive={activeItem === "Inbox"}
              onClick={() => setActiveItem("Inbox")}
              label="Inbox"
            >
              Inbox
            </SidebarItem>
          </div>

          <SidebarNav>
            <SidebarItem
              icon={<Home size={18} />}
              isActive={activeItem === "Home"}
              onClick={() => setActiveItem("Home")}
              label="Home"
            >
              Home
            </SidebarItem>
            <SidebarItem
              icon={<Ticket size={18} />}
              isActive={activeItem === "Events"}
              onClick={() => setActiveItem("Events")}
              label="Events"
            >
              Events
            </SidebarItem>
            <SidebarItem
              icon={<ShoppingBag size={18} />}
              isActive={activeItem === "Orders"}
              onClick={() => setActiveItem("Orders")}
              label="Orders"
            >
              Orders
            </SidebarItem>
            <SidebarItem
              icon={<Radio size={18} />}
              isActive={activeItem === "Broadcasts"}
              onClick={() => setActiveItem("Broadcasts")}
              label="Broadcasts"
            >
              Broadcasts
            </SidebarItem>
            <SidebarItem
              icon={<Settings size={18} />}
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
                icon={<LifeBuoy size={18} />}
                isActive={activeItem === "Support"}
                onClick={() => setActiveItem("Support")}
                label="Support"
              >
                Support
              </SidebarItem>
              <SidebarItem
                icon={<FileText size={18} />}
                isActive={activeItem === "Changelog"}
                onClick={() => setActiveItem("Changelog")}
                label="Changelog"
              >
                Changelog
              </SidebarItem>
            </SidebarNav>
          </div>
        </SidebarContent>

        <SidebarFooter className="border-t border-zinc-200 dark:border-zinc-800/50">
          <div className="flex items-center gap-3 px-1 overflow-hidden cursor-pointer group-aria-[expanded=false]:justify-center py-1">
            <div className="w-8 h-8 rounded-lg bg-zinc-200 dark:bg-zinc-800 shrink-0 border border-zinc-300 dark:border-zinc-700 overflow-hidden">
              <img
                src="https://i.pravatar.cc/150?img=47"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col truncate group-aria-[expanded=false]:w-0 group-aria-[expanded=false]:opacity-0 transition-all duration-300">
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate">
                Erica
              </span>
              <span className="text-xs text-zinc-500 truncate">
                erica@example.com
              </span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>

      <main className="flex-1 overflow-y-auto bg-white dark:bg-zinc-950">
        {renderContent()}
      </main>
    </div>
  );
}
