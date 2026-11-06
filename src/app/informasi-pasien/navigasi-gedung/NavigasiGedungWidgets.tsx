'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Banknote,
  BedDouble,
  Biohazard,
  DoorOpen,
  Droplets,
  Flame,
  Info,
  MapPin,
  Moon,
  MoveVertical,
  ShieldCheck,
  SquareParking,
  Star,
  Trash2,
  Toilet,
  Waves,
  type LucideIcon,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import type { Language } from '../../../types';
import type { Bilingual } from '../../../lib/i18n';
import gedungId from '../../../data/gedung.json';
import gedungEn from '../../../data/en/gedung.json';

/* ======================= DATA LIFT & FASILITAS UMUM =======================
 * Bagian penutup halaman: empat jenis lift beserta area layanannya (publik,
 * bed/stretcher, VIP dedicated, dan servis), lalu legenda fasilitas umum.
 * Semua visual cukup ikon Lucide (tanpa gambar eksternal), tata letak light
 * theme dengan aksen cyan/navy plus sentuhan gold untuk kartu VIP.
 * ======================================================================== */

type Lift = {
  ikon: LucideIcon;
  judul: Bilingual;
  /** Chip kecil di kanan atas kartu, mis. "Publik" / "Eksklusif VVIP". */
  lencana: Bilingual;
  /** Kelas warna lencana; bawaan abu-abu terang. */
  lencanaAksen?: string;
  ket: Bilingual;
  /** Chip cakupan layanan di bagian bawah kartu. */
  cakupan: Bilingual[];
  /** Kelas warna kotak ikon; bawaan cyan terang. */
  ikonAksen?: string;
  /** Kartu VIP: bingkai gold + chip cakupan senada. */
  premium?: boolean;
};

const LIFT: Lift[] = [
  {
    ikon: MoveVertical,
    judul: { id: 'Lift Publik', en: 'Public Lift' },
    ikonAksen: 'bg-cyan-50 text-cyan-600',
    lencana: { id: 'Publik', en: 'Public' },
    lencanaAksen: 'border-cyan-100 bg-cyan-50 text-cyan-800',
    ket: {
      id: 'Lift utama pengunjung yang menghubungkan lantai publik. Berhenti di lantai G hingga 10, kecuali Lantai 4 yang tidak dioperasikan dan Lantai 9 yang khusus melayani lift VIP.',
      en: 'The main visitor lift connecting the public floors. It stops from G to 10, except Floor 4 which is not in operation and Floor 9 which is served only by the VIP lift.',
    },
    cakupan: [
      { id: 'Lobi Utama', en: 'Main Lobby' },
      { id: 'Poli & Penunjang', en: 'Clinics & Support' },
      { id: 'Kapasitas 15 Orang', en: '15-Person Capacity' },
    ],
  },
  {
    ikon: BedDouble,
    judul: { id: 'Lift Bed / Stretcher', en: 'Bed / Stretcher Lift' },
    ikonAksen: 'bg-blue-50 text-blue-600',
    lencana: { id: 'Publik', en: 'Public' },
    lencanaAksen: 'border-cyan-100 bg-cyan-50 text-cyan-800',
    ket: {
      id: 'Kabin oversized untuk brankar, tempat tidur dorong, dan kursi roda. Jalur cepat pasien dari UGD menuju ruang tindakan dan rawat inap.',
      en: 'An oversized cabin for stretchers, trolleys and wheelchairs. A fast patient route from the emergency unit to treatment and inpatient areas.',
    },
    cakupan: [
      { id: 'UGD ke ICU / HDU', en: 'ER to ICU / HDU' },
      { id: 'Ruang Operasi (OK)', en: 'Operating Theatre' },
      { id: 'Rawat Inap Lt. 6-7', en: 'Inpatient Floors 6-7' },
    ],
  },
  {
    ikon: Star,
    judul: { id: 'VIP Dedicated Lift', en: 'VIP Dedicated Lift' },
    lencana: { id: 'Eksklusif VVIP', en: 'VVIP Exclusive' },
    lencanaAksen: 'border-amber-200 bg-amber-50 text-amber-800',
    ikonAksen: 'bg-amber-100 text-amber-600 shadow-sm shadow-amber-200',
    premium: true,
    ket: {
      id: 'Akses eksklusif khusus pasien VIP/VVIP menuju Lt 7 & Lt 9, terpisah dari lift publik.',
      en: 'Exclusive access for VIP/VVIP patients to Floors 7 & 9, separated from the public lifts.',
    },
    cakupan: [
      { id: 'Rute Lt 7 & Lt 9', en: 'Floors 7 & 9 Route' },
      { id: 'Lobi & Antrean Terpisah', en: 'Separate Lobby & Queue' },
      { id: 'Pendampingan Buteler', en: 'Butler Assistance' },
    ],
  },
  {
    ikon: ShieldCheck,
    judul: { id: 'Lift Khusus / Layanan', en: 'Service / Staff Lift' },
    ikonAksen: 'bg-slate-100 text-slate-600',
    ket: {
      id: 'Lift operasional untuk staf, logistik, farmasi bedah, laundry, serta akses berjenjang ke lantai terbatas seperti ruang isolasi Lantai 8 dan area VVIP Lantai 9.',
      en: 'An operational lift for staff, logistics, surgical pharmacy and laundry, with staged access to restricted floors such as the Floor 8 isolation area and the Floor 9 VVIP zone.',
    },
    lencana: { id: 'Khusus Staf', en: 'Staff Only' },
    lencanaAksen: 'border-navy-900/10 bg-navy-900/5 text-navy-800',
    cakupan: [
      { id: 'Kartu Akses Staf', en: 'Staff Access Card' },
      { id: 'Lantai 8 & 9', en: 'Floors 8 & 9' },
      { id: 'Logistik & Gizi', en: 'Logistics & Dietary' },
    ],
  },
];

