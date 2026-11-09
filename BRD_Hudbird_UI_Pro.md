# BRD — Business Requirements Document

## Hudbird UI Pro Monorepo (v1.5.0)

**Dokumen:** Business Requirements Document  
**Produk:** Hudbird UI Pro — Complete Monorepo Ecosystem  
**Versi:** 1.5.0  
**Status:** Draft  
**Tanggal:** 2026-11-03  
**Pemilik Produk:** daniakbar / gpamdani-git  
**Lisensi:** Hudbird UI Pro Commercial License (LICENSE.md)

---

## 1. Ringkasan Eksekutif

Hudbird UI Pro adalah ekosistem komponen React & Tailwind CSS "motion-first" yang dirancang untuk pengembang dan tim produk membangun situs web, landing page, dan SaaS aplikasi dengan cepat. Monorepo ini menyediakan 70+ UI primitives, 47+ niche template, marketing blocks, CLI generator, dan dokumentasi interaktif. Produk ini berlisensi komersial dan diperuntukkan untuk pembuatan situs komersial, aplikasi SaaS, alat internal, dan deliverable klien — dilarang menjual ulang atau mendistribusikan ulang sumber kode monorepo sebagai produk template yang bersaing.

---

## 2. Latar Belakang & Masalah

Tim pengembang menghadapi beberapa tantangan saat membangun antarmuka modern dari nol:

- Konsistensi visual dan typografi sulit dipertahankan di seluruh halaman dan tim.
- Komponen yang dibuat sendiri seringkali tidak accessible (ARIA, keyboard navigation) dan tidak responsif.
- Memerlukan waktu yang signifikan untuk membangun halaman marketing (hero, testimonial, pricing, FAQ, footer) yang konversi tinggi.
- Tidak ada sistem desain terpadu yang mencakup dark mode, multi-palette, dan tokens.
- Template siap pakai untuk niche tertentu (AI, fintech, cybersecurity, wellness, agency) belum tersedia secara terintegrasi.

Hudbird UI Pro hadir untuk menyelesaikan masalah-masalah di atas dengan menyediakan komponen siap pakai, sistem desain terpadu, dan template niche yang bisa langsung digunakan dalam produksi.

---

## 3. Tujuan Bisnis

| No  | Tujuan                                                                    | KPI Sukses                                                      |
| --- | ------------------------------------------------------------------------- | --------------------------------------------------------------- |
| 1   | Menyediakan 70+ UI primitives yang accessible dan responsif               | 100% komponen melewati uji aksesibilitas dasar (keyboard, ARIA) |
| 2   | Menyediakan 47+ niche template siap produksi                              | Pengguna dapat membangun halaman dalam waktu < 1 jam            |
| 3   | Membangun sistem desain dengan dukungan light/dark mode dan multi-palette | 100% komponen mendukung tema gelap dan terang                   |
| 4   | Menyediakan CLI untuk scaffolding komponen dan template                   | Pengurangan waktu setup komponen ≥ 70%                          |
| 5   | Dokumentasi interaktif dan playground komponent                           | Pengguna dapat meniru kode langsung dari dokumentasi            |
| 6   | Monetisasi melalui lisensi komersial                                      | Pendapatan dari penjualan lisensi dan template                  |

---

## 4. Stakeholder

| Stakeholder         | Peran                                   | Kebutuhan Utama                                                 |
| ------------------- | --------------------------------------- | --------------------------------------------------------------- |
| Pengembang Frontend | Pengguna utama komponen                 | Dokumentasi jelas, TypeScript, accessible, mudah diintegrasikan |
| Desainer Produk     | Pengguna sistem desain                  | Design tokens, typografi, warna, komponen konsisten             |
| Pemilik Produk / PM | Menentukan fitur dan prioritas          | Roadmap, rilis teratur, dukungan komersial                      |
| Klien / Agensi      | Menggunakan template untuk projek klien | 47 niche template, halaman inner, lisensi komersial             |
| Tim Dokumentasi     | Menjaga dokumentasi dan playground      | Komponen dengan contoh kode yang bisa dicopy-paste              |

