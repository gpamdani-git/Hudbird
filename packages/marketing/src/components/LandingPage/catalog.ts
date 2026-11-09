import type { LandingSectionDefinition } from "@hudbird/schemas";

export const landingComponentNames = {
  navbar: "LandingNavbar",
  hero: "HeroSection",
  logos: "LandingLogoCloud",
  benefits: "LandingBenefits",
  features: "LandingFeatureShowcase",
  "how-it-works": "LandingHowItWorks",
  integrations: "LandingIntegrations",
  testimonials: "LandingTestimonials",
  pricing: "LandingPricing",
  faq: "LandingFaq",
  cta: "LandingCta",
  footer: "LandingFooter",
} as const;

export const landingSectionRegistry: LandingSectionDefinition[] = [
  {
    type: "navbar",
    title: "Navbar",
    description: "Give visitors a clear route through your page.",
    coreComponents: [
      "Section",
      "Container",
      "Navbar",
      "NavbarMegaMenu",
      "IconBox",
      "Button",
      "Grid",
    ],
    variants: [
      {
        id: "nav-13",
        name: "Modern Mini",
        description:
          "Ultra-compact floating capsule with live scroll percentage indicator, quick dark/light theme switch, and spring modal dropdown.",
      },
      {
        id: "mega",
        name: "Product mega menu",
        description: "Group product links with short descriptions.",
      },
    ],
    additionalVariants: [
      {
        id: "simple",
        name: "Simple navigation",
        description: "Direct links with a compact mobile menu.",
      },
      {
        id: "nav-01",
        name: "NAV-01 — SaaS Classic",
        description: "Left logo, centered navigation links, and right conversion CTA.",
      },
      {
        id: "nav-02",
        name: "NAV-02 — SaaS Floating",
        description:
          "Floating rounded pill navbar with backdrop glassmorphism and hide/reveal on scroll.",
      },
      {
        id: "nav-03",
        name: "NAV-03 — SaaS Platform",
        description:
          "Modern platform header with multi-column rich mega menu and featured customer card.",
      },
      {
        id: "nav-04",
        name: "NAV-04 — Startup Launch",
        description: "Centered brand wordmark with symmetrical split navigation links.",
      },
      {
        id: "nav-05",
        name: "NAV-05 — Creative Agency",
        description:
          "Bold editorial layout with right menu trigger and immersive fullscreen overlay.",
      },
      {
        id: "nav-06",
        name: "NAV-06 — Creative Studio",
        description: "Asymmetric typographic navigation with right-aligned logo and left links.",
      },
      {
        id: "nav-07",
        name: "NAV-07 — Portfolio",
        description: "Cinematic minimal header with subtle centered branding and split links.",
      },
      {
        id: "nav-08",
        name: "NAV-08 — Corporate Classic",
        description:
          "Restrained corporate header with disclosure dropdown submenu and enterprise CTA.",
      },
      {
        id: "nav-09",
        name: "NAV-09 — Corporate Enterprise",
        description:
          "Dense two-row header with top utility row and primary sticky row with mega menu.",
      },
      {
        id: "nav-10",
        name: "NAV-10 — Luxury Hospitality",
        description:
          "High-contrast hero overlay header with centered serif typography and booking action.",
      },
      {
        id: "nav-11",
        name: "NAV-11 — Restaurant & F&B",
        description:
          "Warm brand-first header with reservation CTA and smooth color change on scroll.",
      },
      {
        id: "nav-12",
        name: "NAV-12 — Professional Services",
        description:
          "Refined geometric corporate header with right-anchored wordmark and dropdown.",
      },
      {
        id: "centered",
        name: "Centered pill bar",
        description: "Floating centered navigation pill with action button.",
      },
      {
        id: "sidebar-1",
        name: "Sidebar 1 — Compact rail",
        description: "Left rail navigation header with slide-out section drawer.",
      },
      {
        id: "sidebar-2",
        name: "Sidebar 2 — Command drawer",
        description: "Minimal top bar with full-height sidebar navigation drawer.",
      },
    ],
  },
  {
    type: "hero",
    title: "Hero",
    description: "Introduce the product and its next action.",
    coreComponents: ["Section", "Container", "Grid", "Badge", "Heading", "Text", "Button", "Tabs"],
    variants: [
      {
        id: "split",
        name: "Split introduction",
        description: "Balance product copy with a visual alongside it.",
      },
      {
        id: "centered",
        name: "Centered product",
        description: "A focused headline above a wide product image.",
      },
      {
        id: "interactive",
        name: "Hands-on preview",
        description: "Let visitors switch between local demo views.",
      },
    ],
    additionalVariants: [
      {
        id: "slideshow",
        name: "Slideshow (additional)",
        description: "A manual image sequence from the existing hero kit.",
      },
      {
        id: "video",
        name: "Video background (additional)",
        description: "The existing paused-by-default background video.",
      },
    ],
  },
  {
    type: "logos",
    title: "Logo Cloud",
    description: "A restrained place for real customer or partner logos.",
    coreComponents: ["Section", "Container", "Grid", "Badge", "Text", "Heading"],
    variants: [
      { id: "row", name: "Logo row", description: "A quiet wrapping row beneath an introduction." },
      {
        id: "intro-grid",
        name: "Introduction and grid",
        description: "Explain the relationship beside the logo collection.",
      },
      {
        id: "ticker",
        name: "Automatic logo ticker",
        description: "A calm, continuous logo row with pause and reduced-motion support.",
      },
    ],
  },
  {
    type: "benefits",
    title: "Benefits",
    description: "Explain the outcomes that matter to the visitor.",
    coreComponents: [
      "Section",
      "Container",
      "Grid",
      "Badge",
      "IconBox",
      "Card",
      "CardBody",
      "Heading",
      "Text",
    ],
    variants: [
      {
        id: "columns",
        name: "Benefit columns",
        description: "Three clear outcomes in an open typographic layout.",
      },
      {
        id: "visual-list",
        name: "Visual and benefits",
        description: "Pair a product view with a readable benefit list.",
      },
    ],
    additionalVariants: [
      {
        id: "cards",
        name: "2x2 Outcome showcase",
        description:
          "Segmented role toggle with 2x2 interactive smartphone & floating outcome showcase cards.",
      },
    ],
  },
  {
    type: "features",
    title: "Feature Showcase",
    description: "Connect each capability to a useful product view.",
    coreComponents: [
      "Section",
      "Container",
      "Grid",
      "Badge",
      "IconBox",
      "Tabs",
      "TabPanel",
      "Accordion",
      "Heading",
      "Text",
    ],
    variants: [
      {
        id: "tabs",
        name: "Features horizontal card",
        description: "Horizontal cards with smooth Shopify-style glide, drag, and morphing hover.",
      },
      {
        id: "accordion",
        name: "Expandable preview",
        description:
          "Expandable scrollytelling preview with sticky 3D stage and progress scrubber.",
      },
      {
        id: "split",
        name: "Editorial feature rows",
        description:
          "Sticky 3D paper-fold stacking cards with rich editorial mockups and micro-interactions.",
      },
    ],
  },
  {
    type: "how-it-works",
    title: "How It Works",
    description: "Describe a real sequence from starting to finishing.",
    coreComponents: [
      "Section",
      "Container",
      "Grid",
      "Badge",
      "IconBox",
      "Card",
      "CardBody",
      "Heading",
      "Text",
    ],
    variants: [
      {
        id: "horizontal",
        name: "Horizontal steps",
        description: "A concise sequence with a shared product visual.",
      },
      {
        id: "vertical",
        name: "Visual steps",
        description: "Walk through the sequence with a visual for each step.",
      },
    ],
  },
  {
    type: "integrations",
    title: "Integrations",
    description: "Show where the product fits in a workflow.",
    coreComponents: [
      "Section",
      "Container",
      "Grid",
      "Badge",
      "IconBox",
      "Card",
      "CardBody",
      "Heading",
      "Text",
    ],
    variants: [
      {
        id: "grid",
        name: "Integration grid",
        description: "Browse the connection examples in a simple grid.",
      },
      {
        id: "grouped",
        name: "Workflow groups",
        description: "Organize connection examples by their purpose.",
      },
    ],
  },
  {
    type: "testimonials",
    title: "Testimonials",
    description: "Make room for verified customer feedback.",
    coreComponents: [
      "Section",
      "Container",
      "Grid",
      "Badge",
      "Avatar",
      "Card",
      "CardBody",
      "Text",
      "Heading",
    ],
    variants: [
      {
        id: "featured",
        name: "Featured quotation",
        description: "Let one considered quotation lead the section.",
      },
      {
        id: "collection",
        name: "Quotation collection",
        description: "Present several short perspectives with their context.",
      },
    ],
  },
  {
    type: "pricing",
    title: "Pricing",
    description: "Make the differences between plans easy to read.",
    coreComponents: [
      "Section",
      "Container",
      "Grid",
      "Badge",
      "IconBox",
      "Card",
      "CardBody",
      "Button",
      "Table",
    ],
    variants: [
      {
        id: "cards",
        name: "Plan cards",
        description: "Compare the purpose, price, and inclusions of each plan.",
      },
      {
        id: "comparison",
        name: "Comparison table",
        description: "Compare the same plans feature by feature.",
      },
    ],
    additionalVariants: [
      {
        id: "highlight",
        name: "Featured plan spotlight",
        description:
          "Highlight the primary team plan alongside compact starter and enterprise tiers.",
      },
    ],
  },
  {
    type: "faq",
    title: "FAQ",
    description: "Answer objections without adding visual noise.",
    coreComponents: [
      "Section",
      "Container",
      "Grid",
      "Badge",
      "IconBox",
      "Card",
      "CardBody",
      "Accordion",
      "AccordionItem",
      "Heading",
      "Text",
    ],
    variants: [
      {
        id: "single",
        name: "Simple questions",
        description: "A focused introduction beside one question list.",
      },
      {
        id: "grouped",
        name: "Grouped questions",
        description: "Split questions into clear topics.",
      },
    ],
    additionalVariants: [
      {
        id: "columns",
        name: "Two-column Q&A grid",
        description: "Display all answers open in a scannable two-column editorial grid.",
      },
    ],
  },
  {
    type: "cta",
    title: "Call to Action",
    description: "Close with one useful next step.",
    coreComponents: [
      "Section",
      "Container",
      "Grid",
      "Badge",
      "IconBox",
      "Card",
      "CardBody",
      "Button",
      "Heading",
      "Text",
    ],
    variants: [
      {
        id: "centered",
        name: "Focused invitation",
        description: "A centered closing statement and primary action.",
      },
      {
        id: "split",
        name: "Invitation and benefits",
        description: "Pair the next step with a short benefit reminder.",
      },
    ],
    additionalVariants: [
      {
        id: "banner",
        name: "High-contrast banner card",
        description: "A bordered full-width callout banner with inline benefit pills.",
      },
    ],
  },
  {
    type: "footer",
    title: "Footer",
    description: "Finish the page with useful navigation and context.",
    coreComponents: ["Section", "Container", "Grid", "Badge", "Button", "Text", "Heading"],
    variants: [
      {
        id: "simple",
        name: "Simple footer",
        description: "A brand signature with compact navigation.",
      },
      {
        id: "columns",
        name: "Navigation columns",
        description: "Group useful links alongside the brand description.",
      },
    ],
    additionalVariants: [
      {
        id: "centered",
        name: "Centered minimal footer",
        description: "Centered brand mark, horizontal navigation links, and legal note.",
      },
    ],
  },
];
