'use client';

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { tp, tpObj, type Bilingual } from '../../lib/i18n';

/**
 * "Pusat Bantuan Premium" — FAQ 29 pertanyaan terbagi 6 kategori.
 * 'use client' karena state tab kategori + search real-time + accordion
 * Framer Motion (height). TANPA animasi whileInView (jebakan child opacity 0
 * yang pernah terjadi di proyek ini) dan TANPA dark mode. Layout accordion:
 * 1 kolom di mobile, 2 kolom di desktop. Konten Q&A memakai teks baku yang
 * diberikan user — jangan mengarang.
 */

interface Faq {
  id: number;
  kategori: Bilingual;
  pertanyaan: Bilingual;
  jawaban: Bilingual;
}

/** Nama kategori penuh (dipakai chip + pencocokan tab); varian EN untuk tampilan. */
const KATEGORI = {
  pendaftaran: { id: 'Pendaftaran & Janji Temu', en: 'Registration & Appointments' },
  pembayaran: { id: 'Pembayaran, Asuransi & BPJS', en: 'Payment, Insurance & BPJS' },
  ugd: { id: 'Layanan UGD & Gawat Darurat', en: 'Emergency Room & Emergency Services' },
  rawatInap: { id: 'Rawat Inap & Jam Kunjungan', en: 'Inpatient Care & Visiting Hours' },
  penunjang: { id: 'Penunjang Medis & Hasil Pemeriksaan', en: 'Medical Support & Test Results' },
  fasilitas: { id: 'Fasilitas Umum & Layanan Kenyamanan', en: 'Public Facilities & Comfort Services' },
} satisfies Record<string, Bilingual>;

/** Tab pills: label pendek + nama kategori penuh di data. 'Semua' = tanpa filter. */
const TABS: { label: Bilingual; kategori: Bilingual | null }[] = [
  { label: { id: 'Semua', en: 'All' }, kategori: null },
  { label: { id: 'Pendaftaran & Janji Temu', en: 'Registration & Appointments' }, kategori: KATEGORI.pendaftaran },
  { label: { id: 'Pembayaran & Asuransi', en: 'Payment & Insurance' }, kategori: KATEGORI.pembayaran },
  { label: { id: 'UGD & Darurat', en: 'ER & Emergencies' }, kategori: KATEGORI.ugd },
  { label: { id: 'Rawat Inap', en: 'Inpatient Care' }, kategori: KATEGORI.rawatInap },
  { label: { id: 'Penunjang Medis', en: 'Medical Support' }, kategori: KATEGORI.penunjang },
  { label: { id: 'Fasilitas Umum', en: 'Public Facilities' }, kategori: KATEGORI.fasilitas },
];

