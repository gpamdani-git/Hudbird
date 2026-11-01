// apps/docs/src/pages/IconsDoc.tsx
import React, { useState, useMemo } from "react";
import { DocHeader } from "../components/DocHeader";
import { IconBox, Button, Badge, HudbirdIcon, Tabs, Tab, Input } from "@hudbird/ui";
import {
  Search,
  Check,
  // 1. Navigation & Wayfinding
  Home,
  Compass,
  Menu,
  Layers,
  Grid,
  Map,
  MapPin,
  Navigation,
  Navigation2,
  PanelLeft,
  PanelRight,
  Sidebar,
  // 2. Actions & Controls
  Plus,
  Minus,
  Check as CheckIcon,
  X,
  Edit,
  Edit2,
  Edit3,
  Trash2,
  Copy,
  Share2,
  Download,
  Upload,
  ExternalLink,
  RefreshCw,
  RotateCw,
  Filter,
  SlidersHorizontal,
  // 3. Arrows & Directions
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  ChevronsRight,
  ChevronsLeft,
  ArrowUpRight,
  ArrowDownRight,
  Move,
  Maximize2,
  Minimize2,
  // 4. Communication & Social
  Mail,
  MessageSquare,
  Send,
  Bell,
  Phone,
  PhoneCall,
  AtSign,
  Globe,
  Share,
  Inbox,
  // 5. Users, Accounts & Security
  User,
  Users,
  UserPlus,
  UserCheck,
  UserX,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Key,
  Fingerprint,
  Lock,
  Unlock,
  // 6. Commerce & Finance
  ShoppingCart,
  ShoppingBag,
  CreditCard,
  DollarSign,
  Wallet,
  Receipt,
  Tag,
  Percent,
  Banknote,
  Coins,
  // 7. Files, Folders & Documents
  File,
  FileText,
  Files,
  Folder,
  FolderPlus,
  FolderKanban,
  Archive,
  Paperclip,
  Clipboard,
  BookOpen,
  // 8. Devices, System & Hardware
  Laptop,
  Smartphone,
  Monitor,
  Tablet,
  Cpu,
  Database,
  Server,
  HardDrive,
  Terminal,
  Code2,
  Wifi,
  Bluetooth,
  Battery,
  // 9. Analytics & Data Metrics
  BarChart3,
  LineChart,
  PieChart,
  Activity,
  TrendingUp,
  TrendingDown,
  Gauge,
  Target,
  // 10. Status, Alerts & Feedback
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  XCircle,
  Info,
  HelpCircle,
  Eye,
  EyeOff,
  // 11. Media & Multimedia
  Play,
  Pause,
  Volume2,
  VolumeX,
  Mic,
  Video,
  Image as ImageIcon,
  Music,
  Camera,
  Headphones,
  // 12. Delight, Accents & General
  Sparkles,
  Star,
  Flame,
  Heart,
  Award,
  Gem,
  Rocket,
  Crown,
  Wand2,
  Gift,
  Sun,
  Moon,
  Zap,
  Clock,
  Calendar,
  Settings,
} from "lucide-react";

interface IconItem {
  name: string;
  component: React.ComponentType<{ className?: string; strokeWidth?: number | string }>;
  keywords: string[];
}

interface IconCategory {
  id: string;
  title: string;
  description: string;
  icons: IconItem[];
}

