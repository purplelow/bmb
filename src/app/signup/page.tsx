'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, Eye, EyeOff, Check } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export default function SignupPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) { setStep(2); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    login({ id: '1', email, name, avatar: '' });
    router.push('/');
  };

  return (
    <div className="min-h-[100dvh] bg-white flex flex-col">

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-bg-input z-50">
        <motion.div
          animate={{ width: step === 1 ? '50%' : '100%' }}
          transition={{ duration: 0.4 }}
          className="h-full bg-brand rounded-sm"
        />
      </div>

      {/* Back */}
      <div className="pt-14 px-5">
        <button
          onClick={() => step === 2 ? setStep(1) : router.back()}
          className="text-text-secondary flex items-center gap-1"
        >
          <ChevronLeft size={20} /> 뒤로
        </button>
      </div>

      <motion.div
        key={step}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -24 }}
        transition={{ duration: 0.3 }}
        className="flex-1 p-8 px-6 flex flex-col"
      >
        {/* Header */}
        <div className="mb-9">
          <p className="text-[11px] font-semibold text-brand mb-2 tracking-wide">
            STEP {step} / 2
          </p>
          <h1 className="text-[24px] font-extrabold tracking-[-0.5px] leading-snug whitespace-pre-wrap">
            {step === 1 ? '반갑습니다!\n기본 정보를 입력해주세요' : '비밀번호를\n설정해주세요'}
          </h1>
          <p className="text-[14px] text-text-muted mt-2">
            {step === 1 ? '계정에 사용할 이름과 이메일을 입력하세요.' : '안전한 비밀번호를 설정하세요.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">
          {step === 1 ? (
            <>
              <div>
                <label className="block text-[13px] font-semibold mb-1.5 text-text-secondary">이름</label>
                <input
                  type="text" value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="홍길동" required
                  className="w-full h-[52px] px-4 bg-bg-input border-[1.5px] border-transparent focus:border-brand rounded-[14px] text-[15px] text-text-primary outline-none transition duration-200"
                />
              </div>
              <div>
                <label className="block text-[13px] font-semibold mb-1.5 text-text-secondary">이메일</label>
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com" required
                  className="w-full h-[52px] px-4 bg-bg-input border-[1.5px] border-transparent focus:border-brand rounded-[14px] text-[15px] text-text-primary outline-none transition duration-200"
                />
              </div>

              {/* Social quick signup */}
              <div className="mt-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-[12px] text-text-muted">또는 소셜 계정으로</span>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <div className="flex gap-3 justify-center">
                  {[
                    { label: '카카오', bg: 'bg-[#FEE500]', emoji: '💬' },
                    { label: '네이버', bg: 'bg-[#03C75A]', emoji: '🟢' },
                    { label: 'Apple', bg: 'bg-black', emoji: '🍎' },
                  ].map(({ label, bg, emoji }) => (
                    <button key={label} type="button" className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center text-[22px]`}>
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-[13px] font-semibold mb-1.5 text-text-secondary">비밀번호</label>
                <div className="relative">
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="8자 이상 입력하세요" required minLength={8}
                    className="w-full h-[52px] pl-4 pr-12 bg-bg-input border-[1.5px] border-transparent focus:border-brand rounded-[14px] text-[15px] text-text-primary outline-none transition duration-200"
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted">
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Password strength */}
              <div className="flex gap-1">
                {[8, 12, 16].map((len, i) => (
                  <div key={i} className={`flex-1 h-1 rounded-sm transition duration-200 ${
                    password.length >= len
                      ? i === 0 ? 'bg-[#ffa826]' : i === 1 ? 'bg-status-success' : 'bg-brand'
                      : 'bg-bg-input'
                  }`} />
                ))}
              </div>
              <p className="text-[12px] text-text-muted -mt-2">
                {password.length === 0 ? '비밀번호를 입력하세요' : password.length < 8 ? '더 긴 비밀번호를 사용하세요' : password.length < 12 ? '보통 수준의 비밀번호' : '강력한 비밀번호입니다 ✓'}
              </p>

              {/* Terms */}
              <button
                type="button"
                onClick={() => setAgreed(!agreed)}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border-[1.5px] transition duration-200 ${
                  agreed ? 'bg-brand-surface border-brand' : 'bg-bg-input border-transparent'
                }`}
              >
                <div className={`w-[22px] h-[22px] rounded-md border-[1.5px] flex items-center justify-center transition duration-200 shrink-0 ${
                  agreed ? 'bg-brand border-brand' : 'bg-white border-border'
                }`}>
                  {agreed && <Check size={13} color="white" strokeWidth={3} />}
                </div>
                <span className="text-[13px] text-left leading-relaxed text-text-secondary">
                  <Link href="#" className="text-brand font-semibold">이용약관</Link> 및{' '}
                  <Link href="#" className="text-brand font-semibold">개인정보처리방침</Link>에 동의합니다
                </span>
              </button>
            </>
          )}

          <div className="flex-1" />

          <button
            type="submit"
            disabled={loading || (step === 2 && !agreed)}
            className={`w-full h-[54px] text-white rounded-2xl text-[16px] font-bold flex items-center justify-center gap-2 transition duration-200 ${
              (loading || (step === 2 && !agreed)) ? 'bg-border' : 'bg-brand'
            }`}
          >
            {loading ? (
              <div className="w-[22px] h-[22px] border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : step === 1 ? '다음' : '회원가입 완료'}
          </button>

          <p className="text-center text-[14px] text-text-secondary">
            이미 계정이 있으신가요?{' '}
            <Link href="/login" className="text-brand font-bold">로그인</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
