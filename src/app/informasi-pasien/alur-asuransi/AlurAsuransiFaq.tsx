'use client';

import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Check,
  ChevronDown,
  MessageCircle,
  Phone,
  Search,
  ThumbsDown,
  ThumbsUp,
  X,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import type { Language } from '../../../types';

type Teks = { id: string; en: string };
type Kategori = 'cashless' | 'kamar' | 'reimb';

/* ============================== DATA ============================== */

/** Nomor kontak Insurance Desk. */
const WA_DISPLAY = '0811-9000-1404';
const WA_LINK = '6281190001404';
const TEL_DISPLAY = '(061) 456 7890';
const TEL_LINK = '+62614567890';

/** Meta tiap kategori: label + warna badge lembut. */
const KATEGORI: Record<Kategori, { label: Teks; badge: string; ring: string }> = {
  cashless: {
    label: { id: 'Cashless & GL', en: 'Cashless & GL' },
    badge: 'border-blue-200 bg-blue-50 text-blue-700',
    ring: 'bg-blue-100 text-blue-700',
  },
  kamar: {
    label: { id: 'Kamar & Excess', en: 'Room & Excess' },
    badge: 'border-amber-200 bg-amber-50 text-amber-700',
    ring: 'bg-amber-100 text-amber-700',
  },
  reimb: {
    label: { id: 'Reimbursement', en: 'Reimbursement' },
    badge: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    ring: 'bg-emerald-100 text-emerald-700',
  },
};
const URUT: Kategori[] = ['cashless', 'kamar', 'reimb'];

/** Kumpulan FAQ layanan berobat asuransi swasta (dikelompokkan per kategori). */
const FAQ: { cat: Kategori; q: Teks; a: Teks }[] = [
  {
    cat: 'cashless',
    q: {
      id: 'Apakah semua jenis asuransi swasta bisa melayani sistem Cashless (Tanpa Tunai)?',
      en: 'Do all private insurance types support the Cashless (no-cash) system?',
    },
    a: {
      id: 'Kami bekerja sama dengan 50+ asuransi dan TPA. Penjaminan cashless tergantung polis aktif Anda. Cek daftar mitra atau hubungi Insurance Desk di (061) 456 7890.',
      en: 'We partner with 50+ insurers and TPAs. Cashless coverage depends on your active policy. Check our partner list or contact the Insurance Desk at (061) 456 7890.',
    },
  },
  {
    cat: 'cashless',
    q: {
      id: 'Bagaimana jika kartu asuransi saya berbentuk digital (E-Card) di aplikasi?',
      en: 'What if my insurance card is digital (an E-Card) in the app?',
    },
    a: {
      id: 'E-Card resmi dari aplikasi asuransi Anda berlaku sepenuhnya. Cukup tunjukkan E-Card aktif beserta KTP/identitas resmi saat registrasi di Counter Admission Asuransi.',
      en: 'The official E-Card from your insurer’s app is fully accepted. Simply show your active E-Card together with your ID card when registering at the Insurance Admission Counter.',
    },
  },
  {
    cat: 'cashless',
    q: {
      id: 'Berapa lama proses verifikasi Surat Jaminan (Guarantee Letter / GL) untuk Rawat Inap?',
      en: 'How long does the Guarantee Letter (GL) verification take for inpatient care?',
    },
    a: {
      id: 'Penerbitan Initial GL biasanya memakan waktu 15 hingga 45 menit setelah berkas medis dikirimkan ke pihak asuransi/TPA.',
      en: 'Issuing the Initial GL usually takes 15 to 45 minutes once the medical file has been sent to the insurer/TPA.',
    },
  },
  {
    cat: 'cashless',
    q: {
      id: 'Apakah seluruh resep obat dan pemeriksaan penunjang (Lab/Radiologi) pasti di-cover asuransi?',
      en: 'Are all prescriptions and supporting exams (Lab/Radiology) certainly covered by insurance?',
    },
    a: {
      id: 'Mengacu pada batasan indikasi medis dan polis. Tindakan penunjang khusus atau obat luar akan diajukan pre-authorization terlebih dahulu ke pihak asuransi.',
      en: 'Coverage follows medical-indication and policy limits. Special supporting procedures or external medications will be submitted for pre-authorization to the insurer first.',
    },
  },
  {
    cat: 'kamar',
    q: {
      id: 'Apa itu Excess Charge (Biaya Selisih) dan bagaimana cara pelunasannya?',
      en: 'What is an Excess Charge and how is it settled?',
    },
    a: {
      id: 'Selisih biaya akibat pemakaian fasilitas di luar plafon polis (upgrade kamar, vitamin non-cover, dll). Dapat dilunasi di Kasir Asuransi via QRIS, Debit, Kredit, atau Tunai.',
      en: 'The cost difference from using facilities beyond your policy cap (room upgrade, non-covered vitamins, etc.). It can be settled at the Insurance Cashier via QRIS, debit, credit or cash.',
    },
  },
  {
    cat: 'kamar',
    q: {
      id: 'Bisakah saya melakukan Upgrade (naik kelas) kamar rawat inap di atas hak polis saya?',
      en: 'Can I upgrade my inpatient room class above my policy entitlement?',
    },
    a: {
      id: 'Bisa, selama kapasitas kamar tersedia. Pihak Admission akan memberikan lembar estimasi perhitungan selisih biaya sebelum Anda menempati kamar.',
      en: 'Yes, as long as room capacity is available. The Admission team will provide an estimate of the cost difference before you occupy the room.',
    },
  },
  {
    cat: 'reimb',
    q: {
      id: 'Bagaimana jika perusahaan asuransi saya belum bekerja sama (Sistem Reimbursement)?',
      en: 'What if my insurance company is not yet a partner (Reimbursement system)?',
    },
    a: {
      id: 'Anda dapat berobat dengan pembayaran mandiri terlebih dahulu. Petugas Insurance Desk akan membantu menyiapkan dokumen klaim reimbursement (Resume Medis, Kuitansi Asli, Rincian Obat) agar proses klaim lancar.',
      en: 'You can seek care with self-payment first. Our Insurance Desk staff will help prepare your reimbursement claim documents (Medical Resume, Original Receipt, Medicine Itemisation) so the claim runs smoothly.',
    },
  },
];

