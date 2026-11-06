'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Activity,
  Armchair,
  BadgeCheck,
  CalendarCheck,
  Check,
  Clock,
  Crosshair,
  Droplets,
  HandHeart,
  Heart,
  Info,
  MapPin,
  Pill,
  ShieldCheck,
  Stethoscope,
  Utensils,
  Users,
  Wallet,
  Wind,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import type { Language } from '../../../types';
import fotoOnkologi from '@/images/hero/fasilitas/kemo.jpg';
import fotoOnkologiMobile from '@/images/hero/mobile-fasilitas/kemo.jpg';
import KemoterapiWidgets from './KemoterapiWidgets';

type Teks = { id: string; en: string };
type Ikon = React.ComponentType<{ className?: string }>;

/* ============================== DATA HALAMAN ============================== */

/** Empat jalur terapi sistemik yang dijalankan di unit ini. */
const TERAPI: { judul: Teks; pill: Teks; ket: Teks; ikon: Ikon }[] = [
  {
    judul: { id: 'Kemoterapi Rawat Jalan (Daycare)', en: 'Outpatient Chemotherapy (Daycare)' },
    pill: { id: 'Pulang pada hari yang sama', en: 'Home on the same day' },
    ket: {
      id: 'Sebagian besar regimen diberikan di ruang daycare Lt 5. Anda tiba pagi, menerima infus sambil duduk di kursi recliner, lalu pulang setelah observasi. Tidak perlu menginap dan tidak menunggu kamar kosong.',
      en: 'Most regimens are given in the level 5 daycare ward. You arrive in the morning, receive the infusion in a recliner chair and go home after observation. No overnight stay and no waiting for a free bed.',
    },
    ikon: Armchair,
  },
  {
    judul: { id: 'Kemoterapi Rawat Inap', en: 'Inpatient Chemotherapy' },
    pill: { id: 'Regimen panjang atau risiko tinggi', en: 'Long or high-risk regimens' },
    ket: {
      id: 'Untuk regimen yang butuh hidrasi lama, pemantauan ketat, atau kondisi pasien yang belum stabil. Perawatan diatur bersama tim penyakit dalam dan onkologi, termasuk penanganan reaksi infus bila muncul.',
      en: 'For regimens needing prolonged hydration, close monitoring, or a patient condition that is not yet stable. Care is arranged with the internal medicine and oncology team, including management of any infusion reaction.',
    },
    ikon: Activity,
  },
  {
    judul: { id: 'Terapi Target (Targeted Therapy)', en: 'Targeted Therapy' },
    pill: { id: 'Menyerang titik spesifik sel kanker', en: 'Aims at a specific cancer pathway' },
    ket: {
      id: 'Obat bekerja pada reseptor atau gen tertentu, misalnya HER2 atau reseptor hormon. Penanda biologis diperiksa lebih dulu supaya pilihan obat tepat, dan efek sampingnya umumnya lebih terarah dibanding kemoterapi konvensional.',
      en: 'The drug acts on a specific receptor or gene, for example HER2 or hormone receptors. Biological markers are checked first so the choice is precise, and side effects are generally more targeted than conventional chemotherapy.',
    },
    ikon: Crosshair,
  },
  {
    judul: { id: 'Imunoterapi & Terapi Hormonal', en: 'Immunotherapy & Hormonal Therapy' },
    pill: { id: 'Membantu daya tahan & memotong suplai hormon', en: 'Boosts immunity and cuts the hormone supply' },
    ket: {
      id: 'Imunoterapi membantu sistem kekebalan mengenali sel kanker, sedangkan terapi hormonal menghambat kanker yang tumbuh karena hormon, seperti payudara atau prostat. Keduanya berjalan dengan jadwal siklus yang terukur.',
      en: 'Immunotherapy helps the immune system recognise cancer cells, while hormonal therapy blocks cancers that grow with hormones, such as breast or prostate. Both follow a measured cycle schedule.',
    },
    ikon: ShieldCheck,
  },
];

