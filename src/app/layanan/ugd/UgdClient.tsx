'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  Ambulance,
  Baby,
  BadgeCheck,
  BedDouble,
  Bone,
  Brain,
  Clock,
  Cross,
  HeartPulse,
  ListChecks,
  MapPin,
  PhoneCall,
  ScanLine,
  ShieldPlus,
  Stethoscope,
  Timer,
  Users,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import FotoUgd from './FotoUgd';
import type { Language } from '../../../types';

export interface UgdUnitInfo {
  /** Jam operasional, dari fasilitas-unit.json ("24 Jam" / "24 Hours"). */
  jam: string;
  lokasi: string;
  akreditasi: string;
}

interface UgdClientProps {
  unit: UgdUnitInfo;
}

/** Sepasang teks ID/EN; dipilih dengan [lang] supaya semua data tinggal di satu tempat. */
type Teks = { id: string; en: string };

/** Tipe ikon Lucide yang dipakai di kartu, cukup className. */
type Ikon = React.ComponentType<{ className?: string }>;

/** Hotline resmi IGD, hanya dipakai satu kali di hero (tombol telepon). */
const HOTLINE = { tampil: '(061) 456 7890', tel: 'tel:+62614567890' };

const TRIASE: {
  tingkat: Teks;
  judul: Teks;
  ket: Teks;
  respons: Teks;
  /** Kelas warna pastel kartu, literal supaya JIT Tailwind ikut menghasilkannya. */
  warna: string;
  chip: string;
  ikon: Ikon;
}[] = [
  {
    tingkat: { id: 'Triase Level I', en: 'Triage Level I' },
    judul: { id: 'Kritis / Ancaman Nyawa', en: 'Critical / Life Threatening' },
    ket: {
      id: 'Henti jantung, sumbatan jalan napas, trauma mayor, penurunan kesadaran, pendarahan masif. Langsung masuk ruang resusitasi tanpa menunggu.',
      en: 'Cardiac arrest, airway obstruction, major trauma, reduced consciousness, massive bleeding. Goes straight to the resuscitation room with no wait.',
    },
    respons: { id: 'Respons dokter < 5 menit', en: 'Doctor response < 5 minutes' },
    warna: 'bg-red-50 border-red-200 text-red-700',
    chip: 'bg-red-600 text-white',
    ikon: HeartPulse,
  },
  {
    tingkat: { id: 'Triase Level II', en: 'Triage Level II' },
    judul: { id: 'Gawat Tidak Darurat', en: 'Urgent but not Emergency' },
    ket: {
      id: 'Nyeri dada stabil, pendarahan terkontrol, fraktur tanpa syok, demam tinggi dengan komorbid. Dipantau tanda vitalnya secara berkala sambil menunggu giliran.',
      en: 'Stable chest pain, controlled bleeding, fracture without shock, high fever with comorbidities. Vital signs monitored regularly while waiting for a turn.',
    },
    respons: { id: 'Respons dokter ≤ 30 menit', en: 'Doctor response ≤ 30 minutes' },
    warna: 'bg-amber-50 border-amber-200 text-amber-700',
    chip: 'bg-amber-500 text-white',
    ikon: Timer,
  },
  {
    tingkat: { id: 'Triase Level III', en: 'Triage Level III' },
    judul: { id: 'Non-Darurat / Luka Ringan', en: 'Non-Urgent / Minor Injury' },
    ket: {
      id: 'Luka superficial, demam tanpa tanda bahaya, keluhan ringan yang stabil. Bila jam praktik sedang berjalan, pasien diarahkan ke poliklinik terkait.',
      en: 'Superficial wounds, fever without red flags, mild stable complaints. During practice hours patients are directed to the relevant specialty clinic.',
    },
    respons: { id: 'Sesuai urutan triase', en: 'By triage order' },
    warna: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    chip: 'bg-emerald-600 text-white',
    ikon: Stethoscope,
  },
  {
    tingkat: { id: 'Triase Level IV', en: 'Triage Level IV' },
    judul: { id: 'DOA / Meninggal Dunia', en: 'Dead on Arrival / Deceased' },
    ket: {
      id: 'Pernapasan dan nadi sudah berhenti sebelum tiba. Tim melakukan verifikasi kematian, pendampingan keluarga, dan koordinasi administrasi serta visum bila diperlukan.',
      en: 'Breathing and pulse ceased before arrival. The team performs death verification, family support, and administrative coordination including an autopsy order when needed.',
    },
    respons: { id: 'Pendampingan & administrasi', en: 'Family support & administration' },
    warna: 'bg-slate-100 border-slate-300 text-slate-800',
    chip: 'bg-slate-700 text-white',
    ikon: Users,
  },
];

