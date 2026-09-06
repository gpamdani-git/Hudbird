import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { TableOfContents } from "./components/TableOfContents";
import ButtonDoc, { buttonTocItems } from "./pages/ButtonDoc";
import AlertDoc, { alertTocItems } from "./pages/AlertDoc";
import AvatarDoc, { avatarTocItems } from "./pages/AvatarDoc";
import BadgeDoc, { badgeTocItems } from "./pages/BadgeDoc";
import CheckboxDoc, { checkboxTocItems } from "./pages/CheckboxDoc";
import ComboBoxDoc, { comboBoxTocItems } from "./pages/ComboBoxDoc";
import DescriptionListDoc, { descriptionListTocItems } from "./pages/DescriptionListDoc";
import DialogDoc, { dialogTocItems } from "./pages/DialogDoc";
import DividerDoc, { dividerTocItems } from "./pages/DividerDoc";
import DropdownDoc, { dropdownTocItems } from "./pages/DropdownDoc";
import InputDoc from "./pages/InputDoc";
import CardDoc from "./pages/CardDoc";

// Generic Showcase Page for items in the sidebar
const GenericComponentPage = ({
  title,
  description,
  tag,
}: {
  title: string;
  description: string;
  tag?: string;
}) => (
  <div className="space-y-8 pb-20">
    <div>
      <div className="flex items-center gap-3 mb-2">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          {title}
        </h1>
        {tag && (
          <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full border border-emerald-500/20">
            {tag}
          </span>
        )}
      </div>
      <p className="text-base text-zinc-600 dark:text-zinc-400">{description}</p>
    </div>

    <div className="rounded-xl border border-dashed border-zinc-300 dark:border-zinc-800 p-12 text-center bg-zinc-50/50 dark:bg-zinc-900/20">
      <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
        Component documentation and interactive playground for <span className="font-semibold text-zinc-900 dark:text-zinc-100">{title}</span>.
      </p>
    </div>
  </div>
);

export default function App() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();

  // Determine current TOC items based on active route
  const getTocItems = () => {
    if (location.pathname === "/button" || location.pathname === "/") {
      return buttonTocItems;
    }
    if (location.pathname === "/alert") {
      return alertTocItems;
    }
    if (location.pathname === "/avatar") {
      return avatarTocItems;
    }
    if (location.pathname === "/badge") {
      return badgeTocItems;
    }
    if (location.pathname === "/checkbox") {
      return checkboxTocItems;
    }
    if (location.pathname === "/combobox") {
      return comboBoxTocItems;
    }
    if (location.pathname === "/description-list") {
      return descriptionListTocItems;
    }
    if (location.pathname === "/dialog") {
      return dialogTocItems;
    }
    if (location.pathname === "/divider") {
      return dividerTocItems;
    }
    if (location.pathname === "/dropdown") {
      return dropdownTocItems;
    }
    if (location.pathname === "/input") {
      return [
        { id: "variants", title: "Variants" },
        { id: "sizes", title: "Sizes" },
        { id: "icons", title: "Icons & Slots" },
        { id: "states", title: "States" },
      ];
    }
    return [
      { id: "overview", title: "Overview" },
      { id: "usage", title: "Usage" },
      { id: "api", title: "API Reference" },
    ];
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-50 selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-950">
      {/* Global Top Navbar */}
      <Header onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)} />

      <div className="flex w-full">
        {/* Left Sticky Sidebar */}
        <Sidebar
          isOpen={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
        />

        {/* Main Content & Right Table of Contents Layout */}
        <main className="flex-1 lg:pl-64 flex justify-center min-w-0">
          <div className="w-full max-w-7xl px-4 py-8 sm:px-8 lg:px-12 flex gap-12 justify-between">
            {/* Center Main Content Container */}
            <div className="flex-1 max-w-3xl min-w-0">
              <Routes>
                <Route path="/" element={<Navigate to="/button" replace />} />
                <Route path="/button" element={<ButtonDoc />} />
                <Route path="/input" element={<InputDoc />} />
                <Route path="/card" element={<CardDoc />} />
                <Route path="/alert" element={<AlertDoc />} />
                <Route path="/avatar" element={<AvatarDoc />} />
                <Route path="/badge" element={<BadgeDoc />} />
                <Route path="/checkbox" element={<CheckboxDoc />} />
                <Route path="/combobox" element={<ComboBoxDoc />} />
                <Route path="/description-list" element={<DescriptionListDoc />} />
                <Route path="/dialog" element={<DialogDoc />} />
                <Route path="/divider" element={<DividerDoc />} />
                <Route path="/dropdown" element={<DropdownDoc />} />
                <Route
                  path="*"
                  element={<Navigate to="/button" replace />}
                />
              </Routes>
            </div>

            {/* Right Sticky Table of Contents Sidebar */}
            <aside className="hidden xl:block w-56 shrink-0">
              <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2">
                <TableOfContents items={getTocItems()} />
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
