'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Baby,
  ChevronDown,
  Clock,
  Heart,
  HeartPulse,
  Milk,
  MapPin,
  Phone,
  Puzzle,
  Scale,
  ShieldAlert,
  ShieldCheck,
  Stethoscope,
  Sun,
  Thermometer,
  Users,
  Wind,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type { Language } from '@/types';
import imgNICU from '@/images/hero/fasilitas/NICU.jpg';
import imgNICUMobile from '@/images/hero/mobile-fasilitas/NICU.jpg';

/** Sepasang teks ID/EN; dipilih dengan [lang] supaya semua data tinggal di satu tempat. */
type Teks = { id: string; en: string };
type Ikon = React.ComponentType<{ className?: string }>;

/* --------------------------------- DATA --------------------------------- */

/** Enam kondisi medis yang ditangani di NICU. */
const INDIKASI: { judul: Teks; ket: Teks; ikon: Ikon }[] = [
  {
    judul: { id: 'Kelahiran Prematur', en: 'Preterm Birth' },
    ket: {
      id: 'Bayi lahir sebelum usia kehamilan 37 minggu memerlukan dukungan tumbuh kembang dan pematangan organ di luar rahim.',
      en: 'Babies born before 37 weeks of gestation need support to grow and mature their organs outside the womb.',
    },
    ikon: Baby,
  },
  {
    judul: { id: 'BBLR & BBLSR', en: 'Low & Very Low Birth Weight' },
    ket: {
      id: 'Berat lahir rendah (di bawah 2.500 gram) atau sangat rendah (di bawah 1.500 gram) butuh pengaturan suhu dan nutrisi terkontrol.',
      en: 'A birth weight below 2,500 g, or very low below 1,500 g, needs controlled temperature and precise nutrition.',
    },
    ikon: Scale,
  },
  {
    judul: { id: 'Gangguan Napas (Asfiksia)', en: 'Breathing Problems (Asphyxia)' },
    ket: {
      id: 'Bayi yang tidak bernapas spontan atau mengalami distres pernapasan segera dibantu dengan resusitasi dan dukungan napas.',
      en: 'Babies not breathing on their own or in respiratory distress are helped at once with resuscitation and breathing support.',
    },
    ikon: Wind,
  },
  {
    judul: { id: 'Kelainan Bawaan', en: 'Congenital Conditions' },
    ket: {
      id: 'Kelainan kongenital yang memerlukan tindakan medis atau bedah segera ditangani bersama bedah anak dan neonatologi.',
      en: 'Congenital conditions needing prompt medical or surgical action are handled together with paediatric surgery and neonatology.',
    },
    ikon: Puzzle,
  },
  {
    judul: { id: 'Hiperbilirubinemia (Kuning)', en: 'Hyperbilirubinaemia (Jaundice)' },
    ket: {
      id: 'Kadar bilirubin tinggi yang berisiko pada otak diturunkan cepat dan aman lewat fototerapi intensif.',
      en: 'High bilirubin levels that risk the brain are lowered quickly and safely through intensive phototherapy.',
    },
    ikon: Sun,
  },
  {
    judul: { id: 'Sepsis Neonatorum', en: 'Neonatal Sepsis' },
    ket: {
      id: 'Infeksi sistemik berat pada bayi baru lahir dipantau dan diobati di ruang isolasi steril.',
      en: 'Severe systemic infection in the newborn is monitored and treated in a sterile isolation room.',
    },
    ikon: ShieldAlert,
  },
];

