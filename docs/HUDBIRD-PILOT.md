# Branded website pilot

This pilot tests whether someone with little coding experience can use Codex to choose, brand, and revise a promotional website. It is an additive part of Hudbird, not a replacement for the existing Hero API or a certification of every template.

## Try it locally

Run `pnpm dev` and open `/#/marketing/hero-pilot`. If port 3000 is busy, use `pnpm exec vite --host 127.0.0.1 --port 3010 --strictPort`.

1. Choose a brand fixture or enter your name, logo URL/local asset path, and six-digit primary color. A reference URL is saved as brief metadata; the workbench does not scrape it.
2. Compare Story first and Product first. Open the full previews, then choose one. Preview links reflect the entered name, color, logo, and mode.
3. Swap the hero between centered image, split image, slideshow, video background, and interactive demo. Shared copy, actions, and the other sections remain in place.
4. Use the preview's mobile/tablet controls, inspect the source example, or download the brand/composition JSON.

Full-page examples: `/#/templates/startup-pilot?composition=story-first` and `/#/templates/startup-pilot?composition=product-first`. Add `&hero=video`, `&brand=studio-green`, or `&mode=dark` to inspect variants.

The fixture brands, interface illustrations, locally generated video, and product data are demo content. Replace the copy, logo, media, and action destinations before publishing. There are no fabricated customer testimonials or business metrics.

## Compose a real page

Public types come from `@hudbird/schemas`: `BrandProfile`, `HeroContent`, `HeroSectionConfig`, `PageComposition`, and `StartupPageContent`. `StartupPageContent` includes section headings as well as hero, benefits, demo, FAQ, CTA, and footer content. `HeroSectionConfig` requires media matching its variant. Content is not stored in the layout.

```tsx
import { StartupPage, pilotBrands, pilotCompositions, startupContent } from "@hudbird/marketing";
import "@hudbird/marketing/pilot.css";

export default function App() {
  return (
    <StartupPage
      brand={pilotBrands[0]}
      composition={pilotCompositions[0]}
      content={startupContent}
    />
  );
}
```

For source installations, import these exports from your installed StartupPilot folder instead. `BrandScope` and `HeroSection` are also independently available from the HeroSection folder. Scope standalone sections with `BrandScope`.

Core primitives are individual controls. Blocks group content such as ProductDemo. Sections are swappable page units such as HeroSection. StartupPage composes the section IDs in `PageComposition.sections`. Typography, density, radius, and explicit light/dark mode come from the brand scope. A readable black or white accent foreground is chosen automatically.

The interactive hero and workspace demo use local state. They do not provide backend, authentication, or a connected AI service. Slideshow is manual. Video begins paused, has a poster, supports play/pause, and falls back to its cover after failure. Reduced motion disables incidental transitions.

### Website theme, fonts, and component provenance

The workbench follows the website's current light/dark theme by default, including changes made while the page is open. Light preview and Dark preview are explicit overrides; Follow website restores synchronization. Switching brand presets preserves this choice. Standalone preview links carry the chosen mode, and links without an explicit mode follow their document theme.

The Brand font selector reuses the existing Hudbird typography catalog and the core `Select`/`SelectItem` components. Selected Google Fonts are saved as optional `BrandProfile.googleFont` metadata alongside the CSS fallback stack in `fontFamily`. BrandScope loads that family once per document using the Google Fonts CSS API with `display=swap`, including iframe previews and installed source. Local fonts do not trigger a remote request.

| Block responsibility    | Existing Hudbird core components  |
| ----------------------- | --------------------------------- |
| Page and section layout | Section, Container, Grid          |
| Product demo surface    | Card, CardHeader, CardBody        |
| Interactive demo views  | Tabs, TabList, Tab, TabPanel      |
| Actions and typography  | Button, Heading, Text             |
| Questions               | Accordion, AccordionItem          |
| Brand controls in docs  | Input, Select, SelectItem, Button |

HeroSection, ProductDemo, and StartupPage are new compositions of these core components. They do not replace them with standalone UI primitives. Native elements remain for semantic wrappers, links, lists, images, and video. `tests/pilot-core.test.ts` guards the core imports and rejects raw button/input/select/section replacements or hand-built column layouts in these blocks.

