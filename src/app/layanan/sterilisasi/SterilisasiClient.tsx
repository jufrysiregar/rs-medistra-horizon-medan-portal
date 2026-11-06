'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Activity,
  Archive,
  ArrowRight,
  BadgeCheck,
  Barcode,
  Building2,
  Clock,
  Droplets,
  Flame,
  FlaskConical,
  MapPin,
  Microscope,
  Package,
  ScanLine,
  ShieldCheck,
  Thermometer,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import type { Language } from '../../../types';
import sterilisasiHero from '@/images/hero/layanan/sterilisasi.jpg';
import sterilisasiHeroMobile from '@/images/hero/mobile-layanan/sterilisasi.jpg';
import SterilisasiWidgets from './SterilisasiWidgets';

type Teks = { id: string; en: string };
type Ikon = React.ComponentType<{ className?: string }>;

/* ============================== DATA HALAMAN ============================== */

/** Tiga peran sentral CSSD bagi rumah sakit. */
const PERAN: { judul: Teks; ket: Teks; ikon: Ikon }[] = [
  {
    judul: { id: 'Pusat Pengendalian Infeksi RS', en: 'Hospital Infection Control Hub' },
    ket: {
      id: 'Mulai dekontaminasi, pencucian, pengemasan, sterilisasi, hingga penyimpanan, satu alur terpusat yang terkontrol.',
      en: 'From decontamination, washing, packaging and sterilisation through to storage, one controlled, centralised flow.',
    },
    ikon: ShieldCheck,
  },
  {
    judul: { id: 'Dukungan Operasional 24/7', en: '24/7 Operational Support' },
    ket: {
      id: 'Selalu siaga memenuhi kebutuhan ruang operasi (OK), UGD, dan ICU kapan pun, termasuk tindakan darurat di luar jam kerja.',
      en: 'Always ready to supply the operating theatre, emergency unit and ICU at any time, including after-hours emergencies.',
    },
    ikon: Clock,
  },
  {
    judul: { id: 'Pencegahan Infeksi Nosokomial (HAIs)', en: 'Nosocomial Infection (HAI) Prevention' },
    ket: {
      id: 'Instrumen dijamin 100% steril dan telusur, memutus rantai infeksi silang yang terkait tindakan medis.',
      en: 'Instruments are guaranteed 100% sterile and traceable, breaking the chain of procedure-related cross infection.',
    },
    ikon: Activity,
  },
];

/** Empat zona sterilisasi berurutan (alur satu arah), masing-masing dengan warna penanda. */
const ZONA: { no: number; nama: Teks; penanda: Teks; ket: Teks; ikon: Ikon; kelas: string }[] = [
  {
    no: 1,
    nama: { id: 'Dekontaminasi', en: 'Decontamination' },
    penanda: { id: 'Red Zone', en: 'Red Zone' },
    ket: {
      id: 'Instrumen kotor dicuci & didesinfeksi otomatis di mesin Washer-Disinfector bersuhu tinggi.',
      en: 'Dirty instruments are machine-washed and disinfected in a high-temperature Washer-Disinfector.',
    },
    ikon: Droplets,
    kelas: 'border-rose-200 bg-rose-50 text-rose-700',
  },
  {
    no: 2,
    nama: { id: 'Pengemasan', en: 'Packaging' },
    penanda: { id: 'Yellow Zone', en: 'Yellow Zone' },
    ket: {
      id: 'Setiap instrumen diinspeksi, diberi indikator kimia, lalu dikemas dan dilabeli nomor batch.',
      en: 'Every instrument is inspected, given a chemical indicator, then packed and labelled with a batch number.',
    },
    ikon: Package,
    kelas: 'border-amber-200 bg-amber-50 text-amber-700',
  },
  {
    no: 3,
    nama: { id: 'Sterilisasi', en: 'Sterilisation' },
    penanda: { id: 'Blue Zone', en: 'Blue Zone' },
    ket: {
      id: 'Steam Autoclave suhu tinggi untuk kain & logam; Hidrogen Peroksida suhu rendah untuk alat sensitif panas.',
      en: 'High-temperature steam autoclave for linen & metal; low-temperature hydrogen peroxide for heat-sensitive devices.',
    },
    ikon: Flame,
    kelas: 'border-sky-200 bg-sky-50 text-sky-700',
  },
  {
    no: 4,
    nama: { id: 'Penyimpanan', en: 'Storage' },
    penanda: { id: 'Green Zone', en: 'Green Zone' },
    ket: {
      id: 'Ruang bertekanan positif dengan kendali kelembapan; paket steril siap didistribusikan ke unit.',
      en: 'A positive-pressure, humidity-controlled room; sterile packs are ready for distribution to each unit.',
    },
    ikon: Archive,
    kelas: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  },
];