const FAQS: Faq[] = [
  /* ========== Kategori 1: Pendaftaran & Janji Temu ========== */
  {
    id: 1,
    kategori: KATEGORI.pendaftaran,
    pertanyaan: {
      id: 'Bagaimana cara membuat janji temu dengan dokter spesialis?',
      en: 'How do I book an appointment with a specialist doctor?',
    },
    jawaban: {
      id: 'Pendaftaran dapat dilakukan secara online melalui website (minimal H-1), aplikasi mobile, atau langsung datang ke Counter Pendaftaran di Lantai G dengan membawa KTP.',
      en: 'Registration can be done online via the website (at least 1 day in advance), the mobile app, or by coming directly to the Registration Counter on the Ground Floor (Lantai G) with your KTP (national ID card).',
    },
  },
  {
    id: 2,
    kategori: KATEGORI.pendaftaran,
    pertanyaan: {
      id: 'Berapa jam sebelum jadwal dokter saya harus tiba di rumah sakit?',
      en: 'How early should I arrive at the hospital before my doctor’s scheduled time?',
    },
    jawaban: {
      id: 'Disarankan hadir 30 menit sebelum jadwal konsultasi untuk melakukan asesmen tanda-tanda vital dan verifikasi berkas.',
      en: 'We recommend arriving 30 minutes before your consultation appointment for vital-sign assessment and document verification.',
    },
  },
  {
    id: 3,
    kategori: KATEGORI.pendaftaran,
    pertanyaan: {
      id: 'Bagaimana jika saya perlu membatalkan atau mengubah jadwal konsultasi?',
      en: 'What if I need to cancel or change my consultation schedule?',
    },
    jawaban: {
      id: 'Pembatalan atau perubahan jadwal wajib dikonfirmasi maksimal 3 jam sebelum jam praktik dokter dimulai melalui Customer Care.',
      en: 'Cancellations or schedule changes must be confirmed through Customer Care no later than 3 hours before the doctor’s practice session begins.',
    },
  },
  {
    id: 4,
    kategori: KATEGORI.pendaftaran,
    pertanyaan: {
      id: 'Apakah pasien baru bisa mendaftar secara online dari rumah?',
      en: 'Can new patients register online from home?',
    },
    jawaban: {
      id: 'Bisa. Pasien baru dapat mendaftar online, namun wajib melakukan verifikasi data dan pembuatan Rekam Medis di Kios Anjungan Mandiri atau Counter Pendaftaran saat tiba di RS.',
      en: 'Yes. New patients can register online, but must complete data verification and Medical Record creation at the Self-Service Kiosk (Anjungan Mandiri) or the Registration Counter upon arriving at the hospital.',
    },
  },
  {
    id: 5,
    kategori: KATEGORI.pendaftaran,
    pertanyaan: {
      id: 'Apakah bisa berobat langsung (walk-in) tanpa reservasi sebelumnya?',
      en: 'Can I be seen directly (walk-in) without a prior reservation?',
    },
    jawaban: {
      id: 'Bisa. Anda dapat mengambil antrean langsung di lokasi. Namun, pendaftaran online sangat disarankan agar Anda mendapatkan kuota dan kepastian jadwal.',
      en: 'Yes. You can take a queue number on site. However, online registration is strongly recommended so you secure a quota and a confirmed schedule.',
    },
  },

  /* ========== Kategori 2: Pembayaran, Asuransi & BPJS ========== */
  {
    id: 6,
    kategori: KATEGORI.pembayaran,
    pertanyaan: {
      id: 'Asuransi swasta dan TPA apa saja yang bekerjasama (Cashless)?',
      en: 'Which private insurers and TPAs do you cooperate with (cashless)?',
    },
    jawaban: {
      id: 'Kami bekerja sama dengan 50+ asuransi dan TPA seperti Prudential, Allianz, Manulife, AIA, AdMedika, dll. Daftar lengkap dapat dilihat di halaman Kemitraan.',
      en: 'We work with 50+ insurers and TPAs such as Prudential, Allianz, Manulife, AIA, AdMedika, and more. The full list can be viewed on the Partnership page.',
    },
  },
  {
    id: 7,
    kategori: KATEGORI.pembayaran,
    pertanyaan: {
      id: 'Apa saja syarat berobat menggunakan BPJS Kesehatan?',
      en: 'What are the requirements for treatment using BPJS Kesehatan?',
    },
    jawaban: {
      id: 'Pasien wajib membawa Kartu BPJS aktif, KTP, dan Surat Rujukan Berjenjang dari FKTP (Puskesmas/Klinik) untuk pasien rawat jalan.',
      en: 'Outpatients must bring an active BPJS card, their KTP, and a step-down referral letter from an FKTP (Puskesmas/Clinic).',
    },
  },
  {
    id: 8,
    kategori: KATEGORI.pembayaran,
    pertanyaan: {
      id: 'Apakah pasien BPJS Kesehatan bisa langsung ke UGD tanpa surat rujukan?',
      en: 'Can BPJS Kesehatan patients go straight to the Emergency Room without a referral letter?',
    },
    jawaban: {
      id: 'Ya, untuk kondisi gawat darurat medis, pasien BPJS dapat langsung menuju UGD tanpa surat rujukan.',
      en: 'Yes. In a genuine medical emergency, BPJS patients may go directly to the Emergency Room without a referral letter.',
    },
  },
  {
    id: 9,
    kategori: KATEGORI.pembayaran,
    pertanyaan: {
      id: 'Apa yang dimaksud dengan Excess Charge dan bagaimana pelunasannya?',
      en: 'What is an Excess Charge and how is it settled?',
    },
    jawaban: {
      id: 'Excess charge adalah selisih biaya akibat penggunaan fasilitas (seperti upgrade kamar) di luar plafon jaminan. Pelunasan dapat dilakukan di Kasir Asuransi sebelum pulang.',
      en: 'An excess charge is the cost difference from using facilities (such as a room upgrade) beyond your coverage ceiling. It can be settled at the Insurance Cashier before you go home.',
    },
  },
  {
    id: 10,
    kategori: KATEGORI.pembayaran,
    pertanyaan: {
      id: 'Apakah bisa melakukan upgrade kelas kamar rawat inap?',
      en: 'Can I upgrade my inpatient room class?',
    },
    jawaban: {
      id: 'Bisa, selama kamar tersedia. Pihak Admission akan memberikan lembar estimasi selisih biaya yang harus disetujui pasien.',
      en: 'Yes, as long as rooms are available. The Admission team will provide an estimate of the cost difference, which must be approved by the patient.',
    },
  },
  {
    id: 11,
    kategori: KATEGORI.pembayaran,
    pertanyaan: {
      id: 'Metode pembayaran apa saja yang diterima di kasir RS?',
      en: 'Which payment methods are accepted at the hospital cashier?',
    },
    jawaban: {
      id: 'Kami menerima pembayaran Tunai, Kartu Debit/Kredit, QRIS, Transfer Bank, serta klaim penjaminan BPJS dan Asuransi.',
      en: 'We accept cash, debit/credit cards, QRIS, and bank transfers, as well as BPJS and insurance guarantee claims.',
    },
  },
  {
    id: 12,
    kategori: KATEGORI.pembayaran,
    pertanyaan: {
      id: 'Bagaimana alur pengurusan dokumen untuk klaim reimbursement asuransi?',
      en: 'What is the process for preparing documents for an insurance reimbursement claim?',
    },
    jawaban: {
      id: 'Petugas Insurance Desk kami akan membantu menyiapkan dokumen (Resume Medis, Kuitansi Asli, Rincian Tindakan) agar Anda bisa mengajukan klaim ke asuransi mandiri.',
      en: 'Our Insurance Desk staff will help prepare the documents (Medical Summary, Original Receipts, Itemized Treatment Details) so you can submit the claim to your insurer directly.',
    },
  },

  /* ========== Kategori 3: Layanan UGD & Gawat Darurat ========== */
  {
    id: 13,
    kategori: KATEGORI.ugd,
    pertanyaan: {
      id: 'Apakah Layanan UGD & Ambulans beroperasi 24 jam penuh?',
      en: 'Are the Emergency Room and Ambulance services open 24 hours a day?',
    },
    jawaban: {
      id: 'Ya, UGD dan Ambulans kami beroperasi 24 jam setiap hari, termasuk hari libur nasional.',
      en: 'Yes. Our Emergency Room and Ambulance services operate 24 hours a day, every day, including national holidays.',
    },
  },
  {
    id: 14,
    kategori: KATEGORI.ugd,
    pertanyaan: {
      id: 'Berapa nomor telepon darurat / hotline UGD yang dapat dihubungi?',
      en: 'What is the emergency phone number / ER hotline I can call?',
    },
    jawaban: {
      id: 'Hotline UGD: (061) 456 7890 atau WhatsApp Ambulans: 0811-4441-5515.',
      en: 'ER Hotline: (061) 456 7890 or Ambulance WhatsApp: 0811-4441-5515.',
    },
  },
  {
    id: 15,
    kategori: KATEGORI.ugd,
    pertanyaan: {
      id: 'Kondisi medis apa saja yang tergolong Gawat Darurat?',
      en: 'Which medical conditions are classified as a Medical Emergency?',
    },
    jawaban: {
      id: 'Kondisi yang mengancam nyawa seperti serangan jantung, sesak napas berat, kecelakaan lalu lintas, kejang, penurunan kesadaran, atau perdarahan hebat.',
      en: 'Life-threatening conditions such as heart attacks, severe shortness of breath, traffic accidents, seizures, decreased level of consciousness, or heavy bleeding.',
    },
  },
  {
    id: 16,
    kategori: KATEGORI.ugd,
    pertanyaan: {
      id: 'Bagaimana alur penerimaan pasien UGD yang datang menggunakan ambulans?',
      en: 'What is the intake flow for ER patients arriving by ambulance?',
    },
    jawaban: {
      id: 'Pasien ambulans akan diterima langsung di pintu khusus UGD, langsung masuk ke ruang triase dan resusitasi untuk penanganan cepat oleh tim medis.',
      en: 'Ambulance patients are received directly at the dedicated ER entrance and taken straight to the triage and resuscitation room for rapid care by the medical team.',
    },
  },

  /* ========== Kategori 4: Rawat Inap & Jam Kunjungan ========== */
  {
    id: 17,
    kategori: KATEGORI.rawatInap,
    pertanyaan: {
      id: 'Jam berapa saja jam besuk (kunjungan) pasien rawat inap?',
      en: 'What are the visiting hours for inpatients?',
    },
    jawaban: {
      id: 'Sesi Siang: 11.00 - 13.00 WIB. Sesi Sore: 17.00 - 19.00 WIB.',
      en: 'Midday session: 11.00 - 13.00 WIB. Afternoon session: 17.00 - 19.00 WIB.',
    },
  },
  {
    id: 18,
    kategori: KATEGORI.rawatInap,
    pertanyaan: {
      id: 'Berapa jumlah maksimal penunggu pasien dalam satu kamar perawatan?',
      en: 'What is the maximum number of patient attendants allowed in one hospital room?',
    },
    jawaban: {
      id: 'Maksimal 1 (satu) orang penunggu yang diperbolehkan menginap, dengan wajib memakai Kartu Penunggu resmi dari RS.',
      en: 'A maximum of one (1) attendant is allowed to stay overnight, and must wear the hospital’s official Attendant Card.',
    },
  },
  {
    id: 19,
    kategori: KATEGORI.rawatInap,
    pertanyaan: {
      id: 'Apakah anak-anak di bawah umur diizinkan mengunjungi pasien rawat inap?',
      en: 'Are underage children allowed to visit inpatients?',
    },
    jawaban: {
      id: 'Anak di bawah usia 12 tahun dilarang memasuki area ruang rawat inap demi mencegah risiko penularan infeksi.',
      en: 'Children under 12 are not allowed in the inpatient ward area to reduce the risk of infection transmission.',
    },
  },
  {
    id: 20,
    kategori: KATEGORI.rawatInap,
    pertanyaan: {
      id: 'Fasilitas apa saja yang didapatkan di masing-masing kelas kamar rawat inap?',
      en: 'What facilities are provided in each inpatient room class?',
    },
    jawaban: {
      id: 'Tergantung kelasnya. VIP/VVIP memiliki fasilitas tempat tidur tunggal, sofa, Smart TV, kulkas, dan kamar mandi dalam. Kelas KRIS memiliki fasilitas standar BPJS dengan maksimal 4 tempat tidur.',
      en: 'It depends on the class. VIP/VVIP rooms feature a single bed, a sofa, a Smart TV, a refrigerator, and an en-suite bathroom. KRIS-class rooms have standard BPJS facilities with a maximum of 4 beds.',
    },
  },
  {
    id: 21,
    kategori: KATEGORI.rawatInap,
    pertanyaan: {
      id: 'Bagaimana prosedur kepulangan pasien rawat inap (Discharge Process)?',
      en: 'What is the discharge process for inpatients?',
    },
    jawaban: {
      id: 'Dokter akan memberikan izin pulang, pasien akan menerima edukasi obat dari apoteker, dan menyelesaikan administrasi di Kasir sebelum kembali ke rumah.',
      en: 'The doctor issues discharge permission, the patient receives medication education from the pharmacist, and settles the administration at the Cashier before going home.',
    },
  },

  /* ========== Kategori 5: Penunjang Medis & Hasil Pemeriksaan ========== */
  {
    id: 22,
    kategori: KATEGORI.penunjang,
    pertanyaan: {
      id: 'Berapa lama waktu tunggu hasil pemeriksaan Laboratorium dan Radiologi?',
      en: 'How long are the waiting times for Laboratory and Radiology results?',
    },
    jawaban: {
      id: 'Hasil Lab rutin keluar 1-3 jam. Hasil Radiologi (Rontgen) sekitar 1-2 jam. Untuk CT-Scan/MRI membutuhkan waktu ekspertise sekitar 3-24 jam.',
      en: 'Routine lab results are out in 1-3 hours. Radiology (X-ray) results take about 1-2 hours. CT-Scan/MRI reports need roughly 3-24 hours for radiologist interpretation (expertise).',
    },
  },
  {
    id: 23,
    kategori: KATEGORI.penunjang,
    pertanyaan: {
      id: 'Apakah hasil laboratorium dan radiologi bisa dikirim via WhatsApp/Email?',
      en: 'Can laboratory and radiology results be sent via WhatsApp/Email?',
    },
    jawaban: {
      id: 'Ya, hasil dapat dikirimkan dalam bentuk PDF terenkripsi via WhatsApp, Email, atau diakses melalui portal aplikasi pasien.',
      en: 'Yes. Results can be sent as an encrypted PDF via WhatsApp or Email, or accessed through the patient portal in the app.',
    },
  },
  {
    id: 24,
    kategori: KATEGORI.penunjang,
    pertanyaan: {
      id: 'Apakah pemeriksaan laboratorium/MCU memerlukan puasa terlebih dahulu?',
      en: 'Do laboratory tests/MCUs (medical check-ups) require fasting beforehand?',
    },
    jawaban: {
      id: 'Ya, untuk pemeriksaan tertentu seperti gula darah puasa, profil lipid, atau USG Abdomen, wajib puasa 8-12 jam (hanya minum air putih).',
      en: 'Yes. For certain tests such as fasting blood glucose, lipid profile, or abdominal ultrasound, an 8-12 hour fast is mandatory (water only).',
    },
  },
  {
    id: 25,
    kategori: KATEGORI.penunjang,
    pertanyaan: {
      id: 'Apakah pemeriksaan laboratorium bisa dilakukan tanpa rujukan dokter?',
      en: 'Can laboratory tests be done without a doctor’s referral?',
    },
    jawaban: {
      id: 'Bisa, untuk pemeriksaan mandiri (self-screening) Anda dapat langsung ke Laboratorium, namun hasil tetap harus dikonsultasikan ke dokter untuk interpretasi medis.',
      en: 'Yes. For self-screening you can go directly to the Laboratory, but the results should still be consulted with a doctor for medical interpretation.',
    },
  },

  /* ========== Kategori 6: Fasilitas Umum & Layanan Kenyamanan ========== */
  {
    id: 26,
    kategori: KATEGORI.fasilitas,
    pertanyaan: {
      id: 'Di mana lokasi area parkir, ATM Center, Musholla, dan Kantin RS?',
      en: 'Where are the parking area, ATM Center, prayer room (Musholla), and hospital canteen?',
    },
    jawaban: {
      id: 'Semua fasilitas umum tersebut berada di area Lantai G (Ground Floor). Anda dapat melihat denahnya di halaman Navigasi Gedung.',
      en: 'All of these public facilities are located on the Ground Floor (Lantai G). You can view the floor plan on the Building Navigation page.',
    },
  },
  {
    id: 27,
    kategori: KATEGORI.fasilitas,
    pertanyaan: {
      id: 'Apakah ketersediaan obat di Apotek RS bisa dikirim langsung ke rumah (Delivery Service)?',
      en: 'Can medications from the hospital pharmacy be delivered straight to your home (Delivery Service)?',
    },
    jawaban: {
      id: 'Ya, kami memiliki layanan Farmasi Home Delivery. Obat akan diantar ke rumah oleh kurir medis resmi.',
      en: 'Yes. We have a Pharmacy Home Delivery service. Medications are brought to your home by official medical couriers.',
    },
  },
  {
    id: 28,
    kategori: KATEGORI.fasilitas,
    pertanyaan: {
      id: 'Apakah terdapat fasilitas Taman Bermain Anak (Kids Zone) dan Klinik Laktasi?',
      en: 'Is there a Children’s Playground (Kids Zone) and a Lactation Clinic?',
    },
    jawaban: {
      id: 'Ya, Taman Bermain Anak dan Klinik Laktasi berada di area Lantai 1, bersebelahan dengan Poliklinik Anak dan Obgyn.',
      en: 'Yes. The Kids Zone and the Lactation Clinic are on Level 1, next to the Pediatric and Ob-Gyn Clinics.',
    },
  },
  {
    id: 29,
    kategori: KATEGORI.fasilitas,
    pertanyaan: {
      id: 'Apakah tersedia fasilitas kursi roda dan petugas pendamping bagi lansia/disabilitas?',
      en: 'Are wheelchairs and escort staff available for elderly patients/patients with disabilities?',
    },
    jawaban: {
      id: 'Tersedia. Layanan Patient Escort (kursi roda & pendamping) tersedia gratis di lobi utama untuk membantu pasien lansia atau disabilitas.',
      en: 'Yes. The Patient Escort service (wheelchair & companion) is available free of charge in the main lobby to assist elderly patients or patients with disabilities.',
    },
  },
];

