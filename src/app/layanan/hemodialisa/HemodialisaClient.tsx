'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Activity,
  Armchair,
  BadgeCheck,
  CalendarClock,
  Check,
  Clock,
  Droplets,
  Gauge,
  HandHeart,
  Heart,
  MapPin,
  RefreshCw,
  ShieldCheck,
  Siren,
  Stethoscope,
  Utensils,
  Users,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import fotoHd from '@/images/hero/fasilitas/pelayanan-hd.jpg';
import fotoHdMobile from '@/images/hero/mobile-fasilitas/pelayanan-hd.jpg';
import HemodialisaWidgets from './HemodialisaWidgets';
import type { Language } from '../../../types';

/** Sepasang teks ID/EN; dipilih dengan [lang] supaya semua data tinggal di satu tempat. */
type Teks = { id: string; en: string };

/** Tipe ikon Lucide yang dipakai di kartu — cukup className. */
type Ikon = React.ComponentType<{ className?: string }>;

/* --------------------------------- DATA --------------------------------- */

/** Empat jenis layanan dialisis sesuai permintaan. */
const LAYANAN: {
  judul: Teks;
  pill: Teks;
  ket: Teks;
  poin: Teks[];
  ikon: Ikon;
}[] = [
  {
    judul: { id: 'HD Rutin (Elektif)', en: 'Routine HD (Elective)' },
    pill: { id: '2 kali seminggu', en: 'Twice a week' },
    ket: {
      id: 'Untuk pasien gagal ginjal kronik yang cuci darahnya terjadwal tetap. Jadwal dipilih permanen supaya tubuh punya ritme yang sama setiap minggu.',
      en: 'For chronic kidney failure patients on a fixed dialysis schedule. The slot is chosen permanently so the body keeps the same rhythm every week.',
    },
    poin: [
      { id: 'Shift pagi, siang, atau sore, sesuai blok hari', en: 'Morning, midday or afternoon shift, per day block' },
      { id: 'Durasi 3 sampai 5 jam per sesi, rata-rata 4 jam', en: 'Three to five hours per session, four hours on average' },
      { id: 'Berat kering dicatat dan dievaluasi tiap sesi', en: 'Dry weight recorded and reviewed at every session' },
    ],
    ikon: RefreshCw,
  },
  {
    judul: { id: 'HD Darurat (Cito)', en: 'Emergency HD (Cito)' },
    pill: { id: 'Siaga 24 jam', en: 'Ready 24 hours' },
    ket: {
      id: 'Dialisis yang harus segera dilakukan karena kalium sangat tinggi, cairan menumpuk di paru, atau uremia berat. Jalurnya langsung dari UGD, ICU, atau kamar rawat inap, tanpa menunggu jadwal reguler.',
      en: 'Dialysis needed immediately because of very high potassium, fluid in the lungs, or severe uraemia. The route runs straight from the ER, ICU or inpatient ward, without waiting for a regular slot.',
    },
    poin: [
      { id: 'Mesin cadangan disiapkan di luar jam operasional unit', en: 'Reserve machines prepared outside the unit operating hours' },
      { id: 'Dikoordinasikan bersama dokter intensivis dan DPJP', en: 'Coordinated with the intensivist and the doctor in charge' },
      { id: 'Akses sementara berupa selang dialisis di leher atau lipat paha', en: 'Temporary access via a dialysis catheter in the neck or groin' },
    ],
    ikon: Siren,
  },
  {
    judul: { id: 'HD Khusus Isolasi', en: 'Isolation HD' },
    pill: { id: 'Mesin & ruang terpisah', en: 'Separate room and machine' },
    ket: {
      id: 'Pasien dengan hepatitis B, hepatitis C, atau HIV dicuci darahnya di sudut terpisah dengan mesin, kereta alat, dan perawat yang khusus, sesuai prinsip pemisahan alat.',
      en: 'Patients with hepatitis B, hepatitis C or HIV are dialysed in a separate corner with dedicated machines, instrument trolleys and nurses, following device-segregation principles.',
    },
    poin: [
      { id: 'Ruangannya sendiri, tidak berbagi area dengan pasien lain', en: 'Its own room, not sharing the area with other patients' },
      { id: 'Dializer dan selang sekali pakai, tidak pernah dipakai bergantian', en: 'Single-use dializer and lines, never shared between patients' },
      { id: 'Sterilisasi permukaan dan sirkulasi udara dicatat tiap sesi', en: 'Surface disinfection and air circulation logged every session' },
    ],
    ikon: ShieldCheck,
  },
  {
    judul: { id: 'CRRT di ICU', en: 'CRRT in the ICU' },
    pill: { id: '24 jam nonstop', en: '24 hours nonstop' },
    ket: {
      id: 'Pemurnian darah kontinu untuk pasien kritis yang tekanan darahnya belum kuat menjalani hemodialisa biasa. Alatnya berjalan pelan di samping tempat tidur ICU selama sehari penuh.',
      en: 'Continuous blood purification for critical patients whose blood pressure is not strong enough for standard haemodialysis. The device runs slowly beside the ICU bed for a full day.',
    },
    poin: [
      { id: 'Cairan keluar-masuk diatur presisi per jam', en: 'Fluid in and out controlled precisely hour by hour' },
      { id: 'Dikerjakan tim Critical Care Center, pasien tidak dipindah', en: 'Run by the Critical Care Center team, the patient is not moved' },
      { id: 'Beralih ke HD rutin bila kondisi sudah stabil', en: 'Switches to routine HD once the condition is stable' },
    ],
    ikon: Droplets,
  },
];

