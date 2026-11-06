'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Accessibility,
  Activity,
  BadgeCheck,
  Baby,
  Brain,
  CalendarCheck,
  Check,
  ClipboardList,
  Clock,
  Crosshair,
  Dumbbell,
  Footprints,
  Hand,
  HeartPulse,
  Home,
  Info,
  MapPin,
  Mic,
  MoveVertical,
  PersonStanding,
  Ruler,
  Stethoscope,
  TrendingUp,
  Users,
  Wallet,
  Zap,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import type { Language } from '../../../types';
import fotoRehab from '@/images/hero/fasilitas/fisio.jpg';
import fotoRehabMobile from '@/images/hero/mobile-fasilitas/fisio.jpg';
import FisioterapiWidgets from './FisioterapiWidgets';

type Teks = { id: string; en: string };
type Ikon = React.ComponentType<{ className?: string }>;

/* ============================== DATA HALAMAN ============================== */

/** Enam area pemulihan yang dilayani unit ini. */
const TERAPI: { judul: Teks; pill: Teks; ket: Teks; ikon: Ikon }[] = [
  {
    judul: { id: 'Rehab Muskuloskeletal (Tulang & Otot)', en: 'Musculoskeletal Rehabilitation (Bones & Muscles)' },
    pill: { id: 'Nyeri punggung, leher, sendi kaku', en: 'Back, neck pain and stiff joints' },
    ket: {
      id: 'Terapi manual, peregangan, dan penguatan untuk nyeri punggung bawah, leher, beku, serta pemulihan pasca operasi ortopedi.',
      en: 'Manual therapy, stretching and strengthening for lower back and neck pain, frozen shoulder, and recovery after orthopaedic surgery.',
    },
    ikon: Activity,
  },
  {
    judul: { id: 'Rehab Neurologi (Stroke & Saraf)', en: 'Neurological Rehabilitation (Stroke & Nerves)' },
    pill: { id: 'Pasca stroke dan saraf terjepit', en: 'Post stroke and trapped nerves' },
    ket: {
      id: 'Latihan gerak, keseimbangan, dan fungsional untuk pemulihan pasca stroke, cedera saraf, serta penyakit parkinson.',
      en: 'Movement, balance and functional training for post stroke recovery, nerve injury and Parkinson disease.',
    },
    ikon: Brain,
  },
  {
    judul: { id: 'Cedera Olahraga (termasuk ACL)', en: 'Sports Injury (including ACL)' },
    pill: { id: 'Kembali bertahap ke aktivitas', en: 'Gradual return to activity' },
    ket: {
      id: 'Program pasca rekonstruksi ACL, cedera hamstring dan bahu, sampai latihan khusus sesuai cabang olahraga yang ditekuni.',
      en: 'Programmes after ACL reconstruction, hamstring and shoulder injuries, up to sport specific drills for the activity you do.',
    },
    ikon: Footprints,
  },
  {
    judul: { id: 'Kardiorespirasi (Jantung & Paru)', en: 'Cardiorespiratory (Heart & Lungs)' },
    pill: { id: 'Latihan napas dan daya tahan', en: 'Breathing and endurance training' },
    ket: {
      id: 'Rehabilitasi pasca rawat inap dan pasca penyakit berat: latihan napas, pembersihan lendir, dan peningkatan toleransi aktivitas.',
      en: 'Rehabilitation after hospitalisation and severe illness: breathing exercises, mucus clearance and building activity tolerance.',
    },
    ikon: HeartPulse,
  },
  {
    judul: { id: 'Pediatri (Anak)', en: 'Paediatric (Children)' },
    pill: { id: 'Sesi berbentuk permainan', en: 'Play-based sessions' },
    ket: {
      id: 'Stimulasi motorik untuk cerebral palsy, keterlambatan gerak, dan tortikolis, dijalankan lewat permainan di area latihan anak.',
      en: 'Motor stimulation for cerebral palsy, delayed movement and torticollis, delivered through play in the children exercise area.',
    },
    ikon: Baby,
  },
  {
    judul: { id: 'Geriatri (Lansia)', en: 'Geriatric (Older Adults)' },
    pill: { id: 'Keseimbangan dan cegah jatuh', en: 'Balance and fall prevention' },
    ket: {
      id: 'Menjaga kekuatan otot, kepadatan tulang, dan keamanan beraktivitas sehari-hari pada lansia, termasuk pasca patah tulang pinggul.',
      en: 'Keeping muscle strength, bone density and everyday safety in older adults, including after a hip fracture.',
    },
    ikon: PersonStanding,
  },
];

