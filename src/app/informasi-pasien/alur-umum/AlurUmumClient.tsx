'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Accessibility,
  Activity,
  ArrowRight,
  CalendarCheck,
  Cigarette,
  ClipboardList,
  Clock,
  Droplets,
  FlaskConical,
  IdCard,
  Pill,
  QrCode,
  Receipt,
  Smartphone,
  Stethoscope,
  Truck,
  Wallet,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import type { Language } from '../../../types';
import OverhaulLink from '../../../components/OverhaulLink';
import AlurUmumWidgets from './AlurUmumWidgets';

type Teks = { id: string; en: string };
type Ikon = React.ComponentType<{ className?: string }>;

/* ============================== DATA HALAMAN ============================== */

/** Tiga persiapan sebelum berkunjung. */
const PERSIAPAN: { judul: Teks; ket: Teks; ikon: Ikon }[] = [
  {
    judul: { id: 'Kelengkapan Berkas', en: 'Bring Your Documents' },
    ket: {
      id: 'Siapkan KTP / SIM / Paspor. Untuk anak, sertakan Kartu Identitas Anak (KIA) dan buku KIA.',
      en: 'Prepare your ID / driving licence / passport. For children, include the Child ID Card (KIA) and health booklet.',
    },
    ikon: IdCard,
  },
  {
    judul: { id: 'Cari Dokter & Jadwal', en: 'Find a Doctor & Schedule' },
    ket: {
      id: 'Telusuri dokter spesialis dan jadwal praktiknya sebelum datang, agar Anda langsung menuju poli yang tepat.',
      en: 'Browse specialists and their practice schedules before arriving, so you head straight to the right clinic.',
    },
    ikon: Stethoscope,
  },
  {
    judul: { id: 'Reservasi H-1', en: 'Reserve a Day Before' },
    ket: {
      id: 'Daftar secara online sehari sebelumnya (H-1) untuk mengunci nomor antrean dan menghindari antre panjang.',
      en: 'Register online a day ahead (H-1) to lock in your queue number and avoid long waiting lines.',
    },
    ikon: CalendarCheck,
  },
];

/** Enam langkah alur berobat (stepper). */
const LANGKAH: { judul: Teks; ket: Teks; ikon: Ikon }[] = [
  {
    judul: { id: 'Registrasi & Check-In', en: 'Registration & Check-In' },
    ket: { id: 'Lewat Kios Mandiri atau Customer Care.', en: 'Via self-service kiosk or Customer Care.' },
    ikon: ClipboardList,
  },
  {
    judul: { id: 'Pemeriksaan Awal', en: 'Initial Screening' },
    ket: { id: 'Cek tensi, suhu, berat badan & riwayat alergi.', en: 'Blood pressure, temperature, weight & allergy history.' },
    ikon: Activity,
  },
  {
    judul: { id: 'Konsultasi Dokter', en: 'Doctor Consultation' },
    ket: { id: 'Pemeriksaan & konsultasi dokter spesialis.', en: 'Examination & consultation with a specialist.' },
    ikon: Stethoscope,
  },
  {
    judul: { id: 'Pemeriksaan Penunjang', en: 'Supporting Examination' },
    ket: { id: 'Laboratorium / radiologi bila diperlukan.', en: 'Laboratory / radiology if needed.' },
    ikon: FlaskConical,
  },
  {
    judul: { id: 'Pembayaran Kasir', en: 'Payment at Cashier' },
    ket: { id: 'QRIS, debit, atau cashless asuransi.', en: 'QRIS, debit, or cashless insurance.' },
    ikon: Wallet,
  },
  {
    judul: { id: 'Pengambilan Obat', en: 'Medicine Pick-Up' },
    ket: { id: 'Di farmasi, disertai edukasi apoteker.', en: 'At the pharmacy, with pharmacist counselling.' },
    ikon: Pill,
  },
];

/** Dua kanal pendaftaran. */
const PENDAFTARAN: { judul: Teks; ket: Teks; titik: Teks[]; ikon: Ikon; kelas: string }[] = [
  {
    judul: { id: 'Pendaftaran Online', en: 'Online Registration' },
    ket: { id: 'Lewat aplikasi atau website resmi rumah sakit.', en: 'Through the hospital’s official app or website.' },
    titik: [
      { id: 'Isi data diri & pilih poli/dokter tujuan.', en: 'Fill in your details & choose the target clinic/doctor.' },
      { id: 'Terima nomor antrean digital via SMS/WhatsApp.', en: 'Receive a digital queue number via SMS/WhatsApp.' },
      { id: 'Tinggal tunjukkan kode saat tiba di lokasi.', en: 'Simply show the code when you arrive.' },
    ],
    ikon: Smartphone,
    kelas: 'border-teal-200 bg-teal-50',
  },
  {
    judul: { id: 'Fast-Track Kiosk', en: 'Fast-Track Kiosk' },
    ket: { id: 'Anjungan mandiri di lobi, tanpa antre ke CS.', en: 'A self-service stand in the lobby, no CS queue.' },
    titik: [
      { id: 'Pindai QR Code dari reservasi online Anda.', en: 'Scan the QR code from your online reservation.' },
      { id: 'Data otomatis terverifikasi dalam hitungan detik.', en: 'Your data is verified automatically in seconds.' },
      { id: 'Tiket poli tercetak, Anda langsung diarahkan.', en: 'A clinic ticket prints and you are guided right away.' },
    ],
    ikon: QrCode,
    kelas: 'border-sky-200 bg-sky-50',
  },
];

