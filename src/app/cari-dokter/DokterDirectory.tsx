'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  CalendarDays,
  Check,
  ChevronDown,
  Info,
  MapPin,
  Search,
  Stethoscope,
  UserRound,
  X,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useUIModal } from '../../context/UIModalContext';
import dokterData from '../../data/dokter.json';
import { fotoDokter } from '../../data/dokterFoto';

interface Jadwal {
  hari: string;
  mulai: string;
  selesai: string;
}

interface Dokter {
  id: string;
  nama: string;
  spesialis: string;
  /** "Tetap" (full-time) atau "Mitra" (part-time). */
  status: string;
  /** Jabatan struktural; "" bila tidak ada. */
  jabatan: string;
  poli: string[];
  lokasi: string;
  pembayaran: string[];
  /** Catatan keterjaminan (rujukan/rider/eksklusi); "" bila tidak ada. */
  catatan_pembayaran: string;
  jadwal: Jadwal[];
}

const DOKTER = dokterData as Dokter[];

/** Hari Indonesia -> singkat (ID: "Sen", EN: "Mon") dan penuh untuk tabel detail. */
const HARI: Record<string, { id: string; en: string; fullEn: string }> = {
  Senin: { id: 'Sen', en: 'Mon', fullEn: 'Monday' },
  Selasa: { id: 'Sel', en: 'Tue', fullEn: 'Tuesday' },
  Rabu: { id: 'Rab', en: 'Wed', fullEn: 'Wednesday' },
  Kamis: { id: 'Kam', en: 'Thu', fullEn: 'Thursday' },
  Jumat: { id: 'Jum', en: 'Fri', fullEn: 'Friday' },
  Sabtu: { id: 'Sab', en: 'Sat', fullEn: 'Saturday' },
  Minggu: { id: 'Min', en: 'Sun', fullEn: 'Sunday' },
};

/** Padanan Inggris nama poli (data kini memakai nama pendek: "IGD", "Anak", ...). */
const POLI_EN: Record<string, string> = {
  IGD: 'Emergency',
  'Rawat Inap': 'Inpatient',
  ICU: 'ICU',
  NICU: 'NICU',
  'Poli Umum': 'General Clinic',
  MCU: 'Medical Check-Up',
  Anak: 'Pediatrics',
  'Tumbuh Kembang': 'Growth & Development',
  'Penyakit Dalam': 'Internal Medicine',
  Jantung: 'Cardiology',
  Saraf: 'Neurology',
  Paru: 'Pulmonology',
  Orthopedi: 'Orthopedics',
  'Kebidanan & Kandungan': 'Obstetrics & Gynecology',
  'Kamar Operasi': 'Operating Theatre',
  Radiologi: 'Radiology',
  'Bedah Umum': 'General Surgery',
  Laboratorium: 'Laboratory',
  'Kulit & Kelamin': 'Dermatology',
  THT: 'ENT',
  Mata: 'Ophthalmology',
  Urologi: 'Urology',
  Jiwa: 'Psychiatry',
  'Bedah Saraf': 'Neurosurgery',
  'Bedah Plastik': 'Plastic Surgery',
  'Rehabilitasi Medik': 'Rehabilitation Medicine',
  Fisioterapi: 'Physiotherapy',
  'Gizi Klinis': 'Clinical Nutrition',
  Kemoterapi: 'Chemotherapy',
  'Gigi Umum': 'General Dentistry',
  'Konservasi Gigi': 'Conservative Dentistry',
  'Bedah Mulut': 'Oral Surgery',
};

