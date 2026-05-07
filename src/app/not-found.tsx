'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] bg-bg flex flex-col items-center justify-center px-8 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 160, damping: 14 }}
        className="mb-6"
      >
        <span className="text-[80px]">🥐</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-[13px] font-bold text-brand tracking-widest mb-3">
          404 NOT FOUND
        </p>
        <h1 className="text-[26px] font-extrabold mb-2.5 leading-snug">
          페이지를 찾을 수 없어요
        </h1>
        <p className="text-[15px] text-text-secondary leading-relaxed mb-9">
          링크가 잘못되었거나 페이지가 이동됐어요.<br />
          다른 맛있는 베이커리를 탐색해보세요!
        </p>

        <div className="flex gap-3 justify-center">
          <Link href="/" className="flex items-center gap-2 h-12 px-6 bg-brand text-white rounded-full text-[15px] font-bold">
            <Home size={18} /> 홈으로
          </Link>
          <Link href="/search" className="flex items-center gap-2 h-12 px-6 bg-bg-input text-text-primary rounded-full text-[15px] font-bold">
            <Search size={18} /> 탐색하기
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
