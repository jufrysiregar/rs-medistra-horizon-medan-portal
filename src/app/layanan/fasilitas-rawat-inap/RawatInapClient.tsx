'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Activity,
  BadgeCheck,
  Baby,
  BedDouble,
  CalendarCheck,
  Check,
  ClipboardList,
  Clock,
  Coffee,
  Crown,
  Download,
  FileText,
  Gauge,
  HeartPulse,
  ListChecks,
  MapPin,
  Moon,
  Pill,
  Receipt,
  ShieldPlus,
  ShoppingBag,
  Stethoscope,
  Sun,
  Users,
  Wind,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import { useUIModal } from '../../../context/UIModalContext';
import fotoInap from '@/images/hero/fasilitas/rawat-inap.jpg';
import fotoInapMobile from '@/images/hero/mobile-fasilitas/rawat-inap.jpg';
import type { Language } from '../../../types';

/** Sepasang teks ID/EN; dipilih dengan [lang] supaya semua data tinggal di satu tempat. */
type Teks = { id: string; en: string };

/** Tipe ikon Lucide yang dipakai di kartu — cukup className. */
type Ikon = React.ComponentType<{ className?: string }>;

/** Daftar tarif kamar dibagikan sebagai PDF statis (public/files). */
const PDF_TARIF = '/files/tarif-rawat-inap.pdf';

/* --------------------------------- DATA --------------------------------- */

/** Tiga pilihan kelas kamar untuk halaman fasilitas rawat inap. */
const KELAS: {
  judul: Teks;
  lantai: string;
  kapasitas: Teks;
  tarif: Teks;
  ket: Teks;
  fasilitas: Teks[];
  ikon: Ikon;
}[] = [
  {
    judul: { id: 'VIP & VVIP / Suite', en: 'VIP & VVIP / Suite' },
    lantai: 'Lt 7 & Lt 9',
    kapasitas: { id: '1 bed privat, twin atas permintaan', en: '1 private bed, twin on request' },
    tarif: { id: 'Rp 1.850.000 s.d. Rp 2.750.000 per malam', en: 'IDR 1,850,000 to IDR 2,750,000 per night' },
    ket: {
      id: 'Kamar privat penuh untuk satu pasien, dengan ruang tunggu keluarga dan satu perawat pendamping yang mengenal kondisi pasien sejak hari pertama.',
      en: 'A fully private room for one patient, with a family waiting area and a primary nurse who knows the patient from day one.',
    },
    fasilitas: [
      { id: 'Single bed ukuran penuh', en: 'Full-size single bed' },
      { id: 'Sofa keluarga & temporary bed penunggu', en: 'Family sofa & caregiver couch' },
      { id: 'Smart TV & Wi-Fi pribadi', en: 'Smart TV & private Wi-Fi' },
      { id: 'Kulkas mini & pantry bersih', en: 'Mini fridge & clean pantry' },
      { id: 'Kamar mandi dalam, bathub di suite', en: 'En-suite bathroom, bathtub in suites' },
      { id: 'Menu makan pilihan & case manager', en: 'Choice of menus & case manager' },
    ],
    ikon: Crown,
  },
  {
    judul: { id: 'Kelas 1 & 2', en: 'Class 1 & 2' },
    lantai: 'Lt 6',
    kapasitas: { id: '2 s.d. 3 bed per kamar', en: '2 to 3 beds per room' },
    tarif: { id: 'Rp 650.000 s.d. Rp 950.000 per malam', en: 'IDR 650,000 to IDR 950,000 per night' },
    ket: {
      id: 'Pilihan paling sering dipakai keluarga: jarak antarkasur longgar, penunggu dapat bergantian istirahat, dan nurse station berada satu cluster.',
      en: 'The choice most families take: generous spacing between beds, room for caregivers to rest in turns, and a nurse station inside the same cluster.',
    },
    fasilitas: [
      { id: 'AC individual tiap kasur', en: 'Individual air conditioning per bed' },
      { id: 'TV & kulkas bersama', en: 'Shared TV & fridge' },
      { id: 'Kamar mandi dalam', en: 'En-suite bathroom' },
      { id: 'Call bell di sisi tempat tidur', en: 'Bedside call bell' },
      { id: 'Oksigen sentral & suction terpasang', en: 'Central oxygen & suction points' },
      { id: 'Meja dan kursi penunggu', en: 'Table and chairs for caregivers' },
    ],
    ikon: BedDouble,
  },
  {
    judul: { id: 'KRIS / Kelas 3', en: 'KRIS / Class 3' },
    lantai: 'Lt 6',
    kapasitas: { id: 'Maksimal 4 bed per kamar', en: 'Maximum 4 beds per room' },
    tarif: { id: 'Rp 350.000 per malam, sesuai kelas hak BPJS', en: 'IDR 350,000 per night, per BPJS class entitlement' },
    ket: {
      id: 'Kamar Rawat Inap Standar mengikuti ketentuan Kemenkes: jumlah kasur dibatasi, sirkulasi udara dijaga, dan setiap bed mendapat perlakuan yang sama.',
      en: 'Standard inpatient rooms built to Ministry of Health rules: a capped bed count, protected air circulation, and identical care for every bed.',
    },
    fasilitas: [
      { id: 'Tempat tidur elektrik individual', en: 'Individual electric bed' },
      { id: 'Ventilasi medis terkendali (AHU & HEPA)', en: 'Controlled medical ventilation (AHU & HEPA)' },
      { id: 'Partisi antarkasur & lampu baca', en: 'Bed partitions & reading light' },
      { id: 'Call bell pribadi tiap bed', en: 'Private call bell per bed' },
      { id: 'Kamar mandi dalam tiap blok', en: 'En-suite bathroom per block' },
      { id: 'Dukungan oksigen sentral', en: 'Central oxygen support' },
    ],
    ikon: Users,
  },
];

