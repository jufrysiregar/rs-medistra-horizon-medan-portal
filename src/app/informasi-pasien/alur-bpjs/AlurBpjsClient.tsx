'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  Accessibility,
  Ambulance,
  BedDouble,
  Check,
  Crown,
  Droplet,
  FileCheck,
  FlaskConical,
  Glasses,
  HeartPulse,
  IdCard,
  CreditCard,
  NotebookPen,
  Pill,
  QrCode,
  ScrollText,
  Siren,
  Smartphone,
  Stethoscope,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import type { Language } from '../../../types';
import AlurBpjsWidgets from './AlurBpjsWidgets';

type Teks = { id: string; en: string };
type Ikon = React.ComponentType<{ className?: string }>;

/* ============================== DATA HALAMAN ============================== */

/** Empat persyaratan berkas berobat BPJS. */
const PERSYARATAN: { judul: Teks; ket: Teks; ikon: Ikon }[] = [
  {
    judul: { id: 'Identitas Diri', en: 'Personal Identity' },
    ket: { id: 'KTP / SIM / KK / KIA (untuk anak).', en: 'National ID / driving licence / family card / child ID.' },
    ikon: IdCard,
  },
  {
    judul: { id: 'Kepesertaan JKN-KIS', en: 'JKN-KIS Membership' },
    ket: { id: 'Kartu BPJS/KIS fisik atau E-Card pada aplikasi Mobile JKN.', en: 'Physical BPJS/KIS card or the e-Card in the Mobile JKN app.' },
    ikon: CreditCard,
  },
  {
    judul: { id: 'Surat Rujukan', en: 'Referral Letter' },
    ket: { id: 'Dari FKTP (Puskesmas/Klinik), berlaku 90 hari.', en: 'From the primary facility, valid for 90 days.' },
    ikon: ScrollText,
  },
  {
    judul: { id: 'SPRI / Surat Kontrol', en: 'SPRI / Control Letter' },
    ket: { id: 'Surat Pemeriksaan Ruangan Inap / kontrol dari dokter DPJP.', en: 'Inpatient order / follow-up letter from the treating specialist.' },
    ikon: FileCheck,
  },
];

/** Alur rawat jalan BPJS — stepper horizontal (6 langkah). */
const RAWAT_JALAN: { judul: Teks; ket: Teks; ikon: Ikon }[] = [
  { judul: { id: 'Antrean Online', en: 'Online Queue' }, ket: { id: 'Ambil nomor via Mobile JKN / aplikasi RS.', en: 'Get a number via Mobile JKN / the hospital app.' }, ikon: Smartphone },
  { judul: { id: 'Check-in & Validasi SEP', en: 'Check-in & SEP Validation' }, ket: { id: 'Pindai di Kios Anjungan Mandiri.', en: 'Scan at the self-service kiosk.' }, ikon: QrCode },
  { judul: { id: 'Asesmen Tanda Vital', en: 'Vital-Sign Screening' }, ket: { id: 'Pemeriksaan awal di poli.', en: 'Initial check at the clinic.' }, ikon: Activity },
  { judul: { id: 'Konsultasi DPJP', en: 'Specialist Consultation' }, ket: { id: 'Diperiksa dokter penanggung jawab.', en: 'Seen by the responsible specialist.' }, ikon: Stethoscope },
  { judul: { id: 'Pemeriksaan Penunjang', en: 'Supporting Exams' }, ket: { id: 'Laboratorium & radiologi bila perlu.', en: 'Laboratory & radiology if needed.' }, ikon: FlaskConical },
  { judul: { id: 'Pengambilan Obat', en: 'Medicine Pickup' }, ket: { id: 'Obat sesuai Formularium Nasional (Fornas).', en: 'Medicines per the National Formulary (Fornas).' }, ikon: Pill },
];

/** Contoh kondisi gawat darurat yang ditangani langsung di UGD. */
const GAWAT: Teks[] = [
  { id: 'Kecelakaan lalu lintas & trauma', en: 'Traffic accidents & trauma' },
  { id: 'Serangan jantung / nyeri dada', en: 'Heart attack / chest pain' },
  { id: 'Sesak napas berat', en: 'Severe shortness of breath' },
  { id: 'Kejang & penurunan kesadaran', en: 'Seizures & reduced consciousness' },
];

/** Alur rawat inap BPJS (kolom kiri). */
const RAWAT_INAP: { judul: Teks; ket: Teks; ikon: Ikon }[] = [
  { judul: { id: 'SPRI dari DPJP', en: 'SPRI from the specialist' }, ket: { id: 'Surat pengantar rawat inap.', en: 'The inpatient order letter.' }, ikon: NotebookPen },
  { judul: { id: 'SEP Rawat Inap', en: 'Inpatient SEP' }, ket: { id: 'Surat Eligibilitas Pasien diterbitkan.', en: 'The patient eligibility letter is issued.' }, ikon: FileCheck },
  { judul: { id: 'Kamar sesuai KRIS', en: 'KRIS-class room' }, ket: { id: 'Kamar dirawat sesuai kelas kepesertaan.', en: 'Room per your membership class.' }, ikon: BedDouble },
  { judul: { id: 'Perawatan 100% Ditanggung', en: '100% covered care' }, ket: { id: 'Bebas biaya sesuai indikasi medis.', en: 'No cost per medical indication.' }, ikon: HeartPulse },
];

