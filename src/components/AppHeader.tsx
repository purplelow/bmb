'use client';

import Link from 'next/link';
import { Bell, Search } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

interface AppHeaderProps {
  title?: string;
  showSearch?: boolean;
  transparent?: boolean;
}

export function AppHeader({ title, showSearch = false, transparent = false }: AppHeaderProps) {
  const { user, isAuthenticated } = useAuthStore();

  return (
    <header className={`fixed top-0 left-0 right-0 h-header z-40 flex items-center pt-safe ${transparent ? 'bg-transparent border-none' : 'bg-white/95 backdrop-blur-md border-b border-border'}`}>
      <div className="container flex items-center justify-between">
        {title ? (
          <span className={`text-[17px] font-bold ${transparent ? 'text-white' : 'text-text-primary'}`}>
            {title}
          </span>
        ) : (
          <Link href="/" className="flex items-center gap-1.5">
            <div className="w-[30px] h-[30px] bg-brand rounded-lg flex items-center justify-center">
              <span className="text-[14px] font-black text-white leading-none">B</span>
            </div>
            <span className={`text-[18px] font-extrabold tracking-[-0.5px] ${transparent ? 'text-white' : 'text-text-primary'}`}>
              BBM
            </span>
          </Link>
        )}

        <div className="flex items-center gap-1">
          {showSearch && (
            <Link href="/search" className={`w-10 h-10 flex items-center justify-center rounded-xl ${transparent ? 'text-white' : 'text-text-secondary'}`}>
              <Search size={20} />
            </Link>
          )}
          <button className={`relative w-10 h-10 flex items-center justify-center rounded-xl ${transparent ? 'text-white' : 'text-text-secondary'}`}>
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-[7px] h-[7px] bg-brand rounded-full border-[1.5px] border-white" />
          </button>
          {isAuthenticated ? (
            <Link href="/mypage" className="w-8 h-8 bg-brand rounded-full flex items-center justify-center text-white text-[13px] font-bold">
              {user?.name?.charAt(0) ?? 'U'}
            </Link>
          ) : (
            <Link href="/login" className="h-8 px-3.5 bg-brand text-white rounded-full text-[13px] font-semibold flex items-center">
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
