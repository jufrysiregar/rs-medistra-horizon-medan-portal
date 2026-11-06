'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  BadgeCheck,
  BedDouble,
  Briefcase,
  Check,
  ClipboardList,
  CircleAlert,
  CreditCard,
  FlaskConical,
  HandCoins,
  IdCard,
  LogOut,
  Network,
  NotebookPen,
  PenLine,
  Shield,
  ShieldCheck,
  Stethoscope,
  Wallet,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import type { Language } from '../../../types';
import AlurAsuransiWidgets from './AlurAsuransiWidgets';
import AlurAsuransiFaq from './AlurAsuransiFaq';

type Teks = { id: string; en: string };
type Ikon = React.ComponentType<{ className?: string }>;

/* ============================== DATA HALAMAN ============================== */

/** Tiga kategori direktori mitra penjamin. */
const DIREKTORI: { judul: Teks; ket: Teks; ikon: Ikon }[] = [
  {
    judul: { id: 'Asuransi Swasta', en: 'Private Insurance' },
    ket: { id: 'Prudential, Allianz, Manulife, AIA, dan puluhan lainnya.', en: 'Prudential, Allianz, Manulife, AIA and dozens more.' },
    ikon: Shield,
  },
  {
    judul: { id: 'Penyedia Jasa TPA', en: 'TPA Administrators' },
    ket: { id: 'AdMedika, Fullmoon, Synnex, dan administrator klaim terpercaya.', en: 'AdMedika, Fullmoon, Synnex and trusted claim administrators.' },
    ikon: Network,
  },
  {
    judul: { id: 'Kemitraan Perusahaan', en: 'Corporate Partnership' },
    ket: { id: 'BUMN, BUMD, dan perusahaan swasta sebagai penjamin karyawan.', en: 'State-owned, regional and private companies covering their employees.' },
    ikon: Briefcase,
  },
];

/** Alur rawat jalan cashless — stepper horizontal (5 langkah). */
const RAWAT_JALAN: { judul: Teks; ket: Teks; ikon: Ikon }[] = [
  { judul: { id: 'Registrasi Counter Asuransi', en: 'Insurance Counter Check-In' }, ket: { id: 'Tunjukkan kartu asuransi & KTP.', en: 'Show your insurance card & ID.' }, ikon: ClipboardList },
  { judul: { id: 'Verifikasi TPA', en: 'TPA Verification' }, ket: { id: 'Penerbitan lembar jaminan.', en: 'A guarantee letter is issued.' }, ikon: BadgeCheck },
  { judul: { id: 'Konsultasi & Tindakan Dokter', en: 'Doctor Consultation & Care' }, ket: { id: 'Diperiksa dokter spesialis.', en: 'Seen by a specialist.' }, ikon: Stethoscope },
  { judul: { id: 'Penjaminan Obat & Lab', en: 'Medicine & Lab Coverage' }, ket: { id: 'Obat, lab, radiologi dijamin sesuai plafon.', en: 'Medicine, lab & radiology covered per policy.' }, ikon: FlaskConical },
  { judul: { id: 'Tanda Tangan Klaim & Obat', en: 'Sign Claim & Get Medicine' }, ket: { id: 'Tanda tangan di kasir, ambil obat di farmasi.', en: 'Sign at the cashier, collect at pharmacy.' }, ikon: PenLine },
];

/** Alur rawat inap cashless — stepper vertikal (5 langkah). */
const RAWAT_INAP: { judul: Teks; ket: Teks; ikon: Ikon }[] = [
  { judul: { id: 'Surat Pengantar Rawat Inap', en: 'Admission Referral Letter' }, ket: { id: 'Diterbitkan dokter poli atau tim UGD.', en: 'Issued by the clinic doctor or ER team.' }, ikon: NotebookPen },
  { judul: { id: 'Surat Jaminan Awal (Initial GL)', en: 'Initial Guarantee Letter' }, ket: { id: 'TPA/asuransi menerbitkan jaminan awal.', en: 'The TPA/insurer issues an initial guarantee.' }, ikon: BadgeCheck },
  { judul: { id: 'Pemilihan Kelas Kamar', en: 'Room Class Selection' }, ket: { id: 'Penjelasan excess charge bila naik kelas.', en: 'Excess-charge explained if you upgrade.' }, ikon: BedDouble },
  { judul: { id: 'Monitoring Biaya Harian', en: 'Daily Cost Monitoring' }, ket: { id: 'Dipantau tim Insurance Relation.', en: 'Watched by the Insurance Relation team.' }, ikon: Activity },
  { judul: { id: 'Kepulangan & Final GL', en: 'Discharge & Final GL' }, ket: { id: 'Surat jaminan akhir, proses 1-3 jam.', en: 'Final guarantee letter, 1-3 hours process.' }, ikon: LogOut },
];

