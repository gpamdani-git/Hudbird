// packages/schemas/src/niches/alunara-wellness.ts
import { NicheConfig } from "../types";
import { createNicheInnerPages } from "./inner-pages";

const SLUG = "alunara-wellness";
const BASE = `/demos/${SLUG}`;
const NAME = "Alunara Sanctuary";

export const alunaraWellnessNiche: NicheConfig = {
  id: "alunara-wellness",
  name: NAME,
  slug: SLUG,
  tagline: "Biophilic Botanicals & Luxury Spatial Rituals",
  category: "ecommerce",
  theme: {
    brandPrimary: "#794A8B", // Deep Plum
    brandAccent: "#C78EE0",
    fontDisplay: "var(--font-sans, Inter)",
    fontSerifAccent: "var(--font-serif, Instrument Serif)",
    fontSans: "var(--font-sans, Inter)",
    fontMono: "var(--font-mono, JetBrains Mono)",
    mode: "light-default",
  },
  innerPages: createNicheInnerPages(SLUG, NAME),
  sections: {
    navbar: {
      brandName: "alunara",
      brandTag: "sanctuary",
      navigationColumns: [
        {
          categoryTitle: "Atelier",
          links: [
            { title: "Philosophy", description: "Our Botanical Heritage", href: `${BASE}/about` },
            {
              title: "Formulations",
              description: "Circadian Body & Space",
              href: `${BASE}/services`,
            },
            { title: "Rituals", description: "Bespoke Daily Sequences", href: `${BASE}/projects` },
            {
              title: "Sourcing",
              description: "Ethical Harvest & Extraction",
              href: `${BASE}/process`,
            },
            { title: "Sanctuary Club", description: "Seasonal Retainers", href: `${BASE}/pricing` },
          ],
        },
        {
          categoryTitle: "Journal & House",
          links: [
            { title: "Botanists", description: "Our Formulators & Chemists", href: `${BASE}/team` },
            {
              title: "Sanctuary Journal",
              description: "Notes on Sensory Living",
              href: `${BASE}/blog`,
            },
            {
              title: "Private Bookings",
              description: "Spa & Atelier Sessions",
              href: `${BASE}/book`,
            },
            { title: "FAQ", description: "Ingredients & Shipping", href: `${BASE}/faq` },
            { title: "Inquire", description: "Wholesale & Hospitality", href: `${BASE}/contact` },
          ],
        },
      ],
      directLinks: [
        { label: "Formulations", href: "#services" },
        { label: "Rituals", href: "#work" },
        { label: "Sourcing", href: "#process" },
        { label: "Club", href: "#pricing" },
      ],
      primaryCta: { label: "Order Discovery Set", href: `${BASE}/services` },
      enableThemeToggle: true,
    },
    hero: {
      taglineBadge: { label: "Botanical Formulation No. 09" },
      headline: {
        preText: "Holistic formulations crafted for modern sensory",
        serifAccentWord: "calm",
        postText: ".",
      },
      description:
        "Small-batch botanical extracts, cold-pressed cold-climate floras, and architectural glassware designed for restorative daily rituals.",
      primaryCta: { label: "Explore Collection", href: "#services" },
      secondaryCta: { label: "Book Consultation", href: `${BASE}/book` },
      socialProof: {
        avatars: [
          "/assets/nexus/dani-akbar.jpg",
          "preset:avatar-monogram?name=Clara+Dumas",
          "preset:avatar-monogram?name=Kenji+Sato",
        ],
        metricText: "Formulated in Grasse & Kyoto. Loved by 18,000+ patrons.",
        ratingText: "Rated 4.95 by Patrons",
      },
      heroVisual: {
        src: "/assets/nexus/work-vesper.svg",
        alt: "Alunara Sanctuary Botanical Still Life",
        badgeText: "Harvest 2026",
        aspectRatio: "16/9",
      },
      stats: [
        { value: "100%", label: "Organic Botanicals" },
        { value: "0.0%", label: "Synthetic Fixatives" },
      ],
    },
    logos: {
      headline: "Featured in leading spatial design & wellness publications",
      speed: 30,
      logos: [
        { name: "Vogue" },
        { name: "Architectural Digest" },
        { name: "Wallpaper*" },
        { name: "Kinfolk" },
        { name: "Cereal Magazine" },
        { name: "Elle Decor" },
        { name: "Monocle" },
      ],
    },
    services: {
      sectionTag: "Core Rituals",
      headline: "Four sensorial pillars, zero synthetic *fillers*.",
      description: "From circadian body balms to bespoke atmospheric diffuser ceramics.",
      services: [
        {
          index: "01",
          title: "Circadian Essences",
          category: "Botanicals",
          description:
            "Bioactive morning serums and evening restorative balms harmonized to light cycles.",
          deliverables: ["Cold-pressed oils", "Amber glass flacons", "Organic certification"],
          previewImage: "/assets/nexus/work-vesper.svg",
          href: `${BASE}/services/detail`,
          timeline: "Batch of 500",
        },
        {
          index: "02",
          title: "Spatial Aromatherapy",
          category: "Atmosphere",
          description:
            "Smoked glass diffusers and hand-cast travertine scent stones infused with cypress and hinoki.",
          deliverables: ["Travertine plinth", "Pure essential blend", "Pipette dropper"],
          previewImage: "/assets/nexus/service-shopify.svg",
          href: `${BASE}/services/detail`,
          timeline: "Custom Blends",
        },
        {
          index: "03",
          title: "Hydrotherapy Salts",
          category: "Body",
          description:
            "Sun-evaporated mineral salts combined with alpine magnesium flakes and botanical petals.",
          deliverables: ["Dead Sea minerals", "French lavender", "Sensory pouch"],
          previewImage: "/assets/nexus/service-brand.svg",
          href: `${BASE}/services/detail`,
          timeline: "Seasonal",
        },
        {
          index: "04",
          title: "Hospitality Editions",
          category: "Bespoke",
          description:
            "Curated guest amenitities and custom signature fragrances for luxury boutique hotels.",
          deliverables: ["Private label", "Refillable dispensers", "Scent identity"],
          previewImage: "/assets/nexus/work-aura.svg",
          href: `${BASE}/services/detail`,
          timeline: "4–6 weeks",
        },
      ],
    },
    caseStudies: {
      sectionTag: "Spatial Installations",
      headline: "Atmospheric spaces transformed through *sensory* craft.",
      description: "Selected architectural projects and retail installations designed by Alunara.",
      projects: [
        {
          title: "Kyoto Tea Pavilion",
          client: "Aman Kyoto",
          category: "Spatial Scent Architecture",
          year: "2026",
          metrics: { label: "Guest Satisfaction", value: "99.8%" },
          image: "/assets/nexus/work-vesper.svg",
          href: `${BASE}/projects/case-study`,
          featured: true,
        },
        {
          title: "Vesper Wellness Sanctuary",
          client: "Vesper Group",
          category: "Flagship Retail Atelier",
          year: "2026",
          metrics: { label: "Repeat Patrons", value: "84%" },
          image: "/assets/nexus/service-shopify.svg",
          href: `${BASE}/projects/case-study`,
        },
        {
          title: "Solis Thermal Baths",
          client: "Solis Spa & Resort",
          category: "Hydrotherapy Amenity Line",
          year: "2025",
          metrics: { label: "Units Crafted", value: "24,000" },
          image: "/assets/nexus/work-aura.svg",
          href: `${BASE}/projects/case-study`,
        },
        {
          title: "Aethel Ceramic Collection",
          client: "Aethel Atelier",
          category: "Limited Artisan Vessels",
          year: "2026",
          metrics: { label: "Sold Out in", value: "48 hrs" },
          image: "/assets/nexus/service-brand.svg",
          href: `${BASE}/projects/case-study`,
        },
      ],
    },
    process: {
      sectionTag: "Artisan Provenance",
      headline: "From organic soil harvest to bottled ritual in *five* steps.",
      description: "Slow-formulation practices respecting seasonal potency and botanical terroir.",
      baseTop: "6.5rem",
      offsetStep: "1.5rem",
      phases: [
        {
          phaseNumber: "01",
          title: "Harvest",
          subtitle: "Circadian Dawn Picking",
          description:
            "Flowers and herbs picked at morning twilight when terpene concentrations peak.",
          deliverables: ["Cold-chain transport", "Terpene verification"],
          timeline: "Seasonal",
        },
        {
          phaseNumber: "02",
          title: "Extract",
          subtitle: "Supercritical CO2 Distillation",
          description:
            "Low-temperature solventless extraction preserving delicate aromatic molecules.",
          deliverables: ["Solventless distillates", "Purity certificate"],
          timeline: "Week 2",
        },
        {
          phaseNumber: "03",
          title: "Blend",
          subtitle: "Chamber Maturation",
          description:
            "Aging botanical compounds in dark amber barrels to achieve harmonic aromatic depth.",
          deliverables: ["Small-batch blends", "Sensory tasting notes"],
          timeline: "Week 4",
        },
        {
          phaseNumber: "04",
          title: "Vessel",
          subtitle: "Fluted Hand-Finished Glass",
          description:
            "Bottled into UV-filtering Miron violet glass and hand-numbered with embossed foil.",
          deliverables: ["Numbered batch seals", "Miron violet glassware"],
          timeline: "Week 5",
        },
        {
          phaseNumber: "05",
          title: "Dispatch",
          subtitle: "Plastic-Free Global Delivery",
          description:
            "Shipped in recycled hemp fiber cushioning directly to private residences and hotels.",
          deliverables: ["Hemp packaging", "Ritual guidebook"],
          timeline: "Continuous",
        },
      ],
    },
    pricing: {
      sectionTag: "Sanctuary Memberships",
      headline: "Seasonal botanical allocations. Pause *anytime*.",
      description: "Reserved batches shipped at the turn of each equinox and solstice.",
      quarterlyDiscountPercent: 20,
      tiers: [
        {
          name: "Seasonal Ritual",
          tagline: "Essential quarterly allocation of circadian oils.",
          monthlyPrice: 65,
          quarterlyPrice: 52,
          features: [
            "Quarterly seasonal oil set",
            "Miron violet glassware",
            "Access to member salon",
            "Free carbon-neutral shipping",
          ],
          cta: { label: "Subscribe to Ritual", href: `${BASE}/pricing?tier=seasonal` },
        },
        {
          name: "Sanctuary Club",
          tagline: "Complete sensory curation for body and living space.",
          monthlyPrice: 145,
          quarterlyPrice: 116,
          isPopular: true,
          features: [
            "Body balms & spatial diffuser",
            "Hand-cast travertine scent stone",
            "Private formulator consultation",
            "First access to rare limited batches",
            "Complimentary travel minis",
          ],
          cta: { label: "Join Sanctuary Club", href: `${BASE}/pricing?tier=club` },
        },
        {
          name: "Atelier Bespoke",
          tagline: "Custom bespoke fragrance for residences or hospitality.",
          monthlyPrice: 320,
          quarterlyPrice: 256,
          features: [
            "Bespoke private formula",
            "Engraved stone & crystal vessels",
            "Dedicated sensory concierge",
            "Refill on-demand concierge",
            "Private studio invitation",
          ],
          cta: { label: "Commission Atelier", href: `${BASE}/contact?tier=atelier` },
        },
      ],
      guarantee: {
        title: "Sensory Satisfaction Guarantee",
        text: "Experience our formulations for 30 days. If the ritual does not bring deep calm, full complimentary refund.",
      },
    },
    faqTestimonials: {
      sectionTag: "Patron Voices",
      headline: "Cherished by founders, loved in *sanctuaries*.",
      description: "Common questions on ingredient sourcing, shelf-life and private orders.",
      testimonials: [
        {
          quote:
            "The Hinoki and Amber diffuser completely reshaped our evening wind-down. It feels like an authentic ryokan in Kyoto.",
          author: "Clara Dumas",
          title: "Architect & Spatial Designer",
          company: "Studio Dumas Paris",
          avatar: "preset:avatar-monogram?name=Clara+Dumas",
          rating: 5,
        },
        {
          quote:
            "Pure, clean and undeniably luxurious. The attention to the fluted glass and formulation is unmatched.",
          author: "Kenji Sato",
          title: "Creative Director",
          company: "Kyoto Pavilion",
          avatar: "preset:avatar-monogram?name=Kenji+Sato",
          rating: 5,
        },
        {
          quote:
            "We furnish our entire boutique hotel with Alunara. Guests consistently ask to purchase the scent upon checkout.",
          author: "Sophie Laurent",
          title: "Managing Director",
          company: "Château de Provence",
          avatar: "preset:avatar-monogram?name=Sophie+Laurent",
          rating: 5,
        },
      ],
      faq: [
        {
          question: "Are your ingredients 100% natural and cruelty-free?",
          answer:
            "Yes, every single botanical is certified organic, wild-harvested responsibly, and never tested on animals.",
        },
        {
          question: "How long do the spatial scent stones last?",
          answer:
            "Each stone diffuses fragrance for up to 3 months per refill application. Additional concentrated drops extend the longevity indefinitely.",
        },
        {
          question: "Do you ship internationally?",
          answer:
            "We ship carbon-neutral to over 60 countries with temperature-controlled fulfillment.",
        },
      ],
    },
    footer: {
      splitHeadline: "SANCTUARY AWAITS",
      primaryCta: { label: "Explore Collection", href: `${BASE}/services` },
      contactEmail: "concierge@alunara.com",
      officeLocation: "Kyoto · Grasse · Tokyo",
      sitemapColumns: [
        {
          title: "Atelier",
          links: [
            { label: "Philosophy", href: `${BASE}/about` },
            { label: "Formulations", href: `${BASE}/services` },
            { label: "Rituals", href: `${BASE}/projects` },
            { label: "Memberships", href: `${BASE}/pricing` },
          ],
        },
        {
          title: "House",
          links: [
            { label: "Journal", href: `${BASE}/blog` },
            { label: "FAQ", href: `${BASE}/faq` },
            { label: "Privacy", href: `${BASE}/privacy` },
            { label: "Terms", href: `${BASE}/terms` },
          ],
        },
      ],
      socialLinks: [
        { platform: "Instagram", href: "https://instagram.com" },
        { platform: "Pinterest", href: "https://pinterest.com" },
        { platform: "Vogue", href: "https://vogue.com" },
      ],
      copyrightText: "© 2026 Alunara Sanctuary Botanicals. All rights reserved.",
    },
    wellness: {
      heroSensory: {
        taglineBadge: { label: "Circadian Chronobiology Edition" },
        headline: {
          preText: "Botanical sanctuary and circadian harmony for the",
          highlightWord: "modern",
          postText: "soul.",
        },
        description:
          "Formulated with wild-harvested adaptogens, cold-pressed ceremonial botanicals, and hand-blown violet glass vessels designed to elevate daily ritual.",
        primaryCta: { label: "Explore The Regimen", href: "#regimen" },
        secondaryCta: { label: "Reserve Seasonal Harvest", href: `${BASE}/contact` },
        sensoryNote: "Top notes of Hinoki cedar, wild neroli blossom, and smoked vetiver earth.",
      },
      clinicalEfficacyStrip: {
        metrics: [
          {
            percentage: "94.2%",
            label: "Salivary Cortisol Reduction",
            clinicalTrialRef: "Double-blind 8-week circadian biomarker study (n=480)",
          },
          {
            percentage: "88.6%",
            label: "Deep REM Wave Acceleration",
            clinicalTrialRef: "Polysomnography verified sleep architecture improvement",
          },
          {
            percentage: "100%",
            label: "Biophotonic Violet Glass Storage",
            clinicalTrialRef: "Blocks destructive visible light spectra, preserves active terpenes",
          },
          {
            percentage: "0%",
            label: "Synthetic Additives or Emulsifiers",
            clinicalTrialRef: "Strict biodynamic and zero micro-plastic certification",
          },
        ],
      },
      circadianRegimen: {
        sectionTag: "THE CIRCADIAN REGIMEN",
        headline: "Three chronobiological rituals tuned to natural daylight rhythms.",
        description:
          "Your endocrine system follows the sun. Our three-phase regimen supports cortisol rise at dawn, sustained cognitive endurance at noon, and deep cellular repair at dusk.",
        phases: [
          {
            timeOfDay: "07:00 DAWN",
            formulaName: "Awakening Solar Elixir",
            botanicalHero: "Wild Golden Rhodiola & Fermented Yuzu",
            actionEffect:
              "Stimulates natural dopamine release and gently clears adenosine grogginess without adrenal burnout.",
            keyCompounds: [
              "Rosavin 3%",
              "Salidroside 1%",
              "Cold-Pressed Citrus Terpenes",
              "Bioactive Fulvic Acid",
            ],
          },
          {
            timeOfDay: "13:00 MIDDAY",
            formulaName: "Equilibrium Cognitive Adaptogen",
            botanicalHero: "Dual-Extracted Lion's Mane & Holy Basil (Tulsi)",
            actionEffect:
              "Prevents afternoon glycemic collapse and maintains calm, sustained neuro-focus under stressful meetings.",
            keyCompounds: [
              "Hericenones & Erinacines",
              "Eugenol",
              "Ursolic Acid",
              "L-Theanine Peptides",
            ],
          },
          {
            timeOfDay: "21:00 DUSK",
            formulaName: "Somnus Restorative Botanical Nectar",
            botanicalHero: "Wild-Harvested Ashwagandha Root & Blue Lotus",
            actionEffect:
              "Signals the pineal gland to synthesize natural melatonin and downregulates the sympathetic nervous system.",
            keyCompounds: [
              "Withanolides 10%",
              "Nuciferine",
              "Passionflower Flavonoids",
              "Chelated Magnesium Glycinate",
            ],
          },
        ],
      },
      sensoryVesselShowcase: {
        sectionTag: "THE ATELIER CRAFT",
        headline: "Hand-blown Miron violet glass engineered for energetic preservation.",
        description:
          "Sunlight decays botanical potency. Our patented biophotonic glassware filters out all decomposing visible light while permitting beneficial infrared and UVA wavelengths.",
        vessels: [
          {
            name: "L'Apothecary 100ml Dropper",
            purpose: "Dawn & Midday Sublingual Elixirs",
            material: "Swiss Biophotonic Violet Glass with Italian Marble Pipette",
            volume: "100 ml / 3.4 fl. oz",
          },
          {
            name: "Le Pommade 50ml Jar",
            purpose: "Overnight Ceramide Cellular Balm",
            material: "Heavyweight Double-Wall Violet Glass with Brushed Walnut Cap",
            volume: "50 ml / 1.7 oz",
          },
          {
            name: "Spatial Scent Monolith",
            purpose: "Passive Room Aromatherapy Diffusion",
            material: "Porous Volcanic Basalt from Mount Fuji with Brass Basin",
            volume: "Diameter 120 mm",
          },
        ],
      },
    },
  },
};
