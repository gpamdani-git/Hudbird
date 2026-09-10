import React from "react";
import { NavLink } from "react-router-dom";
import { Home, X, LifeBuoy } from "lucide-react";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  forceMobileBehavior?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, forceMobileBehavior }) => {
  const layouts = [
    { name: "Sidebar Layout", path: "/layouts/sidebar", isNew: true },
    { name: "Stacked Layout", path: "/layouts/stacked", isNew: true },
    { name: "Auth Layout", path: "/layouts/auth", isNew: true },
  ];

  const components = [
    { name: "Accordion", path: "/accordion", isNew: true },
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
    { name: "Radio group", path: "/radio-group", isNew: true },
    { name: "Select", path: "/select", isNew: true },
    { name: "Skeleton", path: "/skeleton", isNew: true },
    { name: "Switch", path: "/switch", isNew: true },
    { name: "Table", path: "/table", isNew: true },
    { name: "Tabs", path: "/tabs", isNew: true },
    { name: "Text", path: "/text", isNew: true },
    { name: "Textarea", path: "/textarea", isNew: true },
    { name: "Tooltip", path: "/tooltip", isNew: true },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className={`fixed inset-0 z-50 bg-zinc-950/50 backdrop-blur-xs ${forceMobileBehavior ? "" : "lg:hidden"}`}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 overflow-y-auto border-r border-zinc-200 bg-white px-4 py-6 transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-950 ${forceMobileBehavior ? "" : "lg:top-14"} ${
          forceMobileBehavior ? "" : "lg:translate-x-0"
        } ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div
          className={`mb-4 flex items-center justify-between border-b border-zinc-200 pb-2 dark:border-zinc-800 ${forceMobileBehavior ? "" : "lg:hidden"}`}
        >
          <span className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
            Navigation
          </span>
          <button
            onClick={onClose}
            className="p-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Getting started & Changelog */}
        <div className="mb-6 space-y-1">
          <NavLink
            to="/"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                isActive
                  ? "bg-zinc-100 font-semibold text-zinc-950 dark:bg-zinc-900 dark:text-white"
                  : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900/50 dark:hover:text-zinc-200"
              }`
            }
          >
            <Home className="h-4 w-4 text-zinc-400" />
            <span>Getting started</span>
          </NavLink>
          <NavLink
            to="/changelog"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                isActive
                  ? "bg-zinc-100 font-semibold text-zinc-950 dark:bg-zinc-900 dark:text-white"
                  : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900/50 dark:hover:text-zinc-200"
              }`
            }
          >
            <div className="flex h-4 w-4 items-center justify-center text-zinc-400">✨</div>
            <span>Changelog</span>
          </NavLink>
          <NavLink
            to="/support"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                isActive
                  ? "bg-zinc-100 font-semibold text-zinc-950 dark:bg-zinc-900 dark:text-white"
                  : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900/50 dark:hover:text-zinc-200"
              }`
            }
          >
            <LifeBuoy className="h-4 w-4 text-zinc-400" />
            <span>Support & FAQ</span>
          </NavLink>
        </div>

        {/* Layouts Section */}
        <div className="mb-6">
          <h5 className="mb-2 px-3 text-xs font-semibold text-zinc-900 dark:text-zinc-200">
            Layouts
          </h5>
          <ul className="space-y-0.5">
            {layouts.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between rounded-lg px-3 py-1.5 text-xs transition-colors ${
                      isActive
                        ? "bg-zinc-100 font-semibold text-zinc-950 dark:bg-zinc-900 dark:text-white"
                        : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900/50 dark:hover:text-zinc-200"
                    }`
                  }
                >
                  <span>{item.name}</span>
                  {item.isNew && (
                    <span className="py-0.2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-1.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                      New
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Marketing Sections */}
        <div className="mb-6">
          <h5 className="mb-2 px-3 text-xs font-semibold text-zinc-900 dark:text-zinc-200">
            Marketing Sections
          </h5>
          <ul className="relative space-y-0.5">
            <li>
              <NavLink
                to="/marketing/hero"
                onClick={onClose}
                className={({ isActive }) =>
                  `group relative flex items-center justify-between rounded-lg px-3 py-1.5 text-xs transition-colors ${
                    isActive
                      ? "bg-zinc-100 font-semibold text-zinc-950 dark:bg-zinc-900 dark:text-white"
                      : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900/50 dark:hover:text-zinc-200"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute top-1.5 bottom-1.5 left-0 w-1 rounded-r-full bg-zinc-950 dark:bg-white" />
                    )}
                    <span className="pl-1">Hero Section</span>
                  </>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/marketing/bento-grid"
                onClick={onClose}
                className={({ isActive }) =>
                  `group relative flex items-center justify-between rounded-lg px-3 py-1.5 text-xs transition-colors ${
                    isActive
                      ? "bg-zinc-100 font-semibold text-zinc-950 dark:bg-zinc-900 dark:text-white"
                      : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900/50 dark:hover:text-zinc-200"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute top-1.5 bottom-1.5 left-0 w-1 rounded-r-full bg-zinc-950 dark:bg-white" />
                    )}
                    <span className="pl-1">Bento Grid</span>
                    <span className="py-0.2 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-1.5 text-[10px] font-medium text-fuchsia-600 dark:text-fuchsia-400">
                      New
                    </span>
                  </>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/marketing/logo-clouds"
                onClick={onClose}
                className={({ isActive }) =>
                  `group relative flex items-center justify-between rounded-lg px-3 py-1.5 text-xs transition-colors ${
                    isActive
                      ? "bg-zinc-100 font-semibold text-zinc-950 dark:bg-zinc-900 dark:text-white"
                      : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900/50 dark:hover:text-zinc-200"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute top-1.5 bottom-1.5 left-0 w-1 rounded-r-full bg-zinc-950 dark:bg-white" />
                    )}
                    <span className="pl-1">Logo Clouds</span>
                    <span className="py-0.2 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-1.5 text-[10px] font-medium text-fuchsia-600 dark:text-fuchsia-400">
                      New
                    </span>
                  </>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/marketing/faq"
                onClick={onClose}
                className={({ isActive }) =>
                  `group relative flex items-center justify-between rounded-lg px-3 py-1.5 text-xs transition-colors ${
                    isActive
                      ? "bg-zinc-100 font-semibold text-zinc-950 dark:bg-zinc-900 dark:text-white"
                      : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900/50 dark:hover:text-zinc-200"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute top-1.5 bottom-1.5 left-0 w-1 rounded-r-full bg-zinc-950 dark:bg-white" />
                    )}
                    <span className="pl-1">FAQ</span>
                    <span className="py-0.2 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-1.5 text-[10px] font-medium text-fuchsia-600 dark:text-fuchsia-400">
                      New
                    </span>
                  </>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/marketing/feature-sections"
                onClick={onClose}
                className={({ isActive }) =>
                  `group relative flex items-center justify-between rounded-lg px-3 py-1.5 text-xs transition-colors ${
                    isActive
                      ? "bg-zinc-100 font-semibold text-zinc-950 dark:bg-zinc-900 dark:text-white"
                      : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900/50 dark:hover:text-zinc-200"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute top-1.5 bottom-1.5 left-0 w-1 rounded-r-full bg-zinc-950 dark:bg-white" />
                    )}
                    <span className="pl-1">Feature Sections</span>
                    <span className="py-0.2 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-1.5 text-[10px] font-medium text-fuchsia-600 dark:text-fuchsia-400">
                      New
                    </span>
                  </>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/marketing/pricing"
                onClick={onClose}
                className={({ isActive }) =>
                  `group relative flex items-center justify-between rounded-lg px-3 py-1.5 text-xs transition-colors ${
                    isActive
                      ? "bg-zinc-100 font-semibold text-zinc-950 dark:bg-zinc-900 dark:text-white"
                      : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900/50 dark:hover:text-zinc-200"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute top-1.5 bottom-1.5 left-0 w-1 rounded-r-full bg-zinc-950 dark:bg-white" />
                    )}
                    <span className="pl-1">Pricing</span>
                    <span className="py-0.2 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-1.5 text-[10px] font-medium text-fuchsia-600 dark:text-fuchsia-400">
                      New
                    </span>
                  </>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/marketing/testimonials"
                onClick={onClose}
                className={({ isActive }) =>
                  `group relative flex items-center justify-between rounded-lg px-3 py-1.5 text-xs transition-colors ${
                    isActive
                      ? "bg-zinc-100 font-semibold text-zinc-950 dark:bg-zinc-900 dark:text-white"
                      : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900/50 dark:hover:text-zinc-200"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute top-1.5 bottom-1.5 left-0 w-1 rounded-r-full bg-zinc-950 dark:bg-white" />
                    )}
                    <span className="pl-1">Testimonials</span>
                    <span className="py-0.2 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-1.5 text-[10px] font-medium text-fuchsia-600 dark:text-fuchsia-400">
                      New
                    </span>
                  </>
                )}
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Components Section */}
        <div className="mb-8">
          <h5 className="mb-2 px-3 text-xs font-semibold text-zinc-900 dark:text-zinc-200">
            Components
          </h5>
          <ul className="relative space-y-0.5">
            {components.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `group relative flex items-center justify-between rounded-lg px-3 py-1.5 text-xs transition-colors ${
                      isActive
                        ? "bg-zinc-100 font-semibold text-zinc-950 dark:bg-zinc-900 dark:text-white"
                        : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900/50 dark:hover:text-zinc-200"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Left vertical active bar */}
                      {isActive && (
                        <span className="absolute top-1.5 bottom-1.5 left-0 w-1 rounded-r-full bg-zinc-950 dark:bg-white" />
                      )}
                      <span className="pl-1">{item.name}</span>
                      {item.isNew && (
                        <span className="py-0.2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-1.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
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

        {/* Community Section */}
        <div className="mb-8">
          <h5 className="mb-2 px-3 text-xs font-semibold text-zinc-900 dark:text-zinc-200">
            Community
          </h5>
          <ul className="relative space-y-0.5">
            <li>
              <a
                href="https://github.com/gpamdani-git/Hudbird-UI-Discus"
                target="_blank"
                rel="noreferrer"
                className="group relative flex items-center justify-between rounded-lg px-3 py-1.5 text-xs text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900/50 dark:hover:text-zinc-200"
              >
                <span className="pl-1">GitHub Discussions</span>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/gpamdani-git/Hudbird-UI-Discus/issues/new/choose"
                target="_blank"
                rel="noreferrer"
                className="group relative flex items-center justify-between rounded-lg px-3 py-1.5 text-xs text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900/50 dark:hover:text-zinc-200"
              >
                <span className="pl-1">Report an Issue</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};
