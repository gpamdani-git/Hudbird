---
"hudbird-ui": minor
"@hudbird/ui": minor
"@hudbird/marketing": patch
"@hudbird/theme": patch
---

### Modern CLI & Developer Experience

- **Interactive Multi-select (`add`)**: Enhanced batch installation with interactive checklist, search filtering, and automatic dependency resolution.
- **Component Status Inspector (`list` / `ls`)**: Real-time project scanning detecting Installed, Missing, Outdated, and Modified components.
- **Unified Diff Engine (`diff`)**: Zero-dependency LCS diff comparing local components against the upstream registry with colorized additions and deletions.

### Component & UX Hardening

- **Form Component**: Added `noValidate` boundary isolation to ensure accessible form errors without HTML5 native tooltip conflicts or adjacent form cross-talk.
- **Input OTP**: Full keyboard navigation, auto-advance, numeric-only pattern enforcement, and backspace cursor recovery.
- **Command & Global Search**: Recursive JSX text node extraction allowing seamless search filtering through icons, badges, and nested spans.
- **Dropdown**: Refined chevron icon spacing and flex alignment across item variants.

### Design Token Sync & Export Studio

- **Tailwind v4 `@theme` Exporter**: One-click generation of native `@theme` directives with continuous OKLCH scales.
- **Figma Tokens Studio DTCG JSON**: Direct export and download of W3C DTCG-compliant `hudbird-tokens.json`.
- **Themes Quick Bar**: Live interactive palette, radius, and base color switcher with 100% two-way sync across canvas mockups.
- **Playwright E2E Test Suite**: Expanded comprehensive browser testing covering 29 end-to-end scenarios with 100% pass rate.
