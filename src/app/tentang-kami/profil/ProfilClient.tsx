'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import type { FC, ReactNode } from 'react';
import Image, { type StaticImageData } from 'next/image';
import { motion } from 'framer-motion';
import { Biohazard, ChevronDown, CircleCheck, Droplets, Paperclip, Quote, ShieldCheck, Trash2, Waves, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../../context/LanguageContext';
import type { Language } from '../../../types';
import { localize, tp, tpObj, type Bilingual } from '../../../lib/i18n';
import ICareAnimated from './ICareAnimated';
import tentangId from '../../../data/tentang.json';
import tentangEn from '../../../data/en/tentang.json';
import gedungId from '../../../data/gedung.json';
import gedungEn from '../../../data/en/gedung.json';
import heroProfil from '@/images/hero/tentang/hero-profil.jpg';
import heroProfilMobile from '@/images/hero/mobile-tentang/hero-profil.jpg';
import fotoDevendraHalim from '../../../images/profil/Devendra Halim.jpg';
import fotoAndreRizky from '../../../images/profil/Andre-Rizky.jpg';
import fotoFaridaAriani from '../../../images/profil/Farida-Ariani.jpg';
import fotoRinaKartikaSari from '../../../images/profil/Rina-Kartika-Sari.jpg';
import fotoMahdiAlatas from '../../../images/profil/Mahdi-Alatas.jpg';
import fotoRestuMaulana from '../../../images/profil/Restu-Maulana.jpg';
import fotoDelimaPasaribu from '../../../images/profil/Delima-Pasaribu.jpg';
import fotoHendraWijaya from '../../../images/profil/Hendra-Wijaya.jpg';
import fotoLukmanHakim from '../../../images/profil/Lukman-Hakim.jpg';
import fotoNurHalimahIndrianiSitorus from '../../../images/profil/Nur-Halimah-Indriani-Sitorus.jpg';
import fotoKevinPratama from '../../../images/profil/Kevin-Pratama.jpg';
import fotoAndhikaOktaviandra from '../../../images/profil/Andhika-Oktaviandra.jpg';
import fotoRianPratama from '../../../images/profil/Rian-Pratama.jpg';
import fotoJokoPrasetyo from '../../../images/profil/Joko-Prasetyo.jpg';
import fotoMayaSari from '../../../images/profil/Maya-Sari.jpg';
import fotoDediKurniawan from '../../../images/profil/Dedi-Kurniawan.jpg';
import EkstensiDirectory from './EkstensiDirectory';
import SejarahCarousel from './SejarahCarousel';

/* ============ PROPS ANIMASI SEKSI (fade-in + slide-up saat di-scroll) ============ */
const REVEAL = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
} as const;

/* ============ PROPS ANIMASI TEKS (muncul dramatis saat di-scroll) ============ */
const REVEAL_TEXT = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: 'easeOut' },
} as const;

/* ============ VARIAN STAGGER: poin misi muncul satu per satu ============ */
const STAGGER_WADAH = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
} as const;

const STAGGER_ISI = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
} as const;

/* ======================= 1. DATA PROFIL (JSON + OVERLAY EN) ======================= */
type Profil = {
  nama_rs: string;
  sejarah: string[];
  gedung: { id: string; judul: string; ket: string }[];
  visi: string;
  misi: string;
  /** Rincian misi dalam beberapa poin; tampil sebagai checklist vertikal. */
  misi_poin: string[];
  nilai: { kode: string; nama: string; ket: string }[];
};

/* ======================= 3. JUJARAN MANAJEMEN (halaman ini) ======================= */
type Petinggi = {
  id: string;
  jabatan: Bilingual;
  nama: string;
  tugas: Bilingual;
  inisial: string;
  /** Potret 4:5 dari src/images/profil; kosong berarti kartu pakai avatar inisial. */
  foto?: StaticImageData;
  /** Unit yang dikoordinasikan; tersimpan di data namun tidak dirender. */
  membawahi?: Bilingual;
};

/** Level 1: pimpinan puncak bersama komite pengawas. */
const PUNCAK: Petinggi[] = [
  {
    id: 'owner',
    jabatan: { id: 'Pengurus Yayasan / Owner', en: 'Foundation Board / Owner' },
    nama: 'Drs. Devendra Halim, M.M.',
    tugas: { id: 'Pemegang mandat kepemilikan & pengawas strategis', en: 'Holds the ownership mandate & strategic oversight' },
    inisial: 'DH',
    foto: fotoDevendraHalim,
  },
  {
    id: 'ceo',
    jabatan: { id: 'Chief Executive Officer (CEO)', en: 'Chief Executive Officer (CEO)' },
    nama: 'dr. Rina Kartika Sari, M.M.',
    tugas: { id: 'Penanggung jawab penuh operasional rumah sakit', en: 'Fully accountable for hospital operations' },
    inisial: 'RS',
    foto: fotoRinaKartikaSari,
  },
  {
    id: 'komite-medik',
    jabatan: { id: 'Komite Medik & Pengawas Mutu', en: 'Medical Committee & Quality Oversight' },
    nama: 'dr. Andre Rizky, Sp.B-KBD',
    tugas: { id: 'Penegakan disiplin profesi medis & mutu klinis', en: 'Medical profession discipline & clinical quality' },
    inisial: 'AR',
    foto: fotoAndreRizky,
  },
  {
    id: 'komite-ppi',
    jabatan: { id: 'Komite PPI', en: 'Infection Prevention & Control Committee' },
    nama: 'dr. Farida Ariani, Sp.MK',
    tugas: { id: 'Pencegahan dan pengendalian infeksi seluruh unit', en: 'Infection prevention and control across all units' },
    inisial: 'FA',
    foto: fotoFaridaAriani,
  },
];