/** Fasilitas utama (kolom kiri) — empat hal yang ditanyakan keluarga. */
const FASILITAS: { judul: Teks; ket: Teks; ikon: Ikon }[] = [
  {
    judul: { id: 'Mesin HD Generasi Terbaru', en: 'Latest-Generation HD Machines' },
    ket: {
      id: 'Dua belas unit berteknologi high flux dengan ultrafiltrasi terukur, plus hemodiafiltrasi (HDF) untuk pasien terpilih. Setiap mesin dikalibrasi dan diuji sebelum blok shift dimulai.',
      en: 'Twelve high-flux units with measured ultrafiltration, plus haemodiafiltration (HDF) for selected patients. Every machine is calibrated and tested before a shift block begins.',
    },
    ikon: Gauge,
  },
  {
    judul: { id: 'Water Treatment Reverse Osmosis', en: 'Reverse Osmosis Water Treatment' },
    ket: {
      id: 'Seluruh air olahan melewati sistem reverse osmosis dua tahap, diuji endotoksin dan parameter kimia setiap bulan. Ini faktor paling menentukan kenyamanan jangka panjang pasien dialisis.',
      en: 'All process water passes a two-stage reverse osmosis system, tested monthly for endotoxin and chemical parameters. This is the single most decisive factor for long-term dialysis comfort.',
    },
    ikon: Droplets,
  },
  {
    judul: { id: 'Dializer Single-Use', en: 'Single-Use Dializers' },
    ket: {
      id: 'Satu pasien satu dializer dan satu set selang, dibuka di depan pasien bila diminta. Tidak ada pemakaian bergantian antar pasien, termasuk untuk kasus menular.',
      en: 'One patient, one dializer and one line set, opened in front of the patient on request. Nothing is shared between patients, including contagious cases.',
    },
    ikon: ShieldCheck,
  },
  {
    judul: { id: 'Ruang Nyaman Serasa di Rumah', en: 'A Room That Feels Like Home' },
    ket: {
      id: 'Kursi recline elektrik yang bisa direbahkan penuh, selimut, TV per posisi, Wi-Fi, colokan di samping kursi, serta minuman dan makanan ringan di tengah sesi agar tekanan darah tidak turun.',
      en: 'Electric recliners that lie fully flat, blankets, a screen per position, Wi-Fi, a power outlet beside the chair, plus a drink and snack mid-session to keep blood pressure steady.',
    },
    ikon: Armchair,
  },
];

