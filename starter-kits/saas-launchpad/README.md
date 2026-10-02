# 🚀 SaaS Launchpad Starter Kit

Welcome to the **SaaS Launchpad Starter Kit** — a premium, production-ready frontend template for your next big SaaS, Agency, or AI startup. Built with React, Vite, and Tailwind CSS v4.

## 🌟 Features

- **Marketing Landing Page**: High-converting sections (Hero, Features, Bento Grid, Testimonials, Pricing, FAQ).
- **Authentication Pages**: Beautiful Login and Register screens.
- **Admin Dashboard**: Internal layout and dashboard page with charts and tables.
- **Dark/Light Mode**: Full CSS variable-based theming support.
- **Component Library**: Includes our beautiful, accessible base UI components.
- **React Router**: Pre-configured routing structure.
- **Tailwind v4**: Next-gen utility styling engine.

## 📦 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **Open in browser**
   Visit `http://localhost:5173` to view the app.

## 📁 Project Structure

- `src/components/ui`: Base reusable UI components (Buttons, Inputs, Cards, etc.)
- `src/components/marketing`: Blocks for the landing page.
- `src/components/admin`: Blocks for the dashboard.
- `src/layouts`: Layout wrappers (e.g., `DashboardLayout`).
- `src/pages`: Individual page views (`Home`, `Login`, `Register`, `Dashboard`).
- `src/App.tsx`: The main router configuration.

## 🎨 Customizing the Theme

This starter kit uses **Tailwind CSS v4** with CSS variables for theming.
To change the primary brand color, open `src/index.css` and modify the variables in the `@layer base` block:

```css
@layer base {
  :root {
    /* Change this to your brand color RGB values */
    --primary-indigo: 79 70 229;
    --accent: #aa3bff;
  }
}
```

## 🚀 Deployment

This is a standard Vite React application. You can deploy it easily to Vercel, Netlify, or Cloudflare Pages.

**Vercel:**
1. Push your code to GitHub.
2. Import the repository in Vercel.
3. Vercel will automatically detect Vite and configure the build settings.

**Netlify:**
1. Connect your repository.
2. Build command: `npm run build`
3. Publish directory: `dist`

---

Built with ❤️ by Hudbird UI.