---

## 5. Ruang Lingkup (Scope)

### Dalam Lingkup

- `@hudbird/ui` (packages/core): 70+ UI primitives (Accordion, Alert, Button, Card, Dialog, Dropdown, Form, Navbar, Pagination, Sidebar, Sheet, Tabs, Tooltip, dan lainnya).
- `@hudbird/marketing` (packages/marketing): Marketing blocks (Hero, BentoGrid, Testimonials, Pricing, FAQ, Footer, Cta, LogoCloud, FeatureSection, SignatureBlocks, dan blok vertikal untuk Agency, AiStartup, ModernApp, SaaS, Ecommerce, Fintech, Hospitality, AdminCms).
- `@hudbird/theme` (packages/theme): Tailwind CSS variable design tokens, dukungan light/dark mode, dan generator palet dinamis.
- `@hudbird/schemas` (packages/schemas): TypeScript models, metadata, dan skema konten untuk 47 template dan halaman inner.
- `hudbird-ui` (packages/cli): CLI interaktif untuk scaffolding komponen dan template.
- `apps/docs`: Dokumentasi SPA dan komponen playground (Vite + React).
- `starter-kits/pro-templates`: Showcase 47 niche demo dan 14 halaman inner.

### Di Luar Lingkup

- Backend API, basis data, atau autentikasi pengguna.
- Hosting atau deployasi produksi (ditangani oleh pengguna melalui Vercel, dll.).
- Aplikasi mobile native (React Native / Flutter).
- Komponen yang memerlukan state manajemen global eksternal (Redux, MobX) sebagai dependensi wajib.

---

## 6. Kebutuhan Bisnis (Functional Requirements)

### FR-01: Komponen UI Dasar

Pengembang dapat mengimpor dan menggunakan 70+ komponen UI primitives dengan props TypeScript yang terdefinisi dengan baik.

### FR-02: Sistem Desain & Theme

Semua komponen harus mendukung Tailwind CSS design tokens, light mode, dark mode, dan multi-palette branding.

### FR-03: Marketing Blocks

Pengembang dapat membangun halaman marketing konversi tinggi menggunakan Hero, BentoGrid, Testimonials, Pricing, FAQ, Footer, CTA, dan blok-blok vertikal per industri.

### FR-04: Niche Templates

Tersedia 47+ template niche (AI SaaS, Fintech, Cybersecurity, Wellness, Agency, Ecommerce, Hospitality, dll.) dengan halaman inner (Case Studies, Blog, Careers, Pricing, Auth, dll.).

### FR-05: CLI Scaffolding

Pengguna dapat menggunakan CLI untuk menambahkan komponen atau template ke proyek mereka secara interaktif.

### FR-06: Dokumentasi & Playground

Dokumen interaktif tersedia di `apps/docs` dengan contoh kode yang bisa dicopy-paste dan preview langsung.

### FR-07: Lisensi Komersial

Produk dilindungi oleh lisensi komersial yang memungkinkan penggunaan komersial tak terbatas tetapi melarang redistribusi sumber sebagai produk bersaing.

---

## 7. Kebutuhan Non-Fungsional

| Kategori       | Kebutuhan                                                                       |
| -------------- | ------------------------------------------------------------------------------- |
| Performa       | Komponen render cepat, bundle size kecil, tidak ada runtime fluff berlebihan.   |
| Aksesibilitas  | Semua komponen memenuhi standar ARIA, navigasi keyboard, dan fokus yang jelas.  |
| Responsivitas  | Komponen bekerja pada desktop, tablet, dan mobile dengan breakpoint Tailwind.   |
| TypeScript     | Semua komponen dan skema memiliki definisi tipe yang lengkap.                   |
| Kompatibilitas | Bekerja dengan Vite, Next.js, dan bundler modern lainnya.                       |
| Dokumentasi    | Setiap komponen memiliki contoh kode, prop table, dan preview visual.           |
| Lisensi        | Lisensi komersial yang jelas, tidak boleh dijual ulang sebagai produk template. |

