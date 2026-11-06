'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  ClipboardList,
  Clock,
  DoorOpen,
  Layers,
  Leaf,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Shirt,
  Sparkles,
  Thermometer,
  Timer,
  Trash2,
  Wind,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import type { Language } from '../../../types';
import loundry1 from '@/images/hero/layanan/loundry-1.jpg';
import loundry2 from '@/images/hero/layanan/loundry-2.jpg';
import loundry1Mobile from '@/images/hero/mobile-layanan/loundry-1.jpg';
import loundry2Mobile from '@/images/hero/mobile-layanan/loundry-2.jpg';
import LaundryWidgets from './LaundryWidgets';

type Teks = { id: string; en: string };
type Ikon = React.ComponentType<{ className?: string }>;

/* ============================== DATA HALAMAN ============================== */

/** Tiga jaminan sanitasi instalasi laundry medis. */
const JAMINAN: { judul: Teks; ket: Teks; ikon: Ikon }[] = [
  {
    judul: { id: 'Standar Higiene & PPI', en: 'Hygiene & IPC Standard' },
    ket: {
      id: 'Pemisahan tegas linen umum, pasien, dan infeksius untuk mencegah infeksi silang sesuai prinsip PPI.',
      en: 'Strict separation of general, patient and infectious linen to prevent cross infection under IPC principles.',
    },
    ikon: ShieldCheck,
  },
  {
    judul: { id: 'Bahan Aman', en: 'Safe Materials' },
    ket: {
      id: 'Deterjen hypoallergenic dan ramah lingkungan, lembut di kulit pasien, tanpa residu yang mengiritasi.',
      en: 'Hypoallergenic, eco-friendly detergents, gentle on patients’ skin, with no irritating residue.',
    },
    ikon: Leaf,
  },
  {
    judul: { id: 'Pencucian Termal', en: 'Thermal Washing' },
    ket: {
      id: 'Desinfeksi termal pada suhu tinggi (minimal 71°C selama 25 detik) di tunnel washer untuk mensterilkan kain.',
      en: 'Thermal disinfection at a high temperature (minimum 71°C for 25 seconds) in a tunnel washer to sterilise the fabric.',
    },
    ikon: Thermometer,
  },
];

/** Dua zona operasional dengan penanda warna dan tekanan udara. */
const ZONA: {
  judul: Teks; penanda: Teks; titik: Teks[]; tekanan: Teks; ikon: Ikon;
  kelas: string; ikonKelas: string; tekananKelas: string;
}[] = [
  {
    judul: { id: 'Dirty Room', en: 'Dirty Room' },
    penanda: { id: 'Red Zone', en: 'Red Zone' },
    titik: [
      { id: 'Penerimaan & penimbangan linen', en: 'Linen intake & weighing' },
      { id: 'Pemilahan infeksius / non-infeksius', en: 'Infectious / non-infectious sorting' },
      { id: 'Kantong larut air untuk linen infeksius', en: 'Water-soluble bags for infectious linen' },
    ],
    tekanan: { id: 'Bertekanan udara negatif', en: 'Negative air pressure' },
    ikon: Trash2,
    kelas: 'border-rose-200 bg-rose-50',
    ikonKelas: 'bg-rose-100 text-rose-600',
    tekananKelas: 'border-rose-200 bg-white text-rose-700',
  },
  {
    judul: { id: 'Clean Room', en: 'Clean Room' },
    penanda: { id: 'Green Zone', en: 'Green Zone' },
    titik: [
      { id: 'Pengeringan & penyetrikaan uap', en: 'Drying & steam ironing' },
      { id: 'Inspeksi kualitas linen', en: 'Linen quality inspection' },
      { id: 'Pengemasan tertutup (hygienic sealing)', en: 'Closed packaging (hygienic sealing)' },
    ],
    tekanan: { id: 'Bertekanan udara positif', en: 'Positive air pressure' },
    ikon: Sparkles,
    kelas: 'border-emerald-200 bg-emerald-50',
    ikonKelas: 'bg-emerald-100 text-emerald-600',
    tekananKelas: 'border-emerald-200 bg-white text-emerald-700',
  },
];

