'use client';

import React, { useState } from 'react';
import Image, { type StaticImageData } from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BadgeCheck,
  Calendar,
  Check,
  ChevronDown,
  ClipboardList,
  Clock,
  Coffee,
  FileText,
  Heart,
  HeartPulse,
  Info,
  Mail,
  MonitorSmartphone,
  PhoneCall,
  RotateCcw,
  Send,
  Sparkles,
  Stethoscope,
  TestTubes,
  Utensils,
  X,
  Zap,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import type { Language } from '../../../types';
import imgMcuHero from '@/images/hero/fasilitas/mcu.jpg';
import imgMcuHeroMobile from '@/images/hero/mobile-fasilitas/mcu.jpg';
import iconWhatsapp from '@/images/logo/whatsapp.png';
import imgMcuBasic from '@/images/logo/mcu/mcu-basic.png';
import imgMcuExecutive from '@/images/logo/mcu/mcu-executive.png';
import imgMcuVisa from '@/images/logo/mcu/mcu-visa.png';
import imgMcuUmroh from '@/images/logo/mcu/mcu-umroh-hajj.png';
import imgMcuPrakawin from '@/images/logo/mcu/mcu-prakawin.png';
import imgMcuWanita from '@/images/logo/mcu/mcu-wanita.png';
import imgMcuJantung from '@/images/logo/mcu/mcu-jantung-stroke.png';
import imgMcuCorporate from '@/images/logo/mcu/mcu-corporate.png';

/* ============================== TIPE & DATA ============================== */

type Teks = { id: string; en: string };
type Ikon = React.ComponentType<{ className?: string }>;

/**
 * Nomor WhatsApp unit MCU (sama dengan src/data/mcu.json) dan versi tampilnya.
 * Tautan wa.me menuntut format internasional, jadi angka 0 di depan ditukar
 * menjadi 62 -> 6281144415515.
 */
const NOMOR_WA = '6281144415515';
const WA_TAMPIL = '+62 811 4441 5515';

/* ------------------------------- HERO ---------------------------------- */

const tautanWa = (pesan: string) => `https://wa.me/${NOMOR_WA}?text=${encodeURIComponent(pesan)}`;

/** Harga rupiah penuh; null berarti tarif disusun per kebutuhan (paket khusus & B2B). */
function formatHarga(n: number, lang: Language): string {
  return lang === 'en' ? `IDR ${n.toLocaleString('en-US')}` : `Rp${n.toLocaleString('id-ID')}`;
}

/* --------------------------------- HERO --------------------------------- */

const PILLS: { teks: Teks; ikon: Ikon }[] = [
  { teks: { id: 'One-Stop Service', en: 'One-Stop Service' }, ikon: Sparkles },
  { teks: { id: 'Hasil Cepat & Digital', en: 'Fast & Digital Results' }, ikon: Zap },
  { teks: { id: 'Free Fasting Meal', en: 'Free Fasting Meal' }, ikon: Utensils },
];

/* ------------------------------ WHY CHOOSE US ----------------------------- */

const WHY: { judul: Teks; ket: Teks; poin: Teks[]; ikon: Ikon }[] = [
  {
    judul: { id: 'MCU Lounge, Ruang Tunggu Privat', en: 'MCU Lounge, a Private Waiting Room' },
    ket: {
      id: 'Semua tahapan dilalui di satu area khusus, terpisah dari poli dan UGD, sehingga Anda tidak bercampur dengan pasien yang sedang sakit.',
      en: 'Every step happens in one dedicated area, separated from the clinics and the emergency unit, so you never mix with unwell patients.',
    },
    poin: [
      { id: 'Antrean diatur per tahap oleh perawat pendamping', en: 'Queue arranged step by step by an accompanying nurse' },
      { id: 'Toilet, tempat ganti, dan musala dalam satu koridor', en: 'Toilet, changing corner and prayer room along one corridor' },
    ],
    ikon: BadgeCheck,
  },
  {
    judul: { id: 'Free Fasting Meal, Sarapan Gizi', en: 'Free Fasting Meal, a Nutritious Breakfast' },
    ket: {
      id: 'Begitu darah selesai diambil, sarapan gratis disajikan. Bukan hanya roti, tapi porsi dengan karbohidrat kompleks, protein, dan buah.',
      en: 'Once the blood draw is done, a free breakfast is served. Not just bread, but a portion with complex carbohydrates, protein and fruit.',
    },
    poin: [
      { id: 'Pilihan menu disesuaikan untuk diabetes & hipertensi', en: 'Menu options adjusted for diabetes and hypertension' },
      { id: 'Teh atau kopi tanpa gula tersedia sepanjang pagi', en: 'Unsweetened tea or coffee available all morning' },
    ],
    ikon: Coffee,
  },
  {
    judul: { id: 'Hasil Digital & Konsultasi', en: 'Digital Results & Consultation' },
    ket: {
      id: 'Resume medis diserahkan cetak dan PDF, lalu nilai yang di luar normal dijadwalkan ulang untuk dibahas dengan dokter.',
      en: 'The medical summary is given in print and as a PDF, then any out-of-range value is rebooked to be discussed with a doctor.',
    },
    poin: [
      { id: 'PDF dikirim lewat WhatsApp atau email sesuai pilihan', en: 'The PDF is sent by WhatsApp or email, your choice' },
      { id: 'Riwayat tersimpan, dibandingkan pada MCU berikutnya', en: 'History is stored and compared at your next screening' },
    ],
    ikon: MonitorSmartphone,
  },
];

/* ----------------------------- PAKET (8 ITEM) ----------------------------- */

interface Paket {
  id: string;
  nama: Teks;
  tagline: Teks;
  harga: number | null;
  populer?: boolean;
  fasilitas: Teks[];
  /** Lambang paket: emblem bundar 500×500 di src/images/logo/mcu (nama file = id paket). */
  gambar: StaticImageData;
  /** Kelas aksen literal (aman untuk JIT): gradien hue → putih + warna centang. */
  latar: string;
  cek: string;
}

