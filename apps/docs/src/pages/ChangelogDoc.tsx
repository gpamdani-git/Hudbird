import React from "react";

export default function ChangelogDoc() {
  return (
    <div className="space-y-16 pb-24">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl mb-4">
          Changelog
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400">
          Latest updates, improvements, and new features in Hudbird UI.
        </p>
      </div>

      <section className="space-y-12">
        {/* Latest Update */}
        <div id="v1-1-3" className="scroll-mt-24 relative pl-8 border-l border-zinc-200 dark:border-zinc-800">
          <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-indigo-500 ring-4 ring-white dark:ring-zinc-950" />
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
            v1.1.3 - UI Components & Dark Mode Enhancements
          </h2>
          <p className="text-sm text-zinc-500 mb-6">September 2026</p>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                Marketing Sections
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-zinc-600 dark:text-zinc-400">
                <li><strong className="text-zinc-900 dark:text-zinc-100">NEW: Logo Cloud Component:</strong> Added a new Logo Cloud section for displaying trusted brands and clients, complete with centered layout options.</li>
                <li><strong className="text-zinc-900 dark:text-zinc-100">NEW: Feature Sections Component:</strong> Added professional-style feature showcases with looping motion animations and modern dark blue backgrounds.</li>
                <li><strong className="text-zinc-900 dark:text-zinc-100">NEW: Pricing Component:</strong> Added a robust Pricing section to showcase subscription tiers and plans.</li>
                <li><strong className="text-zinc-900 dark:text-zinc-100">Bento Grid Hero:</strong> Completely revamped with 100% code-based UI illustrations (Tailwind CSS + Framer Motion) replacing static images. Added smooth <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">whileInView</code> scroll reveal animations.</li>
                <li><strong className="text-zinc-900 dark:text-zinc-100">Split Screen Hero:</strong> Added crossfade transitions for seamless toggling between dark and light mode images, eliminating harsh lazy-loading jumps.</li>
                <li><strong className="text-zinc-900 dark:text-zinc-100">Hero Overlays:</strong> Improved opacity and contrast for "Minimalist Centered" and "Background Image Overlay" sections to blend perfectly with Dark Mode.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                Documentation App
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-zinc-600 dark:text-zinc-400">
                <li>Added smooth global color transitions (<code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">transition-colors duration-300</code>) across the entire documentation site for seamless theme toggling.</li>
                <li>Fixed <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">DocLoadingSkeleton</code> to perfectly match the core UI Skeleton colors, fixing invisibility issues in Dark Mode.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Previous Update */}
        <div id="v1-1-2" className="scroll-mt-24 relative pl-8 border-l border-zinc-200 dark:border-zinc-800">
          <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700 ring-4 ring-white dark:ring-zinc-950" />
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
            v1.1.2 - Tailwind CSS v4 Native Support
          </h2>
          <p className="text-sm text-zinc-500 mb-6">September 2026</p>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                CLI Enhancements
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-zinc-600 dark:text-zinc-400">
                <li><strong className="text-zinc-900 dark:text-zinc-100">Tailwind CSS v4 Native Support:</strong> The CLI now automatically detects Tailwind CSS v4 in your project. It skips creating legacy <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">tailwind.config.js</code> files and directly injects a native <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">@theme</code> block and <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">@import "tailwindcss";</code> into your CSS file for a cleaner, modern setup.</li>
                <li>Ensured robust backward compatibility for projects still running on Tailwind CSS v3.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Previous Update */}
        <div id="v1-1-0" className="scroll-mt-24 relative pl-8 border-l border-zinc-200 dark:border-zinc-800">
          <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-indigo-500 ring-4 ring-white dark:ring-zinc-950" />
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
            v1.1.0 - CLI Improvements & New Schema
          </h2>
          <p className="text-sm text-zinc-500 mb-6">September 2026</p>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                CLI Enhancements
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-zinc-600 dark:text-zinc-400">
                <li>Added the <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">add</code> command to automatically install specific components.</li>
                <li>Support for <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">pnpm</code>, <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">npm</code>, <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">yarn</code>, and <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">bun</code> out of the box.</li>
                <li>Improved caching and faster dependency resolution during initialization.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                New Component Schema
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-zinc-600 dark:text-zinc-400">
                <li>Updated all Marketing and Layout components to support the new standardized installation tabs.</li>
                <li>Centralized preset handling for Tailwind CSS configuration.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Older update */}
        <div id="v1-0-0" className="scroll-mt-24 relative pl-8 border-l border-zinc-200 dark:border-zinc-800">
          <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700 ring-4 ring-white dark:ring-zinc-950" />
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
            v1.0.0 - Initial Release
          </h2>
          <p className="text-sm text-zinc-500 mb-6">August 2026</p>
          <div className="space-y-6">
            <ul className="list-disc pl-5 space-y-2 text-zinc-600 dark:text-zinc-400">
              <li>Initial release of Hudbird UI with core components and layouts.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
