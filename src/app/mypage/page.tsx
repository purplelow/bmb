'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Heart, ChevronRight, Star, Bell, Shield,
  HelpCircle, LogOut, Settings, Bookmark, MapPin,
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useBakeryStore } from '@/store/useBakeryStore';
import { BottomNav } from '@/components/BottomNav';
import * as Avatar from '@radix-ui/react-avatar';

function StatPill({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="text-center flex-1">
      <p className="text-[22px] font-extrabold text-text-primary">{value}</p>
      <p className="text-[12px] text-text-muted mt-0.5">{label}</p>
    </div>
  );
}

function MenuRow({ icon, label, badge, href, danger }: {
  icon: React.ReactNode; label: string; badge?: string; href?: string; danger?: boolean;
}) {
  const Inner = (
    <div className={`flex items-center p-[15px] px-5 border-b border-border ${danger ? 'text-status-error' : 'text-text-primary'}`}>
      <div className={`mr-3.5 ${danger ? 'text-status-error' : 'text-text-secondary'}`}>{icon}</div>
      <span className="flex-1 text-[15px] font-medium">{label}</span>
      {badge && (
        <span className="text-[11px] font-bold text-brand bg-brand-surface px-2 py-0.5 rounded-md mr-2">
          {badge}
        </span>
      )}
      {!danger && <ChevronRight size={16} className="text-text-muted" />}
    </div>
  );
  return href ? <Link href={href} className="block">{Inner}</Link> : <button className="w-full text-left">{Inner}</button>;
}

