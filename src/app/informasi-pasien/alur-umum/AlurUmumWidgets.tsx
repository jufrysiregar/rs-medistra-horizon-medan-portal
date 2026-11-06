'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ChevronDown, CircleHelp, Search, Stethoscope } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import type { Language } from '../../../types';
import OverhaulLink from '../../../components/OverhaulLink';

type Teks = { id: string; en: string };
type Ikon = React.ComponentType<{ className?: string }>;

/* ============================== DATA ============================== */

/** Spesialis populer untuk pintasan cepat. */
const SPESIALIS: Teks[] = [
  { id: 'Anak', en: 'Paediatrics' },
  { id: 'Penyakit Dalam', en: 'Internal Medicine' },
  { id: 'Obstetri & Ginekologi', en: 'Obstetrics & Gynaecology' },
  { id: 'Bedah', en: 'Surgery' },
  { id: 'Neurologi', en: 'Neurology' },
];

/** FAQ seputar berobat. */
const FAQ: { q: Teks; a: Teks }[] = [
  {
    q: { id: 'Apakah bisa berobat tanpa daftar online?', en: 'Can I visit without registering online?' },
    a: {
      id: 'Bisa. Anda tetap dapat mendaftar langsung di loket atau Kios Mandiri. Namun, nomor antrean menyesuaikan sisa kuota pada hari-H, sehingga mendaftar H-1 tetap kami sarankan.',
      en: 'Yes. You can still register on-site at the counter or self-service kiosk. However, queue numbers depend on the remaining quota for the day, so reserving a day ahead is still recommended.',
    },
  },
  {
    q: { id: 'Harus datang berapa lama sebelum jadwal?', en: 'How early should I arrive?' },
    a: {
      id: 'Disarankan tiba 20-30 menit sebelum jadwal konsultasi untuk menyelesaikan registrasi dan pemeriksaan awal tanpa terburu-buru.',
      en: 'We suggest arriving 20-30 minutes before your consultation to complete registration and the initial screening unhurried.',
    },
  },
  {
    q: { id: 'Bagaimana jika saya terlambat?', en: 'What if I am late?' },
    a: {
      id: 'Jika Anda melewati batas waktu, nomor antrean dapat dialihkan ke sesi berikutnya sesuai kebijakan poli terkait. Silakan segera hubungi petugas agar kami bantu penjadwalan ulang.',
      en: 'If you miss the cut-off time, your queue number may be moved to the next session per the clinic’s policy. Please contact our staff right away and we will help reschedule you.',
    },
  },
];

/* ================================ WIDGETS ================================ */

const AlurUmumWidgets: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (t: Teks) => t[lang];
  const router = useRouter();

  /* ---- Widget 1: Cari Dokter ---- */
  const [q, setQ] = useState('');
  const cari = (e: React.FormEvent) => {
    e.preventDefault();
    const term = q.trim();
    router.push(term ? `/cari-dokter?q=${encodeURIComponent(term)}` : '/cari-dokter');
  };

  /* ---- Widget 2: FAQ ---- */
  const [buka, setBuka] = useState<number | null>(0);

  return (
    <section id="cari" className="scroll-mt-28 bg-slate-50 py-20">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
          {L({ id: 'Mulai dari Sini', en: 'Start Here' })}
        </h2>
        <div className="mt-5 h-px w-full bg-slate-200" />
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
          {L({
            id: 'Cari dokter yang Anda butuhkan, atau telusuri pertanyaan yang paling sering ditanyakan seputar berobat.',
            en: 'Find the doctor you need, or browse the questions most often asked about getting care.',
          })}
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* ============ WIDGET 1: CARI DOKTER ============ */}
          <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-teal-100 bg-teal-50 text-teal-700">
              <Stethoscope className="h-7 w-7" />
            </span>
            <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-900">
              {L({ id: 'Cari Dokter', en: 'Find a Doctor' })}
            </h3>
            <p className="mt-1 text-base leading-relaxed text-slate-500">
              {L({ id: 'Ketik nama dokter atau spesialisasi tujuan.', en: 'Type a doctor’s name or the specialty you need.' })}
            </p>

            <form onSubmit={cari} className="mt-6 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder={L({ id: 'mis. dr. Andi / Anak', en: 'e.g. dr. Andi / Paediatrics' })}
                  aria-label={L({ id: 'Cari dokter', en: 'Search doctor' })}
                  className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-12 pr-4 text-base font-semibold text-slate-800 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3.5 text-base font-extrabold text-white shadow-lg shadow-teal-600/25 transition-all hover:bg-teal-700 active:scale-[0.98]"
              >
                {L({ id: 'Cari', en: 'Search' })}
              </button>
            </form>

            <div className="mt-6">
              <p className="text-sm font-bold uppercase tracking-wide text-slate-500">
                {L({ id: 'Spesialis Populer', en: 'Popular Specialties' })}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SPESIALIS.map((s) => (
                  <OverhaulLink
                    key={s.id}
                    href={`/cari-dokter?q=${encodeURIComponent(L(s))}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:bg-teal-50 hover:text-teal-800"
                  >
                    {L(s)}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </OverhaulLink>
                ))}
              </div>
            </div>
          </div>

          {/* ============ WIDGET 2: FAQ BEROBAT ============ */}
          <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-teal-100 bg-teal-50 text-teal-700">
              <CircleHelp className="h-7 w-7" />
            </span>
            <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-900">
              {L({ id: 'FAQ Berobat', en: 'Care FAQ' })}
            </h3>
            <p className="mt-1 text-base leading-relaxed text-slate-500">
              {L({ id: 'Jawaban singkat untuk pertanyaan umum.', en: 'Quick answers to common questions.' })}
            </p>

            <div className="mt-6 flex flex-1 flex-col gap-3">
              {FAQ.map((f, i) => {
                const aktif = buka === i;
                return (
                  <div key={f.q.id} className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                    <button
                      type="button"
                      onClick={() => setBuka(aktif ? null : i)}
                      aria-expanded={aktif}
                      className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
                    >
                      <span className="text-base font-bold text-slate-800">{L(f.q)}</span>
                      <ChevronDown className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${aktif ? 'rotate-180' : ''}`} />
                    </button>
                    {aktif && (
                      <div className="border-t border-slate-200 bg-white px-4 py-3.5">
                        <p className="text-base leading-relaxed text-slate-600">{L(f.a)}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlurUmumWidgets;
