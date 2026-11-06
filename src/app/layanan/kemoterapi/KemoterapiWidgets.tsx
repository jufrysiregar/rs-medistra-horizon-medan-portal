'use client';

import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CalendarCheck,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  FileText,
  Info,
  RotateCcw,
  Send,
  Users,
  X,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import type { Language } from '../../../types';

/** Sepasang teks ID/EN; dipilih dengan [lang] supaya semua data tinggal di satu tempat. */
type Teks = { id: string; en: string };

/* ------------------------------ DATA WIDGET ------------------------------ */

/** Panduan mandiri persiapan di rumah dibagikan sebagai PDF statis (public/files). */
const PDF_PANDUAN = '/files/panduan-kemoterapi.pdf';

/** Isi ringkas panduan, supaya keluarga tahu apa yang akan mereka unduh. */
const ISI_PANDUAN: Teks[] = [
  { id: 'Simpan obat oral dengan benar dan jangan hentikan tanpa izin DPJP', en: 'Store oral medicine properly and never stop it without the doctor\'s approval' },
  { id: 'Skala mual: kapan minum obat, kapan telepon unit', en: 'Nausea scale: when to take medicine, when to call the unit' },
  { id: 'Perawatan mulut, tangan, dan lokasi port/PICC di rumah', en: 'Mouth, hand and port/PICC site care at home' },
  { id: 'Tanda bahaya yang wajib ke IGD: demam, sesak, perdarahan', en: 'Danger signs that mean the ER: fever, breathlessness, bleeding' },
];

/** Pilihan terapi pada form reservasi; selaras dengan bagian Jenis Terapi Sistemik. */
const TERAPI_OPTS: Teks[] = [
  { id: 'Kemoterapi Rawat Jalan (Daycare)', en: 'Outpatient Chemotherapy (Daycare)' },
  { id: 'Kemoterapi Rawat Inap', en: 'Inpatient Chemotherapy' },
  { id: 'Terapi Target (Targeted Therapy)', en: 'Targeted Therapy' },
  { id: 'Imunoterapi / Terapi Hormonal', en: 'Immunotherapy / Hormonal Therapy' },
  { id: 'Belum ditentukan, minta rekomendasi DPJP', en: 'Not decided yet, ask the doctor for a recommendation' },
];

/** Daycare berjalan dua blok dalam satu hari (08.00-18.00). */
const SESI: { kode: string; nama: Teks; jam: string }[] = [
  { kode: 'pagi', nama: { id: 'Sesi Pagi', en: 'Morning session' }, jam: '08.00 - 13.00' },
  { kode: 'sore', nama: { id: 'Sesi Siang-Sore', en: 'Midday session' }, jam: '13.00 - 18.00' },
];

/** Header satu minggu, dimulai dari Senin seperti kalender di Indonesia. */
const NAMA_HARI: Teks[] = [
  { id: 'Sen', en: 'Mon' },
  { id: 'Sel', en: 'Tue' },
  { id: 'Rab', en: 'Wed' },
  { id: 'Kam', en: 'Thu' },
  { id: 'Jum', en: 'Fri' },
  { id: 'Sab', en: 'Sat' },
  { id: 'Min', en: 'Sun' },
];

const INTERVAL: { nilai: number; label: Teks }[] = [
  { nilai: 1, label: { id: 'Tiap minggu (7 hari)', en: 'Every week (7 days)' } },
  { nilai: 2, label: { id: 'Tiap 2 minggu (14 hari)', en: 'Every 2 weeks (14 days)' } },
  { nilai: 3, label: { id: 'Tiap 3 minggu (21 hari)', en: 'Every 3 weeks (21 days)' } },
  { nilai: 4, label: { id: 'Tiap 4 minggu (28 hari)', en: 'Every 4 weeks (28 days)' } },
];

/* --------------------------------- PANEL --------------------------------- */

/**
 * PANEL KEMOTERAPI — satu panel tiga kolom: kalkulator kalender siklus, unduh
 * panduan mandiri di rumah, dan pengajuan reservasi daycare lewat modal terang.
 * Semua dihitung di peramban; tidak ada tanggal default dari server supaya
 * render awal di HTML sama dengan hasil setelah hidrasi.
 */
