import type { Language } from '../types';
import { getLang } from './lang';
import { WHO_FALLBACK_FOTO, type WhoNews } from './whoNewsTypes';

// Tipe & konstanta kartu tinggal di `whoNewsTypes` (ringan, aman untuk klien).
// Diimpor ulang di sini agar konsumen server tetap bisa mengambilnya dari satu pintu.
export { WHO_FALLBACK_FOTO, type WhoNews };

/**
 * PENGAMBILAN BERITA RESMI WHO via REST API (Server-Side).
 *
 * Beralih dari RSS parser ke endpoint OData resmi Sitefinity WHO:
 * `https://www.who.int/api/news/newsitems`. Datanya jauh lebih akurat dan
 * selalu sinkron dengan halaman "Latest news" (rilis hari ini pun sudah masuk),
 * mendukung `$orderby` tanggal, dan gambar tersedia lewat meta og: di halaman
 * artikel masing-masing.
 *
 * Aturan tampilan: hanya berita 30 hari terakhir (`HARI_MAKS`), maksimal 12
 * (`JUMLAH_MAKS`), diurutkan terbaru-dulu. API tidak mengirim ringkasan
 * (property Summary/Description tidak ada di skemanya), jadi ringkasan +
 * gambar tiap kartu diambil dari <meta og:description>/og:image halaman
 * artikel - jalan paralel, dan kartu tetap utuh (fallback lokal rapi) kalau
 * salah satu request gagal.
 *
 * Cache: `revalidate: 3600` = permintaan API dipakai ulang 1 jam, melindungi
 * server WHO dari rate limit. Di `next dev` cache fetch tidak aktif, jadi
 * setiap request menarik data fresh.
 */
export const WHO_API_URL =
  'https://www.who.int/api/news/newsitems?$orderby=PublicationDateAndTime%20desc';
export const REVALIDATE_S = 3600;

/** Ceiling keras getWhoNews: walau diminta lebih, tidak pernah lewat 12 item. */
export const JUMLAH_MAKS = 12;

/** Hanya berita terbit dalam 30 hari terakhir yang boleh tampil. */
export const HARI_MAKS = 30;

/** Bentuk item mentah dari OData WHO (field di luar ini bisa berubah sewaktu-waktu). */
type NewsItemRaw = {
  Id?: string;
  Title?: string;
  UrlName?: string;
  ItemDefaultUrl?: string;
  PublicationDateAndTime?: string;
  FormatedDate?: string;
  NewsType?: string;
};

const BULAN: Record<Language, string[]> = {
  id: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};

/** "31 Okt 2026" (tanpa dependensi ICU server agar hasilnya selalu sama). */
const tanggalBaca = (d: Date, lang: Language): string =>
  `${d.getDate()} ${BULAN[lang][d.getMonth()]} ${d.getFullYear()}`;

/**
 * Entitas HTML yang masih bisa muncul di meta og: halaman artikel WHO
 * (mis. &amp; dan &ndash;) sebelum dibersihkan jadi teks polos.
 */
const NAMA_ENTITAS: Record<string, string> = {
  nbsp: ' ', amp: '&', lt: '<', gt: '>', quot: '"', apos: "'",
  lsquo: '\u2018', rsquo: '\u2019', ldquo: '\u201C', rdquo: '\u201D',
  ndash: '\u2013', mdash: '\u2014', hellip: '\u2026', middot: '\u00B7',
  bull: '\u2022', times: '\u00D7', deg: '\u00B0', copy: '\u00A9', reg: '\u00AE',
  eacute: '\u00E9', egrave: '\u00E8', ecirc: '\u00EA', euml: '\u00EB',
  aacute: '\u00E1', agrave: '\u00E0', acirc: '\u00E2', auml: '\u00E4',
  iacute: '\u00ED', icirc: '\u00EE', iuml: '\u00EF',
  oacute: '\u00F3', ocirc: '\u00F4', ouml: '\u00F6', uacute: '\u00FA', uuml: '\u00FC',
  ntilde: '\u00F1', ccedil: '\u00E7', szlig: '\u00DF', euro: '\u20AC', trade: '\u2122',
};

