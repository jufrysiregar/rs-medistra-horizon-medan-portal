'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Check,
  CheckCircle2,
  ClipboardList,
  Clock,
  FlaskConical,
  Loader2,
  MapPin,
  MessageCircle,
  PackageCheck,
  PhoneCall,
  Pill,
  Search,
  Send,
  ShieldCheck,
  Stethoscope,
  Truck,
  X,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import type { Language } from '../../../types';

/** Sepasang teks ID/EN; dipilih dengan [lang] supaya semua data tinggal di satu tempat. */
type Teks = { id: string; en: string };

/** Tahapan antrean resep, dipakai pelacakan status di atas. */
const TAHAPAN: Teks[] = [
  { id: 'Resep diterima', en: 'Prescription received' },
  { id: 'Peracikan obat', en: 'Compounding' },
  { id: 'Pemeriksaan akhir', en: 'Final check' },
  { id: 'Siap dilayani', en: 'Ready for pickup' },
];

/** Pertanyaan cepat pada modal konsultasi apoteker. */
const TANYA_CEPAT: Teks[] = [
  { id: 'Obat saya disimpan di kulkas atau tidak?', en: 'Should my medicine be refrigerated?' },
  { id: 'Bolehkah obat ini diminum bersama susu?', en: 'Can I take this medicine with milk?' },
  { id: 'Cara pakai inhaler yang benar bagaimana?', en: 'What is the correct inhaler technique?' },
];

/** Jawaban contoh per topik; selain itu memakai balasan umum. */
const JAWABAN: { cocok: string[]; teks: Teks }[] = [
  {
    cocok: ['kulkas', 'refrigerat', 'simpan'],
    teks: {
      id: 'Obat yang perlu dingin ditandai kotak biru di etiket: simpan 2-8 derajat Celcius di rak bawah, jangan di pintu kulkas, dan saring kembali ke suhu ruang sebelum dipakai. Tetes mata dan sirup tertentu cukup suhu ruang asal tertutup rapat.',
      en: 'Medicines that need cooling carry a blue box on the label: keep them at 2-8 degrees Celsius on a lower shelf, never in the door, and let them return to room temperature before use. Certain eye drops and syrups are fine at room temperature as long as they stay tightly closed.',
    },
  },
  {
    cocok: ['susu', 'makan', 'bersama'],
    teks: {
      id: 'Susu dan produk kalsium mengikat antibiotik golongan tetrasiklin serta obat tulang, jadi beri jarak 2 jam. Obat maag dan tekanan darah umumnya aman diminum sesudah makan. Etiket kami selalu menulis satu dari tiga: sebelum, sesudah, atau boleh bersama makanan.',
      en: 'Milk and calcium bind tetracycline antibiotics and bone medicines, so keep a 2-hour gap. Ulcer and blood-pressure medicines are usually fine after meals. Our label always states one of three: before, after, or together with food.',
    },
  },
  {
    cocok: ['inhaler', 'epipen', 'semprot', 'cara pakai'],
    teks: {
      id: 'Kocok inhaler, buang napas sampai kosong, lalu tempelkan ke bibir sambil menekan satu semburan dan menarik napas lambat 5 detik. Tahan 10 detik, tunggu 30 detik sebelum semburan kedua, dan berkumur setelah obat steroid agar tidak muncul jamur mulut.',
      en: 'Shake the inhaler, breathe out fully, then seal your lips and press one puff while inhaling slowly for 5 seconds. Hold for 10 seconds, wait 30 seconds before a second puff, and rinse after steroid medicine to avoid oral thrush.',
    },
  },
];

const JAWAB_UMUM: Teks = {
  id: 'Terima kasih, pertanyaan Anda kami catat. Apoteker penanggung jawab akan menghubungi melalui nomor telepon yang terdaftar, dan penjelasan lengkap mengenai obat Anda juga tertulis pada etiket serta lembar informasi obat.',
  en: 'Thank you, your question is recorded. The pharmacist on duty will contact you through your registered phone number, and full guidance on your medicine is also printed on the label and the medication information leaflet.',
};