const PAKETS: Paket[] = [
  {
    id: 'mcu-basic',
    nama: { id: 'Paket MCU Basic', en: 'Basic MCU Package' },
    tagline: { id: 'Screening kesehatan tahunan dasar untuk dewasa', en: 'Annual basic health screening for adults' },
    harga: 485000,
    fasilitas: [
      { id: 'Pemeriksaan fisik lengkap oleh dokter', en: 'Complete physical examination by a doctor' },
      { id: 'Darah lengkap (Hb, leukosit, trombosit)', en: 'Full blood count (Hb, leukocytes, platelets)' },
      { id: 'Gula darah puasa', en: 'Fasting blood glucose' },
      { id: 'Asam urat & profil kolesterol', en: 'Uric acid & cholesterol profile' },
      { id: 'Rontgen thorax', en: 'Chest radiography' },
      { id: 'Hasil cetak + konsultasi dokter', en: 'Printed results + doctor consultation' },
    ],
    gambar: imgMcuBasic,
    latar: 'bg-gradient-to-b from-cyan-50 via-white to-white',
    cek: 'text-cyan-600',
  },
  {
    id: 'mcu-executive',
    nama: { id: 'Paket MCU Executive', en: 'Executive MCU Package' },
    tagline: { id: 'Evaluasi menyeluruh fungsi organ & deteksi dini jantung', en: 'Comprehensive organ function assessment & early heart detection' },
    harga: 1450000,
    populer: true,
    fasilitas: [
      { id: 'Semua benefit Paket MCU Basic', en: 'All Basic MCU Package benefits' },
      { id: 'Rekam jantung (EKG) & echocardiography', en: 'ECG & echocardiography' },
      { id: 'Fungsi hati & ginjal (SGOT, SGPT, ureum, kreatinin)', en: 'Liver & kidney function (SGOT, SGPT, urea, creatinine)' },
      { id: 'Hormon tiroid (TSH, FT4)', en: 'Thyroid hormones (TSH, FT4)' },
      { id: 'USG abdomen', en: 'Abdominal ultrasound' },
      { id: 'Tumor marker CEA & AFP', en: 'Tumor markers CEA & AFP' },
      { id: 'Konsultasi dokter spesialis penyakit dalam', en: 'Consultation with an internal medicine specialist' },
      { id: 'Sertifikat hasil digital & cetak', en: 'Digital & printed result certificate' },
    ],
    gambar: imgMcuExecutive,
    latar: 'bg-gradient-to-b from-amber-50 via-white to-white',
    cek: 'text-amber-600',
  },
  {
    id: 'mcu-visa',
    nama: { id: 'Paket MCU Visa & Kerja', en: 'Visa & Work MCU Package' },
    tagline: { id: 'Persyaratan kesehatan untuk visa kerja dan studi', en: 'Medical requirements for work and study visas' },
    harga: 750000,
    fasilitas: [
      { id: 'Pemeriksaan fisik, tensi, tinggi & berat badan', en: 'Physical examination, blood pressure, height & weight' },
      { id: 'Visus, buta warna & pemeriksaan mata', en: 'Visual acuity, colour vision & eye examination' },
      { id: 'Laboratorium darah & urin lengkap', en: 'Complete blood and urine laboratory tests' },
      { id: 'Rontgen thorax 2 posisi', en: 'Chest radiography, 2 views' },
      { id: 'Rekam jantung (EKG)', en: 'Electrocardiogram (ECG)' },
      { id: 'Skrining penyakit menular sesuai negara tujuan', en: 'Infectious disease screening per destination country' },
      { id: 'Formulir medis resmi kedutaan dilayani', en: 'Official embassy medical forms accepted' },
    ],
    gambar: imgMcuVisa,
    latar: 'bg-gradient-to-b from-blue-50 via-white to-white',
    cek: 'text-blue-600',
  },
  {
    id: 'mcu-umroh',
    nama: { id: 'Paket MCU Umroh & Haji', en: 'Umrah & Hajj MCU Package' },
    tagline: { id: 'Syarat kesehatan jemaah umroh & haji usia 45 tahun ke atas', en: 'Health requirement for umrah & hajj pilgrims aged 45 and over' },
    harga: 620000,
    fasilitas: [
      { id: 'Pemeriksaan fisik oleh dokter pemeriksa jemaah', en: 'Physical examination by a pilgrim medical examiner' },
      { id: 'Tekanan darah, nadi & saturasi oksigen', en: 'Blood pressure, pulse & oxygen saturation' },
      { id: 'Gula darah puasa & profil kolesterol', en: 'Fasting glucose & cholesterol profile' },
      { id: 'Fungsi hati, ginjal & hemoglobin', en: 'Liver, kidney function & hemoglobin' },
      { id: 'Rekam jantung (EKG)', en: 'Electrocardiogram (ECG)' },
      { id: 'Pemeriksaan jiwa (kesiapan jemaah)', en: 'Mental health assessment (pilgrim readiness)' },
      { id: 'Sertifikat kesehatan jemaah umroh', en: 'Umrah pilgrim health certificate' },
    ],
    gambar: imgMcuUmroh,
    latar: 'bg-gradient-to-b from-emerald-50 via-white to-white',
    cek: 'text-emerald-600',
  },
  {
    id: 'mcu-prakawin',
    nama: { id: 'Paket Prakawin', en: 'Pre-marital Package' },
    tagline: { id: 'Untuk calon pengantin, idealnya dinilai bersama pasangan', en: 'For couples about to marry, best assessed together' },
    harga: null,
    fasilitas: [
      { id: 'TORCH: Toxoplasma, Rubella, CMV, Herpes', en: 'TORCH: Toxoplasma, Rubella, CMV, Herpes' },
      { id: 'Golongan darah dan faktor Rhesus', en: 'Blood group and Rhesus factor' },
      { id: 'Hepatitis B (HBsAg) dan HIV sesuai persetujuan', en: 'Hepatitis B (HBsAg) and HIV as consented' },
      { id: 'Skrining Thalassemia dan darah lengkap', en: 'Thalassemia screening and full blood count' },
    ],
    gambar: imgMcuPrakawin,
    latar: 'bg-gradient-to-b from-pink-50 via-white to-white',
    cek: 'text-pink-600',
  },
  {
    id: 'mcu-wanita',
    nama: { id: 'Paket Kesehatan Wanita', en: 'Women\'s Health Package' },
    tagline: { id: 'Skrining kandungan dan payudara untuk dewasa', en: 'Gynaecological and breast screening for adults' },
    harga: null,
    fasilitas: [
      { id: 'Pap smear (IVA atau ThinPrep)', en: 'Pap smear (IVA or ThinPrep)' },
      { id: 'USG payudara & transvaginal sesuai indikasi', en: 'Breast and transvaginal ultrasound as indicated' },
      { id: 'Mammografi, dianjurkan mulai usia 40 tahun', en: 'Mammography, advised from age 40' },
      { id: 'Pemeriksaan kandungan oleh dokter Sp.OG', en: 'Gynaecological examination by an obstetrician' },
    ],
    gambar: imgMcuWanita,
    latar: 'bg-gradient-to-b from-purple-50 via-white to-white',
    cek: 'text-purple-600',
  },
  {
    id: 'mcu-jantung',
    nama: { id: 'Paket Jantung & Stroke', en: 'Heart & Stroke Package' },
    tagline: { id: 'Untuk perokok, tensi tinggi, atau riwayat keluarga jantung', en: 'For smokers, high blood pressure, or a family history of heart disease' },
    harga: null,
    fasilitas: [
      { id: 'Treadmill exercise test (TMT) dengan pengawasan dokter', en: 'Treadmill exercise test (TMT) under doctor supervision' },
      { id: 'Profil lipid lengkap dan Apo-B', en: 'Full lipid profile and Apo-B' },
      { id: 'Echocardiography (USG jantung)', en: 'Echocardiography (cardiac ultrasound)' },
      { id: 'USG karotis dan ABI penanda risiko stroke', en: 'Carotid ultrasound and ABI as stroke risk markers' },
    ],
    gambar: imgMcuJantung,
    latar: 'bg-gradient-to-b from-orange-50 via-white to-white',
    cek: 'text-orange-600',
  },
  {
    id: 'mcu-corporate',
    nama: { id: 'Paket Corporate / B2B', en: 'Corporate / B2B Package' },
    tagline: { id: 'Screening massal karyawan dengan laporan rekap per divisi', en: 'Group employee screening with a per-division summary report' },
    harga: null,
    fasilitas: [
      { id: 'Penentuan isi paket bersama HR atau tim K3', en: 'Package contents agreed with HR or the occupational-safety team' },
      { id: 'Jadwal bergelombang di rumah sakit atau kunjungan lokasi', en: 'Wave scheduling at the hospital or an on-site visit' },
      { id: 'Sesuai paparan kerja: debu, bising, bahan kimia', en: 'Matched to workplace exposure: dust, noise, chemicals' },
      { id: 'Laporan rekapitulasi & rekomendasi tindak lanjut', en: 'Recapitulation report with follow-up recommendations' },
    ],
    gambar: imgMcuCorporate,
    latar: 'bg-gradient-to-b from-teal-50 via-white to-white',
    cek: 'text-teal-600',
  },
];

