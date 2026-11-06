'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { eventPromoGambar } from '../data/eventPromoFoto';
import type { EventPromo } from '../types';

interface Props {
  /**
   * Promo aktif (type === 'promo') dari data/event-promo.json, sudah dilokalkan
   * oleh getEventPromo() di page.tsx. Judul & flyer TIDAK lagi didefinisikan di
   * komponen ini supaya Beranda tidak pernah menyimpang dari halaman Event & Promo
   * — dulu di sini sempat terpasang "Bakti Sosial Sunat" yang aslinya EVENT.
   */
  items: EventPromo[];
}

/** Berapa kartu yang terlihat: ikut breakpoint Tailwind sm (640) dan lg (1024). */
const hitungPerView = (lebar: number): number => (lebar >= 1024 ? 3 : lebar >= 640 ? 2 : 1);

/** Tombol geser: sengaja abu-abu "mati", cuma sedikit lebih gelap saat bisa dipakai.
    h-11 = 44px supaya nyaman ditekan jari di tablet. */
const TOMBOL =
  'inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 transition-colors duration-200 hover:text-slate-600 disabled:cursor-not-allowed disabled:text-slate-300 disabled:hover:text-slate-300';

/** Perkiraan lebar tampilan poster, dipakai optimizer next/image memilih varian. */
const SIZES = '(max-width: 640px) 82vw, (max-width: 1024px) 41vw, 30vw';

/**
 * PROMO BERANDA — minimalis: satu kotak putih per promo, isinya gambar + satu judul.
 * Isi kartu datang lewat props `items` dari halaman Event & Promo yang sama, jadi
 * tidak ada lagi judul/flyer yang ditulis tangan di sini.
 *
 * Carousel: desktop menampilkan 3 kartu (tablet 2, hp 1) dan tombol < > menggeser
 * satu kartu per klik. Tiap kartu selebar 1/perView dari track, jadi perpindahan
 * `translateX` selalu pas satu kartu tanpa perlu ngukur pixel. Track-nya pakai
 * `overflow-x-clip` (bukan hidden) supaya kartu yang naik + shadow-nya saat hover
 * tidak terpotong di atas-bawah.
 *
 * Tinggi SERAGAM: gambar dikunci `aspect-[3/4]`, judul `line-clamp-2` + `min-h` dua
 * baris, dan kotak kartu `flex-1` supaya rata bawah.
 *
 * SUDUT POSTER: rasio tiap flyer berbeda (P-01 & P-03 = 2:3, P-02 = 3:4). Kalau semua
 * dipasang `fill` + object-contain, hanya poster yang pas 3/4 menyentuh tepi kotak,
 * jadi cuma dia yang ikut terpotong bulat oleh wrapper — sudut kartu terlihat
 * beda-beda. Flyer statis karenanya dirender dengan dimensi intrinsiknya
 * (`h-full w-auto`) supaya elemen <img> = persis posternya, lalu `rounded-2xl`
 * dipasang di elemen itu: semua poster dipotong bulat sama rata, tinggi kartu tetap
 * seragam karena kotaknya tetap 3/4.
 *
 * Gambar pakai `object-contain` (flyer promo) dan TIDAK di-zoom saat hover, BUKAN object-cover:
 * tiap flyer sudah berisi teksnya sendiri (harga, syarat, nomor WA, alamat) sampai ke
 * tepi bawahnya, jadi dipotong sedikit saja = info kontak hilang. Efek "aktif" saat
 * hover dipegang oleh kartu yang naik, border cyan, dan judul yang berubah warna.
 * Kartu selalu menaut ke /tentang-kami/event-promo/[slug] — tiap item JSON punya
 * halaman detail, jadi tidak ada lagi kartu "segera tersedia".
 */
export const PromoPaket: React.FC<Props> = ({ items }) => {
  const { language, t } = useLanguage();
  const [perView, setPerView] = useState(3);
  const [posisi, setPosisi] = useState(0);

  useEffect(() => {
    const ubah = () => setPerView(hitungPerView(window.innerWidth));
    ubah();
    window.addEventListener('resize', ubah);
    return () => window.removeEventListener('resize', ubah);
  }, []);

  // Batas kanan: posisi terakhir saat kartu paling kanan tepat menutupi jendela.
  const maks = Math.max(0, items.length - perView);
  const aman = Math.min(posisi, maks);
  const geser = (arah: number) => setPosisi(Math.min(Math.max(aman + arah, 0), maks));

  return (
    <section className="w-full bg-slate-50 py-12 sm:py-16 lg:py-24 xl:py-32">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        {/* Header: judul kiri, tombol geser kanan */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-8 flex flex-wrap items-end justify-between gap-6 sm:mb-12"
        >
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">{t('promoTitle')}</h2>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => geser(-1)}
              disabled={aman <= 0}
              aria-label={language === 'id' ? 'Promo sebelumnya' : 'Previous promos'}
              className={TOMBOL}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => geser(1)}
              disabled={aman >= maks}
              aria-label={language === 'id' ? 'Promo berikutnya' : 'More promos'}
              className={TOMBOL}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        >
          {/* -mx-4 + px-4: gutter 32px antar kartu, tepi luar tetap lurus dengan judul */}
          <div className="-mx-4 overflow-x-clip">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${aman * (100 / perView)}%)` }}
            >
              {items.map((p) => {
                /* Foto diambil dari EVENT_PROMO_FOTO (kunci slug) dengan fallback ke
                   kunci `image` di JSON — fungsi yang sama yang dipakai kartu list dan
                   halaman detail Event & Promo. */
                const gambar = eventPromoGambar(p);
                /* Flyer statis (punya width/height) -> ukuran intrinsik + sudut dibulatkan
                   di elemen gambar. Foto `cover` / fallback string -> tetap `fill` seperti
                   sebelumnya karena memang harus memenuhi kotak dan memotong tepi. */
                const flyer = p.image_fit !== 'cover' && typeof gambar !== 'string' ? gambar : undefined;
                const kartu = (
                  <div className="flex flex-1 flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-3 shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-cyan-500/60 group-hover:shadow-[0_18px_50px_rgb(0,0,0,0.14)]">
                    {/* rasio 3/4 dipindah ke induk supaya tinggi kartu tetap seragam */}
                    <div className="relative flex aspect-[3/4] w-full items-center justify-center overflow-hidden rounded-2xl bg-white">
                      {gambar &&
                        (flyer ? (
                          <Image
                            src={flyer}
                            alt={p.image_alt}
                            width={flyer.width}
                            height={flyer.height}
                            sizes={SIZES}
                            quality={80}
                            className="h-full w-auto max-w-full rounded-2xl"
                            loading="lazy"
                          />
                        ) : (
                          <Image
                            src={gambar}
                            alt={p.image_alt}
                            fill
                            sizes={SIZES}
                            quality={80}
                            className={p.image_fit === 'cover' ? 'object-cover' : 'object-contain'}
                            loading="lazy"
                          />
                        ))}
                    </div>
                    <h3 className="mt-4 min-h-[3.5rem] px-1 text-xl font-bold leading-snug tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-cyan-700 line-clamp-2 lg:min-h-[4.25rem] lg:text-2xl">
                      {p.title}
                    </h3>
                  </div>
                );

                return (
                  <div key={p.slug} className="w-full flex-none px-4 sm:w-1/2 lg:w-1/3">
                    <Link href={`/tentang-kami/event-promo/${p.slug}`} className="group flex h-full flex-col">
                      {kartu}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PromoPaket;