export default function MyPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { bakeries } = useBakeryStore();
  const favorites = bakeries.filter((b) => b.isFavorite);
  const avgRating = (bakeries.reduce((s, b) => s + b.rating, 0) / bakeries.length).toFixed(1);

  if (!isAuthenticated) {
    return (
      <div className="min-h-[100dvh] bg-bg flex flex-col items-center justify-center gap-5 p-6">
        <div className="w-20 h-20 rounded-full bg-brand-surface flex items-center justify-center text-[36px]">
          🥐
        </div>
        <div className="text-center">
          <h2 className="text-[22px] font-extrabold mb-2">로그인이 필요해요</h2>
          <p className="text-[14px] text-text-secondary leading-relaxed">
            로그인하고 찜한 베이커리와<br />나의 리뷰를 확인하세요
          </p>
        </div>
        <Link href="/login" className="w-full max-w-[280px] h-[52px] bg-brand text-white rounded-2xl text-[16px] font-bold flex items-center justify-center">
          로그인 / 회원가입
        </Link>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-bg pb-20">
      {/* Profile Header */}
      <div className="bg-white pt-14 border-b border-border">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-5 px-5"
        >
          <div className="flex items-center gap-4 mb-5">
            {/* Avatar */}
            <Avatar.Root className="relative w-[68px] h-[68px] rounded-full overflow-hidden shrink-0 shadow-[0_4px_16px_rgba(255,107,53,0.35)]">
              <Avatar.Image src={user?.avatar} alt={user?.name || ''} className="w-full h-full object-cover" />
              <Avatar.Fallback className="w-full h-full bg-gradient-to-br from-brand to-[#ff9a70] flex items-center justify-center text-[28px] font-black text-white">
                {user?.name?.charAt(0).toUpperCase()}
              </Avatar.Fallback>
            </Avatar.Root>
            <div className="flex-1">
              <h1 className="text-[20px] font-extrabold mb-0.5">{user?.name}</h1>
              <p className="text-[13px] text-text-secondary">{user?.email}</p>
              <div className="flex gap-1.5 mt-1.5">
                <span className="text-[11px] font-bold text-brand bg-brand-surface px-2 py-0.5 rounded-md">
                  베이커리 탐험가
                </span>
              </div>
            </div>
            <Link href="#" className="w-9 h-9 rounded-[10px] bg-bg-input flex items-center justify-center text-text-secondary">
              <Settings size={18} />
            </Link>
          </div>

          {/* Stats */}
          <div className="flex py-4 border-t border-border">
            <StatPill value={favorites.length} label="찜한 곳" />
            <div className="w-px bg-border" />
            <StatPill value={bakeries.length} label="탐험한 곳" />
            <div className="w-px bg-border" />
            <StatPill value={avgRating} label="평균 별점" />
          </div>
        </motion.div>
      </div>

      {/* Favorites section */}
      <div className="p-6 px-5 pt-6 pb-2">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <Heart size={16} color="var(--color-brand)" fill="var(--color-brand)" />
            <h2 className="text-[16px] font-bold">찜한 베이커리</h2>
          </div>
          <Link href="/favorites" className="text-[13px] text-text-muted flex items-center gap-0.5">
            전체보기 <ChevronRight size={14} />
          </Link>
        </div>

        {favorites.length === 0 ? (
          <div className="py-8 px-5 text-center bg-white rounded-2xl border-[1.5px] border-dashed border-border">
            <p className="text-[32px] mb-2.5">🥐</p>
            <p className="text-[14px] font-semibold text-text-secondary mb-1">
              아직 찜한 베이커리가 없어요
            </p>
            <p className="text-[13px] text-text-muted">
              마음에 드는 베이커리를 ❤️ 눌러 저장해보세요
            </p>
          </div>
        ) : (
          <div className="scroll-row -mx-5 px-5 pb-2">
            {favorites.map((b) => (
              <Link key={b.id} href={`/bakery/${b.id}`}>
                <div className="w-[130px] shrink-0 bg-white rounded-2xl overflow-hidden border border-border shadow-sm">
                  <div className="relative h-[90px]">
                    <Image src={b.image} alt={b.name} fill className="object-cover" />
                  </div>
                  <div className="p-2 px-2.5 pb-2.5">
                    <p className="text-[13px] font-bold line-clamp-1">{b.nameKo}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={10} fill="#ffa826" stroke="none" />
                      <span className="text-[11px] font-semibold">{b.rating}</span>
                      <span className="text-[10px] text-text-muted">· {b.location}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Recent activity */}
      <div className="p-2 px-5 pb-4">
        <div className="flex items-center gap-2 mb-3.5">
          <Bookmark size={16} className="text-text-secondary" />
          <h2 className="text-[16px] font-bold">최근 본 베이커리</h2>
        </div>
        <div className="flex flex-col bg-white rounded-2xl overflow-hidden border border-border">
          {bakeries.slice(0, 3).map((b, i) => (
            <Link key={b.id} href={`/bakery/${b.id}`}>
              <div className={`flex items-center gap-3 p-3 px-4 ${i < 2 ? 'border-b border-border' : ''}`}>
                <div className="relative w-11 h-11 rounded-[10px] overflow-hidden shrink-0">
                  <Image src={b.image} alt={b.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold line-clamp-1">{b.nameKo}</p>
                  <p className="text-[12px] text-text-muted">{b.location} · {b.distance}</p>
                </div>
                <div className="flex items-center gap-0.5 shrink-0">
                  <Star size={11} fill="#ffa826" stroke="none" />
                  <span className="text-[12px] font-bold">{b.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Menu */}
      <div className="bg-white border-t-[8px] border-bg-input mt-2">
        <MenuRow icon={<Bell size={18} />} label="알림 설정" href="#" />
        <MenuRow icon={<MapPin size={18} />} label="내 지역 설정" badge="강남구" href="#" />
        <MenuRow icon={<Shield size={18} />} label="개인정보 보호" href="#" />
        <MenuRow icon={<HelpCircle size={18} />} label="고객센터" href="#" />
      </div>

      <div className="bg-white border-t-[8px] border-bg-input mt-2">
        <button
          onClick={() => { logout(); router.push('/'); }}
          className="w-full text-left"
        >
          <div className="flex items-center p-[15px] px-5 text-status-error">
            <LogOut size={18} className="mr-3.5" />
            <span className="text-[15px] font-medium">로그아웃</span>
          </div>
        </button>
      </div>

      <p className="text-center text-[11px] text-text-muted py-5 pb-2">
        BBM v1.0.0 · © 2026 Bakery Box Market
      </p>

      <BottomNav />
    </div>
  );
}
