'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Baby,
  Brain,
  Clock,
  HeartPulse,
  Layers,
  RefreshCw,
  Salad,
  Search,
  Sparkles,
  Stethoscope,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import type { Language } from '../../../types';
import OverhaulLink from '../../../components/OverhaulLink';
import ArtikelNewsletter from './ArtikelEdukasiWidgets';
import heroFoto from '../../../images/artikel/hero.jpg';
import artikel1Foto from '../../../images/artikel/artikel-1.jpg';
import artikel2Foto from '../../../images/artikel/artikel-2.jpg';
import artikel3Foto from '../../../images/artikel/artikel-3.jpg';

type Teks = { id: string; en: string };
type Ikon = React.ComponentType<{ className?: string }>;
type KatKey = 'all' | 'jantung' | 'ibu-anak' | 'gizi' | 'dalam' | 'saraf' | 'tips';

/* Hotline eksternal (selalu aktif melewati gerbang OverhaulLink). */
const WA_LINK = 'https://wa.me/6281144415515';
const WA_TEXT: Teks = {
  id: 'Halo%20RS%20Medistra%20Horizon%20Medan,%20saya%20ingin%20konsultasi%20terkait%20artikel%20kesehatan.',
  en: 'Hello%20Medistra%20Horizon%20Hospital%20Medan,%20I%20would%20like%20to%20ask%20about%20a%20health%20article.',
};

/** Logo WhatsApp resmi (Simple Icons, CC0) — lucide-react tidak punya ikon brand WA. */
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.5-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.641 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

/* ========================= META KATEGORI ARTIKEL ========================= */

const META_KAT: Record<Exclude<KatKey, 'all'>, { label: Teks; ikon: Ikon; grad: string }> = {
  jantung: { label: { id: 'Jantung', en: 'Heart' }, ikon: HeartPulse, grad: 'from-cyan-500 to-blue-600' },
  'ibu-anak': { label: { id: 'Ibu & Anak', en: 'Mother & Child' }, ikon: Baby, grad: 'from-sky-400 to-indigo-400' },
  gizi: { label: { id: 'Gizi & Gaya Hidup', en: 'Nutrition & Lifestyle' }, ikon: Salad, grad: 'from-emerald-400 to-teal-500' },
  dalam: { label: { id: 'Penyakit Dalam', en: 'Internal Medicine' }, ikon: Stethoscope, grad: 'from-teal-400 to-cyan-500' },
  saraf: { label: { id: 'Saraf', en: 'Neurology' }, ikon: Brain, grad: 'from-indigo-400 to-blue-500' },
  tips: { label: { id: 'Tips Sehat', en: 'Health Tips' }, ikon: Sparkles, grad: 'from-cyan-400 to-teal-400' },
};

/* ============================ POOL ARTIKEL ============================ */

type Artikel = {
  kategori: Exclude<KatKey, 'all'>;
  judul: Teks;
  ringkas: Teks;
  tanggal: Teks;
  menit: number;
  /** Slug internal: bila diisi, "Baca Selengkapnya" jadi tautan ke halaman artikel. */
  slug?: string;
  /** Foto thumbnail; bila ada, menggantikan gradien + ikon kategori. */
  foto?: StaticImageData;
};

