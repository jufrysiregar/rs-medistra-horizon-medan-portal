'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CalendarDays, CircleCheck, ClipboardList, Info, MapPin, MessageCircle, Video } from 'lucide-react';
import OverhaulLink from '../../../../components/OverhaulLink';
import { eventPromoGambar } from '../../../../data/eventPromoFoto';
import { useLanguage } from '../../../../context/LanguageContext';
import type { EventPromo } from '../../../../types';

/** Badge tipe, warna identik dengan kartu di halaman list. */
const BADGE: Record<EventPromo['type'], { label: { id: string; en: string }; kelas: string }> = {
  promo: { label: { id: 'Promo', en: 'Promo' }, kelas: 'bg-red-100 text-red-700 ring-1 ring-inset ring-red-200' },
  event: { label: { id: 'Event', en: 'Event' }, kelas: 'bg-blue-100 text-blue-700 ring-1 ring-inset ring-blue-200' },
};

/** "1450000" -> "1.450.000" (titik ribuan, gaya Indonesia) tanpa bergantung pada ICU server. */
const ribu = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

/**
 * Judul sidebar. Isinya HANYA item yang sejenis dengan halaman yang sedang dibuka:
 * buka promo = daftar promo lainnya, buka event = daftar event lainnya.
 */
const JUDUL_SIDEBAR: Record<EventPromo['type'], { id: string; en: string }> = {
  promo: { id: 'Promo Lainnya', en: 'Other Promos' },
  event: { id: 'Event Lainnya', en: 'Other Events' },
};

/**
 * Satu baris "lainnya" di sidebar: thumbnail flyer/foto (gambar sama dengan kartu
 * list), judul, dan tanggal. Seluruh baris satu tautan ke halaman detail slug-nya,
 * jadi tidak ada anchor bersarang. Badge tipe tidak dipasang karena judul sidebar
 * sudah menyatakan jenisnya.
 */
