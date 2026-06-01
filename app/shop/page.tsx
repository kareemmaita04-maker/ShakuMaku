'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/products/ProductCard';
import { PRODUCTS, type Category } from '@/lib/data';

const filters = ['All', 'Hummus & Dips', 'Lebneh', 'Bundles', 'Seed-Oil Free', 'Vegan', 'Spicy', 'Contains Dairy'];

export default function ShopPage() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get('cat') ?? 'All';
  const [active, setActive] = useState(initialCat);

  const list = PRODUCTS.filter((p) => {
    if (p.hidden) return false;
    if (active === 'All') return true;
    if (['Hummus & Dips', 'Lebneh', 'Bundles'].includes(active)) return p.cat === (active as Category);
    return p.badges.includes(active as any);
  });

  return (
    <section className="py-14 px-5">
      <div className="max-w-[1180px] mx-auto">
        <div className="text-center max-w-[620px] mx-auto mb-10">
          <div className="text-[13px] font-bold tracking-widest uppercase text-gold-dk mb-3">Made Fresh Weekly</div>
          <h1 className="font-serif text-[clamp(34px,5vw,52px)] font-semibold">The Shop</h1>
          <p className="text-ink-soft mt-3.5 text-[17px]">Order ahead — we make everything fresh based on each week&apos;s preorders. Choose pickup or delivery at checkout.</p>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2.5 justify-center mb-9">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-[18px] py-2.5 rounded-full border-[1.5px] text-sm font-semibold transition-all duration-150 active:scale-95 select-none ${
                active === f
                  ? 'bg-terracotta border-terracotta text-white'
                  : 'bg-paper border-line text-ink-soft hover:border-terracotta hover:text-terracotta'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {list.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {list.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        ) : (
          <p className="text-center text-ink-soft py-10">No products match that filter yet.</p>
        )}
      </div>
    </section>
  );
}
