import type {
  ApplicationBlockSlotType,
  ApplicationBlockVariantMap,
  ApplicationExampleCategory,
  ApplicationExampleCategorySlug,
  HudbirdArchitectureLayer,
  MarketingComponentCategoryItem,
  MarketingExampleCategorySlug,
  MarketingExamplePageDefinition,
  MarketingExtendedBlockType,
  SharedBlockSlotType,
  SharedBlockVariantMap,
  SharedPageCategory,
  SharedPageCategorySlug,
} from "@hudbird/schemas";

export const HUDBIRD_STUDIO_REGISTRY_VERSION = "2026.11.0";

export const hudbirdArchitectureLayers: HudbirdArchitectureLayer[] = [
  {
    id: "base-ui",
    title: "Layer 0 — Base UI Primitives & Tokens",
    subtitle: "Accessible interactive foundations & semantic design tokens",
    description:
      "Clean-room base primitives handling keyboard navigation, focus rings, ARIA roles, form controls, typography scales, and surface tokens.",
    packageName: "@hudbird/ui",
    primitives: [
      "Button",
      "Input",
      "InputOTP",
      "Select",
      "Checkbox",
      "Switch",
      "RadioGroup",
      "Textarea",
      "Badge",
      "Avatar",
      "IconBox",
      "Divider",
      "Progress",
      "Tooltip",
      "Heading",
      "Text",
      "Container",
      "Grid",
      "Stack",
      "Section",
    ],
  },
  {
    id: "ui-organisms",
    title: "Layer 1 — UI Organisms & Data Modules",
    subtitle: "Application shells, data tables, charts, and marketing organisms",
    description:
      "Mid-level organisms assembled strictly from Layer 0 Base UI primitives: dual-tier and slim sidebars, stacked top navbars, filterable data tables, area/bar charts, accordions, and command palettes.",
    packageName: "@hudbird/ui",
    primitives: [
      "Sidebar",
      "Navbar",
      "Breadcrumbs",
      "Tabs",
      "Card",
      "Table",
      "Pagination",
      "AreaChart",
      "BarChart",
      "LineChart",
      "DescriptionList",
      "Accordion",
      "Alert",
      "Modal",
      "Drawer",
      "CommandPalette",
    ],
  },
  {
    id: "domain-blocks",
    title: "Layer 2 — Composable Domain Block Slots",
    subtitle: "Typed slots for Application UI, Shared Pages, and Marketing Sections",
    description:
      "Declarative block slots with interchangeable layout variants: App Shells, KPI Strips, Primary Panels, Auth Flows, Trust Asides, Hero Sections, Pricing Matrices, Team Grids, and Legal Blocks.",
    packageName: "@hudbird/marketing",
    primitives: [
      "ApplicationBlockRenderer",
      "SharedBlockRenderer",
      "MarketingExtendedBlockRenderer",
      "LandingSection",
      "HeroSection",
      "BentoGrid",
      "PricingSection",
      "Testimonials",
      "FAQAccordion",
    ],
  },
  {
    id: "page-examples",
    title: "Layer 3 — Full Page Examples & Multi-Domain Page Builder",
    subtitle: "1. Application UI Examples • 2. Shared Page Examples • 3. Marketing Examples",
    description:
      "Production-ready page blueprints and interactive Studio Builder exporting clean, type-checked React App.tsx source code and deterministic JSON recipes.",
    packageName: "@hudbird/marketing",
    primitives: [
      "ApplicationPageRenderer",
      "SharedPageRenderer",
      "MarketingExamplePageRenderer",
      "SaasLandingPage",
      "createHudbirdStudioCode",
      "createHudbirdStudioRecipe",
    ],
  },
];

export const applicationBlockLabels: Record<
  ApplicationBlockSlotType,
  {
    label: string;
    description: string;
    variants: { id: ApplicationBlockVariantMap[ApplicationBlockSlotType]; label: string }[];
  }
> = {
  "app-shell": {
    label: "Navigation Shell",
    description:
      "Primary application chrome: dual-tier sidebar, slim icon rail, or stacked top bar.",
    variants: [
      { id: "sidebar-dual", label: "Sidebar Dual-Tier (01)" },
      { id: "sidebar-slim", label: "Sidebar Slim Rail (01 Compact)" },
      { id: "stacked-top", label: "Stacked Top Header (02)" },
    ],
  },
  "page-header": {
    label: "Page Header & Actions",
    description: "Contextual breadcrumbs, page title, status badge, and primary action buttons.",
    variants: [
      { id: "breadcrumbs-actions", label: "Breadcrumbs + Actions" },
      { id: "tabs-toolbar", label: "Segmented Tabs + Filter Toolbar" },
      { id: "command-search", label: "Search Bar + Quick Actions" },
    ],
  },
  "kpi-metrics": {
    label: "KPI Metrics Row",
    description: "Executive telemetry cards with delta badges, progress bars, or compact strip.",
    variants: [
      { id: "sparkline-cards", label: "3-Column Telemetry Cards" },
      { id: "compact-strip", label: "4-Column Compact KPI Strip" },
      { id: "goal-progress", label: "Quota & SLA Progress Cards" },
    ],
  },
  "primary-panel": {
    label: "Primary Workspace Panel",
    description:
      "Main functional canvas: revenue analytics charts, settings forms, or CRM inspector.",
    variants: [
      { id: "revenue-analytics", label: "Revenue Area & Bar Charts" },
      { id: "workspace-settings", label: "Workspace Profile & Security Form" },
      { id: "crm-inspector", label: "Entity Description List & Activity Stream" },
    ],
  },
  "data-table": {
    label: "Data Table & Directory",
    description: "Filterable operational table with status badges, avatars, and row actions.",
    variants: [
      { id: "customer-directory", label: "Customer Accounts Table" },
      { id: "team-permissions", label: "Team Members & Role Matrix" },
      { id: "audit-stream", label: "Security & API Audit Stream" },
    ],
  },
  "status-footer": {
    label: "Pagination & Telemetry Footer",
    description: "Table pagination bar or live cluster health status bar.",
    variants: [
      { id: "pagination-summary", label: "Pagination + Record Summary" },
      { id: "system-telemetry", label: "System Region & Latency Footer" },
    ],
  },
};

