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
import { ChevronDown, Building2, ShieldCheck, ArrowRight } from "lucide-react";
import { LandingActionButton, useLandingNavigation } from "../../LandingShared";
import { NavbarBrandMark } from "../NavbarBrandMark";
import { NavbarDrawerContent } from "../NavbarDrawerContent";
import type { NavbarProps } from "../types";
import { useNavbarScroll } from "../useNavbarScroll";

export function Nav08CorporateClassic({
  brand,
  content,
  brandContent,
  endContent,
  className,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const navbarRef = React.useRef<HTMLElement>(null);
  const { visible, hrefFor } = useLandingNavigation();
  const { scrolled } = useNavbarScroll({ navbarRef });

  const links = content.links.filter((link) => "href" in link || visible.includes(link.target));
  const linkHref = (link: (typeof links)[number]) =>
    "href" in link ? link.href : hrefFor(`#${link.target}`);

  return (
    <div
      ref={navbarRef as any}
      data-navbar-preset="nav-08"
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled
          ? "border-b border-zinc-200 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-950"
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
        <NavbarBrand>
          <NavbarBrandMark
            brand={brand}
            brandContent={brandContent}
            tag="Corporate"
            href={hrefFor("#landing-page")}
          />
        </NavbarBrand>

        {/* Center Corporate Links with Dropdown Menu */}
        <NavbarContent justify="center" className="hidden gap-1.5 sm:gap-2 lg:flex">
          {links.slice(0, 2).map((link) => (
            <NavbarItem key={link.label}>
              <Button
                href={linkHref(link)}
                variant="plain"
                size="sm"
                className="hb-secondary rounded-lg px-3.5 py-2 !text-sm font-medium tracking-tight text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
              >
                {link.label}
              </Button>
            </NavbarItem>
          ))}

          {/* Solutions Dropdown Menu */}
          <NavbarItem className="relative">
            <Button
              variant="plain"
              size="sm"
              aria-expanded={dropdownOpen}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="hb-secondary flex items-center gap-1.5 rounded-lg px-3.5 py-2 !text-sm font-medium tracking-tight text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
            >
              <span>Solutions</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </Button>
            <NavbarDropdownMenu
              isOpen={dropdownOpen}
              onClose={() => setDropdownOpen(false)}
              align="left"
              className="w-64 p-3 shadow-lg"
            >
              <div className="space-y-1">
                <a
                  href={hrefFor("#features")}
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-start gap-2.5 rounded-lg p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <ShieldCheck className="mt-0.5 h-4 w-4 text-zinc-700 dark:text-zinc-300" />
                  <div>
                    <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                      Enterprise Compliance
                    </div>
                    <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      SOC2, ISO, and audit-ready infrastructure
                    </div>
                  </div>
                </a>
                <a
                  href={hrefFor("#pricing")}
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-start gap-2.5 rounded-lg p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <Building2 className="mt-0.5 h-4 w-4 text-zinc-700 dark:text-zinc-300" />
                  <div>
                    <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                      Volume Licensing
                    </div>
                    <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      Custom SLAs and dedicated clusters
                    </div>
                  </div>
                </a>
              </div>
            </NavbarDropdownMenu>
          </NavbarItem>

          {links.slice(2).map((link) => (
            <NavbarItem key={link.label}>
              <Button
                href={linkHref(link)}
                variant="plain"
                size="sm"
                className="hb-secondary px-3 py-1.5 text-xs font-medium text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
              >
                {link.label}
              </Button>
            </NavbarItem>
          ))}
        </NavbarContent>

        {/* Right Action */}
        <NavbarContent justify="end" className="gap-2.5">
          {endContent && <NavbarItem className="flex">{endContent}</NavbarItem>}
          <NavbarItem className="hidden sm:flex">
            <LandingActionButton action={content.action} />
          </NavbarItem>
          <NavbarItem className="lg:hidden">
            <NavbarMenuToggle
              aria-label="Toggle navigation menu"
              className="flex"
              onClick={() => setMobileOpen(!mobileOpen)}
            />
          </NavbarItem>
        </NavbarContent>

        {/* Mobile Right Drawer with Rich Links & Social Media */}
        <NavbarMenu variant="right" title={brand.name} onClose={() => setMobileOpen(false)}>
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
