'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Activity,
  BadgeCheck,
  Barcode,
  Car,
  ClipboardList,
  Clock,
  Cpu,
  Droplets,
  FlaskConical,
  Home,
  MapPin,
  Microscope,
  ScanLine,
  ShieldCheck,
  Siren,
  Smartphone,
  Timer,
  Wallet,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import type { Language } from '../../../types';
import labHero from '@/images/hero/layanan/LAB.jpg';
import labHeroMobile from '@/images/hero/mobile-layanan/LAB.jpg';
import LaboratoriumWidgets from './LaboratoriumWidgets';

type Teks = { id: string; en: string };
type Ikon = React.ComponentType<{ className?: string }>;

/* ============================== DATA HALAMAN ============================== */

/** Empat kelompok pemeriksaan yang dilayani laboratorium sentral. */
const JENIS: { judul: Teks; ket: Teks; titik: Teks[]; ikon: Ikon }[] = [
  {
    judul: { id: 'Patologi Klinik', en: 'Clinical Pathology' },
    ket: {
      id: 'Pemeriksaan darah, cairan tubuh, dan urin untuk menyaring, mendiagnosis, serta memantau penyakit.',
      en: 'Blood, body-fluid and urine testing to screen, diagnose and monitor disease.',
    },
    titik: [
      { id: 'Hematologi & koagulasi', en: 'Haematology & coagulation' },
      { id: 'Kimia klinik', en: 'Clinical chemistry' },
      { id: 'Imunologi & serologi', en: 'Immunology & serology' },
      { id: 'Urinalisis', en: 'Urinalysis' },
    ],
    ikon: Droplets,
  },
  {
    judul: { id: 'Patologi Anatomi', en: 'Anatomical Pathology' },
    ket: {
      id: 'Pemeriksaan jaringan dan sel untuk menegakkan diagnosis, termasuk kecurigaan keganasan.',
      en: 'Tissue and cell examination to establish a diagnosis, including suspected malignancy.',
    },
    titik: [
      { id: 'Histopatologi', en: 'Histopathology' },
      { id: 'Sitologi', en: 'Cytology' },
      { id: 'Pewarnaan khusus', en: 'Special staining' },
      { id: 'Kontrol mutu sediaan', en: 'Slide quality control' },
    ],
    ikon: Microscope,
  },
  {
    judul: { id: 'Mikrobiologi & Molekuler', en: 'Microbiology & Molecular' },
    ket: {
      id: 'Identifikasi penyebab infeksi dan pemeriksaan material genetik untuk diagnosis yang presisi.',
      en: 'Identifying the cause of infection and testing genetic material for a precise diagnosis.',
    },
    titik: [
      { id: 'Kultur & sensitivitas', en: 'Culture & sensitivity' },
      { id: 'PCR & diagnosis molekuler', en: 'PCR & molecular diagnostics' },
      { id: 'Pewarnaan Gram', en: 'Gram stain' },
      { id: 'Skrining infeksi menular', en: 'Transmissible infection screening' },
    ],
    ikon: FlaskConical,
  },
  {
    judul: { id: 'Layanan Cito & Kegawatdaruratan', en: 'Emergency (Cito) Service' },
    ket: {
      id: 'Pemeriksaan darurat yang harus segera keluar nilainya untuk menolong pasien kritis.',
      en: 'Urgent tests that must report a value immediately to save a critical patient.',
    },
    titik: [
      { id: 'Siaga untuk UGD & ICU', en: 'On standby for the ED & ICU' },
      { id: 'Dukungan ruang operasi', en: 'Operating-theatre support' },
      { id: 'Troponin, D-dimer, AGD', en: 'Troponin, D-dimer, blood gas' },
      { id: 'Nilai kritis < 15 menit', en: 'Critical value < 15 minutes' },
    ],
    ikon: Siren,
  },
];