/** Tim medis (kolom kanan). */
const TIM: { judul: Teks; ket: Teks; ikon: Ikon }[] = [
  {
    judul: { id: 'Sp.PD-KGH · Konsultan Ginjal Hipertensi', en: 'Sp.PD-KGH · Nephrology-Hypertension Consultant' },
    ket: {
      id: 'Menetapkan kapan dialisis dimulai, memilih mode dan dosisnya, serta mengevaluasi akses vaskular dan tekanan darah tiap kontrol. Konsultasi lintas spesialis lain diarahkan dari sini.',
      en: 'Decides when dialysis starts, chooses the mode and dose, and reviews vascular access and blood pressure at every check-up. Cross-specialty referrals are directed from here.',
    },
    ikon: Stethoscope,
  },
  {
    judul: { id: 'Sp.PD · Dokter Penanggung Jawab Harian', en: 'Sp.PD · Physician in Charge Day by Day' },
    ket: {
      id: 'Specialis penyakit dalam yang visite dan menilai kondisi pasien sebelum serta sesudah sesi: berat kering, kadar darah, dan obat yang perlu disesuaikan hari itu.',
      en: 'The internal medicine specialist who reviews each patient before and after a session: dry weight, blood results, and the drugs that need adjusting that day.',
    },
    ikon: BadgeCheck,
  },
  {
    judul: { id: 'Perawat Bersertifikasi PERNEFRI', en: 'PERNEFRI-Certified Nurses' },
    ket: {
      id: 'Perawat dialisis yang menempuh pendidikan nefrologi dan tersertifikasi: memasang akses, mengatur aliran darah, menangani kram atau tekanan darah turun di tengah sesi, dan mendampingi keluarga.',
      en: 'Dialysis nurses who completed nephrology education and certification: they place the access, set blood flow, manage cramps or a pressure drop mid-session, and stay with the family.',
    },
    ikon: Heart,
  },
  {
    judul: { id: 'Dukungan Gizi Klinis & Apoteker', en: 'Clinical Nutritionist & Pharmacist Support' },
    ket: {
      id: 'Ahli gizi menyusun batas cairan, kalium, dan fosfat sesuai hasil lab serta selera makanan pasien. Farmasis menata ulang dosis obat yang ikut tersaring saat dialisis.',
      en: 'A dietitian sets fluid, potassium and phosphate limits to match lab results and the food the patient likes. The pharmacist reworks doses of drugs that get filtered out during dialysis.',
    },
    ikon: Utensils,
  },
];

/** Tiga tahap alur pasien; `durasi` dipakai sebagai chip di kartu. */
const ALUR: {
  tahap: Teks;
  judul: Teks;
  durasi: Teks;
  poin: Teks[];
  ikon: Ikon;
}[] = [
  {
    tahap: { id: 'Tahap 1', en: 'Step 1' },
    judul: { id: 'Pendaftaran & Persiapan', en: 'Registration and Preparation' },
    durasi: { id: '± 20 menit sebelum masuk ruang', en: 'About 20 minutes before entering' },
    poin: [
      { id: 'Timbang berat badan pra-sesi, dibandingkan dengan berat kering', en: 'Pre-session weighing, compared against dry weight' },
      { id: 'Cek tekanan darah, nadi, dan keluhan hari itu', en: 'Blood pressure, pulse and the complaints of the day are checked' },
      { id: 'Evaluasi akses vaskular: raba getaran Cimino/AVG, lihat kondisi exit site selang', en: 'Vascular access review: feel the Cimino/AVG thrill, inspect the catheter exit site' },
      { id: 'Siapkan SJP/SPRI, surat pengantar HD, dan daftar obat yang diminum', en: 'Bring the guarantee letter, HD referral letter and your drug list' },
    ],
    ikon: ClipboardIcon,
  },
  {
    tahap: { id: 'Tahap 2', en: 'Step 2' },
    judul: { id: 'Proses Hemodialisa Berjalan', en: 'The Dialysis Session Itself' },
    durasi: { id: '3 sampai 5 jam, rata-rata 4 jam', en: 'Three to five hours, four hours on average' },
    poin: [
      { id: 'Darah dialirkan lewat selang ke dializer, disaring, lalu kembali ke tubuh', en: 'Blood is drawn through the line into the dializer, filtered, then returned' },
      { id: 'Tanda vital dipantau setiap 30 sampai 60 menit dan dicatat di lembar sesi', en: 'Vital signs tracked every 30 to 60 minutes and recorded on the session sheet' },
      { id: 'Pemberian antikoagulan ditakar sesuai risiko perdarahan pasien', en: 'Anticoagulant is dosed to the bleeding risk of the patient' },
      { id: 'Kram, mual, atau tekanan turun langsung ditangani perawat tanpa menunggu', en: 'Cramps, nausea or a pressure drop are handled by the nurse right away' },
    ],
    ikon: Activity,
  },
  {
    tahap: { id: 'Tahap 3', en: 'Step 3' },
    judul: { id: 'Pascadialisis & Pulang', en: 'Post-Dialysis and Going Home' },
    durasi: { id: '± 30 menit observasi', en: 'About 30 minutes of observation' },
    poin: [
      { id: 'Timbang berat badan pasca-sesi untuk memastikan target tercapai', en: 'Post-session weighing to confirm the target was reached' },
      { id: 'Tusukan diberi tekanan, dibalut, dan diajarkan cara merawatnya di rumah', en: 'The puncture is held under pressure, dressed, and its home care is taught' },
      { id: 'Cek ulang tekanan darah dan perdarahan sebelum pasien berdiri', en: 'Blood pressure and bleeding are rechecked before the patient stands up' },
      { id: 'Edukasi cairan, makanan, obat, dan jadwal sesi berikutnya dicatat di kartu kontrol', en: 'Guidance on fluids, food, drugs and the next slot is written on the control card' },
    ],
    ikon: HandHeart,
  },
];