/** Peralatan modalitas dan ruang latihan. */
const ALAT: { judul: Teks; ket: Teks; poin: Teks[]; ikon: Ikon }[] = [
  {
    judul: { id: 'Elektroterapi: SWD, Ultrasound, TENS & Laser', en: 'Electrotherapy: SWD, Ultrasound, TENS & Laser' },
    ket: {
      id: 'Modalitas listrik dan panas untuk menurunkan nyeri dan melonggarkan jaringan yang kaku sebelum latihan dimulai.',
      en: 'Electrical and heat modalities to lower pain and loosen stiff tissue before the exercise part begins.',
    },
    poin: [
      { id: 'Short Wave Diathermy untuk jaringan yang lebih dalam', en: 'Short Wave Diathermy for deeper tissue' },
      { id: 'Ultrasound, TENS, dan laser untuk nyeri serta kekakuan sendi', en: 'Ultrasound, TENS and laser for pain and joint stiffness' },
      { id: 'Dosis dan durasi diatur fisioterapis selama sesi berlangsung', en: 'Dose and duration are set by the physiotherapist during the session' },
    ],
    ikon: Zap,
  },
  {
    judul: { id: 'ESWT (Extracorporeal Shock Wave Therapy)', en: 'ESWT (Extracorporeal Shock Wave Therapy)' },
    ket: {
      id: 'Gelombang kejut terarah untuk nyeri tumit dan titik nyeri miofasial yang tidak membaik dengan terapi biasa.',
      en: 'Directed shock waves for heel pain and myofascial trigger points that do not settle with ordinary therapy.',
    },
    poin: [
      { id: 'Plantar fasciitis, tennis elbow, dan titik miofasial', en: 'Plantar fasciitis, tennis elbow and myofascial trigger points' },
      { id: 'Ditentukan Sp.KFR setelah asesmen, bukan dipilih sendiri', en: 'Decided by the rehabilitation specialist after assessment, not self-selected' },
      { id: 'Sesi singkat, pasien umumnya langsung beraktivitas', en: 'A short session, patients usually carry on with their day' },
    ],
    ikon: Crosshair,
  },
  {
    judul: { id: 'Traksi Lumbal & Servikal', en: 'Lumbar & Cervical Traction' },
    ket: {
      id: 'Peregangan terukur pada tulang belakang bagian leher atau pinggang untuk mengurangi tekanan pada saraf.',
      en: 'Measured stretching of the neck or lower spine to take pressure off a nerve.',
    },
    poin: [
      { id: 'Untuk nyeri menjalar ringan yang masih aman dinilai klinik', en: 'For mild radiating pain that is still safe to assess clinically' },
      { id: 'Posisi, beban, dan durasi disesuaikan per pasien', en: 'Position, load and duration adjusted for each patient' },
      { id: 'Dihentikan segera bila nyeri menjalar justru memuncak', en: 'Stopped right away if the radiating pain instead increases' },
    ],
    ikon: MoveVertical,
  },
  {
    judul: { id: 'Gym Rehabilitasi & Kolam Hidroterapi', en: 'Rehabilitation Gym & Hydrotherapy Pool' },
    ket: {
      id: 'Ruang latihan seluas 300 m² untuk dewasa dan anak, dilengkapi jalur latihan jalan dan kolam bersuhu terkontrol.',
      en: 'A 300 square metre exercise hall for adults and children, with a gait training track and a temperature controlled pool.',
    },
    poin: [
      { id: 'Alat latihan kekuatan, sepeda statis, dan bola terapi', en: 'Strength equipment, static bikes and therapy balls' },
      { id: 'Gait training track untuk latihan jalan dan keseimbangan', en: 'Gait training track for walking and balance practice' },
      { id: 'Terapi air untuk beban tubuh berkurang saat latihan awal', en: 'Water therapy so body load is lighter in the early phase' },
    ],
    ikon: Dumbbell,
  },
];

