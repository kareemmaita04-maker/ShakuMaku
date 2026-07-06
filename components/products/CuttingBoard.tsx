'use client';

import { useState } from 'react';
import { PRODUCTS, CATEGORY_COLORS, type Product } from '@/lib/data';
import { BowlSVG } from '@/components/ui/BowlSVG';
import { useCart } from '@/lib/cart';
import { money } from '@/lib/utils';

const ITEMS = PRODUCTS.filter((p) => !p.hidden);

// Wood-grain board background
const boardBg: React.CSSProperties = {
  backgroundColor: '#6B3C1E',
  backgroundImage: [
    // Fine horizontal grain lines
    'repeating-linear-gradient(180deg, transparent 0px, transparent 18px, rgba(0,0,0,.055) 18px, rgba(0,0,0,.055) 19px)',
    // Wider subtle streaks
    'repeating-linear-gradient(182deg, transparent 0px, transparent 60px, rgba(255,255,255,.018) 60px, rgba(255,255,255,.018) 62px)',
    // Top highlight + bottom shadow
    'linear-gradient(180deg, rgba(255,255,255,.09) 0%, rgba(255,255,255,.03) 12%, transparent 40%, rgba(0,0,0,.18) 100%)',
  ].join(', '),
};

export function CuttingBoard() {
  const { addItem } = useCart();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div
      className="relative rounded-[28px] md:rounded-[36px]"
      style={{
        boxShadow:
          '0 32px 80px -16px rgba(0,0,0,.55), 0 6px 20px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.12)',
      }}
    >
      {/* Board surface */}
      <div
        className="relative rounded-[28px] md:rounded-[36px] overflow-hidden px-6 py-8 sm:px-10 sm:py-12 md:px-14 md:py-14"
        style={boardBg}
      >
        {/* Inset edge shadow */}
        <div className="pointer-events-none absolute inset-0 rounded-[28px] md:rounded-[36px] shadow-[inset_0_0_0_2px_rgba(0,0,0,.3),inset_0_2px_8px_rgba(0,0,0,.25)]" />

        {/* Products — flex wrap so last row centers naturally */}
        <div className="flex flex-wrap justify-center gap-5 sm:gap-7 md:gap-9">
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
        width: 'clamp(110px, 22vw, 158px)',
        cursor: isSoldOut ? 'default' : 'pointer',
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={isSoldOut ? undefined : onAdd}
    >
      {/* Bowl / photo placeholder */}
      <div
        className="relative w-full rounded-full overflow-hidden"
        style={{
          aspectRatio: '1',
          transition: 'transform 220ms ease-out, filter 220ms ease-out',
          transform: isHovered ? 'scale(1.12) translateY(-6px)' : 'scale(1) translateY(0)',
          filter: isHovered
            ? 'drop-shadow(0 20px 28px rgba(0,0,0,.6))'
            : 'drop-shadow(0 7px 14px rgba(0,0,0,.45))',
        }}
      >
        {/* Photo slot — swap BowlSVG for <img> once real photos are ready */}
        <BowlSVG c1={c1} c2={c2} id={`board-${p.id}`} />

        {/* Hover overlay */}
        {isHovered && !isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/42">
            <span className="bg-terracotta text-white text-[13px] font-bold px-4 py-2 rounded-full shadow-lg pointer-events-none">
              + Add
            </span>
          </div>
        )}

        {isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="text-white text-[12px] font-bold">Sold Out</span>
          </div>
        )}
      </div>

      {/* Label */}
      <div className="text-center leading-tight">
        <p
          className="font-semibold text-[12.5px] sm:text-[13.5px] leading-snug"
          style={{
            color: isHovered ? '#FFFCF5' : '#EDE0C4',
            transition: 'color 150ms',
          }}
        >
          {p.name}
        </p>
        <p
          className="text-[11px] sm:text-[12px] mt-0.5 font-medium"
          style={{
            color: isHovered ? '#F2DC90' : '#B89B5E',
            transition: 'color 150ms',
          }}
        >
          {money(p.price)}
        </p>
      </div>
    </div>
  );
}
