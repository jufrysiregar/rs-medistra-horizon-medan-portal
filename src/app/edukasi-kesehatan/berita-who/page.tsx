import type { Metadata } from 'next';
import Image from 'next/image';
import { Calendar, CheckCircle, ExternalLink, Globe, MapPin, Newspaper, RefreshCw, Shield, Target, Users } from 'lucide-react';
import OverhaulLink from '../../../components/OverhaulLink';
import WhoNewsCard from '../../../components/WhoNewsCard';
import { getLang } from '../../../lib/lang';
import { tp } from '../../../lib/i18n';
import { getWhoNews } from '../../../lib/fetchWHO';
import type { WhoNews } from '../../../lib/whoNewsTypes';
import heroBerita from '@/images/berita/hero.jpg';

export async function generateMetadata(): Promise<Metadata> {
  const lang = getLang();
  return {
    title: tp(
      lang,
      'Berita Kesehatan Global | RS Medistra Horizon Medan',
      'Global Health News | Medistra Horizon Hospital Medan',
    ),
    description: tp(
      lang,
      'Rilis, peringatan, dan pengumuman resmi terbaru dari World Health Organization (WHO), ditarik otomatis dari API resmi dan diperbarui setiap jam.',
      'Latest official releases, alerts and announcements from the World Health Organization (WHO), pulled automatically from the official API and refreshed every hour.',
    ),
  };
}

/**
 * HALAMAN: Berita Kesehatan WHO (/edukasi-kesehatan/berita-who) — light mode.
 *
 * Sumber data: REST API resmi WHO (bukan RSS). Hanya rilis 30 hari terakhir,
 * maksimal 12 kartu, pembaruan otomatis tiap jam.
 * Urutan section: Hero gambar -> Profil WHO -> Grid Berita -> Nilai Inti WHO.
 */