const FASILITAS: { judul: Teks; ket: Teks; titik: Teks[]; ikon: Ikon; kelas: string }[] = [
  {
    judul: { id: 'Ruang Resusitasi', en: 'Resuscitation Room' },
    ket: {
      id: 'Dua bed emergensi dengan AED/defibrilator, ventilator transport, alat infus cepat, dan pemeriksaan laboratorium rapid di tempat. Dokter jaga menangani kategori merah lebih dulu, jalur komunikasi ke spesialis dibuka seketika.',
      en: 'Two emergency beds with AED/defibrillator, transport ventilator, rapid infusion set and point-of-care laboratory testing. Red-category patients are handled first, with an instant communication line to the relevant specialist.',
    },
    titik: [
      { id: 'AED / Defibrilator', en: 'AED / Defibrillator' },
      { id: 'Ventilator Transport', en: 'Transport Ventilator' },
      { id: 'Rapid Lab di Tempat', en: 'Point-of-Care Lab' },
      { id: '2 Bed Emergensi', en: '2 Emergency Beds' },
    ],
    ikon: HeartPulse,
    kelas: 'md:col-span-2 lg:col-span-2 lg:row-span-2',
  },
  {
    judul: { id: 'Ruang Tindakan & Bedah Minor', en: 'Procedure & Minor Surgery Room' },
    ket: {
      id: 'Jahit luka, insisi-drainase, penanganan fraktur ringan, dan bedah minor cito dengan sterilitas ruang tindakan terstandar.',
      en: 'Wound suturing, incision and drainage, minor fracture care and cito minor surgery under standardised theatre sterility.',
    },
    titik: [
      { id: 'Set Jahit Komplit', en: 'Complete Suture Set' },
      { id: 'C-Arm / Rontgen Mobile', en: 'C-Arm / Mobile X-Ray' },
    ],
    ikon: Cross,
    kelas: 'lg:col-span-2',
  },
  {
    judul: { id: 'Ruang Observasi', en: 'Observation Area' },
    ket: {
      id: 'Runutan tanda vital beberapa jam sambil menunggu hasil laboratorium dan citra, sebelum keputusan rawat inap atau pulang.',
      en: 'Vital-sign tracking over several hours while laboratory and imaging results return, before the admit-or-discharge decision.',
    },
    titik: [{ id: 'Monitor Tanda Vital', en: 'Vital-Sign Monitor' }],
    ikon: BedDouble,
    kelas: '',
  },
  {
    judul: { id: 'Ruang Isolasi', en: 'Isolation Room' },
    ket: {
      id: 'Kasus menular ditangani terpisah dengan alur pernapasan terkendali dan APD lengkap bagi tim.',
      en: 'Contagious cases are handled separately with a controlled airflow pathway and full PPE for the team.',
    },
    titik: [{ id: 'APD & Alur Udara', en: 'PPE & Airflow Path' }],
    ikon: ShieldPlus,
    kelas: '',
  },
];

