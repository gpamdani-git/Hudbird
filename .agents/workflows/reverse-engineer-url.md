# Workflow SOP: Reverse-Engineering a Benchmark URL into Hudbird Nexus Sections & Schemas

> **Objective:** Systematically decompose an award-winning benchmark URL (e.g. Nexsas, Awwwards, UI8 top sellers) and transform its visual design and functional interaction patterns into reusable components in `packages/sections` and strongly typed data models in `packages/schemas`.

---

## Phase 1: Reconnaissance & Layout Tree Extraction

1. **DOM & Viewport Audit:**
   - Inspect the target page at desktop (`1440px`), laptop (`1024px`), tablet (`768px`), and mobile (`375px`).
   - Identify the section hierarchy from top to bottom (Announcement Bar, Mega Navbar, Hero, Social Proof, Interactive Row, Case Studies, Stacking Timeline, Pricing Matrix, FAQ, Kinetic Footer).
2. **Spacing & Grid Metrics:**
   - Note container max-width (e.g. `max-w-7xl` vs `max-w-6xl`).
   - Extract vertical padding rhythm (e.g. `py-20 sm:py-32`).
   - Record corner radii (`rounded-[28px]`, `rounded-[22px]`, `rounded-full`).
3. **Color & Theme Variable Mapping:**
   - Map background base, surface, border, and brand accent colors for both Light and Dark mode.
   - Register them in `packages/theme/src/tokens/`.

---

## Phase 2: Micro-Interaction & Animation Profiling

1. **Scroll-Driven Behaviors:**
   - Does the page feature sticky card stacking (`position: sticky` with dynamic scale/blur)?
   - Are there horizontal scroll tracks or marquee ribbons?
2. **Hover State Choreography:**
   - Inspect hover transformations on buttons, cards, and interactive rows.
   - Verify transition timings and curve (`duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]`).
3. **Typography Dynamics:**
   - Identify headline font family, letter spacing (`tracking-[-0.035em]`), line height (`leading-[1.03]`), and italic serif accent pairings.

---

## Phase 3: Schema Design (`packages/schemas`)

1. Define a TypeScript interface and Zod schema for the section's data contract.
2. Ensure data is decoupled from hardcoded JSX strings:
   ```ts
   // Example in packages/schemas/src/sections/servicesRow.ts
   export interface ServiceItemSchema {
     id: string;
     index: string; // "01"
     title: string;
     category: string;
     description: string;
     deliverables: string[];
     previewImage: string;
     metrics?: { label: string; value: string };
     href: string;
   }
   ```
3. Export from `packages/schemas/src/index.ts`.

---

## Phase 4: Section Component Implementation (`packages/sections`)

1. Create the component directory under `packages/sections/src/[Category]/`.
2. Follow the Anti-AI UI Craft rules:
   - Use `<DoubleBezelCard />` for all containers.
   - Enclose icons in `<IconBox />`.
   - Use `<KineticButton />` for CTAs.
   - Apply corner crosshairs (`<CornerCrosshair />`) at architectural grid points.
3. Support controlled and uncontrolled states (e.g., active accordion index, selected pricing billing cycle).
4. Export the clean section component from `packages/sections/src/index.ts`.

---

## Phase 5: Verification & Anti-Slop Audit

- [ ] Does it work flawlessly in **Light Mode** and **Dark Mode** without hardcoded color flashes?
- [ ] Are all font tokens mapped to `--font-sans`, `--font-display`, and `--font-mono`?
- [ ] Is keyboard accessibility (Tab, Enter, Escape) intact on all interactive elements?
- [ ] Are mobile viewports clean with zero horizontal overflow?