Theme boundaries prevent dark ancestor styles from leaking into an explicitly light block. Consumer projects using a class-based Tailwind dark variant should honor `[data-hb-theme="light"]` boundaries, as the Hudbird docs and source-install fixture do.

Additional regression check: `node scripts/verify-pilot-theme.mjs` verifies website theme synchronization, opposite-mode card colors, preset changes, Google Font loading, preview/export retention, and mobile layout.

## Install from source

The repository's registry now contains `StartupPilot`, `HeroSection`, and `CompositionSchema`. Installing StartupPilot also installs its core dependency closure, CSS, demo media, and `.agents/skills/hudbird-startup-pilot/SKILL.md`. Existing skill files are preserved unless overwrite is requested. The CLI registers the theme CSS in the configured Tailwind stylesheet when present.

The updated CLI has not been published to npm. Verify the local package with:

```sh
node scripts/verify-pilot-install.mjs
```

This builds the registry, packs the CLI, extracts the packed artifact into a separate temporary React/Vite/Tailwind v4 project, installs the pilot source using that CLI, and typechecks/builds the consumer. Existing npm dependencies are reused through a node_modules symlink; this does not validate a clean network dependency download.

After release, use `npx hudbird-ui add StartupPilot`. Respect your project's `components.json` aliases. The default import location is `@/components/hudbird-ui/StartupPilot`. Tailwind must scan the installed source. Package consumers must import the pilot stylesheet explicitly; source consumers receive it through BrandScope, and the CLI additionally registers the theme utilities.

The agent workflow is in `public/skills/startup-pilot.md` and the project skill `hudbird-startup-pilot`. It guides interview → two branded previews → user selection → assembly → visual review → touch ups. Pricing and publishing are separate from this workflow.

## Verification recorded on 2026-11-04

- Unit suite: 64 files, 229 tests passed. Added cases cover hero swaps, section order, media failures, slideshow, demo tabs, accent foregrounds, input labels, and registry completeness.
- Browser matrix: 80 combinations covering five heroes, two brands, two modes, and 375/768/1024/1440 px widths. Checks cover document/control overflow and retained brand tokens.
- Browser interactions: manual slideshow, keyboard tabs, FAQ, paused-by-default video with play/pause, page-local navigation, brand inputs, composition choice, and export link.
- Separate installed consumer: all five heroes checked at mobile and desktop widths, including computed brand colors and demo tabs.
- Marketing/schema package type checks and builds passed. Documentation production build passed, with existing large-chunk warnings.
- Full documentation/root type checks still report errors in older pages, including stale AiStartupTemplate exports and other existing prop/type mismatches. These checks are not claimed as passing. New pilot source and standalone consumer type checks pass.

Reproduce browser checks with the local docs server running:

```sh
node scripts/verify-startup-pilot.mjs
node scripts/verify-pilot-install.mjs --browser
```

Chromium and local servers may require sandbox approval. Screenshots and machine-readable results are written to `output/playwright/startup-pilot/`. Automated checks do not establish user satisfaction, comprehensive accessibility conformance, or willingness to pay.

## Owner trial: pending

Use Codex and your own logo, color, and reference. Request a page, compare the two proposals, choose one, then ask for a slideshow, video, and interactive hero without manually editing source.

Record:

- Which setup or choice needed an extra explanation?
- Did the brand and copy survive each requested hero swap?
- Which desktop/mobile details still felt cluttered or unprofessional?
- Could you complete the requested changes without touching source manually?

Human usability feedback and purchase validation remain pending. Next stages are additional branded compositions and, after this workflow is validated, chatbot/dashboard UI ready for integration.

### Owner feedback addressed

The owner reported dark card styling leaking into a light preview inside the dark documentation website, requested automatic theme synchronization, and requested Google Font selection. These are addressed and covered by theme/font browser regression checks. The complete guided Codex usability trial remains pending.

### Theme-aware preview artwork

`HeroImage.darkSrc` optionally supplies a dark asset. HeroImageView selects it from the enclosing BrandScope mode for centered, split, and slideshow heroes; video uses it for the poster as well. Bundled SVG product previews include both palettes. Images without darkSrc retain their original source in either mode; customer photography is not inverted or recolored. Verify with `node scripts/verify-pilot-artwork.mjs`.
