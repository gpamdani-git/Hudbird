export interface NavItem {
  name: string;
  path: string;
  isNew?: boolean;
  variants?: number;
  isExternal?: boolean;
  icon?: string; // used for standard icons if needed
}

export interface NavGroup {
  title?: string; // Optional for root level like Getting Started
  items: NavItem[];
}
export const navigationData: NavGroup[] = [
  {
    items: [
      { name: "Getting started", path: "/" },
      { name: "Tutorial Install Guide", path: "/installation" },
      { name: "Create Theme", path: "/themes" },
      { name: "Changelog", path: "/changelog" },
      { name: "Support & FAQ", path: "/support" },
    ],
  },
  {
    title: "Layouts",
    items: [
      { name: "Sidebar Layout", path: "/layouts/sidebar", variants: 1 },
      { name: "Stacked Layout", path: "/layouts/stacked", variants: 1 },
      { name: "Auth Layout", path: "/layouts/auth", variants: 1 },
    ],
  },
  {
    title: "Marketing Sections",
    items: [
      { name: "Hero Section", path: "/marketing/hero", variants: 3 },
      { name: "Bento Grid", path: "/marketing/bento-grid", variants: 1 },
      { name: "Logo Clouds", path: "/marketing/logo-clouds", variants: 2 },
      { name: "FAQ", path: "/marketing/faq", variants: 2 },
      { name: "Feature Sections", path: "/marketing/feature-sections", variants: 2 },
      { name: "Testimonials", path: "/marketing/testimonials", variants: 2 },
      { name: "Pricing", path: "/marketing/pricing", variants: 1 },
      { name: "Call to Action", path: "/marketing/cta", variants: 2 },
      { name: "Footer", path: "/marketing/footer", variants: 2 },
    ],
  },
  {
    title: "Components",
    items: [
      { name: "Accordion", path: "/accordion", variants: 7 },
      { name: "Alert", path: "/alert", variants: 4 },
      { name: "Avatar", path: "/avatar", variants: 6 },
      { name: "Badge", path: "/badge", variants: 5 },
      { name: "Button", path: "/button", variants: 7 },
      { name: "Card", path: "/card", variants: 5 },
      { name: "Checkbox", path: "/checkbox", variants: 5 },
      { name: "Combobox", path: "/combobox", variants: 4 },
      { name: "Description list", path: "/description-list", variants: 4 },
      { name: "Dialog", path: "/dialog", variants: 3 },
      { name: "Divider", path: "/divider", variants: 4 },
      { name: "Dropdown", path: "/dropdown", variants: 4 },
      { name: "Fieldset", path: "/fieldset", variants: 5 },
      { name: "Heading", path: "/heading", variants: 4 },
      { name: "Input", path: "/input", variants: 7 },
      { name: "Navbar", path: "/navbar", variants: 11 },
      { name: "Pagination", path: "/pagination", variants: 3 },
      { name: "Radio group", path: "/radio-group", variants: 7 },
      { name: "Select", path: "/select", variants: 5 },
      { name: "Skeleton", path: "/skeleton", variants: 4 },
      { name: "Switch", path: "/switch", variants: 3 },
      { name: "Table", path: "/table", variants: 2 },
      { name: "Tabs", path: "/tabs", variants: 8 },
      { name: "Text", path: "/text", variants: 3 },
      { name: "Textarea", path: "/textarea", variants: 3 },
      { name: "Tooltip", path: "/tooltip", variants: 7 },
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