type Fasilitas = { ikon: LucideIcon; nama: Bilingual; ket: Bilingual };

const FASILITAS: Fasilitas[] = [
  {
    ikon: Toilet,
    nama: { id: 'Toilet Umum', en: 'Public Restrooms' },
    ket: { id: 'Setiap lantai, akses difabel di G & 6', en: 'On every floor, accessible on G & 6' },
  },
  {
    ikon: Moon,
    nama: { id: 'Musholla', en: 'Prayer Room' },
    ket: { id: 'Lantai G, sayap selatan', en: 'Ground floor, south side' },
  },
  {
    ikon: Banknote,
    nama: { id: 'ATM Center', en: 'ATM Centre' },
    ket: { id: 'Lantai G, dekat kantin', en: 'Ground floor, near the canteen' },
  },
  {
    ikon: SquareParking,
    nama: { id: 'Area Parkir', en: 'Parking Area' },
    ket: { id: 'Basement & area luar, valet tersedia', en: 'Basement & outdoor, valet available' },
  },
];

/* ============ DATA SELAMAT & LINGKUNGAN (dari gedung.json) ============ */

/** Sebagian field gedung.json yang dipakai section keselamatan & lingkungan. */
type Gf = {
  tangga_darurat?: boolean;
  apar?: boolean;
  titik_kumpul?: string;
  water_treatment?: string;
  ipal?: string;
  tps_limbah_b3?: string;
  tps_domestik?: string;
};
const GI = gedungId as unknown as Gf[];
const GE = gedungEn as unknown as Gf[];

