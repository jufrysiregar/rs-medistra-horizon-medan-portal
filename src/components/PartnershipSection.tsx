'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import m1 from '../images/mitra/1.png';
import m2 from '../images/mitra/2.png';
import m3 from '../images/mitra/3.png';
import m4 from '../images/mitra/4.png';
import m5 from '../images/mitra/5.png';
import m6 from '../images/mitra/6.png';
import m7 from '../images/mitra/7.png';
import m8 from '../images/mitra/8.png';
import m9 from '../images/mitra/9.png';
import m10 from '../images/mitra/10.png';
import m11 from '../images/mitra/11.png';
import m12 from '../images/mitra/12.png';
import kerjasamaLatar from '@/images/hero/fasilitas/kerjasama.jpg';

interface Mitra {
  key: string;
  gambar: StaticImageData;
}

/**
 * SELURUH logo di src/images/mitra. Di-import statis dari file aslinya (tidak ada
 * folder/skrip pra-olah), Next yang menyajikan versi kecil + WebP saat browser
 * memintanya lewat /_next/image sesuai `sizes` di tiap kotak.
 *
 * PROPORSI tiap file dibiarkan apa adanya: hanya lebarnya yang jadi acuan, tinggi
 * mengikuti rasio aslinya (`h-auto`). Jadi logo kotak/tegap tetap kelihatan gede dan
 * wordmark tipis tetap kelihatan kecil, sama seperti saat filenya dibuka di explorer.
 *
 * Kalau ada logo baru: taruh filenya di src/images/mitra/, lalu tambah satu baris
 * impor + satu entri di daftar ini.
 */
const MITRA: Mitra[] = [
  { key: '1', gambar: m1 },
  { key: '2', gambar: m2 },
  { key: '3', gambar: m3 },
  { key: '4', gambar: m4 },
  { key: '5', gambar: m5 },
  { key: '6', gambar: m6 },
  { key: '7', gambar: m7 },
  { key: '8', gambar: m8 },
  { key: '9', gambar: m9 },
  { key: '10', gambar: m10 },
  { key: '11', gambar: m11 },
  { key: '12', gambar: m12 },
];

/**
 * Lebar acuan (px) + plafon tinggi (px) per breakpoint. Semua logo memulai dari lebar
 * yang sama; rasio asli yang menentukan tingginya, sehingga tingginya BEDA-BEDA dan
 * urutan besar-kecil mengikuti file aslinya. Plafon hanya menahan logo paling jangkung
 * (rasio < 1) supaya tidak mendominasi satu baris.
 */
const LEBAR_ACUAN = { mobile: 104, desktop: 128 };
const TINGGI_PLAFON = { mobile: 108, desktop: 132 };

const lebarLogo = (rasio: number, acuan: number, plafon: number): number =>
  Math.round(Math.min(acuan, plafon * rasio));

const SEMUA_KEY = MITRA.map((m) => m.key);
const PETA = Object.fromEntries(MITRA.map((m) => [m.key, m])) as Record<string, Mitra>;

/** Kunci localStorage. Naikkan angka di belakang "v" kalau urutan perlu diacak ulang. */
const KUNCI_SIMPANAN = 'mitra-urutan-v1';

const acakFisherYates = <T,>(daftar: T[]): T[] => {
  const hasil = [...daftar];
  for (let i = hasil.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [hasil[i], hasil[j]] = [hasil[j], hasil[i]];
  }
  return hasil;
};

const JUDUL = { id: 'Mitra Rumah Sakit', en: 'Hospital Partners' };

/** Baris singkat di bawah judul - satu paragraf saja, tanpa tombol. */
const DESKRIPSI = {
  id: 'Kami bekerja sama dengan berbagai asuransi dan korporasi terkemuka untuk memastikan kemudahan akses layanan kesehatan tanpa hambatan bagi Anda dan keluarga.',
  en: 'We work with leading insurers and corporations to ensure seamless access to healthcare services for you and your family.',
};

/**
 * MITRA KERJASAMA — 12 logo di dalam kotak putih yang membungkus tiap gambar,
 * urutannya diacak SEKALI lalu disimpan di localStorage, jadi tidak berubah tiap
 * refresh atau pindah halaman.
 *
 * Kotaknya TIDAK dipaksa persegi dan TIDAK disama-ratain: tiap kotak membungkus isi
 * logosnya (lebarnya acuan, tingginya dari rasio asli file), jadi hierarki besar-kecil
 * tetap seperti aslinya dan kotak yang jangkung cuma muncul untuk logo yang memang jangkung.
 *
 * Latar belakangnya foto jabat tangan (fasilitas/kerjasama.jpg) berona biru, tajam
 * dengan gradasi gelap dari sisi kiri.
 */