export default function FaqPage() {
  const { language } = useLanguage();
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<Bilingual | null>(null);
  /* Satu accordion terbuka pada satu waktu; default semua tertutup (29 item). */
  const [openId, setOpenId] = useState<number | null>(null);

  /* Filter gabungan: tab kategori dulu, lalu kata kunci di pertanyaan & jawaban.
     Kata kunci dicocokkan ke varian id DAN en agar pengguna EN/ID sama-sama
     menemukan seluruh entri; badge jumlah per tab (jumlahTab) tidak berubah. */
  const hasil = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQS.filter((f) => {
      if (tab && f.kategori.id !== tab.id) return false;
      if (
        q &&
        !`${f.pertanyaan.id} ${f.pertanyaan.en} ${f.jawaban.id} ${f.jawaban.en}`
          .toLowerCase()
          .includes(q)
      )
        return false;
      return true;
    });
  }, [query, tab]);

  const jumlahTab = (kategori: Bilingual | null) =>
    kategori ? FAQS.filter((f) => f.kategori.id === kategori.id).length : FAQS.length;

  return (
    <main className="w-full bg-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-12">
        {/* ============ HERO: JUDUL RATA KIRI + PENCARIAN ============ */}
        <h1 className="text-5xl font-extrabold text-slate-900">
          {tp(language, 'Pusat Bantuan', 'FAQs')}
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-600 leading-relaxed">
          {tp(
            language,
            'Temukan jawaban cepat seputar pendaftaran, layanan medis, penjaminan, dan fasilitas RS Medistra Horizon Medan.',
            'Find quick answers about registration, medical services, insurance coverage, and facilities at RS Medistra Horizon Medan.'
          )}
        </p>

        {/* Search bar besar; tombol X muncul hanya saat ada teks */}
        <div className="relative mt-8 max-w-3xl">
          <Search
            className="pointer-events-none absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={tp(
              language,
              'Cari pertanyaan, misalnya: BPJS, jam besuk, laboratorium...',
              'Search questions, e.g.: BPJS, visiting hours, laboratory...'
            )}
            aria-label={tp(language, 'Cari pertanyaan FAQ', 'Search FAQ questions')}
            className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-14 pr-12 text-lg text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-cyan-400 focus:bg-white focus:ring-2 focus:ring-cyan-100"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label={tp(language, 'Bersihkan pencarian', 'Clear search')}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* ============ TAB KATEGORI (PILLS) ============ */}
        {/* flex-wrap (bukan scroll horizontal) supaya aman di mobile tanpa micro-scroll */}
        <div role="tablist" aria-label={tp(language, 'Kategori FAQ', 'FAQ Categories')} className="mt-8 flex flex-wrap gap-2">
          {TABS.map((t) => {
            const aktif = tab === t.kategori;
            return (
              <button
                key={t.label.id}
                type="button"
                role="tab"
                aria-selected={aktif}
                onClick={() => setTab(t.kategori)}
                className={`inline-flex min-h-[44px] items-center gap-2 rounded-full border px-5 text-sm font-semibold transition-colors ${
                  aktif
                    ? 'border-cyan-600 bg-cyan-600 text-white'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {tpObj(language, t.label)}
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                    aktif ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {jumlahTab(t.kategori)}
                </span>
              </button>
            );
          })}
        </div>

        {/* ============ ACCORDION: 2 KOLOM DI DESKTOP ============ */}
        {hasil.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {hasil.map((f) => {
              const buka = openId === f.id;
              return (
                <div
                  key={f.id}
                  className="self-start overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(buka ? null : f.id)}
                    aria-expanded={buka}
                    className="flex w-full items-start justify-between gap-4 p-6 text-left transition-colors hover:bg-slate-50"
                  >
                    <span className="flex-1">
                      {/* Chip kategori: relevan saat tab "Semua" menampilkan campur */}
                      {tab === null && (
                        <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-cyan-600">
                          {tpObj(language, f.kategori)}
                        </span>
                      )}
                      <span className="block font-bold text-lg text-slate-900">{tpObj(language, f.pertanyaan)}</span>
                    </span>
                    <ChevronDown
                      className={`mt-1 h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 ${buka ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {buka && (
                      <motion.div
                        key="isi"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="p-6 pt-0 text-slate-600 leading-relaxed">{tpObj(language, f.jawaban)}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty state pencarian/kombinasi tab. */
          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center">
            <p className="text-lg text-slate-600">
              {query
                ? tp(
                    language,
                    `Tidak ada pertanyaan yang cocok dengan pencarian \"${query}\".`,
                    `No questions match your search \"${query}\".`
                  )
                : tp(
                    language,
                    'Tidak ada pertanyaan pada kategori ini.',
                    'There are no questions in this category.'
                  )}
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setTab(null);
              }}
              className="mt-4 inline-flex min-h-[44px] items-center rounded-xl bg-cyan-600 px-6 font-semibold text-white transition-colors hover:bg-cyan-700"
            >
              {tp(language, 'Tampilkan semua pertanyaan', 'Show all questions')}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
