'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Heart, User } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/',        icon: Home,   label: '홈' },
  { href: '/search',  icon: Search, label: '탐색' },
  { href: '/favorites', icon: Heart, label: '찜' },
  { href: '/mypage',  icon: User,   label: '마이' },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-bottomNav bg-white/95 backdrop-blur-md border-t border-border flex items-center justify-around z-50 pb-safe">
      {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center gap-1 py-2 px-4 transition duration-200 ease-out ${active ? 'text-brand' : 'text-text-muted'}`}
          >
            <Icon size={22} strokeWidth={active ? 2.5 : 1.8} fill={active ? 'var(--color-brand)' : 'none'} />
            <span className={`text-[10px] ${active ? 'font-bold' : 'font-medium'}`}>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