export const applicationUiCatalog: ApplicationExampleCategory[] = [
  {
    slug: "dashboards",
    title: "Dashboards 01 (Sidebar Shell)",
    badge: "Sidebar Layout",
    navigationStyle: "sidebar",
    description:
      "Multi-panel SaaS analytics and operational dashboards built with a collapsible sidebar navigation shell, breadcrumb header, KPI metric cards, charts, and customer table.",
    basePrimitives: ["Button", "Input", "Select", "Badge", "Avatar", "IconBox", "Progress"],
    uiComponents: [
      "Sidebar",
      "Breadcrumbs",
      "Card",
      "AreaChart",
      "BarChart",
      "Table",
      "Pagination",
    ],
    variants: [
      {
        id: "dashboard-sidebar-01",
        name: "Executive Revenue & Telemetry",
        description:
          "Dual-tier sidebar with 3 KPI cards, revenue area/bar charts, and customer ledger.",
        shell: "sidebar-dual",
        basePrimitives: ["Button", "Badge", "Avatar", "IconBox", "Select"],
        uiComponents: ["Sidebar", "Breadcrumbs", "Card", "AreaChart", "BarChart", "Table"],
        defaultBlocks: [
          { type: "app-shell", variant: "sidebar-dual", enabled: true },
          { type: "page-header", variant: "breadcrumbs-actions", enabled: true },
          { type: "kpi-metrics", variant: "sparkline-cards", enabled: true },
          { type: "primary-panel", variant: "revenue-analytics", enabled: true },
          { type: "data-table", variant: "customer-directory", enabled: true },
          { type: "status-footer", variant: "pagination-summary", enabled: true },
        ],
      },
      {
        id: "dashboard-sidebar-02",
        name: "Slim Rail Operations Console",
        description: "Compact icon-rail sidebar with 4-column metric strip and live audit stream.",
        shell: "sidebar-slim",
        basePrimitives: ["Button", "Badge", "Progress", "Input"],
        uiComponents: ["Sidebar", "Tabs", "Card", "AreaChart", "Table"],
        defaultBlocks: [
          { type: "app-shell", variant: "sidebar-slim", enabled: true },
          { type: "page-header", variant: "tabs-toolbar", enabled: true },
          { type: "kpi-metrics", variant: "compact-strip", enabled: true },
          { type: "primary-panel", variant: "revenue-analytics", enabled: true },
          { type: "data-table", variant: "audit-stream", enabled: true },
          { type: "status-footer", variant: "system-telemetry", enabled: true },
        ],
      },
    ],
  },
  {
    slug: "dashboards-stacked",
    title: "Dashboards 02 (Stacked Header)",
    badge: "Stacked Layout",
    navigationStyle: "stacked",
    description:
      "Full-width executive dashboards anchored by a two-tier horizontal top navbar, ideal for high-density tables and cross-workspace reporting.",
    basePrimitives: ["Button", "Input", "Select", "Badge", "Avatar", "Progress"],
    uiComponents: ["Navbar", "Tabs", "Card", "AreaChart", "BarChart", "Table", "Pagination"],
    variants: [
      {
        id: "dashboard-stacked-01",
        name: "Stacked Financial Overview",
        description:
          "Top navigation header with segmented tabs, quota cards, and customer directory.",
        shell: "stacked-top",
        basePrimitives: ["Button", "Badge", "Avatar", "Progress"],
        uiComponents: ["Navbar", "Tabs", "Card", "AreaChart", "Table"],
        defaultBlocks: [
          { type: "app-shell", variant: "stacked-top", enabled: true },
          { type: "page-header", variant: "tabs-toolbar", enabled: true },
          { type: "kpi-metrics", variant: "goal-progress", enabled: true },
          { type: "primary-panel", variant: "revenue-analytics", enabled: true },
          { type: "data-table", variant: "customer-directory", enabled: true },
          { type: "status-footer", variant: "pagination-summary", enabled: true },
        ],
      },
      {
        id: "dashboard-stacked-02",
        name: "Stacked Command Telemetry",
        description: "Command-search page header over compact KPI strip and security audit stream.",
        shell: "stacked-top",
        basePrimitives: ["Button", "Input", "Badge"],
        uiComponents: ["Navbar", "Card", "BarChart", "Table"],
        defaultBlocks: [
          { type: "app-shell", variant: "stacked-top", enabled: true },
          { type: "page-header", variant: "command-search", enabled: true },
          { type: "kpi-metrics", variant: "compact-strip", enabled: true },
          { type: "primary-panel", variant: "revenue-analytics", enabled: true },
          { type: "data-table", variant: "audit-stream", enabled: true },
          { type: "status-footer", variant: "system-telemetry", enabled: true },
        ],
      },
    ],
  },
  {
    slug: "settings",
    title: "Settings Pages 01 (Sidebar Shell)",
    badge: "Sidebar Layout",
    navigationStyle: "sidebar",
    description:
      "Workspace configuration, security policies, SSO toggles, and role-based team permission tables inside a sidebar application shell.",
    basePrimitives: ["Button", "Input", "Select", "Switch", "Checkbox", "Badge", "Avatar"],
    uiComponents: ["Sidebar", "Breadcrumbs", "Tabs", "Card", "Table", "Alert"],
    variants: [
      {
        id: "settings-sidebar-01",
        name: "Organization & Security Settings",
        description: "Dual-tier sidebar with workspace configuration form and role matrix table.",
        shell: "sidebar-dual",
        basePrimitives: ["Button", "Input", "Select", "Switch", "Badge"],
        uiComponents: ["Sidebar", "Breadcrumbs", "Card", "Table", "Alert"],
        defaultBlocks: [
          { type: "app-shell", variant: "sidebar-dual", enabled: true },
          { type: "page-header", variant: "breadcrumbs-actions", enabled: true },
          { type: "kpi-metrics", variant: "goal-progress", enabled: true },
          { type: "primary-panel", variant: "workspace-settings", enabled: true },
          { type: "data-table", variant: "team-permissions", enabled: true },
          { type: "status-footer", variant: "system-telemetry", enabled: true },
        ],
      },
      {
        id: "settings-sidebar-02",
        name: "Slim Rail Team & Billing Settings",
        description: "Compact icon rail with segmented settings tabs and team role directory.",
        shell: "sidebar-slim",
        basePrimitives: ["Button", "Input", "Switch", "Avatar"],
        uiComponents: ["Sidebar", "Tabs", "Card", "Table"],
        defaultBlocks: [
          { type: "app-shell", variant: "sidebar-slim", enabled: true },
          { type: "page-header", variant: "tabs-toolbar", enabled: true },
          { type: "kpi-metrics", variant: "compact-strip", enabled: false },
          { type: "primary-panel", variant: "workspace-settings", enabled: true },
          { type: "data-table", variant: "team-permissions", enabled: true },
          { type: "status-footer", variant: "pagination-summary", enabled: true },
        ],
      },
    ],
  },
  {
    slug: "settings-stacked",
    title: "Settings Pages 02 (Stacked Header)",
    badge: "Stacked Layout",
    navigationStyle: "stacked",
    description:
      "Self-serve account preferences, API keys, and billing usage quotas arranged under a clean horizontal navigation header.",
    basePrimitives: ["Button", "Input", "Select", "Switch", "Badge", "Progress"],
    uiComponents: ["Navbar", "Tabs", "Card", "Table", "Alert"],
    variants: [
      {
        id: "settings-stacked-01",
        name: "Stacked Account & API Preferences",
        description:
          "Horizontal top navbar with quota progress cards, settings form, and team table.",
        shell: "stacked-top",
        basePrimitives: ["Button", "Input", "Select", "Switch", "Progress"],
        uiComponents: ["Navbar", "Tabs", "Card", "Table"],
        defaultBlocks: [
          { type: "app-shell", variant: "stacked-top", enabled: true },
          { type: "page-header", variant: "tabs-toolbar", enabled: true },
          { type: "kpi-metrics", variant: "goal-progress", enabled: true },
          { type: "primary-panel", variant: "workspace-settings", enabled: true },
          { type: "data-table", variant: "team-permissions", enabled: true },
          { type: "status-footer", variant: "system-telemetry", enabled: true },
        ],
      },
    ],
  },
  {
    slug: "informational",
    title: "Informational Pages 01 (Sidebar Shell)",
    badge: "Sidebar Layout",
    navigationStyle: "sidebar",
    description:
      "Customer 360 detail views, compliance inspection dossiers, and incident timelines combining DescriptionList metadata with audit logs.",
    basePrimitives: ["Button", "Badge", "Avatar", "IconBox", "Input"],
    uiComponents: ["Sidebar", "Breadcrumbs", "DescriptionList", "Card", "Table", "Alert"],
    variants: [
      {
        id: "info-sidebar-01",
        name: "Enterprise Customer 360 Dossier",
        description:
          "Sidebar shell with structured DescriptionList inspector and API audit stream.",
        shell: "sidebar-dual",
        basePrimitives: ["Button", "Badge", "Avatar", "IconBox"],
        uiComponents: ["Sidebar", "Breadcrumbs", "DescriptionList", "Card", "Table"],
        defaultBlocks: [
          { type: "app-shell", variant: "sidebar-dual", enabled: true },
          { type: "page-header", variant: "breadcrumbs-actions", enabled: true },
          { type: "kpi-metrics", variant: "compact-strip", enabled: true },
          { type: "primary-panel", variant: "crm-inspector", enabled: true },
          { type: "data-table", variant: "audit-stream", enabled: true },
          { type: "status-footer", variant: "pagination-summary", enabled: true },
        ],
      },
    ],
  },
  {
    slug: "informational-stacked",
    title: "Informational Pages 02 (Stacked Header)",
    badge: "Stacked Layout",
    navigationStyle: "stacked",
    description:
      "Stacked header inspection views for deployment artifacts, audit reports, and organization directories.",
    basePrimitives: ["Button", "Badge", "Avatar", "Input"],
    uiComponents: ["Navbar", "DescriptionList", "Card", "Table", "Pagination"],
    variants: [
      {
        id: "info-stacked-01",
        name: "Stacked Deployment & Audit Dossier",
        description:
          "Stacked top header with command search, metadata inspector, and audit log table.",
        shell: "stacked-top",
        basePrimitives: ["Button", "Input", "Badge"],
        uiComponents: ["Navbar", "DescriptionList", "Card", "Table"],
        defaultBlocks: [
          { type: "app-shell", variant: "stacked-top", enabled: true },
          { type: "page-header", variant: "command-search", enabled: true },
          { type: "kpi-metrics", variant: "sparkline-cards", enabled: true },
          { type: "primary-panel", variant: "crm-inspector", enabled: true },
          { type: "data-table", variant: "audit-stream", enabled: true },
          { type: "status-footer", variant: "system-telemetry", enabled: true },
        ],
      },
    ],
  },
];

