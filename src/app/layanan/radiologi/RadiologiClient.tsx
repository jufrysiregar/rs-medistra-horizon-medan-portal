'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Activity,
  BadgeCheck,
  Ban,
  Baby,
  Bone,
  Brain,
  Clock,
  Droplets,
  FileText,
  Heart,
  Layers,
  MapPin,
  Microscope,
  Radiation,
  ScanLine,
  ShieldCheck,
  Stethoscope,
  Syringe,
  Waves,
  Wallet,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import type { Language } from '../../../types';
import radiologiHero from '@/images/hero/layanan/radiologi.jpg';
import radiologiHeroMobile from '@/images/hero/mobile-layanan/radiologi.jpg';
import RadiologiWidgets from './RadiologiWidgets';

type Teks = { id: string; en: string };
type Ikon = React.ComponentType<{ className?: string }>;

/* ============================== DATA HALAMAN ============================== */

/** Tujuh modalitas pencitraan yang dilayani instalasi radiologi. */
const MODALITAS: { judul: Teks; ket: Teks; ikon: Ikon }[] = [
  {
    judul: { id: 'MRI High-Tesla 1.5 Tesla', en: 'High-Tesla 1.5 Tesla MRI' },
    ket: {
      id: 'Pencitraan jaringan lunak tanpa sinar-X, ideal untuk otak, tulang belakang, sendi, dan organ dalam.',
      en: 'Soft-tissue imaging without X-rays, ideal for the brain, spine, joints and internal organs.',
    },
    ikon: Brain,
  },
  {
    judul: { id: 'CT-Scan Multi-Slice (MSCT) 128 Slice', en: '128-Slice Multi-Slice CT (MSCT)' },
    ket: {
      id: 'Pemindaian cepat dan detail untuk trauma, stroke, angiografi, serta deteksi penyakit akut.',
      en: 'Fast, detailed scanning for trauma, stroke, angiography and acute disease detection.',
    },
    ikon: Layers,
  },
  {
    judul: { id: 'X-Ray Digital', en: 'Digital X-Ray' },
    ket: {
      id: 'Rontgen dada, tulang, dan gigi dengan dosis rendah serta hasil tayang seketika di layar.',
      en: 'Chest, bone and dental radiography at a low dose with results shown instantly on screen.',
    },
    ikon: Bone,
  },
  {
    judul: { id: 'USG 3D/4D & Doppler', en: '3D/4D Ultrasound & Doppler' },
    ket: {
      id: 'Pemeriksaan kandungan, kandungan empedu, dan aliran darah tanpa radiasi sama sekali.',
      en: 'Obstetric, abdominal and blood-flow studies with no radiation at all.',
    },
    ikon: Waves,
  },
  {
    judul: { id: 'Mammografi Digital', en: 'Digital Mammography' },
    ket: {
      id: 'Skrining dini kanker payudara dengan citra resolusi tinggi dan dosis radiasi terukur.',
      en: 'Early breast-cancer screening with high-resolution images and a measured radiation dose.',
    },
    ikon: Heart,
  },
  {
    judul: { id: 'Fluoroskopi & C-Arm', en: 'Fluoroscopy & C-Arm' },
    ket: {
      id: 'Citra bergerak waktu nyata untuk pemeriksaan saluran cerna dan panduan tindakan operasi.',
      en: 'Real-time moving images for gastrointestinal studies and guiding operating-theatre procedures.',
    },
    ikon: ScanLine,
  },
  {
    judul: { id: 'BMD, Densitometri Tulang', en: 'BMD, Bone Densitometry' },
    ket: {
      id: 'Pengukuran kepadatan tulang (DXA) untuk mendeteksi osteoporosis sejak dini.',
      en: 'Bone-density measurement (DXA) to detect osteoporosis early.',
    },
    ikon: Radiation,
  },
];

