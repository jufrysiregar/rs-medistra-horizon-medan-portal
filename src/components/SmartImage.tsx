'use client';

import React, { useEffect, useState } from 'react';
import { Building2 } from 'lucide-react';

interface SmartImageProps {
  /** Path publik yang diharapkan (mis. '/images/beranda/hero-bg.jpg'). */
  src: string;
  alt: string;
  /** Container class (atur rasio/rounding/overflow di sini). */
  className?: string;
  /** Class untuk elemen <img> (object-fit dll). */
  imgClassName?: string;
  /** Fallback lokal (hasil import Next/Image) dipakai bila file publik belum ada. */
  fallbackImport?: string;
  /** Teks label singkat untuk placeholder bergradasi. */
  placeholderLabel?: string;
  /** Gaya overlay: 'gradient' untuk kartu, atau 'transparent' bila overlay digambar induk. */
  rounded?: string;
}

/**
 * Gambar "tahan-rusak": mencoba memuat file dari folder public; selama belum ada
 * (404) menampilkan fallback impor lokal, atau placeholder gradasi bernuansa RS yang
 * rapi. Saat user menaruh file asli di path `src`, gambar otomatis terpakai tanpa
 * perlu mengubah kode.
 */
const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  className = '',
  imgClassName = 'h-full w-full object-cover',
  fallbackImport,
  placeholderLabel,
  rounded = '',
}) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    const probe = new window.Image();
    probe.onload = () => mounted && setReady(true);
    probe.onerror = () => mounted && setReady(false);
    probe.src = src;
    return () => {
      mounted = false;
    };
  }, [src]);

  const shownSrc = ready ? src : fallbackImport;

  return (
    <div className={`relative overflow-hidden bg-slate-100 ${rounded} ${className}`}>
      {/* Placeholder gradasi (di layer paling bawah) */}
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 text-white/70">
        <div className="flex flex-col items-center gap-2 px-4 text-center">
          <Building2 className="h-8 w-8 opacity-60" />
          {placeholderLabel && (
            <span className="text-sm font-semibold tracking-wide text-white/70">{placeholderLabel}</span>
          )}
        </div>
      </div>

      {/* Fallback impor / gambar publik final */}
      {shownSrc && (
        <img
          src={shownSrc}
          alt={alt}
          className={`relative ${imgClassName} ${ready ? 'opacity-100' : 'opacity-100'}`}
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
};

export default SmartImage;