/** Tim rehabilitasi. */
const TIM: { judul: Teks; ket: Teks; ikon: Ikon }[] = [
  {
    judul: { id: 'Sp.KFR', en: 'Rehabilitation Medicine Specialist (Sp.KFR)' },
    ket: {
      id: 'Dokter spesialis rehabilitasi medik: menentukan tujuan fungsional, menulis program, dan menilai ulang perkembangan setiap empat kali pertemuan.',
      en: 'The rehabilitation medicine doctor: sets the functional goal, writes the programme and re-evaluates progress every four sessions.',
    },
    ikon: Stethoscope,
  },
  {
    judul: { id: 'Fisioterapis', en: 'Physiotherapist' },
    ket: {
      id: 'Menjalankan terapi manual, modalitas alat, dan latihan gerak. Seluruhnya terdaftar dengan STR & SIP.',
      en: 'Delivers manual therapy, machine modalities and movement training. All are registered with a valid licence.',
    },
    ikon: Hand,
  },
  {
    judul: { id: 'Terapis Okupasi', en: 'Occupational Therapist' },
    ket: {
      id: 'Melatih kembali kegiatan harian: berpakaian, memasak, bekerja, termasuk penggunaan alat bantu dan penyesuaian rumah.',
      en: 'Retrains daily activities: dressing, cooking, working, including aids and home adjustments.',
    },
    ikon: Accessibility,
  },
  {
    judul: { id: 'Terapis Wicara', en: 'Speech Therapist' },
    ket: {
      id: 'Latihan bicara, bahasa, dan menelan, dijalankan di ruang terapi wicara tersendiri.',
      en: 'Speech, language and swallowing training, run in its own speech therapy room.',
    },
    ikon: Mic,
  },
];

/** Empat tahap alur pasien. */
const ALUR: { tahap: Teks; judul: Teks; poin: Teks[]; ikon: Ikon }[] = [
  {
    tahap: { id: 'Tahap 1 · Asesmen Awal', en: 'Stage 1 · Initial Assessment' },
    judul: { id: 'Dokter Sp.KFR Menilai Lebih Dulu', en: 'The Specialist Assesses First' },
    poin: [
      { id: 'Riwayat, pemeriksaan ruang gerak, kekuatan, dan keseimbangan', en: 'History, range of motion, strength and balance examination' },
      { id: 'Tujuan fungsional yang bisa diukur: naik tangga, jalan tanpa pegangan', en: 'A measurable functional goal: climbing stairs, walking without holding' },
      { id: 'Program disusun bersama fisioterapis; alat dipilih dari temuan, bukan dari paket', en: 'The programme is built with the physiotherapist; equipment is chosen from findings, not from a package' },
    ],
    ikon: ClipboardList,
  },
  {
    tahap: { id: 'Tahap 2 · Sesi Tindakan (30-60 Menit)', en: 'Stage 2 · Treatment Session (30-60 Minutes)' },
    judul: { id: 'Terapi Manual dan Alat Berjalan Berurutan', en: 'Manual Therapy and Tools in Sequence' },
    poin: [
      { id: 'Terapi manual dan mobilisasi sendi dikerjakan lebih dulu bila diperlukan', en: 'Manual therapy and joint mobilisation come first when needed' },
      { id: 'Elektroterapi, traksi, atau hidroterapi sesuai program hari itu', en: 'Electrotherapy, traction or hydrotherapy as written for that day' },
      { id: 'Fisioterapis mendampingi penuh, sesi tidak ditinggal', en: 'The physiotherapist stays with you, the session is never left unattended' },
    ],
    ikon: Dumbbell,
  },
  {
    tahap: { id: 'Tahap 3 · Edukasi Home Exercise', en: 'Stage 3 · Home Exercise Education' },
    judul: { id: 'Latihan yang Dilanjutkan di Rumah', en: 'The Practice Continues at Home' },
    poin: [
      { id: 'Gerakan diajarkan sampai pasien dan keluarga bisa mengulang sendiri', en: 'Movements are taught until the patient and family can repeat them alone' },
      { id: 'Jumlah pengulangan dan tanda boleh menambah beban disampaikan tertulis', en: 'Repetition count and the sign that load may be raised are given in writing' },
      { id: 'Panduan gerakan bisa diunduh pada bagian alat bantu di bawah halaman ini', en: 'The movement guide can be downloaded from the tools panel further down this page' },
    ],
    ikon: Home,
  },
  {
    tahap: { id: 'Tahap 4 · Evaluasi Berkala', en: 'Stage 4 · Periodic Evaluation' },
    judul: { id: 'Diukur Ulang Tiap 4-6 Sesi', en: 'Measured Again Every 4-6 Sessions' },
    poin: [
      { id: 'Penilaian ulang oleh Sp.KFR, umumnya setiap empat kali pertemuan', en: 'Re-evaluation by the specialist, usually every four meetings' },
      { id: 'Program diperpanjang, diubah, atau dihentikan berdasar capaian yang terukur', en: 'The programme is extended, changed or stopped based on measured progress' },
      { id: 'Catatan evaluasi ini dipakai juga untuk kelanjutan klaim penjaminan', en: 'These evaluation notes are also used to continue your insurance claim' },
    ],
    ikon: TrendingUp,
  },
];

