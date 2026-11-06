'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ugd1 from '@/images/hero/fasilitas/ugd-1.jpg';
import ugd2 from '@/images/hero/fasilitas/ugd-2.jpg';
import ugd1Mobile from '@/images/hero/mobile-fasilitas/ugd-1.jpg';
import ugd2Mobile from '@/images/hero/mobile-fasilitas/ugd-2.jpg';

interface FotoUgdProps {
  /** Teks alt bilingual sudah dipilih induknya. */
  alt: string;
}

/**
 * Latar hero IGD — slideshow dua foto fasilitas (src/images/hero/fasilitas/ugd-1.jpg &
 * ugd-2.jpg, twin mobile di src/images/hero/mobile-fasilitas/) yang berganti setiap 3 detik dengan cross-fade, dipasang penuh di
 * belakang konten hero (induk menaruhnya di dalam wrapper absolute inset-0).
 *
 * Kedua <Image> selalu terpasang di DOM dan hanya dipertukarkan lewat opacity, jadi
 * tidak ada kedip/kosong saat berganti dan foto berikutnya sudah ikut dimuat.
 */
const FOTO = [ugd1, ugd2];
const FOTO_MOBILE = [ugd1Mobile, ugd2Mobile];
const JEDA_MS = 3000;

const FotoUgd: React.FC<FotoUgdProps> = ({ alt }) => {
  const [aktif, setAktif] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setAktif((i) => (i + 1) % FOTO.length), JEDA_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {FOTO.map((foto, i) => (
        <React.Fragment key={i}>
          <Image
            src={FOTO_MOBILE[i]}
            alt={i === aktif ? alt : ''}
            aria-hidden={i !== aktif}
            fill
            priority={i === 0}
            loading="eager"
            sizes="100vw"
            quality={90}
            className={`object-cover object-right md:hidden transition-opacity duration-1000 ease-in-out ${
              i === aktif ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <Image
            src={foto}
            alt={i === aktif ? alt : ''}
            aria-hidden={i !== aktif}
            fill
            priority={i === 0}
            loading="eager"
            sizes="100vw"
            quality={90}
            className={`hidden object-cover md:block transition-opacity duration-1000 ease-in-out ${
              i === aktif ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </React.Fragment>
      ))}

      {/* Penanda slide — kecil di kanan bawah, di luar zona teks yang rata kiri. */}
      <div className="absolute bottom-5 right-5 flex gap-2">
        {FOTO.map((_, i) => (
          <span
            key={i}
            aria-hidden="true"
            className={`h-2 rounded-full transition-all duration-500 ${
              i === aktif ? 'w-6 bg-slate-700' : 'w-2 bg-slate-400/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FotoUgd;
