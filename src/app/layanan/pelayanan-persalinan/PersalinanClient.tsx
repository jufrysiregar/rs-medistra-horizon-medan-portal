'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Activity,
  Baby,
  BadgeCheck,
  BookOpen,
  Clock,
  Flower2,
  HandHeart,
  Heart,
  Info,
  MapPin,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Sun,
  Syringe,
  Users,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import type { Language } from '../../../types';
import fotoPersalinan from '@/images/hero/fasilitas/persalinan.jpg';
import fotoPersalinanMobile from '@/images/hero/mobile-fasilitas/persalinan.jpg';
import PersalinanWidgets from './PersalinanWidgets';

type Teks = { id: string; en: string };
type Ikon = React.ComponentType<{ className?: string }>;

/* ============================== DATA HALAMAN ============================== */

/** Empat metode persalinan. */
const METODE: { judul: Teks; pill: Teks; ket: Teks; ikon: Ikon }[] = [
  {
    judul: { id: 'Persalinan Normal (Pervaginam)', en: 'Vaginal Birth (Normal)' },
    pill: { id: 'Tanpa intervensi bedah', en: 'No surgical intervention' },
    ket: {
      id: 'Dibimbing bidan dan dokter obgyn siaga, dengan fetal monitor kontinu, posisi bebas, dan pendampingan suami di dalam ruang bersalin. IMD langsung dilakukan begitu bayi lahir.',
      en: 'Guided by a midwife with an obstetrician on standby, continuous fetal monitoring, free positioning and the partner inside the delivery room. Early breastfeeding initiation happens the moment the baby is born.',
    },
    ikon: Heart,
  },
  {
    judul: { id: 'Operasi Sesar ERACS', en: 'ERACS Caesarean' },
    pill: { id: 'Enhanced Recovery After Caesarean Surgery', en: 'Enhanced Recovery After Caesarean Surgery' },
    ket: {
      id: 'Teknik bedah minimal invasif dengan sayatan lebih kecil dan anestesi regional modern. Ibu bisa menggendong bayi dalam 1-2 jam, mobilisasi dalam 6 jam, dan pulang lebih cepat (2-3 hari).',
      en: 'A minimally invasive surgical technique with a smaller incision and modern regional anaesthesia. The mother can hold the baby within 1-2 hours, mobilise within 6 hours and go home sooner (2-3 days).',
    },
    ikon: Sparkles,
  },
  {
    judul: { id: 'Sesar Konvensional', en: 'Conventional Caesarean' },
    pill: { id: 'Indikasi obstetri standar', en: 'Standard obstetric indications' },
    ket: {
      id: 'Untuk kondisi yang membutuhkan pendekatan bedah klasik: bekas operasi sebelumnya, posisi janin tidak normal, gawat janin, atau kembar. Timbedah dan anestesi lengkap siaga.',
      en: 'For conditions requiring a classic surgical approach: previous scar, abnormal fetal position, fetal distress or twins. A full surgical and anaesthesia team is on standby.',
    },
    ikon: Activity,
  },
  {
    judul: { id: 'Persalinan Risiko Tinggi', en: 'High-Risk Delivery' },
    pill: { id: 'Multi-disiplin, terencana', en: 'Multidisciplinary, planned' },
    ket: {
      id: 'Kehamilan dengan preeklampsia, diabetes gestasional, kelainan jantung, plasenta previa, atau bayi dengan prediksi berat lahir ekstrem. Dikelola bersama konsultan fetomaternal, anestesi, dan NICU.',
      en: 'Pregnancies with pre-eclampsia, gestational diabetes, heart disease, placenta previa or extreme birth weight. Managed jointly by a foetal-maternal consultant, anaesthesiologist and the NICU team.',
    },
    ikon: ShieldCheck,
  },
];

