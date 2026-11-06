'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  Bike,
  Clock,
  Coffee,
  Croissant,
  CreditCard,
  HandPlatter,
  MapPin,
  Salad,
  ShieldCheck,
  Soup,
  Sparkles,
  Users,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import type { Language } from '../../../types';
import kantinHero from '@/images/hero/layanan/kantin.jpg';
import kantinHeroMobile from '@/images/hero/mobile-layanan/kantin.jpg';
import KantinWidgets from './KantinWidgets';

type Teks = { id: string; en: string };
type Ikon = React.ComponentType<{ className?: string }>;

/* ============================== DATA HALAMAN ============================== */

/** Tiga pilar konsep higiene kantin. */
const KONSEP: { judul: Teks; ket: Teks; ikon: Ikon }[] = [
  {
    judul: { id: 'Standar Keamanan Pangan', en: 'Food Safety Standard' },
    ket: {
      id: 'Setiap batch makanan diawasi dari bahan baku hingga penyajian, bebas kontaminasi, dengan sampel penahan 24 jam.',
      en: 'Every batch is supervised from raw ingredient to serving, contamination-free, with a 24-hour retained sample.',
    },
    ikon: ShieldCheck,
  },
  {
    judul: { id: 'Terbuka untuk Umum', en: 'Open to Everyone' },
    ket: {
      id: 'Melayani pasien, keluarga, dokter jaga, staf rumah sakit, hingga masyarakat umum sepanjang hari.',
      en: 'Serving patients, families, on-duty doctors, hospital staff and the general public throughout the day.',
    },
    ikon: Users,
  },
  {
    judul: { id: 'Pembayaran Cashless', en: 'Cashless Payment' },
    ket: {
      id: 'Transaksi higienis tanpa uang tunai: QRIS, kartu debit/kredit, dan berbagai dompet digital.',
      en: 'Hygienic, cash-free transactions: QRIS, debit/credit cards and a range of e-wallets.',
    },
    ikon: CreditCard,
  },
];

/** Empat kategori variasi menu. */
const MENU: { judul: Teks; ket: Teks; ikon: Ikon }[] = [
  {
    judul: { id: 'Menu Sehat & Diet Khusus', en: 'Healthy & Special-Diet Menu' },
    ket: {
      id: 'Pilihan rendah garam, rendah gula, dan vegetarian yang disusun oleh unit gizi.',
      en: 'Low-salt, low-sugar and vegetarian options curated by the dietetics unit.',
    },
    ikon: Salad,
  },
  {
    judul: { id: 'Kuliner Nusantara & Favorit', en: 'Indonesian & Favourites' },
    ket: {
      id: 'Comfort food, sup hangat, dan lauk segar yang dimasak setiap hari.',
      en: 'Comfort food, warm soups and fresh side dishes cooked daily.',
    },
    ikon: Soup,
  },
  {
    judul: { id: 'Minuman Nutrisi & Kopi Sehat', en: 'Nutritious Drinks & Healthy Coffee' },
    ket: {
      id: 'Jus buah tanpa pemanis tambahan, kopi, dan teh berkualitas.',
      en: 'Unsweetened fruit juices, quality coffee and tea.',
    },
    ikon: Coffee,
  },
  {
    judul: { id: 'Camilan & Roti Higienis', en: 'Hygienic Snacks & Bakery' },
    ket: {
      id: 'Roti segar, buah potong, dan camilan yang dikemas higienis.',
      en: 'Fresh bakery, cut fruits and hygienically packed snacks.',
    },
    ikon: Croissant,
  },
];

