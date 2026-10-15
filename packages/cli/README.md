# hudbird-ui

> The official CLI for initializing, scaffolding, listing, and diffing components in Hudbird UI.

Hudbird UI is a modern, accessible React UI component library built with Tailwind CSS, CVA, and Framer Motion. This CLI tool helps you set up your project, customize paths with `components.json`, and manage components with zero friction.

## 🚀 Quick Start

Run directly via `npx` (no global installation required):

```bash
npx hudbird-ui@latest init
```

## 🛠 Commands

### `init`

Initializes Hudbird UI in your current React + Tailwind project (Tailwind v3 or v4):

- Generates `components.json` with your custom path aliases (`@/components/hudbird-ui`, etc.)
- Injects Tailwind directives or `@theme` CSS variables
- Installs base dependencies (`framer-motion`, `lucide-react`, `clsx`, `tailwind-merge`, `class-variance-authority`)
- Scaffolds `utils/cn.ts`

```bash
npx hudbird-ui init
```

### `add [components...]`

Installs one or more components directly into your codebase with automatic dependency resolution:

```bash
# Interactive selection (fuzzy multi-select)
npx hudbird-ui add

# Single component
npx hudbird-ui add Button

# Multiple components
npx hudbird-ui add Button Card Dialog Form InputOTP

# Install all available components
npx hudbird-ui add --all

# Skip overwrite confirmation prompts
npx hudbird-ui add Button --overwrite
```

### `list` (or `ls`)

Displays all 62 official components categorized by domain (Primitives, Forms, Navigation, Feedback, Charts, Marketing) along with your project's local installation status:

```bash
npx hudbird-ui list
```

### `diff [component]`

Compares your local installed component files against upstream registry releases using an interactive colored unified diff:

```bash
# Check single component for updates or local changes
npx hudbird-ui diff Button

# Scan all installed components in your project
npx hudbird-ui diff
```

## ⚙️ Configuration (`components.json`)

Customize your project structure by editing `components.json`:

```json
{
  "$schema": "https://hudbird.vercel.app/schema.json",
  "style": "default",
  "tailwind": {
    "version": 4,
    "css": "src/index.css",
    "baseColor": "zinc",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components/hudbird-ui",
    "utils": "@/components/hudbird-ui/utils"
  }
}
```

## 📖 Documentation

For live component previews, interactive playbooks, and API documentation:

👉 **[https://hudbird.vercel.app](https://hudbird.vercel.app)**

## 📄 License

MIT © Dani Akbar
