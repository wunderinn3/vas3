import React, { useState } from 'react';
import { CONTACT_INFO } from '../constants';

const Contact: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const isDisabled = inputValue.length < 4;

  return (
    <section id="contact" className="py-28 bg-transparent relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto rounded-3xl p-8 text-center bg-gradient-to-b from-white/[0.05] via-white/[0.01] to-transparent backdrop-blur-[2px] border border-white/[0.05] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.05)]">
           
           <form className="space-y-4 mb-8" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ваш Email или Telegram" 
                className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
              <button 
                disabled={isDisabled}
                className={`w-full font-bold py-3 rounded-xl transition-all uppercase tracking-widest text-xs ${
                  isDisabled 
                    ? 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5' 
                    : 'bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-900/20'
                }`}
              >
                Оставить заявку
              </button>
           </form>

           <div className="pt-6 border-t border-white/5">
              <a 
                href={`https://t.me/${CONTACT_INFO.telegram.replace('@', '')}`}
                className="inline-flex items-center gap-2 group transition-opacity hover:opacity-80"
              >
                 <svg className="w-6 h-6 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                 </svg>
                 <span className="font-bold text-xl bg-gradient-to-r from-amber-600 via-amber-200 to-amber-600 bg-[length:200%_auto] bg-clip-text text-transparent animate-shimmer">
                   {CONTACT_INFO.ctaText}
                 </span>
              </a>
           </div>
        </div>
        
        <footer className="mt-12 text-center text-neutral-600 text-xs">
           &copy; {new Date().getFullYear()} Wunder Digital Agency
        </footer>
      </div>
    </section>
  );
};

export default Contact;