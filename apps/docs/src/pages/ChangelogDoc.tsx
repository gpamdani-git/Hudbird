import React from "react";

export default function ChangelogDoc() {
  return (
    <div className="space-y-16 pb-24">
      {/* Title & Subtitle */}
      <div>
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
          Changelog
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400">
          Latest updates, improvements, and new features in Hudbird UI.
        </p>
      </div>

      <section className="space-y-12">
        {/* v1.2.0 */}
        <div
          id="v1-2-0"
          className="relative scroll-mt-24 border-l border-zinc-200 pl-8 dark:border-zinc-800"
        >
          <div className="absolute top-1.5 left-[-5px] h-2.5 w-2.5 rounded-full bg-indigo-500 ring-4 ring-white dark:ring-zinc-950" />
          <h2 className="mb-2 text-xl font-bold text-zinc-900 dark:text-zinc-50">
            v1.2.0 — FAQ Components & Major Dependency Upgrades
          </h2>
          <p className="mb-6 text-sm text-zinc-500">September 2026</p>

          <div className="space-y-6">
            {/* New Components */}
            <div>
              <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                New Marketing Components
              </h3>
              <ul className="list-disc space-y-2 pl-5 text-zinc-600 dark:text-zinc-400">
                <li>
                  <strong className="text-zinc-900 dark:text-zinc-100">NEW: Faq (Simple):</strong>{" "}
                  Clean accordion-style FAQ with smooth open/close animation and scroll-triggered
                  appear effects.
                </li>
                <li>
                  <strong className="text-zinc-900 dark:text-zinc-100">NEW: FaqCategorized:</strong>{" "}
                  FAQ with horizontal category tabs and animated panel transitions, perfect for
                  product documentation or support pages.
                </li>
                <li>
                  <strong className="text-zinc-900 dark:text-zinc-100">
                    NEW: FaqWithIllustration:
                  </strong>{" "}
                  A unique two-column FAQ layout pairing accordion questions with a fully procedural
                  animated SVG illustration built entirely with Framer Motion looping animations —
                  no external assets required.
                </li>
              </ul>
            </div>

            {/* Dependency Upgrades */}
            <div>
              <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Major Dependency Upgrades
              </h3>
              <ul className="list-disc space-y-2 pl-5 text-zinc-600 dark:text-zinc-400">
                <li>
                  <strong className="text-zinc-900 dark:text-zinc-100">React 19.3:</strong> Upgraded
                  React and React DOM to 19.3.0 for the latest stability and performance
                  improvements.
                </li>
                <li>
                  <strong className="text-zinc-900 dark:text-zinc-100">TypeScript 6.x:</strong>{" "}
                  Moved from TypeScript 5.x to the latest TypeScript 6 stable release, with all type
                  errors and strict rules resolved.
                </li>
                <li>
                  <strong className="text-zinc-900 dark:text-zinc-100">Vite 8:</strong> Upgraded the
                  build tool to Vite 8. Updated{" "}
                  <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
                    vite.config.ts
                  </code>{" "}
                  to use{" "}
                  <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
                    import.meta.dirname
                  </code>{" "}
                  instead of{" "}
                  <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
                    __dirname
                  </code>{" "}
                  for compatibility with the new native config loader.
                </li>
                <li>
                  <strong className="text-zinc-900 dark:text-zinc-100">
                    Framer Motion / Motion 13:
                  </strong>{" "}
                  Full upgrade to Motion 13 across the monorepo.
                </li>
              </ul>
            </div>

            {/* DX Improvements */}
            <div>
              <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Developer Experience
              </h3>
              <ul className="list-disc space-y-2 pl-5 text-zinc-600 dark:text-zinc-400">
                <li>
                  <strong className="text-zinc-900 dark:text-zinc-100">ApiTable title prop:</strong>{" "}
                  Added a{" "}
                  <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
                    title
                  </code>{" "}
                  prop to the{" "}
                  <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
                    ApiTable
                  </code>{" "}
                  documentation component for clearer section headings on pages with multiple API
                  tables.
                </li>
                <li>
                  <strong className="text-zinc-900 dark:text-zinc-100">ESLint strict fixes:</strong>{" "}
                  Replaced all{" "}
                  <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
                    @ts-ignore
                  </code>{" "}
                  directives with{" "}
                  <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
                    @ts-expect-error
                  </code>{" "}
                  with required descriptions, as enforced by the updated{" "}
                  <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
                    @typescript-eslint/ban-ts-comment
                  </code>{" "}
                  rule.
                </li>
                <li>
                  <strong className="text-zinc-900 dark:text-zinc-100">
                    Lucide React icon fix:
                  </strong>{" "}
                  Resolved missing{" "}
                  <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
                    Github
                  </code>{" "}
                  icon export (removed from lucide-react latest) by using an inline SVG component in
                  the docs header.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Previous Update (v1.1.3) */}
        <div
          id="v1-1-3"
          className="relative scroll-mt-24 border-l border-zinc-200 pl-8 dark:border-zinc-800"
        >
          <div className="absolute top-1.5 left-[-5px] h-2.5 w-2.5 rounded-full bg-indigo-500 ring-4 ring-white dark:ring-zinc-950" />
          <h2 className="mb-2 text-xl font-bold text-zinc-900 dark:text-zinc-50">
            v1.1.3 - UI Components & Dark Mode Enhancements
          </h2>
          <p className="mb-6 text-sm text-zinc-500">September 2026</p>

          <div className="space-y-6">
            <div>
              <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Marketing Sections
              </h3>
              <ul className="list-disc space-y-2 pl-5 text-zinc-600 dark:text-zinc-400">
                <li>
                  <strong className="text-zinc-900 dark:text-zinc-100">
                    NEW: Logo Cloud Component:
                  </strong>{" "}
                  Added a new Logo Cloud section for displaying trusted brands and clients, complete
                  with centered layout options.
                </li>
                <li>
                  <strong className="text-zinc-900 dark:text-zinc-100">
                    NEW: Feature Sections Component:
                  </strong>{" "}
                  Added professional-style feature showcases with looping motion animations and
                  modern dark blue backgrounds.
                </li>
                <li>
                  <strong className="text-zinc-900 dark:text-zinc-100">
                    NEW: Pricing Component:
                  </strong>{" "}
                  Added a robust Pricing section to showcase subscription tiers and plans.
                </li>
                <li>
                  <strong className="text-zinc-900 dark:text-zinc-100">Bento Grid Hero:</strong>{" "}
                  Completely revamped with 100% code-based UI illustrations (Tailwind CSS + Framer
                  Motion) replacing static images. Added smooth{" "}
                  <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
                    whileInView
                  </code>{" "}
                  scroll reveal animations.
                </li>
                <li>
                  <strong className="text-zinc-900 dark:text-zinc-100">Split Screen Hero:</strong>{" "}
                  Added crossfade transitions for seamless toggling between dark and light mode
                  images, eliminating harsh lazy-loading jumps.
                </li>
                <li>
                  <strong className="text-zinc-900 dark:text-zinc-100">Hero Overlays:</strong>{" "}
                  Improved opacity and contrast for "Minimalist Centered" and "Background Image
                  Overlay" sections to blend perfectly with Dark Mode.
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Documentation App
              </h3>
              <ul className="list-disc space-y-2 pl-5 text-zinc-600 dark:text-zinc-400">
                <li>
                  Added smooth global color transitions (
                  <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
                    transition-colors duration-300
                  </code>
                  ) across the entire documentation site for seamless theme toggling.
                </li>
                <li>
                  Fixed{" "}
                  <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
                    DocLoadingSkeleton
                  </code>{" "}
                  to perfectly match the core UI Skeleton colors, fixing invisibility issues in Dark
                  Mode.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Previous Update */}
        <div
          id="v1-1-2"
          className="relative scroll-mt-24 border-l border-zinc-200 pl-8 dark:border-zinc-800"
        >
          <div className="absolute top-1.5 left-[-5px] h-2.5 w-2.5 rounded-full bg-zinc-300 ring-4 ring-white dark:bg-zinc-700 dark:ring-zinc-950" />
          <h2 className="mb-2 text-xl font-bold text-zinc-900 dark:text-zinc-50">
            v1.1.2 - Tailwind CSS v4 Native Support
          </h2>
          <p className="mb-6 text-sm text-zinc-500">September 2026</p>

          <div className="space-y-6">
            <div>
              <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                CLI Enhancements
              </h3>
              <ul className="list-disc space-y-2 pl-5 text-zinc-600 dark:text-zinc-400">
                <li>
                  <strong className="text-zinc-900 dark:text-zinc-100">
                    Tailwind CSS v4 Native Support:
                  </strong>{" "}
                  The CLI now automatically detects Tailwind CSS v4 in your project. It skips
                  creating legacy{" "}
                  <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
                    tailwind.config.js
                  </code>{" "}
                  files and directly injects a native{" "}
                  <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
                    @theme
                  </code>{" "}
                  block and{" "}
                  <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
                    @import "tailwindcss";
                  </code>{" "}
                  into your CSS file for a cleaner, modern setup.
                </li>
                <li>
                  Ensured robust backward compatibility for projects still running on Tailwind CSS
                  v3.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Previous Update */}
        <div
          id="v1-1-0"
          className="relative scroll-mt-24 border-l border-zinc-200 pl-8 dark:border-zinc-800"
        >
          <div className="absolute top-1.5 left-[-5px] h-2.5 w-2.5 rounded-full bg-indigo-500 ring-4 ring-white dark:ring-zinc-950" />
          <h2 className="mb-2 text-xl font-bold text-zinc-900 dark:text-zinc-50">
            v1.1.0 - CLI Improvements & New Schema
          </h2>
          <p className="mb-6 text-sm text-zinc-500">September 2026</p>

          <div className="space-y-6">
            <div>
              <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                CLI Enhancements
              </h3>
              <ul className="list-disc space-y-2 pl-5 text-zinc-600 dark:text-zinc-400">
                <li>
                  Added the{" "}
                  <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
                    add
                  </code>{" "}
                  command to automatically install specific components.
                </li>
                <li>
                  Support for{" "}
                  <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
                    pnpm
                  </code>
                  ,{" "}
                  <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
                    npm
                  </code>
                  ,{" "}
                  <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
                    yarn
                  </code>
                  , and{" "}
                  <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
                    bun
                  </code>{" "}
                  out of the box.
                </li>
                <li>Improved caching and faster dependency resolution during initialization.</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                New Component Schema
              </h3>
              <ul className="list-disc space-y-2 pl-5 text-zinc-600 dark:text-zinc-400">
                <li>
                  Updated all Marketing and Layout components to support the new standardized
                  installation tabs.
                </li>
                <li>Centralized preset handling for Tailwind CSS configuration.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Older update */}
        <div
          id="v1-0-0"
          className="relative scroll-mt-24 border-l border-zinc-200 pl-8 dark:border-zinc-800"
        >
          <div className="absolute top-1.5 left-[-5px] h-2.5 w-2.5 rounded-full bg-zinc-300 ring-4 ring-white dark:bg-zinc-700 dark:ring-zinc-950" />
          <h2 className="mb-2 text-xl font-bold text-zinc-900 dark:text-zinc-50">
            v1.0.0 - Initial Release
          </h2>
          <p className="mb-6 text-sm text-zinc-500">August 2026</p>
          <div className="space-y-6">
            <ul className="list-disc space-y-2 pl-5 text-zinc-600 dark:text-zinc-400">
              <li>Initial release of Hudbird UI with core components and layouts.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
