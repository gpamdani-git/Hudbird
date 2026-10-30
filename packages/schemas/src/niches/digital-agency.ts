// packages/schemas/src/niches/digital-agency.ts
// Copy guideline: headlines 6–9 words, descriptions ≤ 22 words.
// Wrap ONE word in *asterisks* to render it as the italic-serif accent.
import { NicheConfig, InnerPageItem } from "../types";

const BASE = "/demos/digital-agency";

export const DIGITAL_AGENCY_INNER_PAGES: InnerPageItem[] = [
  // Core
  {
    id: "about",
    slug: `${BASE}/about`,
    title: "About",
    shortDesc: "Who we are and how we think.",
    category: "core",
  },
  {
    id: "services",
    slug: `${BASE}/services`,
    title: "Services",
    shortDesc: "Everything we design and build.",
    category: "core",
  },
  {
    id: "service-detail",
    slug: `${BASE}/services/brand-systems`,
    title: "Service Detail",
    shortDesc: "Scope, tooling and timeline.",
    category: "services",
  },
  {
    id: "projects",
    slug: `${BASE}/projects`,
    title: "Work",
    shortDesc: "Selected shipped projects.",
    category: "core",
  },
  {
    id: "project-detail",
    slug: `${BASE}/projects/kroma-capital`,
    title: "Case Study",
    shortDesc: "Challenge, approach, outcome.",
    category: "work",
  },
  {
    id: "process",
    slug: `${BASE}/process`,
    title: "Process",
    shortDesc: "Five phases, no surprises.",
    category: "core",
  },
  {
    id: "pricing",
    slug: `${BASE}/pricing`,
    title: "Pricing",
    shortDesc: "Monthly retainers, pause anytime.",
    category: "core",
  },

  // Company
  {
    id: "team",
    slug: `${BASE}/team`,
    title: "Team",
    shortDesc: "Meet the people.",
    category: "company",
  },
  {
    id: "team-member",
    slug: `${BASE}/team/dani-akbar`,
    title: "Team Member",
    shortDesc: "Profile and recent work.",
    category: "company",
  },
  {
    id: "careers",
    slug: `${BASE}/careers`,
    title: "Careers",
    shortDesc: "Open roles.",
    category: "company",
  },
  {
    id: "career-detail",
    slug: `${BASE}/careers/senior-design-engineer`,
    title: "Job Opening",
    shortDesc: "Role, pay and how to apply.",
    category: "company",
  },
  {
    id: "blog",
    slug: `${BASE}/blog`,
    title: "Journal",
    shortDesc: "Notes on craft.",
    category: "company",
  },
  {
    id: "blog-post",
    slug: `${BASE}/blog/modern-tailwind-craft`,
    title: "Article",
    shortDesc: "Long-form essay layout.",
    category: "company",
  },

  // Conversion
  {
    id: "contact",
    slug: `${BASE}/contact`,
    title: "Contact",
    shortDesc: "Start a project.",
    category: "utility",
  },
  {
    id: "book",
    slug: `${BASE}/book`,
    title: "Book a Call",
    shortDesc: "Pick a time that suits you.",
    category: "utility",
  },
  {
    id: "testimonials",
    slug: `${BASE}/testimonials`,
    title: "Testimonials",
    shortDesc: "What clients say.",
    category: "utility",
  },
  {
    id: "faq",
    slug: `${BASE}/faq`,
    title: "FAQ",
    shortDesc: "Common questions.",
    category: "utility",
  },
  {
    id: "integrations",
    slug: `${BASE}/integrations`,
    title: "Stack",
    shortDesc: "Tools we trust.",
    category: "services",
  },
  {
    id: "changelog",
    slug: `${BASE}/changelog`,
    title: "Changelog",
    shortDesc: "What shipped lately.",
    category: "utility",
  },
  {
    id: "portal",
    slug: `${BASE}/portal`,
    title: "Client Portal",
    shortDesc: "Your project workspace.",
    category: "utility",
  },

  // Legal & utility
  {
    id: "privacy",
    slug: `${BASE}/privacy`,
    title: "Privacy",
    shortDesc: "How we handle data.",
    category: "utility",
  },
  {
    id: "terms",
    slug: `${BASE}/terms`,
    title: "Terms",
    shortDesc: "Engagement terms.",
    category: "utility",
  },
  {
    id: "404",
    slug: `${BASE}/404`,
    title: "404",
    shortDesc: "Lost, but not for long.",
    category: "utility",
  },
  {
    id: "coming-soon",
    slug: `${BASE}/coming-soon`,
    title: "Coming Soon",
    shortDesc: "Pre-launch page.",
    category: "utility",
  },
];

