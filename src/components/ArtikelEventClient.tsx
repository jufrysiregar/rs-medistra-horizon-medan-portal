'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { StaticImageData } from 'next/image';
import { CalendarDays, Clock, Newspaper } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SmartImage from './SmartImage';
import OverhaulLink from './OverhaulLink';
import WhoNewsCard from './WhoNewsCard';
import type { WhoNews } from '../lib/whoNewsTypes';
import type { EventPromo } from '../types';
import { eventPromoGambar } from '../data/eventPromoFoto';
import artikel1 from '../images/artikel/artikel-1.jpg';
import artikel2 from '../images/artikel/artikel-2.jpg';
import artikel3 from '../images/artikel/artikel-3.jpg';

interface Post {
  key: string;
  type: 'artikel' | 'event' | 'berita';
  img: string;
  /** Foto impor lokal (src/images) sebagai fallback selama file publik belum ada. */
  importFoto?: StaticImageData;
  /** Tanggal posting bilingual; bulan ikut bahasa aktif (Okt -> Oct). Opsional: kartu
   *  event hanya punya tanggal pelaksanaan, yang masuk ke baris berikon jam. */
  date?: { id: string; en: string };
  /** Khusus event: tanggal pelaksanaan, tampil di bawah tanggal posting dengan ikon jam.
   *  Label "Tanggal Acara:" sengaja tidak disimpan -- cukup ikon Clock-nya saja. */
  eventDate?: { id: string; en: string };
  title: { id: string; en: string };
  /** Isi lengkap; ditampilkan terpotong ala Facebook + "baca selengkapnya". */
  deskripsi: { id: string; en: string };
  href: string;
}

/** Potong teks di batas kata terdekat (~maks karakter) + elipsis, untuk preview singkat. */
function ringkas(teks: string, maks = 110): string {
  if (teks.length <= maks) return teks;
  const potong = teks.slice(0, maks);
  const batas = potong.lastIndexOf(' ');
  return `${potong.slice(0, batas > 0 ? batas : maks).replace(/[,.;:]\s*$/, '')}…`;
}

// Foto memakai placeholder SmartImage selama file publik belum ada; tinggal isi file
// aslinya di path ini tanpa mengubah kode. Satu kartu per kategori.
const POSTS: Post[] = [
  {
    key: 'artikel',
    type: 'artikel',
    img: '/images/beranda/artikel-1.jpg',
    importFoto: artikel1,
    date: { id: '26 Okt 2026', en: '26 Oct 2026' },
    title: {
      id: '5 Pola Hidup Sehat untuk Mencegah Risiko Hipertensi di Usia Muda',
      en: '5 Healthy Habits to Prevent High Blood Pressure Risk at a Young Age',
    },
    deskripsi: {
      id: 'Hipertensi atau tekanan darah tinggi seringkali dianggap sebagai penyakit orang tua. Padahal, seiring dengan gaya hidup modern saat ini, risiko hipertensi kini semakin mengintai kalangan anak muda remaja. Tekanan darah tinggi yang dibiarkan sejak dini dapat memicu komplikasi serius seperti penyakit jantung dan stroke di masa depan.',
      en: 'High blood pressure is often considered a disease of the elderly. In reality, with today\u2019s modern lifestyle, hypertension risk increasingly threatens teenagers and young adults. Left unchecked from an early age, high blood pressure can trigger serious complications such as heart disease and stroke later in life.',
    },
    href: '/edukasi-kesehatan/artikel/pola-hidup-sehat-cegah-hipertensi',
  },
  {
    key: 'artikel-2',
    type: 'artikel',
    img: '/images/beranda/artikel-2.jpg',
    importFoto: artikel2,
    date: { id: '24 Okt 2026', en: '24 Oct 2026' },
    title: {
      id: 'Mitos vs Fakta Seputar Medical Check-Up',
      en: 'Medical Check-Up: Myths vs Facts',
    },
    deskripsi: {
      id: 'Banyak yang takut MCU karena mitos mahal dan menyakitkan. Simak fakta sebenarnya beserta rekomendasi frekuensi cek kesehatan.',
      en: 'Many fear MCU over myths that it is costly and painful. Here are the real facts plus recommended screening frequency.',
    },
    href: '/edukasi-kesehatan/artikel/mitos-fakta-medical-checkup',
  },
  {
    key: 'artikel-3',
    type: 'artikel',
    img: '/images/beranda/artikel-3.jpg',
    importFoto: artikel3,
    date: { id: '20 Okt 2026', en: '20 Oct 2026' },
    title: {
      id: 'Gejala Awal Diabetes Melitus yang Sering Diabaikan',
      en: 'Early Diabetes Symptoms Often Ignored',
    },
    deskripsi: {
      id: 'Diabetes melitus seringkali dijuluki sebagai silent killer (pembunuh senyap). Julukan ini melekat karena penyakit ini kerap berkembang secara diam-diam tanpa disadari oleh penderitanya. Banyak orang baru mengetahui dirinya terkena diabetes setelah muncul komplikasi yang serius.',
      en: 'Diabetes mellitus is often called a silent killer. The label sticks because the disease frequently develops unnoticed. Many people only learn they have diabetes after serious complications appear.',
    },
    href: '/edukasi-kesehatan/artikel/gejala-awal-diabetes-melitus',
  },
];

