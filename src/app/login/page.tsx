'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('이메일과 비밀번호를 입력해주세요.'); return; }
    setLoading(true);
    setError('');
    await new Promise((r) => setTimeout(r, 800)); // simulate network
    login({ id: '1', email, name: email.split('@')[0], avatar: '' });
    router.push('/');
  };

  return (
    <div className="min-h-[100dvh] bg-white flex flex-col">

      {/* Back */}
      <div className="pt-14 px-5">
        <button onClick={() => router.back()} className="text-text-secondary flex items-center gap-1">
          <ChevronLeft size={20} /> 뒤로
        </button>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 p-8 px-6 flex flex-col"
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-9">
          <div className="w-11 h-11 bg-brand rounded-[14px] flex items-center justify-center">
            <span className="text-[22px] font-black text-white">B</span>
          </div>
          <div>
            <p className="text-[20px] font-extrabold tracking-[-0.5px]">BBM에 오신 걸 환영해요</p>
            <p className="text-[13px] text-text-muted mt-0.5">
              로그인하고 나만의 베이커리를 찾아보세요
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {/* Email */}
          <div>
            <label className="block text-[13px] font-semibold mb-1.5 text-text-secondary">
              이메일
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              autoComplete="email"
              className="w-full h-[52px] px-4 bg-bg-input border-[1.5px] border-transparent focus:border-brand rounded-[14px] text-[15px] text-text-primary outline-none transition duration-200"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between mb-1.5">
              <label className="text-[13px] font-semibold text-text-secondary">비밀번호</label>
              <Link href="#" className="text-[13px] text-brand font-medium">
                비밀번호 찾기
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                autoComplete="current-password"
                className="w-full h-[52px] pl-4 pr-12 bg-bg-input border-[1.5px] border-transparent focus:border-brand rounded-[14px] text-[15px] text-text-primary outline-none transition duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted"
              >
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[13px] text-status-error font-medium"
            >
              {error}
            </motion.p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full h-[54px] mt-2 text-white rounded-2xl text-[16px] font-bold flex items-center justify-center gap-2 transition duration-200 ${
              loading ? 'bg-border' : 'bg-brand'
            }`}
          >
            {loading ? (
              <div className="w-[22px] h-[22px] border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              <>로그인 <ArrowRight size={18} /></>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-[13px] text-text-muted">또는</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Social */}
        <div className="flex flex-col gap-2.5">
          {[
            { label: '카카오로 계속하기', bg: 'bg-[#FEE500]', color: 'text-[#1a1a1a]', emoji: '💬' },
            { label: '네이버로 계속하기', bg: 'bg-[#03C75A]', color: 'text-white', emoji: '🟢' },
            { label: 'Apple로 계속하기', bg: 'bg-black', color: 'text-white', emoji: '🍎' },
          ].map(({ label, bg, color, emoji }) => (
            <button key={label} className={`w-full h-[50px] rounded-[14px] ${bg} ${color} text-[14px] font-semibold flex items-center justify-center gap-2.5`}>
              <span>{emoji}</span> {label}
            </button>
          ))}
        </div>

        {/* Signup link */}
        <p className="text-center mt-8 text-[14px] text-text-secondary">
          아직 계정이 없으신가요?{' '}
          <Link href="/signup" className="text-brand font-bold">
            회원가입
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