/** Tiga fasilitas kamar. */
const KAMAR: { judul: Teks; ket: Teks; poin: Teks[]; ikon: Ikon }[] = [
  {
    judul: { id: 'Ruang Bersalin (VK) Privat', en: 'Private Delivery Room (Labour Ward)' },
    ket: {
      id: 'Satu kamar untuk satu ibu, pencahayaan redup, musik pilihan, dan fetal monitor kontinu tersembunyi agar suasana tetap tenang.',
      en: 'One room for one mother, dim lighting, music of choice, and concealed continuous fetal monitoring to keep the atmosphere calm.',
    },
    poin: [
      { id: 'Kamar VK Personal dengan tempat tidur multifungsi', en: 'Personal VK room with a multifunction bed' },
      { id: 'Fetal monitor kontinu, oksigen sentral, suction', en: 'Continuous fetal monitor, central oxygen, suction' },
      { id: 'Peralatan resusitasi neonatus di setiap kamar', en: 'Neonatal resuscitation equipment in every room' },
    ],
    ikon: Flower2,
  },
  {
    judul: { id: 'Kamar Rawat Inap Rooming-In', en: 'Rooming-In Postnatal Ward' },
    ket: {
      id: 'Bayi tetap bersama ibu 24 jam untuk mendukung keberhasilan ASI eksklusif dan bonding. Tersedia VIP, Kelas 1, 2, dan 3/KRIS.',
      en: 'The baby stays with the mother around the clock to support exclusive breastfeeding and bonding. Available in VIP, Class 1, 2 and 3/KRIS.',
    },
    poin: [
      { id: 'Rawat gabung ibu dan bayi dalam satu kamar', en: 'Mother and baby in one room (rooming-in)' },
      { id: 'Call bell pribadi, kamar mandi dalam', en: 'Private call bell, en-suite bathroom' },
      { id: 'VIP: ruang tunggu keluarga + bathub + meal menu', en: 'VIP: family lounge + bathtub + meal menu choice' },
    ],
    ikon: Baby,
  },
  {
    judul: { id: 'Fasilitas Kenyamanan Pendamping', en: 'Partner Comfort Facilities' },
    ket: {
      id: 'Suami atau keluarga inti boleh mendampingi sejak pembukaan hingga bayi lahir, termasuk di ruang operasi untuk persalinan normal.',
      en: 'A husband or immediate family member may accompany the mother from early labour until birth, including in the operating theatre for vaginal deliveries.',
    },
    poin: [
      { id: 'Sofa lipat + Wi-Fi + Smart TV di kamar VK', en: 'Fold-out sofa + Wi-Fi + Smart TV in VK room' },
      { id: 'Bebas minum dan camilan sehat sepanjang kala I', en: 'Free access to water and healthy snacks during the first stage' },
      { id: 'Dukungan psikologis dari bidan pendamping', en: 'Emotional support from the attending midwife' },
    ],
    ikon: Users,
  },
];

/** Tim medis. */
const TIM: { judul: Teks; ket: Teks; ikon: Ikon }[] = [
  {
    judul: { id: 'Sp.OG', en: 'Sp.OG' },
    ket: {
      id: 'Spesialis kebidanan dan kandungan: memimpin persalinan, menangani komplikasi, dan melakukan operasi bila diperlukan.',
      en: 'Obstetrician and gynaecologist: leads the delivery, manages complications and performs surgery when needed.',
    },
    ikon: Stethoscope,
  },
  {
    judul: { id: 'Sp.A', en: 'Sp.A' },
    ket: {
      id: 'Spesialis anak neonatologi: menilai bayi segera setelah lahir, menangani bayi dengan berat lahir rendah atau gawat napas.',
      en: 'Neonatal paediatrician: assesses the baby right after birth and manages low birth weight or respiratory distress.',
    },
    ikon: Baby,
  },
  {
    judul: { id: 'Sp.An', en: 'Sp.An' },
    ket: {
      id: 'Spesialis anestesiologi: memberi anestesi regional untuk sesar, memasang epidural untuk painless labour, dan memantau keselamatan ibu.',
      en: 'Anaesthesiologist: delivers regional anaesthesia for caesarean, places epidural for painless labour, and watches maternal safety.',
    },
    ikon: Syringe,
  },
  {
    judul: { id: 'Bidan Profesional', en: 'Professional Midwife' },
    ket: {
      id: 'Mendampingi persalinan normal dari pembukaan sampai penjahitan perineum, mengajarkan posisi menyusui, dan memantau nifas harian.',
      en: 'Accompanies vaginal birth from early labour to perineal repair, teaches breastfeeding positions and monitors the postpartum period daily.',
    },
    ikon: HandHeart,
  },
];

