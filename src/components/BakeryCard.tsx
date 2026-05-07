'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, Star, MapPin, Clock } from 'lucide-react';
import { Bakery, useBakeryStore } from '@/store/useBakeryStore';
import { motion } from 'framer-motion';

interface BakeryCardProps {
  bakery: Bakery;
  variant?: 'default' | 'horizontal' | 'featured';
}

export function BakeryCard({ bakery, variant = 'default' }: BakeryCardProps) {
  const toggleFavorite = useBakeryStore((s) => s.toggleFavorite);

  if (variant === 'horizontal') {
    return (
      <Link href={`/bakery/${bakery.id}`}>
        <div className="flex gap-3.5 py-3.5 border-b border-border">
          <div className="relative w-[90px] h-[90px] shrink-0">
            <Image
              src={bakery.image}
              alt={bakery.name}
              fill
              className="object-cover rounded-xl"
            />
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
            <div className="flex items-center gap-1.5">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded ${bakery.isOpen ? 'text-status-success bg-[#e6f4ea]' : 'text-text-muted bg-bg-input'}`}>
                {bakery.isOpen ? '영업중' : '영업종료'}
              </span>
              <span className="text-xs text-text-muted">{bakery.distance}</span>
            </div>
            <p className="text-[15px] font-bold text-text-primary line-clamp-1">
              {bakery.nameKo}
            </p>
            <p className="text-[13px] text-text-secondary line-clamp-1">
              {bakery.shortDesc}
            </p>
            <div className="flex items-center gap-2.5 mt-0.5 overflow-hidden">
              <div className="flex items-center gap-1 shrink-0">
                <Star size={13} fill="#ffa826" stroke="none" />
                <span className="text-[13px] font-semibold text-text-primary">{bakery.rating}</span>
                <span className="text-xs text-text-muted">({bakery.reviewCount})</span>
              </div>
              <span className="text-xs text-text-muted whitespace-nowrap">{bakery.location}</span>
              <span className="text-xs text-text-muted whitespace-nowrap">{bakery.priceRange}</span>
            </div>
          </div>
          <button
            onClick={(e) => { e.preventDefault(); toggleFavorite(bakery.id); }}
            className="p-1 self-start shrink-0 mt-0.5"
          >
            <Heart size={18} stroke={bakery.isFavorite ? 'var(--color-brand)' : 'var(--color-text-muted)'} fill={bakery.isFavorite ? 'var(--color-brand)' : 'none'} />
          </button>
        </div>
      </Link>
    );
  }

  if (variant === 'featured') {
    return (
      <Link href={`/bakery/${bakery.id}`}>
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="w-[200px] bg-bg-card rounded-2xl overflow-hidden shadow-md shrink-0"
        >
          <div className="relative h-[130px]">
            <Image src={bakery.image} alt={bakery.name} fill className="object-cover" />
            <button
              onClick={(e) => { e.preventDefault(); toggleFavorite(bakery.id); }}
              className="absolute top-2 right-2 w-[30px] h-[30px] bg-white/90 rounded-full flex items-center justify-center"
            >
              <Heart size={14} stroke={bakery.isFavorite ? 'var(--color-brand)' : '#555'} fill={bakery.isFavorite ? 'var(--color-brand)' : 'none'} />
            </button>
            {bakery.waitTime && (
              <div className="absolute bottom-2 left-2 bg-black/65 text-white text-[11px] font-semibold px-2 py-1 rounded-md flex items-center gap-1">
                <Clock size={10} />
                {bakery.waitTime}분 대기
              </div>
            )}
          </div>
          <div className="p-2.5 px-3">
            <p className="text-[14px] font-bold mb-1 line-clamp-1">{bakery.nameKo}</p>
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5">
                <Star size={11} fill="#ffa826" stroke="none" />
                <span className="text-xs font-semibold">{bakery.rating}</span>
              </div>
              <span className="text-[11px] text-text-muted">·</span>
              <span className="text-[11px] text-text-muted">{bakery.location}</span>
            </div>
          </div>
        </motion.div>
      </Link>
    );
  }

  // default card
  return (
    <Link href={`/bakery/${bakery.id}`}>
      <motion.div
        whileTap={{ scale: 0.97 }}
        className="bg-bg-card rounded-2xl overflow-hidden shadow-sm border border-border"
      >
        <div className="relative h-[160px]">
          <Image src={bakery.image} alt={bakery.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent h-1/2 mt-auto" />
          <button
            onClick={(e) => { e.preventDefault(); toggleFavorite(bakery.id); }}
            className="absolute top-2.5 right-2.5 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center"
          >
            <Heart size={15} stroke={bakery.isFavorite ? 'var(--color-brand)' : '#666'} fill={bakery.isFavorite ? 'var(--color-brand)' : 'none'} />
          </button>
          <div className="absolute bottom-2.5 left-3 flex gap-1.5">
            {bakery.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-[11px] font-semibold text-white bg-white/20 backdrop-blur-md px-2 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="p-3 pt-3 px-3.5">
          <div className="flex justify-between items-start">
            <div className="flex-1 min-w-0 mr-2">
              <p className="text-[15px] font-bold mb-0.5 line-clamp-1">{bakery.nameKo}</p>
              <p className="text-xs text-text-secondary line-clamp-1">{bakery.shortDesc}</p>
            </div>
            <div className="flex items-center gap-1 bg-bg-input px-2 py-1 rounded-lg shrink-0">
              <Star size={11} fill="#ffa826" stroke="none" />
              <span className="text-xs font-bold">{bakery.rating}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2 overflow-hidden">
            <div className="flex items-center gap-1 text-text-muted shrink-0">
              <MapPin size={11} />
              <span className="text-[11px] whitespace-nowrap">{bakery.location}</span>
            </div>
            {bakery.distance && (
              <span className="text-[11px] text-text-muted whitespace-nowrap">· {bakery.distance}</span>
            )}
            <span className={`ml-auto text-[11px] font-semibold whitespace-nowrap shrink-0 ${bakery.isOpen ? 'text-status-success' : 'text-status-error'}`}>
              {bakery.isOpen ? '영업중' : '영업종료'}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
