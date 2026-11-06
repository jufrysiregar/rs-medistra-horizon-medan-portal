'use client';

import React, { useMemo, useState } from 'react';
import {
  CalendarCheck,
  Car,
  Check,
  ChevronDown,
  Download,
  FileText,
  FlaskConical,
  Home,
  Info,
  Loader2,
  MapPin,
  Search,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import type { Language } from '../../../types';

type Teks = { id: string; en: string };

/* ============================== DATA TES ============================== */

/** Katalog tes untuk widget pencarian, lengkap dengan catatan persiapannya. */
const DAFTAR_TES: { nama: Teks; kategori: Teks; prep: Teks }[] = [
  { nama: { id: 'Gula Darah Puasa', en: 'Fasting Blood Glucose' }, kategori: { id: 'Kimia Klinik', en: 'Clinical Chemistry' }, prep: { id: 'Puasa 10-12 jam, air putih boleh.', en: 'Fast 10-12 hours; plain water allowed.' } },
  { nama: { id: 'Profil Lemak (Kolesterol & Trigliserida)', en: 'Lipid Profile (Cholesterol & Triglycerides)' }, kategori: { id: 'Kimia Klinik', en: 'Clinical Chemistry' }, prep: { id: 'Puasa 10-12 jam sebelum pengambilan.', en: 'Fast 10-12 hours before sampling.' } },
  { nama: { id: 'Hemoglobin & Darah Lengkap', en: 'Haemoglobin & Complete Blood Count' }, kategori: { id: 'Hematologi', en: 'Haematology' }, prep: { id: 'Tanpa puasa; cukup istrahat cukup sebelum datang.', en: 'No fasting; simply get enough rest beforehand.' } },
  { nama: { id: 'HbA1c (Rerata Gula Darah 3 Bulan)', en: 'HbA1c (3-Month Glucose Average)' }, kategori: { id: 'Hematologi', en: 'Haematology' }, prep: { id: 'Tanpa puasa, dapat diambil kapan saja.', en: 'No fasting, can be taken any time.' } },
  { nama: { id: 'Asam Urat', en: 'Uric Acid' }, kategori: { id: 'Kimia Klinik', en: 'Clinical Chemistry' }, prep: { id: 'Disarankan puasa 8-10 jam & hindari alkohol 24 jam.', en: '8-10 hours fasting advised; avoid alcohol for 24 hours.' } },
  { nama: { id: 'Fungsi Hati (SGOT / SGPT)', en: 'Liver Function (SGOT / SGPT)' }, kategori: { id: 'Kimia Klinik', en: 'Clinical Chemistry' }, prep: { id: 'Hindari obat tanpa anjuran & alkohol 24 jam sebelumnya.', en: 'Avoid unprescribed drugs & alcohol for the prior 24 hours.' } },
  { nama: { id: 'Fungsi Ginjal (Ureum / Kreatinin)', en: 'Kidney Function (Urea / Creatinine)' }, kategori: { id: 'Kimia Klinik', en: 'Clinical Chemistry' }, prep: { id: 'Tanpa puasa; perbanyak air putih.', en: 'No fasting; drink plenty of water.' } },
  { nama: { id: 'Urinalisis (Cek Urin Lengkap)', en: 'Urinalysis (Full Urine Test)' }, kategori: { id: 'Urinalisis', en: 'Urinalysis' }, prep: { id: 'Tahan buang air kecil minimal 2 jam; ambil arus tengah.', en: 'Hold urine at least 2 hours; collect the mid-stream.' } },
  { nama: { id: 'Kultur & Sensitivitas Antibiotik', en: 'Culture & Antibiotic Sensitivity' }, kategori: { id: 'Mikrobiologi', en: 'Microbiology' }, prep: { id: 'Sebaiknya sebelum minum antibiotik.', en: 'Ideally before taking any antibiotic.' } },
  { nama: { id: 'Serologi Kehamilan (Beta-hCG)', en: 'Pregnancy Serology (Beta-hCG)' }, kategori: { id: 'Imunologi', en: 'Immunology' }, prep: { id: 'Tanpa puasa; urin pagi lebih peka.', en: 'No fasting; morning urine is more sensitive.' } },
];

/** Hasil contoh untuk widget "Cek Hasil" (simulasi tampilan, bukan data pasien nyata). */
const CONTOH_HASIL: { nama: Teks; nilai: string; rujukan: Teks; satuan: Teks }[] = [
  { nama: { id: 'Hemoglobin', en: 'Haemoglobin' }, nilai: '14.2', rujukan: { id: '13.2 - 17.3', en: '13.2 - 17.3' }, satuan: { id: 'g/dL', en: 'g/dL' } },
  { nama: { id: 'Gula Darah Puasa', en: 'Fasting Blood Glucose' }, nilai: '96', rujukan: { id: '70 - 100', en: '70 - 100' }, satuan: { id: 'mg/dL', en: 'mg/dL' } },
  { nama: { id: 'Kolesterol Total', en: 'Total Cholesterol' }, nilai: '188', rujukan: { id: '< 200', en: '< 200' }, satuan: { id: 'mg/dL', en: 'mg/dL' } },
];

/* ============================ SUB-KOMPONEN ============================ */

const KartuWidget: React.FC<{ ikon: React.ComponentType<{ className?: string }>; judul: string; sub: string; children: React.ReactNode }> = ({
  ikon: Ikon,
  judul,
  sub,
  children,
}) => (
  <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-teal-100 bg-teal-50 text-teal-700">
      <Ikon className="h-7 w-7" />
    </span>
    <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-900">{judul}</h3>
    <p className="mt-1 text-base leading-relaxed text-slate-500">{sub}</p>
    <div className="mt-6 flex flex-1 flex-col">{children}</div>
  </div>
);

/** Label + kontrol input dengan gaya seragam (terang). */
const kelasInput =
  'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-800 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30';

/* ================================ WIDGETS ================================ */

const LaboratoriumWidgets: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (t: Teks) => t[lang];

  /* ---- Card 1: Cek & Unduh Hasil ---- */
  const [noRm, setNoRm] = useState('');
  const [tglLahir, setTglLahir] = useState('');
  const [statusHasil, setStatusHasil] = useState<'idle' | 'loading' | 'found' | 'empty'>('idle');

  const cekHasil = (e: React.FormEvent) => {
    e.preventDefault();
    if (noRm.trim().length < 4 || !tglLahir) {
      setStatusHasil('empty');
      return;
    }
    setStatusHasil('loading');
    // Simulasi pencarian singkat; hasil nyata terhubung ke SIMRS.
    setTimeout(() => setStatusHasil(noRm.trim().length >= 4 ? 'found' : 'empty'), 900);
  };

  /* ---- Card 2: Booking Homecare / Drive-Thru ---- */
  const [jenis, setJenis] = useState<'homecare' | 'drivethru'>('homecare');
  const [alamat, setAlamat] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [terkirim, setTerkirim] = useState(false);

  const kirimBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alamat.trim() || !tanggal) return;
    setTerkirim(true);
  };

  /* ---- Card 3: Pencarian Tes ---- */
  const [q, setQ] = useState('');
  const hasilTes = useMemo(() => {
    const kata = q.trim().toLowerCase();
    if (!kata) return DAFTAR_TES;
    return DAFTAR_TES.filter((t) =>
      [t.nama[lang], t.kategori[lang], t.prep[lang]].join(' ').toLowerCase().includes(kata),
    );
  }, [q, lang]);

  return (
    <section id="layanan-digital" className="scroll-mt-28 bg-slate-50 py-20">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
          {L({ id: 'Layanan Digital Laboratorium', en: 'Digital Laboratory Services' })}
        </h2>
        <div className="mt-5 h-px w-full bg-slate-200" />
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
          {L({
            id: 'Cek hasil, jadwalkan pengambilan sampel, dan cari persiapan tes yang Anda butuhkan, semua dari satu tempat.',
            en: 'Check results, schedule a sample collection, and find the preparation a test needs, all in one place.',
          })}
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* ============ CARD 1: CEK HASIL ============ */}
          <KartuWidget
            ikon={FileText}
            judul={L({ id: 'Cek & Unduh Hasil Lab', en: 'Check & Download Lab Results' })}
            sub={L({ id: 'Masukkan nomor rekam medis Anda.', en: 'Enter your medical record number.' })}
          >
            <form onSubmit={cekHasil} className="flex flex-1 flex-col gap-3">
              <input
                className={kelasInput}
                type="text"
                inputMode="numeric"
                placeholder={L({ id: 'No. Rekam Medis', en: 'Medical Record No.' })}
                value={noRm}
                onChange={(e) => { setNoRm(e.target.value); setTerkirim(false); }}
              />
              <input
                className={kelasInput}
                type="date"
                aria-label={L({ id: 'Tanggal lahir', en: 'Date of birth' })}
                value={tglLahir}
                onChange={(e) => setTglLahir(e.target.value)}
              />
              <button
                type="submit"
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3 text-base font-extrabold text-white shadow-lg shadow-teal-600/25 transition-all hover:bg-teal-700 active:scale-[0.98]"
              >
                {statusHasil === 'loading' ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
                {L({ id: 'Cek Hasil', en: 'Check Results' })}
              </button>

              <div className="mt-2 flex-1">
                {statusHasil === 'empty' && (
                  <p className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm font-semibold text-amber-800">
                    <Info className="mt-0.5 h-4 w-4 shrink-0" />
                    {L({ id: 'Lengkapi No. Rekam Medis dan tanggal lahir untuk melanjutkan.', en: 'Complete the medical record number and date of birth to continue.' })}
                  </p>
                )}
                {statusHasil === 'found' && (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                    <p className="flex items-center gap-2 text-sm font-extrabold text-emerald-800">
                      <Check className="h-4 w-4" />
                      {L({ id: '3 hasil terbaru ditemukan', en: '3 latest results found' })}
                    </p>
                    <ul className="mt-3 space-y-2">
                      {CONTOH_HASIL.map((h) => (
                        <li key={h.nama.id} className="flex items-center justify-between gap-3 text-sm text-slate-700">
                          <span className="font-semibold">{L(h.nama)}</span>
                          <span className="whitespace-nowrap font-mono">
                            {h.nilai} {L(h.satuan)}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="mt-4 inline-flex items-center gap-2 rounded-lg border border-emerald-300 bg-white px-4 py-2 text-sm font-bold text-emerald-700 transition hover:bg-emerald-100"
                    >
                      <Download className="h-4 w-4" />
                      {L({ id: 'Unduh PDF', en: 'Download PDF' })}
                    </a>
                  </div>
                )}
              </div>
            </form>
          </KartuWidget>

          {/* ============ CARD 2: BOOKING ============ */}
          <KartuWidget
            ikon={CalendarCheck}
            judul={L({ id: 'Booking Homecare / Drive-Thru', en: 'Book Homecare / Drive-Thru' })}
            sub={L({ id: 'Atur jadwal pengambilan sampel.', en: 'Arrange a sample-collection schedule.' })}
          >
            <form onSubmit={kirimBooking} className="flex flex-1 flex-col gap-3">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => { setJenis('homecare'); setTerkirim(false); }}
                  className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold transition ${
                    jenis === 'homecare' ? 'border-teal-600 bg-teal-600 text-white' : 'border-slate-300 bg-white text-slate-700 hover:border-teal-400'
                  }`}
                >
                  <Home className="h-4 w-4" /> {L({ id: 'Homecare', en: 'Homecare' })}
                </button>
                <button
                  type="button"
                  onClick={() => { setJenis('drivethru'); setTerkirim(false); }}
                  className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold transition ${
                    jenis === 'drivethru' ? 'border-teal-600 bg-teal-600 text-white' : 'border-slate-300 bg-white text-slate-700 hover:border-teal-400'
                  }`}
                >
                  <Car className="h-4 w-4" /> {L({ id: 'Drive-Thru', en: 'Drive-Thru' })}
                </button>
              </div>
              <input
                className={kelasInput}
                type="text"
                placeholder={jenis === 'homecare' ? L({ id: 'Alamat lengkap', en: 'Full address' }) : L({ id: 'Nama & nomor kendaraan', en: 'Name & vehicle plate' })}
                value={alamat}
                onChange={(e) => { setAlamat(e.target.value); setTerkirim(false); }}
              />
              <input
                className={kelasInput}
                type="date"
                aria-label={L({ id: 'Tanggal kunjungan', en: 'Visit date' })}
                value={tanggal}
                onChange={(e) => { setTanggal(e.target.value); setTerkirim(false); }}
              />
              <button
                type="submit"
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3 text-base font-extrabold text-white shadow-lg shadow-teal-600/25 transition-all hover:bg-teal-700 active:scale-[0.98]"
              >
                <CalendarCheck className="h-5 w-5" />
                {L({ id: 'Kirim Permintaan', en: 'Send Request' })}
              </button>

              <div className="mt-2 flex-1">
                {terkirim && (
                  <p className="flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold leading-relaxed text-emerald-800">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                    {L({
                      id: `Permintaan ${jenis === 'homecare' ? 'Homecare' : 'Drive-Thru'} untuk ${tanggal} diterima. Petugas lab akan menghubungi Anda untuk konfirmasi.`,
                      en: `Your ${jenis === 'homecare' ? 'Homecare' : 'Drive-Thru'} request for ${tanggal} is received. Lab staff will contact you to confirm.`,
                    })}
                  </p>
                )}
              </div>
            </form>
          </KartuWidget>

          {/* ============ CARD 3: PENCARIAN TES ============ */}
          <KartuWidget
            ikon={FlaskConical}
            judul={L({ id: 'Pencarian Tes Lab', en: 'Lab Test Search' })}
            sub={L({ id: 'Cek nama tes & persiapan puasanya.', en: 'Check a test name and its preparation.' })}
          >
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                className={`${kelasInput} pl-11`}
                type="text"
                placeholder={L({ id: 'Cari: HbA1c, fungsi hati, urin...', en: 'Search: HbA1c, liver function, urine...' })}
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-slate-300" />
            </div>

            <ul className="mt-4 max-h-[22rem] space-y-2 overflow-y-auto pr-1">
              {hasilTes.length === 0 && (
                <li className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-500">
                  {L({ id: 'Tes tidak ditemukan. Coba kata kunci lain.', en: 'Test not found. Try another keyword.' })}
                </li>
              )}
              {hasilTes.map((t) => (
                <li key={t.nama.id} className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-base font-bold text-slate-900">{L(t.nama)}</p>
                    <span className="shrink-0 rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-bold text-teal-700">{L(t.kategori)}</span>
                  </div>
                  <p className="mt-1.5 flex items-start gap-2 text-sm leading-relaxed text-slate-600">
                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                    <span>
                      <span className="font-semibold text-slate-700">{L({ id: 'Persiapan:', en: 'Preparation:' })}</span> {L(t.prep)}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </KartuWidget>
        </div>

        <p className="mt-8 text-sm font-semibold text-slate-400">
          {L({
            id: 'Catatan: seluruh widget di atas adalah tampilan demo. Hasil dan penjadwalan final dikonfirmasi oleh petugas laboratorium.',
            en: 'Note: the widgets above are a demo view. Final results and scheduling are confirmed by laboratory staff.',
          })}
        </p>
      </div>
    </section>
  );
};

export default LaboratoriumWidgets;