/** Tiga layanan unggulan yang membedakan lab ini. */
const UNGGULAN: { judul: Teks; ket: Teks; ikon: Ikon }[] = [
  {
    judul: { id: 'Homecare Lab Sampling', en: 'Homecare Lab Sampling' },
    ket: {
      id: 'Petugas phlebotomist datang ke rumah untuk mengambil sampel, ideal bagi lansia, pasien pasca rawat, dan keluarga sibuk. Hasil tetap masuk ke sistem yang sama.',
      en: 'A phlebotomist comes to your home to collect the sample, ideal for the elderly, post-discharge patients and busy families. Results still enter the same system.',
    },
    ikon: Home,
  },
  {
    judul: { id: 'Drive-Thru Laboratorium', en: 'Laboratory Drive-Thru' },
    ket: {
      id: 'Ambil sampel tanpa turun dari mobil di gerbang khusus. Cukup tunjukkan identitas dan formulir, petugas melayani langsung di lokasi Anda berhenti.',
      en: 'Give a sample without leaving your car at a dedicated gate. Show your ID and form, and staff serve you right where you park.',
    },
    ikon: Car,
  },
  {
    judul: { id: 'Hasil Digital', en: 'Digital Results' },
    ket: {
      id: 'Hasil resmi berbentuk PDF dikirim lewat WhatsApp, email, atau aplikasi pasien. Riwayat lama tersimpan rapi dan bisa diunduh kapan pun.',
      en: 'Official PDF results are sent via WhatsApp, email or the patient app. Past records are stored neatly and can be downloaded anytime.',
    },
    ikon: Smartphone,
  },
];

/** Otomatisasi & kendali mutu di sisi kiri section teknologi. */
const TEKNOLOGI: { judul: Teks; ket: Teks; ikon: Ikon }[] = [
  {
    judul: { id: 'Laboratory Information System (LIS)', en: 'Laboratory Information System (LIS)' },
    ket: {
      id: 'Setiap tabung diberi label barcode sejak pendaftaran. Sampel terlacak otomatis dari pengambilan hingga hasil tayang, mengurangi risiko salah identifikasi.',
      en: 'Every tube is barcode-labelled from registration. Samples are tracked automatically from draw to result, cutting the risk of misidentification.',
    },
    ikon: Barcode,
  },
  {
    judul: { id: 'Automated Clinical Analyzers', en: 'Automated Clinical Analyzers' },
    ket: {
      id: 'Analyzer hematologi dan kimia klinik bekerja terotomasi dengan kalibrasi berkala, sehingga waktu tunggu dipercepat tanpa mengurangi akurasi.',
      en: 'Haematology and chemistry analysers run automated with regular calibration, speeding up turnaround without lowering accuracy.',
    },
    ikon: Cpu,
  },
  {
    judul: { id: 'Pemantauan Mutu (PME / PMI)', en: 'Quality Control (EQA / IQC)' },
    ket: {
      id: 'Pemantauan Mutu Eksternal dan Internal dijalankan rutin, terakreditasi ISO 15189. Nilai kritis diverifikasi lalu dilaporkan ke dokter kurang dari 15 menit.',
      en: 'External and Internal Quality Control run on a schedule under ISO 15189 accreditation. Critical values are verified then reported to the doctor in under 15 minutes.',
    },
    ikon: ShieldCheck,
  },
];

/** Panduan persiapan pasien di sisi kanan (bentuk timeline). */
const PANDUAN: { judul: Teks; ket: Teks; ikon: Ikon }[] = [
  {
    judul: { id: 'Puasa 10-12 Jam', en: 'Fast for 10-12 Hours' },
    ket: {
      id: 'Untuk gula darah dan profil lemak, berpuasa 10-12 jam sebelum pengambilan. Air putih tetap boleh. Ikuti instruksi pada formulir pemeriksaan Anda.',
      en: 'For blood glucose and lipid profiles, fast 10-12 hours before sampling. Plain water is allowed. Follow the instruction on your test form.',
    },
    ikon: Clock,
  },
  {
    judul: { id: 'Pengambilan Sampel', en: 'Sample Collection' },
    ket: {
      id: 'Darah diambil oleh phlebotomist bersertifikat. Untuk urin/feces, ambil wadah steril di counter lab dan ikuti panduan pengambilan mandiri yang diberikan.',
      en: 'Blood is drawn by a certified phlebotomist. For urine/stool, collect a sterile container at the lab counter and follow the self-collection guide provided.',
    },
    ikon: Droplets,
  },
  {
    judul: { id: 'Estimasi Waktu Hasil (TAT)', en: 'Turnaround Time (TAT)' },
    ket: {
      id: 'Rutin umumnya selesai 1-3 jam. Kultur & sensitivitas 3-5 hari karena bakteri perlu ditumbuhkan. Cito dikerjakan segera.',
      en: 'Routine work is usually done in 1-3 hours. Culture & sensitivity take 3-5 days to grow bacteria. Cito is processed immediately.',
    },
    ikon: Timer,
  },
];