/**
 * Event di beranda tidak lagi di-hardcode: yang dipakai prop `events` dari server
 * (sumber data event-promo.json, sama seperti menu Event & Promo), jadi SEMUA event
 * ikut tampil. Teksnya sudah dilokalisasi di server, maka `dua()` cukup membungkus
 * string jadi bentuk {id,en} supaya renderer kartu tidak perlu bercabang dua jalur.
 */
const dua = (teks: string) => ({ id: teks, en: teks });

const eventKePost = (e: EventPromo): Post => {
  const gambar = eventPromoGambar(e);
  return {
    key: e.slug,
    type: 'event',
    /* Peta eventPromoFoto.ts (E-01.jpg webinar, E-02.jpg sunat) adalah sumber utama, jadi
       gambar beranda dijamin identik dengan kartu di halaman Event & Promo. URL hasil
       import dipakai langsung -- tidak lewat probe path publik yang memang tidak ada. */
    img: typeof gambar === 'string' ? gambar : gambar?.src ?? '',
    /* Data event cuma punya satu tanggal, yaitu tanggal pelaksanaan: ia masuk ke baris
       berikon jam, bukan baris kalender. */
    eventDate: dua(e.date),
    title: dua(e.title),
    deskripsi: dua(e.description),
    href: `/tentang-kami/event-promo/${e.slug}`,
  };
};

/**
 * 3 tab kategori, masing-masing kotak rounded dengan warnanya sendiri.
 * `aktif` = warna solid (lagi dipilih), `pasif` = warna muda. Aksi pergantian
 * kontennya menyusul sesuai instruksi user.
 */
const KATEGORI = [
  {
    key: 'artikel',
    label: { id: 'Artikel', en: 'Articles' },
    aktif: 'bg-emerald-500 text-white shadow-sm',
    pasif: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200 hover:bg-emerald-100',
  },
  {
    key: 'event',
    label: { id: 'Event', en: 'Events' },
    aktif: 'bg-orange-500 text-white shadow-sm',
    pasif: 'bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-200 hover:bg-orange-100',
  },
  {
    key: 'berita',
    label: { id: 'Berita', en: 'News' },
    aktif: 'bg-black text-white shadow-sm',
    pasif: 'bg-neutral-100 text-neutral-800 ring-1 ring-inset ring-neutral-300 hover:bg-neutral-200',
  },
] as const;
type KategoriKey = (typeof KATEGORI)[number]['key'];

/**
 * Kotak CTA "lihat lainnya". Persegi panjang bersudut SIKE (`rounded-none`) -- versi
 * rounded-2xl terasa tidak presisi karena lengkungnya memakan sudut kotak. Panah sengaja
 * dilepas; garis bawahnya dibuat persis sepanjang tulisan dengan memasang `underline`
 * pada span inline di DALAM kotak, bukan pada induknya -- decoration pada elemen blok
 * memanjang sampai lebar kotak. Transisi dibatasi ke filter/shadow saja supaya tidak
 * bentrok dengan transform inline yang ditulis Framer Motion pada elemen pembungkusnya.
 */
