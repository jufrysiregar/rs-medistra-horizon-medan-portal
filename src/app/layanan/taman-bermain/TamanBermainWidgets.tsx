'use client';

import React, { useState } from 'react';
import {
  Baby,
  Blocks,
  BookOpen,
  Camera,
  Check,
  ChevronDown,
  CircleCheck,
  CircleHelp,
  Images,
  Play,
  ShieldCheck,
  Smile,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import type { Language } from '../../../types';

type Teks = { id: string; en: string };
type Ikon = React.ComponentType<{ className?: string }>;

/* ============================== DATA ============================== */

/** Ubin placeholder galeri (demo), ikon ceria, tanpa foto asli. */
const GALERI: { ikon: Ikon; label: Teks; kelas: string }[] = [
  { ikon: Blocks, label: { id: 'Soft-Play', en: 'Soft-Play' }, kelas: 'bg-amber-100 text-amber-600' },
  { ikon: BookOpen, label: { id: 'Pojok Baca', en: 'Reading Nook' }, kelas: 'bg-sky-100 text-sky-600' },
  { ikon: Smile, label: { id: 'Creative Corner', en: 'Creative Corner' }, kelas: 'bg-emerald-100 text-emerald-600' },
  { ikon: Baby, label: { id: 'Balita Asyik', en: 'Toddler Fun' }, kelas: 'bg-rose-100 text-rose-500' },
];

/** Tiga poin pada badge child-safe. */
const BADGE_PUANS: Teks[] = [
  { id: 'Disterilkan tiap 2-3 jam', en: 'Disinfected every 2-3 hours' },
  { id: 'Mainan bebas BPA', en: 'BPA-free toys' },
  { id: 'Diawasi CCTV 24 jam', en: 'Watched by 24-hour CCTV' },
];

/** FAQ orang tua. */
const FAQ: { q: Teks; a: Teks }[] = [
  {
    q: { id: 'Apakah bermain di sini berbayar?', en: 'Is playing here paid?' },
    a: {
      id: 'Tidak. Kids Zone GRATIS untuk seluruh pasien dan keluarganya, tanpa syarat.',
      en: 'No. The Kids Zone is FREE for all patients and their families, no conditions.',
    },
  },
  {
    q: { id: 'Apakah mainan dibersihkan?', en: 'Are the toys cleaned?' },
    a: {
      id: 'Ya. Seluruh mainan dan permukaan didisinfeksi setiap 2-3 jam memakai pembersih food-grade yang aman untuk anak.',
      en: 'Yes. All toys and surfaces are disinfected every 2-3 hours using a food-grade cleanser that is safe for children.',
    },
  },
  {
    q: { id: 'Apakah anak harus didampingi?', en: 'Must children be accompanied?' },
    a: {
      id: 'Anak di bawah 5 tahun wajib didampingi orang tua/wali. Area juga diawasi dari loket perawat dan CCTV.',
      en: 'Children under 5 must be accompanied by a parent/guardian. The area is also supervised from the nurses’ station and via CCTV.',
    },
  },
];

/* ============================ SUB-KOMPONEN ============================ */

const KartuWidget: React.FC<{ ikon: Ikon; judul: string; sub: string; children: React.ReactNode }> = ({
  ikon: IkonEl,
  judul,
  sub,
  children,
}) => (
  <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-sky-100 bg-sky-50 text-sky-600">
      <IkonEl className="h-7 w-7" />
    </span>
    <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-900">{judul}</h3>
    <p className="mt-1 text-base leading-relaxed text-slate-500">{sub}</p>
    <div className="mt-6 flex flex-1 flex-col">{children}</div>
  </div>
);

/* ================================ WIDGETS ================================ */

const TamanBermainWidgets: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (t: Teks) => t[lang];

  /* ---- Widget 1: Galeri (toggle) ---- */
  const [lihatGaleri, setLihatGaleri] = useState(false);

  /* ---- Widget 3: FAQ accordion ---- */
  const [buka, setBuka] = useState<number | null>(0);

  return (
    <section id="galeri" className="scroll-mt-28 bg-slate-50 py-20">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
          {L({ id: 'Jelajahi Kids Zone', en: 'Explore the Kids Zone' })}
        </h2>
        <div className="mt-5 h-px w-full bg-slate-200" />
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
          {L({
            id: 'Intip keceriaan area bermain, pastikan label keamanannya, dan temukan jawaban untuk pertanyaan orang tua.',
            en: 'Peek at the play area’s cheer, check its safety badge, and find answers to parents’ questions.',
          })}
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* ============ WIDGET 1: GALERI KECERIAAN ============ */}
          <KartuWidget
            ikon={Camera}
            judul={L({ id: 'Galeri Keceriaan', en: 'Cheer Gallery' })}
            sub={L({ id: 'Lihat suasana area bermain.', en: 'See the play area in action.' })}
          >
            <button
              type="button"
              onClick={() => setLihatGaleri((v) => !v)}
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-sky-500 px-6 py-3.5 text-base font-extrabold text-white shadow-lg shadow-sky-500/25 transition-all hover:bg-sky-600 active:scale-[0.98]"
            >
              <Images className="h-5 w-5" />
              {lihatGaleri
                ? L({ id: 'Tutup Galeri', en: 'Close Gallery' })
                : L({ id: 'Lihat Foto / Video', en: 'View Photos / Video' })}
            </button>

            {lihatGaleri && (
              <div className="mt-5 grid grid-cols-2 gap-3">
                {GALERI.map((g) => (
                  <div
                    key={g.label.id}
                    className={`flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl ${g.kelas}`}
                  >
                    <g.ikon className="h-9 w-9" />
                    <span className="text-sm font-bold text-slate-700">{L(g.label)}</span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500">
                      <Play className="h-3 w-3" />
                      {L({ id: 'demo', en: 'demo' })}
                    </span>
                  </div>
                ))}
              </div>
            )}
            <p className="mt-auto pt-4 text-sm font-semibold text-slate-400">
              {L({ id: 'Pratinjau demo, galeri foto asli segera ditambahkan.', en: 'Demo preview, real photos coming soon.' })}
            </p>
          </KartuWidget>

          {/* ============ WIDGET 2: BADGE CHILD-SAFE ============ */}
          <KartuWidget
            ikon={ShieldCheck}
            judul={L({ id: 'Jaminan Keamanan', en: 'Safety Assurance' })}
            sub={L({ id: 'Label yang bisa Anda percayai.', en: 'A badge you can trust.' })}
          >
            <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-6 text-center">
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">
                <ShieldCheck className="h-10 w-10" />
              </span>
              <p className="mt-4 text-xl font-extrabold leading-tight text-emerald-800">
                {L({ id: '100% Child-Safe', en: '100% Child-Safe' })}
              </p>
              <p className="text-sm font-bold text-emerald-700">
                {L({ id: '& Regularly Disinfected', en: '& Regularly Disinfected' })}
              </p>
              <ul className="mt-5 w-full space-y-2 text-left">
                {BADGE_PUANS.map((p) => (
                  <li key={p.id} className="flex items-center gap-2 text-sm font-semibold text-emerald-800">
                    <CircleCheck className="h-4 w-4 shrink-0 text-emerald-600" />
                    {L(p)}
                  </li>
                ))}
              </ul>
            </div>
          </KartuWidget>

          {/* ============ WIDGET 3: FAQ ORANG TUA ============ */}
          <KartuWidget
            ikon={CircleHelp}
            judul={L({ id: 'FAQ Orang Tua', en: 'Parent FAQ' })}
            sub={L({ id: 'Pertanyaan yang sering muncul.', en: 'Questions parents often ask.' })}
          >
            <div className="flex flex-1 flex-col gap-3">
              {FAQ.map((f, i) => {
                const aktif = buka === i;
                return (
                  <div key={f.q.id} className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                    <button
                      type="button"
                      onClick={() => setBuka(aktif ? null : i)}
                      className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                    >
                      <span className="text-base font-bold text-slate-800">{L(f.q)}</span>
                      <ChevronDown className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${aktif ? 'rotate-180' : ''}`} />
                    </button>
                    {aktif && (
                      <div className="border-t border-slate-200 bg-white px-4 py-3">
                        <p className="flex items-start gap-2 text-sm leading-relaxed text-slate-600">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                          {L(f.a)}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </KartuWidget>
        </div>
      </div>
    </section>
  );
};

export default TamanBermainWidgets;
