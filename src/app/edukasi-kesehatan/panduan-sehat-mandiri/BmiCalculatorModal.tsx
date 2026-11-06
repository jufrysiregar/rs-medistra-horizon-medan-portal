'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { CircleAlert, Mars, Venus, X } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import type { Language } from '../../../types';
import logoBmi from '@/images/logo/BMI.png';

type Teks = { id: string; en: string };

/* ==================== STANDAR KLASIFIKASI ====================
 * Kemenkes RI memakai ambang Asia Pasifik, bukan WHO: normal berhenti di 22,9
 * (WHO 24,9) dan obesitas sudah mulai di 25,0 (WHO 30,0). */
const BMI_MIN_IDEAL = 18.5;
const BMI_MAX_IDEAL = 22.9;

/** Rentang input yang masih wajar untuk dewasa. */
const TB_MIN = 100;
const TB_MAX = 250;
const BB_MIN = 20;
const BB_MAX = 300;

type Kat = 'kurus' | 'normal' | 'lebih' | 'obesitas';

const KATEGORI: Record<Kat, { label: Teks; chip: string }> = {
  kurus: { label: { id: 'Kurus', en: 'Underweight' }, chip: 'bg-blue-100 text-blue-700' },
  normal: { label: { id: 'Normal', en: 'Normal' }, chip: 'bg-emerald-100 text-emerald-700' },
  lebih: { label: { id: 'Overweight', en: 'Overweight' }, chip: 'bg-amber-100 text-amber-700' },
  obesitas: { label: { id: 'Obesitas', en: 'Obese' }, chip: 'bg-rose-100 text-rose-700' },
};

/**
 * desimal1() adalah SATU-SATUNYA sumber angka desimal: dipakai bersama oleh tampilan
 * dan badge. Kalau keduanya membulatkan sendiri, BMI 22,95 bisa tampil "22,9" tapi
 * berbadge Overweight.
 */
const desimal1 = (n: number) => Number(n.toFixed(1));