/** Dua kanal layanan pesanan. */
const PESANAN: {
  judul: Teks; tag: Teks; titik: Teks[]; ikon: Ikon;
}[] = [
  {
    judul: { id: 'Pemesanan Online', en: 'Online Ordering' },
    tag: { id: 'GrabFood & ShopeeFood', en: 'GrabFood & ShopeeFood' },
    titik: [
      { id: 'Pesan lewat aplikasi favorit Anda, menu yang sama disajikan kantin.', en: 'Order through your favourite app, the very same canteen menu.' },
      { id: 'Dikemas dengan Hygienic Tamper-Evident Seal (stiker pengaman anti-buka).', en: 'Packed with a hygienic tamper-evident seal for safety.' },
      { id: 'Segel menjamin makanan utuh dan aman sejak dimasak hingga tiba di tangan Anda.', en: 'The seal guarantees the meal stays intact and safe from kitchen to your hands.' },
    ],
    ikon: Bike,
  },
  {
    judul: { id: 'Antar ke Kamar Inap', en: 'In-Room Delivery' },
    tag: { id: 'WhatsApp / Ekstensi Kamar', en: 'WhatsApp / Room Extension' },
    titik: [
      { id: 'Pesan via WhatsApp atau telepon ekstensi kamar untuk pengantaran.', en: 'Order via WhatsApp or call your room extension for delivery.' },
      { id: 'Petugas mengantar makanan langsung ke kamar rawat inap Anda.', en: 'Staff deliver the meal straight to your inpatient room.' },
      { id: 'Praktis bagi pasien maupun keluarga yang sedang menunggu.', en: 'Convenient for patients and waiting family members alike.' },
    ],
    ikon: HandPlatter,
  },
];

/** Fasilitas kenyamanan ruang makan. */
const FASILITAS: { nama: Teks; ikon: Ikon }[] = [
  { nama: { id: 'Ruang ber-AC', en: 'Air-conditioned Hall' }, ikon: Sparkles },
  { nama: { id: 'Wi-Fi Gratis', en: 'Free Wi-Fi' }, ikon: BadgeCheck },
  { nama: { id: 'Charging Station', en: 'Charging Station' }, ikon: Clock },
  { nama: { id: 'Wastafel Otomatis', en: 'Automatic Sink' }, ikon: ShieldCheck },
];

/* ================================ RENDER ================================ */

/** Judul section editorial: H2 besar + divider tipis. */
const JudulSection: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">{children}</h2>
);

