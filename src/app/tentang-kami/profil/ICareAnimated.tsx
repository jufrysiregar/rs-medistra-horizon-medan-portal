'use client';

import { useEffect, useRef, useState, type FC } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

/* ==================== ICARE ANIMASI (LOOP 3 FASE) ==================== */
/*
  Timeline berjalan terus selama baris ini terlihat di layar:
    FASE 1   0 - 2 dtk : hanya huruf I C A R E (muncul satu per satu dari bawah)
    FASE 2   2 - 5 dtk : huruf cross-fade menjadi kata utuh
    FASE 3   5 - 12 dtk: deskripsi muncul, ditahan lebih lama biar terbaca
  Setelah 12 dtk kembali ke FASE 1.

  Dua aturan penting supaya tidak menggerakkan layout halaman:
  1. Tinggi baris ini PATEN. Huruf dan kata berbagi satu slot absolute, dan deskripsi
     selalu menempati ruang aslinya (hanya opacity/transform yang dianimasikan, bukan
     height). Kalau height yang dianimasikan, card membesar-mengecil tiap 12 dtk dan
     section di bawahnya (Struktur Organisasi) ikut bergeser naik turun.
  2. Loop berhenti saat baris ini keluar viewport, lalu diulang dari FASE 1 ketika
     diskrol lagi ke sini. Jadi tidak ada teks yang berubah sendiri di luar layar.
*/

export type NilaiIcare = { kode: string; nama: string; ket: string };

const FASE = { HURUF: 1, KATA: 2, DESKRIPSI: 3 } as const;
type Fase = (typeof FASE)[keyof typeof FASE];

/** Lamanya tiap fase ditahan (ms). Total satu siklus = 12 dtk. */
const DURASI: Record<Fase, number> = { 1: 2000, 2: 3000, 3: 7000 };

/** Urutan fase berikutnya; fase 3 memutar kembali ke fase 1. */
const BERIKUTNYA: Record<Fase, Fase> = { 1: 2, 2: 3, 3: 1 };

/** Jarak antar huruf saat stagger fase 1 (detik). */
const JARAK_HURUF = 0.12;

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Tinggi pita huruf/kata saat FASE 3 (px). Di fase 1 dan 2 pita ini melebar jadi
 * sebesar card sehingga huruf duduk di tengah; saat deskripsi muncul, tingginya
 * dikecilkan ke nilai ini dan hurufnya otomatis terdorong ke atas.
 */
const PITA_HURUF = 96;

