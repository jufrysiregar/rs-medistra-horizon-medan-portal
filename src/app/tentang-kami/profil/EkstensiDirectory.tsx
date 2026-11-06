'use client';

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Ambulance,
  BedDouble,
  Bell,
  Boxes,
  Coffee,
  Crown,
  Droplets,
  FileText,
  Gem,
  Headphones,
  Microscope,
  Pill,
  PhoneCall,
  ScanLine,
  Search,
  SearchCheck,
  Server,
  ShieldAlert,
  ShieldHalf,
  Shirt,
  Siren,
  Sparkles,
  Stethoscope,
  UserCog,
  UtensilsCrossed,
  Wallet,
  X,
  type LucideIcon,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import type { Language } from '../../../types';
import { tpObj, type Bilingual } from '../../../lib/i18n';

/**
 * DIREKTORI EKSTENSI TELEPON — grid kartu per kategori dengan pencarian langsung
 * dan chip filter cepat.
 *
 * Memuat lima kategori: layanan utama & darurat, poliklinik per lantai, farmasi
 * multi-lokasi, nurse station rawat inap, serta penunjang medis & fasilitas umum.
 * Nomor ekstensi ruangan kritis (ICU, NICU, kamar operasi, endoskopi, VK) sengaja
 * TIDAK ditampilkan di halaman Profil karena aksesnya dibatasi untuk staf internal.
 *
 * Label `lantai` tiap kartu mengikuti denah pada src/data/gedung.json: layanan utama,
 * penunjang medis, dan fasilitas umum berada di Lantai G; poliklinik & farmasi rawat
 * jalan di Lantai 1; rawat inap anak & fisioterapi di Lantai 5; NICU & bersalin di
 * Lantai 6; poli spesialis & rawat inap umum di Lantai 7; VIP & depo farmasi di
 * Lantai 8; dan suite VVIP di Lantai 9. Seluruh nomor berada di rentang 100-199.
 *
 * Komponen klien (bukan server) karena filter search butuh state React; bahasa aktif
 * dibaca lewat useLanguage() supaya hasil ikut berubah saat toggle ID/EN ditekan.
 */

type Ekstensi = {
  id: string;
  nama: Bilingual;
  /** Nomor ekstensi PBX, disimpan sebagai string agar bisa ikut dicocokkan pencarian. */
  ext: string;
  /** Label lantai tempat unit berada; sinkron dengan src/data/gedung.json. */
  lantai: Bilingual;
  /** Penjelasan singkat satu baris di bawah nama divisi. */
  ket: Bilingual;
  /** Ikon unit, tampil kecil di samping nama divisi. */
  ikon: LucideIcon;
  /** true = melayani 24 jam (tampil badge kecil di kartu). */
  siaga?: boolean;
};

type Kategori = {
  id: string;
  label: Bilingual;
  /** Label ringkas untuk chip filter, supaya muat satu baris. */
  chip: Bilingual;
  ikon: LucideIcon;
  /** Kelas warna tile ikon pada header kategori (bg-X-50 text-X-700). */
  aksen: string;
  /** Gradien garis bawah judul kategori (from-X-500 to-Y-500). */
  bar: string;
  items: Ekstensi[];
};

/** Label lantai bilingual: lt('G') -> Lantai G / Floor G. */
const lt = (n: string): Bilingual => ({ id: `Lantai ${n}`, en: `Floor ${n}` });