/** Ubah &xxx; / &#123; / &#x7B; menjadi karakter aslinya. */
const bukaEntitas = (teks: string): string =>
  teks
    .replace(/&#x([0-9a-f]+);/gi, (_m, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_m, des) => String.fromCodePoint(Number(des)))
    .replace(/&([a-z]+);/gi, (cocok, nama: string) => NAMA_ENTITAS[nama.toLowerCase()] ?? cocok);

/** Teks bersih untuk ringkasan: buka entitas, buang tag HTML, rapatkan spasi. */
const bersihkanHtml = (teks: string): string =>
  bukaEntitas(teks)
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/** Potong di batas kata terdekat (maks default 150 karakter) + elipsis. */
const potong = (teks: string, maks = 150): string => {
  if (teks.length <= maks) return teks;
  const batas = teks.slice(0, maks).lastIndexOf(' ');
  return `${teks.slice(0, batas > 40 ? batas : maks).replace(/[,.;:]\s*$/, '')}…`;
};

/** true bila URL https dan host-nya who.int (www.who.int / cdn.who.int / dsb). */
const hostWho = (url: string): boolean => {
  try {
    const u = new URL(url);
    const host = u.hostname.toLowerCase();
    return u.protocol === 'https:' && (host === 'who.int' || host.endsWith('.who.int'));
  } catch {
    return false;
  }
};

/** Ambil absolut URL gambar (relatif terhadap who.int bila perlu). */
const absolutkanGambar = (src: string, dasar = 'https://www.who.int'): string | undefined => {
  if (!src || src.startsWith('data:')) return undefined;
  try {
    const u = new URL(src, dasar);
    return hostWho(u.href) ? u.href : undefined;
  } catch {
    return undefined;
  }
};

/**
 * URL artikel dari item API. `ItemDefaultUrl` bentuknya slug relatif
 * (`/30-10-2026-barbados-...`), halaman aslinya berada di bawah /news/item/.
 */
const linkArtikel = (it: NewsItemRaw): string | undefined => {
  const slug = (it.ItemDefaultUrl ?? '').trim();
  if (slug.startsWith('/news/item/')) return `https://www.who.int${slug}`;
  if (slug.startsWith('/')) return `https://www.who.int/news/item${slug}`;
  if (slug.startsWith('https://') && hostWho(slug)) return slug;
  // Fallback: rakit dari UrlName (slug sudah mengandung tanggal).
  const urlName = (it.UrlName ?? '').trim();
  return urlName ? `https://www.who.int/news/item/${urlName}` : undefined;
};

/**
 * true bila URL gambar merupakan logo / placeholder generik WHO, bukan foto
 * artikel. Contoh: /fallback/header-logos/h-logo-blue....svg
 */
const isGambarGenerik = (url: string): boolean => {
  const lower = url.toLowerCase();
  return lower.includes('fallback') || lower.includes('header-logo') || lower.endsWith('.svg');
};

/**
 * Meta open graph halaman artikel WHO (og:image + og:description). Jika
 * og:image ternyata logo/placeholder generik WHO (bukan foto berita), fungsi
 * ini mencari <img> pertama di body artikel yang mengarah ke cdn.who.int
 * sebagai pengganti. Gagal / timeout -> {}, kartu pakai fallback lokal.
 */
const ogMetaDari = async (link: string): Promise<{ image?: string; desc?: string }> => {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(link, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (RS-MHM-education-feed)' },
      cache: 'no-store',
    });
    clearTimeout(timer);
    if (!res.ok) return {};
    const html = await res.text();
    const ambil = (sifat: string) =>
      html.match(new RegExp('property="og:' + sifat + '"[^\>]+content="([^"]+)"', 'i'))?.[1] ??
      html.match(new RegExp('content="([^"]+)"[^>]*property="og:' + sifat + '"', 'i'))?.[1];
    const ogImg = ambil('image');
    const desk = ambil('description');

    // Tentukan gambar: og:image kalau foto asli, atau cari <img> di body.
    let image: string | undefined;
    if (ogImg) {
      const absolut = absolutkanGambar(bukaEntitas(ogImg));
      if (absolut && !isGambarGenerik(absolut)) image = absolut;
    }
    if (!image) {
      // og:image kosong/generik: scan <img> pertama dari cdn.who.int di body.
      const kandidat = [...html.matchAll(/<img[^>]+src="(https:\/\/cdn\.who\.int[^"]+)"/gi)];
      for (const m of kandidat) {
        const url = absolutkanGambar(m[1]);
        if (url && !isGambarGenerik(url)) { image = url; break; }
      }
    }

    return {
      image,
      desc: desk ? bersihkanHtml(desk) : undefined,
    };
  } catch {
    return {};
  }
};