const ICareAnimated: FC<{ nilai: NilaiIcare[] }> = ({ nilai }) => {
  const wadah = useRef<HTMLDivElement>(null);
  // Diambil dari card pertama: semua card sama tinggi karena grid merentaknya.
  const dalam = useRef<HTMLDivElement>(null);
  const [tinggiDalam, setTinggiDalam] = useState(0);
  const masukViewport = useInView(wadah, { once: false, amount: 0.35 });
  // Pengguna yang minta sistem minim gerakan: tampilkan state akhir, tanpa loop.
  const minimGerak = useReducedMotion() === true;
  const [fase, setFase] = useState<Fase>(FASE.HURUF);

  useEffect(() => {
    if (minimGerak) return;
    // Di luar viewport: timer dilepas dan fase direset, jadi animasi tidak jalan diam-diam.
    if (!masukViewport) {
      setFase(FASE.HURUF);
      return;
    }
    const timer = setTimeout(() => setFase(BERIKUTNYA[fase]), DURASI[fase]);
    return () => clearTimeout(timer);
  }, [fase, masukViewport, minimGerak]);

  // Tinggi area dalam card dibutuhkan supaya pita bisa dianimasikan antar dua nilai px
  // (100% dan 6rem tidak bisa diinterpolasi mulus oleh Framer Motion).
  useEffect(() => {
    const el = dalam.current;
    if (!el) return;
    const ukur = () => setTinggiDalam(el.clientHeight);
    ukur();
    const pengamat = new ResizeObserver(ukur);
    pengamat.observe(el);
    return () => pengamat.disconnect();
  }, []);

  const faseAktif: Fase = minimGerak ? FASE.DESKRIPSI : fase;
  // Sebelum baris ini masuk viewport, ketiga lapisan sengaja kosong. Kalau tidak,
  // huruf sudah muncul sejak halaman dimuat padahal section-nya masih di luar
  // layar, sehingga stagger fase 1 tidak pernah terlihat.
  const belumMulai = !masukViewport && !minimGerak;
  const tHuruf = !belumMulai && faseAktif === FASE.HURUF;
  const tKata = !belumMulai && (faseAktif === FASE.KATA || faseAktif === FASE.DESKRIPSI);
  const tKet = !belumMulai && faseAktif === FASE.DESKRIPSI;

  return (
    /* Batas lebar baris ICARE lebih lebar dari kolom teks Visi/Misi di atasnya: modul ini
       memang satu-satunya yang berisi 5 card sebaris, dan max-w-7xl adalah standar lebar
       situs ini (Membership, Navigasi Gedung, Laundry). Breakout-nya lokal di komponen
       ini supaya Visi/Misi tidak ikut melebar. Sisa 2.5rem dari 100vw menjaga scrollbar
       klasik tidak memunculkan scroll horizontal. */
    <div className="relative left-1/2 mt-20 w-[calc(100vw_-_2.5rem)] max-w-7xl -translate-x-1/2 px-6 lg:px-12">
      <div ref={wadah} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {nilai.map((n, i) => (
          <div
            key={n.kode}
            className="relative flex h-full flex-col items-center overflow-hidden rounded-3xl border border-sky-200 bg-gradient-to-br from-sky-100 to-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md lg:p-6"
          >
            {/* Blob langit di pojok; dipotong overflow-hidden agar tidak keluar kotak */}
            <span className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-sky-200/60 blur-2xl" />

            {/* Area dalam card: satu-satunya anak flow, jadi tingginya sama di semua
                card (grid merentakan card). Pita huruf mengacu ke kotak ini. */}
            <div ref={i === 0 ? dalam : undefined} className="relative flex w-full flex-1 flex-col">
              {/* Pita huruf/kata: absolute, jadi melebar-menyempit tidak mengubah tinggi card */}
              <motion.div
                className="absolute inset-x-0 top-0 flex items-center justify-center overflow-hidden"
                initial={false}
                animate={{ height: tKet ? PITA_HURUF : tinggiDalam || '100%' }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <motion.span
                  className="absolute text-6xl font-extrabold leading-none text-sky-900"
                  initial={false}
                  animate={tHuruf ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -14, scale: 0.9 }}
                  transition={{
                    duration: tHuruf ? 0.5 : 0.35,
                    ease: EASE,
                    delay: tHuruf ? i * JARAK_HURUF : 0,
                  }}
                >
                  {n.kode}
                </motion.span>

                <motion.span
                  className="absolute max-w-full px-1 text-xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-2xl lg:text-xl"
                  initial={false}
                  animate={tKata ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 14, scale: 0.94 }}
                  transition={{
                    duration: 0.45,
                    ease: EASE,
                    delay: tKata ? 0.15 : 0,
                  }}
                >
                  {n.nama}
                </motion.span>
              </motion.div>

              {/* Cadangan tempat pita huruf: tingginya tetap, jadi titik awal semua
                  deskripsi sejajar antar card dan tinggi baris tidak pernah berubah */}
              <div aria-hidden className="w-full shrink-0" style={{ height: PITA_HURUF }} />

              {/* Deskripsi: ruangnya selalu dicadangkan, yang dianimasikan hanya opacity/geser */}
              <motion.p
                className="w-full text-base leading-relaxed text-slate-600"
                initial={false}
                animate={tKet ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.5, ease: EASE, delay: tKet ? 0.1 : 0 }}
              >
                {n.ket}
              </motion.p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ICareAnimated;
