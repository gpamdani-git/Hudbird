// apps/docs/src/pages/NavbarDoc.tsx
import navbarCode from "../../../../packages/core/src/components/Navbar/Navbar.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import React, { useState } from "react";
import { PageToolbar } from "../components/PageToolbar";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMegaMenu,
  NavbarDropdownMenu,
  Button,
  Avatar,
  Badge,
  Input,
  type NavbarPosition,
  type NavbarMaxWidth,
  type NavbarLogoPosition,
  type NavbarStyleVariant,
  type NavbarMobileMenuVariant,
} from "@hudbird/ui";
import {
  Search,
  Bell,
  Layers,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Command,
  Globe,
  Compass,
  Sliders,
  ShieldCheck,
  ShoppingBag,
  Tag,
  ArrowRight,
  Flame,
  Watch,
  Shirt,
  Smartphone,
  Laptop,
  Maximize2,
  PanelLeft,
  PanelRight,
  ArrowDownToLine,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { ComponentPreview } from "../components/ComponentPreview";
import { IframePreview } from "../components/IframePreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";

export const navbarTocItems = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "standard-navbar", title: "Standard Web Page Navbar" },
      { id: "mobile-drawer-variants", title: "4 Mobile Drawer Variations" },
      { id: "drawer-variant-top", title: "1. Top Slide-Down Drawer" },
      { id: "drawer-variant-left", title: "2. Left Side Drawer (De Vorm)" },
      { id: "drawer-variant-right", title: "3. Right Side Drawer (Avenoria)" },
      { id: "drawer-variant-fullscreen", title: "4. Fullscreen Dramatic Overlay" },
      { id: "logo-configurations", title: "Logo Configurations (Left, Center, Right)" },
      { id: "visual-styles", title: "Visual Styles (Glassmorphism, Transparent, Floating)" },
      { id: "mega-menu", title: "E-Commerce Mega Menu" },
      { id: "admin-navbar", title: "Admin Dashboard Navbar" },
      { id: "customizer-playground", title: "Interactive Navbar Playground" },
    ],
  },
];

