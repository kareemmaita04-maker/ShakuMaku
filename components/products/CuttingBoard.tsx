'use client';

import { useState } from 'react';
import { PRODUCTS, CATEGORY_COLORS, type Product } from '@/lib/data';
import { BowlSVG } from '@/components/ui/BowlSVG';
import { useCart } from '@/lib/cart';
import { money } from '@/lib/utils';

// Only show the hummus & dip flavors on the board
const ITEMS = PRODUCTS.filter((p) => p.cat === 'Hummus & Dips' && !p.hidden);

export function CuttingBoard() {
  const { addItem } = useCart();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div style={{ filter: 'drop-shadow(0 32px 64px rgba(0,0,0,0.8))' }}>
      <div
        style={{
          borderRadius: 20,
          overflow: 'hidden',
          backgroundImage: `
            repeating-linear-gradient(
              108deg,
              transparent 0px, transparent 3px,
              rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px,
              transparent 4px, transparent 9px,
              rgba(0,0,0,0.04) 9px, rgba(0,0,0,0.04) 10px,
              transparent 10px, transparent 18px,
              rgba(0,0,0,0.06) 18px, rgba(0,0,0,0.06) 20px,
              transparent 20px, transparent 32px
            ),
            repeating-linear-gradient(
              108deg,
              transparent 0px, transparent 20px,
              rgba(255,255,255,0.05) 20px, rgba(255,255,255,0.05) 22px,
              transparent 22px, transparent 48px,
              rgba(255,255,255,0.03) 48px, rgba(255,255,255,0.03) 49px,
              transparent 49px, transparent 70px
            ),
            linear-gradient(160deg, #C8864A 0%, #A86530 28%, #8B5226 52%, #9A6332 72%, #BE7D40 100%)
          `,
          padding: 'clamp(28px, 5vw, 64px)',
        }}
      >
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-10">
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
        width: 'clamp(110px, 20vw, 150px)',
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
          transform: isHovered ? 'scale(1.12) translateY(-8px)' : 'scale(1) translateY(0)',
          filter: isHovered
            ? 'drop-shadow(0 20px 28px rgba(0,0,0,0.65))'
            : 'drop-shadow(0 6px 14px rgba(0,0,0,0.5))',
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
          style={{ color: '#F2E4C8', textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}
        >
          {p.name}
        </p>
        <p
          className="text-[11px] sm:text-[12px] mt-0.5 font-semibold"
          style={{ color: '#EAC96A', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
        >
          {money(p.price)}
        </p>
      </div>
    </div>
  );
}
