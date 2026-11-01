import sidebarCode from "../../../../packages/core/src/components/Sidebar/Sidebar.tsx?raw";
import React, { useState } from "react";
import { DocHeader } from "../components/DocHeader";
import {
  Sidebar,
  SidebarHeader,
  SidebarBrand,
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
  ChevronRight,
  Bot,
  Sparkles,
  SlidersHorizontal,
  Compass,
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
      { id: "standard-left", title: "Standard Left Sidebar" },
      { id: "flat-variant", title: "Flat variant" },
      { id: "right-sidebar", title: "Right Inspector / AI Panel" },
      { id: "bottom-dock", title: "macOS Floating Bottom Dock" },
      { id: "floating-variant", title: "Inset Floating Rounded Sidebar" },
    ],
  },
];

const sidebarApiProps: ApiPropRow[] = [
  {
    prop: "position",
    defaultVal: '"left"',
    description:
      'Placement direction of the sidebar: "left" (standard navigation), "right" (inspector/assistant panel), or "bottom" (macOS-style floating dock).',
  },
  {
    prop: "variant",
    defaultVal: '"flat"',
    description:
      'Visual style variant: "flat", "bordered", "floating" (inset rounded card with shadow), or "dock" (macOS pill dock with backdrop blur).',
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
    description:
      "Controlled collapsed state. If provided, the component operates in controlled mode.",
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
import { Sidebar, SidebarHeader, SidebarToggle, SidebarContent, SidebarNav, SidebarItem, SidebarFooter } from "@/components/hudbird-ui/Sidebar";
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
              Bird Studio
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
import { Sidebar, SidebarHeader, SidebarToggle, SidebarContent, SidebarNav, SidebarItem, SidebarFooter } from "@/components/hudbird-ui/Sidebar";
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
            <div className="flex h-8 items-center gap-2 px-3.5 bg-zinc-200/50 rounded-full text-zinc-500">
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
    switch (activeItem1) {
      case "Home":
        return (
          <div className="p-8 md:p-12">
            <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white">Home</h2>
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
            <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white">Inbox</h2>
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
            <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white">Events</h2>
            <div className="h-96 rounded-xl border border-zinc-200/50 bg-zinc-100 dark:border-zinc-800/50 dark:bg-zinc-900/80"></div>
          </div>
        );
      default:
        return (
          <div className="p-8 md:p-12">
            <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white">{activeItem1}</h2>
            <p className="text-zinc-500">This is a simulated page transition.</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-24 pb-24 sm:space-y-32">
      {/* Title & Subtitle */}
      <DocHeader
        category="Components"
        title="Sidebar"
        badge="Core"
        description="A flexible, collapsible sidebar component with nested navigation items, active route indicators, and smooth transition states."
      />

      {/* Main Preview & Code */}
      <section className="space-y-4">
        <ComponentPreview demoUrl="/demos/sidebar">
          <div className="flex w-full items-center justify-center px-4 py-8 sm:px-8">
            <div className="relative flex h-[700px] w-full max-w-5xl overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
              <Sidebar variant="bordered" radius="md" size="md">
                <SidebarHeader className="relative h-14">
                  <div className="flex items-center gap-3 overflow-hidden transition-all duration-300 group-aria-[expanded=false]:w-0 group-aria-[expanded=false]:opacity-0">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black dark:bg-white">
                      <svg
                        className="h-5 w-5 text-white dark:text-black"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <span className="truncate text-[15px] font-bold text-zinc-900 dark:text-zinc-50">
                      Bird Studio
                    </span>
                  </div>
                  <SidebarToggle className="absolute right-4 border border-zinc-200 bg-white shadow-sm transition-all duration-300 group-aria-[expanded=false]:right-1/2 group-aria-[expanded=false]:translate-x-1/2 dark:border-zinc-800 dark:bg-zinc-950" />
                </SidebarHeader>

                <SidebarContent>
                  <div className="mb-4 space-y-1 px-3 pt-2">
                    <SidebarItem icon={<Search size={18} />} label="Search">
                      Search
                    </SidebarItem>
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
                  <div className="flex cursor-pointer items-center gap-3 overflow-hidden px-1 py-1 group-aria-[expanded=false]:justify-center">
                    <div className="h-8 w-8 shrink-0 overflow-hidden rounded-lg border border-zinc-300 bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800">
                      <img
                        src="https://i.pravatar.cc/150?img=47"
                        alt="Avatar"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col truncate transition-all duration-300 group-aria-[expanded=false]:w-0 group-aria-[expanded=false]:opacity-0">
                      <span className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                        Erica
                      </span>
                      <span className="truncate text-xs text-zinc-500">erica@example.com</span>
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
      <section id="component-api" className="scroll-mt-24 space-y-6">
        <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
          Component API
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Props for the{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">
            {"<Sidebar />"}
          </code>{" "}
          and{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">
            {"<SidebarItem />"}
          </code>{" "}
          components.
        </p>

        <div className="mt-6 mb-8">
          <h3 className="font-outfit mb-4 text-lg font-medium text-zinc-900 dark:text-white">
            &lt;Sidebar /&gt;
          </h3>
          <ApiTable rows={sidebarApiProps} />
        </div>

        <div className="mt-6">
          <h3 className="font-outfit mb-4 text-lg font-medium text-zinc-900 dark:text-white">
            &lt;SidebarItem /&gt;
          </h3>
          <ApiTable rows={sidebarItemApiProps} />
        </div>
      </section>

      {/* Examples */}
      <section id="examples" className="scroll-mt-24 space-y-20 pt-4 sm:space-y-24">
        <h2 className="font-outfit mb-2 text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
          Examples
        </h2>

        <div id="flat-variant" className="scroll-mt-24 space-y-4">
          <h3 className="font-outfit text-xl font-medium tracking-tight text-zinc-900 dark:text-white">
            Flat Variant
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Using{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">
              variant="flat"
            </code>{" "}
            and{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">
              size="sm"
            </code>{" "}
            to create a smaller, softer sidebar without an outer border. Perfect for inner layouts
            or modals.
          </p>

          <ComponentPreview demoUrl="/demos/sidebar-flat">
            <div className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-br from-zinc-100 to-zinc-200 p-4 dark:from-zinc-900 dark:to-zinc-950">
              <div className="relative flex h-[480px] w-full max-w-3xl overflow-hidden rounded-xl border border-zinc-200/50 shadow-xl dark:border-zinc-800/50">
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
                      <div className="flex h-8 items-center gap-2 rounded-full bg-zinc-200/50 px-3.5 text-zinc-500 transition-all group-aria-[expanded=false]:justify-center dark:bg-zinc-800/50">
                        <Search size={14} className="shrink-0" />
                        <span className="overflow-hidden text-xs whitespace-nowrap transition-all group-aria-[expanded=false]:w-0 group-aria-[expanded=false]:opacity-0">
                          Search...
                        </span>
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
                    <div className="flex cursor-pointer items-center gap-3 overflow-hidden px-1 group-aria-[expanded=false]:justify-center">
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

                <div className="flex flex-1 flex-col items-center justify-center border-l border-zinc-200/50 bg-white p-6 dark:border-zinc-800/50 dark:bg-zinc-950">
                  <div className="flex w-full max-w-sm animate-pulse flex-col items-center gap-4">
                    <div className="h-6 w-3/4 rounded-md bg-zinc-200 dark:bg-zinc-800"></div>
                    <div className="h-24 w-full rounded-md bg-zinc-200 dark:bg-zinc-800"></div>
                    <div className="h-4 w-5/6 rounded-md bg-zinc-200 dark:bg-zinc-800"></div>
                  </div>
                </div>
              </div>
            </div>
          </ComponentPreview>
          <CodeBlock code={codeFlat} />
        </div>

        {/* 3. Right Inspector / AI Assistant Sidebar */}
        <div id="right-sidebar" className="scroll-mt-24 space-y-4">
          <h3 className="font-outfit text-xl font-medium tracking-tight text-zinc-900 dark:text-white">
            Right Inspector & AI Assistant Panel
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Configure{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-zinc-800">
              position="right"
            </code>{" "}
            for canvas properties, context drawers, or AI copilot panels:
          </p>

          <ComponentPreview>
            <div className="relative flex h-[420px] w-full max-w-3xl overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-50 dark:border-white/[0.08] dark:bg-[#161618]">
              <main className="flex-1 p-6">
                <h4 className="font-semibold text-zinc-900 dark:text-white">Canvas Editor</h4>
                <p className="mt-1 text-xs text-zinc-500">
                  Select an element to view inspector tools on the right panel.
                </p>
              </main>

              <Sidebar position="right" variant="bordered" size="sm">
                <SidebarHeader>
                  <SidebarBrand
                    icon={<Bot size={16} className="text-primary" />}
                    title="Inspector"
                  />
                  <SidebarToggle />
                </SidebarHeader>

                <SidebarContent>
                  <SidebarNav title="Copilot">
                    <SidebarItem icon={<Bot size={16} />} isActive label="AI Assistant">
                      AI Assistant
                    </SidebarItem>
                    <SidebarItem icon={<Sparkles size={16} />} label="Auto Prompt">
                      Auto Prompt
                    </SidebarItem>
                  </SidebarNav>

                  <SidebarNav title="Parameters">
                    <SidebarItem icon={<SlidersHorizontal size={16} />} label="Styling">
                      Styling
                    </SidebarItem>
                    <SidebarItem icon={<Settings size={16} />} label="Configs">
                      Configs
                    </SidebarItem>
                  </SidebarNav>
                </SidebarContent>
              </Sidebar>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Sidebar, SidebarHeader, SidebarContent, SidebarNav, SidebarItem, SidebarToggle } from "@hudbird/ui";
import { Bot, Sparkles, SlidersHorizontal, Settings } from "lucide-react";

export function RightInspector() {
  return (
    <div className="flex h-screen">
      <main className="flex-1 p-6">Main Content</main>
      
      {/* Right-Hand Sidebar */}
      <Sidebar position="right" variant="bordered" size="sm">
        <SidebarHeader>
          <SidebarBrand icon={<Bot size={16} className="text-primary" />} title="Inspector" />
          <SidebarToggle />
        </SidebarHeader>

        <SidebarContent>
          <SidebarNav title="Copilot">
            <SidebarItem icon={<Bot size={16} />} isActive label="AI Assistant">AI Assistant</SidebarItem>
            <SidebarItem icon={<Sparkles size={16} />} label="Auto Prompt">Auto Prompt</SidebarItem>
          </SidebarNav>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}`}
          />
        </div>

        {/* 4. macOS Floating Bottom Dock */}
        <div id="bottom-dock" className="scroll-mt-24 space-y-4">
          <h3 className="font-outfit text-xl font-medium tracking-tight text-zinc-900 dark:text-white">
            macOS Floating Bottom Dock
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Use{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-zinc-800">
              position="bottom" variant="dock"
            </code>{" "}
            to render an Apple macOS-inspired floating action dock with micro-tooltips:
          </p>

          <ComponentPreview>
            <div className="relative flex h-[340px] w-full max-w-2xl flex-col items-center justify-end rounded-2xl border border-zinc-200/80 bg-gradient-to-t from-zinc-200/60 via-zinc-100 to-white p-6 dark:border-white/[0.08] dark:from-[#121214] dark:via-[#161618] dark:to-[#1a1a1c]">
              <div className="absolute top-6 text-center">
                <span className="bg-brand-500/10 text-brand-600 dark:text-brand-300 rounded-full px-3 py-1 text-xs font-medium">
                  macOS Style Navigation
                </span>
                <p className="mt-2 text-xs text-zinc-500">
                  Hover over any dock item to reveal optical top tooltips
                </p>
              </div>

              {/* Bottom Dock */}
              <Sidebar position="bottom" variant="dock">
                <SidebarContent>
                  <SidebarNav>
                    <SidebarItem icon={<Home size={18} />} isActive label="Home" />
                    <SidebarItem icon={<Compass size={18} />} label="Explore" />
                    <SidebarItem icon={<Inbox size={18} />} label="Messages" />
                    <SidebarItem icon={<Sparkles size={18} />} label="AI Studio" />
                    <SidebarItem icon={<Settings size={18} />} label="Preferences" />
                  </SidebarNav>
                </SidebarContent>
              </Sidebar>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Sidebar, SidebarContent, SidebarNav, SidebarItem } from "@hudbird/ui";
import { Home, Compass, Inbox, Sparkles, Settings } from "lucide-react";

export function FloatingDock() {
  return (
    <Sidebar position="bottom" variant="dock">
      <SidebarContent>
        <SidebarNav>
          <SidebarItem icon={<Home size={18} />} isActive label="Home" />
          <SidebarItem icon={<Compass size={18} />} label="Explore" />
          <SidebarItem icon={<Inbox size={18} />} label="Messages" />
          <SidebarItem icon={<Sparkles size={18} />} label="AI Studio" />
          <SidebarItem icon={<Settings size={18} />} label="Preferences" />
        </SidebarNav>
      </SidebarContent>
    </Sidebar>
  );
}`}
          />
        </div>

        {/* 5. Inset Floating Rounded Sidebar */}
        <div id="floating-variant" className="scroll-mt-24 space-y-4">
          <h3 className="font-outfit text-xl font-medium tracking-tight text-zinc-900 dark:text-white">
            Inset Floating Rounded Sidebar
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Use{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-zinc-800">
              variant="floating"
            </code>{" "}
            to decouple the sidebar from screen edges into a rounded floating card:
          </p>

          <ComponentPreview>
            <div className="relative flex h-[400px] w-full max-w-3xl overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-100 dark:border-white/[0.08] dark:bg-[#121214]">
              <Sidebar variant="floating" size="sm">
                <SidebarHeader>
                  <SidebarBrand
                    icon={<Sparkles size={16} className="text-brand-500" />}
                    title="Space X"
                  />
                  <SidebarToggle />
                </SidebarHeader>

                <SidebarContent>
                  <SidebarNav>
                    <SidebarItem icon={<Home size={16} />} isActive label="Overview">
                      Overview
                    </SidebarItem>
                    <SidebarItem icon={<Radio size={16} />} label="Telemetry">
                      Telemetry
                    </SidebarItem>
                    <SidebarItem icon={<Settings size={16} />} label="Engines">
                      Engines
                    </SidebarItem>
                  </SidebarNav>
                </SidebarContent>
              </Sidebar>

              <main className="flex-1 p-6">
                <h4 className="font-semibold text-zinc-900 dark:text-white">
                  Telemetry Mission Control
                </h4>
                <p className="mt-1 text-xs text-zinc-500">
                  Floating sidebar detached from viewport with smooth rounded corners.
                </p>
              </main>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Sidebar, SidebarHeader, SidebarContent, SidebarNav, SidebarItem, SidebarToggle } from "@hudbird/ui";
import { Home, Radio, Settings } from "lucide-react";

export function FloatingSidebarDemo() {
  return (
    <div className="flex h-screen bg-zinc-100 dark:bg-zinc-950">
      <Sidebar variant="floating" size="sm">
        <SidebarHeader>
          <SidebarBrand icon={<Sparkles size={16} className="text-brand-500" />} title="Space X" />
          <SidebarToggle />
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav>
            <SidebarItem icon={<Home size={16} />} isActive label="Overview">Overview</SidebarItem>
            <SidebarItem icon={<Radio size={16} />} label="Telemetry">Telemetry</SidebarItem>
            <SidebarItem icon={<Settings size={16} />} label="Engines">Engines</SidebarItem>
          </SidebarNav>
        </SidebarContent>
      </Sidebar>
      <main className="flex-1 p-6">Content</main>
    </div>
  );
}`}
          />
        </div>
      </section>
    </div>
  );
}
