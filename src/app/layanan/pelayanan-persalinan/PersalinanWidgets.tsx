'use client';

import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Baby,
  Calendar,
  Check,
  Download,
  FileText,
  Image,
  Info,
  Play,
  RotateCcw,
  Sparkles,
  X,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import type { Language } from '../../../types';

type Teks = { id: string; en: string };

/* ------------------------------ DATA ------------------------------ */

const PDF_BROSUR = '/files/brosur-persalinan.pdf';

const ISI_BROSUR: Teks[] = [
  { id: 'Perbandingan paket Normal vs ERACS vs Sesar Konvensional', en: 'Package comparison: Normal vs ERACS vs Conventional Caesarean' },
  { id: 'Rincian fasilitas kamar (VIP, Kelas 1, 2, 3/KRIS)', en: 'Ward facility breakdown (VIP, Class 1, 2, 3/KRIS)' },
  { id: 'Checklist barang bawaan ibu dan bayi', en: 'Packing checklist for mother and baby' },
  { id: 'Alur administrasi BPJS dan asuransi swasta', en: 'Administrative flow for BPJS and private insurance' },
];

const TOUR_ROOMS: { nama: Teks; ket: Teks }[] = [
  { nama: { id: 'Ruang Bersalin (VK)', en: 'Labour Room (VK)' }, ket: { id: 'Kamar privat, tempat tidur multifungsi, fetal monitor', en: 'Private room, multifunction bed, fetal monitor' } },
  { nama: { id: 'Kamar Operasi Sesar', en: 'Caesarean Operating Theatre' }, ket: { id: 'Ruangan tekanan positif, peralatan ERACS', en: 'Positive-pressure room, ERACS equipment' } },
  { nama: { id: 'Ruang Rawat Gabung', en: 'Rooming-In Postnatal Ward' }, ket: { id: 'Kamar VIP dengan sofa keluarga dan bathub', en: 'VIP suite with family sofa and bathtub' } },
  { nama: { id: 'Ruang Laktasi & Konseling', en: 'Lactation and Counselling Room' }, ket: { id: 'Pojok menyusui nyaman untuk pasien dan keluarga', en: 'A comfortable nursing corner for patients and family' } },
];

/* --------------------------- HPL CALCULATOR --------------------------- */

function hitungHPL(hpht: string): { hpl: string; trimester: number } | null {
  if (!hpht) return null;
  const d = new Date(hpht);
  if (isNaN(d.getTime())) return null;
  // Naegele's rule: +7 days, -3 months, +1 year
  const hpl = new Date(d.getFullYear() + 1, d.getMonth() - 2, d.getDate() + 7);
  // Trimester calculation (from today)
  const now = new Date();
  const days = Math.floor((now.getTime() - d.getTime()) / 86400000);
  const trimester = days < 0 ? 1 : days <= 91 ? 1 : days <= 182 ? 2 : 3;
  return {
    hpl: hpl.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
    trimester: Math.min(trimester, 3),
  };
}

/* --------------------------------- PANEL --------------------------------- */

