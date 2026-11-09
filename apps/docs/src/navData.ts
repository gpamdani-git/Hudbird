export interface NavItem {
  name: string;
  path: string;
  isNew?: boolean;
  variants?: number;
  isExternal?: boolean;
  icon?: string; // used for standard icons if needed
  hidden?: boolean;
}

export interface NavGroup {
  title?: string; // Group title
  items: NavItem[];
}

export const navigationData: NavGroup[] = [
  {
    title: "Getting started",
    items: [
      { name: "Getting started", path: "/docs" },
      { name: "Tutorial Install Guide", path: "/installation" },
      { name: "CLI Commands", path: "/cli", isNew: true },
      { name: "Design System (DESIGN.md)", path: "/design-system", isNew: true },
      { name: "Icons", path: "/icons", isNew: true },
      { name: "Create Theme", path: "/themes" },
      { name: "AI Agent Skills", path: "/ai-skills", isNew: true },
    ],
  },
  {
    title: "Layouts",
    items: [
      { name: "Container", path: "/container", variants: 7, isNew: true },
      { name: "Section", path: "/section", variants: 5, isNew: true },
      { name: "Grid", path: "/grid", variants: 4, isNew: true },
      { name: "Sidebar Layout", path: "/layouts/sidebar", variants: 1 },
      { name: "Stacked Layout", path: "/layouts/stacked", variants: 1 },
      { name: "Auth Layout", path: "/layouts/auth", variants: 1 },
    ],
  },
  {
    title: "Core Components",
    items: [
      { name: "Accordion", path: "/accordion", variants: 7 },
      { name: "Alert", path: "/alert", variants: 4 },
      { name: "Avatar", path: "/avatar", variants: 6 },
      { name: "Badge", path: "/badge", variants: 5 },
      { name: "Breadcrumbs", path: "/breadcrumbs", variants: 4, isNew: true },
      { name: "Button", path: "/button", variants: 7 },
      { name: "Calendar", path: "/calendar", variants: 4, isNew: true },
      { name: "Card", path: "/card", variants: 5 },
      { name: "Double Bezel Card", path: "/double-bezel-card", variants: 4, isNew: true },
      { name: "Liquid Glass", path: "/liquid-glass", variants: 3, isNew: true },
      { name: "Checkbox", path: "/checkbox", variants: 5 },
      { name: "Combobox", path: "/combobox", variants: 4 },
      { name: "Command", path: "/command", variants: 2, isNew: true },
      { name: "Description list", path: "/description-list", variants: 4 },
      { name: "Dialog", path: "/dialog", variants: 3 },
      { name: "Divider", path: "/divider", variants: 6 },
      { name: "Dropdown", path: "/dropdown", variants: 4 },
      { name: "Fieldset", path: "/fieldset", variants: 5 },
      { name: "Form", path: "/form", variants: 4, isNew: true },
      { name: "Heading", path: "/heading", variants: 4 },
      { name: "Icon Box", path: "/icon-box", variants: 5, isNew: true },
      { name: "Input", path: "/input", variants: 7 },
      { name: "Input OTP", path: "/input-otp", variants: 5, isNew: true },
      { name: "Navbar", path: "/navbar", variants: 11 },
      { name: "Navigation Menu", path: "/navigation-menu", variants: 6, isNew: true },
      { name: "Pagination", path: "/pagination", variants: 3 },
      { name: "Popover", path: "/popover", variants: 3, isNew: true },
      { name: "Progress", path: "/progress", variants: 5, isNew: true },
      { name: "Radio group", path: "/radio-group", variants: 7 },
      { name: "Select", path: "/select", variants: 5 },
      { name: "Sheet", path: "/sheet", variants: 4, isNew: true },
      { name: "Sidebar", path: "/sidebar", variants: 3, isNew: true },
      { name: "Skeleton", path: "/skeleton", variants: 4 },
      { name: "Slider", path: "/slider", variants: 4, isNew: true },
      { name: "Switch", path: "/switch", variants: 3 },
      { name: "Table", path: "/table", variants: 2 },
      { name: "Tabs", path: "/tabs", variants: 8 },
      { name: "Text", path: "/text", variants: 3 },
      { name: "Textarea", path: "/textarea", variants: 3 },
      { name: "Toast", path: "/toast", variants: 4, isNew: true },
      { name: "Tooltip", path: "/tooltip", variants: 7 },
    ],
  },
  {
    title: "Charts",
    items: [
      { name: "Area Chart", path: "/area-chart", variants: 3 },
      { name: "Bar Chart", path: "/bar-chart", variants: 4 },
      { name: "Line Chart", path: "/line-chart", variants: 4 },
      { name: "Pie Chart", path: "/pie-chart", variants: 7 },
      { name: "Composed Chart", path: "/composed-chart", variants: 4 },
      { name: "Radar Chart", path: "/radar-chart", variants: 4, isNew: true },
      { name: "Radial Chart", path: "/radial-chart", variants: 4, isNew: true },
      { name: "Chart Tooltip", path: "/chart-tooltip", variants: 1 },
    ],
  },
  {
    title: "Motion",
    items: [{ name: "Motion Primitives", path: "/motion", variants: 5, isNew: true }],
  },
  {
    title: "Signature Blocks",
    items: [
      { name: "Morphing Island", path: "/signature/morphing-island", variants: 11, isNew: true },
      { name: "AI Agent Canvas", path: "/signature/agent-canvas", variants: 1, isNew: true },
      {
        name: "Interactive Bento 2.0",
        path: "/signature/interactive-bento",
        variants: 1,
        isNew: true,
      },
    ],
  },
  {
    title: "Application UI",
    items: [
      { name: "Dashboards 01 (Sidebar)", path: "/application-ui/dashboards", variants: 2 },
      { name: "Dashboards 02 (Stacked)", path: "/application-ui/dashboards-stacked", variants: 2 },
      { name: "Settings Pages 01", path: "/application-ui/settings", variants: 2 },
      { name: "Settings Pages 02", path: "/application-ui/settings-stacked", variants: 1 },
      { name: "Informational Pages 01", path: "/application-ui/informational", variants: 1 },
      {
        name: "Informational Pages 02",
        path: "/application-ui/informational-stacked",
        variants: 1,
      },
    ],
  },
  {
    title: "Shared Pages",
    items: [
      { name: "Log In", path: "/shared-pages/login", variants: 2 },
      { name: "Sign Up", path: "/shared-pages/signup", variants: 2 },
      { name: "Verification (OTP)", path: "/shared-pages/verification", variants: 2 },
      { name: "Forgot Password", path: "/shared-pages/forgot-password", variants: 1 },
      { name: "404 Recovery", path: "/shared-pages/404", variants: 2 },
      { name: "Email Templates", path: "/shared-pages/email-templates", variants: 1 },
    ],
  },
  {
    title: "Marketing Sections",
    items: [
      { name: "Page Builder", path: "/marketing/landing-builder", hidden: true, isNew: true },
      { name: "All Sections", path: "/marketing/landing-sections", hidden: true },
      { name: "Navbar", path: "/marketing/landing-sections/navbar", variants: 5 },
      { name: "Hero", path: "/marketing/landing-sections/hero", variants: 5 },
      { name: "Logo Cloud", path: "/marketing/landing-sections/logos", variants: 3 },
      { name: "Benefits", path: "/marketing/landing-sections/benefits", variants: 3 },
      { name: "Feature Showcase", path: "/marketing/landing-sections/features", variants: 3 },
      { name: "How It Works", path: "/marketing/landing-sections/how-it-works", variants: 2 },
      { name: "Integrations", path: "/marketing/landing-sections/integrations", variants: 2 },
      { name: "Testimonials", path: "/marketing/landing-sections/testimonials", variants: 2 },
      { name: "Pricing", path: "/marketing/landing-sections/pricing", variants: 3 },
      { name: "FAQ", path: "/marketing/landing-sections/faq", variants: 3 },
      { name: "Call to Action", path: "/marketing/landing-sections/cta", variants: 3 },
      { name: "Footer", path: "/marketing/landing-sections/footer", variants: 3 },
    ],
  },
  {
    title: "Marketing Examples",
    items: [
      { name: "Landing Pages", path: "/marketing/examples/landing-pages", variants: 1 },
      { name: "Pricing Pages", path: "/marketing/examples/pricing-pages", variants: 1 },
      { name: "About Pages", path: "/marketing/examples/about-pages", variants: 1 },
      { name: "Contact Pages", path: "/marketing/examples/contact-pages", variants: 1 },
      { name: "Blog Pages", path: "/marketing/examples/blog-pages", variants: 1 },
      { name: "Blog Post Pages", path: "/marketing/examples/blog-post-pages", variants: 1 },
      { name: "FAQ Pages", path: "/marketing/examples/faq-pages", variants: 1 },
      { name: "Team Pages", path: "/marketing/examples/team-pages", variants: 1 },
      { name: "Legal Pages", path: "/marketing/examples/legal-pages", variants: 1 },
      { name: "404 Pages", path: "/marketing/examples/404-pages", variants: 1 },
    ],
  },
];

// Flatten all items for previous/next navigation
const flattenedNavItems = navigationData.flatMap((group) => group.items);

export function getPrevNext(currentPath: string) {
  const index = flattenedNavItems.findIndex((item) => item.path === currentPath);
  if (index === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: index > 0 ? flattenedNavItems[index - 1] : null,
    next: index < flattenedNavItems.length - 1 ? flattenedNavItems[index + 1] : null,
  };
}