/** Status contoh per kelas untuk widget cek ketersediaan (dummy, tanpa klaim total bed). */
const KETERSEDIAAN: { kelas: Teks; lantai: string; tersedia: number; persen: number; ket: Teks }[] = [
  {
    kelas: { id: 'Suite VVIP & Executive', en: 'VVIP & Executive Suite' },
    lantai: 'Lt 9',
    tersedia: 0,
    persen: 96,
    ket: { id: 'Pemesanan didahulukan 1 hari sebelumnya', en: 'Best reserved one day ahead' },
  },
  {
    kelas: { id: 'Suite VIP Single / Twin', en: 'VIP Single / Twin Suite' },
    lantai: 'Lt 7',
    tersedia: 5,
    persen: 72,
    ket: { id: 'Sofa penunggu & kamar mandi bathub', en: 'Caregiver sofa & bathtub bathroom' },
  },
  {
    kelas: { id: 'Kelas 1', en: 'Class 1' },
    lantai: 'Lt 6',
    tersedia: 3,
    persen: 86,
    ket: { id: '2 bed per kamar, kamar mandi dalam', en: '2 beds per room, en-suite bathroom' },
  },
  {
    kelas: { id: 'Kelas 2', en: 'Class 2' },
    lantai: 'Lt 6',
    tersedia: 8,
    persen: 64,
    ket: { id: '3 bed per kamar, cluster nurse station', en: '3 beds per room, nurse-station cluster' },
  },
  {
    kelas: { id: 'KRIS / Kelas 3', en: 'KRIS / Class 3' },
    lantai: 'Lt 6',
    tersedia: 21,
    persen: 48,
    ket: { id: 'Maksimal 4 bed, tempat tidur elektrik', en: 'Maximum 4 beds, electric beds' },
  },
  {
    kelas: { id: 'ICU / HDU', en: 'ICU / HDU' },
    lantai: 'Lt 3',
    tersedia: 2,
    persen: 90,
    ket: { id: 'Dibuka atas indikasi medis dokter jaga', en: 'Released on medical indication only' },
  },
];

/** Lima unit perawatan intensif / kritis di sekitar tower inap. */
const INTENSIF: { kode: string; nama: Teks; lantai: string; ket: Teks; ikon: Ikon }[] = [
  {
    kode: 'ICU',
    nama: { id: 'Intensive Care Unit', en: 'Intensive Care Unit' },
    lantai: 'Lt 3',
    ket: {
      id: 'Dukungan organ dan ventilator mekanik bagi pasien kritis, dijaga intensifnis 24 jam.',
      en: 'Organ support and mechanical ventilation for critical patients, kept under 24-hour intensivist care.',
    },
    ikon: HeartPulse,
  },
  {
    kode: 'ICCU / CVCU',
    nama: { id: 'Perawatan Jantung Intensif', en: 'Intensive Cardiac Care' },
    lantai: 'Lt 3 & Lt 5',
    ket: {
      id: 'Serangan jantung, aritmia, dan pasca kateterisasi dipantau dengan EKG kontinu.',
      en: 'Heart attacks, arrhythmia and post-catheterisation cases tracked on continuous ECG.',
    },
    ikon: Activity,
  },
  {
    kode: 'NICU',
    nama: { id: 'Intensif Bayi', en: 'Neonatal Intensive' },
    lantai: 'Lt 6 North Wing',
    ket: {
      id: 'Inkubator bersuhu terkontrol untuk bayi lahir premature yang membutuhkan pemantauan ketat.',
      en: 'Temperature-controlled incubators for premature newborns needing close monitoring.',
    },
    ikon: Baby,
  },
  {
    kode: 'HCU',
    nama: { id: 'High Care Unit', en: 'High Care Unit' },
    lantai: 'Lt 3',
    ket: {
      id: 'Ruang transisi setelah ICU, tanda vital tetap dipantau sebelum pasien pindah ke kamar biasa.',
      en: 'A step-down ward after ICU where vital signs stay monitored before the patient moves to a regular room.',
    },
    ikon: Gauge,
  },
  {
    kode: 'ISOLASI',
    nama: { id: 'Ruang Isolasi Bertekanan', en: 'Pressure-Controlled Isolation' },
    lantai: 'Lt 8',
    ket: {
      id: 'Kasus menular dipisah dengan tekanan negatif, filter HEPA, dan anteroom; tersedia pula ruang tekanan positif.',
      en: 'Contagious cases separated by negative pressure, HEPA filtration and an anteroom; positive-pressure rooms are available too.',
    },
    ikon: Wind,
  },
];