const PAKET_BY_ID: Record<string, Paket> = Object.fromEntries(PAKETS.map((p) => [p.id, p]));

/** Empat tab pengelompokan paket. */
const TABS: { label: Teks; ids: string[] }[] = [
  { label: { id: 'Rutin & Executive', en: 'Routine & Executive' }, ids: ['mcu-basic', 'mcu-executive'] },
  { label: { id: 'Travel & Legal', en: 'Travel & Legal' }, ids: ['mcu-visa', 'mcu-umroh'] },
  { label: { id: 'Kebutuhan Khusus', en: 'Special Needs' }, ids: ['mcu-prakawin', 'mcu-wanita', 'mcu-jantung'] },
  { label: { id: 'Perusahaan / B2B', en: 'Corporate / B2B' }, ids: ['mcu-corporate'] },
];

/* ------------------------------ ALUR (6 LANGKAH) ------------------------------ */

const ALUR: { judul: Teks; ket: Teks; ikon: Ikon }[] = [
  {
    judul: { id: 'Registrasi di Counter MCU', en: 'Registration at the MCU Counter' },
    ket: {
      id: 'Serahkan dokumen dan formulir di counter khusus. Perawat memasang gelang identitas, menjelaskan urutan ruangan, dan memberi nomor antrean.',
      en: 'Hand over your documents and forms at the dedicated counter. The nurse puts on your ID band, explains the room order and gives you a queue number.',
    },
    ikon: ClipboardList,
  },
  {
    judul: { id: 'Pemeriksaan Fisik & Tanda Vital', en: 'Physical Exam & Vital Signs' },
    ket: {
      id: 'Tinggi badan, berat badan dan IMT, tekanan darah, nadi, saturasi oksigen, suhu, visus, serta pemeriksaan buta warna.',
      en: 'Height, weight and BMI, blood pressure, pulse, oxygen saturation, temperature, visual acuity and colour-vision testing.',
    },
    ikon: Stethoscope,
  },
  {
    judul: { id: 'Pengambilan Sampel & Penunjang', en: 'Sampling & Supporting Tests' },
    ket: {
      id: 'Darah puasa, urine, lalu lanjutan sesuai paket: EKG, rontgen thorax, USG abdomen, dan pemeriksaan tambahan lainnya.',
      en: 'Fasting blood and urine, then the rest depending on your package: ECG, chest X-ray, abdominal ultrasound and any add-on tests.',
    },
    ikon: TestTubes,
  },
  {
    judul: { id: 'Istirahat & Breakfast', en: 'Rest & Breakfast' },
    ket: {
      id: 'Begitu darah selesai diambil, Anda boleh makan. Sarapan bergizi disiapkan di MCU Lounge supaya Anda tidak lemas menunggu hasil.',
      en: 'Once the blood draw is finished you may eat. A nutritious breakfast is waiting in the MCU Lounge so you do not feel weak while waiting.',
    },
    ikon: Coffee,
  },
  {
    judul: { id: 'Konsultasi Dokter Spesialis', en: 'Specialist Consultation' },
    ket: {
      id: 'Dokter spesialis penyakit dalam (Sp.PD) membacakan hasil, memisahkan yang normal dari yang perlu ditindaklanjuti, dan memberi saran.',
      en: 'An internal medicine specialist (Sp.PD) reads out the results, separates the normal from what needs follow-up, and gives advice.',
    },
    ikon: HeartPulse,
  },
  {
    judul: { id: 'Penyerahan Hasil', en: 'Result Handover' },
    ket: {
      id: 'Resume medis cetak diserahkan di tempat, salinan PDF dikirim lewat WhatsApp atau email, lengkap dengan daftar nilai di luar normal.',
      en: 'A printed medical summary is handed over on site, and the PDF copy is sent by WhatsApp or email, including the list of abnormal values.',
    },
    ikon: FileText,
  },
];

/* ---------------------------------- PANDUAN --------------------------------- */

