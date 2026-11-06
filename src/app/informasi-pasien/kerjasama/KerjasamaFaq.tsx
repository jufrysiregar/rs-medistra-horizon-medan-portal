'use client';

import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, CircleHelp, Mail, MessageCircle, Search } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import type { Language } from '../../../types';
import OverhaulLink from '../../../components/OverhaulLink';

type Teks = { id: string; en: string };

/* ============================== DATA FAQ ============================== */

type KatKey = 'korporasi' | 'asuransi' | 'vendor' | 'faskes';

interface FaqItem {
  id: string;
  kat: KatKey;
  q: Teks;
  a: Teks;
}

/** Label filter (panjang) + label badge (pendek) + kelas warna badge per kategori. */
const KATEGORI: { key: KatKey; filter: Teks; badge: Teks; badgeCls: string }[] = [
  {
    key: 'korporasi',
    filter: { id: 'Korporasi & MCU Massal', en: 'Corporate & Mass MCU' },
    badge: { id: 'Korporasi', en: 'Corporate' },
    badgeCls: 'bg-teal-100 text-teal-700',
  },
  {
    key: 'asuransi',
    filter: { id: 'Asuransi & TPA', en: 'Insurance & TPA' },
    badge: { id: 'Asuransi', en: 'Insurance' },
    badgeCls: 'bg-blue-100 text-blue-800',
  },
  {
    key: 'vendor',
    filter: { id: 'Vendor Farmasi & Alkes', en: 'Pharma & Medtech Vendor' },
    badge: { id: 'Vendor', en: 'Vendor' },
    badgeCls: 'bg-slate-200 text-slate-700',
  },
  {
    key: 'faskes',
    filter: { id: 'Rujukan Faskes & CSSD', en: 'Referral & CSSD' },
    badge: { id: 'Faskes', en: 'Referral' },
    badgeCls: 'bg-indigo-100 text-indigo-700',
  },
];