const PENJAMINAN: {
  judul: Teks;
  ringkas: Teks;
  poin: Teks[];
  catatan?: Teks;
  kelas: string;
  badge?: Teks;
  ikon: Ikon;
}[] = [
  {
    judul: { id: 'BPJS Kesehatan', en: 'BPJS Health Insurance' },
    ringkas: {
      id: 'Penanganan gawat darurat dijamin penuh sesuai ketentuan BPJS Kesehatan.',
      en: 'Emergency care is fully guaranteed under BPJS Kesehatan rules.',
    },
    poin: [
      { id: 'Tunjukkan KTP & kartu JKN/BPJS di counter admission IGD.', en: 'Show your ID card and JKN/BPJS card at the ED admission counter.' },
      { id: 'Verifikasi penjaminan berjalan paralel dengan penanganan medis.', en: 'Guarantee verification runs in parallel with medical treatment.' },
      { id: 'Tim admissi mengurus eligibilitas dan kelas perawatan keluarga.', en: 'The admission team handles eligibility and the family care class.' },
    ],
    catatan: {
      id: 'Tidak memerlukan surat rujukan FKTP jika kondisi gawat darurat.',
      en: 'No FKTP referral letter is required for a genuine emergency.',
    },
    // Highlight tegas: border ganda + garis atas aksen, kartu sedikit terangkat.
    kelas: 'border-2 border-medical-red bg-white shadow-lg md:-translate-y-2',
    badge: { id: 'Tanpa Rujukan FKTP', en: 'No FKTP Referral' },
    ikon: ShieldPlus,
  },
  {
    judul: { id: 'Asuransi Swasta & Korporat', en: 'Private & Corporate Insurance' },
    ringkas: {
      id: 'Bekerja sama dengan asuransi umum, syariah, dan korporasi untuk cashless emergensi.',
      en: 'Working with general, sharia and corporate insurers for cashless emergency care.',
    },
    poin: [
      { id: 'Siapkan kartu peserta dan nomor polis saat tiba.', en: 'Have the participant card and policy number ready on arrival.' },
      { id: 'Kami ajukan pre-authorization/letter of guarantee ke pihak asuransi.', en: 'We file pre-authorisation / letter of guarantee with the insurer.' },
      { id: 'Klaim bisa diubah ke reimbursement bila limit darurat tidak memadai.', en: 'Claims can switch to reimbursement when the emergency limit is insufficient.' },
    ],
    kelas: 'border border-slate-200 bg-white shadow-sm',
    ikon: BadgeCheck,
  },
  {
    judul: { id: 'Pasien Umum', en: 'Self-Pay Patients' },
    ringkas: {
      id: 'Tarif disampaikan terbuka sebelum tindakan, penundaan tindakan tidak pernah terjadi.',
      en: 'Rates are disclosed before any procedure, so treatment is never delayed.',
    },
    poin: [
      { id: 'Estimasi biaya diberikan setelah rencana terapi disusun dokter.', en: 'A cost estimate is given once the doctor sets the treatment plan.' },
      { id: 'Pembayaran tunai, debit, kredit, atau QRIS di kasir IGD.', en: 'Cash, debit, credit or QRIS payment at the ED cashier.' },
      { id: 'Kwitansi rinci dan resume medis dapat dicetak hari itu juga.', en: 'An itemised receipt and medical summary can be printed the same day.' },
    ],
    kelas: 'border border-slate-200 bg-white shadow-sm',
    ikon: ListChecks,
  },
];

