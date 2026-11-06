'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Activity,
  Baby,
  BadgeCheck,
  Check,
  ClipboardList,
  Clock,
  Eye,
  HandHeart,
  Heart,
  Info,
  MapPin,
  Pill,
  Route,
  ScanLine,
  Scissors,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Syringe,
  Users,
  Waves,
  Wind,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import type { Language } from '../../../types';
import fotoEndoskopi from '@/images/hero/fasilitas/endoskopi.jpg';
import fotoEndoskopiMobile from '@/images/hero/mobile-fasilitas/endoskopi.jpg';
import EndoskopiWidgets from './EndoskopiWidgets';

/** Sepasang teks ID/EN; dipilih dengan [lang] supaya semua data tinggal di satu tempat. */
type Teks = { id: string; en: string };
type Ikon = React.ComponentType<{ className?: string }>;

/* ------------------------------ DATA HALAMAN ------------------------------ */

/** Enam jalur tindakan endoskopi; semua card pakai kelas yang sama. */
const PROSEDUR: {
  judul: Teks;
  pill: Teks;
  ket: Teks;
  durasi: Teks;
  ikon: Ikon;
}[] = [
  {
    judul: { id: 'Gastroskopi (EGD)', en: 'Gastroscopy (EGD)' },
    pill: { id: 'Saluran cerna atas', en: 'Upper gastrointestinal' },
    ket: {
      id: 'Memeriksa kerongkongan, lambung, dan usus dua belas jari untuk mencari radang, tukak, atau varises.',
      en: 'Examines the oesophagus, stomach and duodenum to find inflammation, ulcers or varices.',
    },
    durasi: { id: '± 10-15 menit', en: 'About 10-15 minutes' },
    ikon: Eye,
  },
  {
    judul: { id: 'Kolonoskopi', en: 'Colonoscopy' },
    pill: { id: 'Usus besar', en: 'Large bowel' },
    ket: {
      id: 'Menelusuri usus besar untuk mencari polip, radang, atau sumber perdarahan; polipektomi bisa dikerjakan pada sesi yang sama.',
      en: 'Traces the large bowel for polyps, inflammation or a bleeding source; polypectomy can be done in the same session.',
    },
    durasi: { id: '± 30-45 menit', en: 'About 30-45 minutes' },
    ikon: ScanLine,
  },
  {
    judul: { id: 'ERCP', en: 'ERCP' },
    pill: { id: 'Saluran empedu & pankreas', en: 'Bile and pancreatic ducts' },
    ket: {
      id: 'Mencari dan membuka sumbatan batu empedu atau penyempitan saluran empedu dengan panduan foto dan fluoroskopi.',
      en: 'Finds and clears gallstones or duct narrowing under imaging and fluoroscopic guidance.',
    },
    durasi: { id: '± 45-90 menit', en: 'About 45-90 minutes' },
    ikon: Route,
  },
  {
    judul: { id: 'Bronkoskopi', en: 'Bronchoscopy' },
    pill: { id: 'Saluran napas', en: 'Airway and lung' },
    ket: {
      id: 'Melihat langsung ke dalam tenggorokan dan cabang paru; diambil sampel untuk infeksi, tumor, atau benda asing.',
      en: 'Looks directly into the throat and airway branches; samples are taken for infection, tumours or foreign bodies.',
    },
    durasi: { id: '± 20-40 menit', en: 'About 20-40 minutes' },
    ikon: Wind,
  },
  {
    judul: { id: 'Endosonografi (EUS)', en: 'Endoscopic Ultrasound (EUS)' },
    pill: { id: 'USG dari dalam tubuh', en: 'Ultrasound from inside' },
    ket: {
      id: 'Menggabungkan endoskop dan probe ultrasound untuk melihat lapisan usus serta organ di sekitarnya secara detail.',
      en: 'Combines an endoscope and an ultrasound probe to show the bowel wall layers and nearby organs in detail.',
    },
    durasi: { id: '± 20-45 menit', en: 'About 20-45 minutes' },
    ikon: Waves,
  },
  {
    judul: { id: 'Kapsul Endoskopi', en: 'Capsule Endoscopy' },
    pill: { id: 'Tanpa selang, tanpa sedasi', en: 'No tube, no sedation' },
    ket: {
      id: 'Pasien menelan kapsul seukuran vitamin yang merekam usus halus selama perjalanan alaminya, lalu keluar bersama BAB.',
      en: 'The patient swallows a vitamin-sized capsule that records the small bowel on its natural journey and then passes out with the stool.',
    },
    durasi: { id: 'Rekam ± 8 jam', en: 'Records for about 8 hours' },
    ikon: Pill,
  },
];