/** Penjaminan. */
const PENJAMINAN: {
  judul: Teks; pill: Teks; ket: Teks; poin: Teks[]; garis: string; ikon: Ikon;
}[] = [
  {
    judul: { id: 'BPJS Kesehatan', en: 'BPJS Health Insurance' },
    pill: { id: 'Rujukan + sesuai kelas', en: 'Referral + class entitlement' },
    ket: {
      id: 'Persalinan normal dan sesar dengan indikasi medis dijamin penuh BPJS. Fasilitas kamar diberikan sesuai hak kelas kepesertaan.',
      en: 'Vaginal and medically indicated caesarean deliveries are fully covered by BPJS. The ward room is provided according to the membership class entitlement.',
    },
    poin: [
      { id: 'Surat rujukan FKTP atau kontrol dari poli Kebidanan', en: 'Referral letter from the primary facility or a control from the Obstetrics clinic' },
      { id: 'Kartu BPJS, KTP, dan buku KIA aktif', en: 'BPJS card, ID card and active maternal-child health booklet' },
      { id: 'Fasilitas sesuai kelas kepesertaan (KRIS 1-3)', en: 'Ward class follows the membership tier (KRIS 1-3)' },
    ],
    garis: 'border-l-medical-red',
    ikon: BadgeCheck,
  },
  {
    judul: { id: 'Asuransi Swasta & Umum', en: 'Private Insurance and Self-Pay' },
    pill: { id: 'Paket All-In Transparan', en: 'Transparent All-In Package' },
    ket: {
      id: 'Paket persalinan all-in mencakup: kamar, jasa dokter dan bidan, obat-obatan, tindakan, perawatan bayi, vitamin K1, skrining, dan foto dokumentasi kelahiran.',
      en: 'The all-in maternity package covers: room, doctor and midwife fees, medication, procedure, baby care, vitamin K1, screening and a birth photo set.',
    },
    poin: [
      { id: 'Cashless fast-track dengan pre-authorization diurus unit', en: 'Cashless fast-track with pre-authorisation handled by the unit' },
      { id: 'Rincian paket tertulis sebelum persetujuan ditandatangani', en: 'A written package breakdown before the consent form is signed' },
      { id: 'Tambahan (IMD, foto, akta) tetap transparan tanpa biaya tersembunyi', en: 'Add-ons (early breastfeeding, photo, birth certificate) are transparent with no hidden charges' },
    ],
    garis: 'border-l-rose-600',
    ikon: Info,
  },
];

/** Layanan pendukung. */
const PENDUKUNG: { judul: Teks; ket: Teks; ikon: Ikon }[] = [
  {
    judul: { id: 'IMD (Inisiasi Menyusu Dini)', en: 'Early Initiation of Breastfeeding' },
    ket: { id: 'Bayi diletakkan di dada ibu minimal 1 jam setelah lahir untuk merangsang refleks hisap alami.', en: 'The baby is placed skin-to-skin on the mother for at least 1 hour after birth to stimulate the natural sucking reflex.' },
    ikon: Heart,
  },
  {
    judul: { id: 'Klinik Laktasi', en: 'Lactation Clinic' },
    ket: { id: 'Konseling posisi, pelekatan, dan manajemen ASI oleh konselor laktasi bersertifikat, termasuk untuk ibu bekerja.', en: 'Counselling on position, latch and breast milk management by a certified lactation consultant, including for working mothers.' },
    ikon: Flower2,
  },
  {
    judul: { id: 'Kelas Senam Hamil', en: 'Antenatal Exercise Class' },
    ket: { id: 'Sesi mingguan trimester 2 dan 3: peregangan, pernapasan, dan persiapan mental persalinan bersama bidan.', en: 'Weekly sessions in the second and third trimesters: stretching, breathing and mental birth preparation with a midwife.' },
    ikon: Sun,
  },
  {
    judul: { id: 'Skrining Bayi Baru Lahir', en: 'Newborn Screening' },
    ket: { id: 'Pemeriksaan fisik lengkap, vitamin K1, salep mata, Skrining Hearing (OAE), dan uji saturasi jantung (SHK) sebelum pulang.', en: 'Full physical exam, vitamin K1, eye ointment, hearing screening (OAE) and critical heart disease pulse-ox screening before discharge.' },
    ikon: ScanLine,
  },
  {
    judul: { id: 'Layanan Akta Kelahiran', en: 'Birth Certificate Service' },
    ket: { id: 'Pengurusan surat kelahiran, akta catatan sipil, dan kartu KIA langsung dari rumah sakit tanpa perlu ke kantor Disdukcapil.', en: 'Hospital-based processing of the birth letter, civil registration certificate and child health card without visiting the registry office.' },
    ikon: BookOpen,
  },
];

