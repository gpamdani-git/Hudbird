"use client";
import * as React from "react";
import {
  Button,
  Grid,
  Text,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMegaMenu,
} from "@hudbird/ui";
import type { BrandProfile, LandingSectionProps } from "@hudbird/schemas";
import { LandingFrame, LandingActionButton, useLandingNavigation } from "../LandingShared";

export function LandingNavbar({
  variant,
  content,
  brand,
  brandContent,
  endContent,
}: LandingSectionProps<"navbar"> & {
  brand: BrandProfile;
  brandContent?: React.ReactNode;
  endContent?: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const trigger = React.useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const wrapper = React.useRef<HTMLDivElement>(null);
  const menuId = React.useId();
  const { visible, hrefFor } = useLandingNavigation();
  const links = content.links.filter((link) => "href" in link || visible.includes(link.target));
  const linkHref = (link: (typeof links)[number]) =>
    "href" in link ? link.href : hrefFor(`#${link.target}`);
  const linkKey = (link: (typeof links)[number]) => ("href" in link ? link.href : link.target);
  React.useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    const outside = (event: MouseEvent) => {
      if (!wrapper.current?.contains(event.target as Node)) setOpen(false);
    };
    const doc = wrapper.current?.ownerDocument ?? document;
    doc.addEventListener("keydown", close);
    doc.addEventListener("mousedown", outside);
    wrapper.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus();
    return () => {
      doc.removeEventListener("keydown", close);
      doc.removeEventListener("mousedown", outside);
    };
  }, [open]);
  React.useEffect(() => setOpen(false), [variant, links.map(linkKey).join(",")]);
  return (
    <LandingFrame id="navbar" as="header" compact>
      <div
        ref={wrapper}
        className="relative"
        onKeyDown={(event) => {
          if (!open || !["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
          const items = Array.from(
            wrapper.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []
          );
          if (!items.length) return;
          const current = items.indexOf(
            wrapper.current?.ownerDocument.activeElement as HTMLElement
          );
          const next =
            event.key === "Home"
              ? 0
              : event.key === "End"
                ? items.length - 1
                : event.key === "ArrowDown"
                  ? (current + 1) % items.length
                  : (current - 1 + items.length) % items.length;
          event.preventDefault();
          items[next]?.focus();
        }}
      >
        <Navbar
          position="static"
          styleVariant="transparent"
          isBordered={false}
          maxWidth="full"
          lockScroll={false}
          className="[&>div]:px-0"
        >
          <NavbarBrand>
            <Button
              href={hrefFor("#landing-page")}
              variant="plain"
              className="hb-secondary px-0 text-lg"
            >
              {brandContent ?? (
                <>
                  {brand.logo && (
                    <img
                      src={brand.logo.src}
                      alt={brand.logo.alt}
                      width={28}
                      height={28}
                      className="h-7 w-7 object-contain"
                    />
                  )}
                  {brand.name}
                </>
              )}
            </Button>
          </NavbarBrand>
          <NavbarContent justify="end" className="gap-2">
            {variant === "simple" && (
              <NavbarItem className="hidden lg:flex">
                {links.slice(0, 3).map((link) => (
                  <Button
                    key={linkKey(link)}
                    href={linkHref(link)}
                    variant="plain"
                    size="sm"
                    className="hb-secondary"
                  >
                    {link.label}
                  </Button>
                ))}
              </NavbarItem>
            )}
            {endContent && <NavbarItem className="flex">{endContent}</NavbarItem>}
            {links.length > 0 && (
              <NavbarItem className={variant === "simple" ? "lg:hidden" : undefined}>
                <Button
                  ref={trigger}
                  variant="plain"
                  className="hb-secondary min-h-11"
                  aria-expanded={open}
                  aria-controls={menuId}
                  onClick={() => setOpen(!open)}
                >
                  {variant === "mega" ? "Explore product" : "Menu"}
                </Button>
              </NavbarItem>
            )}
            <NavbarItem className="hidden sm:flex">
              <LandingActionButton action={content.action} secondary />
            </NavbarItem>
          </NavbarContent>
        </Navbar>
        <NavbarMegaMenu id={menuId} isOpen={open} aria-label="Product navigation">
          <Grid cols={variant === "mega" ? 2 : 1} gap="md">
            {links.map((link) => (
              <div key={linkKey(link)} className="min-w-0">
                <Button
                  role="menuitem"
                  href={linkHref(link)}
                  variant="plain"
                  className="hb-secondary justify-start px-0"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Button>
                {variant === "mega" && (
                  <Text variant="small" className="text-muted-foreground mt-1">
                    {link.description}
                  </Text>
                )}
              </div>
            ))}
          </Grid>
        </NavbarMegaMenu>
      </div>
    </LandingFrame>
  );
}
