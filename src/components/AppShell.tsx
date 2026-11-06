'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { HeaderNavbar } from '../components/HeaderNavbar';
import { Footer } from '../components/Footer';
import { BookingModal } from '../components/BookingModal';
import { EmergencyModal } from '../components/EmergencyModal';

/**
 * Kerangka aplikasi global: Header, Footer, dan Modal tingkat dunia.
 * Digunakan oleh RootLayout sehingga seluruh route halaman otomatis konsisten.
 *
 * `logoStatik` hanya true di beranda (rute persis "/") dan diteruskan ke Footer; header
 * sudah menghitung sendiri dari pathname-nya. Tujuannya: di beranda logo bukan tombol
 * pulang dan teksnya tidak bisa diblokir/dicopy. Di halaman lain perilaku tetap seperti
 * semula. AppShell ikut ter-render ulang saat pindah rute, jadi prop ini selalu benar.
 */
export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const logoStatik = pathname === '/';
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 selection:bg-cyan-500 selection:text-white relative">
      <HeaderNavbar />
      <main className="flex-1">{children}</main>
      <Footer statik={logoStatik} />
      <BookingModal />
      <EmergencyModal />
    </div>
  );
};

export default AppShell;
