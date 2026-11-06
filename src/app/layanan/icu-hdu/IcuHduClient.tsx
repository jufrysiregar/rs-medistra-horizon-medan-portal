'use client';

import React, { useEffect, useState } from 'react';
import Image, { type StaticImageData } from 'next/image';
import { motion } from 'framer-motion';
import {
  Activity,
  Armchair,
  Check,
  Clock,
  Droplets,
  HandHeart,
  Heart,
  HeartPulse,
  MapPin,
  MessageCircle,
  Phone,
  Stethoscope,
  Syringe,
  Users,
  Wind,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type { Language } from '@/types';
import imgICU from '@/images/hero/fasilitas/ICU.jpg';
import imgHDU from '@/images/hero/fasilitas/HDU.jpg';
import imgICUMobile from '@/images/hero/mobile-fasilitas/ICU.jpg';
import imgHDUMobile from '@/images/hero/mobile-fasilitas/HDU.jpg';

/** Sepasang teks ID/EN; dipilih dengan [lang] supaya semua data tinggal di satu tempat. */
type Teks = { id: string; en: string };

/** Tipe ikon Lucide yang dipakai di kartu — cukup className. */
type Ikon = React.ComponentType<{ className?: string }>;

/* --------------------------------- DATA --------------------------------- */

/** Dua foto hero yang bergantian tiap 3 detik pada carousel. */
const HERO_FOTO: { src: StaticImageData; mobile: StaticImageData; alt: Teks }[] = [
  { src: imgICU, mobile: imgICUMobile, alt: { id: 'Ruang ICU dengan monitor tanda vital dan ventilator', en: 'ICU room with a vital-sign monitor and a ventilator' } },
  { src: imgHDU, mobile: imgHDUMobile, alt: { id: 'Ruang HDU dengan tempat tidur dan pemantauan berkelanjutan', en: 'HDU room with beds and continuous monitoring' } },
];

/** Dua unit di bawah satu tim kritis; Bento Grid dua kolom. */
const UNIT: { kode: string; judul: Teks; ket: Teks; kapasitas: Teks; lokasi: Teks; ikon: Ikon }[] = [
  {
    kode: 'ICU',
    judul: { id: 'Intensive Care Unit', en: 'Intensive Care Unit' },
    ket: {
      id: 'Untuk pasien dewasa kritis yang membutuhkan dukungan organ: bantuan napas dengan alat, obat penopang tekanan darah, atau pemantauan invasif. Dijaga dokter intensivis sepanjang hari, dan setiap perubahan kecil langsung terekam di monitor terpusat.',
      en: 'For critical adult patients needing organ support: machine-assisted breathing, blood-pressure supporting drugs, or invasive monitoring. An intensivist keeps watch around the clock, and every small change is logged on the central monitor at once.',
    },
    kapasitas: { id: '8 tempat tidur', en: '8 beds' },
    lokasi: { id: 'Lt 3 North Wing · Critical Care Center', en: 'Level 3 North Wing · Critical Care Center' },
    ikon: HeartPulse,
  },
  {
    kode: 'HDU',
    judul: { id: 'High Dependency Unit', en: 'High Dependency Unit' },
    ket: {
      id: 'Tahap transisi setelah ICU. Kondisi sudah stabil, tetapi tanda vital masih perlu dipantau terus sebelum pasien pindah ke kamar rawat inap biasa. Pemindahan ke ruang ini justru tanda yang baik: berarti kondisi sedang membaik.',
      en: 'The step-down stage after the ICU. The condition is stable, yet vital signs still need continuous monitoring before moving to a regular inpatient room. Transfer here is actually a good sign: it means the patient is improving.',
    },
    kapasitas: { id: '6 tempat tidur', en: '6 beds' },
    lokasi: { id: 'Lt 3 North Wing · Critical Care Center', en: 'Level 3 North Wing · Critical Care Center' },
    ikon: Activity,
  },
];

/** Empat teknologi utama di sisi tempat tidur. */
const TEKNOLOGI: { judul: Teks; ket: Teks; ikon: Ikon }[] = [
  {
    judul: { id: 'Bedside Monitor Multi-Parameter', en: 'Multi-Parameter Bedside Monitor' },
    ket: {
      id: 'Irama jantung, oksigen darah, tekanan darah, dan suhu tercatat tiap menit. Semua layar ditarik ke monitor pusat di meja perawat, jadi alarm tidak bergantung pada satu orang.',
      en: 'Heart rhythm, blood oxygen, blood pressure and temperature logged every minute. Every screen is mirrored to the central monitor at the nurse station, so alarms never depend on one person.',
    },
    ikon: Activity,
  },
  {
    judul: { id: 'Ventilator (Alat Bantu Napas)', en: 'Ventilator (Breathing Machine)' },
    ket: {
      id: 'Mode protektif untuk paru dewasa, dilengkapi pelembap gas agar nyaman dipakai berhari-hari. Pengaturan diubah hanya atas instruksi dokter.',
      en: 'Lung-protective modes, with heated humidification for comfort over several days. Settings are changed only when the doctor instructs them to.',
    },
    ikon: Wind,
  },
  {
    judul: { id: 'Syringe Pump & Infusion Pump', en: 'Syringe & Infusion Pumps' },
    ket: {
      id: 'Obat berisiko tinggi masuk tetes demi tetes dengan volume terkunci presisi. Setiap pompa diberi label obat dan dicek dua perawat sebelum dipasang.',
      en: 'High-alert drugs are delivered drop by drop with precisely locked volumes. Each pump carries a drug label and is double-checked by two nurses before being connected.',
    },
    ikon: Syringe,
  },
  {
    judul: { id: 'CRRT (Terapi Pengganti Ginjal Kontinu)', en: 'CRRT (Continuous Kidney Replacement Therapy)' },
    ket: {
      id: 'Cuci darah berjalan pelan selama 24 jam untuk pasien yang tekanan darahnya belum kuat untuk hemodialisa biasa. Bisa dilakukan tanpa memindahkan pasien.',
      en: 'Slow dialysis running for 24 hours for patients whose blood pressure is not ready for standard haemodialysis. It can be done without moving the patient.',
    },
    ikon: Droplets,
  },
];

/** Tiga pilar tim medis. */
const TIM: { judul: Teks; ket: Teks; poin: Teks[]; ikon: Ikon }[] = [
  {
    judul: { id: 'Dokter Konsultan KIC', en: 'KIC Consultant Physician' },
    ket: {
      id: 'Perawatan kritis tidak dipikul satu dokter. Konsultan dengan subspesialisasi perawatan intensif hadir setiap visite, dan keputusan besar diambil dalam tim bersama dokter penanggung jawab pasien.',
      en: 'Intensive care is not carried by a single doctor. Consultants with a subspecialisation in intensive care join every ward round, and major decisions are taken as a team together with the doctor in charge.',
    },
    poin: [
      { id: 'Putaran visite dua kali sehari, pagi dan sore', en: 'Two ward rounds daily, morning and evening' },
      { id: 'Second opinion dapat diminta keluarga kapan pun', en: 'A second opinion can be requested any time' },
    ],
    ikon: Stethoscope,
  },
  {
    judul: { id: 'Perawat Kritis Rasio 1 : 1 / 1 : 2', en: 'Critical Care Nurses at a 1:1 / 1:2 Ratio' },
    ket: {
      id: 'Pasien yang belum stabil atau memakai lebih dari satu alat penunjang hidup dijaga satu perawat untuk satu pasien. Bila kondisi membaik, rasio menjadi 1 : 2, dan 1 : 3 di HDU.',
      en: 'Patients who are not yet stable or who run more than one life-support device are kept one nurse to one patient. As they improve the ratio becomes 1:2, and 1:3 in the HDU.',
    },
    poin: [
      { id: 'Bersertifikat perawatan kritis & BLS/ACLS berkala', en: 'Critical-care certified with regular BLS/ACLS refreshers' },
      { id: 'Serah terima di samping tempat tidur agar riwayat tidak putus', en: 'Bedside hand-over so no history is lost' },
    ],
    ikon: Users,
  },
  {
    judul: { id: 'Tim Multi-Disiplin Terjadwal', en: 'A Scheduled Multi-Disciplinary Team' },
    ket: {
      id: 'Farmasis klinik menata ulang dosis tiap hari, ahli gizi menyiapkan nutrisi enteral, fisioterapis melatih napas dan gerak lebih dini, dan tim pengendalian infeksi memantau kebersihan alat.',
      en: 'A clinical pharmacist re-checks doses every day, a dietitian prepares enteral nutrition, a physiotherapist trains breathing and early movement, and the infection-control team watches device hygiene.',
    },
    poin: [
      { id: 'Satu jadwal visite gabungan, keluarga boleh menitip pertanyaan', en: 'One combined ward round; families may pass questions' },
      { id: 'Rujukan psikologi & psikiatri bila keluarga membutuhkan', en: 'Psychology and psychiatry referral whenever the family needs it' },
    ],
    ikon: HandHeart,
  },
];

/** Tiga bentuk dukungan untuk keluarga. */
const DUKUNGAN: { judul: Teks; ket: Teks; ikon: Ikon }[] = [
  {
    judul: { id: 'Family Conference', en: 'Family Conference' },
    ket: {
      id: 'Jam informasi medis harian: dokter penanggung jawab atau intensivis yang bertugas menjelaskan kondisi terbaru, hasil pemeriksaan penting, dan rencana 24 jam ke depan.',
      en: 'A daily medical information hour: the doctor in charge or the intensivist on duty explains the latest condition, important results and the next 24-hour plan.',
    },
    ikon: MessageCircle,
  },
  {
    judul: { id: 'Critical Care Family Lounge', en: 'Critical Care Family Lounge' },
    ket: {
      id: 'Ruang tunggu khusus keluarga pasien kritis tepat di depan unit, dengan kursi panjang, colokan listrik, minuman hangat, dan papan informasi. Perawat keluar memberi pembaruan berkala.',
      en: 'A waiting room reserved for families of critical patients right in front of the unit, with bench seating, power outlets, warm drinks and an information board. Nurses step out with regular updates.',
    },
    ikon: Armchair,
  },
  {
    judul: { id: 'Dukungan Psikologis', en: 'Psychological Support' },
    ket: {
      id: 'Menunggu di unit kritis melelahkan secara batin. Konseling bisa diminta lewat perawat ruangan untuk keluarga maupun pasien pasca-kritis, termasuk rujukan ke konsultan kesehatan jiwa.',
      en: 'Waiting in a critical-care unit is exhausting inside as well as out. Counselling can be requested through the ward nurse for families and post-critical patients, including a mental-health referral.',
    },
    ikon: Heart,
  },
];

/* ------------------------------- CAROUSEL ------------------------------- */

/** Slideshow dua foto: semua lapisan tetap terpasang, hanya opacity yang silang
 *  (cross-fade mulus tanpa kedip putih), bergantian setiap 3 detik. */
const HeroCarousel: React.FC<{ L: (t: Teks) => string }> = ({ L }) => {
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % HERO_FOTO.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div aria-hidden className="absolute inset-0">
      {HERO_FOTO.map((f, i) => (
        <motion.div
          key={f.alt.id}
          initial={false}
          animate={{ opacity: i === slide ? 1 : 0 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image
            src={f.mobile}
            alt={L(f.alt)}
            fill
            priority={i === 0}
            sizes="100vw"
            quality={85}
            className="object-cover object-right md:hidden"
          />
          <Image
            src={f.src}
            alt={L(f.alt)}
            fill
            priority={i === 0}
            sizes="100vw"
            quality={85}
            className="hidden object-cover md:block"
          />
        </motion.div>
      ))}
    </div>
  );
};

/* --------------------------------- HALAMAN -------------------------------- */

/**
 * HALAMAN ICU / HDU (/layanan/icu-hdu) — gaya editorial yang tenang & premium,
 * Light Theme (putih & slate-50, aksen cyan). Lima bagian: hero full-bleed dengan
 * foto sebagai background (carousel ICU/HDU) dan scrim terang agar teks mudah
 * dibaca, Bento dua unit (ICU & HDU), teknologi & tim medis dua
 * kolom, highlight "Untuk Keluarga", lalu penutup kontak halus satu tombol.
 * Tidak ada tombol darurat/telepon berlebihan dan tidak ada kotak merah.
 */
const IcuHduClient: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (teks: Teks) => teks[lang];

  return (
    <div className="bg-white text-slate-800">
      {/* ============ 1. HERO (FOTO SEBAGAI BACKGROUND) ============ */}
      <section className="relative isolate overflow-hidden bg-white pt-16 pb-12 lg:pt-20 lg:pb-16">
        <HeroCarousel L={L} />

        {/* Scrim: putih pekat hanya di sisi kiri, kanan bening agar foto terlihat (Light Theme) */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-white from-20% via-white/70 to-transparent to-60%" />

        <div className="relative z-10 mr-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="max-w-3xl">
            <h1 className="text-[clamp(2.4rem,5.2vw,4.25rem)] font-extrabold leading-[1.05] tracking-tight text-slate-900">
              {L({ id: 'Instalasi Perawatan Intensif (ICU & HDU)', en: 'Intensive Care Installation (ICU & HDU)' })}
            </h1>

            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-slate-700 sm:text-2xl">
              {L({
                id: 'Kami tahu menit-menit di depan unit kritis adalah waktu yang paling berat bagi keluarga. Karena itu semua kamar terhubung ke monitor terpusat di meja perawat, dijaga dokter intensivis sepanjang malam, dan setiap perubahan sekecil apa pun diketahui lebih cepat daripada sempat membahayakan pasien.',
                en: 'We know the minutes outside a critical-care unit are the hardest for a family. That is why every room is linked to a central monitor at the nurse station, an intensivist keeps watch through the night, and any change, however small, is noticed sooner than it can harm the patient.',
              })}
            </p>
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-5 py-2.5 text-base font-medium text-slate-800 backdrop-blur-sm">
              <Clock className="h-5 w-5 shrink-0 text-cyan-600" />
              {L({ id: 'Buka 24 Jam Nonstop', en: 'Open 24 Hours Nonstop' })}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-5 py-2.5 text-base font-medium text-slate-800 backdrop-blur-sm">
              <HeartPulse className="h-5 w-5 shrink-0 text-cyan-600" />
              {L({ id: 'Rasio Perawat 1:1', en: '1:1 Nurse Ratio' })}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-5 py-2.5 text-base font-medium text-slate-800 backdrop-blur-sm">
              <Stethoscope className="h-5 w-5 shrink-0 text-cyan-600" />
              {L({ id: 'Dokter Intensivis Siaga', en: 'Intensivist on Standby' })}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-5 py-2.5 text-base font-medium text-slate-800 backdrop-blur-sm">
              <MapPin className="h-5 w-5 shrink-0 text-cyan-600" />
              {'Lt 3 North Wing'}
            </span>
          </div>
        </div>
      </section>

      {/* ============= 2. DUA UNIT (BENTO GRID 2 KOLOM) ============= */}
      <section id="unit" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Dua Unit, Satu Tim Perawatan Kritis', en: 'Two Units, One Critical-Care Team' })}
          </h2>
          <div className="mt-5 h-px w-full bg-slate-200" />

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {UNIT.map((u, i) => (
              <motion.article
                key={u.kode}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-100 bg-cyan-50 text-cyan-700">
                  <u.ikon className="h-7 w-7" />
                </span>

                <p className="mt-6 text-sm font-extrabold uppercase tracking-wider text-cyan-700">{u.kode}</p>
                <h3 className="mt-1 text-2xl font-extrabold leading-snug tracking-tight text-slate-900">{L(u.judul)}</h3>
                <p className="mt-4 flex-1 text-base leading-relaxed text-slate-600">{L(u.ket)}</p>

                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-slate-100 pt-5 text-sm font-bold text-slate-500">
                  <p className="flex items-center gap-2">
                    <BedIcon />
                    <span>{L(u.kapasitas)}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 shrink-0 text-cyan-600" />
                    <span>{L(u.lokasi)}</span>
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 3. TEKNOLOGI & TIM MEDIS (2 KOLOM) ========== */}
      <section id="teknologi-tim" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Alat di Sisi Tempat Tidur, Orang di Sekelilingnya', en: 'Equipment at the Bedside, People Around It' })}
          </h2>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Teknologi hanya menolong kalau ada yang menjaganya. Di bawah ini perangkat utama kami, dan di sebelahnya orang-orang yang mengoperasikannya setiap shift.',
              en: 'Technology only helps when someone watches over it. Below are our core devices, and beside them the people who run them every shift.',
            })}
          </p>

          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-14">
            {/* KIRI: teknologi */}
            <div>
              <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">
                {L({ id: 'Teknologi Advanced Life Support', en: 'Advanced Life-Support Technology' })}
              </h3>
              <ul className="mt-8 space-y-4">
                {TEKNOLOGI.map((t, i) => (
                  <motion.li
                    key={t.judul.id}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05, ease: 'easeOut' }}
                    className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-cyan-700">
                      <t.ikon className="h-6 w-6" />
                    </span>
                    <div>
                      <h4 className="text-lg font-extrabold leading-snug text-slate-900">{L(t.judul)}</h4>
                      <p className="mt-2 text-base leading-relaxed text-slate-600">{L(t.ket)}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* KANAN: tim medis */}
            <div>
              <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">
                {L({ id: 'Tim Medis yang Menjaga Pasien Anda', en: 'The Medical Team Looking After Your Patient' })}
              </h3>
              <div className="mt-8 space-y-5">
                {TIM.map((t, i) => (
                  <motion.article
                    key={t.judul.id}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.42, delay: i * 0.07, ease: 'easeOut' }}
                    className="rounded-2xl border border-slate-200 border-l-4 border-l-cyan-500 bg-white p-6 shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-100 bg-cyan-50 text-cyan-700">
                        <t.ikon className="h-6 w-6" />
                      </span>
                      <h4 className="text-xl font-extrabold leading-snug tracking-tight text-slate-900">{L(t.judul)}</h4>
                    </div>

                    <p className="mt-4 text-base leading-relaxed text-slate-600">{L(t.ket)}</p>

                    <ul className="mt-5 space-y-2.5 border-t border-slate-100 pt-5">
                      {t.poin.map((p) => (
                        <li key={p.id} className="flex items-start gap-3 text-base leading-snug text-slate-700">
                          <Check className="mt-1 h-4 w-4 shrink-0 text-cyan-600" />
                          <span>{L(p)}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 4. UNTUK KELUARGA (HIGHLIGHT BOX) ========== */}
      <section id="keluarga" className="scroll-mt-28 bg-white pb-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-12"
          >
            <h2 className="max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              {L({ id: 'Untuk Keluarga yang Menunggu', en: 'For the Family Waiting Outside' })}
            </h2>
            <div className="mt-5 h-px w-full bg-slate-200" />
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
              {L({
                id: 'Menunggu juga bagian dari perawatan. Tiga hal berikut disiapkan supaya keluarga tidak berjalan sendirian: waktu informasi yang tetap, ruang tunggu yang layak, dan seseorang yang siap mendengarkan.',
                en: 'Waiting is part of care too. Three things are in place so the family does not walk through this alone: a fixed information time, a decent waiting room, and someone ready to listen.',
              })}
            </p>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {DUKUNGAN.map((d, i) => (
                <motion.div
                  key={d.judul.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.42, delay: i * 0.08, ease: 'easeOut' }}
                  className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-100 bg-cyan-50 text-cyan-700">
                    <d.ikon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-900">{L(d.judul)}</h3>
                  <p className="mt-3 text-base leading-relaxed text-slate-600">{L(d.ket)}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== 5. PENUTUP (KARTU KONTAK PREMIUM) ========== */}
      <section id="kontak" className="scroll-mt-28 bg-white pb-24">
        <div className="mx-auto w-full max-w-4xl px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-cyan-50/50 p-8 text-center shadow-sm sm:p-12"
          >
            <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-100/50 blur-3xl" />

            <span className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-100 bg-white text-cyan-700 shadow-sm">
              <HandHeart className="h-8 w-8" />
            </span>

            <h2 className="relative mt-6 text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl">
              {L({ id: 'Kami Selalu Siap Membantu Anda', en: 'We Are Always Here to Help' })}
            </h2>

            <p className="relative mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
              {L({
                id: 'Butuh informasi lebih lanjut terkait kondisi pasien? Silakan hubungi Meja Perawat Critical Care Center kami yang siaga 24 jam.',
                en: 'Need more information about your patient? Please reach our Critical Care Center Nurse Station, staffed 24 hours.',
              })}
            </p>

            <a
              href="tel:300"
              className="relative mt-8 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 text-base font-bold text-slate-800 shadow-sm transition-all hover:border-cyan-300 hover:text-cyan-800 hover:shadow-md"
            >
              <Phone className="h-5 w-5 text-cyan-600" />
              {L({ id: 'Hubungi Meja Perawat (Ext. 300)', en: 'Contact Nurse Station (Ext. 300)' })}
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

/** Ikon tempat tidur kecil untuk baris kapasitas. */
const BedIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-cyan-600" aria-hidden="true">
    <path d="M2 4v16" />
    <path d="M2 8h18a2 2 0 0 1 2 2v10" />
    <path d="M2 17h20" />
    <path d="M6 8v9" />
  </svg>
);

export default IcuHduClient;
