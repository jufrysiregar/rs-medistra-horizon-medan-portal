'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Check,
  Clock,
  Download,
  FileText,
  Images,
  Monitor,
  Pause,
  Play,
  ShieldCheck,
  Users,
  Video,
  X,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import type { Language } from '../../../types';

/** Sepasang teks ID/EN; dipilih dengan [lang] supaya semua data tinggal di satu tempat. */
type Teks = { id: string; en: string };

/** Brosur & estimasi biaya bedah dibagikan sebagai PDF statis (public/files). */
const PDF_BROSUR = '/files/brosur-ruang-operasi.pdf';

/** Isi brosur yang bisa dibaca keluarga sebelum mengunduh. */
const ISI_BROSUR: Teks[] = [
  { id: 'Estimasi paket 5 tindakan tersering', en: 'Package estimates for 5 common procedures' },
  { id: 'Rincian biaya termasuk dan tidak termasuk', en: 'What is included and excluded' },
  { id: 'Alur penjaminan BPJS dan asuransi', en: 'BPJS and insurance guarantee flow' },
  { id: 'Kontak poli bedah dan jadwal konsultasi', en: 'Surgical clinic contact and schedule' },
];

/** Bab video edukasi beserta titik menit-detiknya. */
const BAB: { judul: Teks; detik: number }[] = [
  { judul: { id: 'Malam sebelum operasi & aturan puasa', en: 'Night before surgery & fasting rule' }, detik: 0 },
  { judul: { id: 'Persiapan di ruang rawat & serah terima', en: 'Ward preparation and hand-over' }, detik: 62 },
  { judul: { id: 'Setelah operasi: nyeri, luka, mobilisasi', en: 'After surgery: pain, wound, mobilisation' }, detik: 121 },
];

/** Durasi total video contoh dalam detik (2 menit 58 detik). */
const DURASI = 178;

/** Empat tahap yang dilewati keluarga di ruang tunggu. */
const STATUS: { teks: Teks; pill: string }[] = [
  { teks: { id: 'Menunggu', en: 'Waiting' }, pill: 'border-amber-200 bg-amber-50 text-amber-800' },
  { teks: { id: 'Tindakan berlangsung', en: 'Procedure running' }, pill: 'border-sky-200 bg-sky-50 text-sky-800' },
  { teks: { id: 'Pemulihan (PACU)', en: 'Recovery (PACU)' }, pill: 'border-violet-200 bg-violet-50 text-violet-800' },
  { teks: { id: 'Siap dijenguk', en: 'Ready for visitors' }, pill: 'border-emerald-200 bg-emerald-50 text-emerald-800' },
];

/** Pantauan per kamar; `mulai` menggeser fase awal agar tidak serempak. */
const RUANGAN: { kamar: string; tindakan: Teks; mulai: number }[] = [
  { kamar: 'OR 1', tindakan: { id: 'Laparoskopi saluran cerna', en: 'Laparoscopic GI surgery' }, mulai: 0 },
  { kamar: 'OR 2', tindakan: { id: 'Orthopedi & C-Arm', en: 'Orthopaedic with C-arm' }, mulai: 1 },
  { kamar: 'OR 3', tindakan: { id: 'Bedah katarak hari ini', en: 'Same-day cataract surgery' }, mulai: 2 },
  { kamar: 'OR 4', tindakan: { id: 'Kebidanan terencana', en: 'Planned obstetric case' }, mulai: 3 },
];

/** Format detik menjadi mm:ss. */
const menitDetik = (d: number) => `${Math.floor(d / 60)}:${String(d % 60).padStart(2, '0')}`;

type ModalKini = 'video' | null;

/**
 * PANEL INTERAKTIF BEDAH, unduh brosur estimasi, pemutar video edukasi
 * (simulasi tampilan dengan bab), dan pantauan ruang tunggu keluarga yang
 * berjalan otomatis. Modal dibuat lokal di halaman ini (terang) supaya modal
 * bersama situs tidak berubah.
 */
