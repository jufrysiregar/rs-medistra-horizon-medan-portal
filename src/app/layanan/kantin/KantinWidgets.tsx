'use client';

import React, { useState } from 'react';
import {
  Download,
  FileText,
  Flame,
  Info,
  MessageCircle,
  ShieldCheck,
  ShoppingBag,
  Bike,
  UtensilsCrossed,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import type { Language } from '../../../types';

type Teks = { id: string; en: string };
type Ikon = React.ComponentType<{ className?: string }>;

/* ============================== DATA ============================== */

/** Tautan aplikasi pesan-antar. */
const GRABFOOD_URL = 'https://food.grab.com';
const SHOPEEFOOD_URL = 'https://shopeefood.co.id';

/** Nomor WhatsApp kantin untuk pengantaran ke kamar. */
const WA_LINK = '6281211223344';

/** Pratinjau katalog e-menu (demo), harga & label kalori. */
const E_MENU: { nama: Teks; harga: string; kalori: number }[] = [
  { nama: { id: 'Nasi Ayam Panggang Herbal', en: 'Herb Roast Chicken Rice' }, harga: 'Rp 28.000', kalori: 480 },
  { nama: { id: 'Sup Sayur Bening Rendah Garam', en: 'Low-Salt Clear Vegetable Soup' }, harga: 'Rp 18.000', kalori: 160 },
  { nama: { id: 'Jus Alpukat Tanpa Gula', en: 'Unsweetened Avocado Juice' }, harga: 'Rp 15.000', kalori: 120 },
  { nama: { id: 'Roti Gandum Isi Pisang', en: 'Wholewheat Banana Fill' }, harga: 'Rp 12.000', kalori: 210 },
];

/* ============================ SUB-KOMPONEN ============================ */

const KartuWidget: React.FC<{ ikon: Ikon; judul: string; sub: string; children: React.ReactNode }> = ({
  ikon: IkonEl,
  judul,
  sub,
  children,
}) => (
  <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-amber-100 bg-amber-50 text-amber-700">
      <IkonEl className="h-7 w-7" />
    </span>
    <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-900">{judul}</h3>
    <p className="mt-1 text-base leading-relaxed text-slate-500">{sub}</p>
    <div className="mt-6 flex flex-1 flex-col">{children}</div>
  </div>
);

/* ================================ WIDGETS ================================ */

const KantinWidgets: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (t: Teks) => t[lang];

  /* ---- Widget 2: Antar ke Kamar (draft pesan otomatis) ---- */
  const [kamar, setKamar] = useState('');
  const pesanAntar = L({
    id: `Halo, saya ingin memesan menu kantin untuk diantar ke Kamar Rawat Inap No: ${kamar.trim() || '[Nomor Kamar]'}.`,
    en: `Hi, I would like to order a canteen menu to be delivered to Inpatient Room No: ${kamar.trim() || '[Room Number]'}.`,
  });

  /* ---- Widget 3: E-Menu (pratinjau katalog) ---- */
  const [buka, setBuka] = useState(false);

  return (
    <section id="pesan" className="scroll-mt-28 bg-slate-50 py-20">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
          {L({ id: 'Pesan & Jelajahi Menu', en: 'Order & Browse the Menu' })}
        </h2>
        <div className="mt-5 h-px w-full bg-slate-200" />
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
          {L({
            id: 'Tiga cara praktis untuk menikmati kantin, lewat aplikasi, diantar ke kamar, atau telusuri menu lengkap beserta kalori.',
            en: 'Three practical ways to enjoy the canteen, via app, delivered to your room, or browse the full menu with calories.',
          })}
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* ============ WIDGET 1: DIRECT APP ============ */}
          <KartuWidget
            ikon={UtensilsCrossed}
            judul={L({ id: 'Pesan via Aplikasi', en: 'Order via App' })}
            sub={L({ id: 'Sama enaknya, sampai di tempat Anda.', en: 'Just as tasty, delivered to you.' })}
          >
            <div className="flex flex-1 flex-col gap-3">
              <a
                href={GRABFOOD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-emerald-600 px-6 py-4 text-lg font-extrabold text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-700 active:scale-[0.98]"
              >
                <Bike className="h-5 w-5" />
                {L({ id: 'Pesan di GrabFood', en: 'Order on GrabFood' })}
              </a>
              <a
                href={SHOPEEFOOD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-orange-500 px-6 py-4 text-lg font-extrabold text-white shadow-lg shadow-orange-500/25 transition-all hover:bg-orange-600 active:scale-[0.98]"
              >
                <ShoppingBag className="h-5 w-5" />
                {L({ id: 'Pesan di ShopeeFood', en: 'Order on ShopeeFood' })}
              </a>
              <p className="mt-auto flex items-start gap-2 text-sm font-semibold text-slate-500">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                {L({
                  id: 'Dikemas dengan Hygienic Tamper-Evident Seal.',
                  en: 'Packed with a hygienic tamper-evident seal.',
                })}
              </p>
            </div>
          </KartuWidget>

          {/* ============ WIDGET 2: ANTAR KE KAMAR ============ */}
          <KartuWidget
            ikon={MessageCircle}
            judul={L({ id: 'Antar ke Kamar Inap', en: 'Deliver to My Room' })}
            sub={L({ id: 'Isi nomor kamar, pesan lewat WhatsApp.', en: 'Enter your room number, order via WhatsApp.' })}
          >
            <div className="flex flex-1 flex-col gap-3">
              <label className="text-sm font-bold text-slate-600" htmlFor="kamar-kantin">
                {L({ id: 'Nomor Kamar Rawat Inap', en: 'Inpatient Room Number' })}
              </label>
              <input
                id="kamar-kantin"
                type="text"
                inputMode="numeric"
                value={kamar}
                onChange={(e) => setKamar(e.target.value)}
                placeholder={L({ id: 'mis. 712', en: 'e.g. 712' })}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base font-semibold text-slate-800 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
              />
              <a
                href={`https://wa.me/${WA_LINK}?text=${encodeURIComponent(pesanAntar)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center justify-center gap-3 rounded-xl bg-emerald-600 px-6 py-4 text-lg font-extrabold text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-700 active:scale-[0.98]"
              >
                <MessageCircle className="h-5 w-5" />
                {L({ id: 'Pesan Antar ke Kamar', en: 'Order Room Delivery' })}
              </a>
              <p className="text-sm font-semibold text-slate-500">
                {L({
                  id: 'Pesan WhatsApp terisi otomatis sesuai nomor kamar Anda.',
                  en: 'The WhatsApp message is pre-filled with your room number.',
                })}
              </p>
            </div>
          </KartuWidget>

          {/* ============ WIDGET 3: E-MENU PDF ============ */}
          <KartuWidget
            ikon={FileText}
            judul={L({ id: 'E-Menu Kantin', en: 'Canteen E-Menu' })}
            sub={L({ id: 'Katalog menu, harga, dan label kalori.', en: 'A catalogue of dishes, prices and calories.' })}
          >
            <div className="flex flex-1 flex-col gap-3">
              <button
                type="button"
                onClick={() => setBuka((v) => !v)}
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-amber-600 px-6 py-4 text-lg font-extrabold text-white shadow-lg shadow-amber-600/25 transition-all hover:bg-amber-700 active:scale-[0.98]"
              >
                <Download className="h-5 w-5" />
                {L({ id: 'Download E-Menu PDF', en: 'Download E-Menu PDF' })}
              </button>

              {buka && (
                <ul className="flex flex-1 flex-col gap-2 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  {E_MENU.map((e) => (
                    <li key={e.nama.id} className="flex items-center justify-between gap-3 border-b border-slate-200 pb-2 last:border-0 last:pb-0">
                      <div>
                        <p className="text-base font-bold text-slate-800">{L(e.nama)}</p>
                        <p className="inline-flex items-center gap-1 text-sm font-semibold text-amber-700">
                          <Flame className="h-4 w-4" />
                          {e.kalori} kkal
                        </p>
                      </div>
                      <span className="shrink-0 text-base font-extrabold text-slate-900">{e.harga}</span>
                    </li>
                  ))}
                </ul>
              )}

              <p className="mt-auto flex items-start gap-2 text-sm font-semibold text-slate-500">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                {L({
                  id: 'Pratinjau demo, katalog PDF lengkap tersedia di kasir kantin.',
                  en: 'Demo preview, the full PDF catalogue is available at the canteen cashier.',
                })}
              </p>
            </div>
          </KartuWidget>
        </div>
      </div>
    </section>
  );
};

export default KantinWidgets;
