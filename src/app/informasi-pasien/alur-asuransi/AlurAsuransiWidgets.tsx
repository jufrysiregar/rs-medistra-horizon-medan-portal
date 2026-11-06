'use client';

import React, { useMemo, useState } from 'react';
import {
  Check,
  CircleAlert,
  Download,
  FileText,
  Info,
  Loader2,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import type { Language } from '../../../types';

type Teks = { id: string; en: string };
type Ikon = React.ComponentType<{ className?: string }>;

/* ============================== DATA ============================== */

/** Nomor hotline Insurance Center. */
const WA_DISPLAY = '0811-9000-1404';
const WA_LINK = '6281190001404';

/** Daftar penjamin yang dikenal untuk fitur "Cek Asuransi". */
const PENJAMIN = [
  'prudential', 'allianz', 'manulife', 'aia', 'axa', 'cigna', 'great eastern',
  'admedika', 'fullmoon', 'synnex', 'inhealth', 'medicard', 'virada', 'avrist',
  'fusion care', 'healthpoint', 'bri life', 'bni life', 'jinam', 'ekamei',
];

/** Isi formulir klaim (pratinjau demo). */
const ISI_FORM: Teks[] = [
  { id: 'Identitas pasien & nomor polis', en: 'Patient identity & policy number' },
  { id: 'Rincian diagnosis & tindakan', en: 'Diagnosis & procedure details' },
  { id: 'Rincian biaya & penandatanganan dokter', en: 'Cost breakdown & doctor signature' },
];

/* ============================ SUB-KOMPONEN ============================ */

const KartuWidget: React.FC<{ ikon: Ikon; judul: string; sub: string; children: React.ReactNode }> = ({
  ikon: IkonEl,
  judul,
  sub,
  children,
}) => (
  <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-700">
      <IkonEl className="h-7 w-7" />
    </span>
    <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-900">{judul}</h3>
    <p className="mt-1 text-base leading-relaxed text-slate-500">{sub}</p>
    <div className="mt-6 flex flex-1 flex-col">{children}</div>
  </div>
);

/* ================================ WIDGETS ================================ */

const AlurAsuransiWidgets: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (t: Teks) => t[lang];

  /* ---- Widget 1: Cek Asuransi ---- */
  const [asuransi, setAsuransi] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'found' | 'miss'>('idle');
  const cek = (e: React.FormEvent) => {
    e.preventDefault();
    const term = asuransi.trim().toLowerCase();
    if (!term) return;
    setStatus('loading');
    setTimeout(() => {
      const cocok = PENJAMIN.some((p) => p.includes(term) || term.includes(p));
      setStatus(cocok ? 'found' : 'miss');
    }, 700);
  };

  /* ---- Widget 2: Download Formulir (demo) ---- */
  const [formState, setFormState] = useState<'idle' | 'loading' | 'ready'>('idle');
  const unduh = () => {
    setFormState('loading');
    setTimeout(() => setFormState('ready'), 700);
  };

  const waText = useMemo(
    () =>
      encodeURIComponent(
        lang === 'en'
          ? 'Hi Insurance Center RS Medistra Horizon, I would like to ask about my insurance coverage.'
          : 'Halo Insurance Center RS Medistra Horizon, saya ingin bertanya tentang penjaminan asuransi saya.',
      ),
    [lang],
  );

  return (
    <section id="bantuan" className="scroll-mt-28 bg-slate-50 py-20">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
          {L({ id: 'Bantuan Asuransi', en: 'Insurance Help' })}
        </h2>
        <div className="mt-5 h-px w-full bg-slate-200" />
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
          {L({
            id: 'Pastikan asuransi Anda rekanan kami, ambil formulir klaim, atau hubungi hotline kami.',
            en: 'Check whether your insurer is our partner, grab the claim form, or reach our hotline.',
          })}
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* ============ WIDGET 1: CEK ASURANSI ============ */}
          <KartuWidget
            ikon={ShieldCheck}
            judul={L({ id: 'Cek Asuransi Saya', en: 'Check My Insurance' })}
            sub={L({ id: 'Telusuri apakah penjamin Anda rekanan kami.', en: 'See if your insurer is our partner.' })}
          >
            <form onSubmit={cek} className="flex flex-col gap-3">
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={asuransi}
                  onChange={(e) => {
                    setAsuransi(e.target.value);
                    setStatus('idle');
                  }}
                  placeholder={L({ id: 'mis. Prudential / AdMedika', en: 'e.g. Prudential / AdMedika' })}
                  aria-label={L({ id: 'Nama asuransi', en: 'Insurance name' })}
                  className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-12 pr-4 text-base font-semibold text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <button
                type="submit"
                disabled={!asuransi.trim() || status === 'loading'}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-base font-extrabold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {status === 'loading' ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
                {L({ id: 'Cek', en: 'Check' })}
              </button>
            </form>

            {status === 'found' && (
              <div className="mt-4 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                <p className="text-sm font-semibold leading-relaxed text-emerald-800">
                  {L({
                    id: `“${asuransi}” terdaftar sebagai mitra cashless kami. Bawa kartu & KTP ke counter asuransi.`,
                    en: `“${asuransi}” is a registered cashless partner. Bring your card & ID to the insurance counter.`,
                  })}
                </p>
              </div>
            )}
            {status === 'miss' && (
              <div className="mt-4 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
                <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                <p className="text-sm font-semibold leading-relaxed text-amber-800">
                  {L({
                    id: `Kami belum menemukan “${asuransi}”. Anda tetap bisa via reimbursement, hubungi hotline kami untuk memastikan.`,
                    en: `We couldn’t find “${asuransi}”. You can still go via reimbursement, contact our hotline to confirm.`,
                  })}
                </p>
              </div>
            )}
            <p className="mt-auto pt-4 text-sm font-semibold text-slate-400">
              {L({ id: 'Pencocokan demo, daftar final dikonfirmasi tim asuransi.', en: 'Demo matching, the final list is confirmed by our insurance team.' })}
            </p>
          </KartuWidget>

          {/* ============ WIDGET 2: DOWNLOAD FORMULIR ============ */}
          <KartuWidget
            ikon={FileText}
            judul={L({ id: 'Download Formulir Klaim', en: 'Download Claim Form' })}
            sub={L({ id: 'Formulir medis untuk pengajuan klaim.', en: 'The medical form for filing a claim.' })}
          >
            <button
              type="button"
              onClick={unduh}
              disabled={formState === 'loading'}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-base font-extrabold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 active:scale-[0.98] disabled:opacity-60"
            >
              {formState === 'loading' ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
              {L({ id: 'Download PDF Formulir', en: 'Download PDF Form' })}
            </button>

            {formState === 'ready' && (
              <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-4">
                <p className="text-sm font-extrabold text-blue-800">{L({ id: 'Isi formulir:', en: 'The form contains:' })}</p>
                <ul className="mt-2 space-y-1.5">
                  {ISI_FORM.map((f) => (
                    <li key={f.id} className="flex items-start gap-2 text-sm font-semibold text-blue-800">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                      {L(f)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p className="mt-auto flex items-start gap-2 pt-4 text-sm font-semibold text-slate-400">
              <Info className="mt-0.5 h-4 w-4 shrink-0" />
              {L({
                id: 'Versi demo, formulir resmi tersedia di Counter Asuransi.',
                en: 'Demo version, the official form is available at the Insurance Counter.',
              })}
            </p>
          </KartuWidget>

          {/* ============ WIDGET 3: HOTLINE ============ */}
          <KartuWidget
            ikon={Phone}
            judul={L({ id: 'Hotline Insurance Center', en: 'Insurance Center Hotline' })}
            sub={L({ id: 'Helpdesk khusus penjaminan asuransi.', en: 'A dedicated coverage helpdesk.' })}
          >
            <p className="text-4xl font-extrabold tracking-tight text-blue-700">{WA_DISPLAY}</p>
            <p className="mt-1 text-base text-slate-500">
              {L({ id: 'Sen - Sab · 08.00 - 17.00 WIB', en: 'Mon - Sat · 08.00 - 17.00 WIB' })}
            </p>
            <a
              href={`https://wa.me/${WA_LINK}?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-3 rounded-xl bg-emerald-600 px-6 py-4 text-lg font-extrabold text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-700 active:scale-[0.98]"
            >
              <MessageCircle className="h-5 w-5" />
              {L({ id: 'Chat via WhatsApp', en: 'Chat via WhatsApp' })}
            </a>
            <p className="mt-auto pt-4 text-sm font-semibold text-slate-500">
              {L({
                id: 'Butuh surat jaminan cepat? Tim kami siap membantu.',
                en: 'Need a fast guarantee letter? Our team is ready to help.',
              })}
            </p>
          </KartuWidget>
        </div>
      </div>
    </section>
  );
};

export default AlurAsuransiWidgets;
