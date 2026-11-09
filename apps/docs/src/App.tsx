import React, { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { ThemeEditor } from "./components/theme-editor/ThemeEditor";
import { ThemeEditorProvider } from "./components/theme-editor/ThemeEditorContext";
import { TableOfContents } from "./components/TableOfContents";
import { DocLoadingSkeleton } from "./components/DocLoadingSkeleton";
import { RouteProgressBar } from "./components/RouteProgressBar";
import { ScrollToTop } from "./components/ScrollToTop";
import { PageToolbar } from "./components/PageToolbar";
import { DocsFooter } from "./components/DocsFooter";
import { MarketingLayout } from "./components/MarketingLayout";
import { Container } from "@hudbird/ui";
import { getTocForPath } from "./tocData";

// Lazy-load all documentation pages for lightning-fast initial load & low memory footprint
const GettingStartedDoc = lazy(() => import("./pages/GettingStartedDoc"));
const TemplateDetailDoc = lazy(() =>
  import("./pages/TemplateDetailDoc").then((m) => ({ default: m.TemplateDetailDoc }))
);
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
const DoubleBezelCardDoc = lazy(() => import("./pages/DoubleBezelCardDoc"));
const LiquidGlassDoc = lazy(() => import("./pages/LiquidGlassDoc"));
const NavbarDoc = lazy(() => import("./pages/NavbarDoc"));
const NavigationMenuDoc = lazy(() => import("./pages/NavigationMenuDoc"));
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
const AreaChartDoc = lazy(() => import("./pages/AreaChartDoc"));
const BarChartDoc = lazy(() => import("./pages/BarChartDoc"));
const LineChartDoc = lazy(() => import("./pages/LineChartDoc"));
const PieChartDoc = lazy(() => import("./pages/PieChartDoc"));
const ComposedChartDoc = lazy(() => import("./pages/ComposedChartDoc"));
const ChartTooltipDoc = lazy(() => import("./pages/ChartTooltipDoc"));
const RadarChartDoc = lazy(() => import("./pages/RadarChartDoc"));
const RadialChartDoc = lazy(() => import("./pages/RadialChartDoc"));
const ToastDoc = lazy(() => import("./pages/ToastDoc"));
const SheetDoc = lazy(() => import("./pages/SheetDoc"));
const PopoverDoc = lazy(() => import("./pages/PopoverDoc"));
const SliderDoc = lazy(() => import("./pages/SliderDoc"));
const CommandDoc = lazy(() => import("./pages/CommandDoc"));
const ProgressDoc = lazy(() => import("./pages/ProgressDoc"));
const BreadcrumbsDoc = lazy(() => import("./pages/BreadcrumbsDoc"));
const CalendarDoc = lazy(() => import("./pages/CalendarDoc"));
const FormDoc = lazy(() => import("./pages/FormDoc"));
const InputOTPDoc = lazy(() => import("./pages/InputOTPDoc"));
const IconBoxDoc = lazy(() => import("./pages/IconBoxDoc"));

const SupportDoc = lazy(() => import("./pages/SupportDoc"));
const ChangelogDoc = lazy(() => import("./pages/ChangelogDoc"));
const ThemesDoc = lazy(() => import("./pages/ThemesDoc"));
const TemplatesDoc = lazy(() => import("./pages/TemplatesDoc"));
const InstallationDoc = lazy(() => import("./pages/InstallationDoc"));
const CliDoc = lazy(() => import("./pages/CliDoc"));
const AiSkillsDoc = lazy(() => import("./pages/AiSkillsDoc"));
const DesignSystemDoc = lazy(() => import("./pages/DesignSystemDoc"));
const IconsDoc = lazy(() => import("./pages/IconsDoc"));

const SectionDoc = lazy(() => import("./pages/SectionDoc"));
const ContainerDoc = lazy(() => import("./pages/ContainerDoc"));
const GridDoc = lazy(() => import("./pages/GridDoc"));
const MotionDoc = lazy(() => import("./pages/MotionDoc"));

const SidebarDoc = lazy(() => import("./pages/SidebarDoc"));
const StackedLayoutDoc = lazy(() => import("./pages/StackedLayoutDoc"));
const AuthLayoutDoc = lazy(() => import("./pages/AuthLayoutDoc"));

const HeroDoc = lazy(() => import("./pages/marketing/HeroDoc"));
const LandingSectionsDoc = lazy(() => import("./pages/marketing/LandingSectionsDoc"));
const LandingBuilderDoc = lazy(() => import("./pages/marketing/LandingBuilderDoc"));
const SaasLandingPreview = lazy(() => import("./pages/marketing/LandingPreview"));
const StartupPilotPreview = lazy(() =>
  import("./pages/marketing/HeroPilotDoc").then((module) => ({
    default: module.StartupPilotPreview,
  }))
);
const LogoCloudDoc = lazy(() => import("./pages/marketing/LogoCloudDoc"));
const FeatureSectionDoc = lazy(() => import("./pages/marketing/FeatureSectionDoc"));
const PricingDoc = lazy(() => import("./pages/marketing/PricingDoc"));
const BentoGridDoc = lazy(() => import("./pages/marketing/BentoGridDoc"));
const TestimonialsDoc = lazy(() => import("./pages/marketing/TestimonialsDoc"));
const FaqDoc = lazy(() => import("./pages/marketing/FaqDoc"));
const FooterDoc = lazy(() => import("./pages/marketing/FooterDoc"));
const CtaDoc = lazy(() => import("./pages/marketing/CtaDoc"));
const MorphingIslandDoc = lazy(() => import("./pages/marketing/MorphingIslandDoc"));
const AgentArtifactCanvasDoc = lazy(() => import("./pages/marketing/AgentArtifactCanvasDoc"));
const InteractiveBentoDoc = lazy(() => import("./pages/marketing/InteractiveBentoDoc"));

const SidebarBorderedDemo = lazy(() => import("./pages/demos/SidebarBorderedDemo"));
const SidebarFlatDemo = lazy(() => import("./pages/demos/SidebarFlatDemo"));
const StackedLayoutDemo = lazy(() => import("./pages/demos/StackedLayoutDemo"));
const AuthLayoutDemo = lazy(() => import("./pages/demos/AuthLayoutDemo"));
const ApplicationUiExamplesDoc = lazy(() => import("./pages/ApplicationUiExamplesDoc"));
const SharedPageExamplesDoc = lazy(() => import("./pages/SharedPageExamplesDoc"));
const MarketingExamplesDoc = lazy(() => import("./pages/marketing/MarketingExamplesDoc"));

const SaaSTemplate = lazy(() =>
  import("./components/templates/SaaSTemplate").then((m) => ({ default: m.SaaSTemplate }))
);
const ModernAppTemplate = lazy(() =>
  import("./components/templates/ModernAppTemplate").then((m) => ({ default: m.ModernAppTemplate }))
);
const DigitalAgencyTemplate = lazy(() =>
  import("./components/templates/DigitalAgencyTemplate").then((m) => ({
    default: m.DigitalAgencyTemplate,
  }))
);

const LandingPage = lazy(() => import("./pages/LandingPage"));
const AiStartupTemplate = lazy(() => import("./app/landingpage"));
const FintechTemplate = lazy(() =>
  import("./components/templates/FintechTemplate").then((m) => ({ default: m.FintechTemplate }))
);
const EcommerceTemplate = lazy(() =>
  import("./components/templates/EcommerceTemplate").then((m) => ({ default: m.EcommerceTemplate }))
);
const HospitalityTemplate = lazy(() =>
  import("./components/templates/HospitalityTemplate").then((m) => ({
    default: m.HospitalityTemplate,
  }))
);
const AdminCmsTemplate = lazy(() =>
  import("./components/templates/AdminCmsTemplate").then((m) => ({
    default: m.AdminCmsTemplate,
  }))
);

export default function App() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isMiniSidebar, setIsMiniSidebar] = useState(false);
  const location = useLocation();
  const isThemesPage = location.pathname.startsWith("/themes");
  const isWideLayoutPage =
    location.pathname.startsWith("/marketing") ||
    location.pathname.startsWith("/application-ui") ||
    location.pathname.startsWith("/shared-pages") ||
    location.pathname.startsWith("/builder") ||
    location.pathname.startsWith("/signature") ||
    location.pathname.startsWith("/layouts") ||
    location.pathname === "/templates" ||
    location.pathname === "/blocks" ||
    isThemesPage;

  // Automatically scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (location.pathname === "/") {
    return (
      <>
        <RouteProgressBar />
        <Suspense fallback={<DocLoadingSkeleton />}>
          <LandingPage />
        </Suspense>
      </>
    );
  }

  // Intercept standalone full-screen Page Builder web app (render without Docs sidebar/header)
  if (
    location.pathname === "/marketing/landing-builder" ||
    location.pathname.startsWith("/builder")
  ) {
    return (
      <>
        <RouteProgressBar />
        <Suspense fallback={<DocLoadingSkeleton />}>
          <Routes>
            <Route path="/marketing/landing-builder" element={<LandingBuilderDoc />} />
            <Route
              path="/builder/*"
              element={<Navigate to="/marketing/landing-builder" replace />}
            />
          </Routes>
        </Suspense>
      </>
    );
  }

  if (location.pathname.startsWith("/demos/")) {
    return (
      <>
        <RouteProgressBar />
        <Suspense fallback={<DocLoadingSkeleton />}>
          <Routes>
            <Route path="/demos/sidebar" element={<SidebarBorderedDemo />} />
            <Route path="/demos/sidebar-flat" element={<SidebarFlatDemo />} />
            <Route path="/demos/stacked" element={<StackedLayoutDemo />} />
            <Route path="/demos/auth" element={<AuthLayoutDemo />} />
          </Routes>
        </Suspense>
      </>
    );
  }

  // Intercept template live previews (render without header/sidebar)
  if (location.pathname.startsWith("/templates/") && !location.pathname.endsWith("/detail")) {
    return (
      <>
        <RouteProgressBar />
        <Suspense fallback={<DocLoadingSkeleton />}>
          <Routes>
            <Route path="/templates/startup-pilot" element={<StartupPilotPreview />} />
            <Route path="/templates/saas-landing" element={<SaasLandingPreview />} />
            <Route path="/templates/saas-launchpad" element={<SaaSTemplate />} />
            <Route path="/templates/modern-app" element={<ModernAppTemplate />} />
            <Route path="/templates/enterprise" element={<DigitalAgencyTemplate />} />

            <Route path="/templates/ai-startup" element={<AiStartupTemplate />} />
            <Route path="/templates/fintech" element={<FintechTemplate />} />
            <Route path="/templates/ecommerce" element={<EcommerceTemplate />} />
            <Route path="/templates/hospitality" element={<HospitalityTemplate />} />
            <Route path="/templates/admin-cms" element={<AdminCmsTemplate />} />
          </Routes>
        </Suspense>
      </>
    );
  }

  // Intercept templates and template details for Marketing Layout
  if (
    location.pathname === "/templates" ||
    (location.pathname.startsWith("/templates/") && location.pathname.endsWith("/detail"))
  ) {
    return (
      <Suspense fallback={<DocLoadingSkeleton />}>
        <MarketingLayout>
          <Routes>
            <Route path="/templates" element={<TemplatesDoc />} />
            <Route path="/templates/:id/detail" element={<TemplateDetailDoc />} />
          </Routes>
        </MarketingLayout>
      </Suspense>
    );
  }

  return (
    <ThemeEditorProvider>
      <RouteProgressBar />
      <div className="min-h-screen bg-white text-zinc-900 antialiased transition-colors duration-300 selection:bg-zinc-900 selection:text-white dark:bg-[#161618] dark:text-[#e5e5e5] dark:selection:bg-white dark:selection:text-[#161618]">
        {/* Subtle Ambient Surface Calibration */}
        <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-400/5 via-transparent to-transparent dark:from-transparent" />

        {/* Focus Gradients (Top & Bottom) */}
        <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-24 bg-gradient-to-b from-white/40 to-transparent dark:from-[#161618]/60 dark:to-transparent" />
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 h-24 bg-gradient-to-t from-white/40 to-transparent dark:from-[#161618]/60 dark:to-transparent" />

        <div className="flex w-full">
          {/* Left Sticky Sidebar */}
          <Sidebar
            isOpen={mobileSidebarOpen}
            onClose={() => setMobileSidebarOpen(false)}
            isMini={isMiniSidebar}
            onToggleMini={() => setIsMiniSidebar(!isMiniSidebar)}
          />

          {/* Floating Theme Editor Panel */}
          {isThemesPage && (
            <ThemeEditor isOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />
          )}

          {/* Main Content & Right Table of Contents Layout */}
          <main
            className={`flex-1 ${
              isMiniSidebar ? "lg:pl-0" : "lg:pl-[17.5rem]"
            } flex min-w-0 flex-col transition-all duration-300 ease-in-out`}
          >
            {/* Global Top Navbar */}
            <Header
              onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              onToggleDesktopSidebar={() => setIsMiniSidebar(!isMiniSidebar)}
            />

            <Container
              size="xl"
              gutter="lg"
              className={`flex justify-center pt-8 pb-16 ${!isWideLayoutPage ? "gap-12" : ""}`}
            >
              {/* Center Main Content Container */}
              <div className={`relative w-full max-w-full min-w-0 flex-1`}>
                <Suspense fallback={<DocLoadingSkeleton />}>
                  <Routes>
                    <Route path="/docs" element={<GettingStartedDoc />} />
                    <Route path="/support" element={<SupportDoc />} />
                    <Route path="/changelog" element={<ChangelogDoc />} />
                    <Route
                      path="/marketing/hero-pilot"
                      element={<Navigate to="/marketing/landing-sections/hero" replace />}
                    />
                    <Route
                      path="/marketing/landing-sections"
                      element={<Navigate to="/marketing/landing-sections/hero" replace />}
                    />
                    <Route
                      path="/marketing/landing-sections/:section"
                      element={<LandingSectionsDoc />}
                    />
                    <Route path="/marketing/landing-builder" element={<LandingBuilderDoc />} />
                    <Route
                      path="/marketing/examples"
                      element={<Navigate to="/marketing/examples/landing-pages" replace />}
                    />
                    <Route path="/marketing/examples/:slug" element={<MarketingExamplesDoc />} />
                    <Route
                      path="/application-ui"
                      element={<Navigate to="/application-ui/dashboards" replace />}
                    />
                    <Route
                      path="/application-ui/:category"
                      element={<ApplicationUiExamplesDoc />}
                    />
                    <Route
                      path="/shared-pages"
                      element={<Navigate to="/shared-pages/login" replace />}
                    />
                    <Route path="/shared-pages/:category" element={<SharedPageExamplesDoc />} />
                    <Route
                      path="/builder/studio"
                      element={<Navigate to="/marketing/landing-builder" replace />}
                    />
                    <Route path="/themes" element={<ThemesDoc />} />
                    <Route
                      path="/blocks"
                      element={<Navigate to="/marketing/landing-sections" replace />}
                    />
                    <Route path="/installation" element={<InstallationDoc />} />
                    <Route path="/cli" element={<CliDoc />} />
                    <Route path="/ai-skills" element={<AiSkillsDoc />} />
                    <Route path="/design-system" element={<DesignSystemDoc />} />
                    <Route path="/icons" element={<IconsDoc />} />
                    <Route path="/button" element={<ButtonDoc />} />
                    <Route path="/input" element={<InputDoc />} />
                    <Route path="/card" element={<CardDoc />} />
                    <Route path="/double-bezel-card" element={<DoubleBezelCardDoc />} />
                    <Route path="/liquid-glass" element={<LiquidGlassDoc />} />
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
                    <Route path="/icon-box" element={<IconBoxDoc />} />
                    <Route path="/navbar" element={<NavbarDoc />} />
                    <Route path="/navigation-menu" element={<NavigationMenuDoc />} />
                    <Route path="/pagination" element={<PaginationDoc />} />
                    <Route path="/select" element={<SelectDoc />} />
                    <Route path="/section" element={<SectionDoc />} />
                    <Route path="/container" element={<ContainerDoc />} />
                    <Route path="/grid" element={<GridDoc />} />
                    <Route path="/motion" element={<MotionDoc />} />
                    <Route
                      path="/sidebar"
                      element={<SidebarDoc onOpenSidebar={() => setMobileSidebarOpen(true)} />}
                    />
                    <Route
                      path="/layouts/sidebar"
                      element={<SidebarDoc onOpenSidebar={() => setMobileSidebarOpen(true)} />}
                    />
                    <Route
                      path="/layouts/stacked"
                      element={
                        <StackedLayoutDoc onOpenSidebar={() => setMobileSidebarOpen(true)} />
                      }
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
                    <Route path="/area-chart" element={<AreaChartDoc />} />
                    <Route path="/bar-chart" element={<BarChartDoc />} />
                    <Route path="/line-chart" element={<LineChartDoc />} />
                    <Route path="/pie-chart" element={<PieChartDoc />} />
                    <Route path="/composed-chart" element={<ComposedChartDoc />} />
                    <Route path="/radar-chart" element={<RadarChartDoc />} />
                    <Route path="/radial-chart" element={<RadialChartDoc />} />
                    <Route path="/chart-tooltip" element={<ChartTooltipDoc />} />
                    <Route path="/toast" element={<ToastDoc />} />
                    <Route path="/sheet" element={<SheetDoc />} />
                    <Route path="/popover" element={<PopoverDoc />} />
                    <Route path="/slider" element={<SliderDoc />} />
                    <Route path="/command" element={<CommandDoc />} />
                    <Route path="/progress" element={<ProgressDoc />} />
                    <Route path="/breadcrumbs" element={<BreadcrumbsDoc />} />
                    <Route path="/calendar" element={<CalendarDoc />} />
                    <Route path="/form" element={<FormDoc />} />
                    <Route path="/input-otp" element={<InputOTPDoc />} />
                    <Route
                      path="/marketing/hero"
                      element={<Navigate to="/marketing/landing-sections/hero" replace />}
                    />
                    <Route
                      path="/marketing/logo-clouds"
                      element={<Navigate to="/marketing/landing-sections/logos" replace />}
                    />
                    <Route
                      path="/marketing/feature-sections"
                      element={<Navigate to="/marketing/landing-sections/features" replace />}
                    />
                    <Route
                      path="/marketing/pricing"
                      element={<Navigate to="/marketing/landing-sections/pricing" replace />}
                    />
                    <Route
                      path="/marketing/bento-grid"
                      element={<Navigate to="/marketing/landing-sections/features" replace />}
                    />
                    <Route
                      path="/marketing/testimonials"
                      element={<Navigate to="/marketing/landing-sections/testimonials" replace />}
                    />
                    <Route
                      path="/marketing/faq"
                      element={<Navigate to="/marketing/landing-sections/faq" replace />}
                    />
                    <Route
                      path="/marketing/footer"
                      element={<Navigate to="/marketing/landing-sections/footer" replace />}
                    />
                    <Route
                      path="/marketing/cta"
                      element={<Navigate to="/marketing/landing-sections/cta" replace />}
                    />
                    <Route path="/signature/morphing-island" element={<MorphingIslandDoc />} />
                    <Route path="/signature/agent-canvas" element={<AgentArtifactCanvasDoc />} />
                    <Route path="/signature/interactive-bento" element={<InteractiveBentoDoc />} />

                    <Route path="*" element={<Navigate to="/button" replace />} />
                  </Routes>
                </Suspense>
                <DocsFooter isWide={isWideLayoutPage} />
              </div>

              {/* Right Sticky Table of Contents Sidebar */}
              {!isWideLayoutPage && (
                <aside className="hidden w-56 shrink-0 xl:block">
                  <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2">
                    <TableOfContents items={getTocForPath(location.pathname)} />
                  </div>
                </aside>
              )}
            </Container>
          </main>
        </div>

        <ScrollToTop />
      </div>
    </ThemeEditorProvider>
  );
}