/** Tiga layanan biaya & tambahan. */
const BIAYA: { judul: Teks; ket: Teks; ikon: Ikon }[] = [
  {
    judul: { id: 'Transparansi Biaya', en: 'Cost Transparency' },
    ket: { id: 'Estimasi tarif konsultasi & tindakan disampaikan jelas sejak awal.', en: 'Estimated consultation & procedure fees are made clear upfront.' },
    ikon: Receipt,
  },
  {
    judul: { id: 'Layanan Antar Obat', en: 'Medicine Home Delivery' },
    ket: { id: 'Obat diantar ke rumah via kurir medis, praktis & aman.', en: 'Medicines delivered home by a medical courier, convenient & safe.' },
    ikon: Truck,
  },
  {
    judul: { id: 'Patient Escort', en: 'Patient Escort' },
    ket: { id: 'Layanan kursi roda & pendamping untuk lansia & disabilitas.', en: 'Wheelchair & companion service for the elderly & people with disabilities.' },
    ikon: Accessibility,
  },
];

/** Poin tata tertib & etika. */
const ETIKA: Teks[] = [
  { id: 'Terapkan etika batuk & bersin yang benar.', en: 'Practise proper cough & sneeze etiquette.' },
  { id: 'Kawasan tanpa rokok (Zero Smoking Zone).', en: 'A smoke-free zone across the area.' },
  { id: 'Hand sanitizer tersedia di setiap sudut.', en: 'Hand sanitiser available at every corner.' },
];

/* ================================ RENDER ================================ */

/** Judul section editorial: H2 besar + divider tipis. */
const JudulSection: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">{children}</h2>
);

