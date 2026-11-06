'use client';

import React, { useState } from 'react';
import {
  Archive,
  BadgeCheck,
  Building2,
  Check,
  Droplets,
  Flame,
  Image as ImageIcon,
  Info,
  Loader2,
  Package,
  Play,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import type { Language } from '../../../types';

type Teks = { id: string; en: string };
type Ikon = React.ComponentType<{ className?: string }>;

/* ============================== DATA ============================== */

/** Versi ringkas alur 4 zona untuk infografis pada widget. */
const ZONA_MINI: { no: number; nama: Teks; ikon: Ikon; kelas: string }[] = [
  { no: 1, nama: { id: 'Dekontaminasi', en: 'Decontamination' }, ikon: Droplets, kelas: 'border-rose-200 bg-rose-50 text-rose-700' },
  { no: 2, nama: { id: 'Pengemasan', en: 'Packaging' }, ikon: Package, kelas: 'border-amber-200 bg-amber-50 text-amber-700' },
  { no: 3, nama: { id: 'Sterilisasi', en: 'Sterilisation' }, ikon: Flame, kelas: 'border-sky-200 bg-sky-50 text-sky-700' },
  { no: 4, nama: { id: 'Penyimpanan', en: 'Storage' }, ikon: Archive, kelas: 'border-emerald-200 bg-emerald-50 text-emerald-700' },
];

/* ============================ SUB-KOMPONEN ============================ */

const KartuWidget: React.FC<{ ikon: Ikon; judul: string; sub: string; children: React.ReactNode; id?: string }> = ({
  ikon: IkonEl,
  judul,
  sub,
  children,
  id,
}) => (
  <div id={id} className="flex h-full scroll-mt-28 flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-100 bg-cyan-50 text-cyan-700">
      <IkonEl className="h-7 w-7" />
    </span>
    <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-900">{judul}</h3>
    <p className="mt-1 text-base leading-relaxed text-slate-500">{sub}</p>
    <div className="mt-6 flex flex-1 flex-col">{children}</div>
  </div>
);

const kelasInput =
  'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-800 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30';

/* ================================ WIDGETS ================================ */

const SterilisasiWidgets: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (t: Teks) => t[lang];

  /* ---- Widget 1: Infografis Alur 4 Zona ---- */
  const [mode, setMode] = useState<'idle' | 'gambar' | 'video'>('idle');

  /* ---- Widget 3: Form Kemitraan B2B ---- */
  const [klinik, setKlinik] = useState('');
  const [pic, setPic] = useState('');
  const [hp, setHp] = useState('');
  const [statusForm, setStatusForm] = useState<'idle' | 'loading' | 'sent'>('idle');

  const kirim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!klinik.trim() || !pic.trim() || hp.trim().length < 8) return;
    setStatusForm('loading');
    // Simulasi pengiriman singkat; integrasi nyata terhubung ke CRM kemitraan.
    setTimeout(() => setStatusForm('sent'), 900);
  };

  return (
    <section id="layanan-digital" className="scroll-mt-28 bg-slate-50 py-20">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
          {L({ id: 'Jaminan Mutu & Kemitraan', en: 'Quality Assurance & Partnership' })}
        </h2>
        <div className="mt-5 h-px w-full bg-slate-200" />
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
          {L({
            id: 'Pahami alur sterilisasi, lihat jaminan mutu kami, dan ajukan kerja sama untuk fasilitas kesehatan Anda.',
            en: 'Understand the sterilisation flow, see our quality guarantee, and propose a partnership for your facility.',
          })}
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* ============ WIDGET 1: INFOGRAFIS ALUR ============ */}
          <KartuWidget
            ikon={Play}
            judul={L({ id: 'Infografis Alur 4 Zona', en: 'Four-Zone Flow Infographic' })}
            sub={L({ id: 'Putar video atau lihat gambar alurnya.', en: 'Play the video or view the diagram.' })}
          >
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setMode('video')}
                className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold transition ${
                  mode === 'video' ? 'border-cyan-600 bg-cyan-600 text-white' : 'border-slate-300 bg-white text-slate-700 hover:border-cyan-400'
                }`}
              >
                <Play className="h-4 w-4" /> {L({ id: 'Putar Video', en: 'Play Video' })}
              </button>
              <button
                type="button"
                onClick={() => setMode('gambar')}
                className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold transition ${
                  mode === 'gambar' ? 'border-cyan-600 bg-cyan-600 text-white' : 'border-slate-300 bg-white text-slate-700 hover:border-cyan-400'
                }`}
              >
                <ImageIcon className="h-4 w-4" /> {L({ id: 'Lihat Gambar', en: 'View Image' })}
              </button>
            </div>

            <div className="mt-4 flex-1">
              {mode === 'idle' && (
                <div className="flex h-full min-h-[12rem] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-center">
                  <Info className="h-6 w-6 text-slate-400" />
                  <p className="mt-2 text-sm font-semibold text-slate-500">
                    {L({ id: 'Pilih video atau gambar untuk menampilkan alur.', en: 'Choose video or image to display the flow.' })}
                  </p>
                </div>
              )}

              {mode === 'gambar' && (
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="grid grid-cols-4 gap-2">
                    {ZONA_MINI.map((z) => (
                      <div key={z.no} className={`flex flex-col items-center gap-1.5 rounded-lg border p-2 text-center ${z.kelas}`}>
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80">
                          <z.ikon className="h-4 w-4" />
                        </span>
                        <span className="text-[11px] font-bold leading-tight text-slate-700">{L(z.nama)}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-center text-xs font-semibold text-slate-500">
                    {L({ id: 'Alur satu arah: kotor → bersih → steril.', en: 'One-way flow: dirty → clean → sterile.' })}
                  </p>
                </div>
              )}

              {mode === 'video' && (
                <div className="relative flex h-full min-h-[12rem] items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-cyan-50 to-sky-50">
                  <div className="flex flex-col items-center gap-2">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-600 text-white shadow-lg shadow-cyan-600/30">
                      <Play className="h-6 w-6" />
                    </span>
                    <p className="text-sm font-bold text-cyan-800">
                      {L({ id: 'Video 4 Zona CSSD', en: 'CSSD Four-Zone Video' })}
                    </p>
                    <p className="text-xs font-semibold text-slate-500">
                      {L({ id: 'Pratinjau, video lengkap diputar di ruang edukasi.', en: 'Preview, full video plays in the education room.' })}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </KartuWidget>

          {/* ============ WIDGET 2: BADGE JAMINAN KUALITAS ============ */}
          <KartuWidget
            ikon={ShieldCheck}
            judul={L({ id: 'Badge Jaminan Kualitas', en: 'Quality Assurance Badge' })}
            sub={L({ id: 'Setiap paket keluar telah lolos uji.', en: 'Every released pack has passed testing.' })}
          >
            <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border-2 border-cyan-200 bg-cyan-50 p-6 text-center">
              <span className="relative flex h-24 w-24 items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-cyan-100" />
                <ShieldCheck className="relative h-14 w-14 text-cyan-600" />
                <span className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-emerald-500 text-white">
                  <Check className="h-5 w-5" />
                </span>
              </span>
              <p className="mt-5 text-xl font-extrabold leading-tight tracking-tight text-cyan-800">
                {L({ id: '100% Certified Sterile & Traceable', en: '100% Certified Sterile & Traceable' })}
              </p>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-600">
                {L({
                  id: 'Diuji fisik, kimia & biologi. Bertanggal kedaluwarsa dan dapat ditelusuri penuh.',
                  en: 'Physically, chemically & biologically tested. Dated with an expiry and fully traceable.',
                })}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-cyan-200 bg-white px-3 py-1 text-xs font-bold text-cyan-700">
                <BadgeCheck className="h-4 w-4" />
                {L({ id: 'CSSD Terstandar', en: 'Standardised CSSD' })}
              </span>
            </div>
          </KartuWidget>

          {/* ============ WIDGET 3: FORM KEMITRAAN B2B ============ */}
          <KartuWidget
            id="kemitraan-b2b"
            ikon={Building2}
            judul={L({ id: 'Formulir Kemitraan B2B', en: 'B2B Partnership Form' })}
            sub={L({ id: 'Ajukan kerja sama sterilisasi untuk fasilitas Anda.', en: 'Propose a sterilisation partnership for your facility.' })}
          >
            {statusForm === 'sent' ? (
              <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <Check className="h-7 w-7" />
                </span>
                <p className="mt-4 text-lg font-extrabold text-emerald-800">
                  {L({ id: 'Pengajuan terkirim', en: 'Request sent' })}
                </p>
                <p className="mt-1 text-sm font-semibold leading-relaxed text-emerald-700">
                  {L({
                    id: `Terima kasih, ${pic || 'Anda'}. Tim kemitraan akan menghubungi ${klinik || 'fasilitas Anda'} dalam 1×24 jam kerja.`,
                    en: `Thank you, ${pic || 'you'}. Our partnership team will contact ${klinik || 'your facility'} within 1 business day.`,
                  })}
                </p>
                <button
                  type="button"
                  onClick={() => { setStatusForm('idle'); setKlinik(''); setPic(''); setHp(''); }}
                  className="mt-5 rounded-lg border border-emerald-300 bg-white px-4 py-2 text-sm font-bold text-emerald-700 transition hover:bg-emerald-100"
                >
                  {L({ id: 'Ajukan lagi', en: 'Submit another' })}
                </button>
              </div>
            ) : (
              <form onSubmit={kirim} className="flex flex-1 flex-col gap-3">
                <label className="text-sm font-bold text-slate-700">
                  {L({ id: 'Nama Klinik / Fasilitas', en: 'Clinic / Facility Name' })}
                  <input
                    className={`${kelasInput} mt-1`}
                    type="text"
                    placeholder={L({ id: 'mis. Klinik Sehat Bersama', en: 'e.g. Sehat Bersama Clinic' })}
                    value={klinik}
                    onChange={(e) => setKlinik(e.target.value)}
                  />
                </label>
                <label className="text-sm font-bold text-slate-700">
                  {L({ id: 'Penanggung Jawab (PIC)', en: 'Person in Charge (PIC)' })}
                  <input
                    className={`${kelasInput} mt-1`}
                    type="text"
                    placeholder={L({ id: 'Nama lengkap PIC', en: 'Full PIC name' })}
                    value={pic}
                    onChange={(e) => setPic(e.target.value)}
                  />
                </label>
                <label className="text-sm font-bold text-slate-700">
                  {L({ id: 'No. HP / WhatsApp', en: 'Mobile / WhatsApp No.' })}
                  <input
                    className={`${kelasInput} mt-1`}
                    type="tel"
                    inputMode="tel"
                    placeholder={L({ id: '08xx xxxx xxxx', en: '08xx xxxx xxxx' })}
                    value={hp}
                    onChange={(e) => setHp(e.target.value)}
                  />
                </label>
                <button type="submit" className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 text-base font-extrabold text-white shadow-lg shadow-cyan-600/25 transition-all hover:bg-cyan-700 active:scale-[0.98]">
                  {statusForm === 'loading' ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                  {L({ id: 'Kirim Pengajuan', en: 'Send Request' })}
                </button>
              </form>
            )}
          </KartuWidget>
        </div>

        <p className="mt-8 text-sm font-semibold text-slate-400">
          {L({
            id: 'Catatan: widget di atas adalah tampilan demo. Pengajuan kemitraan final diproses oleh tim bisnis RS.',
            en: 'Note: the widgets above are a demo view. Final partnership requests are processed by the hospital business team.',
          })}
        </p>
      </div>
    </section>
  );
};

export default SterilisasiWidgets;
