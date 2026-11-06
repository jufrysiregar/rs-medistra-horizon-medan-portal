/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060D17',
          900: '#0B192C',
          800: '#11223A',
          700: '#1A3355',
          600: '#234471',
        },
        cyan: {
          brand: '#00B4D8',
          light: '#E0F7FA',
          glow: '#38BDF8',
          accent: '#06D6A0',
        },
        medical: {
          red: '#E63946',
          darkRed: '#D62828',
          green: '#10B981',
          gold: '#F59E0B',
          blue: '#2563EB',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(11, 25, 44, 0.12)',
        'glow': '0 0 20px rgba(0, 180, 216, 0.35)',
        'glow-red': '0 0 20px rgba(230, 57, 70, 0.4)',
      },
      /* Didefinisikan di config (bukan globals.css) supaya ikut jadi utility Tailwind
         dan bisa dipanggil lewat varian, mis. `group-hover:animate-arrow-nudge` pada
         kartu cepat Beranda: panah bergoyang kiri-kanan selama kartunya di-hover. */
      keyframes: {
        'arrow-nudge': {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(5px)' },
        },
        /* Sapuan warna pada bingkai gradien (kartu BMI): background-position digeser
           bolak-balik, jadi hue-nya mengalir di pinggiran tanpa loncat di ujung loop. */
        'border-flow': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
        /* Goyang kiri-kanan penuh (bukan cuma ke kanan seperti arrow-nudge), untuk
           chip panah kartu BMI. */
        'arrow-sway': {
          '0%, 100%': { transform: 'translateX(-4px)' },
          '50%': { transform: 'translateX(4px)' },
        },
        /* Warna berganti-ganti: hue-rotate 360deg pada elemen berlatar solid, jadi
           satu warna dasar (cyan-500) berputar melewati seluruh roda warna. */
        'hue-cycle': {
          '0%': { filter: 'hue-rotate(0deg)' },
          '100%': { filter: 'hue-rotate(360deg)' },
        },
      },
      animation: {
        'arrow-nudge': 'arrow-nudge 0.9s ease-in-out infinite',
        'border-flow': 'border-flow 5.5s ease-in-out infinite alternate',
        'arrow-sway': 'arrow-sway 1.2s ease-in-out infinite',
        'hue-cycle': 'hue-cycle 4s linear infinite',
      },
    },
  },
  plugins: [],
};
