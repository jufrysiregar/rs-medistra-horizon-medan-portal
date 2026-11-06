'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Check,
  MessagesSquare,
  Microscope,
  Network,
  Power,
  Send,
  ShieldCheck,
  Signature,
  FlaskConical,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import type { Language } from '../../../types';
import KerjasamaWidgets from './KerjasamaWidgets';

type Teks = { id: string; en: string };
type Ikon = React.ComponentType<{ className?: string }>;

/* ============================== DATA HALAMAN ============================== */

/** Katalog mitra per kategori (nama ditampilkan sebagai pill). */
const KATALOG: { judul: Teks; ket: Teks; ikon: Ikon; items: string[] }[] = [
  {
    judul: { id: 'Asuransi Swasta & TPA', en: 'Private Insurance & TPA' },
    ket: { id: 'Penjamin cashless & administrator klaim.', en: 'Cashless guarantors & claim administrators.' },
    ikon: ShieldCheck,
    items: ['AdMedika', 'Prudential', 'Allianz', 'Care III', 'Manulife', 'AIA', 'Mandiri Inhealth', 'MSIG'],
  },
  {
    judul: { id: 'Jaminan Pemerintah', en: 'Government Guarantee' },
    ket: { id: 'Program jaminan kesehatan nasional.', en: 'National health insurance programs.' },
    ikon: Building2,
    items: ['BPJS Kesehatan'],
  },
  {
    judul: { id: 'Mitra Farmasi', en: 'Pharmaceutical Partners' },
    ket: { id: 'Industri farmasi & penyedia obat.', en: 'Pharma industry & medicine suppliers.' },
    ikon: FlaskConical,
    items: ['Pfizer', 'Kimia Farma', 'Kalbe Farma'],
  },
];

/** Empat skema kerjasama B2B. */
const SKEMA: { judul: Teks; poin: Teks[]; ikon: Ikon }[] = [
  {
    judul: { id: 'Corporate Healthcare', en: 'Corporate Healthcare' },
    poin: [
      { id: 'Rawat Jalan & Rawat Inap', en: 'Outpatient & Inpatient' },
      { id: 'MCU Massal Karyawan', en: 'Mass Employee Check-Up' },
      { id: 'In-House Clinic', en: 'In-House Clinic' },
    ],
    ikon: Building2,
  },
  {
    judul: { id: 'Asuransi & TPA Baru', en: 'New Insurance & TPA' },
    poin: [
      { id: 'Perluasan Jaringan Rekanan', en: 'Network Expansion' },
      { id: 'Integrasi API Klaim', en: 'Claim API Integration' },
    ],
    ikon: Network,
  },
  {
    judul: { id: 'Rujukan & Sterilisasi', en: 'Referral & Sterilisation' },
    poin: [
      { id: 'Laboratorium Molekuler', en: 'Molecular Laboratory' },
      { id: 'Radiologi', en: 'Radiology' },
      { id: 'CSSD Eksternal', en: 'External CSSD' },
    ],
    ikon: Microscope,
  },
  {
    judul: { id: 'Farmasi & Riset', en: 'Pharma & Research' },
    poin: [
      { id: 'Pengadaan Obat', en: 'Medicine Procurement' },
      { id: 'Simposium / CME', en: 'Symposium / CME' },
    ],
    ikon: FlaskConical,
  },
];

/** Alur pengajuan kerjasama — stepper horizontal (4 langkah). */
const ALUR: { judul: Teks; ket: Teks; ikon: Ikon }[] = [
  { judul: { id: 'Pengajuan Proposal & Profil', en: 'Proposal & Profile Submission' }, ket: { id: 'Kirim profil perusahaan & rencana kerja sama.', en: 'Send your company profile & collaboration plan.' }, ikon: Send },
  { judul: { id: 'Diskusi & Negosiasi Tarif', en: 'Discussion & Rate Negotiation' }, ket: { id: 'Pembahasan skema layanan dan tarif.', en: 'Agree on service scheme and rates.' }, ikon: MessagesSquare },
  { judul: { id: 'Penandatanganan MoU / PKS', en: 'MoU / Agreement Signing' }, ket: { id: 'Kesepakatan dituangkan dalam dokumen resmi.', en: 'The deal is formalised in official documents.' }, ikon: Signature },
  { judul: { id: 'Aktivasi Sistem & Sosialisasi', en: 'System Activation & Rollout' }, ket: { id: 'Integrasi sistem & sosialisasi ke pengguna.', en: 'System integration & user rollout.' }, ikon: Power },
];

/* ================================ RENDER ================================ */

/** Judul section editorial: H2 besar + divider tipis. */
const JudulSection: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">{children}</h2>
);

