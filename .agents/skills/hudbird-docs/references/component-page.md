# Component Documentation Page

Use this reference only when adding or substantially updating one component's documentation.

## Inspect

- Read the component implementation, local barrel, public export, and focused tests.
- Read one nearest Docs page with a similar API shape: primitive, compound component, layout, form control, or motion component.
- Derive examples and API rows from exported types and observable behavior. Do not copy a large unrelated page.

## Page contents

- `DocHeader` with a concrete one-sentence description.
- Installation/source view through the existing `InstallationTabs` pattern when comparable component pages use it.
- A minimal working preview that teaches the default behavior first.
- Additional examples only for meaningful variants, state, composition, accessibility, or responsive behavior.
- `ApiTable` rows for public props that users need to make decisions; group compound APIs clearly rather than producing an unreadable exhaustive table.
- `CodeBlock` snippets that compile against current public exports.

Use Hudbird controls for preview selectors. Prefer an existing Tabs or segmented-control pattern; do not introduce raw ad-hoc controls.

## Route registration

For a new page, update these together:

1. Lazy import and route in `apps/docs/src/App.tsx`.
2. Correct group and label in `apps/docs/src/navData.ts`.
3. Page TOC mapping in `apps/docs/src/tocData.ts` if the current Docs architecture uses it for that route.

Follow current route naming and ordering. Do not reorganize the sidebar while registering one component.

## Quality gate

- Preview and snippet show the same API.
- Interactive examples have names, keyboard operation, and useful focus state.
- Long code or tables do not overflow the document on mobile.
- Light and dark appearances use the component's real tokens.
- The page does not claim CLI availability unless the component is actually registered.
