'use client';

import React from 'react';
import Image from 'next/image';
import {
  BadgeCheck,
  Baby,
  CalendarCheck,
  Camera,
  Check,
  ClipboardList,
  Clock,
  FlaskConical,
  HeartPulse,
  Lock,
  MapPin,
  ScanLine,
  Scissors,
  ShieldCheck,
  ShieldPlus,
  ThermometerSnowflake,
  Wind,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import { useUIModal } from '../../../context/UIModalContext';
import fotoOR from '@/images/hero/fasilitas/OR-1.jpg';
import fotoORMobile from '@/images/hero/mobile-fasilitas/OR-1.jpg';
import RuangOperasiWidgets from './RuangOperasiWidgets';
import type { Language } from '../../../types';

/** Sepasang teks ID/EN; dipilih dengan [lang] supaya semua data tinggal di satu tempat. */
type Teks = { id: string; en: string };

/** Tipe ikon Lucide yang dipakai di kartu, cukup className. */
type Ikon = React.ComponentType<{ className?: string }>;

/* --------------------------------- DATA --------------------------------- */

/** Empat jenis kamar bedah sesuai permintaan keluarga dan jenis tindakannya. */
const KAMAR: { judul: Teks; label: Teks; ket: Teks; poin: Teks[]; ikon: Ikon }[] = [
  {
    judul: { id: 'Modular Operating Theater', en: 'Modular Operating Theater' },
    label: { id: 'MOT · HEPA Steril', en: 'MOT · HEPA Sterile' },
    ket: {
      id: 'Kamar modular berdinding panel dengan aliran udara Laminar berfilter HEPA. Tekanan positif menjaga udara kotor tidak pernah masuk ke area steril.',
      en: 'A modular panel-room theatre with laminar airflow through HEPA filters. Positive pressure keeps unfiltered air out of the sterile field.',
    },
    poin: [
      { id: 'Filter HEPA H13 & pressure differential termonitor', en: 'H13 HEPA filter & monitored pressure differential' },
      { id: 'Permukaan non-porus, mudah dekontaminasi', en: 'Non-porous surfaces, easy decontamination' },
      { id: 'Cocok untuk implan & bedah jangka panjang', en: 'Suited for implants & long procedures' },
    ],
    ikon: Wind,
  },
  {
    judul: { id: 'Kamar Bedah Mayor', en: 'Major Theatre' },
    label: { id: 'Operasi Besar', en: 'Major Surgery' },
    ket: {
      id: 'Kamar terbesar dengan meja multi-fungsi, lampu bedah bayangan rendah, dan perangkat C-Arm untuk tindakan saraf serta ortopedi.',
      en: 'The largest room with a multifunction table, shadow-free light, and a C-arm unit for neurosurgery and orthopaedic work.',
    },
    poin: [
      { id: 'Bedah saraf, tumor, dan tulang belakang', en: 'Neurosurgery, tumour & spine' },
      { id: 'Rekonstruksi sendi & osteosintesis', en: 'Joint replacement & osteosynthesis' },
      { id: 'Monitor invasif & defibrilator siap pakai', en: 'Invasive monitoring & defibrillator ready' },
    ],
    ikon: Scissors,
  },
  {
    judul: { id: 'Kamar Bedah Minor / Day Surgery', en: 'Minor Theatre / Day Surgery' },
    label: { id: 'Pulang Hari Sama', en: 'Same-Day Discharge' },
    ket: {
      id: 'Tindakan ringan dengan bius lokal atau sedasi: pasien dipulangkan pada hari yang sama setelah stabil di ruang pemulihan.',
      en: 'Minor procedures under local or sedation anaesthesia: the patient goes home the same day once stable in recovery.',
    },
    poin: [
      { id: 'Katarak, varises, biopsi, kista & lipoma', en: 'Cataract, varicose, biopsy, cyst & lipoma' },
      { id: 'Observasi 2-4 jam, keluarga diberi surat pulang', en: 'Two to four hours of observation with a discharge letter' },
      { id: 'Kontrol luka via konsultasi daring', en: 'Wound check through online consultation' },
    ],
    ikon: CalendarCheck,
  },
  {
    judul: { id: 'Kamar Bedah Khusus Kebidanan', en: 'Dedicated Obstetric Theatre' },
    label: { id: 'Cito Obgyn · 24 Jam', en: 'Cito Obgyn · 24 Hours' },
    ket: {
      id: 'Kamar siaga untuk sectio caesarea darurat dan kasus kebidanan berdarah, bersebelahan dengan ruang bersalin dan bank darah.',
      en: 'A standby room for emergency caesarean sections and obstetric bleeding, next to the delivery unit and the blood bank.',
    },
    poin: [
      { id: 'Decision-to-incision di bawah 30 menit', en: 'Decision-to-incision under 30 minutes' },
      { id: 'Meja ginekologi & alat fetoskop siap pakai', en: 'Gynaecological table & fetoscope ready' },
      { id: 'Tim neonatologi mendampingi kelahiran', en: 'Neonatology team attends the birth' },
    ],
    ikon: Baby,
  },
];

/** Enam lingkup spesialisasi bedah yang ditangani instalasi bedah sentral. */
const SPESIALISASI: { judul: Teks; ket: Teks }[] = [
  {
    judul: { id: 'Bedah Umum & Digestif', en: 'General & Digestive Surgery' },
    ket: { id: 'Usus buntu, hernia, empedu, lambung, tiroid', en: 'Appendix, hernia, gallbladder, stomach, thyroid' },
  },
  {
    judul: { id: 'Bedah Orthopedi', en: 'Orthopaedic Surgery' },
    ket: { id: 'Patah tulang, sendi, cedera olahraga, tulang belakang', en: 'Fractures, joints, sports injury, spine' },
  },
  {
    judul: { id: 'Bedah Saraf', en: 'Neurosurgery' },
    ket: { id: 'Tumor otak, stroke perdarahan, saraf terjepit', en: 'Brain tumour, haemorrhagic stroke, pinched nerve' },
  },
  {
    judul: { id: 'Bedah Urologi', en: 'Urological Surgery' },
    ket: { id: 'Batu saluran kemih, prostat, kantung kemih', en: 'Urinary stones, prostate, bladder' },
  },
  {
    judul: { id: 'Bedah Mata & THT', en: 'Eye & ENT Surgery' },
    ket: { id: 'Katarak fako, retina, sinus, amandel, kepala-leher', en: 'Phaco cataract, retina, sinus, tonsil, head-neck' },
  },
  {
    judul: { id: 'Bedah Anak & Vaskular', en: 'Paediatric & Vascular Surgery' },
    ket: { id: 'Kelahiran bawaan pada anak, varises, pembuluh darah', en: 'Paediatric congenital conditions, varicose veins, vessels' },
  },
];

/** Tiga teknologi yang paling menentukan hasil operasi. */
const TEKNOLOGI: { judul: Teks; ket: Teks; poin: Teks[]; ikon: Ikon }[] = [
  {
    judul: { id: 'Laparoskopi Full HD', en: 'Full-HD Laparoscopy' },
    ket: {
      id: 'Operasi lewat lubang 5-10 mm dengan kamera bersudut, sehingga nyeri luka dan lama rawat turun drastis.',
      en: 'Surgery through 5-10 mm ports with an angled camera, sharply reducing wound pain and length of stay.',
    },
    poin: [
      { id: 'Insuflator tekanan otomatis', en: 'Automatic pressure insufflator' },
      { id: 'Monitor 4K di tiap kamar', en: '4K monitor in every theatre' },
    ],
    ikon: Camera,
  },
  {
    judul: { id: 'C-Arm Fluoroskopi', en: 'C-Arm Fluoroscopy' },
    ket: {
      id: 'Citra rontgen waktu nyata untuk memasang pen tulang dan memastikan posisi implan tanpa membuka area luas.',
      en: 'Real-time X-ray imaging to place bone hardware and confirm implant position without a wide open approach.',
    },
    poin: [
      { id: 'Penanganan kasus ortopedi & saraf', en: 'Handles orthopaedic & spine cases' },
      { id: 'Dosis radiasi tercatat per tindakan', en: 'Radiation dose logged per procedure' },
    ],
    ikon: ScanLine,
  },
  {
    judul: { id: 'Anestesi Hemodinamik', en: 'Haemodynamic Anaesthesia' },
    ket: {
      id: 'Pemantauan tekanan darah invasif, EKG, kapnografi, dan suhu sepanjang tindakan oleh dokter spesialis anestesiologi.',
      en: 'Invasive blood pressure, ECG, capnography and temperature watched throughout the case by an anaesthesiologist.',
    },
    poin: [
      { id: 'Bius umum, regional, dan sedasi', en: 'General, regional and sedation anaesthesia' },
      { id: 'Ventilator & USG panduan blok saraf', en: 'Ventilator & ultrasound-guided nerve blocks' },
    ],
    ikon: HeartPulse,
  },
];

/** Alur pasien tiga tahap: pra, intra, dan pasca bedah. */
const ALUR: { tahap: Teks; waktu: Teks; ikon: Ikon; langkah: Teks[] }[] = [
  {
    tahap: { id: 'Tahap 1, Pra-Bedah', en: 'Stage 1, Pre-operative' },
    waktu: { id: 'H-7 s.d. hari tindakan', en: '7 days before until the day of surgery' },
    ikon: ClipboardList,
    langkah: [
      { id: 'Pemeriksaan laboratorium dan rontgen dada', en: 'Laboratory work and chest X-ray' },
      { id: 'Skrining anestesi oleh dokter spesialis anestesiologi', en: 'Anaesthesia screening by an anaesthesiologist' },
      { id: 'Edukasi puasa: makanan padat 6 jam, cairan bening 2 jam', en: 'Fasting education: 6 hours for solids, 2 hours for clear fluids' },
      { id: 'Verifikasi berkas penjaminan dan persetujuan tindakan', en: 'Guarantee file and consent verification' },
    ],
  },
  {
    tahap: { id: 'Tahap 2, Intra-Bedah', en: 'Stage 2, Intra-operative' },
    waktu: { id: 'Di dalam kamar operasi', en: 'Inside the theatre' },
    ikon: Scissors,
    langkah: [
      { id: 'Orientasi: identitas, situs, dan prosedur dikonfirmasi keras-keras', en: 'Orientation: identity, site and procedure confirmed out loud' },
      { id: 'Induksi anestesi dan pemasangan monitor lengkap', en: 'Anaesthesia induction and full monitoring' },
      { id: 'Pelaksanaan operasi oleh DPJP bersama tim bedah', en: 'The operation performed by the surgeon and team' },
      { id: 'Hitung instrumen, kasa, dan label spesimen', en: 'Instrument, swab count and specimen labelling' },
    ],
  },
  {
    tahap: { id: 'Tahap 3, Pasca-Bedah', en: 'Stage 3, Post-operative' },
    waktu: { id: 'Pemulihan lalu rawat inap', en: 'Recovery then inpatient care' },
    ikon: HeartPulse,
    langkah: [
      { id: 'Ruang Pemulihan (PACU) dengan monitor individual', en: 'Recovery room (PACU) with individual monitors' },
      { id: 'Edukasi nyeri, luka, dan mobilisasi dini kepada keluarga', en: 'Family taught about pain, wound and early mobilisation' },
      { id: 'Pindah ke Rawat Inap, HCU, atau ICU sesuai kondisi', en: 'Transfer to ward, HCU or ICU depending on condition' },
      { id: 'Kontrol luka dan jadwal pulang direncanakan DPJP', en: 'Wound review and discharge plan set by the surgeon' },
    ],
  },
];

/** Dua kolom penjaminan biaya bedah. */
const PENJAMINAN: {
  judul: Teks;
  ikon: Ikon;
  garis: string;
  titik: string;
  kotakIkon: string;
  poin: Teks[];
  catatan: Teks;
}[] = [
  {
    judul: { id: 'Pasien BPJS Kesehatan', en: 'BPJS Kesehatan Patients' },
    ikon: ShieldPlus,
    garis: 'border-l-medical-blue',
    titik: 'bg-medical-blue',
    kotakIkon: 'border-medical-blue/20 bg-blue-50 text-medical-blue',
    poin: [
      {
        id: 'Ditanggung penuh selama sesuai indikasi medis dan rekomendasi dokter spesialis penanggung jawab (DPJP).',
        en: 'Fully covered as long as it matches the medical indication and the responsible specialist (DPJP) recommendation.',
      },
      {
        id: 'Masih antrean bedah elektif: jadwal kamar operasi diumumkan admisi setelah tim bedah menetapkan prioritas.',
        en: 'Still in the elective surgery queue: the theatre schedule is announced by admissions once the team sets priority.',
      },
      {
        id: 'Kelas rawat sesuai hak, obat dan penunjang mengacu daftar INAZET elektronik.',
        en: 'Inpatient class follows entitlement, with medicine and support items from the electronic INAZET list.',
      },
      {
        id: 'Kasus darurat (jantung, stroke, trauma, kebidanan) diproses tanpa menunggu masa administrasi 45 hari.',
        en: 'Emergency cases (heart, stroke, trauma, obstetric) are processed without the 45-day administrative wait.',
      },
    ],
    catatan: {
      id: 'Serahkan SEP dan surat kontrol dari puskesmas atau poli terdekat paling lambat satu hari sebelum jadwal tindakan.',
      en: 'Submit the SEP and the referral control letter from the puskesmas or nearest clinic at least one day before the schedule.',
    },
  },
  {
    judul: { id: 'Asuransi Swasta & Pasien Umum', en: 'Private Insurance & Self-pay' },
    ikon: BadgeCheck,
    garis: 'border-l-teal-600',
    titik: 'bg-teal-600',
    kotakIkon: 'border-teal-200 bg-teal-50 text-teal-700',
    poin: [
      {
        id: 'Estimasi Package Price disampaikan tertulis sebelum tindakan: kamar operasi, jasa tim, alat, dan bahan habis pakai.',
        en: 'A written package-price estimate before the procedure: theatre, team fees, equipment and consumables.',
      },
      {
        id: 'Fast-track pre-authorization: dokumen masuk pagi, keputusan penjamin umumnya keluar pada hari yang sama.',
        en: 'Fast-track pre-authorisation: documents in the morning, the guarantee decision usually the same day.',
      },
      {
        id: 'Jadwal operasi dapat dipilih lebih cepat (elektif reguler atau kamar eksekutif) sesuai ketersediaan tim.',
        en: 'A sooner slot can be chosen (regular elective or executive theatre) subject to team availability.',
      },
      {
        id: 'Sisa plafon klaim dan opsi naik kelas (top-up) dijelaskan di loket sebelum keluarga menyetujui.',
        en: 'Remaining claim limit and the upgrade (top-up) option are explained at the counter before the family agrees.',
      },
    ],
    catatan: {
      id: 'Pembayaran dapat diangsur untuk tindakan terencana; kwitansi dan rerincian biaya lengkap diberikan pada saat pemulangan.',
      en: 'Planned procedures may be paid in instalments; the receipt and full cost breakdown are given at discharge.',
    },
  },
];

/** Tiga fase WHO Surgical Safety Checklist. */
const CHECKLIST: { fase: Teks; kapan: Teks; poin: Teks[]; ikon: Ikon }[] = [
  {
    fase: { id: 'Sign In', en: 'Sign In' },
    kapan: { id: 'Sebelum induksi anestesi', en: 'Before anaesthesia induction' },
    ikon: ClipboardList,
    poin: [
      { id: 'Identitas & situs operasi dengan penandaan', en: 'Identity & marked surgical site' },
      { id: 'Riwayat alergi dan kesulitan jalan napas', en: 'Allergy and airway-difficulty history' },
      { id: 'Kesiapan obat anestesi & perangkat monitor', en: 'Anaesthesia drugs & monitors ready' },
    ],
  },
  {
    fase: { id: 'Time Out', en: 'Time Out' },
    kapan: { id: 'Sebelum sayatan pertama', en: 'Before the first incision' },
    ikon: Clock,
    poin: [
      { id: 'Seluruh tim memperkenalkan diri & perannya', en: 'Whole team introduces itself and its role' },
      { id: 'Tahap kritis & perkiraan kehilangan darah diumumkan', en: 'Critical steps & expected blood loss announced' },
      { id: 'Sterilitas instrumen dan hasil imaging terverifikasi', en: 'Instrument sterility and imaging verified' },
    ],
  },
  {
    fase: { id: 'Sign Out', en: 'Sign Out' },
    kapan: { id: 'Sebelum luka ditutup', en: 'Before the wound is closed' },
    ikon: BadgeCheck,
    poin: [
      { id: 'Jumlah jarum, kasa, dan instrumen dihitung ulang', en: 'Needle, swab and instrument count repeated' },
      { id: 'Label spesimen dibaca keras-keras', en: 'Specimen labels read out loud' },
      { id: 'Rencana pemulihan & perhatian khusus disepakati', en: 'Recovery plan and specific concerns agreed' },
    ],
  },
];

/** Empat titik pada proses sterilisasi sentral (CSSD). */
const CSSD: { judul: Teks; ket: Teks; ikon: Ikon }[] = [
  {
    judul: { id: 'Alur satu arah', en: 'One-way flow' },
    ket: { id: 'Zona kotor, bersih, steril dipisah ruang & tekanan udara.', en: 'Soiled, clean and sterile zones split by rooms and air pressure.' },
    ikon: Wind,
  },
  {
    judul: { id: 'Autoklaf uap & plasma', en: 'Steam & plasma sterilisers' },
    ket: { id: 'Logam tahan panas diautoklaf; optik dan plastik dengan plasma.', en: 'Heat-proof metal autoclaved; optics and plastics by plasma.' },
    ikon: ThermometerSnowflake,
  },
  {
    judul: { id: 'Indikator tiap siklus', en: 'Indicator per cycle' },
    ket: { id: 'Indikator kimia di setiap paket, biologi di setiap siklus.', en: 'Chemical indicator in every pack, biological in every cycle.' },
    ikon: FlaskConical,
  },
  {
    judul: { id: 'Kode batch telusur', en: 'Traceable batch code' },
    ket: { id: 'Masa kedaluwarsa & petugas pengemas tercatat, terkunci rapat.', en: 'Expiry date and packer recorded, seal kept intact.' },
    ikon: Lock,
  },
];

/* ------------------------------- KOMPONEN ------------------------------- */

/**
 * HALAMAN RUANG OPERASI (/layanan/ruang-operasi), hero berlatar penuh foto OR
 * (scrim putih hanya di kiri), empat jenis kamar bedah, spesialisasi & teknologi (2 kolom),
 * timeline alur pasien tiga tahap, penjaminan BPJS vs Asuransi/Umum, keselamatan
 * pasien (checklist WHO + CSSD), lalu panel unduh brosur, video edukasi, dan
 * pantauan ruang tunggu keluarga dari <RuangOperasiWidgets />. Seluruhnya terang.
 */
const RuangOperasiClient: React.FC = () => {
  const { language } = useLanguage();
  const { openBookingModal } = useUIModal();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (teks: Teks) => teks[lang];

  return (
    <div className="bg-white text-slate-800">
      {/* ============ 1. HERO (LATAR PENUH FOTO) ============ */}
      <section className="relative overflow-hidden bg-white pt-16 pb-12 lg:pt-20 lg:pb-16">
        {/* OR-1.jpg dipakai sebagai latar penuh hero. */}
        <div aria-hidden className="absolute inset-0">
          <Image
            src={fotoORMobile}
            alt=""
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover object-right md:hidden"
          />
          <Image
            src={fotoOR}
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
            <h1 className="text-[clamp(2.5rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight text-slate-900">
              {L({ id: 'Instalasi Kamar Bedah (Operating Theater / OR)', en: 'Operating Theatre (OR) Installation' })}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
              {L({
                id: 'Instalasi Bedah Sentral di Lt 3 mengoperasikan empat kamar bertekanan positif, satu kamar isolasi bertekanan negatif, dan ruang pemulihan dengan monitor individual. Tim anestesi siaga 24 jam, sementara keluarga memantau fase tindakan dari ruang tunggu yang terhubung layar informasi.',
                en: 'The Central Operating Theatre on level 3 runs four positive-pressure rooms, one negative-pressure isolation theatre, and a recovery area with individual monitors. The anaesthesia team is on standby 24 hours, while families follow the phase of the case from a lounge connected to the information screen.',
              })}
            </p>

            <div className="mt-9">
              <button
                type="button"
                onClick={() => openBookingModal()}
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-600 px-8 py-4 text-lg font-extrabold text-white shadow-lg shadow-sky-600/25 transition-all hover:bg-sky-700 hover:shadow-xl active:scale-[0.98]"
              >
                <CalendarCheck className="h-6 w-6 shrink-0" />
                {L({ id: 'Konsultasi Bedah', en: 'Surgical Consultation' })}
              </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
                <MapPin className="h-5 w-5 shrink-0 text-sky-600" />
                {L({ id: 'Lt 3, Central Operating Theatre', en: 'Level 3, Central Operating Theatre' })}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
                <Clock className="h-5 w-5 shrink-0 text-sky-600" />
                {L({ id: 'Tindakan terjadwal 24 jam', en: 'Scheduled procedures 24 hours' })}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
                <ShieldCheck className="h-5 w-5 shrink-0 text-sky-600" />
                {L({ id: 'Higienitas Kelas A', en: 'Class A hygiene standard' })}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. JENIS KAMAR BEDAH (4 KOLOM) ================= */}
      <section id="kamar-bedah" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Jenis Kamar Bedah', en: 'Types of Operating Theatres' })}
          </h2>
          <div className="mt-5 h-px w-full bg-slate-200" />

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {KAMAR.map((k) => (
              <article
                key={k.judul.id}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-sky-700">
                  <k.ikon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-xl font-extrabold leading-snug text-slate-900">{L(k.judul)}</h3>
                <span className="mt-3 inline-flex w-fit rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-extrabold text-sky-800">
                  {L(k.label)}
                </span>
                <p className="mt-4 text-base leading-relaxed text-slate-600">{L(k.ket)}</p>
                <ul className="mt-5 space-y-2.5 border-t border-slate-100 pt-5">
                  {k.poin.map((p) => (
                    <li key={p.id} className="flex items-start gap-2.5 text-base leading-snug text-slate-700">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-sky-600" />
                      <span>{L(p)}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 3. SPESIALISASI & TEKNOLOGI (2 KOLOM) ================= */}
      <section id="spesialisasi" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Spesialisasi & Teknologi Bedah', en: 'Surgical Specialisations & Technology' })}
          </h2>
          <div className="mt-5 h-px w-full bg-slate-200" />

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
            {/* KIRI: daftar spesialisasi dengan ikon centang */}
            <div>
              <h3 className="text-2xl font-extrabold leading-snug text-slate-900">
                {L({ id: 'Lingkup Spesialisasi Bedah', en: 'Scope of Surgical Specialisations' })}
              </h3>
              <ul className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {SPESIALISASI.map((s) => (
                  <li
                    key={s.judul.id}
                    className="flex items-start gap-3.5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-600 text-white">
                      <Check className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-lg font-extrabold leading-snug text-slate-900">{L(s.judul)}</span>
                      <span className="mt-1 block text-base leading-snug text-slate-600">{L(s.ket)}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* KANAN: tiga kartu teknologi */}
            <div>
              <h3 className="text-2xl font-extrabold leading-snug text-slate-900">
                {L({ id: 'Teknologi Penentu Presisi', en: 'Technology Behind the Precision' })}
              </h3>
              <div className="mt-7 space-y-5">
                {TEKNOLOGI.map((t) => (
                  <article key={t.judul.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-7 shadow-sm">
                    <div className="flex items-start gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-sky-700">
                        <t.ikon className="h-6 w-6" />
                      </span>
                      <div>
                        <h4 className="text-xl font-extrabold leading-snug text-slate-900">{L(t.judul)}</h4>
                        <p className="mt-2 text-base leading-relaxed text-slate-600">{L(t.ket)}</p>
                      </div>
                    </div>
                    <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-slate-200 pt-5">
                      {t.poin.map((p) => (
                        <li key={p.id} className="flex items-center gap-2 text-base font-semibold text-slate-700">
                          <Check className="h-4 w-4 shrink-0 text-sky-600" />
                          {L(p)}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. ALUR PASIEN (TIMELINE) ================= */}
      <section id="alur-pasien" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Alur Pasien Bedah (Patient Journey)', en: 'Surgical Patient Journey' })}
          </h2>
          <div className="mt-5 h-px w-full bg-slate-200" />

          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
            <ol>
              {ALUR.map((a, i) => (
                <li key={a.tahap.id} className="flex gap-5 sm:gap-7">
                  {/* Rel garis waktu */}
                  <div className="flex flex-col items-center">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-sky-700">
                      <a.ikon className="h-7 w-7" />
                    </span>
                    {i < ALUR.length - 1 && <span className="my-2 w-px flex-1 bg-slate-200" />}
                  </div>

                  {/* Isi tahap */}
                  <div className={i < ALUR.length - 1 ? 'pb-10' : ''}>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                      <h3 className="text-2xl font-extrabold leading-snug text-slate-900">{L(a.tahap)}</h3>
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1 text-sm font-bold text-slate-600">
                        {L(a.waktu)}
                      </span>
                    </div>
                    <ul className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-2">
                      {a.langkah.map((s, n) => (
                        <li key={s.id} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-sky-200 bg-white text-sm font-extrabold text-sky-700">
                            {n + 1}
                          </span>
                          <span className="text-lg leading-snug text-slate-700">{L(s)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ================= 5. PENJAMINAN (BPJS vs ASURANSI/UMUM) ================= */}
      <section id="penjaminan" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Penjaminan Biaya Operasi', en: 'Surgery Cost Guarantees' })}
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
                      <span className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${p.titik}`} />
                      <span className="text-lg leading-relaxed text-slate-600">{L(isi)}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-base leading-relaxed text-slate-700">
                  <span className="font-extrabold text-slate-900">
                    {L({ id: 'Catatan: ', en: 'Note: ' })}
                  </span>
                  {L(p.catatan)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 6. KESELAMATAN PASIEN (BANNER) ================= */}
      <section id="keselamatan" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({ id: 'Keselamatan Pasien Bedah', en: 'Surgical Patient Safety' })}
          </h2>
          <div className="mt-5 h-px w-full bg-slate-200" />

          <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm sm:p-12">
            <h3 className="text-2xl font-extrabold leading-snug text-slate-900 sm:text-3xl">
              {L({ id: 'WHO Surgical Safety Checklist', en: 'WHO Surgical Safety Checklist' })}
            </h3>
            <p className="mt-5 max-w-4xl text-lg leading-relaxed text-slate-600">
              {L({
                id: 'Tiga tahap konfirmasi dikerjakan bersama oleh operator bedah, dokter anestesi, dan perawat sirkuler. Tidak ada sayatan dimulai sebelum seluruh poin Time Out tercentang.',
                en: 'Three confirmation steps performed together by the surgeon, the anaesthesiologist, and the circulating nurse. No incision begins until every Time Out item is ticked.',
              })}
            </p>

            <div className="mt-9 grid grid-cols-1 gap-6 lg:grid-cols-3">
              {CHECKLIST.map((c, i) => (
                <article key={c.fase.id} className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-md shadow-sky-600/25">
                      <c.ikon className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="text-sm font-extrabold uppercase tracking-wide text-sky-600">
                        {L({ id: `Fase ${i + 1}`, en: `Phase ${i + 1}` })}
                      </p>
                      <h4 className="text-xl font-extrabold leading-snug text-slate-900">{L(c.fase)}</h4>
                    </div>
                  </div>
                  <p className="mt-4 text-base font-bold text-slate-500">{L(c.kapan)}</p>
                  <ul className="mt-5 space-y-3 border-t border-slate-100 pt-5">
                    {c.poin.map((p) => (
                      <li key={p.id} className="flex items-start gap-2.5 text-base leading-snug text-slate-700">
                        <Check className="mt-1 h-5 w-5 shrink-0 text-sky-600" />
                        <span>{L(p)}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            {/* Sterilisasi Sentral (CSSD) */}
            <div className="mt-10 rounded-2xl border-2 border-sky-200 bg-white p-7 shadow-sm sm:p-9">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h3 className="text-2xl font-extrabold leading-snug text-slate-900">
                  {L({ id: 'Sterilisasi Sentral (CSSD)', en: 'Central Sterile Supply Department (CSSD)' })}
                </h3>
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
                  <MapPin className="h-5 w-5 shrink-0 text-sky-600" />
                  {L({ id: 'Lt G · 24 jam mengikuti jadwal bedah', en: 'Ground Floor · 24 hours following theatre schedule' })}
                </span>
              </div>
              <p className="mt-5 text-lg leading-relaxed text-slate-600">
                {L({
                  id: 'Instrumen bedah dicuci dengan pembersih ultrasonik, dikemas, lalu disterilkan dengan autoklaf uap bertekanan atau sterilizer plasma untuk alat sensitif panas. Setiap siklus diuji, sehingga keluarga tahu alat yang dipakai pada operasi orang tercinta benar-benar steril.',
                  en: 'Surgical instruments are ultrasonically washed, packed, then sterilised by pressure steam autoclave or a plasma steriliser for heat-sensitive items. Every cycle is tested, so families know the instruments used on their loved one are genuinely sterile.',
                })}
              </p>

              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {CSSD.map((s) => (
                  <div key={s.judul.id} className="flex gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-sky-700">
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
        </div>
      </section>

      {/* ================= 7. WIDGET UX BEDAH ================= */}
      <RuangOperasiWidgets />
    </div>
  );
};

export default RuangOperasiClient;
