---
name: blankui-technical-writing
description: Guidelines for generating and structuring documentation pages, previews, and interactive showcases within the apps/docs application.
---

# BlankUI Technical Writing & Documentation

This skill covers the creation of documentation pages for BlankUI within the `apps/docs` Vite application. High-quality documentation is critical for user adoption.

## 1. Documentation Layout Structure
When creating a new documentation page (e.g., `ButtonDoc.tsx`), it must adhere to the standard wide or narrow layout constraints depending on the content.
- Standard component docs should utilize the centered container layout.
- Use the sticky header with `lucide-react` icons (e.g., `Menu`, `ChevronRight`) for breadcrumbs.
- Title sections should clearly state the component name and include badges (e.g., `<span className="text-xs bg-emerald-500/10 text-emerald-600 rounded-full">New</span>`) if it's recently added.
- **Component API**: ALWAYS use the `<ApiTable>` component from `apps/docs/src/components/ApiTable` to document props. DO NOT use raw markdown tables or simple HTML tables. The `<ApiTable>` enforces the required `Prop | Type | Default | Description` column structure.

## 2. Interactive Previews
Documentation must prioritize "show, don't tell."
- Use the `ComponentPreview` component to render interactive demos of the UI packages.
- Ensure `demoUrl` paths match the routing configured in `App.tsx` (e.g., `/demos/button`).
- For full-page layouts or complex interactions, utilize `iframeMode="always"` within `ComponentPreview` to isolate the layout scope.

## 3. Code Snippets
- Display usage examples using the `<CodeBlock code={codeString} />` component.
- Code blocks must contain clean, heavily-commented React/TypeScript source code illustrating the exact code running in the `ComponentPreview`.

## 4. Routing Registration
- Whenever a new documentation page or demo route is added, you **MUST** register it in `apps/docs/src/App.tsx`.
- Use `React.lazy(() => import("./pages/..."))` to maintain fast initial loads for the SPA.
- If the page requires a wide layout, ensure the route satisfies the `isWideLayoutPage` logic in `App.tsx` (e.g., prefixing with `/layouts` or `/marketing`).

## Workflow Rules
1. Never write documentation without a working code preview.
2. Before declaring a documentation task complete, verify the route is accessible in `App.tsx` and the `TableOfContents` component reflects the new content.