/** Layanan khusus yang dijamin BPJS. */
const LAYANAN_KHUSUS: { judul: Teks; ket: Teks; ikon: Ikon }[] = [
  { judul: { id: 'Hemodialisa', en: 'Haemodialysis' }, ket: { id: 'Cuci darah rutin bagi pasien gagal ginjal.', en: 'Regular dialysis for kidney-failure patients.' }, ikon: Droplet },
  { judul: { id: 'Kemoterapi', en: 'Chemotherapy' }, ket: { id: 'Tata laksana kanker sesuai protokol & stadium.', en: 'Cancer treatment per protocol & stage.' }, ikon: Activity },
  { judul: { id: 'Rehabilitasi Medis', en: 'Medical Rehabilitation' }, ket: { id: 'Fisioterapi pemulihan pasca-sakit atau cedera.', en: 'Physiotherapy after illness or injury.' }, ikon: Accessibility },
  { judul: { id: 'Klaim Alat Bantu', en: 'Assistive Devices' }, ket: { id: 'Kacamata, korset, dan protesa sesuai ketentuan.', en: 'Eyeglasses, corsets & prosthetics per rules.' }, ikon: Glasses },
];

/* ================================ RENDER ================================ */

/** Judul section editorial: H2 besar + divider tipis. */
const JudulSection: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">{children}</h2>
);

