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
  Button,
} from "@hudbird/ui";
import { ArrowUpRight } from "lucide-react";
import { LandingActionButton, useLandingNavigation } from "../../LandingShared";
import { NavbarBrandMark } from "../NavbarBrandMark";
import { NavbarDrawerContent } from "../NavbarDrawerContent";
import type { NavbarProps } from "../types";
import { useNavbarScroll } from "../useNavbarScroll";

export function Nav06CreativeStudio({
  brand,
  content,
  brandContent,
  endContent,
  className,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navbarRef = React.useRef<HTMLElement>(null);
  const { visible, hrefFor } = useLandingNavigation();
  const { scrolled } = useNavbarScroll({ navbarRef });

  const links = content.links.filter((link) => "href" in link || visible.includes(link.target));
  const linkHref = (link: (typeof links)[number]) =>
    "href" in link ? link.href : hrefFor(`#${link.target}`);

  return (
    <div
      ref={navbarRef as any}
      data-navbar-preset="nav-06"
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled
          ? "border-b border-black/[0.08] bg-white/92 shadow-2xs backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#0c0d10]/92"
          : "border-b border-transparent bg-white/40 backdrop-blur-xs dark:bg-[#0c0d10]/40"
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
        {/* Left Mobile Menu Toggle on mobile */}
        <NavbarContent justify="start" className="lg:hidden">
          <NavbarItem>
            <NavbarMenuToggle
              aria-label="Toggle navigation menu"
              className="flex"
              onClick={() => setMobileOpen(!mobileOpen)}
            />
          </NavbarItem>
        </NavbarContent>

        {/* Left Navigation Links & Action (Desktop - Asymmetric CTA on Left) */}
        <NavbarContent justify="start" className="hidden items-center gap-1.5 sm:gap-2 lg:flex">
          <NavbarItem>
            <LandingActionButton action={content.action} />
          </NavbarItem>
          <div className="mx-1 h-3.5 w-px bg-zinc-200 dark:bg-zinc-800" aria-hidden="true" />
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

        {/* Right Logo (Asymmetric Studio Layout) */}
        <NavbarContent justify="end" className="gap-3">
          {endContent && <NavbarItem className="flex">{endContent}</NavbarItem>}
          <NavbarBrand position="right">
            <NavbarBrandMark
              brand={brand}
              brandContent={brandContent}
              tag="Studio"
              href={hrefFor("#landing-page")}
            />
          </NavbarBrand>
        </NavbarContent>

        {/* Mobile Left Drawer with Rich Links & Social Media */}
        <NavbarMenu
          variant="left"
          title={`${brand.name} — Studio`}
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
