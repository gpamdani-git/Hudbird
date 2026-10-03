import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AdminSidebar, AdminPage } from "@/components/admin/Sidebar/AdminSidebar";
import { AdminHeader } from "@/components/admin/Header/AdminHeader";

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  let activePage: AdminPage = "overview";
  const path = location.pathname.split("/").pop();
  if (path && path !== "dashboard") {
    activePage = path as AdminPage;
  }

  const handlePageChange = (page: AdminPage) => {
    if (page === "overview") navigate("/dashboard");
    else navigate(`/dashboard/${page}`);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      {/* Sidebar */}
      <AdminSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        activePage={activePage}
        onPageChange={handlePageChange}
      />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        {/* Header */}
        <AdminHeader 
          onMenuClick={() => setSidebarOpen(true)} 
          onNavigate={handlePageChange}
        />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
