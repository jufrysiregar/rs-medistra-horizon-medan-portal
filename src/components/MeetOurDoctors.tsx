'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CalendarDays, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useUIModal } from '../context/UIModalContext';
import OverhaulLink from './OverhaulLink';
import { fotoDokter } from '../data/dokterFoto';
import dokterData from '../data/dokter.json';

interface Jadwal {
  hari: string;
  mulai: string;
  selesai: string;
}

interface Dokter {
  id: string;
  nama: string;
  spesialis: string;
  poli: string[];
  jadwal: Jadwal[];
}

/** Fallback foto eksternal untuk dokter tanpa foto lokal di registry. */
const FOTO_FALLBACK =
  'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=200&q=70';

/** Padanan Inggris label `spesialis` dokter yang disorot (hanya 3 id ini yang tampil). */
const SPESIALIS_EN: Record<string, string> = {
  'Spesialis Orthopedi': 'Orthopedic Specialist',
  'Spesialis Penyakit Dalam': 'Internist',
  'Spesialis Obgyn': 'Ob-Gyn Specialist',
};

/** Tiga dokter yang disorot di beranda. Urutan daftar = urutan tampil. */
const SOROT = ['doc-agung', 'doc-jonathan', 'doc-miftah'];

const doctors = SOROT.map((dokId) => (dokterData as Dokter[]).find((d) => d.id === dokId)).filter(
  (d): d is Dokter => Boolean(d)
);

/** Nama hari Indonesia -> Inggris; nilai `hari` di dokter.json selalu Indonesia. */
const HARI_EN: Record<string, string> = {
  Senin: 'Monday',
  Selasa: 'Tuesday',
  Rabu: 'Wednesday',
  Kamis: 'Thursday',
  Jumat: 'Friday',
  Sabtu: 'Saturday',
  Minggu: 'Sunday',
};

/**
 * Gelar dokter Indonesia -> padanan Inggris. Nama dirinya tetap (nama orang tidak
 * diterjemahkan), hanya gelarnya: "dr." -> "MD", "Sp.OT" -> "Orthopedic Specialist",
 * dst. Sub-konsultan (KKV, K) dan singkatan foreign (FICS, FIHA) dilepas dari kartu EN.
 */
const GELAR_EN: Array<[RegExp, string]> = [
  [/\bSp\.Onk\.Rad(?![.\w])/g, 'Radiation Oncology Specialist'],
  [/\bSp\.THT(?![.\w])(?:,\s*BKL)?/g, 'ENT Specialist'],
  [/\bSp\.PD(?![.\w])(?:,\s*KKV)?/g, 'Internist'],
  [/\bSp\.A(?![.\w])(?:\(K\))?/g, 'Pediatrician'],
  [/\bSp\.OG(?![.\w])/g, 'Ob-Gyn Specialist'],
  [/\bSp\.OT(?![.\w])/g, 'Orthopedic Specialist'],
  [/\bSp\.JP(?![.\w])/g, 'Cardiologist'],
  [/\bSp\.S(?![.\w])/g, 'Neurologist'],
  [/\bSp\.P(?![.\w])/g, 'Pulmonologist'],
  [/\bSp\.M(?![.\w])/g, 'Ophthalmologist'],
  [/\bSp\.DVE(?![.\w])/g, 'Dermatologist'],
  [/\bSp\.KFR(?![.\w])/g, 'Rehabilitation Specialist'],
  [/\bdr\.(?=\s)/g, 'MD'],
];

const namaLokal = (nama: string, lang: string): string =>
  lang === 'en' ? GELAR_EN.reduce((acc, [re, gantinya]) => acc.replace(re, gantinya), nama) : nama;

/**
 * Ringkasan jadwal satu baris ala kartu dokter: daftar hari + jendela praktik
 * terawal sampai terlambat, mis. "Selasa, Rabu, Jumat (09:00 s.d. 19:00)".
 * Hari dan pemisah rentang ikut bahasa aktif.
 */
const ringkasJadwal = (jadwal: Jadwal[], lang: string): string => {
  if (!jadwal.length) return '';
  const hari = (h: string) => (lang === 'en' ? HARI_EN[h] ?? h : h);
  const pemisah = lang === 'en' ? 'to' : 's.d.';
  const jam = jadwal.flatMap((j) => [j.mulai, j.selesai]);
  if (!jam.length) return jadwal.map((j) => hari(j.hari)).join(', ');
  const urut = [...jam].sort();
  return `${jadwal.map((j) => hari(j.hari)).join(', ')} (${urut[0]} ${pemisah} ${urut[urut.length - 1]})`;
};