/** Hasil pelacakan antrean, dibaca dari nomor resep/RM yang diketik. */
interface HasilAntrean {
  nomor: string;
  tahap: number;
  antrean: number;
  estimasi: number;
  depo: Teks;
}

/** Pembangkit status contoh: angka yang sama selalu menghasilkan status yang sama. */
const buatHasil = (input: string): HasilAntrean => {
  const bersih = input.trim().toUpperCase();
  const total = Array.from(bersih).reduce((akum, har) => akum + har.charCodeAt(0), 0);
  const DEPO: Teks[] = [
    { id: 'Depo Rawat Jalan · Lt 1', en: 'Outpatient Depot · Level 1' },
    { id: 'Depo Rawat Inap · Lt 6', en: 'Inpatient Depot · Level 6' },
    { id: 'Depo Cito UGD & ICU · Lt 3', en: 'Cito Depot ER & ICU · Level 3' },
    { id: 'Depo Eksekutif · Lt 7', en: 'Executive Depot · Level 7' },
  ];
  return {
    nomor: bersih,
    tahap: total % TAHAPAN.length,
    antrean: (total % 12) + 1,
    estimasi: (total % 18) + 4,
    depo: DEPO[total % DEPO.length],
  };
};

/** Pesan awal percakapan konsultasi apoteker. */
const SAPAAN = (lang: Language): { dari: 'apoteker' | 'pasien'; teks: string }[] => [
  {
    dari: 'apoteker',
    teks:
      lang === 'en'
        ? 'Good morning, I am the pharmacist on duty. Ask about dose, side effects, storage or how to use a medical device.'
        : 'Selamat pagi, saya apoteker jaga instalasi farmasi. Silakan tanyakan dosis, efek samping, cara simpan, atau pemakaian alat medis.',
  },
];

type ModalKini = 'antar' | 'apoteker' | null;

/**
 * PANEL INTERAKTIF FARMASI, cek status antrean obat (dengan simulasi loading),
 * permintaan antar obat ke rumah, dan konsultasi apoteker. Modal dibuat lokal di
 * halaman ini (terang, tanpa dark mode) supaya tidak mengubah modal bersama situs.
 */