/** Tiga lapis pengujian kontrol mutu (kolom kiri section kontrol kualitas). */
const PENGUJIAN: { judul: Teks; ket: Teks; ikon: Ikon }[] = [
  {
    judul: { id: 'Indikator Fisik', en: 'Physical Indicator' },
    ket: { id: 'Suhu & tekanan tiap siklus autoklaf dipantau langsung dan terekam otomatis.', en: 'Each autoclave cycle’s temperature and pressure are monitored live and logged automatically.' },
    ikon: Thermometer,
  },
  {
    judul: { id: 'Indikator Kimia', en: 'Chemical Indicator' },
    ket: { id: 'Perubahan warna pita menandakan paket benar-benar terpapar proses sterilisasi.', en: 'A colour change on the tape confirms the pack was truly exposed to the sterilisation process.' },
    ikon: FlaskConical,
  },
  {
    judul: { id: 'Indikator Biologi', en: 'Biological Indicator' },
    ket: { id: 'Spore Test tiap siklus memastikan tidak ada mikroba yang bertahan hidup.', en: 'A spore test each cycle verifies that no microorganism survives.' },
    ikon: Microscope,
  },
];

/** Data dummy untuk kartu pelacakan barcode (kolom kanan). */
const JEJAK: { label: Teks; nilai: string }[] = [
  { label: { id: 'Tanggal Sterilisasi', en: 'Sterilisation Date' }, nilai: '2026-10-28' },
  { label: { id: 'Nama Petugas', en: 'Officer Name' }, nilai: 'A. Pratama, AMG' },
  { label: { id: 'Nomor Mesin', en: 'Machine No.' }, nilai: 'AUTOCLAVE-03' },
  { label: { id: 'Tanggal Kedaluwarsa', en: 'Expiry Date' }, nilai: '2027-04-28' },
];

/* ================================ RENDER ================================ */

/** Judul section editorial: H2 besar + divider tipis. */
const JudulSection: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">{children}</h2>
);