/** Nilai lokasi di data memakai istilah Indonesia (Lt, Klinik, Tindakan) — dipetakan per nilai penuh. */
const LOKASI_EN: Record<string, string> = {
  'Lt 7 North Wing': 'Level 7 North Wing',
  'Lt 5 North Wing': 'Level 5 North Wing',
  'Klinik Lt 7 North Wing · Tindakan Lt 3': 'Clinic Level 7 North Wing · Procedure Level 3',
  'Lt Ground IGD': 'Ground Floor ER',
  'Lt Ground IGD · Nurse Station Lt 2 / 7 / 8': 'Ground Floor ER · Nurse Station Level 2 / 7 / 8',
  'Nurse Station Lt 2 / 7 / 8 · Lt 3 North Wing': 'Nurse Station Level 2 / 7 / 8 · Level 3 North Wing',
  'Nurse Station Lt 5 / 6 · Lt 6 North Wing': 'Nurse Station Level 5 / 6 · Level 6 North Wing',
  'Lt 1 North Wing': 'Level 1 North Wing',
  'Nurse Station Lt 2 / 7 / 8': 'Nurse Station Level 2 / 7 / 8',
  'Lt 3 North Wing': 'Level 3 North Wing',
  'Lt G Radiologi': 'Ground Floor Radiology',
  'Lt 6 South Wing': 'Level 6 South Wing',
  'Lt G Laboratorium': 'Ground Floor Laboratory',
  'Lt 5 South Wing': 'Level 5 South Wing',
  'Lt 7 North Wing · Tindakan Day Care Lt 5': 'Level 7 North Wing · Day Care Procedure Level 5',
};

const labelLokasi = (lokasi: string, lang: Lang) => (lang === 'en' ? LOKASI_EN[lokasi] ?? lokasi : lokasi);

/** Padanan Inggris metode pembayaran (label "Umum" ikut PENJAMIN modal booking). */
const BAYAR_EN: Record<string, string> = {
  BPJS: 'BPJS',
  Umum: 'General',
  Asuransi: 'Insurance',
  Elective: 'Elective',
};

/** Padanan Inggris jabatan struktural. */
const JABATAN_EN: Record<string, string> = {
  'Direktur Medis': 'Medical Director',
  'Kepala Pelayanan Medis': 'Head of Medical Services',
  'Kepala Mutu & Akreditasi': 'Head of Quality & Accreditation',
  'Kepala Instalasi IGD': 'Head of Emergency Installation',
};

type Lang = 'id' | 'en';

/** Nilai filter; 'all' berarti tidak menyaring. */
interface Filter {
  q: string;
  poli: string;
  status: string;
}

const FILTER_KOSONG: Filter = { q: '', poli: 'all', status: 'all' };

/** Inisial untuk placeholder foto: "dr. Budi Siregar, Sp.B" -> "BS". */
const inisial = (nama: string): string =>
  nama
    .replace(/^(dr|drg)\.?\s+/i, '')
    .split(',')[0]
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');

/**
 * Foto dokter. Sumber = registry `dokterFoto` (file ASLI potongan 4:5 di
 * src/images/dokter/), bukan path publik lama — file publik itu masih versi
 * landscape 2752x1536 sehingga harus terpotong hebat oleh object-cover dan
 * hasilnya tampak blur/pecah. Bila id belum terdaftar (atau gagal muat),
 * tampilkan placeholder inisial — jangan pernah gambar pecah.
 */
const FotoDokter: React.FC<{ d: Dokter }> = ({ d }) => {
  const [gagal, setGagal] = useState(false);
  const foto = fotoDokter(d.id, '');
  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-100">
      {!foto || gagal ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-b from-slate-50 to-slate-200">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-2xl font-extrabold tracking-wide text-slate-400 shadow-sm ring-1 ring-slate-200">
            {inisial(d.nama)}
          </span>
          <UserRound className="h-5 w-5 text-slate-300" aria-hidden="true" />
        </div>
      ) : (
        <Image
          src={foto}
          alt={d.nama}
          fill
          /* Lebar kartu sebenarnya: 1 kolom di ponsel (~100vw), 2 kolom di tablet (~50vw),
             4 kolom di desktop (maks ~286px karena container max-w-7xl). */
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 300px"
          quality={100}
          className="h-full w-full object-cover object-center"
          loading="lazy"
          decoding="async"
          onError={() => setGagal(true)}
        />
      )}
    </div>
  );
};

