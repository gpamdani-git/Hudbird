import React from "react";
import { PageToolbar } from "../components/PageToolbar";
import changelogData from "../data/changelog.json";

function renderChangelogContent(content: string) {
  return content.split("\n").map((line, i) => {
    const trimmed = line.trim();
    if (trimmed.length === 0) return null;

    if (trimmed.startsWith("- ")) {
      const isIndented = line.startsWith("  ");
      const textWithoutBullet = trimmed.replace(/^- /, "");

      // Parse code and bold
      const codeParts = textWithoutBullet.split(/`([^`]+)`/g);

      return (
        <div
          key={i}
          className={`mt-1.5 flex gap-2 ${isIndented ? "ml-6" : "ml-2 font-medium text-zinc-900 dark:text-zinc-100"}`}
        >
          <span className="text-zinc-400 select-none">•</span>
          <span className={isIndented ? "text-zinc-600 dark:text-zinc-400" : ""}>
            {codeParts.map((part, index) => {
              if (index % 2 === 1) {
                return (
                  <code
                    key={index}
                    className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs text-zinc-900 dark:bg-zinc-800 dark:text-zinc-200"
                  >
                    {part}
                  </code>
                );
              }
              // Parse bold within non-code parts
              const boldParts = part.split(/\*\*([^*]+)\*\*/g);
              return boldParts.map((bp, bIndex) =>
                bIndex % 2 === 1 ? (
                  <strong key={`${index}-${bIndex}`} className="text-zinc-900 dark:text-zinc-100">
                    {bp}
                  </strong>
                ) : (
                  bp
                )
              );
            })}
          </span>
        </div>
      );
    }
    return (
      <p key={i} className="mt-4 mb-2 font-semibold text-zinc-900 dark:text-zinc-100">
        {line}
      </p>
    );
  });
}

export default function ChangelogDoc() {
  return (
    <div className="space-y-16 pb-24">
      {/* Title & Subtitle */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="w-full min-w-0 flex-1 pr-4">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            Changelog
          </h1>
          <p className="pr-8 text-base text-zinc-600 dark:text-zinc-400">
            Latest updates, improvements, and new features in Hudbird UI.
          </p>
        </div>
        <PageToolbar />
      </div>

      <section className="space-y-12">
        {/* Dynamic Releases from Changesets */}
        {changelogData.map((release) => (
          <div
            key={release.version}
            id={`v${release.version.replace(/\./g, "-")}`}
            className="relative scroll-mt-24 border-l border-zinc-200 pl-8 dark:border-zinc-800"
          >
            <div className="absolute top-1.5 left-[-5px] h-2.5 w-2.5 rounded-full bg-indigo-500 ring-4 ring-white dark:ring-zinc-950" />
            <h2 className="mb-2 text-xl font-bold text-zinc-900 dark:text-zinc-50">
              v{release.version}
            </h2>
            <p className="mb-6 text-sm text-zinc-500">{release.date}</p>

            <div className="space-y-2">{renderChangelogContent(release.content)}</div>
          </div>
        ))}

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
