import React from 'react';

const Hero: React.FC = () => {
  return (
    <div id="hero" className="relative min-h-[80vh] pt-32 pb-28 flex items-center justify-center overflow-hidden">
      {/* Abstract Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-600/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Brand Name */}
        <div className="text-7xl md:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-neutral-600 to-neutral-200 mb-[-0.05em] leading-none select-none opacity-50">
          WUNDER DIGITAL
        </div>

        {/* Title */}
        <h1 className="text-7xl md:text-9xl font-extrabold tracking-tight mb-8 drop-shadow-2xl leading-none">
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 pr-2">VIDEO</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-200">AI SUITE</span>
        </h1>
        
        {/* Subtitles */}
        <div className="space-y-4 max-w-6xl mx-auto mt-8">
          <p className="text-lg md:text-xl tracking-widest uppercase leading-relaxed opacity-90">
            <span className="bg-clip-text text-transparent bg-gradient-to-t from-neutral-400 to-white font-medium drop-shadow-sm">
              ЧТОБЫ
            </span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500 font-bold drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]">
              УВЕЛИЧИТЬ РЕЗУЛЬТАТ
            </span>{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-t from-neutral-400 to-white font-medium drop-shadow-sm">
              ОТ РЕКЛАМНЫХ КАМПАНИЙ
            </span>
          </p>
          <p className="text-lg md:text-xl tracking-widest uppercase leading-relaxed opacity-90">
            <span className="bg-clip-text text-transparent bg-gradient-to-t from-neutral-400 to-white font-medium drop-shadow-sm">
              ЧТОБЫ
            </span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500 font-bold drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]">
              СНИЗИТЬ СТОИМОСТЬ
            </span>{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-t from-neutral-400 to-white font-medium drop-shadow-sm">
              И СРОК ПРОИЗВОДСТВА ВИДЕО
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;