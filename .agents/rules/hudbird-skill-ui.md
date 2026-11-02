---
name: hudbird-skill-ui
description: Professional UI engineering rules based on visual perception, Gestalt psychology, interaction ergonomics, anisotropic vision padding, and surgical safe-editing for all Hudbird UI components.
---

# Hudbird UI Master Skill & Cognitive-Ergonomic Specification (`hudbird-skill-ui.md`)

This master specification defines the architectural, optical, perceptual, and ergonomic standards across the entire **Hudbird UI** component ecosystem. It translates foundational principles from **human visual perception**, **Gestalt psychology**, and **Human-Computer Interaction (HCI)** into concrete, enforceable code tokens.

---

## 0. Aturan Mutlak: Safe Code Editing & Surgical Modification (No Full Rewrite)

> [!IMPORTANT]
> **ATURAN MUTLAK PENGERJAAN KODE:**
>
> 1. **DILARANG REWRITE KESELURUHAN (NO MASS REPLACEMENT):** Jangan pernah menulis ulang file komponen dari awal. File yang sudah ada menyimpan banyak fungsionalitas, backward compatibility, 20+ varian warna, ref forwarding, event handlers, dan integrasi aksesibilitas yang telah diuji.
> 2. **SURGICAL EDITS ONLY:** Modifikasi hanya baris kode, token kelas, atau helper yang diatur dalam spesifikasi ini (misal: token ukuran, rasio padding, wrapper ikon, atau gap).
> 3. **PRESERVE ALL EXISTING PROPS & BEHAVIORS:** Seluruh varian yang sudah ada (`solid`, `bordered`, `flat`, `soft`, `outline`, `ghost`, `light`, `plain`), 20+ varian warna, ref forwarding, `asChild` (Radix Slot), anchor link `href`, dan accessibility attributes (`aria-*`) wajib dipertahankan seutuhnya.
> 4. **VERIFIKASI TEST & BUILD:** Setiap perubahan wajib memverifikasi bahwa suite pengujian unit (`vitest`) dan build bundler (`tsup` / `vite`) tetap 100% lulus tanpa regresi.

---

## 1. Landasan Teori Kognitif & Ergonomis (Universal Principles)

### 1.1 Teori Persepsi Anisotropik (_Anisotropic Vision_) & Rasio Padding

Mata manusia memiliki sensitivitas spasial yang jauh lebih tajam pada sumbu vertikal dibanding sumbu horizontal. Ruang horizontal yang berukuran sama dengan ruang vertikal akan dipersepsikan oleh otak sebagai lebih padat/sempit.

- **Aturan Rasio Padding Asimetris:** Untuk mencegah elemen terlihat kaku atau tertekan (_cluttered_), **padding horizontal ($X$) wajib selalu lebih besar dibanding padding vertikal ($Y$) dengan rasio 1,5 : 1 hingga 2,5 : 1**.
- Berlaku untuk tombol, badge, input, sel tabel, menu dropdown, toast, dan card container.

### 1.2 Teori Psikologi Gestalt

1. **Hukum Wilayah Bersama (_Law of Common Region_):** Elemen yang berada di dalam kontainer berbatas jelas (surface/card/fieldset) dipersepsikan sebagai satu kelompok fungsional. Garis batas harus tipis (_hairline_ 1px) dengan specular contrast halus, bukan border tebal yang agresif.
2. **Hukum Kedekatan (_Law of Proximity_):** Jarak pemisah internal (_internal gap_, misal ikon ke teks) wajib **secara signifikan lebih kecil daripada padding luar kontainer** (rasio minimal 1 : 2,5).
3. **Hubungan Figur-Latar (_Figure-Ground Relationship_):** Kontainer adalah _ground_, teks dan ikon adalah _figure_. Kontainer harus memberikan _white space_ yang cukup sebagai ruang bernapas kognitif.
4. **Hukum Kesamaan (_Law of Similarity_):** Kontrol yang memiliki level aksi setara wajib memiliki tinggi dan bobot tipografi yang konsisten.

### 1.3 Hukum Fitts (_Fitts’s Law_) & Ergonomi Target Sentuh

- Waktu membidik target berbanding lurus dengan jarak dan berbanding terbalik dengan ukuran target.
- **Standar Minimum Target Sentuh:**
  - Kontrol utama / tombol standar: **minimal 44px × 44px** (standar Apple HIG).
  - Kontrol sekunder / compact: **minimal 36px**.
  - Spacious / Mobile touch: **48px – 56px**.
  - Hero CTA: **60px**.

### 1.4 Formula Kelengkungan Konsentris (_Concentric Radii_)

Saat sebuah elemen bersarang (_nested_) di dalam kontainer yang melengkung:
$$R_{\text{inner}} = R_{\text{outer}} - \text{padding}$$
Jika padding $\ge R_{\text{outer}}$, gunakan $R_{\text{inner}} = \text{round}(R_{\text{outer}} / 2)$ agar lengkungan luar dan dalam sejajar secara optik tanpa menghasilkan sudut yang saling bertubrukan (_tangent collision_).

