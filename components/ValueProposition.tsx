import React, { useEffect, useRef, useState } from 'react';

interface WordToken {
  text: string;
  type: 'neutral' | 'amber';
  alwaysVisible?: boolean;
}

interface LineData {
  words: WordToken[];
}

const CONTENT: LineData[] = [
  {
    words: [
      { text: "С ПОМОЩЬЮ", type: 'neutral', alwaysVisible: true },
      { text: "AI", type: 'amber', alwaysVisible: true },
      { text: "ПОМОГАЕМ", type: 'neutral' },
      { text: "КЛИЕНТАМ", type: 'neutral' },
    ]
  },
  {
    words: [
      { text: "ДЕЛАТЬ", type: 'neutral' },
      { text: "ВИДЕО", type: 'neutral' },
      { text: "БЫСТРЕЕ", type: 'amber' },
      { text: "И", type: 'neutral' },
      { text: "ДЕШЕВЛЕ", type: 'amber' },
      { text: "ДО", type: 'neutral' },
      { text: "х5", type: 'amber' },
    ]
  },
  {
    words: [
      { text: "ДЕЛАЕМ", type: 'neutral' },
      { text: "РОЛИК", type: 'neutral' },
      { text: "ЗА", type: 'neutral' },
      { text: "$109", type: 'amber' },
      { text: "и", type: 'neutral' },
      { text: "5 дней", type: 'amber' },
    ]
  }
];

const Word: React.FC<{ 
  text: string; 
  type: 'neutral' | 'amber'; 
  isActive: boolean; 
}> = ({ text, type, isActive }) => {
  const baseClasses = "transition-opacity duration-500 ease-out inline-block";
  // Inactive: 85% transparent = opacity 0.15
  // Active: 30% transparent = opacity 0.70
  const opacityClass = isActive ? "opacity-70" : "opacity-[0.15]";
  
  const gradientClass = type === 'neutral' 
    ? "text-white" // Gradient removed, solid white
    : "text-transparent bg-clip-text bg-gradient-to-b from-amber-600 to-amber-200";

  return (
    <span className={`${baseClasses} ${opacityClass} ${gradientClass}`}>
      {text}
    </span>
  );
};

const ValueProposition: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [activeWordIndex, setActiveWordIndex] = useState(0);

  // Flatten content to count total words for index calculation
  const allWords = CONTENT.flatMap(line => line.words);
  const totalWords = allWords.length;

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const element = containerRef.current;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Logic: Calculate progress based on element's position in the viewport.
      // Start revealing when the top of the element enters the bottom 90% of screen.
      // Finish revealing when the top of the element reaches the top 30% of screen.
      const startPoint = windowHeight * 0.9;
      const endPoint = windowHeight * 0.3;
      
      const currentPos = rect.top;
      
      // Calculate progress 0 to 1
      let progress = (startPoint - currentPos) / (startPoint - endPoint);
      
      // Clamp between 0 and 1
      progress = Math.min(Math.max(progress, 0), 1);

      const visibleWordsCount = Math.floor(progress * totalWords);
      setActiveWordIndex(visibleWordsCount);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalWords]);

  let currentWordGlobalIndex = 0;

  return (
    <section ref={containerRef} className="py-28 relative z-20 border-t border-white/5">
      <div className="w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Changed font-black to font-extrabold for slightly thinner weight */}
        {/* Added border-l-4 border-amber-500/50 pl-6 for the quote line effect */}
        <div className="w-fit mx-auto border-l-2 md:border-l-4 border-amber-500/50 pl-6 md:pl-10 flex flex-col gap-2 md:gap-4 text-lg md:text-2xl lg:text-4xl font-extrabold tracking-tight uppercase leading-none text-left pr-4">
          {CONTENT.map((line, lineIdx) => (
            <div key={lineIdx} className="whitespace-normal xl:whitespace-nowrap flex flex-wrap gap-x-[0.3em]">
              {line.words.map((word, wordIdx) => {
                const myIndex = currentWordGlobalIndex++;
                const isActive = word.alwaysVisible || myIndex < activeWordIndex;
                
                return (
                  <Word 
                    key={wordIdx} 
                    text={word.text} 
                    type={word.type} 
                    isActive={isActive} 
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
