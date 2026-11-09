# Hudbird: Penyatuan Marketing Collection dan Pemolesan Visual

Status: rencana implementasi berdasarkan interview, 4 November 2026. Dokumen ini melanjutkan koleksi SaaS yang sudah tersedia; pekerjaan di bawah belum dinyatakan selesai.

## Keputusan produk

- Satukan section marketing lama dan baru dalam satu katalog SaaS Section Collection, dikelompokkan berdasarkan fungsi section.
- Audit juga semua block industri lama. Hilangkan koleksi industri dari penjelajahan docs untuk tahap ini; kemampuan landing page yang berguna masuk kategori fungsional setelah didesain ulang.
- Linear menjadi acuan visual utama dengan tingkat kedekatan tinggi pada layout, spacing, tipografi, warna netral, dan penyajian produk. HeroUI dan Untitled UI tetap menjadi acuan detail komponen, interaksi, serta konsistensi sistem.
- Gunakan komponen Hudbird. Pemolesan core diperbolehkan; perubahan default global harus diperiksa terhadap pemakai lain.
- Gunakan brand dan logo Hudbird untuk demo produk workspace. Produk tetap berupa contoh proyek, catatan, dan alur kerja lokal.
- Gunakan demo React interaktif pada bagian utama dan gambar produk yang dipoles pada bagian pendukung.
- Motion bawaan tenang: reveal halus, logo otomatis, slideshow terkontrol. Efek scroll khusus menjadi pilihan varian tertentu.
- Bersihkan duplikasi dari katalog dan builder. Pertahankan kompatibilitas API lama sementara melalui adapter atau ekspor kompatibilitas yang benar-benar mempertahankan kontrak lama.
- Saat builder dibuka, sidebar docs berganti menjadi navigasi builder yang utuh, dengan tombol kembali ke docs.

Referensi: https://linear.app/, https://heroui.pro/, https://www.untitledui.com/. Konten situs sudah ditinjau melalui sumber web; akses browser langsung ke Linear ditolak oleh kontrol izin browser. Jangan menyatakan animasi atau tampilan langsungnya telah diverifikasi, dan jangan membuka ulang melalui jalur lain tanpa perubahan izin.

## 1. Inventaris dan keputusan migrasi

Inventaris mencakup komponen marketing umum di `packages/marketing/src/components` dan delapan keluarga block di `packages/marketing/src/blocks`: SaaS, ModernApp, AiStartup, Agency, Fintech, Ecommerce, Hospitality, dan AdminCms. Komponen aplikasi/dashboard yang tidak berfungsi sebagai section landing page tidak perlu dipaksakan menjadi section promosi; keluarkan dari penjelajahan industri docs dan pertahankan source/API yang masih dipakai.

Untuk setiap implementasi, catat kategori tujuan, struktur/layout, interaksi, pemakai aktif, dependensi CLI, keputusan, dan penggantinya. Gunakan keputusan berikut:

| Kondisi                                            | Tindakan                                                                           |
| -------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Layout/fungsi sama dengan section baru             | Gabungkan ke implementasi utama; migrasikan pemakai; sediakan adapter kontrak lama |
| Layout/interaksi berbeda dan berguna               | Desain ulang memakai fondasi baru; masukkan sebagai varian kategori yang sesuai    |
| Perbedaan hanya palette, glass, atau dekorasi      | Satukan sebagai pilihan styling yang relevan, bukan entri katalog terpisah         |
| Sangat spesifik industri atau di luar landing page | Sembunyikan dari katalog docs tahap ini; pertahankan source/API yang dibutuhkan    |

Hero lama dan pilot masuk satu kategori Hero. Logo Cloud, FAQ, Pricing, CTA, dan Footer lama masuk pasangan kategori baru. Features/Bento dan Testimonials memerlukan kurasi layout unik, termasuk ticker/marquee yang masih berguna.

Pertahankan arah 1–3 varian utama yang kuat per kategori. Hitung ulang total setelah kurasi; 26 bukan target yang harus dipertahankan ketika isi koleksi berubah. Slideshow/video yang sudah tersedia tetap dapat digunakan. Perbedaan varian harus terlihat pada susunan atau pengalaman pengguna.