const DO: Teks[] = [
  {
    id: 'Puasa 8-12 jam sebelum pengambilan darah. Air putih tanpa gula tetap boleh, bahkan dianjurkan supaya pembuluh darah tidak kolaps saat ditusuk.',
    en: 'Fast for 8-12 hours before the blood draw. Plain water is still allowed and actually recommended so the veins do not collapse during the needle.',
  },
  {
    id: 'Tetap minum obat rutin (darah tinggi, jantung, tiroid) dengan air putih, kecuali dokter penanggung jawab menginstruksikan lain.',
    en: 'Keep taking your routine medicines (blood pressure, heart, thyroid) with water, unless the doctor in charge instructs otherwise.',
  },
  {
    id: 'Pakai pakaian longgar dan dua potong agar mudah dibuka saat rontgen thorax dan pemasangan elektroda EKG.',
    en: 'Wear loose, two-piece clothing so it is easy to take off for the chest X-ray and when the ECG electrodes are placed.',
  },
  {
    id: 'Bawa KTP atau kartu BPJS, formulir perusahaan bila ini MCU massal, serta hasil MCU tahun sebelumnya.',
    en: 'Bring your ID card or BPJS card, the company form if this is a group screening, and last year results.',
  },
];

const DONT: Teks[] = [
  {
    id: 'Jangan makan berat selama masa puasa, termasuk gorengan, roti, camilan manis, dan minuman kemasan.',
    en: 'Do not eat heavy food during the fasting window, including fried snacks, bread, sweet snacks and packaged drinks.',
  },
  {
    id: 'Hindari alkohol 24 jam dan olahraga berat 12 jam sebelumnya; keduanya bisa mengacaukan enzim hati dan kreatinin.',
    en: 'Avoid alcohol for 24 hours and hard exercise for 12 hours beforehand; both can distort liver enzymes and creatinine.',
  },
  {
    id: 'Jangan kurang tidur (di bawah 6 jam) pada malam sebelum MCU; kurang tidur mengganggu tensi dan gula darah puasa.',
    en: 'Do not sleep less than 6 hours on the night before the screening; sleep debt disturbs blood pressure and fasting glucose.',
  },
  {
    id: 'Jangan merokok, mengunyah permen karet, atau minum kopi pada pagi hari tindakan.',
    en: 'Do not smoke, chew gum or drink coffee on the morning of the screening.',
  },
];

/* -------------------------------- FAQ & BOOKING ------------------------------ */

const FAQ: { q: Teks; a: Teks }[] = [
  {
    q: { id: 'Berapa lama proses MCU berlangsung?', en: 'How long does the whole screening take?' },
    a: {
      id: 'Paket Basic dan Visa rata-rata 2 sampai 3 jam sejak registrasi sampai konsultasi. Paket Executive dan Jantung bisa sampai 4 jam karena ada echocardiography dan treadmill. Sebagian besar waktu adalah menunggu laboratorium, dan Anda bisa duduk di MCU Lounge sambil menunggu.',
      en: 'The Basic and Visa packages average 2 to 3 hours from registration to consultation. Executive and Heart packages can reach 4 hours because of the echocardiography and treadmill. Most of that time is waiting for the laboratory, and you can sit in the MCU Lounge while waiting.',
    },
  },
  {
    q: { id: 'Kapan hasil keluar dan bagaimana cara mengambilnya?', en: 'When are results ready and how do I collect them?' },
    a: {
      id: 'Laboratorium rutin umumnya selesai dalam 1 sampai 3 hari kerja. Hasil cetak bisa diambil di counter MCU, dan salinan PDF kami kirim lewat WhatsApp atau email setelah dokter menandatangani resume medisnya.',
      en: 'Routine laboratory work is usually done within 1 to 3 working days. The printed copy can be picked up at the MCU counter, and the PDF copy is sent through WhatsApp or email once the doctor has signed the summary.',
    },
  },
  {
    q: { id: 'Apakah wajib puasa?', en: 'Is fasting mandatory?' },
    a: {
      id: 'Puasa wajib untuk paket yang mengukur gula darah puasa dan profil lipid, yaitu 8 sampai 12 jam dengan air putih tetap boleh. Untuk paket Visa, Umroh, atau skrining yang hanya memeriksa darah lengkap dan urine, sebagian bisa dikerjakan tanpa puasa. Tim akan menyesuaikan jam datang agar puasa Anda tidak berlebihan.',
      en: 'Fasting is required for packages that measure fasting blood sugar and lipid profile, that is 8 to 12 hours with water still allowed. For Visa, Umrah or screening packages that only check a full blood count and urine, some parts can be done without fasting. The team will adjust your arrival time so the fasting hours are not excessive.',
    },
  },
];

const PAKET_OPTS: Teks[] = [
  ...PAKETS.map((p) => p.nama),
  { id: 'Belum tahu, minta rekomendasi dokter', en: 'Not sure yet, please recommend for me' },
];

/* --------------------------------- UTILitas -------------------------------- */