/** Dua jalur penjaminan biaya. */
const PENJAMINAN: {
  judul: Teks; pill: Teks; ket: Teks; poin: Teks[]; garis: string; ikon: Ikon;
}[] = [
  {
    judul: { id: 'BPJS Kesehatan', en: 'BPJS Health Insurance' },
    pill: { id: 'Rujukan berjenjang + batas sesi', en: 'Tiered referral + session limit' },
    ket: {
      id: 'Tindakan fisioterapi dijamin sesuai indikasi medis dokter penanggung jawab dan aturan rujukan berjenjang, dengan batas jumlah sesi per kondisi penyakit.',
      en: 'Physiotherapy is covered according to the medical indication of the doctor in charge and the tiered referral rule, with a limit on sessions per condition.',
    },
    poin: [
      { id: 'Surat rujukan dan diagnosis fungsional ditulis Sp.KFR', en: 'The referral letter and functional diagnosis are written by the rehabilitation specialist' },
      { id: 'Jadwal sesi diatur mengikuti kuota hari agar tetap dalam ketentuan', en: 'Sessions are arranged following the daily quota so they stay within the rule' },
      { id: 'Alat tertentu yang tidak masuk daftar dijadikan biaya terpisah', en: 'Any equipment outside the list becomes a separate charge' },
    ],
    garis: 'border-l-medical-red',
    ikon: BadgeCheck,
  },
  {
    judul: { id: 'Asuransi Swasta & Umum', en: 'Private Insurance & Self-Pay' },
    pill: { id: 'Cashless + paket hemat 5x / 10x', en: 'Cashless + 5x / 10x value package' },
    ket: {
      id: 'Klaim berjalan cashless bila polis memuat manfaat rehabilitasi medik. Untuk biaya mandiri, paket 5 atau 10 sesi lebih ringan daripada membayar per sesi.',
      en: 'Claims run cashless when the policy includes a medical rehabilitation benefit. For self-pay, a 5 or 10 session package is lighter than paying per session.',
    },
    poin: [
      { id: 'Verifikasi plafon manfaat dilakukan sebelum sesi pertama', en: 'Benefit limit verification happens before the first session' },
      { id: 'Paket 5x dan 10x punya masa berlaku, tanggal hangus ditulis di kartu', en: 'The 5x and 10x packages expire, and the date is printed on the card' },
      { id: 'Sisa kuota dan riwayat sesi bisa diminta di meja unit kapan saja', en: 'Remaining quota and session history can be requested at the unit desk anytime' },
    ],
    garis: 'border-l-orange-600',
    ikon: Wallet,
  },
];

