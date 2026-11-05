import * as React from "react";
import {
  Button,
  NavigationMenu,
  NavigationMenuAction,
  NavigationMenuActions,
  NavigationMenuBar,
  NavigationMenuBrand,
  NavigationMenuContent,
  NavigationMenuGroup,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuMobile,
  NavigationMenuToggle,
  NavigationMenuTrigger,
} from "@hudbird/ui";
import { MotionConfig } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { hudbirdHomepageContent } from "../../data/hudbirdHomepage";
import type { ResolvedTheme } from "../../lib/homepageTheme";
import "./homepage-navigation.css";

const groups = [
  {
    title: "Getting started",
    links: [
      ["Introduction", "/docs"],
      ["Installation", "/installation"],
      ["CLI commands", "/cli"],
    ],
  },
  {
    title: "Core components",
    links: [
      ["Button", "/button"],
      ["Card", "/card"],
      ["Navigation menu", "/navigation-menu"],
    ],
  },
  {
    title: "Marketing sections",
    links: [
      ["Section collection", "/marketing/landing-sections"],
      ["Page builder", "/marketing/landing-builder"],
      ["Templates", "/templates"],
    ],
  },
  {
    title: "More components",
    links: [
      ["Layouts", "/grid"],
      ["Charts", "/area-chart"],
      ["Motion", "/motion"],
      ["Signature blocks", "/signature/morphing-island"],
    ],
  },
] as const;

function Directory() {
  return (
    <NavigationMenuGroup columns={4} className="hb-home-directory">
      {groups.map((group) => (
        <div key={group.title}>
          <p className="hb-home-directory-title">{group.title}</p>
          {group.links.map(([text, path]) => (
            <NavigationMenuLink key={path} href={`/#${path}`} className="hb-home-directory-link">
              {text}
            </NavigationMenuLink>
          ))}
        </div>
      ))}
    </NavigationMenuGroup>
  );
}

const primaryLinks = hudbirdHomepageContent.navbar.links.flatMap((link) =>
  link.href ? [{ label: link.label, href: link.href }] : []
);

export function HomepageNavigation({
  mode,
  onToggle,
}: {
  mode: ResolvedTheme;
  onToggle: () => void;
}) {
  const [menu, setMenu] = React.useState<string | null>(null);
  const [mobile, setMobile] = React.useState(false);
  const root = React.useRef<HTMLElement>(null);
  const nextMode = mode === "dark" ? "light" : "dark";
  const close = () => {
    setMenu(null);
    setMobile(false);
  };
  React.useEffect(() => {
    if (!mobile) return;
    function dismiss(event: PointerEvent) {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setMobile(false);
    }
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [mobile]);

  return (
    <div className="hb-home-nav-slot">
      <MotionConfig reducedMotion="user">
        <NavigationMenu
          ref={root}
          position="fixed"
          surface="transparent"
          scrollBehavior="elevate"
          scrollThreshold={36}
          className="hb-home-nav"
          value={menu}
          onValueChange={setMenu}
          mobileOpen={mobile}
          onMobileOpenChange={setMobile}
          onBlur={(event) => {
            if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) close();
          }}
          onClick={(event) => {
            if (event.target instanceof Element && event.target.closest("a[href]")) close();
          }}
        >
          <NavigationMenuBar maxWidth="full" className="hb-home-nav-bar">
            <NavigationMenuBrand
              href="/#/"
              aria-label="Hudbird UI home"
              onClick={() => window.scrollTo({ top: 0 })}
            >
              <img
                className="hb-home-nav-logo"
                src="/assets/logo/hudbird-logo-white.png"
                width={621}
                height={125}
                alt=""
              />
            </NavigationMenuBrand>
            <NavigationMenuList className="hb-home-nav-links">
              {primaryLinks.map(({ href, label }) => (
                <NavigationMenuItem key={href}>
                  <NavigationMenuLink href={href} className="hb-home-nav-link">
                    {label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem value="directory" className="hb-home-nav-directory-anchor">
                <NavigationMenuTrigger className="hb-home-nav-link">
                  More links
                </NavigationMenuTrigger>
                <NavigationMenuContent layout="mega" align="center" className="hb-home-nav-flyout">
                  <Directory />
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
            <NavigationMenuActions className="hb-home-nav-actions">
              <Button
                type="button"
                variant="plain"
                isIconOnly
                aria-label={`Use ${nextMode} theme`}
                onClick={onToggle}
                className="hb-home-nav-icon"
              >
                {mode === "dark" ? (
                  <Sun size={16} aria-hidden="true" />
                ) : (
                  <Moon size={16} aria-hidden="true" />
                )}
              </Button>
              <NavigationMenuAction
                href="/#/installation"
                intent="secondary"
                radius="full"
                className="hb-home-nav-cli"
              >
                <span aria-hidden="true" className="hb-home-nav-prompt">
                  ›<span>_</span>
                </span>{" "}
                Install CLI
              </NavigationMenuAction>
              <NavigationMenuToggle className="hb-home-nav-icon hb-home-nav-toggle" />
            </NavigationMenuActions>
          </NavigationMenuBar>
          <NavigationMenuMobile className="hb-home-nav-drawer">
            <div className="hb-home-nav-shortcuts">
              {primaryLinks.map(({ href, label }) => (
                <NavigationMenuLink key={href} href={href}>
                  {label}
                </NavigationMenuLink>
              ))}
            </div>
            <Directory />
          </NavigationMenuMobile>
        </NavigationMenu>
      </MotionConfig>
    </div>
  );
}