function tanggalManis(tanggal: string, lang: Language): string {
  const d = new Date(tanggal);
  if (isNaN(d.getTime())) return tanggal;
  return d.toLocaleDateString(lang === 'en' ? 'en-GB' : 'id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
}

/* ================================ KOMPONEN ================================ */

/**
 * HALAMAN MCU (Cek Kesehatan) — hasil rombak struktur untuk strategi konversi baru.
 * Urutan: Hero → Why Choose Us → Pemilih Paket (tab) → Alur → Panduan → Booking & FAQ.
 * Seluruhnya light theme tanpa permukaan gelap. Tiap kartu memakai emblem bundar dari
 * src/images/logo/mcu (nama file = id paket) dan satu hue yang mengikuti namanya (Basic
 * cyan, Executive amber, Visa blue, Umroh emerald, Prakawin pink, Wanita purple, Jantung
 * orange, B2B teal) pada gradien hue → putih serta warna centangnya; semua kelas ditulis
 * literal di data karena Tailwind JIT tidak mengenali kelas hasil rakitan string. Kartu
 * unggulan di- elevate lewat `lg:-translate-y-6` (transform, jadi tinggi grid `items-stretch`
 * tidak berubah) dengan bingkai amber + badge ribbon amber di sudut kanan atas yang keluar
 * dari batas kartu. Margin/padding negatif sengaja tidak dipakai: itu menggeser kartu tanpa
 * meninggikannya dan membuat isinya terpotong.
 */
const McuClient: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (teks: Teks) => teks[lang];

  const [tab, setTab] = useState(0);
  const [faqBuka, setFaqBuka] = useState<number | null>(0);

  /* ------------------------- Booking form ------------------------- */
  const [nama, setNama] = useState('');
  const [telp, setTelp] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [paket, setPaket] = useState('');
  const [galat, setGalat] = useState('');
  const [terkirim, setTerkirim] = useState(false);
  const [linkWa, setLinkWa] = useState('');

  const paketTerpilih = PAKET_OPTS.find((p) => p.id === paket);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim()) {
      setGalat(L({ id: 'Nama lengkap belum diisi.', en: 'The full name is not filled in.' }));
      return;
    }
    if (telp.trim().replace(/\D/g, '').length < 9) {
      setGalat(L({ id: 'Nomor WhatsApp belum benar (minimal 9 angka).', en: 'The WhatsApp number is not valid yet (at least 9 digits).' }));
      return;
    }
    if (!tanggal) {
      setGalat(L({ id: 'Pilih tanggal kedatangan lebih dulu.', en: 'Choose an arrival date first.' }));
      return;
    }
    setGalat('');
    const baris = lang === 'en'
      ? [
        'Halo RS Medistra Horizon (English message follows), I would like to book a health screening.',
        `Name: ${nama.trim()}`,
        `WhatsApp: ${telp.trim()}`,
        `Package: ${paketTerpilih ? paketTerpilih.en : '-'}`,
        `Date: ${tanggalManis(tanggal, 'en')}`,
        'Sent from the Health Screening page of our website.',
      ]
      : [
        'Halo RS Medistra Horizon, saya ingin booking Cek Kesehatan (MCU).',
        `Nama: ${nama.trim()}`,
        `WhatsApp: ${telp.trim()}`,
        `Paket: ${paketTerpilih ? paketTerpilih.id : '-'}`,
        `Tanggal: ${tanggalManis(tanggal, 'id')}`,
        'Pesan ini dikirim dari halaman Cek Kesehatan di website kami.',
      ];
    const link = tautanWa(baris.join('\n'));
    setLinkWa(link);
    setTerkirim(true);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const reset = () => {
    setNama('');
    setTelp('');
    setTanggal('');
    setPaket('');
    setGalat('');
    setTerkirim(false);
    setLinkWa('');
  };

  const heading = (t: Teks, lead?: Teks) => (
    <>
      <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">{L(t)}</h2>
      <div className="mt-5 h-px w-full bg-slate-200" />
      {lead && <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">{L(lead)}</p>}
    </>
  );

  /** Satu kartu paket untuk pemilih tab. */
  const KartuPaket = (p: Paket) => {
    const unggulan = !!p.populer;
    const corporate = p.id === 'mcu-corporate';

    return (
      /* Kartu statis: induknya (panel tab) yang menggerakkan seluruh grup. `layout` di sini
         membuat framer-motion memproyeksikan ulang posisi kartu tiap jumlah kartu berubah
         (3 -> 1 di tab B2B), dan itu bertabrakan dengan transform milik induk — sumber
         getar "naik-turun" di mobile. */
      <article
        className={`relative flex flex-col rounded-3xl ${
          unggulan
            ? 'z-10 border-2 border-amber-400 p-7 shadow-2xl shadow-amber-500/20 sm:p-8 lg:-translate-y-6 lg:p-9'
            : 'border border-slate-200 p-7 shadow-sm sm:p-8'
        } ${p.latar}`}
      >
        {unggulan && (
          <span className="absolute -top-3 -right-3 z-20 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-md">
            <Sparkles className="h-3.5 w-3.5 shrink-0" />
            {L({ id: 'Paling Populer', en: 'Most Popular' })}
          </span>
        )}

        <Image
          src={p.gambar}
          alt=""
          width={96}
          height={96}
          sizes="96px"
          className="h-24 w-24 shrink-0 object-contain"
        />

        <h3 className="mt-5 text-2xl font-extrabold leading-snug tracking-tight text-navy-950">{L(p.nama)}</h3>
        <p className="mt-2 text-base leading-relaxed text-slate-600">{L(p.tagline)}</p>

        {/* Harga satu baris, angka besar. */}
        <div className="mt-6 flex items-end gap-2 rounded-2xl bg-white/70 px-5 py-4">
          {p.harga !== null ? (
            <>
              <span className="text-[38px] font-extrabold leading-none tracking-tight text-navy-950 tabular-nums sm:text-[42px]">
                {formatHarga(p.harga, lang)}
              </span>
              <span className="pb-1 text-base font-bold text-slate-500">{L({ id: '/ pax', en: '/ pax' })}</span>
            </>
          ) : (
            <span className="text-2xl font-extrabold leading-tight tracking-tight text-navy-950 sm:text-[28px]">
              {corporate
                ? L({ id: 'Tarif sesuai skala & isi paket', en: 'Pricing by scale & package contents' })
                : L({ id: 'Tarif disusun per kebutuhan', en: 'Pricing built per need' })}
            </span>
          )}
        </div>

        <ul className="mt-6 flex grow flex-col gap-y-3 text-slate-700">
          {p.fasilitas.map((f) => (
            <li key={f.id} className="flex items-start gap-2.5">
              <Check className={`mt-0.5 h-5 w-5 shrink-0 ${p.cek}`} />
              <span className="text-base leading-relaxed">{L(f)}</span>
            </li>
          ))}
        </ul>
      </article>
    );
  };

  return (
    <>
      {/* ============================ 1. HERO ============================ */}
      <section id="mcu" className="relative scroll-mt-28 overflow-hidden bg-white">
        <div aria-hidden className="absolute inset-0">
          <Image src={imgMcuHeroMobile} alt="" fill priority sizes="100vw" quality={90} className="object-cover object-right md:hidden" />
                    <Image src={imgMcuHero} alt="" fill priority sizes="100vw" quality={90} className="hidden object-cover md:block" />
        </div>
        {/* Scrim: putih pekat hanya di sisi kiri (sampai ±45%), kanan 100% bening. */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-white from-20% via-white/70 to-transparent to-60%" />

        <div className="relative z-10 mr-auto w-full max-w-7xl px-6 py-14 lg:px-12 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-4xl"
          >
            <h1 className="text-[clamp(2rem,3.6vw,3.25rem)] font-extrabold leading-[1.1] tracking-tight text-slate-900">
              {L({
                id: 'Deteksi Dini, Kenyamanan Maksimal. Screening Kesehatan Berstandar Eksekutif.',
                en: 'Early Detection, Maximum Comfort. Executive Standard Health Screening.',
              })}
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-700 sm:text-xl">
              {L({
                id: 'Nikmati pengalaman Medical Check-Up tanpa antre berjam-jam, di ruang tunggu privat (MCU Lounge), didampingi tim dokter spesialis.',
                en: 'Enjoy a Medical Check-Up without hours of queuing, in a private waiting room (MCU Lounge), accompanied by a team of specialists.',
              })}
            </p>

            {/* Tiga pill highlight */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              {PILLS.map((pill) => (
                <span
                  key={pill.teks.id}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-4 py-2.5 text-base font-bold text-slate-700 shadow-sm backdrop-blur-sm"
                >
                  <pill.ikon className="h-5 w-5 shrink-0 text-cyan-600" />
                  {L(pill.teks)}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ======================= 2. WHY CHOOSE US ======================= */}
      <section id="kenapa" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          {heading(
            { id: 'Kenapa MCU di Sini Berbeda', en: 'Why Our Screening Is Different' },
            {
              id: 'Yang membuat screening terasa ringan bukan hanya daftar pemeriksaannya, tapi bagaimana satu hari itu disusun untuk Anda.',
              en: 'What makes a screening feel easy is not only the list of tests, but how that single day is arranged around you.',
            },
          )}

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {WHY.map((n, i) => (
              <motion.article
                key={n.judul.id}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
              >
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-cyan-100 bg-cyan-50 text-cyan-700">
                  <n.ikon className="h-8 w-8" />
                </span>
                <h3 className="mt-6 text-xl font-extrabold leading-snug tracking-tight text-slate-900">{L(n.judul)}</h3>
                <p className="mt-3 text-lg leading-relaxed text-slate-600">{L(n.ket)}</p>
                <ul className="mt-5 space-y-2.5">
                  {n.poin.map((p) => (
                    <li key={p.id} className="flex items-start gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
                      <span className="text-base leading-relaxed text-slate-700">{L(p)}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ================ 3. UNIFIED PACKAGE SELECTOR (TAB) ================ */}
      <section id="paket" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          {heading(
            { id: 'Pilih Paket MCU Anda', en: 'Choose Your MCU Package' },
            {
              id: 'Delapan paket dikelompokkan dalam empat tab. Pilih kategori yang paling sesuai, lalu bandingkan isinya tanpa perlu berpindah halaman.',
              en: 'Eight packages grouped into four tabs. Pick the closest category and compare the contents without leaving the page.',
            },
          )}

          {/* Bar tab */}
          {/* Bar tab: grid 2 kolom di mobile/tablet supaya selalu 2 atas + 2 bawah.
              flex-wrap sebelumnya membuat jumlah baris berubah-ubah ikut lebar label,
              dan itu ikut menggeser panel di bawahnya saat tab dipegang. */}
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4" role="tablist" aria-label={L({ id: 'Kategori paket MCU', en: 'MCU package categories' })}>
            {TABS.map((t, i) => {
              const aktif = tab === i;
              return (
                <button
                  key={t.label.id}
                  type="button"
                  role="tab"
                  aria-selected={aktif}
                  onClick={() => setTab(i)}
                  className={`flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-extrabold transition-all sm:px-6 sm:text-base ${
                    aktif
                      ? 'bg-navy-950 text-white shadow-lg'
                      : 'border border-slate-200 bg-white text-slate-600 hover:border-cyan-300 hover:text-cyan-700'
                  }`}
                >
                  {L(t.label)}
                </button>
              );
            })}
          </div>

          {/* Panel tab. Sengaja TANPA AnimatePresence mode="wait": mode itu melepas kartu
              lama lebih dulu, jadi tinggi panel pernah runtuh ke 0 di tengah transisi. Di
              mobile (grid 1 kolom, 3 kartu -> 1 kartu) runtuh-then-pasang itu terbaca sebagai
              halaman yang melompat ke atas lalu ke bawah. Key di bawah tetap me-re mount
              grup secara atomik, sehingga hanya animasi masuk yang tersisa. */}
          <div className="mt-10">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`grid grid-cols-1 items-stretch gap-6 md:gap-7 ${
                TABS[tab].ids.length >= 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'
              }`}
            >
              {TABS[tab].ids.map((id) => KartuPaket(PAKET_BY_ID[id]))}
            </motion.div>
          </div>

          <p className="mt-10 flex items-start gap-3 text-base font-semibold leading-relaxed text-slate-600">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-cyan-600" />
            {L({
              id: 'Harga dapat berubah kapan saja. Konsultasi pemilihan paket gratis. Paket khusus (Prakawin, Kesehatan Wanita, Jantung & Stroke) dan Corporate tarifnya disusun setelah dokter menyesuaikan isinya dengan kebutuhan Anda.',
              en: 'Prices may change at any time. Package-selection advice is free. The special packages (Pre-marital, Women Health, Heart & Stroke) and Corporate pricing are confirmed after the doctor matches the contents to your needs.',
            })}
          </p>
        </div>
      </section>

      {/* ==================== 4. ALUR PELAKSANAAN (6 LANGKAH) ==================== */}
      <section id="alur" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          {heading(
            { id: 'Alur Pelaksanaan MCU', en: 'What Happens on the Day' },
            {
              id: 'Enam langkah, satu koridor, dan satu perawat pendamping dari awal sampai akhir. Anda selalu tahu sedang menunggu apa dan apa selanjutnya.',
              en: 'Six steps, one corridor, and one accompanying nurse from start to finish. You always know what you are waiting for and what comes next.',
            },
          )}

          <div className="relative mt-14">
            <div aria-hidden="true" className="absolute left-6 right-6 top-[23px] hidden h-0.5 bg-cyan-200 xl:block" />
            <div aria-hidden="true" className="absolute bottom-8 left-6 top-[23px] w-0.5 bg-cyan-200 md:hidden" />

            <ol className="relative grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-6 xl:gap-4">
              {ALUR.map((s, i) => (
                <motion.li
                  key={s.judul.id}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex gap-5 xl:block"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cyan-600 text-lg font-extrabold text-white ring-4 ring-slate-50">
                    {i + 1}
                  </span>
                  <div className="xl:mt-6">
                    <h3 className="flex items-start gap-2.5 text-xl font-extrabold leading-snug tracking-tight text-slate-900">
                      <s.ikon className="mt-1 h-5 w-5 shrink-0 text-cyan-600" />
                      <span>{L(s.judul)}</span>
                    </h3>
                    <p className="mt-2.5 text-base leading-relaxed text-slate-600">{L(s.ket)}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>

          <p className="mt-12 flex items-start gap-3 text-lg font-semibold leading-relaxed text-slate-700">
            <Info className="mt-1 h-5 w-5 shrink-0 text-cyan-600" />
            {L({
              id: 'Bawa hasil MCU sebelumnya. Nilai yang dibandingkan tahun ke tahun jauh lebih berguna daripada satu angka tunggal, karena dokter bisa melihat arahnya, bukan hanya posisinya hari ini.',
              en: 'Bring your previous screening results. Year-on-year numbers are far more useful than a single value, because the doctor can see the direction, not just where you stand today.',
            })}
          </p>
        </div>
      </section>

      {/* ==================== 5. PANDUAN PERSIAPAN (DO'S & DON'TS) ==================== */}
      <section id="persiapan" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          {heading(
            { id: 'Panduan Persiapan MCU', en: 'How to Prepare for Your Screening' },
            {
              id: 'Hasil screening hanya berguna bila persiapannya benar. Dua daftar ini adalah instruksi standar tim laboratorium dan dokter penyakit dalam kami. Ikuti yang kiri, hindari yang kanan, lalu datang dengan tenang.',
              en: 'A screening result is only useful when the preparation is right. These two lists are the standard instructions from our laboratory and internal medicine team. Follow the left column, avoid the right one, then arrive calmly.',
            },
          )}

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            {/* ---- Card Lakukan (hijau) ---- */}
            <motion.article
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="flex flex-col rounded-2xl border border-emerald-200 bg-emerald-50 p-7 shadow-sm"
            >
              <h3 className="flex items-center gap-3 text-2xl font-extrabold leading-snug tracking-tight text-emerald-900">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-200 bg-white text-emerald-700">
                  <Check className="h-6 w-6" />
                </span>
                {L({ id: 'Lakukan', en: 'Do' })}
              </h3>
              <ul className="mt-6 space-y-4">
                {DO.map((d) => (
                  <li key={d.id} className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-emerald-600" />
                    <span className="text-lg leading-relaxed text-emerald-950">{L(d)}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-7 flex items-start gap-2.5 border-t border-emerald-200 pt-5 text-base font-semibold leading-relaxed text-emerald-800">
                <Clock className="mt-0.5 h-5 w-5 shrink-0" />
                {L({
                  id: 'Jam puasa dihitung dari makan terakhir sampai jarum suntik pertama, bukan sampai Anda tiba di lokasi.',
                  en: 'Count the fasting hours from your last meal until the first needle, not until you arrive on site.',
                })}
              </p>
            </motion.article>

            {/* ---- Card Hindari (merah) ---- */}
            <motion.article
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="flex flex-col rounded-2xl border border-rose-200 bg-rose-50 p-7 shadow-sm"
            >
              <h3 className="flex items-center gap-3 text-2xl font-extrabold leading-snug tracking-tight text-rose-900">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-rose-200 bg-white text-rose-700">
                  <X className="h-6 w-6" />
                </span>
                {L({ id: 'Hindari', en: 'Don\'t' })}
              </h3>
              <ul className="mt-6 space-y-4">
                {DONT.map((d) => (
                  <li key={d.id} className="flex items-start gap-3">
                    <X className="mt-1 h-5 w-5 shrink-0 text-rose-600" />
                    <span className="text-lg leading-relaxed text-rose-950">{L(d)}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-7 flex items-start gap-2.5 border-t border-rose-200 pt-5 text-base font-semibold leading-relaxed text-rose-800">
                <Info className="mt-0.5 h-5 w-5 shrink-0" />
                {L({
                  id: 'Sudah terlanjur makan atau merokok? Tetap datang dan beri tahu perawat. Sebagian pemeriksaan masih bisa dilanjutkan, dan jadwal Anda tidak perlu diulang.',
                  en: 'Already ate or smoked? Still come and tell the nurse. Part of the checks can continue, and your date does not have to be rescheduled.',
                })}
              </p>
            </motion.article>
          </div>
        </div>
      </section>

      {/* ==================== 6. BOOKING & FAQ (2 KOLOM) ==================== */}
      <section id="booking" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          {heading(
            { id: 'Pertanyaan Umum & Booking Jadwal', en: 'Common Questions & Booking a Date' },
            {
              id: 'Sebelah kiri jawaban atas pertanyaan yang paling sering ditanyakan sebelum hari-H. Sebelah kanan formulir pengajuan jadwal: isinya langsung membuka WhatsApp unit MCU dengan rincian yang sudah tersusun.',
              en: 'On the left are the answers patients ask for most before the big day. On the right is the booking form: filling it in opens the MCU unit WhatsApp with the details already written out for you.',
            },
          )}

          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
            {/* ---------- KIRI: FAQ ---------- */}
            <div>
              <ul className="space-y-3">
                {FAQ.map((f, i) => {
                  const buka = faqBuka === i;
                  return (
                    <li key={f.q.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                      <button
                        type="button"
                        aria-expanded={buka}
                        aria-controls={`mcu-faq-panel-${i}`}
                        id={`mcu-faq-btn-${i}`}
                        onClick={() => setFaqBuka(buka ? null : i)}
                        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-lg font-extrabold text-slate-900 hover:text-cyan-700"
                      >
                        <span>{L(f.q)}</span>
                        <ChevronDown className={`h-5 w-5 shrink-0 text-cyan-600 transition-transform duration-300 ${buka ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence initial={false}>
                        {buka && (
                          <motion.div
                            key="panel"
                            id={`mcu-faq-panel-${i}`}
                            role="region"
                            aria-labelledby={`mcu-faq-btn-${i}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <p className="border-t border-slate-200 px-5 py-4 text-base leading-relaxed text-slate-600">{L(f.a)}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>

              <p className="mt-6 flex items-start gap-2.5 text-base font-semibold leading-relaxed text-slate-600">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-cyan-600" />
                {L({
                  id: 'Jawaban di atas bersifat edukasi umum. Instruksi tertulis dari dokter penanggung jawab yang berlaku untuk kondisi Anda.',
                  en: 'The answers above are general education. The written instruction from the doctor in charge is what applies to your condition.',
                })}
              </p>
            </div>

            {/* ---------- KANAN: BOOKING (kartu terang, aksen navy/cyan) ---------- */}
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-lg sm:p-10">
              <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-400/15 blur-3xl" />

              <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-100 bg-cyan-50 text-cyan-700">
                <Calendar className="h-7 w-7" />
              </span>
              <h3 className="relative mt-5 text-2xl font-extrabold leading-snug tracking-tight text-slate-900 sm:text-3xl">
                {L({ id: 'Booking Jadwal MCU', en: 'Book Your Screening Slot' })}
              </h3>
              <p className="relative mt-3 text-lg leading-relaxed text-slate-600">
                {L({
                  id: 'Sesi MCU berjalan pagi hari karena sebagian besar pasien puasa. Pilih tanggal, tim kami menyiapkan berkas dan alatnya sebelum Anda tiba.',
                  en: 'Screening sessions run in the morning because most patients are fasting. Pick a date, and our team prepares the file and equipment before you arrive.',
                })}
              </p>

              {terkirim ? (
                <div className="relative mt-8 rounded-2xl border border-cyan-200 bg-cyan-50 p-6">
                  <p className="flex items-center gap-2.5 text-lg font-extrabold text-cyan-900">
                    <Check className="h-6 w-6 shrink-0 text-cyan-600" />
                    {L({ id: 'Pengajuan siap terkirim', en: 'Your request is ready to send' })}
                  </p>
                  <dl className="mt-5 space-y-2.5 text-base text-cyan-900">
                    {[
                      [L({ id: 'Nama', en: 'Name' }), nama],
                      [L({ id: 'WhatsApp', en: 'WhatsApp' }), telp],
                      [L({ id: 'Paket', en: 'Package' }), paketTerpilih ? L(paketTerpilih) : '-'],
                      [L({ id: 'Tanggal', en: 'Date' }), tanggalManis(tanggal, lang)],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-4">
                        <dt className="font-bold text-cyan-800/80">{k}</dt>
                        <dd className="text-right font-extrabold text-cyan-950">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-5 text-base leading-relaxed text-cyan-900">
                    {L({
                      id: 'WhatsApp seharusnya terbuka di tab baru. Bila tidak, gunakan tombol di bawah ini. Perawat MCU akan mengonfirmasi jadwal lewat pesan balasan.',
                      en: 'WhatsApp should have opened in a new tab. If it did not, use the button below. The MCU nurse will confirm the date in a reply.',
                    })}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href={linkWa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-medical-green px-5 py-3 text-base font-extrabold text-white transition-colors hover:bg-emerald-700 active:scale-[0.98]"
                    >
                      <Image src={iconWhatsapp} alt="" className="h-5 w-5 shrink-0" />
                      {L({ id: 'Buka WhatsApp', en: 'Open WhatsApp' })}
                    </a>
                    <button
                      type="button"
                      onClick={reset}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 px-5 py-3 text-base font-extrabold text-slate-700 transition-colors hover:bg-slate-50"
                    >
                      <RotateCcw className="h-5 w-5 shrink-0" />
                      {L({ id: 'Booking lain', en: 'Book another' })}
                    </button>
                  </div>
                </div>
              ) : (
                <form className="relative mt-8 space-y-5" onSubmit={submit} noValidate>
                  <div>
                    <label htmlFor="mcu-nama" className="block text-sm font-extrabold uppercase tracking-wide text-slate-500">
                      {L({ id: 'Nama Lengkap', en: 'Full Name' })}
                    </label>
                    <input
                      id="mcu-nama" type="text" value={nama} onChange={(e) => setNama(e.target.value)}
                      placeholder={L({ id: 'Nama sesuai kartu identitas', en: 'Name as on your ID card' })}
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                    />
                  </div>

                  <div>
                    <label htmlFor="mcu-telp" className="block text-sm font-extrabold uppercase tracking-wide text-slate-500">
                      {L({ id: 'Nomor WhatsApp', en: 'WhatsApp Number' })}
                    </label>
                    <input
                      id="mcu-telp" type="tel" inputMode="tel" value={telp} onChange={(e) => setTelp(e.target.value)}
                      placeholder="0812 3456 7890"
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                    />
                  </div>

                  <div>
                    <label htmlFor="mcu-paket" className="block text-sm font-extrabold uppercase tracking-wide text-slate-500">
                      {L({ id: 'Pilihan Paket', en: 'Package Choice' })}
                    </label>
                    <select
                      id="mcu-paket" value={paket} onChange={(e) => setPaket(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                    >
                      <option value="">{L({ id: 'Pilih paket (opsional)', en: 'Choose a package (optional)' })}</option>
                      {PAKET_OPTS.map((p) => (
                        <option key={p.id} value={p.id}>{L(p)}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="mcu-tanggal" className="block text-sm font-extrabold uppercase tracking-wide text-slate-500">
                      {L({ id: 'Tanggal Kedatangan', en: 'Arrival Date' })}
                    </label>
                    <input
                      id="mcu-tanggal" type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                    />
                  </div>

                  {galat && (
                    <p className="flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-base font-semibold text-rose-800">
                      <X className="mt-0.5 h-5 w-5 shrink-0 text-rose-600" />
                      {galat}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-navy-950 px-5 py-4 text-lg font-extrabold text-white shadow-lg transition-colors hover:bg-navy-900 active:scale-[0.98]"
                  >
                    <Send className="h-5 w-5 shrink-0" />
                    {L({ id: 'Booking Sekarang', en: 'Book Now' })}
                  </button>

                  <p className="flex items-start gap-2.5 text-sm font-semibold leading-relaxed text-slate-500">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" />
                    {L({
                      id: 'Tombol ini membuka WhatsApp unit MCU dengan rincian di atas, bukan mengirim data ke sistem. Jadwal dianggap tetap setelah perawat mengonfirmasi ketersediaan ruang.',
                      en: 'This button opens the MCU unit WhatsApp with the details above; it does not submit data into our system. The date is final once the nurse confirms room availability.',
                    })}
                  </p>

                  <p className="flex items-center gap-2.5 border-t border-slate-200 pt-5 text-base font-extrabold text-slate-900">
                    <PhoneCall className="h-5 w-5 shrink-0 text-cyan-600" />
                    {L({ id: 'Atau hubungi langsung', en: 'Or contact us directly' })}
                    <span className="text-cyan-700">{WA_TAMPIL}</span>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default McuClient;
