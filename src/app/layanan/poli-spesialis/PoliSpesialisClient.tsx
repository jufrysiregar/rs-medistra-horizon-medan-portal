'use client';

/**
 * Halaman "Poli Spesialis" — simulasi antrean real-time (murni UI, tanpa backend).
 * Sumber dokter & jadwal = dokter.json (satu sumber dengan /cari-dokter),
 * daftar poli & seed antrean = poli.json. Status Buka/Tutup dihitung dari
 * jam praktik dokter pada hari ini; nomor antrean berjalan +1 tiap 3 menit
 * selama poli Buka.
 */
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Accessibility,
  Apple,
  Baby,
  Bone,
  Brain,
  CheckCircle2,
  Droplet,
  Dumbbell,
  Ear,
  Eye,
  Flower2,
  Gem,
  Hand,
  Heart,
  HeartPulse,
  Pill,
  Puzzle,
  Scan,
  Search,
  Smile,
  SmilePlus,
  Sparkles,
  Stethoscope,
  Syringe,
  Wind,
  X,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import imgHeroPoli from '@/images/hero/fasilitas/pelayanan-poli.jpg';
import imgHeroPoliMobile from '@/images/hero/mobile-fasilitas/pelayanan-poli.jpg';
import poliData from '../../../data/poli.json';
import dokterData from '../../../data/dokter.json';

interface Poli {
  id: string;
  nama_poli: string;
  nama_poli_en: string;
  /** Nama komponen Lucide — dipetakan lewat ICON_MAP di bawah. */
  ikon: string;
  /** Kunci pencocok dengan array `poli` di dokter.json. */
  poli_kunci: string;
  kode_antrean: string | null;
  /** Nomor "sedang dilayani" awal saat simulasi dimulai; null bila tanpa antrean. */
  antrean_awal: number | null;
  butuh_antrean: boolean;
}

interface DokterMini {
  nama: string;
  poli: string[];
  jadwal: Array<{ hari: string; mulai: string; selesai: string }>;
}

const POLI_LIST = poliData as unknown as Poli[];
const DOKTER = dokterData as unknown as DokterMini[];

/** Index JS getDay() -> nama hari Indonesia (sama dengan kunci `hari` di dokter.json). */
const HARI_ID = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

/** Ikon per poli — hanya nama yang benar-benar dipakai di poli.json yang diimpor. */
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Accessibility,
  Apple,
  Baby,
  Bone,
  Brain,
  Droplet,
  Dumbbell,
  Ear,
  Eye,
  Flower2,
  Gem,
  Hand,
  Heart,
  HeartPulse,
  Pill,
  Puzzle,
  Scan,
  Smile,
  SmilePlus,
  Sparkles,
  Stethoscope,
  Syringe,
  Wind,
};

/** "08:30" -> 510 (menit sejak tengah malam) untuk perbandingan jam. */
const keMenit = (hhmm: string): number => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

/** Nomor antrean tampil: kode "A" + 16 -> "A-016". */
const fmtAntrean = (kode: string, n: number): string => `${kode}-${String(n).padStart(3, '0')}`;

/**
 * Palet pita gradien di bagian atas kartu (warna pastel -> putih).
 * Kelas ditulis utuh supaya ikut diproses Tailwind JIT.
 */
const PALET_AKSEN = [
  'from-cyan-200/80',
  'from-sky-200/80',
  'from-blue-200/80',
  'from-indigo-200/80',
  'from-violet-200/80',
  'from-fuchsia-200/80',
  'from-pink-200/80',
  'from-rose-200/80',
  'from-orange-200/80',
  'from-amber-200/80',
  'from-lime-200/80',
  'from-emerald-200/80',
  'from-teal-200/80',
] as const;

/** Indeks palet per poli, mengikuti urutan poli.json — kartu bertetangga dijamin beda warna. */
const INDEKS_AKSEN: Record<string, number> = Object.fromEntries(
  POLI_LIST.map((p, i) => [p.id, i % PALET_AKSEN.length])
);

/** Satu kartu poli: header ikon+nama, status, dokter hari ini, blok antrean/janji. */
interface InfoPoli {
  buka: boolean;
  dokterHariIni: Array<{ nama: string; jam: string }>;
}

