# 🦅 Hudbird UI Pro — Complete Monorepo Ecosystem

> **The modern, motion-first React & Tailwind component ecosystem.**  
> Complete with 70+ UI primitives, 47+ Nexus niche templates, marketing blocks, CLI generator, and interactive documentation.

Welcome to the **Hudbird UI Pro Monorepo** (v1.5.0). This package contains the entire production source code, tooling, and templates powering the Hudbird ecosystem.

---

## 📂 Monorepo Architecture Overview

This repository is organized as a high-performance **PNPM & Turborepo workspace**:

```text
Hudbird (Root)
├── apps/
│   └── docs/                     # Full Documentation SPA & Interactive Component Playground (Vite + React)
├── packages/
│   ├── core/                     # @hudbird/ui: 70+ Featherweight UI Primitives (CVA + Framer Motion)
│   ├── marketing/                # @hudbird/marketing: High-conversion hero, bento, testimonials, & section blocks
│   ├── theme/                    # @hudbird/theme: Color tokens, CSS variables, & dynamic palette generators
│   ├── schemas/                  # @hudbird/schemas: Type definitions & data schemas for all 47 Nexus templates
│   └── cli/                      # hudbird-ui: Modern interactive CLI for scaffolding components & templates
├── starter-kits/
│   └── pro-templates/            # Production Nexus showcase featuring 47 niche demos & complete inner pages
├── .agents/                      # AI design skills, craft workflows, and prompt engineering rules
├── pnpm-workspace.yaml           # Multi-package linking config
└── turbo.json                    # Turborepo build & caching pipelines
```

---

## ⚡ Prerequisites

Before running the monorepo, ensure you have the following installed on your machine:

1. **Node.js**: `v20.x` or higher (LTS recommended)
   ```bash
   node -v
   ```
2. **PNPM**: `v9.x` or higher (Required for workspace resolution)
   If you don't have PNPM installed yet, enable it instantly with Corepack or NPM:
   ```bash
   corepack enable pnpm
   # or: npm install -g pnpm
   ```

---

## 🚀 Quick Start (Up & Running in 60 Seconds)

### Step 1: Install Dependencies

From the monorepo root directory, install all workspace packages with frozen lockfile support:

```bash
pnpm install
```

### Step 2: Build All Core Packages

Build internal packages (`@hudbird/ui`, `@hudbird/marketing`, `@hudbird/schemas`, `@hudbird/theme`, `cli`):

```bash
pnpm build:packages
```

_(Tip: You can also run `pnpm build` to build all packages and applications simultaneously)._

### Step 3: Launch Local Development Servers

You can run either the documentation portal or the Nexus templates showcase (or both simultaneously):

#### Option A: Run the Documentation & Component Playground (Port 3000)