const AlurBpjsClient: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (t: Teks) => t[lang];

  return (
    <div className="bg-white text-slate-800">
      {/* ============ 1. HERO (TENGAH, TANPA GAMBAR) ============ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50 pt-20 pb-14 lg:pt-24 lg:pb-16">
        <div className="mx-auto w-full max-w-7xl px-6 text-center lg:px-12">
          <h1 className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl">
            {L({
              id: 'Alur Berobat BPJS Kesehatan: Mudah, Transparan & Terintegrasi',
              en: 'BPJS Kesehatan Care Flow: Easy, Transparent & Integrated',
            })}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Kami melayani peserta BPJS Kesehatan dengan alur yang jelas dan terintegrasi. Cukup lengkapi berkas dan ikuti sistem rujukan berjenjang, biaya pelayanan Anda dijamin sesuai kelas kepesertaan dan indikasi medis tanpa pembayaran di muka.',
              en: 'We serve BPJS Kesehatan members with a clear, integrated flow. Simply complete your documents and follow the tiered referral system. Your costs are covered per membership class and medical indication, with no upfront payment.',
            })}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
              <HeartPulse className="h-5 w-5 shrink-0 text-emerald-600" />
              {L({ id: 'Peserta JKN-KIS', en: 'JKN-KIS Members' })}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
              <Smartphone className="h-5 w-5 shrink-0 text-emerald-600" />
              {L({ id: 'Antrean Digital', en: 'Digital Queue' })}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
              <Check className="h-5 w-5 shrink-0 text-emerald-600" />
              {L({ id: 'Sesuai Indikasi Medis', en: 'Per Medical Indication' })}
            </span>
          </div>
        </div>
      </section>

      {/* ============ 2. PERSYARATAN BERKAS (GRID 4) ============ */}
      <section id="persyaratan" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <JudulSection>{L({ id: 'Persyaratan Berkas', en: 'Required Documents' })}</JudulSection>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Empat berkas ini cukup untuk memulai pelayanan BPJS Anda di rumah sakit.',
              en: 'These four documents are all you need to start your BPJS care at the hospital.',
            })}
          </p>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PERSYARATAN.map((d, i) => (
              <motion.article
                key={d.judul.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700">
                  <d.ikon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-900">{L(d.judul)}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600">{L(d.ket)}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 3. ALUR RAWAT JALAN (STEPPER HORIZONTAL 6) ============ */}
      <section id="rawat-jalan" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <JudulSection>{L({ id: 'Alur Rawat Jalan BPJS', en: 'BPJS Outpatient Flow' })}</JudulSection>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Enam langkah tertata, dari antrean digital hingga obat Anda diterima.',
              en: 'Six orderly steps, from the digital queue to receiving your medicine.',
            })}
          </p>
          <ol className="relative mt-12 flex flex-col gap-8 lg:grid lg:grid-cols-6 lg:gap-5">
            <div aria-hidden className="absolute bottom-6 left-8 top-6 w-0.5 bg-emerald-200 lg:hidden" />
            <div aria-hidden className="absolute left-0 right-0 top-8 hidden h-0.5 bg-emerald-200 lg:block" />
            {RAWAT_JALAN.map((s, i) => (
              <li key={s.judul.id} className="relative flex items-start gap-5 lg:flex-col lg:items-center lg:gap-3 lg:text-center">
                <span className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-2xl font-extrabold text-white shadow-lg shadow-emerald-600/25">
                  {i + 1}
                </span>
                <div>
                  <span className="mb-2 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-700 lg:mb-0">
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

      {/* ============ 4. UGD 24 JAM (BANNER PENTING) ============ */}
      <section id="ugd" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 shadow-sm sm:p-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
              <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/25">
                <Siren className="h-10 w-10" />
              </span>
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">
                  {L({ id: 'UGD Buka 24 Jam', en: 'Emergency Open 24 Hours' })}
                </p>
                <h3 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl">
                  {L({
                    id: 'Kondisi Gawat Darurat di UGD TIDAK MEMERLUKAN Surat Rujukan!',
                    en: 'Emergency cases at the ER do NOT require a referral letter!',
                  })}
                </h3>
                <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-700">
                  {L({
                    id: 'Untuk kondisi yang mengancam nyawa, tim kami langsung memberikan tindakan penyelamatan. Surat Eligibilitas Peserta (SEP) UGD diproses di tempat, keluarga cukup menyusul melengkapi berkas.',
                    en: 'For life-threatening conditions, our team acts immediately to save the patient. The ER eligibility letter (SEP) is processed on site, family can complete the paperwork afterwards.',
                  })}
                </p>
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {GAWAT.map((g) => (
                    <div key={g.id} className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-white px-4 py-3">
                      <Ambulance className="h-5 w-5 shrink-0 text-emerald-600" />
                      <span className="text-base font-semibold text-slate-700">{L(g)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 5. RAWAT INAP & NAIK KELAS (2 KOLOM) ============ */}
      <section id="rawat-inap" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <JudulSection>{L({ id: 'Rawat Inap & Aturan Naik Kelas', en: 'Inpatient Care & Upgrade Rules' })}</JudulSection>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <div className="mt-12 grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-10">
            {/* Kiri: alur rawat inap */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/25">
                  <BedDouble className="h-7 w-7" />
                </span>
                <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">
                  {L({ id: 'Alur Rawat Inap', en: 'Inpatient Flow' })}
                </h3>
              </div>
              <ol className="mt-6 space-y-4">
                {RAWAT_INAP.map((s, i) => (
                  <li key={s.judul.id} className="flex items-start gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-base font-extrabold text-emerald-700">
                      {i + 1}
                    </span>
                    <div className="flex items-start gap-3">
                      <s.ikon className="mt-1 h-5 w-5 shrink-0 text-emerald-600" />
                      <div>
                        <p className="text-base font-extrabold text-slate-900">{L(s.judul)}</p>
                        <p className="text-base leading-relaxed text-slate-600">{L(s.ket)}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Kanan: naik kelas (highlight amber) */}
            <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-8 shadow-sm">
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-amber-200 bg-white text-amber-600">
                  <Crown className="h-7 w-7" />
                </span>
                <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">
                  {L({ id: 'Naik Kelas (VIP / VVIP)', en: 'Room Upgrade (VIP / VVIP)' })}
                </h3>
              </div>
              <p className="mt-5 text-lg leading-relaxed text-slate-700">
                {L({
                  id: 'Boleh menaikkan kelas kamar (VIP/VVIP) atas permintaan sendiri. Selisih biaya dihitung transparan mengacu tarif INA-CBG: Anda hanya menanggung beda tarif kelas, sisanya tetap dijamin BPJS. Rincian biaya disampaikan di awal sebelum Anda menyetujui.',
                  en: 'You may upgrade your room class (VIP/VVIP) at your own request. The difference is calculated transparently based on the INA-CBG tariff: you only cover the class difference, the rest stays guaranteed by BPJS. The breakdown is explained upfront before you agree.',
                })}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-4 py-2 text-sm font-bold text-amber-700">
                  {L({ id: 'Simulasi INA-CBG', en: 'INA-CBG Simulation' })}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-4 py-2 text-sm font-bold text-amber-700">
                  {L({ id: 'Excess Charge Transparan', en: 'Transparent Excess Charge' })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 6. LAYANAN KHUSUS BPJS (GRID 4) ============ */}
      <section id="layanan-khusus" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <JudulSection>{L({ id: 'Layanan Khusus yang Dijamin BPJS', en: 'BPJS-Guaranteed Special Services' })}</JudulSection>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Layanan berkesinambungan berikut dijamin sesuai ketentuan dan indikasi medis.',
              en: 'The following continuing-care services are covered per regulation and medical indication.',
            })}
          </p>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {LAYANAN_KHUSUS.map((d, i) => (
              <motion.article
                key={d.judul.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700">
                  <d.ikon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-900">{L(d.judul)}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600">{L(d.ket)}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 7. WIDGETS INTERAKTIF ============ */}
      <AlurBpjsWidgets />
    </div>
  );
};

export default AlurBpjsClient;
