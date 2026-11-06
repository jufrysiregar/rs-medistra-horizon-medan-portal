'use client';

import React, { useMemo, useState } from 'react';
import {
  Calculator,
  Check,
  ClipboardList,
  Clock,
  Download,
  Droplets,
  FileText,
  Info,
  RotateCcw,
  Scale,
  Send,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import type { Language } from '../../../types';

/** Sepasang teks ID/EN; dipilih dengan [lang] supaya semua data tinggal di satu tempat. */
type Teks = { id: string; en: string };

/* ------------------------------ DATA WIDGET ------------------------------ */

/** Brosur panduan sesi pertama dibagikan sebagai PDF statis (public/files). */
const PDF_BROSUR = '/files/brosur-hemodialisa.pdf';

/** Isi brosur yang bisa dibaca keluarga sebelum mengunduh. */
const ISI_BROSUR: Teks[] = [
  { id: 'Yang dibawa dan dilarang sebelum sesi pertama', en: 'What to bring and what to avoid before a first session' },
  { id: 'Penjelasan alat, suara alarm, dan rasa saat darah mengalir', en: 'The equipment, alarm sounds and the feeling of blood flowing' },
  { id: 'Rawat akses Cimino/AVG dan exit site selang di rumah', en: 'Home care of the Cimino/AVG access and catheter exit site' },
  { id: 'Batas cairan, kalium, fosfat, dan tanda bahaya', en: 'Fluid, potassium and phosphate limits, plus warning signs' },
];

/** Dua blok jam operasional unit: Senin/Rabu/Jumat dan Selasa/Kamis/Sabtu. */
type Blok = 'A' | 'B';

const HARI: { kode: string; hari: Teks; blok: Blok }[] = [
  { kode: 'sen', hari: { id: 'Senin', en: 'Monday' }, blok: 'A' },
  { kode: 'rab', hari: { id: 'Rabu', en: 'Wednesday' }, blok: 'A' },
  { kode: 'jum', hari: { id: 'Jumat', en: 'Friday' }, blok: 'A' },
  { kode: 'sel', hari: { id: 'Selasa', en: 'Tuesday' }, blok: 'B' },
  { kode: 'kam', hari: { id: 'Kamis', en: 'Thursday' }, blok: 'B' },
  { kode: 'sab', hari: { id: 'Sabtu', en: 'Saturday' }, blok: 'B' },
];

const SLOT: Record<Blok, { kode: string; nama: Teks; jam: string }[]> = {
  A: [
    { kode: 'pagi', nama: { id: 'Shift Pagi', en: 'Morning shift' }, jam: '06.00 – 10.00' },
    { kode: 'siang', nama: { id: 'Shift Siang', en: 'Midday shift' }, jam: '10.00 – 14.00' },
  ],
  B: [
    { kode: 'sore', nama: { id: 'Shift Sore', en: 'Afternoon shift' }, jam: '13.00 – 17.00' },
    { kode: 'malam', nama: { id: 'Shift Malam', en: 'Evening shift' }, jam: '17.00 – 21.00' },
  ],
};

/** Batas cairan standar edukasi: output urine harian ditambah kehilangan tak terasa. */
const KEHILANGAN_TERSEMBUNYI = 500;

const angka = (teks: string): number | null => {
  const v = Number(String(teks).replace(',', '.'));
  return Number.isFinite(v) && v > 0 ? v : null;
};

const formatCc = (n: number) => `${Math.round(n).toLocaleString('id-ID')} cc`;

/* --------------------------------- PANEL --------------------------------- */

/**
 * PANEL INTERAKTIF HEMODIALISA — satu panel besar tiga kolom: pengajuan jadwal
 * shift HD, kalkulator batas cairan harian (estimasi edukasi), dan unduh brosur
 * panduan sesi pertama. Semuanya lokal di halaman ini dan tetap terang, supaya
 * modal serta form bersama situs yang gelap tidak ikut berubah.
 */
const HemodialisaWidgets: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (teks: Teks) => teks[lang];

  /* ------------------------- 1. Reservasi shift ------------------------- */
  const [nama, setNama] = useState('');
  const [rm, setRm] = useState('');
  const [telp, setTelp] = useState('');
  const [hari, setHari] = useState<string>('');
  const [shift, setShift] = useState<string>('');
  const [catatan, setCatatan] = useState('');
  const [galat, setGalat] = useState('');
  const [terkirim, setTerkirim] = useState(false);

  const hariTerpilih = HARI.find((h) => h.kode === hari);
  const slotTersedia = hariTerpilih ? SLOT[hariTerpilih.blok] : [];
  const slotTerpilih = slotTersedia.find((s) => s.kode === shift);

  const pilihHari = (kode: string) => {
    setHari(kode);
    setShift('');
    setGalat('');
  };

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
    if (!hari || !shift) {
      setGalat(L({ id: 'Pilih hari dan shift terlebih dahulu.', en: 'Choose a day and a shift first.' }));
      return;
    }
    setGalat('');
    setTerkirim(true);
  };

  const reset = () => {
    setNama('');
    setRm('');
    setTelp('');
    setHari('');
    setShift('');
    setCatatan('');
    setGalat('');
    setTerkirim(false);
  };

  /* ------------------------- 2. Kalkulator cairan ------------------------- */
  const [bb, setBb] = useState('');
  const [urine, setUrine] = useState('');

  const hasil = useMemo(() => {
    const berat = angka(bb);
    if (!berat) return null;
    const out = angka(urine) ?? 300;
    return { batas: out + KEHILANGAN_TERSEMBUNYI, naik: (berat * 4) / 100 };
  }, [bb, urine]);

  const inputCls =
    'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20';
  const labelCls = 'block text-sm font-extrabold uppercase tracking-wide text-slate-500';

  return (
    <section id="layanan-mandiri" className="scroll-mt-28 bg-white py-20">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
          {L({ id: 'Layanan Mandiri untuk Pasien Dialisis', en: 'Self-Service for Dialysis Patients' })}
        </h2>
        <div className="mt-5 h-px w-full bg-slate-200" />

        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
          {L({
            id: 'Ajukan jadwal shift, hitung perkiraan batas minum harian, dan unduh panduan sesi pertama tanpa harus menelepon lebih dulu.',
            en: 'Request a shift slot, estimate your daily drinking limit, and download the first-session guide without having to call first.',
          })}
        </p>

        {/* ================= PANEL BESAR 3 KOLOM ================= */}
        <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-lg sm:p-10">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* ---------------- KOLOM 1: RESERVASI SHIFT ---------------- */}
            <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-teal-100 bg-teal-50 text-teal-700">
                <ClipboardList className="h-7 w-7" />
              </span>
              <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-900">
                {L({ id: 'Reservasi Shift HD', en: 'Book a Dialysis Shift' })}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {L({
                  id: 'Isi formulir pengajuan jadwal. Perawat unit akan mengonfirmasi ketersediaan kursi lewat telepon sebelum shift dianggap tetap.',
                  en: 'Fill in the schedule request. The unit nurse confirms seat availability by phone before the shift is considered final.',
                })}
              </p>

              {terkirim ? (
                <div className="mt-6 flex h-full flex-col rounded-2xl border border-teal-200 bg-teal-50 p-6">
                  <p className="flex items-center gap-2 text-lg font-extrabold text-teal-900">
                    <Check className="h-5 w-5 shrink-0" />
                    {L({ id: 'Pengajuan tercatat', en: 'Request recorded' })}
                  </p>
                  <dl className="mt-5 space-y-2.5 text-base text-teal-900">
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
                      <dt className="font-bold">{L({ id: 'Jadwal diajukan', en: 'Requested slot' })}</dt>
                      <dd className="text-right font-extrabold">
                        {hariTerpilih ? L(hariTerpilih.hari) : ''}
                        {slotTerpilih ? ` · ${L(slotTerpilih.nama)} (${slotTerpilih.jam})` : ''}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="font-bold">{L({ id: 'Kontak', en: 'Contact' })}</dt>
                      <dd className="text-right font-extrabold">{telp}</dd>
                    </div>
                  </dl>
                  {catatan.trim() && (
                    <p className="mt-4 rounded-xl border border-teal-200 bg-white px-4 py-3 text-base leading-relaxed text-teal-900">
                      {catatan}
                    </p>
                  )}
                  <p className="mt-5 flex items-start gap-2.5 text-sm font-semibold leading-relaxed text-teal-800">
                    <Info className="mt-0.5 h-4 w-4 shrink-0" />
                    {L({
                      id: 'Formulir ini contoh tampilan di peramban Anda dan belum terkirim ke sistem rumah sakit. Untuk jadwal resmi, hubungi perawat unit di nomor yang tercantum di kartu kontrol.',
                      en: 'This form is a browser-side demonstration and has not been sent to the hospital system. For an official schedule, contact the unit nurse on the number printed on your control card.',
                    })}
                  </p>
                  <button
                    type="button"
                    onClick={reset}
                    className="mt-auto inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-teal-600 bg-white px-5 py-3 text-base font-extrabold text-teal-700 transition-colors hover:bg-teal-50 active:scale-[0.98]"
                  >
                    <RotateCcw className="h-4 w-4 shrink-0" />
                    {L({ id: 'Ajukan jadwal lain', en: 'Request another slot' })}
                  </button>
                </div>
              ) : (
                <form onSubmit={kirim} className="mt-6 flex h-full flex-col gap-5" noValidate>
                  <div>
                    <label className={labelCls} htmlFor="hd-nama">
                      {L({ id: 'Nama pasien', en: 'Patient name' })}
                    </label>
                    <input
                      id="hd-nama"
                      className={`${inputCls} mt-2`}
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      placeholder={L({ id: 'Sesuai kartu berobat', en: 'As written on the visit card' })}
                      autoComplete="name"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className={labelCls} htmlFor="hd-rm">
                        {L({ id: 'No. RM', en: 'MR number' })}
                      </label>
                      <input
                        id="hd-rm"
                        className={`${inputCls} mt-2`}
                        value={rm}
                        onChange={(e) => setRm(e.target.value)}
                        placeholder="000000"
                        inputMode="numeric"
                      />
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="hd-telp">
                        {L({ id: 'Nomor telepon', en: 'Phone number' })}
                      </label>
                      <input
                        id="hd-telp"
                        className={`${inputCls} mt-2`}
                        value={telp}
                        onChange={(e) => setTelp(e.target.value)}
                        placeholder="08xxxxxxxxxx"
                        inputMode="tel"
                        autoComplete="tel"
                      />
                    </div>
                  </div>

                  <div>
                    <span className={labelCls}>{L({ id: 'Hari sesi', en: 'Session day' })}</span>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {HARI.map((h) => {
                        const aktif = hari === h.kode;
                        return (
                          <button
                            key={h.kode}
                            type="button"
                            aria-pressed={aktif}
                            onClick={() => pilihHari(h.kode)}
                            className={`rounded-xl border px-2 py-2.5 text-sm font-extrabold transition-colors ${
                              aktif
                                ? 'border-teal-600 bg-teal-600 text-white shadow-sm'
                                : 'border-slate-300 bg-white text-slate-700 hover:border-teal-300 hover:bg-teal-50'
                            }`}
                          >
                            {L(h.hari)}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <span className={labelCls}>{L({ id: 'Shift', en: 'Shift' })}</span>
                    {hariTerpilih ? (
                      <div className="mt-2 grid grid-cols-1 gap-2">
                        {slotTersedia.map((s) => {
                          const aktif = shift === s.kode;
                          return (
                            <button
                              key={s.kode}
                              type="button"
                              aria-pressed={aktif}
                              onClick={() => {
                                setShift(s.kode);
                                setGalat('');
                              }}
                              className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${
                                aktif
                                  ? 'border-teal-600 bg-teal-50 ring-2 ring-teal-500/20'
                                  : 'border-slate-300 bg-white text-slate-700 hover:border-teal-300 hover:bg-teal-50/60'
                              }`}
                            >
                              <span className="text-base font-extrabold text-slate-900">{L(s.nama)}</span>
                              <span className="flex items-center gap-1.5 text-sm font-bold text-slate-500">
                                <Clock className="h-4 w-4 shrink-0" />
                                {s.jam}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="mt-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-base text-slate-500">
                        {L({ id: 'Pilih hari dulu untuk melihat shift yang tersedia.', en: 'Pick a day first to see the available shifts.' })}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={labelCls} htmlFor="hd-catatan">
                      {L({ id: 'Catatan untuk perawat', en: 'Note for the nurse' })}
                    </label>
                    <textarea
                      id="hd-catatan"
                      className={`${inputCls} mt-2 min-h-[88px] resize-y`}
                      value={catatan}
                      onChange={(e) => setCatatan(e.target.value)}
                      placeholder={L({
                        id: 'Misal: akses baru, butuh kursi recline penuh, atau titip antar-jemput ambulans.',
                        en: 'For example: a new access, a fully flat recliner needed, or ambulance transport.',
                      })}
                    />
                  </div>

                  {galat && (
                    <p role="alert" className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-base font-bold text-amber-800">
                      {galat}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="mt-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-teal-600 px-5 py-3.5 text-lg font-extrabold text-white shadow-md shadow-teal-600/25 transition-all hover:bg-teal-700 active:scale-[0.98]"
                  >
                    <Send className="h-5 w-5 shrink-0" />
                    {L({ id: 'Ajukan Jadwal', en: 'Submit Request' })}
                  </button>
                </form>
              )}
            </article>

            {/* ---------------- KOLOM 2: KALKULATOR CAIRAN ---------------- */}
            <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-teal-100 bg-teal-50 text-teal-700">
                <Calculator className="h-7 w-7" />
              </span>
              <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-900">
                {L({ id: 'Kalkulator Cairan Harian', en: 'Daily Fluid Calculator' })}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {L({
                  id: 'Masukkan berat badan dan jumlah urine sehari. Angka yang keluar adalah perkiraan edukasi, bukan pengganti instruksi dokter atau ahli gizi.',
                  en: 'Enter your body weight and daily urine volume. The result is an educational estimate, not a replacement for instructions from your doctor or dietitian.',
                })}
              </p>

              <div className="mt-6 space-y-5">
                <div>
                  <label className={labelCls} htmlFor="hd-bb">
                    {L({ id: 'Berat badan hari ini (kg)', en: 'Body weight today (kg)' })}
                  </label>
                  <input
                    id="hd-bb"
                    className={`${inputCls} mt-2`}
                    value={bb}
                    onChange={(e) => setBb(e.target.value)}
                    placeholder="55"
                    inputMode="decimal"
                  />
                </div>
                <div>
                  <label className={labelCls} htmlFor="hd-urine">
                    {L({ id: 'Urine dalam 24 jam (cc)', en: 'Urine over 24 hours (cc)' })}
                  </label>
                  <input
                    id="hd-urine"
                    className={`${inputCls} mt-2`}
                    value={urine}
                    onChange={(e) => setUrine(e.target.value)}
                    placeholder="300"
                    inputMode="numeric"
                  />
                  <p className="mt-2 text-sm font-semibold text-slate-500">
                    {L({
                      id: 'Belum diukur? Kosongkan saja; hitungan memakai asumsi 300 cc.',
                      en: 'Not measured yet? Leave it empty; the estimate assumes 300 cc.',
                    })}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4 border-t border-slate-100 pt-6">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-slate-500">
                    <Droplets className="h-4 w-4 shrink-0 text-teal-600" />
                    {L({ id: 'Batas minum harian', en: 'Daily drinking limit' })}
                  </p>
                  <p className="mt-2 text-4xl font-extrabold leading-none tracking-tight text-slate-900">
                    {hasil ? formatCc(hasil.batas) : '- cc'}
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-500">
                    {L({
                      id: 'Rumus edukasi: urine 24 jam + 500 cc kehilangan tak terasa.',
                      en: 'Educational formula: 24-hour urine plus 500 cc of insensible loss.',
                    })}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-slate-500">
                    <Scale className="h-4 w-4 shrink-0 text-teal-600" />
                    {L({ id: 'Batas naik berat badan antar sesi', en: 'Interdialytic weight gain limit' })}
                  </p>
                  <p className="mt-2 text-4xl font-extrabold leading-none tracking-tight text-slate-900">
                    {hasil ? `± ${hasil.naik.toFixed(1)} kg` : '- kg'}
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-500">
                    {L({
                      id: 'Pedoman umum 4 persen dari berat badan. Melewatinya biasanya berarti sesak atau kram saat sesi.',
                      en: 'A common guideline of 4 percent of body weight. Going past it usually means breathlessness or cramps during the session.',
                    })}
                  </p>
                </div>
              </div>

              <p className="mt-auto pt-6 text-sm font-semibold leading-relaxed text-slate-500">
                {L({
                  id: 'Bawa hasil ini saat kontrol, lalu konfirmasi batas Anda pada ahli gizi klinis unit.',
                  en: 'Bring this result to your check-up, then confirm your personal limit with the unit dietitian.',
                })}
              </p>
            </article>

            {/* ---------------- KOLOM 3: BROSUR PDF ---------------- */}
            <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-teal-100 bg-teal-50 text-teal-700">
                <FileText className="h-7 w-7" />
              </span>
              <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-900">
                {L({ id: 'Brosur HD Pertama', en: 'First Dialysis Brochure' })}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {L({
                  id: 'Satu berkas untuk keluarga yang baru pertama kali menemani cuci darah: persiapan, suasana ruang, dan rawat akses di rumah.',
                  en: 'One file for families accompanying their first dialysis session: preparation, the feel of the room, and access care at home.',
                })}
              </p>

              <ul className="mt-6 space-y-2.5 border-t border-slate-200 pt-6">
                {ISI_BROSUR.map((i) => (
                  <li key={i.id} className="flex items-start gap-2.5 text-base leading-snug text-slate-700">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-teal-600" />
                    <span>{L(i)}</span>
                  </li>
                ))}
              </ul>

              <a
                href={PDF_BROSUR}
                download
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-2xl bg-teal-600 px-5 py-3.5 text-lg font-extrabold text-white shadow-md shadow-teal-600/25 transition-all hover:bg-teal-700 active:scale-[0.98]"
              >
                <Download className="h-5 w-5 shrink-0" />
                {L({ id: 'Download PDF', en: 'Download PDF' })}
              </a>

              <p className="mt-4 flex items-start gap-2.5 text-sm font-semibold leading-relaxed text-slate-500">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                {L({
                  id: 'Brosur juga tersedia cetak di meja perawat unit Lt 2 South Wing dan dibacakan bersama perawat edukator pada sesi pertama.',
                  en: 'A printed copy is also available at the nurse desk of the Level 2 South Wing unit and is read together with the educator nurse during the first session.',
                })}
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HemodialisaWidgets;