/** Tiga highlight layanan laundry personal pasien rawat inap. */
const PERSONAL: { judul: Teks; ket: Teks; ikon: Ikon }[] = [
  {
    judul: { id: 'Pencucian Terpisah', en: 'Individual Load' },
    ket: {
      id: 'Pakaian pribadi Anda dicuci sebagai satu muatan tersendiri, tidak pernah dicampur dengan pasien lain.',
      en: 'Your personal clothing is washed as its own separate load, never mixed with another patient’s.',
    },
    ikon: Layers,
  },
  {
    judul: { id: 'Door-to-Door Service', en: 'Door-to-Door Service' },
    ket: {
      id: 'Petugas menjemput dari kamar, lalu mengantar kembali bersih, wangi, dan terlipat rapi atau digantung pada hanger.',
      en: 'Staff collect from your room, then return items clean, fragrant and neatly folded or hung on a hanger.',
    },
    ikon: DoorOpen,
  },
  {
    judul: { id: 'Pilihan Durasi', en: 'Duration Options' },
    ket: {
      id: 'Reguler selesai dalam 24 jam, atau Ekspres selesai 6-8 jam bila Anda membutuhkan lebih cepat.',
      en: 'Regular completes within 24 hours, or Express in 6-8 hours when you need it sooner.',
    },
    ikon: Timer,
  },
];

/** Tiga kanal pemesanan & kontak, nomor tampil besar dan mencolok. */
const KONTAK: { judul: Teks; besar: Teks; ket: Teks; ikon: Ikon }[] = [
  {
    judul: { id: 'Telepon Kamar', en: 'Room Phone' },
    besar: { id: 'Ext. 148', en: 'Ext. 148' },
    ket: { id: 'Angkat telepon di kamar Anda, lalu tekan ekstensi 148 untuk menghubungi petugas laundry.', en: 'Pick up your room phone and dial extension 148 to reach the laundry attendant.' },
    ikon: Phone,
  },
  {
    judul: { id: 'WhatsApp Laundry', en: 'Laundry WhatsApp' },
    besar: { id: '0812-1122-3344', en: '0812-1122-3344' },
    ket: { id: 'Kirim pesan untuk penjemputan, menanyakan durasi, atau menjadwalkan pengantaran.', en: 'Send a message for a pick-up, to ask about duration, or to schedule a delivery.' },
    ikon: MessageCircle,
  },
  {
    judul: { id: 'Nota Laundry List', en: 'Laundry List Note' },
    besar: { id: 'Fisik / Digital', en: 'Physical / Digital' },
    ket: { id: 'Setiap serah-terima disertai nota rincian item dan jumlah sebagai bukti yang sah.', en: 'Every hand-over comes with an itemised note of pieces and quantities as valid proof.' },
    ikon: ClipboardList,
  },
];

/* ================================ RENDER ================================ */

/** Judul section editorial: H2 besar + divider tipis. */
const JudulSection: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">{children}</h2>
);

