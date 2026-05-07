"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronRight, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { BakeryCard } from "@/components/BakeryCard";
import { useBakeryStore, CATEGORIES } from "@/store/useBakeryStore";

// ─── Intro ──────────────────────────────────────────────────────────────────
function Intro({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-200 bg-[#1a1814] flex flex-col items-center justify-center gap-4"
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className="w-18 h-18 bg-brand rounded-[20px] flex items-center justify-center"
      >
        <span className="text-4xl font-black text-white">B</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center"
      >
        <p className="text-[28px] font-extrabold text-white tracking-[-0.5px]">BBM</p>
        <p className="text-[13px] text-white/50 mt-1">서울 최고의 베이커리를 발견하세요</p>
      </motion.div>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 48 }}
        transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
        className="h-0.75 bg-brand rounded mt-3"
      />
    </motion.div>
  );
}

// ─── Hero Banner ─────────────────────────────────────────────────────────────
const BANNERS = [
  {
    id: 1,
    label: "지금 가장 핫한",
    title: "소금빵 맛집 TOP 5",
    color: "#ff6b35",
    image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    label: "이번 주 신규 오픈",
    title: "성수동 새 베이커리",
    color: "#6c63ff",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    label: "주말 특집",
    title: "브런치 가볼 만한 곳",
    color: "#2da44e",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",
  },
];

function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % BANNERS.length), 3500);
    return () => clearInterval(t);
  }, []);

  const banner = BANNERS[current];

  return (
    <div className="relative mx-5 rounded-[20px] overflow-hidden h-[160px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={banner.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image src={banner.image} alt={banner.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/65 via-black/20 to-transparent" />
          <div className="absolute bottom-5 left-5">
            <span
              className="inline-block text-white text-[11px] font-bold px-2.5 py-1 rounded-md mb-2"
              style={{ background: banner.color }}
            >
              {banner.label}
            </span>
            <p className="text-[20px] font-extrabold text-white leading-snug">{banner.title}</p>
          </div>
        </motion.div>
      </AnimatePresence>
      {/* Dots */}
      <div className="absolute bottom-3 right-4 flex gap-1.5">
        {BANNERS.map((_, i) => (
          <div
            key={i}
            className={`h-[5px] rounded-full transition-all duration-300 ease-in-out ${i === current ? "w-4 bg-white" : "w-[5px] bg-white/40"}`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Section Header ──────────────────────────────────────────────────────────
function SectionHeader({ title, href }: { title: string; href?: string }) {
  return (
    <div className="flex items-center justify-between px-5">
      <h2 className="text-[17px] font-extrabold">{title}</h2>
      {href && (
        <Link href={href} className="flex items-center gap-0.5 text-[13px] text-text-muted font-medium">
          더보기 <ChevronRight size={14} />
        </Link>
      )}
    </div>
  );
}

// ─── Quick Categories ────────────────────────────────────────────────────────
function QuickCategories({ selected, onChange }: { selected: string; onChange: (c: string) => void }) {
  const ICONS: Record<string, string> = {
    전체: "🍞",
    크루아상: "🥐",
    소금빵: "🧂",
    케이크: "🎂",
    도넛: "🍩",
    식빵: "🍞",
    베이글: "🥯",
  };
  return (
    <div className="scroll-row px-5">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className="flex flex-col items-center gap-1 shrink-0 min-w-[60px]"
        >
          <div
            className={`w-[52px] h-[52px] rounded-2xl flex items-center justify-center text-[22px] transition duration-200 border-[1.5px] ${
              selected === cat
                ? "bg-brand border-brand shadow-[0_4px_12px_rgba(255,107,53,0.3)]"
                : "bg-bg-card border-border shadow-sm"
            }`}
          >
            {ICONS[cat] ?? "🍞"}
          </div>
          <span
            className={`text-[11px] ${selected === cat ? "font-bold text-brand" : "font-medium text-text-secondary"}`}
          >
            {cat}
          </span>
        </button>
      ))}
    </div>
  );
}

// ─── Home Page ───────────────────────────────────────────────────────────────
export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true);
  const { bakeries, selectedCategory, setSelectedCategory, searchQuery } = useBakeryStore();

  const filtered = bakeries.filter(
    (b) =>
      (selectedCategory === "전체" || b.category === selectedCategory) &&
      (searchQuery === "" ||
        b.nameKo.includes(searchQuery) ||
        b.name.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  const nearbyBakeries = bakeries.filter((b) => b.isOpen).slice(0, 3);
  const popularBakeries = [...bakeries].sort((a, b) => b.rating - a.rating).slice(0, 5);

  return (
    <>
      <AnimatePresence>{showIntro && <Intro onDone={() => setShowIntro(false)} />}</AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="min-h-[100dvh] bg-bg pb-20"
      >
        <AppHeader showSearch />

        {/* Search bar */}
        <div className="pt-20 px-5 pb-3">
          <Link href="/search">
            <div className="flex items-center gap-2.5 h-12 px-4 bg-bg-card border-[1.5px] border-border rounded-2xl shadow-sm">
              <Search size={18} className="text-text-muted" />
              <span className="text-[14px] text-text-muted font-normal">베이커리, 메뉴를 검색해보세요</span>
            </div>
          </Link>
        </div>

        <div className="flex flex-col gap-7">
          {/* Hero Banner */}
          <HeroBanner />

          {/* Categories */}
          <div>
            <SectionHeader title="카테고리" />
            <div className="mt-3.5">
              <QuickCategories selected={selectedCategory} onChange={setSelectedCategory} />
            </div>
          </div>

          {/* 내 주변 영업중 */}
          <div>
            <SectionHeader title="🔥 지금 영업중" href="/search" />
            <div className="scroll-row pt-3.5 px-5">
              {nearbyBakeries.map((b) => (
                <BakeryCard key={b.id} bakery={b} variant="featured" />
              ))}
            </div>
          </div>

          {/* 평점 높은 순 */}
          <div>
            <SectionHeader title="⭐ 평점 TOP 베이커리" href="/search" />
            <div className="pt-3.5 px-5 flex flex-col gap-0">
              {popularBakeries.map((b) => (
                <BakeryCard key={b.id} bakery={b} variant="horizontal" />
              ))}
            </div>
          </div>

          {/* 카테고리별 그리드 */}
          {selectedCategory !== "전체" && (
            <div>
              <SectionHeader title={`${selectedCategory} 베이커리`} />
              <div className="grid grid-cols-2 gap-3 pt-3.5 px-5">
                {filtered.map((b) => (
                  <BakeryCard key={b.id} bakery={b} />
                ))}
              </div>
            </div>
          )}

          {selectedCategory === "전체" && (
            <div>
              <SectionHeader title="모든 베이커리" href="/search" />
              <div className="grid grid-cols-2 gap-3 pt-3.5 px-5">
                {bakeries.map((b) => (
                  <BakeryCard key={b.id} bakery={b} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Location bar */}
        <div className="flex items-center justify-center gap-1.5 pt-8 pb-2 text-text-muted text-xs">
          <MapPin size={12} />
          <span>서울 전체 · 6개의 베이커리</span>
        </div>
      </motion.div>

      <BottomNav />
    </>
  );
}