/** Dua jalur penjaminan; garis kiri dibedakan warna. */
const PENJAMINAN: {
  judul: Teks;
  pill: Teks;
  ket: Teks;
  poin: Teks[];
  catatan: Teks;
  garis: string;
  ikon: Ikon;
}[] = [
  {
    judul: { id: 'BPJS Kesehatan', en: 'BPJS Kesehatan (National Insurance)' },
    pill: { id: 'Dijamin penuh', en: 'Fully covered' },
    ket: {
      id: 'Dialisis rutin karena penyakit ginjal kronik dijamin penuh sepanjang indikasi medisnya benar dan status kepesertaan aktif. Frekuensi yang dijamin adalah dua kali seminggu, dan bisa lebih sesuai penilaian konsultan ginjal.',
      en: 'Routine dialysis for chronic kidney disease is fully covered as long as the medical indication is right and the membership is active. Two sessions a week are covered, and more is possible on the nephrologist assessment.',
    },
    poin: [
      { id: 'Syarat: SJP/SPRI aktif + Surat Pengantar Hemodialisa dari dokter penanggung jawab', en: 'Requirements: an active referral/guarantee letter plus the HD cover letter from the physician in charge' },
      { id: 'Verifikasi elektronik (V-Claim) dan klaim paket berjalan di admisi unit', en: 'Electronic verification (V-Claim) and package claims are handled at the unit admission desk' },
      { id: 'Jadwal rutin dicatat sekali, jadi sesi berikutnya tidak perlu mengurus surat dari nol', en: 'The routine schedule is registered once, so later sessions do not restart the paperwork' },
    ],
    catatan: {
      id: 'Bawa kartu BPJS, KTP, dan lembar kontrol setiap kali datang. Bila surat jaminan habis masa berlakunya, tim admisi menghubungi keluarga sebelum sesi dimulai, bukan setelahnya.',
      en: 'Bring the BPJS card, ID and the control sheet on every visit. If the guarantee letter expires, the admission desk contacts the family before the session starts, not after.',
    },
    garis: 'border-l-medical-red',
    ikon: ShieldCheck,
  },
  {
    judul: { id: 'Asuransi Swasta & Umum', en: 'Private Insurance & Self-Pay' },
    pill: { id: 'Cashless fast-track', en: 'Cashless fast-track' },
    ket: {
      id: 'Peserta asuransi diproses tanpa uang muka lewat pengajuan digital ke penjamin, sementara pasien umum menerima rincian tarif per sesi sebelum tindakan sehingga tidak ada tagihan mengejutkan.',
      en: 'Insured patients are processed without a deposit through a digital submission to the insurer, while self-pay patients receive a per-session cost breakdown before the procedure so no bill comes as a surprise.',
    },
    poin: [
      { id: 'Pre-authorization dialisis rutin diajukan sekaligus untuk sebulan ke depan', en: 'Routine dialysis pre-authorisation is filed for a whole month ahead' },
      { id: 'Tarif transparan: mesin, dializer, obat, dan tindakan terinci terpisah', en: 'Transparent rates: machine, dializer, drugs and procedure itemised separately' },
      { id: 'Travelling Dialysis: HD sementara untuk pasien dari luar kota yang sedang berada di Medan', en: 'Travelling Dialysis: a temporary slot for out-of-town patients currently in Medan' },
    ],
    catatan: {
      id: 'Travelling Dialysis diajukan minimal H-2 dengan melampirkan ringkasan medis dan jadwal rutin dari unit asal, supaya mesin dan perawat bisa disiapkan.',
      en: 'Travelling Dialysis is requested at least two days ahead with a medical summary and the regular schedule from the home unit, so a machine and nurse can be prepared.',
    },
    garis: 'border-l-teal-600',
    ikon: CalendarClock,
  },
];

