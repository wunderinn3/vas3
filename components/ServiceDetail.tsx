import React, { useEffect, useRef, useState } from 'react';
import { PortfolioItem, ServiceData, VideoDuration } from '../types';
import XScroll from './ui/x-scroll';

interface Props {
  data: ServiceData;
  index: number;
}

// Helpers for check/cross rendering
const IncludedItem: React.FC<{ text: string }> = ({ text }) => (
  <li className="flex items-start gap-3 text-[11px] text-gray-300 font-light leading-snug">
    <div className="w-4 h-4 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/20">
      <svg className="w-2.5 h-2.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <span>{text}</span>
  </li>
);

const NotIncludedItem: React.FC<{ text: string }> = ({ text }) => (
  <li className="flex items-start gap-3 text-[11px] text-gray-400/60 font-light leading-snug">
    <div className="w-4 h-4 rounded-full bg-red-500/5 flex items-center justify-center shrink-0 mt-0.5 border border-red-500/10">
      <svg className="w-2.5 h-2.5 text-red-500/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </div>
    <span>{text}</span>
  </li>
);

const VideoPreview: React.FC<{
  src: string;
  onMeta?: (width: number, height: number) => void;
}> = ({ src, onMeta }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.muted = false;
      video.volume = 1;
      try {
        await video.play();
      } catch {
        // Ignore play errors (autoplay policies, etc.)
      }
    } else {
      video.pause();
    }
  };

  return (
    <div className="relative w-full h-full group">
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        playsInline
        preload="metadata"
        onLoadedMetadata={(event) => {
          if (!onMeta) return;
          const target = event.currentTarget;
          if (target.videoWidth && target.videoHeight) {
            onMeta(target.videoWidth, target.videoHeight);
          }
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
          className={`flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/60 text-white shadow-lg transition-opacity ${
            isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
          }`}
        >
          {isPlaying ? (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
            </svg>
          ) : (
            <svg className="h-5 w-5 translate-x-[1px]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

const MediaFrame: React.FC<{
  width: number;
  height: number;
  hoverBorderClassName?: string;
  label?: string;
  labelClassName?: string;
  children: React.ReactNode;
}> = ({ width, height, hoverBorderClassName = '', label, labelClassName = '', children }) => {
  const frameClasses = `relative rounded-lg overflow-hidden bg-black/50 border border-white/5 transition-colors ${hoverBorderClassName}`;
  const labelEl = label ? <div className={labelClassName}>{label}</div> : null;

  return (
    <div className="flex flex-col items-start">
      {labelEl}
      <div className={frameClasses} style={{ width, height }}>
        {children}
      </div>
    </div>
  );
};

const MEDIA_GAP_PX = 12;

const getFallbackSize = (isVertical?: boolean) => {
  if (isVertical) {
    return { width: 220, height: 392 };
  }
  return { width: 405, height: 228 };
};

const getLockedSize = (item: PortfolioItem, isVertical?: boolean) => {
  const base = getFallbackSize(isVertical);
  if (!item.aspectRatio) return base;

  const area = base.width * base.height;
  const width = Math.round(Math.sqrt(area * item.aspectRatio));
  const height = Math.round(width / item.aspectRatio);
  return { width, height };
};

const CaseCardBase: React.FC<{
  item: PortfolioItem;
  isVertical?: boolean;
  className: string;
  lockToFallback?: boolean;
}> = ({ item, isVertical, className, lockToFallback }) => {
  const [creativeSize, setCreativeSize] = useState(
    lockToFallback ? getLockedSize(item, isVertical) : getFallbackSize(isVertical)
  );

  const updateSize = (width: number, height: number) => {
    if (lockToFallback) return;
    if (!width || !height) return;
    setCreativeSize((prev) => {
      if (prev.width === width && prev.height === height) return prev;
      return { width, height };
    });
  };

  const innerWidth = creativeSize.width * 2 + MEDIA_GAP_PX;
  const innerHeight = creativeSize.height;
  const padX = innerWidth * 0.025;
  const padY = innerHeight * (isVertical ? 0.025 : 0.015);

  return (
    <div
      className={className}
      style={{
        paddingLeft: padX,
        paddingRight: padX,
        paddingTop: padY,
        paddingBottom: padY,
      }}
    >
      <div className="grid grid-cols-2 gap-3">
        <MediaFrame
          width={creativeSize.width}
          height={creativeSize.height}
          hoverBorderClassName="group-hover:border-white/10"
          label="До"
          labelClassName="mb-2 px-2 py-0.5 rounded text-[9px] font-bold text-gray-400 border border-white/5 uppercase tracking-wider bg-black/60"
        >
          {item.beforeImage && (
            <img
              src={item.beforeImage}
              alt="Before"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              onLoad={(event) => {
                const target = event.currentTarget;
                updateSize(target.naturalWidth, target.naturalHeight);
              }}
            />
          )}
        </MediaFrame>
        <MediaFrame
          width={creativeSize.width}
          height={creativeSize.height}
          hoverBorderClassName="group-hover:border-amber-500/20"
          label="После"
          labelClassName="mb-2 px-2 py-0.5 rounded text-[9px] font-bold text-white border border-white/10 uppercase tracking-wider bg-amber-600/80"
        >
          {item.isVideo ? (
            <VideoPreview src={item.afterImage} onMeta={updateSize} />
          ) : (
            <img
              src={item.afterImage}
              alt="After"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
              onLoad={(event) => {
                const target = event.currentTarget;
                updateSize(target.naturalWidth, target.naturalHeight);
              }}
            />
          )}
        </MediaFrame>
      </div>
    </div>
  );
};

const CaseCardHorizontal: React.FC<{
  item: PortfolioItem;
  className: string;
  lockToFallback?: boolean;
}> = ({ item, className, lockToFallback }) => (
  <CaseCardBase item={item} className={className} lockToFallback={lockToFallback} />
);

const CaseCardVertical: React.FC<{
  item: PortfolioItem;
  className: string;
  lockToFallback?: boolean;
}> = ({ item, className, lockToFallback }) => (
  <CaseCardBase item={item} isVertical className={className} lockToFallback={lockToFallback} />
);

const SingleMediaCard: React.FC<{
  item: PortfolioItem;
  className: string;
}> = ({ item, className }) => {
  const creativeSize = getFallbackSize(item.isVertical);
  const padX = creativeSize.width * 0.025;
  const padY = creativeSize.height * (item.isVertical ? 0.025 : 0.01);

  return (
    <div
      className={className}
      style={{
        paddingLeft: padX,
        paddingRight: padX,
        paddingTop: padY,
        paddingBottom: padY,
      }}
    >
      <MediaFrame
        width={creativeSize.width}
        height={creativeSize.height}
        hoverBorderClassName="group-hover:border-white/10"
      >
        {item.isVideo ? (
          <VideoPreview src={item.afterImage} />
        ) : (
          <img
            src={item.afterImage}
            alt="Project"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        )}
      </MediaFrame>
    </div>
  );
};

const getPackageStyles = (colorName: string) => {
  switch (colorName) {
    case 'sky':
      return {
        gradient: 'from-sky-500/10',
        text: 'text-sky-500',
        bg: 'bg-sky-500',
        border: 'border-sky-500',
        hoverBg: 'hover:bg-sky-500',
      };
    case 'fuchsia':
      return {
        gradient: 'from-fuchsia-500/10',
        text: 'text-fuchsia-500',
        bg: 'bg-fuchsia-500',
        border: 'border-fuchsia-500',
        hoverBg: 'hover:bg-fuchsia-500',
      };
    case 'rose':
      return {
        gradient: 'from-rose-500/10',
        text: 'text-rose-500',
        bg: 'bg-rose-500',
        border: 'border-rose-500',
        hoverBg: 'hover:bg-rose-500',
      };
    case 'blue':
      return {
        gradient: 'from-blue-500/10',
        text: 'text-blue-500',
        bg: 'bg-blue-500',
        border: 'border-blue-500',
        hoverBg: 'hover:bg-blue-500',
      };
    case 'emerald':
      return {
        gradient: 'from-emerald-500/10',
        text: 'text-emerald-500',
        bg: 'bg-emerald-500',
        border: 'border-emerald-500',
        hoverBg: 'hover:bg-emerald-500',
      };
    case 'amber':
    default:
      return {
        gradient: 'from-amber-500/10',
        text: 'text-amber-500',
        bg: 'bg-amber-500',
        border: 'border-amber-500',
        hoverBg: 'hover:bg-amber-500',
      };
  }
};

const ServiceDetail: React.FC<Props> = ({ data, index }) => {
  // Theme Color Logic
  const accentColor = data.colorTheme === 'blue' ? 'text-blue-500' : data.colorTheme === 'emerald' ? 'text-emerald-500' : 'text-amber-500';
  const accentBg = data.colorTheme === 'blue' ? 'bg-blue-500' : data.colorTheme === 'emerald' ? 'bg-emerald-500' : 'bg-amber-500';
  const accentBorder = data.colorTheme === 'blue' ? 'border-blue-500' : data.colorTheme === 'emerald' ? 'border-emerald-500' : 'border-amber-500';

  // --- QAM Pricing Logic ---
  const qamQuantities = ['20', '10', '5', '1'];
  const [qamQtyIndex, setQamQtyIndex] = useState(0); 
  const currentQamQty = qamQuantities[qamQtyIndex];

  // --- StS Pricing Logic ---
  const stsDurations: VideoDuration[] = ['10s', '15s', '20s', '30s'];
  const [stsDuration, setStsDuration] = useState<VideoDuration>('15s');

  const stsDurationLabels: Record<VideoDuration, string> = {
    '10s': 'до 10" | 2 сцен',
    '15s': 'до 15" | 4 сцен',
    '20s': 'до 20" | 6 сцен',
    '30s': 'до 30" | 8 сцен',
  };

  // --- Voice Boost Logic ---
  const vbQuantities = ['20', '10', '5', '1'];
  const [vbQtyIndex, setVbQtyIndex] = useState(0);
  const currentVbQty = vbQuantities[vbQtyIndex];
  const currentVbPrice = data.volumePricing ? data.volumePricing[currentVbQty] : null;

  // Standard Glass Classes for containers and portfolio
  const glassCardClasses = "bg-gradient-to-b from-white/[0.05] via-white/[0.01] to-transparent backdrop-blur-[2px] border border-white/[0.05] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.05)]";

  // Consistent Theme Gradient for Pricing Cards to ensure uniformity
  const themeGradient = data.colorTheme === 'blue' ? 'from-blue-500/10' : data.colorTheme === 'emerald' ? 'from-emerald-500/10' : 'from-amber-500/10';
  const pricingCardClasses = `bg-gradient-to-b ${themeGradient} via-white/[0.02] to-transparent backdrop-blur-md border border-white/10 shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.05)]`;


  const handleSelect = () => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id={data.id} className="relative border-t border-white/5 py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16">
          <div className="max-w-2xl">
             <div className="flex items-baseline gap-4 mb-2">
                <span className={`text-6xl font-black ${accentColor} opacity-30 select-none`}>0{index + 1}</span>
                <h2 className={`text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-t from-neutral-500 to-white uppercase tracking-tight leading-none whitespace-pre-wrap`}>{data.title}</h2>
             </div>
            <h3 className={`text-xl font-bold ${accentColor} uppercase tracking-widest mb-6`}>{data.subtitle}</h3>
            
            {/* Description Points */}
            <ul className="space-y-2 mb-8">
               {data.descriptionPoints.map((pt, i) => {
                  const isSub = pt.startsWith('SUB:');
                  const displayPt = isSub ? pt.replace('SUB:', '') : pt;

                  return (
                    <li key={i} className={`flex items-center ${isSub ? 'text-gray-400 text-sm pl-5' : 'text-gray-300'} font-light`}>
                       {isSub ? (
                          <svg className={`w-3.5 h-3.5 ${accentColor} mr-3 shrink-0`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                       ) : (
                          <span className={`w-1.5 h-1.5 rounded-full ${accentBg} mr-3 shrink-0`}></span>
                       )}
                       {displayPt}
                    </li>
                  );
               })}
            </ul>
          </div>
        </div>

        {/* PORTFOLIO (Common for all, if present) */}
        {data.portfolio && data.portfolio.length > 0 && (
          <div className="mb-20">
             <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6 flex items-center gap-2">
                <span className={`w-1 h-6 ${accentBg}`}></span> Реализованные проекты
             </h4>
             <div className="relative">
               <XScroll className="pb-4 relative z-10">
                  <div className={`flex gap-6 pb-4 ${data.id === 'script-to-screen' || data.id === 'quick-ai-motion' ? 'items-center' : ''}`}>
                  {data.portfolio.map((item, i) => {
                    const cardClasses = data.id === 'quick-ai-motion'
                      ? 'shrink-0 w-fit group'
                      : `shrink-0 w-fit rounded-2xl transition-all group hover:border-white/20 ${glassCardClasses}`;

                    if (item.beforeImage) {
                      const lockToFallback = data.id === 'quick-ai-motion';
                      return item.isVertical ? (
                        <CaseCardVertical key={i} item={item} className={cardClasses} lockToFallback={lockToFallback} />
                      ) : (
                        <CaseCardHorizontal key={i} item={item} className={cardClasses} lockToFallback={lockToFallback} />
                      );
                    }

                    if (data.id === 'script-to-screen') {
                      const size = getFallbackSize(item.isVertical);
                      return (
                        <div key={i} className="shrink-0">
                          <MediaFrame
                            width={size.width}
                            height={size.height}
                            hoverBorderClassName="group-hover:border-white/10"
                          >
                            {item.isVideo ? (
                              <VideoPreview src={item.afterImage} />
                            ) : (
                              <img
                                src={item.afterImage}
                                alt="Project"
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover"
                              />
                            )}
                          </MediaFrame>
                        </div>
                      );
                    }

                    return <SingleMediaCard key={i} item={item} className={cardClasses} />;
                  })}
                  </div>
               </XScroll>
               <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-20 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
               <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-20 bg-gradient-to-l from-black/80 via-black/40 to-transparent" />
             </div>
          </div>
        )}

        {/* --- PRICING HEADER --- */}
        <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6 flex items-center gap-2">
           <span className={`w-1 h-6 ${accentBg}`}></span> Пакеты и цена
        </h4>

        {/* --- PRICING AREA --- */}
        <div className={`rounded-[2rem] p-8 md:p-12 relative overflow-hidden ${glassCardClasses}`}>
             
             {/* 1. QAM MATRIX */}
             {data.pricingType === 'qam-matrix' && data.subPackages && (
                <div>
                   {/* Slider */}
                   <div className="max-w-xl mx-auto mb-12">
                      <div className="text-center mb-8">
                            <span className="text-gray-400 text-xs uppercase tracking-widest">Выберите количество креативов</span>
                      </div>
                      <div className="relative h-12 flex items-center">
                         <input type="range" min="0" max="3" step="1" value={qamQtyIndex} onChange={(e) => setQamQtyIndex(parseInt(e.target.value))} className="absolute w-full h-full opacity-0 z-20 cursor-pointer" />
                         <div className="absolute w-full h-1 bg-white/10 rounded-full"></div>
                         <div className="absolute w-full flex justify-between px-1 pointer-events-none z-10">
                            {qamQuantities.map((q, idx) => (
                               <div key={idx} className={`w-5 h-5 rounded-full transition-all border-4 border-neutral-900 ${idx === qamQtyIndex ? `${accentBg} scale-125 shadow-[0_0_10px_rgba(255,255,255,0.5)]` : 'bg-neutral-700'}`}></div>
                            ))}
                         </div>
                      </div>
                      <div className="flex justify-between px-1 mt-2">
                         {qamQuantities.map((q, idx) => (
                            <span key={q} className={`text-xs font-mono w-4 text-center transition-all ${idx === qamQtyIndex ? `${accentColor} drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] scale-110` : 'text-gray-600'}`}>{q}</span>
                         ))}
                      </div>
                   </div>

                   {/* Cards */}
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {data.subPackages.map((pkg, idx) => {
                         const price = pkg.pricing[currentQamQty];
                         const pColor = pkg.accentColor || data.colorTheme;
                         const styles = getPackageStyles(pColor);
                         
                         return (
                            <div key={idx} className={`rounded-2xl p-5 hover:border-white/20 transition-all flex flex-col h-full group bg-gradient-to-b ${styles.gradient} via-white/[0.02] to-transparent backdrop-blur-md border border-white/10 shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.05)]`}>
                               <div className="mb-4">
                                  <div className={`w-10 h-10 rounded-lg ${styles.bg} bg-opacity-10 flex items-center justify-center ${styles.text} mb-4 border border-white/5`}>
                                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={pkg.iconPath} /></svg>
                                  </div>
                                  <h5 className="text-white font-bold text-lg leading-tight mb-1">{pkg.name}</h5>
                                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-3 min-h-[1.5em] whitespace-pre-line">{pkg.subtitle}</p>
                                  {pkg.description && <p className="text-xs text-gray-400 leading-relaxed min-h-[3em]">{pkg.description}</p>}
                               </div>
                               
                               <div className="bg-white/[0.02] -mx-5 px-5 py-4 mb-4 border-y border-white/5">
                                  <div className="flex items-baseline gap-1 mb-3">
                                     <span className="text-base text-gray-500">$</span>
                                     <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">{price.unitPrice}</span>
                                     <span className="text-[10px] text-gray-500">/ шт</span>
                                  </div>
                                  
                                  {/* Chip Wrapper */}
                                  <div className="flex gap-2">
                                     {/* Package Price Chip - Hidden if qty is 1 */}
                                     {currentQamQty !== '1' && (
                                     <div className="flex-1 px-2 py-2 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center justify-center text-center">
                                        <span className="text-[9px] text-gray-400 uppercase font-bold tracking-wider">Пакет</span>
                                        <span className="text-sm font-bold text-white mt-0.5">${price.packagePrice}</span>
                                     </div>
                                     )}

                                     {/* Benefit Chip */}
                                     {price.customerBenefit > 0 && (
                                        <div className="flex-1 px-2 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col items-center justify-center text-center">
                                           <span className="text-[9px] text-emerald-500/70 uppercase font-bold tracking-wider">Выгода</span>
                                           <span className="text-sm font-bold text-emerald-500 mt-0.5">+${price.customerBenefit}</span>
                                        </div>
                                     )}
                                  </div>
                               </div>

                               <div className="flex-grow space-y-3 mb-6">
                                  {pkg.included.length > 0 && (
                                     <ul className="space-y-2">
                                        {pkg.included.map((it, i) => {
                                          if (it.startsWith('SECTION:')) {
                                            return (
                                              <li key={i} className="text-[10px] uppercase font-bold text-gray-500 pt-2 pb-1 tracking-wider">
                                                {it.replace('SECTION:', '')}
                                              </li>
                                            );
                                          }
                                          return <IncludedItem key={i} text={it} />;
                                        })}
                                     </ul>
                                  )}
                                  {pkg.notIncluded.length > 0 && (
                                     <ul className="space-y-2 pt-2 border-t border-white/5">
                                        {pkg.notIncluded.map((it, i) => <NotIncludedItem key={i} text={it} />)}
                                     </ul>
                                  )}
                               </div>

                               <button 
                                 onClick={handleSelect}
                                 className={`w-full py-3 rounded-lg border border-white/10 ${styles.text} hover:text-white ${styles.hoverBg} hover:border-transparent transition-all text-xs font-bold uppercase tracking-widest mt-auto bg-white/[0.02]`}
                               >
                                 Выбрать
                               </button>
                            </div>
                         )
                      })}
                   </div>
                </div>
             )}

             {/* 2. STS MATRIX */}
             {data.pricingType === 'sts-matrix' && data.stsPackages && (
                <div>
                    {/* ADD LABEL HERE */}
                    <div className="text-center mb-6">
                        <span className="text-gray-400 text-xs uppercase tracking-widest">Выберите хронометраж ролика</span>
                    </div>

                    {/* Duration Select - Tabs style */}
                    <div className="flex justify-center mb-12">
                        <div className="bg-white/[0.02] p-1 rounded-xl flex gap-1 border border-white/10">
                            {stsDurations.map((dur) => (
                                <button 
                                    key={dur}
                                    onClick={() => setStsDuration(dur)}
                                    className={`px-6 py-3 rounded-lg text-sm font-bold transition-all border ${
                                        stsDuration === dur 
                                            ? 'bg-amber-500/20 border-amber-500/30 text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.1)] backdrop-blur-md' 
                                            : 'border-transparent text-gray-500 hover:text-white'
                                    }`}
                                >
                                    {dur.replace('s', '"')}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Packages Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {data.stsPackages.map((pkg, idx) => {
                            const price = pkg.prices[stsDuration];
                            const isAvailable = price !== null;
                            const styles = getPackageStyles(pkg.accentColor);
                            
                            // Re-calculate pricingCardClasses based on specific package accentColor
                            const packageCardClasses = `bg-gradient-to-b ${styles.gradient} via-white/[0.02] to-transparent backdrop-blur-md border border-white/10 shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.05)]`;

                            return (
                                <div key={idx} className={`rounded-2xl p-6 md:p-8 flex flex-col ${packageCardClasses} ${!isAvailable ? 'opacity-50 grayscale' : ''}`}>
                                    <div className="mb-6 border-b border-white/5 pb-6">
                                        <div className={`w-10 h-10 rounded-lg ${styles.bg} bg-opacity-10 flex items-center justify-center ${styles.text} mb-4 border border-white/5`}>
                                           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={pkg.iconPath} /></svg>
                                        </div>
                                        <h5 className="text-2xl font-black text-white mb-2">{pkg.name}</h5>
                                        {/* Uppercase description */}
                                        <p className="text-[10px] text-gray-400 h-8 uppercase tracking-wider font-bold leading-tight">{pkg.description}</p>
                                    </div>

                                    <div className="text-center mb-8">
                                        {isAvailable ? (
                                            <div className="flex items-baseline justify-center gap-1">
                                                <span className="text-3xl text-gray-500">$</span>
                                                <span className="text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">{price}</span>
                                            </div>
                                        ) : (
                                            <div className="text-2xl font-bold text-gray-600 uppercase">N/A</div>
                                        )}
                                        <div className="text-[10px] text-gray-500 uppercase mt-2 font-bold tracking-wider">
                                          {stsDurationLabels[stsDuration]}
                                        </div>
                                    </div>

                                    <div className="flex-grow space-y-4 mb-8">
                                         <ul className="space-y-3">
                                            {pkg.included.map((it, i) => <IncludedItem key={i} text={it} />)}
                                         </ul>
                                         {pkg.notIncluded.length > 0 && (
                                             <ul className="space-y-3 pt-4 border-t border-white/5">
                                                {pkg.notIncluded.map((it, i) => <NotIncludedItem key={i} text={it} />)}
                                             </ul>
                                         )}
                                    </div>

                                    <button 
                                        disabled={!isAvailable}
                                        onClick={() => isAvailable && handleSelect()}
                                        className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all border ${
                                            isAvailable 
                                            ? `border-white/10 ${styles.text} hover:text-white ${styles.hoverBg} hover:border-transparent bg-white/[0.02]`
                                            : 'border-transparent bg-white/[0.05] text-gray-500 cursor-not-allowed'
                                        }`}
                                    >
                                        {isAvailable ? 'Выбрать' : 'Недоступно'}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
             )}

             {/* 3. VOICE BOOST (Volume) */}
             {data.pricingType === 'voice-volume' && currentVbPrice && (
                 <div className="max-w-3xl mx-auto text-center">
                      <div className="mb-12">
                          <span className="text-gray-400 text-xs uppercase tracking-widest block mb-4">Выберите количество креативов</span>
                          
                          {/* Reusing Slider UI */}
                          <div className="relative h-12 flex items-center max-w-lg mx-auto mb-8">
                                <input type="range" min="0" max="3" step="1" value={vbQtyIndex} onChange={(e) => setVbQtyIndex(parseInt(e.target.value))} className="absolute w-full h-full opacity-0 z-20 cursor-pointer" />
                                <div className="absolute w-full h-1 bg-white/10 rounded-full"></div>
                                <div className="absolute w-full flex justify-between px-1 pointer-events-none z-10">
                                    {vbQuantities.map((q, idx) => (
                                        <div key={idx} className={`w-5 h-5 rounded-full transition-all border-4 border-neutral-900 ${idx === vbQtyIndex ? `${accentBg} scale-125 shadow-[0_0_10px_rgba(255,255,255,0.5)]` : 'bg-neutral-700'}`}></div>
                                    ))}
                                </div>
                          </div>
                          <div className="flex justify-between px-1 max-w-lg mx-auto">
                                {vbQuantities.map((q, idx) => (
                                    <span key={q} className={`text-xs font-mono w-4 text-center transition-all ${idx === vbQtyIndex ? `${accentColor} drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] scale-110` : 'text-gray-600'}`}>{q}</span>
                                ))}
                          </div>
                      </div>

                      <div className={`rounded-3xl p-6 md:p-10 inline-flex flex-col md:flex-row items-center gap-8 ${pricingCardClasses}`}>
                          <div className="text-center md:text-left">
                              <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">Цена за единицу</div>
                              <div className="flex items-baseline justify-center md:justify-start gap-1">
                                  <span className="text-4xl text-gray-500">$</span>
                                  <div className={`text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400`}>{currentVbPrice.unitPrice}</div>
                              </div>
                          </div>
                          <div className="w-px h-20 bg-white/10 hidden md:block"></div>
                          <div className="text-left w-[220px]">
                               <div className="flex flex-row gap-2 mb-4 min-h-[50px]">
                                   {currentVbQty !== '1' ? (
                                   <div className="w-1/2 px-3 py-2 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center text-center justify-center">
                                       <span className="text-[9px] text-gray-400 uppercase tracking-widest font-bold mb-1">Пакет</span>
                                       <span className="text-lg font-bold text-white leading-none">${currentVbPrice.packagePrice}</span>
                                   </div>
                                   ) : <div className="w-1/2"></div>}
                                   
                                   {currentVbPrice.customerBenefit > 0 ? (
                                       <div className="w-1/2 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col items-center text-center justify-center">
                                           <span className="text-[9px] text-emerald-500/70 uppercase tracking-widest font-bold mb-1">Выгода</span>
                                           <span className="text-lg font-bold text-emerald-500 leading-none">+${currentVbPrice.customerBenefit}</span>
                                       </div>
                                   ) : <div className="w-1/2"></div>}
                               </div>
                               <button 
                                   onClick={handleSelect}
                                   className={`w-full py-3 rounded-xl border border-white/10 ${accentColor} hover:text-white hover:${accentBg} hover:border-transparent bg-white/[0.02] font-bold uppercase tracking-widest text-xs transition-all`}
                               >
                                   Выбрать
                               </button>
                          </div>
                      </div>
                 </div>
             )}

        </div>
      </div>
    </section>
  );
};

export default ServiceDetail;
