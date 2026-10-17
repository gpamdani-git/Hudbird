# Workflow SOP: Generating a New Niche Demo with 24 Standard Inner Pages

> **Objective:** Rapidly spin up a complete, production-grade Niche Demo (e.g. AI SaaS, Fintech, Cybersecurity, Hospitality, E-Commerce) featuring a customized Homepage and 24 fully populated Inner Pages using the Hudbird Nexus Multiplier Engine.

---

## Step 1: Niche Configuration & Theme Tokens

1. Create a new configuration file under `packages/schemas/src/niches/[nicheId].config.ts`:
   ```ts
   import { NicheConfig } from "../types";

   export const aiStartupConfig: NicheConfig = {
     id: "ai-startup",
     name: "Synthetix AI",
     tagline: "Autonomous Agent Orchestration Engine",
     category: "AI & Machine Learning",
     theme: {
       brandPrimary: "#794A8B",
       brandAccent: "#c78ee0",
       fontDisplay: "var(--font-space-grotesk)",
       fontSans: "var(--font-plus-jakarta)",
       fontMono: "var(--font-jetbrains-mono)",
       mode: "dark-default", // "light-default" | "dark-default"
     },
     navigation: {
       links: [ ... ],
       cta: { label: "Launch Console", href: "/demos/ai-startup/portal" }
     }
   };
   ```

---

## Step 2: Content Schema Population

Populate the niche-specific data models conforming to `@hudbird/schemas`:
1. **Hero & Value Prop:** Headline with italic accent, subtitle, primary/secondary CTAs, proof metrics.
2. **Services / Capabilities (4–6 items):** Technical titles, scopes of work, deliverable checklists.
3. **Projects / Case Studies (4–6 items):** Authentic industry scenarios, real quantitative metrics (`+240% throughput`, `<5ms inference`).
4. **Process Stages (5 phases):** Sequential workflow from onboarding to deployment.
5. **Pricing Tiers (3 tiers):** Starter, Professional, and Enterprise with monthly/quarterly switchers.
6. **FAQ List (6–8 items):** Industry-relevant technical questions and answers.

---

## Step 3: Route Composition in `apps/nexus`

Leverage the dynamic Next.js App Router route structure:

1. **Homepage:**
   `apps/nexus/src/app/demos/[niche]/page.tsx`
   Automatically pulls `nicheConfig` and renders the ordered section stack:
   - `<MegaNavbar config={nicheConfig} />`
   - `<HeroSection data={nicheConfig.hero} />`
   - `<InteractiveServicesRow data={nicheConfig.services} />`
   - `<CaseStudiesGrid data={nicheConfig.projects} />`
   - `<StickyStackingProcess data={nicheConfig.process} />`
   - `<PricingMatrix data={nicheConfig.pricing} />`
   - `<TestimonialsWall data={nicheConfig.testimonials} />`
   - `<FaqAccordion data={nicheConfig.faq} />`
   - `<KineticFooter data={nicheConfig.footer} />`

2. **24 Standard Inner Pages:**
   Under `apps/nexus/src/app/demos/[niche]/(inner)/`:
   - `about/page.tsx`
   - `services/page.tsx` & `services/[slug]/page.tsx`
   - `projects/page.tsx` & `projects/[slug]/page.tsx`
   - `process/page.tsx`
   - `pricing/page.tsx`
   - `team/page.tsx` & `team/[slug]/page.tsx`
   - `careers/page.tsx` & `careers/[slug]/page.tsx`
   - `blog/page.tsx` & `blog/[slug]/page.tsx`
   - `contact/page.tsx`
   - `book/page.tsx`
   - `testimonials/page.tsx`
   - `faq/page.tsx`
   - `integrations/page.tsx`
   - `changelog/page.tsx`
   - `portal/page.tsx`
   - `privacy/page.tsx`
   - `terms/page.tsx`
   - `404/page.tsx`
   - `coming-soon/page.tsx`

---

## Step 4: Register in Master Showcase `#demos` Grid

1. Add the new niche entry into `packages/schemas/src/showcase/demosRegistry.ts`:
   ```ts
   {
     id: "ai-startup",
     title: "Synthetix — Autonomous AI Platform",
     category: "AI & SaaS",
     thumbnail: "/thumbnails/demos/ai-startup.webp",
     pagesCount: 25,
     badges: ["Next.js 15", "Dark-First", "React 19"],
     demoUrlLight: "/demos/ai-startup?theme=light",
     demoUrlDark: "/demos/ai-startup?theme=dark",
   }
   ```
2. The Master Showcase `#demos` grid will automatically render the new card with filter tags and dual hover buttons (`Light Mode Demo` & `Dark Mode Demo`).