/** Empat pilar keunggulan unit; kartu pertama ditandai `highlight` supaya menonjol. */
const KEUNGGULAN: {
  judul: Teks;
  ket: Teks;
  ikon: Ikon;
  highlight?: boolean;
}[] = [
  {
    judul: { id: 'Painless Endoscopy (Sedasi)', en: 'Painless Endoscopy (Sedation)' },
    ket: {
      id: 'Pasien tidur ringan selama 10-45 menit. Saturasi oksigen, nadi, dan tekanan darah dipantau terus oleh dokter spesialis anestesi. Banyak pasien bangun dan bertanya "sudah selesai?" karena terasa seperti tidur singkat, bukan tindakan.',
      en: 'The patient sleeps lightly for 10-45 minutes. Oxygen saturation, pulse and blood pressure are watched continuously by an anesthesiologist. Many patients wake up and ask "is it already done?" because it feels like a short nap, not a procedure.',
    },
    ikon: Heart,
    highlight: true,
  },
  {
    judul: { id: 'Teknologi NBI (Deteksi Dini)', en: 'NBI Technology (Early Detection)' },
    ket: {
      id: 'Narrow Band Imaging menajamkan pola pembuluh darah di permukaan mukosa, sehingga lesi pra-kanker yang samar dapat terlihat lebih awal, saat pilihan penyembuhannya masih banyak.',
      en: 'Narrow Band Imaging sharpens the vessel pattern on the mucosal surface, so subtle pre-cancer lesions become visible earlier, while treatment choices are still wide.',
    },
    ikon: Sparkles,
  },
  {
    judul: { id: 'Sterilisasi Otomatis AER', en: 'Automated Endoscope Reprocessing (AER)' },
    ket: {
      id: 'Endoskop dicuci dan didisinfeksi oleh mesin tertutup dengan uji kebocoran pada setiap siklus, standar wajib pengendalian infeksi untuk tindakan invasif.',
      en: 'Each endoscope is washed and disinfected by a closed machine with a leak test on every cycle, the mandatory infection-control standard for invasive procedures.',
    },
    ikon: ShieldCheck,
  },
  {
    judul: { id: 'Tindakan Terapeutik Satu Sesi', en: 'Single-Session Therapeutic Action' },
    ket: {
      id: 'Bila temuan membutuhkan penanganan, polip diangkat, varises diikat, atau stent dipasang pada sesi yang sama, sehingga pasien tidak perlu mengulang prosedur dan persiapan dari awal.',
      en: 'When a finding needs treatment, the polyp is removed, varices are banded, or a stent is placed in the same session, so the patient does not repeat the preparation and the procedure.',
    },
    ikon: Scissors,
  },
];

/** Delapan alasan pasien biasanya dirujuk ke unit endoskopi. */
const INDIKASI: Teks[] = [
  { id: 'Maag kronis atau refluks yang tidak membaik dengan obat', en: 'Chronic gastritis or reflux that does not improve with medication' },
  { id: 'Nyeri perut berulang atau perut terasa penuh', en: 'Recurring abdominal pain or a feeling of fullness' },
  { id: 'Buang air besar hitam atau berdarah', en: 'Black or bloody bowel movement' },
  { id: 'Sulit menelan (disfagia) atau terasa tersangkut', en: 'Difficulty swallowing (dysphagia) or food feeling stuck' },
  { id: 'Penurunan berat badan tanpa sebab yang jelas', en: 'Unexplained weight loss' },
  { id: 'Skrining kanker usus untuk usia di atas 45 tahun', en: 'Bowel cancer screening for adults over 45' },
  { id: 'Riwayat polip atau kanker usus pada keluarga dekat', en: 'Family history of bowel polyps or cancer' },
  { id: 'Muntah darah atau tertelan benda asing', en: 'Vomiting blood or swallowing a foreign object' },
];