export default async function BeritaKesehatanWhoPage() {
  const lang = getLang();
  const berita: WhoNews[] = await getWhoNews(12);

  return (
    <div className="bg-white text-slate-800">
      {/* ================= 1. HERO GAMBAR PENUH (TANPA TOMBOL) ================= */}
      <section className="relative flex min-h-[50vh] items-end overflow-hidden">
        <Image
          src={heroBerita}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-right md:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/60 to-slate-900/40" />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-40 lg:px-8 lg:pb-20">
          <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-tight text-white lg:text-6xl">
            {tp(lang, 'Berita Kesehatan Global', 'Global Health News')}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-200 lg:text-xl">
            {tp(
              lang,
              'Rilis, peringatan, dan pengumuman resmi terbaru dari World Health Organization (WHO) untuk mendukung literasi kesehatan Anda.',
              'The latest official releases, alerts and announcements from the World Health Organization (WHO) to support your health literacy.',
            )}
          </p>
        </div>
      </section>

      {/* ================= 2. PROFIL SINGKAT WHO (BENTO GRID) ================= */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            {/* Kolom kiri: teks pengantar (span 5). */}
            <div className="lg:col-span-5">
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 lg:text-4xl">
                {tp(lang, 'Profil Singkat WHO', 'WHO Short Profile')}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-600">
                {tp(
                  lang,
                  'WHO bekerja di seluruh dunia untuk mempromosikan kesehatan, menjaga dunia tetap aman, dan melayani kelompok rentan. Sebagai otoritas kesehatan global, WHO memimpin upaya penanganan darurat, penetapan standar medis, serta memastikan akses kesehatan universal tanpa diskriminasi.',
                  'WHO works across the globe to promote health, keep the world safe, and serve vulnerable populations. As the global health authority, WHO leads emergency response, sets medical standards, and ensures universal health access without discrimination.',
                )}
              </p>
              {/* Poin fungsi WHO dengan ikon centang. */}
              <ul className="mt-6 space-y-3">
                {[
                  tp(lang, 'Menetapkan standar pedoman medis global.', 'Sets global medical guideline standards.'),
                  tp(lang, 'Mengoordinasikan respons wabah dan darurat kesehatan.', 'Coordinates outbreak and health emergency responses.'),
                  tp(lang, 'Mendukung pembangunan sistem kesehatan di negara berkembang.', 'Supports health system development in developing countries.'),
                ].map((teks, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-base text-slate-700">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-cyan-600" />
                    <span>{teks}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kolom kanan: Bento Grid fakta (span 7). */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
              {/* Card 1: Berdiri Sejak. */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <span className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                  <Calendar className="h-6 w-6" />
                </span>
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  {tp(lang, 'Berdiri Sejak', 'Established Since')}
                </p>
                <p className="mt-1.5 text-xl font-extrabold text-slate-900">
                  {tp(lang, '7 April 1948', '7 April 1948')}
                </p>
              </div>
              {/* Card 2: Kantor Pusat. */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <span className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                  <MapPin className="h-6 w-6" />
                </span>
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  {tp(lang, 'Kantor Pusat', 'Headquarters')}
                </p>
                <p className="mt-1.5 text-xl font-extrabold text-slate-900">
                  {tp(lang, 'Geneva, Swiss', 'Geneva, Switzerland')}
                </p>
              </div>
              {/* Card 3: Negara Anggota. */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <span className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                  <Globe className="h-6 w-6" />
                </span>
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  {tp(lang, 'Negara Anggota', 'Member States')}
                </p>
                <p className="mt-1.5 text-xl font-extrabold text-slate-900">
                  {tp(lang, '194 Negara', '194 Countries')}
                </p>
              </div>
              {/* Card 4: Fokus Utama. */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <span className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                  <Target className="h-6 w-6" />
                </span>
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  {tp(lang, 'Fokus Utama', 'Core Focus')}
                </p>
                <p className="mt-1.5 text-xl font-extrabold text-slate-900">
                  {tp(lang, 'Kesehatan Universal', 'Universal Health')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. GRID BERITA (HEADER + BADGE + TOMBOL) ================= */}
      <section className="bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 lg:text-4xl">
                {tp(lang, 'News Update from WHO :', 'News Update from WHO :')}
              </h2>
              {/* Badge info pembaruan data. */}
              <span className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-500">
                <RefreshCw className="h-3.5 w-3.5 text-cyan-600" />
                {tp(lang, 'Pembaruan otomatis setiap 1 jam', 'Auto-refreshed every 1 hour')}
              </span>
            </div>
            <OverhaulLink
              href="https://www.who.int/"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-600/25 transition-all hover:from-cyan-700 hover:to-blue-800 hover:shadow-xl"
            >
              {tp(lang, 'Visit Link WHO', 'Visit Link WHO')}
              <ExternalLink className="h-4 w-4" />
            </OverhaulLink>
          </div>

          {berita.length === 0 ? (
            <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-slate-300 bg-white px-8 py-16 text-center">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Newspaper className="h-8 w-8" />
              </span>
              <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">
                {tp(lang, 'Berita sedang tidak tersedia', 'News is temporarily unavailable')}
              </h3>
              <p className="max-w-xl text-lg leading-relaxed text-slate-600">
                {tp(
                  lang,
                  'API resmi WHO sementara tidak dapat dihubungi dari server kami, atau tidak ada rilis dalam 30 hari terakhir. Halaman ini memeriksa ulang secara otomatis setiap jam.',
                  'The official WHO API is unreachable from our server right now, or there are no releases within the last 30 days. This page re-checks automatically every hour.',
                )}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {berita.map((item) => (
                <WhoNewsCard
                  key={item.id}
                  berita={item}
                  lang={lang}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= 4. NILAI INTI WHO (3 CARD, TANPA CTA) ================= */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <h2 className="mb-10 text-center text-3xl font-extrabold tracking-tight text-slate-900 lg:text-4xl">
            {tp(lang, 'Nilai Inti WHO', 'Core Values of WHO')}
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Card 1: Fokus Global */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center transition-all hover:bg-white hover:shadow-md">
              <span className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Globe className="h-7 w-7" />
              </span>
              <h3 className="text-lg font-extrabold text-slate-900">
                {tp(lang, 'Fokus Global', 'Global Focus')}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {tp(
                  lang,
                  'Menangani berbagai isu kesehatan lintas negara, dari penyakit menular hingga kesehatan lingkungan.',
                  'Addressing health issues across nations, from infectious diseases to environmental health.',
                )}
              </p>
            </div>
            {/* Card 2: Kesiapsiagaan Darurat */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center transition-all hover:bg-white hover:shadow-md">
              <span className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <Shield className="h-7 w-7" />
              </span>
              <h3 className="text-lg font-extrabold text-slate-900">
                {tp(lang, 'Kesiapsiagaan Darurat', 'Emergency Preparedness')}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {tp(
                  lang,
                  'Mengoordinasikan respons internasional terhadap wabah penyakit dan krisis kesehatan.',
                  'Coordinating international response to disease outbreaks and health crises.',
                )}
              </p>
            </div>
            {/* Card 3: Akses Universal */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center transition-all hover:bg-white hover:shadow-md">
              <span className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                <Users className="h-7 w-7" />
              </span>
              <h3 className="text-lg font-extrabold text-slate-900">
                {tp(lang, 'Akses Universal', 'Universal Access')}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {tp(
                  lang,
                  'Memastikan setiap individu memiliki akses ke layanan kesehatan yang layak tanpa diskriminasi.',
                  'Ensuring every individual has access to quality healthcare without discrimination.',
                )}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
