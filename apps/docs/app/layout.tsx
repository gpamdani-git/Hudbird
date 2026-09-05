// apps/docs/app/layout.tsx
"use client";

import './globals.css';
import { Inter } from 'next/font/google';
import { useState, useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-[rgb(var(--background))]/80 backdrop-blur-md">
          <div className="container mx-auto flex h-16 items-center justify-between px-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[rgb(var(--primary))] rounded flex items-center justify-center font-bold text-white shadow-lg shadow-[rgb(var(--primary))]/20">
                HG
              </div>
              <span className="font-bold tracking-wide text-sm uppercase">Halo Gemini UI</span>
            </div>
            <button
              onClick={() => setIsDark(!isDark)}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all hover:bg-muted h-10 w-10 border border-transparent hover:border-border"
              aria-label="Toggle dark mode"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>
        </header>
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