const CATEGORIES: IconCategory[] = [
  {
    id: "navigation",
    title: "Navigation & Wayfinding",
    description: "Essential icons for sidebars, tabs, breadcrumbs, maps, and app hierarchies.",
    icons: [
      { name: "Home", component: Home, keywords: ["main", "dashboard", "house"] },
      { name: "Compass", component: Compass, keywords: ["explore", "discover", "travel"] },
      { name: "Menu", component: Menu, keywords: ["hamburger", "sidebar", "nav"] },
      { name: "Layers", component: Layers, keywords: ["stack", "depth", "hierarchy"] },
      { name: "Grid", component: Grid, keywords: ["bento", "layout", "cards"] },
      { name: "Map", component: Map, keywords: ["location", "gps", "travel"] },
      { name: "MapPin", component: MapPin, keywords: ["marker", "location", "place"] },
      { name: "Navigation", component: Navigation, keywords: ["pointer", "direction", "gps"] },
      { name: "Navigation2", component: Navigation2, keywords: ["arrow", "compass", "heading"] },
      { name: "PanelLeft", component: PanelLeft, keywords: ["sidebar", "drawer", "left"] },
      { name: "PanelRight", component: PanelRight, keywords: ["inspector", "drawer", "right"] },
      { name: "Sidebar", component: Sidebar, keywords: ["rail", "navigation", "layout"] },
    ],
  },
  {
    id: "actions",
    title: "Actions & Controls",
    description: "Interactive clickables for forms, toolbars, modal triggers, and mutations.",
    icons: [
      { name: "Plus", component: Plus, keywords: ["add", "new", "create"] },
      { name: "Minus", component: Minus, keywords: ["remove", "subtract", "decrease"] },
      { name: "Check", component: CheckIcon, keywords: ["done", "confirm", "select"] },
      { name: "X", component: X, keywords: ["close", "cancel", "dismiss", "remove"] },
      { name: "Search", component: Search, keywords: ["find", "lookup", "query"] },
      { name: "Edit", component: Edit, keywords: ["modify", "pencil", "write"] },
      { name: "Edit2", component: Edit2, keywords: ["pen", "draft", "revise"] },
      { name: "Edit3", component: Edit3, keywords: ["pen", "pencil", "input"] },
      { name: "Trash2", component: Trash2, keywords: ["delete", "remove", "bin"] },
      { name: "Copy", component: Copy, keywords: ["duplicate", "clipboard", "clone"] },
      { name: "Share2", component: Share2, keywords: ["social", "link", "dispatch"] },
      { name: "Download", component: Download, keywords: ["save", "export", "file"] },
      { name: "Upload", component: Upload, keywords: ["import", "cloud", "file"] },
      { name: "ExternalLink", component: ExternalLink, keywords: ["open", "new tab", "url"] },
      { name: "RefreshCw", component: RefreshCw, keywords: ["sync", "reload", "update"] },
      { name: "RotateCw", component: RotateCw, keywords: ["turn", "rotate", "redo"] },
      { name: "Filter", component: Filter, keywords: ["sort", "refine", "funnel"] },
      {
        name: "SlidersHorizontal",
        component: SlidersHorizontal,
        keywords: ["adjust", "tune", "parameters"],
      },
    ],
  },
  {
    id: "arrows",
    title: "Arrows & Directions",
    description: "Wayfinding arrows, chevrons, accordions, and pagination indicators.",
    icons: [
      { name: "ArrowRight", component: ArrowRight, keywords: ["forward", "next", "proceed"] },
      { name: "ArrowLeft", component: ArrowLeft, keywords: ["back", "previous", "return"] },
      { name: "ArrowUp", component: ArrowUp, keywords: ["top", "ascend", "upload"] },
      { name: "ArrowDown", component: ArrowDown, keywords: ["bottom", "descend", "download"] },
      {
        name: "ChevronRight",
        component: ChevronRight,
        keywords: ["expand", "forward", "accordion"],
      },
      { name: "ChevronLeft", component: ChevronLeft, keywords: ["collapse", "back", "previous"] },
      { name: "ChevronUp", component: ChevronUp, keywords: ["up", "ascend", "close"] },
      { name: "ChevronDown", component: ChevronDown, keywords: ["down", "dropdown", "open"] },
      {
        name: "ChevronsRight",
        component: ChevronsRight,
        keywords: ["fast-forward", "end", "skip"],
      },
      { name: "ChevronsLeft", component: ChevronsLeft, keywords: ["rewind", "start", "first"] },
      { name: "ArrowUpRight", component: ArrowUpRight, keywords: ["diagonal", "external", "link"] },
      { name: "ArrowDownRight", component: ArrowDownRight, keywords: ["diagonal", "down", "out"] },
      { name: "Move", component: Move, keywords: ["drag", "position", "pan"] },
      { name: "Maximize2", component: Maximize2, keywords: ["fullscreen", "expand", "scale"] },
      {
        name: "Minimize2",
        component: Minimize2,
        keywords: ["exit fullscreen", "contract", "shrink"],
      },
    ],
  },
  {
    id: "communication",
    title: "Communication & Messaging",
    description:
      "Messaging channels, email notifications, customer support, and social interactions.",
    icons: [
      { name: "Mail", component: Mail, keywords: ["email", "letter", "inbox"] },
      {
        name: "MessageSquare",
        component: MessageSquare,
        keywords: ["chat", "comment", "discussion"],
      },
      { name: "Send", component: Send, keywords: ["dispatch", "submit", "paperplane"] },
      { name: "Bell", component: Bell, keywords: ["notifications", "alerts", "alarm"] },
      { name: "Phone", component: Phone, keywords: ["call", "contact", "support"] },
      { name: "PhoneCall", component: PhoneCall, keywords: ["dial", "ring", "voice"] },
      { name: "AtSign", component: AtSign, keywords: ["mention", "email", "handle"] },
      { name: "Globe", component: Globe, keywords: ["web", "internet", "international"] },
      { name: "Share", component: Share, keywords: ["social", "distribute", "forward"] },
      { name: "Inbox", component: Inbox, keywords: ["mailbox", "messages", "tray"] },
    ],
  },
  {
    id: "users-security",
    title: "Users, Accounts & Security",
    description: "Authentication, user management, permissions, and security encryption.",
    icons: [
      { name: "User", component: User, keywords: ["profile", "person", "account"] },
      { name: "Users", component: Users, keywords: ["team", "group", "community"] },
      { name: "UserPlus", component: UserPlus, keywords: ["invite", "add member", "sign up"] },
      { name: "UserCheck", component: UserCheck, keywords: ["verified", "approved", "active"] },
      { name: "UserX", component: UserX, keywords: ["blocked", "removed", "ban"] },
      { name: "Shield", component: Shield, keywords: ["security", "firewall", "protect"] },
      { name: "ShieldCheck", component: ShieldCheck, keywords: ["verified", "safe", "secured"] },
      { name: "ShieldAlert", component: ShieldAlert, keywords: ["warning", "danger", "breach"] },
      { name: "Key", component: Key, keywords: ["password", "api key", "access"] },
      {
        name: "Fingerprint",
        component: Fingerprint,
        keywords: ["biometric", "passkey", "touch id"],
      },
      { name: "Lock", component: Lock, keywords: ["private", "encrypted", "secure"] },
      { name: "Unlock", component: Unlock, keywords: ["public", "open", "unrestricted"] },
    ],
  },
  {
    id: "commerce",
    title: "Commerce & Finance",
    description: "Checkout flows, carts, payments, invoices, currencies, and pricing tables.",
    icons: [
      { name: "ShoppingCart", component: ShoppingCart, keywords: ["store", "cart", "buy", "shop"] },
      { name: "ShoppingBag", component: ShoppingBag, keywords: ["ecommerce", "retail", "bag"] },
      { name: "CreditCard", component: CreditCard, keywords: ["payment", "visa", "billing"] },
      { name: "DollarSign", component: DollarSign, keywords: ["money", "price", "usd"] },
      { name: "Wallet", component: Wallet, keywords: ["balance", "funds", "crypto"] },
      { name: "Receipt", component: Receipt, keywords: ["invoice", "order", "bill"] },
      { name: "Tag", component: Tag, keywords: ["price", "discount", "label"] },
      { name: "Percent", component: Percent, keywords: ["discount", "rate", "promotion"] },
      { name: "Banknote", component: Banknote, keywords: ["cash", "currency", "paper money"] },
      { name: "Coins", component: Coins, keywords: ["currency", "points", "rewards"] },
    ],
  },
  {
    id: "files",
    title: "Files, Folders & Documents",
    description: "File managers, document previews, attachments, and asset repositories.",
    icons: [
      { name: "File", component: File, keywords: ["document", "item", "page"] },
      { name: "FileText", component: FileText, keywords: ["notes", "article", "contract"] },
      { name: "Files", component: Files, keywords: ["multiple", "library", "documents"] },
      { name: "Folder", component: Folder, keywords: ["directory", "category", "collection"] },
      {
        name: "FolderPlus",
        component: FolderPlus,
        keywords: ["new folder", "create", "directory"],
      },
      { name: "FolderKanban", component: FolderKanban, keywords: ["projects", "boards", "tasks"] },
      { name: "Archive", component: Archive, keywords: ["zip", "backup", "store"] },
      { name: "Paperclip", component: Paperclip, keywords: ["attachment", "clip", "include"] },
      { name: "Clipboard", component: Clipboard, keywords: ["paste", "survey", "tasklist"] },
      { name: "BookOpen", component: BookOpen, keywords: ["docs", "guide", "manual", "read"] },
    ],
  },
  {
    id: "hardware",
    title: "Devices, System & Hardware",
    description:
      "Server hardware, edge infrastructure, developer terminals, and network connectivity.",
    icons: [
      { name: "Laptop", component: Laptop, keywords: ["computer", "macbook", "device"] },
      { name: "Smartphone", component: Smartphone, keywords: ["mobile", "iphone", "phone"] },
      { name: "Monitor", component: Monitor, keywords: ["screen", "display", "desktop"] },
      { name: "Tablet", component: Tablet, keywords: ["ipad", "surface", "tablet"] },
      { name: "Cpu", component: Cpu, keywords: ["processor", "chip", "compute"] },
      { name: "Database", component: Database, keywords: ["sql", "storage", "postgres"] },
      { name: "Server", component: Server, keywords: ["backend", "cloud", "host"] },
      { name: "HardDrive", component: HardDrive, keywords: ["disk", "storage", "memory"] },
      { name: "Terminal", component: Terminal, keywords: ["cli", "console", "bash"] },
      { name: "Code2", component: Code2, keywords: ["developer", "syntax", "source"] },
      { name: "Wifi", component: Wifi, keywords: ["network", "wireless", "internet"] },
      { name: "Bluetooth", component: Bluetooth, keywords: ["wireless", "pair", "connect"] },
      { name: "Battery", component: Battery, keywords: ["power", "energy", "charge"] },
    ],
  },
  {
    id: "analytics",
    title: "Analytics & Data Metrics",
    description: "Charts, dashboards, telemetries, KPIs, and statistical indicators.",
    icons: [
      { name: "BarChart3", component: BarChart3, keywords: ["statistics", "columns", "report"] },
      { name: "LineChart", component: LineChart, keywords: ["trend", "timeline", "continuous"] },
      { name: "PieChart", component: PieChart, keywords: ["distribution", "share", "ratio"] },
      { name: "Activity", component: Activity, keywords: ["pulse", "health", "uptime"] },
      { name: "TrendingUp", component: TrendingUp, keywords: ["growth", "increase", "profit"] },
      { name: "TrendingDown", component: TrendingDown, keywords: ["decrease", "loss", "drop"] },
      { name: "Gauge", component: Gauge, keywords: ["speed", "performance", "meter"] },
      { name: "Target", component: Target, keywords: ["goal", "kpi", "objective"] },
    ],
  },
  {
    id: "status",
    title: "Status, Alerts & Feedback",
    description: "Banners, toasts, alert dialogs, validation indicators, and privacy toggles.",
    icons: [
      { name: "CheckCircle2", component: CheckCircle2, keywords: ["success", "approved", "done"] },
      {
        name: "AlertTriangle",
        component: AlertTriangle,
        keywords: ["warning", "caution", "notice"],
      },
      { name: "AlertCircle", component: AlertCircle, keywords: ["urgent", "attention", "error"] },
      { name: "XCircle", component: XCircle, keywords: ["failure", "cancelled", "rejected"] },
      { name: "Info", component: Info, keywords: ["tooltip", "help", "information"] },
      { name: "HelpCircle", component: HelpCircle, keywords: ["faq", "question", "support"] },
      { name: "Eye", component: Eye, keywords: ["view", "preview", "visible"] },
      { name: "EyeOff", component: EyeOff, keywords: ["hide", "password", "masked"] },
    ],
  },
  {
    id: "media",
    title: "Media & Multimedia",
    description: "Audio players, video streaming, camera feeds, and graphic assets.",
    icons: [
      { name: "Play", component: Play, keywords: ["start", "resume", "media"] },
      { name: "Pause", component: Pause, keywords: ["stop", "freeze", "wait"] },
      { name: "Volume2", component: Volume2, keywords: ["sound", "audio", "speaker"] },
      { name: "VolumeX", component: VolumeX, keywords: ["mute", "silent", "quiet"] },
      { name: "Mic", component: Mic, keywords: ["voice", "record", "podcast"] },
      { name: "Video", component: Video, keywords: ["film", "stream", "record"] },
      { name: "Image", component: ImageIcon, keywords: ["photo", "picture", "asset"] },
      { name: "Music", component: Music, keywords: ["song", "tune", "soundtrack"] },
      { name: "Camera", component: Camera, keywords: ["capture", "photo", "lens"] },
      { name: "Headphones", component: Headphones, keywords: ["listen", "audio", "music"] },
    ],
  },
  {
    id: "delight",
    title: "Delight, Accents & General",
    description: "Hero highlights, AI features, badges, timestamps, and system preferences.",
    icons: [
      { name: "Sparkles", component: Sparkles, keywords: ["ai", "magic", "featured", "glow"] },
      { name: "Star", component: Star, keywords: ["favorite", "rating", "bookmark"] },
      { name: "Flame", component: Flame, keywords: ["trending", "hot", "popular"] },
      { name: "Heart", component: Heart, keywords: ["like", "favorite", "love"] },
      { name: "Award", component: Award, keywords: ["badge", "achievement", "medal"] },
      { name: "Gem", component: Gem, keywords: ["pro", "premium", "luxury", "diamond"] },
      { name: "Rocket", component: Rocket, keywords: ["launch", "deploy", "fast"] },
      { name: "Crown", component: Crown, keywords: ["vip", "admin", "king"] },
      { name: "Wand2", component: Wand2, keywords: ["auto", "generate", "magic"] },
      { name: "Gift", component: Gift, keywords: ["reward", "bonus", "discount"] },
      { name: "Sun", component: Sun, keywords: ["light mode", "day", "brightness"] },
      { name: "Moon", component: Moon, keywords: ["dark mode", "night", "theme"] },
      { name: "Zap", component: Zap, keywords: ["lightning", "instant", "power"] },
      { name: "Clock", component: Clock, keywords: ["time", "duration", "history"] },
      { name: "Calendar", component: Calendar, keywords: ["date", "events", "schedule"] },
      { name: "Settings", component: Settings, keywords: ["gear", "preferences", "config"] },
    ],
  },
];

