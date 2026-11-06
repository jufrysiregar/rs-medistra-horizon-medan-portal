'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Ban,
  Blocks,
  BookOpen,
  Check,
  Clock,
  Gift,
  Heart,
  MapPin,
  Palette,
  ShieldCheck,
  Smile,
  Sparkles,
  Tv,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import type { Language } from '../../../types';
import tamanHero from '@/images/hero/layanan/TMA.jpg';
import tamanHeroMobile from '@/images/hero/mobile-layanan/TMA.jpg';
import TamanBermainWidgets from './TamanBermainWidgets';

type Teks = { id: string; en: string };
type Ikon = React.ComponentType<{ className?: string }>;

/* ============================== DATA HALAMAN ============================== */

/** Tiga pilar konsep ramah anak. */
const KONSEP: { judul: Teks; ket: Teks; ikon: Ikon; chip: string }[] = [
  {
    judul: { id: 'Lingkungan Ramah Anak', en: 'Child-Friendly Environment' },
    ket: {
      id: 'Healing environment berwarna cerah dengan lantai peredam benturan dan tanpa sudut tajam.',
      en: 'A bright healing environment with shock-absorbing flooring and no sharp edges.',
    },
    ikon: Heart,
    chip: 'bg-amber-100 text-amber-600',
  },
  {
    judul: { id: 'Mengurangi Kecemasan', en: 'Eases Anxiety' },
    ket: {
      id: 'Distraksi positif yang membuat anak lebih tenang sebelum pemeriksaan atau saat orang tua mengurus administrasi.',
      en: 'Positive distraction that keeps children calmer before an examination or while parents handle administration.',
    },
    ikon: Smile,
    chip: 'bg-sky-100 text-sky-600',
  },
  {
    judul: { id: 'Akses Mudah', en: 'Easy Access' },
    ket: {
      id: 'Berada dekat Poli Anak dan area MCU, masih dalam jangkauan pandang orang tua maupun loket perawat.',
      en: 'Located near the Paediatric Clinic and MCU area, still within sight of parents and the nurses’ station.',
    },
    ikon: MapPin,
    chip: 'bg-emerald-100 text-emerald-600',
  },
];

/** Empat kelompok fasilitas permainan. */
const FASILITAS: { judul: Teks; ket: Teks; ikon: Ikon; chip: string }[] = [
  {
    judul: { id: 'Area Soft-Play', en: 'Soft-Play Area' },
    ket: { id: 'Matras empuk, seluncuran mini, dan kolam bola.', en: 'Cushioned mats, a mini slide and a ball pit.' },
    ikon: Blocks,
    chip: 'bg-amber-100 text-amber-600',
  },
  {
    judul: { id: 'Creative Corner', en: 'Creative Corner' },
    ket: { id: 'Mewarnai, puzzle, dan mainan sensorik.', en: 'Colouring, puzzles and sensory toys.' },
    ikon: Palette,
    chip: 'bg-sky-100 text-sky-600',
  },
  {
    judul: { id: 'Pojok Baca', en: 'Reading Nook' },
    ket: { id: 'Mini library buku cerita anak yang bergilir.', en: 'A mini library of rotating children’s storybooks.' },
    ikon: BookOpen,
    chip: 'bg-emerald-100 text-emerald-600',
  },
  {
    judul: { id: 'Media Interaktif', en: 'Interactive Media' },
    ket: { id: 'TV memutar kartun edukatif yang aman.', en: 'A TV playing safe, educational cartoons.' },
    ikon: Tv,
    chip: 'bg-amber-100 text-amber-600',
  },
];

/** Dua komitmen keamanan & kebersihan dengan warna pastel. */
const KEAMANAN: { judul: Teks; titik: Teks[]; ikon: Ikon; kelas: string; chip: string }[] = [
  {
    judul: { id: 'Sterilisasi & Disinfeksi Berkala', en: 'Regular Sterilisation & Disinfection' },
    titik: [
      { id: 'Dibersihkan setiap 2-3 jam pada jam ramai.', en: 'Cleaned every 2-3 hours during busy periods.' },
      { id: 'Pembersih food-grade yang aman untuk kulit anak.', en: 'Food-grade cleansers safe for children’s skin.' },
      { id: 'Bahan non-toxic, bebas zat berbahaya.', en: 'Non-toxic materials, free of harmful substances.' },
    ],
    ikon: Sparkles,
    kelas: 'border-emerald-200 bg-emerald-50',
    chip: 'bg-white text-emerald-600 border border-emerald-200',
  },
  {
    judul: { id: 'Keamanan Fisik', en: 'Physical Safety' },
    titik: [
      { id: 'Mainan bebas BPA dan tanpa sudut tajam.', en: 'BPA-free toys with no sharp edges.' },
      { id: 'Diawasi CCTV 24 jam dan loket perawat.', en: 'Watched by 24-hour CCTV and the nurses’ station.' },
      { id: 'Lantai anti-selip berlapis karet peredam.', en: 'Anti-slip, rubber-cushioned flooring.' },
    ],
    ikon: ShieldCheck,
    kelas: 'border-sky-200 bg-sky-50',
    chip: 'bg-white text-sky-600 border border-sky-200',
  },
];