### 1.5 Kedalaman Spasial Apple Frosted Glass & Obsidian Canvas

- **Dark Base Canvas:** Obsidian Charcoal (`#161618`), bukan pure `#000000`.
- **Elevated Surfaces:** `#202124` dengan highlight inner bevel halus.
- **Overlays:** `backdrop-blur-2xl bg-white/95 dark:bg-[#161618]/95`.
- **Hairline Specular Borders:** `border border-black/[0.08] dark:border-white/[0.08]`.

---

## 2. Aturan Spesifik Tiap Komponen Inti (_Core Component Specifications_)

### 2.1 Button & KineticButton

- **Matriks Dimensi 8-Point Grid (Spacious Maksimal):**
  - `sm`: Tinggi `36px` (`h-9`), padding `px-4` (16px), font `text-xs`, gap `6px` (`gap-1.5`).
  - `md`: Tinggi `44px` (`h-11`), padding `px-6` (24px), font `text-sm`, gap `8px` (`gap-2`). Target Apple 44px (rasio anisotropik 2:1).
  - `lg`: Tinggi `52px` (`h-13`), padding `px-8` (32px), font `text-base`, gap `10px` (`gap-2.5`).
  - `xl`: Tinggi `60px` (`h-15`), padding `px-10` (40px), font `text-lg`, gap `12px` (`gap-3`).
- **Optical Icon Wrapper:** Frame transparan `w-4 h-4` (sm), `w-5 h-5` (md/lg), `w-6 h-6` (xl). Dilarang menambah manual margin (`ml-1.5`) saat flex `gap` aktif.
- **Capsule Compensation (`radius="full"`):** `px-5` (sm), `px-7` (md), `px-9` (lg), `px-11` (xl).
- **Icon-Only:** Rasio 1:1 (`w-9 h-9`, `w-11 h-11`, `w-13 h-13`, `w-15 h-15`).
- **Tactile Physics:** `active:scale-[0.97]` dengan spring `ease-[cubic-bezier(0.16,1,0.3,1)]`.

### 2.2 Input & Textarea

- **Input Primitives:**
  - Tinggi standar `44px` (`h-11`) untuk md (Apple standard), `36px` (`h-9`) untuk sm, `52px` (`h-13`) untuk lg.
  - Padding anisotropik: `px-4` (md), `px-3` (sm), `px-5` (lg).
  - Background: Obsidian `#161618` di dark mode, hairline specular border `border-black/[0.08] dark:border-white/[0.08]`.
  - Focus Glow: Ring specular `focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-transparent`.
  - Start/End content wrapper: Frame transparan `w-5 h-5` dengan alignment optik di tengah.
- **Textarea:**
  - `min-h-[120px]`, padding anisotropik `py-3 px-4`, concentric `rounded-xl`.

### 2.3 InputOTP

- **Slot Cells:** Kotak slot terpisah `w-11 h-12` (44px × 48px), typography tabular `text-lg font-semibold`.
- **Proximity Gap:** `gap-2.5` antar sel; separator dot/dash berada persis di tengah secara optik.
- **Active Glow:** Active slot disinari ring glow halus tanpa displacement/pergeseran layout.

### 2.4 Switch & Checkbox

- **Switch:**
  - Track Apple iOS `w-11 h-6` (44px × 24px) dengan sliding thumb `w-5 h-5` (20px) pada 2px track inset.
  - Motion: Spring fluid `ease-[cubic-bezier(0.16,1,0.3,1)]`.
- **Checkbox:**
  - Box `w-5 h-5` (20px × 20px) dengan concentric `rounded-md` (6px).
  - Centered checkmark dengan micro-scale spring entrance (`scale: [0, 1]`).
  - Hit Area Ergonomis: Area sentuh interaktif minimum `44px × 44px`.

### 2.5 RadioGroup & Radio

- **Radio Disc:** Outer ring `w-5 h-5` (20px) dengan concentric inner indicator dot `w-2.5 h-2.5` (10px).
- **Obsidian Base:** Canvas `#161618` dengan border specular. Active indicator membesar secara fluid dengan spring.
- **Proximity Spacing:** Jarak antara bulatan radio dan label teks `gap-3` (12px), jarak antar opsi `space-y-3`.

### 2.6 Slider

- **Micro-Groove Track:** `h-2 rounded-full shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)] dark:bg-[#202124]`.
- **Active Fill:** Gradient primer yang mengalir dinamis.
- **Tactile Thumb:** Specular disc `w-5 h-5` (20px) dengan `shadow-md border border-white/20 active:scale-125` untuk konfirmasi cengkeraman (_grip feedback_).

