// packages/schemas/src/types.ts

export type NicheCategory = "agency" | "ai-saas" | "fintech" | "ecommerce" | "portfolio";

export interface NicheThemeTokens {
  brandPrimary: string;
  brandAccent: string;
  fontDisplay: string;
  fontSerifAccent: string;
  fontSans: string;
  fontMono: string;
  mode: "light-default" | "dark-default";
}

export type InnerPageCategory = "core" | "services" | "work" | "company" | "utility";

export interface InnerPageItem {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  category: InnerPageCategory;
  badge?: string;
}

// 1. Navbar & Mega-Menu
export interface NavbarMegaMenuProps {
  brandName: string;
  brandTag: string;
  brandLogoUrl?: string;
  navigationColumns: Array<{
    categoryTitle: string;
    description?: string;
    links: Array<{
      title: string;
      description: string;
      href: string;
      badge?: string;
      iconName?: string;
    }>;
  }>;
  directLinks?: Array<{
    label: string;
    href: string;
  }>;
  primaryCta: {
    label: string;
    href: string;
  };
  enableThemeToggle?: boolean;
}

// 2. Hero Agency
export interface HeroAgencyProps {
  taglineBadge: {
    label: string;
    pulsing?: boolean;
  };
  headline: {
    preText: string;
    serifAccentWord: string;
    postText: string;
  };
  inlinePill?: {
    text: string;
    icon?: string;
  };
  description: string;
  primaryCta: {
    label: string;
    href: string;
    subtext?: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  socialProof: {
    avatars: string[];
    metricText: string;
    ratingText: string;
  };
  heroVisual: {
    src: string;
    alt: string;
    badgeText?: string;
    aspectRatio?: "16/9" | "4/3" | "3/2" | "21/9";
  };
  stats: Array<{
    value: string;
    label: string;
  }>;
}

// 3. Logo Marquee
export interface LogoMarqueeProps {
  headline?: string;
  speed?: number;
  logos: Array<{
    name: string;
    svgContent?: string;
    imageUrl?: string;
  }>;
}

// 4. Interactive Services Row
export interface ServiceItem {
  index: string; // "01", "02"
  title: string;
  category: string;
  description: string;
  deliverables: string[];
  previewImage: string;
  href: string;
  timeline?: string;
}

export interface ServicesInteractiveProps {
  sectionTag: string;
  headline: string;
  description: string;
  services: ServiceItem[];
}

// 5. Case Study Showcase
export interface CaseStudyItem {
  title: string;
  client: string;
  category: string;
  year: string;
  metrics: {
    label: string;
    value: string;
  };
  image: string;
  href: string;
  featured?: boolean;
}

export interface CaseStudyShowcaseProps {
  sectionTag: string;
  headline: string;
  description: string;
  projects: CaseStudyItem[];
}

// 6. Sticky Process Steps
export interface ProcessPhase {
  phaseNumber: string; // "01", "02"
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  timeline: string;
  highlightStat?: string;
}

export interface StickyProcessStepsProps {
  sectionTag: string;
  headline: string;
  description: string;
  baseTop?: string;
  offsetStep?: string;
  phases: ProcessPhase[];
}

// 7. Retainer Pricing Grid
export interface PricingTier {
  name: string;
  tagline: string;
  monthlyPrice: number;
  quarterlyPrice: number;
  isPopular?: boolean;
  features: string[];
  notIncluded?: string[];
  cta: {
    label: string;
    href: string;
  };
}

export interface PricingGridProps {
  sectionTag: string;
  headline: string;
  description: string;
  quarterlyDiscountPercent: number; // e.g. 20
  tiers: PricingTier[];
  guarantee: {
    title: string;
    text: string;
  };
}

// 8. Testimonials & FAQ
export interface TestimonialItem {
  quote: string;
  author: string;
  title: string;
  company: string;
  avatar: string;
  rating: number;
  metricHighlight?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

export interface FaqWithTestimonialsProps {
  sectionTag: string;
  headline: string;
  description: string;
  testimonials: TestimonialItem[];
  faq: FaqItem[];
}

// 9. Split-Text CTA Footer
export interface SplitTextCtaFooterProps {
  splitHeadline: string;
  primaryCta: {
    label: string;
    href: string;
  };
  contactEmail: string;
  officeLocation: string;
  sitemapColumns: Array<{
    title: string;
    links: Array<{
      label: string;
      href: string;
      badge?: string;
    }>;
  }>;
  socialLinks: Array<{
    platform: string;
    href: string;
  }>;
  copyrightText: string;
}

// Master Niche Configuration Contract
export interface AICopilotSectionsProps {
  heroAi: {
    taglineBadge: { label: string; pulsing?: boolean };
    headline: { preText: string; highlightWord: string; postText: string };
    description: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    samplePrompts: string[];
    activeTokensCount: string;
  };
  benchmarksStrip: {
    title: string;
    metrics: Array<{
      label: string;
      value: string;
      deltaVsCompetitor: string;
      subtext: string;
    }>;
  };
  capabilitiesBento: {
    sectionTag: string;
    headline: string;
    description: string;
    items: Array<{
      id: string;
      title: string;
      description: string;
      badge: string;
      colSpan?: number;
      visualType: "code-stream" | "graph-nodes" | "latency-gauge" | "vector-cluster";
      codeSnippet?: string;
      metrics?: { label: string; value: string };
    }>;
  };
  workflowClustering: {
    sectionTag: string;
    headline: string;
    description: string;
    steps: Array<{
      stepNumber: string;
      title: string;
      subtitle: string;
      description: string;
      codeExample?: string;
      metricsBadge?: string;
    }>;
  };
}

export interface FintechSectionsProps {
  heroFintech: {
    taglineBadge: { label: string; pulsing?: boolean };
    headline: { preText: string; highlightWord: string; postText: string };
    description: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    liveApy: string;
    supportedCurrencies: Array<{ code: string; symbol: string; rate: string; change24h: string }>;
  };
  treasuryStrip: {
    metrics: Array<{
      label: string;
      value: string;
      detail: string;
      trendingUp?: boolean;
    }>;
  };
  financialBento: {
    sectionTag: string;
    headline: string;
    description: string;
    cards: Array<{
      id: string;
      title: string;
      description: string;
      badge: string;
      colSpan?: number;
      type: "yield-vault" | "multi-currency-card" | "liquidity-pool" | "instant-settlement";
    }>;
  };
  accountingRails: {
    sectionTag: string;
    headline: string;
    description: string;
    partners: Array<{ name: string; type: string; status: string; latency: string }>;
  };
}

export interface CyberShieldSectionsProps {
  heroCyber: {
    taglineBadge: { label: string; pulsing?: boolean };
    headline: { preText: string; highlightWord: string; postText: string };
    description: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    liveThreatCount: string;
    activeDefenses: string[];
  };
  defenseStrip: {
    metrics: Array<{
      label: string;
      value: string;
      slaText: string;
    }>;
  };
  cyberMatrixBento: {
    sectionTag: string;
    headline: string;
    description: string;
    vectors: Array<{
      id: string;
      title: string;
      description: string;
      badge: string;
      layer:
        "eBPF Kernel" | "Cloud Posture (CSPM)" | "Zero Trust Identity" | "Automated Containment";
      status: "Active" | "Guarded" | "Zero-Day Protected";
    }>;
  };
  containmentLifecycle: {
    sectionTag: string;
    headline: string;
    description: string;
    phases: Array<{
      timeOffset: string;
      title: string;
      action: string;
      detail: string;
    }>;
  };
}

export interface AlunaraWellnessSectionsProps {
  heroSensory: {
    taglineBadge: { label: string };
    headline: { preText: string; highlightWord: string; postText: string };
    description: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    sensoryNote: string;
  };
  clinicalEfficacyStrip: {
    metrics: Array<{
      percentage: string;
      label: string;
      clinicalTrialRef: string;
    }>;
  };
  circadianRegimen: {
    sectionTag: string;
    headline: string;
    description: string;
    phases: Array<{
      timeOfDay: string;
      formulaName: string;
      botanicalHero: string;
      actionEffect: string;
      keyCompounds: string[];
    }>;
  };
  sensoryVesselShowcase: {
    sectionTag: string;
    headline: string;
    description: string;
    vessels: Array<{
      name: string;
      purpose: string;
      material: string;
      volume: string;
    }>;
  };
}

// Master Niche Configuration Contract
export interface NicheConfig {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  category: NicheCategory;
  theme: NicheThemeTokens;
  innerPages: InnerPageItem[];
  sections: {
    navbar: NavbarMegaMenuProps;
    hero: HeroAgencyProps;
    logos: LogoMarqueeProps;
    services: ServicesInteractiveProps;
    caseStudies: CaseStudyShowcaseProps;
    process: StickyProcessStepsProps;
    pricing: PricingGridProps;
    faqTestimonials: FaqWithTestimonialsProps;
    footer: SplitTextCtaFooterProps;
    // Polymorphic Niche Specific Extensions
    ai?: AICopilotSectionsProps;
    fintech?: FintechSectionsProps;
    cyber?: CyberShieldSectionsProps;
    wellness?: AlunaraWellnessSectionsProps;
  };
}
