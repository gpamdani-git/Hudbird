# Hudbird Architecture Map

Use this map to locate code without scanning the whole monorepo.

## Packages

| Area               | Location                                 | Responsibility                                                                                |
| ------------------ | ---------------------------------------- | --------------------------------------------------------------------------------------------- |
| Core UI            | `packages/core/src/components`           | Controls, typography, surfaces, charts, `Section`, `Container`, `Grid`, and Motion primitives |
| Core exports       | `packages/core/src/index.ts`             | Public `@hudbird/ui` API                                                                      |
| Marketing          | `packages/marketing/src/components`      | Reusable blocks, sections, SaaS collection, pilot, and page compositions                      |
| Marketing exports  | `packages/marketing/src/index.ts`        | Public `@hudbird/marketing` API                                                               |
| Schemas            | `packages/schemas/src/composition.ts`    | Brand, hero, page composition, landing configuration, section content and variants            |
| Schema exports     | `packages/schemas/src/index.ts`          | Public `@hudbird/schemas` API                                                                 |
| Theme              | `packages/theme/src`                     | Shared theme package                                                                          |
| CLI                | `packages/cli/bin/index.js`              | `hudbird-ui` command behavior                                                                 |
| Registry generator | `packages/cli/scripts/build-registry.js` | Builds installable component registry                                                         |
| Registry artifact  | `packages/cli/templates/registry.json`   | Generated CLI registry; do not hand-edit when generator is authoritative                      |
| Docs app           | `apps/docs/src`                          | Vite documentation, previews, builder, and homepage                                           |
| Global CSS/tokens  | `src/index.css`                          | Tailwind v4 CSS-first tokens used by root Vite app                                            |

## Docs routing

New documentation pages normally require coordinated entries in:

- `apps/docs/src/App.tsx`
- `apps/docs/src/navData.ts`
- `apps/docs/src/tocData.ts`

Use existing documentation primitives (`DocHeader`, `ComponentPreview`, `ApiTable`, `CodeBlock`) instead of inventing a parallel docs layout.

## Landing system

- Hero variants: `packages/marketing/src/components/HeroSection`
- Shared landing composition: `packages/marketing/src/components/LandingShared`
- Full SaaS page: `packages/marketing/src/components/LandingPage`
- Public mini builder: `packages/marketing/src/components/LandingBuilderShowcase`
- Full docs builder: `apps/docs/src/pages/marketing/LandingBuilderDoc.tsx`
- Homepage: `apps/docs/src/pages/LandingPage.tsx`
- Homepage data: `apps/docs/src/data/hudbirdHomepage.ts`
- Legacy template retained separately: `apps/docs/src/app/landingpage`
- Configuration model: `packages/schemas/src/composition.ts`

## Targeted verification

Run only checks related to the edited area during normal iterations.

| Change              | First check                                                                   |
| ------------------- | ----------------------------------------------------------------------------- |
| Core component      | `pnpm --filter @hudbird/ui lint` and its focused Vitest file                  |
| Marketing component | `pnpm --filter @hudbird/marketing lint` and its focused Vitest file           |
| Schema              | `pnpm --filter @hudbird/schemas lint`                                         |
| Docs-only UI        | `pnpm --filter docs build`                                                    |
| Registry mapping    | `node packages/cli/scripts/build-registry.js` plus the relevant registry test |
| Landing collection  | Relevant `scripts/verify-landing-*.mjs` only when explicitly finalizing       |
| Startup pilot       | Relevant `scripts/verify-*-pilot*.mjs` only when explicitly finalizing        |

Repository-wide build, full Vitest, Playwright matrices, packed consumer installs, screenshots, and exhaustive theme/breakpoint checks belong to a finalization task.

## Graphify routing

`graphify-out/graph.json` is a generated 9.5 MB relationship graph with roughly 7,560 nodes and 21,514 links as of 2026-11-03. Use it only when a task asks about dependency paths, call relationships, ownership, or impact analysis that targeted search cannot answer. It is an index, not a product source of truth, and should not be loaded wholesale into context.

## Safe search order

1. Read `docs/PROJECT_CONTEXT.md`.
2. Read this file's relevant section.
3. Search the named package or component directory with `rg`.
4. Inspect direct imports, exports, tests, and registry entries.
5. Consult Graphify or broad repository search only if the dependency boundary is still unclear.
