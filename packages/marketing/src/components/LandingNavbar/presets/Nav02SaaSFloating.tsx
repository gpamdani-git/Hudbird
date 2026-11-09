"use client";
import * as React from "react";
import { motion } from "framer-motion";
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
import { LandingActionButton, useLandingNavigation } from "../../LandingShared";
import { NavbarBrandMark } from "../NavbarBrandMark";
import { NavbarDrawerContent } from "../NavbarDrawerContent";
import type { NavbarProps } from "../types";
import { useNavbarScroll } from "../useNavbarScroll";

export function Nav02SaaSFloating({
  brand,
  content,
  brandContent,
  endContent,
  className,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { visible, hrefFor } = useLandingNavigation();
  const { scrolled, hidden } = useNavbarScroll({
    hideOnScroll: true,
    isMenuOpen: mobileOpen,
    navbarRef: containerRef as any,
  });

  const links = content.links.filter((link) => "href" in link || visible.includes(link.target));
  const linkHref = (link: (typeof links)[number]) =>
    "href" in link ? link.href : hrefFor(`#${link.target}`);

  return (
    <>
      {/* In-flow spacer so following content (hero) is never cramped beneath floating pill */}
      <div className="h-14 w-full sm:h-16" aria-hidden="true" />
      <motion.div
        ref={containerRef}
        data-navbar-preset="nav-02"
        initial={false}
        animate={{
          y: hidden ? -90 : 0,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-3 z-40 mx-auto w-[calc(100%-2rem)] max-w-4xl transition-all sm:top-4 ${className ?? ""}`}
      >
        <div
          className={`rounded-full border transition-all duration-200 ${
            scrolled
              ? "border-black/[0.08] bg-white/92 px-3 py-1 shadow-lg shadow-black/5 backdrop-blur-2xl dark:border-white/[0.1] dark:bg-[#121316]/92 dark:shadow-black/30"
              : "border-black/[0.06] bg-white/80 px-3.5 py-1.5 shadow-sm backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#16171b]/80"
          }`}
        >
          <Navbar
            position="static"
            styleVariant="transparent"
            isBordered={false}
            maxWidth="full"
            isMenuOpen={mobileOpen}
            onMenuOpenChange={setMobileOpen}
            className="[&>div]:h-11 [&>div]:px-2"
          >
            <NavbarBrand>
              <NavbarBrandMark
                brand={brand}
                brandContent={brandContent}
                href={hrefFor("#landing-page")}
              />
            </NavbarBrand>

            {/* Center Floating Links */}
            <NavbarContent justify="center" className="hidden gap-1.5 lg:flex">
              {links.map((link) => (
                <NavbarItem key={link.label}>
                  <Button
                    href={linkHref(link)}
                    variant="plain"
                    size="sm"
                    className="hb-secondary rounded-full px-3.5 py-1.5 !text-sm font-medium tracking-tight text-zinc-600 transition-colors hover:bg-black/5 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
                  >
                    {link.label}
                  </Button>
                </NavbarItem>
              ))}
            </NavbarContent>

            {/* Right Action */}
            <NavbarContent justify="end" className="shrink-0 gap-2">
              {endContent && <NavbarItem className="flex shrink-0">{endContent}</NavbarItem>}
              <NavbarItem className="hidden shrink-0 sm:flex">
                <LandingActionButton action={content.action} />
              </NavbarItem>
              <NavbarItem className="shrink-0 lg:hidden">
                <NavbarMenuToggle
                  aria-label="Toggle navigation menu"
                  className="flex"
                  onClick={() => setMobileOpen(!mobileOpen)}
                />
              </NavbarItem>
            </NavbarContent>

            {/* Top Glass Drawer with Rich Links & Social Media */}
            <NavbarMenu variant="top" title={brand.name} onClose={() => setMobileOpen(false)}>
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
      </motion.div>
    </>
  );
}