export const sharedBlockLabels: Record<
  SharedBlockSlotType,
  {
    label: string;
    description: string;
    variants: { id: SharedBlockVariantMap[SharedBlockSlotType]; label: string }[];
  }
> = {
  "brand-bar": {
    label: "Top Brand & Escape Bar",
    description: "Minimal brand mark or contextual return link at the top of the shared page.",
    variants: [
      { id: "minimal-logo", label: "Minimal Brand Mark + Environment Badge" },
      { id: "back-link-bar", label: "Brand Mark + Return to Docs Link" },
    ],
  },
  "core-flow": {
    label: "Core Interactive Flow",
    description:
      "Primary form or transactional state: Login, Sign up, OTP, Recovery, 404, or Email.",
    variants: [
      { id: "login-form", label: "Sign-In Credentials Form" },
      { id: "signup-form", label: "Workspace Registration Form" },
      { id: "otp-verification", label: "6-Digit InputOTP Verification" },
      { id: "password-recovery", label: "Password Reset Request Flow" },
      { id: "error-404", label: "404 Diagnostic & Route Recovery" },
      { id: "transactional-email", label: "Transactional Email Template Frame" },
    ],
  },
  "social-auth": {
    label: "Federated & SSO Controls",
    description: "OAuth social sign-in buttons or enterprise SAML SSO action.",
    variants: [
      { id: "oauth-buttons", label: "Google & GitHub OAuth Buttons" },
      { id: "sso-enterprise", label: "Enterprise SAML SSO Button" },
      { id: "hidden", label: "Hidden (No Federated Auth)" },
    ],
  },
  "trust-aside": {
    label: "Split Showcase / Trust Aside",
    description: "Right-hand split column showing live product telemetry, quote, or quick links.",
    variants: [
      { id: "telemetry-preview", label: "Live Telemetry Preview Panel" },
      { id: "editorial-quote", label: "Customer Testimonial & SLA Card" },
      { id: "documentation-links", label: "Quick Documentation Cards" },
      { id: "none", label: "Centered Single Column (No Aside)" },
    ],
  },
  "support-footer": {
    label: "Compliance & Support Footer",
    description: "Security encryption notice, privacy links, and support contact.",
    variants: [
      { id: "compact-legal", label: "SOC2 Badge + Terms & Privacy" },
      { id: "help-links", label: "Status Page + Support Escalation" },
    ],
  },
};

