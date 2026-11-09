# PRD — Product Requirements Document

## Hudbird UI Pro Monorepo (v1.5.0)

**Dokumen:** Product Requirements Document  
**Produk:** Hudbird UI Pro — Complete Monorepo Ecosystem  
**Versi:** 1.5.0  
**Status:** Draft  
**Tanggal:** 2026-11-03  
**Pemilik Produk:** daniakbar / gpamdani-git  
**Lisensi:** Hudbird UI Pro Commercial License

---

## 1. Ringkasan Produk

Hudbird UI Pro adalah ekosistem komponen React & Tailwind CSS motion-first yang menyediakan 70+ UI primitives, 47+ niche template, marketing blocks, sistem desain dengan design tokens, CLI generator, dan dokumentasi interaktif. Produk ini dirancang untuk mempercepat pengembangan antarmuka modern untuk situs web, landing page, dan aplikasi SaaS.

---

## 2. Persona Pengguna

| Persona                | Deskripsi                              | Tujuan Utama                                                     |
| ---------------------- | -------------------------------------- | ---------------------------------------------------------------- |
| **Frontend Developer** | Membangun UI dengan React dan Tailwind | Komponen siap pakai, accessible, TypeScript, mudah dikustomisasi |
| **Product Designer**   | Mengelola sistem desain dan visual     | Design tokens, typografi, warna, dark/light mode, konsistensi    |
| **Product Owner / PM** | Menentukan fitur dan prioritas rilis   | Time-to-market cepat, template niche, dokumentasi yang jelas     |
| **Agency / Klien**     | Membangun situs untuk klien            | 47 niche template, halaman inner, lisensi komersial              |

---

## 3. User Stories & Acceptance Criteria

### Epic 1: UI Primitives (`@hudbird/ui`)

**US-1.1** Sebagai frontend developer, saya ingin mengimpor komponen dasar (Button, Card, Dialog, Dropdown, Form, dll.) dari `@hudbird/ui` sehingga saya tidak perlu menulis CSS dari nol.

- AC: Semua komponen memiliki prop TypeScript yang terdefinisi.
- AC: Komponen bisa di-render tanpa error di Vite/Next.js.
- AC: Setiap komponen memiliki contoh kode di dokumentasi.

**US-1.2** Sebagai frontend developer, saya ingin komponen mendukung navigasi keyboard dan ARIA sehingga aplikasi saya accessible.

- AC: Setiap interaktif komponen (tombol, dropdown, dialog) dapat diakses via keyboard.
- AC: Elemen memiliki role dan label ARIA yang sesuai.

**US-1.3** Sebagai frontend developer, saya ingin komponen responsif di desktop, tablet, dan mobile.

- AC: Komponen menyesuaikan layout berdasarkan breakpoint Tailwind (sm, md, lg, xl).

### Epic 2: Marketing Blocks (`@hudbird/marketing`)

**US-2.1** Sebagai product owner, saya ingin membangun landing page konversi tinggi menggunakan Hero, BentoGrid, Testimonials, Pricing, FAQ, dan Footer.

- AC: Setiap blok marketing memiliki variasi (glass, solid, outline, dll.).
- AC: Blok dapat dikombinasikan untuk membentuk halaman lengkap.

**US-2.2** Sebagai designer, saya ingin menyesuaikan warna dan tipografi blok marketing melalui design tokens.

- AC: Semua blok menggunakan Tailwind CSS variables dan theme tokens.

### Epic 3: Design System & Theme (`@hudbird/theme`)

**US-3.1** Sebagai designer, saya ingin mengubah warna utama, aksen, dan font melalui satu tempat (design tokens).

- AC: Perubahan tokens secara otomatis menyebar ke seluruh komponen.
- AC: Dukungan light mode dan dark mode.

**US-3.2** Sebagai developer, saya ingin menggunakan multi-palette branding untuk merek yang berbeda.

- AC: Tersedia setidaknya 3 palet warna bawaan yang bisa diaktifkan.

### Epic 4: Niche Templates & Schemas (`@hudbird/schemas`, starter-kit)

**US-4.1** Sebagai product owner, saya ingin memilih salah satu dari 47 niche template (AI SaaS, Fintech, Cybersecurity, Wellness, Agency, dll.).

- AC: Setiap niche memiliki halaman utama dan halaman inner (Case Studies, Blog, Careers, Pricing, Auth).
- AC: Template dapat diekstrak ke proyek eksternal.

**US-4.2** Sebagai developer, saya ingin menggunakan TypeScript schema untuk konfigurasi niche sehingga tipe data terjamin.

