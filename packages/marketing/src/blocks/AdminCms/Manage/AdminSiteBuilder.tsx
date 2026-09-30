import React, { useState } from "react";
import {
  Monitor,
  Smartphone,
  Tablet,
  Save,
  Eye,
  Layers,
  Plus,
  FileText,
  Search,
  Layout,
  CheckCircle2,
  ArrowLeft,
  PanelTop,
  PanelBottom,
  AlertTriangle,
  Image as ImageIcon,
  Type,
  LayoutTemplate,
  AlignCenter,
  Minus,
  Trash2,
} from "lucide-react";
import { Button, Card, Badge } from "@hudbird/ui";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const SITE_PARTS = [
  { id: 1, name: "Global Header", type: "Site Part", status: "Active", icon: PanelTop },
  { id: 2, name: "Global Footer", type: "Site Part", status: "Active", icon: PanelBottom },
  { id: 3, name: "Blog Archive", type: "Template", status: "Active", icon: Layers },
  { id: 4, name: "404 Error Page", type: "System Template", status: "Draft", icon: AlertTriangle },
];

const PREMADE_THEMES = [
  {
    id: 101,
    name: "Hudbird Startup",
    author: "Hudbird UI",
    desc: "Clean, minimal aesthetic optimized for SaaS.",
    image: "https://picsum.photos/seed/hudbird/800/500",
    pages: ["Home", "About", "Pricing"],
    blocks: ["Hero", "Features", "Pricing"],
  },
  {
    id: 102,
    name: "Digital Agency",
    author: "Studio X",
    desc: "Bold typography and scroll animations for agencies.",
    image: "https://picsum.photos/seed/agency/800/500",
    pages: ["Home", "Portfolio", "Services"],
    blocks: ["Hero Video", "Project Grid", "Marquee"],
  },
  {
    id: 103,
    name: "E-Commerce Plus",
    author: "StoreFront",
    desc: "High-converting store layout with mega-menus.",
    image: "https://picsum.photos/seed/ecommerce/800/500",
    pages: ["Storefront", "Category", "Checkout"],
    blocks: ["Product Grid", "Promo Banner"],
  },
];

