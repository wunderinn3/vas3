'use client';

import * as React from "react";
import { cn } from '../../lib/utils';
import { ScrollArea } from './scroll-area';

type XScrollProps = React.ComponentPropsWithoutRef<typeof ScrollArea>;

export default function XScroll({ children, className, ...props }: XScrollProps) {
  const viewportRef = React.useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  const updateScrollState = React.useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const { scrollLeft, scrollWidth, clientWidth } = viewport;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  }, []);

  React.useEffect(() => {
    updateScrollState();
    const viewport = viewportRef.current;
    if (!viewport) return;

    const handleScroll = () => updateScrollState();
    viewport.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      viewport.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  const handleScrollBy = (direction: 'left' | 'right') => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const delta = Math.round(viewport.clientWidth * 0.8) * (direction === 'left' ? -1 : 1);
    viewport.scrollBy({ left: delta, behavior: 'smooth' });
  };

  return (
    <div className="relative flex w-full items-center">
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => handleScrollBy('left')}
          className="absolute left-[-3.5rem] top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-amber-500/40 bg-amber-500/20 text-amber-200 shadow-lg shadow-amber-500/20 transition-all hover:bg-amber-500/30 hover:text-white"
          aria-label="Scroll left"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>
      )}
      {canScrollRight && (
        <button
          type="button"
          onClick={() => handleScrollBy('right')}
          className="absolute right-[-3.5rem] top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-amber-500/40 bg-amber-500/20 text-amber-200 shadow-lg shadow-amber-500/20 transition-all hover:bg-amber-500/30 hover:text-white animate-pulse"
          aria-label="Scroll right"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.59 16.59 10 18l6-6-6-6-1.41 1.41L12.17 12z" />
          </svg>
        </button>
      )}
      <ScrollArea
        viewportRef={viewportRef}
        showScrollbar={false}
        className={cn('w-full flex-1', className)}
        {...props}
      >
        {children}
      </ScrollArea>
    </div>
  );
}