### 2.7 Select

- **Trigger Baseline:** Tinggi `44px` (`h-11`), padding anisotropik `px-4`, chevron wrapper `w-5 h-5`.
- **Popover Menu:** Frosted glass `backdrop-blur-2xl bg-white/95 dark:bg-[#161618]/95 border border-black/[0.08] dark:border-white/[0.08] shadow-2xl rounded-2xl p-1.5`.
- **Option Items:** Anisotropic padding `py-2.5 px-3.5`, concentric `rounded-xl`, specular hover highlight.

### 2.8 ComboBox

- **Search Trigger:** Baseline `44px`, search input terintegrasi dengan icon wrapper `w-5 h-5`.
- **Panel Filter:** Floating frosted obsidian list dengan keyboard up/down focus ring dan zero-latency visual update.

### 2.9 Calendar & DatePicker

- **Surface:** Obsidian `#161618` dengan hairline specular border dan `rounded-2xl`.
- **Header Controls:** Target sentuh navigasi bulan min 40px dengan chevron optical alignment.
- **Date Cells:** Target sentuh kotak `w-10 h-10` (40px × 40px) dengan concentric `rounded-xl` hover wells.
- **Range Selection:** Apple fluid capsule pill highlight menyatukan rentang tanggal terpilih.

### 2.10 Card & DoubleBezelCard

- **Double Bezel Architecture:** Outer hairline 1px (`border-black/[0.08] dark:border-white/[0.08]`), inner surface `#161618` / `#202124`, highlight ring interior 1px.
- **Concentric Radii Formula:** $R_{\text{inner}} = R_{\text{outer}} - \text{padding}$. Outer cards `rounded-2xl` (20px) atau `rounded-3xl` (24px).
- **Anisotropic Padding:** Vertical `py-5 sm:py-6` (20px–24px) paired with horizontal `px-6 sm:px-8` (24px–32px).

### 2.11 Fieldset & Form

- **Section Rhythm:** Whitespace antar grup form `space-y-6 sm:space-y-8` (24px–32px).
- **Field Spacing:** Jarak antar baris input `space-y-5 sm:space-y-6`.
- **Legend Styling:** Tipografi bersih `tracking-wider text-xs font-semibold text-zinc-400 uppercase`.

### 2.12 DescriptionList

- **Row Architecture:** Layout preferensi sistem macOS/iOS dengan hairline divider dan minimum 44px vertical touch clearance.
- **Anisotropic Padding:** `py-3.5 px-4`.
- **Rasio Kolom:** 35% key label / 65% value content.

### 2.13 Dialog (Modal)

- **Backdrop:** `backdrop-blur-md bg-black/60`.
- **Surface:** `backdrop-blur-2xl bg-white/95 dark:bg-[#161618]/95 border border-black/[0.08] dark:border-white/[0.08] shadow-2xl rounded-2xl`.
- **Concentric Padding:** `p-6 sm:p-8`.
- **Close Button:** Frame optik `w-8 h-8` dengan tactile press `active:scale-90`.

### 2.14 Sheet (Drawer / Slide-Over)

- **Kinetic Slide:** Animasi spring masuk dari tepi layar `ease-[cubic-bezier(0.16,1,0.3,1)]`.
- **Surface:** Panel full-height frosted obsidian dengan hairline border dan diffused deep shadow.
- **Padding:** `p-6 sm:p-8`.

### 2.15 Dropdown (DropdownMenu)

- **Menu Frame:** `backdrop-blur-2xl bg-white/95 dark:bg-[#161618]/95 border border-black/[0.08] dark:border-white/[0.08] shadow-xl rounded-2xl p-1.5`.
- **Item Anisotropic Padding:** `py-2.5 px-3.5` (10px Y, 14px X) dengan concentric `rounded-xl`.
- **Tactile Feedback:** `hover:bg-zinc-100 dark:hover:bg-[#202124] active:scale-[0.98]`.
- **Separators:** Hairline `h-px bg-zinc-200 dark:bg-white/[0.06] my-1.5`.

### 2.16 Popover

- **Floating Panel:** Inset berlabuh pada trigger, padding `p-4 sm:p-5`, hairline border dan diffused shadow.

### 2.17 Command (Palette / Spotlight Search)

- **Command Frame:** `max-w-2xl w-full backdrop-blur-2xl bg-white/95 dark:bg-[#161618]/95 rounded-2xl shadow-2xl border border-black/[0.08] dark:border-white/[0.08]`.
- **Search Header:** `h-14 px-4` dengan fixed icon wrapper `w-5 h-5` dan `<Kbd>` Esc badge.
- **Item Ergonomics:** `py-3 px-3.5 rounded-xl` dengan instant keyboard focus highlight.

### 2.18 Tooltip

