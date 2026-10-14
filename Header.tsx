'use client';

import Link from 'next/link';
import { Search, Bell } from 'lucide-react';

export default function Header({ title = 'Football Live' }: { title?: string }) {
  return (
    <header className="sticky top-0 z-40 glass border-b border-[var(--border)] px-4 py-3">
      <div className="flex items-center justify-between max-w-lg mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <span className="text-white text-sm font-black">FL</span>
          </div>
          <div>
            <h1 className="text-base font-bold leading-tight">{title}</h1>
            <p className="text-[10px] text-[var(--muted)] leading-none">Tout le football. En direct.</p>
          </div>
        </Link>
        <div className="flex items-center gap-1">
          <Link
            href="/search"
            className="p-2.5 rounded-xl text-[var(--muted)] hover:text-white hover:bg-white/5 transition"
            aria-label="Recherche"
          >
            <Search size={20} />
          </Link>
          <button
            className="p-2.5 rounded-xl text-[var(--muted)] hover:text-white hover:bg-white/5 transition relative"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
          </button>
        </div>
      </div>
    </header>
  );
}
