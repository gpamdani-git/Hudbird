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

const ChangelogDoc = lazy(() => import("./pages/ChangelogDoc"));

const SidebarDoc = lazy(() => import("./pages/SidebarDoc"));
const StackedLayoutDoc = lazy(() => import("./pages/StackedLayoutDoc"));
const AuthLayoutDoc = lazy(() => import("./pages/AuthLayoutDoc"));

const HeroDoc = lazy(() => import("./pages/marketing/HeroDoc"));
const BentoGridDoc = lazy(() => import("./pages/marketing/BentoGridDoc"));

const SidebarBorderedDemo = lazy(() => import("./pages/demos/SidebarBorderedDemo"));
const SidebarFlatDemo = lazy(() => import("./pages/demos/SidebarFlatDemo"));
const StackedLayoutDemo = lazy(() => import("./pages/demos/StackedLayoutDemo"));
const AuthLayoutDemo = lazy(() => import("./pages/demos/AuthLayoutDemo"));

export default function App() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const isWideLayoutPage = location.pathname.startsWith("/marketing") || location.pathname.startsWith("/layouts");

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
          forceMobileBehavior={isWideLayoutPage}
        />

        {/* Main Content & Right Table of Contents Layout */}
        <main className={`flex-1 ${!isWideLayoutPage ? "lg:pl-64" : ""} flex justify-center min-w-0`}>
          <div className={`w-full flex justify-between ${!isWideLayoutPage ? "max-w-7xl px-4 py-8 sm:px-8 lg:px-12 gap-12" : ""}`}>
            {/* Center Main Content Container */}
            <div className={`flex-1 min-w-0 ${!isWideLayoutPage ? "max-w-3xl" : "w-full max-w-full"}`}>
              <Suspense fallback={<DocLoadingSkeleton />}>
                <Routes>
                  <Route path="/" element={<GettingStartedDoc />} />
                  <Route path="/changelog" element={<ChangelogDoc />} />
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
                  <Route path="/layouts/sidebar" element={<SidebarDoc onOpenSidebar={() => setMobileSidebarOpen(true)} />} />
                  <Route path="/layouts/stacked" element={<StackedLayoutDoc onOpenSidebar={() => setMobileSidebarOpen(true)} />} />
                  <Route path="/layouts/auth" element={<AuthLayoutDoc onOpenSidebar={() => setMobileSidebarOpen(true)} />} />
                  <Route path="/skeleton" element={<SkeletonDoc />} />
                  <Route path="/switch" element={<SwitchDoc />} />
                  <Route path="/text" element={<TextDoc />} />
                  <Route path="/textarea" element={<TextareaDoc />} />
                  <Route path="/table" element={<TableDoc />} />
                  <Route path="/accordion" element={<AccordionDoc />} />
                  <Route path="/radio-group" element={<RadioGroupDoc />} />
                  <Route path="/tabs" element={<TabsDoc />} />
                  <Route path="/tooltip" element={<TooltipDoc />} />
                  <Route path="/marketing/hero" element={<HeroDoc onOpenSidebar={() => setMobileSidebarOpen(true)} />} />
                  <Route path="/marketing/bento-grid" element={<BentoGridDoc onOpenSidebar={() => setMobileSidebarOpen(true)} />} />

                  <Route
                    path="*"
                    element={<Navigate to="/button" replace />}
                  />
                </Routes>
              </Suspense>
            </div>

            {/* Right Sticky Table of Contents Sidebar */}
            {!isWideLayoutPage && (
              <aside className="hidden xl:block w-56 shrink-0">
                <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2">
                  <TableOfContents items={getTocForPath(location.pathname)} />
                </div>
              </aside>
            )}
          </div>
        </main>
      </div>

      {/* WhatsApp Floating Action Button */}
      <a
        href="https://wa.me/6282170681868"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#128C7E] hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
        aria-label="Contact us on WhatsApp"
        title="Report bugs or ask questions"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.005-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
        </svg>
      </a>
    </div>
  );
}