export default function NavbarDoc() {
  const [heroMenuOpen, setHeroMenuOpen] = useState(false);
  const [standardMenuOpen, setStandardMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("features");

  // Individual Mobile Drawer Variants States
  const [topDrawerOpen, setTopDrawerOpen] = useState(true);
  const [topActiveItem, setTopActiveItem] = useState("Products");

  const [leftDrawerOpen, setLeftDrawerOpen] = useState(true);
  const [leftActiveItem, setLeftActiveItem] = useState("Products");

  const [rightDrawerOpen, setRightDrawerOpen] = useState(true);
  const [rightActiveItem, setRightActiveItem] = useState("Men's Store");

  const [fullscreenDrawerOpen, setFullscreenDrawerOpen] = useState(true);
  const [fullscreenActiveItem, setFullscreenActiveItem] = useState("Home");

  // Logo config state
  const [selectedLogoPos, setSelectedLogoPos] = useState<NavbarLogoPosition>("center");
  const [logoMenuOpen, setLogoMenuOpen] = useState(false);

  // Visual style state
  const [selectedStyle, setSelectedStyle] = useState<NavbarStyleVariant>("floating-full");
  const [styleMenuOpen, setStyleMenuOpen] = useState(false);

  // Mega Menu state
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  // Admin state
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);

  // Playground state
  const [playPosition, setPlayPosition] = useState<NavbarPosition>("static");
  const [playLogoPos, setPlayLogoPos] = useState<NavbarLogoPosition>("left");
  const [playStyleVariant, setPlayStyleVariant] = useState<NavbarStyleVariant>("glassmorphism");
  const [playMobileVariant, setPlayMobileVariant] = useState<NavbarMobileMenuVariant>("top");
  const [playIsBordered, setPlayIsBordered] = useState(true);
  const [playIsBlurred, setPlayIsBlurred] = useState(true);
  const [playMaxWidth, setPlayMaxWidth] = useState<NavbarMaxWidth>("full");
  const [playActiveItem, setPlayActiveItem] = useState("Dashboard");
  const [playMenuOpen, setPlayMenuOpen] = useState(false);

  const apiRows: ApiPropRow[] = [
    {
      prop: "styleVariant",
      defaultVal: "'glassmorphism'",
      description: (
        <span>
          Aesthetic visual container style:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'glassmorphism'
          </code>{" "}
          (translucent frosted blur),{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'transparent'
          </code>{" "}
          (seamless background), or{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'floating-full'
          </code>{" "}
          (pill container with shadow).
        </span>
      ),
    },
    {
      prop: "mobileMenuVariant",
      defaultVal: "'top'",
      description: (
        <span>
          Drawer animation and presentation on mobile devices:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'top'
          </code>{" "}
          (slide down from navbar),{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'left'
          </code>{" "}
          (slide-in side drawer from left),{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'right'
          </code>{" "}
          (slide-in side drawer from right), or{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'fullscreen'
          </code>{" "}
          (100% dramatic viewport takeover).
        </span>
      ),
    },
    {
      prop: "logoPosition",
      defaultVal: "'left'",
      description: (
        <span>
          Controls placement and layout balance:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'left'
          </code>
          ,{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'center'
          </code>{" "}
          (with split navigation), or{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'right'
          </code>
          .
        </span>
      ),
    },
    {
      prop: "layout",
      defaultVal: "'standard'",
      description: (
        <span>
          Layout architecture mode:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'standard'
          </code>{" "}
          (public web & marketing) or{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'admin'
          </code>{" "}
          (dashboard with command search).
        </span>
      ),
    },
    {
      prop: "position",
      defaultVal: "'sticky'",
      description: (
        <span>
          CSS positioning behaviour:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'static'
          </code>
          ,{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'sticky'
          </code>{" "}
          (anchors to top during scroll), or{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'fixed'
          </code>
          .
        </span>
      ),
    },
    {
      prop: "isBordered",
      defaultVal: "true",
      description: "Renders a subtle 1px border separator beneath the navigation bar.",
    },
    {
      prop: "isBlurred",
      defaultVal: "true",
      description: "Enables frosted glassmorphism backdrop blur (backdrop-blur-md).",
    },
    {
      prop: "isMenuOpen",
      defaultVal: "undefined",
      description: "Controlled boolean flag for opening or closing the responsive mobile drawer.",
    },
    {
      prop: "onMenuOpenChange",
      defaultVal: "undefined",
      description: "Callback triggered whenever the user clicks the NavbarMenuToggle.",
    },
    {
      prop: "isContained",
      defaultVal: "false",
      description:
        "When true, confines drawer transitions strictly within its parent container (ideal for simulated device frames).",
    },
    {
      prop: "lockScroll",
      defaultVal: "true",
      description: "Automatically disables document.body scrolling while a mobile drawer is open.",
    },
  ];

  return (
    <div className="space-y-16 pb-24">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="w-full min-w-0 flex-1 pr-4">
          <div className="mb-3 flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
              Navbar
            </h1>
            <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              Component
            </span>
          </div>
          <p className="pr-8 text-base text-zinc-600 dark:text-zinc-400">
            A production-grade, highly responsive navigation bar engineered with TypeScript,
            Tailwind CSS, and Class Variance Authority (CVA). Features mechanical Framer Motion
            hamburger transitions, 4 mobile drawer variants, multi-column E-commerce Mega Menus,
            floating pills, and flexible logo placements.
          </p>
        </div>
        <PageToolbar />
      </div>

      {/* Hero Preview */}
      <section className="space-y-4">
        <ComponentPreview>
          <div className="w-full py-4">
            <div className="relative min-h-[460px] w-full overflow-hidden rounded-2xl border border-zinc-200 shadow-sm dark:border-zinc-800">
              <Navbar
                position="static"
                styleVariant="glassmorphism"
                isMenuOpen={heroMenuOpen}
                onMenuOpenChange={setHeroMenuOpen}
                isContained
              >
                <NavbarContent justify="start">
                  <NavbarMenuToggle className="md:hidden" />
                  <NavbarBrand>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-sm font-black text-white dark:bg-white dark:text-zinc-900">
                        ⚡
                      </div>
                      <span className="text-base font-bold tracking-tight whitespace-nowrap text-zinc-900 dark:text-zinc-50">
                        Acme Studio
                      </span>
                    </div>
                  </NavbarBrand>
                </NavbarContent>

                {/* Desktop Menu - Hidden on Mobile */}
                <NavbarContent justify="center" className="hidden md:flex">
                  <NavbarItem
                    isActive={activeTab === "overview"}
                    onClick={() => setActiveTab("overview")}
                  >
                    Overview
                  </NavbarItem>
                  <NavbarItem
                    isActive={activeTab === "features"}
                    onClick={() => setActiveTab("features")}
                  >
                    Features
                  </NavbarItem>
                  <NavbarItem
                    isActive={activeTab === "pricing"}
                    onClick={() => setActiveTab("pricing")}
                  >
                    Pricing
                  </NavbarItem>
                  <NavbarItem isActive={activeTab === "docs"} onClick={() => setActiveTab("docs")}>
                    Documentation
                  </NavbarItem>
                </NavbarContent>

                <NavbarContent justify="end">
                  <NavbarItem className="hidden sm:flex">
                    <Button size="sm" variant="plain">
                      Sign In
                    </Button>
                  </NavbarItem>
                  <NavbarItem>
                    <Button size="sm" color="dark" variant="solid">
                      Get Started
                    </Button>
                  </NavbarItem>
                </NavbarContent>

                {/* Hero Mobile Drawer */}
                <NavbarMenu isContained>
                  {["Overview", "Features", "Pricing", "Documentation"].map((tab) => (
                    <NavbarMenuItem
                      key={tab}
                      isActive={activeTab.toLowerCase() === tab.toLowerCase()}
                      onClick={() => {
                        setActiveTab(tab.toLowerCase());
                        setHeroMenuOpen(false);
                      }}
                    >
                      <div className="flex w-full items-center justify-between">
                        <span>{tab}</span>
                        <ChevronRight size={14} className="text-zinc-400" />
                      </div>
                    </NavbarMenuItem>
                  ))}
                  <div className="mt-2 flex flex-col gap-2 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                    <Button
                      size="sm"
                      variant="outline"
                      color="zinc"
                      className="w-full justify-center"
                    >
                      Sign In
                    </Button>
                    <Button size="sm" color="dark" className="w-full justify-center">
                      Get Started
                    </Button>
                  </div>
                </NavbarMenu>
              </Navbar>

              <div className="bg-zinc-50/50 p-8 text-center dark:bg-zinc-900/30">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Active Page:{" "}
                  <strong className="font-semibold text-zinc-900 capitalize dark:text-zinc-100">
                    {activeTab}
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </ComponentPreview>

        <CodeBlock
          code={`import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button } from '@hudbird/ui'

export default function StandardNavbarExample() {
  const [activeTab, setActiveTab] = useState('features')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <Navbar
      position="sticky"
      styleVariant="glassmorphism"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent justify="start">
        <NavbarMenuToggle className="md:hidden" />
        <NavbarBrand>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-bold">⚡</div>
            <span className="font-bold">Acme Studio</span>
          </div>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="center" className="hidden md:flex">
        <NavbarItem isActive={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>Overview</NavbarItem>
        <NavbarItem isActive={activeTab === 'features'} onClick={() => setActiveTab('features')}>Features</NavbarItem>
        <NavbarItem isActive={activeTab === 'pricing'} onClick={() => setActiveTab('pricing')}>Pricing</NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          <Button size="sm" variant="plain">Sign In</Button>
        </NavbarItem>
        <NavbarItem>
          <Button size="sm" color="dark">Get Started</Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem isActive>Overview</NavbarMenuItem>
        <NavbarMenuItem>Features</NavbarMenuItem>
        <NavbarMenuItem>Pricing</NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  )
}`}
        />
      </section>
      <div id="installation" className="scroll-mt-24 space-y-4">
        <InstallationTabs componentName="navbar" manualCode={navbarCode} />
      </div>

      {/* Component API */}
      <section id="component-api" className="scroll-mt-24 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Component API
        </h2>
        <ApiTable
          note="Navbar is structured into modular sub-components: Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, NavbarMegaMenu, and NavbarDropdownMenu."
          rows={apiRows}
        />
      </section>

      {/* Examples Header */}
      <section id="examples" className="scroll-mt-24 space-y-14">
        <div>
          <h2 className="mb-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Examples
          </h2>
        </div>

        {/* 1. Standard Navbar */}
        <div id="standard-navbar" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Standard Web Page Navbar
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            A clean, balanced layout with Brand/Logo on the start, centered navigation tabs with
            active indicator underlines, and primary call-to-action buttons on the end without text
            collisions:
          </p>

          <ComponentPreview>
            <div className="w-full py-2">
              <div className="relative min-h-[400px] w-full overflow-hidden rounded-xl border border-zinc-200 shadow-xs dark:border-zinc-800">
                <Navbar
                  position="static"
                  isBordered
                  isMenuOpen={standardMenuOpen}
                  onMenuOpenChange={setStandardMenuOpen}
                  isContained
                >
                  <NavbarContent justify="start">
                    <NavbarMenuToggle />
                    <NavbarBrand>
                      <div className="flex shrink-0 items-center gap-2">
                        <div className="rounded-lg bg-indigo-500 p-1.5 text-white">
                          <Layers size={16} />
                        </div>
                        <span className="text-sm font-bold whitespace-nowrap text-zinc-900 dark:text-zinc-100">
                          Polymer Design
                        </span>
                      </div>
                    </NavbarBrand>
                  </NavbarContent>

                  <NavbarContent justify="center">
                    <NavbarItem isActive>Products</NavbarItem>
                    <NavbarItem>Solutions</NavbarItem>
                    <NavbarItem>Enterprise</NavbarItem>
                  </NavbarContent>

                  <NavbarContent justify="end">
                    <NavbarItem className="hidden sm:flex">
                      <Button size="sm" variant="outline" color="zinc">
                        Contact Sales
                      </Button>
                    </NavbarItem>
                    <NavbarItem>
                      <Button size="sm" color="primary">
                        Deploy Now
                      </Button>
                    </NavbarItem>
                  </NavbarContent>

                  <NavbarMenu isContained>
                    {["Products", "Solutions", "Enterprise", "Pricing", "Documentation"].map(
                      (tab) => (
                        <NavbarMenuItem key={tab} onClick={() => setStandardMenuOpen(false)}>
                          <div className="flex w-full items-center justify-between">
                            <span>{tab}</span>
                            <ChevronRight size={14} className="text-zinc-400" />
                          </div>
                        </NavbarMenuItem>
                      )
                    )}
                    <div className="mt-2 flex flex-col gap-2 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                      <Button
                        size="sm"
                        variant="outline"
                        color="zinc"
                        className="w-full justify-center"
                      >
                        Contact Sales
                      </Button>
                      <Button size="sm" color="primary" className="w-full justify-center">
                        Deploy Now
                      </Button>
                    </div>
                  </NavbarMenu>
                </Navbar>
              </div>
            </div>
          </ComponentPreview>
        </div>

        {/* 2. Mobile Drawer Variations (Isolated Iframe Simulators) */}
        <div id="mobile-drawer-variants" className="scroll-mt-24 space-y-12">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              <span>4 Mobile Drawer Variations</span>
              <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[11px] font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                Framer Motion & Isolated Viewport
              </span>
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Each mobile drawer variant is rendered inside an isolated 1:1 mobile iframe container
              (390px viewport). This decouples internal component positioning, z-indexes, and media
              queries from documentation layouts for pristine real-device fidelity.
            </p>
          </div>

          {/* 1. Top Slide-Down Drawer */}
          <div id="drawer-variant-top" className="scroll-mt-24 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="flex items-center gap-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  <ArrowDownToLine size={16} className="text-indigo-500" />
                  <span>1. Top Slide-Down Drawer</span>
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Standard mobile navigation banner that smoothly drops down immediately below the
                  navigation bar header.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                color="indigo"
                onClick={() => setTopDrawerOpen(!topDrawerOpen)}
                className="text-xs"
              >
                {topDrawerOpen ? "Close Drawer" : "Open Drawer"}
              </Button>
            </div>

            <ComponentPreview>
              <div className="w-full py-4">
                <div className="relative flex min-h-[640px] w-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm select-none dark:border-zinc-800 dark:bg-zinc-950">
                  <Navbar
                    position="static"
                    isBordered
                    mobileMenuVariant="top"
                    isMenuOpen={topDrawerOpen}
                    onMenuOpenChange={setTopDrawerOpen}
                    className="shrink-0 rounded-t-2xl bg-white/95 dark:bg-zinc-950/95"
                    isContained
                  >
                    <NavbarContent justify="start">
                      <NavbarMenuToggle />
                      <NavbarBrand>
                        <div className="flex items-center gap-1.5">
                          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-600 text-xs font-bold text-white">
                            ✦
                          </div>
                          <span className="text-sm font-extrabold tracking-tight">
                            Vapor Studio
                          </span>
                        </div>
                      </NavbarBrand>
                    </NavbarContent>

                    <NavbarContent justify="end">
                      <Button
                        size="sm"
                        color="indigo"
                        variant="solid"
                        className="h-7 px-2.5 text-xs"
                      >
                        Join
                      </Button>
                    </NavbarContent>

                    <NavbarMenu
                      variant="top"
                      title="Navigation Menu"
                      footer={
                        <div className="flex flex-col gap-2">
                          <Button
                            size="sm"
                            color="indigo"
                            className="w-full justify-center text-xs"
                          >
                            Get Started Free
                          </Button>
                        </div>
                      }
                    >
                      {["Products", "Features", "Pricing", "Integrations", "Documentation"].map(
                        (item) => (
                          <NavbarMenuItem
                            key={item}
                            isActive={topActiveItem === item}
                            onClick={() => {
                              setTopActiveItem(item);
                              setTopDrawerOpen(false);
                            }}
                          >
                            <div className="flex w-full items-center justify-between">
                              <span className="text-sm font-medium">{item}</span>
                              <ChevronRight size={14} className="text-zinc-400" />
                            </div>
                          </NavbarMenuItem>
                        )
                      )}
                    </NavbarMenu>
                  </Navbar>

                  {/* Simulator Canvas Body */}
                  <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50/70 p-6 text-center dark:bg-zinc-900/30">
                    <div className="mb-3 rounded-2xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                      <ArrowDownToLine size={24} />
                    </div>
                    <h5 className="mb-1 text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      Top Slide-Down Variant
                    </h5>
                    <p className="mb-3 max-w-xs text-xs text-zinc-500">
                      Dropdown banner navigation with smooth vertical collapse animation.
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      color="indigo"
                      onClick={() => setTopDrawerOpen(!topDrawerOpen)}
                    >
                      {topDrawerOpen ? "Close Menu" : "Open Menu"}
                    </Button>
                  </div>
                </div>
              </div>
            </ComponentPreview>

            <CodeBlock
              code={`<Navbar mobileMenuVariant="top" isMenuOpen={isOpen} onMenuOpenChange={setIsOpen}>
  <NavbarContent justify="start">
    <NavbarMenuToggle />
    <NavbarBrand>Vapor Studio</NavbarBrand>
  </NavbarContent>
  <NavbarContent justify="end">
    <Button size="sm" color="indigo">Join</Button>
  </NavbarContent>
  <NavbarMenu variant="top" title="Navigation Menu">
    <NavbarMenuItem isActive>Products</NavbarMenuItem>
    <NavbarMenuItem>Features</NavbarMenuItem>
    <NavbarMenuItem>Pricing</NavbarMenuItem>
  </NavbarMenu>
</Navbar>`}
            />
          </div>

          {/* 2. Left Side Drawer (De Vorm Style) */}
          <div id="drawer-variant-left" className="scroll-mt-24 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="flex items-center gap-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  <PanelLeft size={16} className="text-indigo-500" />
                  <span>2. Left Side Drawer (Inspired by De Vorm)</span>
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Slide-in drawer with dark backdrop overlay, brand headline, contact info, and
                  phone links.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                color="indigo"
                onClick={() => setLeftDrawerOpen(!leftDrawerOpen)}
                className="text-xs"
              >
                {leftDrawerOpen ? "Close Drawer" : "Open Drawer"}
              </Button>
            </div>

            <ComponentPreview>
              <div className="w-full py-4">
                <div className="relative flex min-h-[640px] w-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm select-none dark:border-zinc-800 dark:bg-zinc-950">
                  <Navbar
                    position="static"
                    isBordered
                    mobileMenuVariant="left"
                    isMenuOpen={leftDrawerOpen}
                    onMenuOpenChange={setLeftDrawerOpen}
                    className="shrink-0 rounded-t-2xl bg-white/95 dark:bg-zinc-950/95"
                    isContained
                  >
                    <NavbarContent justify="start">
                      <NavbarMenuToggle />
                      <NavbarBrand>
                        <div className="flex items-center gap-1.5">
                          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-900 text-xs font-bold text-white dark:bg-white dark:text-zinc-900">
                            ✦
                          </div>
                          <span className="text-sm font-extrabold tracking-tight">DE VORM</span>
                        </div>
                      </NavbarBrand>
                    </NavbarContent>

                    <NavbarContent justify="end">
                      <Button
                        size="sm"
                        color="indigo"
                        variant="solid"
                        className="h-7 px-2.5 text-xs"
                      >
                        Inquire
                      </Button>
                    </NavbarContent>

                    <NavbarMenu
                      variant="left"
                      title="DE VORM"
                      footer={
                        <div className="space-y-3 text-left">
                          <div className="space-y-0.5">
                            <span className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
                              Sales Inquiries
                            </span>
                            <p className="flex items-center gap-1 text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                              <Phone size={11} className="text-indigo-500" />
                              +31 (0) 26 820 03 60
                            </p>
                          </div>
                          <div className="space-y-0.5 text-[11px] text-zinc-500 dark:text-zinc-400">
                            <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                              Office:
                            </span>{" "}
                            Leemansweg 45, Arnhem Netherlands
                          </div>
                        </div>
                      }
                    >
                      {[
                        "Products",
                        "Projects",
                        "About Us",
                        "Sustainability",
                        "Stories",
                        "Contact",
                      ].map((item) => (
                        <NavbarMenuItem
                          key={item}
                          isActive={leftActiveItem === item}
                          onClick={() => {
                            setLeftActiveItem(item);
                            setLeftDrawerOpen(false);
                          }}
                        >
                          <div className="flex w-full items-center justify-between">
                            <span className="text-sm font-medium">{item}</span>
                            <ChevronRight size={14} className="text-zinc-400" />
                          </div>
                        </NavbarMenuItem>
                      ))}
                    </NavbarMenu>
                  </Navbar>

                  {/* Simulator Canvas Body */}
                  <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50/70 p-6 text-center dark:bg-zinc-900/30">
                    <div className="mb-3 rounded-2xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                      <PanelLeft size={24} />
                    </div>
                    <h5 className="mb-1 text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      Left Slide-In Drawer
                    </h5>
                    <p className="mb-3 max-w-xs text-xs text-zinc-500">
                      Off-canvas sidebar drawer sliding from the left boundary.
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      color="indigo"
                      onClick={() => setLeftDrawerOpen(!leftDrawerOpen)}
                    >
                      {leftDrawerOpen ? "Close Drawer" : "Open Drawer"}
                    </Button>
                  </div>
                </div>
              </div>
            </ComponentPreview>

            <CodeBlock
              code={`<Navbar mobileMenuVariant="left" isMenuOpen={isOpen} onMenuOpenChange={setIsOpen}>
  <NavbarContent justify="start">
    <NavbarMenuToggle />
    <NavbarBrand>DE VORM</NavbarBrand>
  </NavbarContent>
  
  <NavbarMenu
    variant="left"
    title="DE VORM"
    footer={
      <div>
        <p>Sales: +31 (0) 26 820 03 60</p>
        <p>Office: Arnhem Netherlands</p>
      </div>
    }
  >
    <NavbarMenuItem isActive>Products</NavbarMenuItem>
    <NavbarMenuItem>Projects</NavbarMenuItem>
    <NavbarMenuItem>Sustainability</NavbarMenuItem>
    <NavbarMenuItem>Stories</NavbarMenuItem>
  </NavbarMenu>
</Navbar>`}
            />
          </div>

          {/* 3. Right Side Drawer (Avenoria Style) */}
          <div id="drawer-variant-right" className="scroll-mt-24 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="flex items-center gap-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  <PanelRight size={16} className="text-indigo-500" />
                  <span>3. Right Side Drawer (Inspired by Avenoria)</span>
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Off-canvas sidebar sliding from the right edge with email collaboration and user
                  authentication action buttons.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                color="indigo"
                onClick={() => setRightDrawerOpen(!rightDrawerOpen)}
                className="text-xs"
              >
                {rightDrawerOpen ? "Close Drawer" : "Open Drawer"}
              </Button>
            </div>

            <ComponentPreview>
              <div className="w-full py-4">
                <div className="relative flex min-h-[640px] w-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm select-none dark:border-zinc-800 dark:bg-zinc-950">
                  <Navbar
                    position="static"
                    isBordered
                    mobileMenuVariant="right"
                    isMenuOpen={rightDrawerOpen}
                    onMenuOpenChange={setRightDrawerOpen}
                    className="shrink-0 rounded-t-2xl bg-white/95 dark:bg-zinc-950/95"
                    isContained
                  >
                    <NavbarContent justify="start">
                      <NavbarMenuToggle />
                      <NavbarBrand>
                        <div className="flex items-center gap-1.5">
                          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-900 text-xs font-bold text-white dark:bg-white dark:text-zinc-900">
                            ✦
                          </div>
                          <span className="text-sm font-extrabold tracking-tight">avenoria</span>
                        </div>
                      </NavbarBrand>
                    </NavbarContent>

                    <NavbarContent justify="end">
                      <Button
                        size="sm"
                        color="indigo"
                        variant="solid"
                        className="h-7 px-2.5 text-xs"
                      >
                        Shop
                      </Button>
                    </NavbarContent>

                    <NavbarMenu
                      variant="right"
                      title="avenoria."
                      footer={
                        <div className="space-y-3 text-left">
                          <div className="space-y-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                            <div>
                              Collaborations:{" "}
                              <span className="font-medium text-zinc-900 dark:text-zinc-200">
                                collab@avenoria.it
                              </span>
                            </div>
                            <div>
                              Support:{" "}
                              <span className="font-medium text-zinc-900 dark:text-zinc-200">
                                support@avenoria.it
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 pt-1">
                            <Button
                              size="sm"
                              variant="outline"
                              color="zinc"
                              className="flex-1 text-xs"
                            >
                              Sign In
                            </Button>
                            <Button size="sm" color="dark" className="flex-1 text-xs">
                              Sign Up
                            </Button>
                          </div>
                        </div>
                      }
                    >
                      {["Men's Store", "Women's Store", "About Us", "Editorial", "Press"].map(
                        (item) => (
                          <NavbarMenuItem
                            key={item}
                            isActive={rightActiveItem === item}
                            onClick={() => {
                              setRightActiveItem(item);
                              setRightDrawerOpen(false);
                            }}
                            className="text-base font-bold text-zinc-900 dark:text-zinc-100"
                          >
                            {item}
                          </NavbarMenuItem>
                        )
                      )}
                    </NavbarMenu>
                  </Navbar>

                  {/* Simulator Canvas Body */}
                  <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50/70 p-6 text-center dark:bg-zinc-900/30">
                    <div className="mb-3 rounded-2xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                      <PanelRight size={24} />
                    </div>
                    <h5 className="mb-1 text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      Right Slide-In Drawer
                    </h5>
                    <p className="mb-3 max-w-xs text-xs text-zinc-500">
                      Off-canvas sidebar drawer sliding from the right boundary.
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      color="indigo"
                      onClick={() => setRightDrawerOpen(!rightDrawerOpen)}
                    >
                      {rightDrawerOpen ? "Close Drawer" : "Open Drawer"}
                    </Button>
                  </div>
                </div>
              </div>
            </ComponentPreview>

            <CodeBlock
              code={`<Navbar mobileMenuVariant="right" isMenuOpen={isOpen} onMenuOpenChange={setIsOpen}>
  <NavbarContent justify="start">
    <NavbarMenuToggle />
    <NavbarBrand>avenoria</NavbarBrand>
  </NavbarContent>
  
  <NavbarMenu
    variant="right"
    title="avenoria."
    footer={
      <div className="flex gap-2">
        <Button size="sm" variant="outline">Sign In</Button>
        <Button size="sm" color="dark">Sign Up</Button>
      </div>
    }
  >
    <NavbarMenuItem isActive>Men's Store</NavbarMenuItem>
    <NavbarMenuItem>Women's Store</NavbarMenuItem>
    <NavbarMenuItem>About Us</NavbarMenuItem>
  </NavbarMenu>
</Navbar>`}
            />
          </div>

          {/* 4. Fullscreen Dramatic Overlay (Wandergates Style) */}
          <div id="drawer-variant-fullscreen" className="scroll-mt-24 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="flex items-center gap-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  <Maximize2 size={16} className="text-indigo-500" />
                  <span>4. Fullscreen Dramatic Overlay (Inspired by Wandergates)</span>
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  High-impact 100% viewport takeover featuring oversized editorial typography,
                  dynamic scale entering, and agency address footer.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                color="indigo"
                onClick={() => setFullscreenDrawerOpen(!fullscreenDrawerOpen)}
                className="text-xs"
              >
                {fullscreenDrawerOpen ? "Close Overlay" : "Open Overlay"}
              </Button>
            </div>

            <ComponentPreview>
              <div className="w-full py-4">
                <div className="relative flex min-h-[640px] w-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm select-none dark:border-zinc-800 dark:bg-zinc-950">
                  <Navbar
                    position="static"
                    isBordered
                    mobileMenuVariant="fullscreen"
                    isMenuOpen={fullscreenDrawerOpen}
                    onMenuOpenChange={setFullscreenDrawerOpen}
                    className="shrink-0 rounded-t-2xl bg-white/95 dark:bg-zinc-950/95"
                    isContained
                  >
                    <NavbarContent justify="start">
                      <NavbarMenuToggle />
                      <NavbarBrand>
                        <div className="flex items-center gap-1.5">
                          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-900 text-xs font-bold text-white dark:bg-white dark:text-zinc-900">
                            ✦
                          </div>
                          <span className="text-sm font-extrabold tracking-tight">WANDERGATES</span>
                        </div>
                      </NavbarBrand>
                    </NavbarContent>

                    <NavbarContent justify="end">
                      <Button
                        size="sm"
                        color="indigo"
                        variant="solid"
                        className="h-7 px-2.5 text-xs"
                      >
                        Inquire
                      </Button>
                    </NavbarContent>

                    <NavbarMenu
                      variant="fullscreen"
                      title="WANDERGATES™"
                      footer={
                        <div className="flex items-center justify-between border-t border-zinc-200 pt-2 text-[11px] text-zinc-500 dark:border-zinc-800">
                          <span>DUBAI DIGITAL PARK, A1</span>
                          <span className="font-mono">©2026 UNIKO</span>
                        </div>
                      }
                    >
                      <div className="flex flex-col gap-3 py-2 text-left">
                        {["Home", "Portfolio", "About Studio", "Contact Agency"].map((item) => (
                          <div
                            key={item}
                            onClick={() => {
                              setFullscreenActiveItem(item);
                              setFullscreenDrawerOpen(false);
                            }}
                            className={`cursor-pointer text-2xl font-extrabold tracking-tight transition-colors ${
                              fullscreenActiveItem === item
                                ? "text-indigo-600 dark:text-indigo-400"
                                : "text-zinc-900 hover:text-indigo-600 dark:text-zinc-50 dark:hover:text-indigo-400"
                            }`}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </NavbarMenu>
                  </Navbar>

                  {/* Simulator Canvas Body */}
                  <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50/70 p-6 text-center dark:bg-zinc-900/30">
                    <div className="mb-3 rounded-2xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                      <Maximize2 size={24} />
                    </div>
                    <h5 className="mb-1 text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      Fullscreen Overlay
                    </h5>
                    <p className="mb-3 max-w-xs text-xs text-zinc-500">
                      100% viewport takeover with large display typography.
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      color="indigo"
                      onClick={() => setFullscreenDrawerOpen(!fullscreenDrawerOpen)}
                    >
                      {fullscreenDrawerOpen ? "Close Overlay" : "Open Overlay"}
                    </Button>
                  </div>
                </div>
              </div>
            </ComponentPreview>

            <CodeBlock
              code={`<Navbar mobileMenuVariant="fullscreen" isMenuOpen={isOpen} onMenuOpenChange={setIsOpen}>
  <NavbarContent justify="start">
    <NavbarMenuToggle />
    <NavbarBrand>WANDERGATES</NavbarBrand>
  </NavbarContent>
  
  <NavbarMenu
    variant="fullscreen"
    title="WANDERGATES™"
    footer={<p>DUBAI DIGITAL PARK • ©2026 UNIKO</p>}
  >
    <div className="flex flex-col gap-3">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">Home</h1>
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">Portfolio</h1>
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">About Studio</h1>
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">Contact Agency</h1>
    </div>
  </NavbarMenu>
</Navbar>`}
            />
          </div>
        </div>

        {/* 3. Logo Configurations */}
        <div id="logo-configurations" className="scroll-mt-24 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Logo Configurations
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Switch brand positioning across <code className="font-mono text-xs">left</code>,{" "}
                <code className="font-mono text-xs">center</code> (with adaptive split navigation),
                and <code className="font-mono text-xs">right</code> layouts:
              </p>
            </div>

            {/* Position Picker */}
            <div className="flex rounded-lg border border-zinc-200 bg-zinc-100 p-0.5 dark:border-zinc-800 dark:bg-zinc-900">
              {(["left", "center", "right"] as NavbarLogoPosition[]).map((pos) => (
                <button
                  key={pos}
                  type="button"
                  onClick={() => setSelectedLogoPos(pos)}
                  className={`rounded-md px-3 py-1 text-xs font-semibold capitalize transition-all ${
                    selectedLogoPos === pos
                      ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-zinc-50"
                      : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
                  }`}
                >
                  {pos}
                </button>
              ))}
            </div>
          </div>

          <ComponentPreview>
            <div className="w-full py-2">
              <div className="relative min-h-[400px] w-full overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-950">
                <Navbar
                  position="static"
                  logoPosition={selectedLogoPos}
                  isBordered
                  isMenuOpen={logoMenuOpen}
                  onMenuOpenChange={setLogoMenuOpen}
                  isContained
                >
                  <NavbarContent justify="start">
                    <NavbarMenuToggle className="md:hidden" />
                    {selectedLogoPos === "left" ? (
                      <NavbarBrand>
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-xs font-bold text-white">
                            K
                          </div>
                          <span className="text-sm font-bold">Kinetix</span>
                        </div>
                      </NavbarBrand>
                    ) : (
                      <div className="hidden items-center gap-3 md:flex">
                        <NavbarItem isActive>Explore</NavbarItem>
                        <NavbarItem>Showcase</NavbarItem>
                      </div>
                    )}
                  </NavbarContent>

                  {/* Centered Item / Logo */}
                  {selectedLogoPos === "center" ? (
                    <NavbarBrand>
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-xs font-bold text-white">
                          K
                        </div>
                        <span className="text-sm font-bold">Kinetix</span>
                      </div>
                    </NavbarBrand>
                  ) : selectedLogoPos === "left" ? (
                    <NavbarContent justify="center" className="hidden md:flex">
                      <NavbarItem isActive>Explore</NavbarItem>
                      <NavbarItem>Showcase</NavbarItem>
                      <NavbarItem>Changelog</NavbarItem>
                    </NavbarContent>
                  ) : null}

                  {/* Right Side Items (or Logo if right) */}
                  <NavbarContent justify="end">
                    {selectedLogoPos === "right" ? (
                      <NavbarBrand>
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-xs font-bold text-white">
                            K
                          </div>
                          <span className="text-sm font-bold">Kinetix</span>
                        </div>
                      </NavbarBrand>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="plain" className="hidden sm:inline-flex">
                          Log In
                        </Button>
                        <Button size="sm" color="indigo">
                          Join Free
                        </Button>
                      </div>
                    )}
                  </NavbarContent>

                  <NavbarMenu isContained>
                    {["Explore", "Showcase", "Changelog", "Pricing"].map((item) => (
                      <NavbarMenuItem key={item} onClick={() => setLogoMenuOpen(false)}>
                        {item}
                      </NavbarMenuItem>
                    ))}
                  </NavbarMenu>
                </Navbar>

                <div className="bg-zinc-50/50 p-4 text-center text-xs text-zinc-500 dark:bg-zinc-900/30">
                  Current Logo Position:{" "}
                  <strong className="text-zinc-900 capitalize dark:text-zinc-100">
                    {selectedLogoPos}
                  </strong>
                </div>
              </div>
            </div>
          </ComponentPreview>
        </div>

        {/* 4. Visual Styles */}
        <div id="visual-styles" className="scroll-mt-24 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Visual Styles
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Choose between Glassmorphism, Seamless Transparent, and Floating Rounded-Full pill
                aesthetics:
              </p>
            </div>

            {/* Style Selector */}
            <div className="flex rounded-lg border border-zinc-200 bg-zinc-100 p-0.5 dark:border-zinc-800 dark:bg-zinc-900">
              {(["glassmorphism", "transparent", "floating-full"] as NavbarStyleVariant[]).map(
                (style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => setSelectedStyle(style)}
                    className={`rounded-md px-3 py-1 text-xs font-semibold capitalize transition-all ${
                      selectedStyle === style
                        ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-zinc-50"
                        : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
                    }`}
                  >
                    {style.replace("-", " ")}
                  </button>
                )
              )}
            </div>
          </div>

          <ComponentPreview>
            <div className="w-full py-4">
              <div className="relative flex min-h-[400px] w-full flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-br from-indigo-500/10 via-zinc-100 to-rose-500/10 p-2 sm:p-6 dark:border-zinc-800 dark:from-indigo-950/40 dark:via-zinc-950 dark:to-rose-950/30">
                <Navbar
                  position="static"
                  styleVariant={selectedStyle}
                  isMenuOpen={styleMenuOpen}
                  onMenuOpenChange={setStyleMenuOpen}
                  isContained
                >
                  <NavbarContent justify="start">
                    <NavbarMenuToggle className="md:hidden" />
                    <NavbarBrand>
                      <div className="flex items-center gap-2">
                        <div className="rounded-md bg-zinc-900 p-1 text-white dark:bg-white dark:text-zinc-900">
                          <Flame size={14} />
                        </div>
                        <span className="text-sm font-bold">Vapor</span>
                      </div>
                    </NavbarBrand>
                  </NavbarContent>

                  <NavbarContent justify="center" className="hidden md:flex">
                    <NavbarItem isActive>Products</NavbarItem>
                    <NavbarItem>Templates</NavbarItem>
                    <NavbarItem>Pricing</NavbarItem>
                  </NavbarContent>

                  <NavbarContent justify="end">
                    <Button
                      size="sm"
                      color="dark"
                      variant={selectedStyle === "floating-full" ? "solid" : "flat"}
                    >
                      Get Started
                    </Button>
                  </NavbarContent>

                  <NavbarMenu isContained>
                    {["Products", "Templates", "Pricing", "Docs"].map((item) => (
                      <NavbarMenuItem key={item} onClick={() => setStyleMenuOpen(false)}>
                        {item}
                      </NavbarMenuItem>
                    ))}
                  </NavbarMenu>
                </Navbar>

                <div className="py-12 text-center">
                  <h4 className="mb-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    Visual Style:{" "}
                    <span className="text-indigo-600 capitalize dark:text-indigo-400">
                      {selectedStyle.replace("-", " ")}
                    </span>
                  </h4>
                  <p className="mx-auto max-w-sm text-xs text-zinc-500">
                    Seamlessly matches modern web hero banners with floating rounded capsules or
                    frosted glass filters.
                  </p>
                </div>
              </div>
            </div>
          </ComponentPreview>
        </div>

        {/* 5. E-Commerce Mega Menu */}
        <div id="mega-menu" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            E-Commerce Mega Menu
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            A comprehensive, multi-column mega menu animated with Framer Motion for online stores
            and rich catalogs:
          </p>

          <ComponentPreview>
            <div className="w-full py-4">
              <div className="relative min-h-[460px] w-full overflow-visible rounded-2xl border border-zinc-200 bg-zinc-50/50 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                <Navbar
                  position="static"
                  isBordered
                  isMenuOpen={megaMenuOpen}
                  onMenuOpenChange={setMegaMenuOpen}
                  className="rounded-t-2xl"
                  isContained
                >
                  <NavbarContent justify="start">
                    <NavbarMenuToggle className="md:hidden" />
                    <NavbarBrand>
                      <div className="flex items-center gap-2">
                        <div className="rounded-lg bg-zinc-900 p-1.5 text-white dark:bg-white dark:text-zinc-900">
                          <ShoppingBag size={16} />
                        </div>
                        <span className="text-sm font-black tracking-wide uppercase">LUMEN</span>
                      </div>
                    </NavbarBrand>
                  </NavbarContent>

                  <NavbarContent justify="center" className="hidden md:flex">
                    <NavbarItem
                      isActive={isMegaMenuOpen}
                      onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                      className="flex cursor-pointer items-center gap-1 font-semibold text-indigo-600 dark:text-indigo-400"
                    >
                      <span>Shop Categories</span>
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${
                          isMegaMenuOpen ? "rotate-180" : ""
                        }`}
                      />
                    </NavbarItem>
                    <NavbarItem>New Arrivals</NavbarItem>
                    <NavbarItem>Trending</NavbarItem>
                    <NavbarItem className="flex items-center gap-1 font-semibold text-rose-500">
                      <Tag size={12} />
                      Sale
                    </NavbarItem>
                  </NavbarContent>

                  <NavbarContent justify="end">
                    <Button size="sm" color="dark" variant="solid">
                      Cart (3)
                    </Button>
                  </NavbarContent>

                  <NavbarMenu isContained>
                    {["Men's Apparel", "Tech & Gear", "Watches & Bags", "Sale Items"].map(
                      (item) => (
                        <NavbarMenuItem key={item} onClick={() => setMegaMenuOpen(false)}>
                          {item}
                        </NavbarMenuItem>
                      )
                    )}
                  </NavbarMenu>

                  {/* Mega Menu Dropdown */}
                  <NavbarMegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)}>
                    <div className="grid grid-cols-1 gap-6 text-left md:grid-cols-4">
                      {/* Column 1: Men's Fashion */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-zinc-900 uppercase dark:text-zinc-100">
                          <Shirt size={14} className="text-indigo-500" />
                          <span>Men's Apparel</span>
                        </div>
                        <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                          <li className="cursor-pointer hover:text-zinc-950 dark:hover:text-white">
                            Jackets & Outerwear
                          </li>
                          <li className="cursor-pointer hover:text-zinc-950 dark:hover:text-white">
                            Hoodies & Sweaters
                          </li>
                          <li className="cursor-pointer hover:text-zinc-950 dark:hover:text-white">
                            Casual Shirts
                          </li>
                          <li className="cursor-pointer hover:text-zinc-950 dark:hover:text-white">
                            Denim & Trousers
                          </li>
                          <li className="cursor-pointer font-medium text-indigo-600 hover:text-zinc-950 dark:text-indigo-400 dark:hover:text-white">
                            View All Men →
                          </li>
                        </ul>
                      </div>

                      {/* Column 2: Tech & Gadgets */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-zinc-900 uppercase dark:text-zinc-100">
                          <Smartphone size={14} className="text-emerald-500" />
                          <span>Tech & Gear</span>
                        </div>
                        <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                          <li className="cursor-pointer hover:text-zinc-950 dark:hover:text-white">
                            Smart Audio & ANC
                          </li>
                          <li className="cursor-pointer hover:text-zinc-950 dark:hover:text-white">
                            MagSafe Accessories
                          </li>
                          <li className="cursor-pointer hover:text-zinc-950 dark:hover:text-white">
                            Minimalist Wallets
                          </li>
                          <li className="cursor-pointer hover:text-zinc-950 dark:hover:text-white">
                            Wireless Chargers
                          </li>
                          <li className="cursor-pointer font-medium text-emerald-600 hover:text-zinc-950 dark:text-emerald-400 dark:hover:text-white">
                            View All Tech →
                          </li>
                        </ul>
                      </div>

                      {/* Column 3: Watches & Accessories */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-zinc-900 uppercase dark:text-zinc-100">
                          <Watch size={14} className="text-amber-500" />
                          <span>Watches & Bags</span>
                        </div>
                        <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                          <li className="cursor-pointer hover:text-zinc-950 dark:hover:text-white">
                            Automatic Chronographs
                          </li>
                          <li className="cursor-pointer hover:text-zinc-950 dark:hover:text-white">
                            Waterproof Everyday Packs
                          </li>
                          <li className="cursor-pointer hover:text-zinc-950 dark:hover:text-white">
                            Leather Straps
                          </li>
                          <li className="cursor-pointer hover:text-zinc-950 dark:hover:text-white">
                            Travel Organizers
                          </li>
                          <li className="cursor-pointer font-medium text-amber-600 hover:text-zinc-950 dark:text-amber-400 dark:hover:text-white">
                            Explore Collection →
                          </li>
                        </ul>
                      </div>

                      {/* Column 4: Promotional Feature Card */}
                      <div className="relative flex flex-col justify-between overflow-hidden rounded-xl bg-gradient-to-br from-indigo-900 to-zinc-900 p-4 text-white">
                        <div className="space-y-1">
                          <span className="inline-block rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase">
                            Special 40% Off
                          </span>
                          <h5 className="pt-1 text-sm font-bold text-white">Autumn Edition 2026</h5>
                          <p className="text-[11px] text-zinc-300">
                            Premium handcrafted streetwear & smart gear.
                          </p>
                        </div>
                        <Button
                          size="sm"
                          color="white"
                          variant="solid"
                          onClick={() => setIsMegaMenuOpen(false)}
                          className="mt-4 w-full justify-between"
                        >
                          <span>Shop Promo</span>
                          <ArrowRight size={14} />
                        </Button>
                      </div>
                    </div>
                  </NavbarMegaMenu>
                </Navbar>

                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <p className="mb-3 text-xs text-zinc-500">
                    Click <strong>"Shop Categories"</strong> in the navigation bar above to toggle
                    the animated 4-column mega menu.
                  </p>
                  <Button
                    size="sm"
                    variant={isMegaMenuOpen ? "solid" : "outline"}
                    color="indigo"
                    onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                  >
                    {isMegaMenuOpen ? "Close Mega Menu" : "Open Mega Menu Demo"}
                  </Button>
                </div>
              </div>
            </div>
          </ComponentPreview>
        </div>

        {/* 6. Admin Navbar */}
        <div id="admin-navbar" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Admin Dashboard Navbar
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            A utility-optimized navigation bar featuring a command search bar, status badges,
            notifications bell, and user avatar profile:
          </p>

          <ComponentPreview>
            <div className="w-full py-2">
              <div className="relative min-h-[400px] w-full overflow-hidden rounded-xl border border-zinc-200 shadow-xs dark:border-zinc-800">
                <Navbar
                  layout="admin"
                  position="static"
                  isBordered
                  isMenuOpen={adminMenuOpen}
                  onMenuOpenChange={setAdminMenuOpen}
                  isContained
                >
                  {/* Left Side: Brand & Search bar */}
                  <div className="flex max-w-md min-w-0 flex-1 items-center gap-2 sm:gap-4">
                    <NavbarMenuToggle />
                    <NavbarBrand className="mr-1 shrink-0 sm:mr-2">
                      <div className="flex shrink-0 items-center gap-2">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-xs font-black text-white">
                          <ShieldCheck size={16} />
                        </div>
                        <span className="hidden text-sm font-bold tracking-tight whitespace-nowrap sm:inline-block">
                          NexusAdmin
                        </span>
                      </div>
                    </NavbarBrand>

                    <div className="relative w-full max-w-xs min-w-[110px]">
                      <Input
                        variant="flat"
                        inputSize="sm"
                        placeholder="Search..."
                        startContent={<Search size={14} className="text-zinc-400" />}
                        endContent={
                          <div className="hidden items-center gap-0.5 rounded bg-zinc-200 px-1 py-0.5 font-mono text-[10px] text-zinc-500 sm:flex dark:bg-zinc-700 dark:text-zinc-300">
                            <Command size={10} />
                            <span>K</span>
                          </div>
                        }
                      />
                    </div>
                  </div>

                  {/* Right Side: Quick Utilities & Avatar */}
                  <NavbarContent justify="end">
                    <NavbarItem>
                      <button
                        type="button"
                        className="relative shrink-0 cursor-pointer rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
                        aria-label="Notifications"
                      >
                        <Bell size={18} />
                        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-zinc-950" />
                      </button>
                    </NavbarItem>

                    <NavbarItem>
                      <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800" />
                    </NavbarItem>

                    <NavbarItem>
                      <div className="flex shrink-0 cursor-pointer items-center gap-3">
                        <Avatar
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                          alt="Sarah Miller"
                          size="sm"
                          radius="full"
                        />
                        <div className="hidden flex-col text-left md:flex">
                          <span className="text-xs leading-tight font-semibold whitespace-nowrap text-zinc-900 dark:text-zinc-100">
                            Sarah Miller
                          </span>
                          <span className="text-[11px] whitespace-nowrap text-zinc-400">
                            System Architect
                          </span>
                        </div>
                      </div>
                    </NavbarItem>
                  </NavbarContent>

                  <NavbarMenu isContained title="Admin Navigation">
                    {[
                      "Dashboard",
                      "Analytics",
                      "Team Members",
                      "System Settings",
                      "API Keys",
                      "Audit Logs",
                    ].map((item) => (
                      <NavbarMenuItem key={item} onClick={() => setAdminMenuOpen(false)}>
                        <div className="flex w-full items-center justify-between">
                          <span>{item}</span>
                          <ChevronRight size={14} className="text-zinc-400" />
                        </div>
                      </NavbarMenuItem>
                    ))}
                  </NavbarMenu>
                </Navbar>
              </div>
            </div>
          </ComponentPreview>
        </div>

        {/* 7. Interactive Playground */}
        <div id="customizer-playground" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Interactive Navbar Playground
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Customize positioning, logo placement, drawer animation variant, visual styling,
            borders, glassmorphic backdrop blurring, and container widths in real-time:
          </p>

          {/* Controls Bar */}
          <div className="grid grid-cols-1 gap-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4 sm:grid-cols-2 lg:grid-cols-4 dark:border-zinc-800 dark:bg-zinc-900/50">
            {/* Style Variant */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
                Style Variant
              </label>
              <select
                value={playStyleVariant}
                onChange={(e) => setPlayStyleVariant(e.target.value as NavbarStyleVariant)}
                className="h-9 w-full rounded-lg border border-zinc-300 bg-white px-2.5 text-xs font-medium text-zinc-900 outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              >
                <option value="glassmorphism">Glassmorphism</option>
                <option value="transparent">Transparent</option>
                <option value="floating-full">Floating Rounded Pill</option>
              </select>
            </div>

            {/* Mobile Drawer Variant */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
                Mobile Drawer Variant
              </label>
              <select
                value={playMobileVariant}
                onChange={(e) => setPlayMobileVariant(e.target.value as NavbarMobileMenuVariant)}
                className="h-9 w-full rounded-lg border border-zinc-300 bg-white px-2.5 text-xs font-medium text-zinc-900 outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              >
                <option value="top">Top (Slide Down)</option>
                <option value="left">Left (Side Drawer)</option>
                <option value="right">Right (Side Drawer)</option>
                <option value="fullscreen">Fullscreen Dramatic</option>
              </select>
            </div>

            {/* Logo Position */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
                Logo Position
              </label>
              <select
                value={playLogoPos}
                onChange={(e) => setPlayLogoPos(e.target.value as NavbarLogoPosition)}
                className="h-9 w-full rounded-lg border border-zinc-300 bg-white px-2.5 text-xs font-medium text-zinc-900 outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              >
                <option value="left">Left (Standard)</option>
                <option value="center">Center (Split Navigation)</option>
                <option value="right">Right</option>
              </select>
            </div>

            {/* Max Width */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
                Container Max Width
              </label>
              <select
                value={playMaxWidth}
                onChange={(e) => setPlayMaxWidth(e.target.value as NavbarMaxWidth)}
                className="h-9 w-full rounded-lg border border-zinc-300 bg-white px-2.5 text-xs font-medium text-zinc-900 outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              >
                <option value="full">Full Width</option>
                <option value="2xl">2XL (1536px)</option>
                <option value="xl">XL (1280px)</option>
                <option value="lg">LG (1024px)</option>
                <option value="md">MD (768px)</option>
              </select>
            </div>
          </div>

          <ComponentPreview>
            <div className="w-full py-4">
              <div className="relative flex min-h-[460px] w-full flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100/50 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                <Navbar
                  position={playPosition}
                  logoPosition={playLogoPos}
                  styleVariant={playStyleVariant}
                  mobileMenuVariant={playMobileVariant}
                  isBordered={playIsBordered}
                  isBlurred={playIsBlurred}
                  maxWidth={playMaxWidth}
                  isMenuOpen={playMenuOpen}
                  onMenuOpenChange={setPlayMenuOpen}
                  isContained
                >
                  {/* Left Slot */}
                  <NavbarContent justify="start">
                    <NavbarMenuToggle className="md:hidden" />
                    {playLogoPos === "left" && (
                      <NavbarBrand>
                        <div className="flex items-center gap-2">
                          <div className="rounded-lg bg-indigo-600 p-1.5 text-white">
                            <Compass size={16} />
                          </div>
                          <span className="text-sm font-bold">Playground</span>
                        </div>
                      </NavbarBrand>
                    )}

                    {playLogoPos === "center" && (
                      <div className="hidden items-center gap-3 md:flex">
                        {["Dashboard", "Analytics"].map((tab) => (
                          <NavbarItem
                            key={tab}
                            isActive={playActiveItem === tab}
                            onClick={() => setPlayActiveItem(tab)}
                          >
                            {tab}
                          </NavbarItem>
                        ))}
                      </div>
                    )}

                    {playLogoPos === "right" && (
                      <NavbarItem className="hidden sm:flex">
                        <Button size="sm" color="indigo" variant="flat">
                          <Sliders size={14} className="mr-1" />
                          Settings
                        </Button>
                      </NavbarItem>
                    )}
                  </NavbarContent>

                  {/* Center Slot */}
                  {playLogoPos === "center" ? (
                    <NavbarBrand>
                      <div className="flex items-center gap-2">
                        <div className="rounded-lg bg-indigo-600 p-1.5 text-white">
                          <Compass size={16} />
                        </div>
                        <span className="text-sm font-bold">Playground</span>
                      </div>
                    </NavbarBrand>
                  ) : (
                    <NavbarContent justify="center" className="hidden md:flex">
                      {["Dashboard", "Analytics", "Reports", "Billing"].map((tab) => (
                        <NavbarItem
                          key={tab}
                          isActive={playActiveItem === tab}
                          onClick={() => setPlayActiveItem(tab)}
                        >
                          {tab}
                        </NavbarItem>
                      ))}
                    </NavbarContent>
                  )}

                  {/* Right Slot */}
                  <NavbarContent justify="end">
                    {playLogoPos === "right" ? (
                      <NavbarBrand>
                        <div className="flex items-center gap-2">
                          <div className="rounded-lg bg-indigo-600 p-1.5 text-white">
                            <Compass size={16} />
                          </div>
                          <span className="text-sm font-bold">Playground</span>
                        </div>
                      </NavbarBrand>
                    ) : playLogoPos === "center" ? (
                      <div className="flex items-center gap-2">
                        <div className="mr-1 hidden items-center gap-3 md:flex">
                          {["Reports", "Billing"].map((tab) => (
                            <NavbarItem
                              key={tab}
                              isActive={playActiveItem === tab}
                              onClick={() => setPlayActiveItem(tab)}
                            >
                              {tab}
                            </NavbarItem>
                          ))}
                        </div>
                        <Button size="sm" color="indigo" variant="flat">
                          <Sliders size={14} className="mr-1" />
                          Settings
                        </Button>
                      </div>
                    ) : (
                      <NavbarItem>
                        <Button size="sm" color="indigo" variant="flat">
                          <Sliders size={14} className="mr-1" />
                          Settings
                        </Button>
                      </NavbarItem>
                    )}
                  </NavbarContent>

                  {/* Responsive Mobile Drawer */}
                  <NavbarMenu isContained>
                    {["Dashboard", "Analytics", "Reports", "Billing"].map((tab) => (
                      <NavbarMenuItem
                        key={tab}
                        isActive={playActiveItem === tab}
                        onClick={() => {
                          setPlayActiveItem(tab);
                          setPlayMenuOpen(false);
                        }}
                      >
                        <div className="flex w-full items-center justify-between">
                          <span>{tab}</span>
                          <ChevronRight size={14} className="text-zinc-400" />
                        </div>
                      </NavbarMenuItem>
                    ))}
                    <div className="mt-1 border-t border-zinc-100 pt-3 dark:border-zinc-800">
                      <Button
                        size="sm"
                        color="indigo"
                        variant="solid"
                        className="w-full justify-center"
                        onClick={() => setPlayMenuOpen(false)}
                      >
                        <Sliders size={14} className="mr-1.5" />
                        Settings
                      </Button>
                    </div>
                  </NavbarMenu>
                </Navbar>

                <div className="bg-zinc-50/50 p-10 text-center dark:bg-zinc-900/30">
                  <p className="text-xs text-zinc-500">
                    Active tab:{" "}
                    <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                      {playActiveItem}
                    </strong>{" "}
                    | Logo Position: <strong className="capitalize">{playLogoPos}</strong> | Drawer:{" "}
                    <strong className="capitalize">{playMobileVariant}</strong>
                  </p>
                </div>
              </div>
            </div>
          </ComponentPreview>
        </div>
      </section>
    </div>
  );
}
