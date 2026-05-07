'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  ChevronLeft, Heart, Share2, Star, MapPin, Clock,
  Phone, Globe, X,
} from 'lucide-react';
import { useBakeryStore } from '@/store/useBakeryStore';
import * as Tabs from '@radix-ui/react-tabs';
import * as Dialog from '@radix-ui/react-dialog';
import * as Avatar from '@radix-ui/react-avatar';

export default function BakeryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { bakeries, toggleFavorite } = useBakeryStore();
  const bakery = bakeries.find((b) => b.id === id);
  const [lightbox, setLightbox] = useState<string | null>(null);

  if (!bakery) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center gap-4">
        <p className="text-[18px] font-bold">베이커리를 찾을 수 없어요</p>
        <button onClick={() => router.push('/')} className="text-brand font-semibold">홈으로</button>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-bg pb-[100px]">

      {/* ── Hero Image ────────────────────────────────── */}
      <div className="relative h-[300px]">
        <Image src={bakery.image} alt={bakery.name} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

        {/* Top controls */}
        <div className="absolute top-0 left-0 right-0 flex justify-between items-center pt-[52px] px-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white"
          >
            <ChevronLeft size={22} />
          </button>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white">
              <Share2 size={18} />
            </button>
            <button
              onClick={() => toggleFavorite(bakery.id)}
              className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center"
            >
              <Heart size={18} stroke={bakery.isFavorite ? 'var(--color-brand)' : 'white'} fill={bakery.isFavorite ? 'var(--color-brand)' : 'none'} />
            </button>
          </div>
        </div>

        {/* Bottom info overlay */}
        <div className="absolute bottom-5 left-5 right-5">
          <div className="flex gap-1.5 mb-1.5">
            {bakery.tags.slice(0, 3).map((t) => (
              <span key={t} className="text-[11px] font-semibold text-white bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-md">
                {t}
              </span>
            ))}
          </div>
          <h1 className="text-[24px] font-extrabold text-white leading-snug">{bakery.nameKo}</h1>
        </div>

        {/* Photo thumbnails */}
        {bakery.images.length > 1 && (
          <div className="absolute -bottom-5 right-4 flex gap-1.5">
            {bakery.images.slice(1, 4).map((img, i) => (
              <button
                key={i}
                onClick={() => setLightbox(img)}
                className="relative w-[52px] h-[52px] rounded-xl overflow-hidden border-2 border-white"
              >
                <Image src={img} alt="" fill className="object-cover" />
                {i === 2 && bakery.images.length > 4 && (
                  <div className="absolute inset-0 bg-black/55 flex items-center justify-center text-white text-[12px] font-bold">
                    +{bakery.images.length - 4}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Main Card ─────────────────────────────────── */}
      <div className="bg-white rounded-t-3xl mt-3 pt-5 min-h-[calc(100dvh-300px)]">

        {/* Summary row */}
        <div className="px-5 pb-5 border-b border-border">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="flex items-center gap-1">
                  <Star size={15} fill="#ffa826" stroke="none" />
                  <span className="text-[16px] font-extrabold">{bakery.rating}</span>
                  <span className="text-[13px] text-text-muted">({bakery.reviewCount}개)</span>
                </div>
                <span className="w-[3px] h-[3px] bg-text-muted rounded-full" />
                <span className={`text-[12px] font-semibold px-2 py-0.5 rounded ${bakery.isOpen ? 'text-status-success bg-[#e6f4ea]' : 'text-status-error bg-[#fde8e8]'}`}>
                  {bakery.isOpen ? '영업중' : '영업종료'}
                </span>
                {bakery.waitTime && (
                  <span className="text-[12px] text-text-muted flex items-center">
                    <Clock size={11} className="mr-0.5" />
                    약 {bakery.waitTime}분
                  </span>
                )}
              </div>
              <p className="text-[13px] text-text-secondary leading-relaxed">
                {bakery.location} · {bakery.priceRange} · {bakery.distance}
              </p>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex gap-2">
            <a href={`tel:${bakery.phone}`} className="flex-1 h-11 flex items-center justify-center gap-1 bg-bg-input rounded-xl text-[13px] font-semibold text-text-primary whitespace-nowrap overflow-hidden">
              <Phone size={15} />전화하기
            </a>
            <a href={`https://${bakery.website}`} target="_blank" rel="noopener noreferrer" className="flex-1 h-11 flex items-center justify-center gap-1 bg-bg-input rounded-xl text-[13px] font-semibold text-text-primary whitespace-nowrap overflow-hidden">
              <Globe size={15} />웹사이트
            </a>
            <button className="flex-[2] h-11 flex items-center justify-center bg-brand rounded-xl text-[14px] font-bold text-white whitespace-nowrap">
              길 찾기
            </button>
          </div>
        </div>

        <Tabs.Root defaultValue="menu">
          <Tabs.List className="flex border-b border-border sticky top-0 bg-white z-10">
            <Tabs.Trigger value="menu" className="flex-1 h-12 text-[14px] font-medium text-text-secondary data-[state=active]:font-bold data-[state=active]:text-brand data-[state=active]:border-b-2 data-[state=active]:border-brand outline-none transition-colors">
              메뉴
            </Tabs.Trigger>
            <Tabs.Trigger value="info" className="flex-1 h-12 text-[14px] font-medium text-text-secondary data-[state=active]:font-bold data-[state=active]:text-brand data-[state=active]:border-b-2 data-[state=active]:border-brand outline-none transition-colors">
              정보
            </Tabs.Trigger>
            <Tabs.Trigger value="review" className="flex-1 h-12 text-[14px] font-medium text-text-secondary data-[state=active]:font-bold data-[state=active]:text-brand data-[state=active]:border-b-2 data-[state=active]:border-brand outline-none transition-colors">
              리뷰 {bakery.reviewCount}
            </Tabs.Trigger>
          </Tabs.List>

          {/* ── Menu Tab ─── */}
          <Tabs.Content value="menu" className="py-2 outline-none">
            {bakery.menu.map((item) => (
              <div key={item.id} className="flex gap-3.5 p-3.5 px-5 border-b border-border items-center">
                <div className="relative w-[76px] h-[76px] shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover rounded-xl" />
                </div>
                <div className="flex-1">
                  <div className="flex gap-1.5 mb-1.5">
                    {item.isBest && (
                      <span className="text-[10px] font-bold text-brand bg-brand-surface px-2 py-0.5 rounded">BEST</span>
                    )}
                    {item.isNew && (
                      <span className="text-[10px] font-bold text-[#c9377a] bg-[#fff0f6] px-2 py-0.5 rounded">NEW</span>
                    )}
                  </div>
                  <p className="text-[15px] font-bold mb-1">{item.nameKo}</p>
                  <p className="text-[12px] text-text-secondary mb-1.5">{item.name}</p>
                  <p className="text-[16px] font-extrabold text-brand">
                    {item.price.toLocaleString()}원
                  </p>
                </div>
              </div>
            ))}
          </Tabs.Content>

          {/* ── Info Tab ─── */}
          <Tabs.Content value="info" className="p-5 outline-none">
            <p className="text-[14px] text-text-secondary leading-loose mb-6">
              {bakery.description}
            </p>
            <div className="flex flex-col">
              {[
                { icon: <MapPin size={16} />, label: '주소', value: bakery.address },
                { icon: <Clock size={16} />, label: '영업시간', value: `${bakery.openTime} ~ ${bakery.closeTime}` },
                { icon: <Phone size={16} />, label: '전화번호', value: bakery.phone },
                { icon: <Globe size={16} />, label: '웹사이트', value: bakery.website },
              ].map((row) => (
                <div key={row.label} className="flex items-start gap-3.5 py-3.5 border-b border-border">
                  <div className="text-text-muted mt-0.5">{row.icon}</div>
                  <div>
                    <p className="text-[12px] text-text-muted mb-0.5">{row.label}</p>
                    <p className="text-[14px] font-medium">{row.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Tabs.Content>

          {/* ── Review Tab ─── */}
          <Tabs.Content value="review" className="outline-none">
            {/* Rating summary */}
            <div className="flex items-center gap-5 p-5 border-b border-border">
              <div className="text-center">
                <p className="text-[48px] font-black leading-none text-brand">{bakery.rating}</p>
                <div className="flex gap-0.5 justify-center mt-1">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} size={14} fill={s <= Math.round(bakery.rating) ? '#ffa826' : 'var(--color-border)'} stroke="none" />
                  ))}
                </div>
                <p className="text-[12px] text-text-muted mt-1">{bakery.reviewCount}개</p>
              </div>
              <div className="flex-1">
                {[5,4,3,2,1].map((s) => {
                  const count = bakery.reviews.filter(r => r.rating === s).length || (s === 5 ? 8 : s === 4 ? 3 : 1);
                  const pct = Math.min(100, (count / bakery.reviewCount) * 100 * 6);
                  return (
                    <div key={s} className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] text-text-muted w-2">{s}</span>
                      <div className="flex-1 h-[5px] bg-bg-input rounded-[3px]">
                        <div className="h-full bg-[#ffa826] rounded-[3px]" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reviews */}
            {bakery.reviews.map((review) => (
              <div key={review.id} className="p-4 px-5 border-b border-border">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <Avatar.Root className="relative w-9 h-9 rounded-full overflow-hidden">
                    <Avatar.Image src={review.avatar} alt={review.author} className="object-cover w-full h-full" />
                    <Avatar.Fallback className="w-full h-full flex items-center justify-center bg-brand-surface text-brand font-bold">
                      {review.author[0]}
                    </Avatar.Fallback>
                  </Avatar.Root>
                  <div>
                    <p className="text-[14px] font-semibold">{review.author}</p>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map((s) => (
                        <Star key={s} size={11} fill={s <= review.rating ? '#ffa826' : 'var(--color-border)'} stroke="none" />
                      ))}
                    </div>
                  </div>
                  <span className="ml-auto text-[11px] text-text-muted">{review.date}</span>
                </div>
                <p className="text-[14px] text-text-secondary leading-relaxed">{review.content}</p>
                {review.images && (
                  <div className="flex gap-2 mt-2.5">
                    {review.images.map((img, i) => (
                      <button key={i} onClick={() => setLightbox(img)} className="relative w-[72px] h-[72px] rounded-[10px] overflow-hidden">
                        <Image src={img} alt="" fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </Tabs.Content>
        </Tabs.Root>
      </div>

      {/* Lightbox Dialog */}
      <Dialog.Root open={!!lightbox} onOpenChange={(open) => !open && setLightbox(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[200] bg-black/90 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 flex items-center justify-center">
            <Dialog.Content className="relative w-[90vw] h-[60vw] max-w-[480px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
              <Dialog.Close asChild>
                <button className="absolute -top-10 right-0 text-white outline-none">
                  <X size={28} />
                </button>
              </Dialog.Close>
              {lightbox && <Image src={lightbox} alt="Enlarged view" fill className="object-contain" />}
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