const KemoterapiWidgets: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (teks: Teks) => teks[lang];

  /* ----------------------- 1. KALENDER SIKLUS ----------------------- */
  const [tanggalMulai, setTanggalMulai] = useState('');
  const [intervalMinggu, setIntervalMinggu] = useState(3);
  const [jumlahSiklus, setJumlahSiklus] = useState(6);
  const [geserBulan, setGeserBulan] = useState(0);

  /** Deretan tanggal siklus, dihitung dari input pasien (bukan waktu server). */
  const jadwal = useMemo(() => {
    if (!tanggalMulai) return [] as Date[];
    const awal = new Date(`${tanggalMulai}T00:00:00`);
    if (Number.isNaN(awal.getTime())) return [] as Date[];
    return Array.from({ length: jumlahSiklus }, (_, i) => {
      const d = new Date(awal);
      d.setDate(awal.getDate() + i * intervalMinggu * 7);
      return d;
    });
  }, [tanggalMulai, intervalMinggu, jumlahSiklus]);

  /** Kotak kalender satu bulan + penanda nomor siklus di dalamnya. */
  const kalender = useMemo(() => {
    if (!jadwal.length) return null;
    const bulan = new Date(jadwal[0].getFullYear(), jadwal[0].getMonth() + geserBulan, 1);
    const y = bulan.getFullYear();
    const m = bulan.getMonth();
    const cells: { hari: number | null; siklus: number | null }[] = [];
    const kunci = (d: Date) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    const peta = new Map<string, number>();
    jadwal.forEach((d, i) => peta.set(kunci(d), i + 1));
    for (let i = 0; i < (bulan.getDay() + 6) % 7; i++) cells.push({ hari: null, siklus: null });
    for (let d = 1; d <= new Date(y, m + 1, 0).getDate(); d++) {
      cells.push({ hari: d, siklus: peta.get(`${y}-${m}-${d}`) ?? null });
    }
    return {
      label: bulan.toLocaleDateString(lang === 'en' ? 'en-GB' : 'id-ID', { month: 'long', year: 'numeric' }),
      cells,
      terlihat: jadwal.filter((d) => d.getFullYear() === y && d.getMonth() === m).length,
    };
  }, [jadwal, geserBulan, lang]);

  const tanggalPanjang = (d: Date) =>
    d.toLocaleDateString(lang === 'en' ? 'en-GB' : 'id-ID', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    });

  /* ------------------------ 2. MODAL RESERVASI ------------------------ */
  const [buka, setBuka] = useState(false);
  const [nama, setNama] = useState('');
  const [wa, setWa] = useState('');
  const [rm, setRm] = useState('');
  const [terapiIdx, setTerapiIdx] = useState<string>('');
  const [tanggal, setTanggal] = useState('');
  const [sesi, setSesi] = useState<string>('');
  const [pendamping, setPendamping] = useState(false);
  const [catatan, setCatatan] = useState('');
  const [galat, setGalat] = useState('');
  const [terkirim, setTerkirim] = useState(false);

  const sesiTerpilih = SESI.find((s) => s.kode === sesi);

  const kirim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim()) {
      setGalat(L({ id: 'Nama pasien belum diisi.', en: 'The patient name is not filled in.' }));
      return;
    }
    if (wa.trim().replace(/\D/g, '').length < 9) {
      setGalat(L({ id: 'Nomor WhatsApp belum benar.', en: 'The WhatsApp number is not valid yet.' }));
      return;
    }
    if (terapiIdx === '') {
      setGalat(L({ id: 'Pilih jenis terapi lebih dulu.', en: 'Choose the therapy type first.' }));
      return;
    }
    if (!tanggal) {
      setGalat(L({ id: 'Tanggal tindakan belum dipilih.', en: 'The treatment date is not chosen yet.' }));
      return;
    }
    const chosen = new Date(`${tanggal}T00:00:00`);
    if (Number.isNaN(chosen.getTime())) {
      setGalat(L({ id: 'Tanggal tidak valid.', en: 'The date is not valid.' }));
      return;
    }
    if (chosen.getDay() === 0) {
      setGalat(L({
        id: 'Daycare berjalan Senin sampai Sabtu. Pilih tanggal selain Minggu.',
        en: 'The daycare runs Monday to Saturday. Please pick a day other than Sunday.',
      }));
      return;
    }
    if (!sesi) {
      setGalat(L({ id: 'Pilih sesi lebih dulu.', en: 'Choose a session first.' }));
      return;
    }
    setGalat('');
    setTerkirim(true);
  };

  const reset = () => {
    setNama('');
    setWa('');
    setRm('');
    setTerapiIdx('');
    setTanggal('');
    setSesi('');
    setPendamping(false);
    setCatatan('');
    setGalat('');
    setTerkirim(false);
  };

  const tutupModal = () => {
    setBuka(false);
    window.setTimeout(() => setTerkirim(false), 200);
  };

  const inputCls =
    'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20';
  const labelCls = 'block text-sm font-extrabold uppercase tracking-wide text-slate-500';

  return (
    <section id="mandiri-kemo" className="scroll-mt-28 bg-white py-20">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
          {L({ id: 'Alat Bantu Mandiri untuk Pasien & Keluarga', en: 'Self-Service Tools for Patients & Families' })}
        </h2>
        <div className="mt-5 h-px w-full bg-slate-200" />
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
          {L({
            id: 'Hitung perkiraan tanggal siklus berikutnya, unduh panduan persiapan di rumah, dan ajukan reservasi kursi daycare. Ketiganya berjalan langsung di halaman ini.',
            en: 'Estimate the next cycle dates, download the home preparation guide, and request a daycare chair. All three run right on this page.',
          })}
        </p>

        {/* ================= PANEL BESAR 3 KOLOM ================= */}
        <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-lg sm:p-10">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* ---------------- KOLOM 1: KALENDER SIKLUS ---------------- */}
            <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-violet-100 bg-violet-50 text-violet-700">
                <CalendarDays className="h-7 w-7" />
              </span>
              <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-900">
                {L({ id: 'Kalender Siklus Kemoterapi', en: 'Chemotherapy Cycle Calendar' })}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {L({
                  id: 'Masukkan tanggal siklus pertama dan interval regimen Anda. Kotak kalender akan menandai tanggal pemberian berikutnya sebagai perkiraan jadwal.',
                  en: 'Enter your first cycle date and the interval of your regimen. The calendar marks the next administration dates as a schedule estimate.',
                })}
              </p>

              <div className="mt-6 space-y-4">
                <div>
                  <label className={labelCls} htmlFor="kemo-mulai">
                    {L({ id: 'Tanggal siklus pertama', en: 'First cycle date' })}
                  </label>
                  <input
                    id="kemo-mulai"
                    type="date"
                    className={`${inputCls} mt-2`}
                    value={tanggalMulai}
                    onChange={(e) => {
                      setTanggalMulai(e.target.value);
                      setGeserBulan(0);
                    }}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelCls} htmlFor="kemo-interval">
                      {L({ id: 'Interval siklus', en: 'Cycle interval' })}
                    </label>
                    <select
                      id="kemo-interval"
                      className={`${inputCls} mt-2`}
                      value={String(intervalMinggu)}
                      onChange={(e) => setIntervalMinggu(Number(e.target.value))}
                    >
                      {INTERVAL.map((it) => (
                        <option key={it.nilai} value={it.nilai}>{L(it.label)}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="kemo-jumlah">
                      {L({ id: 'Jumlah siklus', en: 'Number of cycles' })}
                    </label>
                    <select
                      id="kemo-jumlah"
                      className={`${inputCls} mt-2`}
                      value={String(jumlahSiklus)}
                      onChange={(e) => setJumlahSiklus(Number(e.target.value))}
                    >
                      {[2, 4, 6, 8].map((n) => (
                        <option key={n} value={n}>
                          {L({ id: `${n} siklus`, en: `${n} cycles` })}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {kalender ? (
                <div className="mt-6">
                  <div className="flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setGeserBulan((v) => v - 1)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-colors hover:border-violet-300 hover:text-violet-700"
                      aria-label={L({ id: 'Bulan sebelumnya', en: 'Previous month' })}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <p className="text-lg font-extrabold tracking-tight text-slate-900">{kalender.label}</p>
                    <button
                      type="button"
                      onClick={() => setGeserBulan((v) => v + 1)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-colors hover:border-violet-300 hover:text-violet-700"
                      aria-label={L({ id: 'Bulan berikutnya', en: 'Next month' })}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="mt-4 grid grid-cols-7 gap-1">
                    {NAMA_HARI.map((h) => (
                      <div key={h.id} className="pb-1 text-center text-xs font-extrabold uppercase tracking-wide text-slate-400">
                        {L(h)}
                      </div>
                    ))}
                    {kalender.cells.map((c, idx) =>
                      c.hari === null ? (
                        <div key={`kosong-${idx}`} aria-hidden="true" className="h-12" />
                      ) : (
                        <div
                          key={`hari-${idx}`}
                          className={`flex h-12 flex-col items-center justify-center rounded-xl border text-sm font-bold ${
                            c.siklus
                              ? 'border-violet-600 bg-violet-600 text-white shadow-sm'
                              : 'border-slate-100 bg-white text-slate-600'
                          }`}
                        >
                          <span>{c.hari}</span>
                          {c.siklus && (
                            <span className="text-[10px] font-extrabold uppercase leading-none">
                              {L({ id: `S${c.siklus}`, en: `C${c.siklus}` })}
                            </span>
                          )}
                        </div>
                      ),
                    )}
                  </div>

                  <p className="mt-3 flex items-start gap-2 text-sm font-semibold leading-relaxed text-slate-600">
                    <span className="mt-1 inline-block h-3 w-3 shrink-0 rounded bg-violet-600" />
                    {L({
                      id: 'Kotak violet adalah tanggal pemberian obat. Jadwal resmi tetap dikonfirmasi DPJP dan perawat unit.',
                      en: 'The violet boxes are administration dates. The official schedule is still confirmed by the doctor and the unit nurse.',
                    })}
                  </p>

                  <ol className="mt-5 space-y-2">
                    {jadwal.map((d, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5"
                      >
                        <span className="text-sm font-extrabold uppercase tracking-wide text-violet-700">
                          {L({ id: `Siklus ${i + 1}`, en: `Cycle ${i + 1}` })}
                        </span>
                        <span className="text-right text-sm font-bold text-slate-800">{tanggalPanjang(d)}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ) : (
                <p className="mt-6 flex items-start gap-2.5 rounded-2xl border border-violet-200 bg-violet-50 p-5 text-base leading-relaxed text-violet-900">
                  <CalendarCheck className="mt-0.5 h-5 w-5 shrink-0 text-violet-700" />
                  {L({
                    id: 'Belum ada jadwal yang dihitung. Isi tanggal siklus pertama di atas untuk memunculkan penanda pada kalender.',
                    en: 'No schedule calculated yet. Fill in the first cycle date above to reveal the markers on the calendar.',
                  })}
                </p>
              )}

              <p className="mt-auto pt-5 text-sm font-semibold leading-relaxed text-slate-500">
                {L({
                  id: 'Tampilan kalender ini contoh di peramban Anda dan tidak tersimpan ke rekam medis.',
                  en: 'This calendar view is a browser-side sample and is not stored in the medical record.',
                })}
              </p>
            </article>

            {/* ---------------- KOLOM 2: UNDUH PANDUAN ---------------- */}
            <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-violet-100 bg-violet-50 text-violet-700">
                <FileText className="h-7 w-7" />
              </span>
              <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-900">
                {L({ id: 'Unduh Panduan Mandiri', en: 'Download the Home Guide' })}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {L({
                  id: 'Lembar pegangan untuk keluarga antara satu siklus dan siklus berikutnya: obat yang diminum di rumah, cara mengatasi mual, kebersihan, dan tanda yang wajib dilaporkan.',
                  en: 'A handout for the family between one cycle and the next: medicine taken at home, how to handle nausea, cleanliness, and signs that must be reported.',
                })}
              </p>

              <ul className="mt-6 space-y-3">
                {ISI_PANDUAN.map((i) => (
                  <li key={i.id} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-600" />
                    <span className="text-base leading-relaxed text-slate-700">{L(i)}</span>
                  </li>
                ))}
              </ul>

              <a
                href={PDF_PANDUAN}
                download
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-5 py-3.5 text-lg font-extrabold text-white shadow-md shadow-violet-600/25 transition-all hover:bg-violet-700 active:scale-[0.98]"
              >
                <Download className="h-5 w-5 shrink-0" />
                {L({ id: 'Unduh PDF Panduan', en: 'Download the Guide PDF' })}
              </a>

              <p className="mt-4 flex items-start gap-2.5 text-sm font-semibold leading-relaxed text-slate-600">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-violet-600" />
                {L({
                  id: 'Salinan cetak dibagikan di meja perawat Lt 5 bersamaan dengan kartu kontrol siklus berikutnya.',
                  en: 'A printed copy is handed out at the nurse desk on level 5 together with the card for your next cycle.',
                })}
              </p>
            </article>

            {/* ---------------- KOLOM 3: RESERVASI DAYCARE ---------------- */}
            <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-violet-100 bg-violet-50 text-violet-700">
                <CalendarCheck className="h-7 w-7" />
              </span>
              <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-900">
                {L({ id: 'Reservasi Daycare Kemoterapi', en: 'Book a Chemotherapy Daycare Slot' })}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {L({
                  id: 'Ajukan tanggal dan sesi beserta data kontak. Perawat unit memeriksa kelayakan labs, ketersediaan kursi recliner, lalu mengonfirmasi jadwal lewat WhatsApp.',
                  en: 'Request a date and session with your contact details. The unit nurse checks lab fitness and recliner availability, then confirms the schedule via WhatsApp.',
                })}
              </p>

              <div className="mt-6 space-y-3">
                <p className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-semibold text-slate-700">
                  <Clock className="h-5 w-5 shrink-0 text-violet-600" />
                  {L({ id: 'Senin-Sabtu, dua sesi 08.00-18.00', en: 'Monday-Saturday, two sessions 08.00-18.00' })}
                </p>
                <p className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-semibold text-slate-700">
                  <Users className="h-5 w-5 shrink-0 text-violet-600" />
                  {L({ id: '8 kursi recliner per sesi daycare', en: '8 recliner chairs per daycare session' })}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setBuka(true)}
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-5 py-3.5 text-lg font-extrabold text-white shadow-md shadow-violet-600/25 transition-all hover:bg-violet-700 active:scale-[0.98]"
              >
                <Send className="h-5 w-5 shrink-0" />
                {L({ id: 'Buka Formulir Reservasi', en: 'Open the Booking Form' })}
              </button>

              <p className="mt-4 text-sm font-semibold leading-relaxed text-slate-600">
                {L({
                  id: 'Reservasi tidak menggantikan resep DPJP. Bawa kartu kontrol dan hasil lab terakhir pada tanggal yang dipilih.',
                  en: 'A booking does not replace the doctor\'s prescription. Bring your control card and the latest lab result on the chosen date.',
                })}
              </p>
            </article>
          </div>
        </div>
      </div>

      {/* ================= MODAL RESERVASI (TERANG) ================= */}
      <AnimatePresence>
        {buka && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-50/80 p-4 backdrop-blur-md"
            role="dialog" aria-modal="true" aria-label={L({ id: 'Reservasi Daycare Kemoterapi', en: 'Chemotherapy Daycare Booking' })}
            onClick={tutupModal}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-7 shadow-2xl sm:p-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={tutupModal}
                className="absolute right-4 top-4 rounded-full border border-slate-200 bg-slate-50 p-2 text-slate-500 transition-colors hover:text-slate-900"
                aria-label={L({ id: 'Tutup formulir', en: 'Close the form' })}
              >
                <X className="h-5 w-5" />
              </button>

              {terkirim ? (
                <div>
                  <p className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-slate-900">
                    <Check className="h-6 w-6 shrink-0 text-violet-600" />
                    {L({ id: 'Pengajuan tersimpan di perangkat ini', en: 'The request is saved on this device' })}
                  </p>
                  <dl className="mt-6 space-y-3 text-lg text-slate-700">
                    <div className="flex justify-between gap-4">
                      <dt className="font-bold text-slate-500">{L({ id: 'Nama', en: 'Name' })}</dt>
                      <dd className="text-right font-extrabold text-slate-900">{nama}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="font-bold text-slate-500">{L({ id: 'WhatsApp', en: 'WhatsApp' })}</dt>
                      <dd className="text-right font-extrabold text-slate-900">{wa}</dd>
                    </div>
                    {rm.trim() && (
                      <div className="flex justify-between gap-4">
                        <dt className="font-bold text-slate-500">{L({ id: 'No. RM', en: 'MR number' })}</dt>
                        <dd className="text-right font-extrabold text-slate-900">{rm}</dd>
                      </div>
                    )}
                    <div className="flex justify-between gap-4">
                      <dt className="font-bold text-slate-500">{L({ id: 'Terapi', en: 'Therapy' })}</dt>
                      <dd className="text-right font-extrabold text-slate-900">
                        {TERAPI_OPTS[Number(terapiIdx)] ? L(TERAPI_OPTS[Number(terapiIdx)]) : ''}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="font-bold text-slate-500">{L({ id: 'Diajukan untuk', en: 'Requested for' })}</dt>
                      <dd className="text-right font-extrabold text-slate-900">
                        {tanggalPanjang(new Date(`${tanggal}T00:00:00`))}
                        {sesiTerpilih ? ` · ${L(sesiTerpilih.nama)} (${sesiTerpilih.jam})` : ''}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="font-bold text-slate-500">{L({ id: 'Pendamping', en: 'Escort' })}</dt>
                      <dd className="text-right font-extrabold text-slate-900">
                        {pendamping
                          ? L({ id: 'Minta kursi pendamping', en: 'Escort seat requested' })
                          : L({ id: 'Tanpa pendamping', en: 'No escort' })}
                      </dd>
                    </div>
                  </dl>
                  {catatan.trim() && (
                    <p className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-base leading-relaxed text-slate-700">
                      {catatan}
                    </p>
                  )}
                  <p className="mt-6 flex items-start gap-2.5 rounded-2xl border border-violet-200 bg-violet-50 p-5 text-base leading-relaxed text-violet-900">
                    <Info className="mt-0.5 h-5 w-5 shrink-0 text-violet-700" />
                    {L({
                      id: 'Formulir ini contoh tampilan di peramban Anda dan belum terkirim ke sistem rumah sakit. Untuk jadwal resmi, hubungi unit onkologi Lt 5 lewat nomor pada kartu kontrol.',
                      en: 'This form is a browser-side demonstration and has not been sent to the hospital system. For an official date, contact the level 5 oncology unit on the number printed on your control card.',
                    })}
                  </p>
                  <button
                    type="button"
                    onClick={reset}
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-violet-600 bg-white px-5 py-3.5 text-base font-extrabold text-violet-700 transition-colors hover:bg-violet-50 active:scale-[0.98]"
                  >
                    <RotateCcw className="h-5 w-5 shrink-0" />
                    {L({ id: 'Ajukan tanggal lain', en: 'Request another date' })}
                  </button>
                </div>
              ) : (
                <form onSubmit={kirim} className="mt-2" noValidate>
                  <h3 className="pr-10 text-2xl font-extrabold leading-tight tracking-tight text-slate-900">
                    {L({ id: 'Formulir Reservasi Daycare', en: 'Daycare Booking Form' })}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-slate-600">
                    {L({
                      id: 'Isi data pasien dan usulan tanggal tindakan. Sesi yang diajukan akan dicocokkan dengan ketersediaan kursi dan kesiapan hasil lab.',
                      en: 'Fill in the patient details and your proposed treatment date. The requested session will be matched with chair availability and lab fitness.',
                    })}
                  </p>

                  <div className="mt-7 space-y-5">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label className={labelCls} htmlFor="kemo-nama">
                          {L({ id: 'Nama lengkap pasien', en: 'Patient full name' })}
                        </label>
                        <input
                          id="kemo-nama"
                          className={`${inputCls} mt-2`}
                          value={nama}
                          onChange={(e) => setNama(e.target.value)}
                          placeholder={L({ id: 'Sesuai KTP', en: 'As written on the ID card' })}
                        />
                      </div>
                      <div>
                        <label className={labelCls} htmlFor="kemo-wa">
                          {L({ id: 'Nomor WhatsApp', en: 'WhatsApp number' })}
                        </label>
                        <input
                          id="kemo-wa"
                          inputMode="tel"
                          className={`${inputCls} mt-2`}
                          value={wa}
                          onChange={(e) => setWa(e.target.value)}
                          placeholder="08xx xxxx xxxx"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label className={labelCls} htmlFor="kemo-rm">
                          {L({ id: 'No. Rekam Medis', en: 'Medical record number' })}
                        </label>
                        <input
                          id="kemo-rm"
                          className={`${inputCls} mt-2`}
                          value={rm}
                          onChange={(e) => setRm(e.target.value)}
                          placeholder={L({ id: 'Opsional', en: 'Optional' })}
                        />
                      </div>
                      <div>
                        <label className={labelCls} htmlFor="kemo-terapi">
                          {L({ id: 'Jenis terapi', en: 'Therapy type' })}
                        </label>
                        <select
                          id="kemo-terapi"
                          className={`${inputCls} mt-2`}
                          value={terapiIdx}
                          onChange={(e) => setTerapiIdx(e.target.value)}
                        >
                          <option value="">
                            {L({ id: 'Pilih jenis terapi', en: 'Select a therapy type' })}
                          </option>
                          {TERAPI_OPTS.map((t, i) => (
                            <option key={t.id} value={i}>{L(t)}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label className={labelCls} htmlFor="kemo-tanggal">
                          {L({ id: 'Usulan tanggal tindakan', en: 'Proposed treatment date' })}
                        </label>
                        <input
                          id="kemo-tanggal"
                          type="date"
                          className={`${inputCls} mt-2`}
                          value={tanggal}
                          onChange={(e) => setTanggal(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className={labelCls} htmlFor="kemo-sesi">
                          {L({ id: 'Usulan sesi', en: 'Proposed session' })}
                        </label>
                        <select
                          id="kemo-sesi"
                          className={`${inputCls} mt-2`}
                          value={sesi}
                          onChange={(e) => setSesi(e.target.value)}
                        >
                          <option value="">
                            {L({ id: 'Pilih sesi', en: 'Select a session' })}
                          </option>
                          {SESI.map((s) => (
                            <option key={s.kode} value={s.kode}>{`${L(s.nama)} (${s.jam})`}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <input
                        type="checkbox"
                        className="mt-1 h-5 w-5 shrink-0 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                        checked={pendamping}
                        onChange={(e) => setPendamping(e.target.checked)}
                      />
                      <span className="text-base leading-relaxed text-slate-700">
                        {L({
                          id: 'Minta satu kursi pendamping untuk keluarga selama infus berjalan.',
                          en: 'Request one escort seat for a family member while the infusion runs.',
                        })}
                      </span>
                    </label>

                    <div>
                      <label className={labelCls} htmlFor="kemo-catatan">
                        {L({ id: 'Catatan untuk perawat unit', en: 'Note for the unit nurse' })}
                      </label>
                      <textarea
                        id="kemo-catatan"
                        rows={3}
                        className={`${inputCls} mt-2 resize-none`}
                        value={catatan}
                        onChange={(e) => setCatatan(e.target.value)}
                        placeholder={L({
                          id: 'Contoh: regimen hari ke-3 siklus 4, ada reaksi di tangan kanan',
                          en: 'For example: day 3 regimen of cycle 4, a reaction on the right hand',
                        })}
                      />
                    </div>
                  </div>

                  {galat && (
                    <p role="alert" className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-base font-bold leading-relaxed text-rose-800">
                      {galat}
                    </p>
                  )}

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={tutupModal}
                      className="rounded-2xl border-2 border-slate-200 bg-white px-5 py-3.5 text-base font-extrabold text-slate-600 transition-colors hover:bg-slate-50 sm:flex-1"
                    >
                      {L({ id: 'Tutup', en: 'Close' })}
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-5 py-3.5 text-base font-extrabold text-white shadow-md shadow-violet-600/25 transition-all hover:bg-violet-700 active:scale-[0.98] sm:flex-[2]"
                    >
                      <Send className="h-5 w-5 shrink-0" />
                      {L({ id: 'Kirim Pengajuan Jadwal', en: 'Submit the Schedule Request' })}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default KemoterapiWidgets;
