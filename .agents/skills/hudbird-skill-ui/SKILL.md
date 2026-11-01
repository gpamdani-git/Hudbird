---
name: hudbird-skill-ui
description: Professional UI engineering rules based on visual perception, Gestalt psychology, interaction ergonomics, anisotropic vision padding, and surgical safe-editing for Hudbird UI components.
---

# Hudbird UI Skill & Cognitive-Ergonomic Specification (`hudbird-skill-ui.md`)

This skill defines the rigorous standards for component spacing, typography, optical balance, and ergonomics across **Hudbird UI**. It applies principles from **visual perception**, **Gestalt psychology**, and **interaction ergonomics (HCI)** to ensure components achieve the same optical calm, spacious dignity, and tactile precision found in Apple Human Interface Guidelines and Google Stitch.

---

## 0. Aturan Wajib: Safe Code Editing & Surgical Modification (No Full Rewrite)

> [!IMPORTANT]
> **ATURAN MUTLAK PENGERJAAN KODE:**
> 1. **DILARANG REWRITE KESELURUHAN (NO MASS REPLACEMENT):** Jangan pernah menulis ulang seluruh file komponen dari awal. File yang sudah stabil menyimpan banyak fungsionalitas, backward compatibility, puluhan varian warna, dan integrasi aksesibilitas yang telah diuji.
> 2. **SURGICAL EDITS ONLY:** Modifikasi hanya baris kode, token kelas, atau helper yang secara spesifik diatur dalam skill ini (misal: token ukuran, rasio padding, wrapper ikon, atau gap).
> 3. **PRESERVE ALL EXISTING PROPS & BEHAVIORS:** Seluruh varian yang sudah ada (`solid`, `bordered`, `flat`, `soft`, `outline`, `ghost`, `light`, `plain`), 20+ varian warna, ref forwarding, `asChild` (Radix Slot), anchor link `href`, dan accessibility attributes (`aria-*`) wajib dipertahankan seutuhnya.
> 4. **VERIFIKASI TEST & BUILD:** Setiap perubahan wajib memverifikasi bahwa suite pengujian unit (`vitest`) dan build bundler (`tsup` / `vite`) tetap 100% lulus tanpa regresi.

---

## 1. Landasan Teori Spasial & Ergonomi Komponen Tombol

Penentuan ruang (*padding* dan *gap*) pada komponen tombol (`Button`) didasarkan pada empat pilar ilmiah:

### 1.1 Teori Persepsi Anisotropik (*Anisotropic Vision*) & Rasio Padding
Mata manusia memiliki sifat **anisotropik**: sistem penglihatan manusia jauh lebih sensitif terhadap variasi spasial vertikal dibanding horizontal. Garis atau ruang horizontal secara alami dipersepsikan oleh otak lebih padat atau lebih tebal dibanding ruang vertikal berdimensi fisik yang sama.
* **Aturan Padding Asimetris:** Untuk mencegah tombol terasa "tercekik" atau kaku, **padding horizontal (kiri–kanan / X) harus secara konsisten lebih besar dibanding padding vertikal (atas–bawah / Y)**.
* **Rasio Emas Padding:** Rasio yang diwajibkan adalah **1,5 : 1 hingga 2 : 1**.
  * Contoh: Tinggi tombol 40px (ruang vertikal efektif ~10px) dipadukan dengan padding horizontal 20px–24px (rasio 2 : 1).
  * *Anti-pattern:* Menggunakan padding simetris (misal `p-3` atau padding Y dan X sama) membuat tombol terasa terjepit di bagian samping.

### 1.2 Teori Gestalt: *Common Region*, *Figure-Ground*, & *White Space*
Secara kognitif, tombol adalah kontainer interaktif berbatas tegas:
* **Hukum Wilayah Bersama (*Law of Common Region*) & *Figure-Ground*:**
  * Kontainer luar tombol bertindak sebagai latar belakang (*ground*).
  * Label teks dan ikon di dalamnya bertindak sebagai figur utama (*figure*).
  * Ruang kosong (*white space*) internal bertindak sebagai ruang bernapas struktural yang mencegah ketegangan visual (*perceptual clutter*).
* **Hukum Kedekatan (*Law of Proximity*) pada *Gap*:**
  * Jarak pemisah internal antara ikon dan teks (*internal gap*) harus **secara signifikan lebih kecil daripada padding luar tombol**.
  * Rasio Gap terhadap Padding Luar minimal **1 : 2,5** (misalnya *gap* 8px diapit *padding* luar 20px). Hal ini memastikan otak pengguna mengelompokkan ikon dan teks sebagai satu unit makna interaktif sebelum mata membaca batas luar tombol.