/** Tiga tahap perjalanan pasien; `durasi` tampil sebagai chip di tiap kartu. */
const ALUR: {
  tahap: Teks;
  judul: Teks;
  durasi: Teks;
  poin: Teks[];
  ikon: Ikon;
}[] = [
  {
    tahap: { id: 'Tahap 1', en: 'Step 1' },
    judul: { id: 'Pra-Tindakan', en: 'Before the Procedure' },
    durasi: { id: 'H-1 sampai hari tindakan', en: 'From the day before to the day of' },
    poin: [
      { id: 'Puasa makanan 6-8 jam; air putih sedikit masih boleh sampai 2 jam sebelum', en: 'No food for 6-8 hours; small sips of water are allowed up to 2 hours before' },
      { id: 'Protokol bowel prep untuk kolonoskopi: cairan pencairan + diet rendah serat H-1', en: 'Bowel prep for colonoscopy: clearing fluid and a low-fibre diet the day before' },
      { id: 'Evaluasi obat pengencer darah, diabetes, dan alergi bersama dokter penanggung jawab', en: 'Review of blood thinners, diabetes drugs and allergies with the doctor in charge' },
      { id: 'Konseling anestesi singkat dan tanda tangan persetujuan tindakan', en: 'A short anaesthesia counselling and the procedure consent form' },
    ],
    ikon: ClipboardList,
  },
  {
    tahap: { id: 'Tahap 2', en: 'Step 2' },
    judul: { id: 'Intra-Tindakan', en: 'During the Procedure' },
    durasi: { id: '± 15-45 menit (tergantung jenis)', en: 'About 15-45 minutes, depending on the type' },
    poin: [
      { id: 'Sedasi diberikan oleh dokter spesialis anestesi, bukan perawat', en: 'Sedation is delivered by an anesthesiologist, not a nurse' },
      { id: 'Posisi miring ke kiri; monitor EKG, nadi, tensi, dan saturasi menyala terus', en: 'Left-side position; ECG, pulse, blood pressure and saturation monitors stay on' },
      { id: 'Endoskop dimasukkan; foto dan video direkam untuk dokumentasi dan pembacaan ulang', en: 'The endoscope is inserted; photos and video are recorded for documentation and re-reading' },
      { id: 'Bila ada temuan: biopsi, polipektomi, ligasi varises, atau pemasangan stent langsung dikerjakan', en: 'If a finding appears: biopsy, polypectomy, variceal ligation or stent placement is done right away' },
    ],
    ikon: Activity,
  },
  {
    tahap: { id: 'Tahap 3', en: 'Step 3' },
    judul: { id: 'Pasca-Tindakan', en: 'After the Procedure' },
    durasi: { id: '± 30-60 menit pemulihan', en: 'About 30-60 minutes of recovery' },
    poin: [
      { id: 'Recovery room: tanda vital dipantau sampai efek sedasi benar-benar habis', en: 'Recovery room: vital signs watched until the sedation has fully worn off' },
      { id: 'Dokter menjelaskan hasil visual langsung, ditemani keluarga yang mengantar', en: 'The doctor explains the visual result immediately, together with the family who came along' },
      { id: 'Hasil patologi anatomi biopsi biasanya keluar 3-7 hari kerja, dikirim lewat aplikasi atau kontrol', en: 'Biopsy pathology results usually arrive in 3-7 working days, shared through the app or at follow-up' },
      { id: 'Konsep one day care: pasien pulang di hari yang sama dengan instruksi tertulis', en: 'One-day-care concept: the patient goes home the same day with written instructions' },
    ],
    ikon: HandHeart,
  },
];

