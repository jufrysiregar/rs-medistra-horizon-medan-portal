'use client';

import React, { useState } from 'react';
import {
  Activity,
  Ambulance,
  Apple,
  ArrowRight,
  Building2,
  Check,
  ChevronDown,
  CircleHelp,
  Droplet,
  HeartPulse,
  Hospital,
  Info,
  Play,
  Route,
  Siren,
  Smartphone,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import type { Language } from '../../../types';

type Teks = { id: string; en: string };
type Ikon = React.ComponentType<{ className?: string }>;

/* ============================== DATA ============================== */

/** Tautan unduhan aplikasi Mobile JKN. */
const PLAYSTORE = 'https://play.google.com/store/apps/details?id=app.bpjs.mobile';
const APPSTORE = 'https://apps.apple.com/app/mobile-jkn/id1357968532';

/** Tahapan rujukan berjenjang BPJS. */
const RUJUKAN: { judul: Teks; ket: Teks; ikon: Ikon }[] = [
  { judul: { id: 'FKTP (Puskesmas/Klinik)', en: 'Primary Care Facility' }, ket: { id: 'Pemeriksaan awal & pengobatan sesuai kemampuan.', en: 'Initial check-up & treatment within its capability.' }, ikon: Building2 },
  { judul: { id: 'Surat Rujukan', en: 'Referral Letter' }, ket: { id: 'Diterbitkan bila perlu penanganan spesialis.', en: 'Issued when specialist care is needed.' }, ikon: Route },
  { judul: { id: 'Rumah Sakit', en: 'Hospital' }, ket: { id: 'Pelayanan lanjutan oleh dokter spesialis.', en: 'Advanced care by specialists.' }, ikon: Hospital },
];

/** FAQ BPJS. */
const FAQ: { q: Teks; a: Teks }[] = [
  {
    q: { id: 'Benarkah ke UGD tidak perlu surat rujukan?', en: 'Is the ER really accessible without a referral letter?' },
    a: {
      id: 'Benar. Untuk kondisi gawat darurat yang mengancam nyawa, pasien langsung ditangani tanpa surat rujukan dan SEP UGD diproses di tempat.',
      en: 'Yes. For life-threatening emergencies, patients are treated immediately without a referral letter, and the ER eligibility letter (SEP) is processed on site.',
    },
  },
  {
    q: { id: 'Bagaimana mekanisme surat kontrol (SPRI)?', en: 'How does the follow-up letter (SPRI) work?' },
    a: {
      id: 'SPRI diterbitkan dokter DPJP saat pasien rawat inap pulang atau akan kontrol. Bawa SPRI ke poli untuk antrean lanjutan tanpa perlu surat rujukan baru dari FKTP.',
      en: 'The SPRI is issued by the treating specialist when an inpatient is discharged or due for follow-up. Bring it to the clinic for a continued queue without a new referral from the primary facility.',
    },
  },
  {
    q: { id: 'Bagaimana jika obat saya tidak ada di Fornas?', en: 'What if my medicine is not on the National Formulary?' },
    a: {
      id: 'BPJS menanggung obat dalam Formularium Nasional. Obat di luar Fornas memerlukan persetujuan komite/pemberi kerja penjamin, atau dapat dibayar mandiri sebagian.',
      en: 'BPJS covers medicines within the National Formulary. Drugs outside it need committee/guarantor approval, or may be partly self-paid.',
    },
  },
  {
    q: { id: 'Iuran BPJS saya menunggak, masih bisa berobat?', en: 'My BPJS premiums are overdue, can I still get care?' },
    a: {
      id: 'Kepesertaan aktif kembali setelah tunggakan diselesaikan (bisa melalui program cicilan/restrukturisasi). Pastikan status aktif pada aplikasi Mobile JKN sebelum berobat.',
      en: 'Membership becomes active again once the arrears are settled (via an instalment/restructuring scheme). Confirm the active status in the Mobile JKN app before seeking care.',
    },
  },
];

/** Gejala untuk alat "Cek Kriteria Gawat Darurat". */
const GEJALA: { label: Teks; ikon: Ikon }[] = [
  { label: { id: 'Penurunan kesadaran / pingsan', en: 'Unconsciousness / fainting' }, ikon: HeartPulse },
  { label: { id: 'Nyeri dada hebat', en: 'Severe chest pain' }, ikon: Activity },
  { label: { id: 'Sesak napas berat', en: 'Severe breathlessness' }, ikon: Droplet },
  { label: { id: 'Kejang berulang', en: 'Repeated seizures' }, ikon: Siren },
  { label: { id: 'Kecelakaan / trauma & pendarahan', en: 'Accident / trauma & bleeding' }, ikon: Ambulance },
];

/* ============================ SUB-KOMPONEN ============================ */

const KartuWidget: React.FC<{ ikon: Ikon; judul: string; sub: string; children: React.ReactNode }> = ({
  ikon: IkonEl,
  judul,
  sub,
  children,
}) => (
  <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700">
      <IkonEl className="h-7 w-7" />
    </span>
    <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-900">{judul}</h3>
    <p className="mt-1 text-base leading-relaxed text-slate-500">{sub}</p>
    <div className="mt-6 flex flex-1 flex-col">{children}</div>
  </div>
);

/* ================================ WIDGETS ================================ */

const AlurBpjsWidgets: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (t: Teks) => t[lang];

  /* ---- FAQ accordion ---- */
  const [buka, setBuka] = useState<number | null>(0);

  /* ---- Cek kriteria gawat darurat ---- */
  const [terpilih, setTerpilih] = useState<number[]>([]);
  const [pernahCek, setPernahCek] = useState(false);
  const toggle = (i: number) => {
    setPernahCek(true);
    setTerpilih((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));
  };
  const gawat = terpilih.length > 0;

  return (
    <section id="bantuan" className="scroll-mt-28 bg-white py-20">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
          {L({ id: 'Layanan Digital & Bantuan', en: 'Digital Services & Help' })}
        </h2>
        <div className="mt-5 h-px w-full bg-slate-200" />
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
          {L({
            id: 'Unduh Mobile JKN, pahami alur rujukan berjenjang, dan temukan jawaban atas pertanyaan umum peserta BPJS.',
            en: 'Download Mobile JKN, understand the tiered referral flow, and find answers to common BPJS member questions.',
          })}
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* ============ WIDGET 1: DOWNLOAD MOBILE JKN ============ */}
          <KartuWidget
            ikon={Smartphone}
            judul={L({ id: 'Download Mobile JKN', en: 'Download Mobile JKN' })}
            sub={L({ id: 'Antrean, e-Card, & cek kepesertaan di genggaman.', en: 'Queueing, e-Card & membership checks in your hand.' })}
          >
            <div className="flex flex-col gap-3">
              <a
                href={PLAYSTORE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-emerald-600 px-6 py-3.5 text-base font-extrabold text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-700 active:scale-[0.98]"
              >
                <Play className="h-5 w-5" />
                {L({ id: 'Get it on Google Play', en: 'Get it on Google Play' })}
              </a>
              <a
                href={APPSTORE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-extrabold text-slate-800 shadow-sm transition-all hover:border-slate-400 hover:bg-slate-50 active:scale-[0.98]"
              >
                <Apple className="h-5 w-5" />
                {L({ id: 'Download on the App Store', en: 'Download on the App Store' })}
              </a>
            </div>
            <p className="mt-auto flex items-start gap-2 pt-4 text-sm font-semibold text-slate-400">
              <Info className="mt-0.5 h-4 w-4 shrink-0" />
              {L({ id: 'Tautan menuju halaman resmi aplikasi Mobile JKN.', en: 'Links to the official Mobile JKN app pages.' })}
            </p>
          </KartuWidget>

          {/* ============ WIDGET 2: INFOGRAFIS RUJUKAN BERJENJANG ============ */}
          <KartuWidget
            ikon={Route}
            judul={L({ id: 'Infografis Rujukan Berjenjang', en: 'Tiered Referral Infographic' })}
            sub={L({ id: 'Alur layanan dari faskes pertama hingga rumah sakit.', en: 'The care path from primary facility to hospital.' })}
          >
            <ol className="flex flex-1 flex-col gap-2">
              {RUJUKAN.map((r, i) => (
                <React.Fragment key={r.judul.id}>
                  <li className="flex items-start gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white">
                      <r.ikon className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="text-base font-extrabold text-slate-900">
                        {i + 1}. {L(r.judul)}
                      </p>
                      <p className="text-sm leading-relaxed text-slate-600">{L(r.ket)}</p>
                    </div>
                  </li>
                  {i < RUJUKAN.length - 1 && (
                    <div className="flex justify-center py-0.5" aria-hidden>
                      <ArrowRight className="h-5 w-5 rotate-90 text-emerald-400" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </ol>
          </KartuWidget>

          {/* ============ WIDGET 3: FAQ BPJS ============ */}
          <KartuWidget
            ikon={CircleHelp}
            judul={L({ id: 'FAQ BPJS', en: 'BPJS FAQ' })}
            sub={L({ id: 'Pertanyaan umum seputar pelayanan JKN-KIS.', en: 'Common questions about JKN-KIS services.' })}
          >
            <div className="flex flex-1 flex-col gap-3">
              {FAQ.map((f, i) => {
                const aktif = buka === i;
                return (
                  <div key={f.q.id} className={`overflow-hidden rounded-xl border ${aktif ? 'border-emerald-300 bg-emerald-50/50' : 'border-slate-200 bg-slate-50'}`}>
                    <button
                      type="button"
                      onClick={() => setBuka(aktif ? null : i)}
                      aria-expanded={aktif}
                      className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                    >
                      <span className="text-sm font-bold text-slate-800">{L(f.q)}</span>
                      <ChevronDown className={`h-5 w-5 shrink-0 text-emerald-600 transition-transform ${aktif ? 'rotate-180' : ''}`} />
                    </button>
                    {aktif && (
                      <div className="border-t border-emerald-100 bg-white px-4 py-3">
                        <p className="text-sm leading-relaxed text-slate-600">{L(f.a)}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </KartuWidget>
        </div>

        {/* ============ ALAT INTERAKTIF: CEK KRITERIA GAWAT DARURAT ============ */}
        <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm sm:p-10">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/25">
              <Siren className="h-7 w-7" />
            </span>
            <div>
              <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">
                {L({ id: 'Cek Kriteria Gawat Darurat', en: 'Check Emergency Criteria' })}
              </h3>
              <p className="mt-1 text-lg leading-relaxed text-slate-600">
                {L({
                  id: 'Pilih gejala yang Anda alami untuk memperkirakan apakah termasuk kondisi gawat darurat.',
                  en: 'Select the symptoms present to estimate whether this is an emergency.',
                })}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {GEJALA.map((g, i) => {
              const on = terpilih.includes(i);
              return (
                <button
                  key={g.label.id}
                  type="button"
                  onClick={() => toggle(i)}
                  aria-pressed={on}
                  className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-base font-semibold transition ${
                    on
                      ? 'border-emerald-500 bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
                      : 'border-slate-300 bg-white text-slate-700 hover:border-emerald-300 hover:bg-emerald-50'
                  }`}
                >
                  <g.ikon className="h-5 w-5 shrink-0" />
                  {L(g.label)}
                </button>
              );
            })}
          </div>

          {pernahCek && (
            <div
              className={`mt-6 flex items-start gap-3 rounded-2xl border p-5 ${
                gawat ? 'border-emerald-200 bg-emerald-50' : 'border-amber-200 bg-amber-50'
              }`}
            >
              {gawat ? (
                <Check className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" />
              ) : (
                <Info className="mt-0.5 h-6 w-6 shrink-0 text-amber-600" />
              )}
              <p className={`text-lg font-semibold leading-relaxed ${gawat ? 'text-emerald-800' : 'text-amber-800'}`}>
                {gawat
                  ? L({
                      id: 'Termasuk kriteria gawat darurat. Segera datangi UGD 24 jam, tidak memerlukan surat rujukan, SEP diproses di tempat.',
                      en: 'This meets emergency criteria. Go to the 24-hour ER right away, no referral letter needed, the SEP is processed on site.',
                    })
                  : L({
                      id: 'Belum termasuk gawat darurat. Sebaiknya berobat melalui FKTP (Puskesmas/Klinik) dan bawa surat rujukan bila diperlukan.',
                      en: 'Not yet an emergency. Please start care at the primary facility and bring a referral letter if needed.',
                    })}
              </p>
            </div>
          )}
          <p className="mt-4 text-sm font-semibold text-slate-400">
            {L({
              id: 'Alat bantu edukasi, bukan pengganti penilaian medis. Dalam keadaan darurat, segera hubungi UGD.',
              en: 'An educational aid, not a substitute for medical judgement. In an emergency, contact the ER immediately.',
            })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AlurBpjsWidgets;