### 1.3 Hukum Fitts (*Fitts’s Law*) & Ergonomi Target Sentuh
Menurut Hukum Fitts, waktu yang dibutuhkan pengguna untuk membidik target berbanding lurus dengan jarak dan berbanding terbalik dengan ukuran target:
* Target sentuh yang sempit memperbesar risiko salah klik (*speed-accuracy tradeoff*).
* Komponen tombol Hudbird UI menetapkan tinggi minimum tombol standar pada **40px – 44px** (desktop & tablet) serta **48px – 56px** (mobile touch target / large button), menjamin kenyamanan ergonomis kursor mouse maupun ujung jari.

### 1.4 Standar Sistem Kisi (*8-Point Spatial Grid*)
Seluruh ukuran tombol, padding, dan jarak internal mengacu pada kelipatan kisi 8px (dengan sub-grid 4px):

| Ukuran (*Size*) | Padding Vertikal (Y) | Padding Horizontal (X) | Gap (Ikon ke Teks) | Tinggi Total (*Height*) | Font Size |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Small (`sm`)** | 8px – 10px | 16px (`px-4`) | 6px (`gap-1.5`) | 36px (`h-9`) | 12px (`text-xs`) |
| **Medium (`md`) — Standar** | 10px – 12px | 24px (`px-6`) | 8px (`gap-2`) | 44px (`h-11`) | 14px (`text-sm`) |
| **Large (`lg`) — Lega (Spacious)** | 14px – 16px | 32px (`px-8`) | 10px (`gap-2.5`) | 52px (`h-13`) | 16px (`text-base`) |
| **Extra Large (`xl`) — Hero** | 18px – 20px | 40px (`px-10`) | 12px (`gap-3`) | 60px (`h-15`) | 18px (`text-lg`) |

---

## 2. Keseimbangan Optik pada Penempatan Ikon (*Optical Icon Alignment*)

Saat ikon diletakkan berdampingan dengan label teks di dalam tombol:

1. **Wadah Pembungkus Tetap (*Fixed Optical Wrapper*):**
   Ikon **wajib** dibungkus dalam frame transparan fleksibel (`inline-flex shrink-0 items-center justify-center pointer-events-none`) dengan dimensi terstandarisasi:
   * `sm`: frame `16×16 px` (`w-4 h-4`), artwork ikon `14×14 px`.
   * `md`: frame `20×20 px` (`w-5 h-5`), artwork ikon `16×16 px`.
   * `lg`: frame `20×20 px` (`w-5 h-5`), artwork ikon `20×20 px`.
   * `xl`: frame `24×24 px` (`w-6 h-6`), artwork ikon `22×22 px`.
2. **Eliminasi Manual Margins:**
   Dilarang menambahkan manual margin seperti `ml-1.5` atau `mr-1.5` pada slot konten jika kontainer tombol sudah menerapkan flex `gap`. Menumpuk margin manual di atas `gap` merusak kepatuhan Hukum Kedekatan Gestalt.
3. **Pill / Capsule Compensation (`radius="full"`):**
   Ketika tombol menggunakan radius penuh (kapsul), kelengkungan ekstrem di kedua ujung memerlukan kompensasi padding horizontal tambahan agar label tidak menabrak batas kurva:
   * `sm`: `px-5`
   * `md`: `px-7`
   * `lg`: `px-9`
   * `xl`: `px-11`
4. **Icon-Only Precision (`isIconOnly={true}`):**
   Tombol berbasis ikon murni terkunci pada rasio aspek 1:1 tanpa padding horizontal:
   * `sm`: `w-9 h-9` (36×36)
   * `md`: `w-11 h-11` (44×44)
   * `lg`: `w-13 h-13` (52×52)
   * `xl`: `w-15 h-15` (60×60)

---

## 3. Road Map Standarisasi Komponen Mendatang

Skill `hudbird-skill-ui.md` ini akan terus berkembang untuk mencakup seluruh keluarga komponen:
* **Fase Tombol (Saat Ini):** Persepsi visual, psikologi Gestalt, anisotropic padding, dan ergonomi target sentuh pada `Button`.
* **Fase Feedback & Indikator:** `Alert`, `Toast`, `Tooltip`, `Progress`, `Skeleton` (Apple HUD, Dynamic Island, micro-groove tracks).
* **Fase Seleksi & Pickers:** `Select`, `RadioGroup`, `Slider`, `InputOTP`, `Calendar` (Obsidian surfaces, spring handles, concentric pills).
* **Fase Auxiliary & Navigasi:** `Sidebar`, `Divider`, `IconBox`, `ComboBox`.