/** Jam besuk resmi — ditampilkan sebagai kotak highlight tipis. */
const JAM_BESUK: { sesi: Teks; jam: string; ket: Teks; ikon: Ikon }[] = [
  {
    sesi: { id: 'Besuk Siang', en: 'Daytime Visiting' },
    jam: '11.00 s.d. 13.00 WIB',
    ket: {
      id: 'Waktu utama keluarga mendampingi pasien makan bersama dan beristirahat.',
      en: 'The main window for family to join the patient for a meal and quiet rest.',
    },
    ikon: Sun,
  },
  {
    sesi: { id: 'Besuk Sore', en: 'Evening Visiting' },
    jam: '17.00 s.d. 19.00 WIB',
    ket: {
      id: 'Kunjungan singkat sebelum catatan keperawatan shift malam ditutup.',
      en: 'A short visit before the night-shift nursing notes are closed.',
    },
    ikon: Moon,
  },
];

const ATURAN: { judul: Teks; ket: Teks; ikon: Ikon }[] = [
  {
    judul: { id: 'Maksimal satu penunggu per pasien', en: 'One caregiver per patient' },
    ket: {
      id: 'Penunggu wajib memakai kartu penunggu yang dikeluarkan nurse station, dan bergantian bila keluarga ingin hadir lebih dari satu orang.',
      en: 'The caregiver must wear the pass issued by the nurse station, and families take turns whenever more than one person wishes to stay.',
    },
    ikon: BadgeCheck,
  },
  {
    judul: { id: 'Anak di bawah 12 tahun tidak masuk ruang inap', en: 'Children under 12 stay out of the wards' },
    ket: {
      id: 'Imbauan ini untuk melindungi anak dari penularan di rumah sakit sekaligus menjaga kondisi pasien tetap tenang.',
      en: 'This protects children from hospital infections and keeps the patient environment calm and quiet.',
    },
    ikon: Baby,
  },
];

/** Alur dua arah: masuk dan pulang, ditampilkan sebagai garis waktu vertikal. */
const ALUR: { judul: Teks; ket: Teks; langkah: { nama: Teks; ket: Teks; waktu: Teks; ikon: Ikon }[] }[] = [
  {
    judul: { id: 'Alur Masuk Rawat Inap', en: 'Admission Pathway' },
    ket: { id: 'Dari keputusan dokter sampai pasien berada di kamar.', en: 'From the doctor\'s decision to the patient in a room.' },
    langkah: [
      {
        nama: { id: 'Rujukan IGD atau Poliklinik', en: 'Referral from the ED or a Clinic' },
        ket: {
          id: 'Dokter penanggung jawab menulis indikasi rawat inap dan pemesanan kamar melalui sistem; perawat menghubungi keluarga untuk persiapan berkas.',
          en: 'The responsible physician records the inpatient indication and books a bed in the system; a nurse calls the family to prepare the documents.',
        },
        waktu: { id: 'Langkah pertama, diunit asal pasien', en: 'First step, in the originating unit' },
        ikon: Stethoscope,
      },
      {
        nama: { id: 'Pendaftaran di Counter Admisi', en: 'Registration at the Admission Counter' },
        ket: {
          id: 'Identitas, penjaminan, dan pilihan kelas diverifikasi; pasien menerima gelang identitas berisi nama, tanggal lahir, dan alergi.',
          en: 'Identity, guarantee and room class are verified; the patient receives a wristband with name, date of birth and allergies.',
        },
        waktu: { id: 'Rata-rata 15 sampai 20 menit', en: 'Usually 15 to 20 minutes' },
        ikon: ClipboardList,
      },
    ],
  },
  {
    judul: { id: 'Alur Pemulangan Pasien', en: 'Discharge Pathway' },
    ket: { id: 'Semua berkas selesai sebelum keluarga meninggalkan rumah sakit.', en: 'Every document is completed before the family leaves the hospital.' },
    langkah: [
      {
        nama: { id: 'Resume Medis & Jadwal Kontrol', en: 'Medical Summary & Follow-up Schedule' },
        ket: {
          id: 'DPJP menyelesaikan resume medis, surat kontrol, dan surat keterangan sakit; perawat menjelaskan tanda yang harus diwaspadai di rumah.',
          en: 'The attending physician completes the medical summary, follow-up letter and sick note; the nurse explains the warning signs to watch at home.',
        },
        waktu: { id: 'Ditulis pada pagi hari kepulangan', en: 'Prepared on the morning of discharge' },
        ikon: FileText,
      },
      {
        nama: { id: 'Edukasi Obat oleh Apoteker', en: 'Medication Counselling by the Pharmacist' },
        ket: {
          id: 'Daftar obat beserta aturan minum, cara simpan, dan efek samping yang perlu dilaporkan dijelaskan langsung kepada pasien atau penunggu.',
          en: 'The medicine list with dosing, storage and reportable side effects is explained to the patient or caregiver directly.',
        },
        waktu: { id: 'Setelah resume medis selesai', en: 'Once the summary is signed' },
        ikon: Pill,
      },
      {
        nama: { id: 'Kasir & Penyelesaian Klaim', en: 'Cashier & Claim Settlement' },
        ket: {
          id: 'Rincian biaya dicetak, penjaminan BPJS maupun asuransi diselesaikan di tempat, dan keluarga menerima kwitansi beserta berkas pengantar kontrol.',
          en: 'The itemised bill is printed, BPJS and insurance claims are settled on site, and the family receives the receipt with the follow-up documents.',
        },
        waktu: { id: 'Sebelum pasien meninggalkan rumah sakit', en: 'Before the patient leaves the hospital' },
        ikon: Receipt,
      },
    ],
  },
];

