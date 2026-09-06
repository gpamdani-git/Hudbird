import React from "react";
import { NavLink } from "react-router-dom";
import { Home, X } from "lucide-react";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const layouts = [
    { name: "Sidebar layout", path: "/layouts/sidebar" },
    { name: "Stacked layout", path: "/layouts/stacked" },
    { name: "Auth layout", path: "/layouts/auth", isNew: true },
  ];

  const components = [
    { name: "Alert", path: "/alert" },
    { name: "Avatar", path: "/avatar" },
    { name: "Badge", path: "/badge" },
    { name: "Button", path: "/button" },
    { name: "Card", path: "/card" },
    { name: "Checkbox", path: "/checkbox" },
    { name: "Combobox", path: "/combobox", isNew: true },
    { name: "Description list", path: "/description-list" },
    { name: "Dialog", path: "/dialog" },
    { name: "Divider", path: "/divider" },
    { name: "Dropdown", path: "/dropdown" },
    { name: "Fieldset", path: "/fieldset" },
    { name: "Heading", path: "/heading" },
    { name: "Input", path: "/input" },
    { name: "Navbar", path: "/navbar", isNew: true },
    { name: "Pagination", path: "/pagination", isNew: true },
    { name: "Select", path: "/select", isNew: true },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-zinc-950/50 backdrop-blur-xs lg:hidden"
        />
      )}

      <aside
        className={`fixed top-14 bottom-0 left-0 z-40 w-64 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-y-auto px-4 py-6 transition-transform lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between lg:hidden mb-4 pb-2 border-b border-zinc-200 dark:border-zinc-800">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Navigation</span>
          <button onClick={onClose} className="p-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Getting started */}
        <div className="mb-6">
          <NavLink
            to="/"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                isActive
                  ? "text-zinc-950 dark:text-white font-semibold bg-zinc-100 dark:bg-zinc-900"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
              }`
            }
          >
            <Home className="w-4 h-4 text-zinc-400" />
            <span>Getting started</span>
          </NavLink>
        </div>

        {/* Layouts Section */}
        <div className="mb-6">
          <h5 className="px-3 text-xs font-semibold text-zinc-900 dark:text-zinc-200 mb-2">
            Layouts
          </h5>
          <ul className="space-y-0.5">
            {layouts.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors ${
                      isActive
                        ? "text-zinc-950 dark:text-white font-semibold bg-zinc-100 dark:bg-zinc-900"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
                    }`
                  }
                >
                  <span>{item.name}</span>
                  {item.isNew && (
                    <span className="text-[10px] font-medium px-1.5 py-0.2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full border border-emerald-500/20">
                      New
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Components Section */}
        <div className="mb-8">
          <h5 className="px-3 text-xs font-semibold text-zinc-900 dark:text-zinc-200 mb-2">
            Components
          </h5>
          <ul className="space-y-0.5 relative">
            {components.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `group relative flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors ${
                      isActive
                        ? "text-zinc-950 dark:text-white font-semibold bg-zinc-100 dark:bg-zinc-900"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Left vertical active bar */}
                      {isActive && (
                        <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-zinc-950 dark:bg-white rounded-r-full" />
                      )}
                      <span className="pl-1">{item.name}</span>
                      {item.isNew && (
                        <span className="text-[10px] font-medium px-1.5 py-0.2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full border border-emerald-500/20">
                          New
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};
