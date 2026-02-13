import React, { useEffect, useState } from 'react';

const LOOM_EMBED_URL = "https://www.loom.com/embed/952eb1e8dc874a06b7f86f26934d1609?autoplay=1&hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true";
const ROTATING_TEXT = "О ПРОДУКТЕ ЗА 73 сек •";

export default function StsVideoWidget() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const section = document.getElementById('script-to-screen');
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio;
        setVisible(prev => {
          if (!prev && ratio >= 0.3) return true;
          if (prev && ratio < 0.4) return false;
          return prev;
        });
      },
      { threshold: [0, 0.3, 0.4] }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  return (
    <>
      {/* Floating circular button — slides from left */}
      <div
        className={`fixed left-0 top-1/2 -translate-y-1/2 z-50 transition-transform duration-500 ease-in-out ${
          visible ? 'translate-x-0' : '-translate-x-[110%]'
        }`}
        style={{ marginLeft: '16px' }}
      >
        <button
          onClick={() => setOpen(true)}
          className="relative w-[106px] h-[106px] group focus:outline-none"
          aria-label="Смотреть видео о Script to Screen"
        >
          {/* Rotating text ring */}
          <svg
            className="absolute inset-0 w-full h-full animate-spin-slow"
            viewBox="0 0 80 80"
          >
            <defs>
              <path
                id="sts-circle-path"
                d="M 40,40 m -28,0 a 28,28 0 1,1 56,0 a 28,28 0 1,1 -56,0"
              />
            </defs>
            <text
              className="fill-amber-400"
              opacity="0.7"
              fontSize="7"
              letterSpacing="0"
              fontFamily="'IBM Plex Sans Condensed', sans-serif"
              fontWeight="500"
            >
              <textPath href="#sts-circle-path" startOffset="0%">{ROTATING_TEXT}</textPath>
            </text>
            <text
              className="fill-amber-400"
              opacity="0.7"
              fontSize="7"
              letterSpacing="0"
              fontFamily="'IBM Plex Sans Condensed', sans-serif"
              fontWeight="500"
            >
              <textPath href="#sts-circle-path" startOffset="50%">{ROTATING_TEXT}</textPath>
            </text>
          </svg>

          {/* Center play button — glass style */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[63px] h-[63px] rounded-full flex items-center justify-center transition-all duration-200 bg-gradient-to-b from-white/[0.04] via-white/[0.01] to-transparent backdrop-blur-md border border-white/[0.08] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.06)] group-hover:from-white/[0.07] group-hover:border-white/[0.14] overflow-hidden">
              {/* Pulse surface layer */}
              <div className="absolute inset-0 rounded-full animate-pulse-surface pointer-events-none" style={{ backgroundColor: 'rgba(174,123,0,0.28)' }} />
              <svg
                className="w-6 h-6 ml-0.5 transition-colors"
                style={{ color: 'rgba(255,255,255,0.8)' }}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </button>
      </div>

      {/* Mini player modal */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

          <div
            className="relative z-10 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <span className="text-xs font-medium text-amber-400 tracking-widest uppercase">
                Script to Screen за 73 секунды
              </span>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Закрыть"
              >
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={LOOM_EMBED_URL}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; fullscreen"
                title="Script to Screen overview"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
