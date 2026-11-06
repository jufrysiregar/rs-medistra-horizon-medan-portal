import dataKarir from '../data/karir.json';
import dataKarirEn from '../data/en/karir.json';
import { localize, tp } from './i18n';
import type { KarirLoker, Language } from '../types';

/**
 * SATU SUMBER DATA portal Karir (data/karir.json). Modul ini sengaja MURNI —
 * tidak memanggil next/headers — jadi helper-nya bisa dipakai Server Component
 * (page.tsx) maupun komponen 'use client' (kartu loker & modal pelamaran).
 * Urutan array = urutan tampilan: lowongan terbaru diletakkan paling atas.
 *
 * Varian Inggris ada di data/en/karir.json sebagai OVERLAY (pola lib/eventPromo.ts):
 * strukturnya identik dan urutannya sama, hanya leaf yang perlu diterjemahkan yang
 * ditulis (posisi, kategori, seluruh kualifikasi, dan lokasi bila bukan sekadar nama
 * kota). localize() menggabungkannya ke bentuk asal, sehingga tipe KarirLoker &
 * urutan data yang dikonsumsi komponen tidak berubah sama sekali.
 *
 * Karena modul ini tidak boleh menyentuh getLang(), bahasa aktif diikat lewat
 * argumen `lang` pada accessor-nya dan caller menampilkan sesuai kebutuhan:
 * page.tsx/[id]/page.tsx membaca getLang() di server, komponen klien memakai
 * language dari useLanguage(). Defaultnya 'id' = persis perilaku lama.
 */
const DAFTAR = dataKarir as KarirLoker[];

/** Semua lowongan, terurut sesuai isi JSON, dalam bahasa yang diminta. */
export function getKarir(lang: Language = 'id'): KarirLoker[] {
  return localize(DAFTAR, lang, dataKarirEn);
}

/** Id yang punya halaman detail /tentang-kami/karir/[id]. */
export const KARIR_IDS: number[] = DAFTAR.map((k) => k.id);

/** Satu loker berdasarkan id (string dari params atau number); undefined bila tak dikenal. */
export function getKarirById(id: string | number, lang: Language = 'id'): KarirLoker | undefined {
  const angka = typeof id === 'number' ? id : Number(id);
  if (!Number.isInteger(angka)) return undefined;
  return getKarir(lang).find((k) => k.id === angka);
}

/** Rute list, dipakai tombol "kembali" & daftar rute aktif overhaul. */
export const HALAMAN_KARIR = '/tentang-kami/karir';

/** URL halaman detail satu loker. */
export const hrefDetailKarir = (id: number): string => `${HALAMAN_KARIR}/${id}`;

/** Kualifikasi yang ditampilkan di kartu list; sisanya cukup diberi tanda "..." karena lengkapnya ada di dialog. */
export const KUALIFIKASI_TAMPIL = 3;

/* ========================== KATEGORI & FILTER ========================== */

/** Lima kategori tetap untuk panel filter loker. Nilainya harus SAMA persis dengan `kategori` di karir.json. */
export const KATEGORI_LIST = [
  'Medis & Spesialis',
  'Keperawatan & Kebidanan',
  'Penunjang Medis & Farmasi',
  'Umum, IT & Operasional',
  'Manajemen & Administrasi',
] as const;

export type KategoriKarir = (typeof KATEGORI_LIST)[number];

/**
 * Padanan bahasa Inggris untuk label, trigger & item dropdown kategori. Catatan:
 * kategori HANYA dipakai untuk pengelompokan (filter + pencarian), tidak lagi
 * dirender sebagai badge/tag di kartu maupun dialog, jadi tidak ada peta warna.
 */
export const KATEGORI_EN: Record<KategoriKarir, string> = {
  'Medis & Spesialis': 'Medical & Specialists',
  'Keperawatan & Kebidanan': 'Nursing & Midwifery',
  'Penunjang Medis & Farmasi': 'Medical Support & Pharmacy',
  'Umum, IT & Operasional': 'General, IT & Operations',
  'Manajemen & Administrasi': 'Management & Administration',
};

