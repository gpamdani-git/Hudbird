---
name: blankui-marketing-engineering
description: Specific rules for building and documenting components within the packages/marketing library. Covers core component composition, semantic HTML, and skill-tracking per marketing block.
---

# Hudbird UI — Marketing Engineering Standard

This skill defines the mandatory rules for developing and maintaining the "Marketing Sections" (`packages/marketing`) package and template blocks.

## 1. Mandatory 100% Core Component Consumption (`@hudbird/ui`)
The `packages/core` library (`@hudbird/ui`) is the single source of truth for all primitives.
- **Zero Raw HTML Policy:**
  - **Tombol:** Wajib gunakan `<Button>` dari `@hudbird/ui`. Dilarang menulis tag `<button>` mentah.
  - **Macro Layout:** Wajib gunakan `<Section>` untuk ritme spasial vertikal, `<Container>` untuk batasan lebar/gutter, dan `<Grid>` + `<GridItem>` untuk layout multi-kolom/bento. Dilarang menulis `<section>`, `<div className="max-w-...">`, atau `<div className="grid...">` mentah.
  - **Surface & Kartu:** Wajib gunakan `<Card>` atau `<DoubleBezelCard>`.
  - **Status & Badges:** Wajib gunakan `<Badge>`.
  - **Disclosures & Tabs:** Wajib gunakan `<Accordion>`, `<Tabs>`, `<Switch>`.
- **No Destructive `cn` Theme Overrides:**
  - Komponen marketing tidak boleh menimpa warna dasar dengan hardcoded tailwind classes (`bg-zinc-900`, `text-white`) jika elemen tersebut seharusnya dinamis mengikuti Hudbird Theme Editor.
  - Wajib selalu memanfaatkan token semantik resmi: `bg-background`, `text-foreground`, `bg-card`, `border-border`, `text-primary`, `bg-primary`, dll.

## 2. Macro Layout Primitives & Responsive Discipline
- Setiap section marketing wajib dibungkus dengan `<Section spacing="md" | "lg" | "xl">`.
- Konten dibatasi dalam `<Container size="xl" | "prose" gutter="md" | "lg">`.
- Multi-kolom dan kartu fitur wajib menggunakan `<Grid>` dengan preset asimetris (`layout="bento-2-1" | "bento-1-2" | "bento-split"`) yang otomatis collapse menjadi 1 kolom vertikal di layar mobile tanpa layout jump atau horizontal scrollbar.

## 3. Pexels-Only Photography Standard
- **Sumber Foto Resmi Tunggal:** Seluruh aset fotografi untuk kartu preview, hero visual, dan background template **WAJIB bersumber dari Pexels** (misal `images.pexels.com`).
- **Larangan Keras:** Dilarang mengambil gambar dari Unsplash, placeholder generator, atau tautan acak tidak terkurasi.
- **Karakter Visual:** Prioritaskan fotografi arsitektur minimalis, tekstur material berkualitas tinggi, pencahayaan alami, dan komposisi editorial Swiss.

## 4. Marketing Documentation Structure
Setiap pembuatan/pembaruan halaman dokumentasi marketing (misal `HeroDoc.tsx` di `apps/docs/src/pages/marketing/`):
- **Segmented Control Inset Well:** Seluruh switcher kontrol preview (viewport, tabs, variant toggles) wajib memakai Segmented Control Inset Well konsentris sesuai `DESIGN.md` Section 4.28.
- **Dark & Light Mode Support:** Wajib menguji kontras tinggi pada kedua mode.
- **Component Preview:** Menggunakan `<MarketingPreview>` wrapper.
- **Code Export:** Wajib menyediakan preview ekspor bersih untuk React.
- **Component API:** Wajib menggunakan komponen `<ApiTable>`.

## 5. Marketing Skill Tracking Rules
- Setiap section marketing baru yang dibangun harus didokumentasikan struktur blueprint-nya di `.agents/skills/marketing-[nama-komponen]/SKILL.md`.