/** Teknologi & fasilitas unggulan NICU. */
const FASILITAS: { judul: Teks; ket: Teks; ikon: Ikon }[] = [
  {
    judul: { id: 'Inkubator Mikro-Lingkungan', en: 'Micro-Environment Incubator' },
    ket: {
      id: 'Kontrol suhu dan kelembapan otomatis dengan peredam bising untuk meniru lingkungan rahim ibu.',
      en: 'Automatic temperature and humidity control with noise damping that mimics the warmth of the womb.',
    },
    ikon: Thermometer,
  },
  {
    judul: { id: 'Ventilator Neonatus & Bubble CPAP', en: 'Neonatal Ventilator & Bubble CPAP' },
    ket: {
      id: 'Bantuan napas bertekanan rendah yang dirancang halus untuk paru-paru sensitif bayi prematur.',
      en: 'Low-pressure breathing support designed gently for the sensitive lungs of premature babies.',
    },
    ikon: Wind,
  },
  {
    judul: { id: 'Fototerapi Double Blue Light', en: 'Double Blue-Light Phototherapy' },
    ket: {
      id: 'Penanganan cepat dan aman untuk meredakan kadar bilirubin tinggi tanpa menyakiti bayi.',
      en: 'Fast, safe treatment that brings down high bilirubin without hurting the baby.',
    },
    ikon: Sun,
  },
  {
    judul: { id: 'Ruang Isolasi Steril HEPA', en: 'HEPA Sterile Isolation Room' },
    ket: {
      id: 'Sirkulasi udara HEPA bertekanan positif menekan risiko infeksi silang antar bayi.',
      en: 'Positive-pressure HEPA airflow cuts the risk of cross infection between babies.',
    },
    ikon: ShieldCheck,
  },
  {
    judul: { id: 'Bedside Monitor 24 Jam', en: '24-Hour Bedside Monitor' },
    ket: {
      id: 'Pemantauan langsung saturasi oksigen, denyut jantung, tekanan darah, dan laju napas tiap menit.',
      en: 'Live tracking of oxygen saturation, heart rate, blood pressure and breathing rate every minute.',
    },
    ikon: Activity,
  },
];

/** Tim medis yang merawat bayi. */
const TIM: { judul: Teks; ket: Teks; ikon: Ikon }[] = [
  {
    judul: { id: 'Konsultan Neonatologi Sp.A(K)', en: 'Neonatology Consultant Sp.A(K)' },
    ket: {
      id: 'Dokter spesialis anak subspesialis perinatologi yang memimpin seluruh rencana penanganan medis bayi Anda.',
      en: 'A paediatric subspecialist in perinatology who leads the entire medical care plan for your baby.',
    },
    ikon: Stethoscope,
  },
  {
    judul: { id: 'Perawat NICU Tersertifikasi NRP', en: 'NRP-Certified NICU Nurses' },
    ket: {
      id: 'Perawat dengan rasio pendampingan ketat dan sertifikat Resusitasi Neonatus (NRP), bersiaga 24 jam di sisi inkubator.',
      en: 'Nurses with a tight care ratio and Neonatal Resuscitation Program certification, on watch 24 hours at the incubator bedside.',
    },
    ikon: HeartPulse,
  },
  {
    judul: { id: 'Tim Multidisiplin', en: 'Multi-Disciplinary Team' },
    ket: {
      id: 'Dokter bedah anak, konsultan gizi anak, serta tim laboratorium dan radiologi yang siaga mendukung.',
      en: 'Paediatric surgeons, paediatric nutrition consultants, and on-call laboratory and radiology teams.',
    },
    ikon: Users,
  },
];

/** Tiga pilar perawatan berpusat pada keluarga. */
const KELUARGA: { judul: Teks; ket: Teks; ikon: Ikon }[] = [
  {
    judul: { id: 'Metode Kanguru (KMC)', en: 'Kangaroo Mother Care (KMC)' },
    ket: {
      id: 'Kontak kulit-ke-kulit ibu atau ayah dengan bayi untuk menstabilkan detak jantung, suhu tubuh, dan ikatan emosional.',
      en: 'Skin-to-skin contact between parent and baby to steady the heartbeat, body temperature and emotional bond.',
    },
    ikon: Heart,
  },
  {
    judul: { id: 'Manajemen ASI', en: 'Breast-Milk Management' },
    ket: {
      id: 'Pendampingan konselor laktasi membantu ibu memerah dan menyimpan ASI secara steril untuk bayi di NICU.',
      en: 'Lactation counsellors help mothers express and store breast milk in a sterile way for the baby in the NICU.',
    },
    ikon: Milk,
  },
  {
    judul: { id: 'Protokol Sterilisasi', en: 'Sterilisation Protocol' },
    ket: {
      id: 'Kunjungan orang tua kandung diatur lewat prosedur cuci tangan medis dan APD khusus untuk menjaga kesterilan area.',
      en: 'Parent visits are managed through a medical hand-wash procedure and special PPE to keep the area sterile.',
    },
    ikon: ShieldCheck,
  },
];