export const sharedPagesCatalog: SharedPageCategory[] = [
  {
    slug: "login",
    title: "Log In Pages",
    badge: "Auth & Identity",
    sharedBetween: ["application-ui", "marketing"],
    description:
      "Production sign-in flows shared between marketing conversion funnels and the core application shell, supporting centered cards and split-screen product previews.",
    basePrimitives: ["Input", "Checkbox", "Button", "Divider", "IconBox", "Badge"],
    uiComponents: ["Form", "Card", "Alert"],
    variants: [
      {
        id: "login-split-telemetry",
        name: "Split-Screen Telemetry Sign-In",
        description:
          "2-column split layout with credential form, OAuth buttons, and live telemetry preview.",
        layout: "split",
        basePrimitives: ["Input", "Checkbox", "Button", "Divider", "Badge"],
        uiComponents: ["Form", "Card"],
        defaultBlocks: [
          { type: "brand-bar", variant: "back-link-bar", enabled: true },
          { type: "core-flow", variant: "login-form", enabled: true },
          { type: "social-auth", variant: "oauth-buttons", enabled: true },
          { type: "trust-aside", variant: "telemetry-preview", enabled: true },
          { type: "support-footer", variant: "compact-legal", enabled: true },
        ],
      },
      {
        id: "login-centered-sso",
        name: "Centered Enterprise SSO Card",
        description: "Focused single-column card with SAML SSO and credential fallback.",
        layout: "centered",
        basePrimitives: ["Input", "Checkbox", "Button", "IconBox"],
        uiComponents: ["Form", "Card"],
        defaultBlocks: [
          { type: "brand-bar", variant: "minimal-logo", enabled: true },
          { type: "core-flow", variant: "login-form", enabled: true },
          { type: "social-auth", variant: "sso-enterprise", enabled: true },
          { type: "trust-aside", variant: "none", enabled: false },
          { type: "support-footer", variant: "compact-legal", enabled: true },
        ],
      },
    ],
  },
  {
    slug: "signup",
    title: "Sign Up Pages",
    badge: "Onboarding",
    sharedBetween: ["application-ui", "marketing"],
    description:
      "High-converting workspace creation and trial onboarding pages with password strength feedback, role selection, and social proof.",
    basePrimitives: ["Input", "Select", "Checkbox", "Button", "Badge", "Avatar"],
    uiComponents: ["Form", "Card", "Progress"],
    variants: [
      {
        id: "signup-split-quote",
        name: "Split Onboarding + Customer Quote",
        description:
          "Workspace registration form paired with an enterprise customer quote and SLA metrics.",
        layout: "split",
        basePrimitives: ["Input", "Checkbox", "Button", "Badge", "Avatar"],
        uiComponents: ["Form", "Card"],
        defaultBlocks: [
          { type: "brand-bar", variant: "back-link-bar", enabled: true },
          { type: "core-flow", variant: "signup-form", enabled: true },
          { type: "social-auth", variant: "oauth-buttons", enabled: true },
          { type: "trust-aside", variant: "editorial-quote", enabled: true },
          { type: "support-footer", variant: "compact-legal", enabled: true },
        ],
      },
      {
        id: "signup-centered-clean",
        name: "Centered Self-Serve Trial Card",
        description: "Frictionless centered sign-up card for rapid developer onboarding.",
        layout: "centered",
        basePrimitives: ["Input", "Button", "Divider"],
        uiComponents: ["Form", "Card"],
        defaultBlocks: [
          { type: "brand-bar", variant: "minimal-logo", enabled: true },
          { type: "core-flow", variant: "signup-form", enabled: true },
          { type: "social-auth", variant: "oauth-buttons", enabled: true },
          { type: "trust-aside", variant: "none", enabled: false },
          { type: "support-footer", variant: "compact-legal", enabled: true },
        ],
      },
    ],
  },
  {
    slug: "verification",
    title: "Verification Pages (OTP)",
    badge: "2FA & Step-Up",
    sharedBetween: ["application-ui", "marketing"],
    description:
      "Two-factor authentication and email verification screens powered by Hudbird's accessible 6-slot InputOTP primitive.",
    basePrimitives: ["InputOTP", "Button", "IconBox", "Badge"],
    uiComponents: ["Form", "Card", "Alert"],
    variants: [
      {
        id: "verification-centered-otp",
        name: "6-Digit InputOTP Step-Up Card",
        description:
          "Centered verification card with 6-digit OTP slots, resend timer, and security notice.",
        layout: "centered",
        basePrimitives: ["InputOTP", "Button", "IconBox", "Badge"],
        uiComponents: ["Card", "Alert"],
        defaultBlocks: [
          { type: "brand-bar", variant: "minimal-logo", enabled: true },
          { type: "core-flow", variant: "otp-verification", enabled: true },
          { type: "social-auth", variant: "hidden", enabled: false },
          { type: "trust-aside", variant: "none", enabled: false },
          { type: "support-footer", variant: "help-links", enabled: true },
        ],
      },
      {
        id: "verification-split-security",
        name: "Split Hardware & OTP Verification",
        description: "OTP verification paired with live session security telemetry.",
        layout: "split",
        basePrimitives: ["InputOTP", "Button", "IconBox", "Badge"],
        uiComponents: ["Card", "Alert"],
        defaultBlocks: [
          { type: "brand-bar", variant: "back-link-bar", enabled: true },
          { type: "core-flow", variant: "otp-verification", enabled: true },
          { type: "social-auth", variant: "hidden", enabled: false },
          { type: "trust-aside", variant: "telemetry-preview", enabled: true },
          { type: "support-footer", variant: "help-links", enabled: true },
        ],
      },
    ],
  },
  {
    slug: "forgot-password",
    title: "Forgot Password Pages",
    badge: "Account Recovery",
    sharedBetween: ["application-ui", "marketing"],
    description:
      "Self-serve credential recovery and magic recovery link dispatch with clear security feedback.",
    basePrimitives: ["Input", "Button", "IconBox", "Badge"],
    uiComponents: ["Form", "Card", "Alert"],
    variants: [
      {
        id: "forgot-centered-recovery",
        name: "Centered Recovery Dispatch",
        description:
          "Single-column recovery flow with instant status alert and return-to-login action.",
        layout: "centered",
        basePrimitives: ["Input", "Button", "IconBox"],
        uiComponents: ["Form", "Card", "Alert"],
        defaultBlocks: [
          { type: "brand-bar", variant: "back-link-bar", enabled: true },
          { type: "core-flow", variant: "password-recovery", enabled: true },
          { type: "social-auth", variant: "hidden", enabled: false },
          { type: "trust-aside", variant: "none", enabled: false },
          { type: "support-footer", variant: "help-links", enabled: true },
        ],
      },
    ],
  },
  {
    slug: "404",
    title: "404 & Diagnostic Pages",
    badge: "Routing Fallback",
    sharedBetween: ["application-ui", "marketing"],
    description:
      "Shared route-not-found recovery pages usable inside both the marketing site and authenticated application shells.",
    basePrimitives: ["Button", "Badge", "IconBox", "Input"],
    uiComponents: ["Card", "Grid"],
    variants: [
      {
        id: "404-split-docs",
        name: "Split 404 + Documentation Rescue Cards",
        description:
          "Diagnostic 404 message paired with direct links to documentation, API status, and builder.",
        layout: "split",
        basePrimitives: ["Button", "Badge", "IconBox"],
        uiComponents: ["Card", "Grid"],
        defaultBlocks: [
          { type: "brand-bar", variant: "back-link-bar", enabled: true },
          { type: "core-flow", variant: "error-404", enabled: true },
          { type: "social-auth", variant: "hidden", enabled: false },
          { type: "trust-aside", variant: "documentation-links", enabled: true },
          { type: "support-footer", variant: "help-links", enabled: true },
        ],
      },
      {
        id: "404-centered-minimal",
        name: "Centered Architectural 404",
        description: "Clean centered 404 state with primary action buttons.",
        layout: "centered",
        basePrimitives: ["Button", "Badge", "IconBox"],
        uiComponents: ["Card"],
        defaultBlocks: [
          { type: "brand-bar", variant: "minimal-logo", enabled: true },
          { type: "core-flow", variant: "error-404", enabled: true },
          { type: "social-auth", variant: "hidden", enabled: false },
          { type: "trust-aside", variant: "none", enabled: false },
          { type: "support-footer", variant: "help-links", enabled: true },
        ],
      },
    ],
  },
  {
    slug: "email-templates",
    title: "Email Templates",
    badge: "Transactional UI",
    sharedBetween: ["application-ui", "marketing"],
    description:
      "Branded transactional and lifecycle email layouts (workspace invites, OTP digests, invoice receipts) built with clean card typography.",
    basePrimitives: ["Button", "Badge", "Divider", "Avatar", "IconBox"],
    uiComponents: ["Card", "DescriptionList"],
    variants: [
      {
        id: "email-workspace-invite",
        name: "Workspace Invitation & Security Digest",
        description:
          "Email preview frame with sender header, CTA button, metadata summary, and compliance footer.",
        layout: "email-frame",
        basePrimitives: ["Button", "Badge", "Divider", "IconBox"],
        uiComponents: ["Card", "DescriptionList"],
        defaultBlocks: [
          { type: "brand-bar", variant: "minimal-logo", enabled: true },
          { type: "core-flow", variant: "transactional-email", enabled: true },
          { type: "social-auth", variant: "hidden", enabled: false },
          { type: "trust-aside", variant: "none", enabled: false },
          { type: "support-footer", variant: "compact-legal", enabled: true },
        ],
      },
    ],
  },
];

