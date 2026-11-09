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
  IconBox,
  Text,
} from "@hudbird/ui";
import {
  ChevronDown,
  Layers,
  Compass,
  Plug,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { LandingActionButton, useLandingNavigation } from "../../LandingShared";
import { NavbarBrandMark } from "../NavbarBrandMark";
import { NavbarDrawerContent } from "../NavbarDrawerContent";
import type { NavbarProps } from "../types";
import { useNavbarScroll } from "../useNavbarScroll";

const featureIcons = [Sparkles, Zap, ShieldCheck, Layers, Plug, Compass];

export function Nav03SaaSPlatform({
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
      data-navbar-preset="nav-03"
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled
          ? "border-b border-black/[0.08] bg-white/95 shadow-xs backdrop-blur-2xl dark:border-white/[0.08] dark:bg-[#0c0d10]/95"
          : "border-b border-black/[0.05] bg-white/80 backdrop-blur-md dark:border-white/[0.05] dark:bg-[#0c0d10]/80"
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
            tag="Platform"
            href={hrefFor("#landing-page")}
          />
        </NavbarBrand>

        {/* Desktop Links with Mega Menu Trigger */}
        <NavbarContent justify="center" className="hidden gap-1.5 sm:gap-2 lg:flex">
          {/* Mega Menu Disclosure Button */}
          <NavbarItem>
            <Button
              variant="plain"
              size="sm"
              aria-expanded={megaOpen}
              onClick={() => setMegaOpen(!megaOpen)}
              className="hb-secondary flex items-center gap-1.5 rounded-lg px-3.5 py-2 !text-sm font-medium tracking-tight text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
            >
              <span>Platform & Products</span>
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
        <NavbarMenu
          variant="right"
          title={`${brand.name} Platform`}
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

      {/* Rich SaaS Mega Menu Panel (REF-01 & REF-04 inspired) */}
      <NavbarMegaMenu isOpen={megaOpen} onClose={() => setMegaOpen(false)}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left 8 Cols: 2-column feature/product link list */}
          <div className="lg:col-span-8">
            <div className="mb-4 text-xs font-bold tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
              Platform Solutions
            </div>
            <Grid cols={2} gap="sm">
              {links.map((link, idx) => {
                const Icon = featureIcons[idx % featureIcons.length];
                return (
                  <a
                    key={link.label}
                    href={linkHref(link)}
                    onClick={() => setMegaOpen(false)}
                    className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-zinc-50 dark:hover:bg-white/[0.04]"
                  >
                    <IconBox
                      size="sm"
                      variant="modern"
                      icon={Icon}
                      showGlow={false}
                      className="mt-0.5 shrink-0"
                    />
                    <div>
                      <div className="text-xs font-semibold text-zinc-900 group-hover:text-zinc-950 dark:text-zinc-100 dark:group-hover:text-white">
                        {link.label}
                      </div>
                      <div className="mt-0.5 text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400">
                        {link.description ||
                          "Deploy scalable cloud workflows with built-in telemetry."}
                      </div>
                    </div>
                  </a>
                );
              })}
            </Grid>
          </div>

          {/* Right 4 Cols: Featured Customer Story Card */}
          <div className="flex flex-col justify-between rounded-xl border border-black/[0.06] bg-zinc-50/70 p-5 lg:col-span-4 dark:border-white/[0.08] dark:bg-white/[0.02]">
            <div>
              <span className="inline-block rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                Customer Story
              </span>
              <h4 className="mt-3 text-sm font-bold text-zinc-900 dark:text-white">
                How Modern Teams Scale with {brand.name}
              </h4>
              <p className="mt-1.5 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                Learn how enterprise platforms reduced deployment latencies by 64% with our unified
                runtime.
              </p>
            </div>
            <a
              href={hrefFor("#cta")}
              onClick={() => setMegaOpen(false)}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-zinc-900 hover:underline dark:text-white"
            >
              <span>Read case study</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </NavbarMegaMenu>
    </div>
  );
}
