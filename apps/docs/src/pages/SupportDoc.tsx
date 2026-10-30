import React from "react";
import { CodeBlock } from "../components/CodeBlock";
import { Text, Strong, Code } from "@hudbird/ui";

import { PageToolbar } from "../components/PageToolbar";

export const supportTocItems = [
  { id: "requirements", title: "System Requirements" },
  { id: "frameworks", title: "Supported Frameworks" },
  { id: "cli-guide", title: "CLI & Theme Setup Guide" },
  { id: "faq", title: "Frequently Asked Questions (FAQ)" },
  { id: "contact", title: "Get Help & Report Bugs" },
];

export default function SupportDoc() {
  return (
    <div className="space-y-16 pb-24">
      {/* 1. Requirements */}
      <div id="requirements" className="scroll-mt-24">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="w-full min-w-0 flex-1 pr-4">
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
              Support & FAQ
            </h1>
            <p className="mb-8 pr-32 text-base text-zinc-600 sm:pr-40 dark:text-zinc-400">
              Information about supported library versions, framework compatibility, and
              troubleshooting for common issues.
            </p>
          </div>
          <PageToolbar />
        </div>

        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">System Requirements</h2>
        <div className="mt-6 space-y-6">
          <div className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
            <h3 className="mb-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">React</h3>
            <p className="mb-4 text-zinc-600 dark:text-zinc-400">
              Hudbird UI requires <Strong>React 18</Strong> or <Strong>React 19</Strong>.
            </p>
            <div className="rounded-lg border border-orange-100 bg-orange-50 p-4 dark:border-orange-900/50 dark:bg-orange-950/30">
              <h4 className="font-semibold text-orange-900 dark:text-orange-200">
                React 19 Compatibility Note
              </h4>
              <p className="mt-1 text-sm text-orange-800 dark:text-orange-300">
                While Hudbird UI supports React 19, many third-party libraries (like{" "}
                <Code>@react-three/fiber</Code> or <Code>framer-motion</Code>) might still enforce{" "}
                <Code>peerDependencies</Code> for React 18. If you encounter <Code>ERESOLVE</Code>{" "}
                conflicts during NPM installation, check our FAQ section below.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
            <h3 className="mb-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Tailwind CSS
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Optimized for <Strong>Tailwind CSS v4</Strong>. The CLI automatically injects native{" "}
              <Code>@theme</Code> blocks for v4 projects, but we also maintain full backward
              compatibility for <Strong>Tailwind CSS v3</Strong> via standard{" "}
              <Code>tailwind.config.js</Code> presets.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
            <h3 className="mb-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Core Dependencies
            </h3>
            <ul className="list-disc space-y-2 pl-5 text-zinc-600 dark:text-zinc-400">
              <li>
                <Strong>Framer Motion</Strong>: v11.0.0 or higher.
              </li>
              <li>
                <Strong>Lucide React</Strong>: Any recent version for iconography.
              </li>
              <li>
                <Strong>Radix UI Primitives</Strong>: v1.0.0 or higher (Installed automatically when
                needed).
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 2. Frameworks */}
      <section id="frameworks" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Supported Frameworks</h2>
        <Text>
          Since Hudbird UI is built as a set of React components rather than a compiled library, it
          works seamlessly anywhere React and Tailwind CSS work.
        </Text>
        <ul className="mt-4 list-inside list-disc space-y-2 text-zinc-600 dark:text-zinc-400">
          <li>
            <Strong>Next.js</Strong> (App Router & Pages Router)
          </li>
          <li>
            <Strong>Vite</Strong> (React)
          </li>
          <li>
            <Strong>Remix</Strong>
          </li>
          <li>
            <Strong>Gatsby</Strong>
          </li>
        </ul>
      </section>

      {/* 3. CLI & Theme Setup Guide */}
      <section id="cli-guide" className="scroll-mt-24 space-y-6">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          CLI &amp; Theme Setup Guide
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Hudbird UI menyediakan CLI (<Code>hudbird-ui</Code>) untuk menginstall komponen dan
          menginisialisasi konfigurasi Tailwind CSS secara otomatis. Panduan ini mencakup cara
          penggunaan CLI serta cara mengekspor tema dari <Strong>Theme Editor</Strong>.
        </p>

        {/* Step 1: Install */}
        <div className="space-y-4 rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
              1
            </span>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Inisialisasi Project
            </h3>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Jalankan perintah berikut di root project Anda. CLI akan otomatis mendeteksi package
            manager (<Code>npm</Code>, <Code>pnpm</Code>, <Code>yarn</Code>, atau <Code>bun</Code>),
            versi Tailwind CSS (v3 atau v4), dan menginstall dependensi yang diperlukan.
          </p>
          <CodeBlock code="npx hudbird-ui@latest init" />
          <div className="space-y-2 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900">
            <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              ✅ Yang dilakukan CLI secara otomatis:
            </p>
            <ul className="list-disc space-y-1 pl-5 text-xs text-zinc-600 dark:text-zinc-400">
              <li>
                Mendeteksi apakah project menggunakan <Strong>Tailwind v4</Strong> (via{" "}
                <Code>@tailwindcss/vite</Code> atau <Code>@tailwindcss/postcss</Code>) atau{" "}
                <Strong>Tailwind v3</Strong>
              </li>
              <li>
                Untuk <Strong>Tailwind v4</Strong>: menawarkan injeksi variabel <Code>@theme</Code>{" "}
                ke file CSS global
              </li>
              <li>
                Untuk <Strong>Tailwind v3</Strong>: membuat <Code>hudbirdPreset.js</Code> dan
                menginjeksikannya ke <Code>tailwind.config.js</Code>
              </li>
              <li>
                Menginstall dependensi UI: <Code>framer-motion</Code>, <Code>lucide-react</Code>,{" "}
                <Code>clsx</Code>, <Code>tailwind-merge</Code>,{" "}
                <Code>class-variance-authority</Code>
              </li>
            </ul>
          </div>
        </div>

        {/* Step 2: Add Components */}
        <div className="space-y-4 rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
              2
            </span>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Tambahkan Komponen
            </h3>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Gunakan perintah <Code>add</Code> untuk menginstall komponen satu per satu atau beberapa
            sekaligus. Komponen akan disalin ke folder <Code>src/components/hudbird-ui/</Code> di
            project Anda.
          </p>
          <CodeBlock
            code={`# Satu komponen\nnpx hudbird-ui@latest add Button\n\n# Beberapa komponen sekaligus\nnpx hudbird-ui@latest add Button Input Select Badge Alert Pagination`}
          />
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
            <p className="text-xs font-semibold text-amber-800 dark:text-amber-200">
              ⚠️ Smart Overwrite Protection
            </p>
            <p className="mt-1 text-xs text-amber-700 dark:text-amber-300">
              Jika komponen sudah ada, CLI akan menanyakan konfirmasi sebelum menimpa file. Jawab{" "}
              <Code>N</Code> untuk melewati dan menjaga kustomisasi Anda, atau gunakan flag{" "}
              <Code>--overwrite</Code> jika ingin menimpa langsung.
            </p>
          </div>
        </div>

        {/* Step 3: List & Diff */}
        <div className="space-y-4 rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
              3
            </span>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Cek Status &amp; Diff Upstream (list &amp; diff)
            </h3>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Ketahui status instalasi 62 komponen secara real-time dan bandingkan modifikasi lokal
            dengan registry upstream menggunakan diff engine:
          </p>
          <CodeBlock
            code={`# Lihat semua komponen terpasang vs tersedia\nnpx hudbird-ui@latest list\n\n# Bandingkan perubahan kode lokal dengan upstream\nnpx hudbird-ui@latest diff Button\n\n# Scan seluruh project untuk komponen yang termodifikasi\nnpx hudbird-ui@latest diff`}
          />
          <div className="flex items-center justify-between rounded-lg border border-indigo-200 bg-indigo-50/50 p-4 dark:border-indigo-900/50 dark:bg-indigo-950/20">
            <div>
              <p className="text-xs font-semibold text-indigo-900 dark:text-indigo-200">
                Dokumentasi CLI Lengkap Tersedia
              </p>
              <p className="mt-0.5 text-xs text-indigo-700/80 dark:text-indigo-300/80">
                Pelajari konfigurasi <Code>components.json</Code>, interactive multi-select, dan
                monorepo tooling di halaman CLI Reference.
              </p>
            </div>
            <a
              href="#/cli"
              className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-indigo-500"
            >
              Buka CLI Docs &rarr;
            </a>
          </div>
        </div>

        {/* Step 3: Theme Editor */}
        <div className="space-y-4 rounded-xl border border-indigo-200 bg-indigo-50/50 p-6 dark:border-indigo-900/50 dark:bg-indigo-950/20">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white dark:bg-indigo-500">
              3
            </span>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Kustomisasi Tema via Theme Editor
            </h3>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Buka halaman <Strong>Theme Builder</Strong> di navigasi sidebar. Di sana Anda akan
            menemukan panel <Strong>Theme Editor</Strong> (ikon kuas 🎨) di pojok kanan atas. Anda
            dapat mengubah:
          </p>
          <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>
              <Strong>Base Color</Strong> — Warna dasar netral (zinc, slate, gray) untuk background
              &amp; teks
            </li>
            <li>
              <Strong>Primary Color</Strong> — Warna aksen utama komponen (menggunakan color picker
              OKLCH)
            </li>
            <li>
              <Strong>Border Radius</Strong> — Ukuran radius sudut komponen (0 = sharp, 1.5 = pill)
            </li>
            <li>
              <Strong>Typography</Strong> — Font Sans dan Font Heading dari Google Fonts
            </li>
          </ul>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Setelah selesai, klik tombol <Strong>Copy CSS</Strong> di bagian bawah panel untuk
            menyalin konfigurasi CSS yang dihasilkan, lalu tempelkan ke file CSS global project Anda
            (biasanya <Code>src/index.css</Code>):
          </p>
          <CodeBlock
            code={`/* Tempel hasil copy dari Theme Editor ke src/index.css Anda */\n@theme {\n  --color-primary-50: oklch(...);\n  --color-primary-100: oklch(...);\n  /* ... semua skala warna primary */\n  --radius: 0.5rem;\n  --font-sans: 'Inter', sans-serif;\n}`}
          />
        </div>

        {/* Step 4: Dependency resolution */}
        <div className="space-y-4 rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
              4
            </span>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Dependency Resolution (Manual)
            </h3>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Untuk komponen yang memerlukan dependensi tambahan seperti Radix UI, CLI akan
            menginstallnya otomatis. Namun jika ingin menginstall manual:
          </p>
          <CodeBlock
            code={`# Dependensi inti (diinstall otomatis oleh init)\nnpm install framer-motion lucide-react clsx tailwind-merge class-variance-authority\n\n# Untuk komponen dengan Radix (misal: Dialog, Select, Tooltip)\nnpm install @radix-ui/react-dialog @radix-ui/react-select @radix-ui/react-tooltip`}
          />
        </div>

        {/* Available components list */}
        <div className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
          <h3 className="mb-4 text-lg font-bold text-zinc-900 dark:text-zinc-100">
            Daftar Komponen Tersedia
          </h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {[
              "Button",
              "Badge",
              "Alert",
              "Input",
              "Textarea",
              "Select",
              "Checkbox",
              "Switch",
              "Radio",
              "Tabs",
              "Dialog",
              "Tooltip",
              "Avatar",
              "Card",
              "Pagination",
              "Accordion",
              "Dropdown",
              "Skeleton",
            ].map((comp) => (
              <div
                key={comp}
                className="flex items-center gap-2 rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                <Code>{comp}</Code>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FAQ */}
      <section id="faq" className="scroll-mt-24 space-y-6">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Frequently Asked Questions (FAQ)
        </h2>

        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Why do I get an ERESOLVE / Peer Dependency error when installing components?
            </h3>
            <Text>
              If you are using NPM and React 19, you might see an error like:{" "}
              <Code>npm ERR! ERESOLVE unable to resolve dependency tree</Code>. This happens because
              some packages (like <Code>@react-three/fiber</Code>) have strict{" "}
              <Code>peerDependencies</Code> requiring a specific React version range (e.g.{" "}
              <Code>&#62;=19 &lt;19.3</Code>), and NPM v7+ strictly enforces this.
            </Text>
            <div className="mt-4 space-y-4">
              <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Solutions (try in order):
              </p>

              {/* Solution 1 - Recommended */}
              <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900/50 dark:bg-green-950/30">
                <p className="mb-2 text-sm font-bold text-green-900 dark:text-green-200">
                  ✅ 1. Lock React to a compatible version (Recommended)
                </p>
                <p className="mb-2 text-xs text-green-800 dark:text-green-300">
                  Using <Code>--save-exact</Code> prevents NPM from auto-upgrading React (e.g. from
                  19.2.0 → 19.3.0), which breaks peer dependency checks. This is the safest fix.
                </p>
                <CodeBlock code="npm install react@19.2.0 react-dom@19.2.0 --save-exact" />
                <p className="mt-2 text-xs text-green-700 dark:text-green-400">
                  After this, re-run your component installation command.
                </p>
              </div>

              {/* Solution 2 - pnpm */}
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                <p className="mb-2 text-sm font-bold text-zinc-800 dark:text-zinc-200">
                  📦 2. Switch to pnpm (handles conflicts automatically)
                </p>
                <p className="mb-2 text-xs text-zinc-600 dark:text-zinc-400">
                  <Code>pnpm</Code> uses a smarter algorithm that resolves peer dependency
                  mismatches without blocking the installation.
                </p>
                <CodeBlock code="pnpm add @react-three/fiber @react-three/drei maath" />
              </div>

              {/* Solution 3 - legacy-peer-deps */}
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                <p className="mb-2 text-sm font-bold text-zinc-800 dark:text-zinc-200">
                  🔧 3. Force install with <Code>--legacy-peer-deps</Code>
                </p>
                <p className="mb-2 text-xs text-zinc-600 dark:text-zinc-400">
                  This tells NPM to ignore peer dependency conflicts. It may cause instability in
                  large projects but is often safe for smaller ones.
                </p>
                <CodeBlock code="npm install @react-three/fiber @react-three/drei maath --legacy-peer-deps" />
              </div>

              {/* Solution 4 - React 18 */}
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                <p className="mb-2 text-sm font-bold text-zinc-800 dark:text-zinc-200">
                  ⬇️ 4. Downgrade to React 18
                </p>
                <p className="mb-2 text-xs text-zinc-600 dark:text-zinc-400">
                  If you don't need React 19 features, downgrading to React 18 is the most
                  universally compatible option.
                </p>
                <CodeBlock code="npm install react@18 react-dom@18" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Why did the CLI skip installing a component?
            </h3>
            <Text>
              Our CLI includes a <Strong>Smart Overwrite Protection</Strong> feature. If it detects
              that a component (e.g., <Code>Button.tsx</Code>) already exists in your{" "}
              <Code>src/components/hudbird-ui</Code> folder, it will prompt you before overwriting
              it. If you decline, it skips the installation to protect any custom styling or logic
              you've added to that component.
            </Text>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Do I have to use the CLI?
            </h3>
            <Text>
              Not at all! Hudbird UI is designed to be fully copy-pasteable. You can manually create
              the files, copy the code from our GitHub repository, and install the required
              dependencies yourself. However, the CLI automates dependency resolution, path
              rewriting, and <Code>index.ts</Code> generation, which significantly speeds up
              development.
            </Text>
          </div>
        </div>
      </section>

      {/* 4. Get Help & Report Bugs */}
      <section id="contact" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Get Help &amp; Report Bugs
        </h2>
        <Text>
          Still stuck? We're here to help. Visit our official support page for more guides and FAQs,
          or open a GitHub issue to report a bug directly.
        </Text>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <a
            href="https://hudbird.vercel.app/#/support"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col gap-2 rounded-xl border border-indigo-200 bg-indigo-50 p-5 transition hover:border-indigo-400 hover:bg-indigo-100 dark:border-indigo-900/60 dark:bg-indigo-950/30 dark:hover:border-indigo-700 dark:hover:bg-indigo-900/40"
          >
            <span className="text-xl">💡</span>
            <span className="font-bold text-indigo-900 dark:text-indigo-200">
              Support &amp; FAQ
            </span>
            <span className="text-sm text-indigo-700 dark:text-indigo-300">
              Browse the full documentation, troubleshooting guides, and frequently asked questions.
            </span>
            <span className="mt-1 font-mono text-xs text-indigo-500 dark:text-indigo-400">
              hudbird.vercel.app/#/support
            </span>
          </a>
          <a
            href="https://discord.gg/NPBspwkXke"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col gap-2 rounded-xl border border-blue-200 bg-blue-50 p-5 transition hover:border-blue-400 hover:bg-blue-100 dark:border-blue-900/60 dark:bg-blue-950/30 dark:hover:border-blue-700 dark:hover:bg-blue-900/40"
          >
            <span className="text-xl">💬</span>
            <span className="font-bold text-blue-900 dark:text-blue-200">Discord Community</span>
            <span className="text-sm text-blue-700 dark:text-blue-300">
              Join fellow developers, ask questions in real-time, share your work, and get help.
            </span>
            <span className="mt-1 font-mono text-xs text-blue-500 dark:text-blue-400">
              discord.gg/NPBspwkXke
            </span>
          </a>
          <a
            href="https://github.com/gpamdani-git/Hudbird/issues/new?assignees=&labels=bug%2C+triage&template=bug_report.yml&title=%5BBUG%5D+"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col gap-2 rounded-xl border border-rose-200 bg-rose-50 p-5 transition hover:border-rose-400 hover:bg-rose-100 dark:border-rose-900/60 dark:bg-rose-950/30 dark:hover:border-rose-700 dark:hover:bg-rose-900/40"
          >
            <span className="text-xl">🐛</span>
            <span className="font-bold text-rose-900 dark:text-rose-200">Report a Bug</span>
            <span className="text-sm text-rose-700 dark:text-rose-300">
              Found something broken? Open an issue on GitHub with a pre-filled bug report template.
            </span>
            <span className="mt-1 font-mono text-xs text-rose-500 dark:text-rose-400">
              github.com/gpamdani-git/Hudbird
            </span>
          </a>
        </div>
      </section>
    </div>
  );
}