/** Fasilitas dan standar keamanan khas terapi sitostatika. */
const FASILITAS: { judul: Teks; ket: Teks; poin: Teks[]; ikon: Ikon }[] = [
  {
    judul: { id: 'Ruang Penyiapan Obat Sitostatika (Cleanroom / LAF)', en: 'Cytotoxic Compounding Room (Cleanroom / LAF)' },
    ket: {
      id: 'Regimen diracik oleh apoteker onkologi di dalam Biological Safety Cabinet bersertifikat, bukan di bangsal terbuka.',
      en: 'Regimens are compounded by an oncology pharmacist inside a certified Biological Safety Cabinet, not on an open ward.',
    },
    poin: [
      { id: 'Laminar airflow tekanan negatif, obat terlindung dari kontaminasi', en: 'Negative-pressure laminar airflow, protecting the drug from contamination' },
      { id: 'Verifikasi ganda dosis dan nama pasien sebelum obat keluar ruang', en: 'Double check of dose and patient name before the drug leaves the room' },
      { id: 'Protokol keamanan sitotoksik dan penanganan tumpahan', en: 'Cytotoxic safety and spill response protocol' },
    ],
    ikon: Wind,
  },
  {
    judul: { id: 'Ruang Kemoterapi Daycare Premium', en: 'Premium Chemotherapy Daycare' },
    ket: {
      id: 'Delapan kursi recliner dengan privasi parsial, satu titik oksigen dan suction di tiap posisi infus.',
      en: 'Eight recliner chairs with partial privacy, an oxygen point and suction at every infusion position.',
    },
    poin: [
      { id: 'Kursi elektrik recliner, selimut, dan sandaran lengan', en: 'Electric recliner chair, blanket and armrest' },
      { id: 'TV, Wi-Fi, dan colokan pribadi di setiap kursi', en: 'TV, Wi-Fi and a personal power socket at every chair' },
      { id: 'Pemantauan reaksi infus dan extravasasi selama pemberian', en: 'Monitoring for infusion and extravasation reactions during administration' },
    ],
    ikon: Armchair,
  },
  {
    judul: { id: 'Layanan Chemo Port & PICC Line', en: 'Chemo Port & PICC Line Service' },
    ket: {
      id: 'Akses vaskular jangka panjang melindungi pembuluh darah dan membuat siklus berikutnya tidak berulang kali ditusuk.',
      en: 'A long-term vascular access protects your veins so the next cycles do not need repeated needle sticks.',
    },
    poin: [
      { id: 'Pemasangan port dan PICC oleh dokter yang ditunjuk', en: 'Port and PICC insertion performed by the appointed doctor' },
      { id: 'Perawatan dan flushing berkala, bisa dijadwalkan di daycare', en: 'Periodic care and flushing, can be scheduled in the daycare' },
      { id: 'Edukasi menjaga akses di rumah: tanda merah, bengkak, atau demam', en: 'Home care education: signs of redness, swelling or fever' },
    ],
    ikon: Droplets,
  },
];

/** Tim medis multidisiplin. */
const TIM: { judul: Teks; ket: Teks; ikon: Ikon }[] = [
  {
    judul: { id: 'Sp.PD-KHOM', en: 'Sp.PD-KHOM' },
    ket: {
      id: 'Konsultan hematologi-onkologi medik: menentukan regimen, menghitung dosis, dan menjadi dokter penanggung jawab pelayanan (DPJP) sepanjang terapi.',
      en: 'Haematology-oncology internal medicine consultant: decides the regimen, calculates the dose and acts as the doctor in charge (DPJP) throughout treatment.',
    },
    ikon: Stethoscope,
  },
  {
    judul: { id: 'Sp.B.Onk / Sp.OG-K.Onk', en: 'Sp.B.Onk / Sp.OG-K.Onk' },
    ket: {
      id: 'Bedah dan ginekologi onkologi: menilai tahap penyakit, merancang operasi, dan membahas kasus bersama dalam tumor board multidisiplin.',
      en: 'Surgical and gynaecological oncology: stages the disease, plans surgery and reviews cases together in the multidisciplinary tumour board.',
    },
    ikon: Heart,
  },
  {
    judul: { id: 'Perawat Mahir Onkologi', en: 'Oncology Trained Nurse' },
    ket: {
      id: 'Perawat tersertifikasi pemberian kemoterapi yang memasang infus, memantau reaksi, dan menjadi jalur komunikasi pertama Anda.',
      en: 'Chemotherapy certified nurses who place the line, watch for reactions and are your first point of contact.',
    },
    ikon: HandHeart,
  },
  {
    judul: { id: 'Apoteker & Gizi Klinis', en: 'Pharmacist & Clinical Nutritionist' },
    ket: {
      id: 'Apoteker onkologi meracik dan mengawal kestabilan obat; ahli gizi klinis menjaga berat badan dan intake selama siklus berjalan.',
      en: 'The oncology pharmacist compounds and guards drug stability; the clinical nutritionist protects weight and intake while cycles run.',
    },
    ikon: Pill,
  },
];

