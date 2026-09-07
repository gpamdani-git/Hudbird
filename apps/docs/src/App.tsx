import React, { useState, lazy, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { TableOfContents } from "./components/TableOfContents";
import { DocLoadingSkeleton } from "./components/DocLoadingSkeleton";
import { getTocForPath } from "./tocData";

// Lazy-load all documentation pages for lightning-fast initial load & low memory footprint
const GettingStartedDoc = lazy(() => import("./pages/GettingStartedDoc"));
const ButtonDoc = lazy(() => import("./pages/ButtonDoc"));
const AlertDoc = lazy(() => import("./pages/AlertDoc"));
const AvatarDoc = lazy(() => import("./pages/AvatarDoc"));
const BadgeDoc = lazy(() => import("./pages/BadgeDoc"));
const CheckboxDoc = lazy(() => import("./pages/CheckboxDoc"));
const ComboBoxDoc = lazy(() => import("./pages/ComboBoxDoc"));
const DescriptionListDoc = lazy(() => import("./pages/DescriptionListDoc"));
const DialogDoc = lazy(() => import("./pages/DialogDoc"));
const DividerDoc = lazy(() => import("./pages/DividerDoc"));
const DropdownDoc = lazy(() => import("./pages/DropdownDoc"));
const FieldsetDoc = lazy(() => import("./pages/FieldsetDoc"));
const HeadingDoc = lazy(() => import("./pages/HeadingDoc"));
const InputDoc = lazy(() => import("./pages/InputDoc"));
const CardDoc = lazy(() => import("./pages/CardDoc"));
const NavbarDoc = lazy(() => import("./pages/NavbarDoc"));
const PaginationDoc = lazy(() => import("./pages/PaginationDoc"));
const SelectDoc = lazy(() => import("./pages/SelectDoc"));
const SkeletonDoc = lazy(() => import("./pages/SkeletonDoc"));
const SwitchDoc = lazy(() => import("./pages/SwitchDoc"));
const TextDoc = lazy(() => import("./pages/TextDoc"));
const TextareaDoc = lazy(() => import("./pages/TextareaDoc"));
const TableDoc = lazy(() => import("./pages/TableDoc"));
const TabsDoc = lazy(() => import("./pages/TabsDoc"));
const RadioGroupDoc = lazy(() => import("./pages/RadioGroupDoc"));
const TooltipDoc = lazy(() => import("./pages/TooltipDoc"));
const AccordionDoc = lazy(() => import("./pages/AccordionDoc"));

const SidebarDoc = lazy(() => import("./pages/SidebarDoc"));
const StackedLayoutDoc = lazy(() => import("./pages/StackedLayoutDoc"));
const AuthLayoutDoc = lazy(() => import("./pages/AuthLayoutDoc"));

const SidebarBorderedDemo = lazy(() => import("./pages/demos/SidebarBorderedDemo"));
const SidebarFlatDemo = lazy(() => import("./pages/demos/SidebarFlatDemo"));
const StackedLayoutDemo = lazy(() => import("./pages/demos/StackedLayoutDemo"));
const AuthLayoutDemo = lazy(() => import("./pages/demos/AuthLayoutDemo"));

export default function App() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();

  if (location.pathname.startsWith("/demos/")) {
    return (
      <Suspense fallback={<DocLoadingSkeleton />}>
        <Routes>
          <Route path="/demos/sidebar" element={<SidebarBorderedDemo />} />
          <Route path="/demos/sidebar-flat" element={<SidebarFlatDemo />} />
          <Route path="/demos/stacked" element={<StackedLayoutDemo />} />
          <Route path="/demos/auth" element={<AuthLayoutDemo />} />
        </Routes>
      </Suspense>
    );
  }

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
              <Suspense fallback={<DocLoadingSkeleton />}>
                <Routes>
                  <Route path="/" element={<GettingStartedDoc />} />
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
                  <Route path="/fieldset" element={<FieldsetDoc />} />
                  <Route path="/heading" element={<HeadingDoc />} />
                  <Route path="/navbar" element={<NavbarDoc />} />
                  <Route path="/pagination" element={<PaginationDoc />} />
                  <Route path="/select" element={<SelectDoc />} />
                  <Route path="/layouts/sidebar" element={<SidebarDoc />} />
                  <Route path="/layouts/stacked" element={<StackedLayoutDoc />} />
                  <Route path="/layouts/auth" element={<AuthLayoutDoc />} />
                  <Route path="/skeleton" element={<SkeletonDoc />} />
                  <Route path="/switch" element={<SwitchDoc />} />
                  <Route path="/text" element={<TextDoc />} />
                  <Route path="/textarea" element={<TextareaDoc />} />
                  <Route path="/table" element={<TableDoc />} />
                  <Route path="/accordion" element={<AccordionDoc />} />
                  <Route path="/radio-group" element={<RadioGroupDoc />} />
                  <Route path="/tabs" element={<TabsDoc />} />
                  <Route path="/tooltip" element={<TooltipDoc />} />

                  <Route
                    path="*"
                    element={<Navigate to="/button" replace />}
                  />
                </Routes>
              </Suspense>
            </div>

            {/* Right Sticky Table of Contents Sidebar */}
            <aside className="hidden xl:block w-56 shrink-0">
              <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2">
                <TableOfContents items={getTocForPath(location.pathname)} />
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
