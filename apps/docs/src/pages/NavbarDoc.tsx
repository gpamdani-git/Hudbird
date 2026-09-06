// apps/docs/src/pages/NavbarDoc.tsx
import React, { useState } from "react";
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
} from "@my-lib/core";
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
  const [playMobileVariant, setPlayMobileVariant] =
    useState<NavbarMobileMenuVariant>("top");
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
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'glassmorphism'</code> (translucent frosted blur),{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'transparent'</code> (seamless background), or{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'floating-full'</code> (pill container with shadow).
        </span>
      ),
    },
    {
      prop: "mobileMenuVariant",
      defaultVal: "'top'",
      description: (
        <span>
          Drawer animation and presentation on mobile devices:{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'top'</code> (slide down from navbar),{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'left'</code> (slide-in side drawer from left),{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'right'</code> (slide-in side drawer from right), or{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'fullscreen'</code> (100% dramatic viewport takeover).
        </span>
      ),
    },
    {
      prop: "logoPosition",
      defaultVal: "'left'",
      description: (
        <span>
          Controls placement and layout balance:{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'left'</code>,{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'center'</code> (with split navigation), or{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'right'</code>.
        </span>
      ),
    },
    {
      prop: "layout",
      defaultVal: "'standard'",
      description: (
        <span>
          Layout architecture mode:{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'standard'</code> (public web & marketing) or{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'admin'</code> (dashboard with command search).
        </span>
      ),
    },
    {
      prop: "position",
      defaultVal: "'sticky'",
      description: (
        <span>
          CSS positioning behaviour:{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'static'</code>,{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'sticky'</code> (anchors to top during scroll), or{" "}
          <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-mono text-[11px]">'fixed'</code>.
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
      description: "When true, confines drawer transitions strictly within its parent container (ideal for simulated device frames).",
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
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl mb-3">
          Navbar
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400">
          A production-grade, highly responsive navigation bar engineered with TypeScript, Tailwind CSS, and Class Variance Authority (CVA). Features mechanical Framer Motion hamburger transitions, 4 mobile drawer variants, multi-column E-commerce Mega Menus, floating pills, and flexible logo placements.
        </p>
      </div>

      {/* Hero Preview */}
      <section className="space-y-4">
        <ComponentPreview>
          <div className="w-full py-4">
            <div className="w-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm relative">
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
                      <div className="h-8 w-8 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center font-black text-sm shrink-0">
                        ⚡
                      </div>
                      <span className="font-bold text-base tracking-tight text-zinc-900 dark:text-zinc-50 whitespace-nowrap">
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
                  <NavbarItem
                    isActive={activeTab === "docs"}
                    onClick={() => setActiveTab("docs")}
                  >
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
                      <div className="flex items-center justify-between w-full">
                        <span>{tab}</span>
                        <ChevronRight size={14} className="text-zinc-400" />
                      </div>
                    </NavbarMenuItem>
                  ))}
                  <div className="pt-4 mt-2 border-t border-zinc-100 dark:border-zinc-800 flex flex-col gap-2">
                    <Button size="sm" variant="outline" color="zinc" className="w-full justify-center">
                      Sign In
                    </Button>
                    <Button size="sm" color="dark" className="w-full justify-center">
                      Get Started
                    </Button>
                  </div>
                </NavbarMenu>
              </Navbar>

              <div className="p-8 bg-zinc-50/50 dark:bg-zinc-900/30 text-center">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Active Page: <strong className="text-zinc-900 dark:text-zinc-100 font-semibold capitalize">{activeTab}</strong>
                </p>
              </div>
            </div>
          </div>
        </ComponentPreview>

        <CodeBlock
          code={`import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button } from '@my-lib/core'

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
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-2">
            Examples
          </h2>
        </div>

        {/* 1. Standard Navbar */}
        <div id="standard-navbar" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Standard Web Page Navbar
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            A clean, balanced layout with Brand/Logo on the start, centered navigation tabs with active indicator underlines, and primary call-to-action buttons on the end without text collisions:
          </p>

          <ComponentPreview>
            <div className="w-full py-2">
              <div className="w-full rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xs relative">
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
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="p-1.5 rounded-lg bg-indigo-500 text-white">
                          <Layers size={16} />
                        </div>
                        <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
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
                    {["Products", "Solutions", "Enterprise", "Pricing", "Documentation"].map((tab) => (
                      <NavbarMenuItem key={tab} onClick={() => setStandardMenuOpen(false)}>
                        <div className="flex items-center justify-between w-full">
                          <span>{tab}</span>
                          <ChevronRight size={14} className="text-zinc-400" />
                        </div>
                      </NavbarMenuItem>
                    ))}
                    <div className="pt-4 mt-2 border-t border-zinc-100 dark:border-zinc-800 flex flex-col gap-2">
                      <Button size="sm" variant="outline" color="zinc" className="w-full justify-center">
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
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
              <span>4 Mobile Drawer Variations</span>
              <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                Framer Motion & Isolated Viewport
              </span>
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              Each mobile drawer variant is rendered inside an isolated 1:1 mobile iframe container (390px viewport). This decouples internal component positioning, z-indexes, and media queries from documentation layouts for pristine real-device fidelity.
            </p>
          </div>

          {/* 1. Top Slide-Down Drawer */}
          <div id="drawer-variant-top" className="scroll-mt-24 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <ArrowDownToLine size={16} className="text-indigo-500" />
                  <span>1. Top Slide-Down Drawer</span>
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Standard mobile navigation banner that smoothly drops down immediately below the navigation bar header.
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
                <div className="w-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm relative min-h-[480px] flex flex-col select-none">
                  <Navbar
                  position="static"
                  isBordered
                  mobileMenuVariant="top"
                  isMenuOpen={topDrawerOpen}
                  onMenuOpenChange={setTopDrawerOpen}
                  className="bg-white/95 dark:bg-zinc-950/95 shrink-0 rounded-t-2xl"
                  isContained
                >
                  <NavbarContent justify="start">
                    <NavbarMenuToggle />
                    <NavbarBrand>
                      <div className="flex items-center gap-1.5">
                        <div className="h-6 w-6 rounded-md bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                          ✦
                        </div>
                        <span className="font-extrabold text-sm tracking-tight">Vapor Studio</span>
                      </div>
                    </NavbarBrand>
                  </NavbarContent>

                  <NavbarContent justify="end">
                    <Button size="sm" color="indigo" variant="solid" className="h-7 text-xs px-2.5">
                      Join
                    </Button>
                  </NavbarContent>

                  <NavbarMenu
                    variant="top"
                    title="Navigation Menu"
                    footer={
                      <div className="flex flex-col gap-2">
                        <Button size="sm" color="indigo" className="w-full justify-center text-xs">
                          Get Started Free
                        </Button>
                      </div>
                    }
                  >
                    {["Products", "Features", "Pricing", "Integrations", "Documentation"].map((item) => (
                      <NavbarMenuItem
                        key={item}
                        isActive={topActiveItem === item}
                        onClick={() => {
                          setTopActiveItem(item);
                          setTopDrawerOpen(false);
                        }}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="font-medium text-sm">{item}</span>
                          <ChevronRight size={14} className="text-zinc-400" />
                        </div>
                      </NavbarMenuItem>
                    ))}
                  </NavbarMenu>
                </Navbar>

                {/* Simulator Canvas Body */}
                <div className="p-6 flex-1 flex flex-col items-center justify-center text-center bg-zinc-50/70 dark:bg-zinc-900/30">
                  <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 mb-3">
                    <ArrowDownToLine size={24} />
                  </div>
                  <h5 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                    Top Slide-Down Variant
                  </h5>
                  <p className="text-xs text-zinc-500 max-w-xs mb-3">
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
                <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <PanelLeft size={16} className="text-indigo-500" />
                  <span>2. Left Side Drawer (Inspired by De Vorm)</span>
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Slide-in drawer with dark backdrop overlay, brand headline, contact info, and phone links.
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
                <div className="w-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm relative min-h-[490px] flex flex-col select-none">
                  <Navbar
                    position="static"
                    isBordered
                    mobileMenuVariant="left"
                  isMenuOpen={leftDrawerOpen}
                  onMenuOpenChange={setLeftDrawerOpen}
                  className="bg-white/95 dark:bg-zinc-950/95 shrink-0 rounded-t-2xl"
                  isContained
                >
                  <NavbarContent justify="start">
                    <NavbarMenuToggle />
                    <NavbarBrand>
                      <div className="flex items-center gap-1.5">
                        <div className="h-6 w-6 rounded-md bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center font-bold text-xs">
                          ✦
                        </div>
                        <span className="font-extrabold text-sm tracking-tight">DE VORM</span>
                      </div>
                    </NavbarBrand>
                  </NavbarContent>

                  <NavbarContent justify="end">
                    <Button size="sm" color="indigo" variant="solid" className="h-7 text-xs px-2.5">
                      Inquire
                    </Button>
                  </NavbarContent>

                  <NavbarMenu
                    variant="left"
                    title="DE VORM"
                    footer={
                      <div className="space-y-3 text-left">
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                            Sales Inquiries
                          </span>
                          <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1">
                            <Phone size={11} className="text-indigo-500" />
                            +31 (0) 26 820 03 60
                          </p>
                        </div>
                        <div className="space-y-0.5 text-[11px] text-zinc-500 dark:text-zinc-400">
                          <span className="font-semibold text-zinc-900 dark:text-zinc-200">Office:</span> Leemansweg 45, Arnhem Netherlands
                        </div>
                      </div>
                    }
                  >
                    {["Products", "Projects", "About Us", "Sustainability", "Stories", "Contact"].map((item) => (
                      <NavbarMenuItem
                        key={item}
                        isActive={leftActiveItem === item}
                        onClick={() => {
                          setLeftActiveItem(item);
                          setLeftDrawerOpen(false);
                        }}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="font-medium text-sm">{item}</span>
                          <ChevronRight size={14} className="text-zinc-400" />
                        </div>
                      </NavbarMenuItem>
                    ))}
                  </NavbarMenu>
                </Navbar>

                {/* Simulator Canvas Body */}
                <div className="p-6 flex-1 flex flex-col items-center justify-center text-center bg-zinc-50/70 dark:bg-zinc-900/30">
                  <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 mb-3">
                    <PanelLeft size={24} />
                  </div>
                  <h5 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                    Left Slide-In Drawer
                  </h5>
                  <p className="text-xs text-zinc-500 max-w-xs mb-3">
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
                <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <PanelRight size={16} className="text-indigo-500" />
                  <span>3. Right Side Drawer (Inspired by Avenoria)</span>
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Off-canvas sidebar sliding from the right edge with email collaboration and user authentication action buttons.
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
                <div className="w-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm relative min-h-[490px] flex flex-col select-none">
                  <Navbar
                    position="static"
                    isBordered
                    mobileMenuVariant="right"
                  isMenuOpen={rightDrawerOpen}
                  onMenuOpenChange={setRightDrawerOpen}
                  className="bg-white/95 dark:bg-zinc-950/95 shrink-0 rounded-t-2xl"
                  isContained
                >
                  <NavbarContent justify="start">
                    <NavbarMenuToggle />
                    <NavbarBrand>
                      <div className="flex items-center gap-1.5">
                        <div className="h-6 w-6 rounded-md bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center font-bold text-xs">
                          ✦
                        </div>
                        <span className="font-extrabold text-sm tracking-tight">avenoria</span>
                      </div>
                    </NavbarBrand>
                  </NavbarContent>

                  <NavbarContent justify="end">
                    <Button size="sm" color="indigo" variant="solid" className="h-7 text-xs px-2.5">
                      Shop
                    </Button>
                  </NavbarContent>

                  <NavbarMenu
                    variant="right"
                    title="avenoria."
                    footer={
                      <div className="space-y-3 text-left">
                        <div className="space-y-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                          <div>Collaborations: <span className="text-zinc-900 dark:text-zinc-200 font-medium">collab@avenoria.it</span></div>
                          <div>Support: <span className="text-zinc-900 dark:text-zinc-200 font-medium">support@avenoria.it</span></div>
                        </div>
                        <div className="flex items-center gap-2 pt-1">
                          <Button size="sm" variant="outline" color="zinc" className="flex-1 text-xs">
                            Sign In
                          </Button>
                          <Button size="sm" color="dark" className="flex-1 text-xs">
                            Sign Up
                          </Button>
                        </div>
                      </div>
                    }
                  >
                    {["Men's Store", "Women's Store", "About Us", "Editorial", "Press"].map((item) => (
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
                    ))}
                  </NavbarMenu>
                </Navbar>

                {/* Simulator Canvas Body */}
                <div className="p-6 flex-1 flex flex-col items-center justify-center text-center bg-zinc-50/70 dark:bg-zinc-900/30">
                  <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 mb-3">
                    <PanelRight size={24} />
                  </div>
                  <h5 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                    Right Slide-In Drawer
                  </h5>
                  <p className="text-xs text-zinc-500 max-w-xs mb-3">
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
                <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <Maximize2 size={16} className="text-indigo-500" />
                  <span>4. Fullscreen Dramatic Overlay (Inspired by Wandergates)</span>
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  High-impact 100% viewport takeover featuring oversized editorial typography, dynamic scale entering, and agency address footer.
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
                <div className="w-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm relative min-h-[490px] flex flex-col select-none">
                  <Navbar
                    position="static"
                    isBordered
                    mobileMenuVariant="fullscreen"
                  isMenuOpen={fullscreenDrawerOpen}
                  onMenuOpenChange={setFullscreenDrawerOpen}
                  className="bg-white/95 dark:bg-zinc-950/95 shrink-0 rounded-t-2xl"
                  isContained
                >
                  <NavbarContent justify="start">
                    <NavbarMenuToggle />
                    <NavbarBrand>
                      <div className="flex items-center gap-1.5">
                        <div className="h-6 w-6 rounded-md bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center font-bold text-xs">
                          ✦
                        </div>
                        <span className="font-extrabold text-sm tracking-tight">WANDERGATES</span>
                      </div>
                    </NavbarBrand>
                  </NavbarContent>

                  <NavbarContent justify="end">
                    <Button size="sm" color="indigo" variant="solid" className="h-7 text-xs px-2.5">
                      Inquire
                    </Button>
                  </NavbarContent>

                  <NavbarMenu
                    variant="fullscreen"
                    title="WANDERGATES™"
                    footer={
                      <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                        <span>DUBAI DIGITAL PARK, A1</span>
                        <span className="font-mono">©2026 UNIKO</span>
                      </div>
                    }
                  >
                    <div className="flex flex-col gap-3 text-left py-2">
                      {["Home", "Portfolio", "About Studio", "Contact Agency"].map((item) => (
                        <div
                          key={item}
                          onClick={() => {
                            setFullscreenActiveItem(item);
                            setFullscreenDrawerOpen(false);
                          }}
                          className={`text-2xl font-extrabold tracking-tight transition-colors cursor-pointer ${
                            fullscreenActiveItem === item
                              ? "text-indigo-600 dark:text-indigo-400"
                              : "text-zinc-900 dark:text-zinc-50 hover:text-indigo-600 dark:hover:text-indigo-400"
                          }`}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </NavbarMenu>
                </Navbar>

                {/* Simulator Canvas Body */}
                <div className="p-6 flex-1 flex flex-col items-center justify-center text-center bg-zinc-50/70 dark:bg-zinc-900/30">
                  <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 mb-3">
                    <Maximize2 size={24} />
                  </div>
                  <h5 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                    Fullscreen Overlay
                  </h5>
                  <p className="text-xs text-zinc-500 max-w-xs mb-3">
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
      <h1 className="text-3xl font-extrabold">Home</h1>
      <h1 className="text-3xl font-extrabold">Portfolio</h1>
      <h1 className="text-3xl font-extrabold">About Studio</h1>
      <h1 className="text-3xl font-extrabold">Contact Agency</h1>
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
                Switch brand positioning across <code className="font-mono text-xs">left</code>, <code className="font-mono text-xs">center</code> (with adaptive split navigation), and <code className="font-mono text-xs">right</code> layouts:
              </p>
            </div>

            {/* Position Picker */}
            <div className="flex rounded-lg border border-zinc-200 dark:border-zinc-800 p-0.5 bg-zinc-100 dark:bg-zinc-900">
              {(["left", "center", "right"] as NavbarLogoPosition[]).map((pos) => (
                <button
                  key={pos}
                  type="button"
                  onClick={() => setSelectedLogoPos(pos)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold capitalize transition-all ${
                    selectedLogoPos === pos
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-xs"
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
              <div className="w-full rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xs bg-white dark:bg-zinc-950 relative">
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
                          <div className="h-7 w-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                            K
                          </div>
                          <span className="font-bold text-sm">Kinetix</span>
                        </div>
                      </NavbarBrand>
                    ) : (
                      <div className="hidden md:flex items-center gap-3">
                        <NavbarItem isActive>Explore</NavbarItem>
                        <NavbarItem>Showcase</NavbarItem>
                      </div>
                    )}
                  </NavbarContent>

                  {/* Centered Item / Logo */}
                  {selectedLogoPos === "center" ? (
                    <NavbarBrand>
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                          K
                        </div>
                        <span className="font-bold text-sm">Kinetix</span>
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
                          <div className="h-7 w-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                            K
                          </div>
                          <span className="font-bold text-sm">Kinetix</span>
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

                <div className="p-4 bg-zinc-50/50 dark:bg-zinc-900/30 text-center text-xs text-zinc-500">
                  Current Logo Position: <strong className="text-zinc-900 dark:text-zinc-100 capitalize">{selectedLogoPos}</strong>
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
                Choose between Glassmorphism, Seamless Transparent, and Floating Rounded-Full pill aesthetics:
              </p>
            </div>

            {/* Style Selector */}
            <div className="flex rounded-lg border border-zinc-200 dark:border-zinc-800 p-0.5 bg-zinc-100 dark:bg-zinc-900">
              {(["glassmorphism", "transparent", "floating-full"] as NavbarStyleVariant[]).map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => setSelectedStyle(style)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold capitalize transition-all ${
                    selectedStyle === style
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-xs"
                      : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
                  }`}
                >
                  {style.replace("-", " ")}
                </button>
              ))}
            </div>
          </div>

          <ComponentPreview>
            <div className="w-full py-4">
              <div className="w-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 relative bg-gradient-to-br from-indigo-500/10 via-zinc-100 to-rose-500/10 dark:from-indigo-950/40 dark:via-zinc-950 dark:to-rose-950/30 p-2 sm:p-6 min-h-[300px] flex flex-col justify-between">
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
                        <div className="p-1 rounded-md bg-zinc-900 dark:bg-white text-white dark:text-zinc-900">
                          <Flame size={14} />
                        </div>
                        <span className="font-bold text-sm">Vapor</span>
                      </div>
                    </NavbarBrand>
                  </NavbarContent>

                  <NavbarContent justify="center" className="hidden md:flex">
                    <NavbarItem isActive>Products</NavbarItem>
                    <NavbarItem>Templates</NavbarItem>
                    <NavbarItem>Pricing</NavbarItem>
                  </NavbarContent>

                  <NavbarContent justify="end">
                    <Button size="sm" color="dark" variant={selectedStyle === "floating-full" ? "solid" : "flat"}>
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
                  <h4 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-2">
                    Visual Style: <span className="text-indigo-600 dark:text-indigo-400 capitalize">{selectedStyle.replace("-", " ")}</span>
                  </h4>
                  <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                    Seamlessly matches modern web hero banners with floating rounded capsules or frosted glass filters.
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
            A comprehensive, multi-column mega menu animated with Framer Motion for online stores and rich catalogs:
          </p>

          <ComponentPreview>
            <div className="w-full py-4">
              <div className="w-full rounded-2xl overflow-visible border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 shadow-sm relative min-h-[460px]">
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
                        <div className="p-1.5 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900">
                          <ShoppingBag size={16} />
                        </div>
                        <span className="font-black text-sm tracking-wide uppercase">
                          LUMEN
                        </span>
                      </div>
                    </NavbarBrand>
                  </NavbarContent>

                  <NavbarContent justify="center" className="hidden md:flex">
                    <NavbarItem
                      isActive={isMegaMenuOpen}
                      onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                      className="cursor-pointer font-semibold flex items-center gap-1 text-indigo-600 dark:text-indigo-400"
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
                    <NavbarItem className="text-rose-500 font-semibold flex items-center gap-1">
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
                    {["Men's Apparel", "Tech & Gear", "Watches & Bags", "Sale Items"].map((item) => (
                      <NavbarMenuItem key={item} onClick={() => setMegaMenuOpen(false)}>
                        {item}
                      </NavbarMenuItem>
                    ))}
                  </NavbarMenu>

                  {/* Mega Menu Dropdown */}
                  <NavbarMegaMenu
                    isOpen={isMegaMenuOpen}
                    onClose={() => setIsMegaMenuOpen(false)}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
                      {/* Column 1: Men's Fashion */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                          <Shirt size={14} className="text-indigo-500" />
                          <span>Men's Apparel</span>
                        </div>
                        <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                          <li className="hover:text-zinc-950 dark:hover:text-white cursor-pointer">Jackets & Outerwear</li>
                          <li className="hover:text-zinc-950 dark:hover:text-white cursor-pointer">Hoodies & Sweaters</li>
                          <li className="hover:text-zinc-950 dark:hover:text-white cursor-pointer">Casual Shirts</li>
                          <li className="hover:text-zinc-950 dark:hover:text-white cursor-pointer">Denim & Trousers</li>
                          <li className="hover:text-zinc-950 dark:hover:text-white cursor-pointer font-medium text-indigo-600 dark:text-indigo-400">View All Men →</li>
                        </ul>
                      </div>

                      {/* Column 2: Tech & Gadgets */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                          <Smartphone size={14} className="text-emerald-500" />
                          <span>Tech & Gear</span>
                        </div>
                        <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                          <li className="hover:text-zinc-950 dark:hover:text-white cursor-pointer">Smart Audio & ANC</li>
                          <li className="hover:text-zinc-950 dark:hover:text-white cursor-pointer">MagSafe Accessories</li>
                          <li className="hover:text-zinc-950 dark:hover:text-white cursor-pointer">Minimalist Wallets</li>
                          <li className="hover:text-zinc-950 dark:hover:text-white cursor-pointer">Wireless Chargers</li>
                          <li className="hover:text-zinc-950 dark:hover:text-white cursor-pointer font-medium text-emerald-600 dark:text-emerald-400">View All Tech →</li>
                        </ul>
                      </div>

                      {/* Column 3: Watches & Accessories */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                          <Watch size={14} className="text-amber-500" />
                          <span>Watches & Bags</span>
                        </div>
                        <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                          <li className="hover:text-zinc-950 dark:hover:text-white cursor-pointer">Automatic Chronographs</li>
                          <li className="hover:text-zinc-950 dark:hover:text-white cursor-pointer">Waterproof Everyday Packs</li>
                          <li className="hover:text-zinc-950 dark:hover:text-white cursor-pointer">Leather Straps</li>
                          <li className="hover:text-zinc-950 dark:hover:text-white cursor-pointer">Travel Organizers</li>
                          <li className="hover:text-zinc-950 dark:hover:text-white cursor-pointer font-medium text-amber-600 dark:text-amber-400">Explore Collection →</li>
                        </ul>
                      </div>

                      {/* Column 4: Promotional Feature Card */}
                      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-900 to-zinc-900 text-white p-4 flex flex-col justify-between">
                        <div className="space-y-1">
                          <span className="inline-block px-2 py-0.5 rounded-full bg-rose-500 text-[10px] font-bold uppercase tracking-wider">
                            Special 40% Off
                          </span>
                          <h5 className="text-sm font-bold text-white pt-1">
                            Autumn Edition 2026
                          </h5>
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

                <div className="p-8 text-center flex flex-col items-center justify-center">
                  <p className="text-xs text-zinc-500 mb-3">
                    Click <strong>"Shop Categories"</strong> in the navigation bar above to toggle the animated 4-column mega menu.
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
            A utility-optimized navigation bar featuring a command search bar, status badges, notifications bell, and user avatar profile:
          </p>

          <ComponentPreview>
            <div className="w-full py-2">
              <div className="w-full rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xs relative">
                <Navbar
                  layout="admin"
                  position="static"
                  isBordered
                  isMenuOpen={adminMenuOpen}
                  onMenuOpenChange={setAdminMenuOpen}
                  isContained
                >
                  {/* Left Side: Brand & Search bar */}
                  <div className="flex items-center gap-2 sm:gap-4 flex-1 max-w-md min-w-0">
                    <NavbarMenuToggle />
                    <NavbarBrand className="mr-1 sm:mr-2 shrink-0">
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="w-7 h-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-black text-xs shrink-0">
                          <ShieldCheck size={16} />
                        </div>
                        <span className="font-bold text-sm tracking-tight hidden sm:inline-block whitespace-nowrap">
                          NexusAdmin
                        </span>
                      </div>
                    </NavbarBrand>

                    <div className="relative w-full min-w-[110px] max-w-xs">
                      <Input
                        variant="flat"
                        inputSize="sm"
                        placeholder="Search..."
                        startContent={<Search size={14} className="text-zinc-400" />}
                        endContent={
                          <div className="hidden sm:flex items-center gap-0.5 px-1 py-0.5 rounded bg-zinc-200 dark:bg-zinc-700 text-[10px] font-mono text-zinc-500 dark:text-zinc-300">
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
                        className="relative p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer shrink-0"
                        aria-label="Notifications"
                      >
                        <Bell size={18} />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-zinc-950" />
                      </button>
                    </NavbarItem>

                    <NavbarItem>
                      <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800" />
                    </NavbarItem>

                    <NavbarItem>
                      <div className="flex items-center gap-3 cursor-pointer shrink-0">
                        <Avatar
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                          alt="Sarah Miller"
                          size="sm"
                          radius="full"
                        />
                        <div className="hidden md:flex flex-col text-left">
                          <span className="text-xs font-semibold leading-tight text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
                            Sarah Miller
                          </span>
                          <span className="text-[11px] text-zinc-400 whitespace-nowrap">
                            System Architect
                          </span>
                        </div>
                      </div>
                    </NavbarItem>
                  </NavbarContent>

                  <NavbarMenu isContained title="Admin Navigation">
                    {["Dashboard", "Analytics", "Team Members", "System Settings", "API Keys", "Audit Logs"].map((item) => (
                      <NavbarMenuItem key={item} onClick={() => setAdminMenuOpen(false)}>
                        <div className="flex items-center justify-between w-full">
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
            Customize positioning, logo placement, drawer animation variant, visual styling, borders, glassmorphic backdrop blurring, and container widths in real-time:
          </p>

          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
            {/* Style Variant */}
            <div>
              <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-1.5">
                Style Variant
              </label>
              <select
                value={playStyleVariant}
                onChange={(e) => setPlayStyleVariant(e.target.value as NavbarStyleVariant)}
                className="w-full h-9 px-2.5 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-xs font-medium text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="glassmorphism">Glassmorphism</option>
                <option value="transparent">Transparent</option>
                <option value="floating-full">Floating Rounded Pill</option>
              </select>
            </div>

            {/* Mobile Drawer Variant */}
            <div>
              <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-1.5">
                Mobile Drawer Variant
              </label>
              <select
                value={playMobileVariant}
                onChange={(e) =>
                  setPlayMobileVariant(e.target.value as NavbarMobileMenuVariant)
                }
                className="w-full h-9 px-2.5 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-xs font-medium text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="top">Top (Slide Down)</option>
                <option value="left">Left (Side Drawer)</option>
                <option value="right">Right (Side Drawer)</option>
                <option value="fullscreen">Fullscreen Dramatic</option>
              </select>
            </div>

            {/* Logo Position */}
            <div>
              <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-1.5">
                Logo Position
              </label>
              <select
                value={playLogoPos}
                onChange={(e) => setPlayLogoPos(e.target.value as NavbarLogoPosition)}
                className="w-full h-9 px-2.5 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-xs font-medium text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="left">Left (Standard)</option>
                <option value="center">Center (Split Navigation)</option>
                <option value="right">Right</option>
              </select>
            </div>

            {/* Max Width */}
            <div>
              <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-1.5">
                Container Max Width
              </label>
              <select
                value={playMaxWidth}
                onChange={(e) => setPlayMaxWidth(e.target.value as NavbarMaxWidth)}
                className="w-full h-9 px-2.5 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-xs font-medium text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-indigo-500"
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
              <div className="w-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm relative min-h-[380px] bg-zinc-100/50 dark:bg-zinc-950 flex flex-col justify-between">
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
                          <div className="p-1.5 rounded-lg bg-indigo-600 text-white">
                            <Compass size={16} />
                          </div>
                          <span className="font-bold text-sm">Playground</span>
                        </div>
                      </NavbarBrand>
                    )}

                    {playLogoPos === "center" && (
                      <div className="hidden md:flex items-center gap-3">
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
                        <div className="p-1.5 rounded-lg bg-indigo-600 text-white">
                          <Compass size={16} />
                        </div>
                        <span className="font-bold text-sm">Playground</span>
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
                          <div className="p-1.5 rounded-lg bg-indigo-600 text-white">
                            <Compass size={16} />
                          </div>
                          <span className="font-bold text-sm">Playground</span>
                        </div>
                      </NavbarBrand>
                    ) : playLogoPos === "center" ? (
                      <div className="flex items-center gap-2">
                        <div className="hidden md:flex items-center gap-3 mr-1">
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
                        <div className="flex items-center justify-between w-full">
                          <span>{tab}</span>
                          <ChevronRight size={14} className="text-zinc-400" />
                        </div>
                      </NavbarMenuItem>
                    ))}
                    <div className="pt-3 mt-1 border-t border-zinc-100 dark:border-zinc-800">
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

                <div className="p-10 bg-zinc-50/50 dark:bg-zinc-900/30 text-center">
                  <p className="text-xs text-zinc-500">
                    Active tab: <strong className="text-zinc-900 dark:text-zinc-100 font-semibold">{playActiveItem}</strong> | Logo Position: <strong className="capitalize">{playLogoPos}</strong> | Drawer: <strong className="capitalize">{playMobileVariant}</strong>
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
