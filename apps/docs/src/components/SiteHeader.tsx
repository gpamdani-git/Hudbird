import React from "react";
import { HeroHeader } from "@hudbird/marketing";
import { Zap } from "lucide-react";
import { ThemeToggleButton, useTemplateTheme } from "./templates/TemplateThemeToggle";
import { Button } from "@hudbird/ui";
import { useNavigate, useLocation } from "react-router-dom";
import { ProPricingModal } from "./ProPricingModal";
import { DiscordIcon, GithubIcon } from "./SocialIcons";

export function SiteHeader() {
  const { theme, toggleTheme } = useTemplateTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isProModalOpen, setIsProModalOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigateAndScroll = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const activeClass =
    "text-sm font-medium text-blue-600 dark:text-blue-400 transition-colors cursor-pointer";
  const inactiveClass =
    "text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors cursor-pointer";

  const isHome = location.pathname === "/";
  const isTemplates = location.pathname.startsWith("/templates");
  const isDocs =
    location.pathname.startsWith("/installation") ||
    location.pathname.startsWith("/docs") ||
    location.pathname.startsWith("/components") ||
    location.pathname.startsWith("/blocks");

  const shouldHaveBackground = !isHome || isScrolled;

  return (
    <>
      <HeroHeader
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${
          shouldHaveBackground
            ? "border-b border-zinc-200 bg-white/80 py-2 backdrop-blur-md dark:border-white/10 dark:bg-[#030712]/80"
            : "border-transparent bg-transparent py-4"
        }`}
        logo={
          <a href="/#/" className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-blue-500" fill="currentColor" />
            <span className="font-outfit text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">
              hudbird UI
            </span>
          </a>
        }
        links={[
          {
            label: "Components",
            href: "#",
            onClick: (e: React.MouseEvent) => navigateAndScroll(e, "components"),
            className: isHome ? inactiveClass : inactiveClass, // Or custom logic if we track scroll spy
          },
          {
            label: "Features",
            href: "#",
            onClick: (e: React.MouseEvent) => navigateAndScroll(e, "features"),
            className: inactiveClass,
          },
          {
            label: "Docs",
            href: "/#/installation",
            className: isDocs ? activeClass : inactiveClass,
          },
          {
            label: "FAQ",
            href: "#",
            onClick: (e: React.MouseEvent) => navigateAndScroll(e, "faq"),
            className: inactiveClass,
          },
        ]}
        action={
          <div className="flex items-center gap-2.5">
            <a
              href="https://discord.gg/NPBspwkXke"
              target="_blank"
              rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200/80 bg-white/50 text-zinc-600 transition-colors hover:border-indigo-500/30 hover:bg-indigo-50 hover:text-[#5865F2] dark:border-white/10 dark:bg-white/5 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-[#5865F2]"
              title="Join Discord Community"
              aria-label="Discord"
            >
              <DiscordIcon className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/gpamdani-git/Hudbird"
              target="_blank"
              rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200/80 bg-white/50 text-zinc-600 transition-colors hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-900 dark:border-white/10 dark:bg-white/5 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
              title="GitHub Repository"
              aria-label="GitHub"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <ThemeToggleButton theme={theme} onToggle={toggleTheme} />
            <Button
              onClick={() => {
                const url = import.meta.env.DEV
                  ? "http://localhost:5174/"
                  : "https://starterkit-pro.vercel.app/";
                window.open(url, "_blank");
              }}
              className="relative overflow-hidden rounded-xl bg-blue-500 px-5 py-2 text-sm font-semibold text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all hover:bg-blue-600 hover:shadow-[0_0_28px_rgba(59,130,246,0.6)]"
            >
              <span className="relative z-10">Unlock PRO Templates</span>
              <div className="absolute inset-0 rounded-xl border-t border-white/20" />
            </Button>
          </div>
        }
      />
      <ProPricingModal isOpen={isProModalOpen} onClose={() => setIsProModalOpen(false)} />
    </>
  );
}