const RuangOperasiWidgets: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (teks: Teks) => teks[lang];

  /* ------------------------- Video edukasi ------------------------- */
  const [modal, setModal] = useState<ModalKini>(null);
  const [main, setMain] = useState(false);
  const [detik, setDetik] = useState(0);

  useEffect(() => {
    if (!main) return;
    const id = window.setInterval(() => {
      setDetik((d) => {
        if (d >= DURASI) {
          setMain(false);
          return DURASI;
        }
        return d + 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [main]);

  /* Kunci scroll halaman selama modal terbuka, dan tutup dengan tombol Esc. */
  useEffect(() => {
    if (!modal) return;
    const sebelumnya = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const tekan = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModal(null);
    };
    window.addEventListener('keydown', tekan);
    return () => {
      document.body.style.overflow = sebelumnya;
      window.removeEventListener('keydown', tekan);
    };
  }, [modal]);

  /* ---------------------- Pantauan ruang tunggu ---------------------- */
  const [tik, setTik] = useState(0);
  const [jam, setJam] = useState<string | null>(null);

  useEffect(() => {
    const mutakhir = () =>
      setJam(
        new Date().toLocaleTimeString(lang === 'en' ? 'en-GB' : 'id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      );
    mutakhir();
    const id = window.setInterval(() => {
      setTik((t) => t + 1);
      mutakhir();
    }, 5000);
    return () => window.clearInterval(id);
  }, [lang]);

  const persen = Math.min(100, Math.round((detik / DURASI) * 100));

  return (
    <>
      {/* ================= 7. WIDGET UX BEDAH ================= */}
      <section id="informasi-bedah" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Informasi Biaya, Edukasi & Pantauan Keluarga', en: 'Cost Information, Education & Family Monitoring' })}
          </h2>
          <div className="mt-5 h-px w-full bg-slate-200" />

          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg sm:p-10">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* KARTU 1: brosur & estimasi biaya */}
              <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-7">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-sky-700">
                  <FileText className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-xl font-extrabold leading-snug text-slate-900">
                  {L({ id: 'Estimasi Biaya & Brosur Operasi', en: 'Surgery Cost Estimate & Brochure' })}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600">
                  {L({
                    id: 'Satu berkas berisi paket biaya tindakan, rincian termasuk dan tidak termasuk, serta alur penjaminan.',
                    en: 'One file with procedure packages, included and excluded items, and the guarantee flow.',
                  })}
                </p>
                <ul className="mt-5 space-y-2.5 border-t border-slate-200 pt-5">
                  {ISI_BROSUR.map((i) => (
                    <li key={i.id} className="flex items-start gap-2.5 text-base leading-snug text-slate-700">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-sky-600" />
                      <span>{L(i)}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={PDF_BROSUR}
                  download
                  className="mt-7 inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-600 px-5 py-3.5 text-lg font-extrabold text-white shadow-md shadow-sky-600/25 transition-all hover:bg-sky-700 active:scale-[0.98]"
                >
                  <Download className="h-5 w-5 shrink-0" />
                  {L({ id: 'Download PDF', en: 'Download PDF' })}
                </a>
              </article>

              {/* KARTU 2: video edukasi */}
              <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-7">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-sky-700">
                  <Video className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-xl font-extrabold leading-snug text-slate-900">
                  {L({ id: 'Video Edukasi Persiapan Operasi', en: 'Surgery Preparation Education Video' })}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600">
                  {L({
                    id: 'Tiga bab singkat tentang puasa, persiapan di kamar rawat, dan perawatan setelah tindakan.',
                    en: 'Three short chapters on fasting, ward preparation, and care after the procedure.',
                  })}
                </p>
                <ul className="mt-5 space-y-2.5 border-t border-slate-200 pt-5">
                  {BAB.map((b, i) => (
                    <li key={b.judul.id} className="flex items-start gap-2.5 text-base leading-snug text-slate-700">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-sky-200 bg-white text-xs font-extrabold text-sky-700">
                        {i + 1}
                      </span>
                      <span>
                        {L(b.judul)}{' '}
                        <span className="font-semibold text-slate-500">· {menitDetik(b.detik)}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => {
                    setDetik(0);
                    setMain(true);
                    setModal('video');
                  }}
                  className="mt-7 inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-sky-600 bg-white px-5 py-3.5 text-lg font-extrabold text-sky-700 transition-colors hover:bg-sky-50 active:scale-[0.98]"
                >
                  <Play className="h-5 w-5 shrink-0" />
                  {L({ id: 'Putar Video Edukasi', en: 'Play Education Video' })}
                </button>
              </article>

              {/* KARTU 3: pantauan ruang tunggu keluarga */}
              <article className="flex h-full flex-col rounded-2xl border-2 border-sky-200 bg-white p-7 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-md shadow-sky-600/25">
                    <Monitor className="h-7 w-7" />
                  </span>
                  <span className="mt-2 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-emerald-700">
                    <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    {L({ id: 'Live', en: 'Live' })}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-extrabold leading-snug text-slate-900">
                  {L({ id: 'Waiting Lounge Keluarga', en: 'Family Waiting Lounge' })}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600">
                  {L({
                    id: 'Layar pantau di ruang tunggu Lt 3 menampilkan fase tiap kamar. Keluarga cukup menunggu hingga status berubah menjadi siap dijenguk.',
                    en: 'The screen in the Level 3 waiting lounge shows the phase of each theatre. Families simply wait until the status turns ready for visitors.',
                  })}
                </p>

                <ul className="mt-5 space-y-3 border-t border-slate-200 pt-5">
                  {RUANGAN.map((r) => {
                    const idx = (r.mulai + tik) % STATUS.length;
                    const s = STATUS[idx];
                    return (
                      <li key={r.kamar} className="flex items-center justify-between gap-3">
                        <span>
                          <span className="block text-base font-extrabold text-slate-900">{r.kamar}</span>
                          <span className="block text-sm font-semibold text-slate-500">{L(r.tindakan)}</span>
                        </span>
                        <span className={`shrink-0 rounded-full border px-3 py-1 text-xs font-extrabold uppercase tracking-wide ${s.pill}`}>
                          {L(s.teks)}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <p className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-4 text-sm font-bold text-slate-500">
                  <Clock className="h-4 w-4 shrink-0 text-sky-600" />
                  {L({ id: 'Diperbarui', en: 'Updated' })} {jam ?? '-'}
                </p>
              </article>
            </div>

            <p className="mt-8 flex items-start gap-2.5 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-base leading-relaxed text-slate-600">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-sky-600" />
              {L({
                id: 'Nilai pada brosur adalah estimasi awal dan pantauan ruang tunggu merupakan contoh tampilan. Konfirmasi biaya final diberikan setelah konsultasi dokter spesialis bedah (DPJP).',
                en: 'Figures in the brochure are initial estimates and the waiting-lounge board is a demonstration. The final cost confirmation follows the surgeon (DPJP) consultation.',
              })}
            </p>
          </div>
        </div>
      </section>

      {/* ================= MODAL: VIDEO EDUKASI ================= */}
      <AnimatePresence>
        {modal === 'video' && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center bg-slate-50/80 p-4 backdrop-blur-md sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setModal(null);
              setMain(false);
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="judulVideo"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-7 shadow-2xl sm:p-9"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-sky-50 text-sky-700">
                    <Video className="h-6 w-6" />
                  </span>
                  <div>
                    <p id="judulVideo" className="text-2xl font-extrabold leading-snug text-slate-900">
                      {L({ id: 'Persiapan Operasi untuk Keluarga', en: 'Surgery Preparation for Families' })}
                    </p>
                    <p className="mt-0.5 text-sm font-bold text-slate-500">
                      {L({ id: 'Instalasi Bedah Sentral · durasi', en: 'Central Operating Theatre · duration' })} {menitDetik(DURASI)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setModal(null);
                    setMain(false);
                  }}
                  aria-label={L({ id: 'Tutup', en: 'Close' })}
                  className="rounded-full border border-slate-200 bg-slate-50 p-2 text-slate-500 transition-colors hover:bg-white hover:text-slate-900"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Pemutar: kerangka terang dengan batang kemajuan berjalan */}
              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                <div className="flex aspect-video w-full flex-col items-center justify-center gap-4 px-6 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-slate-200 bg-white text-sky-700 shadow-md">
                    {main ? <Pause className="h-7 w-7" /> : <Play className="h-7 w-7" />}
                  </span>
                  <p className="text-lg font-extrabold text-slate-900">
                    {detik === 0
                      ? L({ id: 'Tekan putar untuk memulai', en: 'Press play to start' })
                      : detik >= DURASI
                        ? L({ id: 'Video selesai diputar', en: 'Video finished' })
                        : L(BAB.find((b, i) => b.detik <= detik && (i === BAB.length - 1 || BAB[i + 1].detik > detik))!.judul)}
                  </p>
                  <p className="flex items-center gap-2 text-sm font-bold text-slate-500">
                    <Images className="h-4 w-4 shrink-0" />
                    {L({
                      id: 'Contoh tampilan pemutar, berkas video asli diputar di ruang tunggu dan diberikan lewat pesan singkat.',
                      en: 'Player mock-up, the original file is screened in the waiting lounge and sent by text message.',
                    })}
                  </p>
                </div>

                <div className="flex items-center gap-4 border-t border-slate-200 bg-white px-5 py-4">
                  <button
                    type="button"
                    onClick={() => setMain((m) => !m)}
                    aria-label={main ? L({ id: 'Jeda', en: 'Pause' }) : L({ id: 'Putar', en: 'Play' })}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sky-600 text-white transition-colors hover:bg-sky-700"
                  >
                    {main ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </button>
                  <span className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
                    <span className="block h-full rounded-full bg-sky-600 transition-all duration-1000" style={{ width: `${persen}%` }} />
                  </span>
                  <span className="shrink-0 text-sm font-extrabold tabular-nums text-slate-700">
                    {menitDetik(detik)} / {menitDetik(DURASI)}
                  </span>
                </div>
              </div>

              {/* Pilih bab */}
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {BAB.map((b, i) => {
                  const aktif = detik >= b.detik && (i === BAB.length - 1 || detik < BAB[i + 1].detik);
                  return (
                    <button
                      key={b.judul.id}
                      type="button"
                      onClick={() => {
                        setDetik(b.detik);
                        setMain(true);
                      }}
                      className={`rounded-2xl border p-4 text-left transition-all ${
                        aktif
                          ? 'border-sky-500 bg-sky-50 ring-2 ring-sky-500/20'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <span className="block text-sm font-extrabold uppercase tracking-wide text-sky-700">
                        {L({ id: `Bab ${i + 1}`, en: `Chapter ${i + 1}` })} · {menitDetik(b.detik)}
                      </span>
                      <span className="mt-1 block text-base font-bold leading-snug text-slate-900">{L(b.judul)}</span>
                    </button>
                  );
                })}
              </div>

              <p className="mt-6 flex items-start gap-2.5 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-base leading-relaxed text-slate-600">
                <Users className="mt-0.5 h-5 w-5 shrink-0 text-sky-600" />
                {L({
                  id: 'Pendamping pasien dapat mengikuti edukasi ulang bersama perawat ruangan sebelum pasien dipindahkan ke kamar operasi.',
                  en: 'Patient companions can repeat the education with the ward nurse before the patient is moved to the theatre.',
                })}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RuangOperasiWidgets;
