import { TocItem } from "./components/TableOfContents";

export const gettingStartedTocItems: TocItem[] = [
  { id: "getting-started", title: "Getting started" },
  { id: "before-you-start", title: "Before you start" },
  { id: "adding-hudbird", title: "Adding Hudbird to your project" },
  { id: "installing-dependencies", title: "Installing dependencies" },
  { id: "router-integration", title: "Client-side router integration" },
  { id: "setup-font", title: "Optional: Setup font family" },
  { id: "framework-examples", title: "Framework integration" },
];

export const buttonTocItems: TocItem[] = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "basic-buttons", title: "Basic Buttons & Colors" },
      { id: "button-variants", title: "Button Variants" },
      { id: "buttons-with-icons", title: "Buttons with Icons" },
      { id: "icon-only", title: "Icon Only Buttons" },
      { id: "custom-radius", title: "Custom Radius" },
      { id: "loading-disabled", title: "Loading & Disabled States" },
      { id: "using-as-a-link", title: "Using as a Link" },
    ],
  },
  {
    id: "appendix",
    title: "Appendix",
    children: [{ id: "solid-color-reference", title: "Solid Color Reference" }],
  },
];

export const alertTocItems: TocItem[] = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "alert-variants", title: "Alert variants" },
      { id: "status-colors", title: "Status colors" },
      { id: "with-icon", title: "With icon" },
      { id: "closable-alerts", title: "Closable alerts" },
    ],
  },
];

export const avatarTocItems: TocItem[] = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "image-avatars", title: "Image avatars" },
      { id: "fallback-initials", title: "Fallback initials & Colors" },
      { id: "avatar-sizes", title: "Avatar sizes" },
      { id: "avatar-radii", title: "Border radii" },
      { id: "avatar-group", title: "Avatar group" },
      { id: "error-handling", title: "Fallback error demo" },
    ],
  },
];

export const badgeTocItems: TocItem[] = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "standalone-variants", title: "Variants & Colors" },
      { id: "badge-sizes", title: "Badge sizes" },
      { id: "floating-notifications", title: "Floating on Avatar & Button" },
      { id: "dot-indicators", title: "Dot status indicators" },
      { id: "placements", title: "Badge placements" },
    ],
  },
];

export const checkboxTocItems: TocItem[] = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "basic-usage", title: "Basic Checkboxes & Colors" },
      { id: "checkbox-sizes", title: "Sizes" },
      { id: "with-description", title: "With Description" },
      { id: "states", title: "Disabled & Invalid States" },
      { id: "checkbox-group", title: "Checkbox Group" },
    ],
  },
];

export const comboBoxTocItems: TocItem[] = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "single-select", title: "Single Select (Autocomplete)" },
      { id: "multi-select", title: "Multi-Select (Advanced Chips)" },
      { id: "variants-sizes", title: "Variants & Sizes" },
      { id: "states", title: "Disabled & Invalid States" },
    ],
  },
];

export const descriptionListTocItems: TocItem[] = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "basic-usage", title: "Basic Profile Information" },
      { id: "card-styled", title: "Card-Styled Invoice Details" },
      { id: "vertical-orientation", title: "Vertical Orientation" },
      { id: "advanced-content", title: "Advanced Content & Actions" },
    ],
  },
];

export const dialogTocItems: TocItem[] = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "confirmation-dialog", title: "Standard Confirmation Dialog" },
      { id: "destructive-dialog", title: "Destructive Alert Dialog (Danger)" },
      { id: "dialog-sizes", title: "Dialog Sizes (sm & md)" },
    ],
  },
];

export const dividerTocItems: TocItem[] = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "horizontal-divider", title: "Horizontal Divider" },
      { id: "vertical-divider", title: "Vertical Divider in Navigation" },
      { id: "divider-with-content", title: "Divider with Content (OR / Sign-in)" },
      { id: "dashed-variant", title: "Dashed Variant in Receipt / Invoice" },
    ],
  },
];

export const dropdownTocItems: TocItem[] = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "basic-dropdown", title: "Basic Dropdown Menu" },
      {
        id: "position-placements",
        title: "Interactive Positions (Center, Left, Right, Top, Bottom)",
      },
      { id: "with-icons", title: "Dropdown with Icons (startContent)" },
      { id: "sections-and-danger", title: "Advanced Menu (Sections & Danger Variant)" },
    ],
  },
];