/** Warna chip mini-pill per metode pembayaran (Matriks Keterjaminan). */
const WARNA_CHIP_BAYAR: Record<string, string> = {
  BPJS: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  Umum: 'border-blue-200 bg-blue-50 text-blue-700',
  Asuransi: 'border-indigo-200 bg-indigo-50 text-indigo-700',
};

/**
 * Ikon Info kecil dengan tooltip `catatan_pembayaran` (muncul saat hover atau klik).
 * Klik dihentikan dengan stopPropagation agar tidak ikut menutup overlay "tap anywhere".
 */
const InfoCatatan: React.FC<{ catatan: string; lang: Lang }> = ({ catatan, lang }) => {
  const [buka, setBuka] = useState(false);
  if (!catatan) return null;
  const ariaLabel = lang === 'en' ? 'Payment coverage note' : 'Catatan metode pembayaran';
  return (
    <span className="relative inline-flex">
      <button
        type="button"
        aria-label={ariaLabel}
        title={ariaLabel}
        onClick={(e) => {
          e.stopPropagation();
          setBuka((b) => !b);
        }}
        onMouseEnter={() => setBuka(true)}
        onMouseLeave={() => setBuka(false)}
        className="inline-flex h-6 w-6 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
      >
        <Info className="h-4 w-4" />
      </button>
      {buka && (
        <span
          role="tooltip"
          className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1.5 w-64 -translate-x-1/2 rounded-lg bg-navy-950 px-3 py-2 text-xs font-medium leading-relaxed text-white shadow-xl"
        >
          {catatan}
          <span aria-hidden="true" className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-navy-950" />
        </span>
      )}
    </span>
  );
};

/**
 * Dropdown custom (bukan native <select>) untuk filter single-bar: transparan,
 * tanpa border, tanpa label atas. Hanya mengubah nilai draft — penyaringan baru
 * jalan saat tombol "Terapkan".
 */
