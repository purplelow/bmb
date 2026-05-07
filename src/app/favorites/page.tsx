'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBakeryStore } from '@/store/useBakeryStore';
import { BottomNav } from '@/components/BottomNav';

export default function FavoritesPage() {
  const { bakeries, toggleFavorite } = useBakeryStore();
  const favorites = bakeries.filter((b) => b.isFavorite);

  return (
    <div className="min-h-[100dvh] bg-bg pb-20">
      {/* Header */}
      <div className="bg-white border-b border-border pt-14 px-5 pb-4">
        <h1 className="text-[22px] font-extrabold">찜 목록</h1>
        <p className="text-[13px] text-text-muted mt-1">
          {favorites.length}개의 베이커리를 저장했어요
        </p>
      </div>

      {/* Content */}
      <div className="p-4 px-5">
        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 gap-3"
          >
            <div className="w-20 h-20 rounded-full bg-brand-surface flex items-center justify-center text-[36px]">
              🥐
            </div>
            <h2 className="text-[18px] font-bold">아직 찜한 곳이 없어요</h2>
            <p className="text-[14px] text-text-secondary text-center leading-relaxed">
              마음에 드는 베이커리의 ❤️ 버튼을 눌러<br />나만의 목록을 만들어보세요
            </p>
            <Link href="/" className="mt-2 h-12 px-7 bg-brand text-white rounded-full text-[15px] font-bold flex items-center">
              베이커리 탐색하기
            </Link>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-3">
            <AnimatePresence>
              {favorites.map((b, i) => (
                <motion.div
                  key={b.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link href={`/bakery/${b.id}`}>
                    <div className="flex gap-3.5 bg-white rounded-2xl overflow-hidden border border-border p-3 shadow-sm">
                      <div className="relative w-[100px] h-[100px] shrink-0">
                        <Image src={b.image} alt={b.name} fill className="object-cover rounded-xl" />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex gap-1.5 mb-1">
                            {b.tags.slice(0, 2).map((tag) => (
                              <span key={tag} className="text-[10px] font-semibold text-brand bg-brand-surface px-1.5 py-0.5 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <p className="text-[16px] font-bold mb-1 line-clamp-1">{b.nameKo}</p>
                          <p className="text-xs text-text-secondary line-clamp-2">{b.shortDesc}</p>
                        </div>
                        <div className="flex items-center justify-between mt-1.5">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <Star size={12} fill="#ffa826" stroke="none" />
                              <span className="text-[13px] font-bold">{b.rating}</span>
                            </div>
                            <div className="flex items-center gap-1 text-text-muted">
                              <MapPin size={11} />
                              <span className="text-[11px]">{b.location}</span>
                            </div>
                          </div>
                          <button
                            onClick={(e) => { e.preventDefault(); toggleFavorite(b.id); }}
                            className="w-8 h-8 rounded-[10px] bg-[#fff0f0] flex items-center justify-center"
                          >
                            <Heart size={15} fill="var(--color-brand)" stroke="var(--color-brand)" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