/** Kartu generik untuk section keselamatan (tema merah) & lingkungan (tema hijau). */
const KartuInfo: React.FC<{
  ikon: LucideIcon;
  judul: string;
  ket: string;
  kaki: string;
  tema: 'red' | 'emerald';
  i: number;
}> = ({ ikon: Ikon, judul, ket, kaki, tema, i }) => {
  const card = tema === 'red' ? 'border-red-100 bg-red-50/50' : 'border-emerald-100 bg-emerald-50/50';
  const box = tema === 'red' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600';
  const accent = tema === 'red' ? 'text-red-700' : 'text-emerald-700';
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: i * 0.05 }}
      className={`flex h-full flex-col rounded-2xl border p-6 shadow-sm ${card}`}
    >
      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${box}`}>
        <Ikon className="h-6 w-6" />
      </span>
      <h4 className="mt-5 text-lg font-extrabold leading-snug tracking-tight text-navy-900">{judul}</h4>
      <p className="mt-2 flex-1 text-base leading-relaxed text-slate-600">{ket}</p>
      <p className={`mt-4 text-sm font-bold ${accent}`}>{kaki}</p>
    </motion.article>
  );
};

/* ================================ HALAMAN ================================ */

const NavigasiGedungWidgets: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (t: Bilingual) => t[lang];

  /* Lokasi fasilitas diambil langsung dari gedung.json Lantai G (SSoT). */
  const lbh = (id?: string, en?: string) => (lang === 'en' && en ? en : id ?? '');
  const nStairs = GI.filter((f) => f.tangga_darurat === true).length;
  const nApar = GI.filter((f) => f.apar === true).length;
  const lokasiPrefix = L({ id: 'Lokasi: ', en: 'Location: ' });
  const G0 = GI[0];
  const E0 = GE[0];

  const KESELAMATAN = [
    {
      ikon: DoorOpen,
      judul: L({ id: 'Tangga Darurat', en: 'Emergency Stairs' }),
      ket: L({
        id: 'Tersedia di setiap ujung sayap North & South Wing. Ikuti jalur evakuasi.',
        en: 'Located at each end of the North & South Wings. Follow the evacuation route.',
      }),
      kaki: L({ id: `Berlaku di ${nStairs} lantai aktif`, en: `In service on ${nStairs} active floors` }),
    },
    {
      ikon: Flame,
      judul: L({ id: 'APAR (Alat Pemadam)', en: 'Fire Extinguishers (APAR)' }),
      ket: L({
        id: 'Tersedia di setiap koridor dan dekat Nurse Station.',
        en: 'Placed in every corridor and near each Nurse Station.',
      }),
      kaki: L({ id: `Tersedia di ${nApar} lantai aktif`, en: `Provided on ${nApar} active floors` }),
    },
    {
      ikon: MapPin,
      judul: L({ id: 'Titik Kumpul', en: 'Assembly Point' }),
      ket: L({
        id: 'Area terbuka aman tempat pasien dan staf berkumpul setelah evakuasi.',
        en: 'A safe open area where patients and staff gather after evacuation.',
      }),
      kaki: `${lokasiPrefix}${lbh(G0?.titik_kumpul, E0?.titik_kumpul)}`,
    },
  ];

  const LINGKUNGAN = [
    {
      ikon: Droplets,
      judul: L({ id: 'Water Treatment (WTP/RO)', en: 'Water Treatment (WTP/RO)' }),
      ket: L({
        id: 'Pengolahan air bersih terpusat untuk operasi & cuci darah.',
        en: 'Centralised clean-water treatment for surgery and dialysis.',
      }),
      kaki: `${lokasiPrefix}${lbh(G0?.water_treatment, E0?.water_treatment)}`,
    },
    {
      ikon: Waves,
      judul: L({ id: 'IPAL (Limbah Cair)', en: 'Wastewater Treatment (IPAL)' }),
      ket: L({
        id: 'Instalasi Pengolahan Air Limbah sebelum dibuang ke saluran kota.',
        en: 'Treats hospital wastewater before it reaches the municipal drain.',
      }),
      kaki: `${lokasiPrefix}${lbh(G0?.ipal, E0?.ipal)}`,
    },
    {
      ikon: Biohazard,
      judul: L({ id: 'TPS Limbah B3 (Medis)', en: 'Hazardous (B3) Waste Storage' }),
      ket: L({
        id: 'Penampungan sementara limbah infeksius & patologi sebelum dimusnahkan dengan insinerator.',
        en: 'Temporary storage of infectious & pathological waste before incineration.',
      }),
      kaki: `${lokasiPrefix}${lbh(G0?.tps_limbah_b3, E0?.tps_limbah_b3)}`,
    },
    {
      ikon: Trash2,
      judul: L({ id: 'TPS Domestik', en: 'Domestic Waste Storage' }),
      ket: L({
        id: 'Pemilahan sampah organik & anorganik dari kantor/kantin.',
        en: 'Sorting of organic & inorganic waste from offices and the canteen.',
      }),
      kaki: `${lokasiPrefix}${lbh(G0?.tps_domestik, E0?.tps_domestik)}`,
    },
  ];

  return (
    <>
      <section id="lift-fasilitas" className="scroll-mt-24 bg-white py-20">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        <h3 className="text-balance text-3xl font-extrabold leading-tight tracking-tight text-navy-900 lg:text-4xl">
          {L({ id: 'Sistem Lift & Fasilitas Umum', en: 'Lift System & Public Facilities' })}
        </h3>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
          {L({
            id: 'Empat jenis lift memisahkan alur pengunjung, pasien, VIP/VVIP, dan layanan agar tidak saling berpotongan. Fasilitas umum berikut berada di titik yang mudah dijangkau.',
            en: 'Four lift types keep visitor, patient, VIP/VVIP and service flows separate. The following public facilities sit at easily reachable points.',
          })}
        </p>

        {/* ---------- 4 kartu lift ---------- */}
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {LIFT.map((lift, i) => (
            <motion.article
              key={L(lift.judul)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className={`flex h-full flex-col rounded-2xl border bg-gradient-to-b from-white to-slate-50 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl lg:p-7 ${
                lift.premium ? 'border-amber-300 shadow-lg shadow-amber-100' : 'border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <span
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${
                    lift.ikonAksen ?? 'bg-cyan-50 text-cyan-600'
                  }`}
                >
                  <lift.ikon className="h-7 w-7" />
                </span>
                <span
                  className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${
                    lift.lencanaAksen ?? 'border-slate-200 bg-white text-slate-500'
                  }`}
                >
                  {L(lift.lencana)}
                </span>
              </div>

              <h4 className="mt-6 text-xl font-extrabold leading-snug tracking-tight text-navy-900 lg:text-2xl">
                {L(lift.judul)}
              </h4>
              <p className="mt-3 flex-1 text-base leading-relaxed text-slate-600">{L(lift.ket)}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {lift.cakupan.map((c) => (
                  <span
                    key={L(c)}
                    className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${
                      lift.premium ? 'bg-amber-50 text-amber-900' : 'bg-slate-50 text-slate-700'
                    }`}
                  >
                    {L(c)}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        {/* ---------- Legenda fasilitas umum ---------- */}
        <div className="mt-16 rounded-3xl border border-slate-200 bg-slate-50 p-6 lg:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h4 className="text-xl font-extrabold tracking-tight text-navy-900">
              {L({ id: 'Legenda Fasilitas Umum', en: 'Public Facilities Legend' })}
            </h4>
            <span className="text-sm font-semibold text-slate-500">
              {L({ id: 'Ikon berikut dipakai pada papan penunjuk arah', en: 'These icons are used on the directional signage' })}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {FASILITAS.map((f) => (
              <div
                key={L(f.nama)}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                  <f.ikon className="h-6 w-6" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-base font-bold text-slate-900">{L(f.nama)}</span>
                  <span className="mt-0.5 block text-sm font-medium leading-snug text-slate-500">{L(f.ket)}</span>
                </span>
              </div>
            ))}
          </div>

          <p className="mt-6 flex items-start gap-2.5 text-base font-medium leading-relaxed text-slate-600">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-cyan-700" />
            {L({
              id: 'Tidak menemukan lokasinya? Petugas informasi di lobi utama siap membantu, atau tanyakan pada petugas di nurse station lantai terkait.',
              en: 'Cannot find the location? The information officer in the main lobby is ready to help, or ask the staff at the relevant floor nurse station.',
            })}
          </p>
        </div>
      </div>
    </section>

      {/* =================== SECTION KESELAMATAN & EVAKUASI =================== */}
      <section id="keselamatan" className="scroll-mt-24 bg-slate-50 py-16">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h3 className="text-balance text-3xl font-extrabold leading-tight tracking-tight text-navy-900 lg:text-4xl">
            {L({ id: 'Fasilitas Keselamatan & Evakuasi', en: 'Safety & Evacuation Facilities' })}
          </h3>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Penanda evakuasi mengikuti standar K3 rumah sakit. Ikuti rambu dan arahan petugas saat alarm kebakaran berbunyi.',
              en: 'Evacuation signage follows hospital occupational-health standards. Follow the signs and staff instructions when the fire alarm sounds.',
            })}
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {KESELAMATAN.map((c, idx) => (
              <KartuInfo key={c.judul} {...c} i={idx} tema="red" />
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION PENGELOLAAN LINGKUNGAN ================= */}
      <section id="lingkungan" className="scroll-mt-24 bg-white py-16">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h3 className="text-balance text-3xl font-extrabold leading-tight tracking-tight text-navy-900 lg:text-4xl">
            {L({ id: 'Pengelolaan Lingkungan', en: 'Environmental Management' })}
          </h3>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Fasilitas back-of-house di Lantai G mengolah air bersih, limbah cair, dan sampah agar aman bagi lingkungan.',
              en: 'Back-of-house facilities on the Ground Floor treat clean water, wastewater and waste so they are safe for the environment.',
            })}
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {LINGKUNGAN.map((c, idx) => (
              <KartuInfo key={c.judul} {...c} i={idx} tema="emerald" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default NavigasiGedungWidgets;