const ON_CALL: { nama: Teks; gelar: string; ket: Teks; ikon: Ikon }[] = [
  {
    nama: { id: 'Bedah', en: 'General Surgery' },
    gelar: 'Sp.B',
    ket: { id: 'Trauma abdomen, bedah digestif, luka tusuk', en: 'Abdominal trauma, digestive surgery, stab wounds' },
    ikon: Bone,
  },
  {
    nama: { id: 'Kebidanan & Kandungan', en: 'Obstetrics & Gynaecology' },
    gelar: 'Sp.OG',
    ket: { id: 'Kegawatdaruratan maternal & perdarahan obstetri', en: 'Maternal emergencies & obstetric bleeding' },
    ikon: Baby,
  },
  {
    nama: { id: 'Jantung', en: 'Cardiology' },
    gelar: 'Sp.JP',
    ket: { id: 'Sindrom koroner akut, aritmia, gagal jantung', en: 'Acute coronary syndrome, arrhythmia, heart failure' },
    ikon: HeartPulse,
  },
  {
    nama: { id: 'Anak', en: 'Paediatrics' },
    gelar: 'Sp.A',
    ket: { id: 'Gawat darurat anak, kejang, sesak, dehidrasi berat', en: 'Paediatric emergencies, seizures, breathlessness, severe dehydration' },
    ikon: Stethoscope,
  },
  {
    nama: { id: 'Saraf', en: 'Neurology' },
    gelar: 'Sp.N',
    ket: { id: 'Stroke akut, cedera kepala, kejang berulang', en: 'Acute stroke, head injury, recurrent seizures' },
    ikon: Brain,
  },
];

const SERTIFIKASI: { kode: string; panjang: Teks }[] = [
  { kode: 'ATLS', panjang: { id: 'Advanced Trauma Life Support', en: 'Advanced Trauma Life Support' } },
  { kode: 'ACLS', panjang: { id: 'Advanced Cardiovascular Life Support', en: 'Advanced Cardiovascular Life Support' } },
  { kode: 'PPGD', panjang: { id: 'Penanganan Penderita Gawat Darurat', en: 'Emergency Patient Management course' } },
  { kode: 'GELS', panjang: { id: 'General Emergency Life Support', en: 'General Emergency Life Support' } },
];

const CHECKLIST_PONSEL: Teks[] = [
  { id: 'Lokasi penjemputan spesifik (nama jalan, nomor rumah, patokan terdekat).', en: 'The exact pickup location (street name, house number, nearest landmark).' },
  { id: 'Kondisi pasien: tingkat kesadaran, sesak napas berat, nyeri dada, atau luka pendarahan.', en: 'Patient condition: level of consciousness, severe breathlessness, chest pain or bleeding wounds.' },
  { id: 'Nomor telepon yang selalu aktif dapat dihubungi tim ambulans.', en: 'An always-active phone number the ambulance team can reach.' },
];

/**
 * HALAMAN IGD, tampilan terang (tanpa dark mode) dengan tipografi besar agar ramah
 * lansia. Struktur: hero berlatar penuh foto (slideshow IGD, scrim putih hanya di
 * kiri), ringkasan, triase pastel, bento fasilitas,
 * section ambulans (3 kartu informasi), penjaminan, lalu tim medis.
 */