const KantinClient: React.FC = () => {
  const { language } = useLanguage();
  const lang: Language = language === 'en' ? 'en' : 'id';
  const L = (t: Teks) => t[lang];

  return (
    <div className="bg-white text-slate-800">
      {/* ============ 1. HERO (LATAR PENUH FOTO) ============ */}
      <section className="relative overflow-hidden bg-white pt-16 pb-12 lg:pt-20 lg:pb-16">
        {/* kantin.jpg dipakai sebagai latar penuh hero. */}
        <div aria-hidden className="absolute inset-0">
          <Image src={kantinHeroMobile} alt="" fill priority sizes="100vw" quality={90} className="object-cover object-right md:hidden" />
                    <Image src={kantinHero} alt="" fill priority sizes="100vw" quality={90} className="hidden object-cover md:block" />
        </div>
        {/* Scrim: putih pekat hanya di sisi kiri (sampai ±45%), kanan 100% bening. */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-white from-20% via-white/70 to-transparent to-60%" />

        <div className="relative z-10 mr-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="max-w-3xl">
            <h1 className="text-[clamp(2.5rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight text-slate-900">
              {L({ id: 'Pusat Kuliner & Kantin Sehat', en: 'Culinary Hub & Healthy Canteen' })}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              {L({
                id: 'Kantin kami dijalankan dengan prinsip higiene sanitasi pangan dan menu yang disusun oleh unit gizi. Bukan hanya mengenyangkan, setiap sajian dijaga kebersihannya, gizinya, dan rasanya untuk pasien, keluarga, staf, maupun pengunjung.',
                en: 'Our canteen runs on food hygiene and sanitation principles with menus designed by the dietetics unit. More than filling, every dish is guarded for cleanliness, nutrition and taste, for patients, families, staff and visitors alike.',
              })}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
                <Clock className="h-5 w-5 shrink-0 text-amber-600" />
                {L({ id: 'Buka Setiap Hari 06.00-21.00', en: 'Open Daily 06.00-21.00' })}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
                <BadgeCheck className="h-5 w-5 shrink-0 text-amber-600" />
                {L({ id: 'Sertifikat Higiene Sanitasi', en: 'Hygiene & Sanitation Certificate' })}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-base font-semibold text-slate-700">
                <MapPin className="h-5 w-5 shrink-0 text-amber-600" />
                {L({ id: 'Lt G · Area Kantin Utama', en: 'Ground Floor · Main Canteen Area' })}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 2. KONSEP HIGIENE (GRID 3 KOLOM) ============ */}
      <section id="higiene" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <JudulSection>{L({ id: 'Konsep Higiene', en: 'Hygiene Concept' })}</JudulSection>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Tiga komitmen yang membuat setiap sajian kantin aman, inklusif, dan praktis.',
              en: 'Three commitments that make every canteen dish safe, inclusive and convenient.',
            })}
          </p>
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {KONSEP.map((k, i) => (
              <motion.article
                key={k.judul.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-amber-100 bg-amber-50 text-amber-700">
                  <k.ikon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-slate-900">{L(k.judul)}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600">{L(k.ket)}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 3. VARIASI MENU (GRID 4 KOLOM) ============ */}
      <section id="menu" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <JudulSection>{L({ id: 'Variasi Menu', en: 'Menu Variety' })}</JudulSection>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Empat kelompok sajian yang bergilir setiap hari, dari menu diet khusus hingga camilan higienis.',
              en: 'Four groups of dishes rotated daily, from special-diet menus to hygienic snacks.',
            })}
          </p>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {MENU.map((m, i) => (
              <motion.article
                key={m.judul.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-amber-100 bg-amber-50 text-amber-700">
                  <m.ikon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-lg font-extrabold leading-snug tracking-tight text-slate-900">{L(m.judul)}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600">{L(m.ket)}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 4. LAYANAN PESANAN (2 KOLOM) ============ */}
      <section id="pesanan" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <JudulSection>{L({ id: 'Layanan Pesanan', en: 'Ordering Service' })}</JudulSection>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            {L({
              id: 'Nikmati sajian kantin lewat dua cara, pesan online dengan kemasan tersegel, atau biarkan kami mengantarnya ke kamar Anda.',
              en: 'Enjoy the canteen two ways, order online in sealed packaging, or let us deliver it to your room.',
            })}
          </p>
          <div className="mt-12 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-10">
            {PESANAN.map((p) => (
              <div
                key={p.judul.id}
                className="flex h-full flex-col rounded-3xl border-2 border-amber-200 bg-white p-8 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-600 text-white shadow-lg shadow-amber-600/25">
                    <p.ikon className="h-7 w-7" />
                  </span>
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-widest text-amber-600">{L(p.tag)}</p>
                    <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">{L(p.judul)}</h3>
                  </div>
                </div>
                <ul className="mt-6 space-y-3">
                  {p.titik.map((t) => (
                    <li key={t.id} className="flex items-start gap-3 text-base text-slate-700">
                      <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-amber-600" />
                      {L(t)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 5. JAM OPERASIONAL & FASILITAS (2 KOLOM) ============ */}
      <section id="jam" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <JudulSection>{L({ id: 'Jam Operasional & Fasilitas', en: 'Opening Hours & Facilities' })}</JudulSection>
          <div className="mt-5 h-px w-full bg-slate-200" />
          <div className="mt-12 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-10">
            {/* Kiri: jam buka besar */}
            <div className="flex flex-col justify-center rounded-3xl border-2 border-amber-200 bg-amber-50 p-10 shadow-sm">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-600 text-white shadow-lg shadow-amber-600/25">
                <Clock className="h-7 w-7" />
              </span>
              <p className="mt-6 text-lg font-bold uppercase tracking-wide text-amber-700">
                {L({ id: 'Buka Setiap Hari', en: 'Open Every Day' })}
              </p>
              <p className="mt-2 text-5xl font-extrabold leading-none tracking-tight text-slate-900 sm:text-6xl">
                06.00 - 21.00
              </p>
              <p className="mt-4 text-lg font-semibold text-slate-600">
                {L({ id: 'Waktu Indonesia Barat (WIB) · termasuk akhir pekan dan hari libur.', en: 'Western Indonesia Time (WIB) · including weekends and public holidays.' })}
              </p>
            </div>

            {/* Kanan: grid fasilitas */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">
                {L({ id: 'Fasilitas Kenyamanan', en: 'Comfort Facilities' })}
              </h3>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {FASILITAS.map((f) => (
                  <div key={f.nama.id} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-amber-100 bg-amber-50 text-amber-700">
                      <f.ikon className="h-6 w-6" />
                    </span>
                    <span className="text-lg font-bold text-slate-800">{L(f.nama)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 6. WIDGETS INTERAKTIF ============ */}
      <KantinWidgets />
    </div>
  );
};

export default KantinClient;