export const PartnershipSection: React.FC = () => {
  const { language } = useLanguage();
  // Render pertama pakai urutan nama file; begitu mount langsung ditukar ke acakan tersimpan.
  const [urutan, setUrutan] = useState<string[]>(SEMUA_KEY);

  useEffect(() => {
    let tersimpan: string[] = [];
    try {
      const mentah = window.localStorage.getItem(KUNCI_SIMPANAN);
      const hasilBaca = mentah ? JSON.parse(mentah) : null;
      if (Array.isArray(hasilBaca)) {
        tersimpan = hasilBaca.filter((k: string) => SEMUA_KEY.includes(k));
      }
    } catch {
      // Private mode / storage penuh: jalan saja tanpa penyimpanan.
    }
    // Logo yang belum pernah diacak (mis. baru ditambahkan) masuk di posisi acak.
    const baru = acakFisherYates(SEMUA_KEY.filter((k) => !tersimpan.includes(k)));
    const final = [...tersimpan, ...baru];
    setUrutan(final);
    try {
      window.localStorage.setItem(KUNCI_SIMPANAN, JSON.stringify(final));
    } catch {
      // Gagal simpan bukan kesalahan fatal; urutan tetap acak untuk kunjungan ini.
    }
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-navy-900 py-12 sm:py-16 lg:py-20 xl:py-24">
      {/*
        LATAR BIRU - tiga lapisan, semuanya dekoratif:
        1. fotonya di-BLUR TIPIS (blur-sm) + scale-110 supaya tepi yang memudar karena
           blur ikut ter-potong `overflow-hidden` section (bukan jadi bening di pinggir)
        2. `mix-blend-color` ngasih hue + saturasi navy-600 ke foto TAPI tetap
           mempertahankan terang (luminance) foto aslinya, jadi hasilnya gradasi
           biru, bukan foto asli bukan pula blok hitam
        3. penggelapnya GRADASI TIPIS DARI KIRI (from-navy-950/55 -> transparan di kanan):
           cukup buat teks & logo kebaca, TAPI tetap tipis biar foto yang sudah blur
           masih kelihatan di sisi kiri (bukan jadi blok gelap pekat)
        `isolate` di pembungkus mengunci blend mode agar hanya mencampur foto di
        bawahnya, bukan teks atau kartu di atasnya.
      */}
      <div aria-hidden="true" className="absolute inset-0 isolate">
        <Image
          src={kerjasamaLatar}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 60vw"
          quality={70}
          className="scale-110 object-cover blur-sm"
        />
        <div className="absolute inset-0 bg-navy-600 mix-blend-color" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/55 via-navy-950/35 to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          {JUDUL[language]}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08, ease: 'easeOut' }}
          className="mx-auto mb-8 mt-4 max-w-3xl text-center text-base leading-relaxed text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.75)] sm:mb-12 sm:text-lg"
        >
          {DESKRIPSI[language]}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-6"
        >
          {urutan.map((k) => {
            const m = PETA[k];
            const rasio = m.gambar.width / m.gambar.height;
            const gaya = {
              '--lwm': `${lebarLogo(rasio, LEBAR_ACUAN.mobile, TINGGI_PLAFON.mobile)}px`,
              '--lwd': `${lebarLogo(rasio, LEBAR_ACUAN.desktop, TINGGI_PLAFON.desktop)}px`,
            } as React.CSSProperties;
            return (
              <div
                key={k}
                style={gaya}
                className="group flex items-center justify-center overflow-hidden rounded-2xl bg-white p-4 shadow-lg shadow-black/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:p-5"
              >
                <Image
                  src={m.gambar}
                  alt={language === 'en' ? 'Partner hospital logo' : 'Logo mitra kerjasama'}
                  width={m.gambar.width}
                  height={m.gambar.height}
                  sizes="(max-width: 768px) 104px, 128px"
                  className="h-auto w-[var(--lwm)] max-w-none object-contain transition-transform duration-300 group-hover:scale-105 md:w-[var(--lwd)]"
                  loading="lazy"
                />
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default PartnershipSection;
