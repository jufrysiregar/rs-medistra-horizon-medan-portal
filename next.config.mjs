/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Foto dokter & mitra selalu lokal (src/images/), tapi fallback avatar di
    // mockData.ts / dokter.json masih menunjuk ke Unsplash. Didaftarkan di sini
    // supaya <Image> boleh ikut mengoptimalkan URL tersebut.
    // www.who.int + cdn.who.int: gambar artikel Berita WHO (thumbnail host-nya
    // berada di cdn.who.int via og:image), lihat src/lib/fetchWHO.ts.
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'www.who.int' },
      { protocol: 'https', hostname: 'cdn.who.int' },
    ],
  },
};

export default nextConfig;
