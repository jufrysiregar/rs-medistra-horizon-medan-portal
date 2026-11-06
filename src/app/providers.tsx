'use client';

import React from 'react';
import { LanguageProvider } from '../context/LanguageContext';
import { UIModalProvider } from '../context/UIModalContext';
import { AppShell } from '../components/AppShell';
import type { Language } from '../types';

/**
 * initialLanguage dikirim dari RootLayout (server) agar render pertama klien langsung
 * cocok dengan HTML dari server — tanpa kilatan bahasa Indonesia saat cookie = en.
 */
export const Providers: React.FC<{ children: React.ReactNode; initialLanguage?: Language }> = ({
  children,
  initialLanguage,
}) => {
  return (
    <LanguageProvider initialLanguage={initialLanguage}>
      <UIModalProvider>
        <AppShell>{children}</AppShell>
      </UIModalProvider>
    </LanguageProvider>
  );
};

export default Providers;
