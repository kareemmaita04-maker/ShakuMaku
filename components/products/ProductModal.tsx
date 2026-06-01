'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BowlSVG } from '@/components/ui/BowlSVG';
import { Badge } from '@/components/ui/Badge';
import { type Product, PRODUCTS, CATEGORY_COLORS } from '@/lib/data';
import { useCart } from '@/lib/cart';
import { money } from '@/lib/utils';

interface Props {
  product: Product;
  onClose: () => void;
}

export function ProductModal({ product: p, onClose }: Props) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [c1, c2] = CATEGORY_COLORS[p.cat];
  const related = PRODUCTS.filter((x) => x.cat === p.cat && x.id !== p.id && !x.hidden).slice(0, 3);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[110] flex items-center justify-center p-5 bg-ink/55"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.94, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 340, damping: 30 }}
          className="bg-cream rounded-3xl max-w-[860px] w-full max-h-[90vh] overflow-y-auto shadow-bowl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Visual */}
            <div className="relative" style={{ aspectRatio: '1' }}>
              <BowlSVG c1={c1} c2={c2} id={`modal-${p.id}`} className="rounded-tl-3xl rounded-bl-3xl" />
              <button
                onClick={onClose}
                className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-paper/92 flex items-center justify-center text-xl leading-none hover:bg-cream-2 active:scale-90 transition-all"
              >
                ×
              </button>
            </div>

            {/* Body */}
            <div className="p-7 flex flex-col">
              <div className="text-[11px] font-bold uppercase tracking-widest text-gold-dk">{p.cat}</div>
              <h2 className="font-serif text-[32px] font-semibold mt-1 mb-0.5">{p.name}</h2>
              <div className="font-serif text-[26px] font-semibold text-terracotta">
                {money(p.price)}{' '}
                <span className="text-sm text-ink-soft font-sans font-normal">/ {p.size}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 my-4">
                {p.badges.map((b) => <Badge key={b} b={b} />)}
              </div>
              <p className="text-ink-soft text-sm leading-relaxed">{p.desc}</p>

              <div className="mt-4 space-y-3">
                {[
                  { label: 'Ingredients', val: p.ingredients },
                  { label: 'Allergen Info', val: p.allergens },
                  { label: 'Storage', val: p.storage },
                  { label: 'Shelf Life', val: p.shelf },
                ].map((row) => (
                  <div key={row.label} className="text-sm">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-ink-soft mb-0.5">{row.label}</div>
                    <div className="text-ink">{row.val}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 mt-6">
                <div className="flex items-center border-[1.5px] border-terracotta rounded-full overflow-hidden">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 text-terracotta font-bold text-lg flex items-center justify-center hover:bg-terracotta/10 active:scale-90 transition-all"
                  >
                    −
                  </button>
                  <span className="min-w-[32px] text-center font-semibold">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="w-9 h-9 text-terracotta font-bold text-lg flex items-center justify-center hover:bg-terracotta/10 active:scale-90 transition-all"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => { addItem(p.id, qty); onClose(); }}
                  className="flex-1 py-3 rounded-full bg-terracotta text-white font-semibold text-sm hover:bg-terra-dk active:scale-[.97] transition-all duration-150 select-none"
                >
                  Add to Order
                </button>
              </div>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="px-7 pb-7">
              <h4 className="text-base font-semibold mb-3">You might also like</h4>
              <div className="grid grid-cols-3 gap-3">
                {related.map((r) => {
                  const [rc1, rc2] = CATEGORY_COLORS[r.cat];
                  return (
                    <div key={r.id} className="cursor-pointer border border-line rounded-xl overflow-hidden bg-paper hover:border-terracotta transition-colors">
                      <div style={{ aspectRatio: '4/3' }}>
                        <BowlSVG c1={rc1} c2={rc2} id={`rel-${r.id}`} />
                      </div>
                      <div className="px-3 py-2">
                        <div className="text-sm font-semibold leading-tight">{r.name}</div>
                        <div className="text-sm text-terracotta font-semibold mt-0.5">{money(r.price)}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
