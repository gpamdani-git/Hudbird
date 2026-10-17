import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { ShowcaseIndex } from "./ShowcaseIndex";
import { ShowcaseInstallation } from "./pages/ShowcaseInstallation";
const Home = React.lazy(() => import("./pages/Home").then((m) => ({ default: m.Home })));
const AiStartup = React.lazy(() =>
  import("./pages/AiStartup").then((m) => ({ default: m.AiStartup }))
);
const ModernApp = React.lazy(() =>
  import("./pages/ModernApp").then((m) => ({ default: m.ModernApp }))
);
const Ecommerce = React.lazy(() =>
  import("./pages/Ecommerce").then((m) => ({ default: m.Ecommerce }))
);
const Fintech = React.lazy(() => import("./pages/Fintech").then((m) => ({ default: m.Fintech })));
const Hospitality = React.lazy(() =>
  import("./pages/Hospitality").then((m) => ({ default: m.Hospitality }))
);
const Agency = React.lazy(() => import("./pages/Agency").then((m) => ({ default: m.Agency })));
const DigitalAgencyDemo = React.lazy(() =>
  import("./pages/DigitalAgencyDemo").then((m) => ({ default: m.DigitalAgencyDemo }))
);
const VibecodeUiTheme = React.lazy(() =>
  import("./pages/VibecodeUiTheme").then((m) => ({ default: m.VibecodeUiTheme }))
);
const VibecodeUiDetailPage = React.lazy(() =>
  import("./pages/VibecodeUiDetailPage").then((m) => ({
    default: m.VibecodeUiDetailPage || m.default,
  }))
);
const NexusMasterShowcase = React.lazy(() =>
  import("./components/Showcase/NexusMasterShowcase").then((m) => ({
    default: m.NexusMasterShowcase,
  }))
);
const NexusNicheDemoView = React.lazy(() =>
  import("./pages/NexusNicheDemoView").then((m) => ({ default: m.NexusNicheDemoView }))
);
const NexusInnerPageView = React.lazy(() =>
  import("./pages/NexusInnerPageView").then((m) => ({ default: m.NexusInnerPageView }))
);
import { AiChat } from "./pages/AiChat";
import { AiMail } from "./pages/AiMail";
import { About } from "./pages/About";
import { Pricing } from "./pages/Pricing";
import { Contact } from "./pages/Contact";
import { Terms } from "./pages/Terms";
import { Privacy } from "./pages/Privacy";
import { Analytics } from "./pages/Analytics";
import { Security } from "./pages/Security";
import { Integrations } from "./pages/Integrations";
import { Docs } from "./pages/Docs";
import { ApiReference } from "./pages/ApiReference";
import { Blog } from "./pages/Blog";
import { BlogPost } from "./pages/BlogPost";
import { Community } from "./pages/Community";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ForgotPassword, OtpVerifyPage, MaintenancePage } from "./pages/ForgotPassword";
const DashboardLayout = React.lazy(() =>
  import("./layouts/DashboardLayout").then((m) => ({ default: m.DashboardLayout }))
);
const Dashboard = React.lazy(() =>
  import("./pages/Dashboard").then((m) => ({ default: m.Dashboard }))
);
import { ScrollToTop } from "./components/ScrollToTop";

// Admin CMS Components
import { AdminAnalytics } from "./components/admin/Analytics/AdminAnalytics";
import { AdminMessages } from "./components/admin/Messages/AdminMessages";
import { AdminPosts } from "./components/admin/Posts/AdminPosts";
import { AdminPages } from "./components/admin/Pages/AdminPages";
import { AdminMedia } from "./components/admin/Media/AdminMedia";
import { AdminCategories } from "./components/admin/Categories/AdminCategories";
import { AdminUsers } from "./components/admin/Manage/AdminUsers";
import { AdminSiteBuilder } from "./components/admin/Manage/AdminSiteBuilder";
import { AdminAppearance } from "./components/admin/Manage/AdminAppearance";
import { AdminPlugins } from "./components/admin/Manage/AdminPlugins";
import { AdminNotifications } from "./components/admin/System/AdminNotifications";
import { AdminSecurity } from "./components/admin/System/AdminSecurity";
import { AdminSettings } from "./components/admin/System/AdminSettings";
import { AdminProfile } from "./components/admin/Manage/AdminProfile";
import { AdminInbox } from "./components/admin/Manage/AdminInbox";
import { AdminEditor } from "./components/admin/Editor/AdminEditor";

