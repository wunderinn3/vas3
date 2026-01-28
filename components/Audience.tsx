import React from 'react';
import { AUDIENCE_PROFILES } from '../constants';

const Audience: React.FC = () => {
  return (
    <section id="audience" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center md:text-left">
           <div className="flex items-baseline gap-4 mb-2 justify-center md:justify-start">
              <span className="text-6xl font-black text-amber-500 opacity-30 select-none">00</span>
              <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-t from-neutral-500 to-white uppercase tracking-tight leading-none">
                Продукт&nbsp;&nbsp;для&nbsp;&nbsp;вас&nbsp;&nbsp;если
              </h2>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {AUDIENCE_PROFILES.map((profile, index) => (
            <div 
              key={index} 
              className="relative flex flex-col h-full rounded-[2rem] p-6 md:p-8 transition-all duration-500
                         bg-gradient-to-b from-white/[0.05] via-white/[0.01] to-transparent 
                         backdrop-blur-[2px] 
                         border border-white/[0.08] 
                         shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.05)]"
            >
              {/* Header */}
              <div className="mb-5 border-b border-white/5 pb-5 relative z-10">
                {/* Updated text style: solid white with 0.85 opacity instead of gradient */}
                <h4 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight leading-tight text-white opacity-[0.85]">
                  {profile.subtitle}
                </h4>
                
                {/* Title with Icon */}
                <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg">
                   {profile.title === 'PERFORMANCE' && (
                     <svg className="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                     </svg>
                   )}
                   {profile.title === 'BRANDING' && (
                     <svg className="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                     </svg>
                   )}
                   <span className="text-amber-500 font-bold uppercase tracking-widest text-xs drop-shadow-sm">
                      {profile.title}
                   </span>
                </div>
              </div>

              {/* Conditional Rendering based on content type */}
              {profile.subCards ? (
                // BRANDING LAYOUT
                <div className="flex-grow relative z-10 flex flex-col">
                  {/* Intro Text - Compacted margin */}
                  {profile.introText && (
                    <p className="text-gray-200 text-sm leading-relaxed mb-5 opacity-80">
                      {profile.introText}
                    </p>
                  )}

                  {/* Sub Cards - Compacted spacing */}
                  <div className="space-y-3 mb-0 flex-grow">
                     {profile.subCards.map((card, cIdx) => (
                        <div key={cIdx} className="bg-gradient-to-bl from-amber-600/20 via-white/[0.05] to-white/[0.02] rounded-xl p-4 border border-white/5 hover:border-white/10 transition-colors">
                           <div className="flex items-center gap-3 mb-3">
                              {card.title && (
                                  <h5 className="text-amber-500/90 font-bold text-base tracking-tight mb-0">{card.title}</h5>
                              )}
                              {card.icon && (
                                 <svg className="w-5 h-5 text-amber-500/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={card.icon} />
                                 </svg>
                              )}
                           </div>
                           <div className="flex flex-row gap-4 items-center">
                              {/* Metrics Column */}
                              <div className="flex flex-col gap-2 shrink-0 min-w-[90px]">
                                 {card.metrics.map((m, mIdx) => (
                                    <div key={mIdx} className="flex flex-col items-center">
                                       <div className="bg-neutral-900/50 border border-white/10 px-3 py-1.5 rounded-2xl text-center w-full">
                                          <span className="text-lg font-black tracking-tight block leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400">
                                             {!m.value.startsWith('x') ? '↑ ' : ''}{m.value}
                                          </span>
                                       </div>
                                       {/* Source Link */}
                                       {m.sourceUrl && (
                                           <a 
                                             href={m.sourceUrl} 
                                             target="_blank" 
                                             rel="noopener noreferrer" 
                                             className="text-[8px] text-gray-600 hover:text-gray-400 hover:underline mt-1 text-center leading-tight max-w-[100px] block transition-colors"
                                           >
                                             {m.sourceText || 'Source'}
                                           </a>
                                       )}
                                    </div>
                                 ))}
                              </div>
                              {/* Text Column */}
                              <p className="text-xs text-gray-400 font-medium leading-relaxed">
                                 {card.text}
                              </p>
                           </div>
                        </div>
                     ))}
                  </div>
                </div>
              ) : profile.performanceMetric ? (
                // PERFORMANCE LAYOUT
                <div className="flex flex-col relative z-10 flex-grow">
                   
                   {/* Main Benchmark Card - Compacted */}
                   <div className="bg-gradient-to-bl from-amber-600/20 via-white/[0.05] to-white/[0.02] rounded-xl p-5 border border-white/5 mb-5">
                      <div className="flex flex-col items-center text-center sm:text-left sm:items-center sm:flex-row gap-5 justify-center">
                          {/* Number Block */}
                          <div className="flex flex-col shrink-0 items-center">
                            <div className="text-4xl md:text-5xl font-black leading-none flex items-baseline justify-center gap-2">
                                {(() => {
                                  const parts = profile.performanceMetric.value.split(' ');
                                  const val = parts[0];
                                  const label = parts.slice(1).join(' ');
                                  return (
                                    <>
                                      <span className="text-transparent bg-clip-text bg-gradient-to-b from-amber-500 to-amber-200 opacity-[0.85]">
                                          {val}
                                      </span>
                                      {label && (
                                          <span className="text-transparent bg-clip-text bg-gradient-to-b from-amber-500 to-amber-200 opacity-[0.85]">
                                              {label}
                                          </span>
                                      )}
                                    </>
                                  );
                                })()}
                            </div>
                            <span className="text-[8px] text-gray-600 uppercase tracking-widest font-bold mt-2 text-center">
                                {profile.performanceMetric.label}
                            </span>
                          </div>
                          
                          {/* Description */}
                          <p className="text-xs text-gray-400 font-medium leading-relaxed text-center sm:text-left max-w-[14rem]">
                            {profile.performanceMetric.description}
                          </p>
                      </div>
                   </div>

                   {/* Header above cases */}
                   <div className="flex items-center gap-3 mb-3">
                      <h5 className="text-amber-500/90 font-bold text-base tracking-tight mb-0">Если добавляем видео</h5>
                      <svg className="w-5 h-5 text-amber-500/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                   </div>

                   {/* Cases Grid - Compacted */}
                   {profile.performanceCases && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                         {profile.performanceCases.map((item, idx) => {
                           const parts = item.value.split(' ');
                           const valNumber = parts[0];
                           const valLabel = parts.slice(1).join(' ');

                           return (
                             <div key={idx} className="flex flex-col items-center">
                                <div className="bg-neutral-900/50 border border-white/10 px-2 py-2 rounded-2xl text-center w-full mb-2 flex flex-col justify-center items-center min-h-[4rem]">
                                   <span className="text-lg md:text-xl font-black tracking-tight block leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400">
                                      {valNumber}
                                   </span>
                                   {valLabel && (
                                     <span className="text-lg md:text-xl font-black tracking-tight block leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400">
                                        {valLabel}
                                     </span>
                                   )}
                                </div>
                                <a 
                                  href={item.sourceUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="text-[8px] text-gray-600 hover:text-gray-400 hover:underline text-center leading-tight transition-colors"
                                >
                                  {item.label}
                                </a>
                             </div>
                           );
                         })}
                      </div>
                   )}
                </div>
              ) : (
                // STANDARD/FALLBACK LAYOUT (if needed)
                <>
                  {profile.painPoints && (
                    <div className="space-y-6 mb-10 flex-grow relative z-10">
                      {profile.painPoints.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-4">
                          <div className="shrink-0 w-10 h-10 rounded-full bg-white/[0.02] flex items-center justify-center border border-white/5 text-amber-500 shadow-sm">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={point.icon} />
                            </svg>
                          </div>
                          <p className="text-gray-200 text-sm leading-relaxed pt-2 opacity-80">{point.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {profile.metrics && (
                    <div className="bg-white/[0.01] rounded-2xl p-6 border border-white/5 relative z-10">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {profile.metrics.map((metric, mIdx) => (
                          <div key={mIdx}>
                            <div className="text-3xl font-black text-amber-500 mb-1 drop-shadow-sm">{metric.value}</div>
                            <div className="text-xs text-gray-500 uppercase font-bold tracking-wider leading-tight">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {profile.footer && (
                    <div className="mt-8 text-xs text-gray-500">
                      {profile.footer}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Audience;