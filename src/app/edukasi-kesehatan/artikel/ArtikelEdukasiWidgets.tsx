'use client';

import React, { useState } from 'react';
import { BadgeCheck, Mail, MessageCircle, Send, Sparkles } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import type { Language } from '../../../types';

type Teks = { id: string; en: string };

/**
 * ArtikelNewsletter — panel kanan (kolom "intent rendah") dari Split Banner
 * terpadu di halaman Artikel. Bukan section mandiri: hanya isi kartu
 * (badge, judul, deskripsi, benefit ringkas, form WA/email) yang dipasang
 * di dalam grid 2 kolom pada ArtikelEdukasiClient.
 * State form terkontrol: idle → loading (meniru pengiriman) → sukses.
 * Light theme beraksen cyan/blue, tanpa warna gelap.
 */
const ArtikelNewsletter: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (t: Teks) => t[lang];

  const [kontak, setKontak] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'sukses'>('idle');

  const kirim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kontak.trim()) return;
    setStatus('loading');
    setTimeout(() => setStatus('sukses'), 900);
  };

  return (
    <div id="newsletter" className="flex h-full scroll-mt-28 flex-col">
      <span className="inline-flex w-fit items-center gap-2 rounded-full bg-cyan-100/70 px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-cyan-800">
        <Sparkles className="h-4 w-4" />
        {L({ id: 'Langganan Edukasi', en: 'Subscribe' })}
      </span>
      <h3 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight text-slate-900 lg:text-3xl">
        {L({
          id: 'Dapatkan Tips Kesehatan Mingguan',
          en: 'Get Weekly Health Tips',
        })}
      </h3>
      <p className="mt-3 text-lg leading-relaxed text-slate-600">
        {L({
          id: 'Ringkasan artikel & pengingat MCU langsung di WhatsApp atau Email Anda. Tanpa spam, berhenti kapan saja.',
          en: 'An article digest & health-check reminders straight to your WhatsApp or Email. No spam, unsubscribe anytime.',
        })}
      </p>

      {/* Benefit ringkas satu baris agar hemat ruang vertikal */}
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
        {[
          { id: 'Artikel terbaru tiap Jumat', en: 'Latest articles every Friday' },
          { id: 'Pengingat MCU sesuai usia', en: 'Age-based MCU reminders' },
          { id: 'Promo paket kesehatan', en: 'Health package promos' },
        ].map((f) => (
          <li key={f.id} className="flex items-center gap-2 text-sm font-semibold text-slate-600">
            <BadgeCheck className="h-4 w-4 shrink-0 text-cyan-600" />
            {L(f)}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        {status === 'sukses' ? (
          <div className="flex flex-col items-center rounded-2xl border border-emerald-200 bg-emerald-50/60 px-6 py-8 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <BadgeCheck className="h-7 w-7" />
            </span>
            <h4 className="mt-4 text-xl font-extrabold tracking-tight text-slate-900">
              {L({ id: 'Berhasil Berlangganan!', en: 'Subscribed!' })}
            </h4>
            <p className="mt-2 max-w-sm text-base leading-relaxed text-slate-600">
              {L({
                id: 'Edukasi kesehatan pertama akan kami kirim ke Anda pekan depan.',
                en: 'Your first health digest will be sent next week.',
              })}
            </p>
            <button
              type="button"
              onClick={() => {
                setKontak('');
                setStatus('idle');
              }}
              className="mt-5 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-base font-semibold text-slate-700 transition-colors hover:border-cyan-400 hover:text-cyan-700"
            >
              {L({ id: 'Langganan lain', en: 'Subscribe another' })}
            </button>
          </div>
        ) : (
          <form onSubmit={kirim} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm lg:p-6">
            <label className="text-base font-bold text-slate-800" htmlFor="nl-kontak">
              {L({ id: 'Nomor WhatsApp atau Email Anda', en: 'Your WhatsApp Number or Email' })}
            </label>
            <div className="relative mt-3">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                {/\S+@\S+\.\S+/.test(kontak) ? <Mail className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
              </span>
              <input
                id="nl-kontak"
                type="text"
                value={kontak}
                onChange={(e) => setKontak(e.target.value)}
                placeholder={L({
                  id: 'Contoh: 0811-9000-1404 atau nama@email.com',
                  en: 'e.g. 0811-9000-1404 or name@email.com',
                })}
                className="w-full rounded-xl border border-slate-300 bg-white py-4 pl-14 pr-4 text-lg text-slate-800 placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-100"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading' || !kontak.trim()}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-700 px-6 py-4 text-lg font-bold text-white shadow-lg shadow-cyan-600/25 transition-all hover:from-cyan-700 hover:to-blue-800 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send className="h-5 w-5" />
              {status === 'loading'
                ? L({ id: 'Mengirim…', en: 'Sending…' })
                : L({ id: 'Langganan Gratis', en: 'Subscribe for Free' })}
            </button>
            <p className="mt-3 text-sm font-medium text-slate-500">
              {L({
                id: 'Dengan berlangganan, Anda menyetujui kebijakan privasi kami. Data hanya dipakai untuk edukasi.',
                en: 'By subscribing you agree to our privacy policy. Data is used for education only.',
              })}
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default ArtikelNewsletter;
