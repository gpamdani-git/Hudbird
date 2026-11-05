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
    coreComponents: ["Section", "Container", "Navbar", "NavbarMegaMenu", "Button", "Grid"],
    variants: [
      {
        id: "simple",
        name: "Simple navigation",
        description: "Direct links with a compact mobile menu.",
      },
      {
        id: "mega",
        name: "Product mega menu",
        description: "Group product links with short descriptions.",
      },
    ],
  },
  {
    type: "hero",
    title: "Hero",
    description: "Introduce the product and its next action.",
    coreComponents: ["Section", "Container", "Grid", "Heading", "Text", "Button", "Tabs"],
    variants: [
      {
        id: "centered",
        name: "Centered product",
        description: "A focused headline above a wide product image.",
      },
      {
        id: "split",
        name: "Split introduction",
        description: "Balance product copy with a visual alongside it.",
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
    coreComponents: ["Section", "Container", "Grid", "Text", "Heading"],
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
    coreComponents: ["Section", "Container", "Grid", "Heading", "Text"],
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
  },
  {
    type: "features",
    title: "Feature Showcase",
    description: "Connect each capability to a useful product view.",
    coreComponents: [
      "Section",
      "Container",
      "Grid",
      "Tabs",
      "TabPanel",
      "Accordion",
      "Heading",
      "Text",
    ],
    variants: [
      {
        id: "tabs",
        name: "Tabbed preview",
        description: "Switch the feature explanation and its matching view.",
      },
      {
        id: "accordion",
        name: "Expandable preview",
        description: "Open a feature to update the adjacent product view.",
      },
      {
        id: "split",
        name: "Editorial feature rows",
        description: "Give each feature its own alternating text and visual row.",
      },
    ],
  },
  {
    type: "how-it-works",
    title: "How It Works",
    description: "Describe a real sequence from starting to finishing.",
    coreComponents: ["Section", "Container", "Grid", "Heading", "Text"],
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
    coreComponents: ["Section", "Container", "Grid", "Card", "CardBody", "Heading", "Text"],
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
    coreComponents: ["Section", "Container", "Grid", "Card", "CardBody", "Text", "Heading"],
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
    coreComponents: ["Section", "Container", "Grid", "Card", "CardBody", "Button", "Table"],
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
  },
  {
    type: "faq",
    title: "FAQ",
    description: "Answer objections without adding visual noise.",
    coreComponents: [
      "Section",
      "Container",
      "Grid",
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
  },
  {
    type: "cta",
    title: "Call to Action",
    description: "Close with one useful next step.",
    coreComponents: ["Section", "Container", "Grid", "Button", "Heading", "Text"],
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
  },
  {
    type: "footer",
    title: "Footer",
    description: "Finish the page with useful navigation and context.",
    coreComponents: ["Section", "Container", "Grid", "Button", "Text", "Heading"],
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
  },
];