/** Aturan main, tipe ok (centang) atau larangan (silang). */
const ATURAN: { teks: Teks; tipe: 'ok' | 'no' }[] = [
  { teks: { id: 'Untuk anak usia 1-10 tahun.', en: 'For children aged 1-10 years.' }, tipe: 'ok' },
  { teks: { id: 'Anak di bawah 5 tahun wajib didampingi orang tua/wali.', en: 'Children under 5 must be accompanied by a parent/guardian.' }, tipe: 'ok' },
  { teks: { id: 'Cuci tangan sebelum dan sesudah bermain.', en: 'Wash hands before and after playing.' }, tipe: 'ok' },
  { teks: { id: 'Selalu menggunakan kaos kaki di dalam area.', en: 'Always wear socks inside the area.' }, tipe: 'ok' },
  { teks: { id: 'Dilarang masuk bagi anak dengan sakit menular.', en: 'No entry for children with a contagious illness.' }, tipe: 'no' },
];

/** Info operasional (kotak highlight amber). */
const OPERASIONAL: { label: Teks; nilai: Teks; besar?: boolean; ikon: Ikon }[] = [
  { label: { id: 'Lokasi', en: 'Location' }, nilai: { id: 'Lt 1 North Wing · dekat Poli Anak', en: '1st Floor North Wing · near the Paediatric Clinic' }, ikon: MapPin },
  { label: { id: 'Jam Buka', en: 'Opening Hours' }, nilai: { id: '08.00 - 20.00 WIB', en: '08.00 - 20.00 WIB' }, ikon: Clock },
  { label: { id: 'Biaya', en: 'Admission' }, nilai: { id: 'GRATIS', en: 'FREE' }, besar: true, ikon: Gift },
];

/* ================================ RENDER ================================ */

/** Judul section editorial: H2 besar + divider tipis. */
const JudulSection: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">{children}</h2>
);

