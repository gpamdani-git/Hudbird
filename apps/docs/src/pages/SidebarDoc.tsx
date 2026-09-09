import sidebarCode from "../../../../packages/core/src/components/Sidebar/Sidebar.tsx?raw";
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
  LayoutDashboard,
  Users,
  Settings,
  CreditCard,
  Bell,
  LogOut,
  ShieldAlert,
  Search,
  Inbox,
  Ticket,
  ShoppingBag,
  Radio,
  LifeBuoy,
  FileText,
  Menu,
  ChevronRight
} from "lucide-react";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";
import { InstallationTabs } from "../components/InstallationTabs";

export const sidebarTocItems = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "flat-variant", title: "Flat variant" },
    ],
  },
];

const sidebarApiProps: ApiPropRow[] = [
  {
    prop: "variant",
    defaultVal: '"flat"',
    description: 'Visual style variant of the sidebar. Can be "flat" or "bordered".',
  },
  {
    prop: "size",
    defaultVal: '"md"',
    description: 'Sizing scale for the sidebar items. Can be "sm", "md", or "lg".',
  },
  {
    prop: "radius",
    defaultVal: '"md"',
    description: 'Border radius for the sidebar items. Can be "none", "md", "lg", or "full".',
  },
  {
    prop: "defaultCollapsed",
    defaultVal: "false",
    description: "Initial collapsed state for uncontrolled mode.",
  },
  {
    prop: "isCollapsed",
    defaultVal: "undefined",
    description: "Controlled collapsed state. If provided, the component operates in controlled mode.",
  },
  {
    prop: "onCollapseChange",
    defaultVal: "-",
    description: "Callback fired when the collapse state changes.",
  },
];

const sidebarItemApiProps: ApiPropRow[] = [
  {
    prop: "isActive",
    defaultVal: "false",
    description: "Highlights the item as the currently active route.",
  },
  {
    prop: "isDisabled",
    defaultVal: "false",
    description: "Disables the item, preventing interactions and applying an opacity filter.",
  },
  {
    prop: "icon",
    defaultVal: "-",
    description: "Slot to render a Lucide icon or custom SVG at the start of the item.",
  },
  {
    prop: "badge",
    defaultVal: "-",
    description: "Slot to render a badge component at the end of the item.",
  },
  {
    prop: "label",
    defaultVal: "-",
    description: "Explicit label used for the floating tooltip when the sidebar is collapsed.",
  },
];