/** Level 2: direktorat utama. */
const DIREKSI: Petinggi[] = [
  {
    id: 'direktur-medis-keperawatan',
    jabatan: { id: 'Direktur Medis & Keperawatan', en: 'Medical & Nursing Director' },
    nama: 'dr. Mahdi Alatas, Sp.PD., M.Kes.',
    tugas: { id: 'Mutu klinis, keselamatan pasien & asuhan keperawatan', en: 'Clinical quality, patient safety & nursing care' },
    inisial: 'MA',
    foto: fotoMahdiAlatas,
  },
  {
    id: 'direktur-keuangan-admin',
    jabatan: { id: 'Direktur Keuangan & Administrasi', en: 'Finance & Administration Director' },
    nama: 'Restu Maulana, S.E., M.Acc., CA.',
    tugas: { id: 'Keuangan, penagihan, SDM & umum', en: 'Finance, billing, HR & general affairs' },
    inisial: 'RM',
    foto: fotoRestuMaulana,
  },
  {
    id: 'direktur-operasional',
    jabatan: { id: 'Direktur Operasional & Layanan Penunjang', en: 'Operations & Support Services Director' },
    nama: 'Ns. Delima Pasaribu, S.Kep., M.N.',
    tugas: { id: 'Operasional harian, bangsal & layanan penunjang', en: 'Daily operations, wards & support services' },
    inisial: 'DP',
    foto: fotoDelimaPasaribu,
  },
];

/** Level 3: manajer fungsi beserta rincian unit yang dibawahi. */
const MANAJER: Petinggi[] = [
  {
    id: 'manajer-pelayanan',
    jabatan: { id: 'Manajer Pelayanan Medis & Keperawatan', en: 'Medical & Nursing Services Manager' },
    nama: 'dr. Hendra Wijaya, MARS',
    tugas: { id: 'Jadwal poli, alur pasien & mutu pelayanan', en: 'Clinic schedules, patient flow & service quality' },
    inisial: 'HW',
    foto: fotoHendraWijaya,
    membawahi: { id: 'Koordinator Poliklinik, Nurse Station, OK, ICU/HDU/NICU/VK', en: 'Polyclinic Coordinators, Nurse Stations, OR, ICU/HDU/NICU/VK' },
  },
  {
    id: 'manajer-penunjang-medis',
    jabatan: { id: 'Manajer Penunjang Medis', en: 'Medical Support Manager' },
    nama: 'dr. Lukman Hakim, Sp.PK',
    tugas: { id: 'Mutu layanan diagnostik & terapi khusus', en: 'Diagnostic and special therapy service quality' },
    inisial: 'LH',
    foto: fotoLukmanHakim,
    membawahi: { id: 'Lab 24 Jam, Radiologi, Bank Darah, Fisioterapi', en: '24-hour Lab, Radiology, Blood Bank, Physiotherapy' },
  },
  {
    id: 'manajer-farmasi',
    jabatan: { id: 'Manajer Farmasi & Logistik Obat', en: 'Pharmacy & Drug Logistics Manager' },
    nama: 'Apt. Andhika Oktaviandra, S.Si., M.Farm.',
    tugas: { id: 'Perbekalan obat, satelit VIP & racik steril', en: 'Drug supply, VIP satellites & sterile compounding' },
    inisial: 'AO',
    foto: fotoAndhikaOktaviandra,
    membawahi: { id: 'Farmasi Rawat Jalan & Rawat Inap', en: 'Outpatient & Inpatient Pharmacy' },
  },
  {
    id: 'manajer-gizi',
    jabatan: { id: 'Manajer Gizi & Pelayanan Makanan', en: 'Nutrition & Food Service Manager' },
    nama: 'Nur Halimah Indriani Sitorus, S.Gz., M.Gizi',
    tugas: { id: 'Menu pasien, diet khusus & hygiene pangan', en: 'Patient menus, special diets & food hygiene' },
    inisial: 'NS',
    foto: fotoNurHalimahIndrianiSitorus,
    membawahi: { id: 'Kitchen Utama Pasien, Ahli Gizi, Pengawasan Kantin', en: 'Main Patient Kitchen, Dietitians, Canteen Supervision' },
  },
  {
    id: 'manajer-pemasaran',
    jabatan: { id: 'Manajer Pemasaran, Humas & Customer Care', en: 'Marketing, PR & Customer Care Manager' },
    nama: 'Kevin Pratama, S.I.Kom., M.M.',
    tugas: { id: 'Branding, kemitraan & kepuasan pasien', en: 'Branding, partnerships & patient satisfaction' },
    inisial: 'KP',
    foto: fotoKevinPratama,
    membawahi: { id: 'Marketing, Humas, Customer Care, Handling Complaints', en: 'Marketing, Public Relations, Customer Care, Complaint Handling' },
  },
  {
    id: 'manajer-it',
    jabatan: { id: 'Manajer Teknologi Informasi & SIMRS', en: 'Information Technology & HIS Manager' },
    nama: 'Rian Pratama, S.Kom., M.T.',
    tugas: { id: 'Transformasi digital & ketersediaan sistem', en: 'Digital transformation & system availability' },
    inisial: 'RP',
    foto: fotoRianPratama,
    membawahi: { id: 'IT Support, Networking, SIMRS, Keamanan Data', en: 'IT Support, Networking, HIS, Data Security' },
  },
  {
    id: 'manajer-support-service',
    jabatan: { id: 'Manajer Support Service', en: 'Support Service Manager' },
    nama: 'Ir. Joko Prasetyo, M.T.',
    tugas: { id: 'Utilitas, perawatan gedung, logistik & hygiene', en: 'Utilities, building care, logistics & hygiene' },
    inisial: 'JP',
    foto: fotoJokoPrasetyo,
    membawahi: { id: 'Engineering/Teknisi, Security/Keamanan, Housekeeping, Laundry & Linen', en: 'Engineering/Technicians, Security, Housekeeping, Laundry & Linen' },
  },
  {
    id: 'manajer-hrd',
    jabatan: { id: 'Manajer SDM & Personalia (HRD)', en: 'HR & Personnel Manager (HRD)' },
    nama: 'Maya Sari, S.Psi., M.Si.',
    tugas: { id: 'Rekrutmen, kompetensi & kesejahteraan staf', en: 'Recruitment, competency & staff welfare' },
    inisial: 'MS',
    foto: fotoMayaSari,
    membawahi: { id: 'Rekrutmen, Kepegawaian, Diklat, Legal RS', en: 'Recruitment, Personnel, Training, Hospital Legal' },
  },
];