const ARTIKEL: Artikel[] = [
  {
    kategori: 'jantung',
    slug: '/edukasi-kesehatan/artikel/pola-hidup-sehat-cegah-hipertensi',
    foto: artikel1Foto,
    judul: {
      id: '5 Pola Hidup Sehat untuk Mencegah Risiko Hipertensi di Usia Muda',
      en: '5 Healthy Habits to Prevent Hypertension Risk at a Young Age',
    },
    ringkas: {
      id: 'Ketahui faktor penyebab hipertensi sejak dini dan pelajari langkah praktis menjaga tekanan darah tetap stabil, mulai dari mengurangi garam, mengelola stres, hingga rutin bergerak.',
      en: 'Learn the early causes of hypertension and practical steps to keep your blood pressure stable, from cutting salt and managing stress to staying active.',
    },
    tanggal: { id: '26 Okt 2026', en: '26 Oct 2026' },
    menit: 4,
  },
  {
    kategori: 'tips',
    slug: '/edukasi-kesehatan/artikel/mitos-fakta-medical-checkup',
    foto: artikel2Foto,
    judul: { id: 'Mitos vs Fakta Seputar Medical Check-Up', en: 'MCU Myths vs Facts' },
    ringkas: {
      id: 'Banyak yang takut MCU karena mitos mahal dan menyakitkan. Simak fakta sebenarnya beserta rekomendasi frekuensi cek kesehatan.',
      en: 'Many fear MCU over myths that it is costly and painful. Here are the real facts plus recommended screening frequency.',
    },
    tanggal: { id: '24 Okt 2026', en: '24 Oct 2026' },
    menit: 5,
  },
  {
    kategori: 'dalam',
    slug: '/edukasi-kesehatan/artikel/gejala-awal-diabetes-melitus',
    foto: artikel3Foto,
    judul: { id: 'Gejala Awal Diabetes Melitus yang Sering Diabaikan', en: 'Early Diabetes Symptoms Often Ignored' },
    ringkas: {
      id: 'Sering haus, cepat lapar, dan luka sulit sembuh bisa jadi sinyal gula darah tinggi. Kenali tandanya sebelum komplikasi datang.',
      en: 'Excessive thirst, hunger, and slow-healing wounds may signal high blood sugar. Spot the signs before complications arise.',
    },
    tanggal: { id: '20 Okt 2026', en: '20 Oct 2026' },
    menit: 6,
  },
  {
    kategori: 'ibu-anak',
    judul: { id: 'Kapan Anak Perlu Dibawa ke Dokter?', en: 'When Should a Child See a Doctor?' },
    ringkas: {
      id: 'Demam, muntah, atau perubahan perilaku pada anak kerap membingungkan orang tua. Ini panduan kapan harus waspada dan segera periksa.',
      en: 'Fever, vomiting, or behaviour changes in children often puzzle parents. A guide on when to be alert and seek care.',
    },
    tanggal: { id: '18 Okt 2026', en: '18 Oct 2026' },
    menit: 4,
  },
  {
    kategori: 'jantung',
    judul: { id: 'Menjaga Kesehatan Jantung Sejak Usia Produktif', en: 'Caring for Your Heart from Early Adulthood' },
    ringkas: {
      id: 'Jantung sehat dibangun lewat kebiasaan harian. Kombinasi aktivitas fisik, tidur cukup, dan kontrol tekanan darah terbukti menurunkan risiko.',
      en: 'A healthy heart is built on daily habits. Combining physical activity, enough sleep, and blood-pressure control lowers risk.',
    },
    tanggal: { id: '15 Okt 2026', en: '15 Oct 2026' },
    menit: 5,
  },
  {
    kategori: 'gizi',
    judul: { id: 'Pola Makan Sehat untuk Pemulihan Pasca Stroke', en: 'A Healthy Diet for Post-Stroke Recovery' },
    ringkas: {
      id: 'Nutrisi tepat mempercepat pemulihan pasca stroke. Panduan tekstur makanan, cairan, dan asupan natrium yang aman untuk pasien.',
      en: 'Proper nutrition speeds post-stroke recovery. A guide to food texture, fluids, and safe sodium intake for patients.',
    },
    tanggal: { id: '12 Okt 2026', en: '12 Oct 2026' },
    menit: 7,
  },
  {
    kategori: 'saraf',
    judul: { id: 'Manfaat Fisioterapi untuk Pemulihan Gerak', en: 'Benefits of Physiotherapy for Movement Recovery' },
    ringkas: {
      id: 'Dari cedera olahraga hingga stroke, fisioterapi membantu mengembalikan kemandirian gerak. Kapan waktu terbaik memulai dan apa harapannya.',
      en: 'From sports injuries to stroke, physiotherapy restores movement independence. When to start and what to expect.',
    },
    tanggal: { id: '10 Okt 2026', en: '10 Oct 2026' },
    menit: 5,
  },
  {
    kategori: 'tips',
    judul: { id: 'Tidur Berkualitas untuk Meningkatkan Imunitas', en: 'Quality Sleep to Boost Immunity' },
    ringkas: {
      id: 'Kurang tidur melemahkan daya tahan tubuh. Kenali durasi ideal, rutinitas malam, dan kebiasaan kecil yang memperbaiki kualitas istirahat.',
      en: 'Poor sleep weakens immunity. Learn the ideal duration, night routines, and small habits that improve rest quality.',
    },
    tanggal: { id: '6 Okt 2026', en: '6 Oct 2026' },
    menit: 4,
  },
  {
    kategori: 'ibu-anak',
    judul: { id: 'Panduan Gizi Seimbang untuk Ibu Hamil', en: 'A Balanced Nutrition Guide for Expecting Mothers' },
    ringkas: {
      id: 'Kebutuhan nutrisi berubah tiap trimester. Panduan asupan protein, zat besi, dan asam folat untuk ibu dan janin yang sehat.',
      en: 'Nutritional needs shift each trimester. A guide to protein, iron, and folate intake for a healthy mother and baby.',
    },
    tanggal: { id: '2 Okt 2026', en: '2 Oct 2026' },
    menit: 6,
  },
  {
    kategori: 'jantung',
    judul: { id: 'Kenali Tanda Awal Hipertensi pada Usia Muda', en: 'Spotting Early Hypertension in Young Adults' },
    ringkas: {
      id: 'Hipertensi dijuluki silent killer karena sering tanpa gejala. Tanda halus yang patut diwaspadai dan cara memantau tensi di rumah.',
      en: 'Hypertension is dubbed the silent killer for often having no symptoms. Subtle warning signs and how to monitor BP at home.',
    },
    tanggal: { id: '28 Sep 2026', en: '28 Sep 2026' },
    menit: 5,
  },
];

