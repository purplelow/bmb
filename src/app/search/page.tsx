'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useBakeryStore, CATEGORIES } from '@/store/useBakeryStore';
import { BakeryCard } from '@/components/BakeryCard';
import { BottomNav } from '@/components/BottomNav';

const POPULAR_KEYWORDS = ['크루아상', '소금빵', '성수동', '강남 베이커리', '천연발효', '케이크'];

export default function SearchPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { bakeries, selectedCategory, setSelectedCategory } = useBakeryStore();
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(['한남동 베이커리', '아몬드 크루아상']);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const results = query.trim()
    ? bakeries.filter((b) =>
        b.nameKo.includes(query) ||
        b.name.toLowerCase().includes(query.toLowerCase()) ||
        b.tags.some((t) => t.includes(query)) ||
        b.shortDesc.includes(query) ||
        b.location.includes(query)
      )
    : [];

  const addRecent = (kw: string) => {
    setRecentSearches((prev) => [kw, ...prev.filter((r) => r !== kw)].slice(0, 5));
  };

  const handleSearch = (kw: string) => {
    setQuery(kw);
    addRecent(kw);
    inputRef.current?.blur();
  };

  return (
    <div className="min-h-[100dvh] bg-bg pb-20">
      {/* Search bar */}
      <div className="sticky top-0 z-40 bg-white border-b border-border pt-[52px] px-4 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex-1 flex items-center gap-2.5 h-12 px-4 bg-bg-input rounded-xl">
            <Search size={18} className="text-text-muted" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && query && addRecent(query)}
              placeholder="베이커리, 메뉴, 지역 검색"
              className="flex-1 border-none bg-transparent outline-none text-[15px] text-text-primary"
            />
            {query && (
              <button onClick={() => setQuery('')}>
                <X size={16} className="text-text-muted" />
              </button>
            )}
          </div>
          <button
            onClick={() => router.back()}
            className="text-[14px] font-semibold text-text-secondary whitespace-nowrap"
          >
            취소
          </button>
        </div>

        {/* Category chips */}
        <div className="scroll-row mt-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`chip ${selectedCategory === cat ? 'chip--active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* No query: show empty state suggestions */}
      <AnimatePresence mode="wait">
        {!query ? (
          <motion.div
            key="suggestions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-6 px-5"
          >
            {/* Recent */}
            {recentSearches.length > 0 && (
              <div className="mb-7">
                <div className="flex justify-between items-center mb-3.5">
                  <div className="flex items-center gap-2">
                    <Clock size={15} className="text-text-secondary" />
                    <h3 className="text-[14px] font-bold">최근 검색어</h3>
                  </div>
                  <button
                    onClick={() => setRecentSearches([])}
                    className="text-xs text-text-muted"
                  >
                    전체삭제
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((kw) => (
                    <button
                      key={kw}
                      onClick={() => handleSearch(kw)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-border text-[13px] font-medium text-text-secondary"
                    >
                      <Clock size={12} /> {kw}
                      <X size={11} onClick={(e) => { e.stopPropagation(); setRecentSearches((prev) => prev.filter((r) => r !== kw)); }} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular */}
            <div>
              <div className="flex items-center gap-2 mb-3.5">
                <TrendingUp size={15} className="text-brand" />
                <h3 className="text-[14px] font-bold">인기 검색어</h3>
              </div>
              <div className="flex flex-col bg-white rounded-2xl overflow-hidden border border-border">
                {POPULAR_KEYWORDS.map((kw, i) => (
                  <button
                    key={kw}
                    onClick={() => handleSearch(kw)}
                    className={`flex items-center py-3.5 px-4 gap-3.5 ${i < POPULAR_KEYWORDS.length - 1 ? 'border-b border-border' : ''}`}
                  >
                    <span
                      className={`w-[22px] h-[22px] rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                        i < 3 ? 'bg-brand text-white' : 'bg-bg-input text-text-secondary'
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="text-[14px] font-medium text-text-primary">{kw}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-4 px-5"
          >
            <p className="text-[13px] text-text-muted mb-4">
              &ldquo;{query}&rdquo; 검색 결과 {results.length}건
            </p>
            {results.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-[40px] mb-3">🔍</p>
                <p className="text-[16px] font-bold mb-1.5">검색 결과가 없어요</p>
                <p className="text-[13px] text-text-muted">다른 키워드로 검색해보세요</p>
              </div>
            ) : (
              <div className="flex flex-col">
                {results.map((b) => (
                  <BakeryCard key={b.id} bakery={b} variant="horizontal" />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
}