/**
 * TIM DOKTER BERANDA — dua kolom: kiri rating + judul + tombol, kanan tepat tiga kartu
 * dokter (foto, spesialisasi cyan, nama, jendela praktik, Buat Janji).
 *
 * Ukuran: wadah `max-w-[1500px]` + `lg:px-10` dengan split kolom 3:5. Lebar kolom kiri
 * hasilnya 508px, dan itu angka yang dicari-cari: dari pengukuran screenshot, pada 52px
 * "Tim Dokter Spesialis" = ~480px dan "Tim Dokter Spesialis &" = 525px, jadi hanya di
 * rentang 480-525px judulnya melipat jadi tiga baris rata kiri seperti referensi
 * ("Tim Dokter Spesialis" / "& Konsultan Medis" / "Presisi"). Kolom kanan 848px -> kartu
 * 269px, area nama 229px (~24 karakter/baris x 3 baris = 72, nama terpanjang ID 37 / EN 51
 * karakter aman). Deskripsi 1.3rem, baris jadwal kartu 17px, nama `line-clamp-3`.
 * Tidak ada zoom/scale dan tidak ada margin negatif di judul. Tombol Buat Janji memakai
 * kelas yang sama persis dengan kartu dokter di /cari-dokter supaya keduanya konsisten.
 */
