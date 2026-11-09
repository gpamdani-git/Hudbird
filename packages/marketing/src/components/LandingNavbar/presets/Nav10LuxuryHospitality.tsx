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
import { Calendar, Compass, Phone } from "lucide-react";
import { LandingActionButton, useLandingNavigation } from "../../LandingShared";
import type { NavbarProps } from "../types";
import { useNavbarScroll } from "../useNavbarScroll";

export function Nav10LuxuryHospitality({
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
    <>
      <div
        ref={navbarRef as any}
        data-navbar-preset="nav-10"
        className={`fixed inset-x-0 top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-black/[0.08] bg-[#0d0e12]/95 text-white shadow-md backdrop-blur-2xl dark:border-white/[0.1] dark:bg-[#08080a]/95"
            : "border-b border-white/10 bg-black/40 text-white backdrop-blur-xs"
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
          {/* Left Split Links */}
          <NavbarContent justify="start" className="flex-1">
            <div className="hidden items-center gap-1.5 sm:gap-2 lg:flex">
              {leftLinks.map((link) => (
                <NavbarItem key={link.label}>
                  <Button
                    href={linkHref(link)}
                    variant="plain"
                    size="sm"
                    className="hb-secondary rounded-lg px-3.5 py-2 !text-sm font-medium tracking-wide text-zinc-200 uppercase hover:text-white dark:text-zinc-300 dark:hover:text-white"
                  >
                    {link.label}
                  </Button>
                </NavbarItem>
              ))}
            </div>
          </NavbarContent>

          {/* Center Brand */}
          <NavbarBrand position="center">
            <a
              href={hrefFor("#landing-page")}
              className="flex flex-col items-center justify-center text-center font-serif text-white transition-opacity hover:opacity-85"
            >
              {brandContent ?? (
                <>
                  <span className="font-serif text-xl font-normal tracking-[0.25em] uppercase">
                    {brand.name}
                  </span>
                  <span className="text-[9px] tracking-[0.35em] text-amber-200/80 uppercase">
                    Resort & Sanctuary
                  </span>
                </>
              )}
            </a>
          </NavbarBrand>

          {/* Right Split Links & Booking Button */}
          <NavbarContent justify="end" className="flex-1 gap-2.5">
            <div className="hidden items-center gap-1.5 sm:gap-2 lg:flex">
              {rightLinks.map((link) => (
                <NavbarItem key={link.label}>
                  <Button
                    href={linkHref(link)}
                    variant="plain"
                    size="sm"
                    className="hb-secondary rounded-lg px-3.5 py-2 !text-sm font-medium tracking-wide text-zinc-200 uppercase hover:text-white dark:text-zinc-300 dark:hover:text-white"
                  >
                    {link.label}
                  </Button>
                </NavbarItem>
              ))}
            </div>

            {endContent && <NavbarItem className="flex">{endContent}</NavbarItem>}
            <NavbarItem className="hidden sm:flex">
              <LandingActionButton
                action={{
                  ...content.action,
                  label: content.action.label || "Reserve Stay",
                }}
              />
            </NavbarItem>
            <NavbarItem className="lg:hidden">
              <NavbarMenuToggle
                aria-label="Toggle navigation menu"
                className="flex"
                onClick={() => setMobileOpen(!mobileOpen)}
              />
            </NavbarItem>
          </NavbarContent>

          {/* Fullscreen Luxury Modal */}
          <NavbarMenu
            variant="fullscreen"
            title={`${brand.name} — Concierge`}
            onClose={() => setMobileOpen(false)}
            footer={
              <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-zinc-400 sm:flex-row">
                <div className="flex items-center gap-2">
                  <Compass className="h-4 w-4 text-amber-300" />
                  <span>Private Valet & Heliport Services Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-zinc-400" />
                  <span>Concierge: +1 (888) 589-8791</span>
                </div>
              </div>
            }
          >
            <div className="flex flex-col items-center justify-center gap-6 py-12">
              {links.map((link) => (
                <NavbarMenuItem key={link.label}>
                  <a
                    href={linkHref(link)}
                    onClick={() => setMobileOpen(false)}
                    className="text-center font-serif text-2xl tracking-[0.2em] text-zinc-100 uppercase transition-colors hover:text-amber-200"
                  >
                    {link.label}
                  </a>
                </NavbarMenuItem>
              ))}
            </div>
          </NavbarMenu>
        </Navbar>
      </div>
      {/* Document flow spacer for fixed navbar */}
      <div className="h-16 w-full" aria-hidden="true" />
    </>
  );
}
