import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, BadgeCheck, CalendarDays, CircleX, Lightbulb, Share2 } from 'lucide-react';
import OverhaulLink from '../../../../components/OverhaulLink';
import { getLang } from '../../../../lib/lang';
import { tp, tpObj, trMonths, type Bilingual } from '../../../../lib/i18n';
import artikel2 from '../../../../images/artikel/artikel-2.jpg';

export async function generateMetadata(): Promise<Metadata> {
  const lang = getLang();
  return {
    title: tp(
      lang,
      'Mitos vs Fakta Seputar Medical Check-Up (MCU) | RS Medistra Horizon Medan',
      'Medical Check-Up: Myths vs Facts (MCU) | Medistra Horizon Hospital Medan',
    ),
    description: tp(
      lang,
      'Banyak yang menunda MCU karena anggapan keliru. Simak 4 mitos vs fakta medical check-up: kapan sebaiknya diperiksa, prosedurnya, biayanya, dan cara membaca hasilnya.',
      'Many postpone MCU due to misconceptions. See 4 myths vs facts about medical check-ups: when to screen, the procedures, the cost, and how to read your results.',
    ),
  };
}

/** Satu pasangan mitos-fakta yang diluruskan. */
type MitosFakta = {
  nomor: number;
  judul: Bilingual;
  mitos: Bilingual;
  fakta: Bilingual;
};

const DAFTAR: MitosFakta[] = [
  {
    nomor: 1,
    judul: {
      id: 'Mitos: "MCU Hanya Perlu Dilakukan Saat Sakit atau Ada Keluhan"',
      en: 'Myth: "MCU Is Only Needed When You Are Sick or Have Complaints"',
    },
    mitos: {
      id: 'Pemeriksaan kesehatan hanya membuang-buang waktu jika tubuh terasa bugar dan tidak ada gejala penyakit apa pun.',
      en: 'A health check is a waste of time as long as you feel fit and have no symptoms of any disease.',
    },
    fakta: {
      id: 'MCU justru bertujuan utama untuk deteksi dini saat tubuh masih sehat. Banyak penyakit berbahaya (seperti hipertensi, diabetes, atau kolesterol tinggi) pada tahap awal tidak menunjukkan gejala sama sekali. Deteksi sejak dini jauh lebih mudah ditangani sebelum berkembang menjadi komplikasi.',
      en: 'In fact, the whole point of an MCU is early detection while you are still healthy. Many dangerous conditions — such as hypertension, diabetes, or high cholesterol — cause no symptoms at all in their early stages. Caught early, they are far easier to manage before they develop into complications.',
    },
  },
  {
    nomor: 2,
    judul: {
      id: 'Mitos: "Prosedur MCU Itu Menakutkan, Menyakitkan, dan Rumit"',
      en: 'Myth: "MCU Procedures Are Scary, Painful, and Complicated"',
    },
    mitos: {
      id: 'Bayangan jarum suntik yang banyak dan alat-alat medis yang menyeramkan membuat orang takut melakukan MCU.',
      en: 'The thought of many needles and intimidating medical equipment makes people afraid to have an MCU.',
    },
    fakta: {
      id: 'Sebagian besar prosedur MCU bersifat non-invasif (tanpa bedah atau sayatan), nyaman, dan cepat. Pengambilan sampel darah atau tes penunjang lainnya dilakukan secara profesional oleh tenaga medis yang berpengalaman agar pasien merasa aman dan nyaman.',
      en: 'Most MCU procedures are non-invasive (no surgery or incisions), comfortable, and quick. Blood samples and any supporting tests are carried out professionally by experienced medical staff so that patients feel safe and at ease.',
    },
  },
  {
    nomor: 3,
    judul: {
      id: 'Mitos: "Biaya Medical Check-Up Sangat Mahal"',
      en: 'Myth: "A Medical Check-Up Is Very Expensive"',
    },
    mitos: {
      id: 'Melakukan pemeriksaan kesehatan menyeluruh adalah pemborosan finansial yang hanya menghabiskan uang.',
      en: 'A thorough health check is a financial waste that only burns through your money.',
    },
    fakta: {
      id: 'MCU adalah bentuk investasi kesehatan jangka panjang. Mengetahui kondisi tubuh lebih awal justru dapat menyelamatkan Anda dari biaya pengobatan penyakit berat di masa depan yang jauh lebih besar. Saat ini juga banyak pilihan paket MCU yang bisa disesuaikan dengan usia dan kebutuhan anggaran.',
      en: 'An MCU is a long-term investment in your health. Knowing your body’s condition earlier can actually spare you the far larger cost of treating serious illness later on. Today there are also many MCU packages that can be matched to your age and budget.',
    },
  },
  {
    nomor: 4,
    judul: {
      id: 'Mitos: "Hasil MCU Seringkali Membingungkan dan Tidak Jelas"',
      en: 'Myth: "MCU Results Are Confusing and Unclear"',
    },
    mitos: {
      id: 'Angka-angka dan istilah medis di lembar hasil lab membuat orang awam merasa bingung.',
      en: 'The numbers and medical terms on a lab result sheet leave laypeople feeling confused.',
    },
    fakta: {
      id: 'Hasil MCU selalu dilengkapi dengan lembar interpretasi atau konsultasi langsung dengan dokter. Dokter akan menjelaskan secara mendetail apa arti dari setiap angka pemeriksaan serta memberikan saran gaya hidup yang tepat untuk Anda.',
      en: 'MCU results always come with an interpretation sheet or a direct consultation with a doctor. The doctor will explain in detail what each figure means and give you lifestyle advice that fits your situation.',
    },
  },
];