/**
 * Peta balik label Inggris -> nilai kategori Indonesia. Setelah overlay EN dipakai,
 * loker terlokalisasi menyimpan `kategori` berbahasa Inggris, sedangkan dropdown
 * filter selalu mengirim nilai Indonesia dari KATEGORI_LIST. Tanpa peta ini mode EN
 * akan menghasilkan nol hasil filter, jadi kedua sisi dinormalkan lebih dulu.
 */
const KATEGORI_KE_ID: Record<string, string> = Object.entries(KATEGORI_EN).reduce(
  (acc, [id, en]) => ({ ...acc, [en]: id }),
  {} as Record<string, string>
);

/** Nilai kategori apa pun (ID atau label EN) dikembalikan sebagai kunci Indonesia. */
const kategoriNorm = (kategori: string): string => KATEGORI_KE_ID[kategori] ?? kategori;

/**
 * Pemecah teks jadi daftar kata (huruf/angka tetap utuh, tanda baca jadi batas).
 * Dipakai dua sisi: kata kunci pengguna dan teks loker, jadi pencocokannya selevel.
 */
const pecahKata = (teks: string): string[] =>
  teks.toLowerCase().split(/[^a-z0-9&]+/).filter(Boolean);

/**
 * Kata kunci sepanjang PANJANG_AKRONIM atau kurang ("IT", "IGD", "MCU", "HCU") wajib
 * sama persis dengan SATU kata utuh; yang lebih panjang baru boleh jadi awalan kata.
 * Alasan: suku pendek adalah awalan dari banyak kata Indonesia yang tidak berhubungan,
 * jadi akronim yang diketik pelamar menyeret lowongan tak relevan. Bentuk panjang tetap
 * toleran ("perawat" -> "perawatan", "farmasi" -> "farmasi").
 */
const PANJANG_AKRONIM = 3;

const kataCocok = (kata: string, suku: string): boolean =>
  kata === suku || (suku.length > PANJANG_AKRONIM && kata.startsWith(suku));

/** Semua suku kata kunci harus ditemukan dalam satu daftar kata yang sama. */
const semuaCocok = (kata: string[], suku: string[]): boolean =>
  suku.every((s) => kata.some((k) => kataCocok(k, s)));

/**
 * Tingkat kecocokan satu loker terhadap kata kunci. Kategori TIDAK ikut dibaca:
 * pengelompokan hanya hidup di dropdown filter, dan labelnya (mis. "Umum, IT &
 * Operasional") adalah sumber "hantu": ketikan "IT" dulu menangkap semua anggota
 * kelompok itu walau tidak satu pun judul pekerjaannya berisi IT.
 *
 * 1 = semua suku ada di POSISI atau LOKASI (paling meyakinkan);
 * 2 = baru cocok kalau KUALIFIKASI ikut dibaca (cadangan saat tidak ada posisi yang pas);
 * 0 = tidak cocok sama sekali.
 */
export function tingkatCocokKarir(loker: KarirLoker, kataKunci: string): 0 | 1 | 2 {
  const suku = pecahKata(kataKunci);
  if (suku.length === 0) return 1;
  if (semuaCocok(pecahKata(`${loker.posisi} ${loker.lokasi}`), suku)) return 1;
  if (semuaCocok(pecahKata(loker.kualifikasi.join(' ')), suku)) return 2;
  return 0;
}

/**
 * Predikat filter satu loker (dipakai pemanggil lama): gerbang kategori lebih dulu,
 * lalu kata kunci. Pakai `saringKarir` di halaman list supaya penajaman tingkat 1/2
 * tidak hilang.
 */
export function cocokFilter(loker: KarirLoker, kataKunci: string, kategori: string): boolean {
  if (kategori && kategoriNorm(loker.kategori) !== kategoriNorm(kategori)) return false;
  return tingkatCocokKarir(loker, kataKunci) > 0;
}