/** Tiga tahap alur pasien. */
const ALUR: { tahap: Teks; judul: Teks; poin: Teks[]; ikon: Ikon }[] = [
  {
    tahap: { id: 'Tahap 1 · Pra-Kemoterapi', en: 'Stage 1 · Before Chemotherapy' },
    judul: { id: 'Kesiapan Tubuh Disetujui', en: 'Body Readiness Is Cleared' },
    poin: [
      { id: 'Darah lengkap, fungsi hati (SGOT, SGPT, bilirubin), dan fungsi ginjal (ureum, kreatinin)', en: 'Full blood count, liver function (SGOT, SGPT, bilirubin) and kidney function (urea, creatinine)' },
      { id: 'Konsultasi DPJP: regimen, jumlah siklus, dan target pengobatan dijelaskan tertulis', en: 'Consultation with the doctor in charge: regimen, number of cycles and treatment goal explained in writing' },
      { id: 'Pemeriksaan akses infus: port atau PICC disiapkan bila pembuluh darah kecil atau rapuh', en: 'Vascular access check: a port or PICC is prepared if veins are fragile' },
    ],
    ikon: CalendarCheck,
  },
  {
    tahap: { id: 'Tahap 2 · Intra-Kemoterapi', en: 'Stage 2 · During Chemotherapy' },
    judul: { id: 'Infus Berjalan dengan Pemantauan', en: 'The Infusion Runs Under Monitoring' },
    poin: [
      { id: 'Premedikasi anti-mual dan anti-reaksi diberikan beberapa menit sebelum obat utama', en: 'Anti-nausea and anti-reaction premedication given minutes before the main drug' },
      { id: 'Obat dari ruang racik steril diverifikasi ganda di samping Anda sebelum dialirkan', en: 'The drug from the sterile room is double checked beside you before it flows' },
      { id: 'Tensi, nadi, dan lokasi suntik dipantau; drip diperlambat atau dihentikan bila ada reaksi', en: 'Blood pressure, pulse and the insertion site are watched; the drip slows or stops if a reaction appears' },
    ],
    ikon: Droplets,
  },
  {
    tahap: { id: 'Tahap 3 · Pasca-Kemoterapi', en: 'Stage 3 · After Chemotherapy' },
    judul: { id: 'Pulang dengan Pegangan Jelas', en: 'Going Home with Clear Support' },
    poin: [
      { id: 'Edukasi efek samping yang mungkin muncul hari 3 sampai 7 dan mana yang wajib dilaporkan', en: 'Education on side effects likely on day 3 to 7 and which ones must be reported' },
      { id: 'Resep obat lanjutan (anti-mual, penunjang darah) diserahkan bersama jadwal minum', en: 'Follow-up prescriptions (anti-nausea, blood support) handed over with a dosing schedule' },
      { id: 'Jadwal siklus berikutnya dicetak dan bisa dilihat di kalender siklus pada halaman ini', en: 'The next cycle date is printed and can also be seen on the cycle calendar on this page' },
    ],
    ikon: Check,
  },
];

