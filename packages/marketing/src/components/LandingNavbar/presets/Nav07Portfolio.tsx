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

export function Nav07Portfolio({
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

  const half = Math.ceil(links.length / 2);
  const leftLinks = links.slice(0, half);
  const rightLinks = links.slice(half);

  return (
    <div
      ref={navbarRef as any}
      data-navbar-preset="nav-07"
      className={`fixed inset-x-0 top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-black/[0.08] bg-white/90 shadow-2xs backdrop-blur-2xl dark:border-white/[0.08] dark:bg-[#0c0d10]/90"
          : "border-b border-transparent bg-transparent"
      } ${className ?? ""}`}
    >
      <Navbar
        position="static"
        styleVariant="transparent"
        isBordered={false}
        maxWidth="lg"
        isMenuOpen={mobileOpen}
        onMenuOpenChange={setMobileOpen}
        className="mx-auto max-w-5xl px-4 sm:px-6"
      >
        {/* Left Links */}
        <NavbarContent justify="start" className="flex-1">
          <div className="hidden items-center gap-1.5 sm:gap-2 lg:flex">
            {leftLinks.map((link) => (
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
          </div>
        </NavbarContent>

        {/* Center Creator Logo */}
        <NavbarBrand position="center">
          <NavbarBrandMark
            brand={brand}
            brandContent={brandContent}
            tag="Folio"
            href={hrefFor("#landing-page")}
          />
        </NavbarBrand>

        {/* Right Links & Action */}
        <NavbarContent justify="end" className="flex-1 gap-2.5">
          <div className="hidden items-center gap-1.5 sm:gap-2 lg:flex">
            {rightLinks.map((link) => (
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
          </div>

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

        {/* Fullscreen Portfolio Overlay with Rich Links & Social Media */}
        <NavbarMenu
          variant="fullscreen"
          title={`${brand.name} — Selected Works`}
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
