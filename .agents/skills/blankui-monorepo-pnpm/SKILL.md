---
name: blankui-monorepo-pnpm
description: Enforces workspace management rules, peer dependency strictness, versioning, and publishing practices for the BlankUI PNPM monorepo.
---

# BlankUI Monorepo & PNPM Workspace Rules

This skill governs the dependency management and structural integrity of the BlankUI monorepo.

## 1. Peer Dependencies vs Dependencies
To keep the UI library "featherweight" and prevent bundle bloat, you must strictly categorize dependencies in UI packages (`packages/*`).
- **Peer Dependencies**: `react`, `react-dom`, and `tailwindcss` MUST be declared as `peerDependencies` in the package's `package.json`. Do not list them under standard `dependencies`.
- **Dependencies**: Utility libraries like `framer-motion`, `lucide-react`, `clsx`, `tailwind-merge`, and `class-variance-authority` should be standard `dependencies`.

## 2. Workspace Linking (`workspace:*`)
When an internal package requires another internal package, you must link them using the `workspace:*` syntax to ensure the monorepo always builds using the latest local code, not a published NPM version.
- Example: `"@hudbird/theme": "workspace:*"`

## 3. Versioning & Changesets
BlankUI relies on [Changesets](https://github.com/changesets/changesets) for managing version bumps and generating changelogs.
- Whenever making a structural change to a UI package that affects consumers, ensure you trigger or remind the user to run `npx changeset` to document the patch/minor/major bump.
- This ensures the `npm publish` workflow accurately synchronizes versions across the monorepo.

## 4. Avoiding Cross-Contamination
- Do not import code directly using relative paths that break package boundaries (e.g., `import X from "../../packages/core/src/..."`).
- Always import via the package name (e.g., `import { Button } from "@hudbird/ui"`).

## Workflow Rules
1. If you run `pnpm install`, ensure you check `package.json` to verify that React wasn't accidentally added as a direct dependency to a library package.