/** Tindakan radiologi intervensi (minimal invasif) untuk banner sorotan. */
const INTERVENSI: { judul: Teks; ket: Teks; ikon: Ikon }[] = [
  {
    judul: { id: 'Biopsi Terpandu Citra', en: 'Image-Guided Biopsy' },
    ket: { id: 'Pengambilan sampel jaringan presisi tanpa bedah terbuka.', en: 'Precise tissue sampling without open surgery.' },
    ikon: Microscope,
  },
  {
    judul: { id: 'Drainase Abses', en: 'Abscess Drainage' },
    ket: { id: 'Pengeluaran kumpulan cairan/nanah lewat selang kecil terpandu USG/CT.', en: 'Removal of fluid/pus collections via a small USG/CT-guided tube.' },
    ikon: Droplets,
  },
  {
    judul: { id: 'Embolisasi', en: 'Embolisation' },
    ket: { id: 'Penutupan pembuluh darah untuk menghentikan perdarahan atau tumor.', en: 'Sealing blood vessels to stop bleeding or feed a tumour.' },
    ikon: Activity,
  },
  {
    judul: { id: 'Pemasangan Jalur (Line)', en: 'Line Placement' },
    ket: { id: 'Pemasangan kateter vena central & port kemoterapi terpandu citra.', en: 'Image-guided central venous catheter & chemotherapy port placement.' },
    ikon: Syringe,
  },
];

/** Tiga pilar keselamatan radiasi. */
const KESELAMATAN: { judul: Teks; ket: Teks; ikon: Ikon }[] = [
  {
    judul: { id: 'Prinsip ALARA', en: 'ALARA Principle' },
    ket: {
      id: 'As Low As Reasonably Achievable, dosis radiasi dijaga sekecil mungkin, tetap aman, dan hasil diagnostik tetap optimal.',
      en: 'As Low As Reasonably Achievable, radiation dose kept as small as safely possible while the diagnostic result stays optimal.',
    },
    ikon: Activity,
  },
  {
    judul: { id: 'Peralatan Proteksi', en: 'Protective Equipment' },
    ket: {
      id: 'Apron timbal, pelindung tiroid, dan gonad shield dipakai pasien serta petugas selama pemeriksaan berlangsung.',
      en: 'Lead aprons, thyroid guards and gonad shields are worn by patients and staff throughout the examination.',
    },
    ikon: ShieldCheck,
  },
  {
    judul: { id: 'Skrining Kontras & Alergi', en: 'Contrast & Allergy Screening' },
    ket: {
      id: 'Evaluasi fungsi ginjal dan riwayat alergi dilakukan sebelum pemberian zat kontras untuk mencegah reaksi merugikan.',
      en: 'Kidney-function assessment and an allergy history are reviewed before contrast is given to prevent adverse reactions.',
    },
    ikon: Syringe,
  },
];

/** Empat tahap panduan pasien (bentuk timeline). */
const PANDUAN: { judul: Teks; ket: Teks; ikon: Ikon }[] = [
  {
    judul: { id: 'Puasa', en: 'Fasting' },
    ket: {
      id: 'Puasa 4-6 jam untuk USG abdomen maupun CT/MRI dengan zat kontras agar organ terlihat jelas.',
      en: 'Fast 4-6 hours for an abdominal ultrasound or a contrast CT/MRI so the organs show up clearly.',
    },
    ikon: Clock,
  },
  {
    judul: { id: 'Lepas Logam', en: 'Remove Metal' },
    ket: {
      id: 'Lepas perhiasan, jam tangan, dan benda logam sebelum MRI/CT-Scan demi keamanan dan kejernihan citra.',
      en: 'Remove jewellery, watches and metal objects before an MRI/CT for safety and image clarity.',
    },
    ikon: Ban,
  },
  {
    judul: { id: 'Skrining Kehamilan', en: 'Pregnancy Screening' },
    ket: {
      id: 'Wajib menginfo status kehamilan agar sinar-X dihindari atau dosis disesuaikan bila perlu.',
      en: 'You must disclose any pregnancy so X-rays can be avoided or the dose adjusted when needed.',
    },
    ikon: Baby,
  },
  {
    judul: { id: 'Hasil Digital', en: 'Digital Results' },
    ket: {
      id: 'Citra terhubung via PACS (DICOM) langsung ke dokter pengirim, bacaan awal tersedia hari yang sama.',
      en: 'Images link via PACS (DICOM) straight to the referring doctor, an initial read is available the same day.',
    },
    ikon: FileText,
  },
];