/**
 * Ambil `limit` berita terbaru (maksimal `JUMLAH_MAKS`) dari REST API resmi WHO,
 * HANYA yang terbit dalam `HARI_MAKS` hari terakhir (filter client-side lewat
 * PublicationDateAndTime supaya tidak bergantung sintaks $filter server).
 * Ringkasan + gambar diisi dari og:description / og:image halaman artikel;
 * kalau semua gagal, kartu memakai fallback lokal. API down -> array kosong.
 */
export async function getWhoNews(limit: number): Promise<WhoNews[]> {
  const ambang = Math.min(Math.max(0, limit), JUMLAH_MAKS);
  if (ambang === 0) return [];

  try {
    // 1) Tarik daftar berita dari API resmi (di-cache 1 jam, aman rate limit).
    const res = await fetch(WHO_API_URL, {
      next: { revalidate: REVALIDATE_S },
      headers: { 'User-Agent': 'RS-MHM-education-feed/1.0', Accept: 'application/json' },
    });
    if (!res.ok) return [];
    const json = (await res.json()) as { value?: NewsItemRaw[] };
    const items = Array.isArray(json.value) ? json.value : [];

    // 2) Map + filter 30 hari terakhir. Loop defens: satu item rusak tidak
    //    boleh menjatuhkan seluruh halaman.
    const batas = Date.now() - HARI_MAKS * 24 * 60 * 60 * 1000;
    const lang = getLang();
    const berita: WhoNews[] = [];
    const terlihat = new Set<string>();
    for (const it of items) {
      try {
        if (typeof it.Title !== 'string' || !it.Title.trim()) continue;
        const waktu = it.PublicationDateAndTime ? Date.parse(it.PublicationDateAndTime) : NaN;
        if (Number.isNaN(waktu) || waktu < batas) continue; // terbit >30 hari lalu: buang
        const link = linkArtikel(it);
        if (!link || terlihat.has(link)) continue;
        terlihat.add(link);
        berita.push({
          id: link,
          judul: it.Title.trim(),
          link,
          tanggal: tanggalBaca(new Date(waktu), lang),
          waktu,
          ringkas: '', // diisi dari og:description di langkah 4
          gambar: undefined, // diisi dari og:image di langkah 4
          tipe: typeof it.NewsType === 'string' ? it.NewsType.trim() : undefined,
        });
      } catch {
        // Item anomali: lewati, jangan crash.
      }
    }

    // 3) Urut terbaru-dulu. Ambil buffer lebih banyak (ambang+8) karena beberapa
    //    artikel tidak punya foto dan akan disaring di langkah 5.
    berita.sort((a, b) => b.waktu - a.waktu);
    const kandidat = berita.slice(0, ambang + 8);

    // 4) Ringkasan + gambar via meta halaman artikel, jalan paralel. Kegagalan
    //    satu kartu tidak merusak kartu lain (ogMetaDari tidak pernah throw).
    await Promise.all(
      kandidat.map(async (n) => {
        const meta = await ogMetaDari(n.link);
        if (!n.gambar && meta.image) n.gambar = meta.image;
        if (!n.ringkas && meta.desc) n.ringkas = potong(meta.desc);
      }),
    );

    // 5) Buang artikel tanpa foto asli (og:image = logo generik / tidak ada img
    //    di body). Sisa hanya yang punya gambar berita WHO sungguhan, lalu slice
    //    ke jumlah yang diminta.
    const denganFoto = kandidat.filter((n) => !!n.gambar);
    return denganFoto.slice(0, ambang);
  } catch {
    // API down / JSON rusak: array kosong -> halaman tampil empty state.
    return [];
  }
}