const PENJAMINAN: {
  judul: Teks;
  ringkas: Teks;
  poin: Teks[];
  sorotan?: { label: string; isi: Teks }[];
  kelas: string;
  ikon: Ikon;
}[] = [
  {
    judul: { id: 'BPJS Kesehatan', en: 'BPJS Health Insurance' },
    ringkas: {
      id: 'Kamar Rawat Inap Standar (KRIS) dijamin penuh sesuai kelas hak peserta.',
      en: 'Standard inpatient rooms (KRIS) are fully guaranteed according to the member class.',
    },
    poin: [
      { id: 'Kepesertaan dicek lewat sistem V-Claim bersama petugas admisi saat pendaftaran.', en: 'Membership is checked through V-Claim together with the admission officer at registration.' },
      { id: 'Perawatan mengacu pada clinical pathway dan tarif INA-CBG, tanpa iur biaya di kamar standar.', en: 'Care follows the clinical pathway and INA-CBG tariffs, with no co-payment in a standard room.' },
      { id: 'Berkas penjaminan diurus paralel dengan tindakan medis sehingga pasien tidak menunggu.', en: 'Guarantee paperwork runs in parallel with treatment so the patient never waits.' },
    ],
    sorotan: [
      {
        label: 'SPRI',
        isi: {
          id: 'Surat Penjaminan Rawat Inap terbit dari counter admisi begitu kepesertaan aktif, sehingga keluarga tidak perlu menalangi biaya kamar standar.',
          en: 'The inpatient guarantee letter (SPRI) is issued at the admission counter once membership is active, so the family never has to pay upfront for a standard room.',
        },
      },
      {
        label: 'Naik Kelas (Top-Up)',
        isi: {
          id: 'Bila menghendaki kamar di atas kelas hak, selisih tarif dapat dibayar sendiri, dijangkau plafon korporasi, atau ditanggung rider asuransi keluarga.',
          en: 'To request a room above the entitled class, the difference can be self-paid, covered by a corporate allowance, or borne by a family insurance rider.',
        },
      },
    ],
    kelas: 'border-2 border-medical-red bg-white shadow-lg md:-translate-y-2',
    ikon: ShieldPlus,
  },
  {
    judul: { id: 'Asuransi Swasta & Korporat', en: 'Private & Corporate Insurance' },
    ringkas: {
      id: 'Layanan cashless dengan pre-authorization yang diurus rumah sakit.',
      en: 'Cashless service with pre-authorisation handled by the hospital.',
    },
    poin: [
      { id: 'Siapkan kartu peserta dan nomor polis pada saat pendaftaran rawat inap.', en: 'Have the participant card and policy number ready at inpatient registration.' },
      { id: 'Letter of guarantee diajukan ke pihak asuransi selama pasien masih dalam masa perawatan.', en: 'A letter of guarantee is filed with the insurer while the patient is still under care.' },
      { id: 'Limit tidak memadai dikonversi menjadi reimbursement dengan kwitansi rinci.', en: 'Insufficient limits are converted into reimbursement with itemised receipts.' },
    ],
    kelas: 'border border-slate-200 bg-white shadow-sm',
    ikon: BadgeCheck,
  },
  {
    judul: { id: 'Pasien Umum', en: 'Self-Pay Patients' },
    ringkas: {
      id: 'Estimasi biaya disampaikan sebelum pasien masuk kamar, bukan setelahnya.',
      en: 'A cost estimate is given before the patient enters the room, not after.',
    },
    poin: [
      { id: 'Tarif kamar per kelas tersedia pada dokumen PDF dan papan informasi tower inap.', en: 'Room rates per class are printed in the PDF document and on the inpatient tower notice board.' },
      { id: 'Pembayaran tunai, debit, kartu kredit, atau QRIS di kasir IGD maupun kasir rawat inap.', en: 'Cash, debit, credit card or QRIS payment at the ED or inpatient cashier.' },
      { id: 'Kwitansi rinci, resume medis, dan salinan hasil penunjang dapat dicetak pada hari kepulangan.', en: 'Itemised receipt, medical summary and supporting-result copies can be printed on the discharge day.' },
    ],
    kelas: 'border border-slate-200 bg-white shadow-sm',
    ikon: ListChecks,
  },
];

