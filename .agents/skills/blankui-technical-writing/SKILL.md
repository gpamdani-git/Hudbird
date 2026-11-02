---
name: blankui-technical-writing
description: Guidelines for generating and structuring documentation pages, previews, and interactive showcases within the apps/docs application.
---

# Hudbird UI — Technical Writing & Documentation Standard

This skill governs the creation and maintenance of documentation pages for Hudbird UI within the `apps/docs` Vite application.

## 1. Documentation Layout Structure
When creating or updating a documentation page (e.g., `ButtonDoc.tsx`, `SectionDoc.tsx`, `GridDoc.tsx`):
- **DocHeader Primitive:** Always use `<DocHeader category="..." title="..." description="..." badge="..." />`.
- **Component API:** ALWAYS use the `<ApiTable>` component from `apps/docs/src/components/ApiTable` with `Prop | Default | Description` columns. DO NOT use raw markdown or raw HTML tables.
- **Monumental Gallery Headings:** Halaman indeks/galeri (seperti `BlocksGalleryDoc.tsx`, `TemplatesDoc.tsx`) wajib menggunakan tipografi display masif:
  - `font-outfit text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-zinc-900 dark:text-white`
  - Subtitle: `text-base sm:text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl`

## 2. Interactive Previews & Segmented Control Standard
- **ComponentPreview Wrapper:** Gunakan `<ComponentPreview>` untuk merender demo interaktif komponen.
- **Segmented Control Inset Well (Mandatory):**
  - Semua tombol pemilihan opsi preview (seperti switcher ukuran, kolom, gap, atau varian) **WAJIB menggunakan Segmented Control Inset Well** (sesuai `DESIGN.md` Section 4.28):
    ```tsx
    <div className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-black/[0.06] bg-zinc-100 p-1 dark:border-white/[0.08] dark:bg-[#161618]">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => setActive(opt)}
          className={cn(
            "rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all duration-150 active:scale-95 cursor-pointer",
            active === opt
              ? "bg-white font-semibold text-zinc-950 shadow-xs dark:bg-zinc-800 dark:text-white"
              : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
          )}
        >
          {opt}
        </button>
      ))}
    </div>
    ```
  - **Dilarang keras:** Merender tombol pil oval sempit mengambang (`size="xs"`) atau varian non-eksisten (`variant="default"`).

## 3. Mandatory 3-Step Route Registration
Setiap kali komponen baru atau halaman dokumentasi baru dibuat, wajib meregistrasikannya secara serentak ke dalam **3 file registrasi**:
1. [**`apps/docs/src/navData.ts`**](file:///Users/daniakbar/Documents/AISTUDIO%20APP/Hudbird/apps/docs/src/navData.ts): Tambahkan item ke grup yang sesuai (Getting started, Layouts, Core Components, Marketing Sections, dll).
2. [**`apps/docs/src/tocData.ts`**](file:///Users/daniakbar/Documents/AISTUDIO%20APP/Hudbird/apps/docs/src/tocData.ts): Deklarasikan `...TocItems: TocItem[] = [...]` dan daftarkan path rute di `tocMap`.
3. [**`apps/docs/src/App.tsx`**](file:///Users/daniakbar/Documents/AISTUDIO%20APP/Hudbird/apps/docs/src/App.tsx): Import komponen secara lazy-loaded (`const ...Doc = lazy(() => import("./pages/..."))`) dan daftarkan `<Route path="..." element={<...Doc />} />`.

## 4. Code Snippets
- Tampilkan contoh penggunaan dengan `<CodeBlock language="tsx" code={...} />`.
- Pastikan kode contoh mencerminkan kode bersih yang valid dan siap di-copy-paste oleh developer.