const BarisLainnya: React.FC<{ item: EventPromo }> = ({ item }) => {
  const gambar = eventPromoGambar(item);

  return (
    <OverhaulLink
      href={`/tentang-kami/event-promo/${item.slug}`}
      className="group -mx-3 flex items-start gap-4 rounded-2xl px-3 py-3.5 transition-colors duration-200 hover:bg-slate-50"
    >
      <span className="relative block h-[68px] w-[92px] shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-slate-100 via-white to-slate-100">
        {gambar && (
          <Image
            src={gambar}
            alt={item.image_alt}
            fill
            sizes="92px"
            className={`object-cover ${item.image_fit === 'contain' ? 'object-top' : 'object-center'}`}
            loading="lazy"
          />
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-bold leading-snug text-slate-800 transition-colors duration-200 group-hover:text-cyan-700 line-clamp-2">
          {item.title}
        </span>
        <span className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
          <CalendarDays className="h-3.5 w-3.5 shrink-0 text-slate-400" />
          <span className="truncate">{item.date}</span>
        </span>
      </span>
    </OverhaulLink>
  );
};

/**
 * HALAMAN DETAIL EVENT & PROMO (/tentang-kami/event-promo/[slug]).
 * Dua kolom: konten rata kiri (gambar besar, judul, baris tanggal + lokasi,
 * rincian, catatan) dan sidebar di kanan berisi item SEJENIS lainnya yang bisa
 * diklik ke halaman detailnya masing-masing. Judul tetap hanya satu (H1) dan tidak
 * ada teks di atas gambar. Tombol CTA hijau besar dan link "Kembali"/"Lihat semua"
 * sengaja tidak ditampilkan; khusus halaman event, tautan join (Zoom/WA/formulir)
 * tetap disajikan sebagai satu baris teks biasa di bawah deskripsi.
 */
export const EventPromoDetailClient: React.FC<{ item: EventPromo; lainnya: EventPromo[] }> = ({ item, lainnya }) => {
  const { language } = useLanguage();
  const badge = BADGE[item.type];
  /* Ikon ikut jenis tautan: WhatsApp, Zoom, atau formulir pendaftaran. */
  const IkonJoin = item.cta_link.includes('wa.me')
    ? MessageCircle
    : item.cta_link.includes('zoom.us')
      ? Video
      : ClipboardList;
  /* Item yang perlu menunjukkan alamat tautannya (mis. formulir) mengisi cta_link_teks,
     jadi label berubah jadi teks pengantar di depan tautan. */
  const teksTautan = item.cta_link_teks ?? item.cta_label;
  /* Gambar = flyer/foto yang sama dengan kartu di list & Beranda (satu sumber). */
  const gambar = eventPromoGambar(item);
  const poster = item.image_fit === 'contain';
  /* Sidebar: hanya item sejenis dengan halaman ini (promo = promo, event = event). */
  const sejenis = lainnya.filter((o) => o.type === item.type);

  return (
    <div className="bg-white text-slate-800">
      <div className="mx-auto w-full max-w-7xl px-6 pb-24 pt-28 lg:px-8 lg:pt-32">
        <div className="grid grid-cols-1 gap-x-12 gap-y-14 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_380px]">
          <main className="min-w-0">
            {/* ================= JUDUL (SATUNYA H1 DI HALAMAN INI) ================= */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>
              <span className={`inline-flex rounded-full px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider ${badge.kelas}`}>
                {badge.label[language]}
              </span>
              <h1 className="mt-5 text-4xl font-extrabold leading-[1.12] tracking-tight text-slate-900 lg:text-5xl">
                {item.title}
              </h1>
              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-base font-semibold text-slate-600">
                <p className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 shrink-0 text-slate-400" />
                  {item.date}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 shrink-0 text-slate-400" />
                  {item.location}
                </p>
              </div>
            </motion.div>

            {/* ================= GAMBAR BESAR ================= */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              className="mt-10"
            >
              {gambar &&
                (poster ? (
                  /* Poster promo: dipajang utuh di atas panggung muda, tidak ada info terpotong. */
                  <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6 lg:p-10">
                    <div className="relative mx-auto aspect-[3/4] w-full max-w-lg">
                      <Image
                        src={gambar}
                        alt={item.image_alt}
                        fill
                        sizes="(max-width: 1024px) 92vw, 512px"
                        className="object-contain drop-shadow-2xl"
                        priority
                      />
                    </div>
                  </div>
                ) : (
                  <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-slate-100 shadow-xl shadow-slate-200/70">
                    <Image
                      src={gambar}
                      alt={item.image_alt}
                      fill
                      sizes="(max-width: 1024px) 92vw, 860px"
                      className="object-cover"
                      priority
                    />
                  </div>
                ))}
            </motion.div>

            {/* ================= DESKRIPSI LENGKAP ================= */}
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18, ease: 'easeOut' }}
              className="mt-10 border-l-4 border-slate-200 pl-6 lg:pl-8"
            >
              <p className="text-lg leading-relaxed text-slate-700">{item.description}</p>
            </motion.article>

            {/* ================= TAUTAN JOIN (KHUSUS EVENT, TEKS BIASA) ================= */}
            {item.type === 'event' && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.2, ease: 'easeOut' }}
                className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/70 px-6 py-5"
              >
                <p className="flex flex-wrap items-center gap-x-2.5 gap-y-2 text-lg font-semibold text-slate-700">
                  <IkonJoin className="h-5 w-5 shrink-0 text-cyan-600" />
                  {item.cta_link_teks && <span>{item.cta_label}:</span>}
                  <a
                    href={item.cta_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`font-bold text-cyan-700 underline decoration-cyan-200 underline-offset-4 transition-colors hover:text-cyan-800 hover:decoration-cyan-400 ${item.cta_link_teks ? 'break-all' : ''}`}
                  >
                    {teksTautan}
                  </a>
                </p>
                {item.kontak && (
                  <p className="mt-2 text-base font-semibold text-slate-500">{item.kontak}</p>
                )}
              </motion.div>
            )}

            {/* ================= RINCIAN PAKET / FASILITAS ================= */}
            {item.rincian && item.rincian.length > 0 && (
              <div className="mt-12 space-y-6">
                {item.rincian.map((r) => (
                  <motion.section
                    key={r.nama}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="rounded-3xl border border-slate-200 bg-slate-50/70 p-6 lg:p-8"
                  >
                    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
                      <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">{r.nama}</h2>
                      {(r.harga !== undefined || r.hargaCoret !== undefined) && (
                        <p className="flex items-baseline gap-3">
                          {r.hargaCoret !== undefined && (
                            <span className="text-lg font-semibold text-slate-400 line-through">Rp {ribu(r.hargaCoret)}</span>
                          )}
                          {r.harga !== undefined && (
                            <span className="text-3xl font-extrabold tracking-tight text-slate-900">Rp {ribu(r.harga)}</span>
                          )}
                        </p>
                      )}
                    </div>
                    <ul className="mt-6 grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
                      {r.item.map((f) => (
                        <li key={f} className="flex gap-2.5 text-lg leading-relaxed text-slate-700">
                          <CircleCheck className="mt-1 h-5 w-5 shrink-0 text-emerald-600" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.section>
                ))}
              </div>
            )}

            {/* ================= CATATAN / SYARAT ================= */}
            {item.catatan && item.catatan.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8"
              >
                <h2 className="flex items-center gap-2.5 text-lg font-extrabold uppercase tracking-wide text-slate-800">
                  <Info className="h-5 w-5 shrink-0 text-cyan-600" />
                  {language === 'en' ? 'Terms & Notes' : 'Catatan & Ketentuan'}
                </h2>
                <ul className="mt-5 space-y-3">
                  {item.catatan.map((c) => (
                    <li key={c} className="flex gap-2.5 text-lg leading-relaxed text-slate-700">
                      <CircleCheck className="mt-1 h-5 w-5 shrink-0 text-cyan-600" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </main>

          {/* ================= SIDEBAR: ITEM SEJENIS LAINNYA (KANAN, STICKY) ================= */}
          {sejenis.length > 0 && (
            <motion.aside
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.18, ease: 'easeOut' }}
              className="min-w-0 lg:sticky lg:top-28 lg:self-start"
              aria-label={language === 'en' ? 'Other related items' : 'Item lainnya yang sejenis'}
            >
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
                  {JUDUL_SIDEBAR[item.type][language]}
                </h2>

                <div className="mt-2 divide-y divide-slate-100">
                  {sejenis.map((o) => (
                    <BarisLainnya key={o.slug} item={o} />
                  ))}
                </div>
              </div>
            </motion.aside>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventPromoDetailClient;
