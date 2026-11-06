'use client';

import React from 'react';
import Image from 'next/image';
import {
  BedDouble,
  BadgeCheck,
  CalendarCheck,
  Check,
  ClipboardList,
  Clock,
  Crown,
  FlaskConical,
  Lock,
  MapPin,
  MessageCircle,
  Pill,
  ShieldCheck,
  ShieldPlus,
  Siren,
  Stethoscope,
  Syringe,
  ThermometerSnowflake,
  Truck,
  Wind,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import fotoFarmasi from '@/images/hero/fasilitas/farmasi.jpg';
import fotoFarmasiMobile from '@/images/hero/mobile-layanan/farmasi.jpg';
import FarmasiWidgets from './FarmasiWidgets';
import type { Language } from '../../../types';

/** Sepasang teks ID/EN; dipilih dengan [lang] supaya semua data tinggal di satu tempat. */
type Teks = { id: string; en: string };

/** Tipe ikon Lucide yang dipakai di kartu — cukup className. */
type Ikon = React.ComponentType<{ className?: string }>;

/* --------------------------------- DATA --------------------------------- */

/** Empat depo sesuai denah lantai & jam layanan instalasi farmasi. */
const DEPO: { judul: Teks; lantai: string; jam: Teks; ket: Teks; poin: Teks[]; ikon: Ikon }[] = [
  {
    judul: { id: 'Depo Rawat Jalan', en: 'Outpatient Depot' },
    lantai: 'Lt 1 · Area Poli',
    jam: { id: '07.00 – 21.00', en: '07.00 – 21.00' },
    ket: {
      id: 'Melayani resep dari seluruh poli umum dan spesialis. Obat diracik di tempat, lalu dipanggil dengan nomor antrean yang tampil di layar.',
      en: 'Serves prescriptions from all general and specialist clinics. Medicine is compounded on site, then called by the queue number shown on the screen.',
    },
    poin: [
      { id: 'Racik sederhana & serbuk bagi anak', en: 'Simple compounding & paediatric powder' },
      { id: 'Etiket besar per aturan minum', en: 'Large label per dosing schedule' },
      { id: 'Serah terima & edukasi 5 menit', en: 'Handover & a 5-minute counselling' },
    ],
    ikon: ClipboardList,
  },
  {
    judul: { id: 'Depo Rawat Inap (UDD)', en: 'Inpatient Depot (UDD)' },
    lantai: 'Lt 6 & Lt 7',
    jam: { id: '07.00 – 22.00', en: '07.00 – 22.00' },
    ket: {
      id: 'Unit Dose Dispensing: obat disiapkan per sekali minum, bukan per kotak, sehingga tidak ada obat tersisa di nakas pasien.',
      en: 'Unit-dose dispensing: medicine is prepared for a single dose time, not by the box, so no leftover stock stays on the patient bedside.',
    },
    poin: [
      { id: 'Rekap order dokter tiap shift', en: 'Daily doctor-order reconciliation per shift' },
      { id: 'Kemasan dosis bertulis nama & jam', en: 'Dose packs printed with name & time' },
      { id: 'Koordinasi perawat sebelum pemberian', en: 'Nurse hand-over before administration' },
    ],
    ikon: BedDouble,
  },
  {
    judul: { id: 'Depo UGD & ICU (Cito)', en: 'ER & ICU Depot (Cito)' },
    lantai: 'Lt 3 & Area UGD',
    jam: { id: '24 Jam Nonstop', en: '24 hours nonstop' },
    ket: {
      id: 'Lemari obat cito siap untuk kasus gawat darurat. Stok high-alert disimpan terpisah dan setiap pengambilan tercatat dua petugas.',
      en: 'A cito cabinet ready for emergencies. High-alert stock is stored separately and every retrieval is recorded by two staff members.',
    },
    poin: [
      { id: 'Akses < 3 menit untuk resusitasi', en: 'Under 3 minutes for resuscitation' },
      { id: 'Elektrolit pekat & narkotika terkunci', en: 'Locked concentrated electrolytes & narcotics' },
      { id: 'Cold chain adrenalin & antivenom', en: 'Cold-chain adrenaline & antivenom' },
    ],
    ikon: Siren,
  },
  {
    judul: { id: 'Depo Eksekutif (Private Wing)', en: 'Executive Depot (Private Wing)' },
    lantai: 'Lt 7 VIP & Lt 9 VVIP',
    jam: { id: '07.00 – 22.00', en: '07.00 – 22.00' },
    ket: {
      id: 'Layanan khusus pasien eksekutif dan asuransi utama, termasuk permintaan obat paten yang tidak tersedia di daftar rutin.',
      en: 'Dedicated service for executive and major-insurance patients, including brand-name medicine requests outside the routine list.',
    },
    poin: [
      { id: 'Pengantaran obat ke kamar suite', en: 'Medicine delivered to the suite' },
      { id: 'Penyediaan obat paten & impor', en: 'Brand-name & imported medicine sourcing' },
      { id: 'Apoteker pendamping kasus pribadi', en: 'A personal case pharmacist' },
    ],
    ikon: Crown,
  },
];

/** Tiga layanan unggulan yang membedakan farmasi kami. */
const UNGGULAN: { judul: Teks; label: Teks; ket: Teks; poin: Teks[]; ikon: Ikon }[] = [
  {
    judul: { id: 'Antar Obat ke Rumah', en: 'Home Medicine Delivery' },
    label: { id: 'Home Delivery', en: 'Home Delivery' },
    ket: {
      id: 'Obat program kronis dan obat lanjutan dapat diantar ke rumah, sehingga pasien lansia tidak perlu bolak-balik ke depo.',
      en: 'Chronic-programme and refill medicine can be brought to your home, so elderly patients do not need to travel to the depot again.',
    },
    poin: [
      { id: 'Kurir dua kali sehari: 12.00 & 16.00', en: 'Courier twice daily: 12.00 & 16.00' },
      { id: 'Kotak pendingin untuk obat bertanda dingin', en: 'Cooler box for cold-chain items' },
      { id: 'Tanda terima digital saat serah terima', en: 'Digital receipt on hand-over' },
    ],
    ikon: Truck,
  },
  {
    judul: { id: 'Konseling & Informasi Obat', en: 'Counselling & Drug Information' },
    label: { id: 'Tele-pharmacy', en: 'Tele-pharmacy' },
    ket: {
      id: 'Konsultasi jarak jauh dengan apoteker penanggung jawab mengenai dosis, efek samping, dan interaksi obat tanpa menambah antrian.',
      en: 'Remote consultation with the responsible pharmacist on dose, side effects, and interactions without joining the queue.',
    },
    poin: [
      { id: 'Ruangan konseling privat di Farmasi Utama', en: 'Private counselling room at Main Pharmacy' },
      { id: 'Telepon & video call pukul 08.00–20.00', en: 'Phone & video call 08.00–20.00' },
      { id: 'Leaflet obat huruf besar untuk lansia', en: 'Large-print leaflets for elderly patients' },
    ],
    ikon: MessageCircle,
  },
  {
    judul: { id: 'Farmasi Khusus & Racikan', en: 'Specialty & Compounding Pharmacy' },
    label: { id: 'Compounding & Sterile', en: 'Compounding & Sterile' },
    ket: {
      id: 'Racikan non-steril dan pencampuran steril dikerjakan di ruang terpisah; obat kemo dan nutrisi parenteral disiapkan dalam clean room.',
      en: 'Non-sterile compounding and sterile mixing run in separated rooms; chemotherapy and parenteral nutrition are prepared inside a clean room.',
    },
    poin: [
      { id: 'Clean Room Kelas C & BSC Tipe II', en: 'Class C clean room & Type II safety cabinet' },
      { id: 'Sediaan pediatric, dermatologi, oftalmologi', en: 'Paediatric, dermatology & ophthalmic preparations' },
      { id: 'Labeling batch, tanggal daluwarsa & lot', en: 'Batch labelling with expiry & lot number' },
    ],
    ikon: FlaskConical,
  },
];

/** Dua kolom penjaminan: BPJS di kiri, Asuransi & Umum di kanan. */
const PENJAMINAN: {
  judul: Teks;
  ikon: Ikon;
  garis: string;
  lencana: string;
  kotakIkon: string;
  poin: Teks[];
  catatan: Teks;
}[] = [
  {
    judul: { id: 'Pasien BPJS & Program PRB', en: 'BPJS Patients & PRB Programme' },
    ikon: ShieldPlus,
    garis: 'border-l-medical-blue',
    lencana: 'bg-medical-blue',
    kotakIkon: 'border-medical-blue/20 bg-blue-50 text-medical-blue',
    poin: [
      {
        id: 'e-Prescribing: resep dokter masuk ke depo secara elektronik, tidak ada resep kertas yang tertinggal.',
        en: 'e-Prescribing: the doctor order reaches the depot electronically, so no paper prescription can go missing.',
      },
      {
        id: 'PRB (Program Rujuk Balik) obat kronis 30 hari ditebus di puskesmas atau apotek kerja sama dengan SEP elektronik.',
        en: 'PRB referral-back 30-day chronic supply is redeemed at the puskesmas or a partner pharmacy through an electronic SEP.',
      },
      {
        id: 'Formulium nasional & obat generik berlogo disediakan tanpa selisih biaya sesuai kelas penjaminan.',
        en: 'National formulary and generic (logo) medicine are provided with no class-based surcharge.',
      },
      {
        id: 'Obat high-cost (kemo, thalassemia, hepatitis) dikoordinasikan lewat Tim Farmasi dan Terapi.',
        en: 'High-cost medicine (chemo, thalassemia, hepatitis) is coordinated through the Pharmacy and Therapeutics Committee.',
      },
    ],
    catatan: {
      id: 'Bawa kartu BPJS/KIS aktif, SEP, dan obat lama yang masih tersisa agar jumlah yang diberikan tidak ganda.',
      en: 'Bring your active BPJS/KIS card, the SEP, and any medicine left over, so the amount dispensed is not duplicated.',
    },
  },
  {
    judul: { id: 'Asuransi Swasta & Umum', en: 'Private Insurance & Self-pay' },
    ikon: BadgeCheck,
    garis: 'border-l-teal-600',
    lencana: 'bg-teal-600',
    kotakIkon: 'border-teal-200 bg-teal-50 text-teal-700',
    poin: [
      {
        id: 'Verifikasi cashless dilakukan di loket sebelum obat diracik; jika plafon ditolak, pasien diberi tahu sebelum obat disiapkan.',
        en: 'Cashless verification happens at the counter before compounding; if the limit is rejected you are told before any medicine is made.',
      },
      {
        id: 'Obat paten dan di luar penjaminan dihitung ulang; tersedia alternatif obat generik berlogo (OGB) dengan selisih biaya lebih kecil.',
        en: 'Brand-name and excluded medicine is re-costed; branded generic (OGB) alternatives with a smaller difference are offered.',
      },
      {
        id: 'Pasien umum dapat membayar dengan kartu, QRIS, atau tunai; struk berisi nama, dosis, dan lot obat.',
        en: 'Self-pay patients may use card, QRIS, or cash; the receipt lists name, dose, and lot number.',
      },
      {
        id: 'Klaim manual dibantu Tim Admisi: copia resep, surat permintaan obat, dan resume medis disiapkan dalam 1 hari kerja.',
        en: 'Manual claims are assisted by the Admissions Team: prescription copy, medicine request letter, and medical summary within 1 working day.',
      },
    ],
    catatan: {
      id: 'Obat yang sudah diserahkan tidak dapat dikembalikan, kecuali terjadi kesalahan penulisan resep atau ketidaksesuaian sediaan.',
      en: 'Handed-over medicine cannot be returned, except for a prescribing error or a product mismatch.',
    },
  },
];

/** Empat langkah alur resep, dari dokter sampai obat sampai ke tangan pasien. */
const ALUR: { judul: Teks; ket: Teks; ikon: Ikon }[] = [
  {
    judul: { id: 'Dokter menulis e-resep', en: 'Doctor writes an e-prescription' },
    ket: { id: 'Cek alergi & interaksi otomatis', en: 'Automatic allergy & interaction check' },
    ikon: ClipboardList,
  },
  {
    judul: { id: 'Penjaminan diverifikasi', en: 'Guarantee is verified' },
    ket: { id: 'BPJS, asuransi, atau umum', en: 'BPJS, insurance, or self-pay' },
    ikon: ShieldCheck,
  },
  {
    judul: { id: 'Peracikan & checking ganda', en: 'Compounding & double check' },
    ket: { id: 'Dua apoteker menandatangani', en: 'Two pharmacists sign off' },
    ikon: FlaskConical,
  },
  {
    judul: { id: 'Serah terima & edukasi', en: 'Hand-over & counselling' },
    ket: { id: 'Etiket, cara simpan, jadwal minum', en: 'Label, storage, dosing time' },
    ikon: Stethoscope,
  },
];

/** Tujuh benar pemberian obat sebagai standar keselamatan pasien. */
const BENAR: { judul: Teks; ket: Teks }[] = [
  {
    judul: { id: 'Benar Pasien', en: 'Right Patient' },
    ket: { id: 'Sebut nama & cocokkan gelang identitas', en: 'Say the name & match the ID band' },
  },
  {
    judul: { id: 'Benar Obat', en: 'Right Medicine' },
    ket: { id: 'Baca etiket dua kali sebelum mengambil', en: 'Read the label twice before taking' },
  },
  {
    judul: { id: 'Benar Dosis', en: 'Right Dose' },
    ket: { id: 'Hitung ulang untuk anak & pasien geriatri', en: 'Recalculate for children & geriatric' },
  },
  {
    judul: { id: 'Benar Waktu', en: 'Right Time' },
    ket: { id: 'Ikut interval, bukan sekadar jam makan', en: 'Follow the interval, not mealtime only' },
  },
  {
    judul: { id: 'Benar Rute', en: 'Right Route' },
    ket: { id: 'Oral, topikal, inhalasi, atau injeksi', en: 'Oral, topical, inhaled, or injected' },
  },
  {
    judul: { id: 'Benar Dokumentasi', en: 'Right Documentation' },
    ket: { id: 'Catat lot, jam, & petugas pemberi', en: 'Record lot, time & the giver' },
  },
  {
    judul: { id: 'Benar Edukasi', en: 'Right Education' },
    ket: { id: 'Pasien tahu gunanya & efek sampingnya', en: 'The patient knows purpose & side effects' },
  },
];

/** Edukasi pemakaian tiga alat medis yang paling sering dibawa pulang. */
const ALAT: { judul: Teks; ket: Teks; langkah: Teks[]; ikon: Ikon }[] = [
  {
    judul: { id: 'Inhaler & Spacer', en: 'Inhaler & Spacer' },
    ket: { id: 'Untuk asma dan PPOK agar obat masuk ke paru, tidak berhenti di mulut.', en: 'For asthma and COPD so the dose reaches the lungs, not the mouth.' },
    langkah: [
      { id: 'Kocok, buang napas dulu sampai kosong', en: 'Shake, then breathe out fully first' },
      { id: 'Sembur & tarik napas lambat 5 detik', en: 'Puff & inhale slowly for 5 seconds' },
      { id: 'Tahan 10 detik, berkumur bila steroid', en: 'Hold 10 seconds, rinse if a steroid' },
    ],
    ikon: Wind,
  },
  {
    judul: { id: 'EpiPen (Auto-injector)', en: 'EpiPen (Auto-injector)' },
    ket: { id: 'Bekal darurat pasien alergi berat; disuntik di paha luar.', en: 'Emergency kit for severe allergy; injected into the outer thigh.' },
    langkah: [
      { id: 'Cabut penutup, genggam seperti kepalan', en: 'Pull the cap, hold like a fist' },
      { id: 'Tekan ke paha luar 3 detik', en: 'Press into the outer thigh for 3 seconds' },
      { id: 'Segera ke IGD walau sudah membaik', en: 'Go to the ER even after improvement' },
    ],
    ikon: ShieldCheck,
  },
  {
    judul: { id: 'Pen Insulin', en: 'Insulin Pen' },
    ket: { id: 'Dosis harian di rumah dengan jarum sekali pakai dan rotasi lokasi.', en: 'Daily home dosing with a single-use needle and site rotation.' },
    langkah: [
      { id: 'Simpan dingin, suhu ruang 28 hari pertama', en: 'Keep cold; room temperature for the first 28 days' },
      { id: 'Putar dosis, jelitik jarum, suntik 10 detik', en: 'Dial the dose, touch the bubble, inject for 10 seconds' },
      { id: 'Ganti lokasi: perut, paha, lengan atas', en: 'Rotate sites: abdomen, thigh, upper arm' },
    ],
    ikon: Syringe,
  },
];

/** Panduan penyimpanan obat di rumah. */
const SIMPAN: { judul: Teks; ket: Teks; ikon: Ikon }[] = [
  {
    judul: { id: 'Suhu ruang 20–25 °C', en: 'Room temperature 20–25 °C' },
    ket: { id: 'Jauhi sinar jendela & lembap kamar mandi.', en: 'Keep away from sunny windows and bathroom humidity.' },
    ikon: ThermometerSnowflake,
  },
  {
    judul: { id: 'Rak bawah kulkas 2–8 °C', en: 'Lower fridge shelf 2–8 °C' },
    ket: { id: 'Obat bertanda biru, bukan di pintu kulkas.', en: 'Blue-marked medicine, never in the fridge door.' },
    ikon: Lock,
  },
  {
    judul: { id: 'Etiket & jadwal minum', en: 'Label & dosing schedule' },
    ket: { id: 'Jangan memindahkan obat ke wadah tanpa nama.', en: 'Do not move medicine into unlabelled containers.' },
    ikon: Pill,
  },
  {
    judul: { id: 'Cek tanggal daluwarsa', en: 'Check the expiry date' },
    ket: { id: 'Sirup opens hanya 30 hari; kembalikan obat sisa.', en: 'Opened syrups last 30 days only; return leftovers.' },
    ikon: CalendarCheck,
  },
];

/* ------------------------------- KOMPONEN ------------------------------- */

/**
 * HALAMAN FARMASI — hero split 50:50, jaringan depo (4 kolom), layanan unggulan
 * (3 kolom), penjaminan & alur resep (2 kolom), keselamatan pasien (7 benar +
 * edukasi alat medis + penyimpanan), lalu panel interaktif cek antrean, antar
 * obat, dan tanya apoteker dari <FarmasiWidgets />. Seluruhnya light theme.
 */
const FarmasiClient: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (teks: Teks) => teks[lang];

  return (
    <div className="bg-white text-slate-800">
      {/* ================= 1. HERO (LATAR PENUH FOTO) ================= */}
      <section className="relative overflow-hidden bg-white pt-16 pb-12 lg:pt-20 lg:pb-16">
        {/* farmasi.jpg dipakai sebagai latar penuh hero. */}
        <div aria-hidden className="absolute inset-0">
          <Image src={fotoFarmasiMobile} alt="" fill priority sizes="100vw" quality={90} className="object-cover object-right md:hidden" />
                    <Image src={fotoFarmasi} alt="" fill priority sizes="100vw" quality={90} className="hidden object-cover md:block" />
        </div>
        {/* Scrim: putih pekat hanya di sisi kiri (sampai ±45%), kanan 100% bening. */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-white from-20% via-white/70 to-transparent to-60%" />

        <div className="relative z-10 mr-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="max-w-3xl">
            <h1 className="text-[clamp(2.5rem,5vw,4.25rem)] font-extrabold leading-[1.05] tracking-tight text-slate-900">
              {L({ id: 'Layanan Farmasi & Resep 24 Jam', en: '24-Hour Pharmacy & Prescription Services' })}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
              {L({
                id: 'Farmasi Utama di lantai dasar buka 24 jam nonstop, didukung depo di area poli, rawat inap, UGD/ICU, dan wing eksekutif. Setiap resep melewati pemeriksaan ganda dua apoteker sebelum diserahkan, lengkap dengan penjelasan cara minum dan cara menyimpan obatnya.',
                en: 'The Main Pharmacy on the ground floor stays open 24 hours, supported by depots in the clinic area, inpatient wards, ER/ICU, and the executive wing. Every prescription passes a double check by two pharmacists before hand-over, together with instructions on how to take and how to store it.',
              })}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
                <Clock className="h-5 w-5 shrink-0 text-teal-600" />
                {L({ id: 'Farmasi Utama Lt G · 24 Jam', en: 'Main Pharmacy Ground Floor · 24 Hours' })}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
                <MapPin className="h-5 w-5 shrink-0 text-teal-600" />
                {L({ id: 'Empat depo terhubung sistem', en: 'Four system-linked depots' })}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
                <BadgeCheck className="h-5 w-5 shrink-0 text-teal-600" />
                {L({ id: 'Apoteker bersertifikat & SIP', en: 'Certified pharmacists with licence' })}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. JARINGAN DEPO FARMASI (4 KOLOM) ================= */}
      <section id="depo" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Jaringan Depo Farmasi', en: 'Pharmacy Depot Network' })}
          </h2>
          <div className="mt-5 h-px w-full bg-slate-200" />

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {DEPO.map((d) => (
              <article
                key={d.judul.id}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-teal-700">
                  <d.ikon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-xl font-extrabold leading-snug text-slate-900">{L(d.judul)}</h3>
                <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-bold text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 shrink-0 text-teal-600" />
                    {d.lantai}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4 shrink-0 text-teal-600" />
                    {L(d.jam)}
                  </span>
                </p>
                <p className="mt-4 text-base leading-relaxed text-slate-600">{L(d.ket)}</p>
                <ul className="mt-5 space-y-2.5 border-t border-slate-100 pt-5">
                  {d.poin.map((p) => (
                    <li key={p.id} className="flex items-start gap-2.5 text-base leading-snug text-slate-700">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-teal-600" />
                      <span>{L(p)}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 3. LAYANAN UNGGULAN (3 KOLOM - HIGHLIGHT) ================= */}
      <section id="unggulan" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Layanan Unggulan Farmasi', en: 'Signature Pharmacy Services' })}
          </h2>
          <div className="mt-5 h-px w-full bg-slate-200" />

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {UNGGULAN.map((u) => (
              <article
                key={u.judul.id}
                className="flex h-full flex-col rounded-2xl border-2 border-teal-200 bg-slate-50 p-8 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-teal-600 text-white shadow-md shadow-teal-600/25">
                    <u.ikon className="h-7 w-7" />
                  </span>
                  <span className="rounded-full border border-teal-200 bg-white px-3.5 py-1.5 text-sm font-extrabold uppercase tracking-wide text-teal-700">
                    {L(u.label)}
                  </span>
                </div>
                <h3 className="mt-6 text-2xl font-extrabold leading-snug text-slate-900">{L(u.judul)}</h3>
                <p className="mt-4 text-lg leading-relaxed text-slate-600">{L(u.ket)}</p>
                <ul className="mt-6 space-y-3 border-t border-teal-100 pt-6">
                  {u.poin.map((p) => (
                    <li key={p.id} className="flex items-start gap-3 text-base leading-snug text-slate-700">
                      <Check className="mt-1 h-5 w-5 shrink-0 text-teal-600" />
                      <span>{L(p)}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 4. PENJAMINAN & ALUR RESEP (2 KOLOM) ================= */}
      <section id="penjaminan" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Penjaminan & Alur Resep', en: 'Payment Guarantees & Prescription Flow' })}
          </h2>
          <div className="mt-5 h-px w-full bg-slate-200" />

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {PENJAMINAN.map((p) => (
              <article
                key={p.judul.id}
                className={`flex h-full flex-col rounded-2xl border border-slate-200 border-l-4 ${p.garis} bg-white p-8 shadow-sm`}
              >
                <div className="flex items-center gap-4">
                  <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border ${p.kotakIkon}`}>
                    <p.ikon className="h-7 w-7" />
                  </span>
                  <h3 className="text-2xl font-extrabold leading-snug text-slate-900">{L(p.judul)}</h3>
                </div>

                <ul className="mt-7 space-y-5">
                  {p.poin.map((isi) => (
                    <li key={isi.id} className="flex items-start gap-3">
                      <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${p.lencana}`} />
                      <span className="text-lg leading-relaxed text-slate-600">{L(isi)}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-base leading-relaxed text-slate-700">
                  <span className="font-extrabold text-slate-900">
                    {L({ id: 'Yang perlu dibawa: ', en: 'What to bring: ' })}
                  </span>
                  {L(p.catatan)}
                </p>
              </article>
            ))}
          </div>

          {/* Garis alur resep: empat langkah satu baris */}
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-extrabold text-slate-900">
              {L({ id: 'Alur Resep dalam Empat Langkah', en: 'The Prescription Flow in Four Steps' })}
            </h3>
            <ol className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {ALUR.map((a, i) => (
                <li key={a.judul.id} className="flex gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-teal-700">
                    <a.ikon className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-sm font-extrabold uppercase tracking-wide text-teal-600">
                      {L({ id: `Langkah ${i + 1}`, en: `Step ${i + 1}` })}
                    </p>
                    <p className="mt-1 text-lg font-extrabold leading-snug text-slate-900">{L(a.judul)}</p>
                    <p className="mt-1.5 text-base leading-snug text-slate-600">{L(a.ket)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ================= 5. KESELAMATAN PASIEN ================= */}
      <section id="keselamatan" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Keselamatan Pasien & Edukasi Obat', en: 'Patient Safety & Medicine Education' })}
          </h2>
          <div className="mt-5 h-px w-full bg-slate-200" />

          {/* 7 BENAR PEMBERIAN OBAT */}
          <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm sm:p-10">
            <h3 className="text-2xl font-extrabold leading-snug text-slate-900">
              {L({ id: '7 Benar Pemberian Obat', en: 'The 7 Rights of Medication Administration' })}
            </h3>
            <p className="mt-4 max-w-4xl text-lg leading-relaxed text-slate-600">
              {L({
                id: 'Tujuh pemeriksaan ini dilakukan perawat dan apoteker pada setiap dosis, dan hasil akhirnya diberitahukan kepada pasien agar keluarga di rumah juga ikut mengawasi.',
                en: 'Nurses and pharmacists perform these seven checks for every dose, and the outcome is explained to the patient so families at home can join the supervision.',
              })}
            </p>

            <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {BENAR.map((b, i) => (
                <li
                  key={b.judul.id}
                  className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white">
                    <Check className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-lg font-extrabold leading-snug text-slate-900">
                      {i + 1}. {L(b.judul)}
                    </p>
                    <p className="mt-1 text-base leading-snug text-slate-600">{L(b.ket)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* EDUKASI ALAT MEDIS */}
          <h3 className="mt-16 text-2xl font-extrabold leading-snug text-slate-900 sm:text-3xl">
            {L({ id: 'Edukasi Alat Medis di Rumah', en: 'Home Medical Device Education' })}
          </h3>
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {ALAT.map((a) => (
              <article
                key={a.judul.id}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-teal-700">
                  <a.ikon className="h-7 w-7" />
                </span>
                <h4 className="mt-5 text-xl font-extrabold leading-snug text-slate-900">{L(a.judul)}</h4>
                <p className="mt-3 text-base leading-relaxed text-slate-600">{L(a.ket)}</p>
                <ol className="mt-6 space-y-3.5 border-t border-slate-100 pt-6">
                  {a.langkah.map((s, i) => (
                    <li key={s.id} className="flex items-start gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-teal-200 bg-teal-50 text-sm font-extrabold text-teal-700">
                        {i + 1}
                      </span>
                      <span className="text-base leading-snug text-slate-700">{L(s)}</span>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>

          {/* PANDUAN PENYIMPANAN OBAT */}
          <div className="mt-8 rounded-2xl border-2 border-teal-200 bg-slate-50 p-8 shadow-sm sm:p-10">
            <h3 className="text-2xl font-extrabold leading-snug text-slate-900">
              {L({ id: 'Panduan Penyimpanan Obat di Rumah', en: 'Home Medicine Storage Guide' })}
            </h3>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {SIMPAN.map((s) => (
                <div key={s.judul.id} className="flex gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-teal-700">
                    <s.ikon className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-lg font-extrabold leading-snug text-slate-900">{L(s.judul)}</p>
                    <p className="mt-1.5 text-base leading-snug text-slate-600">{L(s.ket)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= 6. WIDGET UX FARMASI ================= */}
      <FarmasiWidgets />
    </div>
  );
};

export default FarmasiClient;