/**
 * Pencarian bertingkat untuk list loker:
 * - selama ADA loker yang cocok di posisi/lokasi, hanya mereka yang ditampilkan —
 *   itu sebabnya "IGD" kini menghasilkan "Perawat IGD" saja, tidak lagi "Teknisi Alat
 *   Medis" yang cuma menyebut IGD di deretan kualifikasinya;
 * - kualifikasi baru dipakai kalau posisi/lokasi tidak cocok satu pun, jadi kata
 *   seperti "farmasi" atau "STR" tetap menemukan loker;
 * - `dariKualifikasi` menandai hasil cadangan supaya halaman bisa mengatakannya.
 * Kata kunci kosong mengembalikan seluruh items pada tingkat 1.
 */
export function saringKarir(
  items: KarirLoker[],
  kataKunci: string,
  kategori: string
): { hasil: KarirLoker[]; dariKualifikasi: boolean } {
  const dalamKategori = kategori
    ? items.filter((l) => kategoriNorm(l.kategori) === kategoriNorm(kategori))
    : items;
  const tingkat = dalamKategori.map((l) => ({ loker: l, t: tingkatCocokKarir(l, kataKunci) }));
  const utama = tingkat.filter((x) => x.t === 1);
  if (utama.length > 0) return { hasil: utama.map((x) => x.loker), dariKualifikasi: false };
  const cadangan = tingkat.filter((x) => x.t === 2);
  return { hasil: cadangan.map((x) => x.loker), dariKualifikasi: cadangan.length > 0 };
}

/* ========================== KONTAK PEREKRUTAN ========================== */

/** Alamat email HRD tujuan mailto. */
export const EMAIL_HRD = 'career@rs.medistrahorizonmdn@gmail.com';

/** Nomor WhatsApp HRD (format 62..., tanpa tanda +) untuk link wa.me. */
export const WA_HRD = '6282211223344';

/** Tautan profil perusahaan di Jobstreet. */
export const JOBSTREET_URL = 'https://www.jobstreet.co.id/anomali-link-karir';

/* ========================== WAKTU WIB ========================== */

const BULAN_SINGKAT = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

/**
 * Singkatan bulan Inggris, sejajar posisinya dengan BULAN_SINGKAT di atas. Hanya
 * Mei/Agu/Okt/Des yang benar-benar berbeda; sisanya sudah identik. "WIB" tetap
 * dipakai di kedua bahasa karena itu nama zona waktu, bukan teks Indonesia.
 */
const BULAN_SINGKAT_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * "2026-11-02T08:00:00" -> "02 Nov 2026, 08:00 WIB" (mode EN: "02 Oct 2026, 08:00 WIB").
 * Dikerjakan dengan regex pada string (bukan objek Date) supaya hasilnya identik di
 * server dan browser — tanpa bergantung locale/ICU dan tanpa pergeseran zona waktu.
 * Nilai yang tidak sesuai pola dikembalikan apa adanya, termasuk hasil format yang
 * sudah jadi, sehingga fungsi ini aman dipanggil ulang di atas nilainya sendiri.
 */
export function formatTanggalWIB(iso: string, lang: Language = 'id'): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(iso);
  if (!m) return iso;
  const [, tahun, bulan, tanggal, jam, menit] = m;
  const daftarBulan = lang === 'en' ? BULAN_SINGKAT_EN : BULAN_SINGKAT;
  const namaBulan = daftarBulan[Number(bulan) - 1] ?? bulan;
  return `${tanggal} ${namaBulan} ${tahun}, ${jam}:${menit} WIB`;
}

/**
 * Empat sapaan resmi sesuai rentang jam WIB. Sapaan ini HANYA dipakai terintegrasi
 * di dalam badan email & pesan WhatsApp, tidak lagi ditampilkan sebagai teks di UI.
 */
export type SapaanWIB = 'Selamat Pagi' | 'Selamat Siang' | 'Selamat Sore' | 'Selamat Malam';

/**
 * Padanan Inggris untuk sapaan WIB yang sama. Union SapaanWIB sengaja dibiarkan
 * berbahasa Indonesia supaya caller (dan state di modal) tidak berubah; hanya teks
 * yang keluar ke mailto/wa.me yang ikut bahasa.
 */