/** Dua layanan khusus di luar sesi reguler. */
const KHUSUS: { judul: Teks; pill: Teks; ket: Teks; poin: Teks[]; ikon: Ikon }[] = [
  {
    judul: { id: 'Klinik Postur & Skoliosis', en: 'Posture & Scoliosis Clinic' },
    pill: { id: 'Untuk remaja dan pekerja kantoran', en: 'For teenagers and office workers' },
    ket: {
      id: 'Pemeriksaan sikap tubuh dengan pengukuran lengkung tulang belakang, dilanjutkan latihan koreksi dan kelas ergonomi kerja.',
      en: 'A posture check with measurement of the spinal curve, followed by corrective exercise and an ergonomics class for work.',
    },
    poin: [
      { id: 'Skrining skoliosis remaja dan nyeri punggung akibat duduk lama', en: 'Teen scoliosis screening and back pain from long sitting' },
      { id: 'Latihan penguat otot penopang tulang belakang', en: 'Strengthening the muscles that support the spine' },
      { id: 'Kelas edukasi postur untuk pekerja, berjalan dengan sesi klinik', en: 'Posture education classes for workers, running alongside the clinic sessions' },
    ],
    ikon: Ruler,
  },
  {
    judul: { id: 'Homecare Physiotherapy', en: 'Homecare Physiotherapy' },
    pill: { id: 'Fisioterapis datang ke rumah', en: 'The physiotherapist comes to your home' },
    ket: {
      id: 'Untuk pasien yang sulit menjangkau klinik: pasca stroke dengan mobilitas berat, lansia, atau pasien dengan alat bantu jalan.',
      en: 'For patients who find the clinic hard to reach: post stroke with heavy mobility limits, older adults, or patients with walking aids.',
    },
    poin: [
      { id: 'Dijalankan atas instruksi dan program Sp.KFR', en: 'Runs on the instruction and programme of the rehabilitation specialist' },
      { id: 'Penyesuaian kondisi rumah: tangga, kamar mandi, dan tempat tidur', en: 'Adjusted to the home: stairs, bathroom and bed' },
      { id: 'Keluarga dilatih melanjutkan rutinitas harian', en: 'The family is taught to continue the daily routine' },
    ],
    ikon: MapPin,
  },
];

/* ================================ RENDER ================================ */