const PENDUKUNG: { judul: Teks; ket: Teks; titik: Teks[]; ikon: Ikon }[] = [
  {
    judul: { id: 'Layanan Gizi Pasien', en: 'Patient Nutrition Service' },
    ket: {
      id: 'Menu disusun dietisien mengikuti diagnosis dan selera pasien, diantar tiga kali sehari beserta selingan pada jam yang tetap.',
      en: 'Menus are designed by a dietitian around the diagnosis and the patient\'s taste, delivered three times a day with snacks at fixed hours.',
    },
    titik: [
      { id: 'Diet diabetes rendah gula', en: 'Low-sugar diabetic diet' },
      { id: 'Diet ginjal rendah garam & protein', en: 'Low-salt, low-protein renal diet' },
      { id: 'Makanan lunak & cair pasca tindakan', en: 'Soft and liquid food after procedures' },
      { id: 'Tinggi kalori untuk ibu menyusui', en: 'High-calorie for breastfeeding mothers' },
    ],
    ikon: Coffee,
  },
  {
    judul: { id: 'Tim DPJP & Visite Harian', en: 'Attending Physician Team & Daily Rounds' },
    ket: {
      id: 'Dokter penanggung jawab pasien memeriksa setiap pagi, membahas hasil laboratorium dan citra, lalu menjelaskan rencana terapi kepada keluarga.',
      en: 'The attending physician reviews the patient every morning, goes through laboratory and imaging results, then explains the treatment plan to the family.',
    },
    titik: [
      { id: 'Visite pagi tiap hari kerja', en: 'Weekday morning rounds' },
      { id: 'Rounding lintas spesialis untuk kasus kompleks', en: 'Multidisciplinary rounding for complex cases' },
      { id: 'Konsultasi lewat SIMRS bila kondisi berubah', en: 'Consultation through SIMRS when the condition changes' },
      { id: 'Edukasi keluarga saat visite berlangsung', en: 'Family education during the rounds' },
    ],
    ikon: Stethoscope,
  },
  {
    judul: { id: 'Fasilitas Umum Pendamping', en: 'Supporting Public Facilities' },
    ket: {
      id: 'Kebutuhan keluarga penunggu difasilitasi di dalam tower supaya tidak perlu meninggalkan area rumah sakit terlalu lama.',
      en: 'The needs of waiting families are covered inside the tower so they do not have to leave the hospital grounds for long.',
    },
    titik: [
      { id: 'Minimarket & ATM 24 jam', en: '24-hour minimarket & ATM' },
      { id: 'Kafetaria dan ruang makan keluarga', en: 'Cafeteria and family dining area' },
      { id: 'Mushola & tempat ibadah', en: 'Prayer room & place of worship' },
      { id: 'Parkir luas dengan jalur difabel', en: 'Large parking lot with accessible lanes' },
    ],
    ikon: ShoppingBag,
  },
];

/* ------------------------------ PEMBANTU WARNA ------------------------------ */

/** Warna bar keterisian & pil status — literal supaya JIT Tailwind ikut menghasilkannya. */
const warnaIsian = (p: number) => (p >= 90 ? 'bg-rose-500' : p >= 70 ? 'bg-amber-500' : 'bg-emerald-500');
const warnaPill = (p: number) =>
  p >= 90
    ? 'border-rose-200 bg-rose-50 text-rose-700'
    : p >= 70
      ? 'border-amber-200 bg-amber-50 text-amber-700'
      : 'border-emerald-200 bg-emerald-50 text-emerald-700';

/**
 * HALAMAN RAWAT INAP (/layanan/fasilitas-rawat-inap) — tampilan terang tanpa dark
 * mode, tipografi besar agar ramah lansia. Struktur: hero berlatar foto kamar, widget cek
 * ketersediaan kamar beserta tombol reservasi & unduh tarif, tiga kelas kamar,
 * lima unit intensif, tata tertib & jam besuk, garis waktu admisi-pemulangan,
 * penjaminan biaya, lalu layanan pendukung.
 */