/** Tiga pilar edukasi pasien. */
const EDUKASI: { judul: Teks; ket: Teks; poin: Teks[]; ikon: Ikon }[] = [
  {
    judul: { id: 'Perawatan Akses Vaskular', en: 'Vascular Access Care' },
    ket: {
      id: 'Akses adalah "nyawa" pasien dialisis. Cimino atau AV Shunt (AVG) yang dirawat dengan baik membuat darah mengalir lancar dan sesi berjalan nyaman.',
      en: 'The access is the dialysis patient lifeline. A well-cared Cimino or AV shunt (AVG) keeps blood flowing smoothly and the session comfortable.',
    },
    poin: [
      { id: 'Raba getaran (thrill) di jalur akses setiap hari; segera lapor bila hilang', en: 'Feel the thrill along the access every day; report at once if it disappears' },
      { id: 'Dilarang tensi, infus, atau suntikan di lengan akses', en: 'No blood pressure cuff, drip or injection on the access arm' },
      { id: 'Tidak mengangkat beban berat dengan lengan akses, kuku tetap pendek', en: 'Do not lift heavy objects with that arm; keep nails short' },
      { id: 'Bersihkan lengan sebelum sesi; perdarahan ditekan lurus, jangan diurut', en: 'Wash the arm before the session; press bleeding straight, never rub it' },
    ],
    ikon: Heart,
  },
  {
    judul: { id: 'Manajemen Cairan & Nutrisi', en: 'Fluid and Nutrition Management' },
    ket: {
      id: 'Antara dua sesi, cairan dan mineral menumpuk karena ginjal tidak lagi membuangnya. Bagian yang paling sering bikin sesak dan kram adalah piring dan gelas.',
      en: 'Between two sessions fluid and minerals build up because the kidneys no longer clear them. The parts that most often cause breathlessness and cramps are the plate and the glass.',
    },
    poin: [
      { id: 'Batas minum umumnya jumlah urine sehari ditambah 500 cc', en: 'The drinking limit is usually daily urine output plus 500 cc' },
      { id: 'Batasi kalium: pisang, jeruk, tomat, kentang, air kelapa', en: 'Limit potassium: banana, orange, tomato, potato, coconut water' },
      { id: 'Batasi fosfat: susu, keju, kacang, jeroan, minuman bersoda', en: 'Limit phosphate: milk, cheese, nuts, offal, soft drinks' },
      { id: 'Kenaikan berat badan antar sesi dijaga sedekat mungkin ke 1 kg', en: 'Keep the weight gain between sessions as close to 1 kg as possible' },
    ],
    ikon: Droplets,
  },
  {
    judul: { id: 'Dukungan Psikologis & Komunitas', en: 'Psychological Support and Community' },
    ket: {
      id: 'Cuci darah seumur hidup mengubah ritme keluarga. Pasien yang tahu jalan ceritanya cenderung lebih patuh pada jadwal dan dietnya.',
      en: 'Lifelong dialysis changes the rhythm of a whole family. Patients who know the road ahead tend to follow their schedule and diet more closely.',
    },
    poin: [
      { id: 'Kelompok pendukung pasien dialisis, dipandu perawat edukator', en: 'A dialysis patient support group, guided by an educator nurse' },
      { id: 'Konseling psikolog dan rujukan psikiater bila dibutuhkan keluarga', en: 'Psychologist counselling and psychiatrist referral when the family needs it' },
      { id: 'Pendampingan kembali bekerja, menyetir, dan bepergian jauh', en: 'Coaching to return to work, driving and long-distance travel' },
      { id: 'Nomor unit tersedia untuk bertanya di luar jadwal sesi', en: 'The unit number stays open for questions outside session slots' },
    ],
    ikon: Users,
  },
];

/* --------------------------------- HALAMAN --------------------------------- */

/**
 * HALAMAN HEMODIALISA (/layanan/hemodialisa) — enam bagian pertama: hero split
 * 50:50, empat jenis layanan HD, fasilitas & tim medis dua kolom, alur pasien
 * tiga tahap, penjaminan BPJS vs asuransi/umum, lalu edukasi pasien tiga kartu.
 * Panel reservasi shift, kalkulator cairan, dan unduh brosur hidup di
 * <HemodialisaWidgets />. Seluruh halaman terang: putih dan slate-50, aksen
 * teal + medical red untuk penjaminan.
 */