export const marketingComponentsCatalog: MarketingComponentCategoryItem[] = [
  {
    slug: "header-navigations",
    title: "Header Navigations",
    countLabel: "2 layouts",
    description:
      "Sticky glassmorphic top navigation bars with simple links or structured product mega-menus.",
    hudbirdExport: "LandingNavbar",
    basePrimitives: ["Button", "Badge", "IconBox"],
    uiComponents: ["Navbar", "Container"],
    variants: [
      {
        id: "simple",
        name: "Simple Topbar",
        description: "Brand mark, inline links, and dual CTA actions.",
      },
      {
        id: "mega",
        name: "Mega Highlights",
        description: "Navigation bar with featured product highlight strip.",
      },
    ],
  },
  {
    slug: "hero-sections",
    title: "Hero Header Sections",
    countLabel: "4 layouts",
    description:
      "Above-the-fold conversion headers supporting split showcase, centered spotlight, Bento preview, and editorial framing.",
    hudbirdExport: "HeroSection / MarketingHero",
    basePrimitives: ["Button", "Badge", "Heading", "Text", "IconBox"],
    uiComponents: ["Card", "Grid", "Container"],
    variants: [
      {
        id: "split",
        name: "Split Interactive Preview",
        description: "Copy and CTAs paired with live telemetry preview.",
      },
      {
        id: "centered",
        name: "Centered Spotlight",
        description: "High-impact centered headline over wide preview card.",
      },
      {
        id: "interactive",
        name: "Interactive Workspace",
        description: "Hero headline integrated with interactive workspace preview.",
      },
      {
        id: "slideshow",
        name: "Slideshow Gallery",
        description: "Multi-screen slideshow hero preview.",
      },
    ],
  },
  {
    slug: "social-proof",
    title: "Social Proof & Logo Clouds",
    countLabel: "2 layouts",
    description: "Enterprise trust strips and customer logo matrices with verification badges.",
    hudbirdExport: "LandingLogoCloud / LogoCloud",
    basePrimitives: ["Badge", "Text", "Divider"],
    uiComponents: ["Card", "Grid", "Container"],
    variants: [
      {
        id: "row",
        name: "Monochrome Logo Row",
        description: "Single-row logo strip with trust caption.",
      },
      {
        id: "intro-grid",
        name: "Intro + Logo Matrix",
        description: "Split header with bordered logo cells.",
      },
    ],
  },
  {
    slug: "benefits-sections",
    title: "Benefits & Value Pillars",
    countLabel: "2 layouts",
    description: "Core value proposition grids with telemetry proof tags and icon boxes.",
    hudbirdExport: "LandingBenefits",
    basePrimitives: ["Badge", "IconBox", "Heading", "Text"],
    uiComponents: ["Card", "Grid", "Container"],
    variants: [
      {
        id: "columns",
        name: "3-Column Value Cards",
        description: "Balanced pillar cards with proof metrics.",
      },
      {
        id: "visual-list",
        name: "Sticky Intro + Visual List",
        description: "Editorial summary paired with stacked benefit cards.",
      },
    ],
  },
  {
    slug: "features-sections",
    title: "Features & Bento Showcases",
    countLabel: "3 layouts",
    description:
      "Interactive feature exploration via segmented tabs, accordion deep-dives, or split comparison cards.",
    hudbirdExport: "LandingFeatureShowcase / BentoGrid",
    basePrimitives: ["Button", "Badge", "IconBox", "Heading", "Text"],
    uiComponents: ["Tabs", "Accordion", "Card", "Grid"],
    variants: [
      {
        id: "tabs",
        name: "Interactive Feature Tabs",
        description: "Switchable feature tabs with live metric callouts.",
      },
      {
        id: "accordion",
        name: "Accordion + Preview Canvas",
        description: "Expandable feature list with synchronized preview.",
      },
      {
        id: "split",
        name: "Alternating Split Cards",
        description: "Full-width feature breakdown cards.",
      },
    ],
  },
  {
    slug: "how-it-works",
    title: "How It Works & Workflows",
    countLabel: "2 layouts",
    description:
      "Numbered implementation timelines showing how teams adopt and deploy the platform.",
    hudbirdExport: "LandingHowItWorks",
    basePrimitives: ["Badge", "Heading", "Text", "Divider"],
    uiComponents: ["Card", "Grid", "Container"],
    variants: [
      {
        id: "horizontal",
        name: "Horizontal Step Pipeline",
        description: "3-step horizontal progression with deliverables.",
      },
      {
        id: "vertical",
        name: "Vertical Deployment Timeline",
        description: "Connected vertical timeline for technical workflows.",
      },
    ],
  },
  {
    slug: "metrics-sections",
    title: "Metrics & Telemetry Strips",
    countLabel: "2 layouts",
    description: "High-contrast numerical proof blocks highlighting SLA uptime, latency, and ROI.",
    hudbirdExport: "MarketingExtendedBlockRenderer (metrics) / StatsSection",
    basePrimitives: ["Badge", "Heading", "Text"],
    uiComponents: ["Card", "Grid", "Container"],
    variants: [
      {
        id: "stat-grid",
        name: "4-Column Telemetry Grid",
        description: "Large tabular numerals with delta badges.",
      },
      {
        id: "highlight-band",
        name: "Split Narrative + KPI Band",
        description: "Executive narrative alongside key benchmarks.",
      },
    ],
  },
  {
    slug: "pricing-sections",
    title: "Pricing & Plan Comparison",
    countLabel: "2 layouts",
    description: "Tiered subscription cards and feature-by-feature comparison tables.",
    hudbirdExport: "LandingPricing / PricingSection",
    basePrimitives: ["Button", "Badge", "Switch", "Heading", "Text"],
    uiComponents: ["Card", "Table", "Grid"],
    variants: [
      {
        id: "cards",
        name: "3-Tier Pricing Cards",
        description: "Highlighted popular tier with feature checklist.",
      },
      {
        id: "comparison",
        name: "Tier Cards + Matrix Table",
        description: "Pricing cards paired with a comparison matrix.",
      },
    ],
  },
  {
    slug: "testimonial-sections",
    title: "Testimonials & Case Studies",
    countLabel: "2 layouts",
    description: "Verified customer quotes with impact metrics and executive attribution.",
    hudbirdExport: "LandingTestimonials / Testimonials",
    basePrimitives: ["Avatar", "Badge", "Heading", "Text"],
    uiComponents: ["Card", "Grid", "Container"],
    variants: [
      {
        id: "featured",
        name: "Featured Case Study + Grid",
        description: "Hero quote card plus supporting testimonials.",
      },
      {
        id: "collection",
        name: "3-Column Wall of Love",
        description: "Balanced grid of verified customer quotes.",
      },
    ],
  },
  {
    slug: "faq-sections",
    title: "FAQ & Knowledge Accordions",
    countLabel: "2 layouts",
    description: "Accessible question-and-answer accordions with optional category grouping.",
    hudbirdExport: "LandingFaq / FAQAccordion",
    basePrimitives: ["Badge", "Heading", "Text"],
    uiComponents: ["Accordion", "Card", "Container"],
    variants: [
      {
        id: "single",
        name: "Centered Accordion List",
        description: "Focused single-column FAQ accordion.",
      },
      {
        id: "grouped",
        name: "Categorized 2-Column FAQ",
        description: "Questions grouped by Architecture, Billing, and Security.",
      },
    ],
  },
  {
    slug: "cta-sections",
    title: "Call-to-Action (CTA) Sections",
    countLabel: "2 layouts",
    description: "Closing conversion banners with primary/secondary actions and trust highlights.",
    hudbirdExport: "LandingCta / CTASection",
    basePrimitives: ["Button", "Badge", "Heading", "Text"],
    uiComponents: ["Card", "Container"],
    variants: [
      {
        id: "centered",
        name: "Centered Conversion Banner",
        description: "High-contrast card with dual action buttons.",
      },
      {
        id: "split",
        name: "Split Action + Checklist",
        description: "Headline on the left, action & guarantees on the right.",
      },
    ],
  },
  {
    slug: "newsletter-sections",
    title: "Newsletter & Release Digest CTAs",
    countLabel: "2 layouts",
    description:
      "Email capture forms for product changelogs, engineering dispatches, and release notes.",
    hudbirdExport: "MarketingExtendedBlockRenderer (newsletter) / Newsletter",
    basePrimitives: ["Input", "Button", "Badge", "Text"],
    uiComponents: ["Form", "Card", "Container"],
    variants: [
      {
        id: "inline-capture",
        name: "Inline Changelog Capture",
        description: "Horizontal email input + subscribe button with privacy note.",
      },
      {
        id: "card-digest",
        name: "Editorial Digest Card",
        description: "2-column card previewing monthly architecture notes.",
      },
    ],
  },
  {
    slug: "team-sections",
    title: "Team & Leadership Grids",
    countLabel: "2 layouts",
    description: "Leadership bios, engineering craft roles, and distributed team showcases.",
    hudbirdExport: "MarketingExtendedBlockRenderer (team) / TeamSection",
    basePrimitives: ["Avatar", "Badge", "Heading", "Text"],
    uiComponents: ["Card", "Grid", "Container"],
    variants: [
      {
        id: "leadership-grid",
        name: "Leadership Cards",
        description: "Profile cards with role badges and domain focus.",
      },
      {
        id: "compact-directory",
        name: "Compact Contributors Grid",
        description: "Dense directory of core maintainers and advisors.",
      },
    ],
  },
  {
    slug: "careers-sections",
    title: "Careers & Open Roles",
    countLabel: "2 layouts",
    description: "Department-filtered job boards with location badges and compensation bands.",
    hudbirdExport: "MarketingExtendedBlockRenderer (careers)",
    basePrimitives: ["Button", "Badge", "Heading", "Text"],
    uiComponents: ["Card", "Table", "Container"],
    variants: [
      {
        id: "open-roles-board",
        name: "Open Roles Board",
        description: "Structured role listings with engineering & design tags.",
      },
      {
        id: "culture-perks",
        name: "Operating Principles + Roles",
        description: "Company values paired with open positions.",
      },
    ],
  },
  {
    slug: "contact-sections",
    title: "Contact & Enterprise Sales Forms",
    countLabel: "2 layouts",
    description:
      "Enterprise inquiry forms paired with regional office cards and SLA response commitments.",
    hudbirdExport: "MarketingExtendedBlockRenderer (contact) / ContactSection",
    basePrimitives: ["Input", "Select", "Textarea", "Button", "Badge", "IconBox"],
    uiComponents: ["Form", "Card", "Grid", "Container"],
    variants: [
      {
        id: "sales-split",
        name: "Split Enterprise Inquiry Form",
        description: "Contact form alongside direct support channels.",
      },
      {
        id: "office-grid",
        name: "Global Hubs + Direct Channels",
        description: "Regional office cards with support routing.",
      },
    ],
  },
  {
    slug: "blog-sections",
    title: "Blog Grids & Editorial Articles",
    countLabel: "2 layouts",
    description:
      "Engineering blog indexes and structured long-form article layouts with table of contents.",
    hudbirdExport: "MarketingExtendedBlockRenderer (blog) / BlogSection",
    basePrimitives: ["Avatar", "Badge", "Button", "Heading", "Text"],
    uiComponents: ["Card", "Grid", "Container"],
    variants: [
      {
        id: "featured-grid",
        name: "Featured Dispatch + 3-Column Grid",
        description: "Hero article card followed by categorized posts.",
      },
      {
        id: "article-reader",
        name: "Long-Form Article + Callouts",
        description: "Editorial post body with code/architecture callouts.",
      },
    ],
  },
  {
    slug: "banners",
    title: "Announcement & Release Banners",
    countLabel: "2 layouts",
    description:
      "Top-of-page release bars for version launches, security advisories, and event registration.",
    hudbirdExport: "MarketingExtendedBlockRenderer (banner) / Banner",
    basePrimitives: ["Badge", "Button", "Text"],
    uiComponents: ["Container"],
    variants: [
      {
        id: "release-pill",
        name: "Release Announcement Bar",
        description: "Compact top banner with version badge and changelog link.",
      },
      {
        id: "event-bar",
        name: "Live Keynote / Webinar Bar",
        description: "Accent bar with countdown badge and registration CTA.",
      },
    ],
  },
  {
    slug: "footers",
    title: "Footers & Sitemap Columns",
    countLabel: "2 layouts",
    description: "Multi-column sitemaps, system status indicators, and copyright footers.",
    hudbirdExport: "LandingFooter",
    basePrimitives: ["Badge", "Text", "Divider"],
    uiComponents: ["Grid", "Container"],
    variants: [
      {
        id: "columns",
        name: "Multi-Column Sitemap Footer",
        description: "Brand summary with categorized navigation columns.",
      },
      {
        id: "simple",
        name: "Compact Legal Footer",
        description: "Single-row brand and legal links.",
      },
    ],
  },
];

