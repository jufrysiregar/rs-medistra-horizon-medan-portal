'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, ChevronLeft, MapPin, Send } from 'lucide-react';
import OverhaulLink from '../../../../components/OverhaulLink';
import LamarModal from '../LamarModal';
import { useLanguage } from '../../../../context/LanguageContext';
import { HALAMAN_KARIR, formatTanggalWIB } from '../../../../lib/karir';
import type { KarirLoker } from '../../../../types';

/**
 * HALAMAN DETAIL LOWONGAN (/tentang-kami/karir/[id]).
 * Satu kolom rata kiri: tautan kembali, judul posisi (H1), baris tanggal WIB +
 * lokasi, SELURUH kualifikasi (tidak dipotong seperti di kartu list), lalu pita
 * cara melamar dengan tombol yang membuka <LamarModal />. Light theme penuh.
 */
export const KarirDetailClient: React.FC<{ loker: KarirLoker }> = ({ loker }) => {
  const { language } = useLanguage();
  const L = (id: string, en: string) => (language === 'en' ? en : id);
  const [buka, setBuka] = useState(false);

  return (
    <div className="bg-white text-slate-800">
      <div className="mx-auto w-full max-w-5xl px-6 pb-24 pt-28 lg:px-8 lg:pb-28 lg:pt-32">
        {/* ================= KEMBALI ================= */}
        <OverhaulLink
          href={HALAMAN_KARIR}
          className="inline-flex items-center gap-1.5 text-base font-bold text-slate-500 transition-colors hover:text-cyan-700"
        >
          <ChevronLeft className="h-4 w-4" />
          {L('Kembali ke daftar lowongan', 'Back to all vacancies')}
        </OverhaulLink>

        {/* ================= JUDUL (SATUNYA H1 DI HALAMAN INI) ================= */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mt-7"
        >
          <h1 className="text-balance text-4xl font-extrabold leading-[1.12] tracking-tight text-slate-900 lg:text-5xl">
            {loker.posisi}
          </h1>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-base font-semibold text-slate-600">
            <p className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 shrink-0 text-slate-400" />
              {L('Dibuka', 'Posted')} {formatTanggalWIB(loker.tanggal_posting)}
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="h-5 w-5 shrink-0 text-slate-400" />
              {loker.lokasi}
            </p>
          </div>
        </motion.div>

        {/* ================= KESELURUHAN KUALIFIKASI ================= */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: 'easeOut' }}
          className="mt-12 rounded-3xl border border-slate-200 bg-slate-50/70 p-6 lg:p-10"
        >
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 lg:text-3xl">
            {L('Kualifikasi yang Dicari', 'Required Qualifications')}
          </h2>
          <ol className="mt-7 space-y-4">
            {loker.kualifikasi.map((k, i) => (
              <li key={k} className="flex gap-4 text-lg leading-relaxed text-slate-700">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-sm font-extrabold text-cyan-800">
                  {i + 1}
                </span>
                <span>{k}</span>
              </li>
            ))}
          </ol>
        </motion.section>

        {/* ================= PITA CARA MELAMAR ================= */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18, ease: 'easeOut' }}
          className="mt-10 flex flex-col gap-6 rounded-3xl border border-cyan-100 bg-gradient-to-br from-cyan-50 via-white to-slate-50 p-6 sm:flex-row sm:items-center sm:justify-between lg:p-8"
        >
          <div className="max-w-xl">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
              {L('Cara Melamar', 'How to Apply')}
            </h2>
            <p className="mt-2 text-lg leading-relaxed text-slate-600">
              {L(
                'Pilih salah satu saluran: email Tim HRD, profil kami di Jobstreet, atau WhatsApp. Pesan dan subjek sudah terisi otomatis, termasuk sapaan yang menyesuaikan jam WIB.',
                'Pick one channel: email our HRD team, apply on our Jobstreet profile, or use WhatsApp. The message and subject are prefilled, including a greeting that follows WIB time.',
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setBuka(true)}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-cyan-700 px-7 py-4 text-lg font-bold text-white shadow-lg shadow-cyan-600/20 transition-colors hover:bg-cyan-800"
          >
            <Send className="h-5 w-5" />
            {L('Lamar Sekarang', 'Apply Now')}
          </button>
        </motion.div>
      </div>

      {buka && <LamarModal loker={loker} tutup={() => setBuka(false)} />}
    </div>
  );
};

export default KarirDetailClient;