/** Tujuh pertanyaan FAQ NICU, accordion bersih. */
const FAQ: { q: Teks; a: Teks }[] = [
  {
    q: { id: 'Apakah orang tua diizinkan masuk dan menyentuh bayi di NICU?', en: 'Are parents allowed to enter and touch the baby in the NICU?' },
    a: {
      id: 'Ya. Orang tua kandung diberi akses khusus pada jam yang ditentukan dan sangat dianjurkan hadir. Selama kondisi bayi stabil, ibu atau ayah dapat melakukan Metode Kanguru (kontak kulit ke kulit), membantu menyuapi lewat selang, atau sekadar menggenggam tangan bayi di sisi inkubator dengan pendampingan perawat.',
      en: 'Yes. Biological parents have special access at set hours and are strongly encouraged to be present. While the baby is stable, mother or father can do Kangaroo Care (skin-to-skin), help with tube feeding, or simply hold the baby\'s hand at the incubator bedside with nurse support.',
    },
  },
  {
    q: { id: 'Berapa lama bayi biasanya harus dirawat di NICU?', en: 'How long does a baby usually stay in the NICU?' },
    a: {
      id: 'Sangat bervariasi, tergantung usia kehamilan saat lahir, berat badan, dan kondisi medis. Bayi prematur ringan mungkin hanya hitungan hari, sementara yang sangat prematur atau membutuhkan tindakan bisa berminggu-minggu. Tim rutin memberi pembaruan agar keluarga tahu target perawatan berikutnya.',
      en: 'It varies widely with gestational age at birth, weight and medical condition. A mildly preterm baby may stay only days, while a very preterm or surgical case may stay weeks. The team gives regular updates so the family knows the next care goal.',
    },
  },
  {
    q: { id: 'Bagaimana jika ASI ibu belum keluar atau masih sedikit?', en: 'What if breast milk has not come in or is still very little?' },
    a: {
      id: 'Konselor laktasi mendampingi ibu lewat pemijatan, stimulasi, dan jadwal memerah untuk merangsang produksi. Bila ASI belum cukup, nutrisi awal (misalnya ASI donor tersaring atau susu formula khusus) diberikan sesuai indikasi dan persetujuan orang tua, sambil tetap memperjuangkan ASI ibu.',
      en: 'Lactation counsellors support the mother with massage, stimulation and a pumping schedule to build supply. If milk is not yet sufficient, initial nutrition (such as screened donor milk or a specialist formula) is given per indication and parental consent, while continuing to work toward the mother\'s own milk.',
    },
  },
  {
    q: { id: 'Apakah perawatan NICU ditanggung BPJS Kesehatan atau asuransi?', en: 'Is NICU care covered by BPJS Kesehatan or insurance?' },
    a: {
      id: 'Ya. Layanan NICU dijamin BPJS Kesehatan sesuai indikasi medis dan prosedur rujukan berjenjang, serta didukung puluhan asuransi swasta mitra secara nirsentuh tunai (cashless). Tim admissi membantu menyiapkan berkas sejak awal agar klaim tidak terhambat.',
      en: 'Yes. NICU care is covered by BPJS Kesehatan per medical indication and the stepped referral pathway, and by dozens of partner private insurers on a cashless basis. The admission team helps prepare paperwork early so the claim is not delayed.',
    },
  },
  {
    q: { id: 'Bolehkah keluarga lain seperti kakek-nenek menjenguk bayi?', en: 'Can other family members such as grandparents visit the baby?' },
    a: {
      id: 'Demi kesterilan dan perlindungan bayi, kunjungan dibatasi pada orang tua kandung dengan jumlah dan jam tertentu. Keluarga besar tetap dapat memantau lewat pembaruan rutin perawat dan sesi konsultasi dokter, serta bertemu bayi setelah kondisi membaik dan diizinkan tim.',
      en: 'For sterility and the baby\'s protection, visits are limited to biological parents at set times and numbers. Extended family can still follow progress through regular nurse updates and doctor consultations, and can meet the baby once the condition improves and the team allows it.',
    },
  },
  {
    q: { id: 'Bagaimana prosedur merujuk bayi dari klinik atau rumah sakit lain?', en: 'What is the procedure to refer a baby from another clinic or hospital?' },
    a: {
      id: 'Dokter atau pihak pengirim menghubungi Tim NICU di Ext 152. Setelah verifikasi medis awal, tim memberangkatkan ambulans transport neonatus lengkap dengan inkubator berpemanas, pasokan oksigen, dan perawat terlatih agar bayi tetap stabil sepanjang perjalanan.',
      en: 'The sending doctor or hospital contacts the NICU Team on Ext 152. After an initial medical check, the team dispatches a neonatal transport ambulance fitted with a warmed incubator, oxygen supply and a trained nurse so the baby stays stable through the journey.',
    },
  },
  {
    q: { id: 'Apa yang perlu disiapkan keluarga menjelang bayi pulang?', en: 'What should the family prepare before the baby goes home?' },
    a: {
      id: 'Menjelang kepulangan, tim menjalankan program persiapan pulang: mengajari cara menyuapi, memandikan, memberi obat, mengenali tanda bahaya, serta menjadwalkan kontrol dan imunisasi. Keluarga juga mendapat nomor kontak yang bisa dihubungi bila muncul kekhawatiran di rumah.',
      en: 'Before discharge the team runs a discharge-readiness programme: teaching feeding, bathing, giving medicine and recognising danger signs, and scheduling follow-up and immunisation. Families also receive contact numbers to call if anything worries them at home.',
    },
  },
];