export const AdminSiteBuilder = ({ onNavigate }: { onNavigate?: (page: string) => void }) => {
  const [activePartId, setActivePartId] = useState(1);
  const [deviceMode, setDeviceMode] = useState<"desktop" | "tablet" | "mobile">("mobile");
  const [isChangingTheme, setIsChangingTheme] = useState(false);
  const [selectedThemeId, setSelectedThemeId] = useState<number | null>(null);

  // Dynamic States for Header
  const [headerLayout, setHeaderLayout] = useState("Standard"); // Standard, Centered, Floating
  const [headerLogoType, setHeaderLogoType] = useState("Text"); // Text, Image
  const [headerLogo, setHeaderLogo] = useState("BlankUI");
  const [headerLinks, setHeaderLinks] = useState("Home, Features, Pricing");
  const [headerCta, setHeaderCta] = useState("Get Started");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dynamic States for Footer
  const [footerTheme, setFooterTheme] = useState("Dark"); // Dark, Light
  const [footerLayout, setFooterLayout] = useState("Standard"); // Standard, Minimal
  const [footerColsData, setFooterColsData] = useState([
    { id: 1, title: "Product", links: ["Features", "Integrations", "Pricing"] },
    { id: 2, title: "Company", links: ["About Us", "Careers", "Contact"] },
    { id: 3, title: "Resources", links: ["Blog", "Help Center", "API Docs"] },
  ]);
  const [footerCopy, setFooterCopy] = useState("© 2026 BlankUI Inc.");
  const [showSocials, setShowSocials] = useState(true);
  const [showNewsletter, setShowNewsletter] = useState(false);

  const [isFullscreen, setIsFullscreen] = useState(false);

  const activePart = SITE_PARTS.find((t) => t.id === activePartId) || SITE_PARTS[0];
  const selectedTheme = PREMADE_THEMES.find((t) => t.id === selectedThemeId);

  const renderMockup = () => {
    if (activePart.id === 1) {
      // Global Header Mockup
      return (
        <div className="bg-muted/10 relative flex w-full flex-1 flex-col overflow-hidden">
          {/* Mock Header element */}
          <div
            className={`bg-background relative z-10 flex shrink-0 items-center justify-between shadow-sm ${headerLayout === "Floating" ? "border-border/40 mx-6 mt-6 h-16 rounded-2xl border px-6" : "border-border/40 h-20 w-full border-b px-6 sm:px-8"} `}
          >
            {/* Logo Area */}
            <div className="relative z-20 flex shrink-0 items-center gap-3">
              {headerLogoType === "Image" ? (
                <div className="bg-primary/10 border-primary/20 flex h-8 w-24 items-center justify-center rounded-lg border sm:h-10 sm:w-32">
                  <ImageIcon className="text-primary h-4 w-4 sm:h-5 sm:w-5" />
                </div>
              ) : (
                <>
                  <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-full text-[9px] font-bold sm:h-10 sm:w-10 sm:text-[11px]">
                    Logo
                  </div>
                  <div className="text-lg font-bold tracking-tight sm:text-xl">{headerLogo}</div>
                </>
              )}
            </div>

            {/* Navigation Area - Desktop */}
            {deviceMode === "desktop" && (
              <div
                className={`flex items-center gap-8 ${headerLayout === "Centered" ? "absolute left-1/2 -translate-x-1/2" : "mr-8 ml-auto"}`}
              >
                {headerLinks.split(",").map((link, i) => (
                  <div
                    key={i}
                    className="text-muted-foreground hover:text-foreground cursor-pointer text-[14px] font-medium transition-colors"
                  >
                    {link.trim()}
                  </div>
                ))}
              </div>
            )}

            {/* CTA / Mobile Menu Area */}
            <div
              className={`relative z-20 flex shrink-0 items-center gap-3 sm:gap-4 ${headerLayout !== "Centered" && deviceMode === "desktop" ? "" : "ml-auto"}`}
            >
              {deviceMode !== "mobile" && headerCta && (
                <div className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer rounded-lg px-4 py-2 text-[13px] font-semibold shadow-sm transition-colors sm:px-5 sm:py-2.5 sm:text-[14px]">
                  {headerCta}
                </div>
              )}
              {deviceMode !== "desktop" && (
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="hover:bg-muted/50 flex h-10 w-10 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border-none bg-transparent transition-colors"
                >
                  <div
                    className={`bg-foreground h-0.5 w-5 rounded-full transition-transform ${mobileMenuOpen ? "translate-y-2 rotate-45" : ""}`}
                  ></div>
                  <div
                    className={`bg-foreground h-0.5 w-5 rounded-full transition-opacity ${mobileMenuOpen ? "opacity-0" : ""}`}
                  ></div>
                  <div
                    className={`bg-foreground h-0.5 w-5 rounded-full transition-transform ${mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""}`}
                  ></div>
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {mobileMenuOpen && deviceMode !== "desktop" && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-background/95 absolute inset-0 top-[4.5rem] z-0 flex flex-col items-center justify-center gap-6 p-8 backdrop-blur-md sm:top-20"
              >
                {headerLinks.split(",").map((link, i) => (
                  <div
                    key={i}
                    className="text-foreground hover:text-primary cursor-pointer text-2xl font-bold tracking-tight transition-colors"
                  >
                    {link.trim()}
                  </div>
                ))}
                {headerCta && deviceMode === "mobile" && (
                  <div className="bg-primary text-primary-foreground mt-8 w-full cursor-pointer rounded-xl px-8 py-4 text-center text-lg font-bold shadow-sm">
                    {headerCta}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div
            className={`border-border/20 bg-background/30 flex w-full flex-1 flex-col items-center justify-center border-4 border-dashed opacity-50 ${headerLayout === "Floating" ? "m-6 rounded-2xl" : "mt-0"}`}
          >
            <Layout className="text-muted-foreground/40 mb-3 h-10 w-10" />
            <p className="text-muted-foreground text-sm font-medium">Page Content Area</p>
          </div>
        </div>
      );
    }
    if (activePart.id === 2) {
      // Global Footer Mockup
      return (
        <div className="bg-muted/10 relative flex w-full flex-1 flex-col overflow-hidden">
          <div className="border-border/20 bg-background/30 flex w-full flex-1 flex-col items-center justify-center border-4 border-b-0 border-dashed opacity-50">
            <Layout className="text-muted-foreground/40 mb-3 h-10 w-10" />
            <p className="text-muted-foreground text-sm font-medium">Page Content Area</p>
          </div>

          <div
            className={`flex w-full shrink-0 flex-col ${deviceMode === "mobile" ? "gap-8 p-8" : "gap-12 p-12"} ${footerTheme === "Dark" ? "bg-foreground text-background" : "bg-background text-foreground border-border/40 border-t"}`}
          >
            {footerLayout === "Standard" ? (
              <div
                className={`grid ${deviceMode === "desktop" ? "grid-cols-4 gap-10" : deviceMode === "tablet" ? "grid-cols-2 gap-10" : "grid-cols-1 gap-8"}`}
              >
                <div className="col-span-1 space-y-5">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-[11px] font-bold ${footerTheme === "Dark" ? "bg-background/20" : "bg-primary/10 text-primary"}`}
                  >
                    Logo
                  </div>
                  <div
                    className={`h-3 w-full rounded ${footerTheme === "Dark" ? "bg-background/10" : "bg-muted-foreground/20"}`}
                  ></div>
                  <div
                    className={`h-3 w-3/4 rounded ${footerTheme === "Dark" ? "bg-background/10" : "bg-muted-foreground/20"}`}
                  ></div>
                </div>
                {footerColsData.map((col) => (
                  <div key={col.id} className="space-y-4">
                    <div className="mb-4 text-[15px] font-bold">{col.title}</div>
                    <div className="flex flex-col gap-3">
                      {col.links.map((link, j) => (
                        <div
                          key={j}
                          className={`cursor-pointer text-[13px] transition-colors ${footerTheme === "Dark" ? "text-background/70 hover:text-background" : "text-muted-foreground hover:text-foreground"}`}
                        >
                          {link}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-6 text-center">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full text-[13px] font-bold ${footerTheme === "Dark" ? "bg-background/20" : "bg-primary/10 text-primary"}`}
                >
                  Logo
                </div>
                <div className={`flex ${deviceMode === "mobile" ? "flex-col gap-4" : "gap-6"}`}>
                  {footerColsData.map((col, i) => (
                    <div key={col.id} className="text-[14px] font-semibold">
                      {col.title}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {showNewsletter && (
              <div
                className={`flex gap-4 rounded-xl border p-6 ${deviceMode === "mobile" ? "flex-col items-start" : "flex-row items-center justify-between"} ${footerTheme === "Dark" ? "bg-background/5 border-background/10" : "bg-muted/30 border-border/40"}`}
              >
                <div
                  className={`min-w-0 space-y-1 ${deviceMode === "mobile" ? "w-full text-left" : "flex-1 text-left"}`}
                >
                  <h4 className="truncate text-[15px] font-bold">Subscribe to our newsletter</h4>
                  <p
                    className={`text-[13px] ${footerTheme === "Dark" ? "text-background/50" : "text-muted-foreground"} truncate`}
                  >
                    Get the latest updates directly in your inbox.
                  </p>
                </div>
                <div
                  className={`flex shrink-0 gap-2 ${deviceMode === "mobile" ? "w-full" : "w-auto"}`}
                >
                  <div
                    className={`h-10 rounded-lg border ${deviceMode === "mobile" ? "flex-1" : "w-64"} ${footerTheme === "Dark" ? "bg-background/10 border-background/20" : "bg-background border-border/60"}`}
                  ></div>
                  <div
                    className={`h-10 w-24 shrink-0 rounded-lg ${footerTheme === "Dark" ? "bg-background text-foreground" : "bg-primary text-primary-foreground"}`}
                  ></div>
                </div>
              </div>
            )}

            <div
              className={`flex gap-4 border-t pt-8 ${deviceMode === "mobile" ? "flex-col items-start" : "flex-row items-center justify-between"} ${footerTheme === "Dark" ? "border-background/10" : "border-border/40"}`}
            >
              <div
                className={`text-left text-[13px] font-medium ${footerTheme === "Dark" ? "text-background/50" : "text-muted-foreground"}`}
              >
                {footerCopy}
              </div>
              {showSocials && (
                <div className="flex shrink-0 gap-4">
                  <div
                    className={`h-8 w-8 cursor-pointer rounded-full transition-colors ${footerTheme === "Dark" ? "bg-background/20 hover:bg-background/30" : "bg-muted hover:bg-muted-foreground/40"}`}
                  ></div>
                  <div
                    className={`h-8 w-8 cursor-pointer rounded-full transition-colors ${footerTheme === "Dark" ? "bg-background/20 hover:bg-background/30" : "bg-muted hover:bg-muted-foreground/40"}`}
                  ></div>
                  <div
                    className={`h-8 w-8 cursor-pointer rounded-full transition-colors ${footerTheme === "Dark" ? "bg-background/20 hover:bg-background/30" : "bg-muted hover:bg-muted-foreground/40"}`}
                  ></div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
    if (activePart.id === 4) {
      // 404 Mockup
      return (
        <div className="bg-background flex w-full flex-1 flex-col items-center justify-center space-y-6 p-10 text-center">
          <div className="bg-muted/60 mb-4 flex h-32 w-48 items-center justify-center rounded-2xl">
            <AlertTriangle className="text-muted-foreground/40 h-12 w-12" />
          </div>
          <div className="bg-muted/80 h-10 w-3/4 max-w-md rounded"></div>
          <div className="bg-muted/40 h-4 w-1/2 max-w-sm rounded"></div>
          <div className="bg-primary/90 mt-6 h-12 w-36 rounded-full"></div>
        </div>
      );
    }
    // Blog Archive Mockup (Default ID 3)
    return (
      <div className="bg-background flex w-full flex-1 flex-col p-10">
        <div className="mb-10 flex flex-col items-center space-y-4 text-center">
          <div className="bg-foreground/90 h-12 w-64 rounded-lg"></div>
          <div className="bg-muted-foreground/40 h-4 w-96 rounded"></div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="border-border/40 flex flex-col gap-3 overflow-hidden rounded-xl border shadow-sm"
            >
              <div className="bg-muted/60 h-40 w-full"></div>
              <div className="space-y-3 p-4">
                <div className="flex gap-2">
                  <div className="bg-primary/20 h-5 w-16 rounded-full"></div>
                  <div className="bg-muted/40 h-5 w-20 rounded-full"></div>
                </div>
                <div className="bg-foreground/80 h-6 w-full rounded"></div>
                <div className="bg-foreground/80 h-6 w-3/4 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (isChangingTheme) {
    if (selectedTheme) {
      return (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex max-w-5xl flex-col gap-6 pb-10"
        >
          <div className="border-border/30 flex items-center gap-3 border-b pb-4">
            <button
              onClick={() => setSelectedThemeId(null)}
              className="border-border/40 bg-card text-muted-foreground hover:bg-muted/50 hover:text-foreground flex h-8 w-8 items-center justify-center rounded-lg border transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold tracking-tight">{selectedTheme.name}</h2>
              </div>
              <p className="text-muted-foreground mt-0.5 text-[13px]">By {selectedTheme.author}</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Button
                variant="solid"
                className="gap-2"
                onClick={() => {
                  setIsChangingTheme(false);
                  setSelectedThemeId(null);
                }}
              >
                <CheckCircle2 className="h-4 w-4" />
                Activate Theme
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <div className="border-border/40 bg-muted overflow-hidden rounded-xl border">
                <img
                  src={selectedTheme.image}
                  alt={selectedTheme.name}
                  className="aspect-video h-auto w-full object-cover"
                />
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold">Description</h3>
                <p className="text-muted-foreground text-[14px] leading-relaxed">
                  {selectedTheme.desc}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="border-border/40 bg-card p-5">
                <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold">
                  <FileText className="text-muted-foreground h-4 w-4" />
                  Included Page Layouts
                </h3>
                <ul className="space-y-3">
                  {selectedTheme.pages.map((page, i) => (
                    <li
                      key={i}
                      className="text-muted-foreground flex items-center gap-3 text-[13px]"
                    >
                      <div className="bg-primary/50 h-1.5 w-1.5 rounded-full"></div>
                      {page} Layout
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="border-border/40 bg-card p-5">
                <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold">
                  <Layout className="text-muted-foreground h-4 w-4" />
                  Available UI Blocks
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedTheme.blocks.map((block, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="bg-muted/30 text-muted-foreground border-border/40"
                    >
                      {block}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="flex max-w-5xl flex-col gap-6 pb-10"
      >
        <div className="border-border/30 flex items-center justify-between border-b pb-4">
          <div>
            <h2 className="text-foreground text-lg font-bold tracking-tight">Theme Directory</h2>
            <p className="text-muted-foreground mt-1 text-[13px]">
              Select a pre-made theme to define your site's global styles and available blocks.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setIsChangingTheme(false)}>
            Cancel
          </Button>
        </div>

        <div className="mt-2 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PREMADE_THEMES.map((theme) => (
            <Card
              key={theme.id}
              onClick={() => setSelectedThemeId(theme.id)}
              className="border-border/40 bg-card hover:border-primary/50 group flex cursor-pointer flex-col p-5 transition-colors"
            >
              <div className="bg-muted border-border/40 relative mb-4 h-32 overflow-hidden rounded-lg border">
                <img
                  src={theme.image}
                  alt={theme.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="text-[12px] font-semibold text-white">View Details</span>
                </div>
              </div>
              <h3 className="text-[14px] font-semibold">{theme.name}</h3>
              <p className="text-muted-foreground mt-1 line-clamp-2 flex-1 text-[12px]">
                {theme.desc}
              </p>
            </Card>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`flex gap-6 ${isFullscreen ? "bg-background fixed inset-0 z-50 p-6" : "h-[calc(100vh-160px)]"}`}
    >
      {/* Left Sidebar - Theme & Site Parts List */}
      {!isFullscreen && (
        <div className="flex w-[280px] shrink-0 flex-col gap-4">
          {/* Theme Status */}
          <div className="border-border/40 bg-card flex items-center gap-3 rounded-xl border p-3 shadow-sm">
            <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                Active Theme
              </p>
              <p className="text-foreground text-[14px] font-bold">Hudbird Startup</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="bg-card border-border/60 hover:bg-muted/50 w-full justify-between shadow-sm"
            onClick={() => setIsChangingTheme(true)}
          >
            <span className="text-[13px] font-medium">Change Theme</span>
            <Search className="text-muted-foreground h-4 w-4" />
          </Button>

          {/* Site Parts List */}
          <Card className="custom-scrollbar border-border/40 bg-card flex-1 overflow-y-auto p-3">
            <div className="space-y-1">
              <h3 className="text-muted-foreground/60 px-2 pb-2 text-[11px] font-semibold tracking-wider uppercase">
                Global Site Parts
              </h3>
              {SITE_PARTS.map((part) => (
                <button
                  key={part.id}
                  onClick={() => setActivePartId(part.id)}
                  className={`flex w-full flex-col items-start rounded-lg px-3 py-2.5 text-left transition-colors ${
                    activePartId === part.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "hover:bg-muted/50 text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <part.icon
                      className={`h-3.5 w-3.5 ${activePartId === part.id ? "text-primary-foreground/80" : "text-muted-foreground"}`}
                    />
                    <span className="text-[13px] font-medium">{part.name}</span>
                  </div>
                  <div
                    className={`mt-1 text-[10px] tracking-wider uppercase ${activePartId === part.id ? "text-primary-foreground/70" : "text-muted-foreground/60"}`}
                  >
                    {part.type}
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Main Area - Preview and Tools */}
      <div className="flex flex-1 flex-col gap-4 overflow-hidden">
        {/* Editor Toolbar */}
        <div className="bg-card border-border/40 flex shrink-0 items-center justify-between rounded-xl border p-2 shadow-sm">
          <div className="bg-muted/40 flex items-center gap-1 rounded-lg p-1">
            <Button
              variant="ghost"
              size="sm"
              isIconOnly
              className={`h-8 w-8 rounded-md ${deviceMode === "desktop" ? "bg-background shadow-sm" : ""}`}
              onClick={() => {
                setDeviceMode("desktop");
                setIsFullscreen(true);
              }}
            >
              <Monitor className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              isIconOnly
              className={`h-8 w-8 rounded-md ${deviceMode === "tablet" ? "bg-background shadow-sm" : ""}`}
              onClick={() => {
                setDeviceMode("tablet");
              }}
            >
              <Tablet className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              isIconOnly
              className={`h-8 w-8 rounded-md ${deviceMode === "mobile" ? "bg-background shadow-sm" : ""}`}
              onClick={() => {
                setDeviceMode("mobile");
              }}
            >
              <Smartphone className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2 pr-1">
            {!isFullscreen && (
              <span className="text-muted-foreground mr-2 hidden text-[12px] sm:inline-block">
                Auto-saving enabled
              </span>
            )}
            <Button
              variant="outline"
              size="sm"
              className="bg-background h-8 gap-1.5"
              onClick={() => {
                const newState = !isFullscreen;
                setIsFullscreen(newState);
                if (!newState && deviceMode === "desktop") {
                  setDeviceMode("mobile");
                }
              }}
            >
              <Monitor className="h-3.5 w-3.5" />{" "}
              {isFullscreen ? "Exit Full Screen" : "Full Screen"}
            </Button>
            {!isFullscreen && (
              <Button
                variant="solid"
                size="sm"
                className="bg-primary h-8 gap-1.5"
                onClick={() => onNavigate?.("editor-page")}
              >
                <Layout className="h-3.5 w-3.5" /> Edit with Visual Editor
              </Button>
            )}
          </div>
        </div>

        {/* Canvas Area */}
        <div className="bg-muted/20 border-border/30 relative flex flex-1 flex-col overflow-hidden rounded-xl border dark:bg-zinc-950/30">
          {/* Canvas Wrapper for scaling based on device */}
          <div className="custom-scrollbar flex flex-1 justify-center overflow-auto p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePart?.id}
                initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                transition={{ duration: 0.3 }}
                className={`bg-background border-border/40 mx-auto flex shrink-0 flex-col overflow-hidden rounded-lg border shadow-sm transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                  deviceMode === "desktop"
                    ? "min-h-[600px] w-[1024px]"
                    : deviceMode === "tablet"
                      ? "min-h-[800px] w-[768px]"
                      : "min-h-[700px] w-[375px]"
                }`}
              >
                {/* Fake Browser Chrome */}
                <div className="bg-muted/40 border-border/30 flex h-8 shrink-0 items-center gap-1.5 border-b px-4">
                  <div className="h-2.5 w-2.5 rounded-full bg-rose-500/80"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80"></div>
                  <div className="bg-background/50 mx-auto flex h-4 w-48 items-center justify-center rounded">
                    <span className="text-muted-foreground/50 text-[10px]">{activePart.name}</span>
                  </div>
                </div>

                {/* Visual Wireframe Mockup */}
                {renderMockup()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Inspector */}
      <div className="border-border/40 bg-card flex w-[300px] shrink-0 flex-col overflow-hidden rounded-xl border shadow-sm">
        <div className="border-border/30 bg-muted/20 border-b p-4">
          <h3 className="flex items-center gap-2 text-sm font-semibold">
            <activePart.icon className="text-primary h-4 w-4" />
            {activePart.name} Settings
          </h3>
        </div>

        <div className="flex-1 space-y-7 overflow-y-auto p-5">
          {activePart.id === 1 && (
            <>
              {/* Header Layout Toggle */}
              <div className="space-y-3">
                <label className="text-foreground flex items-center justify-between text-[13px] font-semibold">
                  Header Layout
                </label>
                <div className="bg-muted/50 border-border/40 grid grid-cols-3 gap-1 rounded-lg border p-1">
                  {["Standard", "Centered", "Floating"].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setHeaderLayout(mode)}
                      className={`rounded-md py-1.5 text-[11px] font-medium transition-colors ${headerLayout === mode ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Logo Type Toggle */}
              <div className="border-border/40 space-y-3 border-t pt-2">
                <label className="text-foreground text-[13px] font-semibold">Logo Type</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setHeaderLogoType("Text")}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-lg border py-2 text-[12px] font-medium transition-colors ${headerLogoType === "Text" ? "border-primary bg-primary/5 text-primary" : "border-border/60 text-muted-foreground"}`}
                  >
                    <Type className="h-3.5 w-3.5" /> Text
                  </button>
                  <button
                    onClick={() => setHeaderLogoType("Image")}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-lg border py-2 text-[12px] font-medium transition-colors ${headerLogoType === "Image" ? "border-primary bg-primary/5 text-primary" : "border-border/60 text-muted-foreground"}`}
                  >
                    <ImageIcon className="h-3.5 w-3.5" /> Image
                  </button>
                </div>

                {headerLogoType === "Text" ? (
                  <input
                    type="text"
                    value={headerLogo}
                    onChange={(e) => setHeaderLogo(e.target.value)}
                    placeholder="Enter brand name"
                    className="bg-background border-border/60 focus:border-primary/50 w-full rounded-md border px-3 py-2 text-[13px] outline-none"
                  />
                ) : (
                  <div className="border-border/80 bg-muted/20 hover:bg-muted/40 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed p-4 text-center transition-colors">
                    <ImageIcon className="text-muted-foreground/50 h-6 w-6" />
                    <span className="text-muted-foreground text-[11px]">
                      Click to upload logo image
                    </span>
                  </div>
                )}
              </div>

              {/* Navigation Links */}
              <div className="border-border/40 space-y-3 border-t pt-2">
                <label className="text-foreground text-[13px] font-semibold">Navigation Menu</label>
                <div className="space-y-2">
                  {headerLinks.split(",").map((link, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="bg-muted/30 border-border/40 flex-1 rounded-md border px-3 py-1.5 text-[12px]">
                        {link.trim()}
                      </div>
                      <button className="border-border/40 text-muted-foreground hover:bg-destructive hover:text-destructive-foreground hover:border-destructive flex h-7 w-7 items-center justify-center rounded border transition-colors">
                        <Minus className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-full gap-1.5 border-dashed text-[11px]"
                  >
                    <Plus className="h-3 w-3" /> Add Menu Item
                  </Button>
                </div>
              </div>

              <div className="border-border/40 space-y-3 border-t pt-2">
                <label className="text-foreground text-[13px] font-semibold">
                  Call to Action Button
                </label>
                <input
                  type="text"
                  value={headerCta}
                  onChange={(e) => setHeaderCta(e.target.value)}
                  className="bg-background border-border/60 focus:border-primary/50 w-full rounded-md border px-3 py-2 text-[13px] outline-none"
                />
              </div>
            </>
          )}

          {activePart.id === 2 && (
            <>
              {/* Footer Layout & Theme Toggle */}
              <div className="space-y-3">
                <label className="text-foreground flex items-center justify-between text-[13px] font-semibold">
                  Footer Layout
                </label>
                <div className="bg-muted/50 border-border/40 grid grid-cols-2 gap-1 rounded-lg border p-1">
                  {["Standard", "Minimal"].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setFooterLayout(mode)}
                      className={`rounded-md py-1.5 text-[12px] font-medium transition-colors ${footerLayout === mode ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-border/40 space-y-3 border-t pt-2">
                <label className="text-foreground flex items-center justify-between text-[13px] font-semibold">
                  Color Theme
                </label>
                <div className="bg-muted/50 border-border/40 grid grid-cols-2 gap-1 rounded-lg border p-1">
                  {["Light", "Dark"].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setFooterTheme(mode)}
                      className={`rounded-md py-1.5 text-[12px] font-medium transition-colors ${footerTheme === mode ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Elements Toggles */}
              <div className="border-border/40 space-y-3 border-t pt-2">
                <label className="text-foreground text-[13px] font-semibold">
                  Visibility Elements
                </label>
                <div className="space-y-2">
                  <label className="bg-muted/30 border-border/40 hover:bg-muted/50 flex cursor-pointer items-center gap-3 rounded-md border p-2 transition-colors">
                    <input
                      type="checkbox"
                      checked={showSocials}
                      onChange={(e) => setShowSocials(e.target.checked)}
                      className="border-border/60 text-primary focus:ring-primary h-4 w-4 rounded"
                    />
                    <span className="text-[13px]">Social Media Icons</span>
                  </label>
                  <label className="bg-muted/30 border-border/40 hover:bg-muted/50 flex cursor-pointer items-center gap-3 rounded-md border p-2 transition-colors">
                    <input
                      type="checkbox"
                      checked={showNewsletter}
                      onChange={(e) => setShowNewsletter(e.target.checked)}
                      className="border-border/60 text-primary focus:ring-primary h-4 w-4 rounded"
                    />
                    <span className="text-[13px]">Newsletter Form</span>
                  </label>
                </div>
              </div>

              {/* Columns Builder */}
              <div className="border-border/40 space-y-3 border-t pt-2">
                <label className="text-foreground text-[13px] font-semibold">
                  Footer Columns & Links
                </label>
                <div className="space-y-3">
                  {footerColsData.map((col, i) => (
                    <div
                      key={col.id}
                      className="bg-muted/10 border-border/40 flex flex-col gap-2 overflow-hidden rounded-lg border"
                    >
                      {/* Column Header */}
                      <div className="bg-muted/30 border-border/40 flex items-center gap-2 border-b p-2">
                        <div className="bg-background text-muted-foreground/60 border-border/40 flex h-5 w-5 shrink-0 cursor-grab items-center justify-center rounded border">
                          <AlignCenter className="h-3 w-3" />
                        </div>
                        <input
                          type="text"
                          value={col.title}
                          onChange={(e) => {
                            const newData = [...footerColsData];
                            newData[i].title = e.target.value;
                            setFooterColsData(newData);
                          }}
                          className="flex-1 bg-transparent text-[13px] font-bold outline-none"
                        />
                        <button
                          onClick={() => {
                            const newData = footerColsData.filter((_, idx) => idx !== i);
                            setFooterColsData(newData);
                          }}
                          className="text-muted-foreground hover:bg-destructive hover:text-destructive-foreground flex h-6 w-6 shrink-0 items-center justify-center rounded transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Links List */}
                      <div className="space-y-2 p-2">
                        {col.links.map((link, j) => (
                          <div key={j} className="flex items-center gap-2">
                            <div className="bg-border ml-2 h-1.5 w-1.5 shrink-0 rounded-full"></div>
                            <input
                              type="text"
                              value={link}
                              onChange={(e) => {
                                const newData = [...footerColsData];
                                newData[i].links[j] = e.target.value;
                                setFooterColsData(newData);
                              }}
                              className="text-muted-foreground focus:border-border/60 -ml-1 flex-1 rounded border border-transparent bg-transparent px-1 text-[12px] transition-colors outline-none"
                            />
                            <button
                              onClick={() => {
                                const newData = [...footerColsData];
                                newData[i].links.splice(j, 1);
                                setFooterColsData(newData);
                              }}
                              className="text-muted-foreground/60 hover:text-destructive flex h-5 w-5 shrink-0 items-center justify-center rounded transition-colors"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newData = [...footerColsData];
                            newData[i].links.push("New Link");
                            setFooterColsData(newData);
                          }}
                          className="text-primary hover:text-primary hover:bg-primary/10 hover:border-primary/20 mt-1 h-7 w-full border border-dashed border-transparent text-[11px]"
                        >
                          <Plus className="mr-1 h-3 w-3" /> Add Link
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setFooterColsData([
                        ...footerColsData,
                        { id: Date.now(), title: "New Column", links: ["Link 1"] },
                      ]);
                    }}
                    className="bg-muted/20 h-8 w-full gap-1.5 border-dashed text-[11px]"
                  >
                    <Plus className="h-3 w-3" /> Add New Column
                  </Button>
                </div>
              </div>

              <div className="border-border/40 space-y-3 border-t pt-2">
                <label className="text-foreground text-[13px] font-semibold">Copyright Text</label>
                <input
                  type="text"
                  value={footerCopy}
                  onChange={(e) => setFooterCopy(e.target.value)}
                  className="bg-background border-border/60 focus:border-primary/50 w-full rounded-md border px-3 py-2 text-[13px] outline-none"
                />
              </div>
            </>
          )}

          {activePart.id > 2 && (
            <div className="py-10 text-center">
              <LayoutTemplate className="text-muted-foreground/30 mx-auto mb-3 h-8 w-8" />
              <p className="text-muted-foreground text-[13px]">
                Template layout settings are determined by the active Theme Framework.
              </p>
            </div>
          )}
        </div>

        <div className="border-border/30 bg-muted/20 border-t p-4">
          <Button variant="solid" className="w-full gap-2">
            <Save className="h-4 w-4" /> Save Global Settings
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