const PersalinanWidgets: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (t: Teks) => t[lang];

  /* --- Kalkulator HPL --- */
  const [hpht, setHpht] = useState('');
  const hasil = useMemo(() => hitungHPL(hpht), [hpht]);

  /* --- Virtual Tour modal --- */
  const [tourOpen, setTourOpen] = useState(false);

  const inputCls =
    'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20';
  const labelCls = 'block text-sm font-extrabold uppercase tracking-wide text-slate-500';

  return (
    <section id="layanan-mandiri" className="scroll-mt-28 bg-white py-20">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
          {L({ id: 'Layanan Mandiri untuk Calon Ibu', en: 'Self-Service for Expecting Mothers' })}
        </h2>
        <div className="mt-5 h-px w-full bg-slate-200" />
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
          {L({
            id: 'Hitung perkiraan tanggal lahir, unduh brosur paket persalinan, dan lihat suasana kamar sebelum hari-H, semua dari genggaman.',
            en: 'Estimate your due date, download the maternity package brochure, and preview the ward atmosphere before the big day, all from the palm of your hand.',
          })}
        </p>

        {/* PANEL BESAR 3 KOLOM */}
        <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-lg sm:p-10">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* ---- KOLOM 1: KALKULATOR HPL ---- */}
            <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-rose-100 bg-rose-50 text-rose-700">
                <Calendar className="h-7 w-7" />
              </span>
              <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-900">
                {L({ id: 'Kalkulator HPL', en: 'Due Date Calculator' })}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {L({
                  id: 'Masukkan hari pertama haid terakhir (HPHT) untuk menghitung perkiraan tanggal persalinan berdasarkan rumus Naegele.',
                  en: 'Enter the first day of your last menstrual period (LMP) to estimate the due date using Naegele\'s rule.',
                })}
              </p>

              <div className="mt-6 flex-1">
                <label className={labelCls} htmlFor="hpht-input">
                  {L({ id: 'Hari Pertama Haid Terakhir', en: 'First Day of Last Period' })}
                </label>
                <input
                  id="hpht-input"
                  type="date"
                  className={`${inputCls} mt-2`}
                  value={hpht}
                  onChange={(e) => setHpht(e.target.value)}
                />

                {hasil && (
                  <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-5">
                    <p className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-rose-700">
                      <Baby className="h-4 w-4" />
                      {L({ id: 'Perkiraan Tanggal Lahir', en: 'Estimated Due Date' })}
                    </p>
                    <p className="mt-2 text-2xl font-extrabold text-rose-900">{hasil.hpl}</p>
                    <p className="mt-3 text-sm font-bold text-rose-800">
                      {L({ id: 'Trimester berjalan:', en: 'Current trimester:' })}{' '}
                      {hasil.trimester} / 3
                    </p>
                    <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-relaxed text-rose-700">
                      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      {L({
                        id: 'Hanya estimasi. Hanya 5% bayi lahir tepat di tanggal HPL. Dokter akan memverifikasi dengan USG.',
                        en: 'Estimate only. Only 5% of babies are born on the exact due date. The doctor will confirm with an ultrasound.',
                      })}
                    </p>
                  </div>
                )}
              </div>

              {hpht && (
                <button type="button" onClick={() => setHpht('')} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-rose-700 hover:text-rose-900">
                  <RotateCcw className="h-4 w-4" />
                  {L({ id: 'Reset', en: 'Reset' })}
                </button>
              )}
            </article>

            {/* ---- KOLOM 2: DOWNLOAD BROSUR ---- */}
            <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-rose-100 bg-rose-50 text-rose-700">
                <FileText className="h-7 w-7" />
              </span>
              <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-900">
                {L({ id: 'Brosur Paket Persalinan', en: 'Maternity Package Brochure' })}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {L({
                  id: 'Perbandingan lengkap paket, checklist bawaan, dan alur administrasi dalam satu PDF.',
                  en: 'A complete package comparison, packing checklist, and administrative flow in one PDF.',
                })}
              </p>

              <ul className="mt-6 space-y-3">
                {ISI_BROSUR.map((i) => (
                  <li key={i.id} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
                    <span className="text-base leading-relaxed text-slate-700">{L(i)}</span>
                  </li>
                ))}
              </ul>

              <a
                href={PDF_BROSUR}
                download
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-rose-600 px-5 py-3.5 text-lg font-extrabold text-white shadow-md shadow-rose-600/25 transition-all hover:bg-rose-700 active:scale-[0.98]"
              >
                <Download className="h-5 w-5 shrink-0" />
                {L({ id: 'Unduh Brosur PDF', en: 'Download PDF Brochure' })}
              </a>

              <p className="mt-4 flex items-start gap-2 text-sm font-semibold leading-relaxed text-slate-600">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
                {L({ id: 'Salinan cetak tersedia di meja perawat Perinaud Lt 6 South Wing.', en: 'A printed copy is available at the Maternity Nurse Desk on Level 6 South Wing.' })}
              </p>
            </article>

            {/* ---- KOLOM 3: VIRTUAL ROOM TOUR ---- */}
            <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-rose-100 bg-rose-50 text-rose-700">
                <Sparkles className="h-7 w-7" />
              </span>
              <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-900">
                {L({ id: 'Virtual Room Tour', en: 'Virtual Room Tour' })}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {L({
                  id: 'Lihat suasana ruang bersalin, kamar operasi, dan rawat gabung sebelum hari-H. Kenali ruangan agar lebih tenang saat tiba waktunya.',
                  en: 'Preview the labour room, operating theatre and postnatal ward before the big day. Knowing the space helps you feel calmer when the time comes.',
                })}
              </p>

              {/* Preview thumbnail mock */}
              <div className="relative mt-6 flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                <Image className="h-16 w-16 text-rose-300" aria-hidden="true" />
                <span className="absolute bottom-3 left-3 rounded-lg bg-white/90 px-3 py-1 text-xs font-bold text-slate-700 shadow-sm">
                  {L({ id: '4 ruangan tersedia', en: '4 rooms available' })}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setTourOpen(true)}
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-rose-600 bg-white px-5 py-3.5 text-lg font-extrabold text-rose-700 shadow-sm transition-all hover:bg-rose-50 active:scale-[0.98]"
              >
                <Play className="h-5 w-5 shrink-0" />
                {L({ id: 'Mulai Tur Ruangan', en: 'Start Room Tour' })}
              </button>
            </article>
          </div>
        </div>
      </div>

      {/* MODAL TOUR (placeholder) */}
      <AnimatePresence>
        {tourOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-50/80 p-4 backdrop-blur-md"
            role="dialog" aria-modal="true" aria-label={L({ id: 'Virtual Room Tour', en: 'Virtual Room Tour' })}
            onClick={() => setTourOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button type="button" onClick={() => setTourOpen(false)} className="absolute right-4 top-4 rounded-full border border-slate-200 bg-slate-50 p-2 text-slate-500 hover:text-slate-900" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
              <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">
                {L({ id: 'Tur Ruangan Persalinan', en: 'Maternity Room Tour' })}
              </h3>
              <p className="mt-2 text-base text-slate-600">
                {L({ id: 'Video 360° dan galeri foto akan segera tersedia. Sementara ini, daftar ruangan yang bisa Anda lihat:', en: '360° video and photo gallery coming soon. In the meantime, here are the rooms you can preview:' })}
              </p>
              <ul className="mt-6 space-y-4">
                {TOUR_ROOMS.map((r) => (
                  <li key={r.nama.id} className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-rose-100 bg-rose-50 text-rose-700">
                      <Image className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-base font-extrabold text-slate-900">{L(r.nama)}</p>
                      <p className="text-sm text-slate-600">{L(r.ket)}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
                {L({ id: 'Konten video/galeri interaktif belum tersedia. Hubungi marketing untuk jadwal tur langsung ke Lt 6 South Wing.', en: 'Interactive video/gallery content is not yet available. Contact marketing to arrange an in-person tour of Level 6 South Wing.' })}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PersalinanWidgets;