/**
 * HALAMAN ARTIKEL: Mitos vs Fakta Seputar Medical Check-Up (24 Okt 2026) —
 * tanpa hero, konten rata kiri di container max-w-6xl dengan background putih
 * polos (pola sama seperti halaman artikel hipertensi). Setiap poin menampilkan
 * pernyataan mitos (merah muda) yang diluruskan dengan fakta (emerald).
 */
export default function ArtikelMitosFaktaMcuPage() {
  const lang = getLang();
  return (
    <div className="bg-white text-slate-800">
      <main className="mx-auto w-full max-w-6xl px-6 pt-24 pb-16 lg:px-8 lg:pt-28">
        {/* ============ JUDUL ARTIKEL (RATA KIRI) ============ */}
        <header>
          <div className="flex items-center gap-2 text-base font-semibold text-slate-500">
            <CalendarDays className="h-5 w-5 text-cyan-600" />
            <span className="font-extrabold text-slate-700">{tp(lang, 'Diposting:', 'Posted:')}</span>
            {trMonths(lang, '24 Oktober 2026')}
          </div>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 lg:text-5xl">
            {tp(lang, 'Mitos vs Fakta Seputar Medical Check-Up (MCU)', 'Medical Check-Up (MCU): Myths vs Facts')}
          </h1>
        </header>

        {/* ============ GAMBAR UTAMA ============ */}
        <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-3xl shadow-xl shadow-slate-200/60">
          <Image
            src={artikel2}
            alt={tp(lang, 'Ilustrasi perbandingan mitos dan fakta medical check-up', 'Illustration comparing medical check-up myths and facts')}
            fill
            sizes="(max-width: 1152px) 100vw, 1152px"
            className="object-cover"
            priority
          />
        </div>

        {/* ============ ISI ARTIKEL ============ */}
        <article>
          {/* Paragraf pembuka */}
          <div className="mt-10 space-y-5 text-lg leading-relaxed text-slate-700">
            <p>
              {tp(lang, 'Banyak dari kita yang sering menunda atau bahkan menghindari medical check-up karena termakan oleh berbagai anggapan keliru yang beredar di masyarakat.', 'Many of us often postpone — or even avoid — a medical check-up because we believe the various misconceptions that circulate in society.')}
            </p>
            <p className="font-semibold text-slate-800">
              {tp(lang, 'Yuk, kita luruskan dengan membandingkan mitos dan fakta seputar MCU berikut ini!', 'Let’s set the record straight by comparing these myths and facts about MCU!')}
            </p>
          </div>

          {/* Empat pasangan mitos vs fakta */}
          <div className="mt-12 space-y-10">
            {DAFTAR.map((d) => (
              <section key={d.nomor} className="rounded-3xl border border-slate-200 bg-slate-50/70 p-7 shadow-sm lg:p-9">
                <div className="flex items-start gap-5">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 text-2xl font-extrabold text-white shadow-lg shadow-cyan-600/25">
                    {d.nomor}
                  </span>
                  <h2 className="pt-1.5 text-2xl font-extrabold leading-snug tracking-tight text-slate-900 lg:text-[1.7rem]">
                    {tpObj(lang, d.judul)}
                  </h2>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
                  {/* Kotak Mitos (keliru) */}
                  <div className="rounded-2xl border-l-4 border-rose-400 bg-rose-50/70 p-5">
                    <p className="flex items-center gap-2 text-base font-extrabold uppercase tracking-wide text-rose-600">
                      <CircleX className="h-5 w-5" />
                      {tp(lang, 'Mitos', 'Myth')}
                    </p>
                    <p className="mt-3 text-lg leading-relaxed text-slate-700">{tpObj(lang, d.mitos)}</p>
                  </div>

                  {/* Kotak Fakta (yang benar) */}
                  <div className="rounded-2xl border-l-4 border-emerald-500 bg-emerald-50/70 p-5">
                    <p className="flex items-center gap-2 text-base font-extrabold uppercase tracking-wide text-emerald-700">
                      <BadgeCheck className="h-5 w-5" />
                      {tp(lang, 'Fakta', 'Fact')}
                    </p>
                    <p className="mt-3 text-lg leading-relaxed text-slate-700">{tpObj(lang, d.fakta)}</p>
                  </div>
                </div>
              </section>
            ))}
          </div>

          {/* Penutup */}
          <div className="mt-12 rounded-3xl bg-gradient-to-br from-cyan-600 to-teal-600 p-8 text-white shadow-xl shadow-cyan-600/25 lg:p-10">
            <div className="flex items-start gap-4">
              <Lightbulb className="mt-1 h-8 w-8 shrink-0 text-white/90" />
              <div>
                <p className="text-xl font-extrabold leading-relaxed lg:text-2xl">{tp(lang, 'Kesimpulan:', 'Conclusion:')}</p>
                <p className="mt-3 text-lg leading-relaxed text-white/90">
                  {tp(lang, 'Jangan tunggu sampai tubuh memberikan sinyal kesakitan. Melakukan medical check-up secara berkala adalah langkah awal terbaik untuk memastikan masa depan yang lebih sehat, tenang, dan berkualitas!', 'Do not wait until your body sends signals of illness. Having a medical check-up regularly is the best first step towards a healthier, calmer, and higher-quality future!')}
                </p>
              </div>
            </div>
            <p className="mt-6 text-lg font-semibold leading-relaxed text-white/95 text-balance">
              <span className="inline-flex items-center gap-2 align-middle">
                <Share2 className="h-5 w-5 shrink-0" />
                {tp(lang, 'Bagikan informasi ini ke keluarga dan teman-temanmu agar semakin banyak', 'Share this information with your family and friends so that more and more')}
              </span>{' '}
              {tp(lang, 'anak muda yang sadar pentingnya kesehatan sejak dini!', 'young people realise how important health is, starting early!')}
            </p>
          </div>

          {/* CTA lanjutan: teks lentur di kiri, dua tombol selalu sebaris di kanan */}
          <div className="mt-12 flex flex-col items-center gap-5 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm lg:flex-row lg:justify-between lg:p-8">
            <p className="min-w-0 flex-1 text-center text-lg font-semibold text-slate-700 lg:text-left">
              {tp(lang, 'Sudah tidak ragu lagi soal MCU? Saatnya jadwalkan pemeriksaan kesehatan Anda.', 'No more doubts about MCU? It is time to schedule your health check.')}
            </p>
            <div className="flex shrink-0 flex-wrap items-center justify-center gap-3">
              <OverhaulLink
                href="/layanan/cek-kesehatan"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-700 px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-cyan-600/25 transition-all hover:from-cyan-700 hover:to-blue-800 hover:shadow-xl"
              >
                {tp(lang, 'Lihat Paket MCU', 'See MCU Packages')}
                <ArrowRight className="h-5 w-5" />
              </OverhaulLink>
              <OverhaulLink
                href="/edukasi-kesehatan/artikel"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-base font-bold text-slate-700 transition-all hover:border-cyan-300 hover:text-cyan-700"
              >
                <ArrowLeft className="h-5 w-5" />
                {tp(lang, 'Artikel Lainnya', 'More Articles')}
              </OverhaulLink>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