const codeBordered = `import { useState } from "react";
import {
  Sidebar, SidebarHeader, SidebarToggle, SidebarContent, SidebarNav, SidebarItem, SidebarFooter
} from "@hudbird/ui";
import { Home, Inbox, Search, Ticket, ShoppingBag, Radio, Settings, LifeBuoy, FileText } from "lucide-react";

export default function ApplicationLayout() {
  const [activeItem, setActiveItem] = useState("Home");

  const renderContent = () => {
    switch(activeItem) {
      case "Home": return <div className="p-8"><h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Home Dashboard</h2><div className="grid grid-cols-1 md:grid-cols-3 gap-6"><div className="h-32 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-800"></div><div className="h-32 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-800"></div><div className="h-32 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-800"></div></div></div>;
      case "Inbox": return <div className="p-8"><h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Inbox</h2><div className="space-y-4"><div className="h-16 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-800"></div><div className="h-16 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-800"></div></div></div>;
      case "Events": return <div className="p-8"><h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Events</h2><div className="h-64 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-800"></div></div>;
      default: return <div className="p-8"><h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">{activeItem}</h2></div>;
    }
  };

  return (
    <div className="h-[700px] w-full flex bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden relative">
      <Sidebar variant="bordered" radius="md" size="md">
        <SidebarHeader className="relative h-14">
          <div className="flex items-center gap-3 overflow-hidden transition-all duration-300 group-aria-[expanded=false]:w-0 group-aria-[expanded=false]:opacity-0">
            <div className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-white dark:text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <span className="font-bold text-[15px] text-zinc-900 dark:text-zinc-50 truncate">
              Acme Studio
            </span>
          </div>
          <SidebarToggle className="absolute right-4 group-aria-[expanded=false]:right-1/2 group-aria-[expanded=false]:translate-x-1/2 transition-all duration-300 bg-white dark:bg-zinc-950 shadow-sm border border-zinc-200 dark:border-zinc-800" />
        </SidebarHeader>

        <SidebarContent>
          <div className="px-3 mb-4 space-y-1 pt-2">
            <SidebarItem icon={<Search size={18} />} label="Search">Search</SidebarItem>
            <SidebarItem icon={<Inbox size={18} />} isActive={activeItem === "Inbox"} onClick={() => setActiveItem("Inbox")} label="Inbox">Inbox</SidebarItem>
          </div>
          
          <SidebarNav>
            <SidebarItem icon={<Home size={18} />} isActive={activeItem === "Home"} onClick={() => setActiveItem("Home")} label="Home">Home</SidebarItem>
            <SidebarItem icon={<Ticket size={18} />} isActive={activeItem === "Events"} onClick={() => setActiveItem("Events")} label="Events">Events</SidebarItem>
            <SidebarItem icon={<ShoppingBag size={18} />} isActive={activeItem === "Orders"} onClick={() => setActiveItem("Orders")} label="Orders">Orders</SidebarItem>
            <SidebarItem icon={<Radio size={18} />} isActive={activeItem === "Broadcasts"} onClick={() => setActiveItem("Broadcasts")} label="Broadcasts">Broadcasts</SidebarItem>
            <SidebarItem icon={<Settings size={18} />} isActive={activeItem === "Settings"} onClick={() => setActiveItem("Settings")} label="Settings">Settings</SidebarItem>
          </SidebarNav>

          <SidebarNav title="Upcoming Events">
            <SidebarItem isActive={activeItem === "Bear Hug"} onClick={() => setActiveItem("Bear Hug")} label="Bear Hug">Bear Hug: Live in Concert</SidebarItem>
            <SidebarItem isActive={activeItem === "Viking People"} onClick={() => setActiveItem("Viking People")} label="Viking People">Viking People</SidebarItem>
            <SidebarItem isActive={activeItem === "Six Fingers"} onClick={() => setActiveItem("Six Fingers")} label="Six Fingers">Six Fingers — DJ Set</SidebarItem>
          </SidebarNav>

          <div className="mt-auto pt-8">
             <SidebarNav>
              <SidebarItem icon={<LifeBuoy size={18} />} isActive={activeItem === "Support"} onClick={() => setActiveItem("Support")} label="Support">Support</SidebarItem>
              <SidebarItem icon={<FileText size={18} />} isActive={activeItem === "Changelog"} onClick={() => setActiveItem("Changelog")} label="Changelog">Changelog</SidebarItem>
            </SidebarNav>
          </div>
        </SidebarContent>

        <SidebarFooter className="border-t border-zinc-200 dark:border-zinc-800/50">
          <div className="flex items-center gap-3 px-1 overflow-hidden cursor-pointer group-aria-[expanded=false]:justify-center py-1">
            <div className="w-8 h-8 rounded-lg bg-zinc-200 dark:bg-zinc-800 shrink-0 border border-zinc-300 dark:border-zinc-700 overflow-hidden">
               <img src="https://i.pravatar.cc/150?img=47" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col truncate group-aria-[expanded=false]:w-0 group-aria-[expanded=false]:opacity-0 transition-all duration-300">
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate">Erica</span>
              <span className="text-xs text-zinc-500 truncate">erica@example.com</span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>

      <main className="flex-1 overflow-y-auto bg-white dark:bg-zinc-950">
        {renderContent()}
      </main>
    </div>
  );
}`;

const codeFlat = `import { useState } from "react";
import {
  Sidebar, SidebarHeader, SidebarToggle, SidebarContent, SidebarNav, SidebarItem, SidebarFooter
} from "@hudbird/ui";
import { Search, Home, Users, Settings } from "lucide-react";

export default function FlatSidebar() {
  const [activeItem, setActiveItem] = useState("Home");

  return (
    <div className="h-[480px] w-full flex bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-xl overflow-hidden relative shadow-xl">
      <Sidebar variant="flat" size="sm" radius="full">
        <SidebarHeader>
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="font-bold text-sm text-zinc-900 tracking-wider">WORKSPACE</span>
          </div>
          <SidebarToggle />
        </SidebarHeader>

        <SidebarContent>
          <div className="px-3 mb-2">
            <div className="flex items-center gap-2 px-2.5 py-1.5 bg-zinc-200/50 rounded-full text-zinc-500">
              <Search size={14} />
              <span className="text-xs">Search...</span>
            </div>
          </div>
          <SidebarNav>
            <SidebarItem icon={<Home size={16} />} isActive={activeItem === "Home"} onClick={() => setActiveItem("Home")} label="Home">Home</SidebarItem>
            <SidebarItem icon={<Users size={16} />} isActive={activeItem === "Contacts"} onClick={() => setActiveItem("Contacts")} label="Contacts">Contacts</SidebarItem>
            <SidebarItem icon={<Settings size={16} />} isActive={activeItem === "Settings"} onClick={() => setActiveItem("Settings")} label="Settings">Settings</SidebarItem>
          </SidebarNav>
        </SidebarContent>

        <SidebarFooter>
          <div className="flex items-center gap-3 px-1 overflow-hidden cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-indigo-500 shrink-0 border-2 border-white" />
            <div className="flex flex-col truncate">
              <span className="text-sm font-semibold text-zinc-900 truncate">Jane Doe</span>
              <span className="text-[10px] text-zinc-500 truncate">jane@example.com</span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <main className="flex-1 bg-white p-6 border-l"></main>
    </div>
  );
}`;