const FAQ: FaqItem[] = [
  {
    id: 'mcu-massal',
    kat: 'korporasi',
    q: { id: 'Bagaimana prosedur pendaftaran MCU massal untuk karyawan?', en: 'What is the procedure to arrange mass MCU for employees?' },
    a: {
      id: 'Isi formulir B2B di halaman ini atau hubungi WhatsApp Business Development kami. Tim akan mengirim katalog MCU, kustomisasi paket K3 sesuai kebutuhan perusahaan, beserta penawaran tarifnya.',
      en: 'Fill in the B2B form on this page or contact our Business Development WhatsApp. The team will send the MCU catalog, K3 package customization to suit your company, along with a tariff offer.',
    },
  },
  {
    id: 'mcu-onsite',
    kat: 'korporasi',
    q: { id: 'Bisakah MCU dilakukan On-Site di lokasi perusahaan?', en: 'Can MCU be conducted on-site at the company location?' },
    a: {
      id: 'Ya, tersedia layanan Mobile MCU lengkap dengan peralatan portable dan bus MCU keliling. Tim medis dan paramedis datang ke lokasi Anda, pemeriksaan tetap memenuhi standar ruang pemeriksaan RS.',
      en: 'Yes, a full Mobile MCU service is available with portable equipment and a roaming MCU bus. Our medical and paramedical team comes to your site while meeting hospital-grade examination standards.',
    },
  },
  {
    id: 'monthly-billing',
    kat: 'korporasi',
    q: { id: 'Apakah perusahaan bisa ditagih melalui Monthly Billing?', en: 'Can the company be billed through monthly billing?' },
    a: {
      id: 'Bisa, khusus bagi mitra yang telah menandatangani PKS. Tagihan direkap dan dikirim setiap akhir bulan beserta rincian layanan, dengan termin pembayaran sesuai kesepakatan.',
      en: 'Sure, for partners with a signed cooperation agreement. Invoices are recapped and sent at the end of each month with service details, on the agreed payment terms.',
    },
  },
  {
    id: 'cashless-baru',
    kat: 'asuransi',
    q: { id: 'Bagaimana cara pendaftaran kerjasama pembayaran Cashless baru?', en: 'How do we register a new cashless payment partnership?' },
    a: {
      id: 'Kirimkan profil perusahaan dan proposal kerjasama ke email humas@rsmedistrahorizon.co.id. Evaluasi berkas memakan waktu 3-5 hari kerja, dilanjutkan rapat pembahasan skema dan penandatanganan PKS.',
      en: 'Send your company profile and partnership proposal to humas@rsmedistrahorizon.co.id. Document evaluation takes 3-5 working days, followed by a scheme review meeting and agreement signing.',
    },
  },
  {
    id: 'api-eclaim',
    kat: 'asuransi',
    q: { id: 'Apakah sistem RS mendukung integrasi API E-Claim?', en: 'Does the hospital system support E-Claim API integration?' },
    a: {
      id: 'Ya. Sistem HIS kami siap diintegrasikan melalui API untuk percepatan penerbitan Guarantee Letter (GL) serta klaim digital, sehingga pasien mitra tidak perlu menunggu lama di loket.',
      en: 'Yes. Our HIS is ready for API integration to speed up Guarantee Letter (GL) issuance and digital claims, so partner patients avoid long waits at the counter.',
    },
  },
  {
    id: 'vendor-registrasi',
    kat: 'vendor',
    q: { id: 'Bagaimana alur pendaftaran produk/vendor baru?', en: 'What is the flow for registering a new product/vendor?' },
    a: {
      id: 'Sertakan dokumen quotation lengkap dengan legalitas usaha, nomor izin edar BPOM/AKL, dan sertifikat Halal. Berkas diserahkan ke Bagian Pengadaan RS lantai 3, atau kirim soft-copy melalui email resmi pengadaan.',
      en: 'Attach a complete quotation with business legality, BPOM/AKL permit numbers, and the Halal certificate. Submit the file to the Procurement Department on floor 3, or send a soft copy via the official procurement email.',
    },
  },
  {
    id: 'vendor-surat',
    kat: 'vendor',
    q: { id: 'Ke mana surat penawaran barang dan jasa dikirim?', en: 'Where should goods and services offers be sent?' },
    a: {
      id: 'Surat penawaran dikirim ke email logistik.medis@medistrahorizon.co.id atau dapat diantar langsung ke Bagian Pengadaan. Untuk konfirmasi cepat hubungi ekstensi 143 pada jam kerja.',
      en: 'Send offer letters to logistik.medis@medistrahorizon.co.id or deliver them to the Procurement Department. For quick confirmation, call extension 143 during business hours.',
    },
  },
  {
    id: 'faskes-rujukan',
    kat: 'faskes',
    q: { id: 'Bisakah klinik/RS mitra merujuk pasien untuk Lab & Radiologi khusus?', en: 'Can partner clinics/hospitals refer patients for special Lab & Radiology?' },
    a: {
      id: 'Ya, kami melayani rujukan MRI, MSCT, laboratorium molekuler, dan layanan penunjang lanjutan lainnya. Hasil bacaan dikirim secara digital kepada dokter perujuk, lengkap dengan konsultasi hasil bila diminta.',
      en: 'Yes, we accept referrals for MRI, MSCT, molecular laboratories, and other advanced support services. Reports are delivered digitally to the referring physician, with result consultation on request.',
    },
  },
  {
    id: 'faskes-cssd',
    kat: 'faskes',
    q: { id: 'Apakah tersedia kerja sama External CSSD untuk faskes lain?', en: 'Is an external CSSD service available for other facilities?' },
    a: {
      id: 'Ya. Kami melayani dekontaminasi dan sterilisasi instrumen dengan metode Autoclave maupun Plasma, dilengkapi layanan antar-jemput rutin serta sertifikat hasil uji spora (indikator biologis) tiap siklus sterilisasi.',
      en: 'Yes. We provide instrument decontamination and sterilization via Autoclave and Plasma methods, with routine pick-up and delivery plus a spore-test (biological indicator) certificate for every sterilization cycle.',
    },
  },
  {
    id: 'faskes-inhouse',
    kat: 'faskes',
    q: { id: 'Bisakah perusahaan berlangganan layanan In-House Clinic?', en: 'Can a company subscribe to the In-House Clinic service?' },
    a: {
      id: 'Ya, kami menyediakan dokter dan perawat jaga, obat emergensi, peralatan medis dasar, hingga manajemen operasional klinik di lingkungan perusahaan Anda, dengan pelaporan kesehatan berkala ke HR.',
      en: 'Yes, we supply on-duty doctors and nurses, emergency medications, basic medical equipment, and full operational management of the clinic inside your company premises, with periodic health reports to HR.',
    },
  },
];

