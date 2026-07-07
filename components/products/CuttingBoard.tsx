'use client';

import { useState } from 'react';
import { PRODUCTS, CATEGORY_COLORS, type Product } from '@/lib/data';
import { BowlSVG } from '@/components/ui/BowlSVG';
import { useCart } from '@/lib/cart';
import { money } from '@/lib/utils';

const ITEMS = PRODUCTS.filter((p) => !p.hidden);

export function CuttingBoard() {
  const { addItem } = useCart();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div
      style={{
        background: 'linear-gradient(160deg, #C8864A 0%, #9E6030 40%, #8B5226 70%, #A06835 100%)',
        borderRadius: 24,
        padding: 'clamp(20px, 4vw, 48px)',
        boxShadow: '0 20px 60px rgba(0,0,0,.5)',
      }}
    >
      <div className="flex flex-wrap justify-center gap-5 sm:gap-7 md:gap-8">
        {ITEMS.map((p) => (
          <BoardItem
            key={p.id}
            p={p}
            isHovered={hovered === p.id}
            onEnter={() => setHovered(p.id)}
            onLeave={() => setHovered(null)}
            onAdd={() => addItem(p.id)}
          />
        ))}
      </div>
    </div>
  );
}

function BoardItem({
  p,
  isHovered,
  onEnter,
  onLeave,
  onAdd,
}: {
  p: Product;
  isHovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onAdd: () => void;
}) {
  const [c1, c2] = CATEGORY_COLORS[p.cat];
  const isSoldOut = p.badges.includes('Sold Out');

  return (
    <div
      className="flex flex-col items-center gap-2 select-none"
      style={{
        width: 'clamp(100px, 18vw, 140px)',
        cursor: isSoldOut ? 'default' : 'pointer',
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={isSoldOut ? undefined : onAdd}
    >
      <div
        className="relative w-full rounded-full overflow-hidden"
        style={{
          aspectRatio: '1',
          transition: 'transform 180ms ease-out, filter 180ms ease-out',
          transform: isHovered ? 'scale(1.12) translateY(-6px)' : 'scale(1) translateY(0)',
          filter: isHovered
            ? 'drop-shadow(0 18px 24px rgba(0,0,0,.6))'
            : 'drop-shadow(0 6px 12px rgba(0,0,0,.45))',
        }}
      >
        <BowlSVG c1={c1} c2={c2} id={`board-${p.id}`} />

        {isHovered && !isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="bg-terracotta text-white text-[13px] font-bold px-4 py-2 rounded-full shadow-lg">
              + Add
            </span>
          </div>
        )}

        {isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="text-white text-[12px] font-bold tracking-wide">Sold Out</span>
          </div>
        )}
      </div>

      <div className="text-center px-1">
        <p
          className="font-semibold text-[12px] sm:text-[13px] leading-snug"
          style={{
            color: '#F0E0C0',
            textShadow: '0 1px 3px rgba(0,0,0,.6)',
          }}
        >
          {p.name}
        </p>
        <p
          className="text-[11px] sm:text-[12px] mt-0.5 font-semibold"
          style={{
            color: '#E8C870',
            textShadow: '0 1px 2px rgba(0,0,0,.4)',
          }}
        >
          {money(p.price)}
        </p>
      </div>
    </div>
  );
}
