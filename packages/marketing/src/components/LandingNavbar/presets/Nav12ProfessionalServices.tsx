"use client";
import * as React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarDropdownMenu,
  Button,
} from "@hudbird/ui";
import { ChevronDown, Scale, Briefcase } from "lucide-react";
import { LandingActionButton, useLandingNavigation } from "../../LandingShared";
import { NavbarBrandMark } from "../NavbarBrandMark";
import { NavbarDrawerContent } from "../NavbarDrawerContent";
import type { NavbarProps } from "../types";
import { useNavbarScroll } from "../useNavbarScroll";

export function Nav12ProfessionalServices({
  brand,
  content,
  brandContent,
  endContent,
  className,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [practicesOpen, setPracticesOpen] = React.useState(false);
  const navbarRef = React.useRef<HTMLElement>(null);
  const { visible, hrefFor } = useLandingNavigation();
  const { scrolled } = useNavbarScroll({ navbarRef });

  const links = content.links.filter((link) => "href" in link || visible.includes(link.target));
  const linkHref = (link: (typeof links)[number]) =>
    "href" in link ? link.href : hrefFor(`#${link.target}`);

  return (
    <div
      ref={navbarRef as any}
      data-navbar-preset="nav-12"
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled
          ? "border-b border-zinc-200 bg-white/95 shadow-xs backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/95"
          : "border-b border-zinc-100 bg-white dark:border-zinc-800/80 dark:bg-zinc-950"
      } ${className ?? ""}`}
    >
      <Navbar
        position="static"
        styleVariant="transparent"
        isBordered={false}
        maxWidth="xl"
        isMenuOpen={mobileOpen}
        onMenuOpenChange={setMobileOpen}
        className="mx-auto max-w-6xl px-4 sm:px-6"
      >
        {/* Left Mobile Menu Toggle on mobile & tablet (when not full width) */}
        <NavbarContent justify="start" className="lg:hidden">
          <NavbarItem>
            <NavbarMenuToggle
              aria-label="Toggle navigation menu"
              className="flex"
              onClick={() => setMobileOpen(!mobileOpen)}
            />
          </NavbarItem>
        </NavbarContent>

        {/* Left Practice Area Links & Consultation Action (Desktop) */}
        <NavbarContent justify="start" className="hidden items-center gap-2 lg:flex">
          <NavbarItem>
            <LandingActionButton
              action={{
                ...content.action,
                label: content.action.label || "Book Consultation",
              }}
            />
          </NavbarItem>
          <div className="mx-1 h-3.5 w-px bg-zinc-200 dark:bg-zinc-800" aria-hidden="true" />

          {/* Practice Areas Dropdown */}
          <NavbarItem className="relative">
            <Button
              variant="plain"
              size="sm"
              aria-expanded={practicesOpen}
              onClick={() => setPracticesOpen(!practicesOpen)}
              className="hb-secondary flex items-center gap-1.5 rounded-lg px-3.5 py-2 !text-sm font-medium tracking-tight text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
            >
              <span>Practice Advisory</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  practicesOpen ? "rotate-180" : ""
                }`}
              />
            </Button>
            <NavbarDropdownMenu
              isOpen={practicesOpen}
              onClose={() => setPracticesOpen(false)}
              align="left"
              className="w-72 p-2"
            >
              <div className="space-y-1">
                <a
                  href="#corporate-law"
                  onClick={() => setPracticesOpen(false)}
                  className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-zinc-100/80 dark:hover:bg-white/[0.06]"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700 transition-colors group-hover:bg-white group-hover:shadow-xs dark:bg-white/10 dark:text-zinc-200 dark:group-hover:bg-white/20">
                    <Scale className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                      M&A and Transactions
                    </div>
                    <div className="mt-0.5 text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400">
                      Cross-border financing and entity structure
                    </div>
                  </div>
                </a>
                <a
                  href="#advisory"
                  onClick={() => setPracticesOpen(false)}
                  className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-zinc-100/80 dark:hover:bg-white/[0.06]"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700 transition-colors group-hover:bg-white group-hover:shadow-xs dark:bg-white/10 dark:text-zinc-200 dark:group-hover:bg-white/20">
                    <Briefcase className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                      Regulatory & Tax
                    </div>
                    <div className="mt-0.5 text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400">
                      Multi-jurisdictional compliance counsel
                    </div>
                  </div>
                </a>
              </div>
            </NavbarDropdownMenu>
          </NavbarItem>

          {links.map((link) => (
            <NavbarItem key={link.label}>
              <Button
                href={linkHref(link)}
                variant="plain"
                size="sm"
                className="hb-secondary rounded-lg px-3.5 py-2 !text-sm font-medium tracking-tight text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
              >
                {link.label}
              </Button>
            </NavbarItem>
          ))}
        </NavbarContent>

        {/* Right Wordmark (Corporate Layout) */}
        <NavbarContent justify="end" className="gap-3">
          {endContent && <NavbarItem className="flex">{endContent}</NavbarItem>}
          <NavbarBrand position="right">
            <NavbarBrandMark
              brand={brand}
              brandContent={brandContent}
              tag="LLP"
              href={hrefFor("#landing-page")}
            />
          </NavbarBrand>
        </NavbarContent>

        {/* Mobile Left Drawer */}
        <NavbarMenu
          variant="left"
          title={`${brand.name} — Counsel`}
          onClose={() => setMobileOpen(false)}
        >
          <NavbarDrawerContent
            brand={brand}
            links={links}
            linkHref={linkHref}
            action={content.action}
            onClose={() => setMobileOpen(false)}
          />
        </NavbarMenu>
      </Navbar>
    </div>
  );
}
