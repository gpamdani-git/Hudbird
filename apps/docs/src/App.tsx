import React, { useState, lazy, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { TableOfContents } from "./components/TableOfContents";
import { DocLoadingSkeleton } from "./components/DocLoadingSkeleton";
import { ScrollToTop } from "./components/ScrollToTop";
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
const LogoCloudDoc = lazy(() => import("./pages/marketing/LogoCloudDoc"));
const FeatureSectionDoc = lazy(() => import("./pages/marketing/FeatureSectionDoc"));
const PricingDoc = lazy(() => import("./pages/marketing/PricingDoc"));
const BentoGridDoc = lazy(() => import("./pages/marketing/BentoGridDoc"));

const SidebarBorderedDemo = lazy(() => import("./pages/demos/SidebarBorderedDemo"));
const SidebarFlatDemo = lazy(() => import("./pages/demos/SidebarFlatDemo"));
const StackedLayoutDemo = lazy(() => import("./pages/demos/StackedLayoutDemo"));
const AuthLayoutDemo = lazy(() => import("./pages/demos/AuthLayoutDemo"));

export default function App() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const isWideLayoutPage =
    location.pathname.startsWith("/marketing") || location.pathname.startsWith("/layouts");

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
    <div className="min-h-screen bg-white text-zinc-900 antialiased transition-colors duration-300 selection:bg-zinc-900 selection:text-white dark:bg-zinc-950 dark:text-zinc-50 dark:selection:bg-white dark:selection:text-zinc-950">
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
        <main
          className={`flex-1 ${!isWideLayoutPage ? "lg:pl-64" : ""} flex min-w-0 justify-center`}
        >
          <div
            className={`flex w-full justify-between ${!isWideLayoutPage ? "max-w-7xl gap-12 px-4 py-8 sm:px-8 lg:px-12" : ""}`}
          >
            {/* Center Main Content Container */}
            <div
              className={`min-w-0 flex-1 ${!isWideLayoutPage ? "max-w-3xl" : "w-full max-w-full"}`}
            >
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
                  <Route
                    path="/layouts/sidebar"
                    element={<SidebarDoc onOpenSidebar={() => setMobileSidebarOpen(true)} />}
                  />
                  <Route
                    path="/layouts/stacked"
                    element={<StackedLayoutDoc onOpenSidebar={() => setMobileSidebarOpen(true)} />}
                  />
                  <Route
                    path="/layouts/auth"
                    element={<AuthLayoutDoc onOpenSidebar={() => setMobileSidebarOpen(true)} />}
                  />
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
                    path="/marketing/hero"
                    element={<HeroDoc onOpenSidebar={() => setMobileSidebarOpen(true)} />}
                  />
                  <Route
                    path="/marketing/logo-clouds"
                    element={<LogoCloudDoc onOpenSidebar={() => setMobileSidebarOpen(true)} />}
                  />
                  <Route
                    path="/marketing/feature-sections"
                    element={<FeatureSectionDoc onOpenSidebar={() => setMobileSidebarOpen(true)} />}
                  />
                  <Route
                    path="/marketing/pricing"
                    element={<PricingDoc onOpenSidebar={() => setMobileSidebarOpen(true)} />}
                  />
                  <Route
                    path="/marketing/bento-grid"
                    element={<BentoGridDoc onOpenSidebar={() => setMobileSidebarOpen(true)} />}
                  />

                  <Route path="*" element={<Navigate to="/button" replace />} />
                </Routes>
              </Suspense>
            </div>

            {/* Right Sticky Table of Contents Sidebar */}
            {!isWideLayoutPage && (
              <aside className="hidden w-56 shrink-0 xl:block">
                <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2">
                  <TableOfContents items={getTocForPath(location.pathname)} />
                </div>
              </aside>
            )}
          </div>
        </main>
      </div>

      <ScrollToTop />
    </div>
  );
}