## 2. Fondasi visual bersama

Mulai dari satu halaman pembanding lengkap yang memakai Hero, Logo Cloud, Feature Showcase, dan Pricing. Terapkan fondasi ini sebelum menyebarkannya ke semua varian:

- Tipografi: sans-serif bersih, skala judul responsif, tracking dan line-height terukur, perbedaan bobot yang halus, panjang baris body terbatas. Pilihan font brand tetap bekerja.
- Layout: satu aturan lebar konten, gutter, grid, dan ritme antarsection. Bedakan komposisi terpusat, editorial, split, dan bento melalui struktur.
- Warna: tingkat teks utama/sekunder/pendukung yang jelas; netral konsisten; aksen brand dipakai pada tindakan dan informasi yang membutuhkan penekanan. Light/dark sama-sama selesai.
- Surface: border tipis, radius konsisten, bayangan seperlunya. Glass atau blur hanya pada konteks yang mendukung hierarki.
- Media: visual produk lebih besar dan terarah, crop yang disengaja, bingkai konsisten, serta area detail yang terbaca di mobile. Hindari sekadar mengganti judul pada gambar yang sama untuk mengklaim preview fitur berbeda.

Macro layout wajib menggunakan Section, Container, dan Grid/GridItem dari library core Hudbird, termasuk pada section yang dimigrasikan dan layout baru katalog/builder. Wrapper motion hanya mengatur animasi, sementara primitive Hudbird tetap mengatur batas lebar, gutter, ritme vertikal, dan kolom. Kontrol, typography, disclosure, dan surface juga memakai Hudbird core. Bila kebutuhan visual belum terwakili, tambahkan atau poles API core secara terukur alih-alih menggandakan primitive di marketing.

Perubahan shared section dipusatkan pada LandingShared, BrandScope, dan token terkait. Perubahan pada core harus memiliki bukti tidak merusak pemakai lain.

## 3. Brand demo dan visual produk

- Ganti identitas demo yang terlihat menjadi Hudbird; gunakan aset logo hitam/putih yang sama dengan docs.
- Pisahkan identitas brand dari isi produk workspace agar pengguna tetap dapat memasukkan logo dan brand sendiri.
- Logo Cloud memakai aset Hudbird sebagai demonstrasi, dengan label contoh. Pengulangan logo pada ticker tidak menjadi klaim pelanggan atau partner.
- Distribusikan aset demo bersama dependensi CLI. Ekspor halaman harus bekerja di proyek terpisah tanpa mengandalkan folder public milik docs.
- Bangun preview React utama dari core Hudbird dengan interaksi lokal yang benar. Gambar pendukung berasal dari visual produk yang konsisten dan memiliki versi tema bila diperlukan.
- Testimoni, harga, metrik, dan integrasi tetap diberi konteks contoh; tidak membuat klaim bisnis baru.
- Nama ekspor fixture lama, misalnya formaLandingContent, dapat dipertahankan sebagai alias kompatibilitas ketika fixture Hudbird diperkenalkan.

## 4. Motion dan scroll

Buat satu fondasi motion untuk seluruh koleksi dengan stack Framer Motion yang digunakan proyek. Paket/import perlu konsisten dalam pekerjaan implementasi; penggantian package bukan alasan mengubah API section. Baca dokumentasi resmi sesuai versi yang terpasang sebelum implementasi.

| Pola              | Perilaku yang dituju                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------------------------- |
| Scroll reveal     | Fade dan perpindahan pendek, tampil sekali ketika masuk viewport; gunakan opacity/transform             |
| Stagger           | Urutan pendek pada kelompok fitur; total penundaan tetap singkat                                        |
| Logo ticker       | Loop kontinu yang mulus; kontrol jeda, pause saat hover/fokus, duplikat visual tidak dibacakan berulang |
| Slideshow         | Pergantian fade/slide halus dengan tombol, indikator, label, dan kontrol jeda jika autoplay dipakai     |
| Anchor navigation | Smooth scroll dengan penanganan fokus dan offset header yang benar                                      |
| Scroll khusus     | Sticky preview/progress/parallax ringan hanya pada varian yang manfaatnya jelas                         |

