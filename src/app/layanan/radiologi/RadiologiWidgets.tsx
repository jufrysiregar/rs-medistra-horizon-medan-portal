'use client';

import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  CalendarCheck,
  Check,
  ChevronDown,
  Clock,
  Download,
  FileText,
  Info,
  Loader2,
  Search,
  ShieldCheck,
  X,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import type { Language } from '../../../types';

type Teks = { id: string; en: string };

/* ============================== DATA ============================== */

/** Hasil contoh untuk "Portal Akses Hasil" (simulasi tampilan, bukan data pasien nyata). */
const CONTOH_HASIL: { modalitas: Teks; tanggal: string; status: Teks }[] = [
  { modalitas: { id: 'Rontgen Dada (PA)', en: 'Chest X-Ray (PA)' }, tanggal: '2026-10-12', status: { id: 'Terkonsul', en: 'Reported' } },
  { modalitas: { id: 'USG Abdomen', en: 'Abdominal Ultrasound' }, tanggal: '2026-10-08', status: { id: 'Terkonsul', en: 'Reported' } },
  { modalitas: { id: 'CT-Scan Kepala Non-Kontras', en: 'Non-Contrast Head CT' }, tanggal: '2026-09-30', status: { id: 'Terkonsul', en: 'Reported' } },
];

/** Daftar pemeriksaan untuk dropdown booking. */
const DAFTAR_PERIKSAAN: Teks[] = [
  { id: 'MRI (Otak / Tulang Belakang / Sendi)', en: 'MRI (Brain / Spine / Joint)' },
  { id: 'CT-Scan Multi-Slice (MSCT)', en: 'Multi-Slice CT (MSCT)' },
  { id: 'X-Ray Digital', en: 'Digital X-Ray' },
  { id: 'USG 2D/3D/4D & Doppler', en: '2D/3D/4D Ultrasound & Doppler' },
  { id: 'Mammografi Digital', en: 'Digital Mammography' },
  { id: 'BMD, Densitometri Tulang', en: 'BMD, Bone Densitometry' },
];

/** Slot jam layanan (sesuai jam operasional; CT darurat 24 jam). */
const SLOT_JAM: string[] = ['07.00 - 09.00', '09.00 - 11.00', '11.00 - 13.00', '13.00 - 15.00', '15.00 - 17.00', '17.00 - 21.00'];

/** Pertanyaan skrining mandiri sebelum MRI / pemberian kontras. */
const PERTANYAAN: { id: string; label: Teks; ikon: 'metal' | 'allergy' | 'pregnant' | 'kidney' }[] = [
  {
    id: 'implan',
    label: { id: 'Anda memiliki implan pacu jantung, plat logam, atau alat logam di tubuh?', en: 'Do you have a pacemaker, metal plates or any metal device in your body?' },
    ikon: 'metal',
  },
  {
    id: 'alergi',
    label: { id: 'Anda punya riwayat alergi obat atau alergi makanan laut / iodium?', en: 'Do you have a drug allergy or an allergy to seafood / iodine?' },
    ikon: 'allergy',
  },
  {
    id: 'hamil',
    label: { id: 'Anda sedang hamil atau diduga hamil?', en: 'Are you pregnant or could you be pregnant?' },
    ikon: 'pregnant',
  },
  {
    id: 'ginjal',
    label: { id: 'Anda punya riwayat penyakit ginjal atau diabetes berat?', en: 'Do you have a history of kidney disease or severe diabetes?' },
    ikon: 'kidney',
  },
];

/* ============================ SUB-KOMPONEN ============================ */

const KartuWidget: React.FC<{ ikon: React.ComponentType<{ className?: string }>; judul: string; sub: string; children: React.ReactNode }> = ({
  ikon: Ikon,
  judul,
  sub,
  children,
}) => (
  <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-sky-100 bg-sky-50 text-sky-700">
      <Ikon className="h-7 w-7" />
    </span>
    <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-900">{judul}</h3>
    <p className="mt-1 text-base leading-relaxed text-slate-500">{sub}</p>
    <div className="mt-6 flex flex-1 flex-col">{children}</div>
  </div>
);

/** Label + kontrol input dengan gaya seragam (terang). */
const kelasInput =
  'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-800 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30';

const kelasTombol =
  'mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-6 py-3 text-base font-extrabold text-white shadow-lg shadow-sky-600/25 transition-all hover:bg-sky-700 active:scale-[0.98]';

/* ================================ WIDGETS ================================ */