- AC: Semua schema memiliki definisi TypeScript yang lengkap.

### Epic 5: CLI (`hudbird-ui`)

**US-5.1** Sebagai developer, saya ingin menggunakan CLI untuk menambahkan komponen atau template ke proyek saya secara interaktif.

- AC: CLI dapat menghasilkan komponen dengan struktur file yang benar.
- AC: CLI dapat menghasilkan template lengkap dengan dependensi yang sesuai.

### Epic 6: Dokumentasi & Playground (`apps/docs`)

**US-6.1** Sebagai pengguna, saya ingin melihat dokumentasi interaktif dan preview komponen secara langsung.

- AC: Dokumentasi dapat diakses via `pnpm dev` di port 3000.
- AC: Setiap komponen memiliki contoh kode yang bisa dicopy-paste.

---

## 4. Functional Requirements (Fungsi Produk)

| ID   | Fungsi            | Deskripsi                                                             | Prioritas |
| ---- | ----------------- | --------------------------------------------------------------------- | --------- |
| F-01 | UI Primitives     | 70+ komponen React (Accordion, Alert, Button, Card, Dialog, dll.)     | P0        |
| F-02 | Accessibility     | ARIA, keyboard navigation, focus management                           | P0        |
| F-03 | Responsivitas     | Breakpoint Tailwind (sm, md, lg, xl)                                  | P0        |
| F-04 | TypeScript        | Definisi tipe untuk semua komponen dan schema                         | P0        |
| F-05 | Theme Tokens      | Tailwind CSS variables, light/dark mode, multi-palette                | P0        |
| F-06 | Marketing Blocks  | Hero, BentoGrid, Testimonials, Pricing, FAQ, Footer, CTA              | P0        |
| F-07 | Niche Templates   | 47+ template dengan halaman inner                                     | P0        |
| F-08 | CLI Scaffatting   | Generate komponen dan template secara interaktif                      | P1        |
| F-09 | Dokumentasi       | SPA dokumentasi + playground di `apps/docs`                           | P1        |
| F-10 | Lisensi Komersial | Lisensi yang memungkinkan penggunaan komersial, melarang redistribusi | P0        |

---

## 5. Non-Functional Requirements

| Kategori       | Persyaratan                                | Metrik / Target                             |
| -------------- | ------------------------------------------ | ------------------------------------------- |
| Performa       | Bundle size kecil, render cepat            | < 50KB gzipped untuk komponen inti          |
| Aksesibilitas  | WCAG 2.1 AA, ARIA, keyboard                | 100% komponen interaktif lolos uji keyboard |
| Responsivitas  | Desktop, tablet, mobile                    | Semua komponen responsif                    |
| TypeScript     | Strict mode, definisi tipe lengkap         | 0 error `any` implisit pada komponen publik |
| Kompatibilitas | Vite, Next.js, bundler modern              | Uji di Vite dan Next.js                     |
| Dokumentasi    | Contoh kode, prop table, preview           | 100% komponen publik memiliki contoh        |
| Lisensi        | Komersial, tidak boleh redistribusi sumber | LICENSE.md diterapkan                       |

---

## 6. Desain Sistem (Tingkat Tinggi)

```
┌─────────────────────────────────────────────────────────────┐
│                     HUI PRO MONOREPO                        │
├──────────┬──────────┬──────────┬──────────┬──────────┬──────┤
│  @hudbird│ @hudbird │ @hudbird │ @hudbird │ hudbird-ui│ apps │
│   /ui    │ /marketing│ /theme   │ /schemas │   CLI    │ /docs│
│ (core)   │          │          │          │          │      │
│ 70+ UI   │ Marketing│ Design   | TypeScript│ CLI    | Docs │
│ primitives│ blocks │ tokens   │ schemas  │ generator│ SPA  │
│          │          │          │ for 47+  │          │ +   │
│          │          │          │ niches   │          │ Play │
│          │          │          │          │          │ground│
└──────────┴──────────┴──────────┴──────────┴──────────┴──────┘
```

Tech Stack:

- React 19, Tailwind CSS v4, Framer Motion, TypeScript, Vite
- PNPM workspace, Turborepo, Vitest, Playwright, Changesets

---

## 7. Data Model (Konseptual)

Entitas utama dalam sistem desain Hudbird:

1. **Niche** — Kategori industri (AI SaaS, Fintech, Cybersecurity, Wellness, Agency, dll.)
2. **Template** — Halaman utama per niche dengan konfigurasi section.
3. **Section** — Bagian halaman (Hero, Pricing, Testimonial, FAQ, dll.).
4. **Component** — UI primitive (Button, Card, Dialog, dll.).
5. **ThemeToken** — Design token (warna, tipografi, spacing, radius).
6. **InnerPage** — Halaman tambahan (Case Studies, Blog, Careers, dll.).
7. **License** — Lisensi komersial yang mengatur hak penggunaan.

Detail relasi ada di dokumen ERD terpisah (`ERD_Hudbird_UI_Pro.md`).

---

## 8. Antarmuka Pengguna (UI/UX)

- **Tema:** Light mode dan dark mode dengan transisi halus.
- **Typografi:** Font display, serif accent, sans, dan mono yang dapat dikonfigurasi.
- **Animasi:** Framer Motion micro-interactions (hover lift, press scale, fade-in).
- **Glassmorphism:** Komponen LiquidGlass dan GoldenGateGlass dengan backdrop blur ala macOS 27.
- **Responsif:** Grid, container, dan section yang menyesuaikan layar.

---

## 9. API & Integrasi

- Semua komponen diekspor sebagai ESM module dari `@hudbird/ui`, `@hudbird/marketing`, dll.
- Alias path: `@hudbird/ui`, `@hudbird/theme`, `@hudbird/marketing`, `@hudbird/schemas`.
- CLI terintegrasi dengan PNPM dan Turborepo.
- Tidak ada backend API bawaan; integrasi backend dilakukan oleh pengguna.

---

## 10. Rilis & Versioning

| Versi | Tanggal (Target) | Fitur Utama                                       |
| ----- | ---------------- | ------------------------------------------------- |
| 1.5.0 | Sekarang         | Monorepo lengkap, 70+ komponen, 47 niche template |
| 1.6.0 | Q1 2027          | Komponen baru, perbaikan aksesibilitas            |
| 2.0.0 | Q2 2027          | Sistem desain major update, CLI v2                |

Versioning menggunakan Changesets (`pnpm bump` dan `changeset publish`).

---

## 11. Kriteria Penerimaan (Definition of Done)

- Setiap komponen memiliki prop TypeScript yang terdefinisi.
- Setiap komponen publik memiliki contoh kode di dokumentasi.
- Semua komponen interaktif lolos uji navigasi keyboard.
- Dokumentasi dapat diakses via `pnpm dev` (port 3000).
- CLI dapat menghasilkan komponen dan template tanpa error.
- Lisensi komersial diterapkan dan tercantum di LICENSE.md.

---

## 12. Risiko & Mitigasi

| Risiko                                           | Dampak | Mitigasi                                                          |
| ------------------------------------------------ | ------ | ----------------------------------------------------------------- |
| Konflik versi dependensi (React 19, Tailwind v4) | Sedang | Dokumentasikan versi yang didukung, gunakan peer dependency       |
| Pelanggaran lisensi komersial                    | Tinggi | LICENSE.md yang jelas, ketentuan penggunaan saat pembelian        |
| Aksesibilitas tidak terpenuhi                    | Sedang | Uji dengan alat aksesibilitas, tambahkan ARIA pada semua komponen |
| Ukuran bundle besar                              | Rendah | Hindari runtime fluff, gunakan tree-shaking yang efisien          |

---

## 13. Pertanyaan Terbuka (Open Questions)

- Apakah akan ada versi gratis (open source) dari komponen inti?
- Apakah akan ada integrasi dengan Next.js App Router secara resmi?
- Apakah CLI akan mendukung publish ke registry pribadi?

---

**Dokumen ini merupakan bagian dari dokumentasi internal Hudbird UI Pro. Untuk pertanyaan, hubungi support@hudbird.studio atau daniakbar.**

## Branded website pilot: implementation status

A focused pilot adds BrandProfile, HeroContent, HeroSectionConfig, PageComposition, and StartupPageContent. It provides two promotional page compositions and five interchangeable hero types (centered, split, slideshow, video, interactive). Source distribution uses the existing CLI registry and includes a Codex workflow skill. The default visual direction for this pilot is clean and calm; expressive motion and decorative glass are opt-in.

These capabilities apply to the pilot rather than certifying every existing template. A subsequent SaaS collection now adds 12 section types with 26 primary layouts, pricing UI, a section catalog, and a branded page builder with React/JSON export. Existing slideshow/video heroes remain additional options. See `docs/HUDBIRD-LANDING-SECTIONS.md` for scope and verification. Payment flows, chatbot/dashboard UI, full catalog migration, and willingness-to-pay validation remain future work. Owner usability feedback remains pending.