/* ================================ SECTION FAQ ================================ */

const AlurAsuransiFaq: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (t: Teks) => t[lang];

  const [query, setQuery] = useState('');
  const [kategori, setKategori] = useState<'all' | Kategori>('all');
  const [buka, setBuka] = useState<number | null>(0);
  const [feedback, setFeedback] = useState<Record<number, 'up' | 'down'>>({});

  const waText = useMemo(
    () =>
      encodeURIComponent(
        lang === 'en'
          ? 'Hi Insurance Desk RS Medistra Horizon, I still have a question about my insurance policy.'
          : 'Halo Insurance Desk RS Medistra Horizon, saya masih ada pertanyaan seputar polis asuransi saya.',
      ),
    [lang],
  );

  /** Jumlah total per kategori (untuk label tab). */
  const jumlah = useMemo(() => {
    const map: Record<Kategori, number> = { cashless: 0, kamar: 0, reimb: 0 };
    FAQ.forEach((f) => (map[f.cat] += 1));
    return map;
  }, []);

  /** Hasil filter: kategori + kata kunci (mencocoki pertanyaan & jawaban). */
  const hasil = useMemo(() => {
    const term = query.trim().toLowerCase();
    return FAQ.map((f, idx) => ({ f, idx })).filter(({ f }) => {
      const cocokKat = kategori === 'all' || f.cat === kategori;
      const cocokCari =
        !term ||
        f.q.id.toLowerCase().includes(term) ||
        f.q.en.toLowerCase().includes(term) ||
        f.a.id.toLowerCase().includes(term) ||
        f.a.en.toLowerCase().includes(term);
      return cocokKat && cocokCari;
    });
  }, [query, kategori]);

  return (
    <section id="faq" className="scroll-mt-28 bg-slate-50 py-20">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        {/* ====== HEADER + SEARCH ====== */}
        <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900">
          {L({ id: 'Pertanyaan Sering Diajukan Seputar Asuransi', en: 'Frequently Asked Questions About Insurance' })}
        </h2>
        <div className="mt-5 h-px w-full bg-slate-200" />
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
          {L({
            id: 'Telusuri jawaban cepat seputar penjaminan cashless, kamar & excess charge, dan klaim reimbursement.',
            en: 'Search quick answers on cashless coverage, room & excess charge, and reimbursement claims.',
          })}
        </p>

        <div className="relative mt-8 max-w-2xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setBuka(0);
            }}
            placeholder={L({
              id: "Cari pertanyaan... (contoh: GL, kamar, excess charge)",
              en: 'Search questions... (e.g. GL, room, excess charge)',
            })}
            aria-label={L({ id: 'Cari pertanyaan', en: 'Search questions' })}
            className="w-full rounded-2xl border border-slate-300 bg-white py-4 pl-12 pr-12 text-base font-medium text-slate-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label={L({ id: 'Bersihkan pencarian', en: 'Clear search' })}
              className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* ====== SPLIT 2 KOLOM ====== */}
        <div className="mt-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* ---------- KOLOM KIRI: STICKY NAVIGASI & DUKUNGAN (33%) ---------- */}
          <aside className="space-y-6 lg:col-span-4 lg:sticky lg:top-28">
            {/* Kategori */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-wide text-slate-500">
                {L({ id: 'Kategori Pertanyaan', en: 'Question Categories' })}
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <TabKategori
                  aktif={kategori === 'all'}
                  label={L({ id: 'Semua Pertanyaan', en: 'All Questions' })}
                  count={FAQ.length}
                  onClick={() => setKategori('all')}
                />
                {URUT.map((k) => (
                  <TabKategori
                    key={k}
                    aktif={kategori === k}
                    label={L(KATEGORI[k].label)}
                    count={jumlah[k]}
                    onClick={() => setKategori(k)}
                  />
                ))}
              </div>
            </div>

            {/* Kartu bantuan (CTA) */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="bg-gradient-to-br from-blue-600 to-cyan-500 px-6 py-5">
                <h3 className="text-xl font-extrabold leading-snug text-white">
                  {L({ id: 'Masih Punya Pertanyaan Lain?', en: 'Still Have Other Questions?' })}
                </h3>
                <p className="mt-1 text-base leading-relaxed text-blue-50">
                  {L({
                    id: 'Tim Insurance Desk kami siap membantu cek polis Anda secara langsung.',
                    en: 'Our Insurance Desk team is ready to check your policy directly.',
                  })}
                </p>
              </div>
              <div className="flex flex-col gap-3 p-6">
                <a
                  href={`https://wa.me/${WA_LINK}?text=${waText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-base font-extrabold text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-700 active:scale-[0.98]"
                >
                  <MessageCircle className="h-5 w-5" />
                  {L({ id: 'Chat WA Insurance Desk', en: 'Chat WA Insurance Desk' })}
                </a>
                <a
                  href={`tel:${TEL_LINK}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-base font-extrabold text-slate-700 transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-800 active:scale-[0.98]"
                >
                  <Phone className="h-5 w-5" />
                  {TEL_DISPLAY}
                </a>
              </div>
            </div>
          </aside>

          {/* ---------- KOLOM KANAN: AKORDEON (67%) ---------- */}
          <div className="space-y-4 lg:col-span-8">
            {hasil.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <p className="text-lg font-semibold text-slate-500">
                  {L({
                    id: `Tidak ada pertanyaan yang cocok dengan “${query}”. Coba kata lain atau hubungi Insurance Desk.`,
                    en: `No question matches “${query}”. Try another word or contact the Insurance Desk.`,
                  })}
                </p>
              </div>
            )}

            {hasil.map(({ f, idx }) => {
              const aktif = buka === idx;
              const kat = KATEGORI[f.cat];
              const fb = feedback[idx];
              return (
                <div
                  key={f.q.id}
                  className={`overflow-hidden rounded-xl border bg-white shadow-sm transition-colors ${
                    aktif ? 'border-slate-200 border-l-4 border-l-blue-600' : 'border-slate-200 hover:border-blue-200'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setBuka(aktif ? null : idx)}
                    aria-expanded={aktif}
                    className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left"
                  >
                    <div>
                      <span className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-bold ${kat.badge}`}>
                        {L(kat.label)}
                      </span>
                      <span className="mt-2 block text-xl font-bold leading-snug text-slate-900">{L(f.q)}</span>
                    </div>
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
                        aktif ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'
                      }`}
                    >
                      <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${aktif ? 'rotate-180' : ''}`} />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {aktif && (
                      <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-slate-100 px-5 pb-5 pt-4">
                          <p className="text-lg leading-relaxed text-slate-600">{L(f.a)}</p>

                          {/* Feedback micro-interaction */}
                          <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4">
                            <span className="text-sm font-semibold text-slate-500">
                              {L({ id: 'Apakah jawaban ini membantu?', en: 'Was this answer helpful?' })}
                            </span>
                            {fb ? (
                              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700">
                                <Check className="h-4 w-4" />
                                {L({ id: 'Terima kasih atas masukan Anda.', en: 'Thank you for your feedback.' })}
                              </span>
                            ) : (
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  onClick={() => setFeedback((p) => ({ ...p, [idx]: 'up' }))}
                                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-bold text-slate-600 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                                >
                                  <ThumbsUp className="h-4 w-4" />
                                  {L({ id: 'Ya', en: 'Yes' })}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setFeedback((p) => ({ ...p, [idx]: 'down' }))}
                                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-bold text-slate-600 transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700"
                                >
                                  <ThumbsDown className="h-4 w-4" />
                                  {L({ id: 'Tidak', en: 'No' })}
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

/** Tombol tab/filter kategori di panel kiri. */
const TabKategori: React.FC<{ aktif: boolean; label: string; count: number; onClick: () => void }> = ({
  aktif,
  label,
  count,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={aktif}
    className={`flex items-center justify-between rounded-xl border px-4 py-2.5 text-left text-base font-semibold transition ${
      aktif
        ? 'border-blue-600 bg-blue-600 text-white shadow-sm shadow-blue-600/25'
        : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50'
    }`}
  >
    {label}
    <span
      className={`ml-2 inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full px-1.5 text-xs font-bold ${
        aktif ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-500'
      }`}
    >
      {count}
    </span>
  </button>
);

export default AlurAsuransiFaq;