/* ============================== KONSTANTA KONTAK ============================== */

const WA_LINK = 'https://wa.me/6281144415515';
const WA_TEXT = 'Halo%20RS%20Medistra%20Horizon%20Medan,%20saya%20ingin%20berdiskusi%20proposal%20kerja%20sama/MoU%20(B2B).';
const EMAIL_BIZ = 'humas@rsmedistrahorizon.co.id';

/* ============================== KOMPONEN ============================== */

/**
 * FAQ Kemitraan & B2B bergaya "B2B Split-Layout" dua kolom:
 * kiri (filter kategori + sticky contact card, span 4), kanan (accordion +
 * badge kategori, span 8). Filter, pencarian, dan accordion memakai useState;
 * transisi buka-tutup jawaban dianimasikan dengan Framer Motion.
 */
const KerjasamaFaq: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (t: Teks) => t[lang];

  const [katAktif, setKatAktif] = useState<KatKey | 'semua'>('semua');
  const [query, setQuery] = useState('');
  const [buka, setBuka] = useState<string | null>('mcu-massal');

  const hasil = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQ.filter((f) => {
      if (katAktif !== 'semua' && f.kat !== katAktif) return false;
      if (!q) return true;
      return (
        f.q.id.toLowerCase().includes(q) ||
        f.q.en.toLowerCase().includes(q) ||
        f.a.id.toLowerCase().includes(q) ||
        f.a.en.toLowerCase().includes(q)
      );
    });
  }, [katAktif, query]);

  const jumlahPerKat = useMemo(() => {
    const m: Record<string, number> = {};
    FAQ.forEach((f) => {
      m[f.kat] = (m[f.kat] ?? 0) + 1;
    });
    return m;
  }, []);

  const badgeKat = (kat: KatKey) => KATEGORI.find((k) => k.key === kat)!;

  return (
    <section id="faq" className="scroll-mt-28 bg-slate-50 py-20">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        {/* ---------- Header section + search bar ---------- */}
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-teal-100 bg-white text-teal-700 shadow-sm">
            <CircleHelp className="h-6 w-6" />
          </span>
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {L({
              id: 'Pertanyaan Sering Diajukan Seputar Kemitraan & B2B',
              en: 'Frequently Asked Questions on Partnership & B2B',
            })}
          </h2>
        </div>
        <div className="relative mt-6 max-w-3xl">
          <Search className="pointer-events-none absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={L({
              id: "Cari topik (misal: 'MCU On-site', 'PKS Asuransi')...",
              en: "Search topics (e.g. 'on-site MCU', 'insurance PKS')...",
            })}
            className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-14 pr-5 text-lg font-medium text-slate-800 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
            aria-label={L({ id: 'Cari pertanyaan', en: 'Search questions' })}
          />
        </div>

        {/* ---------- Grid 2 kolom (4 + 8) ---------- */}
        <div className="mt-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* ===== Kolom kiri: filter + sticky contact ===== */}
          <div className="space-y-6 lg:col-span-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-widest text-slate-400">
                {L({ id: 'Filter Kategori', en: 'Category Filter' })}
              </p>
              <div className="mt-4 space-y-2" role="tablist" aria-label={L({ id: 'Filter kategori FAQ', en: 'FAQ category filter' })}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={katAktif === 'semua'}
                  onClick={() => setKatAktif('semua')}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base font-bold transition-colors ${
                    katAktif === 'semua'
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-400'
                  }`}
                >
                  {L({ id: 'Semua Pertanyaan', en: 'All Questions' })}
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-sm font-extrabold ${
                      katAktif === 'semua' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {FAQ.length}
                  </span>
                </button>
                {KATEGORI.map((k) => {
                  const aktif = katAktif === k.key;
                  return (
                    <button
                      key={k.key}
                      type="button"
                      role="tab"
                      aria-selected={aktif}
                      onClick={() => setKatAktif(k.key)}
                      className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base font-bold transition-colors ${
                        aktif
                          ? 'bg-slate-900 text-white shadow-md'
                          : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-400'
                      }`}
                    >
                      {L(k.filter)}
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-sm font-extrabold ${
                          aktif ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {jumlahPerKat[k.key] ?? 0}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sticky contact card */}
            <div className="lg:sticky lg:top-24">
              <div className="rounded-2xl border border-teal-200 bg-teal-50 p-6 shadow-sm">
                <h3 className="text-xl font-extrabold leading-snug text-slate-900">
                  {L({ id: 'Butuh Diskusi Proposal / MoU?', en: 'Need a Proposal / MoU Discussion?' })}
                </h3>
                <p className="mt-3 text-lg leading-relaxed text-slate-600">
                  {L({
                    id: 'Tim Business Development kami siap melayani diskusi penyesuaian tarif & draft PKS.',
                    en: 'Our Business Development team is ready to discuss tariff adjustments & the PKS draft.',
                  })}
                </p>
                <OverhaulLink
                  href={`${WA_LINK}?text=${WA_TEXT}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-base font-extrabold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700 hover:shadow-xl active:scale-[0.99]"
                >
                  <MessageCircle className="h-5 w-5" />
                  {L({ id: 'Chat WA Business Dev (B2B)', en: 'Chat BD WhatsApp (B2B)' })}
                </OverhaulLink>
                <a
                  href={`mailto:${EMAIL_BIZ}`}
                  className="mt-4 flex items-center justify-center gap-2 text-base font-bold text-teal-800 underline-offset-4 transition hover:underline"
                >
                  <Mail className="h-5 w-5 shrink-0" />
                  {EMAIL_BIZ}
                </a>
              </div>
            </div>
          </div>

          {/* ===== Kolom kanan: accordion ===== */}
          <div className="space-y-4 lg:col-span-8">
            {hasil.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <p className="text-lg font-semibold text-slate-500">
                  {L({
                    id: 'Tidak ada pertanyaan yang cocok dengan pencarian Anda. Coba kata kunci lain atau hubungi tim kami.',
                    en: 'No question matches your search. Try another keyword or reach our team.',
                  })}
                </p>
              </div>
            )}

            {hasil.map((f) => {
              const aktif = buka === f.id;
              const kat = badgeKat(f.kat);
              return (
                <div
                  key={f.id}
                  className={`overflow-hidden rounded-2xl bg-white transition-all duration-300 ${
                    aktif
                      ? 'border border-teal-200 border-l-4 border-l-teal-500 shadow-md'
                      : 'border border-slate-200 shadow-sm hover:border-teal-300 hover:shadow'
                  }`}
                >
                  <span
                    className={`mt-4 ml-6 inline-flex rounded-full px-3 py-1 text-sm font-bold uppercase tracking-wide ${kat.badgeCls}`}
                  >
                    {L(kat.badge)}
                  </span>
                  <button
                    type="button"
                    onClick={() => setBuka(aktif ? null : f.id)}
                    aria-expanded={aktif}
                    className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                  >
                    <span className="text-xl font-bold leading-snug text-slate-900">{L(f.q)}</span>
                    <ChevronDown
                      className={`h-6 w-6 shrink-0 text-teal-600 transition-transform duration-300 ${aktif ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {aktif && (
                      <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-slate-100 px-6 pb-6 pt-4">
                          <p className="text-lg leading-relaxed text-slate-600">{L(f.a)}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            <p className="pt-2 text-center text-sm font-semibold text-slate-400">
              {L({
                id: `Menampilkan ${hasil.length} dari ${FAQ.length} pertanyaan`,
                en: `Showing ${hasil.length} of ${FAQ.length} questions`,
              })}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KerjasamaFaq;