/** Level 3 (lanjutan): kepala divisi pendukung administrasi. */
const KEPALA_DIVISI: Petinggi[] = [
  {
    id: 'kadiv-keuangan',
    jabatan: { id: 'Kepala Divisi Keuangan & Billing', en: 'Head of Finance & Billing Division' },
    nama: 'Dedi Kurniawan, S.E., Ak., CA.',
    tugas: { id: 'Pembukuan, anggaran & pelaporan', en: 'Bookkeeping, budgeting & reporting' },
    inisial: 'DK',
    foto: fotoDediKurniawan,
    membawahi: { id: 'Kasir, Billing Pasien, Accounting, Akuntansi RS', en: 'Cashier, Patient Billing, Accounting, Hospital Bookkeeping' },
  },
];

/* =============== 4. PENGELOLAAN LINGKUNGAN (dari gedung.json / SSoT) =============== */
type Gf = {
  water_treatment?: string;
  ipal?: string;
  tps_limbah_b3?: string;
  tps_domestik?: string;
};
const GI = gedungId as unknown as Gf[];
const GE = gedungEn as unknown as Gf[];

/* =============================== KOMPONEN KARTU =============================== */

/** Kartu satu pejabat: potret 4:5 di bagian atas, lalu jabatan dan nama bergelar.
 *  Pejabat tanpa foto memakai tile inisial berdimensi sama agar tinggi kartu seragam.
 *  Field tugas dan membawahi tetap tersimpan di data namun tidak dirender. */
const KartuPetinggi: FC<{ p: Petinggi; lang: Language; besar?: boolean }> = ({ p, lang, besar = false }) => (
  <div className="group flex h-full w-full flex-col rounded-2xl border border-slate-200 bg-white p-3 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md">
    {/* `fill` butuh induk yang sudah punya ukuran sendiri: rasio 4:5 + batas lebar dipindah ke sini. */}
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[320px] overflow-hidden rounded-xl bg-slate-100">
      {p.foto ? (
        <Image
          src={p.foto}
          alt={p.nama}
          fill
          sizes="(max-width: 767px) 80vw, (max-width: 1023px) 40vw, 320px"
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
        />
      ) : (
        <span
          className={`absolute inset-0 flex items-center justify-center font-bold tracking-tight text-cyan-700 ${
            besar ? 'text-5xl' : 'text-4xl'
          }`}
        >
          {p.inisial}
        </span>
      )}
    </div>
    <div className="flex flex-1 flex-col justify-center px-1 pb-1 pt-4">
      <p className={`font-semibold tracking-tight text-slate-500 ${besar ? 'text-base' : 'text-sm'}`}>
        {tpObj(lang, p.jabatan)}
      </p>
      <p className={`mt-1 font-extrabold leading-snug tracking-tight text-slate-900 ${besar ? 'text-xl' : 'text-lg'}`}>
        {p.nama}
      </p>
    </div>
  </div>
);