const RawatInapClient: React.FC = () => {
  const { language } = useLanguage();
  const { openBookingModal } = useUIModal();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (teks: Teks) => teks[lang];

  /** Baris kamar yang sedang dipilih pada widget ketersediaan. */
  const [terpilih, setTerpilih] = useState(1);
  const kamar = KETERSEDIAAN[terpilih];

  const statusTeks = (t: number) =>
    t > 0
      ? lang === 'en'
        ? `${t} bed${t === 1 ? '' : 's'} available`
        : `Tersedia ${t} Bed`
      : lang === 'en'
        ? 'Fully occupied'
        : 'Terisi Penuh';

  return (
    <div className="bg-white text-slate-800">
      {/* ================= 1. HERO (LATAR BELAKANG FOTO) ================= */}
      <section className="relative overflow-hidden bg-white pt-12 pb-16 lg:pt-16 lg:pb-20">
        <div aria-hidden className="absolute inset-0">
          <Image
            src={fotoInapMobile}
            alt=""
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover object-right md:hidden"
          />
          <Image
            src={fotoInap}
            alt=""
            fill
            priority
            sizes="100vw"
            quality={90}
            className="hidden object-cover md:block"
          />
        </div>
        {/* Scrim: putih pekat hanya di sisi kiri (sampai ±45%), kanan 100% bening. */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-white from-20% via-white/70 to-transparent to-60%" />

        <div className="relative z-10 mr-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="max-w-4xl">
            <h1 className="text-[clamp(2.5rem,5vw,4.25rem)] font-extrabold leading-[1.05] tracking-tight text-slate-900">
              {L({ id: 'Layanan Rawat Inap', en: 'Inpatient Care Services' })}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-700 sm:text-xl">
              {L({
                id: 'Gedung Rawat Inap kami menyediakan berbagai pilihan fasilitas kamar perawatan yang lengkap, mulai dari Kelas Rawat Inap Standar (KRIS), Kelas 1, Kelas 2, hingga VIP Suite, serta dilengkapi Unit Perawatan Intensif dan Ruang Isolasi Bertekanan Khusus. Setiap kluster kamar didukung oleh Nurse Station terdedikasi 24 jam untuk memastikan pemantauan medis secara terukur dan respons panggilan perawat (nurse call) yang cepat dan sigap.',
                en: 'Our Inpatient building offers a complete range of care-room facilities, from Standard Inpatient Rooms (KRIS), Class 1 and Class 2, up to VIP Suites, and is equipped with an Intensive Care Unit and specialised pressure Isolation Rooms. Every room cluster is supported by a dedicated 24-hour Nurse Station to ensure measured medical monitoring and a fast, responsive nurse call.',
              })}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-4 py-2 text-base font-semibold text-slate-700 backdrop-blur-sm">
                <Clock className="h-5 w-5 shrink-0 text-emerald-600" />
                {L({ id: 'Perawat jaga 24 jam', en: 'Nurses on duty 24 hours' })}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-4 py-2 text-base font-semibold text-slate-700 backdrop-blur-sm">
                <MapPin className="h-5 w-5 shrink-0 text-emerald-600" />
                {L({ id: 'Tower Inap Lt 6 s.d. 9', en: 'Inpatient Tower Levels 6 to 9' })}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-4 py-2 text-base font-semibold text-slate-700 backdrop-blur-sm">
                <BadgeCheck className="h-5 w-5 shrink-0 text-emerald-600" />
                {L({ id: 'Nurse station tiap cluster', en: 'Nurse station per cluster' })}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. WIDGET: KETERSEDIAAN & RESERVASI ================= */}
      <section id="ketersediaan" className="scroll-mt-28 bg-white pb-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm sm:p-10">
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              {L({ id: 'Cek Ketersediaan Kamar', en: 'Check Room Availability' })}
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
              {/* DAFTAR KELAS — baris yang diklik memilih kamar untuk reservasi */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {KETERSEDIAAN.map((k, i) => {
                  const aktif = i === terpilih;
                  return (
                    <button
                      key={k.kelas.id}
                      type="button"
                      onClick={() => setTerpilih(i)}
                      aria-pressed={aktif}
                      className={`rounded-2xl border p-5 text-left transition-all ${
                        aktif
                          ? 'border-emerald-500 bg-white shadow-md ring-2 ring-emerald-500/20'
                          : 'border-slate-200 bg-white/70 hover:bg-white hover:shadow-sm'
                      }`}
                    >
                      <span className="flex items-start justify-between gap-3">
                        <span className="text-lg font-extrabold leading-snug text-slate-900">{L(k.kelas)}</span>
                        <span className={`shrink-0 rounded-full border px-3 py-1 text-xs font-extrabold uppercase tracking-wide ${warnaPill(k.persen)}`}>
                          {statusTeks(k.tersedia)}
                        </span>
                      </span>
                      <span className="mt-1 block text-sm font-semibold text-slate-500">
                        {k.lantai} · {L(k.ket)}
                      </span>
                      <span className="mt-3 block h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                        <span className={`block h-full rounded-full ${warnaIsian(k.persen)}`} style={{ width: `${k.persen}%` }} />
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* PANEL AKSI: ringkasan pilihan + dua tombol */}
              <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                <p className="text-sm font-bold uppercase tracking-wide text-slate-500">
                  {L({ id: 'Kamar terpilih', en: 'Selected room' })}
                </p>
                <p className="mt-2 text-2xl font-extrabold leading-snug text-slate-900">{L(kamar.kelas)}</p>
                <p className="mt-2 text-lg font-semibold text-slate-600">
                  {kamar.lantai} · {statusTeks(kamar.tersedia)}
                </p>

                <div className="mt-6 flex-1 rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <p className="flex items-center gap-2 text-base font-bold text-slate-900">
                    <CalendarCheck className="h-5 w-5 shrink-0 text-emerald-600" />
                    {L({ id: 'Cara mengamankan kamar', en: 'How to secure a room' })}
                  </p>
                  <ul className="mt-3 space-y-2 text-base leading-relaxed text-slate-600">
                    <li className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                      {L({
                        id: 'Isi formulir reservasi, petugas admisi menghubungi keluarga dalam 30 menit.',
                        en: 'Fill in the reservation form and the admission officer calls the family within 30 minutes.',
                      })}
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                      {L({
                        id: 'Kepastian kamar final dikonfirmasi saat pendaftaran di counter admisi.',
                        en: 'The final room confirmation is given at the admission counter during registration.',
                      })}
                    </li>
                  </ul>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => openBookingModal()}
                    className="inline-flex items-center justify-center gap-3 rounded-2xl bg-medical-green px-6 py-4 text-lg font-extrabold text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-600 hover:shadow-xl active:scale-[0.98]"
                  >
                    <CalendarCheck className="h-6 w-6 shrink-0" />
                    {L({ id: 'Booking / Reservasi Kamar', en: 'Book / Reserve a Room' })}
                  </button>
                  <a
                    href={PDF_TARIF}
                    download
                    className="inline-flex items-center justify-center gap-3 rounded-2xl border-2 border-slate-300 bg-white px-6 py-4 text-lg font-bold text-slate-800 transition-colors hover:border-slate-900 hover:bg-slate-50"
                  >
                    <Download className="h-6 w-6 shrink-0" />
                    {L({ id: 'Download Tarif Kamar (PDF)', en: 'Download Room Rates (PDF)' })}
                  </a>
                </div>

                <p className="mt-4 text-sm font-semibold leading-snug text-slate-500">
                  {L({
                    id: 'Status pembaruan otomatis setiap 15 menit mengikuti pengisian ruang perawatan.',
                    en: 'Status refreshes every 15 minutes following ward occupancy.',
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. PILIHAN KAMAR (GRID 3 KOLOM) ================= */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Pilihan Kamar Rawat Inap', en: 'Inpatient Room Choices' })}
          </h2>
          <div className="mt-5 h-px w-full bg-slate-200" />

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {KELAS.map((k, i) => (
              <motion.article
                key={k.judul.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: 'easeOut' }}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-emerald-700">
                    <k.ikon className="h-7 w-7" />
                  </span>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-bold text-slate-700">
                    {k.lantai}
                  </span>
                </div>

                <h3 className="mt-5 text-2xl font-extrabold leading-snug text-slate-900">{L(k.judul)}</h3>
                <p className="mt-2 text-lg font-semibold text-slate-500">{L(k.kapasitas)}</p>
                <p className="mt-4 text-lg leading-relaxed text-slate-600">{L(k.ket)}</p>

                <ul className="mt-5 flex-1 space-y-2.5 border-t border-slate-100 pt-5">
                  {k.fasilitas.map((f) => (
                    <li key={f.id} className="flex gap-3 text-lg leading-relaxed text-slate-700">
                      <Check className="mt-1 h-5 w-5 shrink-0 text-emerald-600" />
                      {L(f)}
                    </li>
                  ))}
                </ul>

                <p className="mt-6 rounded-xl bg-slate-50 px-4 py-3 text-base font-bold text-slate-800">
                  {L(k.tarif)}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 4. UNIT INTENSIF (GRID 5 KOLOM) ================= */}
      <section className="bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Unit Perawatan Intensif', en: 'Intensive Care Units' })}
          </h2>
          <div className="mt-5 h-px w-full bg-slate-200" />

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {INTENSIF.map((u, i) => (
              <motion.div
                key={u.kode}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: 'easeOut' }}
                className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-emerald-700">
                  <u.ikon className="h-6 w-6" />
                </span>
                <p className="mt-5 text-xl font-extrabold tracking-tight text-slate-900">{u.kode}</p>
                <p className="mt-1 text-base font-semibold text-slate-500">{L(u.nama)}</p>
                <p className="mt-3 flex-1 text-lg leading-relaxed text-slate-600">{L(u.ket)}</p>
                <p className="mt-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-500">
                  <MapPin className="h-4 w-4 shrink-0 text-emerald-600" />
                  {u.lantai}
                </p>
              </motion.div>
            ))}
          </div>

          <p className="mt-8 max-w-5xl text-base font-semibold leading-relaxed text-slate-500 sm:text-lg">
            {L({
              id: 'Masuk ke unit intensif selalu atas indikasi dokter. Keluarga pendamping diterima pada jadwal yang diatur ruang perawat, dan kondisi pasien disampaikan lewat update tertulis setiap pergantian shift.',
              en: 'Entry to an intensive unit always follows the physician\'s indication. Accompanying family is received on a schedule set by the ward nurses, and the patient condition is shared through a written update at every shift change.',
            })}
          </p>
        </div>
      </section>

      {/* ================= 5. TATA TERTIB & JAM BESUK ================= */}
      <section className="bg-white pb-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Tata Tertib & Jam Besuk', en: 'House Rules & Visiting Hours' })}
          </h2>
          <div className="mt-5 h-px w-full bg-slate-200" />

          {/* Kotak highlight tipis: dua sesi besuk */}
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {JAM_BESUK.map((j) => (
              <div key={j.sesi.id} className="rounded-2xl border border-emerald-200 bg-emerald-50 p-7">
                <p className="flex items-center gap-3 text-lg font-extrabold uppercase tracking-wide text-emerald-800">
                  <j.ikon className="h-6 w-6 shrink-0" />
                  {L(j.sesi)}
                </p>
                <p className="mt-4 font-mono text-3xl font-extrabold tracking-tight text-emerald-900 sm:text-4xl">{j.jam}</p>
                <p className="mt-3 text-lg leading-relaxed text-emerald-800">{L(j.ket)}</p>
              </div>
            ))}
          </div>

          {/* Aturan penunggu & anak */}
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {ATURAN.map((a) => (
              <div key={a.judul.id} className="flex gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-7">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-emerald-700">
                  <a.ikon className="h-7 w-7" />
                </span>
                <div>
                  <h3 className="text-xl font-extrabold leading-snug text-slate-900">{L(a.judul)}</h3>
                  <p className="mt-2 text-lg leading-relaxed text-slate-600">{L(a.ket)}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-5xl text-base font-semibold leading-relaxed text-slate-500 sm:text-lg">
            {L({
              id: 'Catatan: di luar jam besuk, ruang perawatan tetap dapat diakses oleh satu penunggu resmi berkartu. Untuk ICU, NICU, dan ruang isolasi, jumlah pendamping diatur terpisah oleh ruang perawat.',
              en: 'Note: outside visiting hours one registered caregiver with a pass may still reach the ward. For ICU, NICU and isolation rooms, the number of companions is set by the ward nurses.',
            })}
          </p>
        </div>
      </section>

      {/* ================= 6. ALUR ADMISI & PEMULANGAN (TIMELINE) ================= */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Alur Admisi & Pemulangan', en: 'Admission & Discharge Pathway' })}
          </h2>
          <div className="mt-5 h-px w-full bg-slate-200" />

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            {ALUR.map((a) => (
              <div key={a.judul.id} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <h3 className="text-2xl font-extrabold leading-snug tracking-tight text-slate-900">{L(a.judul)}</h3>
                <p className="mt-2 text-lg leading-relaxed text-slate-600">{L(a.ket)}</p>

                <ol className="mt-8">
                  {a.langkah.map((s, i) => (
                    <li key={s.nama.id} className="flex gap-5">
                      {/* Rel kiri: nomor ikonik + garis penghubung antar langkah */}
                      <div className="flex flex-col items-center">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-emerald-700">
                          <s.ikon className="h-6 w-6" />
                        </span>
                        {i < a.langkah.length - 1 && <span className="my-2 w-px flex-1 bg-slate-200" />}
                      </div>

                      <div className={i < a.langkah.length - 1 ? 'pb-8' : ''}>
                        <p className="text-sm font-bold uppercase tracking-wide text-slate-500">
                          {L({ id: `Langkah ${i + 1}`, en: `Step ${i + 1}` })}
                        </p>
                        <p className="mt-1 text-xl font-extrabold leading-snug text-slate-900">{L(s.nama)}</p>
                        <p className="mt-2 text-lg leading-relaxed text-slate-600">{L(s.ket)}</p>
                        <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-sm font-bold text-slate-700">
                          <Clock className="h-4 w-4 shrink-0 text-emerald-600" />
                          {L(s.waktu)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 7. PENJAMINAN PEMBAYARAN ================= */}
      <section className="bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Penjaminan & Metode Pembayaran', en: 'Payment Guarantee & Methods' })}
          </h2>
          <div className="mt-5 h-px w-full bg-slate-200" />

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {PENJAMINAN.map((p) => (
              <article key={p.judul.id} className={`relative flex flex-col rounded-2xl p-8 transition-shadow hover:shadow-md ${p.kelas}`}>
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-emerald-700">
                  <p.ikon className="h-7 w-7" />
                </span>
                <h3 className="mt-6 text-2xl font-extrabold text-slate-900">{L(p.judul)}</h3>
                <p className="mt-3 text-lg leading-relaxed text-slate-600">{L(p.ringkas)}</p>

                {p.sorotan && (
                  <div className="mt-6 space-y-3 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
                    {p.sorotan.map((s) => (
                      <p key={s.label} className="text-base leading-relaxed text-emerald-900">
                        <span className="font-extrabold">{s.label}</span>
                        {', '}
                        {L(s.isi)}
                      </p>
                    ))}
                  </div>
                )}

                <ul className="mt-6 flex-1 space-y-3 border-t border-slate-100 pt-5">
                  {p.poin.map((poi) => (
                    <li key={poi.id} className="flex gap-3 text-lg leading-relaxed text-slate-600">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-slate-300" />
                      {L(poi)}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 8. LAYANAN PENDUKUNG ================= */}
      <section className="border-t border-slate-100 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Layanan Pendukung Selama Perawatan', en: 'Supporting Services During Your Stay' })}
          </h2>
          <div className="mt-5 h-px w-full bg-slate-200" />

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {PENDUKUNG.map((d, i) => (
              <motion.div
                key={d.judul.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: 'easeOut' }}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-emerald-700">
                  <d.ikon className="h-7 w-7" />
                </span>
                <h3 className="mt-6 text-2xl font-extrabold leading-snug text-slate-900">{L(d.judul)}</h3>
                <p className="mt-3 text-lg leading-relaxed text-slate-600">{L(d.ket)}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {d.titik.map((t) => (
                    <li
                      key={t.id}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-base font-semibold text-slate-700"
                    >
                      {L(t)}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <p className="mt-8 max-w-5xl text-base font-semibold leading-relaxed text-slate-500 sm:text-lg">
            {L({
              id: 'Permintaan khusus seperti diet religi, makanan keluarga penunggu, atau penambahan temporary bed dapat disampaikan ke perawat ruang; biaya tambahan dijelaskan sebelum pesanan dibuat.',
              en: 'Special requests such as religious diets, meals for waiting relatives, or an extra caregiver bed can be raised with the ward nurse; any extra charge is explained before the order is placed.',
            })}
          </p>
        </div>
      </section>
    </div>
  );
};

export default RawatInapClient;