```bash
pnpm dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser to view:

- Interactive component showcases & copy-paste code snippets
- Live color theme customizer
- Full documentation for all UI primitives and marketing sections

#### Option B: Run the Nexus Pro Templates Showcase (Port 5173)

```bash
pnpm dev:starter
```

Open **[http://localhost:5173](http://localhost:5173)** in your browser to explore:

- **47 Prebuilt Niche Demos**: AI Copilot, Cyber Shield, Fintech Protocol, Digital Agency, Alunara Wellness, SaaS, Hospitality, E-Commerce, etc.
- **14 Inner Pages**: Case Studies, Blog & Post Detail, Careers, Pricing Matrix, Client Workspace, Sprint Estimator, Legal, Auth, etc.
- **Live Viewport Switcher**: Desktop, Tablet, and Mobile simulation toolbar.

---

## 📦 Workspace Packages Breakdown

### 1. `@hudbird/ui` (`packages/core`)

Featherweight, accessible primitives with zero runtime fluff.

- **Components included**: Accordion, Alert, Avatar, Badge, Button, Calendar, Card, Checkbox, ComboBox, Command, Dialog, DoubleBezelCard, Dropdown, EditorialImage, Fieldset, Form, Heading, IconBox, Input, InputOTP, KineticButton, Navbar, Pagination, Popover, Progress, RadioGroup, Select, Sheet, Sidebar, Slider, Slot, SplitTextReveal, StickyStack, Switch, Table, Tabs, Text, Textarea, Toast, Tooltip, and more.
- **Usage**:
  ```tsx
  import { Button, DoubleBezelCard, KineticButton } from "@hudbird/ui";
  ```

### 2. `@hudbird/marketing` (`packages/marketing`)

Aesthetic marketing blocks with fluid Framer Motion micro-interactions.

- **Sections included**: HeroGlass, BentoGrid, TestimonialsMasonry, TestimonialsGlobe, PricingMatrix, FaqWithIllustration, LogoCloudMarquee, ParticleSphere, CtaCentered, FooterMega, HospitalityHighlights, and 7 vertical industry bundles.
- **Usage**:
  ```tsx
  import { SaaSHero, SaaSBentoGrid, SaaSPricing } from "@hudbird/marketing/saas";
  ```

### 3. `@hudbird/schemas` (`packages/schemas`)

Complete TypeScript models, metadata, and section content schemas for all 47 templates and inner pages.

- **Usage**:
  ```tsx
  import { PREBUILT_47_TEMPLATES, INNER_PAGES_MATRIX, type NicheConfig } from "@hudbird/schemas";
  ```

### 4. `@hudbird/theme` (`packages/theme`)

Tailwind CSS variable design tokens supporting seamless Light Mode, Sleek Dark Mode, and bespoke multi-palette branding.

### 5. `hudbird-ui` (`packages/cli`)

Interactive CLI tool designed to scaffold individual components or entire starter templates into new projects.

---

## 🛠 How to Extract a Template to an External Project

If you want to extract a specific template or components into your own standalone Next.js or Vite project:

1. **Copy the Component / Page files**:
   Copy the desired files from `starter-kits/pro-templates/src/components/nexus-sections/` or `packages/core/src/components/` into your target project's `src/components/` folder.
2. **Install Peer Dependencies**:
   Ensure your target project has the following standard dependencies:
   ```bash
   pnpm add framer-motion lucide-react clsx tailwind-merge class-variance-authority
   ```
3. **Copy the `cn` utility**:
   Ensure you have a standard Tailwind class merger in `src/lib/cn.ts`:
   ```ts
   import { clsx, type ClassValue } from "clsx";
   import { twMerge } from "tailwind-merge";
   export function cn(...inputs: ClassValue[]) {
     return twMerge(clsx(inputs));
   }
   ```

---

## 📜 Monorepo Scripts Reference

All top-level commands you can run from the root:

| Command               | Description                                                  |
| :-------------------- | :----------------------------------------------------------- |
| `pnpm install`        | Install all dependencies across all packages and apps        |
| `pnpm build`          | Turbo build: builds all packages, apps, and starter kits     |
| `pnpm build:packages` | Fast build: compiles all 5 packages in `packages/*`          |
| `pnpm dev`            | Starts the `apps/docs` documentation server (Port 3000)      |
| `pnpm dev:starter`    | Starts the `starter-kits/pro-templates` showcase (Port 5173) |
| `pnpm test`           | Runs the Vitest test suite                                   |
| `pnpm lint`           | Runs ESLint across the entire monorepo                       |
| `pnpm format:fix`     | Runs Prettier to auto-format all code                        |
| `pnpm sync:starter`   | Synchronizes latest core UI components into the starter kit  |
| `pnpm pack:monorepo`  | Bundles this entire monorepo into a clean distribution ZIP   |

---

## 🤖 AI Agent Skills (Claude Code, Codex, Antigravity, Cursor, Windsurf)

Hudbird UI includes an official AI engineering skill that enables coding models to build interfaces without hallucinating non-existent props or CSS soup:

```bash
# Install the AI skill into any project in 1 line
mkdir -p .agents/skills/hudbird-ui && curl -sSL https://hudbird.vercel.app/skills/hudbird-ui.md -o .agents/skills/hudbird-ui/SKILL.md
```

- **Supported assistants**: Anthropic Claude Code, Google Antigravity, Cursor IDE, Windsurf Cascade, and OpenAI Codex.
- **Official Documentation**: [https://hudbird.vercel.app/#/ai-skills](https://hudbird.vercel.app/#/ai-skills)

---

## 📄 License & Commercial Rights

This product is licensed under the **Hudbird UI Pro Commercial License** (`LICENSE.md`).

- ✅ **Allowed**: Unlimited commercial websites, SaaS apps, internal tools, and client deliverables.
- ❌ **Prohibited**: Reselling, public re-distribution, or sharing raw monorepo source code as a competing template/library product.

---

## 💬 Community, Support & Links

- **Documentation**: [https://hudbird.vercel.app](https://hudbird.vercel.app)
- **GitHub Repository**: [https://github.com/gpamdani-git/Hudbird](https://github.com/gpamdani-git/Hudbird)
- **Report an Issue**: [https://github.com/gpamdani-git/Hudbird/issues](https://github.com/gpamdani-git/Hudbird/issues)
- **Discussions**: [https://github.com/gpamdani-git/Hudbird/discussions](https://github.com/gpamdani-git/Hudbird/discussions)
- **Direct Inquiries**: `support@hudbird.studio` / `daniakbar`
- **Updates**: Check your Gumroad library for notification on new template additions and version updates.