- **Apple HUD Frosted Capsule:** `backdrop-blur-xl bg-zinc-900/95 dark:bg-[#161618]/95 border border-white/10 text-white dark:text-zinc-100 shadow-xl shadow-black/20`.
- **2:1 Anisotropic Padding:** `py-1.5 px-3` (6px Y, 12px X) dengan `rounded-lg` (8px).

### 2.19 Alert

- **Dilarang Border-2:** Border tebal agresif dilarang.
- **Specular Hairline:** `border border-black/[0.08] dark:border-white/[0.08]` dengan frosted translucent status tint.
- **Anisotropic Padding:** `py-4 px-5` (16px Y, 20px X).
- **Non-Shrinking Icon:** Wrapper tetap `w-5 h-5 shrink-0 mt-0.5`.
- **Close Trigger:** Frame optik `w-7 h-7 rounded-lg active:scale-90`.

### 2.20 Toast & Toaster

- **Apple Dynamic Island Floating Style:** `backdrop-blur-2xl bg-white/95 dark:bg-[#161618]/95 border border-black/[0.08] dark:border-white/[0.08] shadow-2xl rounded-2xl`.
- **Anisotropic Padding:** `py-3.5 px-5`.
- **Action Button:** Kontrol taktil kontras tinggi dengan `active:scale-95`.

### 2.21 Progress

- **Micro-Groove Track:** `h-2.5 rounded-full shadow-[inset_0_1px_2px_rgba(0,0,0,0.15)] dark:bg-[#202124]`.
- **Spring Indicator:** Fluid spring physics `duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]`.

### 2.22 Skeleton

- **Obsidian Base:** `#1a1a1c` dengan animated shimmer wave linear gradient `from-transparent via-white/10 to-transparent`.
- **Shape Fidelity:** Meniru persis geometri komponen tujuan (dilarang lingkaran acak untuk kartu konten).

### 2.23 Heading & Typography

- **Negative Kerning:** `-0.8px` s/d `-1.8px` (`tracking-tight` s/d `tracking-tighter`) untuk display titles.
- **Weight Discipline:** Strictly `font-medium` (500) s/d `font-semibold` (600).

### 2.24 Text & Micro-Primitives (Kbd, Blockquote, Mark)

- **Prose Rhythm:** `leading-[1.75]` line-height, max `65ch` width.
- **`<Kbd>`:** 3D keycap `border border-b-2 border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-[11px] font-mono`.
- **`<Blockquote>`:** Specular left accent `border-l-2 border-primary/60 pl-4 py-1 italic`.
- **`<Mark>`:** Translucent highlight `px-1 py-0.5 rounded bg-primary/15 text-primary`.

### 2.25 Badge

- **Micro-Pill:** `tracking-wider text-[11px] font-semibold uppercase`.
- **3:1 Anisotropic Padding:** `py-1 px-3` (4px Y, 12px X).
- **Indicator Dot:** `w-1.5 h-1.5 rounded-full mr-1.5`.

### 2.26 Avatar & AvatarGroup

- **Sizes:** `sm` (32px), `md` (40px), `lg` (48px), `xl` (56px).
- **Group Overlap:** `-space-x-3` dengan `ring-2 ring-background`.
- **Status Dot:** `w-3 h-3 ring-2 ring-background` di kuadran kanan bawah.

### 2.27 Table

- **Density Modes:** Compact `py-2.5 px-4`, Normal `py-4 px-6`, Relaxed `py-5 px-8` (rasio anisotropik $\ge 1.5:1$).
- **Dividers & Striping:** Hairline `border-b border-zinc-200 dark:border-white/[0.06]`, zebra striping `#1a1a1d`.
- **Hover:** Specular wash `hover:bg-zinc-500/5 dark:hover:bg-white/[0.03]`.

### 2.28 Tabs

- **Control Well:** Inset `bg-zinc-100 dark:bg-[#161618] p-1 rounded-xl border border-black/[0.05] dark:border-white/[0.05]`.
- **Active Thumb:** Concentric `rounded-lg bg-white dark:bg-[#28292d] shadow-sm text-foreground` dengan spring layout animation (`layoutId="activeTab"`).
- **Anisotropic Padding:** `py-2 px-4`.

### 2.29 Breadcrumbs

- **Chevron Center Shift:** `translate-x-[0.5px] text-zinc-400`.
- **Touch Clearance:** Minimal 40px channel sentuh.

### 2.30 Pagination

- **Page Buttons:** Conforming ke standar button `h-10 min-w-10 px-3 text-sm rounded-xl` (min 40px touch target).
- **Active Page:** Highlight well solid/frosted dengan tactile press.

### 2.31 Accordion

- **Trigger Clearance:** `h-13 px-5` (52px target sentuh) dengan chevron berputar spring `duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]`.
- **Panel Padding:** `pt-2 pb-5 px-5`.

### 2.32 Navbar