/** Dua jalur penjaminan biaya. */
const PENJAMINAN: { judul: Teks; pill: Teks; ket: Teks; titik: Teks[]; ikon: Ikon; kelas: string }[] = [
  {
    judul: { id: 'Penjaminan BPJS', en: 'BPJS Coverage' },
    pill: { id: 'Sesuai indikasi medis', en: 'By medical indication' },
    ket: {
      id: 'Pemeriksaan dijamin sepanjang sesuai indikasi medis dan tertib administrasi rujukan berjenjang.',
      en: 'Scans are covered as long as they follow a medical indication and the orderly stepped-referral administration.',
    },
    titik: [
      { id: 'Surat pengantar / permintaan DPJP', en: 'Referral letter / requesting physician order' },
      { id: 'Modalitas yang dijamin sesuai ketentuan', en: 'Covered modalities per the regulations' },
      { id: 'Verifikasi kepesertaan saat daftar', en: 'Membership verification at registration' },
    ],
    ikon: ShieldCheck,
    kelas: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  },
  {
    judul: { id: 'Asuransi & Umum', en: 'Insurance & Self Paying' },
    pill: { id: 'Cashless terintegrasi', en: 'Integrated cashless' },
    ket: {
      id: 'Asuransi swasta diproses cashless, pasien umum menerima rincian biaya transparan per modalitas.',
      en: 'Private insurance is processed cashless, while self-paying patients get a transparent per-modality cost breakdown.',
    },
    titik: [
      { id: 'Rincian kontras vs non-kontras jelas', en: 'Clear contrast vs non-contrast breakdown' },
      { id: 'Cashless dengan kartu peserta', en: 'Cashless with the member card' },
      { id: 'Kwitansi & hasil tersimpan digital', en: 'Receipt and result stored digitally' },
    ],
    ikon: Wallet,
    kelas: 'border-sky-200 bg-sky-50 text-sky-700',
  },
];

/* ================================ RENDER ================================ */

/** Judul section editorial: H2 besar + divider tipis. */
const JudulSection: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">{children}</h2>
);