const PER_HALAMAN = 6;

/* ============================ SUB-KOMPONEN ============================ */

/** Kartu artikel pada grid: thumbnail gradien + teks editorial rata kiri. */
const ArticleCard: React.FC<{ a: Artikel; i: number; lang: Language }> = ({ a, i, lang }) => {
  const L = (t: Teks) => t[lang];
  const meta = META_KAT[a.kategori];
  const IkonKat = meta.ikon;
  return (
    /* Blur-in zoom: kartu datang dari sedikit lebih besar sambil blur menipis sampai
       tajam. cubic-bezier (0.22,1,0.36,1) = easeOutQuint, jadi 80% gerakannya terjadi
       di awal lalu mengendap pelan — bukan spring. Pemicunya `whileInView`, bukan
       `animate`: grid ada di bawah hero + bar pencarian, jadi animasi yang jalan saat
       mount biasanya terlewat karena kartunya masih di luar layar. */
    <motion.article
      initial={{ opacity: 0, scale: 1.18, filter: 'blur(14px)' }}
      whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      whileHover={{ y: -6 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.09 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl"
    >
      {/* Thumbnail: foto (bila ada) atau gradien terang + ikon kategori */}
      {a.foto ? (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={a.foto}
            alt={L(a.judul)}
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className={`relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br ${meta.grad}`}>
          <div aria-hidden className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/15" />
          <div aria-hidden className="absolute -bottom-8 -left-4 h-24 w-24 rounded-full bg-white/10" />
          <IkonKat className="h-16 w-16 text-white drop-shadow" />
        </div>
      )}

      {/* Body teks */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-end text-sm font-semibold text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-cyan-600" />
            {L(a.tanggal)}
          </span>
        </div>
        <h3 className="mt-3 text-2xl font-extrabold leading-snug tracking-tight text-slate-900">{L(a.judul)}</h3>
        <p className="mt-3 line-clamp-2 text-base leading-relaxed text-slate-600">{L(a.ringkas)}</p>
        {a.slug ? (
          <OverhaulLink
            href={a.slug}
            className="mt-auto inline-flex items-center gap-1.5 pt-5 text-base font-bold text-cyan-700 transition-all group-hover:gap-2.5 group-hover:text-cyan-800 group-hover:underline"
          >
            {lang === 'en' ? 'Read More' : 'Baca Selengkapnya'}
            <ArrowRight className="h-5 w-5" />
          </OverhaulLink>
        ) : (
          <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-base font-bold text-cyan-700 transition-all group-hover:gap-2.5 group-hover:text-cyan-800 group-hover:underline">
            {lang === 'en' ? 'Read More' : 'Baca Selengkapnya'}
            <ArrowRight className="h-5 w-5" />
          </span>
        )}
      </div>
    </motion.article>
  );
};

/* ================================ RENDER ================================ */

const ArtikelEdukasiClient: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (t: Teks) => t[lang];

  /* Draft = isi kolom pencarian; query = kata kunci yang sudah diterapkan (pola sama seperti Cari Dokter). */
  const [draft, setDraft] = useState('');
  const [query, setQuery] = useState('');
  const [halaman, setHalaman] = useState(0);

  const q = query.trim().toLowerCase();

  const hasil = useMemo(
    () =>
      ARTIKEL.filter((a) => {
        if (!q) return true;
        return (
          a.judul.id.toLowerCase().includes(q) ||
          a.judul.en.toLowerCase().includes(q) ||
          a.ringkas.id.toLowerCase().includes(q) ||
          a.ringkas.en.toLowerCase().includes(q)
        );
      }),
    [q],
  );

  const totalHalaman = Math.max(1, Math.ceil(hasil.length / PER_HALAMAN));
  const terlihat = hasil.slice(halaman * PER_HALAMAN, (halaman + 1) * PER_HALAMAN);

  const terapkanCari = () => {
    setQuery(draft);
    setHalaman(0);
  };
  const batalkanCari = () => {
    setDraft('');
    setQuery('');
    setHalaman(0);
  };

  return (
    <div className="bg-white text-slate-800">
      {/* ============ 1. HERO (BG HERO.JPG + BLUR PUTIH DI SISI KIRI-KANAN) ============ */}
      <section className="relative flex min-h-[50vh] items-center overflow-hidden bg-white">
        <Image
          src={heroFoto}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-right md:object-center"
        />
        {/* Blur putih di tepi kiri & kanan (lebar ±22%): paling pekat di pinggir,
            lalu melebur hilang sebelum sampai ke tengah. */}
        <div className="absolute inset-y-0 left-0 w-[22%] bg-gradient-to-r from-white/85 via-white/40 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-[22%] bg-gradient-to-l from-white/85 via-white/40 to-transparent" />
        {/* Tambahan blur putih tipis di tengah: haze berbentuk radial (bukan kotak)
            yang melembutkan area judul & deskripsi lalu hilang sendiri ke tepi. */}
        <div className="absolute inset-0 bg-[radial-gradient(62%_58%_at_50%_50%,rgba(255,255,255,0.5),rgba(255,255,255,0)_72%)]" />

        <div className="relative mx-auto w-full max-w-5xl px-6 py-24 text-center lg:px-12 lg:py-28">
          {/* Tanpa veil gelap di tengah, jadi keterbacaan dijamin lewat halo putih
              (text-shadow terang) di belakang huruf, bukan kotak/panel. */}
          <h1 className="text-6xl font-extrabold leading-[1.02] tracking-tight text-slate-900 [text-shadow:0_1px_26px_rgba(255,255,255,0.95),0_0_6px_rgba(255,255,255,0.8)] lg:text-8xl">
            {L({ id: 'Artikel', en: 'Articles' })}
          </h1>
          <p className="mx-auto mt-8 max-w-3xl text-2xl leading-relaxed text-slate-800 [text-shadow:0_1px_20px_rgba(255,255,255,0.95),0_0_5px_rgba(255,255,255,0.75)]">
            {L({
              id: 'Temukan informasi medis terpercaya, tips kesehatan, dan artikel yang ditinjau langsung oleh Tim Dokter Spesialis RS Medistra Horizon Medan.',
              en: 'Find trusted medical information, health tips, and articles reviewed directly by the Specialist Doctor Team of Medistra Horizon Hospital Medan.',
            })}
          </p>
        </div>
      </section>

      {/* ============ 2. KOLOM PENCARIAN (CARI / BATALKAN, gaya Cari Dokter) ============ */}
      <section className="relative z-10 bg-white pt-2 pb-6">
        <div className="mx-auto w-full max-w-5xl px-6 lg:px-12">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              terapkanCari();
            }}
            className="flex flex-col items-stretch gap-3 rounded-3xl border border-slate-200 bg-white p-3 shadow-lg shadow-slate-200/50 lg:flex-row lg:items-center lg:rounded-full lg:p-2"
          >
            <div className="relative w-full lg:flex-1">
              <Search className="pointer-events-none absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                aria-label={L({ id: 'Cari artikel', en: 'Search articles' })}
                placeholder={L({ id: 'Cari topik, gejala, atau artikel…', en: 'Search topics, symptoms, or articles…' })}
                className="w-full rounded-2xl border-none bg-slate-50 py-4 pl-14 pr-5 text-lg text-slate-800 placeholder:text-slate-400 focus:bg-cyan-50/60 focus:outline-none focus:ring-4 focus:ring-cyan-100 lg:rounded-full"
              />
            </div>

            {/* Divider vertikal tipis (desktop), sama seperti single-bar Cari Dokter */}
            <div aria-hidden className="mx-1 hidden h-8 w-px shrink-0 bg-slate-300 lg:block" />

            <div className="flex gap-3 lg:shrink-0">
              <button
                type="submit"
                className="flex-1 rounded-full bg-gradient-to-r from-cyan-600 to-teal-600 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-cyan-600/25 transition-all hover:brightness-110 hover:shadow-teal-500/30 lg:flex-none"
              >
                {L({ id: 'Cari', en: 'Search' })}
              </button>
              <button
                type="button"
                onClick={batalkanCari}
                disabled={!draft && !query}
                className="flex-1 rounded-full border border-slate-200 bg-white px-8 py-3.5 text-base font-bold text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 lg:flex-none"
              >
                {L({ id: 'Batalkan', en: 'Cancel' })}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ============ 3. SEMUA ARTIKEL (GRID MAKS 6 PER HALAMAN) ============ */}
      <section id="daftar" className="scroll-mt-28 bg-slate-50 py-16">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                {L({ id: 'Semua Artikel', en: 'All Articles' })}
              </h2>
              <p className="mt-2 text-lg font-light italic text-slate-500">
                {L({
                  id: 'Kesehatan itu emas, maka jaga dari sekarang.',
                  en: 'Health is gold, so protect it starting now.',
                })}
              </p>
            </div>

            {/* Pagination sejajar judul (kanan): Sebelumnya / Selanjutnya */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setHalaman((n) => Math.max(0, n - 1))}
                disabled={halaman === 0}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-base font-bold text-slate-700 shadow-sm transition-all hover:border-cyan-300 hover:text-cyan-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowRight className="h-5 w-5 rotate-180" />
                {L({ id: 'Sebelumnya', en: 'Previous' })}
              </button>
              <span className="text-base font-bold text-slate-500">
                {halaman + 1} / {totalHalaman}
              </span>
              <button
                type="button"
                onClick={() => setHalaman((n) => Math.min(totalHalaman - 1, n + 1))}
                disabled={halaman >= totalHalaman - 1}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 px-5 py-3 text-base font-bold text-white shadow-md shadow-cyan-600/25 transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {L({ id: 'Selanjutnya', en: 'Next' })}
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {hasil.length === 0 ? (
            <div className="mt-12 flex flex-col items-center rounded-3xl border border-dashed border-slate-300 bg-white px-8 py-16 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <Search className="h-8 w-8" />
              </span>
              <h3 className="mt-5 text-2xl font-extrabold text-slate-900">
                {L({ id: 'Artikel tidak ditemukan', en: 'No articles found' })}
              </h3>
              <p className="mt-2 max-w-md text-lg text-slate-600">
                {L({
                  id: 'Coba kata kunci lain atau tekan "Batalkan" untuk melihat seluruh artikel.',
                  en: 'Try different keywords or press "Cancel" to see all articles.',
                })}
              </p>
              <button
                type="button"
                onClick={batalkanCari}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-700 px-6 py-3 text-base font-bold text-white shadow-lg shadow-cyan-600/25 transition-all hover:from-cyan-700 hover:to-blue-800"
              >
                <RefreshCw className="h-5 w-5" />
                {L({ id: 'Reset Pencarian', en: 'Reset Search' })}
              </button>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {terlihat.map((a, i) => (
                <ArticleCard key={a.judul.id} a={a} i={i} lang={lang} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ====== 4+5. SPLIT BANNER TERPADU (KONSULTASI + LANGGANAN, 2 KOLOM) ====== */}
      <section className="bg-white py-16">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8"
          >
            {/* Header kontainer luar */}
            <div className="px-3 pb-4 pt-2">
              <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-cyan-700">
                <Layers className="h-4 w-4" />
                {L({ id: 'Konversi & Edukasi Kesehatan Terpadu', en: 'Integrated Conversion & Health Education' })}
              </span>
            </div>
            <div className="h-px w-full bg-slate-200" />

            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Kiri (50%): tindakan cepat, high intent */}
              <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-7 lg:p-9">
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-cyan-100/70 px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-cyan-800">
                  <HeartPulse className="h-4 w-4" />
                  {L({ id: 'Konsultasi Ahli', en: 'Expert Consultation' })}
                </span>
                <h3 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight text-slate-900 lg:text-3xl">
                  {L({ id: 'Punya Keluhan Kesehatan?', en: 'Have a Health Concern?' })}
                </h3>
                <p className="mt-3 text-lg leading-relaxed text-slate-600">
                  {L({
                    id: 'Jangan tunggu gejala memberat. Jadwalkan konsultasi langsung dengan dokter spesialis kami.',
                    en: "Don't wait for symptoms to worsen. Book a direct consultation with our specialist doctors.",
                  })}
                </p>
                <div className="mt-auto flex flex-col gap-4 pt-8 sm:flex-row">
                  <OverhaulLink
                    href="/cari-dokter"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-700 px-6 py-4 text-lg font-bold text-white shadow-lg shadow-cyan-600/25 transition-all hover:from-cyan-700 hover:to-blue-800 hover:shadow-xl"
                  >
                    <Search className="h-5 w-5" />
                    {L({ id: 'Cari Dokter & Janji', en: 'Find a Doctor & Book' })}
                  </OverhaulLink>
                  <OverhaulLink
                    href={`${WA_LINK}?text=${WA_TEXT[lang]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4 text-lg font-bold text-white shadow-lg shadow-emerald-600/25 transition-all hover:from-green-600 hover:to-emerald-700 hover:shadow-xl"
                  >
                    <WhatsAppIcon className="h-6 w-6" />
                    {L({ id: 'Chat Hotline', en: 'Chat Hotline' })}
                  </OverhaulLink>
                </div>
              </div>

              {/* Kanan (50%): langganan edukasi, low intent */}
              <div className="h-full rounded-2xl border border-cyan-100 bg-white p-7 shadow-sm lg:p-9">
                <ArtikelNewsletter />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ArtikelEdukasiClient;