const SAPAAN_EN: Record<SapaanWIB, string> = {
  'Selamat Pagi': 'Good morning',
  'Selamat Siang': 'Good afternoon',
  'Selamat Sore': 'Good afternoon',
  'Selamat Malam': 'Good evening',
};

/**
 * Sapaan otomatis berdasarkan WIB (UTC+7): 04:00-10:59 pagi, 11:00-14:59 siang,
 * 15:00-17:59 sore, 18:00-03:59 malam. Jam diambil dari UTC lalu digeser +7 jam,
 * jadi tidak berubah walau perangkat pengunjung berada di zona waktu lain.
 *
 * PENTING: hanya dipanggil di sisi klien (setelah mount) karena nilainya bergantung
 * waktu, sehingga tidak memicu mismatch saat hidrasi.
 */
export function getGreetingWIB(sekarang: Date = new Date()): SapaanWIB {
  const jamWIB = (sekarang.getUTCHours() + 7) % 24;
  if (jamWIB >= 4 && jamWIB < 11) return 'Selamat Pagi';
  if (jamWIB >= 11 && jamWIB < 15) return 'Selamat Siang';
  if (jamWIB >= 15 && jamWIB < 18) return 'Selamat Sore';
  return 'Selamat Malam';
}

/* ========================== TUJUAN PELAMARAN ========================== */

/**
 * mailto: subject "[Posisi] - [Nama] - [Lokasi]" + badan surat. Nama yang belum
 * diisi dibiarkan sebagai placeholder [Nama] supaya pelamar bisa melanjutkannya
 * manual di aplikasi email mereka. Di mode EN seluruh badan surat (termasuk
 * placeholder [Name]) berbahasa Inggris sopan & profesional.
 */
export function linkEmailKarir(
  loker: KarirLoker,
  nama: string,
  sapaan: SapaanWIB,
  lang: Language = 'id'
): string {
  const pelamar = nama.trim() || tp(lang, '[Nama]', '[Name]');
  const subject = `${loker.posisi} - ${pelamar} - ${loker.lokasi}`;
  const body =
    lang === 'en'
      ? [
          'Dear HRD Team of Medistra Horizon Hospital Medan,',
          '',
          `${SAPAAN_EN[sapaan]}. My name is ${pelamar}, and I would like to apply for the ${loker.posisi} position (${loker.lokasi}) advertised on the Medistra Horizon Hospital website.`,
          'Please find attached my CV together with the supporting documents.',
          '',
          'Thank you very much for your time and consideration.',
        ].join('\r\n')
      : [
          'Halo Tim HRD RS Medistra Horizon Medan,',
          '',
          `${sapaan}. Saya ${pelamar}, melihat lowongan untuk posisi ${loker.posisi} (${loker.lokasi}) di website RS Medistra Horizon.`,
          'Bersama email ini saya bermaksud melamar dan melampirkan CV beserta dokumen pendukung.',
          '',
          'Terima kasih atas perhatian dan kesempatan yang diberikan.',
        ].join('\r\n');
  return `mailto:${EMAIL_HRD}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** wa.me dengan pesan otomatis yang menyisipkan sapaan WIB berjalan (ikut bahasa). */
export function linkWhatsAppKarir(loker: KarirLoker, sapaan: SapaanWIB, lang: Language = 'id'): string {
  const teks =
    lang === 'en'
      ? `Dear HRD Team, ${SAPAAN_EN[sapaan]}. I came across the ${loker.posisi} vacancy on the Medistra Horizon Hospital Medan website. I am very interested in applying and would like to attach my CV. Thank you.`
      : `Halo Pak/Bu HRD, ${sapaan}. Saya melihat loker untuk posisi ${loker.posisi} di website RS Medistra Horizon. Saya tertarik dan ingin melampirkan CV saya. Terima kasih.`;
  return `https://wa.me/${WA_HRD}?text=${encodeURIComponent(teks)}`;
}
