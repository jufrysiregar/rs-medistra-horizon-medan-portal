'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BookOpen,
  Calendar,
  Check,
  ChevronDown,
  ClipboardList,
  Download,
  FileText,
  HelpCircle,
  Info,
  RotateCcw,
  Send,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import type { Language } from '../../../types';

/** Sepasang teks ID/EN; dipilih dengan [lang] supaya semua data tinggal di satu tempat. */
type Teks = { id: string; en: string };

/* ------------------------------ DATA WIDGET ------------------------------ */

/** Panduan puasa & pembilasan dibagikan sebagai PDF statis (public/files). */
const PDF_PANDUAN = '/files/panduan-endoskopi.pdf';

/** Isi ringkas panduan yang bisa dibaca keluarga sebelum mengunduh. */
const ISI_PANDUAN: Teks[] = [
  { id: 'Jadwal puasa makanan dan minuman sesuai jam tindakan', en: 'Fasting schedule for food and drink, matched to the procedure time' },
  { id: 'Protokol pembilasan usus untuk kolonoskopi (H-1 sampai hari H)', en: 'Bowel clearing protocol for colonoscopy (day before and day of)' },
  { id: 'Daftar obat yang perlu ditahan dan yang tetap diminum', en: 'Which medicines to hold and which to keep taking' },
  { id: 'Aturan pendamping, transportasi, dan larangan menyetir 24 jam', en: 'Escort rule, transport, and the 24-hour no-driving rule' },
];

/** Enam jenis prosedur yang bisa diajukan lewat form. */
const PROSEDUR_OPTS: { kode: string; label: Teks }[] = [
  { kode: 'egd', label: { id: 'Gastroskopi (EGD)', en: 'Gastroscopy (EGD)' } },
  { kode: 'kolon', label: { id: 'Kolonoskopi', en: 'Colonoscopy' } },
  { kode: 'ercp', label: { id: 'ERCP', en: 'ERCP' } },
  { kode: 'bronko', label: { id: 'Bronkoskopi', en: 'Bronchoscopy' } },
  { kode: 'eus', label: { id: 'Endosonografi (EUS)', en: 'Endoscopic Ultrasound (EUS)' } },
  { kode: 'kapsul', label: { id: 'Kapsul Endoskopi', en: 'Capsule Endoscopy' } },
];

/** Unit endoskopi berjalan Senin-Jumat; dua blok waktu dalam satu hari. */
const HARI: { kode: string; hari: Teks }[] = [
  { kode: 'sen', hari: { id: 'Senin', en: 'Monday' } },
  { kode: 'sel', hari: { id: 'Selasa', en: 'Tuesday' } },
  { kode: 'rab', hari: { id: 'Rabu', en: 'Wednesday' } },
  { kode: 'kam', hari: { id: 'Kamis', en: 'Thursday' } },
  { kode: 'jum', hari: { id: 'Jumat', en: 'Friday' } },
];

const SESI: { kode: string; nama: Teks; jam: string }[] = [
  { kode: 'pagi', nama: { id: 'Sesi Pagi', en: 'Morning session' }, jam: '07.30 - 11.00' },
  { kode: 'siang', nama: { id: 'Sesi Siang', en: 'Midday session' }, jam: '11.00 - 15.30' },
];

