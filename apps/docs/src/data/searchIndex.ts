export interface SearchItem {
  id: string;
  title: string;
  category: "Getting Started" | "Components" | "Layouts" | "Sections";
  path: string;
  description: string;
  keywords?: string[];
  isNew?: boolean;
  parent?: string;
}

export const searchIndex: SearchItem[] = [
  // Getting Started
  {
    id: "getting-started",
    title: "Getting started",
    category: "Getting Started",
    path: "/",
    description:
      "Overview, quick installation, dependencies, Tailwind CSS integration, and client router setup.",
    keywords: [
      "install",
      "setup",
      "quickstart",
      "tailwind",
      "react",
      "guide",
      "overview",
      "introduction",
    ],
  },
  {
    id: "cli-reference",
    title: "CLI Reference",
    category: "Getting Started",
    path: "/cli",
    description:
      "Official Hudbird UI CLI documentation: init, add, list, diff, components.json, and batch installation.",
    keywords: [
      "cli",
      "terminal",
      "command",
      "hudbird-ui",
      "components.json",
      "diff",
      "list",
      "add",
      "init",
      "scaffold",
      "batch",
      "update",
    ],
    isNew: true,
  },
  {
    id: "ai-skills",
    title: "AI Agent Skills",
    category: "Getting Started",
    path: "/ai-skills",
    description:
      "Guide for using Hudbird UI skills in Claude Code, Codex, Antigravity, Cursor, and Windsurf with real working prompts.",
    keywords: [
      "ai",
      "skills",
      "agent",
      "claude",
      "claude code",
      "codex",
      "antigravity",
      "cursor",
      "windsurf",
      "prompt",
      "llm",
      "skill.md",
    ],
    isNew: true,
  },
  {
    id: "installation-guide",
    title: "Tutorial Install Guide",
    category: "Getting Started",
    path: "/installation",
    description:
      "Step-by-step tutorial on how to install and configure Hudbird UI in your React project.",
    keywords: ["install", "guide", "tutorial", "npm", "vite", "tailwind"],
  },

  // Layouts
  {
    id: "layout-sidebar",
    title: "Sidebar Layout",
    category: "Layouts",
    path: "/layouts/sidebar",
    description:
      "Responsive multi-column application layout with collapsible sidebar and mobile drawer.",
    keywords: [
      "layout",
      "sidebar",
      "navigation",
      "drawer",
      "admin",
      "dashboard",
      "collapsible",
      "shell",
    ],
    isNew: true,
  },
  {
    id: "layout-stacked",
    title: "Stacked Layout",
    category: "Layouts",
    path: "/layouts/stacked",
    description:
      "Top navbar application shell designed for consumer apps, dashboards, and portals.",
    keywords: ["layout", "stacked", "topbar", "navbar", "header", "consumer", "container", "shell"],
    isNew: true,
  },
  {
    id: "layout-auth",
    title: "Auth Layout",
    category: "Layouts",
    path: "/layouts/auth",
    description:
      "Split-screen and centered authentication screens for sign in, sign up, and password recovery.",
    keywords: ["layout", "auth", "login", "register", "signin", "signup", "authentication", "form"],
    isNew: true,
  },

  // Components
  {
    id: "comp-accordion",
    title: "Accordion",
    category: "Components",
    path: "/accordion",
    description:
      "Vertically collapsing disclosure panels with single or multiple expansion, light, bordered, and splitted variants.",
    keywords: ["collapse", "expand", "disclosure", "faq", "drawer", "toggle", "panels"],
    isNew: true,
  },
  {
    id: "comp-alert",
    title: "Alert",
    category: "Components",
    path: "/alert",
    description:
      "Contextual feedback banners with primary, success, warning, and danger status colors and dismissible controls.",
    keywords: [
      "banner",
      "notification",
      "callout",
      "message",
      "warning",
      "error",
      "success",
      "info",
    ],
  },
  {
    id: "comp-avatar",
    title: "Avatar",
    category: "Components",
    path: "/avatar",
    description:
      "User profile representations with image fallback, custom initials, grouped stacks, and border radii.",
    keywords: ["profile", "user", "picture", "image", "initials", "avatar group", "photo"],
  },
  {
    id: "comp-badge",
    title: "Badge",
    category: "Components",
    path: "/badge",
    description:
      "Compact status indicators, numerical counters, and floating notification badges for avatars and buttons.",
    keywords: ["counter", "indicator", "pill", "tag", "notification", "chip", "status"],
  },
  {
    id: "comp-breadcrumbs",
    title: "Breadcrumbs",
    category: "Components",
    path: "/breadcrumbs",
    description:
      "Hierarchical breadcrumb navigation indicating current page location with customizable separators and collapsed ellipsis.",
    keywords: ["breadcrumbs", "navigation", "hierarchy", "path", "trail", "links"],
    isNew: true,
  },
  {
    id: "comp-button",
    title: "Button",
    category: "Components",
    path: "/button",
    description:
      "Interactive button elements with 7 variants (solid, bordered, light, flat, faded, shadow, ghost), loading spinners, and icon slots.",
    keywords: [
      "action",
      "click",
      "cta",
      "icon button",
      "link button",
      "solid",
      "outline",
      "loading",
    ],
  },
  {
    id: "comp-calendar",
    title: "Calendar",
    category: "Components",
    path: "/calendar",
    description:
      "Zero-dependency calendar grid and popover datepicker with single and range selection modes, min/max bounds, and keyboard navigation.",
    keywords: ["calendar", "datepicker", "date", "picker", "range", "month", "schedule"],
    isNew: true,
  },
  {
    id: "comp-card",
    title: "Card",
    category: "Components",
    path: "/card",
    description:
      "Versatile content surface with header, body, footer partitions, pressable/hoverable interactions, and blurred image overlays.",
    keywords: ["container", "panel", "surface", "box", "tile", "image card", "media"],
  },
  {
    id: "comp-checkbox",
    title: "Checkbox",
    category: "Components",
    path: "/checkbox",
    description:
      "Multi-option selection control supporting colored checks, helper descriptions, validation states, and checkbox groups.",
    keywords: ["check", "toggle", "form", "option", "selection", "checkbox group", "multiselect"],
  },
  {
    id: "comp-combobox",
    title: "Combobox",
    category: "Components",
    path: "/combobox",
    description:
      "Autocomplete search inputs with searchable dropdown popups, single select, and multi-select chip tags.",
    keywords: ["autocomplete", "search", "filter", "chips", "tags", "typeahead", "suggest"],
    isNew: true,
  },
  {
    id: "comp-description-list",
    title: "Description list",
    category: "Components",
    path: "/description-list",
    description:
      "Key-value pair layout for user profiles, order summaries, specifications, and invoice details.",
    keywords: ["definition", "metadata", "key value", "details", "summary", "profile", "invoice"],
  },
  {
    id: "comp-dialog",
    title: "Dialog",
    category: "Components",
    path: "/dialog",
    description:
      "Modal windows and alert dialogs for critical confirmations, destructive warnings, and contextual workflows.",
    keywords: ["modal", "popup", "confirm", "alert", "prompt", "window", "overlay"],
  },
  {
    id: "comp-divider",
    title: "Divider",
    category: "Components",
    path: "/divider",
    description:
      "Horizontal and vertical content separators with middle text labels and dashed receipt styles.",
    keywords: ["separator", "line", "split", "rule", "border", "horizontal", "vertical"],
  },
  {
    id: "comp-dropdown",
    title: "Dropdown",
    category: "Components",
    path: "/dropdown",
    description:
      "Flyout action menu with icons, shortcut key labels, section dividers, and destructive action styling.",
    keywords: ["menu", "actions", "popover", "context menu", "options", "overflow"],
  },
  {
    id: "comp-fieldset",
    title: "Fieldset",
    category: "Components",
    path: "/fieldset",
    description:
      "Grouped form inputs with legends, horizontal left-aligned labels, side-by-side splits, and card containers.",
    keywords: ["form group", "legend", "form layout", "inputs", "label placement"],
  },
  {
    id: "comp-heading",
    title: "Heading",
    category: "Components",
    path: "/heading",
    description:
      "Semantic typographic hierarchy from H1 to H6 with decorative accent lines, muted subtitles, and custom colors.",
    keywords: ["typography", "h1", "h2", "h3", "title", "header", "font"],
  },
  {
    id: "comp-form",
    title: "Form",
    category: "Components",
    path: "/form",
    description:
      "Enterprise form orchestration primitives with React Hook Form integration, automated ARIA associations, and real-time validation error messaging.",
    keywords: [
      "form",
      "formfield",
      "react-hook-form",
      "rhf",
      "validation",
      "form control",
      "form label",
      "form message",
      "accessibility",
    ],
    isNew: true,
  },
  {
    id: "comp-input",
    title: "Input",
    category: "Components",
    path: "/input",
    description:
      "Text inputs with flat, bordered, and underlined styles, start/end content icons, clear buttons, and validation messages.",
    keywords: ["textfield", "form", "text", "search input", "password", "validation", "label"],
  },
  {
    id: "comp-input-otp",
    title: "Input OTP",
    category: "Components",
    path: "/input-otp",
    description:
      "Accessible 6-digit and 4-digit PIN/OTP code inputs with auto-advance, backspace handling, separator groups, and clipboard paste support.",
    keywords: [
      "otp",
      "pin",
      "two factor",
      "2fa",
      "verification",
      "sms code",
      "input-otp",
      "authentication",
    ],
    isNew: true,
  },
  {
    id: "comp-navbar",
    title: "Navbar",
    category: "Components",
    path: "/navbar",
    description:
      "Top navigation header with responsive mobile drawer variations (slide-down, left, right, fullscreen), glassmorphism, and mega menus.",
    keywords: [
      "header",
      "navigation",
      "menu",
      "mobile drawer",
      "mega menu",
      "glassmorphism",
      "app bar",
    ],
    isNew: true,
  },
  {
    id: "comp-pagination",
    title: "Pagination",
    category: "Components",
    path: "/pagination",
    description:
      "Page switching controls with smart ellipsis range calculation, shapes, colors, and infinite scroll simulations.",
    keywords: ["pager", "infinite scroll", "pages", "navigation", "next", "previous", "ellipsis"],
    isNew: true,
  },
  {
    id: "comp-progress",
    title: "Progress",
    category: "Components",
    path: "/progress",
    description:
      "Linear and circular progress indicators communicating real-time operation status, percentage completion, and indeterminate loading.",
    keywords: [
      "progress",
      "progressbar",
      "circular progress",
      "loading",
      "percentage",
      "meter",
      "indicator",
    ],
    isNew: true,
  },
  {
    id: "comp-radio-group",
    title: "Radio group",
    category: "Components",
    path: "/radio-group",
    description:
      "Mutually exclusive options with vertical/horizontal layouts, custom card tiles, descriptions, and error states.",
    keywords: ["radio", "choices", "single select", "card tile", "plan picker", "options"],
    isNew: true,
  },
  {
    id: "comp-select",
    title: "Select",
    category: "Components",
    path: "/select",
    description:
      "Dropdown picker component supporting option icons, custom corner radii, helper descriptions, and error validation.",
    keywords: ["dropdown", "picker", "options", "native select", "choice"],
    isNew: true,
  },
  {
    id: "comp-skeleton",
    title: "Skeleton",
    category: "Components",
    path: "/skeleton",
    description:
      "Placeholder loading states with pulse and wave animations in circular, rectangular, and composable layout presets.",
    keywords: ["loading", "placeholder", "shimmer", "wave", "pulse", "fallback", "ghost"],
    isNew: true,
  },
  {
    id: "comp-switch",
    title: "Switch",
    category: "Components",
    path: "/switch",
    description:
      "Binary toggle control for enabling or disabling settings with sizes, accent colors, and inline labels.",
    keywords: ["toggle", "checkbox", "boolean", "enable", "disable", "setting"],
    isNew: true,
  },
  {
    id: "comp-table",
    title: "Table",
    category: "Components",
    path: "/table",
    description:
      "Structured data tables with hoverable rows, striped patterns, bordered grids, and alignment utilities.",
    keywords: ["grid", "data", "rows", "columns", "tabular", "dataset", "list"],
    isNew: true,
  },
  {
    id: "comp-tabs",
    title: "Tabs",
    category: "Components",
    path: "/tabs",
    description:
      "Segmented navigation panels with solid, bordered, light, and underlined styles, badge chips, and vertical orientation.",
    keywords: ["segmented", "panels", "navigation", "switcher", "tablist", "pills"],
    isNew: true,
  },
  {
    id: "comp-text",
    title: "Text",
    category: "Components",
    path: "/text",
    description:
      "Typography body components for paragraphs, lead sentences, muted secondary labels, inline code, and strong emphasis.",
    keywords: ["typography", "paragraph", "body", "lead", "muted", "code", "font"],
    isNew: true,
  },
  {
    id: "comp-textarea",
    title: "Textarea",
    category: "Components",
    path: "/textarea",
    description:
      "Multi-line text input fields supporting auto-resize, custom row counts, helper text, and invalid feedback states.",
    keywords: ["multiline", "input", "notes", "description", "comment", "form"],
    isNew: true,
  },
  {
    id: "comp-tooltip",
    title: "Tooltip",
    category: "Components",
    path: "/tooltip",
    description:
      "Informational hover and focus popovers with top, bottom, left, and right placements, delay timers, and rich content.",
    keywords: ["popover", "hover", "hint", "info", "placement", "delay", "flyout"],
    isNew: true,
  },
  {
    id: "comp-toast",
    title: "Toast",
    category: "Components",
    path: "/toast",
    description:
      "Non-intrusive floating feedback notifications with promise handling, auto-dismiss, action buttons, and 6 viewport positions.",
    keywords: ["toast", "toaster", "notification", "snackbar", "alert", "feedback", "promise"],
    isNew: true,
  },
  {
    id: "comp-sheet",
    title: "Sheet / Drawer",
    category: "Components",
    path: "/sheet",
    description:
      "Slide-over drawer panel anchored to left, right, top, or bottom edges with smooth spring animation and backdrop blur.",
    keywords: ["sheet", "drawer", "slideover", "panel", "sidebar", "dialog", "overlay"],
    isNew: true,
  },
  {
    id: "comp-popover",
    title: "Popover",
    category: "Components",
    path: "/popover",
    description:
      "Accessible floating contextual container triggered by click, with click-outside detection and 12 flexible placements.",
    keywords: ["popover", "popup", "floating", "tooltip", "dropdown", "flyout", "menu"],
    isNew: true,
  },
  {
    id: "comp-slider",
    title: "Slider",
    category: "Components",
    path: "/slider",
    description:
      "Accessible numeric range slider with drag & click fill track, custom steps, keyboard arrows, and value formatters.",
    keywords: ["slider", "range", "track", "thumb", "volume", "number", "input", "scrubber"],
    isNew: true,
  },
  {
    id: "comp-command",
    title: "Command Palette",
    category: "Components",
    path: "/command",
    description:
      "Fast accessible command menu palette (Cmd+K) supporting real-time search filtering, category groups, and keyboard navigation.",
    keywords: ["command", "cmdk", "palette", "search", "menu", "shortcuts", "actions"],
    isNew: true,
  },

  // Deep Section Links (high-intent searches)
  {
    id: "sec-infinite-scroll",
    title: "Infinite Scroll",
    category: "Sections",
    path: "/pagination#infinite-scroll-examples",
    parent: "Pagination",
    description:
      "Simulation of continuous data loading with custom loader and end-of-feed indicator.",
    keywords: ["infinite", "scroll", "feed", "load more", "stream", "loader"],
  },
  {
    id: "sec-mobile-drawer",
    title: "4 Mobile Drawer Variations",
    category: "Sections",
    path: "/navbar#mobile-drawer-variants",
    parent: "Navbar",
    description:
      "Top slide-down, left drawer (De Vorm), right drawer (Avenoria), and dramatic fullscreen overlay.",
    keywords: ["drawer", "mobile menu", "hamburger", "slide", "overlay", "responsive"],
  },
  {
    id: "sec-radio-cards",
    title: "Radio Card Tiles",
    category: "Sections",
    path: "/radio-group#radio-cards",
    parent: "Radio group",
    description:
      "Interactive card-based choice tiles with icons, pricing badges, and selection borders.",
    keywords: ["card", "tile", "pricing plan", "radio card", "selection"],
  },
  {
    id: "sec-color-tokens",
    title: "Solid Color Reference (20 Color Tokens)",
    category: "Sections",
    path: "/button#solid-color-reference",
    parent: "Button",
    description: "Reference matrix of 3 adaptive system colors and 20 Tailwind solid color tokens.",
    keywords: ["colors", "palette", "tokens", "zinc", "emerald", "indigo", "rose", "amber", "cyan"],
  },
  {
    id: "marketing-hero",
    title: "Hero Section",
    category: "Sections",
    path: "/marketing/hero",
    parent: "Marketing",
    description:
      "High-impact hero sections to introduce your product, with gradient text, background videos, and split layouts.",
    keywords: ["hero", "marketing", "landing page", "header", "intro", "banner"],
    isNew: true,
  },
  {
    id: "marketing-logo-clouds",
    title: "Logo Clouds",
    category: "Sections",
    path: "/marketing/logo-clouds",
    parent: "Marketing",
    description:
      "Build trust by displaying logos of companies using your product with static grids or infinite tickers.",
    keywords: ["logo", "cloud", "trusted by", "clients", "customers", "marquee", "ticker"],
    isNew: true,
  },
  {
    id: "marketing-feature-sections",
    title: "Feature Sections",
    category: "Sections",
    path: "/marketing/features",
    parent: "Marketing",
    description:
      "Showcase product capabilities with varied layouts, alternating content, and interactive bento grids.",
    keywords: ["features", "benefits", "capabilities", "product", "showcase", "grid", "visual"],
    isNew: true,
  },
  {
    id: "marketing-bento-grid",
    title: "Bento Grid",
    category: "Sections",
    path: "/marketing/bento-grid",
    parent: "Marketing",
    description:
      "Modern, dynamic bento grids for high-density feature showcases and product marketing.",
    keywords: ["bento", "grid", "layout", "cards", "features", "marketing", "mosaic"],
    isNew: true,
  },
];