Reduced motion menghentikan ticker/autoplay dan transform scroll dekoratif; konten tetap terlihat. Saat preview ada di iframe atau area scroll tersendiri, viewport observer harus mengikuti kanvas tersebut. Halaman statis dan hasil render awal tetap dapat dibaca sebelum animasi berjalan.

Scrolling halaman tetap native. Hindari animasi yang membuat halaman sulit dikendalikan di keyboard, trackpad, atau ponsel. Konten utama tidak ditahan sampai urutan animasi selesai.

## 5. Satu katalog yang menjadi sumber utama

- Metadata kategori/varian dipakai bersama oleh navigasi di dalam halaman koleksi, katalog, builder, pencarian, preview, dan ekspor.
- Rekomendasi navigasi utama: kelompok Marketing hanya memuat SaaS Section Collection dan Page Builder. Hilangkan tautan individual Hero, Logo Cloud, Features, Pricing, dan section lain dari sidebar utama; kategori tersebut dipilih melalui daftar/filter di dalam halaman koleksi dan tetap memiliki URL langsung serta hasil pencarian yang relevan.
- Hapus daftar section marketing lama yang paralel. Tautan docs lama diarahkan ke kategori pengganti yang relevan.
- Sembunyikan halaman indeks/detail koleksi industri serta tautan promosi industri dari permukaan docs yang relevan. Audit sidebar, header, galeri, pencarian, dan rekomendasi halaman.
- Source paket dan kontrak impor industri yang masih digunakan tetap tersedia. Peluncuran ini tidak menghapus produk/package industri dari pengguna lama.
- Perbaiki registry CLI, skill, contoh kode, dan dokumentasi mengikuti hasil kurasi. Tidak ada klaim jumlah varian yang hanya dihitung dari daftar lama.
- Migrasikan konfigurasi builder yang tersimpan jika ID/varian berubah. Pertahankan brand, urutan, dan visibility ketika pengganti kompatibel tersedia; jelaskan fallback bila suatu pilihan tidak lagi tersedia.

## 6. Sidebar builder sebagai workspace

Sidebar memiliki dua konteks yang berbagi shell navigasi:

1. **Docs:** dokumentasi core/layout; kelompok Marketing memuat SaaS Section Collection dan Page Builder. Tidak ada daftar section individual yang mengulang isi halaman koleksi.
2. **Builder:** logo Hudbird, tombol Kembali ke Docs, lalu Brand, Sections, Motion, dan Export. Kontrol builder memakai lebar sidebar penuh; daftar docs digantikan selama konteks ini aktif.

Sections memuat pilihan varian, tampil/sembunyikan, dan urutan naik/turun. Navbar/footer tetap di ujung masing-masing. Pilihan section memiliki state aktif dan dapat membawa pengguna ke section di kanvas.

Brand memuat logo, warna, font, radius/density yang relevan, dan mode follow website/light/dark. Motion memuat preferensi global dan opsi relevan untuk section aktif; opsi tersebut ikut tersimpan dan diekspor. Export memuat React/JSON dan status hasilnya.

Kanvas mendapat ruang yang sebelumnya dipakai panel kontrol di tengah halaman. Header builder memusatkan tindakan preview, ukuran viewport, dan ekspor. Sidebar kembali ke docs tanpa kehilangan konfigurasi builder; kedatangan ulang dan refresh memulihkan konteks yang valid. Pada mobile gunakan panel yang dapat dibuka/tutup, dengan fokus dan tombol kembali yang jelas.

Navigasi Kembali ke Docs menggunakan tujuan internal yang stabil, bukan sekadar history.back yang dapat membawa pengguna keluar aplikasi. Sidebar, header, dan canvas memakai satu state builder bersama agar kontrol dan hasil ekspor selalu sejalan.

## 7. DX pemasangan dan kesamaan hasil ekspor