export const digitalAgencyNiche: NicheConfig = {
  id: "digital-agency",
  name: "Hudbird Studio",
  slug: "digital-agency",
  tagline: "Design & Engineering Studio",
  category: "agency",
  theme: {
    brandPrimary: "#794A8B",
    brandAccent: "#c78ee0",
    fontDisplay: "var(--font-sans, Inter)",
    fontSerifAccent: "var(--font-serif, Instrument Serif)",
    fontSans: "var(--font-sans, Inter)",
    fontMono: "var(--font-mono, JetBrains Mono)",
    mode: "light-default",
  },
  innerPages: DIGITAL_AGENCY_INNER_PAGES,
  sections: {
    // 1. Navbar
    navbar: {
      brandName: "hudbird",
      brandTag: "studio",
      navigationColumns: [
        {
          categoryTitle: "Studio",
          links: [
            { title: "About", description: "Who we are", href: `${BASE}/about` },
            { title: "Services", description: "What we do", href: `${BASE}/services` },
            { title: "Work", description: "Selected projects", href: `${BASE}/projects` },
            { title: "Process", description: "How we work", href: `${BASE}/process` },
            { title: "Pricing", description: "Plans & retainers", href: `${BASE}/pricing` },
          ],
        },
        {
          categoryTitle: "Resources",
          links: [
            { title: "Team", description: "Meet the people", href: `${BASE}/team` },
            { title: "Careers", description: "Open roles", href: `${BASE}/careers` },
            { title: "Journal", description: "Notes on craft", href: `${BASE}/blog` },
            { title: "FAQ", description: "Common questions", href: `${BASE}/faq` },
            { title: "Contact", description: "Start a project", href: `${BASE}/contact` },
          ],
        },
      ],
      directLinks: [
        { label: "Work", href: "#work" },
        { label: "Services", href: "#services" },
        { label: "Process", href: "#process" },
        { label: "Pricing", href: "#pricing" },
      ],
      primaryCta: { label: "Let's talk", href: `${BASE}/contact` },
      enableThemeToggle: true,
    },

    // 2. Hero
    hero: {
      taglineBadge: { label: "Independent design & engineering studio" },
      headline: {
        preText: "We build digital products people",
        serifAccentWord: "remember",
        postText: ".",
      },
      description:
        "Brand systems, web apps and storefronts for founders who care about the details.",
      primaryCta: { label: "See our work", href: "#work" },
      secondaryCta: { label: "Book a call", href: `${BASE}/book` },
      socialProof: {
        avatars: [
          "/assets/nexus/dani-akbar.jpg",
          "preset:avatar-monogram?name=Elena+Rostova",
          "preset:avatar-monogram?name=Julian+Chen",
        ],
        metricText: "45+ teams shipped faster with us this year.",
        ratingText: "Rated 4.9 by clients",
      },
      heroVisual: {
        src: "/assets/nexus/hero-installation.jpg",
        alt: "Architectural Studio Installation",
        badgeText: "Studio",
        aspectRatio: "16/9",
      },
      stats: [
        { value: "98%", label: "Clients who return" },
        { value: "140+", label: "Sprints shipped" },
      ],
    },

    // 3. Logos
    logos: {
      headline: "Trusted by product teams at",
      speed: 40,
      logos: [
        { name: "Vercel" },
        { name: "Linear" },
        { name: "Stripe" },
        { name: "Supabase" },
        { name: "Raycast" },
        { name: "Shopify" },
        { name: "Retool" },
        { name: "Resend" },
      ],
    },

    // 4. Services
    services: {
      sectionTag: "Services",
      headline: "Four disciplines, one *senior* team.",
      description:
        "We design and build the whole surface of your product, from type scale to checkout.",
      services: [
        {
          index: "01",
          title: "Brand Systems",
          category: "Identity",
          description: "Tokens, type and Figma libraries that map one-to-one to code.",
          deliverables: ["Design tokens", "Figma library", "Guidelines"],
          previewImage: "/assets/nexus/service-brand.svg",
          href: `${BASE}/services/brand-systems`,
          timeline: "2–3 weeks",
        },
        {
          index: "02",
          title: "Web Applications",
          category: "Engineering",
          description: "Next.js apps with instant transitions and zero layout shift.",
          deliverables: ["Next.js", "TypeScript", "Tailwind"],
          previewImage: "/assets/nexus/service-webapp.svg",
          href: `${BASE}/services/web-applications`,
          timeline: "3–5 weeks",
        },
        {
          index: "03",
          title: "Shopify Storefronts",
          category: "Commerce",
          description: "Editorial themes tuned for fast, confident checkouts.",
          deliverables: ["Custom sections", "Quick-buy", "Speed tuning"],
          previewImage: "/assets/nexus/service-shopify.svg",
          href: `${BASE}/services/shopify-storefronts`,
          timeline: "3–4 weeks",
        },
        {
          index: "04",
          title: "Performance Audits",
          category: "Advisory",
          description: "Leaner bundles, cleaner repos, Lighthouse scores above 95.",
          deliverables: ["Audit report", "Bundle trim", "CI setup"],
          previewImage: "/assets/nexus/service-audit.svg",
          href: `${BASE}/services/performance-monorepo`,
          timeline: "1–2 weeks",
        },
      ],
    },

    // 5. Case studies
    caseStudies: {
      sectionTag: "Selected work",
      headline: "Recent work, measured in *outcomes*.",
      description: "A few products we shipped this year, and what changed after launch.",
      projects: [
        {
          title: "Kroma Capital",
          client: "Kroma Capital",
          category: "Fintech Platform",
          year: "2026",
          metrics: { label: "Pipeline growth", value: "+218%" },
          image: "/assets/nexus/work-kroma.svg",
          href: `${BASE}/projects/kroma-capital`,
          featured: true,
        },
        {
          title: "Aura Wearables",
          client: "Aura Labs",
          category: "Hardware Store",
          year: "2026",
          metrics: { label: "Mobile LCP", value: "0.48s" },
          image: "/assets/nexus/work-aura.svg",
          href: `${BASE}/projects/aura-wearables`,
        },
        {
          title: "Vesper Goods",
          client: "Vesper Studio",
          category: "Spatial Commerce",
          year: "2025",
          metrics: { label: "Checkout rate", value: "+84%" },
          image: "/assets/nexus/work-vesper.svg",
          href: `${BASE}/projects/vesper-goods`,
        },
        {
          title: "Synapse Systems",
          client: "Synapse AI",
          category: "AI Foundation",
          year: "2026",
          metrics: { label: "Series A raised", value: "$42M" },
          image: "/assets/nexus/work-synapse.svg",
          href: `${BASE}/projects/synapse-studio`,
        },
      ],
    },

    // 6. Process
    process: {
      sectionTag: "Process",
      headline: "From first call to launch in *six* weeks.",
      description: "Five clear phases with weekly demos. No scope creep, no surprises.",
      baseTop: "6.5rem",
      offsetStep: "1.5rem",
      phases: [
        {
          phaseNumber: "01",
          title: "Discover",
          subtitle: "Clarity before creativity",
          description: "We map your users, goals and constraints before drawing a single pixel.",
          deliverables: ["Product brief", "Site architecture"],
          timeline: "Week 1",
        },
        {
          phaseNumber: "02",
          title: "Design",
          subtitle: "Systems, not screens",
          description: "Tokens, components and real prototypes you can click through.",
          deliverables: ["Figma system", "Motion specs"],
          timeline: "Weeks 2–3",
        },
        {
          phaseNumber: "03",
          title: "Build",
          subtitle: "Production from day one",
          description: "Typed, accessible code shipped to a live preview every week.",
          deliverables: ["Next.js codebase", "Preview deploys"],
          timeline: "Weeks 4–5",
        },
        {
          phaseNumber: "04",
          title: "Refine",
          subtitle: "Fast, then faster",
          description: "Testing, keyboard checks and performance tuning until it feels instant.",
          deliverables: ["QA suite", "Speed report"],
          timeline: "Week 6",
        },
        {
          phaseNumber: "05",
          title: "Launch",
          subtitle: "And keep going",
          description: "A calm launch, clear handover and monthly sprints if you want them.",
          deliverables: ["Go-live", "Documentation"],
          timeline: "Ongoing",
        },
      ],
    },

    // 7. Pricing
    pricing: {
      sectionTag: "Pricing",
      headline: "Simple retainers. Pause *anytime*.",
      description: "Senior design and engineering on tap, without the hiring overhead.",
      quarterlyDiscountPercent: 20,
      tiers: [
        {
          name: "Sprint",
          tagline: "Focused design or frontend bursts.",
          monthlyPrice: 2500,
          quarterlyPrice: 2000,
          features: [
            "One request at a time",
            "48h average turnaround",
            "Shared Slack channel",
            "Pause or cancel anytime",
          ],
          cta: { label: "Start a sprint", href: `${BASE}/pricing?tier=sprint` },
        },
        {
          name: "Dedicated",
          tagline: "A senior designer and engineer, embedded.",
          monthlyPrice: 5500,
          quarterlyPrice: 4400,
          isPopular: true,
          features: [
            "Two requests in parallel",
            "24–48h turnaround",
            "Design system + Next.js",
            "Weekly planning call",
            "Priority reviews",
          ],
          cta: { label: "Get started", href: `${BASE}/pricing?tier=dedicated` },
        },
        {
          name: "Studio",
          tagline: "Parallel streams for scaling teams.",
          monthlyPrice: 12000,
          quarterlyPrice: 9600,
          features: [
            "Unlimited workstreams",
            "Fractional design director",
            "2h response time",
            "Custom terms & NDA",
          ],
          cta: { label: "Talk to us", href: `${BASE}/contact?tier=studio` },
        },
      ],
      guarantee: {
        title: "Two-week guarantee",
        text: "Not happy after 14 days? Full refund, no questions.",
      },
    },

    // 8. Testimonials & FAQ
    faqTestimonials: {
      sectionTag: "FAQ",
      headline: "Questions, answered *plainly*.",
      description: "What founders usually ask before our first call.",
      testimonials: [
        {
          quote:
            "They rebuilt our product in five weeks. Enterprise pipeline is up 218% and the team finally loves the tool.",
          author: "Dani Akbar",
          title: "Founder & Creative Director",
          company: "BlankUI Studio",
          avatar: "/assets/nexus/dani-akbar.jpg",
          rating: 5,
        },
        {
          quote:
            "Lighthouse 99 on every page, and it still feels like a brand. Rare combination of taste and discipline.",
          author: "Elena Rostova",
          title: "VP Product",
          company: "Aura Labs",
          avatar: "preset:avatar-monogram?name=Elena+Rostova",
          rating: 5,
        },
        {
          quote:
            "Like having a senior product team on tap. Fast, calm, and zero fluff in every handover.",
          author: "Julian Chen",
          title: "CTO",
          company: "Synapse AI",
          avatar: "preset:avatar-monogram?name=Julian+Chen",
          rating: 5,
        },
      ],
      faq: [
        {
          question: "How fast can we start?",
          answer: "Usually within 48 hours. You get a shared Slack channel the same day.",
        },
        {
          question: "Who does the work?",
          answer:
            "Senior designers and engineers only. No juniors, no hand-offs to subcontractors.",
        },
        {
          question: "Can I pause my retainer?",
          answer: "Yes. Pause whenever you need a breather and pick up where we left off.",
        },
        {
          question: "Who owns the code?",
          answer: "You do — every file, component and design asset, from day one.",
        },
        {
          question: "What do you build with?",
          answer: "React, Next.js, TypeScript and Tailwind. Liquid and Hydrogen for Shopify.",
        },
      ],
    },

    // 9. CTA & footer
    footer: {
      splitHeadline: "Got a product worth building *well*?",
      primaryCta: { label: "Start a project", href: `${BASE}/contact` },
      contactEmail: "hello@hudbird.studio",
      officeLocation: "New York & London",
      sitemapColumns: [
        {
          title: "Studio",
          links: [
            { label: "About", href: `${BASE}/about` },
            { label: "Services", href: `${BASE}/services` },
            { label: "Work", href: `${BASE}/projects` },
            { label: "Pricing", href: `${BASE}/pricing` },
          ],
        },
        {
          title: "Company",
          links: [
            { label: "Team", href: `${BASE}/team` },
            { label: "Careers", href: `${BASE}/careers` },
            { label: "Journal", href: `${BASE}/blog` },
            { label: "FAQ", href: `${BASE}/faq` },
          ],
        },
        {
          title: "Legal",
          links: [
            { label: "Contact", href: `${BASE}/contact` },
            { label: "Client portal", href: `${BASE}/portal` },
            { label: "Privacy", href: `${BASE}/privacy` },
            { label: "Terms", href: `${BASE}/terms` },
          ],
        },
      ],
      socialLinks: [
        { platform: "X", href: "https://twitter.com/danihudbird" },
        { platform: "GitHub", href: "https://github.com/gpamdani-git/Hudbird" },
        { platform: "Dribbble", href: "https://dribbble.com" },
        { platform: "LinkedIn", href: "https://linkedin.com" },
      ],
      copyrightText: "© 2026 Hudbird Studio",
    },
  },
};
