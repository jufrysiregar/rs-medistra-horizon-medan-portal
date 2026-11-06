'use client';

import React, { useEffect, useRef } from 'react';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from 'framer-motion';

/**
 * Pemisah ribuan dengan titik (1200 menjadi "1.200"). Dikerjakan manual dan BUKAN
 * lewat toLocaleString, supaya hasilnya tidak bergantung pada locale browser/Node
 * dan HTML hasil server selalu sama dengan hasil hydrate di client.
 */
export const formatRibuan = (n: number): string =>
  Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');

interface AnimatedNumberProps {
  /** Angka target. */
  value: number;
  /** Lama jalan dari 0 ke target, dalam detik. */
  duration?: number;
  className?: string;
}

/**
 * ANGKA COUNT-UP. Berjalan dari 0 ke `value` begitu elemennya pertama kali masuk
 * layar (sekali saja), lalu diam di tempat.
 *
 * Nilainya di-render lewat MotionValue, bukan useState: jadi 60 frame per detik
 * tidak memicu re-render React dan animasinya tetap ringan walau dipakai banyak
 * kartu sekaligus.
 */
const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, duration = 2, className }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const sudahTerlihat = useInView(ref, { once: true, amount: 0.4 });
  const hematGerak = useReducedMotion();
  const meteran = useMotionValue(0);
  const tampil: MotionValue<string> = useTransform(meteran, (terbaru) => formatRibuan(terbaru));

  useEffect(() => {
    if (!sudahTerlihat) return;
    // Pengunjung yang meminta pengurangan gerak tidak dianimasi, langsung ke target.
    if (hematGerak) {
      meteran.set(value);
      return;
    }
    const animasi = animate(meteran, value, { duration, ease: 'easeOut' });
    return () => animasi.stop();
  }, [sudahTerlihat, hematGerak, meteran, value, duration]);

  return (
    <motion.span ref={ref} className={className}>
      {tampil}
    </motion.span>
  );
};

export default AnimatedNumber;
export { AnimatedNumber };