const LaundryClient: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (t: Teks) => t[lang];

  // Dua foto latar hero yang berganti tiap 3 detik.
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % 2), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-white text-slate-800">
      {/* ============ 1. HERO (LATAR PENUH FOTO BERGANTI) ============ */}
      <section className="relative overflow-hidden bg-white pt-16 pb-12 lg:pt-20 lg:pb-16">
        {/* loundry-1.jpg & loundry-2.jpg berganti tiap 3 detik sebagai latar penuh. */}
        <div aria-hidden className="absolute inset-0">
          {[{ m: loundry1Mobile, d: loundry1 }, { m: loundry2Mobile, d: loundry2 }].map((f, idx) => (
            <React.Fragment key={idx}>
              <Image
                src={f.m}
                alt=""
                fill
                priority
                sizes="100vw"
                quality={90}
                className={`object-cover object-right md:hidden transition-opacity duration-1000 ${slide === idx ? 'opacity-100' : 'opacity-0'}`}
              />
              <Image
                src={f.d}
                alt=""
                fill
                priority
                sizes="100vw"
                quality={90}
                className={`hidden object-cover md:block transition-opacity duration-1000 ${slide === idx ? 'opacity-100' : 'opacity-0'}`}
              />
            </React.Fragment>
          ))}
        </div>
        {/* Scrim: putih pekat hanya di sisi kiri (sampai ±45%), kanan 100% bening. */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-white from-20% via-white/70 to-transparent to-60%" />

        <div className="relative z-10 mr-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="max-w-3xl">
            <h1 className="text-[clamp(2.5rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight text-slate-900">
              {L({ id: 'Pusat Laundry Medis & Higiene Terpadu', en: 'Central Medical Laundry & Hygiene Center' })}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              {L({
                id: 'Linen dan pakaian diproses lewat jalur satu arah yang memisahkan area kotor dan bersih secara struktural. Linen infeksius dikantongkan larut air sejak ruang perawatan, dicuci pada suhu tinggi, lalu diantar dengan troli terpisah, sehingga setiap helai yang menyentuh kulit Anda terjamin bersih dan aman.',
                en: 'Linen and clothing are processed through a one-way route that structurally separates the dirty and clean areas. Infectious linen is bagged in a water-soluble sack from the ward, washed at a high temperature, then delivered in separate trolleys, so every thread touching your skin is assuredly clean and safe.',
              })}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
                <Clock className="h-5 w-5 shrink-0 text-cyan-600" />
                {L({ id: 'Sen-Sab 06.00-18.00', en: 'Mon-Sat 06.00-18.00' })}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
                <BadgeCheck className="h-5 w-5 shrink-0 text-cyan-600" />
                {L({ id: 'Binatu Terstandar', en: 'Standardised Laundry' })}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
                <MapPin className="h-5 w-5 shrink-0 text-cyan-600" />
                {L({ id: 'Lt G · Laundry & Ruang Pilah', en: 'Ground Floor · Laundry & Sorting Room' })}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 2. JAMINAN SANITASI (GRID 3 KOLOM) ============ */}
      <section id="jaminan" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <JudulSection>{L({ id: 'Jaminan Sanitasi', en: 'Sanitation Guarantee' })}</JudulSection>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Tiga pilar yang memastikan setiap linen dan pakaian pulang dalam keadaan bersih, aman, dan nyaman.',
              en: 'Three pillars ensuring every linen and garment returns clean, safe and comfortable.',
            })}
          </p>
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {JAMINAN.map((j, i) => (
              <motion.article
                key={j.judul.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-100 bg-cyan-50 text-cyan-700">
                  <j.ikon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-900">{L(j.judul)}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600">{L(j.ket)}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 3. ZONASI OPERASIONAL (2 KOLOM WARNA) ============ */}
      <section id="zonasi" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <JudulSection>{L({ id: 'Zonasi Operasional', en: 'Operational Zoning' })}</JudulSection>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Alur satu arah: linen kotor tidak pernah berpapasan dengan linen bersih, dipisahkan oleh ruangan dan arah tekanan udara.',
              en: 'A one-way flow: dirty linen never crosses clean linen, separated by rooms and the direction of air pressure.',
            })}
          </p>
          <div className="mt-12 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-10">
            {ZONA.map((z) => (
              <div key={z.penanda.id} className={`flex h-full flex-col rounded-3xl border-2 p-8 shadow-sm ${z.kelas}`}>
                <div className="flex items-center gap-4">
                  <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${z.ikonKelas}`}>
                    <z.ikon className="h-7 w-7" />
                  </span>
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-widest text-slate-500">{L(z.penanda)}</p>
                    <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">{L(z.judul)}</h3>
                  </div>
                </div>
                <ul className="mt-6 space-y-3">
                  {z.titik.map((t) => (
                    <li key={t.id} className="flex items-start gap-3 text-base text-slate-700">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                      {L(t)}
                    </li>
                  ))}
                </ul>
                <span className={`mt-6 inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-bold ${z.tekananKelas}`}>
                  <Wind className="h-4 w-4" />
                  {L(z.tekanan)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 4. LAYANAN PERSONAL PASIEN (BENTO) ============ */}
      <section id="personal" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <JudulSection>{L({ id: 'Layanan Personal Pasien', en: 'Personal Patient Service' })}</JudulSection>
          <div className="mt-5 h-px w-full bg-slate-200" />

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Card utama (bento besar) */}
            <div className="flex flex-col justify-between rounded-3xl border-2 border-cyan-200 bg-white p-8 shadow-sm lg:col-span-1">
              <div>
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-cyan-600 text-white shadow-lg shadow-cyan-600/25">
                  <Shirt className="h-8 w-8" />
                </span>
                <h3 className="mt-6 text-2xl font-extrabold leading-snug tracking-tight text-slate-900">
                  {L({ id: 'Layanan Laundry Personal Pasien Rawat Inap', en: 'Personal Laundry Service for Inpatients' })}
                </h3>
                <p className="mt-3 text-lg leading-relaxed text-slate-600">
                  {L({
                    id: 'Pakaian pribadi Anda dirawat dengan standar yang sama ketatnya seperti linen rumah sakit, terpisah, higienis, dan diantar langsung ke kamar.',
                    en: 'Your personal clothing is handled with standards as strict as hospital linen, separate, hygienic, and delivered straight to your room.',
                  })}
                </p>
              </div>
              <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1.5 text-sm font-bold text-cyan-700">
                <DoorOpen className="h-4 w-4" />
                {L({ id: 'Ambil & antar ke kamar', en: 'Pick-up & delivery to your room' })}
              </span>
            </div>

            {/* Tiga highlight */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:col-span-2">
              {PERSONAL.map((p) => (
                <div key={p.judul.id} className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-100 bg-cyan-50 text-cyan-700">
                    <p.ikon className="h-6 w-6" />
                  </span>
                  <h4 className="mt-4 text-lg font-extrabold leading-snug text-slate-900">{L(p.judul)}</h4>
                  <p className="mt-2 text-base leading-relaxed text-slate-600">{L(p.ket)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ 5. CARA PESAN & KONTAK (GRID 3 KOLOM) ============ */}
      <section id="kontak" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <JudulSection>{L({ id: 'Cara Pesan & Kontak', en: 'How to Order & Contact' })}</JudulSection>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Tiga kanal mudah untuk menghubungi laundry, pilih yang paling praktis bagi Anda.',
              en: 'Three easy channels to reach the laundry, pick whichever suits you best.',
            })}
          </p>
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {KONTAK.map((k) => (
              <div key={k.judul.id} className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-100 bg-cyan-50 text-cyan-700">
                  <k.ikon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-slate-500">{L(k.judul)}</h3>
                <p className="mt-1 text-3xl font-extrabold tracking-tight text-cyan-700 sm:text-4xl">{L(k.besar)}</p>
                <p className="mt-3 text-base leading-relaxed text-slate-600">{L(k.ket)}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-slate-400">
            <ArrowRight className="h-4 w-4" />
            {L({ id: 'Layanan penjemputan aktif mengikuti jam operasional instalasi.', en: 'Pick-up service runs within the installation’s operating hours.' })}
          </div>
        </div>
      </section>

      {/* ============ 6. WIDGETS INTERAKTIF ============ */}
      <LaundryWidgets />
    </div>
  );
};

export default LaundryClient;
