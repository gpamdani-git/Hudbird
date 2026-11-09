---
name: hudbird-docs
description: Create a focused documentation page for one Hudbird component or repair one issue in the `apps/docs` application. Use for previews, API documentation, examples, navigation registration, broken Docs routes, imports, assets, or rendering; do not use to implement the library component itself.
---

# Hudbird Docs

Document what the current public API actually does, or repair the smallest Docs boundary that is broken. Do not redesign unrelated pages.

## Choose one mode

- **Document component:** add or substantially update documentation for one existing public component. Read [references/component-page.md](references/component-page.md).
- **Repair Docs:** diagnose and fix one reported Docs error or regression. Read [references/repair.md](references/repair.md).

Do not load both references unless the request genuinely includes both outcomes.

## Cheap context

1. Read `docs/PROJECT_CONTEXT.md` and only the Docs section of `docs/ARCHITECTURE_MAP.md`.
2. Inspect the target component's public types and the single nearest Docs analogue.
3. For repairs, begin with the error, target file, and its direct imports or route entry.
4. Do not read the full component catalog, `DESIGN.md`, PRD, BRD, ERD, Graphify, or all routing files by default.

## Shared contract

- `apps/docs` demonstrates Hudbird; documentation UI should use `@hudbird/ui` primitives and existing Docs helpers.
- Code examples must be valid, concise, copyable, and consistent with current exports. Do not document aspirational or removed props.
- Use `DocHeader`, `ComponentPreview`, `CodeBlock`, `ApiTable`, and `InstallationTabs` where their established purpose applies.
- Keep prose direct. Explain behavior and decisions rather than adding marketing claims, psychology jargon, or invented metrics.
- Use realistic neutral example content. Label sample data; never invent customers, testimonials, or adoption claims.
- Preserve light/dark behavior, keyboard access, visible focus, mobile layout, and reduced motion.
- Avoid nested cards, repeated equal preview tiles, excessive glass, generic glow, decorative motion, and duplicate examples that teach the same API.
- Preserve existing routes, navigation hierarchy, and component APIs unless the requested repair requires a compatible correction.

## Iteration boundary

A normal iteration covers one Docs page or one reported defect plus `pnpm --filter docs build`. Add a focused test only when behavior or a regression is meaningfully testable.

Core implementation, marketing implementation, registry CLI, screenshots, full visual matrices, repository-wide tests, and content rewrites outside the target are separate slices. If the source component is broken, report that boundary instead of silently redesigning it from Docs.

## Handoff

Report the visible result, files changed, focused verification, and one optional next slice. Stop after the requested documentation outcome works.