/** Sorotan lema kredibilitas (Terdaftar Dinkes / Akreditasi KARS). */
const HL: FC<{ children: ReactNode }> = ({ children }) => (
  <span className="font-bold text-cyan-700">{children}</span>
);

/* ================================== HALAMAN ================================== */
/* ============ SECTION: PESAN, KESAN & MASUKAN (sukses otomatis) ============ */
const KATEGORI_MASUKAN: Bilingual[] = [
  { id: 'Pelayanan Medis', en: 'Medical Service' },
  { id: 'Fasilitas', en: 'Facilities' },
  { id: 'Administrasi', en: 'Administration' },
  { id: 'Biaya & Penjaminan', en: 'Cost & Insurance' },
  { id: 'Kebersihan & Kenyamanan', en: 'Cleanliness & Comfort' },
  { id: 'Lainnya', en: 'Other' },
];

/** Endpoint Formspree section "Pesan, Kesan & Masukan". */
const FORMSPREE_URL = 'https://formspree.io/f/xoeebzwq';

/**
 * Section "Pesan, Kesan & Masukan" di dasar halaman Profil. Split 50:50: kolom kiri
 * berisi judul + deskripsi + catatan privasi, kolom kanan kartu form. Submit dikirim
 * ke Formspree sebagai multipart (lampiran ikut); sukses langsung menampilkan kartu
 * centang, 3 detik kemudian form di-reset. Light Theme, animasi fade-in via whileInView.
 */
