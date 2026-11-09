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
  NavbarMegaMenu,
  Button,
  Grid,
} from "@hudbird/ui";
import {
  ChevronDown,
  Building2,
  Phone,
  Globe,
  Shield,
  Layers,
  FileText,
  ArrowRight,
} from "lucide-react";
import { LandingActionButton, useLandingNavigation } from "../../LandingShared";
import { NavbarBrandMark } from "../NavbarBrandMark";
import { NavbarDrawerContent } from "../NavbarDrawerContent";
import type { NavbarProps } from "../types";
import { useNavbarScroll } from "../useNavbarScroll";

export function Nav09CorporateEnterprise({
  brand,
  content,
  brandContent,
  endContent,
  className,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [megaOpen, setMegaOpen] = React.useState(false);
  const navbarRef = React.useRef<HTMLElement>(null);
  const { visible, hrefFor } = useLandingNavigation();
  const { scrolled } = useNavbarScroll({ navbarRef });

  const links = content.links.filter((link) => "href" in link || visible.includes(link.target));
  const linkHref = (link: (typeof links)[number]) =>
    "href" in link ? link.href : hrefFor(`#${link.target}`);

  return (
    <div
      ref={navbarRef as any}
      data-navbar-preset="nav-09"
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled
          ? "border-b border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
          : "border-b border-zinc-100 bg-white dark:border-zinc-800/80 dark:bg-zinc-950"
      } ${className ?? ""}`}
    >
      {/* Top Utility Row (Desktop Only) */}
      <div className="hidden border-b border-zinc-100 bg-zinc-50/70 px-4 py-1.5 text-[11px] text-zinc-500 lg:block dark:border-zinc-800/60 dark:bg-zinc-900/40 dark:text-zinc-400">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              All Systems Operational
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              Enterprise Desk: +1 (800) 483-2473
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#portal" className="hover:text-zinc-950 dark:hover:text-white">
              Client Portal
            </a>
            <a href="#compliance" className="hover:text-zinc-950 dark:hover:text-white">
              Security & Compliance
            </a>
            <span className="flex items-center gap-1 text-zinc-400">
              <Globe className="h-3 w-3" />
              EN (US)
            </span>
          </div>
        </div>
      </div>

      {/* Main Row */}
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
            tag="Enterprise"
            href={hrefFor("#landing-page")}
          />
        </NavbarBrand>

        {/* Center Links + Enterprise Mega Menu */}
        <NavbarContent justify="center" className="hidden gap-1 lg:flex">
          <NavbarItem>
            <Button
              variant="plain"
              size="sm"
              aria-expanded={megaOpen}
              onClick={() => setMegaOpen(!megaOpen)}
              className="hb-secondary flex items-center gap-1.5 rounded-lg px-3.5 py-2 !text-sm font-medium tracking-tight text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
            >
              <span>Capabilities</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  megaOpen ? "rotate-180" : ""
                }`}
              />
            </Button>
          </NavbarItem>

          {links.map((link) => (
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
        </NavbarContent>

        {/* Right CTA */}
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
        <NavbarMenu
          variant="right"
          title={`${brand.name} Enterprise`}
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

      {/* Enterprise Mega Menu */}
      <NavbarMegaMenu isOpen={megaOpen} onClose={() => setMegaOpen(false)}>
        <div className="grid grid-cols-1 gap-6 p-2 lg:grid-cols-3">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
              <Shield className="h-4 w-4 text-zinc-600 dark:text-zinc-300" />
              Governance & Risk
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Automated compliance frameworks and fine-grained role-based permission boundaries.
            </p>
            <a
              href="#governance"
              onClick={() => setMegaOpen(false)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-950 hover:underline dark:text-white"
            >
              Explore governance <ArrowRight className="h-3 w-3" />
            </a>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
              <Layers className="h-4 w-4 text-zinc-600 dark:text-zinc-300" />
              Multi-Region Architecture
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Zero-downtime data synchronization across 32 geographic edge availability zones.
            </p>
            <a
              href="#architecture"
              onClick={() => setMegaOpen(false)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-950 hover:underline dark:text-white"
            >
              System overview <ArrowRight className="h-3 w-3" />
            </a>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
              <FileText className="h-4 w-4 text-zinc-600 dark:text-zinc-300" />
              SLA & Whitepapers
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Download audited penetration reports, SOC2 Type II certifications, and financial
              disclosures.
            </p>
            <a
              href="#reports"
              onClick={() => setMegaOpen(false)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-950 hover:underline dark:text-white"
            >
              Download reports <ArrowRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </NavbarMegaMenu>
    </div>
  );
}