/* --------------------------------- HALAMAN -------------------------------- */

/**
 * HALAMAN NICU (/layanan/nicu) — gaya editorial tenang & premium, Light Theme
 * (putih & slate-50, aksen cyan), satu H1. Enam bagian: hero full-bleed dengan
 * foto sebagai background + scrim asimetris (teks besar rata kiri, selebar UGD),
 * kondisi yang ditangani (grid tiga kolom), teknologi & tim medis,
 * family-centered care, FAQ accordion tujuh butir, lalu penutup kartu kontak
 * premium satu tombol outline. Tidak ada tombol hotline raksasa, ambulans, atau kotak merah.
 */
const NicuClient: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (teks: Teks) => teks[lang];

  const [buka, setBuka] = useState<string | null>(FAQ[0].q.id);

  return (
    <div className="bg-white text-slate-800">
      {/* ============ 1. HERO (FOTO SEBAGAI BACKGROUND) ============ */}
      <section className="relative isolate overflow-hidden bg-white pt-16 pb-12 lg:pt-20 lg:pb-16">
        {/* Foto NICU sebagai latar penuh hero. */}
        <div aria-hidden className="absolute inset-0">
          <Image
            src={imgNICUMobile}
            alt={L({ id: 'Ruang NICU dengan inkubator bayi baru lahir', en: 'NICU room with newborn incubators' })}
            fill
            priority
            sizes="100vw"
            quality={85}
            className="object-cover object-right md:hidden"
          />
          <Image
            src={imgNICU}
            alt={L({ id: 'Ruang NICU dengan inkubator bayi baru lahir', en: 'NICU room with newborn incubators' })}
            fill
            priority
            sizes="100vw"
            quality={85}
            className="hidden object-cover md:block"
          />
        </div>

        {/* Scrim: putih pekat hanya di sisi kiri, kanan bening agar foto terlihat (Light Theme) */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-white from-20% via-white/70 to-transparent to-60%" />

        <div className="relative z-10 mr-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="max-w-3xl">
            <h1 className="text-[clamp(2.4rem,5.2vw,4.25rem)] font-extrabold leading-[1.05] tracking-tight text-slate-900">
              {L({ id: 'Layanan NICU 24 Jam: Perawatan Intensif untuk Buah Hati', en: '24-Hour NICU Care: Intensive Support for Your Little One' })}
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-slate-700 sm:text-2xl">
              {L({
                id: 'Kelahiran yang tak terduga membuat hati orang tua cemas. Di sisi inkubator, bayi Anda dijaga konsultan neonatologi dan perawat bersertifikat sepanjang hari, sementara Anda tetap diberi ruang untuk hadir, menyentuh, dan menyusui sesuai kesiapan.',
                en: 'An unexpected arrival leaves parents anxious. At the incubator bedside your baby is watched around the clock by a neonatology consultant and certified nurses, while you are still given room to be present, to touch, and to breastfeed at your own pace.',
              })}
            </p>
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-5 py-2.5 text-base font-medium text-slate-800 backdrop-blur-sm">
              <Clock className="h-5 w-5 shrink-0 text-cyan-600" />
              {L({ id: 'Buka 24 Jam Nonstop', en: 'Open 24 Hours Nonstop' })}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-5 py-2.5 text-base font-medium text-slate-800 backdrop-blur-sm">
              <ShieldCheck className="h-5 w-5 shrink-0 text-cyan-600" />
              {L({ id: 'Perawatan Intensif Level III', en: 'Level III Intensive Care' })}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-5 py-2.5 text-base font-medium text-slate-800 backdrop-blur-sm">
              <Baby className="h-5 w-5 shrink-0 text-cyan-600" />
              {L({ id: 'Konsultan Neonatologi', en: 'Neonatology Consultant' })}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-5 py-2.5 text-base font-medium text-slate-800 backdrop-blur-sm">
              <MapPin className="h-5 w-5 shrink-0 text-cyan-600" />
              {'Lt 6 North Wing'}
            </span>
          </div>
        </div>
      </section>

      {/* ============= 2. KONDISI YANG DITANGANI (GRID 3 KOLOM) ============= */}
      <section id="kondisi" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Kondisi yang Ditangani di NICU', en: 'Conditions We Treat in the NICU' })}
          </h2>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Unit perawatan khusus tingkat tinggi (Level III) untuk bayi baru lahir (usia 0-28 hari) yang membutuhkan pemantauan tanda vital terus-menerus dan bantuan medis khusus.',
              en: 'A high-level (Level III) special-care unit for newborns (aged 0-28 days) who need continuous vital-sign monitoring and specific medical support.',
            })}
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {INDIKASI.map((it, i) => (
              <motion.article
                key={it.judul.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: 'easeOut' }}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-100 bg-cyan-50 text-cyan-700">
                  <it.ikon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-900">{L(it.judul)}</h3>
                <p className="mt-3 flex-1 text-base leading-relaxed text-slate-600">{L(it.ket)}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 3. TEKNOLOGI & TIM MEDIS (2 KOLOM) ============ */}
      <section id="teknologi" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Teknologi Medis & Tim yang Menjaga Bayi Anda', en: 'Medical Technology and the Team Caring for Your Baby' })}
          </h2>
          <div className="mt-5 h-px w-full bg-slate-200" />

          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-14">
            {/* KIRI: fasilitas */}
            <div>
              <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">
                {L({ id: 'Fasilitas & Teknologi Unggulan', en: 'Advanced Facilities & Technology' })}
              </h3>
              <ul className="mt-8 space-y-4">
                {FASILITAS.map((t, i) => (
                  <motion.li
                    key={t.judul.id}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05, ease: 'easeOut' }}
                    className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-100 bg-cyan-50 text-cyan-700">
                      <t.ikon className="h-6 w-6" />
                    </span>
                    <div>
                      <h4 className="text-lg font-extrabold leading-snug text-slate-900">{L(t.judul)}</h4>
                      <p className="mt-1.5 text-base leading-relaxed text-slate-600">{L(t.ket)}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* KANAN: tim medis */}
            <div>
              <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">
                {L({ id: 'Tim Medis Multidisiplin', en: 'The Expert Care Team' })}
              </h3>
              <div className="mt-8 space-y-5">
                {TIM.map((t, i) => (
                  <motion.article
                    key={t.judul.id}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.42, delay: i * 0.07, ease: 'easeOut' }}
                    className="rounded-2xl border border-slate-200 border-l-4 border-l-cyan-500 bg-white p-6 shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-100 bg-cyan-50 text-cyan-700">
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

      {/* ============ 4. FAMILY-CENTERED CARE (3 KARTU) ============ */}
      <section id="keluarga" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Perawatan Berpusat pada Keluarga', en: 'Family-Centred Care' })}
          </h2>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Kehadiran dan sentuhan keluarga adalah bagian dari penyembuhan. Karena itu orang tua dilibatkan sedini mungkin, dengan aturan kesterilan yang melindungi bayi.',
              en: 'A family presence and touch are part of healing. That is why parents are involved early, within sterility rules that protect the baby.',
            })}
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {KELUARGA.map((d, i) => (
              <motion.div
                key={d.judul.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.42, delay: i * 0.08, ease: 'easeOut' }}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-100 bg-cyan-50 text-cyan-700">
                  <d.ikon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-900">{L(d.judul)}</h3>
                <p className="mt-3 flex-1 text-base leading-relaxed text-slate-600">{L(d.ket)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 5. FAQ (ACCORDION BERSIH) ================= */}
      <section id="faq" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-3xl px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Pertanyaan yang Sering Diajukan', en: 'Frequently Asked Questions' })}
          </h2>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Kami memahami setiap pertanyaan terasa besar saat bayi berada di ruang intensif. Berikut hal-hal yang paling sering ditanyakan keluarga, dengan jawaban yang singkat dan jelas.',
              en: 'We know every question feels big when a baby is in intensive care. Here is what families ask most often, answered briefly and clearly.',
            })}
          </p>

          <div className="mt-10 space-y-3">
            {FAQ.map((f) => {
              const aktif = buka === f.q.id;
              return (
                <div
                  key={f.q.id}
                  className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition-colors ${aktif ? 'border-cyan-200' : 'border-slate-200'}`}
                >
                  <h3>
                    <button
                      type="button"
                      aria-expanded={aktif}
                      onClick={() => setBuka(aktif ? null : f.q.id)}
                      className={`flex w-full items-start justify-between gap-3 px-5 py-4 text-left text-base font-bold leading-snug transition-colors ${
                        aktif ? 'bg-cyan-50 text-cyan-900' : 'bg-white text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      <span>{L(f.q)}</span>
                      <ChevronDown className={`mt-0.5 h-5 w-5 shrink-0 text-cyan-700 transition-transform duration-200 ${aktif ? 'rotate-180' : ''}`} />
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {aktif && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.24, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <p className="border-t border-slate-100 bg-white px-5 py-4 text-base leading-relaxed text-slate-600">
                          {L(f.a)}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= 6. PENUTUP (KARTU KONTAK PREMIUM) ================= */}
      <section id="kontak" className="scroll-mt-28 bg-white pb-24">
        <div className="mx-auto w-full max-w-4xl px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-cyan-50/50 p-8 text-center shadow-sm sm:p-12"
          >
            <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-100/50 blur-3xl" />

            <span className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-100 bg-white text-cyan-700 shadow-sm">
              <Heart className="h-8 w-8" />
            </span>

            <h2 className="relative mt-6 text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl">
              {L({ id: 'Tim Kami Siap Mendampingi Anda', en: 'Our Team Is Ready to Support You' })}
            </h2>

            <p className="relative mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
              {L({
                id: 'Tim Perinatologi kami siap membantu koordinasi rujukan dan ketersediaan unit.',
                en: 'Our perinatology team is ready to help coordinate referrals and unit availability.',
              })}
            </p>

            <a
              href="tel:152"
              className="relative mt-8 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 text-base font-bold text-slate-800 shadow-sm transition-all hover:border-cyan-300 hover:text-cyan-800 hover:shadow-md"
            >
              <Phone className="h-5 w-5 text-cyan-600" />
              {L({ id: 'Hubungi Tim NICU (Ext. 152)', en: 'Contact the NICU Team (Ext. 152)' })}
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default NicuClient;