- **Clearance:** `h-16 sm:h-18` (64px–72px).
- **Surface:** Frosted glass `backdrop-blur-xl bg-white/80 dark:bg-[#161618]/80 border-b border-black/[0.08] dark:border-white/[0.08] sticky top-0 z-50`.
- **Channel Padding:** `px-6 sm:px-8 lg:px-12`.

### 2.33 Sidebar & Dock Systems

- **Multi-Position:** Mendukung `position="left"` (nav rail standar), `position="right"` (inspector / AI copilot panel), dan `position="bottom"` (macOS floating dock).
- **Surface Variants:** `flat` (frosted glass), `bordered` (hairline border), `floating` (inset rounded-3xl floating card), dan `dock` (macOS floating pill bar).
- **Nav Items:** 40px–44px height, anisotropic padding `py-2.5 px-4`, concentric `rounded-xl`.
- **Directional Tooltips:** Auto-align ke arah berlawanan (kanan untuk left rail, kiri untuk right rail, atas untuk bottom dock).

### 2.34 Divider

- **Stroke Styles:** Mendukung `solid` (1px hairline), `dashed` (minimalist receipt voucher), `dotted` (precision technical micro-dots), dan `gradient` (Apple specular linear fade).
- **Content & Icon Slots:** Label capsule dengan opsional slot `icon` (`icon={<Sparkles />}`) untuk pembatas section.
- **Bi-Directional:** Bekerja penuh pada orientasi `horizontal` dan `vertical`.

### 2.35 IconBox & HudbirdIcon

- **IconBox:** 5 varian terkalibrasi (`default`, `brand`, `glass`, `subtle`, `solid`) pada 3 skala geometri (`sm`: 36px, `md`: 48px, `lg`: 56px).
- **Specular Backlight Halo:** `showGlow={true}` memancarkan ambient blur halo halus saat hover.
- **HudbirdIcon:** Standardized SVG vector primitive rendering the signature bird/letter-h geometry at crisp vector viewBox scales (`w-5 h-5` to `w-10 h-10`).

### 2.36 Icons & Lucide React Directory

- **Standar Ikonografi:** Hudbird UI secara resmi menggunakan **Lucide React** (ISC License) sebagai pustaka ikon open-source utama dengan 1.400+ ikon berbasis stroke yang konsisten.
- **12 Kategori Fungsional:** Ikon dikelompokkan dan difilter langsung di halaman (*in-place*, tanpa manipulasi rute/URL):
  1. *Navigation & Wayfinding:* `Home`, `Compass`, `Menu`, `Layers`, `Grid`, `Map`, `Sidebar`.
  2. *Actions & Controls:* `Plus`, `Trash2`, `Edit3`, `Copy`, `Share2`, `Download`, `Filter`.
  3. *Arrows & Directions:* `ArrowRight`, `ChevronDown`, `Move`, `Maximize2`.
  4. *Communication & Messaging:* `Mail`, `MessageSquare`, `Send`, `Bell`, `Phone`, `Inbox`.
  5. *Users, Accounts & Security:* `User`, `Shield`, `Key`, `Fingerprint`, `Lock`, `Unlock`.
  6. *Commerce & Finance:* `ShoppingCart`, `CreditCard`, `DollarSign`, `Wallet`, `Receipt`.
  7. *Files, Folders & Documents:* `FileText`, `FolderKanban`, `Archive`, `Paperclip`.
  8. *Devices, System & Hardware:* `Laptop`, `Cpu`, `Database`, `Server`, `Terminal`, `Wifi`.
  9. *Analytics & Data Metrics:* `BarChart3`, `LineChart`, `Activity`, `TrendingUp`, `Gauge`.
  10. *Status, Alerts & Feedback:* `CheckCircle2`, `AlertTriangle`, `Info`, `Eye`, `HelpCircle`.
  11. *Media & Multimedia:* `Play`, `Volume2`, `Camera`, `Video`, `Image`, `Music`.
  12. *Delight, Accents & General:* `Sparkles`, `Flame`, `Zap`, `Heart`, `Star`, `Award`.
- **Filtering & DX:** Filter kategori dinamis dalam status state React, live multi-keyword search, salin kode komponen 1-klik, serta atribusi resmi kredit open source Lucide React.

### 2.37 Section (Macro Spatial Cadence & Viewport Boundary)

- **Spasial Vertikal 8-Point:**
  - `none`: `py-0`
  - `xs`: `py-6 sm:py-8` (24px mobile, 32px desktop)
  - `sm`: `py-8 sm:py-12` (32px mobile, 48px desktop)
  - `md` (Default): `py-12 sm:py-16 lg:py-20` (48px mobile, 64px tablet, 80px desktop)
  - `lg`: `py-16 sm:py-24 lg:py-32` (64px mobile, 96px tablet, 128px desktop)
  - `xl`: `py-20 sm:py-32 lg:py-40` (80px mobile, 128px tablet, 160px desktop)