/* ================================ RENDER ================================ */

const PersalinanClient: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (t: Teks) => t[lang];

  return (
    <div className="bg-white text-slate-800">
      {/* ============ 1. HERO (LATAR PENUH FOTO) ============ */}
      <section className="relative overflow-hidden bg-white pt-24 pb-20 lg:pt-32 lg:pb-28">
        {/* persalinan.jpg dipakai sebagai latar penuh hero. */}
        <div aria-hidden className="absolute inset-0">
          <Image
            src={fotoPersalinanMobile}
            alt=""
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover object-right md:hidden"
          />
          <Image
            src={fotoPersalinan}
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
          <div className="max-w-3xl">
            <h1 className="text-[clamp(2.5rem,5vw,4.25rem)] font-extrabold leading-[1.05] tracking-tight text-slate-900">
              {L({ id: 'Layanan Persalinan & Kesehatan Ibu-Anak', en: 'Maternity & Mother-Child Health Services' })}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
              {L({
                id: 'Kelahiran adalah momen yang tidak terulang. Dengan tim obgyn, bidan, dan neonatolog siaga 24 jam, ruang bersalin privat, serta protokol keselamatan ibu-bayi yang terstandar, Anda bisa fokus pada satu hal: menyambut buah hati dengan tenang.',
                en: 'Birth is a once-in-a-lifetime moment. With a 24-hour team of obstetricians, midwives and neonatologists, a private labour room and a standardised mother-baby safety protocol, you can focus on one thing: welcoming your child with peace of mind.',
              })}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
                <Clock className="h-5 w-5 shrink-0 text-rose-600" />
                {L({ id: 'Siaga 24 jam, 7 hari', en: 'On-call 24/7' })}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
                <MapPin className="h-5 w-5 shrink-0 text-rose-600" />
                {L({ id: 'Lt 6 South Wing · 24 Bed Perinaud & VK', en: 'Level 6 South Wing · 24 Beds Maternity & Labour' })}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
                <ShieldCheck className="h-5 w-5 shrink-0 text-rose-600" />
                {L({ id: 'Fetal monitor + NICU standby', en: 'Fetal monitor + NICU standby' })}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 2. METODE PERSALINAN (4 KOLOM) ============ */}
      <section id="metode" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Empat Metode Persalinan', en: 'Four Delivery Methods' })}
          </h2>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Metode terbaik ditentukan bersama dokter obgyn berdasarkan kondisi ibu dan janin. Setiap jalur punya protokol keselamatan yang sama ketatnya.',
              en: 'The best method is decided together with the obstetrician based on the condition of mother and baby. Every pathway follows the same strict safety protocol.',
            })}
          </p>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {METODE.map((m, i) => (
              <motion.article key={m.judul.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.05 }}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-rose-100 bg-rose-50 text-rose-700">
                  <m.ikon className="h-7 w-7" />
                </span>
                <p className="mt-5 text-xs font-extrabold uppercase tracking-widest text-rose-700">{L(m.pill)}</p>
                <h3 className="mt-2 text-xl font-extrabold leading-snug tracking-tight text-slate-900">{L(m.judul)}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600">{L(m.ket)}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 3. FASILITAS KAMAR (3 KOLOM) ============ */}
      <section id="fasilitas" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Fasilitas Kamar dan Ruang Bersalin', en: 'Ward and Labour Room Facilities' })}
          </h2>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {KAMAR.map((k, i) => (
              <motion.article key={k.judul.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.05 }}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-rose-100 bg-rose-50 text-rose-700">
                  <k.ikon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-900">{L(k.judul)}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600">{L(k.ket)}</p>
                <ul className="mt-5 space-y-2">
                  {k.poin.map((p) => (
                    <li key={p.id} className="flex items-start gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />
                      <span className="text-sm leading-relaxed text-slate-700">{L(p)}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 4. TIM MEDIS & PENJAMINAN (2 KOLOM) ============ */}
      <section id="tim-penjaminan" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Tim Medis & Penjaminan Biaya', en: 'Medical Team and Payment Guarantee' })}
          </h2>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
            {/* KIRI: TIM */}
            <div>
              <h3 className="text-2xl font-extrabold leading-tight tracking-tight text-slate-900">
                {L({ id: 'Siapa yang Mendampingi Anda', en: 'Who Will Be By Your Side' })}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {L({ id: 'Empat peran ini hadir di setiap jadwal persalinan, siaga 24 jam, dan bekerja dalam satu tim keselamatan ibu-bayi.', en: 'These four roles are present at every delivery, on-call 24 hours, and work as one mother-baby safety team.' })}
              </p>
              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {TIM.map((t, i) => (
                  <motion.div key={t.judul.id} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="flex flex-col rounded-2xl border border-slate-200 border-l-4 border-l-rose-500 bg-white p-6 shadow-sm"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-rose-100 bg-rose-50 text-rose-700">
                      <t.ikon className="h-6 w-6" />
                    </span>
                    <p className="mt-4 text-lg font-extrabold leading-snug tracking-tight text-slate-900">{L(t.judul)}</p>
                    <p className="mt-2.5 text-base leading-relaxed text-slate-600">{L(t.ket)}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* KANAN: PENJAMINAN */}
            <div>
              <h3 className="text-2xl font-extrabold leading-tight tracking-tight text-slate-900">
                {L({ id: 'Cara Pembayaran dan Penjaminan', en: 'Payment and Guarantee Options' })}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {L({ id: 'Baik pasien BPJS maupun mandiri, jalur administrasinya jelas dan paket harganya transparan sejak awal.', en: 'For both BPJS and self-pay patients, the administrative path is clear and the package price is transparent from the start.' })}
              </p>
              <div className="mt-8 grid grid-cols-1 gap-6">
                {PENJAMINAN.map((p) => (
                  <motion.article key={p.judul.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
                    className={`flex flex-col rounded-2xl border border-slate-200 border-l-4 ${p.garis} bg-white p-7 shadow-sm`}
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700">
                        <p.ikon className="h-6 w-6" />
                      </span>
                      <div>
                        <h4 className="text-xl font-extrabold leading-snug tracking-tight text-slate-900">{L(p.judul)}</h4>
                        <p className="mt-1.5 inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-700">{L(p.pill)}</p>
                      </div>
                    </div>
                    <p className="mt-5 text-base leading-relaxed text-slate-600">{L(p.ket)}</p>
                    <ul className="mt-5 space-y-2.5">
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
            </div>
          </div>
        </div>
      </section>

      {/* ============ 5. LAYANAN PENDUKUNG (5 KARTU / FLEX-WRAP) ============ */}
      <section id="pendukung" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Layanan Pendukung Ibu & Anak', en: 'Supporting Services for Mother and Child' })}
          </h2>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Lima layanan ini bisa diakses sebelum dan sesudah persalinan tanpa rujukan tambahan. Semuanya terintegrasi dengan rekam medis ibu dan bayi.',
              en: 'These five services are accessible before and after delivery without an additional referral. All are integrated into the mother-and-baby medical record.',
            })}
          </p>
          <div className="mt-12 flex flex-wrap gap-5">
            {PENDUKUNG.map((p, i) => (
              <motion.div key={p.judul.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex min-w-[260px] flex-1 basis-[calc(20%-1rem)] flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-rose-100 bg-rose-50 text-rose-700">
                  <p.ikon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg font-extrabold leading-snug tracking-tight text-slate-900">{L(p.judul)}</h3>
                <p className="mt-2.5 text-base leading-relaxed text-slate-600">{L(p.ket)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 6. WIDGET UX ============ */}
      <PersalinanWidgets />
    </div>
  );
};

export default PersalinanClient;