export const iconsTocItems = [
  { id: "interactive-explorer", title: "Icons Directory Explorer" },
  ...CATEGORIES.map((c) => ({ id: c.id, title: c.title })),
  { id: "brandmark", title: "Official Hudbird Brandmark" },
];

export default function IconsDoc() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [displayMode, setDisplayMode] = useState<"iconbox" | "bare">("iconbox");
  const [strokeWidth, setStrokeWidth] = useState<number>(1.5);
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);
  const [copiedNpm, setCopiedNpm] = useState(false);

  // Total count of all icons across every category
  const totalAllIcons = useMemo(() => {
    return CATEGORIES.reduce((acc, cat) => acc + cat.icons.length, 0);
  }, []);

  // Filtered categories and icons according to search query AND selectedCategory filter
  const filteredCategories = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return CATEGORIES.filter((cat) => {
      if (selectedCategory === "all") return true;
      return cat.id === selectedCategory;
    })
      .map((cat) => {
        const matchingIcons = cat.icons.filter((item) => {
          if (!q) return true;
          return (
            item.name.toLowerCase().includes(q) ||
            cat.title.toLowerCase().includes(q) ||
            item.keywords.some((kw) => kw.toLowerCase().includes(q))
          );
        });

        return {
          ...cat,
          icons: matchingIcons,
        };
      })
      .filter((cat) => cat.icons.length > 0);
  }, [searchQuery, selectedCategory]);

  const totalMatchingIcons = useMemo(() => {
    return filteredCategories.reduce((acc, cat) => acc + cat.icons.length, 0);
  }, [filteredCategories]);

  const handleCopy = (name: string) => {
    const textToCopy =
      displayMode === "iconbox"
        ? `<IconBox variant="brand" icon={${name}} />`
        : `import { ${name} } from "lucide-react";`;

    navigator.clipboard.writeText(textToCopy);
    setCopiedIcon(name);
    setTimeout(() => {
      setCopiedIcon(null);
    }, 2000);
  };

  return (
    <div className="space-y-16 pb-24 sm:space-y-24">
      {/* Title & Introduction */}
      <DocHeader
        category="Foundations"
        title="Icons"
        badge="Lucide React 140+"
        description="Curated stroke-balanced vector icons powering Hudbird UI components, built on an open-source 24×24 grid."
      />

      {/* Lucide Attribution & Quick Install Bar (Restrained & Integrated) */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-zinc-200/80 bg-zinc-50/60 px-4 py-2.5 dark:border-white/[0.08] dark:bg-white/[0.02]">
        <div className="flex items-center gap-2.5">
          <svg
            role="img"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4 shrink-0 text-zinc-900 dark:text-white"
            aria-label="Lucide Logo"
          >
            <path d="M12 0L1.608 6v12L12 24l10.392-6V6L12 0zm0 2.146l8.536 4.928v9.852L12 21.854l-8.536-4.928V7.074L12 2.146z" />
          </svg>
          <span className="text-xs font-semibold text-zinc-900 dark:text-white">Lucide React</span>
          <span className="text-xs text-zinc-300 dark:text-zinc-700">•</span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            ISC License • 140+ Icons in registry
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="bordered"
            color="secondary"
            radius="md"
            onClick={() => {
              navigator.clipboard.writeText("pnpm add lucide-react");
              setCopiedNpm(true);
              setTimeout(() => setCopiedNpm(false), 2000);
            }}
            className="font-mono"
            title="Copy install command"
          >
            {copiedNpm ? (
              <Check className="h-3.5 w-3.5 text-emerald-500" />
            ) : (
              <Copy className="h-3.5 w-3.5 text-zinc-400" />
            )}
            <span>pnpm add lucide-react</span>
          </Button>
          <Button
            href="https://lucide.dev"
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
            variant="light"
            color="secondary"
            radius="md"
          >
            <span>lucide.dev</span>
            <ExternalLink className="h-3.5 w-3.5 opacity-60" />
          </Button>
          <Button
            href="https://github.com/lucide-icons/lucide"
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
            variant="light"
            color="secondary"
            radius="md"
          >
            <span>GitHub</span>
            <ExternalLink className="h-3.5 w-3.5 opacity-60" />
          </Button>
        </div>
      </div>

      {/* Main Interactive Explorer Bar */}
      <section id="interactive-explorer" className="scroll-mt-24 space-y-4">
        <div className="sticky top-20 z-30 space-y-3.5 rounded-2xl border border-zinc-200/80 bg-white/95 p-4 shadow-sm backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#161618]/95">
          {/* Top Row: Search Input + Segmented Toggles in One Balanced Row */}
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            {/* Search Input */}
            <div className="flex-1">
              <Input
                placeholder="Search 140+ icons across all categories (e.g. arrow, user, shopping, chart)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                isClearable
                onClear={() => setSearchQuery("")}
                startContent={<Search className="h-4 w-4 text-zinc-400" />}
              />
            </div>

            {/* Segmented Display Toggles (Using Core Hudbird UI Tabs Component) */}
            <div className="flex shrink-0 items-center gap-3">
              {/* Display Mode: In IconBox vs Bare */}
              <Tabs
                size="sm"
                variant="solid"
                radius="md"
                selectedKey={displayMode}
                onSelectionChange={(k) => setDisplayMode(k as "iconbox" | "bare")}
              >
                <Tab tabKey="iconbox" title="In IconBox" />
                <Tab tabKey="bare" title="Bare Icon" />
              </Tabs>

              {/* Stroke Weight: 1.5px vs 2.0px */}
              <Tabs
                size="sm"
                variant="solid"
                radius="md"
                selectedKey={String(strokeWidth)}
                onSelectionChange={(k) => setStrokeWidth(Number(k))}
              >
                <Tab tabKey="1.5" title="1.5px" />
                <Tab tabKey="2" title="2.0px" />
              </Tabs>
            </div>
          </div>

          {/* Bottom Row: Category Navigation Tabs (Standard Core Button Anisotropic Padding) */}
          <div className="flex scrollbar-none items-center gap-1.5 overflow-x-auto border-t border-zinc-100 pt-2.5 dark:border-white/[0.06]">
            <Button
              size="sm"
              variant={selectedCategory === "all" ? "solid" : "light"}
              color={selectedCategory === "all" ? "dark" : "secondary"}
              radius="full"
              onClick={() => setSelectedCategory("all")}
              className="shrink-0"
            >
              All ({totalAllIcons})
            </Button>
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <Button
                  key={cat.id}
                  size="sm"
                  variant={isSelected ? "solid" : "light"}
                  color={isSelected ? "dark" : "secondary"}
                  radius="full"
                  onClick={() => setSelectedCategory(cat.id)}
                  className="shrink-0"
                >
                  <span>{cat.title.split("&")[0].trim()}</span>
                  <span className="font-mono text-[11px] opacity-60">({cat.icons.length})</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Global Counter Banner & Feedback */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <span>
              Showing{" "}
              <strong className="text-zinc-900 dark:text-white">{totalMatchingIcons}</strong> of{" "}
              {totalAllIcons} icons
            </span>
            {selectedCategory !== "all" && (
              <Button
                size="sm"
                variant="light"
                color="secondary"
                onClick={() => setSelectedCategory("all")}
                className="h-6 px-2 text-xs"
              >
                Reset category filter
              </Button>
            )}
          </div>
          <span className="text-zinc-400 italic">Click any icon tile to copy React snippet</span>
        </div>
      </section>

      {/* Empty State when no icons match filter or search */}
      {filteredCategories.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-200 p-12 text-center dark:border-white/10">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400 dark:bg-white/5 dark:text-zinc-500">
            <Search className="h-6 w-6" />
          </div>
          <h4 className="font-semibold text-zinc-900 dark:text-white">No icons found</h4>
          <p className="mt-1 max-w-sm text-xs text-zinc-500">
            {searchQuery
              ? `No icons matched "${searchQuery}". Try a different keyword or reset filters.`
              : "No icons available for this selected category."}
          </p>
          <div className="mt-4 flex items-center gap-2">
            {searchQuery && (
              <Button size="sm" variant="outline" onClick={() => setSearchQuery("")}>
                Clear Search
              </Button>
            )}
            {selectedCategory !== "all" && (
              <Button size="sm" variant="outline" onClick={() => setSelectedCategory("all")}>
                View All Categories
              </Button>
            )}
          </div>
        </div>
      )}

      {/* All Categorized Sections Rendered Sequentially on the Page */}
      <div className="space-y-20">
        {filteredCategories.map((category) => (
          <section key={category.id} id={category.id} className="scroll-mt-48 space-y-5">
            {/* Category Header */}
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-zinc-200/70 pb-3 dark:border-white/[0.08]">
              <div>
                <h3 className="font-outfit flex items-center gap-3 text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl dark:text-white">
                  <span>{category.title}</span>
                  <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-semibold text-zinc-600 dark:bg-white/10 dark:text-zinc-300">
                    {category.icons.length}
                  </span>
                </h3>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  {category.description}
                </p>
              </div>
            </div>

            {/* Category Icons Grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {category.icons.map((item) => {
                const Icon = item.component;
                const isJustCopied = copiedIcon === item.name;

                return (
                  <div
                    key={item.name}
                    onClick={() => handleCopy(item.name)}
                    className="group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-zinc-200/80 bg-white p-3.5 transition-all duration-200 hover:border-zinc-400 hover:shadow-md active:scale-[0.97] dark:border-white/[0.08] dark:bg-[#161618] dark:hover:border-white/30"
                  >
                    {/* Copied Overlay Badge */}
                    {isJustCopied && (
                      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-2xl bg-zinc-900/95 text-white backdrop-blur-sm transition-all dark:bg-white dark:text-zinc-950">
                        <Check className="mb-1 h-5 w-5 text-emerald-500" />
                        <span className="text-[11px] font-bold">Copied!</span>
                      </div>
                    )}

                    {/* Icon Rendering */}
                    <div className="my-2 flex items-center justify-center">
                      {displayMode === "iconbox" ? (
                        <IconBox
                          variant="glass"
                          size="md"
                          showGlow={true}
                          icon={Icon}
                          className="transition-transform group-hover:scale-105 group-hover:border-zinc-400 dark:group-hover:border-white/40"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center text-zinc-700 transition-colors group-hover:text-zinc-950 dark:text-zinc-300 dark:group-hover:text-white">
                          <Icon className="h-6 w-6" strokeWidth={strokeWidth} />
                        </div>
                      )}
                    </div>

                    {/* Name */}
                    <span className="mt-1 max-w-full truncate text-center text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Official Hudbird Brandmark */}
      <section id="brandmark" className="scroll-mt-24 space-y-6">
        <div>
          <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
            Official Hudbird Brandmark
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Vector-precise official Hudbird "h" brandmark SVG primitive supporting responsive
            currentColor sizing.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 rounded-2xl border border-zinc-200/80 bg-white p-6 sm:flex-row dark:border-white/[0.08] dark:bg-[#161618]">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-xl dark:bg-white dark:text-zinc-950">
            <HudbirdIcon className="h-10 w-10" />
          </div>

          <div className="flex-1 space-y-2 text-center sm:text-left">
            <h4 className="font-semibold text-zinc-900 dark:text-white">HudbirdIcon Component</h4>
            <p className="text-xs text-zinc-500">
              Exported natively from <code className="font-mono text-xs">@hudbird/ui</code>. Adheres
              to current text color and geometric scale.
            </p>
            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `import { HudbirdIcon } from "@hudbird/ui";\n\n<HudbirdIcon className="w-8 h-8 text-brand-500" />`
                  );
                  alert("Copied HudbirdIcon snippet!");
                }}
              >
                Copy Component Snippet
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Lucide React Attribution & Open Source Acknowledgements */}
      <section id="attribution-credits" className="scroll-mt-24 space-y-4">
        <div className="space-y-3 rounded-2xl border border-zinc-200/80 bg-zinc-50/70 p-6 dark:border-white/[0.08] dark:bg-[#161618]/70">
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">
              Open Source Iconography Credit
            </h4>
          </div>
          <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
            All iconography displayed on this page is powered by the open-source{" "}
            <a
              href="https://lucide.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-500 font-semibold text-zinc-900 underline underline-offset-2 dark:text-white"
            >
              Lucide React
            </a>{" "}
            project (originally derived from Feather Icons), released under the{" "}
            <a
              href="https://github.com/lucide-icons/lucide/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-500 font-semibold text-zinc-900 underline underline-offset-2 dark:text-white"
            >
              ISC License
            </a>
            . Special thanks to the Lucide maintainers and community contributors for providing a
            world-class, stroke-balanced icon system for modern design engineering.
          </p>
        </div>
      </section>
    </div>
  );
}