const RadiologiWidgets: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (t: Teks) => t[lang];

  /* ---- Widget 1: Portal Akses Hasil ---- */
  const [noRm, setNoRm] = useState('');
  const [tglLahir, setTglLahir] = useState('');
  const [statusHasil, setStatusHasil] = useState<'idle' | 'loading' | 'found' | 'empty'>('idle');

  const lihatHasil = (e: React.FormEvent) => {
    e.preventDefault();
    if (noRm.trim().length < 4 || !tglLahir) {
      setStatusHasil('empty');
      return;
    }
    setStatusHasil('loading');
    // Simulasi pencarian singkat; hasil nyata terhubung ke PACS / SIMRS.
    setTimeout(() => setStatusHasil('found'), 900);
  };

  /* ---- Widget 2: Booking Jadwal ---- */
  const [pemeriksaan, setPemeriksaan] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [jam, setJam] = useState('');
  const [terkirim, setTerkirim] = useState(false);

  const kirimBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pemeriksaan || !tanggal || !jam) return;
    setTerkirim(true);
  };

  /* ---- Widget 3: Skrining Mandiri ---- */
  const [jawaban, setJawaban] = useState<Record<string, boolean | null>>({});
  const jawab = (id: string, val: boolean) => setJawaban((prev) => ({ ...prev, [id]: val }));

  const statusSkrining = useMemo(() => {
    const values = Object.values(jawaban);
    if (values.length === 0 || values.some((v) => v === null)) return 'incomplete' as const;
    if (values.every((v) => v === false)) return 'clear' as const;
    return 'flag' as const;
  }, [jawaban]);

  return (
    <section id="layanan-digital" className="scroll-mt-28 bg-white py-20">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
          {L({ id: 'Layanan Digital Radiologi', en: 'Digital Radiology Services' })}
        </h2>
        <div className="mt-5 h-px w-full bg-slate-200" />
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
          {L({
            id: 'Unduh hasil citra, jadwalkan pemeriksaan, dan lakukan skrining mandiri keamanan MRI/kontras, semua dari satu tempat.',
            en: 'Download your images, schedule a scan, and run a self-check for MRI/contrast safety, all in one place.',
          })}
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* ============ WIDGET 1: PORTAL HASIL ============ */}
          <KartuWidget
            ikon={FileText}
            judul={L({ id: 'Portal Akses Hasil Radiologi', en: 'Radiology Results Portal' })}
            sub={L({ id: 'Masukkan nomor rekam medis Anda.', en: 'Enter your medical record number.' })}
          >
            <form onSubmit={lihatHasil} className="flex flex-1 flex-col gap-3">
              <input
                className={kelasInput}
                type="text"
                inputMode="numeric"
                placeholder={L({ id: 'No. Rekam Medis', en: 'Medical Record No.' })}
                value={noRm}
                onChange={(e) => { setNoRm(e.target.value); setStatusHasil('idle'); }}
              />
              <input
                className={kelasInput}
                type="date"
                aria-label={L({ id: 'Tanggal lahir', en: 'Date of birth' })}
                value={tglLahir}
                onChange={(e) => { setTglLahir(e.target.value); setStatusHasil('idle'); }}
              />
              <button type="submit" className={kelasTombol}>
                {statusHasil === 'loading' ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
                {L({ id: 'Lihat Hasil', en: 'View Results' })}
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
                        <li key={h.modalitas.id} className="flex items-center justify-between gap-3 text-sm text-slate-700">
                          <span className="font-semibold">{L(h.modalitas)}</span>
                          <span className="whitespace-nowrap font-mono text-xs text-slate-500">{h.tanggal}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="mt-4 inline-flex items-center gap-2 rounded-lg border border-emerald-300 bg-white px-4 py-2 text-sm font-bold text-emerald-700 transition hover:bg-emerald-100"
                    >
                      <Download className="h-4 w-4" />
                      {L({ id: 'Unduh (PDF & DICOM)', en: 'Download (PDF & DICOM)' })}
                    </a>
                  </div>
                )}
              </div>
            </form>
          </KartuWidget>

          {/* ============ WIDGET 2: BOOKING JADWAL ============ */}
          <KartuWidget
            ikon={CalendarCheck}
            judul={L({ id: 'Booking Jadwal Radiologi', en: 'Book a Radiology Slot' })}
            sub={L({ id: 'Pilih pemeriksaan, tanggal, dan jam.', en: 'Pick an exam, date and time.' })}
          >
            <form onSubmit={kirimBooking} className="flex flex-1 flex-col gap-3">
              <div className="relative">
                <select
                  className={`${kelasInput} appearance-none pr-11`}
                  value={pemeriksaan}
                  onChange={(e) => { setPemeriksaan(e.target.value); setTerkirim(false); }}
                >
                  <option value="">{L({ id: 'Pilih Pemeriksaan', en: 'Select Examination' })}</option>
                  {DAFTAR_PERIKSAAN.map((p) => (
                    <option key={p.id} value={p.id}>{L(p)}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              </div>
              <input
                className={kelasInput}
                type="date"
                aria-label={L({ id: 'Tanggal pemeriksaan', en: 'Examination date' })}
                value={tanggal}
                onChange={(e) => { setTanggal(e.target.value); setTerkirim(false); }}
              />
              <div className="relative">
                <select
                  className={`${kelasInput} appearance-none pr-11`}
                  value={jam}
                  onChange={(e) => { setJam(e.target.value); setTerkirim(false); }}
                >
                  <option value="">{L({ id: 'Pilih Jam', en: 'Select Time' })}</option>
                  {SLOT_JAM.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <Clock className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              </div>
              <button type="submit" className={kelasTombol}>
                <CalendarCheck className="h-5 w-5" />
                {L({ id: 'Kirim Permintaan', en: 'Send Request' })}
              </button>

              <div className="mt-2 flex-1">
                {terkirim && (
                  <p className="flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold leading-relaxed text-emerald-800">
                    <Check className="mt-0.5 h-4 w-4 shrink-0" />
                    {L({
                      id: `Permintaan untuk ${pemeriksaan ? L(DAFTAR_PERIKSAAN.find((p) => p.id === pemeriksaan)!) : ''} pada ${tanggal} (${jam}) diterima. Petugas radiologi akan mengonfirmasi jadwal Anda.`,
                      en: `Your request for ${pemeriksaan ? L(DAFTAR_PERIKSAAN.find((p) => p.id === pemeriksaan)!) : ''} on ${tanggal} (${jam}) is received. Radiology staff will confirm your schedule.`,
                    })}
                  </p>
                )}
              </div>
            </form>
          </KartuWidget>

          {/* ============ WIDGET 3: SKRINING MANDIRI ============ */}
          <KartuWidget
            ikon={ShieldCheck}
            judul={L({ id: 'Skrining Mandiri MRI / Kontras', en: 'Self-Check for MRI / Contrast' })}
            sub={L({ id: 'Jawab 4 pertanyaan keamanan berikut.', en: 'Answer these 4 safety questions.' })}
          >
            <ul className="flex flex-1 flex-col gap-3">
              {PERTANYAAN.map((q) => {
                const val = jawaban[q.id];
                return (
                  <li key={q.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <p className="text-sm font-semibold leading-snug text-slate-700">{L(q.label)}</p>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => jawab(q.id, true)}
                        className={`inline-flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-bold transition ${
                          val === true ? 'border-amber-500 bg-amber-500 text-white' : 'border-slate-300 bg-white text-slate-600 hover:border-amber-400'
                        }`}
                      >
                        <AlertTriangle className="h-4 w-4" /> {L({ id: 'Ya', en: 'Yes' })}
                      </button>
                      <button
                        type="button"
                        onClick={() => jawab(q.id, false)}
                        className={`inline-flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-bold transition ${
                          val === false ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-300 bg-white text-slate-600 hover:border-emerald-400'
                        }`}
                      >
                        <X className="h-4 w-4" /> {L({ id: 'Tidak', en: 'No' })}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-3">
              {statusSkrining === 'incomplete' && (
                <p className="flex items-start gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-semibold text-slate-500">
                  <Info className="mt-0.5 h-4 w-4 shrink-0" />
                  {L({ id: 'Jawab seluruh pertanyaan untuk melihat hasil skrining.', en: 'Answer all questions to see your screening result.' })}
                </p>
              )}
              {statusSkrining === 'flag' && (
                <p className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm font-semibold leading-relaxed text-amber-800">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                  {L({
                    id: 'Ada penanda yang perlu dievaluasi radiolog sebelum pemeriksaan (terutama MRI & kontras). Tim kami akan menghubungi Anda untuk verifikasi.',
                    en: 'A marker needs to be evaluated by the radiologist before your scan (especially MRI & contrast). Our team will contact you to verify.',
                  })}
                </p>
              )}
              {statusSkrining === 'clear' && (
                <p className="flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold leading-relaxed text-emerald-800">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
                  {L({
                    id: 'Tidak ada penanda berisiko. Tetap informasikan kondisi Anda kepada petugas saat hari pemeriksaan.',
                    en: 'No risk markers found. Still tell the staff about your condition on the examination day.',
                  })}
                </p>
              )}
            </div>
          </KartuWidget>
        </div>

        <p className="mt-8 text-sm font-semibold text-slate-400">
          {L({
            id: 'Catatan: seluruh widget di atas adalah tampilan demo. Hasil dan penjadwalan final dikonfirmasi oleh petugas radiologi.',
            en: 'Note: the widgets above are a demo view. Final results and scheduling are confirmed by radiology staff.',
          })}
        </p>
      </div>
    </section>
  );
};

export default RadiologiWidgets;