const SterilisasiClient: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (t: Teks) => t[lang];

  return (
    <div className="bg-white text-slate-800">
      {/* ============ 1. HERO (LATAR PENUH FOTO) ============ */}
      <section className="relative overflow-hidden bg-white pt-16 pb-12 lg:pt-20 lg:pb-16">
        {/* sterilisasi.jpg dipakai sebagai latar penuh hero. */}
        <div aria-hidden className="absolute inset-0">
          <Image src={sterilisasiHeroMobile} alt="" fill priority sizes="100vw" quality={90} className="object-cover object-right md:hidden" />
                    <Image src={sterilisasiHero} alt="" fill priority sizes="100vw" quality={90} className="hidden object-cover md:block" />
        </div>
        {/* Scrim: putih pekat hanya di sisi kiri (sampai ±45%), kanan 100% bening. */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-white from-20% via-white/70 to-transparent to-60%" />

        <div className="relative z-10 mr-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="max-w-3xl">
            <h1 className="text-[clamp(2.5rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight text-slate-900">
              {L({ id: 'Pusat Sterilisasi & Pencegahan Infeksi Terpadu', en: 'Integrated Sterilisation & Infection Prevention Center' })}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              {L({
                id: 'CSSD kami berjalan satu arah: instrumen kotor tidak pernah berpapasan dengan instrumen steril. Setiap paket diberi kode batch dan tanggal kedaluwarsa, diuji tiga lapis, dan dapat ditelusuri kembali, sehingga alat yang sampai ke tangan dokter Anda terjamin bersih dan aman.',
                en: 'Our CSSD runs one way: dirty instruments never cross paths with sterile ones. Every pack carries a batch code and expiry date, is tested three ways and can be traced back, so the instrument reaching your doctor’s hands is assuredly clean and safe.',
              })}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
                <Clock className="h-5 w-5 shrink-0 text-cyan-600" />
                {L({ id: 'Siaga 24 Jam · Jadwal OK', en: '24-Hour · Aligned to OT schedule' })}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
                <BadgeCheck className="h-5 w-5 shrink-0 text-cyan-600" />
                {L({ id: 'CSSD Terstandar', en: 'Standardised CSSD' })}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
                <MapPin className="h-5 w-5 shrink-0 text-cyan-600" />
                {L({ id: 'Lt G · Central Sterile Supply Dept', en: 'Ground Floor · Central Sterile Supply Dept' })}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 2. PERAN SENTRAL CSSD (GRID 3 KOLOM) ============ */}
      <section id="peran" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <JudulSection>{L({ id: 'Peran Sentral CSSD', en: 'The Central Role of CSSD' })}</JudulSection>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Satu departemen menopang keselamatan seluruh unit, dari ruang operasi hingga poliklinik rawat jalan.',
              en: 'One department underpins safety across every unit, from the operating theatre to the outpatient clinic.',
            })}
          </p>
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {PERAN.map((p, i) => (
              <motion.article
                key={p.judul.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-100 bg-cyan-50 text-cyan-700">
                  <p.ikon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-900">{L(p.judul)}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600">{L(p.ket)}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 3. EMPAT ZONA STERILISASI (STEPPER) ============ */}
      <section id="zona" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <JudulSection>{L({ id: 'Empat Zona Sterilisasi', en: 'Four Sterilisation Zones' })}</JudulSection>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Alur satu arah yang dijaga secara struktural: setiap zona memisahkan instrumen kotor dari bersih lewat dinding dan perbedaan tekanan udara.',
              en: 'A structurally guarded one-way flow: each zone separates dirty from clean instruments through walls and air-pressure differences.',
            })}
          </p>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ZONA.map((z, i) => (
              <motion.article
                key={z.no}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className={`relative flex h-full flex-col rounded-2xl border-2 p-6 shadow-sm ${z.kelas}`}
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl font-extrabold shadow-sm">
                    {z.no}
                  </span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/70">
                    <z.ikon className="h-6 w-6" />
                  </span>
                </div>
                <p className="mt-5 text-xs font-extrabold uppercase tracking-widest">{L(z.penanda)}</p>
                <h3 className="mt-1 text-xl font-extrabold leading-snug tracking-tight text-slate-900">{L(z.nama)}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-700">{L(z.ket)}</p>
                {i < ZONA.length - 1 && (
                  <span className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-slate-300 lg:block">
                    <ArrowRight className="h-6 w-6" />
                  </span>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 4. KONTROL KUALITAS (2 KOLOM) ============ */}
      <section id="kontrol" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <JudulSection>{L({ id: 'Kontrol Kualitas & Ketertelusuran', en: 'Quality Control & Traceability' })}</JudulSection>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Kiri: tiga lapis pengujian */}
            <div>
              <h3 className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-slate-900">
                <ShieldCheck className="h-7 w-7 shrink-0 text-cyan-600" />
                {L({ id: 'Tiga Lapis Pengujian', en: 'Three-Tier Testing' })}
              </h3>
              <div className="mt-6 space-y-6">
                {PENGUJIAN.map((t, i) => (
                  <div key={t.judul.id} className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-100 bg-cyan-50 text-cyan-700">
                      <t.ikon className="h-7 w-7" />
                    </span>
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-widest text-cyan-600">
                        {L({ id: `Lapis ${i + 1}`, en: `Tier ${i + 1}` })}
                      </p>
                      <h4 className="mt-1 text-lg font-bold text-slate-900">{L(t.judul)}</h4>
                      <p className="mt-1 text-base leading-relaxed text-slate-600">{L(t.ket)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Kanan: simulasi kartu pelacakan barcode */}
            <div>
              <h3 className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-slate-900">
                <Barcode className="h-7 w-7 shrink-0 text-cyan-600" />
                {L({ id: 'Sistem Pelacakan Barcode', en: 'Barcode Tracking System' })}
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                {L({
                  id: 'Setiap paket steril punya "kartu identitas" digital. Scan barcode untuk membuka riwayat lengkapnya dalam sekejap.',
                  en: 'Every sterile pack has a digital identity card. Scan the barcode to open its full history in an instant.',
                })}
              </p>

              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-cyan-50 px-6 py-4">
                  <p className="flex items-center gap-2 text-base font-extrabold text-cyan-800">
                    <ScanLine className="h-5 w-5" />
                    {L({ id: 'Telusur Batch', en: 'Batch Trace' })}
                  </p>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                    <BadgeCheck className="h-4 w-4" />
                    {L({ id: 'Lolos Steril', en: 'Sterile Pass' })}
                  </span>
                </div>
                <div className="px-6 py-6">
                  {/* Barcode dummy (bar vertikal) */}
                  <div className="flex h-16 items-end gap-[3px] rounded-lg border border-slate-100 bg-white px-4 py-3">
                    {[3, 2, 5, 2, 3, 6, 2, 4, 2, 5, 3, 2, 6, 2, 3, 4, 2, 5, 2, 3, 6, 2, 4, 3, 2, 5, 2, 6, 3, 2].map((w, idx) => (
                      <span key={idx} className="h-full rounded-sm bg-cyan-600" style={{ width: `${w}px` }} />
                    ))}
                  </div>
                  <p className="mt-2 text-center font-mono text-sm tracking-[0.3em] text-slate-500">CSSD-2026-10-28-03</p>

                  <dl className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-2">
                    {JEJAK.map((j) => (
                      <div key={j.label.id} className="bg-white px-4 py-3">
                        <dt className="text-xs font-bold uppercase tracking-wide text-slate-400">{L(j.label)}</dt>
                        <dd className="mt-0.5 text-base font-semibold text-slate-800">{j.nilai}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 5. LAYANAN B2B (BANNER LEBAR) ============ */}
      <section id="b2b" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-12">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.6fr_1fr]">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1.5 text-sm font-bold text-cyan-700">
                  <Building2 className="h-4 w-4" />
                  {L({ id: 'Kemitraan Eksternal', en: 'External Partnership' })}
                </span>
                <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                  {L({ id: 'Jasa Sterilisasi untuk Fasilitas Kesehatan Mitra', en: 'Sterilisation Services for Partner Healthcare Facilities' })}
                </h2>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
                  {L({
                    id: 'Kami melayani klinik pratama, praktik dokter gigi mandiri, dan bidan swasta dengan standar yang sama seperti untuk rumah sakit, disertai jaminan Sertifikat Lulus Sterilisasi resmi untuk setiap paket.',
                    en: 'We serve primary clinics, independent dental practices and private midwives to the same standard as our own hospital, with an official Sterilisation Completion Certificate guaranteed for every pack.',
                  })}
                </p>
              </div>
              <div className="flex flex-col items-start gap-4 lg:items-end">
                <a
                  href="#kemitraan-b2b"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-600 px-8 py-4 text-lg font-extrabold text-white shadow-lg shadow-cyan-600/25 transition-all hover:bg-cyan-700 active:scale-[0.98]"
                >
                  {L({ id: 'Ajukan Kemitraan B2B', en: 'Apply for B2B Partnership' })}
                  <ArrowRight className="h-5 w-5" />
                </a>
                <p className="text-sm font-semibold text-slate-500">
                  {L({ id: 'Respons tim kemitraan dalam 1×24 jam kerja.', en: 'Partnership team responds within 1 business day.' })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 6. WIDGETS INTERAKTIF ============ */}
      <SterilisasiWidgets />
    </div>
  );
};

export default SterilisasiClient;