export const fieldsetTocItems: TocItem[] = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "left-labels-fieldset", title: "Left-Aligned Labels (Horizontal Style)" },
      { id: "basic-fieldset", title: "Basic Stacked Fieldset" },
      { id: "side-by-side-layout", title: "Side-by-Side (Split Section Style)" },
      { id: "bordered-and-card", title: "Bordered & Card Variants" },
      { id: "invalid-and-disabled", title: "Invalid & Disabled Fieldset States" },
    ],
  },
];

export const headingTocItems: TocItem[] = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "semantic-hierarchy", title: "Semantic Hierarchy (H1 - H6)" },
      { id: "heading-colors-and-styles", title: "Heading Colors & Styles" },
      { id: "heading-with-divider", title: "Heading with Divider" },
      { id: "interactive-customizer", title: "Interactive Customizer" },
    ],
  },
];

export const inputTocItems: TocItem[] = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "basic-inputs", title: "Basic Form Variants (Flat, Bordered, Underlined)" },
      { id: "label-placements", title: "Label Placements (Outside vs Inside)" },
      { id: "content-slots", title: "Input with Content Slots (Start & End)" },
      { id: "clearable-input", title: "Clearable Input" },
      { id: "validation-states", title: "Validation & Descriptions" },
      { id: "sizes-and-radius", title: "Sizes & Corner Radii" },
      { id: "interactive-customizer", title: "Interactive Customizer" },
    ],
  },
];

export const cardTocItems: TocItem[] = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "basic-cards", title: "Basic Cards (Shadow, Bordered, Flat)" },
      { id: "interactive-cards", title: "Interactive Cards (Hoverable & Pressable)" },
      { id: "rich-content-card", title: "Rich Content Card (Social & Media)" },
      { id: "image-cover-card", title: "Image Cover Card (Blurred Footer Overlay)" },
      { id: "interactive-customizer", title: "Interactive Card Playground" },
    ],
  },
];

export const navbarTocItems: TocItem[] = [
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

export const paginationTocItems: TocItem[] = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "pagination-examples",
    title: "Pagination Examples",
    children: [
      { id: "basic-pagination", title: "Interactive Pagination" },
      { id: "pagination-variants", title: "Variants & Shapes" },
      { id: "pagination-colors", title: "Color Themes" },
      { id: "large-dataset-ellipsis", title: "Smart Ellipsis Range" },
      { id: "custom-controls-sizes", title: "Sizes & Custom Controls" },
    ],
  },
  {
    id: "infinite-scroll-examples",
    title: "Infinite Scroll",
    children: [
      { id: "infinite-scroll-simulation", title: "Interactive Scroll Simulation" },
      { id: "custom-loader-end", title: "Custom Loader & End State" },
    ],
  },
];

export const selectTocItems: TocItem[] = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "select-examples",
    title: "Select Examples",
    children: [
      { id: "basic-select", title: "Basic Select" },
      { id: "select-variants-sizes", title: "Variants & Sizes" },
      { id: "select-radius", title: "Corner Radii" },
      { id: "select-icons", title: "With Option Icons" },
      { id: "select-states", title: "Error & Disabled States" },
    ],
  },
];

export const sidebarTocItems: TocItem[] = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [{ id: "flat-variant", title: "Flat variant" }],
  },
];

export const stackedTocItems: TocItem[] = [
  { id: "installation", title: "Installation" },
  { id: "preview", title: "Preview" },
];

export const authTocItems: TocItem[] = [
  { id: "installation", title: "Installation" },
  { id: "preview", title: "Preview" },
];

export const skeletonTocItems: TocItem[] = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "basic-usage", title: "Basic Usage" },
      { id: "shapes", title: "Shapes & Variants" },
      { id: "animations", title: "Animations (Pulse & Wave)" },
      { id: "composition", title: "Layout Composition" },
    ],
  },
];

export const switchTocItems: TocItem[] = [
  { id: "installation", title: "Installation" },
  { id: "overview", title: "Overview" },
  { id: "sizes", title: "Sizes" },
  { id: "colors", title: "Colors" },
  { id: "with-labels", title: "With Labels" },
  { id: "api", title: "API Reference" },
];

export const tableTocItems: TocItem[] = [
  { id: "installation", title: "Installation" },
  { id: "overview", title: "Overview" },
  { id: "api", title: "API Reference" },
];