/** Enam pertanyaan yang paling sering ditanyakan keluarga. */
const FAQ: { q: Teks; a: Teks }[] = [
  {
    q: { id: 'Apakah endoskopi sakit?', en: 'Does endoscopy hurt?' },
    a: {
      id: 'Dengan sedasi, pasien tertidur ringan dan tidak merasakan nyeri selama tindakan berlangsung. Setelah selesai, yang tersisa biasanya hanya rasa ngantuk dan sedikit kembung karena udara yang masuk selama prosedur, dan itu hilang dalam beberapa jam.',
      en: 'With sedation the patient sleeps lightly and feels no pain during the procedure. Afterwards the only leftovers are usually sleepiness and a slight bloating from the air that entered, and both pass within a few hours.',
    },
  },
  {
    q: { id: 'Boleh langsung menyetir setelah tindakan?', en: 'Can I drive straight after the procedure?' },
    a: {
      id: 'Tidak. Efek sedasi dapat bertahan sampai 24 jam meski pasien sudah merasa sadar penuh. Pasien wajib dijemput pendamping dewasa, tidak boleh menyetir, menandatangani dokumen penting, atau mengoperasikan mesin sampai hari berikutnya.',
      en: 'No. Sedation effects can last up to 24 hours even when the patient feels fully awake. An adult escort must pick the patient up, and driving, signing important documents or operating machinery is not allowed until the next day.',
    },
  },
  {
    q: { id: 'Berapa lama prosedurnya?', en: 'How long does the procedure take?' },
    a: {
      id: 'Gastroskopi biasanya 10-15 menit, kolonoskopi 30-45 menit, ERCP bisa sampai 90 menit. Bila ditemukan polip atau sumber perdarahan, dokter dapat langsung menanganinya pada sesi yang sama sehingga tidak perlu mengulang persiapan.',
      en: 'Gastroscopy takes 10-15 minutes, colonoscopy 30-45 minutes, ERCP up to 90 minutes. If a polyp or bleeding source is found, the doctor can treat it in the same session so the preparation does not need to be repeated.',
    },
  },
  {
    q: { id: 'Kapan hasil biopsi keluar?', en: 'When do biopsy results arrive?' },
    a: {
      id: 'Pemeriksaan visual langsung dijelaskan dokter sesaat setelah tindakan. Hasil laboratorium patologi anatomi dari sampel biopsi umumnya keluar dalam 3-7 hari kerja dan disampaikan lewat aplikasi kontrol, telepon, atau kunjungan ulang.',
      en: 'The visual finding is explained by the doctor right after the procedure. Anatomical pathology results from the biopsy sample usually arrive in 3-7 working days and are shared through the follow-up app, by phone, or at a revisit.',
    },
  },
  {
    q: { id: 'Apakah harus puasa? Berapa lama?', en: 'Do I have to fast? For how long?' },
    a: {
      id: 'Makan padat dihentikan 6-8 jam sebelum tindakan; air putih sedikit masih boleh sampai 2 jam sebelum. Untuk kolonoskopi, ditambahkan protokol pembilasan usus dengan cairan pencairan pada H-1. Rincian lengkapnya ada di panduan PDF di kolom sebelah.',
      en: 'Solid food stops 6-8 hours before the procedure; small sips of water are allowed until 2 hours before. For colonoscopy, a bowel clearing protocol with a flushing fluid is added the day before. The full details are in the PDF guide in the next column.',
    },
  },
  {
    q: { id: 'Boleh lanjut minum obat rutin?', en: 'Can I keep taking my routine medicines?' },
    a: {
      id: 'Obat darah tinggi dan jantung umumnya tetap diminum pagi hari dengan sedikit air. Pengencer darah (warfarin, clopidogrel, aspirin dosis tinggi) dan obat diabetes tertentu perlu diatur atau dihentikan sementara; diskusikan dengan dokter penanggung jawab 7 hari sebelum jadwal.',
      en: 'Blood pressure and heart medicines are usually still taken on the morning with a small sip of water. Blood thinners (warfarin, clopidogrel, high-dose aspirin) and certain diabetes drugs need to be adjusted or held temporarily; discuss with the doctor in charge 7 days before the date.',
    },
  },
];

/* --------------------------------- PANEL --------------------------------- */

/**
 * PANEL INTERAKTIF ENDOSKOPI — satu panel besar tiga kolom: unduh panduan puasa
 * dan pembilasan, formulir pengajuan jadwal tindakan, dan FAQ endoskopi. Semuanya
 * lokal di halaman ini dan tetap terang supaya modal atau form situs gelap lain
 * tidak ikut berubah.
 */