export const marketingExtendedBlockLabels: Record<
  MarketingExtendedBlockType,
  {
    label: string;
    description: string;
    variants: { id: string; label: string }[];
  }
> = {
  banner: {
    label: "Top Announcement Banner",
    description: "Release bar at the very top of the marketing page.",
    variants: [
      { id: "release-pill", label: "Release Announcement Bar" },
      { id: "event-bar", label: "Keynote Event Bar" },
    ],
  },
  navbar: {
    label: "Landing Navbar",
    description: "Sticky navigation header (`LandingNavbar`).",
    variants: [
      { id: "simple", label: "Simple Topbar" },
      { id: "mega", label: "Mega Highlights" },
    ],
  },
  hero: {
    label: "Hero Section",
    description: "Primary above-the-fold hero (`HeroSection`).",
    variants: [
      { id: "split", label: "Split Showcase" },
      { id: "centered", label: "Centered Spotlight" },
      { id: "interactive", label: "Interactive Workspace" },
      { id: "slideshow", label: "Slideshow Gallery" },
    ],
  },
  logos: {
    label: "Logo Cloud",
    description: "Social proof logo strip (`LandingLogoCloud`).",
    variants: [
      { id: "row", label: "Logo Row" },
      { id: "intro-grid", label: "Intro + Grid" },
    ],
  },
  metrics: {
    label: "Telemetry & Metrics Strip",
    description: "4-column numerical impact benchmarks.",
    variants: [
      { id: "stat-grid", label: "4-Column Telemetry Grid" },
      { id: "highlight-band", label: "Narrative + KPI Band" },
    ],
  },
  benefits: {
    label: "Benefits & Pillars",
    description: "Value proposition section (`LandingBenefits`).",
    variants: [
      { id: "columns", label: "3-Column Cards" },
      { id: "visual-list", label: "Visual List" },
    ],
  },
  features: {
    label: "Feature Showcase",
    description: "Interactive feature exploration (`LandingFeatureShowcase`).",
    variants: [
      { id: "tabs", label: "Interactive Tabs" },
      { id: "accordion", label: "Accordion + Preview" },
      { id: "split", label: "Split Cards" },
    ],
  },
  "how-it-works": {
    label: "How It Works",
    description: "Step-by-step workflow (`LandingHowItWorks`).",
    variants: [
      { id: "horizontal", label: "Horizontal Steps" },
      { id: "vertical", label: "Vertical Timeline" },
    ],
  },
  integrations: {
    label: "Integrations Catalog",
    description: "Connected ecosystem (`LandingIntegrations`).",
    variants: [
      { id: "grid", label: "Integration Grid" },
      { id: "grouped", label: "Grouped Categories" },
    ],
  },
  team: {
    label: "Team & Leadership Section",
    description: "Leadership profiles and distributed craft culture.",
    variants: [
      { id: "leadership-grid", label: "Leadership Cards" },
      { id: "compact-directory", label: "Compact Contributors Grid" },
    ],
  },
  careers: {
    label: "Careers & Open Roles",
    description: "Engineering & design role listings.",
    variants: [
      { id: "open-roles-board", label: "Open Roles Board" },
      { id: "culture-perks", label: "Operating Principles + Roles" },
    ],
  },
  blog: {
    label: "Blog & Editorial Section",
    description: "Featured engineering articles or long-form post reader.",
    variants: [
      { id: "featured-grid", label: "Featured + 3-Column Article Grid" },
      { id: "article-reader", label: "Long-Form Article Reader" },
    ],
  },
  contact: {
    label: "Contact & Enterprise Inquiry",
    description: "Enterprise sales form and global hubs.",
    variants: [
      { id: "sales-split", label: "Split Enterprise Form" },
      { id: "office-grid", label: "Global Hubs Grid" },
    ],
  },
  legal: {
    label: "Legal, Privacy & SLA Terms",
    description: "Structured legal clauses, DPA summary, and subprocessor table.",
    variants: [
      { id: "terms-clauses", label: "Terms & Privacy Clauses + TOC" },
      { id: "security-dpa", label: "SOC2 & Subprocessor Ledger" },
    ],
  },
  testimonials: {
    label: "Customer Testimonials",
    description: "Customer social proof (`LandingTestimonials`).",
    variants: [
      { id: "featured", label: "Featured Story + Grid" },
      { id: "collection", label: "Testimonial Collection" },
    ],
  },
  pricing: {
    label: "Pricing Plans",
    description: "Plan tiers and comparison table (`LandingPricing`).",
    variants: [
      { id: "cards", label: "Pricing Cards" },
      { id: "comparison", label: "Cards + Comparison Matrix" },
    ],
  },
  faq: {
    label: "FAQ Accordion",
    description: "Frequently asked questions (`LandingFaq`).",
    variants: [
      { id: "single", label: "Single Column Accordion" },
      { id: "grouped", label: "Grouped Categories" },
    ],
  },
  newsletter: {
    label: "Newsletter Capture",
    description: "Release notes & engineering digest subscription.",
    variants: [
      { id: "inline-capture", label: "Inline Email Capture" },
      { id: "card-digest", label: "Editorial Digest Card" },
    ],
  },
  cta: {
    label: "Closing CTA",
    description: "Final conversion section (`LandingCta`).",
    variants: [
      { id: "centered", label: "Centered Card" },
      { id: "split", label: "Split CTA" },
    ],
  },
  footer: {
    label: "Landing Footer",
    description: "Sitemap & legal footer (`LandingFooter`).",
    variants: [
      { id: "columns", label: "Multi-Column Sitemap" },
      { id: "simple", label: "Simple Footer" },
    ],
  },
};