const KATEGORI: Kategori[] = [
  {
    id: 'utama',
    label: { id: 'Layanan Utama & Darurat', en: 'Core Services & Emergency' },
    chip: { id: 'Layanan Utama', en: 'Core Services' },
    ikon: Siren,
    aksen: 'bg-rose-50 text-rose-600',
    bar: 'from-rose-500 to-pink-500',
    items: [
      {
        id: 'operator-1',
        nama: { id: 'Operator 1', en: 'Operator 1' },
        ext: '100',
        lantai: lt('G'),
        ket: { id: 'Pusat pengalih seluruh ekstensi', en: 'Central switchboard for all extensions' },
        ikon: Headphones,
        siaga: true,
      },
      {
        id: 'operator-2',
        nama: { id: 'Operator 2', en: 'Operator 2' },
        ext: '102',
        lantai: lt('G'),
        ket: { id: 'Pengalih cadangan dan informasi umum', en: 'Backup switchboard and general information' },
        ikon: Headphones,
        siaga: true,
      },
      {
        id: 'igd',
        nama: { id: 'IGD (Triage)', en: 'Emergency (Triage)' },
        ext: '110',
        lantai: lt('G'),
        ket: { id: 'Triase dan tindakan kegawatdaruratan', en: 'Triage and emergency treatment' },
        ikon: Siren,
        siaga: true,
      },
      {
        id: 'ambulans',
        nama: { id: 'Ambulans', en: 'Ambulance' },
        ext: '112',
        lantai: lt('G'),
        ket: { id: 'Penjemputan pasien dan rujukan', en: 'Patient pickup and referral transport' },
        ikon: Ambulance,
        siaga: true,
      },
      {
        id: 'cs',
        nama: { id: 'Customer Care', en: 'Customer Care' },
        ext: '115',
        lantai: lt('G'),
        ket: { id: 'Informasi, janji temu dan pengaduan', en: 'Information, appointments and complaints' },
        ikon: Bell,
      },
      {
        id: 'security',
        nama: { id: 'Security / Keamanan', en: 'Security' },
        ext: '105',
        lantai: lt('G'),
        ket: { id: 'Pospol, CCTV dan ketertiban', en: 'Security post, CCTV and order' },
        ikon: ShieldHalf,
        siaga: true,
      },
    ],
  },
  {
    id: 'poli',
    label: { id: 'Poliklinik (Per Lantai)', en: 'Outpatient Clinics (Per Floor)' },
    chip: { id: 'Poli', en: 'Clinics' },
    ikon: Stethoscope,
    aksen: 'bg-cyan-50 text-cyan-700',
    bar: 'from-cyan-500 to-teal-500',
    items: [
      {
        id: 'poli-1',
        nama: { id: 'Poli Lt 1 (Umum & Gigi)', en: 'Clinic Floor 1 (General & Dental)' },
        ext: '121',
        lantai: lt('1'),
        ket: { id: 'Pendaftaran, poli umum dan gigi', en: 'Registration, general and dental clinics' },
        ikon: Stethoscope,
      },
      {
        id: 'poli-5',
        nama: { id: 'Poli Lt 5 (Anak & Tumbuh Kembang)', en: 'Clinic Floor 5 (Child & Development)' },
        ext: '145',
        lantai: lt('5'),
        ket: { id: 'Poli anak dan tumbuh kembang', en: 'Paediatric and growth development clinic' },
        ikon: Stethoscope,
      },
      {
        id: 'poli-7',
        nama: { id: 'Poli Lt 7 (Penyakit Dalam, Jantung, Saraf, dll)', en: 'Clinic Floor 7 (Internal Medicine, Cardiac, Neurology, etc.)' },
        ext: '172',
        lantai: lt('7'),
        ket: { id: 'Kawasan poli spesialis', en: 'Specialist clinic area' },
        ikon: Stethoscope,
      },
    ],
  },
  {
    id: 'farmasi',
    label: { id: 'Farmasi (Multi-Lokasi)', en: 'Pharmacy (Multi-Location)' },
    chip: { id: 'Farmasi', en: 'Pharmacy' },
    ikon: Pill,
    aksen: 'bg-emerald-50 text-emerald-700',
    bar: 'from-emerald-500 to-teal-500',
    items: [
      {
        id: 'farmasi-ugd',
        nama: { id: 'Farmasi UGD (Lt G)', en: 'Emergency Pharmacy (Ground)' },
        ext: '118',
        lantai: lt('G'),
        ket: { id: 'Layanan obat gawat darurat 24 jam', en: '24-hour emergency drug service' },
        ikon: Pill,
        siaga: true,
      },
      {
        id: 'farmasi-rj',
        nama: { id: 'Farmasi Rawat Jalan (Lt 1)', en: 'Outpatient Pharmacy (Floor 1)' },
        ext: '125',
        lantai: lt('1'),
        ket: { id: 'Peracikan resep pasien luar', en: 'Dispensing for outpatients' },
        ikon: Pill,
      },
      {
        id: 'farmasi-satelit',
        nama: { id: 'Farmasi Satelit (Lt 7)', en: 'Satellite Pharmacy (Floor 7)' },
        ext: '178',
        lantai: lt('7'),
        ket: { id: 'Satelit farmasi rawat inap umum', en: 'Satellite pharmacy for the general ward' },
        ikon: Pill,
      },
      {
        id: 'depo-farmasi',
        nama: { id: 'Depo Farmasi Pusat (Lt 8)', en: 'Central Pharmacy Depot (Floor 8)' },
        ext: '185',
        lantai: lt('8'),
        ket: { id: 'Penyimpanan dan distribusi obat', en: 'Drug storage and distribution' },
        ikon: Boxes,
      },
    ],
  },
  {
    id: 'rawat-inap',
    label: { id: 'Rawat Inap (Nurse Station)', en: 'Inpatient Care (Nurse Station)' },
    chip: { id: 'Rawat Inap', en: 'Inpatient' },
    ikon: BedDouble,
    aksen: 'bg-blue-50 text-blue-700',
    bar: 'from-blue-500 to-indigo-500',
    items: [
      {
        id: 'ns-2',
        nama: { id: 'Nurse Station Lt 2 (Reguler/KRIS)', en: 'Floor 2 Nurse Station (Regular/KRIS)' },
        ext: '130',
        lantai: lt('2'),
        ket: { id: 'Rawat inap reguler KRIS', en: 'Regular KRIS inpatient ward' },
        ikon: BedDouble,
      },
      {
        id: 'ns-5',
        nama: { id: 'Nurse Station Lt 5 (Rawat Inap Anak)', en: 'Floor 5 Nurse Station (Paediatric)' },
        ext: '150',
        lantai: lt('5'),
        ket: { id: 'Bangsal anak', en: 'Paediatric ward' },
        ikon: BedDouble,
      },
      {
        id: 'ns-6',
        nama: { id: 'Nurse Station Lt 6 (Ibu & Bayi)', en: 'Floor 6 Nurse Station (Mother & Baby)' },
        ext: '160',
        lantai: lt('6'),
        ket: { id: 'Rawat inap ibu dan bayi', en: 'Maternity and newborn ward' },
        ikon: BedDouble,
      },
      {
        id: 'ns-7',
        nama: { id: 'Nurse Station Lt 7 (Rawat Inap Umum)', en: 'Floor 7 Nurse Station (General)' },
        ext: '170',
        lantai: lt('7'),
        ket: { id: 'Rawat inap umum', en: 'General inpatient ward' },
        ikon: BedDouble,
      },
      {
        id: 'ns-8',
        nama: { id: 'Nurse Station Lt 8 (VIP Suite)', en: 'Floor 8 Nurse Station (VIP Suite)' },
        ext: '180',
        lantai: lt('8'),
        ket: { id: 'Rawat inap VIP', en: 'VIP inpatient ward' },
        ikon: Crown,
      },
      {
        id: 'ns-9',
        nama: { id: 'Nurse Station Lt 9 (VVIP)', en: 'Floor 9 Nurse Station (VVIP)' },
        ext: '190',
        lantai: lt('9'),
        ket: { id: 'Suite VVIP dan presidential', en: 'VVIP and presidential suites' },
        ikon: Gem,
      },
    ],
  },
  {
    id: 'penunjang',
    label: { id: 'Penunjang Medis & Fasilitas Umum', en: 'Medical Support & Public Facilities' },
    chip: { id: 'Penunjang Medis', en: 'Medical Support' },
    ikon: Microscope,
    aksen: 'bg-teal-50 text-teal-700',
    bar: 'from-teal-500 to-cyan-500',
    items: [
      {
        id: 'lab',
        nama: { id: 'Laboratorium Medis (Lt G)', en: 'Medical Laboratory (Ground)' },
        ext: '120',
        lantai: lt('G'),
        ket: { id: 'Sampel dan hasil tes 24 jam', en: 'Sampling and test results, 24 hours' },
        ikon: Microscope,
        siaga: true,
      },
      {
        id: 'radiologi',
        nama: { id: 'Radiologi (Lt G)', en: 'Radiology (Ground)' },
        ext: '122',
        lantai: lt('G'),
        ket: { id: 'X-Ray, CT Scan dan MRI', en: 'X-Ray, CT Scan and MRI' },
        ikon: ScanLine,
      },
      {
        id: 'bank-darah',
        nama: { id: 'Bank Darah (Lt G)', en: 'Blood Bank (Ground)' },
        ext: '124',
        lantai: lt('G'),
        ket: { id: 'Ketersediaan komponen darah', en: 'Blood component availability' },
        ikon: Droplets,
      },
      {
        id: 'gizi',
        nama: { id: 'Gizi / Kitchen (Lt G)', en: 'Dietary / Kitchen (Ground)' },
        ext: '135',
        lantai: lt('G'),
        ket: { id: 'Menu pasien dan diet khusus', en: 'Patient meals and special diets' },
        ikon: UtensilsCrossed,
      },
      {
        id: 'kantin',
        nama: { id: 'Kantin / Canteen (Lt G)', en: 'Canteen (Ground)' },
        ext: '136',
        lantai: lt('G'),
        ket: { id: 'Kafe pengunjung dan pantry staf', en: 'Visitor cafe and staff pantry' },
        ikon: Coffee,
      },
      {
        id: 'laundry',
        nama: { id: 'Laundry & Linen (Lt G)', en: 'Laundry & Linen (Ground)' },
        ext: '138',
        lantai: lt('G'),
        ket: { id: 'Linen pasien dan seragam staf', en: 'Patient linen and staff uniforms' },
        ikon: Shirt,
      },
      {
        id: 'kasir',
        nama: { id: 'Kasir & Keuangan (Lt 1)', en: 'Cashier & Billing (Floor 1)' },
        ext: '128',
        lantai: lt('1'),
        ket: { id: 'Pembayaran dan billing pasien', en: 'Patient payment and billing' },
        ikon: Wallet,
      },
      {
        id: 'rekam-medis',
        nama: { id: 'Rekam Medis (Lt 1)', en: 'Medical Records (Floor 1)' },
        ext: '129',
        lantai: lt('1'),
        ket: { id: 'Berkas pasien baru dan resume medis', en: 'New patient files and medical summaries' },
        ikon: FileText,
      },
      {
        id: 'it',
        nama: { id: 'IT Support (Lt G)', en: 'IT Support (Ground)' },
        ext: '108',
        lantai: lt('G'),
        ket: { id: 'SIMRS, jaringan dan perangkat', en: 'HIS, network and devices' },
        ikon: Server,
      },
      {
        id: 'hrd',
        nama: { id: 'HRD / Manajemen (Lt 8)', en: 'HRD / Management (Floor 8)' },
        ext: '188',
        lantai: lt('8'),
        ket: { id: 'Kepegawaian dan rekrutmen', en: 'Staffing and recruitment' },
        ikon: UserCog,
      },
    ],
  },
];