- **Surfaces:** Mendukung `default`, `muted`, `card`, `inverted`, dan `obsidian`.
- **Specular Hairline Borders:** `bordered={true | "top" | "bottom" | "both" | false}` menerapkan garis batas `border-border`.
- **Safe Viewport:** `fullHeight={true}` mengunci `min-h-[100dvh]` tanpa layout shift di browser mobile.
- **Polymorphic:** `as="section" | "main" | "article" | "header" | "footer"`.

### 2.38 Container (Width Constraints & Miller's Reading Channel)

- **Batasan Lebar Responsif:**
  - `sm`: `max-w-screen-sm` (640px)
  - `md`: `max-w-screen-md` (768px)
  - `prose`: `max-w-3xl` (Capped pada 65ch / 768px untuk kenyamanan membaca optimal per Miller's Law)
  - `lg`: `max-w-screen-lg` (1024px)
  - `xl` (Default): `max-w-7xl` (1280px)
  - `2xl`: `max-w-[1440px]`
  - `fluid`: `max-w-none`
- **Responsive Anisotropic Gutters:**
  - `none`: `px-0`
  - `sm`: `px-4` (16px)
  - `md` (Default): `px-4 sm:px-6 lg:px-8` (16px mobile, 24px tablet, 32px desktop)
  - `lg`: `px-6 sm:px-8 lg:px-12` (24px mobile, 32px tablet, 48px desktop monumental Stitch gutters)
- **Centering:** `centered={true}` (`mx-auto`).
- **Polymorphic:** `as="div" | "main" | "article" | "nav" | "header" | "footer"`.

### 2.39 Grid & GridItem (Bento Presets & Google Stitch Staggered Physics)

- **Mobile-First Responsive Tracks:** Multi-column grid selalu collapse ke 1 kolom di viewport mobile:
  - `cols={1}`: `grid-cols-1`
  - `cols={2}`: `grid-cols-1 md:grid-cols-2`
  - `cols={3}`: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
  - `cols={4}`: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`
  - `cols={6}`: `grid-cols-2 sm:grid-cols-3 lg:grid-cols-6`
  - `cols="auto-fit"`: `grid-cols-[repeat(auto-fit,minmax(280px,1fr))]`
- **Asymmetric Bento Presets (Anti-Slop):** Melarang 3 kartu seragam tanpa hierarki visual:
  - `layout="bento-2-1"`: `grid-cols-1 lg:grid-cols-3 [&>*:nth-child(1)]:lg:col-span-2`
  - `layout="bento-1-2"`: `grid-cols-1 lg:grid-cols-3 [&>*:nth-child(2)]:lg:col-span-2`
  - `layout="bento-split"`: `grid-cols-1 lg:grid-cols-12 [&>*:nth-child(1)]:lg:col-span-7 [&>*:nth-child(2)]:lg:col-span-5`
- **Strict 8-Point Gaps:** `gap="none" | "xs" (8px) | "sm" (12-16px) | "md" (16-32px) | "lg" (24-40px) | "xl" (32-64px)`.
- **Google Stitch Waterfall Stagger:** Saat `animate={true}`, menganimasikan kartu secara bertingkat via Framer Motion spring physics (`stiffness: 100, damping: 20, mass: 1, staggerDelay: 0.06s`) dengan `whileInView` dan `viewport={{ once: true, margin: "-40px" }}`.
- **Granular GridItem:** Mendukung `colSpan` (1–12, full), `rowSpan` (1–6, full), `colStart` (1–12), dan sinkronisasi `animate`.

---

## 3. Strict Anti-Slop & UI/UX Law Directives (Pantangan Keras & Aturan Baku Komponen)

Untuk mencegah pembuatan komponen yang melenceng dari standar premium Hudbird UI (seperti kasus box emas, icon tanpa konteks, kartu warna-warni, atau container yang dipaksakan melebar):

### 3.1 Larangan Kartu & Ikon Warna-Warni Acak (Banned Rainbow Slop & Multi-Colored Icon Cards)
- **Pantangan Keras:** Dilarang memberi background warna-warni sembarangan (emas/kuning, ungu neon, hijau mencolok) pada icon container atau kartu informasi tanpa alasan hierarki fungsional yang eksplisit.
- **Standar Palet Terkendali:** Gunakan basis Obsidian monokromatik (`#161618` di dark mode, `zinc-50` / `white` di light mode) dengan garis batas rambut (*hairline* 1px `border-zinc-200/80 dark:border-white/[0.08]`).
- **Aksen Tunggal:** Hanya diperbolehkan satu aksen fungsional yang terkalibrasi (misal status emerald untuk aktif, atau brand indigo untuk sorotan utama), bukan karnaval warna.
- **IconBox & Card:** Wajib selalu merujuk pada varian resmi (`variant="default" | "brand" | "glass" | "subtle" | "solid"`).

### 3.2 Larangan Ikon AI Tanpa Konteks Nyata (Banned Gratuitous AI / Sparkle Icons)
- **Pantangan Keras:** Dilarang memasang ikon `Sparkles`, `Wand2`, atau `Bot` pada kartu, badge, atau header dokumentasi jika komponen/fitur tersebut **bukanlah fitur generative AI / LLM**.
- **Kesesuaian Mental Model (Hukum Jakob):**
  - Untuk atribusi open-source / pustaka ikon: Gunakan logo SVG resmi (misal logo asli segitiga/heksagonal Lucide), bukan bintang emas AI.
  - Untuk dokumentasi / file: Gunakan ikon `FileText` atau `Layers`.
  - Untuk CLI / Terminal: Gunakan `Terminal` atau `ChevronRight`.
  - Untuk navigasi: Gunakan `Compass` atau `Navigation`.
  - Ikon harus selalu memiliki makna semantik yang langsung dipahami pengguna.

### 3.3 Larangan Memaksakan Container Melebar untuk Konten Panjang (Channel Containment & Single-Column Discipline)
- **Pantangan Keras:** Dilarang memaksakan grid 2-kolom berdampingan atau container kartu yang stretched horizontal jika teks deskripsi atau penjelasannya panjang. Hal ini membuat teks terhimpit secara vertikal dan merusak kenyamanan membaca.
- **Disiplin 1-Kolom Membaca:** Konten deskripsi panjang wajib mengalir ke bawah dalam 1-kolom natural dengan batasan lebar membaca maksimal $65\text{ch}$ atau $768\text{px}$ (`max-w-3xl` / prose reading channel).
- **Hirarki Vertikal:** Judul di atas $\rightarrow$ badge/kredensial lisensi $\rightarrow$ deskripsi 1-kolom $\rightarrow$ deretan tombol aksi / perintah install di bawahnya. Berikan ruang bernapas vertikal (*monumental vertical rhythm* minimal 16px hingga 24px).

### 3.4 Penerapan Fundamental Hukum UI/UX Pada Komponen
1. **Hukum Fitts (_Fitts’s Law_) & Ergonomi Sentuh:**
   - Semua tombol dan kontrol sentuh harus menyediakan target bidik yang nyaman: minimum 44px tinggi untuk tombol utama (`h-11`), dan minimum 36px untuk compact toolbar (`h-9`).
   - Padding horizontal ($X$) wajib selalu lebih besar dibanding padding vertikal ($Y$) dengan rasio minimal 1.5 : 1 hingga 2.5 : 1. Dilarang keras menggunakan padding sempit seperti `px-2` atau `px-2.5` pada tombol interaktif!
2. **Hukum Hick (_Hick’s Law_) & Navigasi Terfokus:**
   - Hindari overload opsi. Dalam pengelompokan ikon atau filter, gunakan kategori fungsional yang padat (misal 12 domain terarah) dan tampilkan secara instan di tempat (*in-place reactive filtering*), bukan melompat ke hash URL lain atau memaksa pengguna berpindah halaman.
3. **Hukum Kedekatan & Wilayah Bersama Gestalt (_Common Region & Proximity_):**
   - Jarak antar elemen terkait (misal icon dengan label teks) harus jauh lebih rapat (`gap-1.5` atau `gap-2`) dibanding jarak ke batas kontainer luar.
   - Hindari anti-pattern *cards-inside-cards-inside-cards* (kartu di dalam kartu di dalam kartu). Satu container surface elegan dengan hairline border sudah cukup.
4. **Hukum Jakob (_Jakob’s Law_) & Ekspektasi DX:**
   - Susun elemen sesuai mental model developer modern: pencarian di posisi teratas, opsi filter langsung di bawahnya, tombol toggle mode di kanan atas, dan tombol salin 1-klik untuk instalasi dependensi.

### 3.5 Standar Segmented Control Docs, Button `size="xs"`, & Badge `zinc/neutral` (Anti-Slop Resolution)

1. **Resolusi CVA Prop Integrity & Safe Aliases:**
   - **`Button`:** Mendukung resmi `size="xs"` (tinggi 28px `h-7 px-2.5 text-xs gap-1 rounded-lg`) khusus untuk segmented controls, docs toolbar preview switchers, dan compact actions. Varian `"default"` kini dipetakan aman sebagai alias resmi untuk `"solid"`, sehingga tidak akan pernah lagi terjadi teks telanjang tanpa background / border akibat salah ketik.
   - **`Badge`:** Mendukung resmi `color="zinc"` dan `color="neutral"` selain palet semantik (`primary`, `secondary`, `success`, `warning`, `danger`, `info`). Basis varian `solid` telah diamankan sehingga tidak akan pernah lagi terjadi kontras slop teks putih di atas background putih (*invisible white-on-white text*).
   - **`Heading`:** Dilarang memasang rainbow icon badge square di sebelah teks heading (`<Badge variant="outline"><Sparkles /> ...</Badge>`). Heading harus mandiri secara tipografis.

2. **Standar Segmented Control untuk Filter & Preview Toggles:**
   - Semua kontrol pemilihan (seperti switcher kolom, gap, ukuran, atau preset) di dalam dokumentasi **wajib menggunakan Segmented Control Inset Well** dengan komponen inti `<Button>`:
     - **Well Inset Track:** `inline-flex flex-wrap items-center gap-1 rounded-xl border border-zinc-200/80 bg-zinc-100 p-1 dark:border-zinc-800 dark:bg-[#161618]`
     - **Item Aktif:** `<Button size="xs" variant="solid" color="white" className="bg-white font-semibold text-zinc-950 shadow-xs dark:bg-zinc-800 dark:text-white cursor-pointer">`
     - **Item Inaktif:** `<Button size="xs" variant="light" color="zinc" className="text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white cursor-pointer">`
   - **Global Reset Safari/WebKit:** `@layer base` di `index.css` telah mengunci `appearance: none; -webkit-appearance: none; border-width: 0;` untuk mencegah border pill abu-abu bawaan browser macOS/iOS Safari pada tombol yang tidak aktif.
   - Dilarang menulis tag `<button>` mentah tanpa styling proper yang melanggar aturan konsumsi komponen inti.

### 3.6 Kewajiban 100% Konsumsi Komponen Inti (@hudbird/ui) di Seluruh Ekosistem

1. **Prinsip Single Source of Truth:** Seluruh komponen visual tingkat lanjut (blok marketing, template, showcase) dan app docs wajib murni menjadi konsumen dari `@hudbird/ui` (`packages/core`).
2. **Larangan Tag HTML Mentah (Zero Raw HTML Policy):**
   - Dilarang menulis tag `<button>` mentah $\rightarrow$ Wajib gunakan `<Button>`.
   - Dilarang menulis `<section>` mentah $\rightarrow$ Wajib gunakan `<Section>`.
   - Dilarang menulis `<div className="max-w-...">` mentah untuk wrapper kontainer $\rightarrow$ Wajib gunakan `<Container>`.
   - Dilarang menulis `<div className="grid grid-cols-...">` mentah $\rightarrow$ Wajib gunakan `<Grid>` dan `<GridItem>`.
   - Dilarang menulis card box border ad-hoc $\rightarrow$ Wajib gunakan `<Card>` atau `<DoubleBezelCard>`.
   - Dilarang menulis tab atau disclosure custom $\rightarrow$ Wajib gunakan `<Tabs>`, `<Accordion>`, `<Switch>`.
3. **Larangan Menimpa Token Tema (*No Destructive `cn` Theme Overrides*):**
   - Blok marketing dan template showcase tidak boleh menimpa warna dasar dengan hardcoded tailwind classes (`bg-zinc-900`, `text-white`) jika elemen tersebut seharusnya responsif terhadap Theme Editor.
   - Wajib selalu memanfaatkan token semantik: `bg-background`, `text-foreground`, `bg-card`, `border-border`, `text-primary`, `bg-primary`, dll.

### 3.7 Standar Aset Visual & Fotografi Marketing (Pexels-Only)

- **Sumber Foto Resmi Tunggal:** Seluruh fotografi untuk galeri blok, kartu preview, avatar showcase, dan template marketing **WAJIB bersumber dari Pexels** (misal `images.pexels.com`).
- **Larangan Sumber Lain:** Penggunaan gambar dari Unsplash, placeholder generator, atau tautan acak tidak terkurasi dilarang keras.
- **Karakter Visual:** Prioritaskan fotografi arsitektur minimalis, tekstur material berkualitas tinggi, pencahayaan alami, dan komposisi editorial Swiss.

### 3.8 Standar Tipografi Display Halaman Galeri & Showcase

- Halaman indeks, galeri blok (`BlocksGalleryDoc.tsx`), dan galeri template (`TemplatesDoc.tsx`) wajib memiliki judul display masif yang mandiri secara visual:
  - Font: `font-outfit`
  - Ukuran: `text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight`
  - Subtitle: `text-base sm:text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl`
  - Menghindari judul yang tenggelam di antara filter chip atau search bar.

### 3.9 Standar Arsitektur CSS-First Tailwind CSS v4

- **CSS-First Tanpa `tailwind.config.ts`:** Monorepo ini beroperasi 100% pada Tailwind CSS v4 CSS-First.
- **Dilarang keras membuat atau mengembalikan `tailwind.config.ts` atau `tailwind.config.js`**.
- Seluruh variabel tema, skala ukuran, dan custom tokens dikelola terpusat di `apps/docs/src/index.css` di bawah direktif `@theme`.