const UgdClient: React.FC<UgdClientProps> = ({ unit }) => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (teks: Teks) => teks[lang];

  return (
    <div className="bg-white text-slate-800">
      {/* ============ 1. HERO (LATAR PENUH FOTO) ============ */}
      <section className="relative overflow-hidden bg-white pt-16 pb-12 lg:pt-20 lg:pb-16">
        {/* Foto IGD (slideshow) sebagai latar penuh hero. */}
        <div aria-hidden className="absolute inset-0">
          <FotoUgd alt="" />
        </div>
        {/* Scrim: putih pekat hanya di sisi kiri (sampai ±45%), kanan 100% bening. */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-white from-20% via-white/70 to-transparent to-60%" />

        <div className="relative z-10 mr-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="max-w-3xl">
            <h1 className="text-[clamp(2.25rem,4.5vw,3.25rem)] font-extrabold leading-[1.08] tracking-tight text-slate-900">
              {L({ id: 'Instalasi Gawat Darurat (IGD) 24 Jam', en: '24-Hour Emergency Department (IGD)' })}
            </h1>

            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-slate-600 sm:text-2xl">
              {L({
                id: 'Instalasi Gawat Darurat (IGD) kami siaga 24 jam di pintu masuk sayap depan, dilengkapi jalur drop-off khusus ambulans, ruang resusitasi darurat, serta tim dokter dan spesialis siaga. Kami menerapkan Sistem Triase Medis, di mana penanganan prioritas utama diberikan secara cepat dan tepat berdasarkan tingkat kegawatdaruratan kondisi pasien.',
                en: 'Our Emergency Department (IGD) is on standby 24 hours at the front-wing entrance, equipped with a dedicated ambulance drop-off lane, an emergency resuscitation room, and a team of on-call doctors and specialists. We apply a Medical Triage System, in which top-priority care is delivered quickly and precisely based on the severity of the patient\'s condition.',
              })}
            </p>

            {/* Chip informasi: jam, lokasi, akreditasi (data fasilitas-unit.json) */}
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
                <Clock className="h-5 w-5 shrink-0 text-medical-red" />
                {unit.jam || L({ id: 'Buka 24 Jam', en: 'Open 24 Hours' })}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
                <MapPin className="h-5 w-5 shrink-0 text-medical-red" />
                {unit.lokasi}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
                <BadgeCheck className="h-5 w-5 shrink-0 text-medical-red" />
                {unit.akreditasi}
              </span>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href={HOTLINE.tel}
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-medical-red px-8 py-4 text-lg font-extrabold text-white shadow-lg shadow-medical-red/25 transition-all hover:bg-medical-darkRed hover:shadow-xl active:scale-[0.98]"
              >
                <PhoneCall className="h-6 w-6 shrink-0" />
                {L({ id: 'Telepon Cepat UGD (24 Jam)', en: 'Call UGD Now (24 Hours)' })}
              </a>
              <a
                href="#ambulans"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-300 bg-white/80 px-7 py-4 text-lg font-bold text-slate-800 transition-colors hover:border-slate-900 hover:bg-slate-50"
              >
                <Ambulance className="h-6 w-6 shrink-0" />
                {L({ id: 'Ambulan dan Tanggap Darurat', en: 'Ambulance and Emergency Response' })}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. RINGKASAN / OVERVIEW ================= */}
      <section className="border-t border-slate-100 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Kolom kiri: kesiapan 24/7 */}
            <div>
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                {L({ id: 'Siaga Penuh 24/7, Tanpa Libur', en: 'Full 24/7 Readiness, No Holidays' })}
              </h2>
              <div className="mt-5 h-px w-full bg-slate-200" />
              <p className="mt-6 text-lg leading-relaxed text-slate-600 sm:text-xl">
                {L({
                  id: 'Dokter jaga emergency standby di dalam IGD sepanjang hari, diperkuat tim perawat gawat darurat bersertifikat. Di luar jam praktik poliklinik, dokter spesialis tetap on-call dan dapat dipanggil ke bedside dalam hitungan menit lewat jalur komunikasi khusus.',
                  en: 'Emergency duty doctors are stationed inside the ED around the clock, backed by certified emergency nurses. Outside clinic hours, specialists remain on-call and can be summoned to the bedside within minutes through a dedicated communication line.',
                })}
              </p>
              <p className="mt-4 text-lg leading-relaxed text-slate-600 sm:text-xl">
                {L({
                  id: 'Tiga ambulans bersiaga di pangkalan lantai dasar, satu di antaranya berstatus unit ICU mobile, sehingga penjemputan dan rujukan masuk dapat berjalan bersamaan.',
                  en: 'Three ambulances stand by at the ground-floor base, one of them a mobile-ICU unit, so pickups and incoming referrals can run simultaneously.',
                })}
              </p>
            </div>

            {/* Kolom kanan: akses cepat penunjang */}
            <div>
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                {L({ id: 'Akses Cepat ke Penunjang Diagnostik & Tindakan', en: 'Fast Access to Diagnostics & Procedures' })}
              </h2>
              <div className="mt-5 h-px w-full bg-slate-200" />
              <ul className="mt-6 divide-y divide-slate-100">
                {[
                  {
                    ikon: ScanLine,
                    judul: { id: 'Laboratorium', en: 'Laboratory' },
                    ket: { id: 'Pemeriksaan rapid di tempat: hematologi, gula darah, troponin, gas darah.', en: 'Point-of-care rapid tests: haematology, blood glucose, troponin, blood gas.' },
                  },
                  {
                    ikon: Activity,
                    judul: { id: 'Radiologi', en: 'Radiology' },
                    ket: { id: 'Rontgen dan CT scan dengan pembacaan cito, radiografer siap 24 jam.', en: 'X-ray and CT scan with cito reading, radiographers available 24 hours.' },
                  },
                  {
                    ikon: Cross,
                    judul: { id: 'OK Cito', en: 'Emergency Theatre' },
                    ket: { id: 'Kamar bedah siap dibuka kapan pun untuk tindakan mengancam nyawa.', en: 'An operating theatre that can be opened any time for life-saving surgery.' },
                  },
                  {
                    ikon: HeartPulse,
                    judul: { id: 'ICU & HDU', en: 'ICU & HDU' },
                    ket: { id: 'Alur serah terima pasien intensif langsung dari IGD ke ruang kritis.', en: 'A direct hand-over pathway from the ED into the critical-care units.' },
                  },
                ].map((b) => (
                  <li key={b.judul.id} className="flex gap-5 py-5">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-medical-red">
                      <b.ikon className="h-7 w-7" />
                    </span>
                    <div>
                      <p className="text-xl font-bold text-slate-900">{L(b.judul)}</p>
                      <p className="mt-1 text-lg leading-relaxed text-slate-600">{L(b.ket)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. SISTEM TRIASE (PASTEL) ================= */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Sistem Triase 4 Tingkat di Pintu Masuk', en: 'Four-Level Triage at the Entrance' })}
          </h2>
          <p className="mt-6 max-w-4xl text-lg leading-relaxed text-slate-600 sm:text-xl">
            {L({
              id: 'Sebelum masuk ruang pemeriksaan, setiap pasien dinilai perawat gawat darurat bersertifikat. Warna gelangnya menentukan urutan penanganan, bukan jam kedatangan.',
              en: 'Before entering an examination bay, every patient is assessed by a certified emergency nurse. The colour of the wristband sets the order of treatment, not the arrival time.',
            })}
          </p>
          <div className="mt-5 h-px w-full bg-slate-200" />

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TRIASE.map((t, i) => (
              <motion.article
                key={t.judul.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: 'easeOut' }}
                className={`flex flex-col rounded-2xl border p-7 shadow-sm ${t.warna}`}
              >
                <span className={`inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-extrabold uppercase tracking-wide ${t.chip}`}>
                  <t.ikon className="h-4 w-4" />
                  {L(t.tingkat)}
                </span>
                <h3 className="mt-5 text-2xl font-extrabold leading-snug">{L(t.judul)}</h3>
                <p className="mt-3 flex-1 text-lg leading-relaxed">{L(t.ket)}</p>
                <p className="mt-5 border-t border-slate-900/10 pt-4 text-base font-bold">{L(t.respons)}</p>
              </motion.article>
            ))}
          </div>

          <p className="mt-8 max-w-4xl text-base font-semibold text-slate-500 sm:text-lg">
            {L({
              id: 'Catatan: kondisi yang memburuk saat menunggu akan dinilai ulang dan dapat naik tingkat tanpa menunggu giliran.',
              en: 'Note: a condition that deteriorates while waiting is reassessed and may be upgraded without waiting for a turn.',
            })}
          </p>
        </div>
      </section>

      {/* ================= 4. FASILITAS IGD (BENTO GRID) ================= */}
      <section className="bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Fasilitas di Dalam IGD', en: 'Facilities Inside the ED' })}
          </h2>
          <div className="mt-5 h-px w-full bg-slate-200" />

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {FASILITAS.map((f, i) => (
              <motion.div
                key={f.judul.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: 'easeOut' }}
                className={`flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm ${f.kelas}`}
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-medical-red">
                  <f.ikon className="h-7 w-7" />
                </span>
                <h3 className="mt-6 text-2xl font-extrabold leading-snug text-slate-900">{L(f.judul)}</h3>
                <p className="mt-3 text-lg leading-relaxed text-slate-600">{L(f.ket)}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {f.titik.map((titik) => (
                    <li
                      key={titik.id}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-base font-semibold text-slate-700"
                    >
                      {L(titik)}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 5. LAYANAN AMBULANS (3 KARTU INFORMASI) ================= */}
      <section id="ambulans" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              {L({ id: 'Layanan Ambulans & Tanggap Darurat', en: 'Ambulance & Emergency Response Service' })}
            </h2>
            <p className="mt-6 max-w-4xl text-lg leading-relaxed text-slate-600 sm:text-xl">
              {L({
                id: 'Layanan ambulans siaga 24 jam untuk penjemputan dan rujukan pasien darurat di wilayah Medan dan sekitarnya.',
                en: 'A 24-hour ambulance service for picking up and transferring emergency patients across Medan and its surroundings.',
              })}
            </p>

            {/* Tiga kartu informasi saja, nomor hotline & CTA sudah ada di hero. */}
            <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7">
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-medical-red">
                    <Ambulance className="h-7 w-7" />
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                    {L({ id: 'Ambulans ALS (Advanced Life Support)', en: 'ALS Ambulances (Advanced Life Support)' })}
                  </h3>
                </div>
                <p className="mt-4 text-lg leading-relaxed text-slate-600">
                  {L({
                    id: 'Paramedic bersertifikat ALS mendampingi tiap unit: ventilator portabel, monitor jantung-defibrilator, obat emergensi, papan spinal, dan komunikasi langsung dengan dokter jaga sejak dalam perjalanan.',
                    en: 'Every unit is crewed by ALS-certified paramedics: a portable ventilator, cardiac monitor-defibrillator, emergency drugs, spinal board and a live link to the duty doctor from the moment we roll out.',
                  })}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7">
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-medical-red">
                    <MapPin className="h-7 w-7" />
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                    {L({ id: 'Cakupan Penjemputan', en: 'Pickup Coverage' })}
                  </h3>
                </div>
                <p className="mt-4 text-lg leading-relaxed text-slate-600">
                  {L({
                    id: 'Area Kota Medan dan sekitarnya, Medan Petisah, Medan Sunggal, Medan Baru, Medan Maimun, Medan Johor, hingga radius ±15 km dari rumah sakit. Waktu tiba rata-rata 10–20 menit tergantung titik dan lalu lintas.',
                    en: 'Greater Medan area, Petisah, Sunggal, Baru, Maimun, Johor, up to a ±15 km radius from the hospital. Average arrival is 10–20 minutes depending on the point and traffic.',
                  })}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7">
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-medical-red">
                    <ListChecks className="h-7 w-7" />
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                    {L({ id: 'Siapkan Saat Menelepon', en: 'Have This Ready When Calling' })}
                  </h3>
                </div>
                <ul className="mt-4 space-y-3">
                  {CHECKLIST_PONSEL.map((c) => (
                    <li key={c.id} className="flex gap-3 text-lg leading-relaxed text-slate-600">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-medical-red" />
                      {L(c)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 6. ADMINISTRASI & PENJAMINAN ================= */}
      <section className="bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Administrasi & Penjaminan Biaya', en: 'Administration & Cost Guarantee' })}
          </h2>
          <p className="mt-6 max-w-4xl text-lg leading-relaxed text-slate-600 sm:text-xl">
            {L({
              id: 'Penanganan medis selalu mendahului urusan administrasi. Berkas penjaminan dilengkapi setelah pasien stabil, bukan sebelumnya.',
              en: 'Medical treatment always comes before paperwork. Guarantee documents are completed once the patient is stable, not before.',
            })}
          </p>
          <div className="mt-5 h-px w-full bg-slate-200" />

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {PENJAMINAN.map((p) => (
              <article key={p.judul.id} className={`relative flex flex-col rounded-2xl p-8 transition-shadow hover:shadow-md ${p.kelas}`}>
                {p.badge && (
                  <span className="absolute -top-4 left-8 inline-flex items-center gap-2 rounded-full bg-medical-red px-4 py-1.5 text-sm font-extrabold uppercase tracking-wide text-white shadow-md">
                    <ShieldPlus className="h-4 w-4" />
                    {L(p.badge)}
                  </span>
                )}
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-medical-red">
                  <p.ikon className="h-7 w-7" />
                </span>
                <h3 className="mt-6 text-2xl font-extrabold text-slate-900">{L(p.judul)}</h3>
                <p className="mt-3 text-lg leading-relaxed text-slate-600">{L(p.ringkas)}</p>

                {p.catatan && (
                  <p className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-lg font-bold leading-snug text-red-700">
                    {L(p.catatan)}
                  </p>
                )}

                <ul className="mt-5 flex-1 space-y-3 border-t border-slate-100 pt-5">
                  {p.poin.map((poi) => (
                    <li key={poi.id} className="flex gap-3 text-lg leading-relaxed text-slate-600">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-slate-300" />
                      {L(poi)}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 7. TIM MEDIS ================= */}
      <section className="border-t border-slate-100 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Tim Medis Bersertifikat & Siaga 24 Jam', en: 'Certified Medical Team on 24-Hour Standby' })}
          </h2>
          <div className="mt-5 h-px w-full bg-slate-200" />

          <p className="mt-8 max-w-5xl text-lg leading-relaxed text-slate-700 sm:text-xl lg:text-2xl">
            {L({
              id: 'Seluruh dokter jaga dan perawat IGD kami memegang sertifikasi gawat darurat yang masih berlaku: ATLS untuk penanganan trauma, ACLS untuk henti jantung dan aritmia, PPGD untuk tatalaksana darurat terpadu, serta GELS untuk keterampilan emergensi umum. Sertifikasi diperbarui berkala melalui simulasi code blue dan pelatihan rutin di internal rumah sakit.',
              en: 'Every duty doctor and ED nurse holds a valid emergency certification: ATLS for trauma management, ACLS for cardiac arrest and arrhythmia, PPGD for integrated emergency care, and GELS for general emergency skills. Certifications are refreshed regularly through code-blue drills and in-house training.',
            })}
          </p>

          {/* Chip sertifikasi */}
          <div className="mt-8 flex flex-wrap gap-4">
            {SERTIFIKASI.map((s) => (
              <div key={s.kode} className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                <p className="text-xl font-extrabold tracking-tight text-medical-red">{s.kode}</p>
                <p className="mt-1 text-base font-semibold text-slate-600">{L(s.panjang)}</p>
              </div>
            ))}
          </div>

          {/* Dokter spesialis on-call */}
          <h3 className="mt-14 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            {L({ id: 'Dokter Spesialis On-Call / Standby 24 Jam', en: 'Specialists On-Call / Standby 24 Hours' })}
          </h3>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ON_CALL.map((d) => (
              <div key={d.gelar} className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-medical-red">
                  <d.ikon className="h-7 w-7" />
                </span>
                <div>
                  <p className="text-xl font-extrabold leading-snug text-slate-900">
                    {L(d.nama)}{' '}
                    <span className="text-base font-bold text-slate-500">{d.gelar}</span>
                  </p>
                  <p className="mt-1.5 text-lg leading-relaxed text-slate-600">{L(d.ket)}</p>
                  <p className="mt-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-emerald-700">
                    <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    {L({ id: 'On-Call 24 Jam', en: 'On-Call 24 Hours' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default UgdClient;