Kondisi saat ini: ekspor React hanya menulis entry `App.tsx` yang mengimpor SaasLandingPage serta fixture konten dari source hasil CLI. JSON hanya menyimpan konfigurasi. Pengguna masih harus memasang LandingPage, menyiapkan proyek/stylesheet, dan menempatkan entry tersebut. Ini sudah diuji sebagai alur teknis, tetapi belum menjadi alur pemasangan lengkap untuk pengguna yang hampir tidak coding.

Usulan peningkatan DX berikut memperluas ekspor awal; starter ZIP dan pemasangan recipe belum tersedia saat dokumen ini ditulis:

| Kebutuhan pengguna                     | Jalur yang disarankan         | Hasil                                                                                                                                                                                              |
| -------------------------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Membuat website baru                   | Download Project              | Starter React/Vite/Tailwind v4 lengkap dalam ZIP: source Hudbird yang dipakai, halaman, konten, konfigurasi, aset, stylesheet, dependensi terkunci, script dev/build, skill, dan instruksi singkat |
| Menambahkan halaman ke proyek yang ada | Install into existing project | Recipe yang dapat dipasang CLI melalui satu perintah; deteksi stack/alias/styles, pasang dependensi yang diperlukan, dan buat halaman pada path baru yang jelas                                    |
| Melanjutkan dengan Codex               | Handoff brief bersama recipe  | Instruksi siap pakai berisi tujuan halaman, pilihan desain, lokasi file, batas kustomisasi, dan verifikasi; source yang dipasang CLI tetap menjadi acuan                                           |

Panel Export mengutamakan kedua jalur berdasarkan proyek baru/lama. Copy React dan JSON tetap tersedia sebagai pilihan lanjutan. ZIP harus dibangun dari recipe dan source registry yang sama dengan installer CLI, sehingga tidak muncul dua implementasi ekspor yang berbeda.

Recipe berbeda dari konfigurasi tampilan saja: sertakan versi schema, versi registry/renderer yang teruji, brand, seluruh konten yang dipakai, urutan/visibility/variant, konfigurasi motion, manifest aset/font, dan dependensi source. Hindari memasang registry terbaru secara diam-diam ketika recipe dibuat untuk versi lain. Referensi versi harus bisa diselesaikan dari artifact yang tersedia; bila belum kompatibel, tampilkan langkah pemulihan yang konkret.

Contoh bentuk perintah masa depan adalah `npx hudbird-ui@<versi-terbit> import ./hudbird-page.json`. Ini desain perintah yang diusulkan, bukan fitur CLI yang sudah tersedia. Nama dan opsi final mengikuti kemampuan installer saat implementasi.

Installer pada proyek lama memeriksa stack yang didukung, alias, Tailwind, CSS entry, dependensi, dan konflik file. Tampilkan ringkasan perubahan dan tujuan file; jangan otomatis menimpa App.tsx, router, atau komponen yang telah dikustomisasi. Berikan entry halaman yang siap diimpor beserta instruksi mounting sesuai proyek. Jika proyek belum cocok, jelaskan kebutuhan yang terdeteksi atau tawarkan starter yang didukung.

Kesamaan preview dan hasil pemasangan dibuktikan dengan:

- Renderer dan source section yang sama dipakai kanvas dan consumer, dengan pilihan versi yang terikat pada recipe.
- Konten, media, logo, font, token, radius, density, tema, dan motion ikut terbawa; file hasil ekspor tidak mengandalkan source/public milik docs.
- Aset demo yang dikuasai proyek disertakan secara lokal. URL media eksternal dan font eksternal yang masih dipakai dikenali sebagai dependensi; jangan menyatakan hasil mandiri/offline bila masih membutuhkannya.
- CSS brand memiliki batas scope dan mounting diberi lebar kanvas yang sepadan. Follow website mode tetap mengikuti tema host; perbandingan visual menetapkan tema dan ukuran viewport yang sama.
- Jalankan instalasi dependensi bersih dari artifact ekspor, typecheck/build, pemeriksaan perilaku, dan perbandingan screenshot pada 375/768/1024/1440 px. Bekukan waktu/posisi animasi dan tunggu font serta media siap saat membandingkan.
- Tetapkan toleransi kecil untuk perbedaan rendering font, sambil menuntut kesamaan layout, konten, aset, warna, dan perilaku. Klaim presisi didasarkan pada hasil consumer, bukan tampilan docs saja.