// Wrappers to handle navigation for editor states
const AdminPostsWrapper = () => {
  const navigate = useNavigate();
  return <AdminPosts onEdit={() => navigate("/dashboard/editor-post")} />;
};

const AdminPagesWrapper = () => {
  const navigate = useNavigate();
  return <AdminPages onEdit={() => navigate("/dashboard/editor-page")} />;
};

const AdminEditorPostWrapper = () => {
  const navigate = useNavigate();
  return <AdminEditor type="post" onBack={() => navigate("/dashboard/posts")} />;
};

const AdminEditorPageWrapper = () => {
  const navigate = useNavigate();
  return <AdminEditor type="page" onBack={() => navigate("/dashboard/pages")} />;
};

const AdminSiteBuilderWrapper = () => {
  const navigate = useNavigate();
  return <AdminSiteBuilder onNavigate={(page) => navigate(`/dashboard/${page}`)} />;
};

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <React.Suspense
        fallback={
          <div className="flex h-screen w-full items-center justify-center bg-zinc-50 dark:bg-zinc-950">
            <div className="h-8 w-8 animate-spin rounded-full border-t-2 border-b-2 border-zinc-900 dark:border-white"></div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<ShowcaseIndex />} />
          <Route path="/installation" element={<ShowcaseInstallation />} />
          <Route path="/saas-launchpad" element={<Home />} />
          <Route path="/ai-startup" element={<AiStartup />} />
          <Route path="/ai-chat" element={<AiChat />} />
          <Route path="/ai-mail" element={<AiMail />} />
          <Route path="/modern-app" element={<ModernApp />} />
          <Route path="/ecommerce" element={<Ecommerce />} />
          <Route path="/fintech" element={<Fintech />} />
          <Route path="/hospitality" element={<Hospitality />} />
          <Route path="/agency" element={<Agency />} />
          {/* Master Multiplier Sales Showcase Hub */}
          <Route path="/nexus" element={<NexusMasterShowcase />} />
          <Route path="/demos" element={<NexusMasterShowcase />} />

          {/* Hudbird Nexus Flagship Studio Demos (All 47 Pre-built Templates & 29+ Inner Pages) */}
          <Route path="/vibecode-ui" element={<VibecodeUiTheme />} />
          <Route path="/vibecode-ui/detail" element={<VibecodeUiDetailPage />} />
          <Route path="/vibecode-ui/detail/:itemId" element={<VibecodeUiDetailPage />} />
          <Route path="/vibecode-ui/item/:itemId" element={<VibecodeUiDetailPage />} />
          <Route path="/demos/vibecode-ui/item/:itemId" element={<VibecodeUiDetailPage />} />
          <Route path="/vibecode-ui/:sectionSlug" element={<VibecodeUiTheme />} />
          <Route path="/demos/vibecode-ui" element={<VibecodeUiTheme />} />
          <Route path="/demos/digital-agency" element={<DigitalAgencyDemo />} />
          <Route path="/digital-agency" element={<DigitalAgencyDemo />} />
          <Route path="/demos/:nicheSlug" element={<NexusNicheDemoView />} />
          <Route path="/demos/:nicheSlug/*" element={<NexusInnerPageView />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/security" element={<Security />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/docs/api-reference" element={<ApiReference />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/community" element={<Community />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp" element={<OtpVerifyPage />} />
          <Route path="/maintenance" element={<MaintenancePage />} />

          {/* Dashboard Routes (Hudbird CMS) */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="messages" element={<AdminMessages />} />
            <Route path="posts" element={<AdminPostsWrapper />} />
            <Route path="pages" element={<AdminPagesWrapper />} />
            <Route path="media" element={<AdminMedia />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="site-builder" element={<AdminSiteBuilderWrapper />} />
            <Route path="appearance" element={<AdminAppearance />} />
            <Route path="plugins" element={<AdminPlugins />} />
            <Route path="notifications" element={<AdminNotifications />} />
            <Route path="security" element={<AdminSecurity />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="inbox" element={<AdminInbox />} />
            <Route path="editor-post" element={<AdminEditorPostWrapper />} />
            <Route path="editor-page" element={<AdminEditorPageWrapper />} />
          </Route>
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
}