const PoliCard: React.FC<{
  p: Poli;
  info: InfoPoli;
  nomor: number;
  lang: 'id' | 'en';
  onAmbilTiket: (p: Poli) => void;
}> = ({ p, info, nomor, lang, onAmbilTiket }) => {
  const L = (id: string, en: string) => (lang === 'en' ? en : id);
  const Icon = ICON_MAP[p.ikon] ?? Stethoscope;
  const aksen = PALET_AKSEN[INDEKS_AKSEN[p.id] ?? 0];
  const { buka, dokterHariIni } = info;

  return (
    <article className="relative isolate flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400">
      {/* Pita gradien warna di bagian atas kartu (-z-10 = di atas background, di bawah isi) */}
      <div aria-hidden="true" className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b ${aksen} to-transparent`} />
      <div className="flex items-start gap-3">
        <span className="shrink-0 rounded-xl bg-cyan-50 p-2.5 ring-1 ring-cyan-100">
          <Icon className="h-6 w-6 text-cyan-600" />
        </span>
        <h2 className="text-xl font-bold leading-snug text-slate-800">
          {lang === 'en' ? p.nama_poli_en : p.nama_poli}
        </h2>
      </div>

      {/* Indikator status real-time */}
      <p className="mt-4 flex items-center gap-2 text-sm font-bold">
        <span className={`h-2.5 w-2.5 rounded-full ${buka ? 'animate-pulse bg-emerald-500' : 'bg-slate-300'}`} />
        <span className={buka ? 'text-emerald-600' : 'text-slate-400'}>
          {buka ? L('Buka', 'Open') : L('Tutup', 'Closed')}
        </span>
      </p>

      {/* Dokter yang praktik hari ini + jamnya */}
      <div className="mt-3 space-y-1.5 text-sm text-slate-600">
        {dokterHariIni.length === 0 ? (
          <p className="italic">{L('Tidak ada praktik hari ini', 'No practice today')}</p>
        ) : (
          <>
            {dokterHariIni.slice(0, 2).map((d) => (
              <p key={d.nama} className="leading-snug">
                <span className="font-semibold text-slate-700">{d.nama}</span>
                {', '}
                {d.jam}
              </p>
            ))}
            {dokterHariIni.length > 2 && (
              <p className="text-xs font-semibold text-cyan-600">
                +{dokterHariIni.length - 2} {L('dokter lainnya', 'other doctors')}
              </p>
            )}
          </>
        )}
      </div>

      {/* Blok antrean / janji temu — pendorong ke bawah agar tombol sejajar */}
      <div className="mt-auto pt-5">
        {p.butuh_antrean ? (
          buka ? (
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {L('Sedang Dilayani:', 'Now Serving:')}
              </p>
              <p className="mt-1 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text font-extrabold text-3xl tabular-nums text-transparent">
                {fmtAntrean(p.kode_antrean ?? '-', nomor)}
              </p>
              <button
                type="button"
                onClick={() => onAmbilTiket(p)}
                className="mt-3 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/30 transition hover:brightness-110"
              >
                {L('Ambil Tiket Online', 'Take Online Ticket')}
              </button>
            </div>
          ) : (
            <button
              type="button"
              disabled
              className="w-full cursor-not-allowed rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-400"
            >
              {L('Ambil Tiket', 'Take Ticket')}
            </button>
          )
        ) : (
          <>
            {buka && (
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                {L('Layanan Berbasis Jadwal', 'Schedule-Based Service')}
              </p>
            )}
            <Link
              href="/cari-dokter"
              className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-center text-sm font-bold text-slate-700 shadow-md shadow-slate-200/60 transition hover:border-cyan-400 hover:text-cyan-700"
            >
              {L('Buat Janji Temu', 'Book Appointment')}
            </Link>
          </>
        )}
      </div>
    </article>
  );
};

const PoliSpesialisClient: React.FC = () => {
  const { language } = useLanguage();
  const lang: 'id' | 'en' = language === 'en' ? 'en' : 'id';
  const L = (id: string, en: string) => (lang === 'en' ? en : id);

  const [q, setQ] = useState('');
  /** null sampai efek pertama jalan — status baru dinilai setelah client mount (hindari mismatch SSR). */
  const [now, setNow] = useState<Date | null>(null);
  /** Nomor "sedang dilayani" per id poli; seed dari antrean_awal. */
  const [antrean, setAntrean] = useState<Record<string, number>>(() =>
    Object.fromEntries(
      POLI_LIST.filter((p) => p.antrean_awal != null).map((p) => [p.id, p.antrean_awal as number])
    )
  );
  const [tiket, setTiket] = useState<{ poli: Poli; nomor: string; estimasi: number } | null>(null);

  /* Jam real-time: refresh 30 detik cukup untuk perubahan status Buka/Tutup. */
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);

  /* Simulasi antrean: +1 tiap 3 menit HANYA untuk poli yang sedang Buka. */
  useEffect(() => {
    const t = setInterval(() => {
      const d = new Date();
      const hari = HARI_ID[d.getDay()];
      const menit = d.getHours() * 60 + d.getMinutes();
      setAntrean((prev) => {
        const next = { ...prev };
        POLI_LIST.forEach((p) => {
          if (!p.butuh_antrean) return;
          const buka = DOKTER.some(
            (dr) =>
              dr.poli.includes(p.poli_kunci) &&
              dr.jadwal.some((j) => j.hari === hari && keMenit(j.mulai) <= menit && menit <= keMenit(j.selesai))
          );
          if (buka) next[p.id] = (next[p.id] ?? 0) + 1;
        });
        return next;
      });
    }, 180_000);
    return () => clearInterval(t);
  }, []);

  /** Info buka/tutup + daftar dokter praktik hari ini, dihitung per render dari `now`. */
  const infoPoli = useMemo(() => {
    const map: Record<string, InfoPoli> = {};
    const hari = now ? HARI_ID[now.getDay()] : null;
    const menit = now ? now.getHours() * 60 + now.getMinutes() : -1;
    POLI_LIST.forEach((p) => {
      if (!hari) {
        map[p.id] = { buka: false, dokterHariIni: [] };
        return;
      }
      const dokterHariIni: InfoPoli['dokterHariIni'] = [];
      let buka = false;
      DOKTER.forEach((dr) => {
        if (!dr.poli.includes(p.poli_kunci)) return;
        const slots = dr.jadwal.filter((j) => j.hari === hari);
        if (slots.length === 0) return;
        dokterHariIni.push({ nama: dr.nama, jam: slots.map((s) => `${s.mulai} - ${s.selesai}`).join(', ') });
        if (slots.some((s) => keMenit(s.mulai) <= menit && menit <= keMenit(s.selesai))) buka = true;
      });
      map[p.id] = { buka, dokterHariIni };
    });
    return map;
  }, [now]);

  const hasil = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return POLI_LIST;
    return POLI_LIST.filter((p) => `${p.nama_poli} ${p.nama_poli_en}`.toLowerCase().includes(term));
  }, [q]);

  /** Tiket baru = nomor berjalan + 1; estimasi deterministik 10/15/20 menit. Angka berjalan TIDAK diubah. */
  const ambilTiket = (p: Poli) => {
    const berjalan = antrean[p.id] ?? 0;
    setTiket({
      poli: p,
      nomor: fmtAntrean(p.kode_antrean ?? '-', berjalan + 1),
      estimasi: (berjalan % 3 + 2) * 5,
    });
  };

  return (
    <main className="relative isolate min-h-screen overflow-x-clip bg-[#F8FAFC] pb-16 sm:pb-20">
      {/* Pola titik halus — kesan futuristik tapi tetap bersih */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ================= HERO — foto pelayanan-poli.jpg + scrim terang (tanpa dark mode) ================= */}
        <section className="relative -mx-4 overflow-hidden sm:-mx-6 lg:-mx-8">
          <div aria-hidden="true" className="absolute inset-0">
            <Image src={imgHeroPoliMobile} alt="" fill priority sizes="100vw" quality={90} className="object-cover object-right md:hidden" />
                        <Image src={imgHeroPoli} alt="" fill priority sizes="100vw" quality={90} className="hidden object-cover md:block" />
          </div>
          {/* Scrim: putih pekat hanya di sisi kiri (sampai ±45%), kanan 100% bening. */}
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-white from-20% via-white/70 to-transparent to-60%" />

          <div className="relative z-10 px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            <div className="max-w-4xl">
              <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl">
                {L('Poli Spesialis', 'Specialty Clinics')}
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-700">
                {L(
                  'Pantau status buka/tutup setiap poli secara real-time, lihat dokter yang praktik hari ini, dan ambil tiket antrean online tanpa mengantre di lobi.',
                  'Monitor each clinic open/closed status in real time, see which doctors practice today, and take an online queue ticket without lining up in the lobby.'
                )}
              </p>
            </div>
          </div>
        </section>

        {/* ================= SEARCH (di dalam card — mengikuti gaya /cari-dokter) ================= */}
        <div className="relative z-50 mb-8 mt-10 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full flex-col items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl lg:flex-row"
          >
            {/* Search (kiri, flex-1) — ikon saja, tanpa border sendiri */}
            <div className="relative w-full lg:flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                aria-label={L('Cari poli', 'Search clinic')}
                placeholder={L('Cari nama poli...', 'Search clinic name...')}
                className="w-full rounded-full bg-transparent py-2.5 pl-12 pr-4 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:bg-cyan-50/60 focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>

            {/* Divider vertikal tipis (hanya desktop) */}
            <div aria-hidden="true" className="mx-1 hidden h-8 w-px shrink-0 bg-slate-300 lg:block" />

            <button
              type="submit"
              className="w-full shrink-0 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-emerald-500/30 lg:w-auto"
            >
              {L('Cari', 'Search')}
            </button>
          </form>

          {/* Jumlah hasil — di dalam card, rata bawah kanan */}
          <p className="mt-3 pr-1 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
            {!now
              ? L('Memuat status...', 'Loading status...')
              : lang === 'en'
                ? `${hasil.length} of ${POLI_LIST.length} clinics shown`
                : `Menampilkan ${hasil.length} dari ${POLI_LIST.length} poli`}
          </p>
        </div>

        {/* ================= GRID KARTI POLI ================= */}
        {hasil.length === 0 ? (
          <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white/70 px-6 py-16 text-center">
            <p className="text-base font-semibold text-slate-700">
              {L('Poli tidak ditemukan', 'No clinic found')}
            </p>
            <p className="mt-1 text-sm text-slate-400">
              {L('Coba kata kunci lain.', 'Try another keyword.')}
            </p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {hasil.map((p) => (
              <PoliCard key={p.id} p={p} info={infoPoli[p.id]} nomor={antrean[p.id] ?? 0} lang={lang} onAmbilTiket={ambilTiket} />
            ))}
          </div>
        )}
      </div>

      {/* ================= MODAL TIKET SUKSES ================= */}
      {tiket && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-200/60 p-4 backdrop-blur-md"
          onClick={() => setTiket(null)}
        >
          <div
            className="relative w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-2xl shadow-slate-300/50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 ring-1 ring-emerald-100">
              <CheckCircle2 className="h-8 w-8 text-emerald-500" />
            </div>
            <h3 className="mt-4 text-xl font-extrabold text-slate-900">
              {L('Tiket Berhasil Dibuat', 'Ticket Created')}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              {lang === 'en' ? tiket.poli.nama_poli_en : tiket.poli.nama_poli}
            </p>
            <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {L('Nomor Antrean Anda', 'Your Queue Number')}
              </p>
              <p className="mt-1 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text font-extrabold text-4xl tabular-nums text-transparent">{tiket.nomor}</p>
              <p className="mt-2 text-sm font-semibold text-emerald-600">
                {L('Estimasi Tunggu', 'Estimated Wait')} ~{tiket.estimasi} {L('Menit', 'min')}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setTiket(null)}
              className="mt-5 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/30 transition hover:brightness-110"
            >
              {L('Tutup', 'Close')}
            </button>
            <button
              type="button"
              aria-label={L('Tutup', 'Close')}
              onClick={() => setTiket(null)}
              className="absolute right-4 top-4 rounded-full bg-slate-100 p-1.5 text-slate-500 transition hover:text-slate-900"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default PoliSpesialisClient;
