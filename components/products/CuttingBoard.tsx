'use client';

import { useState } from 'react';
import { PRODUCTS, CATEGORY_COLORS, type Product } from '@/lib/data';
import { BowlSVG } from '@/components/ui/BowlSVG';
import { useCart } from '@/lib/cart';
import { money } from '@/lib/utils';

const ITEMS = PRODUCTS.filter((p) => !p.hidden);

// Real cutting board photo as background
const wood: React.CSSProperties = {
  backgroundColor: '#8B5E30',
  backgroundImage: 'url(/cutting-board.png)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

export function CuttingBoard() {
  const { addItem } = useCart();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    // Outer wrapper — leaves room below for the handle
    <div className="relative" style={{ paddingBottom: 56 }}>

      {/* ── Handle (behind the board, peeks out below) ── */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: 0,
          width: 92,
          height: 76,
          borderRadius: '0 0 46px 46px',
          zIndex: 1,
          backgroundColor: '#8B5E30',
          backgroundImage: 'url(/cutting-board.png)',
          backgroundSize: '900px auto',
          backgroundPosition: 'center bottom',
          boxShadow: '0 14px 28px rgba(0,0,0,.45)',
        }}
      >
        {/* Hanging hole */}
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2"
          style={{
            width: 20,
            height: 20,
            borderRadius: '50%',
            background: 'rgba(0,0,0,.35)',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,.6), 0 1px 0 rgba(255,255,255,.12)',
            border: '1.5px solid rgba(0,0,0,.45)',
          }}
        />
      </div>

      {/* ── Main board surface (above handle) ── */}
      <div
        className="relative"
        style={{
          borderRadius: 32,
          zIndex: 10,
          ...wood,
          boxShadow: [
            '0 36px 80px -16px rgba(0,0,0,.6)',
            '0 8px 24px rgba(0,0,0,.35)',
            'inset 0 1px 0 rgba(255,255,255,.18)',
            'inset 0 0 0 2px rgba(0,0,0,.22)',
          ].join(', '),
          padding: 'clamp(24px, 4vw, 56px)',
          paddingBottom: 'clamp(28px, 4vw, 60px)',
        }}
      >
        {/* Inner routed groove (realistic edge detail) */}
        <div
          className="pointer-events-none absolute inset-[10px]"
          style={{
            borderRadius: 22,
            boxShadow: 'inset 0 0 0 1.5px rgba(0,0,0,.18), inset 0 2px 6px rgba(0,0,0,.12)',
          }}
        />

        {/* Products — flex-wrap so last row auto-centers */}
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
        width: 'clamp(108px, 20vw, 154px)',
        cursor: isSoldOut ? 'default' : 'pointer',
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={isSoldOut ? undefined : onAdd}
    >
      {/* Bowl / future photo — round, sits on the wood */}
      <div
        className="relative w-full rounded-full overflow-hidden"
        style={{
          aspectRatio: '1',
          transition: 'transform 200ms ease-out, filter 200ms ease-out',
          transform: isHovered
            ? 'scale(1.13) translateY(-7px)'
            : 'scale(1) translateY(0)',
          // Drop shadow simulates object sitting on a surface
          filter: isHovered
            ? 'drop-shadow(0 22px 28px rgba(0,0,0,.62))'
            : 'drop-shadow(0 8px 16px rgba(0,0,0,.50))',
        }}
      >
        {/*
          Photo slot — replace <BowlSVG> with:
            <img src="/images/hummus/p1.png" alt={p.name} className="w-full h-full object-contain" />
          once your transparent-background PNGs are ready.
        */}
        <BowlSVG c1={c1} c2={c2} id={`board-${p.id}`} />

        {/* Hover overlay */}
        {isHovered && !isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="bg-terracotta text-white text-[13px] font-bold px-4 py-2 rounded-full shadow-lg pointer-events-none">
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

      {/* Label — cream text on wood */}
      <div className="text-center leading-tight px-1">
        <p
          className="font-semibold text-[12.5px] sm:text-[13.5px] leading-snug"
          style={{
            color: isHovered ? '#FFFCF5' : '#F0E0C0',
            transition: 'color 150ms',
            textShadow: '0 1px 3px rgba(0,0,0,.5)',
          }}
        >
          {p.name}
        </p>
        <p
          className="text-[11px] sm:text-[12px] mt-0.5 font-semibold"
          style={{
            color: isHovered ? '#F8DC80' : '#D4A850',
            transition: 'color 150ms',
            textShadow: '0 1px 2px rgba(0,0,0,.4)',
          }}
        >
          {money(p.price)}
        </p>
      </div>
    </div>
  );
}