export const MeetOurDoctors: React.FC = () => {
  const { t, language } = useLanguage();
  const { openBookingModal } = useUIModal();

  const isId = language === 'id';
  const jumlahSpesialis = (dokterData as Dokter[]).filter((d) =>
    d.spesialis.toLowerCase().startsWith('spesialis')
  ).length;

  return (
    <section className="w-full overflow-x-clip bg-white py-12 sm:py-16 lg:py-24 xl:py-32">
      <div className="mx-auto grid w-full max-w-[1500px] grid-cols-1 gap-10 px-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,5fr)] lg:items-center lg:gap-16 lg:px-10">
        {/* KOLOM KIRI: rating, judul, deskripsi, tombol lihat semua — masuk dari kiri,
            meluncur ke kanan (x: -48 -> 0) sambil memudar jadi terlihat. */}
        <motion.div
          initial={{ opacity: 0, x: -48 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} aria-hidden="true" className="h-6 w-6 fill-amber-400 text-amber-400" />
            ))}
          </div>

          {/* Judul dibiarkan rata kiri dengan paragraf/tombol di bawahnya. Pernah ditarik
              pakai -ml supaya muat tiga baris, tapi margin negatif pada blok ikut melebarkan
              width auto: hasilnya judul menjulur 96px ke kiri sendiri sementara rating,
              deskripsi, dan tombol tetap di x kolom -> tampak patah/tidak sejajar. Yang benar
              adalah melebarkan kolomnya (lihat catatan max-w-[1500px] di atas), bukan menggeser
              elemennya. */}
          <h2 className="mt-6 text-3xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-[2.6rem] lg:text-[52px]">
            {isId
              ? 'Tim Dokter Spesialis & Konsultan Medis Presisi'
              : 'Precision Specialist & Medical Consultant Team'}
          </h2>

          <p className="mt-6 text-[1.3rem] leading-[1.65] text-slate-600">
            {isId
              ? 'Didukung oleh tenaga medis berpengalaman dan sub spesialis berstandar internasional yang siap memberikan penanganan medis komprehensif serta berdedikasi bagi keselamatan Anda.'
              : 'Supported by experienced clinicians and international standard sub specialists, ready to deliver comprehensive medical care dedicated to your safety.'}
          </p>

          {/* Tombol "lihat semua" gaya grafit: tetap kotak membulat seperti bentuk aslinya
              (`rounded-xl` + px-6), hanya warnanya yang pil abu netral (#7e8084 -> #5b5d61).
              Tulisannya selalu putih, cuma tingkat keterlihatannya yang berubah: pudar
              (white/60) saat dibiarkan, penuh saat disentuh kursor / ditekan.
              Panah sengaja dilepas, jadi tidak perlu `group` di sini. */}
          <OverhaulLink
            href="/cari-dokter"
            className="mt-8 inline-flex min-h-[44px] w-full items-center justify-center rounded-xl bg-gradient-to-b from-[#7e8084] via-[#6c6d71] to-[#5b5d61] px-6 py-3.5 text-base font-bold text-white/60 shadow-[0_8px_20px_rgb(0,0,0,0.14)] transition-colors duration-300 hover:text-white active:text-white sm:w-auto"
          >
            {`${t('doctorsViewAll')} (${jumlahSpesialis} ${isId ? 'Spesialis' : 'Specialists'})`}
          </OverhaulLink>
        </motion.div>

        {/* KOLOM KANAN: tiga kartu dokter — porsinya 2/3 kolom grid supaya kartu lebih
            lebar dan nama dokter tidak terpotong. Masuk dari kanan ke kiri (x: 48 -> 0),
            berurutan dengan jeda 0.12s; easing panjang supaya terasa halus.
            Angkat kartu pakai whileHover, BUKAN `hover:-translate-y`: Framer Motion menulis
            transform sebagai inline style, dan inline menang atas kelas Tailwind — kalau
            lift dibiarkan jadi kelas, hover-nya tidak pernah jalan. Transisi ditulis per
            state (di dalam target), supaya `delay` masuk tidak ikut menunda lift hover. */}
        {/* Mobile 1 kolom (list ke bawah), tablet 2 kolom, 3 kolom sejajar baru di xl
            (di lg kolom kanan split 3:5 masih ~550px -- 3 kartu bakal sesak). */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {doctors.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, x: 48 }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: { duration: 0.65, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
              }}
              whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
              viewport={{ once: true }}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.05)] transition-[border-color,box-shadow] duration-300 hover:border-slate-300 hover:shadow-[0_18px_45px_rgb(0,0,0,0.12)]"
            >
              {/* `fill` butuh induk yang sudah punya ukuran sendiri: rasio 3/4 dipindah ke sini
                  (dulu 4/5) supaya foto dokter ikut lebih tinggi seiring kartu yang dibesarkan. */}
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-slate-100">
                <Image
                  src={fotoDokter(d.id, FOTO_FALLBACK)}
                  alt={namaLokal(d.nama, language)}
                  fill
                  sizes="(max-width: 640px) 88vw, (max-width: 1024px) 44vw, 240px"
                  className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => ((e.currentTarget as HTMLImageElement).style.opacity = '0')}
                />
              </div>

              <div className="flex flex-1 flex-col px-1 pb-1 pt-5">
                <div className="flex-1">
                  <p className="text-sm font-bold uppercase tracking-wide text-cyan-600">
                    {language === 'en' ? SPESIALIS_EN[d.spesialis] ?? d.spesialis : d.spesialis}
                  </p>
                  {/* Nama boleh sampai tiga baris (line-clamp-3): dengan font yang lebih
                      besar — dan varian EN yang lebih panjang — dua baris masih memotong
                      nama terpanjang (dr. Agung Hermansyah Manullang, Sp.OT). */}
                  <h3 className="mt-2 text-lg font-bold leading-snug text-slate-900" title={namaLokal(d.nama, language)}>
                    <span className="line-clamp-3">{namaLokal(d.nama, language)}</span>
                  </h3>
                  <p className="mt-2.5 flex items-start gap-1.5 text-[17px] leading-snug text-slate-500">
                    <CalendarDays className="mt-1 h-[18px] w-[18px] shrink-0 text-cyan-600" />
                    <span>{ringkasJadwal(d.jadwal, language)}</span>
                  </p>
                </div>

                {/* Kelas & perilaku identik dengan tombol Buat Janji di kartu dokter
                    /cari-dokter: gradient cyan->biru, dan id dokter ikut dikirim ke modal. */}
                <button
                  onClick={() => openBookingModal({ id: d.id })}
                  className="mt-5 min-h-[44px] w-full rounded-xl bg-gradient-to-r from-cyan-brand to-medical-blue px-4 py-3 text-base font-bold text-white shadow-lg shadow-cyan-brand/30 transition-all hover:brightness-110 active:scale-[0.98]"
                >
                  {isId ? 'Buat Janji' : 'Book Now'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetOurDoctors;