const AlurUmumClient: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (t: Teks) => t[lang];

  return (
    <div className="bg-white text-slate-800">
      {/* ============ 1. HERO (TENGAH, TANPA GAMBAR) ============ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 to-cyan-50 pt-20 pb-14 lg:pt-24 lg:pb-16">
        <div className="mx-auto w-full max-w-7xl px-6 text-center lg:px-12">
          <h1 className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl">
            {L({ id: 'Alur Berobat Cepat, Praktis & Nyaman', en: 'A Fast, Practical & Comfortable Care Journey' })}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Kami merancang setiap langkah berobat agar sesederhana mungkin, terutama untuk lansia dan keluarga yang membawa anak. Ikuti enam langkah di bawah, dan seluruh proses berjalan tertata, transparan, serta minim waktu tunggu.',
              en: 'We designed every step of your visit to be as simple as possible, especially for the elderly and families with children. Follow the six steps below, and the whole process runs in an orderly, transparent way with minimal waiting.',
            })}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
              <ClipboardList className="h-5 w-5 shrink-0 text-teal-600" />
              {L({ id: '6 Langkah Mudah', en: '6 Easy Steps' })}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
              <Smartphone className="h-5 w-5 shrink-0 text-teal-600" />
              {L({ id: 'Bisa Daftar Online', en: 'Register Online' })}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
              <Accessibility className="h-5 w-5 shrink-0 text-teal-600" />
              {L({ id: 'Ramah Lansia', en: 'Elderly-Friendly' })}
            </span>
          </div>
        </div>
      </section>

      {/* ============ 2. PERSIAPAN (GRID 3 KOLOM) ============ */}
      <section id="persiapan" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <JudulSection>{L({ id: 'Persiapan Pra-Kunjungan', en: 'Before Your Visit' })}</JudulSection>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Tiga hal sederhana yang membuat kedatangan Anda jauh lebih lancar.',
              en: 'Three simple things that make your arrival far smoother.',
            })}
          </p>
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {PERSIAPAN.map((p, i) => (
              <motion.article
                key={p.judul.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-teal-100 bg-teal-50 text-teal-700">
                  <p.ikon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-900">{L(p.judul)}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600">{L(p.ket)}</p>
                {p.judul.id === 'Cari Dokter & Jadwal' && (
                  <OverhaulLink
                    href="/cari-dokter"
                    className="mt-5 inline-flex w-fit items-center gap-2 text-base font-bold text-teal-700 hover:text-teal-800"
                  >
                    {L({ id: 'Cari Dokter', en: 'Find a Doctor' })}
                    <ArrowRight className="h-4 w-4" />
                  </OverhaulLink>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 3. ALUR 6 LANGKAH (STEPPER) ============ */}
      <section id="alur" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <JudulSection>{L({ id: 'Alur Berobat dalam 6 Langkah', en: 'Your Care Journey in 6 Steps' })}</JudulSection>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Ikuti urutan berikut dari gerbang rumah sakit hingga Anda pulang membawa obat.',
              en: 'Follow this sequence from the hospital gate to going home with your medicine.',
            })}
          </p>

          <ol className="relative mt-12 flex flex-col gap-8 pl-0 lg:grid lg:grid-cols-6 lg:gap-6 lg:pl-0">
            {/* Garis waktu: vertikal di mobile, horizontal di desktop. */}
            <div aria-hidden className="absolute bottom-6 left-8 top-6 w-0.5 bg-teal-200 lg:hidden" />
            <div aria-hidden className="absolute left-0 right-0 top-8 hidden h-0.5 bg-teal-200 lg:block" />
            {LANGKAH.map((s, i) => (
              <li key={s.judul.id} className="relative flex items-start gap-5 lg:flex-col lg:items-center lg:gap-3 lg:text-center">
                <span className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-teal-600 text-2xl font-extrabold text-white shadow-lg shadow-teal-600/25">
                  {i + 1}
                </span>
                <div>
                  <span className="mb-2 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-teal-100 bg-teal-50 text-teal-700 lg:mb-0">
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

      {/* ============ 4. PENDAFTARAN (2 KOLOM HIGHLIGHT) ============ */}
      <section id="pendaftaran" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <JudulSection>{L({ id: 'Cara Mendaftar', en: 'How to Register' })}</JudulSection>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Dua jalur pendaftaran yang sama-sama memangkas waktu antre Anda.',
              en: 'Two registration paths that both cut down your waiting time.',
            })}
          </p>
          <div className="mt-12 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-10">
            {PENDAFTARAN.map((p) => (
              <div key={p.judul.id} className={`flex h-full flex-col rounded-3xl border-2 p-8 shadow-sm ${p.kelas}`}>
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-teal-700 shadow-sm">
                    <p.ikon className="h-7 w-7" />
                  </span>
                  <div>
                    <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">{L(p.judul)}</h3>
                    <p className="text-base text-slate-600">{L(p.ket)}</p>
                  </div>
                </div>
                <ul className="mt-6 space-y-3">
                  {p.titik.map((t) => (
                    <li key={t.id} className="flex items-start gap-3 text-base text-slate-700">
                      <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-teal-600" />
                      {L(t)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 5. BIAYA & LAYANAN TAMBAHAN (GRID 3) ============ */}
      <section id="biaya" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <JudulSection>{L({ id: 'Biaya & Layanan Tambahan', en: 'Costs & Extra Services' })}</JudulSection>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Transparan soal biaya, dan siap membantu kenyamanan lebih selama Anda berobat.',
              en: 'Transparent about costs, and ready to add comfort throughout your visit.',
            })}
          </p>
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {BIAYA.map((b, i) => (
              <motion.article
                key={b.judul.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-teal-100 bg-teal-50 text-teal-700">
                  <b.ikon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-900">{L(b.judul)}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600">{L(b.ket)}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 6. JAM OPERASIONAL & TATA TERTIB (BANNER ABU) ============ */}
      <section id="jam" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="rounded-3xl border border-slate-200 bg-slate-100 p-8 shadow-sm sm:p-12">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
              {/* Kiri: jam operasional */}
              <div>
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-teal-700 shadow-sm">
                  <Clock className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-2xl font-extrabold tracking-tight text-slate-900">
                  {L({ id: 'Jam Operasional', en: 'Operating Hours' })}
                </h3>
                <dl className="mt-5 space-y-3 text-lg">
                  <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3">
                    <dt className="font-semibold text-slate-600">{L({ id: 'Senin - Sabtu', en: 'Monday - Saturday' })}</dt>
                    <dd className="font-extrabold text-slate-900">08.00 - 21.00 WIB</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="font-semibold text-slate-600">{L({ id: 'Minggu / Libur', en: 'Sunday / Holiday' })}</dt>
                    <dd className="font-extrabold text-slate-900">{L({ id: 'Jadwal Khusus', en: 'Special Schedule' })}</dd>
                  </div>
                </dl>
              </div>

              {/* Kanan: tata tertib & etika */}
              <div>
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-teal-700 shadow-sm">
                  <Cigarette className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-2xl font-extrabold tracking-tight text-slate-900">
                  {L({ id: 'Tata Tertib & Etika', en: 'Rules & Etiquette' })}
                </h3>
                <ul className="mt-5 space-y-3 text-lg">
                  {ETIKA.map((e) => (
                    <li key={e.id} className="flex items-start gap-3 text-slate-700">
                      <Droplets className="mt-1 h-5 w-5 shrink-0 text-teal-600" />
                      {L(e)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 7. WIDGETS INTERAKTIF ============ */}
      <AlurUmumWidgets />
    </div>
  );
};

export default AlurUmumClient;