/** Dokumen wajib asuransi. */
const DOKUMEN: Teks[] = [
  { id: 'Kartu Asuransi Fisik atau E-Card', en: 'Physical insurance card or e-card' },
  { id: 'KTP / KIA (untuk anak)', en: 'ID card / Child ID card (for children)' },
  { id: 'Formulir Klaim yang telah diisi', en: 'A completed claim form' },
  { id: 'Surat Rujukan (bila dari faskes/perusahaan)', en: 'Referral letter (if from a referring facility/company)' },
];

/** Berkas bantuan reimbursement. */
const REIMBURSE: Teks[] = [
  { id: 'Resume medis rawat inap/jalan', en: 'Inpatient/outpatient medical resume' },
  { id: 'Kuitansi rawat lengkap bermaterai', en: 'Complete itemised receipt(s)' },
  { id: 'Hasil laboratorium & penunjang', en: 'Laboratory & supporting results' },
];

/* ================================ RENDER ================================ */

/** Judul section editorial: H2 besar + divider tipis. */
const JudulSection: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">{children}</h2>
);

const AlurAsuransiClient: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (t: Teks) => t[lang];

  return (
    <div className="bg-white text-slate-800">
      {/* ============ 1. HERO (TENGAH, TANPA GAMBAR) ============ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 pt-20 pb-14 lg:pt-24 lg:pb-16">
        <div className="mx-auto w-full max-w-7xl px-6 text-center lg:px-12">
          <h1 className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl">
            {L({ id: 'Pusat Layanan Asuransi Swasta & Rekanan', en: 'Private & Partner Insurance Service Center' })}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Cukup tunjukkan kartu, biarkan tim Insurance Relation kami yang mengurus penjaminan Anda. Dari registrasi hingga kepulangan, Anda fokus pada pemulihan tanpa pusing soal administrasi dan pembayaran di muka.',
              en: 'Simply present your card and let our Insurance Relation team handle your coverage. From registration to discharge, you focus on recovery, without the headache of paperwork and upfront payment.',
            })}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
              <ShieldCheck className="h-5 w-5 shrink-0 text-blue-600" />
              {L({ id: '50+ Mitra Penjamin', en: '50+ Partners' })}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
              <CreditCard className="h-5 w-5 shrink-0 text-blue-600" />
              {L({ id: 'Cashless Tanpa Bayar Dimuka', en: 'Cashless, No Upfront' })}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
              <Network className="h-5 w-5 shrink-0 text-blue-600" />
              {L({ id: 'TPA & Korporat', en: 'TPA & Corporate' })}
            </span>
          </div>
        </div>
      </section>

      {/* ============ 2. DIREKTORI MITRA (GRID 3) ============ */}
      <section id="mitra" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <JudulSection>{L({ id: 'Direktori Mitra Penjamin', en: 'Guarantor Directory' })}</JudulSection>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Tiga kelompok mitra yang kami terima sebagai penjamin biaya pengobatan Anda.',
              en: 'Three groups of partners we accept to cover your treatment costs.',
            })}
          </p>
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {DIREKTORI.map((d, i) => (
              <motion.article
                key={d.judul.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-700">
                  <d.ikon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-900">{L(d.judul)}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600">{L(d.ket)}</p>
              </motion.article>
            ))}
          </div>
          <p className="mt-8 text-base font-semibold text-slate-500">
            {L({
              id: 'Mencakup Rawat Jalan, Rawat Inap, UGD, Operasi, Persalinan, & MCU.',
              en: 'Covering outpatient, inpatient, emergency, surgery, delivery & medical check-up.',
            })}
          </p>
        </div>
      </section>

      {/* ============ 3. ALUR RAWAT JALAN (STEPPER HORIZONTAL) ============ */}
      <section id="rawat-jalan" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <JudulSection>{L({ id: 'Alur Rawat Jalan Cashless', en: 'Cashless Outpatient Flow' })}</JudulSection>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Lima langkah tanpa bayar dimuka saat berobat jalan dengan asuransi.',
              en: 'Five no-upfront-payment steps for an outpatient visit with insurance.',
            })}
          </p>
          <ol className="relative mt-12 flex flex-col gap-8 lg:grid lg:grid-cols-5 lg:gap-6">
            <div aria-hidden className="absolute bottom-6 left-8 top-6 w-0.5 bg-blue-200 lg:hidden" />
            <div aria-hidden className="absolute left-0 right-0 top-8 hidden h-0.5 bg-blue-200 lg:block" />
            {RAWAT_JALAN.map((s, i) => (
              <li key={s.judul.id} className="relative flex items-start gap-5 lg:flex-col lg:items-center lg:gap-3 lg:text-center">
                <span className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-600 text-2xl font-extrabold text-white shadow-lg shadow-blue-600/25">
                  {i + 1}
                </span>
                <div>
                  <span className="mb-2 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-700 lg:mb-0">
                    <s.ikon className="h-6 w-6" />
                  </span>
                  <h3 className="text-lg font-extrabold leading-snug text-slate-900">{L(s.judul)}</h3>
                  <p className="mt-1 text-base leading-relaxed text-slate-600">{L(s.ket)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ 4. ALUR RAWAT INAP (STEPPER VERTIKAL) ============ */}
      <section id="rawat-inap" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <JudulSection>{L({ id: 'Alur Rawat Inap Cashless', en: 'Cashless Inpatient Flow' })}</JudulSection>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Dari surat pengantar hingga kepulangan, penjaminan Anda dipantau penuh oleh tim kami.',
              en: 'From the referral letter to discharge, your coverage is fully monitored by our team.',
            })}
          </p>
          <ol className="relative mt-12 max-w-3xl space-y-8 pl-12">
            <div aria-hidden className="absolute bottom-4 left-6 top-4 w-0.5 -translate-x-1/2 bg-blue-200" />
            {RAWAT_INAP.map((s, i) => (
              <li key={s.judul.id} className="relative">
                <span className="absolute -left-12 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-extrabold text-white shadow-lg shadow-blue-600/25 ring-4 ring-slate-50">
                  {i + 1}
                </span>
                <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-700">
                    <s.ikon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-lg font-extrabold leading-snug text-slate-900">{L(s.judul)}</h3>
                    <p className="mt-1 text-base leading-relaxed text-slate-600">{L(s.ket)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ 5. DOKUMEN & EXCESS CHARGE (2 KOLOM) ============ */}
      <section id="dokumen" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <JudulSection>{L({ id: 'Dokumen & Excess Charge', en: 'Documents & Excess Charge' })}</JudulSection>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <div className="mt-12 grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-10">
            {/* Kiri: dokumen wajib */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/25">
                  <IdCard className="h-7 w-7" />
                </span>
                <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">
                  {L({ id: 'Dokumen Wajib', en: 'Required Documents' })}
                </h3>
              </div>
              <ul className="mt-6 space-y-3">
                {DOKUMEN.map((d) => (
                  <li key={d.id} className="flex items-start gap-3 text-base text-slate-700">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <Check className="h-4 w-4" />
                    </span>
                    {L(d)}
                  </li>
                ))}
              </ul>
            </div>

            {/* Kanan: excess charge (highlight amber) */}
            <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-8 shadow-sm">
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-amber-200 bg-white text-amber-600">
                  <CircleAlert className="h-7 w-7" />
                </span>
                <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">
                  {L({ id: 'Excess Charge', en: 'Excess Charge' })}
                </h3>
              </div>
              <p className="mt-5 text-lg leading-relaxed text-slate-700">
                {L({
                  id: 'Selisih biaya, misalnya saat Anda menaikkan kelas kamar melebihi hak plafon asuransi, menjadi tanggungan mandiri. Tenang, sisa biaya ini dapat dibayar praktis via QRIS maupun kartu debit di kasir.',
                  en: 'Any cost difference, for example when you upgrade your room class above your insured entitlement, is borne out-of-pocket. No worries, this balance can be paid conveniently via QRIS or debit card at the cashier.',
                })}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-4 py-2 text-sm font-bold text-amber-700">
                  <Wallet className="h-4 w-4" /> {L({ id: 'Bayar via QRIS', en: 'Pay via QRIS' })}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-4 py-2 text-sm font-bold text-amber-700">
                  <CreditCard className="h-4 w-4" /> {L({ id: 'Kartu Debit', en: 'Debit Card' })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 6. REIMBURSEMENT (BANNER ABU) ============ */}
      <section id="reimbursement" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="rounded-3xl border border-slate-200 bg-slate-100 p-8 shadow-sm sm:p-12">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[auto_1fr]">
              <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-blue-600 text-white shadow-lg shadow-blue-600/25">
                <HandCoins className="h-10 w-10" />
              </span>
              <div>
                <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                  {L({ id: 'Bantuan Klaim Reimbursement', en: 'Reimbursement Claim Assistance' })}
                </h3>
                <p className="mt-3 text-lg leading-relaxed text-slate-600">
                  {L({
                    id: 'Berobat lebih dulu, klaim kemudian? Untuk asuransi non-cashless, rumah sakit siap membantu kelengkapan berkas klaim Anda agar proses penggantian biaya berjalan lancar.',
                    en: 'Pay first, claim later? For non-cashless insurance, the hospital is ready to help complete your claim documents so the reimbursement runs smoothly.',
                  })}
                </p>
                <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {REIMBURSE.map((r) => (
                    <li key={r.id} className="flex items-start gap-2 text-base font-semibold text-slate-700">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                      {L(r)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 7. WIDGETS INTERAKTIF ============ */}
      <AlurAsuransiWidgets />

      {/* ============ 8. FAQ (SECTION PALING BAWAH, SEBELUM FOOTER) ============ */}
      <AlurAsuransiFaq />
    </div>
  );
};

export default AlurAsuransiClient;