export default function SidebarDoc({ onOpenSidebar }: { onOpenSidebar?: () => void }) {
  const [activeItem1, setActiveItem1] = useState("Home");
  const [activeItem2, setActiveItem2] = useState("Home");

  const renderContent = () => {
    switch(activeItem1) {
      case "Home": return <div className="p-8 md:p-12"><h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Home</h2><div className="grid grid-cols-1 md:grid-cols-3 gap-6"><div className="h-40 bg-zinc-100 dark:bg-zinc-900/80 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50"></div><div className="h-40 bg-zinc-100 dark:bg-zinc-900/80 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50"></div><div className="h-40 bg-zinc-100 dark:bg-zinc-900/80 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50"></div></div><div className="mt-6 h-64 bg-zinc-100 dark:bg-zinc-900/80 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50"></div></div>;
      case "Inbox": return <div className="p-8 md:p-12"><h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Inbox</h2><div className="space-y-4"><div className="h-20 bg-zinc-100 dark:bg-zinc-900/80 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50"></div><div className="h-20 bg-zinc-100 dark:bg-zinc-900/80 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50"></div><div className="h-20 bg-zinc-100 dark:bg-zinc-900/80 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50"></div></div></div>;
      case "Events": return <div className="p-8 md:p-12"><h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Events</h2><div className="h-96 bg-zinc-100 dark:bg-zinc-900/80 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50"></div></div>;
      default: return <div className="p-8 md:p-12"><h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">{activeItem1}</h2><p className="text-zinc-500">This is a simulated page transition.</p></div>;
    }
  };

  return (
    <div className="pb-24 w-full flex flex-col items-center">
      <div className="sticky top-14 z-30 w-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md py-4 px-4 sm:px-6 lg:px-8 transition-all border-b border-zinc-200/50 dark:border-zinc-800/50 mb-8">
        <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
          {onOpenSidebar && (
            <button 
              onClick={onOpenSidebar}
              className="p-1.5 -ml-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors"
              aria-label="Open Navigation"
            >
              <Menu size={18} />
            </button>
          )}
          <span>Layouts section</span>
          <ChevronRight size={14} className="text-zinc-400" />
          <span className="text-zinc-900 dark:text-zinc-100">Sidebar Layout</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12 space-y-16">
      {/* Title & Subtitle */}
      <div className="-mt-8">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Sidebar Layout
          </h1>
          <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full border border-emerald-500/20">
            Updated
          </span>
        </div>
        <p className="text-base text-zinc-600 dark:text-zinc-400">
          A production-ready application layout simulating page transitions. Inspired by Catalyst UI.
        </p>
      </div>

      

      {/* Main Preview & Code */}
      <section className="space-y-4">
        <ComponentPreview demoUrl="/demos/sidebar">
          <div className="w-full flex items-center justify-center py-8 px-4 sm:px-8">
            <div className="h-[700px] w-full max-w-5xl bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden flex relative">
              <Sidebar variant="bordered" radius="md" size="md">
                <SidebarHeader className="relative h-14">
                  <div className="flex items-center gap-3 overflow-hidden transition-all duration-300 group-aria-[expanded=false]:w-0 group-aria-[expanded=false]:opacity-0">
                    <div className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-white dark:text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                    </div>
                    <span className="font-bold text-[15px] text-zinc-900 dark:text-zinc-50 truncate">
                      Acme Studio
                    </span>
                  </div>
                  <SidebarToggle className="absolute right-4 group-aria-[expanded=false]:right-1/2 group-aria-[expanded=false]:translate-x-1/2 transition-all duration-300 bg-white dark:bg-zinc-950 shadow-sm border border-zinc-200 dark:border-zinc-800" />
                </SidebarHeader>

                <SidebarContent>
                  <div className="px-3 mb-4 space-y-1 pt-2">
                    <SidebarItem icon={<Search size={18} />} label="Search">Search</SidebarItem>
                    <SidebarItem
                      icon={<Inbox size={18} />}
                      isActive={activeItem1 === "Inbox"}
                      onClick={() => setActiveItem1("Inbox")}
                      label="Inbox"
                    >
                      Inbox
                    </SidebarItem>
                  </div>
                  
                  <SidebarNav>
                    <SidebarItem
                      icon={<Home size={18} />}
                      isActive={activeItem1 === "Home"}
                      onClick={() => setActiveItem1("Home")}
                      label="Home"
                    >
                      Home
                    </SidebarItem>
                    <SidebarItem
                      icon={<Ticket size={18} />}
                      isActive={activeItem1 === "Events"}
                      onClick={() => setActiveItem1("Events")}
                      label="Events"
                    >
                      Events
                    </SidebarItem>
                    <SidebarItem
                      icon={<ShoppingBag size={18} />}
                      isActive={activeItem1 === "Orders"}
                      onClick={() => setActiveItem1("Orders")}
                      label="Orders"
                    >
                      Orders
                    </SidebarItem>
                    <SidebarItem
                      icon={<Radio size={18} />}
                      isActive={activeItem1 === "Broadcasts"}
                      onClick={() => setActiveItem1("Broadcasts")}
                      label="Broadcasts"
                    >
                      Broadcasts
                    </SidebarItem>
                    <SidebarItem
                      icon={<Settings size={18} />}
                      isActive={activeItem1 === "Settings"}
                      onClick={() => setActiveItem1("Settings")}
                      label="Settings"
                    >
                      Settings
                    </SidebarItem>
                  </SidebarNav>

                  <SidebarNav title="Upcoming Events">
                    <SidebarItem
                      isActive={activeItem1 === "Bear Hug"}
                      onClick={() => setActiveItem1("Bear Hug")}
                      label="Bear Hug"
                    >
                      Bear Hug: Live in Concert
                    </SidebarItem>
                    <SidebarItem
                      isActive={activeItem1 === "Viking People"}
                      onClick={() => setActiveItem1("Viking People")}
                      label="Viking People"
                    >
                      Viking People
                    </SidebarItem>
                    <SidebarItem
                      isActive={activeItem1 === "Six Fingers"}
                      onClick={() => setActiveItem1("Six Fingers")}
                      label="Six Fingers"
                    >
                      Six Fingers — DJ Set
                    </SidebarItem>
                  </SidebarNav>

                  <div className="mt-auto pt-8">
                     <SidebarNav>
                      <SidebarItem
                        icon={<LifeBuoy size={18} />}
                        isActive={activeItem1 === "Support"}
                        onClick={() => setActiveItem1("Support")}
                        label="Support"
                      >
                        Support
                      </SidebarItem>
                      <SidebarItem
                        icon={<FileText size={18} />}
                        isActive={activeItem1 === "Changelog"}
                        onClick={() => setActiveItem1("Changelog")}
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
                       <img src="https://i.pravatar.cc/150?img=47" alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col truncate group-aria-[expanded=false]:w-0 group-aria-[expanded=false]:opacity-0 transition-all duration-300">
                      <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate">Erica</span>
                      <span className="text-xs text-zinc-500 truncate">erica@example.com</span>
                    </div>
                  </div>
                </SidebarFooter>
              </Sidebar>

              <main className="flex-1 overflow-y-auto bg-white dark:bg-zinc-950">
                {renderContent()}
              </main>
            </div>
          </div>
        </ComponentPreview>
        <CodeBlock code={codeBordered} />
      </section>

      <div id="installation" className="scroll-mt-24">
        <InstallationTabs componentName="sidebar" manualCode={sidebarCode} />
      </div>

      {/* Component API */}
      <section id="component-api" className="scroll-mt-24 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Component API
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Props for the <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">{"<Sidebar />"}</code> and <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">{"<SidebarItem />"}</code> components.
        </p>
        
        <div className="mt-6 mb-8">
          <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-4">&lt;Sidebar /&gt;</h4>
          <ApiTable rows={sidebarApiProps} />
        </div>

        <div className="mt-6">
          <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-4">&lt;SidebarItem /&gt;</h4>
          <ApiTable rows={sidebarItemApiProps} />
        </div>
      </section>

      {/* Examples */}
      <section id="examples" className="scroll-mt-24 space-y-10 pt-4">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
          Examples
        </h2>

        <div id="flat-variant" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Flat variant
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Using <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">variant="flat"</code> and <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">size="sm"</code> to create a smaller, softer sidebar without an outer border. Perfect for inner layouts or modals.
          </p>

          <ComponentPreview demoUrl="/demos/sidebar-flat">
          <div className="w-full flex items-center justify-center p-4 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-950 rounded-2xl">
              <div className="h-[480px] w-full max-w-3xl rounded-xl overflow-hidden flex relative shadow-xl border border-zinc-200/50 dark:border-zinc-800/50">
                <Sidebar variant="flat" size="sm" radius="full">
                  <SidebarHeader className="relative h-14">
                    <div className="flex items-center gap-2 overflow-hidden transition-all duration-300 group-aria-[expanded=false]:w-0 group-aria-[expanded=false]:opacity-0">
                      <span className="font-bold text-sm text-zinc-900 dark:text-zinc-50 tracking-wider">
                        WORKSPACE
                      </span>
                    </div>
                    <SidebarToggle className="absolute right-4 group-aria-[expanded=false]:right-1/2 group-aria-[expanded=false]:translate-x-1/2 transition-all duration-300 bg-white/50 dark:bg-zinc-800/50 shadow-sm" />
                  </SidebarHeader>

                  <SidebarContent>
                    <div className="px-3 mb-2 pt-2">
                      <div className="flex items-center gap-2 px-2.5 py-1.5 bg-zinc-200/50 dark:bg-zinc-800/50 rounded-full text-zinc-500 group-aria-[expanded=false]:justify-center transition-all">
                        <Search size={14} className="shrink-0" />
                        <span className="text-xs group-aria-[expanded=false]:w-0 group-aria-[expanded=false]:opacity-0 overflow-hidden transition-all whitespace-nowrap">Search...</span>
                      </div>
                    </div>
                    <SidebarNav>
                      <SidebarItem
                        icon={<Home size={16} />}
                        isActive={activeItem2 === "Home"}
                        onClick={() => setActiveItem2("Home")}
                        label="Home"
                      >
                        Home
                      </SidebarItem>
                      <SidebarItem
                        icon={<Users size={16} />}
                        isActive={activeItem2 === "Contacts"}
                        onClick={() => setActiveItem2("Contacts")}
                        label="Contacts"
                      >
                        Contacts
                      </SidebarItem>
                      <SidebarItem
                        icon={<Settings size={16} />}
                        isActive={activeItem2 === "Settings"}
                        onClick={() => setActiveItem2("Settings")}
                        label="Settings"
                      >
                        Settings
                      </SidebarItem>
                    </SidebarNav>
                  </SidebarContent>

                  <SidebarFooter>
                    <div className="flex items-center gap-3 px-1 overflow-hidden cursor-pointer group-aria-[expanded=false]:justify-center">
                      <div className="w-8 h-8 rounded-full bg-indigo-500 shrink-0 border-2 border-white dark:border-zinc-900" />
                      <div className="flex flex-col truncate group-aria-[expanded=false]:w-0 group-aria-[expanded=false]:opacity-0 transition-all duration-300">
                        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate">Jane Doe</span>
                        <span className="text-[10px] text-zinc-500 truncate">jane@example.com</span>
                      </div>
                    </div>
                  </SidebarFooter>
                </Sidebar>

                <div className="flex-1 bg-white dark:bg-zinc-950 p-6 flex flex-col items-center justify-center border-l border-zinc-200/50 dark:border-zinc-800/50">
                  <div className="animate-pulse flex flex-col items-center gap-4 w-full max-w-sm">
                    <div className="w-3/4 h-6 bg-zinc-200 dark:bg-zinc-800 rounded-md"></div>
                    <div className="w-full h-24 bg-zinc-200 dark:bg-zinc-800 rounded-md"></div>
                    <div className="w-5/6 h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md"></div>
                  </div>
                </div>
              </div>
            </div>
          </ComponentPreview>
          <CodeBlock code={codeFlat} />
        </div>
      </section>
      </div>
    </div>
  );
}