/** Dua jalur penjaminan biaya. */
const PENJAMINAN: { judul: Teks; pill: Teks; ket: Teks; titik: Teks[]; ikon: Ikon; kelas: string }[] = [
  {
    judul: { id: 'Penjaminan BPJS', en: 'BPJS Coverage' },
    pill: { id: 'Sesuai indikasi medis', en: 'By medical indication' },
    ket: {
      id: 'Pemeriksaan dijamin sepanjang sesuai indikasi medis dan tertib administrasi rujukan berjenjang.',
      en: 'Tests are covered as long as they follow a medical indication and the orderly stepped-referral administration.',
    },
    titik: [
      { id: 'Surat pengantar / permintaan DPJP', en: 'Referral letter / requesting physician order' },
      { id: 'Sesuai kelas & hak rawat', en: 'In line with your care class & entitlement' },
      { id: 'Verifikasi kepesertaan saat daftar', en: 'Membership verification at registration' },
    ],
    ikon: ShieldCheck,
    kelas: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  },
  {
    judul: { id: 'Asuransi & Umum', en: 'Insurance & Self Paying' },
    pill: { id: 'Cashless terintegrasi', en: 'Integrated cashless' },
    ket: {
      id: 'Asuransi swasta diproses cashless lewat penjamin yang terintegrasi, pasien umum menerima rincian biaya transparan.',
      en: 'Private insurance is processed cashless through integrated guarantors, while self-paying patients receive a transparent cost breakdown.',
    },
    titik: [
      { id: 'Cashless dengan kartu peserta', en: 'Cashless with the member card' },
      { id: 'Rincian tarif transparan sebelum tindakan', en: 'Transparent tariff breakdown before the test' },
      { id: 'Kwitansi & hasil tersimpan digital', en: 'Receipt and result stored digitally' },
    ],
    ikon: Wallet,
    kelas: 'border-teal-200 bg-teal-50 text-teal-700',
  },
];

/* ================================ RENDER ================================ */

/** Judul section editorial: H2 besar + divider tipis. */
const JudulSection: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">{children}</h2>
);

