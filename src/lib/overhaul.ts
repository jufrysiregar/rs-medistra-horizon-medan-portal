/**
 * Fitur "Total Overhaul" — selama perombakan besar, seluruh rute sub-menu
 * DINONAKTIFKAN dari sisi UI (link menjadi abu-abu, tidak bisa diklik),
 * KECUALI daftar rute aktif di bawah ini.
 *
 * CATATAN: ini hanya mematikan link di UI — file/kodingan halaman lain
 * tetap utuh dan bisa diakses manual lewat alamat URL.
 */
import { HALAMAN_KARIR, KARIR_IDS, hrefDetailKarir } from './karir';

export const OVERHAUL_ENABLED_ROUTES = ['/layanan/cek-kesehatan', '/layanan/membership', '/cari-dokter', '/layanan/poli-spesialis', '/layanan/ugd', '/layanan/fasilitas-rawat-inap', '/layanan/farmasi', '/layanan/laboratorium-medis', '/layanan/radiologi', '/layanan/sterilisasi', '/layanan/laundry', '/layanan/kantin', '/layanan/taman-bermain', '/layanan/ruang-operasi', '/layanan/icu-hdu-nicu', '/layanan/icu-hdu', '/layanan/nicu', '/layanan/hemodialisa', '/layanan/endoskopi', '/layanan/pelayanan-persalinan', '/layanan/kemoterapi', '/layanan/fisioterapi', '/informasi-pasien/alur-umum', '/informasi-pasien/alur-asuransi', '/informasi-pasien/alur-bpjs', '/informasi-pasien/kerjasama', '/informasi-pasien/navigasi-gedung', '/edukasi-kesehatan/artikel', '/edukasi-kesehatan/artikel/pola-hidup-sehat-cegah-hipertensi', '/edukasi-kesehatan/artikel/mitos-fakta-medical-checkup', '/edukasi-kesehatan/artikel/gejala-awal-diabetes-melitus', '/edukasi-kesehatan/panduan-sehat-mandiri', '/edukasi-kesehatan/berita-who', '/tentang-kami/profil', '/tentang-kami/event-promo', '/layanan/program-event',
  // Halaman detail Event & Promo: satu rute per slug di data/event-promo.json.
  // Bila menambah item baru di JSON-nya, tambahkan juga slug-nya di sini.
  '/tentang-kami/event-promo/webinar-stunting', '/tentang-kami/event-promo/promo-mcu', '/tentang-kami/event-promo/promo-mata', '/tentang-kami/event-promo/promo-gigi', '/tentang-kami/event-promo/sunat-massal',
  // Portal Karir: halaman list + satu rute detail per id di data/karir.json.
  // Daftarnya diturunkan dari JSON-nya, jadi menambah/menghapus loker tidak perlu
  // menyunting file ini lagi (lib/karir.ts murni, aman diimpor komponen klien).
  HALAMAN_KARIR, ...KARIR_IDS.map(hrefDetailKarir)];

/** true = link boleh diklik; false = tampil nonaktif (abu-abu, cursor-not-allowed). */
export const isRouteEnabled = (href: string): boolean => OVERHAUL_ENABLED_ROUTES.includes(href);