const FeedbackSection: FC<{ lang: Language }> = ({ lang }) => {
  const L = (t: Bilingual) => t[lang];
  const [nama, setNama] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [kategori, setKategori] = useState('');
  const [pesan, setPesan] = useState('');
  const [open, setOpen] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [error, setError] = useState<{ nama?: string; whatsapp?: string; kategori?: string; pesan?: string }>({});
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gagalKirim, setGagalKirim] = useState(false);
  const ddRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { startReloading } = useLanguage();

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ddRef.current && !ddRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  /* Setelah terkirim, tunggu 3 detik lalu perbarui halaman memakai overlay "Sedang
     memuat halaman" yang sama seperti ganti bahasa, dan kembali ke paling atas. */
  useEffect(() => {
    if (!sent) return;
    const t = setTimeout(() => {
      setNama('');
      setWhatsapp('');
      setKategori('');
      setPesan('');
      setAttachments([]);
      setError({});
      setGagalKirim(false);
      setSent(false);
      window.scrollTo({ top: 0 });
      router.refresh();
      startReloading();
    }, 3000);
    return () => clearTimeout(t);
  }, [sent, router, startReloading]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    const err: { nama?: string; whatsapp?: string; kategori?: string; pesan?: string } = {};
    if (!nama.trim()) err.nama = tp(lang, 'Nama lengkap wajib diisi', 'Full name is required');
    if (!whatsapp.trim()) err.whatsapp = tp(lang, 'Email / WhatsApp wajib diisi', 'Email / WhatsApp is required');
    if (!kategori) err.kategori = tp(lang, 'Silakan pilih kategori', 'Please select a category');
    if (!pesan.trim()) err.pesan = tp(lang, 'Masukan wajib diisi', 'Feedback is required');
    else if (pesan.trim().length < 20) err.pesan = tp(lang, 'Masukan minimal 20 karakter', 'Feedback must be at least 20 characters');
    setError(err);
    if (Object.keys(err).length > 0) return;

    /* Multipart, bukan JSON: lampiran hanya sampai ke Formspree lewat FormData.
       Content-Type tidak diset supaya browser yang menambah boundary. */
    const fd = new FormData();
    fd.append('nama', nama);
    fd.append('whatsapp', whatsapp);
    fd.append('kategori', kategori);
    fd.append('pesan', pesan);
    attachments.forEach((f, i) => fd.append(`lampiran_${i + 1}`, f));

    setIsSubmitting(true);
    setGagalKirim(false);
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: fd,
      });
      if (!res.ok) throw new Error(`formspree ${res.status}`);
      setSent(true);
    } catch {
      setGagalKirim(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldCls = (hasErr?: boolean) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:ring-2 ${
      hasErr ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-slate-300 focus:border-cyan-400 focus:ring-cyan-100'
    }`;
  const labelCls = 'mb-1.5 block text-sm font-semibold text-slate-700';

  return (
    <motion.section {...REVEAL} className="bg-slate-50 py-20 lg:py-24">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* KOLOM KIRI: teks & informasi */}
          <motion.div {...REVEAL_TEXT}>
            <h2 className="text-balance text-5xl font-extrabold tracking-tight text-slate-900 lg:text-6xl">
              {tp(lang, 'Pesan, Kesan & Masukan Anda', 'Your Message, Impression & Feedback')}
            </h2>
            <p className="mt-6 text-2xl leading-relaxed text-slate-600">
              {tp(
                lang,
                'Kami sangat menghargai setiap masukan dari Anda dan keluarga. Sampaikan pengalaman Anda untuk membantu kami terus meningkatkan kualitas pelayanan.',
                'We truly value every piece of input from you and your family. Share your experience to help us keep improving the quality of our service.',
              )}
            </p>
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-cyan-600" />
              <p className="text-lg leading-relaxed text-slate-500">
                {tp(
                  lang,
                  'Pesan Anda akan langsung diteruskan ke tim Customer Care kami dan dirahasiakan.',
                  'Your message goes straight to our Customer Care team and is kept confidential.',
                )}
              </p>
            </div>
          </motion.div>

          {/* KOLOM KANAN: kartu form / sukses */}
          {sent ? (
            <motion.div {...REVEAL_TEXT} className="flex flex-col items-center rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl sm:p-10">
              <motion.svg
                viewBox="0 0 52 52"
                className="h-20 w-20 text-emerald-500"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <motion.circle
                  cx="26"
                  cy="26"
                  r="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                />
                <motion.path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 27 l7 7 l15 -16"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.5, duration: 0.45, ease: 'easeOut' }}
                />
              </motion.svg>
              <p className="mt-6 max-w-sm text-xl font-semibold leading-relaxed text-slate-800">
                {tp(
                  lang,
                  'Terima kasih, pesan, kesan, dan masukan Anda telah terkirim. Kami sangat menghargainya.',
                  'Thank you. Your message, impression, and feedback have been sent. We truly appreciate it.',
                )}
              </p>
              <p className="mt-4 text-xs text-slate-400">{tp(lang, 'Halaman akan diperbarui otomatis...', 'The page will refresh automatically...')}</p>
            </motion.div>
          ) : (
          <motion.form {...REVEAL_TEXT} noValidate onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
            <div>
              <label htmlFor="fb-nama" className={labelCls}>{tp(lang, 'Nama Lengkap', 'Full Name')}</label>
              <input id="fb-nama" name="nama" type="text" aria-invalid={!!error.nama} value={nama} onChange={(e) => { setNama(e.target.value.replace(/[^a-zA-Z\s]/g, '')); setError((p) => ({ ...p, nama: undefined })); }} placeholder="Budi Santoso" className={fieldCls(!!error.nama)} />
              {error.nama && <p className="mt-1.5 text-sm text-red-600">{error.nama}</p>}
            </div>

            <div>
              <label htmlFor="fb-wa" className={labelCls}>{tp(lang, 'Email / Whatsapp Anda', 'Your Email / WhatsApp')}</label>
              <input id="fb-wa" name="whatsapp" type="text" aria-invalid={!!error.whatsapp} value={whatsapp} onChange={(e) => { setWhatsapp(e.target.value); setError((p) => ({ ...p, whatsapp: undefined })); }} placeholder={tp(lang, 'nama@email.com atau 08xx xxxx xxxx', 'name@email.com or 08xx xxxx xxxx')} className={fieldCls(!!error.whatsapp)} />
              {error.whatsapp && <p className="mt-1.5 text-sm text-red-600">{error.whatsapp}</p>}
            </div>

            <div>
              <label htmlFor="fb-kategori" className={labelCls}>{tp(lang, 'Kategori', 'Category')}</label>
              <div ref={ddRef} className="relative">
                <button id="fb-kategori" type="button" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((o) => !o)} className={`${fieldCls(!!error.kategori)} flex items-center justify-between text-left ${kategori ? 'text-slate-800' : 'text-slate-400'}`}>
                  <span className="truncate">{kategori || tp(lang, 'Pilih kategori', 'Select a category')}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
                </button>
                {open && (
                  <ul role="listbox" className="absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
                    {KATEGORI_MASUKAN.map((k) => {
                      const label = L(k);
                      const aktif = label === kategori;
                      return (
                        <li key={k.id} role="option" aria-selected={aktif}>
                          <button type="button" onClick={() => { setKategori(label); setOpen(false); setError((p) => ({ ...p, kategori: undefined })); }} className={`w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-cyan-50 ${aktif ? 'font-semibold text-cyan-700' : 'text-slate-700'}`}>
                            {label}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
              {error.kategori && <p className="mt-1.5 text-sm text-red-600">{error.kategori}</p>}
            </div>

            <div>
              <label htmlFor="fb-pesan" className="mb-1.5 block text-lg font-semibold text-slate-700">{tp(lang, 'Pesan / Kesan / Masukan', 'Message / Impression / Feedback')}</label>
              <div className="relative">
                <textarea
                  id="fb-pesan"
                  name="pesan"
                  maxLength={500}
                  rows={4}
                  value={pesan}
                  onChange={(e) => { setPesan(e.target.value); setError((p) => ({ ...p, pesan: undefined })); }}
                  placeholder={tp(lang, 'Tuliskan pengalaman Anda (minimal 20 karakter)...', 'Write about your experience (minimum 20 characters)...')}
                  aria-invalid={!!error.pesan}
                  className={`${fieldCls(!!error.pesan)} resize-none pb-9`}
                />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  aria-label={tp(lang, 'Lampirkan PDF atau gambar', 'Attach PDF or image')}
                  title={tp(lang, 'Lampirkan PDF atau gambar', 'Attach PDF or image')}
                  className="absolute bottom-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors hover:border-cyan-300 hover:text-cyan-600"
                >
                  <Paperclip className="h-4 w-4" />
                </button>
              </div>
              {error.pesan && <p className="mt-1.5 text-sm text-red-600">{error.pesan}</p>}
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,image/*"
                multiple
                className="hidden"
                onChange={(e) => setAttachments(Array.from(e.target.files ?? []).slice(0, 2))}
              />
              <div className="mt-1.5 flex items-center justify-end gap-3">
                <p className="text-xs text-slate-400">
                  {tp(lang, 'Maksimal 2 file (*jpg / *jpeg / *png / *pdf)', 'Maximum 2 files (*jpg / *jpeg / *png / *pdf)')}
                </p>
                <span className="shrink-0 text-xs text-slate-400">{pesan.length}/500</span>
              </div>
              {attachments.length > 0 && (
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {attachments.map((f, i) => (
                    <span key={`${f.name}-${i}`} className="inline-flex max-w-[12rem] items-center gap-1 rounded-md bg-slate-100 py-0.5 pl-2 pr-1 text-xs text-slate-600">
                      <Paperclip className="h-3 w-3 shrink-0" />
                      <span className="truncate">{f.name}</span>
                      <button
                        type="button"
                        onClick={() => setAttachments((prev) => prev.filter((_, idx) => idx !== i))}
                        aria-label={tp(lang, 'Hapus lampiran', 'Remove attachment')}
                        className="ml-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-red-100 hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {gagalKirim && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
                {tp(lang, 'Gagal mengirim pesan. Silakan coba lagi.', 'Failed to send your message. Please try again.')}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-yellow-400 via-green-400 to-cyan-400 px-6 py-3.5 text-base font-bold text-emerald-950 shadow-md ring-1 ring-inset ring-white/40 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 active:translate-y-0 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-70"
            >
              {tp(lang, 'Kirim', 'Send')}
            </button>
          </motion.form>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default function ProfilClient() {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (t: Bilingual) => t[lang];

  const profil = localize(
    tentangId as { profil: Profil },
    lang,
    tentangEn as { profil?: unknown },
  ).profil;

  /* Lokasi fasilitas lingkungan dari Lantai G gedung.json (SSoT). */
  const lokasi = (id?: string, en?: string) => (lang === 'en' && en ? en : id ?? '');
  const lokasiPrefix = L({ id: 'Lokasi', en: 'Location' });
  const G0 = GI[0];
  const E0 = GE[0];

  const LINGKUNGAN = [
    {
      ikon: Droplets,
      judul: L({ id: 'Water Treatment (WTP/RO)', en: 'Water Treatment (WTP/RO)' }),
      ket: L({
        id: 'Pengolahan air bersih terpusat untuk ruang operasi dan cuci darah.',
        en: 'Centralised clean-water treatment for the operating theatre and dialysis.',
      }),
      kaki: `${lokasiPrefix}: ${lokasi(G0?.water_treatment, E0?.water_treatment)}`,
    },
    {
      ikon: Waves,
      judul: L({ id: 'IPAL (Limbah Cair)', en: 'Wastewater Treatment (IPAL)' }),
      ket: L({
        id: 'Mengolah air limbah medis sebelum masuk saluran kota.',
        en: 'Treats medical wastewater before it reaches the municipal drain.',
      }),
      kaki: `${lokasiPrefix}: ${lokasi(G0?.ipal, E0?.ipal)}`,
    },
    {
      ikon: Biohazard,
      judul: L({ id: 'TPS Limbah B3', en: 'Hazardous (B3) Waste Storage' }),
      ket: L({
        id: 'Penyimpanan sementara limbah tajam & infeksius berizin.',
        en: 'Permitted temporary storage for sharps and infectious waste.',
      }),
      kaki: `${lokasiPrefix}: ${lokasi(G0?.tps_limbah_b3, E0?.tps_limbah_b3)}`,
    },
    {
      ikon: Trash2,
      judul: L({ id: 'Limbah Domestik', en: 'Domestic Waste' }),
      ket: L({
        id: 'Pilah sampah non-medis menuju angkutan kota rutin.',
        en: 'Non-medical waste sorted for scheduled municipal pickup.',
      }),
      kaki: `${lokasiPrefix}: ${lokasi(G0?.tps_domestik, E0?.tps_domestik)}`,
    },
  ];

  return (
    <div className="bg-white text-slate-800">
      {/* ================= SECTION 1: HERO (HANYA JUDUL + GAMBAR) ================= */}
      {/* Fotonya sengaja diam: tidak ada slide-up di section ini supaya gambar tidak terasa
          "naik" saat halaman dibuka. Animasi hanya untuk judul (lihat motion.h1 di bawah). */}
      <section className="relative flex min-h-[560px] items-end overflow-hidden">
        <Image src={heroProfilMobile} alt="" fill priority sizes="100vw" quality={90} className="object-cover object-right md:hidden" />
        <Image src={heroProfil} alt="" fill priority sizes="100vw" quality={90} className="hidden object-cover md:block" />
        {/* Overlay gelap elegan untuk kontras teks putih (bukan dark mode). */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/60 to-slate-900/35" />

        <div className="relative mr-auto w-full max-w-6xl px-6 pb-12 lg:px-8 lg:pb-16">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-4xl text-balance text-5xl font-extrabold leading-[1.05] tracking-tight text-white [text-shadow:0_4px_30px_rgba(2,6,23,0.6)] lg:text-7xl"
          >
            {tp(lang, 'Profil Rumah Sakit Medistra Horizon Medan', 'Hospital Profile of Medistra Horizon Medan')}
          </motion.h1>
        </div>
      </section>

      {/* ============ SECTION 2: SEJARAH & KREDIBILITAS (EDITORIAL, DI BAWAH HERO) ============ */}
      <motion.section {...REVEAL} className="bg-white py-20 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:px-12">
          {/* Kiri: narasi sejarah mengalir bebas, tanpa card */}
          <div>
            <h2 className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 lg:text-5xl">
              {tp(lang, 'Jejak Langkah & Kredibilitas', 'A Trail of Trust')}
            </h2>
            <div className="mt-8">
              {lang === 'en' ? (
                <>
                  <p className="mb-6 text-lg leading-relaxed text-slate-700 lg:text-xl">
                    It all began with a single commitment: healthcare of world-class standards for the people of North
                    Sumatra. On <span className="font-bold text-cyan-700">26 October 2026</span>, RS Medistra Horizon
                    Medan officially opened its doors as a Type B general hospital in the heart of Medan city.
                  </p>
                  <p className="mb-6 text-lg leading-relaxed text-slate-700 lg:text-xl">
                    Growth then ran in stepwise fashion. <span className="font-bold text-cyan-700">Fourteen specialty
                    clinics</span> were opened gradually, completing our referral services one by one, from outpatient
                    care through to advanced inpatient treatment.
                  </p>
                  <p className="mb-6 text-lg leading-relaxed text-slate-700 lg:text-xl">
                    Today we are a <span className="font-bold text-cyan-700">ten-storey heart and cancer centre of
                    excellence</span>, formally <HL>Registered with the Health Office</HL> (Medan City Dinkes) and the
                    recipient of <HL>KARS Paripurna Accreditation</HL>, the highest accreditation level for hospital
                    quality and patient safety in Indonesia.
                  </p>
                </>
              ) : (
                <>
                  <p className="mb-6 text-lg leading-relaxed text-slate-700 lg:text-xl">
                    Semuanya bermula dari satu tekad: layanan kesehatan berstandar tinggi untuk masyarakat Sumatera
                    Utara. Pada <span className="font-bold text-cyan-700">26 Oktober 2026</span>, RS Medistra Horizon
                    Medan resmi beroperasi sebagai RSU Tipe B di jantung Kota Medan.
                  </p>
                  <p className="mb-6 text-lg leading-relaxed text-slate-700 lg:text-xl">
                    Pertumbuhan lalu berjalan bertahap. <span className="font-bold text-cyan-700">Empat belas
                    poliklinik spesialis</span> dibuka satu per satu untuk melengkapi layanan rujukan, dari rawat jalan
                    hingga rawat inap lanjutan.
                  </p>
                  <p className="mb-6 text-lg leading-relaxed text-slate-700 lg:text-xl">
                    Kini kami tumbuh menjadi <span className="font-bold text-cyan-700">pusat unggulan jantung &amp;
                    kanker sepuluh lantai</span>, <HL>Terdaftar Dinkes</HL> resmi pada Dinas Kesehatan Kota Medan, serta
                    meraih <HL>Akreditasi KARS Paripurna</HL>, peringkat tertinggi mutu keselamatan pasien rumah sakit
                    di Indonesia.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Kanan: carousel foto gedung, fasilitas, dan ruangan */}
          <SejarahCarousel />
        </div>
      </motion.section>

      {/* ============ SECTION 3: VISI, MISI & ICARE (BENTO GRID) ============ */}
      <motion.section {...REVEAL} className="bg-slate-50 py-20 lg:py-24">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <h2 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 lg:text-5xl">
            {tp(lang, 'Visi, Misi & Nilai Utama', 'Vision, Mission & Core Values')}
          </h2>

          {/* VISI: kutipan raksasa bergaya editorial, tanpa kotak kartu */}
          <div className="relative mt-16">
            <Quote
              aria-hidden
              className="pointer-events-none absolute -top-8 left-0 h-64 w-64 text-slate-900 opacity-5"
            />
            <div className="relative flex items-center gap-5">
              <span className="text-sm font-bold uppercase tracking-[0.35em] text-cyan-700">
                {tp(lang, 'Visi Kami', 'Our Vision')}
              </span>
              <span className="h-px flex-1 bg-slate-300" />
            </div>
            <motion.blockquote
              {...REVEAL_TEXT}
              className="relative mt-8 max-w-5xl text-balance text-3xl font-light leading-tight tracking-tight text-slate-900 md:text-5xl"
            >
              {profil.visi}
            </motion.blockquote>
          </div>

          {/* MISI: daftar vertikal bersih dengan tanda centang cyan */}
          <div className="mt-20">
            <div className="relative flex items-center gap-5">
              <span className="text-sm font-bold uppercase tracking-[0.35em] text-cyan-700">
                {tp(lang, 'Misi Kami', 'Our Mission')}
              </span>
              <span className="h-px flex-1 bg-slate-300" />
            </div>
            <motion.ul
              variants={STAGGER_WADAH}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-8 max-w-5xl space-y-6"
            >
              {profil.misi_poin.map((poin) => (
                <motion.li key={poin} variants={STAGGER_ISI} className="flex gap-4">
                  <CircleCheck className="mt-1 h-7 w-7 shrink-0 text-cyan-600" />
                  <p className="text-xl font-medium leading-relaxed text-slate-700">{poin}</p>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* ICARE: baris 5 card sky blue dengan animasi loop 3 fase (huruf -> kata -> deskripsi) */}
          <ICareAnimated nilai={profil.nilai} />
        </div>
      </motion.section>

      {/* ============ SECTION 4: STRUKTUR ORGANISASI (GRID, TANPA GARIS) ============ */}
      <motion.section {...REVEAL} className="bg-white py-20 lg:py-24">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 lg:text-5xl">
              {tp(lang, 'Struktur Organisasi & Jajaran Manajemen', 'Organization Structure & Management Team')}
            </h2>
          </div>

          {/* Baris 1: Owner, CEO, dan dua komite pengawas (2 kolom, lebih besar) */}
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {PUNCAK.map((p) => (
              <KartuPetinggi key={p.id} p={p} lang={lang} besar />
            ))}
          </div>

          {/* Baris 2: Tiga direktur bidang (3 kolom) */}
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {DIREKSI.map((d) => (
              <KartuPetinggi key={d.id} p={d} lang={lang} besar />
            ))}
          </div>

          {/* Baris 3: Manajer & Kepala Divisi (3 kolom, rata 3x3) */}
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[...MANAJER, ...KEPALA_DIVISI].map((m) => (
              <KartuPetinggi key={m.id} p={m} lang={lang} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* ============ SECTION 5: PENGELOLAAN LINGKUNGAN (DASHBOARD PREMIUM) ============ */}
      <motion.section {...REVEAL} className="bg-slate-50 py-20 lg:py-24">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 lg:text-5xl">
              {tp(lang, 'Pengelolaan Lingkungan', 'Environmental Management')}
            </h2>
            <p className="mt-4 text-xl leading-relaxed text-slate-600">
              {tp(
                lang,
                'Utilitas lingkungan terpusat di Lantai G untuk memastikan air bersih, pengolahan limbah, dan pembuangan yang aman sesuai standar.',
                'Environmental utilities are centralised on the Ground Floor to ensure safe clean water, waste treatment and disposal to standard.',
              )}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {LINGKUNGAN.map((f) => {
              const Ikon = f.ikon;
              return (
                <div
                  key={f.judul}
                  className="flex h-full flex-col rounded-xl border-t-4 border-emerald-500 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <Ikon className="h-8 w-8" />
                  </span>
                  <p className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-900">{f.judul}</p>
                  <p className="mt-2 flex-1 text-base leading-relaxed text-slate-500">{f.ket}</p>
                  <p className="mt-4 text-base font-semibold text-emerald-700">{f.kaki}</p>
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* ================= SECTION 6: DIREKTORI EKSTENSI TELEPON ================= */}
      <motion.section {...REVEAL} className="bg-white py-20 lg:py-24">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 lg:text-5xl">
              {tp(lang, 'Direktori Ekstensi Telepon', 'Phone Extension Directory')}
            </h2>
          </div>

          <div className="mt-12">
            <EkstensiDirectory />
          </div>
        </div>
      </motion.section>

      {/* ================= SECTION 7: PESAN, KESAN & MASUKAN ================= */}
      <FeedbackSection lang={lang} />
    </div>
  );
}
