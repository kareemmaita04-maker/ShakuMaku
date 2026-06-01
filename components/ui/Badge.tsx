import type { Badge as BadgeType } from '@/lib/data';

const STYLES: Record<BadgeType, string> = {
  'Vegan':         'text-olive border-olive bg-olive/8',
  'Seed-Oil Free': 'text-gold-dk border-gold bg-gold/10',
  'Spicy':         'text-spicy border-spicy bg-spicy/8',
  'Contains Dairy':'text-[#8a6a4a] border-[#cbae8b] bg-[#cbae8b]/18',
  'Limited Time':  'text-[#7a4ea8] border-[#b79ad6] bg-[#b79ad6]/8',
  'Sold Out':      'text-[#7c7c7c] border-[#bcbcbc] bg-[#bcbcbc]/10',
};

const ICONS: Record<BadgeType, string> = {
  'Vegan':         '🌱',
  'Seed-Oil Free': '✓',
  'Spicy':         '🌶',
  'Contains Dairy':'🥛',
  'Limited Time':  '⏳',
  'Sold Out':      '',
};

export function Badge({ b }: { b: BadgeType }) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full border-[1.5px] ${STYLES[b]}`}
    >
      {ICONS[b]} {b}
    </span>
  );
}