const FarmasiWidgets: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (teks: Teks) => teks[lang];

  /* ------------------------- Cek antrean resep ------------------------- */
  const [nomor, setNomor] = useState('');
  const [mutu, setMutu] = useState<'isi' | 'memuat' | 'hasil'>('isi');
  const [hasil, setHasil] = useState<HasilAntrean | null>(null);

  const cekAntrean = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomor.trim()) return;
    setMutu('memuat');
    window.setTimeout(() => {
      setHasil(buatHasil(nomor));
      setMutu('hasil');
    }, 1100);
  };

  /* ------------------------------- Modal ------------------------------- */
  const [modal, setModal] = useState<ModalKini>(null);

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

  /* Form antar obat. */
  const [kirim, setKirim] = useState({ nama: '', telepon: '', alamat: '', catatan: '' });
  const [terkirim, setTerkirim] = useState(false);

  /* Percakapan konsultasi apoteker. */
  const [pesan, setPesan] = useState<{ dari: 'apoteker' | 'pasien'; teks: string }[]>(SAPAAN(lang));
  const [tanya, setTanya] = useState('');

  const jawab = (teks: string) => {
    const rendah = teks.toLowerCase();
    const cocok = JAWABAN.find((j) => j.cocok.some((kata) => rendah.includes(kata)));
    return (cocok ?? JAWAB_UMUM)[lang];
  };

  const kirimPesan = (e: React.FormEvent) => {
    e.preventDefault();
    const isi = tanya.trim();
    if (!isi) return;
    setPesan((p) => [...p, { dari: 'pasien', teks: isi }]);
    setTanya('');
    window.setTimeout(() => {
      setPesan((p) => [...p, { dari: 'apoteker', teks: jawab(isi) }]);
    }, 650);
  };

  const tutupModal = () => {
    setModal(null);
    setTerkirim(false);
  };

  return (
    <>
      {/* ================= 6. WIDGET UX FARMASI ================= */}
      <section id="layanan-farmasi" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Layanan Cepat untuk Pasien', en: 'Fast Services for Patients' })}
          </h2>
          <div className="mt-5 h-px w-full bg-slate-200" />

          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg sm:p-10">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
              {/* KIRI: pelacakan antrean obat */}
              <div>
                <p className="flex items-center gap-3 text-xl font-extrabold text-slate-900">
                  <PackageCheck className="h-7 w-7 shrink-0 text-teal-600" />
                  {L({ id: 'Cek Status Antrean Obat', en: 'Check Medicine Queue Status' })}
                </p>
                <p className="mt-3 text-lg leading-relaxed text-slate-600">
                  {L({
                    id: 'Masukkan nomor resep atau nomor rekam medis, sistem menampilkan posisi resep Anda di depo farmasi beserta perkiraan waktu tunggu.',
                    en: 'Enter your prescription or medical record number, and the screen shows where your prescription stands in the depot together with an estimated waiting time.',
                  })}
                </p>

                <form onSubmit={cekAntrean} className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <label className="flex-1">
                    <span className="sr-only">{L({ id: 'Nomor resep atau RM', en: 'Prescription or MR number' })}</span>
                    <input
                      value={nomor}
                      onChange={(e) => {
                        setNomor(e.target.value);
                        setMutu('isi');
                      }}
                      placeholder={L({ id: 'Contoh: R-4821995 atau RM 0031827', en: 'Example: R-4821995 or MR 0031827' })}
                      className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-5 py-4 text-lg text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={mutu === 'memuat'}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-teal-600 px-6 py-4 text-lg font-extrabold text-white shadow-md shadow-teal-600/25 transition-all hover:bg-teal-700 active:scale-[0.98] disabled:cursor-wait disabled:bg-teal-400"
                  >
                    {mutu === 'memuat' ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Search className="h-5 w-5 shrink-0" />
                    )}
                    {mutu === 'memuat'
                      ? L({ id: 'Memeriksa', en: 'Checking' })
                      : L({ id: 'Cek Status', en: 'Check Status' })}
                  </button>
                </form>

                {/* Hasil pelacakan */}
                <AnimatePresence mode="wait">
                  {mutu === 'hasil' && hasil && (
                    <motion.div
                      key={hasil.nomor}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                      className="mt-6 rounded-2xl border border-teal-200 bg-teal-50 p-6"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="text-lg font-extrabold text-teal-900">
                          {L({ id: 'Resep', en: 'Prescription' })} {hasil.nomor}
                        </p>
                        <span className="rounded-full border border-teal-300 bg-white px-3.5 py-1.5 text-sm font-bold text-teal-800">
                          {L({ id: 'Antrean ke', en: 'Queue position' })}-{hasil.antrean}
                        </span>
                      </div>
                      <p className="mt-1 flex items-center gap-2 text-base font-semibold text-teal-800">
                        <MapPin className="h-4 w-4 shrink-0" />
                        {L(hasil.depo)}
                      </p>

                      <ol className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {TAHAPAN.map((t, i) => {
                          const selesai = i <= hasil.tahap;
                          return (
                            <li key={t.id} className="flex items-center gap-3">
                              <span
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-extrabold ${
                                  selesai
                                    ? 'border-teal-500 bg-teal-600 text-white'
                                    : 'border-teal-200 bg-white text-teal-400'
                                }`}
                              >
                                {selesai ? <Check className="h-5 w-5" /> : i + 1}
                              </span>
                              <span className={`text-base font-bold ${selesai ? 'text-teal-900' : 'text-teal-500'}`}>
                                {L(t)}
                              </span>
                            </li>
                          );
                        })}
                      </ol>

                      <p className="mt-6 flex items-center gap-2 border-t border-teal-200 pt-4 text-base font-bold text-teal-900">
                        <Clock className="h-5 w-5 shrink-0" />
                        {L({ id: 'Perkiraan siap', en: 'Estimated ready' })} {hasil.estimasi}{' '}
                        {L({ id: 'menit dari sekarang', en: 'minutes from now' })}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {mutu === 'isi' && (
                  <p className="mt-6 flex items-start gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-base leading-relaxed text-slate-600">
                    <ClipboardList className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
                    {L({
                      id: 'Status juga diumumkan lewat layar di depan depo dan pesan singkat ke nomor telepon pasien yang terdaftar.',
                      en: 'The status is also shown on the screen in front of the depot and sent by text message to the patient phone number on record.',
                    })}
                  </p>
                )}
              </div>

              {/* KANAN: dua tombol layanan berbuka modal */}
              <div className="flex flex-col gap-5 border-t border-slate-100 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <p className="flex items-center gap-3 text-lg font-extrabold text-slate-900">
                    <Truck className="h-6 w-6 shrink-0 text-teal-600" />
                    {L({ id: 'Antar Obat ke Rumah', en: 'Medicine Delivery to Home' })}
                  </p>
                  <p className="mt-2 text-base leading-relaxed text-slate-600">
                    {L({
                      id: 'Kurir kami memberangkatkan obat dua kali sehari, pukul 12.00 dan 16.00, untuk area Kota Medan.',
                      en: 'Our courier dispatches twice a day, at 12.00 and 16.00, within the Medan city area.',
                    })}
                  </p>
                  <button
                    type="button"
                    onClick={() => setModal('antar')}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-teal-600 px-5 py-3.5 text-lg font-extrabold text-white shadow-md shadow-teal-600/25 transition-all hover:bg-teal-700 active:scale-[0.98] sm:w-auto"
                  >
                    <Truck className="h-5 w-5 shrink-0" />
                    {L({ id: 'Minta Antar Obat ke Rumah', en: 'Request Home Delivery' })}
                  </button>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <p className="flex items-center gap-3 text-lg font-extrabold text-slate-900">
                    <MessageCircle className="h-6 w-6 shrink-0 text-teal-600" />
                    {L({ id: 'Konsultasi Apoteker', en: 'Pharmacist Consultation' })}
                  </p>
                  <p className="mt-2 text-base leading-relaxed text-slate-600">
                    {L({
                      id: 'Tanyakan aturan minum, efek samping, atau cara pakai alat medis tanpa harus kembali antre di depo.',
                      en: 'Ask about dosing schedule, side effects, or how to use a medical device without queueing again at the depot.',
                    })}
                  </p>
                  <button
                    type="button"
                    onClick={() => setModal('apoteker')}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-teal-600 bg-white px-5 py-3.5 text-lg font-extrabold text-teal-700 transition-colors hover:bg-teal-50 active:scale-[0.98] sm:w-auto"
                  >
                    <PhoneCall className="h-5 w-5 shrink-0" />
                    {L({ id: 'Tanya Apoteker', en: 'Ask the Pharmacist' })}
                  </button>
                </div>

                <p className="text-sm font-semibold leading-snug text-slate-500">
                  {L({
                    id: 'Layanan ini contoh tampilan. Untuk kebutuhan mendesak, datang ke Farmasi Utama di lantai dasar yang buka 24 jam.',
                    en: 'These services are shown as a demonstration. For urgent needs, visit the Main Pharmacy on the ground floor, open 24 hours.',
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MODAL: ANTAR OBAT ================= */}
      <AnimatePresence>
        {modal === 'antar' && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center bg-slate-50/80 p-4 backdrop-blur-md sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={tutupModal}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="judulAntar"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-7 shadow-2xl sm:p-9"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="flex items-center gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-teal-50 text-teal-700">
                    <Truck className="h-6 w-6" />
                  </span>
                  <span id="judulAntar" className="text-2xl font-extrabold leading-snug text-slate-900">
                    {L({ id: 'Formulir Antar Obat', en: 'Medicine Delivery Form' })}
                  </span>
                </p>
                <button
                  type="button"
                  onClick={tutupModal}
                  aria-label={L({ id: 'Tutup', en: 'Close' })}
                  className="rounded-full border border-slate-200 bg-slate-50 p-2 text-slate-500 transition-colors hover:bg-white hover:text-slate-900"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {terkirim ? (
                <div className="mt-7 rounded-2xl border border-teal-200 bg-teal-50 p-6">
                  <p className="flex items-center gap-3 text-xl font-extrabold text-teal-900">
                    <CheckCircle2 className="h-7 w-7 shrink-0" />
                    {L({ id: 'Permintaan terkirim', en: 'Request received' })}
                  </p>
                  <p className="mt-3 text-lg leading-relaxed text-teal-800">
                    {L({
                      id: `Terima kasih, ${kirim.nama || 'pasien'}. Kurir farmasi menghubungi nomor ${kirim.telepon || 'yang terdaftar'} pada jam keberangkatan 12.00 atau 16.00. Obat bertanda dingin dikirim dalam kotak pendingin.`,
                      en: `Thank you, ${kirim.nama || 'patient'}. The pharmacy courier will call ${kirim.telepon || 'your registered number'} at the 12.00 or 16.00 dispatch. Cold-chain medicine travels in a cooler box.`,
                    })}
                  </p>
                  <button
                    type="button"
                    onClick={tutupModal}
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-teal-600 px-6 py-3.5 text-lg font-extrabold text-white transition-colors hover:bg-teal-700"
                  >
                    {L({ id: 'Selesai', en: 'Done' })}
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setTerkirim(true);
                  }}
                  className="mt-7 space-y-4"
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-base font-bold text-slate-700">{L({ id: 'Nama penerima', en: 'Recipient name' })}</span>
                      <input
                        required
                        value={kirim.nama}
                        onChange={(e) => setKirim({ ...kirim, nama: e.target.value })}
                        className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-lg text-slate-900 focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                      />
                    </label>
                    <label className="block">
                      <span className="text-base font-bold text-slate-700">{L({ id: 'Nomor telepon aktif', en: 'Active phone number' })}</span>
                      <input
                        required
                        type="tel"
                        value={kirim.telepon}
                        onChange={(e) => setKirim({ ...kirim, telepon: e.target.value })}
                        className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-lg text-slate-900 focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                      />
                    </label>
                  </div>
                  <label className="block">
                    <span className="text-base font-bold text-slate-700">{L({ id: 'Alamat lengkap', en: 'Full address' })}</span>
                    <textarea
                      required
                      rows={3}
                      value={kirim.alamat}
                      onChange={(e) => setKirim({ ...kirim, alamat: e.target.value })}
                      placeholder={L({ id: 'Jalan, nomor rumah, kelurahan, kecamatan, patokan terdekat', en: 'Street, house number, village, district, nearest landmark' })}
                      className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-lg leading-relaxed text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    />
                  </label>
                  <label className="block">
                    <span className="text-base font-bold text-slate-700">
                      {L({ id: 'Catatan untuk kurir (opsional)', en: 'Note for the courier (optional)' })}
                    </span>
                    <input
                      value={kirim.catatan}
                      onChange={(e) => setKirim({ ...kirim, catatan: e.target.value })}
                      placeholder={L({ id: 'Contoh: obat insulin mohon dibawa kotak pendingin', en: 'Example: please bring the cooler box for insulin' })}
                      className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-lg text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    />
                  </label>

                  <p className="flex items-start gap-2 rounded-xl border border-slate-200 bg-slate-50 p-4 text-base leading-relaxed text-slate-600">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
                    {L({
                      id: 'Obat narkotika dan psikotropika tidak dapat diantar; harus diambil sendiri oleh pasien atau keluarga dengan kartu identitas di depo farmasi.',
                      en: 'Narcotic and psychotropic medicine cannot be delivered; the patient or family must collect it in person at the depot with an ID card.',
                    })}
                  </p>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-teal-600 px-6 py-4 text-lg font-extrabold text-white shadow-md shadow-teal-600/25 transition-all hover:bg-teal-700 active:scale-[0.98]"
                  >
                    <Truck className="h-5 w-5 shrink-0" />
                    {L({ id: 'Kirim Permintaan Antar Obat', en: 'Send Delivery Request' })}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= MODAL: TANYA APOTEKER ================= */}
      <AnimatePresence>
        {modal === 'apoteker' && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center bg-slate-50/80 p-4 backdrop-blur-md sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={tutupModal}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="judulApoteker"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-[92vh] w-full max-w-xl flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-2xl sm:p-9"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-teal-50 text-teal-700">
                    <Stethoscope className="h-6 w-6" />
                  </span>
                  <div>
                    <p id="judulApoteker" className="text-2xl font-extrabold leading-snug text-slate-900">
                      {L({ id: 'Tanya Apoteker', en: 'Ask the Pharmacist' })}
                    </p>
                    <p className="mt-0.5 flex items-center gap-2 text-sm font-bold text-emerald-700">
                      <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                      </span>
                      {L({ id: 'APT. Rizka Amelia, S.Farm., jaga aktif', en: 'Rizka Amelia, Pharm., on duty' })}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={tutupModal}
                  aria-label={L({ id: 'Tutup', en: 'Close' })}
                  className="rounded-full border border-slate-200 bg-slate-50 p-2 text-slate-500 transition-colors hover:bg-white hover:text-slate-900"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Riwayat percakapan */}
              <div className="mt-6 flex-1 space-y-3 overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50 p-4">
                {pesan.map((p, i) => (
                  <div key={i} className={`flex ${p.dari === 'pasien' ? 'justify-end' : 'justify-start'}`}>
                    <p
                      className={`max-w-[22rem] rounded-2xl px-4 py-3 text-base leading-relaxed ${
                        p.dari === 'pasien'
                          ? 'bg-teal-600 font-semibold text-white'
                          : 'border border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      {p.teks}
                    </p>
                  </div>
                ))}
                <p className="flex items-center gap-2 px-1 pt-1 text-sm font-semibold text-slate-500">
                  <Pill className="h-4 w-4 shrink-0 text-teal-600" />
                  {L({
                    id: 'Jawaban bersifat informasi umum, tidak menggantikan resep dokter.',
                    en: 'Answers give general information and do not replace a doctor prescription.',
                  })}
                </p>
              </div>

              {/* Pertanyaan cepat */}
              <div className="mt-4 flex flex-wrap gap-2">
                {TANYA_CEPAT.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setPesan((p) => [...p, { dari: 'pasien', teks: L(t) }, { dari: 'apoteker', teks: jawab(L(t)) }])}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:border-teal-300 hover:bg-teal-50 hover:text-teal-800"
                  >
                    {L(t)}
                  </button>
                ))}
              </div>

              <form onSubmit={kirimPesan} className="mt-4 flex flex-col gap-3 sm:flex-row">
                <label className="flex-1">
                  <span className="sr-only">{L({ id: 'Tulis pertanyaan', en: 'Write your question' })}</span>
                  <input
                    value={tanya}
                    onChange={(e) => setTanya(e.target.value)}
                    placeholder={L({ id: 'Tulis pertanyaan Anda di sini', en: 'Type your question here' })}
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-5 py-3.5 text-lg text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                </label>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-teal-600 px-6 py-3.5 text-lg font-extrabold text-white transition-colors hover:bg-teal-700 active:scale-[0.98]"
                >
                  <Send className="h-5 w-5 shrink-0" />
                  {L({ id: 'Kirim', en: 'Send' })}
                </button>
              </form>

              <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-slate-500">
                <FlaskConical className="h-4 w-4 shrink-0 text-teal-600" />
                {L({
                  id: 'Konsultasi lengkap mengenai racikan khusus dijadwalkan bersama apoteker penanggung jawab.',
                  en: 'Full consultation on special compounding is scheduled with the responsible pharmacist.',
                })}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FarmasiWidgets;
