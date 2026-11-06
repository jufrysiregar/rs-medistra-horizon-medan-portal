import type { StaticImageData } from 'next/image';
import whoFallbackFoto from '@/images/hero/fasilitas/front.png';

/**
 * Modul RINGAN yang boleh ikut dibundle ke klien (konstanta + tipe Berita WHO).
 *
 * `fetchWHO.ts` memakai `next/headers` (via getLang) untuk menerjemahkan tanggal,
 * sehingga hanya boleh diimpor dari Server Component. Tipe data dan fallback
 * gambar yang juga dibutuhkan kartu berita (komponen klien) dipisah ke file ini
 * supaya tidak menarik next/headers ke bundle browser.
 */

/** Gambar premium ketika item feed tidak membawa enclosure/img. */
export const WHO_FALLBACK_FOTO: StaticImageData = whoFallbackFoto;

/** Bentuk siap-pakai untuk kartu berita (semua nilai string = aman ke props klien). */
export type WhoNews = {
  /** URL absolut artikel WHO — sekaligus kunci React yang stabil. */
  id: string;
  judul: string;
  link: string;
  /** Tanggal terbaca manusia, ikut bahasa aktif: "31 Okt 2026" / "31 Oct 2026". */
  tanggal: string;
  /** Milidetik unix — dipakai untuk mengurutkan, bukan untuk ditampilkan. */
  waktu: number;
  /** Ringkasan tanpa HTML (og:description artikel), dipotong maks 150 karakter. */
  ringkas: string;
  /** URL gambar asli WHO (https, host who.int). Undefined bila og:image gagal. */
  gambar?: string;
  /** Kategori resmi dari API WHO (NewsType): "News release", "Feature story", dll. */
  tipe?: string;
};
