---
name: blankui-testing-qa
description: Standards and tools for Quality Assurance, Unit Testing, and code consistency (linting/formatting) in the BlankUI project.
---

# BlankUI Testing & Quality Assurance

This skill defines the requirements for ensuring BlankUI is stable, reliable, and entirely production-ready. 

## 1. Unit Testing Strategy
All critical UI components must be tested for rendering stability and basic interactions.
- **Tools**: Use `Vitest` as the testing framework (due to its native integration with Vite workspaces) and `@testing-library/react` for DOM testing.
- **Scope**: You must test component rendering, ARIA attributes (accessibility), and event callbacks (like `onClick` or `onChange`).
- **File Naming**: Tests should be co-located with their components (e.g., `Button.test.tsx` next to `Button.tsx`).

## 2. Linting & Formatting
To keep the codebase uniform across multiple contributors and AI agents:
- **Linting Rule**: Follow strict TypeScript configuration (`tsc --noEmit` must always pass in the root repository).
- **Formatting**: Rely on Biome or Prettier for consistent code formatting (especially for ordering Tailwind classes).
- **No Console Logs**: Production-ready UI components should not contain active `console.log` statements.

## Workflow Rules
1. If tasked with adding a complex interactive component, remind the user to establish a `Vitest` testing baseline if one does not exist.
2. Before declaring a task "done", ensure that `pnpm run lint` or `tsc --noEmit` runs without errors across the workspace.