Uji penerimaan DX: pemilik proyek mengambil hasil builder, menjalankannya melalui Codex tanpa mengedit source manual, mengganti satu section, lalu memperoleh hasil visual yang tetap konsisten. Catat langkah yang membingungkan dan perbaiki alurnya.

## 8. Kompatibilitas dan perubahan schema

- Pertahankan kontrak API lama melalui adapter yang memetakan props/content secara benar. Alias nama saja hanya cukup bila kontraknya identik.
- Pertahankan export path dan registry name lama yang masih diperlukan; dokumentasikan pengganti serta status deprecated.
- Tambahkan konfigurasi motion/media/logo secara typed. Pembaca config harus mengenali konfigurasi lama dan melakukan migrasi deterministik ketika schema berkembang.
- React dan JSON hasil ekspor harus menghasilkan konten, urutan, tema, aset, dan motion yang sama dengan kanvas.
- Uji pemasangan source dari CLI lokal yang dipaketkan dalam proyek React/Vite/Tailwind v4 terpisah. Registry belum dinyatakan terbit sebelum publikasi benar-benar dilakukan.

## 9. Urutan pelaksanaan dan kriteria lulus

1. **Inventaris:** buat matriks migrasi dengan seluruh implementasi lama, pemakai, tujuan, dan keputusan duplikasi.
2. **Halaman pembanding:** poles Hero, Logo Cloud, Feature Showcase, dan Pricing beserta brand/media Hudbird; lakukan review visual desktop/mobile.
3. **Fondasi motion:** terapkan reveal, ticker, slideshow, dan reduced motion pada halaman pembanding; periksa performa dan kontrolnya.
4. **Migrasi koleksi:** terapkan bahasa visual dan interaksi ke semua varian terpilih; migrasikan pemakai dan pertahankan adapter API lama.
5. **Navigasi dan builder:** satukan metadata katalog, sembunyikan penjelajahan industri, terapkan sidebar kontekstual, dan migrasikan penyimpanan/ekspor.
6. **Pemasangan dan DX:** setelah desain recipe disepakati, tambahkan pemasangan halaman dan starter lengkap dari recipe/source yang sama; pertahankan Copy React/JSON sebagai jalur lanjutan.
7. **Verifikasi dan dokumentasi:** periksa perilaku, visual, registry, skill, instalasi bersih dari hasil ekspor, serta catat hasil review pemilik.

Kriteria akhir:

- Satu daftar marketing yang konsisten di docs dan builder; tidak ada entri duplikat hanya karena nama/industri/styling.
- Seluruh varian terpilih diperiksa di 375, 768, 1024, dan 1440 px, dua brand, kedua tema, serta follow website mode.
- Tidak ada overflow dokumen, heading terpotong, tumpukan elemen, atau fokus keyboard yang hilang.
- Logo Hudbird dan visual produk tampil sesuai tema di docs dan consumer hasil CLI.
- Reveal/ticker/slideshow bekerja di halaman penuh dan kanvas iframe; reduced motion, kontrol jeda, dan navigasi keyboard berfungsi.
- Keluar/masuk builder, refresh, urutan, visibility, brand, motion, dan React/JSON tetap konsisten.
- API/registry lama yang dipertahankan memiliki pemeriksaan kompatibilitas terhadap kontrak yang relevan.
- Tes terkait, type check paket yang berubah, dan build lulus. Error tipe legacy di docs dicatat terpisah; jangan menyatakan seluruh workspace bersih bila belum demikian.
- Review visual membandingkan hasil nyata dengan arah referensi, meliputi tipografi, spacing, surface, warna teks, media, dan gerakan. Pemeriksaan overflow otomatis saja tidak cukup untuk meluluskan kualitas visual.

Pelaksanaan belum termasuk publikasi npm, backend, checkout, atau penghapusan permanen API industri. Catat perubahan terhadap rencana ini bila hasil inventaris menunjukkan kebutuhan baru yang memengaruhi cakupan.
