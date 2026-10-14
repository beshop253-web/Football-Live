'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Trophy, Newspaper, User, CircleDot } from 'lucide-react';
import clsx from 'clsx';

const items = [
  { href: '/', label: 'Accueil', icon: Home },
  { href: '/matches', label: 'Matchs', icon: CircleDot },
  { href: '/competitions', label: 'Compétitions', icon: Trophy },
  { href: '/news', label: 'Actualités', icon: Newspaper },
  { href: '/profile', label: 'Profil', icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-[var(--border)] safe-area-pb">
      <div className="max-w-lg mx-auto flex items-center justify-around h-16 px-1">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'flex flex-col items-center justify-center gap-0.5 flex-1 py-2 transition-colors',
                active ? 'text-[var(--accent)]' : 'text-[var(--muted)] hover:text-white'
              )}
            >
              <Icon size={22} strokeWidth={active ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
