'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Accessibility,
  Activity,
  ArrowRight,
  Baby,
  BedDouble,
  Bone,
  Brain,
  CalendarClock,
  CircleAlert,
  CircleCheck,
  Citrus,
  Droplets,
  Flower2,
  GraduationCap,
  HeartPulse,
  Leaf,
  MessageCircle,
  RefreshCw,
  ShieldAlert,
  Soup,
  Sparkles,
  Stethoscope,
  Thermometer,
  UserRound,
  Waves,
  Wind,
  type LucideIcon,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import type { Language } from '../../../types';
import OverhaulLink from '../../../components/OverhaulLink';
import PanduanSehatWidgets from './PanduanSehatWidgets';
import BmiCalculatorModal from './BmiCalculatorModal';
import panduanRaw from '../../../data/panduan-sehat.json';
import heroPanduan from '@/images/hero/tentang/hero-panduan.jpg';
import heroPanduanMobile from '@/images/hero/mobile-tentang/hero-panduan.jpg';
import logoBmi from '@/images/logo/BMI.png';

/* ==================== TIPE DATA (dari src/data/panduan-sehat.json) ==================== */

type Teks = { id: string; en: string };
type KatKey = 'pernapasan' | 'pencernaan' | 'kepala' | 'otot-sendi' | 'khusus' | 'kulit' | 'imunitas';

interface Gejala {
  id: string;
  label: Teks;
  icon: string;
  category: KatKey;
  first_aid: Teks[];
  herbal: Teks[];
  herbal_warning?: Teks;
  red_flag: Teks[];
  referral: Teks;
}

interface KelompokUsia {
  age_id: string;
  age_label: Teks;
  age_range: Teks;
  icon: string;
  symptoms: Gejala[];
}

const PANDUAN = panduanRaw as unknown as KelompokUsia[];

/* Resolver ikon: nama string di JSON dipetakan ke komponen lucide-react. */
const IKON: Record<string, LucideIcon> = {
  Baby,
  GraduationCap,
  UserRound,
  Accessibility,
  Wind,
  Thermometer,
  Brain,
  Citrus,
  Bone,
  Droplets,
  Flower2,
  Sparkles,
  Soup,
  Activity,
  Waves,
  HeartPulse,
  BedDouble,
};

/* Urutan tetap sub-filter kategori (Langkah 2). Yang ditampilkan hanya kategori
   yang punya gejala pada kelompok usia aktif, agar tidak ada filter kosong. */
const KATEGORI: { key: KatKey; label: Teks }[] = [
  { key: 'pernapasan', label: { id: 'Pernapasan', en: 'Respiratory' } },
  { key: 'pencernaan', label: { id: 'Pencernaan', en: 'Digestive' } },
  { key: 'kepala', label: { id: 'Kepala', en: 'Head' } },
  { key: 'otot-sendi', label: { id: 'Otot & Sendi', en: 'Muscle & Joint' } },
  { key: 'khusus', label: { id: 'Khusus', en: 'Special' } },
  { key: 'kulit', label: { id: 'Kulit', en: 'Skin' } },
  { key: 'imunitas', label: { id: 'Imunitas', en: 'Immunity' } },
];

const WA_LINK = 'https://wa.me/6281190001404';
const WA_TEXT: Teks = {
  id: 'Halo%20RS%20Medistra%20Horizon%20Medan,%20saya%20ingin%20konsultasi%20sehat%20berdasarkan%20Panduan%20Sehat.',
  en: 'Hello%20Medistra%20Horizon%20Hospital%20Medan,%20I%20would%20like%20a%20health%20consultation%20based%20on%20the%20Self%20Care%20Guide.',
};