const LaboratoriumClient: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (t: Teks) => t[lang];

  return (
    <div className="bg-white text-slate-800">
      {/* ============ 1. HERO (LATAR PENUH FOTO) ============ */}
      <section className="relative overflow-hidden bg-white pt-16 pb-12 lg:pt-20 lg:pb-16">
        {/* LAB.jpg dipakai sebagai latar penuh hero. */}
        <div aria-hidden className="absolute inset-0">
          <Image src={labHeroMobile} alt="" fill priority sizes="100vw" quality={90} className="object-cover object-right md:hidden" />
                    <Image src={labHero} alt="" fill priority sizes="100vw" quality={90} className="hidden object-cover md:block" />
        </div>
        {/* Scrim: putih pekat hanya di sisi kiri (sampai ±45%), kanan 100% bening. */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-white from-20% via-white/70 to-transparent to-60%" />

        <div className="relative z-10 mr-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="max-w-3xl">
            <h1 className="text-[clamp(2.5rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight text-slate-900">
              {L({ id: 'Instalasi Laboratorium Terpadu', en: 'Integrated Laboratory Installation' })}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              {L({
                id: 'Laboratorium sentral kami siaga 24 jam untuk pasien rawat jalan maupun rawat inap. Setiap sampel terlacak lewat barcode, dikerjakan analyzer terotomasi, dan diawasi mutu internal-eksternal berstandar ISO 15189, sehingga hasil yang sampai ke dokter Anda dapat dipercaya.',
                en: 'Our central laboratory is on standby 24 hours for outpatients and inpatients alike. Every sample is barcode-tracked, processed by automated analysers and supervised by ISO 15189 internal-external quality control, so the result reaching your doctor can be trusted.',
              })}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
                <Clock className="h-5 w-5 shrink-0 text-teal-600" />
                {L({ id: 'Siaga 24 Jam', en: '24-Hour Standby' })}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
                <BadgeCheck className="h-5 w-5 shrink-0 text-teal-600" />
                {L({ id: 'Akreditasi ISO 15189', en: 'ISO 15189 Accredited' })}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
                <MapPin className="h-5 w-5 shrink-0 text-teal-600" />
                {L({ id: 'Lt G · Central Laboratory, North Wing', en: 'Ground Floor · Central Laboratory, North Wing' })}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 2. JENIS PEMERIKSAAN (GRID 4 KOLOM) ============ */}
      <section id="jenis" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <JudulSection>{L({ id: 'Jenis Pemeriksaan', en: 'Types of Examination' })}</JudulSection>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Empat kelompok pemeriksaan besar melayani hampir seluruh kebutuhan diagnostik klinik, dari skrining rutin hingga kasus infeksi yang rumit.',
              en: 'Four major examination groups serve almost all clinical diagnostic needs, from routine screening to complex infection cases.',
            })}
          </p>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {JENIS.map((j, i) => (
              <motion.article
                key={j.judul.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-teal-100 bg-teal-50 text-teal-700">
                  <j.ikon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-900">{L(j.judul)}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600">{L(j.ket)}</p>
                <ul className="mt-5 space-y-2 border-t border-slate-100 pt-5">
                  {j.titik.map((t) => (
                    <li key={t.id} className="flex items-start gap-2 text-base text-slate-700">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                      {L(t)}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 3. LAYANAN UNGGULAN (GRID 3 KOLOM) ============ */}
      <section id="unggulan" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <JudulSection>{L({ id: 'Layanan Unggulan', en: 'Flagship Services' })}</JudulSection>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Kapan pun dan di mana pun Anda berada, pengambilan sampel dan hasil pemeriksaan dirancang agar tetap mudah diakses.',
              en: 'Wherever you are, sample collection and results are designed to stay within easy reach.',
            })}
          </p>
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {UNGGULAN.map((u, i) => (
              <motion.article
                key={u.judul.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="flex h-full flex-col rounded-2xl border-2 border-teal-200 bg-slate-50 p-8 shadow-sm"
              >
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-teal-600 text-white shadow-lg shadow-teal-600/25">
                  <u.ikon className="h-8 w-8" />
                </span>
                <h3 className="mt-6 text-2xl font-extrabold leading-snug tracking-tight text-slate-900">{L(u.judul)}</h3>
                <p className="mt-3 text-lg leading-relaxed text-slate-600">{L(u.ket)}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 4. TEKNOLOGI & JAMINAN MUTU (2 KOLOM) ============ */}
      <section id="teknologi" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <JudulSection>{L({ id: 'Teknologi & Jaminan Mutu', en: 'Technology & Quality Assurance' })}</JudulSection>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Kiri: teknologi */}
            <div>
              <h3 className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-slate-900">
                <Activity className="h-7 w-7 shrink-0 text-teal-600" />
                {L({ id: 'Otomatisasi & Kendali Mutu', en: 'Automation & Quality Control' })}
              </h3>
              <div className="mt-6 space-y-6">
                {TEKNOLOGI.map((t) => (
                  <div key={t.judul.id} className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-teal-100 bg-teal-50 text-teal-700">
                      <t.ikon className="h-7 w-7" />
                    </span>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">{L(t.judul)}</h4>
                      <p className="mt-1 text-base leading-relaxed text-slate-600">{L(t.ket)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Kanan: panduan pasien (timeline) */}
            <div>
              <h3 className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-slate-900">
                <ClipboardList className="h-7 w-7 shrink-0 text-teal-600" />
                {L({ id: 'Panduan Sebelum Pemeriksaan', en: 'Guide Before Your Test' })}
              </h3>
              <ol className="mt-6 space-y-6 border-l-2 border-teal-200 pl-6">
                {PANDUAN.map((p, i) => (
                  <li key={p.judul.id} className="relative">
                    <span className="absolute -left-[35px] flex h-9 w-9 items-center justify-center rounded-full border-2 border-teal-500 bg-white text-teal-700">
                      <p.ikon className="h-4 w-4" />
                    </span>
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                      <p className="text-sm font-extrabold uppercase tracking-widest text-teal-600">
                        {L({ id: `Langkah ${i + 1}`, en: `Step ${i + 1}` })}
                      </p>
                      <h4 className="mt-1 text-lg font-bold text-slate-900">{L(p.judul)}</h4>
                      <p className="mt-2 text-base leading-relaxed text-slate-600">{L(p.ket)}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 5. PENJAMINAN (2 KARTU) ============ */}
      <section id="penjaminan" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <JudulSection>{L({ id: 'Penjaminan Biaya', en: 'Cost Coverage' })}</JudulSection>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {PENJAMINAN.map((p) => (
              <article key={p.judul.id} className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
                <div className="flex items-center gap-4">
                  <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border ${p.kelas}`}>
                    <p.ikon className="h-7 w-7" />
                  </span>
                  <div>
                    <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">{L(p.judul)}</h3>
                    <span className={`mt-1 inline-block rounded-full border px-3 py-0.5 text-sm font-bold ${p.kelas}`}>{L(p.pill)}</span>
                  </div>
                </div>
                <p className="mt-5 text-lg leading-relaxed text-slate-600">{L(p.ket)}</p>
                <ul className="mt-6 space-y-3 border-t border-slate-200 pt-6">
                  {p.titik.map((t) => (
                    <li key={t.id} className="flex items-start gap-3 text-base text-slate-700">
                      <ScanLine className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
                      {L(t)}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 6. WIDGETS INTERAKTIF ============ */}
      <LaboratoriumWidgets />
    </div>
  );
};

export default LaboratoriumClient;
