'use client';

import React, { useState } from 'react';
import {
  CalendarCheck,
  Check,
  Clock,
  Download,
  FileText,
  Gauge,
  Info,
  RotateCcw,
  Send,
  Users,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import type { Language } from '../../../types';

/** Sepasang teks ID/EN; dipilih dengan [lang] supaya semua data tinggal di satu tempat. */
type Teks = { id: string; en: string };
type Ikon = React.ComponentType<{ className?: string }>;

/* ------------------------------ DATA WIDGET ------------------------------ */

/** Panduan latihan & peregangan di rumah, dibagikan sebagai PDF statis (public/files). */
const PDF_LATIHAN = '/files/panduan-fisioterapi.pdf';

/** Isi ringkas panduan, supaya pasien tahu gerakan apa yang akan ia praktikkan. */
const ISI_PANDUAN: Teks[] = [
  { id: 'Pemanasan 5 menit sebelum peregangan dimulai', en: 'A 5 minute warm up before any stretching' },
  { id: 'Rangkaian peregangan leher, bahu, punggung bawah, dan betis', en: 'Stretches for the neck, shoulder, lower back and calf' },
  { id: 'Jumlah pengulangan, frekuensi harian, dan batas aman', en: 'Repetition count, daily frequency and the safe limit' },
  { id: 'Tanda harus berhenti dan menghubungi fisioterapis', en: 'Signs to stop and contact your physiotherapist' },
];

/** Enam area terapi (selaras dengan bagian Jenis Terapi) + opsi konsultasi. */
const TERAPI_OPTS: Teks[] = [
  { id: 'Rehab Muskuloskeletal (Tulang & Otot)', en: 'Musculoskeletal Rehabilitation' },
  { id: 'Rehab Neurologi (Stroke & Saraf)', en: 'Neurological Rehabilitation' },
  { id: 'Cedera Olahraga / pasca ACL', en: 'Sports Injury / post ACL' },
  { id: 'Kardiorespirasi (Jantung & Paru)', en: 'Cardiorespiratory (Heart & Lungs)' },
  { id: 'Pediatri (Anak)', en: 'Paediatric (Children)' },
  { id: 'Geriatri (Lansia)', en: 'Geriatric (Older Adults)' },
  { id: 'Belum ditentukan, minta rekomendasi Sp.KFR', en: 'Not decided yet, ask the specialist for a recommendation' },
];

/** Unit berjalan Senin-Sabtu 08.00-20.00; tujuh blok waktu layanan. */
const JAM: string[] = ['08.00', '09.30', '11.00', '13.00', '15.00', '16.30', '18.00'];

/** Tiga pita skala nyeri: nama, warna, dan saran tindak lanjut. */
const PITA: { nama: Teks; kotak: string; bar: string; saran: Teks }[] = [
  {
    nama: { id: 'Nyeri ringan', en: 'Mild pain' },
    kotak: 'border-orange-200 bg-orange-50 text-orange-900',
    bar: 'bg-orange-400',
    saran: {
      id: 'Masih dalam batas nyaman. Lanjutkan home exercise yang diajarkan fisioterapis, tambahkan kompres hangat, dan jaga posisi duduk tetap tegak. Catat gerakan yang mulai terasa mengganjal.',
      en: 'Still within comfort. Continue the home exercises taught by your physiotherapist, add a warm compress and keep an upright sitting posture. Note which movements start to feel wrong.',
    },
  },
  {
    nama: { id: 'Nyeri sedang', en: 'Moderate pain' },
    kotak: 'border-amber-200 bg-amber-50 text-amber-900',
    bar: 'bg-amber-400',
    saran: {
      id: 'Nyeri mulai mengganggu aktivitas harian. Habiskan sesi yang sudah dijadwalkan dan sampaikan angka ini pada fisioterapis di pertemuan berikutnya. Jangan menambah beban atau durasi latihan sendiri.',
      en: 'Pain is starting to disturb daily activity. Keep the scheduled sessions and report this number to your physiotherapist at the next visit. Do not add load or duration on your own.',
    },
  },
  {
    nama: { id: 'Nyeri berat', en: 'Severe pain' },
    kotak: 'border-rose-200 bg-rose-50 text-rose-900',
    bar: 'bg-rose-500',
    saran: {
      id: 'Segera konsultasi jika nyeri > 6. Hubungi unit fisioterapi atau datang untuk penilaian ulang oleh Sp.KFR sebelum sesi berikutnya dijalankan, supaya program tidak dilanjutkan di atas nyeri yang salah tafsir.',
      en: 'Consult immediately if pain is above 6. Contact the physiotherapy unit or come for a re-assessment by the rehabilitation specialist before the next session, so the programme is not continued on top of a misread pain.',
    },
  },
];

/** Tanda yang membuat pasien tidak menunggu jadwal sesi berikutnya. */
const TANDA: { teks: Teks; ikon: Ikon }[] = [
  { teks: { id: 'Kesemutan, kebas, atau kelemahan baru yang memberat', en: 'New tingling, numbness or growing weakness' }, ikon: Check },
  { teks: { id: 'Bengkak merah hangat pada sendi yang sedang diterapi', en: 'A swollen, red, warm joint that is being treated' }, ikon: Check },
  { teks: { id: 'Nyeri malam yang membangunkan sampai tidak bisa tidur', en: 'Night pain that wakes you up and stops you sleeping' }, ikon: Check },
];

/* --------------------------------- PANEL --------------------------------- */

/**
 * PANEL FISIOTERAPI — satu panel tiga kolom: booking sesi online, unduh panduan
 * latihan di rumah, dan kalkulator skala nyeri berbasis slider. Semua berjalan di
 * peramban; tidak ada nilai yang bergantung pada jam server sehingga render awal
 * HTML sama dengan hasil setelah hidrasi.
 */
const FisioterapiWidgets: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (teks: Teks) => teks[lang];

  /* ----------------------- 1. BOOKING SESI ----------------------- */
  const [nama, setNama] = useState('');
  const [wa, setWa] = useState('');
  const [terapiIdx, setTerapiIdx] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [jam, setJam] = useState('');
  const [galat, setGalat] = useState('');
  const [terkirim, setTerkirim] = useState(false);

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
      setGalat(L({ id: 'Pilih area terapi lebih dulu.', en: 'Choose the therapy area first.' }));
      return;
    }
    if (!tanggal) {
      setGalat(L({ id: 'Tanggal sesi belum dipilih.', en: 'The session date is not chosen yet.' }));
      return;
    }
    const chosen = new Date(`${tanggal}T00:00:00`);
    if (Number.isNaN(chosen.getTime())) {
      setGalat(L({ id: 'Tanggal tidak valid.', en: 'The date is not valid.' }));
      return;
    }
    if (chosen.getDay() === 0) {
      setGalat(L({
        id: 'Unit berjalan Senin sampai Sabtu. Pilih tanggal selain Minggu.',
        en: 'The unit runs Monday to Saturday. Please pick a day other than Sunday.',
      }));
      return;
    }
    if (!jam) {
      setGalat(L({ id: 'Pilih jam sesi lebih dulu.', en: 'Choose a session time first.' }));
      return;
    }
    setGalat('');
    setTerkirim(true);
  };

  const reset = () => {
    setNama('');
    setWa('');
    setTerapiIdx('');
    setTanggal('');
    setJam('');
    setGalat('');
    setTerkirim(false);
  };

  const tanggalPanjang = (t: string) =>
    new Date(`${t}T00:00:00`).toLocaleDateString(lang === 'en' ? 'en-GB' : 'id-ID', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    });

  /* ----------------------- 3. SKALA NYERI ----------------------- */
  const [nyeri, setNyeri] = useState(3);
  const pitaIdx = nyeri <= 3 ? 0 : nyeri <= 6 ? 1 : 2;
  const pita = PITA[pitaIdx];
  const warnaSegmen = (i: number) => (i <= 3 ? PITA[0].bar : i <= 6 ? PITA[1].bar : PITA[2].bar);

  const inputCls =
    'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20';
  const labelCls = 'block text-sm font-extrabold uppercase tracking-wide text-slate-500';

  return (
    <section id="mandiri-fisio" className="scroll-mt-28 bg-white py-20">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
          {L({ id: 'Alat Bantu Latihan & Pemesanan Sesi', en: 'Exercise & Session Booking Tools' })}
        </h2>
        <div className="mt-5 h-px w-full bg-slate-200" />
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
          {L({
            id: 'Pesan tanggal dan jam sesi, unduh panduan gerakan untuk di rumah, dan ukur nyeri Anda hari ini pada skala 1-10 sebelum menelepon unit.',
            en: 'Book a session date and time, download the home movement guide, and measure today\'s pain on a 1-10 scale before you call the unit.',
          })}
        </p>

        {/* ================= PANEL BESAR 3 KOLOM ================= */}
        <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-lg sm:p-10">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* ---------------- KOLOM 1: BOOKING SESI ---------------- */}
            <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-orange-100 bg-orange-50 text-orange-700">
                <CalendarCheck className="h-7 w-7" />
              </span>
              <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-900">
                {L({ id: 'Booking Sesi Fisioterapi Online', en: 'Book a Physiotherapy Session Online' })}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {L({
                  id: 'Pilih tanggal dan jam yang Anda inginkan. Perawat unit menyesuaikan dengan kuota fisioterapis dan instruksi Sp.KFR, lalu mengonfirmasi lewat WhatsApp.',
                  en: 'Pick the date and time you prefer. The unit nurse matches it with physiotherapist capacity and the specialist instruction, then confirms via WhatsApp.',
                })}
              </p>

              {terkirim ? (
                <div className="mt-6 flex flex-1 flex-col rounded-2xl border border-orange-200 bg-orange-50 p-6">
                  <p className="flex items-center gap-2 text-lg font-extrabold text-orange-900">
                    <Check className="h-5 w-5 shrink-0" />
                    {L({ id: 'Pengajuan sesi tercatat', en: 'Session request recorded' })}
                  </p>
                  <dl className="mt-5 space-y-2.5 text-base text-orange-900">
                    <div className="flex justify-between gap-4">
                      <dt className="font-bold">{L({ id: 'Nama', en: 'Name' })}</dt>
                      <dd className="text-right font-extrabold">{nama}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="font-bold">{L({ id: 'WhatsApp', en: 'WhatsApp' })}</dt>
                      <dd className="text-right font-extrabold">{wa}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="font-bold">{L({ id: 'Area terapi', en: 'Therapy area' })}</dt>
                      <dd className="text-right font-extrabold">{TERAPI_OPTS[Number(terapiIdx)] ? L(TERAPI_OPTS[Number(terapiIdx)]) : ''}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="font-bold">{L({ id: 'Diajukan untuk', en: 'Requested for' })}</dt>
                      <dd className="text-right font-extrabold">{tanggalPanjang(tanggal)} · {jam}</dd>
                    </div>
                  </dl>
                  <p className="mt-5 flex items-start gap-2.5 text-sm font-semibold leading-relaxed text-orange-800">
                    <Info className="mt-0.5 h-4 w-4 shrink-0" />
                    {L({
                      id: 'Pengajuan ini contoh tampilan di peramban Anda dan belum terkirim ke sistem rumah sakit. Sesi baru dianggap tetap setelah ada konfirmasi unit.',
                      en: 'This request is a browser-side demonstration and has not been sent to the hospital system. A session only becomes final after the unit confirms it.',
                    })}
                  </p>
                  <button
                    type="button"
                    onClick={reset}
                    className="mt-auto inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-orange-600 bg-white px-5 py-3 text-base font-extrabold text-orange-700 transition-colors hover:bg-orange-50 active:scale-[0.98]"
                  >
                    <RotateCcw className="h-4 w-4 shrink-0" />
                    {L({ id: 'Pesan sesi lain', en: 'Book another session' })}
                  </button>
                </div>
              ) : (
                <form onSubmit={kirim} className="mt-6 flex flex-1 flex-col gap-5" noValidate>
                  <div>
                    <label className={labelCls} htmlFor="fis-nama">
                      {L({ id: 'Nama lengkap pasien', en: 'Patient full name' })}
                    </label>
                    <input
                      id="fis-nama"
                      className={`${inputCls} mt-2`}
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      placeholder={L({ id: 'Sesuai KTP', en: 'As written on the ID card' })}
                    />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="fis-wa">
                      {L({ id: 'Nomor WhatsApp', en: 'WhatsApp number' })}
                    </label>
                    <input
                      id="fis-wa"
                      inputMode="tel"
                      className={`${inputCls} mt-2`}
                      value={wa}
                      onChange={(e) => setWa(e.target.value)}
                      placeholder="08xx xxxx xxxx"
                    />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="fis-terapi">
                      {L({ id: 'Area terapi', en: 'Therapy area' })}
                    </label>
                    <select
                      id="fis-terapi"
                      className={`${inputCls} mt-2`}
                      value={terapiIdx}
                      onChange={(e) => setTerapiIdx(e.target.value)}
                    >
                      <option value="">{L({ id: 'Pilih area terapi', en: 'Select a therapy area' })}</option>
                      {TERAPI_OPTS.map((t, i) => (
                        <option key={t.id} value={i}>{L(t)}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1">
                    <div>
                      <label className={labelCls} htmlFor="fis-tanggal">
                        {L({ id: 'Tanggal sesi', en: 'Session date' })}
                      </label>
                      <input
                        id="fis-tanggal"
                        type="date"
                        className={`${inputCls} mt-2`}
                        value={tanggal}
                        onChange={(e) => setTanggal(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="fis-jam">
                        {L({ id: 'Jam sesi', en: 'Session time' })}
                      </label>
                      <select
                        id="fis-jam"
                        className={`${inputCls} mt-2`}
                        value={jam}
                        onChange={(e) => setJam(e.target.value)}
                      >
                        <option value="">{L({ id: 'Pilih jam', en: 'Select a time' })}</option>
                        {JAM.map((j) => (
                          <option key={j} value={j}>{j}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {galat && (
                    <p role="alert" className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-base font-bold leading-relaxed text-rose-800">
                      {galat}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="mt-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-600 px-5 py-3.5 text-lg font-extrabold text-white shadow-md shadow-orange-600/25 transition-all hover:bg-orange-700 active:scale-[0.98]"
                  >
                    <Send className="h-5 w-5 shrink-0" />
                    {L({ id: 'Ajukan Jadwal Sesi', en: 'Request the Session Slot' })}
                  </button>
                  <p className="flex items-start gap-2.5 text-sm font-semibold leading-relaxed text-slate-600">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" />
                    {L({ id: 'Senin-Sabtu, 08.00 sampai 20.00. Satu sesi 30-60 menit.', en: 'Monday to Saturday, 08.00 until 20.00. One session is 30-60 minutes.' })}
                  </p>
                </form>
              )}
            </article>

            {/* ---------------- KOLOM 2: UNDUH PANDUAN ---------------- */}
            <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-orange-100 bg-orange-50 text-orange-700">
                <FileText className="h-7 w-7" />
              </span>
              <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-900">
                {L({ id: 'Unduh Panduan Latihan', en: 'Download the Exercise Guide' })}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {L({
                  id: 'Lembar peregangan dan gerakan penguatan yang diajarkan di klinik, disusun ulang supaya bisa diikuti keluarga di rumah tanpa pendamping.',
                  en: 'The stretching and strengthening movements taught in the clinic, rewritten so your family can follow them at home without an escort.',
                })}
              </p>

              <ul className="mt-6 space-y-3">
                {ISI_PANDUAN.map((i) => (
                  <li key={i.id} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" />
                    <span className="text-base leading-relaxed text-slate-700">{L(i)}</span>
                  </li>
                ))}
              </ul>

              <a
                href={PDF_LATIHAN}
                download
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-600 px-5 py-3.5 text-lg font-extrabold text-white shadow-md shadow-orange-600/25 transition-all hover:bg-orange-700 active:scale-[0.98]"
              >
                <Download className="h-5 w-5 shrink-0" />
                {L({ id: 'Unduh PDF Panduan', en: 'Download the Guide PDF' })}
              </a>

              <p className="mt-4 flex items-start gap-2.5 text-sm font-semibold leading-relaxed text-slate-600">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" />
                {L({
                  id: 'Gerakan pada panduan ini bersifat umum. Fisioterapis Anda dapat mencoret atau menambah item sesuai program tertulis yang diserahkan saat kontrol.',
                  en: 'The movements in this guide are general. Your physiotherapist may cross out or add items according to the written programme handed over at your review.',
                })}
              </p>
            </article>

            {/* ---------------- KOLOM 3: SKALA NYERI ---------------- */}
            <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-orange-100 bg-orange-50 text-orange-700">
                <Gauge className="h-7 w-7" />
              </span>
              <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-900">
                {L({ id: 'Kalkulator Skala Nyeri', en: 'Pain Scale Calculator' })}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {L({
                  id: 'Geser slider untuk menilai nyeri Anda saat ini dari 1 sampai 10. Angka yang sama dipakai fisioterapis untuk menaikkan atau menahan beban latihan.',
                  en: 'Slide to rate your current pain from 1 to 10. The physiotherapist uses the same number to raise or hold your training load.',
                })}
              </p>

              <div className="mt-6 flex items-end justify-between gap-4">
                <div>
                  <label className={labelCls} htmlFor="fis-nyeri">
                    {L({ id: 'Nyeri saya saat ini', en: 'My pain right now' })}
                  </label>
                  <p className="mt-1 text-5xl font-extrabold leading-none tracking-tight text-slate-900">
                    {nyeri}
                    <span className="text-xl font-bold text-slate-400"> / 10</span>
                  </p>
                </div>
                <span className={`rounded-2xl border px-4 py-2.5 text-base font-extrabold ${pita.kotak}`}>
                  {L(pita.nama)}
                </span>
              </div>

              <input
                id="fis-nyeri"
                type="range"
                min={1}
                max={10}
                step={1}
                value={nyeri}
                onChange={(e) => setNyeri(Number(e.target.value))}
                className="mt-5 w-full accent-orange-600"
                aria-describedby="fis-nyeri-pita"
              />

              <div className="mt-3 flex gap-1" aria-hidden="true">
                {Array.from({ length: 10 }, (_, k) => k + 1).map((i) => (
                  <div
                    key={i}
                    className={`h-2 flex-1 rounded-full ${i <= nyeri ? warnaSegmen(i) : 'bg-slate-200'}`}
                  />
                ))}
              </div>
              <div className="mt-2 flex justify-between text-xs font-bold uppercase tracking-wide text-slate-400" aria-hidden="true">
                <span>{L({ id: '1 · hampir tidak terasa', en: '1 · barely noticeable' })}</span>
                <span>{L({ id: '10 · tak tertahankan', en: '10 · unbearable' })}</span>
              </div>

              <p id="fis-nyeri-pita" className={`mt-6 rounded-2xl border p-5 text-base leading-relaxed ${pita.kotak}`}>
                {L(pita.saran)}
              </p>

              <p className="mt-4 flex items-start gap-2.5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-bold leading-relaxed text-slate-700">
                <Gauge className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" />
                {L({ id: 'Segera konsultasi jika nyeri > 6, atau bila nyeri tidak berubah setelah tiga hari latihan.', en: 'Consult immediately if pain is above 6, or when pain does not change after three days of home exercise.' })}
              </p>

              <ul className="mt-5 space-y-2.5">
                {TANDA.map((t) => (
                  <li key={t.teks.id} className="flex items-start gap-2.5">
                    <t.ikon className="mt-1 h-4 w-4 shrink-0 text-rose-500" />
                    <span className="text-sm leading-relaxed text-slate-700">{L(t.teks)}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-auto pt-5 text-sm font-semibold leading-relaxed text-slate-500">
                <Users className="mr-1 inline h-4 w-4 shrink-0 text-orange-600" />
                {L({
                  id: 'Skala ini alat bantu komunikasi, bukan diagnosis. Bawa angka hari ini saat sesi berikutnya.',
                  en: 'This scale is a communication aid, not a diagnosis. Bring today\'s number to your next session.',
                })}
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FisioterapiWidgets;