/** Total ekstensi yang dipublikasikan (dipakai untuk teks "menampilkan x dari y"). */
const TOTAL = KATEGORI.reduce((n, k) => n + k.items.length, 0);

/** Kartu satu ekstensi: band header bergradien berisi nomor Ext besar,
 *  badan kartu berisi nama divisi, catatan, lantai, dan label siaga. */
const EkstensiCard: React.FC<{
  e: Ekstensi;
  lang: Language;
  bar: string;
}> = ({ e, lang, bar }) => {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-2xl">
      <div className={`relative flex items-center bg-gradient-to-br ${bar} px-5 py-4`}>
        <div className="leading-none">
          <span className="block text-xs font-bold uppercase tracking-[0.25em] text-white/80">
            {tpObj(lang, { id: 'Ext', en: 'Ext' })}
          </span>
          <span className="mt-1 block text-4xl font-black tabular-nums tracking-tight text-white drop-shadow-sm">
            {e.ext}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p
          className="text-lg font-bold leading-snug tracking-tight text-slate-900"
          title={tpObj(lang, e.nama)}
        >
          {tpObj(lang, e.nama)}
        </p>
        <p className="mt-1.5 flex-1 text-base leading-relaxed text-slate-500">{tpObj(lang, e.ket)}</p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">
            {tpObj(lang, e.lantai)}
          </span>
          {e.siaga && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-600">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {tpObj(lang, { id: 'Siaga 24 Jam', en: '24/7 On Duty' })}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const EkstensiDirectory: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const [cari, setCari] = useState('');
  /** Kategori aktif pada chip filter; 'all' = tampilkan semua. */
  const [katAktif, setKatAktif] = useState<string>('all');

  const q = cari.trim().toLowerCase();

  /**
   * Penyaringan langsung (tanpa tombol submit): satu kartu cocok bila nama ID/EN,
   * nomor ekstensi, label lantai, catatan, atau judul kategorinya memuat kata kunci.
   * Chip kategori membatasi tampilan, dan kategori yang isinya kosong setelah filter
   * ikut disembunyikan agar grid tidak bolong.
   */
  const hasil = useMemo(
    () =>
      KATEGORI.filter((k) => katAktif === 'all' || k.id === katAktif)
        .map((k) => ({
          ...k,
          items: k.items.filter(
            (e) =>
              !q ||
              e.nama.id.toLowerCase().includes(q) ||
              e.nama.en.toLowerCase().includes(q) ||
              e.ket.id.toLowerCase().includes(q) ||
              e.ket.en.toLowerCase().includes(q) ||
              e.lantai.id.toLowerCase().includes(q) ||
              e.lantai.en.toLowerCase().includes(q) ||
              e.ext.includes(q) ||
              k.label.id.toLowerCase().includes(q) ||
              k.label.en.toLowerCase().includes(q),
          ),
        }))
        .filter((k) => k.items.length > 0),
    [q, katAktif],
  );

  const jumlah = hasil.reduce((n, k) => n + k.items.length, 0);
  const bersihkan = () => {
    setCari('');
    setKatAktif('all');
  };

  return (
    <div>
      {/* ------- TOOLBAR PENCARIAN + FILTER (panel premium) ------- */}
      <div className="mx-auto w-full max-w-4xl">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-4 shadow-sm sm:p-6">
          <label className="relative block">
            <span className="sr-only">
              {tpObj(lang, { id: 'Cari divisi atau nomor ekstensi', en: 'Search a division or extension number' })}
            </span>
            <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={cari}
              onChange={(e) => setCari(e.target.value)}
              placeholder={tpObj(lang, {
                id: 'Cari divisi, lantai, atau nomor ekstensi…',
                en: 'Search a division, floor, or extension number…',
              })}
              className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-14 pr-12 text-lg font-medium text-slate-800 shadow-sm transition-all placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-100"
            />
            {cari && (
              <button
                type="button"
                onClick={() => setCari('')}
                aria-label={tpObj(lang, { id: 'Hapus pencarian', en: 'Clear search' })}
                className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </label>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <FilterChip
              aktif={katAktif === 'all'}
              onClick={() => setKatAktif('all')}
              label={tpObj(lang, { id: 'Semua Kategori', en: 'All Categories' })}
            />
            {KATEGORI.map((k) => (
              <FilterChip
                key={k.id}
                aktif={katAktif === k.id}
                onClick={() => setKatAktif(k.id)}
                label={tpObj(lang, k.chip)}
              />
            ))}
          </div>
        </div>

        <p className="mt-4 text-center text-base font-semibold text-slate-500">
          {q || katAktif !== 'all'
            ? tpObj(lang, { id: `Menampilkan ${jumlah} dari ${TOTAL} ekstensi`, en: `Showing ${jumlah} of ${TOTAL} extensions` })
            : tpObj(lang, {
                id: `${TOTAL} ekstensi resmi dalam ${KATEGORI.length} kategori`,
                en: `${TOTAL} official extensions across ${KATEGORI.length} categories`,
              })}
        </p>
      </div>

      {/* ---------------- HASIL KOSONG ---------------- */}
      {jumlah === 0 ? (
        <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center rounded-3xl border border-dashed border-slate-300 bg-white px-8 py-14 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <Search className="h-6 w-6" />
          </span>
          <h3 className="mt-4 text-2xl font-extrabold text-slate-900">
            {tpObj(lang, { id: 'Ekstensi tidak ditemukan', en: 'Extension not found' })}
          </h3>
          <p className="mt-2 text-lg leading-relaxed text-slate-600">
            {tpObj(lang, {
              id: 'Coba kata kunci lain, atau hubungi Operator 1 pada Ext 100 untuk dialihkan.',
              en: 'Try another keyword, or call Operator 1 on Ext 100 to be transferred.',
            })}
          </p>
          <button
            type="button"
            onClick={bersihkan}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 px-6 py-3 text-lg font-bold text-white shadow-lg shadow-cyan-600/25 transition-all hover:brightness-110"
          >
            {tpObj(lang, { id: 'Tampilkan semua ekstensi', en: 'Show all extensions' })}
          </button>
        </div>
      ) : (
        /* ---------------- KATEGORI + GRID KARTU ---------------- */
        <motion.div
          key={katAktif}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-12 space-y-14"
        >
          {hasil.map((k) => {
            const IkonKat = k.ikon;
            return (
              <div key={k.id}>
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-sm ring-1 ring-inset ring-black/5 ${k.aksen}`}
                  >
                    <IkonKat className="h-6 w-6" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="truncate text-2xl font-extrabold tracking-tight text-slate-900">
                      {tpObj(lang, k.label)}
                    </h3>
                    <span className={`mt-1.5 block h-1 w-16 rounded-full bg-gradient-to-r ${k.bar}`} />
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {k.items.map((e) => (
                    <EkstensiCard key={e.id} e={e} lang={lang} bar={k.bar} />
                  ))}
                </div>
              </div>
            );
          })}
        </motion.div>
      )}

      {/* ---------------- INFORMASI LAINNYA ---------------- */}
      <div className="mt-14 rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm lg:p-8">
        <h3 className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-slate-900">
          <Sparkles className="h-5 w-5 text-cyan-600" />
          {tpObj(lang, { id: 'Informasi Lainnya', en: 'Other Information' })}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-slate-600">
          {tpObj(lang, {
            id: 'Direktori ini memuat nomor ekstensi resmi untuk layanan utama & darurat, poliklinik, farmasi, nurse station rawat inap, serta penunjang medis & fasilitas umum. Gunakan kolom pencarian atau tombol kategori di atas untuk menemukan unit dengan cepat sesuai lantai pada denah gedung.',
            en: 'This directory lists the official extension numbers for core & emergency services, outpatient clinics, pharmacy, inpatient nurse stations, and medical support & public facilities. Use the search box or the category buttons above to quickly find a unit by its floor on the building plan.',
          })}
        </p>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              ikon: SearchCheck,
              judul: { id: 'Cara Mencari', en: 'How to Search' },
              ket: {
                id: 'Ketik nama divisi, lantai, atau nomor ekstensi pada kolom pencarian. Setiap kartu menampilkan lantai sesuai denah gedung, dan label "Siaga 24 Jam" menandai unit yang selalu berjaga.',
                en: 'Type a division, floor, or extension number in the search box. Every card shows its floor per the building plan, and the "24/7 On Duty" label marks units that are always staffed.',
              },
            },
            {
              ikon: PhoneCall,
              judul: { id: 'Janji Temu & Darurat', en: 'Appointments & Emergency' },
              ket: {
                id: 'Untuk membuat janji dengan dokter, hubungi Customer Care pada Ext 115. Untuk keadaan darurat, langsung hubungi IGD pada Ext 110 yang buka 24 jam.',
                en: 'To book a doctor appointment, call Customer Care on Ext 115. For emergencies, contact the Emergency Unit (IGD) directly on Ext 110, open 24 hours.',
              },
            },
            {
              ikon: ShieldAlert,
              judul: { id: 'Catatan Internal', en: 'Internal Note' },
              ket: {
                id: 'Nomor ekstensi ruangan kritis (ICU, NICU, kamar operasi, endoskopi, VK) dan ruangan dokter pribadi tidak dipublikasikan karena aksesnya dibatasi untuk staf berwenang.',
                en: 'Extension numbers for critical rooms (ICU, NICU, operating theatre, endoscopy, delivery room) and private doctor rooms are not published because access is restricted to authorised staff.',
              },
            },
          ].map((it) => {
            const Ikon = it.ikon;
            return (
              <div key={it.judul.id} className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                  <Ikon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-base font-extrabold tracking-tight text-slate-900">{tpObj(lang, it.judul)}</p>
                  <p className="mt-1 text-base leading-relaxed text-slate-600">{tpObj(lang, it.ket)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/** Chip filter satu kategori (atau 'Semua'). */
const FilterChip: React.FC<{
  aktif: boolean;
  onClick: () => void;
  label: string;
}> = ({ aktif, onClick, label }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={aktif}
    className={`inline-flex h-11 items-center whitespace-nowrap rounded-full border px-5 text-base font-bold transition-all duration-200 ${
      aktif
        ? 'border-transparent bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-md shadow-cyan-600/20'
        : 'border-slate-200 bg-white text-slate-600 hover:-translate-y-0.5 hover:border-cyan-300 hover:text-cyan-800 hover:shadow-sm'
    }`}
  >
    {label}
  </button>
);

export default EkstensiDirectory;