const FisioterapiClient: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (t: Teks) => t[lang];

  return (
    <div className="bg-white text-slate-800">
      {/* ============ 1. HERO (LATAR PENUH FOTO) ============ */}
      <section className="relative overflow-hidden bg-white pt-20 pb-24 lg:pt-28 lg:pb-32">
        {/* fisio.jpg dipakai sebagai latar penuh hero. */}
        <div aria-hidden className="absolute inset-0">
          <Image src={fotoRehabMobile} alt="" fill priority sizes="100vw" quality={90} className="object-cover object-right md:hidden" />
                    <Image src={fotoRehab} alt="" fill priority sizes="100vw" quality={90} className="hidden object-cover md:block" />
        </div>
        {/* Scrim: putih pekat hanya di sisi kiri (sampai ±45%), kanan 100% bening. */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-white from-20% via-white/70 to-transparent to-60%" />

        <div className="relative z-10 mr-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="max-w-3xl">
            <h1 className="text-[clamp(2.5rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight text-slate-900">
              {L({ id: 'Pusat Layanan Fisioterapi & Rehabilitasi Medik', en: 'Physiotherapy and Rehabilitation Medicine Service Center' })}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
              {L({
                id: 'Pemulihan yang berjalan baik selalu dimulai dari penilaian, bukan dari alat. Di sini dokter rehabilitasi medik menentukan apa yang ingin Anda capai, fisioterapis melatihnya setiap sesi, dan Anda pulang membawa gerakan yang bisa diulang sendiri di rumah.',
                en: 'Recovery that goes well always starts with an assessment, not with a machine. Here a rehabilitation medicine doctor sets what you want to achieve, a physiotherapist trains it every session, and you go home with movements you can repeat on your own.',
              })}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
                <Clock className="h-5 w-5 shrink-0 text-orange-600" />
                {L({ id: 'Senin-Sabtu 08.00-20.00', en: 'Monday-Saturday 08.00-20.00' })}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
                <Dumbbell className="h-5 w-5 shrink-0 text-orange-600" />
                {L({ id: 'Ruang latihan 300 m² + kolam hidroterapi', en: '300 m² exercise hall + hydrotherapy pool' })}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
                <CalendarCheck className="h-5 w-5 shrink-0 text-orange-600" />
                {L({ id: 'Evaluasi ulang tiap 4 sesi', en: 'Re-evaluated every 4 sessions' })}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
                <Users className="h-5 w-5 shrink-0 text-orange-600" />
                {L({ id: 'Fisioterapis ber-STR & SIP', en: 'Licensed physiotherapists' })}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 2. JENIS TERAPI (GRID 3x2) ============ */}
      <section id="terapi" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Jenis Terapi yang Kami Layani', en: 'Types of Therapy We Provide' })}
          </h2>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Enam area pemulihan berikut berjalan dengan alat dan ruang yang sama, tetapi dengan tujuan latihan yang berbeda. Dokter yang menentukan Anda masuk ke area yang mana.',
              en: 'These six recovery areas run in the same hall with the same equipment, but with different exercise goals. The doctor decides which area you belong to.',
            })}
          </p>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TERAPI.map((t, i) => (
              <motion.article
                key={t.judul.id}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-orange-100 bg-orange-50 text-orange-700">
                  <t.ikon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-900">{L(t.judul)}</h3>
                <p className="mt-2 text-sm font-extrabold uppercase tracking-wide text-orange-700">{L(t.pill)}</p>
                <p className="mt-3 text-base leading-relaxed text-slate-600">{L(t.ket)}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 3. ALAT MODERN + TIM (2 KOLOM) ============ */}
      <section id="alat-tim" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Alat Modern & Tim Medis', en: 'Modern Equipment & Medical Team' })}
          </h2>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
            {/* KIRI: ALAT */}
            <div>
              <h3 className="text-2xl font-extrabold leading-tight tracking-tight text-slate-900">
                {L({ id: 'Modalitas yang Ada di Lantai 1 South Wing', en: 'The Modalities on Level 1 South Wing' })}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {L({
                  id: 'Alat tidak pernah berdiri sendiri. Setiap modalitas di bawah ini dijalankan sebagai bagian dari program tertulis, pada urutan yang ditentukan fisioterapis.',
                  en: 'Equipment never stands alone. Every modality below runs as part of a written programme, in the order set by the physiotherapist.',
                })}
              </p>
              <div className="mt-8 space-y-6">
                {ALAT.map((a, i) => (
                  <motion.article
                    key={a.judul.id}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="flex gap-5 rounded-2xl border border-slate-200 border-l-4 border-l-orange-500 bg-white p-6 shadow-sm"
                  >
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-orange-100 bg-orange-50 text-orange-700">
                      <a.ikon className="h-7 w-7" />
                    </span>
                    <div>
                      <h4 className="text-xl font-extrabold leading-snug tracking-tight text-slate-900">{L(a.judul)}</h4>
                      <p className="mt-2.5 text-base leading-relaxed text-slate-600">{L(a.ket)}</p>
                      <ul className="mt-4 space-y-2">
                        {a.poin.map((p) => (
                          <li key={p.id} className="flex items-start gap-2.5">
                            <Check className="mt-1 h-4 w-4 shrink-0 text-orange-600" />
                            <span className="text-sm leading-relaxed text-slate-700">{L(p)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>

            {/* KANAN: TIM */}
            <div>
              <h3 className="text-2xl font-extrabold leading-tight tracking-tight text-slate-900">
                {L({ id: 'Orang di Balik Sesi Anda', en: 'The People Behind Your Sessions' })}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {L({
                  id: 'Satu program pemulihan melibatkan lebih dari satu keahlian. Peran berikut bekerja dalam satu tim yang sama sejak asesmen sampai evaluasi akhir.',
                  en: 'One recovery programme involves more than one expertise. These roles work as one team from assessment to the final evaluation.',
                })}
              </p>
              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {TIM.map((t, i) => (
                  <motion.div
                    key={t.judul.id}
                    initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-6"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-orange-100 bg-white text-orange-700">
                      <t.ikon className="h-6 w-6" />
                    </span>
                    <p className="mt-4 text-lg font-extrabold leading-snug tracking-tight text-slate-900">{L(t.judul)}</p>
                    <p className="mt-2.5 text-base leading-relaxed text-slate-600">{L(t.ket)}</p>
                  </motion.div>
                ))}
              </div>

              <p className="mt-8 flex items-start gap-3 rounded-2xl border border-orange-200 bg-orange-50 p-6 text-base leading-relaxed text-orange-900">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-orange-700" />
                {L({
                  id: 'Konsultan yang praktik di unit ini: dr. Fitri Handayani, Sp.KFR (Senin, Rabu, Jumat 08.00-14.00) dan dr. Rina Amelia, Sp.KFR (Selasa 09.00-15.00, Sabtu 09.00-13.00).',
                  en: 'Consultants practising in this unit: dr. Fitri Handayani, Sp.KFR (Monday, Wednesday, Friday 08.00-14.00) and dr. Rina Amelia, Sp.KFR (Tuesday 09.00-15.00, Saturday 09.00-13.00).',
                })}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 4. ALUR PASIEN (TIMELINE 4 TAHAP) ============ */}
      <section id="alur" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Alur Pasien dari Asesmen sampai Evaluasi', en: 'Patient Journey from Assessment to Evaluation' })}
          </h2>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Empat tahap ini yang membuat terapi bisa diukur. Yang berulang bukan hanya jadwal sesinya, tetapi juga penilaian apakah tujuan fungsional Anda sudah bergerak.',
              en: 'These four stages are what makes therapy measurable. What repeats is not only the session schedule but also the judgment on whether your functional goal has moved.',
            })}
          </p>

          <div className="relative mt-14">
            {/* Rel: horizontal hanya saat empat kolom sejajar, vertikal di bawahnya. */}
            <div aria-hidden="true" className="absolute left-8 right-8 top-[23px] hidden h-0.5 bg-orange-200 xl:block" />
            <div aria-hidden="true" className="absolute bottom-8 left-[31px] top-[23px] w-0.5 bg-orange-200 xl:hidden" />

            <ol className="relative grid grid-cols-1 gap-10 lg:grid-cols-2 xl:grid-cols-4 xl:gap-6">
              {ALUR.map((s, i) => (
                <motion.li
                  key={s.tahap.id}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="flex gap-5 xl:block"
                >
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-orange-100 bg-orange-600 text-xl font-extrabold text-white ring-4 ring-slate-50">
                    {i + 1}
                  </span>
                  <div className="xl:mt-6">
                    <p className="text-sm font-extrabold uppercase tracking-wide text-orange-700">{L(s.tahap)}</p>
                    <h3 className="mt-2 text-2xl font-extrabold leading-snug tracking-tight text-slate-900">{L(s.judul)}</h3>
                    <ul className="mt-5 space-y-3">
                      {s.poin.map((p) => (
                        <li key={p.id} className="flex items-start gap-3">
                          <s.ikon className="mt-1 h-5 w-5 shrink-0 text-orange-600" />
                          <span className="text-base leading-relaxed text-slate-700">{L(p)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ============ 5. PENJAMINAN & LAYANAN KHUSUS (2 KOLOM) ============ */}
      <section id="penjaminan-khusus" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Penjaminan Biaya & Layanan Khusus', en: 'Cost Coverage & Special Services' })}
          </h2>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Fisioterapi adalah terapi yang diulang. Karena itu jalur pembayaran dan bentuk layanan yang lebih fleksibel diatur di depan, supaya sesi tidak berhenti di tengah jalan.',
              en: 'Physiotherapy is a treatment that repeats. That is why the payment path and the more flexible service formats are arranged up front, so sessions do not stop halfway.',
            })}
          </p>

          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
            {/* KIRI: PENJAMINAN */}
            <div>
              <h3 className="text-2xl font-extrabold leading-tight tracking-tight text-slate-900">
                {L({ id: 'Cara Membayar Sesi Terapi', en: 'How to Pay for Your Sessions' })}
              </h3>
              <div className="mt-8 space-y-6">
                {PENJAMINAN.map((p, i) => (
                  <motion.article
                    key={p.judul.id}
                    initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.05 }}
                    className={`flex flex-col rounded-2xl border border-slate-200 border-l-4 ${p.garis} bg-white p-7 shadow-sm`}
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700">
                        <p.ikon className="h-7 w-7" />
                      </span>
                      <div>
                        <h4 className="text-2xl font-extrabold leading-snug tracking-tight text-slate-900">{L(p.judul)}</h4>
                        <p className="mt-2 inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-bold text-slate-700">{L(p.pill)}</p>
                      </div>
                    </div>
                    <p className="mt-5 text-lg leading-relaxed text-slate-600">{L(p.ket)}</p>
                    <ul className="mt-5 space-y-3">
                      {p.poin.map((pt) => (
                        <li key={pt.id} className="flex items-start gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                          <span className="text-base leading-relaxed text-slate-700">{L(pt)}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.article>
                ))}
              </div>
            </div>

            {/* KANAN: LAYANAN KHUSUS */}
            <div>
              <h3 className="text-2xl font-extrabold leading-tight tracking-tight text-slate-900">
                {L({ id: 'Layanan Tambahan di Luar Sesi Reguler', en: 'Extra Services Beyond Regular Sessions' })}
              </h3>
              <div className="mt-8 space-y-6">
                {KHUSUS.map((k, i) => (
                  <motion.article
                    key={k.judul.id}
                    initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.05 }}
                    className="flex flex-col rounded-2xl border border-orange-200 bg-orange-50 p-7"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-orange-200 bg-white text-orange-700">
                        <k.ikon className="h-7 w-7" />
                      </span>
                      <div>
                        <h4 className="text-2xl font-extrabold leading-snug tracking-tight text-slate-900">{L(k.judul)}</h4>
                        <p className="mt-2 inline-flex items-center rounded-full border border-orange-200 bg-white px-3 py-1 text-sm font-bold text-orange-800">{L(k.pill)}</p>
                      </div>
                    </div>
                    <p className="mt-5 text-lg leading-relaxed text-orange-900">{L(k.ket)}</p>
                    <ul className="mt-5 space-y-3">
                      {k.poin.map((pt) => (
                        <li key={pt.id} className="flex items-start gap-3">
                          <Check className="mt-1 h-4 w-4 shrink-0 text-orange-700" />
                          <span className="text-base leading-relaxed text-orange-900">{L(pt)}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.article>
                ))}
              </div>

              <p className="mt-8 flex items-start gap-3 text-base font-semibold leading-relaxed text-slate-600">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-orange-600" />
                {L({
                  id: 'Kunjungan rumah dan klinik postur tetap dimulai dari asesmen Sp.KFR. Jadwal, biaya, dan cakupan penjaminannya dikonfirmasi tertulis sebelum layanan berjalan.',
                  en: 'Home visits and the posture clinic still start from a specialist assessment. The schedule, cost and coverage are confirmed in writing before the service runs.',
                })}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 6. WIDGET UX ============ */}
      <FisioterapiWidgets />
    </div>
  );
};

export default FisioterapiClient;