/** Lima peran di tim endoskopi. */
const TIM_MEDIS: { judul: Teks; ket: Teks; ikon: Ikon }[] = [
  {
    judul: { id: 'Sp.PD-KGEH', en: 'Sp.PD-KGEH' },
    ket: {
      id: 'Konsultan gastroentero-hepatologi: memimpin pembacaan, memutuskan kapan endoskopi perlu, dan menangani temuan kompleks seperti varises atau striktur.',
      en: 'Gastroentero-hepatology consultant: leads the reading, decides when endoscopy is needed and manages complex findings such as varices or strictures.',
    },
    ikon: Stethoscope,
  },
  {
    judul: { id: 'Sp.P', en: 'Sp.P' },
    ket: {
      id: 'Spesialis pulmonologi yang mengerjakan bronkoskopi, termasuk pengambilan sampel jaringan paru dan pembersihan lendir jalan napas.',
      en: 'Pulmonologist performing bronchoscopy, including lung tissue sampling and airway mucus clearance.',
    },
    ikon: Wind,
  },
  {
    judul: { id: 'Sp.A-K', en: 'Sp.A-K' },
    ket: {
      id: 'Konsultan gastroenterologi anak: menyesuaikan ukuran endoskop, dosis sedasi, dan bahasa penjelasan untuk pasien anak dan remaja.',
      en: 'Paediatric gastroenterology consultant: adapts the endoscope size, sedation dose and explanation wording for children and adolescents.',
    },
    ikon: Baby,
  },
  {
    judul: { id: 'Sp.An', en: 'Sp.An' },
    ket: {
      id: 'Spesialis anestesiologi: menilai risiko sedasi sebelum tindakan, memberi obat, dan memantau napas serta sirkulasi sepanjang prosedur berlangsung.',
      en: 'Anaesthesiologist: assesses sedation risk before the procedure, delivers the drugs and watches breathing and circulation throughout.',
    },
    ikon: Syringe,
  },
  {
    judul: { id: 'Perawat Mahir Endoskopi', en: 'Trained Endoscopy Nurse' },
    ket: {
      id: 'Perawat yang terlatih memasang jalur infus, menyiapkan alat terapeutik, mendampingi pemulihan, dan mensterilkan endoskop sesuai SOP AER.',
      en: 'Nurses trained to place the IV line, set up therapeutic tools, accompany recovery and reprocess endoscopes to the AER standard.',
    },
    ikon: Users,
  },
];

/** Dua jalur penjaminan; garis kiri dibedakan warna. */
const PENJAMINAN: {
  judul: Teks;
  pill: Teks;
  ket: Teks;
  poin: Teks[];
  garis: string;
  ikon: Ikon;
}[] = [
  {
    judul: { id: 'BPJS Kesehatan', en: 'BPJS Health Insurance' },
    pill: { id: 'Rujukan berjenjang', en: 'Referral on medical indication' },
    ket: {
      id: 'Endoskopi dijamin BPJS bila ada indikasi medis yang tercatat di rekam. Pasien datang lewat jalur rujukan berjenjang dari FKTP atau dokter penanggung jawab.',
      en: 'Endoscopy is covered by BPJS when a medical indication is recorded in the chart. Patients arrive through the standard referral chain from the primary facility or the doctor in charge.',
    },
    poin: [
      { id: 'Surat rujukan FKTP atau surat perintah dari dokter spesialis penanggung jawab', en: 'Referral letter from the primary facility or an order from the specialist in charge' },
      { id: 'Kartu BPJS, KTP, dan surat kontrol aktif saat pendaftaran', en: 'BPJS card, ID card and an active control letter at registration' },
      { id: 'Indikasi medis harus tercatat di rekam medis sebelum jadwal ditetapkan', en: 'The medical indication must be in the medical record before a date is set' },
    ],
    garis: 'border-l-medical-red',
    ikon: BadgeCheck,
  },
  {
    judul: { id: 'Asuransi Swasta & Umum', en: 'Private Insurance and Self-Pay' },
    pill: { id: 'Cashless + Paket Transparan', en: 'Cashless plus transparent packages' },
    ket: {
      id: 'Kerja sama cashless fast-track dengan asuransi utama. Untuk pasien umum, paket harga per jenis tindakan disampaikan terbuka sebelum persetujuan ditandatangani.',
      en: 'Cashless fast-track cooperation with major insurers. For self-pay patients, the per-procedure package price is shared openly before the consent form is signed.',
    },
    poin: [
      { id: 'Pre-authorization asuransi diurus unit, pasien tidak bolak-balik ke kantor', en: 'Insurance pre-authorisation is handled by the unit so the patient does not travel back and forth' },
      { id: 'Paket transparan: sudah termasuk sedasi, alat, pemeriksaan patologi anatomi dasar', en: 'Transparent package: covers sedation, equipment and baseline pathology testing' },
      { id: 'Rincian biaya diberikan tertulis sebelum persetujuan tindakan ditandatangani', en: 'A written cost breakdown is given before the consent form is signed' },
    ],
    garis: 'border-l-indigo-600',
    ikon: Info,
  },
];

