import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@/components/ui";
import {
  Box,
  ChevronDown,
  Moon,
  Sun,
  ChevronRight,
  BarChart3,
  Shield,
  Blocks,
  BookOpen,
  Newspaper,
  Users,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const SaaSNavbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  useEffect(() => {
    // Check initial theme (Default to dark)
    const storedTheme = localStorage.getItem("theme");
    const shouldBeDark = storedTheme === "dark" || storedTheme === null;

    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
      if (storedTheme === null) {
        localStorage.setItem("theme", "dark");
      }
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const isDarkMode = document.documentElement.classList.toggle("dark");
    setIsDark(isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  };

  return (
    <>
      {/* Floating Navbar */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.35, delay: 0.1 }}
        className="fixed inset-x-0 top-4 z-[100] mx-auto w-full max-w-5xl px-4 sm:top-6"
      >
        <Navbar
          styleVariant="floating-full"
          position="static"
          className="!mt-0 !max-w-full !border-zinc-200/80 !bg-white/80 !px-2 !shadow-2xl !backdrop-blur-2xl transition-colors duration-500 dark:!border-white/10 dark:!bg-[#12141d]/85 [&>div:first-child]:!h-[56px] [&>div:first-child]:!px-2"
        >
          <NavbarBrand>
            <div className="flex items-center gap-2 pl-2">
              <img
                src="/assets/new-logo/hudbirdui-icon-black.svg"
                alt="Hudbird UI"
                className="h-6 w-6 object-contain dark:hidden"
              />
              <img
                src="/assets/new-logo/hudbirdui-icon-white.svg"
                alt="Hudbird UI"
                className="hidden h-6 w-6 object-contain dark:block"
              />
              <span className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
                Hudbird UI
              </span>
            </div>
          </NavbarBrand>

          <NavbarContent justify="center" className="gap-6">
            <NavbarItem>
              <Link
                to="/"
                className={`transition-colors ${isActive("/") ? "font-semibold text-blue-600 dark:text-blue-400" : "hover:opacity-80"}`}
              >
                Home
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                to="/about"
                className={`transition-colors ${isActive("/about") ? "font-semibold text-blue-600 dark:text-blue-400" : "hover:opacity-80"}`}
              >
                About
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Dropdown placement="bottom-start">
                <DropdownTrigger
                  className={`flex cursor-pointer items-center gap-1 transition-opacity outline-none ${isActive("/analytics") || isActive("/security") || isActive("/integrations") ? "font-semibold text-blue-600 dark:text-blue-400" : "hover:opacity-80"}`}
                >
                  Products <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                </DropdownTrigger>
                <DropdownMenu className="!mt-6 w-[280px] p-2 dark:border-white/10 dark:bg-[#161822]">
                  <DropdownItem
                    className={`h-auto py-3 ${isActive("/analytics") ? "bg-zinc-100 dark:bg-white/5" : ""}`}
                    onClick={() => navigate("/analytics")}
                    startContent={
                      <div className="flex shrink-0 items-center justify-center rounded-lg bg-zinc-100/50 p-2 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                        <BarChart3 className="h-5 w-5" />
                      </div>
                    }
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                        Analytics
                      </span>
                      <span className="mt-0.5 text-xs leading-snug font-normal whitespace-normal text-zinc-500 dark:text-zinc-400">
                        Track your team's performance
                      </span>
                    </div>
                  </DropdownItem>
                  <DropdownItem
                    className={`h-auto py-3 ${isActive("/security") ? "bg-zinc-100 dark:bg-white/5" : ""}`}
                    onClick={() => navigate("/security")}
                    startContent={
                      <div className="flex shrink-0 items-center justify-center rounded-lg bg-zinc-100/50 p-2 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
                        <Shield className="h-5 w-5" />
                      </div>
                    }
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                        Security
                      </span>
                      <span className="mt-0.5 text-xs leading-snug font-normal whitespace-normal text-zinc-500 dark:text-zinc-400">
                        Enterprise-grade protection
                      </span>
                    </div>
                  </DropdownItem>
                  <DropdownItem
                    className={`h-auto py-3 ${isActive("/integrations") ? "bg-zinc-100 dark:bg-white/5" : ""}`}
                    onClick={() => navigate("/integrations")}
                    startContent={
                      <div className="flex shrink-0 items-center justify-center rounded-lg bg-zinc-100/50 p-2 text-pink-600 dark:bg-pink-500/10 dark:text-pink-400">
                        <Blocks className="h-5 w-5" />
                      </div>
                    }
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                        Integrations
                      </span>
                      <span className="mt-0.5 text-xs leading-snug font-normal whitespace-normal text-zinc-500 dark:text-zinc-400">
                        Connect your favorite tools
                      </span>
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
            <NavbarItem>
              <Dropdown placement="bottom-start">
                <DropdownTrigger
                  className={`flex cursor-pointer items-center gap-1 transition-opacity outline-none ${isActive("/docs") || isActive("/blog") || isActive("/community") ? "font-semibold text-blue-600 dark:text-blue-400" : "hover:opacity-80"}`}
                >
                  Resources <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                </DropdownTrigger>
                <DropdownMenu className="!mt-6 w-[280px] p-2 dark:border-white/10 dark:bg-[#161822]">
                  <DropdownItem
                    className={`h-auto py-3`}
                    href="https://hudbird.vercel.app/#/docs"
                    target="_blank"
                    startContent={
                      <div className="flex shrink-0 items-center justify-center rounded-lg bg-zinc-100/50 p-2 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
                        <BookOpen className="h-5 w-5" />
                      </div>
                    }
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                        Documentation
                      </span>
                      <span className="mt-0.5 text-xs leading-snug font-normal whitespace-normal text-zinc-500 dark:text-zinc-400">
                        Learn how to use Taskk
                      </span>
                    </div>
                  </DropdownItem>
                  <DropdownItem
                    className={`h-auto py-3 ${isActive("/blog") ? "bg-zinc-100 dark:bg-white/5" : ""}`}
                    onClick={() => navigate("/blog")}
                    startContent={
                      <div className="flex shrink-0 items-center justify-center rounded-lg bg-zinc-100/50 p-2 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                        <Newspaper className="h-5 w-5" />
                      </div>
                    }
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                        Blog
                      </span>
                      <span className="mt-0.5 text-xs leading-snug font-normal whitespace-normal text-zinc-500 dark:text-zinc-400">
                        Latest updates and guides
                      </span>
                    </div>
                  </DropdownItem>
                  <DropdownItem
                    className={`h-auto py-3 ${isActive("/community") ? "bg-zinc-100 dark:bg-white/5" : ""}`}
                    onClick={() => navigate("/community")}
                    startContent={
                      <div className="flex shrink-0 items-center justify-center rounded-lg bg-zinc-100/50 p-2 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
                        <Users className="h-5 w-5" />
                      </div>
                    }
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                        Community
                      </span>
                      <span className="mt-0.5 text-xs leading-snug font-normal whitespace-normal text-zinc-500 dark:text-zinc-400">
                        Join the conversation
                      </span>
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
            <NavbarItem>
              <Link
                to="/pricing"
                className={`transition-colors ${isActive("/pricing") ? "font-semibold text-blue-600 dark:text-blue-400" : "hover:opacity-80"}`}
              >
                Pricing
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                to="/contact"
                className={`transition-colors ${isActive("/contact") ? "font-semibold text-blue-600 dark:text-blue-400" : "hover:opacity-80"}`}
              >
                Contact
              </Link>
            </NavbarItem>
          </NavbarContent>

          <NavbarContent justify="end">
            <button
              onClick={toggleTheme}
              className="mr-2 flex h-8 w-8 items-center justify-center rounded-full text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Link
              to="/login"
              className="mr-2 hidden text-sm font-medium hover:opacity-80 md:inline-flex"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="hidden rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 md:inline-flex dark:bg-[#1875ff] dark:hover:bg-blue-500"
            >
              Sign up
            </Link>
          </NavbarContent>

          <NavbarMenuToggle />

          <NavbarMenu
            variant="top"
            isContained={false}
            className="!bg-white/95 !backdrop-blur-3xl !backdrop-saturate-200 dark:!border-white/10 dark:!bg-[#070912]/95"
          >
            <NavbarMenuItem>
              <Link
                to="/"
                className={`block w-full transition-colors ${isActive("/") ? "font-semibold text-blue-600 dark:text-blue-400" : ""}`}
              >
                Home
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link
                to="/about"
                className={`block w-full transition-colors ${isActive("/about") ? "font-semibold text-blue-600 dark:text-blue-400" : ""}`}
              >
                About
              </Link>
            </NavbarMenuItem>

            {/* Mobile Dropdowns using NavbarMenuItem for consistency */}
            <div className="flex flex-col">
              <NavbarMenuItem onClick={() => setMobileProductsOpen(!mobileProductsOpen)}>
                <div
                  className={`flex w-full items-center justify-between ${isActive("/analytics") || isActive("/security") || isActive("/integrations") ? "font-semibold text-blue-600 dark:text-blue-400" : ""}`}
                >
                  <span>Products</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${mobileProductsOpen ? "rotate-180" : ""}`}
                  />
                </div>
              </NavbarMenuItem>
              <AnimatePresence>
                {mobileProductsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="flex flex-col overflow-hidden pl-4"
                  >
                    <NavbarMenuItem>
                      <Link
                        to="/analytics"
                        className={`block w-full transition-colors ${isActive("/analytics") ? "font-medium text-blue-600 dark:text-blue-400" : "text-zinc-500 dark:text-zinc-400"}`}
                      >
                        Analytics
                      </Link>
                    </NavbarMenuItem>
                    <NavbarMenuItem>
                      <Link
                        to="/security"
                        className={`block w-full transition-colors ${isActive("/security") ? "font-medium text-blue-600 dark:text-blue-400" : "text-zinc-500 dark:text-zinc-400"}`}
                      >
                        Security
                      </Link>
                    </NavbarMenuItem>
                    <NavbarMenuItem>
                      <Link
                        to="/integrations"
                        className={`block w-full transition-colors ${isActive("/integrations") ? "font-medium text-blue-600 dark:text-blue-400" : "text-zinc-500 dark:text-zinc-400"}`}
                      >
                        Integrations
                      </Link>
                    </NavbarMenuItem>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex flex-col">
              <NavbarMenuItem onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}>
                <div
                  className={`flex w-full items-center justify-between ${isActive("/docs") || isActive("/blog") || isActive("/community") ? "font-semibold text-blue-600 dark:text-blue-400" : ""}`}
                >
                  <span>Resources</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${mobileResourcesOpen ? "rotate-180" : ""}`}
                  />
                </div>
              </NavbarMenuItem>
              <AnimatePresence>
                {mobileResourcesOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="flex flex-col overflow-hidden pl-4"
                  >
                    <NavbarMenuItem>
                      <a
                        href="https://hudbird.vercel.app/#/docs"
                        target="_blank"
                        className={`block w-full text-zinc-500 transition-colors dark:text-zinc-400`}
                      >
                        Documentation
                      </a>
                    </NavbarMenuItem>
                    <NavbarMenuItem>
                      <Link
                        to="/blog"
                        className={`block w-full transition-colors ${isActive("/blog") ? "font-medium text-blue-600 dark:text-blue-400" : "text-zinc-500 dark:text-zinc-400"}`}
                      >
                        Blog
                      </Link>
                    </NavbarMenuItem>
                    <NavbarMenuItem>
                      <Link
                        to="/community"
                        className={`block w-full transition-colors ${isActive("/community") ? "font-medium text-blue-600 dark:text-blue-400" : "text-zinc-500 dark:text-zinc-400"}`}
                      >
                        Community
                      </Link>
                    </NavbarMenuItem>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavbarMenuItem>
              <Link
                to="/pricing"
                className={`block w-full transition-colors ${isActive("/pricing") ? "font-semibold text-blue-600 dark:text-blue-400" : ""}`}
              >
                Pricing
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link
                to="/contact"
                className={`block w-full transition-colors ${isActive("/contact") ? "font-semibold text-blue-600 dark:text-blue-400" : ""}`}
              >
                Contact
              </Link>
            </NavbarMenuItem>

            <div className="mt-6 flex flex-col gap-2">
              <Link
                to="/login"
                className="rounded-full border border-zinc-200 px-5 py-2 text-center text-sm font-medium hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-blue-600 px-5 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-[#1875ff] dark:hover:bg-blue-500"
              >
                Sign up
              </Link>
            </div>
          </NavbarMenu>
        </Navbar>
      </motion.div>
    </>
  );
};
