import React from 'react';
import type { StaticImageData } from 'next/image';
import Breadcrumbs from './Breadcrumbs';

interface PageHeroProps {
  /** Tidak dirender lagi — dipertahankan agar pemanggil lama tetap compile. */
  badge?: string;
  /** Tidak dirender lagi — cukup satu judul H1 (Aturan Editorial). */
  subtitle?: string;
  /** Opsional — foto lokal (import statis) atau URL, dengan overlay gelap condong ke kiri. */
  imageUrl?: string | StaticImageData;
  title: string;
}

/**
 * Hero editorial halaman sub-menu: compact, H1 besar rata kiri + divider tipis.
 * Tanpa eyebrow, tanpa deskripsi, tanpa ornamen. pt lega agar tidak tertutup header fixed.
 */
export const PageHero: React.FC<PageHeroProps> = ({ title, imageUrl }) => {
  // Import gambar Next menghasilkan StaticImageData; URL/strings dipakai apa adanya.
  const heroSrc = typeof imageUrl === 'string' ? imageUrl : imageUrl?.src;
  return (
    <section
      id="page-hero"
      className="pt-32 pb-12 bg-gradient-to-b from-navy-950 to-slate-900 text-white relative overflow-hidden"
    >
      {heroSrc && (
        <>
          <img
            src={heroSrc}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Overlay gelap condong kiri agar H1 rata kiri tetap kontras */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/30" />
        </>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <Breadcrumbs dark className="mb-5" />
        {/*
          Judul panjang (35 karakter, mis. "Ruangan Sterilisasi Peralatan Medis") dulu
          pecah dua baris hanya karena max-w-3xl mengunci lebar di 768px, padahal ruang
          layar masih luas. Cap itu dibuang; ukuran huruf mengikuti lebar viewport lewat
          clamp() supaya tetap satu baris dari tablet ke atas. Tanpa whitespace-nowrap:
          kalau perkiraan meleset, terburuk judul tetap membungkus — bukan terpotong,
          karena section ini memakai overflow-hidden.
        */}
        <h1 className="text-[clamp(2.125rem,4.2vw,3rem)] font-extrabold tracking-tight text-white leading-[1.1]">
          {title}
        </h1>
        <div className="mt-5 h-px w-20 bg-white/25" />
      </div>
    </section>
  );
};

export default PageHero;
