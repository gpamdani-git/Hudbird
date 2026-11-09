"use client";
import * as React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@hudbird/ui";
import { Menu, ArrowUpRight } from "lucide-react";
import { LandingActionButton, useLandingNavigation } from "../../LandingShared";
import { NavbarBrandMark } from "../NavbarBrandMark";
import type { NavbarProps } from "../types";
import { useNavbarScroll } from "../useNavbarScroll";

export function Nav05CreativeAgency({
  brand,
  content,
  brandContent,
  endContent,
  className,
}: NavbarProps) {
  const [fullscreenOpen, setFullscreenOpen] = React.useState(false);
  const navbarRef = React.useRef<HTMLElement>(null);
  const { visible, hrefFor } = useLandingNavigation();
  const { scrolled, hidden } = useNavbarScroll({
    hideOnScroll: true,
    isMenuOpen: fullscreenOpen,
    navbarRef,
  });

  const links = content.links.filter((link) => "href" in link || visible.includes(link.target));
  const linkHref = (link: (typeof links)[number]) =>
    "href" in link ? link.href : hrefFor(`#${link.target}`);

  return (
    <div
      ref={navbarRef as any}
      data-navbar-preset="nav-05"
      style={{
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease",
      }}
      className={`fixed inset-x-0 top-0 z-40 w-full ${
        scrolled
          ? "border-b border-black/[0.08] bg-white/95 backdrop-blur-2xl dark:border-white/[0.08] dark:bg-[#090a0d]/95"
          : "border-b border-transparent bg-transparent"
      } ${className ?? ""}`}
    >
      <Navbar
        position="static"
        styleVariant="transparent"
        isBordered={false}
        maxWidth="full"
        isMenuOpen={fullscreenOpen}
        onMenuOpenChange={setFullscreenOpen}
        className="px-4 sm:px-8"
      >
        {/* Left Editorial Brand */}
        <NavbarBrand>
          <NavbarBrandMark
            brand={brand}
            brandContent={brandContent}
            tag="STUDIO"
            href={hrefFor("#landing-page")}
          />
        </NavbarBrand>

        {/* Right Menu Trigger & Action */}
        <NavbarContent justify="end" className="gap-3">
          {endContent && <NavbarItem className="flex">{endContent}</NavbarItem>}
          <NavbarItem className="hidden md:flex">
            <LandingActionButton action={content.action} />
          </NavbarItem>
          <NavbarItem>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFullscreenOpen(true)}
              aria-label="Open fullscreen navigation menu"
              className="group flex items-center gap-2 rounded-full border-black/15 bg-white/80 px-4 py-1.5 text-xs font-bold tracking-wider text-zinc-950 uppercase shadow-xs backdrop-blur-md transition-all hover:bg-zinc-950 hover:text-white dark:border-white/20 dark:bg-zinc-900/80 dark:text-white dark:hover:bg-white dark:hover:text-zinc-950"
            >
              <span>Menu</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 transition-transform group-hover:scale-125" />
            </Button>
          </NavbarItem>
        </NavbarContent>

        {/* Fullscreen Dramatic Editorial Overlay */}
        <NavbarMenu
          variant="fullscreen"
          title={`${brand.name} — Index`}
          onClose={() => setFullscreenOpen(false)}
          footer={
            <div className="flex flex-col items-start justify-between gap-4 pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center dark:text-zinc-400">
              <div className="flex items-center gap-4">
                <span>
                  © {new Date().getFullYear()} {brand.name}
                </span>
                <span>•</span>
                <span>Global Digital Practice</span>
              </div>
              <div className="flex items-center gap-3">
                <LandingActionButton action={content.action} />
              </div>
            </div>
          }
        >
          <div className="my-auto grid grid-cols-1 gap-8 py-8 lg:grid-cols-12">
            {/* Left Col: Giant Section Links */}
            <div className="flex flex-col gap-2 lg:col-span-8">
              <span className="mb-2 font-mono text-[11px] tracking-[0.2em] text-zinc-400 uppercase dark:text-zinc-500">
                Navigation
              </span>
              {links.map((link, idx) => (
                <NavbarMenuItem key={link.label}>
                  <a
                    href={linkHref(link)}
                    onClick={() => setFullscreenOpen(false)}
                    className="group flex items-center justify-between py-2 text-2xl font-black tracking-tight text-zinc-900 transition-colors hover:text-zinc-500 sm:text-4xl lg:text-5xl dark:text-white dark:hover:text-zinc-400"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-xs text-zinc-400 sm:text-sm dark:text-zinc-600">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span>{link.label}</span>
                    </span>
                    <ArrowUpRight className="h-6 w-6 -translate-x-2 text-zinc-950 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 dark:text-white" />
                  </a>
                </NavbarMenuItem>
              ))}
            </div>

            {/* Right Col: Editorial Studio Coordinates */}
            <div className="flex flex-col justify-between space-y-6 border-t border-black/10 pt-6 lg:col-span-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8 dark:border-white/10">
              <div>
                <span className="mb-2 block font-mono text-[11px] tracking-[0.2em] text-zinc-400 uppercase dark:text-zinc-500">
                  Direct Inquiries
                </span>
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  hello@{brand.name.toLowerCase().replace(/\s+/g, "")}.com
                </p>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  Availability: Q3/Q4 Production Cycles
                </p>
              </div>

              <div>
                <span className="mb-2 block font-mono text-[11px] tracking-[0.2em] text-zinc-400 uppercase dark:text-zinc-500">
                  Locations
                </span>
                <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Studio Tokyo • Berlin • San Francisco
                </p>
              </div>

              <div>
                <span className="mb-2 block font-mono text-[11px] tracking-[0.2em] text-zinc-400 uppercase dark:text-zinc-500">
                  Social &amp; Networks
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/hudbird"
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 text-zinc-700 hover:text-zinc-950 dark:border-white/10 dark:text-zinc-300 dark:hover:text-white"
                    aria-label="GitHub"
                  >
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://x.com/hudbird"
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 text-zinc-700 hover:text-zinc-950 dark:border-white/10 dark:text-zinc-300 dark:hover:text-white"
                    aria-label="X (Twitter)"
                  >
                    <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </NavbarMenu>
      </Navbar>
    </div>
  );
}