const angka = (n: number, lang: Language) =>
  desimal1(n).toLocaleString(lang === 'id' ? 'id-ID' : 'en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

function kategoriDariBmi(bmi: number): Kat {
  const n = desimal1(bmi);
  if (n < BMI_MIN_IDEAL) return 'kurus';
  if (n <= BMI_MAX_IDEAL) return 'normal';
  if (n <= 24.9) return 'lebih';
  return 'obesitas';
}

/** Sumbu bar skala hasil: 14-30, dengan batas hue dipatok pada ambang badge. */
const SKALA_MIN = 14;
const SKALA_MAX = 30;
const pctSkala = (bmi: number) =>
  Math.min(100, Math.max(0, ((desimal1(bmi) - SKALA_MIN) / (SKALA_MAX - SKALA_MIN)) * 100));

/** Koma desimal, maksimal satu. Titik tidak pernah masuk ke kolom, jadi titik hanya
    ada di dalam saat Number() membaca nilainya. */
const parseDesimal = (v: string): number => (/^\d+(,\d+)?$/.test(v) ? Number(v.replace(',', '.')) : NaN);

/** Karakter lain dibuang dan koma kedua juga dibuang — titik tidak diterjemahkan jadi
    koma, dia memang tidak diterima. */
const bersihDesimal = (raw: string) => {
  const v = raw.replace(/[^\d,]/g, '');
  const i = v.indexOf(',');
  return i < 0 ? v : `${v.slice(0, i + 1)}${v.slice(i + 1).replace(/,/g, '')}`;
};

interface Hasil {
  bmi: number;
  kat: Kat;
  min: number;
  max: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

const BmiCalculatorModal: React.FC<Props> = ({ open, onClose }) => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (t: Teks) => t[lang];

  const [jenisKelamin, setJenisKelamin] = useState('');
  const [tinggi, setTinggi] = useState('');
  const [berat, setBerat] = useState('');
  const [hasil, setHasil] = useState<Hasil | null>(null);
  const [galat, setGalat] = useState('');

  /* Esc untuk menutup + kunci scroll latar: tanpa keduanya modal menutup halaman
     di belakangnya dan body ikut bergeser saat overlay di-scroll. */
  useEffect(() => {
    if (!open) return;
    const kunciEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    const overflowSebelum = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', kunciEsc);
    return () => {
      document.body.style.overflow = overflowSebelum;
      window.removeEventListener('keydown', kunciEsc);
    };
  }, [open, onClose]);

  /* Mengubah input apa pun membatalkan hasil lama: angka di layar tidak lagi
     mewakili angka di kolom. */
  const batalHasil = () => {
    setHasil(null);
    setGalat('');
  };
  const ubah = (set: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    set(bersihDesimal(e.target.value));
    batalHasil();
  };

  const isiLengkap = tinggi.trim() !== '' && berat.trim() !== '';

  const hitung = (e: React.FormEvent) => {
    e.preventDefault();
    const tb = parseDesimal(tinggi);
    const bb = parseDesimal(berat);
    const gagal = (pesan: Teks) => {
      setHasil(null);
      setGalat(L(pesan));
    };

    if (!Number.isFinite(tb) || !Number.isFinite(bb)) {
      gagal({ id: 'Tinggi & berat harus angka.', en: 'Height and weight must be numbers.' });
      return;
    }
    if (tb < TB_MIN || tb > TB_MAX) {
      gagal({ id: `Tinggi ${TB_MIN}-${TB_MAX} cm.`, en: `Height must be ${TB_MIN}-${TB_MAX} cm.` });
      return;
    }
    if (bb < BB_MIN || bb > BB_MAX) {
      gagal({ id: `Berat ${BB_MIN}-${BB_MAX} kg.`, en: `Weight must be ${BB_MIN}-${BB_MAX} kg.` });
      return;
    }

    const meter = tb / 100;
    const bmi = bb / (meter * meter);
    setGalat('');
    setHasil({
      bmi,
      kat: kategoriDariBmi(bmi),
      min: BMI_MIN_IDEAL * meter * meter,
      max: BMI_MAX_IDEAL * meter * meter,
    });
  };

  const labelKolom = 'block text-xs font-bold uppercase tracking-[0.14em] text-slate-500';
  const inputKolom =
    'mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3.5 text-lg font-semibold text-slate-900 outline-none transition-all placeholder:font-normal placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/15';

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="bmi-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="bmi-judul"
            initial={{ opacity: 0, scale: 0.95, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-[28px] bg-white shadow-[0_36px_90px_-24px_rgba(8,145,178,0.5)] ring-1 ring-slate-200/70"
          >
            {/* Kepala: lembar gradien tipis dengan emblem, judul, dan satu baris
                keterangan; tombol tutup mengambang di pojok kanan atas. */}
            <div className="relative bg-gradient-to-br from-cyan-50 via-white to-blue-50 px-5 pb-6 pt-7 sm:px-7">
              <span
                aria-hidden
                className="pointer-events-none absolute -right-6 -top-16 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.28),rgba(255,255,255,0)_70%)] blur-lg"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label={L({ id: 'Tutup', en: 'Close' })}
                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-slate-500 ring-1 ring-slate-200 transition-colors hover:bg-white hover:text-cyan-700"
              >
                <X className="h-5 w-5" />
              </button>

              <Image
                src={logoBmi}
                alt=""
                width={52}
                height={52}
                sizes="52px"
                className="relative h-[52px] w-[52px] object-contain drop-shadow-[0_10px_18px_rgba(8,145,178,0.28)]"
              />
              <h3 id="bmi-judul" className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-navy-950">
                {L({ id: 'Kalkulator BMI', en: 'BMI Calculator' })}
              </h3>
              <p className="mt-1.5 text-sm font-semibold text-slate-500">
                {L({
                  id: 'Standar Kemenkes RI (Asia Pasifik) · usia 18+',
                  en: 'Kemenkes RI (Asia-Pacific) standard · 18+',
                })}
              </p>
            </div>

            <div className="px-5 pb-7 pt-5 sm:px-7">
              <form onSubmit={hitung}>
                <p id="bmi-jk" className={labelKolom}>
                  {L({ id: 'Jenis Kelamin', en: 'Sex' })}
                </p>
                <div role="group" aria-labelledby="bmi-jk" className="mt-2 grid grid-cols-2 gap-1 rounded-2xl bg-slate-100 p-1">
                  {[
                    { v: 'laki-laki', t: { id: 'Laki-laki', en: 'Male' }, Icon: Mars, warna: 'text-blue-600' },
                    { v: 'perempuan', t: { id: 'Perempuan', en: 'Female' }, Icon: Venus, warna: 'text-red-600' },
                  ].map((o) => {
                    const aktif = jenisKelamin === o.v;
                    return (
                      <button
                        key={o.v}
                        type="button"
                        aria-pressed={aktif}
                        onClick={() => {
                          setJenisKelamin(aktif ? '' : o.v);
                          batalHasil();
                        }}
                        className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-2 py-2.5 text-sm font-bold transition-all sm:gap-2 sm:px-4 sm:text-base ${
                          aktif ? `${o.warna} bg-white shadow-sm ring-1 ring-slate-200` : `opacity-50 ${o.warna} hover:opacity-100`
                        }`}
                      >
                        {/* Simbol Mars/Venus tetap hitam supaya warna hanya jadi
                            penanda teks, bukan dua-duanya. */}
                        <o.Icon className="h-4 w-4 shrink-0 text-slate-900 sm:h-5 sm:w-5" />
                        {L(o.t)}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="bmi-tb" className={labelKolom}>
                      {L({ id: 'Tinggi (cm)', en: 'Height (cm)' })}
                    </label>
                    {/* type="number" dibuang: browser ikut menyaring isi kolom dan
                        min/max-nya menolak submit sebelum pesan merah kita tampil. */}
                    <input
                      id="bmi-tb"
                      type="text"
                      inputMode="decimal"
                      autoComplete="off"
                      value={tinggi}
                      onChange={ubah(setTinggi)}
                      placeholder="169,5"
                      className={inputKolom}
                    />
                  </div>
                  <div>
                    <label htmlFor="bmi-bb" className={labelKolom}>
                      {L({ id: 'Berat (kg)', en: 'Weight (kg)' })}
                    </label>
                    <input
                      id="bmi-bb"
                      type="text"
                      inputMode="decimal"
                      autoComplete="off"
                      value={berat}
                      onChange={ubah(setBerat)}
                      placeholder="65,5"
                      className={inputKolom}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!isiLengkap}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-700 px-6 py-4 text-lg font-extrabold text-white shadow-lg shadow-cyan-600/30 transition-all hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:from-slate-200 disabled:to-slate-200 disabled:text-slate-400 disabled:shadow-none"
                >
                  {L({ id: 'Hitung BMI', en: 'Calculate' })}
                </button>
              </form>

              {galat && (
                <p
                  role="alert"
                  className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 ring-1 ring-red-100"
                >
                  <CircleAlert className="h-5 w-5 shrink-0" />
                  {galat}
                </p>
              )}

              <AnimatePresence>
                {hasil && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    aria-live="polite"
                    className="mt-5 rounded-2xl bg-gradient-to-br from-cyan-50 via-white to-blue-50 p-5 ring-1 ring-cyan-100"
                  >
                    <div className="flex flex-wrap items-end justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                          {L({ id: 'BMI Anda', en: 'Your BMI' })}
                        </p>
                        <p className="mt-1 text-5xl font-extrabold leading-none tracking-tight text-navy-950">
                          {angka(hasil.bmi, lang)}
                        </p>
                      </div>
                      <span className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm font-extrabold ${KATEGORI[hasil.kat].chip}`}>
                        {L(KATEGORI[hasil.kat].label)}
                      </span>
                    </div>

                    <div className="relative mt-5 h-2.5 rounded-full bg-[linear-gradient(90deg,#60a5fa_0_28%,#34d399_28%_56%,#fbbf24_56%_68%,#fb7185_68%_100%)]">
                      <span
                        style={{ left: `${pctSkala(hasil.bmi)}%` }}
                        className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-navy-900 shadow-md"
                      />
                    </div>

                    <p className="mt-4 text-base font-semibold text-slate-600">
                      {L({ id: 'Berat ideal:', en: 'Ideal weight:' })}{' '}
                      <span className="font-extrabold text-navy-950">
                        {angka(hasil.min, lang)}–{angka(hasil.max, lang)} kg
                      </span>
                    </p>

                    <p className="mt-3 border-t border-slate-200/80 pt-3 text-xs leading-relaxed text-slate-500">
                      {L({
                        id: 'Bukan diagnosis medis. Konsultasikan ke dokter gizi.',
                        en: 'Not a medical diagnosis. Consult a nutrition doctor.',
                      })}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BmiCalculatorModal;