const PanduanSehatClient: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (t: Teks) => t[lang];

  /* ==================== STATE MANAGEMENT ====================
     - ageCategory default "dewasa" (Langkah 1 sudah terisi sejak awal).
     - Ganti usia => selectedSymptom DAN kartu hasil WAJIB di-reset kosong. */
  const [ageCategory, setAgeCategory] = useState<string>('dewasa');
  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null);
  const [kategoriAktif, setKategoriAktif] = useState<KatKey | 'semua'>('semua');
  const [bmiBuka, setBmiBuka] = useState(false);

  const kelompok = useMemo(
    () => PANDUAN.find((g) => g.age_id === ageCategory) ?? PANDUAN[0],
    [ageCategory],
  );
  const daftarKategori = useMemo(
    () => KATEGORI.filter((k) => kelompok.symptoms.some((s) => s.category === k.key)),
    [kelompok],
  );
  const daftarGejala = useMemo(
    () =>
      kategoriAktif === 'semua'
        ? kelompok.symptoms
        : kelompok.symptoms.filter((s) => s.category === kategoriAktif),
    [kelompok, kategoriAktif],
  );
  const gejala: Gejala | null = selectedSymptom
    ? kelompok.symptoms.find((s) => s.id === selectedSymptom) ?? null
    : null;

  const UsiaIkon = IKON[kelompok.icon] ?? UserRound;

  /** Kalkulator BMI hanya relevan mulai 18 tahun (Dewasa & Lansia). */
  const usiaDewasaAtas = ageCategory === 'dewasa' || ageCategory === 'lansia';

  const gantiUsia = (key: string) => {
    if (key === ageCategory) return;
    setAgeCategory(key);
    setSelectedSymptom(null);
    setKategoriAktif('semua');
  };

  return (
    <div className="bg-white text-slate-800">
      {/* ============ 1. HERO (FULL-WIDTH BACKGROUND IMAGE) ============ */}
      <section className="relative flex min-h-[50vh] items-center overflow-hidden">
        <Image
          src={heroPanduanMobile}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover object-right md:hidden"
        />
        <Image
          src={heroPanduan}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={90}
          className="hidden object-cover md:block"
        />
        {/* Overlay gradient gelap untuk kontras teks putih (bukan dark mode). */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/40" />
        {/* Fade ke putih di tepi bawah agar transisi ke section Age Selector mulus. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white" />
        <div className="relative mx-auto w-full max-w-7xl px-6 py-24 lg:px-12 lg:py-28">
          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-white [text-shadow:0_2px_24px_rgba(15,23,42,0.55)] md:text-6xl">
            {L({
              id: 'Panduan Sehat & Skrining Mandiri Keluhan Harian',
              en: 'Healthy Living Guide & Daily Symptom Self-Check',
            })}
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-slate-200 [text-shadow:0_1px_16px_rgba(15,23,42,0.55)] md:text-2xl">
            {L({
              id: 'Solusi pertolongan pertama di rumah, panduan herbal safe-options, serta kapan waktu yang tepat untuk berobat ke dokter.',
              en: 'Home first-aid solutions, safe herbal options, and the right time to see a doctor.',
            })}
          </p>
        </div>
      </section>

      {/* ============ 2. SYMPTOM FINDER (WIZARD) ============ */}
      <section className="relative bg-white pt-16 lg:pt-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          {/* ============ LANGKAH 1 & 2: WIZARD ============ */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl md:p-10">
            {/* ---- LANGKAH 1: AGE SELECTOR ---- */}
            <div>
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xl font-extrabold text-white shadow-lg shadow-emerald-600/25">
                  1
                </span>
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                  {L({ id: 'Pilih Kategori Usia', en: 'Choose an Age Group' })}
                </h2>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
                {PANDUAN.map((g) => {
                  const aktif = ageCategory === g.age_id;
                  const Ic = IKON[g.icon] ?? UserRound;
                  return (
                    <button
                      key={g.age_id}
                      type="button"
                      onClick={() => gantiUsia(g.age_id)}
                      aria-pressed={aktif}
                      className={`flex flex-col items-start gap-3 rounded-2xl p-5 text-left transition-all ${
                        aktif
                          ? 'border-2 border-emerald-500 bg-emerald-50 text-emerald-700 shadow-md'
                          : 'border border-slate-200 bg-white hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow'
                      }`}
                    >
                      <span
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                          aktif ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700'
                        }`}
                      >
                        <Ic className="h-8 w-8" />
                      </span>
                      <span className={`text-lg font-extrabold leading-snug ${aktif ? 'text-emerald-800' : 'text-slate-900'}`}>
                        {L(g.age_label)}
                      </span>
                      <span className={`text-sm font-semibold ${aktif ? 'text-emerald-600' : 'text-slate-500'}`}>
                        {L(g.age_range)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="my-8 h-px w-full bg-slate-200" />

            {/* ---- LANGKAH 2: SYMPTOM SELECTOR ---- */}
            <div>
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal-600 text-xl font-extrabold text-white shadow-lg shadow-teal-600/25">
                  2
                </span>
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                  {L({ id: 'Pilih Keluhan Anda', en: 'Choose Your Complaint' })}
                </h2>
                <span className="ml-auto hidden items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-bold text-emerald-700 sm:inline-flex">
                  <UsiaIkon className="h-4 w-4" />
                  {L(kelompok.age_label)}
                </span>
              </div>

              {/* Sub-filter kategori (pills) */}
              <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label={L({ id: 'Filter kategori keluhan', en: 'Symptom category filter' })}>
                {[{ key: 'semua' as const, label: { id: 'Semua', en: 'All' } }, ...daftarKategori].map((k) => {
                  const aktif = kategoriAktif === k.key;
                  return (
                    <button
                      key={k.key}
                      type="button"
                      role="tab"
                      aria-selected={aktif}
                      onClick={() => setKategoriAktif(k.key)}
                      className={`rounded-full border px-4 py-2 text-base font-bold transition-colors ${
                        aktif
                          ? 'border-emerald-600 bg-emerald-600 text-white shadow'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-700'
                      }`}
                    >
                      {L(k.label)}
                    </button>
                  );
                })}
              </div>

              {/* Grid gejala kelompok usia aktif */}
              <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3">
                {daftarGejala.map((s) => {
                  const aktif = selectedSymptom === s.id;
                  const Ic = IKON[s.icon] ?? Activity;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedSymptom(s.id)}
                      aria-pressed={aktif}
                      className={`flex items-center gap-4 rounded-2xl p-5 text-left transition-all ${
                        aktif
                          ? 'border-2 border-emerald-500 bg-emerald-50 shadow-md'
                          : 'border border-slate-200 bg-white hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow'
                      }`}
                    >
                      <span
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                          aktif ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700'
                        }`}
                      >
                        <Ic className="h-6 w-6" />
                      </span>
                      <span className="text-lg font-extrabold leading-snug text-slate-900">{L(s.label)}</span>
                    </button>
                  );
                })}
              </div>

              {/* Panduan sebelum gejala dipilih */}
              {!gejala && (
                <p className="mt-8 flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-base font-semibold text-slate-500">
                  <ArrowRight className="h-5 w-5 text-emerald-600" />
                  {L({
                    id: 'Pilih salah satu keluhan di atas untuk melihat panduan lengkapnya.',
                    en: 'Pick a complaint above to see the full guide.',
                  })}
                </p>
              )}

              {/* Kartu BMI berdiri sendiri di luar grid gejala: ini alat skrining, bukan
                  keluhan. Ambang BMI anak memakai persentil usia, jadi kartunya sengaja
                  tidak dirender untuk Bayi & Anak. */}
              {usiaDewasaAtas && (
                <div className="animate-border-flow mt-5 overflow-hidden rounded-[28px] bg-[linear-gradient(115deg,#22d3ee,#3b82f6,#a855f7,#f43f5e,#f59e0b,#22d3ee)] bg-[length:280%_100%] p-[2px] shadow-[0_18px_50px_-22px_rgba(34,211,238,0.55)]">
                  <button
                    type="button"
                    onClick={() => setBmiBuka(true)}
                    className="group relative flex w-full cursor-pointer items-center gap-5 overflow-hidden rounded-[26px] bg-gradient-to-br from-white via-cyan-50 to-blue-50 p-6 text-left transition-all duration-300 hover:via-cyan-100 sm:gap-6 sm:p-7"
                  >
                    {/* Dua cahaya radial (cyan dari tepi kiri, ungu di kanan atas) di atas
                        permukaan terang, supaya kartu tidak terlihat datar. */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-[radial-gradient(110%_130%_at_0%_50%,rgba(34,211,238,0.18),rgba(255,255,255,0)_60%)]"
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-4 -top-14 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.16),rgba(255,255,255,0)_70%)] blur-xl"
                    />

                    {/* BMI.png dirender utuh tanpa radius/padding: bingkai navy bawaan
                        file tidak terpotong oleh lengkung kotak. */}
                    <Image
                      src={logoBmi}
                      alt=""
                      width={80}
                      height={80}
                      sizes="(max-width: 640px) 72px, 80px"
                      className="relative h-[72px] w-[72px] shrink-0 self-center object-contain shadow-[0_14px_28px_-14px_rgba(8,145,178,0.55)] transition-transform duration-300 group-hover:scale-[1.06] sm:h-20 sm:w-20"
                    />

                    <span className="relative min-w-0 flex-1">
                      <span className="block text-xl font-extrabold leading-snug tracking-tight text-navy-950 sm:text-2xl">
                        {L({
                          id: 'Ingin Mengetahui Berat Badan Ideal Anda??',
                          en: 'Want to Know Your Ideal Body Weight??',
                        })}
                      </span>
                      <span className="mt-2 block text-base leading-relaxed text-slate-600">
                        {L({
                          id: 'Klik di sini untuk mengetahuinya',
                          en: 'Click here to find out',
                        })}
                      </span>
                    </span>

                    {/* Chip panah: hue-cycle mengganti-ganti warna latarnya (basis cyan-500,
                       ikon putih jadi tidak ikut berubah hue), arrow-sway menggeser ikonnya
                       kiri-kanan. Dua animasi, dua elemen — satu elemen tidak bisa memegang
                       dua properti `animation` sekaligus lewat utility Tailwind. */}
                    <span className="animate-hue-cycle relative flex h-12 w-12 shrink-0 items-center justify-center self-center rounded-full bg-cyan-500 text-white ring-1 ring-cyan-300 shadow-lg shadow-cyan-500/30">
                      <ArrowRight className="animate-arrow-sway h-6 w-6" />
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============ LANGKAH 3: HASIL & RED FLAG ============ */}
      <AnimatePresence mode="wait">
        {gejala && (
          <motion.section
            key={`hasil-${ageCategory}-${gejala.id}`}
            id="hasil"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="scroll-mt-28 bg-slate-50 py-20"
          >
            <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl md:p-8">
                {/* Header card: Label Usia + Label Gejala */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
                      {React.createElement(UsiaIkon, { className: 'h-5 w-5' })}
                      {L(kelompok.age_label)} · {L(kelompok.age_range)}
                    </span>
                    <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                      {L(gejala.label)}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedSymptom(null)}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-base font-semibold text-slate-600 transition-colors hover:border-emerald-400 hover:text-emerald-700"
                  >
                    <RefreshCw className="h-5 w-5" />
                    {L({ id: 'Ganti Keluhan', en: 'Change Complaint' })}
                  </button>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Section 1: First Aid */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                    <h3 className="flex items-center gap-2 text-xl font-extrabold text-slate-900">
                      <Droplets className="h-6 w-6 text-blue-600" />
                      {L({ id: 'Penanganan Mandiri', en: 'Self Care (First Aid)' })}
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {gejala.first_aid.map((f) => (
                        <li key={f.id} className="flex items-start gap-3 text-lg leading-relaxed text-slate-700">
                          <CircleCheck className="mt-1 h-6 w-6 shrink-0 text-blue-600" />
                          {L(f)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Section 2: Herbal (+ warning kuning bila ada) */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                    <h3 className="flex items-center gap-2 text-xl font-extrabold text-slate-900">
                      <Leaf className="h-6 w-6 text-emerald-600" />
                      {L({ id: 'Opsi Herbal & Bahan Alami', en: 'Herbal & Natural Options' })}
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {gejala.herbal.map((f) => (
                        <li key={f.id} className="flex items-start gap-3 text-lg leading-relaxed text-slate-700">
                          <Leaf className="mt-1.5 h-5 w-5 shrink-0 text-emerald-600" />
                          {L(f)}
                        </li>
                      ))}
                    </ul>
                    {gejala.herbal_warning && (
                      <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
                        <ShieldAlert className="mt-0.5 h-6 w-6 shrink-0 text-amber-600" />
                        <div>
                          <p className="text-base font-extrabold uppercase tracking-wide text-amber-800">
                            {L({ id: 'Catatan Keamanan', en: 'Safety Note' })}
                          </p>
                          <p className="mt-1 text-base leading-relaxed text-amber-800">{L(gejala.herbal_warning)}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Section 3: Red Flag */}
                  <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-6 md:col-span-2">
                    <h3 className="flex items-center gap-2 text-xl font-extrabold text-red-700">
                      <CircleAlert className="h-6 w-6" />
                      {L({ id: 'Red Flag: Kapan Harus ke RS', en: 'Red Flags: When to Go to the Hospital' })}
                    </h3>
                    <p className="mt-2 text-base font-semibold text-red-600">
                      {L({
                        id: 'Segera cari pertolongan medis bila muncul salah satu tanda berikut:',
                        en: 'Seek medical care immediately if any of these signs appear:',
                      })}
                    </p>
                    <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {gejala.red_flag.map((r) => (
                        <li key={r.id} className="flex items-start gap-3 text-lg leading-relaxed text-red-700">
                          <span className="mt-2 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-500" />
                          {L(r)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Section 4: Tindakan Lanjutan (rujukan + 2 tombol) */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:col-span-2">
                    <h3 className="flex items-center gap-2 text-xl font-extrabold text-slate-900">
                      <Stethoscope className="h-6 w-6 text-emerald-600" />
                      {L({ id: 'Tindakan Lanjutan', en: 'Next Steps' })}
                    </h3>
                    <p className="mt-3 flex flex-wrap items-center gap-2 text-lg leading-relaxed text-slate-700">
                      <span className="font-bold text-slate-900">
                        {L({ id: 'Rujukan Dokter:', en: 'Doctor Referral:' })}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 font-bold text-emerald-700">
                        {L(gejala.referral)}
                      </span>
                    </p>
                    <div className="mt-5 flex flex-col gap-4 sm:flex-row">
                      <OverhaulLink
                        href="/cari-dokter"
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-7 py-4 text-lg font-bold text-white shadow-lg shadow-emerald-600/25 transition-all hover:from-emerald-700 hover:to-teal-700 hover:shadow-xl"
                      >
                        <CalendarClock className="h-6 w-6" />
                        {L({ id: 'Cari & Janji Dokter', en: 'Find & Book a Doctor' })}
                      </OverhaulLink>
                      <OverhaulLink
                        href={`${WA_LINK}?text=${WA_TEXT[lang]}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-emerald-300 bg-white px-7 py-4 text-lg font-bold text-emerald-700 transition-all hover:bg-emerald-50"
                      >
                        <MessageCircle className="h-6 w-6" />
                        {L({ id: 'Konsultasi via WA', en: 'Consult via WhatsApp' })}
                      </OverhaulLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ============ 5-6. TIPS HARIAN, DARURAT, DISCLAIMER ============ */}
      <PanduanSehatWidgets />

      {/* Modal kalkulator BMI: dipicu kartu di Langkah 2, tetap ter-mount agar
          AnimatePresence sempat menjalankan fase exit. */}
      <BmiCalculatorModal open={bmiBuka} onClose={() => setBmiBuka(false)} />
    </div>
  );
};

export default PanduanSehatClient;