export const tabsTocItems: TocItem[] = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "basic-tabs", title: "Basic Usage" },
      { id: "tab-variants", title: "Variants (Solid, Bordered, Light, Underlined)" },
      { id: "tab-colors", title: "Color Options" },
      { id: "sizes-and-radius", title: "Sizes & Radius" },
      { id: "icons-and-badges", title: "With Icons & Badges" },
      { id: "vertical-tabs", title: "Vertical Orientation" },
      { id: "disabled-state", title: "Disabled States" },
      { id: "full-width-tabs", title: "Full Width" },
    ],
  },
];

export const radioGroupTocItems: TocItem[] = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "basic-radio-group", title: "Basic Usage" },
      { id: "horizontal-orientation", title: "Horizontal Orientation" },
      { id: "radio-colors", title: "Color Options" },
      { id: "radio-sizes", title: "Sizes (sm, md, lg)" },
      { id: "with-descriptions", title: "With Descriptions" },
      { id: "radio-cards", title: "Custom Radio Card Tiles" },
      { id: "invalid-and-disabled", title: "Validation & Disabled States" },
    ],
  },
];

export const tooltipTocItems: TocItem[] = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "basic-tooltip", title: "Basic Usage" },
      { id: "tooltip-placements", title: "Placements (Top, Bottom, Left, Right)" },
      { id: "tooltip-colors", title: "Color Options" },
      { id: "delay-timing", title: "Delay Timers" },
      { id: "rich-content", title: "Rich Custom Content" },
      { id: "custom-radius", title: "Radius Options" },
      { id: "controlled-state", title: "Controlled State" },
    ],
  },
];

export const accordionTocItems: TocItem[] = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "basic-accordion", title: "Basic Usage" },
      { id: "accordion-variants", title: "Variants (Light, Bordered, Shadow, Splitted)" },
      { id: "multiple-selection", title: "Multiple Selection Mode" },
      { id: "subtitles-and-icons", title: "With Subtitles & Start Content" },
      { id: "compact-mode", title: "Compact Mode" },
      { id: "custom-indicator", title: "Custom Indicators" },
      { id: "disabled-items", title: "Disabled States" },
    ],
  },
];

export const textTocItems: TocItem[] = [
  { id: "installation", title: "Installation" },
  { id: "overview", title: "Overview" },
  { id: "variants", title: "Variants" },
  { id: "strong-and-code", title: "Strong & Code" },
  { id: "api", title: "API Reference" },
];

export const textareaTocItems: TocItem[] = [
  { id: "installation", title: "Installation" },
  { id: "overview", title: "Overview" },
  { id: "variants", title: "Variants" },
  { id: "invalid-state", title: "Invalid State" },
  { id: "api", title: "API Reference" },
];

export const changelogTocItems: TocItem[] = [
  { id: "v1-1-0", title: "v1.1.0 - CLI Improvements" },
  { id: "v1-0-0", title: "v1.0.0 - Initial Release" },
];

const tocMap: Record<string, TocItem[]> = {
  "/": gettingStartedTocItems,
  "/changelog": changelogTocItems,
  "/button": buttonTocItems,
  "/alert": alertTocItems,
  "/avatar": avatarTocItems,
  "/badge": badgeTocItems,
  "/checkbox": checkboxTocItems,
  "/combobox": comboBoxTocItems,
  "/description-list": descriptionListTocItems,
  "/dialog": dialogTocItems,
  "/divider": dividerTocItems,
  "/dropdown": dropdownTocItems,
  "/fieldset": fieldsetTocItems,
  "/heading": headingTocItems,
  "/input": inputTocItems,
  "/card": cardTocItems,
  "/navbar": navbarTocItems,
  "/pagination": paginationTocItems,
  "/select": selectTocItems,
  "/layouts/sidebar": sidebarTocItems,
  "/layouts/stacked": stackedTocItems,
  "/layouts/auth": authTocItems,
  "/skeleton": skeletonTocItems,
  "/switch": switchTocItems,
  "/text": textTocItems,
  "/textarea": textareaTocItems,
  "/table": tableTocItems,
  "/accordion": accordionTocItems,
  "/radio-group": radioGroupTocItems,
  "/tabs": tabsTocItems,
  "/tooltip": tooltipTocItems,
};

const defaultToc: TocItem[] = [
  { id: "overview", title: "Overview" },
  { id: "usage", title: "Usage" },
  { id: "api", title: "API Reference" },
];

export function getTocForPath(pathname: string): TocItem[] {
  return tocMap[pathname] || defaultToc;
}
