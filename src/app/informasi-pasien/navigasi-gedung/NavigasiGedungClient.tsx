'use client';

import React, { useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Building2,
  CircleCheck,
  Compass,
  Crown,
  Lock,
  MoveVertical,
  Search,
  ShieldAlert,
  X,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import type { Language } from '../../../types';
import type { Bilingual } from '../../../lib/i18n';
import NavigasiGedungWidgets from './NavigasiGedungWidgets';
import gedungId from '../../../data/gedung.json';
import gedungEn from '../../../data/en/gedung.json';
import heroNavigasi from '@/images/hero/tentang/hero-navigasi.jpg';
import heroNavigasiMobile from '@/images/hero/mobile-tentang/hero-navigasi.jpg';

/* ============================== MODEL DATA ==============================
 * gedung.json (ID) + en/gedung.json (EN) digabung menjadi satu model bilingual,
 * supaya pencarian tetap menemukukan nama ruangan dalam dua bahasa apa pun
 * bahasa aktif. `restricted`: false = publik, true = khusus staf,
 * 'skip' = lantai tidak dioperasikan (Lantai 4).
 * ====================================================================== */

type Restricted = boolean | 'skip';

type RawLantai = {
  lantai: string;
  nama_lantai: string;
  north_wing: string[];
  south_wing: string[];
  restricted: Restricted;
  /** Catatan keamanan opsional, mis. pemisahan sirkulasi udara & lift. */
  catatan_keamanan?: string;
};

type Sayap = 'north' | 'south';

type Lantai = {
  lantai: string;
  nama_lantai: Bilingual;
  restricted: Restricted;
  catatan?: Bilingual;
  /** Lantai VVIP: hanya dilayani lift VIP & tampil dengan chrome gold. */
  eksklusif: boolean;
};

type Ruangan = {
  lantai: string;
  namaLantai: Bilingual;
  sayap: Sayap;
  nama: Bilingual;
};

const ID_FLOORS = gedungId as unknown as RawLantai[];
const EN_FLOORS = gedungEn as unknown as RawLantai[];

/** Lantai eksklusif VVIP: tidak dilayani lift publik, akses terpisah total. */
const LANTAI_EKSKLUSIF = ['9'];

/** Padankan array ID & EN per indeks; entri EN yang hilang jatuh balik ke teks ID. */
const zip = (idArr: string[], enArr: string[] | undefined): Bilingual[] =>
  idArr.map((teks, i) => ({ id: teks, en: enArr?.[i] ?? teks }));

/** Isi satu sayap, tanpa entri penanda "-" (lantai yang tidak dioperasikan). */
const isiSayap = (f: RawLantai, sayap: Sayap, en?: RawLantai): Bilingual[] =>
  zip(f[sayap === 'north' ? 'north_wing' : 'south_wing'], en?.[sayap === 'north' ? 'north_wing' : 'south_wing']).filter(
    (b) => b.id.trim() !== '-',
  );

const LANTAI: Lantai[] = ID_FLOORS.map((f, i) => ({
  lantai: f.lantai,
  nama_lantai: { id: f.nama_lantai, en: EN_FLOORS[i]?.nama_lantai ?? f.nama_lantai },
  restricted: f.restricted,
  catatan: f.catatan_keamanan
    ? { id: f.catatan_keamanan, en: EN_FLOORS[i]?.catatan_keamanan ?? f.catatan_keamanan }
    : undefined,
  eksklusif: LANTAI_EKSKLUSIF.includes(f.lantai),
}));

/** Daftar ruangan datar: bahan pencarian dan sumber isi kartu sayap. */
const RUANGAN: Ruangan[] = ID_FLOORS.flatMap((f, i) => {
  const en = EN_FLOORS[i];
  const namaLantai: Bilingual = { id: f.nama_lantai, en: en?.nama_lantai ?? f.nama_lantai };
  return (['north', 'south'] as Sayap[]).flatMap((sayap) =>
    isiSayap(f, sayap, en).map((nama) => ({ lantai: f.lantai, namaLantai, sayap, nama })),
  );
});

/** Ruangan milik satu lantai pada satu sayap. */
const ruanganSayap = (lantai: string, sayap: Sayap): Bilingual[] =>
  RUANGAN.filter((r) => r.lantai === lantai && r.sayap === sayap).map((r) => r.nama);

const LABEL_SAYAP: Record<Sayap, Bilingual> = {
  north: { id: 'North Wing', en: 'North Wing' },
  south: { id: 'South Wing', en: 'South Wing' },
};

/* ============================ AKSES LANTAI ============================ */

/** Label akses untuk lantai terbatas (merah) pada badge & kartu. */
const AKSES: Bilingual = {
  id: 'Akses Terbatas (Khusus Staf)',
  en: 'Restricted Access (Staff Only)',
};

/** Lantai VVIP memakai label akses yang lebih tepat, tetap merah & terbatas. */
const AKSES_EKSKLUSIF: Bilingual = {
  id: 'Akses Terbatas (Pasien VVIP & Buteler)',
  en: 'Restricted Access (VVIP Patients & Butler)',
};

/* ============================== HALAMAN ============================== */

const NavigasiGedungClient: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (t: Bilingual) => t[lang];

  const [cari, setCari] = useState('');
  const [lantaiAktif, setLantaiAktif] = useState<string>('G');
  const [sorotan, setSorotan] = useState<string | null>(null);
  const areaRef = useRef<HTMLElement | null>(null);

  const q = cari.trim().toLowerCase();

  /** Hasil pencarian langsung atas seluruh ruangan (nama ID & EN dicocokkan). */
  const hasil = useMemo(() => {
    if (!q) return [] as Ruangan[];
    return RUANGAN.filter(
      (r) => r.nama.id.toLowerCase().includes(q) || r.nama.en.toLowerCase().includes(q),
    );
  }, [q]);

  const pilihDariHasil = (r: Ruangan) => {
    setLantaiAktif(r.lantai);
    setSorotan(`${r.lantai}-${r.sayap}-${r.nama.id}`);
    // Tunggu satu frame agar area konten selesai pindah lantai sebelum menggulir.
    requestAnimationFrame(() => {
      areaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const gantiLantai = (lantai: string) => {
    setLantaiAktif(lantai);
    setSorotan(null);
  };

  const aktif = LANTAI.find((f) => f.lantai === lantaiAktif) ?? LANTAI[0];
  const dibatasi = aktif.restricted === true;
  const eksklusif = aktif.eksklusif;
  const labelAkses = eksklusif ? AKSES_EKSKLUSIF : AKSES;

  return (
    <div className="bg-white text-slate-800">
      {/* ============ 1. HERO (BACKGROUND IMAGE + SCRIM, H1 + 1 KALIMAT) ============ */}
      <section className="relative flex h-[400px] items-center overflow-hidden">
        <Image src={heroNavigasiMobile} alt="" fill priority sizes="100vw" quality={90} className="object-cover object-right md:hidden" />
        <Image src={heroNavigasi} alt="" fill priority sizes="100vw" quality={90} className="hidden object-cover md:block" />
        {/* Scrim gelap tipis untuk kontras teks putih (bukan dark mode). */}
        <div className="absolute inset-0 bg-slate-900/60" />

        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h1 className="text-balance text-5xl font-extrabold leading-[1.05] tracking-tight text-white [text-shadow:0_2px_24px_rgba(15,23,42,0.55)] lg:text-6xl">
            {L({ id: 'Navigasi Gedung', en: 'Building Navigation' })}
          </h1>
          <p className="mt-5 max-w-2xl text-xl leading-relaxed text-slate-100 [text-shadow:0_1px_16px_rgba(15,23,42,0.55)]">
            {L({
              id: 'Temukan lokasi poliklinik, ruang perawatan, dan fasilitas umum dengan mudah.',
              en: 'Easily find the location of clinics, treatment rooms, and public facilities.',
            })}
          </p>
        </div>
      </section>

      {/* == 2. PANEL PENCARIAN + PEMILIH LANTAI (menumpuk di bawah hero) === */}
      <section className="relative z-20 -mt-20 lg:-mt-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl lg:p-8">
            {/* ---- Search bar ---- */}
            <label htmlFor="cari-ruangan" className="sr-only">
              {L({ id: 'Cari ruangan atau fasilitas', en: 'Search a room or facility' })}
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-slate-400" />
              <input
                id="cari-ruangan"
                type="text"
                value={cari}
                onChange={(e) => {
                  setCari(e.target.value);
                  setSorotan(null);
                }}
                placeholder={L({
                  id: 'Cari ruangan atau fasilitas (misal: Farmasi, ICU)...',
                  en: 'Search a room or facility (e.g. pharmacy, ICU)...',
                })}
                autoComplete="off"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-5 pl-14 pr-14 text-lg font-medium text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:border-cyan-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-cyan-100"
              />
              {cari ? (
                <button
                  type="button"
                  onClick={() => setCari('')}
                  aria-label={L({ id: 'Bersihkan pencarian', en: 'Clear search' })}
                  className="absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                >
                  <X className="h-5 w-5" />
                </button>
              ) : null}
            </div>

            {/* ---- Hasil pencarian (langsung, tanpa tombol submit) ---- */}
            <AnimatePresence initial={false}>
              {q ? (
                <motion.div
                  key="hasil"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.22 }}
                  className="overflow-hidden"
                >
                  <div className="mt-5 border-t border-slate-100 pt-5">
                    <p className="text-base font-bold text-navy-900">
                      {hasil.length > 0
                        ? L({
                            id: `${hasil.length} ruangan ditemukan untuk "${cari.trim()}"`,
                            en: `${hasil.length} rooms found for "${cari.trim()}"`,
                          })
                        : L({ id: 'Tidak ada ruangan yang cocok', en: 'No matching rooms' })}
                    </p>
                  </div>

                  {hasil.length > 0 ? (
                    <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                      {hasil.map((r) => (
                        <li key={`${r.lantai}-${r.sayap}-${r.nama.id}`}>
                          <button
                            type="button"
                            onClick={() => pilihDariHasil(r)}
                            className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                              sorotan === `${r.lantai}-${r.sayap}-${r.nama.id}`
                                ? 'border-cyan-300 bg-cyan-50 shadow-md'
                                : 'border-slate-200 bg-white hover:border-cyan-200'
                            }`}
                          >
                            <CircleCheck className="h-5 w-5 shrink-0 text-cyan-brand" />
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-base font-bold text-slate-900">{L(r.nama)}</span>
                              <span className="mt-0.5 block text-sm font-medium text-slate-500">
                                {L(r.namaLantai)} &middot; {L(LABEL_SAYAP[r.sayap])}
                              </span>
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                      <p className="text-base font-semibold text-slate-700">
                        {L({
                          id: 'Coba kata kunci lain, misalnya: UGD, Poli Anak, Farmasi, ICU, Hemodialisa, atau Lift.',
                          en: 'Try another keyword, for example: emergency, paediatric clinic, pharmacy, ICU, haemodialysis, or lift.',
                        })}
                      </p>
                      <button
                        type="button"
                        onClick={() => setCari('')}
                        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-navy-900 px-5 py-2.5 text-base font-bold text-white transition-colors hover:bg-navy-800"
                      >
                        {L({ id: 'Tampilkan semua lantai', en: 'Show all floors' })}
                      </button>
                    </div>
                  )}
                </motion.div>
              ) : null}
            </AnimatePresence>

            {/* ---- Deretan tombol lantai: panel kontrol sleek ---- */}
            <div className="mt-7 border-t border-slate-100 pt-7">
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-semibold text-slate-500">
                <span className="text-base font-extrabold tracking-tight text-navy-900">
                  {L({ id: 'Pilih Lantai', en: 'Choose a Floor' })}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan-600" />
                  {L({ id: 'Lantai aktif', en: 'Active floor' })}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                  {L({ id: 'Zona VVIP', en: 'VVIP zone' })}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full border border-dashed border-slate-400" />
                  {L({ id: 'Tidak dioperasikan', en: 'Not in operation' })}
                </span>
              </div>

              <div className="mt-5 flex flex-wrap gap-3 justify-center">
                {LANTAI.map((f) => {
                  const dilewati = f.restricted === 'skip';
                  const isSelected = f.lantai === lantaiAktif;

                  if (dilewati) {
                    return (
                      <div key={f.lantai} className="group relative">
                        <button
                          type="button"
                          disabled
                          aria-disabled="true"
                          aria-describedby="tooltip-lantai-4"
                          className="flex h-14 w-14 cursor-not-allowed items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white text-xl font-extrabold text-slate-300 line-through"
                        >
                          {f.lantai}
                        </button>
                        {/* Tooltip ringan: lantai 4 tidak tersedia */}
                        <span
                          role="tooltip"
                          id="tooltip-lantai-4"
                          className="pointer-events-none absolute -top-3 left-1/2 z-30 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-navy-900 opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
                        >
                          {L({ id: 'Lantai 4 tidak tersedia', en: 'Floor 4 is not available' })}
                        </span>
                      </div>
                    );
                  }

                  const aktifClass = f.eksklusif
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'bg-cyan-600 text-white shadow-md';

                  return (
                    <button
                      key={f.lantai}
                      type="button"
                      onClick={() => gantiLantai(f.lantai)}
                      aria-pressed={isSelected}
                      className={`relative flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-extrabold transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
                        isSelected
                          ? aktifClass
                          : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {f.lantai}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 3. AREA KONTEN LANTAI (NORTH vs SOUTH) ============ */}
      <section ref={areaRef} id="isi-lantai" className="scroll-mt-24 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-balance text-4xl font-extrabold leading-tight tracking-tight text-navy-900 lg:text-5xl">
              {L(aktif.nama_lantai)}
            </h2>

            <div className="flex flex-wrap items-center gap-3">
              {eksklusif ? (
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-bold text-amber-900">
                  <Crown className="h-4 w-4" />
                  {L({
                    id: `Lantai ${aktif.lantai} dilayani VIP Dedicated Lift`,
                    en: `Floor ${aktif.lantai} served by the VIP Dedicated Lift`,
                  })}
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700">
                  <MoveVertical className="h-4 w-4 text-cyan-700" />
                  {L({ id: `Lantai ${aktif.lantai} dilayani lift publik`, en: `Floor ${aktif.lantai} served by public lifts` })}
                </span>
              )}
              {dibatasi ? (
                <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-extrabold text-medical-darkRed">
                  <ShieldAlert className="h-4 w-4" />
                  {L(labelAkses)}
                </span>
              ) : null}
            </div>
          </div>

          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
            {eksklusif
              ? L({
                  id: 'Kawasan VVIP eksklusif. Akses hanya melalui VIP Dedicated Lift, terpisah total dari area publik dan pasien umum.',
                  en: 'An exclusive VVIP zone. Access is only via the VIP Dedicated Lift, fully separated from public areas and general patients.',
                })
              : dibatasi
                ? L({
                    id: 'Lantai ini berada di area terbatas. Masuk hanya dengan pengawalan petugas atau kartu akses staf.',
                    en: 'This floor sits inside a restricted area. Entry is only allowed with staff escort or an access card.',
                  })
                : L({
                    id: 'Setiap lantai dihubungkan koridor utama di bagian tengah. Ikuti penanda sayap berikut untuk menuju lokasi Anda.',
                    en: 'Every floor is linked by a central main corridor. Follow the wing markers below to reach your destination.',
                  })}
          </p>

          {/* Catatan keamanan lantai (mis. pemisahan sirkulasi udara Lt 8) */}
          {aktif.catatan ? (
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-cyan-200 bg-cyan-50/70 px-5 py-4">
              <Lock className="mt-0.5 h-5 w-5 shrink-0 text-cyan-800" />
              <p className="text-base leading-relaxed text-slate-700">
                <span className="font-extrabold text-navy-900">
                  {L({ id: 'Catatan Keamanan: ', en: 'Security Note: ' })}
                </span>
                {L(aktif.catatan)}
              </p>
            </div>
          ) : null}

          {/* Grid 2 kolom: North Wing vs South Wing */}
          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <KartuSayap
              sayap="north"
              lantai={aktif.lantai}
              dibatasi={dibatasi}
              labelAkses={labelAkses}
              premium={eksklusif}
              sorotan={sorotan}
              lang={lang}
            />
            <KartuSayap
              sayap="south"
              lantai={aktif.lantai}
              dibatasi={dibatasi}
              labelAkses={labelAkses}
              premium={eksklusif}
              sorotan={sorotan}
              lang={lang}
            />
          </div>
        </div>
      </section>

      {/* ===== 4. LIFT & FASILITAS UMUM (widget, tetap light theme) ===== */}
      <NavigasiGedungWidgets />
    </div>
  );
};

/* ============================== KOMPONEN ============================== */

type KartuSayapProps = {
  sayap: Sayap;
  lantai: string;
  dibatasi: boolean;
  /** Teks badge akses terbatas; berbeda untuk lantai VVIP. */
  labelAkses: Bilingual;
  /** Sayap VVIP: chrome gold + ikon Crown, tanpa mengubah struktur kartu. */
  premium?: boolean;
  sorotan: string | null;
  lang: Language;
};

/** Satu sayap gedung: daftar ruangan berikon CircleCheck cyan. */
const KartuSayap: React.FC<KartuSayapProps> = ({ sayap, lantai, dibatasi, labelAkses, premium, sorotan, lang }) => {
  const L = (t: Bilingual) => t[lang];
  const daftar = ruanganSayap(lantai, sayap);
  const utara = sayap === 'north';

  return (
    <div
      className={`rounded-3xl border p-8 shadow-sm ${
        premium
          ? 'border-amber-200 bg-gradient-to-br from-amber-50/70 via-white to-white'
          : 'border-slate-200 bg-white'
      }`}
    >
      <div className={`flex items-center justify-between gap-4 border-b pb-5 ${premium ? 'border-amber-100' : 'border-slate-100'}`}>
        <div className="flex items-center gap-4">
          <span
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
              premium
                ? 'bg-amber-50 text-amber-700'
                : utara
                ? 'bg-cyan-50 text-cyan-700'
                : 'bg-navy-900/5 text-navy-800'
            }`}
          >
            {premium ? <Crown className="h-6 w-6" /> : utara ? <Compass className="h-6 w-6" /> : <Building2 className="h-6 w-6" />}
          </span>
          <h3 className="text-2xl font-extrabold leading-tight tracking-tight text-navy-900">
            {L(LABEL_SAYAP[sayap])}
          </h3>
        </div>
        <span
          className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-bold tabular-nums ${
            premium ? 'bg-amber-50 text-amber-900' : 'bg-slate-50 text-slate-600'
          }`}
        >
          {daftar.length}
        </span>
      </div>

      {dibatasi ? (
        <div className="mt-5 flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <ShieldAlert className="h-5 w-5 shrink-0 text-medical-red" />
          <span className="text-sm font-extrabold text-medical-darkRed">{L(labelAkses)}</span>
        </div>
      ) : null}

      <ul className="mt-5 space-y-1">
        {daftar.map((ruang) => {
          const id = `${lantai}-${sayap}-${ruang.id}`;
          const isSorot = sorotan === id;
          return (
            <li
              key={id}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-200 ${
                isSorot
                  ? 'bg-cyan-50 ring-1 ring-cyan-300'
                  : premium
                  ? 'hover:bg-amber-50/60'
                  : 'hover:bg-slate-50'
              }`}
            >
              <CircleCheck className={`h-5 w-5 shrink-0 ${premium ? 'text-amber-500' : 'text-cyan-brand'}`} />
              <span className="text-lg font-semibold leading-snug text-slate-800">{L(ruang)}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NavigasiGedungClient;