/* --------------------------------- JSX --------------------------------- */

/**
 * HALAMAN ENDOSKOPI — lima bagian pertama: hero split 50:50, enam jenis prosedur,
 * keunggulan & indikasi, alur pasien tiga tahap, tim medis & penjaminan. Aksen warna
 * halaman ini indigo, supaya berbeda dari hemodialisa (teal) dan ICU (cyan).
 */
const EndoskopiClient: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (teks: Teks) => teks[lang];

  return (
    <div className="bg-white text-slate-800">
      {/* ================= 1. HERO (LATAR BELAKANG FOTO) ================= */}
      <section className="relative overflow-hidden bg-white pt-12 pb-16 lg:pt-16 lg:pb-20">
        <div aria-hidden className="absolute inset-0">
          <Image src={fotoEndoskopiMobile} alt="" fill priority sizes="100vw" quality={90} className="object-cover object-right md:hidden" />
                    <Image src={fotoEndoskopi} alt="" fill priority sizes="100vw" quality={90} className="hidden object-cover md:block" />
        </div>
        {/* Scrim: putih pekat hanya di sisi kiri (sampai ±45%), kanan 100% bening. */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-white from-20% via-white/70 to-transparent to-60%" />

        <div className="relative z-10 mr-auto w-full max-w-7xl px-6 lg:px-12">
          <div>
            <h1 className="text-[clamp(2rem,4vw,2.9rem)] font-extrabold leading-[1.1] tracking-tight text-slate-900">
              {L({ id: 'Pusat Endoskopi & Diagnosis Saluran Cerna', en: 'Endoscopy and Gastrointestinal Diagnosis Center' })}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-700 sm:text-xl">
              {L({
                id: 'Endoskopi bukan lagi pengalaman yang ditakuti. Dengan sedasi terpantau, video endoskop resolusi tinggi, dan satu sesi yang bisa langsung mengangani temuan, sebagian besar pasien pulang di hari yang sama dan kembali beraktivitas keesokan harinya.',
                en: 'Endoscopy is no longer an experience to fear. With monitored sedation, high-definition video endoscopes and one session that can already treat a finding, most patients go home the same day and return to normal activity the next morning.',
              })}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-4 py-2 text-base font-semibold text-slate-700 backdrop-blur-sm">
                <MapPin className="h-5 w-5 shrink-0 text-indigo-600" />
                {L({ id: 'Lt 2 · Endoscopy Suite', en: 'Level 2 · Endoscopy Suite' })}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-4 py-2 text-base font-semibold text-slate-700 backdrop-blur-sm">
                <Clock className="h-5 w-5 shrink-0 text-indigo-600" />
                {L({ id: 'Senin-Jumat 07.30-15.30 + darurat', en: 'Mon-Fri 07:30-15:30 plus emergency' })}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-4 py-2 text-base font-semibold text-slate-700 backdrop-blur-sm">
                <ShieldCheck className="h-5 w-5 shrink-0 text-indigo-600" />
                {L({ id: 'Sedasi dipantau Sp.An', en: 'Sedation led by an anaesthesiologist' })}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. JENIS PROSEDUR (6 KARTU / 3 KOLOM) ================= */}
      <section id="prosedur" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Enam Jalur Prosedur Endoskopi', en: 'Six Endoscopy Pathways' })}
          </h2>
          <div className="mt-5 h-px w-full bg-slate-200" />

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Setiap jalur punya persiapan dan durasi sendiri. Dokter penanggung jawab yang akan menentukan mana yang paling tepat untuk keluhan Anda; halaman ini memberi gambaran supaya keluarga siap lebih dulu.',
              en: 'Each pathway has its own preparation and duration. The doctor in charge decides which one fits your complaint; this page gives the family a head start on what to expect.',
            })}
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROSEDUR.map((p, i) => (
              <motion.article
                key={p.judul.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-indigo-100 bg-indigo-50 text-indigo-700">
                  <p.ikon className="h-7 w-7" />
                </span>
                <p className="mt-5 text-xs font-extrabold uppercase tracking-widest text-indigo-700">
                  {L(p.pill)}
                </p>
                <h3 className="mt-2 text-xl font-extrabold leading-snug tracking-tight text-slate-900">
                  {L(p.judul)}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600">{L(p.ket)}</p>
                <p className="mt-auto pt-5 text-sm font-bold text-slate-700">
                  <Clock className="mr-1.5 inline h-4 w-4 -translate-y-0.5 text-indigo-600" />
                  {L(p.durasi)}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 3. KEUNGGULAN & INDIKASI (2 KOLOM) ================= */}
      <section id="keunggulan" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Keunggulan Unit & Siapa yang Perlu Periksa', en: 'Unit Strengths and Who Should Be Screened' })}
          </h2>
          <div className="mt-5 h-px w-full bg-slate-200" />

          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
            {/* ---------- KOLOM KIRI: 4 KEUNGGULAN, PAINLINE DITONJOLKAN ---------- */}
            <div className="space-y-5">
              {KEUNGGULAN.map((k, i) =>
                k.highlight ? (
                  <motion.div
                    key={k.judul.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="flex gap-5 rounded-2xl border-2 border-indigo-300 bg-indigo-50 p-7 shadow-sm"
                  >
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-indigo-700 shadow-sm">
                      <k.ikon className="h-7 w-7" />
                    </span>
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-widest text-indigo-700">
                        {L({ id: 'Unggulan', en: 'Signature' })}
                      </p>
                      <h3 className="mt-1.5 text-xl font-extrabold leading-snug tracking-tight text-slate-900">
                        {L(k.judul)}
                      </h3>
                      <p className="mt-3 text-base leading-relaxed text-slate-700">{L(k.ket)}</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={k.judul.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-indigo-100 bg-indigo-50 text-indigo-700">
                      <k.ikon className="h-7 w-7" />
                    </span>
                    <div>
                      <h3 className="text-xl font-extrabold leading-snug tracking-tight text-slate-900">
                        {L(k.judul)}
                      </h3>
                      <p className="mt-3 text-base leading-relaxed text-slate-600">{L(k.ket)}</p>
                    </div>
                  </motion.div>
                ),
              )}
            </div>

            {/* ---------- KOLOM KANAN: DAFTAR INDIKASI DENGAN IKON CENTANG ---------- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm"
            >
              <h3 className="text-2xl font-extrabold leading-tight tracking-tight text-slate-900">
                {L({ id: 'Indikasi Medis Umum', en: 'Common Medical Indications' })}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {L({
                  id: 'Bila satu atau lebih keadaan di bawah ini Anda rasakan, dokter umum atau spesialis biasanya akan menyarankan pemeriksaan endoskopi.',
                  en: 'If you notice one or more of the situations below, a general practitioner or specialist will usually recommend an endoscopic examination.',
                })}
              </p>
              <ul className="mt-7 space-y-3.5">
                {INDIKASI.map((t) => (
                  <li key={t.id} className="flex items-start gap-3">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                      <Check className="h-4 w-4" strokeWidth={3} />
                    </span>
                    <span className="text-lg leading-snug text-slate-800">{L(t)}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= 4. ALUR PASIEN (TIMELINE 3 TAHAP) ================= */}
      <section id="alur" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Alur Pasien: Dari Persiapan Sampai Pulang', en: 'Patient Journey: From Preparation to Going Home' })}
          </h2>
          <div className="mt-5 h-px w-full bg-slate-200" />

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Tiga tahap ini yang akan dilalui. Tidak ada yang dibuat mendadak; keluarga selalu diberi tahu sebelum setiap langkah dimulai.',
              en: 'These are the three steps you will go through. Nothing is done abruptly; the family is informed before every step begins.',
            })}
          </p>

          <div className="relative mt-14">
            {/* garis penghubung hanya di layar besar */}
            <div className="absolute left-0 right-0 top-7 hidden h-px bg-slate-200 lg:block" aria-hidden="true" />

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-8">
              {ALUR.map((a, i) => (
                <motion.div
                  key={a.tahap.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="relative"
                >
                  {/* Lingkaran angka tahap, menempel di garis */}
                  <div className="relative z-10 -mt-2 mb-6 flex h-14 w-14 items-center justify-center rounded-full border-4 border-slate-50 bg-indigo-600 text-lg font-extrabold text-white shadow-md">
                    {i + 1}
                  </div>
                  <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-700">
                        <a.ikon className="h-6 w-6" />
                      </span>
                      <div>
                        <p className="text-xs font-extrabold uppercase tracking-widest text-indigo-700">
                          {L(a.tahap)}
                        </p>
                        <h3 className="text-xl font-extrabold leading-snug tracking-tight text-slate-900">
                          {L(a.judul)}
                        </h3>
                      </div>
                    </div>
                    <p className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-bold text-slate-700">
                      <Clock className="h-4 w-4 text-indigo-600" />
                      {L(a.durasi)}
                    </p>
                    <ul className="mt-5 space-y-2.5">
                      {a.poin.map((p) => (
                        <li key={p.id} className="flex items-start gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                          <span className="text-base leading-relaxed text-slate-600">{L(p)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= 5. TIM MEDIS & PENJAMINAN (2 KOLOM) ================= */}
      <section id="tim-penjaminan" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Tim Medis & Penjaminan Biaya', en: 'Medical Team and Payment Guarantee' })}
          </h2>
          <div className="mt-5 h-px w-full bg-slate-200" />

          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
            {/* ---------- KOLOM KIRI: TIM MEDIS ---------- */}
            <div>
              <h3 className="text-2xl font-extrabold leading-tight tracking-tight text-slate-900">
                {L({ id: 'Siapa yang Menemani Anda di Ruang Tindakan', en: 'Who Will Be With You in the Procedure Room' })}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {L({
                  id: 'Endoskopi bukan kerja satu orang. Lima peran ini hadir di setiap jadwal tindakan, dan Anda boleh bertanya pada siapa pun sebelum persetujuan ditandatangani.',
                  en: 'Endoscopy is not one person at work. These five roles are on every procedure schedule, and you may ask any of them before signing the consent form.',
                })}
              </p>

              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {TIM_MEDIS.map((t, i) => (
                  <motion.div
                    key={t.judul.id}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className={`flex h-full flex-col rounded-2xl border border-slate-200 border-l-4 ${i === 0 ? 'border-l-indigo-600' : 'border-l-indigo-400'} bg-white p-6 shadow-sm`}
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-700">
                      <t.ikon className="h-6 w-6" />
                    </span>
                    <p className="mt-4 text-lg font-extrabold leading-snug tracking-tight text-slate-900">
                      {L(t.judul)}
                    </p>
                    <p className="mt-2.5 text-base leading-relaxed text-slate-600">{L(t.ket)}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ---------- KOLOM KANAN: DUA KARTU PENJAMINAN ---------- */}
            <div>
              <h3 className="text-2xl font-extrabold leading-tight tracking-tight text-slate-900">
                {L({ id: 'Cara Pembayaran dan Penjaminan', en: 'How Payment and Guarantee Work' })}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {L({
                  id: 'Baik pasien BPJS maupun pasien mandiri, jalur administrasinya jelas. Yang membedakan hanya dokumen yang perlu dibawa saat pendaftaran.',
                  en: 'For both BPJS and self-pay patients, the administrative path is clear. The only difference is which documents to bring at registration.',
                })}
              </p>

              <div className="mt-8 grid grid-cols-1 gap-6">
                {PENJAMINAN.map((p) => (
                  <motion.article
                    key={p.judul.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className={`flex h-full flex-col rounded-2xl border border-slate-200 border-l-4 ${p.garis} bg-white p-7 shadow-sm`}
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700">
                        <p.ikon className="h-6 w-6" />
                      </span>
                      <div>
                        <h4 className="text-xl font-extrabold leading-snug tracking-tight text-slate-900">
                          {L(p.judul)}
                        </h4>
                        <p className="mt-1.5 inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-700">
                          {L(p.pill)}
                        </p>
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

      {/* ================= 6. WIDGET UX (PANDUAN, BOOKING, FAQ) ================= */}
      <EndoskopiWidgets />
    </div>
  );
};

export default EndoskopiClient;
