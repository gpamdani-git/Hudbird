import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Pricing } from "./pages/Pricing";
import { Contact } from "./pages/Contact";
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
import { ForgotPassword } from "./pages/ForgotPassword";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { Dashboard } from "./pages/Dashboard";
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
    <BrowserRouter basename="/saas-launchpad/">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/security" element={<Security />} />
        <Route path="/integrations" element={<Integrations />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/docs/api-reference" element={<ApiReference />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/community" element={<Community />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

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
    </BrowserRouter>
  );
}