const HemodialisaClient: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (teks: Teks) => teks[lang];

  return (
    <div className="bg-white text-slate-800">
      {/* ================= 1. HERO (LATAR BELAKANG FOTO) ================= */}
      <section className="relative overflow-hidden bg-white pt-12 pb-16 lg:pt-16 lg:pb-20">
        <div aria-hidden className="absolute inset-0">
          <Image src={fotoHdMobile} alt="" fill priority sizes="100vw" quality={90} className="object-cover object-right md:hidden" />
                    <Image src={fotoHd} alt="" fill priority sizes="100vw" quality={90} className="hidden object-cover md:block" />
        </div>
        {/* Scrim: putih pekat hanya di sisi kiri (sampai ±45%), kanan 100% bening. */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-white from-20% via-white/70 to-transparent to-60%" />

        <div className="relative z-10 mr-auto w-full max-w-7xl px-6 lg:px-12">
          <div>
            <h1 className="text-[clamp(2rem,4.2vw,3.25rem)] font-extrabold leading-[1.1] tracking-tight text-slate-900">
              {L({ id: 'Unit Hemodialisis (Cuci Darah)', en: 'Hemodialysis Unit (Blood Dialysis)' })}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-700 sm:text-xl">
              {L({
                id: 'Cuci darah bukan akhir dari aktivitas sehari-hari. Dengan dua belas unit mesin high flux, air olahan yang diuji endotoksin setiap bulan, dan tim perawat nefrologi yang sama menemani Anda dari sesi pertama, sebagian besar pasien tetap bisa bekerja, bepergian, dan makan bersama keluarga.',
                en: 'Dialysis is not the end of daily life. With twelve high-flux machines, process water tested monthly for endotoxin, and the same team of nephrology nurses walking beside you from the very first session, most patients keep working, travelling and eating with their families.',
              })}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-4 py-2 text-base font-semibold text-slate-700 backdrop-blur-sm">
                <Clock className="h-5 w-5 shrink-0 text-teal-600" />
                {L({ id: 'Senin s.d. Sabtu, dua blok shift', en: 'Monday to Saturday, two shift blocks' })}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-4 py-2 text-base font-semibold text-slate-700 backdrop-blur-sm">
                <Gauge className="h-5 w-5 shrink-0 text-teal-600" />
                {L({ id: '12 unit mesin high flux', en: '12 high-flux machines' })}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-4 py-2 text-base font-semibold text-slate-700 backdrop-blur-sm">
                <MapPin className="h-5 w-5 shrink-0 text-teal-600" />
                {L({ id: 'Lt 2 South Wing · Kidney Center', en: 'Level 2 South Wing · Kidney Center' })}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. JENIS LAYANAN HD (4 KOLOM) ================= */}
      <section id="layanan" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Empat Jalur Layanan Dialisis', en: 'Four Dialysis Pathways' })}
          </h2>
          <div className="mt-5 h-px w-full bg-slate-200" />

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Tidak semua cuci darah datang dari jalan yang sama. Ada yang sudah terjadwal bertahun-tahun, ada yang harus berjalan malam ini juga, dan ada yang butuh sudut tersendiri. Keempatnya dilayani di lantai yang sama, dengan tim yang sama.',
              en: 'Not every dialysis case arrives by the same road. Some are scheduled for years, some must run tonight, and some need a corner of their own. All four are served on the same floor, by the same team.',
            })}
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {LAYANAN.map((l, i) => (
              <motion.article
                key={l.judul.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07, ease: 'easeOut' }}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-teal-100 bg-teal-50 text-teal-700">
                    <l.ikon className="h-7 w-7" />
                  </span>
                  <span className="mt-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-slate-600">
                    {L(l.pill)}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-900">{L(l.judul)}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600">{L(l.ket)}</p>

                <ul className="mt-5 space-y-2.5 border-t border-slate-100 pt-5">
                  {l.poin.map((p) => (
                    <li key={p.id} className="flex items-start gap-2.5 text-base leading-snug text-slate-700">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-teal-600" />
                      <span>{L(p)}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 3. FASILITAS & TIM MEDIS (2 KOLOM) ============ */}
      <section id="fasilitas-tim" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Yang Memengaruhi Kualitas Sesi Anda', en: 'What Shapes the Quality of Your Session' })}
          </h2>
          <div className="mt-5 h-px w-full bg-slate-200" />

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Hasil cuci darah yang baik ditentukan dua hal: seberapa bersih alat dan airnya, dan siapa yang berdiri di samping Anda selama empat jam. Keduanya dijelaskan di bawah ini.',
              en: 'A good dialysis outcome depends on two things: how clean the equipment and water are, and who stands beside you for four hours. Both are set out below.',
            })}
          </p>

          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-14">
            {/* KOLOM KIRI: fasilitas */}
            <div>
              <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">
                {L({ id: 'Fasilitas & Standar Sterilitas', en: 'Facilities and Sterility Standards' })}
              </h3>
              <p className="mt-3 text-lg leading-relaxed text-slate-600">
                {L({
                  id: 'Semua perangkat di bawah ini adalah standar yang berlaku di setiap sesi, bukan layanan tambahan berbayar.',
                  en: 'Everything below is the standard in every session, not a paid add-on.',
                })}
              </p>

              <ul className="mt-8 space-y-4">
                {FASILITAS.map((f, i) => (
                  <motion.li
                    key={f.judul.id}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05, ease: 'easeOut' }}
                    className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-teal-700">
                      <f.ikon className="h-6 w-6" />
                    </span>
                    <div>
                      <h4 className="text-lg font-extrabold leading-snug text-slate-900">{L(f.judul)}</h4>
                      <p className="mt-2 text-base leading-relaxed text-slate-600">{L(f.ket)}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* KOLOM KANAN: tim medis */}
            <div>
              <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">
                {L({ id: 'Tim Medis yang Mendampingi', en: 'The Medical Team beside You' })}
              </h3>
              <p className="mt-3 text-lg leading-relaxed text-slate-600">
                {L({
                  id: 'Empat peran yang akan Anda kenali namanya dalam minggu pertama perawatan.',
                  en: 'Four roles whose names you will learn in the first week of treatment.',
                })}
              </p>

              <div className="mt-8 space-y-5">
                {TIM.map((t, i) => (
                  <motion.article
                    key={t.judul.id}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.42, delay: i * 0.06, ease: 'easeOut' }}
                    className="rounded-2xl border border-slate-200 border-l-4 border-l-teal-500 bg-white p-6 shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-teal-100 bg-teal-50 text-teal-700">
                        <t.ikon className="h-6 w-6" />
                      </span>
                      <h4 className="text-xl font-extrabold leading-snug tracking-tight text-slate-900">{L(t.judul)}</h4>
                    </div>
                    <p className="mt-4 text-base leading-relaxed text-slate-600">{L(t.ket)}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 4. ALUR PASIEN (TIMELINE 3 TAHAP) ============ */}
      <section id="alur" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Alur Pasien: Dari Pintu Masuk sampai Pulang', en: 'Patient Journey: From the Door to Going Home' })}
          </h2>
          <div className="mt-5 h-px w-full bg-slate-200" />

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Sesi pertama biasanya paling menegangkan karena belum ada yang tahu bentuk harinya. Tiga tahap berikut berjalan dengan urutan yang sama setiap kali, jadi keluarga bisa memperkirakan waktunya.',
              en: 'The first session is usually the tensest because nobody knows what the day looks like yet. These three steps run in the same order every time, so the family can estimate the timing.',
            })}
          </p>

          <div className="relative mt-14">
            {/* Garis penghubung, hanya muncul di layar besar */}
            <div className="absolute left-0 right-0 top-7 hidden h-px bg-slate-200 lg:block" aria-hidden="true" />

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-8">
              {ALUR.map((a, i) => (
                <motion.div
                  key={a.tahap.id}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1, ease: 'easeOut' }}
                  className="relative flex h-full flex-col"
                >
                  <div className="flex items-center gap-4">
                    <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-teal-100 bg-white text-teal-700 shadow-sm">
                      <a.ikon className="h-7 w-7" />
                    </span>
                    <span className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-extrabold uppercase tracking-wide text-slate-600">
                      {L(a.tahap)}
                    </span>
                  </div>

                  <div className="mt-6 flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                    <h3 className="text-2xl font-extrabold leading-snug tracking-tight text-slate-900">{L(a.judul)}</h3>
                    <p className="mt-2 flex items-center gap-2 text-base font-bold text-teal-700">
                      <Clock className="h-4 w-4 shrink-0" />
                      {L(a.durasi)}
                    </p>

                    <ul className="mt-6 space-y-3 border-t border-slate-100 pt-6">
                      {a.poin.map((p) => (
                        <li key={p.id} className="flex items-start gap-3 text-base leading-snug text-slate-700">
                          <Check className="mt-1 h-4 w-4 shrink-0 text-teal-600" />
                          <span>{L(p)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <p className="mt-12 max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 text-base leading-relaxed text-slate-600">
            {L({
              id: 'Keluarga dipersilakan menemani sampai area tunggu unit. Untuk sesi pertama, perawat edukator menyediakan waktu tambahan sekitar 30 menit di akhir sesi khusus untuk menjelaskan alat, suara alarm, dan hal-hal yang boleh ditanyakan kapan saja.',
              en: 'Relatives are welcome to accompany the patient as far as the unit waiting area. For a first session, the educator nurse sets aside roughly 30 extra minutes at the end, dedicated to explaining the equipment, the alarm sounds, and what may be asked at any time.',
            })}
          </p>
        </div>
      </section>

      {/* ============ 5. PENJAMINAN (2 KARTU BERSABELAHAN) ============ */}
      <section id="penjaminan" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Penjaminan Biaya Dialisis', en: 'Dialysis Cost Guarantees' })}
          </h2>
          <div className="mt-5 h-px w-full bg-slate-200" />

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Dialisis adalah perawatan jangka panjang, jadi kepastian biaya sama pentingnya dengan kepastian alat. Dua jalur di bawah ini yang paling sering dipakai keluarga.',
              en: 'Dialysis is long-term care, so cost certainty matters as much as equipment certainty. These are the two pathways families use most.',
            })}
          </p>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {PENJAMINAN.map((p, i) => (
              <motion.article
                key={p.judul.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: 'easeOut' }}
                className={`flex h-full flex-col rounded-3xl border border-slate-200 border-l-4 ${p.garis} bg-white p-8 shadow-sm`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700">
                      <p.ikon className="h-6 w-6" />
                    </span>
                    <h3 className="text-2xl font-extrabold leading-snug tracking-tight text-slate-900">{L(p.judul)}</h3>
                  </div>
                  <span className="mt-1 shrink-0 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-slate-600">
                    {L(p.pill)}
                  </span>
                </div>

                <p className="mt-5 text-lg leading-relaxed text-slate-600">{L(p.ket)}</p>

                <ul className="mt-6 space-y-3">
                  {p.poin.map((q) => (
                    <li key={q.id} className="flex items-start gap-3 text-base leading-snug text-slate-700">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-teal-600" />
                      <span>{L(q)}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-auto pt-7 text-base leading-relaxed text-slate-500">{L(p.catatan)}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 6. EDUKASI PASIEN (3 KOLOM) ============ */}
      <section id="edukasi" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Tiga Hal yang Dijalankan di Rumah', en: 'Three Things Done at Home' })}
          </h2>
          <div className="mt-5 h-px w-full bg-slate-200" />

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Antara dua sesi, pasien lebih sering berada di rumah daripada di unit. Apa yang dikerjakan di sana sangat menentukan bagaimana rasanya sesi berikutnya.',
              en: 'Between two sessions a patient spends more time at home than in the unit. What happens there strongly shapes how the next session feels.',
            })}
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {EDUKASI.map((e, i) => (
              <motion.article
                key={e.judul.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: 'easeOut' }}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-teal-100 bg-teal-50 text-teal-700">
                  <e.ikon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-900">{L(e.judul)}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600">{L(e.ket)}</p>

                <ul className="mt-6 space-y-3 border-t border-slate-100 pt-6">
                  {e.poin.map((p) => (
                    <li key={p.id} className="flex items-start gap-3 text-base leading-snug text-slate-700">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-teal-600" />
                      <span>{L(p)}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 7. WIDGET UX (RESERVASI, KALKULATOR, BROSUR) ============ */}
      <HemodialisaWidgets />
    </div>
  );
};

/** Ikon clipboard untuk tahap pendaftaran (beban ikon Lucide sudah penuh). */
function ClipboardIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M9 12h6M9 16h4" />
    </svg>
  );
}

export default HemodialisaClient;