const KerjasamaClient: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (t: Teks) => t[lang];

  return (
    <div className="bg-white text-slate-800">
      {/* ============ 1. HERO (TENGAH, TANPA GAMBAR) ============ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cyan-50 to-blue-50 pt-20 pb-14 lg:pt-24 lg:pb-16">
        <div className="mx-auto w-full max-w-7xl px-6 text-center lg:px-12">
          <h1 className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl">
            {L({ id: 'Sinergi Kemitraan Kesehatan Terpadu', en: 'Integrated Healthcare Partnership Synergy' })}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Kami membuka kolaborasi strategis lintas sektor, mulai dari asuransi & TPA, korporasi, instansi pemerintah, hingga industri farmasi. Dengan tata kelola transparan dan integrasi sistem yang mulus, setiap kemitraan bermuara pada satu tujuan: pelayanan medis yang lebih cepat, aman, dan bermutu bagi pasien.',
              en: 'We open cross-sector strategic collaboration, including insurers & TPAs, corporates, government institutions and the pharmaceutical industry. With transparent governance and seamless system integration, every partnership serves one goal: faster, safer and higher-quality care for patients.',
            })}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
              <ShieldCheck className="h-5 w-5 shrink-0 text-cyan-600" />
              {L({ id: 'Asuransi & TPA', en: 'Insurance & TPA' })}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
              <Building2 className="h-5 w-5 shrink-0 text-cyan-600" />
              {L({ id: 'Korporat & Pemerintah', en: 'Corporate & Government' })}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
              <FlaskConical className="h-5 w-5 shrink-0 text-cyan-600" />
              {L({ id: 'Industri Farmasi', en: 'Pharmaceutical Industry' })}
            </span>
          </div>
        </div>
      </section>

      {/* ============ 2. KATALOG MITRA (GRID 3) ============ */}
      <section id="katalog" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <JudulSection>{L({ id: 'Katalog Mitra Kerjasama', en: 'Partnership Directory' })}</JudulSection>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Tiga kelompok mitra yang telah dan terus kami ajak berkolaborasi.',
              en: 'Three groups of partners we already collaborate with and keep expanding.',
            })}
          </p>
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {KATALOG.map((k, i) => (
              <motion.article
                key={k.judul.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-100 bg-cyan-50 text-cyan-700">
                    <k.ikon className="h-6 w-6" />
                  </span>
                  <h3 className="text-xl font-extrabold leading-snug tracking-tight text-slate-900">{L(k.judul)}</h3>
                </div>
                <p className="mt-3 text-base leading-relaxed text-slate-500">{L(k.ket)}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {k.items.map((it) => (
                    <span
                      key={it}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 3. SKEMA KERJASAMA B2B (GRID 4) ============ */}
      <section id="skema" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <JudulSection>{L({ id: 'Skema Kerjasama B2B', en: 'B2B Collaboration Schemes' })}</JudulSection>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Model kolaborasi yang dapat disesuaikan dengan kebutuhan institusi Anda.',
              en: 'Collaboration models that can be tailored to your institution’s needs.',
            })}
          </p>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SKEMA.map((s, i) => (
              <motion.article
                key={s.judul.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-800 text-white shadow-lg shadow-blue-800/20">
                  <s.ikon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-lg font-extrabold leading-snug tracking-tight text-slate-900">{L(s.judul)}</h3>
                <ul className="mt-4 space-y-2">
                  {s.poin.map((p) => (
                    <li key={p.id} className="flex items-start gap-2 text-base leading-relaxed text-slate-600">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-cyan-600" />
                      {L(p)}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 4. ALUR PENGAJUAN (STEPPER HORIZONTAL 4) ============ */}
      <section id="alur" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <JudulSection>{L({ id: 'Alur Pengajuan Kerjasama', en: 'Partnership Submission Flow' })}</JudulSection>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Empat langkah terstruktur dari proposal pertama hingga kerja sama aktif.',
              en: 'Four structured steps from the first proposal to an active partnership.',
            })}
          </p>
          <ol className="relative mt-12 flex flex-col gap-8 lg:grid lg:grid-cols-4 lg:gap-6">
            <div aria-hidden className="absolute bottom-6 left-8 top-6 w-0.5 bg-cyan-200 lg:hidden" />
            <div aria-hidden className="absolute left-0 right-0 top-8 hidden h-0.5 bg-cyan-200 lg:block" />
            {ALUR.map((s, i) => (
              <li key={s.judul.id} className="relative flex items-start gap-5 lg:flex-col lg:items-center lg:gap-3 lg:text-center">
                <span className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-800 text-2xl font-extrabold text-white shadow-lg shadow-blue-800/25">
                  {i + 1}
                </span>
                <div>
                  <span className="mb-2 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-100 bg-cyan-50 text-cyan-700 lg:mb-0">
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

      {/* ============ 5 & 6. FORM B2B + FAQ ============ */}
      <KerjasamaWidgets />
    </div>
  );
};

export default KerjasamaClient;