const RadiologiClient: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (t: Teks) => t[lang];

  return (
    <div className="bg-white text-slate-800">
      {/* ============ 1. HERO (LATAR PENUH FOTO) ============ */}
      <section className="relative overflow-hidden bg-white pt-16 pb-12 lg:pt-20 lg:pb-16">
        {/* radiologi.jpg dipakai sebagai latar penuh hero. */}
        <div aria-hidden className="absolute inset-0">
          <Image src={radiologiHeroMobile} alt="" fill priority sizes="100vw" quality={90} className="object-cover object-right md:hidden" />
                    <Image src={radiologiHero} alt="" fill priority sizes="100vw" quality={90} className="hidden object-cover md:block" />
        </div>
        {/* Scrim: putih pekat hanya di sisi kiri (sampai ±45%), kanan 100% bening. */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-white from-20% via-white/70 to-transparent to-60%" />

        <div className="relative z-10 mr-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="max-w-3xl">
            <h1 className="text-[clamp(2.5rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight text-slate-900">
              {L({ id: 'Instalasi Radiologi & Pencitraan Medis', en: 'Radiology & Medical Imaging Installation' })}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              {L({
                id: 'Dari rontgen digital dan USG hingga CT-Scan 128 slice serta MRI 1.5 Tesla, seluruh alat dikalibrasi berkala dan dosis radiasi dioptimalkan mengikuti prinsip ALARA, sehingga citra yang sampai ke dokter Anda tajam, aman, dan dapat dipercaya.',
                en: 'From digital radiography and ultrasound up to 128-slice CT and 1.5 Tesla MRI, every device is calibrated regularly and the radiation dose is optimised under the ALARA principle, so the image reaching your doctor is sharp, safe and trustworthy.',
              })}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
                <Clock className="h-5 w-5 shrink-0 text-sky-600" />
                {L({ id: 'CT Darurat 24 Jam', en: '24-Hour Emergency CT' })}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
                <BadgeCheck className="h-5 w-5 shrink-0 text-sky-600" />
                {L({ id: 'Izin BAPETEN', en: 'BAPETEN Licensed' })}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
                <MapPin className="h-5 w-5 shrink-0 text-sky-600" />
                {L({ id: 'Lt G · Diagnostic Imaging Center, South Wing', en: 'Ground Floor · Diagnostic Imaging Center, South Wing' })}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 2. MODALITAS PENCITRAAN (GRID 4 KOLOM) ============ */}
      <section id="modalitas" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <JudulSection>{L({ id: 'Modalitas Pencitraan', en: 'Imaging Modalities' })}</JudulSection>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Tujuh modalitas lengkap menutupi kebutuhan diagnostik, dari skrining rutin hingga kasus akut yang menuntut citra cepat dan presisi.',
              en: 'Seven complete modalities cover diagnostic needs, from routine screening to acute cases that demand fast, precise imaging.',
            })}
          </p>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {MODALITAS.map((m, i) => (
              <motion.article
                key={m.judul.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-sky-100 bg-sky-50 text-sky-700">
                  <m.ikon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-lg font-extrabold leading-snug tracking-tight text-slate-900">{L(m.judul)}</h3>
                <p className="mt-2 text-base leading-relaxed text-slate-600">{L(m.ket)}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 3. RADIOLOGI INTERVENSI (BANNER SOROTAN) ============ */}
      <section id="intervensi" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="overflow-hidden rounded-3xl border-2 border-sky-200 bg-slate-50 p-8 sm:p-12">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-lg shadow-sky-600/25">
                <Stethoscope className="h-8 w-8" />
              </span>
              <div>
                <JudulSection>{L({ id: 'Radiologi Intervensi (Minimal Invasif)', en: 'Interventional Radiology (Minimally Invasive)' })}</JudulSection>
                <p className="mt-3 max-w-4xl text-lg leading-relaxed text-slate-600">
                  {L({
                    id: 'Tindakan diagnostik & terapeutik (seperti biopsi, drainase, embolisasi) tanpa operasi terbuka dengan panduan citra presisi.',
                    en: 'Diagnostic & therapeutic procedures (such as biopsy, drainage, embolisation) without open surgery, guided by precise imaging.',
                  })}
                </p>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {INTERVENSI.map((it) => (
                <div key={it.judul.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-sky-100 bg-sky-50 text-sky-700">
                    <it.ikon className="h-6 w-6" />
                  </span>
                  <h4 className="mt-4 text-base font-extrabold leading-snug text-slate-900">{L(it.judul)}</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{L(it.ket)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ 4. KESELAMATAN RADIASI (GRID 3 KOLOM) ============ */}
      <section id="keselamatan" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <JudulSection>{L({ id: 'Keselamatan Radiasi', en: 'Radiation Safety' })}</JudulSection>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Keamanan Anda dijaga lewat tiga lapis: pengendalian dosis, alat pelindung, dan saringan sebelum zat kontras diberikan.',
              en: 'Your safety is guarded on three levels: dose control, protective equipment and screening before any contrast is given.',
            })}
          </p>
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {KESELAMATAN.map((k, i) => (
              <motion.article
                key={k.judul.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="flex h-full flex-col rounded-2xl border-2 border-slate-200 bg-white p-8 shadow-sm"
              >
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-lg shadow-sky-600/25">
                  <k.ikon className="h-8 w-8" />
                </span>
                <h3 className="mt-6 text-xl font-extrabold leading-snug tracking-tight text-slate-900">{L(k.judul)}</h3>
                <p className="mt-3 text-lg leading-relaxed text-slate-600">{L(k.ket)}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 5. PANDUAN PASIEN (TIMELINE 4 TAHAP) ============ */}
      <section id="panduan" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <JudulSection>{L({ id: 'Panduan Sebelum Pemeriksaan', en: 'Guide Before Your Scan' })}</JudulSection>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Empat tahap singkat yang membuat pemeriksaan berjalan lancar, aman, dan hasilnya paling jelas.',
              en: 'Four quick steps that keep your scan smooth, safe and produce the clearest possible images.',
            })}
          </p>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PANDUAN.map((p, i) => (
              <motion.div
                key={p.judul.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="relative flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sky-600 text-base font-extrabold text-white">
                    {i + 1}
                  </span>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-sky-100 bg-white text-sky-700">
                    <p.ikon className="h-6 w-6" />
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-extrabold leading-snug tracking-tight text-slate-900">{L(p.judul)}</h3>
                <p className="mt-2 text-base leading-relaxed text-slate-600">{L(p.ket)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 6. PENJAMINAN (2 KARTU) ============ */}
      <section id="penjaminan" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <JudulSection>{L({ id: 'Penjaminan Biaya', en: 'Cost Coverage' })}</JudulSection>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {PENJAMINAN.map((p) => (
              <article key={p.judul.id} className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
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
                      <ScanLine className="mt-0.5 h-5 w-5 shrink-0 text-sky-600" />
                      {L(t)}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 7. WIDGETS INTERAKTIF ============ */}
      <RadiologiWidgets />
    </div>
  );
};

export default RadiologiClient;
