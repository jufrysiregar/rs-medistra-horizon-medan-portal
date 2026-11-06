'use client';

import React, { useState } from 'react';
import { Check, ChevronDown, Handshake, Info, Loader2, Send } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import type { Language } from '../../../types';
import KerjasamaFaq from './KerjasamaFaq';

type Teks = { id: string; en: string };

/* ============================== DATA ============================== */

/** Opsi kategori calon mitra. */
const KATEGORI: Teks[] = [
  { id: 'Asuransi / TPA', en: 'Insurance / TPA' },
  { id: 'Corporate', en: 'Corporate' },
  { id: 'Farmasi', en: 'Pharmaceutical' },
  { id: 'Faskes', en: 'Health Facility' },
];

/** FAQ kemitraan dipindah ke komponen <KerjasamaFaq /> (split-layout 2 kolom). */


/* ================================ WIDGETS ================================ */

const KerjasamaWidgets: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (t: Teks) => t[lang];

  /* ---- Form B2B ---- */
  const kosong = { perusahaan: '', kategori: '', pic: '', jabatan: '', wa: '', email: '', pesan: '' };
  const [form, setForm] = useState(kosong);
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent'>('idle');
  const set =
    (k: keyof typeof kosong) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [k]: e.target.value }));
  const kirim = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => setStatus('sent'), 900);
  };

  const label = (t: string) => (
    <label className="mb-1.5 block text-base font-bold text-slate-700">{t}</label>
  );
  const inputCls =
    'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base font-medium text-slate-800 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200';

  return (
    <>
      {/* ============ 5. FORMULIR B2B ============ */}
      <section id="ajukan" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-14">
            {/* Kiri: intro */}
            <div>
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-800 text-white shadow-lg shadow-blue-800/20">
                <Handshake className="h-7 w-7" />
              </span>
              <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                {L({ id: 'Ajukan Kerja Sama (B2B)', en: 'Propose a Partnership (B2B)' })}
              </h2>
              <div className="mt-5 h-px w-full bg-slate-200" />
              <p className="mt-6 text-lg leading-relaxed text-slate-600">
                {L({
                  id: 'Ceritakan rencana kolaborasi Anda. Tim Kemitraan kami akan menindaklanjuti proposal dalam 5-10 hari kerja.',
                  en: 'Tell us about your collaboration plan. Our Partnership team will follow up within 5-10 working days.',
                })}
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  { id: 'Respons cepat dari tim Marketing Kemitraan', en: 'Prompt response from the Partnership Marketing team' },
                  { id: 'Negosiasi tarif yang transparan', en: 'Transparent rate negotiation' },
                  { id: 'Integrasi sistem & pendampingan hingga aktivasi', en: 'System integration & support through activation' },
                ].map((b) => (
                  <li key={b.id} className="flex items-start gap-3 text-base text-slate-700">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-cyan-700">
                      <Check className="h-4 w-4" />
                    </span>
                    {L(b)}
                  </li>
                ))}
              </ul>
            </div>

            {/* Kanan: kartu form */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
              {status === 'sent' ? (
                <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <Check className="h-8 w-8" />
                  </span>
                  <h3 className="mt-5 text-2xl font-extrabold text-slate-900">
                    {L({ id: 'Proposal Terkirim', en: 'Proposal Submitted' })}
                  </h3>
                  <p className="mt-2 max-w-md text-lg leading-relaxed text-slate-600">
                    {L({
                      id: `Terima kasih, ${form.perusahaan || 'rekan kami'}. Tim Kemitraan akan menghubungi Anda melalui WhatsApp/Email yang diberikan.`,
                      en: `Thank you, ${form.perusahaan || 'our partner'}. Our Partnership team will reach out via the WhatsApp/Email you provided.`,
                    })}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setForm(kosong);
                      setStatus('idle');
                    }}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-base font-extrabold text-slate-700 transition hover:bg-slate-100"
                  >
                    {L({ id: 'Kirim proposal lain', en: 'Submit another proposal' })}
                  </button>
                </div>
              ) : (
                <form onSubmit={kirim} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    {label(L({ id: 'Nama Perusahaan', en: 'Company Name' }))}
                    <input
                      type="text"
                      required
                      value={form.perusahaan}
                      onChange={set('perusahaan')}
                      placeholder={L({ id: 'PT Contoh Sejahtera', en: 'PT Example Health' })}
                      className={inputCls}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    {label(L({ id: 'Kategori', en: 'Category' }))}
                    <div className="relative">
                      <select
                        required
                        value={form.kategori}
                        onChange={set('kategori')}
                        className={`${inputCls} appearance-none pr-11 ${form.kategori ? '' : 'text-slate-400'}`}
                      >
                        <option value="" disabled>
                          {L({ id: 'Pilih kategori mitra', en: 'Select partner category' })}
                        </option>
                        {KATEGORI.map((k) => (
                          <option key={k.id} value={L(k)} className="text-slate-800">
                            {L(k)}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    </div>
                  </div>

                  <div>
                    {label(L({ id: 'Nama PIC', en: 'Contact Person' }))}
                    <input
                      type="text"
                      required
                      value={form.pic}
                      onChange={set('pic')}
                      placeholder={L({ id: 'Nama lengkap', en: 'Full name' })}
                      className={inputCls}
                    />
                  </div>

                  <div>
                    {label(L({ id: 'Jabatan PIC', en: 'PIC Position' }))}
                    <input
                      type="text"
                      value={form.jabatan}
                      onChange={set('jabatan')}
                      placeholder={L({ id: 'mis. Manager HR', en: 'e.g. HR Manager' })}
                      className={inputCls}
                    />
                  </div>

                  <div>
                    {label(L({ id: 'No. WhatsApp', en: 'WhatsApp Number' }))}
                    <input
                      type="tel"
                      required
                      value={form.wa}
                      onChange={set('wa')}
                      placeholder="0812-xxxx-xxxx"
                      className={inputCls}
                    />
                  </div>

                  <div>
                    {label(L({ id: 'Email', en: 'Email' }))}
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={set('email')}
                      placeholder="nama@perusahaan.co.id"
                      className={inputCls}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    {label(L({ id: 'Pesan / Rencana Kerja Sama', en: 'Message / Collaboration Plan' }))}
                    <textarea
                      rows={4}
                      value={form.pesan}
                      onChange={set('pesan')}
                      placeholder={L({
                        id: 'Jelaskan singkat kebutuhan & skema kolaborasi yang Anda bayangkan…',
                        en: 'Briefly describe your needs and the collaboration scheme you envision…',
                      })}
                      className={`${inputCls} resize-none`}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-800 px-6 py-4 text-lg font-extrabold text-white shadow-lg shadow-blue-800/25 transition-all hover:bg-blue-900 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === 'loading' ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                      {L({ id: 'Kirim Proposal Kerja Sama', en: 'Submit Partnership Proposal' })}
                    </button>
                    <p className="mt-3 flex items-start gap-2 text-sm font-semibold text-slate-400">
                      <Info className="mt-0.5 h-4 w-4 shrink-0" />
                      {L({
                        id: 'Formulir demo, pengajuan resmi diproses oleh tim Kemitraan setelah verifikasi berkas.',
                        en: 'Demo form, official submissions are processed by the Partnership team after document verification.',
                      })}
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============ 6. FAQ KEMITRAAN (split-layout 2 kolom) ============ */}
      <KerjasamaFaq />
    </>
  );
};

export default KerjasamaWidgets;