const DropdownFilter: React.FC<{
  /** Dipakai sebagai aria-label + teks fallback saat "Semua" terpilih. */
  label: string;
  nilai: string;
  opsi: Array<{ key: string; label: string }>;
  onChange: (key: string) => void;
  /** Kelas lebar/kolom dari induk single-bar, mis. "w-full lg:w-56". */
  className?: string;
  Icon?: React.ComponentType<{ className?: string }>;
}> = ({ label, nilai, opsi, onChange, className = '', Icon }) => {
  const [buka, setBuka] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  /* Tutup listbox saat klik terjadi di luar area dropdown. */
  useEffect(() => {
    if (!buka) return;
    const onDocMouseDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setBuka(false);
    };
    document.addEventListener('mousedown', onDocMouseDown);
    return () => document.removeEventListener('mousedown', onDocMouseDown);
  }, [buka]);

  const terpilih = opsi.find((o) => o.key === nilai);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={buka}
        onClick={() => setBuka((b) => !b)}
        className={`flex w-full items-center justify-between gap-2 rounded-full bg-transparent px-4 py-2.5 text-left text-sm font-medium text-slate-700 transition focus:outline-none focus:ring-2 ${
          buka ? 'bg-cyan-50/60 ring-2 ring-cyan-500/50' : 'hover:bg-slate-100/70'
        }`}
      >
        <span className="flex min-w-0 items-center gap-2">
          {Icon && <Icon className="h-4 w-4 shrink-0 text-slate-400" />}
          <span className="truncate">{terpilih?.label ?? label}</span>
        </span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${buka ? 'rotate-180' : ''}`} />
      </button>
      {buka && (
        <div
          role="listbox"
          aria-label={label}
          className="absolute z-50 mt-2 max-h-64 w-full overflow-y-auto rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl"
        >
          {opsi.map((o) => {
            const dipilih = o.key === nilai;
            return (
              <button
                key={o.key}
                type="button"
                role="option"
                aria-selected={dipilih}
                onClick={() => {
                  onChange(o.key);
                  setBuka(false);
                }}
                className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                  dipilih ? 'bg-cyan-50 font-semibold text-navy-950' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="truncate">{o.label}</span>
                {dipilih && <Check className="h-4 w-4 shrink-0 text-cyan-600" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

/** Satu kartu dokter: badge jabatan emas, spesialis bold, status di samping nama. */
const DokterCard: React.FC<{ d: Dokter; lang: Lang; labelPoli: (p: string) => string; onBooking: (id: string) => void; onDetail: (d: Dokter) => void }> = ({
  d,
  lang,
  labelPoli,
  onBooking,
  onDetail,
}) => {
  /* Status Tetap/Mitra tidak lagi tampil di kartu (nama bisa terpotong); hanya di overlay detail. */
  /* Jadwal paling awal saja yang tampil utuh; sisanya jadi hitungan miring. */
  const jadwalAwal = d.jadwal[0];

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl">
      <FotoDokter d={d} />

      <div className="flex flex-1 flex-col p-5">
        {/* Badge jabatan struktural — hanya untuk dokter dengan jabatan */}
        {d.jabatan && (
          <span className="mb-2 inline-flex w-max items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-amber-700 ring-1 ring-amber-200">
            {lang === 'en' ? JABATAN_EN[d.jabatan] ?? d.jabatan : d.jabatan}
          </span>
        )}

        <h2 className="text-lg font-bold leading-snug text-navy-950" title={d.nama}>
          <span className="line-clamp-2">{d.nama}</span>
        </h2>

        <div className="mt-3 space-y-1.5 text-base text-slate-600">
          {/* Spesialis dengan ikon stetoskop */}
          <p className="flex items-start gap-1.5">
            <Stethoscope className="mt-1 h-[18px] w-[18px] shrink-0 text-cyan-600" />
            <span>{lang === 'en' ? labelPoli(d.poli[0]) : d.spesialis}</span>
          </p>

          {/* Satu jadwal pertama utuh: "Senin 08:00 - 16:00"; sisanya "+N jadwal lainnya" miring */}
          {jadwalAwal && (
            <p className="flex items-start gap-1.5">
              <CalendarDays className="mt-1 h-[18px] w-[18px] shrink-0 text-cyan-600" />
              <span>
                {lang === 'en' ? HARI[jadwalAwal.hari]?.fullEn ?? jadwalAwal.hari : jadwalAwal.hari}{' '}
                {jadwalAwal.mulai} - {jadwalAwal.selesai}
              </span>
            </p>
          )}
          {d.jadwal.length > 1 && (
            <p className="pl-[27px] text-sm italic text-slate-400">
              +{d.jadwal.length - 1} {lang === 'en' ? 'other schedules' : 'jadwal lainnya'}
            </p>
          )}

          {/* Lokasi praktik dokter — cukup nama lantai/wing tanpa nama poli */}
          <p className="flex items-start gap-1.5">
            <MapPin className="mt-1 h-[18px] w-[18px] shrink-0 text-cyan-600" />
            <span>{labelLokasi(d.lokasi, lang)}</span>
          </p>
        </div>

        {/* Pemicu detail: ikon Info sejajar kolom ikon di kiri, tabel penuh di overlay */}
        <button
          type="button"
          onClick={() => onDetail(d)}
          className="mt-3 inline-flex w-max items-center gap-1.5 text-sm font-bold text-cyan-700 transition-colors hover:text-cyan-600"
        >
          <Info className="h-[18px] w-[18px] shrink-0 text-cyan-600" />
          {lang === 'en' ? 'View Full Schedule' : 'Lihat Detail Jadwal'}
        </button>

        {/* spacer fleksibel: mendorong tombol selalu rata bawah meski tinggi kartu berbeda */}
        <div className="mt-auto" aria-hidden="true" />
        <button
          type="button"
          onClick={() => onBooking(d.id)}
          className="mt-5 w-full rounded-xl bg-gradient-to-r from-cyan-brand to-medical-blue px-4 py-3 text-base font-bold text-white shadow-lg shadow-cyan-brand/30 transition-all hover:brightness-110"
        >
          {lang === 'en' ? 'Book Appointment' : 'Buat Janji'}
        </button>
      </div>
    </article>
  );
};

const DokterDirectory: React.FC = () => {
  const { language } = useLanguage();
  const lang: Lang = language === 'en' ? 'en' : 'id';
  const { openBookingModal } = useUIModal();

  /** Draft = pilihan sementara di dalam kotak filter; terapkan = nilai yang aktif menyaring. */
  const [draft, setDraft] = useState<Filter>(FILTER_KOSONG);
  const [terapkan, setTerapkan] = useState<Filter>(FILTER_KOSONG);
  /** Dokter yang detail jadwalnya dibuka di overlay layar penuh. */
  const [dokterDetail, setDokterDetail] = useState<Dokter | null>(null);

  /** Daftar poli tetap urut kemunculan data. */
  const daftarPoli = useMemo(() => Array.from(new Set(DOKTER.flatMap((d) => d.poli))), []);

  /* Penyaringan HANYA dari state terapkan — pilihan draft belum berpengaruh sampai "Terapkan Filter". */
  const hasil = useMemo(() => {
    const q = terapkan.q.trim().toLowerCase();
    return DOKTER.filter((d) => {
      if (terapkan.poli !== 'all' && !d.poli.includes(terapkan.poli)) return false;
      if (terapkan.status !== 'all' && d.status !== terapkan.status) return false;
      if (!q) return true;
      return [d.nama, d.spesialis, d.jabatan, d.poli.join(' '), d.poli.map((p) => POLI_EN[p] ?? '').join(' '), d.lokasi, LOKASI_EN[d.lokasi] ?? '']
        .join(' ')
        .toLowerCase()
        .includes(q);
    });
  }, [terapkan]);

  const filterAktif = terapkan.q.trim() !== '' || terapkan.poli !== 'all' || terapkan.status !== 'all';

  const terapkanFilter = () => setTerapkan({ ...draft });
  const resetFilter = () => {
    setDraft(FILTER_KOSONG);
    setTerapkan(FILTER_KOSONG);
  };

  const labelPoli = (poli: string) => (lang === 'en' ? POLI_EN[poli] ?? poli : poli);

  /* Kunci scroll halaman selama overlay detail jadwal tampil di layar. */
  useEffect(() => {
    if (!dokterDetail) return;
    const overflowSebelum = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflowSebelum;
    };
  }, [dokterDetail]);

  return (
    <main className="relative isolate min-h-[50vh] overflow-x-clip bg-[#f8fafc] pt-12 pb-16 sm:pt-16 sm:pb-20">
      {/* Latar berpola titik halus, berada di bawah seluruh konten */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle,rgba(100,116,139,0.10)_1px,transparent_1px)] [background-size:22px_22px]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ================= HERO EDITORIAL (rata kiri) ================= */}
        <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-navy-950 sm:text-5xl">
          {lang === 'en' ? 'Find a Doctor & Practice Schedules' : 'Cari Dokter & Jadwal Praktik'}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
          {lang === 'en'
            ? 'Find the right specialist among our 60 expert medical staff. Complete with practice schedules, room locations, and the ease of booking an appointment right in the palm of your hand.'
            : 'Temukan dokter spesialis yang tepat dari 60 tenaga medis ahli kami. Lengkap dengan jadwal praktik, lokasi ruangan, dan kemudahan membuat janji temu dalam satu genggaman.'}
        </p>

        {/* ================= FILTER SINGLE-BAR (glassmorphism) — dibungkus card ================= */}
        <div className="relative z-50 mt-10 mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex w-full flex-col items-center rounded-full border border-slate-200/80 bg-white/70 p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl lg:flex-row">
          {/* Search (kiri, flex-1) — ikon saja, tanpa label/border */}
          <div className="relative w-full lg:flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              id="cari-dokter"
              type="text"
              value={draft.q}
              onChange={(e) => setDraft((f) => ({ ...f, q: e.target.value }))}
              aria-label={lang === 'en' ? 'Search doctor' : 'Cari dokter'}
              placeholder={lang === 'en' ? 'Search doctor name or specialty...' : 'Cari nama dokter atau spesialisasi...'}
              className="w-full rounded-full bg-transparent py-2.5 pl-12 pr-4 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:bg-cyan-50/60 focus:ring-2 focus:ring-cyan-500/50"
            />
          </div>

          {/* Divider vertikal tipis (hanya desktop) */}
          <div aria-hidden="true" className="mx-1 hidden h-8 w-px shrink-0 bg-slate-300 lg:block" />

          {/* Dropdown Poli (tengah) */}
          <DropdownFilter
            className="w-full lg:w-56"
            Icon={Stethoscope}
            label={lang === 'en' ? 'All Clinics' : 'Semua Poli'}
            nilai={draft.poli}
            onChange={(key) => setDraft((f) => ({ ...f, poli: key }))}
            opsi={[
              { key: 'all', label: lang === 'en' ? 'All Clinics' : 'Semua Poli' },
              ...daftarPoli.map((p) => ({ key: p, label: labelPoli(p) })),
            ]}
          />

          {/* Divider vertikal tipis (hanya desktop) */}
          <div aria-hidden="true" className="mx-1 hidden h-8 w-px shrink-0 bg-slate-300 lg:block" />

          {/* Dropdown Jenis Dokter (kanan) */}
          <DropdownFilter
            className="w-full lg:w-56"
            Icon={UserRound}
            label={lang === 'en' ? 'All Doctors' : 'Semua Dokter'}
            nilai={draft.status}
            onChange={(key) => setDraft((f) => ({ ...f, status: key }))}
            opsi={[
              { key: 'all', label: lang === 'en' ? 'All Doctors' : 'Semua Dokter' },
              { key: 'Tetap', label: lang === 'en' ? 'Permanent Doctors' : 'Dokter Tetap' },
              { key: 'Mitra', label: lang === 'en' ? 'Visiting Doctors' : 'Dokter Mitra' },
            ]}
          />

          {/* Divider + tombol Terapkan (paling kanan) */}
          <div aria-hidden="true" className="mx-1 hidden h-8 w-px shrink-0 bg-slate-300 lg:block" />
          <button
            type="button"
            onClick={terapkanFilter}
            className="mt-2 w-full shrink-0 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-emerald-500/30 lg:mt-0 lg:w-auto"
          >
            {lang === 'en' ? 'Apply' : 'Terapkan'}
          </button>

          {/* Ikon X reset (hanya bila filter aktif) */}
          {filterAktif && (
            <button
              type="button"
              onClick={resetFilter}
              aria-label={lang === 'en' ? 'Reset filters' : 'Reset filter'}
              title={lang === 'en' ? 'Reset filters' : 'Reset filter'}
              className="ml-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          </div>

          {/* Jumlah hasil — di dalam card, rata bawah kanan */}
          <p className="mt-3 pr-1 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
            {lang === 'en' ? `${hasil.length} of ${DOKTER.length} doctors shown` : `Menampilkan ${hasil.length} dari ${DOKTER.length} dokter`}
          </p>
        </div>

        {/* ================= GRID KARTI DOKTER ================= */}
        {hasil.length === 0 ? (
          <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <Stethoscope className="h-10 w-10 text-slate-300" />
            <p className="mt-4 text-lg font-bold text-navy-950">
              {lang === 'en' ? 'No doctors match your search' : 'Dokter tidak ditemukan'}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {lang === 'en'
                ? 'Try another name, or tap the X button to clear the filters.'
                : 'Coba nama lain, atau tekan tombol X untuk membersihkan filter.'}
            </p>
          </div>
        ) : (
          <div className="relative z-10 mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {hasil.map((d) => (
              <DokterCard key={d.id} d={d} lang={lang} labelPoli={labelPoli} onBooking={(id) => openBookingModal({ id })} onDetail={setDokterDetail} />
            ))}
          </div>
        )}
      </div>

      {/* ============ OVERLAY DETAIL JADWAL — tap/klik di mana saja untuk menutup ============ */}
      {dokterDetail && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
          onClick={() => setDokterDetail(null)}
          className="fixed inset-0 z-[9998] flex cursor-pointer items-center justify-center bg-navy-950/60 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.95, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
          >
            {dokterDetail.jabatan && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-extrabold uppercase tracking-wide text-amber-700 ring-1 ring-amber-200">
                {lang === 'en' ? JABATAN_EN[dokterDetail.jabatan] ?? dokterDetail.jabatan : dokterDetail.jabatan}
              </span>
            )}
            <h2 className={`text-2xl font-extrabold leading-snug text-slate-600 ${dokterDetail.jabatan ? 'mt-2' : ''}`}>
              {dokterDetail.nama}
            </h2>
            {/* Spesialis digabung ke baris status; tanpa keterangan Full-time/Part-time */}
            <p className="mt-1.5 flex items-center gap-1.5 text-base font-semibold text-slate-500">
              <UserRound className="h-[18px] w-[18px] shrink-0 text-slate-400" />
              {lang === 'en'
                ? `${labelPoli(dokterDetail.poli[0])} / ${dokterDetail.status === 'Tetap' ? 'Permanent' : 'Visiting'} Doctor`
                : `${dokterDetail.spesialis} / Dokter ${dokterDetail.status}`}
            </p>
            {/* Lokasi cukup lantai/wing — nama poli sudah ada di baris atas */}
            <p className="mt-1 flex items-center gap-1.5 text-base font-semibold text-slate-500">
              <MapPin className="h-[18px] w-[18px] shrink-0 text-cyan-600" />
              {labelLokasi(dokterDetail.lokasi, lang)}
            </p>
            {/* Mini pills pembayaran + ikon info catatan (bila ada) */}
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
              {dokterDetail.pembayaran.map((p) => (
                <span
                  key={p}
                  className={`rounded-full border px-3 py-1 text-sm font-semibold ${WARNA_CHIP_BAYAR[p] ?? 'border-slate-200 bg-slate-50 text-slate-600'}`}
                >
                  {lang === 'en' ? BAYAR_EN[p] ?? p : p}
                </span>
              ))}
              <InfoCatatan catatan={dokterDetail.catatan_pembayaran} lang={lang} />
            </div>

            <table className="mt-4 w-full overflow-hidden rounded-xl border border-slate-200 text-left text-base">
              <thead>
                <tr className="bg-slate-50 text-slate-500">
                  <th className="px-3 py-2.5 font-semibold">{lang === 'en' ? 'Day' : 'Hari'}</th>
                  <th className="px-3 py-2.5 font-semibold">{lang === 'en' ? 'Start' : 'Jam Mulai'}</th>
                  <th className="px-3 py-2.5 font-semibold">{lang === 'en' ? 'End' : 'Jam Selesai'}</th>
                </tr>
              </thead>
              <tbody>
                {dokterDetail.jadwal.map((j) => (
                  <tr key={`${j.hari}-${j.mulai}`} className="border-t border-slate-100 text-slate-600">
                    <td className="px-3 py-2.5 font-semibold text-navy-950">
                      {lang === 'en' ? HARI[j.hari]?.fullEn ?? j.hari : j.hari}
                    </td>
                    <td className="px-3 py-2.5">{j.mulai}</td>
                    <td className="px-3 py-2.5">{j.selesai}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="mt-4 text-center text-sm font-semibold uppercase tracking-wide text-slate-400">
              {lang === 'en' ? 'Tap anywhere to close' : 'Tap di mana saja untuk menutup'}
            </p>
          </motion.div>
        </motion.div>
      )}
    </main>
  );
};

export default DokterDirectory;
