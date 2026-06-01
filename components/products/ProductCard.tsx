'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { BowlSVG } from '@/components/ui/BowlSVG';
import { Badge } from '@/components/ui/Badge';
import { ProductModal } from './ProductModal';
import { type Product, CATEGORY_COLORS } from '@/lib/data';
import { useCart } from '@/lib/cart';
import { money } from '@/lib/utils';

export function ProductCard({ p }: { p: Product }) {
  const { addItem } = useCart();
  const [modalOpen, setModalOpen] = useState(false);
  const [c1, c2] = CATEGORY_COLORS[p.cat];
  const isSoldOut = p.badges.includes('Sold Out');

  return (
    <>
      <motion.div
        whileHover={{ y: -5, boxShadow: '0 18px 50px -28px rgba(0,0,0,.25)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        className="bg-paper border border-line rounded-[18px] overflow-hidden flex flex-col"
      >
        {/* Image */}
        <div
          className="relative cursor-pointer overflow-hidden"
          style={{ aspectRatio: '4/3' }}
          onClick={() => setModalOpen(true)}
        >
          <BowlSVG c1={c1} c2={c2} id={`card-${p.id}`} />
          <span className="absolute top-3 left-3 bg-paper/92 text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full text-ink-soft">
            {p.cat}
          </span>
          {isSoldOut && (
            <div className="absolute inset-0 bg-ink/55 flex items-center justify-center">
              <span className="font-serif text-white text-xl font-semibold">Sold Out</span>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-[18px] flex flex-col flex-1">
          <h3
            className="font-serif text-[21px] font-semibold cursor-pointer hover:text-terracotta transition-colors"
            onClick={() => setModalOpen(true)}
          >
            {p.name}
          </h3>
          <div className="flex justify-between items-baseline mt-0.5">
            <span className="text-sm text-ink-soft">{p.size}</span>
            <span className="font-serif text-[22px] font-semibold text-terracotta">{money(p.price)}</span>
          </div>
          <p className="text-sm text-ink-soft mt-2 mb-2">{p.desc}</p>
          <p className="text-[12.5px] text-ink-soft/90 mb-3">
            <span className="font-semibold text-ink">Ingredients:</span>{' '}
            {p.ingredients.length > 62 ? p.ingredients.slice(0, 62) + '…' : p.ingredients}
          </p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {p.badges.map((b) => <Badge key={b} b={b} />)}
          </div>

          {isSoldOut ? (
            <button
              disabled
              className="mt-auto w-full py-3 rounded-full border border-ink text-ink font-semibold text-sm opacity-50 cursor-not-allowed select-none"
            >
              Sold Out
            </button>
          ) : (
            <button
              onClick={() => addItem(p.id)}
              className="mt-auto w-full py-3 rounded-full bg-terracotta text-white font-semibold text-sm hover:bg-terra-dk active:scale-[.97] transition-all duration-150 select-none"
            >
              Add to Order
            </button>
          )}
        </div>
      </motion.div>

      {modalOpen && <ProductModal product={p} onClose={() => setModalOpen(false)} />}
    </>
  );
}
