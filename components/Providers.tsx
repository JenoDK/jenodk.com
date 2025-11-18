'use client';

import { ThemeProvider } from './ThemeProvider';
import Navigation from './Navigation';
import Footer from './Footer';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div className="relative flex w-full flex-col">
        <Navigation />
        <main className="flex-auto">{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