const kotakCta = (warna: string) =>
  `inline-flex min-h-[44px] w-full items-center justify-center rounded-none px-7 py-4 text-base font-bold text-white shadow-lg transition-[filter,box-shadow] duration-300 hover:brightness-110 active:brightness-95 sm:w-auto ${warna}`;
const GARIS_CTA = 'underline decoration-[3px] underline-offset-[7px]';

/** CTA tab Artikel & Event, ditaruh di BAWAH grid (dulu sel keempat di samping kartu). */
const CTA_LAINNYA: Record<'artikel' | 'event', { href: string; label: { id: string; en: string }; warna: string }> = {
  artikel: {
    href: '/edukasi-kesehatan/artikel',
    label: { id: 'Lihat Artikel Lainnya', en: 'View Other Articles' },
    warna: 'bg-emerald-500 shadow-emerald-500/25',
  },
  event: {
    href: '/tentang-kami/event-promo',
    label: { id: 'Lihat Event Lainnya', en: 'View Other Events' },
    warna: 'bg-orange-500 shadow-orange-500/25',
  },
};

export const ArtikelEventClient: React.FC<{ beritaWHO: WhoNews[]; events: EventPromo[] }> = ({
  beritaWHO,
  events,
}) => {
  const { language, t } = useLanguage();
  const [kategori, setKategori] = React.useState<KategoriKey>('artikel');
  // Tab Artikel dari POSTS statis; tab Event dari data Event & Promo (semua event);
  // tab Berita diisi RSS WHO (3 terbaru).
  const tampil = kategori === 'event' ? events.map(eventKePost) : POSTS.filter((p) => p.type === kategori);

  /* CTA di bawah grid; tab Berita sudah punya tombol sendiri di BeritaWhoBlock.
     Ditentukan di luar JSX supaya TypeScript tidak ikut mempersempit `kategori`. */
  const cta = kategori === 'berita' ? null : CTA_LAINNYA[kategori];

  return (
    <section className="w-full bg-slate-50 py-12 sm:py-16 lg:py-32">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        {/* Header: rata kiri + View All spread ke kanan */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          {/* Batas max-w-2xl dulu dipasang di pembungkusnya, jadi judul 34 karakter ikut
              tercekik ke 672px dan melipat dua baris. Sekarang batas itu hanya membatasi
              paragraf; judul bebas memakai lebar kolom kiri (~857px di max-w-7xl), cukup
              untuk "Artikel, Event, dan Berita Terbaru" sebaris pada 54px.
              Paragraf naik ke max-w-3xl (768px): dari pengukuran screenshot, total tinta
              subtitle ID ~1346px dan baris keduanya butuh 682px, jadi 672px (max-w-2xl)
              persis kekurangan satu kata -- "sehat." jatuh ke baris ketiga. Di 768px,
              ID dan EN (154 karakter, ~1363px) sama-sama jadi dua baris. */}
          <div>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-[2.75rem] lg:text-[44px] xl:text-[54px]">
              {t('articlesTitle')}
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">{t('articlesSubtitle')}</p>
          </div>
          {/* Tab kategori: tiap kategori satu kotak rounded, beda warna. Saat ini hanya
              memindahkan state tab aktif; aksi ganti informasinya menyusul. */}
          <div role="tablist" aria-label={t('articlesTitle')} className="flex shrink-0 flex-wrap gap-3">
            {KATEGORI.map((k) => {
              const aktif = kategori === k.key;
              return (
                <button
                  key={k.key}
                  type="button"
                  role="tab"
                  aria-selected={aktif}
                  onClick={() => setKategori(k.key)}
                  className={`min-h-[44px] rounded-2xl px-5 py-2.5 text-base font-bold transition-colors ${
                    aktif ? k.aktif : k.pasif
                  }`}
                >
                  {k.label[language]}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Tab Berita = kartu RSS WHO (3 terbaru). Tab Artikel & Event: grid 3 kolom rata --
            kolom keempat khusus tombol "lihat lainnya" sudah dihapus karena CTA-nya pindah
            ke bawah grid. */}
        {kategori === 'berita' ? (
          <BeritaWhoBlock berita={beritaWHO} />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8 lg:grid-cols-3">
              {tampil.map((p, i) => (
                <motion.div
                  key={p.key}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: 'easeOut' }}
                >
                  <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/60 bg-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_18px_50px_rgb(0,0,0,0.12)]">
                    <div className="relative h-52 overflow-hidden">
                      <SmartImage
                        src={p.img}
                        alt={p.title[language]}
                        placeholderLabel={p.title[language]}
                        fallbackImport={p.importFoto?.src}
                        className="h-full w-full"
                        imgClassName="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      {/* Rata kanan di bawah foto: artikel cukup tanggal posting,
                          event hanya tanggal pelaksanaan (baris jam) dan dia rata KIRI --
                          pembedanya ada tidaknya tanggal posting, jadi kedua kelas ditulis
                          literal supaya ikut dibangkitkan Tailwind. */}
                      <div
                        className={`flex flex-col gap-1 text-sm font-medium text-slate-500 ${
                          p.date ? 'items-end' : 'items-start'
                        }`}
                      >
                        {p.date && (
                          <span className="inline-flex items-center gap-2">
                            <CalendarDays className="h-4 w-4" />
                            {p.date[language]}
                          </span>
                        )}
                        {/* Tanggal pelaksanaan event: ikon jam bulat menggantikan label teks. */}
                        {p.eventDate && (
                          <span className="inline-flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {p.eventDate[language]}
                          </span>
                        )}
                      </div>

                      <h3 className="mt-3 text-xl font-bold leading-snug text-slate-900">{p.title[language]}</h3>

                      {/* Deskripsi dipotong ala Facebook + "baca selengkapnya" menuju halaman artikel. */}
                      <p className="mt-3 text-base leading-relaxed text-slate-600">
                        {ringkas(p.deskripsi[language])}{' '}
                        <OverhaulLink
                          href={p.href}
                          className="font-semibold lowercase text-navy-900 underline-offset-2 transition-colors duration-200 hover:text-emerald-600 hover:underline active:text-emerald-800"
                        >
                          {t('articlesReadMore')}
                        </OverhaulLink>
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

            </div>

            {/* Kotak CTA di tengah bawah grid, warna mengikuti tab aktif. */}
            {cta && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
                className="mt-12 flex justify-center"
              >
                <OverhaulLink href={cta.href} className={kotakCta(cta.warna)}>
                  <span className={GARIS_CTA}>{cta.label[language]}</span>
                </OverhaulLink>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ArtikelEventClient;

/**
 * Isi tab Berita: 3 kartu RSS WHO (desain sama persis dengan halaman
 * /edukasi-kesehatan/berita-who) + tombol "Lihat Berita Selengkapnya".
 * Bila pengambilan feed gagal, ditampilkan status kosong yang sopan.
 */
const BeritaWhoBlock: React.FC<{ berita: WhoNews[] }> = ({ berita }) => {
  const { language } = useLanguage();

  if (!berita.length) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-slate-300 bg-white/70 px-6 py-16 text-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <Newspaper className="h-7 w-7" />
        </span>
        <p className="max-w-xl text-lg font-semibold text-slate-600">
          {language === 'en'
            ? 'WHO news is temporarily unavailable. Please check again shortly.'
            : 'Berita WHO sementara tidak dapat dimuat. Silakan cek kembali sebentar lagi.'}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8 lg:grid-cols-3">
        {berita.map((b, i) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: 'easeOut' }}
          >
            <WhoNewsCard berita={b} lang={language} sizes="(max-width: 768px) 100vw, 33vw" />
          </motion.div>
        ))}
      </div>

      {/* Kotak hitam di tengah bawah, sama seperti CTA tab lain: panah dilepas, garis
          bawah cuma sepanjang tulisannya (span inline, bukan lebar kotak). */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
        className="mt-12 flex justify-center"
      >
        <OverhaulLink href="/edukasi-kesehatan/berita-who" className={kotakCta('bg-black shadow-black/25')}>
          <span className={GARIS_CTA}>{language === 'en' ? 'See All News' : 'Lihat Semua Berita'}</span>
        </OverhaulLink>
      </motion.div>
    </>
  );
};