/** Dua jalur penjaminan biaya. */
const PENJAMINAN: {
  judul: Teks; pill: Teks; ket: Teks; poin: Teks[]; garis: string; ikon: Ikon;
}[] = [
  {
    judul: { id: 'BPJS Kesehatan', en: 'BPJS Health Insurance' },
    pill: { id: 'Sesuai Fornas & indikasi medis DPJP', en: 'Per national formulary & DPJP medical indication' },
    ket: {
      id: 'Obat kanker dijamin bila regimen dan tahap penyakit sesuai Fornas serta ditulis dengan indikasi medis oleh dokter penanggung jawab. Rutenya berjenjang dan butuh surat layak.',
      en: 'Cancer drugs are covered when the regimen and disease stage follow the national formulary and are prescribed with a medical indication by the doctor in charge. The route is tiered and needs a fitness letter.',
    },
    poin: [
      { id: 'Rujukan berjenjang dengan keterangan diagnosis dan tahap penyakit', en: 'Tiered referral stating the diagnosis and disease stage' },
      { id: 'Obat dan tindakan yang masuk Fornas dijamin; di luar itu jadi biaya mandiri', en: 'Drugs and actions inside the national formulary are covered; anything beyond becomes self-pay' },
      { id: 'Sesuai kelas perawatan, rawat inap hanya bila ada indikasi medis', en: 'Follows the care class; inpatient only with a medical indication' },
    ],
    garis: 'border-l-medical-red',
    ikon: BadgeCheck,
  },
  {
    judul: { id: 'Asuransi Swasta & Umum', en: 'Private Insurance & Self-Pay' },
    pill: { id: 'Cashless + paket per siklus', en: 'Cashless + per-cycle package' },
    ket: {
      id: 'Klaim kanker biasanya berjalan dengan rider kanker dan batas plafon rawat jalan tersendiri, jadi nilai pertanggungan dicek lebih dulu sebelum siklus pertama.',
      en: 'Cancer claims usually run under a cancer rider with its own outpatient limit, so the coverage amount is checked before the first cycle.',
    },
    poin: [
      { id: 'Verifikasi cashless dan pre-authorization diurus unit, bukan pasien', en: 'Cashless verification and pre-authorisation handled by the unit, not the patient' },
      { id: 'Rincian biaya per siklus tertulis: obat, jasa dokter, bahan, dan penunjang', en: 'A written per-cycle breakdown: drug, doctor fee, consumables and supporting tests' },
      { id: 'Sisa biaya di luar plafon diinformasikan sebelum obat diracik', en: 'Any balance outside the limit is told to you before the drug is compounded' },
    ],
    garis: 'border-l-violet-600',
    ikon: Wallet,
  },
];

/** Supportive care: tiga pilar pendampingan. */
const SUPPORTIVE: { judul: Teks; ket: Teks; poin: Teks[]; ikon: Ikon }[] = [
  {
    judul: { id: 'Manajemen Efek Samping', en: 'Side Effect Management' },
    ket: {
      id: 'Mual, sariawan, lemas, dan kerontokan rambut punya jadwal kemunculannya. Tim menyiapkan obat dan langkah sejak sebelum gejala memuncak.',
      en: 'Nausea, mouth sores, fatigue and hair loss each have a predictable timing. The team prepares medicine and steps before the peak.',
    },
    poin: [
      { id: 'Anti-mual bertahap dan jalur telepon 24 jam untuk reaksi', en: 'Stepwise anti-nausea and a 24-hour phone line for reactions' },
      { id: 'Pemantauan darah rutin untuk mencegah infeksi dan anemia berat', en: 'Routine blood watch to prevent infection and severe anaemia' },
      { id: 'Edukasi rambut rontok bersifat sementara, termasuk pilihan penutup kepala', en: 'Education that hair loss is temporary, including head-cover options' },
    ],
    ikon: ShieldCheck,
  },
  {
    judul: { id: 'Konsultasi Nutrisi', en: 'Nutrition Consultation' },
    ket: {
      id: 'Berat badan yang terjaga adalah bagian dari pengobatan. Ahli gizi menyusun menu yang tahan terhadap perubahan selera dan mual.',
      en: 'Keeping your weight stable is part of the treatment. The nutritionist builds a menu that works with changing taste and nausea.',
    },
    poin: [
      { id: 'Porsi kecil berulang dan menu tinggi protein bila cepat kenyang', en: 'Small frequent portions and a high-protein menu when you full quickly' },
      { id: 'Penyesuaian makan bila gula darah, asam urat, atau ginjal ikut bermasalah', en: 'Diet adjusted when blood sugar, uric acid or the kidneys are involved' },
      { id: 'Panduan makan aman saat nafsu makan turun, termasuk makanan lunak', en: 'Guide for eating safely when appetite drops, including soft food' },
    ],
    ikon: Utensils,
  },
  {
    judul: { id: 'Pendampingan Psikologis & Support Group', en: 'Psychological Support & Support Group' },
    ket: {
      id: 'Kecemasan menjelang siklus itu nyata. Konseling psikologi onkologi dan kelompok pasien tersedia sebagai bagian dari layanan.',
      en: 'Anxiety before a cycle is real. Psycho-oncology counselling and a patient group are part of the service.',
    },
    poin: [
      { id: 'Konseling individu dan pendampingan keluarga di ruang terpisah', en: 'Individual counselling and family support in a separate room' },
      { id: 'Kelompok pendukung pasien kanker dengan sesi terjadwal', en: 'A cancer patient support group with scheduled sessions' },
      { id: 'Dukungan paliatif untuk kenyamanan, bukan hanya untuk fase lanjut', en: 'Palliative support for comfort, not only in the advanced phase' },
    ],
    ikon: Users,
  },
];