---

## 8. User Stories

Sebagai **pengembang frontend**, saya ingin mengimpor komponen Button dan Card dari `@hudbird/ui` sehingga saya bisa membangun antarmuka konsisten tanpa menulis CSS dari nol.

Sebagai **desainer**, saya ingin mengubah warna utama dan tipografi melalui design tokens sehingga seluruh komponen menyesuaikan secara otomatis.

Sebagai **pemilik produk**, saya ingin membangun landing page AI SaaS menggunakan template siap pakai sehingga waktu launch dapat dipercepat.

Sebagai **agensi**, saya ingin menggunakan 47 niche template untuk deliverable klien dengan lisensi komersial yang valid.

---

## 9. Asumsi & Keterbatasan

- Pengguna sudah familiar dengan React, Tailwind CSS, dan TypeScript.
- Pengguna bertanggung jawab atas hosting dan deployasi aplikasi mereka sendiri.
- Lisensi komersial melarang redistribusi sumber kode sebagai produk template yang bersaing.
- Tidak ada dukungan untuk basis data atau backend secara bawaan.

---

## 10. Kriteria Penerimaan

- Semua 70+ UI primitives tersedia dan diekspor dari `@hudbird/ui`.
- Semua 47+ niche template tersedia di starter-kit.
- Dokumentasi interaktif dapat diakses melalui `pnpm dev` di port 3000.
- CLI dapat berjalan dan menghasilkan komponen/template dengan benar.
- Semua komponen melewati uji aksesibilitas dan responsivitas dasar.
- Lisensi komersial diterapkan dan diterima oleh pengguna sebelum download/pembelian.

---

## 11. Risiko & Mitigasi

| Risiko                                           | Dampak | Mitigasi                                                                  |
| ------------------------------------------------ | ------ | ------------------------------------------------------------------------- |
| Pengguna membangun ulang komponen dari nol       | Tinggi | Dokumentasi lengkap dan contoh kode yang mudah dicopy-paste               |
| Konflik versi dependensi (React 19, Tailwind v4) | Sedang | Gunakan peer dependency yang jelas dan dokumentasikan versi yang didukung |
| Pelanggaran lisensi komersial                    | Tinggi | Sertakan LICENSE.md yang jelas dan ketentuan penggunaan                   |
| Aksesibilitas tidak terpenuhi                    | Sedang | Uji semua komponen dengan alat aksesibilitas dan tambahkan ARIA           |

---

## 12. Roadmap (Tentatif)

| Fase   | Tanggal  | Fokus                                                      |
| ------ | -------- | ---------------------------------------------------------- |
| v1.5.0 | Sekarang | Rilis monorepo lengkap dengan 70+ komponen dan 47 template |
| v1.6.0 | Q1 2027  | Tambah komponen baru dan perbaikan aksesibilitas           |
| v2.0.0 | Q2 2027  | Major update sistem desain dan CLI v2                      |

---

**Dokumen ini merupakan bagian dari dokumentasi internal Hudbird UI Pro. Untuk pertanyaan, hubungi support@hudbird.studio atau daniakbar.**

## Branded website pilot: implementation status

A focused pilot adds BrandProfile, HeroContent, HeroSectionConfig, PageComposition, and StartupPageContent. It provides two promotional page compositions and five interchangeable hero types (centered, split, slideshow, video, interactive). Source distribution uses the existing CLI registry and includes a Codex workflow skill. The default visual direction for this pilot is clean and calm; expressive motion and decorative glass are opt-in.

These capabilities apply to the pilot rather than certifying every existing template. A subsequent SaaS collection now adds 12 section types with 26 primary layouts, pricing UI, a section catalog, and a branded page builder with React/JSON export. Existing slideshow/video heroes remain additional options. See `docs/HUDBIRD-LANDING-SECTIONS.md` for scope and verification. Payment flows, chatbot/dashboard UI, full catalog migration, and willingness-to-pay validation remain future work. Owner usability feedback remains pending.
