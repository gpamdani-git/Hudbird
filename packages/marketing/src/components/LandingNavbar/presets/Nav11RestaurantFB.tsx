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
import { UtensilsCrossed, Clock, ChevronDown } from "lucide-react";
import { LandingActionButton, useLandingNavigation } from "../../LandingShared";
import type { NavbarProps } from "../types";
import { useNavbarScroll } from "../useNavbarScroll";

export function Nav11RestaurantFB({
  brand,
  content,
  brandContent,
  endContent,
  className,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [menuDropdownOpen, setMenuDropdownOpen] = React.useState(false);
  const navbarRef = React.useRef<HTMLElement>(null);
  const { visible, hrefFor } = useLandingNavigation();
  const { scrolled } = useNavbarScroll({ navbarRef });

  const links = content.links.filter((link) => "href" in link || visible.includes(link.target));
  const linkHref = (link: (typeof links)[number]) =>
    "href" in link ? link.href : hrefFor(`#${link.target}`);

  return (
    <div
      ref={navbarRef as any}
      data-navbar-preset="nav-11"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-amber-900/10 bg-amber-50/95 shadow-sm backdrop-blur-2xl dark:border-amber-500/10 dark:bg-[#120f0d]/95"
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
        <NavbarBrand>
          <a
            href={hrefFor("#landing-page")}
            className="flex items-center gap-2.5 font-serif font-bold text-amber-950 transition-opacity hover:opacity-85 dark:text-amber-100"
          >
            {brandContent ?? (
              <>
                <UtensilsCrossed className="h-5 w-5 text-amber-700 dark:text-amber-400" />
                <span className="font-serif text-base font-bold tracking-wide">{brand.name}</span>
              </>
            )}
          </a>
        </NavbarBrand>

        {/* Center Culinary Links + Dropdown Menu */}
        <NavbarContent justify="center" className="hidden gap-1 lg:flex">
          {/* Menu Dropdown */}
          <NavbarItem className="relative">
            <Button
              variant="plain"
              size="sm"
              aria-expanded={menuDropdownOpen}
              onClick={() => setMenuDropdownOpen(!menuDropdownOpen)}
              className="hb-secondary flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-amber-950/80 hover:text-amber-950 dark:text-amber-200/80 dark:hover:text-amber-100"
            >
              <span>Menus & Seasonal</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  menuDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </Button>
            <NavbarDropdownMenu
              isOpen={menuDropdownOpen}
              onClose={() => setMenuDropdownOpen(false)}
              align="center"
              className="w-56 border-amber-900/10 bg-amber-50/95 p-2 dark:border-amber-500/10 dark:bg-[#181412]"
            >
              <div className="space-y-1 text-xs">
                <a
                  href="#tasting-menu"
                  onClick={() => setMenuDropdownOpen(false)}
                  className="block rounded-lg px-3 py-2 text-zinc-800 hover:bg-amber-100/60 dark:text-zinc-200 dark:hover:bg-white/5"
                >
                  Chef's Tasting Menu (7 Courses)
                </a>
                <a
                  href="#a-la-carte"
                  onClick={() => setMenuDropdownOpen(false)}
                  className="block rounded-lg px-3 py-2 text-zinc-800 hover:bg-amber-100/60 dark:text-zinc-200 dark:hover:bg-white/5"
                >
                  Dinner & Seasonal À la Carte
                </a>
                <a
                  href="#wine-pairing"
                  onClick={() => setMenuDropdownOpen(false)}
                  className="block rounded-lg px-3 py-2 text-zinc-800 hover:bg-amber-100/60 dark:text-zinc-200 dark:hover:bg-white/5"
                >
                  Sommelier Cellar & Pairings
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
                className="hb-secondary rounded-lg px-3.5 py-2 !text-sm font-medium tracking-tight text-amber-950/80 hover:text-amber-950 dark:text-amber-200/80 dark:hover:text-amber-100"
              >
                {link.label}
              </Button>
            </NavbarItem>
          ))}
        </NavbarContent>

        {/* Right Reservation Booking CTA */}
        <NavbarContent justify="end" className="gap-2.5">
          {endContent && <NavbarItem className="flex">{endContent}</NavbarItem>}
          <NavbarItem className="hidden sm:flex">
            <LandingActionButton
              action={{
                ...content.action,
                label: content.action.label || "Book a Table",
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

        {/* Mobile Right Drawer */}
        <NavbarMenu
          variant="right"
          title={`${brand.name} — Reservations`}
          onClose={() => setMobileOpen(false)}
          footer={
            <div className="flex flex-col gap-2 pt-2">
              <div className="flex items-center gap-2 pb-2 text-xs text-amber-900/70 dark:text-amber-300/70">
                <Clock className="h-3.5 w-3.5" />
                <span>Open Tue–Sun: 17:30 – 23:00</span>
              </div>
              <LandingActionButton action={content.action} className="w-full justify-center" />
            </div>
          }
        >
          {links.map((link) => (
            <NavbarMenuItem key={link.label}>
              <a
                href={linkHref(link)}
                onClick={() => setMobileOpen(false)}
                className="w-full font-serif text-base font-medium text-zinc-800 transition-colors hover:text-amber-700 dark:text-zinc-200 dark:hover:text-amber-300"
              >
                {link.label}
              </a>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </div>
  );
}