/* ================================ RENDER ================================ */

const KemoterapiClient: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (t: Teks) => t[lang];

  return (
    <div className="bg-white text-slate-800">
      {/* ============ 1. HERO (LATAR PENUH FOTO) ============ */}
      <section className="relative overflow-hidden bg-white pt-16 pb-12 lg:pt-20 lg:pb-16">
        {/* kemo.jpg dipakai sebagai latar penuh hero. */}
        <div aria-hidden className="absolute inset-0">
          <Image src={fotoOnkologiMobile} alt="" fill priority sizes="100vw" quality={90} className="object-cover object-right md:hidden" />
                    <Image src={fotoOnkologi} alt="" fill priority sizes="100vw" quality={90} className="hidden object-cover md:block" />
        </div>
        {/* Scrim: putih pekat hanya di sisi kiri (sampai ±45%), kanan 100% bening. */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-white from-20% via-white/70 to-transparent to-60%" />

        <div className="relative z-10 mr-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="max-w-3xl">
            <h1 className="text-[clamp(2.5rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight text-slate-900">
              {L({ id: 'Pusat Layanan Kemoterapi & Onkologi Medik', en: 'Chemotherapy and Medical Oncology Service Center' })}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
              {L({
                id: 'Pengobatan kanker terbaik dijalankan dengan rencana yang jelas, obat yang dihitung teliti, dan orang-orang yang tahu apa yang harus dilakukan bila ada reaksi. Di sini Anda tahu siklus berikutnya kapan, apa yang terjadi tiap tahap, dan ke mana menghubungi saat cemas di rumah.',
                en: 'The best cancer treatment runs on a clear plan, carefully calculated medicine, and people who know what to do if a reaction appears. Here you know when the next cycle is, what happens at each stage, and who to call when you feel anxious at home.',
              })}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
                <Clock className="h-5 w-5 shrink-0 text-violet-600" />
                {L({ id: 'Senin-Sabtu 08.00-18.00', en: 'Monday-Saturday 08.00-18.00' })}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
                <Armchair className="h-5 w-5 shrink-0 text-violet-600" />
                {L({ id: '8 kursi recliner daycare', en: '8 daycare recliner chairs' })}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
                <ShieldCheck className="h-5 w-5 shrink-0 text-violet-600" />
                {L({ id: 'Racik steril + verifikasi ganda', en: 'Sterile compounding + double check' })}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
                <MapPin className="h-5 w-5 shrink-0 text-violet-600" />
                {L({ id: 'Jalur efek samping 24 jam', en: '24-hour side effect line' })}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 2. JENIS TERAPI SISTEMIK (4 KOLOM) ============ */}
      <section id="terapi" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Jenis Terapi Sistemik', en: 'Types of Systemic Therapy' })}
          </h2>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Kombinasi obat, cara pemberian, dan jadwal ditentukan oleh DPJP berdasarkan jenis kanker serta tahap penyakit. Empat jalur berikut yang paling sering dijalankan di unit ini.',
              en: 'The mix of drugs, the way they are given and the schedule are decided by the doctor in charge according to the cancer type and stage. These four pathways are the most common ones in this unit.',
            })}
          </p>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {TERAPI.map((t, i) => (
              <motion.article
                key={t.judul.id}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-violet-100 bg-violet-50 text-violet-700">
                  <t.ikon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-900">{L(t.judul)}</h3>
                <p className="mt-2 text-sm font-extrabold uppercase tracking-wide text-violet-700">{L(t.pill)}</p>
                <p className="mt-3 text-base leading-relaxed text-slate-600">{L(t.ket)}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 3. FASILITAS & KEAMANAN + TIM (2 KOLOM) ============ */}
      <section id="fasilitas-tim" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Fasilitas, Keamanan, dan Tim Medis', en: 'Facilities, Safety and Medical Team' })}
          </h2>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
            {/* KIRI: FASILITAS */}
            <div>
              <h3 className="text-2xl font-extrabold leading-tight tracking-tight text-slate-900">
                {L({ id: 'Yang Menjaga Obat Tetap Aman', en: 'What Keeps the Medicine Safe' })}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {L({
                  id: 'Obat sitostatika kuat dan tidak boleh salah. Tiga lapis berikut yang membuat setiap dosis sampai dengan tepat.',
                  en: 'Cytotoxic drugs are strong and must not go wrong. These three layers make sure every dose arrives correctly.',
                })}
              </p>
              <div className="mt-8 space-y-6">
                {FASILITAS.map((f, i) => (
                  <motion.article
                    key={f.judul.id}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="flex gap-5 rounded-2xl border border-slate-200 border-l-4 border-l-violet-500 bg-white p-6 shadow-sm"
                  >
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-violet-100 bg-violet-50 text-violet-700">
                      <f.ikon className="h-7 w-7" />
                    </span>
                    <div>
                      <h4 className="text-xl font-extrabold leading-snug tracking-tight text-slate-900">{L(f.judul)}</h4>
                      <p className="mt-2.5 text-base leading-relaxed text-slate-600">{L(f.ket)}</p>
                      <ul className="mt-4 space-y-2">
                        {f.poin.map((p) => (
                          <li key={p.id} className="flex items-start gap-2.5">
                            <Check className="mt-1 h-4 w-4 shrink-0 text-violet-600" />
                            <span className="text-sm leading-relaxed text-slate-700">{L(p)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>

            {/* KANAN: TIM */}
            <div>
              <h3 className="text-2xl font-extrabold leading-tight tracking-tight text-slate-900">
                {L({ id: 'Tim yang Mengawal Setiap Siklus', en: 'The Team Behind Every Cycle' })}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {L({
                  id: 'Terapi kanker jarang diputuskan satu orang. Peran berikut bekerja dalam satu tim yang sama sejak diagnosis sampai siklus terakhir.',
                  en: 'Cancer treatment is rarely decided by one person. These roles work in one team from diagnosis to the final cycle.',
                })}
              </p>
              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {TIM.map((t, i) => (
                  <motion.div
                    key={t.judul.id}
                    initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-6"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-violet-100 bg-white text-violet-700">
                      <t.ikon className="h-6 w-6" />
                    </span>
                    <p className="mt-4 text-lg font-extrabold leading-snug tracking-tight text-slate-900">{L(t.judul)}</p>
                    <p className="mt-2.5 text-base leading-relaxed text-slate-600">{L(t.ket)}</p>
                  </motion.div>
                ))}
              </div>

              <p className="mt-8 flex items-start gap-3 rounded-2xl border border-violet-200 bg-violet-50 p-6 text-base leading-relaxed text-violet-900">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-violet-700" />
                {L({
                  id: 'Bila Anda juga menjalani penyinaran, onkolog radiasi ikut dalam pembahasan yang sama sehingga jadwal kemoterapi dan radiasi tidak saling mengganggu.',
                  en: 'If you also undergo radiation, the radiation oncologist joins the same discussion so the chemotherapy and radiation schedules do not disturb each other.',
                })}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 4. ALUR PASIEN (TIMELINE 3 TAHAP) ============ */}
      <section id="alur" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Alur Pasien dari Persiapan sampai Pulang', en: 'Patient Journey from Preparation to Home' })}
          </h2>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Satu siklus berjalan dalam tiga tahap. Yang diulang tiap siklus hanya tanggalnya, bukan pertanyaannya.',
              en: 'One cycle runs in three stages. What repeats each cycle is only the date, not the questions.',
            })}
          </p>

          <div className="relative mt-14">
            {/* Rel: horizontal saat tiga kolom sejajar, vertikal saat bertumpuk. */}
            <div aria-hidden="true" className="absolute left-8 right-8 top-[23px] hidden h-0.5 bg-violet-200 lg:block" />
            <div aria-hidden="true" className="absolute bottom-8 left-[31px] top-[23px] w-0.5 bg-violet-200 lg:hidden" />

            <ol className="relative grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-6">
              {ALUR.map((s, i) => (
                <motion.li
                  key={s.tahap.id}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="flex gap-5 lg:block"
                >
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-violet-100 bg-violet-600 text-xl font-extrabold text-white ring-4 ring-slate-50">
                    {i + 1}
                  </span>
                  <div className="lg:mt-6">
                    <p className="text-sm font-extrabold uppercase tracking-wide text-violet-700">{L(s.tahap)}</p>
                    <h3 className="mt-2 text-2xl font-extrabold leading-snug tracking-tight text-slate-900">{L(s.judul)}</h3>
                    <ul className="mt-5 space-y-3">
                      {s.poin.map((p) => (
                        <li key={p.id} className="flex items-start gap-3">
                          <s.ikon className="mt-1 h-5 w-5 shrink-0 text-violet-600" />
                          <span className="text-base leading-relaxed text-slate-700">{L(p)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ============ 5. PENJAMINAN (2 CARD) ============ */}
      <section id="penjaminan" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Penjaminan Biaya Pengobatan', en: 'Treatment Cost Coverage' })}
          </h2>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Obat kanker adalah biaya terbesar dalam terapi, jadi jalur penjaminan diselesaikan sebelum siklus pertama dimulai, bukan saat obat sudah masuk infus.',
              en: 'Cancer drugs are the biggest cost in treatment, so the coverage path is settled before the first cycle starts, not after the drug is already in the drip.',
            })}
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            {PENJAMINAN.map((p, i) => (
              <motion.article
                key={p.judul.id}
                initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className={`flex flex-col rounded-2xl border border-slate-200 border-l-4 ${p.garis} bg-white p-7 shadow-sm`}
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700">
                    <p.ikon className="h-7 w-7" />
                  </span>
                  <div>
                    <h3 className="text-2xl font-extrabold leading-snug tracking-tight text-slate-900">{L(p.judul)}</h3>
                    <p className="mt-2 inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-bold text-slate-700">{L(p.pill)}</p>
                  </div>
                </div>
                <p className="mt-5 text-lg leading-relaxed text-slate-600">{L(p.ket)}</p>
                <ul className="mt-5 space-y-3">
                  {p.poin.map((pt) => (
                    <li key={pt.id} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                      <span className="text-base leading-relaxed text-slate-700">{L(pt)}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>

          <p className="mt-10 flex items-start gap-3 text-base font-semibold leading-relaxed text-slate-600">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-violet-600" />
            {L({
              id: 'Asuransi swasta umumnya memiliki rider kanker dengan plafon rawat jalan tersendiri. Nilai pertanggungan Anda diverifikasi ke penjamin sebelum obat diracik, dan sisanya disampaikan tertulis bila ada.',
              en: 'Private insurance usually carries a cancer rider with its own outpatient limit. Your coverage amount is verified with the insurer before the drug is compounded, and any remaining balance is put in writing if it exists.',
            })}
          </p>
        </div>
      </section>

      {/* ============ 6. SUPPORTIVE CARE (3 KOLOM) ============ */}
      <section id="supportive" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Supportive Care: Pendampingan Sepanjang Siklus', en: 'Supportive Care Along the Whole Cycle' })}
          </h2>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Tujuan pengobatan kanker bukan hanya menyusutkan tumor, tapi menjaga Anda tetap bisa beraktivitas selama terapi berlangsung. Tiga pilar ini berjalan paralel dengan jadwal infus Anda.',
              en: 'The goal of cancer treatment is not only to shrink the tumour, but to keep you able to live your life while treatment runs. These three pillars move in parallel with your infusion schedule.',
            })}
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {SUPPORTIVE.map((s, i) => (
              <motion.article
                key={s.judul.id}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-violet-100 bg-violet-50 text-violet-700">
                  <s.ikon className="h-10 w-10" />
                </span>
                <h3 className="mt-6 text-2xl font-extrabold leading-snug tracking-tight text-slate-900">{L(s.judul)}</h3>
                <p className="mt-3 text-lg leading-relaxed text-slate-600">{L(s.ket)}</p>
                <ul className="mt-5 space-y-2.5">
                  {s.poin.map((p) => (
                    <li key={p.id} className="flex items-start gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                      <span className="text-base leading-relaxed text-slate-700">{L(p)}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 7. WIDGET UX ============ */}
      <KemoterapiWidgets />
    </div>
  );
};

export default KemoterapiClient;
