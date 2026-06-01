'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BowlSVG } from '@/components/ui/BowlSVG';
import { Badge } from '@/components/ui/Badge';
import { PRODUCTS, CATEGORY_COLORS } from '@/lib/data';
import { useCart } from '@/lib/cart';
import { money } from '@/lib/utils';

const items = PRODUCTS.filter((p) => p.cat === 'Hummus & Dips' && !p.hidden);

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0, scale: 0.97 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0, scale: 0.97 }),
};

export function HeroCarousel() {
  const { addItem } = useCart();
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);

  const next = useCallback(() => {
    setDir(1);
    setIdx((i) => (i + 1) % items.length);
  }, []);

  const prev = () => {
    setDir(-1);
    setIdx((i) => (i - 1 + items.length) % items.length);
  };

  useEffect(() => {
    const t = setInterval(next, 4000);
    return () => clearInterval(t);
  }, [next]);

  const p = items[idx];
  const [c1, c2] = CATEGORY_COLORS['Hummus & Dips'];

  return (
    <div className="relative rounded-[30px] overflow-hidden bg-cream-2 shadow-bowl" style={{ aspectRatio: '1' }}>
      {/* Bowl illustration — fades between slides */}
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={`bg-${idx}`}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          <BowlSVG c1={c1} c2={c2} id={`hero-${p.id}`} />
        </motion.div>
      </AnimatePresence>

      {/* Bottom info card */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="bg-paper/95 backdrop-blur-sm rounded-2xl p-4 shadow-bowl">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={`info-${idx}`}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-xl font-semibold text-ink leading-tight">{p.name}</h3>
                  <p className="text-sm text-ink-soft mt-0.5 line-clamp-1">{p.desc}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {p.badges.slice(0, 2).map((b) => <Badge key={b} b={b} />)}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <span className="font-serif text-2xl font-semibold text-terracotta">{money(p.price)}</span>
                  <button
                    onClick={() => addItem(p.id)}
                    className="px-4 py-2 rounded-full bg-terracotta text-white font-semibold text-sm hover:bg-terra-dk active:scale-95 transition-all duration-150 select-none whitespace-nowrap"
                  >
                    Add to Order
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Nav arrows */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-paper/80 flex items-center justify-center hover:bg-paper active:scale-90 transition-all shadow-card"
        aria-label="Previous"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-paper/80 flex items-center justify-center hover:bg-paper active:scale-90 transition-all shadow-card"
        aria-label="Next"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute top-3.5 left-1/2 -translate-x-1/2 flex gap-1.5">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i); }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === idx ? 'w-5 bg-terracotta' : 'w-1.5 bg-ink/25'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Floating badges */}
      <div className="absolute bottom-[160px] left-4 bg-paper rounded-xl px-3 py-2 shadow-card flex items-center gap-2 text-sm font-semibold">
        <span className="w-7 h-7 rounded-lg bg-olive/15 flex items-center justify-center text-base">🌱</span>
        Seed-Oil Free
      </div>
      <div className="absolute top-12 right-4 bg-paper rounded-xl px-3 py-2 shadow-card flex items-center gap-2 text-sm font-semibold">
        <span className="w-7 h-7 rounded-lg bg-gold/20 flex items-center justify-center text-base">📅</span>
        Preorder weekly
      </div>
    </div>
  );
}