const EndoskopiWidgets: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (teks: Teks) => teks[lang];

  /* ------------------------ 1. BOOKING JADWAL ------------------------ */
  const [nama, setNama] = useState('');
  const [rm, setRm] = useState('');
  const [telp, setTelp] = useState('');
  const [jenis, setJenis] = useState<string>('');
  const [hari, setHari] = useState<string>('');
  const [sesi, setSesi] = useState<string>('');
  const [catatan, setCatatan] = useState('');
  const [galat, setGalat] = useState('');
  const [terkirim, setTerkirim] = useState(false);

  const jenisTerpilih = PROSEDUR_OPTS.find((p) => p.kode === jenis);
  const hariTerpilih = HARI.find((h) => h.kode === hari);
  const sesiTerpilih = SESI.find((s) => s.kode === sesi);

  const kirim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim()) {
      setGalat(L({ id: 'Nama pasien belum diisi.', en: 'The patient name is not filled in.' }));
      return;
    }
    if (telp.trim().replace(/\D/g, '').length < 9) {
      setGalat(L({ id: 'Nomor telepon belum benar.', en: 'The phone number is not valid yet.' }));
      return;
    }
    if (!jenis) {
      setGalat(L({ id: 'Pilih jenis prosedur lebih dulu.', en: 'Choose the type of procedure first.' }));
      return;
    }
    if (!hari || !sesi) {
      setGalat(L({ id: 'Pilih hari dan sesi terlebih dahulu.', en: 'Choose a day and a session first.' }));
      return;
    }
    setGalat('');
    setTerkirim(true);
  };

  const reset = () => {
    setNama('');
    setRm('');
    setTelp('');
    setJenis('');
    setHari('');
    setSesi('');
    setCatatan('');
    setGalat('');
    setTerkirim(false);
  };

  /* --------------------------- 2. FAQ accordion --------------------------- */
  const [faqBuka, setFaqBuka] = useState<number | null>(0);

  const inputCls =
    'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20';
  const labelCls = 'block text-sm font-extrabold uppercase tracking-wide text-slate-500';

  return (
    <section id="layanan-mandiri" className="scroll-mt-28 bg-white py-20">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
          {L({ id: 'Layanan Mandiri untuk Pasien Endoskopi', en: 'Self-Service for Endoscopy Patients' })}
        </h2>
        <div className="mt-5 h-px w-full bg-slate-200" />

        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
          {L({
            id: 'Unduh panduan puasa dan pembilasan, ajukan jadwal tindakan, dan baca pertanyaan yang paling sering ditanyakan keluarga sebelum hari H.',
            en: 'Download the fasting and bowel-clearing guide, request a procedure date, and read the questions families ask most before the big day.',
          })}
        </p>

        {/* ================= PANEL BESAR 3 KOLOM ================= */}
        <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-lg sm:p-10">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* ---------------- KOLOM 1: PANDUAN PDF ---------------- */}
            <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-indigo-100 bg-indigo-50 text-indigo-700">
                <BookOpen className="h-7 w-7" />
              </span>
              <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-900">
                {L({ id: 'Panduan Puasa & Pembilasan', en: 'Fasting and Bowel-Clearing Guide' })}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {L({
                  id: 'Satu lembar PDF untuk ditempel di kulkas: kapan berhenti makan, bagaimana meminum cairan pencairan, dan apa yang harus dibawa ke unit.',
                  en: 'A one-page PDF to stick on the fridge: when to stop eating, how to drink the clearing fluid, and what to bring to the unit.',
                })}
              </p>

              <ul className="mt-6 space-y-3">
                {ISI_PANDUAN.map((i) => (
                  <li key={i.id} className="flex items-start gap-3">
                    <FileText className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
                    <span className="text-base leading-relaxed text-slate-700">{L(i)}</span>
                  </li>
                ))}
              </ul>

              <a
                href={PDF_PANDUAN}
                download
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3.5 text-lg font-extrabold text-white shadow-md shadow-indigo-600/25 transition-all hover:bg-indigo-700 active:scale-[0.98]"
              >
                <Download className="h-5 w-5 shrink-0" />
                {L({ id: 'Unduh PDF Panduan', en: 'Download the Guide PDF' })}
              </a>

              <p className="mt-4 flex items-start gap-2.5 text-sm font-semibold leading-relaxed text-slate-600">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
                {L({
                  id: 'Salinan cetak juga tersedia di meja perawat Lt 2 dan dibacakan bersama sebelum pasien pulang setelah konsultasi.',
                  en: 'A printed copy is also available at the nurse desk on level 2 and is read together before the patient leaves after the consultation.',
                })}
              </p>
            </article>

            {/* ---------------- KOLOM 2: BOOKING JADWAL ---------------- */}
            <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-indigo-100 bg-indigo-50 text-indigo-700">
                <Calendar className="h-7 w-7" />
              </span>
              <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-900">
                {L({ id: 'Booking Jadwal Endoskopi', en: 'Book an Endoscopy Slot' })}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {L({
                  id: 'Isi pengajuan tanggal dan sesi. Perawat unit akan mengonfirmasi kelayakan medis dan ketersediaan ruang lewat telepon sebelum jadwal dianggap tetap.',
                  en: 'Fill in the date and session request. The unit nurse confirms medical eligibility and room availability by phone before the date is considered final.',
                })}
              </p>

              {terkirim ? (
                <div className="mt-6 flex h-full flex-col rounded-2xl border border-indigo-200 bg-indigo-50 p-6">
                  <p className="flex items-center gap-2 text-lg font-extrabold text-indigo-900">
                    <Check className="h-5 w-5 shrink-0" />
                    {L({ id: 'Pengajuan tercatat', en: 'Request recorded' })}
                  </p>
                  <dl className="mt-5 space-y-2.5 text-base text-indigo-900">
                    <div className="flex justify-between gap-4">
                      <dt className="font-bold">{L({ id: 'Nama', en: 'Name' })}</dt>
                      <dd className="text-right font-extrabold">{nama}</dd>
                    </div>
                    {rm.trim() && (
                      <div className="flex justify-between gap-4">
                        <dt className="font-bold">{L({ id: 'No. RM', en: 'MR number' })}</dt>
                        <dd className="text-right font-extrabold">{rm}</dd>
                      </div>
                    )}
                    <div className="flex justify-between gap-4">
                      <dt className="font-bold">{L({ id: 'Prosedur', en: 'Procedure' })}</dt>
                      <dd className="text-right font-extrabold">{jenisTerpilih ? L(jenisTerpilih.label) : ''}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="font-bold">{L({ id: 'Diajukan untuk', en: 'Requested for' })}</dt>
                      <dd className="text-right font-extrabold">
                        {hariTerpilih ? L(hariTerpilih.hari) : ''}
                        {sesiTerpilih ? ` · ${L(sesiTerpilih.nama)} (${sesiTerpilih.jam})` : ''}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="font-bold">{L({ id: 'Kontak', en: 'Contact' })}</dt>
                      <dd className="text-right font-extrabold">{telp}</dd>
                    </div>
                  </dl>
                  {catatan.trim() && (
                    <p className="mt-4 rounded-xl border border-indigo-200 bg-white px-4 py-3 text-base leading-relaxed text-indigo-900">
                      {catatan}
                    </p>
                  )}
                  <p className="mt-5 flex items-start gap-2.5 text-sm font-semibold leading-relaxed text-indigo-800">
                    <Info className="mt-0.5 h-4 w-4 shrink-0" />
                    {L({
                      id: 'Formulir ini contoh tampilan di peramban Anda dan belum terkirim ke sistem rumah sakit. Untuk jadwal resmi, hubungi unit endoskopi lewat nomor di kartu kontrol.',
                      en: 'This form is a browser-side demonstration and has not been sent to the hospital system. For an official date, contact the endoscopy unit on the number printed on your control card.',
                    })}
                  </p>
                  <button
                    type="button"
                    onClick={reset}
                    className="mt-auto inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-indigo-600 bg-white px-5 py-3 text-base font-extrabold text-indigo-700 transition-colors hover:bg-indigo-50 active:scale-[0.98]"
                  >
                    <RotateCcw className="h-4 w-4 shrink-0" />
                    {L({ id: 'Ajukan jadwal lain', en: 'Request another date' })}
                  </button>
                </div>
              ) : (
                <form onSubmit={kirim} className="mt-6 flex h-full flex-col gap-5" noValidate>
                  <div>
                    <label className={labelCls} htmlFor="end-nama">
                      {L({ id: 'Nama lengkap pasien', en: 'Patient full name' })}
                    </label>
                    <input
                      id="end-nama"
                      className={`${inputCls} mt-2`}
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      placeholder={L({ id: 'Sesuai KTP', en: 'As written on the ID card' })}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className={labelCls} htmlFor="end-rm">
                        {L({ id: 'No. Rekam Medis', en: 'Medical record number' })}
                      </label>
                      <input
                        id="end-rm"
                        className={`${inputCls} mt-2`}
                        value={rm}
                        onChange={(e) => setRm(e.target.value)}
                        placeholder={L({ id: 'Opsional', en: 'Optional' })}
                      />
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="end-telp">
                        {L({ id: 'Nomor telepon aktif', en: 'Active phone number' })}
                      </label>
                      <input
                        id="end-telp"
                        className={`${inputCls} mt-2`}
                        value={telp}
                        onChange={(e) => setTelp(e.target.value)}
                        inputMode="tel"
                        placeholder="0812xxxxxxxx"
                      />
                    </div>
                  </div>

                  <div>
                    <span className={labelCls}>{L({ id: 'Jenis prosedur', en: 'Type of procedure' })}</span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {PROSEDUR_OPTS.map((p) => {
                        const aktif = jenis === p.kode;
                        return (
                          <button
                            key={p.kode}
                            type="button"
                            aria-pressed={aktif}
                            onClick={() => {
                              setJenis(p.kode);
                              setGalat('');
                            }}
                            className={
                              'rounded-full border px-4 py-2 text-sm font-bold transition-colors ' +
                              (aktif
                                ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm'
                                : 'border-slate-300 bg-white text-slate-700 hover:border-indigo-400 hover:text-indigo-700')
                            }
                          >
                            {L(p.label)}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <span className={labelCls}>{L({ id: 'Hari (Senin-Jumat)', en: 'Day (Monday-Friday)' })}</span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {HARI.map((h) => {
                        const aktif = hari === h.kode;
                        return (
                          <button
                            key={h.kode}
                            type="button"
                            aria-pressed={aktif}
                            onClick={() => {
                              setHari(h.kode);
                              setGalat('');
                            }}
                            className={
                              'rounded-full border px-4 py-2 text-sm font-bold transition-colors ' +
                              (aktif
                                ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm'
                                : 'border-slate-300 bg-white text-slate-700 hover:border-indigo-400 hover:text-indigo-700')
                            }
                          >
                            {L(h.hari)}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <span className={labelCls}>{L({ id: 'Sesi tindakan', en: 'Procedure session' })}</span>
                    <div className="mt-2 grid grid-cols-1 gap-2">
                      {SESI.map((s) => {
                        const aktif = sesi === s.kode;
                        return (
                          <button
                            key={s.kode}
                            type="button"
                            aria-pressed={aktif}
                            onClick={() => {
                              setSesi(s.kode);
                              setGalat('');
                            }}
                            className={
                              'flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm font-bold transition-colors ' +
                              (aktif
                                ? 'border-indigo-600 bg-indigo-50 text-indigo-800'
                                : 'border-slate-300 bg-white text-slate-700 hover:border-indigo-400')
                            }
                          >
                            <span className="flex items-center gap-2">
                              <ClipboardList className="h-4 w-4 shrink-0" />
                              {L(s.nama)}
                            </span>
                            <span className="shrink-0 text-xs font-bold tracking-wide text-slate-600">{s.jam}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className={labelCls} htmlFor="end-catatan">
                      {L({ id: 'Catatan untuk perawat (opsional)', en: 'Notes for the nurse (optional)' })}
                    </label>
                    <textarea
                      id="end-catatan"
                      className={`${inputCls} mt-2 min-h-[92px] resize-y`}
                      value={catatan}
                      onChange={(e) => setCatatan(e.target.value)}
                      placeholder={L({
                        id: 'Contoh: sedang minum pengencer darah, alergi obat tertentu, atau butuh pendamping lansia.',
                        en: 'For example: taking blood thinners, drug allergies, or an elderly escort.',
                      })}
                    />
                  </div>

                  {galat && (
                    <p
                      role="alert"
                      className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-bold text-amber-800"
                    >
                      {galat}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="mt-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3.5 text-lg font-extrabold text-white shadow-md shadow-indigo-600/25 transition-all hover:bg-indigo-700 active:scale-[0.98]"
                  >
                    <Send className="h-5 w-5 shrink-0" />
                    {L({ id: 'Kirim pengajuan jadwal', en: 'Send schedule request' })}
                  </button>
                </form>
              )}
            </article>

            {/* ---------------- KOLOM 3: FAQ ACCORDION ---------------- */}
            <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-indigo-100 bg-indigo-50 text-indigo-700">
                <HelpCircle className="h-7 w-7" />
              </span>
              <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-900">
                {L({ id: 'FAQ Endoskopi', en: 'Endoscopy FAQ' })}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {L({
                  id: 'Enam pertanyaan yang paling sering ditanyakan pasien dan keluarga. Klik satu baris untuk membuka jawabannya.',
                  en: 'The six questions patients and families ask the most. Tap one line to open the answer.',
                })}
              </p>

              <ul className="mt-6 flex-1 space-y-3">
                {FAQ.map((f, i) => {
                  const buka = faqBuka === i;
                  return (
                    <li key={f.q.id} className="rounded-xl border border-slate-200 bg-slate-50">
                      <button
                        type="button"
                        aria-expanded={buka}
                        aria-controls={`faq-panel-${i}`}
                        id={`faq-btn-${i}`}
                        onClick={() => setFaqBuka(buka ? null : i)}
                        className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left text-base font-extrabold text-slate-900 hover:text-indigo-700"
                      >
                        <span>{L(f.q)}</span>
                        <ChevronDown
                          className={
                            'h-5 w-5 shrink-0 text-indigo-600 transition-transform duration-300 ' +
                            (buka ? 'rotate-180' : '')
                          }
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {buka && (
                          <motion.div
                            key="panel"
                            id={`faq-panel-${i}`}
                            role="region"
                            aria-labelledby={`faq-btn-${i}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <p className="border-t border-slate-200 px-4 py-3.5 text-base leading-relaxed text-slate-600">
                              {L(f.a)}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>

              <p className="mt-5 flex items-start gap-2.5 text-sm font-semibold leading-relaxed text-slate-600">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
                {L({
                  id: 'Jawaban di sini bersifat edukasi umum. Kondisi tiap pasien berbeda; ikuti instruksi tertulis dari dokter penanggung jawab.',
                  en: 'The answers here are general education. Every patient is different; follow the written instruction from the doctor in charge.',
                })}
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EndoskopiWidgets;
