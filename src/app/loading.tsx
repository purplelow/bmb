export default function Loading() {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-bg gap-4">
      <div className="w-12 h-12 bg-brand rounded-2xl flex items-center justify-center animate-[pulse_1.2s_ease-in-out_infinite]">
        <span className="text-2xl font-black text-white">B</span>
      </div>
      <div className="w-8 h-[3px] rounded-sm bg-border overflow-hidden">
        <div className="h-full bg-brand animate-[loading-bar_1s_ease-in-out_infinite]" />
      </div>
      <style>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); width: 50%; }
          100% { transform: translateX(200%); width: 50%; }
        }
      `}</style>
    </div>
  );
}
