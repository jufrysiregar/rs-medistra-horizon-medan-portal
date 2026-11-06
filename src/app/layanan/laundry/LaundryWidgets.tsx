'use client';

import React, { useMemo, useState } from 'react';
import {
  Check,
  ClipboardList,
  Droplets,
  Info,
  Loader2,
  MessageCircle,
  Minus,
  Package,
  Phone,
  Plus,
  Send,
  Shirt,
  Sparkles,
  Truck,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import type { Language } from '../../../types';

type Teks = { id: string; en: string };
type Ikon = React.ComponentType<{ className?: string }>;

/* ============================== DATA ============================== */

/** Nomor kontak (selaras dengan section kontak). */
const EXT_KAMAR = '148';
const WA_DISPLAY = '0812-1122-3344';
const WA_LINK = '6281211223344';

/** Empat langkah alur higienis untuk infografis. */
const ALUR: { judul: Teks; ket: Teks; ikon: Ikon }[] = [
  { judul: { id: 'Jemput', en: 'Pick-up' }, ket: { id: 'Petugas mengambil dari kamar.', en: 'Staff collect from your room.' }, ikon: Truck },
  { judul: { id: 'Cuci di Dirty Room', en: 'Wash in Dirty Room' }, ket: { id: 'Sortir & cuci termal suhu tinggi.', en: 'Sorting & high-heat thermal wash.' }, ikon: Droplets },
  { judul: { id: 'Finishing di Clean Room', en: 'Finish in Clean Room' }, ket: { id: 'Kering, setrika uap, inspeksi.', en: 'Dry, steam-iron, inspect.' }, ikon: Sparkles },
  { judul: { id: 'Antar Tersegel', en: 'Sealed Delivery' }, ket: { id: 'Dikemas & diantar kembali.', en: 'Packed & returned to you.' }, ikon: Package },
];

/** Item default untuk Laundry List Digital. */
const ITEM: { id: string; nama: Teks }[] = [
  { id: 'kaos', nama: { id: 'Kaos / Atasan', en: 'Tops / Shirts' } },
  { id: 'celana', nama: { id: 'Celana', en: 'Trousers' } },
  { id: 'piyama', nama: { id: 'Piyama', en: 'Pyjamas' } },
  { id: 'handuk', nama: { id: 'Handuk', en: 'Towels' } },
  { id: 'kaoskaki', nama: { id: 'Kaus Kaki', en: 'Socks' } },
];

/* ============================ SUB-KOMPONEN ============================ */

const KartuWidget: React.FC<{ ikon: Ikon; judul: string; sub: string; children: React.ReactNode }> = ({
  ikon: IkonEl,
  judul,
  sub,
  children,
}) => (
  <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-100 bg-cyan-50 text-cyan-700">
      <IkonEl className="h-7 w-7" />
    </span>
    <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-900">{judul}</h3>
    <p className="mt-1 text-base leading-relaxed text-slate-500">{sub}</p>
    <div className="mt-6 flex flex-1 flex-col">{children}</div>
  </div>
);

/* ================================ WIDGETS ================================ */

const LaundryWidgets: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (t: Teks) => t[lang];

  /* ---- Widget 3: Laundry List Digital ---- */
  const [qty, setQty] = useState<Record<string, number>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent'>('idle');

  const ubah = (id: string, delta: number) =>
    setQty((prev) => {
      const next = Math.min(99, Math.max(0, (prev[id] || 0) + delta));
      return { ...prev, [id]: next };
    });

  const total = useMemo(() => Object.values(qty).reduce((a, b) => a + b, 0), [qty]);

  const kirim = (e: React.FormEvent) => {
    e.preventDefault();
    if (total <= 0) return;
    setStatus('loading');
    // Simulasi pengiriman singkat; integrasi nyata terhubung ke sistem laundry kamar.
    setTimeout(() => setStatus('sent'), 900);
  };

  return (
    <section id="layanan-digital" className="scroll-mt-28 bg-slate-50 py-20">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
          {L({ id: 'Pesan & Pantau Laundry', en: 'Order & Track Your Laundry' })}
        </h2>
        <div className="mt-5 h-px w-full bg-slate-200" />
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
          {L({
            id: 'Hubungi laundry, pahami alur higienisnya, dan buat daftar cucian digital dari kamar Anda.',
            en: 'Contact the laundry, understand its hygienic flow, and build a digital wash list from your room.',
          })}
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* ============ WIDGET 1: CTA PESAN ============ */}
          <KartuWidget
            ikon={Shirt}
            judul={L({ id: 'Pesan Laundry Kamar Inap', en: 'Order Inpatient Laundry' })}
            sub={L({ id: 'Pilih kanal tercepat untuk menghubungi kami.', en: 'Pick the quickest channel to reach us.' })}
          >
            <div className="flex flex-1 flex-col gap-3">
              <a
                href={`tel:${EXT_KAMAR}`}
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-cyan-600 px-6 py-4 text-lg font-extrabold text-white shadow-lg shadow-cyan-600/25 transition-all hover:bg-cyan-700 active:scale-[0.98]"
              >
                <Phone className="h-5 w-5" />
                {L({ id: 'Hubungi Ekstensi 148', en: 'Call Extension 148' })}
              </a>
              <a
                href={`https://wa.me/${WA_LINK}?text=${encodeURIComponent(lang === 'en' ? 'Hi, I would like to order the inpatient laundry service.' : 'Halo, saya ingin memesan layanan laundry kamar inap.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-xl border-2 border-emerald-500 bg-white px-6 py-4 text-lg font-extrabold text-emerald-700 transition-all hover:bg-emerald-50 active:scale-[0.98]"
              >
                <MessageCircle className="h-5 w-5" />
                {L({ id: 'Chat WhatsApp', en: 'Chat WhatsApp' })}
              </a>
              <p className="mt-auto text-sm font-semibold text-slate-500">
                {L({ id: `Atau langsung ke nomor ${WA_DISPLAY}.`, en: `Or dial straight to ${WA_DISPLAY}.` })}
              </p>
            </div>
          </KartuWidget>

          {/* ============ WIDGET 2: INFOGRAFIS ALUR ============ */}
          <KartuWidget
            ikon={Sparkles}
            judul={L({ id: 'Alur Higienis Pakaian', en: 'Hygienic Clothing Flow' })}
            sub={L({ id: 'Empat langkah dari kamar kembali ke kamar.', en: 'Four steps from your room and back.' })}
          >
            <ol className="relative flex flex-1 flex-col gap-4 border-l-2 border-cyan-200 pl-6">
              {ALUR.map((a, i) => (
                <li key={a.judul.id} className="relative">
                  <span className="absolute -left-[35px] flex h-8 w-8 items-center justify-center rounded-full border-2 border-cyan-500 bg-white text-sm font-extrabold text-cyan-700">
                    {i + 1}
                  </span>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-100 bg-cyan-50 text-cyan-700">
                      <a.ikon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-base font-bold text-slate-900">{L(a.judul)}</p>
                      <p className="text-sm leading-relaxed text-slate-600">{L(a.ket)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </KartuWidget>

          {/* ============ WIDGET 3: LAUNDRY LIST DIGITAL ============ */}
          <KartuWidget
            ikon={ClipboardList}
            judul={L({ id: 'Laundry List Digital', en: 'Digital Laundry List' })}
            sub={L({ id: 'Atur jumlah tiap item, lalu kirim.', en: 'Set the quantity per item, then send.' })}
          >
            {status === 'sent' ? (
              <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <Check className="h-7 w-7" />
                </span>
                <p className="mt-4 text-lg font-extrabold text-emerald-800">
                  {L({ id: 'Daftar terkirim', en: 'List sent' })}
                </p>
                <p className="mt-1 text-sm font-semibold leading-relaxed text-emerald-700">
                  {L({
                    id: `${total} item dicatat. Petugas akan menjemput sesuai daftar ini.`,
                    en: `${total} pieces noted. Staff will collect according to this list.`,
                  })}
                </p>
                <button
                  type="button"
                  onClick={() => { setStatus('idle'); setQty({}); }}
                  className="mt-5 rounded-lg border border-emerald-300 bg-white px-4 py-2 text-sm font-bold text-emerald-700 transition hover:bg-emerald-100"
                >
                  {L({ id: 'Buat daftar baru', en: 'Make a new list' })}
                </button>
              </div>
            ) : (
              <form onSubmit={kirim} className="flex flex-1 flex-col gap-3">
                <ul className="flex-1 space-y-2">
                  {ITEM.map((it) => (
                    <li key={it.id} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5">
                      <span className="text-base font-semibold text-slate-700">{L(it.nama)}</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          aria-label={L({ id: 'Kurangi', en: 'Decrease' })}
                          onClick={() => ubah(it.id, -1)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-600 transition hover:border-cyan-400 hover:text-cyan-700 disabled:opacity-40"
                          disabled={(qty[it.id] || 0) <= 0}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-6 text-center text-base font-extrabold text-slate-900">{qty[it.id] || 0}</span>
                        <button
                          type="button"
                          aria-label={L({ id: 'Tambah', en: 'Increase' })}
                          onClick={() => ubah(it.id, 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-600 transition hover:border-cyan-400 hover:text-cyan-700"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between rounded-xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-base font-bold text-cyan-800">
                  <span>{L({ id: 'Total', en: 'Total' })}</span>
                  <span>{total} {L({ id: 'item', en: 'pcs' })}</span>
                </div>

                <button
                  type="submit"
                  disabled={total <= 0}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 text-base font-extrabold text-white shadow-lg shadow-cyan-600/25 transition-all hover:bg-cyan-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {status === 'loading' ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                  {L({ id: 'Kirim Daftar', en: 'Send List' })}
                </button>

                {total <= 0 && status === 'idle' && (
                  <p className="flex items-center gap-2 text-sm font-semibold text-slate-400">
                    <Info className="h-4 w-4" />
                    {L({ id: 'Tambahkan minimal 1 item untuk mengirim.', en: 'Add at least 1 item to send.' })}
                  </p>
                )}
              </form>
            )}
          </KartuWidget>
        </div>

        <p className="mt-8 text-sm font-semibold text-slate-400">
          {L({
            id: 'Catatan: widget di atas adalah tampilan demo. Penjemputan dan rincian final dikonfirmasi oleh petugas laundry.',
            en: 'Note: the widgets above are a demo view. Collection and final details are confirmed by laundry staff.',
          })}
        </p>
      </div>
    </section>
  );
};

export default LaundryWidgets;