const TamanBermainClient: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (t: Teks) => t[lang];

  return (
    <div className="bg-white text-slate-800">
      {/* ============ 1. HERO (LATAR PENUH FOTO) ============ */}
      <section className="relative overflow-hidden bg-white pt-16 pb-12 lg:pt-20 lg:pb-16">
        {/* TMA.jpg dipakai sebagai latar penuh hero. */}
        <div aria-hidden className="absolute inset-0">
          <Image src={tamanHeroMobile} alt="" fill priority sizes="100vw" quality={90} className="object-cover object-right md:hidden" />
                    <Image src={tamanHero} alt="" fill priority sizes="100vw" quality={90} className="hidden object-cover md:block" />
        </div>
        {/* Scrim: putih pekat hanya di sisi kiri (sampai ±45%), kanan 100% bening. */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-white from-20% via-white/70 to-transparent to-60%" />

        <div className="relative z-10 mr-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="max-w-3xl">
            <h1 className="text-[clamp(2.5rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight text-slate-900">
              {L({ id: 'Kids Zone: Taman Bermain Ceria & Aman', en: 'Kids Zone: A Cheerful & Safe Playground' })}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              {L({
                id: 'Sebuah sudut ceria di dalam rumah sakit tempat anak bisa bermain, berimajinasi, dan menenangkan diri. Kami menghadirkan suasana yang aman, bersih, dan ramah anak, sehingga menunggu pemeriksaan tidak lagi menakutkan, melainkan menyenangkan.',
                en: 'A cheerful corner inside the hospital where children can play, imagine and unwind. We create a safe, clean and child-friendly atmosphere, so waiting for care is no longer scary, but fun.',
              })}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-base font-semibold text-slate-700">
                <Clock className="h-5 w-5 shrink-0 text-sky-500" />
                {L({ id: 'Setiap Hari 08.00-20.00', en: 'Daily 08.00-20.00' })}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-base font-semibold text-slate-700">
                <Gift className="h-5 w-5 shrink-0 text-emerald-500" />
                {L({ id: 'Gratis untuk Pasien', en: 'Free for Patients' })}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-base font-semibold text-slate-700">
                <ShieldCheck className="h-5 w-5 shrink-0 text-amber-500" />
                {L({ id: 'Area Ramah Anak', en: 'Child-Friendly Area' })}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 2. KONSEP RAMAH ANAK (GRID 3 KOLOM) ============ */}
      <section id="konsep" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <JudulSection>{L({ id: 'Konsep Ramah Anak', en: 'Child-Friendly Concept' })}</JudulSection>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Tiga alasan Kids Zone dibuat, agar anak betah, orang tua tenang.',
              en: 'Three reasons the Kids Zone exists, so children feel at home and parents feel at ease.',
            })}
          </p>
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {KONSEP.map((k, i) => (
              <motion.article
                key={k.judul.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${k.chip}`}>
                  <k.ikon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-900">{L(k.judul)}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600">{L(k.ket)}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 3. FASILITAS PERMAINAN (GRID 4 KOLOM) ============ */}
      <section id="fasilitas" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <JudulSection>{L({ id: 'Fasilitas Permainan', en: 'Play Facilities' })}</JudulSection>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Empat zona bermain yang merangsang gerak, kreativitas, dan imajinasi anak.',
              en: 'Four play zones that spark movement, creativity and a child’s imagination.',
            })}
          </p>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {FASILITAS.map((f, i) => (
              <motion.article
                key={f.judul.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${f.chip}`}>
                  <f.ikon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-lg font-extrabold leading-snug tracking-tight text-slate-900">{L(f.judul)}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600">{L(f.ket)}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 4. KEAMANAN & KEBERSIHAN (2 KOLOM WARNA) ============ */}
      <section id="keamanan" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <JudulSection>{L({ id: 'Keamanan & Kebersihan', en: 'Safety & Cleanliness' })}</JudulSection>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Ketenangan orang tua adalah prioritas, setiap sudut dijaga kebersihan dan keamanannya.',
              en: 'Parents’ peace of mind comes first, every corner is guarded for cleanliness and safety.',
            })}
          </p>
          <div className="mt-12 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-10">
            {KEAMANAN.map((z) => (
              <div key={z.judul.id} className={`flex h-full flex-col rounded-3xl border-2 p-8 shadow-sm ${z.kelas}`}>
                <div className="flex items-center gap-4">
                  <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${z.chip}`}>
                    <z.ikon className="h-7 w-7" />
                  </span>
                  <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">{L(z.judul)}</h3>
                </div>
                <ul className="mt-6 space-y-3">
                  {z.titik.map((t) => (
                    <li key={t.id} className="flex items-start gap-3 text-base text-slate-700">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" />
                      {L(t)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 5. ATURAN & OPERASIONAL (2 KOLOM) ============ */}
      <section id="aturan" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <JudulSection>{L({ id: 'Aturan & Operasional', en: 'Rules & Operations' })}</JudulSection>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <div className="mt-12 grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-10">
            {/* Kiri: aturan main */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">
                {L({ id: 'Aturan Main', en: 'Play Rules' })}
              </h3>
              <ul className="mt-6 space-y-4">
                {ATURAN.map((a) => (
                  <li key={a.teks.id} className="flex items-start gap-3 text-base text-slate-700">
                    <span
                      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                        a.tipe === 'ok' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                      }`}
                    >
                      {a.tipe === 'ok' ? <Check className="h-4 w-4" /> : <Ban className="h-4 w-4" />}
                    </span>
                    {L(a.teks)}
                  </li>
                ))}
              </ul>
            </div>

            {/* Kanan: info operasional (highlight amber) */}
            <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-8 shadow-sm">
              <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">
                {L({ id: 'Info Operasional', en: 'Operational Info' })}
              </h3>
              <div className="mt-6 space-y-5">
                {OPERASIONAL.map((o) => (
                  <div key={o.label.id} className="flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-amber-200 bg-white text-amber-600">
                      <o.ikon className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-wide text-amber-700">{L(o.label)}</p>
                      <p className={`font-extrabold text-slate-900 ${o.besar ? 'text-4xl leading-none' : 'text-xl'}`}>
                        {L(o.nilai)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 6. WIDGETS INTERAKTIF ============ */}
      <TamanBermainWidgets />
    </div>
  );
};

export default TamanBermainClient;
