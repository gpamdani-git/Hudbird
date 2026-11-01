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

### 2.33 Sidebar

- **Rail Width:** `w-64 sm:w-72` (256px–288px).
- **Obsidian Surface:** `#161618` dengan hairline right border `border-r border-black/[0.08] dark:border-white/[0.08]`.
- **Nav Items:** 40px–44px height, anisotropic padding `py-2.5 px-4`, concentric `rounded-xl`.

### 2.34 Divider

- **Hairline Stroke:** 1px `bg-zinc-200 dark:bg-white/[0.08]`.
- **Label Badge:** Capsule `px-3 py-1 text-xs` centered secara presisi.

### 2.35 IconBox & HudbirdIcon

- **IconBox:** Frame optik `w-10 h-10` atau `w-12 h-12` dengan concentric `rounded-xl`.
- **HudbirdIcon:** Standardized SVG vector primitive rendering the signature bird/letter-h geometry at crisp vector viewBox scales (`w-5 h-5` to `w-10 h-10`).