export const marketingExamplesCatalog: MarketingExamplePageDefinition[] = [
  {
    slug: "landing-pages",
    title: "Landing Pages",
    badge: "Flagship SaaS",
    description:
      "Complete high-converting SaaS landing page combining Announcement Banner, Navbar, Hero, Logo Cloud, Benefits, Feature Showcase, Pricing, Testimonials, FAQ, CTA, and Footer.",
    basePrimitives: ["Button", "Badge", "IconBox", "Heading", "Text", "Switch"],
    uiComponents: ["Navbar", "Card", "Tabs", "Accordion", "Table", "Grid"],
    defaultBlocks: [
      { type: "banner", variant: "release-pill", enabled: true },
      { type: "navbar", variant: "simple", enabled: true },
      { type: "hero", variant: "split", enabled: true },
      { type: "logos", variant: "row", enabled: true },
      { type: "metrics", variant: "stat-grid", enabled: true },
      { type: "benefits", variant: "columns", enabled: true },
      { type: "features", variant: "tabs", enabled: true },
      { type: "pricing", variant: "cards", enabled: true },
      { type: "testimonials", variant: "featured", enabled: true },
      { type: "faq", variant: "single", enabled: true },
      { type: "cta", variant: "centered", enabled: true },
      { type: "footer", variant: "columns", enabled: true },
    ],
  },
  {
    slug: "pricing-pages",
    title: "Pricing Pages",
    badge: "Monetization",
    description:
      "Dedicated pricing and enterprise plan comparison page with billing cadence toggle, feature matrix, customer proof, and billing FAQ.",
    basePrimitives: ["Button", "Badge", "Switch", "Heading", "Text"],
    uiComponents: ["Navbar", "Card", "Table", "Accordion", "Grid"],
    defaultBlocks: [
      { type: "navbar", variant: "simple", enabled: true },
      { type: "pricing", variant: "comparison", enabled: true },
      { type: "logos", variant: "intro-grid", enabled: true },
      { type: "testimonials", variant: "collection", enabled: true },
      { type: "faq", variant: "grouped", enabled: true },
      { type: "cta", variant: "split", enabled: true },
      { type: "footer", variant: "columns", enabled: true },
    ],
  },
  {
    slug: "about-pages",
    title: "About Pages",
    badge: "Company & Craft",
    description:
      "Company mission manifesto, platform scale metrics, leadership directory, and open engineering roles.",
    basePrimitives: ["Avatar", "Badge", "Button", "Heading", "Text"],
    uiComponents: ["Navbar", "Card", "Grid", "Table"],
    defaultBlocks: [
      { type: "navbar", variant: "simple", enabled: true },
      { type: "hero", variant: "centered", enabled: true },
      { type: "metrics", variant: "highlight-band", enabled: true },
      { type: "team", variant: "leadership-grid", enabled: true },
      { type: "careers", variant: "open-roles-board", enabled: true },
      { type: "cta", variant: "centered", enabled: true },
      { type: "footer", variant: "columns", enabled: true },
    ],
  },
  {
    slug: "contact-pages",
    title: "Contact & Sales Pages",
    badge: "Enterprise Inbound",
    description:
      "Enterprise sales inquiry form, global support hubs, SLA guarantees, and procurement FAQ.",
    basePrimitives: ["Input", "Select", "Textarea", "Button", "Badge", "IconBox"],
    uiComponents: ["Navbar", "Form", "Card", "Accordion", "Grid"],
    defaultBlocks: [
      { type: "navbar", variant: "simple", enabled: true },
      { type: "contact", variant: "sales-split", enabled: true },
      { type: "logos", variant: "row", enabled: true },
      { type: "faq", variant: "single", enabled: true },
      { type: "footer", variant: "simple", enabled: true },
    ],
  },
  {
    slug: "blog-pages",
    title: "Blog Index Pages",
    badge: "Editorial Hub",
    description:
      "Engineering and design publication index with featured story, categorized article grid, and changelog newsletter capture.",
    basePrimitives: ["Avatar", "Badge", "Input", "Button", "Heading", "Text"],
    uiComponents: ["Navbar", "Card", "Form", "Grid"],
    defaultBlocks: [
      { type: "banner", variant: "release-pill", enabled: true },
      { type: "navbar", variant: "simple", enabled: true },
      { type: "blog", variant: "featured-grid", enabled: true },
      { type: "newsletter", variant: "inline-capture", enabled: true },
      { type: "footer", variant: "columns", enabled: true },
    ],
  },
  {
    slug: "blog-post-pages",
    title: "Blog Post & Article Pages",
    badge: "Long-Form Reader",
    description:
      "Structured technical article layout with author metadata, architecture callout cards, newsletter digest, and related dispatches.",
    basePrimitives: ["Avatar", "Badge", "Button", "Heading", "Text", "Divider"],
    uiComponents: ["Navbar", "Card", "Alert", "Grid"],
    defaultBlocks: [
      { type: "navbar", variant: "simple", enabled: true },
      { type: "blog", variant: "article-reader", enabled: true },
      { type: "newsletter", variant: "card-digest", enabled: true },
      { type: "cta", variant: "split", enabled: true },
      { type: "footer", variant: "simple", enabled: true },
    ],
  },
  {
    slug: "faq-pages",
    title: "FAQ & Help Center Pages",
    badge: "Self-Serve Support",
    description:
      "Dedicated knowledge base and categorized FAQ hub paired with direct support escalation channels.",
    basePrimitives: ["Badge", "Button", "Input", "Heading", "Text"],
    uiComponents: ["Navbar", "Accordion", "Card", "Grid"],
    defaultBlocks: [
      { type: "navbar", variant: "simple", enabled: true },
      { type: "faq", variant: "grouped", enabled: true },
      { type: "contact", variant: "office-grid", enabled: true },
      { type: "cta", variant: "centered", enabled: true },
      { type: "footer", variant: "columns", enabled: true },
    ],
  },
  {
    slug: "team-pages",
    title: "Team & Careers Pages",
    badge: "Culture & Hiring",
    description:
      "Leadership profiles, core contributor directory, operating principles, and open roles board.",
    basePrimitives: ["Avatar", "Badge", "Button", "Heading", "Text"],
    uiComponents: ["Navbar", "Card", "Grid", "Table"],
    defaultBlocks: [
      { type: "navbar", variant: "simple", enabled: true },
      { type: "team", variant: "leadership-grid", enabled: true },
      { type: "metrics", variant: "stat-grid", enabled: true },
      { type: "careers", variant: "culture-perks", enabled: true },
      { type: "cta", variant: "split", enabled: true },
      { type: "footer", variant: "columns", enabled: true },
    ],
  },
  {
    slug: "legal-pages",
    title: "Legal, Privacy & Trust Pages",
    badge: "Compliance & DPA",
    description:
      "Terms of Service, Privacy Policy, and SOC2 Type II subprocessor ledger with clause navigation.",
    basePrimitives: ["Badge", "Button", "Heading", "Text", "Divider"],
    uiComponents: ["Navbar", "Card", "Table", "DescriptionList"],
    defaultBlocks: [
      { type: "navbar", variant: "simple", enabled: true },
      { type: "legal", variant: "terms-clauses", enabled: true },
      { type: "legal", variant: "security-dpa", enabled: true },
      { type: "footer", variant: "simple", enabled: true },
    ],
  },
  {
    slug: "404-pages",
    title: "404 Marketing Pages",
    badge: "Route Recovery",
    description:
      "Branded marketing 404 recovery page with popular section links, documentation shortcuts, and newsletter capture.",
    basePrimitives: ["Button", "Badge", "IconBox", "Heading", "Text"],
    uiComponents: ["Navbar", "Card", "Grid"],
    defaultBlocks: [
      { type: "navbar", variant: "simple", enabled: true },
      { type: "cta", variant: "centered", enabled: true },
      { type: "benefits", variant: "columns", enabled: true },
      { type: "footer", variant: "simple", enabled: true },
    ],
  },
];

export function getApplicationCategory(
  slug: ApplicationExampleCategorySlug
): ApplicationExampleCategory {
  return applicationUiCatalog.find((category) => category.slug === slug) ?? applicationUiCatalog[0];
}

export function getSharedPageCategory(slug: SharedPageCategorySlug): SharedPageCategory {
  return sharedPagesCatalog.find((category) => category.slug === slug) ?? sharedPagesCatalog[0];
}

export function getMarketingExampleDefinition(
  slug: MarketingExampleCategorySlug
): MarketingExamplePageDefinition {
  return (
    marketingExamplesCatalog.find((example) => example.slug === slug) ?? marketingExamplesCatalog[0]
  );
}
